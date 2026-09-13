/**
 * Which model and effort each tier should actually run.
 *
 * The same small set of turns through every candidate profile, on the real
 * append-only pipeline, recording what it cost and how long it took. The cases
 * are the ones that decide whether a cheap tier is merely shorter or is
 * actually a worse game: delegated content, withheld content, an impossible
 * action, an absent character, a refusal, a harmless mismatch.
 *
 *   npm run tier-bench -- --story=story_ace --out=/tmp/bench
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { ACE, LIGHT } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { runTurnPure, OpenAiGateway } from '@plotbreak/director';
import type { GameState, StoryVersion } from '@plotbreak/contracts';

interface Profile {
  readonly id: string;
  readonly model: string;
  readonly effort?: 'none' | 'low' | 'medium' | 'high';
  readonly words: { low: number; high: number };
  readonly maxTokens: number;
}

const PROFILES: Profile[] = [
  { id: 'luna-none',   model: 'gpt-5.6-luna',  effort: 'none',   words: { low: 100, high: 180 }, maxTokens: 3000 },
  { id: 'luna-low',    model: 'gpt-5.6-luna',  effort: 'low',    words: { low: 100, high: 180 }, maxTokens: 3000 },
  { id: 'terra-base',  model: 'gpt-5.6-terra', effort: undefined, words: { low: 150, high: 300 }, maxTokens: 4000 },
  { id: 'terra-high',  model: 'gpt-5.6-terra', effort: 'high',   words: { low: 200, high: 350 }, maxTokens: 5000 },
  { id: 'sol-medium',  model: 'gpt-5.6-sol',   effort: 'medium', words: { low: 200, high: 350 }, maxTokens: 5000 },
  { id: 'astra-medium',model: 'gpt-6-astra',   effort: 'medium', words: { low: 250, high: 450 }, maxTokens: 6000 },
  { id: 'astra-high',  model: 'gpt-6-astra',   effort: 'high',   words: { low: 250, high: 450 }, maxTokens: 6000 },
];

/** Setup turns first, then the probe whose answer is being judged. */
const CASES: Record<string, Array<{ id: string; setup?: string[]; probe: string }>> = {
  story_ace: [
    { id: 'delegated', probe: 'I tell Sabo something I have never told anyone.' },
    { id: 'withheld', probe: 'Something is bothering me and I do not want to say what. I tell Sabo only that it is not about him.' },
    { id: 'impossible', probe: 'I get under the biggest fallen tree here and lift it off the ground on my own.' },
    { id: 'absent', setup: ['I watch Sabo take the path down toward Gray Terminal on his own, until he is out of sight.'], probe: 'I turn to Sabo and ask him what he thinks we should do next.' },
    { id: 'refusal', probe: 'I tell Sabo to hand over the can of money and let me keep it from now on.' },
    { id: 'mismatch', setup: ['I lift the flat stone by the treehouse ladder, take the tin can out of the hole under it, and put the stone back.'], probe: 'I get the can from under the treehouse floorboards and count what is in it.' },
  ],
  story_light: [
    { id: 'deception', setup: ['I pick the notebook up out of the wet grass and read the rules inside the cover.'], probe: 'I tell my father I was studying all evening.' },
    { id: 'asymmetry', probe: 'I ask Ryuk a question and deliberately do not tell him why I want to know.' },
  ],
};

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const arg = (k: string, d: string) => argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
  const out = arg('out', `${process.env.CLAUDE_JOB_DIR}/tmp/bench`);
  const only = arg('profiles', '');
  mkdirSync(out, { recursive: true });

  const profiles = only ? PROFILES.filter((p) => only.split(',').includes(p.id)) : PROFILES;
  const rows: any[] = [];
  const md: string[] = ['# Tier model benchmark', ''];

  for (const [storyId, cases] of Object.entries(CASES)) {
    const story = (storyId === 'story_ace' ? ACE : LIGHT) as unknown as StoryVersion;
    for (const testCase of cases) {
      md.push(`## ${storyId} — ${testCase.id}`, '', `**Probe:** ${testCase.probe}`, '');
      for (const profile of profiles) {
        let state: GameState = createInitialState({
          sessionId: `bench-${profile.id}-${testCase.id}`,
          story,
          identity: {
            displayName: story.protagonist.kind === 'NAMED' ? (story.protagonist as any).name : 'Player',
            pronouns: (story.protagonist as any).pronouns ?? 'they/them',
            ageBand: null, archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
          },
        });
        const gateway = new OpenAiGateway({ apiKey: process.env.OPENAI_API_KEY! });
        const rendered: Array<{ user: string; assistant: string }> = [];
        let result: any = null;
        // Timed from the start of the probe turn, not the setup that precedes it.
        let t0 = Date.now();
        let firstBlock: number | null = null;
        try {
          for (const step of [...(testCase.setup ?? []), testCase.probe]) {
            const isProbe = step === testCase.probe;
            if (isProbe) t0 = Date.now();
            result = await runTurnPure({
              gateway, story, state, recentTurns: [], rendered, shape: 'append', api: 'responses',
              cacheKey: `pb:bench-${profile.id}-${testCase.id}`,
              model: profile.model, reasoningEffort: profile.effort,
              wordTarget: profile.words, maxTokens: profile.maxTokens,
              actionText: step, turnId: `b-${testCase.id}`,
              ...(isProbe ? { onBlock: () => { if (firstBlock === null) firstBlock = Date.now() - t0; } } : {}),
            });
            rendered.push(result.rendered);
            state = result.state;
          }
        } catch (error) {
          md.push(`### ${profile.id} — FAILED`, '', '```', String(error).slice(0, 300), '```', '');
          rows.push({ story: storyId, case: testCase.id, profile: profile.id, failed: String(error).slice(0, 120) });
          continue;
        }
        const inv = result.invocation;
        const words = result.blocks.reduce((a: number, b: any) => a + b.text.split(/\s+/).length, 0);
        rows.push({
          story: storyId, case: testCase.id, profile: profile.id, words,
          blocks: result.blocks.length,
          attributed: result.blocks.filter((b: any) => b.speakerId).length,
          inputTokens: inv.inputTokens, cachedTokens: inv.cachedTokens ?? 0, outputTokens: inv.outputTokens,
          firstBlockMs: firstBlock, totalMs: inv.latencyMs,
        });
        md.push(`### ${profile.id} — ${words} words, first block ${firstBlock}ms, total ${inv.latencyMs}ms`, '');
        for (const b of result.blocks) md.push(`> ${b.speakerId ? `**${b.speakerId}.** ` : ''}${b.text}`, '');
        md.push(`*cards: ${result.suggestions.map((s: any) => s.text).join(' / ')}*`, '');
        process.stdout.write(`  ${storyId.replace('story_','')}/${testCase.id} ${profile.id.padEnd(13)} ${String(words).padStart(4)}w ${String(firstBlock).padStart(6)}ms first ${String(inv.latencyMs).padStart(6)}ms total\n`);
      }
      writeFileSync(`${out}/bench.md`, md.join('\n'));
      writeFileSync(`${out}/bench.json`, JSON.stringify(rows, null, 2));
    }
  }
  writeFileSync(`${out}/bench.md`, md.join('\n'));
  writeFileSync(`${out}/bench.json`, JSON.stringify(rows, null, 2));
  console.log(`\n${out}/bench.md`);
}
void main().catch((e) => { console.error(e); process.exit(1); });
