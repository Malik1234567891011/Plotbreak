import { describe, expect, it } from 'vitest';
import { distinct } from './responses.js';

/**
 * Three cards that are three choices.
 *
 * Both of these pairs were offered to a real player, one turn apart, in the
 * Ace transcript that this pass came out of. A tap-only player pressing card 1
 * every time was choosing from a rotating menu of about two ideas.
 */

const card = (text: string) => ({ text });

describe('cards that repeat the set', () => {
  it('drops the same move addressed to a different person', () => {
    const kept = distinct(
      [
        card('I wipe the sweat off my brow and smirk up at Luffy. "You want to climb? Then show me you mean it. No stopping to poke at bugs this time!"'),
        card('I smirk up at Luffy. "You want to climb? Then show me you mean it — no stopping to poke at bugs."'),
        card('I sit down in the shade and say nothing at all, and let the mountain get on with it.'),
      ],
      [],
    );
    expect(kept).toHaveLength(2);
  });

  it('keeps three genuinely different moves', () => {
    const cards = [
      card('I wipe the sweat off my brow and smirk up at Luffy. "You want to climb? Then show me you mean it."'),
      card('I turn to Sabo. "You watching this? Think the little guy has what it takes?"'),
      card('I step down from the root and start walking toward the Dadan Family House.'),
    ];
    expect(distinct(cards, [])).toHaveLength(3);
  });
});

describe('cards that repeat the run', () => {
  /**
   * Turns 3, 5 and 8 of the Ace transcript. The same card, three sentences,
   * offered as choice 3 five times across twenty turns.
   */
  const turn3 =
    'I turn from the tree and start heading down the path toward the Dadan Family House. “Enough hanging around here. Let’s go. We’ll settle this later.”';
  const turn8 =
    'I turn away from the tree and start walking toward the Dadan Family House. “Enough waiting around here. Let’s eat before Dadan blows up the whole mountain again.”';

  it('drops a card a recent turn already offered', () => {
    const kept = distinct(
      [
        card(turn8),
        card('I plant my feet and shout up into the branches until something answers.'),
        card('I follow the water down and see where it goes.'),
      ],
      [turn3],
    );
    expect(kept.map((c) => c.text)).not.toContain(turn8);
    expect(kept).toHaveLength(2);
  });

  it('drops at most one card for repeating, so the set never collapses', () => {
    const turn5 =
      'I step down from the root and start walking toward the Dadan Family House. “Enough messing about here. Let’s move before the sun burns us to ash.”';
    const kept = distinct([card(turn8), card(turn5), card('I sit down and wait.')], [turn3]);
    expect(kept.length).toBeGreaterThanOrEqual(2);
  });

  it('leaves a card that only shares the scene, not the move', () => {
    const kept = distinct(
      [
        card('I glance up at Sabo and smirk. “Careful, Sabo, or I might just prove you wrong.”'),
        card('I climb without saying anything and let the silence do it.'),
        card('I go and find Luffy before he finds something worse.'),
      ],
      [turn3],
    );
    expect(kept).toHaveLength(3);
  });
});

describe('a dull turn beats a dead end', () => {
  it('keeps everything rather than leave the player with one card', () => {
    const same = [
      card('I head back toward the Dadan Family House before it gets dark.'),
      card('I head back to the Dadan Family House before dark.'),
      card('I head for the Dadan Family House now, before dark.'),
    ];
    expect(distinct(same, [])).toHaveLength(3);
  });
});
