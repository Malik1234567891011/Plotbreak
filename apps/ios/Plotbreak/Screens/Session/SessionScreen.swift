import SwiftUI

// MARK: - SessionScreen (GP-01)
//
// The primary gameplay UI. Spec §10.1 is the non-negotiable: this must not
// look like a black chat thread or an ebook. Top to bottom it is the header,
// the context strip, the story feed, and a persistent composer (§10.2).
// Twin of `apps/mobile/src/screens/Session.tsx`.

struct SessionScreen: View {
    let sessionId: String
    @State private var model: SessionModel
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
                SessionComposer(model: model)
            }
            .overlay { overlays }
        }
        .task {
            model.attach(store: store, router: router)
            await model.start()
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
    }

    // MARK: A. Session header — 56pt plus safe area (§10.2 A)

    private var header: some View {
        HStack(spacing: Theme.Spacing.sm) {
            IconButton(t("session.back_to_library"), action: { router.exitSession() }) {
                Txt("‹", .h2)
            }
            VStack(alignment: .leading, spacing: 0) {
                Txt(model.detail?.session.title ?? " ", .bodyStrong, lineLimit: 1)
                if let scene = model.scene {
                    Txt("\(scene.locationName) · \(scene.worldTimeLabel)", .micro, color: Theme.Colors.textMuted, lineLimit: 1)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            CreditBalance(balance: store.balance, locale: store.locale) {
                router.present(.wallet(shortfall: nil))
            }
            IconButton(t("session.open_world_sheet"), action: { router.present(.worldSheet(sessionId: sessionId, tab: nil)) }) {
                Txt("☰", .h3, color: Theme.Colors.textSecondary)
            }
        }
        .padding(.horizontal, Theme.Spacing.sm)
        .frame(height: 56)
    }

    // MARK: Overlays — image viewer, turn menu, quality sheet

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
    }
}
