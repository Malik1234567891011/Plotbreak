/** Prints where each simulated player falls. `npm run tune -w @plotbreak/tower [runs]` */
import { PAYOUT_TIERS, payoutFor, ENTRY_FEE } from './content.js';
import { SKILLS, playBot } from './bots.js';
import { daySeed } from './rng.js';

const runs = Number(process.argv[2] ?? 200);
const bands = [...PAYOUT_TIERS.map((t) => `${t.from}-${t.to}`), 'CLEAR'];
console.log(['player'.padEnd(12), ...bands.map((b) => b.padStart(6)), 'median', ' avg$', ' min'].join(' '));
for (const skill of SKILLS) {
  const counts = new Array(bands.length).fill(0);
  const fell: number[] = [];
  let pay = 0, ticks = 0;
  for (let i = 0; i < runs; i++) {
    const r = playBot(daySeed(`2026-11-${(i % 28) + 1}`) ^ (i * 7919), skill, 1000 + i);
    const idx = r.cleared ? bands.length - 1 : PAYOUT_TIERS.findIndex((t) => r.fellOn >= t.from && r.fellOn <= t.to);
    counts[idx]++;
    fell.push(r.fellOn);
    pay += payoutFor(r.fellOn, r.cleared);
    ticks += r.ticks;
  }
  fell.sort((a, b) => a - b);
  console.log([
    skill.name.padEnd(12),
    ...counts.map((c) => `${Math.round((c / runs) * 100)}%`.padStart(6)),
    String(fell[Math.floor(runs / 2)]).padStart(6),
    (pay / runs - ENTRY_FEE).toFixed(0).padStart(5),
    (ticks / runs / 3600).toFixed(1).padStart(4),
  ].join(' '));
}
