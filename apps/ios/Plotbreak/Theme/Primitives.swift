import SwiftUI

// MARK: - Primitives
//
// Twins of `packages/ui/src/primitives.tsx`: `Txt`, `Button`, `IconButton`,
// `Card`, `Divider`, `Chip`, `EmptyState`, `Skeleton`, `SectionHeader`.
// Screens compose these; they do not restyle them.

// MARK: Txt

struct Txt: View {
    let text: String
    var variant: Theme.TypeStyle = .body
    var color: Color = Theme.Colors.textPrimary
    var center: Bool = false
    var serif: Bool = false
    var lineLimit: Int? = nil

    init(_ text: String, _ variant: Theme.TypeStyle = .body, color: Color = Theme.Colors.textPrimary,
         center: Bool = false, serif: Bool = false, lineLimit: Int? = nil) {
        self.text = text
        self.variant = variant
        self.color = color
        self.center = center
        self.serif = serif
        self.lineLimit = lineLimit
    }

    var body: some View {
        Text(text)
            .font(variant.font(serif: serif))
            .foregroundStyle(color)
            .lineSpacing(variant.lineSpacing)
            .multilineTextAlignment(center ? .center : .leading)
            .frame(maxWidth: center ? .infinity : nil, alignment: center ? .center : .leading)
            .lineLimit(lineLimit)
            .fixedSize(horizontal: false, vertical: true)
    }
}

// MARK: Button

enum ButtonVariant {
    case primary, secondary, tertiary, danger, dangerQuiet

    var background: Color {
        switch self {
        case .primary: return Theme.Colors.accentPrimary
        case .secondary: return Theme.Colors.bgRaised
        case .tertiary, .dangerQuiet: return .clear
        case .danger: return Theme.Colors.danger
        }
    }

    var foreground: Color {
        switch self {
        case .primary, .danger: return Theme.Colors.textOnAccent
        case .secondary: return Theme.Colors.textPrimary
        case .tertiary: return Theme.Colors.textSecondary
        case .dangerQuiet: return Theme.Colors.danger
        }
    }

    var border: Color? {
        switch self {
        case .secondary: return Theme.Colors.borderSubtle
        case .dangerQuiet: return Theme.Colors.danger
        default: return nil
        }
    }
}

enum ButtonSize {
    case large, medium
    var height: CGFloat { self == .large ? 50 : 46 }
}

struct PBButton: View {
    let label: String
    var loadingLabel: String? = nil
    var variant: ButtonVariant = .primary
    var size: ButtonSize = .large
    var loading: Bool = false
    var full: Bool = true
    var disabled: Bool = false
    var haptic: HapticKind = .light
    var icon: String? = nil
    let action: () -> Void

    init(_ label: String, loadingLabel: String? = nil, variant: ButtonVariant = .primary, size: ButtonSize = .large,
         loading: Bool = false, full: Bool = true, disabled: Bool = false, haptic: HapticKind = .light,
         icon: String? = nil, action: @escaping () -> Void) {
        self.label = label
        self.loadingLabel = loadingLabel
        self.variant = variant
        self.size = size
        self.loading = loading
        self.full = full
        self.disabled = disabled
        self.haptic = haptic
        self.icon = icon
        self.action = action
    }

    private var isDisabled: Bool { disabled || loading }

    var body: some View {
        Button {
            guard !isDisabled else { return }
            Haptic.play(haptic)
            action()
        } label: {
            HStack(spacing: Theme.Spacing.sm) {
                if loading {
                    ProgressView().tint(variant.foreground)
                } else if let icon {
                    Image(systemName: icon).font(.system(size: 15, weight: .semibold))
                }
                Text(loading ? (loadingLabel ?? label) : label)
                    .font(Theme.TypeStyle.bodyStrong.font())
                    .lineLimit(1)
                    .minimumScaleFactor(0.85)
            }
            .foregroundStyle(variant.foreground)
            .padding(.horizontal, Theme.Spacing.xl)
            .frame(maxWidth: full ? .infinity : nil, minHeight: size.height)
            .background(variant.background, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
            .overlay {
                if let border = variant.border {
                    RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous)
                        .strokeBorder(border, lineWidth: 0.5)
                }
            }
            .opacity(isDisabled ? 0.45 : 1)
        }
        .buttonStyle(PressScaleStyle())
        .disabled(isDisabled)
        .accessibilityLabel(loading ? (loadingLabel ?? label) : label)
    }
}

struct PressScaleStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(.easeOut(duration: Theme.Durations.instant), value: configuration.isPressed)
    }
}

