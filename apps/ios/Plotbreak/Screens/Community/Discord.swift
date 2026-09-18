import SwiftUI

// MARK: - Discord
//
// The community server. Three ways in: a button in Settings, a button in
// Profile, and a prompt that asks now and then. The prompt is the only part
// with rules, and they live in `DiscordPromptSchedule` so a test can hold
// them still.

enum Discord {
    /// A permanent invite (no expiry) to "Plotbreak: The Playable Anime".
    /// `discord.gg` is a universal link Discord's app claims in full, so this
    /// opens the app when it is installed and the invite page in Safari when
    /// it is not.
    static let inviteURL = URL(string: "https://discord.gg/cKjD2qvFaG")!

    /// Discord's own blurple. The one colour in the app that is not ours: the
    /// button has to read as Discord at a glance, the way the Google mark does.
    static let blurple = Color(hex: 0x5865F2)

    /// Opens the invite and remembers that the player took it, so the prompt
    /// never asks someone who is already there.
    static func open(source: String, with openURL: OpenURLAction) {
        Telemetry.track(.communityInviteTapped, ["source": source])
        DiscordPromptStore.standard.recordJoined()
        openURL(inviteURL)
    }
}

// MARK: Mark

/// Discord's logo, as a template image so it takes the foreground colour.
struct DiscordMark: View {
    var size: CGFloat = 20

    var body: some View {
        Image("DiscordMark")
            .renderingMode(.template)
            .resizable()
            .scaledToFit()
            .frame(width: size, height: size)
            .accessibilityHidden(true)
    }
}

// MARK: Button

/// The full-width blurple button, mark first. Same height and radius as a
/// large `PBButton`, so it sits in a column of them without looking borrowed.
struct DiscordButton: View {
    let label: String
    /// Where the tap came from, for `community_invite_tapped`.
    let source: String
    /// Runs after the invite opens. The prompt uses it to close itself.
    var onOpened: (() -> Void)? = nil

    @Environment(\.openURL) private var openURL
    @Environment(\.translator) private var t

    var body: some View {
        Button {
            Haptic.play(.light)
            Discord.open(source: source, with: openURL)
            onOpened?()
        } label: {
            HStack(spacing: 10) {
                DiscordMark(size: 22)
                Text(label)
                    .font(.system(size: Theme.TypeStyle.body.size, weight: .semibold))
                    .lineLimit(1)
                    .minimumScaleFactor(0.85)
            }
            .foregroundStyle(.white)
            .padding(.horizontal, Theme.Spacing.xl)
            .frame(maxWidth: .infinity, minHeight: ButtonSize.large.height)
            .background(Discord.blurple, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
        }
        .buttonStyle(PressScaleStyle())
        .accessibilityLabel(t("community.join_discord_a11y"))
        .accessibilityAddTraits(.isLink)
    }
}

// MARK: - Prompt schedule

/// When the prompt may show. Never in the first two opens, so it cannot land
/// on someone still finding their way; never twice in four days; never more
/// than three times; and never again once the player has tapped any Discord
/// button, anywhere.
struct DiscordPromptSchedule: Equatable {
    static let minimumOpens = 3
    static let cooldown: TimeInterval = 4 * 24 * 60 * 60
    static let maximumShows = 3

    var opens = 0
    var timesShown = 0
    var lastShown: Date?
    var joined = false

    func isDue(at now: Date) -> Bool {
        guard !joined, timesShown < Self.maximumShows, opens >= Self.minimumOpens else { return false }
        guard let lastShown else { return true }
        return now.timeIntervalSince(lastShown) >= Self.cooldown
    }
}

/// The schedule, kept in UserDefaults. Per install on purpose: a reinstall
/// asking once more is fine; asking on every device someone signs in on is not
/// worth a server round trip.
struct DiscordPromptStore {
    static let standard = DiscordPromptStore(defaults: .standard)

    let defaults: UserDefaults

    private enum Keys {
        static let opens = "plotbreak.discord.opens"
        static let timesShown = "plotbreak.discord.timesShown"
        static let lastShown = "plotbreak.discord.lastShown"
        static let joined = "plotbreak.discord.joined"
    }

    var schedule: DiscordPromptSchedule {
        DiscordPromptSchedule(
            opens: defaults.integer(forKey: Keys.opens),
            timesShown: defaults.integer(forKey: Keys.timesShown),
            lastShown: defaults.object(forKey: Keys.lastShown) as? Date,
            joined: defaults.bool(forKey: Keys.joined)
        )
    }

    func recordOpen() {
        defaults.set(defaults.integer(forKey: Keys.opens) + 1, forKey: Keys.opens)
    }

