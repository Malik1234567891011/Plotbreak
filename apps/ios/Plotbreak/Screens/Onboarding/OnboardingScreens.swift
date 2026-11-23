import SwiftUI

// MARK: - Onboarding
//
// Screens 02–05 of the 2026-09 redesign, plus the splash and the showcase.
// Twins of `apps/mobile/src/screens/Onboarding.tsx`.
//
// Spec §6.1 — the player reaches their first meaningful choice within 60
// seconds. Design v3 (board OnbProfile, "1 of 3"): three steps carry the step
// dashes: the name with the birthday under it, audience and genres, and the
// showcase that ends it.
//
// These are shown by `RootView` before the `Router` exists, so nothing here
// may read `Router` from the environment: `AppStore` and `\.translator` only.

private let onboardingSteps = 3

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

// MARK: - 1 of 3: name and birthday (board OnbProfile)

/// A birthday as three typed numbers. Only the age band it decides is kept;
/// the date itself never leaves this screen.
struct BirthdayEntry: Equatable {
    enum Part: Hashable {
        case month, day, year

        /// Two digits for the month and the day, four for the year.
        var length: Int { self == .year ? 4 : 2 }
    }

    var month = ""
    var day = ""
    var year = ""

    /// The order the player's language writes a date in: en M/D/Y, fr J/M/A.
    static func order(for locale: AppLocale) -> [Part] {
        switch locale {
        case .fr: return [.day, .month, .year]
        case .en: return [.month, .day, .year]
        }
    }

    /// One of the three numbers. Setting it keeps ASCII digits only, at most
    /// the part's length, so a paste of "06/21" into the month reads "06".
    subscript(part: Part) -> String {
        get {
            switch part {
            case .month: return month
            case .day: return day
            case .year: return year
            }
        }
        set {
            let clean = Self.digits(newValue, max: part.length)
            switch part {
            case .month: month = clean
            case .day: day = clean
            case .year: year = clean
            }
        }
    }

    static func digits(_ raw: String, max: Int) -> String {
        String(raw.filter { ("0"..."9").contains($0) }.prefix(max))
    }

    /// Typing (or pasting) `raw` into `part`. Its digits fill that number, and
    /// whatever does not fit carries on into the numbers after it in `order`,
    /// so "06212000" pasted into the month fills all three and a fast typist
    /// loses nothing to the hop between fields. Answers the number the cursor
    /// should move to, or nil to leave it where it is.
    mutating func type(_ raw: String, into part: Part, order: [Part]) -> Part? {
        guard var index = order.firstIndex(of: part) else {
            self[part] = raw
            return nil
        }
        var digits = Self.digits(raw, max: Int.max)
        var landed = part
        while true {
            let current = order[index]
            let take = String(digits.prefix(current.length))
            self[current] = take
            digits.removeFirst(take.count)
            landed = current
            guard !digits.isEmpty, index + 1 < order.count else { break }
            index += 1
        }
        if self[landed].count == landed.length,
           let at = order.firstIndex(of: landed), at + 1 < order.count {
            return order[at + 1]
        }
        return landed == part ? nil : landed
    }

    /// All three typed, the year in full.
    var isFilled: Bool { !month.isEmpty && !day.isEmpty && year.count == 4 }

    /// The day these numbers name, or nil while they do not name one: not
    /// filled in, a day the month does not have (31/02), a date in the future,
    /// or more than 120 years ago.
    func date(now: Date = Date()) -> Date? {
        guard isFilled, let m = Int(month), let d = Int(day), let y = Int(year),
              (1...12).contains(m), d >= 1 else { return nil }
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .current
        guard let date = calendar.date(from: DateComponents(year: y, month: m, day: d)) else { return nil }
        // `date(from:)` rolls 31/02 over into March; a day that comes back
        // different is a day that does not exist.
        let back = calendar.dateComponents([.year, .month, .day], from: date)
        guard back.year == y, back.month == m, back.day == d else { return nil }
        guard date <= now,
              let earliest = calendar.date(byAdding: .year, value: -120, to: now),
              date >= earliest else { return nil }
        return date
    }
}

/// What the name-and-birthday step knows, and every decision it makes, kept
/// out of the view so a test can hold a date still.
///
/// COPPA: the name is typed before the age is known, so it stays here, in
/// memory, until the birthday says the player is 13 or over. Under 13, the
/// step blocks and the name is dropped; nothing is saved.
@MainActor
struct NameAndBirthdayForm {
    static let nameLimit = 24

    var name = "" {
        didSet { if name.count > Self.nameLimit { name = String(name.prefix(Self.nameLimit)) } }
    }
    var birthday = BirthdayEntry()
    /// False for a player whose age is already known: the step asks for the
    /// name only.
    var asksBirthday = true

