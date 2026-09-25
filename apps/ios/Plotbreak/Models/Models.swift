import Foundation

// MARK: - Contract twins
//
// Every shape here mirrors `packages/contracts/src/api/index.ts` (and the game
// schemas it composes). The JSON contract is authoritative; these are the Swift
// twins. Decoding is deliberately lenient in two ways:
//
//  1. Enums the server may extend decode to a `.unknown`-style fallback rather
//     than throwing, so a new badge kind does not blank a whole shelf.
//  2. Fields the contract marks `.default(...)` decode with the same default
//     when absent, via `@Default`.

// MARK: Leniency helpers

/// A string enum that never fails to decode. Unknown raw values map to `fallback`.
protocol LenientEnum: RawRepresentable, Codable, Hashable, CaseIterable where RawValue == String {
    static var fallback: Self { get }
}

extension LenientEnum {
    init(from decoder: Decoder) throws {
        let raw = try decoder.singleValueContainer().decode(String.self)
        self = Self(rawValue: raw) ?? Self.fallback
    }
}

protocol DefaultValueProvider {
    associatedtype Value: Codable & Hashable
    static var defaultValue: Value { get }
}

/// `@Default<EmptyArray<String>> var tags: [String]` — absent or null decodes to the default.
@propertyWrapper
struct Default<Provider: DefaultValueProvider>: Codable, Hashable {
    var wrappedValue: Provider.Value

    init(wrappedValue: Provider.Value) { self.wrappedValue = wrappedValue }

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if container.decodeNil() {
            wrappedValue = Provider.defaultValue
        } else {
            wrappedValue = (try? container.decode(Provider.Value.self)) ?? Provider.defaultValue
        }
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(wrappedValue)
    }
}

extension KeyedDecodingContainer {
    func decode<P>(_ type: Default<P>.Type, forKey key: Key) throws -> Default<P> {
        try decodeIfPresent(type, forKey: key) ?? Default(wrappedValue: P.defaultValue)
    }
}

enum EmptyArray<T: Codable & Hashable>: DefaultValueProvider {
    static var defaultValue: [T] { [] }
}

enum EmptyString: DefaultValueProvider {
    static var defaultValue: String { "" }
}

enum False: DefaultValueProvider {
    static var defaultValue: Bool { false }
}

enum True: DefaultValueProvider {
    static var defaultValue: Bool { true }
}

enum Zero: DefaultValueProvider {
    static var defaultValue: Int { 0 }
}

enum EmptyStringMap: DefaultValueProvider {
    static var defaultValue: [String: String] { [:] }
}

enum One: DefaultValueProvider {
    static var defaultValue: Int { 1 }
}

enum Three: DefaultValueProvider {
    static var defaultValue: Int { 3 }
}

enum Four: DefaultValueProvider {
    static var defaultValue: Int { 4 }
}

enum ZeroDouble: DefaultValueProvider {
    static var defaultValue: Double { 0 }
}

/// The enum's own `fallback` case when the key is absent.
enum Fallback<E: LenientEnum>: DefaultValueProvider {
    static var defaultValue: E { E.fallback }
}

enum TheyThem: DefaultValueProvider {
    static var defaultValue: String { "they/them" }
}

/// A JSON value of any shape, for `details` maps and SSE payloads.
enum JSONValue: Codable, Hashable {
    case string(String)
    case number(Double)
    case bool(Bool)
    case null
    case array([JSONValue])
    case object([String: JSONValue])

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if container.decodeNil() { self = .null; return }
        if let value = try? container.decode(Bool.self) { self = .bool(value); return }
        if let value = try? container.decode(Double.self) { self = .number(value); return }
        if let value = try? container.decode(String.self) { self = .string(value); return }
        if let value = try? container.decode([JSONValue].self) { self = .array(value); return }
        if let value = try? container.decode([String: JSONValue].self) { self = .object(value); return }
        // i18n-exempt: a decoding failure a developer reads, never a player
        throw DecodingError.dataCorruptedError(in: container, debugDescription: "Unsupported JSON value")
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        switch self {
        case .string(let value): try container.encode(value)
        case .number(let value): try container.encode(value)
        case .bool(let value): try container.encode(value)
        case .null: try container.encodeNil()
        case .array(let value): try container.encode(value)
        case .object(let value): try container.encode(value)
        }
    }

    var stringValue: String? { if case .string(let value) = self { return value } else { return nil } }
    var doubleValue: Double? { if case .number(let value) = self { return value } else { return nil } }
    var intValue: Int? { doubleValue.map { Int($0) } }
    var boolValue: Bool? { if case .bool(let value) = self { return value } else { return nil } }
    var arrayValue: [JSONValue]? { if case .array(let value) = self { return value } else { return nil } }
    var objectValue: [String: JSONValue]? { if case .object(let value) = self { return value } else { return nil } }
    var isNull: Bool { if case .null = self { return true } else { return false } }

    subscript(key: String) -> JSONValue? { objectValue?[key] }

    /// Re-decodes this value as a concrete contract type.
    func decoded<T: Decodable>(as type: T.Type) -> T? {
        guard let data = try? JSONEncoder().encode(self) else { return nil }
        return try? JSONDecoder.plotbreak.decode(T.self, from: data)
    }
}

