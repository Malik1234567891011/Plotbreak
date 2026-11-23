import StoreKit
import SwiftUI

// MARK: - Plotbreak Pass paywall (design v3)
//
// The weekly subscription on its own screen, after the paywalls in
// docs/design-v3 (Character AI, Swerve, EMOCHI): a fan of covers, the value in
// credits, three benefits with their pictures, one button. Weekly only; no
// turn counts. See docs/plotbreak-pass.md.
//
// Apple reviews this view. The price, the period, the fact that it renews until
// cancelled, where to cancel, and links to the Terms of Use and Privacy Policy
// must all be visible before the button is pressed — never behind a tap.

struct PassScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var pass: PassStatus?
    @State private var price: String?
    @State private var busy = false
    @State private var restoring = false
    @State private var notice: String?
    @State private var managing = false
    @State private var covers: [StorySummary] = []

    var body: some View {
        Screen {
            ZStack(alignment: .top) {
                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        coverFan
                            .padding(.top, 64)
                        titleBlock
                            .padding(.top, Theme.Spacing.lg)
                        if let pass, pass.active {
                            activeBody(pass)
                                .padding(.top, Theme.Spacing.xl)
                        } else {
                            benefits
                                .padding(.top, Theme.Spacing.xl)
                        }
                        if let notice {
                            Txt(notice, .caption, color: Theme.Colors.textSecondary)
                                .padding(.top, Theme.Spacing.lg)
                                .accessibilityAddTraits(.updatesFrequently)
                        }
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.bottom, Theme.Spacing.xxl)
                }
                topBar
            }
            .safeAreaInset(edge: .bottom, spacing: 0) {
                if let pass, !pass.active {
                    buyArea(pass)
                }
            }
        }
        .manageSubscriptionsSheet(isPresented: $managing)
        .onChange(of: managing) { _, open in
            // Back from Apple's sheet: whatever they changed, read it again.
            if !open { Task { await reload() } }
        }
        .task {
            store.purchases.connect()
            store.purchases.translator = t
            pass = store.wallet?.pass
            covers = Array((store.discoverSnapshot.load()?.rails.first { $0.kind == .HERO }?.stories ?? []).prefix(3))
            await reload()
        }
    }

    // MARK: Sections

    /// Close on the left and Restore on the right, both clear of the art.
    private var topBar: some View {
        HStack {
            Button {
                Haptic.play(.light)
                router.dismissSheet()
            } label: {
                Image(systemName: "xmark")
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .frame(width: 44, height: 44)
                    .background(Theme.Colors.bgRaised, in: Circle())
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(t("wallet.close"))
            Spacer()
            Button {
                Task { await restore() }
            } label: {
                Text(restoring ? t("wallet.restore_loading") : t("wallet.restore"))
                    .font(.system(size: 15, weight: .medium))
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .frame(minHeight: Theme.minTouchTarget)
            }
            .buttonStyle(PressOpacityStyle())
            .disabled(restoring || busy)
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, Theme.Spacing.sm)
    }

    /// Three of the featured covers, fanned. Drawn from the last Home shelf this
    /// phone saw, so it costs no request; hidden when there is none.
    @ViewBuilder
    private var coverFan: some View {
        if covers.count == 3 {
            ZStack {
                cover(covers[1], width: 96).rotationEffect(.degrees(-9)).offset(x: -86, y: 12).opacity(0.85)
                cover(covers[2], width: 96).rotationEffect(.degrees(9)).offset(x: 86, y: 12).opacity(0.85)
                cover(covers[0], width: 114)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 176)
            .accessibilityHidden(true)
        }
    }

    private func cover(_ story: StorySummary, width: CGFloat) -> some View {
        StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
            .frame(width: width, height: (width * 1.5).rounded())
            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
    }

    private var titleBlock: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(t("pass.title"))
                .font(.system(size: 15, weight: .semibold))
                .foregroundStyle(Theme.Colors.textSecondary)
            Text(t("pass.headline", ["credits": Format.credits(pass?.dailyCredits ?? 400, locale: store.locale)]))
                .font(.system(size: 28, weight: .bold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .fixedSize(horizontal: false, vertical: true)
                .accessibilityAddTraits(.isHeader)
        }
    }

    /// What you get, each with its picture: the store's three-crystal pack for
    /// the daily credits, the single crystal for the free 300 that stays, an
    /// icon for story requests.
    private var benefits: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            benefit(art: AnyView(Image("PackFew").resizable().scaledToFit()),
                    title: t("pass.perk_daily_v3", ["credits": Format.credits((pass?.dailyCredits ?? 400) * 7, locale: store.locale)]),
                    subtitle: t("pass.perk_daily_v3_body"))
            benefit(art: AnyView(Image("PackOne").resizable().scaledToFit()),
                    title: t("pass.perk_free"), subtitle: nil)
            benefit(art: AnyView(
                        Image(systemName: "text.badge.plus")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .frame(width: 44, height: 44)
                            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 12, style: .continuous))),
                    title: t("pass.perk_requests"), subtitle: nil)
        }
    }

    private func benefit(art: AnyView, title: String, subtitle: String?) -> some View {
        HStack(spacing: 14) {
            art.frame(width: 48, height: 48)
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
                if let subtitle {
                    Text(subtitle)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                }
            }
            Spacer(minLength: 0)
        }
        .accessibilityElement(children: .combine)
    }

    /// One button, then the fine print Apple requires, visible before the tap.
    private func buyArea(_ pass: PassStatus) -> some View {
        VStack(spacing: Theme.Spacing.sm) {
            if store.isGuest {
                // Guest credits do not follow a sign-in, and a subscription must not
                // be bought by an account that is about to be thrown away.
                PBButton(t("pass.sign_in"), variant: .light) { router.present(.signIn) }
            } else {
                PBButton(
                    t("pass.cta", ["price": displayPrice(pass)]),
                    loadingLabel: t("continue.working"),
                    variant: .light,
                    loading: busy
                ) {
                    Task { await subscribe(pass) }
                }
            }
            Text(t("pass.legal", ["price": displayPrice(pass)]))
                .font(.system(size: 11))
                .foregroundStyle(Theme.Colors.textMuted)
                .multilineTextAlignment(.center)
                .fixedSize(horizontal: false, vertical: true)
            HStack(spacing: Theme.Spacing.sm) {
                if let terms = legalURL("terms") {
                    Link(t("pass.terms"), destination: terms)
                }
                Text(verbatim: "·").foregroundStyle(Theme.Colors.borderStrong)
                if let privacy = legalURL("privacy") {
                    Link(t("pass.privacy"), destination: privacy)
                }
            }
            .font(.system(size: 12))
            .tint(Theme.Colors.textSecondary)
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, Theme.Spacing.md)
        .padding(.bottom, Theme.Spacing.sm)
        .background(Theme.Colors.bgBase)
    }

    private func activeBody(_ pass: PassStatus) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("pass.active"), .bodyStrong)
            if let expires = pass.expiresAt {
                Txt(t("pass.renews", ["when": relativeTime(expires)]), .caption, color: Theme.Colors.textSecondary)
            }
            Txt(
                pass.bonusClaimedToday
                    ? t("pass.bonus_in", ["credits": Format.credits(pass.dailyCredits, locale: store.locale)])
                    : t("pass.bonus_waiting", ["credits": Format.credits(pass.dailyCredits, locale: store.locale)]),
                .bodyCompact
            )
            PBButton(t("pass.open_requests"), variant: .light) {
                router.present(.storyRequests)
            }
            Button {
                managing = true
            } label: {
                Text(t("pass.manage"))
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .frame(maxWidth: .infinity, minHeight: Theme.minTouchTarget)
            }
            .buttonStyle(PressOpacityStyle())
        }
    }

    // MARK: Actions

    private func reload() async {
        if let response = try? await store.api.wallet() {
            pass = response.wallet.pass
            store.setBalance(response.wallet.balance)
        }
        if let id = pass?.productId {
            price = await store.purchases.products(for: [id]).first?.displayPrice
        }
    }

    private func subscribe(_ pass: PassStatus) async {
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
        await reload()
        await store.refreshWallet()
    }

    private func restore() async {
        restoring = true
        notice = nil
        defer { restoring = false }
        let result = await store.purchases.restore()
        await reload()
        await store.refreshWallet()
        if result.restored > 0 {
            Haptic.play(.success)
            notice = t("wallet.credits_restored", [
                "count": result.creditsRestored,
                "credits": Format.credits(result.creditsRestored, locale: store.locale),
            ])
        } else if result.verified > 0 {
            notice = t("wallet.restore_all_present")
        } else if store.purchases.available {
            notice = t("wallet.restore_none")
        } else {
            Haptic.play(.error)
            notice = t("wallet.restore_unreachable")
        }
    }

    // MARK: Helpers

    /// StoreKit's localised price once it answers; the US reference until then.
    private func displayPrice(_ pass: PassStatus) -> String {
        price ?? String(format: "$%.2f", pass.referencePriceUsd)
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
