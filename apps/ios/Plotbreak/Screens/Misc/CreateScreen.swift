import SwiftUI

// MARK: - Create
//
// CR-01 — what the world builder will be. Reached from the profile, not from a
// tab: it is not built, and a tab that only says "coming soon" spends a quarter
// of the navigation on something the player cannot do. Twin of `CreateScreen`
// in `apps/mobile/src/screens/Misc.tsx`.

struct CreateScreen: View {
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    private var sections: [(id: String, title: String, body: String)] {
        [
            ("concept", t("misc.create_concept"), t("misc.create_concept_body")),
            ("player_fantasy", t("misc.create_player_fantasy"), t("misc.create_player_fantasy_body")),
            ("world_rules", t("misc.create_world_rules"), t("misc.create_world_rules_body")),
            ("systems", t("misc.create_systems"), t("misc.create_systems_body")),
            ("cast", t("misc.create_cast"), t("misc.create_cast_body")),
            ("locations", t("misc.create_locations"), t("misc.create_locations_body")),
            ("progression", t("misc.create_progression"), t("misc.create_progression_body")),
            ("opening", t("misc.create_opening"), t("misc.create_opening_body")),
        ]
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Txt(t("misc.create_title"), .h1)
                    Spacer()
                    IconButton(t("misc.close"), glyph: "✕") { router.dismissSheet() }
                }
                .padding(.leading, Theme.gutter)
                .padding(.trailing, Theme.Spacing.sm)
                .padding(.bottom, Theme.Spacing.md)

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                        Card {
                            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                                Txt(t("misc.create_coming_title"), .h3)
                                Txt(t("misc.create_coming_body"), .bodyCompact, color: Theme.Colors.textSecondary)
                                Txt(t("misc.create_credits_body"), .bodyCompact, color: Theme.Colors.textSecondary)
                            }
                        }

                        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                            Txt(t("misc.create_what_you_define"), .h3)
                            ForEach(sections, id: \.id) { section in
                                HStack(alignment: .top, spacing: Theme.Spacing.md) {
                                    Circle()
                                        .fill(Theme.Colors.accentPrimary)
                                        .frame(width: 6, height: 6)
                                        .padding(.top, 8)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Txt(section.title, .bodyCompact)
                                        Txt(section.body, .micro, color: Theme.Colors.textMuted)
                                    }
                                }
                            }
                        }
                    }
                    .padding(Theme.gutter)
                    .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
    }
}
