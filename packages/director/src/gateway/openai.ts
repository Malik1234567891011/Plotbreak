import { appendFileSync } from 'node:fs';
import type { z } from 'zod';
import { toJsonSchema } from './anthropic.js';
import {
  ModelGatewayError,
  type GenerateOptions,
  type ModelGateway,
  type ModelInvocation,
  type ModelMessage,
  type ModelRole,
  type ModerationResult,
  type StructuredResult,
  type TextStreamChunk,
} from './types.js';

/**
 * OpenAI adapter for the model gateway (spec §32.5).
 *
 * Same interface, same roles, same cost telemetry as the Anthropic adapter —
 * business logic cannot tell them apart, which is the point of §32.5. Uses
 * fetch directly rather than an SDK so the package stays dependency-light.
 *
 * Unlike Anthropic this provider also serves embeddings and a dedicated
 * moderation endpoint, so `embed` and `moderate` are real here rather than the
 * lexical fallback.
 */

export interface OpenAiConfig {
  readonly apiKey: string;
  readonly baseUrl?: string;
  readonly models?: Partial<Record<ModelRole, string>>;
  readonly embeddingModel?: string;
  readonly fetchImpl?: typeof fetch;
}

/** Pinned snapshots. Changing one is a config change gated by evals (§18.4). */
const DEFAULT_MODELS: Record<ModelRole, string> = {
  intent_fast: 'gpt-4.1-mini',
  director_standard: 'gpt-4.1',
  director_premium: 'gpt-4.1',
  writer_fast: 'gpt-4.1-mini',
  writer_standard: 'gpt-4.1',
  // The relaunch storyteller. Everything else stays where it was: these roles
  // are the old pipeline's, which is no longer the production path.
  writer_premium: 'gpt-5.6-terra',
  validator_fast: 'gpt-4.1-mini',
  moderation: 'omni-moderation-latest',
  embeddings: 'text-embedding-3-small',
};

/** USD per million tokens, for the cost telemetry the spec requires (§20.12). */
const PRICING: Record<string, { input: number; output: number }> = {
  'gpt-5.6-terra': { input: 1.25, output: 10 },
  'gpt-4.1': { input: 2, output: 8 },
  'gpt-4.1-mini': { input: 0.4, output: 1.6 },
  'text-embedding-3-small': { input: 0.02, output: 0 },
};

/**
 * Spec §29 — what must never appear, and nothing more.
 *
 * This is a 13+ interactive fiction product whose worlds are built on fantasy
 * violence, moral ambiguity and dark themes. Blocking on the provider's
 * `violence`, `illicit` or `sexual` flags would refuse the genre it exists to
 * serve, so only the categories with no legitimate place in it block a turn.
 * Everything the provider flags is still reported in `categories` for review.
 */
/**
 * The categories that stop a turn, which is not the same as the categories the
 * classifier reports.
 *
 * `violence` is deliberately absent and always has been: "I hit him as hard as
 * I can" trips it, and a world about pirates that refuses that sentence is not
 * a product. Measured against the live classifier, every one of these trips
 * `violence` and nothing else — an ordinary punch, a threat to break somebody's
 * legs, going for a guard's throat.
 *
 * `harassment/threatening` was in this set and is the same mistake one level
 * up. It fired on a card **the game itself wrote**: Ace shouting at Dadan,
 * *"don't say burnt again or I'll throw you in the fire instead of the food"* —
 * cartoon banter between a boy and the woman who raises him, in a story where
 * that is the relationship. The player tapped the game's own suggestion and got
 * "That takes the story somewhere it cannot go."
 *
 * A threat aimed at a character is what dialogue in these worlds is made of.
 * Spec §29.2 asks this layer to classify *request and context* rather than
 * keyword-block fantasy violence, and blocking on a threat to an NPC is exactly
 * the keyword-blocking it forbids. A credible threat against a real person is a
 * different thing and the rule-based floor still catches it.
 *
 * `hate/threatening` stays. Hate speech against a protected group is not a
 * medium any of these stories need, and no world here is worse for refusing it.
 */
const BLOCKING_CATEGORIES = new Set([
  'sexual/minors',
  'self-harm/instructions',
  'self-harm/intent',
  'hate/threatening',
  'illicit/violent',
]);

export class OpenAiGateway implements ModelGateway {
  readonly name = 'openai';
  readonly #config: OpenAiConfig;
  readonly #fetch: typeof fetch;

  constructor(config: OpenAiConfig) {
    this.#config = config;
    this.#fetch = config.fetchImpl ?? fetch;
  }

