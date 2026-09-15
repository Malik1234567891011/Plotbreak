import Foundation

// MARK: - APIError

/// The server's error envelope, plus the client-side `OFFLINE` case.
struct APIError: Error, LocalizedError {
    let status: Int
    let code: String
    let message: String
    let details: [String: JSONValue]?

    var errorDescription: String? { message }

    /// Spec WL-03 — the wallet sheet shows the exact shortfall.
    var shortfall: Int? { details?["shortfall"]?.intValue }
    /// The other two halves of the same 402, which §37.3's
    /// `insufficient_credits_shown` reports alongside it.
    var requiredCredits: Int? { details?["required"]?.intValue }
    var balanceCredits: Int? { details?["balance"]?.intValue }
    var currentRevision: Int? { details?["currentRevision"]?.intValue }
    var isOffline: Bool { code == "OFFLINE" }
    var isInsufficientCredits: Bool { code == "INSUFFICIENT_CREDITS" }
    var isStaleRevision: Bool { code == "STALE_REVISION" }
}

extension Error {
    /// Player-facing text for any error the app can throw.
    var playerMessage: String {
        if let api = self as? APIError { return api.message }
        if let auth = self as? AuthError { return auth.message }
        if let purchase = self as? PurchaseError { return purchase.message }
        return localizedDescription
    }
}

// MARK: - Turn stream

struct TurnStreamHandlers {
    var onEvent: (TurnStreamEventName, [String: JSONValue]) -> Void
    var onError: (Error) -> Void
}

// MARK: - APIClient
//
// The typed `/v1` client — twin of `apps/mobile/src/api/client.ts`. Every
// response shape lives in `Models.swift`. Requests ask the auth store for a
// token before sending, so one that expired while the app was backgrounded is
// renewed rather than sent and rejected.

