import SwiftUI

// MARK: - Blocked people
//
// The other half of blocking. Apple asks a user-generated-content app for a
// way to block abusive users; it does not ask for a way back, which is exactly
// why this screen has to exist — somebody who mis-taps a destructive menu item
// on a story they liked should not be stuck with the consequence forever.

struct BlockedPeopleScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var people: [BlockedPerson] = []
    @State private var loading = true
    @State private var working: String?

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("profile.blocked"), backLabel: t("misc.close"), backGlyph: "✕") {
                    router.dismissSheet()
                }

                if loading {
                    ProgressView().tint(Theme.Colors.accentPrimary).frame(maxHeight: .infinity)
                } else if people.isEmpty {
                    EmptyState(title: t("profile.blocked_empty"), message: t("profile.blocked_empty_body"))
                    Spacer()
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                            Txt(t("profile.blocked_body"), .bodyCompact, color: Theme.Colors.textSecondary)
                                .padding(.bottom, Theme.Spacing.sm)

                            ForEach(people) { person in
                                Card {
                                    HStack(spacing: Theme.Spacing.md) {
                                        Txt(
                                            person.displayName.isEmpty
                                                ? t("profile.blocked_unknown")
                                                : person.displayName,
                                            .bodyCompact
                                        )
                                        Spacer(minLength: Theme.Spacing.sm)
                                        PBButton(
                                            t("profile.unblock"),
                                            variant: .secondary,
                                            size: .medium,
                                            loading: working == person.userId,
                                            full: false
                                        ) {
                                            Task { await unblock(person) }
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
        .task { await load() }
    }

    private func load() async {
        people = (try? await store.api.blockedPeople().people) ?? []
        loading = false
    }

    private func unblock(_ person: BlockedPerson) async {
        working = person.userId
        defer { working = nil }
        guard (try? await store.api.unblockUser(person.userId)) != nil else { return }
        people.removeAll { $0.userId == person.userId }
    }
}
