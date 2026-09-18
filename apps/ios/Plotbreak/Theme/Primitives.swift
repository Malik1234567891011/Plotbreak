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
    /// Near-white on dark: the redesign's "Next", "Confirm", "Buy now".
    case light
    /// A hairline outline and no fill: "Previous", "History".
    case outline
    /// A neutral dark fill for provider buttons (Continue with Apple).
    case neutral

    var background: Color {
        switch self {
        case .primary: return Theme.Colors.accentPrimary
        case .secondary: return Theme.Colors.bgRaised
        case .tertiary, .dangerQuiet, .outline: return .clear
        case .danger: return Theme.Colors.danger
        case .light: return Theme.Colors.light
        case .neutral: return Theme.Colors.surfaceButton
        }
    }

    var foreground: Color {
        switch self {
        case .primary, .danger: return Theme.Colors.textOnAccent
        case .secondary, .outline, .neutral: return Theme.Colors.textPrimary
        case .tertiary: return Theme.Colors.textSecondary
        case .dangerQuiet: return Theme.Colors.danger
        case .light: return Theme.Colors.textOnLight
        }
    }

    var border: Color? {
        switch self {
        case .secondary: return Theme.Colors.borderSubtle
        case .outline: return Theme.Colors.borderStrong
        case .dangerQuiet: return Theme.Colors.danger
        default: return nil
        }
    }

    /// A filled button that cannot be pressed goes flat grey rather than
    /// translucent, so the page behind it does not show through the label.
    var disabledAsFill: Bool {
        switch self {
        case .primary, .light, .neutral: return true
        default: return false
        }
    }

    var weight: Font.Weight {
        switch self {
        case .primary: return .semibold
        case .light, .outline, .neutral: return .medium
        default: return .semibold
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
    /// Disabled and not loading: a flat grey. Loading keeps the fill so the
    /// spinner reads as "working", not "off".
    private var flatDisabled: Bool { disabled && !loading && variant.disabledAsFill }

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
                    .font(.system(size: Theme.TypeStyle.body.size, weight: variant.weight))
                    .lineLimit(1)
                    .minimumScaleFactor(0.85)
            }
            .foregroundStyle(flatDisabled ? Theme.Colors.disabledText : variant.foreground)
            .padding(.horizontal, Theme.Spacing.xl)
            .frame(maxWidth: full ? .infinity : nil, minHeight: size.height)
            .background(flatDisabled ? Theme.Colors.disabledFill : variant.background,
                        in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
            .overlay {
                if let border = variant.border {
                    RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous)
                        .strokeBorder(border, lineWidth: 0.5)
                }
            }
            .opacity(isDisabled && !flatDisabled ? 0.45 : 1)
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

enum ChipStyle {
    /// A filled pill: elevated when idle, accent when selected. Genre pickers.
    case filled
    /// An outline only: the Discover filter row, where the art behind is the fill.
    case outlined
}

struct Chip: View {
    let label: String
    var selected: Bool = false
    var tone: ChipTone = .neutral
    var icon: String? = nil
    var style: ChipStyle = .filled
    var action: (() -> Void)? = nil

    init(_ label: String, selected: Bool = false, tone: ChipTone = .neutral, icon: String? = nil,
         style: ChipStyle = .filled, action: (() -> Void)? = nil) {
        self.label = label
        self.selected = selected
        self.tone = tone
        self.icon = icon
        self.style = style
        self.action = action
    }

    private var foreground: Color {
        switch style {
        case .filled: return selected ? Theme.Colors.textOnAccent : (tone == .neutral ? Theme.Colors.textSecondary : tone.color)
        case .outlined: return selected ? Theme.Colors.accentPrimary : Theme.Colors.textSecondary
        }
    }

    private var fill: Color {
        switch style {
        case .filled: return selected ? Theme.Colors.accentPrimary : Theme.Colors.bgElevated
        case .outlined: return .clear
        }
    }

    private var stroke: Color {
        selected ? Theme.Colors.accentPrimary : (style == .outlined ? Theme.Colors.borderStrong : Theme.Colors.borderSubtle)
    }

    private var content: some View {
        HStack(spacing: Theme.Spacing.xs) {
            if let icon { Text(icon).font(.system(size: 14)) }
            Text(label).font(.system(size: 14, weight: selected ? .medium : .regular)).lineLimit(1)
        }
        .foregroundStyle(foreground)
        .padding(.horizontal, 15)
        .padding(.vertical, 10)
        .background(fill, in: Capsule())
        .overlay { Capsule().strokeBorder(stroke, lineWidth: selected ? 1 : 0.5) }
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
        HStack(alignment: .center) {
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                if let subtitle { Txt(subtitle, .caption, color: Theme.Colors.textSecondary) }
            }
            Spacer(minLength: Theme.Spacing.md)
            // A shelf that opens somewhere says so with a chevron, the way the
            // reference does — the label is the accessible name, not the pixels.
            if let actionLabel, let action {
                Button(action: action) {
                    ChevronGlyph()
                        .frame(minWidth: Theme.minTouchTarget, minHeight: Theme.minTouchTarget - 12)
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(actionLabel)
            }
        }
        .padding(.horizontal, Theme.pageGutter)
    }
}

// MARK: Glyphs

/// The right-pointing chevron every row and shelf uses. One drawing, not a
/// character, so it weighs the same everywhere.
struct ChevronGlyph: View {
    var color: Color = Theme.Colors.textMuted
    var size: CGFloat = 20

    var body: some View {
        Image(systemName: "chevron.right")
            .font(.system(size: size * 0.6, weight: .medium))
            .foregroundStyle(color)
            .frame(width: size, height: size)
            .accessibilityHidden(true)
    }
}

/// The credit mark: a diamond in a rounded square, in the warning gold.
struct CreditGlyph: View {
    var size: CGFloat = 21
    var color: Color = Theme.Colors.warning

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: size * 0.2, style: .continuous)
                .strokeBorder(color, lineWidth: max(1.5, size * 0.08))
                .frame(width: size * 0.78, height: size * 0.78)
            Rectangle()
                .fill(color)
                .frame(width: size * 0.26, height: size * 0.26)
                .rotationEffect(.degrees(45))
        }
        .frame(width: size, height: size)
        .accessibilityHidden(true)
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
            IconButton(backLabel, action: onBack) {
                // "‹" is a back chevron; "✕" is a close. Both drawn, not typed.
                Image(systemName: backGlyph == "✕" ? "xmark" : "chevron.left")
                    .font(.system(size: backGlyph == "✕" ? 20 : 22, weight: .medium))
                    .foregroundStyle(backGlyph == "✕" ? Theme.Colors.textMuted : Theme.Colors.textPrimary)
            }
            if let title {
                Text(title)
                    .font(.system(size: 20, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .lineLimit(1)
            }
            Spacer(minLength: 0)
            trailing()
        }
        .padding(.horizontal, Theme.Spacing.sm)
        .frame(minHeight: 52)
    }
}

