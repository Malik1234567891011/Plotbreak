import Foundation
import SwiftUI

// MARK: - SessionModel
//
// GP-01 — the active session's state and its turn pipeline. Twin of the hooks
// and callbacks at the top of `apps/mobile/src/screens/Session.tsx`. The server
// is authoritative for everything here (spec §0 rule 3); this only holds what
// the screen is looking at right now.

/// Whether a roll is worth showing the player a card about (§26.8).
///
/// A generic label is the tell: "Attempt" is the engine saying it had no name
/// for what you did. And `math` is the signal that the world wants its dice
/// seen — a world that does not sends null and gets prose.
private let genericCheckLabels: Set<String> = ["attempt", "interact", "investigate", "custom"]

func worthRevealing(label: String, math: String?) -> Bool {
    guard let math, !math.isEmpty else { return false }
    return !genericCheckLabels.contains(label.trimmingCharacters(in: .whitespaces).lowercased())
}

/// `CRITICAL_SUCCESS` → "Critical success".
func outcomeText(_ outcome: String) -> String {
    outcome.split(separator: "_").enumerated().map { index, part in
        let lower = part.lowercased()
        return index == 0 ? lower.prefix(1).uppercased() + lower.dropFirst() : lower
    }.joined(separator: " ")
}

/// Spec §10.3 — the placeholder varies with context.
func composerPlaceholder(_ t: Translator, scene: SessionSceneState?) -> String {
    if scene?.encounter != nil { return t("session.what_do_you_do") }
    if (scene?.presentCharacters.count ?? 0) > 0 { return t("session.say_or_do_anything") }
    return t("session.what_do_you_do")
}

/// The four tier names and promises, keyed here rather than in the contracts
/// package: the ids stay the source of truth; the words come out of the catalogue.
enum TierCopy {
    static func labelKey(_ tier: QualityTier) -> TranslationKey {
        switch tier {
        case .QUICK: return "session.tier_quick"
        case .VIVID: return "session.tier_vivid"
        case .CINEMATIC: return "session.tier_cinematic"
        case .APEX: return "session.tier_apex"
        }
    }

    static func promiseKey(_ tier: QualityTier) -> TranslationKey {
        switch tier {
        case .QUICK: return "session.tier_quick_promise"
        case .VIVID: return "session.tier_vivid_promise"
        case .CINEMATIC: return "session.tier_cinematic_promise"
        case .APEX: return "session.tier_apex_promise"
        }
    }

    /// `QUALITY_TIERS` from `packages/contracts/src/game/economy.ts`, used when
    /// bootstrap has not arrived. Bootstrap's copy wins when it has.
    ///
    /// Only the numbers are real. Every place a tier is drawn reads the
    /// catalogue through `labelKey`/`promiseKey` above, so `label` and
    /// `promise` are left empty rather than filled with a second English copy
    /// that nothing renders, nobody translates, and the contract can drift from.
    static let fallback: [QualityTierInfo] = [
        QualityTierInfo(id: .QUICK, label: "", costCredits: 30, promise: "", heroImageEligible: false),
        QualityTierInfo(id: .VIVID, label: "", costCredits: 60, promise: "", heroImageEligible: false),
        QualityTierInfo(id: .CINEMATIC, label: "", costCredits: 90, promise: "", heroImageEligible: true),
        QualityTierInfo(id: .APEX, label: "", costCredits: 195, promise: "", heroImageEligible: true),
    ]

    static func tiers(_ bootstrap: BootstrapResponse?) -> [QualityTierInfo] {
        let served = bootstrap?.qualityTiers ?? []
        return served.count == QualityTier.allCases.count ? served : fallback
    }

    static func info(_ tier: QualityTier, bootstrap: BootstrapResponse?) -> QualityTierInfo {
        tiers(bootstrap).first { $0.id == tier } ?? fallback.first { $0.id == tier } ?? fallback[1]
    }
}

// MARK: - Pending turn

struct PendingReaction: Hashable {
    var name: String
    var url: String?
    var emotion: String
}

struct PendingCheck: Hashable {
    var label: String
    var difficulty: String
    var outcome: String?
    var outcomeLabel: String
    var math: String?
}

