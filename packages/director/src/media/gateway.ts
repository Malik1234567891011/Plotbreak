import type { ImagePromptSpec } from './prompts.js';

/**
 * Spec §32.6 — the media gateway.
 *
 * One interface, so business logic never touches a vendor SDK and provenance is
 * recorded identically whoever generated the asset.
 */

export interface GeneratedAsset {
  readonly assetKey: string;
  readonly bytes: Uint8Array;
  readonly contentType: string;
  readonly width: number;
  readonly height: number;
  /** Spec §32.6 — provenance stored on every generated asset. */
  readonly provenance: {
    readonly provider: string;
    readonly model: string;
    readonly requestId: string;
    readonly promptHash: string;
    readonly seed: string;
    readonly costUsd: number;
    readonly latencyMs: number;
    readonly createdAt: string;
  };
  readonly alt: string;
}

export interface MediaGateway {
  readonly name: string;
  generateImage(spec: ImagePromptSpec): Promise<GeneratedAsset>;
  /**
   * Re-draw an existing image under a new instruction.
   *
   * What makes a French cover possible at all. `docs/covers-v4/RECIPE.md` makes
   * one by handing the English cover back to an image model and asking for the
   * lettering swapped — same characters, same poses, same light, different
   * words. Generating twice from text instead gives two different pictures,
   * which is not what the shelf looks like.
   */
  editImage(spec: ImagePromptSpec, source: Uint8Array): Promise<GeneratedAsset>;
  /**
   * What lettering is actually in this picture.
   *
   * The recipe's last step is "verify every output by viewing it: title spelled
   * exactly, accents present". That is a person, once, for twenty-five covers.
   * For a world a stranger publishes at two in the morning it has to be the
   * machine, so this reads the words back and the caller compares them.
   */
  readText(bytes: Uint8Array): Promise<string>;
  /** Spec §19.5 — the acceptance pipeline gate. */
  moderateMedia(asset: GeneratedAsset): Promise<{ approved: boolean; reason: string | null }>;
}

export class MediaGatewayError extends Error {
  constructor(
    override readonly message: string,
    readonly code: 'TIMEOUT' | 'PROVIDER_ERROR' | 'REJECTED' | 'RATE_LIMITED',
    readonly retryable: boolean,
  ) {
    super(message);
    this.name = 'MediaGatewayError';
  }
}

/** Aspect ratios the product uses, mapped to the provider's supported sizes. */
const SIZES: Record<ImagePromptSpec['aspect'], { size: string; width: number; height: number }> = {
  PORTRAIT: { size: '1024x1536', width: 1024, height: 1536 },
  LANDSCAPE: { size: '1536x1024', width: 1536, height: 1024 },
  SQUARE: { size: '1024x1024', width: 1024, height: 1024 },
};

/** Approximate output-token cost, for the per-asset cost telemetry §20.12 wants. */
const COST_PER_MILLION_OUTPUT_TOKENS = 40;

export interface OpenAiImageConfig {
  readonly apiKey: string;
  readonly model?: string;
  /** Reads lettering back off a finished cover. A small vision model is plenty. */
  readonly visionModel?: string;
  readonly baseUrl?: string;
  readonly timeoutMs?: number;
  readonly fetchImpl?: typeof fetch;
}

export class OpenAiImageGateway implements MediaGateway {
  readonly name = 'openai';
  readonly #config: OpenAiImageConfig;
  readonly #fetch: typeof fetch;

  constructor(config: OpenAiImageConfig) {
    this.#config = config;
    this.#fetch = config.fetchImpl ?? fetch;
  }