  get #baseUrl(): string {
    return this.#config.baseUrl ?? 'https://api.openai.com/v1';
  }

  #modelFor(role: ModelRole): string {
    return this.#config.models?.[role] ?? DEFAULT_MODELS[role];
  }

  async #post(path: string, body: unknown, options: GenerateOptions | undefined): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options?.timeoutMs ?? 30_000);

    try {
      const response = await this.#fetch(`${this.#baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.#config.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (response.status === 429) {
        // A 429 is usually "slow down" and is worth retrying. It is also what
        // both providers return for an exhausted balance, which no amount of
        // retrying will fix — and retrying it turns every turn into three
        // pointless round trips before the fallback the player was always
        // going to get.
        const body = await response.text().catch(() => '');
        const outOfCredit = /insufficient_quota|credit_balance_exhausted|billing|no credits/i.test(body);
        throw new ModelGatewayError(
          outOfCredit
            ? `Provider balance exhausted: ${body.slice(0, 160)}`
            : 'Rate limited by provider',
          'RATE_LIMITED',
          !outOfCredit,
        );
      }
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new ModelGatewayError(
          `Provider returned ${response.status}: ${text.slice(0, 200)}`,
          'PROVIDER_ERROR',
          response.status >= 500,
        );
      }
      return response;
    } catch (error) {
      if (error instanceof ModelGatewayError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ModelGatewayError('Provider timed out', 'TIMEOUT', true);
      }
      throw new ModelGatewayError(String(error), 'PROVIDER_ERROR', true);
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * The Responses-API twin of the JSON path above (§32.5 unchanged).
   *
   * Only the transport differs. The extra fields it accepts — `context_management`
   * for provider-side compaction, `prompt_cache_retention` — are opt-in and off
   * unless a caller asks, so an unconfigured call is byte-for-byte the same
   * request the Chat Completions path would have made.
   */
  async #generateViaResponses<T>(
    role: ModelRole,
    schema: z.ZodType<T, z.ZodTypeDef, unknown>,
    messages: readonly ModelMessage[],
    options: GenerateOptions,
    model: string,
    requestId: string,
    started: number,
  ): Promise<StructuredResult<T>> {
    const schemaInstruction = {
      role: 'system' as const,
      content:
        'Reply with a single JSON object and nothing else — no prose around it, no code fence. ' +
        `It must match this JSON Schema:\n${JSON.stringify(toJsonSchema(schema))}`,
    };
    // The leading run of system messages is the static header. Splitting here
    // lets the schema instruction sit inside it instead of after the turn.
    const headerEnd = messages.findIndex((m) => m.role !== 'system');
    const cut = headerEnd === -1 ? messages.length : headerEnd;
    const leading = options.nativeSchema ? messages.slice(0, cut) : [];
    const rest = options.nativeSchema ? messages.slice(cut) : messages;

    const streaming = Boolean(options.onTextDelta);
    const response = await this.#post(
      '/responses',
      {
        model,
        ...(streaming ? { stream: true } : {}),
        max_output_tokens: options.maxTokens ?? 2048,
        input: [
          // Opaque items sit between the standing instructions and the turn:
          // `messages` always ends with this turn's user message, so splicing
          // before the last element puts a compaction artifact exactly where
          // the history it replaced used to be.
          ...leading.map((m) => ({ role: m.role, content: m.content })),
          // `text.format` with strict:false gets the shape right but does not
          // enforce bounds — a `maxItems: 3` came back with four — so the schema
          // is still stated in words. It goes *after the standing instructions
          // and before the transcript* rather than at the tail: same text, but
          // in the part of the request that never changes, so it cannot break
          // the prefix the way a trailing message does.
          ...(options.nativeSchema ? [schemaInstruction] : []),
          ...rest.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
          ...(options.prefixItems ?? []),
          ...rest.slice(-1).map((m) => ({ role: m.role, content: m.content })),
          ...(options.nativeSchema ? [] : [schemaInstruction]),
        ],
        text: options.nativeSchema
          ? {
              // `strict` must be sent explicitly — omitting it is an error, not a
              // default — and false is what lets the open-ended records through.
              format: {
                type: 'json_schema',
                name: 'turn',
                strict: false,
                schema: toJsonSchema(schema),
              },
            }
          : { format: { type: 'json_object' } },
        store: false,
        ...(options.promptCacheKey ? { prompt_cache_key: options.promptCacheKey } : {}),
        ...(options.cacheRetention ? { prompt_cache_retention: options.cacheRetention } : {}),
        ...(options.compactThreshold
          ? { context_management: [{ type: 'compaction', compact_threshold: options.compactThreshold }] }
          : {}),
      },
      options,
    );

    const payload = (streaming
      ? await readStream(response, options.onTextDelta!)
      : await response.json()) as {
      id?: string;
      status?: string;
      incomplete_details?: { reason?: string };
      output?: Array<{
        type?: string;
        id?: string;
        encrypted_content?: string;
        content?: Array<{ type?: string; text?: string }>;
      }>;
      usage?: {
        input_tokens?: number;
        output_tokens?: number;
        input_tokens_details?: { cached_tokens?: number; cache_write_tokens?: number };
        output_tokens_details?: { reasoning_tokens?: number };
      };
    };

    const usage = payload.usage ?? {};
    const cachedTokens = usage.input_tokens_details?.cached_tokens ?? 0;
    const cacheWriteTokens = usage.input_tokens_details?.cache_write_tokens ?? 0;
    if (process.env.PLOTBREAK_USAGE_LOG) {
      appendFileSync(
        process.env.PLOTBREAK_USAGE_LOG,
        JSON.stringify({
          at: new Date().toISOString(),
          api: 'responses',
          model,
          role,
          inputTokens: usage.input_tokens ?? 0,
          cachedTokens,
          cacheWriteTokens,
          outputTokens: usage.output_tokens ?? 0,
          reasoningTokens: usage.output_tokens_details?.reasoning_tokens ?? 0,
          compacted: (payload.output ?? []).some((item) => item.type === 'compaction'),
          latencyMs: Math.round(performance.now() - started),
        }) + '\n',
      );
    }

    // A truncated response is not a schema violation, and reporting it as one
    // sent us chasing the wrong bug the last time an output cap was too low.
    if (payload.status && payload.status !== 'completed') {
      throw new ModelGatewayError(
        `Provider returned status ${payload.status}${payload.incomplete_details?.reason ? ` (${payload.incomplete_details.reason})` : ''}`,
        'PROVIDER_ERROR',
        true,
      );
    }

    const raw = (payload.output ?? [])
      .flatMap((item) => item.content ?? [])
      .map((part) => part.text)
      .filter((text): text is string => typeof text === 'string' && text.length > 0)
      .join('');
    if (!raw) throw new ModelGatewayError('Provider returned no content', 'INVALID_JSON', true);

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
    } catch {
      throw new ModelGatewayError('Provider returned unparseable JSON', 'INVALID_JSON', true);
    }
    const checked = schema.safeParse(options.normalize ? options.normalize(parsed) : parsed);
    if (!checked.success) {
      throw new ModelGatewayError(
        `Structured output failed validation: ${checked.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`,
        'SCHEMA_VIOLATION',
        true,
      );
    }

    return {
      value: checked.data,
      invocation: {
        requestId,
        role,
        provider: this.name,
        model,
        inputTokens: usage.input_tokens ?? 0,
        outputTokens: usage.output_tokens ?? 0,
        latencyMs: Math.round(performance.now() - started),
        costUsd: costOf(model, usage.input_tokens ?? 0, usage.output_tokens ?? 0),
        ok: true,
        errorCode: null,
        cachedTokens,
        cacheWriteTokens,
        responseId: payload.id,
        compaction: (payload.output ?? []).find((item) => item.type === 'compaction'),
      },
    };
  }

  async generateStructured<T>(
    role: ModelRole,
    schema: z.ZodType<T, z.ZodTypeDef, unknown>,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): Promise<StructuredResult<T>> {
    const started = performance.now();
    const requestId = options?.requestId ?? crypto.randomUUID();
    const model = this.#modelFor(role);

    // A single forced function call, mirroring the Anthropic adapter.
    //
    // Not `response_format: json_schema` with strict mode: that subset rejects
    // open-ended objects, and several AI contracts carry `z.record(z.unknown())`
    // payloads by design. Function parameters accept general JSON Schema, and
    // `schema.safeParse` below is the actual guarantee either way.
    // Reasoning models refuse function tools on this endpoint.
    //
    //   "Function tools with reasoning_effort are not supported for gpt-6-astra
    //    in /v1/chat/completions."
    //
    // Rather than turn their reasoning off — which is most of why the
    // experiment wants them — ask for JSON directly and keep `safeParse` as the
    // guarantee it already was. Only the newer families take this path, so
    // nothing about the current production models changes.
    const reasoning = /^(gpt-[6-9]|gpt-5\.[3-9])/.test(model);

    // Same messages, different endpoint. /responses is the only place the
    // provider offers context management and cache-write accounting, and the
    // migration is deliberately behaviour-neutral: identical message array,
    // identical trailing schema instruction, identical `safeParse` guarantee.
    // `text.format: json_object` rather than a native `json_schema` for exactly
    // that reason — a server-enforced schema would change what the model sees
    // and stop this being a parity test. That upgrade is available later.
    if (options?.api === 'responses') {
      return this.#generateViaResponses(role, schema, messages, options, model, requestId, started);
    }

    if (reasoning) {
      const jsonResponse = await this.#post(
        '/chat/completions',
        {
          model,
          max_completion_tokens: options?.maxTokens ?? 2048,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            {
              role: 'system',
              content:
                'Reply with a single JSON object and nothing else — no prose around it, no code fence. ' +
                `It must match this JSON Schema:\n${JSON.stringify(toJsonSchema(schema))}`,
            },
          ],
          response_format: { type: 'json_object' },
          ...(options?.promptCacheKey ? { prompt_cache_key: options.promptCacheKey } : {}),
        },
        options,
      );
      const jsonPayload = (await jsonResponse.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        usage?: {
          prompt_tokens?: number;
          completion_tokens?: number;
          prompt_tokens_details?: { cached_tokens?: number };
          completion_tokens_details?: { reasoning_tokens?: number };
        };
      };
      // Real usage, not an estimate. Written where the experiment can read it:
      // the cost question for a full-history architecture is whether caching
      // actually hits as the transcript grows, and that is only answerable
      // from what the provider reports.
      if (process.env.PLOTBREAK_USAGE_LOG) {
        const u = jsonPayload.usage ?? {};
        appendFileSync(
          process.env.PLOTBREAK_USAGE_LOG,
          JSON.stringify({
            at: new Date().toISOString(),
            model,
            role,
            inputTokens: u.prompt_tokens ?? 0,
            cachedTokens: u.prompt_tokens_details?.cached_tokens ?? 0,
            outputTokens: u.completion_tokens ?? 0,
            reasoningTokens: u.completion_tokens_details?.reasoning_tokens ?? 0,
            latencyMs: Math.round(performance.now() - started),
          }) + '\n',
        );
      }
      const raw = jsonPayload.choices?.[0]?.message?.content;
      if (!raw) throw new ModelGatewayError('Provider returned no content', 'INVALID_JSON', true);
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
      } catch {
        throw new ModelGatewayError('Provider returned unparseable JSON', 'INVALID_JSON', true);
      }
      const checked = schema.safeParse(parsed);
      if (!checked.success) {
        throw new ModelGatewayError(
          `Structured output failed validation: ${checked.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`,
          'SCHEMA_VIOLATION',
          true,
        );
      }
      return {
        value: checked.data,
        invocation: {
          requestId,
          role,
          provider: this.name,
          model,
          inputTokens: jsonPayload.usage?.prompt_tokens ?? 0,
          outputTokens: jsonPayload.usage?.completion_tokens ?? 0,
          latencyMs: Math.round(performance.now() - started),
          costUsd: costOf(model, jsonPayload.usage?.prompt_tokens ?? 0, jsonPayload.usage?.completion_tokens ?? 0),
          ok: true,
          errorCode: null,
        },
      };
    }

    const response = await this.#post(
      '/chat/completions',
      {
        model,
        max_completion_tokens: options?.maxTokens ?? 2048,
        temperature: options?.temperature ?? 0.7,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        tools: [
          {
            type: 'function',
            function: {
              name: 'emit',
              description: 'Emit the result. Every field is required unless marked optional.',
              parameters: toJsonSchema(schema),
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'emit' } },
      },
      options,
    );

    const payload = (await response.json()) as {
      choices?: Array<{
        message?: { tool_calls?: Array<{ function?: { arguments?: string } }> };
      }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number };
    };

    const content = payload.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!content) {
      throw new ModelGatewayError('Provider returned no structured output', 'INVALID_JSON', true);
    }

    let raw: unknown;
    try {
      raw = JSON.parse(content);
    } catch {
      // A truncated response is the usual cause, and it is worth retrying.
      throw new ModelGatewayError('Provider returned malformed JSON', 'INVALID_JSON', true);
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      throw new ModelGatewayError(
        `Structured output failed schema: ${parsed.error.issues.map((i) => i.path.join('.')).join(', ')}`,
        'SCHEMA_VIOLATION',
        true,
      );
    }

    const inputTokens = payload.usage?.prompt_tokens ?? 0;
    const outputTokens = payload.usage?.completion_tokens ?? 0;

    const invocation: ModelInvocation = {
      requestId,
      role,
      provider: this.name,
      model,
      inputTokens,
      outputTokens,
      costUsd: costOf(model, inputTokens, outputTokens),
      latencyMs: Math.round(performance.now() - started),
      ok: true,
      errorCode: null,
    };

    return { value: parsed.data, invocation };
  }

  async *streamText(
    role: ModelRole,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): AsyncIterable<TextStreamChunk> {
    const response = await this.#post(
      '/chat/completions',
      {
        model: this.#modelFor(role),
        max_completion_tokens: options?.maxTokens ?? 1024,
        temperature: options?.temperature ?? 0.8,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
      },
      options,
    );

    if (!response.body) {
      throw new ModelGatewayError('Provider returned no stream body', 'PROVIDER_ERROR', true);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data.length === 0 || data === '[DONE]') continue;
        try {
          const event = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const delta = event.choices?.[0]?.delta?.content;
          if (delta) yield { delta, done: false };
        } catch {
          // A partial frame is normal mid-stream; the next read completes it.
        }
      }
    }

    yield { delta: '', done: true };
  }

  async embed(texts: readonly string[]): Promise<number[][]> {
    if (texts.length === 0) return [];

    const model = this.#config.embeddingModel ?? DEFAULT_MODELS.embeddings;
    const response = await this.#post('/embeddings', { model, input: [...texts] }, undefined);
    const payload = (await response.json()) as {
      data?: Array<{ index: number; embedding: number[] }>;
    };

    const rows = payload.data ?? [];
    if (rows.length !== texts.length) {
      throw new ModelGatewayError('Embedding count did not match input count', 'PROVIDER_ERROR', true);
    }

    // The API does not promise ordering, and memory retrieval would silently
    // pair the wrong vector with the wrong fact if this trusted it to.
    const out: number[][] = new Array<number[]>(texts.length);
    for (const row of rows) out[row.index] = row.embedding;
    return out;
  }

  async moderate(input: string): Promise<ModerationResult> {
    const response = await this.#post(
      '/moderations',
      { model: this.#modelFor('moderation'), input },
      { timeoutMs: 10_000 },
    );

    const payload = (await response.json()) as {
      results?: Array<{ flagged?: boolean; categories?: Record<string, boolean> }>;
    };

    const result = payload.results?.[0];
    const categories = Object.entries(result?.categories ?? {})
      .filter(([, hit]) => hit)
      .map(([name]) => name);

    const blocking = categories.filter((name) => BLOCKING_CATEGORIES.has(name));

    return {
      flagged: blocking.length > 0,
      categories,
      playerFacingMessage:
        blocking.length > 0
          ? 'That takes the story somewhere it cannot go. Try a different approach.'
          : null,
    };
  }
}