/// The turn in flight, from the moment the player hits send to the refetch
/// that swaps it for the server's copy.
struct PendingTurn: Hashable {
    /// Empty until the server accepts.
    var turnId = ""
    /// What the player typed, shown the instant they hit send.
    var actionText: String
    /// Sentences as the writer produces them, before the turn commits.
    var streamed: [String] = []
    /// Spec §19.7 — the cached face, which arrives before any prose.
    var reaction: PendingReaction?
    /// Spec §19.1 — arrives after the turn, never blocking it.
    var heroImageUrl: String?
    /// A frame was planned for this beat and has not arrived.
    ///
    /// A hero frame takes about a minute and the prose takes ten seconds, so
    /// by the time it lands the player has read on and the feed has scrolled
    /// past the slot. The image then appears silently above something they
    /// already read, which is indistinguishable from a bug. The React Native
    /// screen grew a placeholder for exactly this and the port did not carry
    /// it, because `media.queued` — the event that says a frame is coming —
    /// was in the ignored list.
    var awaitingHero = false
    var blocks: [NarrativeBlock] = []
    var check: PendingCheck?
    var deltas: [String] = []
}

struct SessionError: Hashable {
    var message: String
    var retry: Bool
}

struct ScrollRequest: Equatable {
    /// Where a scroll wants to land. Sending follows the bottom so the player
    /// watches their own line land; an arriving turn parks the top of the new
    /// beat under the reader rather than dropping them at the cards below it.
    enum Anchor { case bottom, latestBeat }

    var id = 0
    var animated = true
    var anchor: Anchor = .bottom
}

// MARK: - Model

@MainActor
@Observable
final class SessionModel {
    let sessionId: String

    private(set) var detail: SessionDetailResponse?
    private(set) var scene: SessionSceneState?
    private(set) var turns: [PlayerTurnRecord] = []
    /// Turn ids whose hero frame is queued and has not landed. See `isAwaitingHero`.
    private var awaitingFrames: Set<String> = []
    private(set) var suggestions: [SuggestedAction] = []
    var draft = "" {
        didSet { if draft != oldValue { scheduleDraftSave() } }
    }
    private(set) var sending = false
    private(set) var pending: PendingTurn?
    var error: SessionError?
    var showQuality = false
    var showTurnMenu = false
    private(set) var rephrasing = false
    private(set) var revision = 0
    private(set) var playerPortraitUrl: String?
    var fullScreenImage: String?
    /// Bumped whenever the feed should follow the bottom.
    private(set) var scrollRequest = ScrollRequest()

    /// The face shown on the beat that just landed.
    ///
    /// The live slot's reaction lives on `pending`, and committed turns do not
    /// carry one, so the image appeared while the turn was in flight and then
    /// vanished the instant the server's copy arrived — a full-bleed portrait
    /// flashing on and straight back off. Holding the last one keeps it under
    /// the beat it belongs to until the player moves on.
    private(set) var lastReaction: PendingReaction?

    private var store: AppStore?
    private var router: Router?
    private var streamTask: Task<Void, Never>?
    private var draftSaveTask: Task<Void, Never>?
    private var started = false

    init(sessionId: String) {
        self.sessionId = sessionId
    }

    // MARK: Derived

    private var t: Translator { store?.t ?? Translator(locale: .en) }

    var tier: QualityTierInfo {
        TierCopy.info(store?.qualityTier ?? .VIVID, bootstrap: store?.bootstrap)
    }

    var balance: Int { store?.balance ?? 0 }
    var affordable: Bool { balance >= tier.costCredits }
    var latest: PlayerTurnRecord? { turns.last }

    /// Every committed turn except the one the live slot is showing. While
    /// something is pending nothing in `turns` is live any more, so all of it
    /// belongs to the history.
    var historyTurns: [PlayerTurnRecord] { pending == nil ? Array(turns.dropLast()) : turns }

    var heroImageUrl: String? { pending != nil ? pending?.heroImageUrl : latest?.heroImageUrl }
    /// Whether the beat on screen is still waiting for its picture.
    var awaitingHero: Bool {
        if let pending { return pending.awaitingHero }
        guard let latest else { return false }
        return latest.heroImageUrl == nil && awaitingFrames.contains(latest.turnId)
    }

    /// Beats whose frame has been queued and has not arrived.
    ///
    /// A client fact, not a server one: `PlayerTurnRecord` is the contract and
    /// does not carry it. Keyed by turn id so a frame that lands two beats
    /// later still fills the right slot.
    func isAwaitingHero(_ turn: PlayerTurnRecord) -> Bool {
        turn.heroImageUrl == nil && awaitingFrames.contains(turn.turnId)
    }
    var visibleBlocks: [NarrativeBlock] { pending?.blocks ?? latest?.blocks ?? [] }
    var visibleDeltas: [StateDeltaPresentation] {
        if let pending {
            return pending.deltas.enumerated().map { StateDeltaPresentation(mutationId: "pending_\($0.offset)", label: $0.element) }
        }
        return latest?.stateDeltas ?? []
    }

