import { z } from 'zod';

/** Spec §20 — credits, quality tiers, wallet ledger. */

export const QualityTier = z.enum(['QUICK', 'VIVID', 'CINEMATIC', 'APEX']);
export type QualityTier = z.infer<typeof QualityTier>;

export interface QualityTierConfig {
  readonly id: QualityTier;
  readonly label: string;
  readonly costCredits: number;
  /** Player-facing promise. Must describe presentation, never dice. §20.3. */
  readonly promise: string;

  // --- What the tier actually changes ---
  //
  // These four are the whole difference between the tiers, and billing reads
  // `costCredits` from this same object, so it is not possible to charge for
  // one profile and generate with another.

  /** The storyteller. Chosen per tier from measured quality, latency and cost. */
  readonly model: string;
  /** How hard it thinks. Undefined leaves the model's own default. */
  readonly reasoningEffort?: 'none' | 'low' | 'medium' | 'high';
  /** A soft prose target in visible words. Never enforced by truncation. */
  readonly words: { readonly low: number; readonly high: number };
  /** Output ceiling. Must leave room to close the schema, not to clip prose. */
  readonly maxOutputTokens: number;
  /** Whether a turn on this tier may earn a generated hero image. */
  readonly heroImageEligible: boolean;

  // --- The old engine's dials ---
  //
  // Read only by the legacy pipeline, which is no longer the production path.
  // `memoryBudget` in particular must never come back: every tier sees the
  // whole conversation, because continuity is the product rather than an
  // upsell.
  readonly wordBudget: number;
  readonly memoryBudget: number;
  readonly directorRole: 'director_standard' | 'director_premium';
  readonly writerRole: 'writer_fast' | 'writer_standard' | 'writer_premium';
}

/**
 * The generation profile for a tier.
 *
 * One accessor so that nothing has to remember which fields are live. Billing
 * and generation both resolve from here.
 */
export function profileFor(tier: QualityTier): QualityTierConfig {
  return QUALITY_TIERS[tier];
}

/**
 * Spec §20.3. The engine is identical across tiers — paying more must not buy
 * better dice. Only presentation depth, memory budget, and media change.
 *
 * `wordBudget` is the *middle* of a range, not a cap — `beatBudget` moves
 * within it from a count of what actually happened, and the hard ceiling is 500.
 *
 * These were 60 / 95 / 130 / 190, and they were far too low. Measured against a
 * competitor's ordinary turn, one screenful was already longer than an entire
 * Vivid beat here, and Vivid is the default tier. What that costs is not
 * "brevity" — it is that a scene cannot breathe: the writer gets ninety-five
 * words to establish a room, react in character, carry two people's dialogue
 * and leave the player somewhere to go, so it does the last of those badly and
 * everything reads clipped. Length is the cheapest thing we were withholding.
 *
 * The rhythm rules in the writer policy matter more than the numbers do. Four
 * hundred words in three paragraphs is a wall on a phone; the same four hundred
 * in twelve short ones reads fast.
 */
export const QUALITY_TIERS: Record<QualityTier, QualityTierConfig> = {
  QUICK: {
    id: 'QUICK',
    label: 'Quick',
    costCredits: 30,
    promise: 'Fast, concise turn',
    model: 'gpt-5.6-luna',
    reasoningEffort: 'none',
    words: { low: 100, high: 180 },
    maxOutputTokens: 3000,
    wordBudget: 140,
    memoryBudget: 4,
    heroImageEligible: false,
    directorRole: 'director_standard',
    writerRole: 'writer_fast',
  },
  VIVID: {
    id: 'VIVID',
    label: 'Vivid',
    costCredits: 60,
    promise: 'Richer dialogue and direction',
    model: 'gpt-5.6-terra',
    words: { low: 150, high: 300 },
    maxOutputTokens: 4000,
    wordBudget: 260,
    memoryBudget: 8,
    heroImageEligible: false,
    directorRole: 'director_standard',
    writerRole: 'writer_standard',
  },
  CINEMATIC: {
    id: 'CINEMATIC',
    label: 'Cinematic',
    costCredits: 90,
    promise: 'Best balance of immersion and speed',
    model: 'gpt-5.6-terra',
    reasoningEffort: 'high',
    words: { low: 200, high: 350 },
    maxOutputTokens: 5000,
    wordBudget: 360,
    memoryBudget: 14,
    heroImageEligible: true,
    directorRole: 'director_standard',
    writerRole: 'writer_standard',
  },
  APEX: {
    id: 'APEX',
    label: 'Apex',
    costCredits: 195,
    promise: 'Deepest reasoning and premium storytelling',
    model: 'gpt-5.6-sol',
    reasoningEffort: 'medium',
    words: { low: 250, high: 450 },
    maxOutputTokens: 6000,
    wordBudget: 430,
    memoryBudget: 20,
    heroImageEligible: true,
    directorRole: 'director_premium',
    writerRole: 'writer_premium',
  },
};

