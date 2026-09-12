import SwiftUI

// MARK: - Onboarding
//
// Screens OB-01 to OB-04, twins of `apps/mobile/src/screens/Onboarding.tsx`.
//
// Spec §6.1 — the player reaches their first meaningful choice within 60
// seconds, and there is no account wall in front of it.
//
// These are shown by `RootView` before the `Router` exists, so nothing here
// may read `Router` from the environment: `AppStore` and `\.translator` only.

// MARK: Legal links

/// The privacy policy and terms live wherever they are published, which is not
/// something the app gets to invent. Nil hides the links rather than pointing
/// them at nothing — a dead link on the age gate is the first thing App Store
/// review taps.
private enum Legal {
    static var configured: Bool { AppConfig.legalBaseURL != nil }

    static func url(_ page: String) -> URL? {
        guard let base = AppConfig.legalBaseURL else { return nil }
        // A URL, not copy — the localized page is chosen by the site.
        var text = base.absoluteString
        while text.hasSuffix("/") { text.removeLast() }
        return URL(string: "\(text)/\(page)")
    }
}

// MARK: - OB-01 Splash

/// No fake delay; the wordmark shows only for as long as boot takes.
struct SplashScreen: View {
    @Environment(\.translator) private var t
    @State private var visible = false
    @State private var showProgress = false

    var body: some View {
        Screen {
            VStack(spacing: Theme.Spacing.md) {
                // The wordmark. PLOTBREAK is the product's name, not a word.
                Text("PLOTBREAK")
                    .font(Theme.TypeStyle.display.font())
                    .kerning(6)
                    .foregroundStyle(Theme.Colors.textPrimary)
                if showProgress {
                    Txt(t("onboarding.loading"), .caption, color: Theme.Colors.textMuted)
                }
            }
            .opacity(visible ? 1 : 0)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .onAppear {
            withAnimation(.easeOut(duration: 0.26)) { visible = true }
        }
        .task {
            // Spec §6.2 — a progress indicator appears only if boot exceeds 800ms.
            try? await Task.sleep(nanoseconds: 800_000_000)
            showProgress = true
        }
    }
}

// MARK: - OB-02 Age gate

/// Shown once, before any personalized content.
struct AgeGateScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    @Environment(\.openURL) private var openURL
    @State private var band: String?
    @State private var confirming = false

    private var bands: [(id: String, label: String)] {
        [
            ("under13", t("onboarding.age_band_under_13")),
            ("13_17", t("onboarding.age_band_13_17")),
            ("18_24", t("onboarding.age_band_18_24")),
            ("25plus", t("onboarding.age_band_25_plus")),
        ]
    }

    private var tooYoung: Bool { band == "under13" }

    var body: some View {
        Screen {
            VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                Spacer(minLength: 0)

                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    Txt(t("onboarding.age_gate_title"), .display)
                    Txt(t("onboarding.age_gate_body"), .body, color: Theme.Colors.textSecondary)
                }

                VStack(spacing: Theme.Spacing.md) {
                    ForEach(bands, id: \.id) { option in
                        BandOption(label: option.label, selected: band == option.id) {
                            band = option.id
                        }
                    }
                }

                if tooYoung {
                    Txt(t("onboarding.age_too_young"), .bodyCompact, color: Theme.Colors.warning)
                }

                VStack(spacing: Theme.Spacing.md) {
                    PBButton(t("onboarding.continue"), loading: confirming, disabled: band == nil || tooYoung) {
                        guard let band else { return }
                        confirming = true
                        Task {
                            await store.confirmAge(band: band)
                            confirming = false
                        }
                    }
                    // Only shown once they point somewhere.
                    if Legal.configured {
                        HStack(spacing: Theme.Spacing.lg) {
                            legalLink(t("onboarding.privacy"), page: "privacy")
                            legalLink(t("onboarding.terms"), page: "terms")
                        }
                        .frame(maxWidth: .infinity)
                    }
                }

                Spacer(minLength: 0)
            }
            .padding(Theme.gutter)
        }
    }

    private func legalLink(_ label: String, page: String) -> some View {
        Button {
            if let url = Legal.url(page) { openURL(url) }
        } label: {
            Txt(label, .caption, color: Theme.Colors.textMuted)
        }
        .buttonStyle(PressOpacityStyle())
    }
}

/// A full-width, taller `Chip`: the RN screen restyles the chip with vertical
/// padding and a centred label, which the Swift `Chip` does not expose.
private struct BandOption: View {
    let label: String
    let selected: Bool
    let action: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            Text(label)
                .font(Theme.TypeStyle.caption.font())
                .lineLimit(1)
                .foregroundStyle(selected ? Theme.Colors.textOnAccent : Theme.Colors.textSecondary)
                .padding(.horizontal, Theme.Spacing.md)
                .padding(.vertical, Theme.Spacing.lg)
                .frame(maxWidth: .infinity)
                .background(selected ? Theme.Colors.accentPrimary : Theme.Colors.bgRaised, in: Capsule())
                .overlay { Capsule().strokeBorder(selected ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: 0.5) }
                .contentShape(Capsule())
        }
        .buttonStyle(PressOpacityStyle(pressed: 0.7))
        .accessibilityLabel(label)
        .accessibilityAddTraits(selected ? .isSelected : [])
    }
}

// MARK: - OB-03 Taste

