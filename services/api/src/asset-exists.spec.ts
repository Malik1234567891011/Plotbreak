import { describe, expect, it } from 'vitest';
import { assetExists } from './media-routes.js';

/**
 * Ten of the twenty-five launch stories ship no reaction art at all, and every
 * one of them still declares expressions for its cast. Declaring is not
 * drawing, so the only safe question is whether the file is there.
 */
describe('pre-generated asset existence', () => {
  it('finds art that was actually rendered', () => {
    expect(assetExists('story_ace/sabo_worried')).toBe(true);
    expect(assetExists('story_itachi/shisui_worried')).toBe(true);
    expect(assetExists('story_ace/stage_mt_colubo')).toBe(true);
  });

  it('refuses art a story only declared', () => {
    // Light names four expressions for Kaito and ships none of them.
    expect(assetExists('story_light/kaito_amused')).toBe(false);
    expect(assetExists('story_salt_road/sabe_worried')).toBe(false);
  });

  it('says no rather than throwing for nonsense keys', () => {
    expect(assetExists('story_nope/does_not_exist')).toBe(false);
    expect(assetExists('')).toBe(false);
  });
});
