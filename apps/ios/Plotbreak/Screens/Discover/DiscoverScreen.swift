import SwiftUI

// MARK: - DS-01 Discover home
//
// Twin of `apps/mobile/src/screens/Discover.tsx`, laid out the way the
// reference home is: the credits and search up top, the filter row, a wide
// banner for the featured worlds, then every shelf as a row of portrait
// covers with the title and creator under each, and the full catalogue as a
// grid so nothing is hidden. Spec §7.1 — a storefront, not a feed.

/// Card sizing, measured off the device rather than fixed.
///
/// Shelf covers run at ~98pt so 3.4 of them show on a 393pt phone — the row
/// is obviously scrollable. The full catalogue is a three-column grid of the
/// same card. Continue cards are two across.
private struct CardWidths {
    let rail: CGFloat
    let grid: CGFloat
    let `continue`: CGFloat

    init(screenWidth: CGFloat) {
        let usable = screenWidth - Theme.pageGutter * 2
        rail = floor((usable - Theme.Spacing.md * 3) / 3.4)
        grid = floor((usable - Theme.Spacing.md * 2) / 3)
        `continue` = floor((usable - Theme.Spacing.md) / 2)
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
    @State private var loadedOnce = false
    /// Whether the player has scrolled since this screen last came into view.
    /// A fresh shelf that arrives after that is held (`pending`) rather than
    /// swapped in under their thumb.
    @State private var hasScrolled = false
    /// A fresh response that arrived while the player was scrolling. Applied
    /// the next time the tab comes back into view.
    @State private var pending: DiscoverResponse?
    /// The last load failed offline while a shelf was on screen. The shelf
    /// stays; a banner says why it may be stale.
    @State private var showingStaleShelf = false

    private var hero: [StorySummary] {
        data?.rails.first(where: { $0.kind == .HERO })?.stories ?? []
    }

    var body: some View {
        Screen {
            GeometryReader { proxy in
                let widths = CardWidths(screenWidth: proxy.size.width)

                VStack(spacing: 0) {
                    header

                    ScrollView {
                        VStack(alignment: .leading, spacing: 0) {
                            // Scroll offset, so a shelf is not swapped mid-read.
                            GeometryReader { inner in
                                Color.clear.preference(
                                    key: ScrollOffsetKey.self,
                                    value: -inner.frame(in: .named("discover.scroll")).minY
                                )
                            }
                            .frame(height: 0)

                            // The filter row. Categories come from the server,
                            // which only ever offers one that has worlds in it.
                            if let data, !data.categories.isEmpty {
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: 10) {
                                        Chip(t("discover.category_main"), selected: category == nil, style: .outlined) {
                                            category = nil
                                        }
                                        ForEach(data.categories) { item in
                                            Chip(t.category(item.id, fallback: item.label), selected: category == item.id, style: .outlined) {
                                                category = item.id
                                            }
                                        }
                                    }
                                    .padding(.horizontal, Theme.pageGutter)
                                }
                                .padding(.top, Theme.Spacing.sm)
                            }

                            if store.offline || showingStaleShelf {
                                Txt(t("discover.offline_banner"), .caption, color: Theme.Colors.warning)
                                    .padding(Theme.Spacing.md)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                                    .padding(.horizontal, Theme.pageGutter)
                                    .padding(.top, Theme.Spacing.lg)
                            }

                            if data == nil, errorMessage == nil {
                                DiscoverSkeleton()
                                    .padding(.top, Theme.Spacing.lg)
                            }

                            if let errorMessage, data == nil {
                                EmptyState(
                                    title: t("discover.load_failed_title"),
                                    message: errorMessage,
                                    actionLabel: t("discover.try_again"),
                                    action: { Task { await load() } }
                                )
                            }

                            // The featured worlds as a wide banner you page through.
                            if !hero.isEmpty, data?.activeCategory == nil {
                                FeaturedBanner(stories: hero, width: proxy.size.width - Theme.pageGutter * 2) { storyId in
                                    router.push(.storyDetail(storyId: storyId))
                                }
                                .padding(.horizontal, Theme.pageGutter)
                                .padding(.top, Theme.Spacing.lg)
                            }

                            // Spec §7.2 item 3 — Continue, only when there is
                            // something to continue.
                            if let data, !data.continueCards.isEmpty {
                                VStack(alignment: .leading, spacing: 14) {
                                    shelfTitle(t("discover.continue"))
                                    ScrollView(.horizontal, showsIndicators: false) {
                                        HStack(spacing: Theme.Spacing.md) {
                                            ForEach(data.continueCards) { card in
                                                ContinueRunCard(
                                                    title: card.title,
                                                    storyId: card.storyId,
                                                    coverImage: card.coverImage,
                                                    turnsLine: t("discover.continue_turns_in", ["count": card.turnCount]),
                                                    width: widths.continue,
                                                    onPress: { router.push(.session(sessionId: card.sessionId)) }
                                                )
                                            }
                                        }
                                        .padding(.horizontal, Theme.pageGutter)
                                    }
                                }
                                .padding(.top, 28)
                            }

                            if let data {
                                ForEach(data.rails.filter { $0.kind != .HERO && $0.kind != .CONTINUE && !$0.stories.isEmpty }) { rail in
                                    railSection(rail, widths: widths)
                                        .padding(.top, 28)
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

                            // Daily credits, as the promo card at the foot of
                            // the page. Tapping it opens the wallet, where the
                            // claim button is.
                            if store.wallet?.dailyClaimAvailable == true {
                                dailyCard
                                    .padding(.horizontal, Theme.pageGutter)
                                    .padding(.top, 28)
                            }
                        }
                        .padding(.bottom, Theme.Spacing.giant)
                    }
                    .coordinateSpace(name: "discover.scroll")
                    .refreshable { await load(force: true) }
                    .onPreferenceChange(ScrollOffsetKey.self) { y in
                        // Anything past a nudge counts as reading the shelf.
                        if y > 8 { hasScrolled = true }
                    }
                }
            }
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
        .task(id: category) {
            // First frame from disk: the last shelf this phone saw, drawn
            // before the network is asked. Only for the default view; a
            // category is a filter chosen moments ago.
            if data == nil, category == nil, let saved = store.discoverSnapshot.load() {
                data = saved
            }
            await load()
        }
        .onAppear {
            // Reload on every return to the tab, the way the RN screen does
            // on navigation focus. The first appearance is `.task`'s.
            hasScrolled = false
            if let pending {
                self.pending = nil
                apply(pending)
            }
            if loadedOnce { Task { await load() } }
            loadedOnce = true
        }
    }

    // MARK: Header

    /// Credits and search, right-aligned. The filter row underneath is the
    /// page's own title.
    private var header: some View {
        HStack(spacing: Theme.Spacing.xs) {
            Spacer(minLength: 0)
            IconButton(t("wallet.title"), action: { router.present(.wallet(shortfall: nil)) }) {
                CreditGlyph(size: 22)
            }
            IconButton(t("discover.search_worlds"), action: { router.present(.search) }) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 22, weight: .medium))
                    .foregroundStyle(Theme.Colors.textPrimary)
            }
        }
        .padding(.horizontal, Theme.Spacing.xs)
        .frame(height: 48)
    }

    private func shelfTitle(_ title: String, action: (() -> Void)? = nil, actionLabel: String? = nil) -> some View {
        HStack(alignment: .center) {
            Text(title)
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: Theme.Spacing.md)
            if let action, let actionLabel {
                Button(action: action) {
                    ChevronGlyph(size: 24)
                        .frame(minWidth: Theme.minTouchTarget, minHeight: Theme.minTouchTarget - 12)
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(actionLabel)
            }
        }
        .padding(.horizontal, Theme.pageGutter)
    }

    private var dailyCard: some View {
        Button {
            Haptic.play(.light)
            router.present(.wallet(shortfall: nil))
        } label: {
            HStack(spacing: 14) {
                Image(systemName: "sparkles")
                    .font(.system(size: 24, weight: .regular))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .frame(width: 32)
                VStack(alignment: .leading, spacing: 3) {
                    Text(t("wallet.claim_daily"))
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Text(t("discover.daily_ready"))
                        .font(.system(size: 14))
                        .foregroundStyle(Theme.Colors.textMuted)
                }
                Spacer(minLength: Theme.Spacing.sm)
                ChevronGlyph()
            }
            .padding(.horizontal, 18)
            .padding(.vertical, 16)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
    }

    // MARK: Shelves

    @ViewBuilder
    private func railSection(_ rail: DiscoverRail, widths: CardWidths) -> some View {
        // A curated row is a sample and reads best as a rail you can flick
        // through. The full catalogue is not a sample — it gets a grid, so
        // every world is on the page.
        let asGrid = rail.id == "all" || rail.id == "category"
        VStack(alignment: .leading, spacing: 14) {
            shelfTitle(
                t.serverKey(rail.titleKey, fallback: rail.title),
                action: asGrid ? nil : { router.present(.search) },
                actionLabel: asGrid ? nil : t("discover.search_worlds")
            )
            if asGrid {
                LazyVGrid(columns: Array(repeating: GridItem(.fixed(widths.grid), spacing: Theme.Spacing.md, alignment: .top), count: 3),
                          alignment: .leading, spacing: Theme.Spacing.xl) {
                    ForEach(Array(rail.stories.enumerated()), id: \.element.storyId) { index, story in
                        card(story, width: widths.grid, rank: nil, railId: rail.id, position: index)
                    }
                }
                .padding(.horizontal, Theme.pageGutter)
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(alignment: .top, spacing: Theme.Spacing.md) {
                        ForEach(Array(rail.stories.enumerated()), id: \.element.storyId) { index, story in
                            // The rank only on the shelf that is about ranking.
                            card(story, width: widths.rail, rank: rail.kind == .TOP_RANKED ? index + 1 : nil, railId: rail.id, position: index)
                        }
                    }
                    .padding(.horizontal, Theme.pageGutter)
                }
            }
        }
    }

    private func card(_ story: StorySummary, width: CGFloat, rank: Int?, railId: String, position: Int) -> some View {
        PortraitStoryCard(
            story: story,
            width: width,
            rank: rank,
            locale: store.locale,
            onPress: { router.push(.storyDetail(storyId: story.storyId)) },
            onLongPress: { preview = story }
        )
        // §37.1 — the impression. `LazyVGrid` and the lazy `HStack` only build
        // a card when it is about to be on screen, so this fires on what was
        // actually shown rather than on everything the rail holds. Deduped per
        // run, because a player flicking a shelf back and forth saw one card.
        .onAppear {
            Telemetry.trackOnce(
                .storyCardViewed,
                key: "\(railId)|\(story.storyId)",
                ["storyId": story.storyId, "railId": railId, "position": position]
            )
        }
    }

    // MARK: Data

    /// Fetches the shelf. `force` swaps the result in regardless of scrolling:
    /// pull-to-refresh asked for exactly that.
    private func load(force: Bool = false) async {
        let requested = category
        do {
            let fresh = try await store.api.discover(tastes: store.tastes, category: requested)
            guard requested == category else { return } // the player moved on
            // A shelf the player is already reading is not swapped under
            // their thumb. It waits for the next return to the tab, or for a
            // pull. Nothing on screen yet, or a different category, or a
            // pull: apply now.
            let replacesDifferentView = data?.activeCategory != fresh.activeCategory
            if force || data == nil || replacesDifferentView || !hasScrolled {
                apply(fresh)
            } else {
                pending = fresh
                showingStaleShelf = false
            }
            Task { await store.refreshWallet() }
        } catch {
            guard requested == category else { return }
            // Spec §10.8 — which failure it was decides what the player
            // should do about it.
            let api = error as? APIError
            if data != nil, api?.isOffline == true {
                // A saved shelf beats an error screen, as long as it says so.
                showingStaleShelf = true
                return
            }
            if let api {
                errorMessage = api.isOffline ? t("discover.offline_body") : api.message
            } else {
                errorMessage = t("discover.load_failed")
            }
        }
    }

    private func apply(_ fresh: DiscoverResponse) {
        data = fresh
        errorMessage = nil
        showingStaleShelf = false
        if fresh.activeCategory == nil { store.discoverSnapshot.save(fresh) }
        // §37.1 — on the shelf the player can actually see. Emitting in `load`
        // would count a fetch that was parked in `pending` and never drawn.
        // `hasContinue` is the one that matters: a Discover with a Continue
        // rail is a returning player, and the two behave nothing alike.
        Telemetry.track(.discoverViewed, [
            "railCount": fresh.rails.count,
            "hasContinue": !fresh.continueCards.isEmpty,
        ])
    }
}

