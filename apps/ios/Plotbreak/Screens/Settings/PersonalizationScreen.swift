import SwiftUI

// MARK: - Personalization
//
// The genre picker, reached from Profile instead of from onboarding: the same
// screen as `TasteScreen`, preloaded with what the player already chose — the
// whole point is changing an answer, and a picker that opens empty reads as
// having lost it. Twin of `PersonalizationScreen` in
// `apps/mobile/src/screens/Settings.tsx`.

struct PersonalizationScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var picked: [String] = []
    @State private var seeded = false

    private var genres: [Genre] { store.bootstrap?.genres ?? [] }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(backLabel: t("misc.close"), backGlyph: "✕", onBack: { router.dismissSheet() })

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            Txt(t("settings.personalization"), .display)
                            Txt(t("onboarding.taste_body"), .body, color: Theme.Colors.textSecondary)
                        }

                        // Chip-shaped placeholders while the catalogue is still
                        // coming; an empty space under the heading reads as broken.
                        FlowLayout(spacing: Theme.Spacing.md) {
                            if genres.isEmpty {
                                ForEach([96, 120, 104, 88, 112, 92], id: \.self) { width in
                                    Skeleton(width: CGFloat(width), height: 44, radius: Theme.Radius.pill)
                                }
                            } else {
                                // The label is the *value*: `picked` holds labels and
                                // `setTastes` sends them, so the English word survives
                                // even when a French word is on the chip.
                                ForEach(genres) { genre in
                                    Chip(t.category(genre.id, fallback: genre.label), selected: picked.contains(genre.label)) {
                                        toggle(genre.label)
                                    }
                                }
                            }
                        }

                        // Reached from Personalization, the way out is the close
                        // button, not a "skip" that wipes the answers.
                        PBButton(t("settings.save_preferences")) {
                            store.setTastes(picked)
                            router.dismissSheet()
                        }
                        .padding(.top, Theme.Spacing.lg)
                    }
                    .padding(Theme.gutter)
                    .padding(.top, Theme.Spacing.lg)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
        .task {
            if !seeded {
                picked = store.tastes
                seeded = true
            }
            // Fetch again if boot did not get them. Once — a retry loop on an
            // empty catalogue would hammer the API.
            if genres.isEmpty { await store.refreshBootstrap() }
        }
    }

    private func toggle(_ genre: String) {
        if let index = picked.firstIndex(of: genre) {
            picked.remove(at: index)
        } else if picked.count < 5 {
            // Spec §6.2 — select 0 to 5.
            picked.append(genre)
        }
    }
}