struct PressOpacityStyle: ButtonStyle {
    var pressed: Double = 0.6
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .opacity(configuration.isPressed ? pressed : 1)
            .animation(.easeOut(duration: Theme.Durations.instant), value: configuration.isPressed)
    }
}

// MARK: IconButton

struct IconButton<Content: View>: View {
    let label: String
    let action: () -> Void
    @ViewBuilder let content: () -> Content

    init(_ label: String, action: @escaping () -> Void, @ViewBuilder content: @escaping () -> Content) {
        self.label = label
        self.action = action
        self.content = content
    }

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            content()
                .frame(minWidth: Theme.minTouchTarget, minHeight: Theme.minTouchTarget)
                .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(label)
    }
}

extension IconButton where Content == Text {
    /// A glyph button, e.g. `IconButton("Close", glyph: "✕") { ... }`.
    init(_ label: String, glyph: String, color: Color = Theme.Colors.textPrimary, action: @escaping () -> Void) {
        self.init(label, action: action) {
            Text(glyph).font(Theme.TypeStyle.h3.font()).foregroundStyle(color)
        }
    }
}

extension IconButton where Content == Image {
    init(_ label: String, systemImage: String, action: @escaping () -> Void) {
        self.init(label, action: action) {
            Image(systemName: systemImage)
        }
    }
}

// MARK: Card

struct Card<Content: View>: View {
    var padded: Bool = true
    var background: Color = Theme.Colors.bgElevated
    @ViewBuilder let content: () -> Content

    init(padded: Bool = true, background: Color = Theme.Colors.bgElevated, @ViewBuilder content: @escaping () -> Content) {
        self.padded = padded
        self.background = background
        self.content = content
    }

    var body: some View {
        content()
            .padding(padded ? Theme.Spacing.lg : 0)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(background, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
            }
    }
}

// MARK: Divider

struct PBDivider: View {
    var body: some View {
        Rectangle().fill(Theme.Colors.borderSubtle).frame(height: 0.5)
    }
}

// MARK: Chip

enum ChipTone {
    case neutral, accent, success, warning, danger

    var color: Color {
        switch self {
        case .neutral: return Theme.Colors.textSecondary
        case .accent: return Theme.Colors.accentPrimary
        case .success: return Theme.Colors.success
        case .warning: return Theme.Colors.warning
        case .danger: return Theme.Colors.danger
        }
    }
}

struct Chip: View {
    let label: String
    var selected: Bool = false
    var tone: ChipTone = .neutral
    var icon: String? = nil
    var action: (() -> Void)? = nil

    init(_ label: String, selected: Bool = false, tone: ChipTone = .neutral, icon: String? = nil, action: (() -> Void)? = nil) {
        self.label = label
        self.selected = selected
        self.tone = tone
        self.icon = icon
        self.action = action
    }

    private var content: some View {
        HStack(spacing: Theme.Spacing.xs) {
            if let icon { Text(icon).font(Theme.TypeStyle.caption.font()) }
            Text(label).font(Theme.TypeStyle.caption.font()).lineLimit(1)
        }
        .foregroundStyle(selected ? Theme.Colors.textOnAccent : tone.color)
        .padding(.horizontal, Theme.Spacing.md)
        .padding(.vertical, Theme.Spacing.sm)
        .background(selected ? Theme.Colors.accentPrimary : Theme.Colors.bgRaised, in: Capsule())
        .overlay { Capsule().strokeBorder(selected ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: 0.5) }
    }

    var body: some View {
        if let action {
            Button {
                Haptic.play(.light)
                action()
            } label: { content }
                .buttonStyle(PressOpacityStyle(pressed: 0.7))
                .accessibilityLabel(label)
                .accessibilityAddTraits(selected ? .isSelected : [])
        } else {
            content
        }
    }
}

// MARK: EmptyState

struct EmptyState: View {
    let title: String
    let message: String
    var actionLabel: String? = nil
    var action: (() -> Void)? = nil

    init(title: String, message: String, actionLabel: String? = nil, action: (() -> Void)? = nil) {
        self.title = title
        self.message = message
        self.actionLabel = actionLabel
        self.action = action
    }

    var body: some View {
        VStack(spacing: Theme.Spacing.md) {
            Txt(title, .h3, center: true)
            Txt(message, .bodyCompact, color: Theme.Colors.textSecondary, center: true)
            if let actionLabel, let action {
                PBButton(actionLabel, variant: .secondary, full: false, action: action)
                    .padding(.top, Theme.Spacing.sm)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, Theme.Spacing.giant)
        .padding(.horizontal, Theme.Spacing.xxl)
    }
}

// MARK: Skeleton

struct Skeleton: View {
    var width: CGFloat? = nil
    var height: CGFloat
    var radius: CGFloat = Theme.Radius.card
    @State private var pulse = false

