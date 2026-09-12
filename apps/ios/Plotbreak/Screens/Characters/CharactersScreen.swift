import SwiftUI

// MARK: - CharactersScreen
//
// "Your characters" — every player character across every world. Twin of
// `apps/mobile/src/screens/Characters.tsx`.
//
// Spec §9.3 offers a generated portrait after the first session begins. This is
// where those live: a run shown as a person, with the canon the engine actually
// recorded for them, rather than as a save slot with a timestamp.

struct CharactersScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var characters: [PlayerCharacterCard]?

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Txt(t("characters.title"), .h2)
                    Spacer(minLength: 0)
                    IconButton(t("characters.close"), glyph: "✕") { router.dismissSheet() }
                }
                .padding(.horizontal, Theme.gutter)

                if let characters {
                    if characters.isEmpty {
                        EmptyState(
                            title: t("characters.empty_title"),
                            message: t("characters.empty_body"),
                            actionLabel: t("characters.empty_action")
                        ) {
                            router.dismissSheet()
                            router.popToRoot()
                            router.tab = .discover
                        }
                        Spacer()
                    } else {
                        ScrollView {
                            VStack(spacing: Theme.Spacing.lg) {
                                ForEach(characters) { character in
                                    CharacterCard(
                                        character: character,
                                        onOpen: {
                                            router.dismissSheet()
                                            router.push(.session(sessionId: character.sessionId))
                                        },
                                        onChanged: { Task { await load() } },
                                        onNeedCredits: { shortfall in router.present(.wallet(shortfall: shortfall)) }
                                    )
                                }
                            }
                            .padding(Theme.gutter)
                            .padding(.bottom, Theme.Spacing.giant)
                        }
                    }
                } else {
                    VStack(spacing: Theme.Spacing.md) {
                        Skeleton(height: 190)
                        Skeleton(height: 190)
                        Spacer()
                    }
                    .padding(Theme.gutter)
                }
            }
        }
        .task { await load() }
    }

    private func load() async {
        do {
            characters = try await store.api.myCharacters().characters
        } catch {
            characters = []
        }
    }
}

// MARK: - CharacterCard

struct CharacterCard: View {
    let character: PlayerCharacterCard
    let onOpen: () -> Void
    let onChanged: () -> Void
    let onNeedCredits: (Int) -> Void

    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    @State private var busy = false
    @State private var editing = false
    @State private var note: String
    @State private var error: String?
    // Cache-bust after a regeneration so the new variant actually shows.
    @State private var version = 0

    init(character: PlayerCharacterCard, onOpen: @escaping () -> Void, onChanged: @escaping () -> Void, onNeedCredits: @escaping (Int) -> Void) {
        self.character = character
        self.onOpen = onOpen
        self.onChanged = onChanged
        self.onNeedCredits = onNeedCredits
        _note = State(initialValue: character.appearanceNote)
    }

    private var hasPortrait: Bool { character.portraitUrl != nil }

    private var portraitURL: URL? {
        guard let url = character.portraitUrl else { return nil }
        return "\(url)?v=\(version)".assetURL
    }

