import SwiftUI

// MARK: - The steps
//
// One view per step of the builder. Every one of them assumes the compiler has
// already been here: the job is editing, not filling in.

// MARK: 1 — Profile

struct ProfileStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
            BuilderTextField(
                label: t("create.f_title"), required: true, help: t("create.f_title_help"),
                placeholder: t("create.f_title_ph"), limit: 50,
                assist: .title, model: model,
                text: model.binding("title", \.title)
            )

            BuilderTextField(
                label: t("create.f_fantasy"), required: true, help: t("create.f_fantasy_help"),
                placeholder: t("create.f_fantasy_ph"), limit: 42,
                assist: .fantasyLabel, model: model,
                text: model.binding("fantasyLabel", \.fantasyLabel)
            )

            BuilderTextArea(
                label: t("create.f_hook"), required: true, help: t("create.f_hook_help"),
                placeholder: t("create.f_hook_ph"), minHeight: 80, limit: 200,
                assist: .hook, model: model,
                text: model.binding("hook", \.hook)
            )

            ImagePickerField(
                label: t("create.f_cover_image"),
                help: t("create.f_cover_image_help"),
                aspect: 1005.0 / 1490.0,
                url: model.draft.coverImage,
                uploading: model.isUploading(nil),
                onPick: { data in Task { await model.upload(data) } },
                onRemove: { Task { await model.removeImage() } },
                onDraw: { Task { await model.drawCover() } },
                drawing: model.drawing
            )

            // Only worth asking for when there is no picture: art direction
            // describes a cover we would draw, and we do not draw one over a
            // photograph somebody chose.
            if model.draft.coverImage == nil {
                BuilderTextArea(
                    label: t("create.f_cover"), help: t("create.f_cover_help"),
                    placeholder: t("create.f_cover_ph"), minHeight: 80,
                    assist: .coverDirection, model: model,
                    text: model.binding("coverDirection", \.coverDirection)
                )
            }
        }
    }
}

// MARK: 2 — World

struct WorldStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
            BuilderTextArea(
                label: t("create.f_premise"), required: true, help: t("create.f_premise_help"),
                placeholder: t("create.f_premise_ph"), minHeight: 200, limit: 2400,
                assist: .premise, model: model,
                text: model.binding("premise", \.premise)
            )

            BuilderTextArea(
                label: t("create.f_tone"), required: true, help: t("create.f_tone_help"),
                placeholder: t("create.f_tone_ph"), minHeight: 120, limit: 1200,
                assist: .toneGuide, model: model,
                text: model.binding("toneGuide", \.toneGuide)
            )

            BuilderLineList(
                label: t("create.f_canon"), help: t("create.f_canon_help"),
                placeholder: t("create.f_canon_ph"), minHeight: 140,
                assist: .hardCanon, model: model,
                lines: model.draft.hardCanon
            ) { lines in model.edit("hardCanon", lines) { d in d.hardCanon = lines } }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                FieldHeader(label: t("create.f_intensity"), help: t("create.f_intensity_help"))
                FlowLayout(spacing: Theme.Spacing.sm) {
                    ForEach(DraftIntensity.allCases, id: \.self) { option in
                        Chip(t(option.labelKey), selected: model.draft.intensity == option) {
                            model.edit("intensity", option.rawValue) { d in d.intensity = option }
                        }
                    }
                }
            }
        }
    }
}

// MARK: 3 — Cast

struct CastStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            Txt(t("create.cast_intro"), .bodyCompact, color: Theme.Colors.textSecondary)

            ForEach(Array(model.draft.characters.enumerated()), id: \.element.id) { index, character in
                BuilderEntityCard(
                    title: character.name,
                    subtitle: character.role,
                    onDelete: { model.removeCharacter(index) }
                ) {
                    CharacterFields(model: model, index: index)
                }
            }

            BuilderAddButton(label: t("create.add_character")) { model.addCharacter() }
        }
    }
}

struct CharacterFields: View {
    let model: BuilderModel
    let index: Int
    @Environment(\.translator) private var t

    private var character: DraftCharacter {
        model.draft.characters.indices.contains(index) ? model.draft.characters[index] : DraftCharacter.blank("")
    }

    private func text(_ key: KeyPath<DraftCharacter, String>, _ set: @escaping (inout DraftCharacter, String) -> Void) -> Binding<String> {
        Binding(
            get: { character[keyPath: key] },
            set: { value in model.updateCharacter(index) { set(&$0, value) } }
        )
    }

