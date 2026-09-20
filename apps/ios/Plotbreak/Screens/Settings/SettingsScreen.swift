import UIKit
import SwiftUI
import UserNotifications

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

                        SectionLabel(t("notifications.section"))
                            .padding(.top, 30)
                        remindersSection

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
                    Txt(t("notifications.denied"), .bodyCompact, color: Theme.Colors.textMuted)
                    Button(t("notifications.open_settings")) {
                        if let url = URL(string: UIApplication.openSettingsURLString) { openURL(url) }
                    }
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.accentPrimary)
                }
            }

            reminderToggle(
                label: t("notifications.daily_toggle"),
                help: t("notifications.daily_toggle_help"),
                isOn: $dailyReminder
            ) { ReminderSettings.standard.dailyCredits = $0 }

            reminderToggle(
                label: t("notifications.story_toggle"),
                help: t("notifications.story_toggle_help"),
                isOn: $storyReminder
            ) { ReminderSettings.standard.storyWaiting = $0 }
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
            Toggle(isOn: isOn) { Txt(label, .bodyCompact) }
                .tint(Theme.Colors.accentPrimary)
                .accessibilityLabel(label)
                .disabled(notificationStatus == .denied)
            Txt(help, .micro, color: Theme.Colors.textMuted)
        }
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