extension JSONDecoder {
    /// Dates stay ISO strings on the models (the server formats them); nothing here
    /// needs a date strategy. Kept as one instance so a policy change is one line.
    static let plotbreak: JSONDecoder = JSONDecoder()
}

extension JSONEncoder {
    static let plotbreak: JSONEncoder = JSONEncoder()
}

// MARK: - Locale

enum AppLocale: String, LenientEnum {
    case en, fr
    static var fallback: AppLocale { .en }
    static let `default`: AppLocale = .en

    /// BCP 47 tag for Foundation formatters, matching `LOCALE_TAGS` in `@plotbreak/i18n`.
    var tag: String {
        switch self {
        case .en: return "en-US"
        case .fr: return "fr-FR"
        }
    }

    var foundation: Locale { Locale(identifier: tag) }

    /// `matchLocale` — the primary subtag of any language tag, if it is one of ours.
    static func match(_ tag: String?) -> AppLocale? {
        guard let tag else { return nil }
        let primary = tag.trimmingCharacters(in: .whitespaces)
            .split(whereSeparator: { $0 == ";" || $0 == "," }).first?
            .replacingOccurrences(of: "_", with: "-")
            .split(separator: "-").first?
            .lowercased()
        guard let primary else { return nil }
        return AppLocale(rawValue: primary)
    }

    /// `resolveDeviceLocale` — the first preferred language that is one of ours.
    static func resolveDevice(_ candidates: [String] = Locale.preferredLanguages) -> AppLocale {
        for candidate in candidates {
            if let matched = match(candidate) { return matched }
        }
        return .default
    }
}

// MARK: - Economy

enum QualityTier: String, LenientEnum {
    case QUICK, VIVID, CINEMATIC, APEX
    static var fallback: QualityTier { .VIVID }
}

struct WalletSummary: Codable, Hashable {
    var accountId: String
    var balance: Int
    var reserved: Int
    var lifetimeGranted: Int
    var lifetimeSpent: Int
    var dailyClaimAvailable: Bool
    var nextDailyClaimAt: String?
    var firstPurchaseOfferExpiresAt: String?
    /// Whether this account's next purchase is still its first, and doubled.
    /// Replaces reading a countdown off `firstPurchaseOfferExpiresAt`, which
    /// expired 48 hours after signup and so was always gone by the time
    /// somebody reached the wall.
    @Default<False> var firstPurchaseBonusAvailable: Bool
    /// When the flash window closes, or nil when none is running. Server
    /// computed from the ledger row that opened it, so the countdown the app
    /// draws is the real deadline.
    var flashOfferExpiresAt: String?
}

struct StoreOffer: Codable, Hashable, Identifiable {
    var id: String { productId }
    var productId: String
    var credits: Int
    @Default<Zero> var bonusCredits: Int
    var referencePriceUsd: Double
    /// The server's English label. Kept for older payloads; the rung below is
    /// what this app renders, so the words can be in the player's language.
    var badge: String?
    var tier: StoreOfferTier?
    @Default<False> var firstPurchaseOnly: Bool
    var expiresAt: String?
}

enum StoreOfferTier: String, LenientEnum {
    case STARTER, POPULAR, BEST_VALUE, FLASH
    case UNKNOWN
    static var fallback: StoreOfferTier { .UNKNOWN }
}

enum LedgerEntryType: String, LenientEnum {
    case PURCHASE, BONUS, DAILY_GRANT, NEW_USER_GRANT, TURN_RESERVE, TURN_FINALIZE, TURN_RELEASE
    case MEDIA_RESERVE, MEDIA_FINALIZE, MEDIA_RELEASE, REFUND, ADMIN_ADJUST, CREATOR_GRANT, PROMO_GRANT, FORK_FEE
    case UNKNOWN
    static var fallback: LedgerEntryType { .UNKNOWN }
}

struct LedgerEntry: Codable, Hashable, Identifiable {
    var id: String
    var accountId: String
    var type: LedgerEntryType
    var amount: Int
    var balanceAfter: Int
    var reasonCode: String
    var referenceId: String?
    var idempotencyKey: String?
    var createdAt: String
    var metadata: [String: JSONValue]?
}

// MARK: - Story catalog

enum ContentDescriptor: String, LenientEnum {
    case FANTASY_VIOLENCE, ROMANCE, SUGGESTIVE_THEMES, HORROR, PSYCHOLOGICAL_THEMES
    case ALCOHOL_REFERENCES, LANGUAGE, PERMANENT_DEATH, MORAL_AMBIGUITY
    case UNKNOWN
    static var fallback: ContentDescriptor { .UNKNOWN }
}

enum Intensity: String, LenientEnum {
    case LIGHT, MODERATE, INTENSE
    static var fallback: Intensity { .MODERATE }
}

enum StoryBadge: String, LenientEnum {
    case NEW, TRENDING, OFFICIAL, STAFF_PICK, UNKNOWN
    static var fallback: StoryBadge { .UNKNOWN }
}

