import SwiftUI

// MARK: - StoryDetailScreen
//
// ST-01 Story detail — twin of `apps/mobile/src/screens/StoryDetail.tsx`.
//
// Spec §8.1 — convert curiosity into the first turn while setting honest
// expectations. §8.3: one primary CTA in the first viewport, two taps to start,
// and content descriptors visible before entry.

private enum DetailTab: CaseIterable {
    case information, comments
}

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
    @State private var tab: DetailTab = .information
    /// The world whose creator is about to be blocked. Confirmed first, because
    /// blocking removes everything they have made from this person's app, and
    /// they should not find that out by having already done it.
    @State private var blockTarget: StorySummary?

    var body: some View {
        Screen {
            GeometryReader { geo in
                VStack(spacing: 0) {
                    header
                    tabs
                    if let detail {
                        loaded(detail, width: geo.size.width)
                    } else if let loadError {
                        InlineError(message: loadError)
                            .padding(Theme.pageGutter)
                        Spacer()
                    } else {
                        skeleton
                    }
                }
            }
        }
        .task(id: storyId) { await load() }
        .sheet(item: $castMember) { member in
            CastSheet(member: member) { castMember = nil }
                .environment(store)
                .environment(\.translator, t)
        }
        .alert(
            t("story.block_creator_title", ["name": blockTarget?.creatorName ?? ""]),
            isPresented: Binding(get: { blockTarget != nil }, set: { if !$0 { blockTarget = nil } })
        ) {
            Button(t("misc.cancel"), role: .cancel) { blockTarget = nil }
            Button(t("story.block_confirm"), role: .destructive) {
                if let target = blockTarget { Task { await block(target) } }
            }
        } message: {
            Txt(t("story.block_creator_body"), .bodyCompact)
        }
    }

    /// Block the person who wrote this, then leave — every card of theirs has
    /// just disappeared from the shelves, so standing on one of them is wrong.
    private func block(_ story: StorySummary) async {
        let creatorId = story.creatorId
        blockTarget = nil
        guard !creatorId.isEmpty else { return }
        _ = try? await store.api.blockUser(creatorId)
        Haptic.play(.success)
        router.pop()
    }

    // MARK: Chrome

    /// Back, the page's name, and the like — the one social gesture that
    /// deserves the header.
    private var header: some View {
        ScreenHeader(title: t("story.info_title"), backLabel: t("story.back"), onBack: { router.pop() }) {
            if let story = detail?.story {
                IconButton(liked ? t("story.unlike") : t("story.like"), action: { toggleLiked(story) }) {
                    Image(systemName: liked ? "hand.thumbsup.fill" : "hand.thumbsup")
                        .font(.system(size: 20, weight: .regular))
                        .foregroundStyle(liked ? Theme.Colors.accentPrimary : Theme.Colors.textSecondary)
                }
                .accessibilityAddTraits(liked ? .isSelected : [])
            }
        }
    }

    /// Information · Comments, as two halves with the active one underlined.
    private var tabs: some View {
        HStack(spacing: 0) {
            ForEach(DetailTab.allCases, id: \.self) { item in
                let active = tab == item
                Button {
                    Haptic.play(.light)
                    withAnimation(.easeOut(duration: Theme.Durations.short)) { tab = item }
                } label: {
                    Text(item == .information ? t("story.tab_information") : t("story.tab_comments"))
                        .font(.system(size: 17, weight: active ? .medium : .regular))
                        .foregroundStyle(active ? Theme.Colors.textPrimary : Theme.Colors.textMuted)
                        .frame(maxWidth: .infinity, minHeight: 48)
                        .overlay(alignment: .bottom) {
                            Rectangle().fill(active ? Theme.Colors.textPrimary : Color.clear).frame(height: 2)
                        }
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityAddTraits(active ? [.isButton, .isSelected] : .isButton)
            }
        }
        .overlay(alignment: .bottom) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }
    }

    // MARK: Loading

    private var skeleton: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            HStack { Spacer(); Skeleton(width: 166, height: 249, radius: Theme.Radius.field); Spacer() }
                .padding(.vertical, 50)
            Skeleton(height: 28, radius: 6).frame(maxWidth: 260, alignment: .leading)
            Skeleton(height: 18, radius: 6).frame(maxWidth: 330, alignment: .leading)
            Spacer()
        }
        .padding(Theme.pageGutter)
    }

    private func load() async {
        do {
            let response = try await store.api.storyDetail(storyId)
            detail = response
            saved = response.story.saved
            liked = response.story.likedByMe
            likes = response.story.likes
            // §37.1 — the step between the shelf and setup, and the one that
            // says whether a cover is doing its job. `official` separates our
            // own worlds from community ones, which convert nothing alike.
            Telemetry.track(.storyDetailViewed, [
                "storyId": storyId,
                "official": response.story.official,
                "source": "detail",
            ])
        } catch {
            loadError = error.playerMessage
        }
    }

    // MARK: Loaded

    @ViewBuilder
    private func loaded(_ detail: StoryDetailResponse, width: CGFloat) -> some View {
        let story = detail.story
        switch tab {
        case .comments:
            CommentsView(
                storyId: story.storyId,
                signedIn: !store.isGuest,
                variant: .full,
                onSeeAll: {},
                onSignIn: { router.present(.signIn) }
            )
        case .information:
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    coverBlock(story, width: width)

                    VStack(alignment: .leading, spacing: 0) {
                        titleRow(story)
                        creatorChip(story)
                            .padding(.top, 14)
                        chipsRow(story, detail: detail)
                            .padding(.top, 14)

                        Text(t("story.description_heading"))
                            .font(.system(size: 22, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .padding(.top, 28)
                            .accessibilityAddTraits(.isHeader)
                        // The hook, unless the premise opens with the same
                        // words — then it would read twice in a row.
                        if !detail.premise.hasPrefix(String(story.hook.prefix(40))) {
                            Text(story.hook)
                                .font(.system(size: 17))
                                .lineSpacing(4)
                                .foregroundStyle(Theme.Colors.textSecondary)
                                .fixedSize(horizontal: false, vertical: true)
                                .padding(.top, 12)
                        }
                        // A premise is 200+ words and it is the one thing a
                        // player reads before committing, so the authored
                        // paragraph breaks get real spacing.
                        ForEach(Array(detail.premise.paragraphs.enumerated()), id: \.offset) { _, paragraph in
                            Txt(paragraph, .body, color: Theme.Colors.textSecondary, serif: true)
                                .padding(.top, 12)
                        }
                        if !story.tags.isEmpty {
                            Text(story.tags.map { "#" + $0.replacingOccurrences(of: " ", with: "") }.joined(separator: " "))
                                .font(.system(size: 17))
                                .foregroundStyle(Theme.Colors.textMuted)
                                .padding(.top, 14)
                        }
                        statsRow(story)
                            .padding(.top, 16)

                        // Spec §8.3 — descriptors are visible before entry.
                        if !story.contentDescriptors.isEmpty {
                            descriptorsBlock(story)
                                .padding(.top, 28)
                        }
                        if !detail.sessions.isEmpty {
                            sessionsBlock(detail.sessions)
                                .padding(.top, 28)
                        }
                        if !detail.cast.isEmpty {
                            castBlock(detail.cast)
                                .padding(.top, 28)
                        }
                        if !detail.creatorNote.isEmpty {
                            creatorNote(detail.creatorNote)
                                .padding(.top, 28)
                        }
                        if !detail.related.isEmpty {
                            relatedBlock(detail.related)
                                .padding(.top, 28)
                        }
                    }
                    .padding(.horizontal, Theme.pageGutter)
                    .padding(.top, 18)
                }
                // Every horizontal shelf below claims exactly this, so the
                // column can never be widened from inside — see railWidth().
                .environment(\.railWidth, width - Theme.pageGutter * 2)
                .frame(width: width, alignment: .leading)
                .padding(.bottom, Theme.Spacing.xxl)
            }
            .safeAreaInset(edge: .bottom, spacing: 0) { ctaBar(detail) }
        }
    }

    // MARK: Sections

    /// The cover, centred on a soft glow of its own colours.
    private func coverBlock(_ story: StorySummary, width: CGFloat) -> some View {
        ZStack {
            RemoteImage((story.keyArt ?? story.coverImage)?.assetURL) { Color.clear }
                .frame(width: width, height: 350)
                .blur(radius: 50)
                .opacity(0.35)
                .clipped()
            LinearGradient(
                stops: [.init(color: Theme.Colors.bgBase.opacity(0.2), location: 0), .init(color: Theme.Colors.bgBase, location: 1)],
                startPoint: .top, endPoint: .bottom
            )
            StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                .frame(width: 166, height: 249)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
                .overlay {
                    RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                        .strokeBorder(Theme.Colors.textPrimary.opacity(0.4), lineWidth: 0.5)
                }
                .overlay(alignment: .topTrailing) {
                    if story.official {
                        Text(t("discover.official_badge"))
                            .font(.system(size: 11, weight: .semibold, design: .monospaced))
                            .kerning(0.5)
                            .foregroundStyle(Theme.Colors.textPrimary)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 5)
                            .background(Theme.Colors.scrim, in: RoundedRectangle(cornerRadius: 6, style: .continuous))
                            .padding(8)
                    }
                }
                .shadow(color: .black.opacity(0.5), radius: 24, y: 12)
        }
        .frame(height: 350)
        .clipped()
        .accessibilityHidden(true)
    }

    private func titleRow(_ story: StorySummary) -> some View {
        HStack(alignment: .top, spacing: Theme.Spacing.md) {
            Text(story.title)
                .font(.system(size: 26, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .fixedSize(horizontal: false, vertical: true)
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: 0)
            Menu {
                Button {
                    toggleSaved(story)
                } label: {
                    Label(saved ? t("story.remove_from_saved") : t("story.save_story"), systemImage: saved ? "bookmark.slash" : "bookmark")
                }
                Button(role: .destructive) {
                    router.present(.report(targetType: "STORY", targetId: story.storyId))
                } label: {
                    Label(t("story.report_story"), systemImage: "flag")
                }
                // Only for a world a person wrote. There is nobody to block
                // behind an official one, and offering it would be nonsense.
                if !story.official, !story.creatorId.isEmpty {
                    Button(role: .destructive) {
                        blockTarget = story
                    } label: {
                        Label(t("story.block_creator", ["name": story.creatorName]), systemImage: "person.slash")
                    }
                }
            } label: {
                Image(systemName: "ellipsis")
                    .font(.system(size: 20, weight: .medium))
                    .rotationEffect(.degrees(90))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .frame(width: Theme.minTouchTarget, height: Theme.minTouchTarget)
                    .contentShape(Rectangle())
            }
            .accessibilityLabel(t("story.more_a11y"))
        }
    }

    private func creatorChip(_ story: StorySummary) -> some View {
        Text(t("story.creator_handle", ["name": story.creatorName]))
            .font(.system(size: 17))
            .foregroundStyle(Theme.Colors.textSecondary)
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 8, style: .continuous))
            .overlay { RoundedRectangle(cornerRadius: 8, style: .continuous).strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5) }
    }

    /// Genre, shape and intensity, then what you can actually do here (§8.2).
    private func chipsRow(_ story: StorySummary, detail: StoryDetailResponse) -> some View {
        let words = [shapeWord(detail.stats.medianDepthLabel), intensityWord(detail.stats.intensity)]
            + story.tags.prefix(2).map { t.category($0, fallback: $0) }
            + story.mechanicsChips
        var seen = Set<String>()
        let unique = words.filter { !$0.isEmpty && seen.insert($0).inserted }
        return ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: Theme.Spacing.sm) {
                ForEach(unique, id: \.self) { word in
                    Text(word)
                        .font(.system(size: 17))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                        .overlay { RoundedRectangle(cornerRadius: 8, style: .continuous).strokeBorder(Theme.Colors.borderStrong, lineWidth: 0.5) }
                }
            }
        }
        .railWidth()
    }

    /// Views, likes, comments. No star ratings (§8.2).
    private func statsRow(_ story: StorySummary) -> some View {
        HStack(spacing: 22) {
            statItem("eye", Format.credits(story.views, compact: true, locale: store.locale), label: t("story.stat_views"))
            Button {
                toggleLiked(story)
            } label: {
                statItem(liked ? "hand.thumbsup.fill" : "hand.thumbsup", Format.credits(likes, compact: true, locale: store.locale), label: liked ? t("story.unlike") : t("story.like"))
            }
            .buttonStyle(PressOpacityStyle())
            Button {
                tab = .comments
            } label: {
                statItem("text.bubble", Format.credits(story.comments, compact: true, locale: store.locale), label: t("story.tab_comments"))
            }
            .buttonStyle(PressOpacityStyle())
        }
    }

    private func statItem(_ symbol: String, _ value: String, label: String) -> some View {
        HStack(spacing: 6) {
            Image(systemName: symbol)
                .font(.system(size: 16, weight: .regular))
            Text(value)
                .font(.system(size: 17))
        }
        .foregroundStyle(Theme.Colors.textMuted)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(label): \(value)")
    }

    /// Spec §8.3 — one primary CTA, pinned. Continue when there is a run to
    /// return to; New session beside it, because starting over leaves the old
    /// run entirely alone.
    private func ctaBar(_ detail: StoryDetailResponse) -> some View {
        let continuing = detail.activeSessionId != nil
        return VStack(spacing: 10) {
            if continuing {
                PBButton(t("story.continue"), variant: .light, size: .medium, haptic: .medium) {
                    if let sessionId = detail.activeSessionId { router.push(.session(sessionId: sessionId)) }
                }
                PBButton(t("story.new_session"), variant: .outline, size: .medium) {
                    router.push(.characterSetup(storyId: detail.story.storyId))
                }
            } else {
                PBButton(t("story.new_session"), variant: .light, haptic: .medium) {
                    router.push(.characterSetup(storyId: detail.story.storyId))
                }
            }
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, 14)
        .padding(.bottom, Theme.Spacing.sm)
        .background(Theme.Colors.bgBase)
        .overlay(alignment: .top) { Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5) }
    }

    /// Every run of this world, newest first.
    private func sessionsBlock(_ sessions: [StoryRun]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Text(t("story.sessions_heading"))
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
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

    /// The carousel has to truncate, so the truncation has to be one tap from
    /// the whole thing.
    private func castBlock(_ cast: [CastMember]) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Text(t("story.cast_heading"))
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: Theme.Spacing.lg) {
                    ForEach(cast) { member in
                        Button {
                            castMember = member
                        } label: {
                            VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                CharacterPortrait(name: member.name, uri: member.portrait, size: 120)
                                Txt(member.name, .bodyCompact, lineLimit: 1)
                                Txt(member.cardBlurb.isEmpty ? member.role : member.cardBlurb, .caption,
                                    color: Theme.Colors.textSecondary, lineLimit: 3)
                            }
                            .frame(width: 120, alignment: .leading)
                        }
                        .buttonStyle(PressOpacityStyle(pressed: 0.8))
                        .accessibilityLabel(t("story.cast_a11y", ["name": member.name, "role": member.role]))
                    }
                }
            }
            .railWidth()
        }
    }

    /// Spec §8.3 — descriptors are visible before entry, never after.
    private func descriptorsBlock(_ story: StorySummary) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            SectionLabel(t("story.content_heading"))
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
            Text(t("story.related_heading"))
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: Theme.Spacing.md) {
                    ForEach(related) { item in
                        PortraitStoryCard(story: item, width: 98, locale: store.locale) {
                            router.push(.storyDetail(storyId: item.storyId))
                        }
                    }
                }
            }
            .railWidth()
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
        if label == "Episodic" { return t("story.shape_episodic") }  // i18n-exempt: the server's value, matched to pick its key
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
