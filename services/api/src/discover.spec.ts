import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import type { GameState, StoryDraft, StoryVersion } from '@plotbreak/contracts';
import { createDefaultPipeline, RuleBasedModerator } from '@plotbreak/director';
import { JobQueue } from '@plotbreak/worker';
import { NoopSink } from '@plotbreak/analytics';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { buildServer } from './server.js';
import { loadConfig, type AppContext } from './context.js';
import { DevTokenVerifier } from './auth.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';
import { MemoryRepository } from './repo/memory.js';
import type { SessionRecord } from './repo/types.js';
import { WalletService } from './wallet.js';

/**
 * Discover, read the way a returning player reads it: on one day, then the next.
 *
 * Every spec pins the clock (`BuildServerOptions.now`) and builds the activity
 * it needs into an in-memory repository, so "the same all day, different
 * tomorrow" is asserted rather than hoped for.
 */

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
/** When the catalogue last released anything: every release stamps a `publishedAt`. */
const CATALOG_NEWEST = LAUNCH_CATALOG.flatMap((s) => (s.publishedAt ? [s.publishedAt] : [])).sort().at(-1)!;
/**
 * 15:00 UTC, three days after the latest release. Pinned to a fixed date
 * (21 November) the clock fell behind the first new-50 release, which stamped 37
 * worlds the next day: the official catalogue was then newer than "yesterday".
 */
const TODAY = new Date(Date.parse(CATALOG_NEWEST.slice(0, 10)) + 3 * DAY + 15 * HOUR);
const TOMORROW = new Date(TODAY.getTime() + DAY);
const ago = (ms: number, from: Date = TODAY): Date => new Date(from.getTime() - ms);

interface Harness {
  readonly app: FastifyInstance;
  readonly repo: MemoryRepository;
  /** Moves the clock the shelves and the repository both read. */
  setNow(at: Date): void;
}

const open: FastifyInstance[] = [];
afterEach(async () => {
  await Promise.all(open.splice(0).map((app) => app.close()));
});

function harness(stories: readonly StoryVersion[] = LAUNCH_CATALOG, start: Date = TODAY): Harness {
  let now = start;
  const clock = () => now;
  const repo = new MemoryRepository(stories, clock);
  const config = loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv);
  const ctx: AppContext = {
    config,
    repo,
    wallet: new WalletService(repo, clock),
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
  const app = buildServer({ ctx, now: clock });
  open.push(app);
  return { app, repo, setNow: (at) => { now = at; } };
}

interface Rail {
  readonly id: string;
  readonly kind: string;
  readonly title: string;
  readonly titleKey: string | null;
  readonly stories: Array<{ storyId: string; official: boolean; badges: string[]; coverImage: string | null }>;
}
interface DiscoverBody {
  readonly rails: Rail[];
}

async function discover(h: Harness, headers: Record<string, string> = {}): Promise<DiscoverBody> {
  const response = await h.app.inject({ method: 'GET', url: '/v1/discover', headers });
  expect(response.statusCode).toBe(200);
  return response.json() as DiscoverBody;
}

const rail = (body: DiscoverBody, id: string): Rail | undefined => body.rails.find((r) => r.id === id);
const idsOf = (body: DiscoverBody, id: string): string[] => rail(body, id)?.stories.map((s) => s.storyId) ?? [];

/** A fixture, re-dressed as a world a player made and published at `at`. */
function communityWorld(n: number, at: Date, base: StoryVersion = LAUNCH_CATALOG[n % LAUNCH_CATALOG.length]!): StoryVersion {
  return {
    ...base,
    id: `sv_user_${n}`,
    storyId: `story_user_${n}`,
    version: 1,
    title: `Community world ${n}`,
    official: false,
    creatorId: `creator_${n}`,
    creatorName: `Creator ${n}`,
    sourceLocale: 'en',
    publishedAt: at.toISOString(),
  };
}

