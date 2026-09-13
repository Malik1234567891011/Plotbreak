import { describe, expect, it } from 'vitest';
import { ACE, LAST_FIVE } from '@plotbreak/test-fixtures';
import type { StoryVersion } from '@plotbreak/contracts';
import { createInitialState } from '@plotbreak/engine';
import { RuleBasedIntentParser } from './parser.js';
import { ensureTravelIntent, findUnlicensedTravel } from './entity-resolution.js';

/**
 * A gesture is not an attack.
 *
 * Turn 2 of an eighty-turn Ace session: *"I turn to Sabo with a smirk,
 * swinging my pipe across my shoulders. 'Think you can keep up with me this
 * time, or are you just here for the scenery?'"* The parser returned
 * `[speak, attack]`, the engine opened an encounter, and that encounter ran
 * for eight turns, hit the player three times, and left Sabo with injuries the
 * story was still referring to on turn 41.
 *
 * Nothing about it was the model's fault or the writer's. `swinging` was in
 * the attack lexicon as a bare word, put there for mid-fight shorthand.
 */

const verbs = (story: StoryVersion, text: string) => {
  const state = createInitialState({
    sessionId: 'x', story,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });
  return new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'i' }).actions.map((a) => a.verb);
};

describe('swinging something is not swinging at somebody', () => {
  it('does not start a fight over a pipe on a shoulder', () => {
    for (const text of [
      'I turn to Sabo with a smirk, swinging my pipe across my shoulders. "Think you can keep up?"',
      'I rest the pipe on my shoulder, swinging it lazily.',
      'I sit on the branch swinging my legs.',
      'I sling the bat over my shoulder and grin at Tom.',
      'I swing the gate shut behind me.',
    ]) {
      expect(verbs(ACE, text), text).not.toContain('attack');
    }
  });

  it('still hears a swing that is aimed at somebody', () => {
    for (const text of [
      'I swing the pipe at Sabo.',
      'I swing at him with everything I have.',
      'I swing into him before he can set his feet.',
    ]) {
      expect(verbs(ACE, text), text).toContain('attack');
    }
  });

  it('keeps the mid-fight shorthand it was added for', () => {
    expect(verbs(ACE, 'I keep fighting.')).toContain('attack');
    expect(verbs(LAST_FIVE as StoryVersion, 'I fight him for it.')).toContain('attack');
  });
});

const travelVerbs = (story: StoryVersion, text: string) => {
  const state = createInitialState({
    sessionId: 'x', story,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });
  const raw = new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'i' });
  return ensureTravelIntent(raw, { story, state, text }).actions.map((a) => a.verb);
};

describe('going somewhere, in every tense people use', () => {
  it('produces a travel clause for the phrasings the lexicon cannot see', () => {
    // Three turns of a real session narrated the player walking to a place and
    // left them standing where they started, because none of these produced a
    // travel clause for the engine to commit.
    for (const text of [
      'I start walking toward the Dadan Family House.',
      'I am walking down to the Dadan Family House.',
      'I am heading to the Treehouse.',
      'I am going to the Treehouse.',
      'I set off for the Treehouse.',
      'I kick a loose stone down the hill toward the Dadan Family House and start walking.',
    ]) {
      expect(travelVerbs(ACE, text), text).toContain('travel');
    }
  });

  it('cannot invent a destination the player did not name', () => {
    // "I decide I am done standing here, and start walking" names nowhere, and
    // the engine has no way to know which way they went. It stays put — and
    // the writer is then forbidden from narrating the walk, which is the other
    // half of this and the part turn 49 actually needed.
    expect(travelVerbs(ACE, 'I decide I am done standing here, and start walking.'))
      .not.toContain('travel');
  });

  it('does not read every mention of a place as going there', () => {
    for (const text of [
      'I ask Sabo what he thinks about the Treehouse.',
      'I tell Luffy the Dadan Family House is not safe.',
    ]) {
      expect(travelVerbs(ACE, text), text).not.toContain('travel');
    }
  });

  it('does not read the future auxiliary as movement', () => {
    // "nobody is going to make me" is not travel, and widening the lexicon to
    // catch progressive forms read it as travel until the destination
    // requirement moved into the pipeline.
    expect(travelVerbs(ACE, 'I refuse. I am not doing this and nobody is going to make me.'))
      .not.toContain('travel');
  });
});

describe('the beat may not leave a room the world did not leave', () => {
  const narration = (text: string) => [{ type: 'NARRATION', text }];

  it('catches prose that walks the player out with no travel event', () => {
    // Turn 49 of the eighty-turn session, near enough verbatim.
    for (const text of [
      'You leave the treehouse without a word. The old planks shift under your feet.',
      'You climb down from the platform and start down the trail, and the boards fall away behind you.',
      'You are heading down towards the path now, and the heat comes up off the dirt.',
    ]) {
      expect(findUnlicensedTravel(narration(text), { travelled: false }), text).toHaveLength(1);
    }
  });

  it('says nothing when the world actually moved', () => {
    expect(
      findUnlicensedTravel(narration('You leave the treehouse without a word.'), { travelled: true }),
    ).toEqual([]);
  });

  it('leaves movement inside a place alone', () => {
    for (const text of [
      'You cross the clearing and put your back against the trunk.',
      'You climb higher into the branches until the whole slope is under you.',
      'You walk a slow circle around the fire, thinking.',
    ]) {
      expect(findUnlicensedTravel(narration(text), { travelled: false }), text).toEqual([]);
    }
  });

  it('lets a character say they are leaving', () => {
    expect(
      findUnlicensedTravel([{ type: 'DIALOGUE', text: 'You leave now or you carry the can yourself.' }], {
        travelled: false,
      }),
    ).toEqual([]);
  });
});
