import SwiftUI

// MARK: - Onboarding
//
// Screens 02–05 of the 2026-09 redesign, plus the splash and the showcase.
// Twins of `apps/mobile/src/screens/Onboarding.tsx`.
//
// Spec §6.1 — the player reaches their first meaningful choice within 60
// seconds. Four steps carry a progress bar: birth date, display name,
// audience and genres, and the showcase that ends it.
//
// These are shown by `RootView` before the `Router` exists, so nothing here
// may read `Router` from the environment: `AppStore` and `\.translator` only.

private let onboardingSteps = 4

// MARK: - OB-01 Splash

/// The same logo, at the same size and place, as the system launch screen
/// (`UILaunchScreen` → `LaunchLogo` on `LaunchBackground`). The system shows
/// that while the process starts; this takes over the instant SwiftUI can
/// draw and holds it until boot finishes. Identical pixels, so the handoff is
/// invisible and the player sees one logo, once, for as long as launch takes.
/// No fade-in, for the same reason.
struct SplashScreen: View {
    @Environment(\.translator) private var t
    @State private var showProgress = false

    var body: some View {
        ZStack {
            Theme.Colors.bgBase.ignoresSafeArea()
            Image("LaunchLogo")
                // i18n-exempt: the product name is the same word in every language
                .accessibilityLabel("Plotbreak")
            if showProgress {
                VStack {
                    Spacer()
                    Txt(t("onboarding.loading"), .caption, color: Theme.Colors.textMuted)
                        .padding(.bottom, Theme.Spacing.giant)
                }
            }
        }
        .task {
            // Spec §6.2 — a progress indicator appears only if boot exceeds 800ms.
            try? await Task.sleep(nanoseconds: 800_000_000)
            showProgress = true
        }
    }
}

// MARK: - 02 / 03 Birth date

/// Step 1 of 4. A date, picked on a wheel in a sheet, decides the age band;
/// the date itself is not kept. Under 13 is told so, warmly, and cannot go on.
struct BirthDateScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    @State private var birthDate: Date?
    @State private var picking = false
    @State private var confirming = false

    private var tooYoung: Bool {
        birthDate.map { AppStore.ageBand(birthDate: $0) == "under13" } ?? false
    }

    var body: some View {
        OnboardingFrame(step: 1, total: onboardingSteps) {
            OnboardingTitle(t("onboarding.birth_date_title"))
                .padding(.bottom, Theme.Spacing.xxxl)

            Button {
                Haptic.play(.light)
                picking = true
            } label: {
                HStack(spacing: 14) {
                    Image(systemName: "calendar")
                        .font(.system(size: 18, weight: .regular))
                        .foregroundStyle(Theme.Colors.textOnLight.opacity(0.6))
                    Text(birthDate.map(formatted) ?? t("onboarding.birth_date_placeholder"))
                        .font(.system(size: 17, weight: birthDate == nil ? .regular : .semibold))
                        .foregroundStyle(birthDate == nil ? Theme.Colors.textOnLight.opacity(0.5) : Theme.Colors.textOnLight)
                    Spacer(minLength: 0)
                }
                .paperFieldStyle()
                .contentShape(Rectangle())
            }
            .buttonStyle(PressOpacityStyle(pressed: 0.8))
            .accessibilityLabel(t("onboarding.birth_date_title"))
            .accessibilityValue(birthDate.map(formatted) ?? t("onboarding.birth_date_placeholder"))

            if tooYoung {
                Txt(t("onboarding.age_too_young"), .bodyCompact, color: Theme.Colors.warning)
                    .padding(.top, Theme.Spacing.lg)
            }
        } footer: {
            LegalFooter()
            HStack {
                Spacer(minLength: 0)
                OnboardingNextButton(loading: confirming, disabled: birthDate == nil || tooYoung) {
                guard let birthDate else { return }
                confirming = true
                Task {
                    await store.confirmAge(birthDate: birthDate)
                    confirming = false
                    // §37.1 — the band, never the date. An age band answers
                    // every product question a birthday would, and a birthday
                    // is personal data we have no reason to hand a vendor
                    // (§30.2).
                    Telemetry.track(.ageGateCompleted, ["ageBand": AppStore.ageBand(birthDate: birthDate)])
                }
                }
            }
        }
        .sheet(isPresented: $picking) {
            BirthDatePickerSheet(initial: birthDate ?? Self.defaultDate) { date in
                birthDate = date
                picking = false
            }
            .presentationDetents([.height(400)])
            .presentationDragIndicator(.hidden)
            .presentationBackground(Theme.Colors.bgElevated)
            .presentationCornerRadius(Theme.Radius.large)
        }
    }

    /// Where the wheel opens: a plausible adult, not today's date.
    private static var defaultDate: Date {
        Calendar.current.date(byAdding: .year, value: -20, to: Date()) ?? Date()
    }

    private func formatted(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.locale = store.locale.foundation
        formatter.dateStyle = .long
        return formatter.string(from: date)
    }
}

