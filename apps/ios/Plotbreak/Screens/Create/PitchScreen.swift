import SwiftUI

// MARK: - The pitch
//
// One screen and one field. Everything else a story needs is derived from it.
//
// OOC asks for a 6,000-character world bible with an Auto-generate button
// beside it; we ask for four sentences and then compile. The difference is the
// whole product: a person who can describe a story in a paragraph should not
// have to know what a "hard canon fact" is before they get one.

struct PitchScreen: View {
    let draftId: String

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var model: BuilderModel?
    @State private var text = ""
    @State private var tone: DraftTone?
    @State private var length: DraftLength = .medium
    @State private var pov: DraftPov = .blank
    @State private var loadFailed = false
    @FocusState private var focused: Bool

    private var canBuild: Bool { text.trimmingCharacters(in: .whitespacesAndNewlines).count >= 20 }

    var body: some View {
        Screen {
            if let model, model.compiling {
                CompilingView()
            } else if let model {
                form(model)
            } else if loadFailed {
                EmptyState(title: t("create.not_found"), message: t("create.not_found_body"),
                           actionLabel: t("misc.close")) { router.pop() }
            } else {
                ProgressView().tint(Theme.Colors.accentPrimary).frame(maxHeight: .infinity)
            }
        }
        .task { await load() }
    }

    // MARK: Form

    @ViewBuilder
    private func form(_ model: BuilderModel) -> some View {
        VStack(spacing: 0) {
            // Design v3 (board frame Pitch): a plain back button; the
            // question is the page title.
            HStack {
                Button {
                    focused = false
                    router.pop()
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .frame(width: 44, height: 44)
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(t("misc.close"))
                Spacer(minLength: 0)
            }
            .padding(.horizontal, Theme.Spacing.sm)
            .frame(height: 52)

            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        Text(t("create.pitch_heading"))
                            .font(.system(size: 28, weight: .bold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .accessibilityAddTraits(.isHeader)
                        Text(t("create.pitch_body"))
                            .font(.system(size: 15))
                            .foregroundStyle(Theme.Colors.textMuted)
                    }

                    // A filled box, no outline; the count sits inside it.
                    TextEditor(text: $text)
                        .focused($focused)
                        .scrollContentBackground(.hidden)
                        .font(.system(size: 17))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .tint(Theme.Colors.textPrimary)
                        .frame(minHeight: 150)
                        .padding(.horizontal, 12)
                        .padding(.top, 10)
                        .padding(.bottom, 30)
                        .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                        .overlay(alignment: .topLeading) {
                            if text.isEmpty {
                                Text(t("create.pitch_placeholder"))
                                    .font(.system(size: 17))
                                    .foregroundStyle(Theme.Colors.textMuted)
                                    .padding(.horizontal, 17)
                                    .padding(.top, 18)
                                    .allowsHitTesting(false)
                            }
                        }
                        .overlay(alignment: .bottomTrailing) {
                            Text(verbatim: "\(text.count.formatted()) / \(1500.formatted())")
                                .font(.system(size: 13))
                                .monospacedDigit()
                                .foregroundStyle(Theme.Colors.textMuted)
                                .padding(14)
                                .allowsHitTesting(false)
                        }

                    chips(
                        label: t("create.pitch_tone"),
                        options: DraftTone.allCases,
                        selected: { $0 == tone },
                        label: { t($0.labelKey) }
                    ) { option in
                        // Tapping the chosen tone again clears it, which is how
                        // a creator says "whatever the pitch implies".
                        tone = tone == option ? nil : option
                    }

                    lengthTrack

                    VStack(alignment: .leading, spacing: 4) {
                        SectionLabel(t("create.pitch_pov"))
                        ForEach(Array(DraftPov.allCases.enumerated()), id: \.element) { index, option in
                            if index > 0 {
                                Rectangle().fill(Theme.Colors.borderSubtle).frame(height: 0.5).padding(.leading, 34)
                            }
                            povRow(option)
                        }
                    }

                    if let refusal = model.refusal {
                        Card(background: Theme.Colors.bgRaised) {
                            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                                Txt(t("create.refused_title"), .h3)
                                Txt(refusal, .bodyCompact, color: Theme.Colors.textSecondary)
                            }
                        }
                    }
                    if let error = model.errorMessage {
                        InlineError(message: error, retryLabel: t("misc.close")) { model.dismissError() }
                    }
                }
                .padding(Theme.gutter)
                .padding(.bottom, Theme.Spacing.giant)
            }

            VStack(spacing: Theme.Spacing.sm) {
                PBButton(t("create.build_story"), variant: .light, disabled: !canBuild) {
                    focused = false
                    Task {
                        await model.compile(pitch: text, tone: tone, length: length, pov: pov)
                        if model.refusal == nil && model.errorMessage == nil {
                            router.replaceTop(.storyBuilder(draftId: draftId))
                        }
                    }
                }
                Button {
                    focused = false
                    router.replaceTop(.storyBuilder(draftId: draftId))
                } label: {
                    Txt(t("create.start_empty"), .micro, color: Theme.Colors.textMuted, center: true)
                }
                .buttonStyle(PressOpacityStyle())
            }
            .padding(.horizontal, Theme.gutter)
            .padding(.bottom, Theme.Spacing.lg)
        }
    }

    /// Design v3: Length as one segmented track.
    private var lengthTrack: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            SectionLabel(t("create.pitch_length"))
            HStack(spacing: 0) {
                ForEach(DraftLength.allCases, id: \.self) { option in
                    let on = option == length
                    Button {
                        Haptic.play(.light)
                        withAnimation(.easeOut(duration: Theme.Durations.short)) { length = option }
                    } label: {
                        Text(t(option.labelKey))
                            .font(.system(size: 16, weight: on ? .semibold : .regular))
                            .foregroundStyle(on ? Theme.Colors.textPrimary : Theme.Colors.textSecondary)
                            .frame(maxWidth: .infinity, minHeight: 40)
                            .background {
                                if on { Capsule().fill(Color(hex: 0x45413B)) }
                            }
                            .contentShape(Capsule())
                    }
                    .buttonStyle(.plain)
                    .accessibilityAddTraits(on ? .isSelected : [])
                }
            }
            .padding(3)
            .background(Theme.Colors.bgRaised, in: Capsule())
        }
    }

    /// Design v3: a plain radio row, no box.
    private func povRow(_ option: DraftPov) -> some View {
        let on = pov == option
        return Button {
            Haptic.play(.light)
            pov = option
        } label: {
            HStack(alignment: .top, spacing: 12) {
                ZStack {
                    Circle().strokeBorder(on ? Theme.Colors.textPrimary : Color(hex: 0x6E6860), lineWidth: 1.5)
                    if on { Circle().fill(Theme.Colors.textPrimary).frame(width: 10, height: 10) }
                }
                .frame(width: 22, height: 22)
                .padding(.top, 1)
                VStack(alignment: .leading, spacing: 2) {
                    Text(t(option.labelKey))
                        .font(.system(size: 17))
                        .foregroundStyle(Theme.Colors.textPrimary)
                    Text(t(option.labelKey + "_body"))
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.vertical, 12)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityAddTraits(on ? .isSelected : [])
    }

    @ViewBuilder
    private func chips<Option: Hashable>(
        label: String,
        options: [Option],
        selected: @escaping (Option) -> Bool,
        label toLabel: @escaping (Option) -> String,
        onTap: @escaping (Option) -> Void
    ) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            SectionLabel(label)
            FlowLayout(spacing: Theme.Spacing.sm) {
                ForEach(options, id: \.self) { option in
                    let on = selected(option)
                    Button {
                        Haptic.play(.light)
                        onTap(option)
                    } label: {
                        Text(toLabel(option))
                            .font(.system(size: 15, weight: .medium))
                            .foregroundStyle(on ? Theme.Colors.textOnLight : Theme.Colors.textPrimary)
                            .padding(.horizontal, 16)
                            .frame(height: 38)
                            .background(on ? Theme.Colors.light : Theme.Colors.bgRaised, in: Capsule())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityAddTraits(on ? .isSelected : [])
                }
            }
        }
    }

    private func load() async {
        guard model == nil else { return }
        do {
            let response = try await store.api.draft(draftId)
            let builder = BuilderModel(api: store.api, locale: store.locale, draft: response.draft, readiness: response.readiness)
            text = response.draft.pitch.text
            tone = response.draft.pitch.tone
            length = response.draft.pitch.length
            pov = response.draft.pitch.pov
            model = builder
        } catch {
            loadFailed = true
        }
    }
}

