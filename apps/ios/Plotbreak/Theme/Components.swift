import SwiftUI

// MARK: - Components
//
// Twins of `packages/ui/src/components.tsx`. Game-specific building blocks
// shared by more than one screen: story cards and art, portraits, the two
// narrative blocks, state-delta chips, suggestion cards, the quality pill,
// the check reveal, the objective strip, the credit balance and resource bars.

// MARK: StoryArt

/// Cover art, a skeleton while it loads, or a deterministic gradient seeded
/// from the story id when the world has no art (or it failed to load). The
/// seed keeps that fallback stable across renders.
struct StoryArt<Overlay: View>: View {
    let seed: String
    let title: String
    let uri: String?
    @ViewBuilder var overlay: () -> Overlay

    init(seed: String, title: String, uri: String?, @ViewBuilder overlay: @escaping () -> Overlay = { EmptyView() }) {
        self.seed = seed
        self.title = title
        self.uri = uri
        self.overlay = overlay
    }

    private var hue: Double {
        let hash = seed.unicodeScalars.reduce(7) { ($0 &* 31 &+ Int($1.value)) & 0x7FFFFFFF }
        return Double(hash % 360) / 360
    }

    var body: some View {
        ZStack {
            if let url = uri?.assetURL {
                AsyncImage(url: url, transaction: Transaction(animation: .easeOut(duration: Theme.Durations.short))) { phase in
                    switch phase {
                    case .success(let image): image.resizable().aspectRatio(contentMode: .fill)
                    case .failure: fallback
                    default: Skeleton(radius: 0)
                    }
                }
            } else {
                fallback
            }
            overlay()
        }
        .clipped()
    }

    private var fallback: some View {
        LinearGradient(
            colors: [Color(hue: hue, saturation: 0.55, brightness: 0.45), Theme.Colors.bgRaised],
            startPoint: .topLeading, endPoint: .bottomTrailing
        )
    }
}

// MARK: StoryCoverCard

enum StoryCardVariant {
    case rail, hero, row
}

struct StoryCoverCard: View {
    @Environment(\.translator) private var t

    let story: StorySummary
    var variant: StoryCardVariant = .rail
    var width: CGFloat? = nil
    /**
     * Position in a ranked shelf, drawn on the art.
     *
     * Only Top Ranked passes it. A rank on every card would be a number without
     * a question — it is meaningful precisely because the shelf it sits on says
     * what it is a rank *of*.
     */
    var rank: Int? = nil
    /// Whether to put the like count under the title.
    var showLikes: Bool = true
    var locale: AppLocale = .en
    var onPress: () -> Void
    var onLongPress: (() -> Void)? = nil

    private var isHero: Bool { variant == .hero }
    private var isRow: Bool { variant == .row }

    private var cardWidth: CGFloat? {
        if let width { return width }
        switch variant {
        case .rail: return 150
        case .hero: return 300
        case .row: return nil
        }
    }

    private var aspect: CGFloat { isHero ? 16 / 10 : isRow ? 1 : 2 / 3 }

    /// In French the comma is the decimal separator, so an English-grouped
    /// like count read as a decimal. The locale is passed, never assumed.
    private var likeLine: String? {
        guard showLikes, story.likes > 0 else { return nil }
        return t("ui.story_likes", [
            "formatted": Format.credits(story.likes, compact: true, locale: locale),
            "count": story.likes,
        ])
    }

    private var metaLine: String? {
        let parts = [story.tags.first, story.official ? nil : story.creatorName].compactMap { $0 }
        return parts.isEmpty ? nil : parts.joined(separator: " · ")
    }

    /// Spec §7.3 — the accessible name reads as one coherent label, not five
    /// nodes. Attribution is dropped when there is no creator to attribute to:
    /// the Continue rail reuses this card for a run already in progress.
    private var accessibilityText: String {
        var parts = [story.title, story.fantasyLabel]
        if !story.creatorName.isEmpty {
            parts.append(t("ui.by_creator", ["name": story.creatorName]))
            parts.append(t(story.official ? "ui.official_world" : "ui.community_world"))
        }
        return parts.filter { !$0.isEmpty }.joined(separator: ". ")
    }

