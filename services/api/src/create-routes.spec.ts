import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import type { FastifyInstance } from 'fastify';
import { createDefaultPipeline, RuleBasedModerator } from '@plotbreak/director';
import { JobQueue } from '@plotbreak/worker';
import { NoopSink } from '@plotbreak/analytics';
import { buildServer } from './server.js';
import { MAX_TRANSLATION_ATTEMPTS, sweepPendingTranslations } from './translate-story.js';
import { loadConfig } from './context.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import { DevTokenVerifier, devUserId } from './auth.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';
import type { AppContext } from './context.js';
import { MediaGatewayError } from '@plotbreak/director';
import type { MediaGateway, ModelGateway, ModelInvocation } from '@plotbreak/director';

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

/**
 * Answers in order, parsing each answer through whatever schema was asked for.
 *
 * Translation requests are answered separately rather than from the script: a
 * publish now kicks one off, and a world's worth of batches would eat every
 * scripted answer that the compile and the cast were queued behind. A request
 * whose payload is `{ fields: [...] }` is a translation, and gets echoed.
 */
function scriptedGateway(answers: readonly unknown[]): ModelGateway {
  let turn = 0;
  return {
    name: 'scripted',
    async generateStructured(
      _role: unknown,
      schema: { parse: (v: unknown) => unknown },
      messages?: readonly { content: string }[],
    ) {
      const last = messages?.[messages.length - 1]?.content ?? '';
      if (last.includes('"fields"')) {
        const payload = JSON.parse(last) as { fields: { path: string; text: string | string[] }[] };
        return {
          value: {
            fields: payload.fields.map((field) => ({
              path: field.path,
              text: Array.isArray(field.text)
                ? field.text.map((entry) => `[tr] ${entry}`)
                : `[tr] ${field.text}`,
            })),
          },
          invocation: INVOCATION,
        };
      }
      const answer = answers[turn++];
      if (answer instanceof Error) throw answer;
      return { value: schema.parse(answer), invocation: INVOCATION };
    },
    streamText: () => {
      throw new Error('unused');
    },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
    moderateImage: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
}

/**
 * A gateway that draws instantly.
 *
 * `bytes` has to be a real image: `create-art.ts` puts it through sharp on the
 * way to WebP, and a buffer of zeroes fails there rather than in the code under
 * test. `calls` is what lets a test say how many images were paid for.
 */
function fakeMedia(
  options: {
    failKind?: 'COVER' | 'KEY_ART';
    reject?: boolean;
    /** What the reader claims to see, overriding "whatever was asked for". */
    reads?: string;
    /** Refuse to re-letter, so the fallback is exercised. */
    noEdit?: boolean;
  } = {},
) {
  const calls: string[] = [];
  const edits: string[] = [];
  /** The lettering the last prompt asked for, so the reader can agree with it. */
  let asked = '';

  const shade = async (tone: number): Promise<Buffer> =>
    sharp({ create: { width: 32, height: 32, channels: 3, background: { r: tone, g: 20, b: 30 } } })
      .png()
      .toBuffer();

  const asset = (spec: { assetKey: string; alt: string; seed: string }, bytes: Buffer) => ({
    assetKey: spec.assetKey,
    bytes,
    contentType: 'image/png',
    width: 32,
    height: 32,
    alt: spec.alt,
    provenance: {
      provider: 'fake',
      model: 'fake',
      requestId: 'r',
      promptHash: 'h',
      seed: spec.seed,
      costUsd: 0,
      latencyMs: 0,
      createdAt: new Date().toISOString(),
    },
  });

  const gateway = {
    name: 'fake-media',
    async generateImage(spec: { kind: string; assetKey: string; alt: string; seed: string; prompt: string }) {
      calls.push(spec.kind);
      if (options.failKind === spec.kind) {
        throw new MediaGatewayError('provider fell over', 'PROVIDER_ERROR', true);
      }
      asked = spec.prompt?.match(/spelled exactly "([^"]+)"/)?.[1] ?? '';
      return asset(spec, await shade(10));
    },
    async editImage(spec: { assetKey: string; alt: string; seed: string; prompt: string }) {
      if (options.noEdit) throw new MediaGatewayError('no edits here', 'PROVIDER_ERROR', true);
      edits.push(spec.assetKey);
      asked = spec.prompt?.match(/with "([^"]+)"/)?.[1] ?? '';
      // A different shade, so a test can tell a re-lettered cover from the
      // original by its bytes.
      return asset(spec, await shade(200));
    },
    async readText() {
      return options.reads ?? asked;
    },
    async moderateMedia() {
      return options.reject ? { approved: false, reason: 'no' } : { approved: true, reason: null };
    },
  };
  return { gateway: gateway as unknown as MediaGateway, calls, edits };
}