struct StorySummary: Codable, Hashable, Identifiable {
    var id: String { storyId }
    var storyId: String
    var storyVersionId: String
    var title: String
    var fantasyLabel: String
    var hook: String
    var creatorName: String
    /// Empty for the official catalogue. What "block this creator" aims at.
    @Default<EmptyString> var creatorId: String
    var official: Bool
    var coverImage: String?
    var keyArt: String?
    @Default<EmptyArray<String>> var tags: [String]
    @Default<EmptyArray<String>> var mechanicsChips: [String]
    @Default<EmptyArray<ContentDescriptor>> var contentDescriptors: [ContentDescriptor]
    var intensity: Intensity
    var runs: Int
    @Default<Zero> var views: Int
    var likes: Int
    @Default<Zero> var comments: Int
    @Default<False> var likedByMe: Bool
    @Default<False> var saved: Bool
    @Default<EmptyArray<StoryBadge>> var badges: [StoryBadge]
    var updatedAt: String
}

struct ArchetypeGrants: Codable, Hashable {
    @Default<EmptyArray<String>> var attributes: [String]
    @Default<EmptyArray<String>> var skills: [String]
    @Default<EmptyArray<String>> var abilities: [String]
    @Default<EmptyArray<String>> var items: [String]
    @Default<EmptyArray<String>> var standing: [String]
}

struct SetupArchetype: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var role: String
    var summary: String
    @Default<EmptyArray<String>> var playstyle: [String]
    @Default<EmptyString> var blurb: String
    var grants: ArchetypeGrants
}

enum SetupFieldKind: String, LenientEnum {
    case TEXT, CHOICE, ARCHETYPE
    static var fallback: SetupFieldKind { .TEXT }
}

struct SetupOption: Codable, Hashable, Identifiable {
    var id: String
    var label: String
}

struct CharacterSetupField: Codable, Hashable, Identifiable {
    var id: String
    var label: String
    var kind: SetupFieldKind
    @Default<EmptyString> var helpText: String
    @Default<False> var required: Bool
    @Default<False> var advanced: Bool
    var maxLength: Int?
    @Default<EmptyArray<SetupOption>> var options: [SetupOption]
    @Default<EmptyString> var placeholder: String
}

enum ProtagonistKind: String, LenientEnum {
    case BLANK, NAMED
    static var fallback: ProtagonistKind { .BLANK }
}

struct Protagonist: Codable, Hashable {
    @Default<Fallback<ProtagonistKind>> var kind: ProtagonistKind = .BLANK
    @Default<EmptyString> var name: String
    @Default<EmptyString> var pronouns: String
    @Default<EmptyString> var description: String
    @Default<EmptyString> var setupHeading: String
    var portrait: String?

    static let blank = Protagonist(kind: .BLANK, name: "", pronouns: "", description: "", setupHeading: "", portrait: nil)
}

// MARK: - Bootstrap

struct FeatureFlags: Codable, Hashable {
    @Default<False> var coopBeta: Bool
    @Default<False> var animationBeta: Bool
    @Default<True> var voicePlayback: Bool
    @Default<True> var heroImages: Bool
    @Default<False> var offScreenEvents: Bool
    @Default<True> var creatorPublishing: Bool
    @Default<False> var pushNotifications: Bool
}

struct QualityTierInfo: Codable, Hashable, Identifiable {
    var id: QualityTier
    var label: String
    var costCredits: Int
    var promise: String
    var heroImageEligible: Bool
}

struct Genre: Codable, Hashable, Identifiable {
    var id: String
    var label: String
}

struct Maintenance: Codable, Hashable {
    var active: Bool
    var message: String?
}

struct BootstrapProfile: Codable, Hashable {
    var userId: String
    var displayName: String
    var handle: String
    var isGuest: Bool
    var avatarUrl: String?
    var ageVerified: Bool
}

struct BootstrapResponse: Codable, Hashable {
    var featureFlags: FeatureFlags
    @Default<EmptyArray<QualityTierInfo>> var qualityTiers: [QualityTierInfo]
    var defaultQualityTier: QualityTier
    @Default<EmptyArray<ContentDescriptor>> var contentDescriptors: [ContentDescriptor]
    @Default<EmptyArray<Genre>> var genres: [Genre]
    var minSupportedAppVersion: String
    var maintenance: Maintenance
    var profile: BootstrapProfile?
    var wallet: WalletSummary?
}

// MARK: - Discover

enum RailKind: String, LenientEnum {
    case HERO, CONTINUE, FOR_YOU, TRENDING, TOP_RANKED, NEW, GENRE, FOLLOWING, UNKNOWN
    static var fallback: RailKind { .UNKNOWN }
}

struct DiscoverRail: Codable, Hashable, Identifiable {
    var id: String
    var title: String
    var titleKey: String?
    var kind: RailKind
    var subtitle: String?
    var subtitleKey: String?
    var subtitleParams: [String: String]?
    @Default<EmptyArray<StorySummary>> var stories: [StorySummary]
}

struct ContinueCard: Codable, Hashable, Identifiable {
    var id: String { sessionId }
    var sessionId: String
    var storyId: String
    var title: String
    var coverImage: String?
    var lastPlayedAt: String
    var turnCount: Int
    var currentObjective: String?
    var recapLine: String?
}

