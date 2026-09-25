import { describe, expect, it } from 'vitest';
import { ITACHI, LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { StoryVersion } from '@plotbreak/contracts';

/**
 * The opening cinematic, and the promises it has to keep to the catalogue.
 *
 * The dangerous thing about adding a field to `StoryVersion` is not the field:
 * it is that a published version carrying it must still parse under a build
 * that has never heard of it, and every version *without* it must still parse
 * under this one. `calledName` failed the second half of that and took
 * `/v1/discover` to a 500 while `/health` said everything was fine.
 */
describe('story prologues', () => {
  it('parses a story that has no prologue at all', () => {
    // Every world published before this existed. If this ever fails, the
    // catalogue is about to start answering 500.
    const { prologue: _dropped, ...withoutPrologue } = ITACHI as Record<string, unknown>;
    const parsed = StoryVersion.safeParse(withoutPrologue);
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data.prologue).toEqual([]);
  });

  it('only Itachi has one, and it is three panels', () => {
    const withPrologue = LAUNCH_CATALOG.filter((s) => s.prologue.length > 0);
    expect(withPrologue.map((s) => s.storyId)).toEqual(['story_itachi']);
    expect(ITACHI.prologue).toHaveLength(3);
  });

  it('every panel has art, a headline and alt text', () => {
    for (const panel of ITACHI.prologue) {
      expect(panel.assetKey).toMatch(/^story_itachi\/prologue\/\d$/);
      expect(panel.headline.length).toBeGreaterThan(0);
      // A picture carrying the setup has to be readable by somebody who cannot
      // see it, which is also why the text is not baked into the art.
      expect(panel.alt.length).toBeGreaterThan(0);
    }
  });

  it('refuses more than four panels', () => {
    // The cap is the product decision, enforced rather than remembered.
    const tooMany = { ...ITACHI, prologue: [...ITACHI.prologue, ...ITACHI.prologue] };
    expect(StoryVersion.safeParse(tooMany).success).toBe(false);
  });
});
