import SwiftUI

/// A wrapping row — the `flexWrap: 'wrap'` that chip groups lay out with.
///
/// Shared because four screens need it (the taste picker, personalization,
/// the character roster and the world sheet) and each had written its own.
struct FlowLayout: Layout {
    var spacing: CGFloat = Theme.Spacing.sm

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let proposed = proposal.width ?? .infinity
        guard proposed.isFinite else {
            // An unspecified proposal is SwiftUI asking how wide this *wants*
            // to be. Answering with the unwrapped single-row width is how the
            // story detail page ended up wider than the phone: the chips laid
            // out in one long row, the enclosing VStack adopted that width, and
            // the premise and the Start story button ran off the right edge.
            //
            // A wrapping row's intrinsic width is its widest item — everything
            // else can wrap. The real width arrives on the next pass.
            let widest = subviews.map { $0.sizeThatFits(.unspecified).width }.max() ?? 0
            return arrange(width: widest, subviews: subviews).size
        }
        return arrange(width: proposed, subviews: subviews).size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let arrangement = arrange(width: bounds.width, subviews: subviews)
        for (index, origin) in arrangement.origins.enumerated() {
            subviews[index].place(
                at: CGPoint(x: bounds.minX + origin.x, y: bounds.minY + origin.y),
                proposal: ProposedViewSize(subviews[index].sizeThatFits(.unspecified))
            )
        }
    }

    private func arrange(width: CGFloat, subviews: Subviews) -> (size: CGSize, origins: [CGPoint]) {
        var origins: [CGPoint] = []
        var x: CGFloat = 0
        var y: CGFloat = 0
        var rowHeight: CGFloat = 0
        var maxX: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            // Wrap, unless this is the first thing on the row — a single item
            // wider than the container still has to go somewhere.
            if x > 0, x + size.width > width {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            origins.append(CGPoint(x: x, y: y))
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
            maxX = max(maxX, x - spacing)
        }
        return (CGSize(width: min(maxX, width), height: y + rowHeight), origins)
    }
}

// MARK: - Horizontal shelves

private struct RailWidthKey: EnvironmentKey {
    static let defaultValue: CGFloat = 0
}

extension EnvironmentValues {
    /// The width a horizontal shelf should occupy. Published by the screen; see
    /// `railWidth()`. Zero means "nobody measured", and shelves stay unconstrained.
    var railWidth: CGFloat {
        get { self[RailWidthKey.self] }
        set { self[RailWidthKey.self] = newValue }
    }
}

private struct RailWidthModifier: ViewModifier {
    @Environment(\.railWidth) private var width

    func body(content: Content) -> some View {
        content.frame(width: width > 0 ? width : nil)
    }
}

extension View {
    /// Pins a horizontal shelf to the width its screen measured.
    ///
    /// A horizontal `ScrollView` asked for an *unspecified* width answers with
    /// the width of its content, so a rail of cards inside a vertical scroll
    /// silently makes the whole column wider than the phone. That is how the
    /// story detail premise and its Start story button ended up past the right
    /// edge: three 148pt cast portraits reported 476pt on a 402pt screen.
    ///
    /// The screen publishes its viewport through `\.railWidth` and every shelf
    /// claims exactly that, so the column can never be widened from inside.
    func railWidth() -> some View {
        modifier(RailWidthModifier())
    }
}
