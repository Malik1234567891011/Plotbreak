import SwiftUI

// MARK: - RelicVaultScreen
//
// Everything found, and everything still out there. Locked relics are shown on
// purpose — as silhouettes with their rarity, their story, the odds and a hint —
// because a shape you can see and do not have is the reason to go back in.
// Sorted rarest first so the top of the screen is always the most wanted thing.
//
// Design v3 (docs/design-v3/AUDIT.md, rules 1-7): the relics are the loud
// thing, in their rarity frames; everything around them is plain SF. The
// counts are one inline line, the rarity sections are sentence-case headings
// in the rarity's colour, the filters are the standard chips.

struct RelicVaultScreen: View {
    /// Where the player came from, for `relic_vault_opened`: "profile" or "reveal".
    var source: String = "profile"

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var vault: RelicCollectionResponse?
    @State private var failed = false
    @State private var storyFilter: String?
    @State private var selected: RelicEntry?

    private var shown: [RelicEntry] {
        (vault?.relics ?? []).filter { storyFilter == nil || $0.storyId == storyFilter }
    }

    private let columns = [GridItem(.flexible(), spacing: 12), GridItem(.flexible(), spacing: 12), GridItem(.flexible(), spacing: 12)]

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(backLabel: t("story.back"), onBack: { router.dismissSheet() })

                if let vault {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 0) {
                            Text(t("relics.vault_title"))
                                .font(.system(size: 28, weight: .bold))
                                .foregroundStyle(Theme.Colors.textPrimary)
                                .accessibilityAddTraits(.isHeader)
                            summary
                                .padding(.top, 6)
                            if vault.stories.count > 1 {
                                filters(vault)
                                    .padding(.top, Theme.Spacing.lg)
                            }
                            ForEach(RelicRarity.allCases, id: \.self) { rarity in
                                let items = shown.filter { RelicRarity($0.rarity) == rarity }
                                if !items.isEmpty {
                                    section(rarity, items)
                                        .padding(.top, Theme.Spacing.xxl)
                                }
                            }
                        }
                        .padding(.horizontal, Theme.pageGutter)
                        .padding(.top, Theme.Spacing.xs)
                        .padding(.bottom, Theme.Spacing.giant)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                } else if failed {
                    Spacer()
                    Text(t("relics.vault_closed"))
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textMuted)
                    Spacer()
                } else {
                    Spacer()
                    ProgressView().tint(Theme.Colors.textMuted)
                    Spacer()
                }
            }
        }
        .task { await load() }
        .sheet(item: $selected) { relic in
            RelicDetailSheet(relic: relic, locale: store.locale)
                .presentationDetents([.large])
                .presentationBackground(Theme.Colors.bgBase)
                .presentationCornerRadius(Theme.Radius.large)
                .preferredColorScheme(.dark)
        }
    }

    private func load() async {
        do {
            let loaded = try await store.api.relics()
            vault = loaded
            Telemetry.track(.relicVaultOpened, ["source": source, "owned": loaded.owned, "total": loaded.total])
        } catch {
            failed = true
        }
    }

    // MARK: Pieces

    /// "3 of 42 relics found", then one quiet count per rarity. For the story
    /// picked in the filters when there is one, so the line answers the page
    /// you are looking at.
    private var summary: some View {
        let relics = shown
        let counts = RelicRarity.allCases.compactMap { rarity -> String? in
            let all = relics.filter { RelicRarity($0.rarity) == rarity }
            guard !all.isEmpty else { return nil }
            return t("relics.rarity_count", [
                "rarity": t("relics.rarity_\(rarity.rawValue.lowercased())"),
                "owned": all.filter(\.owned).count,
                "total": all.count,
            ])
        }
        return VStack(alignment: .leading, spacing: 2) {
            Text(t("relics.found_of", ["owned": relics.filter(\.owned).count, "total": relics.count]))
                .font(.system(size: 15))
                .monospacedDigit()
                .foregroundStyle(Theme.Colors.textSecondary)
            if !counts.isEmpty {
                // i18n-exempt: the list separator between counts, not copy
                Text(verbatim: counts.joined(separator: " · "))
                    .font(.system(size: 13))
                    .monospacedDigit()
                    .foregroundStyle(Theme.Colors.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        .accessibilityElement(children: .combine)
    }

    private func filters(_ vault: RelicCollectionResponse) -> some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: Theme.Spacing.sm) {
                Chip(t("relics.filter_all"), selected: storyFilter == nil) { pick(nil) }
                ForEach(vault.stories) { story in
                    Chip(story.title, selected: storyFilter == story.storyId) { pick(story.storyId) }
                }
            }
            .padding(.horizontal, Theme.pageGutter)
        }
        .padding(.horizontal, -Theme.pageGutter)
    }

    private func pick(_ storyId: String?) {
        withAnimation(.easeOut(duration: Theme.Durations.short)) { storyFilter = storyId }
    }

    /// The rarity as a heading in its own colour, then its relics.
    private func section(_ rarity: RelicRarity, _ items: [RelicEntry]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Text(t("relics.rarity_\(rarity.rawValue.lowercased())").sentenceCased)
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(rarity.color)
                .accessibilityAddTraits(.isHeader)
            LazyVGrid(columns: columns, spacing: 14) {
                ForEach(items) { relic in
                    Button {
                        Haptic.play(.light)
                        selected = relic
                        Telemetry.track(.relicViewed, ["relicId": relic.id, "rarity": relic.rarity, "owned": relic.owned])
                    } label: { RelicCell(relic: relic) }
                        .buttonStyle(PressOpacityStyle(pressed: 0.8))
                }
            }
        }
    }
}

