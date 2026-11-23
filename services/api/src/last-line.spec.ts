import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { ContinueCard, SessionSummary, type NarrativeBlock } from '@plotbreak/contracts';
import { NINTH_ARCHIVE } from '@plotbreak/test-fixtures';
import { createDefaultPipeline, RuleBasedModerator } from '@plotbreak/director';
import { JobQueue } from '@plotbreak/worker';
import { NoopSink } from '@plotbreak/analytics';
import { DevTokenVerifier } from './auth.js';
import { loadConfig, type AppContext } from './context.js';
import { capLine, lastSpokenLine, LAST_LINE_MAX } from './last-line.js';
import { MemoryRepository } from './repo/memory.js';
import { buildServer } from './server.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';
import { WalletService } from './wallet.js';

// `resolveAssetUrl` answers null with no CDN base configured, which would make
// the portrait assertions pass vacuously.
process.env.MEDIA_CDN_BASE_URL = 'https://cdn.test';

const story = NINTH_ARCHIVE;
const [first, second] = story.characters;

function line(speakerId: string | null, text: string, extra: Partial<NarrativeBlock> = {}): NarrativeBlock {
  return { type: speakerId ? 'DIALOGUE' : 'NARRATION', speakerId, text, visibility: 'GROUP', ...extra };
}

function turn(turnIndex: number, blocks: NarrativeBlock[]) {
  return { turnIndex, blocks };
}

describe('the last line a character spoke', () => {
  it('is the newest dialogue, across turns, read from the last block back', () => {
    const turns = [
      turn(0, [line(first!.id, '“The first thing.”')]),
      turn(1, [line(first!.id, '“Earlier in the beat.”'), line(second!.id, '“Later in the beat.”'), line(null, 'She turns away.')]),
      turn(2, [line(null, 'Nobody says anything for a while.')]),
    ];
    expect(lastSpokenLine(story, turns)).toEqual({
      characterId: second!.id,
      name: second!.name,
      portrait: `https://cdn.test/${second!.portrait}?v=${story.version}`,
      text: '“Later in the beat.”',
      turnIndex: 1,
    });
  });

  it('does not depend on the order the turns arrive in', () => {
    const turns = [turn(5, [line(second!.id, '“Newest.”')]), turn(4, [line(first!.id, '“Older.”')])];
    expect(lastSpokenLine(story, turns)?.text).toBe('“Newest.”');
  });

  it('skips a block with no speaker: narration, or the player', () => {
    const turns = [turn(3, [line(first!.id, '“Said by the cast.”'), { ...line(first!.id, 'x'), speakerId: null, text: '“Said by nobody.”' }])];
    expect(lastSpokenLine(story, turns)?.text).toBe('“Said by the cast.”');
  });

  it('skips a speaker the story does not have', () => {
    const turns = [turn(3, [line(first!.id, '“Known.”'), line('someone_cut_from_the_story', '“Unknown.”')])];
    expect(lastSpokenLine(story, turns)?.characterId).toBe(first!.id);
  });

  it('skips a line the player was never meant to hear', () => {
    const turns = [turn(3, [line(first!.id, '“Out loud.”'), line(second!.id, '“Aside.”', { visibility: 'NPC_PRIVATE' })])];
    expect(lastSpokenLine(story, turns)?.text).toBe('“Out loud.”');
  });

  it('skips an empty line', () => {
    const turns = [turn(3, [line(first!.id, '“Real.”'), line(second!.id, '   ')])];
    expect(lastSpokenLine(story, turns)?.text).toBe('“Real.”');
  });

  it('looks back three turns and no further', () => {
    const quiet = (i: number) => turn(i, [line(null, 'Rain.')]);
    const spoken = turn(0, [line(first!.id, '“Long ago.”')]);
    expect(lastSpokenLine(story, [spoken, quiet(1), quiet(2)])?.text).toBe('“Long ago.”');
    expect(lastSpokenLine(story, [spoken, quiet(1), quiet(2), quiet(3)])).toBeNull();
    expect(lastSpokenLine(story, [spoken, quiet(1), quiet(2), quiet(3)], 4)?.text).toBe('“Long ago.”');
  });

  it('is null for a run with no turns', () => {
    expect(lastSpokenLine(story, [])).toBeNull();
  });

  it('caps a long line on a word boundary and keeps its closing mark', () => {
    const long = `“${'word '.repeat(100).trim()}”`;
    const text = lastSpokenLine(story, [turn(1, [line(first!.id, long)])])!.text;
    expect(text.length).toBeLessThanOrEqual(LAST_LINE_MAX);
    expect(text.endsWith('word…”')).toBe(true);
    // And the result still fits the contract it is sent under.
    expect(() =>
      ContinueCard.shape.lastLine.parse({ characterId: 'a', name: 'A', portrait: null, text, turnIndex: 1 }),
    ).not.toThrow();
  });

  it('leaves a line under the cap alone, apart from trimming', () => {
    expect(capLine('  “Short.”  ')).toBe('“Short.”');
    expect(capLine('x'.repeat(LAST_LINE_MAX))).toBe('x'.repeat(LAST_LINE_MAX));
  });

  it('cuts one very long word where it stands', () => {
    const text = capLine('x'.repeat(400));
    expect(text).toBe(`${'x'.repeat(LAST_LINE_MAX - 1)}…`);
  });

  it('drops a dangling comma before the ellipsis', () => {
    expect(capLine('one two, three four', 12)).toBe('one two…');
  });
});