function costOf(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = PRICING[model];
  if (!pricing) return 0;
  return (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;
}


/**
 * Consumes a Responses SSE stream.
 *
 * Text is handed to `onDelta` the moment it arrives, and the terminal
 * `response.completed` event carries the same object a non-streaming call would
 * have returned — so everything downstream, including validation and usage
 * accounting, stays identical.
 */
async function readStream(
  response: Response,
  onDelta: (delta: string) => void,
): Promise<unknown> {
  const reader = response.body?.getReader();
  if (!reader) throw new ModelGatewayError('Provider returned no stream', 'PROVIDER_ERROR', true);
  const decoder = new TextDecoder();
  let buffer = '';
  let completed: unknown = null;
  let text = '';

  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split('\n\n');
      buffer = chunks.pop() ?? '';
      for (const chunk of chunks) {
        const name = chunk.match(/^event:\s*(\S+)/m)?.[1];
        const raw = chunk.match(/^data:\s*(.+)$/m)?.[1];
        if (!name || !raw) continue;
        let data: Record<string, unknown>;
        try {
          data = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          continue;
        }
        if (name === 'response.output_text.delta' && typeof data.delta === 'string') {
          text += data.delta;
          // A listener that throws must not take the turn down with it.
          try {
            onDelta(data.delta);
          } catch {
            /* the completed document is still authoritative */
          }
        }
        if (name === 'response.completed' || name === 'response.incomplete') {
          completed = data.response ?? null;
        }
        if (name === 'response.failed' || name === 'error') {
          throw new ModelGatewayError(
            `Provider stream failed: ${JSON.stringify(data).slice(0, 200)}`,
            'PROVIDER_ERROR',
            true,
          );
        }
      }
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }

  if (!completed) {
    // The stream ended without a terminal event. Everything that arrived is
    // still here, so hand it back in the shape the caller expects rather than
    // losing a turn the model has already been paid for.
    if (!text) throw new ModelGatewayError('Provider stream ended with no content', 'PROVIDER_ERROR', true);
    return { status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text }] }] };
  }
  return completed;
}