/// 03 — the wheel. A grabber, the title, the wheel in the elevated sheet, and
/// one white Confirm.
private struct BirthDatePickerSheet: View {
    let initial: Date
    let onConfirm: (Date) -> Void
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store
    @State private var date: Date

    init(initial: Date, onConfirm: @escaping (Date) -> Void) {
        self.initial = initial
        self.onConfirm = onConfirm
        _date = State(initialValue: initial)
    }

    private var range: ClosedRange<Date> {
        let calendar = Calendar.current
        let earliest = calendar.date(byAdding: .year, value: -120, to: Date()) ?? Date()
        return earliest...Date()
    }

    var body: some View {
        VStack(spacing: 0) {
            Capsule()
                .fill(Theme.Colors.borderStrong)
                .frame(width: 88, height: 6)
                .padding(.top, Theme.Spacing.md)
                .padding(.bottom, Theme.Spacing.xl)

            Text(t("onboarding.birth_date_title"))
                .font(.system(size: 18, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, Theme.Spacing.xl)
                .padding(.bottom, Theme.Spacing.xl)

            DatePicker("", selection: $date, in: range, displayedComponents: .date)
                .datePickerStyle(.wheel)
                .labelsHidden()
                .environment(\.locale, store.locale.foundation)
                .frame(height: 220)
                .clipped()
                .accessibilityLabel(t("onboarding.birth_date_title"))

            PBButton(t("onboarding.birth_date_confirm"), variant: .light, size: .medium) { onConfirm(date) }
                .padding(.horizontal, Theme.pageGutter)
                .padding(.top, Theme.Spacing.xl)
                .padding(.bottom, Theme.Spacing.xxl)
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - 04 Display name

/// Step 2 of 4. Up to 24 characters; a counter and a clear button in the field.
struct DisplayNameScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    let onDone: () -> Void

    @State private var name = ""
    @State private var saving = false
    @FocusState private var focused: Bool

    private static let limit = 24
    private var trimmed: String { name.trimmingCharacters(in: .whitespacesAndNewlines) }

    var body: some View {
        OnboardingFrame(step: 2, total: onboardingSteps) {
            OnboardingTitle(t("onboarding.name_title"))
                .padding(.bottom, Theme.Spacing.xl)

            HStack(spacing: Theme.Spacing.md) {
                TextField(t("onboarding.name_placeholder"), text: $name,
                          prompt: Text(t("onboarding.name_placeholder")).foregroundStyle(Theme.Colors.textOnLight.opacity(0.5)))
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textOnLight)
                    .tint(Theme.Colors.textOnLight)
                    .textInputAutocapitalization(.words)
                    .autocorrectionDisabled()
                    .submitLabel(.done)
                    .focused($focused)
                    .onChange(of: name) { _, value in
                        if value.count > Self.limit { name = String(value.prefix(Self.limit)) }
                    }
                    .onSubmit { if !trimmed.isEmpty { save() } }
                    .accessibilityLabel(t("onboarding.name_title"))
                Text("\(name.count)/\(Self.limit)")
                    .font(.system(size: 13))
                    .monospacedDigit()
                    .foregroundStyle(Theme.Colors.textOnLight.opacity(0.55))
                    .accessibilityHidden(true)
                if !name.isEmpty {
                    Button {
                        name = ""
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 20, weight: .regular))
                            .foregroundStyle(Theme.Colors.textOnLight.opacity(0.35))
                            .frame(width: 32, height: 32)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t("onboarding.name_clear_a11y"))
                }
            }
            .paperFieldStyle()

            // The hint under the field, quiet (board: help text below).
            Text(t("onboarding.name_hint"))
                .font(.system(size: 13))
                .foregroundStyle(Theme.Colors.textMuted)
                .fixedSize(horizontal: false, vertical: true)
                .padding(.top, Theme.Spacing.md)
        } footer: {
            HStack {
                Spacer(minLength: 0)
                OnboardingNextButton(loading: saving, disabled: trimmed.isEmpty) { save() }
            }
        }
        .onAppear {
            if name.isEmpty, let existing = store.displayName { name = existing }
            focused = true
        }
    }

    private func save() {
        saving = true
        Task {
            await store.setDisplayName(trimmed)
            saving = false
            onDone()
        }
    }
}

// MARK: - 05 Audience + genres

