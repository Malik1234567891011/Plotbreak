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

const PRIORITY: readonly BoonId[] = [
  'plot_armor', 'rivals_respect', 'friendship', 'time_skip', 'training_arc', 'flashback',
  'beach_episode', 'bento', 'filler_episode', 'glasses_glint', 'battle_cry', 'second_form', 'truck_kun', 'chuunibyou',
];

export function playBot(seed: number, skill: Skill, botSeed: number): RunResult {
  return playBotInto(new TowerSim(seed), skill, botSeed);
}

/** Same, on a sim the caller holds (so its recorded inputs can be read afterwards). */
export function playBotInto(sim: TowerSim, skill: Skill | number, botSeed = 7): RunResult {
  if (typeof skill === 'number') skill = SKILLS[skill]!;
  const rng = new Rng(botSeed);
  const uni = () => (rng.next() + 0.5) / 4294967296;
  const gauss = () => Math.sqrt(-2 * Math.log(uni())) * Math.cos(2 * Math.PI * uni());
  const p = (perMille: number) => rng.next() % 1000 < perMille;

  const plan: { t: number; k: 'tap' | 'swipe' }[] = [];
  const seen = new Set<number>();
  let nextMash = 0;
  let lastOpening: number | null = null;
  let counterIntent: { at: number } | null = null;

  const glasses = () => sim.has('glasses_glint');

  const respond = (a: Attack) => {
    const lead = Math.max(1, a.impact - a.tele);
    let sigma = skill.sigma * (1 + Math.max(0, 30 - lead) / 30);
    if (a.delayed) sigma *= 1.6;
    const at = (center: number) => Math.max(a.tele + skill.react, Math.round(center + skill.bias + gauss() * sigma));
    if (a.kind !== 'fake' && a.kind !== 'stance' && p(skill.lapse)) return;
    const misread = p(a.twisted ? skill.misread * 4 + 150 : skill.misread);
    switch (a.kind) {
      case 'slash':
      case 'kunai':
        if (a.delayed && p(skill.bite * 0.6)) plan.push({ t: at(a.tele + 40), k: 'tap' });
        plan.push({ t: at(a.impact), k: misread && a.kind === 'slash' ? 'swipe' : 'tap' });
        break;
      case 'heavy':
        plan.push({ t: at(a.impact), k: misread ? 'tap' : 'swipe' });
        break;
      case 'fake':
        if (p(glasses() ? skill.bite / 2 : skill.bite)) plan.push({ t: at(a.impact), k: 'tap' });
        break;
      case 'stance':
        if (counterIntent) {
          if (p(glasses() ? skill.stanceBite / 2 : skill.stanceBite)) plan.push({ t: a.impact + 2 + (rng.next() % 16), k: 'tap' });
          counterIntent = null;
        }
        break;
    }
  };

  while (!sim.over && sim.tick < 60 * 60 * 30) {
    const t = sim.tick;
    if (sim.phase === 'boon' && sim.offer) {
      let pick = rng.next() % sim.offer.length;
      if (skill.smartBoons) {
        const ranked = sim.offer.map((b, i) => ({ i, r: PRIORITY.indexOf(b) }))
          .map((x) => ({ ...x, r: sim.offer![x.i] === 'beach_episode' && sim.hp <= 2 ? -1 : x.r }))
          .sort((a, b) => a.r - b.r);
        pick = ranked[0]!.i;
      }
      sim.input('pick', pick);
    } else if (sim.phase === 'fight') {
      if (skill.toddler) {
        if (t >= nextMash) {
          sim.input(p(100) ? 'swipe' : 'tap');
          nextMash = t + 9 + (rng.next() % 16);
        }
      } else {
        for (const a of sim.attacks) {
          if (a.state === 'pending' && a.tele <= t && !seen.has(a.id)) {
            seen.add(a.id);
            respond(a);
          }
        }
        if (sim.opening && sim.opening.from !== lastOpening) {
          lastOpening = sim.opening.from;
          if (p(skill.counter)) plan.push({ t: sim.opening.from + 3 + Math.round(Math.abs(gauss()) * 4), k: 'tap' });
        }
        // After dodging a heavy a player wants to counter; whether a stance stops them is decided above.
        const last = sim.events[sim.events.length - 1];
        if (last && last.t === t && last.type === 'dodge' && last.heavy && p(skill.counter)) counterIntent = { at: t };
        plan.sort((x, y) => x.t - y.t);
        while (plan.length && plan[0]!.t <= t) {
          const a = plan.shift()!;
          if (a.t === t) sim.input(a.k);
        }
      }
    } else {
      plan.length = 0;
    }
    sim.step();
  }
  return sim.result();
}