/// A root tab's header: a 22pt title on the left, controls on the right, and a
/// hairline underneath. The reference draws this on Profile and Library.
struct TabHeader<Trailing: View>: View {
    let title: String
    @ViewBuilder var trailing: () -> Trailing

    init(_ title: String, @ViewBuilder trailing: @escaping () -> Trailing = { EmptyView() }) {
        self.title = title
        self.trailing = trailing
    }

    var body: some View {
        HStack(alignment: .center) {
            Text(title)
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: Theme.Spacing.sm)
            trailing()
        }
        .padding(.horizontal, 18)
        .padding(.top, Theme.Spacing.lg)
        .padding(.bottom, 18)
        .overlay(alignment: .bottom) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }
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

    /// Resolves a bare **asset key** — `uploads/abc/cover_1` — into something
    /// renderable.
    ///
    /// A key has no extension and no `/media` prefix, because the rest of the
    /// product appends both: `localizeStory` adds `.fr`, and `/media/*` tries
    /// `.webp`, `.png` and `.jpg` in turn. Everywhere a *published* story is
    /// drawn, the server has already turned the key into a URL for us. The
    /// builder is the one place holding a raw key, because it is looking at a
    /// draft rather than at a projection.
    var assetKeyURL: URL? {
        if isEmpty { return nil }
        if hasPrefix("http://") || hasPrefix("https://") || hasPrefix("/media/") { return assetURL }
        return "/media/\(self).jpg".assetURL
    }
}

// MARK: - Redesign primitives
//
// The pieces the 2026-09 redesign draws on more than one screen: the
// onboarding frame, the progress bar, the input field, the settings row, the
// radio dot, the section label, the tooltip bubble and the legal footer.

// MARK: Progress bar

/// A 4pt bar: the track, and the accent fill for `fraction` of it.
struct ProgressBar: View {
    let fraction: Double