/// Step 3 of 4, and the body of Personalization: the audience filter and the
/// genre picker, on one screen. `Previous` steps back; `Next` saves.
struct AudienceGenresScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    let onDone: () -> Void
    var onBack: (() -> Void)? = nil

    @State private var audience: String?
    @State private var picked: [String] = []
    @State private var seeded = false
    @State private var refreshed = false

    var body: some View {
        OnboardingFrame(step: 3, total: onboardingSteps, onBack: onBack) {
            AudienceGenresPicker(audience: $audience, picked: $picked, leadSize: 28)
        } footer: {
            LegalFooter()
            // Design v3: Skip as plain text on the left, the round next on the right.
            HStack {
                Button {
                    finish(skip: true)
                } label: {
                    Text(t("onboarding.skip"))
                        .font(.system(size: 17, weight: .medium))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .frame(minHeight: 44)
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                Spacer(minLength: 0)
                OnboardingNextButton { finish(skip: false) }
            }
        }
        .task {
            if !seeded {
                audience = store.audience
                picked = store.tastes
                seeded = true
            }
            // Fetch them again if boot did not get them. Once — a retry loop on
            // an empty catalogue would hammer the API.
            guard (store.bootstrap?.genres ?? []).isEmpty, !refreshed else { return }
            refreshed = true
            await store.refreshBootstrap()
        }
    }

    private func finish(skip: Bool) {
        let tastes = skip ? [] : picked
        let chosen = skip ? nil : audience
        Telemetry.track(.tasteCalibrationCompleted, ["genreCount": tastes.count, "skipped": skip])
        store.setTastes(tastes)
        Task { await store.setAudience(chosen) }
        onDone()
    }
}

/// The two questions, shared by onboarding and by Personalization.
struct AudienceGenresPicker: View {
    @Binding var audience: String?
    @Binding var picked: [String]
    /// The genres heading's size: 28 as onboarding's page title, 20 in Settings.
    var leadSize: CGFloat = 20
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    private var audiences: [(id: String, label: String)] {
        [
            ("male", t("onboarding.audience_male")),
            ("female", t("onboarding.audience_female")),
            ("neutral", t("onboarding.audience_neutral")),
        ]
    }

    // From the catalogue, not from a hand-written list. The label is the
    // *value* here — `picked` holds labels and `setTastes` sends them — so the
    // English word survives even when a French word is on the chip.
    private var genres: [Genre] { store.bootstrap?.genres ?? [] }

