import type { StoryVersion } from '@plotbreak/contracts';

/**
 * A picture for every role on the "Who are you?" grid, from art the story
 * already ships.
 *
 * Roles have no art of their own (`ArchetypeDef` has no image), and drawing
 * one per role would be 300-odd new images, each held to the cover style. Every
 * published world does ship a stage image per location, and at least as many
 * of them as it has roles, so each role borrows one. The design board's own
 * role tiles are exactly this: Hush House stage images.
 *
 * Returns asset keys, not URLs; the projection resolves them.
 */

/**
 * Hand picks, `storyId → archetypeId → locationId`, for when the evenly spaced
 * default lands a role on a room that says nothing about it. Seeded with the
 * design board's Hush House tiles; add to it by hand. A pick whose location has
 * no stage image (or does not exist) is ignored, and the role falls back to the
 * default spread.
 */
export const ARCHETYPE_ART_OVERRIDES: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  story_hush_house: {
    arch_between_places: 'bellweather',
    arch_night_shift: 'hall_third',
    arch_reads_everything: 'room_314',
    arch_camera_on: 'floor_zero',
  },
};

/**
 * `archetypeId → asset key | null` for every archetype in the story.
 *
 * The stage images, in authored order, minus the starting location when there
 * are more stages than roles (the prologue already opens on that room, so it
 * would be the one picture the player sees twice). Picks are evenly spaced,
 * `floor(i * n / k)`, so neighbouring tiles do not show neighbouring rooms, and
 * no stage is used twice. A role left without a stage gets the key art, then
 * the cover, then null.
 */
export function archetypeImages(
  story: Pick<StoryVersion, 'storyId' | 'archetypes' | 'locations' | 'rules' | 'keyArt' | 'coverImage'>,
): Map<string, string | null> {
  const images = new Map<string, string | null>();
  const roles = story.archetypes;
  if (roles.length === 0) return images;

  const staged = story.locations.filter(
    (location): location is typeof location & { stageImage: string } =>
      typeof location.stageImage === 'string' && location.stageImage.length > 0,
  );
  const used = new Set<string>();

  const overrides = ARCHETYPE_ART_OVERRIDES[story.storyId] ?? {};
  for (const role of roles) {
    const locationId = overrides[role.id];
    if (!locationId || used.has(locationId)) continue;
    const location = staged.find((l) => l.id === locationId);
    if (!location) continue;
    images.set(role.id, location.stageImage);
    used.add(location.id);
  }

  const startingId = story.rules.startingLocationId;
  const pool = (staged.length > roles.length ? staged.filter((l) => l.id !== startingId) : staged).filter(
    (l) => !used.has(l.id),
  );
  const rest = roles.filter((role) => !images.has(role.id));
  const fallback = story.keyArt || story.coverImage || null;

  rest.forEach((role, i) => {
    // With at least as many stages as roles the spacing never repeats one;
    // with fewer, the first `pool.length` roles get a stage each and the rest
    // fall back rather than show the same room twice.
    const index = pool.length >= rest.length ? Math.floor((i * pool.length) / rest.length) : i;
    const location = pool[index];
    images.set(role.id, location ? location.stageImage : fallback);
  });

  return images;
}
