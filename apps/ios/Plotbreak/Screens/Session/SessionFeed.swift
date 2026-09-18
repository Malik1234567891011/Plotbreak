import SwiftUI

// MARK: - Feed (§10.2 C)
//
// The whole story, scrollable, with nothing folded away. Every committed turn
// keeps its prompt, its prose, its check and its hero frame; the live slot at
// the bottom shows the turn in flight or the latest committed one, followed
// by the three responses and any error.

struct SessionFeed: View {
    @Bindable var model: SessionModel
    @Environment(\.translator) private var t

    private static let bottomAnchor = "session.feed.bottom"
    /// The top of the newest beat, where sending parks the player's action.
    static let latestAnchor = "session.feed.latest"
    /// Room under the last line for the floating button, so the end of the
    /// story can always be scrolled clear of it.
    private static let bottomClearance: CGFloat = Theme.minTouchTarget + Theme.Spacing.md * 2

    var body: some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                    recap
                    history
                    currentBeat
                    Color.clear.frame(height: 1).id(Self.bottomAnchor)
                }
                .padding(.horizontal, Theme.gutter)
                .padding(.top, 22)
                .padding(.bottom, Self.bottomClearance)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .scrollDismissesKeyboard(.interactively)
            // Over the story rather than in a row of its own above the
            // composer: it costs the reader no height.
            .overlay(alignment: .bottomTrailing) {
                // Less the tap area's margin, so the circle itself lines up
                // with the gutter and the text box's edge.
                ScrollToLatestButton { model.scrollToLatest() }
                    .padding(.trailing, Theme.gutter - ScrollToLatestButton.hitMargin)
                    .padding(.bottom, Theme.Spacing.md - ScrollToLatestButton.hitMargin)
            }
            // The stage art, as a wash behind the words rather than a frame
            // above them: fourteen percent, fading to the page at the bottom.
            .background {
                ZStack {
                    if let stage = model.scene?.stageImage {
                        RemoteImage(stage.assetURL) { Color.clear }
                            .opacity(0.14)
                    }
                    LinearGradient(
                        stops: [
                            .init(color: Theme.Colors.bgBase.opacity(0.35), location: 0),
                            .init(color: Theme.Colors.bgBase, location: 0.78),
                        ],
                        startPoint: .top, endPoint: .bottom
                    )
                }
                .clipped()
                .allowsHitTesting(false)
                .accessibilityHidden(true)
            }
            .onChange(of: model.scrollRequest) { _, request in
                // Next runloop, so the beat being scrolled to has been laid out
                // at its held-open height first.
                DispatchQueue.main.async {
                    let scroll = {
                        switch request.anchor {
                        case .bottom: proxy.scrollTo(Self.bottomAnchor, anchor: .bottom)
                        case .latestBeat: proxy.scrollTo(Self.latestAnchor, anchor: .top)
                        }
                    }
                    if request.animated {
                        withAnimation(.easeOut(duration: Theme.Durations.short)) { scroll() }
                    } else {
                        scroll()
                    }
                }
            }
        }
    }

    // MARK: Recap

    /// Where the story left off, for a run picked up later. Nothing when the
    /// server sent none.
    @ViewBuilder private var recap: some View {
        if let recap = model.detail?.recap, !recap.bullets.isEmpty, !model.turns.isEmpty {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                ForEach(Array(recap.bullets.enumerated()), id: \.offset) { _, bullet in
                    Txt("· \(bullet)", .caption, color: Theme.Colors.textMuted)
                }
            }
            .padding(.bottom, Theme.Spacing.sm)
        }
    }

    // MARK: History

    @ViewBuilder private var history: some View {
        ForEach(model.historyTurns) { turn in
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                if let action = turn.actionText, !action.isEmpty {
                    SessionPlayerAction(text: action)
                }
                ForEach(Array(turn.blocks.enumerated()), id: \.offset) { _, block in
                    SessionBlock(block: block, scene: model.scene)
                }
                // The frame belongs to the beat that earned it, under its
                // prose — the same place the live slot put it.
                if let hero = turn.heroImageUrl {
                    SessionHeroFrame(uri: hero) { model.fullScreenImage = hero }
                } else if model.isAwaitingHero(turn) {
                    SessionHeroFramePending()
                }
            }
        }
    }

    // MARK: Current beat

    /// The live slot, its responses and any error, held open to at least a
    /// screen tall once the player has acted here.
    ///
    /// Sending parks the player's action at the top of the view. That only
    /// works if there is a screen's worth of feed below it to scroll past —
    /// without it SwiftUI stops at the bottom, which is why parking was once
    /// abandoned. With the space held, the prose, the pictures and the cards
    /// all land in room that already exists, and nothing the reader is looking
    /// at moves.
    private var currentBeat: some View {
        HStack(alignment: .top, spacing: 0) {
            if model.holdsBeatOpen {
                // Less the spacing and padding below the beat, which the feed
                // already scrolls past.
                Color.clear
                    .frame(width: 0)
                    .containerRelativeFrame(.vertical) { height, _ in
                        max(0, height - Theme.Spacing.lg - Self.bottomClearance)
                    }
            }
            VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                liveSlot
                suggestions
                errorCard
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .id(Self.latestAnchor)
    }

    // MARK: Live slot

    @ViewBuilder private var liveSlot: some View {
        let pending = model.pending
        let latest = model.latest

        if let pending {
            SessionPlayerAction(text: pending.actionText)
        } else if let action = latest?.actionText, !action.isEmpty {
            SessionPlayerAction(text: action)
        }

        if let check = pending?.check, worthRevealing(label: check.label, math: check.math) {
            CheckReveal(
                label: check.label,
                difficulty: check.difficulty,
                outcome: check.outcome.flatMap(CheckOutcome.init(rawValue:)),
                outcomeLabel: check.outcomeLabel,
                math: check.math
            )
        } else if pending == nil, let check = latest?.checks.first, worthRevealing(label: check.label, math: check.math) {
            // The committed turn carries the band and, where the world reveals
            // it, the arithmetic — so scrolling back does not show less than
            // the turn showed live.
            CheckReveal(
                label: check.label,
                difficulty: check.difficultyLabel,
                outcome: check.outcome,
                outcomeLabel: outcomeText(check.outcome.rawValue),
                math: check.math
            )
        }

        // One list for the streamed blocks and the committed ones, so the
        // commit updates these rows in place instead of swapping in new ones —
        // the same words, with the same speakers, ten seconds early.
        ForEach(Array(model.visibleBlocks.enumerated()), id: \.offset) { _, block in
            SessionBlock(block: block, scene: model.scene)
                .fadesIn()
        }

        if let pending, pending.blocks.isEmpty, pending.streamed.isEmpty {
            SessionThinkingDot()
                .fadesIn()
        }

        StateDeltaRow(deltas: model.visibleDeltas)

        // The pictures go under the prose, never above it. Both arrive after
        // the last sentence, and above it they pushed the words the player was
        // reading down the screen — by a full-bleed portrait's height.

        // Spec §19.1 tier 2 — a hero frame for a beat that earned one.
        if let hero = model.heroImageUrl {
            SessionHeroFrame(uri: hero) { model.fullScreenImage = hero }
                .fadesIn()
        } else if model.awaitingHero {
            SessionHeroFramePending()
                .fadesIn()
        }

        // Spec §19.7 — the face, edge to edge, the way a scene would cut to it.
        // `lastReaction` keeps it there once the turn commits; without it the
        // image appeared and disappeared inside the same second.
        if let reaction = pending?.reaction ?? model.lastReaction, let url = reaction.url {
            Button {
                model.fullScreenImage = url
            } label: {
                RemoteImage(url.assetURL)
                    .aspectRatio(3 / 4, contentMode: .fit)
                    .frame(maxWidth: .infinity)
                    .clipped()
            }
            .buttonStyle(PressOpacityStyle(pressed: 0.9))
            .padding(.horizontal, -Theme.gutter)
            .accessibilityLabel(t("session.reaction_image_a11y", ["name": reaction.name, "emotion": reaction.emotion]))
            .fadesIn()
        }
    }

    // MARK: Error

    // MARK: Responses

    /// The three responses, directly under the beat they follow from.
    ///
    /// They used to sit behind a sparkle in the composer, which meant a tap to
    /// find out what the options were and a second tap to take one. They are
    /// the primary way the game is played, so they belong where the reader's
    /// eye already is — at the end of the prose.
    ///
    /// Only while the turn is settled: mid-turn they would be stale, and a
    /// stale card is one the player can tap for something the story has moved
    /// past.
    @ViewBuilder private var suggestions: some View {
        if !model.suggestions.isEmpty, model.pending == nil {
            VStack(spacing: Theme.Spacing.sm) {
                ForEach(Array(model.suggestions.enumerated()), id: \.offset) { index, item in
                    ActionSuggestion(
                        suggestion: item,
                        editLabel: t("ui.edit_response_a11y"),
                        // The position matters: §37 asks whether players take
                        // the first card or read all of them, which decides how
                        // many are worth generating.
                        onPress: { model.choose(item, position: index) },
                        onEdit: { model.edit(item) }
                    )
                }
            }
            .fadesIn()
        }
    }

    @ViewBuilder private var errorCard: some View {
        if let error = model.error {
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                Txt(error.message, .bodyCompact)
                if error.retry {
                    PBButton(t("session.try_again"), variant: .secondary, full: false) {
                        Task { await model.send() }
                    }
                }
            }
            .padding(Theme.Spacing.lg)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.warning, lineWidth: 0.5)
            }
        }
    }
}