struct DiscoverCategory: Codable, Hashable, Identifiable {
    var id: String
    var label: String
    var count: Int
}

struct DiscoverResponse: Codable, Hashable {
    @Default<EmptyArray<DiscoverRail>> var rails: [DiscoverRail]
    @Default<EmptyArray<ContinueCard>> var continueCards: [ContinueCard]
    @Default<EmptyArray<DiscoverCategory>> var categories: [DiscoverCategory]
    var activeCategory: String?
}

struct SearchResponse: Codable, Hashable {
    @Default<EmptyArray<StorySummary>> var results: [StorySummary]
}

// MARK: - Story detail

struct CastMember: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var role: String
    @Default<EmptyString> var cardBlurb: String
    var portrait: String?
    @Default<EmptyArray<String>> var publicTraits: [String]
    @Default<TheyThem> var pronouns: String
    @Default<EmptyString> var appearance: String
}

struct StoryStats: Codable, Hashable {
    var runs: Int
    var medianDepthLabel: String
    var intensity: String
    var updatedAt: String
}

enum SessionStatus: String, LenientEnum {
    case ACTIVE, COMPLETED, ARCHIVED
    static var fallback: SessionStatus { .ACTIVE }
}

struct StoryRun: Codable, Hashable, Identifiable {
    var id: String { sessionId }
    var sessionId: String
    var turnCount: Int
    var status: SessionStatus
    var lastPlayedAt: String
    var locationName: String?
}

struct StoryDetailResponse: Codable, Hashable {
    var story: StorySummary
    var premise: String
    @Default<EmptyString> var creatorNote: String
    @Default<EmptyString> var opening: String
    @Default<EmptyArray<CastMember>> var cast: [CastMember]
    var stats: StoryStats
    @Default<EmptyArray<StorySummary>> var related: [StorySummary]
    var activeSessionId: String?
    @Default<EmptyArray<StoryRun>> var sessions: [StoryRun]
    @Default<EmptyArray<CharacterSetupField>> var setupFields: [CharacterSetupField]
    @Default<EmptyArray<SetupArchetype>> var archetypes: [SetupArchetype]
    var protagonist: Protagonist?
}

// MARK: - Sessions

enum GrammaticalGender: String, LenientEnum {
    case MASCULINE, FEMININE, NEUTRAL, UNSPECIFIED
    static var fallback: GrammaticalGender { .UNSPECIFIED }
}

struct PlayerGrammar: Codable, Hashable {
    @Default<Fallback<GrammaticalGender>> var gender: GrammaticalGender = .UNSPECIFIED
    @Default<EmptyString> var thirdPerson: String
}

struct PlayerIdentity: Codable, Hashable {
    var displayName: String
    @Default<TheyThem> var pronouns: String = "they/them"
    var grammar: PlayerGrammar?
    var ageBand: String?
    var archetypeId: String?
    @Default<EmptyString> var worldKnowsAboutYou: String = ""
    @Default<EmptyStringMap> var advanced: [String: String] = [:]
    var portraitAssetId: String?
}

/// A patch to the player's own identity, mid-run. Omitted fields are untouched,
/// so this encodes only what the player actually changed.
struct UpdateIdentityBody: Codable, Hashable {
    var displayName: String?
    var pronouns: String?
    var grammar: PlayerGrammar?
    var archetypeId: String?
    var worldKnowsAboutYou: String?
}

struct UpdateIdentityResponse: Codable, Hashable {
    var identity: PlayerIdentity
    var revision: Int
}

struct CreateSessionRequest: Codable, Hashable {
    var identity: PlayerIdentity
    var usedQuickSetup: Bool = true
    var locale: AppLocale?
}

struct SessionSummary: Codable, Hashable, Identifiable {
    var id: String { sessionId }
    var sessionId: String
    var storyId: String
    var storyVersionId: String
    var title: String
    var coverImage: String?
    var revision: Int
    var turnCount: Int
    var status: SessionStatus
    var createdAt: String
    var lastPlayedAt: String
    var displayName: String
    var forkedFromSessionId: String?
    var forkedAtTurnIndex: Int?
    @Default<Fallback<AppLocale>> var locale: AppLocale = .en
}

struct PresentCharacter: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var portrait: String?
    @Default<EmptyString> var expression: String
    @Default<False> var speaking: Bool
    var reactionUrl: String?
    var reactionEmotion: String?
}

struct CastRef: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var portrait: String?
}

enum ResourcePolarity: String, LenientEnum {
    case GOOD_HIGH, GOOD_LOW
    static var fallback: ResourcePolarity { .GOOD_HIGH }
}

struct SceneResource: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var current: Double
    var max: Double
    var start: Double?
    var color: String?
    @Default<Fallback<ResourcePolarity>> var polarity: ResourcePolarity = .GOOD_HIGH
}

struct EncounterParticipant: Codable, Hashable, Identifiable {
    var id: String?
    var entityId: String?
    var name: String?
    var side: String?
    var zoneId: String?
    var hp: Double?
    var maxHp: Double?
    var statuses: [String]?

    var stableId: String { id ?? entityId ?? name ?? UUID().uuidString }
}

struct EncounterZone: Codable, Hashable, Identifiable {
    var id: String
    var label: String
    @Default<EmptyArray<String>> var adjacentTo: [String]
}

