import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { PURE_SPEAKER_NORMALIZER } from './narrator.js';

/**
 * Eight expressions have art; a model reaching for a ninth is describing the
 * same face rather than asking for a new asset. Losing a whole turn over the
 * label is the cap-that-rejects mistake, and the cheaper models stray more —
 * Luna failed a benchmark turn on "curious".
 */
const fix = PURE_SPEAKER_NORMALIZER(ACE as never);
const react = (emotion: unknown) =>
  (fix({ narrative: [], reaction: { characterId: 'sabo', emotion } }) as { reaction: { emotion: string } | null }).reaction;

describe('reaction emotion normalisation', () => {
  it('keeps the eight that have art', () => {
    for (const emotion of ['neutral', 'warm', 'amused', 'surprised', 'confused', 'annoyed', 'angry', 'worried']) {
      expect(react(emotion)?.emotion).toBe(emotion);
    }
  });

  it('maps a synonym onto the face that exists', () => {
    expect(react('delighted')?.emotion).toBe('amused');
    expect(react('curious')?.emotion).toBeTypeOf('string');
  });

  it('never invents an asset that was never drawn', () => {
    const eight = ['neutral', 'warm', 'amused', 'surprised', 'confused', 'annoyed', 'angry', 'worried'];
    for (const odd of ['curious', 'nonsense-word', 'RADIANT', '']) {
      const out = react(odd);
      if (out) expect(eight).toContain(out.emotion);
    }
  });

  it('drops a malformed reaction rather than failing the turn', () => {
    expect(react(undefined)).toBeNull();
    expect((fix({ narrative: [], reaction: null }) as { reaction: unknown }).reaction).toBeNull();
  });
});
