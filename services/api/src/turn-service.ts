import type { GameState, QualityTier, StoryVersion, TurnRecord } from '@plotbreak/contracts';
import { QUALITY_TIERS } from '@plotbreak/contracts';
import { charactersPresent, dayPart, deriveTurnSeed, outcomeLabel, formatCheckMath, dcBandLabel } from '@plotbreak/engine';
import { runTurn, runTurnPure } from '@plotbreak/director';
import type { Analytics } from '@plotbreak/analytics';
import type { AppContext } from './context.js';
import { reactionAssetKey } from '@plotbreak/contracts';
import { assetExists } from './media-routes.js';
import { resolveAssetUrl, toSceneState } from './projections.js';
import type { SessionRecord, UserRecord } from './repo/types.js';
import { InsufficientCreditsError, type Reservation } from './wallet.js';
import type { TurnStreamHub } from './stream.js';

/**
 * Spec §17.1 — the turn entrypoint: steps 1–3 and 12–17 around the pipeline.
 *
 * The ordering here is the whole contract with the player's wallet:
 *
 *   reserve → resolve+write → commit → finalize
 *
 * If anything fails before the commit, the reserve is released and the player
 * pays nothing (§17.2, §20.8). Once the transaction commits the turn is
 * authoritative, and no later media failure may undo it.
 */

export class StaleRevisionError extends Error {
  constructor(
    readonly currentRevision: number,
    readonly latestTurnId: string | null,
  ) {
    super('Session revision is stale');
    this.name = 'StaleRevisionError';
  }
}

export class TurnFailedError extends Error {
  constructor(
    override readonly message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = 'TurnFailedError';
  }
}

export interface SubmitTurnArgs {
  readonly ctx: AppContext;
  readonly hub: TurnStreamHub;
  readonly user: UserRecord;
  readonly session: SessionRecord;
  readonly story: StoryVersion;
  readonly actionText: string;
  readonly qualityTier: QualityTier;
  readonly clientRevision: number;
  /**
   * The `intentHint` of the response the player tapped, when they tapped one.
   *
   * Carried on the request as `selectedSuggestionId`, a field that had existed
   * on the wire since the first API and was hardcoded to `null` by the client
   * and ignored by the server. It says who the line is aimed at, which the
   * card's own prose very often does not.
   */
  readonly selectedIntentHint?: string | null;
  /**
   * Spec §37 — the turn's emitter, already bound to this player and device.
   *
   * Detached from the request on purpose. The turn is accepted on one request
   * and finishes on a background promise minutes later, by which point the
   * `FastifyRequest` is gone; binding at accept time is what keeps
   * `turn_completed` carrying the same device and app version as the
   * `turn_submitted` it belongs to.
   */
  readonly track: Analytics;
}

export interface AcceptedTurn {
  readonly turnId: string;
  readonly reservedCredits: number;
  readonly balanceAfterReserve: number;
  readonly acceptedRevision: number;
  readonly streamUrl: string;
  readonly streamToken: string;
  /** Resolves when background processing finishes. Awaited by tests. */
  readonly completion: Promise<void>;
}

/**
 * The action was refused before anything happened. Nothing was reserved, no
 * state moved, and the message is the one the player sees.
 */
export class ContentBlockedError extends Error {
  constructor(
    override readonly message: string,
    readonly categories: readonly string[],
  ) {
    super(message);
    this.name = 'ContentBlockedError';
  }
}

/** Exported for the grounding spec; the payload is otherwise unreachable. */
export const heroCastForTest = (state: GameState, preferred: readonly string[]): string[] =>
  heroCast(state, preferred);
export const absentNotablesForTest = (state: GameState, story: StoryVersion): string[] =>
  absentNotables(state, story);

/**
 * The cast of a hero frame: the director's ordering, the engine's membership.
 */
function heroCast(state: GameState, preferred: readonly string[]): string[] {
  const here = charactersPresent(state).map((c) => c.characterId);
  const inRoom = new Set(here);
  const ordered = preferred.filter((id) => inRoom.has(id));
  return (ordered.length > 0 ? ordered : here).slice(0, 3);
}

/**
 * Named people who are somewhere else.
 *
 * Capped, and only characters the art is likely to know how to draw, because a
 * long list of names in a negative clause stops working. Dadan turning up in
 * Gray Terminal is the case this exists for.
 */
