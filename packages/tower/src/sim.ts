/**
 * The Tower's simulation: a fixed 60-tick loop with integer maths only, so the
 * same seed and the same inputs give the same run on a phone (JavaScriptCore)
 * and on the server (V8). The server replays the input log to decide the
 * payout; the client never gets to say how far it got.
 *
 * Rules that keep it deterministic: no Math.random, no Math.sin/cos/pow, no
 * floats that are compared, no wall-clock time. The renderer can do anything.
 */
import {
  BOONS,
  BOONS_BY_ID,
  BOON_AFTER,
  FLOORS,
  floorSpec,
  type BoonId,
  type FloorSpec,
} from './content.js';
import { Rng } from './rng.js';

export type InputKind = 'tap' | 'dodge' | 'pick';
export interface Input {
  /** The tick the input was applied on. */
  readonly t: number;
  readonly k: InputKind;
  /** For `pick`: which of the three offered power-ups (0..2). */
  readonly v?: number;
}

export type AttackKind = 'slash' | 'kunai' | 'heavy' | 'fake' | 'stance';
export type AttackState = 'pending' | 'parried' | 'perfect' | 'dodged' | 'hit' | 'bitten' | 'passed' | 'blocked';

export interface Attack {
  readonly id: number;
  readonly kind: AttackKind;
  /** When the telegraph appears. */
  readonly tele: number;
  /** When it lands (fake: when it pulls back; stance: when it starts). */
  readonly impact: number;
  /** Stance only: when it ends. */
  readonly end: number;
  /** Fakes and stances: when the honest tell shows. */
  readonly tell: number;
  /** A delayed strike: the wind-up holds before it lands. */
  readonly delayed: boolean;
  /** Floor 30's last phase: drawn in the other colour. */
  readonly twisted: boolean;
  state: AttackState;
  resolvedAt: number;
}

export type Phase = 'intro' | 'fight' | 'break' | 'boon' | 'dead' | 'won';

export type SimEvent =
  | { t: number; type: 'floor'; floor: number }
  | { t: number; type: 'fight' }
  | { t: number; type: 'tele'; attack: number }
  | { t: number; type: 'parry'; attack: number; perfect: boolean; kunai: boolean }
  | { t: number; type: 'dodge'; attack: number; heavy: boolean }
  | { t: number; type: 'hit'; attack: number; cause: HitCause; hp: number }
  | { t: number; type: 'saved'; by: 'friend' | 'flashback' | 'plot_armor' | 'tutorial' }
  | { t: number; type: 'whiff'; lockout: number }
  | { t: number; type: 'bitten'; attack: number }
  | { t: number; type: 'counter'; damage: number }
  | { t: number; type: 'opening'; until: number }
  | { t: number; type: 'stance'; attack: number }
  | { t: number; type: 'break'; final: boolean; instant: boolean }
  | { t: number; type: 'cleared'; floor: number; skipped: boolean }
  | { t: number; type: 'boon_offer'; offer: BoonId[] }
  | { t: number; type: 'boon_pick'; boon: BoonId }
  | { t: number; type: 'heal'; hp: number }
  | { t: number; type: 'twist' }
  | { t: number; type: 'erased'; boon: BoonId }
  | { t: number; type: 'dead'; floor: number }
  | { t: number; type: 'won' };

export type HitCause = 'late' | 'crushed' | 'countered' | 'feint' | 'chuunibyou';

export interface FloorStats {
  floor: number;
  enemy: string;
  ticks: number;
  parries: number;
  perfects: number;
  dodges: number;
  counters: number;
  hits: number;
  whiffs: number;
  bitten: number;
  skipped: boolean;
  offer?: BoonId[];
  picked?: BoonId;
  killedBy?: HitCause;
}

export const INTRO_TICKS = 80;
export const BOSS_INTRO_TICKS = 130;
export const BREAK_TICKS = 96;
const OPENING_TICKS = 34;
const STANCE_TICKS = 44;
const FEINT_FOLLOW: readonly [number, number] = [20, 32];
const DELAY_EXTRA: readonly [number, number] = [24, 44];
const FAKE_TELL = 14;
const PHASE_PAUSE = 50;
const KIAI_BONUS = 20;
const AUTHOR_HP_CAP = 4;
const HALF = 1;
const HEART = 2;
const MAX_HP = 8;

