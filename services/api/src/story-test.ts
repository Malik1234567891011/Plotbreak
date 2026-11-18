/**
 * Who gets which half of the storyteller test. See
 * `packages/director/src/pure/story-test.ts` for what the halves do and
 * `docs/story-test.md` for how to read the result.
 *
 * Four equal groups, stable per player: control, yes, push, yes+push. So `yes`
 * is on for half of all players and `push` for an independent half, and each
 * is measured on everybody.
 *
 * A fifth group, `all-in` (added 2026-11-18), takes one player in five out of
 * those four with a separate hash, so nobody else changes group: yes + push +
 * the all-in brief, where nobody tells the player no. It is read against
 * everyone else, and the four groups are read without it.
 *
 * `PLOTBREAK_STORY_TEST`:
 *   unset / `on`  — the test runs, players split four ways
 *   `off`         — everybody gets the old storyteller, byte-identical (the revert)
 *   `control` | `yes` | `push` | `yes+push` | `all-in` — everybody gets that one (to ship a winner)
 */
import { createHash } from 'node:crypto';
import { CONTROL_ARM, type StoryTestArm } from '@plotbreak/director';

export type StoryTestArmName = 'control' | 'yes' | 'push' | 'yes+push' | 'all-in';

const ARMS: Record<StoryTestArmName, StoryTestArm> = {
  control: CONTROL_ARM,
  yes: { yes: true, push: false },
  push: { yes: false, push: true },
  'yes+push': { yes: true, push: true },
  'all-in': { yes: true, push: true, allIn: true },
};

const BY_BUCKET: readonly StoryTestArmName[] = ['control', 'yes', 'push', 'yes+push'];

/**
 * 0..3, stable per player. The same number in SQL:
 *   ('x' || substr(encode(sha256(convert_to('storytest:' || user_id, 'UTF8')), 'hex'), 1, 8))::bit(32)::bigint % 4
 */
export function storyTestBucket(userId: string): number {
  return createHash('sha256').update(`storytest:${userId}`).digest().readUInt32BE(0) % 4;
}

/**
 * True for one player in five, independent of the bucket. The same in SQL:
 *   ('x' || substr(encode(sha256(convert_to('storytest-allin:' || user_id, 'UTF8')), 'hex'), 1, 8))::bit(32)::bigint % 5 = 0
 */
export function storyTestAllIn(userId: string): boolean {
  return createHash('sha256').update(`storytest-allin:${userId}`).digest().readUInt32BE(0) % 5 === 0;
}

export function storyTestArmName(userId: string, env: NodeJS.ProcessEnv = process.env): StoryTestArmName {
  const raw = (env.PLOTBREAK_STORY_TEST ?? '').trim().toLowerCase();
  if (raw === 'off') return 'control';
  if (raw in ARMS) return raw as StoryTestArmName;
  if (storyTestAllIn(userId)) return 'all-in';
  return BY_BUCKET[storyTestBucket(userId)]!;
}

export function storyTestArmFor(userId: string, env: NodeJS.ProcessEnv = process.env): StoryTestArm {
  return ARMS[storyTestArmName(userId, env)];
}
