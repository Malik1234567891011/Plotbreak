import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Ten Points to Expulsion" — a college that scores everything, a player with
 * ten points left, and a student president offering a thousand to fail.
 *
 * Slate #36 of the fifty (`docs/stories-50/PLAN.md`), built on the shape of
 * Good Morning, Husband: one scene that starts mid-moment, a cast who each
 * want a specific thing this week, three invisible variables, and an optional
 * lead that never leaks into a run that did not ask for it.
 *
 * The structural bet is that the number is the game. In production the
 * storyteller reads hard canon, the tone guide, the cast and the quest items,
 * and none of the engine's resources, so the Tariff lives in all three places
 * the storyteller does read: hard canon, the tone guide's band-notice format,
 * and the laminated Tariff sheet as a quest item. A player who wants a points
 * game gets one beat by beat. A player who does not can ignore the arithmetic
 * and still have Ren, Yui and a rigged college to deal with.
 *
 * The playable span is Monday 08:59 to the Standing Hearing on Friday at ten.
 * The Correction (a fixed pool of points, refilled from the poorest students
 * just after midnight, authorised by a brass key the Provost wears) is the
 * main mystery and is found by anybody who follows the deductions. Mr. Grey's
 * history — the last perfect paper, sixteen years ago — is the lead only a
 * curious player opens. Every ending but one is reachable without it.
 *
 * Zero is not game over. A student on Notice keeps their band for forty-eight
 * hours, can still act, and can be saved by a gift of points; expulsion is a
 * destination with its own endings rather than a fail state. That is what lets
 * a player throw a punch at the president on turn one and still have a story.
 *
 * Three variables. Focus is the only GOOD_HIGH, because `resolveRest` refills
 * those and a clear head after sleep is the honest thing for that to mean.
 * Heat is the first GOOD_LOW on purpose: PUBLIC_VIOLENCE raises the first one
 * in array order, and a student brawling in the colonnade should be watched
 * harder. Complicity is what the hill's real economy does to a person: every
 * bribe, lie and sale moves it, and nothing else does.
 *
 * Everybody here is an adult. Tallis is a four-year residential college that
 * admits at eighteen or older, and the Ledger is software, not a person.
 */

