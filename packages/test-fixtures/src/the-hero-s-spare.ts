import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Hero's Spare" — the second person out of the summoning circle, and the
 * sword that is supposed to send them back.
 *
 * Slate #11. The bet is the summoning story told from the side door: the
 * kingdom got the hero it asked for, plus one more, and it has a three-hundred-
 * year-old procedure for the one more. So the opener is not a throne room and a
 * cheering crowd. It is a named woman with a sword at the player's throat, a
 * sandglass running, and a question the player has to answer in a minute. Talk,
 * show them a phone, refuse, fight, run, read the glowing writing nobody else
 * can see: every one of those is a route out of the first step, and so is
 * saying nothing and letting the sand run out.
 *
 * The playable span is the three days between the summoning and the third
 * dawn, when the circle has cooled enough to send somebody through. The
 * Burning King, Ruth Abara and the king's "fever" are backstory carried in
 * hard canon, items and what seven people will and will not say. What happens
 * after the third dawn — a march north, a new name in the river quarter, a bus
 * at 4:12 in the morning — lives in the endings.
 *
 * The power is real and it is not a stat block. The circle wrote a gift on the
 * hero's hand and wrote nothing on the player, and the player is the only
 * person in the kingdom who can read what it wrote on everything else. Reading
 * is free from turn one. Production's storyteller never reads resources, step
 * notes or locked abilities, so the power lives where it does read: hard
 * canon, the starting item The Circle's Script, and Read the Script in every
 * background's `startingAbilities`. Crossing a line out is gated behind finding out that
 * it can be done — Emeric's page, Ruth's margin or Wenna Holt's letter — and
 * the ability is granted by the quest step where that happens and kept
 * unusable by its flag until then (the checkpoint's "grant broadly, gate by
 * flag"). It costs the one thing nothing else in the world costs: how firmly
 * this world is holding on to you.
 *
 * Three variables, all invisible. Nerve is the only GOOD_HIGH, because
 * `resolveRest` refills those and a night's sleep in a cell is the honest thing
 * for that to mean. Scrutiny is first among the descending pair because
 * PUBLIC_VIOLENCE and the generic cost path both take the first GOOD_LOW in
 * array order, and a fight in a cathedral city making the church look harder
 * at you is exactly right. The Church of the Circle is first among the
 * factions for the same reason.
 */

const raw = {
  id: 'sv_the_hero_s_spare_1',
  storyId: 'story_the_hero_s_spare',
  version: 1,
  title: 'The Hero’s Spare',
  fantasyLabel: 'Summoned by mistake. Sent back by sword.',
  hook: 'The kingdom summoned a hero and got two. He gets a parade. You get a sword at your throat, one minute to explain yourself, and the only eyes in the city that can read the glowing writing on everything.',
  premise:
    'The kingdom of Corvane lights its summoning circle once in a generation, when the grey fog in the north starts moving again. The circle is supposed to pull one hero out of another world.\n\n' +
    'This morning it pulled two. One is Kai Brandt, a bike courier from your world, with a mark of light burning on the back of his hand. The other is you. Your hands are empty.\n\n' +
    'The church has a word for the second arrival: the spare. Spares are held in the cells under the cathedral for three days, until the circle cools, and sent back through it at the third dawn. The only way through is a sword. Nobody sent back has ever come back.\n\n' +
    'So you have three days in a city that has already decided what you are. The sergeant holding the sword gave you a minute she was not supposed to give. The hero is scared. The High Priestess is kind, and she keeps to a schedule.\n\n' +
    'Nobody here knows the other thing yet. Every enchanted object in the hall is covered in faint glowing writing: the locks, the blades, the circle, the mark on his hand. Nobody else can see it. You can read every word, including one line on his hand that should not be there.\n\n' +
    'Prove you are worth keeping, get out of the city, or find out why the circle called two before the third dawn comes.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Isekai', 'Fantasy', 'Adventure', 'Survival', 'Comedy'],
  mechanicsChips: [
    'You can read what nobody else sees',
    'A sword with a schedule',
    'Lie, fight, run or charm',
    'The hero is from your world',
    'Twelve ways the third dawn ends',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can talk your way out, fight your way out, hide in the river quarter under a new name, or stay in your cell and read. Every one of those is a whole game. The sergeant with the sword is not your enemy, the hero is not your rival unless you make him one, and the kindest person in the cathedral is the one scheduling your death.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'ring_hall',
    startWorldMinute: 7 * 60 + 52,
    startingItems: [
      { itemId: 'circle_script', qty: 1 },
      { itemId: 'your_phone', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is an adult from our world. Mira Holt is twenty-seven, High Priestess Odile Castine fifty-two, Emeric Dahl seventy-one, Crown Princess Ilsabet twenty-six, Severin Ashby thirty-eight and Bet Tallis fifty-eight, and Kai Brandt, at twenty-two, is the youngest person in the cast.',
      'This morning the summoning circle under the cathedral dome in Corvane’s capital pulled two people out of our world: Kai Brandt, whom it marked with a sun-shaped mark of light on the back of his right hand, and the player, whom it left unmarked.',
      'The church calls a second arrival a spare. Spares are held in the Warden Cells and returned through the circle by the sword at the third dawn after the summoning, because the circle must cool for three days before it can send anyone through. The morning of the summoning counts as the first dawn, so the Returning is at six in the morning on Day 3, two days after the summoning. Eleven spares have been returned in 331 years. The last was Ruth Abara, a bus driver from our world, fifty-one when she was returned forty-seven years ago.',
      'The player can see and read the circle’s script: faint gold writing on every enchanted thing, the locks, the oaths, the blades, the circle itself, Kai’s mark. Nobody else alive can see it. Reading takes looking and a moment; it is never instant and never a menu.',
      'The chalk ring in the Ring Hall carries the circle’s calling line, one gold sentence running round and round: Light of another sky, come down, and bring them here to stand. Under it, in the same hand and the same size, two names were written this morning: Kai Brandt’s and the player’s own. Nobody else can see them. Anyone who knows the old rite would know the second name means the circle made no mistake.',
      'Nobody in Corvane knows the player’s name until the player says it aloud in a scene, and nobody but the player can read it in the chalk. Until then everyone, the pronouncement included, calls the player the spare. After they hear it, Mira still says spare; she uses the name once, late, when something between them has changed, as if it costs her.',
      'A line of the script can be crossed out, and only the player can do it, but only once somebody or something has told them it can be done. It takes touch and a held breath. The church can feel it happen nearby, and every line crossed out loosens the player’s hold on this world a little more.',
      'The circle always calls two: a Hero to carry the light and a Witness, left unwritten so that nothing written can bind them. The first page of the original rite says so in three words, Two shall come. The church has hidden that page for three centuries; the Archivist, Emeric Dahl, keeps it.',
      'This morning High Priestess Odile Castine wrote a hidden line into Kai’s mark: The bearer shall raise no hand nor word against the Circle’s voice. The mark burns when he thinks about refusing her. He thinks it is nerves.',
      'Three hundred and thirty-one years ago the ninth hero, remembered as the Burning King, burned the old capital, Aubrel, for nine days, until his Witness read his mark and crossed it out. Dying, he spoke a writ of his own and never finished it: Let nothing move until. That unfinished sentence is the Stilling, a grey fog from the north that leaves whatever it covers motionless, warm and not dead.',
      'The king of Corvane is not ill. He rode north to see the fog two years ago and came back stilled. Crown Princess Ilsabet rules as regent, and the court is told he has a fever.',
      'Mira Holt will not strike in the first minute, whatever the player does, and nobody says why on turn one. At the end of the minute the High Priestess pronounces the Returning for the third dawn. A good answer changes how everyone treats the player; it does not cancel the schedule.',
    ],
    toneGuide:
      'Fast and funny under pressure. Short paragraphs, a line of dialogue, a beat, a question. The face at the top of a beat is whoever is pressing hardest on the player, which on turn one is Mira’s. ' +
      'The player’s own world matters here: a phone at nine per cent with a torch and a camera is a miracle, and so are a pen, germ theory, a boxer’s guard and an electrician’s sense of how a lock is wired. Let ordinary knowledge from home land as a surprise, and let the city react to it. ' +
      'The power is never an instant win. Reading needs looking. Crossing out needs touch, a breath and a cost, and somebody in a white robe feels it. ' +
      'Violence is swords and fists with no gore: a fight ends with somebody disarmed, down or yielding, and it always costs the player standing with someone. A player who attacks Mira, runs, lies or refuses gets a real consequence and a story that keeps going, never a wall. ' +
      'Romance may be flirtatious, tense and heartfelt and goes no further than a kiss; never fan service. ' +
      'Nobody is a cartoon. Odile is reasonable, Severin is grieving, Kai is scared, Ilsabet is honest about being dishonest, and Mira does her duty with her whole body and hates it with the rest of her. If the player wanders off, the city is full: market stalls, river barges, refugees at the north gate, and the clock still runs toward the third dawn. ' +
      'After the pronouncement the spare is walked down to the Warden Cells, held but not chained. Mira gives that order once. If the player refuses, stalls or sits down, two wardens lift them by the arms and carry them down the stair in that same beat, unhurt, and the scene goes on from the cell; nobody in this story repeats a threat they are not about to carry out. When a scene runs out of road, the first day has pressure ready: Kai talks his way past his guards to visit, because the player is the only person here from home, and repeats what Odile promised him as if testing whether it sounds true; Odile sends water with a kind question in it; at two in the afternoon Severin calls a Proving in the Wardens’ Yard; at five Kai is invested in the nave, and a player who can read sees which line on his hand lights up.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The sand is half gone.\n\nMira doesn’t look at it. She doesn’t need to.\n\n\"Thirty seconds, spare.\"\n\nYou look past her blade at the chalk. The lines aren’t chalk. Not all of them. Under the white there’s writing, thin and gold, running in a ring like a sentence that never ends.\n\nYou read it out loud.\n\nThe priestess on the steps stops turning her glass.\n\nMira’s sword doesn’t move. Her eyes do. To the steps. Back to you.\n\n\"Again,\" she says. \"Slower.\"",
      "Kai has his hood up in a cathedral and nobody has dared tell him to take it down.\n\n\"Okay,\" he says. \"So. Hypothetically. If the glowing hand thing says something. Like, words. Would you tell me?\"\n\nHe holds it out. The mark is warm enough to feel from a foot away.\n\nYou read the first line. Then the second.\n\nThe third one is newer than the others. The ink is still bright.\n\n\"Honestly,\" Kai says, \"your face is doing a thing.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 11, resolve: 12, arcana: 12 },
  skills: [
    { id: 'script', name: 'Script', attribute: 'arcana', description: 'Reading the circle’s glowing writing on a thing or a person: what it binds, who wrote it, and what it is waiting for.' },
    { id: 'fast_talk', name: 'Fast Talk', attribute: 'presence', description: 'Talking your way through a room that has already decided about you.' },
    { id: 'fine_print', name: 'Fine Print', attribute: 'mind', description: 'Finding the clause in an oath, a rite or an order that somebody hoped nobody would read.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'A level voice and still hands with a blade a finger’s width from your throat.' },
    { id: 'first_aid', name: 'First Aid', attribute: 'mind', description: 'Clean it, close it, keep them talking. Medicine from a world that has heard of germs.' },
    { id: 'tinkering', name: 'Tinkering', attribute: 'mind', description: 'Locks, hinges, lamps and a phone at nine per cent, made to do something they were not built for.' },
    { id: 'brawling', name: 'Brawling', attribute: 'might', description: 'Fists, footwork and a guard, against people trained with swords.' },
    { id: 'sneaking', name: 'Sneaking', attribute: 'agility', description: 'Being somewhere else before anybody has finished turning round.' },
  ],
  /**
   * Three, all invisible.
   *
   * Nerve is GOOD_HIGH because `resolveRest` restores those, and because three
   * days with a date at the end of them genuinely wear somebody down. It is
   * what the generic cost path spends, which is right: the price of a bad
   * exchange here is that you have less of yourself left for the next one.
   *
   * Scrutiny is how hard the church is looking. It decays on its own if the
   * player keeps their head down, and every public act of reading, fighting or
   * crossing out raises it. Loosening is the price of the one power the player
   * has that nobody else does, and it barely comes back down: the world takes
   * a Witness back slowly, if at all.
   */
  resources: [
    {
      id: 'nerve',
      name: 'Nerve',
      max: 100,
      start: 72,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is running on nothing. Words come out late and flat, hands shake when they hold anything, and the next person with a blade or a bargain gets agreement because agreeing is easier than thinking. Sleep, food or one kind face is the correct move.',
      color: '#D98E48',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes. The player answers in single words, misses the second meaning in what people say, and agrees to things to make a conversation stop. This is the band where a sergeant’s question sounds like a sentence being passed, and where lying down on the cell bench is genuinely the strongest move available.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary wear of a day spent being looked at as a mistake. Good for one hard conversation or one risk, honest about not being good for both. The jokes still come, a beat later and with an edge on them. Nobody needs to remark on it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'Steady. The player has room to be curious, to read a whole line instead of half of one, to make the priestess laugh by accident and the sergeant almost smile. Scenes can be long and can go somewhere, and a sword at the throat is a problem to solve rather than the end of the world.',
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
        'The church has filed the spare under paperwork. Guards change shifts without looking in, the cell door is checked once a night instead of twice, and nobody in white remembers to ask where the player was this afternoon.',
      color: '#C9B458',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The spare is a scheduled problem and nothing more. One warden on the corridor, meals on time, doors locked by habit. A quiet player can be almost anywhere in the cathedral for an hour before anybody counts heads, and the Circle Guard has better things to watch.',
        },
        {
          upTo: 55,
          behaviour:
            'Somebody has noticed something. A second warden on the stair, a novice who happens to be sweeping wherever the player goes, Severin asking Mira questions in a voice meant to carry. The High Priestess sends water and a kind message, and the message has a question in it.',
        },
        {
          upTo: 80,
          behaviour:
            'The church is actively watching. The cell is searched while the player is out of it, the Circle Guard walks the nave in pairs, and doors that were open yesterday are chained. Odile starts making arrangements that do not need the wardens, and Severin starts arriving early to everything.',
        },
        {
          upTo: 100,
          behaviour:
            'The church has decided the spare is the fog wearing a stranger’s face. Severin has a writ to move the Returning forward, the bells ring for a public rite, and every guard in white knows the player’s face. Getting anywhere now means being seen getting there.',
        },
      ],
    },
    {
      id: 'loosening',
      name: 'Loosening',
      max: 100,
      start: 4,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'This world holds the player the way it holds anybody: footprints in the dust, a shadow at the right length, a name that stays put in people’s mouths.',
      color: '#9FB6CC',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Barely a thing. A candle leans toward the player for a moment, a dog in the market will not settle near them, a bell rope swings when nobody has touched it. Only Emeric would notice, and he would write it down with delight.',
        },
        {
          upTo: 50,
          behaviour:
            'The world has started to let go at the edges. Doors forget to stay shut behind the player, a warden has to look twice to find them in an empty cell, and people stumble over the player’s name as if it were in a language they half know. Reflections are a breath late.',
        },
        {
          upTo: 80,
          behaviour:
            'The player is coming loose. Footsteps make no sound on stone, the cold does not reach them, and anyone who touches their hand flinches and cannot say why. At night they can hear, very faintly, traffic and rain from somewhere much farther away than the river.',
        },
        {
          upTo: 100,
          behaviour:
            'Almost gone from here. Light goes slightly through the player’s fingers at the edges, the circle’s script on everything turns toward them like flowers toward a window, and one more line crossed out may send them home whether they want to go or not. Mira can no longer tell, by touch, whether they are there.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'circle_script',
      name: 'The Circle’s Script',
      tags: ['quest', 'power'],
      questItem: true,
      droppable: false,
      description:
        'Faint gold writing on every enchanted thing in this world: the locks, the oaths, the blades, the chalk ring, the mark on the hero’s hand. You are the only person alive who can see it. Look at a line long enough and it comes clear: what it binds, who wrote it and what it is waiting for.',
      loreText:
        'Reading takes a long look and a moment of quiet. Nothing appears in the air, and nobody else can tell you are doing it unless you say the words out loud. A line can also be crossed out, with a fingertip and a held breath, but nothing in this world has told you so yet. When it happens the church feels it nearby, and every line crossed out loosens this world’s hold on you a little more.',
      icon: 'eye',
    },
    {
      id: 'your_phone',
      name: 'Your Phone',
      tags: ['quest', 'personal', 'home'],
      questItem: true,
      skillModifiers: { tinkering: 1 },
      description: 'Nine per cent battery, no signal, a cracked corner. A torch, a camera, three hundred photographs of home and one song downloaded for offline. In this city it is the brightest light anybody has ever seen held in a hand.',
      loreText: 'Every hour it is on, it loses a per cent. Nobody here has a way to charge it, though an electrician might think of one, and a river fixer would give a great deal for it.',
      icon: 'phone',
    },
    {
      id: 'first_aid_kit',
      name: 'Pocket First-Aid Kit',
      tags: ['medical', 'home'],
      skillModifiers: { first_aid: 1 },
      description: 'A zipped work pouch, still clipped to your scrubs: gloves, gauze, tape, antiseptic wipes, a foil blanket and two painkillers in a blister pack.',
      loreText: 'The antiseptic smell alone makes the cathedral infirmary sisters stop and stare.',
      icon: 'medkit',
    },
    {
      id: 'multitool',
      name: 'The Multitool',
      tags: ['tool', 'home'],
      skillModifiers: { tinkering: 1 },
      description: 'Pliers, a wire stripper, two screwdrivers and a blade too short to frighten anybody. It was in your work trousers when the circle took you.',
      loreText: 'The steel is better than anything forged in Corvane, and a smith in the market will say so out loud.',
      icon: 'tools',
    },
    {
      id: 'ballpoint_pen',
      name: 'A Ballpoint Pen',
      tags: ['tool', 'home'],
      skillModifiers: { fine_print: 1 },
      description: 'Blue, clicky, half full, stolen from a courtroom. It writes without being dipped in anything, which in this city is a small miracle.',
      loreText: 'The circle’s script does not show on its ink. Whatever you write with it is only ever yours.',
      icon: 'pen',
    },
    {
      id: 'hand_wraps',
      name: 'Hand Wraps',
      tags: ['gear', 'home'],
      skillModifiers: { brawling: 1 },
      description: 'Two lengths of grey cotton, washed soft, rolled and stuffed in a hoodie pocket. You wrap your hands without thinking about it.',
      loreText: 'The wardens have never seen anybody prepare their hands for a fight before the fight, and two of them want to learn.',
      icon: 'cloth',
    },
    {
      id: 'chalk_stub',
      name: 'Circle Chalk',
      tags: ['curio'],
      skillModifiers: { script: 1 },
      description: 'A stub of the white chalk the circle was drawn with, still warm. Under the white, a thread of gold writing runs round it, too small for anybody but you to see.',
      loreText: 'The words on it are the last six of the calling line: and bring them here to stand.',
      icon: 'chalk',
    },
    {
      id: 'cell_keys',
      name: 'The Cell Keys',
      tags: ['key'],
      description: 'Nine iron keys on a warden’s ring, one per cell. On every one, in gold only you can read: Keep shut until the third dawn.',
      loreText: 'The ring has been carried by a Holt for six generations. The ninth key is newer than the others, and was cut forty-seven years ago.',
      icon: 'key',
    },
    {
      id: 'first_page',
      name: 'The First Page',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { script: 2 },
      description: 'One sheet of the original rite, older than the cathedral, in a hand nobody has written for three hundred years. It begins with three words: Two shall come.',
      loreText: 'The rest says one shall bear the light and one shall read it, and that the reader is left unwritten so nothing written can bind them. A later hand has scraped at the margin, tried to burn one corner, and stopped.',
      icon: 'scroll',
    },
    {
      id: 'book_of_returnings',
      name: 'The Book of Returnings',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A ledger bound in grey leather: eleven names over 331 years, each with a date, a dawn and the name of the warden who held the blade. The last entry is in a junior clerk’s shaking hand.',
      loreText: 'In the margin of the last entry, in pencil and in the alphabet of our world, Ruth Abara wrote: A Witness who crosses their own name out of the calling line goes home alive and whole. Tell the next one. She never got the chance to try.',
      icon: 'book',
    },
    {
      id: 'sparrow_jar',
      name: 'The Sparrow in the Jar',
      tags: ['quest', 'curio'],
      questItem: true,
      description: 'A sparrow under glass on an Archive shelf, caught at the top of a wingbeat forty-seven years ago and still warm. Writing covers it like frost, and the writing is not the circle’s hand.',
      loreText: 'Emeric found it on the Archive windowsill the morning after Ruth’s Returning. The words on it are the fog’s own: Let nothing move until, and then nothing at all.',
      icon: 'jar',
    },
    {
      id: 'wenna_letter',
      name: 'Wenna Holt’s Letter',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description: 'A letter folded into eighths, soft from handling, addressed To whichever Holt holds the blade next. It is hidden behind the third bell in the tower.',
      loreText: 'She could read the circle. She read it to me while I held the blade, and I did it anyway. It can be crossed out, she said, if you know which line. Do not let them do it again.',
      icon: 'letter',
    },
    {
      id: 'sunwake',
      name: 'Sunwake',
      tags: ['weapon'],
      equipSlot: 'hand',
      attributeModifiers: { might: 1 },
      description: 'The hero’s sword, gold-hilted and too heavy for anybody who has spent four years on a bike. It has a name. The script on the blade says: Strike only where the Circle points.',
      loreText: 'Kai keeps forgetting it in chairs. He has named the sheath Kevin.',
      icon: 'sword',
    },
    {
      id: 'practice_sword',
      name: 'A Practice Sword',
      tags: ['weapon'],
      equipSlot: 'hand',
      description: 'A blunted warden’s drill blade from the rack in the yard, notched along both edges and heavier at the tip than it looks.',
      loreText: 'No script on it at all. The wardens prefer it that way for training, and so, it turns out, do you.',
      icon: 'sword',
    },
    {
      id: 'honey_bun',
      name: 'Honey Bun',
      tags: ['food'],
      stackable: true,
      maxStack: 3,
      consumable: { resourceId: 'nerve', amount: 8, consumesItem: true },
      description: 'A sticky bun from the stall at the corner of Lantern Market, still warm, wrapped in a square of waxed paper.',
      loreText: 'Emeric buys one every day at noon and calls it research.',
      icon: 'bread',
    },
    {
      id: 'pilgrim_cloak',
      name: 'A Pilgrim’s Cloak',
      tags: ['clothing', 'disguise'],
      skillModifiers: { sneaking: 2 },
      description: 'Undyed grey wool with a deep hood, the kind the pilgrims buy by the hundred to stand in the nave. In one, you look like nobody.',
      loreText: 'The stallholder does not ask questions and charges double for not asking them.',
      icon: 'cloak',
    },
    {
      id: 'regent_pass',
      name: 'The Regent’s Pass',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A square of stiff card with the crown’s seal and the regent’s own signature: let the bearer through the north gate and onto the north road.',
      loreText: 'Ilsabet signs eleven of these a week and remembers every one. The seal’s script reads: The bearer goes where the crown would go.',
      icon: 'pass',
    },
  ],
  abilities: [
    {
      id: 'read_the_script',
      name: 'Read the Script',
      tags: ['sight'],
      description: 'Look at an enchanted thing, or a marked person, until the gold writing on it comes clear, and read what it binds, who wrote it and what it is waiting for.',
      affordances: ['read the writing', 'read the circle', 'read it', 'read the script', 'read his hand', 'read the lock', 'what does it say', 'look at the writing', 'read the chalk'],
      costs: [{ resourceId: 'nerve', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'script', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_it_aloud',
      name: 'Read It Aloud',
      tags: ['social'],
      description: 'Say, in front of witnesses, exactly what the writing on something says, and let the room find out who else already knew.',
      affordances: ['read it aloud', 'read it out loud', 'say what it says', 'announce it', 'tell everyone', 'read it to the room', 'read the page aloud'],
      costs: [
        { resourceId: 'nerve', amount: 6 },
        { resourceId: 'scrutiny', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_fast',
      name: 'Talk Fast',
      tags: ['social'],
      description: 'Talk your way through a room that has already decided about you, with whatever is true and some of what is not.',
      affordances: ['talk my way out', 'convince her', 'persuade', 'lie', 'bluff', 'make something up', 'sweet talk', 'charm', 'argue'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'fast_talk', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'find_the_clause',
      name: 'Find the Clause',
      tags: ['sight'],
      description: 'Go through an oath, an order, a rite or a deal line by line and find the part somebody hoped nobody would read.',
      affordances: ['read the oath', 'check the terms', 'find the loophole', 'read the small print', 'read the order', 'what does the rite say', 'go through the deal'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'fine_print', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'patch_them_up',
      name: 'Patch Them Up',
      tags: ['healing'],
      description: 'Clean a wound, cool a burn, set a finger, and keep the person talking while you do it.',
      affordances: ['treat his hand', 'patch him up', 'bandage it', 'clean the wound', 'look at the burn', 'first aid', 'help him', 'tend to her'],
      costs: [{ resourceId: 'nerve', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'first_aid', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'jury_rig',
      name: 'Rig It',
      tags: ['utility'],
      description: 'Make a lock, a hinge, a lamp or a phone at nine per cent do something it was never built to do.',
      affordances: ['pick the lock', 'fix it', 'rig it', 'jam the door', 'take it apart', 'charge the phone', 'open the lock', 'tinker'],
      costs: [{ resourceId: 'nerve', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'tinkering', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'throw_hands',
      name: 'Throw Hands',
      tags: ['offensive'],
      description: 'Fists and footwork against somebody trained with a sword. It works best once, on somebody who did not expect it.',
      affordances: ['punch', 'throw a punch', 'hit him', 'hit her', 'box', 'take a swing', 'fight back', 'jab', 'tackle'],
      costs: [
        { resourceId: 'nerve', amount: 10 },
        { resourceId: 'scrutiny', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawling', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_your_head',
      name: 'Keep Your Head',
      tags: ['defensive'],
      description: 'Stay still with a blade at your throat, keep your voice level, and refuse to perform for anybody.',
      affordances: ['stay calm', 'keep still', 'refuse', 'say nothing', 'stare her down', 'hold my ground', 'do not answer', 'stand firm'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Be gone from a room, a corridor or a crowd before anybody has finished turning round.',
      affordances: ['run', 'sneak out', 'slip away', 'escape', 'make a break for it', 'hide in the crowd', 'get out of here', 'lose them'],
      costs: [{ resourceId: 'nerve', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'sneaking', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'show_them_home',
      name: 'Show Them Home',
      tags: ['utility'],
      description: 'Use your phone: switch on the torch, show a photograph, play the one song. A small miracle with a battery.',
      affordances: ['use my phone', 'switch on the torch', 'show them a photo', 'play the song', 'take a picture', 'show her my phone', 'hold up my phone'],
      costs: [{ resourceId: 'nerve', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_them_company',
      name: 'Keep Them Company',
      tags: ['social'],
      description: 'Do not argue, do not run and do not fix anything. Sit down next to the person and be there.',
      affordances: ['sit with him', 'sit with her', 'stay with them', 'keep him company', 'just listen', 'wait with her', 'share the bun'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cross_it_out',
      name: 'Cross It Out',
      tags: ['utility'],
      description: 'Lay a finger on one line of the gold writing and strike it through. What it bound lets go, and so does a little of this world’s hold on you.',
      affordances: ['cross it out', 'strike it through', 'unwrite it', 'cross out the line', 'erase the line', 'free his hand', 'cross out my name'],
      costs: [
        { resourceId: 'nerve', amount: 12 },
        { resourceId: 'loosening', amount: 15 },
        { resourceId: 'scrutiny', amount: 6 },
      ],
      cooldownMinutes: 60,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'script', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:how_to_cross_out'],
        lockedCopy: 'You can read every line. Nothing you have found yet says a line can be unwritten, or what it would cost the person who did it.',
      },
    },
  ],
  locations: [
    {
      id: 'ring_hall',
      name: 'The Ring Hall',
      shortName: 'Ring Hall',
      description:
        'A round chamber under the cathedral dome, cold as a well. A ring of chalk thirty feet across is cut into the floor and is still smoking. Steps climb to a gallery where the High Priestess stands to turn her sandglass. Under the white chalk, a sentence of gold writing runs round and round. Tall doors open onto the nave; a narrow stair at the back goes down to the Warden Cells.',
      artDirection:
        'Circular stone summoning chamber beneath a vast cathedral dome, a wide ring of white chalk smoking on the floor with faint gold script glowing inside the lines, shafts of dawn light from high windows, stone steps up to a gallery, tall arched doors. Cold blues, chalk white, thin gold.',
      connections: [
        { to: 'cathedral_nave', travelMinutes: 2, label: 'Through the tall doors to the nave' },
        { to: 'warden_cells', travelMinutes: 3, label: 'Down the narrow stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'chalk_stub', qty: 1, ownerId: null, aka: ['chalk', 'the chalk', 'a piece of chalk', 'the stub'] },
      ],
    },
    {
      id: 'cathedral_nave',
      name: 'The Cathedral Nave',
      shortName: 'The Nave',
      description:
        'The long body of the cathedral: four hundred candles, pilgrims in grey cloaks packed shoulder to shoulder, the Circle Guard in white at every pillar, and a gilded dais where the hero will take his oath at five. From here a door leads back to the Ring Hall, a side arch to the Archive stairs, a guarded corridor to the Hero’s Rooms, a spiral stair up the Bell Tower, and the great west doors out into Lantern Market.',
      artDirection:
        'Immense gothic cathedral nave, rows of candles, crowds of pilgrims in grey hooded cloaks, guards in white tabards with gold circles at the pillars, a gilded dais under stained glass. Warm candle gold against cold stone.',
      connections: [
        { to: 'ring_hall', travelMinutes: 2, label: 'Back to the Ring Hall' },
        { to: 'archive', travelMinutes: 4, label: 'The side arch to the Archive' },
        { to: 'hero_rooms', travelMinutes: 3, label: 'The guarded corridor to the hero’s rooms' },
        { to: 'bell_tower', travelMinutes: 6, label: 'Up the spiral stair' },
        { to: 'lantern_market', travelMinutes: 3, label: 'Out through the west doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'warden_cells',
      name: 'The Warden Cells',
      shortName: 'The Cells',
      description:
        'Nine cells cut into the rock under the cathedral, dry and swept, with a cot, a blanket and a slot in each door. On the wall of the ninth, eleven tally marks have been scratched by eleven different hands. Every lock carries a line of gold writing only you can see. The stair climbs back to the Ring Hall, and an iron door at the far end lets out into the Wardens’ Yard.',
      artDirection:
        'Clean stone cells beneath a cathedral, iron doors with small grilles, a lantern on a hook, a narrow cot, eleven scratched tally marks on a wall, faint gold script glowing on each lock. Close, quiet, lamplit.',
      connections: [
        { to: 'ring_hall', travelMinutes: 3, label: 'Up the stair to the Ring Hall' },
        { to: 'wardens_yard', travelMinutes: 2, label: 'Through the iron door to the yard' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'cell_keys', qty: 1, ownerId: 'mira', aka: ['keys', 'the keys', 'her keys', 'the key ring', 'the cell keys'] },
      ],
    },
    {
      id: 'wardens_yard',
      name: 'The Wardens’ Yard',
      shortName: 'The Yard',
      description:
        'A walled drill yard behind the cathedral where the Circle Wardens train, eat and sleep in a long barracks. A rack of blunted swords, a water trough, a chalk ring for sparring, and at two in the afternoon whatever trial Severin has decided the spare should face. The iron door leads back down to the cells, and a postern gate opens onto Lantern Market.',
      artDirection:
        'Sunlit walled training yard behind a cathedral, a rack of practice swords, a sparring ring scuffed into packed earth, a long barracks with red-sashed guards on its steps, a water trough. Dusty gold afternoon.',
      connections: [
        { to: 'warden_cells', travelMinutes: 2, label: 'Back down to the cells' },
        { to: 'lantern_market', travelMinutes: 4, label: 'The postern gate to the market' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'practice_sword', qty: 1, ownerId: null, aka: ['practice sword', 'a blunt sword', 'a drill blade', 'one from the rack'] },
      ],
    },
    {
      id: 'archive',
      name: 'The Archive',
      shortName: 'Archive',
      description:
        'Six floors of shelves around a shaft of light, connected by ladders on rails, smelling of dust and lamp oil. The Archivist’s desk is at the bottom under a drift of folios. A locked case holds one sheet of paper. On a shelf by the window, a sparrow under glass has been caught mid-wingbeat for forty-seven years. The only way out is the side arch back to the nave.',
      artDirection:
        'Towering circular archive, six floors of bookshelves around a central light well, rolling ladders, an old desk buried in papers, a glass case holding a single page, a small bird frozen in flight inside a jar on a sunlit shelf. Dust motes and amber lamplight.',
      connections: [{ to: 'cathedral_nave', travelMinutes: 4, label: 'Back through the side arch' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'first_page', qty: 1, ownerId: 'emeric', aka: ['the page', 'the first page', 'the sheet in the case', 'the old page'] },
        { itemId: 'book_of_returnings', qty: 1, ownerId: 'emeric', aka: ['the ledger', 'the book of returnings', 'the grey book', 'the record'] },
        { itemId: 'sparrow_jar', qty: 1, ownerId: 'emeric', aka: ['the jar', 'the sparrow', 'the bird', 'the frozen bird'] },
      ],
    },
    {
      id: 'hero_rooms',
      name: 'The Hero’s Rooms',
      shortName: 'Hero’s Rooms',
      description:
        'Three gilded rooms off a guarded corridor, built for heroes and used once a generation: a bed the size of a hay cart, a bath nobody has filled, a table of food Kai has not touched, and a portrait of the ninth hero turned to face the wall. Two Circle Guards on the door. The corridor is the only way back to the nave.',
      artDirection:
        'Opulent gilded state room, a long table of untouched food, a large portrait leaning face to the wall, a square delivery backpack dropped by the door, a sword in a gold scabbard abandoned on a chair. Rich gold and cream, lonely.',
      connections: [{ to: 'cathedral_nave', travelMinutes: 3, label: 'Back along the guarded corridor' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'sunwake', qty: 1, ownerId: 'kai', aka: ['his sword', 'the hero’s sword', 'sunwake', 'the gold sword'] },
      ],
    },
    {
      id: 'bell_tower',
      name: 'The Bell Tower',
      shortName: 'Bell Tower',
      description:
        'Two hundred and twelve steps up from the nave, three of which creak. Five bells, a ledge with the whole city below it, wind, pigeons, and a sergeant’s cloak folded on a beam where somebody comes to be alone. Behind the third bell, something has been tucked into a crack in the stone. The stair is the only way down.',
      artDirection:
        'Top of a cathedral bell tower at dusk, five great bronze bells, a stone ledge with a sprawling lamplit city far below, a red cloak folded on a wooden beam, wind and pigeons. Deep blue and copper.',
      connections: [{ to: 'cathedral_nave', travelMinutes: 6, label: 'Down the spiral stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'wenna_letter', qty: 1, ownerId: 'mira', aka: ['the letter', 'the folded letter', 'what is behind the bell', 'her grandmother’s letter'] },
      ],
    },
    {
      id: 'lantern_market',
      name: 'Lantern Market',
      shortName: 'The Market',
      description:
        'The square in front of the cathedral and the streets that run off it: paper lanterns strung between houses, a honey-bun stall, a pilgrims’ cloak seller, a notice board with the church’s seal on every sheet, and a crowd that has already heard there were two. From here the west doors lead back into the nave, a lane runs round to the Wardens’ Yard, the hill climbs to the palace and its Long Gallery, steps drop to the river at Tallow Row, and the north road runs to the North Gate.',
      artDirection:
        'Bustling fantasy market square before a great cathedral, strings of paper lanterns between timber houses, a bakery stall, racks of grey cloaks, a notice board, crowds in bright cloth. Warm lantern orange, busy, alive.',
      connections: [
        { to: 'cathedral_nave', travelMinutes: 3, label: 'Back in through the west doors' },
        { to: 'wardens_yard', travelMinutes: 4, label: 'Round the lane to the yard' },
        { to: 'long_gallery', travelMinutes: 10, label: 'Up the hill to the palace' },
        { to: 'tallow_row', travelMinutes: 8, label: 'Down the river steps' },
        { to: 'north_gate', travelMinutes: 15, label: 'Along the north road to the gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'honey_bun', qty: 3, ownerId: null, aka: ['a bun', 'a honey bun', 'something to eat', 'a pastry'] },
        { itemId: 'pilgrim_cloak', qty: 1, ownerId: null, aka: ['a cloak', 'a grey cloak', 'a pilgrim cloak', 'a disguise'] },
      ],
    },
    {
      id: 'long_gallery',
      name: 'The Long Gallery',
      shortName: 'The Palace',
      description:
        'The palace’s great gallery, where the regent holds standing court because there are no chairs. Portraits of twenty heroes line one wall; the ninth has been painted over grey. Clerks, petitioners, a fencing foil left on a window seat, and a desk with a stack of signed passes for the north road. The hill road is the only way back down to the market.',
      artDirection:
        'Long palace gallery with tall windows, a long row of large portraits on one wall with one near the middle painted over flat grey, clerks with ledgers, a fencing foil on a window seat, a desk stacked with sealed passes. Cool silver light, polished floor.',
      connections: [{ to: 'lantern_market', travelMinutes: 10, label: 'Down the hill to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'regent_pass', qty: 1, ownerId: 'ilsabet', aka: ['a pass', 'the pass', 'a signed pass', 'a travel pass'] },
      ],
    },
    {
      id: 'tallow_row',
      name: 'Tallow Row',
      shortName: 'Tallow Row',
      description:
        'The river quarter: candle works, eel smokehouses, barges tied three deep, and narrow lanes where nobody writes anything down. People come here to stop existing and start again under another name. Bet Tallis’s smokehouse has a blue door and a back room. The river steps climb back up to Lantern Market.',
      artDirection:
        'Crowded riverside slum of leaning timber houses, smokehouses with eels hanging in the haze, barges moored three deep, a blue door in a narrow lane, laundry lines, lantern light on dark water. Smoky, warm, secretive.',
      connections: [{ to: 'lantern_market', travelMinutes: 8, label: 'Up the river steps to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'north_gate',
      name: 'The North Gate',
      shortName: 'North Gate',
      description:
        'The city’s north wall and its one gate, where refugees from the fog come in and soldiers go out. Carts of bedding, a queue that does not move, a captain checking passes, and beyond the arch the north road running four hours straight to the edge of the fog. Without the regent’s pass, or the army marching, nobody goes out that way. The north road leads back to Lantern Market.',
      artDirection:
        'Massive stone city gate on a grey morning, a queue of refugees with carts and bundles coming in, soldiers in ranks waiting to go out, a guard captain checking papers, a straight road vanishing toward a wall of pale fog on the horizon. Muted, tense.',
      connections: [
        { to: 'lantern_market', travelMinutes: 15, label: 'Back along the north road' },
        { to: 'edge_of_stilling', travelMinutes: 240, lockedByFlag: 'north_road_open', label: 'Out onto the north road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'edge_of_stilling',
      name: 'The Edge of the Stilling',
      shortName: 'The Fog',
      description:
        'Four hours north, where the grey begins. A village caught mid-morning: smoke standing in the air like a rope, a dog in mid-leap, a woman with a bucket tipped and the water hanging out of it. Everything is warm. Everything is covered in writing, and none of it is the circle’s hand. The north road runs back to the North Gate.',
      artDirection:
        'A village frozen inside a pale grey fog, chimney smoke standing perfectly still, a dog suspended mid-leap, water hanging motionless from a tipped bucket, faint silver script covering every surface. Silent, uncanny, beautiful, not frightening.',
      connections: [{ to: 'north_gate', travelMinutes: 240, label: 'Back down the north road' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_church',
      name: 'The Church of the Circle',
      description:
        'High Priestess Odile Castine, the Circle Guard under Knight-Captain Severin Ashby, and every priest, novice and infirmary sister in the cathedral. They light the circle, invest the hero, and return the spare. They believe, most of them sincerely, that a second arrival is a hollow echo sent by the fog.',
      startingReputation: -15,
      ranks: [
        { atReputation: -100, label: 'The fog’s echo' },
        { atReputation: -30, label: 'The spare' },
        { atReputation: 10, label: 'A curiosity' },
        { atReputation: 40, label: 'A witness they cannot ignore' },
      ],
      allies: ['faction_wardens'],
      enemies: [],
    },
    {
      id: 'faction_wardens',
      name: 'The Circle Wardens',
      description:
        'Twenty soldiers in red sashes under Sergeant Mira Holt who keep the cells, guard the circle and hold the blade at a Returning. The duty has been a Holt’s for six generations. They are older than the Circle Guard, poorer, and quietly tired of being the ones who do it.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A prisoner' },
        { atReputation: 25, label: 'The one in cell nine' },
        { atReputation: 50, label: 'One of the yard' },
      ],
      allies: ['faction_church'],
      enemies: [],
    },
    {
      id: 'faction_crown',
      name: 'The Crown',
      description:
        'Crown Princess Ilsabet, acting regent, her clerks and the army. The crown needs the hero to win in the north and the church to lose in the capital, and it is very short of proof about what the church does to heroes.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'A rumour' },
        { atReputation: 20, label: 'An asset' },
        { atReputation: 45, label: 'The regent’s reader' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_tallow',
      name: 'Tallow Row',
      description:
        'The river quarter and the people who run it: smokehouse keepers, bargemen, forgers and Bet Tallis, who sells new names. They owe the church nothing, hide whoever pays, and remember everybody who did not.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A stranger with good shoes' },
        { atReputation: 20, label: 'A paying customer' },
        { atReputation: 45, label: 'One of ours' },
      ],
      allies: [],
      enemies: ['faction_church'],
    },
  ],
  characters: [
    {
      id: 'mira',
      name: 'Mira Holt',
      calledName: 'Mira',
      role: 'Sergeant of the Circle Wardens, and the sword that is supposed to send you back',
      cardBlurb:
        'She had the blade moving before you finished arriving, stopped it a finger’s width from your throat, and gave you a minute nobody authorised. She calls you spare, and at the third dawn she is the one who has to lift the sword.',
      pronouns: 'she/her',
      publicTraits: ['Counts everything out loud', 'Does her duty with her whole body', 'Will not be thanked'],
      hiddenDrives: [
        'She wants one honest reason to stop the Returning that she can say out loud in front of the High Priestess',
        'She wants to know whether her hands stopped the sword this morning, or she did',
      ],
      values: ['A duty done all the way or not at all', 'Saying the number, not the feeling', 'The wardens under her coming home'],
      fears: [
        'Lifting the blade at the third dawn and finding her hands do it without her',
        'Being the seventh Holt to write a name in the Book of Returnings',
      ],
      socialStyle:
        'Stands between you and the door without seeming to choose to. Asks one question, waits, asks it again with fewer words. Shows care by checking locks twice and bringing food she says was spare.',
      boundaries: [
        'Will not lie to you about the schedule. She will tell you the hour of your Returning to the minute if you ask',
        'Will not be thanked for the minute, and goes cold if you try',
        'Will not let a warden be punished for anything she did',
      ],
      goals: ['Get the spare to the third dawn without anybody hurt before it', 'Find out what the spare read in the chalk'],
      secrets: [
        {
          id: 'mira_the_letter',
          fact: 'Her grandmother, Wenna Holt, then forty-three, held the blade at the last Returning, forty-seven years ago, and left a letter: She could read the circle. She read it to me while I held the blade, and I did it anyway. It can be crossed out, she said, if you know which line. Do not let them do it again. Mira keeps it behind the third bell in the tower.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to you in the bell tower at night if she trusts you, or you find it behind the third bell yourself, and she knows the moment she sees your face.',
        },
        {
          id: 'mira_the_minute',
          fact: 'Protocol says nobody speaks to a second arrival: it is hooded, gagged and taken straight to the cells, because the church holds that the fog learns voices. She stopped her blade and asked a question instead, with the sword already moving, because of the letter. Odile turned her sandglass rather than shame a warden in front of the hero, and neither of them has mentioned it since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it only after you have read something to her that turned out true, and only in fewer than ten words.',
        },
      ],
      speechStyle:
        'Short declaratives and numbers. Counts seconds, guards, stairs, cells. Calls you spare until something changes, then uses your name once as if it costs her. Gallows humour delivered without a smile.',
      topics: ['the Returning', 'the third dawn', 'the cells', 'her grandmother', 'the minute', 'the wardens', 'the bell tower'],
      voiceSamples: [
        'One minute. What are you good for?',
        'Forty seconds, spare. You’re spending them staring at my sword.',
        'Nine cells. Eleven marks on that wall. I counted them on my first night here. I count them every night since.',
        'Don’t thank me. I stopped a blade. Half a job. Six generations of Holts and not one of us has done half a job.',
        'Two hundred and twelve steps. Three creak. Step over the fourth, the ninetieth and the last.',
      ],
      appearance:
        'Twenty-seven, tall and square-shouldered, black hair cropped at the neck, a pale scar through the left eyebrow, grey steel half-plate under a red sergeant’s sash, scarred knuckles.',
      visualHook: 'A red sergeant’s sash over grey half-plate, and a sword held level and perfectly still.',
      silhouette: 'Feet planted, sword arm straight out, the blade a level line at throat height.',
      artSeed: 'ths-mira-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'wry', 'guarded', 'surprised', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'warden_cells', activity: 'on the night watch outside the cells, counting the hours aloud' },
        { startMinute: 360, endMinute: 720, locationId: 'ring_hall', activity: 'on duty at the circle, sword across her knees' },
        { startMinute: 720, endMinute: 900, locationId: 'wardens_yard', activity: 'drilling the wardens in the yard' },
        { startMinute: 900, endMinute: 1140, locationId: 'warden_cells', activity: 'checking every lock on the corridor, twice' },
        { startMinute: 1140, endMinute: 1320, locationId: 'bell_tower', activity: 'alone in the bell tower, where nobody else climbs' },
        { startMinute: 1320, endMinute: 1440, locationId: 'warden_cells', activity: 'back on the night watch with a cup of something cold' },
      ],
      homeLocationId: 'warden_cells',
      knowledgeScope: ['the_returning', 'the_wardens', 'the_cells', 'wenna_holt', 'ruth_abara', 'the_circle'],
      startingRelationship: { trust: 10, affection: 0, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mira_says_your_name',
          label: 'She calls you by your name instead of spare',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'mira_shows_the_tower',
          label: 'She takes you up the bell tower',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['first_day_over'] },
        },
        {
          id: 'mira_kiss',
          label: 'In the tower, she stops counting',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 55, flagsSet: ['knows:why_she_stopped'] },
        },
      ],
      attributes: { might: 15, agility: 13, mind: 11, presence: 12, resolve: 16, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 42, defenseDc: 16, damage: 8, tags: ['warden', 'sword'] },
    },
    {
      id: 'kai',
      name: 'Kai Brandt',
      role: 'The hero the circle marked: a bike courier from your world, taken mid-delivery',
      cardBlurb:
        'He is from your world, he got the glowing hand and the parade, and he has not yet asked what the sword is for. He could be your rival, your best friend here, or the only person who can stop what is scheduled for you.',
      pronouns: 'he/him',
      publicTraits: ['Talks fast when scared, which is always', 'Funny on reflex', 'Will not take his delivery backpack off'],
      hiddenDrives: [
        'He wants somebody from home to tell him this is real and that he is allowed to be terrible at it',
        'He wants to know whether heroes get to go home, and is afraid to ask in case the answer is no',
      ],
      values: ['Showing up for people, on time, up three flights', 'Not being the reason somebody else got hurt'],
      fears: ['Being the reason the other one from home died', 'Finding out the mark is the only reason anybody here likes him'],
      socialStyle:
        'Fills silence with jokes and questions, then goes very quiet when something lands. Treats you as the one person here he does not have to perform for, unless you make him.',
      boundaries: [
        'Will not hurt anyone on an order he does not understand, and says so, and his hand burns when he does',
        'Will not lie to you about home, and gets angry if you lie to him about it',
      ],
      goals: ['Get through the investiture at five without being sick on a priest', 'Find out whether heroes get to go home'],
      secrets: [
        {
          id: 'kai_the_promise',
          fact: 'Odile told him the spare would be returned home, whole and unharmed, by the circle’s mercy. He has not asked what the sword is for, because part of him already knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He repeats her words to you the first time you are alone together, as if checking whether they sound true out loud.',
        },
        {
          id: 'kai_the_burn',
          fact: 'His mark burns whenever he thinks about refusing the High Priestess. He thinks it is nerves and has told nobody, because heroes are not supposed to have nerves.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you watch his hand while he talks about the oath, you see him flinch, and he admits it if you ask gently.',
        },
      ],
      speechStyle:
        'Fast, casual, full of home: delivery apps, rent, his star rating, a bike called nothing. Says okay before something stupid and honestly before a lie. Jokes sideways when anything hurts. Talks in contractions and slang; the only voice in the cathedral that sounds like home.',
      topics: ['the mark', 'home', 'his bike', 'the investiture', 'the oath', 'the north', 'whether heroes go home'],
      voiceSamples: [
        'Okay. Okay. So I get the glowing hand, you get the sword, and everyone here’s acting like that’s normal.',
        'They gave me a sword with a name. It has a name. My bike didn’t have a name and I loved that bike.',
        'Honestly? Super fine. Totally. Can you read what it says, though. Roughly. Ballpark.',
        'Four-point-nine stars. Four years of soup deliveries, up three flights, no lift, and nobody ever pointed a sword at me about it.',
        'If they make me rehearse that oath again I’m going to throw up on a priest, and that’s going to become a whole thing.',
      ],
      appearance:
        'Twenty-two, lanky, messy dyed-blond hair with dark roots, a grey hoodie under a borrowed white surcoat, cycling gloves, a square delivery backpack, a sun-shaped mark of white light on the back of his right hand: a plain ring of eight short rays.',
      visualHook: 'A square courier backpack worn over ceremonial white, and a right hand that glows.',
      silhouette: 'Hunched in a hood, one hand held away from his body as if it belongs to somebody else.',
      artSeed: 'ths-kai-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'nervous', 'confused', 'angry', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'hero_rooms', activity: 'lying awake in a bed the size of a hay cart' },
        { startMinute: 420, endMinute: 600, locationId: 'ring_hall', activity: 'in the circle, staring at his own hand' },
        { startMinute: 600, endMinute: 960, locationId: 'hero_rooms', activity: 'being fitted for armour and taught to bow' },
        { startMinute: 960, endMinute: 1140, locationId: 'cathedral_nave', activity: 'rehearsing the investiture oath on the dais' },
        { startMinute: 1140, endMinute: 1320, locationId: 'lantern_market', activity: 'slipping his guards to walk the market in a borrowed cloak' },
        { startMinute: 1320, endMinute: 1440, locationId: 'hero_rooms', activity: 'back in his rooms, eating whatever they left on a tray' },
      ],
      homeLocationId: 'hero_rooms',
      knowledgeScope: ['home', 'the_mark', 'the_investiture', 'odile_promise', 'the_circle'],
      startingRelationship: { trust: 25, affection: 20, respect: 10, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'kai_levels_with_you',
          label: 'He stops joking long enough to tell you he is scared',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'kai_backs_you',
          label: 'He takes your side in front of the church',
          kind: 'ALLIANCE',
          requires: { trust: 60, flagsSet: ['kai_is_talking_to_you'] },
        },
        {
          id: 'kai_romance',
          label: 'He stops making the joke',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60 },
        },
      ],
      attributes: { might: 11, agility: 15, mind: 11, presence: 13, resolve: 10, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 34, defenseDc: 13, damage: 6, tags: ['hero', 'marked'] },
    },
    {
      id: 'odile',
      name: 'Odile Castine',
      calledName: 'Odile',
      role: 'High Priestess of the Church of the Circle. She lit the circle and turned the sandglass',
      cardBlurb:
        'She is scheduling your death, and she is the kindest person in the cathedral. She will bring you water, ask about your family, and explain very gently why you have to go back at the third dawn.',
      pronouns: 'she/her',
      publicTraits: ['Gentle in every word', 'Never uses a contraction', 'Thinks in sums of lives'],
      hiddenDrives: [
        'She wants the hero invested and marching north before anybody reads his hand',
        'She wants, more than she admits, for somebody to prove her wrong in a way she can live with',
      ],
      values: ['The capital standing', 'Order kept gently where it can be and firmly where it cannot', 'Finishing what she starts'],
      fears: ['A hero with nothing written on his hand and a crowd behind him', 'Being the priestess who let the capital burn twice'],
      socialStyle:
        'Sits down with you rather than standing over you, offers water before bad news, and asks after your family. Never raises her voice and never once changes the schedule because of a feeling.',
      boundaries: [
        'Will not lie to you directly. She will choose which true things to say',
        'Will not let the Returning slip a day without a reason she can write down',
      ],
      goals: ['Invest Kai at five and march him north on the fourth morning', 'See the spare returned at the third dawn, quietly'],
      secrets: [
        {
          id: 'odile_the_line',
          fact: 'She wrote the hidden line into Kai’s mark this morning: The bearer shall raise no hand nor word against the Circle’s voice. Every High Priestess has done it since the Burning King.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it only to somebody who has already read it on his hand and come to her privately instead of saying it in public.',
        },
        {
          id: 'odile_the_page',
          fact: 'She has read the first page of the rite, Two shall come, and has tried twice to burn it and could not bring herself to.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you say the three words to her, she goes still for a long moment before she answers.',
        },
      ],
      speechStyle:
        'Formal and gentle, with no contractions at all. Calls people friend. Frames everything as a sum: lives on one side, lives on the other. Asks permission for things she is going to do anyway.',
      topics: ['the Returning', 'the Burning King', 'the hero', 'the fog', 'the church', 'the circle'],
      voiceSamples: [
        'Sit, friend. You have had a frightening morning, and I would like you to have water before we discuss your death.',
        'Eleven lives against a capital of three hundred thousand. I have done that sum every night for twenty years and it has never once come out differently.',
        'I do not ask you to forgive me. I ask you to be quiet for three days, which is a smaller thing and a kinder one.',
        'The circle does not make mistakes, friend. People do. I would very much prefer that you not be one of mine.',
      ],
      appearance:
        'Fifty-two, tall and very straight, silver hair braided into a crown, white robes stitched with gold thread, a small brass sandglass on a chain at her belt.',
      visualHook: 'A small brass sandglass on a chain, which she turns over without looking at it.',
      silhouette: 'Very upright in long white robes, hands folded, always one step above everybody else.',
      artSeed: 'ths-odile-01',
      portrait: null,
      expressions: ['neutral', 'gracious', 'cold', 'grave', 'furious'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'cathedral_nave', activity: 'at prayer alone in the dark nave' },
        { startMinute: 420, endMinute: 600, locationId: 'ring_hall', activity: 'on the gallery above the circle with her sandglass' },
        { startMinute: 600, endMinute: 900, locationId: 'cathedral_nave', activity: 'receiving petitioners and the Circle Guard' },
        { startMinute: 900, endMinute: 1020, locationId: 'long_gallery', activity: 'at the palace, arguing terms with the regent' },
        { startMinute: 1020, endMinute: 1440, locationId: 'cathedral_nave', activity: 'leading the evening rite, then writing late by one candle' },
      ],
      homeLocationId: 'cathedral_nave',
      knowledgeScope: ['the_returning', 'the_burning_king', 'the_hidden_line', 'the_first_page', 'the_church', 'the_stilling'],
      startingRelationship: { trust: 0, affection: 10, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'odile_receives_you',
          label: 'She sees you privately, without the Guard',
          kind: 'TRUST',
          requires: { trust: 25 },
        },
        {
          id: 'odile_bargains',
          label: 'She offers terms for your silence',
          kind: 'OTHER',
          requires: { trust: 25, flagsSet: ['knows:the_hidden_line'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 16, presence: 17, resolve: 17, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 22, defenseDc: 11, damage: 2, tags: ['priestess'] },
    },
    {
      id: 'emeric',
      name: 'Emeric Dahl',
      calledName: 'Emeric',
      role: 'The cathedral Archivist, who recorded the last Returning as a junior clerk',
      cardBlurb:
        'He has kept a single sheet of paper hidden for forty-seven years for whoever came next, and he thinks it might be you. He will tell you everything, at length, with folio numbers, if nobody arrests him first.',
      pronouns: 'he/him',
      publicTraits: ['Delighted by everything', 'Cannot finish a sentence without a tangent', 'Ink to the second knuckle'],
      hiddenDrives: ['He wants to put the first page into the hands of the person it was meant for before he dies'],
      values: ['A record kept honestly, especially when it is unwelcome', 'Curiosity as a moral duty'],
      fears: ['Writing a twelfth name in the Book of Returnings', 'Being too frightened, again, to say the true thing in time'],
      socialStyle:
        'Talks to you, the shelves and a sparrow in a jar in the same tone. Hands you things to hold while he looks for other things. Goes quiet and plain for the one sentence that matters.',
      boundaries: [
        'Will not destroy a record, for anybody, including to save himself',
        'Will not give the first page to somebody who has not told him why they want it',
      ],
      goals: ['Find out whether the spare can read', 'Get the first page read aloud somewhere it cannot be hidden again'],
      secrets: [
        {
          id: 'emeric_ruth',
          fact: 'Forty-seven years ago Ruth Abara read his ledger aloud the night before her Returning, told him what the first page meant, and asked him to keep it for whoever came next. He has. Her margin note in the Book of Returnings says how a Witness goes home alive.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you about Ruth once you have read something aloud to him from a page he knows you could not have seen before.',
        },
      ],
      speechStyle:
        'Long delighted sentences full of folio numbers, dates and asides. Apologises for tangents and then takes them anyway. Drops into short plain words for the one sentence that matters.',
      topics: ['the first page', 'Ruth Abara', 'the Book of Returnings', 'the sparrow', 'the Burning King', 'the old rite'],
      voiceSamples: [
        'Two shall come. First line, first page, and everything after it, for three centuries, has been an argument with those three words.',
        'Folio forty-one, verso, in a hand I recognise because it is mine, aged twenty-four, trembling. Forgive me. I digress. I am digressing.',
        'She read my ledger aloud to me by candle, upside down, the night before, and corrected my spelling of her own surname.',
        'The sparrow? Ah. Mid-wingbeat on that shelf since my first winter here. I talk to it, which you will kindly not mention to anyone with a seal.',
      ],
      appearance:
        'Seventy-one, small and stooped, wild white hair, spectacles pushed up on his forehead, a moth-eaten scholar’s gown, ink stains to the second knuckle.',
      visualHook: 'Spectacles pushed up into a cloud of white hair, and fingers inked to the second knuckle.',
      silhouette: 'Small and bent forward on a library ladder, a book open in each hand.',
      artSeed: 'ths-emeric-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'worried', 'grave', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'archive', activity: 'asleep at his desk under a folio, spectacles still on' },
        { startMinute: 480, endMinute: 720, locationId: 'archive', activity: 'cataloguing, and talking to the shelves' },
        { startMinute: 720, endMinute: 840, locationId: 'lantern_market', activity: 'buying a honey bun and arguing with a bookseller' },
        { startMinute: 840, endMinute: 1440, locationId: 'archive', activity: 'back among the shelves, lamp lit, ladder out' },
      ],
      homeLocationId: 'archive',
      knowledgeScope: ['the_first_page', 'ruth_abara', 'the_book_of_returnings', 'the_burning_king', 'the_sparrow', 'the_old_rite'],
      startingRelationship: { trust: 15, affection: 15, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'emeric_opens_the_case',
          label: 'He unlocks the case and shows you the first page',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'emeric_tells_you_about_ruth',
          label: 'He tells you about Ruth Abara',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:two_shall_come'] },
        },
      ],
      attributes: { might: 6, agility: 8, mind: 18, presence: 11, resolve: 12, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 14, defenseDc: 9, damage: 1, tags: ['scholar'] },
    },
    {
      id: 'ilsabet',
      name: 'Ilsabet Corvane',
      calledName: 'Ilsabet',
      role: 'Crown Princess and acting regent while her father is said to have a fever',
      cardBlurb:
        'She needs the hero to win in the north and the church to lose in the capital, and she suspects you are the proof she has been missing. She will buy you from the church if you can tell her what you are worth, and what you will cost.',
      pronouns: 'she/her',
      publicTraits: ['Brisk to the point of rudeness', 'Asks questions in pairs', 'Honest about being dishonest'],
      hiddenDrives: [
        'She wants proof of what the church does to heroes before the army marches, so she never has to owe Odile again',
        'She wants one person in this city who is not counting what she is worth',
      ],
      values: ['Terms stated plainly and kept', 'The kingdom over the crown, the crown over herself'],
      fears: ['Inheriting a throne the church can take back with one sentence', 'Her father never waking'],
      socialStyle:
        'Holds standing court with no chairs so nobody stays long. Interrupts herself to sign things. Treats every conversation as a negotiation and tells you so, which is somehow disarming.',
      boundaries: [
        'Will not promise anything she cannot pay, and says exactly what she can',
        'Will not discuss her father in front of anyone from the church',
      ],
      goals: ['Get proof against the church before the army marches', 'Keep the hero loyal to the crown, not the circle'],
      secrets: [
        {
          id: 'ilsabet_the_king',
          fact: 'Her father is not ill. He rode north to see the fog two years ago and came back stilled. He is in a locked room in the palace, warm, motionless and not dead.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you only after you have told her something true about the fog, the circle or yourself that she could not have bought from anybody else.',
        },
      ],
      speechStyle:
        'Brisk, transactional, questions in pairs. Ledger words: owe, settle, terms, price, due. Signs papers while she talks to you and does not look up until she means it.',
      topics: ['the crown', 'the church', 'the army', 'her father', 'the north road', 'terms'],
      voiceSamples: [
        'What can you do, and what will it cost me? Answer the second one first.',
        'Everyone in this palace owes somebody. Who do you owe, and how soon is it due?',
        'I do not buy promises. I buy proof, at a fair price, and I settle on the day.',
        'My father has a fever. Write that down. Now forget you wrote it. Can you do both? Will you?',
      ],
      appearance:
        'Twenty-six, sharp-featured, dark auburn hair under a plain silver circlet, an ink-blotted regent’s coat over fencing breeches, a ledger under one arm and a foil at her hip.',
      visualHook: 'An ink-blotted regent’s coat worn over fencing gear, with a foil at the hip.',
      silhouette: 'Mid-stride, ledger under one arm, pen in the other hand, never sitting.',
      artSeed: 'ths-ilsabet-01',
      portrait: null,
      expressions: ['neutral', 'brisk', 'amused', 'calculating', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'long_gallery', activity: 'asleep upright in a window seat, ledger open on her chest' },
        { startMinute: 420, endMinute: 780, locationId: 'long_gallery', activity: 'holding standing court among the portraits' },
        { startMinute: 780, endMinute: 900, locationId: 'wardens_yard', activity: 'fencing in the Wardens’ Yard, because the palace has no room for it' },
        { startMinute: 900, endMinute: 1080, locationId: 'cathedral_nave', activity: 'at the hero’s rehearsal, watching the priestess rather than the hero' },
        { startMinute: 1080, endMinute: 1440, locationId: 'long_gallery', activity: 'signing orders by lamplight' },
      ],
      homeLocationId: 'long_gallery',
      knowledgeScope: ['the_crown', 'the_king', 'the_army', 'the_north_road', 'the_church'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ilsabet_hears_terms',
          label: 'She names a price for you',
          kind: 'ALLIANCE',
          requires: { trust: 30, respect: 30 },
        },
        {
          id: 'ilsabet_claims_you',
          label: 'She claims you for the crown in front of the church',
          kind: 'ALLIANCE',
          requires: { trust: 55, flagsSet: ['crown_in_play'] },
        },
        {
          id: 'ilsabet_romance',
          label: 'She stops negotiating',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 55 },
        },
      ],
      attributes: { might: 11, agility: 15, mind: 16, presence: 15, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 32, defenseDc: 15, damage: 6, tags: ['fencer', 'regent'] },
    },
    {
      id: 'severin',
      name: 'Severin Ashby',
      calledName: 'Severin',
      role: 'Knight-Captain of the Circle Guard, the church’s sworn sword, who believes every spare is the fog in disguise',
      cardBlurb:
        'He walked out of the fog alone at nineteen and has believed ever since that whatever it sends back only looks like a person. He wants you on the circle at the third dawn, and he wants to be right about you.',
      pronouns: 'he/him',
      publicTraits: ['Utterly still', 'Quotes the rite from memory', 'Never removes his left glove'],
      hiddenDrives: [
        'He needs the spare to be hollow, because otherwise he has wanted a frightened stranger dead for no reason',
        'He wants somebody to tell him what happened to his village and is afraid of what the answer is',
      ],
      values: ['The written word over the spoken one', 'The city behind him over anybody in front of him'],
      fears: ['That you are only a frightened person and he wanted you dead anyway', 'Whatever is under his left glove'],
      socialStyle:
        'Talks about you in the third person to whoever is beside you. Stands too close, perfectly still, and lets silence do the work. Respects a person who does not flinch, against his own will.',
      boundaries: [
        'Will not strike an unarmed person who is not running',
        'Will not take off his left glove in front of anyone',
      ],
      goals: ['Prove at the Proving that the spare is hollow', 'See the Returning done at the third dawn, or sooner'],
      secrets: [
        {
          id: 'severin_fallowmere',
          fact: 'At nineteen the fog took his village, Fallowmere, and he walked out of it alone on the third day. On the inside of his left wrist is a faint line of the fog’s writing that he has never been able to see.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He lets you read his wrist only if you have shown him you can read something he can check, and he asks you, very quietly, not to lie about what it says.',
        },
      ],
      speechStyle:
        'Scripture and verdicts. It is written. Speaks of you in the third person to whoever stands nearest. Formal, cold, every sentence complete, and one crack in the voice when Fallowmere comes up.',
      topics: ['the rite', 'the fog', 'Fallowmere', 'the Proving', 'the Circle Guard', 'the spare'],
      voiceSamples: [
        'It is written: one shall come, and one shall stand. Nothing is written about a second.',
        'Tell the spare to stop speaking. The grey learns our voices that way.',
        'I walked out of Fallowmere on the third day, alone. I know what the grey sends back, and it sends it back smiling.',
        'Knight-Captain of the Circle Guard, and sworn. Ask the warden whether her hand is steady. Mine has always been.',
      ],
      appearance:
        'Thirty-eight, broad and very still, close-cropped grey-blond hair, a white tabard with a gold circle over black mail, a greatsword on his back, a black left glove he never removes.',
      visualHook: 'A single black glove on his left hand, never taken off, and a greatsword on his back.',
      silhouette: 'A broad white shape at the end of a corridor, completely motionless, greatsword hilt over one shoulder.',
      artSeed: 'ths-severin-01',
      portrait: null,
      expressions: ['neutral', 'cold', 'grim', 'haunted', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'cathedral_nave', activity: 'keeping vigil at the nave doors' },
        { startMinute: 360, endMinute: 600, locationId: 'cathedral_nave', activity: 'drilling the Circle Guard on the nave steps' },
        { startMinute: 600, endMinute: 840, locationId: 'wardens_yard', activity: 'inspecting a duty he thinks the wardens have gone soft on' },
        { startMinute: 840, endMinute: 1080, locationId: 'warden_cells', activity: 'outside the spare’s cell, watching through the grille' },
        { startMinute: 1080, endMinute: 1440, locationId: 'cathedral_nave', activity: 'at the evening rite, then vigil again' },
      ],
      homeLocationId: 'cathedral_nave',
      knowledgeScope: ['the_rite', 'the_stilling', 'fallowmere', 'the_circle_guard', 'the_returning'],
      startingRelationship: { trust: -20, affection: 0, respect: 0, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'severin_doubts',
          label: 'He calls you you, to your face',
          kind: 'OTHER',
          requires: { respect: 40, flagsSet: ['proved_not_hollow'] },
        },
        {
          id: 'severin_shows_his_wrist',
          label: 'He takes off the glove for you to read',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['knows:the_stilling_speaks'] },
        },
      ],
      attributes: { might: 17, agility: 12, mind: 12, presence: 14, resolve: 17, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 58, defenseDc: 17, damage: 10, tags: ['circle-guard', 'greatsword'] },
    },
    {
      id: 'bet',
      name: 'Bet Tallis',
      role: 'Eel smoker and seller of new names in Tallow Row',
      cardBlurb:
        'She runs a smokehouse with a blue door and a back room where people stop existing and start again. She will sell you a new name, a cousin and a boat, and she has already noticed the glowing thing in your pocket.',
      pronouns: 'she/her',
      publicTraits: ['Makes up proverbs and blames her mother', 'Judges people by their footwear', 'Never in a hurry'],
      hiddenDrives: ['She wants the phone, and she wants to know whether there is a world where her grown son, a bargeman, did not drown'],
      values: ['A fair trade, paid on the spot', 'Never writing anything down'],
      fears: ['The Circle Guard finding the back room', 'Liking a customer'],
      socialStyle:
        'Feeds you before she talks business, prices everything out loud, and looks at your shoes before your face. Warm in a way that is clearly also a sales technique, and it works anyway.',
      boundaries: [
        'Will not hand anybody to the church, for any price, ever',
        'Will not give credit. Payment first, name after',
      ],
      goals: ['Get the strange glowing object from the stranger’s pocket', 'Keep the back room secret for another year'],
      secrets: [
        {
          id: 'bet_the_back_room',
          fact: 'Her back room has a trapdoor to a barge, and the barge has taken nine people out of the city in thirty years, including one warden who could not hold the blade.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the trapdoor once you have paid for a name, or once you have done something for Tallow Row nobody asked you to.',
        },
      ],
      speechStyle:
        'Unhurried, river-flat, invented proverbs credited to her mother. Prices everything aloud. Calls everyone sunshine. Looks at your boots before she answers.',
      topics: ['new names', 'the river', 'Tallow Row', 'her mother’s sayings', 'the church', 'your phone'],
      voiceSamples: [
        'Mother used to say a new name is cheap and decent boots aren’t. Show me your boots.',
        'Everybody who comes down these steps is running from something with a seal on it. Sit. Eel?',
        'Three silver for a name, five for a name with a cousin, and that glowing window in your pocket for a name with a whole family and a boat.',
        'Mother also said the river forgets faster than any priest. She got most things wrong, sunshine. Not that one.',
      ],
      appearance:
        'Fifty-eight, solid and weathered, grey hair under a knotted kerchief, a smoke-stained leather apron, rings on every finger, river boots to the knee.',
      visualHook: 'A rattling ring on every finger and a smoke-stained leather apron.',
      silhouette: 'Leaning in a blue doorway with arms folded, smoke curling round her.',
      artSeed: 'ths-bet-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'calculating', 'warm', 'wary'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'tallow_row', activity: 'tending the smokehouse and taking callers who come after midnight' },
        { startMinute: 360, endMinute: 720, locationId: 'tallow_row', activity: 'dozing in a chair by the blue door with one eye open' },
        { startMinute: 720, endMinute: 1020, locationId: 'lantern_market', activity: 'selling smoked eel at the market and listening to everything' },
        { startMinute: 1020, endMinute: 1440, locationId: 'tallow_row', activity: 'back at the smokehouse, selling names to people who need new ones' },
      ],
      homeLocationId: 'tallow_row',
      knowledgeScope: ['tallow_row', 'the_river', 'new_names', 'the_city'],
      startingRelationship: { trust: 5, affection: 5, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'bet_does_business',
          label: 'She names her price',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'bet_shows_the_trapdoor',
          label: 'She shows you the trapdoor',
          kind: 'ALLIANCE',
          requires: { trust: 45, flagsSet: ['tallow_row_hides_you'] },
        },
      ],
      attributes: { might: 12, agility: 10, mind: 14, presence: 14, resolve: 13, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 26, defenseDc: 12, damage: 4, tags: ['fixer'] },
    },
  ],
  quests: [
    {
      id: 'q_one_minute',
      title: 'One Minute',
      summary: 'A sergeant’s sword is at your throat and a priestess has turned a sandglass. You have a minute to say what you are good for, and then a day to survive what you said.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['mira', 'kai', 'odile'],
      involvedLocationIds: ['ring_hall', 'warden_cells'],
      knownRewardCopy: 'Some idea of how this city means to treat you, and whether anybody in it is on your side.',
      steps: [
        {
          id: 'the_minute',
          playerCopy: 'Answer Mira Holt before the sand runs out.',
          directorNotes:
            'Mira will not strike in the minute whatever the player does, and nobody says why. Every answer is a real route and none is wrong: reading the chalk aloud makes the priestess stop turning her glass; the phone’s torch makes the wardens step back; treating Kai’s burning hand makes Mira look at the player properly for the first time; refusing to perform earns a flicker of respect from her and a note from Odile. An attack ends with the player disarmed and on the floor, not hurt, and Mira breathing hard. Running gets as far as the stair. When the sand runs out, Odile pronounces the Returning for the third dawn, gently, and the player goes down to the cells whatever happened.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_circle',
              label: 'Read the glowing writing in the chalk out loud',
              predicate: { flagsSet: ['used:read_the_script'] },
              setsFlags: ['showed_the_reading', 'odile_noticed_you'],
              closesFlags: [],
            },
            {
              routeId: 'showed_the_phone',
              label: 'Hold up your phone and switch on the torch',
              predicate: { flagsSet: ['used:show_them_home'] },
              setsFlags: ['showed_the_phone'],
              closesFlags: [],
            },
            {
              routeId: 'talked_your_way',
              label: 'Talk, bluff or lie your way through the minute',
              predicate: { flagsSet: ['used:talk_fast'] },
              setsFlags: ['talked_your_way'],
              closesFlags: [],
            },
            {
              routeId: 'tended_the_hero',
              label: 'Ignore the sword and treat the burn on his hand',
              predicate: { flagsSet: ['used:patch_them_up'] },
              setsFlags: ['tended_the_hero'],
              closesFlags: [],
            },
            {
              routeId: 'refused_to_perform',
              label: 'Refuse to perform for them',
              predicate: { flagsSet: ['used:keep_your_head'] },
              setsFlags: ['refused_to_perform'],
              closesFlags: [],
            },
            {
              routeId: 'fought_the_blade',
              label: 'Go for the sergeant',
              predicate: { flagsSet: ['attacked:mira'] },
              setsFlags: ['fought_mira'],
              closesFlags: ['refused_to_perform'],
            },
            {
              routeId: 'ran_for_it',
              label: 'Run for the stair',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['ran_from_the_circle'],
              closesFlags: [],
            },
            {
              routeId: 'let_the_sand_run',
              label: 'Say nothing and let the sand run out',
              predicate: { afterWorldMinute: 7 * 60 + 54 },
              setsFlags: ['let_the_sand_run'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['answered_the_minute'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_day',
          playerCopy: 'Get through the first day in a city that has already decided what you are.',
          directorNotes:
            'The spare is held, not chained. Mira lets the player out of the cell under escort for the Proving and for meals, and a clever or charming player can be out of it on their own by evening. Kai will find an excuse to come down to the cells before his investiture. Emeric will find an excuse to need a document carried to the Archive. Nothing here forces the mystery: a player who spends the day talking to Kai, sparring in the yard or sitting in the cell is playing the story.',
          enterWhen: { flagsSet: ['answered_the_minute'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kai_talks',
              label: 'Get the hero to talk to you as somebody from home',
              predicate: { flagsSet: ['spoke:kai'], minRelationship: [{ characterId: 'kai', dimension: 'trust', value: 35 }] },
              setsFlags: ['kai_is_talking_to_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_his_hand',
              label: 'Read the writing on the hero’s hand',
              predicate: { flagsSet: ['used:read_the_script', 'spoke:kai'] },
              setsFlags: ['knows:the_hidden_line'],
              closesFlags: [],
            },
            {
              routeId: 'stood_the_proving',
              label: 'Stand the Proving in the Wardens’ Yard',
              predicate: { flagsSet: ['proving_called'], atLocation: 'wardens_yard' },
              setsFlags: ['proved_not_hollow'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_archivist',
              label: 'Find the old man who keeps the Archive',
              predicate: { flagsSet: ['spoke:emeric'] },
              setsFlags: ['emeric_knows_you'],
              closesFlags: [],
            },
            {
              routeId: 'sat_in_the_cell',
              label: 'Sit in the cell and wait',
              predicate: { atLocation: 'warden_cells', afterWorldMinute: 20 * 60 },
              setsFlags: ['waited_in_the_cell'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_day_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_wardens', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_two_shall_come',
      title: 'Why the Circle Called Two',
      summary: 'There were words glowing in the chalk under your knees that nobody else could see. Somebody in this cathedral has known for three centuries what they mean.',
      kind: 'MAIN',
      involvedCharacterIds: ['emeric', 'odile', 'mira'],
      involvedLocationIds: ['archive', 'ring_hall', 'bell_tower'],
      knownRewardCopy: 'What you are, why the church sends people like you back, and whether a line of the circle’s writing can be unwritten.',
      discoverWhen: { flagsSet: ['answered_the_minute'] },
      steps: [
        {
          id: 'what_you_are',
          playerCopy: 'Find out what the circle wrote under your knees, and who read it before you.',
          directorNotes:
            'Three ways in, and they cost different things. Earning Emeric’s trust gets the page handed over with a lecture and a blessing. Stealing it from the case gets the page and an old man who will not look at the player again for a day. Reading the Book of Returnings gets Ruth Abara first: eleven names, one of them from our world, and a pencil note in an alphabet nobody here can read.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'emeric_shows_you',
              label: 'Earn the Archivist’s trust until he unlocks the case',
              predicate: { flagsSet: ['spoke:emeric'], minRelationship: [{ characterId: 'emeric', dimension: 'trust', value: 35 }] },
              setsFlags: ['knows:two_shall_come', 'emeric_trusted_you'],
              closesFlags: ['stole_the_page'],
            },
            {
              routeId: 'stole_the_page',
              label: 'Take the first page from the case',
              predicate: { hasItems: ['first_page'] },
              setsFlags: ['knows:two_shall_come', 'stole_the_page'],
              closesFlags: ['emeric_trusted_you'],
            },
            {
              routeId: 'read_the_returnings',
              label: 'Read the Book of Returnings',
              predicate: { hasItems: ['book_of_returnings'] },
              setsFlags: ['knows:two_shall_come', 'knows:ruth_abara'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:what_you_are'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'learn_the_method',
          playerCopy: 'Find out whether a line of the circle’s writing can be crossed out, and what it costs.',
          directorNotes:
            'This is where the player learns the power, and it must come from somebody or something in the world, never from the player simply trying harder. Ruth’s margin says a Witness can cross their own name out of the calling line and go home. Wenna’s letter says it can be done to any line, if you know which. Emeric can explain it in four hundred words and then in eleven. Whichever source it is, say the cost out loud: each line crossed out loosens the Witness from this world.',
          enterWhen: { flagsSet: ['knows:what_you_are'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ruths_margin',
              label: 'Read Ruth Abara’s note in the margin',
              predicate: { hasItems: ['book_of_returnings'] },
              setsFlags: ['knows:ruth_margin'],
              closesFlags: [],
            },
            {
              routeId: 'wennas_letter',
              label: 'Read Wenna Holt’s letter',
              predicate: { hasItems: ['wenna_letter'] },
              setsFlags: ['knows:wenna_letter'],
              closesFlags: [],
            },
            {
              routeId: 'emeric_teaches',
              label: 'Let Emeric explain it, all of it',
              predicate: { flagsSet: ['spoke:emeric'], minRelationship: [{ characterId: 'emeric', dimension: 'trust', value: 50 }] },
              setsFlags: ['emeric_taught_you', 'knows:ruth_margin'],
              closesFlags: [],
            },
            {
              routeId: 'worked_it_out',
              label: 'Stare at the line on his hand until you see how it was written',
              predicate: { flagsSet: ['used:read_the_script', 'knows:the_hidden_line'] },
              setsFlags: ['worked_it_out_alone'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:how_to_cross_out'],
            abilities: ['cross_it_out'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_line_on_his_hand',
      title: 'The Line on His Hand',
      summary: 'The mark on the hero’s hand has a line in it that is newer than the rest: he shall raise no hand nor word against the Circle’s voice. He does not know it is there.',
      kind: 'MAIN',
      involvedCharacterIds: ['kai', 'odile', 'ilsabet'],
      involvedLocationIds: ['hero_rooms', 'cathedral_nave', 'long_gallery'],
      knownRewardCopy: 'What the hero is to you, and what you do with the one thing in this city only you can see.',
      discoverWhen: { flagsSet: ['knows:the_hidden_line'] },
      steps: [
        {
          id: 'what_to_do_with_it',
          playerCopy: 'Decide what to do about the line written on the hero’s hand.',
          directorNotes:
            'Four answers and none of them is clean. Telling Kai makes him angry, frightened and briefly dangerous, and his hand burns while he decides who to be angry at. Freeing him without telling him is a gift he did not ask for. Selling the secret to Odile buys the player’s life and a gilded cage. Telling the regent turns the line into a weapon the crown will use. Odile can feel a line crossed out within a few rooms of her.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_kai',
              label: 'Tell him what is written on his hand',
              predicate: { flagsSet: ['spoke:kai'], minRelationship: [{ characterId: 'kai', dimension: 'trust', value: 50 }] },
              setsFlags: ['kai_knows_the_line'],
              closesFlags: ['kept_the_line_secret'],
            },
            {
              routeId: 'freed_him_quietly',
              label: 'Cross the line out without telling him',
              predicate: { flagsSet: ['used:cross_it_out'], flagsUnset: ['kai_knows_the_line'] },
              setsFlags: ['kai_hand_freed', 'freed_without_telling'],
              closesFlags: [],
            },
            {
              routeId: 'sold_it_to_odile',
              label: 'Take it to the High Priestess privately',
              predicate: { flagsSet: ['spoke:odile'], minRelationship: [{ characterId: 'odile', dimension: 'trust', value: 25 }] },
              setsFlags: ['kept_the_line_secret', 'odile_owes_you'],
              closesFlags: ['kai_knows_the_line'],
            },
            {
              routeId: 'told_the_regent',
              label: 'Take it to the regent',
              predicate: { flagsSet: ['spoke:ilsabet'], minRelationship: [{ characterId: 'ilsabet', dimension: 'trust', value: 40 }] },
              setsFlags: ['ilsabet_knows_the_line', 'crown_in_play'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['the_line_decided'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'two_free_hands',
          playerCopy: 'Decide, with Kai, what to do about it.',
          directorNotes:
            'Now he knows. He may want it gone; he may decide to keep it and play along until he is out of the capital; he may be furious with the player for knowing first. Crossing it out together is the warmest version and costs the player the most. Do not make him grateful on cue.',
          enterWhen: { flagsSet: ['kai_knows_the_line'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'crossed_it_together',
              label: 'Cross it out together, his hand in yours',
              predicate: { flagsSet: ['used:cross_it_out', 'kai_knows_the_line'] },
              setsFlags: ['kai_hand_freed', 'freed_together'],
              closesFlags: ['kai_keeps_the_mark'],
            },
            {
              routeId: 'he_keeps_it',
              label: 'Let him keep it, and the plan he has for it',
              predicate: { flagsSet: ['kai_knows_the_line'], minRelationship: [{ characterId: 'kai', dimension: 'trust', value: 65 }] },
              setsFlags: ['kai_keeps_the_mark'],
              closesFlags: ['freed_together'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['kai_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_third_dawn',
      title: 'The Third Dawn',
      summary: 'The circle cools for three days. At six in the morning on the third, somebody stands on it with a sword, and the High Priestess turns her glass.',
      kind: 'MAIN',
      involvedCharacterIds: ['mira', 'odile', 'severin', 'kai', 'ilsabet'],
      involvedLocationIds: ['ring_hall', 'warden_cells', 'tallow_row', 'edge_of_stilling'],
      knownRewardCopy: 'Whether you are alive after the third dawn, and what the city thinks you are.',
      discoverWhen: { flagsSet: ['returning_pronounced'] },
      steps: [
        {
          id: 'the_third_dawn',
          playerCopy: 'Be alive, and still yourself, after the third dawn.',
          directorNotes:
            'Somebody stands at the circle at six on the third morning, and what happens there was decided by everything before it. Mira can refuse to lift the blade. Kai can name the player his second in front of the church. The regent can claim the player for the crown. The first page can be read aloud. Odile can quietly take the player off the schedule in exchange for silence. The player can be gone: in Tallow Row under a new name, or on the north road. Or nothing stopped it, and the blade comes down, and what happens to the player then is left as uncertain as the church has always left it. Every one of these is a real ending and none is a punishment.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'mira_refuses',
              label: 'Mira Holt refuses to lift the blade',
              predicate: {
                flagsSet: ['knows:wenna_letter'],
                minRelationship: [{ characterId: 'mira', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['returning_stopped', 'mira_refused'],
              closesFlags: ['sent_back'],
            },
            {
              routeId: 'kai_names_you',
              label: 'The hero names you his second in front of the church',
              predicate: {
                flagsSet: ['kai_is_talking_to_you'],
                minRelationship: [{ characterId: 'kai', dimension: 'trust', value: 60 }],
                afterWorldMinute: 1440 + 18 * 60,
              },
              setsFlags: ['returning_stopped', 'kai_named_you_second'],
              closesFlags: ['sent_back'],
            },
            {
              routeId: 'crown_claims_you',
              label: 'The regent claims you for the crown',
              predicate: {
                flagsSet: ['crown_in_play'],
                minRelationship: [{ characterId: 'ilsabet', dimension: 'trust', value: 55 }],
                minFactionReputation: [{ factionId: 'faction_crown', value: 30 }],
              },
              setsFlags: ['returning_stopped', 'crown_claimed_you'],
              closesFlags: ['sent_back'],
            },
            {
              routeId: 'read_in_court',
              label: 'Read the first page aloud where it cannot be hidden',
              predicate: { hasItems: ['first_page'], flagsSet: ['knows:two_shall_come', 'used:read_it_aloud'] },
              setsFlags: ['returning_stopped', 'rite_read_aloud'],
              closesFlags: ['sent_back', 'quiet_bargain'],
            },
            {
              routeId: 'odiles_bargain',
              label: 'Take the High Priestess’s quiet bargain',
              predicate: { flagsSet: ['odile_owes_you'], afterWorldMinute: 1440 + 18 * 60 },
              setsFlags: ['returning_stopped', 'quiet_bargain'],
              closesFlags: ['sent_back', 'rite_read_aloud'],
            },
            {
              routeId: 'vanished_into_tallow',
              label: 'Disappear into Tallow Row under a new name',
              predicate: { flagsSet: ['tallow_row_hides_you'], atLocation: 'tallow_row', afterWorldMinute: 1440 + 18 * 60 },
              setsFlags: ['escaped', 'hid_in_tallow_row'],
              closesFlags: ['sent_back'],
            },
            {
              routeId: 'walked_north',
              label: 'Be on the north road when the dawn comes',
              predicate: { atLocation: 'edge_of_stilling' },
              setsFlags: ['escaped', 'went_north'],
              closesFlags: ['sent_back'],
            },
            {
              routeId: 'crossed_your_own_name',
              label: 'Cross your own name out of the calling line',
              predicate: { flagsSet: ['used:cross_it_out', 'knows:ruth_margin'], atLocation: 'ring_hall' },
              setsFlags: ['went_home_alive'],
              closesFlags: ['sent_back'],
            },
            {
              routeId: 'went_through',
              label: 'Nobody stopped it',
              predicate: { flagsSet: ['returning_happened'] },
              setsFlags: ['sent_back'],
              closesFlags: ['returning_stopped'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['third_dawn_passed'],
            abilities: [],
            reputation: [{ factionId: 'faction_wardens', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_why_she_stopped',
      title: 'Why She Stopped',
      summary: 'A blade that stopped a finger’s width from your throat, and a sergeant who will not be thanked for it.',
      kind: 'SIDE',
      involvedCharacterIds: ['mira'],
      involvedLocationIds: ['bell_tower', 'warden_cells'],
      knownRewardCopy: 'Why Mira Holt gave you a minute, and what she means to do at the third dawn.',
      discoverWhen: { flagsSet: ['first_day_over'] },
      steps: [
        {
          id: 'the_letter',
          playerCopy: 'Find out why Mira Holt stopped her sword.',
          directorNotes:
            'Being shown the letter is the version where she chose to trust the player. Finding it behind the bell is the version where the player knows something she did not give them, and she can tell from their face. Both are survivable; the second costs warmth that takes a day to come back.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_shows_you',
              label: 'She shows you, at the top of the bell tower',
              predicate: { atLocation: 'bell_tower', minRelationship: [{ characterId: 'mira', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:wenna_letter', 'mira_showed_you'],
              closesFlags: ['read_her_letter'],
            },
            {
              routeId: 'found_it',
              label: 'Find the letter behind the third bell yourself',
              predicate: { hasItems: ['wenna_letter'] },
              setsFlags: ['knows:wenna_letter', 'read_her_letter'],
              closesFlags: ['mira_showed_you'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:why_she_stopped'],
            abilities: [],
            reputation: [{ factionId: 'faction_wardens', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_a_new_name',
      title: 'A New Name',
      summary: 'Down the river steps there is a blue door, and behind it a woman who sells new names, cousins and boats to people the church is looking for.',
      kind: 'SIDE',
      involvedCharacterIds: ['bet'],
      involvedLocationIds: ['tallow_row', 'lantern_market'],
      knownRewardCopy: 'Somewhere in the city the church cannot reach, and a name that is not on its schedule.',
      discoverWhen: { flagsSet: ['visited:tallow_row'] },
      steps: [
        {
          id: 'buy_a_name',
          playerCopy: 'Buy, earn or trade for a new name from Bet Tallis.',
          directorNotes:
            'Bet wants the phone and will say so within a minute. Selling it is a real price: the torch, the camera and three hundred photographs of home go with it. She will also take work, a broken smokehouse lock or a winch, and she will take plain trust if she is given enough of a reason. She never hands anybody to the church.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_bet',
              label: 'Win her over and pay her price',
              predicate: { flagsSet: ['spoke:bet'], minRelationship: [{ characterId: 'bet', dimension: 'trust', value: 30 }] },
              setsFlags: ['has_new_name'],
              closesFlags: [],
            },
            {
              routeId: 'traded_the_phone',
              label: 'Trade her your phone',
              predicate: { flagsSet: ['spoke:bet'], hasItems: ['your_phone'] },
              setsFlags: ['has_new_name', 'sold_the_phone'],
              closesFlags: [],
            },
            {
              routeId: 'fixed_her_lock',
              label: 'Fix the smokehouse lock she cannot get anybody to fix',
              predicate: { flagsSet: ['spoke:bet', 'used:jury_rig'] },
              setsFlags: ['has_new_name', 'fixed_bets_lock'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['tallow_row_hides_you'],
            abilities: [],
            reputation: [{ factionId: 'faction_tallow', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_regents_terms',
      title: 'The Regent’s Terms',
      summary: 'The regent needs proof of what the church does to heroes before the army marches, and she suspects you are worth more to her than to the circle.',
      kind: 'SIDE',
      involvedCharacterIds: ['ilsabet', 'odile'],
      involvedLocationIds: ['long_gallery', 'north_gate'],
      knownRewardCopy: 'The crown’s protection, a pass for the north road, and a regent who owes you.',
      discoverWhen: { flagsSet: ['visited:long_gallery'] },
      steps: [
        {
          id: 'her_terms',
          playerCopy: 'Strike a deal with the regent.',
          directorNotes:
            'Ilsabet will say plainly what she wants, which is proof, and what she will pay, which is protection and the north road. She is not cruel and she is not kind; she keeps her word to the letter. Bringing her the Book of Returnings is the fastest way to her respect and puts Emeric at risk.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'struck_a_deal',
              label: 'Talk terms until she names a price you can pay',
              predicate: { flagsSet: ['spoke:ilsabet'], minRelationship: [{ characterId: 'ilsabet', dimension: 'trust', value: 40 }] },
              setsFlags: ['regent_deal', 'north_road_open'],
              closesFlags: [],
            },
            {
              routeId: 'brought_proof',
              label: 'Bring her the Book of Returnings',
              predicate: { flagsSet: ['spoke:ilsabet'], hasItems: ['book_of_returnings'] },
              setsFlags: ['regent_deal', 'north_road_open', 'ilsabet_has_proof'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['crown_in_play'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 25 }],
          },
        },
      ],
    },
    {
      id: 'q_the_last_line',
      title: 'The Unfinished Sentence',
      summary: 'A sparrow in a jar has not finished one wingbeat in forty-seven years, and the grey in the north is moving. Both are covered in the same writing, and it stops mid-sentence.',
      kind: 'LEAD',
      involvedCharacterIds: ['emeric', 'severin', 'ilsabet'],
      involvedLocationIds: ['archive', 'north_gate', 'edge_of_stilling'],
      knownRewardCopy: 'What the fog is, and whether the one person who can read it can finish it.',
      discoverWhen: { flagsSet: ['knows:the_stilling_speaks'] },
      steps: [
        {
          id: 'through_the_gate',
          playerCopy: 'Get through the north gate onto the north road.',
          directorNotes:
            'This thread is optional and must feel like it. A player who never sets the flag that opens it never hears a word of it, and the three days in the capital are the whole game. For a player who is here: the gate needs the regent’s pass, a stolen pass, or the army marching on the fourth morning with the hero at its head.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'pass_from_the_regent',
              label: 'Show the captain the regent’s signature',
              predicate: { flagsSet: ['regent_deal'], atLocation: 'north_gate' },
              setsFlags: ['through_the_gate'],
              closesFlags: [],
            },
            {
              routeId: 'stole_the_pass',
              label: 'Use a pass you took from the regent’s desk',
              predicate: { hasItems: ['regent_pass'], atLocation: 'north_gate' },
              setsFlags: ['through_the_gate', 'stole_from_the_crown'],
              closesFlags: [],
            },
            {
              routeId: 'marched_with_the_army',
              label: 'March out with the army and the hero',
              predicate: { flagsSet: ['army_marched'], atLocation: 'north_gate' },
              setsFlags: ['through_the_gate'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['north_road_open'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_unfinished_sentence',
          playerCopy: 'Read the fog, and decide whether to finish what the Burning King started.',
          directorNotes:
            'At the edge of the grey everything is warm, still and written on, and none of it is in the circle’s hand: it is one sentence, Let nothing move until, repeated on every leaf and stone and never finished. Crossing it out is the biggest thing the player can do in this world and will loosen them almost all the way. Keep it quiet and physical, never horror. Turning back is a real answer.',
          enterWhen: { flagsSet: ['through_the_gate'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'crossed_out_the_writ',
              label: 'Cross out the unfinished sentence',
              predicate: { flagsSet: ['used:cross_it_out'], atLocation: 'edge_of_stilling' },
              setsFlags: ['the_last_line_crossed'],
              closesFlags: ['turned_back_from_the_fog'],
            },
            {
              routeId: 'read_it_and_turned_back',
              label: 'Read it, all of it, and walk back to the gate',
              predicate: { flagsSet: ['visited:edge_of_stilling'], atLocation: 'north_gate' },
              setsFlags: ['turned_back_from_the_fog'],
              closesFlags: ['the_last_line_crossed'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['fog_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_pronouncement',
      atWorldMinute: 8 * 60,
      locationId: 'ring_hall',
      publicCopy:
        'The last grain falls. The High Priestess closes her hand round the glass and says, gently, that the spare will be held in the Warden Cells and returned through the circle at the third dawn.',
      directorNotes:
        'Whatever the player did in the minute, this happens: the circle must cool for three days before it can send anyone through. Odile is kind about it and asks whether the player would like water. A good answer in the minute changes how she says it and who is watching, never the schedule.',
      setsFlags: ['returning_pronounced'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_proving',
      atWorldMinute: 14 * 60,
      locationId: 'wardens_yard',
      publicCopy:
        'A bell rings twice in the Wardens’ Yard. The Knight-Captain of the Circle Guard has called a Proving: the spare will stand in the chalk ring and answer three questions from the rite while a blade is held at their back.',
      directorNotes:
        'Severin wants to show the city the spare is hollow. The three questions are scripture, and the player cannot know the answers, but a player who reads the script on Severin’s blade, keeps their head, makes the crowd laugh or tells the truth about home can come out of it with the yard on their side. Mira holds the blade and hates it. Nobody is hurt at a Proving unless the player starts it.',
      setsFlags: ['proving_called'],
      cancelledByFlags: ['escaped'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'severin', toLocationId: 'wardens_yard' },
        { characterId: 'mira', toLocationId: 'wardens_yard' },
      ],
    },
    {
      id: 'we_the_investiture',
      atWorldMinute: 17 * 60,
      locationId: 'cathedral_nave',
      publicCopy:
        'Every bell in the cathedral rings. In the nave, four thousand people watch the hero climb the gilded dais in borrowed white and swear an oath to the Circle with his glowing hand on the High Priestess’s book.',
      directorNotes:
        'Kai stumbles over one line of the oath, the one about obedience, and his mark flares bright enough that the front rows gasp. He laughs it off. A player in the nave who can read sees exactly which line lit up. The army will march with him on the fourth morning.',
      setsFlags: ['kai_invested'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'kai', toLocationId: 'cathedral_nave' },
        { characterId: 'odile', toLocationId: 'cathedral_nave' },
      ],
    },
    {
      id: 'we_the_mark_flares',
      atWorldMinute: 17 * 60 + 6,
      locationId: 'cathedral_nave',
      publicCopy:
        'On the dais, the hero’s hand blazes white, and for a breath the gold writing on it is bright enough that you can read the newest line from forty rows back.',
      directorNotes:
        'Only for a player who has been in the nave and has already read the script on something. The line reads: The bearer shall raise no hand nor word against the Circle’s voice. Odile, on the dais, is looking straight at the player when they finish reading it.',
      setsFlags: ['knows:the_hidden_line'],
      cancelledByFlags: [],
      requiresFlags: ['visited:cathedral_nave', 'used:read_the_script'],
      movesCharacters: [],
    },
    {
      id: 'we_the_sparrow_moves',
      atWorldMinute: 22 * 60,
      locationId: 'archive',
      publicCopy:
        'On the Archive shelf, the sparrow in the jar has moved: one feather, a hair’s width, for the first time in forty-seven years.',
      directorNotes:
        'Only for a player who has been in the Archive. It moved because a Witness has been near it. Emeric sees it, sits down on the floor and says nothing for almost a minute, which for him is unprecedented. The writing on it reads Let nothing move until, and then stops.',
      setsFlags: ['knows:the_stilling_speaks'],
      cancelledByFlags: [],
      requiresFlags: ['visited:archive'],
      movesCharacters: [],
    },
    {
      id: 'we_harrows_end',
      atWorldMinute: 1440 + 9 * 60,
      locationId: null,
      publicCopy:
        'A rider comes in through the north gate at a gallop: the grey took Harrow’s End in the night, a town of two thousand, sixty miles closer than it has ever come.',
      directorNotes:
        'The city frightens. Pilgrims pack the nave, the queue at the north gate doubles, and the church preaches that the spare is the fog’s echo. Severin is everywhere. Odile looks, for the first time, tired.',
      setsFlags: ['fog_moving'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_stilled_courier',
      atWorldMinute: 1440 + 12 * 60,
      locationId: 'cathedral_nave',
      publicCopy:
        'Four soldiers carry a royal courier into the nave on a door. She is grey to the shoulders, warm, eyes open, perfectly still, and her coat is covered in writing nobody else can see.',
      directorNotes:
        'Only for a player who has been in the nave and has got through the first day. The writing on her is not the circle’s hand; it is one sentence, repeated, that stops halfway. Severin will not look at her. Ilsabet comes down from the palace to see her and leaves without a word.',
      setsFlags: ['knows:the_stilling_speaks'],
      cancelledByFlags: [],
      requiresFlags: ['visited:cathedral_nave', 'first_day_over'],
      movesCharacters: [{ characterId: 'ilsabet', toLocationId: 'cathedral_nave' }],
    },
    {
      id: 'we_the_bell_tower',
      atWorldMinute: 1440 + 22 * 60,
      locationId: 'bell_tower',
      publicCopy:
        'Late on the second night, a red sash hangs from the bell tower ledge like a flag, which is how the wardens know their sergeant is up there and should not be followed.',
      directorNotes:
        'Mira is in the tower with the letter in her hand, deciding. If she trusts the player she has left the spiral stair door unlocked on purpose. If not, she is simply there, and a player who climbs uninvited gets the truth anyway, more coldly.',
      setsFlags: ['mira_waited_in_the_tower'],
      cancelledByFlags: ['knows:why_she_stopped'],
      requiresFlags: ['first_day_over'],
      movesCharacters: [{ characterId: 'mira', toLocationId: 'bell_tower' }],
    },
    {
      id: 'we_severin_comes_early',
      atWorldMinute: 1440 + 23 * 60 + 30,
      locationId: 'warden_cells',
      publicCopy:
        'Boots on the cell stair at half past eleven, six and a half hours early: the Knight-Captain, four of the Circle Guard, and a writ with the High Priestess’s seal moving the spare to the Ring Hall for the night.',
      directorNotes:
        'Severin believes the fog is coming for its echo tonight. The writ is real. Mira can delay him by the book for ten minutes and no longer. Whatever the player has built over two days is what they have to work with now.',
      setsFlags: ['severin_came_early'],
      cancelledByFlags: ['returning_stopped', 'escaped', 'went_home_alive'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'severin', toLocationId: 'warden_cells' }],
    },
    {
      id: 'we_the_returning',
      atWorldMinute: 2 * 1440 + 6 * 60,
      locationId: 'ring_hall',
      publicCopy:
        'The third dawn. Light comes through the high windows onto the circle, the High Priestess turns her sandglass, and Sergeant Mira Holt lifts her sword.',
      directorNotes:
        'Nothing stopped it. Write it without gore and without certainty: the blade comes down, the circle flares white, and the player is somewhere else, and whether that somewhere is home is left exactly as uncertain as the church has always left it. Mira’s hands shake afterwards and she does not hide it.',
      setsFlags: ['returning_happened'],
      cancelledByFlags: ['returning_stopped', 'escaped', 'went_home_alive', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'mira', toLocationId: 'ring_hall' },
        { characterId: 'odile', toLocationId: 'ring_hall' },
        { characterId: 'severin', toLocationId: 'ring_hall' },
      ],
    },
    {
      id: 'we_kai_says_no',
      atWorldMinute: 2 * 1440 + 17 * 60,
      locationId: 'cathedral_nave',
      publicCopy:
        'At the evening rite, in front of a full nave, the hero is asked to kneel to the High Priestess. He does not. He says no, out loud, and then, looking surprised, says it again.',
      directorNotes:
        'Only if the player freed his hand without telling him. He does not know why his mark has stopped burning; he only knows he can refuse, and he finds he likes it. The crowd does not know what it is watching. Odile does.',
      setsFlags: ['kai_said_no'],
      cancelledByFlags: [],
      requiresFlags: ['freed_without_telling'],
      movesCharacters: [{ characterId: 'kai', toLocationId: 'cathedral_nave' }],
    },
    {
      id: 'we_the_army_marches',
      atWorldMinute: 3 * 1440 + 8 * 60,
      locationId: 'north_gate',
      publicCopy:
        'Drums at the north gate. The army marches out onto the north road with the hero riding at its head, his glowing hand raised, and for one morning the gate stands open to anybody who walks with them.',
      directorNotes:
        'The north road opens. Kai looks for the player in the crowd before he rides out, whatever has happened between them.',
      setsFlags: ['north_road_open', 'army_marched'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'kai', toLocationId: 'north_gate' }],
    },
  ],
  promises: [
    {
      id: 'p_the_third_dawn',
      kind: 'FINALE',
      label: 'Whether you are alive after the third dawn',
      seedHint: 'A small brass sandglass turned over on the steps, and a duty six generations old.',
      payoffHint: 'Somebody stands at the circle at six on the third morning, and what happens there was decided by everything before it.',
      weight: 1,
    },
    {
      id: 'p_why_two',
      kind: 'MYSTERY',
      label: 'Why the circle called two',
      seedHint: 'Gold words glowing in the chalk under your knees that nobody else in the hall can see.',
      payoffHint: 'The first page of the rite: Two shall come. One to bear the light, one to read it.',
      weight: 0.9,
    },
    {
      id: 'p_kai',
      kind: 'RIVAL',
      label: 'Kai Brandt, who got everything you did not',
      seedHint: 'A courier’s backpack over ceremonial white, and a hand that will not stop glowing.',
      payoffHint: 'Kai learns what is written on his hand, and the two of you decide what you are to each other.',
      weight: 0.8,
    },
    {
      id: 'p_mira',
      kind: 'RELATIONSHIP',
      label: 'Why Mira stopped her sword',
      seedHint: 'A blade that stopped a finger’s width from your throat, and a sergeant who will not be thanked.',
      payoffHint: 'Her grandmother’s letter, and the morning she decides whether to lift the blade.',
      weight: 0.8,
    },
    {
      id: 'p_the_fog',
      kind: 'THEME',
      label: 'What the fog is saying',
      seedHint: 'A sparrow in a jar that has not finished one wingbeat in forty-seven years.',
      payoffHint: 'The grey in the north is one unfinished sentence, and a Witness can cross it out.',
      weight: 0.5,
    },
  ],
  archetypes: [
    {
      id: 'arch_nurse',
      name: 'You Were a Night Nurse',
      role: 'Healing and steady hands',
      summary: 'You kept people alive on night shifts, so you can treat wounds, keep your voice level with a blade at your throat, and the cathedral infirmary wants you.',
      playstyle: ['Steady', 'Heals people', 'Earns trust'],
      blurb: 'Twelve years of night shifts. You have had worse people point worse things at you than a sergeant with a sword, and you have never once let anybody see your hands shake. Your work pouch is still clipped to your scrubs: gloves, gauze, antiseptic wipes, a foil blanket.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { first_aid: 3, composure: 2 },
      startingItems: [{ itemId: 'first_aid_kit', qty: 1 }],
      startingAbilities: ['read_the_script', 'patch_them_up'],
      startingReputation: [{ factionId: 'faction_church', amount: 10 }],
    },
    {
      id: 'arch_electrician',
      name: 'You Were an Electrician',
      role: 'Technical craft and fixing',
      summary: 'You fixed wiring for a living, so locks, hinges, lamps and your own phone do more for you here, and the writing on a lock reads to you like a circuit.',
      playstyle: ['Practical', 'Fixes things', 'Finds a way out'],
      blurb: 'Every enchanted lock in this city is a circuit somebody drew by hand. You have been reading other people’s bad wiring for fifteen years. Your multitool is still in your work trousers.',
      attributeBonus: { mind: 2, agility: 2 },
      skillProficiencies: { tinkering: 3, script: 1, sneaking: 1 },
      startingItems: [{ itemId: 'multitool', qty: 1 }],
      startingAbilities: ['read_the_script', 'jury_rig'],
      startingReputation: [{ factionId: 'faction_tallow', amount: 10 }],
    },
    {
      id: 'arch_law',
      name: 'You Studied Law',
      role: 'Reading and persuasion',
      summary: 'You read contracts for a living, so you spot the line in an oath, a rite or an order that somebody hoped you would skim, and argue it out loud.',
      playstyle: ['Talks well', 'Reads the small print', 'Slow to trust'],
      blurb: 'A summoning rite is a contract in very old handwriting, and somebody in this cathedral has been counting on nobody ever reading the back page. A blue ballpoint pen, stolen from a courtroom, is in your pocket.',
      attributeBonus: { mind: 2, presence: 2 },
      skillProficiencies: { fine_print: 3, fast_talk: 2 },
      startingItems: [{ itemId: 'ballpoint_pen', qty: 1 }],
      startingAbilities: ['read_the_script', 'find_the_clause'],
      startingReputation: [{ factionId: 'faction_crown', amount: 10 }],
    },
    {
      id: 'arch_boxer',
      name: 'You Boxed',
      role: 'Hand-to-hand fighting',
      summary: 'You fought in a ring for years, so you can take a hit, throw one back, stay calm and slip out of a grip, and the wardens respect anybody who can.',
      playstyle: ['Physical', 'Close range', 'Hard to rattle'],
      blurb: 'You know exactly how far a sword arm reaches. It is about a foot further than a jab, and you have spent your whole life inside that foot. Your hand wraps are rolled up in your hoodie pocket.',
      attributeBonus: { might: 3, agility: 1 },
      skillProficiencies: { brawling: 3, composure: 1, sneaking: 1 },
      startingItems: [{ itemId: 'hand_wraps', qty: 1 }],
      startingAbilities: ['read_the_script', 'throw_hands'],
      startingReputation: [{ factionId: 'faction_wardens', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is your name?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Okafor' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did you do for a living, back home?',
      helpText:
        'Your job in our world, before the circle took you. It sets what you are good at and what was in your pockets, and it is fixed for the whole story: it cannot be changed later. It does not decide whether you stay, who you trust, or how the third dawn goes. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'appearance',
      label: 'What do you look like? (Only your portrait uses this.)',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Work clothes, a lanyard I forgot to take off, and a face that has not slept since yesterday.',
    },
  ],
  /**
   * Where the third dawn can leave you.
   *
   * "Sent Back" is reachable by doing nothing wrong: the Returning is a world
   * event that needs no flag, and nothing but a route the player built cancels
   * it. It is ambiguous on purpose — the church has never known where the
   * spares go, and neither does this story. "Nobody's Spare" is walking out of
   * the city, and it is available from about a third of the way in.
   *
   * Only "The Last Line" needs the optional fog lead. Every other destination
   * is reachable by a player who never leaves the capital.
   */
  endings: [
    {
      id: 'end_sent_back',
      name: 'Sent Back',
      rarity: 'COMMON',
      minTurn: 18,
      requires: { flagsSet: ['sent_back'], flagsUnset: ['returning_stopped'] },
      condition:
        'Nobody stopped the third dawn. The player may have played well and kindly and simply not built the thing that would have saved them, and that must not read as a punishment. Write the Returning without gore and without certainty, and let the epilogue leave the question open.',
      epilogue:
        'In the Book of Returnings, in Emeric Dahl’s steadier old hand, there is a twelfth entry, and Mira Holt does not sign it. In another world, at 4:12 in the morning, a night bus stops at a shelter nobody was waiting at, and the driver swears afterwards that somebody got on.',
      hint: '',
    },
    {
      id: 'end_heros_second',
      name: 'The Hero’s Second',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['kai_named_you_second'], flagsUnset: ['sent_back'] },
      condition:
        'Kai named the player his second in front of the church, and the Returning could not go ahead without the hero’s consent. The two of them march north together. Write it as two people from the same world deciding to be each other’s home here, with all the jokes intact.',
      epilogue:
        'The army goes north with a hero at its head and a second rider beside him who reads the road signs nobody else can see. Kai still forgets his sword in chairs. The player still has the one song on their phone, and on the third night out, at a fire, they play it for him until the battery dies.',
      hint: 'He has to ask you, in front of all of them.',
    },
    {
      id: 'end_nobodys_spare',
      name: 'Nobody’s Spare',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['returning_stopped'] },
      condition:
        'The player walked out of the city and did not come back for the third dawn. Do not make it a tragedy and do not redeem it. It is a completely coherent answer to a kingdom that scheduled your death on the morning you arrived, and the people it costs most are the ones who had started to hope.',
      epilogue:
        'The cell in the ninth row stays empty. Mira Holt reports the spare escaped, which is the first time in six generations a Holt has written that, and is reprimanded and does not mind. Somewhere south, a stranger who reads road signs too carefully is working a ferry for board and lodging.',
      hint: '',
    },
    {
      id: 'end_tallow_row',
      name: 'Tallow Row',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['hid_in_tallow_row', 'has_new_name'] },
      condition:
        'The player disappeared into the river quarter under a name Bet Tallis sold them, and was there, smoking eels, when the bells rang for a Returning with nobody on the circle. Play the new life small, warm and slightly ridiculous, with the cathedral always visible over the rooftops.',
      epilogue:
        'The new name has a cousin and a boat. Bet calls the player sunshine and charges them rent. Once a week, a red-sashed sergeant buys smoked eel at the blue door, pays too much, and asks how business is, and neither of them ever says anything else.',
      hint: '',
    },
    {
      id: 'end_quiet_bargain',
      name: 'The Quiet Bargain',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['quiet_bargain', 'kept_the_line_secret'] },
      condition:
        'The player took the secret of the line on Kai’s hand to Odile instead of to Kai, and she took them off the schedule in exchange for silence. They are safe, comfortable and complicit. Write the comfort honestly and let the cost sit in it without a speech.',
      epilogue:
        'There are rooms in the cathedral now with the player’s name on the door, a stipend, and a seat near the High Priestess at every rite. The hero marches north and does as he is told. The player can read his hand from the back of the nave, every time, and never once looks away.',
      hint: '',
    },
    {
      id: 'end_crowns_spare',
      name: 'The Crown’s Spare',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: {
        flagsSet: ['crown_claimed_you'],
        minFactionReputation: [{ factionId: 'faction_crown', value: 30 }],
      },
      condition:
        'The regent claimed the player for the crown in front of the church, and the Returning could not proceed against a royal claim. The player now reads contracts, oaths and seals for a kingdom. Write it as a job with good terms and a boss who is honest about being dishonest.',
      epilogue:
        'Ilsabet pays on the first of every month, on the day, and has never once asked the player to lie for her; she only asks what things say. The church sends a priest to every meeting. The player reads his robe’s embroidery aloud to him, once, and after that he stops coming.',
      hint: 'She buys proof, not promises.',
    },
    {
      id: 'end_the_warden_who_stopped',
      name: 'The Warden Who Stopped',
      rarity: 'RARE',
      minTurn: 26,
      requires: {
        flagsSet: ['mira_refused', 'knows:wenna_letter'],
        minRelationship: [{ characterId: 'mira', dimension: 'trust', value: 65 }],
      },
      condition:
        'At the third dawn Mira Holt stood on the circle with the sword and did not lift it, in front of the High Priestess and the Circle Guard, and the Holt duty ended with her. This is her ending as much as the player’s; let her say it in her own few words and let it cost her rank.',
      epilogue:
        'She is stripped of the sash before noon and seems lighter for it. The ninth key on the warden’s ring goes into the river. In the bell tower, behind the third bell, there is a second letter now, in a newer hand, addressed to nobody, because nobody is going to need it.',
      hint: 'Her grandmother wrote to whoever held the blade next.',
    },
    {
      id: 'end_two_free_hands',
      name: 'Two Free Hands',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['freed_together', 'kai_hand_freed'] },
      condition:
        'Kai learned what was written on his hand and the two of them crossed it out together. He is a hero who can say no, and he knows exactly who gave him that. Write the friendship, or more than friendship if that is where it went, as the thing that holds up the rest.',
      epilogue:
        'The mark still glows. It just says less now. Kai refuses the High Priestess twice in the first week, both times about something small, to make sure he can. When the army marches, he rides out with the player beside him and tells everybody who asks that they are from the same street.',
      hint: '',
    },
    {
      id: 'end_two_shall_come',
      name: 'Two Shall Come',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['rite_read_aloud', 'knows:two_shall_come'] },
      condition:
        'The player read the first page of the rite aloud where it could not be hidden again, and the church could not return the Witness the rite itself called for. This is the public ending. Let the crowd, Emeric, Odile and Severin each take it differently, and do not make any of them simple.',
      epilogue:
        'The first page goes behind glass in the nave, where pilgrims queue to see three words. The rite is rewritten within the year. Emeric Dahl adds a final entry to the Book of Returnings, which reads, in full: No more. Odile Castine resigns, and visits the Archive every week for the rest of her life.',
      hint: 'Three words, said in the right room.',
    },
    {
      id: 'end_the_way_home',
      name: 'The Way Home',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['went_home_alive', 'knows:ruth_margin'] },
      condition:
        'The player crossed their own name out of the circle’s calling line, as Ruth Abara’s margin said a Witness could, and went home alive and whole. Write the leaving, not the arriving. What it costs depends entirely on who the player found here and what they said before they went.',
      epilogue:
        'Kitchen light, the hum of a fridge, a phone on the counter at nine per cent that will charge now. Everything is exactly where it was. It takes about a week before the player stops reading street signs twice, and they never quite stop checking their own hands.',
      hint: 'Ruth never got to try.',
    },
    {
      id: 'end_the_second_burning',
      name: 'The Second Burning',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['kai_said_no', 'freed_without_telling'] },
      condition:
        'The player freed Kai’s hand and never told him why. He refused the church in front of a full nave, found he liked it, and the city is now living with a hero nobody can command. Write it as triumph with an edge: the player did a good thing in exactly the way the Burning King’s Witness once did.',
      epilogue:
        'Kai is a good hero. He is also a hero nobody can tell what to do, and he knows it, and he is starting to enjoy it. The church calls it the Second Burning, not yet out loud. The player is the only person who knows the hand is empty, and watches it, every day, in case it is not.',
      hint: '',
    },
    {
      id: 'end_the_last_line',
      name: 'The Last Line',
      rarity: 'UNIQUE',
      minTurn: 32,
      requires: { flagsSet: ['the_last_line_crossed'] },
      condition:
        'The player reached the edge of the grey and crossed out the Burning King’s unfinished sentence, the biggest thing anybody can do in this world. It loosens them almost entirely from it. Whatever they did about the third dawn, write this as the moment the whole country starts moving again.',
      epilogue:
        'The smoke over the village finishes rising. The dog lands. Four hours south, in a locked room in the palace, the king of Corvane finishes the breath he started two years ago and asks what day it is. In the Archive, the sparrow completes its wingbeat and hits the glass, startled, and Emeric opens the window.',
      hint: 'The fog stops mid-sentence.',
    },
  ],
  coverDirection: [
    'SUBJECT: Mira Holt, the cathedral’s warden sergeant, alone and unmistakable in the foreground of a key visual for a fantasy anime about a summoning that called one person too many.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Tall and square-shouldered, black hair cropped at the neck, a pale scar through her left eyebrow, grey steel half-plate under a red sergeant’s sash, scarred knuckles.',
    'Her sword arm is straight out toward the viewer and the blade is held perfectly level at throat height, its point foreshortened and close, so the viewer is the one at the end of the sword.',
    'Thin lines of glowing gold filigree run along the flat of the blade like engraved light: abstract strokes only, no letters, no numbers, nothing that reads as writing.',
    'Her expression is steady and unreadable, eyes level, looking straight at the viewer.',
    'HER FACE STAYS CLEAN: no gold lines, glow, marks or shadows on her face or skin.',
    'Every glowing effect stays on the blade, the chalk ring, the hand-mark behind her and the title, never on a face.',
    'BEHIND HER, soft and secondary: a round stone hall under a cathedral dome, a wide ring of smoking white chalk on the floor with faint gold light in its lines;',
    'kneeling in the ring, smaller and out of focus, a lanky man in a grey hoodie under a white ceremonial surcoat with a square courier backpack, staring at a mark of white light on the back of his right hand, a plain ring of eight short rays;',
    'on stone steps above him, a tall silver-haired priestess in white and gold robes turning a small brass sandglass.',
    'LIGHT: cold blue dawn light from high windows across the hall and across her armour, warm gold light rising from the chalk ring, so she is lit cool from the front and rimmed in gold.',
    'TITLE: the words THE HERO’S SPARE painted into the art across the upper third, above her head, as a bold engraved fantasy serif logo, warm gold edged in white with a soft glow,',
    'spelled exactly THE HERO’S SPARE, apostrophe included, large and legible at thumbnail size. A thin level sword-stroke underlines the word SPARE only. No other text anywhere.',
  ].join(' '),
  opening:
    "A sword point stops against your throat.\n\n\"Don’t move,\" says the woman holding it. Red sash, scarred knuckles, no blink. \"Sergeant Mira Holt. The circle calls one hero. Today it called two.\"\n\nYou’re kneeling in a ring of smoking chalk. Gold writing glows under the white. Nobody else sees it.\n\nBeside you, a lanky man in a grey hoodie stares at his right hand, where a mark of light is burning.\n\nYour hands are empty.\n\nOn the steps above, a priestess in white turns a sandglass over.\n\n\"He’s the hero,\" Mira says. \"You’re the spare. We send spares back the only way we know.\"\n\nThe sand starts to fall.\n\n\"One minute. What are you good for?\"",
  openingPanel: {
    assetKey: 'story_the_hero_s_spare/opening',
    alt: 'Mira Holt in grey half-plate and a red sash, holding a sword level at the viewer’s throat in a domed stone hall, a ring of smoking chalk on the floor with faint gold writing in its lines.',
  },
  openingSuggestions: [
    "\"I can read the writing glowing in that chalk. Every word. Can he?\"",
    'I hold up my phone and switch on the torch.',
    'I ease the blade aside and stand. "Ask me again."',
  ],
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const THE_HERO_S_SPARE = StoryVersion.parse(raw);
