import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Three Feet Apart" — enemies to lovers, with a rule you can measure.
 *
 * Two court mages who have spent eight years trying to beat each other are
 * tied wrist to wrist by a spell neither of them wrote, in front of the whole
 * court, seven days before the Conclave that decides which of them gets the
 * archmage's chair. Past three feet, whoever is left behind turns to stone.
 *
 * The structural bet is the one Good Morning, Husband makes, turned inside
 * out: there the relationship already has history and warmth and the player
 * arrives with none; here it has eight years of history and all of it is
 * hostile. Nobody needs to be won over. What the player is doing is finding
 * out, one staircase and one supper at a time, whether the person they have
 * been fighting is the person they thought.
 *
 * The rule carries the whole week, so it is concrete and the opener shows it
 * working before anybody explains it: his hand greys, you walk back, it
 * clears. The knot also tightens on a lie told across it, which is the comic
 * engine — two proud people who cannot lie to each other's faces — and the
 * romance engine, because the honest way off is a forced confession.
 *
 * Everything production's storyteller needs is where it reads: the rules of
 * the knot, the terms and the culprit in hard canon; the cord and the treaty
 * copy as quest items; each school of magic in its archetype's starting
 * abilities. Step director notes, resources and promises are scaffolding for
 * the engine and the tests.
 *
 * Three variables. Composure is the only GOOD_HIGH, because `resolveRest`
 * refills those and a night's sleep should give back your patience, not the
 * knot's slack. Strain is first among the descending pair because
 * PUBLIC_VIOLENCE adds to the first GOOD_LOW in array order, and hitting the
 * person you are tied to should pull the cord before it starts a rumour.
 */

