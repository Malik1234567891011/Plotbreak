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
                HStack(spacing: Theme.Spacing.md) {
                    IconButton(t("story.back"), glyph: "‹") { router.dismissSheet() }
                    Txt(t("profile.badges"), .h2)
                    Spacer(minLength: 0)
                }
                .padding(.horizontal, Theme.Spacing.sm)

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
                                            Txt(t("badges.claim", ["credits": badge.creditReward]), .caption, color: Theme.Colors.textOnAccent)
                                                .padding(.horizontal, Theme.Spacing.md)
                                                .padding(.vertical, Theme.Spacing.xs)
                                                .background(Theme.Colors.accentPrimary, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
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
                    .padding(Theme.gutter)
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
        }
        .task { await load() }
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
    // Only worth drawing while there is something to fill. A bar at 0% on a
    // badge nobody has started is decoration.
    private var fraction: Double {
        badge.target > 1 ? min(1, Double(badge.progress) / Double(badge.target)) : 0
    }

    var body: some View {
        Card {
            HStack(spacing: Theme.Spacing.md) {
                Txt(badge.icon, .h2)
                    .opacity(earned ? 1 : 0.35)
                VStack(alignment: .leading, spacing: 2) {
                    Txt(badge.title, .bodyStrong, color: earned ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
                    Txt(badge.description, .caption, color: Theme.Colors.textMuted)
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
                Spacer(minLength: 0)
                action()
            }
        }
    }
}
