import Foundation
import UserNotifications

// MARK: - Reminders
//
// Two daily nudges: the free credits are claimable again, and the run somebody
// walked away from is still there.
//
// Scheduled on the device, not pushed from a server. Both facts are already on
// the client — the wallet says when the next claim unlocks, and the library
// says which run was last played — so a server round trip would only be a way
// to be wrong about them later. It also means no APNs key, no device-token
// table, and nothing to leak.
//
// The shape follows `ReviewPrompt`: a pure struct that decides *when*, a
// UserDefaults store that remembers what the player chose, and a thin enum that
// is the only thing allowed to touch UNUserNotificationCenter. The first of
// those is where the reasoning lives, and it is the one under test.

// MARK: Timestamps

/// Parsing the server's timestamps, tolerantly.
///
/// `ISO8601DateFormatter` is all-or-nothing about fractional seconds: the
/// formatter that reads `…T00:00:00.000Z` returns nil for `…T00:00:00Z` and
/// vice versa. The two fields these reminders are built from come from
/// different places — `nextDailyClaimAt` from a `toISOString()` and
/// `lastPlayedAt` from a Postgres column — so this tries both rather than
/// betting on one and silently scheduling nothing.
enum ISO8601 {
    static func date(from string: String) -> Date? {
        ISO8601DateFormatter.plotbreak.date(from: string) ?? whole.date(from: string)
    }

    private static let whole: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime]
        return formatter
    }()
}

// MARK: What we remind about

enum ReminderKind: String, CaseIterable, Sendable {
    case dailyCredits
    case storyWaiting
    /// Credits the player has already earned from badges and never collected.
    case badgeCredits

    /// Prefix on every request id we own, so cancelling ours never cancels
    /// something else that happens to be scheduled.
    var prefix: String {
        switch self {
        case .dailyCredits: return "plotbreak.reminder.daily"
        case .storyWaiting: return "plotbreak.reminder.story"
        case .badgeCredits: return "plotbreak.reminder.badges"
        }
    }
}

/// One notification, decided but not yet handed to iOS.
struct ReminderPlan: Equatable, Sendable {
    var kind: ReminderKind
    var fireAt: Date
    /// The run to reopen, for `storyWaiting`.
    var sessionId: String?
    /// The story's name, which is the notification's title.
    var storyTitle: String?
    /// How many credits are waiting, for `badgeCredits`.
    var badgeCredits: Int?

    var requestId: String {
        "\(kind.prefix).\(Int(fireAt.timeIntervalSince1970))"
    }
}

// MARK: When

/// Decides the fire times. No UserNotifications, no UserDefaults, no clock of
/// its own — every input is an argument, which is what makes it testable.
struct ReminderSchedule: Equatable, Sendable {
    /// Early evening: after school and after work in every market we are in,
    /// and well clear of the hours a notification is resented.
    static let creditsHour = 19
    /// Late morning, so the two reminders are never the same buzz twice.
    static let storyHour = 11
    /// Mid-afternoon, clear of both of the above.
    static let badgesHour = 16
    /// How many days ahead to arm.
    ///
    /// Local notifications are a standing arrangement rather than a queue we
    /// top up: the app re-arms on every launch, so this only has to outlast the
    /// gap between two launches. A week does, and iOS caps us at 64 pending
    /// across the whole app either way.
    static let horizonDays = 7
    /// A run played this morning is not one somebody abandoned, so the first
    /// reminder about it waits out the rest of the day.
    static let quietAfterPlay: TimeInterval = 20 * 60 * 60

    var calendar: Calendar

    init(calendar: Calendar = .current) {
        self.calendar = calendar
    }

    /// The next `horizonDays` occurrences of `hour`, strictly after `earliest`.
    private func occurrences(hour: Int, after earliest: Date) -> [Date] {
        var dates: [Date] = []
        // Start from the day `earliest` falls in, and walk forward. Built with
        // `nextDate` rather than by adding 86,400 seconds, because a day is not
        // always 86,400 seconds long and a reminder that drifts an hour every
        // daylight-saving change is a reminder that eventually arrives at 3am.
        var cursor = earliest
        while dates.count < Self.horizonDays {
            guard let next = calendar.nextDate(
                after: cursor,
                matching: DateComponents(hour: hour, minute: 0, second: 0),
                matchingPolicy: .nextTime
            ) else { break }
            dates.append(next)
            cursor = next
        }
        return dates
    }

    /// When to say the free credits are back.
    ///
    /// `nextClaimAt` is the wallet's own answer and the grant resets at 00:00
    /// UTC, so any evening on or after it has credits waiting — unless the
    /// player claims in the meantime, which re-arms this from scratch. Nil
    /// means claimable right now.
    func dailyCredits(nextClaimAt: Date?, now: Date) -> [Date] {
        let earliest = max(now, nextClaimAt ?? now)
        return occurrences(hour: Self.creditsHour, after: earliest)
    }

