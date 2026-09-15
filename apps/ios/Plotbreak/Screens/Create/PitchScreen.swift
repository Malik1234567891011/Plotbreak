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
            ScreenHeader(title: t("create.new_story"), backLabel: t("misc.close"), backGlyph: "✕") {
                router.pop()
            }

            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        Txt(t("create.pitch_heading"), .h2)
                        Txt(t("create.pitch_body"), .bodyCompact, color: Theme.Colors.textSecondary)
                    }

                    VStack(alignment: .leading, spacing: 6) {
                        TextEditor(text: $text)
                            .focused($focused)
                            .scrollContentBackground(.hidden)
                            .font(Theme.TypeStyle.body.font())
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .frame(minHeight: 180)
                            .padding(Theme.Spacing.md)
                            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
                            .overlay {
                                RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                                    .strokeBorder(focused ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: focused ? 1 : 0.5)
                            }
                            .overlay(alignment: .topLeading) {
                                if text.isEmpty {
                                    Txt(t("create.pitch_placeholder"), .body, color: Theme.Colors.textMuted)
                                        .padding(.horizontal, Theme.Spacing.md + 5)
                                        .padding(.top, Theme.Spacing.md + 8)
                                        .allowsHitTesting(false)
                                }
                            }
                        HStack {
                            Spacer()
                            Txt("\(text.count)/1500", .micro, color: Theme.Colors.textMuted)
                        }
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

                    chips(
                        label: t("create.pitch_length"),
                        options: DraftLength.allCases,
                        selected: { $0 == length },
                        label: { t($0.labelKey) }
                    ) { length = $0 }

                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        SectionLabel(t("create.pitch_pov"))
                        ForEach(DraftPov.allCases, id: \.self) { option in
                            RadioCard(selected: pov == option) { pov = option } content: {
                                VStack(alignment: .leading, spacing: 2) {
                                    Txt(t(option.labelKey), .bodyCompact)
                                    Txt(t(option.labelKey + "_body"), .micro, color: Theme.Colors.textMuted)
                                }
                            }
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
                    Chip(toLabel(option), selected: selected(option)) { onTap(option) }
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
