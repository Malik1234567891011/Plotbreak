/**
 * Simulated players for tuning. They see what a person sees (the telegraph,
 * its colour, when it should land) and answer with human-shaped error: timing
 * noise that grows when there is less warning, a chance to fall for a feint,
 * a chance to misread a colour. Not used at runtime.
 */
import type { BoonId } from './content.js';
import { Rng } from './rng.js';
import { TowerSim, type Attack, type RunResult } from './sim.js';

export interface Skill {
  readonly name: string;
  /** Timing noise, ticks (1 tick ≈ 16.7 ms). */
  readonly sigma: number;
  /** Average timing offset, ticks (positive = late). */
  readonly bias: number;
  /** Fastest reaction after a telegraph appears, ticks. */
  readonly react: number;
  /** Per mille: taps a feint. */
  readonly bite: number;
  /** Per mille: answers a heavy with a tap or a slash with a swipe. */
  readonly misread: number;
  /** Per mille: taps into a counter stance. */
  readonly stanceBite: number;
  /** Per mille: counters after dodging a heavy. */
  readonly counter: number;
  readonly smartBoons: boolean;
  /** Per mille: attention slips and the attack isn't answered at all. */
  readonly lapse: number;
  readonly toddler?: boolean;
}

export const SKILLS: readonly Skill[] = [
  { name: 'toddler', sigma: 0, bias: 0, react: 0, bite: 0, misread: 0, stanceBite: 0, counter: 0, smartBoons: false, lapse: 0, toddler: true },
  { name: 'first-timer', sigma: 5.5, bias: 2, react: 16, bite: 500, misread: 120, stanceBite: 500, counter: 400, smartBoons: false, lapse: 40 },
  { name: 'average', sigma: 3.6, bias: 1, react: 14, bite: 250, misread: 60, stanceBite: 300, counter: 600, smartBoons: false, lapse: 25 },
  { name: 'decent', sigma: 2.4, bias: 0, react: 13, bite: 100, misread: 30, stanceBite: 150, counter: 800, smartBoons: true, lapse: 15 },
  { name: 'very good', sigma: 1.7, bias: 0, react: 12, bite: 40, misread: 15, stanceBite: 60, counter: 900, smartBoons: true, lapse: 10 },
  { name: 'expert', sigma: 1.2, bias: 0, react: 11, bite: 20, misread: 5, stanceBite: 25, counter: 950, smartBoons: true, lapse: 6 },
];

/** A phone adds lag and jitter between the finger and the game: ~1 tick late, ~1.2 ticks of spread. */
const TOUCH_BIAS = 1;
const TOUCH_JITTER = 1.2;

const PRIORITY: readonly BoonId[] = [
  'plot_armor', 'rivals_respect', 'friendship', 'time_skip', 'training_arc', 'flashback',
  'beach_episode', 'bento', 'filler_episode', 'glasses_glint', 'battle_cry', 'second_form', 'truck_kun', 'chuunibyou',
];

export function playBot(seed: number, skill: Skill, botSeed: number): RunResult {
  return playBotInto(new TowerSim(seed), skill, botSeed);
}

/** Same, on a sim the caller holds (so its recorded inputs can be read afterwards). */
export function playBotInto(sim: TowerSim, skill: Skill | number, botSeed = 7): RunResult {
  const driver = new BotDriver(typeof skill === 'number' ? SKILLS[skill]! : skill, botSeed);
  while (!sim.over && sim.tick < 60 * 60 * 30) {
    driver.beforeStep(sim);
    sim.step();
  }
  return sim.result();
}

/** A bot that plays one tick at a time: call `beforeStep` right before every `sim.step()`. */
export class BotDriver {
  readonly #skill: Skill;
  readonly #rng: Rng;
  #plan: { t: number; k: 'tap' | 'dodge' }[] = [];
  readonly #seen = new Set<number>();
  #nextMash = 0;
  #lastOpening: number | null = null;
  #counterIntent = false;
  /** Picks power-ups by hand when false (the in-game dev autoplay lets you choose). */
  autoPick = true;

  readonly #touchJitter: number;

  /** `touchJitter` 0 makes a perfect script (used to test the server's script check). */
  constructor(skill: Skill, seed: number, touchJitter = TOUCH_JITTER) {
    this.#skill = skill;
    this.#rng = new Rng(seed);
    this.#touchJitter = touchJitter;
  }

