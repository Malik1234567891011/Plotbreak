/**
 * PixAI image client for the art scripts (generate-art, opening-panel-art).
 *
 * Measured on the API, 2026-11-22 (docs/stories-50/pixai-ledger.tsv):
 * - Covers: Tsubaki.3 `pro`, 1152x1744 = 4,400 credits, ~40 s. It paints the title legibly.
 * - Opening panels: Tsubaki.3 `pro`, the only model that takes `contextImages`
 *   (the character's portrait), 1024x1536 = 4,200 credits.
 * - Everything else: Tsubaki.2 `lite`, 1024x1536 = 2,700 credits, ~15 s. In a
 *   side-by-side it looked more polished than Tsubaki.3 pro at 4,200.
 *   (Tsubaki.2 standard = 3,500.) Tsubaki.3 has only `pro` and `ultra`; the
 *   website's "Flash" is not exposed on the API.
 * Free lookups: GET /v2/generation-model/{id}/inference-profiles and /size-config.
 *
 * Limits (platform.pixai.art/en/docs/quick-start/limits): at most 10 tasks in
 * `waiting` per account, running tasks do not count; poll no faster than every
 * 1.5 s. Many processes can share the account: a create that hits the waiting
 * cap backs off and retries rather than failing, so phase-2 runs can fan out.
 *
 * Every task is appended to docs/stories-50/pixai-ledger.tsv, the spend record.
 * The key is read from the environment and never printed.
 */
import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const API = 'https://api.pixai.art/v2';
const LEDGER = join(ROOT, 'docs/stories-50/pixai-ledger.tsv');

export const TSUBAKI3 = '2024383379556065549';
export const TSUBAKI2 = '1983308862240288769';
export const MODELS = { tsubaki3: TSUBAKI3, tsubaki2: TSUBAKI2 } as const;
export type PixaiModel = keyof typeof MODELS;
/** Plus membership: $29.99 for 1,000,000 credits. */
export const USD_PER_CREDIT = 29.99 / 1_000_000;

export type PixaiMode = 'lite' | 'standard' | 'pro' | 'ultra';

export const COVER = { model: 'tsubaki3', mode: 'pro' } as const;
export const PANEL = { model: 'tsubaki3', mode: 'pro' } as const;
/** In-story images. Override with PIXAI_IN_STORY=tsubaki2:standard (model:mode). */
export function inStory(): { model: PixaiModel; mode: PixaiMode } {
  const [model, mode] = (process.env.PIXAI_IN_STORY ?? 'tsubaki2:lite').split(':') as [PixaiModel, PixaiMode];
  return { model, mode };
}

/** Sizes by aspect; every value is inside Tsubaki.3's size-config range (512–2496, step 16). */
export const PIXAI_SIZE = {
  COVER: { width: 1152, height: 1744 },
  PORTRAIT: { width: 1024, height: 1536 },
  LANDSCAPE: { width: 1536, height: 1024 },
  SQUARE: { width: 1024, height: 1024 },
} as const;

export const DEFAULT_NEGATIVE =
  'watermark, signature, subtitle, caption, extra words, gibberish text, lowres, blurry, bad anatomy, ' +
  'extra fingers, deformed hands, nsfw, nude, child, photorealistic, 3d render';

export class PixaiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    /** True when retrying the same request cannot help (bad prompt, no balance). */
    readonly fatal = false,
  ) {
    super(message);
  }
}

export interface PixaiRequest {
  readonly prompt: string;
  readonly negativePrompt?: string;
  readonly width: number;
  readonly height: number;
  readonly mode: PixaiMode;
  /** Defaults to Tsubaki.3, the only model that takes `contextImages`. */
  readonly model?: PixaiModel;
  /** Media ids of up to 3 reference images (Tsubaki.3 only). */
  readonly contextImages?: readonly string[];
  /** Label for the ledger, usually the asset key. */
  readonly label: string;
}