  async generateImage(spec: ImagePromptSpec): Promise<GeneratedAsset> {
    // A tripwire, not a feature flag. Standard turns must never reach a paid
    // image provider — art on a normal turn is selected from what already
    // exists — so a test run can set this and find out loudly rather than
    // discovering it on the bill.
    if (process.env.PLOTBREAK_NO_IMAGE_GEN) {
      throw new Error(
        `Dynamic image generation was called with PLOTBREAK_NO_IMAGE_GEN set (${spec.kind ?? 'image'}). Standard turns must use pre-generated art.`,
      );
    }
    const started = Date.now();
    // Flare and Sunburst bill identically (same output tokens, $30/M), and
    // Flare came back 25-30% faster on both benchmark scenes at comparable
    // quality — the story is waiting on this, so speed breaks the tie.
    const model = this.#config.model ?? 'gpt-image-2.5-flare';
    const { size, width, height } = SIZES[spec.aspect];

    const controller = new AbortController();
    // Image generation is genuinely slow; the default is generous on purpose.
    const timeout = setTimeout(() => controller.abort(), this.#config.timeoutMs ?? 180_000);

    try {
      const response = await this.#fetch(
        `${this.#config.baseUrl ?? 'https://api.openai.com'}/v1/images/generations`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${this.#config.apiKey}`,
          },
          body: JSON.stringify({
            model,
            prompt: spec.prompt,
            size,
            n: 1,
            output_format: 'png',
          }),
          signal: controller.signal,
        },
      );

      if (response.status === 429) {
        throw new MediaGatewayError('Image provider rate limited', 'RATE_LIMITED', true);
      }
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        // A refused prompt is not retryable; a 5xx is.
        const rejected = response.status === 400;
        throw new MediaGatewayError(
          `Image provider returned ${response.status}: ${text.slice(0, 300)}`,
          rejected ? 'REJECTED' : 'PROVIDER_ERROR',
          !rejected && response.status >= 500,
        );
      }

      const payload = (await response.json()) as {
        data: Array<{ b64_json?: string; url?: string }>;
        usage?: { output_tokens?: number };
      };

      const item = payload.data[0];
      if (!item) throw new MediaGatewayError('Image provider returned no image', 'PROVIDER_ERROR', true);

      let bytes: Uint8Array;
      if (item.b64_json) {
        bytes = Uint8Array.from(Buffer.from(item.b64_json, 'base64'));
      } else if (item.url) {
        const download = await this.#fetch(item.url);
        bytes = new Uint8Array(await download.arrayBuffer());
      } else {
        throw new MediaGatewayError('Image provider returned neither bytes nor a URL', 'PROVIDER_ERROR', true);
      }

      const outputTokens = payload.usage?.output_tokens ?? 0;

