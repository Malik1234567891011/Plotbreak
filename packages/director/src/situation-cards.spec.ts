import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { RuleBasedDirector } from './director.js';
import { buildTurnContext } from './context.js';

/**
 * Turn 17 of the forty-turn Ace run offered the player **"Accept being saved"**
 * while he stood alone on a beach looking at the sea. Nobody was carrying him.
 * Nothing had happened to him.
 *
 * It is the affordance of `ab_let_them_carry_you`, an ability unlocked from
 * turn one, rendered as a card because the ability was available. An unlocked
 * ability is a capability; a card asserts a situation. Same class as inventing
 * history, from the other direction.
 */

const state = () =>
  createInitialState({
    sessionId: 's', story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

async function cardsFor(actionText: string, locationId?: string) {
  const s = state();
  if (locationId) s.player.locationId = locationId;
  const context = buildTurnContext({
    story: ACE, state: s,
    resolution: {
      turnId: 't', intentId: 'i', schemaVersion: '1.0', checks: [], mutations: [],
      observableFacts: [], privateFacts: [],
      newOpportunities: ACE.abilities.filter((a) => a.unlockedByDefault).map((a) => `use_ability:${a.id}`),
      timeAdvancedMinutes: 0, refusal: null, normalizedActions: [],
    } as never,
    tier: 'VIVID', memories: [], recentTurns: [], actionText,
  });
  const plan = await new RuleBasedDirector().plan(context);
  return plan.suggestedActions.map((a) => a.text);
}

describe('a card may not assert a situation that does not exist', () => {
  it('does not offer being rescued to somebody nobody is rescuing', async () => {
    const cards = await cardsFor('I look out at the sea and think about nothing much.', 'dawn_shore');
    expect(cards.join(' | ')).not.toContain('Accept being saved');
  });

  it('still offers an ability the scene is actually about', async () => {
    // The same gate has to let the right card through, or it is just a mute.
    const cards = await cardsFor('I square up and get ready to swing first at him.');
    expect(cards.length).toBeGreaterThan(0);
  });
});