    var body: some View {
        Card(padded: false) {
            VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                HStack(alignment: .top, spacing: Theme.Spacing.lg) {
                    Button(action: onOpen) {
                        Group {
                            if hasPortrait {
                                // Native 2:3, so the drawing the player paid for is not
                                // cropped on the one screen that exists to show it.
                                RemoteImage(portraitURL)
                            } else {
                                StoryArt(seed: character.sessionId, title: character.displayName, uri: nil) {
                                    Txt(t("characters.no_portrait_yet"), .micro, color: Theme.Colors.textMuted, center: true)
                                        .padding(Theme.Spacing.sm)
                                }
                            }
                        }
                        .frame(width: 136, height: 204)
                        .background(Theme.Colors.bgRaised)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                    }
                    .buttonStyle(PressScaleStyle())
                    .accessibilityLabel(t(hasPortrait ? "characters.portrait_a11y" : "characters.no_portrait_a11y", ["name": character.displayName]))

                    VStack(alignment: .leading, spacing: 4) {
                        Txt(character.displayName, .h3)
                        Txt([character.archetypeName, character.pronouns].compactMap { $0 }.filter { !$0.isEmpty }.joined(separator: " · "),
                            .caption, color: Theme.Colors.accentSecondary)
                        Txt(t("characters.story_and_turns", ["title": character.storyTitle, "count": character.turnCount]),
                            .micro, color: Theme.Colors.textMuted)
                        if !character.locationName.isEmpty {
                            Txt(t("characters.currently_at", ["location": character.locationName]), .micro, color: Theme.Colors.textMuted)
                        }
                    }
                    Spacer(minLength: 0)
                }
                .padding(.horizontal, Theme.gutter)
                .padding(.top, Theme.gutter)

                if !character.worldKnowsAboutYou.isEmpty {
                    Txt("“\(character.worldKnowsAboutYou)”", .bodyCompact, color: Theme.Colors.textSecondary, serif: true)
                        .padding(.horizontal, Theme.gutter)
                }

                // Engine-recorded canon, not a summary of prose.
                if !character.canon.isEmpty {
                    FlowLayout {
                        ForEach(Array(character.canon.enumerated()), id: \.offset) { _, fact in
                            Chip(fact)
                        }
                    }
                    .padding(.horizontal, Theme.gutter)
                }

                if !character.notableMemories.isEmpty {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                        Txt(t("characters.what_happened"), .micro, color: Theme.Colors.textMuted)
                        ForEach(Array(character.notableMemories.enumerated()), id: \.offset) { _, memory in
                            Txt("· \(memory)", .caption, color: Theme.Colors.textSecondary)
                        }
                    }
                    .padding(.horizontal, Theme.gutter)
                }

                if editing {
                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        Txt(t("characters.appearance_label"), .caption, color: Theme.Colors.textSecondary)
                        TextField("", text: $note, prompt: Text(t("characters.appearance_placeholder")).foregroundStyle(Theme.Colors.textMuted), axis: .vertical)
                            .lineLimit(3...8)
                            .font(.system(size: 17))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .padding(Theme.Spacing.lg)
                            .frame(minHeight: 84, alignment: .top)
                            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                            .accessibilityLabel(t("characters.appearance_a11y"))
                            .onChange(of: note) { _, value in
                                if value.count > 240 { note = String(value.prefix(240)) }
                            }
                    }
                    .padding(.horizontal, Theme.gutter)
                }

                if let error {
                    Txt(error, .caption, color: Theme.Colors.warning)
                        .padding(.horizontal, Theme.gutter)
                }

                // A canon protagonist is not drawn.
                // Nobody needs a generated Itachi; every player already has one, and
                // this would be the single image in the app they can hold against the
                // original. The server refuses it too, so an older build cannot spend
                // the credits.
                if character.protagonistIsCanon == true {
                    Txt(t("characters.canon_no_portrait", ["name": character.displayName]), .caption, color: Theme.Colors.textMuted)
                        .padding(.horizontal, Theme.gutter)
                        .padding(.bottom, Theme.gutter)
                } else {
                    VStack(spacing: Theme.Spacing.sm) {
                        if editing {
                            PBButton(
                                t(hasPortrait ? "characters.redraw_for_credits" : "characters.draw_for_credits", ["count": character.portraitCost]),
                                loadingLabel: t("characters.drawing"),
                                loading: busy
                            ) {
                                Task { await generate() }
                            }
                            PBButton(t("characters.cancel"), variant: .tertiary) { editing = false }
                        } else {
                            PBButton(t(hasPortrait ? "characters.redraw_portrait" : "characters.draw_this_character"), variant: .secondary) {
                                editing = true
                            }
                        }
                    }
                    .padding(.horizontal, Theme.gutter)
                    .padding(.bottom, Theme.gutter)
                }
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
    }

    private func generate() async {
        busy = true
        error = nil
        defer { busy = false }
        let trimmed = note.trimmingCharacters(in: .whitespacesAndNewlines)
        do {
            let result = try await store.api.generatePortrait(character.sessionId, appearanceNote: trimmed.isEmpty ? nil : trimmed)
            store.setBalance(result.balance)
            version += 1
            editing = false
            Haptic.play(.success)
            onChanged()
        } catch {
            Haptic.play(.error)
            if let api = error as? APIError {
                if api.isInsufficientCredits {
                    onNeedCredits(api.shortfall ?? character.portraitCost)
                } else {
                    self.error = api.message
                }
            } else {
                self.error = t("characters.portrait_failed")
            }
        }
    }
}
