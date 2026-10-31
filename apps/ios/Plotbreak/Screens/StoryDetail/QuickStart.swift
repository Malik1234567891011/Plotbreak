import Foundation

// MARK: - Quick start
//
// Starting a story with an identity nobody had to fill in. One implementation
// for the two ways in: `Play` on the story page, and tapping a world on the
// onboarding showcase, which skips the story page entirely. A second copy of
// this is how the two paths drift — one remembers the hero's name, the other
// forgets to.

@MainActor
enum QuickStart {
    /// Creates the session and returns its id. Throws the API's error, so the
    /// caller decides what a shortfall or a failure looks like on its screen.
    ///
    /// `startPath` is the funnel's way of telling the doors apart: `instant`
    /// is Play on the story page, `onboarding` is the showcase tap.
    static func start(_ detail: StoryDetailResponse, store: AppStore, startPath: String) async throws -> String {
        let identity = DefaultIdentity.build(for: detail, store: store)
        let request = CreateSessionRequest(identity: identity, usedQuickSetup: true, locale: store.locale)
        let session = try await store.api.createSession(storyId: detail.story.storyId, request)
        // Remember the name for next time, exactly as setup does, so a
        // player who later opens setup finds their own name already there.
        if detail.protagonist?.kind != .NAMED {
            store.rememberHero(HeroDefaults(
                name: identity.displayName,
                pronouns: identity.pronouns,
                grammar: store.lastHero.grammar
            ))
        }
        // §37.1. `setupDurationMs` is zero because there was none.
        Telemetry.track(.sessionStarted, sessionId: session.session.sessionId, [
            "storyId": detail.story.storyId,
            "storyVersionId": session.session.storyVersionId,
            "archetypeId": identity.archetypeId ?? NSNull(),
            "usedQuickSetup": true,
            "setupDurationMs": 0,
            "startPath": startPath,
        ])
        return session.session.sessionId
    }
}
