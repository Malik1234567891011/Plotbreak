import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { RuleBasedIntentParser } from './parser.js';
import { ensureTravelIntent } from './entity-resolution.js';

/** The exact cards from the eighty-turn session, re-parsed. */
const REAL: Array<[number, string, string]> = [
  [2, 'I turn to Sabo with a smirk, swinging my pipe across my shoulders. "Think you can keep up with me this time, or are you just here for the scenery?"', 'was speak+attack'],
  [10, 'I kick a loose stone down the hill toward the Dadan Family House and start walking. "I’m done waiting. If you want to come, now’s the time. Otherwise, don’t slow me down."', 'was use_ability REJECTED'],
  [12, 'I pick up a big branch and start walking toward the Dadan Family House. "I\'m done fussing here. Moving on, with or without you."', 'was speak+interact'],
  [45, 'I look up at the sky, exhaling slowly, and then nod toward the path leading down the mountain. "Enough words. Let’s move to the Treehouse. Better to plan while we’re not standing still."', 'was travel (control)'],
  [70, 'I kick a stone down the path toward the Dadan Family House. "I’m going to find Dadan. Someone’s got to make sure she feeds us before we starve out here."', 'was travel (control)'],
  [76, 'I take a deep breath and nod toward the Dadan Family House. "Let’s get some food and get ready. Nobody’s going anywhere hungry — not while I’m around. You coming, Luffy?"', 'was speak+interact FAILURE'],
];

/**
 * The cards that lost the player's movement, replayed.
 *
 * Turns 10, 12 and 49 of the eighty-turn session each narrated the player
 * walking to a named place and left them standing where they started, because
 * no parser produced a travel clause. Turn 76 folded the player's own move into
 * a contested clause with an NPC's compliance and lost it when the NPC refused.
 *
 * The guarantee is not in the lexicon — that has to pick a clause's verb from a
 * regex over free text, and free text does not cooperate. It is in the
 * pipeline, after every parser: if the player used movement language and named
 * a place reachable from here, the turn contains a travel clause.
 */
describe('every card that said it was going somewhere', () => {
  it('now produces a travel clause', () => {
    const state = createInitialState({
      sessionId: 'x', story: ACE,
      identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
        archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
    });
    const parser = new RuleBasedIntentParser();
    for (const [turn, text, before] of REAL) {
      const raw = parser.parseSync(text, { story: ACE, state, intentId: 'i' });
      const got = ensureTravelIntent(raw, { story: ACE, state, text });
      const verbs = got.actions.map((a) => `${a.verb}${a.targets.map((t) => `(${t.entityId})`).join('')}`).join(' + ');
      console.log(`t${String(turn).padStart(2)} now: ${verbs.padEnd(46)} | ${before}`);
      if (turn === 2) {
        expect(got.actions.map((a) => a.verb), 'turn 2 is a gesture').not.toContain('attack');
      } else {
        expect(got.actions.map((a) => a.verb), `turn ${turn}`).toContain('travel');
      }
    }
  });

  it('keeps the player’s move when an NPC refuses the rest', () => {
    // Turn 76: "…Let's get some food… You coming, Luffy?" The move and the
    // invitation were one contested clause, the clause failed, and the move
    // died with it. They are separate clauses now, so Luffy can say no and Ace
    // still walks to the house.
    const state = createInitialState({
      sessionId: 'x', story: ACE,
      identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
        archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
    });
    const text = REAL.find(([t]) => t === 76)![1];
    const got = ensureTravelIntent(
      new RuleBasedIntentParser().parseSync(text, { story: ACE, state, intentId: 'i' }),
      { story: ACE, state, text },
    );
    const travel = got.actions.find((a) => a.verb === 'travel');
    expect(travel).toBeDefined();
    expect(travel!.targets[0]?.entityId).toBe('dadan_house');
    expect(got.actions.some((a) => a.verb === 'speak' || a.verb === 'interact')).toBe(true);
  });

  it('does not invent travel from a place merely mentioned', () => {
    const state = createInitialState({
      sessionId: 'x', story: ACE,
      identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
        archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
    });
    const parser = new RuleBasedIntentParser();
    for (const text of [
      'I ask Sabo what he thinks about the Treehouse.',
      'I tell Luffy the Dadan Family House is not safe after dark.',
    ]) {
      const got = ensureTravelIntent(parser.parseSync(text, { story: ACE, state, intentId: 'i' }), {
        story: ACE, state, text,
      });
      expect(got.actions.map((a) => a.verb), text).not.toContain('travel');
    }
  });
});
