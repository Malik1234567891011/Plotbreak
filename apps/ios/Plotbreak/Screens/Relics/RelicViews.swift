import SwiftUI
import UIKit
import CoreImage

// MARK: - Relics: shared pieces
//
// What makes a relic read as an *item* rather than a picture: it sits on its
// own, with no background, inside a frame whose colour is its rarity, and it
// moves — foil sweeps across it, rarer ones throw sparks, the rarest shift
// colour. The art is a transparent icon for exactly this reason: the same
// image is the full-colour item, the black silhouette of a locked one, and
// the mask the foil is clipped to. See docs/relics.md.

enum RelicRarity: String, CaseIterable {
    case MYTHIC, LEGENDARY, EPIC, RARE, COMMON

    init(_ raw: String) { self = RelicRarity(rawValue: raw) ?? .COMMON }

    var label: String {
        switch self {
        case .MYTHIC: return "Mythic"
        case .LEGENDARY: return "Legendary"
        case .EPIC: return "Epic"
        case .RARE: return "Rare"
        case .COMMON: return "Common"
        }
    }

    var color: Color {
        switch self {
        case .MYTHIC: return Color(hex: 0xFF4FB8)
        case .LEGENDARY: return Color(hex: 0xFFB627)
        case .EPIC: return Color(hex: 0xB061FF)
        case .RARE: return Color(hex: 0x3FA9FF)
        case .COMMON: return Color(hex: 0x9AA4B2)
        }
    }

    /// The frame and title fill. Mythic is the only one that is not one colour.
    var gradient: AngularGradient {
        switch self {
        case .MYTHIC:
            return AngularGradient(colors: [Color(hex: 0xFF4FB8), Color(hex: 0xFFB627), Color(hex: 0x4FF0FF), Color(hex: 0xB061FF), Color(hex: 0xFF4FB8)], center: .center)
        default:
            return AngularGradient(colors: [color, color.opacity(0.55), color, color.opacity(0.55), color], center: .center)
        }
    }

    /// How hard everything glows. Common barely; Mythic a lot.
    var intensity: Double {
        switch self {
        case .MYTHIC: return 1
        case .LEGENDARY: return 0.85
        case .EPIC: return 0.65
        case .RARE: return 0.45
        case .COMMON: return 0.25
        }
    }

    var sparkles: Bool { self == .MYTHIC || self == .LEGENDARY }

    var sortIndex: Int { RelicRarity.allCases.firstIndex(of: self) ?? 0 }
}

func relicTimingLabel(_ timing: String) -> String {
    switch timing {
    case "EARLY": return "Early on"
    case "MID": return "Midway"
    case "LATE": return "Late"
    case "ENDING": return "At an ending"
    default: return timing.capitalized
    }
}

func relicChanceLabel(_ percent: Double) -> String {
    percent >= 10 || percent == percent.rounded() ? "\(Int(percent.rounded()))%" : String(format: "%.1f%%", percent)
}

// MARK: Image

/// Loads relic art once and keeps it. The same image is drawn up to three
/// times per card (item, foil mask, glow), so it must not be three requests.
@MainActor
final class RelicImageCache {
    static let shared = RelicImageCache()
    private var images: [URL: UIImage] = [:]
    private var inFlight: [URL: Task<UIImage?, Never>] = [:]

    func cached(_ url: URL) -> UIImage? { images[url] }

    func load(_ url: URL) async -> UIImage? {
        if let hit = images[url] { return hit }
        if let task = inFlight[url] { return await task.value }
        let task = Task<UIImage?, Never> {
            guard let (data, _) = try? await URLSession.shared.data(from: url) else { return nil }
            return UIImage(data: data)
        }
        inFlight[url] = task
        let image = await task.value
        inFlight[url] = nil
        if let image { images[url] = image }
        return image
    }

    private var silhouettes: [URL: UIImage] = [:]
    private let context = CIContext()