    private var cover: some View {
        StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
            .aspectRatio(aspect, contentMode: .fit)
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
            }
            // The rank, bottom-left on the art, the way a chart numbers itself.
            .overlay(alignment: .bottomLeading) {
                if let rank {
                    Text(String(rank))
                        .font(Theme.TypeStyle.bodyStrong.font())
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .frame(minWidth: 26)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 1)
                        .background(Theme.Colors.scrim, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                        .padding(Theme.Spacing.sm)
                }
            }
    }

    /**
     * What goes under a cover has to earn the space it takes from the art.
     *
     * "Official" is deliberately not a pill here. At launch every world is
     * official, so it would be the most prominent thing on every card while
     * distinguishing nothing; verification lives in the data and on world
     * detail, where it means something. Same for run counts — "0 runs" on every
     * card is not social proof.
     */
    private var caption: some View {
        VStack(alignment: .leading, spacing: 2) {
            if story.badges.contains(.TRENDING) {
                Chip(t("ui.trending"), tone: .warning)
            }
            Txt(story.title, isHero ? .h2 : .bodyStrong, lineLimit: 2)
            // Spec §7.3 — max 42 characters, enforced at authoring time.
            Txt(story.fantasyLabel, .caption, color: Theme.Colors.textSecondary, lineLimit: 2)
            // One line, not two. The genre and the likes are both "what is this
            // and is it any good"; where likes are asked for they are the more
            // useful half.
            if let line = likeLine ?? metaLine {
                Txt(line, .micro, color: Theme.Colors.textMuted, lineLimit: 1)
            }
        }
    }

    var body: some View {
        Button(action: onPress) {
            Group {
                if isRow {
                    HStack(alignment: .center, spacing: Theme.Spacing.md) {
                        cover.frame(width: 64)
                        caption
                        Spacer(minLength: 0)
                    }
                } else {
                    VStack(alignment: .leading, spacing: 0) {
                        cover
                        caption.padding(.top, Theme.Spacing.sm)
                    }
                    .frame(width: cardWidth)
                }
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
        .simultaneousGesture(LongPressGesture(minimumDuration: 0.45).onEnded { _ in
            guard let onLongPress else { return }
            Haptic.play(.medium)
            onLongPress()
        })
        .accessibilityLabel(story.title)
    }
}

// MARK: CharacterPortrait

struct CharacterPortrait: View {
    let name: String
    var uri: String?
    var size: CGFloat = 96
    var speaking: Bool = false
    var dimmed: Bool = false
    var expression: String? = nil

    private var initials: String {
        name.split(separator: " ").prefix(2).compactMap { $0.first }.map(String.init).joined().uppercased()
    }

    var body: some View {
        VStack(spacing: Theme.Spacing.xs) {
            ZStack {
                Circle().fill(Theme.Colors.bgRaised)
                RemoteImage(uri?.assetURL) {
                    Text(initials.isEmpty ? "?" : initials)
                        .font(.system(size: size * 0.36, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textSecondary)
                }
            }
            .frame(width: size, height: size)
            .clipShape(Circle())
            .overlay {
                Circle().strokeBorder(speaking ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: speaking ? 2 : 0.5)
            }
            .opacity(dimmed ? 0.55 : 1)
            .animation(.easeOut(duration: Theme.Durations.short), value: speaking)

            if let expression, !expression.isEmpty {
                Txt(expression, .micro, color: Theme.Colors.textMuted, lineLimit: 1)
            }
        }
        .accessibilityLabel(name)
    }
}

// MARK: Narrative blocks

struct DialogueBlock: View {
    let speaker: String
    let text: String
    var portraitUri: String? = nil
    var voiceEligible: Bool = false
    var onPlayVoice: (() -> Void)? = nil

    var body: some View {
        HStack(alignment: .top, spacing: Theme.Spacing.md) {
            CharacterPortrait(name: speaker, uri: portraitUri, size: 36)
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                HStack(spacing: Theme.Spacing.sm) {
                    Txt(speaker, .caption, color: Theme.Colors.accentSecondary)
                    if voiceEligible, let onPlayVoice {
                        Button(action: onPlayVoice) {
                            Image(systemName: "speaker.wave.2").font(.system(size: 12)).foregroundStyle(Theme.Colors.textMuted)
                        }
                        .buttonStyle(PressOpacityStyle())
                    }
                }
                Txt("“\(text)”", .body)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct NarrationBlock: View {
    let text: String
    let t: Translator
    @State private var expanded = false

    private var words: [Substring] { text.split(separator: " ") }
    private var long: Bool { words.count > 90 }
    private var shown: String { long && !expanded ? words.prefix(90).joined(separator: " ") + "…" : text }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
            // 17pt serif at 1.6 leading, in the secondary grey: prose that
            // reads as a page, not as a chat bubble.
            Text(shown)
                .font(.system(size: 17, weight: .regular, design: .serif))
                .lineSpacing(6.5)
                .foregroundStyle(Theme.Colors.textSecondary)
                .fixedSize(horizontal: false, vertical: true)
                .frame(maxWidth: 640, alignment: .leading)
            if long {
                Button {
                    withAnimation { expanded.toggle() }
                } label: {
                    Txt(t(expanded ? "ui.read_less" : "ui.read_more"), .caption, color: Theme.Colors.accentPrimary)
                }
                .buttonStyle(PressOpacityStyle())
            }
        }
    }
}

struct SystemBlock: View {
    let text: String
    var body: some View {
        Txt(text, .caption, color: Theme.Colors.textMuted, center: true)
            .padding(.vertical, Theme.Spacing.xs)
    }
}

// MARK: State deltas

enum DeltaKind: String {
    case resource, relationship, item, quest, faction, status

    var glyph: String {
        switch self {
        case .resource: return "◆"
        case .relationship: return "♥"
        case .item: return "▣"
        case .quest: return "❯"
        case .faction: return "⬢"
        case .status: return "✦"
        }
    }

    /// Guesses the kind from a mutation id prefix such as `rel_`, `item_`.
    static func infer(from mutationId: String, label: String) -> DeltaKind {
        let id = mutationId.lowercased()
        if id.contains("rel") || label.contains("♥") { return .relationship }
        if id.contains("item") || id.contains("inv") { return .item }
        if id.contains("quest") || id.contains("obj") { return .quest }
        if id.contains("fac") || id.contains("rep") { return .faction }
        if id.contains("status") || id.contains("effect") { return .status }
        return .resource
    }
}

struct StateDeltaChip: View {
    let label: String
    var kind: DeltaKind = .resource
    var positive: Bool = true

    var body: some View {
        HStack(spacing: Theme.Spacing.xs) {
            Text(kind.glyph).font(Theme.TypeStyle.micro.font())
            Text(label).font(Theme.TypeStyle.caption.font()).lineLimit(1)
        }
        .foregroundStyle(positive ? Theme.Colors.success : Theme.Colors.warning)
        .padding(.horizontal, Theme.Spacing.md)
        .padding(.vertical, Theme.Spacing.xs + 2)
        .background(Theme.Colors.bgRaised, in: Capsule())
        .overlay { Capsule().strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5) }
    }
}

struct StateDeltaRow: View {
    let deltas: [StateDeltaPresentation]

    var body: some View {
        if !deltas.isEmpty {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: Theme.Spacing.sm) {
                    ForEach(deltas.sorted { $0.priority < $1.priority }) { delta in
                        StateDeltaChip(
                            label: delta.label,
                            kind: DeltaKind.infer(from: delta.mutationId, label: delta.label),
                            positive: !(delta.label.hasPrefix("-") || delta.label.hasPrefix("−") || delta.label.lowercased().contains("lost"))
                        )
                    }
                }
            }
        }
    }
}

