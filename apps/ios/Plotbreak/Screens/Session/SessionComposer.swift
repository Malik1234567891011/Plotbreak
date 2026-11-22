import SwiftUI

// MARK: - Composer dock (§10.2 D)
//
// Persistent, above the keyboard: the input with Send/Stop, and nothing else.
// The tier and its cost live in the header's quality pill; the way back to the
// newest beat floats over the feed.

struct SessionComposer: View {
    @Bindable var model: SessionModel
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store
    @FocusState private var focused: Bool
    @Namespace private var sendSlot

    private var draftEmpty: Bool { model.draft.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
    private var isPending: Bool { model.pending != nil }

    var body: some View {
        VStack(spacing: 0) {
            // Autocorrect rewrote what the player actually typed, in a game
            // whose entire input is prose full of invented proper nouns.
            // Spell check stays on; what stops is the silent replacement.
            //
            // One row at rest; two while typing, the send button dropping to
            // its own row under the words. The field stays first in the first
            // row either way — moving it would rebuild it and drop the focus.
            VStack(alignment: .trailing, spacing: 4) {
                HStack(spacing: 10) {
                    TextField(
                        t("session.composer_placeholder"),
                        text: $model.draft,
                        prompt: Text(t("session.composer_placeholder")).foregroundStyle(Box.placeholder),
                        axis: .vertical
                    )
                    .lineLimit(1...5)
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .tint(Theme.Colors.accentPrimary)
                    .autocorrectionDisabled(true)
                    .focused($focused)
                    .padding(.vertical, 13)
                    .disabled(isPending)
                    // Disabling the field hides the keyboard but leaves the
                    // focus state set, so SwiftUI handed the focus back the
                    // moment the turn finished — and the keyboard came up over
                    // the story the player was reading. Let go of it on send;
                    // a tap on the field is how it comes back.
                    .onChange(of: isPending) { _, pending in
                        if pending { focused = false }
                    }
                    .accessibilityLabel(t("session.what_do_you_do"))
                    if !focused { sendButton }
                }
                .padding(.leading, 14)
                .padding(.trailing, focused ? 14 : 10)
                if focused {
                    sendButton
                        .padding(.trailing, 11)
                        .padding(.bottom, 12)
                }
            }
            .frame(minHeight: 44)
            .background(Box.fill, in: RoundedRectangle(cornerRadius: Box.radius, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Box.radius, style: .continuous)
                    .strokeBorder(Box.border, lineWidth: 1)
            }
            // The focus ring sits outside the box rather than eating into it,
            // so the words do not shift when it appears.
            .overlay {
                if focused {
                    RoundedRectangle(cornerRadius: Box.radius + Box.ring / 2, style: .continuous)
                        .stroke(Box.focusRing, lineWidth: Box.ring)
                        .padding(-Box.ring / 2)
                }
            }
            // The whole box is the field: the empty half of the typing state
            // included.
            .contentShape(RoundedRectangle(cornerRadius: Box.radius, style: .continuous))
            .onTapGesture { if !isPending { focused = true } }
            .animation(.easeOut(duration: Theme.Durations.short), value: focused)
            .padding(.horizontal, Theme.gutter)
            .padding(.top, Theme.Spacing.sm)
            .padding(.bottom, Theme.Spacing.md)
        }
        .background(Theme.Colors.bgBase)
    }

    /// Send, or Stop while a turn is in flight. White with a black glyph,
    /// empty draft or not.
    private var sendButton: some View {
        Button {
            if isPending {
                // Spec §10.2 D — Stop cancels client rendering only.
                model.stop()
            } else {
                Task { await model.send() }
            }
        } label: {
            Image(systemName: isPending ? "stop.fill" : "play.fill")
                .font(.system(size: 12, weight: .bold))
                .foregroundStyle(Box.sendGlyph)
                .frame(width: 32, height: 32)
                .background(Box.sendFill, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
        }
        .buttonStyle(PressScaleStyle())
        .disabled(draftEmpty && !isPending)
        .matchedGeometryEffect(id: "send", in: sendSlot)
        .accessibilityLabel(isPending ? t("session.stop") : t("session.send_action"))
    }

    /// The input box, measured off the reference screenshots: neutral greys
    /// rather than the app's blue-black, and a white send key.
    private enum Box {
        static let fill = Color(hex: 0x1C1C1C)
        static let border = Color(hex: 0x2B2B2B)
        static let focusRing = Color(hex: 0x747476)
        static let placeholder = Color(hex: 0xB8B8B8)
        static let sendFill = Color.white
        static let sendGlyph = Color.black
        static let radius: CGFloat = 8
        static let ring: CGFloat = 3
    }
}

// MARK: - Suggestions sheet

// MARK: - Bottom sheet shell

/// Scrim dismisses, content scrolls, safe area respected. Drawn inside the
/// session rather than through the router so it stacks under the router's
/// own sheets (wallet, share, report) without competing for the slot.
struct SessionSheet<Content: View>: View {
    let title: String
    var subtitle: String? = nil
    /// Drawn at the right of the title (the quality sheet's balance chip).
    var accessory: AnyView? = nil
    let onClose: () -> Void
    @ViewBuilder let content: () -> Content
    @Environment(\.translator) private var t

    var body: some View {
        ZStack(alignment: .bottom) {
            Theme.Colors.scrim
                .ignoresSafeArea()
                .contentShape(Rectangle())
                .onTapGesture(perform: onClose)
                .accessibilityLabel(t("session.close_sheet", ["title": title.lowercased()]))
                .accessibilityAddTraits(.isButton)

            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    // Design v3: a grabber, the title with its accessory, one quiet line.
                    Capsule()
                        .fill(Theme.Colors.borderStrong)
                        .frame(width: 36, height: 5)
                        .frame(maxWidth: .infinity)
                        .padding(.top, -Theme.Spacing.sm)
                        .accessibilityHidden(true)
                    VStack(alignment: .leading, spacing: 2) {
                        HStack {
                            Txt(title, .h2)
                            Spacer(minLength: Theme.Spacing.sm)
                            accessory
                        }
                        if let subtitle {
                            Txt(subtitle, .caption, color: Theme.Colors.textMuted)
                        }
                    }
                    .padding(.horizontal, Theme.Spacing.sm)
                    content()
                }
                .padding(.horizontal, Theme.Spacing.md)
                .padding(.vertical, Theme.Spacing.lg)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .scrollBounceBehavior(.basedOnSize)
            .frame(maxHeight: UIScreen.main.bounds.height * 0.85)
            .fixedSize(horizontal: false, vertical: true)
            .background(Theme.Colors.bgElevated)
            .clipShape(UnevenRoundedRectangle(topLeadingRadius: Theme.Radius.large, topTrailingRadius: Theme.Radius.large, style: .continuous))
            .ignoresSafeArea(edges: .bottom)
            .transition(.move(edge: .bottom).combined(with: .opacity))
        }
    }
}

// MARK: - Turn menu (GP-04 / §20.9)
//
// What you can do about a turn that already happened. Every option says what
// it costs before it is taken.

struct SessionTurnMenu: View {
    let actionText: String
    let turnCost: Int
    let rephrasing: Bool
    let onRetry: () -> Void
    let onRephrase: () -> Void
    let onEdit: () -> Void
    let onReport: () -> Void
    let onShare: () -> Void
    let onClose: () -> Void
    @Environment(\.translator) private var t