    /// The item's shape in solid black, with the soft glow baked into the art
    /// thresholded away — otherwise a halo turns every locked relic into a blob.
    func silhouette(_ url: URL) async -> UIImage? {
        if let hit = silhouettes[url] { return hit }
        guard let source = await load(url), let input = CIImage(image: source) else { return nil }
        let matrix = CIFilter(name: "CIColorMatrix")!
        matrix.setValue(input, forKey: kCIInputImageKey)
        matrix.setValue(CIVector(x: 0, y: 0, z: 0, w: 0), forKey: "inputRVector")
        matrix.setValue(CIVector(x: 0, y: 0, z: 0, w: 0), forKey: "inputGVector")
        matrix.setValue(CIVector(x: 0, y: 0, z: 0, w: 0), forKey: "inputBVector")
        // alpha' = 5a - 3: under 60% opacity vanishes, over 80% is solid.
        matrix.setValue(CIVector(x: 0, y: 0, z: 0, w: 5), forKey: "inputAVector")
        matrix.setValue(CIVector(x: 0, y: 0, z: 0, w: -3), forKey: "inputBiasVector")
        guard let output = matrix.outputImage?.cropped(to: input.extent),
              let cg = context.createCGImage(output, from: input.extent) else { return nil }
        let image = UIImage(cgImage: cg, scale: source.scale, orientation: source.imageOrientation)
        silhouettes[url] = image
        return image
    }
}

/// The item itself: full colour when owned, a black silhouette with a rim of
/// its rarity colour when not, so a locked relic still has a shape to want.
struct RelicArt: View {
    let url: String?
    let rarity: RelicRarity
    var owned: Bool = true
    /// Foil sweep and sparkles. Off for small grid cells that are not owned.
    var animated: Bool = true

    @State private var image: UIImage?

    var body: some View {
        ZStack {
            if let image {
                let item = Image(uiImage: image).resizable().interpolation(.high).aspectRatio(contentMode: .fit)
                if owned {
                    item
                        .shadow(color: rarity.color.opacity(0.35 + 0.35 * rarity.intensity), radius: 10 + 14 * rarity.intensity)
                    if animated {
                        FoilSweep(rarity: rarity)
                            .mask(item)
                            .allowsHitTesting(false)
                    }
                } else {
                    item
                        .shadow(color: rarity.color.opacity(0.9), radius: 1)
                        .shadow(color: rarity.color.opacity(0.5), radius: 8)
                }
            } else {
                ProgressView().tint(rarity.color.opacity(0.6))
            }
            if owned && animated && rarity.sparkles {
                Sparkles(color: rarity.color, mythic: rarity == .MYTHIC)
                    .allowsHitTesting(false)
            }
        }
        .task(id: "\(url ?? "")|\(owned)") {
            guard let url, let parsed = URL(string: url) else { return }
            if owned, let hit = RelicImageCache.shared.cached(parsed) { image = hit; return }
            let loaded = owned
                ? await RelicImageCache.shared.load(parsed)
                : await RelicImageCache.shared.silhouette(parsed)
            withAnimation(.easeOut(duration: 0.25)) { image = loaded }
        }
    }
}

/// A band of light that crosses the item every few seconds, tinted by rarity.
/// Clipped to the item's own alpha by the caller, so it reads as a surface
/// catching the light rather than a rectangle passing over it.
struct FoilSweep: View {
    let rarity: RelicRarity
    /// Externally driven offset (-1...1), used by the detail view's tilt.
    var tilt: CGFloat? = nil

    var body: some View {
        TimelineView(.animation) { context in
            GeometryReader { geo in
                let period = 3.2 - 1.2 * rarity.intensity
                let t = context.date.timeIntervalSinceReferenceDate.truncatingRemainder(dividingBy: period) / period
                let phase = tilt ?? CGFloat(t * 2.6 - 0.8)
                let colors: [Color] = rarity == .MYTHIC
                    ? [.clear, Color(hex: 0xFF4FB8).opacity(0.55), Color(hex: 0xFFF3B0).opacity(0.8), Color(hex: 0x4FF0FF).opacity(0.55), .clear]
                    : [.clear, rarity.color.opacity(0.25 + 0.35 * rarity.intensity), Color.white.opacity(0.55 * rarity.intensity + 0.15), rarity.color.opacity(0.25 + 0.35 * rarity.intensity), .clear]
                LinearGradient(colors: colors, startPoint: .topLeading, endPoint: .bottomTrailing)
                    .frame(width: geo.size.width * 0.9, height: geo.size.height * 2.2)
                    .rotationEffect(.degrees(28))
                    .offset(x: (phase - 0.5) * geo.size.width * 1.8, y: -geo.size.height * 0.6)
                    .blendMode(.plusLighter)
            }
        }
    }
}

/// Points of light that drift up and fade. Legendary and Mythic only.
struct Sparkles: View {
    let color: Color
    var mythic: Bool = false
    var count: Int = 14