function absentNotables(state: GameState, story: StoryVersion): string[] {
  const inRoom = new Set(charactersPresent(state).map((c) => c.characterId));
  return story.characters
    .filter((c) => !inRoom.has(c.id))
    .filter((c) => !!c.visualHook || !!c.portrait)
    .map((c) => c.id)
    .slice(0, 6);
}

export async function submitTurn(args: SubmitTurnArgs): Promise<AcceptedTurn> {
  const { ctx, hub, user, session, story, actionText, qualityTier, clientRevision } = args;

  // Spec §17.10 — these two do not depend on each other, so they do not wait
  // for each other.
  //
  // Loading state is a round trip to Postgres and moderation is a round trip
  // to the model provider, and they ran back to back in the accept path —
  // before the turn had started, while the player watched nothing happen. The
  // ordering guarantees that matter are unchanged: moderation still resolves
  // before the reserve, so a refused turn still costs nothing, and still
  // before the parser, so nothing is generated from refused input.
  const [state, verdict] = await Promise.all([
    ctx.repo.getState(session.sessionId),
    ctx.moderator.check(actionText),
  ]);

  if (!state) throw new TurnFailedError('Session state missing', 'SESSION_NOT_FOUND');

  // Spec §17.4 — a stale revision means the client is acting on a world that has
  // already moved. Reject before spending anything.
  if (clientRevision !== state.revision) {
    const turns = await ctx.repo.listTurns(session.sessionId);
    throw new StaleRevisionError(state.revision, turns.at(-1)?.turnId ?? null);
  }

  // Spec §29.1 layer 3 / §29.2.
  if (verdict.flagged) {
    throw new ContentBlockedError(
      verdict.playerFacingMessage ?? 'That takes the story somewhere it cannot go. Try something else.',
      verdict.categories,
    );
  }

  const turnId = `turn_${crypto.randomUUID()}`;
  // One object decides what this turn costs and how it is generated, so the
  // backend cannot bill Apex and quietly run the Vivid profile.
  const profile = QUALITY_TIERS[qualityTier];
  const cost = profile.costCredits;

  // Spec §17.1 step 3 — reserve before any generation work begins.
  const reservation = await ctx.wallet.reserve(user.userId, cost, turnId);

  const { token } = hub.open(turnId, user.userId);
  hub.emit(turnId, 'turn.accepted', { turnId, qualityTier, reservedCredits: cost }, state.revision);

  // §37.1 — emitted at the reserve, not at the commit, so the denominator of
  // the turn failure rate counts every turn a player actually paid attention
  // to. A turn that dies in the writer must still appear as one that started.
  args.track.track('turn_submitted', {
    storyId: story.storyId,
    turnIndex: state.turnIndex,
    qualityTier,
    creditsReserved: cost,
    fromSuggestion: (args.selectedIntentHint ?? null) !== null,
    // The length, never the text (§30.2). "How long are the actions players
    // type" is a real product question; the actions themselves are not ours to
    // ship to a vendor.
    actionLength: actionText.length,
  });

  const completion = processTurn({ ...args, turnId, reservation, state, profile }).catch(() => {
    // Errors are already surfaced as `turn.failed`; this keeps a background
    // rejection from becoming an unhandled promise.
  });

  return {
    turnId,
    reservedCredits: cost,
    balanceAfterReserve: reservation.balanceAfter,
    acceptedRevision: state.revision,
    streamUrl: `${ctx.config.baseUrl}/v1/turns/${turnId}/stream`,
    streamToken: token,
    completion,
  };
}