    private func lines(_ key: KeyPath<DraftCharacter, [String]>, _ set: @escaping (inout DraftCharacter, [String]) -> Void) -> ([String], ([String]) -> Void) {
        (character[keyPath: key], { value in model.updateCharacter(index) { set(&$0, value) } })
    }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
            HStack(spacing: Theme.Spacing.md) {
                // The whole character rewrites from the name and the role, so
                // those two are the only things a creator has to supply.
                AutoGenerateButton(model: model, target: .character, index: index)
                Spacer(minLength: 0)
            }

            BuilderTextField(label: t("create.f_name"), required: true, limit: 60,
                             text: text(\.name) { $0.name = $1 })
            BuilderTextField(label: t("create.f_role"), required: true, help: t("create.f_role_help"),
                             placeholder: t("create.f_role_ph"), limit: 120,
                             text: text(\.role) { $0.role = $1 })
            BuilderTextField(label: t("create.f_called"), help: t("create.f_called_help"), limit: 60,
                             text: text(\.calledName) { $0.calledName = $1 })
            BuilderTextField(label: t("create.f_pronouns"), limit: 40,
                             text: text(\.pronouns) { $0.pronouns = $1 })
            BuilderTextArea(label: t("create.f_blurb"), required: true, help: t("create.f_blurb_help"),
                            minHeight: 70, limit: 240,
                            text: text(\.cardBlurb) { $0.cardBlurb = $1 })
            ImagePickerField(
                label: t("create.f_portrait"),
                help: t("create.f_portrait_help"),
                aspect: 1,
                url: character.portrait,
                uploading: model.isUploading(index),
                onPick: { data in Task { await model.upload(data, character: index) } },
                onRemove: { Task { await model.removeImage(character: index) } }
            )
            BuilderTextArea(label: t("create.f_appearance"), minHeight: 80, limit: 600,
                            text: text(\.appearance) { $0.appearance = $1 })
            BuilderTextArea(label: t("create.f_speech"), help: t("create.f_speech_help"), minHeight: 70, limit: 300,
                            text: text(\.speechStyle) { $0.speechStyle = $1 })
            BuilderTextArea(label: t("create.f_social"), help: t("create.f_social_help"), minHeight: 70, limit: 300,
                            text: text(\.socialStyle) { $0.socialStyle = $1 })

            SectionLabel(t("create.f_inner_life"))
            Txt(t("create.f_inner_life_help"), .micro, color: Theme.Colors.textMuted)

            listField(t("create.f_wants"), lines(\.goals) { $0.goals = $1 })
            listField(t("create.f_holds"), lines(\.values) { $0.values = $1 })
            listField(t("create.f_afraid"), lines(\.fears) { $0.fears = $1 })
            listField(t("create.f_will_not"), lines(\.boundaries) { $0.boundaries = $1 }, help: t("create.f_will_not_help"))
            listField(t("create.f_underneath"), lines(\.hiddenDrives) { $0.hiddenDrives = $1 }, help: t("create.f_underneath_help"))
            listField(t("create.f_secrets"), lines(\.secrets) { $0.secrets = $1 }, help: t("create.f_secrets_help"))
            listField(t("create.f_voice"), lines(\.voiceSamples) { $0.voiceSamples = $1 }, help: t("create.f_voice_help"))
            listField(t("create.f_traits"), lines(\.publicTraits) { $0.publicTraits = $1 })
        }
    }

    @ViewBuilder
    private func listField(_ label: String, _ pair: ([String], ([String]) -> Void), help: String? = nil) -> some View {
        BuilderLineList(label: label, help: help, placeholder: t("create.one_per_line"), minHeight: 70, lines: pair.0, onCommit: pair.1)
    }
}

// MARK: 4 — Places

struct PlacesStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            Txt(t("create.places_intro"), .bodyCompact, color: Theme.Colors.textSecondary)

            ForEach(Array(model.draft.places.enumerated()), id: \.element.id) { index, place in
                BuilderEntityCard(
                    title: place.name,
                    subtitle: model.draft.startingPlaceId == place.id ? t("create.opens_here") : nil,
                    onDelete: { model.removePlace(index) }
                ) {
                    VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        HStack {
                            AutoGenerateButton(model: model, target: .place, index: index)
                            Spacer(minLength: 0)
                        }
                        BuilderTextField(
                            label: t("create.f_place_name"), required: true, limit: 80,
                            text: Binding(
                                get: { place.name },
                                set: { v in model.updatePlace(index) { $0.name = v } }
                            )
                        )
                        BuilderTextArea(
                            label: t("create.f_place_desc"), required: true, help: t("create.f_place_desc_help"),
                            minHeight: 90, limit: 600,
                            text: Binding(
                                get: { place.description },
                                set: { v in model.updatePlace(index) { $0.description = v } }
                            )
                        )

                        if model.draft.startingPlaceId != place.id {
                            PBButton(t("create.set_opening_place"), variant: .secondary, size: .medium, full: false) {
                                model.edit("startingPlaceId", place.id) { $0.startingPlaceId = place.id }
                            }
                        }
                    }
                }
            }

            BuilderAddButton(label: t("create.add_place")) { model.addPlace() }
        }
    }
}