/// One grid cell: the item in its frame, the name, and for a locked relic the odds.
struct RelicCell: View {
    let relic: RelicEntry
    @Environment(\.translator) private var t
    private var rarity: RelicRarity { RelicRarity(relic.rarity) }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            ZStack(alignment: .topTrailing) {
                RelicArt(url: relic.imageUrl, rarity: rarity, owned: relic.owned, animated: relic.owned)
                    .padding(12)
                    .frame(maxWidth: .infinity)
                    .aspectRatio(1, contentMode: .fit)
                    // Design v3: art at an 8pt corner. The rarity frame stays:
                    // it is part of the item, not a box around it.
                    .relicFrame(rarity, owned: relic.owned, cornerRadius: 8)
                if relic.count > 1 {
                    Text(verbatim: "×\(relic.count)")
                        .font(.system(size: 11, weight: .bold))
                        .monospacedDigit()
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .padding(.horizontal, 6).padding(.vertical, 2)
                        .background(Capsule().fill(rarity.color.opacity(0.85)))
                        .padding(6)
                } else if !relic.owned {
                    Image(systemName: "lock.fill")
                        .font(.system(size: 10))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .padding(8)
                }
            }
            Text(relic.name)
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(relic.owned ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
                .lineLimit(2)
                .frame(maxWidth: .infinity, minHeight: 32, alignment: .topLeading)
            if !relic.owned {
                // i18n-exempt: the separator between two catalogue strings
                Text(verbatim: "\(relicChanceLabel(relic.chancePercent)) · \(relicTimingLabel(relic.timing, t))")
                    .font(.system(size: 11))
                    .monospacedDigit()
                    .foregroundStyle(Theme.Colors.textMuted)
                    .lineLimit(1)
                    .minimumScaleFactor(0.85)
            }
        }
        .accessibilityElement(children: .combine)
    }
}

// MARK: - Detail

/// One relic, big. Drag to tilt it and the foil follows your finger.
struct RelicDetailSheet: View {
    let relic: RelicEntry
    let locale: AppLocale
    @Environment(\.translator) private var t
    @Environment(\.dismiss) private var dismiss
    @State private var tilt: CGSize = .zero
    @State private var floating = false

