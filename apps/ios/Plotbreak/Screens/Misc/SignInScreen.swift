import SwiftUI
import AuthenticationServices
import GoogleSignIn

// MARK: - Sign in
//
// AU-01 — screen 01 of the redesign: a tilted wall of cover art behind the
// wordmark, the sign-up bonus in a bubble, and two provider buttons: Google
// first, then Apple. Spec §6.4: no password is ever created.
//
// Two ways in: `embedded` is the first onboarding step; otherwise it is the
// sheet Library and Profile open when an account is needed. A build with no
// auth project configured says so and lets a developer through.
// Twin of `SignInScreen` in `apps/mobile/src/screens/Misc.tsx`.

struct SignInScreen: View {
    /// The first onboarding step, drawn before the `Router` exists.
    var embedded: Bool = false

    @Environment(AppStore.self) private var store
    @Environment(\.translator) private var t
    @Environment(\.dismiss) private var dismiss

    @State private var busy: String?
    @State private var notice: String?
    @State private var errorMessage: String?
    @State private var covers: [StorySummary] = []
    @State private var apple = AppleSignIn()

    var body: some View {
        ZStack {
            Theme.Colors.bgBase.ignoresSafeArea()
            CoverWall(stories: covers)
                .ignoresSafeArea()
                .accessibilityHidden(true)

            VStack(spacing: 0) {
                if !embedded {
                    HStack {
                        Spacer(minLength: 0)
                        IconButton(t("misc.close"), action: { close() }) {
                            Image(systemName: "xmark")
                                .font(.system(size: 20, weight: .medium))
                                .foregroundStyle(Theme.Colors.textMuted)
                        }
                    }
                    .padding(.horizontal, Theme.Spacing.sm)
                }

                Spacer(minLength: 0)
                wordmark
                Spacer(minLength: 0)

                if !store.isGuest {
                    signedIn
                } else {
                    footer
                }
            }
        }
        .preferredColorScheme(.dark)
        .toolbar(.hidden, for: .navigationBar)
        .task { await loadCovers() }
    }

    // MARK: Pieces

    /// The brand lockup from `docs/brand`, in the interface language.
    private var wordmark: some View {
        Image(store.locale == .fr ? "WordmarkFR" : "WordmarkEN")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(maxWidth: 300)
            .padding(.horizontal, Theme.Spacing.xxxl)
            .padding(.bottom, 120)
            // i18n-exempt: the product name is the same word in every language
            .accessibilityLabel("Plotbreak")
    }

    private var signedIn: some View {
        VStack(spacing: Theme.Spacing.lg) {
            Txt(t("misc.signed_in_title"), .h2, center: true)
            Txt(
                store.email.map { t("misc.signed_in_as", ["email": $0]) } ?? t("misc.worlds_saved_anywhere"),
                .bodyCompact, color: Theme.Colors.textSecondary, center: true
            )
            PBButton(t("misc.done"), variant: .light, size: .medium) { close() }
        }
        .padding(.horizontal, Theme.Spacing.xl)
        .padding(.bottom, Theme.Spacing.xxl)
    }