// MARK: 5 — Opening

struct OpeningStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                FieldHeader(label: t("create.f_pov"), required: true, help: t("create.f_pov_help"))
                ForEach(DraftPov.allCases, id: \.self) { option in
                    RadioCard(selected: model.draft.protagonistKind == option) {
                        model.edit("protagonistKind", option.rawValue) { $0.protagonistKind = option }
                    } content: {
                        VStack(alignment: .leading, spacing: 2) {
                            Txt(t(option.labelKey), .bodyCompact)
                            Txt(t(option.labelKey + "_body"), .micro, color: Theme.Colors.textMuted)
                        }
                    }
                }
            }

            if model.draft.protagonistKind == .named {
                BuilderTextField(label: t("create.f_hero_name"), required: true, limit: 60,
                                 text: model.binding("protagonistName", \.protagonistName))
                BuilderTextField(label: t("create.f_hero_pronouns"), limit: 40,
                                 text: model.binding("protagonistPronouns", \.protagonistPronouns))
                BuilderTextArea(label: t("create.f_hero_desc"), required: true, minHeight: 90, limit: 600,
                                text: model.binding("protagonistDescription", \.protagonistDescription))
            } else {
                BuilderTextField(label: t("create.f_setup_heading"), help: t("create.f_setup_heading_help"),
                                 placeholder: t("create.f_setup_heading_ph"), limit: 120,
                                 text: model.binding("setupHeading", \.setupHeading))
            }

            BuilderTextArea(
                label: t("create.f_opening"), required: true, help: t("create.f_opening_help"),
                placeholder: t("create.f_opening_ph"), minHeight: 200, limit: 2000,
                assist: .opening, model: model,
                text: model.binding("opening", \.opening)
            )

            BuilderLineList(
                label: t("create.f_suggestions"), help: t("create.f_suggestions_help"),
                placeholder: t("create.one_per_line"), minHeight: 80,
                assist: .openingSuggestions, model: model,
                lines: model.draft.openingSuggestions
            ) { lines in
                let capped = Array(lines.prefix(3))
                model.edit("openingSuggestions", capped) { d in d.openingSuggestions = capped }
            }

            // Origins: the replayability primitive. OOC calls these starting
            // scenarios and scopes half the product to them; ours are the
            // archetypes the engine already has.
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                FieldHeader(label: t("create.f_origins"), help: t("create.f_origins_help"),
                            assist: .origins, model: model)
                ForEach(model.draft.origins) { origin in
                    Card(background: Theme.Colors.bgRaised) {
                        VStack(alignment: .leading, spacing: 4) {
                            Txt(origin.name.isEmpty ? t("create.unnamed") : origin.name, .bodyCompact)
                            if !origin.summary.isEmpty {
                                Txt(origin.summary, .micro, color: Theme.Colors.textMuted)
                            }
                            if !origin.playstyle.isEmpty {
                                Txt(origin.playstyle.joined(separator: " · "), .micro, color: Theme.Colors.accentPrimary)
                            }
                        }
                    }
                }
                if model.draft.origins.isEmpty {
                    Txt(t("create.origins_empty"), .micro, color: Theme.Colors.textMuted)
                }
            }

            BuilderTextArea(
                label: t("create.f_play_guide"), help: t("create.f_play_guide_help"),
                minHeight: 90, limit: 1000,
                assist: .playGuide, model: model,
                text: model.binding("playGuide", \.playGuide)
            )

            BuilderLineList(
                label: t("create.f_style"), help: t("create.f_style_help"),
                placeholder: t("create.one_per_line"), minHeight: 110,
                assist: .styleExamples, model: model,
                lines: model.draft.styleExamples
            ) { lines in
                let capped = Array(lines.prefix(3))
                model.edit("styleExamples", capped) { d in d.styleExamples = capped }
            }
        }
    }
}

