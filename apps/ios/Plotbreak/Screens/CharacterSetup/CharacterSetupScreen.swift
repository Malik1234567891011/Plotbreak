import SwiftUI

// MARK: - CharacterSetupScreen
//
// CS-01 / CS-02 — twin of `apps/mobile/src/screens/CharacterSetup.tsx`.
//
// Spec §9.1 — enough identity for the world to react, without setup fatigue.
// The default path is under 90 seconds and only the display name is required.
//
// Every preset here has a freeform escape hatch. A fixed list of archetypes and
// origins is a shortcut for players who want one, never a cage for players who
// had something specific in mind — and the engine treats a written answer
// exactly as seriously as a chosen one.

private let customChoice = "__custom__"

/// The four answers to the grammar question, in the order French would ask
/// them, each with the sentence the player will read and what it means for the
/// third person. A table so the label, example and note cannot drift apart.
private struct GrammarOption {
    let gender: GrammaticalGender
    let labelKey: TranslationKey
    let exampleKey: TranslationKey
    let noteKey: TranslationKey

    static let all: [GrammarOption] = [
        GrammarOption(gender: .MASCULINE, labelKey: "setup.grammar.masculine",
                      exampleKey: "setup.grammar.example_masculine", noteKey: "setup.grammar.note_masculine"),
        GrammarOption(gender: .FEMININE, labelKey: "setup.grammar.feminine",
                      exampleKey: "setup.grammar.example_feminine", noteKey: "setup.grammar.note_feminine"),
        GrammarOption(gender: .NEUTRAL, labelKey: "setup.grammar.neutral",
                      exampleKey: "setup.grammar.example_neutral", noteKey: "setup.grammar.note_neutral"),
        GrammarOption(gender: .UNSPECIFIED, labelKey: "setup.grammar.unspecified",
                      exampleKey: "setup.grammar.example_unspecified", noteKey: "setup.grammar.note_unspecified"),
    ]
}

struct CharacterSetupScreen: View {
    let storyId: String

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var detail: StoryDetailResponse?
    @State private var advanced = false
    @State private var starting = false
    @State private var error: String?

    @State private var displayName = ""
    @State private var pronouns = ""
    @State private var about = ""
    @State private var appearance = ""
    @State private var archetypeId: String?
    @State private var customArchetype = ""
    @State private var choices: [String: String] = [:]
    @State private var customChoices: [String: String] = [:]
    /// How the narration should agree with this player. Collected **only in
    /// French**, because only French needs it — see `PLAYER_GRAMMAR.md`. An
    /// English session never renders the question and sends `UNSPECIFIED`.
    @State private var grammarGender: GrammaticalGender = .UNSPECIFIED

    // MARK: Derived

    private var archetype: SetupArchetype? {
        detail?.archetypes.first { $0.id == archetypeId }
    }

    private var archetypeField: CharacterSetupField? {
        detail?.setupFields.first { $0.kind == .ARCHETYPE }
    }

    private var usingCustomArchetype: Bool { archetypeId == customChoice }

    /// Some worlds already know who you are. Itachi's premise reads "you are
    /// thirteen, the best shinobi your clan has produced in a generation"; this
    /// screen must not ask the player to author a character the story wrote.
    /// Nine Weeks is why it is a per-world flag: there, inventing yourself is
    /// the premise.
    private var named: Bool { detail?.protagonist?.kind == .NAMED }

    /// Agreement for a protagonist the world already named. `protagonist.pronouns`
    /// is canon the author wrote in a fixed vocabulary; reading it is no more an
    /// inference than reading `protagonist.name`. Anything unrecognised falls
    /// through to `UNSPECIFIED`, the avoidance form, which is never wrong.
    private var canonGrammar: GrammaticalGender {
        let p = (detail?.protagonist?.pronouns ?? "").lowercased()
        func matches(_ pattern: String) -> Bool { p.range(of: pattern, options: .regularExpression) != nil }
        if matches("\\b(he|him|il|lui)\\b") { return .MASCULINE }
        if matches("\\b(she|her|elle)\\b") { return .FEMININE }
        if matches("\\b(they|them|iel)\\b") { return .NEUTRAL }
        return .UNSPECIFIED
    }

