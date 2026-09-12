import SwiftUI

// MARK: - WorldSheetScreen
//
// WS-01 to WS-07 — the World Sheet. Twin of `apps/mobile/src/screens/WorldSheet.tsx`.
//
// Spec §11 — the authoritative record. Everything here is engine truth, which
// is why the player can trust it over anything the prose said.

enum WorldSheetTab: String, CaseIterable {
    case overview, character, inventory, quests, relationships, map, timeline

    var labelKey: TranslationKey {
        switch self {
        case .overview: return "worldsheet.tab_overview"
        case .character: return "worldsheet.tab_character"
        case .inventory: return "worldsheet.tab_inventory"
        case .quests: return "worldsheet.tab_quests"
        case .relationships: return "worldsheet.tab_people"
        case .map: return "worldsheet.tab_map"
        case .timeline: return "worldsheet.tab_timeline"
        }
    }
}

struct WorldSheetScreen: View {
    let sessionId: String
    let initialTab: String?

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var tab: WorldSheetTab
    @State private var sheet: WorldSheetResponse?
    @State private var timeline: [TimelineEntry] = []

    init(sessionId: String, initialTab: String?) {
        self.sessionId = sessionId
        self.initialTab = initialTab
        _tab = State(initialValue: initialTab.flatMap(WorldSheetTab.init(rawValue:)) ?? .overview)
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Txt(t("worldsheet.title"), .h2)
                    Spacer(minLength: 0)
                    IconButton(t("worldsheet.close"), glyph: "✕") { router.dismissSheet() }
                }
                .padding(.horizontal, Theme.gutter)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: Theme.Spacing.sm) {
                        ForEach(WorldSheetTab.allCases, id: \.self) { id in
                            Chip(t(id.labelKey), selected: tab == id) { tab = id }
                        }
                    }
                    .padding(.horizontal, Theme.gutter)
                    .padding(.vertical, Theme.Spacing.md)
                }
                .frame(maxHeight: 60)

                if let sheet {
                    ScrollView {
                        VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                            switch tab {
                            case .overview: WorldSheetOverviewTab(sheet: sheet)
                            case .character: WorldSheetCharacterTab(sheet: sheet)
                            case .inventory: WorldSheetInventoryTab(sheet: sheet)
                            case .quests: WorldSheetQuestsTab(sheet: sheet)
                            case .relationships: WorldSheetRelationshipsTab(sheet: sheet)
                            case .map: WorldSheetMapTab(sheet: sheet)
                            case .timeline:
                                WorldSheetTimelineTab(
                                    entries: timeline,
                                    sessionId: sessionId,
                                    // i18n-exempt: the app's own name, which is not translated
                                    storyTitle: sheet.overview.chapterLabel,
                                    onRefresh: { timeline = $0 }
                                )
                            }
                        }
                        .padding(Theme.gutter)
                        .padding(.bottom, Theme.Spacing.giant)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                } else {
                    VStack(spacing: Theme.Spacing.md) {
                        Skeleton(height: 80)
                        Skeleton(height: 140)
                        Spacer()
                    }
                    .padding(Theme.gutter)
                }
            }
        }
        .task(id: sessionId) { await load() }
    }

    private func load() async {
        async let sheetTask = store.api.worldSheet(sessionId)
        async let timelineTask = store.api.timeline(sessionId)
        if let loaded = try? await sheetTask { sheet = loaded }
        if let loaded = try? await timelineTask { timeline = loaded.entries }
    }
}

// MARK: - Wrapping row
//
// The RN screens use `flexWrap: 'wrap'` rows of chips; SwiftUI has no built-in
// wrapping stack, so this is the one layout the three screens share.

// MARK: - Overview (WS-01 — current essentials only, §11.1)

struct WorldSheetOverviewTab: View {
    let sheet: WorldSheetResponse
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    private var overview: WorldSheetOverview { sheet.overview }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
            Card {
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    HStack(alignment: .firstTextBaseline) {
                        Txt(overview.locationName, .h3)
                        Spacer(minLength: Theme.Spacing.sm)
                        Txt(overview.worldTimeLabel, .caption, color: Theme.Colors.textMuted)
                    }
                    Txt(overview.chapterLabel, .micro, color: Theme.Colors.textMuted)
                    VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        ForEach(overview.resources) { resource in
                            ResourceBar(
                                name: resource.name,
                                current: resource.current,
                                max: resource.max,
                                color: resource.color,
                                polarity: resource.polarity,
                                locale: store.locale
                            )
                        }
                    }
                }
            }

            if let objective = overview.topObjective, !objective.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    Txt(t("worldsheet.current_objective"), .caption, color: Theme.Colors.textMuted)
                    Txt(objective, .body)
                }
            }

            if !overview.statuses.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    Txt(t("worldsheet.active_effects"), .caption, color: Theme.Colors.textMuted)
                    FlowLayout {
                        ForEach(overview.statuses) { status in
                            Chip(status.label, tone: status.kind == .DEBUFF ? .warning : status.kind == .BUFF ? .success : .neutral)
                        }
                    }
                }
            }

            if !overview.relationshipHighlights.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    Txt(t("worldsheet.relationship_highlights"), .caption, color: Theme.Colors.textMuted)
                    FlowLayout {
                        ForEach(overview.relationshipHighlights) { highlight in
                            Chip(t("worldsheet.highlight", ["name": highlight.name, "label": highlight.label]))
                        }
                    }
                }
            }

            if !overview.recentEvents.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    Txt(t("worldsheet.recently"), .caption, color: Theme.Colors.textMuted)
                    ForEach(Array(overview.recentEvents.enumerated()), id: \.offset) { _, event in
                        Txt(t("worldsheet.recent_event", ["event": event]), .bodyCompact, color: Theme.Colors.textSecondary)
                    }
                }
            }
        }
    }
}

