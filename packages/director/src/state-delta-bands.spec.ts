import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { Resolution, StateMutation } from '@plotbreak/contracts';
import { buildTurnContext } from './context.js';
import { TemplateWriter } from './writer.js';

/**
 * What the chips say when one punch lands on three people.
 *
 * Ace, turn 12. The player swung at Sabo and missed. Sabo took fear +15 for
 * being swung at; Luffy and Dadan took fear +6 for watching. The chips read
 * "Sabo is afraid of you · Monkey is afraid of you · Curly is afraid of you"
 * — three people terrified in the same breath, two of them because they were
 * standing nearby, and the player has no way to tell the difference.
 */

const relationship = (characterId: string, dimension: string, amount: number, id: string): StateMutation =>
  ({
    mutationId: id, type: 'RELATIONSHIP_DELTA', subjectId: characterId,
    reasonCode: 'SOCIAL', payload: { dimension, amount },
  }) as unknown as StateMutation;

async function labels(mutations: StateMutation[]): Promise<string[]> {
  const state = createInitialState({
    sessionId: 's', story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });
  const resolution = {
    turnId: 't1', intentId: 'i1', schemaVersion: '1.0', checks: [], mutations,
    observableFacts: [], privateFacts: [], newOpportunities: [], timeAdvancedMinutes: 0,
    refusal: null, normalizedActions: [],
  } as unknown as Resolution;

  const context = buildTurnContext({
    story: ACE, state, resolution, tier: 'VIVID', memories: [], recentTurns: [],
    actionText: 'I swing at Sabo.',
  });
  const turn = await new TemplateWriter().write(context, {
    orderedBeats: [], beats: [], sceneGoal: '', tensionTarget: 0.5, focusCharacterIds: [], mediaPlan: null,
  } as never);
  return turn.stateDeltaPresentation.map((d) => d.label);
}

describe('fear is not one band', () => {
  it('calls the person who was swung at afraid and the onlookers wary', async () => {
    const found = await labels([
      relationship('sabo', 'fear', 15, 'm1'),
      relationship('luffy', 'fear', 6, 'm2'),
      relationship('dadan', 'fear', 6, 'm3'),
    ]);
    expect(found).toContain('Sabo is afraid of you');
    expect(found).toContain('Luffy is wary of you');
    expect(found).toContain('Dadan is wary of you');
  });

  it('uses the name the world says a person is called', async () => {
    // Not "Monkey", which is the family name, and not "Curly", which is an
    // epithet. The check labels beside these say "Monkey D. Luffy".
    const found = await labels([relationship('luffy', 'fear', 15, 'm1')]);
    expect(found).toContain('Luffy is afraid of you');
  });
});
