import SwiftUI

// MARK: - RelicVaultScreen
//
// Everything found, and everything still out there. Locked relics are shown on
// purpose — as silhouettes with their rarity, their story, the odds and a hint —
// because a shape you can see and do not have is the reason to go back in.
// Sorted rarest first so the top of the screen is always the most wanted thing.

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
                ScreenHeader(title: t("relics.vault_title"), backLabel: t("story.back"), onBack: { router.dismissSheet() })

                if let vault {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 22) {
                            summary(vault)
                            filters(vault)
                            ForEach(RelicRarity.allCases, id: \.self) { rarity in
                                let items = shown.filter { RelicRarity($0.rarity) == rarity }
                                if !items.isEmpty { section(rarity, items) }
                            }
                        }
                        .padding(.horizontal, 16)
                        .padding(.top, 12)
                        .padding(.bottom, 48)
                    }
                } else if failed {
                    Spacer()
                    Text(t("relics.vault_closed"))
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
            RelicDetailSheet(relic: relic)
                .presentationDetents([.large])
                .presentationBackground(Color(hex: 0x07090D))
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

    private func summary(_ vault: RelicCollectionResponse) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .firstTextBaseline, spacing: 6) {
                Text("\(vault.owned)")
                    .font(.system(size: 44, weight: .bold, design: .serif))
                    .foregroundStyle(.white)
                Text("/ " + t("relics.found_of", ["total": vault.total]))
                    .font(.system(size: 16, weight: .medium))
                    .foregroundStyle(Theme.Colors.textSecondary)
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Theme.Colors.track)
                    Capsule()
                        .fill(LinearGradient(colors: [Color(hex: 0x3FA9FF), Color(hex: 0xB061FF), Color(hex: 0xFFB627), Color(hex: 0xFF4FB8)], startPoint: .leading, endPoint: .trailing))
                        .frame(width: max(6, geo.size.width * CGFloat(vault.owned) / CGFloat(max(1, vault.total))))
                }
            }
            .frame(height: 6)
            HStack(spacing: 4) {
                ForEach(RelicRarity.allCases, id: \.self) { rarity in
                    let all = vault.relics.filter { RelicRarity($0.rarity) == rarity }
                    VStack(spacing: 2) {
                        Text("\(all.filter(\.owned).count)/\(all.count)")
                            .font(.system(size: 13, weight: .bold).monospacedDigit())
                            .foregroundStyle(.white)
                        RarityTag(rarity: rarity, size: 8)
                            .lineLimit(1)
                            .minimumScaleFactor(0.6)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .frame(maxWidth: .infinity)
                }
            }
        }
    }

    private func filters(_ vault: RelicCollectionResponse) -> some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                pill(t("relics.filter_all"), count: "\(vault.owned)/\(vault.total)", on: storyFilter == nil) { storyFilter = nil }
                ForEach(vault.stories) { story in
                    pill(story.title, count: "\(story.owned)/\(story.total)", on: storyFilter == story.storyId) { storyFilter = story.storyId }
                }
            }
        }
    }

    private func pill(_ label: String, count: String, on: Bool, action: @escaping () -> Void) -> some View {
        Button(action: { withAnimation(.easeOut(duration: 0.2)) { action() } }) {
            HStack(spacing: 6) {
                Text(label).font(.system(size: 14, weight: .semibold))
                Text(count).font(.system(size: 12, weight: .medium).monospacedDigit()).opacity(0.6)
            }
            .foregroundStyle(on ? Theme.Colors.textOnLight : .white)
            .padding(.horizontal, 14).padding(.vertical, 8)
            .background(Capsule().fill(on ? Color.white : Theme.Colors.surfaceButton))
        }
        .buttonStyle(.plain)
    }

    private func section(_ rarity: RelicRarity, _ items: [RelicEntry]) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                RarityTag(rarity: rarity, size: 12)
                Rectangle().fill(rarity.color.opacity(0.25)).frame(height: 1)
            }
            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(items) { relic in
                    Button {
                        selected = relic
                        Telemetry.track(.relicViewed, ["relicId": relic.id, "rarity": relic.rarity, "owned": relic.owned])
                    } label: { RelicCell(relic: relic) }
                        .buttonStyle(.plain)
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
        VStack(spacing: 6) {
            ZStack(alignment: .topTrailing) {
                RelicArt(url: relic.imageUrl, rarity: rarity, owned: relic.owned, animated: relic.owned)
                    .padding(12)
                    .frame(maxWidth: .infinity)
                    .aspectRatio(1, contentMode: .fit)
                    .relicFrame(rarity, owned: relic.owned, cornerRadius: 16)
                if relic.count > 1 {
                    Text("×\(relic.count)")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundStyle(.white)
                        .padding(.horizontal, 6).padding(.vertical, 2)
                        .background(Capsule().fill(rarity.color.opacity(0.85)))
                        .padding(6)
                } else if !relic.owned {
                    Image(systemName: "lock.fill")
                        .font(.system(size: 10))
                        .foregroundStyle(.white.opacity(0.45))
                        .padding(8)
                }
            }
            Text(relic.name)
                .font(.system(size: 12, weight: .semibold))
                .foregroundStyle(relic.owned ? .white : Theme.Colors.textMuted)
                .lineLimit(2)
                .multilineTextAlignment(.center)
                .frame(height: 30, alignment: .top)
            if !relic.owned {
                Text("\(relicChanceLabel(relic.chancePercent)) · \(relicTimingLabel(relic.timing, t))")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundStyle(rarity.color.opacity(0.8))
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
        }
    }
}

