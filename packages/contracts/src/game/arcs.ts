import { z } from 'zod';

/**
 * What a closed arc hands forward to every arc after it.
 *
 * The prose recap is for the player. This is for the model, and it is the part
 * that decides whether the feature works: a session that forgets it is married,
 * or who somebody's father was, is worse than an expensive one.
 *
 * Four lists rather than one blob, because they answer different questions and
 * the storyteller uses them differently. `established` is the one that must
 * never be contradicted; `open` is the one it may pull on.
 */
export const ArcCarry = z
  .object({
    /** Who the player now is: titles, trade, property, reputation, condition. */
    standing: z.array(z.string()).max(12).default([]),
    /** Each significant relationship as it currently stands, named. */
    bonds: z.array(z.string()).max(12).default([]),
    /** Facts the story has committed to and may not contradict later. */
    established: z.array(z.string()).max(20).default([]),
    /** Threads deliberately left unresolved, so they stay pullable. */
    open: z.array(z.string()).max(12).default([]),
  })
  .strict();
export type ArcCarry = z.infer<typeof ArcCarry>;

/** A stretch of story that has been closed and compacted. */
export const StoryArc = z
  .object({
    /** 1-based, in the order arcs closed. Arc 1 is the first stretch to end. */
    arcIndex: z.number().int().min(1),
    /** Short, in the story's language. Shown on the arc card. */
    title: z.string().min(1).max(80),
    /** Prose. The only part of this the player ever reads. */
    recap: z.string().min(1),
    carried: ArcCarry,
    fromTurn: z.number().int().min(0),
    toTurn: z.number().int().min(0),
  })
  .strict();
export type StoryArc = z.infer<typeof StoryArc>;

/**
 * What the model is asked to produce when an arc closes.
 *
 * Deliberately the same shape minus the bookkeeping the runtime already knows.
 */
export const ArcClosing = z
  .object({
    title: z.string().min(1).max(80),
    recap: z.string().min(1),
    carried: ArcCarry,
  })
  .strict();
export type ArcClosing = z.infer<typeof ArcClosing>;