export interface RunResult {
  /** The floor the run ended on (31 when the tower was cleared). */
  readonly fellOn: number;
  readonly cleared: boolean;
  readonly ticks: number;
  readonly floors: FloorStats[];
  readonly boons: BoonId[];
}

export class TowerSim {
  readonly seed: number;
  tick = 0;
  phase: Phase = 'intro';
  phaseUntil = 0;
  floor = 1;
  spec: FloorSpec;

  hp = 3 * HEART;
  maxHp = 3 * HEART;
  kiai = 0;
  lockUntil = 0;

  guard = 0;
  guardMax = 0;
  breaksDone = 0;
  /** Bosses get faster each phase; per mille multiplier on timings. */
  tempo = 1000;

  attacks: Attack[] = [];
  nextPatternAt = 0;
  opening: { from: number; to: number } | null = null;

  boons: BoonId[] = [];
  offer: BoonId[] | null = null;
  flashbacks = 0;
  plotArmor = false;
  fillerPending = false;
  truckFloors = 0;
  friendCount = 0;
  twistActive = false;
  erased: BoonId | null = null;

  readonly events: SimEvent[] = [];
  readonly floors: FloorStats[] = [];
  readonly inputs: Input[] = [];

  #rng: Rng;
  #attackId = 0;
  #floorStart = 0;

  constructor(seed: number) {
    this.seed = seed >>> 0;
    this.#rng = new Rng(this.seed);
    this.spec = floorSpec(1);
    this.#enterFloor(1);
  }

  get stats(): FloorStats {
    return this.floors[this.floors.length - 1]!;
  }

  get over(): boolean {
    return this.phase === 'dead' || this.phase === 'won';
  }

  has(boon: BoonId): boolean {
    return this.boons.includes(boon);
  }

  result(): RunResult {
    return {
      fellOn: this.phase === 'won' ? FLOORS + 1 : this.floor,
      cleared: this.phase === 'won',
      ticks: this.tick,
      floors: this.floors.map((f) => ({ ...f })),
      boons: [...this.boons],
    };
  }

  /** Apply an input on the current tick. Returns false when it did nothing. */
  input(k: InputKind, v?: number): boolean {
    if (this.over) return false;
    const t = this.tick;
    if (k === 'pick') {
      if (this.phase !== 'boon' || !this.offer) return false;
      const i = Math.trunc(v ?? -1);
      const boon = this.offer[i];
      if (!boon) return false;
      this.inputs.push({ t, k, v: i });
      this.#takeBoon(boon);
      return true;
    }
    if (this.phase !== 'fight') return false;
    this.inputs.push({ t, k });
    if (t < this.lockUntil) return true;
    if (k === 'tap') this.#tap(t);
    else this.#dodgeInput(t);
    return true;
  }

  /** Advance one tick. */
  step(): void {
    if (this.over) return;
    this.tick += 1;
    const t = this.tick;
    switch (this.phase) {
      case 'intro':
        if (t >= this.phaseUntil) {
          this.phase = 'fight';
          this.nextPatternAt = t + 30;
          this.#emit({ t, type: 'fight' });
        }
        break;
      case 'fight':
        this.#fightTick(t);
        break;
      case 'break':
        if (t >= this.phaseUntil) this.#afterBreak(t);
        break;
      case 'boon':
        break;
    }
  }

  // ── fight ──────────────────────────────────────────────────────────────

  #fightTick(t: number): void {
    // Schedule first, so a pattern's first telegraph is announced on the tick it starts.
    if (!this.attacks.length && t >= this.nextPatternAt) this.#schedulePattern(t);
    for (const a of this.attacks) {
      if (a.state !== 'pending') continue;
      if (a.tele === t) this.#emit({ t, type: a.kind === 'stance' ? 'stance' : 'tele', attack: a.id });
      if (a.kind === 'stance') {
        if (t > a.end) this.#resolve(a, 'passed', t);
      } else if (a.kind === 'fake') {
        if (t > a.impact + this.#late()) this.#resolve(a, 'passed', t);
      } else if (t > a.impact + this.#late()) {
        this.#resolve(a, 'hit', t);
        this.#takeHit(a, 'late', t);
        if (this.over || this.phase !== 'fight') return;
      }
    }
    if (this.opening && t > this.opening.to) this.opening = null;
    if (this.attacks.length && this.attacks.every((a) => a.state !== 'pending')) {
      this.attacks = [];
      this.nextPatternAt = t + this.#scaled(this.#rng.range(this.spec.gap[0], this.spec.gap[1]), true);
    }
  }

