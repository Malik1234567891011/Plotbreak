import SwiftUI

// MARK: - Composer dock (§10.2 D)
//
// Persistent, above the keyboard. The input, Send/Stop, the quality pill, the
// shortfall warning and the last-turn menu button.

struct SessionComposer: View {
    @Bindable var model: SessionModel
    /// Opens the three suggested responses (the sparkle button).
    var onSuggestions: () -> Void = {}
    /// Jumps to the newest beat (the round arrow on the right).
    var onScrollToLatest: () -> Void = {}
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store
    @FocusState private var focused: Bool

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
            HStack(spacing: 10) {
                TextField(t("session.composer_placeholder"), text: $model.draft, axis: .vertical)
                    .lineLimit(1...5)
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .tint(Theme.Colors.accentPrimary)
                    .autocorrectionDisabled(true)
                    .focused($focused)
                    .padding(.vertical, Theme.Spacing.md)
                    .disabled(isPending)
                    .accessibilityLabel(t("session.what_do_you_do"))

                Button {
                    Haptic.play(.light)
                    onSuggestions()
                } label: {
                    Image(systemName: "sparkles")
                        .font(.system(size: 20, weight: .regular))
                        .foregroundStyle(model.suggestions.isEmpty ? Theme.Colors.textMuted : Theme.Colors.textSecondary)
                        .frame(width: 32, height: 32)
                        .overlay(alignment: .topTrailing) {
                            if !model.suggestions.isEmpty, !isPending {
                                Circle().fill(Theme.Colors.accentPrimary).frame(width: 6, height: 6).offset(x: -2, y: 4)
                            }
                        }
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .disabled(model.suggestions.isEmpty || isPending)
                .accessibilityLabel(t("session.suggestions_title"))

                Rectangle().fill(Theme.Colors.borderSubtle).frame(width: 1, height: 26)

                Button {
                    if isPending {
                        // Spec §10.2 D — Stop cancels client rendering only.
                        model.stop()
                    } else {
                        Task { await model.send() }
                    }
                } label: {
                    Image(systemName: isPending ? "stop.fill" : "arrow.up")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundStyle(isPending || draftEmpty ? Theme.Colors.textMuted : Theme.Colors.textOnAccent)
                        .frame(width: 42, height: 42)
                        .background(
                            isPending || draftEmpty ? Theme.Colors.bgRaised : Theme.Colors.accentPrimary,
                            in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous)
                        )
                }
                .buttonStyle(PressScaleStyle())
                .disabled(draftEmpty && !isPending)
                .accessibilityLabel(isPending ? t("session.stop") : t("session.send_action"))
            }
            .padding(.leading, 18)
            .padding(.trailing, 3)
            .frame(minHeight: 48)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                    .strokeBorder(focused ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: focused ? 1 : 0.5)
            }
            .padding(.horizontal, Theme.gutter)
            .padding(.top, 14)

            // "Vivid · 60 credits · 10 turns left", and the last-turn menu.
            HStack {
                Button {
                    Haptic.play(.light)
                    model.showQuality = true
                } label: {
                    Text(statusLine)
                        .font(.system(size: 13))
                        .foregroundStyle(model.affordable ? Theme.Colors.textMuted : Theme.Colors.warning)
                        .lineLimit(1)
                        .frame(minHeight: Theme.minTouchTarget - 16)
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(t("session.turn_quality"))
                .accessibilityValue(statusLine)
                Spacer()
                // GP-04. In the dock rather than in the transcript: at the
                // end of a scroll region its frame sits behind this bar.
                if canRetry {
                    Button {
                        Haptic.play(.light)
                        model.showTurnMenu = true
                    } label: {
                        Text(t("session.last_turn"))
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.Colors.textMuted)
                            .frame(minHeight: Theme.minTouchTarget - 16)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t("session.turn_options"))
                }
            }
            .padding(.horizontal, Theme.gutter)
            .padding(.top, 10)
            .padding(.bottom, Theme.Spacing.md)
        }
        .background(Theme.Colors.bgBase)
    }

    private var statusLine: String {
        if !model.affordable {
            return t("session.more_credits_needed", ["count": model.tier.costCredits - model.balance])
        }
        return t("session.status_line", [
            "tier": t(TierCopy.labelKey(model.tier.id)),
            "cost": model.tier.costCredits,
            "turns": model.tier.costCredits > 0 ? model.balance / model.tier.costCredits : 0,
        ])
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

/// The three responses, behind the sparkle rather than in the feed, so the
/// story stays prose. Each one says its risk and its cost before it is taken.
struct SessionSuggestionsSheet: View {
    let suggestions: [SuggestedAction]
    let onChoose: (SuggestedAction) -> Void
    let onEdit: (SuggestedAction) -> Void
    let onClose: () -> Void
    @Environment(\.translator) private var t

    var body: some View {
        SessionSheet(title: t("session.suggestions_title"), onClose: onClose) {
            ForEach(Array(suggestions.enumerated()), id: \.offset) { _, item in
                ActionSuggestion(
                    suggestion: item,
                    editLabel: t("ui.edit_response_a11y"),
                    onPress: { onChoose(item) },
                    onEdit: { onEdit(item) }
                )
            }
        }
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
