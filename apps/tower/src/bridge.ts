/**
 * The page talks to the app through one message handler. Swift owns the
 * session and makes every API call; the page never sees a token.
 *
 * On a desktop browser there is no app, so a mock stands in: today's state
 * lives in localStorage, and `?dev=1` lets you play as often as you like.
 */
import type { Input, RunResult } from '@tower';
import {
  CHARACTERS_BY_ID, DEFAULT_CHARACTER, ENTRY_FEE, FREE_WEEKDAY, PRACTICE_DAILY_CAP, dailyTower, daySeed, payoutFor,
  payoutWithStreak, replay, streakBonusPercent,
} from '@tower';

export interface TowerStatus {
  /** UTC day, YYYY-MM-DD. */
  readonly day: string;
  readonly free: boolean;
  readonly fee: number;
  readonly balance: number;
  readonly best: number;
  readonly today: null | {
    readonly runId: string;
    readonly finished: boolean;
    readonly fellOn: number;
    readonly cleared: boolean;
    readonly reward: number;
    readonly streak: number;
  };
  /** ISO time the next run opens. */
  readonly nextAt: string;
  readonly enabled: boolean;
  readonly maxReward: number;
  readonly streak: { readonly days: number; readonly todayBonusPercent: number; readonly alive: boolean };
  readonly modifier: string;
  readonly practice: { readonly earnedToday: number; readonly cap: number };
  readonly characters: { readonly owned: readonly string[]; readonly selected: string };
}

export interface StartResult {
  readonly runId: string;
  readonly seed: number;
  readonly day: string;
  readonly fee: number;
  readonly balance: number;
  readonly streak: number;
  readonly characterId: string;
}

export interface PracticeStart {
  readonly runId: string;
  readonly seed: number;
  readonly day: string;
  readonly remaining: number;
  readonly characterId: string;
}

export interface FinishResult {
  readonly fellOn: number;
  readonly cleared: boolean;
  readonly reward: number;
  readonly base: number;
  readonly streak: number;
  readonly bonusPercent: number;
  readonly balance: number;
  readonly best: number;
  readonly newBest: boolean;
  readonly practice: boolean;
}

export interface CharactersResult {
  readonly owned: readonly string[];
  readonly selected: string;
  readonly balance: number;
}

export type Haptic = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'select';

export interface Bridge {
  readonly native: boolean;
  status(): Promise<TowerStatus>;
  start(): Promise<StartResult>;
  practice(): Promise<PracticeStart>;
  checkpoint(runId: string, inputs: readonly Input[], floor: number): Promise<void>;
  finish(runId: string, inputs: readonly Input[], result: RunResult, realMs: number): Promise<FinishResult>;
  buyCharacter(id: string): Promise<CharactersResult>;
  selectCharacter(id: string): Promise<{ selected: string }>;
  haptic(kind: Haptic): void;
  track(event: string, props?: Record<string, unknown>): void;
  close(): void;
  /** Opens the library, after the run. */
  spend(): void;
}

// ── native ───────────────────────────────────────────────────────────────

interface WebkitHandler {
  postMessage(body: unknown): void;
}
declare global {
  interface Window {
    webkit?: { messageHandlers?: { tower?: WebkitHandler } };
    __towerResolve?: (id: number, ok: boolean, payload: unknown) => void;
  }
}

