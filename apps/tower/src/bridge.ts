/**
 * The page talks to the app through one message handler. Swift owns the
 * session and makes every API call; the page never sees a token.
 *
 * On a desktop browser there is no app, so a mock stands in: today's state
 * lives in localStorage, and `?dev=1` lets you play as often as you like.
 */
import type { Input, RunResult } from '@tower';
import { daySeed } from '@tower';

export interface TowerStatus {
  /** UTC day, YYYY-MM-DD. */
  readonly day: string;
  readonly free: boolean;
  readonly fee: number;
  readonly balance: number;
  readonly best: number;
  /** Today's run, if one was started. */
  readonly today: null | {
    readonly runId: string;
    readonly finished: boolean;
    readonly fellOn: number;
    readonly cleared: boolean;
    readonly reward: number;
  };
  /** ISO time the next run opens. */
  readonly nextAt: string;
  readonly enabled: boolean;
}

export interface StartResult {
  readonly runId: string;
  readonly seed: number;
  readonly fee: number;
  readonly balance: number;
}

export interface FinishResult {
  readonly fellOn: number;
  readonly cleared: boolean;
  readonly reward: number;
  readonly balance: number;
  readonly best: number;
  readonly newBest: boolean;
}

export type Haptic = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'select';

export interface Bridge {
  readonly native: boolean;
  status(): Promise<TowerStatus>;
  start(): Promise<StartResult>;
  checkpoint(runId: string, inputs: readonly Input[], floor: number): Promise<void>;
  finish(runId: string, inputs: readonly Input[], result: RunResult, realMs: number): Promise<FinishResult>;
  haptic(kind: Haptic): void;
  track(event: string, props?: Record<string, unknown>): void;
  close(): void;
  /** Opens the wallet / a story, after the run. */
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
    checkpoint: (runId, inputs, floor) => call<void>('checkpoint', { runId, inputs, floor }).catch(() => undefined),
    finish: (runId, inputs, result, realMs) =>
      call<FinishResult>('finish', { runId, inputs, fellOn: result.fellOn, cleared: result.cleared, realMs }),
    haptic: (kind) => fire('haptic', { kind }),
    track: (event, props = {}) => fire('track', { event, props }),
    close: () => fire('close'),
    spend: () => fire('spend'),
  };
}

// ── desktop mock ─────────────────────────────────────────────────────────

import { ENTRY_FEE, FREE_WEEKDAY, payoutFor, replay } from '@tower';

const KEY = 'tower-mock-v1';
interface MockState { day: string; balance: number; best: number; run: null | { runId: string; seed: number; finished: boolean; fellOn: number; cleared: boolean; reward: number } }

function today(): string {
  const forced = new URLSearchParams(location.search).get('day');
  return forced ?? new Date().toISOString().slice(0, 10);
}
function load(): MockState {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null') as MockState | null;
    if (s) return s.day === today() ? s : { ...s, day: today(), run: null };
  } catch {
    /* private mode */
  }
  return { day: today(), balance: 420, best: 0, run: null };
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

function mockBridge(): Bridge {
  const dev = new URLSearchParams(location.search).has('dev');
  const isFree = () => new Date(today() + 'T12:00:00Z').getUTCDay() === FREE_WEEKDAY;
  const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 120));
  return {
    native: false,
    status: () => {
      const s = load();
      const run = dev && s.run?.finished ? null : s.run;
      return wait({
        day: s.day, free: isFree(), fee: isFree() ? 0 : ENTRY_FEE, balance: s.balance, best: s.best,
        today: run ? { runId: run.runId, finished: run.finished, fellOn: run.fellOn, cleared: run.cleared, reward: run.reward } : null,
        nextAt: nextUtcMidnight(), enabled: true,
      });
    },
    start: () => {
      const s = load();
      const fee = isFree() ? 0 : ENTRY_FEE;
      const forced = new URLSearchParams(location.search).get('seed');
      const seed = forced ? Number(forced) : dev ? (Math.random() * 2 ** 32) >>> 0 : daySeed(s.day);
      if (s.run && !s.run.finished && !dev) return wait({ runId: s.run.runId, seed: s.run.seed, fee: 0, balance: s.balance });
      s.balance -= fee;
      s.run = { runId: 'mock_' + Date.now(), seed, finished: false, fellOn: 1, cleared: false, reward: 0 };
      save(s);
      return wait({ runId: s.run.runId, seed, fee, balance: s.balance });
    },
    checkpoint: async () => undefined,
    finish: (runId, inputs) => {
      const s = load();
      const seed = s.run?.runId === runId ? s.run.seed : 0;
      const r = replay(seed, inputs);
      const reward = payoutFor(r.fellOn, r.cleared);
      const reached = r.cleared ? 31 : r.fellOn;
      const newBest = reached > s.best;
      s.best = Math.max(s.best, reached);
      s.balance += reward;
      if (s.run) Object.assign(s.run, { finished: true, fellOn: r.fellOn, cleared: r.cleared, reward });
      save(s);
      return wait({ fellOn: r.fellOn, cleared: r.cleared, reward, balance: s.balance, best: s.best, newBest });
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
