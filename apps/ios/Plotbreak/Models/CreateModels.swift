import Foundation

// MARK: - Create mode
//
// Twins of `packages/contracts/src/create/draft.ts`. The draft is one document
// the client edits whole and PATCHes in pieces, so every field is present and
// every field has a default — the same reason the Zod schema does.

enum DraftTone: String, LenientEnum {
    case warm, grim, funny, tense, dreamlike, epic
    static var fallback: DraftTone { .warm }

    var labelKey: String { "create.tone_\(rawValue)" }
}

enum DraftLength: String, LenientEnum {
    case short, medium, long
    static var fallback: DraftLength { .medium }

    var labelKey: String { "create.length_\(rawValue)" }
}

/// Whether the story already knows who the player is.
enum DraftPov: String, LenientEnum {
    case named, blank
    static var fallback: DraftPov { .blank }

    var labelKey: String { "create.pov_\(rawValue)" }
}

enum DraftVisibility: String, LenientEnum {
    case privateOnly = "PRIVATE"
    case unlisted = "UNLISTED"
    case publicly = "PUBLIC"
    static var fallback: DraftVisibility { .privateOnly }

    var labelKey: String {
        switch self {
        case .privateOnly: return "create.visibility_private"
        case .unlisted: return "create.visibility_unlisted"
        case .publicly: return "create.visibility_public"
        }
    }

    var blurbKey: String { labelKey + "_body" }
}

enum EndingRarity: String, LenientEnum {
    case common = "COMMON"
    case uncommon = "UNCOMMON"
    case rare = "RARE"
    case unique = "UNIQUE"
    static var fallback: EndingRarity { .common }

    var labelKey: String { "create.rarity_\(rawValue.lowercased())" }
}

enum DraftIntensity: String, LenientEnum {
    case light = "LIGHT"
    case moderate = "MODERATE"
    case intense = "INTENSE"
    static var fallback: DraftIntensity { .moderate }

    var labelKey: String { "create.intensity_\(rawValue.lowercased())" }
}

// MARK: Entities

struct DraftCharacter: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var name: String
    @Default<EmptyString> var calledName: String
    @Default<TheyThem> var pronouns: String
    @Default<EmptyString> var role: String
    @Default<EmptyString> var cardBlurb: String
    /// A picture the creator chose. Null for one we draw.
    var portrait: String?
    @Default<EmptyString> var appearance: String
    @Default<EmptyString> var speechStyle: String
    @Default<EmptyString> var socialStyle: String
    @Default<EmptyArray<String>> var publicTraits: [String]
    @Default<EmptyArray<String>> var values: [String]
    @Default<EmptyArray<String>> var goals: [String]
    @Default<EmptyArray<String>> var fears: [String]
    @Default<EmptyArray<String>> var boundaries: [String]
    @Default<EmptyArray<String>> var hiddenDrives: [String]
    @Default<EmptyArray<String>> var secrets: [String]
    @Default<EmptyArray<String>> var voiceSamples: [String]

    /// A new row the creator added by hand.
    ///
    /// Written out rather than leaning on the memberwise init: a struct whose
    /// stored properties are property wrappers gets a memberwise init with no
    /// defaults, so `DraftCharacter(id:)` does not exist. Everything below is
    /// the same empty the server's schema would produce.
    static func blank(_ id: String) -> DraftCharacter {
        DraftCharacter(
            id: id, name: "", calledName: "", pronouns: "they/them", role: "", cardBlurb: "",
            portrait: nil,
            appearance: "", speechStyle: "", socialStyle: "", publicTraits: [], values: [],
            goals: [], fears: [], boundaries: [], hiddenDrives: [], secrets: [], voiceSamples: []
        )
    }
}

struct DraftPlace: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var name: String
    @Default<EmptyString> var description: String

    static func blank(_ id: String) -> DraftPlace { DraftPlace(id: id, name: "", description: "") }
}

struct DraftFaction: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var name: String
    @Default<EmptyString> var description: String
}

struct DraftThread: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var title: String
    @Default<EmptyString> var summary: String
}

struct DraftWorldEvent: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var publicCopy: String
    @Default<EmptyString> var directorNotes: String
}

struct DraftObject: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var name: String
    @Default<EmptyString> var description: String
    @Default<EmptyString> var loreText: String
}

