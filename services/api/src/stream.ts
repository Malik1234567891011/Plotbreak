import type { TurnStreamEvent, TurnStreamEventName } from '@plotbreak/contracts';

/**
 * Spec §17.9 — the SSE turn stream.
 *
 * The POST returns 202 immediately and processing continues in the background,
 * so a client that connects late (slow network, backgrounded app) must still
 * receive everything. Each turn therefore gets a buffer that is replayed on
 * subscribe before live events are tailed. Every event carries `turn_id` and a
 * monotonically increasing `sequence`, so a client can detect a gap.
 */

type Listener = (event: TurnStreamEvent) => void;

interface TurnStream {
  readonly turnId: string;
  readonly events: TurnStreamEvent[];
  readonly listeners: Set<Listener>;
  sequence: number;
  done: boolean;
  /** A frame was planned, so `turn.completed` is not the last event. */
  awaitingMedia: boolean;
  /** The turn has finished; only the frame is outstanding. */
  turnDone: boolean;
  /** Single-use token so a stream URL cannot be replayed by another client. */
  readonly token: string;
  readonly userId: string;
  createdAt: number;
}

/**
 * `turn.completed` is the end of the *turn*, which is not the end of the
 * stream.
 *
 * Art is enqueued during the turn and arrives seconds to a minute later, so
 * for any turn with a frame there is still one event to come after the turn is
 * done. This set used to include `turn.completed`, which set `done` and made
 * `emit` drop everything after it — so `media.completed` was discarded every
 * single time. The image was generated, written to the turn, and never
 * announced; players met it later by scrolling back past a beat they had
 * already finished reading.
 */
const TERMINAL: ReadonlySet<TurnStreamEventName> = new Set(['turn.failed']);

/** The end of the turn, which closes the stream only when no art is pending. */
const TURN_DONE: TurnStreamEventName = 'turn.completed';

/** Either of these is the last word on a frame, and therefore on the stream. */
const MEDIA_SETTLED: ReadonlySet<TurnStreamEventName> = new Set(['media.completed', 'media.failed']);

/** Completed streams are dropped after this, so a long-lived process stays bounded. */
const RETENTION_MS = 5 * 60 * 1000;

export class TurnStreamHub {
  readonly #streams = new Map<string, TurnStream>();

  /**
   * Tell the stream a frame is coming, so `turn.completed` does not close it.
   *
   * Called when the image job is enqueued, which is always before the turn
   * completes. Whoever calls this owes the stream a `media.completed` or a
   * `media.failed`, or the connection stays open until the client gives up.
   */
  expectMedia(turnId: string): void {
    const stream = this.#streams.get(turnId);
    if (stream) stream.awaitingMedia = true;
  }

  open(turnId: string, userId: string): { token: string } {
    const token = `st_${crypto.randomUUID()}`;
    this.#streams.set(turnId, {
      turnId,
      events: [],
      listeners: new Set(),
      sequence: 0,
      done: false,
      awaitingMedia: false,
      turnDone: false,
      token,
      userId,
      createdAt: Date.now(),
    });
    this.#sweep();
    return { token };
  }

  emit(
    turnId: string,
    event: TurnStreamEventName,
    data: Record<string, unknown>,
    sessionRevision?: number,
  ): void {
    const stream = this.#streams.get(turnId);
    if (!stream || stream.done) return;

    const payload: TurnStreamEvent = {
      event,
      turnId,
      sequence: stream.sequence++,
      sessionRevision: sessionRevision ?? null,
      final: false,
      data,
    };

    if (TERMINAL.has(event)) {
      stream.done = true;
    } else if (event === TURN_DONE) {
      stream.turnDone = true;
      // Only finished if nothing is still being drawn.
      stream.done = !stream.awaitingMedia;
    } else if (MEDIA_SETTLED.has(event)) {
      stream.awaitingMedia = false;
      // If the turn already completed, this was the one thing left.
      stream.done = stream.turnDone;
    }
    payload.final = stream.done;

    stream.events.push(payload);

    for (const listener of stream.listeners) {
      try {
        listener(payload);
      } catch {
        // A dead connection must not stop the others from being served.
      }
    }
  }

  /**
   * Replays what has already happened, then tails. Returns an unsubscribe
   * function and whether the turn had already finished.
   */
  subscribe(
    turnId: string,
    token: string,
    userId: string,
    listener: Listener,
  ): { ok: false; reason: 'NOT_FOUND' | 'FORBIDDEN' } | { ok: true; done: boolean; unsubscribe: () => void } {
    const stream = this.#streams.get(turnId);
    if (!stream) return { ok: false, reason: 'NOT_FOUND' };
    if (stream.token !== token || stream.userId !== userId) return { ok: false, reason: 'FORBIDDEN' };

    for (const event of stream.events) listener(event);
    if (stream.done) return { ok: true, done: true, unsubscribe: () => {} };

    stream.listeners.add(listener);
    return {
      ok: true,
      done: false,
      unsubscribe: () => stream.listeners.delete(listener),
    };
  }

  isDone(turnId: string): boolean {
    return this.#streams.get(turnId)?.done ?? true;
  }

  #sweep(): void {
    const cutoff = Date.now() - RETENTION_MS;
    for (const [turnId, stream] of this.#streams) {
      if (stream.done && stream.createdAt < cutoff && stream.listeners.size === 0) {
        this.#streams.delete(turnId);
      }
    }
  }
}

/** Serialises one event as an SSE frame. */
export function formatSse(event: TurnStreamEvent): string {
  return `event: ${event.event}\ndata: ${JSON.stringify(event)}\nid: ${event.sequence}\n\n`;
}
