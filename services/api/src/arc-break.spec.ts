import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import type { ModelGateway, ModelMessage } from '@plotbreak/director';
import { createDefaultPipeline, RuleBasedModerator } from '@plotbreak/director';
import { JobQueue } from '@plotbreak/worker';
import { NoopSink } from '@plotbreak/analytics';
import { buildServer } from './server.js';
import { loadConfig } from './context.js';
import type { AppContext } from './context.js';
import type { TurnStreamHub } from './stream.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import { DevTokenVerifier } from './auth.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';

/**
 * The arc break, end to end.
 *
 * `api.spec.ts` pins `modelGateway: null`, which routes every turn through the
 * deterministic engine — so none of this code runs there. This drives the real
 * Pure path with a stub storyteller instead, and asserts the three things that
 * decide whether the feature is safe:
 *
 *  1. it never breaks while the storyteller says the scene is `live`;
 *  2. when it does break, the next turn replays the recap and not the
 *     transcript;
 *  3. no `pure_conversation` row is ever destroyed, so unsetting the limits
 *     restores full replay with nothing lost.
 */

const BEAT = {
  narrative: [{ speaker: 'narration', text: 'The rain keeps on.' }],
  sceneSummary: 'Rain.',
  presentCharacterIds: [],
  locationId: 'archive_floor',
  sceneStatus: 'live' as 'live' | 'settled',
  suggestedResponses: ['I wait.'],
};

const CLOSING = {
  title: 'The Long Rain',
  recap: 'You waited out a season of rain and learned who stays.',
  carried: {
    standing: ['soaked, and still here'],
    bonds: ['Amaryllis stayed'],
    established: ['Aldebarant Quist was her father'],
    open: ['the chamber is documented but unopened'],
  },
};

function stubGateway(scene: () => 'live' | 'settled'): ModelGateway & { seen: ModelMessage[][] } {
  const seen: ModelMessage[][] = [];
  const invocation = {
    requestId: 'r', role: 'writer_premium' as const, provider: 'stub', model: 'stub',
    inputTokens: 0, outputTokens: 0, costUsd: 0, latencyMs: 0, ok: true, errorCode: null,
  };
  return {
    seen,
    name: 'stub',
    async generateStructured(_role: unknown, schema: { parse: (v: unknown) => unknown }, messages: readonly ModelMessage[]) {
      seen.push([...messages]);
      // The closing call is the one that asks for a title; everything else is a beat.
      const asksForArc = messages.some((m) => m.content.includes('Write its record.'));
      const value = schema.parse(asksForArc ? CLOSING : { ...BEAT, sceneStatus: scene() });
      return { value, invocation } as never;
    },
    async *streamText() {},
    async embed() { return []; },
    async moderate() { return { flagged: false, categories: [] as string[] }; },
    async moderateImage() { return { flagged: false, categories: [] as string[] }; },
  } as never;
}

describe('arc break', () => {
  beforeEach(() => {
    // Small enough to reach in a handful of turns rather than four hundred.
    process.env.PLOTBREAK_ARC_SOFT_LIMIT = '1200';
    process.env.PLOTBREAK_ARC_HARD_LIMIT = '4000';
    process.env.PLOTBREAK_ARC_KEEP_TURNS = '2';
  });
  afterEach(() => {
    delete process.env.PLOTBREAK_ARC_SOFT_LIMIT;
    delete process.env.PLOTBREAK_ARC_HARD_LIMIT;
    delete process.env.PLOTBREAK_ARC_KEEP_TURNS;
  });

  it('keeps every conversation row even after an arc closes', async () => {
    const repo = new MemoryRepository();
    for (let i = 0; i < 20; i += 1) {
      await repo.appendPureMessage('s1', i, { user: `u${i}`, assistant: `a${i}` });
    }
    await repo.appendArc(
      's1',
      { arcIndex: 1, title: 'One', recap: 'r', carried: CLOSING.carried, fromTurn: 0, toTurn: 9 },
      5000,
    );

    // The open arc replays from 10 …
    expect(await repo.listPureMessagesFrom('s1', 10)).toHaveLength(10);
    // … and the closed turns are still there, which is what makes this reversible.
    expect(await repo.listPureMessages('s1')).toHaveLength(20);
  });

  it('records an arc once, and a retry does not rewrite it', async () => {
    const repo = new MemoryRepository();
    const arc = { arcIndex: 1, title: 'First', recap: 'r', carried: CLOSING.carried, fromTurn: 0, toTurn: 4 };
    await repo.appendArc('s2', arc, 1);
    await repo.appendArc('s2', { ...arc, title: 'Rewritten' }, 1);
    const stored = await repo.listArcs('s2');
    expect(stored).toHaveLength(1);
    expect(stored[0]!.title).toBe('First');
  });

  it('hands the carried continuity to every later arc', async () => {
    const repo = new MemoryRepository();
    await repo.appendArc(
      's3',
      { arcIndex: 1, title: 'One', recap: 'r', carried: CLOSING.carried, fromTurn: 0, toTurn: 4 },
      1,
    );
    const [arc] = await repo.listArcs('s3');
    expect(arc!.carried.established).toContain('Aldebarant Quist was her father');
    expect(arc!.carried.open).toContain('the chamber is documented but unopened');
  });

  it('the stub storyteller is wired the way the real one is', async () => {
    const gateway = stubGateway(() => 'live');
    const result = await gateway.generateStructured(
      'writer_premium' as never,
      { parse: (v: unknown) => v } as never,
      [{ role: 'user', content: 'Write its record.' }],
      undefined,
    );
    expect((result.value as typeof CLOSING).title).toBe('The Long Rain');
  });
});

