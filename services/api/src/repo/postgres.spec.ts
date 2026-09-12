import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Client } from 'pg';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import { createInitialState } from '@aniplay/engine';
import type { GameState, LedgerEntry, TurnRecord } from '@aniplay/contracts';
import { PostgresRepository } from './postgres.js';
import type { SessionRecord, UserRecord } from './types.js';

/**
 * The persistence tests that matter are the ones an in-process store cannot
 * answer: does a run survive the process that created it, and can two turns
 * race without both committing.
 *
 * Runs against a real Postgres when TEST_DATABASE_URL points at one. Without it
 * the suite is skipped rather than faked — a green run against a mock would say
 * nothing about the thing being tested.
 *
 *   createdb anima_test
 *   npm run migrate -- --url=postgres://localhost/anima_test --reset
 *   TEST_DATABASE_URL=postgres://localhost/anima_test npm test
 */
const URL = process.env.TEST_DATABASE_URL;
const STORY = LAUNCH_CATALOG[0]!;

const uuid = (): string => crypto.randomUUID();

describe.skipIf(!URL)('PostgresRepository', () => {
  let repo: PostgresRepository;
  let admin: Client;

  beforeAll(async () => {
    admin = new Client({ connectionString: URL });
    await admin.connect();
    repo = new PostgresRepository({ connectionString: URL! });
    await repo.ping();
  });

  afterAll(async () => {
    await repo.close();
    await admin.end();
  });

  async function makeUser(): Promise<UserRecord> {
    const user: UserRecord = {
      userId: uuid(),
      displayName: 'Test Player',
      handle: `player_${Math.random().toString(36).slice(2, 10)}`,
      email: 'player@example.com',
      isGuest: false,
      avatarUrl: null,
      ageVerified: true,
      createdAt: new Date().toISOString(),
      settings: {
        showAdvancedRelationshipStats: false,
        showCheckMath: false,
        reduceMotion: false,
        voiceAutoplay: false,
        hapticsEnabled: true,
        defaultQualityTier: 'VIVID',
        contentFilters: [],
        locale: null,
      },
      migratedFromGuestId: null,
      deletionRequestedAt: null,
    };
    await repo.createUser(user);
    return user;
  }

  async function makeSession(userId: string): Promise<{ record: SessionRecord; state: GameState }> {
    const sessionId = `sess_${uuid()}`;
    const state = createInitialState({
      sessionId,
      story: STORY,
      identity: {
        displayName: 'Rell',
        pronouns: 'they/them',
        ageBand: null,
        archetypeId: STORY.archetypes[0]!.id,
        worldKnowsAboutYou: 'Arrived a term late.',
        advanced: {},
        portraitAssetId: null,
      },
    });
    const record: SessionRecord = {
      sessionId,
      userId,
      storyId: STORY.storyId,
      storyVersionId: STORY.id,
      displayName: 'Rell',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      lastPlayedAt: new Date().toISOString(),
      sessionSeed: 'seed',
      forkedFromSessionId: null,
      forkedAtTurnIndex: null,
      branchKey: 'main',
    };
    await repo.createSession(record, state);
    return { record, state };
  }

  it('serves the seeded catalog', async () => {
    const stories = await repo.listStories();
    expect(stories.length).toBeGreaterThanOrEqual(LAUNCH_CATALOG.length);
    expect(await repo.getStoryByStoryId(STORY.storyId)).toMatchObject({ title: STORY.title });
  });

  it('keeps a user and their settings across a restart', async () => {
    const user = await makeUser();
    await repo.updateUser(user.userId, { settings: { ...user.settings, showCheckMath: true } });

    // A second repository is a second process as far as the database knows.
    const restarted = new PostgresRepository({ connectionString: URL! });
    try {
      const loaded = await restarted.getUser(user.userId);
      expect(loaded?.handle).toBe(user.handle);
      expect(loaded?.settings.showCheckMath).toBe(true);
      expect(loaded?.email).toBe('player@example.com');
    } finally {
      await restarted.close();
    }
  });

  it('keeps a whole run across a restart', async () => {
    const user = await makeUser();
    const { record, state } = await makeSession(user.userId);

    const advanced: GameState = {
      ...structuredClone(state),
      revision: state.revision + 1,
      turnIndex: 1,
      flags: { ...state.flags, 'met:someone': true },
    };
    expect(await repo.saveState(record.sessionId, state.revision, advanced)).toBe(true);

    const turn: TurnRecord = {
      turnId: `turn_${uuid()}`,
      sessionId: record.sessionId,
      turnIndex: 1,
      actionText: 'I look around.',
      qualityTier: 'VIVID',
      creditsCharged: 1,
      sceneSummary: 'Looked around the stacks.',
      blocks: [],
      checks: [],
      stateDeltas: [],
      mutations: [],
      suggestions: [],
      endStatePrompt: 'What do you do?',
      mediaPlan: null,
      heroImageUrl: null,
      revisionAfter: advanced.revision,
      createdAt: new Date().toISOString(),
      repairViolations: [],
      resolution: null,
      beatPlan: null,
    };
    await repo.appendTurn(turn);
    await repo.appendEvents([
      {
        eventId: `ev_${uuid()}`,
        sessionId: record.sessionId,
        turnId: turn.turnId,
        sequence: 1,
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: 'OBSERVATION',
        payload: { flag: 'met:someone', value: true },
        worldMinute: 10,
        createdAt: new Date().toISOString(),
      },
    ]);
    await repo.appendMemories(record.sessionId, [
      {
        factId: `fact_${uuid()}`,
        subjectId: 'player',
        predicate: 'did',
        value: null,
        text: 'Looked around the stacks.',
        visibility: 'WORLD_PUBLIC',
        importance: 0.4,
        confidence: 1,
        pinned: false,
        createdAtTurn: 1,
        createdAtWorldMinute: 10,
        sourceEventIds: [],
        supersededByFactId: null,
        correctedByPlayer: false,
      },
    ]);

    const restarted = new PostgresRepository({ connectionString: URL! });
    try {
      expect((await restarted.getSession(record.sessionId))?.displayName).toBe('Rell');
      const loaded = await restarted.getState(record.sessionId);
      expect(loaded?.revision).toBe(advanced.revision);
      expect(loaded?.flags['met:someone']).toBe(true);
      expect(await restarted.listTurns(record.sessionId)).toHaveLength(1);
      expect(await restarted.listEvents(record.sessionId)).toHaveLength(1);
      expect(await restarted.listMemories(record.sessionId)).toHaveLength(1);
      expect((await restarted.listSessions(user.userId)).map((s) => s.sessionId)).toContain(
        record.sessionId,
      );
    } finally {
      await restarted.close();
    }
  });

  it('lets exactly one of two racing turns commit', async () => {
    const user = await makeUser();
    const { record, state } = await makeSession(user.userId);

    const attempt = (flag: string): Promise<boolean> =>
      repo.saveState(record.sessionId, state.revision, {
        ...structuredClone(state),
        revision: state.revision + 1,
        flags: { ...state.flags, [flag]: true },
      });

    const results = await Promise.all([attempt('first'), attempt('second')]);
    expect(results.filter(Boolean)).toHaveLength(1);

    const after = await repo.getState(record.sessionId);
    expect(after?.revision).toBe(state.revision + 1);
    // Exactly one of the two writes is visible, never a blend of both.
    expect(Boolean(after?.flags.first) !== Boolean(after?.flags.second)).toBe(true);
  });

  it('refuses a write against a revision that has moved on', async () => {
    const user = await makeUser();
    const { record, state } = await makeSession(user.userId);
    const next = { ...structuredClone(state), revision: state.revision + 1 };
    expect(await repo.saveState(record.sessionId, state.revision, next)).toBe(true);
    expect(await repo.saveState(record.sessionId, state.revision, next)).toBe(false);
  });

  it('remembers the state a turn started from, so a fork has something to return to', async () => {
    const user = await makeUser();
    const { record, state } = await makeSession(user.userId);
    await repo.putStateSnapshot(record.sessionId, 3, {
      ...structuredClone(state),
      flags: { ...state.flags, before_turn_three: true },
    });

    const restarted = new PostgresRepository({ connectionString: URL! });
    try {
      const snapshot = await restarted.getStateSnapshot(record.sessionId, 3);
      expect(snapshot?.flags.before_turn_three).toBe(true);
      expect(await restarted.getStateSnapshot(record.sessionId, 4)).toBeNull();
      // A snapshot is history, never mistaken for the live state.
      expect((await restarted.getState(record.sessionId))?.flags.before_turn_three).toBeUndefined();
    } finally {
      await restarted.close();
    }
  });

  it('credits a repeated grant exactly once', async () => {
    const user = await makeUser();
    const accountId = `acct_${user.userId}`;
    const entry: LedgerEntry = {
      id: `led_${uuid()}`,
      accountId,
      type: 'PURCHASE',
      amount: 500,
      balanceAfter: 500,
      reasonCode: 'STORE_PURCHASE',
      referenceId: 'txn_1',
      idempotencyKey: 'store:txn_1',
      createdAt: new Date().toISOString(),
      metadata: {},
    };

    await repo.appendLedgerEntry(entry);
    // The same purchase arriving twice — a retried request, or Apple replaying
    // a transaction — must not be a second 500 credits.
    await repo.appendLedgerEntry({ ...entry, id: `led_${uuid()}` });

    const ledger = await repo.listLedger(accountId);
    expect(ledger.filter((e) => e.idempotencyKey === 'store:txn_1')).toHaveLength(1);
    expect(await repo.findLedgerEntryByIdempotencyKey(accountId, 'store:txn_1')).toMatchObject({
      amount: 500,
    });
  });

  it('keeps an idempotency record so a retried turn returns the first answer', async () => {
    const user = await makeUser();
    const { record } = await makeSession(user.userId);
    const key = `idem_${uuid()}`;
    await repo.putIdempotency({
      key,
      userId: user.userId,
      sessionId: record.sessionId,
      requestHash: 'hash',
      turnId: 'turn_1',
      status: 'IN_PROGRESS',
      responseBody: null,
      createdAt: new Date().toISOString(),
    });
    await repo.updateIdempotency(key, { status: 'COMPLETED', responseBody: { ok: true } });

    const restarted = new PostgresRepository({ connectionString: URL! });
    try {
      const loaded = await restarted.getIdempotency(key);
      expect(loaded?.status).toBe('COMPLETED');
      expect(loaded?.responseBody).toEqual({ ok: true });
    } finally {
      await restarted.close();
    }
  });

  it('stores saves, hides and blocks per user', async () => {
    const user = await makeUser();
    const other = await makeUser();
    await repo.setSaved(user.userId, STORY.storyId, true);
    await repo.setHidden(user.userId, LAUNCH_CATALOG[1]!.storyId, true);
    await repo.setBlocked(user.userId, other.userId, true);

    expect(await repo.getSaves(user.userId)).toEqual([STORY.storyId]);
    expect(await repo.getHidden(user.userId)).toEqual([LAUNCH_CATALOG[1]!.storyId]);
    expect(await repo.listBlocks(user.userId)).toEqual([other.userId]);
    // One player's shelf is not another's.
    expect(await repo.getSaves(other.userId)).toEqual([]);

    await repo.setSaved(user.userId, STORY.storyId, false);
    expect(await repo.getSaves(user.userId)).toEqual([]);
  });

  it('deletes an account and its runs, and keeps the financial record', async () => {
    const user = await makeUser();
    const { record } = await makeSession(user.userId);
    const accountId = `acct_${user.userId}`;
    await repo.appendLedgerEntry({
      id: `led_${uuid()}`,
      accountId,
      type: 'PURCHASE',
      amount: 100,
      balanceAfter: 100,
      reasonCode: 'STORE_PURCHASE',
      referenceId: null,
      idempotencyKey: null,
      createdAt: new Date().toISOString(),
      metadata: {},
    });

    await repo.deleteUser(user.userId);

    expect(await repo.getUser(user.userId)).toBeNull();
    expect(await repo.getSession(record.sessionId)).toBeNull();
    expect(await repo.getState(record.sessionId)).toBeNull();
    // Spec §30 — the ledger outlives the profile and is purged separately.
    expect(await repo.listLedger(accountId)).toHaveLength(1);
  });

  /**
   * The auto-hide, against real SQL.
   *
   * The memory repository has its own copy of this logic and passing there
   * says nothing about the statements that actually run in production — two
   * implementations of one rule is the shape of bug this codebase produces
   * most often. The threshold, the distinct-reporter constraint and the single
   * case all live in Postgres, so they get tested in Postgres.
   */
  it('hides a comment once three different people report it', async () => {
    const author = await makeUser();
    const commentId = `cmt_${uuid()}`;
    await repo.addComment({
      commentId,
      storyId: STORY.storyId,
      userId: author.userId,
      authorName: 'Test Player',
      body: 'three people will object to this',
      kind: 'USER',
      spoiler: false,
      likes: 0,
      createdAt: new Date().toISOString(),
    });

    const listed = async (): Promise<boolean> =>
      (await repo.listComments(STORY.storyId, 'NEW', 100)).some((c) => c.commentId === commentId);

    const reporters = [await makeUser(), await makeUser(), await makeUser()];
    expect(await repo.reportComment(`crp_${uuid()}`, commentId, reporters[0]!.userId, 'ABUSE')).toBe(false);
    expect(await repo.reportComment(`crp_${uuid()}`, commentId, reporters[1]!.userId, 'ABUSE')).toBe(false);
    expect(await listed()).toBe(true);

    expect(await repo.reportComment(`crp_${uuid()}`, commentId, reporters[2]!.userId, 'ABUSE')).toBe(true);
    expect(await listed()).toBe(false);

    const queue = await repo.listModerationQueue();
    const item = queue.find((i) => i.subjectId === commentId);
    expect(item?.kind).toBe('CASE');
    expect(item?.reports).toBe(3);

    // A fourth report after the takedown must not open a second case, or the
    // queue fills with duplicates of one decision.
    const fourth = await makeUser();
    expect(await repo.reportComment(`crp_${uuid()}`, commentId, fourth.userId, 'ABUSE')).toBe(false);
    expect((await repo.listModerationQueue()).filter((i) => i.subjectId === commentId)).toHaveLength(1);

    await repo.restoreComment(commentId);
    expect(await listed()).toBe(true);
    // And the case closes with it. A restored comment still sitting in the
    // queue is how a reviewer loses track of what is actually outstanding.
    expect((await repo.listModerationQueue()).some((i) => i.subjectId === commentId)).toBe(false);
  });

  it('does not hide on one person reporting repeatedly', async () => {
    const author = await makeUser();
    const commentId = `cmt_${uuid()}`;
    await repo.addComment({
      commentId,
      storyId: STORY.storyId,
      userId: author.userId,
      authorName: 'Test Player',
      body: 'one heckler is not a consensus',
      kind: 'USER',
      spoiler: false,
      likes: 0,
      createdAt: new Date().toISOString(),
    });

    const heckler = await makeUser();
    for (let i = 0; i < 5; i += 1) {
      // Same reporter, new report id each time. ON CONFLICT DO NOTHING is what
      // makes this a no-op, so this asserts the unique constraint is carrying
      // the weight rather than the id generator.
      expect(await repo.reportComment(`crp_${uuid()}`, commentId, heckler.userId, 'ABUSE')).toBe(false);
    }
    expect(
      (await repo.listComments(STORY.storyId, 'NEW', 100)).some((c) => c.commentId === commentId),
    ).toBe(true);
  });

  /**
   * The crash grouping, against real SQL.
   *
   * array_agg with an ORDER BY inside it, make_interval and string_agg DISTINCT
   * are not things the in-memory twin exercises in any meaningful way. If this
   * query is wrong the first anyone learns of it is during an outage, which is
   * the worst possible moment to debug a reporting tool.
   */
  it('groups crashes by fingerprint and counts devices rather than rows', async () => {
    // Unique per run. A fixed fingerprint makes the second `npm test` against
    // the same database fail on a count of ten, which looks like a bug in the
    // query rather than in the test.
    const fpA = `fp_${uuid()}`;
    const fpB = `fp_${uuid()}`;
    const loop = `ins_loop_${uuid()}`;
    const other = `ins_other_${uuid()}`;
    const third = `ins_third_${uuid()}`;
    const message = `grouping test failure ${fpA}`;
    const base = {
      userId: null,
      platform: 'ios',
      appVersion: '1.0.0',
      osVersion: '18.2',
      locale: 'en',
      screen: 'StoryDetail',
      stack: 'at StoryDetail\nat Navigation',
      createdAt: new Date().toISOString(),
    };

    // One handset looping, one other player hitting the same bug once.
    for (let i = 0; i < 4; i += 1) {
      await repo.recordClientError({
        ...base,
        errorId: `cer_${uuid()}`,
        installId: loop,
        message,
        fingerprint: fpA,
      });
    }
    await repo.recordClientError({
      ...base,
      errorId: `cer_${uuid()}`,
      installId: other,
      appVersion: '1.0.1',
      message,
      fingerprint: fpA,
    });
    // A different bug, one device.
    await repo.recordClientError({
      ...base,
      errorId: `cer_${uuid()}`,
      installId: third,
      message: `a different failure ${fpB}`,
      fingerprint: fpB,
    });

    const groups = await repo.listClientErrorGroups(24, 50);
    const a = groups.find((g) => g.fingerprint === fpA);
    expect(a?.count).toBe(5);
    expect(a?.devices).toBe(2);
    expect(a?.message).toBe(message);
    // Which builds it appears in, so "did we just make it worse" is answerable.
    expect(a?.appVersions.split(', ').sort()).toEqual(['1.0.0', '1.0.1']);

    // Two devices beats one, regardless of row count.
    expect(groups.findIndex((g) => g.fingerprint === fpA)).toBeLessThan(
      groups.findIndex((g) => g.fingerprint === fpB),
    );
  });

  it('excludes crashes older than the window', async () => {
    const ancient = `fp_${uuid()}`;
    await repo.recordClientError({
      errorId: `cer_${uuid()}`,
      userId: null,
      installId: `ins_ancient_${uuid()}`,
      platform: 'ios',
      appVersion: '0.9.0',
      osVersion: '17.0',
      locale: 'en',
      screen: 'Discover',
      message: 'a crash from last week',
      stack: '',
      fingerprint: ancient,
      createdAt: new Date(Date.now() - 8 * 24 * 3600_000).toISOString(),
    });
    const recent = await repo.listClientErrorGroups(24, 50);
    expect(recent.some((g) => g.fingerprint === ancient)).toBe(false);
    const wider = await repo.listClientErrorGroups(24 * 30, 50);
    expect(wider.some((g) => g.fingerprint === ancient)).toBe(true);
  });

  it('counts discovery signals without letting them go negative', async () => {
    await repo.bumpSignal(STORY.storyId, 'runs', 3);
    const after = await repo.getSignals(STORY.storyId);
    expect(after.runs).toBeGreaterThanOrEqual(3);
    await repo.bumpSignal(STORY.storyId, 'hides', -5);
    expect((await repo.getSignals(STORY.storyId)).hides).toBe(0);
  });
});
