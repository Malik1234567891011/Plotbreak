import SwiftUI

// MARK: - Composer dock (§10.2 D)
//
// Persistent, above the keyboard. The input, Send/Stop, the quality pill, the
// shortfall warning and the last-turn menu button.

struct SessionComposer: View {
    @Bindable var model: SessionModel
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store
    @FocusState private var focused: Bool

    private var draftEmpty: Bool { model.draft.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
    private var isPending: Bool { model.pending != nil }

    var body: some View {
        VStack(spacing: Theme.Spacing.sm) {
            HStack(alignment: .bottom, spacing: Theme.Spacing.sm) {
                // Autocorrect rewrote what the player actually typed, in a game
                // whose entire input is prose full of invented proper nouns.
                // Spell check stays on; what stops is the silent replacement.
                TextField(composerPlaceholder(t, scene: model.scene), text: $model.draft, axis: .vertical)
                    .lineLimit(1...5)
                    .font(.system(size: 17))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .tint(Theme.Colors.accentPrimary)
                    .autocorrectionDisabled(true)
                    .focused($focused)
                    .padding(.horizontal, Theme.Spacing.lg)
                    .padding(.vertical, Theme.Spacing.md)
                    .frame(minHeight: 44)
                    .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                    .disabled(isPending)
                    .accessibilityLabel(t("session.what_do_you_do"))

                Button {
                    if isPending {
                        // Spec §10.2 D — Stop cancels client rendering only.
                        model.stop()
                    } else {
                        Task { await model.send() }
                    }
                } label: {
                    Text(isPending ? "■" : "↑")
                        .font(Theme.TypeStyle.bodyStrong.font())
                        .foregroundStyle(isPending || draftEmpty ? Theme.Colors.textMuted : Theme.Colors.textOnAccent)
                        .frame(width: 44, height: 44)
                        .background(
                            isPending ? Theme.Colors.bgRaised : (draftEmpty ? Theme.Colors.bgRaised : Theme.Colors.accentPrimary),
                            in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous)
                        )
                }
                .buttonStyle(PressScaleStyle())
                .disabled(draftEmpty && !isPending)
                .accessibilityLabel(isPending ? t("session.stop") : t("session.send_action"))
            }
            .padding(.horizontal, Theme.gutter)

            HStack {
                QualityPill(
                    label: t(TierCopy.labelKey(model.tier.id)),
                    cost: model.tier.costCredits,
                    affordable: model.affordable,
                    locale: store.locale
                ) {
                    model.showQuality = true
                }
                Spacer()
                HStack(spacing: Theme.Spacing.lg) {
                    if !model.affordable {
                        Txt(t("session.more_credits_needed", ["count": model.tier.costCredits - model.balance]), .micro, color: Theme.Colors.warning)
                    }
                    // GP-04. In the dock rather than in the transcript: at the
                    // end of a scroll region its frame sits behind this bar.
                    if let action = model.latest?.actionText, !action.isEmpty, !isPending {
                        Button {
                            Haptic.play(.light)
                            model.showTurnMenu = true
                        } label: {
                            Txt(t("session.last_turn"), .micro, color: Theme.Colors.textMuted)
                                .frame(minHeight: Theme.minTouchTarget - 16)
                                .contentShape(Rectangle())
                        }
                        .buttonStyle(PressOpacityStyle())
                        .accessibilityLabel(t("session.turn_options"))
                    }
                }
            }
            .padding(.horizontal, Theme.gutter)
        }
        .padding(.top, Theme.Spacing.md)
        .padding(.bottom, Theme.Spacing.md)
        .background(Theme.Colors.bgElevated)
        .overlay(alignment: .top) { PBDivider() }
    }
}

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
