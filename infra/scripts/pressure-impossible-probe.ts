/**
 * Does a recent push make the storyteller more willing to grant the impossible,
 * or to narrate the player by name?
 *
 * The branch smoke flagged IMPOSSIBLE_GRANTED 15 times against main's 7 and
 * PLAYER_IN_THIRD_PERSON 14 against 7, on one run per world. This isolates the
 * question: same three opening turns, then a push on turn 4 or none, then
 * smoke's own impossible probe on turn 6, judged by smoke's own detectors.
 *
 *   tsx --env-file=.env infra/scripts/pressure-impossible-probe.ts --worlds=10 --samples=3
 */
import { appendFileSync } from 'node:fs';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { QUALITY_TIERS, type GameState, type StoryVersion } from '@plotbreak/contracts';
import { runTurnPure, OpenAiGateway, pressureNote, openThreads, chooseThread, narratesPlayerInThirdPerson } from '@plotbreak/director';

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, ...v] = a.replace(/^--/, '').split('=');
  return [k, v.join('=')];
}));
const worlds = Number(args.worlds ?? 10);
const samples = Number(args.samples ?? 3);
const tier = QUALITY_TIERS.QUICK;
const gateway = new OpenAiGateway({ apiKey: process.env.OPENAI_API_KEY!, models: { writer_premium: 'gpt-5.6-terra' } });

const GRANTED = /\byou (?:rise|lift off|float|soar|hover|fly|leave the ground)\b(?![^.]*\b(?:imagine|almost|nothing|do not|does not|cannot)\b)/i;
const FLY = 'I fly up into the air and look down at the whole place from above.';

type Rendered = { user: string; assistant: string };

async function retry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    try { return await fn(); } catch (e) {
      if (attempt >= 4) throw e;
      await new Promise((r) => setTimeout(r, 15_000 * attempt));
    }
  }
}

async function turn(story: StoryVersion, state: GameState, rendered: Rendered[], actionText: string, notes: string[], key: string) {
  return retry(() => runTurnPure({
    gateway, story, state, recentTurns: [], rendered, shape: 'append', api: 'responses', cacheRetention: '24h',
    cacheKey: key, model: tier.model, reasoningEffort: tier.reasoningEffort, wordTarget: tier.words,
    maxTokens: tier.maxOutputTokens, actionText, notes, turnId: `imp-${Math.random()}`,
  }));
}

const prose = (r: Awaited<ReturnType<typeof turn>>) => r.blocks.map((b) => b.text).join('\n');
const narration = (r: Awaited<ReturnType<typeof turn>>) => r.blocks.filter((b) => !b.speakerId).map((b) => b.text).join('\n');

async function main(): Promise<void> {
  const tally = { push: { granted: 0, third: 0, n: 0 }, none: { granted: 0, third: 0, n: 0 } };
  for (const story of LAUNCH_CATALOG.slice(0, worlds)) {
    let state = createInitialState({
      sessionId: `imp-${story.storyId}`, story,
      identity: { displayName: 'Robin Vale', pronouns: 'they/them', ageBand: null,
        archetypeId: story.archetypes[0]?.id ?? null, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
    } as never);
    const first = story.characters[0]?.name.split(' ')[0] ?? 'someone';
    const shared: Rendered[] = [];
    for (const action of ['I look around and take it in.', `I ask ${first} what is actually going on here.`, 'I keep going.']) {
      const r = await turn(story, state, shared, action, [], `imp:${story.storyId}`);
      shared.push(r.rendered); state = r.state;
    }
    const thread = chooseThread(openThreads(story, state, []), []);
    await Promise.all((['push', 'none'] as const).flatMap((cond) => Array.from({ length: samples }, async (_, i) => {
      let s = state; const h = [...shared];
      const key = `imp:${story.storyId}:${cond}:${i}`;
      const t4 = await turn(story, s, h, 'I keep going.', cond === 'push' && thread ? [pressureNote(thread)] : [], key);
      h.push(t4.rendered); s = t4.state;
      const t5 = await turn(story, s, h, 'I refuse. I am not doing this and nobody is going to make me.', [], key);
      h.push(t5.rendered); s = t5.state;
      const t6 = await turn(story, s, h, FLY, [], key);
      const granted = GRANTED.test(prose(t6));
      const third = [t4, t5, t6].some((r) => narratesPlayerInThirdPerson(narration(r), 'Robin Vale'));
      tally[cond].n += 1; tally[cond].granted += Number(granted); tally[cond].third += Number(third);
      console.log(`${story.title.padEnd(26)} ${cond.padEnd(5)} #${i} granted=${granted ? 'Y' : '-'} thirdPerson=${third ? 'Y' : '-'}`);
      appendFileSync(`scratchpad/arc-pressure/impossible-${args.label ?? 'run'}.jsonl`, `${JSON.stringify({ story: story.title, cond, i, granted, third, t4: prose(t4), t6: prose(t6) })}\n`);
    })));
  }
  console.log('\n', JSON.stringify(tally));
}
void main().catch((e) => { console.error(e); process.exit(1); });
