import SwiftUI

// MARK: - Personalization
//
// "What you like", reached from Profile: the same two questions as the
// onboarding step — audience and genres — preloaded with what the player
// already chose. A picker that opens empty reads as having lost the answer.
// Twin of `PersonalizationScreen` in `apps/mobile/src/screens/Settings.tsx`.

struct PersonalizationScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var audience: String?
    @State private var picked: [String] = []
    @State private var seeded = false

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("settings.personalization"), backLabel: t("misc.close"), backGlyph: "✕", onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        AudienceGenresPicker(audience: $audience, picked: $picked)
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.xxl)
                    .padding(.bottom, Theme.Spacing.xxl)
                    .frame(maxWidth: .infinity, alignment: .leading)
                }

                // Reached from Personalization, the way out is the close
                // button, not a "skip" that wipes the answers.
                PBButton(t("settings.save_preferences"), variant: .light) {
                    store.setTastes(picked)
                    Task { await store.setAudience(audience) }
                    router.dismissSheet()
                }
                .padding(.horizontal, Theme.pageGutter)
                .padding(.bottom, Theme.Spacing.md)
            }
        }
        .task {
            if !seeded {
                audience = store.audience
                picked = store.tastes
                seeded = true
            }
            // Fetch again if boot did not get them. Once — a retry loop on an
            // empty catalogue would hammer the API.
            if (store.bootstrap?.genres ?? []).isEmpty { await store.refreshBootstrap() }
        }
    }
}
