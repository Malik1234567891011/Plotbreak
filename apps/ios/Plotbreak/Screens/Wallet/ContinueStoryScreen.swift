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
    /// The last thing a character said in this run, drawn with their face over
    /// the art (design v3). Nil leaves the screen exactly as it was.
    var quote: SpeakerLine? = nil

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
    /// The story's own art for the top of the screen.
    @State private var art: String?

    /// The one offer this screen leads with.
    ///
    /// The first purchase if they have never bought — the cheapest possible way
    /// back into the story, and the threshold worth crossing. Otherwise the
    /// flash deal while its window is open. Failing both, the smallest standing
    /// pack, because the question at a wall is "what is the least I can do to
    /// keep going".
    private var headline: StoreOffer? {
        // Only something StoreKit actually knows about. Leading the wall with a
        // product Apple has not cleared yet means the one button on the
        // highest-intent screen in the product fails at payment.
        let buyable = storePrices.isEmpty ? offers : offers.filter { storePrices[$0.productId] != nil }
        return buyable.first { $0.firstPurchaseOnly }
            ?? buyable.first { $0.tier == .FLASH }
            ?? buyable.min { $0.referencePriceUsd < $1.referencePriceUsd }
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
            ZStack(alignment: .top) {
                // Design v3: the story's own art on top, scrimmed into the page.
                // In an overlay so the art's own size never widens the page.
                Color.clear
                    .frame(maxWidth: .infinity)
                    .frame(height: 340)
                    .overlay { StoryArt(seed: storyId, title: storyTitle, uri: art) }
                    .clipped()
                    .overlay {
                        LinearGradient(stops: [
                            .init(color: Theme.Colors.bgBase.opacity(0.25), location: 0),
                            .init(color: Theme.Colors.bgBase.opacity(0.35), location: 0.4),
                            .init(color: Theme.Colors.bgBase, location: 1),
                        ], startPoint: .top, endPoint: .bottom)
                    }
                    .ignoresSafeArea(edges: .top)
                    .accessibilityHidden(true)

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        // The heading stays 200pt down with or without a quote:
                        // the quote sits at the bottom of that band, over the
                        // art, and grows upwards.
                        ZStack(alignment: .bottomLeading) {
                            Color.clear.frame(height: 200)
                            if let quote {
                                SpeakerLineView(line: quote, style: .wall)
                                    .padding(.bottom, 30)
                            }
                        }
                        storyLine
                        if let headline {
                            offerTile(headline)
                                .padding(.top, Theme.Spacing.xl)
                            PBButton(
                                t("continue.cta", ["price": price(for: headline)]),
                                loadingLabel: t("continue.working"),
                                variant: .light,
                                loading: busy == headline.productId,
                                disabled: busy != nil
                            ) {
                                Task { await buy(headline) }
                            }
                            .padding(.top, Theme.Spacing.lg)
                        } else if offers.isEmpty {
                            Skeleton(height: 164, radius: 16)
                                .padding(.top, Theme.Spacing.xl)
                        }
                        if let storeUnavailable {
                            Txt(storeUnavailable, .micro, color: Theme.Colors.textMuted)
                                .padding(.top, Theme.Spacing.sm)
                        }
                        if let notice {
                            Txt(notice, .bodyCompact)
                                .padding(.top, Theme.Spacing.md)
                                .accessibilityAddTraits(.updatesFrequently)
                        }

                        // Never hidden, and never framed as a lesser option, but
                        // quiet: one line of free credits, then two links.
                        freeRoutes
                            .padding(.top, 28)
                        links
                            .padding(.top, Theme.Spacing.sm)
                        // The moment earning matters most: out of credits, mid-story.
                        TowerCard(source: "credit_wall", compact: true,
                                  inset: EdgeInsets(top: Theme.Spacing.md, leading: 0, bottom: 0, trailing: 0))
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.bottom, Theme.Spacing.xxl)
                }

                HStack {
                    Spacer()
                    Button {
                        Haptic.play(.light)
                        dismiss(bought: false)
                    } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .frame(width: 44, height: 44)
                            .background(.ultraThinMaterial, in: Circle())
                            .overlay { Circle().strokeBorder(Theme.Colors.textPrimary.opacity(0.12), lineWidth: 1) }
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t("wallet.close"))
                }
                .padding(.horizontal, Theme.pageGutter)
                .padding(.top, Theme.Spacing.sm)
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
        .task {
            art = try? await store.api.storyDetail(storyId).story.keyArt
        }
    }

    // MARK: Pieces

    /// What is waiting, named. "Your story" is an abstraction; the title is not.
    private var storyLine: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(t("continue.heading"))
                .font(.system(size: 28, weight: .bold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            Text(t("continue.subheading", ["title": storyTitle, "turn": max(1, turnsPlayed)]))
                .font(.system(size: 15))
                .foregroundStyle(Theme.Colors.textSecondary)
        }
    }

    /// The offer as a store pack (design v3): the same art as the Credits
    /// store, the total with the crystal, the base crossed out, no turn count.
    private func offerTile(_ offer: StoreOffer) -> some View {
        let flash = offer.tier == .FLASH
        let tag: String? = flash ? t("wallet.badge_flash") : (offer.firstPurchaseOnly ? t("wallet.badge_first_purchase") : nil)
        return HStack(spacing: 14) {
            Image(packArt(offer))
                .resizable()
                .scaledToFit()
                .frame(width: 132, height: 132)
                .padding(.top, 10)
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 4) {
                    CreditGlyph(size: 34)
                    Text(Format.credits(offer.credits + offer.bonusCredits, locale: store.locale))
                        .font(.system(size: 34, weight: .bold))
                        .monospacedDigit()
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                        .minimumScaleFactor(0.7)
                }
                if offer.bonusCredits > 0 {
                    HStack(spacing: 5) {
                        Text(Format.credits(offer.credits, locale: store.locale)).strikethrough()
                        Text(t("wallet.bonus_badge", ["bonus": Format.credits(offer.bonusCredits, locale: store.locale)]))
                    }
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                }
                // The deadline, spelled out. It is a real row in the ledger and
                // it really does lapse, so saying so is a fact rather than the
                // manufactured urgency §3.8 rules out.
                if flash, let deadline = flashDeadline {
                    Text(t("continue.flash_ends", ["when": countdown(to: deadline)]))
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textSecondary)
                }
            }
            .padding(.top, 10)
            Spacer(minLength: 0)
        }
        .padding(.leading, 10)
        .padding(.trailing, Theme.Spacing.lg)
        .frame(height: 164)
        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(alignment: .topLeading) {
            if let tag {
                Text(tag.uppercased())
                    .font(.system(size: 11, weight: .bold))
                    .kerning(0.4)
                    .foregroundStyle(Theme.Colors.textOnLight)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Theme.Colors.light, in: UnevenRoundedRectangle(
                        topLeadingRadius: 16, bottomLeadingRadius: 0, bottomTrailingRadius: 10, topTrailingRadius: 0, style: .continuous))
            }
        }
        .accessibilityElement(children: .combine)
    }

    /// The Credits store's picture for this pack, so the two screens agree.
    private func packArt(_ offer: StoreOffer) -> String {
        if offer.firstPurchaseOnly { return "PackFew" }
        switch offer.credits {
        case ..<2_000: return "PackOne"
        case ..<10_000: return "PackFew"
        case ..<20_000: return "PackPouch"
        case ..<50_000: return "PackBasket"
        case ..<100_000: return "PackCrate"
        default: return "PackChest"
        }
    }

    /// Free credits, as quiet lines.
    private var freeRoutes: some View {
        VStack(alignment: .leading, spacing: 0) {
            if wallet?.dailyClaimAvailable == true || passBonusWaiting {
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
                .font(.system(size: 13))
            Text(text)
                .font(.system(size: 13, weight: emphasised ? .medium : .regular))
            Spacer(minLength: 0)
        }
        .foregroundStyle(emphasised ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
        .frame(minHeight: Theme.minTouchTarget - 8)
        .contentShape(Rectangle())
    }

    /// Every pack, and the Pass, as two plain links.
    private var links: some View {
        HStack {
            Button {
                dismiss(bought: false)
                router.present(.wallet(shortfall: shortfall))
            } label: {
                Text(t("continue.see_all_packs"))
            }
            Spacer(minLength: Theme.Spacing.md)
            if let pass = wallet?.pass, !pass.active {
                Button {
                    dismiss(bought: false)
                    router.present(.pass)
                } label: {
                    Text(t("pass.title"))
                }
            }
        }
        .font(.system(size: 15, weight: .medium))
        .foregroundStyle(Theme.Colors.textSecondary)
        .buttonStyle(PressOpacityStyle())
        .frame(minHeight: Theme.minTouchTarget)
    }

    // MARK: Work

    private func load() async {
        do {
            // POST, not GET: this is what tells the server somebody actually
            // ran out, which is the only thing that opens the limited window.
            //
            // Falls back to the plain wallet when the server has not got this
            // route yet. The app and the API deploy separately, so for a while
            // after this ships there are phones calling an endpoint that 404s,
            // and the credit wall is the last screen that should break over it:
            // they would see an error instead of anything to buy. Same class of
            // mistake as shipping data before the schema that reads it.
            let response: WalletResponse
            if let reported = try? await store.api.creditWall() {
                response = reported
            } else {
                response = try await store.api.wallet()
            }
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

    /// A Pass holder whose credits for today have not landed yet.
    private var passBonusWaiting: Bool {
        guard let pass = wallet?.pass else { return false }
        return pass.active && !pass.bonusClaimedToday
    }

    private func claimDaily() async {
        busy = "daily"
        defer { busy = nil }
        do {
            let response = try await store.api.claimDaily()
            await store.refreshWallet()
            wallet = try? await store.api.wallet().wallet
            let total = (response.granted ? response.amount : 0) + response.passAmount
            guard total > 0 else { return }
            if response.granted {
                Telemetry.track(.dailyGrantClaimed, sessionId: sessionId, [
                    "amount": response.amount,
                    "streakDays": 0,
                ])
            }
            Haptic.play(.success)
            celebrating = total
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