// MARK: ActionSuggestion

struct ActionSuggestion: View {
    let suggestion: SuggestedAction
    /// Required rather than defaulted. It defaulted to the English word `Edit`,
    /// which a French player would have heard read aloud in English — and the
    /// one caller was already passing the keyed string, so the default existed
    /// only to be wrong.
    let editLabel: String
    let onPress: () -> Void
    var onEdit: (() -> Void)? = nil

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress()
        } label: {
            HStack(alignment: .top, spacing: Theme.Spacing.md) {
                Circle()
                    .fill(Theme.riskColor(suggestion.risk))
                    .frame(width: 8, height: 8)
                    .padding(.top, 8)
                VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                    Txt(suggestion.text, .bodyCompact)
                    if let cost = suggestion.resourceCostLabel, !cost.isEmpty {
                        Txt(cost, .micro, color: Theme.Colors.textMuted)
                    }
                }
                Spacer(minLength: 0)
                if let onEdit {
                    Button(action: onEdit) {
                        Image(systemName: "pencil")
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.Colors.textMuted)
                            .frame(width: 32, height: 32)
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(editLabel)
                }
            }
            .padding(Theme.Spacing.md)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
            }
        }
        .buttonStyle(PressScaleStyle())
    }
}

// MARK: QualityPill

