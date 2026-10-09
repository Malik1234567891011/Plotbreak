/** Candidate steering notes, keyed by probe condition. `base` sends none. */
export const NOTES: Record<string, string | undefined> = {
  base: undefined,

  // Conditional: the model decides whether the story has gone quiet.
  pressure: [
    '',
    'LOOK BACK OVER THE RECENT BEATS. If, for a long stretch, nothing from outside the player\'s own plans',
    'has pushed on the story — no thread under "Still open", and none of this world\'s pressures, has moved',
    'on the page — then in this beat let one of them reach the player: somebody arrives, something is found,',
    'word comes, a cost comes due. Carry out the player\'s action first and keep their scene; the thread',
    'arrives into it, it does not replace it. Do not resolve it and do not explain it. If a thread is',
    'already in motion, ignore this note. One of the three suggestions offers a way to follow it.',
  ].join('\n'),

  // Unconditional, as an upper bound on what a note can do.
  push: [
    '',
    'THE WORLD MOVES THIS BEAT. Carry out the player\'s action first and keep their scene. Then let one',
    'unresolved thread — from "Still open", or one of this world\'s pressures — reach the player from',
    'outside their plans: somebody arrives, something is found, word comes, a cost comes due. Do not',
    'resolve it and do not explain it. One of the three suggestions offers a way to follow it.',
  ].join('\n'),

  // Unconditional, with the thread chosen by code and named. `{thread}` is
  // filled in by the caller.
  named: [
    '',
    'THE WORLD MOVES THIS BEAT. Carry out the player\'s action first and keep their scene. Then let this',
    'unresolved thread reach the player from outside their plans — somebody tied to it arrives, word of it',
    'comes, something connected to it turns up, a cost from it comes due:',
    '"{thread}"',
    'It arrives at the edge of the scene; it does not replace it. Do not resolve it and do not explain it.',
    'One of the three suggestions offers a way to follow it.',
  ].join('\n'),

  // For the first beats after an arc break.
  opening: [
    '',
    'A NEW ARC HAS BEGUN. The last one ended at a resting point; this one does not stay there. Over the',
    'next few beats, let ONE thread from "Still open" come back onto the page from outside the player\'s',
    'plans — somebody arrives, word reaches them, a consequence of something left unresolved lands.',
    'Carry out the player\'s action first; the thread arrives at the edge of their scene, it does not',
    'replace it. Do not resolve it and do not explain that it is happening. One of the three',
    'suggestions offers a way to follow it.',
  ].join('\n'),
};