    var body: some View {
        GeometryReader { proxy in
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.Colors.track)
                Capsule()
                    .fill(Theme.Colors.accentPrimary)
                    .frame(width: proxy.size.width * max(0, min(1, fraction)))
                    .animation(.easeOut(duration: Theme.Durations.short), value: fraction)
            }
        }
        .frame(height: 4)
        .accessibilityHidden(true)
    }
}

// MARK: Input field

/// A 52pt field: elevated fill, hairline border, 12pt corners. Wraps whatever
/// sits inside — a `TextField`, or a tappable placeholder row.
struct FieldStyle: ViewModifier {
    var focused: Bool = false

    func body(content: Content) -> some View {
        content
            .padding(.horizontal, Theme.Spacing.xl)
            .frame(minHeight: 52)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                    .strokeBorder(focused ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: focused ? 1 : 0.5)
            }
    }
}

extension View {
    func fieldStyle(focused: Bool = false) -> some View { modifier(FieldStyle(focused: focused)) }
}

// MARK: Settings row

/// One line of a settings list: an icon, a label, an optional trailing note
/// in the accent, a chevron, and a hairline underneath.
struct SettingsRow: View {
    let label: String
    var icon: String? = nil
    var note: String? = nil
    var noteColor: Color = Theme.Colors.accentPrimary
    let action: () -> Void

    init(_ label: String, icon: String? = nil, note: String? = nil, noteColor: Color = Theme.Colors.accentPrimary,
         action: @escaping () -> Void) {
        self.label = label
        self.icon = icon
        self.note = note
        self.noteColor = noteColor
        self.action = action
    }

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            HStack(spacing: Theme.Spacing.lg) {
                if let icon {
                    Image(systemName: icon)
                        .font(.system(size: 18, weight: .regular))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .frame(width: 24, height: 24)
                }
                Text(label)
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .lineLimit(1)
                Spacer(minLength: Theme.Spacing.sm)
                if let note {
                    Text(note)
                        .font(.system(size: 13))
                        .foregroundStyle(noteColor)
                        .lineLimit(1)
                }
                ChevronGlyph()
            }
            .padding(.vertical, 13)
            .padding(.horizontal, Theme.Spacing.xs)
            .overlay(alignment: .bottom) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(note.map { "\(label), \($0)" } ?? label)
    }
}

/// The small uppercase-ish label above a settings group: "Service", "Benefits".
struct SectionLabel: View {
    let text: String

    init(_ text: String) { self.text = text }

    var body: some View {
        Text(text)
            .font(.system(size: 12, weight: .medium))
            .kerning(0.7)
            .foregroundStyle(Theme.Colors.textMuted)
            .accessibilityAddTraits(.isHeader)
    }
}

// MARK: Radio dot

/// The selection dot on a radio card. Two circles, no icon set for one glyph.
struct RadioDot: View {
    let selected: Bool
    var color: Color = Theme.Colors.accentPrimary
    var size: CGFloat = 21

    var body: some View {
        ZStack {
            Circle()
                .fill(selected ? Color.clear : Theme.Colors.wheelBand)
            Circle()
                .strokeBorder(selected ? color : Theme.Colors.borderStrong, lineWidth: selected ? 2 : 1)
            if selected {
                Circle().fill(color).frame(width: size * 0.43, height: size * 0.43)
            }
        }
        .frame(width: size, height: size)
        .accessibilityHidden(true)
    }
}

/// A full-width selectable row or card with a radio dot on the left. The
/// audience picker and the credit packs are both this.
struct RadioCard<Content: View>: View {
    let selected: Bool
    var accent: Color = Theme.Colors.accentPrimary
    var centered: Bool = false
    let action: () -> Void
    @ViewBuilder let content: () -> Content

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            HStack(spacing: centered ? 8 : 13) {
                if centered { Spacer(minLength: 0) }
                RadioDot(selected: selected, color: accent, size: centered ? 20 : 21)
                content()
                if centered { Spacer(minLength: 0) }
            }
            .padding(.horizontal, centered ? Theme.Spacing.xs : Theme.Spacing.lg)
            .padding(.vertical, 13)
            .frame(maxWidth: .infinity, minHeight: 50, alignment: centered ? .center : .leading)
            .background(
                selected && accent == Theme.Colors.accentPrimary ? Theme.Colors.accentPrimary.opacity(0.1) : Theme.Colors.bgElevated,
                in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
            )
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                    .strokeBorder(selected ? accent : Theme.Colors.borderSubtle, lineWidth: selected ? 1.5 : 0.5)
            }
            .contentShape(RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
        }
        .buttonStyle(PressOpacityStyle(pressed: 0.8))
        .accessibilityAddTraits(selected ? [.isButton, .isSelected] : .isButton)
    }
}

