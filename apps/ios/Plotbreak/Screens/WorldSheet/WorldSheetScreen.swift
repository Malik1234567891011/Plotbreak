import SwiftUI

// MARK: - WorldSheetScreen
//
// WS-01 to WS-07 — the World Sheet. Twin of `apps/mobile/src/screens/WorldSheet.tsx`.
//
// Spec §11 — the authoritative record. Everything here is engine truth, which
// is why the player can trust it over anything the prose said.

/// Design v3 (board frame World sheet): Now · People · Things · Map ·
/// Timeline · You, in that order. Overview and Quests left the strip; their
/// sections live on Now (threads, recent events) and You (resources, effects).
///
/// The raw values are what telemetry reports, so the surviving tabs keep the
/// names they always had.
enum WorldSheetTab: String, CaseIterable {
    case now, relationships, inventory, map, timeline, character

    var labelKey: TranslationKey {
        switch self {
        case .now: return "worldsheet.tab_now"
        case .relationships: return "worldsheet.tab_people"
        case .inventory: return "worldsheet.tab_inventory"
        case .map: return "worldsheet.tab_map"
        case .timeline: return "worldsheet.tab_timeline"
        case .character: return "worldsheet.tab_character"
        }
    }

    /// The tab a caller asked for. `nil`, the retired `overview` and `quests`
    /// (the objective strip still asks for that one) and anything unknown open
    /// on Now, where the objective and the quests now are.
    static func initial(_ requested: String?) -> WorldSheetTab {
        requested.flatMap(WorldSheetTab.init(rawValue:)) ?? .now
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
        _tab = State(initialValue: WorldSheetTab.initial(initialTab))
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                // Design v3 (board frame World sheet): where you are is the
                // title, the chapter and the hour one quiet line over it, a
                // round close button.
                HStack(alignment: .top, spacing: Theme.Spacing.md) {
                    VStack(alignment: .leading, spacing: 2) {
                        if let overview = sheet?.overview {
                            Text([overview.chapterLabel, overview.worldTimeLabel].filter { !$0.isEmpty }.joined(separator: " · "))
                                .font(.system(size: 13))
                                .foregroundStyle(Theme.Colors.textMuted)
                                .lineLimit(1)
                        }
                        Text(sheet.map { $0.overview.locationName.isEmpty ? t("worldsheet.title") : $0.overview.locationName } ?? t("worldsheet.title"))
                            .font(.system(size: 28, weight: .bold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .lineLimit(2)
                            .accessibilityAddTraits(.isHeader)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    Button {
                        Haptic.play(.light)
                        router.dismissSheet()
                    } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .frame(width: 44, height: 44)
                            .background(Theme.Colors.bgRaised, in: Circle())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t("worldsheet.close"))
                }
                .padding(.horizontal, Theme.gutter)
                .padding(.top, Theme.Spacing.lg)

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
                            case .now: WorldSheetNowTab(sheet: sheet) { tab = $0 }
                            case .character: WorldSheetCharacterTab(sheet: sheet, sessionId: sessionId)
                            case .inventory: WorldSheetInventoryTab(sheet: sheet)
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
        .task(id: sessionId) {
            await load()
            // §37 — which tab, and how far into the run. A sheet opened on turn
            // 3 is orientation; the same sheet on turn 30 is a player who has
            // lost the thread, and only one of those is a content problem.
            Telemetry.track(.worldSheetOpened, sessionId: sessionId, [
                "tab": tab.rawValue,
                // The world sheet itself is a snapshot with no turn on it;
                // the timeline it loads alongside is stamped per turn, so its
                // latest entry is where the run has got to.
                "turnIndex": timeline.map(\.turnIndex).max() ?? 0,
            ])
        }
    }

    /// Both requests at once. Not `async let`: on iOS 26.1 the pair aborted
    /// the app in `swift_task_dealloc` (asyncLet_finish_after_task_completion)
    /// the moment the sheet opened. Two tasks do the same work without it.
    private func load() async {
        let api = store.api
        let id = sessionId
        let sheetTask = Task { try await api.worldSheet(id) }
        let timelineTask = Task { try await api.timeline(id) }
        if let loaded = try? await sheetTask.value { sheet = loaded }
        if let loaded = try? await timelineTask.value { timeline = loaded.entries }
    }
}

// MARK: - Character (WS-02 — attributes explain themselves in plain language, §11.2)

struct WorldSheetCharacterTab: View {
    let sheet: WorldSheetResponse
    /// Needed so the player can change who they are from here. See
    /// `IdentitySheet` for why this lives in the story rather than in front of
    /// it.
    var sessionId: String = ""
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    @State private var expanded: String?
    @State private var editing = false
    /// The edited identity, once saved, so the card updates without a reload.
    @State private var edited: PlayerIdentity?

    private var character: WorldSheetCharacter { sheet.character }
    private var identity: PlayerIdentity { edited ?? character.identity }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
            Card {
                VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                    HStack(alignment: .firstTextBaseline) {
                        Txt(identity.displayName, .h3)
                        Spacer(minLength: Theme.Spacing.sm)
                        if !sessionId.isEmpty {
                            Button { editing = true } label: {
                                Txt(t("identity.edit"), .bodyCompact, color: Theme.Colors.accentPrimary)
                            }
                            .buttonStyle(PressOpacityStyle())
                        }
                    }
                    Txt(identity.pronouns, .caption, color: Theme.Colors.textSecondary)
                    if !identity.worldKnowsAboutYou.isEmpty {
                        Txt(identity.worldKnowsAboutYou, .bodyCompact, color: Theme.Colors.textSecondary)
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

            // From the retired Overview: what the run is carrying in the body
            // (resources) and what is on you right now (effects).
            if !sheet.overview.resources.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                    ForEach(sheet.overview.resources) { resource in
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

            if !sheet.overview.statuses.isEmpty {
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    Txt(t("worldsheet.active_effects"), .h3)
                    FlowLayout {
                        ForEach(sheet.overview.statuses) { status in
                            Chip(status.label, tone: status.kind == .DEBUFF ? .warning : status.kind == .BUFF ? .success : .neutral)
                        }
                    }
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
        .sheet(isPresented: $editing) {
            IdentitySheet(sessionId: sessionId, identity: identity) { saved in
                edited = saved
            }
        }
    }
}
