/**
 * What the bible holds versus what the storyteller is told.
 *
 * Ace showed this is a real class of bug: authored depth that never leaves the
 * fixture. This compares the two per story and names what is dropped.
 */
import { ACE, ITACHI, LIGHT, LAST_FIVE, SALT_ROAD } from '@plotbreak/test-fixtures';
import { worldBrief } from '@plotbreak/director';
import type { StoryVersion } from '@plotbreak/contracts';

const STORIES: Array<[string, StoryVersion]> = [
  ['ACE', ACE], ['ITACHI', ITACHI], ['LIGHT', LIGHT], ['LAST_FIVE', LAST_FIVE], ['SALT_ROAD', SALT_ROAD],
];

for (const [name, story] of STORIES) {
  const brief = worldBrief(story);
  const has = (text: string) => brief.includes(text);
  console.log(`\n═══ ${name} — ${story.title} ═══`);
  console.log(`  brief: ${brief.length} chars (~${Math.round(brief.length / 4)} tokens)`);
  console.log(`  cast ${story.characters.length} · locations ${story.locations.length} · items ${story.items.length}` +
    ` · factions ${story.factions.length} · quests ${story.quests.length} · worldEvents ${story.worldEvents.length}`);

  const missing: string[] = [];
  // Items are never emitted by worldBrief at all.
  const questItems = story.items.filter((i) => (i as { questItem?: boolean }).questItem);
  const absentQuestItems = questItems.filter((item) => !has(item.name));
  if (absentQuestItems.length) {
    missing.push(`${absentQuestItems.length}/${questItems.length} quest items — e.g. "${absentQuestItems[0]!.name}"`);
  }
  for (const [label, list] of [
    ['factions', story.factions.map((f) => f.name)],
    ['quests', story.quests.map((q) => q.title)],
    ['worldEvents', story.worldEvents.map((e) => e.publicCopy)],
  ] as const) {
    const absent = list.filter((entry) => entry && !has(entry.slice(0, 40)));
    if (absent.length) missing.push(`${absent.length}/${list.length} ${label}`);
  }
  const secretsSent = story.characters.filter((c) => c.secrets.length && has(c.secrets[0]!.fact.slice(0, 40))).length;
  const withSecrets = story.characters.filter((c) => c.secrets.length).length;
  console.log(`  secrets reaching the model: ${secretsSent}/${withSecrets} characters`);
  console.log(missing.length ? `  NOT SENT: ${missing.join('; ')}` : '  nothing obviously dropped');

  // The premise objects a story cannot be played without.
  if (questItems.length) {
    console.log(`  quest items: ${questItems.map((i) => i.name).join(', ')}`);
  }
}
