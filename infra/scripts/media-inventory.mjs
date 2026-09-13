/**
 * What art actually exists, per story.
 *
 * Inventory only — this generates nothing. Counts unique images rather than
 * files, because every asset is stored twice (png and webp) and counting files
 * would double the library on paper.
 */
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'infra/seed/assets';
const EMOTIONS = ['neutral','warm','amused','surprised','confused','annoyed','angry','worried'];

function classify(base, story) {
  if (base === 'cover') return 'cover';
  if (base === 'keyart' || base === 'key_art') return 'keyart';
  if (base === 'protagonist') return 'protagonist';
  if (base.startsWith('stage_')) return 'location';
  const emotion = EMOTIONS.find((e) => base.endsWith(`_${e}`));
  if (emotion) return 'reaction';
  return 'portrait';
}

const stories = readdirSync(ROOT).filter(
  (d) => d.startsWith('story_') && statSync(join(ROOT, d)).isDirectory(),
);

const rows = [];
for (const story of stories) {
  const files = readdirSync(join(ROOT, story)).filter((f) => /\.(png|webp|jpg)$/i.test(f));
  const unique = new Map(); // base name -> formats
  for (const f of files) {
    const base = f.replace(/\.(png|webp|jpg)$/i, '');
    unique.set(base, [...(unique.get(base) ?? []), f.split('.').pop()]);
  }
  const counts = { cover: 0, keyart: 0, protagonist: 0, location: 0, reaction: 0, portrait: 0 };
  const perCharacter = new Map();
  const locations = [];
  for (const base of unique.keys()) {
    const kind = classify(base, story);
    counts[kind] += 1;
    if (kind === 'location') locations.push(base.replace(/^stage_/, ''));
    if (kind === 'reaction' || kind === 'portrait') {
      const who = kind === 'reaction' ? base.replace(new RegExp(`_(${EMOTIONS.join('|')})$`), '') : base;
      const entry = perCharacter.get(who) ?? { portrait: 0, reactions: 0 };
      if (kind === 'reaction') entry.reactions += 1; else entry.portrait += 1;
      perCharacter.set(who, entry);
    }
  }
  rows.push({ story, files: files.length, unique: unique.size, ...counts, perCharacter, locations });
}

rows.sort((a, b) => b.unique - a.unique);
console.log('story                     files  uniq  cover  key  prot  locs  portr  react');
for (const r of rows) {
  console.log(
    `${r.story.padEnd(24)} ${String(r.files).padStart(5)} ${String(r.unique).padStart(5)} ` +
    `${String(r.cover).padStart(6)} ${String(r.keyart).padStart(4)} ${String(r.protagonist).padStart(5)} ` +
    `${String(r.location).padStart(5)} ${String(r.portrait).padStart(6)} ${String(r.reaction).padStart(6)}`,
  );
}
const tot = (k) => rows.reduce((a, r) => a + r[k], 0);
console.log(`\nTOTAL unique images: ${tot('unique')} across ${rows.length} stories ` +
  `(${tot('location')} location, ${tot('portrait')} portrait, ${tot('reaction')} reaction)`);

// Shared surfaces
for (const extra of ['hero', 'player']) {
  if (existsSync(join(ROOT, extra))) {
    const f = readdirSync(join(ROOT, extra)).filter((x) => /\.(png|webp|jpg)$/i.test(x));
    console.log(`shared/${extra}: ${f.length} files`);
  }
}

const ace = rows.find((r) => r.story === 'story_ace');
if (ace) {
  console.log('\n═══ ACE detail ═══');
  console.log('characters:');
  for (const [who, c] of [...ace.perCharacter].sort()) {
    console.log(`  ${who.padEnd(14)} portrait:${c.portrait}  reactions:${c.reactions}/8`);
  }
  console.log(`locations (${ace.locations.length}): ${ace.locations.sort().join(', ')}`);
  console.log('event-specific art: none — no asset class exists for events');
}
