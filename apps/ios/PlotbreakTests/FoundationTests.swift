import XCTest
@testable import Plotbreak

final class ICUMessageTests: XCTestCase {
    func testSimpleArgument() {
        XCTAssertEqual(ICUMessage.render("Hello {name}", args: ["name": "Ren"], locale: .en), "Hello Ren")
    }

    func testPluralEnglish() {
        let message = "{title} · {count, plural, one {# turn} other {# turns}}"
        XCTAssertEqual(ICUMessage.render(message, args: ["title": "Ash", "count": 1], locale: .en), "Ash · 1 turn")
        XCTAssertEqual(ICUMessage.render(message, args: ["title": "Ash", "count": 12], locale: .en), "Ash · 12 turns")
    }

    func testPluralFrenchZeroIsSingular() {
        let message = "{count, plural, one {# tour} other {# tours}}"
        XCTAssertEqual(ICUMessage.render(message, args: ["count": 0], locale: .fr), "0 tour")
        XCTAssertEqual(ICUMessage.render(message, args: ["count": 2], locale: .fr), "2 tours")
    }

    func testExactMatchWins() {
        let message = "{count, plural, =0 {none} one {one} other {# things}}"
        XCTAssertEqual(ICUMessage.render(message, args: ["count": 0], locale: .en), "none")
    }

    func testSelect() {
        let message = "{gender, select, feminine {elle} masculine {il} other {iel}}"
        XCTAssertEqual(ICUMessage.render(message, args: ["gender": "feminine"], locale: .fr), "elle")
        XCTAssertEqual(ICUMessage.render(message, args: ["gender": "x"], locale: .fr), "iel")
    }

    func testApostrophes() {
        XCTAssertEqual(ICUMessage.render("You're offline", args: [:], locale: .en), "You're offline")
        XCTAssertEqual(ICUMessage.render("It''s '{'literal'}'", args: [:], locale: .en), "It's {literal}")
    }

    func testMissingArgumentIsVisible() {
        XCTAssertEqual(ICUMessage.render("Hi {name}", args: [:], locale: .en), "Hi {name}")
    }

    func testCatalogueLoads() {
        let en = Translator(locale: .en)
        XCTAssertEqual(en("nav.discover"), "Discover")
        let fr = Translator(locale: .fr)
        XCTAssertNotEqual(fr("nav.discover"), "nav.discover")
    }
}

final class FormatTests: XCTestCase {
    func testCreditsEnglishKeepsHandRolledCompact() {
        XCTAssertEqual(Format.credits(9_999, compact: true), "9,999")
        XCTAssertEqual(Format.credits(10_000, compact: true), "10K")
        XCTAssertEqual(Format.credits(10_850, compact: true), "10.8K")
        XCTAssertEqual(Format.credits(2_500_000, compact: true), "2.5M")
        XCTAssertEqual(Format.credits(12_345, compact: false), "12,345")
    }

    func testCreditsFrenchGroupsWithNoBreakSpace() {
        let text = Format.credits(12_345, locale: .fr)
        XCTAssertFalse(text.contains("\u{202F}"))
        XCTAssertTrue(text.contains("\u{00A0}") || text.contains(" "))
    }
}

final class ModelDecodingTests: XCTestCase {
    func testLenientEnumAndDefaults() throws {
        let json = """
        {"storyId":"s1","storyVersionId":"v1","title":"T","fantasyLabel":"F","hook":"H","creatorName":"C","official":true,
         "coverImage":null,"keyArt":null,"tags":["a"],"mechanicsChips":[],"contentDescriptors":["ROMANCE","SOMETHING_NEW"],
         "intensity":"WILD","runs":3,"likes":4,"updatedAt":"2026-09-11T00:00:00Z"}
        """
        let story = try JSONDecoder.plotbreak.decode(StorySummary.self, from: Data(json.utf8))
        XCTAssertEqual(story.contentDescriptors, [.ROMANCE, .UNKNOWN])
        XCTAssertEqual(story.intensity, .MODERATE)
        XCTAssertEqual(story.comments, 0)
        XCTAssertFalse(story.saved)
        XCTAssertEqual(story.badges, [])
    }