    /// When to mention the run that is still open.
    func storyWaiting(lastPlayedAt: Date, now: Date) -> [Date] {
        let earliest = max(now, lastPlayedAt.addingTimeInterval(Self.quietAfterPlay))
        return occurrences(hour: Self.storyHour, after: earliest)
    }

    /// When to mention credits sitting unclaimed in the badges screen.
    ///
    /// **One occurrence, not a week of them.** The other two reminders describe
    /// something that renews daily; this describes a fact that stays true until
    /// the player acts on it, so arming seven of them would be the same
    /// sentence seven afternoons running. It re-arms on the next launch while
    /// the credits are still unclaimed, and stops the moment they are — which
    /// also keeps the app's promise of two notifications a day.
    func badgeCredits(now: Date) -> [Date] {
        Array(occurrences(hour: Self.badgesHour, after: now).prefix(1))
    }

    /// Everything to schedule, from what the app already knows.
    ///
    /// `session` is the most recently played unfinished run, or nil when there
    /// is none — in which case there is nothing to be reminded about and the
    /// second reminder simply does not exist.
    func plans(
        nextClaimAt: Date?,
        session: (sessionId: String, title: String, lastPlayedAt: Date)?,
        wantsDailyCredits: Bool,
        wantsStoryWaiting: Bool,
        claimableBadgeCredits: Int = 0,
        now: Date
    ) -> [ReminderPlan] {
        var plans: [ReminderPlan] = []
        if wantsDailyCredits {
            plans += dailyCredits(nextClaimAt: nextClaimAt, now: now)
                .map { ReminderPlan(kind: .dailyCredits, fireAt: $0) }
        }
        if wantsStoryWaiting, let session {
            plans += storyWaiting(lastPlayedAt: session.lastPlayedAt, now: now)
                .map {
                    ReminderPlan(
                        kind: .storyWaiting,
                        fireAt: $0,
                        sessionId: session.sessionId,
                        storyTitle: session.title
                    )
                }
        }
        // Gated on the credits toggle rather than on a third switch: it is the
        // same promise the player already agreed to — we will tell you when
        // there are credits — and one more row in Settings buys nothing.
        if wantsDailyCredits, claimableBadgeCredits > 0 {
            plans += badgeCredits(now: now)
                .map { ReminderPlan(kind: .badgeCredits, fireAt: $0, badgeCredits: claimableBadgeCredits) }
        }
        return plans
    }
}

// MARK: What the player chose

/// The two toggles, and whether we have asked yet. Per install, in
/// UserDefaults, like `ReviewPromptStore`.
struct ReminderSettings {
    static let standard = ReminderSettings(defaults: .standard)

    let defaults: UserDefaults

    private enum Keys {
        static let daily = "plotbreak.reminders.daily"
        static let story = "plotbreak.reminders.story"
        static let asked = "plotbreak.reminders.asked"
    }

    /// Both default to on. The permission prompt is the real gate — somebody
    /// who allowed notifications asked for these, and making them then find two
    /// switches to get what they just agreed to is a way to be ignored.
    var dailyCredits: Bool {
        get { defaults.object(forKey: Keys.daily) as? Bool ?? true }
        nonmutating set { defaults.set(newValue, forKey: Keys.daily) }
    }

    var storyWaiting: Bool {
        get { defaults.object(forKey: Keys.story) as? Bool ?? true }
        nonmutating set { defaults.set(newValue, forKey: Keys.story) }
    }

    /// Whether our own alert has been shown. iOS grants exactly one system
    /// prompt per install; this is what stops us spending it twice.
    var hasAsked: Bool {
        get { defaults.bool(forKey: Keys.asked) }
        nonmutating set { defaults.set(newValue, forKey: Keys.asked) }
    }
}

// MARK: Doing it

enum Reminders {
    /// Payload key on a tapped notification, so the delegate knows where to go.
    static let kindKey = "plotbreak.kind"
    static let sessionKey = "plotbreak.sessionId"

    static func authorizationStatus() async -> UNAuthorizationStatus {
        await UNUserNotificationCenter.current().notificationSettings().authorizationStatus
    }

    /// Ask iOS. Returns whether we may now post anything at all.
    @discardableResult
    static func requestAuthorization() async -> Bool {
        (try? await UNUserNotificationCenter.current()
            .requestAuthorization(options: [.alert, .sound, .badge])) ?? false
    }

