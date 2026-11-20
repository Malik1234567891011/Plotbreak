/**
 * The Tower on the server: one daily run per player per UTC day, an entry fee,
 * a streak bonus, unlimited practice that pays a little, and characters bought
 * with credits. Payouts come from replaying the run's inputs through the same
 * deterministic sim the app runs; the app's claim of how far it got is never
 * trusted. See docs/tower.md.
 */
import { createHash, randomInt, randomUUID } from 'node:crypto';
import {
  CHARACTERS_BY_ID, DEFAULT_CHARACTER, ENTRY_FEE, FLOORS, FREE_WEEKDAY, PRACTICE_DAILY_CAP, PRACTICE_PER_FLOOR, TPS,
  dailyTower, lateTapSpread, payoutFor, payoutWithStreak, replay, streakBonusPercent, type Input,
} from '@plotbreak/tower';
import type { Repository, TowerRunRow } from './repo/types.js';
import { InsufficientCreditsError, type WalletService } from './wallet.js';

/**
 * Off unless switched on. `PLOTBREAK_TOWER` is `all`, `N%` (a stable share of
 * players, so its effect on retention can be measured against the rest), or a
 * comma-separated list of user ids.
 */
export function towerEnabledFor(userId: string, env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = (env.PLOTBREAK_TOWER ?? '').trim();
  if (!raw || raw === 'off') return false;
  if (raw === 'all') return true;
  const percent = /^(\d{1,3})%$/.exec(raw);
  if (percent) return towerBucket(userId) < Number(percent[1]);
  return raw.split(',').map((s) => s.trim()).includes(userId);
}

/** 0..99, stable per player. Recompute this to split any chart by who had the Tower. */
export function towerBucket(userId: string): number {
  return createHash('sha256').update(`tower:${userId}`).digest().readUInt32BE(0) % 100;
}

/** The UTC day. Only a fallback now: each player's day ends at their own midnight. */
export function towerDay(now: Date): string {
  return now.toISOString().slice(0, 10);
}

/** True for a real IANA zone name ("America/New_York"). */
export function validTimezone(tz: unknown): tz is string {
  if (typeof tz !== 'string' || tz.length > 64 || !/^[A-Za-z0-9_+\-/]+$/.test(tz)) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** The calendar day (YYYY-MM-DD) it is in `tz` at `now`. */
export function localDay(now: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Milliseconds `tz` is ahead of UTC at `at`. */
function zoneOffset(at: number, tz: string): number {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(new Date(at)).map((x) => [x.type, x.value]),
  );
  return Date.UTC(+p.year!, +p.month! - 1, +p.day!, +p.hour!, +p.minute!, +p.second!) - Math.floor(at / 1000) * 1000;
}

/** The instant the next day starts in `tz`. */
export function nextLocalMidnight(now: Date, tz: string): Date {
  const guess = Date.parse(`${addDays(localDay(now, tz), 1)}T00:00:00Z`);
  let at = guess - zoneOffset(guess, tz);
  at = guess - zoneOffset(at, tz);
  return new Date(at);
}

/** A player may move their reset to a new time zone at most once a week. */
const TZ_CHANGE_EVERY_MS = 7 * 24 * 3600 * 1000;
/** What reviving a dead streak costs, by how many days it has been dead. */
export const REVIVE_COSTS: readonly number[] = [5, 20, 50];

export function isFreeDay(day: string): boolean {
  return new Date(`${day}T12:00:00Z`).getUTCDay() === FREE_WEEKDAY;
}

function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}


const MAX_INPUTS = 20_000;
/**
 * The spread (standard deviation, ticks) of parry timing on floors 16+ below
 * which a run is treated as scripted. Simulated experts with phone jitter
 * never go under 1.4; a program that knows the sim sits near 0.
 */
const MIN_HUMAN_SPREAD = 0.6;

/** Throws on anything that is not a well-formed, tick-ordered input log. */
export function parseInputs(raw: unknown): Input[] {
  if (!Array.isArray(raw)) throw new TowerError('BAD_INPUTS', 'inputs must be an array');
  if (raw.length > MAX_INPUTS) throw new TowerError('BAD_INPUTS', 'too many inputs');
  const out: Input[] = [];
  let last = 0;
  for (const x of raw) {
    const t = (x as { t?: unknown })?.t;
    const k = (x as { k?: unknown })?.k;
    const v = (x as { v?: unknown })?.v;
    if (typeof t !== 'number' || !Number.isInteger(t) || t < 0 || t < last) throw new TowerError('BAD_INPUTS', 'bad tick');
    if (k !== 'tap' && k !== 'dodge' && k !== 'pick') throw new TowerError('BAD_INPUTS', 'bad kind');
    if (k === 'pick' && (typeof v !== 'number' || !Number.isInteger(v) || v < 0 || v > 2)) throw new TowerError('BAD_INPUTS', 'bad pick');
    out.push(k === 'pick' ? { t, k, v: v as number } : { t, k });
    last = t;
  }
  return out;
}

