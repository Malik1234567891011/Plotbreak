/**
 * Reads the context arms' metrics and prints the curve.
 *
 * Tokens are the finding; dollars are a projection, because the account exposes
 * no price for these models. Two prices are quoted per arm so the conclusion can
 * be checked against whatever the real one turns out to be.
 */
import { readFileSync, readdirSync } from 'node:fs';

const dir = process.argv[2] ?? `${process.env.CLAUDE_JOB_DIR}/tmp/context`;
const CHECKPOINTS = [10, 40, 80, 120, 160];
/** USD per million. CACHED_RATIO is the discount on a cache hit. */
const IN = 1.25, OUT = 10.0, CACHED_RATIO = 0.1;

const arms = readdirSync(dir).filter((f) => f.endsWith('-metrics.jsonl'));
const data = {};
for (const f of arms) {
  const rows = readFileSync(`${dir}/${f}`, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
  data[f.replace('-metrics.jsonl', '')] = rows.filter((r) => !r.error);
}

const cost = (r) => {
  const cached = r.cachedTokens ?? 0;
  const uncached = r.inputTokens - cached;
  return (uncached * IN + cached * IN * CACHED_RATIO + r.outputTokens * OUT) / 1e6;
};

console.log(`\nprices assumed: $${IN}/M in, $${OUT}/M out, cached at ${CACHED_RATIO * 100}% of input\n`);
for (const [arm, rows] of Object.entries(data)) {
  if (!rows.length) continue;
  console.log(`══ ${arm} — ${rows.length} turns ══`);
  console.log('  turn |   input |  cached | uncached | out  | compactions | $/turn | $ cumulative');
  let cum = 0;
  const cumAt = {};
  for (const r of rows) {
    cum += cost(r);
    cumAt[r.turn] = cum;
    if (CHECKPOINTS.includes(r.turn)) {
      console.log(
        `  ${String(r.turn).padStart(4)} | ${String(r.inputTokens).padStart(7)} | ${String(r.cachedTokens ?? 0).padStart(7)} | ${String(r.inputTokens - (r.cachedTokens ?? 0)).padStart(8)} | ${String(r.outputTokens).padStart(4)} | ${String(rows.filter((x) => x.compacted && x.turn <= r.turn).length).padStart(11)} | ${cost(r).toFixed(4)} | ${cum.toFixed(3)}`,
      );
    }
  }
  const last = rows[rows.length - 1];
  const first10 = rows.slice(0, 10);
  const lastN = rows.slice(-10);
  const avg = (xs, f) => xs.reduce((a, b) => a + f(b), 0) / xs.length;
  console.log(
    `  marginal uncached input: turns 1-10 avg ${Math.round(avg(first10, (r) => r.inputTokens - (r.cachedTokens ?? 0)))}` +
      ` → last 10 avg ${Math.round(avg(lastN, (r) => r.inputTokens - (r.cachedTokens ?? 0)))}`,
  );
  console.log(
    `  median latency ${[...rows].map((r) => r.latencyMs).sort((a, b) => a - b)[Math.floor(rows.length / 2)]} ms` +
      ` · total $${cum.toFixed(3)} over ${last.turn} turns · $${(cum / last.turn).toFixed(4)}/turn avg\n`,
  );
}

// Credit economics (section L): 600 free credits = 10 turns, $20 = 21,000 credits.
const PER_TURN_CREDITS = 60, PACK_USD = 20, PACK_CREDITS = 21000;
const grossPerTurn = PACK_USD / (PACK_CREDITS / PER_TURN_CREDITS);
console.log(`credit economics: ${PER_TURN_CREDITS} credits/turn, $${grossPerTurn.toFixed(5)} gross revenue per turn`);
for (const [arm, rows] of Object.entries(data)) {
  if (!rows.length) continue;
  const total = rows.reduce((a, r) => a + cost(r), 0);
  const per = total / rows.length;
  const free = rows.slice(0, 10).reduce((a, r) => a + cost(r), 0);
  console.log(
    `  ${arm.padEnd(14)} $${per.toFixed(4)}/turn → margin ${(((grossPerTurn - per) / grossPerTurn) * 100).toFixed(1)}%` +
      ` · 10 free turns cost $${free.toFixed(4)}` +
      ` · 350-turn pack projects $${(per * 350).toFixed(2)} against $20`,
  );
}
