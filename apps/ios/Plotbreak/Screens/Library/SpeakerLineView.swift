import SwiftUI

// MARK: - SpeakerLineView
//
// Design v3: a run is remembered by the last thing somebody in it said, with
// their face beside it. The Continue row on Discover, the Library row and the
// credit wall all draw it; the wall at a larger size, over the story's art.

struct SpeakerLineView: View {
    enum Style {
        /// Continue and Library rows: a 20pt face, serif 15, two lines.
        case row
        /// The credit wall: a 28pt face, serif 17, three lines, over the art.
        case wall
    }

    let line: SpeakerLine
    var style: Style = .row
    @Environment(\.translator) private var t

    private var faceSize: CGFloat { style == .row ? 20 : 28 }
    private var fontSize: CGFloat { style == .row ? 15 : 17 }
    /// Board line heights: 22 at 15pt, 26 at 17pt.
    private var lineSpacing: CGFloat { style == .row ? 4 : 6 }
    private var lineLimit: Int { style == .row ? 2 : 3 }

    var body: some View {
        HStack(alignment: .top, spacing: style == .row ? 8 : 10) {
            CharacterPortrait(name: line.name, uri: line.portrait, size: faceSize)
            Text(SpeakerLine.quoted(line.text, t))
                .font(.system(size: fontSize, design: .serif))
                .lineSpacing(lineSpacing)
                .foregroundStyle(style == .row ? Theme.Colors.textSecondary : Theme.Colors.textPrimary)
                .lineLimit(lineLimit)
                .multilineTextAlignment(.leading)
                .fixedSize(horizontal: false, vertical: true)
                .shadow(color: style == .wall ? Theme.Colors.bgBase.opacity(0.8) : .clear, radius: 6, y: 1)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(t("library.speaker_line_a11y", ["name": line.name, "text": line.text]))
    }
}

// MARK: - The rule

extension SpeakerLine {
    /// How many of the newest turns are searched. The server uses the same.
    static let lookback = 3
    /// The contract's cap on `text`.
    static let maxLength = 280

    /// The newest line a cast member spoke in the last `lookback` turns.
    ///
    /// The client twin of `lastSpokenLine` in `services/api/src/last-line.ts`,
    /// for the credit wall, which already holds the turns and the cast and has
    /// no reason to ask the server. Skips narration, the player, a speaker the
    /// cast does not have, a line marked `NPC_PRIVATE`, and an empty line.
    static func latest(turns: [PlayerTurnRecord], cast: [CastRef], lookback: Int = lookback) -> SpeakerLine? {
        let byId = Dictionary(cast.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })
        for turn in turns.sorted(by: { $0.turnIndex > $1.turnIndex }).prefix(max(0, lookback)) {
            for block in turn.blocks.reversed() {
                guard block.type == .DIALOGUE, block.visibility != "NPC_PRIVATE",
                      let id = block.speakerId, let speaker = byId[id] else { continue }
                let text = cap(block.text)
                guard !text.isEmpty else { continue }
                return SpeakerLine(characterId: speaker.id, name: speaker.name, portrait: speaker.portrait,
                                   text: text, turnIndex: turn.turnIndex)
            }
        }
        return nil
    }

    private static let closingQuotes: Set<Character> = ["”", "»", "\"", "’", "」", "』"]
    private static let openingQuotes: Set<Character> = ["“", "«", "\"", "„", "‘", "'", "‹", "「", "『"]

    /// The line as it is drawn. Most stored dialogue carries its own quote
    /// marks and is shown as stored; some worlds store bare lines, which get
    /// the interface language's marks (`library.quoted_line`) so they never
    /// read as narration beside a face.
    static func quoted(_ text: String, _ t: Translator) -> String {
        guard let first = text.first, !openingQuotes.contains(first) else { return text }
        return t("library.quoted_line", ["text": text])
    }

    /// Trimmed, and cut on a word boundary with "…" past `max`, keeping a
    /// closing quote mark. The server's `capLine`.
    static func cap(_ raw: String, max: Int = maxLength) -> String {
        let text = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard text.count > max else { return text }
        let close = text.last.flatMap { closingQuotes.contains($0) ? String($0) : nil } ?? ""
        let room = max - 1 - close.count
        var head = String(text.prefix(room))
        // A boundary in the last 40% only; one very long word is cut where it stands.
        if let space = head.lastIndex(where: \.isWhitespace),
           head.distance(from: head.startIndex, to: space) > Int(Double(room) * 0.6) {
            head = String(head[..<space])
        }
        while let last = head.last, last.isWhitespace || ",;:—–-".contains(last) { head.removeLast() }
        return head + "…" + close
    }
}
