import SwiftUI

// MARK: - Timeline (WS-07 / WS-08 — the canon memory inspector, §11.7)

struct WorldSheetTimelineTab: View {
    let entries: [TimelineEntry]
    let sessionId: String
    let storyTitle: String
    let onRefresh: ([TimelineEntry]) -> Void

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var forking = false
    @State private var notice: String?
    // WS-08 / §11.8 — the id being corrected, and what the player says it was.
    @State private var correcting: String?
    @State private var correction = ""
    @State private var submitting = false
    // WS-07 — which entry is mid-pin, so the row cannot be double-tapped.
    @State private var pinning: String?
    @FocusState private var correctionFocused: Bool

    var body: some View {
        if entries.isEmpty {
            EmptyState(title: t("worldsheet.timeline_empty_title"), message: t("worldsheet.timeline_empty_body"))
        } else {
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                if let notice {
                    Card {
                        Txt(notice, .bodyCompact)
                    }
                    .overlay {
                        RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                            .strokeBorder(Theme.Colors.warning, lineWidth: 0.5)
                    }
                }

                ForEach(entries.reversed()) { entry in
                    entryCard(entry)
                }

                Txt(t("worldsheet.correction_explainer"), .micro, color: Theme.Colors.textMuted)
                Txt(t("worldsheet.fork_explainer"), .micro, color: Theme.Colors.textMuted)
            }
        }
    }

    @ViewBuilder
    private func entryCard(_ entry: TimelineEntry) -> some View {
        Card {
            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                HStack {
                    Chip(entry.group.rawValue)
                    Spacer(minLength: Theme.Spacing.sm)
                    if !entry.worldTimeLabel.isEmpty {
                        Txt(entry.worldTimeLabel, .micro, color: Theme.Colors.textMuted)
                    }
                }
                Txt(entry.text, .bodyCompact)

                FlowLayout(spacing: Theme.Spacing.md) {
                    // WS-07 — pinning is how a player says which moments the story
                    // must not lose. Retrieval weights them higher, so it changes
                    // what gets remembered rather than only how it is labelled.
                    if entry.correctable {
                        textButton(
                            entry.pinned ? t("worldsheet.pinned_canon_star") : t("worldsheet.pin_action"),
                            color: entry.pinned ? Theme.Colors.accentPrimary : Theme.Colors.textSecondary,
                            a11y: t(entry.pinned ? "worldsheet.unpin_a11y" : "worldsheet.pin_a11y", ["text": entry.text]),
                            disabled: pinning == entry.id
                        ) {
                            Task { await togglePin(entry) }
                        }
                        .accessibilityAddTraits(entry.pinned ? .isSelected : [])
                    } else if entry.pinned {
                        Chip(t("worldsheet.pinned_canon"), tone: .accent)
                    }

                    // WS-08 — the engine's own decisions are not opinions, so only
                    // generated canon carries this. It is free: a contradiction the
                    // system produced is not something to charge for.
                    if entry.correctable {
                        textButton(
                            correcting == entry.id ? t("worldsheet.cancel") : t("worldsheet.this_is_wrong"),
                            color: Theme.Colors.textSecondary,
                            a11y: t("worldsheet.correct_a11y", ["text": entry.text])
                        ) {
                            notice = nil
                            let closing = correcting == entry.id
                            correction = closing ? "" : entry.text
                            correcting = closing ? nil : entry.id
                            correctionFocused = !closing
                        }
                    }

                    // WS-07 — share the moment, spoiler-safe, from where it sits.
                    textButton(t("worldsheet.share"), color: Theme.Colors.textSecondary, a11y: t("worldsheet.share_a11y", ["text": entry.text])) {
                        router.present(.share(
                            storyId: nil,
                            storyTitle: storyTitle,
                            actionText: entry.group == .CHOICE ? entry.text : nil,
                            sceneText: entry.text,
                            heroImageUrl: nil,
                            displayName: nil
                        ))
                    }

                    if entry.forkable {
                        textButton(t("worldsheet.fork_from_here"), color: Theme.Colors.accentPrimary, a11y: t("worldsheet.fork_a11y"), disabled: forking) {
                            Task { await fork(entry) }
                        }
                    }
                }
                .padding(.top, Theme.Spacing.xs)

                if correcting == entry.id {
                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        TextField("", text: $correction, prompt: Text(t("worldsheet.correction_placeholder")).foregroundStyle(Theme.Colors.textMuted), axis: .vertical)
                            .lineLimit(3...8)
                            .font(.system(size: 16))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .padding(Theme.Spacing.md)
                            .frame(minHeight: 76, alignment: .top)
                            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                            .focused($correctionFocused)
                            .accessibilityLabel(t("worldsheet.correction_a11y"))
                            .onChange(of: correction) { _, value in
                                if value.count > 400 { correction = String(value.prefix(400)) }
                            }
                        PBButton(
                            t("worldsheet.fix_it"),
                            loadingLabel: t("worldsheet.checking"),
                            size: .medium,
                            loading: submitting,
                            disabled: correction.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                        ) {
                            Task { await submitCorrection(entry.id) }
                        }
                    }
                    .padding(.top, Theme.Spacing.sm)
                }
            }
        }
    }

    private func textButton(_ label: String, color: Color, a11y: String, disabled: Bool = false, action: @escaping () -> Void) -> some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            Txt(label, .caption, color: color)
                .padding(.vertical, Theme.Spacing.xs)
                .contentShape(Rectangle())
        }
        .buttonStyle(PressOpacityStyle())
        .disabled(disabled)
        .accessibilityLabel(a11y)
    }

    // MARK: Actions

    private func togglePin(_ entry: TimelineEntry) async {
        notice = nil
        pinning = entry.id
        defer { pinning = nil }
        do {
            let result = try await store.api.pinTimelineEntry(sessionId, factId: entry.id, pinned: !entry.pinned)
            onRefresh(entries.map { item in
                var copy = item
                if copy.id == entry.id { copy.pinned = result.pinned }
                return copy
            })
            notice = t(result.pinned ? "worldsheet.pinned_notice" : "worldsheet.unpinned_notice")
        } catch {
            notice = t("worldsheet.pin_failed")
        }
    }

    private func submitCorrection(_ factId: String) async {
        let text = correction.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }
        submitting = true
        defer { submitting = false }
        do {
            let response = try await store.api.correctCanon(sessionId, factId: factId, correctedText: text)
            if response.accepted {
                correcting = nil
                correction = ""
                notice = t("worldsheet.correction_accepted")
                if let refreshed = try? await store.api.timeline(sessionId) { onRefresh(refreshed.entries) }
            } else {
                // §11.8 — a correction that contradicts authoritative state is
                // refused with the reason, not silently dropped.
                notice = response.conflictExplanation ?? t("worldsheet.correction_conflict")
            }
        } catch {
            notice = t("worldsheet.correction_failed")
        }
    }

    private func fork(_ entry: TimelineEntry) async {
        forking = true
        defer { forking = false }
        do {
            let response = try await store.api.forkSession(sessionId, atTurnIndex: entry.turnIndex)
            let forkedId = response.session.sessionId
            router.dismissSheet()
            // RN does `navigation.replace('Session', …)`: the fork takes the
            // place of the session the sheet was opened from.
            if case .session = router.path.last {
                router.replaceTopWithSession(forkedId)
            } else {
                router.push(.session(sessionId: forkedId))
            }
        } catch {
            // Spec §10.8 — say what happened and what to do about it.
            // "Could not fork right now" tells the player neither.
            let api = error as? APIError
            if api?.isInsufficientCredits == true {
                notice = t("worldsheet.fork_insufficient_credits", ["count": api?.shortfall ?? 120])
            } else if api?.isOffline == true {
                notice = t("worldsheet.fork_offline")
            } else if api?.code == "NOT_FOUND" {
                notice = t("worldsheet.fork_not_found")
            } else {
                notice = t("worldsheet.fork_failed")
            }
        }
    }
}