export const DEFAULT_QUALITY_TIER: QualityTier = 'VIVID';

/** Spec §20.7 — allowed ledger entry types. Balance derives from this log. */
export const LedgerEntryType = z.enum([
  'PURCHASE',
  'BONUS',
  'DAILY_GRANT',
  'NEW_USER_GRANT',
  'TURN_RESERVE',
  'TURN_FINALIZE',
  'TURN_RELEASE',
  'MEDIA_RESERVE',
  'MEDIA_FINALIZE',
  'MEDIA_RELEASE',
  'REFUND',
  'ADMIN_ADJUST',
  'CREATOR_GRANT',
  'PROMO_GRANT',
  'FORK_FEE',
  'CREATE_FEE',
]);
export type LedgerEntryType = z.infer<typeof LedgerEntryType>;

export const LedgerEntry = z
  .object({
    id: z.string(),
    accountId: z.string(),
    type: LedgerEntryType,
    /** Signed. Reserves are negative, releases positive. */
    amount: z.number().int(),
    balanceAfter: z.number().int(),
    reasonCode: z.string(),
    referenceId: z.string().nullable(),
    idempotencyKey: z.string().nullable(),
    createdAt: z.string(),
    metadata: z.record(z.unknown()).default({}),
  })
  .strict();
export type LedgerEntry = z.infer<typeof LedgerEntry>;

export const WalletSummary = z
  .object({
    accountId: z.string(),
    /** Spendable now: settled minus outstanding reserves. */
    balance: z.number().int(),
    reserved: z.number().int(),
    lifetimeGranted: z.number().int(),
    lifetimeSpent: z.number().int(),
    dailyClaimAvailable: z.boolean(),
    nextDailyClaimAt: z.string().nullable(),
    firstPurchaseOfferExpiresAt: z.string().nullable(),
    /**
     * Whether this account's next purchase is still its first, and therefore
     * doubled.
     *
     * Replaces reading a countdown off `firstPurchaseOfferExpiresAt`. That
     * field gated the first-purchase offer on 48 hours from signup, which put
     * it in front of people who had played nothing and had expired for
     * everybody by the time they hit the wall at turn 10 — the one moment they
     * were actually considering it. The bonus is now a fact about the account,
     * not a timer, so it is there whenever the player gets there.
     */
    firstPurchaseBonusAvailable: z.boolean().default(false),
  })
  .strict();
export type WalletSummary = z.infer<typeof WalletSummary>;

/**
 * Where an offer sits on the ladder, as a value rather than as a label.
 *
 * `badge` below is an English string the server writes, which is wrong in a
 * product where French is first-class — "Popular" reached a French wallet
 * untranslated. The rung is the fact; what it is called is the client's to
 * decide, in the player's own language.
 */
export const StoreOfferTier = z.enum(['STARTER', 'POPULAR', 'BEST_VALUE']);
export type StoreOfferTier = z.infer<typeof StoreOfferTier>;

