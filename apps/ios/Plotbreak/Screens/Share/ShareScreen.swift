import SwiftUI
import UIKit

// MARK: - Share (SH-01)
//
// Twin of `apps/mobile/src/screens/Share.tsx`. Spec §42.2/§42.3. The rule the
// screen is built around is "preview exactly what is exported": the card on
// screen *is* the artifact — the same view is what `ImageRenderer` captures —
// so there is no gap between what a player checked and what left their phone.
//
// Composed on the device, not a server: a recap card is a few hundred bytes of
// text over an image the app already has.

private enum ShareArtifact: String, CaseIterable, Identifiable {
    case recap, typed, hero
    var id: String { rawValue }

    var label: TranslationKey {
        switch self {
        case .recap: return "share.artifact_recap"
        case .typed: return "share.artifact_typed"
        case .hero: return "share.artifact_hero"
        }
    }

    var blurb: TranslationKey {
        switch self {
        case .recap: return "share.artifact_recap_blurb"
        case .typed: return "share.artifact_typed_blurb"
        case .hero: return "share.artifact_hero_blurb"
        }
    }
}

struct ShareScreen: View {
    let storyTitle: String
    let actionText: String?
    let sceneText: String
    let heroImageUrl: String?
    let displayName: String?

    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    @State private var artifact: ShareArtifact?
    /// Nil until touched: the default is "hidden" for a guest, who has no name worth showing.
    @State private var hideNameChoice: Bool?
    @State private var spoilerTitle = ""
    @State private var busy = false
    @State private var error: String?
    /// The hero image, fetched once so the preview and the export draw the same pixels.
    @State private var heroImage: UIImage?
    @State private var exported: ShareFile?

    private var name: String { displayName ?? "" }
    private var hideName: Bool { hideNameChoice ?? store.isGuest }
    private var available: [ShareArtifact] {
        ShareArtifact.allCases.filter { $0 != .hero || heroImageUrl != nil }
    }
    private var current: ShareArtifact { artifact ?? (heroImageUrl != nil ? .hero : .recap) }

    private var card: some View {
        ShareCard(
            artifact: current,
            storyTitle: storyTitle,
            actionText: actionText,
            sceneText: sceneText,
            heroImage: heroImage,
            spoilerTitle: spoilerTitle.trimmingCharacters(in: .whitespacesAndNewlines),
            byline: hideName ? "" : name,
            locale: store.locale
        )
    }

    var body: some View {
        Screen {
            VStack(spacing: 0) {
                HStack {
                    Txt(t("share.title"), .h3)
                    Spacer(minLength: 0)
                    IconButton(t("share.close"), glyph: "✕") { router.dismissSheet() }
                }
                .padding(.horizontal, Theme.gutter)

                ScrollView {
                    VStack(alignment: .leading, spacing: Theme.Spacing.xl) {
                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            Txt(t("share.preview_note"), .caption, color: Theme.Colors.textSecondary)
                            // 9:16, the shape every social surface wants (§42.2).
                            card.frame(maxWidth: .infinity)
                        }

                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            Txt(t("share.what_to_share"), .bodyCompact)
                            FlowRow(spacing: Theme.Spacing.sm) {
                                ForEach(available) { entry in
                                    Chip(t(entry.label), selected: current == entry) { artifact = entry }
                                }
                            }
                            Txt(t(current.blurb), .micro, color: Theme.Colors.textMuted)
                        }

                        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                            Txt(t("share.spoiler_title_label"), .bodyCompact)
                            Txt(t("share.spoiler_title_hint"), .micro, color: Theme.Colors.textMuted)
                            SpoilerInput(text: $spoilerTitle)
                        }

                        HStack(alignment: .center) {
                            VStack(alignment: .leading, spacing: 2) {
                                Txt(t("share.hide_name"), .bodyCompact)
                                Txt(
                                    name.isEmpty ? t("share.nothing_to_hide") : t("share.currently_shows", ["name": name]),
                                    .micro, color: Theme.Colors.textMuted
                                )
                            }
                            .padding(.trailing, Theme.Spacing.md)
                            Spacer(minLength: 0)
                            Toggle("", isOn: Binding(
                                get: { hideName || name.isEmpty },
                                set: { hideNameChoice = $0 }
                            ))
                            .labelsHidden()
                            .tint(Theme.Colors.accentPrimary)
                            .disabled(name.isEmpty)
                            .accessibilityLabel(t("share.hide_name"))
                        }

                        if let error {
                            Txt(error, .bodyCompact, color: Theme.Colors.danger)
                        }

                        PBButton(t("share.action"), loadingLabel: t("share.preparing"), loading: busy) {
                            Task { await share() }
                        }
                        Txt(t("share.privacy_note"), .micro, color: Theme.Colors.textMuted, center: true)
                    }
                    .padding(Theme.gutter)
                }
            }
        }
        .task { await loadHero() }
        .sheet(item: $exported) { file in
            ActivitySheet(items: [file.url], subject: storyTitle)
                .presentationDetents([.medium, .large])
                .ignoresSafeArea()
        }
    }

    /// The hero comes down once, ahead of the capture, because `ImageRenderer`
    /// draws synchronously and a still-loading `AsyncImage` would export as its placeholder.
    private func loadHero() async {
        guard let url = heroImageUrl?.assetURL else { return }
        if let (data, _) = try? await URLSession.shared.data(from: url), let image = UIImage(data: data) {
            heroImage = image
        }
    }

    /// Captured from the very view above, so the preview is the export.
    @MainActor
    private func share() async {
        busy = true
        error = nil
        defer { busy = false }

        let renderer = ImageRenderer(content: card.environment(\.translator, t))
        renderer.scale = 3
        renderer.isOpaque = false
        guard let image = renderer.uiImage, let png = image.pngData() else {
            error = t("share.failed")
            return
        }

        let fileName = storyTitle
            .components(separatedBy: CharacterSet.alphanumerics.inverted)
            .filter { !$0.isEmpty }
            .joined(separator: "-")
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent(fileName.isEmpty ? "plotbreak" : fileName)
            .appendingPathExtension("png")
        do {
            try png.write(to: url, options: .atomic)
            exported = ShareFile(url: url)
        } catch {
            self.error = t("share.failed")
        }
    }
}

