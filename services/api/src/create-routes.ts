import { randomUUID } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import {
  CREATE_ASSIST_COST_CREDITS,
  CREATE_COMPILE_COST_CREDITS,
  CREATE_STEPS,
  DRAFT_LENGTHS,
  DRAFT_POVS,
  DRAFT_TONES,
  DRAFT_VISIBILITIES,
  StoryDraft,
  StoryDraftPatch,
  artIsStale,
  compileIsStale,
  preserveUploads,
  draftReadiness,
  draftToStoryVersion,
  emptyDraft,
  type CreatorTitle,
  type DraftVisibility,
} from '@plotbreak/contracts';
import { ASSIST_TARGETS, assistField, compileStory, type AssistTarget } from '@plotbreak/director';
import type { AppContext } from './context.js';
import { requireUser, sendError } from './context.js';
import { InsufficientCreditsError } from './wallet.js';
import { tracker } from './analytics.js';
import { MAX_IMAGE_BYTES, imageFormat, ownerFolder, storeUpload } from './create-uploads.js';
import { drawDraftArt } from './create-art.js';
import { markTranslationsPending, translateInBackground } from './translate-story.js';
import { resolveDeviceLocale, resolveLocale } from '@plotbreak/i18n';

/**
 * Create mode — the creator's half of the app.
 *
 * Its own module rather than another eight hundred lines of `server.ts`, and
 * its own flag: `PLOTBREAK_CREATE=off` removes the routes entirely, which is
 * what lets the tab ship dark.
 *
 * Two of these routes cost money and both charge single-phase, so both must
 * refund on failure. Everything else is free, because a creator who is charged
 * for saving is a creator who stops saving.
 */

const FLAG_OFF = process.env.PLOTBREAK_CREATE === 'off';
/** Charging while the feature is behind a flag would bill people for a preview. */
const CHARGING = process.env.PLOTBREAK_CREATE === 'on';

/** How many worlds one person may have on the go. Not a business rule — a floodgate. */
const MAX_DRAFTS = 50;

function title(draft: StoryDraft, ready: boolean, signals: { runs: number; likes: number; comments: number }): CreatorTitle {
  return {
    draftId: draft.draftId,
    storyId: draft.storyId,
    title: draft.title,
    hook: draft.hook,
    coverImage: draft.coverImage,
    status: draft.publishedVersionId ? 'PUBLISHED' : 'DRAFT',
    visibility: draft.visibility,
    ready,
    runs: signals.runs,
    likes: signals.likes,
    comments: signals.comments,
    updatedAt: draft.updatedAt,
  };
}

/** A slug that is stable for a story and unique across the catalogue. */
function slugFor(title: string, storyId: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return `${base || 'story'}-${storyId.slice(-6)}`;
}

