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
                TabHeader(t("nav.create"))
                list
            }
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

    /// Design v3 (board frame Create): the way in sits at the top of the page,
    /// always, as the one filled block with the one white button. Your stories
    /// follow as plain rows.
    private var startCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(t("create.empty_title"))
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
            Text(t("create.empty_body"))
                .font(.system(size: 15))
                .foregroundStyle(Theme.Colors.textSecondary)
                .fixedSize(horizontal: false, vertical: true)
            PBButton(t("create.new_story"), loadingLabel: t("create.new_story"), variant: .light, size: .medium,
                     loading: creating, full: false, disabled: creating, haptic: .medium) {
                Task { await startNew() }
            }
            .padding(.top, 8)
        }
        .padding(20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private var list: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                startCard
                    .padding(.top, Theme.Spacing.sm)

                if let errorMessage {
                    InlineError(message: errorMessage, retryLabel: t("misc.close")) { self.errorMessage = nil }
                        .padding(.top, Theme.Spacing.md)
                }

                if loading {
                    ForEach(0..<2, id: \.self) { _ in Skeleton(height: 84) }
                        .padding(.top, Theme.Spacing.md)
                } else if !titles.isEmpty {
                    HStack(spacing: 6) {
                        Text(t("create.your_stories"))
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .accessibilityAddTraits(.isHeader)
                        Spacer(minLength: Theme.Spacing.sm)
                        ForEach(Filter.allCases, id: \.self) { option in
                            Chip(t(option.labelKey), selected: filter == option) {
                                filter = option
                            }
                        }
                    }
                    .padding(.top, 32)
                    .padding(.bottom, 6)

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
            }
            .padding(.horizontal, Theme.pageGutter)
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

    private var statusLabel: String {
        title.isPublished ? t(title.visibility.labelKey) : t("create.status_draft")
    }

    /// Design v3: a plain row like Library's: the cover (or an empty one),
    /// the title, a small filled status tag, then the numbers or how far along.
    var body: some View {
        Button(action: onEdit) {
            HStack(alignment: .top, spacing: 14) {
                // The cover, when they have chosen one. A row that will not
                // show the picture somebody just uploaded is how you conclude
                // the upload failed.
                Group {
                    if let cover = title.coverImage, !cover.isEmpty {
                        RemoteImage(cover.assetKeyURL) { Theme.Colors.bgRaised }
                    } else {
                        Theme.Colors.bgRaised
                    }
                }
                .frame(width: 56, height: 84)
                .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))

                VStack(alignment: .leading, spacing: 5) {
                    Text(title.title.isEmpty ? t("create.untitled") : title.title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                    Text(statusLabel.uppercased())
                        .font(.system(size: 11, weight: .semibold))
                        .kerning(0.4)
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 5, style: .continuous))
                    HStack(spacing: Theme.Spacing.md) {
                        if title.isPublished {
                            metric("play.fill", title.runs, t("create.metric_plays"))
                            metric("heart.fill", title.likes, t("create.metric_likes"))
                            metric("bubble.left.fill", title.comments, t("create.metric_comments"))
                        } else {
                            Text(title.ready ? t("create.ready_to_publish") : t("create.keep_going"))
                                .font(.system(size: 13))
                                .foregroundStyle(Theme.Colors.textMuted)
                        }
                    }
                }
                .padding(.top, 4)
                Spacer(minLength: 0)
            }
            .padding(.vertical, 10)
            .contentShape(Rectangle())
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
