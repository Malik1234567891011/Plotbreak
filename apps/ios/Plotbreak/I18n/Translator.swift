import Foundation

// MARK: - Translator
//
// The Swift twin of `@plotbreak/i18n`'s `translatorFor(locale)`.
//
// The catalogue is the TypeScript one, exported to `Resources/i18n/<locale>.json`
// by `scripts/export-catalog.mjs`. Messages are ICU MessageFormat, and the app
// uses a small subset of it: `{name}` arguments, `{n, plural, ...}` with `#`,
// and `{x, select, ...}`. `ICUMessage` below renders exactly that subset.
//
// A missing French key renders the English string rather than the key; a
// missing English key renders the key itself, which is what makes it visible.

typealias TranslationKey = String

struct Translator {
    let locale: AppLocale

    private static let tables: [AppLocale: [String: String]] = {
        var loaded: [AppLocale: [String: String]] = [:]
        for locale in AppLocale.allCases {
            guard let url = Bundle.main.url(forResource: locale.rawValue, withExtension: "json", subdirectory: "i18n")
                    ?? Bundle.main.url(forResource: locale.rawValue, withExtension: "json"),
                  let data = try? Data(contentsOf: url),
                  let table = try? JSONDecoder().decode([String: String].self, from: data)
            else { continue }
            loaded[locale] = table
        }
        return loaded
    }()

    static func has(_ key: TranslationKey) -> Bool {
        tables[.en]?[key] != nil
    }

    func callAsFunction(_ key: TranslationKey, _ args: [String: Any] = [:]) -> String {
        let message = Self.tables[locale]?[key] ?? Self.tables[.en]?[key] ?? key
        let rendered = ICUMessage.render(message, args: args, locale: locale)
        return Typography.foldNarrowSpaces(rendered)
    }

    /// A server-sent catalogue key (rail titles, subtitles), or the fallback text
    /// the server rendered when the key is not one we know.
    func serverKey(_ key: String?, fallback: String, params: [String: String]? = nil) -> String {
        guard let key, Self.has(key) else { return fallback }
        return self(key, params ?? [:])
    }

    /// The word for a browse category, or the server's own label when the id is new.
    func category(_ id: String, fallback: String) -> String {
        let key = "category.\(id)"
        return Self.has(key) ? self(key) : fallback
    }
}

// MARK: - Typography

enum Typography {
    /// Georgia has no U+202F, the narrow no-break space CLDR groups French
    /// thousands with. Fold it to U+00A0 so no glyph is borrowed from a fallback face.
    static func foldNarrowSpaces(_ text: String) -> String {
        text.replacingOccurrences(of: "\u{202F}", with: "\u{00A0}")
    }
}

// MARK: - Formatting (twins of `format.ts`)

enum Format {
    static func number(_ value: Double, locale: AppLocale, maximumFractionDigits: Int? = nil, minimumFractionDigits: Int? = nil) -> String {
        let formatter = NumberFormatter()
        formatter.locale = locale.foundation
        formatter.numberStyle = .decimal
        if let maximumFractionDigits { formatter.maximumFractionDigits = maximumFractionDigits }
        if let minimumFractionDigits { formatter.minimumFractionDigits = minimumFractionDigits }
        return Typography.foldNarrowSpaces(formatter.string(from: NSNumber(value: value)) ?? String(value))
    }

    static func number(_ value: Int, locale: AppLocale) -> String {
        number(Double(value), locale: locale, maximumFractionDigits: 0)
    }