    /// Returns how many times it has now been shown, for the analytics event.
    @discardableResult
    func recordShown(at now: Date) -> Int {
        let count = defaults.integer(forKey: Keys.timesShown) + 1
        defaults.set(count, forKey: Keys.timesShown)
        defaults.set(now, forKey: Keys.lastShown)
        return count
    }

    func recordJoined() {
        defaults.set(true, forKey: Keys.joined)
    }
}

// MARK: - Prompt

/// The card itself: the mark in a blurple disc, one line of why, the button,
/// and a way out. Tapping the scrim is the same as "Not now".
struct DiscordPrompt: View {
    let onClose: () -> Void

    @Environment(\.translator) private var t
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var shown = false

    var body: some View {
        ZStack {
            Theme.Colors.scrim
                .ignoresSafeArea()
                .opacity(shown ? 1 : 0)
                .onTapGesture { onClose() }
                .accessibilityHidden(true)

            VStack(spacing: 0) {
                ZStack {
                    Circle().fill(Discord.blurple)
                    DiscordMark(size: 36).foregroundStyle(.white)
                }
                .frame(width: 72, height: 72)

                Txt(t("community.prompt_title"), .h2, center: true)
                    .padding(.top, Theme.Spacing.xl)
                Txt(t("community.prompt_body"), .bodyCompact, color: Theme.Colors.textSecondary, center: true)
                    .padding(.top, Theme.Spacing.sm)

                DiscordButton(label: t("community.prompt_join"), source: "prompt", onOpened: onClose)
                    .padding(.top, Theme.Spacing.xxl)
                PBButton(t("community.prompt_later"), variant: .tertiary) { onClose() }
                    .padding(.top, Theme.Spacing.xs)
            }
            .padding(Theme.Spacing.xxl)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.large, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.large, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 0.5)
            }
            .padding(.horizontal, 28)
            .scaleEffect(shown || reduceMotion ? 1 : 0.94)
            .opacity(shown ? 1 : 0)
            .accessibilityElement(children: .contain)
            .accessibilityAddTraits(.isModal)
        }
        .onAppear {
            withAnimation(reduceMotion ? .easeOut(duration: 0.15) : .spring(response: 0.35, dampingFraction: 0.82)) {
                shown = true
            }
        }
    }
}

// MARK: - Host

/// Hangs the prompt over the main shell and decides when to raise it: a
/// moment after the app opens, and a moment after the player comes back to
/// the tabs from a story, which is when they have just played something worth
/// talking about. Only ever over the tabs themselves: never over a sheet,
/// never over a session.
private struct DiscordPromptHost: ViewModifier {
    @Environment(Router.self) private var router
    @Environment(\.scenePhase) private var scenePhase

    @State private var showing = false
    @State private var wasBackgrounded = false
    /// One open per process launch; `MainShell` can appear more than once.
    private static var countedLaunch = false

    func body(content: Content) -> some View {
        content
            .overlay {
                if showing {
                    DiscordPrompt(onClose: close)
                        .transition(.opacity)
                }
            }
            .task {
                if !Self.countedLaunch {
                    Self.countedLaunch = true
                    DiscordPromptStore.standard.recordOpen()
                }
                await consider(after: 2.0)
            }
            .onChange(of: scenePhase) { _, phase in
                switch phase {
                case .background:
                    wasBackgrounded = true
                case .active where wasBackgrounded:
                    wasBackgrounded = false
                    DiscordPromptStore.standard.recordOpen()
                    Task { await consider(after: 2.0) }
                default:
                    break
                }
            }
            .onChange(of: router.path.isEmpty) { _, backOnTabs in
                if backOnTabs { Task { await consider(after: 0.8) } }
            }
    }

    private var quiet: Bool { router.path.isEmpty && router.sheet == nil && !showing }

    /// Waits, then shows the prompt if it is due and the screen is still quiet.
    /// The wait keeps it from landing in the same frame as whatever the player
    /// just did.
    @MainActor
    private func consider(after seconds: Double) async {
        let store = DiscordPromptStore.standard
        guard quiet, store.schedule.isDue(at: Date()) else { return }
        try? await Task.sleep(nanoseconds: UInt64(seconds * 1_000_000_000))
        guard quiet, scenePhase == .active, store.schedule.isDue(at: Date()) else { return }
        let count = store.recordShown(at: Date())
        Telemetry.track(.communityInviteShown, ["source": "prompt", "timesShown": count])
        withAnimation(.easeOut(duration: 0.2)) { showing = true }
    }

    private func close() {
        withAnimation(.easeOut(duration: 0.2)) { showing = false }
    }
}

extension View {
    /// See `DiscordPromptHost`.
    func discordPrompt() -> some View { modifier(DiscordPromptHost()) }
}
