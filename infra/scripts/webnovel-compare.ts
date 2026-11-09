/**
 * Plays the first beats of a story twice with the real storyteller: the
 * version players had before the web-novel rewrite, and the current one.
 * Same player, same moves where the moves can be the same, so the difference
 * on the page is the difference in the writing.
 *
 * No database: it calls the production turn path (`runTurnPure`) directly with
 * an in-memory state, at the Vivid tier everybody starts on.
 *
 *   MODEL_PROVIDER=openai npx tsx infra/scripts/webnovel-compare.ts [--story=story_pink_tide] [--out=file.json]
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { createInitialState } from '@plotbreak/engine';
import { QUALITY_TIERS, type StoryVersion } from '@plotbreak/contracts';
import { createGatewayFromEnv, runTurnPure, WEBNOVEL_WORDS, type RenderedTurn } from '@plotbreak/director';
import { SECOND_SKIN, PINK_TIDE, ITACHI, GOOD_MORNING_HUSBAND, ZERO_THRONE } from '@plotbreak/test-fixtures';

/** What a casual player typed on the second turn, in the register real players use. */
const TYPED: Record<string, string> = {
  story_pink_tide: 'lol ok *splashes her back*',
  story_second_skin: 'who are you',
  story_itachi: 'its nothing mom',
  story_good_morning_husband: '*kisses her cheek* morning babe',
  story_zero_throne: 'what the hell',
};

const FILES: Record<string, string> = {
  story_pink_tide: 'pink-tide',
  story_second_skin: 'second-skin',
  story_itachi: 'itachi',
  story_good_morning_husband: 'good-morning-husband',
  story_zero_throne: 'zero-throne',
};

/** The opening and its suggestions exactly as they were at `ref`. */
function openingAt(storyId: string, ref: string): { opening: string; openingSuggestions: string[] } {
  const src = execSync(`git show ${ref}:packages/test-fixtures/src/${FILES[storyId]}.ts`, { encoding: 'utf8', maxBuffer: 64e6 });
  const block = src.match(/\n  opening:\n([\s\S]*?)\n  openingSuggestions: (\[[\s\S]*?\n  \]),\n/);
  if (!block) throw new Error(`no opening in ${storyId}@${ref}`);
  // The fixture is TypeScript; these two values are plain string expressions.
  // eslint-disable-next-line no-new-func
  const opening = new Function(`return (${block[1]!.trim().replace(/,$/, '')});`)() as string;
  // eslint-disable-next-line no-new-func
  const openingSuggestions = new Function(`return (${block[2]});`)() as string[];
  return { opening, openingSuggestions };
}

function before(story: StoryVersion, ref: string): StoryVersion {
  const { proseStyle: _p, ...rules } = story.rules;
  const { openingPanel: _o, ...rest } = story;
  return { ...rest, ...openingAt(story.storyId, ref), rules: { ...rules, styleExamples: [] } } as StoryVersion;
}

interface Beat {
  action: string;
  text: string;
  words: number;
  face: string | null;
  suggestions: string[];
}

async function play(story: StoryVersion): Promise<{ opening: string; suggestions: string[]; beats: Beat[] }> {
  const gateway = createGatewayFromEnv(process.env);
  if (!gateway) throw new Error('no model key');
  const webnovel = story.rules.proseStyle === 'webnovel';
  let state = createInitialState({
    sessionId: `compare-${story.storyId}-${webnovel ? 'new' : 'old'}`,
    story,
    identity: {
      displayName: 'Alex', pronouns: 'he/him', ageBand: null,
      archetypeId: story.archetypes[0]?.id ?? null, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  } as never);
  const rendered: RenderedTurn[] = [];
  const beats: Beat[] = [];
  let suggestions = story.openingSuggestions;
  const vivid = QUALITY_TIERS.VIVID;
  for (let i = 0; i < 3; i += 1) {
    const action = i === 1 ? TYPED[story.storyId]! : suggestions[0]!;
    const result = await runTurnPure({
      gateway, story, state, recentTurns: [], rendered, shape: 'append', actionText: action, turnId: `t${i}`,
      cacheKey: null, model: vivid.model, reasoningEffort: (vivid as { reasoningEffort?: never }).reasoningEffort,
      wordTarget: webnovel ? WEBNOVEL_WORDS.VIVID : vivid.words, maxTokens: vivid.maxOutputTokens,
    });
    const text = result.blocks.map((b) => (b.speakerId ? `${story.characters.find((c) => c.id === b.speakerId)?.name ?? b.speakerId}: ${b.text}` : b.text)).join('\n\n');
    beats.push({
      action,
      text,
      words: result.blocks.map((b) => b.text).join(' ').split(/\s+/).filter(Boolean).length,
      face: result.reaction ? `${result.reaction.characterId}/${result.reaction.emotion}${result.reactionEarly ? ' (top)' : ''}` : null,
      suggestions: result.suggestions.map((s) => s.text),
    });
    suggestions = result.suggestions.map((s) => s.text);
    state = result.state;
    rendered.push(result.rendered);
  }
  return { opening: story.opening, suggestions: story.openingSuggestions, beats };
}

async function main(): Promise<void> {
  const only = process.argv.find((a) => a.startsWith('--story='))?.split('=')[1];
  const out = process.argv.find((a) => a.startsWith('--out='))?.split('=')[1];
  const ref = process.argv.find((a) => a.startsWith('--ref='))?.split('=')[1] ?? 'HEAD';
  const results: Record<string, unknown> = {};
  for (const story of [SECOND_SKIN, PINK_TIDE, ITACHI, GOOD_MORNING_HUSBAND, ZERO_THRONE]) {
    if (only && story.storyId !== only) continue;
    const [oldRun, newRun] = await Promise.all([play(before(story, ref)), play(story)]);
    results[story.storyId] = { title: story.title, old: oldRun, new: newRun };
    const words = (r: typeof oldRun) => r.beats.map((b) => b.words).join('/');
    console.log(`${story.title}: old ${words(oldRun)} words, new ${words(newRun)} words, faces new: ${newRun.beats.map((b) => b.face ?? '-').join(', ')}`);
  }
  if (out) writeFileSync(out, JSON.stringify(results, null, 2));
}

void main();
