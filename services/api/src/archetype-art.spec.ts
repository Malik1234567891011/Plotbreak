import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { StoryVersion } from '@plotbreak/contracts';
import { HUSH_HOUSE, LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { ARCHETYPE_ART_OVERRIDES, archetypeImages } from './archetype-art.js';
import { toStoryDetail } from './projections.js';
import { EMPTY_SIGNALS } from './repo/types.js';

/**
 * Role tiles borrow the story's own stage images. Free, already shipped, and
 * what the design board draws.
 */

/** A story with `stages` stage-image locations and `roles` archetypes. */
function synthetic(stages: number, roles: number, overrides: Partial<StoryVersion> = {}): StoryVersion {
  const base = HUSH_HOUSE;
  const template = base.locations[0]!;
  const archetype = base.archetypes[0]!;
  return {
    ...base,
    storyId: 'story_synthetic',
    locations: Array.from({ length: stages }, (_, i) => ({
      ...template,
      id: `loc_${i}`,
      stageImage: `story_synthetic/stage_loc_${i}`,
    })),
    archetypes: Array.from({ length: roles }, (_, i) => ({ ...archetype, id: `arch_${i}` })),
    rules: { ...base.rules, startingLocationId: 'loc_0' },
    keyArt: 'story_synthetic/key_art',
    coverImage: 'story_synthetic/cover',
    ...overrides,
  };
}

describe('archetypeImages', () => {
  it('gives Hush House the four pictures on the board', () => {
    const images = archetypeImages(HUSH_HOUSE);
    expect(Object.fromEntries(images)).toEqual({
      arch_between_places: 'story_hush_house/stage_bellweather',
      arch_night_shift: 'story_hush_house/stage_hall_third',
      arch_reads_everything: 'story_hush_house/stage_room_314',
      arch_camera_on: 'story_hush_house/stage_floor_zero',
    });
  });

  it('only overrides roles and locations that exist', () => {
    for (const [storyId, picks] of Object.entries(ARCHETYPE_ART_OVERRIDES)) {
      const story = LAUNCH_CATALOG.find((s) => s.storyId === storyId);
      expect(story, storyId).toBeDefined();
      for (const [archetypeId, locationId] of Object.entries(picks)) {
        expect(story!.archetypes.some((a) => a.id === archetypeId), `${storyId}/${archetypeId}`).toBe(true);
        expect(story!.locations.some((l) => l.id === locationId && l.stageImage), `${storyId}/${locationId}`).toBe(true);
      }
    }
  });

  it('gives every role in every story with art its own stage image', () => {
    const withArt = LAUNCH_CATALOG.filter((story) => story.locations.some((l) => l.stageImage));
    // The held-art fixtures (registered raw until their art run) are the only
    // ones without; everything else must be covered.
    expect(withArt.length).toBeGreaterThan(60);
    for (const story of withArt) {
      const images = archetypeImages(story);
      const stageKeys = new Set(story.locations.map((l) => l.stageImage));
      expect(images.size, story.storyId).toBe(story.archetypes.length);
      for (const archetype of story.archetypes) {
        const image = images.get(archetype.id);
        expect(image, `${story.storyId}/${archetype.id}`).toBeTruthy();
        expect(stageKeys.has(image!), `${story.storyId}/${archetype.id} is not a stage`).toBe(true);
      }
      expect(new Set(images.values()).size, `${story.storyId} repeats a stage`).toBe(story.archetypes.length);
    }
  });

  it('leaves out the starting room when there are more stages than roles', () => {
    const images = archetypeImages(synthetic(6, 3));
    expect([...images.values()]).not.toContain('story_synthetic/stage_loc_0');
  });

  it('keeps the starting room when every stage is needed', () => {
    const images = archetypeImages(synthetic(3, 3));
    expect([...images.values()].sort()).toEqual([
      'story_synthetic/stage_loc_0',
      'story_synthetic/stage_loc_1',
      'story_synthetic/stage_loc_2',
    ]);
  });

  it('spaces the picks evenly through the authored order', () => {
    // Pool is loc_1..loc_9 (nine stages), three roles: indices 0, 3, 6.
    const images = archetypeImages(synthetic(10, 3));
    expect([...images.values()]).toEqual([
      'story_synthetic/stage_loc_1',
      'story_synthetic/stage_loc_4',
      'story_synthetic/stage_loc_7',
    ]);
  });

  it('falls back to key art, then the cover, then nothing', () => {
    expect(archetypeImages(synthetic(1, 2)).get('arch_1')).toBe('story_synthetic/key_art');
    expect(archetypeImages(synthetic(1, 2, { keyArt: null })).get('arch_1')).toBe('story_synthetic/cover');
    expect(archetypeImages(synthetic(0, 2, { keyArt: null, coverImage: null })).get('arch_0')).toBeNull();
  });

  it('draws no art for a world without stages rather than one cover on every tile', () => {
    // A community world: a cover and key art, and no stage images.
    const images = archetypeImages(synthetic(0, 3));
    expect(images.size).toBe(3);
    expect([...images.values()]).toEqual([null, null, null]);
  });

  it('ignores an override whose location has no stage image', () => {
    const story = synthetic(4, 2, { storyId: 'story_hush_house' });
    // The Hush House picks name locations this story does not have.
    const images = archetypeImages(story);
    expect(images.size).toBe(2);
    expect([...images.values()].every((v) => v?.startsWith('story_synthetic/stage_'))).toBe(true);
  });

  it('returns nothing for a story without roles', () => {
    expect(archetypeImages(synthetic(5, 0)).size).toBe(0);
  });
});

describe('toStoryDetail', () => {
  const previousBase = process.env.MEDIA_CDN_BASE_URL;
  beforeAll(() => {
    process.env.MEDIA_CDN_BASE_URL = 'https://media.test';
  });
  afterAll(() => {
    if (previousBase === undefined) delete process.env.MEDIA_CDN_BASE_URL;
    else process.env.MEDIA_CDN_BASE_URL = previousBase;
  });

  it('sends each role its picture as a URL and the ending count, never the endings', () => {
    const detail = toStoryDetail(HUSH_HOUSE, EMPTY_SIGNALS, false, [], null);
    expect(detail.endingCount).toBe(HUSH_HOUSE.endings.length);
    expect(detail.endingCount).toBe(9);
    const nightShift = detail.archetypes.find((a) => a.id === 'arch_night_shift');
    expect(nightShift?.image).toMatch(/^https:\/\/media\.test\/story_hush_house\/stage_hall_third\?v=/);
    // Names can be ordinary words the premise also uses ("Room 312"), so the
    // check is on the parts only an ending has.
    expect(detail).not.toHaveProperty('endings');
    const json = JSON.stringify(detail);
    for (const ending of HUSH_HOUSE.endings) {
      expect(json).not.toContain(ending.epilogue);
      expect(json).not.toContain(ending.condition);
    }
  });

  it('sends zero endings for a world without any', () => {
    const sevenDays = LAUNCH_CATALOG.find((s) => s.storyId === 'story_seven_days')!;
    expect(toStoryDetail(sevenDays, EMPTY_SIGNALS, false, [], null).endingCount).toBe(0);
  });
});
