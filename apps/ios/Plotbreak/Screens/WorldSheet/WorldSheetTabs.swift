import SwiftUI

// MARK: - Inventory (WS-03 — engine-authoritative items only, §11.3)

struct WorldSheetInventoryTab: View {
    let sheet: WorldSheetResponse
    @Environment(\.translator) private var t

    var body: some View {
        if sheet.inventory.isEmpty {
            EmptyState(title: t("worldsheet.inventory_empty_title"), message: t("worldsheet.inventory_empty_body"))
        } else {
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                ForEach(sheet.inventory) { item in
                    Card {
                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            HStack {
                                HStack(spacing: Theme.Spacing.sm) {
                                    Txt(item.name, .bodyStrong)
                                    if item.quantity > 1 {
                                        Txt("×\(item.quantity)", .caption, color: Theme.Colors.textMuted)
                                    }
                                }
                                Spacer(minLength: Theme.Spacing.sm)
                                if item.equipped { Chip(t("worldsheet.equipped"), tone: .accent) }
                                if let rarity = item.rarity, !rarity.isEmpty { Chip(rarity) }
                            }

                            Txt(item.description, .caption, color: Theme.Colors.textSecondary)

                            if !item.effects.isEmpty {
                                FlowLayout {
                                    ForEach(Array(item.effects.enumerated()), id: \.offset) { _, effect in
                                        Chip(effect, tone: .success)
                                    }
                                }
                            }

                            if !item.loreText.isEmpty {
                                Txt(item.loreText, .micro, color: Theme.Colors.textMuted, serif: true)
                            }
                        }
                    }
                }
            }
        }
    }
}

// MARK: - Relationships (WS-05 — qualitative labels by default, §11.5)

/// The five relationship dimensions, in the shape of `relationship.dimensions`;
/// the labels the player reads come out of the catalogue.
private let relationshipDimensions: [(TranslationKey, (RelationshipDimensions) -> Int)] = [
    ("worldsheet.dimension_trust", { $0.trust }),
    ("worldsheet.dimension_affection", { $0.affection }),
    ("worldsheet.dimension_respect", { $0.respect }),
    ("worldsheet.dimension_fear", { $0.fear }),
    ("worldsheet.dimension_rivalry", { $0.rivalry }),
]

struct WorldSheetRelationshipsTab: View {
    let sheet: WorldSheetResponse
    @Environment(\.translator) private var t

    private var showNumbers: Bool {
        sheet.relationships.contains { relationship in
            relationshipDimensions.contains { $0.1(relationship.dimensions) != 0 }
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            ForEach(sheet.relationships) { relationship in
                Card {
                    VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                        HStack(spacing: Theme.Spacing.md) {
                            CharacterPortrait(name: relationship.name, uri: relationship.portrait, size: 44)
                            VStack(alignment: .leading, spacing: 0) {
                                Txt(relationship.name, .bodyStrong)
                                Txt(relationship.label, .caption, color: Theme.Colors.accentSecondary)
                            }
                            Spacer(minLength: 0)
                        }

                        if showNumbers {
                            FlowLayout(spacing: Theme.Spacing.md) {
                                ForEach(relationshipDimensions, id: \.0) { key, read in
                                    VStack(alignment: .leading, spacing: 0) {
                                        Txt(t(key), .micro, color: Theme.Colors.textMuted)
                                        Txt(String(read(relationship.dimensions)), .caption)
                                    }
                                    .frame(minWidth: 64, alignment: .leading)
                                }
                            }
                        }
                    }
                }
            }
            if !showNumbers {
                Txt(t("worldsheet.relationship_numbers_hint"), .micro, color: Theme.Colors.textMuted)
            }
        }
    }
}

// MARK: - Map (WS-06 — a 2D node map, not an explorable world, §11.6)

struct WorldSheetMapTab: View {
    let sheet: WorldSheetResponse
    @Environment(\.translator) private var t

    private let size: CGFloat = 320

    private var a11yLabel: String {
        t("worldsheet.map_a11y", [
            "place": sheet.map.nodes.first(where: { $0.current })?.name ?? t("worldsheet.map_unknown_place"),
            "count": sheet.map.nodes.count,
        ])
    }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            GeometryReader { proxy in
                let width = proxy.size.width
                let height = proxy.size.height
                ZStack(alignment: .topLeading) {
                    Path { path in
                        for edge in sheet.map.edges {
                            guard let from = sheet.map.nodes.first(where: { $0.id == edge.from }),
                                  let to = sheet.map.nodes.first(where: { $0.id == edge.to }) else { continue }
                            path.move(to: CGPoint(x: from.position.x * width, y: from.position.y * height))
                            path.addLine(to: CGPoint(x: to.position.x * width, y: to.position.y * height))
                        }
                    }
                    .stroke(Theme.Colors.borderStrong, lineWidth: 1)

                    ForEach(sheet.map.nodes) { node in
                        VStack(spacing: 2) {
                            Circle()
                                .fill(node.current ? Theme.Colors.accentPrimary : node.hasQuest ? Theme.Colors.warning : Theme.Colors.textMuted)
                                .frame(width: 12, height: 12)
                            Txt(node.name, .micro, color: node.current ? Theme.Colors.accentPrimary : Theme.Colors.textSecondary, lineLimit: 1)
                                .fixedSize()
                        }
                        // Anchored so the dot sits on the point and the name hangs under it.
                        .alignmentGuide(VerticalAlignment.center) { $0[.top] + 6 }
                        .position(x: node.position.x * width, y: node.position.y * height)
                    }
                }
            }
            .frame(height: size)
            .frame(maxWidth: .infinity)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 1)
            }
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .accessibilityElement(children: .ignore)
            .accessibilityLabel(a11yLabel)

            FlowLayout(spacing: Theme.Spacing.md) {
                Chip(t("worldsheet.map_you_are_here"), tone: .accent)
                Chip(t("worldsheet.map_has_objective"), tone: .warning)
            }

            Txt(t("worldsheet.map_travel_hint"), .caption, color: Theme.Colors.textMuted)
        }
    }
}