function nativeBridge(handler: WebkitHandler): Bridge {
  let next = 1;
  const waiting = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();
  window.__towerResolve = (id, ok, payload) => {
    const w = waiting.get(id);
    if (!w) return;
    waiting.delete(id);
    if (ok) w.resolve(payload);
    else w.reject(new Error(typeof payload === 'string' ? payload : 'failed'));
  };
  const call = <T,>(op: string, args: Record<string, unknown> = {}): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      const id = next++;
      waiting.set(id, { resolve: resolve as (v: unknown) => void, reject });
      handler.postMessage({ id, op, args });
    });
  const fire = (op: string, args: Record<string, unknown> = {}) => handler.postMessage({ id: 0, op, args });
  return {
    native: true,
    status: () => call<TowerStatus>('status'),
    start: () => call<StartResult>('start'),
    practice: () => call<PracticeStart>('practice'),
    checkpoint: (runId, inputs, floor) => call<void>('checkpoint', { runId, inputs, floor }).catch(() => undefined),
    finish: (runId, inputs, result, realMs) =>
      call<FinishResult>('finish', { runId, inputs, fellOn: result.fellOn, cleared: result.cleared, realMs }),
    buyCharacter: (id) => call<CharactersResult>('buy', { characterId: id }),
    selectCharacter: (id) => call<{ selected: string }>('select', { characterId: id }),
    haptic: (kind) => fire('haptic', { kind }),
    track: (event, props = {}) => fire('track', { event, props }),
    close: () => fire('close'),
    spend: () => fire('spend'),
  };
}

// ── desktop mock ─────────────────────────────────────────────────────────

const KEY = 'tower-mock-v2';
interface MockRun { runId: string; seed: number; day: string; practice: boolean; streak: number; finished: boolean; fellOn: number; cleared: boolean; reward: number }
interface MockState { balance: number; best: number; days: string[]; runs: MockRun[]; owned: string[]; selected: string }

function today(): string {
  const forced = new URLSearchParams(location.search).get('day');
  return forced ?? new Date().toISOString().slice(0, 10);
}
function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function load(): MockState {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null') as MockState | null;
    if (s) return s;
  } catch {
    /* private mode */
  }
  return { balance: 1200, best: 0, days: [], runs: [], owned: [], selected: DEFAULT_CHARACTER };
}
function save(s: MockState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode */
  }
}
function nextUtcMidnight(): string {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return d.toISOString();
}
function streakOf(s: MockState, day: string): { days: number; playedToday: boolean } {
  const set = new Set(s.days);
  const playedToday = set.has(day);
  let cursor = playedToday ? day : addDays(day, -1);
  let n = 0;
  while (set.has(cursor)) { n += 1; cursor = addDays(cursor, -1); }
  return { days: n, playedToday };
}

