/**
 * Replays the recorded FINAL-SMOKE turns through the real selection path.
 *
 * The reactions in that log are the storyteller's raw proposals — it ran before
 * suppression existed — so feeding them through the shipped selector shows
 * exactly what the player would see now, without regenerating a word of story.
 */
import { readFileSync, existsSync } from 'node:fs';
import { chooseReaction } from '@plotbreak/director';

const log = JSON.parse(readFileSync(process.argv[2], 'utf8')).log;
const ASSETS = 'infra/seed/assets';
const has = (k) => existsSync(`${ASSETS}/${k}.png`) || existsSync(`${ASSETS}/${k}.webp`);

const locId = new Map();
for (const m of readFileSync('packages/test-fixtures/src/ace.ts', 'utf8')
  .matchAll(/id: '([a-z_]+)',\n\s+name: '([^']+)'/g)) locId.set(m[2], m[1]);

const recent = [];        // most-recent-first, null where nothing shown
const lastAssetTurn = new Map();
const lastSceneTurn = new Map();
let prevLoc = null;
const shownReactions = [], shownScenes = [], rows = [];

for (const r of log) {
  const proposalEvt = r.media.find((m) => m.kind === 'reaction.ready');
  const proposal = proposalEvt
    ? (({ characterId, emotion }) => ({ characterId, emotion }))(JSON.parse(proposalEvt.detail))
    : null;

  const shown = chooseReaction(proposal, recent);
  recent.unshift(shown);

  let reactionCell = '—', since = '';
  if (shown) {
    const key = `story_ace/${shown.characterId}_${shown.emotion}`;
    const prev = lastAssetTurn.get(key);
    since = prev ? `repeat, ${r.turn - prev} turns since` : 'first use';
    reactionCell = `${key}${has(key) ? '' : ' (MISSING)'}`;
    lastAssetTurn.set(key, r.turn);
    shownReactions.push({ turn: r.turn, who: shown.characterId, key });
  } else if (proposal) {
    const prev = lastAssetTurn.get(`story_ace/${proposal.characterId}_${proposal.emotion}`);
    reactionCell = `— suppressed ${proposal.characterId}/${proposal.emotion} (same asset ${prev ? r.turn - prev : '?'} turns ago)`;
  }

  // Scene art is the stage backdrop, which changes on arrival somewhere new.
  const id = locId.get(r.location) ?? null;
  let sceneCell = '—', sceneSince = '';
  if (id && id !== prevLoc) {
    const key = `story_ace/stage_${id}`;
    if (has(key)) {
      const prev = lastSceneTurn.get(key);
      sceneSince = prev ? `repeat, ${r.turn - prev} turns since` : 'first use';
      sceneCell = key;
      lastSceneTurn.set(key, r.turn);
      shownScenes.push({ turn: r.turn, key, repeat: Boolean(prev) });
    }
    prevLoc = id;
  }
  rows.push({ turn: r.turn, reactionCell, since, sceneCell, sceneSince, loc: r.location });
}

console.log('══ T1–T20 MEDIA TIMELINE (replayed through the shipped selector) ══\n');
for (const r of rows) {
  console.log(`T${String(r.turn).padStart(2)}  reaction: ${r.reactionCell.padEnd(48)} ${r.since}`);
  console.log(`     scene:    ${r.sceneCell.padEnd(48)} ${r.sceneSince}`);
}

const gaps = (turns) => {
  const g = turns.slice(1).map((v, i) => v - turns[i]);
  return g.length ? { median: [...g].sort((a, b) => a - b)[Math.floor(g.length / 2)], longest: Math.max(...g) } : null;
};
const rTurns = shownReactions.map((x) => x.turn);
const rg = gaps(rTurns);
let streak = 1, worst = 1;
for (let i = 1; i < shownReactions.length; i++) {
  streak = shownReactions[i].who === shownReactions[i - 1].who ? streak + 1 : 1;
  worst = Math.max(worst, streak);
}
const noGap = Math.max(rTurns[0] ?? 0, ...rTurns.slice(1).map((v, i) => v - rTurns[i]), log.length - (rTurns.at(-1) ?? 0));

console.log(`\n══ REACTION CADENCE ══`);
console.log(`  proposed by the storyteller : ${log.filter((r) => r.media.some((m) => m.kind === 'reaction.ready')).length}/${log.length}`);
console.log(`  actually shown              : ${shownReactions.length}/${log.length} (${Math.round(100 * shownReactions.length / log.length)}%)`);
console.log(`  exact-asset repeats         : ${shownReactions.length - new Set(shownReactions.map((s) => s.key)).size}`);
console.log(`  longest same-character streak: ${worst}`);
console.log(`  median gap ${rg?.median ?? '-'}, longest no-reaction gap ${noGap}`);
const byWho = {};
for (const s of shownReactions) byWho[s.who] = (byWho[s.who] ?? 0) + 1;
console.log(`  distribution: ${Object.entries(byWho).map(([k, v]) => `${k}:${v}`).join(', ')}`);

const sg = gaps(shownScenes.map((s) => s.turn));
console.log(`\n══ SCENE IMAGE CADENCE ══`);
console.log(`  shown on ${shownScenes.length}/${log.length} turns (${Math.round(100 * shownScenes.length / log.length)}%)`);
console.log(`  turns: ${shownScenes.map((s) => s.turn).join(', ')}`);
console.log(`  repeats: ${shownScenes.filter((s) => s.repeat).length}`);
console.log(`  median gap ${sg?.median ?? '-'}, longest gap ${sg?.longest ?? '-'}`);
console.log(`  distinct locations: ${new Set(shownScenes.map((s) => s.key)).size}`);
