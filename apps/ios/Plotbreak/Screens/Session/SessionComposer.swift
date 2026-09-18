import SwiftUI

// MARK: - Composer dock (§10.2 D)
//
// Persistent, above the keyboard. The round actions, then the input with
// Send/Stop. The tier and its cost live in the header's quality pill.

struct SessionComposer: View {
    @Bindable var model: SessionModel
    /// Opens the three suggested responses (the sparkle button).
    /// Jumps to the newest beat (the round arrow on the right).
    var onScrollToLatest: () -> Void = {}
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store
    @FocusState private var focused: Bool
    @Namespace private var sendSlot

    private var draftEmpty: Bool { model.draft.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
    private var isPending: Bool { model.pending != nil }
    private var latestImage: String? { model.heroImageUrl ?? model.turns.last(where: { $0.heroImageUrl != nil })?.heroImageUrl }
    private var canRetry: Bool { !isPending && !(model.latest?.actionText ?? "").isEmpty }

    var body: some View {
        VStack(spacing: 0) {
            // The round buttons: the latest image, retry, the turn menu, and
            // on the right the way back to the newest beat.
            HStack(spacing: 10) {
                RoundAction(symbol: "photo", label: t("session.latest_image_a11y"), disabled: latestImage == nil) {
                    if let latestImage { model.fullScreenImage = latestImage }
                }
                RoundAction(symbol: "arrow.clockwise", label: t("session.retry", ["cost": model.tier.costCredits]), disabled: !canRetry) {
                    model.retryLatest()
                }
                RoundAction(symbol: "ellipsis", label: t("session.turn_options"), disabled: !canRetry, rotate: true) {
                    model.showTurnMenu = true
                }
                Spacer(minLength: 0)
                RoundAction(symbol: "chevron.up", label: t("session.scroll_to_latest"), filled: true, action: onScrollToLatest)
            }
            .padding(.horizontal, Theme.gutter)
            .padding(.top, 14)

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
            .padding(.top, 14)
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

/// A 48pt circle with one symbol in it: outlined and grey, or filled white
/// for the one that leads somewhere.
private struct RoundAction: View {
    let symbol: String
    let label: String
    var disabled: Bool = false
    var filled: Bool = false
    var rotate: Bool = false
    let action: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            Image(systemName: symbol)
                .font(.system(size: 18, weight: filled ? .bold : .regular))
                .rotationEffect(.degrees(rotate ? 90 : 0))
                .foregroundStyle(filled ? Theme.Colors.textOnLight : Theme.Colors.textSecondary)
                .frame(width: 48, height: 48)
                .background(filled ? Theme.Colors.light : Color.clear, in: Circle())
                .overlay { if !filled { Circle().strokeBorder(Theme.Colors.borderStrong, lineWidth: 0.5) } }
                .opacity(disabled ? 0.4 : 1)
                .contentShape(Circle())
        }
        .buttonStyle(PressOpacityStyle())
        .disabled(disabled)
        .accessibilityLabel(label)
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
                VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                        Txt(title, .h2)
                        if let subtitle {
                            Txt(subtitle, .caption, color: Theme.Colors.textSecondary)
                        }
                    }
                    content()
                }
                .padding(Theme.gutter)
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
    let onSelect: (QualityTier) -> Void
    let onClose: () -> Void
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store

    var body: some View {
        SessionSheet(title: t("session.turn_quality"), subtitle: t("session.turn_quality_explainer"), onClose: onClose) {
            ForEach(tiers) { tier in
                let selected = tier.id == current
                let affordable = balance >= tier.costCredits
                Button {
                    Haptic.play(.light)
                    onSelect(tier.id)
                } label: {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 2) {
                            Txt(t(TierCopy.labelKey(tier.id)), .bodyStrong, color: selected ? Theme.Colors.accentPrimary : Theme.Colors.textPrimary)
                            Txt(t(TierCopy.promiseKey(tier.id)), .caption, color: Theme.Colors.textSecondary)
                            if tier.heroImageEligible {
                                Txt(t("session.hero_frame_eligible"), .micro, color: Theme.Colors.textMuted)
                            }
                        }
                        Spacer(minLength: Theme.Spacing.md)
                        // What a player actually wants to know is how far their
                        // balance goes at this tier.
                        VStack(alignment: .trailing, spacing: 2) {
                            Txt(Format.credits(tier.costCredits, locale: store.locale), .bodyStrong,
                                color: affordable ? Theme.Colors.textPrimary : Theme.Colors.warning)
                            Txt(affordable ? t("session.turns_left", ["count": balance / tier.costCredits]) : t("session.not_enough"),
                                .micro, color: Theme.Colors.textMuted)
                        }
                    }
                    .padding(Theme.Spacing.lg)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                    .overlay {
                        RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                            .strokeBorder(selected ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: selected ? 1 : 0.5)
                    }
                }
                .buttonStyle(PressScaleStyle())
                .accessibilityLabel(t("session.tier_a11y", [
                    "label": t(TierCopy.labelKey(tier.id)),
                    "cost": tier.costCredits,
                    "promise": t(TierCopy.promiseKey(tier.id)),
                ]))
                .accessibilityAddTraits(selected ? [.isSelected] : [])
            }
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
