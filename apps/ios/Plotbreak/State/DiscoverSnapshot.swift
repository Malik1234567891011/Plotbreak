import Foundation

/// The last Discover shelf this phone saw, kept on disk so the next launch can
/// draw it before the network answers.
///
/// Every launch showed a skeleton for as long as `/v1/discover` took, which is
/// 0.2 s on a good day and "the app is broken" on a bad one. The catalogue
/// changes rarely, so yesterday's shelf is almost always today's shelf, and a
/// stale one for half a second is a better first frame than grey boxes.
///
/// One snapshot, for the default (uncategorised) view only. A category tab is a
/// filter the player chose a moment ago; it does not need to survive a launch.
/// The snapshot is personal — it carries saves, hidden worlds and taste ranking —
/// so `AppStore` forgets it whenever the account changes, and that next launch
/// shows the skeleton once.
struct DiscoverSnapshot {
    /// Bump when `DiscoverResponse` changes shape in a way old files should not
    /// survive. A file from another version is treated as absent.
    static let formatVersion = 1

    let fileURL: URL

    /// The app's snapshot, in Caches: the system may evict it under pressure,
    /// and losing it costs one skeleton, not data.
    static func standard() -> DiscoverSnapshot {
        let caches = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first
            ?? FileManager.default.temporaryDirectory
        return DiscoverSnapshot(fileURL: caches.appendingPathComponent("discover-snapshot.json"))
    }

    private struct Envelope: Codable {
        var formatVersion: Int
        var savedAt: Date
        var response: DiscoverResponse
    }

    /// The saved shelf, or nil when there is none, it is unreadable, or it was
    /// written by another format version. Never throws: a bad file is the same
    /// as no file.
    func load() -> DiscoverResponse? {
        guard let data = try? Data(contentsOf: fileURL),
              let envelope = try? JSONDecoder.plotbreak.decode(Envelope.self, from: data),
              envelope.formatVersion == Self.formatVersion
        else { return nil }
        return envelope.response
    }

    /// Writes atomically, so a crash mid-write leaves the previous snapshot
    /// rather than half a file. Failures are swallowed: the cache is a
    /// convenience and the shelf on screen is already correct.
    func save(_ response: DiscoverResponse, at date: Date = Date()) {
        let envelope = Envelope(formatVersion: Self.formatVersion, savedAt: date, response: response)
        guard let data = try? JSONEncoder.plotbreak.encode(envelope) else { return }
        try? data.write(to: fileURL, options: .atomic)
    }

    func clear() {
        try? FileManager.default.removeItem(at: fileURL)
    }
}