export interface PixaiResult {
  /** Always PNG, so the rest of the pipeline (moderation, optimize-art) is unchanged. */
  readonly png: Uint8Array;
  readonly width: number;
  readonly height: number;
  readonly taskId: string;
  readonly paidQuota: number;
  readonly latencyMs: number;
  readonly model: string;
}

function key(): string {
  const value = (process.env.PIXAI_API_KEY ?? '').trim().replace(/^["']|["']$/g, '');
  if (!value) throw new PixaiError('NO_KEY', 'PIXAI_API_KEY is not set (root .env).', true);
  return value;
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

async function call(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key()}`, ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...init.headers },
    signal: AbortSignal.timeout(60_000),
  });
}

function ledger(row: Record<string, string | number>): void {
  const cols = ['when', 'label', 'model', 'mode', 'size', 'paidQuota', 'seconds', 'status', 'task'];
  if (!existsSync(LEDGER)) writeFileSync(LEDGER, `${cols.join('\t')}\n`);
  appendFileSync(LEDGER, `${cols.map((c) => String(row[c] ?? '')).join('\t')}\n`);
}

/** Creates a task, backing off while the account's waiting queue is full. */
async function createTask(body: Record<string, unknown>): Promise<{ id: string; paidQuota: number }> {
  let transient = 0;
  const deadline = Date.now() + 30 * 60_000;
  for (;;) {
    let res: Response;
    try {
      res = await call('/image/create', { method: 'POST', body: JSON.stringify(body) });
    } catch (error) {
      if (++transient > 6) throw new PixaiError('NETWORK', String(error));
      await sleep(2_000 * transient);
      continue;
    }
    const text = await res.text();
    if (res.ok) {
      const json = JSON.parse(text) as { id: string; paidQuota?: number };
      return { id: json.id, paidQuota: json.paidQuota ?? 0 };
    }
    if (text.includes('WAITING_NUM_EXCEEDED')) {
      if (Date.now() > deadline) throw new PixaiError('WAITING_NUM_EXCEEDED', 'Queue stayed full for 30 minutes.');
      await sleep(4_000 + Math.random() * 4_000);
      continue;
    }
    if (text.includes('INSUFFICIENT_BALANCE')) throw new PixaiError('INSUFFICIENT_BALANCE', 'PixAI credits ran out.', true);
    if (text.includes('NSFW')) throw new PixaiError('NSFW_PROMPT_REJECTED', `Prompt refused: ${text.slice(0, 200)}`, true);
    if (res.status === 429 || res.status >= 500) {
      if (++transient > 6) throw new PixaiError(`HTTP_${res.status}`, text.slice(0, 200));
      await sleep(3_000 * transient);
      continue;
    }
    throw new PixaiError(`HTTP_${res.status}`, text.slice(0, 300), true);
  }
}

interface Task {
  status: string;
  paidQuota?: number;
  outputs?: { mediaUrls?: (string | null)[] };
}

async function waitForTask(id: string): Promise<Task> {
  const deadline = Date.now() + 20 * 60_000;
  let misses = 0;
  for (;;) {
    await sleep(2_000);
    try {
      const res = await call(`/task/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const task = (await res.json()) as Task;
      misses = 0;
      if (['completed', 'failed', 'cancelled'].includes(task.status)) return task;
    } catch (error) {
      if (++misses > 10) throw new PixaiError('POLL', `Lost task ${id}: ${String(error)}`);
    }
    if (Date.now() > deadline) throw new PixaiError('TIMEOUT', `Task ${id} did not finish in 20 minutes.`);
  }
}

