/**
 * Relics on the server: who gets them, the roll, and the collection view.
 *
 * The storyteller reports moments; this file decides what they are worth. See
 * `packages/contracts/src/game/relics.ts` for the catalog and docs/relics.md
 * for the design.
 */
import { createHash, randomInt } from 'node:crypto';
import {
  RELICS,
  RELICS_BY_ID,
  RELIC_MOMENTS,
  momentsFor,
  rollMoment,
  type RelicDef,
  type RelicRarity,
  type RelicTiming,
} from '@plotbreak/contracts';
import type { Repository, RelicRollRow } from './repo/types.js';
import { resolveAssetUrl } from './projections.js';

/**
 * Off unless switched on. `PLOTBREAK_RELICS` is `all`, or a comma-separated
 * list of user ids, so the feature can run in production for one tester while
 * every other session's prompt stays byte-identical to what it was.
 */
export function relicsEnabledFor(userId: string, env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = (env.PLOTBREAK_RELICS ?? '').trim();
  if (!raw || raw === 'off') return false;
  if (raw === 'all') return true;
  // `50%`: a stable half of all players, so relics can be measured against the
  // half without them. Same bucket every time for the same player.
  const percent = /^(\d{1,3})%$/.exec(raw);
  if (percent) return relicBucket(userId) < Number(percent[1]);
  return raw.split(',').map((s) => s.trim()).includes(userId);
}

/**
 * Whether this app build can show relics. 1.0.8 is the first; an older build
 * would list the relic badges with no art and no vault behind them, so they
 * are hidden from it. Drops still happen for an older build and are waiting
 * in the vault when the player updates.
 */
export function clientShowsRelics(appVersion: string | string[] | undefined): boolean {
  const raw = Array.isArray(appVersion) ? appVersion[0] : appVersion;
  const parts = (raw ?? '').split('.').map((n) => Number.parseInt(n, 10));
  if (parts.length < 2 || parts.some(Number.isNaN)) return false;
  const [major = 0, minor = 0, patch = 0] = parts;
  return major > 1 || (major === 1 && (minor > 0 || patch >= 8));
}

/** 0..99, stable per player. Recompute this to split any chart by arm. */
export function relicBucket(userId: string): number {
  return createHash('sha256').update(`relics:${userId}`).digest().readUInt32BE(0) % 100;
}

/** The moments to offer the storyteller for this story, or undefined when there are none. */
export function storyMoments(storyId: string): { id: string; when: string }[] | undefined {
  const moments = momentsFor(storyId).map((m) => ({ id: m.id, when: m.when }));
  return moments.length ? moments : undefined;
}

export interface RelicDrop {
  readonly relicId: string;
  readonly name: string;
  readonly rarity: RelicRarity;
  readonly flavor: string;
  readonly imageUrl: string | null;
  readonly storyId: string;
  /** How many the player now holds, this one included. */
  readonly count: number;
}

/**
 * Rolls each reported moment once for this run and returns what dropped.
 *
 * A moment this run already rolled is skipped by the insert itself, so two
 * turns racing on the same moment cannot both roll. Empty rolls are recorded
 * too: the moment is spent either way, or a player could reroll by repeating it.
 */
export async function rollRelics(options: {
  readonly repo: Repository;
  readonly userId: string;
  readonly sessionId: string;
  readonly storyId: string;
  readonly turnIndex: number;
  readonly momentIds: readonly string[];
  /** Injected by tests. A number in [0, 1). */
  readonly random?: () => number;
}): Promise<RelicDrop[]> {
  const random = options.random ?? (() => randomInt(0, 1_000_000) / 1_000_000);
  // Testing only: every reported moment drops something, still weighted by the
  // authored odds. Never honoured in production.
  const always = process.env.PLOTBREAK_RELICS_ALWAYS === '1' && process.env.NODE_ENV !== 'production';
  const drops: RelicDrop[] = [];
  for (const momentId of options.momentIds) {
    const moment = RELIC_MOMENTS.find((m) => m.id === momentId && m.storyId === options.storyId);
    if (!moment) continue;
    const total = RELICS.filter((r) => r.momentId === momentId).reduce((sum, r) => sum + r.chance, 0);
    const relic = rollMoment(momentId, always ? random() * total : random());
    const recorded = await options.repo.recordRelicRoll({
      userId: options.userId,
      sessionId: options.sessionId,
      storyId: options.storyId,
      momentId,
      relicId: relic?.id ?? null,
      turnIndex: options.turnIndex,
      rolledAt: new Date().toISOString(),
    });
    if (!recorded || !relic) continue;
    const owned = (await options.repo.getRelicRolls(options.userId)).filter((r) => r.relicId === relic.id).length;
    drops.push(dropPayload(relic, owned));
  }
  return drops;
}

