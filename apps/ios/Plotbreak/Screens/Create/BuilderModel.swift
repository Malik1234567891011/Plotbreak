import Foundation
import SwiftUI

// MARK: - Builder model
//
// One draft, held while the creator edits it, with two jobs the views should
// not have: knowing when to save, and knowing what Auto-generate is doing.
//
// Saving is debounced rather than manual. OOC puts a 💾 in the header and lets
// you lose an hour by leaving without it; a draft is not a document the creator
// should have to think about, so every edit schedules a save and the header
// button only ever says whether one is pending.

@MainActor
@Observable
final class BuilderModel {
    /// What the model is busy with. Nothing else may run while `compiling`.
    enum Work: Equatable {
        case idle
        /// The long one: two generations, and the only wait in the app worth a screen.
        case compiling
        /// One field or one entity being rewritten. `target` drives the spinner's position.
        case assisting(AssistTarget, Int?)
        case publishing
        case saving
    }

    private let api: APIClient
    private let locale: AppLocale
    private var t: Translator { Translator(locale: locale) }

    private(set) var draft: StoryDraft
    private(set) var readiness = DraftReadiness.unknown
    private(set) var work: Work = .idle
    private(set) var errorMessage: String?
    /// Set when the compiler declined to build the pitch. Its own state: a
    /// refusal is an answer, not a failure, and it reads differently.
    private(set) var refusal: String?
    var step: CreateStep = .profile

    /// True while an edit has been made that the server has not been told about.
    private(set) var dirty = false
    private var saveTask: Task<Void, Never>?
    /// What changed since the last save. Only these keys are sent.
    private var pending: [String: JSONValue] = [:]

    init(api: APIClient, locale: AppLocale, draft: StoryDraft, readiness: DraftReadiness) {
        self.api = api
        self.locale = locale
        self.draft = draft
        self.readiness = readiness
    }

    var busy: Bool { work != .idle }
    var compiling: Bool { work == .compiling }

    func isAssisting(_ target: AssistTarget, _ index: Int? = nil) -> Bool {
        work == .assisting(target, index)
    }

    func blocked(_ step: CreateStep) -> Bool { readiness.blockedSteps.contains(step) }

    func issues(for step: CreateStep) -> [DraftIssue] { readiness.issues.filter { $0.step == step } }

    // MARK: Editing

    /// Change one field and schedule a save.
    ///
    /// The key is the contract's own field name, which is why it is a string:
    /// the alternative is a parallel Swift enum of thirty-five cases that has
    /// to be kept in step with the schema by hand, and would be wrong the first
    /// time a field is added.
    func edit<T: Encodable>(_ key: String, _ value: T, apply: (inout StoryDraft) -> Void) {
        apply(&draft)
        pending[key] = jsonValue(value)
        dirty = true
        scheduleSave()
    }

    /// A two-way binding onto one field of the draft.
    ///
    /// Writing on every keystroke rather than on blur, because the save is
    /// already debounced — committing on blur means a creator who types a
    /// premise and taps Publish loses the last thing they wrote.
    func binding(_ key: String, _ path: WritableKeyPath<StoryDraft, String>) -> Binding<String> {
        Binding(
            get: { self.draft[keyPath: path] },
            set: { value in self.edit(key, value) { draft in draft[keyPath: path] = value } }
        )
    }

    private func scheduleSave() {
        saveTask?.cancel()
        saveTask = Task { [weak self] in
            // Long enough that typing a sentence is one request, short enough
            // that leaving the screen never loses a word.
            try? await Task.sleep(for: .milliseconds(900))
            guard !Task.isCancelled else { return }
            await self?.save()
        }
    }

    /// Send whatever has changed. Safe to call at any time; a no-op when clean.
    func save() async {
        guard !pending.isEmpty else {
            dirty = false
            return
        }
        let patch = pending
        pending = [:]
        do {
            let response = try await api.patchDraft(draft.draftId, patch)
            // The server owns updatedAt and readiness. It does not own what the
            // creator has typed since this request left, so the local draft is
            // kept and only the derived half is taken.
            readiness = response.readiness
            draft.updatedAt = response.draft.updatedAt
            dirty = !pending.isEmpty
        } catch {
            // Put it back, so the next edit retries it rather than dropping it.
            pending.merge(patch) { mine, _ in mine }
            if let api = error as? APIError { errorMessage = message(for: api) }
            dirty = true
        }
    }

