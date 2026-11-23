import SwiftUI

/// The Tower's door: on Discover, in the Wallet, and on the out-of-credits
/// screen. Renders nothing while the Tower is off for this player (the
/// endpoint 404s) or the call fails, so it can be dropped anywhere.
struct TowerCard: View {
    /// Where it was tapped from, for the funnel: discover, wallet or credit_wall.
    let source: String
    var compact = false
    /// Space around the card, applied only when it shows, so a hidden card leaves no gap.
    var inset = EdgeInsets()
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t
    @State private var status: TowerStatus?
    @State private var now = Date()
    private let timer = Timer.publish(every: 30, on: .main, in: .common).autoconnect()

    var body: some View {
        // A zero-size placeholder while hidden: an empty Group has no view to run
        // `.task` on, so the card would never ask whether the Tower is open.
        ZStack {
            if let status {
                Button {
                    Haptic.play(.light)
                    router.towerSource = source
                } label: { card(status) }
                .buttonStyle(PressOpacityStyle())
                .padding(inset)
                .onAppear {
                    Telemetry.trackOnce(.towerCardSeen, key: "tower_card_\(source)_\(status.day)", [
                        "source": source, "played": status.today?.finished ?? false, "free": status.free,
                    ])
                }
            } else {
                Color.clear.frame(width: 0, height: 0)
            }
        }
        .task(id: router.towerSource == nil) {
            // Reload when the game closes, so the card shows today's result.
            if router.towerSource == nil { status = try? await store.api.tower() }
        }
        .onReceive(timer) { now = $0 }
    }

    /// Design v3: a filled ink row, no gradient. 塔 in a squircle, the
    /// headline, a quiet line with the crystal, and a quiet Climb capsule
    /// (Home's one white button is Play).
    private func card(_ s: TowerStatus) -> some View {
        let played = s.today?.finished ?? false
        let waiting = s.today != nil && !played
        return HStack(spacing: Theme.Spacing.md) {
            Text(verbatim: "塔")
                .font(.system(size: compact ? 22 : 24, weight: .bold))
                .foregroundStyle(Theme.Colors.textPrimary)
                .frame(width: compact ? 44 : 48, height: compact ? 44 : 48)
                .background(Theme.Colors.bgRaised, in: RoundedRectangle(cornerRadius: 11, style: .continuous))

            VStack(alignment: .leading, spacing: 2) {
                Text(headline(s, played: played, waiting: waiting))
                    .font(.system(size: compact ? 15 : 17, weight: .semibold))
                    .foregroundStyle(Theme.Colors.textPrimary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                Text.crystals(subline(s, played: played), fontSize: 13)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.Colors.textMuted)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
            Spacer(minLength: 0)
            if !played {
                Text(t("tower.card_cta"))
                    .font(.system(size: 15, weight: .semibold))
                    .padding(.horizontal, 16)
                    .frame(height: 34)
                    .background(Capsule().fill(Theme.Colors.bgRaised))
                    .foregroundStyle(Theme.Colors.textPrimary)
            } else {
                ChevronGlyph()
            }
        }
        .padding(compact ? 12 : 14)
        .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .accessibilityElement(children: .combine)
    }

    private func headline(_ s: TowerStatus, played: Bool, waiting: Bool) -> String {
        if let today = s.today, played {
            return today.cleared ? t("tower.card_cleared", ["reward": today.reward]) : t("tower.card_played", ["floor": today.fellOn, "reward": today.reward])
        }
        return waiting ? t("tower.card_waiting") : t("tower.card_ready")
    }

    private func subline(_ s: TowerStatus, played: Bool) -> String {
        if played { return t("tower.card_next", ["time": countdown(s.nextAt)]) }
        // A live streak is the strongest reason to climb today: say what it's worth.
        if s.streak.days > 0 {
            return t("tower.card_streak", ["days": s.streak.days, "bonus": s.streak.todayBonusPercent])
        }
        let entry = s.free ? t("tower.card_free") : t("tower.card_entry", ["fee": s.fee])
        return "\(t("tower.card_win_up_to", ["max": s.maxReward])) · \(entry)"
    }

    private func countdown(_ iso: String) -> String {
        guard let date = ISO8601.date(from: iso) else { return "" }
        let mins = max(0, Int(date.timeIntervalSince(now) / 60))
        // i18n-exempt: a compact duration, digits and unit letters only
        return mins >= 60 ? "\(mins / 60)h \(mins % 60)m" : "\(mins)m"
    }
}
