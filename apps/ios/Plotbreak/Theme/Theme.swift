import SwiftUI
import UIKit

// MARK: - Design tokens (spec §25)
//
// Twins of `packages/ui/src/tokens.ts`. Dark neutral foundation, one selective
// accent, art gets the loudest colour. Dark-only at launch; every value is a
// token so a light theme is a swap rather than a rewrite.

enum Theme {
    enum Colors {
        static let bgBase = Color(hex: 0x0B0D12)
        static let bgElevated = Color(hex: 0x121620)
        static let bgRaised = Color(hex: 0x191E2A)

        static let textPrimary = Color(hex: 0xF7F8FA)
        static let textSecondary = Color(hex: 0xA7AFBE)
        static let textMuted = Color(hex: 0x707888)
        /// For text sitting on the accent fill.
        static let textOnAccent = Color(hex: 0x0B0D12)

        static let accentPrimary = Color(hex: 0x7C6CFF)
        static let accentSecondary = Color(hex: 0xFF6B9E)

        static let success = Color(hex: 0x43D6A4)
        static let warning = Color(hex: 0xF6BE55)
        static let danger = Color(hex: 0xFF5B69)

        static let borderSubtle = Color(hex: 0x262C39)
        static let borderStrong = Color(hex: 0x333B4C)

        /// Scrim behind sheets and full-screen media.
        static let scrim = Color(red: 4 / 255, green: 6 / 255, blue: 11 / 255, opacity: 0.72)
    }

    /// Spec §25.4 — base grid 4pt.
    enum Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 12
        static let lg: CGFloat = 16
        static let xl: CGFloat = 20
        static let xxl: CGFloat = 24
        static let xxxl: CGFloat = 32
        static let huge: CGFloat = 40
        static let giant: CGFloat = 48
    }

    /// Default horizontal phone gutter (§25.4).
    static let gutter: CGFloat = 16

    /// Spec §25.5 — do not round every container into a floating bubble.
    enum Radius {
        static let control: CGFloat = 10
        static let card: CGFloat = 14
        static let large: CGFloat = 20
        static let pill: CGFloat = 999
    }

    /// Spec §25.3. Body is 17pt because gameplay dialogue must be readable at
    /// arm's length. Sizes scale with Dynamic Type through `relativeTo`.
    enum TypeStyle: CaseIterable {
        case display, h1, h2, h3, body, bodyStrong, bodyCompact, caption, micro

        var size: CGFloat {
            switch self {
            case .display: return 32
            case .h1: return 26
            case .h2: return 22
            case .h3: return 18
            case .body, .bodyStrong: return 17
            case .bodyCompact: return 15
            case .caption: return 13
            case .micro: return 11
            }
        }

        var lineHeight: CGFloat {
            switch self {
            case .display: return 38
            case .h1: return 32
            case .h2: return 28
            case .h3: return 24
            case .body, .bodyStrong: return 24
            case .bodyCompact: return 21
            case .caption: return 18
            case .micro: return 14
            }
        }

        var weight: Font.Weight {
            switch self {
            case .display, .h1, .h2, .h3, .bodyStrong: return .semibold
            case .micro: return .medium
            default: return .regular
            }
        }

        var textStyle: Font.TextStyle {
            switch self {
            case .display: return .largeTitle
            case .h1: return .title
            case .h2: return .title2
            case .h3: return .title3
            case .body, .bodyStrong: return .body
            case .bodyCompact: return .callout
            case .caption: return .footnote
            case .micro: return .caption2
            }
        }

        func font(serif: Bool = false) -> Font {
            let design: Font.Design = serif ? .serif : .default
            return .system(size: size, weight: weight, design: design)
        }

        /// Extra leading so SwiftUI's line height lands on the token.
        var lineSpacing: CGFloat { max(0, lineHeight - size * 1.2) }
    }

    /// Narration uses a serif for short passages only (§25.3).
    // i18n-exempt: the platform's own font family name, not copy
    static let narrationFont = "Georgia"

    /// Spec §25.8 — 44×44pt minimum for anything used frequently.
    static let minTouchTarget: CGFloat = 44

    /// The window's top safe-area inset, in points.
    ///
    /// Read from UIKit rather than a `GeometryReader`, because a reader inside
    /// a view that ignores the safe area reports zero — which is how the
    /// Discover header ended up painted across the clock and the battery. A
    /// screen that floats a header over content it also scrolls under needs the
    /// real number, and this is the only place that always has it.
    @MainActor
    static var topSafeAreaInset: CGFloat {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        let window = scenes.first(where: { $0.activationState == .foregroundActive })?.keyWindow
            ?? scenes.first?.keyWindow
        return window?.safeAreaInsets.top ?? 0
    }

    enum Durations {
        static let instant: Double = 0.12
        static let short: Double = 0.2
        /// Spec §26.8 — check reveal is 550–900ms and always skippable.
        static let checkReveal: Double = 0.7
        static let sheet: Double = 0.28
    }

    /// Risk colour, always paired with a label — never colour alone (§27.3).
    static func riskColor(_ risk: RiskLabel?) -> Color {
        switch risk {
        case .EXTREME: return Colors.danger
        case .RISKY: return Colors.warning
        case .UNCERTAIN: return Colors.textSecondary
        default: return Colors.success
        }
    }

    static func riskColor(_ risk: String?) -> Color {
        riskColor(risk.flatMap(RiskLabel.init(rawValue:)))
    }

    static func outcomeColor(_ outcome: CheckOutcome) -> Color {
        switch outcome {
        case .CRITICAL_SUCCESS, .CLEAN_SUCCESS, .SUCCESS: return Colors.success
        case .SUCCESS_WITH_COST: return Colors.warning
        case .COMPLICATION: return Colors.danger
        case .FAILURE: return Colors.textSecondary
        }
    }

    static func outcomeColor(_ outcome: String) -> Color {
        outcomeColor(CheckOutcome(rawValue: outcome) ?? .FAILURE)
    }
}

