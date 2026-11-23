import XCTest
@testable import Plotbreak

/// Design gap lane B: the story page's endings count and share link, Search's
/// Characters tab, and the role tiles with art. Every new field is optional, so
/// each test that reads one also reads the payload a production server sends
/// today, without it.
final class StoryCatalogTests: XCTestCase {
    private let story = """
    {"storyId":"story_hush_house","storyVersionId":"v1","title":"Hush House","fantasyLabel":"F",
     "hook":"Do not open the door at 2:13 a.m.","creatorName":"Plotbreak Studios","official":true,
     "coverImage":"https://cdn/cover","keyArt":"https://cdn/key","intensity":"INTENSE","runs":3,"likes":4,
     "updatedAt":"2026-11-23T00:00:00Z"}
    """

    private func detail(endingCount: String = "", image: String = "") -> StoryDetailResponse {
        let json = """
        {"story":\(story),"premise":"P","stats":{"runs":3,"medianDepthLabel":"Open-ended","intensity":"INTENSE","updatedAt":"x"},
         "archetypes":[{"id":"arch_night_shift","name":"Night Shift","role":"Practical and awake","summary":"S","grants":{}\(image)}]
         \(endingCount)}
        """
        return try! JSONDecoder.plotbreak.decode(StoryDetailResponse.self, from: Data(json.utf8))
    }

    // MARK: Endings

    func testOldStoryPayloadHasNoEndingsOrArt() {
        let old = detail()
        XCTAssertEqual(old.endingCount, 0)
        XCTAssertNil(old.archetypes.first?.image)
        XCTAssertNil(StoryEndingsLabel.text(count: old.endingCount, t: Translator(locale: .en)))
        XCTAssertFalse(RoleArt.showsArt(old.archetypes))
    }

    func testEndingCountReadsAndPluralises() {
        let new = detail(endingCount: #","endingCount":9"#)
        XCTAssertEqual(new.endingCount, 9)
        XCTAssertEqual(StoryEndingsLabel.text(count: 9, t: Translator(locale: .en)), "9 endings")
        XCTAssertEqual(StoryEndingsLabel.text(count: 1, t: Translator(locale: .en)), "1 ending")
        XCTAssertEqual(StoryEndingsLabel.text(count: 9, t: Translator(locale: .fr)), "9 fins")
        XCTAssertEqual(StoryEndingsLabel.text(count: 1, t: Translator(locale: .fr)), "1 fin")
        XCTAssertNil(StoryEndingsLabel.text(count: 0, t: Translator(locale: .en)))
    }

    // MARK: Share

    func testShareLinkIsTheAppStorePage() {
        XCTAssertEqual(StoryShareLink.url(appID: "6811307049")?.absoluteString, "https://apps.apple.com/app/id6811307049")
        XCTAssertEqual(StoryShareLink.url(appID: " 6811307049\n")?.absoluteString, "https://apps.apple.com/app/id6811307049")
    }

    func testNoShareLinkWithoutAnAppID() {
        XCTAssertNil(StoryShareLink.url(appID: nil))
        XCTAssertNil(StoryShareLink.url(appID: ""))
        // An unexpanded build setting is not an id.
        XCTAssertNil(StoryShareLink.url(appID: "$(PLOTBREAK_APPLE_APP_ID)"))
    }

    func testShareMessageNamesTheStory() {
        XCTAssertEqual(
            StoryShareLink.message(title: "Hush House", hook: "Do not open the door at 2:13 a.m.", t: Translator(locale: .en)),
            "Hush House on Plotbreak. Do not open the door at 2:13 a.m."
        )
        XCTAssertEqual(
            StoryShareLink.message(title: "Hush House", hook: "N’ouvre pas.", t: Translator(locale: .fr)),
            "Hush House sur Plotbreak. N’ouvre pas."
        )
    }

    // MARK: Role art

    func testRoleImageReadsAndTurnsOnTheArtGrid() {
        let new = detail(image: #","image":"https://cdn/story_hush_house/stage_hall_third""#)
        XCTAssertEqual(new.archetypes.first?.image, "https://cdn/story_hush_house/stage_hall_third")
        XCTAssertTrue(RoleArt.showsArt(new.archetypes))
        XCTAssertEqual(RoleArt.somethingElseImage(new.story), "https://cdn/key")
    }

    func testNullRoleImageKeepsTheTextGrid() {
        let new = detail(image: #","image":null"#)
        XCTAssertNil(new.archetypes.first?.image)
        XCTAssertFalse(RoleArt.showsArt(new.archetypes))
    }

    func testRolesPairIntoRows() {
        XCTAssertEqual(RoleArt.rows([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
        XCTAssertEqual(RoleArt.rows([1, 2]), [[1, 2]])
        XCTAssertEqual(RoleArt.rows([Int]()), [])
    }

    // MARK: Search

    func testOldSearchPayloadHidesTheTabs() throws {
        let json = #"{"results":[]}"#
        let response = try JSONDecoder.plotbreak.decode(SearchResponse.self, from: Data(json.utf8))
        XCTAssertNil(response.characters)
        XCTAssertFalse(SearchTab.showsTabs(characters: response.characters, query: "ayame"))
    }

    func testSearchCharactersDecodeAndShowTheTabs() throws {
        let json = """
        {"results":[],"characters":[{"characterId":"ayame","name":"Ayame Kurose","role":"Room 314",
         "cardBlurb":"Your neighbour.","portrait":null,"storyId":"story_hush_house","storyTitle":"Hush House","coverImage":null}]}
        """
        let response = try JSONDecoder.plotbreak.decode(SearchResponse.self, from: Data(json.utf8))
        let ayame = try XCTUnwrap(response.characters?.first)
        XCTAssertEqual(ayame.name, "Ayame Kurose")
        XCTAssertEqual(ayame.storyId, "story_hush_house")
        XCTAssertEqual(ayame.id, "story_hush_house/ayame")
        XCTAssertTrue(SearchTab.showsTabs(characters: response.characters, query: "ayame"))
    }

    func testTabsNeedATypedQuery() {
        XCTAssertFalse(SearchTab.showsTabs(characters: [], query: ""))
        XCTAssertFalse(SearchTab.showsTabs(characters: [], query: "   "))
        // An empty list from a new server is a real "nobody matched".
        XCTAssertTrue(SearchTab.showsTabs(characters: [], query: "zzz"))
    }

    func testCharacterLineReadsRoleThenStory() {
        let en = Translator(locale: .en)
        XCTAssertEqual(
            SearchCharacterLine.text(role: "Room 314. Four years into an investigation nobody asked her to run", story: "Hush House", t: en),
            "Room 314 · Hush House"
        )
        XCTAssertEqual(
            SearchCharacterLine.text(role: "Landlady, fourth of her family to hold the agreement", story: "Hush House", t: en),
            "Landlady · Hush House"
        )
        XCTAssertEqual(SearchCharacterLine.text(role: "  ", story: "Hush House", t: en), "Hush House")
        XCTAssertEqual(
            SearchCharacterLine.text(role: "Chambre 314. Quatre ans", story: "Hush House", t: Translator(locale: .fr)),
            "Chambre 314 · Hush House"
        )
    }
}