    enum Hint: Equatable {
        case none
        /// "Finish the year to go on": the date is not whole yet.
        case finishYear
        /// All three typed, but they name no real day.
        case checkDate
        /// The date is real and under 13: `onboarding.age_too_young`.
        case tooYoung
    }

    var trimmedName: String { name.trimmingCharacters(in: .whitespacesAndNewlines) }

    /// The age band the birthday decides, or nil before it decides one (and
    /// always nil when the step is not asking).
    func ageBand(now: Date = Date()) -> String? {
        guard asksBirthday, let date = birthday.date(now: now) else { return nil }
        return AppStore.ageBand(birthDate: date, now: now)
    }

    func isTooYoung(now: Date = Date()) -> Bool { ageBand(now: now) == "under13" }

    /// Next is live with a name and, when asked, a real date of 13 or over.
    func canContinue(now: Date = Date()) -> Bool {
        guard !trimmedName.isEmpty else { return false }
        guard asksBirthday else { return true }
        guard let band = ageBand(now: now) else { return false }
        return band != "under13"
    }

    func hint(now: Date = Date()) -> Hint {
        guard asksBirthday else { return .none }
        guard birthday.isFilled else { return .finishYear }
        guard ageBand(now: now) != nil else { return .checkDate }
        return isTooYoung(now: now) ? .tooYoung : .none
    }

    /// Called whenever the date changes. An under-13 date drops the name
    /// typed above it, so nothing a child typed is kept even in memory.
    mutating func dropNameIfTooYoung(now: Date = Date()) {
        if isTooYoung(now: now) { name = "" }
    }
}

