import XCTest
@testable import Plotbreak

/// Continue rows, Library rows and the credit wall quote the last thing a
/// character said (design v3). The fields are new, so a production server
/// that has not deployed them must still decode to today's rows.
final class SpeakerLineDecodingTests: XCTestCase {
    private let line = #"{"characterId":"ayame","name":"Ayame","portrait":"https://x/ayame","text":"“Two is the lift.”","turnIndex":3}"#

    private func card(_ extra: String) throws -> ContinueCard {
        let json = """
        {"sessionId":"s1","storyId":"st","title":"Hush House","coverImage":null,"lastPlayedAt":"2026-11-23T10:00:00Z",
         "turnCount":3,"currentObjective":"Find the key","recapLine":"The lift is out."\(extra)}
        """
        return try JSONDecoder.plotbreak.decode(ContinueCard.self, from: Data(json.utf8))
    }

    private func session(_ extra: String) throws -> SessionSummary {
        let json = """
        {"sessions":[{"sessionId":"s1","storyId":"st","storyVersionId":"sv","title":"Hush House","coverImage":null,
         "revision":4,"turnCount":3,"status":"ACTIVE","createdAt":"2026-11-20T10:00:00Z",
         "lastPlayedAt":"2026-11-23T10:00:00Z","displayName":"Ren","forkedFromSessionId":null,
         "forkedAtTurnIndex":null,"locale":"en"\(extra)}]}
        """
        return try JSONDecoder.plotbreak.decode(SessionsResponse.self, from: Data(json.utf8)).sessions[0]
    }

    func testOldContinueCardDecodesWithoutTheNewFields() throws {
        let card = try card("")
        XCTAssertNil(card.displayName)
        XCTAssertNil(card.lastLine)
        XCTAssertEqual(card.recapLine, "The lift is out.")
    }

