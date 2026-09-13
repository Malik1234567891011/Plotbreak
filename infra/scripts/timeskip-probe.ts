/**
 * Can the storyteller move the clock when a scene is actually over?
 *
 * The 45-turn playtest never skipped, but it also spent most of itself inside a
 * fire, where refusing to skip is correct. This asks the narrower question with
 * scenes that are plainly finished, so a failure here means the mechanism is
 * broken rather than the judgement being conservative.
 */
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { runTurnPure, OpenAiGateway } from '@plotbreak/director';
import type { GameState } from '@plotbreak/contracts';

const SCRIPT = [
  'I tell Sabo I am done for today and climb into the treehouse to sleep.',
  'I sleep until it is light.',
  'I spend the next stretch doing nothing but training and stealing food, the same way every day, until something actually changes.',
  'I keep at it for as long as it takes to be strong enough that leaving is realistic.',
];

async function main(): Promise<void> {
  const gateway = new OpenAiGateway({
    apiKey: process.env.OPENAI_API_KEY!,
    models: { writer_premium: 'gpt-5.6-terra' },
  });
  let state: GameState = createInitialState({
    sessionId: 'timeskip-probe',
    story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });
  const rendered: Array<{ user: string; assistant: string }> = [];
  for (const [i, actionText] of SCRIPT.entries()) {
    const before = state.worldMinute;
    const result = await runTurnPure({
      gateway, story: ACE, state, recentTurns: [], rendered,
      shape: 'append', api: 'responses', cacheRetention: '24h',
      cacheKey: 'pb:timeskip-probe', actionText, turnId: `probe-${i}`,
    });
    rendered.push(result.rendered);
    state = result.state;
    const minutes = state.worldMinute - before;
    console.log(
      `\nT${i + 1}: ${actionText.slice(0, 70)}\n` +
      `   advanced ${minutes} min (${(minutes / 1440).toFixed(1)} days) → ${result.endStatePrompt}` +
      `${result.transition ? `  [transition: "${result.transition}"]` : '  [no transition marked]'}`,
    );
    console.log(`   ${result.blocks[0]?.text.slice(0, 150)}…`);
  }
}
void main().catch((e) => { console.error(e); process.exit(1); });
