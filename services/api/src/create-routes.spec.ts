import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { createDefaultPipeline, RuleBasedModerator } from '@plotbreak/director';
import { JobQueue } from '@plotbreak/worker';
import { NoopSink } from '@plotbreak/analytics';
import { buildServer } from './server.js';
import { loadConfig } from './context.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import { DevTokenVerifier, devUserId } from './auth.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';
import type { AppContext } from './context.js';
import type { ModelGateway, ModelInvocation } from '@plotbreak/director';

type Server = FastifyInstance & { ctx: AppContext };

const TOKEN = 'guest_creator';
const USER = devUserId(TOKEN);
const auth = { authorization: `Bearer ${TOKEN}` };
const OTHER = { authorization: 'Bearer guest_somebody_else' };

const INVOCATION: ModelInvocation = {
  requestId: 'r',
  role: 'writer_premium',
  provider: 'fake',
  model: 'fake',
  inputTokens: 0,
  outputTokens: 0,
  costUsd: 0,
  latencyMs: 0,
  ok: true,
  errorCode: null,
};

const SPINE = {
  refusal: null,
  title: 'The Longest Winter',
  fantasyLabel: 'Keep the lamp lit, or keep your sister',
  hook: 'Two keepers, one lamp, and a winter that will not end.',
  premise: Array.from({ length: 140 }, (_, i) => `w${i}`).join(' '),
  toneGuide: 'Quiet, cold, close.',
  hardCanon: ['The lamp has not gone out in ninety years.'],
  intensity: 'MODERATE',
  contentDescriptors: ['PSYCHOLOGICAL_THEMES'],
  protagonistKind: 'blank',
  protagonistName: '',
  protagonistPronouns: '',
  protagonistDescription: '',
  setupHeading: 'Which keeper are you?',
  places: [
    { name: 'The lamp room', description: 'Glass on every side.' },
    { name: 'The kitchen', description: 'One chair short.' },
  ],
  startingPlaceName: 'The lamp room',
  opening: Array.from({ length: 80 }, (_, i) => `b${i}`).join(' '),
  openingSuggestions: ['Check the log.'],
  playGuide: '',
  coverDirection: 'A lamp room at night.',
  description: 'A two-hander about duty at the edge of the map.',
  tags: ['drama'],
  mechanicsChips: ['Keep the lamp'],
};

const CAST = {
  refusal: null,
  characters: [
    {
      name: 'Mira',
      calledName: '',
      pronouns: 'she/her',
      role: 'Your older sister',
      cardBlurb: 'Keeps the log and her mouth shut.',
      appearance: '',
      speechStyle: '',
      socialStyle: '',
      publicTraits: [],
      values: [],
      goals: [],
      fears: [],
      boundaries: [],
      hiddenDrives: ['Wants to leave and cannot say so'],
      secrets: ['Eleven minutes are missing from the log.'],
      voiceSamples: [],
    },
    {
      name: 'Ansel',
      calledName: '',
      pronouns: 'he/him',
      role: 'The inspector',
      cardBlurb: 'Arrives with a clipboard.',
      appearance: '',
      speechStyle: '',
      socialStyle: '',
      publicTraits: [],
      values: [],
      goals: [],
      fears: [],
      boundaries: [],
      hiddenDrives: [],
      secrets: [],
      voiceSamples: [],
    },
  ],
  origins: [],
  factions: [],
  threads: [],
  worldEvents: [],
  objects: [],
  endings: [
    {
      name: 'The Lamp Stays Lit',
      rarity: 'COMMON',
      minTurn: 20,
      condition: 'The player chose the lighthouse.',
      epilogue: 'The winter ends.',
      hint: '',
    },
  ],
  styleExamples: [],
};

/** Answers in order, parsing each answer through whatever schema was asked for. */
function scriptedGateway(answers: readonly unknown[]): ModelGateway {
  let turn = 0;
  return {
    name: 'scripted',
    async generateStructured(_role: unknown, schema: { parse: (v: unknown) => unknown }) {
      const answer = answers[turn++];
      if (answer instanceof Error) throw answer;
      return { value: schema.parse(answer), invocation: INVOCATION };
    },
    streamText: () => {
      throw new Error('unused');
    },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
}

function makeContext(gateway: ModelGateway | null): AppContext {
  const repo = new MemoryRepository();
  const config = loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv);
  return {
    config,
    repo,
    wallet: new WalletService(repo),
    pipeline: createDefaultPipeline(),
    modelProvider: null,
    modelGateway: gateway,
    analytics: new NoopSink(),
    jobs: new JobQueue(),
    auth: new DevTokenVerifier(),
    moderator: new RuleBasedModerator(),
    rateLimiter: { check: () => ({ allowed: true, retryAfterSeconds: 0, limit: 1e6, remaining: 1e6 }) },
    storeVerifier: createStoreVerifierFromEnv(config, {} as NodeJS.ProcessEnv),
  } as unknown as AppContext;
}

let app: Server;

function start(gateway: ModelGateway | null = scriptedGateway([SPINE, CAST])): void {
  app = buildServer({ ctx: makeContext(gateway) }) as Server;
}

afterEach(async () => {
  await app?.close();
});

async function newDraft(): Promise<string> {
  const response = await app.inject({ method: 'POST', url: '/v1/create/drafts', headers: auth });
  return response.json().draft.draftId;
}

