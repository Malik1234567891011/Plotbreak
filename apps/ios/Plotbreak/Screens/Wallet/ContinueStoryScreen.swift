import SwiftUI

// MARK: - ContinueStoryScreen
//
// The credit wall, as the moment it actually is.
//
// A player who reaches this has just tried to do something and been stopped.
// That is the highest-intent instant in the whole product, and until now it
// opened a generic currency store: a balance, five packs of numbers, a history
// tab. 41 of the 47 players who reached ten turns opened that store and one of
// them bought anything.
//
// The thing being sold is not credits. It is the next beat of a story somebody
// is in the middle of. So this screen leads with the story, prices the offer in
// turns rather than in an abstract currency, and puts one button under it. The
// free routes — tomorrow's grant, and badge credits already earned and not
// collected — are stated plainly rather than buried, because hiding them would
// make the purchase feel like a hostage payment and §3.8 forbids it anyway.

struct ContinueStoryScreen: View {
    let sessionId: String
    let storyId: String
    let storyTitle: String
    let shortfall: Int
    let turnsPlayed: Int

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var wallet: WalletSummary?
    @State private var offers: [StoreOffer] = []
    @State private var storePrices: [String: String] = [:]
    @State private var storeUnavailable: String?
    @State private var busy: String?
    @State private var notice: String?
    @State private var claimableBadgeCredits = 0
    @State private var celebrating: Int?
    /// For `paywall_dismissed`: did they engage at all before leaving?
    @State private var everSelected = false
    @State private var reachedCheckout = false
    @State private var purchased = false

    /// The one offer this screen leads with.
    ///
    /// The first purchase if they have never bought — the cheapest possible way
    /// back into the story, and the threshold worth crossing. Otherwise the
    /// flash deal while its window is open. Failing both, the smallest standing
    /// pack, because the question at a wall is "what is the least I can do to
    /// keep going".
    private var headline: StoreOffer? {
        offers.first { $0.firstPurchaseOnly }
            ?? offers.first { $0.tier == .FLASH }
            ?? offers.min { $0.referencePriceUsd < $1.referencePriceUsd }
    }

    /// Seconds left on the window, for the countdown line.
    private var flashDeadline: Date? {
        offers.first { $0.tier == .FLASH }?.expiresAt.flatMap(Format.parseISO)
    }

    /// Turn counts are always quoted at Vivid, the default quality.
    ///
    /// They used to follow whichever pill the player had selected, so the same
    /// pack read 23 turns on Vivid and 7 on Apex and the number moved under
    /// them. One stable figure is easier to trust and easier to remember; the
    /// copy says which quality it assumes, and a player on Quick simply gets
    /// more than promised, which is the right direction to be wrong in.
    private var turnCost: Int {
        max(1, TierCopy.info(.VIVID, bootstrap: store.bootstrap).costCredits)
    }

