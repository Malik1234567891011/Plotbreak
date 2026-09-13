import Foundation

/// Build-time configuration. The values come from `Config/*.xcconfig` through
/// Info.plist, so Debug talks to `localhost:4000` and Release to Railway
/// without a code change. Everything here is public; none of it is a secret.
enum AppConfig {
    private static func plist(_ key: String) -> String? {
        guard let value = Bundle.main.object(forInfoDictionaryKey: key) as? String else { return nil }
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }

    /// Simulators share the host's loopback, so `localhost` works there. A
    /// physical device needs the Mac's LAN address in `Local.xcconfig`.
    static let apiURL: URL = URL(string: plist("PLOTBREAK_API_URL") ?? "http://localhost:4000")!

    static let supabaseURL: URL? = plist("PLOTBREAK_SUPABASE_URL").flatMap(URL.init(string:))
    static let supabaseAnonKey: String? = plist("PLOTBREAK_SUPABASE_ANON_KEY")

    /// Where the privacy policy and terms are published. Nil hides the links
    /// rather than pointing them at nothing.
    static let legalBaseURL: URL? = plist("PLOTBREAK_LEGAL_BASE_URL").flatMap(URL.init(string:))

    /// The iOS OAuth client from Google Cloud. Nil hides the Google button.
    static let googleClientID: String? = plist("PLOTBREAK_GOOGLE_CLIENT_ID")

    /// AppsFlyer ad attribution. Nil disables the SDK entirely.
    static let appsFlyerDevKey: String? = plist("PLOTBREAK_APPSFLYER_DEV_KEY")
    /// The numeric App Store id, without the `id` prefix.
    static let appleAppID: String? = plist("PLOTBREAK_APPLE_APP_ID")

    static let appVersion: String = plist("CFBundleShortVersionString") ?? "1.0.0"

    static var authConfigured: Bool { supabaseURL != nil && supabaseAnonKey != nil }
}