struct QualityPill: View {
    let label: String
    let cost: Int
    var affordable: Bool = true
    var locale: AppLocale = .en
    let onPress: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress()
        } label: {
            HStack(spacing: Theme.Spacing.xs) {
                Text(label).font(Theme.TypeStyle.caption.font())
                Text("· \(Format.credits(cost, locale: locale))")
                    .font(Theme.TypeStyle.caption.font())
                    .foregroundStyle(affordable ? Theme.Colors.textSecondary : Theme.Colors.danger)
            }
            .foregroundStyle(Theme.Colors.textPrimary)
            .padding(.horizontal, Theme.Spacing.md)
            .padding(.vertical, Theme.Spacing.sm)
            .background(Theme.Colors.bgRaised, in: Capsule())
            .overlay { Capsule().strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5) }
        }
        .buttonStyle(PressOpacityStyle())
    }
}

// MARK: CheckReveal (§26.8)

struct CheckReveal: View {
    let label: String
    let difficulty: String
    var outcome: CheckOutcome? = nil
    var outcomeLabel: String? = nil
    var math: String? = nil
    var onSkip: (() -> Void)? = nil
    @State private var revealed = false

    var body: some View {
        HStack(spacing: Theme.Spacing.md) {
            ZStack {
                Circle().strokeBorder(Theme.Colors.borderStrong, lineWidth: 1.5)
                if let outcome, revealed {
                    Text(outcome.isSuccess ? "✓" : "✕")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundStyle(Theme.outcomeColor(outcome))
                } else {
                    ProgressView().tint(Theme.Colors.textSecondary).scaleEffect(0.7)
                }
            }
            .frame(width: 28, height: 28)

            VStack(alignment: .leading, spacing: 2) {
                Txt(label, .bodyStrong)
                HStack(spacing: Theme.Spacing.sm) {
                    Txt(difficulty, .caption, color: Theme.riskColor(difficulty.uppercased()))
                    if let outcomeLabel, revealed {
                        Txt(outcomeLabel, .caption, color: outcome.map(Theme.outcomeColor) ?? Theme.Colors.textSecondary)
                    }
                }
                if let math, revealed, !math.isEmpty {
                    Txt(math, .micro, color: Theme.Colors.textMuted)
                }
            }
            Spacer(minLength: 0)
        }
        .padding(Theme.Spacing.md)
        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
        }
        .contentShape(Rectangle())
        .onTapGesture {
            // Always skippable.
            withAnimation { revealed = true }
            onSkip?()
        }
        .task(id: outcome) {
            guard outcome != nil else { return }
            try? await Task.sleep(nanoseconds: UInt64(Theme.Durations.checkReveal * 1_000_000_000))
            withAnimation(.easeOut(duration: Theme.Durations.short)) { revealed = true }
        }
    }
}

