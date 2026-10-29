import StoreKit
import SwiftUI

// MARK: - Plotbreak Pass card
//
// The weekly subscription, sold on the same screens as the packs. See
// docs/plotbreak-pass.md. It pays daily on purpose: the weak number is how many
// players come back tomorrow, so the benefit is a reason to.
//
// Apple reviews this view. The price, the period, the fact that it renews until
// cancelled, where to cancel, and links to the Terms of Use and Privacy Policy
// must all be visible before the button is pressed — never behind a tap.

struct PassCard: View {
    let pass: PassStatus
    /// Called after anything that changes the wallet, so the host reloads.
    let onChanged: () async -> Void

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var price: String?
    @State private var busy = false
    @State private var notice: String?
    @State private var managing = false

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            HStack(alignment: .firstTextBaseline) {
                Txt(t("pass.title"), .h3)
                Spacer(minLength: Theme.Spacing.sm)
                if pass.active {
                    Txt(t("pass.active"), .caption, color: Theme.Colors.success)
                } else {
                    Txt(t("pass.price_week", ["price": displayPrice]), .caption, color: Theme.Colors.textSecondary)
                }
            }

            if pass.active {
                activeBody
            } else {
                Txt(t("pass.tagline"), .bodyCompact, color: Theme.Colors.textSecondary)
                perks
                buyButton
                legal
            }

            if let notice {
                Txt(notice, .caption, color: Theme.Colors.textSecondary)
                    .accessibilityAddTraits(.updatesFrequently)
            }
        }
        .padding(Theme.Spacing.xl)
        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                .strokeBorder(Theme.Colors.accentPrimary.opacity(0.55), lineWidth: 1)
        }
        .manageSubscriptionsSheet(isPresented: $managing)
        .onChange(of: managing) { _, open in
            // Back from Apple's sheet: whatever they changed, read it again.
            if !open { Task { await onChanged() } }
        }
        .task {
            price = await store.purchases.products(for: [pass.productId]).first?.displayPrice
        }
    }

    // MARK: Sections

    private var perks: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            perk(t("pass.perk_daily", [
                "credits": Format.credits(pass.dailyCredits, locale: store.locale),
                "count": pass.dailyCredits / max(1, turnCost),
            ]))
            perk(t("pass.perk_free"))
            perk(t("pass.perk_requests"))
        }
    }

    private func perk(_ text: String) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: Theme.Spacing.sm) {
            Text("✦").font(.system(size: 12)).foregroundStyle(Theme.Colors.accentPrimary)
            Txt(text, .bodyCompact)
        }
    }

    @ViewBuilder
    private var buyButton: some View {
        if store.isGuest {
            // Guest credits do not follow a sign-in, and a subscription must not
            // be bought by an account that is about to be thrown away.
            PBButton(t("pass.sign_in"), variant: .light) { router.present(.signIn) }
        } else {
            PBButton(
                t("pass.cta", ["price": displayPrice]),
                loadingLabel: t("continue.working"),
                variant: .light,
                loading: busy
            ) {
                Task { await subscribe() }
            }
        }
    }

    private var legal: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
            Txt(t("pass.legal", ["price": displayPrice]), .micro, color: Theme.Colors.textMuted)
            HStack(spacing: Theme.Spacing.sm) {
                if let terms = legalURL("terms") {
                    Link(t("pass.terms"), destination: terms)
                }
                Text("·").foregroundStyle(Theme.Colors.borderStrong)
                if let privacy = legalURL("privacy") {
                    Link(t("pass.privacy"), destination: privacy)
                }
            }
            .font(.system(size: 11))
            .tint(Theme.Colors.textSecondary)
        }
    }

    private var activeBody: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            if let expires = pass.expiresAt {
                Txt(t("pass.renews", ["when": relativeTime(expires)]), .caption, color: Theme.Colors.textSecondary)
            }
            Txt(
                pass.bonusClaimedToday
                    ? t("pass.bonus_in", ["credits": Format.credits(pass.dailyCredits, locale: store.locale)])
                    : t("pass.bonus_waiting", ["credits": Format.credits(pass.dailyCredits, locale: store.locale)]),
                .bodyCompact
            )
            PBButton(t("pass.open_requests"), variant: .light, size: .medium) {
                router.present(.storyRequests)
            }
            Button {
                managing = true
            } label: {
                Text(t("pass.manage"))
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .frame(maxWidth: .infinity, minHeight: Theme.minTouchTarget - 12)
            }
            .buttonStyle(PressOpacityStyle())
        }
    }

    // MARK: Actions

    private func subscribe() async {
        busy = true
        notice = nil
        defer { busy = false }
        Telemetry.track(.purchaseStarted, [
            "productId": pass.productId,
            "firstPurchase": false,
            "balance": store.balance,
            "trigger": "pass",
        ])
        switch await store.purchases.buy(pass.productId) {
        case .credited(let credits, _):
            Haptic.play(.success)
            notice = t("pass.welcome", ["credits": Format.credits(credits, locale: store.locale)])
        case .alreadyCredited:
            Haptic.play(.success)
            notice = nil
        case .cancelled:
            notice = nil
        case .pending:
            notice = t("wallet.purchase_pending")
        case .unavailable(let message):
            Haptic.play(.error)
            notice = message
        case .failed(let message, let charged):
            Haptic.play(.error)
            notice = charged ? t("wallet.purchase_failed_charged", ["message": message]) : message
        }
        await onChanged()
        await store.refreshWallet()
    }

    // MARK: Helpers

    /// StoreKit's localised price once it answers; the US reference until then.
    private var displayPrice: String {
        price ?? String(format: "$%.2f", pass.referencePriceUsd)
    }

    private var turnCost: Int {
        max(1, TierCopy.info(.VIVID, bootstrap: store.bootstrap).costCredits)
    }

    private func legalURL(_ page: String) -> URL? {
        AppConfig.legalBaseURL?.appendingPathComponent(page)
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