// MARK: - Block

struct SessionBlock: View {
    let block: NarrativeBlock
    let scene: SessionSceneState?
    @Environment(\.translator) private var t

    var body: some View {
        switch block.type {
        case .DIALOGUE:
            // Resolved against the whole cast, not who is in the room now: the
            // feed is history, and walking out of a room must not strip the
            // name and face off every line already on screen.
            let castMember = scene?.cast.first { $0.id == block.speakerId }
            let present = scene?.presentCharacters.first { $0.id == block.speakerId }
            let name = castMember?.name ?? present?.name
            let portrait = castMember?.portrait ?? present?.portrait
            DialogueBlock(
                speaker: block.speakerId == "player" ? t("session.you") : (name ?? block.speakerId ?? t("session.someone")),
                text: block.text,
                portraitUri: portrait,
                voiceEligible: block.voiceEligible ?? false
            )
        case .SYSTEM:
            Txt(block.text, .caption, color: Theme.Colors.textMuted)
        case .NARRATION:
            NarrationBlock(text: block.text, t: t)
        }
    }
}

// MARK: - Hero frame

/// A beat's hero frame. Rendered inline with its turn, so it stays in the feed.
struct SessionHeroFrame: View {
    let uri: String
    let onPress: () -> Void
    @Environment(\.translator) private var t