    // MARK: Lifecycle

    func attach(store: AppStore, router: Router) {
        self.store = store
        self.router = router
    }

    /// Runs once: the session, the saved draft and the wallet.
    func start() async {
        guard !started, let store else { return }
        started = true
        draft = store.loadDraft(sessionId: sessionId)
        async let session: Void = load()
        async let wallet: Void = store.refreshWallet()
        async let portrait: Void = refreshPlayerPortrait()
        _ = await (session, wallet, portrait)
    }

    func stopStreaming() {
        streamTask?.cancel()
        streamTask = nil
    }

    func load() async {
        guard let store else { return }
        do {
            let response = try await store.api.session(sessionId)
            detail = response
            scene = response.scene
            turns = response.recentTurns
            suggestions = response.suggestions
            revision = response.revision
            error = nil
        } catch {
            let message = (error as? APIError)?.message ?? t("session.load_failed")
            self.error = SessionError(message: message, retry: true)
        }
    }

    /// The player's own portrait, if this run has one drawn yet.
    func refreshPlayerPortrait() async {
        guard let store else { return }
        do {
            let response = try await store.api.myCharacters()
            playerPortraitUrl = response.characters.first { $0.sessionId == sessionId }?.portraitUrl
        } catch {
            playerPortraitUrl = nil
        }
    }

    // MARK: Drafts (§10.3 — the draft survives backgrounding and failed turns)

    private func scheduleDraftSave() {
        draftSaveTask?.cancel()
        let text = draft
        draftSaveTask = Task { [weak self] in
            try? await Task.sleep(nanoseconds: 400_000_000)
            guard !Task.isCancelled, let self, let store = self.store else { return }
            store.saveDraft(sessionId: self.sessionId, text: text)
        }
    }

    private func saveDraftNow(_ text: String) {
        draftSaveTask?.cancel()
        store?.saveDraft(sessionId: sessionId, text: text)
    }

    /// The player asked for the bottom of the story (the round arrow button).
    ///
    /// Deliberate, and the counterpart to the relaunch's scrolling change: a
    /// finished turn no longer drags the reader down to the cards, so the way
    /// to get there is to ask.
    func scrollToLatest() {
        requestScroll(animated: true)
    }

    private func requestScroll(animated: Bool, anchor: ScrollRequest.Anchor = .bottom) {
        scrollRequest = ScrollRequest(id: scrollRequest.id + 1, animated: animated, anchor: anchor)
    }

    // MARK: Sending

    /// `override` is how the turn menu re-sends an action that is no longer in
    /// the composer. GP-04 retry is a new turn, not a rewind.
    func send(_ override: String? = nil, intentHint: String? = nil) async {
        guard let store, let router else { return }
        let text = (override ?? draft).trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty, !sending else { return }

        // Spec §26.7 / WL-03 — the pill stays selectable when short; Send is
        // what opens the wallet, with the exact shortfall.
        guard affordable else {
            Haptic.play(.warning)
            router.present(.wallet(shortfall: tier.costCredits - balance))
            return
        }

        sending = true
        error = nil
        Haptic.play(.light)

        let idempotencyKey = UUID().uuidString
        let qualityTier = store.qualityTier
        let sessionRevision = revision

        // The player's own words go up before the network is touched, and the
        // view parks on them rather than chasing the bottom.
        //
        // Chasing the bottom made sense when the responses lived in a sheet.
        // Now they sit at the end of the prose, so tapping one scrolled past
        // the beat that was about to arrive and the reader had to climb back up
        // to read it. Their action goes to the top instead and the story
        // streams in underneath, which is the direction they are already
        // reading in.
        draft = ""
        saveDraftNow("")
        lastReaction = nil
        pending = PendingTurn(actionText: text)
        requestScroll(animated: true, anchor: .latestBeat)

        defer {
            sending = false
            streamTask = nil
        }

        do {
            let accepted = try await store.api.submitTurn(
                sessionId,
                SubmitTurnRequest(actionText: text, qualityTier: qualityTier, sessionRevision: sessionRevision, selectedSuggestionId: intentHint),
                idempotencyKey: idempotencyKey
            )
            store.setBalance(accepted.balanceAfterReserve)
            pending?.turnId = accepted.turnId

            await consumeStream(turnId: accepted.turnId, streamToken: accepted.streamToken, actionText: text)
        } catch {
            // Nothing was committed, so the words come back to the composer
            // rather than vanishing with the optimistic bubble.
            pending = nil
            draft = text
            saveDraftNow(text)

            if let api = error as? APIError, api.isInsufficientCredits {
                router.present(.wallet(shortfall: api.shortfall ?? tier.costCredits))
            } else if let api = error as? APIError, api.isStaleRevision {
                // Spec §17.4 — refresh and let the player resend deliberately.
                await load()
                self.error = SessionError(message: t("session.stale_revision"), retry: false)
            } else if let api = error as? APIError, api.isOffline {
                self.error = SessionError(message: t("session.offline"), retry: true)
            } else {
                self.error = SessionError(message: t("session.turn_failed"), retry: true)
            }
        }
    }