/// Optional, skippable, one screen. Must not delay play (§6.2).
struct TasteScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    let onDone: () -> Void
    /// Preselected genres. Onboarding starts empty; Personalization does not.
    var initial: [String] = []
    var heading: String? = nil
    var ctaLabel: String? = nil

    @State private var picked: [String]
    @State private var refreshed = false

    init(onDone: @escaping () -> Void, initial: [String] = [], heading: String? = nil, ctaLabel: String? = nil) {
        self.onDone = onDone
        self.initial = initial
        self.heading = heading
        self.ctaLabel = ctaLabel
        _picked = State(initialValue: initial)
    }

    // From the catalogue, not from a hand-written list. The label is the
    // *value* here — `picked` holds labels and `setTastes` sends them — so the
    // English word survives even when a French word is on the chip.
    private var genres: [Genre] { store.bootstrap?.genres ?? [] }

    var body: some View {
        Screen {
            GeometryReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        Txt(heading ?? t("onboarding.taste_title"), .display)
                        Txt(t("onboarding.taste_body"), .body, color: Theme.Colors.textSecondary)
                    }
                    .padding(.top, Theme.Spacing.xxxl)

                    // Chip-shaped placeholders while the catalogue is still
                    // coming. An empty space under a heading that says "pick
                    // anything you'd actually play" reads as broken.
                    FlowLayout(spacing: Theme.Spacing.md) {
                        if genres.isEmpty {
                            ForEach(Array([96, 120, 104, 88, 112, 92].enumerated()), id: \.offset) { _, width in
                                Skeleton(width: CGFloat(width), height: 44, radius: Theme.Radius.pill)
                            }
                        } else {
                            ForEach(genres) { genre in
                                Chip(t.category(genre.id, fallback: genre.label), selected: picked.contains(genre.label)) {
                                    toggle(genre.label)
                                }
                            }
                        }
                    }

                    Spacer(minLength: Theme.Spacing.xxl)

                    VStack(spacing: Theme.Spacing.md) {
                        PBButton(ctaLabel ?? t("onboarding.continue")) { finish(picked) }
                        // Skipping is an onboarding idea. Reached from
                        // Personalization, the way out is the back arrow.
                        if ctaLabel == nil {
                            PBButton(t("onboarding.skip"), variant: .tertiary) { finish([]) }
                        }
                    }
                }
                .padding(Theme.gutter)
                .frame(maxWidth: .infinity, minHeight: proxy.size.height, alignment: .topLeading)
            }
            }
        }
        .task {
            // Fetch them again if boot did not get them. Once — a retry loop on
            // an empty catalogue would hammer the API.
            guard genres.isEmpty, !refreshed else { return }
            refreshed = true
            await store.refreshBootstrap()
        }
    }

    private func toggle(_ genre: String) {
        if let index = picked.firstIndex(of: genre) {
            picked.remove(at: index)
        } else if picked.count < 5 {
            // Spec §6.2 — select 0 to 5.
            picked.append(genre)
        }
    }

    private func finish(_ tastes: [String]) {
        store.setTastes(tastes)
        onDone()
    }
}

// MARK: - OB-04 Showcase

/// Five worlds, and a way in. The picks are pinned rather than computed: this
/// is a shop window and somebody should choose what is in it.
private let showcaseStoryIds = [
    "story_itachi",
    "story_second_skin",
    "story_good_morning_husband",
    "story_hush_house",
    "story_zero_throne",
]

struct ShowcaseScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    let onSeeAll: () -> Void
    let onOpen: (String) -> Void

    @State private var stories: [StorySummary] = []

    var body: some View {
        Screen {
            GeometryReader { proxy in
                // A card wide enough that the next one peeks in at the edge,
                // which is what says "these swipe" without a hint or dots.
                let cardWidth = min(proxy.size.width * 0.62, 260)

                VStack(alignment: .leading, spacing: 0) {
                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        Txt(t("onboarding.showcase_title"), .display)
                        Txt(t("onboarding.showcase_body"), .body, color: Theme.Colors.textSecondary)
                    }
                    .padding(.horizontal, Theme.gutter)
                    .padding(.top, Theme.Spacing.xxxl)

                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(alignment: .top, spacing: Theme.Spacing.md) {
                            ForEach(stories) { story in
                                Button {
                                    Haptic.play(.light)
                                    onOpen(story.storyId)
                                } label: {
                                    VStack(alignment: .leading, spacing: 2) {
                                        StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                                            .frame(width: cardWidth, height: cardWidth * 1.5)
                                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                                            .padding(.bottom, Theme.Spacing.md)
                                        Txt(story.title, .h3, lineLimit: 2)
                                        // i18n-exempt: the studio name; a brand is the same word in every language
                                        Txt("Plotbreak", .caption, color: Theme.Colors.textMuted)
                                    }
                                    .frame(width: cardWidth, alignment: .leading)
                                    .contentShape(Rectangle())
                                }
                                .buttonStyle(PressOpacityStyle(pressed: 0.85))
                                .accessibilityLabel(t("onboarding.showcase_card_a11y", ["title": story.title]))
                            }
                        }
                        .padding(.horizontal, Theme.gutter)
                        .scrollTargetLayout()
                    }
                    .scrollTargetBehavior(.viewAligned)
                    .frame(maxHeight: .infinity)

                    PBButton(t("onboarding.see_all_stories"), variant: .secondary, action: onSeeAll)
                        .padding(.horizontal, Theme.gutter)
                        .padding(.bottom, Theme.Spacing.lg)
                }
            }
        }
        .task { await load() }
    }

    private func load() async {
        guard let data = try? await store.api.discover() else { return }
        var all: [String: StorySummary] = [:]
        for story in data.rails.flatMap(\.stories) where all[story.storyId] == nil {
            all[story.storyId] = story
        }
        // Pinned order, and anything missing is skipped rather than leaving a
        // hole — a world can be pulled from the catalogue without breaking this.
        stories = showcaseStoryIds.compactMap { all[$0] }
    }
}