    var body: some View {
        Button(action: onPress) {
            RemoteImage(uri.assetURL) { Theme.Colors.bgElevated }
                .aspectRatio(3 / 2, contentMode: .fit)
                .frame(maxWidth: .infinity)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
        }
        .buttonStyle(PressOpacityStyle(pressed: 0.9))
        .accessibilityLabel(t("session.scene_image_a11y"))
    }
}

/// The slot a frame is going to land in.
///
/// A hero frame takes about a minute; the prose takes ten seconds. Without
/// this the player reads on, the feed scrolls past the empty space, and the
/// picture appears silently under a beat they have already finished — which
/// reads as the app being broken rather than as a drawing being slow.
///
/// Exactly the dimensions of `SessionHeroFrame`, so nothing moves when the
/// real image replaces it. The React Native screen had this and the port did
/// not carry it, because `media.queued` was in the ignored list.
struct SessionHeroFramePending: View {
    @Environment(\.translator) private var t
    @State private var breathing = false

    var body: some View {
        RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
            .fill(Theme.Colors.bgElevated)
            .aspectRatio(3 / 2, contentMode: .fit)
            .frame(maxWidth: .infinity)
            .overlay {
                Image(systemName: "photo")
                    .font(.system(size: 22))
                    .foregroundStyle(Theme.Colors.textMuted)
            }
            .opacity(breathing ? 0.55 : 1)
            .animation(.easeInOut(duration: 1.4).repeatForever(autoreverses: true), value: breathing)
            .onAppear { breathing = true }
            .accessibilityLabel(t("session.scene_image_pending_a11y"))
    }
}

