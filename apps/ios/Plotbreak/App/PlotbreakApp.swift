import SwiftUI
import GoogleSignIn

@main
struct PlotbreakApp: App {
    @State private var store = AppStore()
    @Environment(\.scenePhase) private var scenePhase
    @State private var openedOnce = false

    init() {
        Attribution.configure()
        Telemetry.configure()
        // Covers come back with `cache-control: immutable`, and AsyncImage
        // reads them through the shared URL cache. The default cache is a few
        // megabytes, so seventy-odd 90 KB covers evicted each other and every
        // launch downloaded the shelf again. This is the size at which a
        // relaunch draws the covers from disk instead.
        URLCache.shared = URLCache(
            memoryCapacity: 50 * 1024 * 1024,
            diskCapacity: 500 * 1024 * 1024
        )
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(store)
                .environment(\.translator, store.t)
                .preferredColorScheme(.dark)
                .task {
                    await store.boot()
                    // §37.1 — the first event of the funnel, emitted once boot
                    // has actually finished. Emitting it in `init` would make
                    // every launch look instant and hide the thing the number
                    // exists to catch.
                    guard !openedOnce else { return }
                    openedOnce = true
                    Telemetry.track(.appOpened, [
                        "coldStart": true,
                        "bootMs": Int(Date().timeIntervalSince(Telemetry.processStartedAt) * 1000),
                    ])
                }
                .onOpenURL { url in _ = GIDSignIn.sharedInstance.handle(url) }
                .onChange(of: scenePhase) { _, phase in
                    switch phase {
                    case .active:
                        // A warm return, not a launch: the process was already
                        // running, so there is no boot to measure.
                        if openedOnce { Telemetry.track(.appOpened, ["coldStart": false, "bootMs": 0]) }
                    case .background:
                        // iOS can suspend us before the SDK's own timer fires
                        // again, and a buffer that dies with the process is a
                        // gap in the data with no error attached to it.
                        Telemetry.flush()
                    default:
                        break
                    }
                }
        }
    }
}

// MARK: - Environment

private struct TranslatorKey: EnvironmentKey {
    static let defaultValue = Translator(locale: .en)
}

extension EnvironmentValues {
    /// The interface translator. `@Environment(\.translator) var t` then `t("nav.discover")`.
    var translator: Translator {
        get { self[TranslatorKey.self] }
        set { self[TranslatorKey.self] = newValue }
    }
}