// MARK: ObjectiveStrip

struct ObjectiveStrip: View {
    let objective: String
    var onPress: (() -> Void)? = nil

    var body: some View {
        Button {
            onPress?()
        } label: {
            HStack(spacing: Theme.Spacing.sm) {
                Text("❯").font(Theme.TypeStyle.caption.font()).foregroundStyle(Theme.Colors.accentPrimary)
                Txt(objective, .caption, color: Theme.Colors.textSecondary, lineLimit: 1)
                Spacer(minLength: 0)
            }
            .padding(.horizontal, Theme.Spacing.md)
            .padding(.vertical, Theme.Spacing.sm)
            .background(Theme.Colors.bgElevated.opacity(0.9), in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
        }
        .buttonStyle(PressOpacityStyle())
        .disabled(onPress == nil)
    }
}

// MARK: CreditBalance

struct CreditBalance: View {
    let balance: Int
    var compact: Bool = true
    var locale: AppLocale = .en
    var onPress: (() -> Void)? = nil

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress?()
        } label: {
            HStack(spacing: Theme.Spacing.sm) {
                CreditGlyph(size: 21)
                Text(Format.credits(balance, compact: compact, locale: locale))
                    .font(.system(size: 15, weight: .semibold, design: .monospaced))
                    .foregroundStyle(Theme.Colors.textPrimary)
            }
            .padding(.horizontal, Theme.Spacing.sm)
            .frame(minHeight: Theme.minTouchTarget - 8)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .disabled(onPress == nil)
    }
}

// MARK: ContinueCard

/// A run in progress: a 44×58 cover, the title, and how far in you are.
struct ContinueRunCard: View {
    let title: String
    let storyId: String
    let coverImage: String?
    let turnsLine: String
    var width: CGFloat? = nil
    let onPress: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            onPress()
        } label: {
            HStack(spacing: Theme.Spacing.md) {
                StoryArt(seed: storyId, title: title, uri: coverImage)
                    .frame(width: 44, height: 58)
                    .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.system(size: 14))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                    Text(turnsLine)
                        .font(.system(size: 12))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .lineLimit(1)
                }
                Spacer(minLength: 0)
            }
            .padding(10)
            .frame(width: width)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
        .accessibilityLabel("\(title). \(turnsLine)")
    }
}

// MARK: ResourceBar

struct ResourceBar: View {
    @Environment(\.translator) private var t

    let name: String
    let current: Double
    let max: Double
    var color: String? = nil
    var polarity: ResourcePolarity = .GOOD_HIGH
    var locale: AppLocale = .en

    private var ratio: Double { max > 0 ? Swift.max(0, Swift.min(1, current / max)) : 0 }
    private var low: Bool { polarity == .GOOD_HIGH ? ratio <= 0.25 : ratio >= 0.75 }

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
            HStack {
                Txt(name, .caption, color: Theme.Colors.textSecondary)
                Spacer()
                Text("\(Format.number(Int(current.rounded()), locale: locale))/\(Format.number(Int(max.rounded()), locale: locale))")
                    .font(Theme.TypeStyle.micro.font())
                    .monospacedDigit()
                    .foregroundStyle(low ? Theme.Colors.danger : Theme.Colors.textMuted)
            }
            GeometryReader { proxy in
                ZStack(alignment: .leading) {
                    Capsule().fill(Theme.Colors.bgRaised)
                    Capsule()
                        .fill(low ? Theme.Colors.danger : Color(css: color))
                        .frame(width: proxy.size.width * ratio)
                        .animation(.easeOut(duration: Theme.Durations.short), value: ratio)
                }
            }
            .frame(height: 6)
        }
        .accessibilityElement(children: .combine)
        // `ui.meter_a11y` is `{name}: {current} of {max}` — the `of` is a word,
        // and it was hard-coded here in English.
        .accessibilityLabel(t("ui.meter_a11y", [
            "name": name,
            "current": Int(current.rounded()),
            "max": Int(max.rounded()),
        ]))
    }
}