  #schedulePattern(t: number): void {
    const s = this.spec;
    const pattern = this.#rng.weighted(s.patterns);
    const twistPhase = s.twist && this.breaksDone >= 2;
    let impact = t + this.#lead(this.#rng.range(s.lead[0], s.lead[1]));
    let prev = t;
    for (let i = 0; i < pattern.length; i++) {
      const c = pattern[i]!;
      if (i > 0) impact = prev + this.#lead(s.spacing);
      const tele = i === 0 ? t : Math.max(prev + 2, impact - this.#lead(s.spacing));
      const twisted = twistPhase && this.#rng.chance(500);
      if (c === 'f') {
        const tell = this.has('glasses_glint') ? tele : impact - FAKE_TELL;
        this.#push('fake', tele, impact, 0, tell, false, twisted);
        const real = impact + this.#lead(this.#rng.range(FEINT_FOLLOW[0], FEINT_FOLLOW[1]));
        this.#push('slash', impact + 2, real, 0, impact + 2, false, false);
        prev = real;
      } else if (c === 'd') {
        const late = impact + this.#lead(this.#rng.range(DELAY_EXTRA[0], DELAY_EXTRA[1]));
        this.#push('slash', tele, late, 0, tele, true, twisted);
        prev = late;
      } else {
        const kind = c === 'h' ? 'heavy' : c === 'k' ? 'kunai' : 'slash';
        this.#push(kind, tele, impact, 0, tele, false, twisted);
        prev = impact;
      }
    }
    if (twistPhase && !this.twistActive) {
      this.twistActive = true;
      this.#emit({ t, type: 'twist' });
    }
  }

  #push(kind: AttackKind, tele: number, impact: number, end: number, tell: number, delayed: boolean, twisted: boolean): Attack {
    const a: Attack = { id: ++this.#attackId, kind, tele, impact, end, tell, delayed, twisted, state: 'pending', resolvedAt: 0 };
    this.attacks.push(a);
    return a;
  }