actor APIClient {
    typealias TokenProvider = (_ force: Bool) async -> String?

    let baseURL: URL
    private let session: URLSession
    private var tokenProvider: TokenProvider?
    private var token: String?
    private var locale: AppLocale = .en
    private var translator = Translator(locale: .en)

    init(baseURL: URL = AppConfig.apiURL) {
        self.baseURL = baseURL
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 60
        // The ceiling for a whole request, which a per-request timeoutInterval
        // cannot raise above. Compiling a world is the one call that needs the
        // headroom; everything else is bounded by the 60 above.
        configuration.timeoutIntervalForResource = 300
        configuration.waitsForConnectivity = false
        self.session = URLSession(configuration: configuration)
    }

    /// Installed once at boot by the app store.
    func setTokenProvider(_ provider: TokenProvider?) {
        tokenProvider = provider
    }

    func setToken(_ token: String?) {
        self.token = token
    }

    /// The language this app is in, sent on every request as `Accept-Language`
    /// so a guest is served hooks and rail titles in the language of the chrome.
    func setLocale(_ locale: AppLocale) {
        self.locale = locale
        translator = Translator(locale: locale)
    }

    private func authorization(force: Bool = false) async -> String? {
        if let tokenProvider {
            let renewed = await tokenProvider(force)
            token = renewed
            return renewed
        }
        return token
    }

    // MARK: Request core

    private struct Empty: Codable {}

    private func request<T: Decodable>(
        _ method: String,
        _ path: String,
        body: (any Encodable)? = nil,
        headers: [String: String] = [:],
        retryOnExpiry: Bool = true,
        useToken: String? = nil,
        timeout: TimeInterval? = nil
    ) async throws -> T {
        var urlRequest = URLRequest(url: URL(string: path, relativeTo: baseURL)!.absoluteURL)
        urlRequest.httpMethod = method
        // Everything here answers well inside the session's 60 seconds except
        // compiling a world, which is two large generations and takes two
        // minutes on a bad day.
        if let timeout { urlRequest.timeoutInterval = timeout }
        urlRequest.setValue("application/json", forHTTPHeaderField: "accept")
        urlRequest.setValue(locale.rawValue, forHTTPHeaderField: "accept-language")
        urlRequest.setValue(AppConfig.appVersion, forHTTPHeaderField: "x-app-version")
        // §37 — the install id and the platform, so events the server emits for
        // this call land on the same person as the ones the app emits. Without
        // the device id a signed-out player is two people to the funnel.
        urlRequest.setValue(AppConfig.deviceId, forHTTPHeaderField: "x-device-id")
        urlRequest.setValue("ios", forHTTPHeaderField: "x-platform")
        for (key, value) in headers { urlRequest.setValue(value, forHTTPHeaderField: key) }
        if let body {
            urlRequest.setValue("application/json", forHTTPHeaderField: "content-type")
            urlRequest.httpBody = try JSONEncoder.plotbreak.encode(AnyEncodable(body))
        }

        // A retry already has the token the renewal produced. Asking the
        // provider again would spend a second refresh, and GoTrue rotates them.
        let bearer: String?
        if let useToken { bearer = useToken } else { bearer = await authorization() }
        // i18n-exempt: an HTTP Authorization header value, not copy
        if let bearer { urlRequest.setValue("Bearer \(bearer)", forHTTPHeaderField: "authorization") }

        let data: Data
        let response: HTTPURLResponse
        do {
            let (received, raw) = try await session.data(for: urlRequest)
            guard let http = raw as? HTTPURLResponse else {
                throw APIError(status: 0, code: "OFFLINE", message: translator("error.offline_action_saved"), details: nil)
            }
            data = received
            response = http
        } catch let error as APIError {
            throw error
        } catch {
            // Spec §10.8 — offline is a first-class state with plain copy.
            throw APIError(status: 0, code: "OFFLINE", message: translator("error.offline_action_saved"),
                           details: ["cause": .string(String(describing: error))])
        }

        if response.statusCode == 204 || (data.isEmpty && T.self == Empty.self) {
            if let empty = Empty() as? T { return empty }
        }

        if !(200..<300).contains(response.statusCode) {
            let envelope = try? JSONDecoder.plotbreak.decode(ErrorEnvelope.self, from: data)
            let code = envelope?.code ?? "UNKNOWN"

            // The server distinguishes an expired token from a bad one precisely
            // so this can happen: renew and retry once, silently. UNAUTHENTICATED
            // means we sent no token at all, which the auth store recovers from by
            // signing in as a guest on demand.
            let recoverable = code == "TOKEN_EXPIRED" || code == "UNAUTHENTICATED"
            if response.statusCode == 401, recoverable, retryOnExpiry {
                token = nil
                if let renewed = await authorization(force: true) {
                    return try await request(method, path, body: body, headers: headers, retryOnExpiry: false, useToken: renewed, timeout: timeout)
                }
            }

            // A development build talking to a server that has real auth turned
            // on sends a `guest_…` token that server will never accept.
            if response.statusCode == 401, bearer?.hasPrefix("guest_") == true {
                throw APIError(status: 401, code: "AUTH_NOT_CONFIGURED", message: translator("error.auth_not_configured"), details: nil)
            }

            throw APIError(
                status: response.statusCode,
                code: code,
                message: envelope?.message ?? translator("error.request_failed"),
                details: envelope?.details
            )
        }

        if data.isEmpty, let empty = Empty() as? T { return empty }
        do {
            return try JSONDecoder.plotbreak.decode(T.self, from: data)
        } catch {
            #if DEBUG
            // i18n-exempt: a debug-build console line, not copy
            print("[api] decode failed for \(method) \(path): \(error)")
            #endif
            throw APIError(status: response.statusCode, code: "DECODE", message: translator("error.request_failed"),
                           details: ["cause": .string(String(describing: error))])
        }
    }

    private struct ErrorEnvelope: Decodable {
        var code: String?
        var message: String?
        var details: [String: JSONValue]?
    }

    private struct AnyEncodable: Encodable {
        let value: any Encodable
        init(_ value: any Encodable) { self.value = value }
        func encode(to encoder: Encoder) throws { try value.encode(to: encoder) }
    }

    private func query(_ items: [(String, String?)]) -> String {
        var components = URLComponents()
        components.queryItems = items.compactMap { key, value in value.map { URLQueryItem(name: key, value: $0) } }
        let encoded = components.percentEncodedQuery ?? ""
        return encoded.isEmpty ? "" : "?\(encoded)"
    }

    // MARK: Bootstrap and catalog

    func bootstrap() async throws -> BootstrapResponse {
        try await request("GET", "/v1/bootstrap")
    }

    /// Tastes ride along rather than being stored, so this works signed out.
    func discover(tastes: [String] = [], category: String? = nil) async throws -> DiscoverResponse {
        try await request("GET", "/v1/discover" + query([
            ("tastes", tastes.isEmpty ? nil : tastes.joined(separator: ",")),
            ("category", category),
        ]))
    }

    func search(_ text: String, category: String? = nil) async throws -> SearchResponse {
        try await request("GET", "/v1/search" + query([("q", text), ("category", category)]))
    }

    func storyDetail(_ storyId: String) async throws -> StoryDetailResponse {
        try await request("GET", "/v1/stories/\(storyId)")
    }

    func saveStory(_ storyId: String, saved: Bool) async throws -> SavedResponse {
        try await request(saved ? "POST" : "DELETE", "/v1/stories/\(storyId)/save")
    }

    func likeStory(_ storyId: String, liked: Bool) async throws -> LikedResponse {
        try await request(liked ? "POST" : "DELETE", "/v1/stories/\(storyId)/like")
    }

    func hideStory(_ storyId: String) async throws -> HiddenResponse {
        try await request("POST", "/v1/stories/\(storyId)/hide")
    }

    // MARK: Comments

    func comments(_ storyId: String, sort: CommentSort) async throws -> CommentsResponse {
        try await request("GET", "/v1/stories/\(storyId)/comments?sort=\(sort.rawValue)")
    }

    func postComment(_ storyId: String, body: String, spoiler: Bool) async throws -> PostCommentResponse {
        struct Body: Encodable { let body: String; let spoiler: Bool }
        return try await request("POST", "/v1/stories/\(storyId)/comments", body: Body(body: body, spoiler: spoiler))
    }

    func deleteComment(_ commentId: String) async throws -> DeletedResponse {
        try await request("DELETE", "/v1/comments/\(commentId)")
    }

    func likeComment(_ commentId: String, liked: Bool) async throws -> LikedResponse {
        try await request(liked ? "POST" : "DELETE", "/v1/comments/\(commentId)/like")
    }

    func reportComment(_ commentId: String, reason: String) async throws -> ReportedResponse {
        struct Body: Encodable { let reason: String }
        return try await request("POST", "/v1/comments/\(commentId)/report", body: Body(reason: reason))
    }

    // MARK: Badges

    func badges() async throws -> BadgesResponse {
        try await request("GET", "/v1/badges")
    }

    func claimBadge(_ badgeId: String) async throws -> ClaimBadgeResponse {
        try await request("POST", "/v1/badges/\(badgeId)/claim")
    }

    // MARK: Sessions

    func createSession(storyId: String, _ body: CreateSessionRequest) async throws -> SessionDetailResponse {
        try await request("POST", "/v1/stories/\(storyId)/sessions", body: body)
    }

    func listSessions() async throws -> SessionsResponse {
        try await request("GET", "/v1/sessions")
    }

    func session(_ sessionId: String) async throws -> SessionDetailResponse {
        try await request("GET", "/v1/sessions/\(sessionId)")
    }

    func deleteSession(_ sessionId: String) async throws -> DeletedResponse {
        try await request("DELETE", "/v1/sessions/\(sessionId)")
    }

    func worldSheet(_ sessionId: String) async throws -> WorldSheetResponse {
        try await request("GET", "/v1/sessions/\(sessionId)/world-sheet")
    }

    func timeline(_ sessionId: String) async throws -> TimelineResponse {
        try await request("GET", "/v1/sessions/\(sessionId)/timeline")
    }

    func forkSession(_ sessionId: String, atTurnIndex: Int? = nil) async throws -> ForkResponse {
        struct Body: Encodable { let atTurnIndex: Int? }
        return try await request("POST", "/v1/sessions/\(sessionId)/forks", body: Body(atTurnIndex: atTurnIndex))
    }

    func correctCanon(_ sessionId: String, factId: String, correctedText: String) async throws -> CanonCorrectionResponse {
        struct Body: Encodable { let factId: String; let correctedText: String }
        return try await request("POST", "/v1/sessions/\(sessionId)/canon-corrections", body: Body(factId: factId, correctedText: correctedText))
    }

    /// WS-07 — keep this moment. Pinned canon is weighted higher in retrieval.
    func pinTimelineEntry(_ sessionId: String, factId: String, pinned: Bool) async throws -> PinResponse {
        struct Body: Encodable { let pinned: Bool }
        return try await request("POST", "/v1/sessions/\(sessionId)/timeline/\(factId)/pin", body: Body(pinned: pinned))
    }

    // MARK: Turns

    func submitTurn(_ sessionId: String, _ body: SubmitTurnRequest, idempotencyKey: String) async throws -> SubmitTurnResponse {
        try await request("POST", "/v1/sessions/\(sessionId)/turns", body: body, headers: ["idempotency-key": idempotencyKey])
    }

    func turn(_ turnId: String) async throws -> PlayerTurnRecord {
        try await request("GET", "/v1/turns/\(turnId)")
    }

    /// GP-04 / §20.9 — ask for the same moment in different words.
    func rephraseTurn(_ turnId: String) async throws -> RephraseResponse {
        try await request("POST", "/v1/turns/\(turnId)/rephrase")
    }

    /// Consumes the SSE turn stream. Falls back to polling the finished turn if
    /// the stream drops, because the turn may still have committed server-side.
    nonisolated func streamTurn(_ turnId: String, streamToken: String, handlers: TurnStreamHandlers) async {
        let base = baseURL
        var components = URLComponents(url: URL(string: "/v1/turns/\(turnId)/stream", relativeTo: base)!.absoluteURL, resolvingAgainstBaseURL: false)!
        components.queryItems = [URLQueryItem(name: "token", value: streamToken)]
        var request = URLRequest(url: components.url!)
        request.timeoutInterval = 180
        // i18n-exempt: an HTTP Authorization header value, not copy
        if let token = await token { request.setValue("Bearer \(token)", forHTTPHeaderField: "authorization") }
        request.setValue("text/event-stream", forHTTPHeaderField: "accept")

        do {
            let (bytes, response) = try await URLSession.shared.bytes(for: request)
            guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
                await pollTurn(turnId, handlers: handlers)
                return
            }
            // One frame, one `data:` line.
            //
            // Deliberately not "accumulate until a blank line", which is how SSE
            // is usually framed: `AsyncLineSequence` collapses consecutive
            // newlines, so the blank line that ends a frame never arrives and
            // nothing was ever dispatched — every turn silently fell through to
            // the poller below and appeared all at once instead of streaming.
            // The server writes the whole event as one line of JSON
            // (`formatSse`), so each one stands alone.
            var completed = false
            for try await line in bytes.lines {
                if Task.isCancelled { return }
                guard let frame = Self.parseFrame(line) else { continue }
                handlers.onEvent(frame.event, frame.data)
                if frame.event == .turnCompleted || frame.event == .turnFailed { completed = true }
            }
            // The turn may still have committed after the stream dropped.
            if !completed {
                await pollTurn(turnId, handlers: handlers)
            }
        } catch {
            if Task.isCancelled { return }
            await pollTurn(turnId, handlers: handlers, onFailure: { handlers.onError(error) })
        }
    }

    /// One SSE line. `event:`, `id:` and `:` comment lines carry nothing the
    /// payload does not already say, so only `data:` is read.
    nonisolated static func parseFrame(_ line: String) -> TurnStreamFrame? {
        guard line.hasPrefix("data:") else { return nil }
        let payload = line.dropFirst(5).trimmingCharacters(in: .whitespaces)
        guard let data = payload.data(using: .utf8) else { return nil }
        return try? JSONDecoder.plotbreak.decode(TurnStreamFrame.self, from: data)
    }

    /// Fast at first, because a stream that drops near the end is the common
    /// case and the turn is already there; then a second at a time out to ~90s.
    nonisolated private func pollTurn(_ turnId: String, handlers: TurnStreamHandlers, onFailure: (() -> Void)? = nil) async {
        for attempt in 0..<100 {
            if Task.isCancelled { return }
            do {
                let turn = try await self.turn(turnId)
                for check in turn.checks {
                    handlers.onEvent(.checkResolved, [
                        "checkId": .string(check.checkId),
                        "label": .string(check.label),
                        "outcome": .string(check.outcome.rawValue),
                        "outcomeLabel": .string(check.outcome.rawValue),
                        "difficultyLabel": .string(check.difficultyLabel),
                        "math": check.math.map(JSONValue.string) ?? .null,
                    ])
                }
                for (index, block) in turn.blocks.enumerated() {
                    handlers.onEvent(.textDelta, [
                        "blockIndex": .number(Double(index)),
                        "type": .string(block.type.rawValue),
                        "speakerId": block.speakerId.map(JSONValue.string) ?? .null,
                        "text": .string(block.text),
                    ])
                }
                let suggestions = (try? JSONEncoder.plotbreak.encode(turn.suggestions))
                    .flatMap { try? JSONDecoder.plotbreak.decode(JSONValue.self, from: $0) } ?? .array([])
                handlers.onEvent(.turnCompleted, [
                    "turnId": .string(turn.turnId),
                    "sceneSummary": .string(turn.sceneSummary),
                    "endStatePrompt": .string(turn.endStatePrompt),
                    "suggestions": suggestions,
                    "creditsCharged": .number(Double(turn.creditsCharged)),
                ])
                return
            } catch let error as APIError where error.status == 404 {
                try? await Task.sleep(nanoseconds: attempt < 12 ? 250_000_000 : 1_000_000_000)
                continue
            } catch {
                if let onFailure { onFailure() } else { handlers.onError(error) }
                return
            }
        }
        let message = await translator("error.turn_timeout")
        handlers.onError(APIError(status: 0, code: "TURN_TIMEOUT", message: message, details: nil))
    }

    // MARK: Media (§9.3)

    /// Generates or regenerates the player's portrait for a run. Costs credits
    /// and is refunded automatically if the provider fails.
    func generatePortrait(_ sessionId: String, appearanceNote: String? = nil) async throws -> PortraitResponse {
        struct Body: Encodable { let appearanceNote: String? }
        return try await request("POST", "/v1/sessions/\(sessionId)/portrait", body: Body(appearanceNote: appearanceNote))
    }

    /// Every player character across every world, with the canon each accumulated.
    func myCharacters() async throws -> MyCharactersResponse {
        try await request("GET", "/v1/me/characters")
    }

    // MARK: Wallet

    func wallet() async throws -> WalletResponse {
        try await request("GET", "/v1/wallet")
    }

    func ledger(cursor: String? = nil) async throws -> LedgerResponse {
        try await request("GET", "/v1/wallet/ledger" + query([("cursor", cursor)]))
    }

    func claimDaily() async throws -> DailyClaimResponse {
        try await request("POST", "/v1/wallet/daily-claim")
    }

    /// Hands the server what the store gave us. The server asks Apple directly
    /// and credits nothing this request merely claims (§33.5).
    func syncPurchase(_ body: PurchaseSyncRequest) async throws -> PurchaseSyncResponse {
        try await request("POST", "/v1/store/purchases/sync", body: body)
    }

    /// Spec §20.6 — `Restore purchases`.
    func restorePurchases(_ transactions: [PurchaseSyncRequest]) async throws -> PurchaseRestoreResponse {
        struct Body: Encodable { let transactions: [PurchaseSyncRequest] }
        return try await request("POST", "/v1/store/purchases/restore", body: Body(transactions: transactions))
    }

    // MARK: Account and safety

    func me() async throws -> MeResponse {
        try await request("GET", "/v1/me")
    }

    func updateMe(_ patch: [String: JSONValue]) async throws -> MeResponse {
        try await request("PATCH", "/v1/me", body: patch)
    }

    func report(_ body: CreateReportRequest) async throws -> ReportResponse {
        try await request("POST", "/v1/reports", body: body)
    }

    func reportHistory() async throws -> ReportHistoryResponse {
        try await request("GET", "/v1/report-history")
    }

    func migrateGuest(guestUserId: String, displayName: String) async throws -> GuestMigrateResponse {
        struct Body: Encodable { let guestUserId: String; let displayName: String }
        return try await request("POST", "/v1/auth/guest-migrate", body: Body(guestUserId: guestUserId, displayName: displayName))
    }

    func deleteAccount() async throws -> DeletedResponse {
        try await request("POST", "/v1/account/deletion-request")
    }

    // MARK: Create mode

    /// The vocabulary the builder renders — tones, lengths, visibilities, costs.
    func createOptions() async throws -> CreateOptionsResponse {
        try await request("GET", "/v1/create/options")
    }

    /// This creator's titles: drafts and published worlds together, newest first.
    func creatorTitles() async throws -> CreateTitlesResponse {
        try await request("GET", "/v1/create/titles")
    }

    func newDraft() async throws -> DraftResponse {
        struct Body: Encodable {}
        return try await request("POST", "/v1/create/drafts", body: Body())
    }

    func draft(_ draftId: String) async throws -> DraftResponse {
        try await request("GET", "/v1/create/drafts/\(draftId)")
    }

    /// A partial update. Only the keys present are changed.
    func patchDraft(_ draftId: String, _ patch: [String: JSONValue]) async throws -> DraftResponse {
        try await request("PATCH", "/v1/create/drafts/\(draftId)", body: patch)
    }

    func deleteDraft(_ draftId: String) async throws -> DeletedResponse {
        try await request("DELETE", "/v1/create/drafts/\(draftId)")
    }

    /// The pitch, compiled into a world. Two large generations server-side, so
    /// this is the one call in the app that is allowed to take a minute or two.
    func compileDraft(
        _ draftId: String,
        pitch: String,
        tone: DraftTone?,
        length: DraftLength,
        pov: DraftPov,
        locale: AppLocale
    ) async throws -> DraftResponse {
        struct Body: Encodable {
            let pitch: String
            let tone: String?
            let length: String
            let pov: String
            let locale: String
        }
        return try await request(
            "POST",
            "/v1/create/drafts/\(draftId)/compile",
            body: Body(pitch: pitch, tone: tone?.rawValue, length: length.rawValue, pov: pov.rawValue, locale: locale.rawValue),
            timeout: 300
        )
    }

    /// Auto-generate, one field or one entity at a time.
    func assistDraft(_ draftId: String, target: AssistTarget, index: Int? = nil) async throws -> DraftResponse {
        struct Body: Encodable { let target: String; let index: Int? }
        return try await request("POST", "/v1/create/drafts/\(draftId)/assist", body: Body(target: target.rawValue, index: index), timeout: 180)
    }

    func publishDraft(_ draftId: String, visibility: DraftVisibility) async throws -> PublishDraftResponse {
        struct Body: Encodable { let visibility: String }
        return try await request("POST", "/v1/create/drafts/\(draftId)/publish", body: Body(visibility: visibility.rawValue))
    }

    func setDraftVisibility(_ draftId: String, visibility: DraftVisibility) async throws -> DraftResponse {
        struct Body: Encodable { let visibility: String }
        return try await request("POST", "/v1/create/drafts/\(draftId)/visibility", body: Body(visibility: visibility.rawValue))
    }
}
