/**
 * Pre-suite checks for a new story: the three recurring authoring errors from
 * docs/stories-checkpoint.md, plus the new-50 quality bar items a machine can
 * check (docs/stories-50/PLAN.md §7). Run it before `npm test`; it takes a second
 * and names the exact field to fix.
 *
 *   npx tsx infra/scripts/story-checks.ts <slug | path/to/fixture.ts>
 *   npx tsx infra/scripts/story-checks.ts skill-error
 *
 * Exits 1 on any FAIL. WARN lines are for a human to read, not blockers.
 */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

type Json = Record<string, unknown>;
const fails: string[] = [];
const warns: string[] = [];

async function load(arg: string): Promise<Json> {
  const path = existsSync(arg) ? resolve(arg) : join(ROOT, 'packages/test-fixtures/src', `${arg}.ts`);
  if (!existsSync(path)) throw new Error(`No fixture at ${path}`);
  const mod = (await import(pathToFileURL(path).href)) as Record<string, unknown>;
  const story = Object.values(mod).find(
    (v): v is Json => typeof v === 'object' && v !== null && 'storyId' in v && 'characters' in v,
  );
  if (!story) throw new Error(`${path} exports no story object`);
  return story;
}

/** Every string inside arrays under the given keys, anywhere in the tree. */
function collect(node: unknown, keys: ReadonlySet<string>, out = new Set<string>(), under = false): Set<string> {
  if (Array.isArray(node)) {
    for (const item of node) {
      if (under && typeof item === 'string') out.add(item);
      else collect(item, keys, out, false);
    }
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (keys.has(k) && typeof v === 'string' && v) out.add(v);
      else collect(v, keys, out, keys.has(k));
    }
  }
  return out;
}

const words = (s: string): number => s.trim().split(/\s+/).filter(Boolean).length;

async function main(): Promise<void> {
  const arg = process.argv[2];
  if (!arg) {
    console.error('usage: story-checks.ts <slug | path/to/fixture.ts>');
    process.exit(2);
  }
  const s = await load(arg);
  const characters = (s.characters as Json[]) ?? [];
  const locations = (s.locations as Json[]) ?? [];
  const abilities = (s.abilities as Json[]) ?? [];
  const quests = (s.quests as Json[]) ?? [];

  // 1. Every gated ability is granted by some step's rewards.abilities.
  const granted = new Set<string>();
  for (const q of quests) {
    for (const step of (q.steps as Json[]) ?? []) {
      for (const a of (((step.rewards as Json | undefined)?.abilities as string[]) ?? [])) granted.add(a);
    }
    for (const a of (((q.rewards as Json | undefined)?.abilities as string[]) ?? [])) granted.add(a);
  }
  for (const arch of (s.archetypes as Json[]) ?? []) {
    for (const a of (arch.startingAbilities as string[]) ?? []) granted.add(a);
  }
  for (const a of abilities) {
    if (a.unlockedByDefault === false && !granted.has(String(a.id))) {
      fails.push(`ability ${String(a.id)} is unlockedByDefault: false and no step's rewards.abilities or archetype startingAbilities grants it`);
    }
  }

  // 2. cardBlurb: second person, > 20 chars, not the role.
  for (const c of characters) {
    const blurb = String(c.cardBlurb ?? '');
    if (!blurb.trim()) continue;
    if (!/\byou(r)?\b/i.test(blurb)) fails.push(`character ${String(c.id)}: cardBlurb has no "you"/"your"`);
    if (blurb.length <= 20) fails.push(`character ${String(c.id)}: cardBlurb is 20 chars or fewer`);
    if (blurb === c.role) fails.push(`character ${String(c.id)}: cardBlurb equals role`);
    if (!String(c.appearance ?? '').trim()) fails.push(`character ${String(c.id)}: has a cardBlurb but no appearance (portraits are drawn from it)`);
  }

  // 3. Every location except the start has an inbound edge.
  const start = String((s.rules as Json | undefined)?.startingLocationId ?? '');
  const ids = new Set(locations.map((l) => String(l.id)));
  const inbound = new Set<string>();
  for (const l of locations) {
    for (const e of (l.connections as Json[]) ?? []) {
      const to = String(e.to);
      if (!ids.has(to)) fails.push(`location ${String(l.id)} connects to unknown location ${to}`);
      inbound.add(to);
    }
  }
  for (const id of ids) if (id !== start && !inbound.has(id)) fails.push(`location ${id} has no inbound connection`);
  if (!ids.has(start)) fails.push(`rules.startingLocationId ${start} is not a location`);

  // Flags read but never written. A RelationshipGate id used as a flag lands here.
  const written = collect(s, new Set(['setsFlags', 'flags']));
  const read = collect(s, new Set(['flagsSet', 'cancelledByFlags', 'lockedByFlag', 'flagsUnset']));
  for (const f of read) {
    // The engine writes these itself (packages/engine: spoke:, visited:, met:, used:, left:, left_the_map).
    if (/^(spoke|visited|met|used|left):/.test(f) || f === 'left_the_map') continue;
    if (!written.has(f)) warns.push(`flag ${f} is read but nothing in the story data sets it`);
  }

  // New-50 quality bar (PLAN.md §7), the parts a machine can check.
  const opening = String(s.opening ?? '');
  if (words(opening) > 120) fails.push(`opening is ${words(opening)} words (max 120)`);
  const firstQuote = opening.search(/["“]/);
  if (firstQuote < 0) fails.push('opening has no dialogue: a named character must speak in the first 60 words');
  else if (words(opening.slice(0, firstQuote)) > 60) fails.push(`first line of dialogue starts after ${words(opening.slice(0, firstQuote))} words (max 60)`);
  const tail = opening.trim().slice(-160);
  if (!/[?]/.test(tail) && !/\b(kneel|choose|tell|answer|decide|now)\b/i.test(tail)) {
    warns.push('opening does not end on a question or a demand');
  }
  const suggestions = (s.openingSuggestions as string[]) ?? [];
  if (suggestions.length !== 3) fails.push(`openingSuggestions has ${suggestions.length} entries (want 3: one said, one done, one risky)`);
  if (!s.openingPanel) fails.push('no openingPanel (the panel art is drawn from openingPanel.alt)');
  else if (!characters.some((c) => String((s.openingPanel as Json).alt).startsWith(String(c.name).split(' ')[0]!))) {
    warns.push('openingPanel.alt does not start with a character name; the panel art uses that character as reference');
  }
  if (!String(s.coverDirection ?? '').trim()) fails.push('no coverDirection (the PixAI cover is painted from it)');
  if (((s.prologue as unknown[]) ?? []).length > 0) warns.push('has a prologue: the new-50 stories open straight on the scene');
  const portraits = characters.filter((c) => String(c.cardBlurb ?? '').trim()).length;
  if (portraits < 3) warns.push(`only ${portraits} characters with a cardBlurb (the cover uses the first 3 with an appearance)`);

  console.log(`${String(s.storyId)}: ${characters.length} characters, ${locations.length} locations, ${abilities.length} abilities, ${quests.length} quests`);
  for (const w of warns) console.log(`WARN  ${w}`);
  for (const f of fails) console.log(`FAIL  ${f}`);
  console.log(fails.length ? `${fails.length} FAIL` : 'all checks pass');
  if (fails.length) process.exit(1);
}

void main();
