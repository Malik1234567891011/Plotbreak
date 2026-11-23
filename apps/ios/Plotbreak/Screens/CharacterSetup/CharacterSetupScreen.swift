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
    /// When this player arrived at setup, for `session_started.setupDurationMs`.
    @State private var setupStartedAt = Date()
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
            // §9.1's 90-second target is only measurable if the clock starts
            // where setup does.
            setupStartedAt = Date()
            Telemetry.track(.characterSetupStarted, ["storyId": storyId])
            prefill()
            detail = try? await store.api.storyDetail(storyId)
        }
    }

    /// Design v3: a round back button, and Skip — setup is optional, and
    /// skipping starts the story with the same identity the Story page's Play
    /// would use (`QuickStart`).
    private var header: some View {
        HStack {
            Button {
                Haptic.play(.light)
                router.pop()
            } label: {
                Image(systemName: "chevron.left")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .frame(width: 44, height: 44)
                    .background(Theme.Colors.bgRaised, in: Circle())
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(t("setup.back"))
            Spacer(minLength: 0)
            if let detail {
                Button {
                    Task { await skip(detail) }
                } label: {
                    Text(t("onboarding.skip"))
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .padding(.horizontal, 18)
                        .frame(height: 36)
                        .background(Theme.Colors.bgRaised, in: Capsule())
                        .frame(minHeight: Theme.minTouchTarget)
                }
                .buttonStyle(PressOpacityStyle())
                .disabled(starting)
            }
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, Theme.Spacing.xs)
    }

    private func form(_ detail: StoryDetailResponse) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 28) {
                VStack(alignment: .leading, spacing: 6) {
                    // A world's own `setupHeading` is world content, in the
                    // language that world was authored in, and wins when set.
                    Text(named
                        ? (detail.protagonist?.setupHeading.isEmpty == false
                            ? detail.protagonist!.setupHeading
                            : t("setup.heading_named", ["name": canonName]))
                        : t("setup.heading"))
                        .font(.system(size: 28, weight: .bold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .fixedSize(horizontal: false, vertical: true)
                        .accessibilityAddTraits(.isHeader)
                    Text(named ? t("setup.subheading_named") : skipLine(detail))
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .fixedSize(horizontal: false, vertical: true)
                }

                // Name and pronouns side by side, the name taking the room.
                if !named {
                    HStack(alignment: .top, spacing: 12) {
                        SetupField(label: t("setup.name_short"), value: $displayName,
                                   placeholder: placeholderFor(detail, "displayName", t("setup.name_placeholder")),
                                   maxLength: 40, required: true)
                        SetupField(label: t("setup.pronouns_label"), value: $pronouns,
                                   placeholder: "they/them",
                                   maxLength: 24)
                            .frame(width: 132)
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

                if let error {
                    Txt(error, .bodyCompact, color: Theme.Colors.danger)
                }
            }
            .padding(.horizontal, Theme.pageGutter)
            .padding(.top, Theme.Spacing.lg)
            .padding(.bottom, Theme.Spacing.giant)
        }
        .scrollDismissesKeyboard(.interactively)
    }

    /// Design v3: what Skip (top right) would start you as — the identity
    /// `QuickStart` sends: the default name and the world's first role.
    private func skipLine(_ detail: StoryDetailResponse) -> String {
        let name = DefaultIdentity.build(for: detail, store: store).displayName
        guard let role = detail.archetypes.first?.name, !role.isEmpty else {
            return t("setup.subheading_no_role", ["name": name])
        }
        return t("setup.subheading", ["name": name, "role": role])
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
    ///
    /// Design v3: the roles as a two-column grid of filled tiles (name and what
    /// it is), the picked one ringed in paper with a check. What it means —
    /// the summary, what it grants, the world's own line — reads once, under
    /// the grid, for the picked role only.
    private func archetypePicker(_ detail: StoryDetailResponse) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            VStack(alignment: .leading, spacing: 4) {
                Text(archetypeField?.label ?? t("setup.archetype_heading"))
                    .font(.system(size: 20, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .accessibilityAddTraits(.isHeader)
                if let help = archetypeField?.helpText, !help.isEmpty {
                    Text(help)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }

            // Two columns, each row as tall as its taller tile. Rows are built
            // by hand rather than with LazyVGrid, which sizes every cell to
            // its own content and leaves ragged pairs.
            let art = RoleArt.showsArt(detail.archetypes)
            VStack(spacing: 10) {
                ForEach(Array(RoleArt.rows(roleChoices(detail, art: art)).enumerated()), id: \.offset) { _, row in
                    HStack(alignment: .top, spacing: 10) {
                        ForEach(row) { choice in
                            roleButton(choice, art: art)
                        }
                        if row.count == 1 {
                            Color.clear.frame(maxWidth: .infinity, maxHeight: 1)
                        }
                    }
                    .fixedSize(horizontal: false, vertical: true)
                }
            }

            if let option = archetype {
                VStack(alignment: .leading, spacing: 10) {
                    (Text(option.name + ". ").fontWeight(.semibold).foregroundStyle(Theme.Colors.textPrimary)
                        + Text(option.summary))
                        .font(.system(size: 15))
                        .lineSpacing(3)
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .fixedSize(horizontal: false, vertical: true)
                    GrantList(grants: option.grants)
                    if !option.blurb.isEmpty {
                        Text(option.blurb)
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.Colors.textMuted)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
                .padding(.top, 4)
            }

            if usingCustomArchetype {
                Text(t("setup.custom_background_body"))
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
                SetupField(label: t("setup.custom_background_label"), value: $customArchetype,
                           placeholder: t("setup.custom_background_placeholder"), maxLength: 240, multiline: true)
            }
        }
    }

    /// Every role, then "Something else". With art (newer servers), each role
    /// shows one of the story's stage images and "Something else" the key art
    /// at half strength; without, the tiles are text only, as before.
    private func roleChoices(_ detail: StoryDetailResponse, art: Bool) -> [RoleChoice] {
        detail.archetypes.map { option in
            RoleChoice(
                id: option.id,
                title: option.name,
                line: option.role,
                image: option.image,
                imageOpacity: 1,
                a11y: t("setup.archetype_a11y", ["name": option.name, "role": option.role, "summary": option.summary])
            )
        } + [
            RoleChoice(
                id: customChoice,
                title: t("setup.something_else"),
                line: t("setup.write_own_background"),
                image: art ? RoleArt.somethingElseImage(detail.story) : nil,
                imageOpacity: 0.5,
                a11y: t("setup.write_own_background")
            ),
        ]
    }

    private func roleButton(_ choice: RoleChoice, art: Bool) -> some View {
        let custom = choice.id == customChoice
        let selected = custom ? usingCustomArchetype : archetypeId == choice.id
        return Button {
            Haptic.play(.light)
            if custom {
                archetypeId = usingCustomArchetype ? nil : customChoice
            } else {
                archetypeId = selected ? nil : choice.id
            }
        } label: {
            if art {
                roleArtTile(choice, selected: selected)
            } else {
                roleTile(title: choice.title, line: choice.line, selected: selected)
            }
        }
        .buttonStyle(PressOpacityStyle(pressed: 0.85))
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .accessibilityLabel(choice.a11y)
        .accessibilityAddTraits(selected ? .isSelected : [])
    }

    /// Design v3 (board frame Who are you?): a 72pt picture band over the
    /// filled body, the picked tile ringed in paper with a check on the art.
    private func roleArtTile(_ choice: RoleChoice, selected: Bool) -> some View {
        let shape = RoundedRectangle(cornerRadius: 12, style: .continuous)
        return VStack(alignment: .leading, spacing: 0) {
            Color.clear
                .frame(height: 72)
                .frame(maxWidth: .infinity)
                .overlay {
                    RemoteImage(choice.image?.assetURL) { Theme.Colors.bgRaised }
                        .opacity(choice.imageOpacity)
                }
                .background(Theme.Colors.bgRaised)
                .clipped()
                .accessibilityHidden(true)
            Text(choice.title)
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
                .padding(.top, 10)
                .padding(.horizontal, 12)
            Text(choice.line)
                .font(.system(size: 13))
                .foregroundStyle(Theme.Colors.textSecondary)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
                .padding(.top, 2)
                .padding(.horizontal, 12)
                .padding(.bottom, 12)
            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(Theme.Colors.bgElevated)
        .clipShape(shape)
        .overlay { if selected { shape.strokeBorder(Theme.Colors.textPrimary, lineWidth: 2) } }
        .overlay(alignment: .topTrailing) {
            if selected {
                Image(systemName: "checkmark")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundStyle(Theme.Colors.textOnLight)
                    .frame(width: 24, height: 24)
                    .background(Theme.Colors.light, in: Circle())
                    .padding(8)
            }
        }
        .contentShape(shape)
    }

    private func roleTile(title: String, line: String, selected: Bool) -> some View {
        let shape = RoundedRectangle(cornerRadius: 16, style: .continuous)
        return VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
            Text(line)
                .font(.system(size: 13))
                .foregroundStyle(Theme.Colors.textSecondary)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
            Spacer(minLength: 0)
        }
        .padding(14)
        .frame(maxWidth: .infinity, minHeight: 96, maxHeight: .infinity, alignment: .topLeading)
        .background(Theme.Colors.bgElevated, in: shape)
        .overlay { if selected { shape.strokeBorder(Theme.Colors.textPrimary, lineWidth: 2) } }
        .overlay(alignment: .topTrailing) {
            if selected {
                Image(systemName: "checkmark")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundStyle(Theme.Colors.textOnLight)
                    .frame(width: 22, height: 22)
                    .background(Theme.Colors.light, in: Circle())
                    .padding(10)
            }
        }
        .contentShape(shape)
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

    /// Spec §9.4 — a tiny canon summary, never a stat block: who you will
    /// enter as, one quiet line over the one button.
    private var footer: some View {
        VStack(spacing: Theme.Spacing.sm) {
            if detail != nil, !summaryLine.isEmpty {
                Text(t("setup.enter_as").lowercased().prefix(1).uppercased() + t("setup.enter_as").lowercased().dropFirst() + " " + summaryLine)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .lineLimit(1)
            }
            PBButton(effectiveName.isEmpty ? t("setup.enter") : t("setup.play_as", ["name": effectiveName]),
                     loadingLabel: t("setup.entering"), variant: .light, loading: starting,
                     disabled: !canStart, haptic: .medium) {
                Task { await start() }
            }
            if !advancedFields.isEmpty {
                Button {
                    advanced.toggle()
                } label: {
                    Text(advanced ? t("setup.use_quick_setup") : t("setup.customize_more"))
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .frame(maxWidth: .infinity, minHeight: Theme.minTouchTarget)
                }
                .buttonStyle(PressOpacityStyle())
            }
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, Theme.Spacing.sm)
        .background(Theme.Colors.bgBase)
    }

    // MARK: Actions

    /// Skip: start now with the default identity, exactly as the Story page's
    /// Play does. A shortfall opens the store; anything else is said here.
    private func skip(_ detail: StoryDetailResponse) async {
        guard !starting else { return }
        starting = true
        error = nil
        defer { starting = false }
        do {
            let sessionId = try await QuickStart.start(detail, store: store, startPath: "instant")
            router.push(.session(sessionId: sessionId))
        } catch {
            if let api = error as? APIError, api.isInsufficientCredits {
                router.present(.wallet(shortfall: api.shortfall))
            }
            self.error = error is APIError ? error.playerMessage : t("setup.could_not_start")
        }
    }

    /// §9.1 setup fatigue: a player who has entered a story before has already
    /// said who they are, so the fields start from that answer, falling back to
    /// the name onboarding asked for. Only empty fields are filled, so coming
    /// back to this screen never overwrites something typed.
    private func prefill() {
        let hero = store.lastHero
        if displayName.isEmpty {
            displayName = String((hero.name.isEmpty ? store.displayName ?? "" : hero.name).prefix(40))
        }
        if pronouns.isEmpty { pronouns = String(hero.pronouns.prefix(24)) }
        // Only where the question is asked: an English run must keep sending
        // `UNSPECIFIED`.
        if store.locale == .fr, grammarGender == .UNSPECIFIED, let grammar = hero.grammar {
            grammarGender = grammar
        }
    }

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
            // A world that named you is its answer, not yours to reuse. An
            // English run leaves the last French grammar answer where it was.
            if !named {
                store.rememberHero(HeroDefaults(
                    name: effectiveName,
                    pronouns: pronouns.trimmingCharacters(in: .whitespacesAndNewlines),
                    grammar: asksGrammar ? grammarGender : store.lastHero.grammar
                ))
            }
            // §37.1 — emitted here rather than server-side because the two
            // properties that make it useful are measured on this clock: how
            // long setup took, and whether the player used the quick path.
            // The server never sees when setup began.
            Telemetry.track(.sessionStarted, sessionId: session.session.sessionId, [
                "storyId": storyId,
                "storyVersionId": session.session.storyVersionId,
                "archetypeId": identity.archetypeId ?? NSNull(),
                "usedQuickSetup": !advanced,
                "setupDurationMs": Int(Date().timeIntervalSince(setupStartedAt) * 1000),
                "startPath": "customized",
            ])
            router.replaceTopWithSession(session.session.sessionId)
        } catch {
            if let api = error as? APIError, api.isInsufficientCredits {
                // §37.3 — the paywall moment, recorded where the player meets
                // it. The server returned 402 and knows the numbers, but only
                // the client knows the sheet was actually put in front of them.
                Telemetry.track(.insufficientCreditsShown, [
                    "required": api.requiredCredits ?? 0,
                    "balance": api.balanceCredits ?? 0,
                    "shortfall": api.shortfall ?? 0,
                    "qualityTier": "SESSION_START",
                ])
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

/// Shared with `IdentitySheet`, which asks the same three questions from inside
/// the story. Internal rather than private for that reason alone.
struct SetupField: View {
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
                    Text(label)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .lineLimit(1)
                        .minimumScaleFactor(0.85)
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
        .padding(.horizontal, 18)
        .padding(.vertical, Theme.Spacing.md)
        .frame(minHeight: multiline ? 88 : 48, alignment: multiline ? .topLeading : .leading)
        // Design v3: filled, no outline; a single line is a capsule.
        .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: multiline ? 16 : 24, style: .continuous))
        .onChange(of: value) { _, next in
            if let maxLength, next.count > maxLength { value = String(next.prefix(maxLength)) }
        }
    }
}

// MARK: - SelectableCard
//
// `Card` with a border that answers to selection (and RN's dashed "write your
// own" variant). File-private while screens are ported in parallel.

/// Shared with `IdentitySheet`. See `SetupField`.
struct SelectableCard<Content: View>: View {
    var selected: Bool
    var dashed: Bool = false
    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .padding(Theme.Spacing.lg)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay {
                // Design v3: no resting outline; the picked one is ringed in paper.
                if selected {
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .strokeBorder(Theme.Colors.textPrimary, lineWidth: 2)
                }
            }
            .contentShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}

// MARK: - Role tiles

/// One tile on the "Who are you?" grid: a role, or "Something else".
private struct RoleChoice: Identifiable {
    let id: String
    let title: String
    let line: String
    let image: String?
    let imageOpacity: Double
    let a11y: String
}

/// Whether the role grid draws pictures, and how it pairs tiles into rows.
enum RoleArt {
    /// True once any role carries an image. An older server sends none, and
    /// the grid stays text only rather than drawing empty picture bands.
    static func showsArt(_ archetypes: [SetupArchetype]) -> Bool {
        archetypes.contains { !($0.image ?? "").isEmpty }
    }

    /// "Something else" has no stage of its own; it gets the story's key art.
    static func somethingElseImage(_ story: StorySummary) -> String? {
        story.keyArt ?? story.coverImage
    }

    /// Pairs for the two-column grid; an odd one out sits alone in the last row.
    static func rows<T>(_ items: [T]) -> [[T]] {
        stride(from: 0, to: items.count, by: 2).map { Array(items[$0..<min($0 + 2, items.count)]) }
    }
}
