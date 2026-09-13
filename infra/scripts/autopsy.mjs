// Forensic dump of one turn: what entered, what the engine decided, what was
// written, and what was committed. Read-only.
import pg from 'pg';
import { readFileSync } from 'node:fs';
const url = readFileSync('.env','utf8').match(/^DATABASE_URL=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const pool = new pg.Pool({ connectionString: url });
const [SID, ...idx] = process.argv.slice(2);
const want = idx.map(Number);
const { rows: snaps } = await pool.query(`SELECT revision, state FROM session_snapshots WHERE session_id=$1 ORDER BY revision`,[SID]);
const byRev = new Map(snaps.map(r=>[r.revision, typeof r.state==='string'?JSON.parse(r.state):r.state]));
const { rows } = await pool.query(`SELECT * FROM turns WHERE session_id=$1 ORDER BY turn_index`,[SID]);
const J = v => typeof v==='string'?JSON.parse(v):v;
for (const r of rows) {
  if (want.length && !want.includes(r.turn_index)) continue;
  const res = J(r.resolution), mut = J(r.mutations), blocks = J(r.blocks), checks = J(r.checks);
  const before = byRev.get(r.revision_after - 1), after = byRev.get(r.revision_after);
  console.log(`\n${'='.repeat(70)}\nTURN ${r.turn_index}`);
  console.log(`ACTION: ${r.action_text ?? '(opening)'}`);
  if (res?.normalizedActions?.length) console.log(`NORMALIZED: ${JSON.stringify(res.normalizedActions)}`);
  console.log(`CHECKS: ${(checks??[]).map(c=>`${c.label}/${c.difficultyLabel}/${c.outcome}`).join(' | ') || '(none)'}`);
  const kinds = {};
  for (const m of mut??[]) kinds[m.type]=(kinds[m.type]||0)+1;
  console.log(`MUTATIONS: ${JSON.stringify(kinds)}`);
  for (const m of mut??[]) if (['LOCATION_CHANGE','FLAG_SET','ENCOUNTER_START','ENCOUNTER_END','QUEST_STEP'].includes(m.type))
    console.log(`   ${m.type} ${m.subjectId} ${JSON.stringify(m.payload).slice(0,110)}`);
  console.log(`LOC: ${before?.player.locationId ?? '?'} -> ${after?.player.locationId ?? '?'}`);
  if (after) console.log(`PRESENT AFTER: ${after.characters.filter(c=>c.locationId===after.player.locationId).map(c=>c.characterId).join(',')}`);
  console.log(`OBSERVABLE: ${JSON.stringify(res?.observableFacts ?? [])}`);
  console.log(`PROSE: ${blocks.map(b=>(b.speakerId?`[${b.speakerId}] `:'')+b.text).join('\n       ').slice(0,900)}`);
  console.log(`END PROMPT: ${r.end_state_prompt}`);
}
await pool.end();
