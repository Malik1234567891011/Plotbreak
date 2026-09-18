import SwiftUI

// MARK: - Create
//
// The creator's dashboard, and the fourth tab. Drafts and published worlds in
// one list, because they are the same object at different stages — a creator
// thinks "my stories", not "my drafts and separately my stories".
//
// The numbers on each card are the retention loop. They are already in
// `story_signals`; showing them costs nothing and is the reason a creator opens
// this tab on a day they are not writing.

struct CreateTabScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var titles: [CreatorTitle] = []
    @State private var filter: Filter = .all
    @State private var loading = true
    @State private var creating = false
    @State private var errorMessage: String?
    @State private var confirmingDelete: CreatorTitle?

    enum Filter: CaseIterable {
        case all, drafts, published
        var labelKey: String {
            switch self {
            case .all: return "create.filter_all"
            case .drafts: return "create.filter_drafts"
            case .published: return "create.filter_published"
            }
        }
    }

    private var shown: [CreatorTitle] {
        switch filter {
        case .all: return titles
        case .drafts: return titles.filter { !$0.isPublished }
        case .published: return titles.filter(\.isPublished)
        }
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                TabHeader(t("nav.create")) {
                    if !titles.isEmpty {
                        Txt(t("create.title_count", ["count": titles.count]), .micro, color: Theme.Colors.textMuted)
                    }
                }

                if loading {
                    loadingList
                } else if titles.isEmpty {
                    empty
                } else {
                    list
                }
            }
            .overlay(alignment: .bottomTrailing) { newStoryButton }
        }
        .task { await load() }
        .refreshable { await load() }
        .alert(t("create.delete_title"), isPresented: Binding(
            get: { confirmingDelete != nil },
            set: { if !$0 { confirmingDelete = nil } }
        )) {
            Button(t("misc.cancel"), role: .cancel) { confirmingDelete = nil }
            Button(t("create.delete_confirm"), role: .destructive) {
                if let target = confirmingDelete { Task { await delete(target) } }
            }
        } message: {
            Txt(t("create.delete_body"), .bodyCompact)
        }
    }

    // MARK: Pieces

    private var newStoryButton: some View {
        Button {
            Haptic.play(.medium)
            Task { await startNew() }
        } label: {
            Group {
                if creating {
                    ProgressView().tint(Theme.Colors.bgBase)
                } else {
                    Image(systemName: "plus").font(.system(size: 24, weight: .semibold))
                }
            }
            .foregroundStyle(Theme.Colors.bgBase)
            .frame(width: 58, height: 58)
            .background(Theme.Colors.light, in: Circle())
            .shadow(color: .black.opacity(0.35), radius: 12, y: 4)
        }
        .buttonStyle(PressScaleStyle())
        .disabled(creating)
        .padding(.trailing, Theme.gutter)
        .padding(.bottom, Theme.Spacing.xl)
        .accessibilityLabel(t("create.new_story"))
    }

    private var loadingList: some View {
        VStack(spacing: Theme.Spacing.md) {
            ForEach(0..<3, id: \.self) { _ in Skeleton(height: 96) }
            Spacer()
        }
        .padding(Theme.gutter)
    }

    private var empty: some View {
        ScrollView {
            VStack(spacing: Theme.Spacing.xl) {
                EmptyState(
                    title: t("create.empty_title"),
                    message: t("create.empty_body"),
                    actionLabel: t("create.new_story")
                ) { Task { await startNew() } }
            }
            .padding(.top, Theme.Spacing.giant)
        }
    }

    private var list: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                HStack(spacing: Theme.Spacing.sm) {
                    ForEach(Filter.allCases, id: \.self) { option in
                        Chip(t(option.labelKey), selected: filter == option, style: .outlined) {
                            filter = option
                        }
                    }
                    Spacer(minLength: 0)
                }
                .padding(.bottom, Theme.Spacing.xs)

                if let errorMessage {
                    InlineError(message: errorMessage, retryLabel: t("misc.close")) { self.errorMessage = nil }
                }

                ForEach(shown) { title in
                    CreatorTitleCard(title: title) {
                        router.push(.storyBuilder(draftId: title.draftId))
                    } onPlay: {
                        if let storyId = title.storyId { router.push(.storyDetail(storyId: storyId)) }
                    } onDelete: {
                        confirmingDelete = title
                    }
                }

                if shown.isEmpty {
                    Txt(t("create.filter_empty"), .bodyCompact, color: Theme.Colors.textMuted, center: true)
                        .padding(.vertical, Theme.Spacing.giant)
                }
            }
            .padding(Theme.gutter)
            .padding(.bottom, Theme.Spacing.giant * 2)
        }
    }

    // MARK: Actions

    private func load() async {
        do {
            titles = try await store.api.creatorTitles().titles
            errorMessage = nil
        } catch let error as APIError {
            errorMessage = createErrorText(error, t)
        } catch {
            errorMessage = nil
        }
        loading = false
    }

    private func startNew() async {
        guard !creating else { return }
        creating = true
        defer { creating = false }
        do {
            let response = try await store.api.newDraft()
            await load()
            router.push(.pitch(draftId: response.draft.draftId))
        } catch let error as APIError {
            errorMessage = createErrorText(error, t)
        } catch {
            errorMessage = nil
        }
    }

    private func delete(_ title: CreatorTitle) async {
        confirmingDelete = nil
        do {
            _ = try await store.api.deleteDraft(title.draftId)
            titles.removeAll { $0.draftId == title.draftId }
        } catch let error as APIError {
            errorMessage = createErrorText(error, t)
        } catch {
            errorMessage = nil
        }
    }
}

