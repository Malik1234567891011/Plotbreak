import SwiftUI

// MARK: - My information
//
// The two things the app actually knows about a person: an account and an age
// band. Deliberately short — a screen padded out with invented fields would be
// claiming to hold more than it does. Twin of `MyInformationScreen` in
// `apps/mobile/src/screens/Settings.tsx`.

struct MyInformationScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    private static let ageLabels: [String: TranslationKey] = [
        "under13": "onboarding.age_band_under_13",
        "13_17": "onboarding.age_band_13_17",
        "18_24": "onboarding.age_band_18_24",
        "25plus": "onboarding.age_band_25_plus",
    ]

    var body: some View {
        let ageKey = store.ageBand.flatMap { Self.ageLabels[$0] }
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(backLabel: t("misc.close"), backGlyph: "✕", onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                        Txt(t("settings.my_information"), .h1)

                        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                            Txt(t("settings.account"), .micro, color: Theme.Colors.textMuted)
                            // An Apple relay address is still the address, and showing
                            // it is how somebody recognises which account they are in.
                            Txt(store.email ?? (store.isGuest ? t("settings.account_guest") : t("settings.account_unknown")), .body)
                            if store.isGuest {
                                Txt(t("settings.account_guest_hint"), .caption, color: Theme.Colors.textMuted)
                            }
                        }

                        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                            Txt(t("settings.age_range"), .micro, color: Theme.Colors.textMuted)
                            Txt(ageKey.map { t($0) } ?? t("settings.age_unknown"), .body)
                            Txt(t("settings.age_hint"), .caption, color: Theme.Colors.textMuted)
                        }

                        Spacer(minLength: Theme.Spacing.lg)
                    }
                    .padding(Theme.gutter)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
    }
}
