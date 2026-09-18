import XCTest
@testable import Plotbreak

/// The Discord prompt asks a few times at most. These pin the rules that keep
/// it from turning into a nag.
final class DiscordPromptTests: XCTestCase {
    private let now = Date(timeIntervalSince1970: 1_800_000_000)
    private let day: TimeInterval = 24 * 60 * 60

    func testNotInTheFirstTwoOpens() {
        XCTAssertFalse(DiscordPromptSchedule(opens: 1).isDue(at: now))
        XCTAssertFalse(DiscordPromptSchedule(opens: 2).isDue(at: now))
        XCTAssertTrue(DiscordPromptSchedule(opens: 3).isDue(at: now))
    }

    func testWaitsFourDaysBetweenShows() {
        let recent = DiscordPromptSchedule(opens: 9, timesShown: 1, lastShown: now.addingTimeInterval(-3 * day))
        XCTAssertFalse(recent.isDue(at: now))
        let old = DiscordPromptSchedule(opens: 9, timesShown: 1, lastShown: now.addingTimeInterval(-4 * day))
        XCTAssertTrue(old.isDue(at: now))
    }

    func testStopsAfterThreeShows() {
        let spent = DiscordPromptSchedule(opens: 40, timesShown: 3, lastShown: now.addingTimeInterval(-60 * day))
        XCTAssertFalse(spent.isDue(at: now))
    }

    func testNeverAgainOnceJoined() {
        XCTAssertFalse(DiscordPromptSchedule(opens: 40, joined: true).isDue(at: now))
    }

    func testStoreRoundTrip() {
        let suite = "plotbreak.tests.discord.\(UUID().uuidString)"
        let defaults = UserDefaults(suiteName: suite)!
        defer { defaults.removePersistentDomain(forName: suite) }
        let store = DiscordPromptStore(defaults: defaults)

        (0..<3).forEach { _ in store.recordOpen() }
        XCTAssertTrue(store.schedule.isDue(at: now))

        XCTAssertEqual(store.recordShown(at: now), 1)
        XCTAssertFalse(store.schedule.isDue(at: now.addingTimeInterval(day)))
        XCTAssertTrue(store.schedule.isDue(at: now.addingTimeInterval(5 * day)))

        store.recordJoined()
        XCTAssertEqual(store.schedule, DiscordPromptSchedule(opens: 3, timesShown: 1, lastShown: now, joined: true))
        XCTAssertFalse(store.schedule.isDue(at: now.addingTimeInterval(30 * day)))
    }
}