    func testNewContinueCardDecodesNameAndLine() throws {
        let card = try card(#","displayName":"Ren","lastLine":\#(line)"#)
        XCTAssertEqual(card.displayName, "Ren")
        XCTAssertEqual(card.lastLine, SpeakerLine(characterId: "ayame", name: "Ayame", portrait: "https://x/ayame",
                                                  text: "“Two is the lift.”", turnIndex: 3))
    }

    func testContinueCardWithNullFieldsDecodes() throws {
        let card = try card(#","displayName":null,"lastLine":null"#)
        XCTAssertNil(card.displayName)
        XCTAssertNil(card.lastLine)
    }

    func testOldSessionSummaryDecodesWithoutTheNewFields() throws {
        let row = try session("")
        XCTAssertNil(row.lastLine)
        XCTAssertNil(row.recapLine)
        XCTAssertNil(row.playingAs)
        XCTAssertEqual(row.displayName, "Ren")
    }

    func testPlayingAsDecodesBesideTheRunLabel() throws {
        let row = try session(#","playingAs":"Itachi""#)
        XCTAssertEqual(row.playingAs, "Itachi")
        XCTAssertEqual(row.displayName, "Ren")
        XCTAssertNil(try session(#","playingAs":null"#).playingAs)
    }

    func testNewSessionSummaryDecodesLineAndRecap() throws {
        let row = try session(#","lastLine":\#(line),"recapLine":"The lift is out.""#)
        XCTAssertEqual(row.lastLine?.name, "Ayame")
        XCTAssertNil(try session(#","lastLine":null,"recapLine":"The lift is out.""#).lastLine)
        XCTAssertEqual(row.recapLine, "The lift is out.")
    }

    func testAPortraitCanBeNull() throws {
        let card = try card(#","lastLine":{"characterId":"a","name":"A","portrait":null,"text":"“Hi.”","turnIndex":0}"#)
        XCTAssertNil(card.lastLine?.portrait)
    }
}

/// The client twin of `services/api/src/last-line.ts`, which picks the quote
/// for the credit wall from the turns the session screen already holds.
final class SpeakerLineRuleTests: XCTestCase {
    private let cast = [
        CastRef(id: "ayame", name: "Ayame", portrait: "https://x/ayame"),
        CastRef(id: "ren", name: "Ren", portrait: nil),
    ]

    private func block(_ speaker: String?, _ text: String, type: BlockType? = nil, visibility: String = "GROUP") -> NarrativeBlock {
        NarrativeBlock(type: type ?? (speaker == nil ? .NARRATION : .DIALOGUE), speakerId: speaker, text: text,
                       visibility: visibility, voiceEligible: false)
    }

    private func turn(_ index: Int, _ blocks: [NarrativeBlock]) throws -> PlayerTurnRecord {
        let json = """
        {"turnId":"t\(index)","sessionId":"s1","turnIndex":\(index),"actionText":null,"qualityTier":"VIVID",
         "creditsCharged":0,"revisionAfter":\(index),"createdAt":"2026-11-23T10:00:00Z"}
        """
        var record = try JSONDecoder.plotbreak.decode(PlayerTurnRecord.self, from: Data(json.utf8))
        record.blocks = blocks
        return record
    }

    func testNewestDialogueAcrossTurnsWins() throws {
        let turns = [
            try turn(0, [block("ayame", "“First.”")]),
            try turn(1, [block("ayame", "“Earlier.”"), block("ren", "“Later.”"), block(nil, "She turns away.")]),
            try turn(2, [block(nil, "Nobody speaks.")]),
        ]
        XCTAssertEqual(SpeakerLine.latest(turns: turns, cast: cast),
                       SpeakerLine(characterId: "ren", name: "Ren", portrait: nil, text: "“Later.”", turnIndex: 1))
    }

    func testOrderOfTurnsDoesNotMatter() throws {
        let turns = [try turn(5, [block("ren", "“Newest.”")]), try turn(4, [block("ayame", "“Older.”")])]
        XCTAssertEqual(SpeakerLine.latest(turns: turns, cast: cast)?.text, "“Newest.”")
    }

    func testANullSpeakerIsSkipped() throws {
        let turns = [try turn(1, [block("ayame", "“Cast.”"), block(nil, "“Nobody.”", type: .DIALOGUE)])]
        XCTAssertEqual(SpeakerLine.latest(turns: turns, cast: cast)?.characterId, "ayame")
    }

    func testAnUnknownSpeakerIsSkipped() throws {
        let turns = [try turn(1, [block("ayame", "“Known.”"), block("ghost", "“Unknown.”")])]
        XCTAssertEqual(SpeakerLine.latest(turns: turns, cast: cast)?.text, "“Known.”")
    }

    func testAPrivateLineIsSkipped() throws {
        let turns = [try turn(1, [block("ayame", "“Aloud.”"), block("ren", "“Aside.”", visibility: "NPC_PRIVATE")])]
        XCTAssertEqual(SpeakerLine.latest(turns: turns, cast: cast)?.text, "“Aloud.”")
    }

    func testLooksBackThreeTurnsAndNoFurther() throws {
        let spoken = try turn(0, [block("ayame", "“Long ago.”")])
        let quiet = try (1...3).map { try turn($0, [block(nil, "Rain.")]) }
        XCTAssertEqual(SpeakerLine.latest(turns: [spoken] + quiet.prefix(2), cast: cast)?.text, "“Long ago.”")
        XCTAssertNil(SpeakerLine.latest(turns: [spoken] + quiet, cast: cast))
    }

    func testNoTurnsOrNoCastIsNil() throws {
        XCTAssertNil(SpeakerLine.latest(turns: [], cast: cast))
        XCTAssertNil(SpeakerLine.latest(turns: [try turn(1, [block("ayame", "“Hi.”")])], cast: []))
    }

    /// Some worlds store dialogue without quote marks. A bare line gets the
    /// interface language's marks; a line that has its own is left alone.
    func testABareLineIsQuotedInTheInterfaceLanguage() {
        XCTAssertEqual(SpeakerLine.quoted("“Already quoted.”", Translator(locale: .en)), "“Already quoted.”")
        XCTAssertEqual(SpeakerLine.quoted("« Déjà. »", Translator(locale: .fr)), "« Déjà. »")
        XCTAssertEqual(SpeakerLine.quoted("Bare line.", Translator(locale: .en)), "“Bare line.”")
        XCTAssertEqual(SpeakerLine.quoted("Bare line.", Translator(locale: .fr)), "«\u{00A0}Bare line.\u{00A0}»")
        XCTAssertEqual(SpeakerLine.quoted("", Translator(locale: .en)), "")
        // An apostrophe is not a quote mark: the line is still bare.
        XCTAssertEqual(SpeakerLine.quoted("That’s the fish path.", Translator(locale: .en)), "“That’s the fish path.”")
    }

    /// A gesture then the words, or the tail of a line split across blocks:
    /// both already have their marks, and wrapping them nests a second pair.
    func testALineWithMarksInsideIsLeftAlone() {
        let en = Translator(locale: .en)
        XCTAssertEqual(SpeakerLine.quoted("She glances at Bruno. “We came down.”", en), "She glances at Bruno. “We came down.”")
        XCTAssertEqual(SpeakerLine.quoted("Mira Holt: \"Use Mira.\"", en), "Mira Holt: \"Use Mira.\"")
        XCTAssertEqual(SpeakerLine.quoted("and then I’ll tell you.”", en), "and then I’ll tell you.”")
    }

    func testCapMatchesTheServer() {
        XCTAssertEqual(SpeakerLine.cap("  “Short.”  "), "“Short.”")
        let long = "“" + Array(repeating: "word", count: 100).joined(separator: " ") + "”"
        let capped = SpeakerLine.cap(long)
        XCTAssertLessThanOrEqual(capped.count, SpeakerLine.maxLength)
        XCTAssertTrue(capped.hasSuffix("word…”"))
        XCTAssertEqual(SpeakerLine.cap(String(repeating: "x", count: 400)), String(repeating: "x", count: 279) + "…")
        XCTAssertEqual(SpeakerLine.cap("one two, three four", max: 12), "one two…")
    }
}