    /// Replace every reminder we own with the current plan.
    ///
    /// Cancel-then-schedule rather than reconcile: the whole set is derived
    /// from state that may have changed in any direction — credits claimed, a
    /// different run played, a toggle switched off — and rebuilding it is both
    /// shorter and impossible to get subtly out of step.
    static func refresh(
        nextClaimAt: Date?,
        session: (sessionId: String, title: String, lastPlayedAt: Date)?,
        claimableBadgeCredits: Int = 0,
        translator: Translator,
        settings: ReminderSettings = .standard,
        schedule: ReminderSchedule = ReminderSchedule(),
        now: Date = Date()
    ) async {
        let center = UNUserNotificationCenter.current()
        guard await authorizationStatus() == .authorized else {
            // Not permitted, so nothing of ours should be pending either —
            // including anything left over from before the player turned us off
            // in iOS Settings.
            await cancelAll()
            return
        }

        await cancelAll()

        let plans = schedule.plans(
            nextClaimAt: nextClaimAt,
            session: session,
            wantsDailyCredits: settings.dailyCredits,
            wantsStoryWaiting: settings.storyWaiting,
            claimableBadgeCredits: claimableBadgeCredits,
            now: now
        )

        for plan in plans {
            let content = UNMutableNotificationContent()
            switch plan.kind {
            case .dailyCredits:
                content.title = translator("notifications.daily_title")
                content.body = translator("notifications.daily_body")
            case .storyWaiting:
                // The story's own name is the title. It is the most specific
                // thing we can say, and the reason to open the app.
                content.title = plan.storyTitle ?? translator("nav.library")
                content.body = translator("notifications.story_body")
            case .badgeCredits:
                content.title = translator("notifications.badges_title")
                content.body = translator("notifications.badges_body")
            }
            content.sound = .default
            var info: [String: Any] = [kindKey: plan.kind.rawValue]
            if let sessionId = plan.sessionId { info[sessionKey] = sessionId }
            content.userInfo = info

            // Calendar-matched rather than an interval, so a phone that was off
            // at the fire time delivers at the next matching moment instead of
            // whenever it happens to wake.
            let components = schedule.calendar.dateComponents(
                [.year, .month, .day, .hour, .minute], from: plan.fireAt
            )
            let request = UNNotificationRequest(
                identifier: plan.requestId,
                content: content,
                trigger: UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
            )
            try? await center.add(request)
        }
    }

    /// The moment to ask, as a **turn index**.
    ///
    /// `turn_index` is zero-based, so 1 is the player's *second* finished turn
    /// — they have typed something, read what the world did with it, and typed
    /// again. That is the earliest point where "we will tell you when there are
    /// more credits" is an offer rather than a stranger asking for something,
    /// and it is clear of onboarding, where the prompt would land next to the
    /// tracking one and take the whole app's notifications down with it.
    ///
    /// Deliberately not 10, 25 or 50 — `ReviewPrompt` owns those.
    static let askAtTurnIndex = 1

    /// Whether to show our own alert now. Asking twice is not possible anyway;
    /// this is about not wasting the one system prompt iOS allows.
    static func shouldAsk(turnIndex: Int, settings: ReminderSettings = .standard) -> Bool {
        turnIndex == askAtTurnIndex && !settings.hasAsked
    }

    /// Remove only what we scheduled.
    static func cancelAll() async {
        let center = UNUserNotificationCenter.current()
        let pending = await center.pendingNotificationRequests()
        let ours = pending
            .map(\.identifier)
            .filter { id in ReminderKind.allCases.contains { id.hasPrefix($0.prefix) } }
        center.removePendingNotificationRequests(withIdentifiers: ours)
    }
}

// MARK: Being tapped

/// Where a tapped reminder wants to go.
struct ReminderTap: Equatable, Sendable {
    var kind: ReminderKind
    var sessionId: String?
}

/// Catches taps and holds the last one until the UI is ready to act on it.
///
/// A notification can be tapped from a cold launch, long before there is a
/// `Router` to talk to, so this stores rather than navigates. `RootView` picks
/// it up and clears it.
@MainActor
@Observable
final class ReminderTaps: NSObject, UNUserNotificationCenterDelegate {
    static let shared = ReminderTaps()

    var pending: ReminderTap?

    /// Installed once, at launch.
    static func install() {
        UNUserNotificationCenter.current().delegate = shared
    }

    nonisolated func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let info = response.notification.request.content.userInfo
        let raw = info[Reminders.kindKey] as? String
        let sessionId = info[Reminders.sessionKey] as? String
        if let raw, let kind = ReminderKind(rawValue: raw) {
            Task { @MainActor in
                ReminderTaps.shared.pending = ReminderTap(kind: kind, sessionId: sessionId)
            }
        }
        completionHandler()
    }

    /// Nothing while the app is open.
    ///
    /// Both reminders exist to bring somebody back, and somebody reading a beat
    /// is already back. A banner over the story they are in the middle of is an
    /// interruption that argues for itself and loses.
    nonisolated func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification
    ) async -> UNNotificationPresentationOptions {
        []
    }
}
