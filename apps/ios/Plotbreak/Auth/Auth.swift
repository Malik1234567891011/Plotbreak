import Foundation
import Security

// MARK: - AuthError

struct AuthError: Error, LocalizedError {
    let message: String
    let code: String
    var errorDescription: String? { message }
    var isOffline: Bool { code == "OFFLINE" }
}

// MARK: - Keychain

/// The refresh token is a credential, so it goes in the keychain. The access
/// token is short-lived and re-derivable, so it stays in memory.
enum Keychain {
    private static let service = "com.plotbreak.app"

    static func get(_ key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne,
        ]
        var item: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
              let data = item as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }

    /// Returns whether the write landed.
    ///
    /// The status used to be discarded. A refresh token that fails to save is
    /// not a small thing: the next launch finds nothing, signs in as a brand new
    /// guest, and the player's runs are gone with no error anywhere. An
    /// unsigned build (`CODE_SIGNING_ALLOWED=NO`) has no keychain access group
    /// and fails here every time, which is exactly how that looks.
    @discardableResult
    static func set(_ value: String, for key: String) -> Bool {
        delete(key)
        let attributes: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
            kSecValueData as String: Data(value.utf8),
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly,
        ]
        let status = SecItemAdd(attributes as CFDictionary, nil)
        if status != errSecSuccess {
            // i18n-exempt: a diagnostic for whoever is reading the log, never shown
            Diagnostics.log("keychain write failed for \(key): OSStatus \(status)")
        }
        return status == errSecSuccess
    }

    static func delete(_ key: String) {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
        ]
        SecItemDelete(query as CFDictionary)
    }
}

// MARK: - Supabase Auth (GoTrue)
//
// Spec §6.4 — Sign in with Apple or an emailed code, and no password creation.
// Written against the REST endpoints rather than a Supabase SDK: what we use
// is six requests.

struct AuthSession: Equatable {
    let accessToken: String
    let refreshToken: String
    /// Epoch seconds. The store refreshes before this, never after.
    let expiresAt: TimeInterval
    let userId: String
    let email: String?
    /// An anonymous Supabase user — a guest who has not signed in yet (§6.3).
    let isAnonymous: Bool
}

struct SupabaseAuth {
    let url: URL
    let anonKey: String
    var translator = Translator(locale: .en)

    private struct GoTrueSession: Decodable {
        struct User: Decodable {
            var id: String?
            var email: String?
            var is_anonymous: Bool?
        }
        var access_token: String?
        var refresh_token: String?
        var expires_in: Double?
        var user: User?
    }

    private struct GoTrueError: Decodable {
        var error_code: String?
        var msg: String?
        var message: String?
        var error_description: String?
    }

    private func post<T: Decodable>(_ path: String, _ body: [String: JSONValue], accessToken: String? = nil) async throws -> T {
        var request = URLRequest(url: URL(string: "/auth/v1" + path, relativeTo: url)!.absoluteURL)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "content-type")
        request.setValue(anonKey, forHTTPHeaderField: "apikey")
        // i18n-exempt: an HTTP Authorization header value, not copy
        request.setValue("Bearer \(accessToken ?? anonKey)", forHTTPHeaderField: "authorization")
        request.httpBody = try JSONEncoder.plotbreak.encode(body)

        let data: Data
        let http: HTTPURLResponse
        do {
            let (received, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse else { throw URLError(.badServerResponse) }
            data = received
            http = httpResponse
        } catch {
            throw AuthError(message: translator("error.offline_try_again"), code: "OFFLINE")
        }

        if http.statusCode == 204 {
            if let empty = EmptyResponse() as? T { return empty }
        }
        if !(200..<300).contains(http.statusCode) {
            let payload = try? JSONDecoder.plotbreak.decode(GoTrueError.self, from: data)
            let code = payload?.error_code ?? String(http.statusCode)
            throw AuthError(message: playerFacingMessage(code: code, payload: payload), code: code)
        }
        if data.isEmpty, let empty = EmptyResponse() as? T { return empty }
        return try JSONDecoder.plotbreak.decode(T.self, from: data)
    }

    struct EmptyResponse: Decodable {}

    /// A guest identity, from Supabase rather than invented on the device (§6.3).
    func signInAnonymously() async throws -> AuthSession {
        try toSession(await post("/signup", [:]))
    }