struct EncounterState: Codable, Hashable {
    var encounterId: String
    @Default<EmptyString> var objective: String
    @Default<EmptyArray<EncounterParticipant>> var participants: [EncounterParticipant]
    @Default<EmptyArray<EncounterZone>> var zones: [EncounterZone]
    @Default<One> var round: Int = 1
    @Default<EmptyString> var activeEntityId: String
    @Default<EmptyArray<String>> var turnOrder: [String]
    @Default<EmptyArray<String>> var environmentalAffordances: [String]
    @Default<EmptyString> var escapeCondition: String
    @Default<True> var surrenderAllowed: Bool
}

struct ContestState: Codable, Hashable {
    var contestId: String
    var opponentId: String
    var opponentName: String
    @Default<EmptyString> var stakes: String
    var period: Int
    @Default<Four> var periodCount: Int = 4
    var clockSeconds: Int
    @Default<Zero> var playerScore: Int
    @Default<Zero> var opponentScore: Int
    @Default<True> var playerPossession: Bool
    @Default<ZeroDouble> var momentum: Double = 0
    @Default<ZeroDouble> var playerFatigue: Double = 0
    @Default<Zero> var playerFouls: Int
    var matchupId: String?
    @Default<False> var playerControlled: Bool
    @Default<EmptyString> var controlReason: String
    @Default<EmptyArray<String>> var log: [String]
    @Default<False> var finished: Bool
    var playerWon: Bool?
}

struct CrewMember: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var station: String
    var mood: String
    var portrait: String?
}

struct SessionSceneState: Codable, Hashable {
    var locationId: String
    var locationName: String
    var stageImage: String?
    var worldTimeLabel: String
    var worldMinute: Int
    var dayNumber: Int
    @Default<EmptyArray<PresentCharacter>> var presentCharacters: [PresentCharacter]
    @Default<EmptyArray<CastRef>> var cast: [CastRef]
    var objective: String?
    @Default<EmptyArray<SceneResource>> var resources: [SceneResource]
    var encounter: EncounterState?
    var contest: ContestState?
    @Default<EmptyArray<CrewMember>> var crew: [CrewMember]
}

enum BlockType: String, LenientEnum {
    case NARRATION, DIALOGUE, SYSTEM
    static var fallback: BlockType { .NARRATION }
}

struct NarrativeBlock: Codable, Hashable {
    var type: BlockType
    var speakerId: String?
    var text: String
    var visibility: String?
    var voiceEligible: Bool?
}

enum CheckOutcome: String, LenientEnum {
    case CRITICAL_SUCCESS, CLEAN_SUCCESS, SUCCESS, SUCCESS_WITH_COST, FAILURE, COMPLICATION
    static var fallback: CheckOutcome { .SUCCESS }

    var isSuccess: Bool {
        switch self {
        case .CRITICAL_SUCCESS, .CLEAN_SUCCESS, .SUCCESS, .SUCCESS_WITH_COST: return true
        case .FAILURE, .COMPLICATION: return false
        }
    }
}

enum RiskLabel: String, LenientEnum {
    case SAFE, UNCERTAIN, RISKY, EXTREME
    static var fallback: RiskLabel { .UNCERTAIN }
}

struct PlayerCheckResult: Codable, Hashable, Identifiable {
    var id: String { checkId }
    var checkId: String
    var label: String
    @Default<EmptyString> var attribute: String
    var skill: String?
    var outcome: CheckOutcome
    @Default<EmptyString> var difficultyLabel: String
    var dc: Int?
    var math: String?
}

struct StateDeltaPresentation: Codable, Hashable, Identifiable {
    var id: String { mutationId }
    var mutationId: String
    var label: String
    @Default<Three> var priority: Int = 3
}

struct SuggestedAction: Codable, Hashable, Identifiable {
    var id: String { intentHint + "|" + text }
    var text: String
    var intentHint: String
    var risk: RiskLabel?
    var resourceCostLabel: String?
}

struct PlayerTurnRecord: Codable, Hashable, Identifiable {
    var id: String { turnId }
    var turnId: String
    var sessionId: String
    var turnIndex: Int
    var actionText: String?
    var qualityTier: QualityTier
    var creditsCharged: Int
    @Default<EmptyString> var sceneSummary: String
    @Default<EmptyArray<NarrativeBlock>> var blocks: [NarrativeBlock]
    @Default<EmptyArray<PlayerCheckResult>> var checks: [PlayerCheckResult]
    @Default<EmptyArray<StateDeltaPresentation>> var stateDeltas: [StateDeltaPresentation]
    @Default<EmptyArray<SuggestedAction>> var suggestions: [SuggestedAction]
    @Default<EmptyString> var endStatePrompt: String
    var heroImageUrl: String?
    var revisionAfter: Int
    var createdAt: String
}

struct SessionRecap: Codable, Hashable {
    @Default<EmptyArray<String>> var bullets: [String]
    var objective: String?
}

struct ProloguePanelView: Codable, Hashable, Identifiable {
    var id: String { imageUrl ?? headline }
    var imageUrl: String?
    @Default<EmptyString> var headline: String
    @Default<EmptyString> var subline: String
    @Default<EmptyString> var alt: String
}

