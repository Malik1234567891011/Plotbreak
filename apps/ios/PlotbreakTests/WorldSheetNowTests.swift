import XCTest
@testable import Plotbreak

/// Design v3's World Sheet "Now" tab: the payload it decodes (old and new
/// servers), the tab it opens on, and how it orders the open threads.
final class WorldSheetNowTests: XCTestCase {
    // MARK: Payload

    /// A world sheet as the API sends it. `hereNow` is spliced into the
    /// overview only when given, so `nil` is exactly an older server's payload.
    private func sheetJSON(hereNow: String? = nil, objective: String = "\"Find out who lives in 309.\"",
                           quests: String = "[]", inventory: String = "[]", events: String = "[]") -> String {
        let here = hereNow.map { ", \"hereNow\": \($0)" } ?? ""
        return """
        {
          "overview": {
            "locationName": "Room 314", "worldTimeLabel": "9:02 p.m.", "chapterLabel": "Episode 1",
            "topObjective": \(objective), "resources": [], "statuses": [], "relationshipHighlights": [],
            "recentEvents": \(events)\(here)
          },
          "character": {
            "identity": { "displayName": "Ren", "pronouns": "they/them" },
            "level": 1, "xp": 0, "progressionMode": "LEVEL", "milestones": [], "attributes": [],
            "skills": [], "abilities": [], "statuses": [], "factions": [], "canonFacts": []
          },
          "inventory": \(inventory),
          "quests": \(quests),
          "relationships": [],
          "map": { "currentLocationId": "room_314", "nodes": [], "edges": [] }
        }
        """
    }

    private func decode(_ json: String) throws -> WorldSheetResponse {
        try JSONDecoder.plotbreak.decode(WorldSheetResponse.self, from: Data(json.utf8))
    }

    private func quest(_ id: String, _ status: String, step: String? = nil, summary: String = "") -> String {
        let stepJSON = step.map { "\"\($0)\"" } ?? "null"
        return """
        { "questId": "\(id)", "title": "Quest \(id)", "summary": "\(summary)", "status": "\(status)",
          "currentStepCopy": \(stepJSON), "deadlineLabel": null, "rewardCopy": "", "involvedNames": [] }
        """
    }

    func testAnOlderServerHasNoHereNowAndTheSectionIsHidden() throws {
        let sheet = try decode(sheetJSON())
        XCTAssertNil(sheet.overview.hereNow)
        XCTAssertNil(WorldSheetNow(sheet: sheet).hereNow)
    }

    func testHereNowDecodesWithFacesAndLines() throws {
        let sheet = try decode(sheetJSON(hereNow: """
        [{ "characterId": "ayame", "name": "Ayame Kurose", "portrait": "https://cdn.test/ayame.webp",
           "line": "Your neighbour. Has not slept since the spring." },
         { "characterId": "hollis", "name": "Mr. Hollis", "portrait": null }]
        """))
        let people = try XCTUnwrap(sheet.overview.hereNow)
        XCTAssertEqual(people.map(\.characterId), ["ayame", "hollis"])
        XCTAssertEqual(people[0].portrait, "https://cdn.test/ayame.webp")
        XCTAssertNil(people[1].portrait)
        // A missing line is an empty one, not a failed decode.
        XCTAssertEqual(people[1].line, "")
    }

    func testAnEmptyRoomFromANewServerIsNotNil() throws {
        let sheet = try decode(sheetJSON(hereNow: "[]"))
        XCTAssertEqual(sheet.overview.hereNow, [])
    }

    // MARK: Opening tab

    func testTheSheetOpensOnNow() {
        XCTAssertEqual(WorldSheetTab.initial(nil), .now)
        XCTAssertEqual(WorldSheetTab.initial("now"), .now)
        // The retired tabs, which the objective strip and older call sites ask for.
        XCTAssertEqual(WorldSheetTab.initial("overview"), .now)
        XCTAssertEqual(WorldSheetTab.initial("quests"), .now)
        XCTAssertEqual(WorldSheetTab.initial("nonsense"), .now)
        // The surviving tabs keep their names.
        XCTAssertEqual(WorldSheetTab.initial("relationships"), .relationships)
        XCTAssertEqual(WorldSheetTab.initial("inventory"), .inventory)
        XCTAssertEqual(WorldSheetTab.initial("character"), .character)
    }