    var body: some View {
        SessionSheet(title: t("session.this_turn"), onClose: onClose) {
            Txt(t("session.quoted_action", ["text": actionText]), .bodyCompact, color: Theme.Colors.textSecondary)

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                PBButton(t("session.retry", ["cost": turnCost]), variant: .secondary, action: onRetry)
                Txt(t("session.retry_explainer"), .micro, color: Theme.Colors.textMuted)
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                PBButton(t("session.rephrase", ["cost": turnCost]), loadingLabel: t("session.rewriting"), variant: .secondary,
                         loading: rephrasing, action: onRephrase)
                Txt(t("session.rephrase_explainer"), .micro, color: Theme.Colors.textMuted)
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                PBButton(t("session.edit_action"), variant: .secondary, action: onEdit)
                Txt(t("session.edit_explainer"), .micro, color: Theme.Colors.textMuted)
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                PBButton(t("session.share_action"), variant: .secondary, action: onShare)
                Txt(t("session.share_explainer"), .micro, color: Theme.Colors.textMuted)
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                PBButton(t("session.report_action"), variant: .tertiary, action: onReport)
                Txt(t("session.report_explainer"), .micro, color: Theme.Colors.textMuted)
            }
        }
    }
}

// MARK: - Quality sheet (GP-02)
//
// Copy describes presentation, never dice (§20.3).

struct SessionQualitySheet: View {
    let tiers: [QualityTierInfo]
    let current: QualityTier
    let balance: Int
    /// The scene on screen, shown as the icon of the tiers that draw pictures.
    var sceneArt: String? = nil
    let onSelect: (QualityTier) -> Void
    let onClose: () -> Void
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store