export async function pixaiGenerate(req: PixaiRequest): Promise<PixaiResult> {
  const body: Record<string, unknown> = {
    modelVersionId: MODELS[req.model ?? 'tsubaki3'],
    prompt: req.prompt.slice(0, 10_000),
    negativePrompt: (req.negativePrompt ?? DEFAULT_NEGATIVE).slice(0, 4_096),
    width: req.width,
    height: req.height,
    batchSize: 1,
    mode: req.mode,
  };
  if (req.contextImages?.length) body.contextImages = req.contextImages.slice(0, 3);

  const t0 = Date.now();
  const created = await createTask(body);
  let task: Task;
  try {
    task = await waitForTask(created.id);
  } catch (error) {
    ledger({ when: new Date().toISOString(), label: req.label, model: req.model ?? 'tsubaki3', mode: req.mode, size: `${req.width}x${req.height}`, paidQuota: created.paidQuota, seconds: ((Date.now() - t0) / 1000).toFixed(1), status: 'lost', task: created.id });
    throw error;
  }
  const seconds = ((Date.now() - t0) / 1000).toFixed(1);
  const paidQuota = task.paidQuota ?? created.paidQuota;
  ledger({ when: new Date().toISOString(), label: req.label, model: req.model ?? 'tsubaki3', mode: req.mode, size: `${req.width}x${req.height}`, paidQuota, seconds, status: task.status, task: created.id });

  const url = task.outputs?.mediaUrls?.find(Boolean);
  if (task.status !== 'completed' || !url) {
    throw new PixaiError(`TASK_${task.status.toUpperCase()}`, `Task ${created.id} ended ${task.status} (failed tasks are refunded).`);
  }

  // Media is not kept forever on PixAI's side: download now.
  let bytes: Buffer | null = null;
  for (let attempt = 1; attempt <= 4 && !bytes; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      bytes = Buffer.from(await res.arrayBuffer());
    } catch (error) {
      if (attempt === 4) throw new PixaiError('DOWNLOAD', `Task ${created.id}: ${String(error)}`);
      await sleep(2_000 * attempt);
    }
  }
  const png = await sharp(bytes!).png().toBuffer();
  const meta = await sharp(png).metadata();
  return {
    png: new Uint8Array(png),
    width: meta.width ?? req.width,
    height: meta.height ?? req.height,
    taskId: created.id,
    paidQuota,
    latencyMs: Date.now() - t0,
    model: `pixai-${req.model ?? 'tsubaki3'}-${req.mode}`,
  };
}

/** Uploads a local image and returns its PixAI media id, for `contextImages`. */
export async function pixaiUpload(bytes: Uint8Array, contentType: string, ephemeral = false): Promise<string> {
  const slot = await call('/media/image/upload-url', { method: 'POST', body: JSON.stringify({ isEphemeral: ephemeral }) });
  if (!slot.ok) throw new PixaiError(`UPLOAD_URL_${slot.status}`, (await slot.text()).slice(0, 200));
  const { uploadUrl, externalId } = (await slot.json()) as { uploadUrl: string; externalId: string };
  const put = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': contentType }, body: bytes });
  if (!put.ok) throw new PixaiError(`UPLOAD_PUT_${put.status}`, (await put.text()).slice(0, 200));
  const reg = await call('/media/image/register', { method: 'POST', body: JSON.stringify({ externalId }) });
  if (!reg.ok) throw new PixaiError(`UPLOAD_REGISTER_${reg.status}`, (await reg.text()).slice(0, 200));
  const id = ((await reg.json()) as { id: string }).id;
  // A context image used before PixAI has processed it fails the task with
  // "input image moderation failed" (seen on the first opening panel). Wait
  // until the media record has its dimensions.
  for (let i = 0; i < 15; i++) {
    const res = await call(`/media/batch?ids=${id}`);
    const [media] = res.ok ? ((await res.json()) as { width?: number }[]) : [];
    if ((media?.width ?? 0) > 0) break;
    await sleep(2_000);
  }
  return id;
}

export function promptHash(prompt: string): string {
  return createHash('sha256').update(prompt).digest('hex').slice(0, 32);
}

/** The structural acceptance check generate-art applies to every asset (spec §19.5). */
export function structurallySound(png: Uint8Array): string | null {
  if (png.length < 4096) return 'Image is implausibly small; likely truncated.';
  if (!(png[0] === 0x89 && png[1] === 0x50 && png[2] === 0x4e && png[3] === 0x47)) return 'Payload is not a PNG.';
  return null;
}
