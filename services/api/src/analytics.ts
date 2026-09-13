import type { FastifyRequest } from 'fastify';
import { analyticsFor, type Analytics } from '@plotbreak/analytics';
import { CONTRACT_VERSION } from '@plotbreak/contracts';
import type { AppContext } from './context.js';
import type { UserRecord } from './repo/types.js';

/**
 * Spec §37 — the server half of the emitter.
 *
 * Roughly half the contract's events only the server can know (what a turn cost
 * to generate, whether a purchase verified) and roughly half only the client can
 * (what the player looked at, what they tapped). Both halves have to land on the
 * same person or the funnel has a hole in the middle of it, so the two sides
 * agree on one identity: the signed-in user id when there is one, and the
 * device's install id when there is not.
 */

/** The install id the client generates once and keeps. */
const DEVICE_HEADER = 'x-device-id';
const PLATFORM_HEADER = 'x-platform';
const VERSION_HEADER = 'x-app-version';

function header(request: FastifyRequest, name: string): string | null {
  const raw = request.headers[name];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && value.length > 0 ? value : null;
}

function platform(request: FastifyRequest): 'ios' | 'android' | 'web' {
  const declared = header(request, PLATFORM_HEADER);
  if (declared === 'ios' || declared === 'android' || declared === 'web') return declared;
  // The only shipping client is the iOS app, but guessing is still worse than
  // saying so: an unlabelled caller is something automated — smoke runs, curl,
  // a health check — and tagging those `ios` would quietly pad the numbers.
  return 'web';
}

/**
 * An emitter for this request.
 *
 * `user` is nullable because some tracked routes work signed out (§6.3). With
 * no user and no device header there is still an id — a per-request one — which
 * is useless for retention and correct for counting, and is far better than
 * dropping the event.
 */
export function tracker(
  ctx: AppContext,
  request: FastifyRequest,
  user: UserRecord | null,
  sessionId: string | null = null,
): Analytics {
  return analyticsFor(ctx.analytics, {
    anonymousId: header(request, DEVICE_HEADER) ?? user?.userId ?? `req_${request.id}`,
    userId: user?.userId ?? null,
    isGuest: user?.isGuest ?? true,
    sessionId,
    platform: platform(request),
    appVersion: header(request, VERSION_HEADER) ?? 'unknown',
    contractVersion: CONTRACT_VERSION,
    environment: ctx.config.environment,
  });
}

/**
 * An emitter for work that outlives the request that started it.
 *
 * A turn is accepted on one request and finishes minutes later on a background
 * promise, by which time the `FastifyRequest` is long gone. The route captures
 * the identity at accept time and hands it here, so `turn_completed` carries the
 * same device and app version as the `turn_submitted` it belongs to rather than
 * a second, emptier copy of them.
 */
export interface DetachedIdentity {
  readonly anonymousId: string;
  readonly userId: string | null;
  readonly isGuest: boolean;
  readonly platform: 'ios' | 'android' | 'web';
  readonly appVersion: string;
}

export function detach(request: FastifyRequest, user: UserRecord | null): DetachedIdentity {
  return {
    anonymousId: header(request, DEVICE_HEADER) ?? user?.userId ?? `req_${request.id}`,
    userId: user?.userId ?? null,
    isGuest: user?.isGuest ?? true,
    platform: platform(request),
    appVersion: header(request, VERSION_HEADER) ?? 'unknown',
  };
}

export function detachedTracker(
  ctx: AppContext,
  identity: DetachedIdentity,
  sessionId: string | null,
): Analytics {
  return analyticsFor(ctx.analytics, {
    ...identity,
    sessionId,
    contractVersion: CONTRACT_VERSION,
    environment: ctx.config.environment,
  });
}
