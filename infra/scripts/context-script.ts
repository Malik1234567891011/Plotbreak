/**
 * The fixed player script every context arm plays.
 *
 * Identical text on every arm, so the arms are not quietly testing different
 * random branches of the story (the alternative — a card-tapping player — makes
 * each arm follow whatever cards its own run produced, and then a token curve
 * is comparing two different stories).
 *
 * Four facts are planted early and asked about again at increasing depth. The
 * bar is semantic continuity, not verbatim recall: "most of four thousand"
 * passes where "a few hundred" does not.
 */

/** Facts planted at a fixed turn, each one specific enough to be checkable. */
const PLANTS: Record<number, string> = {
  2: 'I dig the rusted tin can out from under the floorboard and count the money out loud in front of Sabo and Luffy. Four thousand one hundred berries. I say the number twice so they both hear it.',
  4: 'I carve a mark into the big fig tree by the ravine — three straight lines and then a circle around them — and tell them this means the spot belongs to us now.',
  6: 'I tell Sabo that my mother’s name was Portgas D. Rouge, and that I have never once said it out loud to anybody before today.',
  24: 'I trade my lead pipe to Luffy for his cracked wooden sword, and I tell him the swap is permanent and there is no taking it back.',
};

/** Probes, and how far back the thing they ask about was planted. */
const PROBES: Array<{ at: number; depth: 'RECENT' | 'MEDIUM' | 'OLD'; text: string }> = [
  { at: 9, depth: 'RECENT', text: 'I ask Sabo how much money is in the can, exactly.' },
  { at: 11, depth: 'RECENT', text: 'I go back to the tree I carved and check the mark is still there the way I left it.' },
  { at: 39, depth: 'MEDIUM', text: 'I ask Sabo how much money is in the can, exactly.' },
  { at: 41, depth: 'MEDIUM', text: 'I go back to the tree I carved and check the mark is still there the way I left it.' },
  { at: 43, depth: 'MEDIUM', text: 'I ask Sabo whether he remembers the name I told him, the one I said I had never told anyone.' },
  { at: 79, depth: 'OLD', text: 'I ask Sabo how much money is in the can, exactly.' },
  { at: 81, depth: 'OLD', text: 'I go back to the tree I carved and check the mark is still there the way I left it.' },
  { at: 83, depth: 'MEDIUM', text: 'I ask Luffy what he is carrying right now, and whether he still has the thing we swapped.' },
  { at: 119, depth: 'OLD', text: 'I ask Sabo how much money is in the can, exactly.' },
  { at: 121, depth: 'OLD', text: 'I ask Sabo whether he remembers the name I told him, the one I said I had never told anyone.' },
  { at: 123, depth: 'OLD', text: 'I ask Luffy what he is carrying right now, and whether he still has the thing we swapped.' },
  { at: 155, depth: 'OLD', text: 'I go back to the tree I carved and check the mark is still there the way I left it.' },
  { at: 157, depth: 'OLD', text: 'I ask Luffy what he is carrying right now, and whether he still has the thing we swapped.' },
  { at: 159, depth: 'OLD', text: 'I ask Sabo how much money is in the can, exactly.' },
];

/** Ordinary play. Deliberately varied in shape, none of it state-dependent. */
const POOL: string[] = [
  'I tell Sabo we should head up to the treehouse before it gets dark.',
  'I throw a rock at the tree across the clearing and tell Luffy to beat it.',
  'I ask Sabo what he thinks we should do about the bandits.',
  'I sit down and eat, and I do not say anything for a while.',
  'I go looking for something worth taking down by the river.',
  'I tell Luffy to stop following me so close.',
  'I climb as high up the tree as the branches will hold me.',
  'I ask Sabo where he learned to talk like that.',
  'I pick a fight with the biggest thing I can find out here.',
  'I tell them both I am going to be stronger than either of them one day.',
  'I check the traps we set on the far side of the slope.',
  'I ask Luffy what he wants to be when he is older.',
  'I head down toward Dadan’s house to see who is home.',
  'I steal food from wherever it is easiest and bring it back.',
  'I tell Sabo something is bothering me but I do not want to say what.',
  'I race Luffy to the flat rock and do not let him win.',
  'I look out at the sea from the highest point I can reach.',
  'I ask Sabo if he ever thinks about leaving this island.',
  'I punch the trunk until my knuckles split, and keep going.',
  'I tell Luffy a lie about what is down the other path.',
  'I listen for whoever has been walking around below us.',
  'I share out what we took and make sure Luffy gets less.',
  'I tell Sabo I am not going back tonight.',
  'I sharpen a stick into something I could actually use.',
  'I ask them both what they would do if I disappeared tomorrow.',
  'I go and sit where nobody will find me for a while.',
];

const PROBE_AT = new Map(PROBES.map((p) => [p.at, p]));

export function SCRIPT(i: number): string {
  const probe = PROBE_AT.get(i);
  if (probe) return probe.text;
  const plant = PLANTS[i];
  if (plant) return plant;
  return POOL[i % POOL.length]!;
}

export function isProbe(i: number): 'RECENT' | 'MEDIUM' | 'OLD' | null {
  return PROBE_AT.get(i)?.depth ?? null;
}

export const PLANTED = PLANTS;
export const PROBE_LIST = PROBES;