    @ViewBuilder private var footer: some View {
        VStack(spacing: 0) {
            if store.authConfigured {
                TooltipBubble(text: t("misc.sign_in_bonus"))
                    .padding(.bottom, 18)
                    .accessibilityHidden(true)

                if store.googleConfigured {
                    PBButton(t("misc.continue_with_google"), loadingLabel: t("misc.signing_in"), variant: .neutral, size: .medium,
                             loading: busy == "google", disabled: busy != nil) {
                        run("google") { try await store.signInWithGoogle() }
                    }
                    .overlay(alignment: .leading) { GoogleMark().padding(.leading, 18).allowsHitTesting(false) }
                    .padding(.bottom, 14)
                }

                PBButton(t("misc.continue_with_apple"), loadingLabel: t("misc.signing_in"), variant: .neutral, size: .medium,
                         loading: busy == "apple", disabled: busy != nil) {
                    run("apple") {
                        let (credential, nonce) = try await apple.request()
                        try await store.signInWithApple(credential: credential, rawNonce: nonce)
                    }
                }
                .overlay(alignment: .leading) {
                    Image(systemName: "apple.logo")
                        .font(.system(size: 20, weight: .medium))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .padding(.leading, 20)
                        .allowsHitTesting(false)
                }
                .padding(.bottom, 30)
            } else {
                // A developer build: say so, and let them through.
                Card { Txt(t("misc.sign_in_not_configured"), .bodyCompact) }
                    .padding(.bottom, 14)
                PBButton(t("onboarding.continue"), variant: .light, size: .medium) { close() }
                    .padding(.bottom, 30)
            }

            if let errorMessage {
                Txt(errorMessage, .caption, color: Theme.Colors.danger, center: true)
                    .padding(.bottom, Theme.Spacing.md)
            }
            if let notice {
                Txt(notice, .caption, color: Theme.Colors.textSecondary, center: true)
                    .padding(.bottom, Theme.Spacing.md)
            }

            LegalFooter()
        }
        .padding(.horizontal, Theme.Spacing.xl)
        .padding(.bottom, Theme.Spacing.xxl)
    }

    // MARK: Behaviour

    /// Runs one provider flow. A player who closed the provider's page has not
    /// hit a problem, and is told nothing.
    private func run(_ key: String, _ work: @escaping () async throws -> Void) {
        busy = key
        errorMessage = nil
        Task {
            do {
                try await work()
                finish()
            } catch let error as GIDSignInError where error.code == .canceled {
                // Closed Google's sheet.
            } catch let error as ASAuthorizationError where error.code == .canceled {
                // Dismissed Apple's sheet.
            } catch let error as AuthError where error.code == "CANCELLED" {
                // Same, reported our way.
            } catch {
                errorMessage = error.playerMessage.isEmpty ? t("misc.sign_in_failed") : error.playerMessage
            }
            busy = nil
        }
    }

    private func finish() {
        notice = t("misc.signed_in_notice")
        Task {
            try? await Task.sleep(nanoseconds: 900_000_000)
            close()
        }
    }

    /// Onboarding moves on; a sheet closes. The sheet's dismissal comes from
    /// the environment rather than the router, because the embedded step has
    /// no router yet.
    private func close() {
        if embedded {
            store.markSignInSeen()
        } else {
            dismiss()
        }
    }

    /// The wall wants sixteen covers. The last Discover shelf on disk answers
    /// instantly; the network fills in on a fresh install.
    private func loadCovers() async {
        func pick(_ data: DiscoverResponse) -> [StorySummary] {
            var seen = Set<String>()
            return data.rails.flatMap(\.stories).filter { $0.coverImage != nil && seen.insert($0.storyId).inserted }
        }
        if let saved = store.discoverSnapshot.load() { covers = Array(pick(saved).prefix(16)) }
        if covers.count < 16, let fresh = try? await store.api.discover() { covers = Array(pick(fresh).prefix(16)) }
    }
}

// MARK: - Sign in with Apple, as a request

/// Drives `ASAuthorizationController` from a plain button, so Apple's button
/// can match Google's rather than carrying its own style.
@MainActor
private final class AppleSignIn: NSObject, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    private var continuation: CheckedContinuation<ASAuthorizationAppleIDCredential, Error>?
    private var rawNonce = ""

    func request() async throws -> (ASAuthorizationAppleIDCredential, String) {
        rawNonce = AppleNonce.random()
        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.email, .fullName]
        request.nonce = AppleNonce.sha256(rawNonce)
        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = self
        controller.presentationContextProvider = self
        let credential: ASAuthorizationAppleIDCredential = try await withCheckedThrowingContinuation { continuation in
            self.continuation = continuation
            controller.performRequests()
        }
        return (credential, rawNonce)
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        if let credential = authorization.credential as? ASAuthorizationAppleIDCredential {
            continuation?.resume(returning: credential)
        } else {
            continuation?.resume(throwing: ASAuthorizationError(.failed))
        }
        continuation = nil
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        continuation?.resume(throwing: error)
        continuation = nil
    }

    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        return scenes.first(where: { $0.activationState == .foregroundActive })?.keyWindow
            ?? scenes.first?.keyWindow ?? ASPresentationAnchor()
    }
}

