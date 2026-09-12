import SwiftUI

// MARK: - Components
//
// Twins of `packages/ui/src/components.tsx`. Game-specific building blocks
// shared by more than one screen: story cards and art, portraits, the two
// narrative blocks, state-delta chips, suggestion cards, the quality pill,
// the check reveal, the objective strip, the credit balance and resource bars.

// MARK: StoryArt

/// Cover art, or a deterministic gradient seeded from the story id when the
/// world has no art yet. The seed keeps a placeholder stable across renders.
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
            LinearGradient(
                colors: [Color(hue: hue, saturation: 0.55, brightness: 0.45), Theme.Colors.bgRaised],
                startPoint: .topLeading, endPoint: .bottomTrailing
            )
            RemoteImage(uri?.assetURL) {
                Text(String(title.prefix(1)).uppercased())
                    .font(.system(size: 40, weight: .bold, design: .serif))
                    .foregroundStyle(Theme.Colors.textPrimary.opacity(0.7))
            }
            overlay()
        }
        .clipped()
    }
}

// MARK: StoryCoverCard

enum StoryCardVariant {
    case rail, hero, grid, list
}

struct StoryCoverCard: View {
    let story: StorySummary
    var variant: StoryCardVariant = .rail
    var width: CGFloat? = nil
    var rank: Int? = nil
    var showLikes: Bool = true
    var locale: AppLocale = .en
    var onPress: () -> Void
    var onLongPress: (() -> Void)? = nil

    private var cardWidth: CGFloat {
        if let width { return width }
        switch variant {
        case .rail: return 150
        case .hero: return 300
        case .grid: return 160
        case .list: return .infinity
        }
    }

    private var aspect: CGFloat { variant == .hero ? 16 / 10 : 2 / 3 }

    var body: some View {
        Button(action: onPress) {
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage) {
                    VStack {
                        HStack(spacing: Theme.Spacing.xs) {
                            ForEach(story.badges.filter { $0 != .UNKNOWN }.prefix(2), id: \.self) { badge in
                                Text(badge.rawValue.replacingOccurrences(of: "_", with: " "))
                                    .font(Theme.TypeStyle.micro.font())
                                    .foregroundStyle(Theme.Colors.textOnAccent)
                                    .padding(.horizontal, 6).padding(.vertical, 3)
                                    .background(badge == .OFFICIAL ? Theme.Colors.accentPrimary : Theme.Colors.accentSecondary, in: Capsule())
                            }
                            Spacer()
                            if let rank {
                                Text("#\(rank)")
                                    .font(Theme.TypeStyle.micro.font())
                                    .foregroundStyle(Theme.Colors.textPrimary)
                                    .padding(.horizontal, 6).padding(.vertical, 3)
                                    .background(Theme.Colors.scrim, in: Capsule())
                            }
                        }
                        Spacer()
                    }
                    .padding(Theme.Spacing.sm)
                }
                .aspectRatio(aspect, contentMode: .fit)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                .overlay {
                    RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                        .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
                }

                VStack(alignment: .leading, spacing: 2) {
                    Txt(story.title, .bodyStrong, lineLimit: variant == .hero ? 2 : 1)
                    Txt(story.fantasyLabel, .caption, color: Theme.Colors.textSecondary, lineLimit: 1)
                    HStack(spacing: Theme.Spacing.xs) {
                        Txt("▶ " + Format.credits(story.runs, compact: true, locale: locale), .micro, color: Theme.Colors.textMuted)
                        if showLikes {
                            Txt("♥ " + Format.credits(story.likes, compact: true, locale: locale), .micro, color: Theme.Colors.textMuted)
                        }
                        if story.official {
                            Txt("✓", .micro, color: Theme.Colors.accentPrimary)
                        }
                    }
                }
            }
            .frame(width: cardWidth == .infinity ? nil : cardWidth)
            .frame(maxWidth: cardWidth == .infinity ? .infinity : nil, alignment: .leading)
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
            Txt(shown, .body, serif: true)
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
    var editLabel: String = "Edit"
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
            HStack(spacing: Theme.Spacing.xs) {
                Text("◈").font(Theme.TypeStyle.caption.font()).foregroundStyle(Theme.Colors.warning)
                Text(Format.credits(balance, compact: compact, locale: locale))
                    .font(Theme.TypeStyle.caption.font())
                    .monospacedDigit()
                    .foregroundStyle(Theme.Colors.textPrimary)
            }
            .padding(.horizontal, Theme.Spacing.md)
            .padding(.vertical, Theme.Spacing.sm)
            .background(Theme.Colors.bgRaised, in: Capsule())
            .overlay { Capsule().strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5) }
        }
        .buttonStyle(PressOpacityStyle())
        .disabled(onPress == nil)
    }
}

// MARK: ResourceBar

struct ResourceBar: View {
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
        .accessibilityLabel("\(name): \(Int(current.rounded())) of \(Int(max.rounded()))")
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