    func testTheStripFollowsTheBoard() {
        XCTAssertEqual(WorldSheetTab.allCases, [.now, .relationships, .inventory, .map, .timeline, .character])
    }

    // MARK: Open threads

    func testTheObjectiveIsNotListedTwice() throws {
        // The engine's objective is the top active quest's step, so that quest
        // leads and the objective gets no row of its own.
        let sheet = try decode(sheetJSON(quests: "[\(quest("a", "ACTIVE", step: "Ask Hollis about the lift.")), \(quest("b", "ACTIVE", step: "Find out who lives in 309."))]"))
        let threads = WorldSheetNow(sheet: sheet).threads
        XCTAssertEqual(threads.map(\.id), ["b", "a"])
        XCTAssertEqual(threads[0].detail, "Find out who lives in 309.")
        XCTAssertFalse(threads.contains { $0.done })
    }

    func testAnObjectiveNoQuestExplainsGetsItsOwnRow() throws {
        let sheet = try decode(sheetJSON(quests: "[\(quest("a", "ACTIVE", step: "Ask Hollis about the lift."))]"))
        let threads = WorldSheetNow(sheet: sheet).threads
        XCTAssertEqual(threads.map(\.id), ["objective", "a"])
        XCTAssertEqual(threads[0].title, "Find out who lives in 309.")
        XCTAssertNil(threads[0].detail)
    }

    func testAHiddenStepKeepsTheObjectiveAsItsLine() throws {
        // The step is hidden (no step copy) and the objective is the summary.
        let sheet = try decode(sheetJSON(quests: "[\(quest("a", "ACTIVE", summary: "Find out who lives in 309."))]"))
        let threads = WorldSheetNow(sheet: sheet).threads
        XCTAssertEqual(threads.map(\.id), ["a"])
        XCTAssertEqual(threads[0].detail, "Find out who lives in 309.")
    }

    func testOnlyTheLastThreeFinishedQuestsStayMutedUnderTheOpenOnes() throws {
        let quests = [
            quest("open", "ACTIVE", step: "Find out who lives in 309."),
            quest("c1", "COMPLETED"), quest("lead", "AVAILABLE"), quest("c2", "COMPLETED"),
            quest("c3", "COMPLETED"), quest("lost", "FAILED"), quest("c4", "COMPLETED"),
        ].joined(separator: ",")
        let threads = WorldSheetNow(sheet: try decode(sheetJSON(quests: "[\(quests)]"))).threads
        XCTAssertEqual(threads.map(\.id), ["open", "c2", "c3", "c4"])
        XCTAssertEqual(threads.map(\.done), [false, true, true, true])
    }

    func testNoObjectiveAndNoQuestsIsNoThreads() throws {
        let sheet = try decode(sheetJSON(objective: "null"))
        XCTAssertEqual(WorldSheetNow(sheet: sheet).threads, [])
        XCTAssertTrue(WorldSheetNow(sheet: sheet).isEmpty)
    }

    func testCarryingAndLately() throws {
        let item = """
        { "entryId": "e1", "itemId": "keys", "name": "The keys to 312", "quantity": 1, "equipped": false,
          "equipSlot": null, "rarity": null, "icon": null, "effects": [], "description": "", "loreText": "",
          "canUse": false, "canEquip": false }
        """
        let sheet = try decode(sheetJSON(objective: "null", inventory: "[\(item)]", events: "[\"Ayame brought coffee.\", \"  \"]"))
        let now = WorldSheetNow(sheet: sheet)
        XCTAssertEqual(now.carrying.map(\.name), ["The keys to 312"])
        // A blank memory is not an event.
        XCTAssertEqual(now.lately, ["Ayame brought coffee."])
        XCTAssertFalse(now.isEmpty)
    }
}
