import SwiftUI

// MARK: - The builder
//
// Eight steps across the top, the step's fields underneath, Previous/Next at
// the bottom. That shape is OOC's and it is right: a long form that shows you
// where you are and how much is left feels finishable in a way a single scroll
// does not.
//
// What is different is that nothing here starts empty. The compiler has
// already written every field; these screens are for changing its mind.

struct StoryBuilderScreen: View {
    let draftId: String

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var model: BuilderModel?
    @State private var loadFailed = false
    @State private var publishing = false
    @State private var publishedStoryId: String?

    var body: some View {
        Screen {
            if let model, model.compiling {
                CompilingView()
            } else if let model {
                content(model)
            } else if loadFailed {
                EmptyState(title: t("create.not_found"), message: t("create.not_found_body"),
                           actionLabel: t("misc.close")) { router.pop() }
            } else {
                ProgressView().tint(Theme.Colors.accentPrimary).frame(maxHeight: .infinity)
            }
        }
        .task {
            await load()
            // Reopening a draft whose compile is still running rejoins the
            // wait. Without this, leaving the app mid-build and coming back
            // showed an empty story that was about to fill itself in.
            await model?.watchCompile()
        }
        .sheet(isPresented: $publishing) {
            if let model {
                PublishSheet(model: model) { storyId in
                    publishing = false
                    publishedStoryId = storyId
                }
                .presentationDetents([.medium, .large])
                .presentationBackground(Theme.Colors.bgBase)
                .preferredColorScheme(.dark)
            }
        }
        .alert(t("create.published_title"), isPresented: Binding(
            get: { publishedStoryId != nil },
            set: { if !$0 { publishedStoryId = nil } }
        )) {
            Button(t("create.open_story")) {
                if let storyId = publishedStoryId {
                    publishedStoryId = nil
                    router.push(.storyDetail(storyId: storyId))
                }
            }
            Button(t("create.keep_editing"), role: .cancel) { publishedStoryId = nil }
        } message: {
            Txt(t("create.published_body"), .bodyCompact)
        }
    }

    // MARK: Shell

    @ViewBuilder
    private func content(_ model: BuilderModel) -> some View {
        @Bindable var model = model
        VStack(spacing: 0) {
            ScreenHeader(
                title: model.draft.title.isEmpty ? t("create.untitled") : model.draft.title,
                backLabel: t("story.back")
            ) {
                Task {
                    await model.flush()
                    router.pop()
                }
            } trailing: {
                HStack(spacing: Theme.Spacing.sm) {
                    // Not a save button: saving is automatic. This is the
                    // answer to "did it save", which is the only thing a
                    // creator actually wants from that icon.
                    SaveIndicator(dirty: model.dirty)
                    PBButton(
                        model.draft.isPublished ? t("create.update") : t("create.publish"),
                        variant: .light,
                        size: .medium,
                        full: false
                    ) {
                        Task { await model.flush(); publishing = true }
                    }
                }
            }

            StepperBar(model: model)

            ScrollViewReader { proxy in
                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                        Color.clear.frame(height: 1).id("top")

                        if let error = model.errorMessage {
                            InlineError(message: error, retryLabel: t("misc.close")) { model.dismissError() }
                        }
                        StepIssues(model: model)

                        stepBody(model)
                    }
                    .padding(Theme.gutter)
                    .padding(.bottom, Theme.Spacing.giant)
                }
                .onChange(of: model.step) { _, _ in
                    // A new step starts at its own beginning, never halfway
                    // down the last one.
                    proxy.scrollTo("top", anchor: .top)
                }
            }