    var body: some View {
        SessionSheet(
            title: t("session.turn_quality"),
            subtitle: t("session.turn_quality_explainer"),
            accessory: AnyView(CreditBalance(balance: balance, compact: false, locale: store.locale)),
            onClose: onClose
        ) {
            // Design v3, after OOC's model picker: one row per tier, scannable
            // at a glance. The picked row is filled; no outlines, no radios.
            VStack(spacing: 2) {
                ForEach(tiers) { tier in
                    row(tier)
                }
            }
        }
    }

    private func row(_ tier: QualityTierInfo) -> some View {
        let selected = tier.id == current
        let affordable = balance >= tier.costCredits
        return Button {
            Haptic.play(.light)
            onSelect(tier.id)
        } label: {
            HStack(spacing: Theme.Spacing.md) {
                icon(tier, selected: selected)
                VStack(alignment: .leading, spacing: 2) {
                    Text(t(TierCopy.labelKey(tier.id)))
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Text(t(TierCopy.promiseKey(tier.id)))
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                Spacer(minLength: Theme.Spacing.sm)
                // The cost in crystals. Design v3 shows no turn counts.
                VStack(alignment: .trailing, spacing: 2) {
                    HStack(spacing: 3) {
                        CreditGlyph(size: 15)
                        Text(Format.credits(tier.costCredits, locale: store.locale))
                            .font(.system(size: 15, weight: .semibold))
                            .monospacedDigit()
                    }
                    .foregroundStyle(Theme.Colors.textPrimary)
                    if !affordable {
                        Text(t("session.not_enough"))
                            .font(.system(size: 12))
                            .foregroundStyle(Theme.Colors.textMuted)
                    }
                }
            }
            .padding(.horizontal, Theme.Spacing.sm)
            .padding(.vertical, 10)
            .frame(maxWidth: .infinity, minHeight: 68, alignment: .leading)
            .background(selected ? Theme.Colors.bgRaised : .clear, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(t("session.tier_a11y", [
            "label": t(TierCopy.labelKey(tier.id)),
            "cost": tier.costCredits,
            "promise": t(TierCopy.promiseKey(tier.id)),
        ]))
        .accessibilityAddTraits(selected ? [.isSelected] : [])
    }

    /// A 44pt cell: a glyph for the text tiers, the scene itself for the tiers
    /// that draw pictures, so "draws scenes" is seen rather than read.
    @ViewBuilder
    private func icon(_ tier: QualityTierInfo, selected: Bool) -> some View {
        let cell = RoundedRectangle(cornerRadius: 10, style: .continuous)
        if tier.heroImageEligible {
            Color.clear
                .frame(width: 44, height: 44)
                .overlay {
                    if let sceneArt {
                        StoryArt(seed: tier.id.rawValue, title: "", uri: sceneArt)
                    } else {
                        Image(systemName: "photo")
                            .font(.system(size: 18))
                            .foregroundStyle(Theme.Colors.textSecondary)
                    }
                }
                .background(selected ? Theme.Colors.borderSubtle : Theme.Colors.bgRaised, in: cell)
                .clipShape(cell)
                .accessibilityLabel(t("session.hero_frame_eligible"))
        } else {
            Image(systemName: tier.id == .QUICK ? "bolt" : "text.alignleft")
                .font(.system(size: 18, weight: .medium))
                .foregroundStyle(selected ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
                .frame(width: 44, height: 44)
                .background(selected ? Theme.Colors.borderSubtle : Theme.Colors.bgRaised, in: cell)
                .accessibilityHidden(true)
        }
    }
}

// MARK: - Full-screen media viewer (MD-01)

struct SessionImageViewer: View {
    let uri: String
    let onClose: () -> Void
    @Environment(\.translator) private var t

    var body: some View {
        ZStack {
            Color(red: 4 / 255, green: 6 / 255, blue: 11 / 255).opacity(0.96).ignoresSafeArea()
            VStack(spacing: Theme.Spacing.xl) {
                RemoteImage(uri.assetURL, contentMode: .fit) { Color.clear }
                    .aspectRatio(3 / 2, contentMode: .fit)
                    .frame(maxWidth: .infinity)
                Txt(t("session.tap_anywhere_to_close"), .caption, color: Theme.Colors.textMuted, center: true)
            }
        }
        .contentShape(Rectangle())
        .onTapGesture(perform: onClose)
        .accessibilityAddTraits(.isButton)
        .accessibilityLabel(t("session.close_image"))
        .transition(.opacity)
    }
}