// MARK: - Haptics (§25.11 — never the sole feedback for anything)

enum HapticKind {
    case light, medium, warning, error, success
}

enum Haptic {
    static var enabled = true

    static func play(_ kind: HapticKind) {
        guard enabled else { return }
        switch kind {
        case .light: UIImpactFeedbackGenerator(style: .light).impactOccurred()
        case .medium: UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        case .warning: UINotificationFeedbackGenerator().notificationOccurred(.warning)
        case .error: UINotificationFeedbackGenerator().notificationOccurred(.error)
        case .success: UINotificationFeedbackGenerator().notificationOccurred(.success)
        }
    }
}

// MARK: - Color helpers

extension Color {
    init(hex: UInt32, opacity: Double = 1) {
        self.init(
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: opacity
        )
    }

    /// Parses `#RRGGBB`, `#RGB` or `rgba(...)` strings the server sends for
    /// resource bars. Falls back to the accent when the string is not a colour.
    init(css: String?, fallback: Color = Theme.Colors.accentPrimary) {
        guard let css = css?.trimmingCharacters(in: .whitespaces), !css.isEmpty else {
            self = fallback
            return
        }
        if css.hasPrefix("#") {
            var hex = String(css.dropFirst())
            if hex.count == 3 { hex = hex.map { "\($0)\($0)" }.joined() }
            if hex.count == 6, let value = UInt32(hex, radix: 16) {
                self.init(hex: value)
                return
            }
        }
        if css.hasPrefix("rgb") {
            let numbers = css
                .split(whereSeparator: { !"0123456789.".contains($0) })
                .compactMap { Double($0) }
            if numbers.count >= 3 {
                self.init(
                    red: numbers[0] / 255, green: numbers[1] / 255, blue: numbers[2] / 255,
                    opacity: numbers.count > 3 ? numbers[3] : 1
                )
                return
            }
        }
        self = fallback
    }
}
