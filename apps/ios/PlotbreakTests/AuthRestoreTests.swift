import XCTest
@testable import Plotbreak

final class AuthRestoreTests: XCTestCase {
    /// An auth server nothing can reach. If restore touches the network with
    /// this client it fails, and the test sees a nil identity or a long wait.
    private let unreachable = SupabaseAuth(url: URL(string: "http://127.0.0.1:9")!, anonKey: "test")

    private func session(expiresIn: TimeInterval) -> AuthSession {
        AuthSession(
            accessToken: "access",
            refreshToken: "refresh",
            expiresAt: Date().timeIntervalSince1970 + expiresIn,
            userId: "user_1",
            email: "player@example.com",
            isAnonymous: false
        )
    }

    func testRestoreAdoptsStoredSessionWithoutNetwork() async {
        let store = AuthStore(client: unreachable, vault: .inMemory(session(expiresIn: 3600)))
        let started = Date()
        let identity = await store.restore()
        XCTAssertEqual(identity, AuthIdentity(userId: "user_1", email: "player@example.com", isGuest: false))
        XCTAssertLessThan(Date().timeIntervalSince(started), 0.5, "restore must not wait on the auth server")
    }

    func testExpiredStoredSessionStillNamesThePlayer() async {
        // Who the player is does not expire with the access token. The first
        // request renews it; launch does not.
        let store = AuthStore(client: unreachable, vault: .inMemory(session(expiresIn: -3600)))
        let identity = await store.restore()
        XCTAssertEqual(identity?.userId, "user_1")
    }

    func testSessionSurvivesEncoding() throws {
        let original = session(expiresIn: 60)
        let data = try JSONEncoder().encode(original)
        XCTAssertEqual(try JSONDecoder().decode(AuthSession.self, from: data), original)
    }

    func testEmptyVaultWithoutClientIsDevGuest() async {
        let store = AuthStore(client: nil, vault: .inMemory())
        let identity = await store.restore()
        XCTAssertEqual(identity?.isGuest, true)
    }
}
