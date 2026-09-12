import SwiftUI

// MARK: - Wallet (WL-01 / WL-02 / WL-03)
//
// Twin of `apps/mobile/src/screens/Wallet.tsx`. Spec §20.6 — balance large at
// top, packs, restore, history, and an honest explanation of how credits work.
// Spec §3.8: never fake scarcity or prices.

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

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Txt(t("wallet.title"), .h2)
                    Spacer(minLength: 0)
                    IconButton(t("wallet.close"), glyph: "✕") { router.dismissSheet() }
                }
                .padding(.horizontal, Theme.gutter)

                // Pinned, not inline. Restore sits at the very bottom of a page
                // taller than the screen, so a notice in the scroll flow is a
                // confirmation the player never sees.
                if let notice {
                    Card {
                        Txt(notice, .bodyCompact)
                    }
                    .padding(.horizontal, Theme.gutter)
                    .padding(.top, Theme.Spacing.md)
                    .accessibilityAddTraits(.updatesFrequently)
                }

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                        shortfallBanner
                        balance
                        daily
                        packs
                        PBDivider()
                        history
                        PBDivider()
                        howItWorks
                    }
                    .padding(Theme.gutter)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
        .task {
            // One billing connection for the app; it outlives this screen so a
            // transaction StoreKit redelivers from a previous launch still lands.
            store.purchases.connect()
            store.purchases.translator = t
            await load()
        }
    }

    // MARK: Sections

    /// WL-03 — the exact shortfall, never a vague "not enough".
    @ViewBuilder
    private var shortfallBanner: some View {
        if let shortfall, shortfall > 0 {
            Card {
                VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                    Txt(t("wallet.shortfall", ["count": shortfall]), .bodyStrong, color: Theme.Colors.warning)
                    Txt(t("wallet.shortfall_hint"), .caption, color: Theme.Colors.textSecondary)
                }
            }
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.warning, lineWidth: 1)
            }
        }
    }

    @ViewBuilder
    private var balance: some View {
        if let wallet {
            VStack(spacing: Theme.Spacing.xs) {
                Txt(t("wallet.balance_label"), .micro, color: Theme.Colors.textMuted)
                // Spec §26.10 — the wallet always shows the full number.
                HStack(alignment: .firstTextBaseline, spacing: Theme.Spacing.sm) {
                    Txt(Format.credits(wallet.balance, locale: store.locale), .display)
                    Txt(t("wallet.credits_unit"), .body, color: Theme.Colors.textMuted)
                }
                if wallet.reserved > 0 {
                    Txt(t("wallet.reserved_held", ["count": wallet.reserved]), .caption, color: Theme.Colors.textMuted)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, Theme.Spacing.lg)
        } else {
            Skeleton(height: 100)
        }
    }

    @ViewBuilder
    private var daily: some View {
        if wallet?.dailyClaimAvailable == true {
            PBButton(t("wallet.claim_daily"), loadingLabel: t("wallet.claiming"), variant: .secondary, loading: busy == "daily") {
                Task { await claimDaily() }
            }
        } else if let next = wallet?.nextDailyClaimAt {
            Txt(t("wallet.next_daily", ["when": relativeTime(next)]), .caption, color: Theme.Colors.textMuted, center: true)
        }
    }

    private var packs: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("wallet.packs_title"), .h3)

            ForEach(offers) { offer in
                OfferCard(
                    offer: offer,
                    price: price(for: offer),
                    badge: offer.badge.map(badgeWord),
                    ends: offer.expiresAt.map { t("wallet.ends", ["when": relativeTime($0)]) },
                    selected: selected == offer.productId,
                    dimmed: busy != nil && busy != offer.productId,
                    locale: store.locale
                ) {
                    selected = offer.productId
                }
                .disabled(busy != nil)
                .accessibilityLabel(t("wallet.offer_a11y", [
                    "credits": Format.credits(offer.credits, locale: store.locale),
                    "bonus": offer.bonusCredits > 0 ? Format.credits(offer.bonusCredits, locale: store.locale) : "none",
                    // The dollar amount is deliberately untouched (UI_AUDIT §2.2); only `about` is keyed.
                    "price": storePrices[offer.productId] ?? t("wallet.about_price", ["price": referencePrice(offer)]),
                ]))
            }

            // One button, for the pack that is selected.
            PBButton(
                t("wallet.buy_now"),
                loadingLabel: t("wallet.claiming"),
                loading: busy != nil && busy != "daily",
                disabled: selected == nil || busy != nil
            ) {
                if let offer = offers.first(where: { $0.productId == selected }) {
                    Task { await purchase(offer) }
                }
            }

            if let storeUnavailable {
                Txt(storeUnavailable, .micro, color: Theme.Colors.warning)
            } else if storePrices.isEmpty {
                Txt(t("wallet.reference_prices_note"), .micro, color: Theme.Colors.textMuted)
            } else {
                Txt(t("wallet.price_confirmed_note"), .micro, color: Theme.Colors.textMuted)
            }

            // Spec §20.6 — required, and the only way back from a charge whose
            // reconciliation did not land.
            PBButton(
                t("wallet.restore"),
                loadingLabel: t("wallet.restore_loading"),
                variant: .tertiary,
                loading: busy == "restore",
                disabled: busy != nil && busy != "restore"
            ) {
                Task { await restore() }
            }
        }
    }

    private var history: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Button {
                showHistory.toggle()
                if showHistory, ledger.isEmpty {
                    Task { await loadLedger(reset: true) }
                }
            } label: {
                HStack {
                    Txt(t("wallet.history"), .h3)
                    Spacer(minLength: 0)
                    Txt(showHistory ? "−" : "+", .body, color: Theme.Colors.textMuted)
                }
                .contentShape(Rectangle())
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityAddTraits(.isButton)

            if showHistory {
                ForEach(ledger) { entry in
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 0) {
                            Txt(ledgerLabel(entry.type), .bodyCompact)
                            Txt(dateTime(entry.createdAt), .micro, color: Theme.Colors.textMuted)
                        }
                        Spacer(minLength: Theme.Spacing.md)
                        Txt(
                            "\(entry.amount > 0 ? "+" : "")\(entry.amount)",
                            .bodyCompact,
                            color: entry.amount >= 0 ? Theme.Colors.success : Theme.Colors.textSecondary
                        )
                    }
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
    }

    private var howItWorks: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            Txt(t("wallet.how_it_works"), .h3)
            Txt(t("wallet.how_it_works_richer"), .bodyCompact, color: Theme.Colors.textSecondary)
            Txt(t("wallet.how_it_works_fair"), .bodyCompact, color: Theme.Colors.textSecondary)
            Txt(t("wallet.how_it_works_refund"), .bodyCompact, color: Theme.Colors.textSecondary)
        }
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

            // The header pill reads from the shared store. Opening the wallet
            // is exactly the moment the two must not disagree.
            store.setBalance(response.wallet.balance)
        } catch {
            setNotice(error.playerMessage)
        }
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

        let outcome = await store.purchases.buy(offer.productId)

        switch outcome {
        case .credited(let credits, _):
            await load()
            await store.refreshWallet()
            Haptic.play(.success)
            setNotice(t("wallet.credits_added", ["count": credits, "credits": Format.credits(credits, locale: store.locale)]))
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
            if result.granted {
                Haptic.play(.success)
                setNotice(t("wallet.credits_claimed", ["count": result.amount]))
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
    private func badgeWord(_ badge: String) -> String {
        switch badge {
        case "Popular": return t("wallet.badge_popular")
        case "Best value": return t("wallet.badge_best_value")
        case "First purchase": return t("wallet.badge_first_purchase")
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

// MARK: - Offer card

/// One credit pack. Selecting is its own gesture; spending is the button below.
private struct OfferCard: View {
    let offer: StoreOffer
    let price: String
    let badge: String?
    let ends: String?
    let selected: Bool
    let dimmed: Bool
    let locale: AppLocale
    let action: () -> Void

    @Environment(\.translator) private var t

    private var borderColor: Color {
        selected || offer.firstPurchaseOnly ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle
    }

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            Card {
                HStack(alignment: .top) {
                    HStack(alignment: .top, spacing: Theme.Spacing.md) {
                        RadioDot(selected: selected)
                        VStack(alignment: .leading, spacing: 2) {
                            HStack(spacing: Theme.Spacing.sm) {
                                Txt(Format.credits(offer.credits, locale: locale), .bodyStrong)
                                if offer.bonusCredits > 0 {
                                    Txt(t("wallet.bonus_badge", ["bonus": Format.credits(offer.bonusCredits, locale: locale)]),
                                        .caption, color: Theme.Colors.success)
                                }
                            }
                            if let badge {
                                Chip(badge, tone: .accent)
                            }
                            if let ends {
                                Txt(ends, .micro, color: Theme.Colors.warning)
                            }
                        }
                    }
                    Spacer(minLength: Theme.Spacing.md)
                    // The store's own localised price once it has answered.
                    Txt(price, .bodyStrong, color: Theme.Colors.accentPrimary)
                }
            }
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(borderColor, lineWidth: selected ? 2 : 1)
            }
            .opacity(dimmed ? 0.5 : 1)
        }
        .buttonStyle(PressOpacityStyle(pressed: 0.8))
        .accessibilityAddTraits(selected ? [.isButton, .isSelected] : .isButton)
    }
}

/// The selection dot on a credit pack. Two circles, matching the ring in
/// Discover's search icon rather than introducing an icon set for one glyph.
private struct RadioDot: View {
    let selected: Bool

    var body: some View {
        ZStack {
            Circle()
                .strokeBorder(selected ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: 2)
                .frame(width: 22, height: 22)
            if selected {
                Circle().fill(Theme.Colors.accentPrimary).frame(width: 10, height: 10)
            }
        }
        .padding(.top, 2)
        .accessibilityHidden(true)
    }
}
