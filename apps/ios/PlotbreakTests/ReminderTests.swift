import XCTest
@testable import Plotbreak

// Every case here is about *when*, which is the only part of the reminders with
// any reasoning in it. Scheduling is one call to iOS; deciding that tonight is
// not the night because the credits were already claimed is not.

final class ReminderScheduleTests: XCTestCase {
    /// A fixed zone, so a machine in Paris and a machine in New York agree.
    private var schedule: ReminderSchedule {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "America/New_York")!
        return ReminderSchedule(calendar: calendar)
    }

    private func date(_ iso: String) -> Date {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime]
        return formatter.date(from: iso)!
    }

    private func hour(_ date: Date) -> Int {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "America/New_York")!
        return calendar.component(.hour, from: date)
    }

    // MARK: Daily credits

    func testDailyCreditsArmsAWeekAtTheEveningHour() {
        // 09:00 local on a Monday.
        let now = date("2026-09-14T13:00:00Z")
        let dates = schedule.dailyCredits(nextClaimAt: nil, now: now)

        XCTAssertEqual(dates.count, ReminderSchedule.horizonDays)
        XCTAssertTrue(dates.allSatisfy { hour($0) == ReminderSchedule.creditsHour })
        XCTAssertTrue(dates.allSatisfy { $0 > now })
        // Claimable already, so tonight counts rather than tomorrow.
        XCTAssertEqual(dates.first, date("2026-09-14T23:00:00Z"))
    }

    func testDailyCreditsSkipsTonightWhenAlreadyClaimed() {
        // Claimed this morning, so the grant is back at 00:00 UTC — which is
        // 20:00 local, after tonight's 19:00 slot. Reminding them tonight would
        // send somebody to a wallet with nothing in it.
        let now = date("2026-09-14T13:00:00Z")
        let nextClaim = date("2026-09-15T00:00:00Z")
        let dates = schedule.dailyCredits(nextClaimAt: nextClaim, now: now)

        XCTAssertTrue(dates.allSatisfy { $0 >= nextClaim })
        XCTAssertEqual(dates.first, date("2026-09-15T23:00:00Z"))
    }

    func testDailyCreditsNeverFiresInThePast() {
        // 23:00 local: tonight's slot is gone.
        let now = date("2026-09-15T03:00:00Z")
        let dates = schedule.dailyCredits(nextClaimAt: nil, now: now)
        XCTAssertTrue(dates.allSatisfy { $0 > now })
    }

    /// The reason `nextDate(after:matching:)` is used rather than adding 86,400
    /// seconds. US clocks go back on 2026-11-01; a reminder built by adding a
    /// day would be an hour out from then on, and eventually arrive at night.
    func testEveryReminderIsAtTheSameLocalHourAcrossADaylightSavingChange() {
        let now = date("2026-10-29T13:00:00Z")
        let dates = schedule.dailyCredits(nextClaimAt: nil, now: now)
        XCTAssertEqual(dates.count, 7)
        XCTAssertTrue(
            dates.allSatisfy { hour($0) == ReminderSchedule.creditsHour },
            "every reminder must be at 19:00 local, on both sides of the change"
        )
    }

    // MARK: The story that is waiting

    func testStoryWaitingHoldsOffForTheRestOfTheDay() {
        // Played at 09:00 local. 11:00 this morning has passed, and tomorrow's
        // is inside the quiet window's tail, so the first one is the day after.
        let now = date("2026-09-14T13:00:00Z")
        let dates = schedule.storyWaiting(lastPlayedAt: now, now: now)

        XCTAssertEqual(dates.count, ReminderSchedule.horizonDays)
        XCTAssertTrue(dates.allSatisfy { hour($0) == ReminderSchedule.storyHour })
        XCTAssertTrue(
            dates.allSatisfy { $0.timeIntervalSince(now) >= ReminderSchedule.quietAfterPlay },
            "somebody who played this morning is not somebody who abandoned a run"
        )
    }

    func testStoryWaitingCountsFromThePlayNotTheLaunch() {
        // Last played four days ago; the app is only being opened now, at 09:00
        // local. The quiet window is long gone, so the next 11:00 is this
        // morning's — two hours away, not tomorrow.
        let lastPlayed = date("2026-09-10T13:00:00Z")
        let now = date("2026-09-14T13:00:00Z")
        let dates = schedule.storyWaiting(lastPlayedAt: lastPlayed, now: now)
        XCTAssertEqual(dates.first, date("2026-09-14T15:00:00Z"))
        XCTAssertTrue(dates.first! > now)
    }

    // MARK: Putting it together

    func testPlansCarryTheStoryAndTheRunToReopen() {
        let now = date("2026-09-14T13:00:00Z")
        let plans = schedule.plans(
            nextClaimAt: nil,
            session: (sessionId: "sess_1", title: "La Chambre 314", lastPlayedAt: date("2026-09-10T13:00:00Z")),
            wantsDailyCredits: true,
            wantsStoryWaiting: true,
            now: now
        )

        let story = plans.filter { $0.kind == .storyWaiting }
        let credits = plans.filter { $0.kind == .dailyCredits }
        XCTAssertEqual(story.count, 7)
        XCTAssertEqual(credits.count, 7)
        XCTAssertTrue(story.allSatisfy { $0.sessionId == "sess_1" && $0.storyTitle == "La Chambre 314" })
        // Nothing to reopen on the credits one; it goes to the wallet.
        XCTAssertTrue(credits.allSatisfy { $0.sessionId == nil })
    }

    func testNoRunMeansNoStoryReminder() {
        let plans = schedule.plans(
            nextClaimAt: nil,
            session: nil,
            wantsDailyCredits: true,
            wantsStoryWaiting: true,
            now: date("2026-09-14T13:00:00Z")
        )
        XCTAssertTrue(plans.allSatisfy { $0.kind == .dailyCredits })
    }

    func testEachSwitchOnlySilencesItsOwn() {
        let session = (sessionId: "sess_1", title: "Nine Weeks", lastPlayedAt: date("2026-09-10T13:00:00Z"))
        let now = date("2026-09-14T13:00:00Z")

        let creditsOff = schedule.plans(
            nextClaimAt: nil, session: session,
            wantsDailyCredits: false, wantsStoryWaiting: true, now: now
        )
        XCTAssertTrue(creditsOff.allSatisfy { $0.kind == .storyWaiting })

        let storyOff = schedule.plans(
            nextClaimAt: nil, session: session,
            wantsDailyCredits: true, wantsStoryWaiting: false, now: now
        )
        XCTAssertTrue(storyOff.allSatisfy { $0.kind == .dailyCredits })

        let bothOff = schedule.plans(
            nextClaimAt: nil, session: session,
            wantsDailyCredits: false, wantsStoryWaiting: false, now: now
        )
        XCTAssertTrue(bothOff.isEmpty)
    }

    func testRequestIdsAreDistinctPerFireTime() {
        let plans = schedule.plans(
            nextClaimAt: nil,
            session: (sessionId: "sess_1", title: "Nine Weeks", lastPlayedAt: date("2026-09-10T13:00:00Z")),
            wantsDailyCredits: true,
            wantsStoryWaiting: true,
            now: date("2026-09-14T13:00:00Z")
        )
        // A repeated id silently replaces the earlier request, which would mean
        // one reminder a week instead of seven.
        XCTAssertEqual(Set(plans.map(\.requestId)).count, plans.count)
    }

    func testEveryIdIsRecognisablyOursSoCancellingCancelsOnlyOurs() {
        let plans = schedule.plans(
            nextClaimAt: nil,
            session: (sessionId: "sess_1", title: "Nine Weeks", lastPlayedAt: date("2026-09-10T13:00:00Z")),
            wantsDailyCredits: true,
            wantsStoryWaiting: true,
            now: date("2026-09-14T13:00:00Z")
        )
        XCTAssertTrue(plans.allSatisfy { plan in
            ReminderKind.allCases.contains { plan.requestId.hasPrefix($0.prefix) }
        })
    }
}

