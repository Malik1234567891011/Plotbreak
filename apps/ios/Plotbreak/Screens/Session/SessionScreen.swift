import SwiftUI

// MARK: - SessionScreen (GP-01)
//
// Screen 08 of the redesign. Spec §10.1 is the non-negotiable: this must not
// look like a black chat thread or an ebook. Top to bottom it is the header
// with the quality pill, the story on a faint wash of the stage art, the
// round action buttons, and the composer (§10.2).
// Twin of `apps/mobile/src/screens/Session.tsx`.

struct SessionScreen: View {
    let sessionId: String
    @State private var model: SessionModel
    @State private var showSuggestions = false
    /// The tier's promise, shown under the pill for a few seconds on entry.
    @State private var showTierHint = false
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    init(sessionId: String) {
        self.sessionId = sessionId
        _model = State(initialValue: SessionModel(sessionId: sessionId))
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                header
                if let scene = model.scene {
                    SessionContextStrip(scene: scene)
                }
                SessionFeed(model: model)
                SessionComposer(
                    model: model,
                    onSuggestions: { showSuggestions = true },
                    onScrollToLatest: { model.scrollToLatest() }
                )
            }
            .overlay(alignment: .top) { tierHint }
            .overlay { overlays }
        }
        .task {
            model.attach(store: store, router: router)
            await model.start()
        }
        .task {
            // A hint, not a tutorial: it says what the tier buys, then goes.
            showTierHint = true
            try? await Task.sleep(nanoseconds: 4_000_000_000)
            withAnimation(.easeOut(duration: Theme.Durations.short)) { showTierHint = false }
        }
        .onAppear {
            // The portrait sheet lives elsewhere; pick up a drawing made there.
            Task { await model.refreshPlayerPortrait() }
        }
        .onChange(of: router.sheet == nil) { _, closed in
            if closed { Task { await model.refreshPlayerPortrait() } }
        }
        .onDisappear { model.stopStreaming() }
        .animation(.easeOut(duration: Theme.Durations.short), value: model.showTurnMenu)
        .animation(.easeOut(duration: Theme.Durations.short), value: model.showQuality)
        .animation(.easeOut(duration: Theme.Durations.short), value: model.fullScreenImage)
        .animation(.easeOut(duration: Theme.Durations.short), value: showSuggestions)
    }

    // MARK: A. Session header — 56pt plus safe area (§10.2 A)

    /// "Zero Throne · Concord…" on one line, the quality pill, the world sheet.
    private var headerTitle: String {
        let title = model.detail?.session.title ?? ""
        guard let scene = model.scene, !scene.locationName.isEmpty else { return title }
        return title.isEmpty ? scene.locationName : "\(title) · \(scene.locationName)"
    }

    private var header: some View {
        HStack(spacing: Theme.Spacing.sm) {
            IconButton(t("session.back_to_library"), action: { router.exitSession() }) {
                Image(systemName: "chevron.left")
                    .font(.system(size: 22, weight: .medium))
                    .foregroundStyle(Theme.Colors.textPrimary)
            }
            Text(headerTitle)
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .lineLimit(1)
                .truncationMode(.tail)
                .frame(maxWidth: .infinity, alignment: .leading)
                .accessibilityAddTraits(.isHeader)

            Button {
                Haptic.play(.light)
                showTierHint = false
                model.showQuality = true
            } label: {
                HStack(spacing: 7) {
                    ZStack {
                        Circle().strokeBorder(Theme.Colors.accentPrimary, lineWidth: 1.6)
                        Circle().fill(Theme.Colors.accentPrimary).frame(width: 5.5, height: 5.5)
                    }
                    .frame(width: 17, height: 17)
                    Text(t(TierCopy.labelKey(model.tier.id)))
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Image(systemName: "chevron.down")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                }
                .padding(.horizontal, 13)
                .padding(.vertical, 9)
                .background(Theme.Colors.surfaceButton, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(t("session.turn_quality"))
            .accessibilityValue(t(TierCopy.labelKey(model.tier.id)))

            IconButton(t("session.open_world_sheet"), action: { router.present(.worldSheet(sessionId: sessionId, tab: nil)) }) {
                Image(systemName: "line.3.horizontal")
                    .font(.system(size: 22, weight: .medium))
                    .foregroundStyle(Theme.Colors.textPrimary)
            }
        }
        .padding(.leading, Theme.Spacing.sm)
        .padding(.trailing, Theme.Spacing.xs)
        .frame(height: 56)
    }

    @ViewBuilder private var tierHint: some View {
        if showTierHint {
            HStack {
                Spacer(minLength: 0)
                TooltipBubble(text: t(TierCopy.promiseKey(model.tier.id)), tail: .up)
                    .padding(.trailing, 60)
            }
            .padding(.top, 58)
            .transition(.opacity)
            .allowsHitTesting(false)
            .accessibilityHidden(true)
        }
    }

    // MARK: Overlays — image viewer, turn menu, quality sheet, suggestions

    @ViewBuilder private var overlays: some View {
        if let image = model.fullScreenImage {
            SessionImageViewer(uri: image) { model.fullScreenImage = nil }
        }

        if model.showTurnMenu, let latest = model.latest, let action = latest.actionText, !action.isEmpty {
            SessionTurnMenu(
                actionText: action,
                turnCost: model.tier.costCredits,
                rephrasing: model.rephrasing,
                onRetry: { model.retryLatest() },
                onRephrase: { Task { await model.rephrase(latest.turnId) } },
                onEdit: { model.editLatest() },
                onReport: { model.reportLatest() },
                onShare: { model.shareLatest() },
                onClose: { model.showTurnMenu = false }
            )
        }

        if model.showQuality {
            SessionQualitySheet(
                tiers: TierCopy.tiers(store.bootstrap),
                current: store.qualityTier,
                balance: store.balance,
                onSelect: { model.selectTier($0) },
                onClose: { model.showQuality = false }
            )
        }

        if showSuggestions {
            SessionSuggestionsSheet(
                suggestions: model.suggestions,
                onChoose: { item in
                    showSuggestions = false
                    model.choose(item)
                },
                onEdit: { item in
                    showSuggestions = false
                    model.edit(item)
                },
                onClose: { showSuggestions = false }
            )
        }
    }
}