// MARK: - Detail

/// One relic, big. Drag to tilt it and the foil follows your finger.
struct RelicDetailSheet: View {
    let relic: RelicEntry
    @Environment(\.translator) private var t
    @Environment(\.dismiss) private var dismiss
    @State private var tilt: CGSize = .zero
    @State private var floating = false

    private var rarity: RelicRarity { RelicRarity(relic.rarity) }

    var body: some View {
        ScrollView {
            VStack(spacing: 22) {
                HStack {
                    Spacer()
                    Button { dismiss() } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(.white.opacity(0.7))
                            .frame(width: 36, height: 36)
                            .background(Circle().fill(.white.opacity(0.08)))
                    }
                }

                hero

                VStack(spacing: 8) {
                    RarityTag(rarity: rarity, size: 13)
                    Text(relic.name)
                        .font(.system(size: 30, weight: .bold, design: .serif))
                        .foregroundStyle(.white)
                        .multilineTextAlignment(.center)
                    Text(relic.owned
                         ? (relic.flavor ?? "")
                         : t("relics.locked_flavor"))
                        .font(.system(size: 16, design: .serif).italic())
                        .foregroundStyle(.white.opacity(relic.owned ? 0.78 : 0.4))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 12)
                }

                VStack(spacing: 0) {
                    row(t("relics.row_found_in"), relic.storyTitle)
                    row(t("relics.row_when"), relicTimingLabel(relic.timing, t))
                    row(t("relics.row_chance"), t("relics.row_chance_value", ["chance": relicChanceLabel(relic.chancePercent)]))
                    row(t("relics.row_hint"), "“\(relic.hint)”")
                    if relic.owned {
                        row(t("relics.row_count"), relic.count == 1 ? "1" : "\(relic.count)")
                        if let first = relic.firstFoundAt.flatMap(Self.date) {
                            row(t("relics.row_first"), first)
                        }
                    }
                }
                .background(RoundedRectangle(cornerRadius: 16).fill(.white.opacity(0.04)))
                .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(rarity.color.opacity(0.25)))
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 40)
        }
        .background(
            RadialGradient(colors: [rarity.color.opacity(0.28 * rarity.intensity + 0.06), .clear], center: .top, startRadius: 20, endRadius: 520)
                .ignoresSafeArea()
        )
        .onAppear { withAnimation(.easeInOut(duration: 2.6).repeatForever(autoreverses: true)) { floating = true } }
    }

    private var hero: some View {
        ZStack {
            if relic.owned && rarity.sparkles {
                Sparkles(color: rarity.color, mythic: rarity == .MYTHIC, count: 26)
                    .frame(width: 320, height: 320)
            }
            RelicArt(url: relic.imageUrl, rarity: rarity, owned: relic.owned, animated: relic.owned)
                .frame(width: 260, height: 260)
                .offset(y: floating ? -6 : 6)
        }
        .frame(height: 320)
        .rotation3DEffect(.degrees(Double(tilt.width) / 6), axis: (x: 0, y: 1, z: 0))
        .rotation3DEffect(.degrees(Double(-tilt.height) / 6), axis: (x: 1, y: 0, z: 0))
        .gesture(
            DragGesture()
                .onChanged { value in
                    tilt = CGSize(width: max(-120, min(120, value.translation.width)), height: max(-120, min(120, value.translation.height)))
                }
                .onEnded { _ in withAnimation(.spring(response: 0.5, dampingFraction: 0.6)) { tilt = .zero } }
        )
    }

    private func row(_ label: String, _ value: String) -> some View {
        HStack(alignment: .top) {
            Text(label)
                .font(.system(size: 13, weight: .medium))
                .foregroundStyle(Theme.Colors.textMuted)
                .frame(width: 96, alignment: .leading)
            Text(value)
                .font(.system(size: 14, weight: .medium))
                .foregroundStyle(.white)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }

    private static func date(_ iso: String) -> String? {
        let parser = ISO8601DateFormatter()
        parser.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        guard let date = parser.date(from: iso) ?? ISO8601DateFormatter().date(from: iso) else { return nil }
        return date.formatted(date: .abbreviated, time: .omitted)
    }
}

