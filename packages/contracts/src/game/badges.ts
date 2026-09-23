import { z } from 'zod';

/**
 * What the player gets for playing.
 *
 * Definitions live in code rather than in a table because they are content:
 * they ship with releases, they need types, and an unlock condition is a
 * predicate, not a row. The database holds only what is true of a *person* —
 * progress, unlocked, claimed.
 *
 * ## What these deliberately do not reward
 *
 * Nothing here pays for spending money, for buying credits, for following
 * anybody, or for publishing. The one badge that is not about play is
 * `discord_hello`, and it is there on purpose: somebody in the community
 * server keeps coming back, so it pays for a person, not a click. The bot has
 * to see them post in the server before it unlocks. Those are the achievements that turn a product
 * into a chore list, and two of them describe features we have not built. Every
 * badge below says the same thing in a different way: **play more, go further,
 * try something else**.
 *
 * ## Why the rewards are small
 *
 * A VIVID turn costs 60. The set pays 2,150 — about thirty-six turns, spread
 * across behaviour that takes days to produce, and 1,000 of it is one badge:
 * `twenty_turns`, which exists to get somebody past the point where they know
 * whether they like this.
 *
 * The rest stay small on purpose. A reward large enough to substitute for the
 * economy stops being a reward and becomes the price, so the subsidy is spent
 * once, early, on the only thing worth buying — a second session.
 */
export const BadgeTier = z.enum(['BRONZE', 'SILVER', 'GOLD']);
export type BadgeTier = z.infer<typeof BadgeTier>;

export const Badge = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    /** One emoji. The UI draws it; there is no icon set to maintain. */
    icon: z.string(),
    tier: BadgeTier,
    /** How many of the thing. 1 for a badge that is simply done or not. */
    target: z.number().int().min(1),
    creditReward: z.number().int().min(0),
    /**
     * The fewest credits anybody could spend and still earn this.
     *
     * Authored rather than derived, because it is not a function of `target`:
     * thirty different days needs thirty turns, twenty finished runs needs
     * about two hundred, and fifty turns at Apex needs fifty turns at 195 each.
     * It exists so the one rule that matters is checkable — a badge must pay
     * less than the play it asks for, or it is not a reward, it is the price.
     */
    minimumCredits: z.number().int().min(0),
    /**
     * Hidden until earned.
     *
     * Only for badges whose text would spoil something — the rare ending is
     * the case. A locked list the player cannot work towards is a list of
     * things they are failing at, so almost nothing is hidden.
     */
    secret: z.boolean().default(false),
  })
  .strict();
export type Badge = z.infer<typeof Badge>;

/**
 * The set, in roughly the order a player meets them.
 *
 * Two groups. The first thirteen are reachable in a week and pay small; they
 * exist so there is always one in reach. The last five take months, and they
 * are where the real credits are — which is the only arrangement that is not
 * giving money away, because each is unreachable without having played far
 * more than it returns.
 */
