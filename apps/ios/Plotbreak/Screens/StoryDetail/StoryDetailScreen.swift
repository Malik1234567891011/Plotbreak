import SwiftUI

// MARK: - StoryDetailScreen
//
// ST-01 Story detail — twin of `apps/mobile/src/screens/StoryDetail.tsx`.
//
// Spec §8.1 — convert curiosity into the first turn while setting honest
// expectations. §8.3: one primary CTA in the first viewport, two taps to start,
// and content descriptors visible before entry.

struct StoryDetailScreen: View {
    let storyId: String

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var detail: StoryDetailResponse?
    @State private var loadError: String?
    @State private var saved = false
    @State private var liked = false
    @State private var likes = 0
    @State private var castMember: CastMember?
    @State private var scrollY: CGFloat = 0

    /// The key art is deliberately edge-to-edge under the status bar. Once the
    /// page scrolls past it, body content would otherwise run under the clock
    /// unclipped, so a scrim fades in to give the status bar something opaque
    /// to sit on. Matches RN's `interpolate([0, 160, 220] → [0, 0, 1])`.
    private var scrimOpacity: Double {
        min(1, max(0, (scrollY - 160) / 60))
    }

    var body: some View {
        Screen {
            if let detail {
                loaded(detail)
            } else if let loadError {
                VStack(spacing: Theme.Spacing.lg) {
                    ScreenHeader(backLabel: t("story.back")) { router.pop() }
                    InlineError(message: loadError)
                        .padding(.horizontal, Theme.gutter)
                    Spacer()
                }
            } else {
                skeleton
            }
        }
        .task(id: storyId) { await load() }
        .sheet(item: $castMember) { member in
            CastSheet(member: member) { castMember = nil }
                .environment(store)
                .environment(\.translator, t)
        }
    }

    // MARK: Loading