// MARK: - Profile entry

/// The vault's door on Profile: a strip of the best things you own, or the
/// shapes of what you do not, and the count. Hidden entirely while relics are
/// off for this player — the endpoint 404s and nothing renders.
struct RelicVaultCard: View {
    let vault: RelicCollectionResponse
    let onOpen: () -> Void
    @Environment(\.translator) private var t

    /// Four slots, always: your best finds first, then the shapes of the
    /// rarest things you do not have yet.
    private var showcase: [RelicEntry] {
        let byRarity = { (a: RelicEntry, b: RelicEntry) in RelicRarity(a.rarity).sortIndex < RelicRarity(b.rarity).sortIndex }
        let owned = vault.relics.filter(\.owned).sorted(by: byRarity)
        let locked = vault.relics.filter { !$0.owned }.sorted(by: byRarity)
        return Array((owned + locked).prefix(4))
    }

    var body: some View {
        Button(action: onOpen) {
            VStack(alignment: .leading, spacing: 14) {
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(t("relics.card_label"))
                            .font(.system(size: 11, weight: .heavy))
                            .tracking(2)
                            .foregroundStyle(.white.opacity(0.6))
                        Text(t("relics.card_count", ["owned": vault.owned, "total": vault.total]))
                            .font(.system(size: 20, weight: .bold, design: .serif))
                            .foregroundStyle(.white)
                    }
                    Spacer()
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.white.opacity(0.5))
                }
                HStack(spacing: 10) {
                    ForEach(showcase) { relic in
                        RelicArt(url: relic.imageUrl, rarity: RelicRarity(relic.rarity), owned: relic.owned, animated: false)
                            .padding(8)
                            .frame(maxWidth: .infinity)
                            .aspectRatio(1, contentMode: .fit)
                            .relicFrame(RelicRarity(relic.rarity), owned: relic.owned, cornerRadius: 12)
                    }
                }
            }
            .padding(16)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(LinearGradient(colors: [Color(hex: 0x1A1430), Color(hex: 0x0E1118)], startPoint: .topLeading, endPoint: .bottomTrailing))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .strokeBorder(RelicRarity.MYTHIC.gradient, lineWidth: 1)
                    .opacity(0.6)
            )
        }
        .buttonStyle(.plain)
    }
}
