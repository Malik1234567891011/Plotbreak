import SwiftUI

// MARK: - Now (design v3, board frame World sheet)
//
// The sheet's first tab: what is going on, in four plain sections under 20pt
// sentence-case headings, with no boxes and no numerals. Open threads (the
// objective and the quests still in play), Here now (who is in the room),
// You are carrying, and Lately.
//
// The board's "Ayame's rules" block has no structured data behind it (the
// rules are prose inside each premise), so Open threads is the closest
// feasible version of that block.

/// What the Now tab shows, derived from the sheet. Pure, so it is tested
/// without a view (`PlotbreakTests/WorldSheetNowTests.swift`).
struct WorldSheetNow: Equatable {
    struct Thread: Equatable, Identifiable {
        var id: String
        var title: String
        var detail: String?
        /// A finished quest, listed muted under the open ones.
        var done: Bool
    }

    /// How many finished quests stay listed under the open ones.
    static let completedShown = 3

    var threads: [Thread]
    /// `nil` when the server predates `hereNow`; the section is hidden then,
    /// rather than claiming nobody is in the room.
    var hereNow: [HereNowCharacter]?
    var carrying: [InventoryEntry]
    var lately: [String]

    init(sheet: WorldSheetResponse) {
        threads = Self.threads(objective: sheet.overview.topObjective, quests: sheet.quests)
        hereNow = sheet.overview.hereNow
        carrying = sheet.inventory
        lately = sheet.overview.recentEvents.filter { !$0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
    }

    /// Nothing to show in any section: the tab says so instead of going blank.
    var isEmpty: Bool {
        threads.isEmpty && (hereNow ?? []).isEmpty && carrying.isEmpty && lately.isEmpty
    }

    /// The objective first, then the active quests, then the last few finished.
    ///
    /// The objective is usually the top active quest's current step (that is
    /// how the engine picks it), so it is not listed twice: the quest it came
    /// from moves to the front instead. Only an objective no active quest
    /// accounts for gets a row of its own.
    static func threads(objective: String?, quests: [QuestView]) -> [Thread] {
        let objective = objective?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let active = quests.filter { $0.status == .ACTIVE }
        let completed = quests.filter { $0.status == .COMPLETED }.suffix(completedShown)

        func step(_ quest: QuestView) -> String? {
            guard let copy = quest.currentStepCopy?.trimmingCharacters(in: .whitespacesAndNewlines), !copy.isEmpty else { return nil }
            return copy
        }

        let source = objective.isEmpty ? nil : active.firstIndex {
            step($0) == objective || $0.summary.trimmingCharacters(in: .whitespacesAndNewlines) == objective
        }

        var rows: [Thread] = []
        if !objective.isEmpty && source == nil {
            rows.append(Thread(id: "objective", title: objective, detail: nil, done: false))
        }
        var ordered = active
        if let source {
            ordered.insert(ordered.remove(at: source), at: 0)
        }
        for (index, quest) in ordered.enumerated() {
            // The quest the objective came from keeps the objective as its
            // line, even when its step is hidden and only the summary matched.
            let detail = step(quest) ?? (source != nil && index == 0 ? objective : nil)
            rows.append(Thread(id: quest.questId, title: quest.title, detail: detail, done: false))
        }
        for quest in completed {
            rows.append(Thread(id: quest.questId, title: quest.title, detail: nil, done: true))
        }
        return rows
    }
}

struct WorldSheetNowTab: View {
    let sheet: WorldSheetResponse
    /// "See all" beside a heading opens that section's own tab.
    let onSeeAll: (WorldSheetTab) -> Void
    @Environment(\.translator) private var t

    private var now: WorldSheetNow { WorldSheetNow(sheet: sheet) }

    var body: some View {
        let now = now
        if now.isEmpty {
            EmptyState(title: t("worldsheet.quests_empty_title"), message: t("worldsheet.quests_empty_body"))
        } else {
            VStack(alignment: .leading, spacing: 26) {
                if !now.threads.isEmpty {
                    section(t("worldsheet.open_threads")) { threads(now.threads) }
                }
                if let people = now.hereNow, !people.isEmpty {
                    section(t("worldsheet.here_now"), seeAll: .relationships) { here(people) }
                }
                if !now.carrying.isEmpty {
                    section(t("worldsheet.carrying"), seeAll: .inventory) { carrying(now.carrying) }
                }
                if !now.lately.isEmpty {
                    section(t("worldsheet.lately")) { lately(now.lately) }
                }
            }
        }
    }