export class TowerError extends Error {
  constructor(readonly code: 'BAD_INPUTS' | 'NOT_FOUND' | 'INSUFFICIENT_CREDITS' | 'NOT_TODAY' | 'NOT_OWNED' | 'NO_REVIVE' | 'BAD_FLOOR', message: string) {
    super(message);
  }
}

export interface TowerStatusView {
  day: string;
  free: boolean;
  fee: number;
  balance: number;
  best: number;
  today: null | {
    runId: string; finished: boolean; fellOn: number; cleared: boolean; reward: number; streak: number;
    /** Percent of today's finished climbs that ended lower (null until enough people have climbed). */
    beat: number | null;
  };
  nextAt: string;
  enabled: boolean;
  maxReward: number;
  /** Days in a row so far, and the bonus today's climb gets (or got). `alive` false: yesterday was missed. */
  streak: { days: number; todayBonusPercent: number; alive: boolean };
  /** A dead streak that can still be bought back, until today ends. */
  revive: null | { days: number; cost: number; nextCost: number | null };
  modifier: string;
  /** Practice can start on any floor up to `maxFloor` (the best floor reached). */
  practice: { earnedToday: number; cap: number; maxFloor: number };
  timezone: string;
  characters: { owned: string[]; selected: string };
}

export interface FinishView {
  fellOn: number;
  cleared: boolean;
  reward: number;
  /** The payout before the streak bonus. */
  base: number;
  streak: number;
  bonusPercent: number;
  balance: number;
  best: number;
  newBest: boolean;
  practice: boolean;
}

export class TowerService {
  constructor(
    private readonly repo: Repository,
    private readonly wallet: WalletService,
    private readonly now: () => Date = () => new Date(),
    /** Tests pin it; production draws a fresh secret seed per run. */
    private readonly newSeed: () => number = () => randomInt(1, 2 ** 31),
  ) {}

  /** The player's day and when it ends, in their own time zone (UTC until the app has said). */
  async clock(userId: string, tzHint?: unknown): Promise<{ day: string; nextAt: Date; tz: string }> {
    const now = this.now();
    let tz = (await this.repo.getTowerTimezone(userId))?.tz ?? null;
    if (validTimezone(tzHint) && tzHint !== tz) {
      const stored = await this.repo.getTowerTimezone(userId);
      if (!stored || now.getTime() - new Date(stored.changedAt).getTime() >= TZ_CHANGE_EVERY_MS) {
        await this.repo.setTowerTimezone(userId, tzHint, now.toISOString());
        tz = tzHint;
      }
    }
    const zone = tz ?? 'UTC';
    return { day: localDay(now, zone), nextAt: nextLocalMidnight(now, zone), tz: zone };
  }

  /**
   * Days in a row with a daily climb, counting today if it was played. Days
   * bridged by a revive keep the chain alive without adding to it.
   */
  async streak(userId: string, today: string): Promise<{
    days: number; playedToday: boolean; alive: boolean; revive: { days: number; cost: number; nextCost: number | null; missed: string[] } | null;
  }> {
    const played = new Set(await this.repo.listTowerDays(userId, 60));
    const bridged = new Set(await this.repo.listTowerBridges(userId, 60));
    const count = (from: string) => {
      let cursor = from, n = 0;
      while (played.has(cursor) || bridged.has(cursor)) { if (played.has(cursor)) n += 1; cursor = addDays(cursor, -1); }
      return n;
    };
    const playedToday = played.has(today);
    const yesterday = addDays(today, -1);
    const days = count(playedToday ? today : yesterday);
    const alive = days > 0 && (playedToday || played.has(yesterday) || bridged.has(yesterday));
    let revive: { days: number; cost: number; nextCost: number | null; missed: string[] } | null = null;
    if (!alive && !playedToday) {
      // Dead for 1, 2 or 3 days: buy back the missed days at 5, 20 or 50.
      const missed: string[] = [];
      let cursor = yesterday;
      while (missed.length <= REVIVE_COSTS.length && !played.has(cursor) && !bridged.has(cursor)) { missed.push(cursor); cursor = addDays(cursor, -1); }
      const lost = played.has(cursor) ? count(cursor) : 0;
      if (lost > 0 && missed.length >= 1 && missed.length <= REVIVE_COSTS.length) {
        revive = { days: lost, cost: REVIVE_COSTS[missed.length - 1]!, nextCost: REVIVE_COSTS[missed.length] ?? null, missed };
      }
    }
    return { days: alive ? days : 0, playedToday, alive, revive };
  }