/**
 * The same rule, through the two routes that carry it. The opening beat is
 * rewritten with a line of dialogue, because the memory repository has no
 * model to write one.
 */
describe('the rows that show it', () => {
  const token = 'guest_last_line';
  const auth = { authorization: `Bearer ${token}` };
  let app: FastifyInstance & { ctx: AppContext };
  let ctx: AppContext;

  beforeEach(() => {
    const repo = new MemoryRepository();
    const config = loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv);
    ctx = {
      config,
      repo,
      wallet: new WalletService(repo),
      pipeline: createDefaultPipeline(),
      modelProvider: null,
      modelGateway: null,
      mediaGateway: null,
      analytics: new NoopSink(),
      jobs: new JobQueue(),
      auth: new DevTokenVerifier(),
      moderator: new RuleBasedModerator(),
      rateLimiter: { check: () => ({ allowed: true, retryAfterSeconds: 0, limit: 1e6, remaining: 1e6 }) },
      storeVerifier: createStoreVerifierFromEnv(config, {} as NodeJS.ProcessEnv),
    };
    app = buildServer({ ctx }) as typeof app;
  });

  afterEach(async () => {
    await app.close();
  });

  async function startRun(): Promise<string> {
    const response = await app.inject({
      method: 'POST',
      url: `/v1/stories/${story.storyId}/sessions`,
      headers: auth,
      payload: {
        identity: {
          displayName: 'Malik', pronouns: 'he/him', ageBand: null,
          archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
        },
        usedQuickSetup: true,
      },
    });
    expect(response.statusCode).toBe(201);
    const sessionId = response.json().session.sessionId as string;
    const [opening] = await ctx.repo.listTurns(sessionId);
    await ctx.repo.replaceNarration(opening!.turnId, {
      blocks: [line(null, 'The archive is quiet.'), line(first!.id, '“You are late.”')],
      sceneSummary: 'Late, again.\nSecond line.',
      endStatePrompt: opening!.endStatePrompt,
      stateDeltas: [],
    });
    return sessionId;
  }

  it('fills the Library row with the line and the recap', async () => {
    const sessionId = await startRun();
    const body = (await app.inject({ method: 'GET', url: '/v1/sessions', headers: auth })).json();
    const row = SessionSummary.parse(body.sessions.find((s: { sessionId: string }) => s.sessionId === sessionId));
    expect(row.lastLine).toMatchObject({ characterId: first!.id, name: first!.name, text: '“You are late.”', turnIndex: 0 });
    expect(row.recapLine).toBe('Late, again.');
  });

  it('sends nulls on the session response, which does not read the rows', async () => {
    const sessionId = await startRun();
    const body = (await app.inject({ method: 'GET', url: `/v1/sessions/${sessionId}`, headers: auth })).json();
    expect(body.session.lastLine).toBeNull();
    expect(body.session.recapLine).toBeNull();
  });

  it('fills the Continue row with who you are and the line', async () => {
    await startRun();
    const body = (await app.inject({ method: 'GET', url: '/v1/discover', headers: auth })).json();
    const card = ContinueCard.parse(body.continueCards[0]);
    expect(card.displayName).toBe('Malik');
    expect(card.lastLine?.text).toBe('“You are late.”');
    expect(card.recapLine).toBe('Late, again.');
  });

  it('still parses a card from a server that predates both fields', () => {
    const old = {
      sessionId: 's', storyId: 'st', title: 'T', coverImage: null, lastPlayedAt: '2026-11-23T00:00:00Z',
      turnCount: 3, currentObjective: null, recapLine: null,
    };
    expect(ContinueCard.parse(old)).toMatchObject({ displayName: null, lastLine: null });
  });
});
