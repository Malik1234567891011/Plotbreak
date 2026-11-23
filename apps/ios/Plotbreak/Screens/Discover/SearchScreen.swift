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
    /// nil until a server that knows the Characters tab answers; then the
    /// "Stories | Characters" chips appear.
    @State private var characters: [SearchCharacter]?
    @State private var tab: SearchTab = .stories
    @State private var loading = false
    @State private var filters: [String] = []
    @FocusState private var focused: Bool

    private var trimmedQuery: String { query.trimmingCharacters(in: .whitespaces) }

    private var showsTabs: Bool { SearchTab.showsTabs(characters: characters, query: trimmedQuery) }

    /// The tab actually drawn: Characters only while the server sends them.
    private var activeTab: SearchTab { showsTabs ? tab : .stories }

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
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                    }
                    HStack(spacing: Theme.Spacing.sm) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 15, weight: .medium))
                            .foregroundStyle(Theme.Colors.textMuted)
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
                    .padding(.horizontal, 16)
                    .frame(minHeight: 44)
                    // Design v3: filled, no outline; the caret says it is focused.
                    .background(Theme.Colors.bgRaised, in: Capsule())
                }
                .padding(.leading, Theme.Spacing.xs)
                .padding(.trailing, Theme.pageGutter)
                .padding(.top, Theme.Spacing.sm)

                if showsTabs {
                    tabRow
                }

                if activeTab == .stories, !availableFilters.isEmpty, !trimmedQuery.isEmpty {
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
                        .padding(.horizontal, Theme.pageGutter)
                        .padding(.top, showsTabs ? Theme.Spacing.md : Theme.Spacing.lg)
                    }
                }

                ScrollView {
                    if trimmedQuery.isEmpty {
                        idle
                    } else if activeTab == .characters {
                        charactersList
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
                characters = nil
                return
            }
            loading = true
            defer { loading = false }
            do {
                let response = try await store.api.search(trimmedQuery)
                results = response.results
                characters = response.characters
            } catch {
                // A keystroke cancels the request in flight. That is not a
                // failure: the next task answers in a moment, and clearing
                // here would collapse the Stories | Characters chips and
                // flash "No worlds matched" on every letter typed.
                guard !Task.isCancelled else { return }
                results = []
                characters = nil
            }
        }
    }

    // MARK: Before a query

    private var idle: some View {
        VStack(alignment: .leading, spacing: 0) {
            if !store.recentSearches.isEmpty {
                HStack(alignment: .firstTextBaseline) {
                    Text(t("discover.search_recent"))
                        .font(.system(size: 20, weight: .semibold))
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
                    .font(.system(size: 20, weight: .semibold))
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
                            .foregroundStyle(top ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
                            .monospacedDigit()
                            .frame(width: 16, alignment: .leading)
                        Text(label)
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

    // MARK: Tabs

    /// Design v3 (board frame Search): two filled chips under the field, the
    /// active one in paper.
    private var tabRow: some View {
        HStack(spacing: Theme.Spacing.sm) {
            ForEach(SearchTab.allCases, id: \.self) { item in
                SearchTabChip(
                    label: item == .stories ? t("discover.search_tab_stories") : t("discover.search_tab_characters"),
                    selected: activeTab == item
                ) {
                    withAnimation(.easeOut(duration: Theme.Durations.short)) { tab = item }
                }
            }
            Spacer(minLength: 0)
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, 14)
    }

    // MARK: Characters

    private var charactersList: some View {
        LazyVStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            if (characters ?? []).isEmpty, !loading {
                EmptyState(
                    title: t("discover.search_no_results_title"),
                    message: t("discover.search_no_results_body")
                )
            }
            ForEach(characters ?? []) { character in
                SearchCharacterRow(character: character) {
                    store.rememberSearch(trimmedQuery)
                    router.dismissSheet()
                    router.push(.storyDetail(storyId: character.storyId))
                }
            }
        }
        .padding(Theme.pageGutter)
        .padding(.top, Theme.Spacing.sm)
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

/// Stories or Characters, under the search field.
enum SearchTab: CaseIterable, Hashable {
    case stories, characters

    /// The chips show only for a typed query, and only when the server sent a
    /// characters list at all: an older server omits it, and then the screen
    /// is exactly what it was before the tab existed.
    static func showsTabs(characters: [SearchCharacter]?, query: String) -> Bool {
        characters != nil && !query.trimmingCharacters(in: .whitespaces).isEmpty
    }
}

/// "{role} · {story}" under a character's name in search.
enum SearchCharacterLine {
    /// Roles are written as sentences ("Room 314. Four years into an
    /// investigation nobody asked her to run"), and one line holds the first
    /// clause and the world's name, not the whole sentence. The same cut the
    /// story page's cast rail makes.
    static func shortRole(_ role: String) -> String {
        let cut = role.split(whereSeparator: { $0 == "," || $0 == "." || $0 == ";" }).first.map(String.init) ?? role
        return cut.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    static func text(role: String, story: String, t: Translator) -> String {
        let role = shortRole(role)
        if role.isEmpty { return story }
        return t("discover.search_character_line", ["role": role, "story": story])
    }
}

/// Board: 34pt capsule, 16pt sides; paper when active, raised with a hairline
/// when not.
private struct SearchTabChip: View {
    let label: String
    let selected: Bool
    let action: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            Text(label)
                .font(.system(size: 13, weight: selected ? .semibold : .medium))
                .foregroundStyle(selected ? Theme.Colors.textOnLight : Theme.Colors.textPrimary)
                .lineLimit(1)
                .padding(.horizontal, 16)
                .frame(height: 34)
                .background(selected ? Theme.Colors.light : Theme.Colors.bgRaised, in: Capsule())
                .overlay {
                    if !selected { Capsule().strokeBorder(Theme.Colors.borderSubtle, lineWidth: 1) }
                }
                .contentShape(Capsule())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityAddTraits(selected ? [.isButton, .isSelected] : .isButton)
    }
}

/// A cast member: their face, their name, what they are and where.
private struct SearchCharacterRow: View {
    let character: SearchCharacter
    let onPress: () -> Void
    @Environment(\.translator) private var t

    private var line: String {
        SearchCharacterLine.text(role: character.role, story: character.storyTitle, t: t)
    }

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress()
        } label: {
            HStack(alignment: .center, spacing: Theme.Spacing.md) {
                CharacterPortrait(name: character.name, uri: character.portrait, size: 48)
                VStack(alignment: .leading, spacing: 2) {
                    Text(character.name)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                    // The world's name says where the tap goes, so when the
                    // role and the world do not fit on one line together, the
                    // world wins rather than both being cut mid-word.
                    ViewThatFits(in: .horizontal) {
                        Text(line).fixedSize()
                        Text(character.storyTitle).lineLimit(1)
                    }
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                }
                Spacer(minLength: 0)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(character.name + ", " + line)
        .accessibilityAddTraits(.isButton)
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
                    .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                // Design v3 (board frame Search): the title, the hook, then the
                // facts in one quiet line.
                VStack(alignment: .leading, spacing: 3) {
                    Text(story.title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(2)
                    Text(story.hook.isEmpty ? story.fantasyLabel : story.hook)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .lineLimit(2)
                    Text(([metaLine] + (story.likes > 0
                            ? [t("ui.story_likes", ["formatted": Format.credits(story.likes, compact: true, locale: locale), "count": story.likes])]
                            : []))
                            .filter { !$0.isEmpty }.joined(separator: " · "))
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .lineLimit(1)
                }
                Spacer(minLength: 0)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
        .accessibilityLabel(story.title)
    }
}