    private var asksGrammar: Bool { store.locale == .fr && !named }
    private var effectiveGrammar: GrammaticalGender { named ? canonGrammar : grammarGender }
    private var canonName: String { (detail?.protagonist?.name ?? "").trimmingCharacters(in: .whitespacesAndNewlines) }
    private var effectiveName: String { named ? canonName : displayName.trimmingCharacters(in: .whitespacesAndNewlines) }
    private var canStart: Bool { !effectiveName.isEmpty && !starting }

    private var advancedFields: [CharacterSetupField] {
        detail?.setupFields.filter { $0.advanced && $0.id != "appearance" } ?? []
    }

    // MARK: Body

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                header

                // Nothing is drawn until the world has answered. `named` is
                // derived from `detail`, so for the length of the fetch it is
                // false — indistinguishable from a world that really does want
                // to ask. One quiet line, then the real screen.
                if let detail {
                    form(detail)
                } else {
                    VStack {
                        Spacer()
                        Txt(t("onboarding.loading"), .bodyCompact, color: Theme.Colors.textMuted, center: true)
                        Spacer()
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }

                footer
            }
        }
        .task(id: storyId) {
            detail = try? await store.api.storyDetail(storyId)
        }
    }

    private var header: some View {
        HStack {
            IconButton(t("setup.back"), action: { router.pop() }) {
                Txt("‹", .h2)
            }
            Spacer(minLength: 0)
            Txt(detail?.story.title ?? "", .caption, color: Theme.Colors.textMuted, lineLimit: 1)
            Spacer(minLength: 0)
            Color.clear.frame(width: Theme.minTouchTarget, height: Theme.minTouchTarget)
        }
        .padding(.horizontal, Theme.gutter)
    }

    private func form(_ detail: StoryDetailResponse) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    // A world's own `setupHeading` is world content, in the
                    // language that world was authored in, and wins when set.
                    Txt(named
                        ? (detail.protagonist?.setupHeading.isEmpty == false
                            ? detail.protagonist!.setupHeading
                            : t("setup.heading_named", ["name": canonName]))
                        : t("setup.heading"), .display)
                    Txt(t(named ? "setup.subheading_named" : "setup.subheading"), .bodyCompact, color: Theme.Colors.textSecondary)
                }

                if !named {
                    VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        SetupField(label: t("setup.name_label"), value: $displayName,
                                   placeholder: placeholderFor(detail, "displayName", t("setup.name_placeholder")),
                                   maxLength: 40, required: true)
                        SetupField(label: t("setup.pronouns_label"), value: $pronouns,
                                   placeholder: placeholderFor(detail, "pronouns", t("setup.pronouns_placeholder")),
                                   maxLength: 24)
                    }
                }

                // The question only French asks, in the French build only. It
                // does not replace the free-text pronouns field above and is
                // not a translation of it. Each row shows the sentence the
                // player will actually read.
                if asksGrammar {
                    grammarPicker
                }

                if !detail.archetypes.isEmpty {
                    archetypePicker(detail)
                }

                SetupField(label: t("setup.about_label"), value: $about,
                           placeholder: placeholderFor(detail, "worldKnowsAboutYou", t("setup.about_placeholder")),
                           maxLength: 300, multiline: true)

                // Drives the generated portrait, so it earns a place in the fast
                // path — unless the world already knows what this person looks
                // like, in which case asking is the fourth-wall break.
                if !named {
                    SetupField(label: t("setup.appearance_label"), hint: t("setup.appearance_hint"), value: $appearance,
                               placeholder: placeholderFor(detail, "appearance", t("setup.appearance_placeholder")),
                               maxLength: 240, multiline: true)
                }

                if advanced {
                    advancedSection
                }

                // Spec §9.4 — a tiny canon summary, never a stat block.
                if !effectiveName.isEmpty {
                    Card {
                        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                            Txt("YOU'LL ENTER AS", .caption, color: Theme.Colors.textMuted)
                            Txt(summaryLine, .bodyStrong)
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
    }

    private var summaryLine: String {
        let background: String? = usingCustomArchetype
            ? customArchetype.trimmingCharacters(in: .whitespacesAndNewlines)
                .split(whereSeparator: { $0 == "." || $0 == "," }).first.map(String.init)
            : archetype?.name
        return [effectiveName, background].compactMap { $0 }.filter { !$0.isEmpty }.joined(separator: " · ")
    }

    private var grammarPicker: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                Txt(t("setup.grammar.heading"), .h3)
                Txt(t("setup.grammar.hint"), .caption, color: Theme.Colors.textSecondary)
            }
            ForEach(GrammarOption.all, id: \.gender) { option in
                let selected = grammarGender == option.gender
                Button {
                    Haptic.play(.light)
                    grammarGender = option.gender
                } label: {
                    SelectableCard(selected: selected) {
                        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                            FlowLayout(spacing: Theme.Spacing.sm) {
                                Txt(t(option.labelKey), .bodyStrong, color: selected ? Theme.Colors.accentPrimary : Theme.Colors.textPrimary)
                                Txt(t("setup.grammar.quoted_example", ["example": t(option.exampleKey)]), .bodyCompact)
                            }
                            Txt(t(option.noteKey), .caption, color: Theme.Colors.textMuted)
                        }
                    }
                }
                .buttonStyle(PressOpacityStyle(pressed: 0.85))
                .accessibilityLabel(t("setup.grammar.option_a11y", [
                    "label": t(option.labelKey), "example": t(option.exampleKey), "note": t(option.noteKey),
                ]))
                .accessibilityAddTraits(selected ? .isSelected : [])
            }
        }
    }

    /// The heading and the explainer come from the story, because the screen
    /// has to say what the system is before it asks you to pick inside it.
    private func archetypePicker(_ detail: StoryDetailResponse) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                Txt(archetypeField?.label ?? t("setup.archetype_heading"), .h3)
                if let help = archetypeField?.helpText, !help.isEmpty {
                    Txt(help, .bodyCompact, color: Theme.Colors.textSecondary)
                }
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                ForEach(detail.archetypes) { option in
                    let selected = archetypeId == option.id
                    Button {
                        Haptic.play(.light)
                        archetypeId = selected ? nil : option.id
                    } label: {
                        SelectableCard(selected: selected) {
                            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                                // Layer 1: what this is, in words that need no lore.
                                FlowLayout(spacing: Theme.Spacing.sm) {
                                    Txt(option.name, .bodyStrong, color: selected ? Theme.Colors.accentPrimary : Theme.Colors.textPrimary)
                                    Txt(option.role, .caption, color: Theme.Colors.textMuted)
                                }
                                Txt(option.summary, .bodyCompact)
                                FlowLayout(spacing: Theme.Spacing.xs) {
                                    ForEach(option.playstyle, id: \.self) { tag in Chip(tag) }
                                }
                                // What it actually does, only once you are looking at it.
                                if selected {
                                    GrantList(grants: option.grants)
                                }
                                // Layer 2: the world's voice. Never carrying the meaning.
                                Txt(option.blurb, .caption, color: Theme.Colors.textSecondary)
                            }
                        }
                    }
                    .buttonStyle(PressOpacityStyle(pressed: 0.85))
                    .accessibilityLabel(t("setup.archetype_a11y", ["name": option.name, "role": option.role, "summary": option.summary]))
                    .accessibilityAddTraits(selected ? .isSelected : [])
                }

                Button {
                    Haptic.play(.light)
                    archetypeId = usingCustomArchetype ? nil : customChoice
                } label: {
                    SelectableCard(selected: usingCustomArchetype, dashed: true) {
                        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                            Txt(t("setup.something_else"), .bodyStrong,
                                color: usingCustomArchetype ? Theme.Colors.accentPrimary : Theme.Colors.textPrimary)
                            Txt(t("setup.custom_background_body"), .bodyCompact)
                        }
                    }
                }
                .buttonStyle(PressOpacityStyle(pressed: 0.85))
                .accessibilityLabel(t("setup.write_own_background"))
                .accessibilityAddTraits(usingCustomArchetype ? .isSelected : [])
            }

            if usingCustomArchetype {
                SetupField(label: t("setup.custom_background_label"), value: $customArchetype,
                           placeholder: t("setup.custom_background_placeholder"), maxLength: 240, multiline: true)
            }
        }
    }

    private var advancedSection: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            Txt(t("setup.more_about_you"), .h3)
            ForEach(advancedFields) { field in
                if field.kind == .CHOICE {
                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        Txt(field.label, .bodyCompact)
                        if !field.helpText.isEmpty {
                            Txt(field.helpText, .caption, color: Theme.Colors.textSecondary)
                        }
                        FlowLayout(spacing: Theme.Spacing.sm) {
                            ForEach(field.options) { option in
                                Chip(option.label, selected: choices[field.id] == option.id) {
                                    choices[field.id] = choices[field.id] == option.id ? "" : option.id
                                }
                            }
                            // Every preset list ends in an escape hatch.
                            Chip(t("setup.something_else"), selected: choices[field.id] == customChoice) {
                                choices[field.id] = choices[field.id] == customChoice ? "" : customChoice
                            }
                        }
                        if choices[field.id] == customChoice {
                            SetupInput(
                                value: binding(for: field.id),
                                placeholder: t("setup.write_own_answer"),
                                maxLength: field.maxLength,
                                multiline: false
                            )
                            .accessibilityLabel(t("setup.own_answer_a11y", ["label": field.label]))
                        }
                    }
                } else {
                    SetupField(label: field.label, value: binding(for: field.id),
                               placeholder: field.placeholder, maxLength: field.maxLength)
                }
            }
        }
    }

    private var footer: some View {
        VStack(spacing: Theme.Spacing.sm) {
            PBDivider()
            PBButton(t("setup.enter"), loadingLabel: t("setup.entering"), loading: starting,
                     disabled: !canStart, haptic: .medium) {
                Task { await start() }
            }
            .padding(.top, Theme.Spacing.xs)
            if !advancedFields.isEmpty {
                PBButton(advanced ? t("setup.use_quick_setup") : t("setup.customize_more"), variant: .tertiary) {
                    advanced.toggle()
                }
            }
        }
        .padding(.horizontal, Theme.gutter)
        .background(Theme.Colors.bgBase)
    }

    // MARK: Actions

    private func binding(for fieldId: String) -> Binding<String> {
        Binding(
            get: { customChoices[fieldId] ?? "" },
            set: { customChoices[fieldId] = $0 }
        )
    }

    private func start() async {
        guard let detail else { return }
        starting = true
        error = nil

        // A written answer is stored alongside the structured ones, so the
        // director sees it as canon rather than as an unparsed leftover.
        var advancedValues: [String: String] = [:]
        for (fieldId, value) in choices {
            advancedValues[fieldId] = value == customChoice
                ? (customChoices[fieldId] ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
                : value
        }
        let look = (named ? (detail.protagonist?.description ?? "") : appearance).trimmingCharacters(in: .whitespacesAndNewlines)
        if !look.isEmpty { advancedValues["appearance"] = look }
        let writtenArchetype = customArchetype.trimmingCharacters(in: .whitespacesAndNewlines)
        if usingCustomArchetype, !writtenArchetype.isEmpty {
            advancedValues["customArchetype"] = writtenArchetype
        }

        let declaredPronouns = (named ? (detail.protagonist?.pronouns ?? "") : pronouns).trimmingCharacters(in: .whitespacesAndNewlines)
        let grammar = effectiveGrammar
        let identity = PlayerIdentity(
            displayName: effectiveName,
            pronouns: declaredPronouns.isEmpty ? "they/them" : declaredPronouns,
            // Declared, never inferred. Not from the name, not from the
            // portrait, not by parsing the free-text pronouns above.
            grammar: PlayerGrammar(gender: grammar, thirdPerson: thirdPersonPronoun(grammar, declared: "")),
            ageBand: nil,
            // Spec §9.4 — a background you wrote is worth the same as one we
            // wrote. `nil` here means the server reads `advanced.customArchetype`.
            archetypeId: usingCustomArchetype ? nil : archetypeId,
            worldKnowsAboutYou: String(about.trimmingCharacters(in: .whitespacesAndNewlines).prefix(300)),
            advanced: advancedValues,
            portraitAssetId: nil
        )
        // The language this run will be played in, decided here and frozen by
        // the server into `GameState.locale`.
        let request = CreateSessionRequest(identity: identity, usedQuickSetup: !advanced, locale: store.locale)

        do {
            let session = try await store.api.createSession(storyId: storyId, request)
            router.replaceTopWithSession(session.session.sessionId)
        } catch {
            if let api = error as? APIError, api.isInsufficientCredits {
                router.present(.wallet(shortfall: api.shortfall))
            }
            self.error = error is APIError ? error.playerMessage : t("setup.could_not_start")
            starting = false
        }
    }

    /// Prefers the story's own authored example over the generic fallback.
    private func placeholderFor(_ detail: StoryDetailResponse, _ fieldId: String, _ fallback: String) -> String {
        let authored = detail.setupFields.first { $0.id == fieldId }?.placeholder ?? ""
        return authored.isEmpty ? fallback : authored
    }

    /// Twin of `thirdPersonPronoun` in `@plotbreak/i18n`'s `grammar.ts`.
    private func thirdPersonPronoun(_ gender: GrammaticalGender, declared: String) -> String {
        let trimmed = declared.trimmingCharacters(in: .whitespacesAndNewlines)
        if !trimmed.isEmpty { return trimmed }
        switch gender {
        case .MASCULINE: return "il"
        case .FEMININE: return "elle"
        case .NEUTRAL: return "iel"
        case .UNSPECIFIED: return ""
        }
    }
}

