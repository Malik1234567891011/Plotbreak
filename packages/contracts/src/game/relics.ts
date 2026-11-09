/**
 * Relics — collectible items that drop from moments inside a story.
 *
 * The split that makes this work: **the storyteller says what happened, the
 * server rolls the dice.** Each story authors a handful of moments ("the player
 * reaches the sea cave") and the storyteller reports a moment's id the turn it
 * happens on the page, exactly the way it already reports finished quests. The
 * server then rolls that moment's drop table once. The model never chooses an
 * item and never knows the odds, so it cannot hand out a Mythic to be nice, and
 * a relic always fits the scene it came from because the moment is the scene.
 *
 * A moment can drop at most once per run. Nothing stops a player replaying the
 * story for a better roll, which is the point.
 *
 * `chance` is the probability that this relic drops when its moment happens.
 * The chances on one moment sum to at most 1 and the remainder is "nothing".
 * That is the number the collection screen shows, because it is the honest one:
 * the odds of reaching the moment at all depend on how the player plays.
 */

export const RELIC_RARITIES = ['COMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'] as const;
export type RelicRarity = (typeof RELIC_RARITIES)[number];

/** Roughly where in a run the moment tends to come. A hint, never a promise. */
export type RelicTiming = 'EARLY' | 'MID' | 'LATE' | 'ENDING';

export interface RelicMoment {
  readonly id: string;
  readonly storyId: string;
  readonly timing: RelicTiming;
  /** For the storyteller: exactly what has to happen on the page. Never shown to players. */
  readonly when: string;
  /** For the player: a cryptic pointer that does not spoil the story. */
  readonly hint: string;
}

export interface RelicDef {
  readonly id: string;
  readonly storyId: string;
  readonly momentId: string;
  readonly name: string;
  readonly rarity: RelicRarity;
  /** The line on the back of the card. */
  readonly flavor: string;
  /** Drop chance when the moment happens, 0..1. */
  readonly chance: number;
  /** Bundled art, served under the media CDN. */
  readonly imageKey: string;
  /** What the art was generated from. Kept beside the item so a redraw matches it. */
  readonly artPrompt: string;
}

const img = (id: string) => `relics/${id}.webp`;

// ---------------------------------------------------------------------------
// Pink Tide — a resort island, a pink bioluminescent tide, a missing man.
// ---------------------------------------------------------------------------

const PT = 'story_pink_tide';

const PINK_TIDE_MOMENTS: RelicMoment[] = [
  {
    id: 'pt_pulled_in',
    storyId: PT,
    timing: 'EARLY',
    when: 'The player lets Sora pull them into the week: they say yes to hearing her "something weird", splash her back, take the drink, or get in the pool with her. The first time they go along with her, not every time.',
    hint: 'Let paradise pull you in.',
  },
  {
    id: 'pt_the_bag',
    storyId: PT,
    timing: 'EARLY',
    when: "The player physically finds, opens or gets their hands on Adrian Vale's blue equipment bag.",
    hint: 'Some luggage never checks out.',
  },
  {
    id: 'pt_glowing_tide',
    storyId: PT,
    timing: 'MID',
    when: 'The player sees, wades into or swims in the glowing pink bioluminescent water at night.',
    hint: 'Some nights the sea blushes.',
  },
  {
    id: 'pt_rooftop',
    storyId: PT,
    timing: 'MID',
    when: 'The player spends a night at the Rooftop Bar — drinks, the party, or a real conversation with June behind the bar.',
    hint: 'Eleven floors up, everyone talks eventually.',
  },
  {
    id: 'pt_sea_cave',
    storyId: PT,
    timing: 'LATE',
    when: 'The player goes inside the sea cave at East Cove.',
    hint: 'Ninety minutes either side of low tide.',
  },
  {
    id: 'pt_adrian_alive',
    storyId: PT,
    timing: 'LATE',
    when: 'Adrian Vale is found alive and brought off the ledge, with the player there for it.',
    hint: 'Nobody checks out of this place for real.',
  },
  {
    id: 'pt_paradise_saved',
    storyId: PT,
    timing: 'ENDING',
    when: 'The story reaches the Paradise Saved ending: the truth is out, the caves get cleaned, the expansion stops, and the resort survives.',
    hint: 'Save all of it. Every last part.',
  },
  {
    id: 'pt_checkout',
    storyId: PT,
    timing: 'ENDING',
    when: 'The player leaves the island — boards the ferry home — or the story reaches any ending.',
    hint: 'Every week ends at the ferry.',
  },
];