    // MARK: Section shell

    private func section<Content: View>(
        _ title: String,
        seeAll: WorldSheetTab? = nil,
        @ViewBuilder content: () -> Content
    ) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            HStack(alignment: .firstTextBaseline) {
                Text(title)
                    .font(.system(size: 20, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .accessibilityAddTraits(.isHeader)
                Spacer(minLength: Theme.Spacing.sm)
                if let seeAll {
                    // The one trailing link the system allows: plain text, no arrow.
                    Button {
                        Haptic.play(.light)
                        onSeeAll(seeAll)
                    } label: {
                        Text(t("worldsheet.see_all"))
                            .font(.system(size: 15))
                            .foregroundStyle(Theme.Colors.textSecondary)
                            .frame(minHeight: Theme.minTouchTarget)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(PressOpacityStyle())
                    // A full 44pt to hit, but only the heading's height to lay
                    // out, so a section with the link starts its content as
                    // close under the heading as one without it.
                    .padding(.vertical, -(Theme.minTouchTarget - 25) / 2)
                    .accessibilityLabel("\(t("worldsheet.see_all")), \(title)")
                }
            }
            .frame(minHeight: 25)
            content()
        }
    }

    // MARK: Open threads

    /// Plain rows between hairlines: the board's list without its numerals.
    private func threads(_ rows: [WorldSheetNow.Thread]) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            ForEach(rows) { row in
                HStack(alignment: .firstTextBaseline, spacing: Theme.Spacing.sm) {
                    if row.done {
                        Image(systemName: "checkmark")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textMuted)
                            .accessibilityHidden(true)
                    }
                    VStack(alignment: .leading, spacing: 2) {
                        Text(row.title)
                            .font(.system(size: 17, weight: row.done ? .regular : .semibold))
                            .foregroundStyle(row.done ? Theme.Colors.textMuted : Theme.Colors.textPrimary)
                            .fixedSize(horizontal: false, vertical: true)
                        if let detail = row.detail {
                            Text(detail)
                                .font(.system(size: 15))
                                .lineSpacing(3)
                                .foregroundStyle(Theme.Colors.textSecondary)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                    Spacer(minLength: 0)
                }
                .padding(.vertical, Theme.Spacing.md)
                .overlay(alignment: .top) { hairline }
                .accessibilityElement(children: .combine)
                .accessibilityLabel(row.done ? t("worldsheet.thread_done_a11y", ["title": row.title]) : [row.title, row.detail].compactMap { $0 }.joined(separator: ". "))
            }
        }
        .overlay(alignment: .bottom) { hairline }
    }

    private var hairline: some View {
        Rectangle().fill(Theme.Colors.borderHairline).frame(height: 1)
    }

    // MARK: Here now

    private func here(_ people: [HereNowCharacter]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            ForEach(people) { person in
                HStack(spacing: Theme.Spacing.md) {
                    // A character is a rounded square (24%); only you are round.
                    CharacterPortrait(name: person.name, uri: person.portrait, size: 44)
                        .accessibilityHidden(true)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(person.name)
                            .font(.system(size: 17, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .lineLimit(1)
                        if !person.line.isEmpty {
                            Text(person.line)
                                .font(.system(size: 13))
                                .foregroundStyle(Theme.Colors.textSecondary)
                                .lineLimit(2)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                    Spacer(minLength: 0)
                }
                .accessibilityElement(children: .combine)
            }
        }
    }

    // MARK: You are carrying

    /// The item names as filled tags. The Things tab has the details.
    private func carrying(_ items: [InventoryEntry]) -> some View {
        FlowLayout(spacing: Theme.Spacing.sm) {
            ForEach(items) { item in
                Text(item.quantity > 1 ? "\(item.name) ×\(item.quantity)" : item.name)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .lineLimit(1)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 7)
                    .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 6, style: .continuous))
            }
        }
    }

    // MARK: Lately

    private func lately(_ events: [String]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            ForEach(Array(events.enumerated()), id: \.offset) { _, event in
                Text(event)
                    .font(.system(size: 15))
                    .lineSpacing(3)
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
    }
}
