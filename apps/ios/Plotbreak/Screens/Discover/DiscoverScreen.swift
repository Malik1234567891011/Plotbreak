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
/// same card. Continue covers are the compact ones: ~5.6 across, small enough
/// that the shelf reads as a history strip rather than as a second storefront
/// competing with the shelves under it.
private struct CardWidths {
    let rail: CGFloat
    let grid: CGFloat
    let `continue`: CGFloat

    init(screenWidth: CGFloat) {
        let usable = screenWidth - Theme.pageGutter * 2
        rail = 104
        grid = floor((usable - Theme.Spacing.md * 2) / 3)
        `continue` = min(72, floor((usable - Theme.Spacing.md * 4) / 5.6))
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
    /// The page is scrolled off its top: the header draws its bottom rule.
    @State private var scrolledOffTop = false
    /// A fresh response that arrived while the player was scrolling. Applied
    /// the next time the tab comes back into view.
    @State private var pending: DiscoverResponse?
    /// The last load failed offline while a shelf was on screen. The shelf
    /// stays; a banner says why it may be stale.
    @State private var showingStaleShelf = false
    /// The featured story whose Play is starting a session.
    @State private var starting: String?

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

                            searchField
                                .padding(.horizontal, Theme.pageGutter)
                                .padding(.top, Theme.Spacing.sm)

                            // The filter row. Categories come from the server,
                            // which only ever offers one that has worlds in it.
                            if let data, !data.categories.isEmpty {
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: Theme.Spacing.sm) {
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
                                .padding(.top, Theme.Spacing.md)
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

                            // Design v3: the featured covers as posters, the current
                            // one's meta, hook and Play under them.
                            if !hero.isEmpty, data?.activeCategory == nil {
                                HeroCarousel(
                                    stories: hero,
                                    screenWidth: proxy.size.width,
                                    locale: store.locale,
                                    starting: starting,
                                    onOpen: { router.push(.storyDetail(storyId: $0)) },
                                    onPlay: { storyId in Task { await play(storyId) } }
                                )
                                .padding(.top, Theme.Spacing.lg)
                            }

                            // Spec §7.2 item 3 — Continue, only when there is
                            // something to continue.
                            if let data, !data.continueCards.isEmpty {
                                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                                    shelfTitle(t("discover.continue"),
                                               action: data.continueCards.count > 2 ? { router.tab = .library } : nil,
                                               actionLabel: t("library.see_all"))
                                    ForEach(data.continueCards.prefix(2)) { card in
                                        ContinueRow(card: card, locale: store.locale) {
                                            router.push(.session(sessionId: card.sessionId))
                                        }
                                    }
                                }
                                .padding(.top, 36)
                            }

                            // The Tower's daily climb (docs/tower.md). Hidden while it is off.
                            if data != nil, data?.activeCategory == nil {
                                TowerCard(source: "discover", compact: true,
                                          inset: EdgeInsets(top: 28, leading: Theme.pageGutter, bottom: 0, trailing: Theme.pageGutter))
                            }

                            if let data {
                                ForEach(data.rails.filter { $0.kind != .HERO && $0.kind != .CONTINUE && !$0.stories.isEmpty }) { rail in
                                    railSection(rail, widths: widths)
                                        .padding(.top, 36)
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
                                    .padding(.top, 36)
                            }
                        }
                        .padding(.bottom, Theme.Spacing.giant)
                    }
                    .coordinateSpace(name: "discover.scroll")
                    .refreshable { await load(force: true) }
                    .onPreferenceChange(ScrollOffsetKey.self) { y in
                        // Anything past a nudge counts as reading the shelf.
                        if y > 8 { hasScrolled = true }
                        scrolledOffTop = y > 2
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

    /// Design v3: the wordmark on the left, your balance on the right.
    private var header: some View {
        HStack(spacing: Theme.Spacing.sm) {
            Image("WordmarkInk")
                .resizable()
                .scaledToFit()
                .frame(height: 25)
                .accessibilityLabel(Text(verbatim: "Plotbreak"))
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: 0)
            CreditBalance(balance: store.wallet?.balance ?? 0, compact: false, locale: store.locale) {
                router.present(.wallet(shortfall: nil))
            }
            .accessibilityLabel(t("wallet.title"))
        }
        .padding(.horizontal, Theme.pageGutter)
        .frame(height: 52)
        // Solid ink, with a hairline once the page scrolls under it, so a row
        // cut by the edge reads as passing under the header.
        .background(Theme.Colors.bgBase)
        .overlay(alignment: .bottom) {
            Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5)
                .opacity(scrolledOffTop ? 1 : 0)
        }
        .zIndex(1)
    }

    /// The search field, as a button: it opens the search sheet.
    private var searchField: some View {
        Button {
            Haptic.play(.light)
            router.present(.search)
        } label: {
            HStack(spacing: Theme.Spacing.sm) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 15, weight: .medium))
                Text(t("discover.search_placeholder_short"))
                    .font(.system(size: 15))
                Spacer(minLength: 0)
            }
            .foregroundStyle(Theme.Colors.textMuted)
            .padding(.horizontal, 14)
            .frame(height: 40)
            .background(Theme.Colors.bgRaised, in: Capsule())
            .contentShape(Capsule())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(t("discover.search_worlds"))
    }

    private func shelfTitle(_ title: String, action: (() -> Void)? = nil, actionLabel: String? = nil) -> some View {
        HStack(alignment: .center) {
            Text(title)
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: Theme.Spacing.md)
            if let action, actionLabel != nil {
                // Design v3: "See all" is the only trailing link, plain text.
                Button(action: action) {
                    Text(t("library.see_all"))
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .frame(minHeight: Theme.minTouchTarget - 12)
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(actionLabel ?? t("library.see_all"))
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
                CreditGlyph(size: 30)
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
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
    }

    // MARK: Shelves

    @ViewBuilder
    private func railSection(_ rail: DiscoverRail, widths: CardWidths) -> some View {
        // A curated row is a sample and reads best as a rail you can flick
        // through. The full catalogue is not a sample — it gets a grid, so
        // every world is on the page. Top ranked is a short list of rows
        // (design v3): rank, cover, title, hook, likes and plays.
        let asGrid = rail.id == "all" || rail.id == "category"
        let ranked = rail.kind == .TOP_RANKED
        VStack(alignment: .leading, spacing: ranked ? Theme.Spacing.md : 14) {
            shelfTitle(
                t.serverKey(rail.titleKey, fallback: rail.title),
                action: asGrid ? nil : { router.present(.search) },
                actionLabel: asGrid ? nil : t("library.see_all")
            )
            if asGrid {
                LazyVGrid(columns: Array(repeating: GridItem(.fixed(widths.grid), spacing: Theme.Spacing.md, alignment: .top), count: 3),
                          alignment: .leading, spacing: Theme.Spacing.xl) {
                    ForEach(Array(rail.stories.enumerated()), id: \.element.storyId) { index, story in
                        card(story, width: widths.grid, rank: nil, railId: rail.id, position: index)
                    }
                }
                .padding(.horizontal, Theme.pageGutter)
            } else if ranked {
                ForEach(Array(rail.stories.prefix(3).enumerated()), id: \.element.storyId) { index, story in
                    RankedRow(story: story, rank: index + 1, locale: store.locale,
                              onPress: { router.push(.storyDetail(storyId: story.storyId)) },
                              onLongPress: { preview = story })
                        .onAppear {
                            Telemetry.trackOnce(.storyCardViewed, key: "\(rail.id)|\(story.storyId)",
                                                ["storyId": story.storyId, "railId": rail.id, "position": index])
                        }
                }
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(alignment: .top, spacing: Theme.Spacing.md) {
                        ForEach(Array(rail.stories.enumerated()), id: \.element.storyId) { index, story in
                            card(story, width: widths.rail, rank: nil, railId: rail.id, position: index)
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

    // MARK: Play

    /// Play under the featured poster: the same quick start as Play on the
    /// story page. Any failure that is not a shortfall opens the story page,
    /// where the player can try again or set up a character.
    private func play(_ storyId: String) async {
        guard starting == nil else { return }
        starting = storyId
        defer { starting = nil }
        do {
            let detail = try await store.api.storyDetail(storyId)
            let sessionId = try await QuickStart.start(detail, store: store, startPath: "instant")
            router.push(.session(sessionId: sessionId))
        } catch {
            if let api = error as? APIError, api.isInsufficientCredits {
                router.present(.wallet(shortfall: api.shortfall))
            } else {
                router.push(.storyDetail(storyId: storyId))
            }
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
/// Design v3 Home lead: the featured covers as 2:3 posters you page through
/// (the next one peeks in), with the current one's meta, hook and Play under.
private struct HeroCarousel: View {
    let stories: [StorySummary]
    let screenWidth: CGFloat
    let locale: AppLocale
    var starting: String?
    let onOpen: (String) -> Void
    let onPlay: (String) -> Void

    @Environment(\.translator) private var t
    @State private var position: String?

    private var posterWidth: CGFloat { min(280, ((screenWidth - Theme.pageGutter * 2) * 0.8).rounded()) }
    private var posterHeight: CGFloat { (posterWidth * 1.5).rounded() }
    private var current: StorySummary? { stories.first { $0.storyId == position } ?? stories.first }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: Theme.Spacing.md) {
                    ForEach(stories) { story in
                        Button {
                            Haptic.play(.light)
                            onOpen(story.storyId)
                        } label: {
                            StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage ?? story.keyArt)
                                .frame(width: posterWidth, height: posterHeight)
                                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                                .contentShape(Rectangle())
                        }
                        .buttonStyle(PressOpacityStyle(pressed: 0.9))
                        .accessibilityLabel(t("discover.hero_a11y", ["title": story.title, "fantasy": story.fantasyLabel]))
                        .id(story.storyId)
                    }
                }
                .scrollTargetLayout()
            }
            .contentMargins(.horizontal, Theme.pageGutter, for: .scrollContent)
            .scrollTargetBehavior(.viewAligned)
            .scrollPosition(id: $position)
            .frame(height: posterHeight)
            .onAppear { if position == nil { position = stories.first?.storyId } }

            if let story = current {
                VStack(alignment: .leading, spacing: 0) {
                    StoryMetaLine(story: story, locale: locale, tags: 2)
                        .padding(.top, Theme.Spacing.md)
                    Text(story.hook)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .lineLimit(2)
                        .fixedSize(horizontal: false, vertical: true)
                        .padding(.top, Theme.Spacing.xs)
                    PBButton(t("story.play"), variant: .light, loading: starting == story.storyId, icon: "play.fill") {
                        onPlay(story.storyId)
                    }
                    .padding(.top, Theme.Spacing.lg)
                }
                .padding(.horizontal, Theme.pageGutter)
                .animation(.easeOut(duration: Theme.Durations.instant), value: story.storyId)
            }
        }
    }
}

/// "Romance · Fantasy · ♥ 76K · 1.4M plays": tags, then the counts that are
/// not zero, as one quiet line (design v3: numbers stay inline).
struct StoryMetaLine: View {
    let story: StorySummary
    let locale: AppLocale
    var tags: Int = 2
    @Environment(\.translator) private var t

    var body: some View {
        let shown = Array(story.tags.prefix(tags))
        var text = Text(verbatim: shown.joined(separator: " · "))
        if story.likes > 0 {
            if !shown.isEmpty { text = text + Text(verbatim: " · ") }
            text = text + Text(Image(systemName: "heart.fill")).font(.system(size: 10))
                + Text(verbatim: " " + Format.credits(story.likes, compact: true, locale: locale))
        }
        if story.runs > 0 {
            if !shown.isEmpty || story.likes > 0 { text = text + Text(verbatim: " · ") }
            text = text + Text(verbatim: Format.credits(story.runs, compact: true, locale: locale) + " " + t("create.metric_plays"))
        }
        return text
            .font(.system(size: 13))
            .foregroundStyle(Theme.Colors.textMuted)
            .lineLimit(1)
    }
}

/// A run in progress (design v3): the cover, the title, how far in and when,
/// and the story's last line in the story's own type.
private struct ContinueRow: View {
    let card: ContinueCard
    let locale: AppLocale
    let onPress: () -> Void
    @Environment(\.translator) private var t

    private var meta: String {
        var parts = [t("discover.continue_turns_in", ["count": card.turnCount])]
        if let date = ISO8601.date(from: card.lastPlayedAt) { parts.append(Format.relative(date, locale: locale)) }
        return parts.joined(separator: " · ")
    }

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress()
        } label: {
            HStack(alignment: .top, spacing: Theme.Spacing.md) {
                StoryArt(seed: card.storyId, title: card.title, uri: card.coverImage)
                    .frame(width: 56, height: 84)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                VStack(alignment: .leading, spacing: 2) {
                    Text(card.title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                    Text(meta)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .lineLimit(1)
                    if let line = card.recapLine ?? card.currentObjective, !line.isEmpty {
                        Text(line)
                            .font(.system(size: 15, design: .serif))
                            .foregroundStyle(Theme.Colors.textSecondary)
                            .lineLimit(2)
                            .padding(.top, 4)
                    }
                }
                Spacer(minLength: 0)
            }
            .padding(.horizontal, Theme.pageGutter)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
    }
}

/// One Top ranked row (design v3): the rank, the cover, the title, the hook
/// and the counts.
private struct RankedRow: View {
    let story: StorySummary
    let rank: Int
    let locale: AppLocale
    let onPress: () -> Void
    let onLongPress: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress()
        } label: {
            HStack(alignment: .center, spacing: Theme.Spacing.md) {
                Text(verbatim: String(rank))
                    .font(.system(size: 17, weight: .semibold))
                    .monospacedDigit()
                    .foregroundStyle(Theme.Colors.textMuted)
                    .frame(width: 18, alignment: .leading)
                StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                    .frame(width: 56, height: 84)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                VStack(alignment: .leading, spacing: 2) {
                    Text(story.title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                    Text(story.hook)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .lineLimit(1)
                    StoryMetaLine(story: story, locale: locale, tags: 0)
                }
                Spacer(minLength: 0)
            }
            .padding(.horizontal, Theme.pageGutter)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .simultaneousGesture(LongPressGesture(minimumDuration: 0.45).onEnded { _ in
            Haptic.play(.medium)
            onLongPress()
        })
        .accessibilityElement(children: .combine)
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