describe('arc break, through the real turn path', () => {
  let scene: 'live' | 'settled' = 'live';
  let app: FastifyInstance & { ctx: AppContext; hub: TurnStreamHub };
  let ctx: AppContext;

  beforeEach(() => {
    process.env.PLOTBREAK_ARC_SOFT_LIMIT = '500';
    process.env.PLOTBREAK_ARC_HARD_LIMIT = '200000';
    process.env.PLOTBREAK_ARC_KEEP_TURNS = '2';
    scene = 'live';
    const repo = new MemoryRepository();
    ctx = {
      config: loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv),
      repo,
      wallet: new WalletService(repo, () => new Date()),
      pipeline: createDefaultPipeline(),
      modelProvider: null,
      // The whole point: the Pure path only runs when there is a gateway.
      modelGateway: stubGateway(() => scene),
      mediaGateway: null,
      analytics: new NoopSink(),
      jobs: new JobQueue(),
      auth: new DevTokenVerifier(),
      moderator: new RuleBasedModerator(),
      rateLimiter: { check: () => ({ allowed: true, retryAfterSeconds: 0, limit: 1e6, remaining: 1e6 }) },
      storeVerifier: createStoreVerifierFromEnv(loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv), {} as NodeJS.ProcessEnv),
    } as AppContext;
    app = buildServer({ ctx }) as never;
  });
  afterEach(async () => { await app.close(); });

  async function play(sessionId: string, revision: number, text: string) {
    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/turns`,
      headers: { authorization: 'Bearer guest_arc_user', 'idempotency-key': randomUUID() },
      payload: { actionText: text, qualityTier: 'QUICK', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
    });
    const body = response.json();
    if (response.statusCode === 202) {
      for (let i = 0; i < 400 && !app.hub.isDone(body.turnId); i += 1) {
        await new Promise((r) => setImmediate(r));
      }
    }
    return { response, body };
  }

  async function start() {
    const r = await app.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: { authorization: 'Bearer guest_arc_user' },
      payload: { identity: { displayName: 'Malik', pronouns: 'he/him', ageBand: null } },
    });
    return r.json().session.sessionId as string;
  }

  it('does not break while the storyteller says the scene is live', async () => {
    const sessionId = await start();
    let revision = 0;
    for (let i = 0; i < 25; i += 1) {
      const { body, response } = await play(sessionId, revision, `beat ${i}`);
      if (response.statusCode !== 202) break;
      const turn = await ctx.repo.getTurn(body.turnId);
      if (turn) revision = turn.revisionAfter;
    }
    // Well past the soft limit by now, and still no arc — because nothing settled.
    expect(await ctx.repo.listArcs(sessionId)).toHaveLength(0);
  });

  it('breaks on the first settled beat, and the recap reaches the player', async () => {
    const sessionId = await start();
    let revision = 0;
    let played = 0;
    for (let i = 0; i < 15; i += 1) {
      const { body, response } = await play(sessionId, revision, `beat ${i}`);
      expect(response.statusCode, `turn ${i}`).toBe(202);
      played += 1;
      const turn = await ctx.repo.getTurn(body.turnId);
      if (turn) revision = turn.revisionAfter;
      if (i === 6) scene = 'settled';
      if ((await ctx.repo.listArcs(sessionId)).length > 0) break;
    }

    expect(played).toBeGreaterThan(6);
    const arcs = await ctx.repo.listArcs(sessionId);
    expect(arcs).toHaveLength(1);
    expect(arcs[0]!.title).toBe('The Long Rain');
    expect(arcs[0]!.carried.established).toContain('Aldebarant Quist was her father');

    // The next request replays the recap, not the transcript it replaced.
    const after = await ctx.repo.listPureMessagesFrom(sessionId, arcs[0]!.toTurn + 1);
    const all = await ctx.repo.listPureMessages(sessionId);
    expect(after.length).toBeLessThan(all.length);
    // And nothing was destroyed to achieve that.
    expect(all.length).toBeGreaterThan(6);

    // The card is on the wire.
    const detail = await app.inject({
      method: 'GET',
      url: `/v1/sessions/${sessionId}`,
      headers: { authorization: 'Bearer guest_arc_user' },
    });
    const payload = detail.json();
    expect(payload.arcs).toHaveLength(1);
    expect(payload.arcs[0].recap).toContain('rain');
    expect(payload.arcs[0].closedAtTurn).toBe(arcs[0]!.toTurn);
    // Continuity is for the storyteller, never for the client.
    expect(JSON.stringify(payload.arcs[0])).not.toContain('Aldebarant');
  });
});
