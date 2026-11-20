import SwiftUI
import UserNotifications
import WebKit

// MARK: - The Tower (docs/tower.md)
//
// A daily mini game that pays credits. The game itself is one bundled web page
// (`apps/tower`, built into Resources/tower/tower.html) so the same code runs
// on a desktop for design and here. It never touches the network: every call
// goes through the `tower` message handler, and this file makes it with the
// signed-in session. The page never sees a token.

struct TowerStatus: Decodable, Equatable {
    struct Today: Decodable, Equatable {
        let runId: String
        let finished: Bool
        let fellOn: Int
        let cleared: Bool
        let reward: Int
    }

    let day: String
    let free: Bool
    let fee: Int
    let balance: Int
    let best: Int
    let today: Today?
    let nextAt: String
    let maxReward: Int
    let streak: Streak

    struct Streak: Decodable, Equatable {
        let days: Int
        let todayBonusPercent: Int
        let alive: Bool
    }
}

/// Full-screen host for the game page.
struct TowerScreen: View {
    let source: String
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        TowerWebView(api: store.api, source: source) { action in
            switch action {
            case .close:
                dismiss()
            case .spend:
                dismiss()
                router.popToRoot()
                router.tab = .library
            }
            Task {
                await store.refreshWallet()
                if let status = try? await store.api.tower() { await TowerReminder.refresh(status, t: store.t) }
            }
        }
        .ignoresSafeArea()
        .background(Color(hex: 0x0B0D12).ignoresSafeArea())
        .statusBarHidden(true)
        .persistentSystemOverlays(.hidden)
    }
}

enum TowerExit { case close, spend }

struct TowerWebView: UIViewRepresentable {
    let api: APIClient
    let source: String
    /// Debug only: leave the bridge off so the page runs on its own offline mock.
    var preview = false
    let onExit: (TowerExit) -> Void

    func makeCoordinator() -> Coordinator { Coordinator(api: api, onExit: onExit) }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        if !preview { config.userContentController.add(context.coordinator, name: "tower") }
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        let web = WKWebView(frame: .zero, configuration: config)
        web.isOpaque = false
        web.backgroundColor = UIColor(red: 11 / 255, green: 13 / 255, blue: 18 / 255, alpha: 1)
        web.scrollView.isScrollEnabled = false
        web.scrollView.bounces = false
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.allowsLinkPreview = false
        #if DEBUG
        if #available(iOS 16.4, *) { web.isInspectable = true }
        #endif
        context.coordinator.web = web
        if let url = Bundle.main.url(forResource: "tower", withExtension: "html") {
            var target = url
            #if DEBUG
            // `-towerQuery "dev&play&bot=expert"`: the page's own dev switches, for recordings.
            let args = ProcessInfo.processInfo.arguments
            if let i = args.firstIndex(of: "-towerQuery"), i + 1 < args.count,
               var parts = URLComponents(url: url, resolvingAgainstBaseURL: false) {
                parts.percentEncodedQuery = args[i + 1]
                target = parts.url ?? url
            }
            #endif
            web.loadFileURL(target, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    static func dismantleUIView(_ uiView: WKWebView, coordinator: Coordinator) {
        uiView.configuration.userContentController.removeScriptMessageHandler(forName: "tower")
    }

    @MainActor
    final class Coordinator: NSObject, WKScriptMessageHandler {
        let api: APIClient
        let onExit: (TowerExit) -> Void
        weak var web: WKWebView?

        init(api: APIClient, onExit: @escaping (TowerExit) -> Void) {
            self.api = api
            self.onExit = onExit
        }

        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let body = message.body as? [String: Any],
                  let op = body["op"] as? String else { return }
            let id = (body["id"] as? NSNumber)?.intValue ?? 0
            let args = body["args"] as? [String: Any] ?? [:]
            switch op {
            case "status": call(id) { try await self.api.towerCall("GET", "/v1/tower") }
            case "start": call(id) { try await self.api.towerCall("POST", "/v1/tower/start") }
            case "checkpoint": call(id) { try await self.api.towerCall("POST", "/v1/tower/checkpoint", body: Self.json(args)) }
            case "finish": call(id) { try await self.api.towerCall("POST", "/v1/tower/finish", body: Self.json(args)) }
            case "practice": call(id) { try await self.api.towerCall("POST", "/v1/tower/practice") }
            case "buy", "select":
                // Character ids are short slugs; anything else never reaches a URL path.
                guard let raw = args["characterId"] as? String,
                      raw.range(of: "^[a-z0-9_]{1,32}$", options: .regularExpression) != nil else { return }
                call(id) { try await self.api.towerCall("POST", "/v1/tower/characters/\(raw)/\(op)") }
            case "haptic": haptic(args["kind"] as? String)
            case "track": track(args)
            case "close": onExit(.close)
            case "spend": onExit(.spend)
            default: break
            }
        }

        private func call(_ id: Int, _ work: @escaping () async throws -> JSONValue) {
            Task { @MainActor in
                do {
                    let value = try await work()
                    self.resolve(id, ok: true, value)
                } catch {
                    self.resolve(id, ok: false, .string(error.localizedDescription))
                }
            }
        }

        private func resolve(_ id: Int, ok: Bool, _ value: JSONValue) {
            guard id > 0, let web else { return }
            let data = (try? JSONEncoder.plotbreak.encode(value)) ?? Data("null".utf8)
            let json = String(data: data, encoding: .utf8) ?? "null"
            web.evaluateJavaScript("window.__towerResolve && window.__towerResolve(\(id), \(ok), \(json))")
        }

        private func haptic(_ kind: String?) {
            switch kind {
            case "light", "select": Haptic.play(.light)
            case "medium": Haptic.play(.medium)
            case "heavy": Haptic.play(.send)
            case "success": Haptic.play(.success)
            case "error": Haptic.play(.error)
            default: break
            }
        }

        private func track(_ args: [String: Any]) {
            guard let name = args["event"] as? String, let event = PlotbreakEvent(rawValue: name) else { return }
            Telemetry.track(event, args["props"] as? [String: Any] ?? [:])
        }

        static func json(_ object: Any) -> JSONValue? {
            guard JSONSerialization.isValidJSONObject(object),
                  let data = try? JSONSerialization.data(withJSONObject: object) else { return nil }
            return try? JSONDecoder.plotbreak.decode(JSONValue.self, from: data)
        }
    }
}

/// One local notification: the next climb is open. Only when today's climb is
/// done, and only if the player already allows notifications (the Tower never
/// asks on its own; the app's reminder prompt does).
enum TowerReminder {
    static let id = "plotbreak.reminder.tower"

    static func refresh(_ status: TowerStatus, t: Translator) async {
        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: [id])
        guard status.today?.finished == true,
              await Reminders.authorizationStatus() == .authorized,
              let at = ISO8601.date(from: status.nextAt), at > Date() else { return }
        let content = UNMutableNotificationContent()
        content.title = t("tower.notify_title")
        content.body = status.streak.days > 0
            ? t("tower.notify_streak", ["days": status.streak.days, "bonus": min(20, status.streak.days + 1) * 5])
            : t("tower.notify_body")
        content.sound = .default
        let parts = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: at.addingTimeInterval(60))
        let request = UNNotificationRequest(identifier: id, content: content, trigger: UNCalendarNotificationTrigger(dateMatching: parts, repeats: false))
        try? await center.add(request)
    }
}