    private var skeleton: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            Skeleton(height: 220, radius: Theme.Radius.large)
            Skeleton(height: 28, radius: 6).frame(maxWidth: 260, alignment: .leading)
            Skeleton(height: 18, radius: 6).frame(maxWidth: 330, alignment: .leading)
            Skeleton(height: 50, radius: Theme.Radius.control)
            Spacer()
        }
        .padding(Theme.gutter)
    }

    private func load() async {
        do {
            let response = try await store.api.storyDetail(storyId)
            detail = response
            saved = response.story.saved
            liked = response.story.likedByMe
            likes = response.story.likes
        } catch {
            loadError = error.playerMessage
        }
    }

    // MARK: Loaded

    @ViewBuilder
    private func loaded(_ detail: StoryDetailResponse) -> some View {
        let story = detail.story

        GeometryReader { geo in
            ZStack(alignment: .top) {
                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        StoryArt(seed: story.storyId, title: story.title, uri: story.keyArt)
                            .aspectRatio(4 / 3, contentMode: .fit)
                            .frame(maxWidth: .infinity)

                        VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                            titleBlock(story)
                            ctaBlock(detail)
                            socialRow(story)
                            if !detail.sessions.isEmpty { sessionsBlock(detail.sessions) }
                            statsCard(detail.stats)

                            // A shelf, not the whole section — see `CommentsView`.
                            CommentsView(
                                storyId: story.storyId,
                                signedIn: !store.isGuest,
                                variant: .preview,
                                onSeeAll: { router.present(.comments(storyId: story.storyId)) },
                                onSignIn: { router.present(.signIn) }
                            )

                            mechanicsBlock(story)
                            premiseBlock(detail.premise)
                            if !detail.cast.isEmpty { castBlock(detail.cast) }
                            descriptorsBlock(story)
                            if !detail.creatorNote.isEmpty { creatorNote(detail.creatorNote) }
                            if !detail.related.isEmpty { relatedBlock(detail.related) }
                        }
                        .padding(Theme.gutter)
                        .padding(.top, -Theme.Spacing.xxl)
                    }
                    .padding(.bottom, Theme.Spacing.giant)
                    .background(
                        GeometryReader { inner in
                            Color.clear.preference(key: ScrollOffsetKey.self, value: -inner.frame(in: .named("storyDetailScroll")).minY)
                        }
                    )
                }
                .coordinateSpace(name: "storyDetailScroll")
                .ignoresSafeArea(edges: .top)
                .onPreferenceChange(ScrollOffsetKey.self) { scrollY = $0 }

                Theme.Colors.bgBase
                    .frame(height: geo.safeAreaInsets.top)
                    .offset(y: -geo.safeAreaInsets.top)
                    .opacity(scrimOpacity)
                    .allowsHitTesting(false)

                HStack {
                    IconButton(t("story.back"), action: { router.pop() }) {
                        Txt("‹", .h2)
                    }
                    Spacer()
                    HStack(spacing: Theme.Spacing.sm) {
                        IconButton(saved ? t("story.remove_from_saved") : t("story.save_story"), action: { toggleSaved(story) }) {
                            Txt(saved ? "★" : "☆", .h3, color: saved ? Theme.Colors.accentPrimary : Theme.Colors.textPrimary)
                        }
                        IconButton(t("story.report_story"), action: {
                            router.present(.report(targetType: "STORY", targetId: story.storyId))
                        }) {
                            Txt("⋯", .h3)
                        }
                    }
                }
                .padding(.horizontal, Theme.gutter)
            }
        }
    }

    // MARK: Sections

    private func titleBlock(_ story: StorySummary) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            HStack(spacing: Theme.Spacing.xs) {
                if story.official {
                    Chip(t("story.badge_official"), tone: .accent)
                } else {
                    Chip(t("story.badge_community"))
                }
            }
            Txt(story.title, .display)
            Txt(t("story.by_creator", ["name": story.creatorName]), .bodyCompact, color: Theme.Colors.textSecondary)
            Txt(story.hook, .body)
                .padding(.top, Theme.Spacing.sm)
        }
    }

    /// Spec §8.3 — one primary CTA above the fold, and exactly one.
    ///
    /// When there is a run to return to, Continue is that CTA and New session
    /// sits beside it as a secondary. Starting a new one leaves the old one
    /// entirely alone — they are separate rows, and the list below shows both.
    private func ctaBlock(_ detail: StoryDetailResponse) -> some View {
        let continuing = detail.activeSessionId != nil
        return VStack(spacing: Theme.Spacing.sm) {
            PBButton(continuing ? t("story.continue") : t("story.start"), haptic: .medium) {
                if let sessionId = detail.activeSessionId {
                    router.push(.session(sessionId: sessionId))
                } else {
                    router.push(.characterSetup(storyId: detail.story.storyId))
                }
            }
            if continuing {
                PBButton(t("story.new_session"), variant: .secondary) {
                    router.push(.characterSetup(storyId: detail.story.storyId))
                }
            }
        }
    }

    /// Like and comment count, together, because they answer the same
    /// question: is this worth my evening.
    private func socialRow(_ story: StorySummary) -> some View {
        HStack(spacing: Theme.Spacing.md) {
            Button {
                toggleLiked(story)
            } label: {
                HStack(spacing: Theme.Spacing.xs) {
                    Txt(liked ? "♥" : "♡", .h3, color: liked ? Theme.Colors.accentPrimary : Theme.Colors.textSecondary)
                    Txt(Format.credits(likes, compact: true, locale: store.locale), .bodyCompact, color: Theme.Colors.textSecondary)
                }
            }
            .buttonStyle(PressOpacityStyle())
            .accessibilityLabel(liked ? t("story.unlike") : t("story.like"))
            .accessibilityAddTraits(liked ? .isSelected : [])

            HStack(spacing: Theme.Spacing.xs) {
                Txt("\u{1F4AC}", .h3, color: Theme.Colors.textSecondary)
                Txt(Format.credits(story.comments, compact: true, locale: store.locale), .bodyCompact, color: Theme.Colors.textSecondary)
            }
        }
    }

    /// Every run of this world, newest first. Below the CTAs rather than beside
    /// them: somebody who wants to get back in taps Continue and never reads
    /// this, and somebody who wants a specific earlier run is looking for it.
    private func sessionsBlock(_ sessions: [StoryRun]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("story.sessions_heading"), .h3)
            ForEach(Array(sessions.enumerated()), id: \.element.sessionId) { index, session in
                Card {
                    HStack(alignment: .center, spacing: Theme.Spacing.md) {
                        VStack(alignment: .leading, spacing: 2) {
                            Txt(sessionLine(session), .bodyStrong)
                            HStack(spacing: Theme.Spacing.sm) {
                                if index == 0 { Chip(t("story.session_latest"), tone: .accent) }
                                if session.status == .COMPLETED { Chip(t("story.session_status_completed")) }
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        Button {
                            router.push(.session(sessionId: session.sessionId))
                        } label: {
                            Txt(t("story.session_resume"), .bodyStrong, color: Theme.Colors.accentPrimary)
                        }
                        .buttonStyle(PressOpacityStyle())
                        .accessibilityLabel(t("story.session_resume"))
                    }
                }
            }
        }
    }

    private func sessionLine(_ session: StoryRun) -> String {
        let date = Format.date(Format.parseISO(session.lastPlayedAt) ?? Date(), locale: store.locale, style: .short)
        if let location = session.locationName, !location.isEmpty {
            return t("story.session_line_where", ["count": session.turnCount, "where": location, "date": date])
        }
        return t("story.session_line", ["count": session.turnCount, "date": date])
    }

    /// Spec §8.2 item 6 — compact honest stats, no fake ratings.
    private func statsCard(_ stats: StoryStats) -> some View {
        Card {
            HStack {
                stat(t("story.stat_players"), Format.credits(stats.runs, compact: false, locale: store.locale))
                Spacer()
                stat(t("story.stat_shape"), shapeWord(stats.medianDepthLabel))
                Spacer()
                stat(t("story.stat_intensity"), intensityWord(stats.intensity))
            }
        }
    }

    private func stat(_ label: String, _ value: String) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Txt(label.uppercased(), .micro, color: Theme.Colors.textMuted)
            Txt(value, .bodyStrong)
        }
    }

    /// Spec §8.2 item 7 — what you can actually do here.
    private func mechanicsBlock(_ story: StorySummary) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("story.mechanics_heading"), .h3)
            FlowLayout(spacing: Theme.Spacing.sm) {
                ForEach(story.mechanicsChips, id: \.self) { chip in
                    Chip(chip, tone: .accent)
                }
            }
        }
    }

    /// A premise is 200+ words and it is the one thing a player reads before
    /// committing. Rendered as one block it is a wall nobody finishes, so the
    /// authored paragraph breaks get real spacing.
    private func premiseBlock(_ premise: String) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("story.premise_heading"), .h3)
            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                ForEach(Array(premise.paragraphs.enumerated()), id: \.offset) { _, paragraph in
                    Txt(paragraph, .body, color: Theme.Colors.textSecondary, serif: true)
                }
            }
        }
    }

    /// The carousel has to truncate, so the truncation has to be one tap from
    /// the whole thing. A face a player is curious about is the strongest
    /// signal they have about whether they want this world at all.
    private func castBlock(_ cast: [CastMember]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("story.cast_heading"), .h3)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: Theme.Spacing.lg) {
                    ForEach(cast) { member in
                        Button {
                            castMember = member
                        } label: {
                            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                CharacterPortrait(name: member.name, uri: member.portrait, size: 148)
                                Txt(member.name, .bodyCompact, lineLimit: 1)
                                // Story function leads; the job title is secondary.
                                Txt(member.cardBlurb.isEmpty ? member.role : member.cardBlurb, .caption,
                                    color: Theme.Colors.textSecondary, lineLimit: 3)
                                Txt(member.cardBlurb.isEmpty ? t("story.cast_tap_for_more") : member.role, .micro,
                                    color: Theme.Colors.textMuted, lineLimit: 1)
                            }
                            .frame(width: 148, alignment: .leading)
                        }
                        .buttonStyle(PressOpacityStyle(pressed: 0.8))
                        .accessibilityLabel(t("story.cast_a11y", ["name": member.name, "role": member.role]))
                    }
                }
            }
        }
    }

    /// Spec §8.3 — descriptors are visible before entry, never after.
    private func descriptorsBlock(_ story: StorySummary) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Txt(t("story.content_heading"), .h3)
            FlowLayout(spacing: Theme.Spacing.sm) {
                ForEach(story.contentDescriptors, id: \.self) { descriptor in
                    Chip(descriptorLabel(descriptor), tone: descriptor == .PERMANENT_DEATH ? .warning : .neutral)
                }
            }
        }
    }

    private func creatorNote(_ note: String) -> some View {
        Card {
            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                Txt(t("story.creator_note_heading"), .caption, color: Theme.Colors.textMuted)
                Txt(note, .bodyCompact, color: Theme.Colors.textSecondary)
            }
        }
    }

    private func relatedBlock(_ related: [StorySummary]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            PBDivider()
            Txt(t("story.related_heading"), .h3)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: Theme.Spacing.md) {
                    ForEach(related) { item in
                        StoryCoverCard(story: item, width: 140, locale: store.locale) {
                            router.push(.storyDetail(storyId: item.storyId))
                        }
                    }
                }
            }
        }
    }

    // MARK: Actions

    private func toggleSaved(_ story: StorySummary) {
        let previous = saved
        saved = !previous
        Task {
            do { _ = try await store.api.saveStory(story.storyId, saved: !previous) }
            catch { saved = previous }
        }
    }

    /// Optimistic, and reverted if the server disagrees. A like is the cheapest
    /// possible interaction and must feel instant.
    private func toggleLiked(_ story: StorySummary) {
        let next = !liked
        liked = next
        likes += next ? 1 : -1
        Task {
            do {
                let result = try await store.api.likeStory(story.storyId, liked: next)
                if let count = result.likes { likes = count }
            } catch {
                liked = !next
                likes += next ? -1 : 1
            }
        }
    }

    // MARK: Words

    /// Content descriptors — a France ratings surface, shown before entry (§8.3).
    /// The ids stay English on the wire; only the labels are localised, and
    /// those are ratings copy reviewed against PEGI FR's own wording. An
    /// unknown descriptor falls back to its id rather than disappearing.
    private func descriptorLabel(_ descriptor: ContentDescriptor) -> String {
        switch descriptor {
        case .FANTASY_VIOLENCE: return t("story.descriptor_fantasy_violence")
        case .ROMANCE: return t("story.descriptor_romance")
        case .SUGGESTIVE_THEMES: return t("story.descriptor_suggestive_themes")
        case .HORROR: return t("story.descriptor_horror")
        case .PSYCHOLOGICAL_THEMES: return t("story.descriptor_psychological_themes")
        case .ALCOHOL_REFERENCES: return t("story.descriptor_alcohol_references")
        case .LANGUAGE: return t("story.descriptor_strong_language")
        case .PERMANENT_DEATH: return t("story.descriptor_permanent_death")
        case .MORAL_AMBIGUITY: return t("story.descriptor_moral_ambiguity")
        case .UNKNOWN: return descriptor.rawValue
        }
    }

    /// The server still decides which shape and intensity it is; these decide
    /// what it is called, and an unrecognised value falls back to what was sent.
    private func shapeWord(_ label: String) -> String {
        if label == "Open-ended" { return t("story.shape_open_ended") }
        if label == "Episodic" { return t("story.shape_episodic") }
        return label
    }

    private func intensityWord(_ value: String) -> String {
        switch value.uppercased() {
        case "LIGHT": return t("story.intensity_light")
        case "MODERATE": return t("story.intensity_moderate")
        case "INTENSE": return t("story.intensity_intense")
        default: return value.prefix(1) + value.dropFirst().lowercased()
        }
    }
}

