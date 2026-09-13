import SwiftUI

// MARK: - Saved worlds
//
// The worlds the player has bookmarked from a quick preview or a detail page.
// There is no list endpoint for these; the catalogue flags each world with
// `saved`, so this reads the full Discover shelf and keeps the flagged ones.

struct SavedWorldsScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var stories: [StorySummary]?

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("profile.saved_worlds"), backLabel: t("story.back"), onBack: { router.dismissSheet() })

                ScrollView {
                    if let stories, stories.isEmpty {
                        EmptyState(
                            title: t("profile.saved_empty_title"),
                            message: t("profile.saved_empty_body"),
                            actionLabel: t("library.browse_worlds"),
                            action: {
                                router.dismissSheet()
                                router.tab = .discover
                            }
                        )
                    } else {
                        LazyVStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                            if stories == nil {
                                ForEach(0..<4, id: \.self) { _ in Skeleton(height: 96) }
                            }
                            ForEach(stories ?? []) { story in
                                StoryCoverCard(story: story, variant: .row, locale: store.locale) {
                                    router.dismissSheet()
                                    router.push(.storyDetail(storyId: story.storyId))
                                }
                            }
                        }
                        .padding(Theme.pageGutter)
                        .padding(.bottom, Theme.Spacing.giant)
                    }
                }
            }
        }
        .task { await load() }
    }

    private func load() async {
        guard let data = try? await store.api.discover(tastes: store.tastes) else {
            stories = []
            return
        }
        var seen = Set<String>()
        stories = data.rails.flatMap(\.stories).filter { $0.saved && seen.insert($0.storyId).inserted }
    }
}