  /** Buys back a dead streak, before today's climb. */
  async revive(userId: string, tzHint?: unknown): Promise<{ days: number; cost: number; balance: number }> {
    const { day } = await this.clock(userId, tzHint);
    const s = await this.streak(userId, day);
    if (!s.revive) throw new TowerError('NO_REVIVE', 'There’s no streak to revive today.');
    const balance = await this.wallet.getBalance(userId);
    if (balance < s.revive.cost) throw new InsufficientCreditsError(s.revive.cost, balance);
    await this.wallet.grant(userId, 'TOWER_REVIVE', -s.revive.cost, `tower:revive:${userId}:${day}`, { missed: s.revive.missed, days: s.revive.days });
    await this.repo.addTowerBridges(userId, s.revive.missed, s.revive.cost, this.now().toISOString());
    return { days: s.revive.days, cost: s.revive.cost, balance: await this.wallet.getBalance(userId) };
  }

  async status(userId: string, tzHint?: unknown): Promise<TowerStatusView> {
    const { day, nextAt, tz } = await this.clock(userId, tzHint);
    await this.settleStale(userId, day);
    const run = await this.repo.getTowerRun(userId, day);
    const free = isFreeDay(day);
    const streak = await this.streak(userId, day);
    const todayStreak = streak.playedToday ? streak.days : streak.days + 1;
    const owned = await this.repo.getTowerCharacters(userId);
    const selected = await this.repo.getSelectedTowerCharacter(userId);
    return {
      day,
      free,
      fee: free ? 0 : ENTRY_FEE,
      balance: await this.wallet.getBalance(userId),
      best: await this.repo.bestTowerFloor(userId),
      today: run
        ? {
          runId: run.runId, finished: !!run.finishedAt, fellOn: run.fellOn ?? run.lastFloor, cleared: !!run.cleared, reward: run.reward ?? 0, streak: run.streak,
          beat: run.finishedAt ? await this.#beat(day, run.cleared ? 31 : run.fellOn ?? 1) : null,
        }
        : null,
      nextAt: nextAt.toISOString(),
      enabled: true,
      maxReward: payoutWithStreak(FLOORS, true, todayStreak),
      streak: { days: streak.days, todayBonusPercent: streakBonusPercent(todayStreak), alive: streak.alive },
      revive: streak.revive ? { days: streak.revive.days, cost: streak.revive.cost, nextCost: streak.revive.nextCost } : null,
      modifier: dailyTower(day).modifier,
      practice: { earnedToday: await this.repo.practiceCreditsOn(userId, day), cap: PRACTICE_DAILY_CAP, maxFloor: Math.max(1, Math.min(FLOORS, await this.repo.bestTowerFloor(userId))) },
      timezone: tz,
      characters: {
        owned: [DEFAULT_CHARACTER, ...owned.filter((c) => c !== DEFAULT_CHARACTER)],
        selected: selected && (selected === DEFAULT_CHARACTER || owned.includes(selected)) ? selected : DEFAULT_CHARACTER,
      },
    };
  }

  /** Starts today's run, or hands back the one already started. Charges the entry once. */
  async start(userId: string, appVersion: string | null, tzHint?: unknown): Promise<{
    runId: string; seed: number; day: string; fee: number; balance: number; resumed: boolean; streak: number; characterId: string; startFloor: number;
  }> {
    const { day } = await this.clock(userId, tzHint);
    const existing = await this.repo.getTowerRun(userId, day);
    if (existing) {
      if (existing.finishedAt) throw new TowerError('NOT_TODAY', 'Today’s climb is done. Come back tomorrow.');
      return this.#started(existing, 0, true);
    }
    const free = isFreeDay(day);
    const fee = free ? 0 : ENTRY_FEE;
    const balance = await this.wallet.getBalance(userId);
    if (balance < fee) throw new InsufficientCreditsError(fee, balance);
    const streak = (await this.streak(userId, day)).days + 1;
    const row = this.#newRow(userId, day, fee, free, false, streak, appVersion, await this.#character(userId), 1);
    if (!(await this.repo.insertTowerRun(row))) {
      // Lost a race with a second tap: the other request's run is the run.
      return this.#started((await this.repo.getTowerRun(userId, day))!, 0, true);
    }
    if (fee > 0) {
      await this.wallet.grant(userId, 'TOWER_ENTRY', -fee, `tower:entry:${userId}:${day}`, { runId: row.runId, day });
    }
    return this.#started(row, fee, false);
  }