// MARK: - Asking

final class ReminderAskTests: XCTestCase {
    private func settings() -> ReminderSettings {
        let defaults = UserDefaults(suiteName: "reminder-ask-\(UUID().uuidString)")!
        return ReminderSettings(defaults: defaults)
    }

    /// `turn_index` is zero-based in the database, so the ask lands on the
    /// player's *second* finished turn. Pinned, because reading this constant
    /// as a count rather than an index would move the prompt into the first
    /// beat of a brand new run.
    func testAsksOnTheSecondFinishedTurnAndOnlyOnce() {
        let store = settings()
        XCTAssertFalse(Reminders.shouldAsk(turnIndex: 0, settings: store), "not on the very first beat")
        XCTAssertTrue(Reminders.shouldAsk(turnIndex: 1, settings: store))
        XCTAssertFalse(Reminders.shouldAsk(turnIndex: 2, settings: store), "the window is one turn wide")
        store.hasAsked = true
        XCTAssertFalse(Reminders.shouldAsk(turnIndex: 1, settings: store), "asked once, ever")
    }

    func testDoesNotAskOnTheTurnsTheReviewPromptOwns() {
        let store = settings()
        for milestone in ReviewPromptSchedule.milestones {
            XCTAssertFalse(
                Reminders.shouldAsk(turnIndex: milestone, settings: store),
                "turn \(milestone) belongs to the review prompt"
            )
        }
    }

    func testBothRemindersAreOnByDefault() {
        let store = settings()
        XCTAssertTrue(store.dailyCredits)
        XCTAssertTrue(store.storyWaiting)
    }

    func testSwitchesSurviveARoundTrip() {
        let store = settings()
        store.storyWaiting = false
        XCTAssertFalse(store.storyWaiting)
        XCTAssertTrue(store.dailyCredits, "one switch must not move the other")
    }
}
