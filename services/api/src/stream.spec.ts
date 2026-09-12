import { describe, expect, it } from 'vitest';
import { TurnStreamHub } from './stream.js';
import type { TurnStreamEvent } from '@plotbreak/contracts';

/**
 * The stream has to outlive the turn.
 *
 * A hero frame is enqueued while the turn is being written and arrives forty
 * to sixty seconds later. `turn.completed` used to mark the stream finished,
 * so `emit` dropped everything after it and `media.completed` was discarded
 * every single time — the image was generated, written to the turn, and never
 * announced. Players met it by scrolling back past a beat they had already
 * read, which is indistinguishable from the app losing it.
 *
 * These hold the shape of the fix: the turn ending is not the stream ending
 * when art is outstanding, something always settles it, and the hub is the
 * only thing that decides.
 */
describe('a turn stream that is waiting for art', () => {
  const collect = (hub: TurnStreamHub, turnId: string, token: string, userId: string) => {
    const seen: TurnStreamEvent[] = [];
    const result = hub.subscribe(turnId, token, userId, (event) => seen.push(event));
    if (!result.ok) throw new Error(`subscribe failed: ${result.reason}`);
    return { seen, result };
  };

  it('delivers a frame that arrives after the turn is done', () => {
    const hub = new TurnStreamHub();
    const { token } = hub.open('turn_1', 'user_1');
    hub.expectMedia('turn_1');
    const { seen } = collect(hub, 'turn_1', token, 'user_1');

    hub.emit('turn_1', 'media.queued', { kind: 'HERO_IMAGE' });
    hub.emit('turn_1', 'turn.completed', { turnId: 'turn_1' });
    hub.emit('turn_1', 'media.completed', { kind: 'HERO_IMAGE', url: '/media/x.webp' });

    expect(seen.map((e) => e.event)).toEqual(['media.queued', 'turn.completed', 'media.completed']);
  });

  it('does not call the turn ending the end of the stream while art is pending', () => {
    const hub = new TurnStreamHub();
    const { token } = hub.open('turn_2', 'user_1');
    hub.expectMedia('turn_2');
    const { seen } = collect(hub, 'turn_2', token, 'user_1');

    hub.emit('turn_2', 'turn.completed', { turnId: 'turn_2' });
    // This is the flag the route closes the socket on.
    expect(seen.at(-1)?.final, 'turn.completed closed a stream still owed a frame').toBe(false);

    hub.emit('turn_2', 'media.completed', { kind: 'HERO_IMAGE', url: '/media/x.webp' });
    expect(seen.at(-1)?.final).toBe(true);
  });

  it('closes immediately when no art was ever planned', () => {
    // The common case: most beats do not earn a frame, and those streams must
    // not be held open for something that is never coming.
    const hub = new TurnStreamHub();
    const { token } = hub.open('turn_3', 'user_1');
    const { seen } = collect(hub, 'turn_3', token, 'user_1');

    hub.emit('turn_3', 'turn.completed', { turnId: 'turn_3' });
    expect(seen.at(-1)?.final).toBe(true);
  });

  it('closes on a failed frame, so a dead job cannot hold the socket open', () => {
    const hub = new TurnStreamHub();
    const { token } = hub.open('turn_4', 'user_1');
    hub.expectMedia('turn_4');
    const { seen } = collect(hub, 'turn_4', token, 'user_1');

    hub.emit('turn_4', 'turn.completed', { turnId: 'turn_4' });
    expect(seen.at(-1)?.final).toBe(false);

    hub.emit('turn_4', 'media.failed', { kind: 'HERO_IMAGE', reason: 'NO_IMAGE' });
    expect(seen.at(-1)?.final).toBe(true);
  });

  it('closes on a failed turn regardless of what art was promised', () => {
    const hub = new TurnStreamHub();
    const { token } = hub.open('turn_5', 'user_1');
    hub.expectMedia('turn_5');
    const { seen } = collect(hub, 'turn_5', token, 'user_1');

    hub.emit('turn_5', 'turn.failed', { code: 'WRITER_FAILED' });
    expect(seen.at(-1)?.final).toBe(true);
    // And nothing gets through afterwards.
    hub.emit('turn_5', 'media.completed', { kind: 'HERO_IMAGE', url: '/media/x.webp' });
    expect(seen).toHaveLength(1);
  });

  it('replays the whole sequence to somebody who joins late', () => {
    // A client that reconnects mid-turn has to be able to catch up, including
    // on the frame, or a dropped connection loses the art permanently.
    const hub = new TurnStreamHub();
    const { token } = hub.open('turn_6', 'user_1');
    hub.expectMedia('turn_6');
    hub.emit('turn_6', 'media.queued', { kind: 'HERO_IMAGE' });
    hub.emit('turn_6', 'turn.completed', { turnId: 'turn_6' });
    hub.emit('turn_6', 'media.completed', { kind: 'HERO_IMAGE', url: '/media/x.webp' });

    const { seen, result } = collect(hub, 'turn_6', token, 'user_1');
    expect(seen.map((e) => e.event)).toEqual(['media.queued', 'turn.completed', 'media.completed']);
    expect(result.ok && result.done, 'a finished stream should report itself finished').toBe(true);
  });
});