function makeContext(gateway: ModelGateway | null, mediaGateway: MediaGateway | null = null): AppContext {
  const repo = new MemoryRepository();
  const config = loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv);
  return {
    config,
    repo,
    wallet: new WalletService(repo),
    pipeline: createDefaultPipeline(),
    modelProvider: null,
    modelGateway: gateway,
    mediaGateway,
    analytics: new NoopSink(),
    jobs: new JobQueue(),
    auth: new DevTokenVerifier(),
    moderator: new RuleBasedModerator(),
    rateLimiter: { check: () => ({ allowed: true, retryAfterSeconds: 0, limit: 1e6, remaining: 1e6 }) },
    storeVerifier: createStoreVerifierFromEnv(config, {} as NodeJS.ProcessEnv),
  } as unknown as AppContext;
}

let app: Server;

function start(
  gateway: ModelGateway | null = scriptedGateway([SPINE, CAST]),
  mediaGateway: MediaGateway | null = null,
): void {
  app = buildServer({ ctx: makeContext(gateway, mediaGateway) }) as Server;
}

afterEach(async () => {
  await app?.close();
});

async function newDraft(): Promise<string> {
  const response = await app.inject({ method: 'POST', url: '/v1/create/drafts', headers: auth });
  return response.json().draft.draftId;
}

/**
 * Wait for the detached compile to land.
 *
 * Compiling answers 202 and finishes in its own time, so a test that wants the
 * finished world has to wait for it the same way the client does. The scripted
 * gateway resolves immediately, so this is a handful of ticks rather than a
 * sleep.
 */
async function settled(draftId: string): Promise<any> {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const response = await app.inject({ method: 'GET', url: `/v1/create/drafts/${draftId}`, headers: auth });
    const body = response.json();
    if (body.draft.compile.status !== 'running') return body;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  throw new Error('compile never settled');
}

/**
 * A real JPEG. The upload route reads magic bytes rather than a content type
 * and re-encodes through sharp, so a string pretending to be a picture is not
 * enough to exercise it.
 */
async function jpeg(): Promise<string> {
  // Noise rather than a flat colour, and big enough to clear the route's 1 KB
  // floor: a solid 64x96 rectangle compresses to about six hundred bytes and
  // is rejected as "not a picture", which is the check doing its job.
  const pixels = Buffer.alloc(512 * 768 * 3);
  for (let i = 0; i < pixels.length; i += 1) pixels[i] = (i * 2654435761) % 251;
  const bytes = await sharp(pixels, { raw: { width: 512, height: 768, channels: 3 } })
    .jpeg()
    .toBuffer();
  return bytes.toString('base64');
}