            footer(model)
        }
    }

    @ViewBuilder
    private func stepBody(_ model: BuilderModel) -> some View {
        switch model.step {
        case .profile: ProfileStep(model: model)
        case .world: WorldStep(model: model)
        case .cast: CastStep(model: model)
        case .places: PlacesStep(model: model)
        case .opening: OpeningStep(model: model)
        case .pressure: PressureStep(model: model)
        case .endings: EndingsStep(model: model)
        case .publish: PublishStep(model: model)
        }
    }

    @ViewBuilder
    private func footer(_ model: BuilderModel) -> some View {
        let steps = CreateStep.ordered
        let index = steps.firstIndex(of: model.step) ?? 0
        HStack(spacing: Theme.Spacing.md) {
            PBButton(t("create.previous"), variant: .outline, size: .medium, disabled: index == 0) {
                model.step = steps[max(0, index - 1)]
            }
            PBButton(t("create.next"), variant: .light, size: .medium, disabled: index == steps.count - 1) {
                model.step = steps[min(steps.count - 1, index + 1)]
            }
        }
        .padding(.horizontal, Theme.gutter)
        .padding(.top, Theme.Spacing.md)
        .padding(.bottom, Theme.Spacing.lg)
        .background(Theme.Colors.bgElevated)
        .overlay(alignment: .top) { PBDivider() }
    }

    private func load() async {
        guard model == nil else { return }
        do {
            let response = try await store.api.draft(draftId)
            model = BuilderModel(api: store.api, locale: store.locale, draft: response.draft, readiness: response.readiness)
        } catch {
            loadFailed = true
        }
    }
}

// MARK: - Stepper bar

struct StepperBar: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        ScrollViewReader { proxy in
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: Theme.Spacing.lg) {
                    ForEach(Array(CreateStep.ordered.enumerated()), id: \.element) { index, step in
                        Button {
                            Haptic.play(.light)
                            model.step = step
                        } label: {
                            HStack(spacing: 3) {
                                Text(t(step.labelKey))
                                    .font(.system(size: 15, weight: model.step == step ? .semibold : .regular))
                                    .foregroundStyle(model.step == step ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
                                if step.required {
                                    // The asterisk is red only when the step is
                                    // actually blocking. Otherwise it is a note
                                    // about what the step is, not a complaint.
                                    Text("*")
                                        .font(.system(size: 13, weight: .bold))
                                        .foregroundStyle(model.blocked(step) ? Theme.Colors.danger : Theme.Colors.accentPrimary)
                                }
                            }
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(PressOpacityStyle())
                        .id(step)

                        if index < CreateStep.ordered.count - 1 {
                            Image(systemName: "chevron.right")
                                .font(.system(size: 11, weight: .semibold))
                                .foregroundStyle(Theme.Colors.textMuted.opacity(0.6))
                        }
                    }
                }
                .padding(.horizontal, Theme.gutter)
                .padding(.vertical, Theme.Spacing.md)
            }
            .onChange(of: model.step) { _, step in
                withAnimation(.easeInOut(duration: 0.2)) { proxy.scrollTo(step, anchor: .center) }
            }
            .overlay(alignment: .bottom) { PBDivider() }
        }
    }
}

// MARK: - Save indicator

/// Two words where OOC has a floppy disk. Saving is not the creator's job.
struct SaveIndicator: View {
    let dirty: Bool
    @Environment(\.translator) private var t

    var body: some View {
        Text(t(dirty ? "create.saving" : "create.saved"))
            .font(.system(size: 11, weight: .medium))
            .foregroundStyle(Theme.Colors.textMuted)
            .animation(.easeInOut, value: dirty)
            .accessibilityLabel(t(dirty ? "create.saving" : "create.saved"))
    }
}

// MARK: - What is blocking this step

struct StepIssues: View {
    let model: BuilderModel
    @Environment(\.translator) private var t

    var body: some View {
        let issues = model.issues(for: model.step)
        if !issues.isEmpty {
            Card(background: Theme.Colors.bgRaised) {
                VStack(alignment: .leading, spacing: 6) {
                    Txt(t("create.needs_work"), .micro, color: Theme.Colors.warning)
                    ForEach(Array(issues.enumerated()), id: \.offset) { _, issue in
                        Txt(
                            issue.index == nil
                                ? t(issue.messageKey)
                                : t(issue.messageKey + "_n", ["n": String((issue.index ?? 0) + 1)]),
                            .micro,
                            color: Theme.Colors.textSecondary
                        )
                    }
                }
            }
        }
    }
}
