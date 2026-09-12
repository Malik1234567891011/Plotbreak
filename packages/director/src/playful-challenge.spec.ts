import { describe, expect, it } from 'vitest';
import type { ActionIntent } from '@plotbreak/contracts';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { stripInventedViolence } from './entity-resolution.js';
import { runTurn } from './pipeline.js';
import { RuleBasedIntentParser } from './parser.js';
import { RuleBasedDirector } from './director.js';
import { TemplateWriter } from './writer.js';

/**
 * Teasing is not assault.
 *
 * Live, in Ace, turn 12: the card *"Hey, Sabo, don't go too fast or I might
 * have to catch you! You really think you're unbeatable?"* — two brothers
 * racing — came back as `Strike Sabo · Hard · FAILURE`, opened a combat check,
 * and moved the relationship. The rule parser reads that sentence as `custom`,
 * which is right; it is the escalation to the model parser that invents the
 * punch. So the fix is not a taunt list, it is an invariant: an attack is
 * something you do with your body, and a sentence with no physical act in it
 * cannot be one.
 */

const attackOn = (text: string): ActionIntent =>
  ({
    schemaVersion: '1.0', intentId: 'i', rawAction: text, confidence: 0.9, ambiguities: [],
    dialogue: [], scope: 'LOCAL',
    actions: [{
      verb: 'attack', actor: { entityType: 'player', entityId: 'player' },
      targets: [{ entityType: 'npc', entityId: 'sabo' }],
      method: text, declaredOutcome: null, abilityId: null, timeIntent: 'NOW',
    }],
  }) as unknown as ActionIntent;

const verbAfter = (text: string, locale = 'en'): string | undefined =>
  stripInventedViolence(attackOn(text), { text, locale }).actions[0]?.verb;

describe('an attack needs a physical act in the player’s own words', () => {
  it('does not turn a race, a dare or trash talk into a fistfight', () => {
    for (const text of [
      "Hey, Sabo, don't go too fast or I might have to catch you! You really think you're unbeatable?",
      "Catch you if you're too slow.",
      'You think you can keep up?',
      'Come on, prove it.',
      "I'll get you next time.",
      'Race you to the top.',
      'I bet I can beat you there.',
      'Say that again and see what happens to your reputation.',
    ]) {
      expect(verbAfter(text), text).not.toBe('attack');
    }
  });

  it('lands on speak for banter and threaten for contempt', () => {
    expect(verbAfter('You think you can keep up?')).toBe('speak');
    expect(verbAfter('You are a coward and everyone here knows it.')).toBe('threaten');
  });

  it('leaves a real attack alone, however it is phrased', () => {
    for (const text of [
      'I punch Sabo.',
      'I shove him off the branch.',
      'I put my fist in his gut.',
      'I grab him by the collar.',
      'I swing the pipe at his head.',
      'I set the whole thing on fire and come at him through it.',
      'I take him down before he can finish the sentence.',
    ]) {
      expect(verbAfter(text), text).toBe('attack');
    }
  });

  it('holds in French, against French idiom', () => {
    expect(verbAfter('Tu crois vraiment que tu peux me suivre ?', 'fr')).not.toBe('attack');
    expect(verbAfter('Je lui mets un coup de poing.', 'fr')).toBe('attack');
    expect(verbAfter('Je le frappe.', 'fr')).toBe('attack');
  });
});

/**
 * The gate may never sit below the rule parser.
 *
 * `stripInventedViolence` demotes an attack the text does not support, so
 * anything the rule lexicon is confident enough to call violence on its own has
 * to survive it. Otherwise the pipeline would take a correct parse apart — the
 * FORGOT_VIOLENCE failure, arrived at from the other side. Caught immediately:
 * the first version of the gate did not know "beat the shit out of Kaela".
 */
describe('the gate never contradicts the rule parser', () => {
  it('keeps every attack the rule lexicon is willing to make on its own', () => {
    const state = createInitialState({
      sessionId: 'x', story: ACE,
      identity: {
        displayName: 'Ace', pronouns: 'he/him', ageBand: null,
        archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
      },
    });
    const parser = new RuleBasedIntentParser();
    const corpus = [
      'I beat the shit out of Sabo.',
      'I attack Sabo.',
      'I lunge at him.',
      'I strangle him.',
      'I lay into Sabo.',
      'I rough up the guard.',
      'I take a swing at Sabo.',
      'I knock him out.',
      'I deck him before he can finish the sentence.',
      'I hit her, hard, without warning.',
      'I jump the man on the gangplank.',
      'I keep swinging.',
      'I shove him off the branch.',
      'I go for him with the pipe.',
    ];
    for (const text of corpus) {
      const parsed = parser.parseSync(text, { story: ACE, state, intentId: 'i' });
      if (parsed.actions[0]?.verb !== 'attack') continue;
      expect(stripInventedViolence(parsed, { text }).actions[0]?.verb, text).toBe('attack');
    }
  });
});

describe('the gate sits in the pipeline, not in one parser', () => {
  it('demotes an invented attack whichever parser produced it', async () => {
    const text = 'You really think you are unbeatable?';
    const result = await runTurn({
      story: ACE,
      state: createInitialState({
        sessionId: 's', story: ACE,
        identity: {
          displayName: 'Ace', pronouns: 'he/him', ageBand: null,
          archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
        },
      }),
      memories: [], recentTurns: [],
      actionText: text, qualityTier: 'VIVID', turnId: 't1', seed: 'seed-1',
      // Stands in for the model parser, which is what actually did this.
      deps: {
        parser: { parse: async () => attackOn(text) },
        director: new RuleBasedDirector(),
        writer: new TemplateWriter(),
      },
    });
    expect(result.intent.actions[0]?.verb).not.toBe('attack');
  });
});