// MARK: - The card

/// 9:16 at a fixed size, so the capture is predictable across devices.
private let cardWidth: CGFloat = 288
private let cardHeight: CGFloat = 512

private struct ShareCard: View {
    let artifact: ShareArtifact
    let storyTitle: String
    let actionText: String?
    let sceneText: String
    let heroImage: UIImage?
    let spoilerTitle: String
    let byline: String
    let locale: AppLocale

    @Environment(\.translator) private var t

    private var heading: String { spoilerTitle.isEmpty ? storyTitle : spoilerTitle }

    var body: some View {
        VStack(spacing: 0) {
            if artifact == .hero {
                Group {
                    if let heroImage {
                        Image(uiImage: heroImage).resizable().aspectRatio(contentMode: .fill)
                    } else {
                        Theme.Colors.bgRaised
                    }
                }
                .frame(width: cardWidth, height: cardHeight * 0.62)
                .clipped()
            }

            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                Txt(heading.uppercased(with: locale.foundation), .micro, color: Theme.Colors.accentPrimary)

                if artifact == .typed, let actionText {
                    VStack(alignment: .leading, spacing: 4) {
                        Txt(t("share.card_what_i_typed"), .micro, color: Theme.Colors.textMuted)
                        Txt("“\(trim(actionText, 140))”", .bodyCompact)
                    }
                    Rectangle().fill(Theme.Colors.borderSubtle).frame(height: 1)
                    VStack(alignment: .leading, spacing: 4) {
                        Txt(t("share.card_what_happened"), .micro, color: Theme.Colors.textMuted)
                        Txt(trim(sceneText, 300), .bodyCompact, color: Theme.Colors.textSecondary)
                    }
                    .frame(maxHeight: .infinity, alignment: .top)
                } else {
                    Txt(trim(sceneText, artifact == .hero ? 180 : 420), artifact == .hero ? .bodyCompact : .body)
                        .frame(maxHeight: .infinity, alignment: .top)
                }

                HStack(alignment: .bottom) {
                    // i18n-exempt: brand name
                    Txt(byline.isEmpty ? "Plotbreak" : "\(byline) · Plotbreak", .micro, color: Theme.Colors.textMuted)
                    Spacer(minLength: 0)
                    Txt("◈", .micro, color: Theme.Colors.textMuted)
                }
            }
            .padding(Theme.Spacing.lg)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        }
        .frame(width: cardWidth, height: cardHeight)
        .background(Theme.Colors.bgElevated)
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.large, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: Theme.Radius.large, style: .continuous)
                .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 1)
        }
    }

    /// Cuts at a word, never mid-word, so a card never ends in half a noun.
    private func trim(_ text: String, _ max: Int) -> String {
        let clean = text
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
        guard clean.count > max else { return clean }
        let cut = String(clean.prefix(max))
        // i18n-exempt: an ellipsis and code, not copy (UI_AUDIT §2.5 is tracked separately).
        if let space = cut.lastIndex(of: " ") {
            return String(cut[..<space]) + "…"
        }
        return cut + "…"
    }
}

// MARK: - Spoiler-safe title input

private struct SpoilerInput: View {
    @Binding var text: String
    @Environment(\.translator) private var t

    var body: some View {
        TextField("", text: $text, prompt: Text(t("share.spoiler_title_placeholder")).foregroundColor(Theme.Colors.textMuted))
            .font(.system(size: 16))
            .foregroundStyle(Theme.Colors.textPrimary)
            .padding(.horizontal, Theme.Spacing.md)
            .padding(.vertical, Theme.Spacing.md)
            .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.control, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, lineWidth: 1)
            }
            .accessibilityLabel(t("share.spoiler_title_a11y"))
            .onChange(of: text) { _, next in
                if next.count > 60 { text = String(next.prefix(60)) }
            }
    }
}

// MARK: - Share sheet plumbing

private struct ShareFile: Identifiable {
    let url: URL
    var id: String { url.absoluteString }
}

/// The system share sheet. `ShareLink` would need the image before the tap;
/// the card is rendered on the tap, so the controller is presented after.
private struct ActivitySheet: UIViewControllerRepresentable {
    let items: [Any]
    let subject: String

    func makeUIViewController(context: Context) -> UIActivityViewController {
        let controller = UIActivityViewController(activityItems: items, applicationActivities: nil)
        controller.setValue(subject, forKey: "subject")
        return controller
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

/// Chips that wrap onto the next line, as the RN `flexWrap` row does.
private struct FlowRow: Layout {
    var spacing: CGFloat

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let width = proposal.width ?? .infinity
        var x: CGFloat = 0, y: CGFloat = 0, rowHeight: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x > 0, x + size.width > width {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
        return CGSize(width: width == .infinity ? x : width, height: y + rowHeight)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        var x = bounds.minX, y = bounds.minY, rowHeight: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x > bounds.minX, x + size.width > bounds.maxX {
                x = bounds.minX
                y += rowHeight + spacing
                rowHeight = 0
            }
            subview.place(at: CGPoint(x: x, y: y), proposal: .unspecified)
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
    }
}
