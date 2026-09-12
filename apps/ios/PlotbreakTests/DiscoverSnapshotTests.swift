import XCTest
@testable import Plotbreak

final class DiscoverSnapshotTests: XCTestCase {
    private var snapshot: DiscoverSnapshot!

    override func setUp() {
        let dir = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        snapshot = DiscoverSnapshot(fileURL: dir.appendingPathComponent("discover-snapshot.json"))
    }

    override func tearDown() {
        snapshot.clear()
    }

    private func shelf(activeCategory: String? = nil) -> DiscoverResponse {
        let json = """
        {"rails":[{"id":"hero","title":"Featured","kind":"HERO","stories":[]}],
         "continueCards":[],"categories":[{"id":"sports","label":"Sports"}],
         "activeCategory":\(activeCategory.map { "\"\($0)\"" } ?? "null")}
        """
        return try! JSONDecoder.plotbreak.decode(DiscoverResponse.self, from: Data(json.utf8))
    }

    func testEmptyIsNil() {
        XCTAssertNil(snapshot.load())
    }

    func testRoundTrip() {
        let shelf = shelf()
        snapshot.save(shelf)
        XCTAssertEqual(snapshot.load(), shelf)
    }

    func testClearForgets() {
        snapshot.save(shelf())
        snapshot.clear()
        XCTAssertNil(snapshot.load())
    }

    func testGarbageIsNil() {
        try! Data("not json".utf8).write(to: snapshot.fileURL)
        XCTAssertNil(snapshot.load())
    }

    func testOtherFormatVersionIsNil() {
        // A file from a build whose DiscoverResponse had a different shape must
        // read as absent, not crash or half-decode.
        let stale = """
        {"formatVersion":\(DiscoverSnapshot.formatVersion + 1),"savedAt":0,"response":{"rails":[]}}
        """
        try! Data(stale.utf8).write(to: snapshot.fileURL)
        XCTAssertNil(snapshot.load())
    }

    func testSecondSaveReplacesFirst() {
        snapshot.save(shelf())
        snapshot.save(shelf(activeCategory: "sports"))
        XCTAssertEqual(snapshot.load()?.activeCategory, "sports")
    }
}