async function processTurn(
  args: SubmitTurnArgs & {
    turnId: string;
    reservation: Reservation;
    state: NonNullable<Awaited<ReturnType<AppContext['repo']['getState']>>>;
    /**
     * Resolved once, where the credits were reserved, and carried here rather
     * than looked up again — so the profile that was charged for is provably
     * the profile that generates.
     */
    profile: (typeof QUALITY_TIERS)[QualityTier];
  },
): Promise<void> {
  const { ctx, hub, user, session, story, actionText, qualityTier, turnId, reservation, state, profile } = args;
  const selectedIntentHint = args.selectedIntentHint ?? null;
  const track = args.track;
  // Wall clock for the turn, which is the number the §17.8 latency budget is
  // written against. The per-stage timings below are the model's own; this is
  // what the player waited.
  const startedAt = Date.now();

  try {
    const memories = await ctx.repo.listMemories(session.sessionId);
    const recentTurns = await ctx.repo.listTurns(session.sessionId);

    hub.emit(turnId, 'check.started', { label: 'Resolving' });

    // Spec §11.7 — remember where this turn started, so a fork can come back
    // to it. The state it records is the one already in hand, so nothing is
    // waiting on this write: awaiting it put a Postgres round trip between the
    // player pressing send and the first model call starting.
    const snapshot = ctx.repo
      .putStateSnapshot(session.sessionId, state.turnIndex, state)
      .catch(() => undefined);

    const seed = deriveTurnSeed(session.sessionSeed, state.turnIndex, session.branchKey);
    // The narrative runtime.
    //
    // One frontier model reads the world, the conversation so far and the
    // player's words verbatim, and writes the turn. No parser, no resolver, no
    // director, no checks, no state deltas — measured against all of them and
    // better without. `PLOTBREAK_NARRATIVE=engine` still reaches the old
    // pipeline below for debugging; nothing in production sets it.
    if (process.env.PLOTBREAK_NARRATIVE !== 'engine' && ctx.modelGateway) {
      // The conversation exactly as it was sent, not re-rendered from `turns`.
      // Byte-identical replay is the whole of the cache saving: a reformatted
      // historical message costs every cached token for the rest of the session.
      const priorMessages = await ctx.repo.listPureMessages(session.sessionId);
      // Blocks go out the moment they finish rather than after the whole
      // structured object lands. Without this the player watched a spinner for
      // six seconds and then received the entire turn at once.
      let streamedBlocks = 0;
      const pure = await runTurnPure({
        gateway: ctx.modelGateway,
        story,
        state,
        recentTurns: [],
        rendered: priorMessages,
        shape: 'append',
        api: 'responses',
        cacheRetention: '24h',
        cacheKey: `pb:${session.sessionId}`,
        // The tier, resolved once above and used for both halves of the turn.
        model: profile.model,
        reasoningEffort: profile.reasoningEffort,
        wordTarget: profile.words,
        maxTokens: profile.maxOutputTokens,
        actionText,
        turnId,
        onBlock: (block) => {
          hub.emit(turnId, 'text.stream', {
            index: streamedBlocks,
            speakerId: block.speakerId,
            text: block.text,
          });
          streamedBlocks += 1;
        },
      });

      const savedPure = await ctx.repo.saveState(session.sessionId, state.revision, pure.state);
      if (!savedPure) throw new TurnFailedError('Session changed while the turn was resolving', 'REVISION_CONFLICT');

      const pureRecord: TurnRecord = {
        turnId,
        sessionId: session.sessionId,
        turnIndex: pure.state.turnIndex,
        actionText,
        qualityTier,
        creditsCharged: reservation.amount,
        sceneSummary: pure.sceneSummary,
        blocks: pure.blocks as TurnRecord['blocks'],
        checks: [],
        stateDeltas: [],
        mutations: [],
        suggestions: pure.suggestions as TurnRecord['suggestions'],
        endStatePrompt: pure.endStatePrompt,
        mediaPlan: null,
        heroAssetId: null,
        heroImageUrl: null,
        revisionAfter: pure.state.revision,
        createdAt: new Date().toISOString(),
        repairViolations: [],
        resolution: null,
        beatPlan: null,
      } as TurnRecord;
      await ctx.repo.appendTurn(pureRecord);
      await ctx.repo.appendPureMessage(session.sessionId, pure.state.turnIndex, pure.rendered);
      await ctx.wallet.finalize(reservation);
      const balancePure = await ctx.wallet.getBalance(user.userId);

      // Only what the stream did not already deliver. The streamed blocks are
      // built by the same code that builds these, so the live sequence is a
      // prefix of the committed one and this is a plain slice — never a resend.
      // A drawn frame, when the tier pays for one and the beat earned one.
      //
      // Enqueued rather than awaited: the prose has already streamed and the
      // cards are about to land, so the player reads while it renders. A frame
      // that fails, is refused, or never arrives changes nothing about the turn
      // — the story is already told and already paid for.
      if (profile.heroImageEligible && pure.heroImage && ctx.jobs) {
        hub.expectMedia(turnId);
        ctx.jobs.enqueue(
          'turn-media-image',
          {
            turnId,
            sessionId: session.sessionId,
            storyVersionId: session.storyVersionId,
            locationId: pure.state.player.locationId,
            presentCharacterIds: heroCast(pure.state, pure.reaction ? [pure.reaction.characterId] : []),
            absentCharacterIds: absentNotables(pure.state, story),
            shotType: pure.heroImage.shotType,
            // What the frame is of, in the storyteller's own words. The engine
            // path had to assemble this from a resolution; here the model that
            // wrote the beat says what the picture shows.
            sceneFacts: [pure.heroImage.subject],
            player: {
              name: story.protagonist.kind === 'NAMED' ? story.protagonist.name : undefined,
              appearance:
                story.protagonist.kind === 'NAMED' ? story.protagonist.description : undefined,
            },
          },
          `hero:${turnId}`,
        );
        hub.emit(turnId, 'media.queued', {
          kind: 'HERO_IMAGE',
          shotType: pure.heroImage.shotType,
          reason: pure.heroImage.subject.slice(0, 120),
        });
      }

      for (const [offset, block] of pure.blocks.slice(streamedBlocks).entries()) {
        hub.emit(turnId, 'text.stream', {
          index: streamedBlocks + offset,
          speakerId: block.speakerId,
          text: block.text,
        });
      }
      // Pre-generated art only, and after the prose on purpose. Emitted first,
      // the portrait arrived a beat before the words it belongs to, which reads
      // as the app reacting to something the player has not read yet. This
      // selects an expression that already exists and resolves it to a url; it
      // never enqueues a job and never reaches an image provider. A missing
      // asset simply shows nothing.
      if (pure.reaction) {
        // Suppression lives in the director now, so the decision and the record
        // of it cannot drift apart: `pure.reaction` is already what the player
        // should see, or null.
        const who = story.characters.find((c) => c.id === pure.reaction!.characterId);
        const assetKey = who ? reactionAssetKey(story.storyId, who.id, pure.reaction.emotion) : null;
        // Only if the picture actually exists. Ace has a full reaction deck so
        // this never mattered there; ten launch stories have none at all, and
        // those were being sent a url that 404s on most turns.
        if (who && assetKey && assetExists(assetKey)) {
          hub.emit(turnId, 'reaction.ready', {
            characterId: who.id,
            name: who.name,
            emotion: pure.reaction.emotion,
            url: resolveAssetUrl(assetKey, story.version),
          });
        }
      }

      // Everything needed to answer, later, whether anyone pays for Apex and
      // whether it is profitable. No narrative text: the tier questions are all
      // answerable from counts.
      // A structured line on stdout, which is the shape the app's logger emits
      // and what the platform collects. `turn-service` runs outside a request
      // scope, so there is no `request.log` to reach for here.
      console.info(
        JSON.stringify({
          level: 30,
          event: 'turn.generated',
          sessionId: session.sessionId,
          turnId,
          requestedTier: qualityTier,
          effectiveModel: pure.invocation.model,
          reasoningEffort: profile.reasoningEffort ?? null,
          creditsCharged: reservation.amount,
          inputTokens: pure.invocation.inputTokens,
          cachedTokens: pure.invocation.cachedTokens ?? 0,
          outputTokens: pure.invocation.outputTokens,
          latencyMs: pure.invocation.latencyMs,
          words: pure.blocks.reduce((total, block) => total + block.text.split(/\s+/).length, 0),
          heroImageEligible: profile.heroImageEligible,
          heroImageRequested: Boolean(profile.heroImageEligible && pure.heroImage),
          heroImageNominated: Boolean(pure.heroImage),
        }),
      );

      hub.emit(turnId, 'turn.timings', {
        narrative: pure.telemetry.ms,
        promptChars: pure.telemetry.promptChars,
        historyTurns: pure.telemetry.historyTurns,
      });
      hub.emit(
        turnId,
        'turn.completed',
        {
          turnId,
          blocks: pure.blocks,
          sceneSummary: pure.sceneSummary,
          endStatePrompt: pure.endStatePrompt,
          transition: pure.transition,
          suggestions: pure.suggestions,
          creditsCharged: reservation.amount,
          balance: balancePure,
          scene: toSceneState(story, pure.state),
        },
        pure.state.revision,
      );

      // §37.1 / §20.12. The narrative runtime is one model call, so the
      // per-stage budget collapses into the writer: there is no parser, no
      // engine and no director to attribute time to, and reporting a made-up
      // split across them would be worse than reporting the truth. `totalMs`
      // stays the number §17.8 is written against.
      track.track('turn_completed', {
        storyId: story.storyId,
        turnIndex: pure.state.turnIndex,
        qualityTier,
        creditsCharged: reservation.amount,
        parseMs: 0,
        engineMs: 0,
        directorMs: 0,
        writerMs: pure.telemetry.ms,
        totalMs: Date.now() - startedAt,
        checkCount: 0,
        mutationCount: 0,
        repaired: false,
        // What the provider actually billed, straight off the invocation. This
        // is the only honest input to the §20.12 margin, and computing it from
        // a tier's list price instead would hide exactly the turns that blew
        // through the ceiling.
        providerCostUsd: pure.invocation.costUsd,
      });
      trackTurnTen(track, story.storyId, session, pure.state.turnIndex);
      trackQuestsCompleted(track, story.storyId, pure.completedQuestIds, pure.state.turnIndex);
      return;
    }

    const result = await runTurn({
      // Spec §17.8 — the engine knows the answer about nine seconds before the
      // prose describing it exists. Measured: first readable text at a median
      // of 11.3s, with nothing between 1.8s and then. This closes that gap
      // with the one thing that is both true and final that early: what
      // actually happened. Nothing here is ever reversed by the writer — the
      // writer describes this, it does not overturn it.
      // Spec §17.10 — stream prose sentence by sentence as it is written.
      // The blocks are still emitted after commit, so a client can never
      // render a turn that did not land; these are the same words arriving
      // ten seconds earlier, marked as provisional.
      fastWriter: ctx.modelGateway,
      onText: (sentence) => {
        hub.emit(turnId, 'text.stream', { text: sentence });
      },
      onReaction: (reaction) => {
        hub.emit(turnId, 'reaction.ready', {
          characterId: reaction.characterId,
          name: reaction.name,
          emotion: reaction.emotion,
          // Null when this world has no deck for them; the client then keeps
          // showing the portrait rather than a hole where a face should be.
          url: resolveAssetUrl(reaction.assetKey),
        });
      },
      onResolved: (resolution) => {
        for (const check of resolution.checks) {
          hub.emit(turnId, 'check.resolved', {
            checkId: check.checkId,
            label: check.label,
            outcome: check.outcome,
            outcomeLabel: outcomeLabel(check.outcome),
            difficultyLabel: dcBandLabel(check.dc),
            dc: story.rules.revealExactDc ? check.dc : null,
            math: story.rules.revealCheckMath ? formatCheckMath(check) : null,
          });
        }
        hub.emit(turnId, 'resolution.ready', {
          facts: resolution.observableFacts.slice(0, 4),
          minutes: resolution.timeAdvancedMinutes,
        });
      },
      story,
      state,
      memories,
      recentTurns,
      actionText,
      qualityTier,
      selectedIntentHint,
      turnId,
      seed,
      deps: ctx.pipeline,
    });

    // Spec §10.6 — the check reveal is emitted before the prose, because the
    // engine genuinely rolled first. The exact maths only ships when the story
    // and the player's settings both allow it.
    for (const check of result.resolution.checks) {
      hub.emit(turnId, 'check.resolved', {
        checkId: check.checkId,
        label: check.label,
        difficultyLabel: dcBandLabel(check.dc),
        outcome: check.outcome,
        outcomeLabel: outcomeLabel(check.outcome),
        math:
          story.rules.revealCheckMath && user.settings.showCheckMath ? formatCheckMath(check) : null,
      });
    }

    // Spec §17.1 step 12 — the transaction. Optimistic concurrency guards it, so
    // a turn that raced another one fails here rather than overwriting it.
    const saved = await ctx.repo.saveState(session.sessionId, state.revision, result.state);
    if (!saved) {
      throw new TurnFailedError('Session changed while the turn was resolving', 'REVISION_CONFLICT');
    }

    const record: TurnRecord = {
      turnId,
      sessionId: session.sessionId,
      // The index this turn produced, not the one it started from. The opening
      // record is 0, so using the pre-turn index gave the first player turn 0
      // as well and two different beats shared an index.
      turnIndex: result.state.turnIndex,
      actionText,
      qualityTier,
      creditsCharged: reservation.amount,
      sceneSummary: result.narrative.sceneSummary,
      blocks: result.narrative.blocks,
      checks: result.resolution.checks,
      stateDeltas: result.narrative.stateDeltaPresentation,
      mutations: result.resolution.mutations,
      suggestions: result.plan.suggestedActions,
      endStatePrompt: result.narrative.endStatePrompt,
      mediaPlan: result.plan.mediaPlan,
      heroImageUrl: null,
      revisionAfter: result.state.revision,
      createdAt: new Date().toISOString(),
      // What was actually wrong, not what survived the repair. `report` is
      // re-validated after each repair pass, so a repair that worked left this
      // column storing an empty array on every repaired turn.
      repairViolations: result.repaired ? result.observedViolations : [],
      // Kept so `Rephrase narration` reruns the prose against the same
      // resolution and the same staging, rather than rolling the turn again.
      resolution: result.resolution,
      beatPlan: result.plan,
    };

    await ctx.repo.appendTurn(record);
    await ctx.repo.appendEvents(result.events);
    await ctx.repo.appendMemories(session.sessionId, result.newMemories);
    await ctx.repo.updateSession(session.sessionId, { lastPlayedAt: record.createdAt });

    // The pre-turn snapshot has to exist before this turn's result does, or a
    // fork from this moment would find nothing to fork from.
    await snapshot;

    // Spec §17.1 step 13 — only now does the reserve become a real charge.
    await ctx.wallet.finalize(reservation);

    // Text streams after commit so a client can never render a turn that did not
    // land. Chunking by block keeps the SSE contract simple and replayable.
    for (const [index, block] of result.narrative.blocks.entries()) {
      hub.emit(turnId, 'text.delta', {
        blockIndex: index,
        type: block.type,
        speakerId: block.speakerId ?? null,
        text: block.text,
        visibility: block.visibility,
        voiceEligible: block.voiceEligible ?? false,
      });
    }

    for (const delta of result.narrative.stateDeltaPresentation) {
      hub.emit(turnId, 'state.delta', { ...delta });
    }

    // Spec §17.1 step 15 — media is enqueued, never awaited. Images must not
    // block the player from reading the turn or composing the next one (§17.8).
    if (result.plan.mediaPlan.heroImage.eligible) {
      const job = ctx.jobs.enqueue(
        'turn-media-image',
        {
          turnId,
          sessionId: session.sessionId,
          storyVersionId: session.storyVersionId,
          locationId: result.state.player.locationId,
          /**
           * Who the engine has in the room, not who the director named.
           *
           * `activeCharacterIds` is the model's pick of up to three, and it
           * went to the image generator unchecked. On turn 13 of the
           * forty-turn Ace run it was `["luffy","sabo","dadan"]` while the
           * player stood on Mount Colubo and Dadan was down at the house — and
           * the frame came back as Dadan's camp, with Dadan in it, for a beat
           * set in the forest. On turn 20 it was `[]`, and an empty cast is
           * how the generator ends up inventing three people.
           *
           * So the director's pick is treated as an ordering preference and
           * the engine's `charactersPresent` as the authority: anybody not in
           * the room is dropped, and if nothing survives, the room itself is
           * the cast.
           */
          presentCharacterIds: heroCast(result.state, result.plan.mediaPlan.activeCharacterIds),
          /**
           * Notable people who are *not* here, so the prompt can say so.
           * Naming the absent is the only reliable way to keep them out.
           */
          absentCharacterIds: absentNotables(result.state, story),
          shotType: result.plan.mediaPlan.heroImage.shotType,
          /**
           * What the frame is of. Never empty.
           *
           * This was `observableFacts` alone, and on a conversational turn the
           * engine has nothing observable to report — measured empty on turns
           * 13 and 25 of the forty-turn run. The prompt then contained a
           * style, a framing, a location and a cast, and **no statement of
           * what was happening**, which is how it falls back to a generic
           * scene from the source material. The beat plan's dramatic focus is
           * engine-side and written before the prose, so it keeps the rule
           * that an image never depicts something the engine did not agree to.
           */
          sceneFacts:
            result.resolution.observableFacts.length > 0
              ? result.resolution.observableFacts
              : [result.plan.dramaticFocus].filter((f): f is string => !!f && f.length > 0),
          // What the player looks like and how they are doing, so the frame is
          // of this run rather than of the world in general.
          player: {
            name: story.protagonist.kind === 'NAMED' ? story.protagonist.name : undefined,
            /**
             * A named protagonist has an authored appearance and it was never
             * being sent: `identity.advanced.appearance` is null unless the
             * player wrote one, so the prompt said "the player is in this
             * shot, keep their face turned" and nothing else. With no
             * description of who the body belongs to, the generator drew the
             * most recognisable child it had been given — Luffy, straw hat and
             * all, three times, and twice with Luffy *also* in the frame. Ace's
             * own line, "Ten. Wiry, freckled, black hair that will not do
             * anything", was sitting on the story the whole time.
             */
            appearance:
              result.state.player.identity.advanced.appearance ??
              (story.protagonist.kind === 'NAMED' ? story.protagonist.description : undefined),
            condition: playerCondition(result.state),
            carrying: result.state.player.inventory
              .filter((e) => e.equipped)
              .map((e) => story.items.find((i) => i.id === e.itemId)?.name)
              .filter((n): n is string => !!n)
              .slice(0, 3),
          },
          timeOfDay: dayPart(result.state.worldMinute),
        },
        // Keyed on the turn, so a retried commit never generates twice.
        `hero:${turnId}`,
      );

      // Before `turn.completed`, so the stream knows to stay open for it.
      hub.expectMedia(turnId);

      hub.emit(turnId, 'media.queued', {
        kind: 'HERO_IMAGE',
        jobId: job.jobId,
        shotType: result.plan.mediaPlan.heroImage.shotType,
        reason: result.plan.mediaPlan.heroImage.reason,
      });

      // The turn is already committed and streamed; this only decorates it.
      //
      // It must always settle, either way. The stream is now held open for
      // this event, so a silent return on failure would leave the connection
      // hanging until the client timed out.
      void (async () => {
        try {
          await ctx.jobs.drain(120_000);
          const finished = await ctx.repo.getTurn(turnId);
          if (finished?.heroImageUrl) {
            hub.emit(turnId, 'media.completed', {
              kind: 'HERO_IMAGE',
              url: finished.heroImageUrl,
            });
            return;
          }
          hub.emit(turnId, 'media.failed', { kind: 'HERO_IMAGE', reason: 'NO_IMAGE' });
        } catch (error) {
          console.error(`[media] ${turnId} hero frame failed:`, error);
          hub.emit(turnId, 'media.failed', { kind: 'HERO_IMAGE', reason: 'JOB_FAILED' });
        }
      })();
    }

    const balance = await ctx.wallet.getBalance(user.userId);
    // Stage timings, for the latency autopsy. Cheap, and the only honest way
    // to know which stage is costing the player their eleven seconds.
    hub.emit(turnId, 'turn.timings', { ...result.timings });

    hub.emit(
      turnId,
      'turn.completed',
      {
        turnId,
        sceneSummary: result.narrative.sceneSummary,
        endStatePrompt: result.narrative.endStatePrompt,
        suggestions: result.plan.suggestedActions,
        creditsCharged: reservation.amount,
        balance,
        // The updated stage ships with the completion event so the client can
        // repaint without a round-trip.
        scene: toSceneState(story, result.state, { mediaPlan: result.plan.mediaPlan }),
      },
      result.state.revision,
    );

    // §37.4 — every violation, not just the ones that forced a repair. The
    // repair rate alone says how often the validator fired; the codes say what
    // the writer keeps getting wrong, which is the part that can be fixed.
    for (const violation of result.observedViolations) {
      track.track('consistency_violation', {
        storyId: story.storyId,
        code: violation.code,
        severity: violation.severity,
        repaired: result.repaired,
      });
    }
    if (result.repaired) {
      track.track('turn_repaired', {
        storyId: story.storyId,
        violationCount: result.observedViolations.length,
      });
    }

    track.track('turn_completed', {
      storyId: story.storyId,
      turnIndex: result.state.turnIndex,
      qualityTier,
      creditsCharged: reservation.amount,
      parseMs: Math.round(result.timings.parse ?? 0),
      engineMs: Math.round(result.timings.engine ?? 0),
      directorMs: Math.round(result.timings.director ?? 0),
      writerMs: Math.round(result.timings.writer ?? 0),
      totalMs: Date.now() - startedAt,
      checkCount: result.resolution.checks.length,
      mutationCount: result.resolution.mutations.length,
      repaired: result.repaired,
      // The staged pipeline spreads its spend across four model calls and does
      // not total them, so this reports zero rather than a guess. Only
      // `PLOTBREAK_NARRATIVE=engine` reaches this path and nothing in
      // production sets it, so no cost chart is missing anything; if that ever
      // stops being true, this is the line that has to be plumbed first.
      providerCostUsd: 0,
    });
    trackTurnTen(track, story.storyId, session, result.state.turnIndex);
    trackQuestsCompleted(
      track,
      story.storyId,
      result.state.quests
        .filter((q) => q.status === 'COMPLETED')
        .filter((q) => !state.quests.some((before) => before.questId === q.questId && before.status === 'COMPLETED'))
        .map((q) => q.questId),
      result.state.turnIndex,
    );
  } catch (error) {
    // A failed turn used to leave no trace on the server. The player got
    // `turn.failed` on the stream, but `GET /v1/turns/<id>` kept answering 404
    // forever, so from outside the process a dead turn and a slow one were
    // indistinguishable — which is exactly how a provider outage reads as "the
    // engine is hanging". This line is the only record of what actually broke.
    console.error(`[turn] ${turnId} failed:`, error);

    // Spec §17.2 / §20.8 — nothing committed, so nothing is charged. The player
    // is never billed for a provider timeout or an internal fault.
    await ctx.wallet.release(reservation, 'TURN_FAILED');

    const code = error instanceof TurnFailedError ? error.code : 'GENERATION_FAILED';

    // §37.1 — the numerator of the failure rate §17.8 caps at 1%. The stage is
    // a coarse guess from the code, because by the time the error reaches here
    // the only thing that survived the throw is the code itself.
    track.track('turn_failed', {
      storyId: story.storyId,
      turnIndex: state.turnIndex,
      code,
      creditsReleased: reservation.amount,
      stage: failedStage(code),
    });

    hub.emit(turnId, 'turn.failed', {
      code,
      // Spec §10.8 — plain copy, no policy jargon, and an explicit reassurance
      // that the credits came back.
      message: "That turn didn't complete. You weren't charged.",
      refunded: reservation.amount,
    });
  }
}