struct DraftEnding: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var name: String
    @Default<Fallback<EndingRarity>> var rarity: EndingRarity
    @Default<Ten> var minTurn: Int
    @Default<EmptyString> var condition: String
    @Default<EmptyString> var epilogue: String
    @Default<EmptyString> var hint: String

    static func blank(_ id: String) -> DraftEnding {
        DraftEnding(id: id, name: "", rarity: .common, minTurn: 10, condition: "", epilogue: "", hint: "")
    }
}

enum Ten: DefaultValueProvider {
    static var defaultValue: Int { 10 }
}

struct DraftOrigin: Codable, Hashable, Identifiable {
    var id: String
    @Default<EmptyString> var name: String
    @Default<EmptyString> var role: String
    @Default<EmptyString> var summary: String
    @Default<EmptyArray<String>> var playstyle: [String]
    @Default<EmptyString> var blurb: String
}

struct DraftPitch: Codable, Hashable {
    @Default<EmptyString> var text: String
    var tone: DraftTone?
    @Default<Fallback<DraftLength>> var length: DraftLength
    @Default<Fallback<DraftPov>> var pov: DraftPov
}

/// Twin of `CompileState`. `status` stays a String rather than an enum so a
/// value the server adds later cannot fail the whole draft's decode.
struct CompileState: Codable, Hashable {
    @Default<CompileIdle> var status: String
    var startedAt: String?
    @Default<EmptyString> var message: String

    var isRunning: Bool { status == "running" }
}

enum CompileIdle: DefaultValueProvider {
    static var defaultValue: String { "idle" }
}

/// Twin of `ArtState` — where a cover-and-banner draw has got to.
///
/// Same shape and same reason as `CompileState`: two images is minutes, so the
/// client starts the work and watches this rather than holding the request.
struct ArtState: Codable, Hashable {
    @Default<CompileIdle> var status: String
    var startedAt: String?
    @Default<EmptyString> var message: String

    /// Spelled out because the property wrappers mean there is no usable
    /// memberwise initialiser, and `IdleArt` needs to build one of these
    /// without going through a decoder.
    init(status: String = "idle", startedAt: String? = nil, message: String = "") {
        self.status = status
        self.startedAt = startedAt
        self.message = message
    }

    var isRunning: Bool { status == "running" }
    var failed: Bool { status == "failed" }
}

enum IdleArt: DefaultValueProvider {
    static var defaultValue: ArtState { ArtState() }
}

// MARK: The draft

struct StoryDraft: Codable, Hashable, Identifiable {
    var draftId: String
    var ownerId: String
    var storyId: String?
    var publishedVersionId: String?
    var publishedAt: String?
    var createdAt: String
    var updatedAt: String

    var id: String { draftId }
    var isPublished: Bool { publishedVersionId != nil }

    var pitch: DraftPitch
    /// Where a compile has got to. The client watches this rather than holding
    /// a two-minute request open.
    var compile: CompileState
    /// Where a cover draw has got to. Defaulted rather than required, because
    /// every draft written before this field existed has a document without it.
    @Default<IdleArt> var art: ArtState

    // Profile
    @Default<EmptyString> var title: String
    @Default<EmptyString> var fantasyLabel: String
    @Default<EmptyString> var hook: String
    @Default<EmptyString> var coverDirection: String
    /// The cover: a picture the creator chose, or one drawn for them.
    var coverImage: String?
    /// The wide banner behind the story page's header. Drawn alongside the
    /// cover, never uploaded.
    var keyArtImage: String?

    // World
    @Default<EmptyString> var premise: String
    @Default<EmptyString> var toneGuide: String
    @Default<EmptyArray<String>> var hardCanon: [String]
    @Default<Fallback<DraftIntensity>> var intensity: DraftIntensity
    @Default<EmptyArray<String>> var contentDescriptors: [String]

    // Cast and places
    @Default<EmptyArray<DraftCharacter>> var characters: [DraftCharacter]
    @Default<EmptyArray<DraftPlace>> var places: [DraftPlace]
    var startingPlaceId: String?

    // Opening
    @Default<Fallback<DraftPov>> var protagonistKind: DraftPov
    @Default<EmptyString> var protagonistName: String
    @Default<EmptyString> var protagonistPronouns: String
    @Default<EmptyString> var protagonistDescription: String
    @Default<EmptyString> var setupHeading: String
    @Default<EmptyArray<DraftOrigin>> var origins: [DraftOrigin]
    @Default<EmptyString> var opening: String
    @Default<EmptyArray<String>> var openingSuggestions: [String]
    @Default<EmptyString> var playGuide: String
    @Default<EmptyArray<String>> var styleExamples: [String]

