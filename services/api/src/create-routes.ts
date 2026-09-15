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
    coverImage: null,
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
    const draft = emptyDraft({
      draftId: randomUUID(),
      ownerId: user.userId,
      now: new Date().toISOString(),
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
    const next = StoryDraft.parse({
      ...draft,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    });
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
   * The pitch, compiled into a world.
   *
   * The one place a creator waits, and the one worth waiting for. Charged
   * before the call and refunded on any failure, because there is nothing to
   * meter afterwards.
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

    // The language every field comes back in, said once rather than inferred
    // twice: the compiler's two calls disagreed about it the first time it ran
    // for real, and produced an English world with a French cast.
    const locale = resolveLocale(
      request.body?.locale,
      user.settings.locale,
      resolveDeviceLocale(request.headers['accept-language']),
    );

    try {
      const result = await compileStory({ gateway: ctx.modelGateway, pitch, locale });
      if (result.refusal) {
        if (CHARGING) {
          await ctx.wallet.refundCreate(
            user.userId,
            draft.draftId,
            CREATE_COMPILE_COST_CREDITS,
            idempotencyKey,
          );
        }
        return sendError(reply, 422, 'PITCH_REFUSED', result.refusal);
      }
      const next = StoryDraft.parse({
        ...draft,
        ...result.patch,
        updatedAt: new Date().toISOString(),
      });
      await ctx.repo.putDraft(next);
      tracker(ctx, request, user).track('create_compiled', {
        draftId: draft.draftId,
        characters: next.characters.length,
        places: next.places.length,
        endings: next.endings.length,
      });
      return { draft: next, readiness: draftReadiness(next) };
    } catch (error) {
      if (CHARGING) {
        await ctx.wallet
          .refundCreate(user.userId, draft.draftId, CREATE_COMPILE_COST_CREDITS, idempotencyKey)
          .catch(() => undefined);
      }
      throw error;
    }
  });

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

      const readiness = draftReadiness(draft);
      if (!readiness.ready) {
        return sendError(reply, 422, 'NOT_READY', 'This story is not finished yet.', {
          issues: readiness.issues,
          blockedSteps: readiness.blockedSteps,
        });
      }

      const visibility = ((DRAFT_VISIBILITIES as readonly string[]).includes(
        String(request.body?.visibility),
      )
        ? request.body!.visibility
        : draft.visibility) as DraftVisibility;

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
      const changed = await ctx.repo.setStoryVisibility(draft.storyId, user.userId, visibility);
      if (!changed) return sendError(reply, 404, 'DRAFT_NOT_FOUND', 'That story is not here.');
      const next = (await ctx.repo.getDraft(draft.draftId))!;
      return { draft: next, readiness: draftReadiness(next) };
    },
  );
}