/** Publishes a world the way Create does, at `at`. */
async function publish(repo: MemoryRepository, story: StoryVersion, at: Date): Promise<void> {
  const draft = { draftId: `draft_${story.storyId}`, ownerId: story.creatorId } as unknown as StoryDraft;
  await repo.publishDraft({ draft, story, slug: story.storyId, visibility: 'PUBLIC', at: at.toISOString() });
}

/** `players` distinct people (other than whoever is reading) starting a run at `at`. */
async function play(repo: MemoryRepository, storyId: string, players: number, at: Date): Promise<void> {
  for (let i = 0; i < players; i++) {
    const record: SessionRecord = {
      sessionId: `sess_${storyId}_${i}_${at.getTime()}`,
      userId: `other_${storyId}_${i}`,
      storyId,
      storyVersionId: `${storyId}_v`,
      displayName: 'Someone',
      status: 'ACTIVE',
      createdAt: at.toISOString(),
      lastPlayedAt: at.toISOString(),
      sessionSeed: 'seed',
      forkedFromSessionId: null,
      forkedAtTurnIndex: null,
      branchKey: 'main',
    };
    await repo.createSession(record, {} as GameState);
  }
}

// ---------------------------------------------------------------------------

describe('New on Plotbreak', () => {
  it('leads with the world published most recently, not the lowest score', async () => {
    const yesterday = communityWorld(1, ago(DAY));
    const h = harness([...LAUNCH_CATALOG, yesterday]);
    const newest = idsOf(await discover(h), 'new');

    expect(newest[0]).toBe(yesterday.storyId);
    // Then the catalogue by date, starting with its latest release.
    const dates = newest.map(
      (id) => [...LAUNCH_CATALOG, yesterday].find((s) => s.storyId === id)!.publishedAt!,
    );
    expect(dates[1]).toBe(CATALOG_NEWEST);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('never fronts a world it cannot date', async () => {
    // Hush House, Uncounted and Window Seven have no publishedAt. The old
    // summary code stamped them with the current time, which would have put
    // three September worlds at the front of "New" for ever.
    const undated = LAUNCH_CATALOG.filter((s) => s.publishedAt === null).map((s) => s.storyId);
    const newest = idsOf(await discover(harness()), 'new');
    for (const id of undated) expect(newest).not.toContain(id);
  });

  it('holds at most twelve, every one with a cover', async () => {
    const coverless = { ...communityWorld(2, ago(HOUR)), coverImage: null };
    const recent = Array.from({ length: 14 }, (_, i) => communityWorld(10 + i, ago((i + 2) * HOUR)));
    const h = harness([...LAUNCH_CATALOG, coverless, ...recent]);
    const row = rail(await discover(h), 'new')!;

    expect(row.stories).toHaveLength(12);
    expect(row.stories.every((s) => s.coverImage !== null)).toBe(true);
    expect(row.stories.map((s) => s.storyId)).not.toContain(coverless.storyId);
    // Rename nothing the app keys on.
    expect(row).toMatchObject({ kind: 'NEW', titleKey: 'rail.new' });
  });

  it('is the same all day, and leads with what was published overnight', async () => {
    const h = harness([...LAUNCH_CATALOG, communityWorld(1, ago(2 * DAY))]);
    const morning = idsOf(await discover(h), 'new');
    h.setNow(new Date(TODAY.getTime() + 8 * HOUR));
    expect(idsOf(await discover(h), 'new')).toEqual(morning);

    const overnight = communityWorld(2, new Date(TOMORROW.getTime() - 10 * HOUR));
    await publish(h.repo, overnight, new Date(TOMORROW.getTime() - 10 * HOUR));
    h.setNow(TOMORROW);
    const tomorrow = idsOf(await discover(h), 'new');
    expect(tomorrow[0]).toBe(overnight.storyId);
    expect(tomorrow).not.toEqual(morning);
  });
});