    // Pressure
    @Default<EmptyArray<DraftFaction>> var factions: [DraftFaction]
    @Default<EmptyArray<DraftThread>> var threads: [DraftThread]
    @Default<EmptyArray<DraftWorldEvent>> var worldEvents: [DraftWorldEvent]
    @Default<EmptyArray<DraftObject>> var objects: [DraftObject]

    // Endings
    @Default<EmptyArray<DraftEnding>> var endings: [DraftEnding]

    // Publish
    @Default<EmptyString> var description: String
    @Default<EmptyArray<String>> var tags: [String]
    @Default<EmptyArray<String>> var mechanicsChips: [String]
    @Default<Fallback<QualityTier>> var recommendedTier: QualityTier
    @Default<Fallback<DraftVisibility>> var visibility: DraftVisibility
}

// MARK: Readiness

/// Why a draft cannot be published. `code` is a stable key the client localises.
struct DraftIssue: Codable, Hashable {
    var step: CreateStep
    var code: String
    var index: Int?

    /// The localisation key for this issue, with the entry number folded in.
    var messageKey: String { "create.issue_\(code)" }
}

struct DraftReadiness: Codable, Hashable {
    @Default<False> var ready: Bool
    @Default<EmptyArray<DraftIssue>> var issues: [DraftIssue]
    @Default<EmptyArray<CreateStep>> var blockedSteps: [CreateStep]

    /// Nothing known yet — what a model holds before the first response lands.
    static let unknown = DraftReadiness(ready: false, issues: [], blockedSteps: [])
}

enum CreateStep: String, LenientEnum {
    case profile, world, cast, places, opening, pressure, endings, publish
    static var fallback: CreateStep { .profile }

    var labelKey: String { "create.step_\(rawValue)" }

    /// Mirrors `REQUIRED_STEPS`. The asterisk OOC draws on its stepper.
    var required: Bool { self != .pressure }

    static let ordered: [CreateStep] = [
        .profile, .world, .cast, .places, .opening, .pressure, .endings, .publish,
    ]
}

// MARK: The dashboard

struct CreatorTitle: Codable, Hashable, Identifiable {
    var draftId: String
    var storyId: String?
    @Default<EmptyString> var title: String
    @Default<EmptyString> var hook: String
    var coverImage: String?
    @Default<EmptyString> var status: String
    @Default<Fallback<DraftVisibility>> var visibility: DraftVisibility
    @Default<False> var ready: Bool
    @Default<Zero> var runs: Int
    @Default<Zero> var likes: Int
    @Default<Zero> var comments: Int
    @Default<EmptyString> var updatedAt: String

    var id: String { draftId }
    var isPublished: Bool { status == "PUBLISHED" }
}

// MARK: Responses

struct CreateTitlesResponse: Codable {
    @Default<EmptyArray<CreatorTitle>> var titles: [CreatorTitle]
}

enum DraftImageKind: String, Codable {
    case cover, character
}

struct DraftImageResponse: Codable {
    var draft: StoryDraft
    var readiness: DraftReadiness
    @Default<EmptyString> var url: String
}

struct DraftResponse: Codable {
    var draft: StoryDraft
    var readiness: DraftReadiness
}

struct PublishDraftResponse: Codable {
    var draft: StoryDraft
    var storyId: String
    var storyVersionId: String
    var readiness: DraftReadiness
}

/// The vocabulary the builder renders, sent once so the client hardcodes none of it.
struct CreateOptionsResponse: Codable {
    @Default<EmptyArray<DraftTone>> var tones: [DraftTone]
    @Default<EmptyArray<DraftLength>> var lengths: [DraftLength]
    @Default<EmptyArray<DraftPov>> var povs: [DraftPov]
    @Default<EmptyArray<DraftVisibility>> var visibilities: [DraftVisibility]
    @Default<Zero> var compileCost: Int
    @Default<Zero> var assistCost: Int
}

/// What Auto-generate can be asked to rewrite. One field or one entity, never a sub-field.
enum AssistTarget: String, Codable {
    case title, fantasyLabel, hook, coverDirection
    case premise, toneGuide, hardCanon
    case character, place
    case opening, openingSuggestions, playGuide, styleExamples
    case origins, factions, threads, worldEvents, objects, endings
    case description, tags, mechanicsChips
}
