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
    @State private var aboutOpen = false
    /// How far the page has scrolled; past the cover the top bar turns solid.
    @State private var scrollY: CGFloat = 0
    @State private var coverHeight: CGFloat = 585
    /// The world whose creator is about to be blocked. Confirmed first, because
    /// blocking removes everything they have made from this person's app, and
    /// they should not find that out by having already done it.
    @State private var blockTarget: StorySummary?
    /// Set while `Play` is creating a session, so the button can say so and
    /// cannot be pressed twice into two sessions.
    @State private var starting = false
    @State private var startError: String?

    var body: some View {
        Screen {
            GeometryReader { geo in
                ZStack(alignment: .top) {
                    if let detail {
                        loaded(detail, width: geo.size.width)
                    } else if let loadError {
                        VStack {
                            InlineError(message: loadError)
                                .padding(Theme.pageGutter)
                                .padding(.top, 100)
                            Spacer()
                        }
                    } else {
                        skeleton(width: geo.size.width)
                    }
                    topBar
                }
            }
        }
        .toolbar(.hidden, for: .navigationBar)
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

    /// Design v3: two glass buttons floating over the cover, back and more.
    private var topBar: some View {
        let solid = scrollY > coverHeight - 110
        return HStack {
            glassButton(systemName: "chevron.left", label: t("story.back")) { router.pop() }
            Spacer()
            Text(detail?.story.title ?? "")
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .lineLimit(1)
                .opacity(solid ? 1 : 0)
                .accessibilityHidden(!solid)
            Spacer()
            if let story = detail?.story {
                Menu {
                    Button {
                        router.present(.comments(storyId: story.storyId))
                    } label: {
                        Label(t("story.tab_comments"), systemImage: "text.bubble")
                    }
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
                    glassFace(systemName: "ellipsis")
                }
                .accessibilityLabel(t("story.more_a11y"))
            }
        }
        .padding(.horizontal, Theme.pageGutter)
        .padding(.top, Theme.Spacing.sm)
        .padding(.bottom, Theme.Spacing.sm)
        // Over the cover the buttons float; once the page scrolls past it, a
        // solid ink bar with a hairline, so text never runs under the clock.
        .background {
            Theme.Colors.bgBase
                .ignoresSafeArea(edges: .top)
                .overlay(alignment: .bottom) {
                    Rectangle().fill(Theme.Colors.borderHairline).frame(height: 0.5)
                }
                .opacity(solid ? 1 : 0)
        }
        .animation(.easeOut(duration: Theme.Durations.short), value: solid)
    }

    private func glassButton(systemName: String, label: String, action: @escaping () -> Void) -> some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            glassFace(systemName: systemName)
        }
        .buttonStyle(PressOpacityStyle())
        .accessibilityLabel(label)
    }

    private func glassFace(systemName: String) -> some View {
        Image(systemName: systemName)
            .font(.system(size: 16, weight: .semibold))
            .foregroundStyle(Theme.Colors.textPrimary)
            .frame(width: 44, height: 44)
            .background(.ultraThinMaterial, in: Circle())
            .background(Theme.Colors.bgBase.opacity(0.35), in: Circle())
            .overlay { Circle().strokeBorder(Theme.Colors.textPrimary.opacity(0.12), lineWidth: 1) }
    }

    // MARK: Loading

    private func skeleton(width: CGFloat) -> some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
            Skeleton(height: (width * 1.5).rounded(), radius: 0)
            Group {
                Skeleton(height: 30, radius: 6).frame(maxWidth: 220, alignment: .leading)
                Skeleton(height: 16, radius: 6).frame(maxWidth: 280, alignment: .leading)
                Skeleton(height: 52, radius: 26)
            }
            .padding(.horizontal, Theme.pageGutter)
            Spacer()
        }
        .ignoresSafeArea(edges: .top)
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

    /// Start the story now, with an identity nobody had to fill in.
    ///
    /// The same `createSession` call the setup screen makes — this is not a
    /// second, lesser way in. The only difference is where the identity came
    /// from, and `usedQuickSetup` records that so the two paths can be told
    /// apart in the funnel afterwards. Shared with the onboarding showcase
    /// through `QuickStart`.
    private func play(_ detail: StoryDetailResponse) async {
        guard !starting else { return }
        starting = true
        startError = nil

        do {
            let sessionId = try await QuickStart.start(detail, store: store, startPath: "instant")
            router.push(.session(sessionId: sessionId))
        } catch {
            if let api = error as? APIError, api.isInsufficientCredits {
                Telemetry.track(.insufficientCreditsShown, [
                    "required": api.requiredCredits ?? 0,
                    "balance": api.balanceCredits ?? 0,
                    "shortfall": api.shortfall ?? 0,
                    "qualityTier": "SESSION_START",
                ])
                router.present(.wallet(shortfall: api.shortfall))
            }
            startError = error is APIError ? error.playerMessage : t("setup.could_not_start")
        }
        starting = false
    }

    // MARK: Loaded

    /// Design v3 (board frame Story): the cover full width with its painted
    /// title, then the facts in one quiet line, the hook, one Play, and the
    /// sections as plain headed blocks. No boxes, no stat tiles, no tabs.
    private func loaded(_ detail: StoryDetailResponse, width: CGFloat) -> some View {
        let story = detail.story
        return ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                // How far the page has scrolled, read straight off this probe.
                GeometryReader { inner in
                    let y = -inner.frame(in: .named("story.scroll")).minY
                    Color.clear
                        .onAppear { coverHeight = (width * 1.5).rounded() }
                        .onChange(of: y) { _, value in scrollY = value }
                }
                .frame(height: 0)
                StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                    .frame(width: width, height: (width * 1.5).rounded())
                    .clipped()
                    .accessibilityHidden(true)

                VStack(alignment: .leading, spacing: 0) {
                    Text(story.title)
                        .font(.system(size: 28, weight: .bold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .fixedSize(horizontal: false, vertical: true)
                        .padding(.top, 20)
                        .accessibilityAddTraits(.isHeader)
                    Text(t("story.by_creator", ["name": story.creatorName]))
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.Colors.textMuted)
                        .padding(.top, 2)
                    statsLine(story)
                        .padding(.top, 10)
                    tagsRow(story, detail: detail)
                        .padding(.top, 12)
                    Text(story.hook)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .fixedSize(horizontal: false, vertical: true)
                        .padding(.top, 16)

                    cta(detail)
                        .padding(.top, 16)

                    about(detail)
                        .padding(.top, 36)
                    if !detail.sessions.isEmpty {
                        sessionsBlock(detail.sessions)
                            .padding(.top, 36)
                    }
                    if !detail.cast.isEmpty {
                        castBlock(detail.cast)
                            .padding(.top, 36)
                    }
                    if !detail.creatorNote.isEmpty {
                        creatorNote(detail.creatorNote)
                            .padding(.top, 36)
                    }
                    if !detail.related.isEmpty {
                        relatedBlock(detail.related)
                            .padding(.top, 36)
                    }
                }
                .padding(.horizontal, Theme.pageGutter)
            }
            // Every horizontal shelf below claims exactly this, so the
            // column can never be widened from inside — see railWidth().
            .environment(\.railWidth, width - Theme.pageGutter * 2)
            .frame(width: width, alignment: .leading)
            .padding(.bottom, Theme.Spacing.xxl)
        }
        .coordinateSpace(name: "story.scroll")
        .ignoresSafeArea(edges: .top)
    }

    // MARK: Sections

    /// "▶ 1.6M plays · ♥ 86K likes", the numbers bright and the words quiet.
    private func statsLine(_ story: StorySummary) -> some View {
        HStack(spacing: 6) {
            if story.runs > 0 {
                stat("play.fill", Format.credits(story.runs, compact: true, locale: store.locale), t("create.metric_plays"))
            }
            if story.runs > 0, likes > 0 {
                Text(verbatim: "·").foregroundStyle(Theme.Colors.borderStrong)
            }
            if likes > 0 {
                stat("heart.fill", Format.credits(likes, compact: true, locale: store.locale), t("create.metric_likes"))
            }
            if story.comments > 0 {
                Text(verbatim: "·").foregroundStyle(Theme.Colors.borderStrong)
                Button {
                    router.present(.comments(storyId: story.storyId))
                } label: {
                    stat("text.bubble.fill", Format.credits(story.comments, compact: true, locale: store.locale), t("story.tab_comments").lowercased())
                }
                .buttonStyle(PressOpacityStyle())
            }
        }
        .font(.system(size: 13))
        .foregroundStyle(Theme.Colors.textSecondary)
        .accessibilityElement(children: .combine)
    }

    private func stat(_ symbol: String, _ value: String, _ word: String) -> some View {
        HStack(spacing: 4) {
            Image(systemName: symbol).font(.system(size: 10))
            Text(value).fontWeight(.semibold).foregroundStyle(Theme.Colors.textPrimary)
            Text(word)
        }
    }

    /// Genre, shape and intensity as small filled tags (§8.2).
    private func tagsRow(_ story: StorySummary, detail: StoryDetailResponse) -> some View {
        let words = story.tags.prefix(3).map { t.category($0, fallback: $0) }
            + [shapeWord(detail.stats.medianDepthLabel), intensityWord(detail.stats.intensity)]
        var seen = Set<String>()
        let unique = words.filter { !$0.isEmpty && seen.insert($0).inserted }
        return ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 6) {
                ForEach(unique, id: \.self) { word in
                    Text(word)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .padding(.horizontal, 9)
                        .padding(.vertical, 4)
                        .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 6, style: .continuous))
                }
            }
        }
        .railWidth()
    }

    /// Spec §8.3 — one primary, in the first viewport. Play starts the story
    /// with a default identity (`DefaultIdentity`); setup is one tap away for
    /// whoever wants to author a character, worded as what it gives. Continue
    /// takes over when there is a run to return to, and New session stays
    /// beside it as text, because starting over leaves the old run alone.
    private func cta(_ detail: StoryDetailResponse) -> some View {
        let continuing = detail.activeSessionId != nil
        let story = detail.story
        return VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 10) {
                if continuing {
                    PBButton(t("story.continue"), variant: .light, haptic: .medium, icon: "play.fill") {
                        if let sessionId = detail.activeSessionId { router.push(.session(sessionId: sessionId)) }
                    }
                } else {
                    PBButton(t("story.play"), loadingLabel: t("story.starting"),
                             variant: .light, loading: starting, disabled: starting,
                             haptic: .medium, icon: "play.fill") {
                        Task { await play(detail) }
                    }
                }
                Button {
                    Haptic.play(.light)
                    toggleLiked(story)
                } label: {
                    Image(systemName: liked ? "heart.fill" : "heart")
                        .font(.system(size: 20, weight: .medium))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .frame(width: 52, height: 52)
                        .background(Theme.Colors.bgRaised, in: Circle())
                }
                .buttonStyle(PressScaleStyle())
                .accessibilityLabel(liked ? t("story.unlike") : t("story.like"))
                .accessibilityAddTraits(liked ? .isSelected : [])
            }
            HStack {
                Text(playingAs(detail))
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .lineLimit(1)
                Spacer(minLength: Theme.Spacing.sm)
                if continuing {
                    Button {
                        Task { await play(detail) }
                    } label: {
                        Text(starting ? t("story.starting") : t("story.new_session"))
                    }
                    .disabled(starting)
                } else {
                    Button {
                        router.push(.characterSetup(storyId: story.storyId))
                    } label: {
                        Text(t("story.customize_character"))
                    }
                    .disabled(starting)
                }
            }
            .font(.system(size: 15, weight: .semibold))
            .foregroundStyle(Theme.Colors.textPrimary)
            .buttonStyle(PressOpacityStyle())
            if let startError {
                Txt(startError, .caption, color: Theme.Colors.danger)
            }
        }
    }

    /// Who Play makes you: the default name, and the first role when the world
    /// offers roles. The same identity `QuickStart` sends.
    private func playingAs(_ detail: StoryDetailResponse) -> String {
        let name = DefaultIdentity.build(for: detail, store: store).displayName
        let line = t("library.playing_as", ["name": name])
        guard let role = detail.archetypes.first?.name, !role.isEmpty else { return line }
        return line + " · " + role
    }

    /// The premise, four lines and a More. Sans, not the story's serif: this is
    /// the page talking about the story, not the story talking. Content
    /// descriptors sit under it, visible before entry (§8.3).
    private func about(_ detail: StoryDetailResponse) -> some View {
        let story = detail.story
        return VStack(alignment: .leading, spacing: 12) {
            sectionHead(t("story.description_heading"))
            VStack(alignment: .leading, spacing: 10) {
                ForEach(Array((aboutOpen ? detail.premise.paragraphs : Array(detail.premise.paragraphs.prefix(1))).enumerated()), id: \.offset) { _, paragraph in
                    Text(paragraph)
                        .font(.system(size: 15))
                        .lineSpacing(5)
                        .foregroundStyle(Theme.Colors.textSecondary)
                        .lineLimit(aboutOpen ? nil : 4)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            if !aboutOpen {
                Button {
                    withAnimation(.easeOut(duration: Theme.Durations.short)) { aboutOpen = true }
                } label: {
                    Text(t("ui.read_more"))
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(Theme.Colors.textPrimary)
                }
                .buttonStyle(PressOpacityStyle())
            }
            if !story.contentDescriptors.isEmpty {
                Text(t("story.content_heading") + ": " + story.contentDescriptors.map(descriptorLabel).joined(separator: " · "))
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.top, 4)
            }
        }
    }

    private func sectionHead(_ title: String, trailing: String? = nil) -> some View {
        HStack(alignment: .firstTextBaseline) {
            Text(title)
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .accessibilityAddTraits(.isHeader)
            Spacer(minLength: Theme.Spacing.sm)
            if let trailing {
                Text(trailing)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
            }
        }
    }

    /// Every run of this world, newest first, as plain rows.
    private func sessionsBlock(_ sessions: [StoryRun]) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            sectionHead(t("story.sessions_heading"))
                .padding(.bottom, 8)
            ForEach(Array(sessions.prefix(5).enumerated()), id: \.element.sessionId) { index, session in
                Button {
                    router.push(.session(sessionId: session.sessionId))
                } label: {
                    HStack(spacing: Theme.Spacing.md) {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(sessionLine(session))
                                .font(.system(size: 15, weight: .medium))
                                .foregroundStyle(Theme.Colors.textPrimary)
                                .lineLimit(1)
                            if index == 0 || session.status == .COMPLETED {
                                Text(session.status == .COMPLETED ? t("story.session_status_completed") : t("story.session_latest"))
                                    .font(.system(size: 13))
                                    .foregroundStyle(Theme.Colors.textMuted)
                            }
                        }
                        Spacer(minLength: Theme.Spacing.sm)
                        Text(t("story.session_resume"))
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textPrimary)
                    }
                    .frame(minHeight: 52)
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressOpacityStyle())
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

    /// Faces as rounded squares, a name and a role; tap for the whole card.
    private func castBlock(_ cast: [CastMember]) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            sectionHead(t("nav.characters"))
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: 12) {
                    ForEach(cast) { member in
                        Button {
                            castMember = member
                        } label: {
                            VStack(alignment: .leading, spacing: 0) {
                                CharacterPortrait(name: member.name, uri: member.portrait, size: 76)
                                Text(shortName(member.name))
                                    .font(.system(size: 13, weight: .medium))
                                    .foregroundStyle(Theme.Colors.textPrimary)
                                    .lineLimit(1)
                                    .padding(.top, 8)
                                Text(shortRole(member.role))
                                    .font(.system(size: 12))
                                    .foregroundStyle(Theme.Colors.textMuted)
                                    .lineLimit(1)
                            }
                            .frame(width: 76, alignment: .leading)
                        }
                        .buttonStyle(PressOpacityStyle(pressed: 0.8))
                        .accessibilityLabel(t("story.cast_a11y", ["name": member.name, "role": member.role]))
                    }
                }
            }
            .railWidth()
        }
    }

    /// "Ayame Kurose" → "Ayame"; "Mrs Elara Vale" → "Mrs Vale". The card opens
    /// on the full name.
    private func shortName(_ name: String) -> String {
        let words = name.split(separator: " ").map(String.init)
        guard words.count > 1 else { return name }
        let honorifics: Set<String> = ["mr", "mrs", "ms", "miss", "dr", "sir", "lady", "lord", "mx"]
        if honorifics.contains(words[0].lowercased().trimmingCharacters(in: CharacterSet(charactersIn: "."))) {
            return words[0] + " " + (words.last ?? "")
        }
        return words[0]
    }

    /// The role up to its first comma or full stop: "Room 314, the night
    /// clerk's neighbour" → "Room 314".
    private func shortRole(_ role: String) -> String {
        let cut = role.split(whereSeparator: { $0 == "," || $0 == "." || $0 == ";" }).first.map(String.init) ?? role
        return cut.trimmingCharacters(in: .whitespaces)
    }

    private func creatorNote(_ note: String) -> some View {
        let heading = t("story.creator_note_heading").lowercased()
        return VStack(alignment: .leading, spacing: 12) {
            sectionHead(heading.prefix(1).uppercased() + heading.dropFirst())
            Text(note)
                .font(.system(size: 15))
                .lineSpacing(5)
                .foregroundStyle(Theme.Colors.textSecondary)
                .fixedSize(horizontal: false, vertical: true)
        }
    }

    private func relatedBlock(_ related: [StorySummary]) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            sectionHead(t("story.related_heading"))
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: 12) {
                    ForEach(related) { item in
                        PortraitStoryCard(story: item, width: 104, locale: store.locale) {
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
