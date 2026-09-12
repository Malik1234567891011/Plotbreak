import SwiftUI

// MARK: - Settings
//
// The gear in the corner of Profile: the plumbing a player needs once, or
// once a year. Twin of `SettingsScreen` in `apps/mobile/src/screens/Settings.tsx`.

struct SettingsScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t
    @Environment(\.openURL) private var openURL

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(backLabel: t("misc.close"), backGlyph: "✕", onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        Txt(t("settings.title"), .h1)

                        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                            LinkRow(t("settings.my_information")) { router.present(.myInformation) }
                            LinkRow(t("profile.report_history")) { router.present(.reportHistory) }
                            LinkRow(t("profile.wallet")) { router.present(.wallet(shortfall: nil)) }
                        }

                        PBDivider()

                        // Only when they point somewhere. A dead legal link is
                        // the first thing App Store review taps.
                        if let legal = AppConfig.legalBaseURL {
                            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                                LinkRow(t("onboarding.terms")) { openURL(legal.appendingPathComponent("terms")) }
                                LinkRow(t("onboarding.privacy")) { openURL(legal.appendingPathComponent("privacy")) }
                            }
                            PBDivider()
                        }

                        HStack {
                            Txt(t("settings.app_version"), .body, color: Theme.Colors.textSecondary)
                            Spacer()
                            Txt(AppConfig.appVersion, .body, color: Theme.Colors.textMuted)
                        }
                        .padding(.vertical, Theme.Spacing.sm)

                        // A guest has nothing to sign out of, and saying so is
                        // kinder than a button that appears to do nothing.
                        if !store.isGuest {
                            Button {
                                Haptic.play(.light)
                                Task { await store.signOut() }
                            } label: {
                                Txt(t("profile.sign_out"), .body, color: Theme.Colors.warning)
                                    .padding(.vertical, Theme.Spacing.md)
                            }
                            .buttonStyle(PressOpacityStyle())
                        }

                        Spacer(minLength: Theme.Spacing.xl)
                    }
                    .padding(Theme.gutter)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
    }
}
