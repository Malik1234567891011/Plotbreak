import SwiftUI

// MARK: - Wallet (WL-01 / WL-02 / WL-03)
//
// Twin of `apps/mobile/src/screens/Wallet.tsx`. Spec §20.6 — balance large at
// top, packs, restore, history, and an honest explanation of how credits work.
// Spec §3.8: never fake scarcity or prices.

private enum WalletTab: CaseIterable {
    case packs, daily, how
}

struct WalletScreen: View {
    let shortfall: Int?

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var wallet: WalletSummary?
    @State private var offers: [StoreOffer] = []
    @State private var ledger: [LedgerEntry] = []
    @State private var ledgerCursor: String?
    @State private var ledgerLoading = false
    @State private var showHistory = false
    @State private var tab: WalletTab = .packs
    /// `daily`, `restore`, or the product id being bought.
    @State private var busy: String?
    /// Which pack the player has picked, bought with one deliberate button.
    /// Selecting and spending money are two gestures, not one.
    @State private var selected: String?
    @State private var notice: String?
    /// The store's own localised prices, keyed by product id. Our reference
    /// price is the placeholder until the store answers.
    @State private var storePrices: [String: String] = [:]
    @State private var storeUnavailable: String?
    /// How many credits just landed, while the burst is on screen. Set only
    /// after the server confirmed and the balance reloaded (WL-02).
    @State private var celebrating: Int?
    /// The Pass's localised price, for its row.
    @State private var passPrice: String?

    /// Badges that pay credits and are not collected yet: the store's quests.
    @State private var quests: [BadgeView] = []

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                header