    private func turns(_ offer: StoreOffer) -> Int {
        (offer.credits + offer.bonusCredits) / turnCost
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("continue.title"), backLabel: t("wallet.close"),
                             onBack: { dismiss(bought: false) })
                .padding(.bottom, Theme.Spacing.xs)

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        storyLine
                        if let headline {
                            offerCard(headline)
                        } else if offers.isEmpty {
                            Skeleton(height: 148, radius: Theme.Radius.card)
                        }
                        freeRoutes
                        otherPacks
                        if let storeUnavailable {
                            Txt(storeUnavailable, .micro, color: Theme.Colors.warning)
                        }
                        if let notice {
                            Txt(notice, .bodyCompact)
                                .accessibilityAddTraits(.updatesFrequently)
                        }
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.md)
                    .padding(.bottom, Theme.Spacing.xxl)
                }
            }
        }
        .overlay {
            if let celebrating {
                CreditCelebration(credits: celebrating, locale: store.locale) {
                    self.celebrating = nil
                    // The credits have landed and the burst has been seen. Send
                    // them back to the sentence they were trying to finish.
                    router.dismissSheet()
                }
                .transition(.opacity)
            }
        }
        .task {
            store.purchases.connect()
            store.purchases.translator = t
            await load()
        }
    }

    // MARK: Pieces

    /// What is waiting, named. "Your story" is an abstraction; the title is not.
    private var storyLine: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
            Txt(t("continue.heading"), .display)
            Txt(t("continue.subheading", ["title": storyTitle]), .bodyCompact, color: Theme.Colors.textSecondary)
        }
    }

    private func offerCard(_ offer: StoreOffer) -> some View {
        let doubled = offer.firstPurchaseOnly
        let flash = offer.tier == .FLASH
        return Card {
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                if flash {
                    Chip(t("wallet.badge_flash"), tone: .accent)
                } else if doubled {
                    Chip(t("wallet.badge_first_purchase"), tone: .accent)
                }
                // The deadline, spelled out. It is a real row in the ledger and
                // it really does lapse, so saying so is a fact rather than the
                // manufactured urgency §3.8 rules out.
                if flash, let deadline = flashDeadline {
                    Txt(t("continue.flash_ends", ["when": countdown(to: deadline)]),
                        .caption, color: Theme.Colors.warning)
                }
                // Turns first, and large. This is the number the player can
                // actually reason about; the credits are the receipt.
                Txt(t("continue.turns_headline", ["count": turns(offer)]), .h1)
                // Which quality that count is at. The same pack is 23 turns on
                // Vivid and 7 on Apex, so an unlabelled number is a promise we
                // would break the moment the player moved the pill.
                Txt(t("continue.credits_detail", [
                    "credits": Format.credits(offer.credits + offer.bonusCredits, locale: store.locale),
                    "tier": t(TierCopy.labelKey(.VIVID)),
                ]), .caption, color: Theme.Colors.textMuted)

                PBButton(
                    t("continue.cta", ["price": price(for: offer)]),
                    loadingLabel: t("continue.working"),
                    variant: .light,
                    loading: busy == offer.productId,
                    disabled: busy != nil
                ) {
                    Task { await buy(offer) }
                }
            }
        }
    }

    /// Never hidden, and never framed as a lesser option — somebody who would
    /// rather wait a day should be able to see that they can.
    private var freeRoutes: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            if wallet?.dailyClaimAvailable == true {
                Button {
                    Task { await claimDaily() }
                } label: {
                    freeRow(icon: "gift", text: t("continue.claim_daily"), emphasised: true)
                }
                .buttonStyle(PressOpacityStyle())
                .disabled(busy != nil)
            } else if let next = wallet?.nextDailyClaimAt {
                freeRow(icon: "clock", text: t("continue.free_tomorrow", ["when": relativeTime(next)]))
            }

            if claimableBadgeCredits > 0 {
                Button {
                    router.dismissSheet()
                    router.present(.badges)
                } label: {
                    freeRow(
                        icon: "rosette",
                        text: t("continue.badge_credits", [
                            "credits": Format.credits(claimableBadgeCredits, locale: store.locale),
                        ]),
                        emphasised: true
                    )
                }
                .buttonStyle(PressOpacityStyle())
            }
        }
    }

    private func freeRow(icon: String, text: String, emphasised: Bool = false) -> some View {
        HStack(spacing: Theme.Spacing.sm) {
            Image(systemName: icon)
                .font(.system(size: 15))
                .foregroundStyle(emphasised ? Theme.Colors.accentPrimary : Theme.Colors.textMuted)
            Txt(text, .bodyCompact, color: emphasised ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
            Spacer(minLength: 0)
        }
        .frame(minHeight: Theme.minTouchTarget)
    }

    private var otherPacks: some View {
        Button {
            dismiss(bought: false)
            router.present(.wallet(shortfall: shortfall))
        } label: {
            Txt(t("continue.see_all_packs"), .bodyCompact, color: Theme.Colors.accentPrimary)
                .frame(maxWidth: .infinity, minHeight: Theme.minTouchTarget, alignment: .center)
        }
        .buttonStyle(PressOpacityStyle())
    }

    // MARK: Work

    private func load() async {
        do {
            // POST, not GET: this is what tells the server somebody actually
            // ran out, which is the only thing that opens the limited window.
            let response = try await store.api.creditWall()
            wallet = response.wallet
            offers = response.offers
            store.setBalance(response.wallet.balance)

            let products = await store.purchases.products(for: response.offers.map(\.productId))
            var prices: [String: String] = [:]
            for product in products { prices[product.productId] = product.displayPrice }
            storePrices = prices
            storeUnavailable = store.purchases.available ? nil : t("store.purchases_unavailable")

            // Credits the player has already earned and not collected. Free
            // money we are sitting on while asking them for theirs.
            if let badges = try? await store.api.badges() {
                claimableBadgeCredits = badges.badges
                    .filter { $0.unlockedAt != nil && $0.claimedAt == nil }
                    .reduce(0) { $0 + $1.creditReward }
            }

            // §37.3 — what was actually put in front of them, once it is known.
            if let headline {
                Telemetry.track(.paywallShown, sessionId: sessionId, [
                    "trigger": "wall",
                    "storyId": storyId,
                    "sessionId": sessionId,
                    "balance": response.wallet.balance,
                    "shortfall": shortfall,
                    "turnsPlayed": turnsPlayed,
                    "wallCount": store.wallCount,
                    "firstPurchaseBonus": response.wallet.firstPurchaseBonusAvailable,
                    "offerShown": headline.productId,
                    "turnsOffered": turns(headline),
                ])
            }
        } catch {
            notice = error.playerMessage
        }
    }

    private func buy(_ offer: StoreOffer) async {
        busy = offer.productId
        notice = nil
        everSelected = true

        Telemetry.track(.offerSelected, sessionId: sessionId, [
            "productId": offer.productId,
            "tier": offer.tier?.rawValue ?? "UNKNOWN",
            "turnsOffered": turns(offer),
            "balance": store.balance,
            "firstPurchase": wallet?.firstPurchaseBonusAvailable ?? false,
            "trigger": "wall",
        ])
        Telemetry.track(.purchaseStarted, sessionId: sessionId, [
            "productId": offer.productId,
            "firstPurchase": wallet?.firstPurchaseBonusAvailable ?? false,
            "balance": store.balance,
            "turnsPlayed": turnsPlayed,
            "trigger": "wall",
        ])
        reachedCheckout = true

        let outcome = await store.purchases.buy(offer.productId)
        busy = nil

        switch outcome {
        case .credited(let credits, _):
            purchased = true
            await store.refreshWallet()
            Haptic.play(.success)
            celebrating = credits
        case .alreadyCredited:
            purchased = true
            await store.refreshWallet()
            router.dismissSheet()
        case .cancelled:
            break
        case .pending:
            notice = t("wallet.purchase_pending")
        case .unavailable(let message), .failed(let message, _):
            notice = message
        }
    }

    private func claimDaily() async {
        busy = "daily"
        defer { busy = nil }
        do {
            let response = try await store.api.claimDaily()
            await store.refreshWallet()
            wallet = try? await store.api.wallet().wallet
            guard response.granted else { return }
            Telemetry.track(.dailyGrantClaimed, sessionId: sessionId, [
                "amount": response.amount,
                "streakDays": 0,
            ])
            Haptic.play(.success)
            celebrating = response.amount
        } catch {
            // A guest cannot claim — the server answers 403 SIGN_IN_REQUIRED —
            // and swallowing that left the player tapping a row that did
            // nothing at all. Silence at the wall is the one thing this screen
            // cannot afford; the same mistake cost us a whole audit once
            // already (PASS.md #12).
            notice = t("wallet.daily_sign_in")
        }
    }

    private func dismiss(bought: Bool) {
        if !bought && !purchased {
            Telemetry.track(.paywallDismissed, sessionId: sessionId, [
                "trigger": "wall",
                "balance": store.balance,
                "offerSelected": everSelected,
                "reachedCheckout": reachedCheckout,
            ])
        }
        router.dismissSheet()
    }

    private func price(for offer: StoreOffer) -> String {
        storePrices[offer.productId] ?? String(format: "$%.2f", offer.referencePriceUsd)
    }

    /// Whole hours and minutes left, which is what a twelve-hour window needs;
    /// "in 11 hours" would hide the last fifty-nine minutes of it.
    private func countdown(to deadline: Date) -> String {
        let seconds = max(0, Int(deadline.timeIntervalSinceNow))
        let hours = seconds / 3600
        let minutes = (seconds % 3600) / 60
        return hours > 0
            ? t("continue.countdown_hm", ["hours": hours, "minutes": minutes])
            : t("continue.countdown_m", ["minutes": max(1, minutes)])
    }

    /// Hours or days, never a timestamp. Mirrors `WalletScreen.relativeTime`.
    private func relativeTime(_ iso: String) -> String {
        guard let date = Format.parseISO(iso) else { return t("wallet.time_now") }
        let diff = date.timeIntervalSinceNow
        if diff <= 0 { return t("wallet.time_now") }
        let hours = Int(diff / 3600)
        if hours < 1 { return t("wallet.time_in_minutes", ["count": max(1, Int(diff / 60))]) }
        if hours < 24 { return t("wallet.time_in_hours", ["count": hours]) }
        return t("wallet.time_in_days", ["count": max(1, hours / 24)])
    }
}
