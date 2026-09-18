import SwiftUI

// MARK: - BadgesScreen
//
// What playing has earned. Twin of `apps/mobile/src/screens/Badges.tsx`.
//
// Three groups, in the order somebody cares about them: rewards waiting to be
// collected, then what is in progress, then what is done. A list sorted by
// definition order buries the one thing the player came here to do.
//
// Claim, rather than automatic: a reward that lands silently while you are
// mid-scene is a number changing in a corner; a reward you come and take is a
// small moment. Unclaimed rewards are surfaced on Profile so this never
// becomes a screen you have to remember to check.

struct BadgesScreen: View {
    /// Drawn as a root tab (a title, no back chevron) rather than as a sheet.

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var badges: [BadgeView] = []
    @State private var claiming: String?

    private var claimable: [BadgeView] { badges.filter { $0.unlockedAt != nil && $0.claimedAt == nil } }
    private var inProgress: [BadgeView] { badges.filter { $0.unlockedAt == nil } }
    private var done: [BadgeView] { badges.filter { $0.unlockedAt != nil && $0.claimedAt != nil } }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("profile.badges"), backLabel: t("story.back"), onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                        if store.isGuest {
                            Txt(t("badges.guest"), .bodyCompact, color: Theme.Colors.textMuted)
                        }

                        if !claimable.isEmpty {
                            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                                Txt(t("badges.ready"), .h3)
                                ForEach(claimable) { badge in
                                    BadgeRow(badge: badge) {
                                        Button {
                                            Task { await claim(badge) }
                                        } label: {
                                            Text(t("badges.claim", ["credits": badge.creditReward]))
                                                .font(.system(size: 14, weight: .medium))
                                                .foregroundStyle(Theme.Colors.textOnLight)
                                                .padding(.horizontal, Theme.Spacing.lg)
                                                .padding(.vertical, 9)
                                                .background(Theme.Colors.light, in: Capsule())
                                        }
                                        .buttonStyle(PressScaleStyle())
                                        .disabled(claiming == badge.id)
                                        .accessibilityLabel(t("badges.claim_a11y", ["title": badge.title, "credits": badge.creditReward]))
                                    }
                                }
                            }
                        }

                        if !inProgress.isEmpty {
                            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                                Txt(t("badges.in_progress"), .h3)
                                ForEach(inProgress) { badge in BadgeRow(badge: badge) }
                            }
                        }

                        if !done.isEmpty {
                            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                                Txt(t("badges.earned"), .h3)
                                ForEach(done) { badge in BadgeRow(badge: badge) }
                            }
                        }
                    }
                    .padding(Theme.pageGutter)
                    .padding(.top, Theme.Spacing.xs)
                    .padding(.bottom, Theme.Spacing.giant)
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
        }
        .task { await load() }
        .onChange(of: store.isGuest) { _, _ in Task { await load() } }
    }

    private func load() async {
        if let response = try? await store.api.badges() { badges = response.badges }
    }

    private func claim(_ badge: BadgeView) async {
        guard claiming == nil else { return }
        claiming = badge.id
        defer { claiming = nil }
        do {
            let response = try await store.api.claimBadge(badge.id)
            store.setBalance(response.balance)
            Haptic.play(.success)
        } catch {
            // Already collected, or offline. Reloading shows the truth either way.
        }
        await load()
    }
}

// MARK: - BadgeRow

struct BadgeRow<Action: View>: View {
    let badge: BadgeView
    @ViewBuilder var action: () -> Action

    @Environment(\.translator) private var t

    init(badge: BadgeView, @ViewBuilder action: @escaping () -> Action = { EmptyView() }) {
        self.badge = badge
        self.action = action
    }

