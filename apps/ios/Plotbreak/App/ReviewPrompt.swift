import StoreKit
import UIKit

// MARK: - Review prompt
//
// Asks for an App Store rating at the closest thing a run has to an ending.
//
// Nothing marks a run COMPLETED yet — every session in production is ACTIVE —
// so "finished" is read off the turn count instead. Ten is the earliest an
// ending can be offered (see `ending_collector` in
// packages/contracts/src/game/badges.ts), and only about one run in seven gets
// that far, so whoever reaches it has played something they chose to keep
// playing. When runs can end for real, `ReviewPrompt.turnCommitted` is the one
// call to move.
//
// iOS decides whether the sheet actually shows (three times a year at most, and
// never in TestFlight). These rules only decide when it is worth asking.

/// When a committed turn is a moment to ask. The first time any run reaches a
/// milestone, always. After that, once per app version and never within thirty
/// days of the last ask: a new version is worth a new rating, but not twice in
/// a month, and iOS will quietly swallow anything past its own yearly cap.
struct ReviewPromptSchedule: Equatable {
    /// Player turns into a run. Ten is the first "ending"; the later ones are
    /// someone still there long after it.
    static let milestones: Set<Int> = [10, 25, 50]
    static let cooldown: TimeInterval = 30 * 24 * 60 * 60

    var lastAsked: Date?
    var lastAskedVersion: String?

    func isDue(turnIndex: Int, version: String, at now: Date) -> Bool {
        guard Self.milestones.contains(turnIndex) else { return false }
        guard let lastAsked else { return true }
        return lastAskedVersion != version && now.timeIntervalSince(lastAsked) >= Self.cooldown
    }
}

/// The schedule, kept in UserDefaults. Per install, like the Discord prompt: a
/// reinstall asking again is harmless, since iOS keeps its own count.
struct ReviewPromptStore {
    static let standard = ReviewPromptStore(defaults: .standard)

    let defaults: UserDefaults

    private enum Keys {
        static let lastAsked = "plotbreak.review.lastAsked"
        static let lastAskedVersion = "plotbreak.review.lastAskedVersion"
    }

    var schedule: ReviewPromptSchedule {
        ReviewPromptSchedule(
            lastAsked: defaults.object(forKey: Keys.lastAsked) as? Date,
            lastAskedVersion: defaults.string(forKey: Keys.lastAskedVersion)
        )
    }

    func recordAsked(version: String, at now: Date) {
        defaults.set(now, forKey: Keys.lastAsked)
        defaults.set(version, forKey: Keys.lastAskedVersion)
    }
}

enum ReviewPrompt {
    /// The marketing version (1.0.1), not the build: a rebuild of the same
    /// version is not a new thing to rate.
    static var appVersion: String {
        Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? ""
    }

    /// Called once a turn has committed and its prose is on screen. Waits a
    /// moment so the sheet does not land in the same frame as the beat, then
    /// asks only if the player is still reading that beat: not mid-send, not
    /// gone back to the tabs, where the Discord prompt has the floor.
    @MainActor
    static func turnCommitted(turnIndex: Int, stillReading: @MainActor () -> Bool) async {
        let store = ReviewPromptStore.standard
        let version = appVersion
        guard store.schedule.isDue(turnIndex: turnIndex, version: version, at: Date()) else { return }
        try? await Task.sleep(nanoseconds: 2_500_000_000)
        guard stillReading(), let scene = activeScene else { return }
        store.recordAsked(version: version, at: Date())
        StoreKit.AppStore.requestReview(in: scene)
    }

    @MainActor
    private static var activeScene: UIWindowScene? {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first { $0.activationState == .foregroundActive }
    }
}
