import SwiftUI

// MARK: - My information
//
// The two things the app actually knows about a person: an account and an age
// band. Deliberately short — a screen padded out with invented fields would be
// claiming to hold more than it does. Twin of `MyInformationScreen` in
// `apps/mobile/src/screens/Settings.tsx`.
//
// Design v3: the 28pt bold page title, then the two facts as one group of
// settings rows (filled, 12pt, no outline).

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
                    VStack(alignment: .leading, spacing: 0) {
                        Text(t("settings.my_information"))
                            .font(.system(size: 28, weight: .bold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .accessibilityAddTraits(.isHeader)

                        VStack(spacing: 0) {
                            // An Apple relay address is still the address, and showing
                            // it is how somebody recognises which account they are in.
                            fact(
                                label: t("settings.account"),
                                value: store.email ?? (store.isGuest ? t("settings.account_guest") : t("settings.account_unknown")),
                                hint: store.isGuest ? t("settings.account_guest_hint") : nil
                            )
                            Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5)
                            fact(
                                label: t("settings.age_range"),
                                value: ageKey.map { t($0) } ?? t("settings.age_unknown"),
                                hint: t("settings.age_hint")
                            )
                        }
                        .padding(.horizontal, Theme.Spacing.lg)
                        .settingsGroup()
                        .padding(.top, Theme.Spacing.xl)
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.xs)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
    }

    /// One fact: what it is, quiet, over its value, with a line of why under it.
    private func fact(label: String, value: String, hint: String?) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(label)
                .font(.system(size: 13))
                .foregroundStyle(Theme.Colors.textMuted)
            Text(value)
                .font(.system(size: 17))
                .foregroundStyle(Theme.Colors.textPrimary)
                .fixedSize(horizontal: false, vertical: true)
            if let hint {
                Text(hint)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.top, 2)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.vertical, 14)
        .accessibilityElement(children: .combine)
    }
}
