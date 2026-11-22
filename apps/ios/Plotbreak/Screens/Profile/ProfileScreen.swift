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
    /// Nil while relics are off for this player, which hides the vault card.
    @State private var relics: RelicCollectionResponse?

    private var badgeCount: Int { badges.filter { $0.unlockedAt != nil }.count }
    private var badgeTotal: Int { badges.isEmpty ? badgeCatalogueCount : badges.count }
    private var unclaimed: Int { badges.filter { $0.unlockedAt != nil && $0.claimedAt == nil }.count }

    @Environment(\.openURL) private var openURL

    /// Design v3 (board frame Profile): no page title, the face and name lead;
    /// the balance and the two collections as rows divided by hairlines; the
    /// settings as one grouped block; the Discord as a plain row, not a
    /// brand-coloured button. No turn counts.
    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Spacer()
                    IconButton(t("settings.a11y"), action: { router.present(.settings) }) {
                        Image(systemName: "gearshape")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .frame(width: 36, height: 36)
                            .background(Theme.Colors.bgRaised, in: Circle())
                    }
                }
                .padding(.horizontal, Theme.pageGutter)

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        identityRow
                        hairline
                        balanceRow
                        hairline
                        if let relics {
                            collectionRow(
                                title: t("relics.card_label").sentenceCased,
                                note: t("relics.card_count", ["owned": relics.owned, "total": relics.total]),
                                art: AnyView(relicThumbs(relics))
                            ) { router.present(.relics(source: "profile")) }
                            hairline
                        }
                        collectionRow(
                            title: t("profile.badges"),
                            note: unclaimed > 0
                                ? t("profile.badges_unclaimed", ["count": unclaimed])
                                : t("profile.badges_summary", ["earned": badgeCount, "total": badgeTotal]),
                            art: AnyView(badgeThumbs)
                        ) { router.present(.badges) }

                        VStack(spacing: 0) {
                            SettingsRow(t("profile.session_settings"), icon: "slider.horizontal.3") { router.present(.settings) }
                            SettingsRow(t("settings.personalization"), icon: "heart") { router.present(.personalization) }
                            SettingsRow(t("profile.saved_worlds"), icon: "bookmark") { router.present(.savedWorlds) }
                            SettingsRow(t("profile.wallet"), icon: "creditcard") { router.present(.wallet(shortfall: nil)) }
                            SettingsRow(t("profile.report_history"), icon: "flag") { router.present(.reportHistory) }
                            SettingsRow(t("profile.blocked"), icon: "nosign") { router.present(.blockedPeople) }
                        }
                        .padding(.horizontal, Theme.Spacing.md)
                        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                        .padding(.top, Theme.Spacing.xl)

                        Button {
                            Haptic.play(.light)
                            Discord.open(source: "profile", with: openURL)
                        } label: {
                            HStack(spacing: 12) {
                                DiscordMark(size: 18)
                                    .foregroundStyle(Theme.Colors.textSecondary)
                                Text(t("community.join_discord"))
                                    .font(.system(size: 17))
                                    .foregroundStyle(Theme.Colors.textPrimary)
                                Spacer(minLength: 0)
                                Image(systemName: "arrow.up.right")
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundStyle(Theme.Colors.textMuted)
                            }
                            .padding(.horizontal, Theme.Spacing.md)
                            .frame(minHeight: 52)
                            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                        }
                        .buttonStyle(PressOpacityStyle())
                        .accessibilityLabel(t("community.join_discord_a11y"))
                        .accessibilityAddTraits(.isLink)
                        .padding(.top, Theme.Spacing.md)
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
        .task { await load() }
        .onChange(of: router.sheet) { _, sheet in if sheet == nil { Task { await load() } } }
        .onChange(of: store.isGuest) { _, _ in Task { await load() } }
    }

    // MARK: Rows

    private var hairline: some View {
        Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5)
    }

    /// The face, the name, one line of what you have done. A guest's row
    /// opens sign-in; a member's opens their information.
    private var identityRow: some View {
        Button {
            Haptic.play(.light)
            router.present(store.isGuest ? .signIn : .myInformation)
        } label: {
            HStack(spacing: 16) {
                avatar
                VStack(alignment: .leading, spacing: 3) {
                    Text(store.displayName ?? me?.displayName ?? t("profile.guest"))
                        .font(.system(size: 24, weight: .bold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                    Text(statsLine)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                }
                Spacer(minLength: 0)
            }
            .padding(.vertical, 16)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(store.isGuest ? t("profile.sign_in") : t("settings.my_information"))
    }

    /// The balance beside the crystal, and the way to add to it.
    private var balanceRow: some View {
        HStack {
            HStack(spacing: 6) {
                CreditGlyph(size: 26)
                Text(Format.credits(store.balance, locale: store.locale))
                    .font(.system(size: 28, weight: .bold))
                    .monospacedDigit()
                    .foregroundStyle(Theme.Colors.textPrimary)
            }
            .accessibilityElement(children: .combine)
            Spacer(minLength: Theme.Spacing.md)
            PBButton(t("profile.add_credits"), variant: .light, size: .medium, full: false) {
                router.present(.wallet(shortfall: nil))
            }
        }
        .padding(.vertical, 18)
    }

    private func collectionRow(title: String, note: String, art: AnyView, action: @escaping () -> Void) -> some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            HStack(spacing: 14) {
                art
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Text(note)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                }
                Spacer(minLength: 0)
                ChevronGlyph()
            }
            .padding(.vertical, 14)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
    }

    /// Three relics: your best finds first, then the shapes of what is left.
    private func relicThumbs(_ vault: RelicCollectionResponse) -> some View {
        let byRarity = { (a: RelicEntry, b: RelicEntry) in RelicRarity(a.rarity).sortIndex < RelicRarity(b.rarity).sortIndex }
        let owned = vault.relics.filter(\.owned).sorted(by: byRarity)
        let locked = vault.relics.filter { !$0.owned }.sorted(by: byRarity)
        let shown = Array((owned + locked).prefix(3))
        return HStack(spacing: 4) {
            ForEach(shown) { relic in
                RelicArt(url: relic.imageUrl, rarity: RelicRarity(relic.rarity), owned: relic.owned, animated: false)
                    .frame(width: 40, height: 40)
            }
        }
        .accessibilityHidden(true)
    }

    /// Three badges: earned first.
    private var badgeThumbs: some View {
        let ordered = badges.filter { $0.unlockedAt != nil } + badges.filter { $0.unlockedAt == nil && !$0.secret }
        return HStack(spacing: 4) {
            if ordered.isEmpty {
                Image(systemName: "star")
                    .font(.system(size: 18))
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .frame(width: 40, height: 40)
                    .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            }
            ForEach(Array(ordered.prefix(3)), id: \.id) { badge in
                Text(badge.icon)
                    .font(.system(size: 26))
                    .frame(width: 40, height: 40)
                    .opacity(badge.unlockedAt == nil ? 0.35 : 1)
            }
        }
        .accessibilityHidden(true)
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
        .frame(width: 64, height: 64)
        .clipShape(Circle())
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
        relics = try? await store.api.relics()
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
