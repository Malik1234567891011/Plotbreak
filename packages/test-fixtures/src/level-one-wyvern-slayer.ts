import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Level One, Wyvern Slayer" — the number is wrong, and the proof is on the floor.
 *
 * The structural bet is that the power fantasy is already paid for. The player
 * killed an adult wyvern alone the night before the story opens and dragged its
 * head into the guild hall; nothing in this world makes them earn the strength.
 * What the story is about is a town whose whole economy runs on a number that
 * says the opposite, and what the player does about that: take the insulting
 * job, fight for the kill, sell the prize, show off, hide, or walk out.
 *
 * The one invented mechanic is the draw. When a monster dies its strength goes
 * into whoever killed it, and the guild crystal reads a level from how much of
 * it a person carries. The player does not take draw, so the crystal says 1 —
 * accurately — and the wyvern's draw is still sealed in the head. That makes the
 * head the most valuable object in town and its owner officially the least
 * important person in it, which is the engine of every scene: Gale wants the
 * stone, the Ascent House wants to buy it, the hall's rules say the kill cannot
 * be the player's, and the dead wyvern's mate is following the smell of it.
 *
 * Playable span: three days and three nights in Kestrel Ford, from twenty past
 * eleven on the first morning. How the player got strong is the archetype, and
 * the four archetypes are mutually exclusive histories — none of their names is
 * asserted anywhere else, so the narrator only ever hears the chosen one. Why
 * the draw does not go into them is the optional mystery, gated behind a lead
 * only a curious player opens; the founders' charter never intrudes on a run
 * that does not ask.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest` refills
 * those and a night's sleep is the honest thing for that to mean. Rumour is the
 * first GOOD_LOW in array order, so PUBLIC_VIOLENCE raises it: a fight in the
 * guild hall is exactly how a town starts talking. Scent is the wyvern clock —
 * it rises on its own, and handling the head makes it rise faster.
 */

const raw = {
  id: 'sv_level_one_wyvern_slayer_1',
  storyId: 'story_level_one_wyvern_slayer',
  version: 1,
  title: 'Level One, Wyvern Slayer',
  fantasyLabel: 'Level one on paper. Wyvern on the floor.',
  hook: 'The guild crystal says you are level one. The wyvern head you dragged eleven miles into the hall says otherwise, and every party in town wants it more than they want you.',
  premise:
    'You walked into the river town of Kestrel Ford this morning dragging a wyvern’s head on a rope. You killed it alone last night on the ridge above town, and bringing the head down took you eleven miles and most of the dark.\n\n' +
    'The adventurers’ guild hall has had a bounty on that wyvern for twelve days. One ranked party has already gone up after it and come back short a man.\n\n' +
    'Everyone who joins the guild puts a hand on the guild crystal, which reads their level. When a monster dies, its strength goes into whoever killed it. The guild calls that the draw, and your level is how much of it you carry.\n\n' +
    'Yours says level one. The wyvern’s draw did not go into you, and nobody in the hall has ever seen that happen. So it is still in the head, sealed in a stone behind its eye, and whoever cracks that stone in the next three days takes all of it.\n\n' +
    'By the guild’s own rules a level one cannot be paid for a wyvern. The strongest party in the room has just offered you a silver a day to carry their bags, and their name on your kill.\n\n' +
    'You need to keep what you killed and prove what you can do. Wyverns pair for life, and the dead one’s mate is following the smell of the head.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['High fantasy', 'Adventure', 'Monsters', 'Rivalry', 'Comedy'],
  mechanicsChips: [
    'Strong from turn one',
    'The number is wrong',
    'Your kill, if you can keep it',
    'A second wyvern is coming',
    'Show off, or hide it',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'You are already strong, and nothing here makes you earn it. The story is about a town whose whole idea of who matters runs on a number that says you do not. Take the insulting job, fight for your kill, sell the prize, show off, hide, or walk out. Every one of those is a whole game.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'guild_hall',
    startWorldMinute: 11 * 60 + 20,
    startingItems: [
      { itemId: 'wyvern_head', qty: 1 },
      { itemId: 'tow_rope', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-eight. Fia Quenby is twenty-two, Tamsin Wick twenty-seven, Gale Marrick twenty-nine, Harl Benning thirty-four, Marguerite Sallow forty-six and Guildmaster Orsk sixty-three. Every hunter, carter, herder and client in Kestrel Ford, the Ascent House’s heir included, is a grown adult.',
      'The player killed an adult wyvern alone on Scald Ridge the night before the story starts, and dragged its head eleven miles into Kestrel Ford. It happened, the head is real, and nobody can make it not have happened.',
      'When a monster dies, its strength, called the draw, goes into whoever killed it. The guild crystal reads a person’s level from the draw they carry. Levels measure draw taken, never skill.',
      'The player does not take draw. The wyvern’s draw did not go into them, the crystal reads them at level 1, and that reading is accurate about the draw and wrong about everything else.',
      'The wyvern’s unspent draw is sealed in the eye-stone behind its left eye for about three days. Whoever cracks the stone takes all of it, roughly fifteen levels. If the player cracks it, the draw still does not go into them: it goes into the nearest other hand on the pieces, or, with no other hand on them, bleeds away and the stone goes dark. Uncracked, the stone can be sold.',
      'Rule Twelve in the guild’s rulebook: a bounty above a hunter’s rank is paid to the party that escorted them, or it stays with the hall. A level 1 cannot be paid for a wyvern.',
      'Wyverns pair for life. The dead wyvern’s mate is alive and follows the smell of its partner’s draw: on the head, on whoever handles it, and on whoever cracks the stone. It reaches the town within three nights unless something changes that.',
      'Eight days ago Gale Marrick’s party went up Scald Ridge for this wyvern, ran, and left their porter Harl Benning on the ridge with a broken leg. Tamsin Wick logged it in the day book. The hall does not know.',
      'The five wyvern skulls on the guild hall rafters were killed by the guild’s founders before the crystal existed. The draw never went into the founders either. Guildmaster Orsk knows this and has told nobody.',
      'The player’s strength is real and is their own, built in their own life before this town. It is no curse, no gift from a god, no hidden screen and no voice in their head, and nobody in this world will explain it as one. It is a human body’s strength and a fighter’s skill and nothing more. The player cannot fly, float, cast spells they never learned, or do anything a very strong, very well-trained person could not. When they try, it does not happen, and the page shows that plainly.',
      'Fights end in bruises, breaks and a split lip, never gore. Romance, with anyone, goes no further than a kiss.',
    ],
    toneGuide:
      'An underdog power fantasy played straight and funny. The player is genuinely strong from the first line, and the joke is never that they are weak: it is that the room keeps measuring them wrong, and how long it takes each person to notice. ' +
      'Fights are short, physical and readable: distance, footing, one good blow. A B-rank is genuinely dangerous, a wyvern is a disaster, and nobody shrugs off a hit. The head is a huge, heavy, smelly prop and never a horror piece. ' +
      'Everybody wants something concrete — a bounty, a stone, a rule kept, a debt paid — and says so in their own voice. Gale is a rival, not a villain: charming, frightened and good at his job. ' +
      'The crystal’s number is a running joke that is also the whole economy. Let people read it, quote it and be wrong about it. Never explain the player’s strength as a curse, a god, a hidden screen or a voice in their head. It is theirs. ' +
      'Romance, if it happens, is awkward, warm and slow. The face at the top of a beat is Fia’s or Tamsin’s whenever one of them is in the scene and the moment involves her.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Tamsin opens the day book without looking up.\n\n"Name."\n\nYou tell her.\n\n"Level."\n\nThe crystal answers for you, again. 1.\n\n"Kill."\n\nYou point over your shoulder. The wyvern’s head is taking up half the floor. Two hunters are trying to climb over it to reach the notice board.\n\nTamsin looks at the head. At the crystal. At you.\n\nShe puts one stamp down and picks up a different one.\n\n"I need the rule for this," she says. "Give me a minute. I’m fairly sure there isn’t one."',
      'Gale’s sword is out before anyone sees him draw it. B-rank fast.\n\nYour hands are empty.\n\n"Last chance, friend. Walk away and this was a misunderstanding."\n\nThe hall goes quiet enough to hear the crystal hum.\n\nYou step in, inside the swing he hasn’t made yet, and close your hand round his wrist.\n\nHe can’t lift it.\n\nHe tries again. His face does something complicated.\n\nFrom the back, Fia, much too loud: "Forty degrees. I said. I measured."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 14, agility: 11, mind: 10, presence: 10, resolve: 12, arcana: 6 },
  skills: [
    { id: 'blade', name: 'Blade Work', attribute: 'might', description: 'Putting the whole of your weight behind one edge, at the one angle that goes through.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Being where the blow is not. Scree, a crowded hall, the inside of somebody’s swing.' },
    { id: 'woodcraft', name: 'Woodcraft', attribute: 'mind', description: 'Reading sign in the high country: tracks, scorch, broken pines, which way a big thing went.' },
    { id: 'notice', name: 'Noticing', attribute: 'mind', description: 'Who in the room is looking at the head instead of at you, and what they keep not saying.' },
    { id: 'bargain', name: 'Bargaining', attribute: 'presence', description: 'Getting a fair price out of people who are used to setting it.' },
    { id: 'candour', name: 'Plain Speech', attribute: 'resolve', description: 'Saying the true thing in a room that has already decided what it believes.' },
    { id: 'lore', name: 'Old Lore', attribute: 'arcana', description: 'What the guild used to know about wyverns, before it had a crystal to tell it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so rest restores the body and nothing else.
   * Rumour is first among the descending pair on purpose: PUBLIC_VIOLENCE and
   * the generic cost fallback both take the first GOOD_LOW in array order, and
   * a brawl in the guild hall should make the town talk rather than bring the
   * wyvern closer. Scent rises on its own and only comes down by ending it.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 72,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player’s body has finally sent the bill for an eleven-mile drag and a wyvern fight. Hands shake, the next blow lands at half weight, and anybody watching closely enough sees the level one the crystal promised them.',
      color: '#D9A441',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Arms like wet rope, the rope burns throbbing, and every swing arrives a heartbeat late. This is the band where a B-rank can actually win, where a show of strength fails in front of everybody, and where a bowl of stew and a bed are the strongest moves available.',
        },
        {
          upTo: 60,
          behaviour:
            'The honest ache of somebody who killed a wyvern last night. Good for one hard fight or one long walk, not both. The player can still do the impossible thing once today, and should pick which.',
        },
        {
          upTo: 100,
          behaviour:
            'Rested and dangerous. The player moves like the crystal is a joke, because to them it is: the full swing is there whenever they want it, the ridge is a stroll, and a room full of ranked hunters is just a room.',
        },
      ],
    },
    {
      id: 'rumour',
      name: 'Rumour',
      max: 100,
      start: 30,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody is talking about the player at all. They are the odd level one who brought in a head once, and they can walk through the square without a single head turning.',
      color: '#B5654A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The town has a story about a lucky level one and has mostly moved on. The player can work quietly, eat at the inn without being stared at, and surprise people, because nobody expects anything.',
        },
        {
          upTo: 55,
          behaviour:
            'People point. The B-rank table argues about it. The town’s gossip network, the carters and stallholders, has three versions of the kill and none of them is right. Strangers try to buy the player a drink to hear it.',
        },
        {
          upTo: 80,
          behaviour:
            'Everybody in Kestrel Ford has an opinion. Hunters line up to test the level one, the Ascent House sends a second letter, and the guild has to be seen to act. Doing anything in public draws a crowd within minutes.',
        },
        {
          upTo: 100,
          behaviour:
            'The story has left town on every cart. Parties ride in from the next valley to see the wyvern slayer, the hall cannot keep order, and the guild must either change its rules in public or make the player disappear from the record.',
        },
      ],
    },
    {
      id: 'scent',
      name: 'Scent',
      max: 100,
      start: 22,
      regenPerHour: 0.7,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The mate has lost the trail entirely and gone back to the high country to grieve, if wyverns do. The sky over the ford is only sky.',
      color: '#6F7F5C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The mate is circling the far ridges, confused, calling at night where only Harl and the dogs notice. The town can still pretend nothing else is coming.',
        },
        {
          upTo: 55,
          behaviour:
            'Sightings. A shadow over the east road at dusk, a carter who will not drive after dark, a cow gone from the ford meadow. The guild starts posting watchers and the parties start pricing a second bounty.',
        },
        {
          upTo: 80,
          behaviour:
            'It is over the town at night. Roof tiles come down, the dogs will not stop, and the smell of its partner on the head in the yard is pulling it lower every hour. Whoever handled that head can feel the sky looking at them.',
        },
        {
          upTo: 100,
          behaviour:
            'It comes down. Wherever the head is, or whoever cracked the stone, is where an adult wyvern lands, in the dark, with nothing left to lose.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'wyvern_head',
      name: 'The Wyvern’s Head',
      tags: ['quest', 'trophy'],
      questItem: true,
      droppable: false,
      description: 'An adult wyvern’s head, horned, the size of a hay cart. Whatever killed it went through two plates of neck armour in one blow. It weighs more than three people and smells worse than ten.',
      loreText: 'Behind the left eye, under the lid, is the eye-stone: a dark jewel that holds the draw the wyvern gave up when it died. It glows faintly at night. It will not glow for long.',
      icon: 'skull',
    },
    {
      id: 'eye_stone',
      name: 'The Eye-Stone',
      tags: ['quest'],
      questItem: true,
      description: 'A dark, egg-sized jewel behind the wyvern’s left eye, warm to the touch, holding every bit of the draw that did not go into you. Crack it and whoever holds the pieces takes the lot.',
      loreText: 'An uncracked wyvern stone has not been sold in this valley in living memory. The Ascent House has a standing buyer for one anyway.',
      icon: 'shard',
    },
    {
      id: 'tow_rope',
      name: 'The Tow Rope',
      tags: ['tool'],
      description: 'Forty feet of hemp that dragged a wyvern’s head eleven miles. Frayed at both ends, and it has given you rope burns on both palms.',
      loreText: 'Bought for a copper at a farm gate three valleys back, for a different job entirely.',
      icon: 'rope',
    },
    {
      id: 'guild_tag',
      name: 'The Iron Tag',
      tags: ['quest', 'personal', 'document'],
      questItem: true,
      description: 'A guild registration tag on a leather cord, stamped with your name and a single number: 1.',
      loreText: 'The stamp for the number one is the newest stamp on Tamsin’s rack. It has barely been used.',
      icon: 'card',
    },
    {
      id: 'gale_silver',
      name: 'Gale’s Silver',
      tags: ['coin'],
      description: 'One silver coin, set down on the counter by your hand. A day’s wage for a porter. Picking it up means yes.',
      loreText: 'It is the coin he walks across his knuckles. He has others.',
      icon: 'coin',
    },
    {
      id: 'wyvern_notice',
      name: 'The Wyvern Notice',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { notice: 1 },
      description: 'The bounty poster for your wyvern: three hundred gold, posted twelve days ago. Under it, in Tamsin’s small hand, one ranked party’s name, struck through, and the word “attempted”.',
      loreText: 'The struck-through name is the Ninefold. The date beside it is eight days ago.',
      icon: 'papers',
    },
    {
      id: 'day_book',
      name: 'The Day Book',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { notice: 2 },
      description: 'The guild’s daily log, in Tamsin’s handwriting: who went out, where, how many, and how many came back. Eight days ago, beside the Ninefold’s return, she wrote “minus one”.',
      loreText: 'Nobody has asked to see it in eight days. Tamsin has noticed that too.',
      icon: 'ledger',
    },
    {
      id: 'founders_charter',
      name: 'The Founders’ Charter',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { lore: 2 },
      description: 'The guild’s founding document, brown and soft with age. Five names, five wyverns, and a line about the founders that nobody downstairs has read in sixty years: “We take nothing from the dead.”',
      loreText: 'It calls the founders “the closed hands”. There is no level anywhere on it. The crystal did not exist yet.',
      icon: 'page',
    },
    {
      id: 'fia_charts',
      name: 'Fia’s Charts',
      tags: ['document'],
      skillModifiers: { lore: 1, notice: 1 },
      description: 'A notebook of every crystal reading Fia Quenby has ever taken, set against what the person actually did. The columns do not agree, and one page is just her own name.',
      loreText: 'Her own page has twenty-six entries marked with a small A in a circle. The key at the back says what the A stands for.',
      icon: 'book',
    },
    {
      id: 'ascent_offer',
      name: 'The Sealed Offer',
      tags: ['document'],
      description: 'A letter on heavy grey paper with your name spelled wrong: four hundred gold for the eye-stone, uncracked, delivered to the Ascent House before it fades.',
      loreText: 'The word “sell” does not appear anywhere in it. The word “opportunity” appears four times.',
      icon: 'letter',
    },
    {
      id: 'ninefold_banner',
      name: 'The Trodden Banner',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A blue party banner with nine stitched stars, trampled into the ash of an abandoned camp on Scald Ridge. Nobody leaves their banner behind on purpose.',
      loreText: 'One corner is torn off, the way you tear cloth for a splint.',
      icon: 'flag',
    },
    {
      id: 'watch_bolt',
      name: 'A Founders’ Bolt',
      tags: ['weapon'],
      stackable: true,
      maxStack: 3,
      description: 'An iron bolt as long as a man, from the rack beside the old watch’s rusted bolt-thrower. Too heavy for most people to lift, let alone throw.',
      loreText: 'The founders forged them for one job. There are twelve on the rack. Nobody has needed one in sixty years.',
      icon: 'spear',
    },
    {
      id: 'hall_stew',
      name: 'A Bowl of Stew',
      tags: ['food'],
      stackable: true,
      maxStack: 3,
      consumable: { resourceId: 'stamina', amount: 15, consumesItem: true },
      description: 'Mutton, barley and too much pepper, from the pot that never leaves the inn fire. It fixes most things.',
      loreText: 'The Split Tankard has served it every night for thirty years and has never once written down the recipe.',
      icon: 'bowl',
    },
    {
      id: 'notched_sword',
      name: 'The Notched Sword',
      tags: ['weapon', 'personal'],
      skillModifiers: { blade: 1 },
      description: 'A plain, old, perfectly balanced sword with one notch near the tip. The notch is from the wyvern’s neck plate.',
      loreText: 'Your teacher’s. He handed it over the day you finished the cut, and never asked for it back.',
      icon: 'sword',
    },
    {
      id: 'felling_axe',
      name: 'The Felling Axe',
      tags: ['weapon', 'tool'],
      skillModifiers: { blade: 1, woodcraft: 1 },
      description: 'A long-hafted woodsman’s axe, its head ground thin from ten years of sharpening. It went through a wyvern’s neck the way it goes through pine.',
      loreText: 'The haft has been replaced four times. The head is the original.',
      icon: 'axe',
    },
    {
      id: 'dented_shield',
      name: 'The Dented Shield',
      tags: ['weapon', 'armour'],
      skillModifiers: { footwork: 1 },
      description: 'A border-regiment round shield with the regiment’s badge scraped off, and a short spear strapped across the back of it.',
      loreText: 'Six years of dents. The newest one is the deepest, and it is shaped like a wyvern’s claw.',
      icon: 'shield',
    },
    {
      id: 'fence_post',
      name: 'The Fence Post',
      tags: ['weapon', 'personal'],
      skillModifiers: { blade: 1 },
      description: 'Four feet of seasoned oak with a nail still in one end. It has seen off wolves, a bear and, as of last night, a wyvern.',
      loreText: 'From the bottom field. Your father put it in. You took it out to make a point, and the point was made.',
      icon: 'tools',
    },
  ],
  abilities: [
    {
      id: 'full_swing',
      name: 'Full Swing',
      tags: ['offensive'],
      description: 'Stop pretending to be a level one, and hit something with everything you actually have.',
      affordances: ['full swing', 'hit it properly', 'stop holding back', 'one blow', 'strike', 'cut it down', 'swing at him', 'go all out'],
      costs: [
        { resourceId: 'stamina', amount: 18 },
        { resourceId: 'rumour', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'blade', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_back',
      name: 'Hold Back',
      tags: ['defensive'],
      description: 'Fight like the number on your tag: block, sidestep, pin, and make it look like luck.',
      affordances: ['hold back', 'go easy', 'pull the blow', 'block', 'dodge', 'pin him', 'fight like a level one', 'make it look like luck'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_plain',
      name: 'Say It Plain',
      tags: ['social'],
      description: 'Tell a room that has already made up its mind what actually happened, and let it argue.',
      affordances: ['tell the truth', 'say it plainly', 'tell them what happened', 'refuse', 'say no', 'turn him down', 'call him out'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'name_a_price',
      name: 'Name a Price',
      tags: ['social'],
      description: 'Haggle with somebody used to setting the price, over a job, a stone, or a secret.',
      affordances: ['haggle', 'bargain', 'name my price', 'counter offer', 'make a deal', 'negotiate', 'ask for more'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargain', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Hall',
      tags: ['sight'],
      description: 'Look at who is looking at the head instead of at you, and at what nobody has explained.',
      affordances: ['look around', 'watch them', 'read the room', 'study the skulls', 'look at the rafters', 'notice', 'take it in'],
      costs: [{ resourceId: 'stamina', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'show_the_head',
      name: 'Show the Head',
      tags: ['utility'],
      description: 'Pick the wyvern’s head up and put it somewhere everybody can see it: on a table, in the square, in somebody’s face.',
      affordances: ['lift the head', 'pick up the head', 'show them the head', 'drag the head', 'carry the head', 'hold it up'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'rumour', amount: 8 },
        { resourceId: 'scent', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: null, baseDc: 10 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'track_it',
      name: 'Track It',
      tags: ['survival'],
      description: 'Read the high country for sign of something big: scorch, broken pines, claw marks, where it sleeps.',
      affordances: ['track it', 'follow the trail', 'look for sign', 'find the nest', 'search the ridge', 'follow the tracks'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'scent', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'woodcraft', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lie_low',
      name: 'Lie Low',
      tags: ['utility'],
      description: 'Pull up a hood, take the back way, and be the forgettable level one for an afternoon.',
      affordances: ['lie low', 'keep my head down', 'slip out', 'hide', 'go quietly', 'stay out of sight', 'blend in'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'crack_the_eye',
      name: 'Crack the Eye-Stone',
      tags: ['utility'],
      description: 'Break the jewel behind the wyvern’s eye, and decide whose hands are on the pieces when the draw comes out.',
      affordances: ['crack the stone', 'break the eye-stone', 'smash the jewel', 'give her the draw', 'open the eye', 'take the stone out'],
      costs: [{ resourceId: 'scent', amount: 30 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_eye_stone'],
        lockedCopy:
          'There is a dark jewel behind the dead wyvern’s eye. Until somebody tells you what it is, there is no reason to take a hammer to it, and every reason to wonder why people keep looking at it.',
      },
    },
    {
      id: 'founders_cut',
      name: 'Under the Wing',
      tags: ['offensive'],
      description: 'The founders’ way to kill a wyvern in the air: wait for the stoop, step under the wing, and cut at the root of it.',
      affordances: ['under the wing', 'the founders cut', 'cut the wing', 'wait for the stoop', 'bring it down', 'hit the wing root'],
      costs: [
        { resourceId: 'stamina', amount: 20 },
        { resourceId: 'rumour', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'blade', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_founders_way'],
        lockedCopy:
          'You killed one wyvern on the ground, at night, by strength and a lot of luck. One in the air, coming down on a town, is a different animal, and nobody has shown you how it used to be done.',
      },
    },
  ],
  locations: [
    {
      id: 'guild_hall',
      name: 'The Guild Hall',
      shortName: 'Guild Hall',
      description:
        'The biggest building in Kestrel Ford: a long timber hall with a counter at one end, the guild crystal on a stand beside it, a notice board, a B-rank table by the fire that everyone else steps around, and five enormous wyvern skulls hung from the rafters, older than anybody drinking under them. Most of the floor is currently taken up by your wyvern’s head.',
      artDirection:
        'Fantasy adventurers’ guild hall interior, long timber room, a reception counter with a softly glowing crystal on a stand, a bounty notice board, armoured adventurers at a fireside table, five huge old wyvern skulls on the rafters, a fresh colossal horned wyvern head on the floor. Warm lamplight, rough wood, blue and amber.',
      connections: [
        { to: 'carcass_yard', travelMinutes: 1, label: 'Out the back to the yard' },
        { to: 'orsk_loft', travelMinutes: 1, label: 'Up the back stairs' },
        { to: 'ford_square', travelMinutes: 2, label: 'Out the front doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'gale_silver', qty: 1, ownerId: 'gale', aka: ['silver', 'the coin', 'his silver', 'the silver coin'] },
        { itemId: 'wyvern_notice', qty: 1, ownerId: null, aka: ['notice', 'the bounty notice', 'the poster', 'the bounty'] },
        { itemId: 'day_book', qty: 1, ownerId: 'tamsin', aka: ['day book', 'the log', 'the ledger', 'her book'] },
      ],
    },
    {
      id: 'carcass_yard',
      name: 'The Carcass Yard',
      shortName: 'The Yard',
      description:
        'A walled yard behind the hall with a weighing beam, meat hooks, a drain, a shed where Harl Benning sleeps, and a cart gate whose lock has not worked since spring. Kills wait here to be entered in the book, and your wyvern’s head will spend its first night here.',
      artDirection:
        'Walled stone yard behind a timber guild hall, a big weighing beam, iron hooks, a wooden shed with a lantern, a wide cart gate, a colossal wyvern head under a tarpaulin. Dusk, mud, torchlight.',
      connections: [
        { to: 'guild_hall', travelMinutes: 1, label: 'Back into the hall' },
        { to: 'ford_square', travelMinutes: 3, label: 'Through the cart gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'orsk_loft',
      name: 'The Guildmaster’s Loft',
      shortName: 'The Loft',
      description:
        'Up the back stairs: one long room under the roof, full of old maps of the ridges pinned over each other, a cold iron stove, a chair the guildmaster sleeps in, and a locked chest he keeps his boots on.',
      artDirection:
        'Attic office under steep rafters, layered hand-drawn maps of mountain ridges, a cold iron stove, a battered armchair, an old iron-bound chest with boots on top, a single window over a town. Dusty light, browns and greys.',
      connections: [{ to: 'guild_hall', travelMinutes: 1, label: 'Down the back stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'founders_charter', qty: 1, ownerId: 'orsk', aka: ['charter', 'the old charter', 'the founding charter', 'the paper in the chest'] },
      ],
    },
    {
      id: 'ford_square',
      name: 'Ford Square',
      shortName: 'The Square',
      description:
        'Cobbles, a market, a smithy ringing, and the stone bridge over the ford that gives the town its name. Everyone in Kestrel Ford crosses it twice a day, and by tonight everyone will have heard about you.',
      artDirection:
        'Frontier market town square, cobbles, stalls with awnings, a smithy with sparks, an old stone bridge over a shallow river ford, burnt ridges on the skyline. Bright, busy, midday.',
      connections: [
        { to: 'guild_hall', travelMinutes: 2, label: 'The guild hall doors' },
        { to: 'carcass_yard', travelMinutes: 3, label: 'Round to the yard gate' },
        { to: 'split_tankard', travelMinutes: 2, label: 'The inn across the square' },
        { to: 'ascent_house', travelMinutes: 3, label: 'The grey house with the brass plate' },
        { to: 'apothecary_attic', travelMinutes: 3, label: 'Up over the apothecary' },
        { to: 'old_watch', travelMinutes: 8, label: 'Along the wall to the old watch' },
        { to: 'east_road', travelMinutes: 6, label: 'Out the east gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'split_tankard',
      name: 'The Split Tankard',
      shortName: 'The Inn',
      description:
        'The adventurers’ inn on the square: low beams, a long bar, the ranked parties’ tables by the fire and everybody else by the door. Rooms upstairs, and Gale Marrick has the best one. A pot of stew has not left the fire in thirty years.',
      artDirection:
        'Cosy crowded fantasy tavern, low dark beams, a long bar, armoured adventurers at a fireside table, a big iron pot over the hearth, a staircase to rooms. Amber firelight, smoke, noise.',
      connections: [{ to: 'ford_square', travelMinutes: 2, label: 'Back out to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'hall_stew', qty: 3, ownerId: null, aka: ['stew', 'a bowl of stew', 'food', 'supper'] },
      ],
    },
    {
      id: 'ascent_house',
      name: 'The Ascent House',
      shortName: 'Ascent House',
      description:
        'A narrow grey townhouse with velvet curtains and a brass plate. Its waiting room has a list of services on the wall that never once uses the word price, and its back office is where rich families pay to have ranked parties escort their heirs to kills.',
      artDirection:
        'Elegant narrow townhouse interior in a rough frontier town, grey velvet curtains, a brass-plated door, a polished waiting room with a framed list on the wall, a back office with ledgers and a writing desk. Cool, quiet, expensive.',
      connections: [{ to: 'ford_square', travelMinutes: 3, label: 'Back out to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'ascent_offer', qty: 1, ownerId: 'marguerite', aka: ['offer', 'the sealed letter', 'the offer letter', 'her letter'] },
      ],
    },
    {
      id: 'apothecary_attic',
      name: 'The Apothecary Attic',
      shortName: 'Fia’s Room',
      description:
        'Fia Quenby’s room above the apothecary: a slanted ceiling, a narrow bed, and every wall covered in chalk charts of crystal readings, kills and wound angles. It smells of dried herbs and slightly of burnt tea.',
      artDirection:
        'Cramped attic bedroom above a herb shop, slanted ceiling, walls covered floor to ceiling in chalk diagrams and numbers, bundles of drying herbs, a narrow bed piled with notebooks, a teapot on a small burner. Warm, chaotic, scholarly.',
      connections: [{ to: 'ford_square', travelMinutes: 3, label: 'Down to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'fia_charts', qty: 1, ownerId: 'fia', aka: ['charts', 'her charts', 'her notebook', 'the chalk charts'] },
      ],
    },
    {
      id: 'old_watch',
      name: 'The Old Watch',
      shortName: 'Old Watch',
      description:
        'A squat stone tower at the town’s east edge, built by the guild’s founders to watch the ridges for wyverns. The bell still hangs. A rusted bolt-thrower still points at the sky, and a rack of iron bolts as long as a man still leans against the wall.',
      artDirection:
        'Squat old stone watchtower on a town wall at sunset, a bronze bell, a huge rusted siege bolt-thrower aimed at the sky, a rack of enormous iron bolts, burnt mountain ridges beyond. Wind, orange light.',
      connections: [
        { to: 'ford_square', travelMinutes: 8, label: 'Back along the wall' },
        { to: 'east_road', travelMinutes: 10, label: 'Down to the east road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'watch_bolt', qty: 3, ownerId: null, aka: ['bolt', 'an iron bolt', 'the bolts', 'a founders bolt'] },
      ],
    },
    {
      id: 'east_road',
      name: 'The East Road',
      shortName: 'East Road',
      description:
        'The cart road out of town toward the ridges, between hedges and the open ford meadow where the town’s cattle graze. Carters drive it fast after dark and, since last week, not at all.',
      artDirection:
        'Rutted country cart road between hedgerows and an open meadow with cattle, a line of burnt black ridges ahead, a huge winged shadow crossing the grass. Late afternoon, long shadows.',
      connections: [
        { to: 'ford_square', travelMinutes: 6, label: 'Back through the east gate' },
        { to: 'old_watch', travelMinutes: 10, label: 'Up to the old watch' },
        { to: 'scald_ridge', travelMinutes: 150, label: 'Eleven miles up to the ridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'scald_ridge',
      name: 'Scald Ridge',
      shortName: 'The Ridge',
      description:
        'Burnt pines, loose scree and a long black scorch where the wyvern came down on you last night. Higher up, a broken camp sits where a ranked party abandoned it: a slashed tent, cold pots, and a blue banner trodden into the ash.',
      artDirection:
        'High mountain ridge of burnt black pines and grey scree, a long scorch mark across the slope, an abandoned adventurers’ camp with a slashed tent and a trampled blue banner. Cold wind, overcast, vast drop to a valley.',
      connections: [
        { to: 'east_road', travelMinutes: 150, label: 'The long way down' },
        { to: 'the_nest', travelMinutes: 40, lockedByFlag: 'knows:where_the_nest_is', label: 'Up past the second scree' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 3 },
      takeableItems: [
        { itemId: 'ninefold_banner', qty: 1, ownerId: null, aka: ['banner', 'the blue banner', 'the trodden banner', 'their flag'] },
      ],
    },
    {
      id: 'the_nest',
      name: 'The Nest',
      shortName: 'The Nest',
      description:
        'A flat crag above the second scree, wind-scoured, littered with old bones and broken shell, with the whole valley and the town spread out below. Something enormous sleeps here, and since yesterday it has slept alone.',
      artDirection:
        'Wind-scoured mountain crag high above a valley, a huge rough nest of broken pines, old shell fragments, a distant small town by a river far below. Dramatic sky, cold blue and gold.',
      connections: [{ to: 'scald_ridge', travelMinutes: 40, label: 'Back down the scree' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: 4 },
      takeableItems: [],
    },
  ],
  /**
   * Order matters. PUBLIC_VIOLENCE takes standing from the first faction in
   * array order, and a fight in Kestrel Ford is first of all the guild's
   * problem: it happened on its floor, or over its kill.
   */
  factions: [
    {
      id: 'faction_guild',
      name: 'The Kestrel Ford Guild',
      description: 'The hall, the counter, the crystal and the rules. It pays the bounties, keeps the day book, and decides whose name goes on a kill. It has not changed a rule in sixty years.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'Level One on the Books' },
        { atReputation: 25, label: 'Allowed Real Work' },
        { atReputation: 50, label: 'On the Board' },
        { atReputation: 75, label: 'Named Under the Rafters' },
      ],
      allies: ['faction_town'],
      enemies: [],
    },
    {
      id: 'faction_parties',
      name: 'The Ranked Parties',
      description: 'The B-rank and C-rank adventuring parties who drink by the fire and take the good bounties. Gale’s Ninefold is the best of them. They laughed first, and a level one who kills wyverns is bad for business.',
      startingReputation: -10,
      ranks: [
        { atReputation: -20, label: 'A Joke at the Table' },
        { atReputation: 10, label: 'Worth a Seat' },
        { atReputation: 40, label: 'Asked to Join' },
        { atReputation: 70, label: 'Feared' },
      ],
      allies: ['faction_ascent'],
      enemies: [],
    },
    {
      id: 'faction_ascent',
      name: 'The Ascent House',
      description: 'A brokerage that sells escorted kills, and the draw that comes with them, to families rich enough to want a high number for their heirs. It pays for the guild’s roof and half the parties’ armour.',
      startingReputation: 0,
      ranks: [
        { atReputation: -20, label: 'A Problem' },
        { atReputation: 0, label: 'Not a Client' },
        { atReputation: 30, label: 'A Consideration' },
        { atReputation: 60, label: 'Preferred' },
      ],
      allies: ['faction_parties'],
      enemies: [],
    },
    {
      id: 'faction_town',
      name: 'The Ford Folk',
      description: 'Carters, stallholders, the smith, the herders on the ford meadow. They do not care what the crystal says. They care that something with a wingspan like a barn roof has been seen over the east road.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A Stranger With a Head' },
        { atReputation: 30, label: 'Our Wyvern Slayer' },
        { atReputation: 60, label: 'One of Ours' },
      ],
      allies: ['faction_guild'],
      enemies: [],
    },
  ],
  /**
   * Cast order is cover-casting order: `coverCast()` takes the first three with
   * an appearance. Fia, Tamsin and Gale are the opener's three faces.
   */
  characters: [
    {
      id: 'fia',
      name: 'Fia Quenby',
      role: 'A mage at level thirty-one on paper, dropped from Gale’s party a month ago, and the only person in the hall measuring the wound instead of laughing',
      cardBlurb:
        'She believes you before anybody else does, because she measured the wound on your wyvern and no level one could have made it. She also has a number that is too high, and she would very much like you not to ask about it.',
      pronouns: 'she/her',
      publicTraits: ['Measures everything', 'Talks fastest when she is right', 'Brave on paper, nervous in rooms'],
      hiddenDrives: [
        'She needs the crystal to be wrong about you, because if it is wrong about you it is wrong about her',
        'She wants one partner who chose her for what she can actually do',
      ],
      values: ['Evidence over reputation', 'Apologising and then saying it anyway'],
      fears: [
        'The hall finding out that her family bought twenty-six of her thirty-one levels',
        'Being the one who slows a party down, again',
      ],
      socialStyle:
        'Arrives mid-sentence with a measuring tape. Apologises for interrupting and does not stop interrupting. Goes very quiet and very precise when she is frightened.',
      boundaries: [
        'Will not pretend a reading says something it does not, even to help you',
        'Will never again take draw from a kill she did not make herself',
      ],
      goals: ['Prove the crystal measures the wrong thing', 'Get into a party that wants her, or start one'],
      secrets: [
        {
          id: 'fia_bought_levels',
          fact: 'Twenty-six of her thirty-one levels were bought. Her family paid the Ascent House to have ranked parties escort her to kills, and she landed the last blow on things other people had already beaten.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself, badly, if you have shown her your own number without being ashamed of it, or if you ask her why she measures other people.',
        },
        {
          id: 'fia_why_dropped',
          fact: 'Gale dropped her from the Ninefold a month ago for "slowing them down", three weeks before the ridge trip. Harl Benning was the only one in the party who was kind to her, and since the ridge he has not spoken to anyone from it. She has never asked him why.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her about Gale’s party rather than about Gale.',
        },
      ],
      speechStyle:
        'Fast, breathless, self-interrupting. Gives measurements as proof and apologises for them. Says "technically" and "sorry" and keeps going. Her sentences only get short when she is frightened.',
      topics: ['the wound on the wyvern', 'the crystal', 'her charts', 'her level', 'Gale’s party', 'the three spells she can cast'],
      voiceSamples: [
        'Sorry, can I, sorry. The wound. Two plates of neck armour, one angle, no second blow. Do you understand how rare one blow is?',
        'Technically the crystal is never wrong. It just answers a question nobody asked it. I have charts. I have so many charts.',
        'My reading is thirty-one. My mother paid for twenty-six of those. I can cast three spells, and one of them makes tea warmer.',
        'If you were lying I would know, because liars do not hit at forty degrees. That is not an expression. I measured it.',
      ],
      appearance:
        'An adult woman, lean and quick, a cloud of copper hair held back with a chalk-dusted ribbon, bright green eyes, freckles, ink on her fingers, and an expensive plum-coloured mage’s coat with brass buttons that she has visibly slept in.',
      visualHook: 'A tailor’s measuring tape worn round her neck like a scarf, with a stick of chalk tied to one end.',
      silhouette: 'Leaning in too close to something, notebook up, coat sleeves shoved past the elbow.',
      artSeed: 'lows-fia-01',
      portrait: null,
      expressions: ['neutral', 'eager', 'flustered', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'apothecary_attic', activity: 'asleep under her charts' },
        { startMinute: 480, endMinute: 600, locationId: 'apothecary_attic', activity: 'redrawing yesterday’s readings in chalk' },
        { startMinute: 600, endMinute: 840, locationId: 'guild_hall', activity: 'by the notice board with a measuring tape and a notebook' },
        { startMinute: 840, endMinute: 1080, locationId: 'carcass_yard', activity: 'measuring whatever came in today' },
        { startMinute: 1080, endMinute: 1440, locationId: 'apothecary_attic', activity: 'practising the two spells that do not work yet' },
      ],
      homeLocationId: 'apothecary_attic',
      knowledgeScope: ['the_crystal', 'draw', 'rule_twelve', 'the_eye_stone', 'gales_party', 'kestrel_ford'],
      startingRelationship: { trust: 30, affection: 20, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'fia_shows_her_charts',
          label: 'She shows you her charts',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'fia_tells_her_number',
          label: 'She tells you where her levels came from',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['registered'] },
        },
        {
          id: 'fia_more_than_partners',
          label: 'She stops pretending it is only about the research',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 65, flagsSet: ['fia_number_known'] },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 16, presence: 11, resolve: 12, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 8, tags: ['mage'] },
    },
    {
      id: 'tamsin',
      name: 'Tamsin Wick',
      role: 'The guild receptionist. She runs the counter, the crystal and the day book, and she has just read your number aloud to the whole hall',
      cardBlurb:
        'She has to enter your kill under somebody’s name, the rules say it cannot be yours, and without once looking up at you she is hunting for a technicality that says it can.',
      pronouns: 'she/her',
      publicTraits: ['Knows every rule by number', 'Unflappable at a counter', 'Dry enough to strike a match on'],
      hiddenDrives: [
        'She wants to be a guild inspector and needs one case proving the rules can be held to the people who wrote them',
        'She has been waiting eight days for somebody to ask her what "minus one" means',
      ],
      values: ['A rule applied the same to everyone', 'The record, kept exactly'],
      fears: [
        'That the rules she enforces only ever protect the people at the B-rank table',
        'Being the clerk who knew and stamped it anyway',
      ],
      socialStyle:
        'Talks to you while doing paperwork and never looks up until it matters. When she does look up, the hall notices.',
      boundaries: [
        'Will not falsify the day book, for anybody, including you',
        'Will not break a rule for you. She will find you a different rule',
      ],
      goals: ['Get the wyvern entered correctly before the day book closes at sundown', 'Find out what you actually are, for the record'],
      secrets: [
        {
          id: 'tamsin_minus_one',
          fact: 'Eight days ago she logged Gale’s party out to Scald Ridge with four names and back with three, and wrote "minus one" in the margin. Harl Benning walked in four days later on a broken leg. Nobody has asked her about the entry.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She opens the day book if you ask about Gale’s last job by date, as a records question, rather than as gossip.',
        },
      ],
      speechStyle:
        'Clipped and procedural. Every sentence is filed. Quotes rule numbers from memory and says "Next." to end a conversation. Her kindness arrives as a technicality, never as sympathy.',
      topics: ['rule twelve', 'the bounty', 'the day book', 'the crystal', 'Gale’s last job', 'the proving'],
      voiceSamples: [
        'Name, level, purpose of visit. In that order. The head can wait outside the line.',
        'Rule twelve. A bounty above your rank goes to the escorting party, or it stays with the hall. I did not write it. I stamp it.',
        'Off the record? There is no off the record. There is a margin, and I write small.',
        'Next.',
      ],
      appearance:
        'An adult woman, tall and composed, black hair in a hard knot with two pencils through it, cool grey eyes, a guild-grey waistcoat over a white shirt with ink-stained cuffs, and narrow reading spectacles she looks over rather than through.',
      visualHook: 'Two rubber stamps, one in each hand, held ready like she is about to rule on you.',
      silhouette: 'Upright behind a counter, elbows in, one stamp raised and waiting.',
      artSeed: 'lows-tamsin-01',
      portrait: null,
      expressions: ['neutral', 'unimpressed', 'surprised', 'dry', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'ford_square', activity: 'asleep in her room over the chandler’s on the square' },
        { startMinute: 450, endMinute: 1110, locationId: 'guild_hall', activity: 'behind the counter with the crystal and the day book' },
        { startMinute: 1110, endMinute: 1260, locationId: 'split_tankard', activity: 'one cider at the end of the bar, reading the rule book for pleasure' },
        { startMinute: 1260, endMinute: 1440, locationId: 'ford_square', activity: 'home over the chandler’s, writing up the day' },
      ],
      homeLocationId: 'ford_square',
      knowledgeScope: ['rule_twelve', 'the_day_book', 'the_crystal', 'the_bounty', 'gales_party', 'the_guild'],
      startingRelationship: { trust: 25, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tamsin_finds_a_rule',
          label: 'She finds you a technicality',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'tamsin_opens_the_book',
          label: 'She shows you the day book',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:rule_twelve'] },
        },
      ],
      attributes: { might: 9, agility: 10, mind: 15, presence: 12, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 25, defenseDc: 11, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'gale',
      name: 'Gale Marrick',
      role: 'Leader of the Ninefold, the best B-rank party in the hall, level thirty-eight, and the first person to put a price on you',
      cardBlurb:
        'He wants your wyvern’s head with his party’s name on it, he will pay you a silver a day to carry the party’s bags, and he is being very friendly about it for a man with his hand that close to his sword.',
      pronouns: 'he/him',
      publicTraits: ['Charming in public', 'Good with a sword and better with a room', 'Always pays his round'],
      hiddenDrives: [
        'His patron at the Ascent House drops him at the end of the season unless the Ninefold makes A-rank, and the eye-stone would do it in one night',
        'He ran on that ridge, and he has been very cheerful ever since so that nobody notices',
      ],
      values: ['Getting paid', 'A party that looks like a party', 'Never being seen to lose'],
      fears: ['The hall finding out his party ran and left a man behind', 'Being exactly as good as his number and no better'],
      socialStyle: 'Leans on things. Buys the drink before he asks the favour. Lowers his voice instead of raising it.',
      boundaries: [
        'Will not fight anyone in front of the hall unless he is certain he wins',
        'Will not say the porter’s name out loud',
      ],
      goals: ['Get the eye-stone before it fades', 'Put the Ninefold’s name on the wyvern and make A-rank this season'],
      secrets: [
        {
          id: 'gale_the_ridge',
          fact: 'Eight days ago the Ninefold went up Scald Ridge for this wyvern. It came down on their camp at night. They ran, and left their porter Harl Benning behind with a broken leg. Gale told the hall the job was called off for weather.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only if he is frightened of you and you already know, or if Harl is in the room.',
        },
        {
          id: 'gale_the_hammer',
          fact: 'He plans to come over the carcass yard wall after midnight with two of his party and a jeweller’s hammer, and crack the eye-stone himself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Somebody at the Split Tankard sees him buy the hammer, if you are there in the evening watching his table.',
        },
      ],
      speechStyle:
        'Warm, quick salesman’s cadence. Puts a price on everything, threats included. Says "friend" right before something costs you. Never raises his voice; he lowers it.',
      topics: ['the offer', 'his party', 'the bounty', 'the eye-stone', 'A-rank', 'the ridge'],
      voiceSamples: [
        'Porter, a silver a day. Take it now, or carry your lizard home.',
        'Everybody in this hall has a price, friend. Mine is high and fair. Yours is a silver, and that is me being generous in front of witnesses.',
        'Thirty-eight. Do you know what thirty-eight buys in this town? Credit. Doors. Patience. One buys you a broom.',
        'Let’s not make this ugly. Ugly is expensive, and you cannot afford it.',
      ],
      appearance:
        'An adult man, broad-shouldered and easy, sandy hair cut by somebody expensive, warm brown eyes, an easy grin, polished steel half-plate with a blue sash stitched with nine small stars, and a scabbard worn high and ready.',
      visualHook: 'A single silver coin he walks across his knuckles while he talks, and never seems to spend.',
      silhouette: 'Shoulder against a pillar, one thumb hooked in his sword belt, head tilted as if pricing you.',
      artSeed: 'lows-gale-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'calculating', 'cornered', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'split_tankard', activity: 'asleep in the best room at the inn' },
        { startMinute: 540, endMinute: 900, locationId: 'guild_hall', activity: 'holding court at the B-rank table' },
        { startMinute: 900, endMinute: 1080, locationId: 'ascent_house', activity: 'reporting to his patron, smiling' },
        { startMinute: 1080, endMinute: 1440, locationId: 'split_tankard', activity: 'buying rounds at his table by the fire' },
      ],
      homeLocationId: 'split_tankard',
      knowledgeScope: ['gales_party', 'the_eye_stone', 'the_bounty', 'rule_twelve', 'the_ascent_house', 'scald_ridge'],
      startingRelationship: { trust: 10, affection: 5, respect: 15, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'gale_deals_straight',
          label: 'He stops selling and makes you a real offer',
          kind: 'ALLIANCE',
          requires: { respect: 50 },
        },
        {
          id: 'gale_admits_the_ridge',
          label: 'He admits what happened on the ridge',
          kind: 'OTHER',
          requires: { fear: 40, flagsSet: ['knows:the_left_porter'] },
        },
      ],
      attributes: { might: 15, agility: 15, mind: 12, presence: 15, resolve: 10, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 11, tags: ['b-rank', 'swordsman'] },
    },
    {
      id: 'orsk',
      name: 'Hadric Orsk',
      calledName: 'Orsk',
      role: 'Guildmaster of Kestrel Ford, a former wyvern hand with a ruined knee, who has not come down the back stairs for a new member in eleven years',
      cardBlurb:
        'He decides whose name goes on your kill, he has not said a word since the hall started laughing, and he is the only person in town who does not look surprised by you.',
      pronouns: 'he/him',
      publicTraits: ['Says almost nothing', 'Never takes back a ruling', 'Moves slowly and misses nothing'],
      hiddenDrives: [
        'His grandmother was the last person the guild remembers whose kills never went into her, and he has waited his whole life to see another',
        'He needs the draw trade’s money to keep the roof on, and the truth about the crystal would empty it',
      ],
      values: ['The guild as its founders built it', 'A ruling that holds'],
      fears: ['Dying as the last man who knew what the rafters mean', 'Choosing the roof over the truth, and being right to'],
      socialStyle: 'Asks one question and waits as long as it takes. Sits where he can see the door and your hands.',
      boundaries: [
        'Will not overrule Rule Twelve in public without a reason the whole hall can see',
        'Will not show the charter to anyone he has not watched fight',
      ],
      goals: ['See the swing that killed that wyvern with his own eyes', 'Keep the guild solvent through the season'],
      secrets: [
        {
          id: 'orsk_the_charter',
          fact: 'A chest in his loft holds the guild’s founding charter. It names the five founders whose skulls hang on the rafters and calls them "the closed hands": people the draw never went into. His grandmother was the last of them. The crystal came later, with the draw trade.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He opens the chest for somebody who has shown him the full swing and then asked about the rafters rather than about the bounty.',
        },
      ],
      speechStyle:
        'Short. Mostly questions and single words, with long silences doing the asking. Never explains a ruling and never takes one back.',
      topics: ['the rafters', 'the founders', 'the proving', 'rule twelve', 'his knee', 'wyverns'],
      voiceSamples: [
        'Hm. Eleven miles. On your own.',
        'Sit. No. Where I can see your hands.',
        'Crystal’s older than me. Rafters are older than the crystal. Think on it.',
        'Show me. Not the head. The swing.',
      ],
      appearance:
        'An older man, enormous and slow, a white beard cropped close, deep-set dark eyes, a heavy brown leather coat scored by old claws, and a blackthorn stick he leans on for the left knee.',
      visualHook: 'A long pale claw scar running from his collar to his jaw, which he scratches when he is thinking.',
      silhouette: 'A wide dark shape at the top of the back stairs, both hands stacked on a stick.',
      artSeed: 'lows-orsk-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'considering', 'quietly pleased'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'orsk_loft', activity: 'asleep in the chair in his loft' },
        { startMinute: 360, endMinute: 720, locationId: 'orsk_loft', activity: 'at his maps with the door open, listening to the hall' },
        { startMinute: 720, endMinute: 780, locationId: 'guild_hall', activity: 'eating at the end of the counter, saying nothing' },
        { startMinute: 780, endMinute: 1080, locationId: 'carcass_yard', activity: 'walking the yard with his stick, weighing kills' },
        { startMinute: 1080, endMinute: 1440, locationId: 'old_watch', activity: 'up the old watch, as he has been every evening for forty years' },
      ],
      homeLocationId: 'orsk_loft',
      knowledgeScope: ['the_rafters', 'the_founders', 'the_charter', 'rule_twelve', 'wyverns', 'the_guild', 'the_ascent_house'],
      startingRelationship: { trust: 15, affection: 5, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'orsk_sends_for_you',
          label: 'He sends for you',
          kind: 'TRUST',
          requires: { respect: 40 },
        },
        {
          id: 'orsk_opens_the_chest',
          label: 'He opens the chest in his loft',
          kind: 'TRUST',
          requires: { trust: 45, respect: 55, flagsSet: ['knows:the_rafters'] },
        },
      ],
      attributes: { might: 16, agility: 7, mind: 14, presence: 15, resolve: 17, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 15, damage: 10, tags: ['veteran'] },
    },
    {
      id: 'harl',
      name: 'Harl Benning',
      role: 'Keeper of the carcass yard behind the hall, on a cane, and the porter Gale’s party left on the ridge eight days ago',
      cardBlurb:
        'He sleeps in the shed where your wyvern’s head will spend the night, he knows the ridge better than anyone alive, and he can tell you exactly what a silver a day from Gale is worth.',
      pronouns: 'he/him',
      publicTraits: ['Dry as old rope', 'Never complains about the leg', 'Knows the high country'],
      hiddenDrives: [
        'He wants to be paid what he is owed, and to watch the man who owes it carry something heavy for once',
        'He is more frightened of the ridge than he will ever say',
      ],
      values: ['Carrying your share', 'Nobody gets left'],
      fears: ['Going back up Scald Ridge', 'Becoming a story people tell about Gale instead of a man'],
      socialStyle: 'Works while he talks. Tells the worst things like jokes about the weather, and lets you decide whether to laugh.',
      boundaries: ['Will not say Gale’s name', 'Will not carry for a ranked party again, at any wage'],
      goals: ['Get through the season on the yard wage', 'See the Ninefold made to say it out loud'],
      secrets: [
        {
          id: 'harl_the_nest',
          fact: 'He saw the nest before they ran: a crag above the second scree, with two wyverns on it, not one. He has known for eight days that the dead one had a mate.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you where it is if you tell him you are going up there regardless, and he believes you.',
        },
      ],
      speechStyle:
        'Dry, wry and laconic. Talks in loads, weights and rope, the porter’s trade. Never says Gale’s name; says "him", and you can hear the capital letter.',
      topics: ['the ridge', 'the nest', 'his leg', 'carrying', 'the yard', 'him'],
      voiceSamples: [
        'Four days down that ridge on one leg. Took a while. Scenery was good.',
        'A silver a day buys your back, your knees, and your silence. He only ever paid for the first two.',
        'You want the nest? Burnt pines, second scree, keep climbing. Don’t. But that is where.',
        'Carried his tent, his pots and his good name for three years. Dropped the last one somewhere up top.',
      ],
      appearance:
        'An adult man, rope-lean and weathered, short dark stubble, tired hazel eyes, a porter’s leather harness he still wears out of habit, a splinted right leg, and a cane cut from a pine branch.',
      visualHook: 'A coil of old porter’s rope slung across his chest, frayed at one end where it was cut.',
      silhouette: 'Lopsided, weight on the cane, a meat hook in his free hand.',
      artSeed: 'lows-harl-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'tired', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'carcass_yard', activity: 'asleep in the yard shed' },
        { startMinute: 420, endMinute: 1200, locationId: 'carcass_yard', activity: 'keeping the yard with a cane and a hook' },
        { startMinute: 1200, endMinute: 1440, locationId: 'split_tankard', activity: 'in the corner farthest from his old table' },
      ],
      homeLocationId: 'carcass_yard',
      knowledgeScope: ['scald_ridge', 'the_nest', 'wyverns', 'gales_party', 'the_carcass_yard', 'kestrel_ford'],
      startingRelationship: { trust: 20, affection: 10, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'harl_tells_the_ridge',
          label: 'He tells you what happened on the ridge',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'harl_shows_the_way',
          label: 'He draws you the way to the nest',
          kind: 'ALLIANCE',
          requires: { trust: 50, flagsSet: ['knows:the_mate'] },
        },
      ],
      attributes: { might: 13, agility: 8, mind: 13, presence: 10, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 5, tags: ['injured'] },
    },
    {
      id: 'marguerite',
      name: 'Marguerite Sallow',
      role: 'Broker at the Ascent House, which arranges escorted kills for rich families and sells the draw that comes with them',
      cardBlurb:
        'She wants to buy your wyvern’s eye-stone before anybody cracks it, she will pay more than the bounty, and she would prefer that you never find out what the crystal actually measures.',
      pronouns: 'she/her',
      publicTraits: ['Impeccably polite', 'Never in a hurry', 'Pays on time'],
      hiddenDrives: [
        'A client’s heir arrives tomorrow and has been promised a wyvern’s worth of draw by spring',
        'If people learn that a level one can kill a wyvern, nobody will pay her house for levels again',
      ],
      values: ['Discretion', 'An agreement made privately and kept'],
      fears: ['A world where the number means nothing and everyone knows it', 'Being seen to want something'],
      socialStyle: 'Offers a chair, tea and a compliment before anything else. Never says a figure out loud if she can write it down instead.',
      boundaries: ['Will not threaten anybody herself', 'Will not haggle in public'],
      goals: ['Buy the eye-stone uncracked', 'Keep the crystal the only measure in Kestrel Ford'],
      secrets: [
        {
          id: 'marguerite_the_receipts',
          fact: 'The Ascent House arranged most of the high readings in the hall, including twenty-six of Fia Quenby’s levels and the patronage that keeps Gale’s party in good armour. Her books would empty the B-rank table.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it slip as a boast if you refuse her offer and she decides you are worth persuading rather than ignoring.',
        },
      ],
      speechStyle:
        'Courteous, unhurried, every hard thing wrapped in a soft word. Never names a figure without calling it something else. Gets your name very slightly wrong, every time, until the day she decides you matter, and from then on gets it exactly right.',
      topics: ['the offer', 'the eye-stone', 'the Ascent House', 'her clients', 'what the crystal measures'],
      voiceSamples: [
        'Let us not say sell. Let us say that something valuable changes hands, and everybody leaves the room better off.',
        'I have written a figure on this card, for the stone, unopened. Do turn it over. A family in the capital has an heir who would like to be remarkable by spring.',
        'The crystal does not measure strength. It is a receipt, and my house writes most of them.',
        'Of course you may refuse. Refusal is a luxury, and I do admire people who can afford one.',
      ],
      appearance:
        'An adult woman, poised and straight-backed, silver-streaked dark hair pinned in a perfect coil, pale blue eyes, a high-collared dove-grey gown, and a folding fan she points with.',
      visualHook: 'Dove-grey leather gloves she never takes off, even to sign.',
      silhouette: 'Seated very straight, gloved hands folded on a ledger, fan closed.',
      artSeed: 'lows-marguerite-01',
      portrait: null,
      expressions: ['neutral', 'gracious', 'cold', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'ascent_house', activity: 'asleep in the rooms above the house' },
        { startMinute: 480, endMinute: 1140, locationId: 'ascent_house', activity: 'receiving clients in the velvet room' },
        { startMinute: 1140, endMinute: 1320, locationId: 'split_tankard', activity: 'dining in the private room, paying for Gale’s table without being seen to' },
        { startMinute: 1320, endMinute: 1440, locationId: 'ascent_house', activity: 'writing to the capital' },
      ],
      homeLocationId: 'ascent_house',
      knowledgeScope: ['the_ascent_house', 'draw', 'the_eye_stone', 'the_crystal', 'gales_party', 'fias_number'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'marguerite_talks_terms',
          label: 'She talks terms with you as an equal',
          kind: 'OTHER',
          requires: { respect: 35 },
        },
        {
          id: 'marguerite_drops_the_velvet',
          label: 'She tells you what her house actually sells',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:what_the_crystal_counts'] },
        },
      ],
      attributes: { might: 7, agility: 9, mind: 16, presence: 17, resolve: 14, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 10, damage: 2, tags: ['civilian'] },
    },
  ],
  quests: [
    {
      id: 'q_level_one',
      title: 'Level One',
      summary: 'The crystal says 1, the hall is laughing, and the best B-rank in the room has put a silver coin by your hand.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['tamsin', 'gale', 'fia'],
      involvedLocationIds: ['guild_hall'],
      knownRewardCopy: 'A guild tag, a place in the hall, and some idea of what the head is really worth.',
      steps: [
        {
          id: 'the_counter',
          playerCopy: 'Answer Gale in front of the whole hall.',
          directorNotes:
            'Every route here is a real way to handle it and none of them is wrong. Gale is not stupid: he offers the porter job because Rule Twelve means the kill cannot be paid to a level one, and he would rather have the head than a fight. Tamsin will not take sides out loud. Fia is at the notice board and will intervene, too loudly, the moment anybody calls the kill a fluke. A show of strength here is spectacular and expensive: the whole town hears about it by dark.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'turned_him_down',
              label: 'Turn him down and keep the head',
              predicate: { flagsSet: ['used:say_it_plain'] },
              setsFlags: ['refused_gale', 'kept_the_head'],
              closesFlags: ['porter_for_gale'],
            },
            {
              routeId: 'took_the_silver',
              label: 'Take his silver and carry for his party',
              predicate: { hasItems: ['gale_silver'] },
              setsFlags: ['porter_for_gale'],
              closesFlags: ['refused_gale'],
            },
            {
              routeId: 'lifted_it',
              label: 'Lift the head one-handed in front of the hall',
              predicate: { flagsSet: ['used:show_the_head'] },
              setsFlags: ['showed_the_hall', 'kept_the_head'],
              closesFlags: [],
            },
            {
              routeId: 'haggled_him_up',
              label: 'Haggle him up from a silver',
              predicate: { flagsSet: ['used:name_a_price'] },
              setsFlags: ['haggled_with_gale'],
              closesFlags: [],
            },
            {
              routeId: 'let_tamsin_handle_it',
              label: 'Say nothing and let the receptionist handle it',
              predicate: { flagsSet: ['spoke:tamsin'] },
              setsFlags: ['tamsin_handled_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [{ itemId: 'guild_tag', qty: 1 }],
            flags: ['registered'],
            abilities: [],
            reputation: [{ factionId: 'faction_guild', amount: 5 }],
          },
        },
        {
          id: 'the_rule',
          playerCopy: 'Find out why a level one cannot be paid for a wyvern, and what the head is really worth.',
          directorNotes:
            'Two facts land here and they change everything after. Rule Twelve: the bounty goes to the escorting party or stays with the hall. And the eye-stone: the draw the player did not take is still in the head, and it is worth more than the bounty to everybody in town. Whoever explains it colours it. Tamsin makes it a rule, Fia makes it a scandal, and the notice makes it a puzzle with a struck-through name on it.',
          enterWhen: { flagsSet: ['registered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'tamsin_quoted_it',
              label: 'Get Tamsin Wick to read you the rule',
              predicate: { minRelationship: [{ characterId: 'tamsin', dimension: 'trust', value: 35 }] },
              setsFlags: ['knows:rule_twelve'],
              closesFlags: [],
            },
            {
              routeId: 'fia_explained',
              label: 'Let Fia Quenby explain it, at length',
              predicate: { flagsSet: ['spoke:fia'] },
              setsFlags: ['knows:rule_twelve', 'fia_on_your_side'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_notice',
              label: 'Read the bounty notice yourself',
              predicate: { hasItems: ['wyvern_notice'] },
              setsFlags: ['knows:rule_twelve', 'saw_the_crossed_name'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:the_eye_stone'],
            abilities: ['crack_the_eye'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_whose_kill',
      title: 'Whose Kill Is It',
      summary: 'Three hundred gold of bounty, fifteen levels of draw in a stone, and a rule that says neither can be yours.',
      kind: 'MAIN',
      involvedCharacterIds: ['gale', 'tamsin', 'orsk', 'harl', 'marguerite'],
      involvedLocationIds: ['guild_hall', 'carcass_yard', 'ascent_house'],
      knownRewardCopy: 'A name on the kill, and whatever happens to the eye-stone before it fades.',
      discoverWhen: { flagsSet: ['registered'] },
      steps: [
        {
          id: 'the_first_night',
          playerCopy: 'Get the head through its first night. Gale wants the stone, the Ascent House wants to buy it, and the hall wants it in the yard.',
          directorNotes:
            'The head sleeps in the carcass yard, whose gate lock has not worked since spring. Gale is coming over the wall after midnight with a hammer, and Marguerite has already sent an offer. None of these is the right answer. Guarding it is honest and leaves the player exhausted; selling it makes them rich and hands fifteen levels to a stranger; cracking it decides who in this town gets stronger; going to bed lets Gale decide.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'guarded_it',
              label: 'Sleep in the carcass yard beside it',
              predicate: { atLocation: 'carcass_yard', afterWorldMinute: 22 * 60 },
              setsFlags: ['guarded_the_head'],
              closesFlags: ['sold_the_stone'],
            },
            {
              routeId: 'caught_gale',
              label: 'Catch Gale over the yard wall with a hammer',
              predicate: { atLocation: 'carcass_yard', flagsSet: ['gale_tried_the_stone'] },
              setsFlags: ['caught_gale_at_the_yard', 'guarded_the_head'],
              closesFlags: [],
            },
            {
              routeId: 'sold_it',
              label: 'Sell the eye-stone to the Ascent House, uncracked',
              predicate: { atLocation: 'ascent_house', flagsSet: ['used:name_a_price', 'knows:the_eye_stone'] },
              setsFlags: ['sold_the_stone'],
              closesFlags: ['guarded_the_head', 'stone_cracked'],
            },
            {
              routeId: 'cracked_it',
              label: 'Crack the eye-stone and choose whose hands are on it',
              predicate: { flagsSet: ['used:crack_the_eye'] },
              setsFlags: ['stone_cracked'],
              closesFlags: ['sold_the_stone'],
            },
            {
              routeId: 'went_to_bed',
              label: 'Leave it in the yard and get some sleep',
              predicate: { flagsSet: ['gale_tried_the_stone'], flagsUnset: ['guarded_the_head'] },
              setsFlags: ['stone_cracked', 'gale_took_the_draw'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_guild', amount: 5 }],
          },
        },
        {
          id: 'the_claim',
          playerCopy: 'Get the kill entered under a name. Yours, if you can.',
          directorNotes:
            'Orsk will rule, but only on something the whole hall can see. The proving in the yard is that: show the blow, in public, and the kill is yours whatever the crystal says. Exposing Gale works too, and costs Gale everything. Letting his party have it is a real choice for a player who took the silver, and it is not the end of their story.',
          enterWhen: { flagsSet: ['first_night_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'orsk_ruled',
              label: 'Get Guildmaster Orsk to rule on it',
              predicate: { minRelationship: [{ characterId: 'orsk', dimension: 'respect', value: 45 }] },
              setsFlags: ['kill_is_yours'],
              closesFlags: ['gale_got_the_kill'],
            },
            {
              routeId: 'passed_the_proving',
              label: 'Pass the guild’s proving in the yard, in front of everyone',
              predicate: { atLocation: 'carcass_yard', flagsSet: ['proving_called', 'used:full_swing'] },
              setsFlags: ['kill_is_yours', 'passed_the_proving'],
              closesFlags: ['gale_got_the_kill'],
            },
            {
              routeId: 'exposed_gale_for_it',
              label: 'Make the hall hear what Gale’s party did on the ridge',
              predicate: { atLocation: 'guild_hall', flagsSet: ['knows:the_left_porter', 'used:say_it_plain'] },
              setsFlags: ['kill_is_yours', 'gale_exposed'],
              closesFlags: ['gale_got_the_kill', 'porter_for_gale'],
            },
            {
              routeId: 'gave_it_to_gale',
              label: 'Let his party’s name go on it',
              predicate: { flagsSet: ['porter_for_gale'] },
              setsFlags: ['gale_got_the_kill'],
              closesFlags: ['kill_is_yours'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['claim_settled'],
            abilities: [],
            reputation: [
              { factionId: 'faction_guild', amount: 10 },
              { factionId: 'faction_parties', amount: 10 },
              { factionId: 'faction_town', amount: 5 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_porter',
      title: 'The Porter on the Ridge',
      summary: 'Eight days ago a ranked party came back from Scald Ridge one person short, and the man who was missing now keeps the carcass yard.',
      kind: 'SIDE',
      involvedCharacterIds: ['harl', 'gale', 'tamsin'],
      involvedLocationIds: ['carcass_yard', 'guild_hall', 'scald_ridge'],
      knownRewardCopy: 'What happened to the last person who carried for Gale, and what you do with it.',
      discoverWhen: { flagsSet: ['spoke:harl'] },
      steps: [
        {
          id: 'hear_it',
          playerCopy: 'Find out what happened to the last person who carried for Gale.',
          directorNotes:
            'Harl will joke about it before he tells it. Tamsin has it in the day book as two words in a margin. The ridge has it in a trodden banner and a torn-off corner of cloth. All three are true and none of them is the whole thing.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'harl_told_you',
              label: 'Get Harl Benning to tell you himself',
              predicate: { minRelationship: [{ characterId: 'harl', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:the_left_porter', 'harl_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_day_book',
              label: 'Read Tamsin’s day book',
              predicate: { hasItems: ['day_book'] },
              setsFlags: ['knows:the_left_porter', 'took_the_day_book'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_camp',
              label: 'Find the abandoned camp on the ridge',
              predicate: { atLocation: 'scald_ridge', flagsSet: ['used:track_it'] },
              setsFlags: ['knows:the_left_porter', 'found_the_camp'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['harl_story_known'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what to do with what Gale’s party did.',
          directorNotes:
            'Saying it in the hall breaks the Ninefold in an afternoon and makes Gale an enemy for life. Using it privately makes him owe you, which is useful and a little dirty. Leaving it to Harl respects the only person it actually happened to. Harl has an opinion about each and will say so.',
          enterWhen: { flagsSet: ['harl_story_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_the_hall',
              label: 'Say it out loud in the guild hall',
              predicate: { atLocation: 'guild_hall', flagsSet: ['used:say_it_plain'] },
              setsFlags: ['gale_exposed'],
              closesFlags: ['kept_it_quiet', 'gale_owes_you'],
            },
            {
              routeId: 'leaned_on_gale',
              label: 'Use it on Gale, privately',
              predicate: { flagsSet: ['used:name_a_price', 'spoke:gale'] },
              setsFlags: ['gale_owes_you'],
              closesFlags: ['gale_exposed'],
            },
            {
              routeId: 'left_it_to_harl',
              label: 'Leave it for Harl to decide',
              predicate: { flagsSet: ['spoke:harl'], minRelationship: [{ characterId: 'harl', dimension: 'trust', value: 50 }] },
              setsFlags: ['kept_it_quiet'],
              closesFlags: ['gale_exposed'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['porter_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_town', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_mate',
      title: 'The Second Wyvern',
      summary: 'Wyverns pair for life. The dead one’s mate is following the smell of its partner’s draw, and the head is in the middle of town.',
      kind: 'MAIN',
      involvedCharacterIds: ['harl', 'fia', 'orsk'],
      involvedLocationIds: ['scald_ridge', 'the_nest', 'old_watch', 'ford_square', 'east_road'],
      knownRewardCopy: 'Whether Kestrel Ford is still standing on the fourth morning, and who it thanks.',
      discoverWhen: { flagsSet: ['knows:the_mate'] },
      steps: [
        {
          id: 'find_it',
          playerCopy: 'Find out where the mate is and how long the town has.',
          directorNotes:
            'Harl saw the nest and has been keeping it to himself out of fear. Fia can work out the timing from sightings and a map, out loud, with charts. A player who goes up the ridge with Woodcraft can simply read it off the mountain.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'tracked_it',
              label: 'Track it from the ridge',
              predicate: { atLocation: 'scald_ridge', flagsSet: ['used:track_it'] },
              setsFlags: ['knows:where_the_nest_is'],
              closesFlags: [],
            },
            {
              routeId: 'harl_showed_you',
              label: 'Get Harl to draw you the way',
              predicate: { minRelationship: [{ characterId: 'harl', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:where_the_nest_is', 'harl_came_round'],
              closesFlags: [],
            },
            {
              routeId: 'fia_worked_it_out',
              label: 'Let Fia work it out from the sightings',
              predicate: { flagsSet: ['spoke:fia'], minRelationship: [{ characterId: 'fia', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:where_the_nest_is', 'fia_worked_it_out'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['mate_located'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'face_it',
          playerCopy: 'Decide how the town meets it: at the nest, at the old watch, in the square, or somewhere far away.',
          directorNotes:
            'The mate is grieving and enormous, and it is not evil. The player can kill it alone at the nest, which is the most impressive thing anybody in the valley has seen and nobody sees it; hold the old watch with the town using the founders’ way, which needs people; meet it in the square when it comes, which costs roofs; or drag the head into the high country and let it follow them instead. A player who carried for Gale can carry for him again while his party tries, and that is a story too.',
          enterWhen: { flagsSet: ['knows:the_mate'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_to_the_nest',
              label: 'Go up to the nest and finish it there, alone',
              predicate: { atLocation: 'the_nest', flagsSet: ['used:full_swing'] },
              setsFlags: ['killed_the_mate', 'alone_at_the_nest'],
              closesFlags: ['the_town_held'],
            },
            {
              routeId: 'held_the_watch',
              label: 'Hold the old watch with the town and bring it down from the air',
              predicate: { atLocation: 'old_watch', flagsSet: ['used:founders_cut'] },
              setsFlags: ['killed_the_mate', 'the_town_held'],
              closesFlags: ['alone_at_the_nest'],
            },
            {
              routeId: 'met_it_in_the_square',
              label: 'Meet it in the square when it comes',
              predicate: { atLocation: 'ford_square', flagsSet: ['the_mate_came', 'used:full_swing'] },
              setsFlags: ['killed_the_mate'],
              closesFlags: [],
            },
            {
              routeId: 'led_it_away',
              label: 'Drag the head into the high country and let it follow you',
              predicate: { atLocation: 'east_road', hasItems: ['wyvern_head'], flagsSet: ['used:show_the_head'] },
              setsFlags: ['led_it_away'],
              closesFlags: ['killed_the_mate'],
            },
            {
              routeId: 'carried_for_the_parties',
              label: 'Carry for Gale’s party while they try',
              predicate: { flagsSet: ['porter_for_gale', 'the_mate_came'] },
              setsFlags: ['gale_tried_the_mate'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['mate_answered'],
            abilities: [],
            reputation: [
              { factionId: 'faction_town', amount: 20 },
              { factionId: 'faction_guild', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_rafters',
      title: 'Five Skulls on the Rafters',
      summary: 'The five oldest wyverns in the hall have brass plates under them with names and years, and no levels.',
      kind: 'LEAD',
      involvedCharacterIds: ['orsk', 'fia', 'marguerite'],
      involvedLocationIds: ['guild_hall', 'orsk_loft'],
      knownRewardCopy: 'Why the crystal says 1, and who else it once said it about.',
      discoverWhen: { flagsSet: ['knows:the_rafters'] },
      steps: [
        {
          id: 'ask_about_them',
          playerCopy: 'Find out who killed the five wyverns on the guild hall rafters.',
          directorNotes:
            'This whole lead is optional and must feel like it. A player who never looks up at the rafters and never shows Orsk the full swing never hears a word of it. For a player who is here, keep it quiet and physical: brass plates, a locked chest, an old man deciding whether to trust somebody. Nobody announces a destiny. The founders were people like the player, and the crystal came later.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'orsk_showed_you',
              label: 'Get Orsk to open the chest in his loft',
              predicate: { atLocation: 'orsk_loft', minRelationship: [{ characterId: 'orsk', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_founders_way', 'saw_the_charter', 'orsk_trusts_you'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_charter',
              label: 'Take the charter from the loft without asking',
              predicate: { hasItems: ['founders_charter'] },
              setsFlags: ['knows:the_founders_way', 'stole_the_charter'],
              closesFlags: ['orsk_trusts_you'],
            },
            {
              routeId: 'fia_proved_it',
              label: 'Help Fia prove what the crystal does not count',
              predicate: {
                flagsSet: ['fia_on_your_side', 'used:read_the_room'],
                minRelationship: [{ characterId: 'fia', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_founders_way', 'fia_proved_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:what_the_crystal_counts'],
            abilities: ['founders_cut'],
            reputation: [],
          },
        },
        {
          id: 'what_the_hall_hears',
          playerCopy: 'Decide whether the guild finds out what its crystal does not count.',
          directorNotes:
            'Telling the hall breaks the draw trade in this valley and nearly breaks the guild, which needs its money. Keeping it quiet is what Orsk has done his whole life and he will not pretend it was easy. Selling it to Marguerite makes the player rich and makes sure nobody ever hears it. All three are defensible, and the hall will feel the difference for years.',
          enterWhen: { flagsSet: ['knows:what_the_crystal_counts'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_it_under_the_skulls',
              label: 'Tell the whole hall, under the skulls',
              predicate: { atLocation: 'guild_hall', flagsSet: ['used:say_it_plain'] },
              setsFlags: ['crystal_exposed'],
              closesFlags: ['kept_the_secret', 'sold_the_secret'],
            },
            {
              routeId: 'kept_the_secret',
              label: 'Keep it between you and Orsk',
              predicate: { flagsSet: ['spoke:orsk'] },
              setsFlags: ['kept_the_secret'],
              closesFlags: ['crystal_exposed'],
            },
            {
              routeId: 'sold_the_secret',
              label: 'Sell your silence to the Ascent House',
              predicate: { atLocation: 'ascent_house', flagsSet: ['used:name_a_price'] },
              setsFlags: ['sold_the_secret'],
              closesFlags: ['crystal_exposed'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['rafters_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_guild', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_fia',
      title: 'The Mage Who Measured',
      summary: 'Fia Quenby believes you because of an angle on a wound. Her own number is thirty-one, and she flinches every time somebody reads it out.',
      kind: 'SIDE',
      involvedCharacterIds: ['fia', 'gale', 'marguerite'],
      involvedLocationIds: ['apothecary_attic', 'guild_hall', 'carcass_yard'],
      knownRewardCopy: 'What her level thirty-one is hiding, and what the two of you are to each other.',
      discoverWhen: { flagsSet: ['spoke:fia'] },
      steps: [
        {
          id: 'her_number',
          playerCopy: 'Find out what Fia’s level thirty-one is hiding.',
          directorNotes:
            'Being told is the version where she trusts the player. Hearing it from Gale is the version where it is a joke at her expense first, and she will know who told. Reading her charts is the version where the player knows something she did not give them.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself',
              predicate: { minRelationship: [{ characterId: 'fia', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:fias_number', 'fia_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'gale_told_you',
              label: 'Gale tells you, as a joke',
              predicate: { flagsSet: ['spoke:gale', 'porter_for_gale'] },
              setsFlags: ['knows:fias_number', 'heard_it_from_gale'],
              closesFlags: ['fia_told_you'],
            },
            {
              routeId: 'read_her_charts',
              label: 'Read her own page in her charts',
              predicate: { hasItems: ['fia_charts'] },
              setsFlags: ['knows:fias_number', 'read_her_charts'],
              closesFlags: ['fia_told_you'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['fia_number_known'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'partners',
          playerCopy: 'Decide what you and Fia are to each other.',
          directorNotes:
            'She wants a partner who chose her for what she can actually do, and she is braced for being told it is not enough. Partnership, something more, or a friendly parting are all real outcomes. If it becomes romance it is slow, awkward and kind, and goes no further than a kiss.',
          enterWhen: { flagsSet: ['fia_number_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'partnered',
              label: 'Register as a party of two',
              predicate: { minRelationship: [{ characterId: 'fia', dimension: 'trust', value: 65 }] },
              setsFlags: ['fia_partner'],
              closesFlags: ['fia_went_her_own_way'],
            },
            {
              routeId: 'more_than_partners',
              label: 'Tell her it is not only about the work',
              predicate: {
                minRelationship: [
                  { characterId: 'fia', dimension: 'trust', value: 65 },
                  { characterId: 'fia', dimension: 'affection', value: 70 },
                ],
              },
              setsFlags: ['fia_partner', 'fia_romance'],
              closesFlags: ['fia_went_her_own_way'],
            },
            {
              routeId: 'parted_friends',
              label: 'Let her go her own way',
              predicate: { flagsSet: ['spoke:fia'] },
              setsFlags: ['fia_went_her_own_way'],
              closesFlags: ['fia_partner'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['fia_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_orsk_saw_the_swing',
      atWorldMinute: 11 * 60 + 40,
      locationId: 'guild_hall',
      publicCopy:
        'The door at the top of the back stairs is open, and the guildmaster is standing in it, leaning on his stick, looking at you rather than at the head.',
      directorNotes:
        'Only for a player who has used the full swing where it could be seen. Orsk has waited his whole life to see that and he does not show it. He says one word, probably "Up", and goes back into his loft. This opens the rafters lead.',
      setsFlags: ['knows:the_rafters', 'orsk_saw_the_swing'],
      cancelledByFlags: [],
      requiresFlags: ['used:full_swing'],
      movesCharacters: [{ characterId: 'orsk', toLocationId: 'guild_hall' }],
    },
    {
      id: 'we_the_offer',
      atWorldMinute: 15 * 60,
      locationId: 'guild_hall',
      publicCopy:
        'A runner in Ascent House grey puts a sealed letter on the counter with your name spelled wrong on it, and waits to be told there is no reply.',
      directorNotes:
        'Four hundred gold for the eye-stone, uncracked. More than the bounty. Marguerite expects a yes by tomorrow and has already told her client it is done. Tamsin watches the letter change hands and writes something small. Not if the stone is already cracked or sold.',
      setsFlags: ['ascent_made_an_offer'],
      cancelledByFlags: ['stone_cracked', 'sold_the_stone'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_carter',
      atWorldMinute: 19 * 60 + 30,
      locationId: 'ford_square',
      publicCopy:
        'A carter drives into the square far too fast and white to the lips: something with a wingspan like a barn roof crossed the east road at dusk, heading for the ridge.',
      directorNotes:
        'The mate. Everybody in the square hears it, and within an hour everybody in town is looking at the head in the yard and doing arithmetic. Harl goes very quiet. The parties start pricing a second bounty.',
      setsFlags: ['knows:the_mate'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_gale_at_the_yard',
      atWorldMinute: 24 * 60 + 40,
      locationId: 'carcass_yard',
      publicCopy:
        'Three shapes come over the carcass yard wall with a shuttered lantern. One of them is carrying a jeweller’s hammer and walking the way Gale Marrick walks.',
      directorNotes:
        'Gale and two of the Ninefold, after the eye-stone. If the player is here, this is a fight in the dark that Gale very much does not want, and a conversation he wants even less. If nobody is here, he cracks it, takes fifteen levels by morning, and the scent of the dead wyvern is now on him. Not if the stone is already cracked or sold.',
      setsFlags: ['gale_tried_the_stone'],
      cancelledByFlags: ['stone_cracked', 'sold_the_stone'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'gale', toLocationId: 'carcass_yard' }],
    },
    {
      id: 'we_the_heir_arrives',
      atWorldMinute: 24 * 60 + 9 * 60,
      locationId: 'ascent_house',
      publicCopy:
        'A coach with a crest on the door pulls up outside the Ascent House, and a tall, pleasant man of about thirty in armour so new it squeaks gets out and asks which one is the wyvern.',
      directorNotes:
        'Marguerite’s client, promised a wyvern’s worth of draw by spring. Pleasant, rich, completely unaware of how any of this works, and a living example of what the crystal actually measures. Gale is suddenly very attentive.',
      setsFlags: ['the_heir_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_rafters_by_daylight',
      atWorldMinute: 24 * 60 + 10 * 60,
      locationId: 'guild_hall',
      publicCopy:
        'Morning light through the high windows reaches the rafters, and you notice the five old skulls have brass plates under them. Names and years. No levels.',
      directorNotes:
        'Only for a player who has been looking around the hall rather than at the people in it. It is a small factual oddity, not an omen. This opens the rafters lead.',
      setsFlags: ['knows:the_rafters'],
      cancelledByFlags: [],
      requiresFlags: ['used:read_the_room'],
      movesCharacters: [],
    },
    {
      id: 'we_the_proving',
      atWorldMinute: 24 * 60 + 12 * 60,
      locationId: 'carcass_yard',
      publicCopy:
        'The hall bell rings twice. The guildmaster has called a proving in the yard: whoever can show the hall the blow that killed that wyvern gets the kill.',
      directorNotes:
        'Orsk’s way of overruling Rule Twelve with a reason the whole hall can see. Half the town crowds the yard walls. Gale is expected to try, and knows he cannot land that blow. Tamsin brings the day book. Only once the head has got through its first night, and not if the kill has already been settled.',
      setsFlags: ['proving_called'],
      cancelledByFlags: ['claim_settled'],
      requiresFlags: ['first_night_over'],
      movesCharacters: [
        { characterId: 'orsk', toLocationId: 'carcass_yard' },
        { characterId: 'tamsin', toLocationId: 'carcass_yard' },
      ],
    },
    {
      id: 'we_the_cattle',
      atWorldMinute: 24 * 60 + 22 * 60,
      locationId: 'east_road',
      publicCopy:
        'On the ford meadow a cow is gone, and the fence around where it stood is flattened outward, from above.',
      directorNotes:
        'The mate is hunting close now. The herders come to the guild, the guild has nobody it trusts with a wyvern, and everyone knows who dragged the last one in.',
      setsFlags: ['mate_hunting'],
      cancelledByFlags: ['mate_answered', 'led_it_away'],
      requiresFlags: ['knows:the_mate'],
      movesCharacters: [],
    },
    {
      id: 'we_the_mate_comes',
      atWorldMinute: 2 * 1440 + 23 * 60 + 30,
      locationId: 'ford_square',
      publicCopy:
        'The bell on the old watch rings for the first time in sixty years, and something huge comes down out of the dark over the ford.',
      directorNotes:
        'It follows the smell: to the head, or to whoever cracked the stone. Roofs, carts, screaming, and no names lost unless the player lets it come to that. Write it fast and frightening and never gory. If nobody stops it, it takes what it came for and goes.',
      setsFlags: ['the_mate_came'],
      cancelledByFlags: ['mate_answered', 'led_it_away'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'fia', toLocationId: 'ford_square' },
        { characterId: 'harl', toLocationId: 'ford_square' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_number',
      kind: 'MYSTERY',
      label: 'Why the crystal says 1',
      seedHint: 'The crystal hesitates before it lights up your number, and Fia says it has never once done that.',
      payoffHint: 'Five skulls on the rafters, a charter in a locked chest, and the founders’ line: we take nothing from the dead.',
      weight: 0.6,
    },
    {
      id: 'p_gale',
      kind: 'RIVAL',
      label: 'What Gale’s smile is covering',
      seedHint: 'He looks at the head the whole time he talks to you, and never at its eye.',
      payoffHint: 'Eight days ago his party met this wyvern first, ran, and left their porter on the ridge.',
      weight: 0.85,
    },
    {
      id: 'p_the_mate',
      kind: 'BOSS',
      label: 'The second wyvern',
      seedHint: 'Harl says, to nobody, that wyverns are like swans about some things.',
      payoffHint: 'It comes for the head at night, over the ford, and the old watch rings for the first time in sixty years.',
      weight: 0.9,
    },
    {
      id: 'p_fia',
      kind: 'RELATIONSHIP',
      label: 'Fia, whose number is too high',
      seedHint: 'She is the only person in the hall measuring the wound instead of laughing.',
      payoffHint: 'Level thirty-one, twenty-six of it bought by her family, and three spells, one of which warms tea.',
      weight: 0.75,
    },
    {
      id: 'p_the_tag',
      kind: 'FINALE',
      label: 'What the hall writes under your name',
      seedHint: 'One iron tag on a leather cord, stamped 1.',
      payoffHint: 'Whether the guild changes the number, the rule, or neither, and what Tamsin writes in the margin.',
      weight: 1,
    },
  ],
  archetypes: [
    {
      id: 'arch_hermit',
      name: 'The Hermit’s Disciple',
      role: 'Sword technique, ten years of it',
      summary: 'An old swordsman on a mountain taught you one cut for ten years, so your blade work is the best in the hall and you have not held a real conversation since.',
      playstyle: ['One perfect cut', 'Patient', 'Awkward with people'],
      blurb: 'He never told you his name. He told you the cut was finished when the thing in front of it did not know it had happened.',
      attributeBonus: { might: 2, agility: 2 },
      skillProficiencies: { blade: 3, footwork: 1 },
      startingItems: [{ itemId: 'notched_sword', qty: 1 }],
      startingAbilities: ['full_swing', 'hold_back'],
      startingReputation: [],
    },
    {
      id: 'arch_woodcutter',
      name: 'The Woodcutter',
      role: 'Raw strength and woodcraft',
      summary: 'You spent ten years felling and hauling timber out of the deep forest alone, so you are enormously strong, you can track anything, and you have never started a fight.',
      playstyle: ['Strong', 'Tracker', 'Slow to anger'],
      blurb: 'The deep forest has things in it bigger than a wyvern. You never killed any of them. You just learned which way they went.',
      attributeBonus: { might: 3, mind: 1 },
      skillProficiencies: { woodcraft: 3, blade: 1, notice: 1 },
      startingItems: [{ itemId: 'felling_axe', qty: 1 }],
      startingAbilities: ['full_swing', 'track_it'],
      startingReputation: [{ factionId: 'faction_town', amount: 5 }],
    },
    {
      id: 'arch_soldier',
      name: 'The Discharged Soldier',
      role: 'Shield-line discipline and nerve',
      summary: 'Six years on a border shield line, where the officers kept every kill, taught you to hold ground, take a hit, and spot a superior who is lying to you.',
      playstyle: ['Holds the line', 'Disciplined', 'Reads authority'],
      blurb: 'You were never once promoted, because the officers took the last blow on everything and wrote their own numbers up. You held the line anyway.',
      attributeBonus: { resolve: 2, might: 1, agility: 1 },
      skillProficiencies: { footwork: 2, notice: 2, candour: 1 },
      startingItems: [{ itemId: 'dented_shield', qty: 1 }],
      startingAbilities: ['full_swing', 'read_the_room'],
      startingReputation: [{ factionId: 'faction_parties', amount: 10 }],
    },
    {
      id: 'arch_farmhand',
      name: 'The Farmhand',
      role: 'Hard work, stubbornness, plain talk',
      summary: 'You worked a hill farm and saw off whatever came for the sheep with a fence post, so you are tougher than you look, people trust you, and nobody ever told you how strong is meant to feel.',
      playstyle: ['Tough', 'Down to earth', 'Underestimated'],
      blurb: 'The wyvern took two sheep. You took the fence post out of the bottom field. It seemed fair at the time.',
      attributeBonus: { resolve: 2, presence: 1, might: 1 },
      skillProficiencies: { candour: 2, bargain: 2, woodcraft: 1 },
      startingItems: [{ itemId: 'fence_post', qty: 1 }],
      startingAbilities: ['full_swing', 'say_it_plain'],
      startingReputation: [{ factionId: 'faction_town', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name do you give at the counter?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Rowan Hale' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'Where did your strength come from?',
      helpText:
        'Your life before this town, which is where your real strength came from and what you are good at. It is fixed for the whole story. It does not change the crystal’s reading, whether you take Gale’s silver, or what you do with the head. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the hall notice about you first?',
      helpText: 'One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have not slept, I smell of wyvern, and I keep apologising for the floor.',
    },
    {
      id: 'how_you_take_it',
      label: 'The hall is laughing. What is your first instinct?',
      helpText: 'A starting temperament, not a commitment. You can do the opposite on turn one and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'let_them', label: 'Let them laugh. The head is on the floor either way' },
        { id: 'show_them', label: 'Show them, right now, in front of everybody' },
        { id: 'get_paid', label: 'Work out how to get paid before anything else' },
        { id: 'stay_small', label: 'Stay a level one for as long as that is useful' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the hall see at the counter?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Muddy to the knees, rope burns on both hands, and not even slightly out of breath.',
    },
  ],
  /**
   * Twelve, because the narrator reads the first twelve and no more.
   *
   * Three of these are the town or the player losing something and none is
   * written as a punishment. "The Ford Burned" is reachable by being slow and
   * careful, which is the honest failure of a town with one person in it who
   * can kill a wyvern. "Carry Your Lizard Home" is walking out, and it is
   * available early. Only "The Sixth Skull" and "Level One, Officially" need the
   * optional rafters lead; everything else is reachable by a player who never
   * once asks why the crystal says 1.
   */
  endings: [
    {
      id: 'end_a_silver_a_day',
      name: 'A Silver a Day',
      rarity: 'COMMON',
      minTurn: 20,
      requires: { flagsSet: ['porter_for_gale', 'gale_got_the_kill'] },
      condition:
        'The player took the silver and carried for the Ninefold, and the Ninefold’s name went on the wyvern. Write it bitter-funny, never as a failure: a wyvern slayer carrying pots up a mountain for a man who could not have landed that blow, getting paid on time, and knowing something about the party that the party does not know about itself.',
      epilogue:
        'The Ninefold makes A-rank in the spring. Their porter carries the heaviest load in the valley without breathing hard, eats twice as much as anyone, and has a way of being exactly where the trouble is a second before it arrives. Gale pays on time, every week, and never once turns his back on them.',
      hint: '',
    },
    {
      id: 'end_on_the_board',
      name: 'On the Board',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['kill_is_yours', 'claim_settled'], flagsUnset: ['crystal_exposed', 'left_the_map'] },
      condition:
        'The kill went into the book under the player’s name and the crystal still says 1. The guild did not change; it made one exception, in public, and wrote it down. Play it as a quiet win: a level one on the B-rank board, a bounty paid, and a hall that has stopped laughing and started asking for help with jobs.',
      epilogue:
        'Tamsin had to cut a new line on the board, under B-rank and above nothing, because there was nowhere to write a level one with a wyvern. It says the player’s name and one number. People stop in front of it on their way in. Nobody laughs at the counter any more when a new member’s reading comes out low.',
      hint: '',
    },
    {
      id: 'end_the_ford_burned',
      name: 'The Ford Burned',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['the_mate_came'], flagsUnset: ['killed_the_mate', 'led_it_away'] },
      condition:
        'The mate came down on Kestrel Ford and nobody stopped it. This is not a punishment for playing badly: one person who can kill a wyvern was in the wrong place, or chose not to, and the town paid in roofs and carts and a night it will not forget. Nobody with a name dies unless the run has already made that true. Write the morning after, plainly.',
      epilogue:
        'The bridge stands. Half the square does not. The head is gone from the yard, carried off into the dark by the only thing that ever wanted it for itself. The guild posts a new bounty with a larger number on it, and the crystal on the counter keeps telling everybody exactly what they have taken from the dead.',
      hint: 'Wyverns pair for life, and the old watch bell has not rung in sixty years.',
    },
    {
      id: 'end_wyvern_slayer_twice',
      name: 'Wyvern Slayer, Twice',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['killed_the_mate', 'mate_answered'] },
      condition:
        'The player killed the mate as well as the first one. However the guild ruled and whatever the crystal says, the valley now has a story it will tell for a century. Play the second kill as hard won, and play the town afterwards as changed in small specific ways rather than with a parade.',
      epilogue:
        'Two heads in one week, and the crystal still says 1. The herders on the ford meadow start a drinking game at the inn in which one of them is a level one and everyone else has to guess how strong they really are. The carters drive the east road after dark again. Somebody paints a wyvern on the inn sign, badly.',
      hint: '',
    },
    {
      id: 'end_over_the_ridge',
      name: 'Over the Ridge',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['led_it_away'] },
      condition:
        'The player dragged the head out of town and into the high country, and the mate followed them instead of coming down on Kestrel Ford. Nobody saw what happened up there. Write the town waiting, and the player coming back down the east road a month later, alone, thinner, and not saying much.',
      epilogue:
        'They come back on foot with no head and no rope, and the town that laughed at them lines the east road. Harl is at the front of it, on his cane, and does not make a joke. Whatever happened in the high country stays there. The sky over the ford is only sky.',
      hint: '',
    },
    {
      id: 'end_four_hundred_gold',
      name: 'Four Hundred Gold',
      rarity: 'UNCOMMON',
      minTurn: 22,
      requires: { flagsSet: ['sold_the_stone'], flagsUnset: ['kill_is_yours'] },
      condition:
        'The player sold the eye-stone to the Ascent House and walked away rich. Somewhere a pleasant heir is fifteen levels stronger on paper and no better with a sword. This is a perfectly sane thing to have done and should be written as one, with the specific discomfort of knowing exactly what was bought.',
      epilogue:
        'Four hundred gold buys a lot in a frontier town: a good horse, a year of not needing anybody’s silver, and a front-row seat when the heir in squeaking armour is carried to his next kill. The crystal reads him at fifty-three. Marguerite sends a card every midwinter, addressed to a level one, spelled correctly.',
      hint: '',
    },
    {
      id: 'end_carry_your_lizard_home',
      name: 'Carry Your Lizard Home',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of Kestrel Ford, with or without the head, and did not look back. Do not make this a tragedy and do not redeem it. A town that measures people by a number it bought was never going to measure this one properly, and leaving is a complete answer.',
      epilogue:
        'The guild crosses the name out of the book, then crosses out the crossing out. Gale tells the story of the level one who walked away from a silver a day as a joke for about a month, and then stops telling it. In the next valley over, a new member puts a hand on a different crystal, and it says 1.',
      hint: '',
    },
    {
      id: 'end_the_porters_due',
      name: 'The Porter’s Due',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['gale_exposed', 'porter_settled'] },
      condition:
        'The hall heard what the Ninefold did on Scald Ridge, and Harl was paid what he was owed. This is not about destroying Gale. It is about one man who was left behind being counted again. Let Gale be smaller and human in it, and let Harl get the last word.',
      epilogue:
        'The Ninefold is the Sevenfold by midsummer and the Fivefold by autumn. Gale pays Harl a porter’s wage for every day since the ridge, in coin, at the counter, with Tamsin stamping each one. Harl buys a better cane and has the old rope coiled and hung in the yard shed, where he can see it.',
      hint: '',
    },
    {
      id: 'end_the_old_watch_held',
      name: 'The Old Watch Held',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['the_town_held', 'killed_the_mate'],
        minFactionReputation: [{ factionId: 'faction_town', value: 40 }],
      },
      condition:
        'The town held the old watch together and the player brought the mate down out of the air the way the founders did, under the wing. It is a shared victory and must be written as one: Fia on the bell, Harl on the bolt-thrower crank, the smith with a bolt on his shoulder, and the player doing the one thing only they can.',
      epilogue:
        'The bolt-thrower on the old watch is oiled again, and the smith takes anyone who asks up there on Sundays to learn the crank. The founders’ bell gets rung once a year now, on the night it rang last. Nobody ever agrees afterwards on who did the most, which is how the player wanted it.',
      hint: '',
    },
    {
      id: 'end_two_wrong_numbers',
      name: 'Two Wrong Numbers',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['fia_partner', 'claim_settled'],
        minRelationship: [{ characterId: 'fia', dimension: 'trust', value: 65 }],
      },
      condition:
        'The player and Fia registered as a party of two: a level one who kills wyverns and a level thirty-one who can barely cast in public. Write the partnership, not the romance, even if there is romance in it. The joke is that every number on their registration is wrong, and the work they take is the work nobody else will.',
      epilogue:
        'Tamsin enters the party as "Two" because neither of them would pick a name. They take the jobs the ranked parties turn down: the wrong-sized monsters, the bounties with struck-through names. Fia learns a fourth spell in the autumn. It is not the tea one. She measures everything it does.',
      hint: '',
    },
    {
      id: 'end_level_one_officially',
      name: 'Level One, Officially',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['kept_the_secret', 'mate_answered'],
        minRelationship: [{ characterId: 'orsk', dimension: 'trust', value: 50 }],
      },
      condition:
        'The player learned what the crystal does not count and kept it between themselves and Orsk. The guild did not change, the draw trade did not break, and the hall has an unlisted wyvern hand who reads 1. Write the cost honestly: a secret kept for good reasons is still a secret, and Orsk knows exactly what it weighs.',
      epilogue:
        'Every few months a bounty comes in that nobody on the board can touch, and it quietly disappears from the notice board, and a week later the thing it was for stops being a problem. The day book records it as "handled by the hall". Orsk teaches them the founders’ cut on the yard flagstones, at night, until his knee will not let him.',
      hint: '',
    },
    {
      id: 'end_the_sixth_skull',
      name: 'The Sixth Skull',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['crystal_exposed', 'killed_the_mate', 'rafters_answered'],
        minFactionReputation: [{ factionId: 'faction_guild', value: 40 }],
      },
      condition:
        'The player told the hall what the crystal counts, killed the mate, and the guild changed its rules in public. This is the biggest ending in the story and should be earned on the page, not announced: a crystal taken off a counter, a rule struck out by the person who stamped it for years, and a skull raised to the rafters by people who laughed.',
      epilogue:
        'The crystal stays in the hall, on a shelf, with a card under it in Tamsin’s small hand: Measures draw taken. Does not measure anything else. The sixth skull goes up beside the founders’ five, with a brass plate that has a name and a year on it, and no level.',
      hint: 'The plates on the rafters have names and years, and nothing else.',
    },
  ],
  /**
   * The cover is Fia, because she is the one person in the opener who is not
   * laughing, and the head stays behind her as a prop: closed eyes, no wound.
   * The crystal glows and says nothing, so the only words in the art are the
   * title. Fia is described by build, costume and pose, never by an age word,
   * and every glow stays on the crystal, the tape and the title, off her face.
   */
  coverDirection: [
    'SUBJECT: Fia Quenby, a mage, alone and unmistakable in the foreground of a key visual for a fantasy adventure anime about a guild that measured somebody wrong.',
    'She fills the frame from the waist up, slightly off centre, holding about two thirds of the picture.',
    'Lean and quick, a cloud of copper hair held back by a chalk-dusted ribbon, bright green eyes, freckles, a plum-coloured mage’s coat with brass buttons and sleeves shoved past the elbow, and a tailor’s measuring tape worn round her neck like a scarf.',
    'She holds the measuring tape stretched taut between both hands toward the viewer and grins, delighted, as if she has just proved something to a room that laughed at her.',
    'HER FACE STAYS CLEAN: no chalk dust, glow, smudges or shadows on her face or skin. The crystal’s glow stays on the crystal, the tape and the title, never on her face.',
    'BEHIND HER, huge and secondary: a colossal horned wyvern head resting on the plank floor of a timber guild hall, eyes closed, dark green scales, no blood and no wound in view.',
    'Five old pale wyvern skulls hang from the rafters above, and armoured adventurers at a fireside table laugh in soft focus.',
    'On a reception counter to one side, a fist-sized guild crystal on a brass stand glows pale blue. It shows only light: no letters, no numbers, nothing that reads as writing.',
    'LIGHT: warm amber lamplight from the hall, and a cool blue rim light from the crystal on her hair and the tape.',
    'TITLE: the words LEVEL ONE, WYVERN SLAYER painted into the art in the upper third, above her head, as a bold fantasy-adventure logo on two lines,',
    'LEVEL ONE, with its comma, small and plain on the first line, and WYVERN SLAYER large on the second, gold with a dark outline and a thin pale-blue crystal glint along the letter edges,',
    'spelled exactly LEVEL ONE, WYVERN SLAYER, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  opening:
    "The crystal on the guild counter glows, hesitates, and lights one number.\n\nLEVEL 1.\n\nThe receptionist reads it aloud to the whole hall, then looks past you. Her badge says TAMSIN. \"You dragged that in? Alone?\"\n\nBehind you, a horned wyvern’s head the size of a hay cart fills half the hall. Eleven miles, on a rope.\n\nThe B-rank table laughs first. Then everyone, except a woman measuring the wound with a tape.\n\nA man in polished armour sets one silver coin by your hand.\n\n\"Gale. B-rank.\" He smiles at the head, not at you. \"A kill like that needs a real party’s name on it. Porter, a silver a day. Take it now, or carry your lizard home.\"",
  openingPanel: {
    assetKey: 'story_level_one_wyvern_slayer/opening',
    alt: 'Tamsin behind the guild counter, two pencils in her black hair, looking over her spectacles at a colossal wyvern head filling the hall, as a smiling armoured man sets down one silver coin.',
  },
  openingSuggestions: [
    '"Keep your silver. I didn’t come here for a job."',
    'I put my hand back on the crystal. "Again."',
    'I lift the head by one horn and hold it out to him. "Your turn."',
  ],
  publishedAt: null,
};

export const LEVEL_ONE_WYVERN_SLAYER = StoryVersion.parse(raw);
