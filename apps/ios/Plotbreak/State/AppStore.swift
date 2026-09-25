import Foundation
import SwiftUI
import AuthenticationServices
import CryptoKit
import GoogleSignIn

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
    /// The sign-in step of onboarding has been answered — signed in, or
    /// passed as a guest. Survives a restart so it is asked once.
    private(set) var signInSeen = false
    /// What characters call the player. Set in onboarding, changed in Settings.
    private(set) var displayName: String?
    /// `male` | `female` | `neutral`, or nil for no filter.
    private(set) var audience: String?
    /// Who the player last walked into a story as, so the next setup screen
    /// starts filled in instead of asking again. Only what they typed or
    /// picked, never inferred. Per device, like `displayName`.
    private(set) var lastHero = HeroDefaults()
    /// Search terms the player has used, newest first, at most eight.
    private(set) var recentSearches: [String] = []
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
        static let signInSeen = "plotbreak.signInSeen"
        static let displayName = "plotbreak.displayName"
        static let audience = "plotbreak.audience"
        static let recentSearches = "plotbreak.recentSearches"
        static let heroName = "plotbreak.hero.name"
        static let heroPronouns = "plotbreak.hero.pronouns"
        static let heroGrammar = "plotbreak.hero.grammar"
        static let wallCount = "plotbreak.wallCount"
    }

    private let defaults = UserDefaults.standard
    private var hydrating = false
    /// When the reminders were last re-armed. In memory, not UserDefaults: it
    /// only exists to collapse a burst of calls within one run of the app.
    private var remindersArmedAt: Date?

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
    func boot() async {
        guard !hydrating else { return }
        hydrating = true

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
        signInSeen = defaults.bool(forKey: Keys.signInSeen)
        displayName = defaults.string(forKey: Keys.displayName)
        audience = defaults.string(forKey: Keys.audience)
        lastHero = HeroDefaults(
            name: defaults.string(forKey: Keys.heroName) ?? "",
            pronouns: defaults.string(forKey: Keys.heroPronouns) ?? "",
            grammar: defaults.string(forKey: Keys.heroGrammar).flatMap(GrammaticalGender.init(rawValue:))
        )
        recentSearches = defaults.stringArray(forKey: Keys.recentSearches) ?? []
        if let stored = defaults.string(forKey: Keys.quality), let tier = QualityTier(rawValue: stored) {
            qualityTier = tier
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
        Attribution.identify(userId: identity?.userId)
        // §6.5 — links everything this device did signed out to the account.
        // The sign-up funnel is only readable if before and after are one
        // person.
        Telemetry.identify(userId: identity?.userId, isGuest: identity?.isGuest ?? true)
    }

    private func applyBootstrap(_ response: BootstrapResponse) {
        bootstrap = response
        wallet = response.wallet
        offline = false
        // Every launch re-arms the reminders. They are scheduled a week ahead,
        // so this is what keeps somebody who opens the app weekly from running
        // out of them — and what moves the story reminder onto whatever they
        // played last.
        Task { await refreshReminders() }
    }

    // MARK: Sign-in (§6.4 — no password is ever created)

    /// Signing in upgrades the guest in place; `guest-migrate` reconciles the
    /// older device-local case (§6.5).
    private func adopt(_ identity: AuthIdentity, previous: AuthIdentity?, method: String) async {
        if let previous, previous.isGuest, previous.userId != identity.userId {
            // i18n-exempt: a display name written once to the account, not UI copy
            _ = try? await api.migrateGuest(guestUserId: previous.userId, displayName: identity.email ?? "Player")
        }
        forgetPersonalCaches()
        apply(identity: identity)
        if !identity.isGuest {
            Attribution.signedUp(userId: identity.userId, method: method)
            Telemetry.track(.signInCompleted, ["provider": method])
        }
        if let response = try? await api.bootstrap() { applyBootstrap(response) }
    }

    /// Anything cached on disk that belongs to one account. Called on every
    /// sign-in and sign-out, so the next person to open Discover never sees the
    /// previous account's saves, hidden worlds or ranking, even for a frame.
    private func forgetPersonalCaches() {
        discoverSnapshot.clear()
    }

    func sendEmailCode(_ email: String) async throws {
        // §6.5. `trigger` is coarse — it says the player was on the auth
        // screen, not what sent them there. Threading the real reason (the
        // wallet, the library gate, a share link) through the presenters is
        // worth doing and is not done yet.
        Telemetry.track(.signInStarted, ["provider": "email", "trigger": "auth_screen"])
        try await auth.sendEmailCode(email)
    }

    func verifyEmailCode(_ email: String, code: String) async throws {
        let previous = await auth.identity
        let identity = try await auth.verifyEmailCode(email, code: code)
        await adopt(identity, previous: previous, method: "email")
    }

    /// Sign in with Apple. Takes the credential the native button produced and
    /// the raw nonce the request was made with.
    func signInWithApple(credential: ASAuthorizationAppleIDCredential, rawNonce: String) async throws {
        // §6.5. `trigger` is coarse — it says the player was on the auth
        // screen, not what sent them there. Threading the real reason (the
        // wallet, the library gate, a share link) through the presenters is
        // worth doing and is not done yet.
        Telemetry.track(.signInStarted, ["provider": "apple", "trigger": "auth_screen"])
        guard let tokenData = credential.identityToken, let idToken = String(data: tokenData, encoding: .utf8) else {
            throw AuthError(message: t("error.apple_no_token"), code: "NO_IDENTITY_TOKEN")
        }
        let previous = await auth.identity
        let identity = try await auth.signInWithIdToken(provider: "apple", idToken: idToken, nonce: rawNonce)
        await adopt(identity, previous: previous, method: "apple")
    }

    /// Whether the Google button can work in this build.
    var googleConfigured: Bool { AppConfig.googleClientID != nil }

    /// Sign in with Google through Google's own SDK: the native account
    /// sheet, then the ID token goes to Supabase the same way Apple's does.
    func signInWithGoogle() async throws {
        // §6.5. `trigger` is coarse — it says the player was on the auth
        // screen, not what sent them there. Threading the real reason (the
        // wallet, the library gate, a share link) through the presenters is
        // worth doing and is not done yet.
        Telemetry.track(.signInStarted, ["provider": "google", "trigger": "auth_screen"])
        guard let clientID = AppConfig.googleClientID else {
            throw AuthError(message: t("error.sign_in_not_configured"), code: "NOT_CONFIGURED")
        }
        GIDSignIn.sharedInstance.configuration = GIDConfiguration(clientID: clientID)
        guard let presenter = Self.keyWindow?.rootViewController else {
            throw AuthError(message: t("misc.sign_in_failed"), code: "NO_PRESENTER")
        }
        // The same nonce dance as Apple: Google gets the hash and puts it in
        // the token, Supabase gets the raw value and checks the hash matches.
        let rawNonce = AppleNonce.random()
        let result = try await GIDSignIn.sharedInstance.signIn(
            withPresenting: presenter, hint: nil, additionalScopes: nil, nonce: AppleNonce.sha256(rawNonce)
        )
        guard let idToken = result.user.idToken?.tokenString else {
            throw AuthError(message: t("misc.sign_in_failed"), code: "NO_IDENTITY_TOKEN")
        }
        let previous = await auth.identity
        let identity = try await auth.signInWithIdToken(provider: "google", idToken: idToken, nonce: rawNonce)
        await adopt(identity, previous: previous, method: "google")
    }

    private static var keyWindow: UIWindow? {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        return scenes.first(where: { $0.activationState == .foregroundActive })?.keyWindow ?? scenes.first?.keyWindow
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

    /// The age gate, answered with a birth date. Only the band is kept: the
    /// date decides which band, and then it is forgotten.
    func confirmAge(birthDate: Date) async {
        await confirmAge(band: Self.ageBand(birthDate: birthDate))
    }

    /// `under13` | `13_17` | `18_24` | `25plus` for a birth date, as of today.
    static func ageBand(birthDate: Date, now: Date = Date()) -> String {
        let years = Calendar(identifier: .gregorian).dateComponents([.year], from: birthDate, to: now).year ?? 0
        switch years {
        case ..<13: return "under13"
        case 13...17: return "13_17"
        case 18...24: return "18_24"
        default: return "25plus"
        }
    }

    /// The sign-in step has been passed, one way or the other.
    func markSignInSeen() {
        defaults.set(true, forKey: Keys.signInSeen)
        signInSeen = true
    }

    func completeOnboarding() {
        defaults.set(true, forKey: Keys.onboarded)
        onboarded = true
    }

    func setTastes(_ tastes: [String]) {
        defaults.set(tastes, forKey: Keys.tastes)
        self.tastes = tastes
    }

    /// What characters call the player. Kept on the device and on the account.
    func setDisplayName(_ name: String) async {
        let trimmed = String(name.trimmingCharacters(in: .whitespacesAndNewlines).prefix(24))
        guard !trimmed.isEmpty else { return }
        defaults.set(trimmed, forKey: Keys.displayName)
        displayName = trimmed
        _ = try? await api.updateMe(["displayName": .string(trimmed)])
    }

    /// Called once a session has actually started, so an abandoned setup
    /// never becomes the next one's default.
    // MARK: The credit wall

    /// How many times this player has run out mid-action, ever.
    ///
    /// On the device because it is a property of the person, not of a run, and
    /// the server cannot see the wall the client raises without ever sending a
    /// request. The difference between refusing an offer once and refusing it
    /// six times is the difference between "too expensive" and "not for me",
    /// and the funnel currently cannot tell them apart.
    var wallCount: Int { defaults.integer(forKey: Keys.wallCount) }

    /// Counts this wall and answers with the new total.
    @discardableResult
    func recordWall() -> Int {
        let next = wallCount + 1
        defaults.set(next, forKey: Keys.wallCount)
        return next
    }

    func rememberHero(_ hero: HeroDefaults) {
        defaults.set(hero.name, forKey: Keys.heroName)
        defaults.set(hero.pronouns, forKey: Keys.heroPronouns)
        if let grammar = hero.grammar { defaults.set(grammar.rawValue, forKey: Keys.heroGrammar) }
        lastHero = hero
    }

    func setAudience(_ audience: String?) async {
        if let audience { defaults.set(audience, forKey: Keys.audience) } else { defaults.removeObject(forKey: Keys.audience) }
        self.audience = audience
        _ = try? await api.updateMe(["settings": .object(["audience": audience.map { .string($0) } ?? .null])])
    }

    // MARK: Search history

    func rememberSearch(_ term: String) {
        let trimmed = term.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.count >= 2 else { return }
        var next = recentSearches.filter { $0.caseInsensitiveCompare(trimmed) != .orderedSame }
        next.insert(trimmed, at: 0)
        recentSearches = Array(next.prefix(8))
        defaults.set(recentSearches, forKey: Keys.recentSearches)
    }

    func forgetSearch(_ term: String) {
        recentSearches.removeAll { $0 == term }
        defaults.set(recentSearches, forKey: Keys.recentSearches)
    }

    func clearSearches() {
        recentSearches = []
        defaults.removeObject(forKey: Keys.recentSearches)
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
        let claimWas = wallet?.nextDailyClaimAt
        if let response = try? await api.wallet() { wallet = response.wallet }
        // Claiming the daily grant is exactly the moment tonight's reminder
        // should stop being scheduled, so a claim re-arms immediately. Every
        // other wallet refresh — and Discover asks for one every time it
        // appears — goes through the throttle instead.
        await refreshReminders(force: wallet?.nextDailyClaimAt != claimWas)
    }

    func setBalance(_ balance: Int) {
        guard var wallet else { return }
        wallet.balance = balance
        self.wallet = wallet
    }

    // MARK: Reminders

    /// Re-arm the two daily reminders from what is currently true.
    ///
    /// Cheap and idempotent, so it is called from everywhere a fact behind them
    /// changes rather than from one carefully chosen place. The session list is
    /// fetched here rather than held, because nothing else in the store needs
    /// it and a reminder built from a stale copy names the wrong story.
    func refreshReminders(force: Bool = true) async {
        guard await Reminders.authorizationStatus() == .authorized else {
            await Reminders.cancelAll()
            return
        }
        // Throttled, because this fetches the session list and the things that
        // ask for it are not rare: Discover refreshes the wallet every time it
        // appears, which is every tab switch. Re-arming is idempotent, so a
        // skipped call costs nothing — the next one schedules the same week.
        if !force, let last = remindersArmedAt, Date().timeIntervalSince(last) < 300 { return }
        remindersArmedAt = Date()

        let nextClaimAt = wallet?.dailyClaimAvailable == true
            ? nil
            : wallet?.nextDailyClaimAt.flatMap(ISO8601.date(from:))

        // The run they are most likely to want back: most recently played,
        // still open, and actually started. A session with no turns in it is
        // one somebody opened and left, not a story waiting on them.
        var session: (sessionId: String, title: String, lastPlayedAt: Date)?
        if let response = try? await api.listSessions() {
            let candidate = response.sessions
                .filter { $0.status == .ACTIVE && $0.turnCount >= 1 }
                .compactMap { summary -> (String, String, Date)? in
                    guard let played = ISO8601.date(from: summary.lastPlayedAt) else { return nil }
                    return (summary.sessionId, summary.title, played)
                }
                .max(by: { $0.2 < $1.2 })
            if let candidate {
                session = (sessionId: candidate.0, title: candidate.1, lastPlayedAt: candidate.2)
            }
        }

        // Credits the player has already earned and not collected. Asked for
        // here rather than in the badges screen because a reminder is only
        // worth arming for somebody who is not looking at the app.
        var claimableBadgeCredits = 0
        if let badges = try? await api.badges() {
            claimableBadgeCredits = badges.badges
                .filter { $0.unlockedAt != nil && $0.claimedAt == nil }
                .reduce(0) { $0 + $1.creditReward }
        }

        await Reminders.refresh(
            nextClaimAt: nextClaimAt,
            session: session,
            claimableBadgeCredits: claimableBadgeCredits,
            translator: t
        )
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

// MARK: - HeroDefaults

/// The answers character setup starts from. `pronouns` is the field as typed,
/// empty included, not the `they/them` the request falls back to. `grammar` is
/// nil until the player has answered the French-only question once.
struct HeroDefaults: Equatable {
    var name = ""
    var pronouns = ""
    var grammar: GrammaticalGender?
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