    static func compact(_ value: Double, locale: AppLocale) -> String {
        if #available(iOS 15, *) {
            let text = value.formatted(.number.notation(.compactName).precision(.fractionLength(0...1)).locale(locale.foundation))
            return Typography.foldNarrowSpaces(text)
        }
        return number(value, locale: locale, maximumFractionDigits: 1)
    }

    /// Spec §26.10 — never abbreviate below 10,000. English keeps the hand-rolled
    /// `K`/`M` arithmetic so nothing visible changes; French uses CLDR compact.
    static func credits(_ value: Int, compact: Bool = false, locale: AppLocale = .en) -> String {
        if locale != .en {
            if !compact || value < 10_000 { return number(value, locale: locale) }
            return self.compact(Double(value), locale: locale)
        }
        if !compact || value < 10_000 { return number(value, locale: .en) }
        if value < 1_000_000 {
            let thousands = Double(value) / 1000
            return value % 1000 == 0 ? "\(Int(thousands))K" : String(format: "%.1fK", thousands)
        }
        return String(format: "%.1fM", Double(value) / 1_000_000)
    }

    static func date(_ date: Date, locale: AppLocale, style: DateFormatter.Style = .long) -> String {
        let formatter = DateFormatter()
        formatter.locale = locale.foundation
        formatter.dateStyle = style
        formatter.timeStyle = .none
        return Typography.foldNarrowSpaces(formatter.string(from: date))
    }

    static func timeOfDay(_ date: Date, locale: AppLocale) -> String {
        let formatter = DateFormatter()
        formatter.locale = locale.foundation
        formatter.dateStyle = .none
        formatter.timeStyle = .short
        return Typography.foldNarrowSpaces(formatter.string(from: date))
    }

    static func relative(_ date: Date, locale: AppLocale, relativeTo now: Date = Date()) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.locale = locale.foundation
        formatter.unitsStyle = .short
        return Typography.foldNarrowSpaces(formatter.localizedString(for: date, relativeTo: now))
    }

    static func list(_ items: [String], locale: AppLocale) -> String {
        ListFormatter.localizedString(byJoining: items)
    }

    /// An ISO timestamp as a short locale date — `toLocaleDateString()` in the RN app.
    /// Returns the raw string when it is not a timestamp, so a server format we
    /// do not know shows something rather than nothing.
    static func shortISODate(_ iso: String?, locale: AppLocale) -> String {
        guard let iso, let parsed = parseISO(iso) else { return iso ?? "" }
        return date(parsed, locale: locale, style: .short)
    }

    /// Parses the ISO 8601 strings the server sends on every `...At` field.
    static func parseISO(_ text: String?) -> Date? {
        guard let text else { return nil }
        if let date = isoWithFractions.date(from: text) { return date }
        return iso.date(from: text)
    }

    private static let isoWithFractions: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter
    }()

    private static let iso: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime]
        return formatter
    }()
}

// MARK: - ICU MessageFormat (subset)

enum ICUMessage {
    static func render(_ message: String, args: [String: Any], locale: AppLocale) -> String {
        var parser = Parser(text: Array(message), args: args, locale: locale)
        return parser.parseMessage(until: nil, pluralValue: nil)
    }

    private struct Parser {
        let text: [Character]
        let args: [String: Any]
        let locale: AppLocale
        var index = 0

        init(text: [Character], args: [String: Any], locale: AppLocale) {
            self.text = text
            self.args = args
            self.locale = locale
        }

        var atEnd: Bool { index >= text.count }

        /// Parses until the closing `}` of the enclosing block (or the end).
        /// `pluralValue` is the number `#` stands for inside a plural branch.
        mutating func parseMessage(until terminator: Character?, pluralValue: Double?) -> String {
            var out = ""
            while !atEnd {
                let char = text[index]
                if let terminator, char == terminator {
                    return out
                }
                switch char {
                case "'":
                    out += parseQuoted()
                case "{":
                    index += 1
                    out += parseArgument(pluralValue: pluralValue)
                case "#":
                    index += 1
                    if let pluralValue {
                        out += Format.number(pluralValue, locale: locale, maximumFractionDigits: 2)
                    } else {
                        out.append("#")
                    }
                default:
                    out.append(char)
                    index += 1
                }
            }
            return out
        }

        /// ICU apostrophe rules: `''` is a literal apostrophe; `'` before `{`, `}`
        /// or `#` opens a quoted run that ends at the next `'`; otherwise literal.
        mutating func parseQuoted() -> String {
            index += 1
            guard !atEnd else { return "'" }
            let next = text[index]
            if next == "'" {
                index += 1
                return "'"
            }
            if next == "{" || next == "}" || next == "#" {
                var out = ""
                while !atEnd {
                    let char = text[index]
                    if char == "'" {
                        index += 1
                        if !atEnd, text[index] == "'" {
                            out.append("'")
                            index += 1
                            continue
                        }
                        return out
                    }
                    out.append(char)
                    index += 1
                }
                return out
            }
            return "'"
        }

        mutating func parseArgument(pluralValue: Double?) -> String {
            // Read up to the next `,` or `}`.
            var name = ""
            var type = ""
            var sawComma = false
            while !atEnd {
                let char = text[index]
                if char == "}" {
                    index += 1
                    return sawComma ? formatSimple(name: name, type: type) : substitute(name: name)
                }
                if char == "," {
                    index += 1
                    if !sawComma {
                        sawComma = true
                        continue
                    }
                    // Second comma: what follows are the branches.
                    let kind = type.trimmingCharacters(in: .whitespaces)
                    let argName = name.trimmingCharacters(in: .whitespaces)
                    return parseBranches(name: argName, kind: kind)
                }
                if sawComma { type.append(char) } else { name.append(char) }
                index += 1
            }
            return substitute(name: name)
        }

        func numberValue(_ name: String) -> Double? {
            guard let value = args[name] else { return nil }
            switch value {
            case let number as Int: return Double(number)
            case let number as Double: return number
            case let number as Float: return Double(number)
            case let number as NSNumber: return number.doubleValue
            case let string as String: return Double(string)
            default: return nil
            }
        }