async function compiled(): Promise<string> {
  const draftId = await newDraft();
  const response = await app.inject({
    method: 'POST',
    url: `/v1/create/drafts/${draftId}/compile`,
    headers: auth,
    payload: { pitch: 'Two sisters keep a lighthouse through a winter that will not end.' },
  });
  expect(response.statusCode).toBe(200);
  return draftId;
}

describe('create mode', () => {
  beforeEach(() => start());

  it('needs a signed-in person', async () => {
    const response = await app.inject({ method: 'GET', url: '/v1/create/titles' });
    expect(response.statusCode).toBe(401);
  });

  it('starts an empty draft and lists it', async () => {
    const draftId = await newDraft();
    const titles = await app.inject({ method: 'GET', url: '/v1/create/titles', headers: auth });
    expect(titles.json().titles).toEqual([
      expect.objectContaining({ draftId, status: 'DRAFT', ready: false, runs: 0, likes: 0 }),
    ]);
  });

  it('answers 404 rather than 403 for somebody else\'s draft', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'GET',
      url: `/v1/create/drafts/${draftId}`,
      headers: OTHER,
    });
    expect(response.statusCode).toBe(404);
  });

  it('patches one field and leaves the rest', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'PATCH',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
      payload: { title: 'A Working Title' },
    });
    expect(response.json().draft).toMatchObject({ title: 'A Working Title', premise: '' });
  });

  it('refuses a patch that tries to reassign ownership', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'PATCH',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
      payload: { ownerId: 'somebody-else' },
    });
    expect(response.statusCode).toBe(400);
  });

  it('compiles a pitch into a draft that is ready', async () => {
    const draftId = await compiled();
    const response = await app.inject({
      method: 'GET',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    const body = response.json();
    expect(body.draft.title).toBe('The Longest Winter');
    expect(body.draft.characters).toHaveLength(2);
    expect(body.readiness.ready).toBe(true);
  });

  it('will not compile a pitch that says almost nothing', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/compile`,
      headers: auth,
      payload: { pitch: 'a story' },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().code).toBe('PITCH_TOO_SHORT');
  });

  it('passes a refusal through as a refusal, not an error', async () => {
    start(scriptedGateway([{ ...SPINE, refusal: 'I will not build that.' }]));
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/compile`,
      headers: auth,
      payload: { pitch: 'Something this product does not make.' },
    });
    expect(response.statusCode).toBe(422);
    expect(response.json()).toMatchObject({ code: 'PITCH_REFUSED', message: 'I will not build that.' });
  });

  it('rewrites a single field with auto-generate', async () => {
    const draftId = await compiled();
    // The compile above exhausted the scripted gateway; swap in one that
    // answers the assist.
    (app.ctx as { modelGateway: ModelGateway }).modelGateway = scriptedGateway([
      { value: 'A better hook.' },
    ]);
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/assist`,
      headers: auth,
      payload: { target: 'hook' },
    });
    expect(response.json().draft).toMatchObject({
      hook: 'A better hook.',
      title: 'The Longest Winter',
    });
  });

  it('rejects an assist target that is not a field', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/assist`,
      headers: auth,
      payload: { target: 'everything' },
    });
    expect(response.statusCode).toBe(400);
  });

  it('refuses to publish a story that is not finished, and says which steps', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(response.statusCode).toBe(422);
    expect(response.json().details.blockedSteps).toContain('cast');
  });

  it('publishes, and the world becomes playable', async () => {
    const draftId = await compiled();
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(published.statusCode).toBe(200);
    const { storyId } = published.json();

    const detail = await app.inject({ method: 'GET', url: `/v1/stories/${storyId}`, headers: auth });
    expect(detail.statusCode).toBe(200);
    expect(detail.json().story.title).toBe('The Longest Winter');
  });

  it('keeps a private world out of Discover and a public one in it', async () => {
    const draftId = await compiled();
    await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PRIVATE' },
    });
    const inDiscover = async () => {
      const response = await app.inject({ method: 'GET', url: '/v1/discover', headers: auth });
      return JSON.stringify(response.json()).includes('The Longest Winter');
    };
    expect(await inDiscover()).toBe(false);

    await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/visibility`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(await inDiscover()).toBe(true);
  });

  it('republishes as a new version rather than a second story', async () => {
    const draftId = await compiled();
    const first = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    await app.inject({
      method: 'PATCH',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
      payload: { title: 'The Longest Winter, Again' },
    });
    const second = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(second.json().storyId).toBe(first.json().storyId);
    expect(second.json().storyVersionId).not.toBe(first.json().storyVersionId);
  });

  it('will not delete the draft of a published world', async () => {
    const draftId = await compiled();
    await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PRIVATE' },
    });
    const response = await app.inject({
      method: 'DELETE',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    expect(response.statusCode).toBe(409);
  });

  it('deletes an unpublished draft', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'DELETE',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    expect(response.statusCode).toBe(200);
    const titles = await app.inject({ method: 'GET', url: '/v1/create/titles', headers: auth });
    expect(titles.json().titles).toHaveLength(0);
  });

  it('says so rather than throwing when no model is configured', async () => {
    start(null);
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/compile`,
      headers: auth,
      payload: { pitch: 'Two sisters keep a lighthouse through a winter that will not end.' },
    });
    expect(response.statusCode).toBe(503);
  });

  it('publishes the vocabulary the builder renders', async () => {
    const response = await app.inject({ method: 'GET', url: '/v1/create/options' });
    expect(response.json()).toMatchObject({
      tones: expect.arrayContaining(['grim']),
      steps: expect.arrayContaining(['cast', 'endings']),
      assistTargets: expect.arrayContaining(['premise']),
    });
  });
});