export const StoreOffer = z
  .object({
    productId: z.string(),
    credits: z.number().int(),
    bonusCredits: z.number().int().default(0),
    /** Reference price only — the store is the source of truth at purchase. */
    referencePriceUsd: z.number(),
    badge: z.string().nullable().default(null),
    /** Which rung this is. Null for an offer that is not on the ladder. */
    tier: StoreOfferTier.nullable().default(null),
    firstPurchaseOnly: z.boolean().default(false),
    expiresAt: z.string().nullable().default(null),
  })
  .strict();
export type StoreOffer = z.infer<typeof StoreOffer>;

/**
 * Spec §20.4/§20.5. Remote-configurable, and expressed in turns rather than in
 * credits, because turns are the unit anybody actually reasons in.
 *
 * The default tier costs 60. A new account gets ten turns to find out whether
 * it likes this, and five a day after that — enough for a scene, not enough to
 * finish a session on, which is the shape the daily grant is supposed to have.
 *
 * Both are counted in Vivid turns, which is what the default resolves to. Now
 * that the tiers run different models the same grant buys twenty turns on Quick
 * and three on Apex, so "five a day" is the floor rather than the whole story.
 */
const DEFAULT_TURN_COST = 60;
export const GRANT_NEW_USER = 10 * DEFAULT_TURN_COST;
export const GRANT_DAILY = 5 * DEFAULT_TURN_COST;

/**
 * Credits, in the unit a player actually reasons in.
 *
 * "2,000 credits" asks somebody who has never seen our economy to work out
 * whether that is a lot. "About 33 more turns" does not. Every price surface
 * leads with this number and keeps the credits as the small print.
 *
 * Counted at the tier the player is actually on, because the same pack is 66
 * turns on Quick and 10 on Apex, and quoting the Vivid figure to somebody
 * playing Apex is a promise we would break within the hour. Rounded down: a
 * player who was told "about 33" and got 34 is pleased, and the reverse is a
 * complaint.
 */
export function turnsForCredits(credits: number, tier: QualityTier = 'VIVID'): number {
  return Math.floor(credits / QUALITY_TIERS[tier].costCredits);
}
export const FORK_COST_CREDITS = 120;
export const ANIMATION_COST_CREDITS = 600;

/**
 * Making a world.
 *
 * Compiling a pitch is two large structured generations — the spine and then
 * the cast with the spine in front of it — which lands near a Cinematic turn in
 * tokens. It is priced like one, doubled, because what it produces is not a
 * beat: it is an asset the creator can play forever and hand to other people.
 *
 * Re-rolling a single field is small and is meant to be used freely; a creator
 * who is pressing Auto-generate ten times is a creator who is still trying, and
 * charging them out of the flow is how you end up with a catalogue of drafts.
 */
export const CREATE_COMPILE_COST_CREDITS = 180;
export const CREATE_ASSIST_COST_CREDITS = 15;

/**
 * The credit ladder: three rungs, on Apple's own price points.
 *
 * ⚠️ `referencePriceUsd` is a **display fallback only** — what a player is
 * actually charged comes from StoreKit, which is the source of truth and shows
 * their local currency. Each `productId` below needs a matching consumable in
 * App Store Connect; until one exists, the product simply does not load and the
 * rung is hidden rather than sold at a price we invented.
 *
 * The old ladder had five rungs from $2.89 to $142.99 and they read as one
 * undifferentiated column of numbers. Worse, the cheapest way into the product
 * was $2.89 and the offer we pushed at a first-time buyer was **$19.99** — an
 * order of magnitude above the only first purchase anybody has actually made.
 * Our one genuine payer spent $2.89 and then played 98 turns; the evidence we
 * have says the first transaction wants to be small.
 *
 * Three rungs, each answering a different sentence:
 *
 * | rung | the player's thought | credits/$ |
 * |---|---|---|
 * | Starter $0.99 | "I just want to keep playing." | 707 |
 * | Popular $4.99 | "I play this pretty regularly." | 761 |
 * | Best value $9.99 | "I know I like this." | 821 |
 *
 * Value rises with size, which is the only honest reason to offer a bigger
 * pack. The old rungs are not deleted — see `LEGACY_STORE_OFFERS`.
 */
