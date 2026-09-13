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
  })
  .strict();
export type WalletSummary = z.infer<typeof WalletSummary>;

export const StoreOffer = z
  .object({
    productId: z.string(),
    credits: z.number().int(),
    bonusCredits: z.number().int().default(0),
    /** Reference price only — the store is the source of truth at purchase. */
    referencePriceUsd: z.number(),
    badge: z.string().nullable().default(null),
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
export const FORK_COST_CREDITS = 120;
export const ANIMATION_COST_CREDITS = 600;

/**
 * The credit ladder, matched to the reference app the owner is benchmarking.
 *
 * ⚠️ `referencePriceUsd` is a **display fallback only** — what a player is
 * actually charged comes from StoreKit, which is the source of truth and shows
 * their local currency. Each `productId` below therefore needs a matching
 * consumable in App Store Connect, priced on one of Apple's price points. Some
 * of these figures (2.89, 71.00) are copied from an app that does not appear to
 * bill through Apple, so the nearest available point may differ by a few cents;
 * when it does, the store's number wins on screen and this one is only ever
 * seen before products load.
 */
export const STORE_OFFERS: readonly z.infer<typeof StoreOffer>[] = [
  { productId: 'crd_2000', credits: 2000, bonusCredits: 0, referencePriceUsd: 2.89, badge: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_10000', credits: 10000, bonusCredits: 300, referencePriceUsd: 14.49, badge: 'Popular', firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_20000', credits: 20000, bonusCredits: 1000, referencePriceUsd: 28.49, badge: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_50000', credits: 50000, bonusCredits: 3500, referencePriceUsd: 71.0, badge: 'Best value', firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_100000', credits: 100000, bonusCredits: 10000, referencePriceUsd: 142.99, badge: null, firstPurchaseOnly: false, expiresAt: null },
];

export const FIRST_PURCHASE_OFFER: z.infer<typeof StoreOffer> = {
  productId: 'crd_first_21000',
  credits: 21000,
  bonusCredits: 0,
  referencePriceUsd: 19.99,
  badge: 'First purchase',
  firstPurchaseOnly: true,
  expiresAt: null,
};