struct SessionDetailResponse: Codable, Hashable {
    var session: SessionSummary
    var scene: SessionSceneState
    /// The opening cinematic. Empty for every story without one, and for any
    /// run that is already under way.
    @Default<EmptyArray<ProloguePanelView>> var prologue: [ProloguePanelView]
    @Default<EmptyArray<PlayerTurnRecord>> var recentTurns: [PlayerTurnRecord]
    @Default<EmptyArray<SuggestedAction>> var suggestions: [SuggestedAction]
    var recap: SessionRecap?
    var revision: Int
}

struct SessionsResponse: Codable, Hashable {
    @Default<EmptyArray<SessionSummary>> var sessions: [SessionSummary]
}

struct ForkResponse: Codable, Hashable {
    var session: SessionSummary
    var creditsCharged: Int
}

struct CanonCorrectionResponse: Codable, Hashable {
    var accepted: Bool
    var conflictExplanation: String?
    var offerFork: Bool
}

// MARK: - Turns

struct SubmitTurnRequest: Codable, Hashable {
    var actionText: String
    var qualityTier: QualityTier
    var sessionRevision: Int
    var selectedSuggestionId: String?
    var voicePreferred: Bool = false
}

struct SubmitTurnResponse: Codable, Hashable {
    var turnId: String
    var reservedCredits: Int
    var balanceAfterReserve: Int
    var acceptedRevision: Int
    var streamUrl: String
    var streamToken: String
}

/// Spec §17.9 — SSE event names.
enum TurnStreamEventName: String, LenientEnum {
    case turnAccepted = "turn.accepted"
    case checkStarted = "check.started"
    case checkResolved = "check.resolved"
    case resolutionReady = "resolution.ready"
    case reactionReady = "reaction.ready"
    case textStream = "text.stream"
    case textDelta = "text.delta"
    case stateDelta = "state.delta"
    case turnCompleted = "turn.completed"
    case turnTimings = "turn.timings"
    case mediaQueued = "media.queued"
    case mediaCompleted = "media.completed"
    /// The frame could not be drawn. The placeholder has to come down, or the
    /// beat keeps a hole in it for the rest of the session.
    case mediaFailed = "media.failed"
    case turnFailed = "turn.failed"
    case unknown
    static var fallback: TurnStreamEventName { .unknown }
}

struct TurnStreamFrame: Codable {
    var event: TurnStreamEventName
    var turnId: String?
    var sequence: Int?
    var sessionRevision: Int?
    var data: [String: JSONValue]
}

struct RephraseResponse: Codable, Hashable {
    var turn: PlayerTurnRecord
    var creditsCharged: Int
    var balance: Int
}

struct PortraitResponse: Codable, Hashable {
    var assetKey: String
    var url: String
    var alt: String
    var variant: Int
    var creditsCharged: Int
    var balance: Int
}

// MARK: - World sheet

enum StatusKind: String, LenientEnum {
    case BUFF, DEBUFF, NEUTRAL
    static var fallback: StatusKind { .NEUTRAL }
}

struct StatusEffect: Codable, Hashable, Identifiable {
    var id: String
    var label: String
    var kind: StatusKind
    var expiresAtWorldMinute: Int?
    var attributeModifiers: [String: Int]?
    @Default<EmptyString> var description: String
}

struct RelationshipHighlight: Codable, Hashable, Identifiable {
    var id: String { characterId }
    var characterId: String
    var name: String
    var label: String
}

struct WorldSheetOverview: Codable, Hashable {
    var locationName: String
    var worldTimeLabel: String
    var chapterLabel: String
    var topObjective: String?
    @Default<EmptyArray<SceneResource>> var resources: [SceneResource]
    @Default<EmptyArray<StatusEffect>> var statuses: [StatusEffect]
    @Default<EmptyArray<RelationshipHighlight>> var relationshipHighlights: [RelationshipHighlight]
    @Default<EmptyArray<String>> var recentEvents: [String]
}

struct AttributeView: Codable, Hashable, Identifiable {
    var id: String { key }
    var key: String
    var name: String
    var value: Int
    var modifier: Int
    var plainLanguage: String
}

struct SkillView: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var attribute: String
    var proficiency: Int
    var proficiencyLabel: String
}

struct AbilityView: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var effect: String
    var description: String
    var costLabel: String
    var cooldownRemaining: Int
}

struct FactionView: Codable, Hashable, Identifiable {
    var id: String { factionId }
    var factionId: String
    var name: String
    var reputation: Int
    var rankLabel: String
}

enum ProgressionMode: String, LenientEnum {
    case LEVEL, MILESTONE
    static var fallback: ProgressionMode { .LEVEL }
}

struct WorldSheetCharacter: Codable, Hashable {
    var identity: PlayerIdentity
    var level: Int
    var xp: Int
    var progressionMode: ProgressionMode
    @Default<EmptyArray<String>> var milestones: [String]
    @Default<EmptyArray<AttributeView>> var attributes: [AttributeView]
    @Default<EmptyArray<SkillView>> var skills: [SkillView]
    @Default<EmptyArray<AbilityView>> var abilities: [AbilityView]
    @Default<EmptyArray<StatusEffect>> var statuses: [StatusEffect]
    @Default<EmptyArray<FactionView>> var factions: [FactionView]
    @Default<EmptyArray<String>> var canonFacts: [String]
}