function dropPayload(relic: RelicDef, count: number): RelicDrop {
  return {
    relicId: relic.id,
    name: relic.name,
    rarity: relic.rarity,
    flavor: relic.flavor,
    imageUrl: resolveAssetUrl(relic.imageKey),
    storyId: relic.storyId,
    count,
  };
}

export interface CollectionEntry {
  readonly id: string;
  readonly storyId: string;
  readonly storyTitle: string;
  /** Hidden ("???") while a Mythic is locked. Everything else shows its name. */
  readonly name: string;
  readonly rarity: RelicRarity;
  /** Only once owned. The back of the card is the reward for finding it. */
  readonly flavor: string | null;
  readonly imageUrl: string | null;
  readonly owned: boolean;
  readonly count: number;
  readonly firstFoundAt: string | null;
  /** Drop chance when its moment happens, as a whole-number-ish percent. */
  readonly chancePercent: number;
  readonly timing: RelicTiming;
  readonly hint: string;
}

export interface CollectionResponse {
  readonly owned: number;
  readonly total: number;
  readonly stories: readonly { storyId: string; title: string; owned: number; total: number }[];
  readonly relics: readonly CollectionEntry[];
}

const RARITY_ORDER: Record<RelicRarity, number> = { MYTHIC: 0, LEGENDARY: 1, EPIC: 2, RARE: 3, COMMON: 4 };

/** Everything the vault screen needs, owned and locked, rarest first. */
export function buildCollection(
  rolls: readonly RelicRollRow[],
  titles: ReadonlyMap<string, string>,
): CollectionResponse {
  const found = new Map<string, { count: number; first: string }>();
  for (const roll of rolls) {
    if (!roll.relicId || !RELICS_BY_ID.has(roll.relicId)) continue;
    const prior = found.get(roll.relicId);
    found.set(roll.relicId, {
      count: (prior?.count ?? 0) + 1,
      first: prior && prior.first < roll.rolledAt ? prior.first : roll.rolledAt,
    });
  }

  const relics: CollectionEntry[] = [...RELICS]
    .sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])
    .map((relic) => {
      const mine = found.get(relic.id);
      const moment = RELIC_MOMENTS.find((m) => m.id === relic.momentId)!;
      return {
        id: relic.id,
        storyId: relic.storyId,
        storyTitle: titles.get(relic.storyId) ?? relic.storyId,
        name: mine || relic.rarity !== 'MYTHIC' ? relic.name : '???',
        rarity: relic.rarity,
        flavor: mine ? relic.flavor : null,
        imageUrl: resolveAssetUrl(relic.imageKey),
        owned: Boolean(mine),
        count: mine?.count ?? 0,
        firstFoundAt: mine?.first ?? null,
        chancePercent: Math.round(relic.chance * 1000) / 10,
        timing: moment.timing,
        hint: moment.hint,
      };
    });

  const storyIds = [...new Set(RELICS.map((r) => r.storyId))];
  return {
    owned: relics.filter((r) => r.owned).length,
    total: relics.length,
    stories: storyIds.map((storyId) => ({
      storyId,
      title: titles.get(storyId) ?? storyId,
      owned: relics.filter((r) => r.storyId === storyId && r.owned).length,
      total: relics.filter((r) => r.storyId === storyId).length,
    })),
    relics,
  };
}
