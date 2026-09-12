import SwiftUI

// MARK: - DS-01 Discover home
//
// Twin of `apps/mobile/src/screens/Discover.tsx`.
//
// Spec §7.1 — Discover sells fantasies, not AI capabilities. It should read
// like a premium storefront, not a feed of chatbot cards.

/// The height the floating header reserves, so the page can start under it.
private let headerHeight: CGFloat = 48

/// Card sizing, measured off the device rather than fixed at 150pt.
///
/// On a 393pt phone a two-column grid gives 170pt cards — the art is the
/// subject and the title is comfortably readable — while the rails run at 2.4
/// cards visible, so the row is obviously scrollable without a chevron telling
/// you so. Continue is deliberately the smallest shelf on the page: it is the
/// only rail selling something the player has already chosen.
private struct CardWidths {
    let grid: CGFloat
    let rail: CGFloat
    let `continue`: CGFloat

    init(screenWidth: CGFloat) {
        let usable = screenWidth - Theme.gutter * 2
        grid = floor((usable - Theme.Spacing.md) / 2)
        rail = floor((usable - Theme.Spacing.md * 1.4) / 2.4)
        `continue` = floor((usable - Theme.Spacing.md * 2.4) / 3.6)
    }
}

struct DiscoverScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var data: DiscoverResponse?
    @State private var errorMessage: String?
    @State private var preview: StorySummary?
    @State private var category: String?
    /// How opaque the floating header's background is: transparent over the
    /// hero art, solid once the page has scrolled up under it.
    @State private var headerFade: Double = 0
    @State private var loadedOnce = false

    private var hero: [StorySummary] {
        data?.rails.first(where: { $0.kind == .HERO })?.stories ?? []
    }

    var body: some View {
        Screen {
            GeometryReader { proxy in
                let widths = CardWidths(screenWidth: proxy.size.width)
                // Not `proxy.safeAreaInsets.top`: this reader ignores the top
                // safe area (so the hero can paint under the status bar), and a
                // reader inside that region reports zero.
                let topInset = Theme.topSafeAreaInset

                ZStack(alignment: .top) {
                    ScrollView {
                        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                            // Scroll offset, for the header's ramp.
                            GeometryReader { inner in
                                Color.clear.preference(
                                    key: ScrollOffsetKey.self,
                                    value: -inner.frame(in: .named("discover.scroll")).minY
                                )
                            }
                            .frame(height: 0)

                            if store.offline {
                                Txt(t("discover.offline_banner"), .caption, color: Theme.Colors.warning)
                                    .padding(Theme.Spacing.md)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                                    .padding(.horizontal, Theme.gutter)
                            }

                            if data == nil, errorMessage == nil {
                                DiscoverSkeleton()
                            }

                            if let errorMessage, data == nil {
                                EmptyState(
                                    title: t("discover.load_failed_title"),
                                    message: errorMessage,
                                    actionLabel: t("discover.try_again"),
                                    action: { Task { await load() } }
                                )
                            }

                            // One featured world, sized so it sells that world
                            // without being the entire first screen.
                            if !hero.isEmpty, data?.activeCategory == nil {
                                HeroCarousel(
                                    stories: hero,
                                    onOpen: { storyId in router.push(.storyDetail(storyId: storyId)) },
                                    backdropExtendTop: topInset + headerHeight
                                )
                            }

                            // The browse rail, directly under the hero. Art
                            // first, then the ways to cut it. Categories come
                            // from the server, which only ever offers one that
                            // has worlds in it.
                            if let data, !data.categories.isEmpty {
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: Theme.Spacing.sm) {
                                        Chip(t("discover.category_all"), selected: category == nil, tone: category == nil ? .accent : .neutral) {
                                            category = nil
                                        }
                                        ForEach(data.categories) { item in
                                            Chip(
                                                t.category(item.id, fallback: item.label),
                                                selected: category == item.id,
                                                tone: category == item.id ? .accent : .neutral
                                            ) {
                                                category = item.id
                                            }
                                        }
                                    }
                                    .padding(.horizontal, Theme.gutter)
                                }
                            }

                            // Spec §7.2 item 3 — Continue, only when there is
                            // something to continue. A rail like the others,
                            // because it is a shelf like the others, at a
                            // smaller width.
                            if let data, !data.continueCards.isEmpty {
                                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                                    SectionHeader(title: t("discover.continue"))
                                    ScrollView(.horizontal, showsIndicators: false) {
                                        HStack(alignment: .top, spacing: Theme.Spacing.md) {
                                            ForEach(data.continueCards) { card in
                                                StoryCoverCard(
                                                    story: .continueShelf(card, fantasyLabel: t("discover.continue_turns_in", ["count": card.turnCount])),
                                                    width: widths.continue,
                                                    showLikes: false,
                                                    locale: store.locale,
                                                    onPress: { router.push(.session(sessionId: card.sessionId)) }
                                                )
                                            }
                                        }
                                        .padding(.horizontal, Theme.gutter)
                                    }
                                }
                            }

                            if let data {
                                ForEach(data.rails.filter { $0.kind != .HERO && $0.kind != .CONTINUE && !$0.stories.isEmpty }) { rail in
                                    railSection(rail, widths: widths)
                                }

                                if data.rails.allSatisfy({ $0.stories.isEmpty }) {
                                    EmptyState(
                                        title: t("discover.empty_title"),
                                        message: t("discover.empty_body"),
                                        actionLabel: t("discover.empty_action"),
                                        action: { category = nil }
                                    )
                                }
                            }
                        }
                        .padding(.top, topInset + headerHeight)
                        .padding(.bottom, Theme.Spacing.giant)
                    }
                    .coordinateSpace(name: "discover.scroll")
                    .ignoresSafeArea(edges: .top)
                    .refreshable { await load() }
                    .onPreferenceChange(ScrollOffsetKey.self) { y in
                        // A short ramp: the header is solid by the time
                        // anything reaches it.
                        headerFade = max(0, min(1, y / 120))
                    }

                    // Spec §7.2 item 1 — the header, floated rather than
                    // stacked, so it paints over the hero's blurred art.
                    header
                        .frame(height: headerHeight)
                        .padding(.top, topInset)
                        .background { Theme.Colors.bgBase.opacity(headerFade) }
                }
            }
            .ignoresSafeArea(edges: .top)
            .overlay {
                // DS-04 — long-press quick preview.
                if let story = preview {
                    QuickPreviewSheet(
                        story: story,
                        onClose: { preview = nil },
                        onOpen: {
                            preview = nil
                            router.push(.storyDetail(storyId: story.storyId))
                        },
                        onHide: {
                            preview = nil
                            Task {
                                _ = try? await store.api.hideStory(story.storyId)
                                await load()
                            }
                        },
                        onReport: {
                            preview = nil
                            router.present(.report(targetType: "STORY", targetId: story.storyId))
                        }
                    )
                    .transition(.opacity)
                }
            }
            .animation(.easeOut(duration: Theme.Durations.short), value: preview == nil)
        }
        .task(id: category) { await load() }
        .onAppear {
            // Reload on every return to the tab, the way the RN screen does
            // on navigation focus. The first appearance is `.task`'s.
            if loadedOnce { Task { await load() } }
            loadedOnce = true
        }
    }

    private var header: some View {
        HStack {
            Text("PLOTBREAK")
                .font(Theme.TypeStyle.h2.font())
                .kerning(3)
                .foregroundStyle(Theme.Colors.textPrimary)
            Spacer(minLength: 0)
            HStack(spacing: Theme.Spacing.sm) {
                IconButton(t("discover.search_worlds"), action: { router.present(.search) }) {
                    SearchIcon()
                }
                CreditBalance(balance: store.balance, locale: store.locale) {
                    router.present(.wallet(shortfall: nil))
                }
            }
        }
        .padding(.horizontal, Theme.gutter)
    }

    @ViewBuilder
    private func railSection(_ rail: DiscoverRail, widths: CardWidths) -> some View {
        // A curated row is a sample and reads best as a rail you can flick
        // through. The full catalogue is not a sample — it gets a grid, the
        // only layout that says "there is a lot here" without shrinking the
        // covers to nothing.
        let asGrid = rail.id == "all" || rail.id == "category"
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            SectionHeader(
                title: t.serverKey(rail.titleKey, fallback: rail.title),
                subtitle: rail.subtitle.map { t.serverKey(rail.subtitleKey, fallback: $0, params: rail.subtitleParams) }
            )
            if asGrid {
                LazyVGrid(columns: [GridItem(.fixed(widths.grid), spacing: Theme.Spacing.md), GridItem(.fixed(widths.grid))],
                          alignment: .leading, spacing: Theme.Spacing.md) {
                    ForEach(rail.stories) { story in
                        card(story, width: widths.grid, rank: nil)
                    }
                }
                .padding(.horizontal, Theme.gutter)
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(alignment: .top, spacing: Theme.Spacing.md) {
                        ForEach(Array(rail.stories.enumerated()), id: \.element.storyId) { index, story in
                            // The rank only on the shelf that is about ranking.
                            card(story, width: widths.rail, rank: rail.kind == .TOP_RANKED ? index + 1 : nil)
                        }
                    }
                    .padding(.horizontal, Theme.gutter)
                }
            }
        }
    }

    private func card(_ story: StorySummary, width: CGFloat, rank: Int?) -> some View {
        StoryCoverCard(
            story: story,
            width: width,
            rank: rank,
            locale: store.locale,
            onPress: { router.push(.storyDetail(storyId: story.storyId)) },
            onLongPress: { preview = story }
        )
    }

    private func load() async {
        do {
            data = try await store.api.discover(tastes: store.tastes, category: category)
            errorMessage = nil
            Task { await store.refreshWallet() }
        } catch {
            // Spec §10.8 — which failure it was decides what the player
            // should do about it.
            if let api = error as? APIError {
                errorMessage = api.isOffline ? t("discover.offline_body") : api.message
            } else {
                errorMessage = t("discover.load_failed")
            }
        }
    }
}