struct InventoryEntry: Codable, Hashable, Identifiable {
    var id: String { entryId }
    var entryId: String
    var itemId: String
    var name: String
    var quantity: Int
    var equipped: Bool
    var equipSlot: String?
    var rarity: String?
    var icon: String?
    @Default<EmptyArray<String>> var effects: [String]
    @Default<EmptyString> var description: String
    @Default<EmptyString> var loreText: String
    var canUse: Bool
    var canEquip: Bool
}

enum QuestStatus: String, LenientEnum {
    case ACTIVE, COMPLETED, FAILED, AVAILABLE, LOCKED, UNKNOWN
    static var fallback: QuestStatus { .UNKNOWN }
}

struct QuestView: Codable, Hashable, Identifiable {
    var id: String { questId }
    var questId: String
    var title: String
    var summary: String
    var status: QuestStatus
    var currentStepCopy: String?
    var deadlineLabel: String?
    @Default<EmptyString> var rewardCopy: String
    @Default<EmptyArray<String>> var involvedNames: [String]
}

struct RelationshipDimensions: Codable, Hashable {
    var trust: Int
    var affection: Int
    var respect: Int
    var fear: Int
    var rivalry: Int
}

struct RelationshipView: Codable, Hashable, Identifiable {
    var id: String { characterId }
    var characterId: String
    var name: String
    var portrait: String?
    var label: String
    var lastInteractionTurn: Int
    var dimensions: RelationshipDimensions
}

struct MapPosition: Codable, Hashable {
    var x: Double
    var y: Double
}

struct MapNode: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var discovered: Bool
    var current: Bool
    var hasQuest: Bool
    var locked: Bool
    var lockReason: String?
    var travelMinutes: Int?
    var position: MapPosition
}

struct MapEdge: Codable, Hashable {
    var from: String
    var to: String
}

struct WorldMap: Codable, Hashable {
    var currentLocationId: String
    @Default<EmptyArray<MapNode>> var nodes: [MapNode]
    @Default<EmptyArray<MapEdge>> var edges: [MapEdge]
}

struct WorldSheetResponse: Codable, Hashable {
    var overview: WorldSheetOverview
    var character: WorldSheetCharacter
    @Default<EmptyArray<InventoryEntry>> var inventory: [InventoryEntry]
    @Default<EmptyArray<QuestView>> var quests: [QuestView]
    @Default<EmptyArray<RelationshipView>> var relationships: [RelationshipView]
    var map: WorldMap
}

enum TimelineGroup: String, LenientEnum {
    case CANON, CHOICE, RELATIONSHIP, QUEST, ITEM, WORLD
    static var fallback: TimelineGroup { .WORLD }
}

struct TimelineEntry: Codable, Hashable, Identifiable {
    var id: String
    var group: TimelineGroup
    var turnIndex: Int
    var worldTimeLabel: String
    var text: String
    var pinned: Bool
    var correctable: Bool
    var forkable: Bool
}

struct TimelineResponse: Codable, Hashable {
    @Default<EmptyArray<TimelineEntry>> var entries: [TimelineEntry]
}

// MARK: - Wallet and store

struct WalletResponse: Codable, Hashable {
    var wallet: WalletSummary
    @Default<EmptyArray<StoreOffer>> var offers: [StoreOffer]
}

struct LedgerResponse: Codable, Hashable {
    @Default<EmptyArray<LedgerEntry>> var entries: [LedgerEntry]
    var nextCursor: String?
}

struct DailyClaimResponse: Codable, Hashable {
    var granted: Bool
    var amount: Int
    var balance: Int
    var nextClaimAt: String?
}

enum PurchasePlatform: String, Codable, Hashable {
    case APP_STORE, PLAY_STORE, SANDBOX
}

struct PurchaseSyncRequest: Codable, Hashable {
    var productId: String
    var storeTransactionId: String
    var platform: PurchasePlatform
    var receipt: String?
}

struct PurchaseSyncResponse: Codable, Hashable {
    var credited: Int
    var duplicate: Bool
    var balance: Int
}

struct PurchaseRestoreResponse: Codable, Hashable {
    var verified: Int
    var restored: Int
    var creditsRestored: Int
    var balance: Int
}

// MARK: - Social

struct CommentView: Codable, Hashable, Identifiable {
    var id: String { commentId }
    var commentId: String
    var authorName: String
    var body: String
    var spoiler: Bool
    var likes: Int
    var createdAt: String
    var likedByMe: Bool
    var mine: Bool
}

enum CommentSort: String, Codable, Hashable, CaseIterable {
    case TOP, NEW
}

struct CommentsResponse: Codable, Hashable {
    var sort: CommentSort
    @Default<EmptyArray<CommentView>> var comments: [CommentView]
}

enum BadgeTier: String, LenientEnum {
    case BRONZE, SILVER, GOLD
    static var fallback: BadgeTier { .BRONZE }
}

