import XCTest
@testable import Plotbreak

/// The review prompt asks at a run's milestones, and after the first time only
/// once per version and a month apart. These pin those rules.
final class ReviewPromptTests: XCTestCase {
    private let now = Date(timeIntervalSince1970: 1_800_000_000)
    private let day: TimeInterval = 24 * 60 * 60

    func testFirstMilestoneAlwaysAsks() {
        XCTAssertTrue(ReviewPromptSchedule().isDue(turnIndex: 10, version: "1.0.1", at: now))
    }

    func testOnlyAtMilestones() {
        let fresh = ReviewPromptSchedule()
        XCTAssertFalse(fresh.isDue(turnIndex: 9, version: "1.0.1", at: now))
        XCTAssertFalse(fresh.isDue(turnIndex: 11, version: "1.0.1", at: now))
        XCTAssertTrue(fresh.isDue(turnIndex: 25, version: "1.0.1", at: now))
        XCTAssertTrue(fresh.isDue(turnIndex: 50, version: "1.0.1", at: now))
    }

    func testOncePerVersion() {
        let asked = ReviewPromptSchedule(lastAsked: now.addingTimeInterval(-90 * day), lastAskedVersion: "1.0.1")
        XCTAssertFalse(asked.isDue(turnIndex: 25, version: "1.0.1", at: now))
        XCTAssertTrue(asked.isDue(turnIndex: 25, version: "1.0.2", at: now))
    }

    func testThirtyDaysApartEvenAcrossVersions() {
        let recent = ReviewPromptSchedule(lastAsked: now.addingTimeInterval(-29 * day), lastAskedVersion: "1.0.1")
        XCTAssertFalse(recent.isDue(turnIndex: 10, version: "1.0.2", at: now))
        let old = ReviewPromptSchedule(lastAsked: now.addingTimeInterval(-30 * day), lastAskedVersion: "1.0.1")
        XCTAssertTrue(old.isDue(turnIndex: 10, version: "1.0.2", at: now))
    }

    func testStoreRoundTrip() {
        let suite = "plotbreak.tests.review.\(UUID().uuidString)"
        let defaults = UserDefaults(suiteName: suite)!
        defer { defaults.removePersistentDomain(forName: suite) }
        let store = ReviewPromptStore(defaults: defaults)

        XCTAssertEqual(store.schedule, ReviewPromptSchedule())
        store.recordAsked(version: "1.0.1", at: now)
        XCTAssertEqual(store.schedule, ReviewPromptSchedule(lastAsked: now, lastAskedVersion: "1.0.1"))
        XCTAssertFalse(store.schedule.isDue(turnIndex: 25, version: "1.0.1", at: now.addingTimeInterval(60 * day)))
    }
}
