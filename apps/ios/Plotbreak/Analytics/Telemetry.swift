import Foundation
import PostHog

/// Spec §37 — product analytics. What players do, as opposed to which ad
/// brought them here, which is `Attribution`'s job.
///
/// Roughly half the contract is emitted by the server (what a turn cost, whether
/// a purchase verified) and half from here (what was looked at, what was
/// tapped). Both halves land on one person because both use the same id: the
/// signed-in user id once there is one, and `AppConfig.deviceId` before that —
/// the same value this app sends on `x-device-id`.
///
/// # On performance
///
/// `capture` appends to a disk-backed queue and returns; the SDK sends in
/// batches on a background thread. Nothing here touches the main thread's frame
/// budget. The one PostHog feature that genuinely would — session replay, which
/// renders the running app on a timer — is off below and must stay off.
enum Telemetry {
    /// Nil key disables the SDK entirely. Debug builds ship no key, so a
    /// developer's own taps never land in the funnel the launch targets are
    /// measured against, and the simulator is excluded for the same reason.
    static let enabled: Bool = {
        #if targetEnvironment(simulator)
        return false
        #else
        return AppConfig.postHogKey != nil
        #endif
    }()

    /// When this process started.
    ///
    /// Lives here rather than on the App struct because two different events
    /// measure against it — `app_opened.bootMs` and
    /// `first_turn_submitted.secondsSinceAppOpen` — and two clocks would
    /// eventually disagree.
    static let processStartedAt = Date()

    /// Call once, from `App.init`, before anything can want to emit.
    static func configure() {
        guard enabled, let key = AppConfig.postHogKey else { return }

        let config = PostHogConfig(apiKey: key, host: AppConfig.postHogHost)

        // Session replay renders the running app on a timer and uploads the
        // frames. It is the only part of this SDK with a cost a player could
        // feel — CPU, battery and bandwidth, continuously — and Plotbreak is a
        // reading app people sit in for a long time. Off, and it stays off.
        config.sessionReplay = false

        // UIKit swizzling to autocapture taps. The UI is SwiftUI, so this
        // produces view-controller noise rather than anything answerable, and
        // every event in the contract is emitted deliberately anyway.
        config.captureElementInteractions = false
        config.captureScreenViews = false

        // `app_opened` is in the contract with `coldStart` and `bootMs` on it,
        // which is the version of this we can actually act on. The SDK's own
        // lifecycle events would sit alongside it meaning something slightly
        // different, and two nearly-identical events is how a funnel becomes
        // untrustworthy.
        config.captureApplicationLifecycleEvents = false

        // Nothing branches on a PostHog flag, so this is a network round trip
        // on every cold start in exchange for nothing.
        config.preloadFeatureFlags = false

        // The device id this app already sends to the API on `x-device-id`.
        // Without this the SDK would invent its own anonymous id and every
        // signed-out player would appear as two people — one the server saw and
        // one PostHog did — with the funnel split down the middle between them.
        let deviceUUID = UUID(uuidString: AppConfig.deviceId)
        config.getAnonymousId = { generated in deviceUUID ?? generated }

        PostHogSDK.shared.setup(config)

        // The base properties from the contract, registered once so they ride
        // on every event without each call site remembering them. The names
        // match what `PostHogSink` sends from the server, so a breakdown by
        // platform or environment works across both halves of the funnel.
        PostHogSDK.shared.register([
            "pb_platform": "ios",
            "pb_environment": environment,
            "pb_contract_version": PlotbreakAnalyticsContract.version,
            "pb_anonymous_id": AppConfig.deviceId,
            "$app_version": AppConfig.appVersion,
        ])
    }

    /// Ties events to the account once there is one.
    ///
    /// `identify` links everything this device did while signed out to the
    /// account, which is the whole point: the sign-up funnel is only readable
    /// if the before and after belong to one person. A nil id means signed out
    /// — a sign-out, or a guest — and resets back to the device id.
    static func identify(userId: String?, isGuest: Bool) {
        guard enabled else { return }
        guard let userId else {
            PostHogSDK.shared.reset()
            return
        }
        PostHogSDK.shared.identify(userId)
        PostHogSDK.shared.register(["pb_is_guest": isGuest])
    }

    /// Emit an event.
    ///
    /// The name is a `PlotbreakEvent`, which is generated from
    /// `packages/analytics/src/index.ts`, so the client cannot invent a name the
    /// contract has never heard of. Properties are not type-checked against the
    /// contract's Zod schema — Swift cannot see it — so `docs/analytics.md` and
    /// the schema itself are what to check a new call site against.
    ///
    /// Per §30.2: ids, counts and tags only. No player text, ever.
    static func track(_ event: PlotbreakEvent, _ properties: [String: Any] = [:]) {
        guard enabled else {
            #if DEBUG
            print("[telemetry] \(event.rawValue) \(properties)")
            #endif
            return
        }
        PostHogSDK.shared.capture(event.rawValue, properties: properties)
    }

    /// Same, tagged with the play session it happened in.
    ///
    /// A separate entry point rather than an optional argument, because the
    /// session id is the join key for every per-session question and leaving it
    /// off is the easy mistake — this way the call site that has one says so.
    static func track(_ event: PlotbreakEvent, sessionId: String, _ properties: [String: Any] = [:]) {
        var payload = properties
        payload["pb_session_id"] = sessionId
        track(event, payload)
    }

    /// Emits at most once per app run for a given key.
    ///
    /// Impressions are the one part of the contract that could out-volume
    /// everything else combined: a shelf holds seventy covers and a player
    /// flicking back and forth would re-report every one of them. Deduping per
    /// run keeps "was this card seen" answerable without paying for the
    /// scrolling. The set is in memory only, so a relaunch counts again — which
    /// is the right grain for a per-session impression.
    @MainActor
    static func trackOnce(_ event: PlotbreakEvent, key: String, _ properties: [String: Any] = [:]) {
        let composite = "\(event.rawValue)|\(key)"
        guard !seenThisRun.contains(composite) else { return }
        seenThisRun.insert(composite)
        track(event, properties)
    }

    @MainActor private static var seenThisRun: Set<String> = []

    /// Send what is queued.
    ///
    /// Worth calling when the app goes to the background: iOS may suspend the
    /// process before the SDK's own timer fires again, and a buffer that dies
    /// with the process is a gap in the data with no error attached to it.
    static func flush() {
        guard enabled else { return }
        PostHogSDK.shared.flush()
    }

    private static var environment: String {
        #if DEBUG
        return "dev"
        #else
        return "production"
        #endif
    }
}
