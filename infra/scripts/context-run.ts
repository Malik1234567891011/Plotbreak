/**
 * The bounded-context experiment.
 *
 * Drives one long continuous Pure session through `runTurnPure` — the real
 * product path, not a parallel implementation — and records what the provider
 * billed on every single turn. Four arms differ only in how context is carried:
 *
 *   full     full history, no prompt cache at all. The control: O(n²) as billed.
 *   cache    full history, prompt_cache_key + 24h retention.
 *   auto     cache + provider-side compaction at a fixed threshold.
 *   explicit cache + compaction forced on a fixed cadence instead.
 *
 * Both compaction arms carry the returned artifact forward and stop sending the
 * turns it covers, which is the only way compaction is worth anything to a
 * stateless server: the call that compacts is *more* expensive, never less.
 *
 *   npm run context-run -- --arm=cache --turns=160
 */
import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { runTurnPure, OpenAiGateway } from '@plotbreak/director';
import type { GameState, TurnRecord } from '@plotbreak/contracts';
import { SCRIPT, isProbe } from './context-script.js';

type Arm = 'full' | 'cache' | 'auto' | 'explicit';

const argv = process.argv.slice(2);
const arg = (k: string, d?: string) => argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const arm = (arg('arm', 'cache') as Arm);
const turns = Number(arg('turns', '160'));
const model = arg('model', 'gpt-5.6-terra')!;
const outDir = arg('out', `${process.env.CLAUDE_JOB_DIR}/tmp/context`)!;

/** Where compaction kicks in. ~40k input is roughly turn 45 of an Ace session. */
const AUTO_THRESHOLD = 40_000;
/** The explicit arm compacts here instead of waiting for a threshold. */
const EXPLICIT_EVERY = 40;

function policy(turnNo: number): {
  api: 'responses';
  cacheKey?: string | null;
  cacheRetention?: '24h';
  compactThreshold?: number;
} {
  switch (arm) {
    case 'full':
      return { api: 'responses', cacheKey: null };
    case 'cache':
      return { api: 'responses', cacheRetention: '24h' };
    case 'auto':
      return { api: 'responses', cacheRetention: '24h', compactThreshold: AUTO_THRESHOLD };
    case 'explicit':
      // A threshold of 1 is always exceeded, so this compacts exactly on the
      // cadence and never in between.
      return {
        api: 'responses',
        cacheRetention: '24h',
        ...(turnNo > 0 && turnNo % EXPLICIT_EVERY === 0 ? { compactThreshold: 1 } : {}),
      };
  }
}

async function main(): Promise<void> {
  mkdirSync(outDir, { recursive: true });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const gateway = new OpenAiGateway({
    apiKey,
    models: { writer_premium: model },
  });

  const sessionId = `ctx-${arm}-${Date.now()}`;
  let state: GameState = createInitialState({
    sessionId,
    story: ACE,
    identity: {
      displayName: 'Ace',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId: ACE.archetypes[0]!.id,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

  const history: TurnRecord[] = [];
  /** Turns already covered by `prefixItems`; they stop being sent. */
  let compactedThrough = 0;
  let prefixItems: unknown[] | undefined;

  const metrics = `${outDir}/${arm}-metrics.jsonl`;
  const md: string[] = [
    `# Context arm \`${arm}\` — ${model}`,
    '',
    `${turns} turns, session \`${sessionId}\`.`,
    '',
  ];
  writeFileSync(metrics, '');

  for (let i = 0; i < turns; i++) {
    const actionText = SCRIPT(i);
    const sent = history.slice(compactedThrough);
    let result;
    try {
      result = await runTurnPure({
        gateway,
        story: ACE,
        state,
        recentTurns: sent,
        actionText,
        turnId: `${sessionId}-${i}`,
        prefixItems,
        ...policy(i),
      });
    } catch (error) {
      // A run that dies at turn 97 still answers the question up to turn 96,
      // so record the failure and stop rather than losing everything.
      appendFileSync(metrics, JSON.stringify({ turn: i + 1, error: String(error).slice(0, 300) }) + '\n');
      md.push(`## Turn ${i + 1} — FAILED`, '', '```', String(error).slice(0, 600), '```', '');
      break;
    }

    const inv = result.invocation;
    const compacted = Boolean(result.compaction);
    if (compacted) {
      prefixItems = [result.compaction];
      compactedThrough = history.length;
    }

    appendFileSync(
      metrics,
      JSON.stringify({
        turn: i + 1,
        arm,
        model,
        inputTokens: inv.inputTokens,
        cachedTokens: inv.cachedTokens ?? 0,
        cacheWriteTokens: inv.cacheWriteTokens ?? 0,
        outputTokens: inv.outputTokens,
        uncachedInput: inv.inputTokens - (inv.cachedTokens ?? 0),
        historyTurnsSent: sent.length,
        compacted,
        compactedThrough,
        latencyMs: inv.latencyMs,
      }) + '\n',
    );

    history.push({
      turnId: `${sessionId}-${i}`,
      sessionId,
      turnIndex: i,
      actionText,
      qualityTier: 'STANDARD',
      creditsCharged: 0,
      sceneSummary: result.sceneSummary,
      blocks: result.blocks,
      checks: [],
      stateDeltas: [],
      mutations: [],
      suggestions: result.suggestions,
      endStatePrompt: result.endStatePrompt,
      mediaPlan: null,
      heroImageUrl: null,
      revisionAfter: result.state.revision,
      createdAt: new Date().toISOString(),
      repairViolations: [],
      resolution: null,
      beatPlan: null,
    } as unknown as TurnRecord);
    state = result.state;

    const probe = isProbe(i);
    md.push(
      `## Turn ${i + 1}${probe ? ` — PROBE (${probe})` : ''}${compacted ? ' — COMPACTED' : ''}`,
      '',
      `**Player:** ${actionText}`,
      '',
      ...result.blocks.map((b) => `> ${b.speakerId ? `**${b.speakerId}.** ` : ''}${b.text}`),
      '',
      `*${result.endStatePrompt} · in=${inv.inputTokens} cached=${inv.cachedTokens ?? 0} out=${inv.outputTokens} sent=${sent.length} turns*`,
      '',
    );

    if ((i + 1) % 5 === 0) writeFileSync(`${outDir}/${arm}-transcript.md`, md.join('\n'));
    process.stdout.write(
      `${arm} t${i + 1}/${turns} in=${inv.inputTokens} cached=${inv.cachedTokens ?? 0} sent=${sent.length}${compacted ? ' COMPACTED' : ''}\n`,
    );
  }

  writeFileSync(`${outDir}/${arm}-transcript.md`, md.join('\n'));
  console.log(`\n${outDir}/${arm}-transcript.md`);
  console.log(metrics);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
