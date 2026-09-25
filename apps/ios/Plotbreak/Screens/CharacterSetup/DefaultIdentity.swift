import Foundation

// MARK: - DefaultIdentity
//
// Who the player is when they did not stop to say.
//
// 197 people reached character setup and 144 ever typed a turn. Setup is not
// proven to be the cause of the other 53, but it is a mandatory task placed
// between "this looks interesting" and the thing we are actually selling, and
// nothing about it has earned that position. So `Play` starts the story and
// this decides who they are.
//
// The rule it is built to satisfy: skipping must produce a perfectly valid
// story, never a diminished one. That is cheaper to honour than it looks,
// because of what the storyteller actually reads. In the production narrative
// path the only identity that reaches the model is `archetypeId` — which picks
// the origin `worldBrief` describes — and, for a world that does not name its
// protagonist, `displayName` and `pronouns`. `worldKnowsAboutYou` reaches only
// the legacy engine path, and `appearance` only the portrait generator. So a
// default that gets the name and the origin right has given the story
// everything it was ever going to read.

@MainActor
enum DefaultIdentity {
    /// The identity `Play` starts a story with.
    ///
    /// - For a world that names its own protagonist there is nothing to guess:
    ///   the canon name, pronouns and description are the answer, and the setup
    ///   screen does not ask for them either.
    /// - Otherwise the player already told us their name during onboarding, and
    ///   their last run's pronouns are the best evidence of how they like to be
    ///   addressed.
    static func build(for detail: StoryDetailResponse, store: AppStore) -> PlayerIdentity {
        let named = detail.protagonist?.kind == .NAMED

        let name = named
            ? (detail.protagonist?.name ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
            : preferredName(store: store)

        let pronouns = named
            ? (detail.protagonist?.pronouns ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
            : store.lastHero.pronouns.trimmingCharacters(in: .whitespacesAndNewlines)

        let grammar = named
            ? canonGrammar(detail.protagonist?.pronouns ?? "")
            : (store.lastHero.grammar ?? .UNSPECIFIED)

        var advanced: [String: String] = [:]
        // The portrait generator's only input. A named protagonist has an
        // authored description; nobody else has one until they ask for it.
        let look = named ? (detail.protagonist?.description ?? "") : ""
        let trimmedLook = look.trimmingCharacters(in: .whitespacesAndNewlines)
        if !trimmedLook.isEmpty { advanced["appearance"] = trimmedLook }

        return PlayerIdentity(
            displayName: name,
            pronouns: pronouns.isEmpty ? "they/them" : pronouns,
            grammar: PlayerGrammar(gender: grammar, thirdPerson: thirdPerson(grammar)),
            ageBand: nil,
            archetypeId: defaultArchetypeId(detail),
            worldKnowsAboutYou: "",
            advanced: advanced,
            portraitAssetId: nil
        )
    }

    /// The name to start with, in order of how much the player meant it.
    ///
    /// Their last run's hero first — somebody who played as "Kaz" last night
    /// means it more than the name they typed into an onboarding field once.
    /// The onboarding name after that. The fallback is only reachable if both
    /// are somehow empty, and it has to be a name the prose can say, because
    /// `rightNow` renders it straight into the prompt as "You are ___".
    static func preferredName(store: AppStore) -> String {
        let hero = store.lastHero.name.trimmingCharacters(in: .whitespacesAndNewlines)
        if !hero.isEmpty { return String(hero.prefix(40)) }
        let onboarding = (store.displayName ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        if !onboarding.isEmpty { return String(onboarding.prefix(40)) }
        return fallbackName
    }

    /// Used only when we have no name at all. Deliberately a name rather than a
    /// placeholder like "Player": the storyteller writes it into prose.
    static let fallbackName = "Ren"

    /// The origin a player gets when they did not choose one.
    ///
    /// The first, because authors order these and the first is the one they
    /// lead with. Null would be defensible — the world simply would not know —
    /// but `worldBrief` then omits the whole "who the player is" section and
    /// the storyteller improvises a past for somebody who was handed one. A
    /// real origin the player can change later beats no origin at all.
    static func defaultArchetypeId(_ detail: StoryDetailResponse) -> String? {
        detail.archetypes.first?.id
    }

    /// Agreement for a protagonist the world already named, read from the
    /// author's own pronouns. The same table `CharacterSetupScreen` uses.
    static func canonGrammar(_ pronouns: String) -> GrammaticalGender {
        let p = pronouns.lowercased()
        func matches(_ pattern: String) -> Bool { p.range(of: pattern, options: .regularExpression) != nil }
        if matches("\\b(he|him|il|lui)\\b") { return .MASCULINE }
        if matches("\\b(she|her|elle)\\b") { return .FEMININE }
        if matches("\\b(they|them|iel)\\b") { return .NEUTRAL }
        return .UNSPECIFIED
    }

    static func thirdPerson(_ gender: GrammaticalGender) -> String {
        switch gender {
        case .MASCULINE: return "il"
        case .FEMININE: return "elle"
        case .NEUTRAL: return "iel"
        case .UNSPECIFIED: return ""
        }
    }
}
