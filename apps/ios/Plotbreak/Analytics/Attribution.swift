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
        lib.registerSessionReadyListener { lib.start() }
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
    /// It is also where the tracking prompt is asked: the player has just
    /// seen what the app is, which is the moment the question makes sense.
    static func firstBeatCompleted(sessionId: String) {
        guard enabled, !defaults.bool(forKey: Keys.firstBeatSent) else { return }
        defaults.set(true, forKey: Keys.firstBeatSent)
        AppsFlyerLib.shared().logEvent(AFEventTutorial_completion, withValues: [
            AFEventParamContentId: sessionId,
            AFEventParamSuccess: true,
        ])
        Task { await requestTrackingConsent() }
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
    /// call returns the stored answer without UI.
    @MainActor
    static func requestTrackingConsent() async {
        guard enabled, ATTrackingManager.trackingAuthorizationStatus == .notDetermined else { return }
        _ = await ATTrackingManager.requestTrackingAuthorization()
    }
}