// MARK: - Compiling
//
// Two generations, about a hundred seconds. A spinner for that long is an app
// that has stopped, so the wait says what it is doing — and the two phases are
// real, so the copy is not a lie told to fill a bar.

struct CompilingView: View {
    @Environment(\.translator) private var t
    @State private var elapsed = 0

    /// Roughly where the spine hands over to the cast, measured across six real
    /// compiles. Approximate on purpose: it is a reassurance, not a progress bar.
    private var phaseKey: String {
        switch elapsed {
        case ..<12: return "create.compiling_reading"
        case ..<55: return "create.compiling_world"
        case ..<105: return "create.compiling_cast"
        default: return "create.compiling_finishing"
        }
    }

    var body: some View {
        VStack(spacing: Theme.Spacing.xl) {
            Spacer()
            ProgressView().tint(Theme.Colors.accentPrimary).scaleEffect(1.4)
            VStack(spacing: Theme.Spacing.sm) {
                Txt(t("create.compiling_title"), .h2, center: true)
                Txt(t(phaseKey), .bodyCompact, color: Theme.Colors.textSecondary, center: true)
                    .animation(.easeInOut, value: phaseKey)
            }
            Txt(t("create.compiling_wait"), .micro, color: Theme.Colors.textMuted, center: true)
            Spacer()
        }
        .padding(Theme.Spacing.xxl)
        .task {
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                elapsed += 1
            }
        }
    }
}
