import SwiftUI

// MARK: - Report
//
// SF-01 — the report sheet: reason plus an optional hide. Twin of
// `ReportScreen` in `apps/mobile/src/screens/Misc.tsx`.

struct ReportScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    let targetType: String
    let targetId: String

    @State private var reason: ReportReason?
    @State private var details = ""
    @State private var alsoHide = false
    @State private var busy = false
    @State private var errorMessage: String?
    @State private var caseRef: String?

    /// The first of each pair is the reason the API stores; only the second is
    /// read by a person.
    private var reasons: [(ReportReason, String)] {
        [
            (.SEXUAL_CONTENT_INVOLVING_MINORS, t("misc.report_reason_sexual_content_involving_minors")),
            (.HARASSMENT, t("misc.report_reason_harassment")),
            (.HATE, t("misc.report_reason_hate")),
            (.VIOLENCE_THREAT, t("misc.report_reason_violence_threat")),
            (.SELF_HARM, t("misc.report_reason_self_harm")),
            (.IP_VIOLATION, t("misc.report_reason_ip_violation")),
            (.IMPERSONATION, t("misc.report_reason_impersonation")),
            (.BROKEN_OR_INCONSISTENT, t("misc.report_reason_broken")),
            (.OTHER, t("misc.report_reason_other")),
        ]
    }

    var body: some View {
        Screen {
            if let caseRef {
                VStack(alignment: .leading, spacing: Theme.Spacing.lg) {
                    Spacer()
                    Txt(t("misc.report_thanks_title"), .h1)
                    Txt(t("misc.report_thanks_body", ["caseRef": caseRef]), .body, color: Theme.Colors.textSecondary)
                    PBButton(t("misc.done")) { router.dismissSheet() }
                    Spacer()
                }
                .padding(Theme.gutter)
            } else {
                form
            }
        }
    }

    private var form: some View {
        VStack(spacing: 0) {
            HStack {
                Txt(t("misc.report_title"), .h2)
                Spacer()
                IconButton(t("misc.cancel"), glyph: "✕") { router.dismissSheet() }
            }
            .padding(.leading, Theme.gutter)
            .padding(.trailing, Theme.Spacing.sm)

            // The reasons alone are taller than the screen, so the submit
            // button needs room to clear the bottom edge.
            ScrollView {
                VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                    Txt(t("misc.report_target_question", ["target": targetType.lowercased()]), .bodyCompact, color: Theme.Colors.textSecondary)

                    VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                        ForEach(reasons, id: \.0) { item in
                            ReasonRow(label: item.1, selected: reason == item.0) { reason = item.0 }
                        }
                    }

                    TextField(t("misc.report_details_placeholder"), text: $details, axis: .vertical)
                        .lineLimit(4...10)
                        .font(.system(size: 17))
                        .foregroundStyle(Theme.Colors.textPrimary)
                        .padding(Theme.Spacing.lg)
                        .frame(minHeight: 96, alignment: .top)
                        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
                        .accessibilityLabel(t("misc.report_details_label"))
                        .onChange(of: details) { _, value in if value.count > 1000 { details = String(value.prefix(1000)) } }

                    // A switch, not another chip: a separate choice about the
                    // reporter's own feed, not a ninth reason.
                    Toggle(isOn: $alsoHide) {
                        Txt(t("misc.report_also_hide"), .bodyCompact)
                    }
                    .tint(Theme.Colors.accentPrimary)
                    .accessibilityLabel(t("misc.report_also_hide"))

                    if let errorMessage {
                        Txt(errorMessage, .bodyCompact, color: Theme.Colors.danger)
                    }

                    PBButton(t("misc.submit_report"), loadingLabel: t("misc.submitting"), loading: busy, disabled: reason == nil) {
                        submit()
                    }
                }
                .padding(Theme.gutter)
                .padding(.bottom, Theme.Spacing.giant)
            }
            .scrollDismissesKeyboard(.interactively)
        }
    }

    private func submit() {
        guard let reason else { return }
        busy = true
        errorMessage = nil
        let request = CreateReportRequest(
            targetType: ReportTargetType(rawValue: targetType.uppercased()) ?? .STORY,
            targetId: targetId,
            reason: reason,
            details: details,
            alsoHide: alsoHide
        )
        Task {
            do {
                caseRef = try await store.api.report(request).caseReference
            } catch {
                errorMessage = error.playerMessage
                busy = false
            }
        }
    }
}

// MARK: - ReasonRow

/// A chip that reads as a row: left-aligned, full width, so a long reason is
/// not truncated into a capsule.
private struct ReasonRow: View {
    let label: String
    let selected: Bool
    let action: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            HStack {
                Text(label)
                    .font(Theme.TypeStyle.caption.font())
                    .multilineTextAlignment(.leading)
                Spacer(minLength: 0)
            }
            .foregroundStyle(selected ? Theme.Colors.textOnAccent : Theme.Colors.textSecondary)
            .padding(.horizontal, Theme.Spacing.lg)
            .padding(.vertical, Theme.Spacing.md)
            .background(selected ? Theme.Colors.accentPrimary : Theme.Colors.bgRaised, in: Capsule())
            .overlay { Capsule().strokeBorder(selected ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: 0.5) }
        }
        .buttonStyle(PressOpacityStyle(pressed: 0.7))
        .accessibilityLabel(label)
        .accessibilityAddTraits(selected ? .isSelected : [])
    }
}