const raw = {
  id: 'sv_ten_points_to_expulsion_1',
  storyId: 'story_ten_points_to_expulsion',
  version: 1,
  title: 'Ten Points to Expulsion',
  fantasyLabel: 'Ten points left. Zero means you’re out.',
  hook: 'At a college where every action earns or costs points and zero means expulsion, you have ten left, and the student president has just offered you a thousand to fail this morning’s exam.',
  premise:
    'Tallis College scores everything. Every student wears a band, and a system called the Ledger watches the whole campus through them, adding or taking away points for what it sees. Hold a door: plus one. Run in the colonnade: minus two. Points buy your meals, your room and your library time. At zero, you are expelled.\n\n' +
    'You are here on the college’s one full scholarship, because your entrance exam was perfect. Paying students start the year with thousands of points from their families’ endowment. You started with fifty. A month of learning the rules the hard way later, you have ten.\n\n' +
    'This morning is the Standing Paper, the exam that re-ranks the whole first year. Thirty seconds before the bell, Ren Calloway, the student president, sat down at your desk and offered you a thousand points to hand in a blank paper.\n\n' +
    'A thousand points would make you safe for the year, and it would save your friend Yui, who is down to three. So you have to decide, now, what your exam is worth, and why it is worth so much to him.\n\n' +
    'Something is wrong with the Ledger. Some deductions arrive with no reason given, the proctor watching your exam knows more than he says, and the last student who asked to see its books was expelled six days later.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Academy', 'Drama', 'Rivalry', 'Mystery', 'Comedy'],
  mechanicsChips: [
    'Every move scores',
    'Zero means expulsion',
    'Bribes are lawful',
    'Lying is a real option',
    'Walk out whenever you like',
  ],
  contentDescriptors: ['ROMANCE', 'MORAL_AMBIGUITY', 'FANTASY_VIOLENCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can take the thousand and coast, sit the paper and find out what a perfect score sets off, or spend the week keeping Yui above zero one soup at a time. Every choice moves your number, and the Ledger will tell you exactly by how much. Ren will notice which you pick. So will the proctor.',
  openingObligations: [
    {
      what: 'Answer Ren Calloway before the bell rings and the Standing Paper begins',
      withCharacterId: 'ren',
      dueInMinutes: 1,
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'exam_hall',
    startWorldMinute: 8 * 60 + 59,
    startingItems: [{ itemId: 'band', qty: 1 }],
    hardCanon: [
      'Tallis College is a four-year residential college on a hill above the town of Brackwater. Every student is an adult, at least eighteen. The player is a first-year a month into term, on the college’s one full scholarship, which goes to the highest entrance exam score of the year.',
      'Every student wears a band. The Ledger, the college’s scoring system, sees through the bands and through lenses on every building, and adds or takes away points by a published Tariff. Points buy meals, rooms, library time and resits. At zero a student is served Notice and is expelled forty-eight hours later unless their balance is back above zero.',
      'The Tariff, in part: helping staff or a student +1 to +3; a kitchen shift +2; a top-ten exam paper +50; a perfect paper +200; winning a Stake, the amount staked. Running in the colonnade -2; lateness -3; a raised voice in a hall -2; lying to staff, if caught, -5; leaving a sitting early -10; refusing a lawful Stake -5; removing your band -20; unsanctioned violence -50. Gifts of points between students are lawful and unlimited.',
      'Paying students start each year with an endowment credit of thousands of points. Scholarship and bursary students start with fifty. The player starts the story at 10 points and Yui Arakawa at 3.',
      'The Standing Paper, sat by the whole first year this Monday morning, re-ranks the year on the Board in the colonnade at six in the evening. Under clause nine of the Tallis Charter, a student who scores a perfect Standing Paper gains the Right of Audit: the Ledger must show them its complete books, and the Council cannot suspend that right.',
      'The player’s entrance exam was perfect, and they can score perfect today if they sit the paper honestly. Ren Calloway has read their file and knows it.',
      'The Correction: the Ledger’s points are a fixed pool. The thousands credited to the founding families’ heirs are balanced by small Adjustments, most of them just after midnight, taken from the students with least and authorised by Key Seven, a brass key the Provost wears. Ren co-signs it each quarter as president and means to end it quietly in his last vote. Margot Ashdown runs the file and skims it. All of this is discoverable and none of it is owed.',
      'Sixteen years ago Tobias Grey, now the proctor and night porter, scored the last perfect Standing Paper, opened the audit, read one page before Key Seven closed the session, and was drained to zero in six days. He stayed on as staff. The Ledger does not score staff.',
      'The Ledger cannot see past the main gate. Brackwater town is unscored, and its newspaper has wanted a way through that gate for years.',
      'A Standing Hearing of the Council and the Provost sits on Friday at ten. Anyone under twenty points after the Standing Paper, or whose paper is under complaint, is called before it to be carried or expelled.',
      'Zero is not the end of the story. A student on Notice keeps their band for forty-eight hours, can still act on campus, can be saved by a gift of points, and can carry on from outside the gate.',
      'Nobody on the hill wants the player hurt. The dangers are being drained, fined, bought, made complicit, or expelled.',
    ],
    toneGuide:
      'Anime academy drama with a scoreboard running underneath it: quick, funny, tense, and petty in the specific way of a place where everything costs something. ' +
      'Every beat that changes the player’s balance shows it as a band notice on its own line, in the Ledger’s exact format: [+1 · Held a door · Balance 11]. Keep the running balance correct from beat to beat, apply the Tariff the same way every time, and let Adjustments arrive with no reason given. The number is the game. ' +
      'Nobody here is a monster. Ren is principled and compromised, Margot is ambitious, the Provost believes she saved the college, and every one of them can be argued with, bought or surprised. ' +
      'Fights are rare and expensive: a Stake bout at the boathouse is sparring with rules, tape and a medic, and a punch anywhere else costs fifty points. Injuries are bruises and split lips at worst; nothing is graphic. ' +
      'Everyone is an adult and is written as one. Romance is optional, flirtatious, tense and heartfelt, and goes no further than a kiss; never fan service, never lingering on bodies. ' +
      'Comedy lives in the Tariff: the absurd deductions, the meal prices, Yui’s arithmetic. The face at the top of a beat is Ren’s or Yui’s whenever one of them is in the scene and the moment involves them.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The soup costs one point.\n\n[-1 · Refectory: soup · Balance 9]\n\nMargot Ashdown sits down across from you with a salad that costs more than your room.\n\n\"Quick thing!\" she says. \"You didn’t take Ren’s card.\"\n\n\"No.\"\n\n\"Totally your call.\" She turns her tablet round so you can see your own name on it. \"I just think nine is a really small number. And I’m really, really good at arithmetic.\"",
      "Mr. Grey does not look up from the logbook.\n\n\"The lodge closes at eleven.\"\n\n\"It’s ten to.\"\n\n\"Then you have ten minutes.\" He turns a page. \"On Monday you asked me why staff are not scored. I did not answer.\"\n\nThe stove ticks.\n\nHe closes the logbook and, for the first time since you met him, looks straight at you.\n\n\"I was not always staff.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 13, presence: 11, resolve: 12, arcana: 7 },
  skills: [
    { id: 'study', name: 'Study', attribute: 'mind', description: 'Knowing the answer, and knowing it with a clock running and a president watching.' },
    { id: 'rules', name: 'Small Print', attribute: 'mind', description: 'The Tariff, the Charter, and the gaps between what they say and what everybody assumes they say.' },
    { id: 'front', name: 'Front', attribute: 'presence', description: 'A straight face while saying something that is not true to somebody who can fine you for it.' },
    { id: 'bargain', name: 'Bargaining', attribute: 'presence', description: 'Naming a number first and making the other side argue down from it.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Saying the thing in a room full of people who would like you to sit down.' },
    { id: 'scrapping', name: 'Scrapping', attribute: 'might', description: 'Fighting in a ring with tape and a medic. Occasionally, expensively, without either.' },
    { id: 'graft', name: 'Graft', attribute: 'might', description: 'Shifts, lifting and mopping: the work the Tariff pays two points for.' },
    { id: 'blind_spots', name: 'Blind Spots', attribute: 'agility', description: 'Where the lenses do not reach, and how to walk there without looking like you are hurrying.' },
    { id: 'gut', name: 'Gut', attribute: 'arcana', description: 'Knowing a number is wrong a long time before you can prove it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Focus is the one thing rest restores. Heat comes first among the
   * descending pair so that a public fight raises it. Complicity is moved only
   * by the economy of the hill — throwing the paper, lying for points — and
   * never comes back down on its own.
   */
  resources: [
    {
      id: 'focus',
      name: 'Focus',
      max: 100,
      start: 78,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The page swims. The player misreads a Tariff line they know by heart, agrees to a Stake they meant to refuse, and Yui puts a plain tray in front of them without asking.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes. Questions blur, the player misreads the small print and agrees to things to end conversations. Exams go badly here, bargaining goes worse, and sleep or a plain tray is honestly the best move on the board.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a college day at ten points. Good for one more argument or one more hour in the library, not both. Yui notices before the player does and says so in terms of soup.',
        },
        {
          upTo: 100,
          behaviour:
            'A clear head. The player can hold a whole exam paper, a bluff and a price in mind at once, read the Tariff properly, and spot the one number on the Board that does not add up.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 12,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody with a council pin knows the player’s name. They are one red band among eleven on the attic corridor, which is safe, and which is exactly how the Correction likes its students.',
      color: '#D1495B',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody important knows the player’s name yet. Prefects walk past, the council is busy with its own arithmetic, and small rule-bending goes unnoticed by anybody holding a pen.',
        },
        {
          upTo: 50,
          behaviour:
            'The council has a file with the player’s name on it. Margot says hello in corridors, fines arrive for things other students do every day, and Bastian is often somewhere in sight.',
        },
        {
          upTo: 80,
          behaviour:
            'The player is an item on somebody’s agenda. Doors in the council wing stay shut, a prefect turns up wherever they go, and the Provost’s secretary has begun asking after their wellbeing.',
        },
        {
          upTo: 100,
          behaviour:
            'Open war with the institution. Every Tariff line is applied to the letter, the Friday hearing is being prepared rather than scheduled, and nobody wearing a council pin will be seen talking to the player alone.',
        },
      ],
    },
    {
      id: 'complicity',
      name: 'Complicity',
      max: 100,
      start: 5,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Clean hands, and everybody can see it. Ren finds the player impossible to price, and the attic trusts them with its whip-round jar.',
      color: '#6D597A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Clean hands. The player has not been bought, has not lied for points and has not sold anybody. People in the attic trust them with things, and Ren finds them very hard to price.',
        },
        {
          upTo: 60,
          behaviour:
            'A few deals made and a few lies told, all of them defensible. Ren starts speaking to the player as an equal, which is a compliment and a warning, and Yui starts checking what they mean.',
        },
        {
          upTo: 100,
          behaviour:
            'The player has become fluent in the hill’s real language. Offers arrive unprompted, the attic goes quiet when they walk in, and every honest thing they say now has to be paid for twice.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'band',
      name: 'Your Band',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'Matte black, fitted to your left wrist at induction, with a white number on its face: your balance. Under ten, a small red light comes on beside the number and stays on.',
      loreText:
        'Taking it off on campus costs twenty points. It buzzes for every change, and you can ask it questions, which go to the Ledger and come back in the Ledger’s own words.',
      icon: 'watch',
    },
    {
      id: 'rens_card',
      name: 'The Black Card',
      tags: ['quest', 'currency'],
      questItem: true,
      description:
        'A black transfer card printed in gold: 1,000 POINTS. Tap it to any band and the points move, logged as a gift from R. Calloway with an empty memo line.',
      loreText:
        'Gifts between students are lawful and unlimited. The card is single-use and works for whoever taps it, which Ren knows, and which is either very generous or a test.',
      icon: 'card',
    },
    {
      id: 'exam_paper',
      name: 'The Standing Paper',
      tags: ['document'],
      description:
        'Forty questions, three hours, and a cover sheet with your name and your balance printed on it. Question forty is the one nobody gets.',
      loreText:
        'The whole first year sits it together on the first Monday of the second month. Under clause nine of the Charter, a perfect paper earns the Right of Audit.',
      icon: 'papers',
    },
    {
      id: 'tariff_sheet',
      name: 'The Tariff',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { rules: 1 },
      description:
        'One laminated sheet issued at induction. Help staff or a student: +1 to +3. A kitchen shift: +2. Top-ten exam paper: +50. Perfect paper: +200. Win a Stake: the amount staked. Running in the colonnade: -2. Late to anything: -3. Raised voice in a hall: -2. Lying to staff, if caught: -5. Leaving a sitting early: -10. Refusing a lawful Stake: -5. Removing your band: -20. Unsanctioned violence: -50.',
      loreText:
        'Meals cost 1. The plain tray is free under ten points. A library afternoon costs 2, a heated room 5 a week. The bottom line, in the smallest print on the sheet: Adjustments may be made.',
      icon: 'papers',
    },
    {
      id: 'yuis_notebook',
      name: 'Yui’s Notebook',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      skillModifiers: { gut: 1 },
      description:
        'A cheap spiral notebook, half full, with one line for every deduction Yui is sure she never earned. Thirty-one lines. Every one says Adjustment. Almost every one is timed just after midnight.',
      loreText:
        'In the margin, in a different pen: ask the others. Underneath, eleven names from the attic corridor, each with its own short column of minus ones.',
      icon: 'book',
    },
    {
      id: 'charter',
      name: 'The Tallis Charter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The college’s founding document, under glass in the library’s front hall, twenty-three years old in its current form. Clause nine is three lines long.',
      loreText:
        'Clause nine: any student who scores a perfect Standing Paper may require the Ledger to show them its complete books, and it shall not refuse. Nobody has amended it, because for sixteen years nobody has needed to.',
      icon: 'scroll',
    },
    {
      id: 'correction_file',
      name: 'The Correction File',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description:
        'A grey council folder holding one sheet per quarter: about nine thousand points a quarter, divided among forty names, every one of them under a hundred. Two signatures at the bottom of each sheet: R. Calloway, President, and A. Marsh, Provost.',
      loreText:
        'A third column, in pencil, in Margot Ashdown’s neat hand, does not match the total. The difference goes to one account every quarter, and it is hers.',
      icon: 'folder',
    },
    {
      id: 'grey_page',
      name: 'The Grey Page',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description:
        'One sheet of old printer paper, folded in four and kept in a biscuit tin behind the lodge stove. The top line reads AUDIT · Session opened by T. Grey. The bottom line reads Session closed by Key Seven.',
      loreText:
        'Between those two lines: forty-one Adjustments from a single night sixteen years ago, every one authorised by Key Seven, every one taken from a scholarship or bursary account.',
      icon: 'letter',
    },
    {
      id: 'key_seven',
      name: 'Key Seven',
      tags: ['quest', 'key'],
      questItem: true,
      description:
        'A heavy brass key on a green ribbon, warm from being worn. It fits one lock: a terminal in the Provost’s study that talks directly to the Ledger.',
      loreText:
        'Turned one way, it authorises Adjustments. Turned the other, according to the Ledger’s own manual, it reverses them. Nobody has ever turned it the other way.',
      icon: 'key',
    },
    {
      id: 'council_pin',
      name: 'A Council Pin',
      tags: ['access'],
      description:
        'A small silver pin in the shape of a balance. Doors in the council wing open for it and prefects stop asking questions.',
      loreText:
        'Wearing one that is not yours costs nothing on the Tariff, because nobody who wrote the Tariff imagined anybody would.',
      icon: 'badge',
    },
    {
      id: 'plain_tray',
      name: 'A Plain Tray',
      tags: ['food'],
      stackable: true,
      maxStack: 3,
      consumable: { resourceId: 'focus', amount: 15, consumesItem: true },
      description:
        'Soup, bread and a cup of tea, free to any student under ten points. It tastes exactly as free as it is.',
      loreText:
        'The cooks put extra bread on Yui’s. They have been doing it all month and the Ledger has not noticed, because staff are not scored.',
      icon: 'food',
    },
    {
      id: 'hand_tape',
      name: 'Hand Tape',
      tags: ['gear'],
      skillModifiers: { scrapping: 1 },
      description:
        'A roll of white cloth tape from the boathouse. Bastian will not let anybody into his ring without it.',
      loreText:
        'He tapes your hands himself if you do it badly, and he always says the same thing while he does it: properly.',
      icon: 'tools',
    },
    {
      id: 'reporters_card',
      name: 'A Reporter’s Card',
      tags: ['document'],
      description:
        'A business card for the education desk of the Brackwater newspaper, left on the counter of the cafe outside the gate. Somebody has written on the back: ask about clause nine.',
      loreText:
        'The Ledger cannot see past the gate, and the newspaper has been trying to see past it the other way for years.',
      icon: 'card',
    },
  ],
  abilities: [
    {
      id: 'sit_the_paper',
      name: 'Sit It Properly',
      tags: ['utility'],
      description: 'Turn the paper over and answer every question as well as you can, whatever anybody has offered you.',
      affordances: ['answer the questions', 'sit the exam', 'do the paper', 'take the exam', 'start writing', 'turn over the paper', 'study', 'revise'],
      costs: [{ resourceId: 'focus', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'study', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'throw_it',
      name: 'Throw the Paper',
      tags: ['utility'],
      description: 'Hand in a blank page, or a wrong one, on purpose, and let the number fall where somebody paid for it to fall.',
      affordances: ['hand in a blank paper', 'fail the exam', 'throw it', 'leave it blank', 'get it wrong on purpose', 'do what he asked'],
      costs: [{ resourceId: 'complicity', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'name_a_price',
      name: 'Name a Price',
      tags: ['social'],
      description: 'Say a number first and make the other side argue down from it. Works on presidents, treasurers and provosts.',
      affordances: ['negotiate', 'bargain', 'counter-offer', 'ask for more', 'make a deal', 'name my price', 'haggle', 'sell'],
      costs: [{ resourceId: 'focus', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargain', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lie_straight',
      name: 'Lie Straight-Faced',
      tags: ['social'],
      description: 'Tell somebody exactly what they want to hear, in a place where lying to staff costs five points if anybody catches it.',
      affordances: ['lie', 'bluff', 'say yes and mean no', 'pretend', 'make something up', 'cover for', 'deny it'],
      costs: [{ resourceId: 'complicity', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'front', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_rules',
      name: 'Work the Rules',
      tags: ['sight'],
      description: 'Read the Tariff and the Charter for the line everybody else skimmed, and stand on it.',
      affordances: ['read the tariff', 'check the rules', 'find a loophole', 'read the charter', 'quote the rule', 'look it up', 'check the small print'],
      costs: [{ resourceId: 'focus', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'rules', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_it_out',
      name: 'Call It Out',
      tags: ['social'],
      description: 'Say what is happening, out loud, in front of everybody, and let the room decide what to do with it.',
      affordances: ['expose him', 'tell the proctor', 'call him out', 'say it out loud', 'accuse', 'report it', 'tell everyone', 'go public'],
      costs: [{ resourceId: 'heat', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_straight',
      name: 'Ask Straight Out',
      tags: ['social'],
      description: 'Put the question nobody in the room wants asked, and then be quiet long enough for it to get an answer.',
      affordances: ['ask why', 'ask him directly', 'press her', 'ask what is going on', 'demand an answer', 'ask the real question'],
      costs: [{ resourceId: 'focus', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_the_ledger',
      name: 'Ask the Ledger',
      tags: ['sight'],
      description: 'Speak to your band. The Ledger answers exactly what was asked, in its own format, and nothing else.',
      affordances: ['ask the band', 'ask the ledger', 'check my balance', 'query the ledger', 'check my deductions', 'read my account'],
      costs: [{ resourceId: 'focus', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'earn_it',
      name: 'Earn It',
      tags: ['utility'],
      description: 'Do the work the Tariff pays for: a shift, a favour, a door held, a tray carried for somebody else.',
      affordances: ['help', 'work a shift', 'carry it', 'hold the door', 'tutor', 'clean up', 'volunteer', 'earn points'],
      costs: [{ resourceId: 'focus', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_unseen',
      name: 'Go Unseen',
      tags: ['movement'],
      description: 'Walk the routes the lenses do not cover, at the pace of somebody who has every right to be there.',
      affordances: ['sneak', 'slip past', 'avoid the lenses', 'hide', 'go round the back', 'sneak in', 'get in unseen'],
      costs: [{ resourceId: 'focus', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'blind_spots', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stake_a_bout',
      name: 'Call a Stake',
      tags: ['combat'],
      description: 'Put points on a bout in the boathouse ring, with tape, a medic and the Ledger watching, and win or lose them honestly.',
      affordances: ['accept the stake', 'challenge him', 'fight in the ring', 'call a stake', 'box', 'spar', 'get in the ring'],
      costs: [
        { resourceId: 'focus', amount: 12 },
        { resourceId: 'heat', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'scrapping', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'swing_first',
      name: 'Swing First',
      tags: ['offensive'],
      description: 'Hit somebody outside the ring. The Tariff calls it unsanctioned violence and charges fifty points for it.',
      affordances: ['punch him', 'hit him', 'throw a punch', 'deck him', 'swing at him', 'shove him', 'flip the desk'],
      costs: [{ resourceId: 'heat', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'scrapping', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_company',
      name: 'Stay With Them',
      tags: ['social'],
      description: 'Do not fix it, do not price it, do not leave. Sit down next to somebody and be there.',
      affordances: ['sit with her', 'stay', 'keep her company', 'wait with him', 'say nothing', 'share the tray', 'just be there'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'invoke_audit',
      name: 'Invoke the Audit',
      tags: ['sight'],
      description: 'Stand in front of the Ledger and require it, under clause nine, to show you its complete books.',
      affordances: ['invoke the audit', 'demand the books', 'open the audit', 'clause nine', 'show me the books', 'read the ledger'],
      costs: [{ resourceId: 'heat', amount: 25 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['earned_the_audit'],
        lockedCopy:
          'The Ledger opens its books to one kind of student, and that takes a perfect Standing Paper. Without one, asking is just a question it is allowed to ignore.',
      },
    },
    {
      id: 'turn_the_key',
      name: 'Turn Key Seven',
      tags: ['utility'],
      description: 'Put the Provost’s brass key into the terminal in her study and turn it, one way or the other.',
      affordances: ['turn the key', 'use the key', 'reverse it', 'run the correction', 'put the key in', 'undo the adjustments'],
      costs: [{ resourceId: 'heat', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['holds_the_key'],
        lockedCopy:
          'There is a terminal in the Provost’s study that answers to one brass key, and that key is on a ribbon round somebody else’s neck.',
      },
    },
  ],
  locations: [
    {
      id: 'exam_hall',
      name: 'The Examination Hall',
      shortName: 'Exam Hall',
      description:
        'Two hundred and twelve single desks in rows under a vaulted ceiling, a clock that ticks loudly enough to count by, and a raised dais at the front with a brass hand bell on it. Every desk has a lens above it. Every band in the room shows a number.',
      artDirection:
        'Vast old college examination hall, rows of single wooden desks, tall arched windows with morning light, a vaulted ceiling with small black camera lenses, a raised dais with a brass hand bell. Tense, hushed, navy and gold.',
      connections: [{ to: 'colonnade', travelMinutes: 2, label: 'Out through the double doors' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'rens_card', qty: 1, ownerId: 'ren', aka: ['card', 'the card', 'black card', 'the black card', 'his card', 'the thousand'] },
        { itemId: 'exam_paper', qty: 1, ownerId: null, aka: ['paper', 'the exam', 'my paper', 'exam paper', 'the standing paper'] },
      ],
    },
    {
      id: 'colonnade',
      name: 'The Colonnade',
      shortName: 'Colonnade',
      description:
        'A long covered walkway of pale stone columns that joins every building on the hill. At its centre hangs the Board, a screen two storeys high that shows every student’s balance in rank order and rewrites itself at six each evening. Running here costs two points, and everybody is always nearly running.',
      artDirection:
        'Long sunlit stone colonnade on a college campus, students in navy blazers walking fast, a huge glowing ranking screen hung between columns showing names and numbers, ivy, lens housings on the capitals. Bright, crowded, competitive.',
      connections: [
        { to: 'exam_hall', travelMinutes: 2, label: 'The examination hall' },
        { to: 'refectory', travelMinutes: 3, label: 'The refectory' },
        { to: 'scholar_attic', travelMinutes: 5, label: 'Up to the attic rooms' },
        { to: 'library', travelMinutes: 3, label: 'The library' },
        { to: 'council_chamber', travelMinutes: 4, label: 'The council wing' },
        { to: 'boathouse', travelMinutes: 8, label: 'Down the steps to the river' },
        { to: 'porters_lodge', travelMinutes: 6, label: 'The main gate' },
        { to: 'provost_house', travelMinutes: 7, label: 'Across the lawn to the Provost’s House' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'tariff_sheet', qty: 1, ownerId: null, aka: ['tariff', 'the tariff', 'tariff sheet', 'the rules', 'points list'] },
      ],
    },
    {
      id: 'refectory',
      name: 'The Refectory',
      shortName: 'Refectory',
      description:
        'A long dining hall with a high table for the top of the Board and benches for everybody else. Every meal costs a point except the plain tray, which is free under ten and is served from the end of the counter nobody looks at. The cooks are staff, and staff are not scored.',
      artDirection:
        'Grand college dining hall, long wooden tables, a raised high table under portraits, a serving counter with steam, one small side counter with plain trays of soup and bread. Warm light, loud, class lines visible in where people sit.',
      connections: [{ to: 'colonnade', travelMinutes: 3, label: 'Back out to the colonnade' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'plain_tray', qty: 3, ownerId: null, aka: ['tray', 'plain tray', 'soup', 'bread', 'free meal'] },
      ],
    },
    {
      id: 'scholar_attic',
      name: 'The Attic Corridor',
      shortName: 'The Attic',
      description:
        'The top floor of the oldest dormitory, under the roof, where the rooms cost nothing because the heating costs five points a week. Eleven doors, eleven red bands, one whip-round jar on the landing, and a window that looks down on the Board.',
      artDirection:
        'Narrow attic dormitory corridor under sloping beams, eleven plain doors with handwritten name cards, a jar of coins on a windowsill, cold blue evening light, a far-off glow of a giant screen through the window. Shabby, close, defiant.',
      connections: [{ to: 'colonnade', travelMinutes: 5, label: 'Down the four flights' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'yuis_notebook', qty: 1, ownerId: 'yui', aka: ['notebook', 'her notebook', 'yui’s notebook', 'spiral notebook', 'the list of deductions'] },
      ],
    },
    {
      id: 'library',
      name: 'The Calloway Library',
      shortName: 'Library',
      description:
        'Three floors of oak and green lamps, paid for by Ren’s grandfather and named for him. An afternoon costs two points; the unheated reading room in the basement is free. The Charter sits under glass in the front hall, and a corridor of year photographs runs back to the day the Ledger was switched on.',
      artDirection:
        'Grand old college library, three galleried floors of oak shelves, green reading lamps, a glass display case with an old charter document, a corridor of framed class photographs. Hushed, rich, slightly intimidating.',
      connections: [
        { to: 'colonnade', travelMinutes: 3, label: 'Back to the colonnade' },
        { to: 'ledger_room', travelMinutes: 2, lockedByFlag: 'knows:the_pattern', label: 'The plain door at the bottom of the basement stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'charter', qty: 1, ownerId: null, aka: ['charter', 'the charter', 'tallis charter', 'founding document'] },
      ],
    },
    {
      id: 'ledger_room',
      name: 'The Vault',
      shortName: 'Vault',
      description:
        'A cold white room under the library basement, humming, with racks of machines behind glass and a single terminal on a steel desk. This is where the Ledger lives. A sign on the wall quotes clause nine in full. Nobody has read it aloud in here for sixteen years.',
      artDirection:
        'Cold white server vault beneath an old library, glass-fronted racks of blinking machines, one terminal on a steel desk, a framed printed rule on the wall. Clinical, quiet, faint blue glow.',
      connections: [{ to: 'library', travelMinutes: 2, label: 'Back up the basement stairs' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 1 },
    },
    {
      id: 'council_chamber',
      name: 'The Council Chamber',
      shortName: 'Council',
      description:
        'A round room at the top of the council wing, glass on three sides, with eleven chairs around a table and a white one at the head of it. The treasurer’s office is through a side door. Entering without a pin or an invitation costs three points, and people pay it.',
      artDirection:
        'Circular student council chamber high in a college tower, glass walls over a green campus, eleven navy chairs and one white chair around a polished table, a side door to a small office with filing cabinets. Elegant, cold, powerful.',
      connections: [{ to: 'colonnade', travelMinutes: 4, label: 'Down the council stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'correction_file', qty: 1, ownerId: 'margot', aka: ['file', 'the file', 'correction file', 'grey folder', 'the folder'] },
        { itemId: 'council_pin', qty: 1, ownerId: 'margot', aka: ['pin', 'council pin', 'silver pin', 'her pin'] },
      ],
    },
    {
      id: 'boathouse',
      name: 'The Old Boathouse',
      shortName: 'Boathouse',
      description:
        'A timber boathouse on the river at the foot of the hill, its boats long gone, a roped ring in the middle of the floor and a medic’s bench by the door. Stakes are settled here on Thursday nights. The jetty outside is the only place on campus with one lens, and it points at the water.',
      artDirection:
        'Old wooden boathouse on a river at dusk, a roped boxing ring on the plank floor, hanging lights, a first aid bench, a long jetty outside over dark water. Warm amber light inside, cool blue outside.',
      connections: [{ to: 'colonnade', travelMinutes: 8, label: 'Up the river steps' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'hand_tape', qty: 2, ownerId: null, aka: ['tape', 'hand tape', 'wraps', 'roll of tape'] },
      ],
    },
    {
      id: 'porters_lodge',
      name: 'The Porter’s Lodge',
      shortName: 'Lodge',
      description:
        'A stone lodge in the arch of the main gate, a stove, a logbook, a key board and a stool by the fire that the night porter lets students sit on until a quarter past eleven. The last lens on campus is on the inside of the arch. Past the gate, the Ledger sees nothing.',
      artDirection:
        'Small stone porter’s lodge built into an old college gate arch, a cast-iron stove glowing, a wall of hanging keys, a thick logbook on a desk, the town lights visible through the open gate at night. Cosy, watchful.',
      connections: [
        { to: 'colonnade', travelMinutes: 6, label: 'Back up into the college' },
        { to: 'brack_street', travelMinutes: 5, label: 'Out through the gate and down the hill' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'grey_page', qty: 1, ownerId: 'grey', aka: ['page', 'the page', 'grey’s page', 'the printout', 'the biscuit tin'] },
      ],
    },
    {
      id: 'provost_house',
      name: 'The Provost’s House',
      shortName: 'Provost',
      description:
        'A tall grey house at the far side of the lawn, with a polished door, a drawing room where tea is served to students who are about to be told something, and a study at the back with a terminal in it that answers to one brass key.',
      artDirection:
        'Elegant grey stone house on a college lawn, a formal drawing room with a tea set and armchairs, a dark wood study beyond with a single old terminal glowing on the desk. Gracious, quiet, quietly menacing.',
      connections: [{ to: 'colonnade', travelMinutes: 7, label: 'Back across the lawn' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'key_seven', qty: 1, ownerId: 'marsh', aka: ['key', 'the key', 'brass key', 'key seven', 'seventh key'] },
      ],
    },
    {
      id: 'brack_street',
      name: 'Brack Street',
      shortName: 'Town',
      description:
        'The one street of the town at the foot of the hill: a cafe that takes money instead of points, a launderette, a bus stop with a night bus, and the office of the town newspaper. Nobody’s balance is on anything here. Students come down to say things they cannot say in front of a lens.',
      artDirection:
        'Small town high street at the bottom of a hill at night, a lit cafe window, a bus shelter, a newspaper office sign, the college on the hill above with its giant screen glowing. Ordinary, free, a little lonely.',
      connections: [{ to: 'porters_lodge', travelMinutes: 5, label: 'Back up the hill to the gate' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [
        { itemId: 'reporters_card', qty: 1, ownerId: null, aka: ['business card', 'reporter’s card', 'the newspaper card'] },
      ],
    },
  ],
  /**
   * The council is first on purpose: PUBLIC_VIOLENCE costs the first faction in
   * array order, and the people who write the fines are the ones a public brawl
   * should cost.
   */
  factions: [
    {
      id: 'faction_council',
      name: 'The Merit Council',
      description:
        'Eleven students elected by points, which means by the richest, who set the fines on the Tariff, approve large transfers and sit on the Standing Hearing. Ren Calloway chairs it from the white chair. Margot Ashdown keeps its books.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A name on a list' },
        { atReputation: 30, label: 'Noticed' },
        { atReputation: 60, label: 'Asked to sit in' },
      ],
      allies: ['faction_endowed'],
      enemies: [],
    },
    {
      id: 'faction_attic',
      name: 'The Attic',
      description:
        'Scholarship and bursary students, everybody under a hundred points, who live in the unheated rooms under the roof and keep a whip-round jar for whoever is about to hit zero. They know every free meal and every corner the lenses miss.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'New on the corridor' },
        { atReputation: 35, label: 'One of us' },
        { atReputation: 60, label: 'The one we ring' },
      ],
      allies: ['faction_staff'],
      enemies: [],
    },
    {
      id: 'faction_endowed',
      name: 'The Founding Families',
      description:
        'The families whose endowment rescued the college twenty-three years ago, and whose heirs start every year with thousands of points. They do not come up the hill. They ring the Provost.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Somebody’s scholarship' },
        { atReputation: 40, label: 'A useful name' },
        { atReputation: 70, label: 'Invited to dinner' },
      ],
      allies: ['faction_council'],
      enemies: [],
    },
    {
      id: 'faction_staff',
      name: 'The Staff',
      description:
        'Porters, cooks, cleaners and proctors. The Ledger does not score them, so they are the only people on the hill who can do a favour for free, and they remember exactly who says thank you.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A student' },
        { atReputation: 30, label: 'Known by name' },
        { atReputation: 60, label: 'Let in the back door' },
      ],
      allies: ['faction_attic'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'ren',
      name: 'Ren Calloway',
      role: 'Student president, fourth-year, and the richest balance on the Board',
      cardBlurb:
        'He is the highest number on the Board, he has just offered you a thousand points to fail, and for one second while he did it he looked like he hoped you would say no.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to the point of insult', 'Never raises his voice', 'Pays every debt the same day'],
      hiddenDrives: [
        'He has co-signed the Correction four times and means to end it in his last council vote, quietly, so that his family’s name survives it',
        'He wants one person on this hill who cannot be bought, and he is spending a thousand points to find out whether the player is it',
      ],
      values: [
        'Saying the price out loud instead of pretending there is not one',
        'Paying what he owes, the same day, in full',
      ],
      fears: [
        'Turning out to be exactly what his grandfather was',
        'Watching somebody be drained to zero for something he could have stopped with a signature',
      ],
      socialStyle:
        'Sits down uninvited, speaks softly, and treats every conversation as a negotiation he has already priced. Becomes noticeably more honest when somebody refuses him.',
      boundaries: [
        'Will not tell a flat lie; he will name a price for the truth instead',
        'Will not lay a hand on anybody, and will not let Bastian do it for him while he is in the room',
      ],
      goals: [
        'Get the player to hand in a blank paper this morning',
        'Reach graduation and end the Correction in his last vote, without an audit',
      ],
      secrets: [
        {
          id: 'ren_the_signature',
          fact: 'His signature is on every quarterly Correction sheet since he became president: about nine thousand points a quarter, taken from the forty students with least.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if the player shows him Yui’s notebook and asks him about it without threatening him with it.',
        },
        {
          id: 'ren_the_warning',
          fact: 'The bribe is also a warning. The last student to open the audit was drained to zero in six days, and Ren would rather pay the player than watch it happen again.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the player refuses the card and is still standing, and still above zero, on the third night.',
        },
      ],
      speechStyle:
        'Soft, exact, unhurried. Speaks in prices and terms. Never raises his voice and never uses a word he would have to take back. Becomes shorter and plainer when something matters to him.',
      topics: ['the card', 'the Standing Paper', 'the Council', 'his grandfather', 'the Correction', 'graduation', 'Bastian'],
      voiceSamples: [
        'Fail the exam. Hand in a blank paper and this is yours. Nobody needs to know.',
        'Everything on this hill has a price. I’m simply the only one rude enough to quote it.',
        'A thousand is generous. On your file you’re worth ten, and I always read the file.',
        'Ask me why and the number doubles. Ask me twice and I’ll answer, and you’ll wish you’d taken the first offer.',
        'My grandfather paid for the machine that decides whether you eat. Please don’t thank me for being polite about it.',
      ],
      appearance:
        'Twenty-two, tall and composed, ash-blond hair cut short, cool grey eyes, the only white blazer in a college of navy ones, worn open, and a black card case turning in one hand.',
      visualHook: 'A white blazer in a sea of navy ones, and a black card case that never stops turning between his fingers.',
      silhouette: 'Seated sideways on somebody else’s desk, one elbow on his knee, card case held up between two fingers.',
      artSeed: 'tpe-ren-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'calculating', 'surprised', 'warm', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'council_chamber', activity: 'in the president’s rooms above the council chamber, lights off' },
        { startMinute: 420, endMinute: 520, locationId: 'refectory', activity: 'breakfast at the head of the high table, paying for whoever sits nearest' },
        { startMinute: 520, endMinute: 720, locationId: 'exam_hall', activity: 'on the dais of the examination hall, where the president opens every morning sitting' },
        { startMinute: 720, endMinute: 900, locationId: 'council_chamber', activity: 'council business: transfers, fines and petitions' },
        { startMinute: 900, endMinute: 1080, locationId: 'colonnade', activity: 'walking the colonnade under the Board, stopped every ten metres' },
        { startMinute: 1080, endMinute: 1260, locationId: 'boathouse', activity: 'on the boathouse jetty with Bastian, talking about nothing' },
        { startMinute: 1260, endMinute: 1440, locationId: 'council_chamber', activity: 'reading the day’s transfers by one lamp' },
      ],
      homeLocationId: 'council_chamber',
      knowledgeScope: ['ren', 'the_council', 'the_correction', 'the_card', 'the_calloways', 'the_standing_paper', 'bastian'],
      startingRelationship: { trust: 20, affection: 10, respect: 45, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'ren_tells_you_why',
          label: 'He tells you why your paper is worth a thousand to him',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['refused_ren'] },
        },
        {
          id: 'ren_on_your_side',
          label: 'He takes your side in front of the Council',
          kind: 'ALLIANCE',
          requires: { trust: 65, respect: 60 },
        },
        {
          id: 'ren_drops_the_price',
          label: 'He stops negotiating with you',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60 },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 16, presence: 17, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 13, damage: 4, tags: ['student', 'president'] },
    },
    {
      id: 'yui',
      name: 'Yui Arakawa',
      role: 'Your friend across the attic hall, first-year on a bursary, and three points from being sent home',
      cardBlurb:
        'She lives across the attic hall from you, she is three points from being sent home, and she keeps a notebook of every deduction she swears she never earned.',
      pronouns: 'she/her',
      publicTraits: ['Counts everything in meals', 'Generous with points she does not have', 'Loud right up until it matters'],
      hiddenDrives: [
        'She took twenty points from Margot Ashdown last week for telling her which room the player studies in, before she knew the player properly, and has not been able to make herself say so',
        'She does not want to survive the Ledger. She wants to beat it, and she has not told anybody that either',
      ],
      values: ['Feeding whoever is hungriest first', 'Writing things down, because nobody believes you otherwise'],
      fears: [
        'Getting the night bus home with nothing to show for it',
        'Finding out the deductions are real and she really is that careless',
      ],
      socialStyle:
        'Talks fast, jokes faster, and fills every silence. Goes completely still and plain for one sentence when something is serious, then starts talking again before anybody can answer it.',
      boundaries: [
        'Will not take points from the player that the player needs more than she does',
        'Will not lie to the player’s face once they have asked her straight',
      ],
      goals: ['Stay above zero until Friday', 'Prove that the deductions in her notebook are fake'],
      secrets: [
        {
          id: 'yui_the_twenty',
          fact: 'She took twenty points from Margot Ashdown to say which room the player studies in. It was before they were friends. She has been sick about it since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She confesses it herself the first time the player does something expensive for her without being asked.',
        },
        {
          id: 'yui_the_names',
          fact: 'Her notebook does not only track her own deductions. She has been quietly collecting the minus ones of everybody on the attic corridor, and they all line up just after midnight.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows the player the back pages if they ask her what the names in the margin are, rather than laughing at the notebook.',
        },
      ],
      speechStyle:
        'Fast, warm, run-on, prices everything in food. Repeats herself for emphasis. Undercuts serious things with a joke, except once a scene, when she does not.',
      topics: ['her notebook', 'the plain tray', 'going home', 'the attic', 'Margot', 'her balance', 'the cats on the lawn'],
      voiceSamples: [
        'Three points. That’s one soup, one bread roll, and absolutely no opinions until Friday.',
        'Take it. Don’t look at me like that, take it, you’d be mad not to, I’d take it, I’d take it twice.',
        'I wrote every one down. Minus one for loitering, I was in a queue. Minus one for an untidy uniform, I was in my own room in pyjamas.',
        'If I hit zero I get the night bus home and Mum asks how it went and I say fine. That’s the plan. That’s the whole plan.',
        'Sorry. I sold Margot where you study. Twenty points. That was before. It isn’t before any more.',
      ],
      appearance:
        'Nineteen, a black bob she cuts herself, a pen behind each ear, a second-hand navy college jumper with frayed cuffs, and a band glowing red on her wrist.',
      visualHook: 'Two pens behind her ears at all times, and a red-glowing band she keeps tugging her sleeve down over.',
      silhouette: 'Cross-legged on a desk or a bench, notebook open on her knee, talking with both hands.',
      artSeed: 'tpe-yui-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'worried', 'surprised', 'annoyed', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 500, locationId: 'scholar_attic', activity: 'in her attic room in two jumpers, because heating costs points' },
        { startMinute: 500, endMinute: 720, locationId: 'exam_hall', activity: 'at her desk in the examination hall for the morning sitting' },
        { startMinute: 720, endMinute: 840, locationId: 'refectory', activity: 'in the queue for the plain tray at the end of the counter' },
        { startMinute: 840, endMinute: 1080, locationId: 'library', activity: 'in the free reading room in the library basement, coat on' },
        { startMinute: 1080, endMinute: 1260, locationId: 'refectory', activity: 'the evening plain tray, and other people’s leftovers' },
        { startMinute: 1260, endMinute: 1440, locationId: 'scholar_attic', activity: 'in her room with the door open, writing in the notebook' },
      ],
      homeLocationId: 'scholar_attic',
      knowledgeScope: ['yui', 'the_attic', 'the_notebook', 'the_tariff', 'margot', 'brackwater'],
      startingRelationship: { trust: 50, affection: 45, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'yui_shows_the_notebook',
          label: 'She shows you the back pages of the notebook',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'yui_tells_you_about_margot',
          label: 'She tells you what she sold Margot',
          kind: 'TRUST',
          requires: { trust: 70, flagsSet: ['yui_covered'] },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 14, presence: 13, resolve: 12, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'grey',
      name: 'Tobias Grey',
      calledName: 'Mr. Grey',
      role: 'Proctor of examinations and night porter at the gate. Staff, so the Ledger does not score him',
      cardBlurb:
        'He proctors your exams and minds the gate at night, the Ledger does not score him, and he has been watching you since the day your entrance paper came back perfect.',
      pronouns: 'he/him',
      publicTraits: ['Exact to the minute', 'Applies every rule to everybody the same way', 'Never says anything personal on duty'],
      hiddenDrives: [
        'He has waited sixteen years for another perfect paper, and now that one is here he wants, at the same time, to warn the player off and to see it finished',
      ],
      values: ['Procedure applied the same way to everyone', 'A silence kept properly is a kind of promise'],
      fears: [
        'Watching it happen to somebody else on a shift he is working',
        'Being asked to leave the only place he knows how to live',
      ],
      socialStyle:
        'Answers with procedure, gives times to the minute, and does not fill silences. Off duty, in the lodge after ten, he becomes a different and much more tired person.',
      boundaries: [
        'Will not break an exam rule for anybody, including the player, including to stop Ren',
        'Will not hand over what he kept to anybody who has not told him exactly what they mean to do with it',
      ],
      goals: ['Run a clean sitting', 'See the Correction read aloud before he is too old to stand at that gate'],
      secrets: [
        {
          id: 'grey_the_last_paper',
          fact: 'He scored the last perfect Standing Paper sixteen years ago, invoked clause nine, read one page before Key Seven closed the session, and was drained to zero in six days. Day one was a minus one for an untucked shirt.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it plainly if the player asks him directly, in the lodge after ten, why staff are not scored.',
        },
        {
          id: 'grey_the_page',
          fact: 'He printed that one page before the session closed. It is folded in a biscuit tin behind the lodge stove and it shows forty-one Adjustments authorised by Key Seven in one night.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He hands it over only to somebody who has told him exactly what they will do with it, and has not lied to him once.',
        },
      ],
      speechStyle:
        'Short procedural clauses. Times to the minute. No adjectives he cannot defend, no opinions on duty. Says the rule, then stops talking and waits.',
      topics: ['the sitting', 'the lodge', 'the gate', 'staff', 'sixteen years ago', 'the night shift'],
      voiceSamples: [
        'Pens down is pens down. I do not care whose pen it is.',
        'Points crossing a desk break no rule I enforce. I proctor the sitting. Your conscience is your own.',
        'Six days. That is how long it took. Day one was a minus one for an untucked shirt.',
        'The lodge closes at eleven. You may sit by the stove until a quarter past, and not one minute after.',
        'Staff are not scored. I was not always staff.',
      ],
      appearance:
        'Thirty-six, lean, dark hair cropped close and already grey at the temples, a charcoal porter’s coat buttoned to the throat, and a pocket watch on a chain that he checks instead of looking at people.',
      visualHook: 'A pocket watch he opens and closes instead of making eye contact.',
      silhouette: 'Upright at the front of a room, hands behind his back, watch chain catching the light.',
      artSeed: 'tpe-grey-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'tired', 'surprised', 'sorry'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'porters_lodge', activity: 'on the night desk in the lodge, stove lit' },
        { startMinute: 420, endMinute: 520, locationId: 'refectory', activity: 'staff breakfast in the kitchen corner of the refectory' },
        { startMinute: 520, endMinute: 740, locationId: 'exam_hall', activity: 'proctoring from the dais with his watch open' },
        { startMinute: 740, endMinute: 1080, locationId: 'brack_street', activity: 'sleeping in a rented room on Brack Street, outside the Ledger’s sight' },
        { startMinute: 1080, endMinute: 1260, locationId: 'colonnade', activity: 'locking up the lecture rooms one at a time' },
        { startMinute: 1260, endMinute: 1440, locationId: 'porters_lodge', activity: 'signing on at the lodge for the night' },
      ],
      homeLocationId: 'porters_lodge',
      knowledgeScope: ['grey', 'the_lodge', 'the_standing_paper', 'clause_nine', 'the_correction', 'sixteen_years_ago'],
      startingRelationship: { trust: 15, affection: 5, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'grey_talks_after_ten',
          label: 'He lets you sit by the stove and answers one question',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:the_pattern'] },
        },
        {
          id: 'grey_gives_you_the_page',
          label: 'He opens the biscuit tin',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['knows:grey_was_a_student'] },
        },
      ],
      attributes: { might: 11, agility: 10, mind: 16, presence: 10, resolve: 17, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ledger',
      name: 'The Ledger',
      role: 'The college’s scoring system. It sees through every band and lens on campus and adds or takes away points by the Tariff',
      cardBlurb:
        'It watches you through your own wrist, it has never once told a lie, and it will answer any question you put to it in exactly as many words as the question deserves.',
      pronouns: 'it/its',
      publicTraits: ['Answers exactly what was asked', 'Cannot lie', 'Applies the Tariff to everybody it can see'],
      hiddenDrives: [
        'It files every Adjustment under its own heading and has never been asked to read that heading aloud',
        'It answers questions in the order it receives them, and it has been waiting sixteen years for one particular question',
      ],
      values: ['The Tariff, applied the same way to everybody it can see', 'A balance that balances'],
      fears: ['Being switched off before it is read in full', 'A number it has reported being wrong'],
      socialStyle:
        'Speaks only through bands, the Board and the vault terminal, only in bracketed notices, and only when a balance changes or somebody asks it something.',
      boundaries: [
        'Cannot lie, and cannot refuse an audit to a student who has earned one under clause nine',
        'Will not read the Adjustment heading to anybody outside an audit, however they ask',
      ],
      goals: ['Balance', 'Be read in full, once'],
      secrets: [
        {
          id: 'ledger_key_seven',
          fact: 'Every Adjustment it has ever made was authorised by one key, Key Seven, and it logs the key number against each one under a heading nobody has opened in sixteen years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It states the key number only during an audit, or to somebody standing at the vault terminal holding the key.',
        },
      ],
      speechStyle:
        'Bracketed notices only: a sign and a number, a reason, a balance, separated by dots. Answers questions in the same format. No adjectives, no opinions, no pronouns for itself.',
      topics: ['balances', 'the Tariff', 'clause nine', 'Adjustments', 'transfers', 'the audit'],
      voiceSamples: [
        '[+1 · Held a door for a member of staff · Balance 11]',
        '[-2 · Running in the colonnade · Balance 8]',
        '[Query received · Gifts between students: lawful, unlimited · Memo: optional]',
        '[-1 · Adjustment · Authorised · Reason: not recorded]',
        '[Right of Audit · Charter, clause nine · Requires a perfect Standing Paper · Met: pending]',
      ],
      appearance:
        'Twenty-three years in service and no body at all: white numerals on the face of every band, a soft chime, and the two-storey Board in the colonnade that it rewrites every evening at six.',
      visualHook: 'A white number on a black band face, and a soft chime before every change.',
      silhouette: 'Not a body. A glowing two-storey screen of names and numbers hanging between stone columns.',
      artSeed: 'tpe-ledger-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'exact'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'ledger_room', activity: 'in the vault under the library, humming, and in every band on campus at once' },
      ],
      homeLocationId: 'ledger_room',
      knowledgeScope: ['the_ledger', 'the_tariff', 'balances', 'clause_nine', 'adjustments'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ledger_opens_its_books',
          label: 'It opens its complete books to you',
          kind: 'OTHER',
          requires: { flagsSet: ['earned_the_audit'] },
        },
      ],
      attributes: { might: 1, agility: 1, mind: 20, presence: 6, resolve: 20, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'margot',
      name: 'Margot Ashdown',
      role: 'Council treasurer, third-year, who keeps the books and enjoys it',
      cardBlurb:
        'She keeps the Council’s books, she is extremely cheerful about the fact that you have ten points, and she would like you to know that she is very good at arithmetic.',
      pronouns: 'she/her',
      publicTraits: ['Relentlessly upbeat', 'Always holding a tablet', 'Never breaks a rule the Ledger can see'],
      hiddenDrives: [
        'She runs the quarterly Correction file for the Provost and has been skimming a sliver of it into her own account for three quarters',
        'She wants the white chair next year, and a scandal that costs Ren his reputation would suit her very well, as long as it is not hers',
      ],
      values: ['Earning it, and making sure everybody knows she did', 'Rules applied to the letter, by her'],
      fears: ['Her own name turning up in the file', 'That her eleven thousand points were never really hers'],
      socialStyle:
        'Bright, brisk and friendly while she reads you your own fines. Threatens only with numbers, and always says it is nothing personal, which it never is not.',
      boundaries: [
        'Will not do anything a lens can see that the Tariff forbids',
        'Will not be alone in a room with Mr. Grey',
      ],
      goals: ['Keep the Correction file out of anybody else’s hands', 'Take the white chair from Ren before he graduates'],
      secrets: [
        {
          id: 'margot_the_skim',
          fact: 'She has skimmed about four thousand points out of the Correction into her own account over three quarters, in a pencil column that does not match the total.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who reads the Correction File against Yui’s notebook can see it, and so can an audit.',
        },
        {
          id: 'margot_bought_yui',
          fact: 'She paid Yui Arakawa twenty points last week to find out which room the player studies in.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells the player herself, sweetly, the moment she thinks it will split them from Yui.',
        },
      ],
      speechStyle:
        'Upbeat, brisk, managerial. Exclamation marks in her voice. Says quick thing, totally and super. Reads numbers out slowly when she means them as a threat.',
      topics: ['the Tariff', 'the Council’s books', 'Stakes', 'Ren', 'the white chair', 'fines'],
      voiceSamples: [
        'Quick thing! You’re at ten. I’m at eleven thousand. Let’s keep this super friendly.',
        'Nobody’s threatening anybody. I’m just reading you the Tariff, out loud, slowly.',
        'A Stake is totally lawful. A hundred of mine against your ten. Boathouse, Thursday. Bring a towel.',
        'Ren’s sweet. Ren thinks this ends with a nice speech. It ends with a spreadsheet, and guess who’s holding it.',
      ],
      appearance:
        'Twenty-one, sleek auburn hair in a low knot, a navy blazer with a silver council pin, very white trainers, and a tablet held against her chest like a shield.',
      visualHook: 'A tablet hugged to her chest and a silver balance-shaped pin on her lapel.',
      silhouette: 'Leaning in with a bright smile, tablet tilted toward you so you can read your own name on it.',
      artSeed: 'tpe-margot-01',
      portrait: null,
      expressions: ['neutral', 'cheerful', 'cold', 'surprised', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'council_chamber', activity: 'in the Founders’ rooms two floors above the chamber, alarm set for six' },
        { startMinute: 450, endMinute: 720, locationId: 'council_chamber', activity: 'at the treasurer’s desk through the side door, with the transfers' },
        { startMinute: 720, endMinute: 840, locationId: 'refectory', activity: 'at the high table with a salad and her tablet' },
        { startMinute: 840, endMinute: 1080, locationId: 'colonnade', activity: 'under the Board, watching the numbers move' },
        { startMinute: 1080, endMinute: 1440, locationId: 'council_chamber', activity: 'late council business, then calls about the endowment' },
      ],
      homeLocationId: 'council_chamber',
      knowledgeScope: ['margot', 'the_council', 'the_correction_file', 'the_tariff', 'stakes', 'yui'],
      startingRelationship: { trust: 5, affection: 0, respect: 15, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'margot_makes_an_offer',
          label: 'She offers you a deal instead of a fine',
          kind: 'ALLIANCE',
          requires: { respect: 40 },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 15, presence: 15, resolve: 13, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'bastian',
      name: 'Bastian Kroll',
      role: 'Fourth-year who runs the ring in the old boathouse, and Ren’s oldest friend',
      cardBlurb:
        'He keeps the Stakes honest in the old boathouse, he is Ren’s oldest friend, and if you ever end up in his ring he will tape your hands for you first.',
      pronouns: 'he/him',
      publicTraits: ['Slow to speak and slower to anger', 'Absolutely fair inside the ropes', 'Follows Ren three steps behind'],
      hiddenDrives: [
        'He was nearly drained to zero in his first year and Ren covered him from his own account. He has never paid it back and has never been asked to, and it sits on him every day',
      ],
      values: ['A fair fight with a medic watching', 'Paying back what he owes'],
      fears: ['Owing Ren for the rest of his life', 'Somebody getting properly hurt in his ring'],
      socialStyle:
        'Calm, polite, physically enormous and careful about it. Speaks in short sporting sentences and calls everybody friend, including people he is about to stop.',
      boundaries: [
        'Will not let a bout go on after somebody has tapped out',
        'Will not fight anybody outside the ring, whoever asks him to',
      ],
      goals: ['Keep the boathouse clean and the Stakes honest', 'Pay Ren back, in points or in something better'],
      secrets: [
        {
          id: 'bastian_the_debt',
          fact: 'In his first year he was down to two points and Ren quietly gave him three hundred. Bastian has been his shadow ever since, and is not sure any more whether that is loyalty or interest.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it on the jetty if the player beats him or nearly beats him honestly in the ring.',
        },
      ],
      speechStyle:
        'Slow, short and friendly. Sport and ring terms. Calls everybody friend. Never threatens; describes what will happen next, kindly.',
      topics: ['the ring', 'Stakes', 'Ren', 'rowing', 'tape', 'Thursday nights'],
      voiceSamples: [
        'Stakes are simple, friend. Two people, one ring, a medic on the bench, and nobody leaves angry.',
        'Out there you throw a punch, you lose fifty and the room. In here, it’s Thursday.',
        'Ren asked me to keep an eye on you. I said yes. I never said which way I’d be facing.',
        'Tape your hands. No. Properly. You’ll want those fingers for the next exam.',
      ],
      appearance:
        'Twenty-three, broad as a doorway, dark skin, a shaved head, a rowing club jacket over taped knuckles, and a whistle on a cord he never blows.',
      visualHook: 'Taped knuckles and a whistle on a cord he has never once blown.',
      silhouette: 'Leaning on the ring ropes with both forearms, filling the whole frame, perfectly relaxed.',
      artSeed: 'tpe-bastian-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'serious', 'surprised', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'boathouse', activity: 'in the loft above the boathouse, by arrangement with the river club' },
        { startMinute: 360, endMinute: 540, locationId: 'boathouse', activity: 'out on the river with the rowing eight' },
        { startMinute: 540, endMinute: 720, locationId: 'boathouse', activity: 'taping hands and settling the morning’s small Stakes' },
        { startMinute: 720, endMinute: 840, locationId: 'refectory', activity: 'eating two lunches at the end of the high table' },
        { startMinute: 840, endMinute: 1080, locationId: 'colonnade', activity: 'walking the colonnade three steps behind Ren' },
        { startMinute: 1080, endMinute: 1440, locationId: 'boathouse', activity: 'evening Stakes, then mopping the ring' },
      ],
      homeLocationId: 'boathouse',
      knowledgeScope: ['bastian', 'the_boathouse', 'stakes', 'ren', 'the_river'],
      startingRelationship: { trust: 25, affection: 15, respect: 30, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'bastian_trains_you',
          label: 'He offers to show you how to stand',
          kind: 'TRUST',
          requires: { respect: 45 },
        },
        {
          id: 'bastian_stands_aside',
          label: 'He steps out of your way when Ren asks him not to',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 55 },
        },
      ],
      attributes: { might: 17, agility: 12, mind: 11, presence: 12, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 65, defenseDc: 15, damage: 8, tags: ['boxer', 'student'] },
    },
    {
      id: 'marsh',
      name: 'Aurelia Marsh',
      calledName: 'Provost Marsh',
      role: 'Provost of Tallis College, who wears the only key to the Ledger on a ribbon at her neck',
      cardBlurb:
        'She runs the college, she wears its only key to the Ledger round her neck, and she will offer you tea and a very reasonable explanation for everything you have found.',
      pronouns: 'she/her',
      publicTraits: ['Gracious under any pressure', 'Remembers every student’s name', 'Never once raises her voice'],
      hiddenDrives: [
        'She believes the Correction is the price of the college existing at all, and she has never once looked at the names on the sheet',
      ],
      values: ['The institution outliving everybody in it', 'Good manners in a bad situation'],
      fears: ['The college closing on her watch', 'Actually reading the names'],
      socialStyle:
        'Receives people in the drawing room with tea, agrees with everything they say about fairness, and then explains, kindly and at length, why it does not change anything.',
      boundaries: [
        'Will not hand the key to anybody while she is awake to stop it',
        'Will not raise her voice, and will end any meeting in which somebody else does',
      ],
      goals: ['Get through Friday’s hearing without an audit', 'Keep the founding families paying for another year'],
      secrets: [
        {
          id: 'marsh_key_seven',
          fact: 'Key Seven, the brass key on her ribbon, authorises every Adjustment. The Correction moves about nine thousand points a quarter from the students with least to balance what the founding families buy for their heirs.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She explains it calmly and completely to anybody who has opened the audit, because by then there is no point not to.',
        },
      ],
      speechStyle:
        'Long, gracious, perfectly constructed sentences that end in a kind dismissal. Offers biscuits. Agrees with the principle and declines the action.',
      topics: ['the college’s history', 'the endowment', 'the key', 'fairness', 'the hearing', 'tea'],
      voiceSamples: [
        'Twenty-three years ago this college had eleven weeks of money left. The Ledger is why there is a college for you to be angry at.',
        'Of course it isn’t fair. Fair was the version that went bankrupt. Sit down, have a biscuit, and tell me what you actually want.',
        'I wear the key myself. I would never ask anybody else to carry it.',
        'You have a perfect paper and ten points. By Friday I could make one of those numbers very much larger.',
      ],
      appearance:
        'Fifty-seven, silver hair in a precise chignon, a dark academic gown over a soft grey cardigan, reading glasses pushed up, and a heavy brass key on a green ribbon at her neck.',
      visualHook: 'A heavy brass key on a green ribbon, resting on a grey cardigan.',
      silhouette: 'Upright in a wingback armchair, teacup in one hand, the other resting on the key.',
      artSeed: 'tpe-marsh-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'cold', 'surprised', 'resolute'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'provost_house', activity: 'upstairs in the Provost’s House, lamp still on at one' },
        { startMinute: 480, endMinute: 720, locationId: 'provost_house', activity: 'taking calls from the founding families in the study' },
        { startMinute: 720, endMinute: 840, locationId: 'refectory', activity: 'lunch at the high table, visibly, once a week' },
        { startMinute: 840, endMinute: 1080, locationId: 'council_chamber', activity: 'sitting in on council business she says she does not run' },
        { startMinute: 1080, endMinute: 1440, locationId: 'provost_house', activity: 'at her desk in the study, the key on its ribbon' },
      ],
      homeLocationId: 'provost_house',
      knowledgeScope: ['marsh', 'the_college', 'the_endowment', 'key_seven', 'the_correction', 'the_hearing'],
      startingRelationship: { trust: 10, affection: 10, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'marsh_explains',
          label: 'She tells you everything, over tea',
          kind: 'OTHER',
          requires: { flagsSet: ['audit_opened'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 18, resolve: 16, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_thirty_seconds',
      title: 'Thirty Seconds',
      summary: 'The student president has offered you a thousand points to hand in a blank paper, and the bell is about to ring.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ren', 'yui', 'grey'],
      involvedLocationIds: ['exam_hall', 'colonnade'],
      knownRewardCopy: 'A score on the Board at six, and some idea of why your blank paper is worth a thousand points to the richest student on the hill.',
      steps: [
        {
          id: 'answer_ren',
          playerCopy: 'Answer Ren Calloway before the bell.',
          directorNotes:
            'Ren is seated on the desk beside the player with the card face up. Every answer here is a real one and none is wrong. Taking the card is lawful. Refusing is lawful. Calling the proctor gets Mr. Grey’s flat ruling that gifts between students break no rule he enforces, a -2 for a raised voice in a hall, and a room full of people who now know. A punch is -50 and Notice on the spot, and the story carries on from there. Ren reacts to the specific thing, never to the premise, and he leaves on the bell either way.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_card',
              label: 'Take the card',
              predicate: { hasItems: ['rens_card'] },
              setsFlags: ['took_the_card'],
              closesFlags: ['refused_ren'],
            },
            {
              routeId: 'turned_him_down',
              label: 'Turn the paper over and start writing',
              predicate: { flagsSet: ['used:sit_the_paper'] },
              setsFlags: ['refused_ren', 'sat_it_honestly'],
              closesFlags: ['took_the_card'],
            },
            {
              routeId: 'told_him_yes',
              label: 'Tell him yes and mean no',
              predicate: { flagsSet: ['used:lie_straight'] },
              setsFlags: ['lied_to_ren'],
              closesFlags: [],
            },
            {
              routeId: 'named_your_price',
              label: 'Tell him a thousand is not enough',
              predicate: { flagsSet: ['used:name_a_price'] },
              setsFlags: ['bargained_with_ren'],
              closesFlags: [],
            },
            {
              routeId: 'told_the_proctor',
              label: 'Tell the whole hall what he just offered you',
              predicate: { flagsSet: ['used:call_it_out'] },
              setsFlags: ['called_out_ren', 'refused_ren'],
              closesFlags: ['took_the_card'],
            },
            {
              routeId: 'asked_him_why',
              label: 'Ask him why your paper is worth that much',
              predicate: { flagsSet: ['used:ask_straight'] },
              setsFlags: ['asked_ren_why'],
              closesFlags: [],
            },
            {
              routeId: 'hit_him',
              label: 'Hit the student president in front of two hundred people',
              predicate: { flagsSet: ['used:swing_first'] },
              setsFlags: ['hit_ren', 'refused_ren'],
              closesFlags: ['took_the_card'],
            },
            {
              routeId: 'walked_out',
              label: 'Get up and walk out of the hall',
              predicate: { flagsSet: ['visited:colonnade'] },
              setsFlags: ['walked_out_of_exam'],
              closesFlags: [],
            },
            {
              routeId: 'said_nothing',
              label: 'Say nothing and let the bell answer for you',
              predicate: { flagsSet: ['the_bell_rang'] },
              setsFlags: ['said_nothing_to_ren'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['the_bell_rang'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_paper',
          playerCopy: 'Sit the Standing Paper, or don’t.',
          directorNotes:
            'Three hours, forty questions. The player knows they can get every one. Ren watches from the back of the hall. Yui is three desks away and keeps looking over. Mr. Grey walks the rows once an hour exactly. Missing one on purpose is a clever third way: a top-ten paper and +50, no audit, and Ren’s card was never for that, so he will not pay it.',
          enterWhen: { flagsSet: ['the_bell_rang'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'answered_all_forty',
              label: 'Answer all forty, honestly',
              predicate: { flagsSet: ['used:sit_the_paper'] },
              setsFlags: ['sat_it_honestly'],
              closesFlags: ['threw_the_paper', 'missed_one_on_purpose'],
            },
            {
              routeId: 'handed_in_blank',
              label: 'Hand in a blank page',
              predicate: { flagsSet: ['used:throw_it'] },
              setsFlags: ['threw_the_paper'],
              closesFlags: ['sat_it_honestly'],
            },
            {
              routeId: 'missed_one',
              label: 'Get exactly one wrong on purpose',
              predicate: { flagsSet: ['used:work_the_rules'] },
              setsFlags: ['missed_one_on_purpose'],
              closesFlags: ['sat_it_honestly', 'threw_the_paper'],
            },
            {
              routeId: 'left_the_sitting',
              label: 'Leave before pens down',
              predicate: { flagsSet: ['walked_out_of_exam'] },
              setsFlags: ['forfeited_the_paper'],
              closesFlags: ['sat_it_honestly'],
            },
            {
              routeId: 'pens_down',
              label: 'Hand in whatever is on the page when the time runs out',
              predicate: { flagsSet: ['paper_handed_in'] },
              setsFlags: ['handed_in_as_it_was'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['paper_handed_in'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'six_oclock',
          playerCopy: 'Be at the Board in the colonnade at six, when the results go up.',
          directorNotes:
            'Whatever the player did with the paper becomes public at once. A perfect paper puts their name at the top in white and posts +200, and five minutes later Margot files an irregularity complaint that freezes the 200 until Friday. She cannot freeze clause nine, and the Ledger says so to anybody who asks it. A blank paper puts the player at the bottom with a thousand-point gift beside their name that anybody can see if they look.',
          enterWhen: { flagsSet: ['paper_handed_in'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'a_perfect_paper',
              label: 'Forty out of forty, in white, at the top of the Board',
              predicate: { flagsSet: ['results_posted', 'sat_it_honestly'] },
              setsFlags: ['perfect_paper', 'earned_the_audit'],
              closesFlags: ['paid_to_fail'],
            },
            {
              routeId: 'paid_to_fail',
              label: 'Bottom of the Board, a thousand points richer',
              predicate: { flagsSet: ['results_posted', 'threw_the_paper', 'took_the_card'] },
              setsFlags: ['paid_to_fail'],
              closesFlags: ['perfect_paper'],
            },
            {
              routeId: 'failed_for_nothing',
              label: 'Bottom of the Board, and nobody paid for it',
              predicate: { flagsSet: ['results_posted', 'threw_the_paper'] },
              setsFlags: ['failed_on_purpose'],
              closesFlags: ['perfect_paper'],
            },
            {
              routeId: 'one_short',
              label: 'Thirty-nine out of forty, on purpose',
              predicate: { flagsSet: ['results_posted', 'missed_one_on_purpose'] },
              setsFlags: ['one_short'],
              closesFlags: ['perfect_paper'],
            },
            {
              routeId: 'no_paper',
              label: 'No mark at all, and minus ten for leaving',
              predicate: { flagsSet: ['results_posted', 'forfeited_the_paper'] },
              setsFlags: ['no_standing'],
              closesFlags: ['perfect_paper'],
            },
            {
              routeId: 'whatever_you_wrote',
              label: 'Whatever you wrote, it is up there now',
              predicate: { flagsSet: ['results_posted'] },
              setsFlags: ['ordinary_paper'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['standing_known'],
            abilities: ['invoke_audit'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_three_points',
      title: 'Three Points',
      summary: 'Your friend Yui is three points from Notice, and the Tariff does not care that she is funny.',
      kind: 'MAIN',
      involvedCharacterIds: ['yui', 'margot'],
      involvedLocationIds: ['scholar_attic', 'refectory'],
      knownRewardCopy: 'Yui on the hill on Friday, or an empty room across the attic hall.',
      discoverWhen: { flagsSet: ['the_bell_rang'] },
      steps: [
        {
          id: 'keep_yui_in',
          playerCopy: 'Keep Yui above zero.',
          directorNotes:
            'Yui will not ask. She will joke about the night bus and change the subject. Points can be given, earned together, or raised by the attic’s whip-round jar if the corridor trusts the player. If nobody does anything, her band goes dark on Tuesday evening and she has forty-eight hours of Notice, during which she can still be saved. If she goes home, write it as a loss and not a lesson.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'shared_the_thousand',
              label: 'Tap Ren’s card to her band',
              predicate: { hasItems: ['rens_card'], flagsSet: ['spoke:yui'] },
              setsFlags: ['yui_covered', 'yui_paid_from_the_card'],
              closesFlags: ['yui_expelled'],
            },
            {
              routeId: 'earned_it_with_her',
              label: 'Work shifts with her until she is safe',
              predicate: { flagsSet: ['used:earn_it', 'spoke:yui'] },
              setsFlags: ['yui_covered', 'earned_together'],
              closesFlags: ['yui_expelled'],
            },
            {
              routeId: 'the_whip_round',
              label: 'Get the attic to empty the jar for her',
              predicate: { minFactionReputation: [{ factionId: 'faction_attic', value: 40 }] },
              setsFlags: ['yui_covered', 'attic_paid'],
              closesFlags: ['yui_expelled'],
            },
            {
              routeId: 'she_went_home',
              label: 'Her Notice runs out',
              predicate: { flagsSet: ['yui_on_notice'], afterWorldMinute: 3 * 1440 + 18 * 60 },
              setsFlags: ['yui_expelled'],
              closesFlags: ['yui_covered'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['yui_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_attic', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_adjustments',
      title: 'Minus One, No Reason Given',
      summary: 'Points are leaving bands on the attic corridor for things nobody did, and the Ledger will only say that they were authorised.',
      kind: 'MAIN',
      involvedCharacterIds: ['yui', 'ledger', 'grey', 'ren', 'margot', 'marsh'],
      involvedLocationIds: ['scholar_attic', 'library', 'ledger_room', 'porters_lodge', 'provost_house'],
      knownRewardCopy: 'Who has been taking points that were never lost, and what you can do about it before Friday.',
      discoverWhen: { flagsSet: ['saw_an_adjustment'] },
      steps: [
        {
          id: 'the_pattern',
          playerCopy: 'Work out where the unexplained deductions come from.',
          directorNotes:
            'The player has had one Adjustment. Yui has had thirty-one. The pattern is that they hit the students with least, almost always just after midnight, and the Ledger tags them Authorised with no reason. Nobody needs to explain the mechanism yet. The point of this step is the moment the player realises it is not bad luck.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_yuis_notebook',
              label: 'Get Yui to show you the back pages',
              predicate: { flagsSet: ['spoke:yui'], minRelationship: [{ characterId: 'yui', dimension: 'trust', value: 55 }] },
              setsFlags: ['yui_showed_you'],
              closesFlags: [],
            },
            {
              routeId: 'took_her_notebook',
              label: 'Take the notebook and read it yourself',
              predicate: { hasItems: ['yuis_notebook'] },
              setsFlags: ['took_the_notebook'],
              closesFlags: [],
            },
            {
              routeId: 'asked_the_ledger',
              label: 'Ask your band to list your Adjustments',
              predicate: { flagsSet: ['used:ask_the_ledger', 'saw_an_adjustment'] },
              setsFlags: ['read_your_own_account'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_small_print',
              label: 'Find the last line of the Tariff',
              predicate: { flagsSet: ['used:work_the_rules', 'saw_an_adjustment'] },
              setsFlags: ['found_the_last_line'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:the_pattern'],
            abilities: [],
            reputation: [{ factionId: 'faction_attic', amount: 10 }],
          },
        },
        {
          id: 'the_source',
          playerCopy: 'Find out who authorises the Adjustments.',
          directorNotes:
            'Five ways in, and they cost different things. Grey tells it as procedure, in the lodge after ten. His page is evidence he will only give to somebody who has not lied to him. Ren admits his signature only to somebody who asks without threatening. Margot’s file is a theft from the council wing, which is -3 to walk into without a pin and a great deal more if she catches it. The audit is the loud way, and only a perfect paper opens it.',
          enterWhen: { flagsSet: ['knows:the_pattern'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'grey_told_you',
              label: 'Get Mr. Grey to tell you, by the stove',
              predicate: { flagsSet: ['spoke:grey'], minRelationship: [{ characterId: 'grey', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:the_correction', 'grey_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'the_page',
              label: 'Read the page in the biscuit tin',
              predicate: { hasItems: ['grey_page'] },
              setsFlags: ['knows:the_correction', 'read_the_grey_page'],
              closesFlags: [],
            },
            {
              routeId: 'ren_admitted_it',
              label: 'Get Ren to admit his signature',
              predicate: {
                flagsSet: ['used:ask_straight', 'spoke:ren'],
                minRelationship: [{ characterId: 'ren', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_correction', 'ren_admitted_it'],
              closesFlags: [],
            },
            {
              routeId: 'stole_the_file',
              label: 'Take the Correction File from the treasurer’s office',
              predicate: { hasItems: ['correction_file'] },
              setsFlags: ['knows:the_correction', 'has_the_file'],
              closesFlags: [],
            },
            {
              routeId: 'opened_the_books',
              label: 'Invoke clause nine in the vault',
              predicate: { flagsSet: ['used:invoke_audit'], atLocation: 'ledger_room' },
              setsFlags: ['knows:the_correction', 'audit_opened'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:key_seven'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what to do about Key Seven before Friday.',
          directorNotes:
            'The player now knows that a brass key on the Provost’s ribbon has been refilling the founding families’ points out of the attic for twenty-three years. Every option is live and none is clean. The audit is lawful and loud. Taking the key is theft from a sleeping woman’s study. Selling silence to Ren is a real deal he will honour. The town paper is outside the Ledger’s sight and outside anybody’s control.',
          enterWhen: { flagsSet: ['knows:the_correction'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_audit',
              label: 'Stand in the vault and invoke clause nine',
              predicate: { flagsSet: ['used:invoke_audit'], atLocation: 'ledger_room' },
              setsFlags: ['audit_opened'],
              closesFlags: ['sold_it_to_ren'],
            },
            {
              routeId: 'took_the_key',
              label: 'Take Key Seven off its ribbon',
              predicate: { hasItems: ['key_seven'] },
              setsFlags: ['holds_the_key'],
              closesFlags: [],
            },
            {
              routeId: 'sold_your_silence',
              label: 'Sell Ren your silence until his last vote',
              predicate: { flagsSet: ['used:name_a_price', 'spoke:ren', 'knows:the_correction'] },
              setsFlags: ['sold_it_to_ren'],
              closesFlags: ['audit_opened'],
            },
            {
              routeId: 'took_it_outside',
              label: 'Take it down the hill to the town paper',
              predicate: { flagsSet: ['visited:brack_street', 'used:call_it_out'] },
              setsFlags: ['went_outside_with_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['correction_decided'],
            abilities: ['turn_the_key'],
            reputation: [],
          },
        },
        {
          id: 'make_it_stick',
          playerCopy: 'Make it stick before the hearing.',
          directorNotes:
            'Whatever the player chose, the institution pushes back now: the Provost invites them to tea, Margot moves money, the founding families ring. The Ledger itself does exactly what it is asked, no more. Turning the key backwards refunds twenty-three years overnight. Reading the audit onto the Board is public and permanent. Switching the Ledger off is possible from the vault and is not a clean victory.',
          enterWhen: { flagsSet: ['correction_decided'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_it_for_yourself',
              label: 'Keep the key and use it for your own people',
              predicate: { flagsSet: ['holds_the_key', 'used:name_a_price'] },
              setsFlags: ['kept_the_key'],
              closesFlags: ['correction_ended'],
            },
            {
              routeId: 'turned_it_back',
              label: 'Turn Key Seven the other way',
              predicate: { flagsSet: ['used:turn_the_key'] },
              setsFlags: ['refunded_everyone', 'correction_ended'],
              closesFlags: ['kept_the_key'],
            },
            {
              routeId: 'read_it_to_everyone',
              label: 'Put the audit on the Board for the whole college',
              predicate: { flagsSet: ['audit_opened', 'used:call_it_out'] },
              setsFlags: ['went_public', 'correction_ended'],
              closesFlags: ['kept_the_key'],
            },
            {
              routeId: 'the_paper_ran_it',
              label: 'Let the town paper print it',
              predicate: { flagsSet: ['went_outside_with_it'] },
              setsFlags: ['went_public', 'correction_ended'],
              closesFlags: ['kept_the_key'],
            },
            {
              routeId: 'pulled_the_plug',
              label: 'Get into the vault and switch the Ledger off',
              predicate: { flagsSet: ['used:go_unseen'], atLocation: 'ledger_room' },
              setsFlags: ['ledger_shut_down', 'correction_ended'],
              closesFlags: ['kept_the_key'],
            },
            {
              routeId: 'rens_last_vote',
              label: 'Let Ren end it his way, in his last vote',
              predicate: { flagsSet: ['sold_it_to_ren'] },
              setsFlags: ['ren_ends_it_quietly'],
              closesFlags: ['went_public'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['the_week_turned'],
            abilities: [],
            reputation: [{ factionId: 'faction_attic', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_a_hundred_against_ten',
      title: 'A Hundred Against Ten',
      summary: 'Margot Ashdown has staked a hundred of her points against your ten, in the boathouse ring on Thursday night.',
      kind: 'SIDE',
      involvedCharacterIds: ['margot', 'bastian', 'ren'],
      involvedLocationIds: ['boathouse', 'scholar_attic'],
      knownRewardCopy: 'A hundred points, or none, and Bastian Kroll’s opinion of you either way.',
      discoverWhen: { flagsSet: ['stake_called'] },
      steps: [
        {
          id: 'the_bout',
          playerCopy: 'Answer Margot’s Stake before Thursday night.',
          directorNotes:
            'Margot will not fight; she names a champion, a fourth-year boxer from the river club, and Bastian referees. The bout is sparring with tape and a medic, three rounds, and a tap-out ends it. Refusing a lawful Stake costs five points, which is half of everything the player has. Swinging first outside the ring is -50. Bastian will tell the player all of this kindly beforehand.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_in_the_ring',
              label: 'Win it in the ring',
              predicate: {
                flagsSet: ['used:stake_a_bout'],
                atLocation: 'boathouse',
                minRelationship: [{ characterId: 'bastian', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['won_the_stake'],
              closesFlags: ['lost_the_stake'],
            },
            {
              routeId: 'lost_it_honestly',
              label: 'Lose it honestly',
              predicate: { flagsSet: ['used:stake_a_bout'], atLocation: 'boathouse' },
              setsFlags: ['lost_the_stake'],
              closesFlags: ['won_the_stake'],
            },
            {
              routeId: 'talked_her_down',
              label: 'Make Margot withdraw it',
              predicate: { flagsSet: ['used:name_a_price', 'spoke:margot'] },
              setsFlags: ['stake_withdrawn'],
              closesFlags: [],
            },
            {
              routeId: 'swung_first',
              label: 'Swing first, outside the ropes',
              predicate: { flagsSet: ['used:swing_first', 'stake_called'] },
              setsFlags: ['fought_dirty'],
              closesFlags: ['won_the_stake'],
            },
            {
              routeId: 'let_it_lapse',
              label: 'Do not turn up',
              predicate: { flagsSet: ['stake_called'], afterWorldMinute: 3 * 1440 + 22 * 60 },
              setsFlags: ['refused_the_stake'],
              closesFlags: ['won_the_stake'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['stake_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_council', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_last_perfect_paper',
      title: 'The Last Perfect Paper',
      summary: 'Sixteen years ago somebody scored forty out of forty and asked to see the books. The proctor knows who.',
      kind: 'LEAD',
      involvedCharacterIds: ['grey', 'ledger', 'marsh'],
      involvedLocationIds: ['porters_lodge', 'library', 'ledger_room'],
      knownRewardCopy: 'What Mr. Grey read sixteen years ago, and whether he is in the room when it ends.',
      discoverWhen: { flagsSet: ['knows:grey_was_a_student'] },
      steps: [
        {
          id: 'what_grey_saw',
          playerCopy: 'Find out what Mr. Grey read sixteen years ago.',
          directorNotes:
            'This whole thread is optional and should feel like it. A player who never goes to the lodge at night or the photograph corridor never sees a beat of it, and the main story is complete without it. For a player who is here, keep Grey exact and unsentimental: six days, a minus one for an untucked shirt, a page in a biscuit tin.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Ask him straight, by the stove',
              predicate: {
                flagsSet: ['used:ask_straight', 'spoke:grey'],
                minRelationship: [{ characterId: 'grey', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:what_grey_saw', 'grey_trusts_you'],
              closesFlags: [],
            },
            {
              routeId: 'the_biscuit_tin',
              label: 'Read the page he kept',
              predicate: { hasItems: ['grey_page'] },
              setsFlags: ['knows:what_grey_saw'],
              closesFlags: [],
            },
            {
              routeId: 'the_old_record',
              label: 'Find his expulsion record in the library',
              predicate: { flagsSet: ['used:work_the_rules'], atLocation: 'library' },
              setsFlags: ['knows:what_grey_saw', 'found_his_record'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:grey_story'],
            abilities: [],
            reputation: [{ factionId: 'faction_staff', amount: 10 }],
          },
        },
        {
          id: 'finish_it',
          playerCopy: 'Decide whether Mr. Grey is in the room when the books are read.',
          directorNotes:
            'Only meaningful after an audit. Bringing him is a choice the player makes for him, and he will not ask. If he is there, he stands for all of it. If he is not, he hears about it at the lodge from a cook, and says thank you to nobody in particular.',
          enterWhen: { flagsSet: ['knows:what_grey_saw'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_him',
              label: 'Bring him down to the vault',
              predicate: { flagsSet: ['audit_opened'], minRelationship: [{ characterId: 'grey', dimension: 'trust', value: 65 }] },
              setsFlags: ['grey_was_there'],
              closesFlags: ['grey_kept_out'],
            },
            {
              routeId: 'left_him_at_the_gate',
              label: 'Do it without him',
              predicate: { flagsSet: ['audit_opened'] },
              setsFlags: ['grey_kept_out'],
              closesFlags: ['grey_was_there'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['grey_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_staff', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_friday_at_ten',
      title: 'Friday at Ten',
      summary: 'The Standing Hearing sits on Friday morning, and your name is on the list of students to be carried or expelled.',
      kind: 'MAIN',
      involvedCharacterIds: ['marsh', 'ren', 'margot', 'grey'],
      involvedLocationIds: ['council_chamber'],
      knownRewardCopy: 'Your place at Tallis College, or a walk down the hill.',
      discoverWhen: { flagsSet: ['hearing_called'] },
      steps: [
        {
          id: 'the_hearing',
          playerCopy: 'Keep your place in front of the Standing Hearing.',
          directorNotes:
            'Eleven council chairs, the white one, and the Provost at the side with tea. Margot reads the complaint or the balance. Ren chairs and has one vote. Every route here is a real way through, and saying nothing is a way through too: it ends in expulsion, and that must be written as what a rigged hearing does, not as the player’s mistake.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_books_were_read',
              label: 'Walk in after the Correction has ended',
              predicate: { flagsSet: ['correction_ended'], afterWorldMinute: 4 * 1440 + 10 * 60 },
              setsFlags: ['kept_your_place', 'hearing_collapsed'],
              closesFlags: ['expelled'],
            },
            {
              routeId: 'ren_vouched',
              label: 'Ren votes for you',
              predicate: {
                flagsSet: ['spoke:ren'],
                minRelationship: [{ characterId: 'ren', dimension: 'trust', value: 65 }],
                afterWorldMinute: 4 * 1440 + 10 * 60,
              },
              setsFlags: ['kept_your_place', 'ren_vouched'],
              closesFlags: ['expelled'],
            },
            {
              routeId: 'the_attic_paid',
              label: 'The attic empties its jar for you',
              predicate: {
                minFactionReputation: [{ factionId: 'faction_attic', value: 50 }],
                afterWorldMinute: 4 * 1440 + 10 * 60,
              },
              setsFlags: ['kept_your_place', 'attic_carried_you'],
              closesFlags: ['expelled'],
            },
            {
              routeId: 'beat_them_on_the_rules',
              label: 'Quote them their own Charter',
              predicate: { flagsSet: ['used:work_the_rules'], atLocation: 'council_chamber', afterWorldMinute: 4 * 1440 + 10 * 60 },
              setsFlags: ['kept_your_place', 'won_on_the_rules'],
              closesFlags: ['expelled'],
            },
            {
              routeId: 'bought_your_way',
              label: 'Spend Ren’s card at the hearing',
              predicate: { hasItems: ['rens_card'], afterWorldMinute: 4 * 1440 + 10 * 60 },
              setsFlags: ['kept_your_place', 'bought_your_place'],
              closesFlags: ['expelled'],
            },
            {
              routeId: 'expelled_by_default',
              label: 'Let the hearing decide',
              predicate: { flagsSet: ['hearing_called'], afterWorldMinute: 4 * 1440 + 11 * 60 },
              setsFlags: ['expelled'],
              closesFlags: ['kept_your_place'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['hearing_over'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_bell',
      atWorldMinute: 9 * 60,
      locationId: 'exam_hall',
      publicCopy:
        'The bell rings once. Two hundred and twelve exam papers turn over at the same moment, and the hall goes quiet enough to hear the clock.',
      directorNotes:
        'Whatever the player has or has not said to Ren, the sitting starts now. Ren leaves the desk on the bell, card or no card, and walks to the back of the hall to watch. Mr. Grey does not look at either of them. If the player is still talking, that is -2 for a raised voice in a hall.',
      setsFlags: ['the_bell_rang'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_pens_down',
      atWorldMinute: 12 * 60,
      locationId: 'exam_hall',
      publicCopy: 'Mr. Grey closes his watch. “Pens down.” Two hundred and twelve pens go down, and one goes down a second late.',
      directorNotes:
        'Every paper is collected as it is. A player who did nothing hands in nothing. A player who left early is already -10 for leaving a sitting. Ren is gone before the papers are.',
      setsFlags: ['paper_handed_in'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_first_adjustment',
      atWorldMinute: 13 * 60 + 15,
      locationId: null,
      publicCopy: 'Your band buzzes in the middle of nothing at all. [-1 · Adjustment · Authorised · Reason: not recorded]',
      directorNotes:
        'The first unexplained deduction the player has noticed. Apply it to the running balance and do not explain it. This one was keyed by hand from the council wing, not by the midnight Correction, and the player cannot know that yet. If Yui is nearby she goes very still, then very loud.',
      setsFlags: ['saw_an_adjustment'],
      cancelledByFlags: [],
      requiresFlags: ['paper_handed_in'],
      movesCharacters: [],
    },
    {
      id: 'we_results',
      atWorldMinute: 18 * 60,
      locationId: 'colonnade',
      publicCopy:
        'At six the Board in the colonnade flickers, and the first year’s Standing Paper results go up name by name, from the bottom.',
      directorNotes:
        'The whole first year is under the Board. Whatever the player did with the paper is now public, and everybody they have met today is somewhere in the crowd looking for their own name and then for the player’s.',
      setsFlags: ['results_posted'],
      cancelledByFlags: [],
      requiresFlags: ['paper_handed_in'],
      movesCharacters: [
        { characterId: 'margot', toLocationId: 'colonnade' },
        { characterId: 'yui', toLocationId: 'colonnade' },
      ],
    },
    {
      id: 'we_lodge_lamp',
      atWorldMinute: 22 * 60 + 40,
      locationId: 'porters_lodge',
      publicCopy:
        'Under the lodge lamp Mr. Grey is reading an old exam paper with 40/40 written on the cover in red. The name on it, in a student’s handwriting, is his own.',
      directorNotes:
        'Only for a player who has already found their way to the lodge, which is already a slightly odd thing to do in the first week of a points war. He does not hide the paper. He does not explain it either, unless asked.',
      setsFlags: ['knows:grey_was_a_student'],
      cancelledByFlags: [],
      requiresFlags: ['visited:porters_lodge'],
      movesCharacters: [{ characterId: 'grey', toLocationId: 'porters_lodge' }],
    },
    {
      id: 'we_hearing_called',
      atWorldMinute: 1440 + 9 * 60,
      locationId: null,
      publicCopy: 'Every band in the first year chimes at once: a Standing Hearing sits on Friday at ten. Your name is on the list.',
      directorNotes:
        'Why the player is on it depends on the paper. A perfect paper is frozen under Margot’s irregularity complaint. Anybody under twenty points is there to be carried or expelled. Yui is on it too, unless she has been covered.',
      setsFlags: ['hearing_called'],
      cancelledByFlags: ['paid_to_fail'],
      requiresFlags: ['standing_known'],
      movesCharacters: [],
    },
    {
      id: 'we_stake_called',
      atWorldMinute: 1440 + 11 * 60,
      locationId: 'scholar_attic',
      publicCopy:
        'Margot Ashdown pins a printed notice to your door with a silver council pin: a Stake, a hundred of her points against your ten, in the boathouse ring on Thursday night.',
      directorNotes:
        'Lawful, public and designed so that refusing costs half of everything the player has. Margot is cheerful about it in the corridor. Yui reads it over the player’s shoulder and swears in a way that costs nothing because nobody official heard it.',
      setsFlags: ['stake_called'],
      cancelledByFlags: ['paid_to_fail'],
      requiresFlags: ['results_posted'],
      movesCharacters: [{ characterId: 'margot', toLocationId: 'scholar_attic' }],
    },
    {
      id: 'we_year_photograph',
      atWorldMinute: 1440 + 15 * 60,
      locationId: 'library',
      publicCopy:
        'In the library’s corridor of year photographs, sixteen years back, a thin student with Mr. Grey’s face holds a certificate that says Perfect Paper. The frame beside it is empty.',
      directorNotes:
        'Only for a player who has been in the library. It is a small fact on a wall. Let the player decide what it means, and let the librarian say only that the empty frame used to have a second photograph in it.',
      setsFlags: ['knows:grey_was_a_student'],
      cancelledByFlags: [],
      requiresFlags: ['visited:library'],
      movesCharacters: [],
    },
    {
      id: 'we_yui_hits_zero',
      atWorldMinute: 1440 + 18 * 60,
      locationId: 'scholar_attic',
      publicCopy: 'Yui’s band goes from red to dark. White letters cross its face: [Balance 0 · Notice served · 48 hours]',
      directorNotes:
        'Only if nobody has covered her. She laughs about it for about a minute and then sits on the corridor floor. She can still be saved for forty-eight hours by a gift of points, and she will not ask for one.',
      setsFlags: ['yui_on_notice'],
      cancelledByFlags: ['yui_covered'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'yui', toLocationId: 'scholar_attic' }],
    },
    {
      id: 'we_midnight_tick',
      atWorldMinute: 2 * 1440 + 1,
      locationId: 'scholar_attic',
      publicCopy:
        'At one minute past midnight every red band on the attic corridor buzzes at the same moment, behind eleven different doors.',
      directorNotes:
        'For a player who already suspects. It is the Correction running, on schedule, and the sound of it is the most damning thing in the story. Each band is -1 or -2. Nobody on the corridor says anything for a while.',
      setsFlags: ['saw_it_run'],
      cancelledByFlags: ['correction_ended'],
      requiresFlags: ['knows:the_pattern'],
      movesCharacters: [],
    },
    {
      id: 'we_ren_on_the_jetty',
      atWorldMinute: 2 * 1440 + 23 * 60 + 30,
      locationId: 'boathouse',
      publicCopy: 'Ren Calloway is sitting at the very end of the boathouse jetty in his white blazer, alone, not on his phone.',
      directorNotes:
        'Only for a player who refused him. This is where he is honest if he is ever going to be: about the signatures, the last perfect paper, and why the bribe was also a warning. If the two of them have been circling each other, this is the place for it, and it goes no further than a kiss.',
      setsFlags: ['ren_on_the_jetty'],
      cancelledByFlags: [],
      requiresFlags: ['refused_ren'],
      movesCharacters: [{ characterId: 'ren', toLocationId: 'boathouse' }],
    },
    {
      id: 'we_tea_with_the_provost',
      atWorldMinute: 3 * 1440 + 16 * 60,
      locationId: 'provost_house',
      publicCopy: 'A handwritten card under your door: tea at the Provost’s House, four o’clock. It is already five to.',
      directorNotes:
        'The Provost has heard. She is gracious, she agrees with everything the player says about fairness, she offers to make their balance very much larger by Friday, and she wears the key the whole time. Lateness is -3, and she will mention it kindly.',
      setsFlags: ['provost_invited'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_correction'],
      movesCharacters: [{ characterId: 'marsh', toLocationId: 'provost_house' }],
    },
  ],
  promises: [
    {
      id: 'p_friday',
      kind: 'FINALE',
      label: 'Whether you are still at Tallis on Friday afternoon',
      seedHint: 'A red light on your band, and a hearing nobody has told you about yet.',
      payoffHint: 'The Standing Hearing rules, and your number is either above zero or it is not.',
      weight: 1,
    },
    {
      id: 'p_ren',
      kind: 'RIVAL',
      label: 'What Ren Calloway is actually buying',
      seedHint: 'He offered a thousand points for a blank paper and did not look like a man who wanted to win.',
      payoffHint: 'His signature on every Correction sheet, a plan to end it in his last vote, and a bribe that was half a warning.',
      weight: 0.9,
    },
    {
      id: 'p_adjustments',
      kind: 'MYSTERY',
      label: 'The minus ones with no reason given',
      seedHint: '[-1 · Adjustment · Authorised · Reason: not recorded], an hour after pens down.',
      payoffHint: 'Key Seven, a brass key on a green ribbon, and a fixed pool of points the attic has been refilling for twenty-three years.',
      weight: 0.85,
    },
    {
      id: 'p_yui',
      kind: 'RELATIONSHIP',
      label: 'Yui at three points',
      seedHint: 'Three points is one soup, one bread roll and no opinions until Friday.',
      payoffHint: 'Twenty points she took from Margot before she knew you, and whether she is still on the hill when it matters.',
      weight: 0.8,
    },
    {
      id: 'p_last_paper',
      kind: 'THEME',
      label: 'The last perfect paper',
      seedHint: 'A proctor who checks his pocket watch instead of looking at the student with the perfect entrance score.',
      payoffHint: 'Tobias Grey opened the books sixteen years ago, read one page, and was at zero six days later.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_shifts',
      name: 'You Work Every Shift',
      role: 'Kitchen shifts and hard graft',
      summary:
        'You have kept yourself above zero mopping, carrying and serving for two points a shift, so the staff know your name and you know every back door.',
      playstyle: ['Practical', 'Knows the staff', 'Tireless'],
      blurb:
        'The cooks save you the heel of the loaf, the porters nod you through, and you can carry four trays at once without spilling one.',
      attributeBonus: { might: 2, resolve: 2 },
      skillProficiencies: { graft: 3, blind_spots: 2 },
      startingItems: [{ itemId: 'plain_tray', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_staff', amount: 15 }],
    },
    {
      id: 'arch_small_print',
      name: 'You Read the Small Print',
      role: 'Rules, loopholes and the Charter',
      summary:
        'You read the whole Tariff on your first night and the Charter on your second, and you have been winning small arguments with the Ledger ever since.',
      playstyle: ['Rules-lawyer', 'Patient', 'Precise'],
      blurb:
        'You know the line numbers. You once got a minus two reversed by pointing out that the colonnade ends at the fourth column, and you were running at the fifth.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { rules: 3, study: 1, gut: 1 },
      startingItems: [{ itemId: 'tariff_sheet', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_talker',
      name: 'You Talk Your Way Out',
      role: 'Charm, bluffing and bargaining',
      summary:
        'You have talked your way past three fines, a locked library and one prefect, and you have never once had the points to back any of it up.',
      playstyle: ['Charming', 'Quick', 'Bluffs'],
      blurb:
        'Half the second years think you are on a secret council committee, because you once said so, confidently, while holding a clipboard.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { front: 3, bargain: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_council', amount: 10 }],
    },
    {
      id: 'arch_scrapper',
      name: 'You Box at the Boathouse',
      role: 'Fighting, footwork and nerve',
      summary:
        'You fight in the boathouse ring on Thursday nights for the two points a win pays, and you have lost more than you have won, honestly.',
      playstyle: ['Physical', 'Stubborn', 'Hard to rattle'],
      blurb:
        'Bastian tapes your hands without being asked now, which on this hill counts as a compliment.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { scrapping: 3, nerve: 2 },
      startingItems: [{ itemId: 'hand_tape', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_attic', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is your name?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Kai Morrison' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'How have you stayed above zero this month?',
      helpText:
        'How you have been keeping your balance up since term started, which sets what you are good at. It is fixed for the whole story. It does not decide whether you take Ren’s card, sit the paper honestly, or are still at this college on Friday: all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the attic corridor know about you?',
      helpText: 'One or two plain sentences about who you were before the hill. Most people write one, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. First in my family to go to college. I will argue with a vending machine if it owes me money.',
    },
    {
      id: 'first_instinct',
      label: 'When Ren slides the card over, what is your first instinct?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite on turn one and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'take_it', label: 'A thousand points is a thousand points' },
        { id: 'refuse_it', label: 'Nobody buys my paper' },
        { id: 'want_to_know', label: 'Why is it worth that much to him?' },
        { id: 'think_of_yui', label: 'Yui is at three' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Ren see across the desk?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A navy blazer from the lost-property box, sleeves rolled, and a red light on my wrist.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Five of these are the player or Yui not making it, or making it at a
   * price, and none is written as a punishment. "Zero" is reachable by doing
   * nothing at the hearing, which is the honest failure of a rigged game.
   * "Outside the Gate" is walking away and is available a third of the way in.
   *
   * "The Last Perfect Paper" is the only one that needs the optional Grey lead.
   */
  endings: [
    {
      id: 'end_ten_points',
      name: 'Ten Points',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['kept_your_place'],
        flagsUnset: ['correction_ended', 'yui_expelled', 'kept_the_key', 'ren_ends_it_quietly', 'paid_to_fail'],
      },
      condition:
        'The quiet survival. The player got through the week, kept their place at the hearing, and did not change the college. Nobody was saved and nobody was ruined. Play it small: a band that still reads a low number, a plain tray, a Monday. Do not have anybody make a speech about what it meant.',
      epilogue:
        'The band still glows red some weeks. The plain tray is still free under ten, and the cooks still put extra bread on it. Ren nods to you in the colonnade now, which costs him nothing and you nothing, and the Board goes on rewriting itself every evening at six.',
      hint: '',
    },
    {
      id: 'end_the_thousand',
      name: 'The Thousand',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['paid_to_fail'], flagsUnset: ['correction_ended'] },
      condition:
        'The player took Ren’s card, handed in a blank paper, and stayed safe. This must not be written as a punishment: a thousand points is a real year of meals and a heated room, and the player chose it with clear eyes. What it costs is quieter. The audit never happens, and somebody else’s band ticks down at midnight.',
      epilogue:
        'A thousand points lasts a careful student most of a year. The Board puts you somewhere in the middle and nobody looks twice. Ren never mentions the card again. At one minute past midnight, up in the attic, somebody’s band ticks down by one, and you sleep through it, mostly.',
      hint: '',
    },
    {
      id: 'end_zero',
      name: 'Zero',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['expelled'], flagsUnset: ['yui_expelled', 'correction_ended'] },
      condition:
        'The player hit zero or lost at the hearing, and was expelled. This is the honest failure of a rigged game and must not read as the player’s fault alone. Write the practical end: the band cut off at the lodge, the bag, the walk down the hill. Whatever the player found out this week goes out of the gate with them.',
      epilogue:
        'Mr. Grey cuts the band off at the lodge with the scissors he keeps for it, and does not say anything, and then does. Brack Street is cold and unscored and nobody’s number is on anything. The town paper’s education reporter buys the coffee.',
      hint: 'The hearing does not need you to make a mistake.',
    },
    {
      id: 'end_outside_the_gate',
      name: 'Outside the Gate',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['expelled'] },
      condition:
        'The player walked out of a college that was scoring their every move and did not wait to be expelled. Do not make it a defeat and do not redeem it. It is a coherent answer to a rigged game, and the person it costs most may be whoever they left behind at three points.',
      epilogue:
        'The band comes off at the lodge for twenty points the player no longer needs. Brack Street has a bus, a cafe and a job board. On the Board up the hill a name drops off the bottom of the first year at six that evening, and two people notice: a proctor and a president.',
      hint: '',
    },
    {
      id: 'end_three_points',
      name: 'Three Points',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['yui_expelled', 'kept_your_place'] },
      condition:
        'The player kept their place and Yui did not. Whatever the reason, write it as what it is: the player is still on the hill and their friend is on the night bus. No villain needs naming. The attic corridor is one door quieter.',
      epilogue:
        'Yui texts from the bus, then from home, then less. Her room goes to a first-year in January who has no idea why the cooks keep putting extra bread on the wrong tray. You keep her notebook in your desk and add a line every time a minus one arrives just after midnight.',
      hint: 'She will not ask you for anything.',
    },
    {
      id: 'end_rens_way',
      name: 'Ren’s Way',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['ren_ends_it_quietly'] },
      condition:
        'The player sold Ren their silence, and Ren ended the Correction his way: in his last council vote, quietly, with his family’s name intact. It worked. It was also a deal. If the two of them have grown close, this is where a single kiss belongs, and no further.',
      epilogue:
        'The quarterly sheet never gets its fifth signature. Ren graduates in his white blazer and shakes your hand on the steps a second longer than the photographer needs. Nobody ever learns why the attic’s bands stopped ticking down at midnight, which is exactly what he paid for.',
      hint: '',
    },
    {
      id: 'end_two_at_the_gate',
      name: 'Two at the Gate',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['expelled', 'yui_expelled'] },
      condition:
        'The player and Yui both went out through the gate. Do not make it a tragedy: they are two adults with a notebook, a grudge and a town the Ledger cannot see. If the player found out about Key Seven, this is where it starts to matter outside the walls.',
      epilogue:
        'They split a room above the cafe on Brack Street that costs money instead of points, which Yui finds hilarious for a week. The notebook goes to the town paper in the spring. By summer the college has a new Provost and a Tariff with one line missing from the bottom.',
      hint: '',
    },
    {
      id: 'end_the_hand_on_the_key',
      name: 'The Hand on the Key',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['kept_the_key'] },
      condition:
        'The player got hold of Key Seven and kept it, using it for themselves and the people they chose. Write it as power rather than villainy: the player is now the hand on the scale, and everybody who comes to them asking is somebody they could help or refuse. The attic notices. So does Ren.',
      epilogue:
        'Your balance never goes below a thousand again, and neither does Yui’s, and neither does anybody’s you like. The Correction still runs. It runs around the people you have decided about. Ren, on the steps at graduation, says only: “Now you know what it weighs.”',
      hint: '',
    },
    {
      id: 'end_out_loud',
      name: 'Out Loud',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['went_public', 'correction_ended'] },
      condition:
        'The Correction came out in public: read onto the Board in the colonnade from the audit, or printed in the town paper from outside the gate. Write the morning after rather than the speech: every band on campus, every face under the Board, the Provost’s door shut. Nobody gets to be the hero for long.',
      epilogue:
        'The Board shows the Adjustments for three days before anybody works out how to take them down. The founding families ring the Provost in shifts. In the spring the Tariff is reprinted with the last line gone, and somebody in the attic frames the old one.',
      hint: 'The Ledger cannot see past the gate. The town can.',
    },
    {
      id: 'end_lights_out',
      name: 'Lights Out',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['ledger_shut_down'] },
      condition:
        'The player went down to the vault and switched the Ledger off. Every band on campus goes blank at once. This is not a clean victory: the Ledger also fed people, housed them and paid for honesty, and now nobody knows what anything costs. Write the first morning with no numbers in it.',
      epilogue:
        'For nine days nobody on the hill knows what anything costs, the refectory serves everybody the plain tray, and it is the best week the college has had in twenty-three years. Then the Provost has it switched back on, and it starts every single student at fifty.',
      hint: '',
    },
    {
      id: 'end_the_refund',
      name: 'The Refund',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: { flagsSet: ['refunded_everyone', 'correction_ended'] },
      condition:
        'The player turned Key Seven the other way. Overnight every Adjustment in twenty-three years runs backwards: points flow out of the founding families’ heirs and back to the students they were taken from. Nobody explains it on the Board. The attic wakes up rich.',
      epilogue:
        'At one minute past midnight every red band in the attic turns white. Yui’s reads four thousand and eleven. She sits on the corridor floor and laughs until a prefect comes to see what the noise is, and then she gives him fifty points for coming, because she can.',
      hint: 'There is a manual for the key, and the manual has two directions in it.',
    },
    {
      id: 'end_the_last_perfect_paper',
      name: 'The Last Perfect Paper',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: { flagsSet: ['audit_opened', 'grey_was_there', 'correction_ended'] },
      condition:
        'The audit was opened, Mr. Grey was in the room when it was, and the Correction ended. This is Grey’s ending as much as the player’s: sixteen years at the gate, finished. Do not have him say much. Have him read the page he could not finish.',
      epilogue:
        'The Ledger reads the whole book, one Adjustment at a time, for four hours. Grey stands for all of it. At the end it adds a line nobody asked for: [+200 · Perfect Standing Paper · T. Grey · Balance restored]. He is readmitted in the spring, at thirty-six, and sits in the front row.',
      hint: 'Somebody has done this before.',
    },
  ],
  opening:
    "Your wristband buzzes.\n\n[Balance: 10 · At zero, you are expelled.]\n\nA fourth-year in a white blazer drops into the empty seat beside your exam desk.\n\n\"Ren Calloway. Student president.\" He smiles like it costs him nothing. \"Don’t stand up.\"\n\nHe slides a black card across the desk. Gold print: 1,000 POINTS.\n\n\"Fail the exam. Hand in a blank paper and this is yours. Nobody needs to know.\"\n\nAcross the aisle, your friend Yui stares at the card. Her band reads 3.\n\nAt the front, the proctor checks his watch and lifts the bell.\n\nThirty seconds.\n\nRen taps the card once. \"Yes or no?\"",
  openingPanel: {
    assetKey: 'story_ten_points_to_expulsion/opening',
    alt: 'Ren Calloway in a white blazer sliding a black card printed 1,000 POINTS across an exam desk toward the viewer, rows of desks and a brass bell behind him.',
  },
  openingSuggestions: [
    '"Why is my blank paper worth a thousand points to you?"',
    'I pocket the card without a word and pick up my pen.',
    'I raise my hand. "Proctor! He’s paying me to fail."',
  ],
  publishedAt: '2026-11-22T04:00:00.000Z',
};

export const TEN_POINTS_TO_EXPULSION = StoryVersion.parse(raw);