// MARK: - Featured banner

/// The featured worlds as one wide strip you page through: key art, a scrim,
/// the title and the fantasy line. Rotates every six seconds until touched.
private struct FeaturedBanner: View {
    let stories: [StorySummary]
    let width: CGFloat
    let onOpen: (String) -> Void

    @Environment(\.translator) private var t
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var position: String?
    @State private var driving = false
    @State private var autoTarget: String?

    private var height: CGFloat { (width * 0.42).rounded() }

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: Theme.Spacing.md) {
                ForEach(stories) { story in
                    Button {
                        Haptic.play(.light)
                        onOpen(story.storyId)
                    } label: {
                        StoryArt(seed: story.storyId, title: story.title, uri: story.keyArt ?? story.coverImage)
                            .frame(width: width, height: height)
                            .overlay(alignment: .bottomLeading) {
                                LinearGradient(
                                    stops: [.init(color: .clear, location: 0.3), .init(color: Theme.Colors.bgBase.opacity(0.9), location: 1)],
                                    startPoint: .top, endPoint: .bottom
                                )
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(story.title)
                                        .font(.system(size: 20, weight: .semibold))
                                        .foregroundStyle(Theme.Colors.textPrimary)
                                        .lineLimit(1)
                                    Text(story.fantasyLabel)
                                        .font(.system(size: 13))
                                        .foregroundStyle(Theme.Colors.textSecondary)
                                        .lineLimit(1)
                                }
                                .padding(14)
                            }
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(PressOpacityStyle(pressed: 0.9))
                    .accessibilityLabel(t("discover.hero_a11y", ["title": story.title, "fantasy": story.fantasyLabel]))
                    .id(story.storyId)
                }
            }
            .scrollTargetLayout()
        }
        .scrollTargetBehavior(.viewAligned)
        .scrollPosition(id: $position)
        .scrollClipDisabled()
        .frame(height: height)
        .onAppear { if position == nil { position = stories.first?.storyId } }
        .onChange(of: position) { _, newValue in
            if let newValue, newValue != autoTarget { driving = true }
        }
        .task(id: "\(driving)-\(stories.count)") {
            guard !driving, !reduceMotion, stories.count >= 2 else { return }
            while !Task.isCancelled {
                try? await Task.sleep(nanoseconds: 6_000_000_000)
                guard !Task.isCancelled else { return }
                let index = stories.firstIndex(where: { $0.storyId == position }) ?? 0
                let target = stories[(index + 1) % stories.count].storyId
                autoTarget = target
                withAnimation(.easeInOut(duration: Theme.Durations.sheet)) { position = target }
            }
        }
    }
}

private struct ScrollOffsetKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) { value = nextValue() }
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

                PBButton(t("discover.preview_open"), variant: .light, action: onOpen)

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
            .padding(Theme.pageGutter)
            .padding(.bottom, Theme.Spacing.sm)
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
            Skeleton(height: 150, radius: Theme.Radius.field)
                .padding(.horizontal, Theme.pageGutter)
            ForEach(0..<2, id: \.self) { _ in
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    Skeleton(width: 160, height: 24, radius: 6)
                        .padding(.horizontal, Theme.pageGutter)
                    HStack(spacing: Theme.Spacing.md) {
                        ForEach(0..<4, id: \.self) { _ in
                            Skeleton(width: 98, height: 147, radius: 8)
                        }
                    }
                    .padding(.horizontal, Theme.pageGutter)
                }
            }
        }
    }
}