  /** A practice climb: free, unlimited, pays 1 credit a floor up to the daily cap. */
  async startPractice(userId: string, appVersion: string | null, floor = 1, tzHint?: unknown): Promise<{
    runId: string; seed: number; day: string; remaining: number; characterId: string; startFloor: number;
  }> {
    const { day } = await this.clock(userId, tzHint);
    const max = Math.max(1, Math.min(FLOORS, await this.repo.bestTowerFloor(userId)));
    const startFloor = Math.trunc(floor) || 1;
    if (startFloor < 1 || startFloor > max) throw new TowerError('BAD_FLOOR', `You can practise from floor 1 to ${max}.`);
    const row = this.#newRow(userId, day, 0, true, true, 0, appVersion, await this.#character(userId), startFloor);
    await this.repo.insertTowerRun(row);
    const earned = await this.repo.practiceCreditsOn(userId, day);
    return { runId: row.runId, seed: row.seed, day, remaining: Math.max(0, PRACTICE_DAILY_CAP - earned), characterId: row.characterId ?? DEFAULT_CHARACTER, startFloor };
  }

  async checkpoint(userId: string, runId: string, rawInputs: unknown, floor: number): Promise<void> {
    const run = await this.#own(userId, runId);
    if (run.finishedAt || run.practice) return;
    const inputs = parseInputs(rawInputs);
    await this.repo.checkpointTowerRun(runId, inputs, Math.max(1, Math.min(FLOORS, Math.trunc(floor) || 1)), this.now().toISOString());
  }

  async finish(userId: string, runId: string, rawInputs: unknown, realMs: number): Promise<FinishView> {
    const run = await this.#own(userId, runId);
    const before = await this.repo.bestTowerFloor(userId);
    if (run.finishedAt) {
      const base = run.practice ? run.reward ?? 0 : payoutFor(run.fellOn ?? 1, !!run.cleared);
      return {
        fellOn: run.fellOn ?? 1, cleared: !!run.cleared, reward: run.reward ?? 0, base, streak: run.streak,
        bonusPercent: run.practice ? 0 : streakBonusPercent(run.streak),
        balance: await this.wallet.getBalance(userId), best: before, newBest: false, practice: run.practice,
      };
    }
    const inputs = parseInputs(rawInputs);
    const settled = await this.#settle(run, inputs, false, Math.max(0, Math.trunc(realMs) || 0));
    const best = await this.repo.bestTowerFloor(userId);
    return { ...settled, balance: await this.wallet.getBalance(userId), best, newBest: !run.practice && best > before, practice: run.practice };
  }

  /** Buys a character for its price in credits and puts it in use. Owning it already is free. */
  async buyCharacter(userId: string, characterId: string): Promise<{ owned: string[]; selected: string; balance: number }> {
    const def = CHARACTERS_BY_ID[characterId];
    if (!def) throw new TowerError('NOT_FOUND', 'No such character.');
    const owned = await this.repo.getTowerCharacters(userId);
    if (def.price > 0 && !owned.includes(characterId)) {
      const balance = await this.wallet.getBalance(userId);
      if (balance < def.price) throw new InsufficientCreditsError(def.price, balance);
      if (await this.repo.addTowerCharacter(userId, characterId, this.now().toISOString())) {
        await this.wallet.grant(userId, 'TOWER_UNLOCK', -def.price, `tower:character:${userId}:${characterId}`, { characterId });
      }
    }
    await this.repo.setSelectedTowerCharacter(userId, characterId, this.now().toISOString());
    const owned2 = await this.repo.getTowerCharacters(userId);
    return { owned: [DEFAULT_CHARACTER, ...owned2.filter((c) => c !== DEFAULT_CHARACTER)], selected: characterId, balance: await this.wallet.getBalance(userId) };
  }

  async selectCharacter(userId: string, characterId: string): Promise<{ selected: string }> {
    const def = CHARACTERS_BY_ID[characterId];
    if (!def) throw new TowerError('NOT_FOUND', 'No such character.');
    if (def.price > 0 && !(await this.repo.getTowerCharacters(userId)).includes(characterId)) {
      throw new TowerError('NOT_OWNED', 'Buy this character first.');
    }
    await this.repo.setSelectedTowerCharacter(userId, characterId, this.now().toISOString());
    return { selected: characterId };
  }