  #uni(): number {
    return (this.#rng.next() + 0.5) / 4294967296;
  }
  #gauss(): number {
    return Math.sqrt(-2 * Math.log(this.#uni())) * Math.cos(2 * Math.PI * this.#uni());
  }
  #p(perMille: number): boolean {
    return this.#rng.next() % 1000 < perMille;
  }

  #respond(sim: TowerSim, a: Attack): void {
    const skill = this.#skill;
    const lead = Math.max(1, a.impact - a.tele);
    let sigma = skill.sigma * (1 + Math.max(0, 30 - lead) / 30);
    if (a.delayed) sigma *= 1.6;
    const at = (center: number) => Math.max(a.tele + skill.react, Math.round(center + skill.bias + (this.#touchJitter ? TOUCH_BIAS : 0) + this.#gauss() * Math.hypot(sigma, this.#touchJitter)));
    if (a.kind !== 'fake' && a.kind !== 'stance' && this.#p(skill.lapse)) return;
    const misread = this.#p(a.twisted && skill.misread > 0 ? skill.misread * 4 + 150 : skill.misread);
    const glasses = sim.has('glasses_glint');
    switch (a.kind) {
      case 'slash':
      case 'kunai':
        if (a.delayed && this.#p(skill.bite * 0.6)) this.#plan.push({ t: at(a.tele + 40), k: 'tap' });
        this.#plan.push({ t: at(a.impact), k: misread && a.kind === 'slash' ? 'dodge' : 'tap' });
        break;
      case 'heavy':
        this.#plan.push({ t: at(a.impact), k: misread ? 'tap' : 'dodge' });
        break;
      case 'fake':
        if (this.#p(glasses ? skill.bite / 2 : skill.bite)) this.#plan.push({ t: at(a.impact), k: 'tap' });
        break;
      case 'stance':
        if (this.#counterIntent) {
          if (this.#p(glasses ? skill.stanceBite / 2 : skill.stanceBite)) this.#plan.push({ t: a.impact + 2 + (this.#rng.next() % 16), k: 'tap' });
          this.#counterIntent = false;
        }
        break;
    }
  }

  beforeStep(sim: TowerSim): void {
    const skill = this.#skill;
    const t = sim.tick;
    if (sim.eraseOffer) {
      // Lose the least useful card: the reverse of the pick order.
      const ranked = sim.eraseOffer.map((b, i) => ({ i, r: PRIORITY.indexOf(b) })).sort((a, b) => b.r - a.r);
      sim.input('pick', skill.smartBoons ? ranked[0]!.i : this.#rng.next() % sim.eraseOffer.length);
      return;
    }
    if (sim.phase === 'boon' && sim.offer) {
      if (!this.autoPick) return;
      let pick = this.#rng.next() % sim.offer.length;
      if (skill.smartBoons) {
        const ranked = sim.offer
          .map((b, i) => ({ i, r: b === 'beach_episode' && sim.hp <= 2 ? -1 : PRIORITY.indexOf(b) }))
          .sort((a, b) => a.r - b.r);
        pick = ranked[0]!.i;
      }
      sim.input('pick', pick);
      return;
    }
    if (sim.phase !== 'fight') {
      this.#plan.length = 0;
      return;
    }
    if (skill.toddler) {
      if (t >= this.#nextMash) {
        sim.input(this.#p(100) ? 'dodge' : 'tap');
        this.#nextMash = t + 9 + (this.#rng.next() % 16);
      }
      return;
    }
    for (const a of sim.attacks) {
      if (a.state === 'pending' && a.tele <= t && !this.#seen.has(a.id)) {
        this.#seen.add(a.id);
        this.#respond(sim, a);
      }
    }
    if (sim.opening && sim.opening.from !== this.#lastOpening) {
      this.#lastOpening = sim.opening.from;
      if (this.#p(skill.counter)) this.#plan.push({ t: sim.opening.from + 3 + Math.round(Math.abs(this.#gauss()) * 4), k: 'tap' });
    }
    const last = sim.events[sim.events.length - 1];
    if (last && last.t === t && last.type === 'dodge' && last.heavy && this.#p(skill.counter)) this.#counterIntent = true;
    this.#plan.sort((x, y) => x.t - y.t);
    while (this.#plan.length && this.#plan[0]!.t <= t) {
      const a = this.#plan.shift()!;
      if (a.t === t) sim.input(a.k);
    }
  }
}