// MARK: - GrantList
//
// What choosing this option actually gives you. Only under the selected card:
// four cards each showing a stat block is a spreadsheet; one card showing its
// own is an answer to "and what does that mean for me". The strings arrive
// already resolved from the server.

private struct GrantList: View {
    let grants: ArchetypeGrants
    @Environment(\.translator) private var t

    private var lines: [(String, [String])] {
        [
            (t("setup.grants.starts_with"), grants.abilities),
            (t("setup.grants.better_at"), grants.skills),
            (t("setup.grants.attributes"), grants.attributes),
            (t("setup.grants.carries"), grants.items),
            (t("setup.grants.counted_by"), grants.standing),
        ].filter { !$0.1.isEmpty }
    }

    var body: some View {
        if !lines.isEmpty {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                PBDivider()
                    .padding(.bottom, Theme.Spacing.xs)
                ForEach(lines, id: \.0) { label, values in
                    HStack(alignment: .top, spacing: Theme.Spacing.sm) {
                        Txt(label, .caption, color: Theme.Colors.textMuted)
                            .frame(width: 82, alignment: .leading)
                        Txt(values.joined(separator: " · "), .caption, color: Theme.Colors.textSecondary)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
            }
            .padding(.top, Theme.Spacing.xs)
        }
    }
}

// MARK: - Field

private struct SetupField: View {
    let label: String
    var hint: String? = nil
    @Binding var value: String
    var placeholder: String = ""
    var maxLength: Int? = nil
    var multiline = false
    var required = false

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 2) {
                    Txt(label + (required ? " *" : ""), .caption, color: Theme.Colors.textSecondary)
                    if let hint {
                        Txt(hint, .micro, color: Theme.Colors.textMuted)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.trailing, Theme.Spacing.md)
                if let maxLength, Double(value.count) > Double(maxLength) * 0.7 {
                    Txt("\(value.count)/\(maxLength)", .micro, color: Theme.Colors.textMuted)
                }
            }
            SetupInput(value: $value, placeholder: placeholder, maxLength: maxLength, multiline: multiline)
                .accessibilityLabel(label)
        }
    }
}

