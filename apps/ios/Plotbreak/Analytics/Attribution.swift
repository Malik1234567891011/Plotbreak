import Foundation
import AppsFlyerLib
import AppTrackingTransparency
import StoreKit
import UIKit

/// Ad attribution through AppsFlyer, the one SDK that tells Meta, TikTok and
/// Google Ads which of their taps became installs, sign-ups and purchases.
/// docs/ads/README.md is the operator's guide.
///
/// Three events leave the app, each once:
/// - `signedUp`  — a real account was created (guests do not count)
/// - `firstBeat` — the first story turn completed on this device
/// - `purchased` — a StoreKit purchase our server credited
///
/// Everything is a no-op without a dev key (`AppConfig.appsFlyerDevKey`) and
/// on the simulator, so unit tests and local runs never appear as installs.
enum Attribution {
    private static let defaults = UserDefaults.standard
    private enum Keys {
        static let firstBeatSent = "plotbreak.attribution.firstBeat"
        static let signedUpUsers = "plotbreak.attribution.signedUp"
    }

    static let enabled: Bool = {
        #if targetEnvironment(simulator)
        return false
        #else
        return AppConfig.appsFlyerDevKey != nil && AppConfig.appleAppID != nil
        #endif
    }()

    /// Call once, from `App.init`. SDK 7 wants `start()` inside its readiness
    /// listener, which fires on the main queue once per foreground.
    ///
    /// The App Tracking Transparency prompt is asked inside that listener,
    /// before `start()`, so the SDK sends nothing until the player has
    /// answered. Apple's 2.1 rejection of build 4 (2026-09-15) was for asking
    /// it after the first story beat: the reviewer never reached a beat, saw
    /// no prompt, and could not confirm it existed. The listener runs once the
    /// app is active, which the prompt requires; asked earlier it returns
    /// `.notDetermined` without showing anything.
    static func configure() {
        #if DEBUG
        // The id AppsFlyer's "Register your test device" form asks for
        // (type: IDFV). Search the Xcode console for "attribution".
        let idfv = UIDevice.current.identifierForVendor?.uuidString ?? "unavailable"
        print("[attribution] enabled=\(enabled) IDFV=\(idfv)")
        #endif
        guard enabled, let devKey = AppConfig.appsFlyerDevKey, let appID = AppConfig.appleAppID else { return }
        let lib = AppsFlyerLib.shared()
        lib.initialize(devKey: devKey, appId: appID)
        #if DEBUG
        lib.isDebug = true
        #endif
        lib.registerSessionReadyListener {
            Task { @MainActor in
                await requestTrackingConsent()
                // In an async context Swift picks the SDK's throwing
                // `start()` overload; the sync closure pins the plain one.
                let start = { lib.start() }
                start()
            }
        }
    }

    /// Ties AppsFlyer's device record to our user id, so the dashboard and
    /// the raw-data exports can be joined to Postgres.
    static func identify(userId: String?) {
        guard enabled else { return }
        AppsFlyerLib.shared().customerUserID = userId
    }

    /// A real account (email, Apple or Google), sent once per user id.
    static func signedUp(userId: String, method: String) {
        guard enabled else { return }
        var seen = defaults.stringArray(forKey: Keys.signedUpUsers) ?? []
        guard !seen.contains(userId) else { return }
        seen.append(userId)
        defaults.set(seen, forKey: Keys.signedUpUsers)
        AppsFlyerLib.shared().logEvent(AFEventCompleteRegistration, withValues: [
            AFEventParamRegistrationMethod: method,
        ])
    }

    /// The first story beat on this device. The ad networks optimise on this
    /// one, so it is the event that decides who they show the ad to next.
    static func firstBeatCompleted(sessionId: String) {
        guard enabled, !defaults.bool(forKey: Keys.firstBeatSent) else { return }
        defaults.set(true, forKey: Keys.firstBeatSent)
        AppsFlyerLib.shared().logEvent(AFEventTutorial_completion, withValues: [
            AFEventParamContentId: sessionId,
            AFEventParamSuccess: true,
        ])
    }

    /// A purchase our server has credited. Revenue in the store's currency,
    /// so the networks' ROAS columns mean what they say.
    static func purchased(_ transaction: Transaction) {
        guard enabled, transaction.environment != .xcode else { return }
        var values: [String: Any] = [
            AFEventParamContentId: transaction.productID,
            AFEventParamContentType: "credits",
            AFEventParamQuantity: transaction.purchasedQuantity,
            AFEventParamRevenue: NSDecimalNumber(decimal: transaction.price ?? 0),
        ]
        if let code = transaction.currency?.identifier { values[AFEventParamCurrency] = code }
        AppsFlyerLib.shared().logEvent(AFEventPurchase, withValues: values)
    }

    /// The App Tracking Transparency prompt. iOS shows it once; every later
    /// call returns the stored answer without UI. Asked whenever the framework
    /// is linked, not only when AppsFlyer is enabled: App Review checks for the
    /// prompt on every build that links it, whatever the build's config says.
    @MainActor
    static func requestTrackingConsent() async {
        guard ATTrackingManager.trackingAuthorizationStatus == .notDetermined else { return }
        _ = await ATTrackingManager.requestTrackingAuthorization()
    }
}