/// Step 1 of 3 (board OnbProfile). The name, and under it, for a player whose
/// age is not known yet, the birthday as three numbers in the order their
/// language writes a date. Replaces the separate birth-date and name steps.
struct NameAndBirthdayScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    let onDone: () -> Void

    @State private var form = NameAndBirthdayForm()
    @State private var seeded = false
    @State private var saving = false
    @FocusState private var focus: Field?

    private enum Field: Hashable {
        case name
        case birthday(BirthdayEntry.Part)
    }

    private var order: [BirthdayEntry.Part] { BirthdayEntry.order(for: store.locale) }

    var body: some View {
        OnboardingFrame(step: 1, total: onboardingSteps) {
            OnboardingTitle(t("onboarding.name_title"))

            nameField
                .padding(.top, Theme.Spacing.xxl)

            // The hint under the field, quiet (board: help text below).
            Text(t("onboarding.name_hint"))
                .font(.system(size: 13))
                .foregroundStyle(Theme.Colors.textSecondary)
                .fixedSize(horizontal: false, vertical: true)
                .padding(.top, 10)

            if form.asksBirthday {
                Text(t("onboarding.birthday_heading"))
                    .font(.system(size: 20, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityAddTraits(.isHeader)
                    .padding(.top, Theme.Spacing.huge)

                birthdayField
                    .padding(.top, 14)

                Text(t("onboarding.birthday_note"))
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.top, 10)

                if form.hint() == .tooYoung {
                    Text(t("onboarding.age_too_young"))
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .fixedSize(horizontal: false, vertical: true)
                        .padding(.top, Theme.Spacing.lg)
                }
            }
        } footer: {
            if form.asksBirthday { LegalFooter() }
            HStack(alignment: .center, spacing: Theme.Spacing.md) {
                if let hint = hintText {
                    Text(hint)
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .fixedSize(horizontal: false, vertical: true)
                }
                Spacer(minLength: 0)
                OnboardingNextButton(loading: saving, disabled: !form.canContinue()) { submit() }
            }
        }
        .onAppear {
            guard !seeded else { return }
            seeded = true
            form.asksBirthday = !store.ageVerified
            if let existing = store.displayName { form.name = existing }
            focus = .name
        }
        .onChange(of: form.birthday) { _, _ in form.dropNameIfTooYoung() }
    }

    private var hintText: String? {
        switch form.hint() {
        case .finishYear: return t("onboarding.birthday_finish_year")
        case .checkDate: return t("onboarding.birthday_check")
        case .none, .tooYoung: return nil
        }
    }

    // MARK: Fields

    /// The paper capsule with the 3/24 count and a clear cross.
    private var nameField: some View {
        HStack(spacing: Theme.Spacing.md) {
            TextField(t("onboarding.name_placeholder"), text: $form.name,
                      prompt: Text(t("onboarding.name_placeholder")).foregroundStyle(Theme.Colors.textOnLight.opacity(0.5)))
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(Theme.Colors.textOnLight)
                .tint(Theme.Colors.textOnLight)
                .textInputAutocapitalization(.words)
                .autocorrectionDisabled()
                .submitLabel(form.asksBirthday ? .next : .done)
                .focused($focus, equals: .name)
                .onSubmit {
                    if form.asksBirthday, let first = order.first {
                        focus = .birthday(first)
                    } else if form.canContinue() {
                        submit()
                    }
                }
                .accessibilityLabel(t("onboarding.name_title"))
            Text(verbatim: "\(form.name.count)/\(NameAndBirthdayForm.nameLimit)")
                .font(.system(size: 13))
                .monospacedDigit()
                .foregroundStyle(Theme.Colors.textOnLight.opacity(0.55))
                .accessibilityHidden(true)
            if !form.name.isEmpty {
                Button {
                    form.name = ""
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
    }

    /// One paper capsule holding the three numbers, "/" between them, in the
    /// locale's order. Each number moves on to the next once it is full.
    private var birthdayField: some View {
        HStack(spacing: 10) {
            ForEach(Array(order.enumerated()), id: \.element) { index, part in
                if index > 0 {
                    Text(verbatim: "/")
                        .font(.system(size: 17))
                        .foregroundStyle(Theme.Colors.textOnLight.opacity(0.45))
                        .accessibilityHidden(true)
                }
                numberField(part)
            }
            // A tap on the capsule but beside the numbers lands on the first
            // one still empty.
            Color.clear
                .frame(maxWidth: .infinity, minHeight: 44)
                .contentShape(Rectangle())
                .onTapGesture {
                    focus = .birthday(order.first { form.birthday[$0].isEmpty } ?? order.last ?? .year)
                }
                .accessibilityHidden(true)
        }
        .paperFieldStyle()
    }

    private func numberField(_ part: BirthdayEntry.Part) -> some View {
        TextField(placeholder(part), text: Binding(
            get: { form.birthday[part] },
            set: { value in
                if let next = form.birthday.type(value, into: part, order: order) {
                    focus = .birthday(next)
                }
            }
        ), prompt: Text(placeholder(part)).foregroundStyle(Theme.Colors.textOnLight.opacity(0.45)))
            .font(.system(size: 17, weight: .semibold))
            .monospacedDigit()
            .foregroundStyle(Theme.Colors.textOnLight)
            .tint(Theme.Colors.textOnLight)
            .keyboardType(.numberPad)
            .focused($focus, equals: .birthday(part))
            // As wide as what it shows ("MM", "06"), so the slashes sit evenly.
            .fixedSize()
            .frame(minHeight: 44)
            .accessibilityLabel(label(part))
    }

    private func placeholder(_ part: BirthdayEntry.Part) -> String {
        switch part {
        case .month: return t("onboarding.birthday_month_short")
        case .day: return t("onboarding.birthday_day_short")
        case .year: return t("onboarding.birthday_year_short")
        }
    }

    private func label(_ part: BirthdayEntry.Part) -> String {
        switch part {
        case .month: return t("onboarding.birthday_month")
        case .day: return t("onboarding.birthday_day")
        case .year: return t("onboarding.birthday_year")
        }
    }

    // MARK: Saving

    /// The age first, then the name, and the name only for 13 and over.
    private func submit() {
        let now = Date()
        guard !saving, form.canContinue(now: now) else { return }
        let name = form.trimmedName
        let birthDate = form.asksBirthday ? form.birthday.date(now: now) : nil
        saving = true
        focus = nil
        Task {
            if let birthDate {
                let band = AppStore.ageBand(birthDate: birthDate, now: now)
                await store.confirmAge(birthDate: birthDate)
                // §37.1 — the band, never the date. An age band answers every
                // product question a birthday would, and a birthday is personal
                // data we have no reason to hand a vendor (§30.2).
                Telemetry.track(.ageGateCompleted, ["ageBand": band])
            }
            await store.setDisplayName(name)
            saving = false
            onDone()
        }
    }
}

// MARK: - 2 of 3: audience + genres

/// Step 2 of 3, and the body of Personalization: the audience filter and the
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
        OnboardingFrame(step: 2, total: onboardingSteps, onBack: onBack) {
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
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            OnboardingTitle(t("onboarding.genres_title"), size: leadSize)
            Text(t("onboarding.genres_body"))
                .font(.system(size: 15))
                .foregroundStyle(Theme.Colors.textMuted)
                .fixedSize(horizontal: false, vertical: true)
        }
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
                    Text(t("onboarding.step_short", ["step": onboardingSteps, "total": onboardingSteps]))
                        .font(.system(size: 12))
                        .monospacedDigit()
                        .foregroundStyle(Theme.Colors.textMuted)
                        .padding(.trailing, 6)
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
                            Text.crystals(t("onboarding.showcase_body"), fontSize: 15)
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
