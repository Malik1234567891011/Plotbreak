import SwiftUI

// MARK: - Story requests (Plotbreak Pass)
//
// The board Pass holders pitch stories on and vote. Everybody can read it,
// which is the point of showing it to non-holders: the requests are the pitch.
// The most-voted request each month is the one we make.

struct StoryRequestsScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var board: StoryRequestsResponse?
    @State private var draft = ""
    @State private var sending = false
    @State private var notice: String?
    /// Request ids with a vote in flight, so a double tap is one vote.
    @State private var voting: Set<String> = []

    private let maxChars = 280

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                ScreenHeader(title: t("requests.title"), backLabel: t("wallet.close"), onBack: { router.dismissSheet() })
                    .overlay(alignment: .bottom) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                        Txt(t("requests.intro"), .bodyCompact, color: Theme.Colors.textSecondary)
                        compose
                        if let notice {
                            Txt(notice, .caption, color: Theme.Colors.textSecondary)
                                .accessibilityAddTraits(.updatesFrequently)
                        }
                        list
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, Theme.Spacing.lg)
                    .padding(.bottom, Theme.Spacing.xxl)
                }
            }
        }
        .task { await load() }
    }

    // MARK: Sections

    @ViewBuilder
    private var compose: some View {
        if let board {
            if !board.canParticipate {
                Card {
                    Txt(t("requests.join"), .bodyCompact)
                }
            } else if let next = board.nextRequestAt {
                Txt(t("requests.cooldown", ["when": relativeTime(next)]), .caption, color: Theme.Colors.textMuted)
            } else {
                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    TextField(t("requests.placeholder"), text: $draft, axis: .vertical)
                        .lineLimit(3...6)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .padding(Theme.Spacing.md)
                        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
                        .overlay {
                            RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                                .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
                        }
                        .onChange(of: draft) { _, value in
                            if value.count > maxChars { draft = String(value.prefix(maxChars)) }
                        }
                    Txt(t("requests.chars_left", ["count": maxChars - draft.count]), .micro, color: Theme.Colors.textMuted)
                    PBButton(
                        t("requests.submit"),
                        loadingLabel: t("requests.sending"),
                        variant: .light,
                        loading: sending,
                        disabled: draft.trimmingCharacters(in: .whitespacesAndNewlines).count < 10
                    ) {
                        Task { await submit() }
                    }
                }
            }
        } else {
            Skeleton(height: 56)
        }
    }

    @ViewBuilder
    private var list: some View {
        if let board {
            if board.requests.isEmpty {
                Txt(t("requests.empty"), .bodyCompact, color: Theme.Colors.textMuted)
            }
            ForEach(board.requests) { request in
                row(request, canVote: board.canParticipate)
            }
        } else {
            ForEach(0..<3, id: \.self) { _ in Skeleton(height: 72) }
        }
    }

    private func row(_ request: StoryRequest, canVote: Bool) -> some View {
        HStack(alignment: .top, spacing: Theme.Spacing.md) {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                Txt(request.body, .bodyCompact)
                HStack(spacing: Theme.Spacing.sm) {
                    if request.mine {
                        Txt(t("requests.mine"), .micro, color: Theme.Colors.accentPrimary)
                    } else if let author = request.author {
                        Txt(t("requests.by", ["name": author]), .micro, color: Theme.Colors.textMuted)
                    }
                    if request.status == .PLANNED {
                        Txt(t("requests.planned"), .micro, color: Theme.Colors.success)
                    }
                }
            }
            Spacer(minLength: Theme.Spacing.sm)
            Button {
                Haptic.play(.light)
                Task { await vote(request) }
            } label: {
                VStack(spacing: 2) {
                    Text(request.votedByMe ? "▲" : "△")
                        .font(.system(size: 15))
                        .foregroundStyle(request.votedByMe ? Theme.Colors.accentPrimary : Theme.Colors.textSecondary)
                    Text(t("requests.votes", ["count": request.votes]))
                        .font(.system(size: 11))
                        .foregroundStyle(Theme.Colors.textMuted)
                }
                .frame(minWidth: Theme.minTouchTarget, minHeight: Theme.minTouchTarget)
            }
            .buttonStyle(PressOpacityStyle())
            .disabled(!canVote || voting.contains(request.id))
            .accessibilityLabel(request.votedByMe ? t("requests.voted") : t("requests.vote"))
        }
        .padding(.vertical, Theme.Spacing.sm)
        .overlay(alignment: .bottom) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }
    }

    // MARK: Actions

    private func load() async {
        do {
            board = try await store.api.storyRequests()
        } catch {
            notice = error.playerMessage
        }
    }

    private func submit() async {
        sending = true
        defer { sending = false }
        do {
            try await store.api.createStoryRequest(draft.trimmingCharacters(in: .whitespacesAndNewlines))
            Haptic.play(.success)
            draft = ""
            notice = t("requests.sent")
            await load()
        } catch {
            Haptic.play(.error)
            notice = error.playerMessage
        }
    }

    private func vote(_ request: StoryRequest) async {
        voting.insert(request.id)
        defer { voting.remove(request.id) }
        do {
            try await store.api.voteStoryRequest(request.id, voted: !request.votedByMe)
            await load()
        } catch {
            notice = error.playerMessage
        }
    }

    /// Hours or days, never a timestamp. Mirrors `WalletScreen.relativeTime`.
    private func relativeTime(_ iso: String) -> String {
        guard let date = Format.parseISO(iso) else { return t("wallet.time_now") }
        let diff = date.timeIntervalSinceNow
        if diff <= 0 { return t("wallet.time_now") }
        let hours = Int(diff / 3600)
        if hours < 1 { return t("wallet.time_in_minutes", ["count": max(1, Int(diff / 60))]) }
        if hours < 24 { return t("wallet.time_in_hours", ["count": hours]) }
        return t("wallet.time_in_days", ["count": max(1, hours / 24)])
    }
}