const PINK_TIDE_RELICS: RelicDef[] = [
  {
    id: 'pt_sunset_shades',
    storyId: PT,
    momentId: 'pt_pulled_in',
    name: 'Golden Hour Shades',
    rarity: 'COMMON',
    chance: 0.45,
    flavor: 'Nine hundred yen at the gift shop. Priceless at 6:40 PM.',
    imageKey: img('pt_sunset_shades'),
    artPrompt:
      'heart-shaped rose-gold sunglasses with pink-to-orange gradient lenses that reflect a tiny tropical sunset and palm silhouettes, a few water droplets on the frame',
  },
  {
    id: 'pt_comet_clip',
    storyId: PT,
    momentId: 'pt_pulled_in',
    name: 'Strawberry Comet Clip',
    rarity: 'RARE',
    chance: 0.25,
    flavor: 'Sora owns six. She noticed the second this one went missing.',
    imageKey: img('pt_comet_clip'),
    artPrompt:
      'a star-shaped bubblegum-pink resin hair clip with a trailing comet tail of pink glitter and tiny pearls, playful and sparkling',
  },
  {
    id: 'pt_bubblegum_prism',
    storyId: PT,
    momentId: 'pt_pulled_in',
    name: 'Bubblegum Prism',
    rarity: 'EPIC',
    chance: 0.08,
    flavor: 'Hold it up to the sun and your hair remembers the colour. Forever.',
    imageKey: img('pt_bubblegum_prism'),
    artPrompt:
      'a faceted floating gemstone in vivid bubblegum pink, light refracting into a pink rainbow, wisps of pink hair-like ribbons curling around it, magical',
  },
  {
    id: 'pt_polaroid',
    storyId: PT,
    momentId: 'pt_the_bag',
    name: 'Waterlogged Polaroid',
    rarity: 'COMMON',
    chance: 0.4,
    flavor: 'Taken at 11:38 PM on the cliff path. Somebody wanted it lost.',
    imageKey: img('pt_polaroid'),
    artPrompt:
      'a sea-warped instant photograph with curled water-stained edges showing a dark cliff path at night and a blurred figure, tucked under a small seashell',
  },
  {
    id: 'pt_dive_watch',
    storyId: PT,
    momentId: 'pt_the_bag',
    name: 'Dive Watch 23:40',
    rarity: 'RARE',
    chance: 0.18,
    flavor: 'Water-resistant to three hundred metres. Stopped at twenty to midnight.',
    imageKey: img('pt_dive_watch'),
    artPrompt:
      'a chunky orange diving watch with a cracked sapphire crystal, hands frozen at 23:40, salt crust on the bezel, a faint eerie teal glow from the dial',
  },
  {
    id: 'pt_directors_cut',
    storyId: PT,
    momentId: 'pt_the_bag',
    name: "The Director's Cut",
    rarity: 'EPIC',
    chance: 0.06,
    flavor: 'Forty-one minutes of footage nobody was supposed to see.',
    imageKey: img('pt_directors_cut'),
    artPrompt:
      'a cracked camera memory card wrapped in film-strip ribbon, a pulsing red recording light glowing on it, tiny holographic frames of a night cliff floating off it',
  },
  {
    id: 'pt_bottled_tide',
    storyId: PT,
    momentId: 'pt_glowing_tide',
    name: 'Bottled Tide',
    rarity: 'COMMON',
    chance: 0.45,
    flavor: 'Shake it and it glows. Leave it alone and it sulks.',
    imageKey: img('pt_bottled_tide'),
    artPrompt:
      'a small corked glass bottle filled with glowing magenta bioluminescent seawater, swirling light inside, a twine tag around the neck, droplets of pink light',
  },
  {
    id: 'pt_moonjelly',
    storyId: PT,
    momentId: 'pt_glowing_tide',
    name: 'Moonjelly Charm',
    rarity: 'RARE',
    chance: 0.15,
    flavor: 'Swam into your hand and decided to stay.',
    imageKey: img('pt_moonjelly'),
    artPrompt:
      'a translucent glass jellyfish charm on a thin silver chain, its bell glowing soft pink and violet, delicate trailing tentacles of light',
  },
  {
    id: 'pt_heart_of_tide',
    storyId: PT,
    momentId: 'pt_glowing_tide',
    name: 'Heart of the Pink Tide',
    rarity: 'LEGENDARY',
    chance: 0.02,
    flavor: 'The cove has a heartbeat. You are holding it.',
    imageKey: img('pt_heart_of_tide'),
    artPrompt:
      'a luminous living pearl the size of a fist, glowing rose-magenta from within like bioluminescent sea water, cradled in a curl of pale coral and seafoam, tiny pink light motes drifting off it',
  },
  {
    id: 'pt_last_sunset',
    storyId: PT,
    momentId: 'pt_rooftop',
    name: 'The Last Sunset',
    rarity: 'COMMON',
    chance: 0.5,
    flavor: "June's off-menu special. Order it twice and she starts asking questions.",
    imageKey: img('pt_last_sunset'),
    artPrompt:
      'an elegant coupe cocktail glass with a layered gradient drink from gold to hot pink to violet, a tiny paper umbrella and a sugared hibiscus flower on the rim, glowing softly',
  },
  {
    id: 'pt_truth_shaker',
    storyId: PT,
    momentId: 'pt_rooftop',
    name: 'Truth Serum Shaker',
    rarity: 'RARE',
    chance: 0.15,
    flavor: 'Two parts gin. One part whatever you were about to lie about.',
    imageKey: img('pt_truth_shaker'),
    artPrompt:
      'a dented polished silver cocktail shaker engraved with a crescent moon and stars, a faint violet mist curling out of the cap, a bar pencil beside it',
  },
  {
    id: 'pt_barrel_seal',
    storyId: PT,
    momentId: 'pt_sea_cave',
    name: 'Barrel Seal No. 4',
    rarity: 'RARE',
    chance: 0.25,
    flavor: 'Eight years under the sea. Still leaking.',
    imageKey: img('pt_barrel_seal'),
    artPrompt:
      'a rusted round steel barrel cap with a corroded hazard symbol and the number 4 stencilled on it, barnacles and pink coral growing on the rim, a sickly toxic green glow seeping from the seam',
  },
  {
    id: 'pt_tideglass_compass',
    storyId: PT,
    momentId: 'pt_sea_cave',
    name: 'Tideglass Compass',
    rarity: 'EPIC',
    chance: 0.1,
    flavor: 'It does not point north. It points at whatever the sea is hiding.',
    imageKey: img('pt_tideglass_compass'),
    artPrompt:
      'an ornate antique brass compass with a glass dome full of swirling glowing seawater instead of a dial, a needle made of pink coral, engraved waves on the casing',
  },
  {
    id: 'pt_abyss_helm',
    storyId: PT,
    momentId: 'pt_sea_cave',
    name: 'Abyssal Diver’s Helm',
    rarity: 'LEGENDARY',
    chance: 0.03,
    flavor: 'Whoever wore it last went deeper than the cave goes.',
    imageKey: img('pt_abyss_helm'),
    artPrompt:
      'an antique brass deep-sea diving helmet encrusted with pink coral and pearls, its round portholes glowing bright magenta from inside, seaweed and tiny bubbles around it, majestic',
  },
  {
    id: 'pt_lifeline',
    storyId: PT,
    momentId: 'pt_adrian_alive',
    name: 'Lifeline',
    rarity: 'EPIC',
    chance: 0.25,
    flavor: 'Four metres of rope and four days of pure stubbornness.',
    imageKey: img('pt_lifeline'),
    artPrompt:
      'a coil of frayed bright orange climbing rope braided with a seashell talisman and a carabiner, glowing threads of golden light woven through it, heroic',
  },
  {
    id: 'pt_crown_of_tide',
    storyId: PT,
    momentId: 'pt_paradise_saved',
    name: 'Crown of the Pink Tide',
    rarity: 'MYTHIC',
    chance: 0.1,
    flavor: 'The island chose a keeper. It chose you.',
    imageKey: img('pt_crown_of_tide'),
    artPrompt:
      'a radiant crown made of living pink coral, mother-of-pearl and liquid bioluminescent water frozen mid-splash, crowned with a glowing magenta pearl, prismatic iridescent light, the most majestic item imaginable',
  },
  {
    id: 'pt_ferry_ticket',
    storyId: PT,
    momentId: 'pt_checkout',
    name: 'One-Way Ferry Ticket',
    rarity: 'COMMON',
    chance: 0.6,
    flavor: 'Admit one. Sunday, 9:00 AM. No refunds, no regrets.',
    imageKey: img('pt_ferry_ticket'),
    artPrompt:
      'a vintage pastel pink and teal ferry ticket with a punched hole and a tiny printed wave and island emblem, slightly sun-faded, a pressed hibiscus petal resting on it, no readable text',
  },
];