    /// Sends a six-digit code. No password is ever created (§6.4).
    func sendEmailCode(_ email: String) async throws {
        let _: EmptyResponse = try await post("/otp", [
            "email": .string(email.trimmingCharacters(in: .whitespaces)),
            "create_user": .bool(true),
        ])
    }

    func verifyEmailCode(_ email: String, code: String) async throws -> AuthSession {
        try toSession(await post("/verify", [
            "type": .string("email"),
            "email": .string(email.trimmingCharacters(in: .whitespaces)),
            "token": .string(code.trimmingCharacters(in: .whitespaces)),
        ]))
    }

    /// Sign in with Apple, using the identity token the native sheet returns.
    /// The nonce is passed through so Supabase can check it against the one
    /// the app asked Apple to sign.
    func signInWithIdToken(provider: String, idToken: String, nonce: String?) async throws -> AuthSession {
        var body: [String: JSONValue] = ["provider": .string(provider), "id_token": .string(idToken)]
        if let nonce { body["nonce"] = .string(nonce) }
        return try toSession(await post("/token?grant_type=id_token", body))
    }

    func refresh(_ refreshToken: String) async throws -> AuthSession {
        try toSession(await post("/token?grant_type=refresh_token", ["refresh_token": .string(refreshToken)]))
    }

    /// Best effort: the local session is cleared either way.
    func signOut(accessToken: String) async {
        let _: EmptyResponse? = try? await post("/logout", [:], accessToken: accessToken)
    }

    private func toSession(_ payload: GoTrueSession) throws -> AuthSession {
        guard let access = payload.access_token, let refresh = payload.refresh_token, let userId = payload.user?.id else {
            throw AuthError(message: translator("error.sign_in_failed"), code: "MALFORMED_SESSION")
        }
        return AuthSession(
            accessToken: access,
            refreshToken: refresh,
            expiresAt: Date().timeIntervalSince1970 + (payload.expires_in ?? 3600),
            userId: userId,
            email: payload.user?.email,
            isAnonymous: payload.user?.is_anonymous == true
        )
    }

    /// Provider error codes are not player-facing copy.
    private func playerFacingMessage(code: String, payload: GoTrueError?) -> String {
        switch code {
        case "otp_expired": return translator("error.code_expired")
        case "invalid_credentials", "otp_disabled": return translator("error.code_incorrect")
        case "over_email_send_rate_limit", "over_request_rate_limit", "429": return translator("error.too_many_attempts")
        case "email_address_invalid": return translator("error.email_invalid")
        case "anonymous_provider_disabled": return translator("error.guest_play_unavailable")
        case "signup_disabled": return translator("error.signups_paused")
        default: return payload?.msg ?? payload?.message ?? translator("error.sign_in_failed")
        }
    }
}

// MARK: - AuthStore
//
// Who the player is, for the length of the app's life. Spec §6.3 — a player
// browses and starts a run before signing in. That guest is a real anonymous
// Supabase user, so signing in later upgrades the account in place.

struct AuthIdentity: Equatable {
    let userId: String
    let email: String?
    let isGuest: Bool
}

