import SwiftUI

// MARK: - Library
//
// LB-01 / LB-02 — the player's runs, continue or manage. Twin of
// `LibraryScreen` in `apps/mobile/src/screens/LibraryProfile.tsx`.

struct LibraryScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var sessions: [SessionSummary]?
    @State private var managing: SessionSummary?
    @State private var errorMessage: String?
    @State private var confirmDelete: SessionSummary?
    @State private var forkFailed = false

    private var active: [SessionSummary] { sessions?.filter { $0.status == .ACTIVE } ?? [] }
    private var finished: [SessionSummary] { sessions?.filter { $0.status != .ACTIVE } ?? [] }

    var body: some View {
        Screen {
            ZStack(alignment: .bottom) {
                VStack(spacing: 0) {
                    TabHeader(t("library.title")) {
                        IconButton(t("discover.search_worlds"), action: { router.present(.search) }) {
                            Image(systemName: "magnifyingglass")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.Colors.textPrimary)
                                .frame(width: 36, height: 36)
                                .background(Theme.Colors.bgRaised, in: Circle())
                        }
                    }

                    content
                }

                // LB-02 — destructive actions always confirm.
                if let managing {
                    manageSheet(managing)
                }
            }
        }
        .task { await load() }
        // Returning from a session, or a sheet closing, counts as focus.
        .onChange(of: router.path.isEmpty) { _, empty in if empty { Task { await load() } } }
        .onChange(of: router.sheet) { _, sheet in if sheet == nil { Task { await load() } } }
        .onChange(of: store.isGuest) { _, _ in Task { await load() } }
        .alert(
            t("library.delete_confirm_title"),
            isPresented: Binding(get: { confirmDelete != nil }, set: { if !$0 { confirmDelete = nil } }),
            presenting: confirmDelete
        ) { target in
            Button(t("library.delete_keep"), role: .cancel) {}
            Button(t("library.delete_confirm"), role: .destructive) {
                managing = nil
                Task {
                    _ = try? await store.api.deleteSession(target.sessionId)
                    await load()
                }
            }
        } message: { target in
            Text(t("library.delete_confirm_body", ["title": target.title, "count": target.turnCount]))
        }
        .alert(t("library.fork_failed_title"), isPresented: $forkFailed) {} message: {
            Text(t("library.fork_failed_body"))
        }
    }

    @ViewBuilder
    private var content: some View {
        if let errorMessage, sessions == nil {
            EmptyState(
                title: t("library.load_failed_title"),
                message: errorMessage,
                actionLabel: t("library.try_again"),
                action: { Task { await load() } }
            )
            Spacer(minLength: 0)
        } else if let sessions, sessions.isEmpty {
            EmptyState(
                title: t("library.no_worlds_yet"),
                message: t("library.no_worlds_body"),
                actionLabel: t("library.browse_worlds"),
                action: { router.tab = .discover }
            )
            Spacer(minLength: 0)
        } else {
            ScrollView {
                VStack(alignment: .leading, spacing: 32) {
                    if sessions == nil {
                        ForEach(0..<3, id: \.self) { _ in Skeleton(height: 84) }
                    }
                    if !active.isEmpty {
                        section(t("library.section_active"), active)
                    }
                    if !finished.isEmpty {
                        section(t("library.section_finished"), finished)
                    }
                }
                .padding(.horizontal, Theme.pageGutter)
                .padding(.top, Theme.Spacing.sm)
                .padding(.bottom, Theme.Spacing.giant)
            }
        }
    }

    private func section(_ title: String, _ items: [SessionSummary]) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(title.sentenceCased)
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
                .padding(.bottom, 4)
            ForEach(items) { session in
                SessionCard(
                    session: session,
                    onPress: { router.push(.session(sessionId: session.sessionId)) },
                    onManage: { managing = session }
                )
            }
        }
    }

    private func manageSheet(_ target: SessionSummary) -> some View {
        ZStack(alignment: .bottom) {
            Theme.Colors.scrim
                .ignoresSafeArea()
                .contentShape(Rectangle())
                .onTapGesture { managing = nil }
                .accessibilityLabel(t("library.close_sheet"))
                .accessibilityAddTraits(.isButton)

            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                Txt(target.title, .h3)
                Txt(
                    t("library.run_started", ["count": target.turnCount, "date": Format.shortISODate(target.createdAt, locale: store.locale)]),
                    .caption, color: Theme.Colors.textMuted
                )
                PBButton(t("library.fork_run"), variant: .secondary) {
                    let id = target.sessionId
                    managing = nil
                    Task {
                        do {
                            let response = try await store.api.forkSession(id)
                            router.push(.session(sessionId: response.session.sessionId))
                        } catch {
                            forkFailed = true
                        }
                    }
                }
                PBButton(t("library.delete_run"), variant: .danger, haptic: .warning) {
                    confirmDelete = target
                }
            }
            .padding(Theme.gutter)
            .padding(.bottom, Theme.Spacing.sm)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                Theme.Colors.bgElevated,
                in: UnevenRoundedRectangle(topLeadingRadius: Theme.Radius.large, topTrailingRadius: Theme.Radius.large, style: .continuous)
            )
        }
        .transition(.opacity)
        .animation(.easeOut(duration: Theme.Durations.short), value: managing)
    }

    private func load() async {
        do {
            let response = try await store.api.listSessions()
            sessions = response.sessions
            errorMessage = nil
        } catch {
            // Not `sessions = []`. A request that failed is not a library with
            // nothing in it, and telling somebody with ten runs "No worlds yet"
            // reads as "your saves are gone".
            if let api = error as? APIError {
                errorMessage = api.isOffline ? t("library.offline") : api.message
            } else {
                errorMessage = t("library.load_failed_body")
            }
        }
    }
}

