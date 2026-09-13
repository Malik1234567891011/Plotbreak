import { describe, expect, it } from 'vitest';
import { chooseReaction, parseShown, type ShownReaction } from './reaction.js';

const sabo = (emotion: string): ShownReaction => ({ characterId: 'sabo', emotion });
const luffy = (emotion: string): ShownReaction => ({ characterId: 'luffy', emotion });

describe('reaction selection', () => {
  it('shows a proposal with nothing behind it', () => {
    expect(chooseReaction(sabo('amused'), [])).toEqual(sabo('amused'));
  });

  it('never repeats the identical asset on consecutive turns', () => {
    // The exact case from the reviewed transcript: sabo_worried five turns running.
    expect(chooseReaction(sabo('worried'), [sabo('worried')])).toBeNull();
  });

  it('keeps refusing that asset for several turns, not just the next one', () => {
    const recent = [luffy('warm'), null, sabo('worried')];
    expect(chooseReaction(sabo('worried'), recent)).toBeNull();
  });

  it('lets an asset come back once it is genuinely out of view', () => {
    const recent = [null, null, null, null, null, null, sabo('worried')];
    expect(chooseReaction(sabo('worried'), recent)).toEqual(sabo('worried'));
  });

  it('rests a character who was just on screen even with a new expression', () => {
    expect(chooseReaction(sabo('angry'), [sabo('worried')])).toBeNull();
  });

  it('stops one character owning a long sequence just for talking most', () => {
    // Sabo has had two of the last four; a third is the streak forming.
    const recent = [sabo('amused'), luffy('warm'), null, sabo('annoyed')];
    expect(chooseReaction(sabo('angry'), recent)).toBeNull();
    // Somebody who has not just been on screen is still free to appear.
    expect(chooseReaction(luffy('surprised'), recent)).toEqual(luffy('surprised'));
  });

  it('shows nothing when the storyteller proposes nothing', () => {
    expect(chooseReaction(null, [])).toBeNull();
    expect(chooseReaction(undefined, [luffy('warm')])).toBeNull();
  });

  it('reads a marker back off a past beat, including the empty one', () => {
    expect(parseShown('...\n\n[Day 1 · morning · mt_colubo · present: sabo · shown: sabo/amused]')).toEqual(
      sabo('amused'),
    );
    expect(parseShown('...\n\n[Day 1 · morning · mt_colubo · present: sabo · shown: nobody]')).toBeNull();
    expect(parseShown('no marker at all')).toBeNull();
  });
});
