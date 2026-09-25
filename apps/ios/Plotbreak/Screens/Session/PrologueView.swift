import SwiftUI

// MARK: - PrologueView
//
// The first fifteen seconds.
//
// The old shape was: tap a story, fill in a form, and land on a wall of prose.
// A player who just thought "I can play an anime" was reading a chatbot before
// anything had happened to them. This is three frames of one night instead —
// wide, closer, and then somebody looking back — and then the composer.
//
// Rules it is built to:
//
// - **Three panels, not six.** Onboarding earns attention only while it is
//   moving somebody toward acting. A fourth panel is a delay, and the schema
//   caps it at four for that reason.
// - **The pictures are the narration.** Two short lines a panel, so the beat
//   underneath can be four lines and a question rather than 250 words of
//   scene-setting.
// - **Never a wall.** Skip is visible from the first frame and the whole thing
//   is one scroll. Nobody is held here.
// - **Once.** Seen is remembered per session, so backgrounding the app or
//   coming back tomorrow does not replay the title sequence.

struct PrologueView: View {
    let panels: [ProloguePanelView]
    let storyTitle: String
    /// Called when the player reaches the end or skips. `completed` is false
    /// when they skipped, which is the more interesting number of the two.
    let onFinish: (_ completed: Bool) -> Void

    @Environment(\.translator) private var t
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    /// Which panel is filling the screen, for the dots and for telemetry.
    @State private var current = 0
    /// Panels already reported, so scrolling back and forth does not inflate
    /// the per-panel counts.
    @State private var reported: Set<Int> = []
    @State private var appeared = false

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .top) {
                Theme.Colors.bgBase

                ScrollView(.vertical, showsIndicators: false) {
                    LazyVStack(spacing: 0) {
                        ForEach(Array(panels.enumerated()), id: \.offset) { index, panel in
                            panelView(panel, index: index, size: geo.size)
                                .frame(width: geo.size.width, height: geo.size.height)
                                .onAppear { reach(index) }
                        }

                        // The handoff. A last short screen so the cinematic ends
                        // on a deliberate tap rather than dumping the player into
                        // the composer mid-scroll.
                        endCard
                            .frame(width: geo.size.width, height: geo.size.height)
                            .onAppear { reach(panels.count) }
                    }
                    // Per-item snapping. Without this the paging behaviour
                    // measures the container rather than the panels and every
                    // frame rests a sliver short, showing the top of the next
                    // one under the caption.
                    .scrollTargetLayout()
                }
                .scrollTargetBehavior(.paging)

                header
            }
        }
        // On the reader, so `geo.size` is the whole screen. Measured inside the
        // safe area instead, every panel is shorter than the page it is snapped
        // to and the next one peeks out from under the caption.
        .ignoresSafeArea()
        .onAppear {
            guard !appeared else { return }
            appeared = true
            Telemetry.track(.prologueShown, [
                "storyTitle": storyTitle,
                "panelCount": panels.count,
            ])
        }
    }

    // MARK: Pieces

    private var header: some View {
        HStack(spacing: Theme.Spacing.sm) {
            // Progress, so the player can see it is three and not thirty.
            HStack(spacing: 5) {
                ForEach(panels.indices, id: \.self) { i in
                    Capsule()
                        .fill(i <= current ? Color.white : Color.white.opacity(0.3))
                        .frame(width: i == current ? 18 : 6, height: 4)
                        .animation(reduceMotion ? nil : .easeOut(duration: 0.2), value: current)
                }
            }
            Spacer(minLength: 0)
            Button {
                finish(completed: false)
            } label: {
                Txt(t("prologue.skip"), .bodyCompact, color: .white)
                    .padding(.horizontal, Theme.Spacing.md)
                    .frame(minHeight: 34)
                    // A dark pill, because this sits over whatever the frame
                    // happens to be and a moonlit sky is not a background you
                    // can put white text on and hope.
                    .background(.black.opacity(0.45), in: Capsule())
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(t("prologue.skip_a11y"))
        }
        .padding(.horizontal, Theme.pageGutter)
        // Clear of the status bar, since the reader now ignores safe areas.
        .padding(.top, 60)
    }

    private func panelView(_ panel: ProloguePanelView, index: Int, size: CGSize) -> some View {
        ZStack(alignment: .bottomLeading) {
            RemoteImage(panel.imageUrl?.assetURL)
                .frame(width: size.width, height: size.height)
                .clipped()
                .accessibilityLabel(panel.alt)

            // A scrim under the text only. The picture is doing the work and a
            // full overlay would flatten it.
            LinearGradient(
                colors: [.clear, .black.opacity(0.55), .black.opacity(0.85)],
                startPoint: .center,
                endPoint: .bottom
            )
            .frame(height: size.height * 0.55)
            .frame(maxHeight: .infinity, alignment: .bottom)
            .allowsHitTesting(false)

            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                Text(panel.headline)
                    .font(.system(size: 28, weight: .semibold))
                    .foregroundStyle(.white)
                if !panel.subline.isEmpty {
                    Text(panel.subline)
                        .font(.system(size: 17))
                        .foregroundStyle(.white.opacity(0.75))
                }
            }
            .padding(.horizontal, Theme.pageGutter)
            .padding(.bottom, size.height * 0.16)
            .accessibilityElement(children: .combine)
        }
    }

    /// The end of the cinematic and the start of the game, on one screen.
    private var endCard: some View {
        VStack(spacing: Theme.Spacing.lg) {
            Spacer()
            Txt(t("prologue.ready"), .display, center: true)
            Txt(t("prologue.ready_sub"), .bodyCompact, color: Theme.Colors.textSecondary, center: true)
            Spacer()
            PBButton(t("prologue.begin"), variant: .light, haptic: .medium) {
                finish(completed: true)
            }
            .padding(.bottom, Theme.Spacing.xxl)
        }
        .padding(.horizontal, Theme.pageGutter)
    }

    // MARK: Telemetry

    /// One event per panel actually seen, once each.
    private func reach(_ index: Int) {
        current = min(index, max(0, panels.count - 1))
        guard index < panels.count, !reported.contains(index) else { return }
        reported.insert(index)
        Telemetry.track(.prologuePanelViewed, [
            "storyTitle": storyTitle,
            "panelIndex": index,
        ])
    }

    private func finish(completed: Bool) {
        Telemetry.track(.prologueFinished, [
            "storyTitle": storyTitle,
            "completed": completed,
            // How far they actually got, which is the number that says whether
            // three was the right answer or whether two would have been.
            "panelsSeen": reported.count,
            "panelCount": panels.count,
        ])
        Haptic.play(.light)
        onFinish(completed)
    }
}

// MARK: - SessionPrologueSeen
//
// Which runs have already played their opening.
//
// Per session and per device, in UserDefaults. It has to survive the app being
// backgrounded and relaunched — a title sequence that replays every time you
// reopen the app is worse than never having one — and it does not need to
// survive a reinstall, where replaying it is harmless.
enum SessionPrologueSeen {
    private static let key = "plotbreak.prologueSeen"
    private static let limit = 50

    static func wasSeen(_ sessionId: String) -> Bool {
        seen().contains(sessionId)
    }

    static func markSeen(_ sessionId: String) {
        var ids = seen().filter { $0 != sessionId }
        ids.append(sessionId)
        // Trimmed, because this is a convenience and not a record: the oldest
        // runs falling off means at worst somebody sees an opening twice.
        UserDefaults.standard.set(Array(ids.suffix(limit)), forKey: key)
    }

    private static func seen() -> [String] {
        UserDefaults.standard.stringArray(forKey: key) ?? []
    }
}