// ---------------------------------------------------------------------------
// Second Skin — one body, one animal shape, chosen at sixteen.
// ---------------------------------------------------------------------------

const SS = 'story_second_skin';

const SECOND_SKIN_MOMENTS: RelicMoment[] = [
  {
    id: 'ss_choosing',
    storyId: SS,
    timing: 'EARLY',
    when: 'The player puts their hand on the Heartstone at the Choosing and picks a shape, or deliberately refuses to.',
    hint: 'Ninety seconds that last a lifetime.',
  },
  {
    id: 'ss_kaia_falls',
    storyId: SS,
    timing: 'EARLY',
    when: 'Kaia comes through the window into the hall and the player gets close to her in the chaos — helps her, blocks her, talks to her, or picks up something she dropped.',
    hint: 'Some guests arrive through the ceiling.',
  },
  {
    id: 'ss_undercroft',
    storyId: SS,
    timing: 'MID',
    when: 'The player gets into the Undercroft beneath the Heartstone Hall, or lays eyes on the Ledger itself.',
    hint: 'Seven hundred years of records, under your feet.',
  },
  {
    id: 'ss_second_stirs',
    storyId: SS,
    timing: 'MID',
    when: 'The player feels a second shape stirring in their own body — a dream of another body, an instinct that is not theirs, or a physical change they did not choose.',
    hint: 'One body holds one shape. Usually.',
  },
  {
    id: 'ss_ward_seven',
    storyId: SS,
    timing: 'LATE',
    when: 'The player reaches Secondary Echo Ward Seven under the capital.',
    hint: 'Thirty-one rooms nobody visits.',
  },
  {
    id: 'ss_edran',
    storyId: SS,
    timing: 'LATE',
    when: 'The player confronts Edran Sol, the High Keeper, face to face and hears his real argument.',
    hint: 'Ask the man with the golden antlers.',
  },
  {
    id: 'ss_twiceborn',
    storyId: SS,
    timing: 'ENDING',
    when: 'The story reaches the Twiceborn ending: the player lives with two shapes, integrated.',
    hint: 'Become what nobody is allowed to be.',
  },
  {
    id: 'ss_any_ending',
    storyId: SS,
    timing: 'ENDING',
    when: 'The story reaches any ending.',
    hint: 'Every road leads somewhere.',
  },
];

