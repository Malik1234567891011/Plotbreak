import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { runTurnPure, OpenAiGateway } from '@plotbreak/director';
import type { GameState } from '@plotbreak/contracts';

async function main(): Promise<void> {
  const gateway = new OpenAiGateway({
    apiKey: process.env.OPENAI_API_KEY!,
    models: { writer_premium: 'gpt-5.6-terra' },
  });
  const state: GameState = createInitialState({
    sessionId: 'reaction-probe', story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });
  for (const action of ['I tell Sabo his hat looks ridiculous.', 'I tell Luffy he can never come with us.']) {
    const r = await runTurnPure({
      gateway, story: ACE, state, recentTurns: [], rendered: [],
      shape: 'append', api: 'responses', actionText: action, turnId: 'rp',
    });
    console.log(`\n${action}\n  reaction: ${JSON.stringify(r.reaction)}  present: ${JSON.stringify(r.state.characters.filter(c=>c.locationId===r.state.player.locationId).map(c=>c.characterId))}`);
  }
}
void main().catch((e) => { console.error(e); process.exit(1); });