export const BADGES: readonly Badge[] = [
  {
    id: 'first_break',
    title: 'First Break',
    description: 'Start your first world.',
    icon: '🚪',
    tier: 'BRONZE',
    target: 1,
    creditReward: 50,
    minimumCredits: 30,
    secret: false,
  },
  {
    id: 'say_anything',
    title: 'Say Anything',
    description: 'Type something of your own instead of tapping a card.',
    icon: '✍️',
    tier: 'BRONZE',
    target: 1,
    creditReward: 50,
    minimumCredits: 30,
    secret: false,
  },
  {
    id: 'ten_turns',
    title: 'Ten Turns',
    description: 'Play ten turns, anywhere.',
    icon: '🔟',
    tier: 'BRONZE',
    target: 10,
    creditReward: 50,
    minimumCredits: 300,
    secret: false,
  },
  {
    /**
     * The one badge that pays like a purchase.
     *
     * Everything else here is a gift; this is a deliberate subsidy of the
     * habit that decides whether somebody has a second session. Twenty turns
     * at Vivid costs 1,200, so 1,000 back makes the first twenty turns very
     * nearly free — which is the point, and is also why there is exactly one
     * of these and why it can only be claimed once.
     */
    id: 'twenty_turns',
    title: 'Twenty Turns',
    description: 'Play twenty turns. We will cover most of them.',
    icon: '⚡️',
    tier: 'SILVER',
    target: 20,
    creditReward: 1000,
    minimumCredits: 600,
    secret: false,
  },
  {
    id: 'back_for_more',
    title: 'Back For More',
    description: 'Return to a world you had left.',
    icon: '↩️',
    tier: 'BRONZE',
    target: 1,
    creditReward: 60,
    minimumCredits: 60,
    secret: false,
  },
  {
    id: 'ending_found',
    title: 'Ending Found',
    description: 'Reach an ending.',
    icon: '🎬',
    tier: 'SILVER',
    target: 1,
    creditReward: 100,
    minimumCredits: 300,
    secret: false,
  },
  {
    id: 'genre_hopper',
    title: 'Genre Hopper',
    description: 'Play worlds in three different genres.',
    icon: '🧭',
    tier: 'SILVER',
    target: 3,
    creditReward: 100,
    minimumCredits: 90,
    secret: false,
  },
  {
    id: 'three_day_run',
    title: 'Three Day Run',
    description: 'Play on three different days.',
    icon: '📅',
    tier: 'SILVER',
    target: 3,
    creditReward: 100,
    minimumCredits: 90,
    secret: false,
  },
  {
    id: 'world_hopper',
    title: 'World Hopper',
    description: 'Start five different worlds.',
    icon: '🗺️',
    tier: 'SILVER',
    target: 5,
    creditReward: 120,
    minimumCredits: 150,
    secret: false,
  },
  {
    id: 'deep_in',
    title: 'Deep In',
    description: 'Reach fifty turns in a single run.',
    icon: '🌊',
    tier: 'GOLD',
    target: 50,
    creditReward: 150,
    minimumCredits: 1500,
    secret: false,
  },
  {
    id: 'ending_hunter',
    title: 'Ending Hunter',
    description: 'Reach five different endings.',
    icon: '🏆',
    tier: 'GOLD',
    target: 5,
    creditReward: 200,
    minimumCredits: 1500,
    secret: false,
  },
  {
    id: 'long_night',
    title: 'Long Night',
    description: 'Play a hundred turns in one world.',
    icon: '🌙',
    tier: 'GOLD',
    target: 100,
    creditReward: 200,
    minimumCredits: 3000,
    secret: false,
  },
  /* ---------------------------------------------------------------------- */
  /* The long game.                                                          */
  /*                                                                         */
  /* Everything above is reachable in a week. These five are not, and that is */
  /* the point: each one is only paid for by play somebody has genuinely done,*/
  /* and the credits behind it cost far more than the badge returns. Two are  */
  /* gated on money without ever mentioning it — fifty turns at Apex is 9,750 */
  /* credits and a thousand turns is thirty thousand at the cheapest tier, so */
  /* neither is reachable on daily grants inside a year.                      */
  /*                                                                         */
  /* Deliberately different *kinds* of hard, so they cannot all land on the   */
  /* same afternoon: one needs depth in a single run, one needs breadth, one  */
  /* needs the calendar, and the calendar cannot be rushed at any price.      */
  /* ---------------------------------------------------------------------- */
  {
    id: 'apex_run',
    title: 'No Expense Spared',
    description: 'Play fifty turns at the very highest quality.',
    icon: '👑',
    tier: 'GOLD',
    target: 50,
    creditReward: 2500,
    // Fifty Apex turns is 9,750. There is no cheaper path to this one.
    minimumCredits: 9750,
    secret: false,
  },
  {
    id: 'one_world_deep',
    title: 'Three Hundred',
    description: 'Reach three hundred turns inside a single world.',
    icon: '🕯️',
    tier: 'GOLD',
    target: 300,
    creditReward: 2500,
    minimumCredits: 9000,
    secret: false,
  },
  {
    id: 'ending_collector',
    title: 'Completionist',
    description: 'Finish twenty separate runs.',
    icon: '🗝️',
    tier: 'GOLD',
    target: 20,
    creditReward: 2500,
    // An ending cannot be offered before turn ten, so twenty runs is two
    // hundred turns at the absolute floor.
    minimumCredits: 6000,
    secret: false,
  },
  {
    id: 'month_of_nights',
    title: 'Thirty Nights',
    description: 'Play on thirty different days.',
    icon: '🌗',
    tier: 'GOLD',
    target: 30,
    creditReward: 800,
    minimumCredits: 900,
    secret: false,
  },
  {
    id: 'marathon',
    title: 'One Thousand',
    description: 'Play a thousand turns.',
    icon: '🜲',
    tier: 'GOLD',
    target: 1000,
    creditReward: 5000,
    minimumCredits: 30000,
    secret: false,
  },
  {
    id: 'rare_ending',
    title: 'Rare Ending',
    description: 'Find an ending almost nobody finds.',
    icon: '💎',
    tier: 'GOLD',
    target: 1,
    creditReward: 250,
    minimumCredits: 300,
    // The only hidden one: naming it would say there is something to look for
    // and roughly where.
    secret: true,
  },
  {
    id: 'discord_hello',
    title: 'Say Hi on Discord',
    description: 'Join the Plotbreak Discord and post your code there.',
    icon: '💬',
    tier: 'BRONZE',
    target: 1,
    creditReward: 250,
    // Costs no play at all. Allowed because it is a welcome gift under the
    // SERIOUS_MONEY line, and the bot refuses new and already-used Discord accounts.
    minimumCredits: 0,
    secret: false,
  },
];

export const BADGES_BY_ID: ReadonlyMap<string, Badge> = new Map(BADGES.map((b) => [b.id, b]));

/** What a player has done, in the units the badges count. */
export const BadgeProgress = z
  .object({
    badgeId: z.string(),
    progress: z.number().int().min(0),
    target: z.number().int().min(1),
    unlockedAt: z.string().nullable(),
    claimedAt: z.string().nullable(),
  })
  .strict();
export type BadgeProgress = z.infer<typeof BadgeProgress>;