const SECOND_SKIN_RELICS: RelicDef[] = [
  {
    id: 'ss_choosing_cord',
    storyId: SS,
    momentId: 'ss_choosing',
    name: 'Choosing Cord',
    rarity: 'COMMON',
    chance: 0.45,
    flavor: 'Tied on at sixteen. Most people never take it off.',
    imageKey: img('ss_choosing_cord'),
    artPrompt:
      'a braided bracelet cord of silver and leaf-green thread with a carved bone bead shaped like a tiny animal paw, softly glowing amber knot',
  },
  {
    id: 'ss_heartstone_shard',
    storyId: SS,
    momentId: 'ss_choosing',
    name: 'Heartstone Shard',
    rarity: 'RARE',
    chance: 0.2,
    flavor: 'Still warm. Still deciding what you are.',
    imageKey: img('ss_heartstone_shard'),
    artPrompt:
      'a jagged shard of living stone, dark grey on the outside with veins of pulsing warm amber light inside like a heartbeat, faint animal silhouettes flickering in the glow',
  },
  {
    id: 'ss_beastmark_eye',
    storyId: SS,
    momentId: 'ss_choosing',
    name: 'Beastmark Iris',
    rarity: 'EPIC',
    chance: 0.07,
    flavor: 'Look into it long enough and your pupils go slit and gold.',
    imageKey: img('ss_beastmark_eye'),
    artPrompt:
      "a polished gold cat's-eye gemstone with a vertical slit pupil that seems alive, set in a claw-shaped silver setting, glowing golden aura",
  },
  {
    id: 'ss_mirror_of_shapes',
    storyId: SS,
    momentId: 'ss_choosing',
    name: 'Mirror of a Thousand Shapes',
    rarity: 'LEGENDARY',
    chance: 0.02,
    flavor: 'Every animal you could have been is still in there, waiting.',
    imageKey: img('ss_mirror_of_shapes'),
    artPrompt:
      'an ornate antique hand mirror framed in twisting silver antlers and feathers, its glass showing glowing silhouettes of a wolf, a hawk, a fox and a snow leopard overlapping in starlight',
  },
  {
    id: 'ss_raven_feather',
    storyId: SS,
    momentId: 'ss_kaia_falls',
    name: 'Raven Feather',
    rarity: 'COMMON',
    chance: 0.45,
    flavor: 'It fell from her arm. She is not supposed to have feathers.',
    imageKey: img('ss_raven_feather'),
    artPrompt:
      'a single glossy black raven feather with an iridescent blue-violet sheen, drifting, a few tiny snowflakes around it',
  },
  {
    id: 'ss_warden_badge',
    storyId: SS,
    momentId: 'ss_kaia_falls',
    name: 'Broken Roadwarden Badge',
    rarity: 'RARE',
    chance: 0.18,
    flavor: 'Snapped clean through. So was her oath.',
    imageKey: img('ss_warden_badge'),
    artPrompt:
      'a navy enamel and gold military badge shaped like a shield with a road and star emblem, snapped cleanly in two, the halves slightly apart, scratched and battle-worn',
  },
  {
    id: 'ss_snowcat_cuff',
    storyId: SS,
    momentId: 'ss_kaia_falls',
    name: 'Snowcat Earcuff',
    rarity: 'EPIC',
    chance: 0.06,
    flavor: 'Wear it and people swear they can see the ears.',
    imageKey: img('ss_snowcat_cuff'),
    artPrompt:
      'an elegant silver ear cuff shaped like a rounded snow-leopard ear with black rosette enamel spots and a tiny dangling black feather, frosty white glow',
  },
  {
    id: 'ss_ledger_leaf',
    storyId: SS,
    momentId: 'ss_undercroft',
    name: 'Leaf from the Ledger',
    rarity: 'RARE',
    chance: 0.22,
    flavor: 'Page four hundred and twelve. The one about people like you.',
    imageKey: img('ss_ledger_leaf'),
    artPrompt:
      'an ancient torn vellum page with glowing teal runic ink diagrams of two overlapping animal silhouettes, a broken wax seal at the corner, dust motes',
  },
  {
    id: 'ss_undercroft_lantern',
    storyId: SS,
    momentId: 'ss_undercroft',
    name: 'Undercroft Lantern',
    rarity: 'EPIC',
    chance: 0.08,
    flavor: 'The flame inside used to be somebody’s second shape.',
    imageKey: img('ss_undercroft_lantern'),
    artPrompt:
      'a black wrought-iron lantern with a caged ghostly blue-white spirit flame shaped like a small fox curled inside, chains, eerie and beautiful',
  },
  {
    id: 'ss_century_key',
    storyId: SS,
    momentId: 'ss_undercroft',
    name: 'Seven-Century Key',
    rarity: 'LEGENDARY',
    chance: 0.03,
    flavor: 'It opens one door. That door opens everything.',
    imageKey: img('ss_century_key'),
    artPrompt:
      'a huge ornate bronze skeleton key whose bow is a ring of interlocking animal heads — wolf, hawk, stag, fox — with glowing amber runes running down the shaft',
  },
  {
    id: 'ss_moonfur',
    storyId: SS,
    momentId: 'ss_second_stirs',
    name: 'Moonfur Tuft',
    rarity: 'RARE',
    chance: 0.2,
    flavor: 'You woke up holding it. It is not from your shape.',
    imageKey: img('ss_moonfur'),
    artPrompt:
      'a soft tuft of silver-white fur tied with a thin black ribbon, glowing with pale moonlight, a crescent moon reflection shimmering over it',
  },
  {
    id: 'ss_twin_shadow_mask',
    storyId: SS,
    momentId: 'ss_second_stirs',
    name: 'Twin-Shadow Mask',
    rarity: 'EPIC',
    chance: 0.07,
    flavor: 'Half of it is your face. The other half is learning.',
    imageKey: img('ss_twin_shadow_mask'),
    artPrompt:
      'a masquerade mask split down the middle, the left half a white snow-leopard face with black rosettes, the right half sleek black raven feathers, glowing gold eyes, wisps of shadow',
  },
  {
    id: 'ss_winterbrush',
    storyId: SS,
    momentId: 'ss_ward_seven',
    name: 'Winterbrush Charm',
    rarity: 'EPIC',
    chance: 0.2,
    flavor: 'Fourteen months indoors. Still winter-white.',
    imageKey: img('ss_winterbrush'),
    artPrompt:
      'a fluffy pure white arctic fox tail charm clipped to a small metal hospital tag on a chain, snowflakes and cold blue light around it, bittersweet',
  },
  {
    id: 'ss_ward_breaker',
    storyId: SS,
    momentId: 'ss_ward_seven',
    name: 'Ward-Breaker Sigil',
    rarity: 'LEGENDARY',
    chance: 0.04,
    flavor: 'Thirty-one locks. One answer.',
    imageKey: img('ss_ward_breaker'),
    artPrompt:
      'a circular stone seal medallion engraved with the number seven, cracked open down the middle with blinding white-gold light pouring out of the crack, shards floating',
  },
  {
    id: 'ss_gilded_antler',
    storyId: SS,
    momentId: 'ss_edran',
    name: 'Gilded Antler',
    rarity: 'LEGENDARY',
    chance: 0.05,
    flavor: 'Seven hundred years of keeping the peace, capped in gold.',
    imageKey: img('ss_gilded_antler'),
    artPrompt:
      'a majestic branching stag antler tip capped with engraved gold, dark green and cream silk ribbon wound around its base, regal golden glow',
  },
  {
    id: 'ss_twiceborn_heart',
    storyId: SS,
    momentId: 'ss_twiceborn',
    name: 'Twiceborn Heart',
    rarity: 'MYTHIC',
    chance: 0.1,
    flavor: 'Two shapes. One heartbeat. Nobody was supposed to survive this.',
    imageKey: img('ss_twiceborn_heart'),
    artPrompt:
      'a crystalline heart split down the middle and fused back together, one half snow-leopard white-gold with rosettes, the other half raven black-violet with feathers, a blazing prismatic light where they join, the most majestic item imaginable',
  },
  {
    id: 'ss_rail_pass',
    storyId: SS,
    momentId: 'ss_any_ending',
    name: 'Far-Road Rail Pass',
    rarity: 'COMMON',
    chance: 0.6,
    flavor: 'Good for one journey. Any direction you like.',
    imageKey: img('ss_rail_pass'),
    artPrompt:
      'a brass and leather courier rail pass token with a hawk-wing emblem embossed on it, worn edges, a little green ribbon, warm lantern light',
  },
];

export const RELIC_MOMENTS: readonly RelicMoment[] = [...PINK_TIDE_MOMENTS, ...SECOND_SKIN_MOMENTS];
export const RELICS: readonly RelicDef[] = [...PINK_TIDE_RELICS, ...SECOND_SKIN_RELICS];
export const RELICS_BY_ID: ReadonlyMap<string, RelicDef> = new Map(RELICS.map((r) => [r.id, r]));

export function momentsFor(storyId: string): readonly RelicMoment[] {
  return RELIC_MOMENTS.filter((m) => m.storyId === storyId);
}

/**
 * Roll one moment's table. `roll` is a number in [0, 1).
 *
 * Walks the relics in authored order and returns the first whose cumulative
 * chance covers the roll, or null for the remainder.
 */
export function rollMoment(momentId: string, roll: number): RelicDef | null {
  let edge = 0;
  for (const relic of RELICS) {
    if (relic.momentId !== momentId) continue;
    edge += relic.chance;
    if (roll < edge) return relic;
  }
  return null;
}