      return {
        assetKey: spec.assetKey,
        bytes,
        contentType: 'image/png',
        width,
        height,
        alt: spec.alt,
        provenance: {
          provider: this.name,
          model,
          requestId: crypto.randomUUID(),
          promptHash: await hashPrompt(spec.prompt),
          seed: spec.seed,
          costUsd: (outputTokens * COST_PER_MILLION_OUTPUT_TOKENS) / 1_000_000,
          latencyMs: Date.now() - started,
          createdAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (error instanceof MediaGatewayError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new MediaGatewayError('Image provider timed out', 'TIMEOUT', true);
      }
      throw new MediaGatewayError(String(error), 'PROVIDER_ERROR', true);
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * The same picture, re-lettered.
   *
   * `/v1/images/edits` rather than `/v1/images/generations`, because the whole
   * point is that the art does not change — `docs/covers-v4/RECIPE.md` makes
   * the French cover by handing the English one back with one instruction, and
   * two separate generations give two separate worlds.
   *
   * Multipart rather than JSON: the edits endpoint takes the source image as a
   * file part, so this is the one call in the gateway that is not a JSON body.
   */
  async editImage(spec: ImagePromptSpec, source: Uint8Array): Promise<GeneratedAsset> {
    if (process.env.PLOTBREAK_NO_IMAGE_GEN) {
      throw new Error(
        `Image editing was called with PLOTBREAK_NO_IMAGE_GEN set (${spec.kind ?? 'image'}).`,
      );
    }
    const started = Date.now();
    const model = this.#config.model ?? 'gpt-image-2.5-flare';
    const { size, width, height } = SIZES[spec.aspect];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.#config.timeoutMs ?? 180_000);

    try {
      const form = new FormData();
      form.append('model', model);
      form.append('prompt', spec.prompt);
      form.append('size', size);
      form.append('n', '1');
      // `Buffer` is not a `BlobPart` the way a `Uint8Array` is; copying into a
      // fresh view keeps this honest across Node versions.
      form.append(
        'image',
        new Blob([new Uint8Array(source)], { type: 'image/png' }),
        'cover.png',
      );

      const response = await this.#fetch(`${this.#config.baseUrl ?? 'https://api.openai.com'}/v1/images/edits`, {
        method: 'POST',
        headers: { authorization: `Bearer ${this.#config.apiKey}` },
        body: form,
        signal: controller.signal,
      });

      if (response.status === 429) {
        throw new MediaGatewayError('Image provider rate limited', 'RATE_LIMITED', true);
      }
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        const rejected = response.status === 400;
        throw new MediaGatewayError(
          `Image provider returned ${response.status}: ${text.slice(0, 300)}`,
          rejected ? 'REJECTED' : 'PROVIDER_ERROR',
          !rejected && response.status >= 500,
        );
      }

      const payload = (await response.json()) as {
        data: Array<{ b64_json?: string; url?: string }>;
        usage?: { output_tokens?: number };
      };
      const item = payload.data[0];
      if (!item) throw new MediaGatewayError('Image provider returned no image', 'PROVIDER_ERROR', true);

      let bytes: Uint8Array;
      if (item.b64_json) {
        bytes = Uint8Array.from(Buffer.from(item.b64_json, 'base64'));
      } else if (item.url) {
        const download = await this.#fetch(item.url);
        bytes = new Uint8Array(await download.arrayBuffer());
      } else {
        throw new MediaGatewayError('Image provider returned neither bytes nor a URL', 'PROVIDER_ERROR', true);
      }

      return {
        assetKey: spec.assetKey,
        bytes,
        contentType: 'image/png',
        width,
        height,
        alt: spec.alt,
        provenance: {
          provider: this.name,
          model,
          requestId: crypto.randomUUID(),
          promptHash: await hashPrompt(spec.prompt),
          seed: spec.seed,
          costUsd: ((payload.usage?.output_tokens ?? 0) * COST_PER_MILLION_OUTPUT_TOKENS) / 1_000_000,
          latencyMs: Date.now() - started,
          createdAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (error instanceof MediaGatewayError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new MediaGatewayError('Image provider timed out', 'TIMEOUT', true);
      }
      throw new MediaGatewayError(String(error), 'PROVIDER_ERROR', true);
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Read the lettering back off a picture.
   *
   * Image models still cannot spell reliably, and a cover with a misspelt title
   * is not something anybody notices until a player does. Cheap, and the only
   * thing standing where a person stood in the recipe.
   */
  async readText(bytes: Uint8Array): Promise<string> {
    const dataUrl = `data:image/png;base64,${Buffer.from(bytes).toString('base64')}`;
    const response = await this.#fetch(
      `${this.#config.baseUrl ?? 'https://api.openai.com'}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.#config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.#config.visionModel ?? 'gpt-4.1-mini',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text:
                    'Transcribe every word of lettering visible in this image, exactly as written, ' +
                    'including accents. Reply with the words only and nothing else. ' +
                    'If there is no lettering at all, reply with the single word NONE.',
                },
                { type: 'image_url', image_url: { url: dataUrl } },
              ],
            },
          ],
          max_tokens: 100,
        }),
      },
    );

    if (!response.ok) {
      throw new MediaGatewayError(`Could not read the cover back: ${response.status}`, 'PROVIDER_ERROR', true);
    }
    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return payload.choices?.[0]?.message?.content?.trim() ?? '';
  }

  /**
   * Spec §19.5 — the acceptance pipeline.
   *
   * The provider already refuses disallowed prompts, so this is the structural
   * gate: an asset that is truncated, absurdly small, or not actually a PNG
   * never reaches a player. Human moderation of published creator art is a
   * separate queue (§29.7).
   */
  async moderateMedia(asset: GeneratedAsset): Promise<{ approved: boolean; reason: string | null }> {
    if (asset.bytes.length < 4096) {
      return { approved: false, reason: 'Image is implausibly small; likely truncated.' };
    }
    const isPng =
      asset.bytes[0] === 0x89 && asset.bytes[1] === 0x50 && asset.bytes[2] === 0x4e && asset.bytes[3] === 0x47;
    if (!isPng) return { approved: false, reason: 'Payload is not a PNG.' };
    return { approved: true, reason: null };
  }
}

async function hashPrompt(prompt: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(prompt));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

/** Spec §31.4 — provider selection is environment config, never business logic. */
export function createMediaGatewayFromEnv(
  env: Record<string, string | undefined> = process.env,
): MediaGateway | null {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAiImageGateway({
    apiKey,
    ...(env.OPENAI_IMAGE_MODEL ? { model: env.OPENAI_IMAGE_MODEL } : {}),
  });
}
