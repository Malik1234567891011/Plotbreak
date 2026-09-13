import SwiftUI

// MARK: - Feed (§10.2 C)
//
// The whole story, scrollable, with nothing folded away. Every committed turn
// keeps its prompt, its prose, its check and its hero frame; the live slot at
// the bottom shows the turn in flight or the latest committed one, followed
// by the three responses and any error.

struct SessionFeed: View {
    @Bindable var model: SessionModel
    @Environment(\.translator) private var t

    private static let bottomAnchor = "session.feed.bottom"

    var body: some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                    recap
                    history
                    liveSlot
                    errorCard
                    Color.clear.frame(height: 1).id(Self.bottomAnchor)
                }
                .padding(.horizontal, Theme.gutter)
                .padding(.top, 22)
                .padding(.bottom, Theme.Spacing.xxl)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .scrollDismissesKeyboard(.interactively)
            // The stage art, as a wash behind the words rather than a frame
            // above them: fourteen percent, fading to the page at the bottom.
            .background {
                ZStack {
                    if let stage = model.scene?.stageImage {
                        RemoteImage(stage.assetURL) { Color.clear }
                            .opacity(0.14)
                    }
                    LinearGradient(
                        stops: [
                            .init(color: Theme.Colors.bgBase.opacity(0.35), location: 0),
                            .init(color: Theme.Colors.bgBase, location: 0.78),
                        ],
                        startPoint: .top, endPoint: .bottom
                    )
                }
                .clipped()
                .allowsHitTesting(false)
                .accessibilityHidden(true)
            }
            .onChange(of: model.scrollRequest) { _, request in
                // Removing the three response cards shrinks the feed by their
                // whole stack, and the scroll offset is absolute — follow the
                // bottom, where the new text is.
                DispatchQueue.main.async {
                    if request.animated {
                        withAnimation(.easeOut(duration: Theme.Durations.short)) { proxy.scrollTo(Self.bottomAnchor, anchor: .bottom) }
                    } else {
                        proxy.scrollTo(Self.bottomAnchor, anchor: .bottom)
                    }
                }
            }
        }
    }

    // MARK: Recap

    /// Where the story left off, for a run picked up later. Nothing when the
    /// server sent none.
    @ViewBuilder private var recap: some View {
        if let recap = model.detail?.recap, !recap.bullets.isEmpty, !model.turns.isEmpty {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                ForEach(Array(recap.bullets.enumerated()), id: \.offset) { _, bullet in
                    Txt("· \(bullet)", .caption, color: Theme.Colors.textMuted)
                }
            }
            .padding(.bottom, Theme.Spacing.sm)
        }
    }

    // MARK: History

    @ViewBuilder private var history: some View {
        ForEach(model.historyTurns) { turn in
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                if let action = turn.actionText, !action.isEmpty {
                    SessionPlayerAction(text: action)
                }
                // The frame belongs to the beat that earned it.
                if let hero = turn.heroImageUrl {
                    SessionHeroFrame(uri: hero) { model.fullScreenImage = hero }
                }
                ForEach(Array(turn.blocks.enumerated()), id: \.offset) { _, block in
                    SessionBlock(block: block, scene: model.scene)
                }
            }
        }
    }

    // MARK: Live slot

    @ViewBuilder private var liveSlot: some View {
        let pending = model.pending
        let latest = model.latest

        if let pending {
            SessionPlayerAction(text: pending.actionText)
        } else if let action = latest?.actionText, !action.isEmpty {
            SessionPlayerAction(text: action)
        }

        if let check = pending?.check, worthRevealing(label: check.label, math: check.math) {
            CheckReveal(
                label: check.label,
                difficulty: check.difficulty,
                outcome: check.outcome.flatMap(CheckOutcome.init(rawValue:)),
                outcomeLabel: check.outcomeLabel,
                math: check.math
            )
        } else if pending == nil, let check = latest?.checks.first, worthRevealing(label: check.label, math: check.math) {
            // The committed turn carries the band and, where the world reveals
            // it, the arithmetic — so scrolling back does not show less than
            // the turn showed live.
            CheckReveal(
                label: check.label,
                difficulty: check.difficultyLabel,
                outcome: check.outcome,
                outcomeLabel: outcomeText(check.outcome.rawValue),
                math: check.math
            )
        }

        // Spec §19.1 tier 2 — a hero frame for a beat that earned one.
        if let hero = model.heroImageUrl {
            SessionHeroFrame(uri: hero) { model.fullScreenImage = hero }
        }

        // Spec §19.7 — the face, edge to edge, the way a scene would cut to it.
        if let reaction = pending?.reaction, let url = reaction.url {
            Button {
                model.fullScreenImage = url
            } label: {
                RemoteImage(url.assetURL)
                    .aspectRatio(3 / 4, contentMode: .fit)
                    .frame(maxWidth: .infinity)
                    .clipped()
            }
            .buttonStyle(PressOpacityStyle(pressed: 0.9))
            .padding(.horizontal, -Theme.gutter)
            .accessibilityLabel(t("session.reaction_image_a11y", ["name": reaction.name, "emotion": reaction.emotion]))
        }

        ForEach(Array(model.visibleBlocks.enumerated()), id: \.offset) { _, block in
            SessionBlock(block: block, scene: model.scene)
        }

        // Sentences as they are written. Replaced by the committed blocks the
        // moment the turn lands — the same words, ten seconds early.
        if let pending, pending.blocks.isEmpty, !pending.streamed.isEmpty {
            ForEach(Array(pending.streamed.enumerated()), id: \.offset) { _, sentence in
                NarrationBlock(text: sentence, t: t)
            }
        }

        if let pending, pending.blocks.isEmpty, pending.streamed.isEmpty {
            HStack(spacing: Theme.Spacing.sm) {
                ProgressView().tint(Theme.Colors.textMuted).controlSize(.small)
                // Spec §25.12 — an honest state, not theatrical loading copy.
                Txt(t("session.resolving"), .caption, color: Theme.Colors.textMuted)
            }
        }

        StateDeltaRow(deltas: model.visibleDeltas)
    }

    // MARK: Error

    @ViewBuilder private var errorCard: some View {
        if let error = model.error {
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                Txt(error.message, .bodyCompact)
                if error.retry {
                    PBButton(t("session.try_again"), variant: .secondary, full: false) {
                        Task { await model.send() }
                    }
                }
            }
            .padding(Theme.Spacing.lg)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .strokeBorder(Theme.Colors.warning, lineWidth: 0.5)
            }
        }
    }
}

