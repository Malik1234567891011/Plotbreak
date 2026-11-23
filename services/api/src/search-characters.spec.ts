import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { SearchResponse, localizeStory, type StoryVersion } from '@plotbreak/contracts';
import { createDefaultPipeline, RuleBasedModerator } from '@plotbreak/director';
import { JobQueue } from '@plotbreak/worker';
import { NoopSink } from '@plotbreak/analytics';
import { HUSH_HOUSE, LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { searchCharacters } from './search-characters.js';
import { buildServer } from './server.js';
import { loadConfig, type AppContext } from './context.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import { DevTokenVerifier } from './auth.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';

/**
 * Search's Characters tab. The people in a world are often why somebody
 * wants it, and "the girl in 314" is a search a player actually makes.
 */

const names = (query: string, stories: readonly StoryVersion[] = LAUNCH_CATALOG) =>
  searchCharacters(stories, query).map((c) => c.name);

describe('searchCharacters', () => {
  it('finds Ayame Kurose, in Hush House', () => {
    const [first] = searchCharacters(LAUNCH_CATALOG, 'ayame');
    expect(first?.name).toBe('Ayame Kurose');
    expect(first?.storyId).toBe('story_hush_house');
    expect(first?.storyTitle).toBe('Hush House');
    expect(first?.characterId).toBe('ayame');
  });

  it('matches while the name is still being typed', () => {
    expect(names('ayam')[0]).toBe('Ayame Kurose');
  });

  it('ignores case and accents', () => {
    expect(names('AYÂME')[0]).toBe('Ayame Kurose');
  });

  it('ranks the start of the name over a later word in it', () => {
    // Both Kurose sisters have the word; neither name starts with it, so the
    // order is authored. "mika" starts one name and only that one leads.
    expect(names('kurose', [HUSH_HOUSE])).toEqual(['Ayame Kurose', 'Mika Kurose']);
    expect(names('mika', [HUSH_HOUSE])[0]).toBe('Mika Kurose');
  });

  it('ranks a whole word over the start of a longer one', () => {
    // "Mikael Sorrel" starts with the letters too; "Mika Kurose" is the word.
    expect(names('mika')[0]).toBe('Mika Kurose');
  });

  it('ranks a name over a role', () => {
    // "Room 314" is Ayame's role; a character literally named Room would lead.
    const story: StoryVersion = {
      ...HUSH_HOUSE,
      characters: [
        { ...HUSH_HOUSE.characters[0]!, id: 'a', name: 'Tess', role: 'Room 314' },
        { ...HUSH_HOUSE.characters[0]!, id: 'b', name: 'Roomie Vale', role: 'Landlady' },
      ],
    };
    expect(names('room', [story])).toEqual(['Roomie Vale', 'Tess']);
  });

  it('finds somebody by what they are to you', () => {
    expect(names('paramedic')).toContain('Tomas Reed');
  });

  it('needs every word to land, and falls back to the best partial match', () => {
    expect(names('ayame kurose')[0]).toBe('Ayame Kurose');
    expect(names('ayame zzzznotathing')[0]).toBe('Ayame Kurose');
    expect(names('zzzznotathing')).toEqual([]);
  });

  it('caps the list', () => {
    expect(searchCharacters(LAUNCH_CATALOG, 'the', 30).length).toBeLessThanOrEqual(30);
    expect(searchCharacters(LAUNCH_CATALOG, 'captain', 2)).toHaveLength(2);
  });

  it('browses two faces from each of the first ten worlds on an empty query', () => {
    const browse = searchCharacters(LAUNCH_CATALOG, '');
    const firstTen = LAUNCH_CATALOG.slice(0, 10);
    expect(browse).toHaveLength(firstTen.reduce((n, s) => n + Math.min(2, s.characters.length), 0));
    expect(browse.slice(0, 2).map((c) => c.characterId)).toEqual(
      firstTen[0]!.characters.slice(0, 2).map((c) => c.id),
    );
    expect(new Set(browse.map((c) => c.storyId)).size).toBe(10);
  });

  it('sends only the public fields the story page already does', () => {
    const [hit] = searchCharacters(LAUNCH_CATALOG, 'ayame');
    expect(Object.keys(hit!).sort()).toEqual(
      ['cardBlurb', 'characterId', 'coverImage', 'name', 'portrait', 'role', 'storyId', 'storyTitle'].sort(),
    );
  });

  it('searches French names in French', () => {
    const french = LAUNCH_CATALOG.map((story) => localizeStory(story, 'fr'));
    expect(names('gardienne', french)).toContain('Gardienne Ysolde Farrow');
    expect(names('gardienne')).not.toContain('Gardienne Ysolde Farrow');
  });
});

// --- The route -------------------------------------------------------------

const CREATOR = 'creator_blocked_one';
const COMMUNITY: StoryVersion = {
  ...HUSH_HOUSE,
  id: 'sv_community_zorblax',
  storyId: 'story_community_zorblax',
  title: 'The Zorblax Flat',
  official: false,
  creatorId: CREATOR,
  creatorName: 'Someone',
  sourceLocale: 'en',
  characters: [{ ...HUSH_HOUSE.characters[0]!, id: 'zorblax', name: 'Zorblax Quill' }],
};

type Server = FastifyInstance & { ctx: AppContext };
let app: Server | null = null;

function server(): Server {
  const repo = new MemoryRepository([...LAUNCH_CATALOG, COMMUNITY]);
  const config = loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv);
  const ctx: AppContext = {
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
  app = buildServer({ ctx }) as Server;
  return app;
}

afterEach(async () => {
  await app?.close();
  app = null;
});

describe('GET /v1/search characters', () => {
  it('returns characters beside the stories, in the shared contract', async () => {
    const response = await server().inject({ method: 'GET', url: '/v1/search?q=ayame' });
    expect(response.statusCode).toBe(200);
    const body = SearchResponse.parse(response.json());
    expect(body.characters[0]?.name).toBe('Ayame Kurose');
    expect(body.characters[0]?.storyTitle).toBe('Hush House');
    expect(body.results.some((s) => s.storyId === 'story_hush_house')).toBe(true);
  });

  it('browses faces on an empty query', async () => {
    const body = SearchResponse.parse((await server().inject({ method: 'GET', url: '/v1/search' })).json());
    expect(body.characters.length).toBeGreaterThan(0);
    expect(body.characters.length).toBeLessThanOrEqual(20);
  });

  it('leaves out the cast of a creator the player blocked', async () => {
    const token = 'guest_blocker';
    const s = server();
    const before = SearchResponse.parse(
      (await s.inject({ method: 'GET', url: '/v1/search?q=zorblax', headers: { authorization: `Bearer ${token}` } })).json(),
    );
    expect(before.characters.map((c) => c.name)).toContain('Zorblax Quill');

    const blocked = await s.inject({
      method: 'POST',
      url: '/v1/blocks',
      headers: { authorization: `Bearer ${token}` },
      payload: { targetId: CREATOR },
    });
    expect(blocked.statusCode).toBe(200);
    const after = SearchResponse.parse(
      (await s.inject({ method: 'GET', url: '/v1/search?q=zorblax', headers: { authorization: `Bearer ${token}` } })).json(),
    );
    expect(after.characters.map((c) => c.name)).not.toContain('Zorblax Quill');
    expect(after.results.map((r) => r.storyId)).not.toContain(COMMUNITY.storyId);
  });

  it('searches the French names for a French player', async () => {
    const body = SearchResponse.parse(
      (await server().inject({ method: 'GET', url: '/v1/search?q=gardienne', headers: { 'accept-language': 'fr' } })).json(),
    );
    expect(body.characters.map((c) => c.name)).toContain('Gardienne Ysolde Farrow');
  });
});