// MARK: Tooltip bubble

enum TooltipTail {
    case up, down, none
}

/// A white speech bubble with a small tail. Used for the sign-up bonus and
/// for a hint under the quality pill.
struct TooltipBubble: View {
    let text: String
    var tail: TooltipTail = .down
    var onClose: (() -> Void)? = nil
    @Environment(\.translator) private var t

    var body: some View {
        HStack(spacing: Theme.Spacing.md) {
            Text(text)
                .font(.system(size: 14, weight: .medium))
                .foregroundStyle(Theme.Colors.textOnLight)
                .lineLimit(2)
            if let onClose {
                Button(action: onClose) {
                    Image(systemName: "xmark")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textOnLight)
                        .frame(width: 24, height: 24)
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(t("misc.close"))
            }
        }
        .padding(.horizontal, onClose == nil ? 17 : 12)
        .padding(.vertical, 11)
        .background(Color.white, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
        .overlay(alignment: tail == .down ? .bottom : .top) {
            if tail != .none {
                Rectangle()
                    .fill(Color.white)
                    .frame(width: 14, height: 14)
                    .rotationEffect(.degrees(45))
                    .offset(y: tail == .down ? 7 : -7)
            }
        }
    }
}

// MARK: Legal footer

/// "By clicking continue, you agree to our Terms of Service and Privacy
/// Policy." The two links open the published pages; when this build has no
/// legal URL configured the line is omitted rather than pointing at nothing.
struct LegalFooter: View {
    @Environment(\.translator) private var t
    @Environment(\.openURL) private var openURL

    var body: some View {
        if let base = AppConfig.legalBaseURL {
            VStack(spacing: 2) {
                Text(t("onboarding.legal_footer"))
                HStack(spacing: 4) {
                    link(t("onboarding.terms_of_service"), url: base.appendingPathComponent("terms"))
                    Text(t("onboarding.legal_and"))
                    link(t("onboarding.privacy_policy"), url: base.appendingPathComponent("privacy"))
                }
            }
            .font(.system(size: 12))
            .foregroundStyle(Theme.Colors.textMuted)
            .multilineTextAlignment(.center)
            .frame(maxWidth: .infinity)
        }
    }

    private func link(_ label: String, url: URL) -> some View {
        Button { openURL(url) } label: {
            Text(label).underline()
        }
        .buttonStyle(PressOpacityStyle())
    }
}

// MARK: Onboarding frame

/// The shell every onboarding step shares: a close/skip cross top-right, the
/// progress bar, the content, and a pinned footer. `step` is 1-based.
struct OnboardingFrame<Content: View, Footer: View>: View {
    let step: Int
    let total: Int
    var onClose: (() -> Void)? = nil
    @ViewBuilder let content: () -> Content
    @ViewBuilder let footer: () -> Footer
    @Environment(\.translator) private var t

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Spacer(minLength: 0)
                    if let onClose {
                        IconButton(t("onboarding.skip"), action: onClose) {
                            Image(systemName: "xmark")
                                .font(.system(size: 20, weight: .medium))
                                .foregroundStyle(Theme.Colors.textMuted)
                        }
                    } else {
                        Color.clear.frame(width: Theme.minTouchTarget, height: Theme.minTouchTarget)
                    }
                }
                .padding(.horizontal, Theme.Spacing.sm)
                .padding(.top, Theme.Spacing.xs)

                ProgressBar(fraction: Double(step) / Double(total))
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.md)
                    .accessibilityLabel(t("onboarding.step_a11y", ["step": step, "total": total]))

                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        content()
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, 44)
                    .padding(.bottom, Theme.Spacing.xxl)
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .scrollDismissesKeyboard(.interactively)

                VStack(spacing: 22) {
                    footer()
                }
                .padding(.horizontal, Theme.pageGutter)
                .padding(.bottom, Theme.Spacing.md)
            }
        }
    }
}

/// An onboarding step's title: 26pt semibold, tight leading.
struct OnboardingTitle: View {
    let text: String
    var size: CGFloat = 26

    init(_ text: String, size: CGFloat = 26) {
        self.text = text
        self.size = size
    }

    var body: some View {
        Text(text)
            .font(.system(size: size, weight: .semibold))
            .foregroundStyle(Theme.Colors.textPrimary)
            .lineSpacing(size * 0.25 - 4)
            .fixedSize(horizontal: false, vertical: true)
            .accessibilityAddTraits(.isHeader)
    }
}