    func testStreamFrame() throws {
        let json = #"{"event":"text.delta","turnId":"t","sequence":3,"data":{"blockIndex":0,"text":"Hi","type":"NARRATION"}}"#
        let frame = try JSONDecoder.plotbreak.decode(TurnStreamFrame.self, from: Data(json.utf8))
        XCTAssertEqual(frame.event, .textDelta)
        XCTAssertEqual(frame.data["blockIndex"]?.intValue, 0)
        XCTAssertEqual(frame.data["text"]?.stringValue, "Hi")
    }

    func testUnknownEventDoesNotThrow() throws {
        let json = #"{"event":"something.else","data":{}}"#
        let frame = try JSONDecoder.plotbreak.decode(TurnStreamFrame.self, from: Data(json.utf8))
        XCTAssertEqual(frame.event, .unknown)
    }

    func testAPIErrorDetails() {
        let error = APIError(status: 402, code: "INSUFFICIENT_CREDITS", message: "m", details: ["shortfall": .number(120)])
        XCTAssertEqual(error.shortfall, 120)
        XCTAssertTrue(error.isInsufficientCredits)
    }
}

final class SSEFrameTests: XCTestCase {
    /// The exact shape `formatSse` writes in `services/api/src/stream.ts`.
    private let frame = #"data: {"event":"text.delta","turnId":"t1","sequence":4,"data":{"blockIndex":1,"text":"He does not move."}}"#

    func testParsesADataLine() throws {
        let parsed = try XCTUnwrap(APIClient.parseFrame(frame))
        XCTAssertEqual(parsed.event, .textDelta)
        XCTAssertEqual(parsed.sequence, 4)
        XCTAssertEqual(parsed.data["text"]?.stringValue, "He does not move.")
    }

    /// The server writes `event:`, `data:` and `id:` for every event, plus `:`
    /// heartbeat comments. Only the data line carries the payload.
    func testIgnoresEveryOtherLineKind() {
        XCTAssertNil(APIClient.parseFrame("event: text.delta"))
        XCTAssertNil(APIClient.parseFrame("id: 4"))
        XCTAssertNil(APIClient.parseFrame(": keep-alive"))
        XCTAssertNil(APIClient.parseFrame(""))
    }

    /// A whole turn's worth of lines, dispatched the way `streamTurn` does it.
    ///
    /// The regression this guards: framing on blank lines. `AsyncLineSequence`
    /// collapses them, so a parser that waits for one dispatches nothing and
    /// every turn falls through to the poller.
    func testDispatchesEveryEventInATurn() {
        let lines = """
        event: turn.accepted
        data: {"event":"turn.accepted","turnId":"t1","sequence":1,"data":{}}
        id: 1

        : keep-alive

        event: check.resolved
        data: {"event":"check.resolved","turnId":"t1","sequence":2,"data":{"outcome":"SUCCESS"}}
        id: 2

        event: turn.completed
        data: {"event":"turn.completed","turnId":"t1","sequence":3,"data":{"creditsCharged":60}}
        id: 3
        """.split(separator: "\n", omittingEmptySubsequences: true).map(String.init)

        var seen: [TurnStreamEventName] = []
        var completed = false
        for line in lines {
            guard let frame = APIClient.parseFrame(line) else { continue }
            seen.append(frame.event)
            if frame.event == .turnCompleted || frame.event == .turnFailed { completed = true }
        }

        XCTAssertEqual(seen, [.turnAccepted, .checkResolved, .turnCompleted])
        XCTAssertTrue(completed, "the stream must settle itself, never leave the poller to finish the turn")
    }
}
