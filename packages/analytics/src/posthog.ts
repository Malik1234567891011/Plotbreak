import { PostHog } from 'posthog-node';
import type { AnalyticsEvent, AnalyticsSink, BaseProperties, EventName } from './index.js';

/**
 * Spec §37 — the production sink.
 *
 * `packages/analytics/src/index.ts` decides *what* an event is; this file only
 * decides how it reaches PostHog. Nothing here may add a property the contract
 * does not declare, because a property that exists in one sink and not another
 * is how a dashboard starts lying.
 */

export interface PostHogSinkOptions {
  readonly apiKey: string;
  /** Defaults to PostHog Cloud US, which is where the Plotbreak project lives. */
  readonly host?: string;
  /**
   * Events buffered before a send. The SDK also flushes on a timer, so this is
   * a batching hint and not a delivery deadline.
   */
  readonly flushAt?: number;
  readonly flushIntervalMs?: number;
}

/**
 * Turns a contract event into a PostHog capture.
 *
 * The SDK already batches to memory and sends on a background timer, so
 * `capture` here is a queue push and nothing more — it does no I/O, and cannot
 * put a network round trip on the path of a turn (§17.8).
 */
export class PostHogSink implements AnalyticsSink {
  readonly #client: PostHog;

  constructor(options: PostHogSinkOptions) {
    this.#client = new PostHog(options.apiKey, {
      host: options.host ?? 'https://us.i.posthog.com',
      flushAt: options.flushAt ?? 20,
      flushInterval: options.flushIntervalMs ?? 10_000,
      // The server's IP is the server's, not the player's. Left on, every
      // event would be geolocated to whichever region the API happens to run
      // in, and "players by country" would be a chart of our own deploys.
      disableGeoip: true,
      // No flag polling and no exception autocapture: this process emits
      // product events and nothing else, and both of those open background
      // network work we did not ask for.
      enableExceptionAutocapture: false,
    });
  }

  capture<K extends EventName>(event: AnalyticsEvent<K>): void {
    this.#client.capture({
      distinctId: distinctId(event.base),
      event: event.name,
      properties: toProperties(event),
      // The event's own clock, not the ingest clock. A turn that finished
      // during a queue backlog belongs at the minute it happened.
      timestamp: new Date(event.base.occurredAt),
    });
  }

  /**
   * Spec §6.5 — the guest and the account they became are one person.
   *
   * Without this the funnel breaks exactly where it matters: everything before
   * sign-in belongs to `guest_…` and everything after to the real id, so no
   * retention or conversion query can see across the moment a player committed.
   */
  aliasGuest(guestId: string, userId: string): void {
    this.#client.alias({ distinctId: userId, alias: guestId });
  }

  flush(): Promise<void> {
    return this.#client.flush();
  }

  /** Drains the buffer and stops the timer. Called on process shutdown. */
  async shutdown(timeoutMs = 5_000): Promise<void> {
    await this.#client._shutdown(timeoutMs);
  }
}

/**
 * Who the event belongs to.
 *
 * The install id is the fallback rather than the default, so a signed-in
 * player's events are not split across their devices. A guest's `userId` is
 * their guest id, which is stable for as long as the guest exists and is what
 * `aliasGuest` later merges away.
 */
function distinctId(base: BaseProperties): string {
  return base.userId ?? base.anonymousId;
}

/**
 * Flattens the contract's two levels into PostHog's one.
 *
 * Base properties are prefixed so a per-event property can never shadow one —
 * `turn_completed.platform` would otherwise silently overwrite the device it
 * came from, and nobody would notice until a breakdown looked wrong.
 */
function toProperties(event: AnalyticsEvent): Record<string, unknown> {
  const { base } = event;
  return {
    ...event.properties,
    // PostHog's own names, so its UI groups these without configuration.
    $app_version: base.appVersion,
    $os: base.platform,
    // Ours, prefixed.
    pb_platform: base.platform,
    pb_environment: base.environment,
    pb_contract_version: base.contractVersion,
    pb_is_guest: base.isGuest,
    pb_anonymous_id: base.anonymousId,
    pb_session_id: base.sessionId,
  };
}