// MARK: - Character (WS-02 — attributes explain themselves in plain language, §11.2)

struct WorldSheetCharacterTab: View {
    let sheet: WorldSheetResponse
    @Environment(\.translator) private var t
    @State private var expanded: String?

    private var character: WorldSheetCharacter { sheet.character }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
            Card {
                VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                    Txt(character.identity.displayName, .h3)
                    Txt(character.identity.pronouns, .caption, color: Theme.Colors.textSecondary)
                    if !character.identity.worldKnowsAboutYou.isEmpty {
                        Txt(character.identity.worldKnowsAboutYou, .bodyCompact, color: Theme.Colors.textSecondary)
                            .padding(.top, Theme.Spacing.sm)
                    }
                    HStack(spacing: Theme.Spacing.sm) {
                        if character.progressionMode == .LEVEL {
                            Chip(t("worldsheet.level", ["level": character.level]), tone: .accent)
                        } else {
                            Chip(t("worldsheet.milestones", ["count": character.milestones.count]), tone: .accent)
                        }
                    }
                    .padding(.top, Theme.Spacing.sm)
                }
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                Txt(t("worldsheet.attributes"), .h3)
                ForEach(character.attributes) { attribute in
                    Button {
                        withAnimation(.easeOut(duration: Theme.Durations.short)) {
                            expanded = expanded == attribute.key ? nil : attribute.key
                        }
                    } label: {
                        Card {
                            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                HStack {
                                    Txt(attribute.name, .bodyStrong)
                                    Spacer(minLength: Theme.Spacing.sm)
                                    HStack(spacing: Theme.Spacing.sm) {
                                        Txt(String(attribute.value), .body)
                                        Txt((attribute.modifier >= 0 ? "+" : "") + String(attribute.modifier), .caption, color: Theme.Colors.textMuted)
                                    }
                                }
                                if expanded == attribute.key {
                                    Txt(attribute.plainLanguage, .caption, color: Theme.Colors.textSecondary)
                                }
                            }
                        }
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t("worldsheet.attribute_a11y", [
                        "name": attribute.name, "value": attribute.value, "plain": attribute.plainLanguage,
                    ]))
                }
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                Txt(t("worldsheet.skills"), .h3)
                let ordered = character.skills.filter { $0.proficiency > 0 } + character.skills.filter { $0.proficiency == 0 }
                ForEach(ordered) { skill in
                    HStack {
                        Txt(skill.name, .bodyCompact, color: skill.proficiency > 0 ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
                        Spacer(minLength: Theme.Spacing.sm)
                        Txt(skill.proficiencyLabel, .caption, color: skill.proficiency > 0 ? Theme.Colors.accentPrimary : Theme.Colors.textMuted)
                    }
                }
            }

            if !character.abilities.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    Txt(t("worldsheet.powers"), .h3)
                    ForEach(character.abilities) { ability in
                        Card {
                            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                HStack {
                                    Txt(ability.name, .bodyStrong)
                                    Spacer(minLength: Theme.Spacing.sm)
                                    if !ability.costLabel.isEmpty {
                                        Txt(ability.costLabel, .caption, color: Theme.Colors.accentPrimary)
                                    }
                                }
                                // What it does, then what it is. The description is good
                                // writing and does not tell you whether it hits one person or
                                // the room, or what it costs, or whether it can fail.
                                Txt(ability.effect, .caption)
                                Txt(ability.description, .caption, color: Theme.Colors.textSecondary)
                                if ability.cooldownRemaining > 0 {
                                    Txt(t("worldsheet.cooldown", ["minutes": ability.cooldownRemaining]), .micro, color: Theme.Colors.warning)
                                }
                            }
                        }
                    }
                }
            }

            if !character.factions.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    Txt(t("worldsheet.standing"), .h3)
                    ForEach(character.factions) { faction in
                        HStack {
                            Txt(faction.name, .bodyCompact)
                            Spacer(minLength: Theme.Spacing.sm)
                            Chip(faction.rankLabel.isEmpty ? t("worldsheet.rank_unknown") : faction.rankLabel)
                        }
                    }
                }
            }
        }
    }
}
