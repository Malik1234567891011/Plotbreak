import UIKit
import SwiftUI
import UserNotifications

// MARK: - Settings
//
// The gear in the corner of Profile: the plumbing a player needs once, or
// once a year. Twin of `SettingsScreen` in `apps/mobile/src/screens/Settings.tsx`.
// Houses what the redesigned Profile card no longer shows: the display name,
// the language, sign-out and account deletion.
//
// Design v3 (docs/design-v3/AUDIT.md, rule 2): grouped settings rows are the
// one place a filled box is allowed. Each group is one `bgElevated` block at a
// 12pt corner (the Profile pattern), with no outlines. Sign in is the one white
// primary; Sign out is the filled secondary; Delete account is quiet red text.

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
    @Environment(\.scenePhase) private var scenePhase

    @State private var name = ""
    @State private var seeded = false
    @State private var confirmSignOut = false
    /// Mirrors of `ReminderSettings`, so the switches move when tapped. The
    /// store is the truth; these exist because SwiftUI needs something
    /// observable to bind to.
    @State private var dailyReminder = ReminderSettings.standard.dailyCredits
    @State private var storyReminder = ReminderSettings.standard.storyWaiting
    /// What iOS says about notifications. `notDetermined` is its own case and
    /// not a synonym for "off": somebody who has never been asked still has
    /// working switches, and flipping one on is what asks them.
    @State private var notificationStatus: UNAuthorizationStatus = .notDetermined
    @State private var confirmDeleteAccount = false
    @State private var accountDeleted = false
    @FocusState private var nameFocused: Bool

    private var trimmedName: String { name.trimmingCharacters(in: .whitespacesAndNewlines) }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(backLabel: t("misc.close"), backGlyph: "✕", onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        Text(t("settings.title"))
                            .font(.system(size: 28, weight: .bold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .accessibilityAddTraits(.isHeader)

                        // What characters call you. Saved when the field loses focus.
                        SectionLabel(t("profile.display_name"))
                            .padding(.top, Theme.Spacing.xxl)
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
                            Text(verbatim: "\(name.count)/24")
                                .font(.system(size: 13))
                                .monospacedDigit()
                                .foregroundStyle(Theme.Colors.textDim)
                                .accessibilityHidden(true)
                        }
                        .padding(.horizontal, Theme.Spacing.lg)
                        .frame(minHeight: 52)
                        .settingsGroup()
                        .padding(.top, Theme.Spacing.md)

                        SectionLabel(t("profile.language"))
                            .padding(.top, Theme.Spacing.xxxl)
                        Text(t("profile.language_hint"))
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.Colors.textMuted)
                            .fixedSize(horizontal: false, vertical: true)
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
                        Text(t("profile.language_current", ["name": languageNames[store.locale] ?? store.locale.rawValue]))
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.Colors.textMuted)
                            .padding(.top, Theme.Spacing.sm)

                        SectionLabel(t("notifications.section"))
                            .padding(.top, Theme.Spacing.xxxl)
                        remindersSection

                        SectionLabel(t("community.section"))
                            .padding(.top, Theme.Spacing.xxxl)
                        discordRow
                            .padding(.top, Theme.Spacing.md)

                        // The account rows and the app version: one group.
                        SectionLabel(t("profile.account"))
                            .padding(.top, Theme.Spacing.xxxl)
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
                            HStack(spacing: Theme.Spacing.lg) {
                                Image(systemName: "info.circle")
                                    .font(.system(size: 18, weight: .regular))
                                    .foregroundStyle(Theme.Colors.textSecondary)
                                    .frame(width: 24, height: 24)
                                Text(t("settings.app_version"))
                                    .font(.system(size: 15))
                                    .foregroundStyle(Theme.Colors.textPrimary)
                                Spacer(minLength: Theme.Spacing.sm)
                                Text(verbatim: AppConfig.appVersion)
                                    .font(.system(size: 15))
                                    .monospacedDigit()
                                    .foregroundStyle(Theme.Colors.textMuted)
                            }
                            .padding(.vertical, 13)
                            .padding(.horizontal, Theme.Spacing.xs)
                            .accessibilityElement(children: .combine)
                        }
                        .padding(.horizontal, Theme.Spacing.md)
                        .settingsGroup()
                        .padding(.top, Theme.Spacing.md)

                        // A guest has nothing to sign out of, and saying so is
                        // kinder than a button that appears to do nothing.
                        if !store.isGuest {
                            PBButton(t("profile.sign_out"), variant: .secondary) { confirmSignOut = true }
                                .padding(.top, Theme.Spacing.xxl)
                        } else {
                            PBButton(t("profile.sign_in"), variant: .light) { router.present(.signIn) }
                                .padding(.top, Theme.Spacing.xxl)
                        }

                        // PR-03 — deletion is available from inside the app (§23.3).
                        // Spec §25.8: one primary per region, and an irreversible
                        // action is not it: quiet red text, no box.
                        Button {
                            Haptic.play(.warning)
                            confirmDeleteAccount = true
                        } label: {
                            Text(t("library.delete_account"))
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.Colors.danger)
                                .frame(minHeight: Theme.minTouchTarget)
                                .contentShape(Rectangle())
                        }
                        .buttonStyle(PressOpacityStyle())
                        .padding(.top, Theme.Spacing.md)
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.xs)
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

    // MARK: Community

    /// The Discord as a plain row in its own group (as on Profile), not a
    /// brand-coloured button: the art is the only loud thing.
    private var discordRow: some View {
        Button {
            Haptic.play(.light)
            Discord.open(source: "settings", with: openURL)
        } label: {
            HStack(spacing: Theme.Spacing.lg) {
                DiscordMark(size: 20)
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .frame(width: 24, height: 24)
                Text(t("community.join_discord"))
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.textPrimary)
                Spacer(minLength: 0)
                Image(systemName: "arrow.up.right")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textMuted)
            }
            .padding(.horizontal, Theme.Spacing.md + Theme.Spacing.xs)
            .frame(minHeight: 50)
            .settingsGroup()
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(t("community.join_discord_a11y"))
        .accessibilityAddTraits(.isLink)
    }

    // MARK: Reminders

    /// Two switches and, when iOS has the last word, a way to go change it.
    ///
    /// Flipping either one re-arms immediately rather than on the next launch:
    /// somebody who just turned the story reminder off should not get one
    /// tomorrow morning because the app had not been relaunched.
    private var remindersSection: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            // Only when iOS has actually refused. Saying this to somebody who
            // has simply never been asked would be telling them to go fix
            // something that is not broken.
            if notificationStatus == .denied {
                VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                    Text(t("notifications.denied"))
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .fixedSize(horizontal: false, vertical: true)
                    Button(t("notifications.open_settings")) {
                        if let url = URL(string: UIApplication.openSettingsURLString) { openURL(url) }
                    }
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                }
            }

            VStack(spacing: 0) {
                reminderToggle(
                    label: t("notifications.daily_toggle"),
                    help: t("notifications.daily_toggle_help"),
                    isOn: $dailyReminder
                ) { ReminderSettings.standard.dailyCredits = $0 }
                Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5)
                reminderToggle(
                    label: t("notifications.story_toggle"),
                    help: t("notifications.story_toggle_help"),
                    isOn: $storyReminder
                ) { ReminderSettings.standard.storyWaiting = $0 }
            }
            .padding(.horizontal, Theme.Spacing.lg)
            .settingsGroup()
        }
        .padding(.top, Theme.Spacing.md)
        .task { notificationStatus = await Reminders.authorizationStatus() }
        // Coming back from iOS Settings having turned notifications on is the
        // whole point of the link above, and `.task` does not run again for it.
        .onChange(of: scenePhase) { _, phase in
            guard phase == .active else { return }
            Task {
                notificationStatus = await Reminders.authorizationStatus()
                await store.refreshReminders()
            }
        }
    }

    private func reminderToggle(
        label: String,
        help: String,
        isOn: Binding<Bool>,
        save: @escaping (Bool) -> Void
    ) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Toggle(isOn: isOn) {
                Text(label)
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.textPrimary)
            }
            .tint(Theme.Colors.accentPrimary)
            .accessibilityLabel(label)
            .disabled(notificationStatus == .denied)
            Text(help)
                .font(.system(size: 13))
                .foregroundStyle(Theme.Colors.textMuted)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(.vertical, Theme.Spacing.md)
        .onChange(of: isOn.wrappedValue) { _, value in
            save(value)
            Task {
                // Turning one on before iOS has ever been asked is a clearer
                // yes than any pre-prompt, so it is the moment to ask.
                if value, notificationStatus == .notDetermined {
                    ReminderSettings.standard.hasAsked = true
                    await Reminders.requestAuthorization()
                    notificationStatus = await Reminders.authorizationStatus()
                }
                await store.refreshReminders()
            }
        }
    }

    private func saveName() {
        guard !trimmedName.isEmpty, trimmedName != store.displayName else { return }
        Task { await store.setDisplayName(trimmedName) }
    }
}

extension View {
    /// Design v3: a group of settings rows, filled `bgElevated` at a 12pt
    /// corner with no outline (the Profile pattern).
    func settingsGroup() -> some View {
        frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
    }
}
