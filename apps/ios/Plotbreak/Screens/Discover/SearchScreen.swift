import SwiftUI

// MARK: - DS-02 / DS-03 Search
//
// Twin of `SearchScreen` in `apps/mobile/src/screens/Discover.tsx`: search
// with filters. Presented as a sheet; closes with `router.dismissSheet()`.

struct SearchScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var query = ""
    @State private var results: [StorySummary] = []
    @State private var loading = false
    @State private var filters: [String] = []
    @FocusState private var focused: Bool

    private var filtered: [StorySummary] {
        results.filter { story in
            filters.isEmpty || filters.allSatisfy { story.tags.contains($0) || story.mechanicsChips.contains($0) }
        }
    }

    private var availableFilters: [String] {
        var seen = Set<String>()
        var out: [String] = []
        for value in results.flatMap({ $0.tags + $0.mechanicsChips }) where seen.insert(value).inserted {
            out.append(value)
        }
        return Array(out.prefix(10))
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack(spacing: Theme.Spacing.md) {
                    TextField(t("discover.search_placeholder"), text: $query)
                        .font(.system(size: 17))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .tint(Theme.Colors.accentPrimary)
                        .padding(.horizontal, Theme.Spacing.lg)
                        .frame(height: 44)
                        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                        .submitLabel(.search)
                        .autocorrectionDisabled()
                        .focused($focused)
                        .accessibilityLabel(t("discover.search_worlds"))
                    Button {
                        router.dismissSheet()
                    } label: {
                        Txt(t("discover.search_cancel"), .body, color: Theme.Colors.accentPrimary)
                    }
                    .buttonStyle(PressOpacityStyle())
                }
                .padding(.horizontal, Theme.gutter)
                .padding(.top, Theme.Spacing.lg)

                if !availableFilters.isEmpty {
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: Theme.Spacing.sm) {
                            ForEach(availableFilters, id: \.self) { filter in
                                Chip(filter, selected: filters.contains(filter)) {
                                    if let index = filters.firstIndex(of: filter) {
                                        filters.remove(at: index)
                                    } else {
                                        filters.append(filter)
                                    }
                                }
                            }
                        }
                        .padding(Theme.gutter)
                    }
                }

                ScrollView {
                    LazyVStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        if filtered.isEmpty, !loading {
                            EmptyState(
                                title: t(query.isEmpty ? "discover.search_prompt_title" : "discover.search_no_results_title"),
                                message: t(query.isEmpty ? "discover.search_prompt_body" : "discover.search_no_results_body")
                            )
                        }
                        ForEach(filtered) { story in
                            SearchResultRow(story: story, locale: store.locale) {
                                router.dismissSheet()
                                router.push(.storyDetail(storyId: story.storyId))
                            }
                        }
                    }
                    .padding(Theme.gutter)
                }
                .scrollDismissesKeyboard(.interactively)
            }
        }
        .onAppear { focused = true }
        .task(id: query) {
            // Debounced 220ms, like the RN screen.
            try? await Task.sleep(nanoseconds: 220_000_000)
            guard !Task.isCancelled else { return }
            loading = true
            defer { loading = false }
            do {
                results = try await store.api.search(query).results
            } catch {
                results = []
            }
        }
    }
}

/// The RN card's `row` variant: a 64pt cover with the title beside it. The
/// Swift `StoryCoverCard.list` variant is a full-width poster, which is not
/// what a results list wants, so the row is drawn here.
private struct SearchResultRow: View {
    let story: StorySummary
    let locale: AppLocale
    let onPress: () -> Void
    @Environment(\.translator) private var t

    private var metaLine: String {
        [story.tags.first, story.official ? nil : story.creatorName]
            .compactMap { $0 }
            .filter { !$0.isEmpty }
            .joined(separator: " · ")
    }

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress()
        } label: {
            HStack(alignment: .center, spacing: Theme.Spacing.md) {
                StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                    .frame(width: 64, height: 96)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                    .overlay {
                        RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous)
                            .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
                    }
                VStack(alignment: .leading, spacing: 2) {
                    Txt(story.title, .bodyStrong, lineLimit: 2)
                    Txt(story.fantasyLabel, .caption, color: Theme.Colors.textSecondary, lineLimit: 1)
                    if !metaLine.isEmpty {
                        Txt(metaLine, .micro, color: Theme.Colors.textMuted, lineLimit: 1)
                    }
                    if story.likes > 0 {
                        Txt(
                            t("ui.story_likes", ["formatted": Format.credits(story.likes, compact: true, locale: locale), "count": story.likes]),
                            .micro, color: Theme.Colors.textMuted, lineLimit: 1
                        )
                    }
                }
                Spacer(minLength: 0)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
        .accessibilityLabel(story.title)
    }
}