// MARK: 6 — Pressure

struct PressureStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
            Txt(t("create.pressure_intro"), .bodyCompact, color: Theme.Colors.textSecondary)

            group(t("create.f_factions"), t("create.f_factions_help"), .factions) {
                ForEach(model.draft.factions) { faction in
                    pair(faction.name, faction.description)
                }
                if model.draft.factions.isEmpty { emptyNote }
            }

            group(t("create.f_threads"), t("create.f_threads_help"), .threads) {
                ForEach(model.draft.threads) { thread in
                    pair(thread.title, thread.summary)
                }
                if model.draft.threads.isEmpty { emptyNote }
            }

            group(t("create.f_events"), t("create.f_events_help"), .worldEvents) {
                ForEach(model.draft.worldEvents) { event in
                    pair(event.publicCopy, event.directorNotes)
                }
                if model.draft.worldEvents.isEmpty { emptyNote }
            }

            group(t("create.f_objects"), t("create.f_objects_help"), .objects) {
                ForEach(model.draft.objects) { object in
                    pair(object.name, object.description)
                }
                if model.draft.objects.isEmpty { emptyNote }
            }
        }
    }

    @ViewBuilder
    private func group<Content: View>(
        _ label: String, _ help: String, _ target: AssistTarget, @ViewBuilder content: () -> Content
    ) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            FieldHeader(label: label, help: help, assist: target, model: model)
            content()
        }
    }

    private func pair(_ title: String, _ body: String) -> some View {
        Card(background: Theme.Colors.bgRaised) {
            VStack(alignment: .leading, spacing: 4) {
                Txt(title.isEmpty ? t("create.unnamed") : title, .bodyCompact)
                if !body.isEmpty {
                    Txt(body, .micro, color: Theme.Colors.textMuted)
                }
            }
        }
    }

    private var emptyNote: some View {
        Txt(t("create.pressure_empty"), .micro, color: Theme.Colors.textMuted)
    }
}

// MARK: 7 — Endings

struct EndingsStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                Txt(t("create.endings_intro"), .bodyCompact, color: Theme.Colors.textSecondary)
                HStack {
                    Spacer(minLength: 0)
                    AutoGenerateButton(model: model, target: .endings)
                }
            }

            ForEach(Array(model.draft.endings.enumerated()), id: \.element.id) { index, ending in
                BuilderEntityCard(
                    title: ending.name,
                    subtitle: t("create.ending_from_turn", ["turn": String(ending.minTurn)]),
                    onDelete: { model.removeEnding(index) }
                ) {
                    VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        BuilderTextField(
                            label: t("create.f_ending_name"), required: true, limit: 60,
                            text: Binding(get: { ending.name }, set: { v in model.updateEnding(index) { $0.name = v } })
                        )

                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            FieldHeader(label: t("create.f_rarity"), required: true, help: t("create.f_rarity_help"))
                            FlowLayout(spacing: Theme.Spacing.sm) {
                                ForEach(EndingRarity.allCases, id: \.self) { rarity in
                                    Chip(t(rarity.labelKey), selected: ending.rarity == rarity,
                                         tone: rarity == .unique ? .accent : .neutral) {
                                        model.updateEnding(index) { $0.rarity = rarity }
                                    }
                                }
                            }
                        }

                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            FieldHeader(label: t("create.f_min_turn"), required: true, help: t("create.f_min_turn_help"))
                            Stepper(value: Binding(
                                get: { ending.minTurn },
                                set: { v in model.updateEnding(index) { $0.minTurn = max(10, v) } }
                            ), in: 10...200, step: 5) {
                                Txt(t("create.ending_from_turn", ["turn": String(ending.minTurn)]), .bodyCompact)
                            }
                            .tint(Theme.Colors.accentPrimary)
                        }

                        BuilderTextArea(
                            label: t("create.f_condition"), required: true, help: t("create.f_condition_help"),
                            minHeight: 110, limit: 1000,
                            text: Binding(get: { ending.condition }, set: { v in model.updateEnding(index) { $0.condition = v } })
                        )

                        BuilderTextArea(
                            label: t("create.f_epilogue"), help: t("create.f_epilogue_help"),
                            minHeight: 110, limit: 2000,
                            text: Binding(get: { ending.epilogue }, set: { v in model.updateEnding(index) { $0.epilogue = v } })
                        )

                        BuilderTextField(
                            label: t("create.f_hint"), help: t("create.f_hint_help"), limit: 80,
                            text: Binding(get: { ending.hint }, set: { v in model.updateEnding(index) { $0.hint = v } })
                        )
                    }
                }
            }

            BuilderAddButton(label: t("create.add_ending")) { model.addEnding() }
        }
    }
}

