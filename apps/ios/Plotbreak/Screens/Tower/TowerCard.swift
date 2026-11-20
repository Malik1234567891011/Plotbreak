import SwiftUI

/// The Tower's door: on Discover, in the Wallet, and on the out-of-credits
/// screen. Renders nothing while the Tower is off for this player (the
/// endpoint 404s) or the call fails, so it can be dropped anywhere.
struct TowerCard: View {
    /// Where it was tapped from, for the funnel: discover, wallet or credit_wall.
    let source: String
    var compact = false
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t
    @State private var status: TowerStatus?
    @State private var now = Date()
    private let timer = Timer.publish(every: 30, on: .main, in: .common).autoconnect()

    var body: some View {
        Group {
            if let status {
                Button {
                    Haptic.play(.light)
                    router.towerSource = source
                } label: { card(status) }
                .buttonStyle(PressOpacityStyle())
                .onAppear {
                    Telemetry.trackOnce(.towerCardSeen, key: "tower_card_\(source)_\(status.day)", [
                        "source": source, "played": status.today?.finished ?? false, "free": status.free,
                    ])
                }
            }
        }
        .task(id: router.towerSource == nil) {
            // Reload when the game closes, so the card shows today's result.
            if router.towerSource == nil { status = try? await store.api.tower() }
        }
        .onReceive(timer) { now = $0 }
    }

    private func card(_ s: TowerStatus) -> some View {
        let played = s.today?.finished ?? false
        let waiting = s.today != nil && !played
        return HStack(spacing: 14) {
            ZStack {
                RoundedRectangle(cornerRadius: 12)
                    .fill(LinearGradient(colors: [Color(hex: 0x7C6CFF), Color(hex: 0xFF6B9E)], startPoint: .topLeading, endPoint: .bottomTrailing))
                Text(verbatim: "塔")
                    .font(.system(size: compact ? 24 : 28, weight: .black))
                    .foregroundStyle(.white)
            }
            .frame(width: compact ? 46 : 54, height: compact ? 46 : 54)

            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 6) {
                    Text(t("tower.card_label"))
                        .font(.system(size: 11, weight: .heavy))
                        .tracking(2)
                        .foregroundStyle(.white.opacity(0.6))
                    if s.free && !played {
                        Text(t("tower.card_free"))
                            .font(.system(size: 10, weight: .black))
                            .padding(.horizontal, 6).padding(.vertical, 2)
                            .background(Capsule().fill(Theme.Colors.warning))
                            .foregroundStyle(Theme.Colors.textOnAccent)
                    }
                }
                Text(headline(s, played: played, waiting: waiting))
                    .font(.system(size: compact ? 15 : 17, weight: .bold))
                    .foregroundStyle(.white)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                Text(subline(s, played: played))
                    .font(.system(size: 13))
                    .foregroundStyle(played ? Theme.Colors.textSecondary : Theme.Colors.warning)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
            Spacer(minLength: 0)
            if !played {
                Text(t("tower.card_cta"))
                    .font(.system(size: 14, weight: .heavy))
                    .padding(.horizontal, 14).padding(.vertical, 8)
                    .background(Capsule().fill(Theme.Colors.light))
                    .foregroundStyle(Theme.Colors.textOnLight)
            } else {
                Image(systemName: "chevron.right").foregroundStyle(.white.opacity(0.4))
            }
        }
        .padding(compact ? 12 : 14)
        .background(
            RoundedRectangle(cornerRadius: Theme.Radius.large)
                .fill(LinearGradient(colors: [Color(hex: 0x241A45), Color(hex: 0x121620)], startPoint: .topLeading, endPoint: .bottomTrailing))
        )
        .overlay(
            RoundedRectangle(cornerRadius: Theme.Radius.large)
                .strokeBorder(LinearGradient(colors: [Color(hex: 0x7C6CFF).opacity(0.8), Color(hex: 0xFF6B9E).opacity(0.4)], startPoint: .leading, endPoint: .trailing), lineWidth: 1)
        )
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
