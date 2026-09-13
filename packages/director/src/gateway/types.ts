import type { z } from 'zod';

/**
 * Spec §32.5 — one internal interface abstracts every model provider.
 *
 * Business logic never touches a vendor SDK. It asks for a *role*, and
 * configuration decides which provider and snapshot answers. That is what makes
 * quality tiers, cost control, and provider failover a config change rather than
 * a refactor.
 */

/** Spec §17.7 — roles, never marketing model names, in production code. */
export type ModelRole =
  | 'intent_fast'
  | 'director_standard'
  | 'director_premium'
  | 'writer_fast'
  | 'writer_standard'
  | 'writer_premium'
  | 'validator_fast'
  | 'moderation'
  | 'embeddings';

export interface ModelMessage {
  readonly role: 'system' | 'user' | 'assistant';
  /**
   * Untrusted content is passed as data, never concatenated into privileged
   * instructions (spec §18.2/§18.3).
   */
  readonly content: string;
}

export interface GenerateOptions {
  readonly maxTokens?: number;
  readonly temperature?: number;
  readonly timeoutMs?: number;
  readonly requestId?: string;
  /** Deterministic providers use this so a turn replays identically. */
  readonly seed?: string;
  /**
   * Groups requests that share a prompt prefix, so they land on the same cache.
   * Optional on the newer families and free to send.
   */
  readonly promptCacheKey?: string;
  /**
   * Opt into the Responses API for this call. The Chat Completions path stays
   * the default until parity is verified; both build the identical messages.
   */
  readonly api?: 'chat' | 'responses';
  /**
   * Responses-only. Hands context management to the provider: once the input
   * passes this many tokens it compacts the older turns itself. Ignored on the
   * Chat Completions path, which has no equivalent.
   */
  readonly compactThreshold?: number;
  /** Responses-only. How long the provider keeps this prefix cached. */
  readonly cacheRetention?: '24h' | 'in-memory';
  /**
   * Responses-only. Opaque provider items — a returned `compaction` artifact —
   * spliced in immediately before the final message, i.e. after the standing
   * instructions and before this turn's input. They stand in for the history
   * they replace.
   */
  readonly prefixItems?: readonly unknown[];
  /**
   * Responses-only. Ask for the schema through `text.format` instead of a
   * trailing instruction message. Required for an append-only conversation: a
   * trailing message sits where next turn's assistant beat will go, so it stops
   * every request from being a strict extension of the last one.
   */
  readonly nativeSchema?: boolean;
  /**
   * Runs on the parsed JSON before validation. For repairing answers that are
   * right but not in the requested vocabulary — a speaker given as "Monkey D.
   * Luffy" rather than `luffy` — so a good turn is not thrown away over a
   * label. It must never change meaning, only spelling.
   */
  readonly normalize?: (raw: unknown) => unknown;
}

export interface ModelInvocation {
  readonly requestId: string;
  readonly role: ModelRole;
  readonly provider: string;
  readonly model: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly costUsd: number;
  readonly latencyMs: number;
  readonly ok: boolean;
  readonly errorCode: string | null;
  /** Prefix tokens served from the provider's cache, when it reports them. */
  readonly cachedTokens?: number;
  /** Prefix tokens written *into* the cache. Only the Responses API reports this. */
  readonly cacheWriteTokens?: number;
  /** The provider-side id of this response, when the endpoint has one. */
  readonly responseId?: string;
  /**
   * The `compaction` item, when the provider compacted this call. Opaque and
   * encrypted; the only thing to do with it is store it and send it back.
   */
  readonly compaction?: unknown;
}

export interface StructuredResult<T> {
  readonly value: T;
  readonly invocation: ModelInvocation;
}

export interface TextStreamChunk {
  readonly delta: string;
  readonly done: boolean;
}

export interface ModerationResult {
  readonly flagged: boolean;
  readonly categories: string[];
  /** Copy safe to show a player. Never raw policy jargon (spec §10.8). */
  readonly playerFacingMessage: string | null;
}

/** Spec §32.5 — the whole surface. Everything else is an implementation detail. */
export interface ModelGateway {
  readonly name: string;

  /**
   * `T` binds to the schema's *output* type. With `.default()` the input and
   * output types differ, and inferring from the input made guaranteed fields
   * come back as possibly undefined at every call site.
   */
  generateStructured<T>(
    role: ModelRole,
    schema: z.ZodType<T, z.ZodTypeDef, unknown>,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): Promise<StructuredResult<T>>;

  streamText(
    role: ModelRole,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): AsyncIterable<TextStreamChunk>;

  embed(texts: readonly string[]): Promise<number[][]>;

  moderate(input: string): Promise<ModerationResult>;
}

export class ModelGatewayError extends Error {
  constructor(
    override readonly message: string,
    readonly code: 'TIMEOUT' | 'INVALID_JSON' | 'PROVIDER_ERROR' | 'SCHEMA_VIOLATION' | 'RATE_LIMITED',
    readonly retryable: boolean,
  ) {
    super(message);
    this.name = 'ModelGatewayError';
  }
}