private struct ScrollOffsetKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) { value = nextValue() }
}

/// A magnifier, drawn: a ring and a handle. `⌕` at body size on a dark
/// background reads as a smudge rather than a control.
private struct SearchIcon: View {
    var body: some View {
        ZStack {
            Circle()
                .strokeBorder(Theme.Colors.textPrimary, lineWidth: 2)
                .frame(width: 17, height: 17)
                .offset(x: -2, y: -2)
            Capsule()
                .fill(Theme.Colors.textPrimary)
                .frame(width: 2, height: 8)
                .rotationEffect(.degrees(-45))
                .offset(x: 6, y: 6)
        }
        .frame(width: 26, height: 26)
    }
}

private extension StorySummary {
    /// The Continue shelf reuses the cover card for a run the player is already
    /// in. No creator byline, no official pill, no run count: you have already
    /// chosen this one. The second line is "8 turns in".
    static func continueShelf(_ card: ContinueCard, fantasyLabel: String) -> StorySummary {
        StorySummary(
            storyId: card.storyId,
            storyVersionId: "",
            title: card.title,
            fantasyLabel: fantasyLabel,
            hook: "",
            creatorName: "",
            official: false,
            coverImage: card.coverImage,
            keyArt: nil,
            tags: [],
            mechanicsChips: [],
            contentDescriptors: [],
            intensity: .MODERATE,
            runs: 0,
            likes: 0,
            comments: 0,
            likedByMe: false,
            saved: false,
            badges: [],
            updatedAt: card.lastPlayedAt
        )
    }
}

