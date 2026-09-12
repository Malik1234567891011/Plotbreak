import SwiftUI

// MARK: - CommentsScreen
//
// Twin of `apps/mobile/src/screens/CommentsScreen.tsx`.
//
// The whole comment section, on its own sheet. The story page carries a shelf
// of a few, and this is where "see all" goes. `CommentsView` owns the
// scrolling here, because the composer under it is pinned and must not scroll
// away with the list.

struct CommentsScreen: View {
    let storyId: String

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(backLabel: t("story.close"), backGlyph: "✕") {
                    router.dismissSheet()
                }
                CommentsView(
                    storyId: storyId,
                    signedIn: !store.isGuest,
                    variant: .full,
                    onSignIn: { router.present(.signIn) }
                )
                .padding(.horizontal, Theme.gutter)
                .padding(.top, Theme.Spacing.md)
            }
        }
    }
}