    // Design v3 (board frame OnbTaste): genres first as filled chips with a
    // check on the picks, then the audience as one segmented track.
    var body: some View {
        OnboardingTitle(t("onboarding.genres_title"), size: leadSize)
            .padding(.bottom, Theme.Spacing.xl)

        FlowLayout(spacing: 10) {
            if genres.isEmpty {
                ForEach(Array([96, 120, 104, 88, 112, 92].enumerated()), id: \.offset) { _, width in
                    Skeleton(width: CGFloat(width), height: 40, radius: 20)
                }
            } else {
                ForEach(genres) { genre in
                    let on = picked.contains(genre.label)
                    Button {
                        Haptic.play(.light)
                        toggle(genre.label)
                    } label: {
                        HStack(spacing: 6) {
                            if on {
                                Image(systemName: "checkmark")
                                    .font(.system(size: 12, weight: .bold))
                            }
                            Text(t.category(genre.id, fallback: genre.label))
                                .font(.system(size: 15, weight: .medium))
                        }
                        .foregroundStyle(on ? Theme.Colors.textOnLight : Theme.Colors.textPrimary)
                        .padding(.horizontal, 16)
                        .frame(height: 40)
                        .background(on ? Theme.Colors.light : Theme.Colors.bgRaised, in: Capsule())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityAddTraits(on ? .isSelected : [])
                }
            }
        }
        .padding(.bottom, 40)

        OnboardingTitle(t("onboarding.audience_title"), size: 20)
            .padding(.bottom, Theme.Spacing.md)

        HStack(spacing: 0) {
            ForEach(audiences, id: \.id) { option in
                let on = audience == option.id
                Button {
                    Haptic.play(.light)
                    withAnimation(.easeOut(duration: Theme.Durations.short)) { audience = on ? nil : option.id }
                } label: {
                    Text(option.label)
                        .font(.system(size: 16, weight: on ? .semibold : .regular))
                        .foregroundStyle(on ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
                        .lineLimit(1)
                        .minimumScaleFactor(0.7)
                        .frame(maxWidth: .infinity, minHeight: 40)
                        .background {
                            if on { Capsule().fill(Color(hex: 0x45413B)) }
                        }
                        .contentShape(Capsule())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(option.label)
                .accessibilityAddTraits(on ? .isSelected : [])
            }
        }
        .padding(3)
        .background(Theme.Colors.bgRaised, in: Capsule())
    }

    private func toggle(_ genre: String) {
        if let index = picked.firstIndex(of: genre) {
            picked.remove(at: index)
        } else if picked.count < 5 {
            // Spec §6.2 — select 0 to 5.
            picked.append(genre)
        }
    }
}

// MARK: - OB-04 Showcase

/// Five worlds, and a way in. The picks are pinned rather than computed: this
/// is a shop window and somebody should choose what is in it.
///
/// Last Feather leads because it was written to the findings in
/// docs/early-dropout-analysis.md. Second Skin came out: 66% of its started
/// runs ended by turn 3, the worst of any world we pushed. A world the server
/// does not return is skipped, so listing one before it is seeded is safe.
private let showcaseStoryIds = [
    "story_last_feather",
    "story_itachi",
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
    @State private var focusedId: String?

    private var focused: StorySummary? {
        stories.first { $0.storyId == focusedId } ?? stories.first
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                // Design v3 (board frame OnbShowcase): the step dashes, all lit.
                HStack(spacing: 4) {
                    Spacer(minLength: 0)
                    ForEach(0..<onboardingSteps, id: \.self) { _ in
                        Capsule().fill(Theme.Colors.textPrimary).frame(width: 14, height: 2)
                    }
                }
                .frame(height: Theme.minTouchTarget)
                .padding(.horizontal, Theme.pageGutter)
                .padding(.top, Theme.Spacing.xs)
                .accessibilityElement()
                .accessibilityLabel(t("onboarding.step_a11y", ["step": onboardingSteps, "total": onboardingSteps]))

                GeometryReader { proxy in
                    // A card wide enough that the next one peeks in at the edge,
                    // which is what says "these swipe" without a hint or dots.
                    let cardWidth = min(proxy.size.width * 0.62, 260)

                    VStack(alignment: .leading, spacing: 0) {
                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            OnboardingTitle(t("onboarding.showcase_title"))
                            Text(t("onboarding.showcase_body"))
                                .font(.system(size: 15))
                                .foregroundStyle(Theme.Colors.textMuted)
                        }
                        .padding(.horizontal, Theme.pageGutter)
                        .padding(.top, Theme.Spacing.lg)

                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(alignment: .top, spacing: Theme.Spacing.md) {
                                ForEach(stories) { story in
                                    Button {
                                        Haptic.play(.light)
                                        onOpen(story.storyId)
                                    } label: {
                                        // The title is painted into the cover; the
                                        // hook is under the carousel for the
                                        // story in front.
                                        StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                                            .frame(width: cardWidth, height: cardWidth * 1.5)
                                            .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                                            .contentShape(Rectangle())
                                    }
                                    .buttonStyle(PressOpacityStyle(pressed: 0.85))
                                    .accessibilityLabel(t("onboarding.showcase_card_a11y", ["title": story.title]))
                                }
                            }
                            .padding(.horizontal, Theme.pageGutter)
                            .padding(.top, Theme.Spacing.xl)
                            .scrollTargetLayout()
                        }
                        .scrollTargetBehavior(.viewAligned)
                        .scrollPosition(id: $focusedId, anchor: .leading)
                        .frame(height: cardWidth * 1.5 + Theme.Spacing.xl)

                        // Page dashes and the hook of the story in front.
                        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                            HStack(spacing: 4) {
                                ForEach(stories) { story in
                                    Capsule()
                                        .fill(story.storyId == focused?.storyId ? Theme.Colors.textPrimary : Color(hex: 0x45413B))
                                        .frame(width: 14, height: 2)
                                }
                            }
                            .accessibilityHidden(true)
                            if let focused {
                                Text(focused.fantasyLabel)
                                    .font(.system(size: 15))
                                    .foregroundStyle(Theme.Colors.textPrimary)
                                    .lineLimit(3)
                                    .fixedSize(horizontal: false, vertical: true)
                                    .animation(.easeOut(duration: Theme.Durations.short), value: focused.storyId)
                            }
                        }
                        .padding(.horizontal, Theme.pageGutter)
                        .padding(.top, Theme.Spacing.lg)

                        Spacer(minLength: 0)

                        // One white Play for the story in front; See all as text.
                        HStack(spacing: Theme.Spacing.lg) {
                            PBButton(t("story.play"), variant: .light, size: .medium, disabled: focused == nil, icon: "play.fill") {
                                if let focused { onOpen(focused.storyId) }
                            }
                            Button(action: onSeeAll) {
                                Text(t("onboarding.see_all_stories"))
                                    .font(.system(size: 15, weight: .medium))
                                    .foregroundStyle(Theme.Colors.textSecondary)
                                    .frame(minHeight: 44)
                                    .contentShape(Rectangle())
                            }
                            .buttonStyle(PressOpacityStyle())
                        }
                        .padding(.horizontal, Theme.pageGutter)
                        .padding(.bottom, Theme.Spacing.md)
                    }
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