function mockBridge(): Bridge {
  const dev = new URLSearchParams(location.search).has('dev');
  const isFree = (day: string) => new Date(`${day}T12:00:00Z`).getUTCDay() === FREE_WEEKDAY;
  const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 120));
  const fail = (message: string) => new Promise<never>((_, reject) => setTimeout(() => reject(new Error(message)), 120));
  const practiceEarned = (s: MockState, day: string) => s.runs.filter((r) => r.practice && r.day === day).reduce((a, r) => a + r.reward, 0);
  return {
    native: false,
    status: () => {
      const s = load();
      const day = today();
      const run = s.runs.find((r) => !r.practice && r.day === day && !(dev && r.finished)) ?? null;
      const st = streakOf(s, day);
      const todayStreak = st.playedToday ? st.days : st.days + 1;
      return wait({
        day, free: isFree(day), fee: isFree(day) ? 0 : ENTRY_FEE, balance: s.balance, best: s.best,
        today: run ? { runId: run.runId, finished: run.finished, fellOn: run.fellOn, cleared: run.cleared, reward: run.reward, streak: run.streak } : null,
        nextAt: nextUtcMidnight(), enabled: true, maxReward: payoutWithStreak(30, true, todayStreak),
        streak: { days: st.days, todayBonusPercent: streakBonusPercent(todayStreak), alive: st.days > 0 },
        modifier: dailyTower(day).modifier,
        practice: { earnedToday: practiceEarned(s, day), cap: PRACTICE_DAILY_CAP },
        characters: { owned: [DEFAULT_CHARACTER, ...s.owned], selected: s.selected },
      });
    },
    start: () => {
      const s = load();
      const day = today();
      const fee = isFree(day) ? 0 : ENTRY_FEE;
      const forced = new URLSearchParams(location.search).get('seed');
      const seed = forced ? Number(forced) : dev ? (Math.random() * 2 ** 31) >>> 0 : daySeed(day);
      const open = s.runs.find((r) => !r.practice && r.day === day && !r.finished);
      if (open && !dev) return wait({ runId: open.runId, seed: open.seed, day, fee: 0, balance: s.balance, streak: open.streak, characterId: s.selected });
      const streak = streakOf(s, day).days + (streakOf(s, day).playedToday ? 0 : 1);
      s.balance -= fee;
      s.runs.push({ runId: `mock_${Date.now()}`, seed, day, practice: false, streak, finished: false, fellOn: 1, cleared: false, reward: 0 });
      if (!s.days.includes(day)) s.days.push(day);
      save(s);
      return wait({ runId: s.runs.at(-1)!.runId, seed, day, fee, balance: s.balance, streak, characterId: s.selected });
    },
    practice: () => {
      const s = load();
      const day = today();
      const run: MockRun = { runId: `mockp_${Date.now()}`, seed: (Math.random() * 2 ** 31) >>> 0, day, practice: true, streak: 0, finished: false, fellOn: 1, cleared: false, reward: 0 };
      s.runs.push(run);
      save(s);
      return wait({ runId: run.runId, seed: run.seed, day, remaining: Math.max(0, PRACTICE_DAILY_CAP - practiceEarned(s, day)), characterId: s.selected });
    },
    checkpoint: async () => undefined,
    finish: (runId, inputs) => {
      const s = load();
      const run = s.runs.find((r) => r.runId === runId);
      if (!run) return fail('No such run.');
      const r = replay(run.seed, inputs, dailyTower(run.day));
      const fellOn = r.cleared ? 30 : r.fellOn;
      let base: number;
      let reward: number;
      if (run.practice) {
        base = Math.min(Math.max(0, PRACTICE_DAILY_CAP - practiceEarned(s, run.day)), r.cleared ? 30 : fellOn - 1);
        reward = base;
      } else {
        base = payoutFor(fellOn, r.cleared);
        reward = payoutWithStreak(fellOn, r.cleared, run.streak);
      }
      const reached = r.cleared ? 31 : fellOn;
      const newBest = !run.practice && reached > s.best;
      if (!run.practice) s.best = Math.max(s.best, reached);
      s.balance += reward;
      Object.assign(run, { finished: true, fellOn, cleared: r.cleared, reward });
      save(s);
      return wait({ fellOn, cleared: r.cleared, reward, base, streak: run.streak, bonusPercent: run.practice ? 0 : streakBonusPercent(run.streak), balance: s.balance, best: s.best, newBest, practice: run.practice });
    },
    buyCharacter: (id) => {
      const s = load();
      const def = CHARACTERS_BY_ID[id];
      if (!def) return fail('No such character.');
      if (def.price > 0 && !s.owned.includes(id)) {
        if (s.balance < def.price) return fail(`You need ◆${def.price} to unlock ${def.name}.`);
        s.balance -= def.price;
        s.owned.push(id);
      }
      s.selected = id;
      save(s);
      return wait({ owned: [DEFAULT_CHARACTER, ...s.owned], selected: id, balance: s.balance });
    },
    selectCharacter: (id) => {
      const s = load();
      if (id !== DEFAULT_CHARACTER && !s.owned.includes(id)) return fail('Buy this character first.');
      s.selected = id;
      save(s);
      return wait({ selected: id });
    },
    haptic: () => undefined,
    track: (event, props) => console.debug('[track]', event, props ?? {}),
    close: () => location.reload(),
    spend: () => console.debug('[spend]'),
  };
}

export const bridge: Bridge = window.webkit?.messageHandlers?.tower
  ? nativeBridge(window.webkit.messageHandlers.tower)
  : mockBridge();
