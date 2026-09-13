/**
 * Dumps one cover brief per story to docs/covers-v4/briefs/<storyId>.md.
 * A brief is the story text a cover prompt is written from: premise, hook,
 * tone, the leads' looks, the opening location. See docs/cover-regen-v4-titled.md.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';

const OUT = 'docs/covers-v4/briefs';
async function main(): Promise<void> {
await mkdir(OUT, { recursive: true });
for (const s of LAUNCH_CATALOG) {
  const hero = s.locations.find((l) => l.id === s.rules.startingLocationId);
  const cast = s.characters.filter((c) => c.appearance?.trim()).slice(0, 4);
  const lines = [
    `# ${s.title} (${s.storyId})`,
    ``,
    `- fantasyLabel: ${s.fantasyLabel}`,
    `- hook: ${(s as any).hook ?? ''}`,
    `- tags: ${s.tags.join(', ')}`,
    `- intensity: ${s.intensity}`,
    `- toneGuide: ${s.rules.toneGuide}`,
    ``,
    `## Premise`,
    ``,
    s.premise,
    ``,
    s.coverDirection ? `## Authored coverDirection (fold this in)\n\n${s.coverDirection}\n` : '',
    `## Opening location`,
    ``,
    hero ? `${hero.name}: ${hero.artDirection}` : '(none)',
    ``,
    `## Cast (cover order = array order, most important first)`,
    ``,
    ...cast.map((c) =>
      [
        `### ${c.name} — ${c.role}`,
        `- cardBlurb: ${c.cardBlurb}`,
        `- appearance: ${c.appearance}`,
        (c as any).visualHook ? `- visualHook: ${(c as any).visualHook}` : '',
        (c as any).silhouette ? `- silhouette: ${(c as any).silhouette}` : '',
        `- publicTraits: ${((c as any).publicTraits ?? []).join(', ')}`,
        ``,
      ].filter(Boolean).join('\n'),
    ),
  ];
  await writeFile(`${OUT}/${s.storyId}.md`, lines.join('\n'));
}
console.log(`${LAUNCH_CATALOG.length} briefs written to ${OUT}`);
}
void main();