export { InsufficientCreditsError };


/**
 * How hurt the player is, as a word.
 *
 * An image prompt should never carry a number: "12 health" means nothing to a
 * model, and the point is what the picture shows.
 */
function playerCondition(state: GameState): string {
  const health = state.player.resources.find((r) => r.id === 'health' || r.id === 'hp');
  if (!health || health.max === 0) return 'unhurt';
  const ratio = health.current / health.max;
  if (ratio > 0.75) return 'unhurt';
  if (ratio > 0.4) return 'hurt';
  return 'badly hurt';
}


/**
 * §37.1 — turn 10 is the activation moment the launch targets are written
 * against (35% of started sessions), and it is a one-shot event: emitted on the
 * turn that crosses the line and never again, so the rate is a count of
 * sessions and not a count of turns past ten.
 */
function trackTurnTen(
  track: Analytics,
  storyId: string,
  session: SessionRecord,
  turnIndex: number,
): void {
  if (turnIndex !== 10) return;
  track.track('turn_10_reached', {
    storyId,
    minutesToReach: Math.max(
      0,
      Math.round((Date.now() - new Date(session.createdAt).getTime()) / 60_000),
    ),
  });
}

/**
 * Who finished which quest. Each id is reported once per session: both turn
 * paths only pass quests whose status became COMPLETED on this turn.
 */
function trackQuestsCompleted(
  track: Analytics,
  storyId: string,
  questIds: readonly string[],
  turnIndex: number,
): void {
  for (const questId of questIds) track.track('quest_completed', { storyId, questId, turnIndex });
}

/**
 * Which stage a failure code came from.
 *
 * Deliberately coarse. The alternative — threading a stage label through every
 * throw in the pipeline — would put analytics plumbing in the path of the code
 * that is already having a bad day, and `UNKNOWN` on a chart is honest in a way
 * that a confidently wrong stage is not.
 */
function failedStage(code: string): 'PARSE' | 'ENGINE' | 'DIRECTOR' | 'WRITER' | 'VALIDATE' | 'COMMIT' | 'UNKNOWN' {
  switch (code) {
    case 'REVISION_CONFLICT':
      return 'COMMIT';
    case 'PARSE_FAILED':
      return 'PARSE';
    case 'WRITER_FAILED':
    case 'GENERATION_FAILED':
      return 'WRITER';
    case 'VALIDATION_FAILED':
      return 'VALIDATE';
    default:
      return 'UNKNOWN';
  }
}