                // Pinned, not inline. Restore sits at the very bottom of a page
                // taller than the screen, so a notice in the scroll flow is a
                // confirmation the player never sees.
                if let notice {
                    Card {
                        Txt(notice, .bodyCompact)
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.sm)
                    .accessibilityAddTraits(.updatesFrequently)
                }

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        shortfallBanner
                        if showHistory {
                            history
                            howItWorks
                        } else {
                            balance
                            firstPurchase
                            packs
                            earn
                            footer
                        }
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.sm)
                    .padding(.bottom, Theme.Spacing.xxl)
                }
            }
        }
        .overlay {
            if let celebrating {
                CreditCelebration(credits: celebrating, locale: store.locale) {
                    self.celebrating = nil
                }
                .transition(.opacity)
            }
        }
        .task {
            // One billing connection for the app; it outlives this screen so a
            // transaction StoreKit redelivers from a previous launch still lands.
            store.purchases.connect()
            store.purchases.translator = t
            await load()
            // §37.3 — after the balance is loaded, so the number reported is
            // the one the player is looking at. `trigger` is what sent them
            // here: a shortfall means the paywall pushed them, anything else
            // means they came of their own accord, and those convert nothing
            // alike.
            Telemetry.track(.walletOpened, [
                "balance": store.wallet?.balance ?? 0,
                "trigger": shortfall == nil ? "browse" : "shortfall",
            ])
        }
        .task { await loadQuests() }
    }

    // MARK: Sections (design v3: a game shop, after Character AI and Afizzy)

    /// "My credits", then history and close as two round buttons.
    private var header: some View {
        HStack(spacing: Theme.Spacing.sm) {
            Text(t("wallet.my_credits"))
                .font(.system(size: 28, weight: .bold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: 0)
            roundButton(showHistory ? "square.grid.2x2" : "list.bullet.rectangle",
                        label: showHistory ? t("wallet.packs_title") : t("wallet.history")) {
                withAnimation(.easeOut(duration: Theme.Durations.short)) { showHistory.toggle() }
                if showHistory, ledger.isEmpty {
                    Task { await loadLedger(reset: true) }
                }
            }
            roundButton("xmark", label: t("wallet.close")) { router.dismissSheet() }
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, Theme.Spacing.lg)
        .padding(.bottom, Theme.Spacing.sm)
    }

    private func roundButton(_ symbol: String, label: String, action: @escaping () -> Void) -> some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            Image(systemName: symbol)
                .font(.system(size: 15, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .frame(width: 36, height: 36)
                .background(Theme.Colors.bgRaised, in: Circle())
                .frame(width: Theme.minTouchTarget, height: Theme.minTouchTarget)
                .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(label)
    }

    /// WL-03 — the exact shortfall, never a vague "not enough".
    @ViewBuilder
    private var shortfallBanner: some View {
        if let shortfall, shortfall > 0 {
            Card {
                VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                    Text.crystals(t("wallet.shortfall", ["count": shortfall]), fontSize: 17)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Txt(t("wallet.shortfall_hint"), .caption, color: Theme.Colors.textSecondary)
                }
            }
            .padding(.bottom, Theme.Spacing.md)
        }
    }

    /// Spec §26.10 — the wallet always shows the full number. Design v3: the
    /// crystal beside it, as a row, with no turn count.
    @ViewBuilder
    private var balance: some View {
        if let wallet {
            HStack(spacing: Theme.Spacing.md) {
                Image("PackOne")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 64, height: 64)
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 0) {
                    Text(Format.credits(wallet.balance, locale: store.locale))
                        .font(.system(size: 32, weight: .bold))
                        .monospacedDigit()
                        .foregroundStyle(Theme.Colors.textPrimary)
                        // Credits arriving should be visible as the number
                        // moving, not as a different number being there
                        // when the burst clears.
                        .contentTransition(.numericText())
                        .animation(.snappy(duration: Theme.Durations.fadeIn), value: wallet.balance)
                    if wallet.reserved > 0 {
                        Txt(t("wallet.reserved_held", ["count": wallet.reserved]), .caption, color: Theme.Colors.textMuted)
                    }
                }
                Spacer(minLength: 0)
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel("\(Format.credits(wallet.balance, locale: store.locale)) \(t("wallet.credits_unit"))")
        } else {
            Skeleton(height: 64)
        }
    }

    /// The doubled starter pack, as its own wide card with the three-crystal art.
    @ViewBuilder
    private var firstPurchase: some View {
        if let offer = buyableOffers.first(where: { $0.firstPurchaseOnly }) {
            Button {
                buy(offer)
            } label: {
                HStack(spacing: Theme.Spacing.md) {
                    Image("PackFew")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 84, height: 84)
                    VStack(alignment: .leading, spacing: 2) {
                        HStack(alignment: .firstTextBaseline, spacing: 6) {
                            Text(Format.credits(offer.credits + offer.bonusCredits, locale: store.locale))
                                .font(.system(size: 28, weight: .bold))
                                .monospacedDigit()
                                .foregroundStyle(Theme.Colors.textPrimary)
                            if offer.bonusCredits > 0 {
                                Text(Format.credits(offer.credits, locale: store.locale))
                                    .font(.system(size: 13))
                                    .strikethrough()
                                    .foregroundStyle(Theme.Colors.textMuted)
                            }
                        }
                        if offer.bonusCredits > 0 {
                            Text(t("wallet.bonus_badge", ["bonus": Format.credits(offer.bonusCredits, locale: store.locale)]))
                                .font(.system(size: 13))
                                .foregroundStyle(Theme.Colors.textPrimary)
                        }
                        if let ends = offer.expiresAt {
                            Txt(t("wallet.ends", ["when": relativeTime(ends)]), .micro, color: Theme.Colors.textMuted)
                        }
                    }
                    Spacer(minLength: Theme.Spacing.sm)
                    pricePill(offer, height: 44, fontSize: 17)
                }
                .padding(.horizontal, 14)
                .padding(.top, 26)
                .padding(.bottom, 14)
                .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                .overlay(alignment: .topLeading) {
                    if let word = rungWord(offer) { cornerTag(word, radius: 16) }
                }
                .contentShape(Rectangle())
            }
            .buttonStyle(PressScaleStyle())
            .disabled(busy != nil)
            .opacity(busy != nil && busy != offer.productId ? 0.5 : 1)
            .accessibilityLabel(offerLabel(offer))
            .padding(.top, 22)
        }
    }

    /// The standing packs, three across. Each tile is its own buy: the art grows
    /// with the price, then the total, the base crossed out with the real bonus,
    /// and the price on a white pill. Apple's payment sheet confirms.
    private var packs: some View {
        let standing = buyableOffers.filter { !$0.firstPurchaseOnly }.sorted { $0.credits < $1.credits }
        return VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Text(t("wallet.packs_title"))
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: Theme.Spacing.sm), count: 3), spacing: Theme.Spacing.sm) {
                ForEach(Array(standing.enumerated()), id: \.element.productId) { index, offer in
                    packTile(offer, art: Self.packArt[min(index, Self.packArt.count - 1)])
                }
                if standing.isEmpty {
                    ForEach(0..<6, id: \.self) { _ in Skeleton(height: 220, radius: 14) }
                }
            }
        }
        .padding(.top, 28)
    }

    /// The pack pictures, smallest to largest: one crystal, three, a pouch, a
    /// basket, a crate, a chest (docs/design-v3/pack-icons), with the size each
    /// is drawn at so the pile visibly grows.
    private static let packArt: [(name: String, size: CGFloat)] = [
        ("PackOne", 68), ("PackFew", 74), ("PackPouch", 84), ("PackBasket", 88), ("PackCrate", 92), ("PackChest", 96),
    ]

    private func packTile(_ offer: StoreOffer, art: (name: String, size: CGFloat)) -> some View {
        let popular = offer.tier == .POPULAR
        return Button {
            buy(offer)
        } label: {
            VStack(spacing: 0) {
                Image(art.name)
                    .resizable()
                    .scaledToFit()
                    .frame(width: art.size, height: art.size)
                    .frame(height: 96)
                Text(Format.credits(offer.credits + offer.bonusCredits, locale: store.locale))
                    .font(.system(size: 18, weight: .bold))
                    .monospacedDigit()
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                    .padding(.top, 4)
                HStack(spacing: 5) {
                    if offer.bonusCredits > 0 {
                        Text(Format.credits(offer.credits, locale: store.locale))
                            .strikethrough()
                            .foregroundStyle(Theme.Colors.textMuted)
                        Text(verbatim: "+\(Int((Double(offer.bonusCredits) / Double(max(1, offer.credits)) * 100).rounded()))%")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .padding(.horizontal, 5)
                            .padding(.vertical, 1)
                            .background(Theme.Colors.borderStrong, in: RoundedRectangle(cornerRadius: 5, style: .continuous))
                    }
                }
                .font(.system(size: 12))
                .lineLimit(1)
                .minimumScaleFactor(0.7)
                .frame(height: 18)
                .padding(.top, 2)
                if let ends = offer.expiresAt {
                    Txt(t("wallet.ends", ["when": relativeTime(ends)]), .micro, color: Theme.Colors.textMuted)
                }
                Spacer(minLength: Theme.Spacing.sm)
                pricePill(offer, height: 34, fontSize: 15)
            }
            .padding(.horizontal, Theme.Spacing.sm)
            .padding(.top, 14)
            .padding(.bottom, 10)
            .frame(maxWidth: .infinity, minHeight: 216)
            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay {
                if popular {
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .strokeBorder(Theme.Colors.textPrimary, lineWidth: 1.5)
                }
            }
            .overlay(alignment: .topLeading) {
                if let word = rungWord(offer) { cornerTag(word, radius: 14) }
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
        .disabled(busy != nil)
        .opacity(busy != nil && busy != offer.productId ? 0.5 : 1)
        .accessibilityLabel(offerLabel(offer))
    }

    /// The white price pill. The store's own localised price once it has
    /// answered; a spinner while this pack is being bought.
    private func pricePill(_ offer: StoreOffer, height: CGFloat, fontSize: CGFloat) -> some View {
        ZStack {
            if busy == offer.productId {
                ProgressView().tint(Theme.Colors.textOnLight)
            } else {
                Text(price(for: offer))
                    .font(.system(size: fontSize, weight: .semibold))
                    .monospacedDigit()
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
            }
        }
        .foregroundStyle(Theme.Colors.textOnLight)
        .padding(.horizontal, Theme.Spacing.md)
        .frame(maxWidth: height < 40 ? .infinity : nil, minHeight: height)
        .background(Theme.Colors.light, in: Capsule())
    }

    /// A paper tag in the tile's top-left corner: POPULAR, BEST VALUE, FIRST PURCHASE.
    private func cornerTag(_ word: String, radius: CGFloat) -> some View {
        Text(word.uppercased())
            .font(.system(size: 11, weight: .bold))
            .kerning(0.4)
            .foregroundStyle(Theme.Colors.textOnLight)
            .lineLimit(1)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(Theme.Colors.light, in: UnevenRoundedRectangle(
                topLeadingRadius: radius, bottomLeadingRadius: 0, bottomTrailingRadius: 8, topTrailingRadius: 0, style: .continuous))
    }

    private func offerLabel(_ offer: StoreOffer) -> String {
        t("wallet.offer_a11y", [
            "credits": Format.credits(offer.credits, locale: store.locale),
            "bonus": offer.bonusCredits > 0 ? Format.credits(offer.bonusCredits, locale: store.locale) : "none",
            // The dollar amount is deliberately untouched (UI_AUDIT §2.2); only `about` is keyed.
            "price": storePrices[offer.productId] ?? t("wallet.about_price", ["price": referencePrice(offer)]),
        ])
    }

    /// One tap on a pack starts Apple's purchase sheet, which is the
    /// confirmation. The selection event is kept for the funnel.
    private func buy(_ offer: StoreOffer) {
        guard busy == nil else { return }
        Haptic.play(.light)
        selected = offer.productId
        Telemetry.track(.offerSelected, [
            "productId": offer.productId,
            "tier": offer.tier?.rawValue ?? "UNKNOWN",
            "turnsOffered": (offer.credits + offer.bonusCredits) / max(1, turnCost),
            "balance": store.balance,
            "firstPurchase": wallet?.firstPurchaseBonusAvailable ?? false,
            "trigger": shortfall == nil ? "organic" : "wall",
        ])
        Task { await purchase(offer) }
    }

    /// Earn credits: the daily grant, badges that pay, the Pass, the Tower.
    private var earn: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(t("tower.wallet_title"))
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
                .padding(.bottom, Theme.Spacing.md)

            daily

            if !quests.isEmpty {
                Text(t("profile.badges"))
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .padding(.top, 22)
                ForEach(quests) { badge in questRow(badge) }
            }

            if let pass = wallet?.pass {
                earnRow(
                    icon: AnyView(Image("PackFew").resizable().scaledToFit().frame(width: 40, height: 40)),
                    title: t("pass.title"),
                    subtitle: pass.active ? t("pass.active") : t("pass.price_week", ["price": passPrice ?? String(format: "$%.2f", pass.referencePriceUsd)])
                ) { router.present(.pass) }
                .padding(.top, Theme.Spacing.sm)
            }

            // The Tower's daily climb. Hidden while it is off.
            TowerCard(source: "wallet", inset: EdgeInsets(top: Theme.Spacing.sm, leading: 0, bottom: 0, trailing: 0))
        }
        .padding(.top, 32)
    }

    /// The daily grant as a row: a crystal slot, what it is, and a claim pill.
    private var daily: some View {
        let ready = wallet?.dailyClaimAvailable == true || passBonusWaiting
        return Button {
            guard ready else { return }
            Haptic.play(.light)
            Task { await claimDaily() }
        } label: {
            HStack(spacing: Theme.Spacing.md) {
                rewardSlot(300)
                VStack(alignment: .leading, spacing: 2) {
                    Text(t("wallet.daily_credits"))
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Group {
                        if ready {
                            Text(busy == "daily" ? t("wallet.claiming") : dailyLabel)
                        } else if let next = wallet?.nextDailyClaimAt {
                            Text(t("wallet.next_daily", ["when": relativeTime(next)]))
                        } else {
                            Text(t("wallet.daily_body"))
                        }
                    }
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
                }
                Spacer(minLength: Theme.Spacing.sm)
                if ready {
                    ZStack {
                        if busy == "daily" {
                            ProgressView().tint(Theme.Colors.textOnLight)
                        } else {
                            Text(verbatim: "+" + Format.credits(300 + (passBonusWaiting ? (wallet?.pass?.dailyCredits ?? 0) : 0), locale: store.locale))
                                .font(.system(size: 15, weight: .semibold))
                                .monospacedDigit()
                        }
                    }
                    .foregroundStyle(Theme.Colors.textOnLight)
                    .padding(.horizontal, 14)
                    .frame(minHeight: 36)
                    .background(Theme.Colors.light, in: Capsule())
                }
            }
            .padding(Theme.Spacing.md)
            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .disabled(busy != nil || !ready)
    }

    private func rewardSlot(_ credits: Int) -> some View {
        VStack(spacing: 2) {
            CreditGlyph(size: 30)
            Text(verbatim: "+" + Format.credits(credits, compact: true, locale: store.locale))
                .font(.system(size: 11, weight: .bold))
                .monospacedDigit()
                .foregroundStyle(Theme.Colors.textPrimary)
        }
        .frame(width: 54, height: 62)
        .background(Theme.Colors.borderSubtle, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    /// A badge that pays credits, with its progress. Tapping opens Badges,
    /// where it is collected.
    private func questRow(_ badge: BadgeView) -> some View {
        let ready = badge.unlockedAt != nil
        return Button {
            Haptic.play(.light)
            router.present(.badges)
        } label: {
            HStack(spacing: Theme.Spacing.md) {
                rewardSlot(badge.creditReward)
                VStack(alignment: .leading, spacing: 2) {
                    Text(badge.title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                    Text(badge.description)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .lineLimit(2)
                    ProgressBar(fraction: Double(min(badge.progress, badge.target)) / Double(max(1, badge.target)))
                        .frame(height: 4)
                        .padding(.top, 6)
                }
                Spacer(minLength: Theme.Spacing.sm)
                Text(ready ? t("badges.ready") : t("badges.progress", ["done": min(badge.progress, badge.target), "target": badge.target]))
                    .font(.system(size: 13, weight: ready ? .semibold : .regular))
                    .foregroundStyle(ready ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
                    .multilineTextAlignment(.trailing)
                    .frame(maxWidth: 80, alignment: .trailing)
            }
            .padding(.vertical, Theme.Spacing.md)
            .overlay(alignment: .bottom) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
    }

    private func earnRow(icon: AnyView, title: String, subtitle: String, action: @escaping () -> Void) -> some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            HStack(spacing: Theme.Spacing.md) {
                icon.frame(width: 48, height: 48)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Text(subtitle)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                }
                Spacer(minLength: Theme.Spacing.sm)
                ChevronGlyph()
            }
            .padding(Theme.Spacing.md)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
    }

    /// Restore (spec §20.6, required) and what the store confirms, as quiet text.
    private var footer: some View {
        VStack(spacing: Theme.Spacing.sm) {
            HStack(spacing: Theme.Spacing.sm) {
                Button {
                    Task { await restore() }
                } label: {
                    Text(busy == "restore" ? t("wallet.restore_loading") : t("wallet.restore"))
                        .font(.system(size: 13, weight: .medium))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .frame(minHeight: Theme.minTouchTarget - 12)
                }
                .buttonStyle(PressOpacityStyle())
                .disabled(busy != nil)
                Text(verbatim: "·").foregroundStyle(Theme.Colors.borderStrong)
                Text(t("wallet.no_expiry"))
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
            }
            Group {
                if let storeUnavailable {
                    Text(storeUnavailable)
                } else if storePrices.isEmpty {
                    Text(t("wallet.reference_prices_note"))
                } else {
                    Text(t("wallet.price_confirmed_note"))
                }
            }
            .font(.system(size: 11))
            .foregroundStyle(Theme.Colors.textMuted)
            .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 28)
    }

    /// A Pass holder whose 400 for today has not landed yet.
    private var passBonusWaiting: Bool {
        guard let pass = wallet?.pass else { return false }
        return pass.active && !pass.bonusClaimedToday
    }

    /// What the claim row says: the free 300, the Pass 400, or both.
    private var dailyLabel: String {
        guard passBonusWaiting, let pass = wallet?.pass else { return t("wallet.claim_daily") }
        let bonus = Format.credits(pass.dailyCredits, locale: store.locale)
        if wallet?.dailyClaimAvailable == true {
            return t("pass.claim_both", ["free": Format.credits(300, locale: store.locale), "bonus": bonus])
        }
        return t("pass.claim_bonus", ["bonus": bonus])
    }

    /// The offers this device can actually buy.
    ///
    /// The server decides what is on sale, but StoreKit decides what exists. A
    /// pack the server lists and the store has never heard of renders with our
    /// reference price, takes a tap, and fails at payment. Only filtered once
    /// the store has answered with something; if StoreKit is unreachable the
    /// whole ladder shows with reference prices, so an offline player still
    /// sees what is for sale.
    private var buyableOffers: [StoreOffer] {
        guard !storePrices.isEmpty else { return offers }
        return offers.filter { storePrices[$0.productId] != nil }
    }

    /// The daily grant: when the next one comes, and what it is.
    private var dailyTab: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            if wallet?.dailyClaimAvailable == true {
                Txt(t("wallet.daily_ready_body"), .bodyCompact, color: Theme.Colors.textSecondary)
            } else if let next = wallet?.nextDailyClaimAt {
                Txt(t("wallet.next_daily", ["when": relativeTime(next)]), .bodyStrong)
                Txt(t("wallet.daily_body"), .bodyCompact, color: Theme.Colors.textSecondary)
            } else {
                Txt(t("wallet.daily_sign_in"), .bodyCompact, color: Theme.Colors.textSecondary)
                if store.isGuest {
                    PBButton(t("profile.sign_in"), variant: .light) { router.present(.signIn) }
                        .padding(.top, Theme.Spacing.sm)
                }
            }
        }
        .padding(.top, 18)
    }

    private var history: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("wallet.history"), .h3)
                .padding(.top, 26)
            if ledger.isEmpty, !ledgerLoading {
                Txt(t("wallet.history_empty"), .bodyCompact, color: Theme.Colors.textMuted)
            }
            ForEach(ledger) { entry in
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 0) {
                        Txt(ledgerLabel(entry.type), .bodyCompact)
                        Txt(dateTime(entry.createdAt), .micro, color: Theme.Colors.textMuted)
                    }
                    Spacer(minLength: Theme.Spacing.md)
                    Text("\(entry.amount > 0 ? "+" : "")\(Format.number(entry.amount, locale: store.locale))")
                        .font(.system(size: 15, weight: .medium, design: .monospaced))
                        .foregroundStyle(entry.amount >= 0 ? Theme.Colors.success : Theme.Colors.textSecondary)
                }
                .padding(.vertical, Theme.Spacing.sm)
                .overlay(alignment: .bottom) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }
                .onAppear {
                    // Cursor pagination: the last row in view asks for the next page.
                    if entry.id == ledger.last?.id, ledgerCursor != nil {
                        Task { await loadLedger(reset: false) }
                    }
                }
            }
            if ledgerLoading {
                ProgressView().tint(Theme.Colors.textMuted).frame(maxWidth: .infinity)
            }
        }
    }

    private var howItWorks: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("wallet.how_it_works_richer"), .bodyCompact, color: Theme.Colors.textSecondary)
            Txt(t("wallet.how_it_works_fair"), .bodyCompact, color: Theme.Colors.textSecondary)
            Txt(t("wallet.how_it_works_refund"), .bodyCompact, color: Theme.Colors.textSecondary)
        }
        .padding(.top, 18)
    }

    // MARK: Loading

    private func load() async {
        do {
            let response = try await store.api.wallet()
            wallet = response.wallet
            offers = response.offers

            // Apple is the only correct source of a price: localised, moves
            // with tiers, and is what the sheet will actually charge.
            let products = await store.purchases.products(for: response.offers.map(\.productId))
            var prices: [String: String] = [:]
            for product in products { prices[product.productId] = product.displayPrice }
            storePrices = prices
            storeUnavailable = store.purchases.available ? nil : t("store.purchases_unavailable")
            if let pass = response.wallet.pass {
                passPrice = await store.purchases.products(for: [pass.productId]).first?.displayPrice
            }

            // The header pill reads from the shared store. Opening the wallet
            // is exactly the moment the two must not disagree.
            store.setBalance(response.wallet.balance)
        } catch {
            setNotice(error.playerMessage)
        }
    }

    /// Badges that pay credits and are not collected: ready ones first, then
    /// the closest to done. Three at most.
    private func loadQuests() async {
        guard let response = try? await store.api.badges() else { return }
        quests = Array(response.badges
            .filter { $0.creditReward > 0 && $0.claimedAt == nil && !$0.secret }
            .sorted { a, b in
                if (a.unlockedAt != nil) != (b.unlockedAt != nil) { return a.unlockedAt != nil }
                return Double(a.progress) / Double(max(1, a.target)) > Double(b.progress) / Double(max(1, b.target))
            }
            .prefix(3))
    }

    private func loadLedger(reset: Bool) async {
        guard !ledgerLoading else { return }
        ledgerLoading = true
        defer { ledgerLoading = false }
        do {
            let response = try await store.api.ledger(cursor: reset ? nil : ledgerCursor)
            ledger = reset ? response.entries : ledger + response.entries
            ledgerCursor = response.nextCursor
        } catch {
            // The history is a convenience; a failed page leaves what is shown.
        }
    }

    // MARK: Actions

    /// WL-02 — buying a pack. Nothing reports success until the server has
    /// confirmed it, and a transaction the store took is never discarded.
    private func purchase(_ offer: StoreOffer) async {
        busy = offer.productId
        setNotice(nil)

        // §37.3 — before StoreKit takes over. `purchase_completed` is the
        // server's, emitted only once the store has been verified; this one is
        // the denominator, and counts the sheet being opened at all. The gap
        // between them is how many players change their mind at Apple's prompt.
        Telemetry.track(.purchaseStarted, [
            "productId": offer.productId,
            "firstPurchase": wallet?.firstPurchaseBonusAvailable ?? false,
            "balance": store.balance,
            "trigger": shortfall == nil ? "organic" : "wall",
        ])

        let outcome = await store.purchases.buy(offer.productId)

        switch outcome {
        case .credited(let credits, _):
            await load()
            await store.refreshWallet()
            Haptic.play(.success)
            setNotice(t("wallet.credits_added", ["count": credits, "credits": Format.credits(credits, locale: store.locale)]))
            // Last, and only here: the balance behind the burst is already the
            // new one, and the notice has already been announced to VoiceOver.
            withAnimation(.easeOut(duration: Theme.Durations.instant)) { celebrating = credits }
        case .alreadyCredited:
            await load()
            await store.refreshWallet()
            Haptic.play(.success)
            setNotice(t("wallet.already_credited"))
        case .cancelled:
            // Someone who changed their mind has not hit a problem. Say nothing.
            setNotice(nil)
        case .pending:
            setNotice(t("wallet.purchase_pending"))
        case .unavailable(let message):
            Haptic.play(.error)
            setNotice(message)
        case .failed(let message, let charged):
            Haptic.play(.error)
            // Spec §3.8 — never tell a player they were not charged unless we
            // know it. If the store took the money and we could not confirm it, say so.
            setNotice(charged ? t("wallet.purchase_failed_charged", ["message": message]) : message)
        }

        busy = nil
    }

    /// Spec §20.6 — `Restore purchases`. Credits are consumable, so this is the
    /// fix for the one bad case: the store charged and reconciliation did not finish.
    private func restore() async {
        busy = "restore"
        setNotice(nil)
        defer { busy = nil }

        let result = await store.purchases.restore()
        await load()
        await store.refreshWallet()
        if result.restored > 0 {
            Haptic.play(.success)
            setNotice(t("wallet.credits_restored", [
                "count": result.creditsRestored,
                "credits": Format.credits(result.creditsRestored, locale: store.locale),
            ]))
        } else if result.verified > 0 {
            setNotice(t("wallet.restore_all_present"))
        } else if store.purchases.available {
            setNotice(t("wallet.restore_none"))
        } else {
            Haptic.play(.error)
            setNotice(t("wallet.restore_unreachable"))
        }
    }

    private func claimDaily() async {
        busy = "daily"
        defer { busy = nil }
        do {
            let result = try await store.api.claimDaily()
            await load()
            await store.refreshWallet()
            let total = (result.granted ? result.amount : 0) + result.passAmount
            if result.granted || result.passAmount > 0 {
                Haptic.play(.success)
                setNotice(t("wallet.credits_claimed", ["count": total]))
            }
        } catch {
            setNotice(t("wallet.daily_sign_in"))
        }
    }

    /// Announced, not just shown: a VoiceOver player gets the result of a
    /// purchase or a restore without hunting for it.
    private func setNotice(_ text: String?) {
        notice = text
        if let text {
            AccessibilityNotification.Announcement(text).post()
        }
    }

    // MARK: Copy helpers

    /// `STORE_OFFERS` carries the badge as an English literal; the catalogue
    /// decides how to say it. A badge nobody has keyed yet falls back to what
    /// the offer sent.
    /// Turn counts are quoted at Vivid, the default quality, so the same pack
    /// does not read as a different size every time the player moves the pill.
    private var turnCost: Int {
        max(1, TierCopy.info(.VIVID, bootstrap: store.bootstrap).costCredits)
    }

    /// The rung's label, chosen from the enum so it can be translated. Falls
    /// back to the server's English string for a payload that predates `tier`.
    private func rungWord(_ offer: StoreOffer) -> String? {
        if offer.tier == .FLASH { return t("wallet.badge_flash") }
        // `firstPurchaseOnly` and nothing else. Keying this off `bonusCredits`
        // stamped FIRST PURCHASE on all five standing packs, because every one
        // of them carries a small bonus of its own.
        if offer.firstPurchaseOnly { return t("wallet.badge_first_purchase") }
        switch offer.tier {
        case .POPULAR: return t("wallet.badge_popular")
        case .BEST_VALUE: return t("wallet.badge_best_value")
        case .STARTER, .FLASH, .UNKNOWN, .none: return offer.badge.map(badgeWord)
        }
    }

    private func badgeWord(_ badge: String) -> String {
        switch badge {
        case "Popular": return t("wallet.badge_popular")  // i18n-exempt: the offer's value, matched to pick its key
        case "Best value": return t("wallet.badge_best_value")  // i18n-exempt: as above
        case "First purchase": return t("wallet.badge_first_purchase")  // i18n-exempt: as above
        default: return badge
        }
    }

    private func referencePrice(_ offer: StoreOffer) -> String {
        String(format: "$%.2f", offer.referencePriceUsd)
    }

    /// The store's own localised price once it has answered; the US reference until then.
    private func price(for offer: StoreOffer) -> String {
        storePrices[offer.productId] ?? referencePrice(offer)
    }

    /// The ledger's entry types, as a player reads them. The enum values are
    /// identifiers, not copy; an unknown type still shows the raw one.
    private func ledgerLabel(_ type: LedgerEntryType) -> String {
        switch type {
        case .PURCHASE: return t("wallet.credit_pack")
        case .BONUS: return t("wallet.pack_bonus")
        case .DAILY_GRANT: return t("wallet.daily_credits")
        case .NEW_USER_GRANT: return t("wallet.welcome_credits")
        case .TURN_RESERVE: return t("wallet.turn")
        case .TURN_FINALIZE: return t("wallet.turn_settled")
        case .TURN_RELEASE: return t("wallet.turn_refunded")
        case .FORK_FEE: return t("wallet.timeline_fork")
        case .REFUND: return t("wallet.refund")
        case .ADMIN_ADJUST: return t("wallet.adjustment")
        case .SUBSCRIPTION_GRANT: return t("pass.title")
        case .TOWER_ENTRY: return t("tower.ledger_entry")
        case .TOWER_REWARD: return t("tower.ledger_reward")
        default: return type.rawValue
        }
    }

    /// A countdown, in the coarsest unit that still says something. The
    /// numbers go through ICU `count` so French can pluralise them.
    private func relativeTime(_ iso: String) -> String {
        guard let date = Format.parseISO(iso) else { return t("wallet.time_now") }
        let diff = date.timeIntervalSinceNow
        if diff <= 0 { return t("wallet.time_now") }
        let hours = Int(diff / 3600)
        if hours < 1 { return t("wallet.time_in_minutes", ["count": max(1, Int(diff / 60))]) }
        if hours < 24 { return t("wallet.time_in_hours", ["count": hours]) }
        return t("wallet.time_in_days", ["count": hours / 24])
    }

    /// Date and time together, as `toLocaleString` gives the RN screen.
    private func dateTime(_ iso: String) -> String {
        guard let date = Format.parseISO(iso) else { return iso }
        let formatter = DateFormatter()
        formatter.locale = store.locale.foundation
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return Typography.foldNarrowSpaces(formatter.string(from: date))
    }
}