export const STORE_OFFERS: readonly z.infer<typeof StoreOffer>[] = [
  { productId: 'crd_starter_700', credits: 700, bonusCredits: 0, referencePriceUsd: 0.99, badge: null, tier: 'STARTER', firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_3800', credits: 3800, bonusCredits: 0, referencePriceUsd: 4.99, badge: 'Popular', tier: 'POPULAR', firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_8200', credits: 8200, bonusCredits: 0, referencePriceUsd: 9.99, badge: 'Best value', tier: 'BEST_VALUE', firstPurchaseOnly: false, expiresAt: null },
];

/**
 * Rungs we no longer show, kept so that money already in flight still lands.
 *
 * A player on an older build is looking at the old ladder right now, and a
 * StoreKit transaction can be redelivered days after it was made. Dropping
 * these from the lookup would take Apple's money and grant nothing — so they
 * stay resolvable forever, and only stop being *offered*.
 */
export const LEGACY_STORE_OFFERS: readonly z.infer<typeof StoreOffer>[] = [
  { productId: 'crd_2000', credits: 2000, bonusCredits: 0, referencePriceUsd: 2.89, badge: null, tier: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_10000', credits: 10000, bonusCredits: 300, referencePriceUsd: 14.49, badge: 'Popular', tier: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_20000', credits: 20000, bonusCredits: 1000, referencePriceUsd: 28.49, badge: null, tier: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_50000', credits: 50000, bonusCredits: 3500, referencePriceUsd: 71.0, badge: 'Best value', tier: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_100000', credits: 100000, bonusCredits: 10000, referencePriceUsd: 142.99, badge: null, tier: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_first_21000', credits: 21000, bonusCredits: 0, referencePriceUsd: 19.99, badge: 'First purchase', tier: null, firstPurchaseOnly: true, expiresAt: null },
];

/**
 * The first purchase, which is a different decision from every one after it.
 *
 * Same $0.99 product as the starter rung, with its credits doubled by
 * `bonusCredits`. That is a real doubling of a real pack rather than a
 * manufactured discount off a price nobody was going to pay — the player can
 * check it against the rung sitting directly below, and it survives §3.8's ban
 * on fake scarcity because nothing about it is fake and nothing expires.
 *
 * The point of purchase #1 is not the 99 cents. It is moving somebody from
 * "free player" to "payer", which is the threshold that predicts everything
 * after it.
 */
export const FIRST_PURCHASE_OFFER: z.infer<typeof StoreOffer> = {
  productId: 'crd_starter_700',
  credits: 700,
  bonusCredits: 700,
  referencePriceUsd: 0.99,
  badge: 'First purchase',
  tier: 'STARTER',
  firstPurchaseOnly: true,
  expiresAt: null,
};

/**
 * Every product we will ever honour, current or retired.
 *
 * One lookup for the grant path, so that adding a rung to the ladder can never
 * quietly become "we stopped crediting the old one".
 */
export function offerForProduct(productId: string): z.infer<typeof StoreOffer> | null {
  return (
    STORE_OFFERS.find((offer) => offer.productId === productId) ??
    LEGACY_STORE_OFFERS.find((offer) => offer.productId === productId) ??
    null
  );
}

/**
 * The extra credits a purchase earns for being the account's first.
 *
 * Decided here, from account state, rather than from which product was bought
 * — the starter rung and the first-purchase offer are deliberately the *same*
 * App Store product, so that a first-time buyer taps one $0.99 button and gets
 * double, and everybody else taps the same button and gets the pack. Encoding
 * the bonus in a second product id would mean two SKUs at one price and a way
 * for a returning buyer to claim the wrong one.
 *
 * Only the starter rung doubles. The bonus exists to make purchase #1 small and
 * obvious, not to discount the whole catalogue for whoever happens to arrive
 * with $9.99 in mind.
 */
export function firstPurchaseBonusFor(
  offer: z.infer<typeof StoreOffer>,
  alreadyPurchased: boolean,
): number {
  if (alreadyPurchased) return 0;
  if (offer.tier !== 'STARTER') return 0;
  return offer.credits;
}