    /// Flush before leaving. The caller awaits this so a back tap cannot race it.
    func flush() async {
        saveTask?.cancel()
        await save()
    }

    // MARK: Model work

    /// Start the compile, then watch the draft until it finishes.
    ///
    /// The request returns as soon as the work is under way, so nothing here
    /// depends on a connection staying open for two minutes — which is what
    /// made this fail on a real phone while appearing to work against
    /// localhost, and what made the wait screen's "you can leave the app" a
    /// lie rather than a promise.
    func compile(pitch: String, tone: DraftTone?, length: DraftLength, pov: DraftPov) async {
        guard !busy else { return }
        work = .compiling
        errorMessage = nil
        refusal = nil
        do {
            let started = try await api.compileDraft(
                draft.draftId, pitch: pitch, tone: tone, length: length, pov: pov, locale: locale
            )
            draft = started.draft
            readiness = started.readiness
            pending = [:]
            dirty = false
            await watchCompile()
        } catch let error as APIError {
            work = .idle
            errorMessage = message(for: error)
        } catch {
            work = .idle
        }
    }

    /// Poll until the compile lands.
    ///
    /// Safe to re-enter, and called on appear as well as after starting one, so
    /// reopening a draft whose compile is still running rejoins the wait rather
    /// than showing a half-built story.
    func watchCompile() async {
        guard draft.compile.isRunning else {
            work = .idle
            return
        }
        work = .compiling
        defer { work = .idle }
        while !Task.isCancelled {
            // Long enough that a two-minute wait is forty requests rather than
            // four hundred; short enough that the screen does not sit there on
            // a story that is already finished.
            try? await Task.sleep(for: .seconds(3))
            guard !Task.isCancelled else { return }
            guard let response = try? await api.draft(draft.draftId) else { continue }
            draft = response.draft
            readiness = response.readiness
            switch response.draft.compile.status {
            case "running":
                continue
            case "refused":
                // The compiler's own sentence, already in the creator's language.
                refusal = response.draft.compile.message
                return
            case "failed":
                errorMessage = t("create.err_compile_failed")
                return
            default:
                step = .profile
                return
            }
        }
    }

    func assist(_ target: AssistTarget, index: Int? = nil) async {
        guard !busy else { return }
        // Anything typed and not yet sent has to land first, or the rewrite is
        // made against a version of the story the creator has already changed.
        await flush()
        work = .assisting(target, index)
        errorMessage = nil
        defer { work = .idle }
        do {
            let response = try await api.assistDraft(draft.draftId, target: target, index: index)
            draft = response.draft
            readiness = response.readiness
        } catch let error as APIError {
            errorMessage = message(for: error)
        } catch {
            errorMessage = nil
        }
    }

    /// Returns the published story id on success, so the caller can offer to play it.
    func publish(_ visibility: DraftVisibility) async -> String? {
        guard !busy else { return nil }
        await flush()
        work = .publishing
        errorMessage = nil
        defer { work = .idle }
        do {
            let response = try await api.publishDraft(draft.draftId, visibility: visibility)
            draft = response.draft
            readiness = response.readiness
            return response.storyId
        } catch let error as APIError {
            if error.code == "NOT_READY", let steps = error.details?["blockedSteps"]?.arrayValue {
                // Jump to the first step that is actually blocking, rather than
                // showing an error about a screen they are not looking at.
                if let first = steps.compactMap({ $0.stringValue }).first,
                   let target = CreateStep(rawValue: first) {
                    step = target
                }
            }
            errorMessage = message(for: error)
            return nil
        } catch {
            return nil
        }
    }

    func setVisibility(_ visibility: DraftVisibility) async {
        guard !busy else { return }
        let previous = draft.visibility
        draft.visibility = visibility
        guard draft.isPublished else {
            // Not published yet, so this is only a preference for the publish
            // button. It rides along with the next save.
            edit("visibility", visibility.rawValue) { $0.visibility = visibility }
            return
        }
        do {
            let response = try await api.setDraftVisibility(draft.draftId, visibility: visibility)
            draft = response.draft
            readiness = response.readiness
        } catch let error as APIError {
            draft.visibility = previous
            errorMessage = message(for: error)
        } catch {
            draft.visibility = previous
        }
    }

    func dismissError() {
        errorMessage = nil
        refusal = nil
    }