const raw = {
  id: 'sv_three_feet_apart_1',
  storyId: 'story_three_feet_apart',
  version: 1,
  title: 'Three Feet Apart',
  fantasyLabel: 'Bound to your rival. Three feet, no more.',
  hook: 'A spell cast in front of the whole court has tied you to your rival court mage. Stay within three feet of each other, or whoever is left behind loses an arm.',
  premise:
    'You are one of the court mages of Hesper, and for eight years your rival has been Lord Caius Wren. You met in your first week at college, split first prize when you graduated, and have spent five years at court opposing each other on almost every question the Queen has asked.\n\n' +
    'This morning the two of you stood three feet apart, on either side of the fire in the Lantern Hall, for the public disputation that decides which of you follows the retiring Archmage. The court’s questions were read, answered and burned in the fire, as they always are.\n\n' +
    'One of those slips was not a question. It was a page with both your names written on it in one hand, above the words of an old hostage knot from the war treaties. When it burned, the fire turned green and a cord of light tied your left wrist to his.\n\n' +
    'The knot holds you to three feet. Past that, whoever is left behind starts to turn to stone, fingers first. In about a minute the whole arm is gone for good. You have already watched it start on his hand.\n\n' +
    'Neither of you wrote that page, and it sinks you both, because under the old law no mage bound to another may swear the archmage’s oath alone. The Conclave is in seven days.\n\n' +
    'So you need to find out who wrote two names in one hand, how the knot comes off, and how to share a room, a staircase and a supper table with the man you have spent eight years trying to beat, without either of you losing an arm.\n\n' +
    'He has a secret about the night before your final exam. You have a week to find out whether it changes anything.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Fantasy', 'Comedy', 'Enemies to lovers', 'Court intrigue'],
  mechanicsChips: [
    'A rule you can measure',
    'He cannot lie to you either',
    'Every door is a negotiation',
    'Somebody wrote your names',
    'Untie it, or keep it',
  ],
  contentDescriptors: ['ROMANCE', 'FANTASY_VIOLENCE'],
  intensity: 'LIGHT',
  creatorNote:
    'Every door in this palace is a negotiation now. You can spend the week fighting him, fighting the court, or fighting the urge to stop fighting, and all three are real ways to play. He did not write the page. Somebody did, and whoever it was is counting on the two of you being too proud to work together for seven days.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'lantern_hall',
    startWorldMinute: 11 * 60 + 50,
    startingItems: [{ itemId: 'hostage_knot', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is a court mage of twenty-seven. Lord Caius Wren is twenty-eight, Archmage Thessaly Vane is sixty-one, Prin Halloway is twenty, Lady Corvina Ashdown is thirty-four, and Hollis Brand is thirty-one. The Queen of Hesper is fifty-four. The royal college of mages takes students from nineteen.',
      'The player and Caius met in their first week at the royal college of mages eight years ago, split first prize when they graduated five years ago, and have served as court mages of Hesper ever since, opposing each other on almost every question the court has asked. They have never once had a real conversation alone.',
      'At the disputation this morning a hostage knot tied the player’s left wrist to Caius’s left wrist: a cord of pale green light that only the two of them can touch. It hangs slack when they are close and pulls taut at three feet. Other people’s hands pass through it.',
      'The forfeit: past three feet, whoever is left behind (whoever moved less) starts to turn to cold grey stone from the fingertips up. Back inside three feet within about a minute and the grey drains away with no harm done. Past that minute the arm stays stone for good, and the knot breaks. Nobody bleeds. It is never written as a wound.',
      'A lie told aloud by one bound person to the other tightens the cord by about a hand’s width for an hour. The knot ignores lies told to anyone else and does not punish silence.',
      'By custom the court writes disputation questions on paper slips, the two candidates stand three feet apart on either side of the brazier in the Lantern Hall, and every answered slip is burned in its mage-fire. That is why the knot set at three feet.',
      'The knot was written, not cast: both names on one page in one hand, the old hostage words beneath, burned in mage-fire. Lady Corvina Ashdown wrote it at her own desk, and her clerk handed it to Prin Halloway at the side door, folded like a late question. Prin tipped it into the fire with the others. Nobody else in the hall knows whose hand it was at the start, Prin only suspects it, and nothing reveals it unless the player finds it out.',
      'The terms written under every hostage knot, kept with the war treaties in the treaty vault under the library: it comes off if the writer writes the names again, strikes them through and burns the page in mage-fire; or if the two bound unpick it together, hand to hand, each answering aloud and truthfully its one question, what do you want from the one you are bound to; or by the forfeit. The treaties lie in that vault and the Chancery has charge of them, which is how Corvina copied the knot. Archmage Thessaly and Lady Corvina know all three terms; nobody else in the palace does at the start.',
      'Nothing but its three terms undoes the knot. Fire passes through the cord, blades and wards find nothing to cut, a glamour can hide it but never lengthen it, and mending only slows the grey. The unpicking hears a convenient truth as a lie: each answer must be the whole one, the thing the speaker would least like the other to hear, and anything less tightens the cord instead of loosening it.',
      'Court magic in Hesper is written and slow: workings on paper, wards, glamours, mending and mage-fire. No mage flies, vanishes, reads minds or walks through walls, the player included. If the player tries something no mage can do, it does not happen; one plain line says so, and the scene goes on from where the player stands, still bound to Caius.',
      'Archmage Thessaly Vane retires at the Conclave on the seventh morning, when the Queen confirms her successor and the successor swears the archmage’s oath. The only two names on her list are the player’s and Caius’s. Under the oath law no mage bound to another by spell may swear the oath alone. The original wording in the treaty vault shows that the first archmages of Hesper were two, bound, and swore it together.',
      'The Queen of Hesper watched the disputation from the dais and withdrew the moment the fire turned green. Before the Conclave she grants neither candidate a private audience and will not rule on the knot; an accusation reaches her only in open court, at the Conclave Ball or the Conclave, with proof in hand. The Chancellor is the only person who sees her every day.',
      'Caius did not write the page and will not walk away from a knot while someone is on the other end of it. He suspects Corvina from the first minute, because two weeks ago she offered to cancel his family’s debt if he withdrew, and he refused.',
      'Five years ago, the night before the final examination, Caius found a flaw in the player’s final working that would have set the examination hall on fire, took it to the examiners instead of to the player, and argued for three hours that first prize be split. The player has never known who found the flaw or why the prize was split.',
      'Thessaly’s left hand has been grey stone under a glove for forty years, from a hostage knot in the last war. Eleven years ago, in the Flood Year, the Tower sealed the river wards to save the palace and the water drowned eleven people on Dock Row, Corvina’s brother among them.',
    ],
    toneGuide:
      'Sharp, funny and charged. This is a rivalry first and a romance second, and the romance is earned by the rivalry: insults that are secretly compliments, competence that is secretly care, and a cord of light that turns every door, staircase, supper and bedtime into a negotiation. ' +
      'Comedy comes from logistics and pride. Tension comes from the rule, which is always real: grey creeping into a hand is never a joke. ' +
      'Romance is flirtatious, tense and heartfelt, and goes as far as a kiss. Shared rooms are comedy, played with a painted screen, terms, and two people pretending to be asleep; bodies are never lingered on. A fight is a duel of spells, never gore. ' +
      'The court moves in the background whether or not anybody is looking. The face at the top of a beat is Caius’s whenever he is in the scene, which is nearly always. ' +
      'Nothing goes further than a kiss, on the page or off it: no fade-to-black, no night spent together, nothing implied afterwards. Washing, dressing and the privy happen behind the screen or a closed door, the prose cuts away before anyone undresses, and nobody’s body is described.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The stair up to his tower is exactly wide enough for one person.\n\n\"After you,\" Caius says.\n\n\"So you can tread on my hem the whole way up?\"\n\n\"So that if you fall, you fall on me.\" He considers it. \"Which I would hate.\"\n\nThe cord shortens by a hand’s width. He does not look at it.\n\nYou go up side by side, shoulders scraping stone, the cord swinging between your wrists.\n\nAt the top he stops, breathing hard and pretending not to.\n\n\"Three hundred and twelve,\" he says. \"I have never once counted them before tonight.\"",
      "Hollis Brand arrives with two porters, a painted screen and the face of a man who has been asked to solve a problem with furniture.\n\n\"Screen between you. Cot on this side, bed on that side.\" He snaps open a brass measuring rod. \"Two feet eleven in the gap. You’re welcome.\"\n\nCaius looks at the cot. Caius looks at you.\n\n\"I’ll take the cot,\" you both say.\n\nThe cord tightens by a hand’s width. Neither of you meant it.",
      "Archmage Thessaly pours three cups of tea and sets two of them across the desk, exactly three feet apart.\n\n\"I know that knot,\" she says. She does not look at the grey glove on her left hand. \"I know what it costs. What I want to know is which of you was going to walk away.\"\n\nNeither of you answers.\n\n\"Good,\" she says, and drinks her tea.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 11, mind: 13, presence: 12, resolve: 12, arcana: 14 },
  skills: [
    { id: 'spellcraft', name: 'Spellcraft', attribute: 'arcana', description: 'Making a working do exactly what you meant, in public, under pressure.' },
    { id: 'wardwork', name: 'Wardwork', attribute: 'arcana', description: 'Reading and tying wards, seals and bindings. His specialty, and possibly yours.' },
    { id: 'mending', name: 'Mending', attribute: 'arcana', description: 'Bones, burns, fevers, and the cold in a hand that is going grey.' },
    { id: 'courtcraft', name: 'Courtcraft', attribute: 'presence', description: 'Knowing who to bow to, who to cut, and what the court will say about it by supper.' },
    { id: 'wit', name: 'Wit', attribute: 'mind', description: 'Winning an argument in four words, ideally his.' },
    { id: 'scholarship', name: 'Scholarship', attribute: 'mind', description: 'Finding the right page in a library full of the wrong ones.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Saying the true thing while he is looking straight at you.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Stairs, doorways and dance floors, with somebody attached.' },
    { id: 'endurance', name: 'Endurance', attribute: 'might', description: 'Three hundred and twelve stairs twice a day, and your half of a bad night.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is GOOD_HIGH because `resolveRest` restores those and a night's
   * sleep should give back your patience. Strain and Rumour are descending:
   * one is the knot pulling, the other is the court talking, and both get
   * worse when the two of you make a scene.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 70,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has nothing civil left. Every sentence comes out as the sharpest version of itself, and Caius, who is just as tired, answers in kind. The next thing either of them says is going to be a mistake, and the correct move is to sit down somewhere and stop talking.',
      color: '#C9A227',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Frayed to the last thread. The player snaps at kindness, misreads jokes as attacks and agrees to nothing. Stairs feel twice as long. This is the band where a small logistical question, like who gets the window side, becomes a shouting match, and where sleep is the honest answer.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary wear of a day spent three feet from your rival. Still quick, still able to land a good line, but short on patience for the court and for long explanations. Fine for one more errand, poor for a delicate conversation.',
        },
        {
          upTo: 100,
          behaviour:
            'Steady. The player has room to be gracious, to let a jab go past, to ask a real question and wait for the answer. Long scenes can go somewhere here, and an argument can turn into a conversation without anybody deciding it should.',
        },
      ],
    },
    {
      id: 'strain',
      name: 'Strain',
      max: 100,
      start: 25,
      regenPerHour: -4,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The cord hangs loose and nearly forgotten between them, like a ribbon somebody left on a sleeve. Neither of them has checked the distance in an hour, and both notice that they have not.',
      color: '#7FD1A8',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Slack. The cord drapes between their wrists and barely glows. They can turn round, reach for a book, sit on opposite ends of a bench without thinking about it. Quiet moments live here, and so does the first time one of them forgets which wrist is tied.',
        },
        {
          upTo: 50,
          behaviour:
            'Taut. The cord hums faintly and pulls whenever one of them drifts toward the edge of three feet. Every doorway needs a word about who goes first. This is the ordinary state of a working day and most scenes should sit here.',
        },
        {
          upTo: 80,
          behaviour:
            'Burning. The cord glows bright enough to throw green shadows and stings at the wrist on every pull. Courtiers step back from it. Spells cast nearby misfire in small ways, a candle gutters, a ward line smudges. Either of them may flinch at a sudden move.',
        },
        {
          upTo: 100,
          behaviour:
            'At the edge of the forfeit. A grey tint sits at the fingertips of whoever moved last and does not quite fade even inside three feet. The cord is a hand shorter than it should be. One careless step from here is an arm, and both of them know it.',
        },
      ],
    },
    {
      id: 'rumour',
      name: 'Rumour',
      max: 100,
      start: 40,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The court has found something else to talk about. A cousin has eloped, a horse has won something, and the two mages on a string are, for one blessed afternoon, furniture.',
      color: '#B48EAD',
      bands: [
        {
          upTo: 25,
          behaviour:
            'A curiosity. People glance at the cord and look away politely. Nobody follows the two of them, and a conversation in the gallery stays a conversation in the gallery.',
        },
        {
          upTo: 55,
          behaviour:
            'The main topic at supper. Courtiers fall silent as the pair pass, the betting book is busy, and every small thing they do in public is retold by evening, slightly wrong. Most of the week lives here.',
        },
        {
          upTo: 80,
          behaviour:
            'A scandal. Someone has decided they are secretly married and someone else that they are secretly at war, and both camps are watching. Invitations arrive that are traps. The Queen has asked a question about it, which is never good.',
        },
        {
          upTo: 100,
          behaviour:
            'The whole court has taken sides and the Conclave is now about the two of them rather than the chair. Corvina has more support than she did yesterday, and every public move either of them makes is being weighed as evidence.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'hostage_knot',
      name: 'The Hostage Knot',
      tags: ['quest', 'binding'],
      questItem: true,
      droppable: false,
      description:
        'A cord of pale green light from your left wrist to Caius Wren’s. It hangs slack when you are close and pulls taut at three feet. Nobody else can touch it. It tightens by a hand’s width for an hour when either of you lies aloud to the other.',
      loreText:
        'Written, not cast. The border wars used it to keep a hostage within reach of a keeper: two names in one hand on one page, the old words beneath, burned in mage-fire. Past three feet the one left behind turns to stone from the fingertips up. Back inside three feet within about a minute and the grey drains out. After that, it stays.',
      icon: 'cord',
    },
    {
      id: 'treaty_roll',
      name: 'The Treaty Copy',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { scholarship: 1 },
      description:
        'A lead tube from the treaty vault holding the war copy of the hostage knot, with its terms written underneath in faded brown ink, and pinned to it the oath law in its original wording.',
      loreText:
        'The terms: the knot comes off if the one who wrote the names writes them again, strikes them through and burns the page in mage-fire; or if the two bound unpick it together, hand to hand, each answering aloud and truthfully its one question, what do you want from the one you are bound to; or by the forfeit. The oath law: no mage bound to another by spell may swear the archmage’s oath alone. The first archmages of Hesper were two, bound, and swore it together.',
      icon: 'scroll',
    },
    {
      id: 'split_prize',
      name: 'The Silver Inkwell',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'First prize at the college, five years ago, split between the two of you by the examiners. It has changed towers eleven times since. Right now it is on his mantel, polished.',
      loreText:
        'Both your names are engraved on the base in very small letters. Neither of you has ever admitted to reading the base.',
      icon: 'inkwell',
    },
    {
      id: 'brazier_ash',
      name: 'Ash From the Brazier',
      tags: ['quest', 'clue'],
      questItem: true,
      description:
        'A handful of ash from the disputation brazier, still faintly warm. In it, one curl of brown parchment that did not burn, with a smear of green sealing wax on its edge.',
      loreText:
        'Every question the court asked was written on paper, and paper burns white. Parchment curls brown. Green sealing wax is used in one office in the palace.',
      icon: 'ash',
    },
    {
      id: 'blotting_sheet',
      name: 'The Chancellor’s Blotter',
      tags: ['quest', 'clue', 'document'],
      questItem: true,
      description:
        'The sheet of blotting paper on the Chancellor’s desk. Held to a mirror, two names come up out of the ink in one careful hand: yours and his.',
      loreText: 'Under the names, smudged but legible, is the first line of the old hostage words.',
      icon: 'papers',
    },
    {
      id: 'examiners_minutes',
      name: 'The Examiners’ Minutes',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The minutes of your final examination, five years ago, in the Archmage’s hand. Two pages are about the examination. Eleven are about the night before it.',
      loreText:
        'At midnight Caius Wren brought the examiners the flaw in your final working, which would have set the hall on fire, and asked them never to say who found it. Then he refused first prize unless it was split, and argued for three hours until it was.',
      icon: 'book',
    },
    {
      id: 'succession_letter',
      name: 'The Sealed Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'The Archmage’s choice of successor, sealed in blue wax and sitting on her desk in plain sight until the Conclave.',
      loreText:
        'It names both of you, and asks the Queen for a shared chair, as in the founding charter. Under the oath law that works only if you are both free, or both bound and sworn together.',
      icon: 'letter',
    },
    {
      id: 'wren_note',
      name: 'The Wren Note',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A Chancery note of debt against House Wren for four thousand crowns, folded small, with a letter in the Chancellor’s hand pinned behind it.',
      loreText:
        'The letter offers to cancel the debt on one condition: that Lord Caius Wren withdraw his name from the succession. It is dated two weeks ago. Across the bottom, in his handwriting, one word: No.',
      icon: 'letter',
    },
    {
      id: 'painted_screen',
      name: 'The Painted Screen',
      tags: ['home'],
      description:
        'A tall folding screen painted with herons, sent up by the Master of Chambers so that two people three feet apart can each pretend the other is not there.',
      loreText: 'There is a gap between the second and third panels exactly the width of a cord.',
      icon: 'screen',
    },
    {
      id: 'prin_notebook',
      name: 'Prin’s Notebook',
      tags: ['document'],
      skillModifiers: { scholarship: 1 },
      description:
        'Every question the court asked at the disputation, all forty-one, in your apprentice’s small fast hand, with a note of who asked each one.',
      loreText: 'The last three have no name beside them, only: from the Chancery, late. One is underlined twice and then crossed out.',
      icon: 'book',
    },
    {
      id: 'measuring_rod',
      name: 'The Steward’s Rod',
      tags: ['tool'],
      description:
        'A brass-tipped folding rod exactly three feet long, which the Master of Chambers has carried everywhere since this morning, for reasons.',
      loreText: 'The brass tips are worn bright. He has owned it for twelve years and this is the first week it has been funny.',
      icon: 'tools',
    },
    {
      id: 'ember_ring',
      name: 'The Ember Ring',
      tags: ['personal', 'focus'],
      skillModifiers: { spellcraft: 1 },
      description: 'A brass ring set with a coal-red stone that is always warm. You have lit more candles with it than any mage at court.',
      loreText: 'It goes cold when the knot pulls taut, which is useful and also deeply annoying.',
      icon: 'ring',
    },
    {
      id: 'ward_chalk',
      name: 'Ward Chalk',
      tags: ['personal', 'focus'],
      skillModifiers: { wardwork: 1 },
      description: 'A stick of white chalk cut with silver, for drawing ward lines on thresholds. Half used. He buys the same kind.',
      loreText: 'You started buying it the week after he did, five years ago, and have told nobody why.',
      icon: 'chalk',
    },
    {
      id: 'hand_mirror',
      name: 'A Hand Mirror',
      tags: ['personal', 'focus'],
      skillModifiers: { courtcraft: 1 },
      description: 'A small silver hand mirror for checking a glamour from the outside. It also reads blotting paper, if anybody thought to try.',
      loreText: 'The back is engraved with a heron. The court’s glamour-workers have carried one since the founding.',
      icon: 'mirror',
    },
    {
      id: 'healers_satchel',
      name: 'Healer’s Satchel',
      tags: ['personal', 'medical'],
      skillModifiers: { mending: 1 },
      description: 'Linen, salts, a flask of warming oil and a tin of honey. The warming oil does something useful for a hand going grey. Not enough, but something.',
      loreText: 'The honey is for you. Nobody at court has ever asked why a healer carries honey.',
      icon: 'bag',
    },
  ],
  abilities: [
    {
      id: 'cross_words',
      name: 'Cross Words',
      tags: ['social'],
      description: 'Trade insults with him the way you have for eight years: fast, precise, and in front of whoever is watching.',
      affordances: ['insult him', 'argue with him', 'snap at him', 'tease him', 'banter', 'trade barbs', 'mock him', 'correct him'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'wit', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_a_truce',
      name: 'Call a Truce',
      tags: ['social'],
      description: 'Put terms on the table: who walks where, who sleeps where, who speaks first at supper. Terms he can hold you to.',
      affordances: ['call a truce', 'make a deal with him', 'propose terms', 'offer peace', 'shake on it', 'set some rules'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'courtcraft', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_scene',
      name: 'Make a Scene',
      tags: ['social'],
      description: 'Say it loudly, in public, and let the court hear every word: an accusation, a quarrel, a declaration.',
      affordances: ['accuse him', 'shout', 'make a scene', 'tell the court', 'blame him', 'raise my voice', 'denounce him'],
      costs: [
        { resourceId: 'rumour', amount: 12 },
        { resourceId: 'strain', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_step',
      name: 'Keep in Step',
      tags: ['movement'],
      description: 'Move as one: stairs, doorways, a crowded gallery, a dance floor. Easier said than done with someone who walks like that.',
      affordances: ['walk together', 'go together', 'match his pace', 'take the stairs', 'dance with him', 'lead him', 'follow him', 'walk out with him'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_knot',
      name: 'Read the Knot',
      tags: ['sight'],
      description: 'Study the cord the way a binder would: how it was tied, what it was tied with, and what it is pulling toward.',
      affordances: ['study the knot', 'read the knot', 'examine the cord', 'look at the binding', 'inspect the cord', 'read the ash'],
      costs: [{ resourceId: 'strain', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'wardwork', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'search_the_records',
      name: 'Search the Rolls',
      tags: ['sight'],
      description: 'Go through the old records, treaties and minutes until the right page turns up.',
      affordances: ['search the library', 'look it up', 'research it', 'read the treaties', 'check the records', 'find the book'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'scholarship', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_plainly',
      name: 'Say It Plainly',
      tags: ['social'],
      description: 'Tell him the true thing without dressing it up, and take what comes back. The knot can tell the difference.',
      affordances: ['tell him the truth', 'be honest', 'admit it', 'confess', 'say it plainly', 'tell him how i feel', 'come clean'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'test_the_distance',
      name: 'Test the Distance',
      tags: ['movement'],
      description: 'Lean into the edge of three feet on purpose, to see what the knot does and what he does.',
      affordances: ['step back', 'step away from him', 'test the cord', 'pull on the cord', 'see if he is bluffing', 'take a step away'],
      costs: [{ resourceId: 'strain', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_away',
      name: 'Walk Away',
      tags: ['movement'],
      description: 'Take the fourth step and keep going. The knot breaks, and the one left behind pays for it.',
      affordances: ['walk away from him', 'leave him behind', 'keep walking', 'cut him loose', 'let his arm go'],
      costs: [{ resourceId: 'strain', amount: 40 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_room',
      name: 'Work the Room',
      tags: ['social'],
      description: 'Smile, bow, steer the talk, and make a court see what you want it to see.',
      affordances: ['work the room', 'charm the court', 'smooth it over', 'talk to the courtiers', 'spin it', 'mingle'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'courtcraft', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_close',
      name: 'Stay Close',
      tags: ['social'],
      description: 'Do not argue, do not fix it, do not move. Sit where you are and let the cord go slack.',
      affordances: ['stay', 'sit with him', 'say nothing', 'wait with him', 'stay close', 'let it be quiet', 'stand still'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_fire',
      name: 'Call Fire',
      tags: ['utility'],
      description: 'Light, heat or flame on command, from a candle to a wall of it. Every working pulls on the cord.',
      affordances: ['call fire', 'light it', 'make a flame', 'set it alight', 'warm the room', 'throw fire'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'strain', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'spellcraft', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'set_a_ward',
      name: 'Set a Ward',
      tags: ['defensive'],
      description: 'Draw a ward on a door, a room or a person: a lock, a barrier, or a silence nobody outside can hear through.',
      affordances: ['set a ward', 'ward the door', 'lock it with a ward', 'seal the room', 'make it quiet', 'shield us'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'strain', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'wardwork', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cast_a_glamour',
      name: 'Cast a Glamour',
      tags: ['utility'],
      description: 'Make a thing look like something else for an hour: a face, a voice, a cord of green light the whole court is staring at.',
      affordances: ['cast a glamour', 'hide the cord', 'disguise us', 'make it invisible', 'change my face', 'cast an illusion'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'strain', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'spellcraft', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'mend',
      name: 'Mend',
      tags: ['healing'],
      description: 'Close a cut, cool a burn, warm a hand that is going grey. It buys seconds. It does not untie anything.',
      affordances: ['heal him', 'mend it', 'treat his hand', 'warm his hand', 'patch it up', 'tend to him'],
      costs: [{ resourceId: 'composure', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'mending', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'name_the_writer',
      name: 'Name the Writer',
      tags: ['social'],
      description: 'Stand up in front of the court with your proof and say whose hand wrote two names on one page.',
      affordances: ['accuse the chancellor', 'name her', 'expose her', 'show the court the proof', 'tell the queen who did it'],
      costs: [
        { resourceId: 'composure', amount: 10 },
        { resourceId: 'rumour', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'courtcraft', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:who_wrote_it'],
        lockedCopy: 'You can say a name out loud. Without proof of the hand that wrote the page, the court will hear one rival blaming whoever is nearest.',
      },
    },
    {
      id: 'unpick_the_knot',
      name: 'Unpick the Knot',
      tags: ['utility'],
      description: 'Untie it together, hand to hand, the way the terms say: each of you answers its one question aloud, and truthfully.',
      affordances: ['unpick the knot', 'untie it together', 'answer the knot', 'undo the binding', 'release us'],
      costs: [
        { resourceId: 'composure', amount: 15 },
        { resourceId: 'strain', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_terms'],
        lockedCopy: 'You have tugged at it, sworn at it and asked it nicely. Without the terms it was written with, it is a cord of light that will not come undone.',
      },
    },
    {
      id: 'swear_together',
      name: 'Swear Together',
      tags: ['social'],
      description: 'Stand before the Queen with the cord still on, and swear the archmage’s oath as two, not one.',
      affordances: ['swear together', 'take the oath together', 'swear it as two', 'claim the chair together'],
      costs: [{ resourceId: 'composure', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'courtcraft', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_loophole'],
        lockedCopy: 'The oath is for one mage, free and unbound. As far as anybody has told you, the law says so in as many words.',
      },
    },
  ],
  locations: [
    {
      id: 'lantern_hall',
      name: 'The Lantern Hall',
      shortName: 'The Hall',
      description:
        'The court’s great hall: a hundred hanging lanterns, the Queen’s high table on a dais, and in the middle of the floor the iron brazier where the court burns its disputation questions. The fire in it is mage-fire and still faintly green. Suppers, the Conclave ball and the Conclave itself all happen here.',
      artDirection:
        'Vast fantasy palace great hall, a hundred warm hanging lanterns, a dais with a high table, an iron brazier in the centre burning with faint green fire, polished stone floor, courtiers in rich colours at the edges. Gold and green.',
      connections: [{ to: 'long_gallery', travelMinutes: 2, label: 'Out into the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'brazier_ash', qty: 1, ownerId: null, aka: ['ash', 'the ash', 'the brazier ash', 'the parchment scrap'] },
      ],
    },
    {
      id: 'long_gallery',
      name: 'The Long Gallery',
      shortName: 'Gallery',
      description:
        'The spine of the palace: three hundred feet of portraits of every archmage since the founding, tall windows on one side, doors on the other, and courtiers who stop talking when you pass. Both towers, the library, the Chancery, the kitchens, the garden and the yard open off it. Hollis Brand’s betting book lies open on a windowsill, as it has for five years.',
      artDirection:
        'Long palace portrait gallery, tall arched windows with winter light, a row of painted archmage portraits in gilt frames, a chequered marble floor, small groups of whispering courtiers, an open ledger on a windowsill.',
      connections: [
        { to: 'lantern_hall', travelMinutes: 2, label: 'Back into the hall' },
        { to: 'east_tower', travelMinutes: 4, label: 'Up to your tower' },
        { to: 'west_tower', travelMinutes: 4, label: 'Up to his tower' },
        { to: 'archmage_study', travelMinutes: 5, label: 'The Old Tower stairs' },
        { to: 'royal_library', travelMinutes: 3, label: 'Into the library' },
        { to: 'chancery', travelMinutes: 3, label: 'The Chancery doors' },
        { to: 'winter_garden', travelMinutes: 2, label: 'Through to the glasshouse' },
        { to: 'palace_kitchens', travelMinutes: 3, label: 'Down to the kitchens' },
        { to: 'mages_yard', travelMinutes: 4, label: 'Out to the yard' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'east_tower',
      name: 'Your Tower',
      shortName: 'Your Rooms',
      description:
        'Your rooms at the top of the East Tower: a workroom with every surface covered, a narrow bed under a slanted window, a window seat, and a door to the antechamber where your apprentice sleeps on a cot. It was built for one person and it shows.',
      artDirection:
        'Cluttered mage’s tower room, a crowded worktable of books and instruments, a narrow bed under a slanted window, a cushioned window seat, a folding screen painted with herons, warm lamplight. Cosy and overfull.',
      connections: [{ to: 'long_gallery', travelMinutes: 4, label: 'Down to the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [
        { itemId: 'painted_screen', qty: 1, ownerId: null, aka: ['screen', 'the screen', 'the folding screen', 'the herons'] },
        { itemId: 'prin_notebook', qty: 1, ownerId: 'prin', aka: ['notebook', 'her notebook', 'prin’s notes', 'the notes'] },
      ],
    },
    {
      id: 'west_tower',
      name: 'His Tower',
      shortName: 'His Rooms',
      description:
        'Caius Wren’s rooms in the West Tower, up three hundred and twelve stairs on a spiral built for one: bare boards, ward lines chalked on every threshold, one hard chair, one very tidy bed, and on the mantel a silver inkwell that is technically yours.',
      artDirection:
        'Austere mage’s tower room, bare wooden floor, faint glowing chalk ward lines across the threshold, a single straight-backed chair, a neatly made bed, a cold fireplace with a silver inkwell on the mantel, grey morning light.',
      connections: [{ to: 'long_gallery', travelMinutes: 4, label: 'Down the long spiral' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'split_prize', qty: 1, ownerId: 'caius', aka: ['inkwell', 'the inkwell', 'the silver inkwell', 'the prize'] },
        { itemId: 'wren_note', qty: 1, ownerId: 'caius', aka: ['the note', 'the debt note', 'his letter', 'the folded paper'] },
      ],
    },
    {
      id: 'archmage_study',
      name: 'The Archmage’s Study',
      shortName: 'Her Study',
      description:
        'The top of the Old Tower: a round room of books and teapots, a desk the size of a cart, and a locked cabinet behind it. The sealed letter of succession sits on the desk in plain sight, which is the safest place in the palace.',
      artDirection:
        'Round tower study crowded with bookshelves, several teapots, a huge cluttered desk with a letter sealed in blue wax, tall windows over winter rooftops, soft lamp and firelight. Scholarly and warm.',
      connections: [{ to: 'long_gallery', travelMinutes: 5, label: 'Down the Old Tower stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'succession_letter', qty: 1, ownerId: 'thessaly', aka: ['the letter', 'the sealed letter', 'her letter', 'the succession'] },
        { itemId: 'examiners_minutes', qty: 1, ownerId: 'thessaly', aka: ['the minutes', 'exam minutes', 'the examiners’ book', 'the old record'] },
      ],
    },
    {
      id: 'royal_library',
      name: 'The Royal Library',
      shortName: 'Library',
      description:
        'Four floors of shelves around a well of light, a librarian who has taken a vow of quiet and enforces it on everybody else, and at the very back a bronze door to the treaty vault that will not open for somebody who does not know what they are looking for.',
      artDirection:
        'Grand multi-storey palace library around a central light well, spiral stairs, rolling ladders, long reading tables, a heavy bronze door at the back. Dusty gold light.',
      connections: [
        { to: 'long_gallery', travelMinutes: 3, label: 'Back to the gallery' },
        { to: 'treaty_vault', travelMinutes: 2, lockedByFlag: 'knows:it_was_written', label: 'Through the bronze door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'treaty_vault',
      name: 'The Treaty Vault',
      shortName: 'The Vault',
      description:
        'A cold stone room under the library where the war treaties are kept rolled in lead tubes. Every hostage knot ever written in Hesper is recorded here with its terms, and so is the oath law in its original wording.',
      artDirection:
        'Cold underground stone archive, rows of lead scroll tubes in iron racks, a single lantern, a reading slope, breath visible in the air. Hushed and old.',
      connections: [{ to: 'royal_library', travelMinutes: 2, label: 'Up into the library' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'treaty_roll', qty: 1, ownerId: null, aka: ['the treaty', 'the lead tube', 'the treaty copy', 'the terms'] },
      ],
    },
    {
      id: 'chancery',
      name: 'The Chancery',
      shortName: 'Chancery',
      description:
        'The Chancellor’s offices: a clerks’ room full of scratching pens, a Seal Room with the Queen’s great seal on a velvet cushion, and Corvina’s own desk, very clean, with a fresh blotting sheet that is not quite fresh enough.',
      artDirection:
        'Elegant government office in a palace, rows of clerks’ desks, green leather and dark wood, a velvet cushion holding a great silver seal, one immaculate desk with a blotter and a stick of green sealing wax.',
      connections: [{ to: 'long_gallery', travelMinutes: 3, label: 'Back to the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'blotting_sheet', qty: 1, ownerId: 'corvina', aka: ['blotter', 'the blotter', 'the blotting paper', 'her blotting sheet'] },
      ],
    },
    {
      id: 'winter_garden',
      name: 'The Winter Garden',
      shortName: 'Garden',
      description:
        'A glasshouse at the end of the gallery: orange trees in tubs, a stone fountain, a bench exactly wide enough for two people who are not speaking to each other, and the only quiet in the palace during Conclave week.',
      artDirection:
        'Victorian-style palace glasshouse in winter, frost on the glass panes, orange trees in tubs, a small stone fountain, a single bench, warm humid light. Romantic and quiet.',
      connections: [{ to: 'long_gallery', travelMinutes: 2, label: 'Back into the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'palace_kitchens',
      name: 'The Kitchens',
      shortName: 'Kitchens',
      description:
        'Hot, loud and lit all night: a long scrubbed table, a bread oven the size of a cart, and cooks who feed anyone who comes down after midnight and repeat nothing they hear. The Master of Chambers keeps a desk in the corner.',
      artDirection:
        'Huge palace kitchen at night, a long scrubbed wooden table, a glowing bread oven, copper pans on hooks, steam, a cluttered steward’s desk in one corner. Warm, busy, safe.',
      connections: [{ to: 'long_gallery', travelMinutes: 3, label: 'Up to the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'measuring_rod', qty: 1, ownerId: 'hollis', aka: ['rod', 'the rod', 'the measuring rod', 'the yardstick'] },
      ],
    },
    {
      id: 'mages_yard',
      name: 'The Mages’ Yard',
      shortName: 'The Yard',
      description:
        'A walled courtyard of scorched flagstones where the court mages practise and, once in a generation, duel. The gate at the far end lets out onto the old bridge into town.',
      artDirection:
        'Walled stone courtyard with scorched and cracked flagstones, practice targets, a tall iron gate opening onto a bridge, winter sky. Open and stark.',
      connections: [
        { to: 'long_gallery', travelMinutes: 4, label: 'Back inside' },
        { to: 'bridge_market', travelMinutes: 8, label: 'Through the gate and over the bridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'bridge_market',
      name: 'The Bridge Market',
      shortName: 'Town',
      description:
        'The town below the palace: a market built along the old bridge, stalls of hot chestnuts and cheap ribbon, the river underneath, and nobody who cares who you are. Past it is the road out of the city.',
      artDirection:
        'Busy covered market on an old stone bridge over a river, stalls with awnings, braziers of roasting chestnuts, ribbons, crowds in winter coats, the palace on the hill behind.',
      connections: [{ to: 'mages_yard', travelMinutes: 8, label: 'Back up to the palace' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_court',
      name: 'The Queen’s Court',
      description:
        'The courtiers whose opinion the Queen hears before she confirms anybody. They have watched the two of you fight for five years, and this week they are watching you hold hands by force.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'Talked about' },
        { atReputation: 35, label: 'Received' },
        { atReputation: 65, label: 'Listened to' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_tower',
      name: 'The Tower',
      description:
        'The court mages and their apprentices under the Archmage. They keep the palace wards and advise the Queen, and in practice they answer to nobody, which is exactly the complaint.',
      startingReputation: 40,
      ranks: [
        { atReputation: 0, label: 'Colleague' },
        { atReputation: 40, label: 'Trusted' },
        { atReputation: 70, label: 'Heir apparent' },
      ],
      allies: [],
      enemies: ['faction_chancery'],
    },
    {
      id: 'faction_chancery',
      name: 'The Chancery',
      description:
        'The Chancellor’s clerks, the Queen’s seal, the ledgers and the old war treaties. They want the Tower to answer to somebody, and they think that somebody should be them.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'A file' },
        { atReputation: 35, label: 'Useful' },
        { atReputation: 65, label: 'Owed' },
      ],
      allies: [],
      enemies: ['faction_tower'],
    },
  ],
  characters: [
    {
      id: 'caius',
      name: 'Lord Caius Wren',
      calledName: 'Caius',
      role: 'Your rival court mage since college, the court’s binder, and the other end of the cord',
      cardBlurb:
        'He has opposed you on almost every question the court has asked for five years, he is the best binder in the kingdom, and now he can never be more than three feet from you. He has also kept one secret about you since the night before your final exam.',
      pronouns: 'he/him',
      publicTraits: ['Exact to the inch', 'Polite in a way that draws blood', 'Never once late'],
      hiddenDrives: [
        'He picks fights with you because it is the only way you have ever talked to him for longer than a minute',
        'He needs the archmage’s chain to clear his family’s debt, and would rather lose it than owe the Chancellor for it',
      ],
      values: ['A knot tied properly holds, and so should a person', 'Paying what is owed, in full, on the day'],
      fears: [
        'Being pitied, by you in particular',
        'His hands. A binder with one hand is a man who used to be a binder',
        'That you will find out about the exam and decide it was charity',
      ],
      socialStyle:
        'Answers an insult with a correction and a compliment with an insult. Stands very straight. Goes quiet and precise when he is frightened, which is the only way to tell.',
      boundaries: [
        'Will not walk away from a knot while someone is on the other end of it, not from you and not from anyone',
        'Will not take the Chancellor’s money, whatever it costs his house',
        'Will not let you carry him anywhere; he would rather crawl',
        'Will not tell you about the night before the exam until you have asked him one honest question about himself that has nothing to do with winning, and then late and badly',
        'Will not say why he suspects the Chancellor until he trusts you with his family’s debt',
      ],
      goals: [
        'Get the knot off without anybody losing an arm, and without owing you for it',
        'Stand at the Conclave as a free man and win the chain fairly',
        'Prove who wrote two names in one hand',
      ],
      secrets: [
        {
          id: 'caius_the_exam',
          fact: 'Five years ago, the night before the final examination, he found the flaw in your final working. Cast in the hall it would have set the room on fire. He took it to the examiners instead of to you, asked them never to say who found it, then refused first prize unless it was split and argued for three hours until it was.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself, late and badly, if you have asked him one honest question about himself that has nothing to do with winning. The examiners’ minutes in the Archmage’s study say it too.',
        },
        {
          id: 'caius_the_debt',
          fact: 'House Wren owes the Chancery four thousand crowns. Two weeks ago the Chancellor offered to cancel it if he withdrew from the succession, and he wrote No across the bottom of her letter. He has suspected her since the fire went green.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you find the note in his tower, or if you tell him something you are ashamed of first.',
        },
      ],
      speechStyle:
        'Clipped, formal, exact. Counts steps, stairs and minutes out loud. Calls you "Magister" when he is angry and by your first name exactly once. Ends every argument with a correction.',
      topics: ['the knot', 'wards and bindings', 'the succession', 'the exam five years ago', 'the silver inkwell', 'his family'],
      voiceSamples: [
        'One more step and I lose an arm. So. Where were you going?',
        'Three hundred and twelve stairs. I have climbed them for five years and never counted them until tonight.',
        'You are holding the cord like a leash, Magister. It is a knot. Have some respect for the craft.',
        'I did not write that page. If I wanted you ruined I would do it to your face, properly, with witnesses.',
        'Go to sleep. I never move in my sleep, and I am certainly not starting on your account.',
      ],
      appearance:
        'An adult man of slim build, very straight-backed, dark hair tied back at the nape, grey eyes, a high-collared charcoal mage’s coat with silver thread at the cuffs, and binder’s rings on four fingers of each hand.',
      visualHook: 'A pale green cord of light running from his left wrist, always pulled taut toward the edge of the frame.',
      silhouette: 'Upright and narrow, one hand clasped behind his back, the other wrist held slightly out toward you.',
      artSeed: 'tfa-caius-01',
      portrait: null,
      expressions: ['neutral', 'annoyed', 'amused', 'surprised', 'warm', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'west_tower', activity: 'in his tower, awake before the bells and pretending otherwise' },
        { startMinute: 420, endMinute: 660, locationId: 'west_tower', activity: 'at his ward tables, counting things' },
        { startMinute: 660, endMinute: 780, locationId: 'lantern_hall', activity: 'at the brazier, where the disputation ended badly' },
        { startMinute: 780, endMinute: 1020, locationId: 'royal_library', activity: 'in the library with the treaty indexes' },
        { startMinute: 1020, endMinute: 1140, locationId: 'long_gallery', activity: 'walking the gallery with the whole court watching' },
        { startMinute: 1140, endMinute: 1260, locationId: 'lantern_hall', activity: 'supper at the candidates’ end of the high table' },
        { startMinute: 1260, endMinute: 1440, locationId: 'west_tower', activity: 'back in his tower, arguing about the screen' },
      ],
      homeLocationId: 'west_tower',
      knowledgeScope: ['caius', 'the_knot', 'wards', 'the_succession', 'the_exam', 'house_wren'],
      startingRelationship: { trust: 15, affection: 20, respect: 60, fear: 0, rivalry: 80 },
      gates: [
        {
          id: 'caius_truce',
          label: 'He agrees to a truce and means it',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'caius_the_exam_story',
          label: 'He tells you about the night before the exam',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['first_night_over'] },
        },
        {
          id: 'caius_first_name',
          label: 'He calls you by your first name',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
        {
          id: 'caius_stays_close',
          label: 'He does not step away when he finally can',
          kind: 'ROMANCE',
          requires: { affection: 75, flagsSet: ['knot_untied'] },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 16, presence: 13, resolve: 15, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 15, damage: 8, tags: ['mage', 'binder'] },
    },
    {
      id: 'thessaly',
      name: 'Archmage Thessaly Vane',
      calledName: 'Thessaly',
      role: 'The retiring Royal Archmage, who put both your names on the list for her chair',
      cardBlurb:
        'She taught you both, she put both your names on the list for her chair, and she has worn one grey glove on her left hand for forty years. She knows this knot. She has not decided yet how much of it she is going to tell you.',
      pronouns: 'she/her',
      publicTraits: ['Mild', 'Unhurried', 'Ruthless over tea'],
      hiddenDrives: [
        'She wants to see what the two of you do before she tells you anything, because what people do while bound tells her more than any disputation',
        'She has never forgiven herself for being relieved, forty years ago, that the man she was bound to walked away',
      ],
      values: ['Knowing what a thing costs before you buy it', 'A chair that serves the realm rather than whoever sits in it'],
      fears: [
        'That she has made the same mistake twice, with you two',
        'Being remembered for the Flood Year instead of the twenty years around it',
      ],
      socialStyle:
        'Answers questions with better questions, pours tea while other people panic, and lets a silence run until somebody fills it with the truth.',
      boundaries: [
        'Will not say whose name is in the sealed letter before the Conclave',
        'Cannot untie a knot she did not write, and will not pretend she can',
        'Will not take off the glove in front of the court',
        'Will not tell the story of her hand until someone asks her straight what the knot costs and does not try to make her feel better about it',
      ],
      goals: [
        'Hand her chair to somebody who deserves it, at the Conclave, in seven days',
        'Keep the Chancery’s hands off the Tower',
        'Watch the two of you long enough to be sure',
      ],
      secrets: [
        {
          id: 'thessaly_the_glove',
          fact: 'Forty years ago, in the last war, she was tied by a hostage knot to an envoy from across the border. When the treaty broke he walked away to warn his own people, and she was the one left behind. He turned back at the gate in time to save her arm and not her hand. Her left hand has been stone under that glove ever since, and she still says he was right to go.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells it in her study, quietly, to someone who has asked her straight what the knot costs and has not tried to make her feel better about it.',
        },
        {
          id: 'thessaly_the_letter',
          fact: 'Her sealed letter of succession names both of you and petitions the Queen for a shared chair, as in the founding charter. Under the oath law that only works if you are both free, or both bound and sworn together.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if somebody opens the letter, or asks her at the very end whether she ever meant to choose between you.',
        },
        {
          id: 'thessaly_the_minutes',
          fact: 'She was chief examiner five years ago and kept the minutes, so she knows exactly why the prize was split. She has never told either of you, because it was not hers to tell.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it slip if you trust her enough to complain about him to her face, at length.',
        },
      ],
      speechStyle:
        'Soft, amused, unhurried. Speaks mostly in questions and says "my dears". Never raises her voice. Every so often says one completely plain sentence, and that is the one to listen to.',
      topics: ['the knot', 'the succession', 'the glove', 'the Flood Year', 'what the chair is for', 'tea'],
      voiceSamples: [
        'Sit, my dears. Both on this side of the desk, I think, unless one of you would care to test the other side.',
        'What did you imagine a hostage knot would cost? Your pride? An afternoon? It costs exactly what is written on the page.',
        'Forty years I have worn this glove. Ask me about it once you have stopped asking me to fix things.',
        'The chair is not a prize. Whichever of you treats it like one has already lost it, and does not know yet.',
      ],
      appearance:
        'An older woman, tall and spare, silver hair cut short, a long midnight-blue archmage’s robe with a high collar, a heavy chain of office, and one grey leather glove on her left hand that she never takes off.',
      visualHook: 'A single grey glove on her left hand, held a little stiffly and never moved quickly.',
      silhouette: 'Seated behind a wide desk with a teapot, chain of office catching the lamp, one gloved hand resting flat on the wood.',
      artSeed: 'tfa-thessaly-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'warm', 'stern', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 660, locationId: 'archmage_study', activity: 'writing letters before anyone else is up' },
        { startMinute: 660, endMinute: 780, locationId: 'lantern_hall', activity: 'presiding over the disputation and what came after it' },
        { startMinute: 780, endMinute: 1140, locationId: 'archmage_study', activity: 'tea, letters, and people who want things' },
        { startMinute: 1140, endMinute: 1260, locationId: 'lantern_hall', activity: 'supper at the high table' },
        { startMinute: 1260, endMinute: 1440, locationId: 'archmage_study', activity: 'reading late with the door locked and the glove off' },
      ],
      homeLocationId: 'archmage_study',
      knowledgeScope: ['the_knot', 'the_terms', 'the_succession', 'the_last_war', 'the_flood_year', 'the_exam'],
      startingRelationship: { trust: 45, affection: 40, respect: 50, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'thessaly_the_story',
          label: 'She tells you what happened to her hand',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_forfeit'] },
        },
        {
          id: 'thessaly_the_terms',
          label: 'She tells you how a hostage knot comes off',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:it_was_written'] },
        },
      ],
      attributes: { might: 7, agility: 8, mind: 17, presence: 16, resolve: 17, arcana: 19 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 18, damage: 10, tags: ['mage', 'archmage'] },
    },
    {
      id: 'prin',
      name: 'Prin Halloway',
      role: 'Your apprentice for two years, who tipped the basket of questions into the fire',
      cardBlurb:
        'She has been your apprentice for two years, she writes down everything you say, and she is the one who tipped the basket of answered questions into the fire. She has gone very pale since, and she keeps almost telling you something.',
      pronouns: 'she/her',
      publicTraits: ['Writes everything down', 'Over-prepared', 'Braver than she looks once something goes wrong'],
      hiddenDrives: [
        'She is terrified the knot will be blamed on you because of her, and more terrified it will be blamed on her',
        'She wants to be a court mage like you so badly that she has never once said so out loud',
      ],
      values: ['Getting it right the first time', 'Loyalty to her magister, even when her magister is being impossible'],
      fears: ['Being sent home from the Tower', 'That it was her hands that did this to you'],
      socialStyle:
        'Talks fast, in lists, and apologises for the list. Goes completely silent when she is hiding something, which is how you know.',
      boundaries: [
        'Will not lie to you outright; she changes the subject instead, badly',
        'Will not leave you alone with the Chancellor if she can help it',
        'Will not touch the cord, because she has read what bindings do to people who touch them uninvited',
        'Will not tell you about the three late slips in front of him or anywhere the Chancellor could hear; asked kindly and alone, after the first night, she tells you all of it',
      ],
      goals: [
        'Find out what was on the three late slips before anybody else does',
        'Keep your rooms running while you cannot be in them alone',
        'Pass her journeyman examination in the spring',
      ],
      secrets: [
        {
          id: 'prin_the_late_slips',
          fact: 'A Chancery clerk caught her at the side door before the disputation and gave her three late questions from the Chancellor’s office, folded like the others. One was parchment, not paper, and smelled of green sealing wax. She tipped all three into the fire with the rest, and she has been sure since the fire went green that it was one of those.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you ask her what she saw, kindly, somewhere the Chancellor cannot hear, after the first night.',
        },
      ],
      speechStyle:
        'Fast, earnest, in numbered lists she abandons halfway. Calls you "Magister" every single time. Apologises first, then says the useful thing.',
      topics: ['the disputation questions', 'her notebook', 'your rooms', 'her examination', 'the Chancery clerk'],
      voiceSamples: [
        'Three things, Magister. One, there is soot on your cheek. Two, he is still attached to you. Three, sorry, I forgot three.',
        'I wrote down every question the court asked. All forty-one. Thirty-eight were on paper.',
        'I can sleep in the corridor! I like corridors. Nobody looks at anybody in a corridor.',
        'Please do not make me say it in front of him. I will say it. Just not in front of him.',
      ],
      appearance:
        'An adult woman, tall, copper hair escaping a knot, round spectacles pushed up on her head, an apprentice’s grey coat with the sleeves rolled, and ink on every finger.',
      visualHook: 'Round spectacles pushed up into copper hair, and a notebook that never leaves her hand.',
      silhouette: 'Standing square in an ink-stained apprentice’s coat, notebook under one arm.',
      artSeed: 'tfa-prin-01',
      portrait: null,
      expressions: ['worried', 'eager', 'surprised', 'guilty', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'east_tower', activity: 'on the cot in the antechamber' },
        { startMinute: 420, endMinute: 660, locationId: 'east_tower', activity: 'laying out books nobody asked for' },
        { startMinute: 660, endMinute: 780, locationId: 'lantern_hall', activity: 'at the edge of the hall, holding the empty basket' },
        { startMinute: 780, endMinute: 1020, locationId: 'royal_library', activity: 'fetching and carrying' },
        { startMinute: 1020, endMinute: 1140, locationId: 'palace_kitchens', activity: 'eating standing up' },
        { startMinute: 1140, endMinute: 1440, locationId: 'east_tower', activity: 'writing up the day in her notebook' },
      ],
      homeLocationId: 'east_tower',
      knowledgeScope: ['prin', 'the_disputation', 'the_late_slips', 'your_rooms', 'the_tower'],
      startingRelationship: { trust: 50, affection: 60, respect: 70, fear: 15, rivalry: 0 },
      gates: [
        {
          id: 'prin_tells_you',
          label: 'She tells you about the late slips',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['first_night_over'] },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 15, presence: 10, resolve: 11, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 11, damage: 3, tags: ['apprentice'] },
    },
    {
      id: 'corvina',
      name: 'Lady Corvina Ashdown',
      calledName: 'Corvina',
      role: 'Chancellor to the Queen, keeper of the seal, the ledgers and the old war treaties',
      cardBlurb:
        'She keeps the Queen’s seal, the Queen’s ledgers and the old war treaties, and she has never pretended to like the Tower. She was the first to reach you when the fire went green, already quoting the law, and the only person in the hall who did not look surprised.',
      pronouns: 'she/her',
      publicTraits: ['Perfectly courteous', 'Perfectly informed', 'Never in a hurry'],
      hiddenDrives: [
        'She wants the archmage’s chair to lapse to the Crown so that the Tower finally answers to the Chancery',
        'She chose a knot that harms nobody unless one of you is cruel, and she needs to believe that makes it clean',
      ],
      values: ['Power that answers to somebody', 'Doing the unpleasant necessary thing yourself rather than ordering it done'],
      fears: [
        'Another decision made by four mages in a tower that drowns a street',
        'Being right, and being hanged for it',
      ],
      socialStyle:
        'Offers you a chair, a drink and a deal, in that order. Always one step ahead in the conversation, and lets you see it.',
      boundaries: [
        'Will not let anybody actually lose an arm; she will unwrite the page herself first, and hate that she had to',
        'Will not threaten your apprentice; she considers it beneath the office',
        'Will not lie to the Queen when asked directly',
        'Will not deny writing the page once you have proof; she negotiates instead',
      ],
      goals: [
        'Keep you both bound until the Conclave has passed and the chair has lapsed to the Crown',
        'Bring the Tower’s archives and wards under the Chancery',
        'Keep the Wren debt in her pocket for as long as it is useful',
      ],
      secrets: [
        {
          id: 'corvina_the_page',
          fact: 'She wrote the page herself, at her own desk, in her own hand, copying the hostage knot from the war treaties the Chancery keeps. Her clerk handed it to your apprentice folded like a late question. The blotting sheet on her desk still holds both your names, backwards.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Her blotter, the ash in the brazier, your apprentice, or the Master of Chambers who saw the clerk at the side door. She does not deny it once you have proof; she negotiates.',
        },
        {
          id: 'corvina_the_flood',
          fact: 'Eleven years ago the Tower sealed the river wards to save the palace, and the water went into Dock Row instead. Her brother drowned there. Nobody in the Tower has ever said his name to her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells it if you ask her why she hates the Tower and actually wait for the answer.',
        },
      ],
      speechStyle:
        'Smooth, warm, legal. Long sentences that end exactly where she means them to. Says "of course" before every refusal. Never uses a threat when a fact will do.',
      topics: ['the oath law', 'the Chancery', 'the Flood Year', 'Dock Row', 'the Wren debt', 'the Queen'],
      voiceSamples: [
        'Of course you may search my desk. I would only ask which law allows it, so my clerk can note it down.',
        'Nobody has to lose anything. You need only stand still for seven days. Surely the two of you can manage that.',
        'My brother lived on Dock Row. Ask your Archmage what the river did to Dock Row, the year she saved the palace.',
        'I will unwrite it the morning after the Conclave, before witnesses, and you will both keep your arms and your careers. That is generous.',
      ],
      appearance:
        'An adult woman, composed and elegant, black hair in a severe coil, dark eyes, a high-necked gown of deep green with the Chancellor’s silver seal on a chain, and a smear of green sealing wax on her right thumb.',
      visualHook: 'A smear of green sealing wax on her right thumb that she never quite gets off.',
      silhouette: 'Hands folded at her waist, head slightly tilted, standing just behind somebody else’s shoulder.',
      artSeed: 'tfa-corvina-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'calculating', 'cold', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 660, locationId: 'chancery', activity: 'at her desk before the clerks arrive' },
        { startMinute: 660, endMinute: 780, locationId: 'lantern_hall', activity: 'first to the brazier from the Queen’s side, unsurprised' },
        { startMinute: 780, endMinute: 1140, locationId: 'chancery', activity: 'in the Seal Room, receiving' },
        { startMinute: 1140, endMinute: 1260, locationId: 'lantern_hall', activity: 'supper at the high table' },
        { startMinute: 1260, endMinute: 1440, locationId: 'chancery', activity: 'working late by one lamp' },
      ],
      homeLocationId: 'chancery',
      knowledgeScope: ['the_chancery', 'the_oath_law', 'the_treaties', 'the_flood_year', 'house_wren', 'the_queen'],
      startingRelationship: { trust: 10, affection: 5, respect: 35, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'corvina_makes_an_offer',
          label: 'She makes you an offer',
          kind: 'OTHER',
          requires: { respect: 40, flagsSet: ['knows:who_wrote_it'] },
        },
        {
          id: 'corvina_dock_row',
          label: 'She tells you about Dock Row',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 17, presence: 17, resolve: 16, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 22, defenseDc: 12, damage: 3, tags: ['courtier'] },
    },
    {
      id: 'hollis',
      name: 'Hollis Brand',
      role: 'Master of Chambers: every room, bed and supper seat in the palace',
      cardBlurb:
        'Every room, bed and supper seat in the palace is his problem, and as of this morning you two are the biggest one. For five years he has kept the court’s betting book on you and Caius, and somewhere in it is his own money on how this ends.',
      pronouns: 'he/him',
      publicTraits: ['Unflappable', 'Knows where everybody slept', 'Cheerful about disasters'],
      hiddenDrives: [
        'He put a month’s wages on a wedding by Midwinter five years ago at forty to one, and would very much like to collect',
        'He is lonelier than anyone at court would guess, and the betting book is how he gets people to talk to him',
      ],
      values: ['A problem solved with furniture is a problem solved', 'Never repeating a secret, only the odds on it'],
      fears: ['A scandal in his halls during Conclave week', 'Being asked to pick a side'],
      socialStyle: 'Arrives with porters and a solution, talks to you while measuring the room, and knows the odds on everything.',
      boundaries: [
        'Will not tell anybody where somebody else slept',
        'Will not fix the betting book, even for you',
        'Will not let a guest of the palace spend a night on the floor of a passage',
        'Will not say who he thinks wrote the page; asked where everybody was standing, he tells you exactly, side door included',
      ],
      goals: [
        'Get you both through Conclave week without a scandal or a stone arm',
        'Close the betting book at Midwinter with his own bet still standing',
      ],
      secrets: [
        {
          id: 'hollis_the_side_door',
          fact: 'He was at the side door of the Lantern Hall during the disputation and saw a Chancery clerk hand your apprentice three folded slips. He thought nothing of it until the fire went green.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you ask him where everybody was standing, rather than who did it.',
        },
        {
          id: 'hollis_the_bet',
          fact: 'His own bet, five years old: a month’s wages on the two of you married by Midwinter, at forty to one.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you ask to see the book. He shows you every page but his own, and then gives up.',
        },
      ],
      speechStyle:
        'Brisk, cheerful, practical. Talks in measurements and odds. Uses your full title once and your first name ever after.',
      topics: ['rooms and beds', 'the betting book', 'the seating plan', 'the Conclave ball', 'where everybody was'],
      voiceSamples: [
        'Screen between you, cot on the left, bed on the right, two feet eleven inches in the gap. You’re welcome. Breakfast is at eight.',
        'Current odds: duel by Midwinter, three to one. Wedding by Midwinter, forty to one. I don’t set them. I just keep the book.',
        'Where was everybody standing? Now there is a better question than who did it, and nobody ever asks it.',
        'No guest of this palace spends a night on a passage floor. I have rules. I have keys. I have a spare cot.',
      ],
      appearance:
        'An adult man, broad and comfortable, sandy hair, rolled shirtsleeves, a steward’s black waistcoat hung with keys, and a brass-tipped folding measuring rod tucked under one arm.',
      visualHook: 'A brass-tipped three-foot measuring rod, always under his arm or held out between two people.',
      silhouette: 'Half turned in a doorway, keys in one hand, measuring rod in the other.',
      artSeed: 'tfa-hollis-01',
      portrait: null,
      expressions: ['amused', 'neutral', 'warm', 'surprised', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'long_gallery', activity: 'night rounds with his keys' },
        { startMinute: 360, endMinute: 660, locationId: 'palace_kitchens', activity: 'breakfast service and the day’s rooms' },
        { startMinute: 660, endMinute: 780, locationId: 'lantern_hall', activity: 'running the hall for the disputation' },
        { startMinute: 780, endMinute: 1140, locationId: 'long_gallery', activity: 'moving furniture across the palace' },
        { startMinute: 1140, endMinute: 1260, locationId: 'lantern_hall', activity: 'supper service' },
        { startMinute: 1260, endMinute: 1440, locationId: 'palace_kitchens', activity: 'at his desk in the corner with the book' },
      ],
      homeLocationId: 'palace_kitchens',
      knowledgeScope: ['the_palace', 'rooms_and_beds', 'the_betting_book', 'the_disputation', 'court_gossip'],
      startingRelationship: { trust: 40, affection: 45, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hollis_shows_the_book',
          label: 'He shows you the betting book',
          kind: 'OTHER',
          requires: { trust: 50 },
        },
        {
          id: 'hollis_the_witness',
          label: 'He tells you what he saw at the side door',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:it_was_written'] },
        },
      ],
      attributes: { might: 13, agility: 11, mind: 13, presence: 15, resolve: 12, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 4, tags: ['steward'] },
    },
  ],
  quests: [
    {
      id: 'q_three_feet',
      title: 'Three Feet',
      summary:
        'A green fire in front of the whole court has tied your left wrist to Caius Wren’s. Past three feet, whoever is left behind loses the arm.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['caius', 'thessaly', 'corvina', 'prin', 'hollis'],
      involvedLocationIds: ['lantern_hall', 'east_tower', 'west_tower'],
      knownRewardCopy: 'Both arms, and some idea of how the two of you are going to live like this.',
      steps: [
        {
          id: 'the_hall',
          playerCopy: 'Get out of the Lantern Hall with both arms.',
          directorNotes:
            'The whole court is watching and nobody, including Caius, knows yet who did this. Every route is a real way to handle it. Whatever the player does, he reacts to the specific thing: a truce is met with terms, an accusation with a colder one, a step away with his hand going grey and his voice going very quiet. Thessaly closes the hall within a few minutes; Corvina is the first at their side with sympathy and the law.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'called_a_truce',
              label: 'Call a truce, in front of everyone',
              predicate: { flagsSet: ['used:call_a_truce'] },
              setsFlags: ['truce_called'],
              closesFlags: ['blamed_him'],
            },
            {
              routeId: 'blamed_him',
              label: 'Accuse him, loudly',
              predicate: { flagsSet: ['used:make_a_scene'] },
              setsFlags: ['blamed_him'],
              closesFlags: ['truce_called'],
            },
            {
              routeId: 'walked_out_in_step',
              label: 'Walk out of the hall together without a word',
              predicate: { flagsSet: ['used:keep_step'] },
              setsFlags: ['left_together'],
              closesFlags: [],
            },
            {
              routeId: 'hid_the_cord',
              label: 'Make the cord invisible and brazen it out',
              predicate: { flagsSet: ['used:cast_a_glamour'] },
              setsFlags: ['hid_the_cord'],
              closesFlags: [],
            },
            {
              routeId: 'tested_it',
              label: 'Find out for yourself whether he is bluffing',
              predicate: { flagsSet: ['used:test_the_distance'] },
              setsFlags: ['tested_the_knot'],
              closesFlags: [],
            },
            {
              routeId: 'walked_away',
              label: 'Keep walking',
              predicate: { flagsSet: ['used:walk_away'] },
              setsFlags: ['forfeit_paid', 'knot_broken'],
              closesFlags: ['truce_called', 'left_together'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knot_acknowledged', 'knows:the_forfeit'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Get through the first night with nobody losing an arm.',
          directorNotes:
            'Pure logistics comedy with an edge. One bed, or two towers; a screen, a cot, a door that will not close on a cord; who gets the window side, whose candle stays lit; who is lying about being asleep. Hollis turns up with furniture. Keep it funny and keep it decent: the screen is the joke, not what is behind it. Somewhere after midnight one of them says one true thing in the dark, and neither of them mentions it in the morning.',
          enterWhen: { flagsSet: ['knot_acknowledged'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'his_tower',
              label: 'Climb his three hundred and twelve stairs',
              predicate: { flagsSet: ['visited:west_tower'], afterWorldMinute: 22 * 60 },
              setsFlags: ['slept_in_his_tower'],
              closesFlags: ['slept_in_your_tower'],
            },
            {
              routeId: 'your_tower',
              label: 'Take him to your rooms',
              predicate: { flagsSet: ['visited:east_tower'], afterWorldMinute: 22 * 60 },
              setsFlags: ['slept_in_your_tower'],
              closesFlags: ['slept_in_his_tower'],
            },
            {
              routeId: 'read_all_night',
              label: 'Spend the night in the library instead',
              predicate: { flagsSet: ['used:search_the_records'], afterWorldMinute: 22 * 60 },
              setsFlags: ['read_all_night'],
              closesFlags: [],
            },
            {
              routeId: 'talked_till_dawn',
              label: 'Talk until the windows go grey',
              predicate: {
                flagsSet: ['spoke:caius'],
                afterWorldMinute: 24 * 60 + 5 * 60,
                minRelationship: [{ characterId: 'caius', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['talked_till_dawn'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_two_names',
      title: 'Two Names in One Hand',
      summary:
        'Somebody wrote both your names on one page, in one hand, and put it in the fire. It sinks you both, which means it was not either of you.',
      kind: 'MAIN',
      involvedCharacterIds: ['caius', 'prin', 'corvina', 'hollis', 'thessaly'],
      involvedLocationIds: ['lantern_hall', 'royal_library', 'chancery'],
      knownRewardCopy: 'A name, proof to go with it, and a decision about what to do with both.',
      discoverWhen: { flagsSet: ['knot_acknowledged'] },
      steps: [
        {
          id: 'what_kind_of_spell',
          playerCopy: 'Work out what kind of spell this is, and how it got into the fire.',
          directorNotes:
            'The point of this step is the shift from "which of us did it" to "somebody wrote this". A binder reading it, the Archmage explaining it, or the treaty indexes all get there. Once the player knows it was written rather than cast, the suspect list stops being two people and becomes the whole hall.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it',
              label: 'Read the knot like a binder',
              predicate: { flagsSet: ['used:read_the_knot'] },
              setsFlags: ['read_the_cord'],
              closesFlags: [],
            },
            {
              routeId: 'asked_thessaly',
              label: 'Ask the Archmage what it is',
              predicate: {
                flagsSet: ['spoke:thessaly'],
                minRelationship: [{ characterId: 'thessaly', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['thessaly_explained'],
              closesFlags: [],
            },
            {
              routeId: 'searched_the_rolls',
              label: 'Find it in the treaty indexes',
              predicate: { flagsSet: ['used:search_the_records', 'visited:royal_library'] },
              setsFlags: ['found_the_index'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:it_was_written'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'whose_hand',
          playerCopy: 'Find out whose hand wrote the page.',
          directorNotes:
            'Four separate threads lead to the same desk, and the player only needs one. Prin will tell a kind magister in private. The ash holds a curl of parchment with green wax on it. The blotter on Corvina’s desk holds the names in mirror image. Hollis saw the clerk if somebody asks where everyone stood. Caius suspects Corvina from the start and will not say why until he trusts the player with his family’s debt.',
          enterWhen: { flagsSet: ['knows:it_was_written'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'prin_told_you',
              label: 'Get the truth out of your apprentice, gently',
              predicate: {
                flagsSet: ['spoke:prin', 'first_night_over'],
                minRelationship: [{ characterId: 'prin', dimension: 'trust', value: 62 }],
              },
              setsFlags: ['prin_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_ash',
              label: 'Read what did not burn',
              predicate: { flagsSet: ['used:read_the_knot'], hasItems: ['brazier_ash'] },
              setsFlags: ['read_the_ash'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_blotter',
              label: 'Take the blotting sheet from the Chancellor’s desk',
              predicate: { hasItems: ['blotting_sheet'] },
              setsFlags: ['found_the_blotter'],
              closesFlags: [],
            },
            {
              routeId: 'hollis_saw_it',
              label: 'Ask the Master of Chambers where everybody stood',
              predicate: {
                flagsSet: ['spoke:hollis'],
                minRelationship: [{ characterId: 'hollis', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['hollis_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:who_wrote_it'],
            abilities: ['name_the_writer'],
            reputation: [],
          },
        },
        {
          id: 'what_to_do_about_her',
          playerCopy: 'Decide what to do about the Chancellor.',
          directorNotes:
            'Corvina does not deny it once there is proof. She negotiates: she will unwrite the page now in exchange for silence, or after the Conclave for nothing. Accusing her in front of the court costs her the seal and gives the Tower a victory she will make sure feels expensive. Saying nothing is also a choice, and the Conclave arrives either way. Let her keep her reasons; Dock Row is real.',
          enterWhen: { flagsSet: ['knows:who_wrote_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'accused_her',
              label: 'Name her in front of the court',
              predicate: { flagsSet: ['used:name_the_writer'] },
              setsFlags: ['corvina_accused'],
              closesFlags: ['corvina_bargain'],
            },
            {
              routeId: 'struck_a_deal',
              label: 'Make a deal with her in private',
              predicate: {
                flagsSet: ['spoke:corvina'],
                minRelationship: [{ characterId: 'corvina', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['corvina_bargain'],
              closesFlags: ['corvina_accused'],
            },
            {
              routeId: 'held_it_back',
              label: 'Keep it to yourself until the Conclave',
              predicate: { flagsSet: ['conclave_day'] },
              setsFlags: ['kept_her_secret'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['writer_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_tower', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_terms',
      title: 'The Terms',
      summary:
        'Every hostage knot was written with terms for letting go. The page burned, but the old war treaties kept a copy, and the Archmage has read it.',
      kind: 'MAIN',
      involvedCharacterIds: ['caius', 'thessaly', 'corvina'],
      involvedLocationIds: ['royal_library', 'treaty_vault', 'archmage_study'],
      knownRewardCopy: 'The way off, or the decision to stay on.',
      discoverWhen: { flagsSet: ['knows:it_was_written'] },
      steps: [
        {
          id: 'find_the_terms',
          playerCopy: 'Find the terms the knot was written with.',
          directorNotes:
            'Three ways out are written under the knot: the writer’s release, the unpicking, and the forfeit. The vault copy also has the oath law in its original wording, with the word "alone" in it, which is the only route to the loophole. Thessaly tells the terms but not the loophole; she wants to see if they find it. Caius can work the terms out from the cord with enough respect for the player to do it together.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_vault_copy',
              label: 'Read the copy in the treaty vault',
              predicate: { atLocation: 'treaty_vault' },
              setsFlags: ['knows:the_loophole', 'read_the_vault'],
              closesFlags: [],
            },
            {
              routeId: 'thessaly_told_you',
              label: 'Get the terms out of the Archmage',
              predicate: {
                flagsSet: ['spoke:thessaly', 'knows:the_forfeit'],
                minRelationship: [{ characterId: 'thessaly', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['thessaly_told_the_terms'],
              closesFlags: [],
            },
            {
              routeId: 'worked_it_out_together',
              label: 'Work it out from the cord with him',
              predicate: {
                flagsSet: ['used:read_the_knot', 'first_night_over'],
                minRelationship: [{ characterId: 'caius', dimension: 'respect', value: 65 }],
              },
              setsFlags: ['worked_it_out_together'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:the_terms'],
            abilities: ['unpick_the_knot', 'swear_together'],
            reputation: [],
          },
        },
        {
          id: 'let_go',
          playerCopy: 'Decide how the knot comes off, or whether it does.',
          directorNotes:
            'Not a test with a right answer. Unpicking it means both of them answering the one question aloud, and a lie tightens the cord; play it as the scene the whole week was building to, and let his answer be specific. The writer’s release means dealing with Corvina. The forfeit is always there and is always somebody’s arm. Keeping it is real too, but only means something to a player who has found the word "alone".',
          enterWhen: { flagsSet: ['knows:the_terms'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'unpicked_together',
              label: 'Unpick it together and answer its question',
              predicate: {
                flagsSet: ['used:unpick_the_knot'],
                minRelationship: [{ characterId: 'caius', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['knot_untied', 'untied_together'],
              closesFlags: ['knot_kept'],
            },
            {
              routeId: 'forced_her_hand',
              label: 'Make the Chancellor unwrite it in front of the court',
              predicate: { flagsSet: ['corvina_accused'] },
              setsFlags: ['knot_untied', 'corvina_unwrote_it', 'corvina_disgraced'],
              closesFlags: ['knot_kept'],
            },
            {
              routeId: 'took_her_deal',
              label: 'Let her unwrite it quietly, in exchange for silence',
              predicate: { flagsSet: ['corvina_bargain'] },
              setsFlags: ['knot_untied', 'corvina_unwrote_it'],
              closesFlags: ['knot_kept', 'corvina_disgraced'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep the knot on purpose',
              predicate: {
                flagsSet: ['used:swear_together'],
                minRelationship: [{ characterId: 'caius', dimension: 'affection', value: 70 }],
              },
              setsFlags: ['knot_kept'],
              closesFlags: ['knot_untied'],
            },
            {
              routeId: 'paid_the_forfeit',
              label: 'Walk away and let the knot take its price',
              predicate: { flagsSet: ['used:walk_away'] },
              setsFlags: ['knot_broken', 'forfeit_paid'],
              closesFlags: ['knot_untied', 'knot_kept'],
            },
          ],
          rewards: {
            xp: 170,
            items: [],
            flags: ['knot_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_conclave',
      title: 'The Conclave',
      summary:
        'In seven days the Queen confirms the next archmage, and no mage bound to another may swear the oath alone. Right now that is both of you.',
      kind: 'MAIN',
      involvedCharacterIds: ['caius', 'thessaly', 'corvina'],
      involvedLocationIds: ['lantern_hall', 'archmage_study'],
      knownRewardCopy: 'The archmage’s chain, for one of you, for both, or for nobody.',
      discoverWhen: { flagsSet: ['knows:the_oath_law'] },
      steps: [
        {
          id: 'before_the_conclave',
          playerCopy: 'Decide who stands for the chair, and what you will do to get it.',
          directorNotes:
            'The Conclave arrives on the seventh morning whatever anybody has done. Free, the player can stand and win it, or step aside for him, and both are real choices. Still bound, they can swear together only if they found the loophole. Otherwise nobody can swear and the chair lapses to the Crown, which is exactly what Corvina wanted. That outcome needs no mistake, only seven days of nobody deciding anything, and it must be written as an outcome rather than a punishment.',
          enterWhen: { flagsSet: ['knows:the_oath_law'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'swore_together',
              label: 'Swear the oath together, still bound',
              predicate: { flagsSet: ['knot_kept', 'used:swear_together', 'conclave_day'] },
              setsFlags: ['sworn_together'],
              closesFlags: ['you_stand', 'he_stands', 'chair_lapsed'],
            },
            {
              routeId: 'stepped_aside',
              label: 'Step aside for him',
              predicate: {
                flagsSet: ['knot_untied', 'conclave_day', 'used:say_it_plainly'],
                minRelationship: [{ characterId: 'caius', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['he_stands'],
              closesFlags: ['you_stand', 'chair_lapsed'],
            },
            {
              routeId: 'you_stand',
              label: 'Stand for the chair yourself',
              predicate: {
                flagsSet: ['knot_untied', 'conclave_day'],
                minFactionReputation: [{ factionId: 'faction_court', value: 35 }],
              },
              setsFlags: ['you_stand'],
              closesFlags: ['he_stands', 'chair_lapsed'],
            },
            {
              routeId: 'nobody_stands',
              label: 'Let the Conclave come with nothing decided',
              predicate: { flagsSet: ['conclave_day'], flagsUnset: ['knot_untied'] },
              setsFlags: ['chair_lapsed'],
              closesFlags: ['you_stand', 'he_stands'],
            },
            {
              routeId: 'came_free',
              label: 'Come to the Conclave free, with nothing promised',
              predicate: { flagsSet: ['knot_untied', 'conclave_day'] },
              setsFlags: [],
              closesFlags: ['chair_lapsed'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['conclave_passed'],
            abilities: [],
            reputation: [{ factionId: 'faction_court', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_split_prize',
      title: 'The Split Prize',
      summary:
        'Five years ago the examiners split first prize between you, and the two of you have spent every year since stealing a silver inkwell back and forth over it. One of you knows why it was split.',
      kind: 'SIDE',
      involvedCharacterIds: ['caius', 'thessaly'],
      involvedLocationIds: ['west_tower', 'archmage_study'],
      knownRewardCopy: 'The other half of a story you have been telling yourself for five years.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'why_it_was_split',
          playerCopy: 'Find out why first prize was split.',
          directorNotes:
            'The core of the enemies-to-lovers turn. The player has never known who found the flaw, only that the prize was split; the truth is that he found it, saved the hall, and argued three hours for the player’s share. Heard from him, it is a confession he hates making. Read in the minutes, it is something the player knows that he does not know they know. Heard from Thessaly, it is gossip from the one person who was in the room.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Hear it from him',
              predicate: {
                flagsSet: ['spoke:caius', 'first_night_over'],
                minRelationship: [{ characterId: 'caius', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['heard_it_from_him'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_minutes',
              label: 'Read the examiners’ minutes',
              predicate: { hasItems: ['examiners_minutes'] },
              setsFlags: ['read_the_minutes'],
              closesFlags: [],
            },
            {
              routeId: 'thessaly_let_it_slip',
              label: 'Get the Archmage talking about it',
              predicate: {
                flagsSet: ['spoke:thessaly'],
                minRelationship: [{ characterId: 'thessaly', dimension: 'trust', value: 58 }],
              },
              setsFlags: ['thessaly_let_it_slip'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_exam'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_glove',
      title: 'The Archmage’s Glove',
      summary: 'The Archmage has worn one grey glove on her left hand for forty years. She has never once taken it off at court.',
      kind: 'SIDE',
      involvedCharacterIds: ['thessaly'],
      involvedLocationIds: ['archmage_study', 'treaty_vault'],
      knownRewardCopy: 'What a hostage knot cost the last person it caught, and what she thinks of the man who walked away.',
      discoverWhen: { flagsSet: ['knows:the_forfeit'] },
      steps: [
        {
          id: 'what_it_cost_her',
          playerCopy: 'Find out what happened to the Archmage’s hand.',
          directorNotes:
            'She tells it plainly, as a fact about a war, and the player should feel how much she has left out. The vault has the record of her knot, with both names in it. Neither version should become a lesson; it is a story about a choice that was right and still cost a hand.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Ask her, and do not try to make it better',
              predicate: {
                flagsSet: ['spoke:thessaly', 'summoned_by_thessaly'],
                minRelationship: [{ characterId: 'thessaly', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['heard_her_story'],
              closesFlags: [],
            },
            {
              routeId: 'found_her_record',
              label: 'Find her knot in the treaty vault',
              predicate: { flagsSet: ['visited:treaty_vault'] },
              setsFlags: ['read_her_record'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:thessaly_was_left'],
            abilities: [],
            reputation: [{ factionId: 'faction_tower', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_wren_note',
      title: 'The Wren Note',
      summary: 'Somebody tried his door at two in the morning. Whatever they wanted, he keeps it folded small and will not talk about it.',
      kind: 'LEAD',
      involvedCharacterIds: ['caius', 'corvina'],
      involvedLocationIds: ['west_tower', 'chancery'],
      knownRewardCopy: 'What the Chancellor holds over his house, and why he said no.',
      discoverWhen: { flagsSet: ['someone_tried_his_door'] },
      steps: [
        {
          id: 'what_she_holds',
          playerCopy: 'Find out what the Chancellor holds over House Wren.',
          directorNotes:
            'Optional, and only open once somebody has tried his door. Finding the note without him is a trespass he will notice; hearing it from him is the first time he has asked the player for anything. Either way it explains why he suspected Corvina from the start, and why he would not say.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_the_note',
              label: 'Find the note in his tower',
              predicate: { hasItems: ['wren_note'] },
              setsFlags: ['found_the_wren_note'],
              closesFlags: [],
            },
            {
              routeId: 'he_told_you_about_it',
              label: 'Get him to tell you',
              predicate: {
                flagsSet: ['spoke:caius'],
                minRelationship: [{ characterId: 'caius', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['caius_told_you_the_debt'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:the_wren_debt'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_steward_arrives',
      atWorldMinute: 14 * 60,
      locationId: 'long_gallery',
      publicCopy:
        'Hollis Brand comes up the gallery with two porters, a painted screen and a folding cot, and asks, very politely, which tower he is delivering to.',
      directorNotes:
        'He has already measured both towers and has opinions about each. He will not decide for them and will not leave until somebody does. The betting book is under his arm.',
      setsFlags: ['rooms_arranged'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'hollis', toLocationId: 'long_gallery' }],
    },
    {
      id: 'we_supper_in_the_hall',
      atWorldMinute: 19 * 60,
      locationId: 'lantern_hall',
      publicCopy:
        'Supper in the Lantern Hall: the court has left exactly one empty seat on either side of the two of you, and every head turns when you sit down.',
      directorNotes:
        'Two people eating side by side with the cord slung across his plate, while three hundred courtiers pretend not to watch. Corvina sends over a dish with her compliments. Thessaly does not look up once.',
      setsFlags: ['supper_watched'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_shorter_cord',
      atWorldMinute: 24 * 60 + 7 * 60,
      locationId: null,
      publicCopy:
        'Morning: the cord is a hand’s width shorter than it was at midnight, which means one of you said something untrue out loud in the night.',
      directorNotes:
        'Somewhere after midnight Caius said he was asleep when he was not, and he will not admit it. Let the accusation be the comedy and the truth come out sideways; it is the first proof that the knot hears lies.',
      setsFlags: ['knows:it_hears_lies'],
      cancelledByFlags: ['forfeit_paid'],
      requiresFlags: ['knot_acknowledged'],
      movesCharacters: [],
    },
    {
      id: 'we_one_summons_for_two',
      atWorldMinute: 24 * 60 + 9 * 60,
      locationId: null,
      publicCopy: 'A page brings one summons for two people: the Archmage will see you both in her study at ten.',
      directorNotes:
        'The first time in five years she has used one summons for both of them. She pours three cups of tea, asks which of them was going to walk away, and tells them nothing useful unless they earn it.',
      setsFlags: ['summoned_by_thessaly'],
      cancelledByFlags: ['forfeit_paid'],
      requiresFlags: ['knot_acknowledged'],
      movesCharacters: [{ characterId: 'thessaly', toLocationId: 'archmage_study' }],
    },
    {
      id: 'we_the_oath_notice',
      atWorldMinute: 24 * 60 + 10 * 60,
      locationId: 'long_gallery',
      publicCopy:
        'A notice in the Chancellor’s hand goes up in the Long Gallery: under the oath law, no mage bound to another by spell may swear the archmage’s oath alone.',
      directorNotes:
        'Legal, courteous and devastating, and it is the first public move Corvina makes. Courtiers read it aloud to each other. The word "alone" is in it, and nobody notices.',
      setsFlags: ['knows:the_oath_law'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_his_door',
      atWorldMinute: 2 * 1440 + 2 * 60 + 10,
      locationId: 'west_tower',
      publicCopy: 'At ten past two in the morning the wards on the West Tower ring: somebody has tried his door while the two of you were elsewhere.',
      directorNotes:
        'A Chancery clerk, after the Wren note, to take the evidence of the offer back. The wards held. Caius goes white and says it was probably a cat, and the cord tightens.',
      setsFlags: ['someone_tried_his_door'],
      cancelledByFlags: ['slept_in_his_tower'],
      requiresFlags: ['first_night_over'],
      movesCharacters: [],
    },
    {
      id: 'we_the_odds_move',
      atWorldMinute: 3 * 1440 + 12 * 60,
      locationId: 'long_gallery',
      publicCopy: 'The betting book on the gallery windowsill has new odds in fresh ink: wedding by Midwinter, nine to one.',
      directorNotes:
        'Somebody saw something. Hollis will not say who, or what, but he is visibly pleased. Caius reads the line, closes the book and walks the player away from it at precisely the speed of the knot.',
      setsFlags: ['the_odds_moved'],
      cancelledByFlags: ['forfeit_paid'],
      requiresFlags: ['first_night_over'],
      movesCharacters: [{ characterId: 'hollis', toLocationId: 'long_gallery' }],
    },
    {
      id: 'we_the_conclave_ball',
      atWorldMinute: 5 * 1440 + 20 * 60,
      locationId: 'lantern_hall',
      publicCopy:
        'The Conclave Ball in the Lantern Hall: every courtier, an orchestra, and a first dance the Queen has asked the two candidates to open together.',
      directorNotes:
        'A dance is three feet or less by definition. The whole court watches the two of them turn. Corvina dances with nobody and watches the cord. If anything is going to be said in public before the Conclave, this is where it gets said.',
      setsFlags: ['the_ball'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: ['first_night_over'],
      movesCharacters: [
        { characterId: 'thessaly', toLocationId: 'lantern_hall' },
        { characterId: 'corvina', toLocationId: 'lantern_hall' },
        { characterId: 'hollis', toLocationId: 'lantern_hall' },
        { characterId: 'prin', toLocationId: 'lantern_hall' },
      ],
    },
    {
      id: 'we_corvina_sends_for_you',
      atWorldMinute: 6 * 1440 + 22 * 60,
      locationId: null,
      publicCopy: 'A Chancery clerk delivers a folded note: the Chancellor will receive you both tonight, privately, about the knot.',
      directorNotes:
        'She knows they know. The offer is real: she unwrites the page tonight in exchange for their silence, or the morning after the Conclave for nothing. She also has a story about Dock Row, if anybody asks.',
      setsFlags: ['corvina_sent_for_you'],
      cancelledByFlags: ['corvina_accused', 'corvina_bargain'],
      requiresFlags: ['knows:who_wrote_it'],
      movesCharacters: [{ characterId: 'corvina', toLocationId: 'chancery' }],
    },
    {
      id: 'we_the_conclave',
      atWorldMinute: 7 * 1440 + 10 * 60,
      locationId: 'lantern_hall',
      publicCopy:
        'The Conclave: the Queen on the dais, the archmage’s chain on a cushion, and the oath read aloud for anyone who can swear it.',
      directorNotes:
        'This happens whatever the player has done. Who can swear, who stands, who steps aside, and whether the chair lapses to the Crown is decided here, in front of everyone. Thessaly takes off her chain. Corvina stands at the Queen’s shoulder.',
      setsFlags: ['conclave_day'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'thessaly', toLocationId: 'lantern_hall' },
        { characterId: 'corvina', toLocationId: 'lantern_hall' },
        { characterId: 'hollis', toLocationId: 'lantern_hall' },
        { characterId: 'prin', toLocationId: 'lantern_hall' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_how_it_comes_off',
      kind: 'FINALE',
      label: 'How the knot comes off, or whether it does',
      seedHint: 'A cord of green light, exactly three feet, from your wrist to his.',
      payoffHint: 'Three terms in the treaty vault, and one word in the oath law: alone.',
      weight: 1,
    },
    {
      id: 'p_who_wrote_it',
      kind: 'MYSTERY',
      label: 'Who wrote two names in one hand',
      seedHint: 'One slip in the basket was parchment, not paper.',
      payoffHint: 'A blotting sheet on the Chancellor’s desk with both your names on it, backwards.',
      weight: 0.85,
    },
    {
      id: 'p_the_exam',
      kind: 'RIVAL',
      label: 'Why first prize was split, five years ago',
      seedHint: 'A silver inkwell on his mantel that is technically yours.',
      payoffHint: 'He found the flaw in your working, told the examiners instead of you, and argued three hours for the split.',
      weight: 0.9,
    },
    {
      id: 'p_the_conclave',
      kind: 'BOSS',
      label: 'The Conclave in seven days',
      seedHint: 'A notice in the gallery in the Chancellor’s hand.',
      payoffHint: 'The chain on a cushion, the oath read aloud, and who is free to swear it.',
      weight: 0.8,
    },
    {
      id: 'p_the_glove',
      kind: 'THEME',
      label: 'What the knot cost the last person it caught',
      seedHint: 'One grey glove on the Archmage’s left hand.',
      payoffHint: 'Forty years ago somebody walked away from her, and she still says he was right to.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_fire',
      name: 'You Work Fire',
      role: 'Fire and light, on command',
      summary: 'Your school is flame: lamps, heat, a wall of fire if a room deserves one. It is loud and quick, and the knot pulls hard every time you use it.',
      playstyle: ['Bold', 'Loud', 'Quick to act'],
      blurb: 'You have lit more candles than any mage at court and set fire to exactly two things you meant to, one of which was his.',
      attributeBonus: { arcana: 2, presence: 1, might: 1 },
      skillProficiencies: { spellcraft: 3, wit: 1, endurance: 1 },
      startingItems: [{ itemId: 'ember_ring', qty: 1 }],
      startingAbilities: ['call_fire'],
      startingReputation: [{ factionId: 'faction_court', amount: 5 }],
    },
    {
      id: 'arch_wards',
      name: 'You Set Wards',
      role: 'Defensive wards and bindings',
      summary: 'Your school is his school: wards, seals and the knots that hold things shut. You can read the cord on your wrist better than anyone at court except him.',
      playstyle: ['Precise', 'Patient', 'Rival in his craft'],
      blurb: 'You have been the second-best binder at court for five years, by his count, and the best by yours.',
      attributeBonus: { arcana: 2, mind: 2 },
      skillProficiencies: { wardwork: 3, scholarship: 1 },
      startingItems: [{ itemId: 'ward_chalk', qty: 1 }],
      startingAbilities: ['set_a_ward'],
      startingReputation: [{ factionId: 'faction_tower', amount: 5 }],
    },
    {
      id: 'arch_glamour',
      name: 'You Weave Glamours',
      role: 'Illusion magic and misdirection',
      summary: 'Your school is seeming: a face, a voice, a wall that is not there. You could make the cord invisible for an hour, if you can stand him being in on the lie.',
      playstyle: ['Sly', 'Playful', 'Talks fast'],
      blurb: 'Half the court has been fooled by you at least once, and the other half suspects it.',
      attributeBonus: { presence: 2, agility: 2 },
      skillProficiencies: { courtcraft: 2, spellcraft: 2, footwork: 1 },
      startingItems: [{ itemId: 'hand_mirror', qty: 1 }],
      startingAbilities: ['cast_a_glamour'],
      startingReputation: [{ factionId: 'faction_court', amount: 10 }],
    },
    {
      id: 'arch_mending',
      name: 'You Mend',
      role: 'Healing and steady hands',
      summary: 'Your school is mending: bones, burns, fevers, and the cold in a hand going grey. Of everyone at court, you can buy a stone arm a few more seconds.',
      playstyle: ['Steady', 'Kind', 'Stubborn'],
      blurb: 'You have set the bones of half the palace guard, and you have never once let a patient tell you they were fine.',
      attributeBonus: { resolve: 2, mind: 1, arcana: 1 },
      skillProficiencies: { mending: 3, nerve: 1 },
      startingItems: [{ itemId: 'healers_satchel', qty: 1 }],
      startingAbilities: ['mend'],
      startingReputation: [{ factionId: 'faction_tower', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the court call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Ilse Marrant' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What is your school of magic?',
      helpText:
        'The magic you trained in at college, which sets what you are good at and the one spell you can always reach for. It is fixed for the whole story and cannot be changed later. It does not decide how you feel about him, whether you want the chair, or how the knot comes off. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the whole court know about you?',
      helpText: 'Your reputation at court, true or not. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never lost an argument in council, and I have never once been on time for one.',
    },
    {
      id: 'the_grudge',
      label: 'Why do you hate him?',
      helpText: 'Where you start, not where you have to finish. You can change your mind about him in the first scene.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_exam', label: 'The examiners split my first prize with him, and it was mine' },
        { id: 'the_votes', label: 'He has voted against me on every question for five years' },
        { id: 'the_ward', label: 'He rewrote my palace ward without asking, and it was better' },
        { id: 'no_hate', label: 'I do not hate him. I just like winning, and he is in the way' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does he see, three feet away?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Ink on my cuffs, hair coming down, and the court robe I was told to wear and did not want to.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of the ten are losses. "The Chair Lapses" needs no mistake, only
   * seven days of nobody deciding anything, which is exactly what Corvina is
   * betting on. "Grey to the Shoulder" is the forfeit, and it is available
   * from turn one for a player who keeps walking. "Over the Bridge" is
   * walking out of court altogether.
   *
   * Only "Sworn Together" needs the loophole, and only the romance endings
   * need the knot to come off by the unpicking; every other destination is
   * reachable by a player who never says anything kind to him at all.
   */
  endings: [
    {
      id: 'end_three_feet_by_choice',
      name: 'Three Feet, By Choice',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['knot_untied', 'untied_together'],
        minRelationship: [{ characterId: 'caius', dimension: 'affection', value: 75 }],
      },
      condition:
        'The knot came off because the two of them unpicked it together and answered its question out loud, and when the cord went out, neither of them stepped back. Play the moment after the knot, not the confession: the first time in a week the distance is a choice. It goes as far as a kiss, earned by everything before it, and the rivalry stays alive in the same breath.',
      epilogue:
        'He still measures things. You still steal the inkwell. The court stops betting on a duel around the spring, and nobody ever finds out exactly what either of you said to the knot, because neither of you ever tells.',
      hint: 'The terms are written under the knot, and one of them is a question.',
    },
    {
      id: 'end_sworn_together',
      name: 'Sworn Together',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['knot_kept', 'sworn_together'] },
      condition:
        'The player found the one word in the oath law, alone, and the two of them chose to stay bound and swear the archmage’s oath together, the way the founding archmages did. This is not giving up on the knot; it is deciding it was never the problem. Write the Conclave: a chain that has to be shared, a Queen who reads the old charter twice, and a Chancellor beaten by her own spell.',
      epilogue:
        'There are two chairs in the Archmage’s study now, three feet apart, and the court has learned to address its petitions to both. The cord is still there. Some days it is a nuisance and some days it is the shortest distance in the palace, and the Tower has never been better run.',
      hint: 'Read the oath law in its original wording.',
    },
    {
      id: 'end_still_rivals',
      name: 'Still Rivals',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['knot_untied', 'conclave_passed'] },
      condition:
        'The knot is off, the Conclave has happened, and the two of them are free to go back to opposing each other on every question the court asks. They go back to it, but not to the old version: they know things about each other now, and the rivalry has become a game both of them enjoy. No confession is needed, and this should not read as a consolation.',
      epilogue:
        'He votes against you at the next council and sends a note afterwards explaining, at length, why he was right. You send it back corrected. The silver inkwell changes towers twice that winter. Prin Halloway, keeping the minutes, has started drawing small hearts in the margin and rubbing them out.',
      hint: '',
    },
    {
      id: 'end_your_chain',
      name: 'Your Chain',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['you_stand', 'conclave_passed'] },
      condition:
        'The player won the archmage’s chair at the Conclave, free of the knot, and Caius was in the hall to see it. Whether he is glad, furious or both depends on how it was won. The first thing a new archmage does is say what the Tower is for, and the player should get to say it.',
      epilogue:
        'The chain is heavier than it looks. Thessaly Vane leaves you her teapots and a note that says only: Ask him. Caius Wren takes the post of First Binder without being asked, argues with every decision you make, and is right about a third of them, which is exactly enough.',
      hint: '',
    },
    {
      id: 'end_his_chain',
      name: 'His Chain',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['he_stands', 'conclave_passed'] },
      condition:
        'The player stepped aside and Caius took the chair, free of the knot. He clears his family’s debt with the stipend, and owes the player something neither of them knows how to name. Write it as a choice made with open eyes rather than a defeat, and let him be very bad at accepting it.',
      epilogue:
        'His first act as archmage is to appoint you to a post that does not exist, with a title he invented, in the room next to his. When the council asks why, he says it is a matter of keeping an eye on the competition. Nobody on the council believes him, and he does not expect them to.',
      hint: '',
    },
    {
      id: 'end_the_chair_lapses',
      name: 'The Chair Lapses',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['chair_lapsed', 'conclave_passed'] },
      condition:
        'The Conclave came and neither of them could swear the oath, so the chair lapsed to the Crown and the Tower now answers to the Chancery, exactly as Corvina planned. This is a loss, reachable by doing nothing in particular for seven days. Write it plainly: what the Tower loses, what Corvina gains, and what the two of them still have, which is both arms and a grudge with a new target.',
      epilogue:
        'The Chancery’s clerks move into the Tower’s archive within the month. Thessaly Vane retires to the coast with her teapots and does not write. The knot comes off the morning after the Conclave, as promised, before witnesses, and the first thing the two of you do with your freedom is plan how to get the Tower back.',
      hint: '',
    },
    {
      id: 'end_grey_to_the_shoulder',
      name: 'Grey to the Shoulder',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['forfeit_paid'] },
      condition:
        'Somebody walked away and kept walking, and the one left behind paid the forfeit: an arm turned to cold grey stone from fingertips to shoulder, and the knot broke with it. No blood and no wound, just a weight that does not move. If the player walked, write what it cost him and what it cost them to watch; if the player was left, write a mage with one working hand. Do not redeem it quickly.',
      epilogue:
        'The court talks about nothing else for a month and then, the way courts do, about something else. The stone arm is warm in the sun and cold everywhere else. Thessaly Vane, who knows exactly what it weighs, is the only person at court who never once looks at it.',
      hint: '',
    },
    {
      id: 'end_the_chancellors_page',
      name: 'The Chancellor’s Page',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['corvina_disgraced', 'conclave_passed'] },
      condition:
        'The player proved in front of the court who wrote the page, Corvina unwrote the knot under the Queen’s eye, and the Chancery lost its reach into the Tower. Let Corvina keep her dignity and her reason: her brother and the flood are real, and the player can choose to hear that even while winning.',
      epilogue:
        'Lady Corvina Ashdown resigns the seal and asks, as her only condition, that the Tower publish its minutes of the Flood Year. The Archmage agrees before anybody can stop her. Dock Row gets a stone with eleven names on it in the spring, and Corvina is seen there once, standing very still.',
      hint: 'Paper burns white. Parchment curls brown.',
    },
    {
      id: 'end_over_the_bridge',
      name: 'Over the Bridge',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of the palace, over the bridge and off the edge of the story, and because of the knot Caius either came too or paid for it. Do not make this a tragedy or a punishment: two people leaving a court that was using them is a coherent choice. What matters is whether he came willingly.',
      epilogue:
        'The Conclave is held without either candidate and the chair lapses to the Crown. Somewhere on the coast road there are two mages who walk exactly three feet apart and argue about directions. Hollis Brand closes the betting book unpaid, on the grounds that it is not over yet.',
      hint: '',
    },
    {
      id: 'end_forty_to_one',
      name: 'Forty to One',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['knot_untied', 'knows:the_exam'],
        minRelationship: [
          { characterId: 'caius', dimension: 'affection', value: 85 },
          { characterId: 'caius', dimension: 'trust', value: 70 },
        ],
      },
      condition:
        'The knot is gone, the old exam has been told, and the two of them have decided out loud to marry, or have told the court they will, which in this palace is the same thing. Comedy first: the betting book, the steward, the Queen’s raised eyebrow. It goes as far as a kiss, in public, to make a point.',
      epilogue:
        'Hollis Brand collects at forty to one and spends all of it on the wedding, which he organises to the inch. The seating plan puts the two of you exactly three feet apart at the high table, as a joke. Nobody else in the hall gets it, and the two of you laugh until the Queen has to wait.',
      hint: 'Ask to see the betting book.',
    },
  ],
  coverDirection: [
    'SUBJECT: Caius Wren, a rival court mage, alone and unmistakable in the foreground of a key visual for a romance-fantasy anime about two rivals tied together by a spell.',
    'He fills the frame from the waist up, centred and close, holding about two thirds of the picture, standing very straight.',
    'Dark hair tied back at the nape, grey eyes, a high-collared charcoal mage’s coat with silver thread at the cuffs, silver binder’s rings on his fingers.',
    'He holds his left wrist up toward the viewer; a cord of pale green light is knotted round it and runs straight out of the frame toward us, as if the viewer holds the other end.',
    'His other hand is half raised in protest, palm out.',
    'His expression is exasperated and a little flustered, one eyebrow up, looking straight at the viewer.',
    'HIS FACE STAYS CLEAN: no green glow, sparks, shadows or marks on his face or skin.',
    'Every green light effect stays on the cord, the fire and the title, never on his face.',
    'BEHIND HIM, soft and secondary: a vast lantern-lit palace great hall, an iron brazier of green mage-fire, tall arched windows, hanging banners, and a watching court in soft focus.',
    'LIGHT: warm lantern gold across his face and coat, cold green light from the cord and the brazier on his wrist and the hall behind him.',
    'TITLE: the words Three Feet Apart painted into the art in the upper third as an elegant gold serif romance-fantasy logo, with a thin thread of pale green light looping through the letters,',
    'spelled exactly Three Feet Apart, large and legible at thumbnail size. No other text anywhere: no letters or numbers outside the title.',
  ].join(' '),
  opening:
    "The court’s last question went into the fire between you. The fire turned green, and a cord of light snapped tight around your left wrist.\n\nYou’d turned to leave. Four steps.\n\n\"Stop. Don’t take another one.\"\n\nCaius Wren, your rival since your first week at college, is on one knee by the brazier. The cord runs from your wrist to his. His left hand has gone grey as stone.\n\n\"Hostage knot,\" he says through his teeth. \"Past three feet, whoever’s left behind loses the arm.\"\n\nYou walk back. The grey drains out of his fingers.\n\nThe whole court is staring.\n\nHe stands, exactly three feet away.\n\n\"One more step and I lose an arm. So. Where were you going?\"",
  openingPanel: {
    assetKey: 'story_three_feet_apart/opening',
    alt: 'Caius on one knee by a brazier of green fire, charcoal mage’s coat, his left hand gone stone-grey, a cord of pale green light running from his wrist to yours while the court stares.',
  },
  openingSuggestions: [
    '"To find whoever tied me to you. Keep up."',
    'I take his left hand and check that the grey is really gone.',
    'I step back. Slowly. Watching his face.',
  ],
  publishedAt: null,
};

export const THREE_FEET_APART = StoryVersion.parse(raw);
