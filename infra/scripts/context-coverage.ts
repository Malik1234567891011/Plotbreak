/**
 * Which authored fields reach the storyteller, and which never have.
 *
 * Three classes of foundational authoring turned out to be invisible to the
 * model — quest items, hardCanon, archetypes — each found only when a playtest
 * went wrong. This asks the question statically instead: for every top-level
 * field a bible can carry, does any of its content appear in the assembled
 * prompt?
 */
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { worldBrief } from '@plotbreak/director';
import type { StoryVersion } from '@plotbreak/contracts';

/** A probe string for a field: something distinctive from its content. */
type Probe = (story: StoryVersion) => string | null;

const FIELDS: Array<[keyof StoryVersion | string, Probe]> = [
  ['title', (s) => s.title],
  ['premise', (s) => s.premise.slice(0, 60)],
  ['hook', (s) => (s as any).hook?.slice(0, 60) ?? null],
  ['fantasyLabel', (s) => (s as any).fantasyLabel?.slice(0, 40) ?? null],
  ['creatorNote', (s) => (s as any).creatorNote?.slice(0, 50) ?? null],
  ['opening', (s) => (s as any).opening?.slice(0, 60) ?? null],
  ['openingSuggestions', (s) => (s as any).openingSuggestions?.[0]?.slice(0, 40) ?? null],
  ['rules.toneGuide', (s) => s.rules.toneGuide.slice(0, 50)],
  ['rules.hardCanon', (s) => s.rules.hardCanon[0]?.slice(0, 50) ?? null],
  ['protagonist', (s) => (s.protagonist as any).description?.slice(0, 50) ?? null],
  ['archetypes', (s) => s.archetypes[0]?.summary?.slice(0, 50) ?? null],
  ['characters.role', (s) => s.characters[0]?.role?.slice(0, 50) ?? null],
  ['characters.cardBlurb', (s) => s.characters[0]?.cardBlurb?.slice(0, 50) ?? null],
  ['characters.hiddenDrives', (s) => s.characters.find((c) => c.hiddenDrives.length)?.hiddenDrives[0]?.slice(0, 50) ?? null],
  ['characters.values', (s) => s.characters.find((c) => c.values.length)?.values[0]?.slice(0, 50) ?? null],
  ['characters.boundaries', (s) => s.characters.find((c) => c.boundaries.length)?.boundaries[0]?.slice(0, 50) ?? null],
  ['characters.secrets', (s) => s.characters.find((c) => c.secrets.length)?.secrets[0]?.fact?.slice(0, 50) ?? null],
  ['characters.voiceSamples', (s) => s.characters.find((c) => c.voiceSamples.length)?.voiceSamples[0]?.slice(0, 40) ?? null],
  ['characters.speechStyle', (s) => s.characters.find((c) => c.speechStyle)?.speechStyle?.slice(0, 40) ?? null],
  ['characters.appearance', (s) => s.characters.find((c) => c.appearance)?.appearance?.slice(0, 40) ?? null],
  ['characters.schedule', (s) => (s.characters.find((c) => c.schedule?.length) as any)?.schedule?.[0]?.activity?.slice(0, 30) ?? null],
  ['characters.startingRelationship', () => null],
  ['characters.gates', (s) => (s.characters.find((c: any) => c.gates?.length) as any)?.gates?.[0]?.copy?.slice(0, 40) ?? null],
  ['locations.description', (s) => s.locations[0]?.description?.slice(0, 50) ?? null],
  ['locations.artDirection', (s) => (s.locations[0] as any)?.artDirection?.slice(0, 40) ?? null],
  ['locations.connections', () => null],
  ['locations.takeableItems', () => null],
  ['items (questItem)', (s) => s.items.find((i: any) => i.questItem)?.description?.slice(0, 50) ?? null],
  ['items (ordinary)', (s) => s.items.find((i: any) => !i.questItem)?.description?.slice(0, 50) ?? null],
  ['items.loreText', (s) => (s.items.find((i: any) => i.questItem) as any)?.loreText?.slice(0, 50) ?? null],
  ['factions', (s) => s.factions[0]?.description?.slice(0, 50) ?? null],
  ['quests.summary', (s) => s.quests[0]?.summary?.slice(0, 50) ?? null],
  ['quests.steps', (s) => (s.quests[0] as any)?.steps?.[0]?.playerCopy?.slice(0, 40) ?? null],
  ['worldEvents.publicCopy', (s) => s.worldEvents[0]?.publicCopy?.slice(0, 50) ?? null],
  ['worldEvents.directorNotes', (s) => (s.worldEvents[0] as any)?.directorNotes?.slice(0, 50) ?? null],
  ['promises', (s) => (s as any).promises?.[0]?.copy?.slice(0, 40) ?? (s as any).promises?.[0]?.text?.slice(0, 40) ?? null],
  ['endings', (s) => s.endings[0]?.name ?? null],
  ['abilities', (s) => (s as any).abilities?.[0]?.description?.slice(0, 40) ?? null],
  ['skills', (s) => (s as any).skills?.[0]?.name ?? null],
  ['resources', (s) => (s as any).resources?.[0]?.name ?? null],
  ['attributes', () => null],
  ['tags', (s) => (s as any).tags?.[0] ?? null],
  ['mechanicsChips', (s) => (s as any).mechanicsChips?.[0]?.slice(0, 30) ?? null],
  ['contentDescriptors', (s) => (s as any).contentDescriptors?.[0]?.slice(0, 30) ?? null],
  ['setupFields', (s) => (s as any).setupFields?.[0]?.label?.slice(0, 30) ?? null],
  ['coverDirection', (s) => (s as any).coverDirection?.[0]?.slice(0, 30) ?? null],
];

const stories = LAUNCH_CATALOG as unknown as StoryVersion[];
console.log(`field                          delivered in N of ${stories.length} stories   (probe found in prompt)`);
for (const [name, probe] of FIELDS) {
  let authored = 0;
  let delivered = 0;
  for (const story of stories) {
    let value: string | null = null;
    try { value = probe(story); } catch { value = null; }
    if (!value) continue;
    authored += 1;
    const brief = worldBrief(story, story.archetypes[0]?.id ?? null);
    if (brief.includes(value)) delivered += 1;
  }
  if (authored === 0) { console.log(`  ${name.padEnd(30)} — not authored / not probeable`); continue; }
  const mark = delivered === 0 ? 'NEVER' : delivered === authored ? 'always' : `${delivered}/${authored}`;
  console.log(`  ${name.padEnd(30)} ${String(mark).padEnd(8)} (authored in ${authored})`);
}
