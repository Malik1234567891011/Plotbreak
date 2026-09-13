import SwiftUI

// MARK: - DS-02 / DS-03 Search
//
// Screen 09 of the redesign. Twin of `SearchScreen` in
// `apps/mobile/src/screens/Discover.tsx`. A back chevron and a pill field up
// top; underneath, before anything is typed, the player's recent terms and a
// ranked list of what people look for. Results replace both once a query is in.
// Presented as a sheet; the chevron closes it.

struct SearchScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var query = ""
    @State private var results: [StorySummary] = []
    @State private var loading = false
    @State private var filters: [String] = []
    @FocusState private var focused: Bool

    private var trimmedQuery: String { query.trimmingCharacters(in: .whitespaces) }

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

    /// What people look for: the server's categories, in the order it ranks
    /// them. Tapping one searches for it.
    private var popular: [DiscoverCategory] {
        Array((store.discoverSnapshot.load()?.categories ?? []).prefix(10))
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack(spacing: 10) {
                    IconButton(t("story.back"), action: { router.dismissSheet() }) {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 22, weight: .medium))
                            .foregroundStyle(Theme.Colors.textPrimary)
                    }
                    HStack(spacing: Theme.Spacing.md) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 18, weight: .medium))
                            .foregroundStyle(Theme.Colors.textDim)
                        TextField(t("discover.search_placeholder_short"), text: $query)
                            .font(.system(size: 15))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .tint(Theme.Colors.accentPrimary)
                            .submitLabel(.search)
                            .autocorrectionDisabled()
                            .focused($focused)
                            .onSubmit { store.rememberSearch(trimmedQuery) }
                            .accessibilityLabel(t("discover.search_worlds"))
                        if !query.isEmpty {
                            Button {
                                query = ""
                            } label: {
                                Image(systemName: "xmark.circle.fill")
                                    .font(.system(size: 16))
                                    .foregroundStyle(Theme.Colors.textMuted)
                                    .frame(width: 28, height: 28)
                            }
                            .buttonStyle(PressOpacityStyle())
                            .accessibilityLabel(t("misc.close"))
                        }
                    }
                    .padding(.horizontal, 18)
                    .frame(minHeight: 46)
                    .background(Theme.Colors.bgElevated, in: Capsule())
                    .overlay { Capsule().strokeBorder(Theme.Colors.accentPrimary, lineWidth: 1.5) }
                }
                .padding(.leading, Theme.Spacing.xs)
                .padding(.trailing, Theme.pageGutter)
                .padding(.top, Theme.Spacing.sm)

                if !availableFilters.isEmpty, !trimmedQuery.isEmpty {
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: Theme.Spacing.sm) {
                            ForEach(availableFilters, id: \.self) { filter in
                                Chip(filter, selected: filters.contains(filter), style: .outlined) {
                                    if let index = filters.firstIndex(of: filter) {
                                        filters.remove(at: index)
                                    } else {
                                        filters.append(filter)
                                    }
                                }
                            }
                        }
                        .padding(.horizontal, Theme.pageGutter)
                        .padding(.top, Theme.Spacing.lg)
                    }
                }

                ScrollView {
                    if trimmedQuery.isEmpty {
                        idle
                    } else {
                        resultsList
                    }
                }
                .scrollDismissesKeyboard(.interactively)
            }
        }
        .onAppear { focused = true }
        .task(id: query) {
            // Debounced 220ms, like the RN screen.
            try? await Task.sleep(nanoseconds: 220_000_000)
            guard !Task.isCancelled else { return }
            guard !trimmedQuery.isEmpty else {
                results = []
                return
            }
            loading = true
            defer { loading = false }
            do {
                results = try await store.api.search(trimmedQuery).results
            } catch {
                results = []
            }
        }
    }

    // MARK: Before a query

    private var idle: some View {
        VStack(alignment: .leading, spacing: 0) {
            if !store.recentSearches.isEmpty {
                HStack(alignment: .firstTextBaseline) {
                    Text(t("discover.search_recent"))
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .accessibilityAddTraits(.isHeader)
                    Spacer(minLength: 0)
                    Button {
                        Haptic.play(.light)
                        store.clearSearches()
                    } label: {
                        Text(t("discover.search_delete_all"))
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.Colors.textMuted)
                            .frame(minHeight: Theme.minTouchTarget - 12)
                    }
                    .buttonStyle(PressOpacityStyle())
                }

                FlowLayout(spacing: 10) {
                    ForEach(store.recentSearches, id: \.self) { term in
                        RecentTermChip(
                            term: term,
                            onPress: { query = term },
                            onRemove: { store.forgetSearch(term) }
                        )
                    }
                }
                .padding(.top, Theme.Spacing.lg)
            }

            if !popular.isEmpty {
                Text(t("discover.search_popular"))
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .padding(.top, store.recentSearches.isEmpty ? 0 : 34)
                    .padding(.bottom, Theme.Spacing.xl)
                    .accessibilityAddTraits(.isHeader)

                // Ranked in two columns, read down then across: 1–5 on the
                // left, 6–10 on the right. The top three carry the accent.
                let items = Array(popular.enumerated())
                let half = (items.count + 1) / 2
                HStack(alignment: .top, spacing: 18) {
                    column(Array(items.prefix(half)))
                    column(Array(items.dropFirst(half)))
                }
            } else if store.recentSearches.isEmpty {
                EmptyState(title: t("discover.search_prompt_title"), message: t("discover.search_prompt_body"))
            }
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, 26)
        .padding(.bottom, Theme.Spacing.giant)
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func column(_ items: [(offset: Int, element: DiscoverCategory)]) -> some View {
        VStack(alignment: .leading, spacing: 22) {
            ForEach(items, id: \.element.id) { index, item in
                let top = index < 3
                let label = t.category(item.id, fallback: item.label)
                Button {
                    Haptic.play(.light)
                    query = label
                    store.rememberSearch(label)
                } label: {
                    HStack(spacing: 14) {
                        Text(String(index + 1))
                            .font(.system(size: 15, weight: top ? .semibold : .regular))
                            .foregroundStyle(top ? Theme.Colors.accentPrimary : Theme.Colors.textMuted)
                            .frame(width: 16, alignment: .leading)
                        Text(label.uppercased())
                            .font(.system(size: 15))
                            .foregroundStyle(top ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
                            .lineLimit(1)
                        Spacer(minLength: 0)
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(label)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    // MARK: Results

    private var resultsList: some View {
        LazyVStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            if filtered.isEmpty, !loading {
                EmptyState(
                    title: t("discover.search_no_results_title"),
                    message: t("discover.search_no_results_body")
                )
            }
            ForEach(filtered) { story in
                SearchResultRow(story: story, locale: store.locale) {
                    store.rememberSearch(trimmedQuery)
                    router.dismissSheet()
                    router.push(.storyDetail(storyId: story.storyId))
                }
            }
        }
        .padding(Theme.pageGutter)
        .padding(.top, Theme.Spacing.sm)
    }
}

/// A recent term: raised pill, the word, a small cross to forget it.
private struct RecentTermChip: View {
    let term: String
    let onPress: () -> Void
    let onRemove: () -> Void
    @Environment(\.translator) private var t

    var body: some View {
        HStack(spacing: 10) {
            Button {
                Haptic.play(.light)
                onPress()
            } label: {
                Text(term)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .lineLimit(1)
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(term)
            Button(action: onRemove) {
                Image(systemName: "xmark")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .frame(width: 20, height: 20)
                    .contentShape(Rectangle())
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(t("discover.search_remove_a11y", ["term": term]))
        }
        .padding(.leading, 13)
        .padding(.trailing, 9)
        .padding(.vertical, 7)
        .background(Theme.Colors.bgRaised, in: Capsule())
        .overlay { Capsule().strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5) }
    }
}

/// The RN card's `row` variant: a 64pt cover with the title beside it.
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
