import SwiftUI

// MARK: - Profile
//
// PR-01 / PR-02 / PR-03 — public and private cleanly separated. Twin of
// `ProfileScreen` in `apps/mobile/src/screens/LibraryProfile.tsx`.

/// The languages, in their own language. Never translated — a language picker
/// that says "French" to someone looking for "Français" is the one string in
/// the app that must not be localized.
private let languageNames: [AppLocale: String] = [.en: "English", .fr: "Français"]

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
    @State private var confirmSignOut = false
    @State private var confirmDeleteAccount = false
    @State private var accountDeleted = false

    private var badgeCount: Int { badges.filter { $0.unlockedAt != nil }.count }
    private var badgeTotal: Int { badges.isEmpty ? badgeCatalogueCount : badges.count }
    private var unclaimed: Int { badges.filter { $0.unlockedAt != nil && $0.claimedAt == nil }.count }

    var body: some View {
        Screen {
            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                    header
                    identityCard
                    if let me { stats(me) }
                    if !characters.isEmpty { charactersRail }
                    PBDivider()
                    language
                    badgesCard
                    VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                        Txt(t("profile.service"), .h3)
                        LinkRow(t("settings.personalization")) { router.present(.personalization) }
                    }
                    PBDivider()
                    VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                        Txt(t("profile.privacy_safety"), .h3)
                        LinkRow(t("profile.report_history")) { router.present(.reportHistory) }
                        LinkRow(t("profile.creator_teaser")) { router.present(.create) }
                        LinkRow(t("profile.wallet")) { router.present(.wallet(shortfall: nil)) }
                    }
                    PBDivider()
                    account
                }
                .padding(Theme.gutter)
                .padding(.bottom, Theme.Spacing.giant)
            }
        }
        .task { await load() }
        .onChange(of: router.sheet) { _, sheet in if sheet == nil { Task { await load() } } }
        .onChange(of: store.isGuest) { _, _ in Task { await load() } }
        .alert(t("profile.sign_out_confirm_title"), isPresented: $confirmSignOut) {
            Button(t("library.sign_out_stay"), role: .cancel) {}
            Button(t("profile.sign_out")) { Task { await store.signOut() } }
        } message: {
            Text(t("library.sign_out_confirm_body"))
        }
        .alert(t("library.delete_account_confirm_title"), isPresented: $confirmDeleteAccount) {
            Button(t("library.delete_account_keep"), role: .cancel) {}
            Button(t("library.delete_account_confirm"), role: .destructive) {
                Task {
                    if (try? await store.api.deleteAccount()) != nil { accountDeleted = true }
                }
            }
        } message: {
            Text(t("library.delete_account_confirm_body"))
        }
        .alert(t("library.account_deleted_title"), isPresented: $accountDeleted) {} message: {
            Text(t("library.account_deleted_body"))
        }
    }

    // MARK: Sections

    private var header: some View {
        HStack(alignment: .center) {
            Txt(t("profile.title"), .h1)
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: Theme.Spacing.sm)
            CreditBalance(balance: store.balance, locale: store.locale) {
                router.present(.wallet(shortfall: nil))
            }
            IconButton(t("settings.a11y"), action: { router.present(.settings) }) {
                Image(systemName: "gearshape.fill")
                    .font(.system(size: 20, weight: .medium))
                    .foregroundStyle(Theme.Colors.textSecondary)
            }
        }
    }

    private var identityCard: some View {
        Card {
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                Txt(me?.displayName ?? t("profile.guest"), .h3)
                if store.isGuest {
                    Txt(t("profile.guest_explainer"), .caption, color: Theme.Colors.textSecondary)
                    PBButton(t("profile.sign_in"), variant: .secondary) { router.present(.signIn) }
                        .padding(.top, Theme.Spacing.sm)
                } else {
                    Txt(me?.email ?? me?.handle ?? store.email ?? "", .caption, color: Theme.Colors.textSecondary)
                    PBButton(t("profile.sign_out"), variant: .tertiary, full: false) { confirmSignOut = true }
                        .padding(.top, Theme.Spacing.sm)
                }
            }
        }
    }

    /// What a *player* has done. `worldsCreated` is deliberately absent —
    /// creator publishing is not a thing we ship, and a permanent `0 CREATED`
    /// tells the player about a feature they cannot have.
    private func stats(_ me: MeResponse) -> some View {
        HStack {
            Spacer()
            Stat(label: t("library.stat_worlds"), value: me.stats.storiesPlayed)
            Spacer()
            Stat(label: t("library.stat_turns"), value: me.stats.turnsPlayed)
            Spacer()
            Stat(label: t("library.stat_badges"), value: badgeCount)
            Spacer()
        }
    }

    /// Who you have been, across worlds. Spec §9.3 portraits live here.
    private var charactersRail: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            HStack {
                Txt(t("library.your_characters"), .h3)
                Spacer()
                Button { router.present(.characters) } label: {
                    Txt(t("library.see_all"), .caption, color: Theme.Colors.accentPrimary)
                }
                .buttonStyle(PressOpacityStyle())
            }
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: Theme.Spacing.md) {
                    ForEach(characters) { character in
                        Button {
                            Haptic.play(.light)
                            router.present(.characters)
                        } label: {
                            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                Group {
                                    if let portrait = character.portraitUrl {
                                        RemoteImage(portrait.assetURL)
                                    } else {
                                        StoryArt(seed: character.sessionId, title: character.displayName, uri: nil) {
                                            Txt(t("library.tap_to_draw"), .micro, color: Theme.Colors.textMuted, center: true)
                                                .padding(Theme.Spacing.xs)
                                        }
                                    }
                                }
                                .frame(width: 108, height: 135)
                                .background(Theme.Colors.bgRaised)
                                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))

                                Txt(character.displayName, .caption, lineLimit: 1)
                                Txt(character.storyTitle, .micro, color: Theme.Colors.textMuted, lineLimit: 1)
                            }
                            .frame(width: 108, alignment: .leading)
                        }
                        .buttonStyle(PressOpacityStyle())
                        .accessibilityLabel(t("library.character_in_story_a11y", ["name": character.displayName, "story": character.storyTitle]))
                    }
                }
            }
        }
    }

    private var language: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("profile.language"), .h3)
            Txt(t("profile.language_hint"), .micro, color: Theme.Colors.textMuted)
            HStack(spacing: Theme.Spacing.sm) {
                Chip(t("profile.language_device"), selected: store.localeChoice == nil) {
                    Task { await store.setLocale(nil) }
                }
                ForEach(AppLocale.allCases, id: \.self) { code in
                    Chip(languageNames[code] ?? code.rawValue, selected: store.localeChoice == code) {
                        Task { await store.setLocale(code) }
                    }
                }
            }
            Txt(t("profile.language_current", ["name": languageNames[store.locale] ?? store.locale.rawValue]), .micro, color: Theme.Colors.textMuted)
        }
    }

    /// Badges, with what is waiting to be collected said plainly.
    private var badgesCard: some View {
        Button {
            Haptic.play(.light)
            router.present(.badges)
        } label: {
            Card {
                HStack(alignment: .center) {
                    VStack(alignment: .leading, spacing: 2) {
                        Txt(t("profile.badges"), .body)
                        Txt(
                            unclaimed > 0
                                ? t("profile.badges_unclaimed", ["count": unclaimed])
                                : t("profile.badges_summary", ["earned": badgeCount, "total": badgeTotal]),
                            .micro, color: Theme.Colors.textMuted
                        )
                    }
                    Spacer()
                    Txt("›", .h3, color: Theme.Colors.textMuted)
                }
            }
        }
        .buttonStyle(PressOpacityStyle())
    }

    /// PR-03 — deletion is available from inside the app (§23.3). Spec §25.8:
    /// one primary per region, and an irreversible action is not it.
    private var account: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("profile.account"), .h3)
            PBButton(t("library.delete_account"), variant: .dangerQuiet, full: false, haptic: .warning) {
                confirmDeleteAccount = true
            }
        }
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

private struct Stat: View {
    @Environment(AppStore.self) private var store
    let label: String
    let value: Int

    var body: some View {
        VStack(spacing: 2) {
            Txt(Format.number(value, locale: store.locale), .h2)
            Txt(label.uppercased(), .micro, color: Theme.Colors.textMuted)
        }
    }
}

/// A settings-style row with a chevron. Shared by Profile and Settings.
struct LinkRow: View {
    let label: String
    let action: () -> Void

    init(_ label: String, action: @escaping () -> Void) {
        self.label = label
        self.action = action
    }

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            HStack {
                Txt(label, .bodyCompact)
                Spacer()
                Txt("›", .body, color: Theme.Colors.textMuted)
            }
            .padding(.vertical, Theme.Spacing.sm)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(label)
    }
}
