import { describe, expect, it } from 'vitest';
import { PURE_USABLE_SUGGESTIONS as usable } from './narrator';

/**
 * Turn 710 of a 727-turn production run. The model's JSON got truncated, the
 * repair path welded its own notes onto the last string it was writing, and
 * the player tapped the result — so it became his action on turn 711 and, in
 * an append-only transcript, was replayed to the model on every turn after.
 */
const LEAKED =
  '« Je vais aider Nera à remettre la maison en ordre après la fête. «}]} posited final? ' +
  'Actually JSON malformed? Need output only JSON. Ensure valid. Also speaker enums include ' +
  'amaryllis id rill. Fix suggestion quote. Need no trailing. final.}';

describe('suggestion debris', () => {
  it('drops the suggestion that actually reached a player', () => {
    expect(usable([LEAKED])).toEqual([]);
  });

  it('keeps the good suggestions from the same turn', () => {
    const good = [
      '« Je propose qu’on passe la matinée tranquillement avant de parler des démarches. »',
      '« Je veux relire avec toi les documents du mariage et vérifier que tout est bien rangé. »',
      LEAKED,
    ];
    expect(usable(good)).toEqual(good.slice(0, 2));
  });

  it('rejects anything carrying JSON structure or schema vocabulary', () => {
    for (const bad of ['I say yes.}', '["I run"]', 'set sceneStatus to live', 'Need output only JSON']) {
      expect(usable([bad])).toEqual([]);
    }
  });

  it('leaves ordinary player lines alone, punctuation and accents included', () => {
    const fine = [
      '« Tu me dis la vérité, maintenant. »',
      "I grab Sorrow's rope and don't let go — not this time.",
      'Je descends (lentement) vers la rivière.',
    ];
    expect(usable(fine)).toEqual(fine);
  });

  it('still caps at three and drops blanks', () => {
    expect(usable(['a', '   ', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c']);
  });
});
