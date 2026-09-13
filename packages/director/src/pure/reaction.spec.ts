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
    const recent = [null, null, null, null, sabo('worried')];
    expect(chooseReaction(sabo('worried'), recent)).toEqual(sabo('worried'));
  });

  it('shows the same character again when the expression has actually changed', () => {
    // "Sabo amused → Sabo worried" is a cut worth having. Suppressing it would
    // be hiding new information to satisfy a density rule.
    expect(chooseReaction(sabo('worried'), [sabo('amused')])).toEqual(sabo('worried'));
  });

  it('does not hide a character merely because they were on screen recently', () => {
    // The case this got wrong: Luffy had just obeyed, kept his promise and got
    // his hat back. `luffy_warm` is the emotional shift, not a repeat.
    const recent = [sabo('amused'), luffy('worried')];
    expect(chooseReaction(luffy('warm'), recent)).toEqual(luffy('warm'));
  });

  it('allows a visually dense opening when every image differs', () => {
    const run = [sabo('amused'), luffy('worried'), sabo('annoyed'), luffy('warm'), sabo('worried')];
    const shown: (ShownReaction | null)[] = [];
    for (const proposal of run) {
      const pick = chooseReaction(proposal, [...shown].reverse());
      shown.push(pick);
    }
    expect(shown.filter(Boolean)).toHaveLength(5);
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