/// The text box itself — RN's `inputStyle`.
private struct SetupInput: View {
    @Binding var value: String
    var placeholder: String = ""
    var maxLength: Int? = nil
    var multiline = false

    var body: some View {
        TextField(text: $value, prompt: Text(placeholder).foregroundStyle(Theme.Colors.textMuted), axis: multiline ? .vertical : .horizontal) {
            Text(placeholder)
        }
        .lineLimit(multiline ? 3 : 1, reservesSpace: multiline)
        .font(.system(size: 17))
        .foregroundStyle(Theme.Colors.textPrimary)
        .tint(Theme.Colors.accentPrimary)
        .padding(.horizontal, Theme.Spacing.lg)
        .padding(.vertical, Theme.Spacing.md)
        .frame(minHeight: multiline ? 88 : 48, alignment: multiline ? .topLeading : .leading)
        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
        .onChange(of: value) { _, next in
            if let maxLength, next.count > maxLength { value = String(next.prefix(maxLength)) }
        }
    }
}

// MARK: - SelectableCard
//
// `Card` with a border that answers to selection (and RN's dashed "write your
// own" variant). File-private while screens are ported in parallel.

private struct SelectableCard<Content: View>: View {
    var selected: Bool
    var dashed: Bool = false
    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .padding(Theme.Spacing.lg)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(
                        selected ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle,
                        style: StrokeStyle(lineWidth: selected ? 1 : 0.5, dash: dashed ? [6, 4] : [])
                    )
            }
            .contentShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
    }
}