// MARK: Error banner

struct InlineError: View {
    let message: String
    var retryLabel: String? = nil
    var onRetry: (() -> Void)? = nil

    var body: some View {
        HStack(spacing: Theme.Spacing.md) {
            Txt(message, .bodyCompact, color: Theme.Colors.danger)
            if let retryLabel, let onRetry {
                Spacer(minLength: 0)
                PBButton(retryLabel, variant: .secondary, size: .medium, full: false, action: onRetry)
            }
        }
        .padding(Theme.Spacing.md)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.Colors.danger.opacity(0.08), in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                .strokeBorder(Theme.Colors.danger.opacity(0.4), lineWidth: 0.5)
        }
    }
}

// MARK: PortraitStoryCard

/// The home shelf card: a 2:3 cover with an ORIGINAL pill top-right and, on a
/// ranked shelf, the rank in a dark square top-left; under it the title on two
/// lines and a muted line of runs and creator.
struct PortraitStoryCard: View {
    @Environment(\.translator) private var t

    let story: StorySummary
    var width: CGFloat = 98
    var rank: Int? = nil
    var locale: AppLocale = .en
    var onPress: () -> Void
    var onLongPress: (() -> Void)? = nil

    private var metaLine: String {
        var parts: [String] = []
        if story.runs > 0 { parts.append(Format.credits(story.runs, compact: true, locale: locale)) }
        if !story.creatorName.isEmpty { parts.append(story.creatorName) }
        return parts.joined(separator: " · ")
    }

    var body: some View {
        Button(action: onPress) {
            VStack(alignment: .leading, spacing: 0) {
                StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                    .frame(width: width, height: (width * 1.5).rounded())
                    .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                    .overlay {
                        RoundedRectangle(cornerRadius: 8, style: .continuous)
                            .strokeBorder(Theme.Colors.textPrimary.opacity(0.25), lineWidth: 0.5)
                    }
                    .overlay(alignment: .topLeading) {
                        if let rank {
                            Text(String(rank))
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundStyle(Theme.Colors.textPrimary)
                                .frame(width: 22, height: 22)
                                .background(Theme.Colors.scrim, in: RoundedRectangle(cornerRadius: 5, style: .continuous))
                                .padding(4)
                        }
                    }
                    .overlay(alignment: .topTrailing) {
                        if story.official {
                            Text(t("discover.official_badge"))
                                .font(.system(size: 8, weight: .semibold, design: .monospaced))
                                .kerning(0.5)
                                .foregroundStyle(Theme.Colors.textPrimary)
                                .padding(.horizontal, 5)
                                .padding(.vertical, 3)
                                .background(Theme.Colors.scrim, in: RoundedRectangle(cornerRadius: 4, style: .continuous))
                                .padding(4)
                        }
                    }
                Text(story.title)
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.top, 10)
                if !metaLine.isEmpty {
                    Text(metaLine)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .lineLimit(1)
                        .padding(.top, 4)
                }
            }
            .frame(width: width, alignment: .leading)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressScaleStyle())
        .simultaneousGesture(LongPressGesture(minimumDuration: 0.45).onEnded { _ in
            guard let onLongPress else { return }
            Haptic.play(.medium)
            onLongPress()
        })
        .accessibilityLabel([story.title, story.fantasyLabel].filter { !$0.isEmpty }.joined(separator: ". "))
    }
}