actor AuthStore {
    private static let refreshTokenKey = "plotbreak.refreshToken"
    private static let devTokenKey = "plotbreak.token"
    /// Renew this far ahead of expiry, so a slow request never races the clock.
    private static let refreshMargin: TimeInterval = 120

    private var client: SupabaseAuth?
    private var session: AuthSession?
    /// The development identity when no Supabase project is configured.
    private var devToken: String?
    private var inFlight: Task<String?, Never>?
    private var translator = Translator(locale: .en)

    init(client: SupabaseAuth? = AuthStore.defaultClient()) {
        self.client = client
    }

    static func defaultClient() -> SupabaseAuth? {
        guard let url = AppConfig.supabaseURL, let key = AppConfig.supabaseAnonKey else { return nil }
        return SupabaseAuth(url: url, anonKey: key)
    }

    func setTranslator(_ translator: Translator) {
        self.translator = translator
        client?.translator = translator
    }

    var configured: Bool { client != nil }

    var identity: AuthIdentity? {
        if let session {
            return AuthIdentity(userId: session.userId, email: session.email, isGuest: session.isAnonymous)
        }
        if let devToken {
            return AuthIdentity(userId: devToken, email: nil, isGuest: devToken.hasPrefix("guest_"))
        }
        return nil
    }

    /// Restores the identity at launch: refresh what is in the keychain, and
    /// if there is nothing there, become a guest.
    func restore() async -> AuthIdentity? {
        guard let client else { return restoreDevIdentity() }

        if let refreshToken = Keychain.get(Self.refreshTokenKey) {
            do {
                adopt(try await client.refresh(refreshToken))
                return identity
            } catch let error as AuthError where error.isOffline {
                return nil
            } catch {
                // Revoked, rotated out, or too old. That is a new guest, not an
                // error the player should have to read.
                Keychain.delete(Self.refreshTokenKey)
            }
        }

        do {
            adopt(try await client.signInAnonymously())
        } catch {
            return nil
        }
        return identity
    }

    /// A valid access token, refreshed if it is about to expire. Concurrent
    /// callers share one refresh, because GoTrue rotates refresh tokens.
    func accessToken(force: Bool = false) async -> String? {
        guard client != nil else { return devToken }
        if !force, let session, session.expiresAt - Date().timeIntervalSince1970 > Self.refreshMargin {
            return session.accessToken
        }
        if let inFlight { return await inFlight.value }
        let task = Task { await self.renew() }
        inFlight = task
        let token = await task.value
        inFlight = nil
        return token
    }

    /// Refresh, or — failing that — become a guest. There is no state in which
    /// having no identity is correct.
    private func renew() async -> String? {
        guard let client else { return nil }
        let refreshToken = session?.refreshToken ?? Keychain.get(Self.refreshTokenKey)
        if let refreshToken {
            do {
                adopt(try await client.refresh(refreshToken))
                return session?.accessToken
            } catch let error as AuthError where error.isOffline {
                // Keep the token we have; it may still be inside its window.
                return session?.accessToken
            } catch {
                clear()
            }
        }
        do {
            adopt(try await client.signInAnonymously())
            return session?.accessToken
        } catch {
            return nil
        }
    }

    func sendEmailCode(_ email: String) async throws {
        guard let client else { throw AuthError(message: translator("error.sign_in_not_configured"), code: "NOT_CONFIGURED") }
        try await client.sendEmailCode(email)
    }

    func verifyEmailCode(_ email: String, code: String) async throws -> AuthIdentity {
        guard let client else { throw AuthError(message: translator("error.sign_in_not_configured"), code: "NOT_CONFIGURED") }
        adopt(try await client.verifyEmailCode(email, code: code))
        return identity!
    }

    func signInWithIdToken(provider: String, idToken: String, nonce: String?) async throws -> AuthIdentity {
        guard let client else { throw AuthError(message: translator("error.sign_in_not_configured"), code: "NOT_CONFIGURED") }
        adopt(try await client.signInWithIdToken(provider: provider, idToken: idToken, nonce: nonce))
        return identity!
    }

    /// Signs out and comes straight back as a guest.
    func signOut() async {
        let token = session?.accessToken
        clear()
        if let client {
            if let token { await client.signOut(accessToken: token) }
            if let fresh = try? await client.signInAnonymously() { adopt(fresh) }
        } else {
            _ = restoreDevIdentity(fresh: true)
        }
    }

    private func adopt(_ session: AuthSession) {
        self.session = session
        Keychain.set(session.refreshToken, for: Self.refreshTokenKey)
    }

    private func clear() {
        session = nil
        Keychain.delete(Self.refreshTokenKey)
    }

    /// With no Supabase project configured the app still has to run against
    /// `npm run api`, whose development verifier accepts a `guest_` token.
    private func restoreDevIdentity(fresh: Bool = false) -> AuthIdentity? {
        var token = fresh ? nil : UserDefaults.standard.string(forKey: Self.devTokenKey)
        if token == nil {
            let random = String(UUID().uuidString.replacingOccurrences(of: "-", with: "").prefix(12)).lowercased()
            token = "guest_\(random)\(String(Int(Date().timeIntervalSince1970), radix: 36))"
            UserDefaults.standard.set(token, forKey: Self.devTokenKey)
        }
        devToken = token
        return identity
    }
}
