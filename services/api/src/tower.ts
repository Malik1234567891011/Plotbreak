/**
 * The Tower on the server: one run per player per UTC day, an entry fee, and a
 * payout the server works out itself by replaying the run's inputs through the
 * same deterministic sim the app runs. The app's claim of how far it got is
 * never trusted. See docs/tower.md.
 */
import { createHash, randomInt, randomUUID } from 'node:crypto';
import { ENTRY_FEE, FLOORS, FREE_WEEKDAY, TPS, lateTapSpread, payoutFor, replay, type Input } from '@plotbreak/tower';
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

function nextDay(now: Date): Date {
  const d = new Date(now);
  d.setUTCHours(24, 0, 0, 0);
  return d;
}

const MAX_INPUTS = 20_000;
/**
 * Mean distance from dead-centre (ticks) on floors 16+ below which a run is
 * treated as scripted. Simulated experts with phone jitter never go under 1.2.
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
  constructor(readonly code: 'BAD_INPUTS' | 'NOT_FOUND' | 'INSUFFICIENT_CREDITS' | 'NOT_TODAY', message: string) {
    super(message);
  }
}

export interface TowerStatusView {
  day: string;
  free: boolean;
  fee: number;
  balance: number;
  best: number;
  today: null | { runId: string; finished: boolean; fellOn: number; cleared: boolean; reward: number };
  nextAt: string;
  enabled: boolean;
  /** The ladder, so the app's Discover card and the page agree without shipping a copy. */
  maxReward: number;
}

export class TowerService {
  constructor(
    private readonly repo: Repository,
    private readonly wallet: WalletService,
    private readonly now: () => Date = () => new Date(),
    /** Tests pin it; production draws a fresh secret seed per run. */
    private readonly newSeed: () => number = () => randomInt(1, 2 ** 31),
  ) {}

  async status(userId: string): Promise<TowerStatusView> {
    const now = this.now();
    const day = towerDay(now);
    await this.settleStale(userId, day);
    const run = await this.repo.getTowerRun(userId, day);
    const free = isFreeDay(day);
    return {
      day,
      free,
      fee: free ? 0 : ENTRY_FEE,
      balance: await this.wallet.getBalance(userId),
      best: await this.repo.bestTowerFloor(userId),
      today: run
        ? { runId: run.runId, finished: !!run.finishedAt, fellOn: run.fellOn ?? run.lastFloor, cleared: !!run.cleared, reward: run.reward ?? 0 }
        : null,
      nextAt: nextDay(now).toISOString(),
      enabled: true,
      maxReward: payoutFor(FLOORS, true),
    };
  }

  /** Starts today's run, or hands back the one already started. Charges the entry once. */
  async start(userId: string, appVersion: string | null): Promise<{ runId: string; seed: number; fee: number; balance: number; resumed: boolean }> {
    const now = this.now();
    const day = towerDay(now);
    const existing = await this.repo.getTowerRun(userId, day);
    if (existing) {
      if (existing.finishedAt) throw new TowerError('NOT_TODAY', 'Today’s climb is done. Come back tomorrow.');
      return { runId: existing.runId, seed: existing.seed, fee: 0, balance: await this.wallet.getBalance(userId), resumed: true };
    }
    const free = isFreeDay(day);
    const fee = free ? 0 : ENTRY_FEE;
    const balance = await this.wallet.getBalance(userId);
    if (balance < fee) throw new InsufficientCreditsError(fee, balance);
    const row: TowerRunRow = {
      // A fresh secret seed per run: nobody can work out a day's tower in advance.
      runId: `tower_${randomUUID()}`, userId, day, seed: this.newSeed(), fee, free,
      startedAt: now.toISOString(), lastSeenAt: now.toISOString(), finishedAt: null, lastFloor: 1,
      fellOn: null, cleared: null, reward: null, abandoned: false, suspicious: false, ticks: null, realMs: null,
      appVersion, boons: null, floors: null, inputs: null,
    };
    if (!(await this.repo.insertTowerRun(row))) {
      // Lost a race with a second tap: the other request's run is the run.
      const won = (await this.repo.getTowerRun(userId, day))!;
      return { runId: won.runId, seed: won.seed, fee: 0, balance: await this.wallet.getBalance(userId), resumed: true };
    }
    if (fee > 0) {
      await this.wallet.grant(userId, 'TOWER_ENTRY', -fee, `tower:entry:${userId}:${day}`, { runId: row.runId, day });
    }
    return { runId: row.runId, seed: row.seed, fee, balance: await this.wallet.getBalance(userId), resumed: false };
  }

  async checkpoint(userId: string, runId: string, rawInputs: unknown, floor: number): Promise<void> {
    const run = await this.#own(userId, runId);
    if (run.finishedAt) return;
    const inputs = parseInputs(rawInputs);
    await this.repo.checkpointTowerRun(runId, inputs, Math.max(1, Math.min(FLOORS, Math.trunc(floor) || 1)), this.now().toISOString());
  }

  async finish(userId: string, runId: string, rawInputs: unknown, realMs: number): Promise<{
    fellOn: number; cleared: boolean; reward: number; balance: number; best: number; newBest: boolean;
  }> {
    const run = await this.#own(userId, runId);
    const before = await this.repo.bestTowerFloor(userId);
    if (run.finishedAt) {
      return {
        fellOn: run.fellOn ?? 1, cleared: !!run.cleared, reward: run.reward ?? 0,
        balance: await this.wallet.getBalance(userId), best: before, newBest: false,
      };
    }
    const inputs = parseInputs(rawInputs);
    const settled = await this.#settle(run, inputs, false, Math.max(0, Math.trunc(realMs) || 0));
    const best = await this.repo.bestTowerFloor(userId);
    return { ...settled, balance: await this.wallet.getBalance(userId), best, newBest: best > before };
  }

  /** Runs from earlier days the app never finished are paid at the floor their last checkpoint reaches. */
  async settleStale(userId: string, today: string): Promise<void> {
    for (const run of await this.repo.listUnfinishedTowerRuns(userId, today)) {
      let inputs: Input[] = [];
      try { inputs = parseInputs(run.inputs ?? []); } catch { inputs = []; }
      await this.#settle(run, inputs, true, 0);
    }
  }

  async #settle(run: TowerRunRow, inputs: Input[], abandoned: boolean, realMs: number): Promise<{ fellOn: number; cleared: boolean; reward: number }> {
    const result = replay(run.seed, inputs);
    const fellOn = result.cleared ? FLOORS : result.fellOn;
    // A run can't be played faster than the sim's own clock. The last input's
    // tick is how much game time the player must have lived through.
    const lastTick = inputs.length ? inputs[inputs.length - 1]!.t : 0;
    const wallMs = this.now().getTime() - new Date(run.startedAt).getTime();
    // And a thumb on glass is never dead-centre: a script that knows the sim is.
    const spread = lateTapSpread(result);
    const suspicious = (!abandoned && wallMs + 15_000 < (lastTick / TPS) * 1000) || (spread !== null && spread < MIN_HUMAN_SPREAD);
    const reward = suspicious ? payoutFor(1, false) : payoutFor(fellOn, result.cleared);
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
      await this.wallet.grant(run.userId, 'TOWER_REWARD', reward, `tower:reward:${run.runId}`, { runId: run.runId, fellOn, cleared: result.cleared });
    }
    return { fellOn, cleared: result.cleared, reward };
  }

  async #own(userId: string, runId: string): Promise<TowerRunRow> {
    const run = await this.repo.getTowerRunById(runId);
    if (!run || run.userId !== userId) throw new TowerError('NOT_FOUND', 'No such run.');
    return run;
  }
}
