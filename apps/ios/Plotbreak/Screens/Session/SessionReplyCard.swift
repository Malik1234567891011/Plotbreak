import SwiftUI

// MARK: - Smoke (design v3, board frame Play)
//
// The story sits on the stage art, so whatever carries words over it brings
// its own contrast: a blur of the art under a wash of ink. The beat panels and
// the reply cards share it, so they read as one material.

/// Smoked glass in a given shape: the art behind it blurred, then ink over it.
struct SessionSmoke<S: InsettableShape>: View {
    let shape: S
    /// How much ink goes over the blur. The panels carry long passages of the
    /// secondary grey and need the most; see `SessionBeatPanel.ink`.
    var ink: Double
    /// The hairline the board draws round every smoked surface.
    var edge: Double = 0.08

    var body: some View {
        ZStack {
            shape.fill(.ultraThinMaterial)
            shape.fill(Theme.Colors.bgBase.opacity(ink))
            shape.strokeBorder(Theme.Colors.textPrimary.opacity(edge), lineWidth: 1)
        }
        .environment(\.colorScheme, .dark)
        .allowsHitTesting(false)
    }
}

// MARK: - Beat panel

/// One beat's words on one smoked panel: 12pt corners, 16pt in.
///
/// Only over art. With no stage the feed is plain ink, as it was before the
/// art went behind it, and a panel there would be a box for nothing; so
/// `smoked: false` lays the blocks out exactly as the feed always did.
struct SessionBeatPanel<Content: View>: View {
    let smoked: Bool
    /// Between blocks when there is no panel: the feed's own spacing there.
    var spacing: CGFloat
    @ViewBuilder let content: () -> Content

    /// Ink over the blur. The spec's 0.55 clears 4.5:1 for the narration grey
    /// over Hush House `hall_third` (6.1:1) but not over the daylight stages:
    /// Salt Road `ossun_gate`, the brightest of the 928, measures 3.5:1 there.
    /// At 0.7 it is 5.0:1 (7.0:1 over `hall_third`), modelling the material
    /// as blur only, which is the conservative reading.
    static var ink: Double { 0.7 }

    var body: some View {
        if smoked {
            VStack(alignment: .leading, spacing: 14, content: content)
                .padding(Theme.Spacing.lg)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background {
                    SessionSmoke(shape: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous), ink: Self.ink)
                }
        } else {
            VStack(alignment: .leading, spacing: spacing, content: content)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

// MARK: - Reply card

/// One of the three replies under a beat (board frame Play): a pencil to edit
/// it first, the line in the story's serif, and a white round send.
///
/// Two buttons, not one card with a hidden menu: editing is the second way the
/// game is played and it used to live behind a long press nobody found. The
/// long press stays as well, for whoever learned it.
struct SessionReplyCard: View {
    let suggestion: SuggestedAction
    let onSend: () -> Void
    let onEdit: () -> Void
    @Environment(\.translator) private var t

    private static let radius: CGFloat = 24
    private var shape: RoundedRectangle { RoundedRectangle(cornerRadius: Self.radius, style: .continuous) }

    var body: some View {
        HStack(spacing: 0) {
            editButton
            sendButton
        }
        .frame(minHeight: 48)
        .fixedSize(horizontal: false, vertical: true)
        .background { SessionSmoke(shape: shape, ink: 0.62, edge: 0.14) }
        .contentShape(shape)
        .contextMenu {
            Button(t("ui.edit_response_a11y"), systemImage: "pencil", action: onEdit)
        }
    }

    private var editButton: some View {
        Button {
            Haptic.play(.light)
            onEdit()
        } label: {
            // The secondary grey, not the board's muted one: a control over
            // bright art needs 3:1, and the muted grey falls short of it.
            Image(systemName: "pencil")
                .font(.system(size: 15, weight: .medium))
                .foregroundStyle(Theme.Colors.textSecondary)
                .frame(width: Theme.minTouchTarget)
                .frame(maxHeight: .infinity)
                .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .overlay(alignment: .trailing) {
            Rectangle()
                .fill(Theme.Colors.textPrimary.opacity(0.12))
                .frame(width: 1)
                .accessibilityHidden(true)
        }
        .accessibilityLabel(t("ui.edit_response_a11y"))
    }

    /// The line and the send key are one target: a tap anywhere on the words
    /// says them, as the whole card did before.
    private var sendButton: some View {
        Button {
            Haptic.play(.light)
            onSend()
        } label: {
            HStack(spacing: Theme.Spacing.sm) {
                VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                    Text(suggestion.text)
                        .font(.system(size: 17, weight: .regular, design: .serif))
                        .lineSpacing(3)
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                    if let cost = suggestion.resourceCostLabel, !cost.isEmpty {
                        Txt(cost, .micro, color: Theme.Colors.textSecondary)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.vertical, Theme.Spacing.md)
                .padding(.leading, Theme.Spacing.md)

                Image(systemName: "arrow.up")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundStyle(Theme.Colors.textOnLight)
                    .frame(width: 32, height: 32)
                    .background(Theme.Colors.light, in: Circle())
                    .frame(width: Theme.minTouchTarget, height: Theme.minTouchTarget)
                    .accessibilityHidden(true)
            }
            .padding(.trailing, Theme.Spacing.xs)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(suggestion.text)
        .accessibilityValue(suggestion.resourceCostLabel ?? "")
    }
}
