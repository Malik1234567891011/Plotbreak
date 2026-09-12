import Foundation
import SwiftUI
import AuthenticationServices
import CryptoKit

// MARK: - AppStore
//
// App-wide state — twin of `apps/mobile/src/state/store.tsx`. Deliberately
// small: the wallet balance, the identity, onboarding progress, and the
// bootstrap payload. Session state lives on the session screen and the server
// is authoritative for all of it (spec §0 rule 3).

@MainActor
@Observable
final class AppStore {
    // MARK: Dependencies

    let api: APIClient
    let auth: AuthStore
    private(set) var purchases: Purchases!

    // MARK: State

    private(set) var ready = false
    /// The signed-in account's id, or the anonymous one standing in for it.
    private(set) var userId: String?
    private(set) var email: String?
    private(set) var isGuest = true
    /// False in a build with no Supabase project, where sign-in cannot work.
    private(set) var authConfigured = AppConfig.authConfigured
    private(set) var ageVerified = false
    /// `under13` | `13_17` | `18_24` | `25plus`, or nil before the gate.
    private(set) var ageBand: String?
    private(set) var onboardingComplete = false
    /// The taste picker and the showcase are behind them. Survives a restart.
    private(set) var onboarded = false
    private(set) var tastes: [String] = []
    private(set) var bootstrap: BootstrapResponse?
    private(set) var wallet: WalletSummary?
    private(set) var qualityTier: QualityTier = .VIVID
    private(set) var offline = false
    /// The language the interface is in, and the language a run started from
    /// here will be created in. Not the language of the run currently open.
    private(set) var locale: AppLocale = .default
    /// Nil until the player picks a language explicitly.
    private(set) var localeChoice: AppLocale?

    /// The interface translator, bound to the current language.
    var t: Translator { Translator(locale: locale) }

    var balance: Int { wallet?.balance ?? 0 }

    // MARK: Storage keys

    private enum Keys {
        static let ageVerified = "plotbreak.ageVerified"
        static let tastes = "plotbreak.tastes"
        static let quality = "plotbreak.qualityTier"
        static let drafts = "plotbreak.composerDrafts"
        static let locale = "plotbreak.locale"
        static let onboarded = "plotbreak.onboarded"
        static let ageBand = "plotbreak.ageBand"
    }

    private let defaults = UserDefaults.standard
    private var hydrating = false

    /// The last Discover shelf, for the next launch's first frame. Personal, so
    /// it is forgotten whenever the account changes (see `forgetPersonalCaches`).
    let discoverSnapshot = DiscoverSnapshot.standard()

    init(api: APIClient = APIClient(), auth: AuthStore = AuthStore()) {
        self.api = api
        self.auth = auth
        self.purchases = Purchases(api: api)
    }

    // MARK: Boot

    /// Restore identity, then bootstrap. A guest is minted so the player can
    /// browse and start one session before any account exists (§6.3).
    /// The wordmark stays up at least this long. Boot no longer waits on the
    /// network, so without a floor the splash is a two-frame flash, which
    /// reads as a glitch rather than as the product's name.
    static let splashFloor: TimeInterval = 0.5

    func boot() async {
        guard !hydrating else { return }
        hydrating = true
        let bootStarted = Date()

        await api.setTokenProvider { [auth] force in await auth.accessToken(force: force) }

        let storedLocale = defaults.string(forKey: Keys.locale).flatMap(AppLocale.init(rawValue:))
        localeChoice = storedLocale
        locale = storedLocale ?? AppLocale.resolveDevice()
        await pushLanguage()

        let identity = await auth.restore()
        apply(identity: identity)
        ageVerified = defaults.bool(forKey: Keys.ageVerified)
        ageBand = defaults.string(forKey: Keys.ageBand)
        onboardingComplete = ageVerified
        onboarded = defaults.bool(forKey: Keys.onboarded)
        tastes = defaults.stringArray(forKey: Keys.tastes) ?? []
        if let stored = defaults.string(forKey: Keys.quality), let tier = QualityTier(rawValue: stored) {
            qualityTier = tier
        }
        let elapsed = Date().timeIntervalSince(bootStarted)
        if elapsed < Self.splashFloor {
            try? await Task.sleep(nanoseconds: UInt64((Self.splashFloor - elapsed) * 1_000_000_000))
        }
        ready = true

        // Bootstrap, with one retry: the very first request a fresh install
        // makes can land before wifi has settled.
        for attempt in 0..<2 {
            do {
                applyBootstrap(try await api.bootstrap())
                break
            } catch {
                if let apiError = error as? APIError, apiError.isOffline { offline = true }
                if attempt == 0 { try? await Task.sleep(nanoseconds: 1_200_000_000) }
            }
        }
    }

    private func pushLanguage() async {
        let translator = t
        await api.setLocale(locale)
        await auth.setTranslator(translator)
        purchases.translator = translator
    }

    private func apply(identity: AuthIdentity?) {
        userId = identity?.userId
        email = identity?.email
        isGuest = identity?.isGuest ?? true
    }