  /** Daily runs from earlier days the app never finished are paid at the floor their last checkpoint reaches. */
  async settleStale(userId: string, today: string): Promise<void> {
    for (const run of await this.repo.listUnfinishedTowerRuns(userId, today)) {
      let inputs: Input[] = [];
      try { inputs = parseInputs(run.inputs ?? []); } catch { inputs = []; }
      await this.#settle(run, inputs, true, 0);
    }
  }

  async #started(run: TowerRunRow, fee: number, resumed: boolean) {
    return {
      runId: run.runId, seed: run.seed, day: run.day, fee, balance: await this.wallet.getBalance(run.userId),
      resumed, streak: run.streak, characterId: run.characterId ?? DEFAULT_CHARACTER, startFloor: run.startFloor,
    };
  }

  /** "Higher than N% of today's climbers": only said once there are enough climbers for it to mean something. */
  async #beat(day: string, reached: number): Promise<number | null> {
    const { total, below } = await this.repo.towerStandings(day, reached);
    return total >= 10 ? Math.round((below / total) * 100) : null;
  }

  async #character(userId: string): Promise<string> {
    const selected = await this.repo.getSelectedTowerCharacter(userId);
    return selected ?? DEFAULT_CHARACTER;
  }

  #newRow(userId: string, day: string, fee: number, free: boolean, practice: boolean, streak: number, appVersion: string | null, characterId: string, startFloor: number): TowerRunRow {
    const now = this.now().toISOString();
    return {
      // A fresh secret seed per run: nobody can work out a run's attacks in advance.
      runId: `tower_${randomUUID()}`, userId, day, seed: this.newSeed(), fee, free,
      startedAt: now, lastSeenAt: now, finishedAt: null, lastFloor: 1,
      fellOn: null, cleared: null, reward: null, abandoned: false, suspicious: false, ticks: null, realMs: null,
      appVersion, boons: null, floors: null, inputs: null,
      practice, streak, modifier: dailyTower(day).modifier, characterId, startFloor,
    };
  }

  async #settle(run: TowerRunRow, inputs: Input[], abandoned: boolean, realMs: number): Promise<Omit<FinishView, 'balance' | 'best' | 'newBest' | 'practice'>> {
    const result = replay(run.seed, inputs, dailyTower(run.day), run.startFloor);
    const fellOn = result.cleared ? FLOORS : result.fellOn;
    // A run can't be played faster than the sim's own clock, and a thumb on
    // glass is never perfectly consistent; a script that knows the sim is.
    const lastTick = inputs.length ? inputs[inputs.length - 1]!.t : 0;
    const wallMs = this.now().getTime() - new Date(run.startedAt).getTime();
    const spread = lateTapSpread(result);
    const suspicious = (!abandoned && wallMs + 15_000 < (lastTick / TPS) * 1000) || (spread !== null && spread < MIN_HUMAN_SPREAD);

    let base: number;
    let reward: number;
    if (run.practice) {
      const cleared = result.cleared ? FLOORS - run.startFloor + 1 : Math.max(0, fellOn - run.startFloor);
      const remaining = Math.max(0, PRACTICE_DAILY_CAP - (await this.repo.practiceCreditsOn(run.userId, run.day)));
      base = Math.min(remaining, cleared * PRACTICE_PER_FLOOR);
      reward = suspicious ? 0 : base;
    } else {
      base = payoutFor(fellOn, result.cleared);
      reward = suspicious ? payoutFor(1, false) : payoutWithStreak(fellOn, result.cleared, run.streak);
    }
    const finished = await this.repo.finishTowerRun(run.runId, {
      finishedAt: this.now().toISOString(),
      fellOn,
      cleared: result.cleared,
      reward,
      abandoned,
      suspicious,
      ticks: result.ticks,
      realMs: realMs || null,
      boons: result.boons,
      floors: result.floors,
      inputs,
      lastFloor: fellOn,
    });
    if (finished && reward > 0) {
      await this.wallet.grant(run.userId, 'TOWER_REWARD', reward, `tower:reward:${run.runId}`, {
        runId: run.runId, fellOn, cleared: result.cleared, practice: run.practice, streak: run.streak,
      });
    }
    return { fellOn, cleared: result.cleared, reward, base, streak: run.streak, bonusPercent: run.practice ? 0 : streakBonusPercent(run.streak) };
  }

  async #own(userId: string, runId: string): Promise<TowerRunRow> {
    const run = await this.repo.getTowerRunById(runId);
    if (!run || run.userId !== userId) throw new TowerError('NOT_FOUND', 'No such run.');
    return run;
  }
}