/** Give a draft the cover a public world is required to have. */
async function withCover(draftId: string): Promise<void> {
  const response = await app.inject({
    method: 'POST',
    url: `/v1/create/drafts/${draftId}/image`,
    headers: auth,
    payload: { kind: 'cover', data: await jpeg() },
  });
  expect(response.statusCode).toBe(200);
  expect(response.json().draft.coverImage).toMatch(/^uploads\//);
}

async function compiled(): Promise<string> {
  const draftId = await newDraft();
  const response = await app.inject({
    method: 'POST',
    url: `/v1/create/drafts/${draftId}/compile`,
    headers: auth,
    payload: { pitch: 'Two sisters keep a lighthouse through a winter that will not end.' },
  });
  // Accepted, not finished.
  expect(response.statusCode).toBe(202);
  expect(response.json().draft.compile.status).toBe('running');
  const done = await settled(draftId);
  expect(done.draft.compile.status).toBe('done');
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

  it('records a refusal on the draft, as a refusal rather than a failure', async () => {
    start(scriptedGateway([{ ...SPINE, refusal: 'I will not build that.' }]));
    const draftId = await newDraft();
    const accepted = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/compile`,
      headers: auth,
      payload: { pitch: 'Something this product does not make.' },
    });
    expect(accepted.statusCode).toBe(202);
    const done = await settled(draftId);
    expect(done.draft.compile).toMatchObject({
      status: 'refused',
      message: 'I will not build that.',
    });
  });

  it('refuses a second compile while one is already running', async () => {
    // Two taps would charge twice and race each other's writes.
    const draftId = await newDraft();
    const payload = { pitch: 'Two sisters keep a lighthouse through a winter that will not end.' };
    const first = await app.inject({
      method: 'POST', url: `/v1/create/drafts/${draftId}/compile`, headers: auth, payload,
    });
    expect(first.statusCode).toBe(202);
    const second = await app.inject({
      method: 'POST', url: `/v1/create/drafts/${draftId}/compile`, headers: auth, payload,
    });
    expect([409, 202]).toContain(second.statusCode);
    await settled(draftId);
  });

  it('marks the draft failed and keeps it editable when the model throws', async () => {
    start(scriptedGateway([new Error('provider exploded')]));
    const draftId = await newDraft();
    const accepted = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/compile`,
      headers: auth,
      payload: { pitch: 'Two sisters keep a lighthouse through a winter that will not end.' },
    });
    expect(accepted.statusCode).toBe(202);
    const done = await settled(draftId);
    expect(done.draft.compile.status).toBe('failed');
    // Still theirs, still editable — a failed compile must not strand a draft.
    const patched = await app.inject({
      method: 'PATCH', url: `/v1/create/drafts/${draftId}`, headers: auth, payload: { title: 'By hand' },
    });
    expect(patched.json().draft.title).toBe('By hand');
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
    await withCover(draftId);
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
    await withCover(draftId);
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
    await withCover(draftId);
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


  // -------------------------------------------------------------------------
  // Every public world has a cover
  // -------------------------------------------------------------------------

  it('refuses to publish a finished world to Everyone with no cover', async () => {
    const draftId = await compiled();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(response.statusCode).toBe(422);
    const codes = response.json().details.issues.map((i: { code: string }) => i.code);
    // The *only* thing wrong with it, so the client can say something useful
    // rather than "this story is not finished".
    expect(codes).toEqual(['cover_missing']);
    expect(response.json().details.blockedSteps).toEqual(['publish']);
  });

  // Two tests rather than a loop: `compiled()` spends the scripted gateway's
  // two answers, and a second compile in the same test gets nothing back.
  it('lets a coverless world be published privately', async () => {
    const draftId = await compiled();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PRIVATE' },
    });
    expect(response.statusCode).toBe(200);
  });

  it('lets a coverless world be published as a link', async () => {
    const draftId = await compiled();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'UNLISTED' },
    });
    expect(response.statusCode).toBe(200);
  });

  it('judges the visibility being published at, not the one saved on the draft', async () => {
    const draftId = await compiled();
    // Saved as PRIVATE, which needs no cover...
    await app.inject({
      method: 'PATCH',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
      payload: { visibility: 'PRIVATE' },
    });
    const saysReady = await app.inject({
      method: 'GET',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    expect(saysReady.json().readiness.ready).toBe(true);

    // ...and published straight to Everyone, which does.
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(response.statusCode).toBe(422);
    expect(response.json().details.issues[0].code).toBe('cover_missing');
  });

  it('refuses to move a coverless published world into Discover', async () => {
    const draftId = await compiled();
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'UNLISTED' },
    });
    expect(published.statusCode).toBe(200);

    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/visibility`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(response.statusCode).toBe(422);
    expect(response.json().details.issues[0].code).toBe('cover_missing');

    // And it really did not move.
    const discover = await app.inject({ method: 'GET', url: '/v1/discover', headers: auth });
    expect(JSON.stringify(discover.json())).not.toContain('The Longest Winter');
  });

  it('drops the drawn banner when the creator chooses their own cover', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const afterDraw = await drawn(draftId);
    expect(afterDraw.draft.keyArtImage).toMatch(/^generated\//);

    await withCover(draftId);
    const response = await app.inject({
      method: 'GET',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    // Otherwise the story page banner keeps showing the art they just replaced.
    expect(response.json().draft.coverImage).toMatch(/^uploads\//);
    expect(response.json().draft.keyArtImage).toBeNull();
  });

  it('drops the banner when the cover is removed', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    await drawn(draftId);

    const response = await app.inject({
      method: 'DELETE',
      url: `/v1/create/drafts/${draftId}/image?kind=cover`,
      headers: auth,
    });
    expect(response.json().draft.coverImage).toBeNull();
    expect(response.json().draft.keyArtImage).toBeNull();
  });

  it('still lets a coverless world be taken back out of Discover', async () => {
    const draftId = await compiled();
    await withCover(draftId);
    await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    // Removing the cover must never trap a story in Discover: going *less*
    // public is not a thing the gate has any business blocking.
    await app.inject({
      method: 'DELETE',
      url: `/v1/create/drafts/${draftId}/image?kind=cover`,
      headers: auth,
    });
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/visibility`,
      headers: auth,
      payload: { visibility: 'PRIVATE' },
    });
    expect(response.statusCode).toBe(200);
  });


  // -------------------------------------------------------------------------
  // ...and one gets drawn for a creator who does not want to make one
  // -------------------------------------------------------------------------

  /** Wait for the detached draw, the same way the client watches `draft.art`. */
  async function drawn(draftId: string): Promise<any> {
    for (let attempt = 0; attempt < 200; attempt += 1) {
      const response = await app.inject({
        method: 'GET',
        url: `/v1/create/drafts/${draftId}`,
        headers: auth,
      });
      const body = response.json();
      if (body.draft.art.status !== 'running') return body;
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    throw new Error('draw never settled');
  }

  it('draws a cover and a banner, and that is enough to publish', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();

    const accepted = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/art`,
      headers: auth,
    });
    expect(accepted.statusCode).toBe(202);
    expect(accepted.json().draft.art.status).toBe('running');

    const settledDraft = await drawn(draftId);
    expect(settledDraft.draft.art.status).toBe('done');
    expect(settledDraft.draft.coverImage).toMatch(/^generated\/.+\/cover_/);
    expect(settledDraft.draft.keyArtImage).toMatch(/^generated\/.+\/key_/);
    expect(settledDraft.readiness.ready).toBe(true);
    expect(media.calls).toEqual(['COVER', 'KEY_ART']);

    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(published.statusCode).toBe(200);
  });

  it('draws the title into the cover, in the language the world is written in', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const settledDraft = await drawn(draftId);
    const key = settledDraft.draft.coverImage as string;
    const root = process.env.ASSET_ROOT!;

    expect(existsSync(join(root, `${key}.webp`))).toBe(true);
    // Only one. The other language needs a translated title, which does not
    // exist until the world is published and translated — drawing it now would
    // put the English words on the French shelf.
    expect(existsSync(join(root, `${key}.fr.webp`))).toBe(false);
    expect(media.edits).toEqual([]);
  });

  it('will not ship a cover whose title came back misspelt without trying again', async () => {
    // A reader that sees something else entirely, whatever was asked for.
    const media = fakeMedia({ reads: 'THE LONGEST WINTUR' });
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const settledDraft = await drawn(draftId);

    // Two goes at the lettering, then it ships what it has rather than looping.
    expect(media.calls.filter((c) => c === 'COVER')).toHaveLength(2);
    expect(settledDraft.draft.coverImage).toMatch(/^generated\//);
  });

  it('puts the drawn banner on the published world, not null', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const settledDraft = await drawn(draftId);

    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    const { storyId } = published.json();
    const detail = await app.inject({ method: 'GET', url: `/v1/stories/${storyId}`, headers: auth });
    // `draftToStoryVersion` used to hardcode `keyArt: null`, so the story page
    // banner fell back to the cover for every player-made world there has ever
    // been.
    expect(detail.json().story.keyArt).toContain('key_');
    expect(detail.json().story.coverImage).toContain(settledDraft.draft.coverImage);
  });

  it('keeps the cover when only the banner fails', async () => {
    const media = fakeMedia({ failKind: 'KEY_ART' });
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const settledDraft = await drawn(draftId);

    // A cosmetic loss must not become a blocking one.
    expect(settledDraft.draft.art.status).toBe('done');
    expect(settledDraft.draft.coverImage).toMatch(/^generated\//);
    expect(settledDraft.draft.keyArtImage).toBeNull();
    expect(settledDraft.readiness.ready).toBe(true);
  });

  it('reports a failed draw and changes no cover', async () => {
    const media = fakeMedia({ failKind: 'COVER' });
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const settledDraft = await drawn(draftId);

    expect(settledDraft.draft.art.status).toBe('failed');
    expect(settledDraft.draft.art.message).not.toBe('');
    expect(settledDraft.draft.coverImage).toBeNull();

    // Readiness on the draft is judged at its own visibility, which is PRIVATE
    // and needs no cover — so `ready` being true here says nothing. What has to
    // still be true is that Discover is shut.
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(published.statusCode).toBe(422);
    expect(published.json().details.issues[0].code).toBe('cover_missing');
  });

  it('will not draw a cover that failed moderation', async () => {
    const media = fakeMedia({ reject: true });
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const settledDraft = await drawn(draftId);
    expect(settledDraft.draft.art.status).toBe('failed');
    expect(settledDraft.draft.coverImage).toBeNull();
  });

  it('refuses a second draw while one is running', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const second = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/art`,
      headers: auth,
    });
    // Either the first is still running (409) or it finished between the two
    // injections (202). What must never happen is two draws billing four
    // images against one draft.
    expect([409, 202]).toContain(second.statusCode);
    await drawn(draftId);
  });

  it('does not bring back a draft deleted while its cover was drawing', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const deleted = await app.inject({
      method: 'DELETE',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    expect(deleted.statusCode).toBe(200);

    // Let the draw land on a draft that is no longer there.
    for (let i = 0; i < 40; i += 1) await new Promise((resolve) => setTimeout(resolve, 5));
    const response = await app.inject({
      method: 'GET',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    expect(response.statusCode).toBe(404);
  });

  it('will not draw for a world that is not written yet', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/art`,
      headers: auth,
    });
    expect(response.statusCode).toBe(422);
    expect(response.json().code).toBe('NOT_ENOUGH_WORLD');
    expect(media.calls).toEqual([]);
  });

  it('says so plainly when no image provider is configured', async () => {
    const draftId = await compiled();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/art`,
      headers: auth,
    });
    expect(response.statusCode).toBe(503);
    expect(response.json().code).toBe('NO_MEDIA');
  });

  it('will not draw for somebody else\'s draft', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/art`,
      headers: OTHER,
    });
    expect(response.statusCode).toBe(404);
    expect(media.calls).toEqual([]);
  });


  // -------------------------------------------------------------------------
  // A world reaches the other language's shelf in that language
  // -------------------------------------------------------------------------

  /**
   * Wait for the detached translation to have been attempted.
   *
   * On `attempts`, not on `status`: a failure that has retries left is written
   * back as `pending`, so waiting for the status to leave `pending` waits
   * forever for exactly the case these tests are about.
   */
  async function translated(storyVersionId: string, locale: 'en' | 'fr'): Promise<any> {
    for (let attempt = 0; attempt < 400; attempt += 1) {
      const rows = await app.ctx.repo.getStoryText(storyVersionId);
      const row = rows.find((r: any) => r.locale === locale);
      if (row && row.attempts > 0) return row;
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    throw new Error('translation never settled');
  }

  /**
   * Wait for a file to appear, or to stop being what it was.
   *
   * Tolerant of it not existing yet: the row is marked ready before the cover
   * that follows it has been written, so the first few reads are misses.
   */
  async function changed(path: string, before: Buffer): Promise<Buffer> {
    for (let attempt = 0; attempt < 400; attempt += 1) {
      if (existsSync(path)) {
        const now = readFileSync(path);
        if (!now.equals(before)) return now;
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    throw new Error(`${path} never appeared`);
  }

  it('records the language a world is being written in', async () => {
    const draftId = await newDraft();
    const response = await app.inject({
      method: 'GET',
      url: `/v1/create/drafts/${draftId}`,
      headers: auth,
    });
    // Without this the product has no idea what language a world is in, which
    // is how a French world ends up on the English shelf reading as French.
    expect(response.json().draft.locale).toBe('en');
  });

  it('carries that language onto the published world', async () => {
    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    const story = await app.ctx.repo.getStoryVersion(published.json().storyVersionId);
    expect(story?.sourceLocale).toBe('en');
  });

  it('translates a published world into the other language, and shows it there', async () => {
    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    const { storyId, storyVersionId } = published.json();

    const row = await translated(storyVersionId, 'fr');
    expect(row.status).toBe('ready');
    expect(Object.keys(row.text).length).toBeGreaterThan(5);

    // The point of the whole exercise: a French reader gets French.
    const french = await app.inject({
      method: 'GET',
      url: `/v1/stories/${storyId}`,
      headers: { ...auth, 'accept-language': 'fr' },
    });
    expect(french.json().story.title).toContain('[tr]');

    // …and an English reader is untouched.
    const english = await app.inject({
      method: 'GET',
      url: `/v1/stories/${storyId}`,
      headers: { ...auth, 'accept-language': 'en' },
    });
    expect(english.json().story.title).toBe('The Longest Winter');
  });

  it('never blocks a publish on the translation', async () => {
    // A gateway that compiles fine and refuses to translate anything.
    const refuses = scriptedGateway([SPINE, CAST]);
    const broken = {
      ...refuses,
      async generateStructured(role: unknown, schema: any, messages?: readonly { content: string }[]) {
        const last = messages?.[messages.length - 1]?.content ?? '';
        if (last.includes('"fields"')) throw new Error('no');
        return (refuses as any).generateStructured(role, schema, messages);
      },
    } as unknown as ModelGateway;
    start(broken);

    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    // The world is live and playable regardless.
    expect(published.statusCode).toBe(200);

    const row = await translated(published.json().storyVersionId, 'fr');
    expect(row.status).toBe('pending');
    expect(row.attempts).toBe(1);

    // And it reads in the language it was written in rather than not at all.
    const french = await app.inject({
      method: 'GET',
      url: `/v1/stories/${published.json().storyId}`,
      headers: { ...auth, 'accept-language': 'fr' },
    });
    expect(french.statusCode).toBe(200);
    expect(french.json().story.title).toBe('The Longest Winter');
  });

  it('picks up a translation that was never finished', async () => {
    let allow = false;
    const base = scriptedGateway([SPINE, CAST]);
    const flaky = {
      ...base,
      async generateStructured(role: unknown, schema: any, messages?: readonly { content: string }[]) {
        const last = messages?.[messages.length - 1]?.content ?? '';
        if (last.includes('"fields"') && !allow) throw new Error('not yet');
        return (base as any).generateStructured(role, schema, messages);
      },
    } as unknown as ModelGateway;
    start(flaky);

    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    const { storyVersionId } = published.json();
    expect((await translated(storyVersionId, 'fr')).status).toBe('pending');

    // The provider comes back, and the sweep finishes what the publish started.
    allow = true;
    const done = await sweepPendingTranslations(app.ctx);
    expect(done).toBe(1);
    const row = (await app.ctx.repo.getStoryText(storyVersionId)).find((r: any) => r.locale === 'fr');
    expect(row!.status).toBe('ready');
  });

  it('gives up rather than paying for the same failure forever', async () => {
    const base = scriptedGateway([SPINE, CAST]);
    const broken = {
      ...base,
      async generateStructured(role: unknown, schema: any, messages?: readonly { content: string }[]) {
        const last = messages?.[messages.length - 1]?.content ?? '';
        if (last.includes('"fields"')) throw new Error('never');
        return (base as any).generateStructured(role, schema, messages);
      },
    } as unknown as ModelGateway;
    start(broken);

    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    const { storyVersionId } = published.json();
    await translated(storyVersionId, 'fr');

    for (let i = 0; i < MAX_TRANSLATION_ATTEMPTS + 2; i += 1) await sweepPendingTranslations(app.ctx);
    const row = (await app.ctx.repo.getStoryText(storyVersionId)).find((r: any) => r.locale === 'fr');
    expect(row!.status).toBe('failed');
    expect(row!.attempts).toBe(MAX_TRANSLATION_ATTEMPTS);
  });

  it('re-letters the cover into the other language once its title exists', async () => {
    const media = fakeMedia();
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const withArt = await drawn(draftId);
    const key = withArt.draft.coverImage as string;
    const root = process.env.ASSET_ROOT!;
    const original = readFileSync(join(root, `${key}.webp`));

    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    await translated(published.json().storyVersionId, 'fr');

    // The same picture, handed back with the lettering swapped — which is how
    // the official covers get their French twin.
    const french = await changed(join(root, `${key}.fr.webp`), original);
    expect(french.equals(original)).toBe(false);
    expect(media.edits).toContain(`${key}.fr`);
    // One generation for the art, one edit for the words. Not two worlds.
    expect(media.calls.filter((c) => c === 'COVER')).toHaveLength(1);
  });

  it('falls back to the one cover when it cannot be re-lettered', async () => {
    const media = fakeMedia({ noEdit: true });
    start(scriptedGateway([SPINE, CAST]), media.gateway);
    const draftId = await compiled();
    await app.inject({ method: 'POST', url: `/v1/create/drafts/${draftId}/art`, headers: auth });
    const withArt = await drawn(draftId);
    const key = withArt.draft.coverImage as string;
    const root = process.env.ASSET_ROOT!;

    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    const row = await translated(published.json().storyVersionId, 'fr');

    // The words landed even though the picture could not be re-lettered, and
    // the French shelf falls back to the cover that exists.
    expect(row.status).toBe('ready');
    expect(existsSync(join(root, `${key}.fr.webp`))).toBe(false);
  });


  it('does not pay to translate a world nobody else can read', async () => {
    const draftId = await compiled();
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PRIVATE' },
    });
    // A private world has one reader, in the language they wrote it in.
    const rows = await app.ctx.repo.getStoryText(published.json().storyVersionId);
    expect(rows).toEqual([]);
  });

  it('translates it when it reaches the public shelf, not before', async () => {
    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'UNLISTED' },
    });
    const { storyVersionId } = published.json();
    expect(await app.ctx.repo.getStoryText(storyVersionId)).toEqual([]);

    const shared = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/visibility`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    expect(shared.statusCode).toBe(200);
    const row = await translated(storyVersionId, 'fr');
    expect(row.status).toBe('ready');
  });

  it('keeps a world off the other language\'s shelf until it is written in it', async () => {
    // A gateway that publishes fine and never translates, so the world stays
    // in one language for the length of the test.
    const base = scriptedGateway([SPINE, CAST]);
    const untranslatable = {
      ...base,
      async generateStructured(role: unknown, schema: any, messages?: readonly { content: string }[]) {
        const last = messages?.[messages.length - 1]?.content ?? '';
        if (last.includes('"fields"')) throw new Error('not today');
        return (base as any).generateStructured(role, schema, messages);
      },
    } as unknown as ModelGateway;
    start(untranslatable);

    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    const { storyId, storyVersionId } = published.json();
    await translated(storyVersionId, 'fr');

    const onShelf = async (locale: string) => {
      const response = await app.inject({
        method: 'GET',
        url: '/v1/discover',
        headers: { ...auth, 'accept-language': locale },
      });
      return JSON.stringify(response.json()).includes('The Longest Winter');
    };

    // Written in English, so the English shelf has it…
    expect(await onShelf('en')).toBe(true);
    // …and the French one does not, rather than showing English to a French
    // reader, which is the thing this whole exercise is about.
    expect(await onShelf('fr')).toBe(false);

    // A direct link still opens it. Somebody handed a link asked for *that*
    // world, and refusing it would be worse than showing it as written.
    const detail = await app.inject({
      method: 'GET',
      url: `/v1/stories/${storyId}`,
      headers: { ...auth, 'accept-language': 'fr' },
    });
    expect(detail.statusCode).toBe(200);
    expect(detail.json().story.title).toBe('The Longest Winter');
  });

  it('puts it on the other shelf once the translation lands', async () => {
    const draftId = await compiled();
    await withCover(draftId);
    const published = await app.inject({
      method: 'POST',
      url: `/v1/create/drafts/${draftId}/publish`,
      headers: auth,
      payload: { visibility: 'PUBLIC' },
    });
    await translated(published.json().storyVersionId, 'fr');

    const french = await app.inject({
      method: 'GET',
      url: '/v1/discover',
      headers: { ...auth, 'accept-language': 'fr' },
    });
    const body = JSON.stringify(french.json());
    expect(body).toContain('[tr] The Longest Winter');
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
