import SwiftUI

// MARK: - IdentitySheet
//
// "Who are you?", asked of somebody who has already met the cast.
//
// Character setup used to be mandatory and came first, which meant the player
// was configuring an abstraction: they had read a cover and a premise and were
// being asked to invent a person to put inside them. `Play` now starts the
// story with a sensible default, and this is where that decision actually gets
// made — after a scene or ten, when "who do I want to be here" is a question
// the player has the context to answer and some reason to care about.
//
// Deliberately small. Name, how you are addressed, and the background the world
// assumes about you. Everything the full setup screen collects beyond this is
// either read by nothing in the production narrative path or belongs to the
// portrait generator, and a long form here would recreate the problem this
// change exists to remove.

struct IdentitySheet: View {
    let sessionId: String
    /// Null for a world that names its own protagonist — the fields it would
    /// edit are canon there, and the server refuses them.
    let identity: PlayerIdentity
    let onSaved: (PlayerIdentity) -> Void

    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    @Environment(\.dismiss) private var dismiss

    @State private var displayName: String = ""
    @State private var pronouns: String = ""
    @State private var about: String = ""
    @State private var archetypeId: String?
    @State private var saving = false
    @State private var error: String?
    /// Loaded here rather than passed in: the world sheet does not carry the
    /// story's backgrounds, and a caller that had to fetch them first would
    /// make opening this sheet somebody else's problem.
    @State private var archetypes: [SetupArchetype] = []
    @State private var namedProtagonist = false

    private var trimmedName: String { displayName.trimmingCharacters(in: .whitespacesAndNewlines) }
    private var canSave: Bool { (namedProtagonist || !trimmedName.isEmpty) && !saving }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("identity.title"), backLabel: t("wallet.close"),
                             backGlyph: "✕", onBack: { dismiss() })

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                        Txt(t("identity.blurb"), .bodyCompact, color: Theme.Colors.textSecondary)

                        if !namedProtagonist {
                            VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                                SetupField(label: t("setup.name_label"), value: $displayName,
                                           placeholder: t("setup.name_placeholder"), maxLength: 40, required: true)
                                SetupField(label: t("setup.pronouns_label"), value: $pronouns,
                                           placeholder: t("setup.pronouns_placeholder"), maxLength: 24)
                            }
                        }

                        SetupField(label: t("setup.about_label"), value: $about,
                                   placeholder: t("setup.about_placeholder"),
                                   maxLength: 300, multiline: true)

                        if !archetypes.isEmpty {
                            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                                Txt(t("identity.background"), .h3)
                                Txt(t("identity.background_hint"), .caption, color: Theme.Colors.textSecondary)
                                ForEach(archetypes) { option in
                                    let selected = archetypeId == option.id
                                    Button {
                                        Haptic.play(.light)
                                        archetypeId = option.id
                                    } label: {
                                        SelectableCard(selected: selected) {
                                            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                                Txt(option.name, .bodyStrong,
                                                    color: selected ? Theme.Colors.accentPrimary : Theme.Colors.textPrimary)
                                                Txt(option.summary, .caption, color: Theme.Colors.textMuted)
                                            }
                                        }
                                    }
                                    .buttonStyle(PressOpacityStyle(pressed: 0.85))
                                }
                            }
                        }

                        if let error {
                            Txt(error, .bodyCompact, color: Theme.Colors.danger)
                        }
                    }
                    .padding(Theme.gutter)
                    .padding(.bottom, Theme.Spacing.giant)
                }
                .scrollDismissesKeyboard(.interactively)

                VStack(spacing: Theme.Spacing.sm) {
                    PBDivider()
                    PBButton(t("identity.save"), loadingLabel: t("identity.saving"),
                             loading: saving, disabled: !canSave) {
                        Task { await save() }
                    }
                    .padding(.top, Theme.Spacing.xs)
                    // Said plainly, because it is the one thing somebody might
                    // reasonably fear: that renaming themselves rewrites what
                    // they have already read.
                    Txt(t("identity.applies_next"), .micro, color: Theme.Colors.textMuted, center: true)
                        .padding(.bottom, Theme.Spacing.sm)
                }
                .padding(.horizontal, Theme.gutter)
                .background(Theme.Colors.bgBase)
            }
        }
        .task {
            displayName = identity.displayName
            pronouns = identity.pronouns
            about = identity.worldKnowsAboutYou
            archetypeId = identity.archetypeId

            guard let detail = try? await store.api.session(sessionId),
                  let story = try? await store.api.storyDetail(detail.session.storyId) else { return }
            archetypes = story.archetypes
            namedProtagonist = story.protagonist?.kind == .NAMED
        }
    }

    private func save() async {
        saving = true
        error = nil
        var body = UpdateIdentityBody()
        if !namedProtagonist {
            body.displayName = trimmedName
            body.pronouns = pronouns.trimmingCharacters(in: .whitespacesAndNewlines)
        }
        body.worldKnowsAboutYou = String(about.trimmingCharacters(in: .whitespacesAndNewlines).prefix(300))
        body.archetypeId = archetypeId

        do {
            let response = try await store.api.updateIdentity(sessionId, body)
            if !namedProtagonist {
                store.rememberHero(HeroDefaults(
                    name: response.identity.displayName,
                    pronouns: response.identity.pronouns,
                    grammar: store.lastHero.grammar
                ))
            }
            Haptic.play(.success)
            onSaved(response.identity)
            dismiss()
        } catch {
            self.error = error.playerMessage
            saving = false
        }
    }
}
