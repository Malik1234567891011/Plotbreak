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
//
// Design v3 (docs/design-v3/AUDIT.md, rules 1-7): plain rows on the page, no
// boxes. The badge art is the loud thing; the words are SF; the reward is the
// crystal inline. The Collect pills stay small white capsules: like the shop's
// price pills, each one is money, which is the documented exception to one
// primary per screen.

struct BadgesScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @Environment(\.scenePhase) private var scenePhase

    @State private var badges: [BadgeView] = []
    @State private var claiming: String?
    /// The badge just collected, while its burst plays.
    @State private var celebrating: BadgeView?
    /// The Discord quest's code, fetched only while that badge is still open.
    @State private var discordCode: String?

    private var claimable: [BadgeView] { badges.filter { $0.unlockedAt != nil && $0.claimedAt == nil } }
    private var inProgress: [BadgeView] { badges.filter { $0.unlockedAt == nil } }
    private var done: [BadgeView] { badges.filter { $0.unlockedAt != nil && $0.claimedAt != nil } }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(backLabel: t("story.back"), onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        Text(t("profile.badges"))
                            .font(.system(size: 28, weight: .bold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .accessibilityAddTraits(.isHeader)

                        if store.isGuest {
                            Text(t("badges.guest"))
                                .font(.system(size: 15))
                                .foregroundStyle(Theme.Colors.textMuted)
                                .fixedSize(horizontal: false, vertical: true)
                                .padding(.top, Theme.Spacing.sm)
                        }

                        if !claimable.isEmpty {
                            section(t("badges.ready")) {
                                ForEach(claimable) { badge in
                                    BadgeRow(badge: badge, showsReward: false) { collectPill(badge) }
                                }
                            }
                        }

                        if !inProgress.isEmpty {
                            section(t("badges.in_progress")) {
                                ForEach(inProgress) { badge in
                                    BadgeRow(badge: badge)
                                    if badge.id == DiscordQuestPanel.badgeId, let discordCode {
                                        DiscordQuestPanel(code: discordCode)
                                            .padding(.leading, BadgeRow<EmptyView>.textInset)
                                            .padding(.bottom, Theme.Spacing.md)
                                    }
                                }
                            }
                        }

                        if !done.isEmpty {
                            section(t("badges.earned")) {
                                ForEach(done) { badge in BadgeRow(badge: badge) }
                            }
                        }
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.xs)
                    .padding(.bottom, Theme.Spacing.giant)
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
        }
        .overlay {
            if let celebrating {
                CreditCelebration(credits: celebrating.creditReward, locale: store.locale, badge: celebrating) {
                    self.celebrating = nil
                }
                .transition(.opacity)
            }
        }
        .task { await load() }
        .onChange(of: store.isGuest) { _, _ in Task { await load() } }
        // Back from Discord after posting the code: the badge is likely ready.
        .onChange(of: scenePhase) { _, phase in if phase == .active { Task { await load() } } }
    }

    /// A 20pt sentence-case heading over plain rows (the Library pattern).
    private func section<Rows: View>(_ title: String, @ViewBuilder rows: () -> Rows) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(title.sentenceCased)
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
                .padding(.bottom, Theme.Spacing.xs)
            rows()
        }
        .padding(.top, Theme.Spacing.xxl)
    }

    /// The small white capsule that pays. "Collect ◆50", the ◆ drawn as the crystal.
    private func collectPill(_ badge: BadgeView) -> some View {
        Button {
            Task { await claim(badge) }
        } label: {
            ZStack {
                Text.crystals(t("badges.claim", ["credits": badge.creditReward]), fontSize: 14, onLight: true)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textOnLight)
                    .lineLimit(1)
                    .opacity(claiming == badge.id ? 0 : 1)
                if claiming == badge.id {
                    ProgressView().tint(Theme.Colors.textOnLight)
                }
            }
            .padding(.horizontal, Theme.Spacing.lg)
            .frame(minHeight: 36)
            .background(Theme.Colors.light, in: Capsule())
            .contentShape(Capsule())
        }
        .buttonStyle(PressScaleStyle())
        .disabled(claiming != nil)
        .accessibilityLabel(t("badges.claim_a11y", ["title": badge.title, "credits": badge.creditReward]))
    }

    private func load() async {
        if let response = try? await store.api.badges() { badges = response.badges }
        let discordOpen = badges.contains { $0.id == DiscordQuestPanel.badgeId && $0.unlockedAt == nil }
        if discordOpen, discordCode == nil {
            discordCode = try? await store.api.discordQuest().code
        }
    }

    private func claim(_ badge: BadgeView) async {
        guard claiming == nil else { return }
        claiming = badge.id
        defer { claiming = nil }
        do {
            let response = try await store.api.claimBadge(badge.id)
            store.setBalance(response.balance)
            Haptic.play(.success)
            // Only after the server has paid, so the burst never celebrates
            // credits that did not land.
            celebrating = badge
        } catch {
            // Already collected, or offline. Reloading shows the truth either way.
        }
        await load()
    }
}

// MARK: - Discord quest

/// The code to post in the server, and the way there. The bot unlocks the
/// badge when it sees the code; the claim is the ordinary one above.
///
/// Design v3: no box. The code inline in monospace, a filled Copy capsule
/// beside it, then the Discord button, indented under the badge it belongs to.
struct DiscordQuestPanel: View {
    static let badgeId = "discord_hello"

    let code: String

