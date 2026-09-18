import SwiftUI

// MARK: - Credits landing (WL-02)
//
// The one moment in the wallet worth a beat of its own. It runs *after* the
// server has confirmed the purchase and the balance has already been reloaded,
// so nothing here celebrates money that has not become credits yet — the
// screen behind the scrim is already correct when the burst clears.
//
// Spec §3.8 applies to celebrations too: the number shown is the number
// credited, never rounded up and never the pack's headline figure when a bonus
// made the real total larger.

/// One piece of the burst. Angle and reach are drawn once per celebration so
/// two purchases in a row do not produce the identical picture.
private struct Spark: Identifiable {
    let id = UUID()
    let angle: Double
    let reach: CGFloat
    let size: CGFloat
    let spin: Double
    let fall: CGFloat

    static func burst() -> [Spark] {
        // Two rings: a near one that reads as weight and a far one that reads
        // as speed. A single ring looks like a clock face.
        let near = (0..<12).map { i in
            Spark(
                angle: Double(i) / 12 * 2 * .pi + .random(in: -0.2...0.2),
                reach: .random(in: 50...78),
                size: .random(in: 11...17),
                spin: .random(in: -200...200),
                fall: .random(in: 10...30)
            )
        }
        let far = (0..<18).map { i in
            Spark(
                angle: Double(i) / 18 * 2 * .pi + .random(in: -0.25...0.25),
                reach: .random(in: 84...132),
                size: .random(in: 6...12),
                spin: .random(in: -320...320),
                fall: .random(in: 24...56)
            )
        }
        return near + far
    }
}

struct CreditCelebration: View {
    let credits: Int
    let locale: AppLocale
    let onDone: () -> Void

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.translator) private var t

    @State private var sparks = Spark.burst()
    /// 0 → 1 across the whole burst. Every flying thing is a function of it,
    /// so the burst is one animation rather than two dozen that can drift.
    @State private var flight: CGFloat = 0
    @State private var ring: CGFloat = 0
    @State private var glyph: CGFloat = 0.4
    @State private var scrim: Double = 0
    @State private var shown: Int = 0
    @State private var leaving = false
    @State private var finished = false

    private var amount: String { "+" + Format.credits(shown, locale: locale) }

    var body: some View {
        ZStack {
            Color.black.opacity(0.74 * scrim)
                .ignoresSafeArea()

            VStack(spacing: Theme.Spacing.md) {
                ZStack {
                    // The glyph as a light source rather than a sticker: the
                    // wash is what stops the burst reading as flat shapes on a
                    // flat scrim.
                    RadialGradient(
                        colors: [Theme.Colors.warning.opacity(0.26 * scrim), .clear],
                        center: .center,
                        startRadius: 4,
                        endRadius: 130
                    )
                    .scaleEffect(0.7 + glyph * 0.5)

                    if !reduceMotion {
                        // The shockwave. Gone before the number finishes, which
                        // is what keeps it feeling like an impact rather than a
                        // loading spinner.
                        Circle()
                            .strokeBorder(Theme.Colors.warning.opacity(0.55 * (1 - ring)), lineWidth: 2)
                            .frame(width: 72, height: 72)
                            .scaleEffect(0.5 + ring * 2.1)

                        ForEach(sparks) { spark in
                            RoundedRectangle(cornerRadius: spark.size * 0.22, style: .continuous)
                                .fill(Theme.Colors.warning)
                                .frame(width: spark.size, height: spark.size)
                                .rotationEffect(.degrees(45 + spark.spin * Double(flight)))
                                .offset(
                                    x: cos(spark.angle) * spark.reach * flight,
                                    // Squared, so they arc instead of sliding:
                                    // gravity does nothing at the start and
                                    // everything at the end.
                                    y: sin(spark.angle) * spark.reach * flight + spark.fall * flight * flight
                                )
                                .opacity(Double(1 - flight) * 0.9)
                        }
                    }

                    CreditGlyph(size: 64)
                        .scaleEffect(glyph)
                        .shadow(color: Theme.Colors.warning.opacity(0.45), radius: 22)
                }
                .frame(width: 240, height: 200)

                Text(amount)
                    .font(.system(size: 40, weight: .bold, design: .monospaced))
                    .foregroundStyle(Theme.Colors.warning)
                    .contentTransition(.numericText())
                    .monospacedDigit()

                Txt(t("wallet.credits_unit"), .bodyCompact, color: Theme.Colors.textSecondary)
            }
            .opacity(leaving ? 0 : 1)
            .scaleEffect(leaving ? 0.96 : 1)
        }
        // Tappable everywhere: a player who has seen it twice should not have
        // to wait for it a third time.
        .contentShape(Rectangle())
        .onTapGesture { finish() }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(amount) \(t("wallet.credits_unit"))")
        .task { await run() }
    }

    private func run() async {
        withAnimation(.easeOut(duration: Theme.Durations.short)) { scrim = 1 }

        if reduceMotion {
            // Same beat, nothing that moves across the screen: the glyph and
            // the final number simply arrive.
            shown = credits
            withAnimation(.easeOut(duration: Theme.Durations.fadeIn)) { glyph = 1 }
            try? await Task.sleep(for: .milliseconds(1_200))
            finish()
            return
        }

        withAnimation(.spring(response: 0.42, dampingFraction: 0.55)) { glyph = 1 }
        withAnimation(.easeOut(duration: 0.95)) { flight = 1 }
        withAnimation(.easeOut(duration: 0.65)) { ring = 1 }

        await countUp()

        try? await Task.sleep(for: .milliseconds(750))
        finish()
    }

    /// Rolls the number rather than printing it. Eased out, so it sprints and
    /// then settles on the real figure — and it always lands exactly on
    /// `credits`, never on whatever the last frame happened to compute.
    private func countUp() async {
        let steps = 22
        for step in 1...steps {
            let progress = Double(step) / Double(steps)
            let eased = 1 - pow(1 - progress, 3)
            withAnimation(.linear(duration: 0.03)) {
                shown = step == steps ? credits : Int(Double(credits) * eased)
            }
            try? await Task.sleep(for: .milliseconds(30))
            if finished { return }
        }
    }

    private func finish() {
        guard !finished else { return }
        finished = true
        shown = credits
        withAnimation(.easeOut(duration: Theme.Durations.sheet)) {
            leaving = true
            scrim = 0
        }
        Task {
            try? await Task.sleep(for: .milliseconds(Int(Theme.Durations.sheet * 1000)))
            onDone()
        }
    }
}

#Preview {
    ZStack {
        Theme.Colors.bgBase.ignoresSafeArea()
        CreditCelebration(credits: 10_300, locale: .en) {}
    }
}