    private func applyBootstrap(_ response: BootstrapResponse) {
        bootstrap = response
        wallet = response.wallet
        offline = false
    }

    // MARK: Sign-in (§6.4 — no password is ever created)

    /// Signing in upgrades the guest in place; `guest-migrate` reconciles the
    /// older device-local case (§6.5).
    private func adopt(_ identity: AuthIdentity, previous: AuthIdentity?) async {
        if let previous, previous.isGuest, previous.userId != identity.userId {
            // i18n-exempt: a display name written once to the account, not UI copy
            _ = try? await api.migrateGuest(guestUserId: previous.userId, displayName: identity.email ?? "Player")
        }
        forgetPersonalCaches()
        apply(identity: identity)
        if let response = try? await api.bootstrap() { applyBootstrap(response) }
    }

    /// Anything cached on disk that belongs to one account. Called on every
    /// sign-in and sign-out, so the next person to open Discover never sees the
    /// previous account's saves, hidden worlds or ranking, even for a frame.
    private func forgetPersonalCaches() {
        discoverSnapshot.clear()
    }

    func sendEmailCode(_ email: String) async throws {
        try await auth.sendEmailCode(email)
    }

    func verifyEmailCode(_ email: String, code: String) async throws {
        let previous = await auth.identity
        let identity = try await auth.verifyEmailCode(email, code: code)
        await adopt(identity, previous: previous)
    }

    /// Sign in with Apple. Takes the credential the native button produced and
    /// the raw nonce the request was made with.
    func signInWithApple(credential: ASAuthorizationAppleIDCredential, rawNonce: String) async throws {
        guard let tokenData = credential.identityToken, let idToken = String(data: tokenData, encoding: .utf8) else {
            throw AuthError(message: t("error.apple_no_token"), code: "NO_IDENTITY_TOKEN")
        }
        let previous = await auth.identity
        let identity = try await auth.signInWithIdToken(provider: "apple", idToken: idToken, nonce: rawNonce)
        await adopt(identity, previous: previous)
    }

    func signOut() async {
        await auth.signOut()
        forgetPersonalCaches()
        apply(identity: await auth.identity)
        if let response = try? await api.bootstrap() { applyBootstrap(response) }
    }

    // MARK: Onboarding

    func confirmAge(band: String) async {
        defaults.set(true, forKey: Keys.ageVerified)
        defaults.set(band, forKey: Keys.ageBand)
        ageVerified = true
        ageBand = band
        onboardingComplete = true
        // Persist server-side too, so the gate survives a reinstall (§6.2).
        _ = try? await api.updateMe(["ageVerified": .bool(true)])
    }

    func completeOnboarding() {
        defaults.set(true, forKey: Keys.onboarded)
        onboarded = true
    }

    func setTastes(_ tastes: [String]) {
        defaults.set(tastes, forKey: Keys.tastes)
        self.tastes = tastes
    }

    func setQualityTier(_ tier: QualityTier) {
        defaults.set(tier.rawValue, forKey: Keys.quality)
        qualityTier = tier
    }

    /// Choose the interface language, or pass nil to go back to following the
    /// device. Runs already in progress keep the language they were created in.
    func setLocale(_ choice: AppLocale?) async {
        if let choice { defaults.set(choice.rawValue, forKey: Keys.locale) } else { defaults.removeObject(forKey: Keys.locale) }
        localeChoice = choice
        locale = choice ?? AppLocale.resolveDevice()
        await pushLanguage()
        _ = try? await api.updateMe(["settings": .object(["locale": choice.map { .string($0.rawValue) } ?? .null])])
    }

    // MARK: Wallet

    func refreshWallet() async {
        if let response = try? await api.wallet() { wallet = response.wallet }
    }

    func setBalance(_ balance: Int) {
        guard var wallet else { return }
        wallet.balance = balance
        self.wallet = wallet
    }

    func refreshBootstrap() async {
        do {
            applyBootstrap(try await api.bootstrap())
        } catch {
            offline = true
        }
    }

    // MARK: Drafts (§10.3 — composer input survives backgrounding)

    private var drafts: [String: String] {
        get { defaults.dictionary(forKey: Keys.drafts) as? [String: String] ?? [:] }
        set { defaults.set(newValue, forKey: Keys.drafts) }
    }

    func saveDraft(sessionId: String, text: String) {
        var current = drafts
        if text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { current.removeValue(forKey: sessionId) } else { current[sessionId] = text }
        drafts = current
    }

    func loadDraft(sessionId: String) -> String {
        drafts[sessionId] ?? ""
    }
}

// MARK: - Sign in with Apple nonce

enum AppleNonce {
    static func random(length: Int = 32) -> String {
        let charset = Array("0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._")
        var result = ""
        var remaining = length
        while remaining > 0 {
            var random: UInt8 = 0
            _ = SecRandomCopyBytes(kSecRandomDefault, 1, &random)
            if random < charset.count {
                result.append(charset[Int(random)])
                remaining -= 1
            }
        }
        return result
    }

    static func sha256(_ input: String) -> String {
        SHA256.hash(data: Data(input.utf8)).map { String(format: "%02x", $0) }.joined()
    }
}
