import SwiftUI
import AuthenticationServices

// MARK: - Sign in
//
// AU-01 — the sign-in sheet. Spec §6.3: shown only when the player reaches
// something that genuinely needs an account, and the copy says what they get.
// §6.4: Sign in with Apple or an emailed code. No password is ever created.
// A provider that is not configured in this build is not shown. Twin of
// `SignInScreen` in `apps/mobile/src/screens/Misc.tsx`.

struct SignInScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var busy: String?
    @State private var notice: String?
    @State private var errorMessage: String?
    @State private var email = ""
    @State private var code = ""
    @State private var codeSent = false
    @State private var rawNonce = ""

    private var emailValid: Bool {
        email.trimmingCharacters(in: .whitespaces).range(of: #".+@.+\..+"#, options: .regularExpression) != nil
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Spacer()
                    IconButton(t("misc.close"), glyph: "✕") { router.dismissSheet() }
                }
                .padding(.horizontal, Theme.Spacing.sm)

                if store.isGuest {
                    form
                } else {
                    signedIn
                }
            }
        }
    }

    private var signedIn: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
            Spacer()
            Txt(t("misc.signed_in_title"), .display)
            Txt(
                store.email.map { t("misc.signed_in_as", ["email": $0]) } ?? t("misc.worlds_saved_anywhere"),
                .body, color: Theme.Colors.textSecondary
            )
            PBButton(t("misc.done")) { router.dismissSheet() }
            Spacer()
        }
        .padding(Theme.gutter)
    }

    private var form: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: Theme.Spacing.xxl) {
                VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                    Txt(t("misc.sign_in_title"), .display)
                    Txt(t("misc.sign_in_body"), .body, color: Theme.Colors.textSecondary)
                }

                if !store.authConfigured {
                    Card { Txt(t("misc.sign_in_not_configured"), .bodyCompact) }
                } else {
                    VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                        appleButton

                        if !codeSent {
                            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                                Txt(t("misc.email_code_hint"), .caption, color: Theme.Colors.textSecondary)
                                TextField(t("misc.email_placeholder"), text: $email)
                                    .textInputAutocapitalization(.never)
                                    .autocorrectionDisabled()
                                    .keyboardType(.emailAddress)
                                    .textContentType(.emailAddress)
                                    .accessibilityLabel(t("misc.email_address"))
                                    .signInField()
                                PBButton(
                                    t("misc.email_me_a_code"),
                                    loadingLabel: t("misc.sending"),
                                    variant: .secondary,
                                    loading: busy == "send",
                                    disabled: !emailValid
                                ) {
                                    run("send") {
                                        try await store.sendEmailCode(email.trimmingCharacters(in: .whitespaces))
                                        codeSent = true
                                        notice = t("misc.code_sent", ["email": email.trimmingCharacters(in: .whitespaces)])
                                    }
                                }
                            }
                        } else {
                            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                                Txt(t("misc.enter_code_sent_to", ["email": email.trimmingCharacters(in: .whitespaces)]), .caption, color: Theme.Colors.textSecondary)
                                TextField("123456", text: $code)
                                    .keyboardType(.numberPad)
                                    .textContentType(.oneTimeCode)
                                    .accessibilityLabel(t("misc.six_digit_code"))
                                    .signInField()
                                    .onChange(of: code) { _, value in if value.count > 8 { code = String(value.prefix(8)) } }
                                PBButton(
                                    t("misc.sign_in"),
                                    loadingLabel: t("misc.signing_in"),
                                    loading: busy == "verify",
                                    disabled: code.trimmingCharacters(in: .whitespaces).count < 6
                                ) {
                                    run("verify") {
                                        try await store.verifyEmailCode(email.trimmingCharacters(in: .whitespaces), code: code.trimmingCharacters(in: .whitespaces))
                                        finish()
                                    }
                                }
                                PBButton(t("misc.use_a_different_email"), variant: .tertiary) {
                                    codeSent = false
                                    code = ""
                                    notice = nil
                                }
                            }
                        }
                    }
                }

                if let errorMessage {
                    Txt(errorMessage, .bodyCompact, color: Theme.Colors.danger)
                }
                if let notice {
                    Card { Txt(notice, .bodyCompact) }
                }

                PBButton(t("misc.not_now"), variant: .tertiary) { router.dismissSheet() }

                Txt(t("misc.no_password_footer"), .micro, color: Theme.Colors.textMuted, center: true)
            }
            .padding(Theme.gutter)
            .frame(maxWidth: .infinity)
        }
        .scrollDismissesKeyboard(.interactively)
    }

    private var appleButton: some View {
        SignInWithAppleButton(.continue) { request in
            rawNonce = AppleNonce.random()
            request.requestedScopes = [.email, .fullName]
            request.nonce = AppleNonce.sha256(rawNonce)
        } onCompletion: { result in
            switch result {
            case .success(let authorization):
                guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else { return }
                let nonce = rawNonce
                run("apple") {
                    try await store.signInWithApple(credential: credential, rawNonce: nonce)
                    finish()
                }
            case .failure(let error):
                // Apple's own sheet reports a cancel as an error; a player who
                // changed their mind has not hit a problem.
                if (error as? ASAuthorizationError)?.code == .canceled { return }
                errorMessage = error.playerMessage
            }
        }
        .signInWithAppleButtonStyle(.white)
        .frame(height: ButtonSize.large.height)
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
        .opacity(busy == "apple" ? 0.45 : 1)
        .disabled(busy != nil)
        .accessibilityLabel(t("misc.continue_with_apple"))
    }

    private func run(_ key: String, _ work: @escaping () async throws -> Void) {
        busy = key
        errorMessage = nil
        Task {
            do {
                try await work()
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
            router.dismissSheet()
        }
    }
}

// MARK: - Field style

private struct SignInFieldStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 16))
            .foregroundStyle(Theme.Colors.textPrimary)
            .padding(Theme.Spacing.md)
            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 1)
            }
    }
}

private extension View {
    func signInField() -> some View { modifier(SignInFieldStyle()) }
}