// MARK: - Google mark

/// Google's own "G", the asset the Sign-In SDK ships for its button.
private struct GoogleMark: View {
    var size: CGFloat = 21

    var body: some View {
        Image("GoogleMark")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: size, height: size)
            .accessibilityHidden(true)
    }
}

// MARK: - Cover wall

/// Covers in four columns, tilted seven degrees, dimmed to a texture under
/// the wordmark and vignetted toward the edges. The columns drift, alternate
/// ones in opposite directions, and loop without a seam: each column is its
/// own tiles twice over, scrolled by exactly one set. Reduce Motion holds it.
private struct CoverWall: View {
    let stories: [StorySummary]
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private let columns = 4
    private let rows = 4

    var body: some View {
        GeometryReader { proxy in
            let width = proxy.size.width + 80
            let gap: CGFloat = 10
            let tile = (width - gap * CGFloat(columns - 1)) / CGFloat(columns)
            let tileHeight = tile * 1.5
            let columnHeight = (tileHeight + gap) * CGFloat(rows)

            ZStack {
                HStack(alignment: .top, spacing: gap) {
                    ForEach(0..<columns, id: \.self) { column in
                        DriftingColumn(
                            stories: (0..<rows).map { row in
                                let index = row * columns + column
                                return index < stories.count ? stories[index] : nil
                            },
                            seed: column,
                            tile: tile,
                            tileHeight: tileHeight,
                            gap: gap,
                            columnHeight: columnHeight,
                            up: column % 2 == 0,
                            animate: !reduceMotion
                        )
                    }
                }
                .frame(width: width, height: columnHeight * 2)
                .rotationEffect(.degrees(-7))
                .position(x: proxy.size.width / 2, y: proxy.size.height * 0.45)

                Theme.Colors.bgBase.opacity(0.86)

                RadialGradient(
                    stops: [
                        .init(color: Theme.Colors.bgBase.opacity(0), location: 0),
                        .init(color: Theme.Colors.bgBase.opacity(0.55), location: 0.6),
                        .init(color: Theme.Colors.bgBase.opacity(0.95), location: 1),
                    ],
                    center: UnitPoint(x: 0.5, y: 0.4),
                    startRadius: 0,
                    endRadius: max(proxy.size.width, proxy.size.height) * 0.62
                )
            }
            .clipped()
        }
    }
}

/// One column: its tiles, then the same tiles again, moved by one set every
/// `duration` seconds. The offset is read off the clock rather than animated
/// state, so a re-render while covers arrive cannot stop it, and the wrap is
/// invisible because the second set is where the first one was.
private struct DriftingColumn: View {
    let stories: [StorySummary?]
    let seed: Int
    let tile: CGFloat
    let tileHeight: CGFloat
    let gap: CGFloat
    let columnHeight: CGFloat
    let up: Bool
    let animate: Bool

    private let start = Date()

    /// Slightly different speeds per column, so the wall does not march.
    private var duration: Double { 70 + Double(seed) * 9 }

    var body: some View {
        TimelineView(.animation(minimumInterval: 1 / 30, paused: !animate)) { context in
            let elapsed = animate ? context.date.timeIntervalSince(start) : 0
            let progress = (elapsed / duration).truncatingRemainder(dividingBy: 1)
            let offset = CGFloat(progress) * columnHeight
            VStack(spacing: gap) {
                ForEach(0..<2, id: \.self) { _ in
                    ForEach(Array(stories.enumerated()), id: \.offset) { row, story in
                        Group {
                            if let story {
                                StoryArt(seed: story.storyId, title: story.title, uri: story.coverImage)
                            } else {
                                StoryArt(seed: "wall-\(seed)-\(row)", title: "", uri: nil)
                            }
                        }
                        .frame(width: tile, height: tileHeight)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                    }
                }
            }
            .offset(y: up ? -offset : offset - columnHeight)
        }
    }
}