// MARK: - Block

struct SessionBlock: View {
    let block: NarrativeBlock
    let scene: SessionSceneState?
    @Environment(\.translator) private var t

    var body: some View {
        switch block.type {
        case .DIALOGUE:
            // Resolved against the whole cast, not who is in the room now: the
            // feed is history, and walking out of a room must not strip the
            // name and face off every line already on screen.
            let castMember = scene?.cast.first { $0.id == block.speakerId }
            let present = scene?.presentCharacters.first { $0.id == block.speakerId }
            let name = castMember?.name ?? present?.name
            let portrait = castMember?.portrait ?? present?.portrait
            DialogueBlock(
                speaker: block.speakerId == "player" ? t("session.you") : (name ?? block.speakerId ?? t("session.someone")),
                text: block.text,
                portraitUri: portrait,
                voiceEligible: block.voiceEligible ?? false
            )
        case .SYSTEM:
            Txt(block.text, .caption, color: Theme.Colors.textMuted)
        case .NARRATION:
            NarrationBlock(text: block.text, t: t)
        }
    }
}

// MARK: - Hero frame

/// A beat's hero frame. Rendered inline with its turn, so it stays in the feed.
struct SessionHeroFrame: View {
    let uri: String
    let onPress: () -> Void
    @Environment(\.translator) private var t

    var body: some View {
        Button(action: onPress) {
            RemoteImage(uri.assetURL) { Theme.Colors.bgElevated }
                .aspectRatio(3 / 2, contentMode: .fit)
                .frame(maxWidth: .infinity)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
        }
        .buttonStyle(PressOpacityStyle(pressed: 0.9))
        .accessibilityLabel(t("session.scene_image_a11y"))
    }
}

// MARK: - Player action

struct SessionPlayerAction: View {
    let text: String
    @Environment(\.translator) private var t

    var body: some View {
        HStack {
            Spacer(minLength: 0)
            Txt(text, .bodyCompact, color: Theme.Colors.textSecondary)
                .padding(.horizontal, Theme.Spacing.lg)
                .padding(.vertical, Theme.Spacing.md)
                .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                .containerRelativeFrame(.horizontal, alignment: .trailing) { width, _ in width * 0.85 }
                .fixedSize(horizontal: true, vertical: false)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(t("session.player_action_a11y", ["text": text]))
    }
}