struct BadgeView: Codable, Hashable, Identifiable {
    var id: String
    var title: String
    var description: String
    var icon: String
    var tier: BadgeTier
    var target: Int
    var creditReward: Int
    var secret: Bool
    var progress: Int
    var unlockedAt: String?
    var claimedAt: String?
}

struct BadgesResponse: Codable, Hashable {
    @Default<EmptyArray<BadgeView>> var badges: [BadgeView]
    @Default<EmptyArray<String>> var newlyUnlocked: [String]
}

struct DiscordQuestResponse: Codable, Hashable {
    var code: String
    var linked: Bool
}

struct ClaimBadgeResponse: Codable, Hashable {
    var claimed: Bool
    var credited: Int
    var balance: Int
}

struct PlayerCharacterCard: Codable, Hashable, Identifiable {
    var id: String { sessionId }
    var sessionId: String
    var storyId: String
    var storyTitle: String
    var displayName: String
    @Default<TheyThem> var pronouns: String
    var archetypeName: String?
    var portraitUrl: String?
    @Default<EmptyString> var appearanceNote: String
    var protagonistIsCanon: Bool?
    @Default<EmptyString> var worldKnowsAboutYou: String
    var turnCount: Int
    var level: Int
    var milestones: Int
    var locationName: String
    @Default<EmptyArray<String>> var canon: [String]
    @Default<EmptyArray<String>> var notableMemories: [String]
    var status: String
    var lastPlayedAt: String
    var portraitCost: Int
}

struct MyCharactersResponse: Codable, Hashable {
    @Default<EmptyArray<PlayerCharacterCard>> var characters: [PlayerCharacterCard]
}

// MARK: - Account and safety

struct MeSettings: Codable, Hashable {
    @Default<False> var showAdvancedRelationshipStats: Bool
    @Default<False> var showCheckMath: Bool
    @Default<False> var reduceMotion: Bool
    @Default<False> var voiceAutoplay: Bool
    @Default<True> var hapticsEnabled: Bool
    @Default<Fallback<QualityTier>> var defaultQualityTier: QualityTier = .VIVID
    @Default<EmptyArray<ContentDescriptor>> var contentFilters: [ContentDescriptor]
    var locale: AppLocale?
}

struct MeStats: Codable, Hashable {
    @Default<Zero> var storiesPlayed: Int
    @Default<Zero> var turnsPlayed: Int
    @Default<Zero> var worldsCreated: Int
}

struct MeResponse: Codable, Hashable {
    var userId: String
    var displayName: String
    var handle: String
    var email: String?
    var isGuest: Bool
    var avatarUrl: String?
    var ageVerified: Bool
    var createdAt: String
    var settings: MeSettings
    var stats: MeStats
}

enum ReportTargetType: String, Codable, Hashable {
    case STORY, TURN, USER, MEDIA, COMMENT
}

enum ReportReason: String, Codable, Hashable, CaseIterable {
    case SEXUAL_CONTENT_INVOLVING_MINORS, HARASSMENT, HATE, VIOLENCE_THREAT, SELF_HARM
    case IP_VIOLATION, IMPERSONATION, SPAM, BROKEN_OR_INCONSISTENT, OTHER
}

struct CreateReportRequest: Codable, Hashable {
    var targetType: ReportTargetType
    var targetId: String
    var reason: ReportReason
    var details: String = ""
    var alsoHide: Bool = false
}

struct ReportResponse: Codable, Hashable {
    var reportId: String
    var caseReference: String
}

struct ReportHistoryEntry: Codable, Hashable, Identifiable {
    var id: String { reportId }
    var reportId: String
    var caseReference: String?
    var targetType: String?
    var targetId: String?
    var reason: String?
    var status: String?
    var createdAt: String?
    var details: String?
}

struct ReportHistoryResponse: Codable, Hashable {
    @Default<EmptyArray<ReportHistoryEntry>> var reports: [ReportHistoryEntry]
}

struct DeletedResponse: Codable, Hashable {
    var deleted: Bool
}

struct SavedResponse: Codable, Hashable {
    var saved: Bool
}

struct LikedResponse: Codable, Hashable {
    var liked: Bool
    var likes: Int?
}

struct HiddenResponse: Codable, Hashable {
    var hidden: Bool
}

struct ReportedResponse: Codable, Hashable {
    var reported: Bool
}

struct PostCommentResponse: Codable, Hashable {
    var commentId: String
}

struct PinResponse: Codable, Hashable {
    var factId: String
    var pinned: Bool
}

struct GuestMigrateResponse: Codable, Hashable {
    var migrated: Bool
    var sessionsMoved: Int
}


// MARK: - Blocking

struct BlockedResponse: Codable, Hashable {
    @Default<False> var blocked: Bool
}

/// One person this player has blocked. The name is what makes the list
/// usable — a column of uuids is not somewhere anybody undoes a mis-tap.
struct BlockedPerson: Codable, Hashable, Identifiable {
    var userId: String
    @Default<EmptyString> var displayName: String
    var id: String { userId }
}

struct BlockedListResponse: Codable {
    @Default<EmptyArray<String>> var blocked: [String]
    @Default<EmptyArray<BlockedPerson>> var people: [BlockedPerson]
}