// MARK: - DS-04 Quick preview

/// Bottom sheet: Save, Hide, Report.
private struct QuickPreviewSheet: View {
    let story: StorySummary
    let onClose: () -> Void
    let onOpen: () -> Void
    let onHide: () -> Void
    let onReport: () -> Void

    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    @State private var saved: Bool

    init(story: StorySummary, onClose: @escaping () -> Void, onOpen: @escaping () -> Void,
         onHide: @escaping () -> Void, onReport: @escaping () -> Void) {
        self.story = story
        self.onClose = onClose
        self.onOpen = onOpen
        self.onHide = onHide
        self.onReport = onReport
        _saved = State(initialValue: story.saved)
    }

    var body: some View {
        ZStack(alignment: .bottom) {
            Theme.Colors.scrim
                .ignoresSafeArea()
                .contentShape(Rectangle())
                .onTapGesture(perform: onClose)
                .accessibilityLabel(t("discover.preview_close_a11y"))
                .accessibilityAddTraits(.isButton)

            VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                HStack(alignment: .top, spacing: Theme.Spacing.md) {
                    StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                        .frame(width: 56, height: 76)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                    VStack(alignment: .leading, spacing: 2) {
                        Txt(story.title, .bodyStrong)
                        Txt(story.hook, .caption, color: Theme.Colors.textSecondary, lineLimit: 2)
                    }
                }

                PBButton(t("discover.preview_open"), action: onOpen)

                HStack(spacing: Theme.Spacing.md) {
                    Chip(saved ? t("discover.saved") : t("discover.save"), selected: saved) {
                        let next = !saved
                        saved = next
                        Task {
                            do { _ = try await store.api.saveStory(story.storyId, saved: next) }
                            catch { saved = !next }
                        }
                    }
                    Spacer(minLength: 0)
                    Chip(t("discover.not_interested"), action: onHide)
                    Spacer(minLength: 0)
                    Chip(t("discover.report"), tone: .danger, action: onReport)
                }
            }
            .padding(Theme.gutter)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                Theme.Colors.bgElevated,
                in: UnevenRoundedRectangle(topLeadingRadius: Theme.Radius.large, topTrailingRadius: Theme.Radius.large, style: .continuous)
            )
        }
    }
}

// MARK: - Skeleton

private struct DiscoverSkeleton: View {
    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
            Skeleton(height: 240, radius: Theme.Radius.large)
                .padding(.horizontal, Theme.gutter)
            ForEach(0..<2, id: \.self) { _ in
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    Skeleton(width: 140, height: 22, radius: 6)
                        .padding(.horizontal, Theme.gutter)
                    HStack(spacing: Theme.Spacing.md) {
                        ForEach(0..<3, id: \.self) { _ in
                            Skeleton(width: 150, height: 225)
                        }
                    }
                    .padding(.horizontal, Theme.gutter)
                }
            }
        }
    }
}
