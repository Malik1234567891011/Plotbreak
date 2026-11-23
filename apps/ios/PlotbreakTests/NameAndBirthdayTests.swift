import XCTest
@testable import Plotbreak

/// The name-and-birthday step (design v3, board OnbProfile): the date typed as
/// three numbers, and the COPPA order of what is kept.
final class BirthdayEntryTests: XCTestCase {
    /// 2026-11-23, noon, so "today" never straddles a day boundary.
    private let now: Date = {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .current
        return calendar.date(from: DateComponents(year: 2026, month: 11, day: 23, hour: 12))!
    }()

    private func entry(_ month: String, _ day: String, _ year: String) -> BirthdayEntry {
        var entry = BirthdayEntry()
        entry[.month] = month
        entry[.day] = day
        entry[.year] = year
        return entry
    }

    func testOrderFollowsTheLanguage() {
        XCTAssertEqual(BirthdayEntry.order(for: .en), [.month, .day, .year])
        XCTAssertEqual(BirthdayEntry.order(for: .fr), [.day, .month, .year])
    }

    func testKeepsDigitsOnlyUpToEachLength() {
        var entry = BirthdayEntry()
        entry[.month] = "06/21"
        entry[.day] = "a2b1c"
        entry[.year] = "2000123"
        XCTAssertEqual(entry.month, "06")
        XCTAssertEqual(entry.day, "21")
        XCTAssertEqual(entry.year, "2000")
        // Not ASCII: an Arabic-Indic three is not a digit this field reads.
        entry[.day] = "\u{0663}"
        XCTAssertEqual(entry.day, "")
    }

    func testTypingMovesOnWhenANumberIsFull() {
        let order = BirthdayEntry.order(for: .en)
        var entry = BirthdayEntry()
        XCTAssertNil(entry.type("0", into: .month, order: order))
        XCTAssertEqual(entry.type("06", into: .month, order: order), .day)
        XCTAssertEqual(entry.type("21", into: .day, order: order), .year)
        XCTAssertNil(entry.type("2000", into: .year, order: order))
        XCTAssertEqual(entry, BirthdayEntry(month: "06", day: "21", year: "2000"))
    }

    func testOverflowCarriesIntoTheNextNumbers() {
        // A paste, or typing faster than the cursor hops.
        var english = BirthdayEntry()
        XCTAssertEqual(english.type("06/21/2000", into: .month, order: BirthdayEntry.order(for: .en)), .year)
        XCTAssertEqual(english, BirthdayEntry(month: "06", day: "21", year: "2000"))

        var french = BirthdayEntry()
        XCTAssertEqual(french.type("2106", into: .day, order: BirthdayEntry.order(for: .fr)), .year)
        XCTAssertEqual(french, BirthdayEntry(month: "06", day: "21", year: ""))

        // A third digit in a full month starts the day.
        var typing = BirthdayEntry(month: "06", day: "", year: "")
        XCTAssertEqual(typing.type("062", into: .month, order: BirthdayEntry.order(for: .en)), .day)
        XCTAssertEqual(typing, BirthdayEntry(month: "06", day: "2", year: ""))
    }

    func testAWholeRealDateIsADate() {
        let date = entry("6", "21", "2000").date(now: now)
        XCTAssertNotNil(date)
        let parts = Calendar(identifier: .gregorian).dateComponents([.year, .month, .day], from: date!)
        XCTAssertEqual(parts.year, 2000)
        XCTAssertEqual(parts.month, 6)
        XCTAssertEqual(parts.day, 21)
    }

    func testAPartYearIsNotADateYet() {
        let typing = entry("06", "21", "200")
        XCTAssertFalse(typing.isFilled)
        XCTAssertNil(typing.date(now: now))
    }

    func testDaysTheMonthDoesNotHaveAreRejected() {
        XCTAssertNil(entry("02", "30", "2000").date(now: now))
        XCTAssertNil(entry("02", "29", "2001").date(now: now))
        XCTAssertNotNil(entry("02", "29", "2000").date(now: now))
        XCTAssertNil(entry("13", "01", "2000").date(now: now))
        XCTAssertNil(entry("00", "10", "2000").date(now: now))
        XCTAssertNil(entry("04", "00", "2000").date(now: now))
    }

    func testTheFutureAndTheVeryLongAgoAreRejected() {
        XCTAssertNil(entry("01", "01", "2027").date(now: now))
        XCTAssertNil(entry("11", "24", "2026").date(now: now))
        XCTAssertNil(entry("01", "01", "1900").date(now: now))
        XCTAssertNotNil(entry("01", "01", "1950").date(now: now))
    }
}

@MainActor
final class NameAndBirthdayFormTests: XCTestCase {
    private let now: Date = {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .current
        return calendar.date(from: DateComponents(year: 2026, month: 11, day: 23, hour: 12))!
    }()

    private func form(name: String, _ month: String, _ day: String, _ year: String) -> NameAndBirthdayForm {
        var form = NameAndBirthdayForm()
        form.name = name
        form.birthday[.month] = month
        form.birthday[.day] = day
        form.birthday[.year] = year
        return form
    }

    func testNeedsANameAndAWholeDate() {
        XCTAssertFalse(form(name: "", "06", "21", "2000").canContinue(now: now))
        XCTAssertFalse(form(name: "   ", "06", "21", "2000").canContinue(now: now))
        XCTAssertFalse(form(name: "Ren", "06", "21", "20").canContinue(now: now))
        XCTAssertTrue(form(name: "Ren", "06", "21", "2000").canContinue(now: now))
        XCTAssertEqual(form(name: "Ren", "06", "21", "2000").ageBand(now: now), "25plus")
    }

    func testTheHintUntilTheDateIsWhole() {
        XCTAssertEqual(form(name: "Ren", "", "", "").hint(now: now), .finishYear)
        XCTAssertEqual(form(name: "Ren", "06", "21", "20").hint(now: now), .finishYear)
        XCTAssertEqual(form(name: "Ren", "02", "31", "2000").hint(now: now), .checkDate)
        XCTAssertEqual(form(name: "Ren", "06", "21", "2000").hint(now: now), .none)
    }

    func testUnderThirteenBlocksAndDropsTheName() {
        // Twelve, turning thirteen tomorrow.
        var young = form(name: "Ren", "11", "24", "2013")
        XCTAssertEqual(young.ageBand(now: now), "under13")
        XCTAssertTrue(young.isTooYoung(now: now))
        XCTAssertEqual(young.hint(now: now), .tooYoung)
        XCTAssertFalse(young.canContinue(now: now))
        young.dropNameIfTooYoung(now: now)
        XCTAssertEqual(young.name, "")

        // Thirteen today goes on, and keeps the name.
        var thirteen = form(name: "Ren", "11", "23", "2013")
        XCTAssertEqual(thirteen.ageBand(now: now), "13_17")
        XCTAssertTrue(thirteen.canContinue(now: now))
        thirteen.dropNameIfTooYoung(now: now)
        XCTAssertEqual(thirteen.name, "Ren")
    }

    func testAVerifiedPlayerIsAskedTheNameOnly() {
        var form = NameAndBirthdayForm()
        form.asksBirthday = false
        form.name = "Ren"
        XCTAssertTrue(form.canContinue(now: now))
        XCTAssertEqual(form.hint(now: now), .none)
        XCTAssertNil(form.ageBand(now: now))
    }

    func testTheNameStopsAtTwentyFour() {
        var form = NameAndBirthdayForm()
        form.name = String(repeating: "a", count: 30)
        XCTAssertEqual(form.name.count, NameAndBirthdayForm.nameLimit)
    }
}
