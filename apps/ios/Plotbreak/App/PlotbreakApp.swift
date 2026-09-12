import SwiftUI

@main
struct PlotbreakApp: App {
    @State private var store = AppStore()

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