// MARK: - CastSheet
//
// A cast member, in full. Everything shown here is public: what they are to
// the player, what they are known for, what they look like. Nothing from
// `hiddenDrives`, `secrets` or `goals` reaches this screen — meeting someone
// should still be how you find out who they are.

private struct CastSheet: View {
    let member: CastMember
    let onClose: () -> Void

    @Environment(\.translator) private var t

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                HStack(alignment: .top, spacing: Theme.Spacing.lg) {
                    CharacterPortrait(name: member.name, uri: member.portrait, size: 124)
                    VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                        Txt(member.name, .h2, lineLimit: 2)
                        Txt(member.role, .caption, color: Theme.Colors.textSecondary)
                        if !member.pronouns.isEmpty {
                            Txt(member.pronouns, .micro, color: Theme.Colors.textMuted)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }

                if !member.cardBlurb.isEmpty {
                    Txt(member.cardBlurb, .body)
                }

                if !member.publicTraits.isEmpty {
                    FlowLayout(spacing: Theme.Spacing.sm) {
                        ForEach(member.publicTraits, id: \.self) { trait in
                            Chip(trait)
                        }
                    }
                }

                if !member.appearance.isEmpty {
                    Txt(member.appearance, .caption, color: Theme.Colors.textSecondary)
                }

                PBButton(t("story.close"), variant: .secondary, action: onClose)
            }
            .padding(Theme.gutter)
            .padding(.top, Theme.Spacing.sm)
            .padding(.bottom, Theme.Spacing.xxl)
        }
        .preferredColorScheme(.dark)
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
        .presentationBackground(Theme.Colors.bgRaised)
    }
}

// MARK: - Helpers

private struct ScrollOffsetKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) { value = nextValue() }
}
