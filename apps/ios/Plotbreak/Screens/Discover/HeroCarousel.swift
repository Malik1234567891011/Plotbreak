import SwiftUI

// MARK: - HeroCarousel
//
// Twin of `apps/mobile/src/components/HeroCarousel.tsx`.
//
// Six worlds, one at a time, the story as the hero: the cover at its authored
// portrait aspect, large enough to be the only thing on screen, with a heavily
// blurred copy of the same art behind it bleeding to the edges.
//
// Rotation: advances every six seconds, and stops the moment the player
// touches it — permanently, for that session. It also stops when the app is
// not in the foreground. Reduce Motion is honoured by not moving: no
// auto-advance and no crossfade.

private let rotateSeconds: Double = 6

struct HeroCarousel: View {
    let stories: [StorySummary]
    let onOpen: (String) -> Void
    /// How far the blurred art reaches **above** this component, in points.
    /// Discover passes the header's height plus the safe-area inset, and
    /// floats the header on top of the result.
    var backdropExtendTop: CGFloat = 0

    @Environment(\.translator) private var t
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.scenePhase) private var scenePhase

    @State private var position: String?
    @State private var index = 0
    @State private var driving = false
    /// The id the timer scrolled to; a position that lands anywhere else was
    /// the player's doing, and hands the carousel over for good.
    @State private var autoTarget: String?

    var body: some View {
        if stories.isEmpty {
            EmptyView()
        } else {
            GeometryReader { proxy in
                let width = proxy.size.width
                // The card carries the screen, so it is sized against the
                // screen rather than against a fixed ceiling.
                let cardWidth = min(width * 0.64, 300)
                let current = stories[min(index, stories.count - 1)]

                ZStack(alignment: .topTrailing) {
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 0) {
                            ForEach(stories) { story in
                                Button {
                                    Haptic.play(.light)
                                    onOpen(story.storyId)
                                } label: {
                                    VStack(spacing: 0) {
                                        StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                                            .frame(width: cardWidth, height: cardWidth * 1.5)
                                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                                        VStack(spacing: 2) {
                                            Txt(story.title, .display, center: true, lineLimit: 2)
                                            Txt(story.fantasyLabel, .caption, color: Theme.Colors.textSecondary, center: true, lineLimit: 1)
                                        }
                                        .padding(.horizontal, Theme.gutter)
                                        .padding(.top, Theme.Spacing.md)
                                    }
                                    .padding(.top, Theme.Spacing.lg)
                                    .frame(width: width, alignment: .top)
                                    .contentShape(Rectangle())
                                }
                                .buttonStyle(PressOpacityStyle(pressed: 0.9))
                                .accessibilityLabel(t("discover.hero_a11y", ["title": story.title, "fantasy": story.fantasyLabel]))
                                .id(story.storyId)
                            }
                        }
                        .scrollTargetLayout()
                    }
                    .scrollTargetBehavior(.paging)
                    .scrollPosition(id: $position)

                    // 1/6, top right, the way a gallery counts. Six dots at
                    // this size read as decoration; a fraction reads as
                    // information. Two numerals and a slash — not copy.
                    if stories.count > 1 {
                        Text("\(index + 1)/\(stories.count)")
                            .font(Theme.TypeStyle.micro.font())
                            .foregroundStyle(Theme.Colors.textSecondary)
                            .padding(.horizontal, Theme.Spacing.sm)
                            .padding(.vertical, 2)
                            .background(Theme.Colors.bgBase.opacity(0.6), in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                            .padding(.top, Theme.Spacing.md)
                            .padding(.trailing, Theme.gutter)
                    }
                }
                .background(alignment: .top) {
                    // Crossfade the backdrop rather than cutting it, so the
                    // colour behind the page moves with the art instead of
                    // snapping.
                    ZStack {
                        if let cover = current.coverImage {
                            Backdrop(uri: cover)
                                .id(current.storyId)
                                .transition(reduceMotion ? .identity : .opacity)
                        }
                    }
                    .animation(reduceMotion ? nil : .easeOut(duration: 0.42), value: current.storyId)
                    .frame(width: width, height: proxy.size.height + backdropExtendTop)
                    .offset(y: -backdropExtendTop)
                    .allowsHitTesting(false)
                }
            }
            .frame(height: height)
            .padding(.bottom, Theme.Spacing.lg)
            .onAppear {
                if position == nil { position = stories.first?.storyId }
            }
            .onChange(of: position) { _, newValue in
                guard let newValue, let next = stories.firstIndex(where: { $0.storyId == newValue }) else { return }
                if newValue != autoTarget {
                    // Any touch hands the carousel over for good.
                    driving = true
                }
                index = next
            }
            .task(id: rotationKey) {
                guard !driving, !reduceMotion, stories.count >= 2, scenePhase == .active else { return }
                while !Task.isCancelled {
                    try? await Task.sleep(nanoseconds: UInt64(rotateSeconds * 1_000_000_000))
                    guard !Task.isCancelled else { return }
                    let next = (index + 1) % stories.count
                    let target = stories[next].storyId
                    autoTarget = target
                    withAnimation(.easeInOut(duration: Theme.Durations.sheet)) { position = target }
                }
            }
        }
    }

    /// Tall enough to be the screen, short enough that the category pills and
    /// the first row of covers stay reachable without a deliberate scroll.
    private var height: CGFloat {
        let bounds = UIScreen.main.bounds
        let cardWidth = min(bounds.width * 0.64, 300)
        return min(cardWidth * 1.5 + 132, bounds.height * 0.58)
    }

    /// Restarts the rotation task when anything that gates it changes.
    private var rotationKey: String {
        "\(driving)-\(reduceMotion)-\(stories.count)-\(scenePhase == .active)"
    }
}

/// The blurred cover, dimmed but not to black, and faded out at the bottom so
/// the art ends by becoming the page instead of stopping at a line.
private struct Backdrop: View {
    let uri: String

    var body: some View {
        ZStack(alignment: .bottom) {
            RemoteImage(uri.assetURL) { Theme.Colors.bgBase }
                .blur(radius: 40)
                .clipped()
            Theme.Colors.bgBase.opacity(0.58)
            VStack(spacing: 0) {
                Spacer(minLength: 0)
                Theme.Colors.bgBase.opacity(0.35).frame(height: 40)
                Theme.Colors.bgBase.opacity(0.55).frame(height: 32)
                Theme.Colors.bgBase.frame(height: 24)
            }
        }
        .clipped()
    }
}
