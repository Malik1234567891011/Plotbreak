import SwiftUI

@main
struct PlotbreakApp: App {
    @State private var store = AppStore()

    init() {
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
                .task { await store.boot() }
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
