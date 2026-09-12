import SwiftUI

// MARK: - Report history
//
// SF-02 — report history with case references. Twin of `ReportHistoryScreen`
// in `apps/mobile/src/screens/Misc.tsx`; the server returns the raw
// `reports` rows (`reportId`, `reason`, `status`, `createdAt`, ...) which
// `ReportHistoryEntry` already models.

struct ReportHistoryScreen: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var reports: [ReportHistoryEntry]?

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Txt(t("misc.report_history_title"), .h2)
                    Spacer()
                    IconButton(t("misc.close"), glyph: "✕") { router.dismissSheet() }
                }
                .padding(.leading, Theme.gutter)
                .padding(.trailing, Theme.Spacing.sm)

                if let reports, reports.isEmpty {
                    EmptyState(title: t("misc.report_history_empty_title"), message: t("misc.report_history_empty_body"))
                    Spacer(minLength: 0)
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                            ForEach(reports ?? []) { report in
                                Card {
                                    VStack(alignment: .leading, spacing: Theme.Spacing.xs) {
                                        HStack(alignment: .top) {
                                            // Server enum values, rendered as they arrive.
                                            Txt((report.reason ?? "").replacingOccurrences(of: "_", with: " ").lowercased(), .bodyCompact)
                                            Spacer(minLength: Theme.Spacing.sm)
                                            Chip(report.status ?? "", tone: report.status == "OPEN" ? .warning : .success)
                                        }
                                        Txt(
                                            t("misc.report_case_line", [
                                                "reference": report.caseReference ?? String(report.reportId.suffix(8)).uppercased(),
                                                "date": Format.shortISODate(report.createdAt, locale: store.locale),
                                            ]),
                                            .micro, color: Theme.Colors.textMuted
                                        )
                                    }
                                }
                            }
                        }
                        .padding(Theme.gutter)
                    }
                }
            }
        }
        .task {
            do { reports = try await store.api.reportHistory().reports } catch { reports = [] }
        }
    }
}