    var body: some View {
        RoundedRectangle(cornerRadius: radius, style: .continuous)
            .fill(Theme.Colors.bgRaised)
            .frame(width: width, height: height)
            .frame(maxWidth: width == nil ? .infinity : nil)
            .opacity(pulse ? 0.8 : 0.4)
            .onAppear {
                withAnimation(.easeInOut(duration: 0.7).repeatForever(autoreverses: true)) { pulse = true }
            }
            .accessibilityHidden(true)
    }
}

// MARK: SectionHeader

struct SectionHeader: View {
    let title: String
    var subtitle: String? = nil
    var actionLabel: String? = nil
    var action: (() -> Void)? = nil

    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            VStack(alignment: .leading, spacing: 2) {
                Txt(title, .h3)
                if let subtitle { Txt(subtitle, .caption, color: Theme.Colors.textSecondary) }
            }
            Spacer(minLength: Theme.Spacing.md)
            if let actionLabel, let action {
                Button(action: action) {
                    Text(actionLabel).font(Theme.TypeStyle.caption.font()).foregroundStyle(Theme.Colors.accentPrimary)
                }
                .buttonStyle(PressOpacityStyle())
            }
        }
        .padding(.horizontal, Theme.gutter)
    }
}

// MARK: Screen chrome

/// The header every screen draws itself (the navigation stack hides its own).
struct ScreenHeader<Trailing: View>: View {
    var title: String? = nil
    var backLabel: String
    var backGlyph: String = "‹"
    let onBack: () -> Void
    @ViewBuilder var trailing: () -> Trailing

    init(title: String? = nil, backLabel: String, backGlyph: String = "‹", onBack: @escaping () -> Void,
         @ViewBuilder trailing: @escaping () -> Trailing = { EmptyView() }) {
        self.title = title
        self.backLabel = backLabel
        self.backGlyph = backGlyph
        self.onBack = onBack
        self.trailing = trailing
    }

    var body: some View {
        HStack(spacing: Theme.Spacing.sm) {
            IconButton(backLabel, glyph: backGlyph, action: onBack)
            if let title {
                Txt(title, .h3, lineLimit: 1)
            }
            Spacer(minLength: 0)
            trailing()
        }
        .padding(.horizontal, Theme.Spacing.sm)
        .frame(minHeight: 52)
    }
}

/// Wraps a screen in the app background with the standard gutters.
struct Screen<Content: View>: View {
    @ViewBuilder let content: () -> Content

    var body: some View {
        ZStack {
            Theme.Colors.bgBase.ignoresSafeArea()
            content()
        }
        .preferredColorScheme(.dark)
        .toolbar(.hidden, for: .navigationBar)
    }
}

// MARK: Text helpers

extension String {
    /// `toParagraphs` — blank-line separated, whitespace collapsed.
    var paragraphs: [String] {
        components(separatedBy: "\n")
            .split(whereSeparator: { $0.trimmingCharacters(in: .whitespaces).isEmpty })
            .map { $0.joined(separator: " ").replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression).trimmingCharacters(in: .whitespaces) }
            .filter { !$0.isEmpty }
    }
}

// MARK: Remote images

/// A remote image with the app's placeholder. `url` may be relative to the API.
struct RemoteImage<Placeholder: View>: View {
    let url: URL?
    var contentMode: ContentMode = .fill
    @ViewBuilder let placeholder: () -> Placeholder

    init(_ url: URL?, contentMode: ContentMode = .fill, @ViewBuilder placeholder: @escaping () -> Placeholder = { Theme.Colors.bgRaised }) {
        self.url = url
        self.contentMode = contentMode
        self.placeholder = placeholder
    }

    var body: some View {
        if let url {
            AsyncImage(url: url, transaction: Transaction(animation: .easeOut(duration: Theme.Durations.short))) { phase in
                switch phase {
                case .success(let image):
                    image.resizable().aspectRatio(contentMode: contentMode)
                default:
                    placeholder()
                }
            }
        } else {
            placeholder()
        }
    }
}

extension String {
    /// Resolves an asset path the server sent against the API base URL.
    var assetURL: URL? {
        if hasPrefix("http://") || hasPrefix("https://") || hasPrefix("data:") { return URL(string: self) }
        return URL(string: self, relativeTo: AppConfig.apiURL)?.absoluteURL
    }
}
