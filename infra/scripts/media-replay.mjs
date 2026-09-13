/**
 * Replays the reviewed 45-turn transcript through the pre-generated media
 * selection path. Selects nothing new and generates nothing — it answers "what
 * would the client actually have been shown".
 */
import { readFileSync, existsSync } from 'node:fs';
import { Pool } from 'pg';

const SESSION = process.argv[2];
const ASSETS = 'infra/seed/assets';
const has = (key) => existsSync(`${ASSETS}/${key}.png`) || existsSync(`${ASSETS}/${key}.webp`);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query(
  `SELECT turn_index, blocks, scene_summary FROM turns WHERE session_id=$1 AND turn_index > 0 ORDER BY turn_index`,
  [SESSION],
);
await pool.end();

const log = JSON.parse(readFileSync(process.argv[3], 'utf8')).log;
const locIdOf = new Map(); // display name -> id, from the fixture
const ace = readFileSync('packages/test-fixtures/src/ace.ts', 'utf8');
for (const m of ace.matchAll(/id: '([a-z_]+)',\n\s+name: '([^']+)'/g)) locIdOf.set(m[2], m[1]);

let prevLocation = null;
const timeline = [];
const reactionShown = [];
const sceneShown = [];
const seenScene = new Map();

for (const [i, row] of rows.entries()) {
  const turn = i + 1;
  const entry = log[i] ?? {};
  const locId = locIdOf.get(entry.location) ?? null;

  // Scene/story image: the stage backdrop, which changes when the player
  // arrives somewhere new. That is the existing proven selection path.
  let scene = null;
  if (locId && locId !== prevLocation) {
    const key = `story_ace/stage_${locId}`;
    if (has(key)) {
      scene = key;
      sceneShown.push({ turn, key, repeat: seenScene.has(key) });
      seenScene.set(key, turn);
    }
    prevLocation = locId;
  }

  // Character reaction: whoever the turn attributes dialogue to. The exact
  // emotion the model picked is not persisted on the turn, so this reports
  // availability by character; the emotion is checked against the eight that
  // exist for them.
  const speakers = [...new Set((row.blocks ?? []).map((b) => b.speakerId).filter(Boolean))];
  const primary = speakers[0] ?? null;
  let reaction = null;
  if (primary && has(`story_ace/${primary}_neutral`)) {
    reaction = `story_ace/${primary}_<emotion>`;
    reactionShown.push({ turn, who: primary });
  }
  timeline.push(
    `T${String(turn).padStart(2)} ${scene ? `scene:${scene.replace('story_ace/stage_', '')}` : '—'}` +
    `${reaction ? `  reaction:${primary}` : ''}`,
  );
}

const gaps = (list) => {
  const t = list.map((x) => x.turn);
  const g = t.slice(1).map((v, i) => v - t[i]);
  return g.length ? { median: g.sort((a, b) => a - b)[Math.floor(g.length / 2)], longest: Math.max(...g) } : { median: '-', longest: '-' };
};

console.log('══ VISUAL TIMELINE ══');
console.log(timeline.join('\n'));

const rg = gaps(reactionShown), sg = gaps(sceneShown);
console.log(`\n══ CHARACTER REACTIONS ══`);
console.log(`  shown on ${reactionShown.length}/${rows.length} turns (${Math.round(100*reactionShown.length/rows.length)}%)`);
console.log(`  median gap ${rg.median}, longest gap ${rg.longest}`);
const byWho = {};
for (const r of reactionShown) byWho[r.who] = (byWho[r.who] ?? 0) + 1;
console.log(`  by character: ${Object.entries(byWho).map(([k,v])=>`${k}:${v}`).join(', ')}`);
let streak = 1, worst = 1;
for (let i = 1; i < reactionShown.length; i++) {
  streak = reactionShown[i].who === reactionShown[i-1].who && reactionShown[i].turn === reactionShown[i-1].turn + 1 ? streak + 1 : 1;
  worst = Math.max(worst, streak);
}
console.log(`  longest same-character consecutive streak: ${worst}`);

console.log(`\n══ SCENE / STORY IMAGES ══`);
console.log(`  shown on ${sceneShown.length}/${rows.length} turns (${Math.round(100*sceneShown.length/rows.length)}%)`);
console.log(`  turns: ${sceneShown.map(s=>s.turn).join(', ')}`);
console.log(`  median gap ${sg.median}, longest gap ${sg.longest}`);
console.log(`  repeats: ${sceneShown.filter(s=>s.repeat).length} of ${sceneShown.length}`);
console.log(`  distinct locations used: ${new Set(sceneShown.map(s=>s.key)).size} of 17 available`);
