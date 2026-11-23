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
    /// The tier's promise, shown under the pill for a few seconds on entry.
    @State private var showTierHint = false
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    /// Set the moment the cinematic finishes, so the session appears without
    /// waiting on a round trip.
    @State private var prologueDone = false

    init(sessionId: String) {
        self.sessionId = sessionId
        _model = State(initialValue: SessionModel(sessionId: sessionId))
    }

    /// The run has not answered yet, and has not failed either: a failure
    /// shows in the feed, with its retry.
    private var loading: Bool { model.detail == nil && model.error == nil }

    /// Whether to play the opening cinematic over the session.
    ///
    /// The server only sends panels for a run nobody has played yet, and
    /// `prologueSeen` remembers this session on this device — so it plays once,
    /// for a new run, on a story that has one, and never for the twenty-five
    /// that do not. Somebody forty turns deep reopening the app gets their
    /// story, not a title sequence.
    private var prologue: [ProloguePanelView] {
        guard !prologueDone, let detail = model.detail else { return [] }
        guard !SessionPrologueSeen.wasSeen(sessionId) else { return [] }
        return detail.prologue
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                if loading {
                    loadingHeader
                    SessionLoading()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    header
                    if let scene = model.scene {
                        SessionContextStrip(scene: scene)
                    }
                    SessionFeed(model: model)
                }
                SessionComposer(model: model)
            }
            .overlay(alignment: .bottom) { tierHint }
            .overlay { overlays }
            // Over the whole session, not instead of it: the feed is already
            // loaded and waiting underneath, so `Begin` is instant.
            .overlay {
                if !prologue.isEmpty {
                    PrologueView(
                        panels: prologue,
                        storyTitle: model.detail?.session.title ?? ""
                    ) { _ in
                        SessionPrologueSeen.markSeen(sessionId)
                        withAnimation(.easeOut(duration: Theme.Durations.short)) {
                            prologueDone = true
                        }
                    }
                    .transition(.opacity)
                }
            }
            .overlay {
                if let drop = model.relicQueue.first {
                    RelicRevealView(
                        drop: drop,
                        onDone: {
                            Telemetry.track(.relicRevealClosed, ["relicId": drop.relicId, "rarity": drop.rarity, "action": "keep_playing"])
                            withAnimation(.easeOut(duration: 0.25)) { model.dismissRelic() }
                        },
                        onOpenVault: {
                            Telemetry.track(.relicRevealClosed, ["relicId": drop.relicId, "rarity": drop.rarity, "action": "open_vault"])
                            model.dismissRelic(askNow: false)
                            router.present(.relics(source: "reveal"))
                        }
                    )
                    .id(drop.id)
                    .transition(.opacity)
                }
            }
            .animation(.easeOut(duration: 0.25), value: model.relicQueue.first?.id)
        }
        .task {
            model.attach(store: store, router: router)
            await model.start()
        }
        .task(id: loading) {
            // A hint, not a tutorial: it says what the tier buys, then goes.
            // Not over a placeholder: it waits for the real pill.
            guard !loading else { return }
            showTierHint = true
            try? await Task.sleep(nanoseconds: 4_000_000_000)
            withAnimation(.easeOut(duration: Theme.Durations.short)) { showTierHint = false }
        }
        .onAppear {
            // The portrait sheet lives elsewhere; pick up a drawing made there.
            Task { await model.refreshPlayerPortrait() }
        }
        .onChange(of: router.sheet == nil) { _, closed in
            if closed {
                Task { await model.refreshPlayerPortrait() }
                model.resumeDeferredAsk()
            }
        }
        // Our own ask before the system's, once, after the first finished turn.
        // iOS grants one prompt per install and "Not now" here keeps it, so a
        // player who is not interested today can still be asked by the switches
        // in Settings later.
        .alert(t("notifications.ask_title"), isPresented: $model.offerReminders) {
            Button(t("notifications.ask_yes")) {
                ReminderSettings.standard.hasAsked = true
                Task {
                    await Reminders.requestAuthorization()
                    await store.refreshReminders()
                }
            }
            Button(t("notifications.ask_no"), role: .cancel) {
                ReminderSettings.standard.hasAsked = true
            }
        } message: {
            Text(t("notifications.ask_body"))
        }
        .onDisappear {
            model.stopStreaming()
            // §37 — put down, not finished. Paired with `turn_10_reached` from
            // the server, this is where the drop-off curve comes from.
            model.reportAbandoned()
        }
        .animation(.easeOut(duration: Theme.Durations.short), value: model.showTurnMenu)
        .animation(.easeOut(duration: Theme.Durations.short), value: model.showQuality)
        .animation(.easeOut(duration: Theme.Durations.short), value: model.fullScreenImage)
    }

    // MARK: A. Session header — 56pt plus safe area (§10.2 A)

    /// "Zero Throne · Concord…" on one line, the quality pill, the world sheet.
    private var headerTitle: String {
        let title = model.detail?.session.title ?? ""
        guard let scene = model.scene, !scene.locationName.isEmpty else { return title }
        return title.isEmpty ? scene.locationName : "\(title) · \(scene.locationName)"
    }

    private var backButton: some View {
        glassButton("chevron.left", label: t("session.back_to_library")) { router.exitSession() }
    }

    /// Design v3: round glass buttons over the scene.
    private func glassButton(_ symbol: String, label: String, action: @escaping () -> Void) -> some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            Image(systemName: symbol)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .frame(width: 44, height: 44)
                .background(.ultraThinMaterial, in: Circle())
                .background(Theme.Colors.bgBase.opacity(0.35), in: Circle())
                .overlay { Circle().strokeBorder(Theme.Colors.textPrimary.opacity(0.12), lineWidth: 1) }
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(label)
    }

    /// The header's shape while the run loads. Back works; the rest are
    /// placeholders where the title, the quality pill and the menu will land,
    /// so nothing moves when they do.
    private var loadingHeader: some View {
        HStack(spacing: Theme.Spacing.sm) {
            backButton
            Spacer(minLength: 0)
            Skeleton(width: 180, height: 40, radius: 20)
            Spacer(minLength: 0)
            Skeleton(width: 44, height: 44, radius: 22)
        }
        .padding(.horizontal, Theme.Spacing.lg)
        .frame(height: 56)
    }

    /// Design v3 (board frame Play): back and the world sheet as round glass
    /// buttons, the story and the place in one glass capsule between them. The
    /// quality moved down to the line over the composer.
    private var header: some View {
        HStack(spacing: Theme.Spacing.sm) {
            backButton
            Spacer(minLength: 0)
            HStack(spacing: 6) {
                Text(model.detail?.session.title ?? "")
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                if let place = model.scene?.locationName, !place.isEmpty {
                    Text(place)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                }
            }
            .lineLimit(1)
            .padding(.horizontal, 16)
            .frame(height: 40)
            .background(.ultraThinMaterial, in: Capsule())
            .background(Theme.Colors.bgBase.opacity(0.35), in: Capsule())
            .overlay { Capsule().strokeBorder(Theme.Colors.textPrimary.opacity(0.12), lineWidth: 1) }
            .accessibilityElement(children: .combine)
            .accessibilityLabel(headerTitle)
            .accessibilityAddTraits(.isHeader)
            Spacer(minLength: 0)
            glassButton("list.bullet", label: t("session.open_world_sheet")) {
                router.present(.worldSheet(sessionId: sessionId, tab: nil))
            }
        }
        .padding(.horizontal, Theme.Spacing.lg)
        .frame(height: 56)
    }

    @ViewBuilder private var tierHint: some View {
        if showTierHint {
            HStack {
                Spacer(minLength: 0)
                TooltipBubble(text: t(TierCopy.promiseKey(model.tier.id)), tail: .down)
                Spacer(minLength: 0)
            }
            .padding(.horizontal, Theme.pageGutter)
            .padding(.bottom, 92)
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
                sceneArt: model.scene?.stageImage,
                onSelect: { model.selectTier($0) },
                onClose: { model.showQuality = false }
            )
        }

    }
}

// MARK: - Loading

/// While a run opens: a turning arc, and one word under it.
///
/// Turned by a timeline, not a repeating `withAnimation`: that one also
/// animates the first layout pass, and the arc drifts in from the corner.
private struct SessionLoading: View {
    /// Seconds per turn.
    private static let period = 0.9
    @Environment(\.translator) private var t
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        VStack(spacing: Theme.Spacing.md) {
            TimelineView(.animation(paused: reduceMotion)) { context in
                let turn = context.date.timeIntervalSinceReferenceDate
                    .truncatingRemainder(dividingBy: Self.period) / Self.period
                Circle()
                    .trim(from: 0, to: 0.22)
                    .stroke(Theme.Colors.textPrimary, style: StrokeStyle(lineWidth: 1.5, lineCap: .round))
                    .rotationEffect(.degrees(turn * 360 - 90))
            }
            .frame(width: 24, height: 24)
            Txt(t("session.loading"), .bodyCompact)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(t("session.loading"))
    }
}