// MARK: 8 — Publish

struct PublishStep: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
            BuilderTextArea(
                label: t("create.f_description"), required: true, help: t("create.f_description_help"),
                minHeight: 140, limit: 2000,
                assist: .description, model: model,
                text: model.binding("description", \.description)
            )

            BuilderLineList(
                label: t("create.f_tags"), help: t("create.f_tags_help"),
                placeholder: t("create.one_per_line"), minHeight: 80,
                assist: .tags, model: model,
                lines: model.draft.tags
            ) { lines in
                let capped = Array(lines.prefix(10)).map { $0.lowercased() }
                model.edit("tags", capped) { d in d.tags = capped }
            }

            BuilderLineList(
                label: t("create.f_chips"), help: t("create.f_chips_help"),
                placeholder: t("create.one_per_line"), minHeight: 70,
                assist: .mechanicsChips, model: model,
                lines: model.draft.mechanicsChips
            ) { lines in
                let capped = Array(lines.prefix(6))
                model.edit("mechanicsChips", capped) { d in d.mechanicsChips = capped }
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                FieldHeader(label: t("create.f_tier"), help: t("create.f_tier_help"))
                FlowLayout(spacing: Theme.Spacing.sm) {
                    ForEach(QualityTier.allCases, id: \.self) { tier in
                        Chip(t(TierCopy.labelKey(tier)), selected: model.draft.recommendedTier == tier) {
                            model.edit("recommendedTier", tier.rawValue) { $0.recommendedTier = tier }
                        }
                    }
                }
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                FieldHeader(label: t("create.f_visibility"), help: t("create.f_visibility_help"))
                ForEach(DraftVisibility.allCases, id: \.self) { option in
                    RadioCard(selected: model.draft.visibility == option) {
                        Task { await model.setVisibility(option) }
                    } content: {
                        VStack(alignment: .leading, spacing: 2) {
                            Txt(t(option.labelKey), .bodyCompact)
                            Txt(t(option.blurbKey), .micro, color: Theme.Colors.textMuted)
                        }
                    }
                }
            }
        }
    }
}

// MARK: - Publish sheet

struct PublishSheet: View {
    let model: BuilderModel
    let onPublished: (String) -> Void

    @Environment(\.translator) private var t
    @Environment(\.dismiss) private var dismiss
    @State private var visibility: DraftVisibility = .publicly

    var body: some View {
        Screen {
            VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                HStack {
                    Txt(model.draft.isPublished ? t("create.update_title") : t("create.publish_title"), .h2)
                    Spacer()
                    IconButton(t("misc.close"), glyph: "✕") { dismiss() }
                }

                if model.readiness.ready {
                    Txt(t("create.publish_body"), .bodyCompact, color: Theme.Colors.textSecondary)
                } else {
                    Card(background: Theme.Colors.bgRaised) {
                        VStack(alignment: .leading, spacing: 6) {
                            Txt(t("create.publish_blocked"), .bodyCompact, color: Theme.Colors.warning)
                            Txt(
                                model.readiness.blockedSteps.map { t($0.labelKey) }.joined(separator: " · "),
                                .micro, color: Theme.Colors.textSecondary
                            )
                        }
                    }
                }

                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    SectionLabel(t("create.f_visibility"))
                    ForEach(DraftVisibility.allCases, id: \.self) { option in
                        RadioCard(selected: visibility == option) { visibility = option } content: {
                            VStack(alignment: .leading, spacing: 2) {
                                Txt(t(option.labelKey), .bodyCompact)
                                Txt(t(option.blurbKey), .micro, color: Theme.Colors.textMuted)
                            }
                        }
                    }
                }

                if let error = model.errorMessage {
                    InlineError(message: error, retryLabel: t("misc.close")) { model.dismissError() }
                }

                Spacer(minLength: 0)

                PBButton(
                    model.draft.isPublished ? t("create.update") : t("create.publish"),
                    variant: .light,
                    loading: model.work == .publishing,
                    disabled: !model.readiness.ready
                ) {
                    Task {
                        if let storyId = await model.publish(visibility) { onPublished(storyId) }
                    }
                }
            }
            .padding(Theme.gutter)
        }
        .onAppear { visibility = model.draft.visibility }
    }
}