    private var rarity: RelicRarity { RelicRarity(relic.rarity) }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    Spacer()
                    Button { dismiss() } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .frame(width: 36, height: 36)
                            .background(Theme.Colors.bgRaised, in: Circle())
                            .frame(width: Theme.minTouchTarget, height: Theme.minTouchTarget)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t("misc.close"))
                }
                .padding(.top, Theme.Spacing.sm)

                hero
                    .frame(maxWidth: .infinity)

                Text(relic.name)
                    .font(.system(size: 28, weight: .bold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityAddTraits(.isHeader)
                    .padding(.top, Theme.Spacing.sm)
                Text(t("relics.rarity_\(rarity.rawValue.lowercased())").sentenceCased)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(rarity.color)
                    .padding(.top, 2)
                // In-world words, so the story's serif; upright, not italic.
                Text(relic.owned ? (relic.flavor ?? "") : t("relics.locked_flavor"))
                    .font(.system(size: 17, design: .serif))
                    .foregroundStyle(relic.owned ? Theme.Colors.textSecondary : Theme.Colors.textMuted)
                    .lineSpacing(4)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.top, Theme.Spacing.md)

                VStack(spacing: 0) {
                    let rows = detailRows
                    ForEach(Array(rows.enumerated()), id: \.offset) { index, item in
                        row(item.label, item.value)
                        if index < rows.count - 1 {
                            Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5)
                                .padding(.leading, Theme.Spacing.lg)
                        }
                    }
                }
                .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                .padding(.top, Theme.Spacing.xxl)
            }
            .padding(.horizontal, Theme.pageGutter)
            .padding(.bottom, Theme.Spacing.huge)
        }
        .background(Theme.Colors.bgBase.ignoresSafeArea())
        .onAppear { withAnimation(.easeInOut(duration: 2.6).repeatForever(autoreverses: true)) { floating = true } }
    }

    private var detailRows: [(label: String, value: String)] {
        var rows: [(label: String, value: String)] = [
            (t("relics.row_found_in"), relic.storyTitle),
            (t("relics.row_when"), relicTimingLabel(relic.timing, t)),
            (t("relics.row_chance"), t("relics.row_chance_value", ["chance": relicChanceLabel(relic.chancePercent)])),
            (t("relics.row_hint"), "“\(relic.hint)”"),
        ]
        if relic.owned {
            rows.append((t("relics.row_count"), Format.number(relic.count, locale: locale)))
            if let first = relic.firstFoundAt.flatMap(date) {
                rows.append((t("relics.row_first"), first))
            }
        }
        return rows
    }

    private var hero: some View {
        ZStack {
            if relic.owned && rarity.sparkles {
                Sparkles(color: rarity.color, mythic: rarity == .MYTHIC, count: 26)
                    .frame(width: 320, height: 320)
            }
            RelicArt(url: relic.imageUrl, rarity: rarity, owned: relic.owned, animated: relic.owned)
                .frame(width: 240, height: 240)
                .offset(y: floating ? -6 : 6)
        }
        .frame(height: 300)
        .rotation3DEffect(.degrees(Double(tilt.width) / 6), axis: (x: 0, y: 1, z: 0))
        .rotation3DEffect(.degrees(Double(-tilt.height) / 6), axis: (x: 1, y: 0, z: 0))
        .gesture(
            DragGesture()
                .onChanged { value in
                    tilt = CGSize(width: max(-120, min(120, value.translation.width)), height: max(-120, min(120, value.translation.height)))
                }
                .onEnded { _ in withAnimation(.spring(response: 0.5, dampingFraction: 0.6)) { tilt = .zero } }
        )
        .accessibilityHidden(true)
    }

    private func row(_ label: String, _ value: String) -> some View {
        HStack(alignment: .top, spacing: Theme.Spacing.md) {
            Text(label)
                .font(.system(size: 15))
                .foregroundStyle(Theme.Colors.textMuted)
                .frame(width: 104, alignment: .leading)
            Text(value)
                .font(.system(size: 15))
                .foregroundStyle(Theme.Colors.textPrimary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(.horizontal, Theme.Spacing.lg)
        .padding(.vertical, 13)
        .accessibilityElement(children: .combine)
    }

    private func date(_ iso: String) -> String? {
        let parser = ISO8601DateFormatter()
        parser.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        guard let date = parser.date(from: iso) ?? ISO8601DateFormatter().date(from: iso) else { return nil }
        return Format.date(date, locale: locale, style: .medium)
    }
}