        func substitute(name: String) -> String {
            let key = name.trimmingCharacters(in: .whitespaces)
            guard let value = args[key] else { return "{\(key)}" }
            if let number = numberValue(key), !(value is String) {
                if number.rounded() == number { return Format.number(Int(number), locale: locale) }
                return Format.number(number, locale: locale, maximumFractionDigits: 2)
            }
            return String(describing: value)
        }

        func formatSimple(name: String, type: String) -> String {
            let key = name.trimmingCharacters(in: .whitespaces)
            let kind = type.trimmingCharacters(in: .whitespaces)
            if kind.hasPrefix("number"), let number = numberValue(key) {
                return Format.number(number, locale: locale, maximumFractionDigits: 2)
            }
            return substitute(name: key)
        }

        /// `{n, plural, offset:1 =0 {none} one {# thing} other {# things}}`
        /// `{g, select, feminine {elle} other {il}}`
        mutating func parseBranches(name: String, kind: String) -> String {
            var branches: [(String, [Character])] = []
            var offset: Double = 0
            skipWhitespace()
            while !atEnd, text[index] != "}" {
                skipWhitespace()
                var selector = ""
                while !atEnd, text[index] != "{", !text[index].isWhitespace, text[index] != "}" {
                    selector.append(text[index])
                    index += 1
                }
                skipWhitespace()
                if selector.hasPrefix("offset:") {
                    offset = Double(selector.dropFirst("offset:".count)) ?? 0
                    continue
                }
                guard !atEnd, text[index] == "{" else { break }
                index += 1
                let body = captureBalanced()
                branches.append((selector, body))
                skipWhitespace()
            }
            if !atEnd, text[index] == "}" { index += 1 }

            var chosen: [Character]? = nil
            var pluralValue: Double? = nil
            if kind == "plural" || kind == "selectordinal" {
                let number = numberValue(name) ?? 0
                pluralValue = number - offset
                if let exact = branches.first(where: { $0.0 == "=\(Int(number))" || $0.0 == "=\(number)" }) {
                    chosen = exact.1
                } else {
                    let category = kind == "plural"
                        ? Plural.cardinal(number - offset, locale: locale)
                        : Plural.ordinal(number - offset, locale: locale)
                    chosen = branches.first(where: { $0.0 == category })?.1
                        ?? branches.first(where: { $0.0 == "other" })?.1
                }
            } else {
                let value = args[name].map { String(describing: $0) } ?? ""
                chosen = branches.first(where: { $0.0 == value })?.1
                    ?? branches.first(where: { $0.0 == "other" })?.1
            }
            guard let chosen else { return "" }
            var inner = Parser(text: chosen, args: args, locale: locale)
            return inner.parseMessage(until: nil, pluralValue: pluralValue)
        }

        mutating func skipWhitespace() {
            while !atEnd, text[index].isWhitespace { index += 1 }
        }

        /// Captures the characters of a `{...}` body whose opening brace has been
        /// consumed, honouring nesting and apostrophe quoting.
        mutating func captureBalanced() -> [Character] {
            var depth = 1
            var out: [Character] = []
            var quoting = false
            while !atEnd {
                let char = text[index]
                index += 1
                if char == "'" {
                    let next: Character? = atEnd ? nil : text[index]
                    if next == "'" {
                        out.append(contentsOf: "''")
                        index += 1
                        continue
                    }
                    if quoting {
                        quoting = false
                    } else if next == "{" || next == "}" || next == "#" {
                        quoting = true
                    }
                    out.append(char)
                    continue
                }
                if !quoting {
                    if char == "{" { depth += 1 }
                    if char == "}" {
                        depth -= 1
                        if depth == 0 { return out }
                    }
                }
                out.append(char)
            }
            return out
        }
    }
}

// MARK: - CLDR plural categories for the two locales we ship

enum Plural {
    static func cardinal(_ value: Double, locale: AppLocale) -> String {
        let magnitude = abs(value)
        switch locale {
        case .en:
            return magnitude == 1 ? "one" : "other"
        case .fr:
            // CLDR fr: i = 0,1 → one; e.g. 0 pommes? No — "0 pomme". Also
            // millions ("many") ignored: the catalogue uses one/other.
            return magnitude < 2 ? "one" : "other"
        }
    }

    static func ordinal(_ value: Double, locale: AppLocale) -> String {
        let n = Int(abs(value))
        switch locale {
        case .en:
            let mod10 = n % 10, mod100 = n % 100
            if mod10 == 1 && mod100 != 11 { return "one" }
            if mod10 == 2 && mod100 != 12 { return "two" }
            if mod10 == 3 && mod100 != 13 { return "few" }
            return "other"
        case .fr:
            return n == 1 ? "one" : "other"
        }
    }
}
