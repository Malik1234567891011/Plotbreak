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

/** The UTC day, the same boundary the daily claim uses. */
export function towerDay(now: Date): string {
  return now.toISOString().slice(0, 10);
}

export function isFreeDay(day: string): boolean {
  return new Date(`${day}T12:00:00Z`).getUTCDay() === FREE_WEEKDAY;
}

function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function nextDay(now: Date): Date {
  const d = new Date(now);
  d.setUTCHours(24, 0, 0, 0);
  return d;
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
  constructor(readonly code: 'BAD_INPUTS' | 'NOT_FOUND' | 'INSUFFICIENT_CREDITS' | 'NOT_TODAY' | 'NOT_OWNED', message: string) {
    super(message);
  }
}

export interface TowerStatusView {
  day: string;
  free: boolean;
  fee: number;
  balance: number;
  best: number;
  today: null | { runId: string; finished: boolean; fellOn: number; cleared: boolean; reward: number; streak: number };
  nextAt: string;
  enabled: boolean;
  maxReward: number;
  /** Days in a row so far, and the bonus today's climb gets (or got). `alive` false: yesterday was missed. */
  streak: { days: number; todayBonusPercent: number; alive: boolean };
  modifier: string;
  practice: { earnedToday: number; cap: number };
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

  /** Days in a row with a daily climb, counting today if it was played. */
  async streak(userId: string, today: string): Promise<{ days: number; playedToday: boolean; alive: boolean }> {
    const set = new Set(await this.repo.listTowerDays(userId, 40));
    const playedToday = set.has(today);
    let cursor = playedToday ? today : addDays(today, -1);
    let n = 0;
    while (set.has(cursor)) { n += 1; cursor = addDays(cursor, -1); }
    return { days: n, playedToday, alive: n > 0 };
  }

  async status(userId: string): Promise<TowerStatusView> {
    const now = this.now();
    const day = towerDay(now);
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
        ? { runId: run.runId, finished: !!run.finishedAt, fellOn: run.fellOn ?? run.lastFloor, cleared: !!run.cleared, reward: run.reward ?? 0, streak: run.streak }
        : null,
      nextAt: nextDay(now).toISOString(),
      enabled: true,
      maxReward: payoutWithStreak(FLOORS, true, todayStreak),
      streak: { days: streak.days, todayBonusPercent: streakBonusPercent(todayStreak), alive: streak.alive },
      modifier: dailyTower(day).modifier,
      practice: { earnedToday: await this.repo.practiceCreditsOn(userId, day), cap: PRACTICE_DAILY_CAP },
      characters: {
        owned: [DEFAULT_CHARACTER, ...owned.filter((c) => c !== DEFAULT_CHARACTER)],
        selected: selected && (selected === DEFAULT_CHARACTER || owned.includes(selected)) ? selected : DEFAULT_CHARACTER,
      },
    };
  }

  /** Starts today's run, or hands back the one already started. Charges the entry once. */
  async start(userId: string, appVersion: string | null): Promise<{
    runId: string; seed: number; day: string; fee: number; balance: number; resumed: boolean; streak: number; characterId: string;
  }> {
    const day = towerDay(this.now());
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
    const row = this.#newRow(userId, day, fee, free, false, streak, appVersion, await this.#character(userId));
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
  async startPractice(userId: string, appVersion: string | null): Promise<{
    runId: string; seed: number; day: string; remaining: number; characterId: string;
  }> {
    const day = towerDay(this.now());
    const row = this.#newRow(userId, day, 0, true, true, 0, appVersion, await this.#character(userId));
    await this.repo.insertTowerRun(row);
    const earned = await this.repo.practiceCreditsOn(userId, day);
    return { runId: row.runId, seed: row.seed, day, remaining: Math.max(0, PRACTICE_DAILY_CAP - earned), characterId: row.characterId ?? DEFAULT_CHARACTER };
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
    const status = await this.status(userId);
    return { owned: status.characters.owned, selected: status.characters.selected, balance: status.balance };
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
      resumed, streak: run.streak, characterId: run.characterId ?? DEFAULT_CHARACTER,
    };
  }

  async #character(userId: string): Promise<string> {
    const selected = await this.repo.getSelectedTowerCharacter(userId);
    return selected ?? DEFAULT_CHARACTER;
  }

  #newRow(userId: string, day: string, fee: number, free: boolean, practice: boolean, streak: number, appVersion: string | null, characterId: string): TowerRunRow {
    const now = this.now().toISOString();
    return {
      // A fresh secret seed per run: nobody can work out a run's attacks in advance.
      runId: `tower_${randomUUID()}`, userId, day, seed: this.newSeed(), fee, free,
      startedAt: now, lastSeenAt: now, finishedAt: null, lastFloor: 1,
      fellOn: null, cleared: null, reward: null, abandoned: false, suspicious: false, ticks: null, realMs: null,
      appVersion, boons: null, floors: null, inputs: null,
      practice, streak, modifier: dailyTower(day).modifier, characterId,
    };
  }

  async #settle(run: TowerRunRow, inputs: Input[], abandoned: boolean, realMs: number): Promise<Omit<FinishView, 'balance' | 'best' | 'newBest' | 'practice'>> {
    const result = replay(run.seed, inputs, dailyTower(run.day));
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
      const cleared = result.cleared ? FLOORS : Math.max(0, fellOn - 1);
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