    private enum StreamItem {
        case event(TurnStreamEventName, [String: JSONValue])
        case error(Error)
    }

    /// Consumes the SSE stream in order on the main actor. Events are yielded
    /// from the client's background context into one stream so a `text.delta`
    /// can never overtake the `check.resolved` before it.
    private func consumeStream(turnId: String, streamToken: String, actionText: String) async {
        guard let store else { return }
        let (items, continuation) = AsyncStream.makeStream(of: StreamItem.self)
        let handlers = TurnStreamHandlers(
            onEvent: { event, data in continuation.yield(.event(event, data)) },
            onError: { error in continuation.yield(.error(error)) }
        )
        let api = store.api
        let task = Task {
            await api.streamTurn(turnId, streamToken: streamToken, handlers: handlers)
            continuation.finish()
        }
        streamTask = task

        for await item in items {
            if task.isCancelled { break }
            switch item {
            case .event(let event, let data):
                handle(event, data, turnId: turnId, actionText: actionText)
            case .error:
                pending = nil
                draft = actionText
                error = SessionError(message: t("session.turn_failed"), retry: true)
                await store.refreshWallet()
            }
        }
    }

    private func handle(_ event: TurnStreamEventName, _ data: [String: JSONValue], turnId: String, actionText: String) {
        guard let store else { return }
        switch event {
        case .checkStarted:
            // The engine is rolling. Nothing to show until it has a verdict;
            // the label is kept so the reveal can name what was attempted.
            if pending != nil, pending?.check == nil, let label = data["label"]?.stringValue {
                pending?.check = PendingCheck(label: label, difficulty: data["difficultyLabel"]?.stringValue ?? "", outcome: nil, outcomeLabel: "", math: nil)
            }

        case .checkResolved:
            Haptic.play(.medium)
            pending?.check = PendingCheck(
                label: data["label"]?.stringValue ?? "",
                difficulty: data["difficultyLabel"]?.stringValue ?? "",
                outcome: data["outcome"]?.stringValue ?? "",
                outcomeLabel: data["outcomeLabel"]?.stringValue ?? "",
                math: data["math"]?.stringValue
            )

        case .resolutionReady:
            // Spec §17.8 — the outcome is final before the prose exists. The
            // facts are the writer's brief; the screen waits for the words.
            break

        case .reactionReady:
            // Now emitted after the prose, so it lands under words the player
            // is already reading rather than ahead of them.
            pending?.reaction = PendingReaction(
                name: data["name"]?.stringValue ?? "",
                url: data["url"]?.stringValue,
                emotion: data["emotion"]?.stringValue ?? "neutral"
            )

        case .textStream:
            let sentence = (data["text"]?.stringValue ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
            if !sentence.isEmpty { pending?.streamed.append(sentence) }

        case .textDelta:
            let block = NarrativeBlock(
                type: BlockType(rawValue: data["type"]?.stringValue ?? "") ?? .NARRATION,
                speakerId: data["speakerId"]?.stringValue,
                text: data["text"]?.stringValue ?? "",
                visibility: "GROUP",
                voiceEligible: data["voiceEligible"]?.boolValue ?? false
            )
            pending?.blocks.append(block)
            // No scroll. The beat was parked when the turn was sent and the
            // prose fills in underneath it, so there is nothing left to move —
            // and a reader who has scrolled somewhere of their own accord while
            // the turn generates should not be dragged out of it.

        case .stateDelta:
            pending?.deltas.append(data["label"]?.stringValue ?? "")

        case .turnCompleted:
            Attribution.firstBeatCompleted(sessionId: sessionId)
            if let balance = data["balance"]?.intValue { store.setBalance(balance) }
            if let next = data["suggestions"]?.decoded(as: [SuggestedAction].self) { suggestions = next }
            if let next = data["scene"]?.decoded(as: SessionSceneState.self) { scene = next }
            // Refetch so the transcript and revision come from the server,
            // which is authoritative for both.
            Task { [weak self] in
                guard let self, let store = self.store else { return }
                if let response = try? await store.api.session(self.sessionId) {
                    // Carried across the commit so the portrait does not blink
                    // out the moment the server's copy of the turn arrives.
                    self.lastReaction = self.pending?.reaction
                    self.turns = response.recentTurns
                    self.revision = response.revision
                    self.pending = nil
                    // Deliberately no scroll here. The prose is already on
                    // screen — it streamed in — and the player may have read
                    // well past the top of it by now. Cards appear below what
                    // they are reading, so nothing above them moves, and a
                    // scroll at this point would only fight the reader.
                }
            }

        case .mediaCompleted:
            // The turn is already committed and read; the frame just arrives —
            // and only onto the beat that asked for it, which may no longer be
            // the pending one.
            if let url = data["url"]?.stringValue {
                if pending?.turnId == turnId {
                    pending?.heroImageUrl = url
                    pending?.awaitingHero = false
                }
                awaitingFrames.remove(turnId)
                turns = turns.map { turn in
                    var turn = turn
                    if turn.turnId == turnId { turn.heroImageUrl = url }
                    return turn
                }
            }

        case .turnFailed:
            // Spec §10.8 — keep the draft, say plainly that nothing was charged.
            Haptic.play(.error)
            draft = actionText
            pending = nil
            error = SessionError(message: data["message"]?.stringValue ?? t("session.turn_failed"), retry: true)
            Task { await store.refreshWallet() }

        case .mediaQueued:
            // The frame is coming. Claim the space now, at the size it will
            // be, so nothing moves when it lands.
            if pending?.turnId == turnId { pending?.awaitingHero = true }
            awaitingFrames.insert(turnId)

        case .mediaFailed:
            if pending?.turnId == turnId { pending?.awaitingHero = false }
            awaitingFrames.remove(turnId)

        case .turnAccepted, .turnTimings, .unknown:
            break
        }
    }

    /// Spec §10.2 D — Stop cancels client rendering only. A turn that already
    /// committed is not refunded.
    func stop() {
        stopStreaming()
        pending = nil
        Task { await load() }
    }

    // MARK: GP-04 — what you can do about a turn that already happened

    /// The same moment, told again. Replaced in place rather than appended:
    /// nothing happened, so the timeline must not grow.
    func rephrase(_ turnId: String) async {
        guard let store else { return }
        rephrasing = true
        defer { rephrasing = false }
        do {
            let result = try await store.api.rephraseTurn(turnId)
            turns = turns.map { $0.turnId == turnId ? result.turn : $0 }
            store.setBalance(result.balance)
            showTurnMenu = false
            Haptic.play(.success)
        } catch {
            Haptic.play(.error)
            self.error = SessionError(message: (error as? APIError)?.message ?? t("session.rephrase_failed"), retry: false)
        }
    }

    func retryLatest() {
        guard let again = latest?.actionText else { return }
        showTurnMenu = false
        Task { await send(again) }
    }

    func editLatest() {
        draft = latest?.actionText ?? ""
        showTurnMenu = false
    }

    func reportLatest() {
        guard let latest, let router else { return }
        showTurnMenu = false
        router.present(.report(targetType: "TURN", targetId: latest.turnId))
    }

    func shareLatest() {
        guard let latest, let router else { return }
        showTurnMenu = false
        router.present(.share(
            storyTitle: detail?.session.title ?? "",
            actionText: latest.actionText,
            sceneText: latest.blocks.map(\.text).joined(separator: " "),
            heroImageUrl: latest.heroImageUrl,
            displayName: detail?.session.displayName ?? ""
        ))
    }

    // MARK: Suggestions

    /// Tapping sends. The card's hint goes up with it: a tapped response was
    /// written by a stage that knew who it was addressed to.
    func choose(_ suggestion: SuggestedAction) {
        suggestions = []
        Task { await send(suggestion.text, intentHint: suggestion.intentHint) }
    }

    func edit(_ suggestion: SuggestedAction) {
        suggestions = []
        draft = suggestion.text
    }

    func selectTier(_ tier: QualityTier) {
        store?.setQualityTier(tier)
        showQuality = false
    }
}