// MARK: - One title

struct CreatorTitleCard: View {
    let title: CreatorTitle
    let onEdit: () -> Void
    let onPlay: () -> Void
    let onDelete: () -> Void

    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    private var statusTone: ChipTone {
        guard title.isPublished else { return .neutral }
        switch title.visibility {
        case .publicly: return .success
        case .unlisted: return .warning
        case .privateOnly: return .neutral
        }
    }

    private var statusLabel: String {
        title.isPublished ? t(title.visibility.labelKey) : t("create.status_draft")
    }

    var body: some View {
        Button(action: onEdit) {
            Card {
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    HStack(alignment: .top, spacing: Theme.Spacing.md) {
                        VStack(alignment: .leading, spacing: 4) {
                            Txt(title.title.isEmpty ? t("create.untitled") : title.title, .h3, lineLimit: 2)
                            if !title.hook.isEmpty {
                                Txt(title.hook, .micro, color: Theme.Colors.textMuted, lineLimit: 2)
                            }
                        }
                        Spacer(minLength: Theme.Spacing.sm)
                        Chip(statusLabel, tone: statusTone, style: .outlined)
                    }

                    HStack(spacing: Theme.Spacing.lg) {
                        if title.isPublished {
                            metric("play.fill", title.runs, t("create.metric_plays"))
                            metric("heart.fill", title.likes, t("create.metric_likes"))
                            metric("bubble.left.fill", title.comments, t("create.metric_comments"))
                        } else if title.ready {
                            Txt(t("create.ready_to_publish"), .micro, color: Theme.Colors.success)
                        } else {
                            Txt(t("create.keep_going"), .micro, color: Theme.Colors.textMuted)
                        }
                        Spacer(minLength: 0)
                    }
                }
            }
        }
        .buttonStyle(PressOpacityStyle())
        .contextMenu {
            Button(t("create.edit")) { onEdit() }
            if title.isPublished {
                Button(t("create.open_story")) { onPlay() }
            } else {
                Button(t("create.delete"), role: .destructive) { onDelete() }
            }
        }
    }

    private func metric(_ symbol: String, _ value: Int, _ label: String) -> some View {
        HStack(spacing: 5) {
            Image(systemName: symbol).font(.system(size: 11))
            // verbatim, and formatted against the app's language: an
            // interpolated LocalizedStringKey takes the device's locale, which
            // is how a French screen ends up reading "1,000".
            Text(verbatim: Format.credits(value, locale: store.locale))
                .font(.system(size: 12, weight: .medium))
        }
        .foregroundStyle(Theme.Colors.textMuted)
        .accessibilityLabel("\(value) \(label)")
    }
}
