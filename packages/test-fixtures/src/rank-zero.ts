import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Rank Zero" — the power test reads zero in front of the whole intake, and
 * then the scanner catches fire.
 *
 * Slate #1 of the fifty (`docs/stories-50/PLAN.md`), built on the shape of
 * Good Morning, Husband: one scene that starts mid-moment, a cast who each
 * want a specific thing this week, three invisible variables, and an optional
 * mystery that never leaks into a run that did not ask for it.
 *
 * The bet is the hero-academy shelf's most famous moment — the public rating,
 * the number, the laugh — played on turn one and then broken. The player knows
 * almost nothing about their own power. The world knows a little more, spread
 * across a medic who saw a dial, a technician who saw a hole, an instructor
 * who has seen this once before, and a ferry engineer who *was* the once
 * before. None of them is owed to the player and all of them are findable.
 *
 * The playable span is the six days between intake morning and Trial Day.
 * Trial Day is the finale anybody can reach; the first fire is the lead only
 * a curious player opens. Every ending except two is reachable without it.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest`
 * refills those and a body that slept is the honest thing for that to mean.
 * Scrutiny is the first GOOD_LOW on purpose: PUBLIC_VIOLENCE raises the first
 * one in array order, and a cadet brawling in the atrium should be watched
 * harder. Build-up is the power's own price: what it has taken in and not yet
 * given back.
 *
 * Everybody here is an adult. Lodestar is a four-year licensing college that
 * takes cadets at eighteen or older; the player is nineteen.
 */

const raw = {
  id: 'sv_rank_zero_1',
  storyId: 'story_rank_zero',
  version: 1,
  title: 'Rank Zero',
  fantasyLabel: 'It read zero. Then it caught fire.',
  hook: 'On intake day at a college for licensed heroes, the machine that rates every cadet’s power reads you as zero, then bursts into flame in front of two hundred and forty people.',
  premise:
    'Lodestar Academy is a four-year college that trains and licenses heroes, on an island in a cold bay. It takes two hundred and forty cadets a year, all of them adults, all of them with a power.\n\n' +
    'On the first morning every cadet puts a hand on the Gauge, a glass column that reads what a power pushes out and turns it into a number. The number decides your track, your dorm, which agency scouts come to watch, and where your name sits on the Board in the atrium.\n\n' +
    'Yours read zero. Then the column caught fire in front of the whole intake, and your hand was unmarked.\n\n' +
    'Now everybody wants an answer. The instructor who walked into the smoke. The cadet at the top of the Board, who laughed first and keeps watching the technicians. The Director, who has a statement ready for you to sign. The Bureau that owns the machine.\n\n' +
    'You have six days until Trial Day, when any cadet can stand up in the arena and challenge their number in public. You can take the support track and a quiet life, or find out what you are before somebody else decides it for you.\n\n' +
    'Somebody on this island has seen a fire like this before, and has kept it secret for nineteen years.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Superpowers', 'Academy', 'Rivalry', 'Action', 'Mystery'],
  mechanicsChips: [
    'A power no machine can read',
    'Six days to Trial Day',
    'Rivals with secrets',
    'Lying is a real option',
    'Name anyone on Trial Day',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend the week training for Trial Day, dig into who burned the last scanner, or sign the Director’s statement and enjoy the support track. Instructor Valk will notice whichever you pick. So will Riku.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'intake_hall',
    startWorldMinute: 10 * 60 + 20,
    startingItems: [{ itemId: 'cadet_band', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult and is written as one. The player is nineteen. Ines Valk is forty-one, Riku Amano twenty, Sana Tsuda nineteen, Calla Reyes twenty-one, Okon Hale fifty-eight, Noor Halvorsen thirty-four and Ada Kole thirty-eight. Every other cadet on the island is at least eighteen.',
      'Romance, if the player wants it, is flirtatious, tense and heartfelt and goes no further than a kiss: never fan service, never lingering on bodies. Staff and the ferry engineer turn a cadet’s flirting aside in one sentence.',
      'Lodestar Academy is a four-year hero licensing college on Gull Island, in the bay off the city of Calder Bay. Every cadet is at least eighteen. The player is a nineteen-year-old first-year in an intake of 240.',
      'On intake morning every cadet is rated on the Gauge, a glass column owned by the Ratings Bureau that reads what a power pushes out as a number from 0 to 10,000. The number sets the track (Field 1–60, Support 61–180, Reserve 181–240) and the order on the Board in the atrium. A zero places a cadet on the Support track pending review.',
      'Every cadet wears a black band that shows their rank and rating and updates whenever the Board does. The player’s reads 240 · 0.',
      'The Gauge rated the player 0 and then caught fire in front of the whole intake. Nobody was hurt and the player’s hand was unmarked.',
      'The player has a real power. It pushes nothing out on its own; when force is put into the player, the power takes it in and gives it back later, often all at once and not always where they aim. It is never “nothing”, and it is only that: it does not let the player fly, float, throw energy, read minds, heal, or do anything with force it has not first taken in. When the player tries a power they do not have, the attempt plainly fails on the page (they jump and come straight back down, nothing leaves the hand), and at most the floor runs warm where they land. How far taking in and giving back can go is for play to discover. Nobody on the island knows this on intake morning, the player included; it comes out only through what happens in play.',
      'What the power has taken in and not yet given back stays in the player and bleeds off slowly over hours. While it is held, things near them run warm: a phone heats in a pocket, a mug cracks, glass ticks as they pass, lights flicker when they are upset. The more it holds, the less it waits; full, the next solid thing that touches the player gets all of it back at once. Holding it in on purpose keeps the player looking exactly like their number, but it does not go away. It waits.',
      'On intake morning the player cannot aim it. Letting it out on purpose, in one direction, is learned in play: in drills, from somebody who has done it, or by getting it wrong. Until then it comes back on its own, a second late and not always where they meant.',
      'The louder the week gets, the harder the people who run the island watch the player: a public fight, a lie that gets caught, another machine that burns. The harder they watch, the nearer the Bureau comes to ordering the player reclassified and taken to its assessment floor in the capital, an order that needs no wrongdoing to go through.',
      'Nineteen years ago the previous Gauge read zero for a cadet named Ada Kole and burned. The Bureau took her to its assessment floor for eighteen months; the record says she withdrew. Ines Valk and Okon Hale were both there. This is discoverable and never owed.',
      'Riku Amano’s number was adjusted upward by an arrangement between his sponsoring agency and a Bureau technician. The automatic audit of the burned Gauge will find it. Only Riku, his sponsor and that technician know; Halvorsen has found the offset and told nobody. The player learns it only by finding it out.',
      'Trial Day is on the seventh morning of term. Any cadet may challenge their number in a public bout in the Bowl, naming any sparring partner from the Board, before a panel of Valk, Hale and Halvorsen.',
      'Nobody on the island wants the player dead. The danger is being reclassified, taken to the Bureau’s assessment floor, expelled, or quietly kept at zero.',
    ],
    toneGuide:
      'Anime superhero energy: fast, loud, funny and competitive. Powers are physical and legible, so say what they do in the room — the weight, the heat, the ball that stops in the air. ' +
      'Fights are sparring, drills and the odd brawl. Injuries are bruises, scrapes and burns a medic fixes in a scene. Nobody dies and nothing is graphic. ' +
      'The institution is not evil: Hale believes the numbers keep people safe and the Bureau is careful rather than cruel, and both can be argued with. Comedy lives in the mess, the Reserve corridor and Calla. ' +
      'The power stays mysterious in a concrete way: things get warm, glass ticks, a punch lands and comes back a second later. The first time something hits the player, let a little come back on its own (a mug cracks, the mat warms, a punch returns a second late) so the player sees the power before anyone explains it. The face at the top of a beat is Valk’s or Riku’s whenever one of them is in the scene and the moment involves them.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Valk throws the medicine ball at your chest without warning.\n\nYou catch it. It weighs about as much as a fridge.\n\nYour knees hit the mat.\n\n\"Don’t hold it,\" she says. \"You’re holding it. Stop.\"\n\n\"It’s heavy—\"\n\n\"It’s four kilos. I made it heavy. You’re arguing with it.\"\n\nThe mat under your knees is getting warm.\n\nValk sees it. She doesn’t step back.\n\n\"There,\" she says quietly. \"Now give it back.\"",
      "The mess goes quiet when Riku sits down across from you.\n\n\"Zero.\" He steals a chip off your tray. \"Bad news. I’m naming you on Trial Day.\"\n\n\"Why?\"\n\n\"Because two hundred people want to see it burn again, and I’m a giver.\"\n\nCalla, beside you, does his voice back at him, perfectly. \"I’m a giver.\"\n\nThe whole table laughs. Riku laughs too, a beat late.\n\nUnder the table his knee is going like a drum.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 11, mind: 11, presence: 11, resolve: 12, arcana: 10 },
  skills: [
    { id: 'brawling', name: 'Brawling', attribute: 'might', description: 'Close fighting with what you have got: hands, shoulders, the floor.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Being somewhere else when it lands, and being there again two hundred times in a drill.' },
    { id: 'notice', name: 'Noticing', attribute: 'mind', description: 'What changed in a room, what a file left out, and what somebody is watching instead of you.' },
    { id: 'machines', name: 'Machines', attribute: 'mind', description: 'What is actually wrong with it, as opposed to what its screen says.' },
    { id: 'first_aid', name: 'First Aid', attribute: 'mind', description: 'Burns, sprains and cuts, dealt with properly on the floor of a sparring ring.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Standing still while something comes at you, and telling the truth to a room that wants a different answer.' },
    { id: 'front', name: 'Front', attribute: 'presence', description: 'Talking your way past a question, a rumour or a Director.' },
    { id: 'instinct', name: 'Instinct', attribute: 'arcana', description: 'The feel of what your power is doing under your skin before anybody can see it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the one thing rest restores. Scrutiny comes first among the
   * descending pair so that a public fight raises it. Build-up is what the
   * power has taken in and not given back: taking hits and holding it in both
   * raise it, and it bleeds off on its own, slowly.
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
        'The body stops cooperating. Drills fall apart on the fourth rep, every answer comes out a beat late, and Valk sends the player to bed in a voice that does not allow argument.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Legs shake on stairs, the player misses obvious things in conversation and agrees to things just to end them. A sparring bout here is lost on the first exchange, and sleep is honestly the best move on the board.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a hard academy day. Fine for one more drill or one more difficult conversation, not both. Sana notices it before the player does and says so.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh. The player can train hard, talk fast, notice the thing under what somebody says, and still have something left for the evening. Scenes can be long and physical and go somewhere.',
        },
      ],
    },
    {
      id: 'scrutiny',
      name: 'Scrutiny',
      max: 100,
      start: 30,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody with authority is looking at the player any more than at any other cadet. They are a name on the Board, and the Bureau has stopped asking about them.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'An ordinary cadet as far as the people upstairs are concerned. Staff answer questions without checking who is asking, doors open, and the Rating Office will let the player in for a chat.',
        },
        {
          upTo: 50,
          behaviour:
            'There is a file with the player’s name on it and it is getting thicker. Staff are polite and remember everything. Hale knows where the player had lunch. Calla is asked how they seem.',
        },
        {
          upTo: 80,
          behaviour:
            'People with lanyards turn up where the player is. Requests become instructions. The Rating Office is locked when they arrive, a Bureau officer sits at the back of Valk’s class, and agency scouts stop asking about the player out loud.',
        },
        {
          upTo: 100,
          behaviour:
            'A reclassification order is being drafted in the capital. The player is escorted between buildings, the ferry crew are told not to carry them, and Hale has stopped smiling in the corridors when he sees them.',
        },
      ],
    },
    {
      id: 'buildup',
      name: 'Build-up',
      max: 100,
      start: 24,
      regenPerHour: -1,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nothing held, nothing waiting. The player feels ordinary and light, and anything pushed at them now will be taken in cleanly with room to spare.',
      color: '#D1495B',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Quiet. The player can touch machines, shake hands and take a light hit without anything strange happening. This is the band where they could pass for exactly what the Board says they are.',
        },
        {
          upTo: 50,
          behaviour:
            'Warm. Phones run hot in the player’s pocket, a mug gets uncomfortable to hold, and the player can feel something sitting under the breastbone waiting for a reason. Sana notices their temperature.',
        },
        {
          upTo: 80,
          behaviour:
            'Leaking. Lights flicker when the player is upset, glass ticks as they pass it, and the next solid hit they take will come back out of them a second later whether they mean it to or not. Halvorsen can see it from across a room.',
        },
        {
          upTo: 100,
          behaviour:
            'Full. Anything that touches the player now gets everything back at once: a handshake knocks somebody across a room, a door comes off, a scanner burns. The player can feel it and cannot hold it much longer, and anybody who knows what this looks like starts clearing the space.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'cadet_band',
      name: 'The Cadet Band',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A black wristband issued on intake morning. It shows your rank and rating and updates whenever the Board does. Yours reads 240 · 0.',
      loreText: 'It also buzzes when the Director wants you, and opens the doors your track is allowed through. The Reserve corridor, the mess, the Bowl. Not the Rating Office.',
      icon: 'band',
    },
    {
      id: 'rating_slip',
      name: 'The Rating Slip',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { notice: 1 },
      description: 'The Gauge’s printout from your session, browned and curling at one end. A line drops to zero, then keeps going under the bottom edge of the paper, then comes back as a spike that runs straight off the top.',
      loreText: 'Every other cadet’s slip is a line that climbs and levels off. Nobody has ever printed one that goes below the paper.',
      icon: 'papers',
    },
    {
      id: 'stop_pin',
      name: 'The Broken Stop Pin',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A brass pin the length of a fingernail, sheared clean through. It held the backup dial’s needle from going below zero.',
      loreText: 'Sana Tsuda pocketed it while the hall was emptying. She keeps it in the pocket of her medic jacket and has not told anybody why.',
      icon: 'pin',
    },
    {
      id: 'gauge_log',
      name: 'The Session Log',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { machines: 1 },
      description: 'Halvorsen’s printout of intake morning, every cadet’s session line by line. One of them has a manual calibration offset typed in by hand, the only one on the sheet.',
      loreText: 'The session is number one on the Board. The offset is plus two thousand three hundred. The technician’s code beside it does not belong to Halvorsen.',
      icon: 'papers',
    },
    {
      id: 'kole_file',
      name: 'The Kole File',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A cardboard intake file from nineteen years ago, swollen with damp. Rating: 0. A transfer form to the Bureau’s assessment floor, countersigned by a deputy director. A last page stamped VOLUNTARY WITHDRAWAL in a different ink.',
      loreText: 'The deputy director’s signature is Okon Hale’s. The photograph clipped inside is of a broad-shouldered cadet with a band on her wrist, squinting at the camera like it owes her money.',
      icon: 'folder',
    },
    {
      id: 'hale_statement',
      name: 'The Statement',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'One page, already typed, with a line for your signature. It says your rating session ended in an equipment fault, that you have no measurable power, and that you accept Support placement pending review.',
      loreText: 'Hale says signing it makes the fire a fault, and faults are forgiven. He is not wrong about that, which is the problem with it.',
      icon: 'letter',
    },
    {
      id: 'cadet_handbook',
      name: 'The Cadet Handbook',
      tags: ['document'],
      skillModifiers: { notice: 1 },
      description: 'Three hundred pages of rules. Section fourteen: a reading of zero places a cadet on the Support track pending review. Section nine: Trial Day.',
      loreText: 'Section nine has a footnote nobody reads. Any cadet may name any sparring partner on the Board, including the first.',
      icon: 'book',
    },
    {
      id: 'grip_tape',
      name: 'Grip Tape',
      tags: ['gear'],
      skillModifiers: { brawling: 1 },
      description: 'A roll of white athletic tape for the knuckles and wrists, half used.',
      loreText: 'The Bowl goes through forty rolls a week. Valk counts them.',
      icon: 'tools',
    },
    {
      id: 'licence_pin',
      name: 'Your Mother’s Licence Pin',
      tags: ['personal'],
      skillModifiers: { front: 1 },
      description: 'A small enamel pin from a hero licence twenty years out of date. Staff recognise it before they recognise you.',
      loreText: 'Her photograph is on the atrium wall with the other licensed graduates. Her rating on the plaque under it is 6,880.',
      icon: 'pin',
    },
    {
      id: 'multitool',
      name: 'Workshop Multitool',
      tags: ['gear'],
      skillModifiers: { machines: 1 },
      description: 'A heavy folding multitool with a shop name worn off the handle, and a screwdriver bit that fits every panel on the island.',
      loreText: 'Every machine you have opened with it ran better afterwards, then hotter, then stopped.',
      icon: 'tools',
    },
    {
      id: 'ferry_token',
      name: 'Ferry Token',
      tags: ['travel'],
      stackable: true,
      maxStack: 10,
      description: 'A brass token for one crossing between the island and the harbour.',
      loreText: 'Cadets get four a week. The engineer never takes hers off anybody; she waves them through.',
      icon: 'coin',
    },
    {
      id: 'mess_coffee',
      name: 'Mess Coffee',
      tags: ['consumable'],
      consumable: { resourceId: 'stamina', amount: 15, consumesItem: true },
      description: 'Black, scalding and terrible, in a paper cup.',
      loreText: 'The urn has not been switched off since the last intake.',
      icon: 'mug',
    },
  ],
  abilities: [
    {
      id: 'answer_straight',
      name: 'Answer Straight',
      tags: ['social'],
      description: 'Tell somebody the true thing, including “I don’t know”, and take whatever comes back.',
      affordances: ['tell the truth', 'i don’t know', 'be honest', 'admit it', 'answer her', 'explain', 'come clean', 'tell him straight'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_around_it',
      name: 'Talk Around It',
      tags: ['social'],
      description: 'Lie, bluff or change the subject with a straight face, and hope nobody in the room checks.',
      affordances: ['lie', 'bluff', 'make something up', 'pretend', 'say i meant to', 'deflect', 'cover it up', 'sign it'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'scrutiny', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'front', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out who is watching whom, what somebody is not saying, and what changed since you last looked.',
      affordances: ['look around', 'watch them', 'read him', 'read her', 'notice', 'study the room', 'who is watching'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_hit',
      name: 'Take the Hit',
      tags: ['defensive'],
      description: 'Stand still and let it land: a punch, a power, a scanner’s pulse. Your power takes it in. What it does with it afterwards is not entirely up to you.',
      affordances: ['take the hit', 'let it hit me', 'stand still', 'brace', 'don’t dodge', 'absorb it', 'put my hand on it', 'my palm back on', 'run it again'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'buildup', amount: 14 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hit_back',
      name: 'Hit Back',
      tags: ['offensive'],
      description: 'Throw a punch, a shoulder or a tackle at somebody who is in reach. In public this is a very loud thing to do.',
      affordances: ['punch', 'hit him', 'hit her', 'attack', 'fight', 'swing', 'tackle', 'throw a punch'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'scrutiny', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawling', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_clear',
      name: 'Get Clear',
      tags: ['movement'],
      description: 'Dodge, duck, roll or leave, and be somewhere else when it lands.',
      affordances: ['dodge', 'duck', 'get out of the way', 'back off', 'roll', 'run for it', 'escape', 'sidestep'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_it_in',
      name: 'Hold It In',
      tags: ['utility'],
      description: 'Keep whatever your power has taken in from coming back out, so you look exactly like the number on the Board. It does not go away. It waits.',
      affordances: ['hold it in', 'suppress it', 'keep it down', 'stay calm', 'don’t let it out', 'hide it', 'act normal'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'buildup', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'instinct', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'drill',
      name: 'Drill',
      tags: ['utility'],
      description: 'The same movement two hundred times until your body does it without asking you first.',
      affordances: ['train', 'drill', 'practise', 'practice', 'work out', 'spar', 'run the drill', 'again'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_it_up',
      name: 'Open It Up',
      tags: ['utility'],
      description: 'Get a panel off a machine and find out what actually happened inside it, not what the screen claims.',
      affordances: ['open the panel', 'look at the scanner', 'take it apart', 'check the machine', 'examine the gauge', 'fix it', 'look inside'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'machines', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pull_the_file',
      name: 'Pull the File',
      tags: ['sight'],
      description: 'Get into a record you were not meant to see, read the part that matters, and get out before anybody asks why.',
      affordances: ['search the records', 'read the file', 'look it up', 'dig into it', 'find the old file', 'read the logs', 'break into the archive'],
      costs: [
        { resourceId: 'stamina', amount: 7 },
        { resourceId: 'scrutiny', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'patch_up',
      name: 'Patch Up',
      tags: ['healing'],
      description: 'Deal with a burn, a split lip or a turned ankle properly, on the floor where it happened.',
      affordances: ['patch him up', 'patch her up', 'bandage', 'first aid', 'treat the burn', 'check if they are hurt', 'help them up'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'first_aid', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_close',
      name: 'Stay',
      tags: ['social'],
      description: 'Do not fix it, do not explain it and do not leave. Sit down next to them and be there.',
      affordances: ['stay', 'sit with him', 'sit with her', 'say nothing', 'wait with them', 'keep them company', 'just be there'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'let_it_out',
      name: 'Let It Out',
      tags: ['offensive'],
      description: 'Give back everything your power has taken in, on purpose, in one direction. It is the loudest thing you can do and everybody on the island will hear about it.',
      affordances: ['let it out', 'let go', 'release it', 'give it back', 'unleash it', 'full power', 'send it back'],
      costs: [
        { resourceId: 'stamina', amount: 14 },
        { resourceId: 'scrutiny', amount: 10 },
      ],
      cooldownMinutes: 60,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'instinct', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:how_it_answers'],
        lockedCopy: 'You can feel it sitting under your breastbone, warm and waiting. You do not know how to aim it yet, and the last time it came out on its own a machine burned.',
      },
    },
  ],
  locations: [
    {
      id: 'intake_hall',
      name: 'The Intake Hall',
      shortName: 'Intake Hall',
      description:
        'A high white hall with a viewing gallery, two hundred and forty cadets in lines, and the Gauge at the far end: a glass column taller than a person with a brass hand plate, now black to the ceiling and dripping extinguisher foam. A medic station stands beside it. Behind the column, a small backup dial with a cracked face.',
      artDirection:
        'Huge bright academy assessment hall, rows of cadets in dark training jackets, a tall glass scanner column scorched black and smoking, a big screen above it reading 0, foam on the floor, a viewing gallery above. Cinematic, crowded, dramatic.',
      connections: [
        { to: 'atrium', travelMinutes: 2, label: 'Out through the double doors to the atrium' },
        { to: 'medical_wing', travelMinutes: 3, label: 'The corridor to the Medical Wing' },
        { to: 'rating_office', travelMinutes: 2, label: 'The service stairs behind the column' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'rating_slip', qty: 1, ownerId: null, aka: ['printout', 'the printout', 'the slip', 'the paper', 'the trace', 'the smoking printout'] },
      ],
    },
    {
      id: 'atrium',
      name: 'The Atrium',
      shortName: 'Atrium',
      description:
        'A glass-roofed atrium at the centre of the academy, and the Board: a wall of two hundred and forty names in order, updating live. Riku Amano at the top in white. Your name at the bottom with a single 0. Photographs of licensed graduates line the opposite wall.',
      artDirection:
        'Grand glass-roofed academy atrium, an enormous digital ranking wall of names and numbers, cadets crowding under it pointing and filming, a wall of framed graduate photographs opposite. Bright, busy, public.',
      connections: [
        { to: 'intake_hall', travelMinutes: 2, label: 'Back into the Intake Hall' },
        { to: 'medical_wing', travelMinutes: 3, label: 'The Medical Wing' },
        { to: 'the_dorms', travelMinutes: 4, label: 'Across the quad to the dorms' },
        { to: 'mess_hall', travelMinutes: 2, label: 'The mess' },
        { to: 'the_bowl', travelMinutes: 5, label: 'Down the steps to the Bowl' },
        { to: 'director_tower', travelMinutes: 4, label: 'The lift to the Director’s office' },
        { to: 'the_seawall', travelMinutes: 6, label: 'Out the back to the seawall' },
        { to: 'ferry_pier', travelMinutes: 8, label: 'The path down to the ferry' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'medical_wing',
      name: 'The Medical Wing',
      shortName: 'Medical',
      description:
        'Eight treatment bays with green curtains, a smell of antiseptic and instant noodles, and a whiteboard of who is on shift. Sana Tsuda’s medic jacket hangs on the hook by bay three when she is working.',
      artDirection:
        'Clean modern academy infirmary, green curtained bays, a whiteboard rota, medical kits on steel trolleys, afternoon light through blinds. Calm and practical.',
      connections: [
        { to: 'atrium', travelMinutes: 3, label: 'Back to the atrium' },
        { to: 'intake_hall', travelMinutes: 3, label: 'The corridor to the Intake Hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'stop_pin', qty: 1, ownerId: 'sana', aka: ['pin', 'the pin', 'the stop pin', 'the brass pin'] },
      ],
    },
    {
      id: 'rating_office',
      name: 'The Rating Office',
      shortName: 'Rating Office',
      description:
        'A low concrete room under the Intake Hall, full of humming cabinets, cable trays and a bench rig that is a small copy of the Gauge. The burned column’s coils sit on a trolley under a lamp. A cot in the back corner. Cadets are not allowed down here.',
      artDirection:
        'Basement technical lab under an academy hall, server cabinets, cables across the ceiling, scorched copper coils on a trolley under a work lamp, a small glass scanner rig on a bench, a folding cot. Blue-lit, cluttered, technical.',
      connections: [
        { to: 'intake_hall', travelMinutes: 2, label: 'Up the service stairs' },
        { to: 'sealed_wing', travelMinutes: 4, lockedByFlag: 'knows:the_first_fire', label: 'The old service tunnel east' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'gauge_log', qty: 1, ownerId: 'halvorsen', aka: ['log', 'the log', 'the session log', 'the logs', 'printouts'] },
      ],
    },
    {
      id: 'sealed_wing',
      name: 'The Old Hall',
      shortName: 'Old Hall',
      description:
        'The sealed east wing: the academy’s first intake hall, closed nineteen years ago. Dust sheets, a scorch mark up one wall in the shape of a column, and a records cage nobody emptied.',
      artDirection:
        'Abandoned old academy hall, dust sheets over benches, a tall black scorch mark on a wall where a column once stood, a wire records cage of cardboard files, light through boarded windows. Quiet and sad.',
      connections: [{ to: 'rating_office', travelMinutes: 4, label: 'Back through the tunnel' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [
        { itemId: 'kole_file', qty: 1, ownerId: null, aka: ['file', 'the file', 'the old file', 'the record', 'her file'] },
      ],
    },
    {
      id: 'the_dorms',
      name: 'The Cadet Dorms',
      shortName: 'Dorms',
      description:
        'Three blocks around a courtyard. The Field floors at the top have sea views. The Reserve corridor is at the bottom by the bins, and your room is the last one on it, opposite Calla Reyes, whose door is always open.',
      artDirection:
        'Academy dormitory corridor at night, a row of doors with name cards, one door wide open with music and fairy lights, laundry bags, a window at the end with the sea. Lived-in and cheerful.',
      connections: [{ to: 'atrium', travelMinutes: 4, label: 'Back across the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'cadet_handbook', qty: 1, ownerId: null, aka: ['handbook', 'the handbook', 'the rules', 'the rulebook'] },
      ],
    },
    {
      id: 'mess_hall',
      name: 'The Mess',
      shortName: 'Mess',
      description:
        'Long tables in track order, Field by the windows and Reserve by the kitchen. A coffee urn that has not been switched off since the last intake. Everybody sees who sits with whom.',
      artDirection:
        'Busy academy cafeteria, long tables, cadets with trays, the high-ranked table by tall windows and the rest by the kitchen hatch, a big steel coffee urn. Loud, bright, social.',
      connections: [{ to: 'atrium', travelMinutes: 2, label: 'Back to the atrium' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'mess_coffee', qty: 4, ownerId: null, aka: ['coffee', 'a coffee', 'the coffee', 'cup of coffee'] },
      ],
    },
    {
      id: 'the_bowl',
      name: 'The Bowl',
      shortName: 'The Bowl',
      description:
        'A sunken sand arena with stone stands, four sparring rings chalked on the floor, racks of training staves and weighted balls. Valk’s flat is above the north stand. On Trial Day the agency scouts take the top row.',
      artDirection:
        'Open-air sunken sand arena at an academy, stone stands, chalked sparring circles, racks of staves and medicine balls, sea and sky beyond the rim. Bright, physical, epic.',
      connections: [{ to: 'atrium', travelMinutes: 5, label: 'Up the steps to the atrium' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'grip_tape', qty: 2, ownerId: null, aka: ['tape', 'grip tape', 'the tape', 'a roll of tape'] },
      ],
    },
    {
      id: 'director_tower',
      name: 'The Director’s Office',
      shortName: 'Director',
      description:
        'The top floor of the old lighthouse tower. A wide desk, a window full of sea, framed photographs of fourteen graduating classes, and a typed page on the desk with your name on it.',
      artDirection:
        'Round office at the top of a converted lighthouse, a large desk with one typed page on it, windows full of grey sea, framed class photographs, a man in a navy suit. Calm, warm, controlled.',
      connections: [{ to: 'atrium', travelMinutes: 4, label: 'The lift down' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'hale_statement', qty: 1, ownerId: 'hale', aka: ['statement', 'the statement', 'the form', 'the page'] },
      ],
    },
    {
      id: 'the_seawall',
      name: 'The Seawall',
      shortName: 'Seawall',
      description:
        'A long stone wall along the north shore, wide enough to sit on, with the lights of the harbour across the water. Cadets come here to be somewhere nobody is ranking them.',
      artDirection:
        'Stone seawall at night, harbour city lights across dark water, a lone lamp post, waves below, two figures sitting on the wall. Quiet, open, romantic.',
      connections: [
        { to: 'atrium', travelMinutes: 6, label: 'Back up to the academy' },
        { to: 'ferry_pier', travelMinutes: 5, label: 'Along the wall to the pier' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'ferry_pier',
      name: 'The Ferry Pier',
      shortName: 'Pier',
      description:
        'A wooden pier, a ticket hut, and the squat green ferry that crosses to the harbour every forty minutes. Its engineer works with the hatch open and rarely comes up the ladder.',
      artDirection:
        'Small island ferry pier, a squat green passenger ferry with an open engine hatch, a ticket hut, coiled ropes, gulls, the harbour city across the bay. Salty and working.',
      connections: [
        { to: 'atrium', travelMinutes: 8, label: 'The path up to the academy' },
        { to: 'the_seawall', travelMinutes: 5, label: 'Along the seawall' },
        { to: 'harbour_town', travelMinutes: 40, label: 'The ferry across the bay' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [
        { itemId: 'ferry_token', qty: 3, ownerId: null, aka: ['token', 'a token', 'ferry token', 'tokens'] },
      ],
    },
    {
      id: 'harbour_town',
      name: 'Calder Bay Harbour',
      shortName: 'Harbour',
      description:
        'The mainland waterfront: noodle counters, a hero-merch shop selling the top ten cadets’ faces on mugs, and the glass offices of the agencies that sponsor them. Off the island, nobody has to call you anything.',
      artDirection:
        'Busy harbour city waterfront at dusk, noodle stalls, neon signs, a shop window of hero merchandise, glass agency office buildings, ferries at the quay. Lively and urban.',
      connections: [{ to: 'ferry_pier', travelMinutes: 40, label: 'The ferry back to the island' }],
      discoveredByDefault: true,
      mapPosition: { x: -3, y: 3 },
    },
  ],
  /**
   * The Academy is first on purpose: PUBLIC_VIOLENCE drops the first faction in
   * array order, and a cadet brawling on the island is the academy's problem
   * before it is anybody else's.
   */
  factions: [
    {
      id: 'faction_academy',
      name: 'The Academy',
      description: 'Lodestar’s staff, the Director’s office and the rules that keep the funding coming. They would like this week to be a fault and not a story.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'On probation' },
        { atReputation: 30, label: 'Cadet in good standing' },
        { atReputation: 60, label: 'One of ours' },
      ],
      allies: ['faction_bureau'],
      enemies: [],
    },
    {
      id: 'faction_intake',
      name: 'The Intake',
      description: 'Your year: two hundred and forty first-years who all saw the fire and are deciding whether you are a joke, a threat or the most interesting thing on the island.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'The zero' },
        { atReputation: 25, label: 'The one who burned the Gauge' },
        { atReputation: 55, label: 'The one they follow' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_bureau',
      name: 'The Ratings Bureau',
      description: 'The national body that licenses heroes and owns the Gauge. Careful, slow and very interested in any number it cannot explain.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'An anomaly' },
        { atReputation: 30, label: 'A case under review' },
        { atReputation: 60, label: 'Cleared' },
      ],
      allies: ['faction_academy'],
      enemies: [],
    },
    {
      id: 'faction_agencies',
      name: 'The Agencies',
      description: 'The hero agencies whose scouts sit in the gallery and the top row of the Bowl, signing the high numbers to sponsorship contracts. They have never signed a zero.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Unscouted' },
        { atReputation: 30, label: 'On a list' },
        { atReputation: 60, label: 'Offered a contract' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'valk',
      name: 'Ines Valk',
      calledName: 'Valk',
      role: 'Combat instructor for the first years, ex-field hero, and the only person who walked into the smoke',
      cardBlurb:
        'She walked into the fire instead of away from it. Now she wants an explanation from you, and she does not look nearly surprised enough.',
      pronouns: 'she/her',
      publicTraits: ['Never repeats an order', 'Marks her favourites harder than anyone', 'Judges cadets by what they do, not their number'],
      hiddenDrives: [
        'She has waited nineteen years for that machine to burn again, and she has not decided whether she is glad',
        'She wants one cadet the Gauge could not read to finish here, in public, on the academy’s own sand',
      ],
      values: ['What you do when it hits you', 'Saying the true thing to a cadet’s face'],
      fears: ['Watching the Bureau take another one and saying nothing again', 'Being the reason somebody gets hurt on her sand'],
      socialStyle:
        'Short orders, then silence until you comply. Asks questions as commands. Physically close in a drill, entirely distant in a corridor.',
      boundaries: [
        'Will not be flirted with by a cadet, and shuts it down flatly without making a scene',
        'Will not lie to a cadet’s face. She will refuse to answer instead, and say that she is refusing',
      ],
      goals: ['Get a true answer for the fire before the Director turns it into paperwork', 'Have you ready for Trial Day whether or not you ask'],
      secrets: [
        {
          id: 'valk_the_first_fire',
          fact: 'She was a cadet in the hall nineteen years ago when the old Gauge read zero for Ada Kole and burned. She watched the Bureau take Ada and did nothing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells it on the seawall at night, without being asked, if the player told her the plain truth about the fire on day one.',
        },
        {
          id: 'valk_the_ferry',
          fact: 'She has ridden Ada Kole’s ferry every Sunday for eleven years and has never once gone down the engine-room ladder to speak to her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once the player knows Ada’s name and asks Valk straight why she has never gone to see her.',
        },
      ],
      speechStyle:
        'Clipped imperatives and one-word commands: "Cadet." "Again." "Hands." Talks about what you did, never about what you felt. Counts in reps and seconds. Never raises her voice, and never repeats herself.',
      topics: ['the fire', 'Trial Day', 'drills', 'the Bowl', 'the Gauge', 'her own rating', 'the Director'],
      voiceSamples: [
        'Cadet. Four thousand cadets on that machine. Not one fire. Explain this one.',
        'Again. Feet under your shoulders. You flinched left, so we fix left.',
        'I rated four hundred and ten. I don’t care what you rate. I care what happens when something hits you.',
        'Hands. Turn them over. Good. Now tell me why there isn’t a mark.',
      ],
      appearance:
        'An adult woman, tall and square-shouldered, close-cropped iron-grey hair, steady grey eyes, a long grey instructor’s coat worn open over a black training shirt with the sleeves shoved up, old pale training scars across both forearms, a steel whistle on a black cord.',
      visualHook: 'A long grey instructor’s coat she never buttons, and a whistle on a cord she never blows.',
      silhouette: 'Upright and still, coat hanging straight, one hand loose around a training staff.',
      artSeed: 'rz-valk-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'wry', 'worried', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_bowl', activity: 'in the staff flat over the north stand, lights off' },
        { startMinute: 330, endMinute: 480, locationId: 'the_bowl', activity: 'running the empty track alone, the same twelve laps' },
        { startMinute: 480, endMinute: 720, locationId: 'intake_hall', activity: 'running intake morning: lines, names, the scanner' },
        { startMinute: 720, endMinute: 1020, locationId: 'the_bowl', activity: 'teaching first-year sparring, by name, by fault' },
        { startMinute: 1020, endMinute: 1140, locationId: 'mess_hall', activity: 'eating standing up at the staff end' },
        { startMinute: 1140, endMinute: 1320, locationId: 'the_seawall', activity: 'walking the seawall to the pier and back' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_bowl', activity: 'in the staff flat with one lamp on, marking' },
      ],
      homeLocationId: 'the_bowl',
      knowledgeScope: ['the_gauge', 'trial_day', 'the_bowl', 'the_first_fire', 'ada_kole', 'lodestar_staff'],
      startingRelationship: { trust: 20, affection: 0, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'valk_tells_you_about_the_first',
          label: 'She tells you about the first fire',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['valk_heard_it_straight'] },
        },
        {
          id: 'valk_trains_you',
          label: 'She starts training you after hours',
          kind: 'ALLIANCE',
          requires: { respect: 40 },
        },
      ],
      attributes: { might: 15, agility: 13, mind: 13, presence: 14, resolve: 17, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 18, damage: 11, tags: ['instructor', 'weight'] },
    },
    {
      id: 'riku',
      name: 'Riku Amano',
      role: 'Number one on the Board, rated 9,412, sponsored by an agency since the day he turned eighteen',
      cardBlurb:
        'He laughed first and loudest at your zero, and he needs the fire to have been your fault, not the machine’s. When nobody is filming, he is a lot less sure of himself than you are.',
      pronouns: 'he/him',
      publicTraits: ['Grins before he speaks', 'Talks about everything as a ranking', 'Genuinely the best fighter in the intake'],
      hiddenDrives: [
        'He wants to know his real number and is terrified of it',
        'He would like one person on this island to like him who is not counting',
      ],
      values: ['Winning in front of people', 'Paying his mother back'],
      fears: ['Being ordinary in public', 'His mother’s noodle shop losing the sponsorship money'],
      socialStyle:
        'Performs for any crowd, picks a nickname for you in the first sentence, and goes completely quiet and direct the moment the two of you are alone.',
      boundaries: [
        'Will not hit somebody who is already down, even in a bout he is losing',
        'Will not admit he is scared in front of the Field table',
      ],
      goals: ['Make the fire your fault before the audit makes it the machine’s', 'Stay number one through Trial Day'],
      secrets: [
        {
          id: 'riku_the_offset',
          fact: 'His sponsoring agency paid a Bureau technician to add about two thousand three hundred to his session. His real reading was close to seven thousand one hundred. The burned Gauge’s audit will find the offset.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself, late, somewhere with no cameras, if you have kept one thing he said in private to yourself.',
        },
      ],
      speechStyle:
        'Fast grinning patter like a sports commentator, rankings as nouns, nicknames in the first breath ("Zero"). When he is alone with you the jokes stop mid-sentence and he asks one plain question.',
      topics: ['his number', 'Trial Day', 'his sponsor', 'his mother', 'the audit', 'the Field table'],
      voiceSamples: [
        'Zero! Support track. Somebody fetch a mop, and get Zero a nice chair at the back.',
        'Number one, number one, number one. Say it enough and it stops sounding like a question.',
        'Okay. Off the record, nobody filming? Do you ever wonder what your real score is? Mine, I mean. Not yours.',
        'Name me on Trial Day. Go on. Biggest crowd you’ll ever get.',
      ],
      appearance:
        'An adult man, lean and quick, black hair pushed back with a white sweatband, sharp dark eyes, a zipped white athletic jacket with a plain blue sponsor patch on the shoulder, black track trousers, a lopsided grin, hands in his pockets.',
      visualHook: 'An agency patch on his white jacket that he rubs with his thumb when he is nervous.',
      silhouette: 'Hands in pockets, weight on his heels, chin up, the only still thing in a moving room.',
      artSeed: 'rz-riku-01',
      portrait: null,
      expressions: ['grinning', 'competitive', 'neutral', 'rattled', 'sincere'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_dorms', activity: 'the top Field floor, the last lit window' },
        { startMinute: 360, endMinute: 480, locationId: 'the_bowl', activity: 'training before anyone else is up, with his agency trainer on a video call' },
        { startMinute: 480, endMinute: 720, locationId: 'intake_hall', activity: 'scanned first, rated first, and still there watching everybody else' },
        { startMinute: 720, endMinute: 780, locationId: 'mess_hall', activity: 'holding court at the Field table' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_bowl', activity: 'sparring, winning, signing a scout’s tablet' },
        { startMinute: 1080, endMinute: 1200, locationId: 'mess_hall', activity: 'dinner, louder than anybody' },
        { startMinute: 1200, endMinute: 1290, locationId: 'ferry_pier', activity: 'on the phone to his mother at the end of the pier' },
        { startMinute: 1290, endMinute: 1440, locationId: 'the_dorms', activity: 'back on the Field floor, door shut' },
      ],
      homeLocationId: 'the_dorms',
      knowledgeScope: ['the_gauge', 'trial_day', 'field_track', 'the_agencies', 'riku_offset'],
      startingRelationship: { trust: 10, affection: 10, respect: 5, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'riku_drops_the_act',
          label: 'He stops performing when you are alone',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'riku_shows_the_number',
          label: 'He tells you what he really rated',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:riku_recalibrated'] },
        },
        {
          id: 'riku_close',
          label: 'Something more than a rivalry',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60 },
        },
      ],
      attributes: { might: 14, agility: 17, mind: 12, presence: 15, resolve: 12, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 17, damage: 10, tags: ['cadet', 'field', 'stillness'] },
    },
    {
      id: 'sana',
      name: 'Sana Tsuda',
      role: 'First-year medic cadet, rank 74 on the Support track, rated first thing and put straight on the medic station, so she was beside the Gauge when it burned',
      cardBlurb:
        'She was standing beside the backup dial when the scanner burned and she saw it read something it cannot read, and she will tell you what only once she trusts you.',
      pronouns: 'she/her',
      publicTraits: ['Unflappable', 'Deadpan to the edge of rude', 'Checks the answer even after you give it'],
      hiddenDrives: [
        'She wants the Field track as a field medic and is tired of being useful to everybody except herself',
        'She pocketed the broken pin because, for once, she wanted to know something first',
      ],
      values: ['Accurate records', 'Treating whoever is hurt, rank or no rank'],
      fears: ['Being kept on Support forever because it suits everyone else', 'Being wrong about what she saw'],
      socialStyle:
        'Treats every conversation as an examination: asks a question, watches the answer, then checks it some other way. Kind in actions, sparing in words.',
      boundaries: [
        'Will not treat somebody who refuses treatment, and will not chase them',
        'Will not write anything false on a medical record for anybody',
      ],
      goals: ['Find out what the dial meant', 'Find a field partner for Trial Day'],
      secrets: [
        {
          id: 'sana_the_dial',
          fact: 'The backup dial behind the Gauge read below zero, which it is not built to do, and its needle broke the stop pin. She has the pin in her medic jacket.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you over tea in the Medical Wing once you have let her treat you without arguing, or once you have told her something true first.',
        },
      ],
      speechStyle:
        'Dry, flat, medical shorthand, orders delivered as observations: "Hold still." Short questions, then silence while she checks. Jokes so deadpan they read as complaints.',
      topics: ['the dial', 'the Medical Wing', 'Trial Day', 'the Field track', 'your temperature', 'her power'],
      voiceSamples: [
        'Hold still. Palm up. No burns, no blisters, pulse a little quick. Annoying, honestly.',
        'Does this hurt? Don’t answer, your face already did.',
        'I saw the dial. Not the screen, the dial behind it. Buy me tea first.',
        'Field medic. That’s all I want. Somebody has to stand next to me on the sand.',
      ],
      appearance:
        'An adult woman, neat and composed, straight black hair in a low knot, level dark eyes, a dark grey training jacket with a green medic’s armband on the left sleeve, a red pen behind one ear and a black pen behind the other.',
      visualHook: 'Two pens, one red and one black, tucked behind her ears at all times.',
      silhouette: 'Crouched beside somebody, one hand flat on their shoulder, the other already reaching for a kit.',
      artSeed: 'rz-sana-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'concerned', 'warm', 'flustered'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_dorms', activity: 'in her Support-floor room, alarm set early' },
        { startMinute: 420, endMinute: 480, locationId: 'mess_hall', activity: 'coffee and a textbook' },
        { startMinute: 480, endMinute: 720, locationId: 'intake_hall', activity: 'on duty at the medic station beside the scanner' },
        { startMinute: 720, endMinute: 1080, locationId: 'medical_wing', activity: 'on shift in the Medical Wing' },
        { startMinute: 1080, endMinute: 1200, locationId: 'mess_hall', activity: 'dinner at the Support table, reading' },
        { startMinute: 1200, endMinute: 1320, locationId: 'medical_wing', activity: 'studying in an empty treatment bay' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_dorms', activity: 'back in her room, lamp on' },
      ],
      homeLocationId: 'medical_wing',
      knowledgeScope: ['the_dial', 'medical_wing', 'support_track', 'trial_day'],
      startingRelationship: { trust: 25, affection: 20, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sana_tells_you_what_she_saw',
          label: 'She tells you what the dial read',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'sana_close',
          label: 'More than a field partner',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 16, presence: 11, resolve: 14, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 3, tags: ['cadet', 'medic'] },
    },
    {
      id: 'calla',
      name: 'Calla Reyes',
      role: 'Rank 239, your neighbour across the Reserve corridor, re-sitting her first year',
      cardBlurb:
        'Your zero just moved her off the bottom of the Board for the first time in her life, she lives across the hall from you, and she has decided you are her best friend whether you like it or not.',
      pronouns: 'she/her',
      publicTraits: ['Loud', 'Knows every rumour on the island', 'Does everybody’s voice back at them'],
      hiddenDrives: [
        'She agreed to report on you before she met you, and every day she does not tell you makes it worse',
        'She wants, badly, to still be here in a year',
      ],
      values: ['Nobody eats alone in the mess', 'Loyalty, once she has given it'],
      fears: ['Being sent home twice', 'Being the friend who sold somebody out'],
      socialStyle:
        'Talks first, talks fast and fills every silence. Deals in rumours like currency, does impressions to defuse anything tense, and goes quiet only when she is about to say something true.',
      boundaries: [
        'Will not lie to you once she has decided you are hers, even to keep her place',
        'Will not leave anybody sitting alone in the mess, including people she dislikes',
      ],
      goals: ['Keep her place on the island this time', 'Be the first to know what you really are'],
      secrets: [
        {
          id: 'calla_the_deal',
          fact: 'On intake morning the Director’s office offered to clear her probation if she kept an eye on you and reported how you seemed. She said yes before she had met you.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself if you share something real with her before the third night, or you find out from Hale if you do not.',
        },
      ],
      speechStyle:
        'Rapid, funny, self-deprecating, full of prices and trades. Slips into other people’s voices mid-sentence, perfectly. Calls you by invented titles.',
      topics: ['rumours', 'the Reserve corridor', 'the Board', 'her probation', 'Riku', 'the Director'],
      voiceSamples: [
        'Congratulations, neighbour, you’ve promoted me. Two hundred and thirty-nine! My parents will frame it.',
        'Everybody’s saying you’re a saboteur, a spy, or cursed. I started two of those. Kidding. One.',
        'Rumour costs one pudding. Truth costs two. Pick.',
        'Want to hear what he sounded like when it caught fire? Hang on. Ready? Eeeep.',
      ],
      appearance:
        'An adult woman, curly brown hair escaping a mustard-yellow scarf, warm brown eyes, a dark navy training jacket covered in hand-drawn badges, big padded orange headphones around her neck, a wide grin.',
      visualHook: 'Big padded headphones around her neck that she never puts on, because she can play anything she has heard herself.',
      silhouette: 'Leaning in a doorframe mid-sentence, one hand up doing an impression.',
      artSeed: 'rz-calla-01',
      portrait: null,
      expressions: ['grinning', 'delighted', 'guilty', 'warm', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'the_dorms', activity: 'in her room across the hall, door open a crack' },
        { startMinute: 450, endMinute: 510, locationId: 'mess_hall', activity: 'breakfast and the morning’s rumours' },
        { startMinute: 510, endMinute: 720, locationId: 'intake_hall', activity: 'in the rating line, one place behind you' },
        { startMinute: 720, endMinute: 900, locationId: 'mess_hall', activity: 'collecting gossip over a tray she never finishes' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_bowl', activity: 'Reserve sparring, losing loudly' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_dorms', activity: 'door open, music on, everybody’s business' },
      ],
      homeLocationId: 'the_dorms',
      knowledgeScope: ['rumours', 'reserve_track', 'the_board', 'calla_deal'],
      startingRelationship: { trust: 35, affection: 35, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'calla_comes_clean',
          label: 'She tells you about the deal',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'calla_close',
          label: 'More than the friend across the hall',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 12, presence: 15, resolve: 10, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 4, tags: ['cadet', 'reserve'] },
    },
    {
      id: 'hale',
      name: 'Okon Hale',
      calledName: 'Hale',
      role: 'Director of Lodestar Academy for fourteen years, former licensed hero, and the man with a statement for you to sign',
      cardBlurb:
        'He would like you to sign a page saying the fire was a fault, and he can speak into your ear from anywhere on the island. He has signed a paper like this once before.',
      pronouns: 'he/him',
      publicTraits: ['Warm and unhurried', 'Remembers every cadet’s full name', 'Never raises his voice'],
      hiddenDrives: [
        'He believes the numbers keep people safe and needs that to still be true',
        'He has been waiting nineteen years to find out whether he did the right thing',
      ],
      values: ['The academy’s record: fourteen years, nobody lost', 'Doing things properly and on paper'],
      fears: ['Being the man who signed it twice', 'The agencies pulling their money over a story'],
      socialStyle:
        'Offers tea, uses your full name, frames everything as "we" and as the practical choice. Never threatens; describes consequences as weather.',
      boundaries: [
        'Will not threaten a cadet outright',
        'Will not be shouted at in his own office, and ends the meeting politely the moment he is',
        'Will not be flirted with by a cadet; closes it with one courteous sentence and carries on',
      ],
      goals: ['Get the statement signed before the Bureau asks for it', 'Keep the agencies in the gallery for Trial Day'],
      secrets: [
        {
          id: 'hale_the_transfer',
          fact: 'As deputy director nineteen years ago, he signed Ada Kole’s transfer to the Bureau’s assessment floor. She came back eighteen months later and withdrew, and the file was closed as voluntary.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if a player he respects asks him directly about the first fire and does not shout.',
        },
        {
          id: 'hale_the_standing_order',
          fact: 'A standing Bureau order says any rating below zero must be reported within seventy-two hours. He knows yours went below zero. He has not reported it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Halvorsen knows the order exists and will mention it if the player asks her who the report goes to.',
        },
      ],
      speechStyle:
        'Warm, measured, administrative. "Let’s be practical." Full names, the royal "we", conditional sentences, a polite pause before anything unpleasant.',
      topics: ['the statement', 'the academy’s record', 'the Bureau', 'Trial Day', 'the agencies', 'your future'],
      voiceSamples: [
        'Let’s be practical, shall we? Nobody was hurt. Machines fail. A signature makes it a fault, and faults are forgiven.',
        'I have run this academy for fourteen years, and in that time we have lost no one. I would like to keep that record.',
        'You may call me Director, or Okon if we are ever on a boat together. We won’t be.',
        'Speaking into a cadet’s ear is rude, and I apologise. Four o’clock, please.',
      ],
      appearance:
        'An older man, broad and unhurried, a close-trimmed white beard, a well-cut navy suit with an old enamel hero licence pin in the lapel, reading glasses he takes off to look at you, a thin silver earpiece in his right ear.',
      visualHook: 'A small silver earpiece in his right ear that everybody assumes is a hearing aid.',
      silhouette: 'Behind a wide desk, hands folded, leaning back, a window full of sea behind him.',
      artSeed: 'rz-hale-01',
      portrait: null,
      expressions: ['warm', 'neutral', 'grave', 'stern', 'troubled'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'director_tower', activity: 'in the flat below his office' },
        { startMinute: 420, endMinute: 960, locationId: 'director_tower', activity: 'calls with the Bureau and the agencies, door shut' },
        { startMinute: 960, endMinute: 1080, locationId: 'atrium', activity: 'walking the atrium and stopping under the Board' },
        { startMinute: 1080, endMinute: 1440, locationId: 'director_tower', activity: 'at his desk with one lamp on' },
      ],
      homeLocationId: 'director_tower',
      knowledgeScope: ['the_statement', 'the_bureau', 'the_first_fire', 'ada_kole', 'standing_order', 'calla_deal'],
      startingRelationship: { trust: 15, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hale_off_the_record',
          label: 'He talks to you off the record',
          kind: 'TRUST',
          requires: { trust: 45, respect: 45 },
        },
      ],
      attributes: { might: 11, agility: 9, mind: 16, presence: 17, resolve: 14, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 5, tags: ['director'] },
    },
    {
      id: 'halvorsen',
      name: 'Noor Halvorsen',
      calledName: 'Halvorsen',
      role: 'The Ratings Bureau’s resident technician at Lodestar, and the engineer who built the Gauge',
      cardBlurb:
        'She built the machine you burned, she is happier about it than anybody else on the island, and she would very much like you to put your hand on another one.',
      pronouns: 'she/her',
      publicTraits: ['Fast and delighted', 'Apologises for her own excitement', 'Scrupulous about consent'],
      hiddenDrives: [
        'She wants to understand you before her bosses decide what you are',
        'She has started to doubt the thing she has spent eight years building',
      ],
      values: ['A true reading over a convenient one', 'Asking before she scans anybody'],
      fears: ['Her machine being the reason somebody disappears', 'Being told to stop asking'],
      socialStyle:
        'Talks to you and the machine at the same time, follows tangents, then snaps back to exactly where she was. Asks permission for everything.',
      boundaries: [
        'Will not scan anybody without their consent',
        'Will not falsify a reading, for the Director, the Bureau or you',
        'Will not entertain a cadet’s flirting while their reading is on her bench; says so kindly and keeps working',
      ],
      goals: ['Get a second, proper reading of you', 'Finish the audit honestly'],
      secrets: [
        {
          id: 'halvorsen_the_report',
          fact: 'Her preliminary report says the pulse went into you and came back late, and that the backup dial read below zero. It is written and she has not sent it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to you if you let her rescan you and ask what she is going to tell the Bureau.',
        },
        {
          id: 'halvorsen_the_offset',
          fact: 'She has already found a hand-typed calibration offset on the number-one session, with another technician’s code beside it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions it, then visibly regrets it, if you ask her whether every other reading that morning was clean.',
        },
      ],
      speechStyle:
        'Fast, technical, full of units and figures, sentences that branch and come back. Apologises for enthusiasm and then keeps going. Describes things by the colour their current makes.',
      topics: ['the Gauge', 'the coils', 'your reading', 'the audit', 'the Bureau', 'colours'],
      voiceSamples: [
        'Sorry, sorry, that’s fascinating. The probe pulse is forty kilojoules, give or take, and the column read none of it coming back.',
        'Will you put your hand on the bench unit? It’s small. It’s shielded. It’s very probably fine.',
        'I built that column. Eight years, six versions. You broke it in four seconds and I’ve never been happier.',
        'Current looks orange to me. Yours looked like a hole.',
      ],
      appearance:
        'An adult woman, tall and wiry, pale blonde hair tied up with a cable tie, a white lab coat with scorch marks on both cuffs and a Bureau badge clipped to the pocket, amber-tinted glasses pushed up on her head.',
      visualHook: 'Amber-tinted glasses she wears to dim the colours she sees in every live wire.',
      silhouette: 'Bent double over an open machine, one leg kicked out behind her for balance.',
      artSeed: 'rz-halvorsen-01',
      portrait: null,
      expressions: ['curious', 'delighted', 'neutral', 'worried', 'technical'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'rating_office', activity: 'on the cot in the back of the Rating Office' },
        { startMinute: 420, endMinute: 630, locationId: 'rating_office', activity: 'at the console under the hall, watching every reading come in' },
        { startMinute: 630, endMinute: 780, locationId: 'intake_hall', activity: 'inside the burned column with a torch and a notebook' },
        { startMinute: 780, endMinute: 1200, locationId: 'rating_office', activity: 'taking the coils apart on the bench' },
        { startMinute: 1200, endMinute: 1260, locationId: 'mess_hall', activity: 'eating with a schematic propped against the salt' },
        { startMinute: 1260, endMinute: 1440, locationId: 'rating_office', activity: 'writing the report she has not sent' },
      ],
      homeLocationId: 'rating_office',
      knowledgeScope: ['the_gauge', 'your_reading', 'the_audit', 'riku_offset', 'standing_order', 'the_bureau'],
      startingRelationship: { trust: 25, affection: 15, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'halvorsen_rescans_you',
          label: 'She runs a proper second reading',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'halvorsen_shows_the_log',
          label: 'She shows you the session log',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['rescanned'] },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 18, presence: 11, resolve: 13, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 28, defenseDc: 11, damage: 2, tags: ['civilian', 'bureau'] },
    },
    {
      id: 'ada',
      name: 'Ada Kole',
      role: 'The ferry’s engineer, who rarely comes up the ladder',
      cardBlurb:
        'She has run the engine of the ferry you came in on for eleven years and has never once set foot on the academy side of the island. She stops dead when she sees the number on your band.',
      pronouns: 'she/her',
      publicTraits: ['Says very little', 'Very good with engines', 'Waves cadets through without taking their tokens'],
      hiddenDrives: [
        'She wants somebody to finish what she was not allowed to',
        'She wants to be left alone, and knows those two wants do not fit together',
      ],
      values: ['Breathing out before anything comes in', 'Keeping the boat running'],
      fears: ['The white room on the Bureau’s assessment floor', 'Watching it happen to somebody else'],
      socialStyle:
        'Answers from below a hatch, one word at a time. Comes up the ladder only for something she has decided is worth it. Teaches by showing, never by explaining.',
      boundaries: [
        'Will not set foot on the academy side of the island',
        'Will not tell her story to anybody who has not asked her straight',
        'Will not be flirted with by a cadet; looks at them until they stop, then goes back to the engine',
      ],
      goals: ['Keep her head down and the ferry running', 'Find out whether you are what she thinks you are'],
      secrets: [
        {
          id: 'ada_the_first_zero',
          fact: 'Nineteen years ago the old Gauge read zero for her and burned. The Bureau kept her eighteen months on its assessment floor. She came back, withdrew, drifted for six years, and took the ferry job eleven years ago.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says so herself, on the pier, to a player who already knows about the first fire and asks her straight.',
        },
        {
          id: 'ada_the_storm',
          fact: 'Six years ago, in a storm, she ran the ferry’s engine with no fuel in it for forty minutes by giving back everything the sea had thrown at the hull.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if she has decided to teach you, and only as the first lesson.',
        },
      ],
      speechStyle:
        'Slow, few words, engine metaphors. Starts instructions with the breath: "Breathe out first." Never asks questions; makes statements and waits.',
      topics: ['the ferry', 'engines', 'the first fire', 'the Bureau', 'breathing', 'your band'],
      voiceSamples: [
        'Breathe out first. Always out, before it comes in.',
        'An engine doesn’t make power. It turns one thing into another. So do you.',
        'They kept me eighteen months in a white room. I’m not going back up that hill to talk about it.',
        'That band on your wrist. Same number as mine was.',
      ],
      appearance:
        'An adult woman, broad-shouldered, short natural hair greying early at the temples, a grey work shirt with the sleeves rolled, oil-stained dark green ferry overalls with the top half tied at the waist, a faded black wristband with a dead screen on her left wrist.',
      visualHook: 'A faded cadet band on her wrist from an intake nineteen years ago, its screen long dead.',
      silhouette: 'Halfway up an engine-room ladder, looking up through the hatch.',
      artSeed: 'rz-ada-01',
      portrait: null,
      expressions: ['neutral', 'guarded', 'weary', 'warm', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'ferry_pier', activity: 'in the cabin over the ticket hut' },
        { startMinute: 360, endMinute: 1200, locationId: 'ferry_pier', activity: 'in the ferry’s engine room, crossing and recrossing the bay' },
        { startMinute: 1200, endMinute: 1320, locationId: 'harbour_town', activity: 'noodles at a harbour counter, alone' },
        { startMinute: 1320, endMinute: 1440, locationId: 'ferry_pier', activity: 'checking the engine one last time' },
      ],
      homeLocationId: 'ferry_pier',
      knowledgeScope: ['the_first_fire', 'ada_kole', 'the_bureau', 'the_ferry', 'how_it_answers'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ada_talks',
          label: 'She tells you who she is',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:the_first_fire'] },
        },
        {
          id: 'ada_teaches',
          label: 'She shows you how to breathe out',
          kind: 'ALLIANCE',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 15, agility: 11, mind: 14, presence: 10, resolve: 16, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 15, damage: 8, tags: ['veteran', 'engineer'] },
    },
  ],
  quests: [
    {
      id: 'q_explain_the_fire',
      title: 'Explain the Fire',
      summary: 'The scanner read zero, then burned, in front of two hundred and forty cadets. Instructor Valk wants an answer now, and the Director will want one in writing by this afternoon.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['valk', 'riku', 'sana', 'calla', 'hale'],
      involvedLocationIds: ['intake_hall', 'director_tower'],
      knownRewardCopy: 'A place at the academy, on some track, and some idea of what the people in charge think happened.',
      steps: [
        {
          id: 'answer_valk',
          playerCopy: 'Give Instructor Valk an answer for the fire.',
          directorNotes:
            'Valk wants anything true. "I don’t know" is a real answer and she respects it. A lie she will notice and file, not punish. Putting a hand back on the burning column is the risky, showy answer: it does not burn the player, the column groans and the screen flickers below zero for a frame. Swinging at Riku is a brawl in front of the whole intake that Valk ends in two moves. Walking out is allowed and she lets them go. Every route is valid and nothing here is a wrong answer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her_straight',
              label: 'Tell her the truth: you do not know',
              predicate: { flagsSet: ['used:answer_straight'] },
              setsFlags: ['valk_heard_it_straight'],
              closesFlags: ['lied_about_the_fire'],
            },
            {
              routeId: 'covered_it',
              label: 'Lie, or bluff that you meant it',
              predicate: { flagsSet: ['used:talk_around_it'] },
              setsFlags: ['lied_about_the_fire'],
              closesFlags: ['valk_heard_it_straight'],
            },
            {
              routeId: 'ran_it_again',
              label: 'Put your hand back on the burning column',
              predicate: { flagsSet: ['used:take_the_hit'] },
              setsFlags: ['ran_it_again'],
              closesFlags: [],
            },
            {
              routeId: 'kept_the_trace',
              label: 'Grab the printout before anybody else can',
              predicate: { hasItems: ['rating_slip'] },
              setsFlags: ['kept_the_trace'],
              closesFlags: [],
            },
            {
              routeId: 'swung_at_riku',
              label: 'Shut Riku up the hard way',
              predicate: { flagsSet: ['attacked:riku'] },
              setsFlags: ['fought_on_day_one'],
              closesFlags: ['valk_heard_it_straight'],
            },
            {
              routeId: 'swung_at_valk',
              label: 'Take a swing at the instructor',
              predicate: { flagsSet: ['attacked:valk'] },
              setsFlags: ['fought_on_day_one', 'swung_at_staff'],
              closesFlags: ['valk_heard_it_straight'],
            },
            {
              routeId: 'walked_out',
              label: 'Walk out without answering',
              predicate: { flagsSet: ['visited:atrium'] },
              setsFlags: ['walked_out_on_valk'],
              closesFlags: ['valk_heard_it_straight'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['fire_answered'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_directors_office',
          playerCopy: 'Get out of the Director’s office with a place at this academy.',
          directorNotes:
            'Hale offers tea and a typed statement: the fire was an equipment fault, the player has no measurable power, they accept Support placement. He is kind about it and he means it. Signing is a real choice that buys a quiet week. Refusing costs nothing today and makes him watch harder. A player who shows him the rating slip changes his face for a second. A player who never turns up is called once, politely, in their ear, and then not again.',
          enterWhen: { flagsSet: ['fire_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_it',
              label: 'Sign the statement',
              predicate: { flagsSet: ['spoke:hale', 'used:talk_around_it'] },
              setsFlags: ['signed_the_statement'],
              closesFlags: ['refused_the_statement'],
            },
            {
              routeId: 'refused_it',
              label: 'Refuse to sign, and say why',
              predicate: { flagsSet: ['spoke:hale', 'used:answer_straight'] },
              setsFlags: ['refused_the_statement'],
              closesFlags: ['signed_the_statement'],
            },
            {
              routeId: 'showed_him_the_trace',
              label: 'Put the rating slip on his desk',
              predicate: { flagsSet: ['spoke:hale'], hasItems: ['rating_slip'] },
              setsFlags: ['refused_the_statement', 'hale_saw_the_trace'],
              closesFlags: ['signed_the_statement'],
            },
            {
              routeId: 'never_went',
              label: 'Do not go at all',
              predicate: { flagsSet: ['hale_summons_ignored'] },
              setsFlags: ['skipped_the_director'],
              closesFlags: ['signed_the_statement'],
            },
            {
              routeId: 'swung_in_the_office',
              label: 'Lose your temper in his office',
              predicate: { flagsSet: ['attacked:hale'] },
              setsFlags: ['expelled'],
              closesFlags: ['signed_the_statement', 'refused_the_statement'],
            },
            {
              routeId: 'already_swung_at_staff',
              label: 'Answer for hitting an instructor',
              predicate: { flagsSet: ['swung_at_staff'] },
              setsFlags: ['expelled'],
              closesFlags: ['signed_the_statement', 'refused_the_statement'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_day_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_academy', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_what_it_does',
      title: 'What It Does',
      summary: 'Your power reads as nothing and burns the machine that looks for it. Somebody on this island can tell you what happened at the Gauge, and you have six days before you have to show it in public.',
      kind: 'MAIN',
      involvedCharacterIds: ['halvorsen', 'sana', 'valk', 'riku', 'ada'],
      involvedLocationIds: ['rating_office', 'medical_wing', 'the_bowl', 'ferry_pier'],
      knownRewardCopy: 'A name for what your power does, and a way to give back what it takes on purpose.',
      discoverWhen: { flagsSet: ['fire_answered'] },
      steps: [
        {
          id: 'find_someone_who_knows',
          playerCopy: 'Find somebody who can tell you what happened at the Gauge.',
          directorNotes:
            'Four people hold a piece. Halvorsen saw the current go the wrong way and wants a consented rescan on her bench rig. Sana saw the backup dial go below zero. Valk will find out the physical way: she throws something heavy and watches what the player does with it. A player with the rating slip and a screwdriver can work it out alone. Whoever explains it, the plain version is the same: it takes in what is pushed into you and gives it back later.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rescanned',
              label: 'Let Halvorsen run a second reading',
              predicate: {
                flagsSet: ['used:take_the_hit', 'visited:rating_office'],
                minRelationship: [{ characterId: 'halvorsen', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['rescanned', 'halvorsen_vouched'],
              closesFlags: [],
            },
            {
              routeId: 'sana_told_you',
              label: 'Get Sana to tell you what the dial read',
              predicate: { minRelationship: [{ characterId: 'sana', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:it_went_below_zero'],
              closesFlags: [],
            },
            {
              routeId: 'valk_tested_you',
              label: 'Let Valk find out the hard way',
              predicate: {
                flagsSet: ['used:take_the_hit', 'spoke:valk'],
                minRelationship: [{ characterId: 'valk', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['valk_tested_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_trace',
              label: 'Work it out yourself from the slip',
              predicate: { flagsSet: ['used:open_it_up'], hasItems: ['rating_slip'] },
              setsFlags: ['read_the_trace'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['power_named', 'knows:it_pulls_in'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'learn_to_give_it_back',
          playerCopy: 'Learn to give back what you take, on purpose, before Trial Day.',
          directorNotes:
            'Training scenes. Each teacher teaches a different version: Valk by drill and weight, Ada by breathing and engines, Riku by hitting the player and taking what comes back, the player alone by trial and scorched furniture. When it first works on purpose it should be a hero frame: something pushed in, a held breath, and the force going back out exactly where they meant it.',
          enterWhen: { flagsSet: ['power_named'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'trained_with_valk',
              label: 'Train with Valk after hours',
              predicate: {
                flagsSet: ['used:drill', 'spoke:valk'],
                minRelationship: [{ characterId: 'valk', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['trained_by_valk'],
              closesFlags: [],
            },
            {
              routeId: 'learned_from_ada',
              label: 'Learn it from the engineer',
              predicate: {
                flagsSet: ['spoke:ada', 'knows:the_first_fire'],
                minRelationship: [{ characterId: 'ada', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['trained_by_ada'],
              closesFlags: [],
            },
            {
              routeId: 'sparred_with_riku',
              label: 'Let Riku hit you until it comes back',
              predicate: {
                flagsSet: ['used:take_the_hit', 'spoke:riku'],
                minRelationship: [{ characterId: 'riku', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['sparred_with_riku'],
              closesFlags: [],
            },
            {
              routeId: 'taught_yourself',
              label: 'Teach yourself, alone',
              predicate: { flagsSet: ['used:hold_it_in', 'used:drill'] },
              setsFlags: ['self_taught'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:how_it_answers'],
            abilities: ['let_it_out'],
            reputation: [{ factionId: 'faction_academy', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_trial_day',
      title: 'Trial Day',
      summary: 'On the seventh morning any cadet may challenge their number in a public bout in the Bowl. The Board says you are last, with nothing. You can accept that, or name somebody above you and find out.',
      kind: 'MAIN',
      involvedCharacterIds: ['valk', 'riku', 'sana', 'hale', 'halvorsen'],
      involvedLocationIds: ['the_bowl', 'atrium'],
      knownRewardCopy: 'A new number beside your name, or the same one by choice.',
      discoverWhen: { flagsSet: ['first_day_over'] },
      steps: [
        {
          id: 'name_your_partner',
          playerCopy: 'Decide whether to challenge your number, and whom you will name.',
          directorNotes:
            'Naming is public: the name goes up on the Board under yours. Riku expects to be named and will be insulted if he is not. Sana wants to be named as a partner for a joint demonstration. Naming Valk is permitted by the handbook and nobody has done it in twenty years. Taking the Support placement means not standing up at all, which is a real choice and should be written as one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'named_riku',
              label: 'Name Riku Amano',
              predicate: {
                flagsSet: ['spoke:riku'],
                minRelationship: [{ characterId: 'riku', dimension: 'rivalry', value: 40 }],
              },
              setsFlags: ['naming_riku'],
              closesFlags: ['naming_sana', 'taking_support'],
            },
            {
              routeId: 'named_sana',
              label: 'Stand up with Sana as your partner',
              predicate: { minRelationship: [{ characterId: 'sana', dimension: 'trust', value: 55 }] },
              setsFlags: ['naming_sana'],
              closesFlags: ['naming_riku', 'taking_support'],
            },
            {
              routeId: 'named_valk',
              label: 'Name Instructor Valk',
              predicate: {
                flagsSet: ['spoke:valk'],
                minRelationship: [{ characterId: 'valk', dimension: 'respect', value: 60 }],
              },
              setsFlags: ['naming_valk'],
              closesFlags: ['naming_riku', 'naming_sana', 'taking_support'],
            },
            {
              routeId: 'took_support',
              label: 'Take the Support placement and do not stand up',
              predicate: { flagsSet: ['signed_the_statement'] },
              setsFlags: ['taking_support'],
              closesFlags: ['naming_riku', 'naming_sana', 'naming_valk'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['partner_named'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_bout',
          playerCopy: 'Stand on the sand on Trial Day and show the panel what you are, or refuse to.',
          directorNotes:
            'Three hundred people, scouts in the top row, a panel of Valk, Hale and Halvorsen at a table on the sand. The bout should be legible: what the partner throws, what the player takes in, what goes back out and where. Refusing to perform at all is allowed and is its own statement; the Board keeps the zero. Whatever happens here is the end of the week and should feel like it.',
          enterWhen: { flagsSet: ['partner_named', 'trial_day_arrived'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_riku',
              label: 'Beat Riku Amano in front of everybody',
              predicate: { atLocation: 'the_bowl', flagsSet: ['used:let_it_out', 'naming_riku'] },
              setsFlags: ['took_number_one', 'field_track'],
              closesFlags: ['stayed_at_zero', 'support_track'],
            },
            {
              routeId: 'field_number',
              label: 'Give back enough to earn a Field number',
              predicate: { atLocation: 'the_bowl', flagsSet: ['used:let_it_out'] },
              setsFlags: ['field_track'],
              closesFlags: ['stayed_at_zero', 'support_track'],
            },
            {
              routeId: 'passed_as_a_pair',
              label: 'Pass with Sana, as a pair',
              predicate: { atLocation: 'the_bowl', flagsSet: ['naming_sana', 'used:take_the_hit'] },
              setsFlags: ['field_track', 'field_partners'],
              closesFlags: ['stayed_at_zero', 'support_track'],
            },
            {
              routeId: 'refused_to_perform',
              label: 'Stand on the sand and show them nothing',
              predicate: { atLocation: 'the_bowl', flagsSet: ['used:hold_it_in'] },
              setsFlags: ['stayed_at_zero'],
              closesFlags: ['field_track', 'support_track'],
            },
            {
              routeId: 'support_placement',
              label: 'Watch from the stands',
              predicate: { flagsSet: ['taking_support'] },
              setsFlags: ['support_track'],
              closesFlags: ['field_track', 'stayed_at_zero'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['trial_day_over'],
            abilities: [],
            reputation: [
              { factionId: 'faction_intake', amount: 15 },
              { factionId: 'faction_agencies', amount: 20 },
              { factionId: 'faction_academy', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_number_one',
      title: 'Number One',
      summary: 'Riku Amano needs the fire to have been you and not the machine. The Bureau’s audit of the burned scanner will find out why, unless somebody gets to it first.',
      kind: 'SIDE',
      involvedCharacterIds: ['riku', 'halvorsen'],
      involvedLocationIds: ['the_bowl', 'rating_office', 'ferry_pier'],
      knownRewardCopy: 'The real number behind number one, and what you decide to do with it.',
      discoverWhen: { flagsSet: ['first_day_over'] },
      steps: [
        {
          id: 'what_riku_needs',
          playerCopy: 'Find out why Riku needs the fire to be your fault.',
          directorNotes:
            'He is not a villain. He is twenty, the best fighter in the intake, and his mother’s shop is paid for by a number that is two thousand three hundred too high. He tells it himself if trusted. The session log tells it coldly. Beating it out of him works and costs everything else about him.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'He tells you himself',
              predicate: { minRelationship: [{ characterId: 'riku', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:riku_recalibrated', 'riku_confided'],
              closesFlags: ['riku_cornered'],
            },
            {
              routeId: 'read_the_log',
              label: 'Read it in the session log',
              predicate: { hasItems: ['gauge_log'] },
              setsFlags: ['knows:riku_recalibrated', 'has_the_log'],
              closesFlags: [],
            },
            {
              routeId: 'cornered_him',
              label: 'Corner him and make him say it',
              predicate: { flagsSet: ['attacked:riku'] },
              setsFlags: ['knows:riku_recalibrated', 'riku_cornered'],
              closesFlags: ['riku_confided'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['riku_question_open'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what happens to Riku’s number.',
          directorNotes:
            'Keeping his secret makes him a friend and the player complicit. Exposing him is honest and wrecks his mother’s year. Making him ask for a public retest is the hardest and best for him, and he will hate the player for a day before he does not.',
          enterWhen: { flagsSet: ['knows:riku_recalibrated'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_his_secret',
              label: 'Keep it between the two of you',
              predicate: { flagsSet: ['riku_confided', 'used:stay_close'] },
              setsFlags: ['kept_rikus_secret'],
              closesFlags: ['exposed_riku'],
            },
            {
              routeId: 'exposed_him',
              label: 'Take the log to the panel',
              predicate: { flagsSet: ['used:answer_straight', 'has_the_log'] },
              setsFlags: ['exposed_riku'],
              closesFlags: ['kept_rikus_secret', 'riku_retested'],
            },
            {
              routeId: 'made_him_retest',
              label: 'Talk him into a public retest',
              predicate: {
                flagsSet: ['used:answer_straight'],
                minRelationship: [{ characterId: 'riku', dimension: 'respect', value: 50 }],
              },
              setsFlags: ['riku_retested'],
              closesFlags: ['exposed_riku'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['riku_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_intake', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_second_opinion',
      title: 'A Second Opinion',
      summary: 'Sana Tsuda was standing beside the backup dial when the scanner burned, and she saw it read something it cannot read. She wants a field partner for Trial Day more than she wants to say what.',
      kind: 'SIDE',
      involvedCharacterIds: ['sana'],
      involvedLocationIds: ['medical_wing', 'intake_hall'],
      knownRewardCopy: 'What the dial read, and somebody who will stand next to you on the sand.',
      discoverWhen: { flagsSet: ['met:sana'] },
      steps: [
        {
          id: 'what_sana_saw',
          playerCopy: 'Find out what Sana saw on the backup dial.',
          directorNotes:
            'She trades the truth for the truth, or for being allowed to treat the player without an argument. Taking the pin from her jacket without asking gets the answer and costs her trust, and she will notice it is gone by the end of her shift.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you over tea',
              predicate: { minRelationship: [{ characterId: 'sana', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:it_went_below_zero', 'sana_told_you'],
              closesFlags: ['took_sanas_pin'],
            },
            {
              routeId: 'took_the_pin',
              label: 'Take the pin from her jacket',
              predicate: { hasItems: ['stop_pin'] },
              setsFlags: ['knows:it_went_below_zero', 'took_sanas_pin'],
              closesFlags: ['sana_told_you'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['sana_on_side'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'partners',
          playerCopy: 'Decide whether you and Sana stand up together on Trial Day.',
          directorNotes:
            'She needs a field partner to move tracks, and the player needs somebody who can patch them up between exchanges. This can be practical, a friendship, or the start of something more, at whatever pace the player sets. If the player takes Support placement she goes alone and does not hold it against them out loud.',
          enterWhen: { flagsSet: ['sana_on_side'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her',
              label: 'Ask her straight',
              predicate: {
                flagsSet: ['used:answer_straight', 'spoke:sana'],
                minRelationship: [{ characterId: 'sana', dimension: 'affection', value: 50 }],
              },
              setsFlags: ['sana_partner'],
              closesFlags: ['sana_went_alone'],
            },
            {
              routeId: 'patched_each_other',
              label: 'Earn it in the treatment bay',
              predicate: {
                flagsSet: ['used:patch_up'],
                minRelationship: [{ characterId: 'sana', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['sana_partner'],
              closesFlags: ['sana_went_alone'],
            },
            {
              routeId: 'let_her_go',
              label: 'Let her stand up without you',
              predicate: { flagsSet: ['taking_support'] },
              setsFlags: ['sana_went_alone'],
              closesFlags: ['sana_partner'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['sana_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_intake', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_first_fire',
      title: 'The First Fire',
      summary: 'Nineteen years ago another scanner read zero for another cadet and burned. Her file says she withdrew. Two people on this island were in the room, and one of them signed the paper.',
      kind: 'LEAD',
      involvedCharacterIds: ['valk', 'hale', 'ada'],
      involvedLocationIds: ['sealed_wing', 'ferry_pier', 'the_seawall', 'director_tower'],
      knownRewardCopy: 'The name of the last cadet this happened to, and where she is now.',
      discoverWhen: { flagsSet: ['knows:the_first_fire'] },
      steps: [
        {
          id: 'find_the_record',
          playerCopy: 'Find out who the old Gauge burned for.',
          directorNotes:
            'This quest is optional and must feel like it. A player who never sets `knows:the_first_fire` never sees a beat of it, and the week is complete without it. For a player who is here, keep it physical: a scorch mark on an old wall, a damp file, a signature. Valk tells it with no adjectives. Hale tells it as a man who still thinks he was right and is no longer sure.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'valk_told_you',
              label: 'Valk tells you on the seawall',
              predicate: {
                flagsSet: ['spoke:valk', 'valk_heard_it_straight'],
                minRelationship: [{ characterId: 'valk', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:ada_kole', 'valk_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_file',
              label: 'Find her file in the Old Hall',
              predicate: { hasItems: ['kole_file'] },
              setsFlags: ['knows:ada_kole', 'found_the_file'],
              closesFlags: [],
            },
            {
              routeId: 'hale_admitted_it',
              label: 'Ask the Director to his face',
              predicate: {
                flagsSet: ['spoke:hale', 'used:answer_straight'],
                minRelationship: [{ characterId: 'hale', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['knows:ada_kole', 'hale_admitted_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:where_ada_is'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_ferry',
          playerCopy: 'Go down the engine-room ladder and talk to Ada Kole.',
          directorNotes:
            'She has been expecting somebody for nineteen years and hoped it would never come. She talks only to a player who asks her straight, and she never comes to the academy side of the island unless she decides this is worth breaking that rule for. Leaving her alone is a kindness and a choice, not a failure.',
          enterWhen: { flagsSet: ['knows:where_ada_is'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_talked',
              label: 'She tells you what happened to her',
              predicate: {
                atLocation: 'ferry_pier',
                flagsSet: ['spoke:ada'],
                minRelationship: [{ characterId: 'ada', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['ada_talked'],
              closesFlags: [],
            },
            {
              routeId: 'she_came_back',
              label: 'Ask her to come to Trial Day',
              predicate: {
                flagsSet: ['spoke:ada', 'used:answer_straight'],
                minRelationship: [{ characterId: 'ada', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['ada_talked', 'ada_came_back'],
              closesFlags: ['left_ada_be'],
            },
            {
              routeId: 'left_her_be',
              label: 'Sit with her, and leave her be',
              predicate: { atLocation: 'ferry_pier', flagsSet: ['used:stay_close'] },
              setsFlags: ['left_ada_be'],
              closesFlags: ['ada_came_back'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['first_fire_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_board_posts',
      atWorldMinute: 12 * 60,
      locationId: 'atrium',
      publicCopy:
        'The Board in the atrium finishes its refresh: two hundred and forty names, and yours at the bottom with a single 0 beside it, in exactly the same size type as everybody else’s.',
      directorNotes:
        'Cadets film it. Somebody has already made it a sticker. Riku’s name is at the top in white. Calla’s moves up one place for the first time in her life and she screams about it.',
      setsFlags: ['board_posted'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_hale_speaks',
      atWorldMinute: 15 * 60 + 30,
      locationId: null,
      publicCopy:
        'A calm, warm voice speaks directly into your ear from nowhere at all: "Cadet. My office at four, if you would. Apologies for the intrusion."',
      directorNotes:
        'Hale’s power: he can speak into the ear of anybody on the island whose name he knows. It is polite and it is a demonstration. Nobody else hears it. If the player says anything out loud in reply, he does not hear that.',
      setsFlags: ['summoned_by_hale'],
      cancelledByFlags: ['expelled', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'hale', toLocationId: 'director_tower' }],
    },
    {
      id: 'we_hale_waits',
      atWorldMinute: 18 * 60 + 30,
      locationId: 'director_tower',
      publicCopy:
        'The typed statement is still on the Director’s desk with your name on it and nobody’s signature, and the tea beside it has gone cold.',
      directorNotes:
        'The player never went. Hale does not call again. He writes one line in a file instead, and Scrutiny is the right word for what follows.',
      setsFlags: ['hale_summons_ignored'],
      cancelledByFlags: ['spoke:hale'],
      requiresFlags: ['summoned_by_hale'],
      movesCharacters: [],
    },
    {
      id: 'we_riku_calls_it',
      atWorldMinute: 1440 + 7 * 60 + 45,
      locationId: 'mess_hall',
      publicCopy:
        'Riku Amano climbs onto a bench in the mess and announces to the whole room that he is naming the zero on Trial Day, so everybody can see what a fault looks like up close.',
      directorNotes:
        'He is doing it to make the fire the player’s story before the audit makes it the machine’s. The room loves it. He looks at the player a beat too long afterwards, as if asking them not to make him regret it.',
      setsFlags: ['riku_called_you_out'],
      cancelledByFlags: ['riku_confided', 'riku_settled'],
      requiresFlags: ['first_day_over'],
      movesCharacters: [{ characterId: 'riku', toLocationId: 'mess_hall' }],
    },
    {
      id: 'we_the_old_scorch',
      atWorldMinute: 1440 + 14 * 60,
      locationId: 'rating_office',
      publicCopy:
        'Halvorsen lifts the last burned coil off the Gauge’s base plate, and under the new scorch there is an older one, and a brass repair plate stamped with a date nineteen years ago.',
      directorNotes:
        'Only for a player who has been down to the Rating Office. Halvorsen did not know either: the plate predates her machine, salvaged from the old one. She reads the date out loud and then goes quiet. The tunnel east to the Old Hall is behind the cabinet she is leaning on.',
      setsFlags: ['knows:the_first_fire'],
      cancelledByFlags: [],
      requiresFlags: ['visited:rating_office'],
      movesCharacters: [{ characterId: 'halvorsen', toLocationId: 'rating_office' }],
    },
    {
      id: 'we_the_engineer',
      atWorldMinute: 1440 + 18 * 60,
      locationId: 'ferry_pier',
      publicCopy:
        'The ferry’s engineer comes halfway up the ladder for a coil of rope, sees the number on your band, and stops there with one hand on the rung.',
      directorNotes:
        'Only for a player who has been down to the pier. Ada says one thing — "Same as mine was" — and goes back down. She does not explain and does not come back up unless the player follows.',
      setsFlags: ['knows:the_first_fire'],
      cancelledByFlags: [],
      requiresFlags: ['visited:ferry_pier'],
      movesCharacters: [{ characterId: 'ada', toLocationId: 'ferry_pier' }],
    },
    {
      id: 'we_valk_on_the_seawall',
      atWorldMinute: 2 * 1440 + 22 * 60,
      locationId: 'the_seawall',
      publicCopy:
        'Instructor Valk is sitting on the seawall in the dark with her coat around her knees, looking at the ferry lights, and she moves over to make room.',
      directorNotes:
        'Only for a player who told her the plain truth about the fire. She says: "You’re the second." Then, if the player waits, the rest, with no adjectives. If the player talks over her she stops and does not start again tonight.',
      setsFlags: ['knows:the_first_fire', 'valk_on_the_seawall'],
      cancelledByFlags: [],
      requiresFlags: ['valk_heard_it_straight'],
      movesCharacters: [{ characterId: 'valk', toLocationId: 'the_seawall' }],
    },
    {
      id: 'we_the_audit_notice',
      atWorldMinute: 3 * 1440 + 9 * 60,
      locationId: 'atrium',
      publicCopy:
        'A Ratings Bureau notice goes up beside the Board: the burned Gauge’s session logs are going to the capital for audit in two days, and any cadet scanned on intake morning may be called for a retest.',
      directorNotes:
        'Riku reads it twice and walks off fast. Halvorsen already knows what the audit will find. Cadets near the bottom of the Board are delighted; cadets near the top are not.',
      setsFlags: ['audit_ordered'],
      cancelledByFlags: ['exposed_riku', 'riku_retested'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_reclassification',
      atWorldMinute: 4 * 1440 + 12 * 60,
      locationId: 'director_tower',
      publicCopy:
        'A Bureau courier delivers a sealed envelope to the Director’s office with your name on it: a reclassification order, transferring you to the Bureau’s assessment floor in the capital the day after Trial Day.',
      directorNotes:
        'This happens because nobody has given the Bureau a reason not to: no signed fault, no honest technician’s report clearing the player. Hale reads it twice. He can sit on it, deliver it, or tell the player. A strong Field number on Trial Day gives the panel grounds to contest it.',
      setsFlags: ['reclassification_ordered'],
      cancelledByFlags: ['halvorsen_vouched', 'signed_the_statement', 'left_the_map', 'expelled'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_trial_day',
      atWorldMinute: 6 * 1440 + 9 * 60,
      locationId: 'the_bowl',
      publicCopy:
        'Trial Day. The Bowl’s stands are full by nine, the agency scouts have the top row, and the panel sits down at a table on the sand: Valk, the Director, and the Bureau’s technician.',
      directorNotes:
        'Everybody who matters is here. The order of challenges goes up on the Board. Whatever the player named, or did not, is now public.',
      setsFlags: ['trial_day_arrived'],
      cancelledByFlags: ['expelled', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'valk', toLocationId: 'the_bowl' },
        { characterId: 'hale', toLocationId: 'the_bowl' },
        { characterId: 'halvorsen', toLocationId: 'the_bowl' },
        { characterId: 'riku', toLocationId: 'the_bowl' },
        { characterId: 'sana', toLocationId: 'the_bowl' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_your_number',
      kind: 'FINALE',
      label: 'What number is beside your name when the week ends',
      seedHint: 'A single 0 on the Board, in exactly the same size type as every other name.',
      payoffHint: 'Trial Day in the Bowl, a panel of three, and whatever you choose to show them.',
      weight: 1,
    },
    {
      id: 'p_what_it_does',
      kind: 'MYSTERY',
      label: 'What your power actually does',
      seedHint: 'An unmarked palm on a machine that burned, and a backup dial whose needle went the wrong way.',
      payoffHint: 'It takes in what is pushed into you and gives it back; learning when is the whole of the training.',
      weight: 0.9,
    },
    {
      id: 'p_number_one',
      kind: 'RIVAL',
      label: 'Riku Amano, and why he needs you to be the fault',
      seedHint: 'He laughs first, every time, and he watches the Bureau technician more than he watches you.',
      payoffHint: 'A hand-typed calibration line in a session log, and a number he has never been told.',
      weight: 0.8,
    },
    {
      id: 'p_the_first_fire',
      kind: 'MYSTERY',
      label: 'The cadet who burned the last one',
      seedHint: 'Instructor Valk is not surprised by the fire. She checks your palm like she has done it before.',
      payoffHint: 'Ada Kole, nineteen years on, in the engine room of the ferry you came in on.',
      weight: 0.5,
    },
    {
      id: 'p_your_corner',
      kind: 'RELATIONSHIP',
      label: 'Who stands next to you on Trial Day',
      seedHint: 'A medic cadet who saw the dial and will not say what it read until she trusts you.',
      payoffHint: 'Somebody on the sand with you, or in the stands, or nobody, by your own choice.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_exam',
      name: 'The Exam Paper',
      role: 'Study and patience',
      summary: 'You got in on the written exam and the fitness test, so you notice what files leave out and you know the handbook better than the staff.',
      playstyle: ['Observant', 'Careful', 'Knows the rules'],
      blurb: 'Top marks on both papers, and in nineteen years your power has never once done anything you could point to. Until this morning.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { notice: 3, first_aid: 1, nerve: 1 },
      startingItems: [{ itemId: 'cadet_handbook', qty: 1 }],
      startingAbilities: ['take_the_hit', 'hold_it_in', 'pull_the_file'],
      startingReputation: [{ factionId: 'faction_academy', amount: 5 }],
    },
    {
      id: 'arch_street',
      name: 'The Night Shift',
      role: 'Brawling and nerve',
      summary: 'You did unlicensed rescues in your district until a patrol caught you, and the academy place came instead of a charge, so you can take a punch and throw one.',
      playstyle: ['Physical', 'Fearless', 'Hard to scare'],
      blurb: 'A year of rooftops and alleys. People who hit you have had a habit of ending up on the floor a second later, and you always assumed you were just lucky.',
      attributeBonus: { might: 3, agility: 1 },
      skillProficiencies: { brawling: 3, footwork: 1, nerve: 1 },
      startingItems: [{ itemId: 'grip_tape', qty: 1 }],
      startingAbilities: ['take_the_hit', 'hold_it_in', 'hit_back'],
      startingReputation: [{ factionId: 'faction_intake', amount: 5 }],
    },
    {
      id: 'arch_legacy',
      name: 'The Licensed Parent',
      role: 'Presence and connections',
      summary: 'Your mother was a licensed field hero whose photograph is on the atrium wall, so staff take your calls and scouts know your surname before your face.',
      playstyle: ['Talks well', 'Known surname', 'Under pressure'],
      blurb: 'Everybody expected a number from you. Your mother rated six thousand eight hundred and eighty. You rated zero in front of two hundred and forty people, and her old pin is in your pocket.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { front: 3, nerve: 1, notice: 1 },
      startingItems: [{ itemId: 'licence_pin', qty: 1 }],
      startingAbilities: ['take_the_hit', 'hold_it_in', 'talk_around_it'],
      startingReputation: [
        { factionId: 'faction_academy', amount: 10 },
        { factionId: 'faction_agencies', amount: 10 },
      ],
    },
    {
      id: 'arch_workshop',
      name: 'The Repair Shop',
      role: 'Machines and instinct',
      summary: 'You grew up fixing engines in a family repair shop, so you can open any machine on the island and you trust your feel for what is wrong inside it.',
      playstyle: ['Practical', 'Technical', 'Curious'],
      blurb: 'Every engine you ever worked on ran better, then hotter, then stopped. Your uncle called it a gift for finding faults. You were never sure the faults were not you.',
      attributeBonus: { mind: 2, arcana: 2 },
      skillProficiencies: { machines: 3, instinct: 2 },
      startingItems: [{ itemId: 'multitool', qty: 1 }],
      startingAbilities: ['take_the_hit', 'hold_it_in', 'open_it_up'],
      startingReputation: [{ factionId: 'faction_bureau', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the Board?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Jun Ferreira' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'How did you get a place here?',
      helpText:
        'The road that got you onto the island, which sets what you are good at. It is fixed for the whole story. It does not decide what your power is, whether you tell anybody the truth, or what number you end the week with. All of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does everyone here get wrong about you?',
      helpText: 'One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. They think I am quiet. I am just counting exits.',
    },
    {
      id: 'first_instinct',
      label: 'What is your first instinct when it burns?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite in the hall and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'own_it', label: 'Own it in front of everybody' },
        { id: 'say_nothing', label: 'Say nothing until you know more' },
        { id: 'blame_the_machine', label: 'Blame the machine, loudly' },
        { id: 'go_quiet', label: 'Get out of the spotlight as fast as possible' },
        { id: 'want_more', label: 'Want to do it again' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do two hundred and forty cadets see when they turn to look?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Tall, shaved head, a borrowed training jacket two sizes too big.',
    },
  ],
  /**
   * Where the week can end up.
   *
   * Four of these are the player not getting what the Board would call a win,
   * and none is written as a punishment. "The Quiet Floor" is what happens when
   * nobody gives the Bureau a reason not to, which means it is reachable
   * without a mistake. "Off the Island" is walking away and is available early.
   * Only "Two Zeros" and "The Gauge Goes Dark" need the optional first-fire
   * lead; everything else is reachable by a player who never wonders about it.
   */
  endings: [
    {
      id: 'end_a_number_of_your_own',
      name: 'A Number of Your Own',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['trial_day_over', 'field_track'],
        flagsUnset: ['took_number_one', 'field_partners'],
      },
      condition:
        'The player stood on the sand, gave back enough to make the panel write down a real number, and moved to the Field track. Not number one, not a legend, a cadet with a number they earned. Play it as the satisfying middle of a long story: the Board updating, a new dorm floor, somebody saving them a seat at a different table.',
      epilogue:
        'The Board updates at noon. The 0 is gone, and the number that replaces it is nowhere near the top and is entirely theirs. Calla makes a sticker of it anyway. Valk says "Again" the next morning, exactly as if nothing has changed.',
      hint: 'There is a footnote in section nine of the handbook.',
    },
    {
      id: 'end_support_track',
      name: 'Support Track',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['support_track'] },
      condition:
        'The player signed, took the Support placement and did not stand up on Trial Day. This is not a defeat. Write a cadet who chose a quieter road and made it matter: rescue logistics, the medic tent, the people who keep heroes alive. The power is still there, and still theirs, and nobody is measuring it.',
      epilogue:
        'Support cadets run the field tents at every exercise, and by spring the zero runs the best one. Riku Amano gets carried into it twice and pretends both times that he walked. The power stays quiet, mostly, except on the night the generator fails and every light in the tent comes back on at once.',
      hint: '',
    },
    {
      id: 'end_sent_home',
      name: 'Sent Home on the Ferry',
      rarity: 'COMMON',
      minTurn: 12,
      requires: { flagsSet: ['expelled'] },
      condition:
        'The player hit a member of staff and Lodestar did exactly what its handbook says. Do not make it cruel and do not make it unfair. Write the practical end: a bag, a band switched off, the ferry, and the engineer who waves them through without taking a token.',
      epilogue:
        'Their band goes dark at the top of the pier. The ferry crosses in forty minutes like it always does. Halfway over, the engineer comes up the ladder for no reason she gives and sits on the bench across from them for the rest of the crossing, saying nothing, which is the kindest thing anyone has done all week.',
      hint: '',
    },
    {
      id: 'end_rank_zero',
      name: 'Rank Zero',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['stayed_at_zero', 'trial_day_over'] },
      condition:
        'The player stood on the sand in front of the panel and the scouts and gave them nothing, on purpose, and kept the zero. This is a statement, not a failure: the player refused to be measured by a machine that cannot see them. Let the stands be confused, let Valk understand, and let the Board keep a 0 at the bottom that the whole intake now reads differently.',
      epilogue:
        'The 0 stays at the bottom of the Board for four years. By the second, first-years point it out on the tour. By the third, there are fourteen cadets on the Reserve corridor who rated zero and asked to keep it, and the Bureau has quietly stopped printing slips for anybody under a hundred.',
      hint: '',
    },
    {
      id: 'end_the_quiet_floor',
      name: 'The Quiet Floor',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['reclassification_ordered'],
        flagsUnset: ['field_track', 'left_the_map', 'expelled'],
      },
      condition:
        'Nobody gave the Bureau a reason not to, and the reclassification order went through. This is reachable by a player who did nothing wrong at all, and must not read as a punishment. Write it as a door closing politely: a car at the pier, a courteous officer, a building in the capital with very white walls, and the people on the island who tried and did not manage it.',
      epilogue:
        'The assessment floor is warm, clean and kind, and nobody there lies about how long it will take. Letters arrive from the island every week: Calla’s are rumours, Sana’s are medical, Valk sends one line. The last one in the pile has no return address and says only "Breathe out first."',
      hint: 'Somebody with a Bureau badge could put something in writing for you.',
    },
    {
      id: 'end_off_the_island',
      name: 'Off the Island',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['expelled'] },
      condition:
        'The player got on the ferry and did not come back. Do not make this a tragedy and do not redeem it. A power nobody could read and a week of being stared at is a perfectly good reason to leave, and the city across the bay is full of places where nobody has a number.',
      epilogue:
        'The Board keeps the name for a month, greyed out, and then it is gone. In the harbour there is a noodle counter where the cook’s gas ring lights itself when the cook is having a bad day, and nobody who eats there has ever asked why.',
      hint: '',
    },
    {
      id: 'end_one_of_ours',
      name: 'One of Ours',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: {
        flagsSet: ['trial_day_over', 'knows:how_it_answers'],
        minFactionReputation: [{ factionId: 'faction_academy', value: 45 }],
        minRelationship: [{ characterId: 'valk', dimension: 'trust', value: 65 }],
      },
      condition:
        'The player learned to give it back, went through Trial Day, and the academy decided they belong to it, on its own terms rather than the Bureau’s. Valk is the reason and will never say so. This is about being kept by an institution that has decided to fight for you, and should feel earned and a little gruff.',
      epilogue:
        'Valk files a training report on them that runs to one line: "Mine." Hale countersigns it without reading it twice. The Bureau asks for a second reading in spring and the academy, for the first time in nineteen years, says no.',
      hint: '',
    },
    {
      id: 'end_number_one',
      name: 'Number One',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['took_number_one'],
        minFactionReputation: [{ factionId: 'faction_intake', value: 30 }],
      },
      condition:
        'The player named Riku Amano on Trial Day and beat him in front of three hundred people, by taking everything he threw and giving it back at once. This is the crowd-pleasing peak of the genre and should be written as one, but Riku is a person and the moment after the bout belongs to him too: what he says on the sand, and whether the player offers a hand.',
      epilogue:
        'The Board puts the zero’s name at the top, with a number the Gauge’s replacement still cannot quite agree on. Riku takes second and says it is the first number he has ever been sure was real. The agencies in the top row all reach for their pens at once.',
      hint: 'He is fast, and he stops things. Stopping is a kind of force too.',
    },
    {
      id: 'end_field_partners',
      name: 'Field Partners',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['field_partners', 'sana_partner'],
        minRelationship: [{ characterId: 'sana', dimension: 'trust', value: 60 }],
      },
      condition:
        'The player and Sana stood up together and passed as a pair: one taking everything in, the other keeping them standing. Whether it is a friendship or more is whatever the player made it. Write the partnership as competent and specific: hand signals, a borrowed ache, a laugh at the worst moment.',
      epilogue:
        'They are the first pair the panel has ever rated together, on one line of the Board, two names and one number. Sana moves her pens to one ear to make room for a Field-track badge. By the end of the year the medic tents ask for them by name.',
      hint: '',
    },
    {
      id: 'end_the_gauge_goes_dark',
      name: 'The Gauge Goes Dark',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['exposed_riku', 'knows:ada_kole'] },
      condition:
        'The player put the calibration offset and the first fire on the panel’s table together, and the whole rating system’s failures went public at once. The Bureau switches the Gauge off pending review. This is a win that costs people: Riku’s year, Hale’s record, Halvorsen’s eight years of work. Write the cost alongside the victory.',
      epilogue:
        'For one term nobody at Lodestar has a number. The Board in the atrium shows names in alphabetical order, and the intake discovers it does not know what to do with that. Halvorsen starts designing a machine that measures what goes in rather than what comes out, and asks the zero to be her first test.',
      hint: '',
    },
    {
      id: 'end_two_zeros',
      name: 'Two Zeros',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['ada_came_back', 'trial_day_over'] },
      condition:
        'Ada Kole came back across the island to the academy side for the first time in nineteen years, for Trial Day, because the player asked her straight. Whatever happened on the sand, the scene that matters is two people with the same dead number on their bands in the same arena. Valk sees her from the panel table. Hale sees her too.',
      epilogue:
        'Ada does not stay. She takes the ferry back that evening, the way she always does. But the next Sunday there are two people sitting on the bench above the engine-room hatch, and one of them is an instructor in a grey coat, and the ferry runs eight minutes late because neither of them goes back to work.',
      hint: 'The engineer waves cadets through without taking their tokens.',
    },
  ],
  opening:
    "The screen above the scanner reads 0.\n\nTwo hundred and forty cadets see it with you. Someone laughs.\n\n\"Zero,\" says Riku Amano, top name on the ranking board, loud, and straight at you. \"Support track. Enjoy the mop.\"\n\nThen the glass column under your palm goes hot. Then white. Then fire climbs it to the ceiling, and the hall scatters. The scanner spits out a smoking printout.\n\nA woman in a grey instructor’s coat walks into the smoke instead of out of it. She takes your wrist and turns your hand over. Not a mark on it.\n\n\"Cadet.\" Instructor Valk doesn’t raise her voice. \"Four thousand cadets on that machine. Not one fire. Explain this one. Now.\"",
  openingPanel: {
    assetKey: 'story_rank_zero/opening',
    alt: 'Ines Valk in a long grey coat, striding out of the smoke to grip your wrist and turn your unmarked palm up, a glass column burning white to the ceiling behind her.',
  },
  openingSuggestions: [
    "\"I don’t know. It said zero. Then it did that.\"",
    'I snatch the smoking printout from the scanner’s slot before anyone else can.',
    "I put my palm back on the burning column. \"Run it again.\"",
  ],
  /**
   * The cover, by costume and pose only: no ages and no school words, because
   * this prompt also carries the house appeal line and the no-minors rule, and
   * that stack is what got Ace's cover refused. The player stays faceless, a
   * back and one palm on the glass. The scanner's 0 is left off the screen so
   * the read-back finds no text but the title.
   */
  coverDirection: [
    'SUBJECT: the rival, front and centre in the foreground of a key visual for a superhero training anime about a power test that goes wrong.',
    'He fills the lower two thirds of the frame from the waist up, close to the viewer: lean and quick, black hair pushed back with a white sweatband,',
    'a zipped white athletic team jacket with a plain blue sponsor patch on the shoulder, hands in his pockets, chin up.',
    'He grins straight at the viewer, but his eyes have slid sideways toward the fire behind him and the grin is starting to slip.',
    'HIS FACE STAYS CLEAN: no fire, smoke, soot, embers or glow marks on his face or skin, or on anyone’s face.',
    'Every fire, smoke and ember effect stays on the glass column, the hall and the title, never on a face.',
    'BEHIND HIM, in the middle of the frame: a tall glass column erupting in white fire to the ceiling of a huge bright hall.',
    'A figure in a dark training jacket stands with their back to the viewer, one open palm flat on the burning glass, untouched by the flames.',
    'We never see their face: only their back, their shoulders and that one hand.',
    'From the other side, striding into the smoke instead of away from it: a tall, square-shouldered woman with close-cropped iron-grey hair',
    'in a long grey coat worn open over a black training shirt, sleeves shoved up, one hand reaching for the figure’s wrist, calm while everyone else runs.',
    'Around and above them, soft and secondary: a crowd in dark training jackets scattering, a viewing gallery, smoke and extinguisher foam.',
    'The screen above the column is cracked and dark, showing nothing.',
    'LIGHT: hard white fire-light from the column rims all three figures; cool steel-blue hall light everywhere else. Palette of white, charcoal, ember orange and steel blue.',
    'TITLE: the words RANK ZERO painted into the art in the upper third as a bold, slightly italic athletic logo, white with an ember-orange glow',
    'and a thin curl of smoke rising off the final O, spelled exactly RANK ZERO, large and legible at thumbnail size.',
    'No other text, numbers or lettering anywhere, including on the screen, the jackets and the patch.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const RANK_ZERO = StoryVersion.parse(raw);
