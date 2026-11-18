/**
 * Replays one real moment of a real run under each arm of the storyteller test
 * (`packages/director/src/pure/story-test.ts`), with the real storyteller.
 *
 * A case is the session's state before the turn, the conversation exactly as it
 * was sent, the player's words, and the story version they were playing — so
 * the only thing that differs between arms is the arm. Export cases from prod
 * with the query in docs/story-test.md, one JSON file each.
 *
 *   MODEL_PROVIDER=openai npx tsx infra/scripts/story-test-replay.ts <cases-dir> [--out=results.md] [--arms=control,yes]
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QUALITY_TIERS, type GameState, type QualityTier, type StoryVersion } from '@plotbreak/contracts';
import {
  createGatewayFromEnv,
  narratePure,
  pressureFor,
  WEBNOVEL_WORDS,
  type RenderedTurn,
  type StoryTestArm,
} from '@plotbreak/director';

interface Case {
  readonly kind: string;
  readonly sessionId: string;
  readonly turn: number;
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly rendered: RenderedTurn[];
  readonly action: string;
  readonly tier: QualityTier;
  readonly original: string;
}

const ARMS: Record<string, StoryTestArm> = {
  control: { yes: false, push: false },
  yes: { yes: true, push: false },
  push: { yes: false, push: true },
  'yes+push': { yes: true, push: true },
};

async function main(): Promise<void> {
  const dir = process.argv[2];
  if (!dir) throw new Error('usage: story-test-replay.ts <cases-dir>');
  const out = process.argv.find((a) => a.startsWith('--out='))?.split('=')[1];
  const arms = (process.argv.find((a) => a.startsWith('--arms='))?.split('=')[1] ?? Object.keys(ARMS).join(','))
    .split(',');
  const gateway = createGatewayFromEnv(process.env);
  if (!gateway) throw new Error('no model key');

  const report: string[] = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    const c = JSON.parse(readFileSync(join(dir, file), 'utf8')) as Case;
    const profile = QUALITY_TIERS[c.tier] ?? QUALITY_TIERS.VIVID;
    const webnovel = c.story.rules.proseStyle === 'webnovel';
    report.push(`# ${file} — ${c.story.title}, turn ${c.turn} (${c.kind}, ${c.tier})`, '', `**PLAYER:** ${c.action}`, '',
      '## what the player actually got', '', c.original, '');
    const results = await Promise.all(
      arms.map(async (name) => {
        const arm = ARMS[name]!;
        const pressure = pressureFor({
          story: c.story, state: c.state, arcs: [], arcClosing: false, storyTest: arm,
          priorUsers: c.rendered.map((r) => r.user), priorAssistants: c.rendered.map((r) => r.assistant),
        });
        try {
          const result = await narratePure({
            gateway, story: c.story, state: c.state, recentTurns: [], rendered: c.rendered, shape: 'append',
            api: 'responses', actionText: c.action, model: profile.model,
            reasoningEffort: (profile as { reasoningEffort?: 'low' }).reasoningEffort,
            wordTarget: webnovel ? WEBNOVEL_WORDS[c.tier] : profile.words, maxTokens: profile.maxOutputTokens,
            notes: pressure ? [pressure] : [], storyTest: arm,
          });
          return { name, pushed: Boolean(pressure), text: result.rendered.assistant.split('\n[')[0]!, suggestions: result.turn.suggestedResponses };
        } catch (error) {
          return { name, pushed: Boolean(pressure), text: `(failed: ${(error as Error).message})`, suggestions: [] };
        }
      }),
    );
    for (const r of results) {
      report.push(`## ${r.name}${r.pushed ? ' (world push fired)' : ''}`, '', r.text, '', ...r.suggestions.map((s) => `- ${s}`), '');
    }
    console.log(`${file}: done`);
  }
  if (out) writeFileSync(out, report.join('\n'));
  else console.log(report.join('\n'));
}

void main();