    private struct Seed { let x, speed, size, phase, hue: Double }
    @State private var seeds: [Seed] = []

    var body: some View {
        TimelineView(.animation) { context in
            Canvas { canvas, size in
                let now = context.date.timeIntervalSinceReferenceDate
                for seed in seeds {
                    let life = (now * seed.speed + seed.phase).truncatingRemainder(dividingBy: 1)
                    let x = seed.x * size.width + sin(now * 1.3 + seed.phase * 9) * 6
                    let y = size.height * (0.95 - 0.9 * life)
                    let alpha = sin(life * .pi)
                    let s = seed.size * (0.6 + 0.4 * alpha)
                    let tint = mythic ? Color(hue: (seed.hue + now * 0.08).truncatingRemainder(dividingBy: 1), saturation: 0.6, brightness: 1) : color
                    var star = Path()
                    star.move(to: CGPoint(x: x, y: y - s))
                    star.addQuadCurve(to: CGPoint(x: x + s, y: y), control: CGPoint(x: x, y: y))
                    star.addQuadCurve(to: CGPoint(x: x, y: y + s), control: CGPoint(x: x, y: y))
                    star.addQuadCurve(to: CGPoint(x: x - s, y: y), control: CGPoint(x: x, y: y))
                    star.addQuadCurve(to: CGPoint(x: x, y: y - s), control: CGPoint(x: x, y: y))
                    canvas.fill(star, with: .color(tint.opacity(alpha)))
                    canvas.fill(Path(ellipseIn: CGRect(x: x - 1, y: y - 1, width: 2, height: 2)), with: .color(.white.opacity(alpha)))
                }
            }
        }
        .onAppear {
            if seeds.isEmpty {
                seeds = (0..<count).map { _ in
                    Seed(x: .random(in: 0.08...0.92), speed: .random(in: 0.18...0.42), size: .random(in: 3...7), phase: .random(in: 0...1), hue: .random(in: 0...1))
                }
            }
        }
    }
}

/// The rarity frame every relic sits in.
struct RelicFrame: ViewModifier {
    let rarity: RelicRarity
    var owned: Bool = true
    var cornerRadius: CGFloat = 18

    func body(content: Content) -> some View {
        content
            .background(
                ZStack {
                    RoundedRectangle(cornerRadius: cornerRadius).fill(Color(hex: 0x0E1118))
                    RadialGradient(
                        colors: [rarity.color.opacity(owned ? 0.38 * rarity.intensity + 0.12 : 0.1), .clear],
                        center: .center, startRadius: 4, endRadius: 140
                    )
                    .clipShape(RoundedRectangle(cornerRadius: cornerRadius))
                }
            )
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .strokeBorder(rarity.gradient, lineWidth: owned ? 1.5 : 1)
                    .opacity(owned ? 0.95 : 0.45)
            )
    }
}

extension View {
    func relicFrame(_ rarity: RelicRarity, owned: Bool = true, cornerRadius: CGFloat = 18) -> some View {
        modifier(RelicFrame(rarity: rarity, owned: owned, cornerRadius: cornerRadius))
    }
}

/// "LEGENDARY" in its own colour, the label under every relic name.
struct RarityTag: View {
    let rarity: RelicRarity
    var size: CGFloat = 10

    var body: some View {
        Text(rarity.label.uppercased())
            .font(.system(size: size, weight: .heavy))
            .tracking(1.6)
            .foregroundStyle(rarity == .MYTHIC
                ? AnyShapeStyle(LinearGradient(colors: [Color(hex: 0xFF4FB8), Color(hex: 0xFFB627), Color(hex: 0x4FF0FF)], startPoint: .leading, endPoint: .trailing))
                : AnyShapeStyle(rarity.color))
    }
}

// MARK: - Reveal

/// The moment a relic drops, over the session.
///
/// Built as a short sequence rather than a popup: the screen darkens, a beam of
/// the rarity's colour opens, and for anything Epic or above there is a beat of
/// pure colour before the item arrives — the colour tells you how good it is a
/// half-second before you see it, which is the gacha trick and it works.
struct RelicRevealView: View {
    let drop: RelicDrop
    let onDone: () -> Void
    let onOpenVault: () -> Void

    @State private var stage = 0
    private var rarity: RelicRarity { RelicRarity(drop.rarity) }
    private var big: Bool { rarity.sortIndex <= RelicRarity.EPIC.sortIndex }