    @Environment(\.translator) private var t
    @State private var copied = false

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            HStack(spacing: Theme.Spacing.md) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(t("badges.discord_code_label"))
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                    Text(verbatim: code)
                        .font(.system(size: 20, weight: .semibold, design: .monospaced))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .textSelection(.enabled)
                }
                Spacer(minLength: Theme.Spacing.sm)
                Button {
                    UIPasteboard.general.string = code
                    Haptic.play(.success)
                    copied = true
                } label: {
                    Text(copied ? t("badges.discord_copied") : t("badges.discord_copy"))
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .padding(.horizontal, Theme.Spacing.lg)
                        .frame(minHeight: 36)
                        .background(Theme.Colors.bgRaised, in: Capsule())
                        .contentShape(Capsule())
                }
                .buttonStyle(PressScaleStyle())
                .accessibilityLabel(t("badges.discord_copy_a11y", ["code": code]))
            }
            DiscordButton(label: t("badges.discord_open"), source: "badges")
        }
    }
}

// MARK: - BadgeRow

/// One badge as a plain row: the art at 44pt, the title, the blurb, progress
/// as a thin capsule with "3 of 10" beside it, and what it pays (or the
/// Collect pill) at the end.
struct BadgeRow<Action: View>: View {
    let badge: BadgeView
    /// Off when the trailing action already names the reward (the Collect pill).
    var showsReward = true
    @ViewBuilder var action: () -> Action

    @Environment(\.translator) private var t

    /// Where the row's words start: the mark plus the gap after it. Anything
    /// that belongs to a badge (the Discord panel) lines up under its title.
    static var textInset: CGFloat { BadgeMark.rowSize + 14 }

    init(badge: BadgeView, showsReward: Bool = true, @ViewBuilder action: @escaping () -> Action = { EmptyView() }) {
        self.badge = badge
        self.showsReward = showsReward
        self.action = action
    }

    private var earned: Bool { badge.unlockedAt != nil }
    private var claimed: Bool { badge.claimedAt != nil }
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
        HStack(alignment: .center, spacing: 14) {
            BadgeMark(badge: badge, earned: earned)
            VStack(alignment: .leading, spacing: 2) {
                // The server sends English; the words are ours. But a
                // locked secret badge arrives already masked, and looking
                // its name up by id would hand back the real one — which
                // is the whole thing the mask exists to prevent.
                Text(title)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(earned ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
                Text(blurb)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
                if !earned, fraction > 0 {
                    HStack(spacing: Theme.Spacing.sm) {
                        GeometryReader { proxy in
                            ZStack(alignment: .leading) {
                                Capsule().fill(Theme.Colors.track)
                                Capsule()
                                    .fill(Theme.Colors.textPrimary)
                                    .frame(width: max(3, proxy.size.width * fraction))
                            }
                        }
                        .frame(height: 3)
                        .accessibilityHidden(true)
                        Text(t("badges.progress", ["done": min(badge.progress, badge.target), "target": badge.target]))
                            .font(.system(size: 13))
                            .monospacedDigit()
                            .foregroundStyle(Theme.Colors.textMuted)
                            .fixedSize()
                    }
                    .padding(.top, 6)
                }
            }
            Spacer(minLength: Theme.Spacing.sm)
            // The reward, on every row still out there to be won. A badge
            // screen that does not say what a badge is worth is a list of
            // chores: the number is the reason to go and do it, and it belongs
            // where the eye lands last. A ready badge says it on its pill.
            if showsReward {
                BadgeReward(credits: badge.creditReward, earned: earned, claimed: claimed)
            }
            action()
        }
        .padding(.vertical, Theme.Spacing.md)
        .accessibilityElement(children: .contain)
    }
}

/// The badge's mark, drawn by `npm run badge-art` and shipped in the bundle.
///
/// Falls back to the emoji the definition still carries. Not defensiveness for
/// its own sake: the contract is shared with a web client that has no asset
/// catalogue, and a badge added in code before its art is drawn should appear
/// as a slightly cheap row rather than an empty one.
struct BadgeMark: View {
    /// A badge row's mark (design v3: 44pt, art at an 8pt corner).
    static let rowSize: CGFloat = 44

    let badge: BadgeView
    let earned: Bool
    var size: CGFloat = BadgeMark.rowSize

    private var art: Image? {
        UIImage(named: "badge_\(badge.id)").map { Image(uiImage: $0) }
    }

    var body: some View {
        Group {
            if let art {
                art.resizable().scaledToFit()
            } else {
                Text(badge.icon).font(.system(size: size * 0.8))
            }
        }
        .frame(width: size, height: size)
        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
        // Locked marks are dimmed rather than greyed: the colour is the reward,
        // and a desaturated one stops reading as a thing worth having.
        .opacity(earned ? 1 : 0.62)
        .saturation(earned ? 1 : 0.7)
        .accessibilityHidden(true)
    }
}

/// What a badge pays, inline: the crystal and the number, in paper while it
/// waits to be collected and muted while it is still to be won. Gone once it
/// has been collected.
struct BadgeReward: View {
    let credits: Int
    let earned: Bool
    let claimed: Bool

    @Environment(\.translator) private var t

    var body: some View {
        if credits > 0, !claimed {
            // `t` formats the number against the app's own language, so a
            // French player on an English phone reads "1 000", not "1,000".
            Text.crystals(t("badges.reward", ["credits": credits]), fontSize: 13)
                .font(.system(size: 13, weight: .semibold))
                .monospacedDigit()
                .foregroundStyle(earned ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
                .fixedSize()
                .accessibilityLabel(t("badges.reward_a11y", ["credits": credits]))
        }
    }
}
