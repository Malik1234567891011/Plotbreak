import SwiftUI

// MARK: - CommentsView
//
// Twin of `apps/mobile/src/components/Comments.tsx`.
//
// What people thought of the world — about the **world**, never about one run.
// Two players of the same world have had completely different hours in it, so
// a thread pinned to one canon outcome would be wrong for most readers.
//
// Spoilers are collapsed, not blurred: a box that says "spoiler, tap to read"
// leaks nothing and is one tap to open.
//
// Guests read freely and post never. The sign-in line appears where the box
// would be, so the door is visible rather than the feature being hidden.

enum CommentsVariant {
    /// A few cards sideways under a story, and a way in.
    case preview
    /// The whole section, on its own screen.
    case full
}

struct CommentsView: View {
    let storyId: String
    let signedIn: Bool
    var variant: CommentsVariant = .full
    var onSeeAll: (() -> Void)? = nil
    let onSignIn: () -> Void

    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t

    @State private var sort: CommentSort = .TOP
    @State private var comments: [CommentView] = []
    @State private var draft = ""
    @State private var spoiler = false
    @State private var revealed: Set<String> = []
    @State private var posting = false
    @State private var error: String?

    init(storyId: String, signedIn: Bool, variant: CommentsVariant = .full,
         onSeeAll: (() -> Void)? = nil, onSignIn: @escaping () -> Void) {
        self.storyId = storyId
        self.signedIn = signedIn
        self.variant = variant
        self.onSeeAll = onSeeAll
        self.onSignIn = onSignIn
    }

    var body: some View {
        Group {
            switch variant {
            case .preview: preview
            case .full: full
            }
        }
        .task(id: sort) { await load(sort) }
    }

    // MARK: Preview

    private var preview: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            HStack {
                Txt(t("story.comments_heading"), .h3)
                Spacer(minLength: Theme.Spacing.md)
                if !comments.isEmpty {
                    Button { onSeeAll?() } label: {
                        Txt(t("story.comments_see_all", ["count": comments.count]), .caption, color: Theme.Colors.accentPrimary)
                    }
                    .buttonStyle(PressOpacityStyle())
                }
            }

