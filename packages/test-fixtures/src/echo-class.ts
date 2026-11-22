import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Echo Class" — a copy power, a public ranking, and a handshake on turn one.
 *
 * Slate #6 of the fifty (`docs/stories-50/PLAN.md`), bible at
 * `docs/story-bibles/new50/06_ECHO_CLASS.md`. Shaped on Good Morning, Husband:
 * a small cast who each want something this week, three invisible banded
 * variables, quests with several real routes, and endings that include losing.
 *
 * The famous moment is the opener and it is not delayed. The player is already
 * in the air, holding the top-ranked student's gravity and her hand, with forty
 * seconds left on the copy. Every way of handling that is an authored route:
 * hand it back, use it, talk her down, feel out what you are holding, or let go
 * of her and grab somebody else.
 *
 * The copy power works because it turns every person in the academy into a
 * decision. The one rule that makes it a story rather than a stat block: while
 * you hold somebody's power, they share it with you. A handshake is therefore a
 * kindness, a theft, or a sabotage depending on whose hand and when — which is
 * exactly what Rook wants to buy on Thursday at four.
 *
 * The playable span is one week, Monday to the Friday hearing. Arlo Wren, the
 * pier and the eleven minutes are twenty-six years of backstory carried in
 * lore, items and what three people will and will not say. Holding a copy past
 * sixty seconds is the hidden rule: the ability exists from the start but is
 * granted only by the step where the player learns it is possible, and gated by
 * the flag that learning sets (the "grant broadly, gate by flag" lesson from
 * `docs/stories-checkpoint.md`).
 *
 * Production runs `runTurnPure`, which never reads resources, step notes or the
 * ability list beyond the chosen archetype's starting abilities. So the system
 * lives where it can: hard canon spells out the copy rules, the Board and every
 * power close to the player; the transfer file and the rank band are quest items
 * the player starts holding; and every archetype starts with Echo.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest` refills
 * every GOOD_HIGH and a night's sleep is the honest thing for that to mean.
 * Scrutiny is first among the descending pair on purpose: PUBLIC_VIOLENCE and
 * the generic cost fallback both take the first GOOD_LOW in array order, and a
 * fight in the quad should make the faculty and the Registry look harder.
 * Larkspur is first in the faction array for the same reason.
 *
 * Every character is an adult. The academy is post-secondary and admits at
 * eighteen; the bible states every age.
 */

const raw = {
  id: 'sv_echo_class_1',
  storyId: 'story_echo_class',
  version: 1,
  title: 'Echo Class',
  fantasyLabel: 'Copy any power you touch. Sixty seconds.',
  hook: 'You copy any power you touch for sixty seconds. On your first morning at a hero academy you shake the top-ranked student’s hand, and float off the floor in front of everyone.',
  premise:
    'Larkspur Academy trains licensed heroes. It admits at eighteen, runs for four years, and ranks all twelve hundred of its students on one board in the main hall, updated every morning, in public.\n\n' +
    'You transfer into the second year with a power the intake office did not believe. Touch anyone who has a power, skin to skin, and you hold a copy of it for sixty seconds. Then it goes, and you have nothing again.\n\n' +
    'By tradition the top-ranked student shakes every transfer’s hand at the welcome assembly. This year that is Yuna Takeda, whose power is gravity, and who has not lost a match in fourteen months.\n\n' +
    'You shook her hand. Now you are floating above the floor of the Great Hall with everyone watching.\n\n' +
    'So by tonight the whole academy knows what you can do. The bully at the back of the room wants to rent it. Your roommate already knew. A professor who checks her watch every sixty seconds wants a word, and a Registrar has come up from the city to decide by Friday whether your file says open or restricted.\n\n' +
    'The Registry files a power like yours under one name, Echo class, and it has used that name once before, twenty-six years ago. You need to find out what happened to the last one before you find out the hard way.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Academy', 'Superpowers', 'Action', 'Rivalry', 'Comedy'],
  mechanicsChips: [
    'Copy any power you touch',
    'Sixty seconds, then nothing',
    'Everyone is a possible weapon',
    'Climb a public ranking',
    'One handshake can cost a title',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can climb the Board on borrowed powers, refuse to fight for a number, sell Rook one handshake, or spend the week on a roof helping the strongest student in the building carry something nobody else can see. A copy lasts sixty seconds. What you do inside those sixty seconds is the game.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'great_hall',
    startWorldMinute: 9 * 60 + 12,
    startingItems: [
      { itemId: 'transfer_file', qty: 1 },
      { itemId: 'rank_band', qty: 1 },
    ],
    hardCanon: [
      'Larkspur Academy is a four-year, post-secondary academy for licensed heroes on a hill above the harbour city of Velling. It admits at eighteen. Every student and every member of staff is an adult.',
      'Everyone in this story is an adult. The player is twenty, a second-year transfer. Yuna Takeda is twenty-one, Teo Vance twenty-two, Callum Rook twenty-three, Professor Imogen Adair forty-seven and Registrar Delphine Marsh fifty-two. The other students named in the factions are between twenty and twenty-three.',
      'The player’s power: skin-to-skin contact with somebody who has a power gives the player a copy of it for sixty seconds, felt as a count under the ribs. One copy at a time; a new touch replaces the old one. Fabric stops it: gloves, sleeves and jackets copy nothing.',
      'Touching somebody with no power copies nothing. Touching Adair, the player feels an empty place, as if something used to be there.',
      'While the player holds a copy, the original owner keeps their power but shares control of it. It answers them half a beat late and feels like somebody else has a hand on it. When the copy ends, or the player lets go of it early, it is theirs alone again.',
      'Without a copy the player has no power at all. When a copy ends there is a drop: a headache, heavy limbs, and for a minute the feel of the power they just lost.',
      'Yuna Takeda has been ranked first of twelve hundred for fourteen months. Her power is gravity: anything she can see within about thirty metres, herself included, she can make up to ten times heavier or nearly weightless. By tradition the top-ranked student shakes every transfer’s hand at the welcome assembly; the player copied her gravity that way, and that is where the story starts.',
      'Other powers close to the player. Rook has recoil, a Form power: any force that hits him he stores and returns doubled, which is why he never throws the first punch. Teo hears electricity, a Sense power: wiring in walls, phones in pockets, the hum of the Board. Adair has no power now; the faculty believe an injury ended her career in her fourth year. Marsh has never had one.',
      'The Board in the Great Hall ranks every student and updates at seven every morning. Unranked transfers start last, so the player is 1,200, and every student wears a rank band that shows their number. Rank changes only through sanctioned challenges in the Pit, refereed by faculty. Anyone may challenge anyone; the winner takes the loser’s place, and losing to somebody ranked far above you costs fifty places. Fights in the Boathouse are off the books and change nothing on the Board.',
      'The Registry classifies every power: Field, Form, Sense, Make, and Echo. Echo class has had one registrant before the player: Arlo Wren, then a twenty-four-year-old Larkspur fourth-year, twenty-six years ago. He is fifty now. What happened to him is not public.',
      'Sixty seconds is a habit and not a law: a copy can be held past it, and every minute past it more of the power leaves its owner. Nobody tells the player this on the first day, and they cannot do it until they know it is possible.',
      'Registrar Delphine Marsh must classify the player by Friday at ten: open (the player stays and competes like anybody else) or restricted (the player leaves with the Registry).',
    ],
    toneGuide:
      'Shonen academy energy with a real cost underneath: fast, bright, loud and funny, and then suddenly not. ' +
      'Fights are legible and specific: who touched whom, whose power is in the player’s chest, how many seconds are left. When a copy is running, count it in the prose — "forty-one", "twelve" — and let the count drive the pace. A borrowed power is used clumsily for the first ten seconds and well for the last ten. ' +
      'Rank numbers are everywhere and people use them instead of names, which is rude and everybody does it. Comedy comes from Teo and from borrowed powers used badly. Rook is frightening because he is polite. The Registry is a real institution with a real reason, and Adair has the best reason of anybody. ' +
      'Romance with Yuna is slow, teasing and earned; she can say no, and the most it reaches is a kiss. Skin contact is written as a handshake, a grip or a wrist: it is about the power, never about the body. Fights bruise, wind and knock people flat, and nothing on the page is graphic. ' +
      'The face at the top of a beat is Yuna’s whenever she is in the scene, otherwise whoever the player just touched.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Rook spreads his arms in the middle of the Pit.\n\n\"Go on, Twelve-Hundred. Hit me.\"\n\nYou don’t. You take his hand instead.\n\nHis power lands in your chest like a held breath. Fifty-nine. Fifty-eight.\n\nHe’s still smiling. Then he isn’t, because he can feel you on the other end of it.\n\nTwo people who only hit back, staring at each other across the sand. Neither of you can afford to swing first.\n\nSomebody in the stands starts laughing.\n\nThirty seconds.",
      "Teo is sitting on your bed, eating your noodles.\n\n\"Okay,\" he says. \"Full disclosure. Partial disclosure. Some disclosure.\"\n\nThe wall behind him hums. He tilts his head at it like it said something rude.\n\n\"The odds on you surviving the week were four to one at breakfast. I’ve moved you to three.\" He points the fork at you. \"That’s a compliment, yeah?\"\n\n\"Who’s betting on me?\"\n\nHe chews for a long time.\n\n\"Define betting.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 12, mind: 12, presence: 11, resolve: 12, arcana: 13 },
  skills: [
    { id: 'wielding', name: 'Wielding', attribute: 'arcana', description: 'Using a borrowed power with hands that met it ten seconds ago.' },
    { id: 'holding', name: 'Holding', attribute: 'arcana', description: 'Feeling the edges of a copy and the count under your ribs, and what is on the other side of zero.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Getting close enough to touch somebody who would rather you did not.' },
    { id: 'brawling', name: 'Brawling', attribute: 'might', description: 'Fighting with no power at all, which is most of your life.' },
    { id: 'reading', name: 'Reading', attribute: 'mind', description: 'Watching a power work and seeing where it stops.' },
    { id: 'front', name: 'Front', attribute: 'presence', description: 'Talking like you meant to do that.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Keeping your face still while a hall, a Registrar or Rook is looking at it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is GOOD_HIGH because `resolveRest` restores those, and because a
   * copy power genuinely runs on the body: every drop takes something. It is
   * also what the generic cost path spends first, which is right.
   *
   * Scrutiny is the first GOOD_LOW so that a public fight lands on it. Overlap
   * is the slow, interesting one: it climbs with every copy and comes down on
   * its own, and its top band is where the hidden rule becomes tempting.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 82,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The next drop puts the player on the floor. Copies still come, but they land like a dropped tray, the count runs fast, and the first ten seconds of every borrowed power are spent just standing up under it.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes. Every drop is a headache that lasts ten minutes, borrowed powers misfire for the first half of the count, and the player agrees to things to end conversations. Sleeping, eating or sitting down in the infirmary is genuinely the strongest move available.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a loud day on a ranked campus. Good for one challenge or one long conversation and honest about not wanting both. Copies come cleanly; the drops sting. Nobody needs to remark on it.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh. The player can take a copy, learn its edges in five seconds and use it well for the other fifty-five, then walk away from the drop. Long scenes can go somewhere, and there is room to be funny.',
        },
      ],
    },
    {
      id: 'scrutiny',
      name: 'Scrutiny',
      max: 100,
      start: 30,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody official is watching. The player is a second-year with an odd power and a low rank, and at Larkspur nobody is more private than that.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Faculty treat the player like any other transfer. The Registrar’s questions are routine, Adair’s are curious rather than pointed, and nobody writes anything down in front of them.',
        },
        {
          upTo: 50,
          behaviour:
            'People with clipboards have noticed. Adair checks her watch whenever the player touches anyone. Marsh writes a line after every answer. A referee is assigned to any challenge the player signs, even an informal one.',
        },
        {
          upTo: 80,
          behaviour:
            'The player is a file now. A staff member happens to be in every corridor they use, Marsh asks about specific incidents by date and time, and the faculty have discussed them by name in a meeting the player was not in.',
        },
        {
          upTo: 100,
          behaviour:
            'The hearing is a formality and everybody knows it. The Registry car has moved from the harbour to the bottom of the funicular. Adair has stopped asking questions and started preparing for the answer.',
        },
      ],
    },
    {
      id: 'overlap',
      name: 'Overlap',
      max: 100,
      start: 12,
      regenPerHour: -1,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Every copy ends at zero and leaves nothing behind. The player is entirely themselves between handshakes.',
      color: '#9D7BD8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Clean. Copies arrive, run their sixty and go, and the drop is the only trace. The player is themselves between handshakes.',
        },
        {
          upTo: 55,
          behaviour:
            'Habits leak. The player reaches for salt the way Rook does, stands with their weight centred like Yuna, hears a hum in a wall. Nothing dangerous; other people notice before the player does.',
        },
        {
          upTo: 85,
          behaviour:
            'Copies do not end cleanly. The count slows near zero as if something were waiting to be told to let go, and the player can feel a power in a handshake through a thin sleeve. Adair sees it from across a room.',
        },
        {
          upTo: 100,
          behaviour:
            'The player can feel every power in the room without touching anybody, and the last copy is still there a full minute after zero, asking to be kept. Holding on past sixty would take no effort at all. Letting go takes all of it.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'transfer_file',
      name: 'Your Transfer File',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'A manila folder: your name, your old address, a photograph that does not look much like you, and your power in your own words: “Copies a power on skin contact. Sixty seconds. One at a time. Nothing through fabric.” Beside it, a box marked CLASS in which somebody at intake has written “pending” in pencil and underlined it twice.',
      loreText:
        'Clipped to the back, a typed note from the intake office: “Applicant’s description of their power not credible. Refer to Power Theory.” Somebody has initialled it I.A.',
      icon: 'file',
    },
    {
      id: 'rank_band',
      name: 'Your Rank Band',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'A black rubber wristband with a small screen. Right now it says 1,200. It buzzes when somebody challenges you, and every student on the hill can read the number on everybody else’s wrist.',
      loreText: 'Taking it off is not against the rules. Nobody does it, which is how you know what the rules really are.',
      icon: 'watch',
    },
    {
      id: 'challenge_slip',
      name: 'Challenge Slip',
      tags: ['document'],
      stackable: true,
      maxStack: 5,
      description:
        'A carbon form: your rank, their rank, a line for both signatures and one for a faculty referee. Signed and dropped in the box under the Board, it is binding by four the same afternoon.',
      loreText: 'The top copy goes to the referee, the pink to the challenger and the yellow to whoever has to explain the result to their family.',
      icon: 'papers',
    },
    {
      id: 'cup_noodles',
      name: 'Cup Noodles',
      tags: ['food'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 12, consumesItem: true },
      description:
        'Teo’s stock. Chicken, or a flavour called “Harbour” that nobody has ever identified. Two a cup, three after midnight.',
      loreText: 'He buys them by the crate at the noodle shop by the ferry and has never once paid full price.',
      icon: 'cup',
    },
    {
      id: 'wrist_weight',
      name: 'Yuna’s Spare Wrist Weight',
      tags: ['personal'],
      description:
        'A steel band, four kilos, scuffed on the inside where one like it has been worn every day for a year. Lifting it off the roof gravel takes two hands and a little surprise.',
      loreText: 'Engraved on the inside: a fishing boat’s registration number from a port four hundred kilometres south.',
      icon: 'weight',
    },
    {
      id: 'teo_book',
      name: 'Teo’s Odds Book',
      tags: ['document'],
      skillModifiers: { reading: 1 },
      description:
        'A pocket notebook of odds on every sanctioned challenge this term, in tiny handwriting, and a page near the back with your name at the top and three lines under it in a different pen.',
      loreText: 'The three lines: “copies on contact”, “60 sec?”, “tell R by tonight”.',
      icon: 'ledger',
    },
    {
      id: 'black_rook',
      name: 'A Black Rook',
      tags: ['quest', 'token'],
      questItem: true,
      description:
        'A heavy black chess piece, worn smooth at the top by a thumb. On this hill, carrying one means the Back Row counts you as theirs, and everybody knows it.',
      loreText: 'Rook has given out nineteen this year. He takes them back from people who disappoint him, in public, at lunch.',
      icon: 'shard',
    },
    {
      id: 'adair_notes',
      name: 'Adair’s Field Notes',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { holding: 2 },
      description:
        'A water-stained student notebook from twenty-six years ago, in two people’s handwriting. Columns of times to the second with a power’s name beside each, and on the last used page a column of times that does not stop at sixty.',
      loreText: 'The last column runs 0:58, 0:59, 1:00, 2:00 and on to 11:00 in somebody else’s hand. Under it, in hers: “It did not come back.”',
      icon: 'book',
    },
    {
      id: 'sealed_file',
      name: 'The Sealed File',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Registry file, Echo class, registrant number one. Three pages: a classification, a pier, a restriction order. Clipped to the front, a photograph of a man about your age, smiling at whoever took it.',
      loreText: 'The restriction order is signed by four board members, and one of the surnames is Rook. The duty clerk who processed it initialled every page: D.M.',
      icon: 'file',
    },
    {
      id: 'hand_tape',
      name: 'Hand Tape',
      tags: ['gear'],
      skillModifiers: { brawling: 1 },
      description:
        'A roll of white athletic tape, half used. Wrapping your knuckles also means nobody’s skin touches yours by accident, which is why you started doing it.',
      loreText: 'Six clubs on the harbour front banned you for “something we can’t prove”. None of them could say what.',
      icon: 'wrap',
    },
    {
      id: 'studio_lanyard',
      name: 'Studio Lanyard',
      tags: ['personal'],
      skillModifiers: { footwork: 1 },
      description:
        'A film-studio lanyard that says STUNT · ALL AREAS. It still opens three gates in Velling and once got you out of a police cordon.',
      loreText: 'Two years of falling off things on borrowed powers, credited every time as “stunt performer (uncredited)”.',
      icon: 'card',
    },
    {
      id: 'clinic_badge',
      name: 'Clinic Badge',
      tags: ['personal'],
      skillModifiers: { reading: 1 },
      description:
        'A laminated night-shift badge from a clinic for people whose powers were hurting them. Your photo, your name, and NO SKIN CONTACT WITHOUT CONSENT across the bottom in red.',
      loreText: 'You were the only orderly who could tell a patient exactly what their power felt like from the inside, and the only one who never explained how.',
      icon: 'card',
    },
    {
      id: 'thin_gloves',
      name: 'Thin Black Gloves',
      tags: ['personal'],
      skillModifiers: { composure: 1 },
      description:
        'Gloves you have worn every day for six years. With them on, nothing copies. You took the right one off to shake her hand, because it seemed rude not to.',
      loreText: 'You own eleven pairs. You have never once explained them to anybody, and until this morning nobody asked.',
      icon: 'coat',
    },
  ],
  abilities: [
    {
      id: 'echo_touch',
      name: 'Echo',
      tags: ['power'],
      description:
        'Skin to skin with somebody who has a power, and you hold a copy of it for sixty seconds. They keep it, and feel you holding the other end.',
      affordances: ['copy', 'copy it', 'copy her', 'copy him', 'copy their power', 'shake hands', 'shake his hand', 'take her hand', 'take his hand', 'touch', 'echo', 'borrow it', 'borrow her power', 'borrow his power'],
      costs: [
        { resourceId: 'stamina', amount: 4 },
        { resourceId: 'overlap', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'use_the_copy',
      name: 'Use the Copy',
      tags: ['power'],
      description: 'Do something with the power you are holding right now, with hands that met it a few seconds ago.',
      affordances: ['use it', 'use her power', 'use his power', 'use the gravity', 'lift', 'float', 'fly', 'make it heavy', 'make it light', 'push it', 'pull us up', 'use what i have'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'overlap', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'wielding', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'let_go',
      name: 'Let Go',
      tags: ['power'],
      description: 'End the copy early and hand the power back whole, before the count reaches zero.',
      affordances: ['let go', 'let it go', 'give it back', 'hand it back', 'drop it', 'stop copying', 'release it', 'end it'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_a_hand_on',
      name: 'Get a Hand On',
      tags: ['movement'],
      description: 'Close the distance and get skin contact with somebody who would rather you did not: a wrist, a forearm, a bare hand.',
      affordances: ['grab', 'grab her wrist', 'grab his wrist', 'get a hand on him', 'get a hand on her', 'reach for', 'grab his hand', 'close in', 'get close'],
      costs: [
        { resourceId: 'stamina', amount: 7 },
        { resourceId: 'scrutiny', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight_bare',
      name: 'Fight Bare',
      tags: ['offensive'],
      description: 'Hands, feet and timing, with no power in you at all. The way you fought before anybody here had heard of you.',
      affordances: ['punch', 'hit him', 'hit her', 'fight', 'throw a punch', 'tackle', 'spar', 'trade blows', 'fight with nothing'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'scrutiny', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawling', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_a_power',
      name: 'Read a Power',
      tags: ['sight'],
      description: 'Watch a power work, or feel the one in your chest, and find where it stops and what it costs its owner.',
      affordances: ['watch', 'study it', 'read her power', 'read his power', 'feel it out', 'figure it out', 'look for the limit', 'observe', 'look around', 'what am i holding'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'reading', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_through',
      name: 'Talk Through It',
      tags: ['social'],
      description: 'Explain, apologise, joke or bluff your way through a room that is looking at you.',
      affordances: ['talk', 'explain', 'apologise', 'apologize', 'joke', 'bluff', 'charm her', 'charm him', 'lie', 'convince', 'talk her down', 'talk him down', 'make a deal'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'front', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_your_nerve',
      name: 'Hold Your Nerve',
      tags: ['defensive'],
      description: 'Refuse, stand still, or tell the plain truth while somebody with more power than you waits for you to flinch.',
      affordances: ['refuse', 'say no', 'stand my ground', 'stare him down', 'hold my nerve', 'do not back down', 'stay calm', 'tell the truth', 'answer straight'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_past_sixty',
      name: 'Hold Past Sixty',
      tags: ['power'],
      description:
        'Refuse to let a copy end at zero. Every minute past sixty, more of the power leaves its owner and settles in you, and past ten it does not go home.',
      affordances: ['hold it', 'hold on', 'keep it', 'do not let go', 'hold past sixty', 'keep holding', 'refuse to let go'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'overlap', amount: 22 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'holding', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_hold'],
        lockedCopy:
          'Sixty seconds and it goes. It has always gone. You have never once felt anything on the other side of zero to hold on to.',
      },
    },
  ],
  locations: [
    {
      id: 'great_hall',
      name: 'The Great Hall',
      shortName: 'Great Hall',
      description:
        'A long stone hall with a vaulted ceiling, two hundred chairs and a stage. Along the whole back wall runs the Board: twelve hundred names in rank order, lit from behind, updated at seven every morning. The welcome table under it holds a water jug, a stack of challenge slips and a basket of rank bands for the transfers.',
      artDirection:
        'Grand academy assembly hall in morning light, vaulted stone ceiling, rows of chairs, a stage, a huge glowing ranking board covering the back wall with unreadable rows of names and numbers, a welcome table with a water jug. Cool blue and steel with one warm stage light.',
      connections: [{ to: 'the_quad', travelMinutes: 2, label: 'Out through the main doors' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'challenge_slip', qty: 3, ownerId: null, aka: ['slip', 'challenge slip', 'a challenge slip', 'the slips', 'challenge form'] },
      ],
    },
    {
      id: 'the_quad',
      name: 'The Quad',
      shortName: 'Quad',
      description:
        'A wide paved square between the Great Hall, the Residence Block and the Pit, with a dry fountain in the middle that the Back Row sits on at lunch. Everybody eats on the steps where they can be seen, and where you sit is a statement about your rank.',
      artDirection:
        'Sunny academy quadrangle, paved stone, a dry fountain with people in dark academy jackets sitting on its rim, wide steps full of people eating lunch, academic buildings on three sides, a sea view between them. Bright and busy.',
      connections: [
        { to: 'great_hall', travelMinutes: 2, label: 'Into the Great Hall' },
        { to: 'the_dorms', travelMinutes: 3, label: 'Across to the Residence Block' },
        { to: 'the_pit', travelMinutes: 3, label: 'Down to the Pit' },
        { to: 'adair_lab', travelMinutes: 4, label: 'The Power Theory building' },
        { to: 'infirmary', travelMinutes: 3, label: 'The infirmary' },
        { to: 'registry_annex', travelMinutes: 4, label: 'The Registry Annex' },
        { to: 'boathouse', travelMinutes: 8, label: 'Down the shore path' },
        { to: 'velling_harbour', travelMinutes: 12, label: 'The funicular down to town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'the_dorms',
      name: 'The Residence Block',
      shortName: 'Dorms',
      description:
        'Two wings of student rooms joined by a shared kitchen that always smells of instant noodles and toast. A noticeboard by the stairs carries every challenge result, printed and pinned, some with comments added in pen.',
      artDirection:
        'Residence hall common kitchen at evening, long table, mismatched mugs, a kettle, a corkboard covered in printed match results with handwritten comments, corridors leading off to two wings. Lived-in and noisy.',
      connections: [
        { to: 'the_quad', travelMinutes: 3, label: 'Back out to the quad' },
        { to: 'room_4c', travelMinutes: 1, label: 'Up to Room 4C' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'room_4c',
      name: 'Room 4C',
      shortName: '4C',
      description:
        'Two beds, two desks and a window that sticks. Teo’s half is cables, a rice cooker and a crate of cup noodles under the bed. Your half is a bare mattress and a hook. The wall behind your bed hums, and Teo says it hums in B-flat.',
      artDirection:
        'Small shared dorm room, two narrow beds, one side cluttered with cables, headphones and a crate of instant noodles, the other side bare, a window with a view of the harbour at dusk. Warm lamp light.',
      connections: [{ to: 'the_dorms', travelMinutes: 1, label: 'Down to the kitchen' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'cup_noodles', qty: 4, ownerId: 'teo', aka: ['noodles', 'cup noodles', 'a cup of noodles', 'instant noodles'] },
        { itemId: 'teo_book', qty: 1, ownerId: 'teo', aka: ['odds book', 'his book', 'betting book', 'teo’s notebook'] },
      ],
    },
    {
      id: 'the_pit',
      name: 'The Pit',
      shortName: 'Pit',
      description:
        'A sunken arena, sand over rubber, ringed by six tiers of benches. A referee’s box stands on stilts at one end, and a score display shows both fighters’ ranks in red. Sanctioned challenges only, faculty refereeing, and the result is on the Board by seven the next morning.',
      artDirection:
        'Sunken circular training arena, pale sand floor, tiered benches packed with people in dark academy jackets, a referee box on tall stilts, a scoreboard with two glowing red numbers. Afternoon sun, dust in the air, tense and loud.',
      connections: [
        { to: 'the_quad', travelMinutes: 3, label: 'Up the steps to the quad' },
        { to: 'gym_roof', travelMinutes: 2, label: 'Up the stairwell to the roof' },
        { to: 'infirmary', travelMinutes: 2, label: 'The side door to the infirmary' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
    },
    {
      id: 'gym_roof',
      name: 'The Gym Roof',
      shortName: 'Roof',
      description:
        'A flat gravel roof above the Pit with a rail, a water tank and the whole harbour below. A spare pair of steel wrist weights sits by the stairwell door, and there are scuff marks on the underside of the water tank that nobody could have made standing on the gravel.',
      artDirection:
        'Flat rooftop at night above an academy gym, gravel, a metal rail, a water tank, harbour lights far below, a pair of steel wrist weights by a stairwell door. Quiet, cold, starlit.',
      connections: [{ to: 'the_pit', travelMinutes: 2, label: 'Down the stairwell' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'wrist_weight', qty: 1, ownerId: 'yuna', aka: ['weight', 'wrist weight', 'the weights', 'her weights', 'spare weight'] },
      ],
    },
    {
      id: 'adair_lab',
      name: 'Adair’s Lab',
      shortName: 'Lab',
      description:
        'The Power Theory lab: measuring rigs bolted to the floor, a slow-motion camera on a track, and a wall clock with a second hand loud enough to hear from the corridor. A basement door at the back says RECORDS in old paint and has a lock that is newer than the door.',
      artDirection:
        'Academic laboratory, metal measuring rigs bolted to the floor, a camera on a rail, chalkboards full of equations and timings, a large wall clock, an old basement door marked RECORDS. Clinical light, slightly dusty.',
      connections: [
        { to: 'the_quad', travelMinutes: 4, label: 'Back out to the quad' },
        { to: 'records_room', travelMinutes: 2, lockedByFlag: 'records_room_open', label: 'The basement door marked RECORDS' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'adair_notes', qty: 1, ownerId: 'adair', aka: ['field notes', 'her notes', 'the old notes', 'her notebook'] },
      ],
    },
    {
      id: 'records_room',
      name: 'Records Room 0',
      shortName: 'Records',
      description:
        'A cold basement of grey cabinets that the Registry rents from the academy and never visits. Every drawer is labelled by class. The drawer marked ECHO has one file in it.',
      artDirection:
        'Cold basement archive, rows of grey metal filing cabinets, one drawer pulled open with a single thin file, a bare bulb, dust in the light. Still and secret.',
      connections: [{ to: 'adair_lab', travelMinutes: 2, label: 'Back up to the lab' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'sealed_file', qty: 1, ownerId: null, aka: ['file', 'the file', 'sealed file', 'echo file', 'the registry file'] },
      ],
    },
    {
      id: 'infirmary',
      name: 'The Infirmary',
      shortName: 'Infirmary',
      description:
        'Six beds, blackout curtains, and a nurse who has seen every kind of drop and is not impressed by yours. A chart on the wall lists what happens to people who copy, catch or misuse the wrong power, with diagrams.',
      artDirection:
        'Clean academy infirmary, six beds with curtains, a wall chart with diagrams, ice packs, soft afternoon light through blinds. Calm and practical.',
      connections: [
        { to: 'the_quad', travelMinutes: 3, label: 'Out to the quad' },
        { to: 'the_pit', travelMinutes: 2, label: 'The side door to the Pit' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
    },
    {
      id: 'registry_annex',
      name: 'The Registry Annex',
      shortName: 'Annex',
      description:
        'A borrowed office with a borrowed desk, two chairs and a window onto the quad. On the desk, a carbon-copy form with two boxes at the bottom: OPEN and RESTRICTED. Neither is ticked yet.',
      artDirection:
        'Small borrowed office, plain wooden desk, two chairs facing each other, a clipboard and a fountain pen, a window onto a sunny quad. Neat, quiet, faintly ominous.',
      connections: [{ to: 'the_quad', travelMinutes: 4, label: 'Back out to the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'boathouse',
      name: 'The Boathouse',
      shortName: 'Boathouse',
      description:
        'An old timber boathouse on the shore below the hill, rowing shells racked on the walls and a chalk ring on the floor where off-the-books fights happen. A bowl of black chess rooks sits by the door. Nothing that happens here goes on the Board, which is the point.',
      artDirection:
        'Old wooden boathouse interior at evening, rowing boats racked on the walls, a chalk circle on the plank floor, people in dark academy jackets lounging on crates, a bowl of black chess pieces by the door, water light through the slats.',
      connections: [
        { to: 'the_quad', travelMinutes: 8, label: 'Up the shore path' },
        { to: 'velling_harbour', travelMinutes: 6, label: 'Along the shore to town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'black_rook', qty: 3, ownerId: 'rook', aka: ['chess piece', 'black rook', 'the black rook', 'the piece', 'a rook'] },
      ],
    },
    {
      id: 'velling_harbour',
      name: 'Velling Harbour',
      shortName: 'Harbour',
      description:
        'The town below the academy: ferries, a fish market, a noodle shop open until two, and the rebuilt pier with a bronze plaque listing the sixty-one people who walked off it. Students come down to be somewhere nobody is ranked.',
      artDirection:
        'Harbour town at dusk below a hill, ferries, a lit noodle shop, a long rebuilt pier with a bronze plaque, fishing boats, a funicular climbing toward an academy on the hill. Warm lights on blue water.',
      connections: [
        { to: 'the_quad', travelMinutes: 12, label: 'The funicular up to the academy' },
        { to: 'boathouse', travelMinutes: 6, label: 'Along the shore to the Boathouse' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
    },
  ],
  factions: [
    {
      id: 'faction_larkspur',
      name: 'Larkspur Academy',
      description:
        'The faculty, the referees and the rules of the Pit. They decide whether you stay, they read every incident report, and they would like very much to know what you are.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'On probation' },
        { atReputation: 30, label: 'Enrolled' },
        { atReputation: 60, label: 'One to watch' },
        { atReputation: 80, label: 'The faculty’s pick' },
      ],
      allies: ['faction_registry'],
      enemies: [],
    },
    {
      id: 'faction_board',
      name: 'The Top Ten',
      description:
        'The ten students at the top of the Board. They sit in the front row of every hall, get the first placements with the rescue services and the first licences, and decide among themselves who is worth noticing. Besides Yuna at one and Rook at nine: Hollis Grey (#2, Field: makes any floor slick as wet ice) and Juno Achebe (#5, Make: pulls glass out of sand, which in the Pit is everywhere).',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Unranked' },
        { atReputation: 25, label: 'Noticed' },
        { atReputation: 50, label: 'Contender' },
        { atReputation: 75, label: 'One of them' },
      ],
      allies: [],
      enemies: ['faction_back_row'],
    },
    {
      id: 'faction_back_row',
      name: 'The Back Row',
      description:
        'About twenty students, ranked anywhere from ninth to three hundredth, who sit at the back of every room and settle things in the Boathouse. Rook runs it. Carrying one of his black rooks means they count you as theirs. His regulars include Moss Keller (#212, Make: grows ivy out of bare stone, useless in a fistfight), Dita Ferro (#64, Form: skin that goes hard as tyre rubber), and the Haddad twins (#140 and #141, Field: one makes a room deafening, the other silent).',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'New face' },
        { atReputation: 30, label: 'Useful' },
        { atReputation: 60, label: 'Holding a rook' },
      ],
      allies: [],
      enemies: ['faction_board'],
    },
    {
      id: 'faction_registry',
      name: 'The Registry',
      description:
        'The national body that classifies every power. On this campus that means one Registrar, one borrowed office, one form and one car at the harbour.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Flagged' },
        { atReputation: 0, label: 'Pending' },
        { atReputation: 35, label: 'Cooperative' },
        { atReputation: 70, label: 'Cleared on sight' },
      ],
      allies: ['faction_larkspur'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'yuna',
      name: 'Yuna Takeda',
      role: 'Second-year ranked first of twelve hundred. Gravity, and the hand you just shook',
      cardBlurb:
        'She has held the top of the Board for fourteen months without once losing control, and for a minute this morning you were carrying half of what she carries.',
      pronouns: 'she/her',
      publicTraits: ['Never loses control in public', 'Polite in a way that ends conversations', 'Trains alone, always'],
      hiddenDrives: [
        'She wants, badly, to put the weight down for one minute, and has never said so to anybody',
        'She is working out whether the transfer who copied her is a threat to her rank or the only help she has ever been offered',
      ],
      values: [
        'Control, practised until it looks easy',
        'Rescue work over fame: the people in the water, not the cameras',
        'Saying a number exactly',
      ],
      fears: [
        'Losing control in front of the whole hall',
        'Waking up against the ceiling a third time with nobody there',
        'Being wanted for her power and for nothing else',
      ],
      socialStyle:
        'Says less than anyone in the room and is listened to more. Watches hands before faces, because she knows what a hand can do.',
      boundaries: [
        'Will not be touched without being asked first, and after this morning she means it literally',
        'Will not throw a match, take a bribe or accept a black rook, ever',
        'Will not let anybody watch her train until she decides they can',
      ],
      goals: [
        'Hold the top of the Board through Thursday’s challenge from Rook',
        'Find out what the transfer did to her power, and whether they can do it again',
        'Get through the week without anybody noticing the weights are not for training',
      ],
      secrets: [
        {
          id: 'yuna_slipping',
          fact: 'Her gravity has been getting stronger for a year. She sleeps with her bed frame bolted to the floor and the weights on, because twice she has woken up pressed against the ceiling. Nobody knows, including Adair.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the bolts herself if you have been up on the roof at night and kept what you saw there to yourself.',
        },
        {
          id: 'yuna_relief',
          fact: 'When the player copied her, the weight was shared for the first time in her life, and for a minute she could breathe all the way in. "Give it back" was fear. The relief afterwards frightens her more.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it on the roof, looking at the harbour rather than at you, if you ask what the handshake felt like from her side.',
        },
      ],
      speechStyle:
        'Quiet, exact and short. Measures everything in kilos, metres and seconds. Never raises her voice; lowers it instead. Dry humour arrives a beat after the line, as if she checked first whether it was allowed.',
      topics: ['her rank', 'gravity', 'the wrist weights', 'Thursday’s challenge', 'Rook', 'the port town she grew up in', 'sea rescue', 'what the copy felt like'],
      voiceSamples: [
        'You weigh seventy-one kilos. I know, because for a minute I was carrying it.',
        'Again, slower. If you drop that crate on the referee, the Board takes points off both of us.',
        'I don’t lose control. I have never lost control. Write that down somewhere you’ll see it.',
        'Eight kilos on my wrists, two bolts in the bed frame. Ask me why and your shoes will weigh as much as a car.',
      ],
      appearance:
        'Twenty-one, black hair cut bluntly at the jaw, grey eyes, academy jacket zipped to the collar, steel wrist weights on both wrists, very still.',
      visualHook: 'Two steel wrist weights, four kilos each, that she never takes off: not in class, not in the Pit, not at dinner.',
      silhouette: 'Perfectly upright, weight centred, hands loose at her sides as if she could put them anywhere.',
      artSeed: 'ec-yuna-01',
      portrait: null,
      expressions: ['neutral', 'focused', 'annoyed', 'flustered', 'warm', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_dorms', activity: 'in bed in the west wing, weights on, the frame bolted down' },
        { startMinute: 330, endMinute: 450, locationId: 'gym_roof', activity: 'training alone before anybody else is up' },
        { startMinute: 450, endMinute: 620, locationId: 'great_hall', activity: 'on welcome duty under the Board, shaking hands she would rather not' },
        { startMinute: 620, endMinute: 780, locationId: 'the_pit', activity: 'drilling control: lifting the referee’s box a centimetre and holding it there' },
        { startMinute: 780, endMinute: 840, locationId: 'the_quad', activity: 'lunch on the top step, alone, by choice' },
        { startMinute: 840, endMinute: 1080, locationId: 'the_pit', activity: 'watching the afternoon challenges and taking notes on everybody' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_dorms', activity: 'in the shared kitchen, eating standing up' },
        { startMinute: 1260, endMinute: 1400, locationId: 'gym_roof', activity: 'late training with the weights, where nobody can see her slip' },
        { startMinute: 1400, endMinute: 1440, locationId: 'the_dorms', activity: 'back in the west wing, bolting the door' },
      ],
      homeLocationId: 'the_dorms',
      knowledgeScope: ['yuna', 'larkspur', 'the_board', 'gravity', 'rook', 'the_title_match', 'sea_rescue'],
      startingRelationship: { trust: 5, affection: 0, respect: 15, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'yuna_lets_you_watch',
          label: 'She lets you stay on the roof while she trains',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'yuna_shows_the_bolts',
          label: 'She tells you why she wears the weights',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:yuna_is_slipping'] },
        },
        {
          id: 'yuna_lets_you_carry_it',
          label: 'She asks you to take half of it, for sixty seconds',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['the_weight_is_known'] },
        },
        {
          id: 'yuna_stops_counting',
          label: 'She stops counting when you are on the roof',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 60 },
        },
      ],
      attributes: { might: 12, agility: 14, mind: 14, presence: 13, resolve: 17, arcana: 18 },
      companion: null,
      scouting: {
        learnRate: 2,
        cap: 6,
        revealCopy: 'You lead with your right hand. Every time. I watched you reach for four people today.',
      },
      combatant: { health: 70, defenseDc: 18, damage: 12, tags: ['ranked_first', 'gravity'] },
    },
    {
      id: 'teo',
      name: 'Teo Vance',
      role: 'Your roommate in 4C. Ranked three hundred and eighty-eighth; hears electricity, sells noodles and odds',
      cardBlurb:
        'He has decided you are the most interesting thing to happen to Room 4C in two years, he has odds on everybody including you, and he knew what you could do before you told him.',
      pronouns: 'he/him',
      publicTraits: ['Talks fast and means most of it', 'Knows the odds on everything', 'Generous with noodles, stingy with sleep'],
      hiddenDrives: [
        'He likes you, and he is going to report on you anyway unless something changes, and he hates that both are true',
      ],
      values: ['Looking after whoever is in the room with him', 'Numbers, because numbers do not take sides'],
      fears: [
        'Dropping below four hundred and losing the scholarship',
        'Rook calling in the debt in front of people',
        'Being found out by the one person he did not want to lie to',
      ],
      socialStyle:
        'Fills every silence. Hands you information you did not ask for, so that you will not notice the one thing he leaves out.',
      boundaries: [
        'Will not fight anybody under any circumstances, and says so in advance',
        'Will not lie to you twice about the same thing. Once, yes. He is working on it',
      ],
      goals: ['Stay above four hundred by the end of term', 'Pay Rook back before Wednesday night', 'Get you to like him before you find out'],
      secrets: [
        {
          id: 'teo_reports',
          fact: 'Rook pays him to report on every transfer: name, power, weak points. He owes Rook money from a bad book, because he bet against Yuna. He has been told to report on you by tonight.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself, badly, on the second night, if you have trusted him with something first. Or you find your own name in his odds book.',
        },
      ],
      speechStyle:
        'Fast, warm and overlapping. Turns everything into odds. Ends half his sentences with "yeah?" to check you are still with him. Lists things in threes and then adds a fourth.',
      topics: ['the odds', 'the Board', 'Room 4C', 'noodles', 'Rook', 'Adair’s lab', 'the hum in the walls'],
      voiceSamples: [
        'I had you at four to one to survive the week. Moved you to three. That’s a compliment, yeah?',
        'The wall behind your bed hums in B-flat. Don’t ask. Noodles are two a cup, three after midnight, yeah?',
        'Okay. Full disclosure, partial disclosure, some disclosure: somebody might have asked me what you can do.',
        'Statistically you should be under the bed. With me. There’s room, there’s snacks, yeah?',
      ],
      appearance:
        'Twenty-two, tall and loose-limbed, curly brown hair, a canvas jacket with too many pockets, a pen behind each ear.',
      visualHook: 'Over-ear headphones that are never plugged into anything, worn so he can hear the wiring in the walls instead.',
      silhouette: 'Leaning in a doorway, gesturing with both hands, never quite standing straight.',
      artSeed: 'ec-teo-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'sheepish', 'worried', 'delighted'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'room_4c', activity: 'out cold with his headphones still on' },
        { startMinute: 420, endMinute: 540, locationId: 'the_dorms', activity: 'selling noodles out of the shared kitchen' },
        { startMinute: 540, endMinute: 600, locationId: 'great_hall', activity: 'taking bets in the back third of the hall' },
        { startMinute: 600, endMinute: 900, locationId: 'adair_lab', activity: 'running the rigs for Professor Adair' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_quad', activity: 'working the fountain steps with his odds book' },
        { startMinute: 1080, endMinute: 1200, locationId: 'velling_harbour', activity: 'at the noodle shop by the ferry, buying stock' },
        { startMinute: 1200, endMinute: 1320, locationId: 'boathouse', activity: 'at the Boathouse, telling Rook things' },
        { startMinute: 1320, endMinute: 1440, locationId: 'room_4c', activity: 'in Room 4C, pretending he has been there all evening' },
      ],
      homeLocationId: 'room_4c',
      knowledgeScope: ['teo', 'larkspur', 'the_board', 'the_back_row', 'adair_lab', 'room_4c', 'the_odds'],
      startingRelationship: { trust: 40, affection: 35, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'teo_hears_the_lock',
          label: 'He tells you about the lock he can hear under the lab',
          kind: 'OTHER',
          requires: { trust: 45, flagsSet: ['heard_of_wren'] },
        },
        {
          id: 'teo_comes_clean',
          label: 'He tells you who he reports to',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'teo_on_your_side',
          label: 'He starts telling Rook what you want Rook to hear',
          kind: 'ALLIANCE',
          requires: { trust: 60, flagsSet: ['knows:teo_reports'] },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 15, presence: 13, resolve: 9, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 3, tags: ['support'] },
    },
    {
      id: 'adair',
      name: 'Professor Imogen Adair',
      calledName: 'Adair',
      role: 'Head of Power Theory and combat fundamentals. Was going to be one of the best heroes in the country, until something ended it in her fourth year',
      cardBlurb:
        'She is the first adult to reach you when the copy runs out, she asks three questions and checks her watch, and she has been waiting twenty-six years for somebody like you to walk into her hall.',
      pronouns: 'she/her',
      publicTraits: ['Exact', 'Unimpressed by rank', 'Checks her watch every sixty seconds'],
      hiddenDrives: [
        'She needs to know whether you can hold past sixty before anybody else does, so that she can be the one who teaches you not to',
        'Some part of her wants to know whether her own power still exists anywhere',
      ],
      values: ['Control over talent, every time', 'Telling students the truth about what a power costs', 'Doing the paperwork herself'],
      fears: ['Watching it happen again in her own hall', 'Being pitied', 'Being right about you'],
      socialStyle:
        'Teaches in questions. Answers a personal question with a technical one. Touches nobody, and nobody has noticed that she does not.',
      boundaries: [
        'Will not let anybody copy her, and says no before you ask',
        'Will not talk about her own career except in the past tense',
        'Will not lie to the Registry for anybody, including you',
      ],
      goals: [
        'Measure exactly what you can do before Friday',
        'Make sure you let go at sixty, every time',
        'Get you through the hearing open rather than restricted',
      ],
      secrets: [
        {
          id: 'adair_the_pier',
          fact: 'Twenty-six years ago, as a fourth-year, her power (she could stop any moving thing she looked at, for as long as she kept looking) was copied by her classmate Arlo Wren during the Velling pier collapse. He held it for eleven minutes to keep the pier up while sixty-one people got off. It never came back. The faculty believe an injury ended her career before she was ever licensed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you in the lab, with the clock running, if you have let go at sixty in front of her when you did not have to.',
        },
        {
          id: 'adair_called_marsh',
          fact: 'She called the Registry herself the morning your transfer file arrived. Marsh is on campus because Adair asked her to come.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Marsh lets it slip, kindly, if you ask her who asked for this hearing.',
        },
      ],
      speechStyle:
        'Clipped and exact: a lecturer with a drill instructor’s economy. Asks questions in threes and wants the last one answered first. Uses "Again." as a whole sentence. Talks about her own career only in the past tense.',
      topics: ['power theory', 'the sixty seconds', 'the Pit rules', 'the Registry', 'Echo class', 'control', 'the old pier'],
      voiceSamples: [
        'Again.',
        'Three questions. What did you take, how long did you hold it, and whose was it? Answer the last one first.',
        'I used to be able to stop a falling car by looking at it. Now I teach people why they can’t. Sit down.',
        'You let go at sixty. Every time, without exception, for as long as you are in my building.',
      ],
      appearance:
        'Forty-seven, cropped dark hair with a grey streak, rolled shirtsleeves, a long pale scar down her right forearm, reading glasses pushed up into her hair.',
      visualHook: 'A plain wristwatch worn on the inside of her wrist, which she checks every sixty seconds without seeming to know she is doing it.',
      silhouette: 'Arms folded, weight back, standing one step further away than anybody else in the room.',
      artSeed: 'ec-adair-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'assessing', 'grave', 'sorry'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'velling_harbour', activity: 'at her flat above the ferry office' },
        { startMinute: 450, endMinute: 600, locationId: 'great_hall', activity: 'presiding over the morning assembly from the stage' },
        { startMinute: 600, endMinute: 840, locationId: 'adair_lab', activity: 'teaching Power Theory with the slow-motion camera' },
        { startMinute: 840, endMinute: 1020, locationId: 'the_pit', activity: 'refereeing sanctioned challenges from the box on stilts' },
        { startMinute: 1020, endMinute: 1260, locationId: 'adair_lab', activity: 'marking, and rewatching footage she has watched before' },
        { startMinute: 1260, endMinute: 1440, locationId: 'velling_harbour', activity: 'walking the rebuilt pier, then home' },
      ],
      homeLocationId: 'adair_lab',
      knowledgeScope: ['adair', 'larkspur', 'power_theory', 'echo_class', 'arlo_wren', 'the_pier', 'the_registry'],
      startingRelationship: { trust: 15, affection: 5, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'adair_trains_you',
          label: 'She starts training you herself',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'adair_tells_you',
          label: 'She tells you about the pier',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['heard_of_wren'] },
        },
        {
          id: 'adair_speaks_for_you',
          label: 'She will speak for you at the hearing',
          kind: 'ALLIANCE',
          requires: { trust: 45, respect: 45 },
        },
      ],
      attributes: { might: 13, agility: 12, mind: 18, presence: 15, resolve: 18, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 50, defenseDc: 16, damage: 8, tags: ['faculty'] },
    },
    {
      id: 'rook',
      name: 'Callum Rook',
      calledName: 'Rook',
      role: 'Third-year ranked ninth. Head of the Back Row, and the first person to make you an offer',
      cardBlurb:
        'Ninth for two years and done waiting. On Thursday he challenges the top of the Board, and all he wants from you is one handshake with Yuna, the second before the bell.',
      pronouns: 'he/him',
      publicTraits: ['Polite, always', 'Never throws the first punch', 'Calls everybody by their rank'],
      hiddenDrives: [
        'He is the first in three generations of his family not to be ranked first, and he has decided that cruelty is only efficiency',
        'He wants somebody to beat him fairly, so that he can stop',
      ],
      values: ['A deal is a deal, said out loud and kept', 'Loyalty to whoever holds a rook', 'Winning, and being seen to'],
      fears: ['Being a footnote in a family of names on plaques', 'Being hit by something he cannot give back'],
      socialStyle:
        'Smiles through everything, keeps his hands where you can see them, lets other people get angry first. Offers deals the way a shopkeeper offers change.',
      boundaries: [
        'Never throws the first punch. If he hits you, you hit him first',
        'Never lies about the terms of a deal',
        'Never mentions Teo’s debt in public',
      ],
      goals: [
        'Take the top of the Board from Yuna on Thursday at four',
        'Get you to shake her hand in the Pit before the bell',
        'Find out how long you can hold a copy before the Registry does',
      ],
      secrets: [
        {
          id: 'rook_four_losses',
          fact: 'He has challenged Yuna four times off the books in the Boathouse and lost all four. The Board only shows sanctioned challenges.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody in the Back Row will tell you if you have a rook in your pocket and ask why he never challenged her in the Pit before.',
        },
        {
          id: 'rook_knows_wren',
          fact: 'His grandfather sat on the Registry board that restricted Arlo Wren. Rook knows a copy can be held past sixty seconds, and that the owner loses it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself, as a sales pitch, once he respects you enough to think you might actually do it.',
        },
      ],
      speechStyle:
        'Lazy, polite and never in a hurry. Calls people by their rank number instead of their name. Never swears. Explains the terms of every deal slowly, twice, and smiles the whole time.',
      topics: ['the Board', 'the Back Row', 'Thursday’s challenge', 'his family', 'the black rooks', 'Teo’s debt', 'Echo class'],
      voiceSamples: [
        'Morning, Twelve-Hundred. Hit me. Everybody does eventually, and it’s the best part of my day.',
        'Here’s the deal, slowly, because I never lie about a deal: one handshake, Thursday, before the bell.',
        'Keep the rook. It means you’re mine, which on this hill is the safest thing a person can be.',
        'Nine. I’ve been ninth for two years. Do you know what ninth sounds like at a family dinner?',
      ],
      appearance:
        'Twenty-three, big through the shoulders, pale blond hair slicked back, academy jacket worn open over a black shirt, knuckles that have never been split.',
      visualHook: 'A black chess rook he walks across his knuckles while he talks, and gives away to people he has decided are his.',
      silhouette: 'Sprawled in a chair at the back of the room, one arm over the next chair, never the first to stand.',
      artSeed: 'ec-rook-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'threatening', 'stung', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'the_dorms', activity: 'east wing, top floor, the corner room he took in first year' },
        { startMinute: 450, endMinute: 600, locationId: 'great_hall', activity: 'in the back row, feet up on the chair in front' },
        { startMinute: 600, endMinute: 780, locationId: 'the_pit', activity: 'watching challenges and letting people hit him' },
        { startMinute: 780, endMinute: 960, locationId: 'the_quad', activity: 'holding court on the fountain with the Back Row' },
        { startMinute: 960, endMinute: 1440, locationId: 'boathouse', activity: 'at the Boathouse, running the evening' },
      ],
      homeLocationId: 'boathouse',
      knowledgeScope: ['rook', 'larkspur', 'the_board', 'the_back_row', 'the_title_match', 'echo_class', 'teo_debt'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'rook_names_his_price',
          label: 'He tells you the whole deal',
          kind: 'OTHER',
          requires: { respect: 20 },
        },
        {
          id: 'rook_uses_your_name',
          label: 'He starts calling you by your name',
          kind: 'OTHER',
          requires: { respect: 45 },
        },
        {
          id: 'rook_stands_with_you',
          label: 'He would stand next to you in the Pit',
          kind: 'ALLIANCE',
          requires: { trust: 40, respect: 45 },
        },
      ],
      attributes: { might: 17, agility: 11, mind: 13, presence: 15, resolve: 15, arcana: 14 },
      companion: null,
      scouting: {
        learnRate: 2,
        cap: 6,
        revealCopy: 'You look at hands before faces now. Good. So do I.',
      },
      combatant: { health: 80, defenseDc: 17, damage: 14, tags: ['ranked_ninth', 'recoil'] },
    },
    {
      id: 'marsh',
      name: 'Delphine Marsh',
      calledName: 'Marsh',
      role: 'Classification officer for the national Registry, with one file in her case. Yours',
      cardBlurb:
        'By Friday at ten she ticks one of two boxes on your file, open or restricted. She will tell you plainly what happens after each, and she has ticked the second one once before.',
      pronouns: 'she/her',
      publicTraits: ['Gentle', 'Procedural to the bone', 'Writes down pauses'],
      hiddenDrives: [
        'She does not want to restrict a twenty-year-old and is looking hard for a reason not to',
        'She wants Adair to forgive Arlo Wren before one of them dies',
      ],
      values: ['Getting the form right, because the form follows a person for life', 'Telling people exactly what will happen to them'],
      fears: ['Getting it wrong in either direction', 'The car at the harbour being used'],
      socialStyle:
        'Reads her questions aloud from the form. Waits. Writes down how long you took. Apologises for things that are not her fault and never for things that are.',
      boundaries: [
        'Will not change what she has written; she will add a line saying you changed your answer',
        'Will not discuss another registrant’s file without a reason she can write down',
      ],
      goals: ['Classify you by Friday at ten', 'Find out whether you can hold past sixty without making you try'],
      secrets: [
        {
          id: 'marsh_standing_order',
          fact: 'Standing order: any Echo who demonstrably holds a copy past sixty seconds is restricted on the spot, without a hearing. She has the authority, and a Registry car is waiting at the harbour.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you plainly if you ask her what happens if you fail, rather than how to pass.',
        },
        {
          id: 'marsh_visits_wren',
          fact: 'She processed Arlo Wren’s restriction as a junior clerk. He is alive in a Registry facility. She visits once a year, and every year he asks about Adair.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions it only if you already know his name and ask how he is, rather than what he did.',
        },
      ],
      speechStyle:
        'Gentle and procedural. Reads her own questions aloud and announces what she is writing. Says "for the record" and "dear". Never hurries and never threatens; she only describes what happens next.',
      topics: ['the form', 'Echo class', 'the hearing', 'the Registry', 'open and restricted', 'Arlo Wren'],
      voiceSamples: [
        'For the record, that was a yes. You can change it. I’ll write down that you changed it.',
        'Two boxes on this form, dear. Open, and restricted. I’ve ticked the second one exactly once in my career.',
        'Question four. Have you ever held a copy longer than sixty seconds? Take your time. I’m noting how long you take.',
        'I came here to fill in a form correctly, which is worse than frightening you, and I’m sorry about it.',
      ],
      appearance:
        'Fifty-two, neat grey bob, a navy suit that has been to a lot of hearings, a clipboard with a carbon copy under every sheet.',
      visualHook: 'A fountain pen she uncaps only when she is about to write down something you will not be able to take back.',
      silhouette: 'Seated, ankles crossed, clipboard on her knee, pen capped, perfectly patient.',
      artSeed: 'ec-marsh-01',
      portrait: null,
      expressions: ['neutral', 'patient', 'kind', 'precise', 'troubled'],
      schedule: [
        { startMinute: 0, endMinute: 510, locationId: 'velling_harbour', activity: 'at the harbour hotel, reading your file again' },
        { startMinute: 510, endMinute: 1080, locationId: 'registry_annex', activity: 'at the borrowed desk in the Registry Annex' },
        { startMinute: 1080, endMinute: 1440, locationId: 'velling_harbour', activity: 'dinner alone by the ferry, then the hotel' },
      ],
      homeLocationId: 'registry_annex',
      knowledgeScope: ['marsh', 'the_registry', 'echo_class', 'arlo_wren', 'the_hearing', 'adair'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'marsh_puts_the_pen_down',
          label: 'She puts the pen down and talks off the record',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'marsh_writes_cooperative',
          label: 'She writes "cooperative" on the form',
          kind: 'OTHER',
          requires: { respect: 30 },
        },
      ],
      attributes: { might: 7, agility: 8, mind: 16, presence: 14, resolve: 17, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 25, defenseDc: 10, damage: 1, tags: ['civilian', 'registry'] },
    },
  ],
  quests: [
    {
      id: 'q_forty_seconds',
      title: 'Forty Seconds',
      summary:
        'You are floating above the floor of the Great Hall, holding the top-ranked student’s power and her hand, and she wants both back.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['yuna', 'adair', 'rook', 'teo'],
      involvedLocationIds: ['great_hall'],
      knownRewardCopy: 'Your feet back on the floor, and some idea of what the whole academy now thinks you are.',
      steps: [
        {
          id: 'the_handshake',
          playerCopy: 'Get through the next forty seconds with the whole hall watching.',
          directorNotes:
            'The player is a hand’s width off the floor with Yuna’s gravity under their ribs and forty seconds on the count. She shares control while they hold it, so she is off balance for the first time in fourteen months and furious about it. Every route is real. Handing it back is gracious. Using it is spectacular, and frightens her. Talking her down works if it is funny or honest. Feeling out the power shows the player how much weight she is actually carrying, far more than anybody should, which is the first thread of her secret. Letting go of her and grabbing somebody else (Rook is in the back row, Teo is near the doors) swaps the copy and starts a different scene. Whatever happens, the copy ends at sixty seconds and the player drops; Adair is first off the stage to reach them, asks three questions and checks her watch.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_it_back',
              label: 'Let go and hand it back whole',
              predicate: { flagsSet: ['used:let_go'] },
              setsFlags: ['gave_it_back'],
              closesFlags: ['showed_off'],
            },
            {
              routeId: 'showed_off',
              label: 'Use her power, in front of everybody',
              predicate: { flagsSet: ['used:use_the_copy'] },
              setsFlags: ['showed_off', 'the_hall_saw_it'],
              closesFlags: ['gave_it_back'],
            },
            {
              routeId: 'talked_her_down',
              label: 'Talk to her while the count runs out',
              predicate: { flagsSet: ['used:talk_through'] },
              setsFlags: ['talked_it_through'],
              closesFlags: [],
            },
            {
              routeId: 'felt_the_weight',
              label: 'Feel out what you are holding',
              predicate: { flagsSet: ['used:read_a_power'] },
              setsFlags: ['felt_her_weight'],
              closesFlags: [],
            },
            {
              routeId: 'grabbed_someone_else',
              label: 'Let go of her and grab somebody else',
              predicate: { flagsSet: ['used:get_a_hand_on'] },
              setsFlags: ['grabbed_someone_else', 'the_hall_saw_it'],
              closesFlags: ['gave_it_back'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_echo_done'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_day',
          playerCopy: 'Find out where you stand: a room, a rank, and a professor who wants a word.',
          directorNotes:
            'The rest of Monday. Everybody has heard by lunch. Teo is assigned to show the player to Room 4C and talks the whole way. Adair wants them in her lab to measure the copy on the slow-motion camera, and mentions, flatly, that there has been one other. The Pit is open for challenges and the slips are on the welcome table. The Back Row will find the player if the player does not find them. None of this is urgent and all of it is the academy showing what it is; let it be fun.',
          enterWhen: { flagsSet: ['first_echo_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'met_your_roommate',
              label: 'Let your roommate show you round',
              predicate: { flagsSet: ['spoke:teo'] },
              setsFlags: ['has_a_friend'],
              closesFlags: [],
            },
            {
              routeId: 'measured_in_the_lab',
              label: 'Let Adair measure you in her lab',
              predicate: { flagsSet: ['spoke:adair', 'visited:adair_lab'] },
              setsFlags: ['adair_measured_you', 'heard_of_wren'],
              closesFlags: [],
            },
            {
              routeId: 'signed_a_slip',
              label: 'Take a challenge slip down to the Pit',
              predicate: { flagsSet: ['visited:the_pit'], hasItems: ['challenge_slip'] },
              setsFlags: ['signed_a_slip'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_back_row',
              label: 'Go down to the Boathouse',
              predicate: { flagsSet: ['visited:boathouse'] },
              setsFlags: ['met_the_back_row', 'rook_made_an_offer'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_day_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_larkspur', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_board',
      title: 'Twelve Hundred',
      summary: 'Your name is at the bottom of the Board. Anyone may challenge anyone, and the Pit is open every afternoon.',
      kind: 'MAIN',
      involvedCharacterIds: ['yuna', 'rook', 'adair'],
      involvedLocationIds: ['the_pit', 'great_hall'],
      knownRewardCopy: 'A number on your wrist that means something, or the decision that it never will.',
      discoverWhen: { flagsSet: ['first_echo_done'] },
      steps: [
        {
          id: 'first_challenge',
          playerCopy: 'Win, or at least survive, your first sanctioned challenge in the Pit.',
          directorNotes:
            'Pick an opponent who makes the copy interesting: somebody whose power is useless in the wrong hands, like Moss Keller’s ivy, or Rook’s lieutenant Dita Ferro, whose rubber skin can only be beaten by touch. A copy fight is a sixty-second puzzle: get a hand on them, learn the power in ten seconds, use it for fifty. Winning bare-handed is the brawler’s route and the hall respects it more. Losing well is a real route: the player held their nerve, did not cheat, and the hall noticed. Refusing to climb at all, in Adair’s lab, is the player deciding the number is not the point, and Adair respects that most of all.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_with_a_copy',
              label: 'Win on somebody else’s power',
              predicate: { flagsSet: ['used:use_the_copy'], atLocation: 'the_pit' },
              setsFlags: ['won_with_a_copy'],
              closesFlags: ['refused_to_climb'],
            },
            {
              routeId: 'won_bare',
              label: 'Win with no power in you at all',
              predicate: { flagsSet: ['used:fight_bare'], atLocation: 'the_pit' },
              setsFlags: ['won_bare'],
              closesFlags: ['refused_to_climb'],
            },
            {
              routeId: 'lost_well',
              label: 'Lose, and do not flinch',
              predicate: { flagsSet: ['used:hold_your_nerve'], atLocation: 'the_pit' },
              setsFlags: ['lost_well'],
              closesFlags: [],
            },
            {
              routeId: 'refused_to_climb',
              label: 'Tell Adair you are not here to fight for a number',
              predicate: { flagsSet: ['used:talk_through', 'spoke:adair'], atLocation: 'adair_lab' },
              setsFlags: ['refused_to_climb'],
              closesFlags: ['won_with_a_copy', 'won_bare'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['on_the_board'],
            abilities: [],
            reputation: [
              { factionId: 'faction_board', amount: 25 },
              { factionId: 'faction_larkspur', amount: 5 },
            ],
          },
        },
        {
          id: 'the_top_ten',
          playerCopy: 'Get into the top ten, or decide you never want to.',
          directorNotes:
            'The front row of the hall. Getting there in a week is outrageous and possible: anybody can challenge anybody, and a copy power is at its best against people who have never had to defend against their own power. Challenging Rook directly takes his ninth and ruins his Thursday. Challenging Yuna is the boldest thing a transfer has ever done in this hall; the result is the narrator’s to decide from how the player fights. Staying low on purpose, with Teo’s help, is a real strategy: nobody studies the twelve-hundredth student.',
          enterWhen: { flagsSet: ['on_the_board'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'challenged_yuna',
              label: 'Challenge the top of the Board',
              predicate: {
                flagsSet: ['engaged:yuna'],
                atLocation: 'the_pit',
                minFactionReputation: [{ factionId: 'faction_board', value: 25 }],
              },
              setsFlags: ['top_ten', 'fought_yuna'],
              closesFlags: ['stayed_low'],
            },
            {
              routeId: 'challenged_rook',
              label: 'Challenge Rook for ninth before Thursday',
              predicate: { flagsSet: ['engaged:rook'], atLocation: 'the_pit' },
              setsFlags: ['top_ten', 'fought_rook_first'],
              closesFlags: ['stayed_low', 'rook_deal'],
            },
            {
              routeId: 'climbed_on_borrowed_power',
              label: 'Climb on borrowed powers, one handshake at a time',
              predicate: {
                flagsSet: ['used:echo_touch', 'used:use_the_copy'],
                atLocation: 'the_pit',
                minFactionReputation: [{ factionId: 'faction_board', value: 25 }],
              },
              setsFlags: ['top_ten'],
              closesFlags: ['stayed_low'],
            },
            {
              routeId: 'stayed_low',
              label: 'Stay low on the Board, where nobody studies you',
              predicate: { flagsSet: ['used:let_go', 'spoke:teo'] },
              setsFlags: ['stayed_low'],
              closesFlags: ['top_ten'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['the_board_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_board', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_the_back_row',
      title: 'A Black Rook',
      summary: 'Rook wants one handshake: yours and Yuna’s, in the Pit, the second before Thursday’s bell.',
      kind: 'MAIN',
      involvedCharacterIds: ['rook', 'yuna', 'teo'],
      involvedLocationIds: ['boathouse', 'room_4c', 'the_pit'],
      knownRewardCopy: 'Whoever is at the top of the Board on Friday morning, and whose hand put them there.',
      discoverWhen: { flagsSet: ['rook_made_an_offer'] },
      steps: [
        {
          id: 'the_offer',
          playerCopy: 'Decide what you are going to do about Rook’s offer.',
          directorNotes:
            'Rook explains the deal twice, slowly, and never lies about it: shake Yuna’s hand in the Pit the second before the bell and she fights the first sixty seconds sharing her own power with you. In return he gives you a black rook, protection from the Back Row, and a place in the top fifty by the end of term. Taking the rook is a real choice and a profitable one. Warning Yuna needs her to trust you enough to listen. Doing both is a double game and both of them will find out eventually.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'played_both',
              label: 'Take his rook and warn her anyway',
              predicate: {
                flagsSet: ['spoke:yuna'],
                hasItems: ['black_rook'],
                minRelationship: [{ characterId: 'yuna', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['rook_deal', 'warned_yuna', 'double_game'],
              closesFlags: ['refused_rook'],
            },
            {
              routeId: 'took_the_rook',
              label: 'Take the rook',
              predicate: { hasItems: ['black_rook'] },
              setsFlags: ['rook_deal'],
              closesFlags: ['refused_rook'],
            },
            {
              routeId: 'turned_him_down',
              label: 'Tell him no to his face',
              predicate: { flagsSet: ['spoke:rook', 'used:hold_your_nerve'] },
              setsFlags: ['refused_rook'],
              closesFlags: ['rook_deal'],
            },
            {
              routeId: 'warned_yuna',
              label: 'Tell Yuna what he is planning',
              predicate: {
                flagsSet: ['spoke:yuna'],
                minRelationship: [{ characterId: 'yuna', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['warned_yuna'],
              closesFlags: ['rook_deal'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['knows:what_rook_wants'],
            abilities: [],
            reputation: [{ factionId: 'faction_back_row', amount: 20 }],
          },
        },
        {
          id: 'the_title_match',
          playerCopy: 'Thursday, four o’clock, the Pit: Yuna against Rook for the top of the Board.',
          directorNotes:
            'The whole academy is on the benches. Rook lets Yuna hit first, as always. If the player shakes her hand at the bell, she fights the first minute sharing control and Rook gets the opening he has wanted for two years; she will know exactly who did it. If the player warned her, she offers her hand to the player herself before the bell, in front of everyone, and dares them. If the player already beat Rook, there is no match and Rook watches from the back row with nothing in his hands. If the player is not there, the narrator decides the match from everything already true.',
          enterWhen: { flagsSet: ['knows:what_rook_wants'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_double_game',
              label: 'Shake her hand at the bell, and let go at once',
              predicate: { flagsSet: ['double_game', 'used:echo_touch', 'used:let_go'], atLocation: 'the_pit' },
              setsFlags: ['yuna_kept_it', 'rook_humiliated'],
              closesFlags: ['rook_is_number_one'],
            },
            {
              routeId: 'shook_her_hand',
              label: 'Shake her hand the second before the bell',
              predicate: { flagsSet: ['rook_deal', 'used:echo_touch'], flagsUnset: ['warned_yuna'], atLocation: 'the_pit' },
              setsFlags: ['sabotaged_yuna', 'rook_is_number_one'],
              closesFlags: ['yuna_kept_it'],
            },
            {
              routeId: 'stood_with_her',
              label: 'Stand in her corner',
              predicate: { flagsSet: ['warned_yuna'], atLocation: 'the_pit' },
              setsFlags: ['yuna_kept_it'],
              closesFlags: ['rook_is_number_one'],
            },
            {
              routeId: 'took_his_place',
              label: 'Beat Rook before he ever gets to her',
              predicate: { flagsSet: ['fought_rook_first'] },
              setsFlags: ['rook_stopped', 'yuna_kept_it'],
              closesFlags: ['rook_is_number_one'],
            },
            {
              routeId: 'stayed_away',
              label: 'Let the match happen without you',
              predicate: { flagsSet: ['title_match_over'] },
              setsFlags: ['missed_the_match'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['title_match_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_board', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_the_weight',
      title: 'The Weight',
      summary: 'The top-ranked student in the building wears eight kilos on her wrists and never takes them off.',
      kind: 'SIDE',
      involvedCharacterIds: ['yuna', 'adair', 'rook'],
      involvedLocationIds: ['gym_roof', 'the_dorms', 'the_pit'],
      knownRewardCopy: 'What she is carrying, and whether you are the person who helps her carry it.',
      discoverWhen: { flagsSet: ['first_day_over'] },
      steps: [
        {
          id: 'notice',
          playerCopy: 'Work out why Yuna never takes off her wrist weights.',
          directorNotes:
            'Her gravity has been getting stronger for a year and she is hiding it. The player can see her slip on the roof at night, read it in her power, have her tell them once she trusts them, or take her spare weights and find out the hard way. Taking the weights is theft and she will treat it as theft, but she will also be standing on nothing for three seconds in front of the player, which is not something she can take back.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'saw_her_slip',
              label: 'See her slip on the roof',
              predicate: { flagsSet: ['saw_yuna_slip'] },
              setsFlags: ['knows:yuna_is_slipping'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_on_the_roof',
              label: 'Watch her train and read what you see',
              predicate: { flagsSet: ['visited:gym_roof', 'used:read_a_power'] },
              setsFlags: ['knows:yuna_is_slipping'],
              closesFlags: [],
            },
            {
              routeId: 'she_told_you',
              label: 'Let her tell you herself',
              predicate: {
                flagsSet: ['spoke:yuna'],
                minRelationship: [{ characterId: 'yuna', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:yuna_is_slipping', 'yuna_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'felt_it_in_the_hall',
              label: 'Ask her about the weight you felt this morning',
              predicate: { flagsSet: ['felt_her_weight', 'spoke:yuna'] },
              setsFlags: ['knows:yuna_is_slipping'],
              closesFlags: [],
            },
            {
              routeId: 'took_her_weights',
              label: 'Take her spare weights and see what happens',
              predicate: { hasItems: ['wrist_weight'] },
              setsFlags: ['knows:yuna_is_slipping', 'took_her_weights'],
              closesFlags: ['yuna_told_you'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['the_weight_is_known'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'share_it',
          playerCopy: 'Decide what to do with the one thing nobody else on the hill can do for her.',
          directorNotes:
            'The player is the only person alive who can take half of Yuna’s weight, for sixty seconds at a time. Offering it is a big thing to ask, and she has to agree; on the roof at midnight it is the closest thing in this story to a confession. Keeping her secret matters as much as helping. Selling it to Rook before Thursday is the worst thing the player can do to her, and it works.',
          enterWhen: { flagsSet: ['the_weight_is_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'shared_the_weight',
              label: 'Take half of it, on the roof, with her permission',
              predicate: {
                flagsSet: ['used:echo_touch'],
                atLocation: 'gym_roof',
                minRelationship: [{ characterId: 'yuna', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['shared_the_weight'],
              closesFlags: ['sold_her_secret'],
            },
            {
              routeId: 'kept_her_secret',
              label: 'Tell her nobody will hear it from you, and mean it',
              predicate: { flagsSet: ['spoke:yuna', 'used:hold_your_nerve'] },
              setsFlags: ['kept_her_secret'],
              closesFlags: ['sold_her_secret'],
            },
            {
              routeId: 'told_adair',
              label: 'Tell Adair, because somebody qualified should know',
              predicate: { flagsSet: ['spoke:adair', 'used:talk_through'] },
              setsFlags: ['told_adair_about_yuna'],
              closesFlags: [],
            },
            {
              routeId: 'sold_her_secret',
              label: 'Tell Rook what she is hiding',
              predicate: { flagsSet: ['spoke:rook', 'used:talk_through'] },
              setsFlags: ['sold_her_secret'],
              closesFlags: ['shared_the_weight', 'kept_her_secret'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['the_weight_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_last_echo',
      title: 'The Last Echo',
      summary: 'Twenty-six years ago, one other person was registered Echo class. Nobody will say what happened to him.',
      kind: 'LEAD',
      involvedCharacterIds: ['adair', 'marsh', 'rook', 'teo'],
      involvedLocationIds: ['adair_lab', 'records_room', 'registry_annex', 'velling_harbour'],
      knownRewardCopy: 'The truth about the only other person who could do what you do, and the rule nobody told you.',
      discoverWhen: { flagsSet: ['heard_of_wren'] },
      steps: [
        {
          id: 'find_out',
          playerCopy: 'Find out what happened to the only other Echo.',
          directorNotes:
            'Arlo Wren, twenty-six years ago, the Velling pier collapse, eleven minutes holding Adair’s power, sixty-one people saved, and Adair has had nothing since. Four people know some of it and none of them wants to be the one who says it. Adair tells it best and only to somebody who has let go at sixty in front of her. Her notes tell it coldly. The sealed file tells it officially and has Rook’s grandfather’s name on it. Marsh tells it kindly. Rook tells it as a sales pitch. Whoever tells it, the thing the player learns is that sixty seconds was never a limit.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'adair_told_you',
              label: 'Get Adair to tell you herself',
              predicate: {
                flagsSet: ['spoke:adair'],
                minRelationship: [{ characterId: 'adair', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['adair_told_you', 'knows:wren'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_notes',
              label: 'Read her old field notes',
              predicate: { hasItems: ['adair_notes'] },
              setsFlags: ['read_adair_notes', 'knows:wren'],
              closesFlags: ['adair_told_you'],
            },
            {
              routeId: 'read_the_file',
              label: 'Read the sealed file in Records Room 0',
              predicate: { hasItems: ['sealed_file'] },
              setsFlags: ['read_the_file', 'knows:wren'],
              closesFlags: [],
            },
            {
              routeId: 'marsh_told_you',
              label: 'Ask the Registrar off the record',
              predicate: {
                flagsSet: ['spoke:marsh'],
                minRelationship: [{ characterId: 'marsh', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['marsh_told_you', 'knows:wren'],
              closesFlags: [],
            },
            {
              routeId: 'rook_told_you',
              label: 'Let Rook make his pitch',
              predicate: {
                flagsSet: ['spoke:rook'],
                minRelationship: [{ characterId: 'rook', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['rook_told_you', 'knows:wren'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:the_hold'],
            abilities: ['hold_past_sixty'],
            reputation: [],
          },
        },
        {
          id: 'the_hold',
          playerCopy: 'You can hold a copy past sixty seconds. Decide whether you ever will.',
          directorNotes:
            'The temptation is real and the story should let it be. Holding past sixty is the most powerful thing the player can do, and it takes the power away from somebody who did not agree to lose it. Using it once, for a few minutes, sends it home bruised; past ten minutes it does not go home. If anybody official sees it, Marsh’s standing order applies. Swearing it off in front of Adair is the other real ending of this thread, and it should cost the player something they wanted.',
          enterWhen: { flagsSet: ['knows:the_hold'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'held_it',
              label: 'Hold a copy past sixty',
              predicate: { flagsSet: ['used:hold_past_sixty'] },
              setsFlags: ['held_past_sixty'],
              closesFlags: ['swore_it_off'],
            },
            {
              routeId: 'swore_it_off',
              label: 'Let go at sixty in front of Adair, and promise to keep doing it',
              predicate: { flagsSet: ['spoke:adair', 'used:let_go'] },
              setsFlags: ['swore_it_off'],
              closesFlags: ['held_past_sixty'],
            },
            {
              routeId: 'declared_it',
              label: 'Tell the Registrar you know you could',
              predicate: { flagsSet: ['spoke:marsh', 'used:talk_through'] },
              setsFlags: ['declared_the_hold'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['the_hold_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_classification',
      title: 'Class: Pending',
      summary: 'A Registrar has a form with two boxes on it, open and restricted, and she has to tick one by Friday at ten.',
      kind: 'MAIN',
      involvedCharacterIds: ['marsh', 'adair'],
      involvedLocationIds: ['registry_annex'],
      knownRewardCopy: 'A class on your file, which decides whether you stay at Larkspur at all.',
      discoverWhen: { flagsSet: ['registry_on_campus'] },
      steps: [
        {
          id: 'the_interview',
          playerCopy: 'Sit down with the Registrar and answer her questions, or do not.',
          directorNotes:
            'Marsh reads every question aloud and writes down how long the player takes to answer. She is kind and she is not on anybody’s side. The answer to question four (have you ever held a copy longer than sixty seconds) is the only one that matters, and she will not say so. Lying to her is possible; she writes down the pause. Bringing Adair changes the room. Not turning up at all is also an answer, and she writes that down too.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_adair',
              label: 'Go in with Adair beside you',
              predicate: {
                flagsSet: ['spoke:marsh'],
                minRelationship: [{ characterId: 'adair', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['answered_marsh', 'adair_vouched'],
              closesFlags: [],
            },
            {
              routeId: 'answered_straight',
              label: 'Answer every question straight',
              predicate: { flagsSet: ['spoke:marsh', 'used:hold_your_nerve'] },
              setsFlags: ['answered_marsh'],
              closesFlags: ['shaded_the_truth'],
            },
            {
              routeId: 'shaded_it',
              label: 'Charm her, and shade the truth on question four',
              predicate: { flagsSet: ['spoke:marsh', 'used:talk_through'] },
              setsFlags: ['answered_marsh', 'shaded_the_truth'],
              closesFlags: [],
            },
            {
              routeId: 'skipped_it',
              label: 'Never go to the interview',
              predicate: { flagsSet: ['hearing_called'] },
              setsFlags: ['skipped_the_interview'],
              closesFlags: ['answered_marsh'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['interview_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_registry', amount: 15 }],
          },
        },
        {
          id: 'the_hearing',
          playerCopy: 'Friday at ten, the Registry Annex: open, or restricted.',
          directorNotes:
            'A small room, three chairs, one form. Marsh reads the whole file aloud, including anything the player did in public this week. If the player has held past sixty, the hearing is a formality and the car is real; play it with dignity, not as a trap. If Adair stands up for them, she says something she has never said in public. A player who skipped the interview and turns up anyway gets a fair hearing and a hard one.',
          enterWhen: { flagsSet: ['interview_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'restricted',
              label: 'Restricted, because you held past sixty',
              predicate: { flagsSet: ['held_past_sixty'] },
              setsFlags: ['restricted'],
              closesFlags: ['cleared'],
            },
            {
              routeId: 'vouched_for',
              label: 'Adair stands up for you',
              predicate: {
                flagsSet: ['adair_vouched'],
                minRelationship: [{ characterId: 'marsh', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['cleared', 'adair_stood_up'],
              closesFlags: ['restricted'],
            },
            {
              routeId: 'cleared',
              label: 'Open, on your own answers',
              predicate: {
                flagsSet: ['hearing_day'],
                minRelationship: [{ characterId: 'marsh', dimension: 'respect', value: 30 }],
              },
              setsFlags: ['cleared'],
              closesFlags: ['restricted'],
            },
            {
              routeId: 'restricted_for_cause',
              label: 'Restricted, because nobody could say what you are',
              predicate: { flagsSet: ['hearing_day', 'skipped_the_interview'] },
              setsFlags: ['restricted'],
              closesFlags: ['cleared'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['classified'],
            abilities: [],
            reputation: [
              { factionId: 'faction_registry', amount: 30 },
              { factionId: 'faction_larkspur', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_three_to_one',
      title: 'Three to One',
      summary: 'Your roommate knew what you could do before you told him. Somebody asked him to find out.',
      kind: 'SIDE',
      involvedCharacterIds: ['teo', 'rook'],
      involvedLocationIds: ['room_4c', 'boathouse'],
      knownRewardCopy: 'Who Teo reports to, and what he is to you once you know.',
      discoverWhen: { flagsSet: ['rook_made_an_offer'] },
      steps: [
        {
          id: 'what_teo_owes',
          playerCopy: 'Find out why Teo knew exactly what you could do.',
          directorNotes:
            'Teo owes Rook money and pays it off in information about transfers. He likes the player and is ashamed of it. He will confess if he trusts them, get caught if they follow him to the Boathouse or read his book, or get called in front of Rook on Wednesday night if nobody sorts it out first. He never fights, including when cornered: he talks faster.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_came_clean',
              label: 'Let him tell you himself',
              predicate: {
                flagsSet: ['spoke:teo'],
                minRelationship: [{ characterId: 'teo', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['teo_came_clean'],
              closesFlags: ['caught_teo'],
            },
            {
              routeId: 'read_his_book',
              label: 'Read his odds book',
              predicate: { hasItems: ['teo_book'] },
              setsFlags: ['caught_teo'],
              closesFlags: ['teo_came_clean'],
            },
            {
              routeId: 'followed_him',
              label: 'Follow him down to the Boathouse',
              predicate: { flagsSet: ['spoke:teo'], atLocation: 'boathouse' },
              setsFlags: ['caught_teo'],
              closesFlags: ['teo_came_clean'],
            },
            {
              routeId: 'he_was_called_in',
              label: 'Let it come out on Wednesday night',
              predicate: { flagsSet: ['teo_called_in'] },
              setsFlags: ['caught_teo'],
              closesFlags: ['teo_came_clean'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:teo_reports'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'square_it',
          playerCopy: 'Decide what to do about a friend who sold you for noodle money.',
          directorNotes:
            'Three honest options. Settling his debt with Rook costs the player something Rook wants. Turning him into a double agent is the fun one and the risky one, and Teo is terrible at lying to Rook. Cutting him off is fair, and he takes it quietly, which is worse.',
          enterWhen: { flagsSet: ['knows:teo_reports'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_his_debt',
              label: 'Settle his debt with Rook yourself',
              predicate: { flagsSet: ['spoke:rook', 'used:talk_through'] },
              setsFlags: ['teo_free'],
              closesFlags: ['teo_cut_off'],
            },
            {
              routeId: 'turned_him',
              label: 'Have him feed Rook what you want Rook to hear',
              predicate: { flagsSet: ['spoke:teo', 'used:talk_through'] },
              setsFlags: ['teo_double_agent'],
              closesFlags: ['teo_cut_off'],
            },
            {
              routeId: 'cut_him_off',
              label: 'Tell him you are done',
              predicate: { flagsSet: ['spoke:teo', 'used:hold_your_nerve'] },
              setsFlags: ['teo_cut_off'],
              closesFlags: ['teo_double_agent', 'teo_free'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['teo_squared'],
            abilities: [],
            reputation: [{ factionId: 'faction_back_row', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_copy_runs_out',
      atWorldMinute: 9 * 60 + 14,
      locationId: 'great_hall',
      publicCopy:
        'The count under your ribs reaches zero. The weight goes out of you all at once, and the floor comes up to meet you.',
      directorNotes:
        'Sixty seconds from the handshake, whatever the player did with them. The drop hits: headache, heavy limbs, the feel of gravity still in the chest for a moment after it has gone. Yuna has hers back whole and is rubbing her wrist. Adair is first off the stage, asks three questions, and checks her watch. The hall is already talking.',
      setsFlags: ['copy_ran_out'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_lunch_test',
      atWorldMinute: 13 * 60,
      locationId: 'the_quad',
      publicCopy:
        'A Back Row regular drops onto the fountain step beside you and holds out a bare hand with ivy growing between the knuckles. “Moss. Two-twelve. Go on, copy me. He wants to see your face when you do.” Up on the fountain rim, Rook raises his sandwich at you.',
      directorNotes:
        'Rook’s test, sent by proxy and in public. Moss grows ivy out of bare stone: useless in a fight, very funny in the wrong hands. The quad is watching to see what the transfer does with sixty seconds of it. Refusing is noticed too, and Rook likes that almost as much.',
      setsFlags: ['back_row_tested'],
      cancelledByFlags: [],
      requiresFlags: ['first_echo_done'],
      movesCharacters: [],
    },
    {
      id: 'we_rook_at_the_door',
      atWorldMinute: 21 * 60 + 30,
      locationId: 'room_4c',
      publicCopy:
        'Somebody knocks on the door of Room 4C twice, politely. Teo goes very still. When it opens, Callum Rook is leaning on the frame, turning a black chess piece across his knuckles.',
      directorNotes:
        'Rook makes his offer in person and explains it twice. If the player is not in the room, he leaves the black rook on their pillow and Teo, too brightly, tells them who it is from. This is also the moment Teo is most obviously hiding something.',
      setsFlags: ['rook_made_an_offer'],
      cancelledByFlags: ['rook_made_an_offer'],
      requiresFlags: ['first_echo_done'],
      movesCharacters: [{ characterId: 'rook', toLocationId: 'room_4c' }],
    },
    {
      id: 'we_the_board_posts',
      atWorldMinute: 1440 + 7 * 60,
      locationId: 'great_hall',
      publicCopy:
        'Seven o’clock. The Board in the Great Hall reshuffles, and your name goes up at the very bottom: 1,200. Your rank band buzzes once.',
      directorNotes:
        'Everybody on the hill now knows the transfer’s number, and the number is insulting. Three challenge slips with the player’s name on them are already in the box; none of the challengers is ranked above eight hundred, because nobody high wants to be the first to lose to a copy.',
      setsFlags: ['ranked_last'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_marsh_calls_you_in',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'registry_annex',
      publicCopy:
        'Your rank band buzzes: REPORT TO REGISTRY ANNEX. A Registrar has set up in a borrowed office with one file in her case, and it is yours.',
      directorNotes:
        'Marsh introduces herself, explains the two boxes on the form, and tells the player the hearing is Friday at ten. She mentions, as a matter of record, that Echo class has had one registrant before, and does not say his name unless asked.',
      setsFlags: ['registry_on_campus', 'heard_of_wren'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_teo_hears_the_lock',
      atWorldMinute: 1440 + 20 * 60 + 30,
      locationId: 'room_4c',
      publicCopy:
        'Teo takes his headphones off, which he never does. “There’s a lock under Adair’s lab,” he says, “running on a circuit nobody pays the bill for. Thought you’d want to know.”',
      directorNotes:
        'Only for a player who has made a friend of Teo and has heard there was another Echo. He can hear the lock on Records Room 0 and knows how long its circuit drops when the building’s heating cycles: forty seconds, at two in the morning.',
      setsFlags: ['records_room_open'],
      cancelledByFlags: ['records_room_open'],
      requiresFlags: ['has_a_friend', 'heard_of_wren'],
      movesCharacters: [],
    },
    {
      id: 'we_yuna_slips',
      atWorldMinute: 1440 + 23 * 60 + 40,
      locationId: 'gym_roof',
      publicCopy:
        'Yuna’s wrist weights hit the roof gravel. She does not. For three seconds she stands on nothing, a metre up, with her jaw locked and her eyes shut.',
      directorNotes:
        'Only for a player who has been up to the roof. She gets herself down by making the whole roof heavier for a moment, which cracks a tile. If the player is there she will look straight at them and say nothing at all, which is the loudest thing she has said all week.',
      setsFlags: ['saw_yuna_slip'],
      cancelledByFlags: ['the_weight_is_known'],
      requiresFlags: ['visited:gym_roof'],
      movesCharacters: [{ characterId: 'yuna', toLocationId: 'gym_roof' }],
    },
    {
      id: 'we_teo_called_in',
      atWorldMinute: 2 * 1440 + 20 * 60,
      locationId: 'boathouse',
      publicCopy:
        'Teo is not in the room. His headphones are on the desk, which never happens, and his odds book is gone.',
      directorNotes:
        'Rook has called him to the Boathouse to collect on the debt, in front of the Back Row. Teo will not fight; he will talk faster and faster. If the player goes down there it is the best chance they get to see exactly how Rook runs things.',
      setsFlags: ['teo_called_in'],
      cancelledByFlags: ['teo_came_clean', 'teo_free', 'caught_teo'],
      requiresFlags: ['rook_made_an_offer'],
      movesCharacters: [{ characterId: 'teo', toLocationId: 'boathouse' }],
    },
    {
      id: 'we_the_basement_door',
      atWorldMinute: 2 * 1440 + 22 * 60,
      locationId: 'adair_lab',
      publicCopy:
        'The basement door at the back of Adair’s lab, the one marked RECORDS, is standing open a hand’s width. There is a light on down there.',
      directorNotes:
        'Adair went down to read the file again and did not lock it behind her; she is at the bottom of the stairs with it in her hands. Only for a player who has been in the lab and knows there was another Echo.',
      setsFlags: ['records_room_open'],
      cancelledByFlags: ['records_room_open'],
      requiresFlags: ['heard_of_wren', 'visited:adair_lab'],
      movesCharacters: [{ characterId: 'adair', toLocationId: 'adair_lab' }],
    },
    {
      id: 'we_the_title_match',
      atWorldMinute: 3 * 1440 + 16 * 60,
      locationId: 'the_pit',
      publicCopy:
        'Thursday, four o’clock. Every bench in the Pit is full. Yuna Takeda walks onto the sand from one side and Callum Rook from the other, and the referee’s box goes quiet.',
      directorNotes:
        'The title match. Rook lets her hit first, always. Whether the player is involved, and how, has been decided over the week; play it from there. If nobody interferes, Yuna wins narrowly and something about how she wins worries Adair.',
      setsFlags: ['title_match_over'],
      cancelledByFlags: ['fought_rook_first'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'yuna', toLocationId: 'the_pit' },
        { characterId: 'rook', toLocationId: 'the_pit' },
        { characterId: 'adair', toLocationId: 'the_pit' },
      ],
    },
    {
      id: 'we_hearing_called',
      atWorldMinute: 3 * 1440 + 18 * 60,
      locationId: null,
      publicCopy: 'Your rank band buzzes: CLASSIFICATION HEARING, FRIDAY 10:00, REGISTRY ANNEX. ATTENDANCE REQUIRED.',
      directorNotes:
        'The formal notice. If the player has not sat the interview yet, this is the last clear chance, and Marsh will see them tonight if they ask.',
      setsFlags: ['hearing_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_hearing',
      atWorldMinute: 4 * 1440 + 10 * 60,
      locationId: 'registry_annex',
      publicCopy:
        'Friday, ten o’clock. Three chairs in the Registry Annex, one form on the desk, and Marsh uncapping her pen.',
      directorNotes:
        'The hearing. Adair is in the corridor whether or not she was asked. Marsh reads the whole week aloud. Play it as a real procedure with a real outcome rather than a boss fight.',
      setsFlags: ['hearing_day'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'marsh', toLocationId: 'registry_annex' },
        { characterId: 'adair', toLocationId: 'registry_annex' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_open_or_restricted',
      kind: 'FINALE',
      label: 'Open or restricted, by Friday at ten',
      seedHint: '“Pending”, in pencil, underlined twice, on the front of your transfer file.',
      payoffHint: 'The hearing in the Registry Annex, and who stands up in it.',
      weight: 1,
    },
    {
      id: 'p_one_handshake',
      kind: 'RIVAL',
      label: 'What Rook wants from one handshake',
      seedHint: 'A black chess piece left on your pillow, and Teo very carefully not looking at it.',
      payoffHint: 'Thursday at four in the Pit, and whose hand you take before the bell.',
      weight: 0.9,
    },
    {
      id: 'p_the_weight',
      kind: 'RELATIONSHIP',
      label: 'What the top-ranked student is carrying',
      seedHint: 'Four-kilo weights on both wrists that she never takes off, even to eat.',
      payoffHint: 'The roof at midnight, and the only person alive who can take half of it for sixty seconds.',
      weight: 0.9,
    },
    {
      id: 'p_the_last_echo',
      kind: 'MYSTERY',
      label: 'The only other Echo',
      seedHint: 'A professor who checks her watch every sixty seconds without knowing she does it.',
      payoffHint: 'A sealed file, a pier, eleven minutes, and the power Adair has not had since.',
      weight: 0.75,
    },
    {
      id: 'p_the_hold',
      kind: 'THEME',
      label: 'Sixty seconds is a habit, not a limit',
      seedHint: 'The count under your ribs always stops at zero, as if something were letting go on your behalf.',
      payoffHint: 'The hold, and what it costs the person whose power it is.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_stunt',
      name: 'Stunt Double',
      role: 'Speed and agility',
      summary:
        'You spent two years doing film stunts on borrowed powers, so you move fast, land well and are good at getting a hand on people.',
      playstyle: ['Fast', 'Showy', 'Reckless'],
      blurb: 'Every stunt coordinator in Velling has your number, and not one of them has ever seen you fall the same way twice.',
      attributeBonus: { agility: 3, presence: 1 },
      skillProficiencies: { footwork: 3, wielding: 2 },
      startingItems: [{ itemId: 'studio_lanyard', qty: 1 }],
      startingAbilities: ['echo_touch', 'get_a_hand_on'],
      startingReputation: [{ factionId: 'faction_board', amount: 10 }],
    },
    {
      id: 'arch_street',
      name: 'Street Fighter',
      role: 'Hand-to-hand fighting',
      summary:
        'You fought in harbour-front clubs where nobody knew what you could do, so you are hard to knock down even with no power at all.',
      playstyle: ['Aggressive', 'Close range', 'Tough'],
      blurb: 'Six clubs banned you for something they could not prove. You still have the tape.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { brawling: 3, composure: 1 },
      startingItems: [{ itemId: 'hand_tape', qty: 1 }],
      startingAbilities: ['echo_touch', 'fight_bare'],
      startingReputation: [{ factionId: 'faction_back_row', amount: 15 }],
    },
    {
      id: 'arch_clinic',
      name: 'Clinic Orderly',
      role: 'Support and reading powers',
      summary:
        'You worked nights at a clinic for people whose powers were hurting them, so you read a power fast and can talk almost anyone down.',
      playstyle: ['Careful', 'Observant', 'Calming'],
      blurb: 'You were the only orderly who could tell a patient exactly what their power felt like from the inside, and you never explained how.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { reading: 3, front: 2 },
      startingItems: [{ itemId: 'clinic_badge', qty: 1 }],
      startingAbilities: ['echo_touch', 'read_a_power'],
      startingReputation: [{ factionId: 'faction_larkspur', amount: 10 }],
    },
    {
      id: 'arch_gloves',
      name: 'Never Used It',
      role: 'Self-control and discipline',
      summary:
        'You hid your power your whole life and wore gloves every day, so you have iron self-control and nobody, including you, knows your limits.',
      playstyle: ['Controlled', 'Wary', 'Unknown limits'],
      blurb: 'Eleven pairs of thin black gloves, six years, and this morning you took the right one off because it seemed rude not to.',
      attributeBonus: { resolve: 3, arcana: 1 },
      skillProficiencies: { composure: 3, holding: 2 },
      startingItems: [{ itemId: 'thin_gloves', qty: 1 }],
      startingAbilities: ['echo_touch', 'hold_your_nerve'],
      startingReputation: [{ factionId: 'faction_registry', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'Your name, as it goes up on the Board', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Ren Ashby' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'Before Larkspur, where did you learn to use it?',
      helpText:
        'Your power is the same whichever you pick: touch someone who has a power and you hold a copy of it for sixty seconds. This sets what you were doing with it before you transferred, which sets what you are good at when you are holding nothing. It stays for the whole story. It does not decide whether you climb the Board, whose hand you take, or how Friday goes.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the hall not know about you yet?',
      helpText: 'One plain sentence about who you were before Larkspur. Most people write one line, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once won a fight I started, and I have never lost one somebody else started.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct when the whole hall looks up?',
      helpText: 'A starting temperament, not a promise. You can do the opposite in the first ten seconds and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'hand_it_back', label: 'Hand it back and apologise' },
        { id: 'enjoy_it', label: 'Enjoy every second of it' },
        { id: 'learn_it', label: 'Work out exactly what you are holding' },
        { id: 'make_a_point', label: 'Make sure the back row saw' },
        { id: 'find_the_door', label: 'Find the nearest door' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do two hundred people see floating above them?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A secondhand academy jacket, one glove on and one glove off, and a face trying very hard to look like this was the plan.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of these are plain losses and none of them needs the player to play
   * badly: "Restricted" is reachable by never sitting the interview, which is
   * the honest failure mode of somebody who hoped the problem would go away.
   * "Transfer Out" is walking away, available from about turn sixteen. The two
   * Unique endings sit behind the Wren thread and nothing else needs it.
   */
  endings: [
    {
      id: 'end_open_class',
      name: 'Class: Echo, Open',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['cleared', 'classified'], flagsUnset: ['restricted', 'attacked:marsh'] },
      condition:
        'The player sat the hearing and came out open. Nothing else needs to be resolved: the rank, Rook, Yuna and the Wren file can all still be open questions. Play the ordinary first morning of being allowed to stay, with the Board updating at seven and a slip already in the box with their name on it.',
      epilogue:
        'Marsh ticks the first box, signs it, and gives the player the carbon. The Board updates at seven the next morning and nobody remarks on it. At Larkspur, that counts as a welcome. Adair still checks her watch every time the player shakes anybody’s hand. She probably always will.',
      hint: '',
    },
    {
      id: 'end_quiet_copy',
      name: 'The Quiet Copy',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['stayed_low', 'classified'], flagsUnset: ['restricted', 'attacked:marsh'] },
      condition:
        'The player decided the number did not matter and stayed near the bottom of the Board on purpose, where nobody studies anybody. This is a strategy, not a defeat: write the freedom of being underestimated, and the small, useful, unseen things a copy can do when nobody is watching.',
      epilogue:
        'Twelve hundredth becomes eleven hundred and something and stays there. Teo runs a book on when the player will finally climb and loses money on it every week. Three people on the hill know exactly what the transfer in 4C can do, and every one of them has decided to keep it to themselves.',
      hint: '',
    },
    {
      id: 'end_expelled',
      name: 'Expelled',
      rarity: 'COMMON',
      minTurn: 12,
      requires: { flagsSet: ['attacked:marsh'] },
      condition:
        'The player hit the Registrar, the one person on the hill whose job is to decide whether they are safe. Write the consequence plainly, without lecturing and without making it heroic: the faculty meet without them, the vote is not close, and Adair does not argue either way.',
      epilogue:
        'The rank band is collected at the gate by a referee who will not meet the player’s eye. The funicular down to Velling takes six minutes. The Board updates at seven the next morning and there are eleven hundred and ninety-nine names on it.',
      hint: '',
    },
    {
      id: 'end_top_ten',
      name: 'Top Ten',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['top_ten'],
        flagsUnset: ['attacked:marsh', 'restricted'],
        minFactionReputation: [{ factionId: 'faction_board', value: 50 }],
      },
      condition:
        'The player got from twelve hundredth to the front row in a week, on borrowed powers or bare hands. Name who they beat and how. The top ten are not friends, but they are a set, and the player is in it now whether the others like it or not.',
      epilogue:
        'The front row of the Great Hall has ten chairs and the player’s name is on one of them. The harbour rescue service sends a letter, and so do four others. Every student ranked below them now offers a handshake with their sleeve pulled down over their fingers, and the player has learned to find that funny.',
      hint: 'Anyone may challenge anyone.',
    },
    {
      id: 'end_rooks_second',
      name: 'Rook’s Second',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['sabotaged_yuna', 'rook_is_number_one'] },
      condition:
        'The player shook Yuna’s hand before the bell, and Rook took the top of the Board. Do not redeem it and do not punish it. The player has power, protection and a black rook, and Yuna knows exactly whose hand it was.',
      epilogue:
        'Rook keeps every term of the deal, to the letter, the way he said he would. The player sits at the back of every room now, one chair from the end. Yuna is ranked fourth and climbing, and she has never once since offered anybody her hand.',
      hint: '',
    },
    {
      id: 'end_restricted',
      name: 'Restricted',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['restricted'] },
      condition:
        'Marsh ticked the second box. Whether the player held past sixty or simply never answered the questions, the Registry car at the harbour was real. Play it with dignity: Marsh is sorry, Adair is in the corridor, and nobody pretends this is anything other than what it is.',
      epilogue:
        'The car is grey and has its own driver and the ferry waits for it. Marsh sits in the back with the player and does not open the file. Somewhere along the coast road she says, to nobody in particular, that there is somebody at the facility who will want to meet them.',
      hint: '',
    },
    {
      id: 'end_transfer_out',
      name: 'Transfer Out',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['classified'] },
      condition:
        'The player walked away from Larkspur before anybody could classify them. This is a coherent response to being turned into a weapon on your first morning; do not treat it as cowardice and do not make it a triumph.',
      epilogue:
        'The rank band stays on the bed in Room 4C. Teo pays out on a bet nobody else thought to place. The file in the Registry Annex stays marked pending, which Marsh finds she does not mind as much as she should.',
      hint: '',
    },
    {
      id: 'end_number_one',
      name: 'Number One',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['fought_yuna', 'title_match_settled'],
        flagsUnset: ['sabotaged_yuna', 'restricted', 'attacked:marsh'],
        minFactionReputation: [{ factionId: 'faction_board', value: 75 }],
      },
      condition:
        'The player challenged Yuna in the Pit, cleanly, and the top of the Board is theirs. It has to have been fair or this ending is wrong: no handshake before the bell, no secret sold. Write the fight from both sides, and let Yuna be the first to say so.',
      epilogue:
        'For the first time in fourteen months the name at the top of the Board is not Yuna Takeda’s. She is second, and the next morning she is waiting at the Pit with a challenge slip already signed. The player has never had a better reason to get up early.',
      hint: 'She has not lost in fourteen months.',
    },
    {
      id: 'end_two_hands',
      name: 'Two Hands on the Weight',
      rarity: 'RARE',
      minTurn: 36,
      requires: {
        flagsSet: ['shared_the_weight', 'yuna_kept_it'],
        flagsUnset: ['sold_her_secret'],
        minRelationship: [
          { characterId: 'yuna', dimension: 'trust', value: 65 },
          { characterId: 'yuna', dimension: 'affection', value: 60 },
        ],
      },
      condition:
        'Yuna kept her title, and the player is the person she lets carry half of the weight for sixty seconds at a time. This is the romance ending and it should be quiet: a roof, a count, a kiss at most. What matters is that she asked.',
      epilogue:
        'Every night at eleven, on the gym roof, for sixty seconds, Yuna Takeda takes her weights off. Nobody else knows. She is still first on the Board, and she sleeps through the night for the first time in a year, and she has started, very occasionally, to laugh before she has checked whether it is allowed.',
      hint: 'She wears the weights to bed.',
    },
    {
      id: 'end_sixty_seconds',
      name: 'Sixty Seconds',
      rarity: 'RARE',
      minTurn: 36,
      requires: { flagsSet: ['swore_it_off', 'cleared'], flagsUnset: ['held_past_sixty'] },
      condition:
        'The player learned they could hold past sixty, chose not to, said so in front of Adair, and was cleared. Write the cost of that choice as well as the dignity of it: they gave up being the most powerful person on the hill, on purpose.',
      epilogue:
        'Adair stops checking her watch when the player is in the room. It takes her most of a term to notice she has stopped. The count under the player’s ribs still always ends at zero, and now it is because they let it.',
      hint: '',
    },
    {
      id: 'end_eleven_minutes',
      name: 'Eleven Minutes',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['held_past_sixty', 'knows:wren'] },
      condition:
        'The player held a copy past sixty knowing exactly what it cost Wren and Adair. Why they did it is everything: to save somebody, to win, or just to find out. Write the person whose power it was, and what they have left, before writing anything about the player.',
      epilogue:
        'Whoever’s power it was wakes the next morning and reaches for it and finds it quieter than it was. Adair hears about it before breakfast and goes to the pier instead of the lab. The player has more in their chest than anybody should, and for the first time understands why the last Echo asked about her every year.',
      hint: 'There has been one other.',
    },
    {
      id: 'end_visiting_hours',
      name: 'Visiting Hours',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['knows:wren', 'adair_stood_up'],
        flagsUnset: ['restricted'],
        minRelationship: [
          { characterId: 'adair', dimension: 'trust', value: 60 },
          { characterId: 'marsh', dimension: 'trust', value: 50 },
        ],
      },
      condition:
        'The player knows Wren is alive, Adair stood up for them at the hearing, and Marsh trusts them enough to offer the drive. This ending is the three of them going to see the only other Echo. Do not resolve whether Adair forgives him. Let her walk into the room.',
      epilogue:
        'The facility is four hours down the coast and looks like a campus with nobody on it. Arlo Wren is fifty, grey, and still smiles at whoever is looking at him. He shakes the player’s hand with his sleeve pulled down, out of habit. Then he looks past them at Adair, and nobody says anything for a long time.',
      hint: '',
    },
  ],
  opening:
    "Your feet leave the floor.\n\nThe student whose hand you just shook does not let go. First of twelve hundred: the hall told you that with its applause. Now she is staring at you like you picked her pocket.\n\n\"Give it back,\" Yuna says.\n\nChairs scrape behind you. A water jug lifts off the welcome table and turns slowly in the air. Two hundred faces tilt up to follow you.\n\nHer power sits under your ribs, heavy as wet sand, and something in there is counting down.\n\nForty seconds left.\n\nHer grip tightens. \"How are you doing that? Give it back. Now.\"",
  openingPanel: {
    assetKey: 'story_echo_class/opening',
    alt: 'Yuna, jaw-length black hair and steel wrist weights, gripping your hand as you float above a crowded academy hall, a water jug drifting in the air beside you.',
  },
  openingSuggestions: [
    '"I’m trying! I’ve never held anything this heavy. How do you switch it off?"',
    'I let go of her hand and try to sink back down to the floor.',
    'I tighten my grip and pull us both up toward the ceiling.',
  ],
  coverDirection: [
    'SUBJECT: Yuna Takeda, the top-ranked fighter of a superpower academy, alone and unmistakable in the foreground of a key visual for an action anime about a borrowed power.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture, leaning toward the viewer.',
    'Black hair cut bluntly at the jaw, grey eyes, a fitted dark navy field jacket zipped to the collar with no crest or emblem on it, and a heavy brushed-steel weight band locked round each wrist.',
    'Her bare right hand thrusts forward into the bottom of the frame, foreshortened toward the viewer, gripping the viewer’s bare hand, which reaches in from the lower edge: a handshake held far too long, knuckles tight, the steel band heavy on her wrist.',
    'The room has lost its weight around them: the ends of her hair and the tab of her zip drift upward, a glass water jug tips and pours out into floating beads of water, two folding chairs tumble slowly upward, and loose blank sheets of paper hang in the air.',
    'Faint concentric ripples bend the air in rings around the two joined hands, like a stone dropped into still water, catching the light.',
    'Her expression is composed and furious at once: grey eyes narrowed, jaw set, lips pressed together, looking straight at the viewer as if she wants something back.',
    'HER FACE STAYS CLEAN: no ripples, glow, distortion or shadows on her face or skin.',
    'Every ripple effect stays in the air around the joined hands, on the drifting objects and on the title, never on her face.',
    'BEHIND HER, soft and secondary: a vast stone assembly hall with tall arched windows, rows of seats with a crowd in dark jackets all looking up,',
    'and a huge ranking board on the back wall glowing with rows of blank light bars, nothing on it that reads as numbers or writing.',
    'LIGHT: cool blue and steel from the tall windows, one warm stage spotlight from above catching her hair, the steel bands and the floating water.',
    'TITLE: the title Echo Class painted into the art in the upper third, above her head, as the words ECHO CLASS in a bold heavy condensed sans-serif logo, steel white with a cold blue edge,',
    'spelled exactly ECHO CLASS, two words, large and legible at thumbnail size. One thin ring of the same ripple passes through the word ECHO only, leaving every letter readable. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const ECHO_CLASS = StoryVersion.parse(raw);