export function registerCreateRoutes(app: FastifyInstance, ctx: AppContext): void {
  if (FLAG_OFF) return;

  /** The vocabulary the builder renders. Sent once so the client never hardcodes it. */
  app.get('/v1/create/options', async () => ({
    tones: DRAFT_TONES,
    lengths: DRAFT_LENGTHS,
    povs: DRAFT_POVS,
    visibilities: DRAFT_VISIBILITIES,
    steps: CREATE_STEPS,
    assistTargets: ASSIST_TARGETS,
    compileCost: CHARGING ? CREATE_COMPILE_COST_CREDITS : 0,
    assistCost: CHARGING ? CREATE_ASSIST_COST_CREDITS : 0,
  }));

  /** The creator dashboard. Drafts and published worlds together, newest first. */
  app.get('/v1/create/titles', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const drafts = await ctx.repo.listDrafts(user.userId);
    const storyIds = drafts.map((d) => d.storyId).filter((id): id is string => Boolean(id));
    const [signals, comments] = await Promise.all([
      storyIds.length ? ctx.repo.getSignalsFor(storyIds) : Promise.resolve(new Map()),
      storyIds.length ? ctx.repo.countComments(storyIds) : Promise.resolve(new Map<string, number>()),
    ]);
    const likes = storyIds.length ? await ctx.repo.countLikes(storyIds) : new Map<string, number>();
    return {
      titles: drafts.map((draft) =>
        title(draft, draftReadiness(draft).ready, {
          runs: draft.storyId ? (signals.get(draft.storyId)?.runs ?? 0) : 0,
          likes: draft.storyId ? (likes.get(draft.storyId) ?? 0) : 0,
          comments: draft.storyId ? (comments.get(draft.storyId) ?? 0) : 0,
        }),
      ),
    };
  });

  app.post('/v1/create/drafts', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const existing = await ctx.repo.listDrafts(user.userId);
    if (existing.length >= MAX_DRAFTS) {
      return sendError(reply, 409, 'TOO_MANY_DRAFTS', `You already have ${MAX_DRAFTS} stories in progress.`);
    }
    const draft = StoryDraft.parse({
      ...emptyDraft({
        draftId: randomUUID(),
        ownerId: user.userId,
        now: new Date().toISOString(),
      }),
      // The language this world will be written in, from the creator's own
      // setting. Everything about translating it afterwards depends on knowing
      // it, and asking later means guessing from the prose.
      locale: resolveLocale(
        undefined,
        user.settings.locale,
        resolveDeviceLocale(request.headers['accept-language']),
      ),
    });
    await ctx.repo.putDraft(draft);
    tracker(ctx, request, user).track('create_draft_started', { draftId: draft.draftId });
    return { draft, readiness: draftReadiness(draft) };
  });

  /** Everything below this point needs a draft that is actually theirs. */
  async function owned(
    request: { params: { draftId: string } },
    reply: Parameters<typeof sendError>[0],
    userId: string,
  ): Promise<StoryDraft | null> {
    const draft = await ctx.repo.getDraft(request.params.draftId);
    // Not-found and not-yours are the same answer on purpose: a 403 here would
    // confirm that somebody else's draft id exists.
    if (!draft || draft.ownerId !== userId) {
      sendError(reply, 404, 'DRAFT_NOT_FOUND', 'That story is not here.');
      return null;
    }
    return draft;
  }

  app.get<{ Params: { draftId: string } }>('/v1/create/drafts/:draftId', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const draft = await owned(request, reply, user.userId);
    if (!draft) return reply;
    return { draft, readiness: draftReadiness(draft) };
  });

  app.patch<{ Params: { draftId: string } }>('/v1/create/drafts/:draftId', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const draft = await owned(request, reply, user.userId);
    if (!draft) return reply;

    const parsed = StoryDraftPatch.safeParse(request.body ?? {});
    if (!parsed.success) {
      return sendError(reply, 400, 'INVALID_PATCH', 'That change does not fit a story.', {
        issues: parsed.error.issues.slice(0, 8),
      });
    }
    const next = preserveUploads(
      draft,
      StoryDraft.parse({
        ...draft,
        ...parsed.data,
        updatedAt: new Date().toISOString(),
      }),
    );
    await ctx.repo.putDraft(next);
    return { draft: next, readiness: draftReadiness(next) };
  });

  app.delete<{ Params: { draftId: string } }>('/v1/create/drafts/:draftId', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const draft = await owned(request, reply, user.userId);
    if (!draft) return reply;
    if (draft.storyId) {
      // Deleting the draft of a published world would orphan every session
      // pinned to it. Unpublish first, then delete.
      return sendError(
        reply,
        409,
        'PUBLISHED_STORY',
        'This story is published. Make it private first, then delete it.',
      );
    }
    await ctx.repo.deleteDraft(draft.draftId, user.userId);
    return { deleted: true };
  });

  /**
   * Start compiling the pitch into a world.
   *
   * Returns as soon as the work is under way rather than holding the
   * connection for the hundred seconds it takes. A phone cannot hold that:
   * backgrounding the app kills the task, an idle connection gets dropped
   * somewhere between the handset and here, and the client reported every one
   * of those as "you are offline" to somebody who was not.
   *
   * So this charges, marks the draft, kicks the work off and answers 202. The
   * work writes its own result onto `draft.compile`, which the client is
   * already polling because it polls the draft.
   */
  app.post<{
    Params: { draftId: string };
    Body: { pitch?: string; tone?: string; length?: string; pov?: string; locale?: string };
  }>('/v1/create/drafts/:draftId/compile', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const draft = await owned(request, reply, user.userId);
    if (!draft) return reply;
    if (!ctx.modelGateway) {
      return sendError(reply, 503, 'NO_MODEL', 'Story building is unavailable right now.');
    }
    // Two taps on one draft would charge twice and race each other's writes.
    // A compile whose process died is not running, whatever the draft says.
    if (draft.compile.status === 'running' && !compileIsStale(draft.compile)) {
      return sendError(reply, 409, 'ALREADY_COMPILING', 'This story is already being built.');
    }

    const body = request.body ?? {};
    const pitch = {
      text: String(body.pitch ?? draft.pitch.text ?? '').slice(0, 1500),
      tone: (DRAFT_TONES as readonly string[]).includes(String(body.tone))
        ? (body.tone as (typeof DRAFT_TONES)[number])
        : draft.pitch.tone,
      length: (DRAFT_LENGTHS as readonly string[]).includes(String(body.length))
        ? (body.length as (typeof DRAFT_LENGTHS)[number])
        : draft.pitch.length,
      pov: (DRAFT_POVS as readonly string[]).includes(String(body.pov))
        ? (body.pov as (typeof DRAFT_POVS)[number])
        : draft.pitch.pov,
    };
    if (pitch.text.trim().length < 20) {
      return sendError(reply, 400, 'PITCH_TOO_SHORT', 'Tell me a little more about your story first.');
    }

    // The language every field comes back in, said once rather than inferred
    // twice: the compiler's two calls disagreed about it the first time it ran
    // for real, and produced an English world with a French cast.
    const locale = resolveLocale(
      body.locale,
      user.settings.locale,
      resolveDeviceLocale(request.headers['accept-language']),
    );

    const idempotencyKey = `compile:${draft.draftId}:${randomUUID()}`;
    if (CHARGING) {
      try {
        await ctx.wallet.chargeCreate(
          user.userId,
          draft.draftId,
          CREATE_COMPILE_COST_CREDITS,
          idempotencyKey,
          'STORY_COMPILE',
        );
      } catch (error) {
        if (error instanceof InsufficientCreditsError) {
          return sendError(reply, 402, 'INSUFFICIENT_CREDITS', 'Not enough credits to build a story.', {
            required: error.required,
            balance: error.balance,
            shortfall: error.shortfall,
          });
        }
        throw error;
      }
    }

    const started = StoryDraft.parse({
      ...draft,
      pitch,
      // The compiler was told which language to write in, so this is what the
      // world will actually say — better evidence than the setting the draft
      // was created under, which may have changed since.
      locale,
      compile: { status: 'running', startedAt: new Date().toISOString(), message: '' },
      updatedAt: new Date().toISOString(),
    });
    await ctx.repo.putDraft(started);

    // Deliberately not awaited. The reply has already gone; this finishes in
    // its own time and the only thing that reads the outcome is the draft.
    void (async () => {
      try {
        const result = await compileStory({ gateway: ctx.modelGateway!, pitch, locale });
        // Re-read: the creator may have edited the draft while this ran, and
        // their typing outranks a field the compiler is about to overwrite.
        const current = (await ctx.repo.getDraft(draft.draftId)) ?? started;
        if (result.refusal) {
          if (CHARGING) {
            await ctx.wallet
              .refundCreate(user.userId, draft.draftId, CREATE_COMPILE_COST_CREDITS, idempotencyKey)
              .catch(() => undefined);
          }
          await ctx.repo.putDraft(
            StoryDraft.parse({
              ...current,
              compile: { status: 'refused', startedAt: null, message: result.refusal },
              updatedAt: new Date().toISOString(),
            }),
          );
          return;
        }
        const next = StoryDraft.parse({
          ...current,
          ...result.patch,
          compile: { status: 'done', startedAt: null, message: '' },
          updatedAt: new Date().toISOString(),
        });
        await ctx.repo.putDraft(next);
        tracker(ctx, request, user).track('create_compiled', {
          draftId: draft.draftId,
          characters: next.characters.length,
          places: next.places.length,
          endings: next.endings.length,
        });
      } catch (error) {
        request.log.error({ err: error, draftId: draft.draftId }, 'compile failed');
        if (CHARGING) {
          await ctx.wallet
            .refundCreate(user.userId, draft.draftId, CREATE_COMPILE_COST_CREDITS, idempotencyKey)
            .catch(() => undefined);
        }
        const current = (await ctx.repo.getDraft(draft.draftId)) ?? started;
        await ctx.repo
          .putDraft(
            StoryDraft.parse({
              ...current,
              compile: { status: 'failed', startedAt: null, message: '' },
              updatedAt: new Date().toISOString(),
            }),
          )
          .catch(() => undefined);
      }
    })();

    void reply.code(202);
    return { draft: started, readiness: draftReadiness(started) };
  });


  /**
   * A picture out of somebody's camera roll.
   *
   * The riskiest surface in the product, and the one with the least room for
   * "we will add checks later": these end up on cards other people browse. So
   * every upload is moderated before it is stored, and the order matters —
   * nothing untrusted is written to disk until it has passed.
   *
   * Three things happen besides moderation, and each is load-bearing:
   *
   *  - **the metadata is dropped.** A phone photo carries GPS. Publishing one
   *    with EXIF intact tells strangers where the creator lives, and they will
   *    not have thought about it. `sharp` strips it unless asked not to.
   *  - **it is re-encoded.** Whatever arrives becomes a plain JPEG at a sane
   *    size, which normalises away anything clever hiding in the container and
   *    turns an 8 MB photo into something a card can load.
   *  - **it is stored under the owner's id**, so a takedown can find every
   *    picture one person uploaded without a second index.
   */
  app.post<{
    Params: { draftId: string };
    Body: { kind?: string; index?: number; data?: string };
  }>('/v1/create/drafts/:draftId/image', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const draft = await owned(request, reply, user.userId);
    if (!draft) return reply;
    if (!ctx.modelGateway) {
      return sendError(reply, 503, 'NO_MODEL', 'Pictures cannot be checked right now.');
    }

    const kind = request.body?.kind === 'character' ? 'character' : 'cover';
    const index = Number.isInteger(request.body?.index) ? Number(request.body?.index) : -1;
    if (kind === 'character' && !draft.characters[index]) {
      return sendError(reply, 400, 'NOT_THERE', 'There is nobody there to give a picture to.');
    }

    const raw = String(request.body?.data ?? '');
    const base64 = raw.includes(',') ? raw.slice(raw.indexOf(',') + 1) : raw;
    if (base64.length === 0) return sendError(reply, 400, 'NO_IMAGE', 'No picture arrived.');
    // Before decoding: a base64 string is about 4/3 of the bytes it carries,
    // so this bounds the allocation rather than checking it afterwards.
    if (base64.length > (MAX_IMAGE_BYTES * 4) / 3 + 1024) {
      return sendError(reply, 413, 'IMAGE_TOO_BIG', 'That picture is too large. Keep it under 8 MB.');
    }
    const bytes = Buffer.from(base64, 'base64');
    if (bytes.length < 1024) return sendError(reply, 400, 'NO_IMAGE', 'That file is not a picture.');

    const format = imageFormat(bytes);
    if (!format) {
      return sendError(reply, 415, 'IMAGE_FORMAT', 'Use a JPEG or a PNG.');
    }

    // Moderated first, and on the bytes as they arrived rather than on the
    // re-encoded copy: the check should see what the creator actually sent.
    const verdict = await ctx.modelGateway.moderateImage(
      `data:${format};base64,${bytes.toString('base64')}`,
    );
    if (verdict.flagged) {
      request.log.warn(
        { draftId: draft.draftId, userId: user.userId, categories: verdict.categories },
        'upload rejected by moderation',
      );
      return sendError(
        reply,
        422,
        'IMAGE_REJECTED',
        verdict.playerFacingMessage ?? 'That picture cannot be used here.',
      );
    }

    let stored: { assetKey: string; url: string };
    try {
      stored = await storeUpload(bytes, {
        // Hashed, so a public URL never carries a user id.
        ownerId: ownerFolder(user.userId),
        kind,
      });
    } catch (error) {
      request.log.error({ err: error, draftId: draft.draftId }, 'upload could not be stored');
      return sendError(reply, 500, 'IMAGE_FAILED', 'That picture could not be saved. Try again.');
    }

    const next = StoryDraft.parse({
      ...draft,
      // The key, not the url. Everything downstream — localisation, cache
      // busting, the CDN prefix — operates on a key.
      ...(kind === 'cover'
        ? // The banner goes with it. It was drawn to match a cover that is
          // being replaced, and a story page showing the art a creator just
          // rejected is worse than one falling back to the picture they chose.
          { coverImage: stored.assetKey, keyArtImage: null }
        : {
            characters: draft.characters.map((character, at) =>
              at === index ? { ...character, portrait: stored.assetKey } : character,
            ),
          }),
      updatedAt: new Date().toISOString(),
    });
    await ctx.repo.putDraft(next);
    return { draft: next, readiness: draftReadiness(next), url: stored.url, assetKey: stored.assetKey };
  });

  /** Take a picture back off, which is the only way to undo an upload. */
  app.delete<{ Params: { draftId: string }; Querystring: { kind?: string; index?: string } }>(
    '/v1/create/drafts/:draftId/image',
    async (request, reply) => {
      const user = await requireUser(ctx, request, reply);
      if (!user) return reply;
      const draft = await owned(request, reply, user.userId);
      if (!draft) return reply;
      const kind = request.query.kind === 'character' ? 'character' : 'cover';
      const index = Number(request.query.index ?? -1);
      const next = StoryDraft.parse({
        ...draft,
        ...(kind === 'cover'
          ? { coverImage: null, keyArtImage: null }
          : {
              characters: draft.characters.map((character, at) =>
                at === index ? { ...character, portrait: null } : character,
              ),
            }),
        updatedAt: new Date().toISOString(),
      });
      await ctx.repo.putDraft(next);
      return { draft: next, readiness: draftReadiness(next) };
    },
  );

  /** Auto-generate, one field at a time. */
  app.post<{
    Params: { draftId: string };
    Body: { target?: string; index?: number };
  }>('/v1/create/drafts/:draftId/assist', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const draft = await owned(request, reply, user.userId);
    if (!draft) return reply;
    if (!ctx.modelGateway) {
      return sendError(reply, 503, 'NO_MODEL', 'Auto-generate is unavailable right now.');
    }

    const target = String(request.body?.target ?? '');
    if (!(ASSIST_TARGETS as readonly string[]).includes(target)) {
      return sendError(reply, 400, 'UNKNOWN_TARGET', 'There is nothing to write there.');
    }
    const index = Number.isInteger(request.body?.index) ? Number(request.body?.index) : undefined;

    const idempotencyKey = `assist:${draft.draftId}:${randomUUID()}`;
    if (CHARGING) {
      try {
        await ctx.wallet.chargeCreate(
          user.userId,
          draft.draftId,
          CREATE_ASSIST_COST_CREDITS,
          idempotencyKey,
          'STORY_ASSIST',
        );
      } catch (error) {
        if (error instanceof InsufficientCreditsError) {
          return sendError(reply, 402, 'INSUFFICIENT_CREDITS', 'Not enough credits.', {
            required: error.required,
            balance: error.balance,
            shortfall: error.shortfall,
          });
        }
        throw error;
      }
    }

    try {
      const result = await assistField({
        gateway: ctx.modelGateway,
        draft,
        target: target as AssistTarget,
        index,
        locale: resolveLocale(
          undefined,
          user.settings.locale,
          resolveDeviceLocale(request.headers['accept-language']),
        ),
      });
      const next = StoryDraft.parse({
        ...draft,
        ...result.patch,
        updatedAt: new Date().toISOString(),
      });
      await ctx.repo.putDraft(next);
      return { draft: next, readiness: draftReadiness(next) };
    } catch (error) {
      if (CHARGING) {
        await ctx.wallet
          .refundCreate(user.userId, draft.draftId, CREATE_ASSIST_COST_CREDITS, idempotencyKey)
          .catch(() => undefined);
      }
      if (error instanceof Error && /^no (character|place) at index/.test(error.message)) {
        return sendError(reply, 400, 'NOT_THERE', 'There is nothing to write there.');
      }
      throw error;
    }
  });

  /**
   * Draw a cover and a banner for a world that has none.
   *
   * The other half of "every public story has a cover": the gate refuses a
   * publish without one, and this is how a creator who does not want to make a
   * picture gets past it without making one. Same async shape as `compile`,
   * for the same reason — two images is minutes, not seconds.
   *
   * Free. Compiling already costs 180 and a cover is now required to publish,
   * so charging here would quietly turn "publish" into a paid action. The
   * control on the cost is the `media` rate budget this route draws on, not
   * credits.
   */
  app.post<{ Params: { draftId: string } }>(
    '/v1/create/drafts/:draftId/art',
    async (request, reply) => {
      const user = await requireUser(ctx, request, reply);
      if (!user) return reply;
      const draft = await owned(request, reply, user.userId);
      if (!draft) return reply;
      if (!ctx.mediaGateway) {
        return sendError(reply, 503, 'NO_MEDIA', 'Cover art cannot be drawn right now.');
      }
      // Two taps would race each other's writes and pay for four images.
      if (draft.art.status === 'running' && !artIsStale(draft.art)) {
        return sendError(reply, 409, 'ALREADY_DRAWING', 'A cover is already being drawn.');
      }

      // A cover is drawn *from* the world — cast, tone, tags, the fantasy it
      // sells. An empty draft compiles perfectly well, because every field
      // defaults, so "does it compile" is not the question. The question is
      // whether there is a story here yet, and readiness already answers it.
      //
      // Judged at PRIVATE so the cover rule itself is excluded: needing a
      // cover to be allowed to draw a cover is not a gate, it is a deadlock.
      const written = draftReadiness(draft, { visibility: 'PRIVATE' });
      if (!written.ready) {
        return sendError(
          reply,
          422,
          'NOT_ENOUGH_WORLD',
          'Finish the world first — a cover is drawn from the story it belongs to.',
          { issues: written.issues, blockedSteps: written.blockedSteps },
        );
      }

      // And it still has to survive the bridge, because that is what builds
      // the prompt. Checked here, while there is a request to answer, rather
      // than discovered by the background task and reported as a mystery.
      try {
        draftToStoryVersion(draft, {
          storyId: draft.storyId ?? `story_draft_${draft.draftId}`,
          storyVersionId: 'sv_probe',
          version: 1,
          creatorId: user.userId,
          creatorName: user.displayName,
          publishedAt: new Date().toISOString(),
        });
      } catch (error) {
        // Readiness said yes and the contract said no — a bug in the bridge
        // rather than something the creator did, which is what the publish
        // route already calls COMPILE_FAILED. Same code, so the client says
        // the same localised sentence for the same situation.
        request.log.error({ err: error, draftId: draft.draftId }, 'draft failed to compile for art');
        return sendError(
          reply,
          500,
          'COMPILE_FAILED',
          'Something in this story did not fit. We are looking at it.',
        );
      }

      const started = StoryDraft.parse({
        ...draft,
        art: { status: 'running', startedAt: new Date().toISOString(), message: '' },
        updatedAt: new Date().toISOString(),
      });
      await ctx.repo.putDraft(started);

      // Deliberately not awaited; the client watches `draft.art`.
      void (async () => {
        try {
          const art = await drawDraftArt({
            draft: started,
            gateway: ctx.mediaGateway!,
            creatorId: user.userId,
            creatorName: user.displayName,
          });
          // Re-read: the creator kept editing while this ran, and their typing
          // outranks every field except the two this owns.
          //
          // Gone means gone. Falling back to the snapshot this task started
          // with would write a draft the creator deleted back into existence,
          // with a cover on it.
          const current = await ctx.repo.getDraft(draft.draftId);
          if (!current) return;
          await ctx.repo.putDraft(
            StoryDraft.parse({
              ...current,
              coverImage: art.coverImage,
              keyArtImage: art.keyArtImage,
              art: { status: 'done', startedAt: started.art.startedAt, message: '' },
              updatedAt: new Date().toISOString(),
            }),
          );
          tracker(ctx, request, user).track('create_art_drawn', {
            draftId: draft.draftId,
            banner: art.keyArtImage !== null,
          });
        } catch (error) {
          request.log.error({ err: error, draftId: draft.draftId }, 'cover could not be drawn');
          const current = await ctx.repo.getDraft(draft.draftId);
          if (!current) return;
          await ctx.repo
            .putDraft(
              StoryDraft.parse({
                ...current,
                art: {
                  status: 'failed',
                  startedAt: started.art.startedAt,
                  message: 'That cover did not come through. Try again.',
                },
                updatedAt: new Date().toISOString(),
              }),
            )
            .catch(() => undefined);
        }
      })();

      void reply.code(202);
      return { draft: started, readiness: draftReadiness(started) };
    },
  );

  /**
   * Publish.
   *
   * `draftReadiness` is the friendly gate and `StoryVersion.parse` inside
   * `draftToStoryVersion` is the real one. Both run: the first so the stepper
   * can mark steps red, the second so an invalid world can never reach the
   * catalogue however generous the first was.
   */
  app.post<{ Params: { draftId: string }; Body: { visibility?: string } }>(
    '/v1/create/drafts/:draftId/publish',
    async (request, reply) => {
      const user = await requireUser(ctx, request, reply);
      if (!user) return reply;
      const draft = await owned(request, reply, user.userId);
      if (!draft) return reply;

      // Read the destination *before* judging readiness. The body's visibility
      // wins over the draft's, so checking the draft's first would let a
      // PRIVATE draft pass a gate that only applies to PUBLIC and then publish
      // straight to Discover without the cover that gate exists to require.
      const visibility = ((DRAFT_VISIBILITIES as readonly string[]).includes(
        String(request.body?.visibility),
      )
        ? request.body!.visibility
        : draft.visibility) as DraftVisibility;

      const readiness = draftReadiness(draft, { visibility });
      if (!readiness.ready) {
        return sendError(reply, 422, 'NOT_READY', 'This story is not finished yet.', {
          issues: readiness.issues,
          blockedSteps: readiness.blockedSteps,
        });
      }

      const storyId = draft.storyId ?? `story_user_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
      // A published version is immutable, so republishing makes the next one
      // and every live session stays pinned to the version it started on.
      const previous = draft.storyId ? await ctx.repo.getStoryByStoryId(draft.storyId) : null;
      const version = (previous?.version ?? 0) + 1;
      const at = new Date().toISOString();

      let story;
      try {
        story = draftToStoryVersion(draft, {
          storyId,
          storyVersionId: `sv_user_${randomUUID().replace(/-/g, '').slice(0, 16)}`,
          version,
          creatorId: user.userId,
          creatorName: user.displayName,
          publishedAt: at,
        });
      } catch (error) {
        // The readiness check said yes and the contract said no. That is a bug
        // in the bridge rather than a mistake the creator made, so it is worth
        // saying plainly rather than as a validation failure.
        request.log.error({ err: error, draftId: draft.draftId }, 'draft failed to compile');
        return sendError(reply, 500, 'COMPILE_FAILED', 'Something in this story did not fit. We are looking at it.');
      }

      const next = await ctx.repo.publishDraft({
        draft,
        story,
        slug: slugFor(draft.title, storyId),
        visibility,
        at,
      });
      // Only a world on the public shelf is worth translating. A private draft
      // or a link somebody hands to one friend has exactly one reader, in the
      // language it was written in, and paying a model to write it into a
      // language nobody is going to read it in is waste. Making it public later
      // goes through the visibility route, which queues it there.
      if (visibility === 'PUBLIC') {
        await markTranslationsPending(ctx, story);
        translateInBackground(ctx, story);
      }

      tracker(ctx, request, user).track('create_published', {
        draftId: draft.draftId,
        storyId,
        version,
        visibility,
      });
      return { draft: next, storyId, storyVersionId: story.id, readiness: draftReadiness(next) };
    },
  );

  /** Move a published world between Discover, link-only and nobody. */
  app.post<{ Params: { draftId: string }; Body: { visibility?: string } }>(
    '/v1/create/drafts/:draftId/visibility',
    async (request, reply) => {
      const user = await requireUser(ctx, request, reply);
      if (!user) return reply;
      const draft = await owned(request, reply, user.userId);
      if (!draft) return reply;
      if (!draft.storyId) {
        return sendError(reply, 409, 'NOT_PUBLISHED', 'Publish this story before sharing it.');
      }
      if (!(DRAFT_VISIBILITIES as readonly string[]).includes(String(request.body?.visibility))) {
        return sendError(reply, 400, 'INVALID_VISIBILITY', 'That is not a way to share a story.');
      }
      const visibility = request.body!.visibility as DraftVisibility;
      // The other door into Discover. Publishing UNLISTED and then switching to
      // Everyone would otherwise walk a coverless world straight past the gate
      // on the publish route.
      const readiness = draftReadiness(draft, { visibility });
      if (!readiness.ready) {
        return sendError(reply, 422, 'NOT_READY', 'This story is not ready to be shared yet.', {
          issues: readiness.issues,
          blockedSteps: readiness.blockedSteps,
        });
      }
      const changed = await ctx.repo.setStoryVisibility(draft.storyId, user.userId, visibility);
      if (!changed) return sendError(reply, 404, 'DRAFT_NOT_FOUND', 'That story is not here.');

      // Reaching the public shelf is what earns a world its other language, and
      // this is the other way of getting there. Nothing happens twice: the
      // pending row is upserted, and a version already translated is skipped.
      if (visibility === 'PUBLIC' && draft.publishedVersionId) {
        const story = await ctx.repo.getStoryVersion(draft.publishedVersionId);
        if (story) {
          const already = await ctx.repo.getStoryText(story.id).catch(() => []);
          if (already.length === 0) {
            await markTranslationsPending(ctx, story);
            translateInBackground(ctx, story);
          }
        }
      }

      const next = (await ctx.repo.getDraft(draft.draftId))!;
      return { draft: next, readiness: draftReadiness(next) };
    },
  );
}