    private var earned: Bool { badge.unlockedAt != nil }
    /// Masked while a secret badge is still locked, in both languages.
    private var hidden: Bool { badge.secret && !earned }
    private var title: String {
        hidden ? t("badges.secret_title") : t.badge(badge.id, "title", fallback: badge.title)
    }
    private var blurb: String {
        hidden ? t("badges.secret_body") : t.badge(badge.id, "body", fallback: badge.description)
    }
    // Only worth drawing while there is something to fill. A bar at 0% on a
    // badge nobody has started is decoration.
    private var fraction: Double {
        badge.target > 1 ? min(1, Double(badge.progress) / Double(badge.target)) : 0
    }

    var body: some View {
        Card {
            HStack(spacing: Theme.Spacing.md) {
                BadgeMark(badge: badge, earned: earned)
                VStack(alignment: .leading, spacing: 2) {
                    // The server sends English; the words are ours. But a
                    // locked secret badge arrives already masked, and looking
                    // its name up by id would hand back the real one — which
                    // is the whole thing the mask exists to prevent.
                    Txt(title, .bodyStrong, color: earned ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
                    Txt(blurb, .caption, color: Theme.Colors.textMuted)
                    if !earned, fraction > 0 {
                        VStack(alignment: .leading, spacing: 2) {
                            GeometryReader { proxy in
                                ZStack(alignment: .leading) {
                                    RoundedRectangle(cornerRadius: 2).fill(Theme.Colors.bgElevated)
                                    RoundedRectangle(cornerRadius: 2)
                                        .fill(Theme.Colors.accentPrimary)
                                        .frame(width: proxy.size.width * fraction)
                                }
                            }
                            .frame(height: 3)
                            Txt(t("badges.progress", ["done": badge.progress, "target": badge.target]), .micro, color: Theme.Colors.textMuted)
                        }
                        .padding(.top, Theme.Spacing.xs)
                    }
                }
                Spacer(minLength: Theme.Spacing.sm)
                // The reward, on every row rather than only on the ones that
                // are ready to claim. A badge screen that does not say what a
                // badge is worth is a list of chores: the number is the reason
                // to go and do it, and it belongs where the eye lands last.
                BadgeReward(credits: badge.creditReward, earned: earned, claimed: badge.claimedAt != nil)
                action()
            }
        }
    }
}

/// The badge's mark, drawn by `npm run badge-art` and shipped in the bundle.
///
/// Falls back to the emoji the definition still carries. Not defensiveness for
/// its own sake: the contract is shared with a web client that has no asset
/// catalogue, and a badge added in code before its art is drawn should appear
/// as a slightly cheap row rather than an empty one.
struct BadgeMark: View {
    let badge: BadgeView
    let earned: Bool

    private var art: Image? {
        UIImage(named: "badge_\(badge.id)").map { Image(uiImage: $0) }
    }

    var body: some View {
        Group {
            if let art {
                art.resizable().scaledToFit().frame(width: 40, height: 40)
            } else {
                Txt(badge.icon, .h2)
            }
        }
        // Locked marks are dimmed rather than greyed: the colour is the reward,
        // and a desaturated one stops reading as a thing worth having.
        .opacity(earned ? 1 : 0.62)
        .saturation(earned ? 1 : 0.7)
        .accessibilityHidden(true)
    }
}

/// What a badge pays, in the accent when it is still out there to be won and
/// dimmed once it has been collected.
struct BadgeReward: View {
    let credits: Int
    let earned: Bool
    let claimed: Bool

    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    var body: some View {
        if credits > 0, !claimed {
            HStack(spacing: 3) {
                CreditGlyph(size: 11, color: earned ? Theme.Colors.accentPrimary : Theme.Colors.textMuted)
                // `Text("\(credits)")` resolves to a LocalizedStringKey, which
                // formats the number with the *device* locale — so a French
                // player on an English phone read "1,000" instead of "1 000".
                // Formatted against the app's own language instead.
                Text(verbatim: Format.credits(credits, locale: store.locale))
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(earned ? Theme.Colors.accentPrimary : Theme.Colors.textMuted)
            }
            .accessibilityLabel(t("badges.reward_a11y", ["credits": credits]))
        }
    }
}
