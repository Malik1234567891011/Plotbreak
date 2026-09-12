import SwiftUI

// Placeholder until the real screen is ported. Delete this file when it is.

struct AgeGateScreen: View { var body: some View { StubScreen(name: "AgeGate") } }
struct TasteScreen: View { let onDone: () -> Void; var body: some View { StubScreen(name: "Taste") } }
struct ShowcaseScreen: View {
    let onSeeAll: () -> Void
    let onOpen: (String) -> Void
    var body: some View { StubScreen(name: "Showcase") }
}
struct SplashScreen: View {
    var body: some View {
        Screen {
            Image("SplashIcon").resizable().scaledToFit().frame(width: 120, height: 120)
        }
    }
}
