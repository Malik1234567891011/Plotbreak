import SwiftUI

// MARK: - Settings
//
// The gear in the corner of Profile: the plumbing a player needs once, or
// once a year. Twin of `SettingsScreen` in `apps/mobile/src/screens/Settings.tsx`.
// Houses what the redesigned Profile card no longer shows: the display name,
// the language, sign-out and account deletion.

/// The languages, in their own language. Never translated — a language picker
/// that says "French" to someone looking for "Français" is the one string in
/// the app that must not be localized.
// i18n-exempt: each language named in its own language — see the note above
private let languageNames: [AppLocale: String] = [.en: "English", .fr: "Français"]

struct SettingsScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t
    @Environment(\.openURL) private var openURL

    @State private var name = ""
    @State private var seeded = false
    @State private var confirmSignOut = false
    @State private var confirmDeleteAccount = false
    @State private var accountDeleted = false
    @FocusState private var nameFocused: Bool

    private var trimmedName: String { name.trimmingCharacters(in: .whitespacesAndNewlines) }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("settings.title"), backLabel: t("misc.close"), backGlyph: "✕", onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        // What characters call you. Saved when the field loses focus.
                        SectionLabel(t("profile.display_name"))
                        HStack(spacing: Theme.Spacing.md) {
                            TextField(t("onboarding.name_placeholder"), text: $name)
                                .font(.system(size: 17))
                                .foregroundStyle(Theme.Colors.textPrimary)
                                .tint(Theme.Colors.accentPrimary)
                                .textInputAutocapitalization(.words)
                                .autocorrectionDisabled()
                                .submitLabel(.done)
                                .focused($nameFocused)
                                .onChange(of: name) { _, value in if value.count > 24 { name = String(value.prefix(24)) } }
                                .onChange(of: nameFocused) { _, focused in if !focused { saveName() } }
                                .onSubmit { saveName() }
                                .accessibilityLabel(t("profile.display_name"))
                            Text("\(name.count)/24")
                                .font(.system(size: 13, design: .monospaced))
                                .foregroundStyle(Theme.Colors.textDim)
                                .accessibilityHidden(true)
                        }
                        .fieldStyle(focused: nameFocused)
                        .padding(.top, Theme.Spacing.md)

                        SectionLabel(t("profile.language"))
                            .padding(.top, 30)
                        Txt(t("profile.language_hint"), .micro, color: Theme.Colors.textMuted)
                            .padding(.top, Theme.Spacing.xs)
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
                        .padding(.top, Theme.Spacing.md)
                        Txt(t("profile.language_current", ["name": languageNames[store.locale] ?? store.locale.rawValue]), .micro, color: Theme.Colors.textMuted)
                            .padding(.top, Theme.Spacing.sm)

                        SectionLabel(t("community.section"))
                            .padding(.top, 30)
                        DiscordButton(label: t("community.join_discord"), source: "settings")
                            .padding(.top, Theme.Spacing.md)

                        SectionLabel(t("profile.account"))
                            .padding(.top, 30)
                        VStack(spacing: 0) {
                            SettingsRow(t("settings.my_information"), icon: "person.text.rectangle") { router.present(.myInformation) }
                            SettingsRow(t("profile.report_history"), icon: "checkmark.shield") { router.present(.reportHistory) }
                            SettingsRow(t("profile.wallet"), icon: "creditcard") { router.present(.wallet(shortfall: nil)) }
                            // Only when they point somewhere. A dead legal link is
                            // the first thing App Store review taps.
                            if let legal = AppConfig.legalBaseURL {
                                SettingsRow(t("onboarding.terms"), icon: "doc.text") { openURL(legal.appendingPathComponent("terms")) }
                                SettingsRow(t("onboarding.privacy"), icon: "hand.raised") { openURL(legal.appendingPathComponent("privacy")) }
                            }
                        }
                        .padding(.top, 6)

                        HStack {
                            Txt(t("settings.app_version"), .bodyCompact, color: Theme.Colors.textSecondary)
                            Spacer()
                            Txt(AppConfig.appVersion, .bodyCompact, color: Theme.Colors.textMuted)
                        }
                        .padding(.vertical, 13)
                        .padding(.horizontal, Theme.Spacing.xs)

                        // A guest has nothing to sign out of, and saying so is
                        // kinder than a button that appears to do nothing.
                        if !store.isGuest {
                            PBButton(t("profile.sign_out"), variant: .outline) { confirmSignOut = true }
                                .padding(.top, Theme.Spacing.lg)
                        } else {
                            PBButton(t("profile.sign_in"), variant: .light) { router.present(.signIn) }
                                .padding(.top, Theme.Spacing.lg)
                        }

                        // PR-03 — deletion is available from inside the app (§23.3).
                        // Spec §25.8: one primary per region, and an irreversible
                        // action is not it.
                        PBButton(t("library.delete_account"), variant: .dangerQuiet, full: false, haptic: .warning) {
                            confirmDeleteAccount = true
                        }
                        .padding(.top, Theme.Spacing.md)
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, 18)
                    .padding(.bottom, Theme.Spacing.giant)
                }
                .scrollDismissesKeyboard(.interactively)
            }
        }
        .onAppear {
            if !seeded {
                name = store.displayName ?? ""
                seeded = true
            }
        }
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

    private func saveName() {
        guard !trimmedName.isEmpty, trimmedName != store.displayName else { return }
        Task { await store.setDisplayName(trimmedName) }
    }
}