            if comments.isEmpty {
                Txt(t("story.comments_empty"), .bodyCompact, color: Theme.Colors.textMuted)
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(alignment: .top, spacing: Theme.Spacing.md) {
                        ForEach(comments.prefix(6)) { comment in
                            let hidden = comment.spoiler && !revealed.contains(comment.commentId)
                            Button { onSeeAll?() } label: {
                                Card {
                                    VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                        HStack {
                                            Txt(comment.authorName, .bodyStrong, lineLimit: 1)
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                            Txt(postedAgo(comment.createdAt), .micro, color: Theme.Colors.textMuted)
                                        }
                                        // A spoiler stays hidden here. Tapping opens the full
                                        // screen, which is where revealing one belongs.
                                        Txt(hidden ? t("story.comment_spoiler_hidden") : comment.body, .bodyCompact,
                                            color: hidden ? Theme.Colors.textMuted : Theme.Colors.textPrimary, lineLimit: 3)
                                        Txt(t("story.comment_likes", ["count": comment.likes]), .micro, color: Theme.Colors.textMuted)
                                    }
                                    .frame(maxWidth: .infinity, minHeight: 96, alignment: .topLeading)
                                }
                                .frame(width: 250)
                            }
                            .buttonStyle(PressOpacityStyle(pressed: 0.8))
                        }
                    }
                }
                .railWidth()
            }

            if !signedIn {
                Button(action: onSignIn) {
                    Txt(t("story.comment_sign_in"), .caption, color: Theme.Colors.accentPrimary)
                }
                .buttonStyle(PressOpacityStyle())
            }
        }
    }

    // MARK: Full

    private var full: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                    HStack {
                        Txt(t("story.comments_heading"), .h3)
                        Spacer(minLength: Theme.Spacing.md)
                        if comments.count > 3 {
                            HStack(spacing: Theme.Spacing.sm) {
                                Chip(t("story.comment_sort_top"), selected: sort == .TOP) { sort = .TOP }
                                Chip(t("story.comment_sort_new"), selected: sort == .NEW) { sort = .NEW }
                            }
                        }
                    }

                    if comments.isEmpty {
                        Txt(t("story.comments_empty"), .bodyCompact, color: Theme.Colors.textMuted)
                    } else {
                        ForEach(comments) { comment in
                            commentCard(comment)
                        }
                    }
                }
                .padding(.bottom, Theme.Spacing.xl)
            }
            .scrollDismissesKeyboard(.interactively)

            // The composer, pinned. A comment bar belongs at the bottom, the
            // way every other one does.
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                PBDivider()
                if signedIn {
                    composer
                } else {
                    Button(action: onSignIn) {
                        Txt(t("story.comment_sign_in"), .bodyCompact, color: Theme.Colors.accentPrimary)
                    }
                    .buttonStyle(PressOpacityStyle())
                    .padding(.top, Theme.Spacing.xs)
                }
            }
            .padding(.top, Theme.Spacing.xs)
            .background(Theme.Colors.bgBase)
        }
    }

    private var composer: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            TextField(text: $draft, prompt: Text(t("story.comment_placeholder")).foregroundStyle(Theme.Colors.textMuted), axis: .vertical) {
                Text(t("story.comment_placeholder"))
            }
            .lineLimit(2...6)
            .font(.system(size: 15))
            .foregroundStyle(Theme.Colors.textPrimary)
            .tint(Theme.Colors.accentPrimary)
            .padding(Theme.Spacing.md)
            .frame(minHeight: 64, alignment: .top)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
            .onChange(of: draft) { _, next in
                if next.count > 1000 { draft = String(next.prefix(1000)) }
            }

            HStack(spacing: Theme.Spacing.md) {
                Chip(t("story.comment_spoiler_toggle"), selected: spoiler) { spoiler.toggle() }
                Spacer(minLength: 0)
                PBButton(t("story.comment_post"), variant: .secondary, full: false,
                         disabled: draft.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || posting) {
                    Task { await post() }
                }
            }

            if let error {
                Txt(error, .caption, color: Theme.Colors.danger)
            }
        }
    }

    @ViewBuilder
    private func commentCard(_ comment: CommentView) -> some View {
        let hidden = comment.spoiler && !revealed.contains(comment.commentId)
        Card {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                HStack {
                    Txt(comment.authorName, .bodyStrong)
                    Spacer(minLength: Theme.Spacing.md)
                    Txt(postedAgo(comment.createdAt), .micro, color: Theme.Colors.textMuted)
                }

                if hidden {
                    Button {
                        revealed.insert(comment.commentId)
                    } label: {
                        Txt(t("story.comment_spoiler_hidden"), .caption, color: Theme.Colors.textMuted, center: true)
                            .padding(Theme.Spacing.md)
                            .frame(maxWidth: .infinity)
                            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t("story.comment_spoiler_hidden"))
                } else {
                    Txt(comment.body, .body)
                }

                HStack(spacing: Theme.Spacing.lg) {
                    Button {
                        toggleLike(comment)
                    } label: {
                        HStack(spacing: Theme.Spacing.xs) {
                            Txt(comment.likedByMe ? "♥" : "♡", .caption,
                                color: comment.likedByMe ? Theme.Colors.accentPrimary : Theme.Colors.textMuted)
                            Txt(String(comment.likes), .caption, color: Theme.Colors.textMuted)
                        }
                    }
                    .buttonStyle(PressOpacityStyle())
                    .disabled(!signedIn)
                    .accessibilityLabel(t("story.like"))
                    .accessibilityAddTraits(comment.likedByMe ? .isSelected : [])

                    if comment.mine {
                        Button {
                            delete(comment)
                        } label: {
                            Txt(t("story.comment_delete"), .caption, color: Theme.Colors.textMuted)
                        }
                        .buttonStyle(PressOpacityStyle())
                    } else if signedIn {
                        Button {
                            Task { _ = try? await store.api.reportComment(comment.commentId, reason: "USER_REPORT") }
                        } label: {
                            Txt(t("story.comment_report"), .caption, color: Theme.Colors.textMuted)
                        }
                        .buttonStyle(PressOpacityStyle())
                    }
                }
                .padding(.top, Theme.Spacing.xs)
            }
        }
    }

    // MARK: Actions

    private func load(_ which: CommentSort) async {
        guard let response = try? await store.api.comments(storyId, sort: which) else { return }
        comments = response.comments
    }

    private func post() async {
        let body = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !body.isEmpty, !posting else { return }
        posting = true
        error = nil
        defer { posting = false }
        do {
            _ = try await store.api.postComment(storyId, body: body, spoiler: spoiler)
            draft = ""
            spoiler = false
            // Newest first, so they can see the thing they just wrote. Posting
            // into a Top-sorted list and having it not appear reads as a failure.
            if sort == .NEW {
                await load(.NEW)
            } else {
                sort = .NEW // `.task(id: sort)` reloads.
            }
        } catch {
            self.error = t("story.comment_rate_limited")
        }
    }

    private func toggleLike(_ comment: CommentView) {
        let next = !comment.likedByMe
        comments = comments.map { current in
            guard current.commentId == comment.commentId else { return current }
            var updated = current
            updated.likedByMe = next
            updated.likes += next ? 1 : -1
            return updated
        }
        Task {
            do { _ = try await store.api.likeComment(comment.commentId, liked: next) }
            catch { await load(sort) }
        }
    }

    private func delete(_ comment: CommentView) {
        comments.removeAll { $0.commentId == comment.commentId }
        Task {
            do { _ = try await store.api.deleteComment(comment.commentId) }
            catch { await load(sort) }
        }
    }

    /// How long ago, in the coarsest unit that is still true. Keys and ICU
    /// plurals, so the word order and the preposition live in the catalogue.
    private func postedAgo(_ iso: String) -> String {
        let posted = Format.parseISO(iso) ?? Date()
        let seconds = max(0, Int((Date().timeIntervalSince(posted)).rounded()))
        let units: [(TranslationKey, Int)] = [
            ("story.posted_years", 31_536_000),
            ("story.posted_months", 2_592_000),
            ("story.posted_weeks", 604_800),
            ("story.posted_days", 86_400),
            ("story.posted_hours", 3_600),
            ("story.posted_minutes", 60),
        ]
        for (key, size) in units where seconds >= size {
            return t(key, ["count": seconds / size])
        }
        return t("story.posted_now")
    }
}