    /// The words for a failed call.
    ///
    /// Every server string in this product is English — that is a known,
    /// deferred piece of the localisation plan — so a French creator who taps
    /// Publish on an unfinished story was reading an English sentence next to
    /// six French ones. The server sends a stable code; the client owns the
    /// words. Anything unrecognised falls back to the server's own text, which
    /// is still better than nothing.
    func message(for error: APIError) -> String { createErrorText(error, t) }

    // MARK: List editing
    //
    // Ids are the server's business everywhere else; a row the creator adds by
    // hand has to have one immediately so SwiftUI can identify it, and it has
    // to be one the server will accept. A slug of the name would change as they
    // type, so these are opaque and stable from the moment the row appears.

    static func newId(_ prefix: String) -> String {
        "\(prefix)_\(UUID().uuidString.prefix(8).lowercased())"
    }

    func addCharacter() {
        var next = draft.characters
        next.append(DraftCharacter.blank(Self.newId("character")))
        edit("characters", next) { $0.characters = next }
    }

    func updateCharacter(_ index: Int, _ change: (inout DraftCharacter) -> Void) {
        guard draft.characters.indices.contains(index) else { return }
        var next = draft.characters
        change(&next[index])
        edit("characters", next) { $0.characters = next }
    }

    func removeCharacter(_ index: Int) {
        guard draft.characters.indices.contains(index) else { return }
        var next = draft.characters
        next.remove(at: index)
        edit("characters", next) { $0.characters = next }
    }

    func addPlace() {
        var next = draft.places
        next.append(DraftPlace.blank(Self.newId("place")))
        edit("places", next) { $0.places = next }
    }

    func updatePlace(_ index: Int, _ change: (inout DraftPlace) -> Void) {
        guard draft.places.indices.contains(index) else { return }
        var next = draft.places
        change(&next[index])
        edit("places", next) { $0.places = next }
    }

    func removePlace(_ index: Int) {
        guard draft.places.indices.contains(index) else { return }
        let removed = draft.places[index].id
        var next = draft.places
        next.remove(at: index)
        edit("places", next) { $0.places = next }
        // The story cannot open somewhere that no longer exists.
        if draft.startingPlaceId == removed {
            let first = next.first?.id
            edit("startingPlaceId", first) { $0.startingPlaceId = first }
        }
    }

    func addEnding() {
        var next = draft.endings
        next.append(DraftEnding.blank(Self.newId("ending")))
        edit("endings", next) { $0.endings = next }
    }

    func updateEnding(_ index: Int, _ change: (inout DraftEnding) -> Void) {
        guard draft.endings.indices.contains(index) else { return }
        var next = draft.endings
        change(&next[index])
        edit("endings", next) { $0.endings = next }
    }

    func removeEnding(_ index: Int) {
        guard draft.endings.indices.contains(index) else { return }
        var next = draft.endings
        next.remove(at: index)
        edit("endings", next) { $0.endings = next }
    }

    private func jsonValue<T: Encodable>(_ value: T) -> JSONValue {
        guard let data = try? JSONEncoder.plotbreak.encode(value),
              let decoded = try? JSONDecoder.plotbreak.decode(JSONValue.self, from: data)
        else { return .null }
        return decoded
    }
}


/// The words for a failed Create call.
///
/// Every server string in this product is English — a known, deferred piece of
/// the localisation plan — so a French creator who tapped Publish on an
/// unfinished story read one English sentence sitting next to six French ones.
/// The server sends a stable code; the client owns the words. Anything
/// unrecognised falls back to the server's own text, which still beats nothing.
func createErrorText(_ error: APIError, _ t: Translator) -> String {
    switch error.code {
    case "PITCH_TOO_SHORT": return t("create.err_pitch_too_short")
    case "NOT_READY": return t("create.err_not_ready")
    case "INSUFFICIENT_CREDITS": return t("create.err_insufficient_credits")
    case "DRAFT_NOT_FOUND": return t("create.err_draft_not_found")
    case "TOO_MANY_DRAFTS": return t("create.err_too_many_drafts")
    case "PUBLISHED_STORY": return t("create.err_published_story")
    case "NOT_PUBLISHED": return t("create.err_not_published")
    case "NO_MODEL": return t("create.err_no_model")
    case "COMPILE_FAILED": return t("create.err_compile_failed")
    case "ALREADY_COMPILING": return t("create.err_already_compiling")
    case "NOT_THERE", "UNKNOWN_TARGET": return t("create.err_not_there")
    case "INVALID_PATCH", "INVALID_VISIBILITY": return t("create.err_invalid_patch")
    default: return error.message
    }
}