  #early(): number {
    return this.has('training_arc') ? Math.trunc((this.spec.early * 125) / 100) : this.spec.early;
  }
  #late(): number {
    return this.has('training_arc') ? Math.trunc((this.spec.late * 125) / 100) : this.spec.late;
  }
  #perfect(): number {
    return this.has('battle_cry') ? this.spec.perfect * 2 : this.spec.perfect;
  }
  /** Lead and spacing, slowed by Time Skip and quickened by boss phases. */
  #lead(ticks: number): number {
    let v = ticks;
    if (this.has('time_skip')) v = Math.trunc((v * 112) / 100);
    return Math.max(8, Math.trunc((v * this.tempo) / 1000));
  }
  #scaled(ticks: number, gap: boolean): number {
    const tempo = gap ? 1000 - (1000 - this.tempo) * 2 : this.tempo;
    return Math.max(10, Math.trunc((ticks * tempo) / 1000));
  }

  /** The earliest pending attack whose window contains t. */
  #inWindow(t: number, kinds: readonly AttackKind[]): Attack | undefined {
    const early = this.#early();
    const late = this.#late();
    let best: Attack | undefined;
    for (const a of this.attacks) {
      if (a.state !== 'pending' || !kinds.includes(a.kind)) continue;
      if (t >= a.impact - early && t <= a.impact + late) {
        if (!best || a.impact < best.impact) best = a;
      }
    }
    return best;
  }

  #tap(t: number): void {
    const stance = this.attacks.find((a) => a.kind === 'stance' && a.state === 'pending' && t >= a.impact && t <= a.end);
    if (stance) {
      this.#resolve(stance, 'hit', t);
      this.#takeHit(stance, 'countered', t);
      return;
    }
    const a = this.#inWindow(t, ['slash', 'kunai', 'heavy', 'fake']);
    if (a?.kind === 'heavy') {
      this.#resolve(a, 'hit', t);
      this.#takeHit(a, 'crushed', t);
      return;
    }
    if (a?.kind === 'fake') {
      this.#resolve(a, 'bitten', t);
      this.stats.bitten += 1;
      this.#emit({ t, type: 'bitten', attack: a.id });
      this.#whiff(t, true);
      return;
    }
    if (a) {
      const perfect = Math.abs(t - a.impact) <= this.#perfect();
      this.#resolve(a, perfect ? 'perfect' : 'parried', t);
      this.stats.parries += 1;
      if (perfect) this.stats.perfects += 1;
      this.#emit({ t, type: 'parry', attack: a.id, perfect, kunai: a.kind === 'kunai' });
      // A full Kiai meter turns the next parry into a heavy blow and empties it.
      const kiai = this.kiai >= 100;
      this.kiai = kiai ? 0 : Math.min(100, this.kiai + (perfect ? 20 : 6));
      this.#damageGuard((perfect ? 15 : 10) + (kiai ? KIAI_BONUS : 0), t, kiai);
      return;
    }
    if (this.opening && t >= this.opening.from && t <= this.opening.to) {
      this.opening = null;
      const mult = this.has('chuunibyou') ? 4 : 2;
      this.stats.counters += 1;
      this.kiai = Math.min(100, this.kiai + 15);
      this.#emit({ t, type: 'counter', damage: 10 * mult });
      this.#damageGuard(10 * mult, t, false);
      return;
    }
    this.#whiff(t, false);
  }

  #dodgeInput(t: number): void {
    const a = this.#inWindow(t, ['slash', 'kunai', 'heavy', 'fake']);
    if (a?.kind === 'fake') {
      // Dodging a feint is the safe answer: nothing happens either way.
      this.#resolve(a, 'passed', t);
      this.#emit({ t, type: 'dodge', attack: a.id, heavy: false });
      return;
    }
    if (a) {
      this.#resolve(a, 'dodged', t);
      this.stats.dodges += 1;
      this.#emit({ t, type: 'dodge', attack: a.id, heavy: a.kind === 'heavy' });
      if (a.kind === 'heavy') {
        const lastInPattern = !this.attacks.some((b) => b.state === 'pending' && b.kind !== 'stance');
        if (lastInPattern && this.#rng.chance(this.spec.stance)) {
          const start = t + 6;
          const tell = this.has('glasses_glint') ? t + 1 : start;
          this.#push('stance', start, start, start + STANCE_TICKS, tell, false, false);
        } else {
          this.opening = { from: t + 4, to: t + 4 + OPENING_TICKS };
          this.#emit({ t, type: 'opening', until: this.opening.to });
        }
      }
      return;
    }
    // A dodge at nothing: half the lockout of a whiffed tap.
    const lock = Math.trunc(this.spec.lockout / 2);
    if (lock) this.lockUntil = t + lock;
  }

  #whiff(t: number, feint: boolean): void {
    this.stats.whiffs += 1;
    const lock = feint ? Math.max(this.spec.lockout, 18) : this.spec.lockout;
    if (lock) this.lockUntil = t + lock;
    this.#emit({ t, type: 'whiff', lockout: lock });
    if (!feint && this.has('chuunibyou') && this.floor > 1) {
      this.hp -= HALF;
      this.stats.hits += 1;
      this.#emit({ t, type: 'hit', attack: 0, cause: 'chuunibyou', hp: this.hp });
      if (this.hp <= 0) this.#die(t, 'chuunibyou');
    }
  }

  #resolve(a: Attack, state: AttackState, t: number): void {
    a.state = state;
    a.resolvedAt = t;
  }

  #takeHit(a: Attack, cause: HitCause, t: number): void {
    if (this.floor === 1) {
      this.#emit({ t, type: 'saved', by: 'tutorial' });
      return;
    }
    if (this.has('friendship') && this.spec.boss && this.friendCount > 0) {
      this.friendCount = 0;
      a.state = 'blocked';
      this.#emit({ t, type: 'saved', by: 'friend' });
      return;
    }
    if (this.flashbacks > 0) {
      this.flashbacks -= 1;
      a.state = 'blocked';
      this.#emit({ t, type: 'saved', by: 'flashback' });
      return;
    }
    this.hp -= HEART;
    this.stats.hits += 1;
    this.kiai = Math.max(0, this.kiai - 30);
    this.#emit({ t, type: 'hit', attack: a.id, cause, hp: this.hp });
    if (this.hp <= 0) {
      if (this.plotArmor) {
        this.plotArmor = false;
        this.hp = HEART;
        this.#emit({ t, type: 'saved', by: 'plot_armor' });
        return;
      }
      this.#die(t, cause);
    }
  }

  #die(t: number, cause: HitCause): void {
    this.hp = 0;
    this.phase = 'dead';
    this.stats.killedBy = cause;
    this.stats.ticks = t - this.#floorStart;
    this.#emit({ t, type: 'dead', floor: this.floor });
  }

  #damageGuard(amount: number, t: number, instant: boolean): void {
    let dmg = amount;
    if (this.has('second_form') && this.hp <= HEART) dmg *= 2;
    this.guard = Math.min(this.guardMax, this.guard + dmg);
    if (this.guard >= this.guardMax) {
      this.breaksDone += 1;
      const final = this.breaksDone >= this.spec.breaks;
      this.phase = 'break';
      this.phaseUntil = t + BREAK_TICKS;
      this.attacks = [];
      this.opening = null;
      this.lockUntil = 0;
      this.#emit({ t, type: 'break', final, instant });
    }
  }

  #afterBreak(t: number): void {
    if (this.breaksDone < this.spec.breaks) {
      this.guard = 0;
      this.tempo = Math.trunc((this.tempo * (this.spec.twist ? 84 : 90)) / 100);
      this.phase = 'fight';
      this.nextPatternAt = t + PHASE_PAUSE;
      this.#emit({ t, type: 'fight' });
      return;
    }
    this.#clearFloor(t, false);
  }

  #clearFloor(t: number, skipped: boolean): void {
    this.stats.ticks = t - this.#floorStart;
    this.stats.skipped = skipped;
    this.#emit({ t, type: 'cleared', floor: this.floor, skipped });
    if (this.spec.boss) {
      const heal = HEART + (this.has('bento') ? HEART : 0);
      this.hp = Math.min(this.maxHp, this.hp + heal);
      this.#emit({ t, type: 'heal', hp: this.hp });
    }
    if (this.floor >= FLOORS) {
      this.phase = 'won';
      this.#emit({ t, type: 'won' });
      return;
    }
    if (BOON_AFTER.has(this.floor)) {
      this.offer = this.#rollOffer(this.spec.boss);
      this.stats.offer = [...this.offer];
      this.phase = 'boon';
      this.#emit({ t, type: 'boon_offer', offer: [...this.offer] });
      return;
    }
    this.#enterFloor(this.floor + 1);
  }

  #enterFloor(floor: number): void {
    const t = this.tick;
    this.floor = floor;
    this.spec = floorSpec(floor);
    this.#floorStart = t;
    this.floors.push({
      floor, enemy: this.spec.enemy.id, ticks: 0, parries: 0, perfects: 0, dodges: 0,
      counters: 0, hits: 0, whiffs: 0, bitten: 0, skipped: false,
    });
    this.attacks = [];
    this.opening = null;
    this.lockUntil = 0;
    this.kiai = Math.min(this.kiai, 50);
    this.friendCount = 1;
    this.breaksDone = 0;
    this.tempo = 1000;
    this.twistActive = false;
    this.guardMax = this.spec.guardParries * 10;
    this.guard = 0;
    if (!this.spec.boss && this.truckFloors > 0) {
      this.truckFloors -= 1;
      this.guard = Math.trunc(this.guardMax / 2);
    }
    this.#emit({ t, type: 'floor', floor });
    if (this.spec.twist && this.boons.length) {
      // THE AUTHOR rewrites you: one power-up, chosen by the day's seed, is gone.
      const erased = this.boons.splice(this.#rng.range(0, this.boons.length - 1), 1)[0]!;
      this.erased = erased;
      if (erased === 'plot_armor') this.plotArmor = false;
      if (erased === 'flashback') this.flashbacks = 0;
      if (erased === 'rivals_respect') {
        this.maxHp -= HEART;
        this.hp = Math.min(this.hp, this.maxHp);
      }
      this.#emit({ t, type: 'erased', boon: erased });
    }
    if (this.spec.twist && this.hp > AUTHOR_HP_CAP) {
      // ...and edits you down to two hearts. The last floor is meant to be a wall.
      this.hp = AUTHOR_HP_CAP;
      this.#emit({ t, type: 'heal', hp: this.hp });
    }
    if (!this.spec.boss && this.fillerPending) {
      this.fillerPending = false;
      this.#clearFloor(t, true);
      return;
    }
    this.phase = 'intro';
    this.phaseUntil = t + (this.spec.boss ? BOSS_INTRO_TICKS : INTRO_TICKS);
  }

  /** Dev tools only (screenshots, tuning). The server replays from floor 1, so this can't earn anything. */
  devStartAt(floor: number): void {
    this.#enterFloor(Math.max(1, Math.min(FLOORS, floor)));
  }

  // ── power-ups ──────────────────────────────────────────────────────────

  #rollOffer(boss: boolean): BoonId[] {
    const weights: Record<string, number> = boss ? { common: 6, rare: 6, epic: 3 } : { common: 10, rare: 5, epic: 1 };
    const pool = BOONS.filter((b) => b.repeat || !this.boons.includes(b.id))
      // Healing nobody needs is a wasted card.
      .filter((b) => !(b.id === 'beach_episode' && this.hp >= this.maxHp))
      .filter((b) => !(b.id === 'rivals_respect' && this.maxHp >= MAX_HP))
      // A whiff only starts to cost anything on floor 11; before that this card is a trap.
      .filter((b) => !(b.id === 'chuunibyou' && this.floor < 10));
    const offer: BoonId[] = [];
    while (offer.length < 3 && pool.length) {
      const w: Record<string, number> = {};
      for (const b of pool) w[b.id] = weights[b.rarity]!;
      const id = this.#rng.weighted(w) as BoonId;
      offer.push(id);
      pool.splice(pool.findIndex((b) => b.id === id), 1);
    }
    return offer;
  }

  #takeBoon(boon: BoonId): void {
    const t = this.tick;
    this.boons.push(boon);
    this.stats.picked = boon;
    this.offer = null;
    this.#emit({ t, type: 'boon_pick', boon });
    switch (boon) {
      case 'beach_episode':
        this.hp = this.maxHp;
        this.#emit({ t, type: 'heal', hp: this.hp });
        break;
      case 'bento':
        this.hp = Math.min(this.maxHp, this.hp + HEART);
        this.#emit({ t, type: 'heal', hp: this.hp });
        break;
      case 'rivals_respect':
        this.maxHp = Math.min(MAX_HP, this.maxHp + HEART);
        this.hp = Math.min(this.maxHp, this.hp + HEART);
        this.#emit({ t, type: 'heal', hp: this.hp });
        break;
      case 'flashback':
        this.flashbacks += 1;
        break;
      case 'plot_armor':
        this.plotArmor = true;
        break;
      case 'filler_episode':
        this.fillerPending = true;
        break;
      case 'truck_kun':
        this.truckFloors = 2;
        break;
    }
    this.#enterFloor(this.floor + 1);
  }

  #emit(e: SimEvent): void {
    this.events.push(e);
  }
}

export { BOONS_BY_ID };

/**
 * Replay a run from its inputs. Inputs must be in tick order; anything out of
 * order or past the end is ignored. A run that runs out of inputs while still
 * alive is treated as abandoned on the floor it was on.
 */
export function replay(seed: number, inputs: readonly Input[], maxTicks = 60 * 60 * 30): RunResult {
  const sim = new TowerSim(seed);
  let i = 0;
  const last = inputs.length ? inputs[inputs.length - 1]!.t : 0;
  while (!sim.over && sim.tick <= maxTicks) {
    while (i < inputs.length && inputs[i]!.t === sim.tick) {
      const inp = inputs[i]!;
      sim.input(inp.k, inp.v);
      i += 1;
    }
    while (i < inputs.length && inputs[i]!.t < sim.tick) i += 1;
    if (i >= inputs.length && sim.tick > last + 60 * 20) break;
    sim.step();
  }
  return sim.result();
}