    var body: some View {
        ZStack {
            Color.black.opacity(stage >= 1 ? 0.92 : 0).ignoresSafeArea()

            // The beam.
            TimelineView(.animation) { context in
                let spin = context.date.timeIntervalSinceReferenceDate * (big ? 22 : 12)
                ZStack {
                    ForEach(0..<12, id: \.self) { i in
                        Capsule()
                            .fill(LinearGradient(colors: [rarity.color.opacity(0.5 * rarity.intensity + 0.15), .clear], startPoint: .bottom, endPoint: .top))
                            .frame(width: 26, height: 420)
                            .offset(y: -210)
                            .rotationEffect(.degrees(Double(i) * 30 + spin))
                    }
                }
                .blur(radius: 6)
            }
            .opacity(stage >= 2 ? 1 : 0)
            .scaleEffect(stage >= 2 ? 1 : 0.2)

            RadialGradient(colors: [rarity.color.opacity(stage >= 2 ? 0.55 : 0), .clear], center: .center, startRadius: 10, endRadius: 320)
                .ignoresSafeArea()
                .allowsHitTesting(false)

            VStack(spacing: 18) {
                Text("RELIC FOUND")
                    .font(.system(size: 13, weight: .heavy))
                    .tracking(4)
                    .foregroundStyle(.white.opacity(0.8))
                    .opacity(stage >= 3 ? 1 : 0)

                RelicArt(url: drop.imageUrl, rarity: rarity)
                    .frame(width: 230, height: 230)
                    .padding(22)
                    .relicFrame(rarity, cornerRadius: 28)
                    .scaleEffect(stage >= 3 ? 1 : 0.3)
                    .rotation3DEffect(.degrees(stage >= 3 ? 0 : 180), axis: (x: 0, y: 1, z: 0))
                    .opacity(stage >= 3 ? 1 : 0)

                VStack(spacing: 8) {
                    RarityTag(rarity: rarity, size: 13)
                    Text(drop.name)
                        .font(.system(size: 28, weight: .bold, design: .serif))
                        .foregroundStyle(.white)
                        .multilineTextAlignment(.center)
                    Text(drop.flavor)
                        .font(.system(size: 15, design: .serif).italic())
                        .foregroundStyle(.white.opacity(0.72))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 30)
                    if drop.count > 1 {
                        Text("Duplicate · you now have \(drop.count)")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundStyle(rarity.color)
                    }
                }
                .opacity(stage >= 4 ? 1 : 0)
                .offset(y: stage >= 4 ? 0 : 12)

                HStack(spacing: 12) {
                    Button(action: onOpenVault) {
                        Text("Open vault")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(.white)
                            .padding(.horizontal, 20).padding(.vertical, 12)
                            .background(Capsule().strokeBorder(.white.opacity(0.35)))
                    }
                    Button(action: onDone) {
                        Text("Keep playing")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(Theme.Colors.textOnLight)
                            .padding(.horizontal, 20).padding(.vertical, 12)
                            .background(Capsule().fill(.white))
                    }
                }
                .padding(.top, 8)
                .opacity(stage >= 4 ? 1 : 0)
            }
            .padding(.horizontal, 16)
        }
        .contentShape(Rectangle())
        .onTapGesture { if stage >= 4 { onDone() } }
        .task { await play() }
    }

    private func play() async {
        withAnimation(.easeOut(duration: 0.3)) { stage = 1 }
        try? await Task.sleep(nanoseconds: 250_000_000)
        Haptic.play(big ? .medium : .light)
        withAnimation(.spring(response: 0.6, dampingFraction: 0.75)) { stage = 2 }
        // The colour-first beat: longer the rarer.
        let hold: UInt64 = rarity == .MYTHIC ? 1_300_000_000 : rarity == .LEGENDARY ? 1_000_000_000 : big ? 650_000_000 : 300_000_000
        if rarity.sortIndex <= RelicRarity.LEGENDARY.sortIndex {
            for _ in 0..<3 { Haptic.play(.light); try? await Task.sleep(nanoseconds: hold / 4) }
        } else {
            try? await Task.sleep(nanoseconds: hold)
        }
        Haptic.play(big ? .success : .medium)
        withAnimation(.spring(response: 0.55, dampingFraction: 0.7)) { stage = 3 }
        try? await Task.sleep(nanoseconds: 450_000_000)
        withAnimation(.easeOut(duration: 0.35)) { stage = 4 }
    }
}
