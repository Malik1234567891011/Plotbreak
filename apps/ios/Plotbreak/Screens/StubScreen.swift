import SwiftUI

// Shared placeholder body. Delete once every stub is gone.

struct StubScreen: View {
    let name: String
    @Environment(Router.self) private var router: Router?

    var body: some View {
        Screen {
            VStack(spacing: Theme.Spacing.lg) {
                Txt(name, .h2, center: true)
                Txt("Not ported yet", .bodyCompact, color: Theme.Colors.textSecondary, center: true)
                if let router {
                    PBButton("Back", variant: .secondary, full: false) {
                        if router.sheet != nil { router.dismissSheet() } else { router.pop() }
                    }
                }
            }
            .padding(Theme.gutter)
        }
    }
}