// MARK: - Fade in

/// Whatever the turn brings — a line, a picture, the cards — fades up rather
/// than popping in.
///
/// Opacity only, driven from the view's own appearance. Animating the state
/// change instead would animate the layout with it, and a row sliding while
/// the one above it fades is exactly the movement this screen is rid of. The
/// commit updates rows in place, so nothing fades twice.
private struct FadeInOnAppear: ViewModifier {
    @State private var shown = false

    func body(content: Content) -> some View {
        content
            .opacity(shown ? 1 : 0)
            .onAppear {
                withAnimation(.easeOut(duration: Theme.Durations.fadeIn)) { shown = true }
            }
    }
}

private extension View {
    func fadesIn() -> some View { modifier(FadeInOnAppear()) }
}

// MARK: - Scroll to latest

/// The way back to the newest beat: a white circle floating over the feed.
struct ScrollToLatestButton: View {
    /// The reference screenshot's size.
    static let size: CGFloat = 32
    static let hitMargin: CGFloat = (Theme.minTouchTarget - size) / 2
    let action: () -> Void
    @Environment(\.translator) private var t

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            // Down: the newest beat is at the bottom of the feed.
            Image(systemName: "chevron.down")
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(Theme.Colors.textOnLight)
                .frame(width: Self.size, height: Self.size)
                .background(Theme.Colors.light, in: Circle())
                // It sits on top of prose now, so it needs to read as
                // floating rather than as part of the page.
                .shadow(color: .black.opacity(0.35), radius: 8, y: 2)
                // Small to look at, full size to hit.
                .frame(width: Theme.minTouchTarget, height: Theme.minTouchTarget)
                .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(t("session.scroll_to_latest"))
    }
}

// MARK: - Thinking dot

/// The beat is being written: one dot, breathing, where the first line will
/// land. Replaces a spinner and a caption, which was two things to read for a
/// state that says nothing but "wait".
///
/// Spec §25.12 still holds — no theatrical copy on screen, and VoiceOver hears
/// the honest one.
struct SessionThinkingDot: View {
    @Environment(\.translator) private var t
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var breathing = false

    var body: some View {
        Circle()
            .fill(Theme.Colors.textPrimary)
            .frame(width: 13, height: 13)
            .scaleEffect(breathing && !reduceMotion ? 1 : 0.6)
            .opacity(breathing ? 1 : 0.55)
            .animation(.easeInOut(duration: 0.75).repeatForever(autoreverses: true), value: breathing)
            .frame(height: 22)
            .onAppear { breathing = true }
            .accessibilityElement()
            .accessibilityLabel(t("session.resolving"))
    }
}

// MARK: - Player action

struct SessionPlayerAction: View {
    let text: String
    @Environment(\.translator) private var t

    var body: some View {
        HStack {
            Spacer(minLength: 0)
            Txt(text, .bodyCompact, color: Theme.Colors.textSecondary)
                .padding(.horizontal, Theme.Spacing.lg)
                .padding(.vertical, Theme.Spacing.md)
                .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                .containerRelativeFrame(.horizontal, alignment: .trailing) { width, _ in width * 0.85 }
                .fixedSize(horizontal: true, vertical: false)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(t("session.player_action_a11y", ["text": text]))
    }
}
