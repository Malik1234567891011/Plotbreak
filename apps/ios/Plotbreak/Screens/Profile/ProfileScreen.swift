import SwiftUI

// MARK: - Profile
//
// Screen 07 of the redesign. PR-01 / PR-02 / PR-03 — public and private
// cleanly separated. Twin of `ProfileScreen` in
// `apps/mobile/src/screens/LibraryProfile.tsx`.
//
// One identity card (who you are, what you have done, what you have to spend),
// then two short lists: Service, and Benefits. Language, sign-out and account
// deletion live behind the gear.

/// `BADGES.length` in `@plotbreak/contracts` — the set is fixed and known
/// without asking the server, so a guest sees "0 of 12" rather than "0 of 0".
private let badgeCatalogueCount = 12

struct ProfileScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var me: MeResponse?
    @State private var characters: [PlayerCharacterCard] = []
    @State private var badges: [BadgeView] = []

    private var badgeCount: Int { badges.filter { $0.unlockedAt != nil }.count }
    private var badgeTotal: Int { badges.isEmpty ? badgeCatalogueCount : badges.count }
    private var unclaimed: Int { badges.filter { $0.unlockedAt != nil && $0.claimedAt == nil }.count }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                TabHeader(t("profile.title")) {
                    IconButton(t("settings.a11y"), action: { router.present(.settings) }) {
                        Image(systemName: "gearshape")
                            .font(.system(size: 22, weight: .regular))
                            .foregroundStyle(Theme.Colors.textSecondary)
                    }
                }

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        identityCard

                        SectionLabel(t("profile.service"))
                            .padding(.top, Theme.Spacing.xxxl)
                        VStack(spacing: 0) {
                            SettingsRow(t("profile.session_settings"), icon: "bubble.left") { router.present(.settings) }
                            SettingsRow(t("settings.personalization"), icon: "person.crop.circle.badge.checkmark") { router.present(.personalization) }
                            SettingsRow(t("profile.saved_worlds"), icon: "bookmark") { router.present(.savedWorlds) }
                            SettingsRow(t("profile.report_history"), icon: "checkmark.shield") { router.present(.reportHistory) }
                        }
                        .padding(.top, 6)

                        SectionLabel(t("profile.benefits"))
                            .padding(.top, 30)
                        VStack(spacing: 0) {
                            SettingsRow(
                                t("profile.badges"),
                                icon: "star",
                                note: unclaimed > 0 ? t("profile.badges_to_collect", ["count": unclaimed]) : nil
                            ) { router.present(.badges) }
                            SettingsRow(t("profile.wallet"), icon: "creditcard") { router.present(.wallet(shortfall: nil)) }
                        }
                        .padding(.top, 6)
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, 18)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
        .task { await load() }
        .onChange(of: router.sheet) { _, sheet in if sheet == nil { Task { await load() } } }
        .onChange(of: store.isGuest) { _, _ in Task { await load() } }
    }

    // MARK: Identity card

    /// The face, the name, one line of what you have done, and the balance
    /// with the way to add to it. A guest's chevron opens sign-in; a member's
    /// opens their information.
    private var identityCard: some View {
        VStack(spacing: Theme.Spacing.xl) {
            Button {
                Haptic.play(.light)
                router.present(store.isGuest ? .signIn : .myInformation)
            } label: {
                HStack(spacing: Theme.Spacing.lg) {
                    avatar
                    VStack(alignment: .leading, spacing: 2) {
                        Text(store.displayName ?? me?.displayName ?? t("profile.guest"))
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .lineLimit(1)
                        Text(statsLine)
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.Colors.textDim)
                            .lineLimit(2)
                    }
                    Spacer(minLength: Theme.Spacing.sm)
                    ChevronGlyph()
                }
                .contentShape(Rectangle())
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(store.isGuest ? t("profile.sign_in") : t("settings.my_information"))

            HStack {
                HStack(spacing: 9) {
                    CreditGlyph(size: 21)
                    Text(Format.credits(store.balance, locale: store.locale))
                        .font(.system(size: 18, weight: .semibold, design: .monospaced))
                        .foregroundStyle(Theme.Colors.textPrimary)
                }
                .accessibilityElement(children: .combine)
                Spacer(minLength: Theme.Spacing.md)
                Button {
                    Haptic.play(.light)
                    router.present(.wallet(shortfall: nil))
                } label: {
                    Text(t("profile.add_credits"))
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(Theme.Colors.textOnLight)
                        .padding(.horizontal, Theme.Spacing.lg)
                        .padding(.vertical, 9)
                        .background(Theme.Colors.light, in: Capsule())
                }
                .buttonStyle(PressScaleStyle())
            }
        }
        .padding(18)
        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
        }
    }

    /// The account's avatar, or the most recent character's portrait, or
    /// initials — the first face this player has, in that order.
    private var avatar: some View {
        let name = store.displayName ?? me?.displayName ?? ""
        let portrait = me?.avatarUrl ?? characters.first?.portraitUrl
        return ZStack {
            Circle().fill(Theme.Colors.wheelBand)
            RemoteImage(portrait?.assetURL) {
                Text(String(name.prefix(1)).uppercased())
                    .font(.system(size: 22, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textSecondary)
            }
        }
        .frame(width: 58, height: 58)
        .clipShape(Circle())
        .overlay { Circle().strokeBorder(Theme.Colors.borderStrong, lineWidth: 0.5) }
        .accessibilityHidden(true)
    }

    /// "14 worlds · 212 turns · 6 badges". `worldsCreated` is deliberately
    /// absent — creator publishing is not a thing we ship.
    private var statsLine: String {
        if store.isGuest, me == nil { return t("profile.guest_explainer") }
        return t("profile.stats_line", [
            "worlds": me?.stats.storiesPlayed ?? 0,
            "turns": me?.stats.turnsPlayed ?? 0,
            "badges": badgeCount,
        ])
    }

    // MARK: Data

    private func load() async {
        do {
            me = try await store.api.me()
            await store.refreshWallet()
        } catch {
            me = nil
        }
        do {
            characters = try await store.api.myCharacters().characters
        } catch {
            characters = []
        }
        if !store.isGuest, let response = try? await store.api.badges() {
            badges = response.badges
        }
    }
}

// MARK: - Pieces

/// A settings-style row with a chevron and no icon. Kept for the screens
/// that predate `SettingsRow`.
struct LinkRow: View {
    let label: String
    let action: () -> Void

    init(_ label: String, action: @escaping () -> Void) {
        self.label = label
        self.action = action
    }

    var body: some View {
        SettingsRow(label, action: action)
    }
}