// MARK: - SessionCard

private struct SessionCard: View {
    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    let session: SessionSummary
    let onPress: () -> Void
    let onManage: () -> Void

    /// "as Ren · Turn 3 · 2 h ago", the board's line under the title.
    private var meta: String {
        var parts: [String] = []
        // `playingAs` is what the story calls you; an older server only has
        // the run's label, which carries " (fork)" on a fork.
        let name = session.playingAs ?? session.displayName
        if !name.isEmpty { parts.append(t("library.playing_as", ["name": name])) }
        parts.append(t("discover.continue_turns_in", ["count": session.turnCount]))
        if let date = ISO8601.date(from: session.lastPlayedAt) {
            parts.append(Format.relative(date, locale: store.locale))
        } else {
            parts.append(Format.shortISODate(session.lastPlayedAt, locale: store.locale))
        }
        return parts.joined(separator: " · ")
    }

    /// Design v3: a plain row, the cover at 2:3 with an 8pt corner, the
    /// title, then who you are and how far in, then the last thing somebody
    /// said beside their face, or the recap when nobody has spoken lately. A
    /// server that sends neither gets the row without a line.
    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            StoryArt(seed: session.storyId, title: session.title, uri: session.coverImage)
                .frame(width: 56, height: 84)
                .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))

            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 8) {
                    Text(session.title)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .lineLimit(1)
                    if session.forkedFromSessionId != nil {
                        Text(t("library.fork_badge"))
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textSecondary)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 5, style: .continuous))
                    }
                }
                Text(meta)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .lineLimit(2)
                if let spoken = session.lastLine {
                    SpeakerLineView(line: spoken)
                        .padding(.top, 5)
                } else if let recap = session.recapLine, !recap.isEmpty {
                    Text(recap)
                        .font(.system(size: 15, design: .serif))
                        .lineSpacing(4)
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .lineLimit(2)
                        .padding(.top, 5)
                }
            }
            .padding(.top, 6)
            .frame(maxWidth: .infinity, alignment: .leading)

            IconButton(t("library.manage_run"), glyph: "⋯", color: Theme.Colors.textMuted, action: onManage)
        }
        .padding(.vertical, 10)
        .contentShape(Rectangle())
        .onTapGesture {
            Haptic.play(.light)
            onPress()
        }
        .onLongPressGesture {
            Haptic.play(.medium)
            onManage()
        }
        .accessibilityElement(children: .contain)
        .accessibilityLabel(t("library.session_card_a11y", ["title": session.title, "count": session.turnCount]))
        .accessibilityAddTraits(.isButton)
    }
}
