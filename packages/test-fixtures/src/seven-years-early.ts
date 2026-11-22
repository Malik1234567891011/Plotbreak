import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Seven Years Early" — the betrayal already happened, and nobody but you
 * remembers it.
 *
 * Bible: `docs/story-bibles/new50/28_SEVEN_YEARS_EARLY.md`. Slate #28, drop 10.
 *
 * Playable span: one week, from Monday at twenty to eleven in the café where
 * the player first shook Victor Lane's hand, to the party at his loft on
 * Saturday night. The seven years that follow in the first life — the patent,
 * the board vote, the server room — are backstory carried in hard canon, and
 * the seven years that follow in this one are what the endings are for.
 *
 * The structure is Good Morning, Husband's: an ordinary week that is a whole
 * game on its own, a person who is not a prize, a secret with a deadline, and
 * an optional mystery (a voice memo nobody has recorded yet) that never forces
 * itself on a player who does not pull on it. Building the app with your sister
 * and getting your heart checked, without ever speaking to Victor again, is a
 * legitimate way to play this and should be good.
 *
 * The regression fantasy is knowing what happens next. What keeps it from
 * being a cheat code is that every change blurs the future: the player's memory
 * is exact until they act on it, and then people stay who they are while events
 * drift. And Victor reads faces for a living, so the more the player shows, the
 * earlier he moves.
 *
 * Production runs `runTurnPure`, which reads the premise, tone guide, hard
 * canon, the chosen archetype and its starting abilities, the cast, opening,
 * style examples, places, quest items, factions, quest summaries, world events
 * and the first twelve endings. It never sees resources, step notes or the rest
 * of the ability list. So every age, every secret that drives a scene and the
 * whole week's timetable are in hard canon or world-event notes, the objects
 * the plot turns on are quest items, every archetype starts with one ability
 * the storyteller can read, and there are exactly twelve endings.
 *
 * 13+: the death is a cold floor and a closing door, and nothing more is ever
 * described. Romance goes no further than a kiss. Every character is an adult
 * and the first hard-canon line says how old.
 *
 * Three invisible variables. Energy is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. His Suspicion comes first among the descending
 * pair on purpose: public violence raises the first GOOD_LOW in array order,
 * and a scene in a café is exactly how Victor finds out you are not who he
 * researched. Ripples never comes back down, because the future does not heal.
 */

const raw = {
  id: 'sv_seven_years_early_1',
  storyId: 'story_seven_years_early',
  version: 1,
  title: 'Seven Years Early',
  fantasyLabel: 'Same handshake. You know how it ends.',
  hook: 'Your partner stole your company and let you die. You wake up seven years early, on the morning you met him, with his hand held out and the same contract on the table.',
  openingObligations: [
    {
      what: 'Answer Victor Lane, whose hand is still held out across the table: take it and sign his contract, or do not.',
      withCharacterId: 'victor',
      dueInMinutes: 10,
    },
    {
      what: 'The half past eleven meeting with Naomi Ito at this café, booked two weeks ago. Last time, you never came.',
      withCharacterId: 'naomi',
      dueInMinutes: 50,
    },
  ],
  premise:
    'Seven years ago you met Victor Lane in a café in the city of Westharbor and signed his contract the same morning. You had written Parley, an engine that translates a phone call live, so two people who share no language each hear the other in their own. He had the money, the charm and a plan.\n\n' +
    'Seven years later Parley was in every phone, Victor was on every magazine cover, and you were out. He took the patent, turned the board and your own sister against you, and used a clause you never read to buy back your shares for a dollar each.\n\n' +
    'On the night before the company went public you went to the old server room to take your code back. Your heart, which nobody had ever checked, gave out on the floor. Victor came in, picked up your phone, looked at you for a long time, and closed the door.\n\n' +
    'Then you woke up in the café, seven years early, with his hand held out and the same contract on the table.\n\n' +
    'Nobody else remembers. You know what he will do this week: file your patent under his own name on Wednesday, and pitch your work as his on Friday. You have five days to stop him, beat him, or build it without him. Every change you make makes the future you remember less true, so he must not see you coming.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Revenge', 'Regression', 'Business', 'Thriller', 'Modern'],
  mechanicsChips: [
    'You remember the next five days',
    'Every change blurs the future',
    'He must not see it coming',
    'Revenge is optional',
    'Your sister still talks to you',
  ],
  contentDescriptors: ['ROMANCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend the whole week building your app with your sister, getting your heart checked and never speaking to Victor again, and that is a real way to play this. You can also sign his contract on purpose and take him apart from inside, or tell him to his face what he did and find out what a man like that does when he is frightened. Revenge is on the table. So is just living.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'blue_hour',
    startWorldMinute: 10 * 60 + 40,
    startingItems: [
      { itemId: 'old_laptop', qty: 1 },
      { itemId: 'your_phone', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-six, in a body that is twenty-six again and a memory that is thirty-three. Victor Lane is thirty-one, Naomi Ito thirty-four, Sol twenty-three, Detective Celia Ruiz forty-six, Wendell Osei sixty-one and Arden Vos fifty-eight. Sol is in her final year at the Westharbor College of Art, a university-level art school.',
      'The story opens on a rainy Monday at twenty to eleven in the Blue Hour Café on Canal Street, in the port city of Westharbor. Victor Lane has just introduced himself, held out his hand, and put a co-founder contract with an uncapped pen on the table. He came because he saw the player demo their engine at a university showcase and read their write-up on a programmers’ forum.',
      'The player wrote Parley: a translation engine that lets two people on a phone call speak different languages and each hear the other in their own, less than half a second behind. The only complete copy of the code is on the player’s old laptop, the one with the cracked hinge. There is no backup.',
      'The first life, which only the player remembers. They signed this contract today and emailed Victor the code at eleven that night. On Wednesday at nine Victor filed the patent on Parley with himself as the inventor. On Friday at Demo Night he pitched it as his, and Arden Vos offered two million for a fifth of the company that night. Parley went into every phone. Sol joined in year two as head of design. In year six Victor showed the board forged expense records, removed the player for cause under clause fourteen, and bought their shares back at a dollar each. Sol believed the records and voted with him, and the two of them did not speak again.',
      'The player died seven years from now, on the night before Parley went public. They went to the server room on the seventh floor of the Halcott Building to take their code back, and a heart-rhythm condition nobody had ever checked for made them collapse. Victor came in, picked up their phone, looked at them for a long time and closed the door. Nothing more than that is ever described.',
      'Nobody knows why the player woke up seven years early, including the player. Nobody else remembers the first life. Nothing supernatural is visible in ordinary life and nobody in this world has powers.',
      'The player’s memory of the coming week is exact until they change something. Every change spreads: people stay who they are, but events drift in time, change shape or stop happening, and the bigger the change, the less the next memory can be trusted.',
      'Clause fourteen of the contract, on page eight, assigns everything the player has written and will write to the company, and lets a board Victor controls remove a founder for cause and buy back their shares at a dollar each. If challenged, Victor crosses it out on the spot, because he does not need it this week.',
      'The patent race. Whoever files a complete application on Parley first owns it, and contesting it afterwards takes years. Victor has booked Wendell Osei, the fastest patent attorney on Canal Street, for Wednesday at nine, and will file with or without the player’s signature, using the demo and the forum write-up. If the player signs Osei’s engagement letter first, Osei must turn Victor away for a conflict, and Victor files through a slower firm on Thursday at five instead. A complete filing needs a written technical description from the player, Osei’s fee of twelve hundred, and a signature. The player has about four hundred in the bank.',
      'Naomi Ito runs Lowtide Capital, a one-woman seed fund in a boathouse that backs boring things that work. Two weeks ago the player booked a meeting with her at the Blue Hour for half past eleven today. In the first life they never came and she waited forty minutes. After the board vote she sent them three lines: she was sorry, she would have backed them, call if they ever started again. They never called.',
      'Victor did this once before. Three years ago his first co-founder, Owen Mercer, had a severe asthma attack alone in a locked office during their company’s launch party. His phone and his inhaler were never found and it was ruled an accident. Eleven days later Wendell Osei’s office filed a correction naming Victor as sole inventor on Owen’s patent. Detective Celia Ruiz never believed the ruling, pushed it, and was moved to the cold-case desk for it. She still watches Victor in her own time, and she is at the corner table of the Blue Hour this morning, reading the same page of a newspaper.',
      'Arden Vos runs Vos Calder Ventures, the biggest money in Westharbor. Owen Mercer’s launch party was in a Vos Calder building, and its cameras were switched off that night. In the first life, on the night the player died, Vos Calder’s security team wiped the Halcott Building’s camera footage. The player does not know this.',
      'There is a voice memo on the player’s phone that they have not recorded yet: fourteen seconds, dated seven years from now. It is their own voice, out of breath: "It wasn’t only him. Don’t sign. Call Sol." It surfaces only if the player goes looking, by going through their phone or standing on the seventh floor of the Halcott Building, and it is never played for them.',
      'Sol, the player’s sister, sleeps on their sofa more nights than not. She is quietly filling in a form to leave art college on Friday and work full time at the noodle shop on Canal Street to cover the rent, and has told nobody. She has the family heart-rhythm condition that killed their father at forty-one; it is treated and she is fine. She booked the player a test at St. Brigid’s Hospital for Thursday at four, which they have cancelled twice. In the first life they never went.',
      'The week, as the player remembers it: Naomi arrives at the Blue Hour at half past eleven on Monday. Ruiz knocks on the player’s door on Tuesday at quarter past nine; last time they slept through it and Sol sent her away. Victor files on Wednesday at nine. On Thursday a thunderstorm cuts the power on Canal Street from two until five, and the clinic appointment is at four. Demo Night at Founders’ Hall is Friday at seven, and the third team’s demo crashes on stage. Victor throws a party at his loft on Saturday at nine, and Vos arrives at ten.',
      'A punch is a punch. Violence brings the police, a night in a cell and Victor’s lawyers, and in a city where every founder drinks at the same three cafés, everybody hears by morning. Romance between anybody goes no further than a kiss on the page.',
      'Victor is not a monster to be defeated in one scene and Naomi is not a prize to be won. Victor is charming, generous in public and sometimes right. Naomi can say no, and does.',
    ],
    toneGuide:
      'Fast, specific and tense, in short webnovel beats. The world is small physical things: the uncapped pen, the cracked laptop hinge, the sticky note on the kettle, the brass timer on Osei’s desk, rain on the café glass. ' +
      'The player knows what happens next, and the prose should pay that off concretely: when they call the future, give a time, a name, a number, and let it come true. Once they have changed enough, let it come true late, or differently, or not at all, and let them feel the ground move. ' +
      'Victor is frightening because he is warm. He never raises his voice, he gives credit in public, he remembers everybody’s coffee, and he waits. He must sometimes be right about business. ' +
      'Ordinary life is load-bearing: rent, noodles, a clinic appointment, a sister who draws on everything. If a scene has nothing at stake, let it be pleasant and short. ' +
      'Nobody has powers. A punch is a punch, and violence brings the police and Victor’s lawyers. The death in the first life is a cold floor and a closing door, and it is never described further. ' +
      'Romance with Naomi is optional, dry and slow: an argument about numbers that turns into something else, at most a kiss. There is no fan service and nobody lingers on anybody. ' +
      'The face at the top of a beat is Victor’s whenever he is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Victor reads the clause you pointed at. Then he reads it again, slower.\n\n"Huh." He smiles. "You actually read it."\n\nHe uncaps a second pen, crosses clause fourteen out, neatly, twice, and initials the margin.\n\n"There. Gone. Here’s the thing: I don’t need it. I need you."\n\nHe slides the contract back across the table.\n\nIt’s the same smile as the server room. You’d just never seen it from the floor.',
      'Sol is asleep on your sofa with a pencil still in her hand.\n\nYou stand in the doorway longer than you mean to.\n\nThe last time you saw her, she was raising her hand at a board table to vote you out.\n\nShe opens one eye. "Okay, so, why are you staring at me like I’m a ghost?"\n\n"No reason."\n\n"Liar." She rolls over. "There’s noodles. Don’t eat the green ones. They’re an experiment."',
      'Naomi Ito doesn’t stand up when you sit down.\n\nShe looks at the laptop. Then at the rain on your coat. Then at the window table, where a man in a grey coat is still finishing his coffee.\n\n"You booked me two weeks ago," she says. "You walked in with him."\n\nShe takes her glasses off.\n\n"Show me what he wants that badly."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 11, mind: 13, presence: 12, resolve: 12, arcana: 8 },
  skills: [
    { id: 'code', name: 'Code', attribute: 'mind', description: 'Forty-one thousand lines you wrote once already, and seven years of fixes nobody has thought of yet.' },
    { id: 'pitch', name: 'Pitch', attribute: 'presence', description: 'Making a person or a room full of strangers want something in four minutes.' },
    { id: 'poker', name: 'Poker Face', attribute: 'resolve', description: 'Not showing what you know to a man who reads faces for a living.' },
    { id: 'hindsight', name: 'Hindsight', attribute: 'arcana', description: 'Using what you remember of the next seven years without the memory going wrong on you.' },
    { id: 'digging', name: 'Digging', attribute: 'mind', description: 'Filings, registries, old news, and the paper trail a careful man still leaves.' },
    { id: 'bluffing', name: 'Bluffing', attribute: 'agility', description: 'A receptionist, a guest list, a locked door, and the right tone of voice.' },
    { id: 'legwork', name: 'Legwork', attribute: 'might', description: 'Crossing a wet city faster than somebody with a car and a driver.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is GOOD_HIGH because `resolveRest` refills those, and a body that is
   * twenty-six again is still running on seven years of somebody else's
   * exhaustion. It is what the generic cost path spends.
   *
   * His Suspicion is first among the descending pair because PUBLIC_VIOLENCE
   * raises the first GOOD_LOW in array order: a scene in a café is exactly how
   * he finds out. Ripples has no way down at all, on purpose. Every use of the
   * future spends some of it.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 78,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is running on nothing: they forget which version of the week they are in, answer the question somebody asked last time instead of this time, and agree to things to end conversations. Victor notices tired people. It is how he finds the soft part.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Hollow. Two lives of tiredness at once. The player mixes up what has happened with what is going to, misses a beat in every conversation and is easy to rush. This is the band where signing something to make it stop feels reasonable, and where sleep is the strongest move on the board.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a week that matters. Good for one hard conversation or one long night of code, honest about not being good for both. Sol notices before anybody else and says so.',
        },
        {
          upTo: 100,
          behaviour:
            'Awake in a body that is twenty-six again and does not hurt yet. The player can hold a pitch and a lie in the same afternoon, catch the half-second where Victor’s smile resets, and still be funny at dinner.',
        },
      ],
    },
    {
      id: 'suspicion',
      name: 'His Suspicion',
      max: 100,
      start: 8,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Victor thinks the player is exactly the trusting, brilliant, slightly lonely founder he researched. He talks freely, plans out loud and leaves his phone face up on the table.',
      color: '#B5473A',
      bands: [
        {
          upTo: 20,
          behaviour:
            'He has the player filed as the founder he read about: gifted, broke, grateful for attention. Warm, generous, careless with what he says. He mentions Vos by name, books things in front of them, and assumes yes.',
        },
        {
          upTo: 50,
          behaviour:
            'Something did not fit and he noticed. Still charming, now testing: small questions with known answers, a story told twice to see if the details come back the same, a coffee order he gets deliberately wrong. He starts using the player’s name more.',
        },
        {
          upTo: 80,
          behaviour:
            'He is protecting himself. He moves timelines earlier, stops putting things in writing, calls Vos at night, and is suddenly very kind to Sol. Anything the player says to him is now going to somebody else within the hour.',
        },
        {
          upTo: 100,
          behaviour:
            'He knows the player knows something and has stopped wondering what. He moves first, through lawyers and friends and the scene, and he is calm and generous about it in public, which is worse. He has started asking around about the player’s sister.',
        },
      ],
    },
    {
      id: 'ripples',
      name: 'Ripples',
      max: 100,
      start: 0,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The week runs exactly on its old rails. Every time, every name, every word the player remembers comes true to the minute, which is its own kind of horror.',
      color: '#5F8FBF',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The old rails hold. What the player remembers happens when they remember it, down to who orders what. Calling the future is close to certain, and the narration should make it feel like reading ahead in a book they already finished.',
        },
        {
          upTo: 55,
          behaviour:
            'Details slide. The right people turn up at the wrong hour, say the same thing in different words, or arrive with somebody who was not there last time. The big beats still land; the small ones are no longer safe to bet on.',
        },
        {
          upTo: 85,
          behaviour:
            'Events the player remembers may not happen at all, and new ones appear that they have no memory of. People still behave like themselves, which is now the only reliable thing. Victor, in particular, is still Victor.',
        },
        {
          upTo: 100,
          behaviour:
            'New water. The player knows people, not events. Every scene is as uncertain as it is for anybody else, and the only advantage left is knowing who somebody really is under pressure. That turns out to be most of it.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'old_laptop',
      name: 'The Old Laptop',
      tags: ['quest', 'tech'],
      questItem: true,
      droppable: false,
      skillModifiers: { code: 1 },
      description:
        'Cracked hinge, a peeling sticker of a cartoon crab, and the only complete copy of Parley: forty-one thousand lines of code and no backup.',
      loreText:
        'In the first life you emailed all of it to Victor at eleven on Monday night, with a message that said "all yours, partner".',
      icon: 'laptop',
    },
    {
      id: 'your_phone',
      name: 'Your Phone',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'Seven years old again: a cracked corner, four hundred and twelve in the bank app, and a chat with Sol whose last message is hers: "did u cancel the heart thing AGAIN".',
      loreText: 'It is the same model Victor picked up off the server-room floor, seven years from now. It feels heavier than it should.',
      icon: 'phone',
    },
    {
      id: 'the_contract',
      name: 'The Contract',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Nine pages: a co-founder agreement for a company that does not exist yet. Fifty-one percent to Victor Lane, forty-nine to you, and clause fourteen on page eight, which you did not read last time.',
      loreText: 'His pen is uncapped on top of it. In the first life you signed with it, and he told you to keep the pen.',
      icon: 'papers',
    },
    {
      id: 'correction_filing',
      name: 'The Mercer Correction',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Two pages from Wendell Osei’s files: a correction filed three years ago that changes the named inventor on Owen Mercer’s patent to Victor Lane alone. It is dated eleven days after Owen died.',
      loreText: 'In the margin, in Osei’s small pencil: "Asked twice. Client insisted."',
      icon: 'letter',
    },
    {
      id: 'mercer_box',
      name: 'The Mercer Box',
      tags: ['quest', 'evidence'],
      questItem: true,
      description:
        'A banker’s box Ruiz is not supposed to still have out: the coroner’s summary, a party guest list, a floor plan with one office circled, and a photograph of an empty inhaler holder on a desk.',
      loreText: 'On the inside of the lid, in Ruiz’s handwriting: PHONE NEVER FOUND. WHO TOOK IT?',
      icon: 'box',
    },
    {
      id: 'withdrawal_form',
      name: 'Sol’s Withdrawal Form',
      tags: ['document', 'personal'],
      description:
        'A college form to leave her course, filled in, signed, and folded into the back of her sketchbook. The date she has written on it is Friday.',
      loreText: 'Under "reason for leaving" she started to write something, crossed it out, and wrote "financial".',
      icon: 'papers',
    },
    {
      id: 'napkin_sketch',
      name: 'The Napkin Sketch',
      tags: ['personal'],
      description:
        'A Blue Hour napkin with a logo on it in biro: two speech bubbles overlapping into one. Sol drew it last week while you talked about the engine.',
      loreText: 'In the first life this became Parley’s logo, and Victor told every interviewer he drew it.',
      icon: 'sketch',
    },
    {
      id: 'naomi_folder',
      name: 'Naomi’s Folder',
      tags: ['document'],
      description:
        'Her battered leather folder. Inside, a one-page term sheet already filled in for you, before she had ever met you. Fair numbers, and a blank where the company name goes.',
      loreText: 'She wrote it for the meeting you never came to, last time, and never sent it.',
      icon: 'folder',
    },
    {
      id: 'demo_pass',
      name: 'Demo Night Pass',
      tags: ['pass'],
      skillModifiers: { pitch: 1 },
      description: 'A lanyard for Friday’s Demo Night at Founders’ Hall, the kind that gets you onto the stage rather than into the back row.',
      loreText: 'Last time, Victor wore the one with your company on it.',
      icon: 'badge',
    },
  ],
  abilities: [
    {
      id: 'walk_away',
      name: 'Walk Away',
      tags: ['social'],
      description: 'Refuse the deal, the contract or the handshake, and leave it on the table where everybody can see it.',
      affordances: ['refuse', 'say no', 'walk away', 'do not sign', 'turn him down', 'decline', 'leave the table', 'tear up the contract'],
      costs: [
        { resourceId: 'suspicion', amount: 6 },
        { resourceId: 'ripples', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_along',
      name: 'Play the Old You',
      tags: ['social'],
      description: 'Be the trusting founder he met seven years ago: the same jokes, the same easy yes, and nothing at all in your face.',
      affordances: ['play along', 'pretend', 'act normal', 'smile', 'sign it', 'shake his hand', 'go along with it', 'act like last time'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'poker', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_the_future',
      name: 'Call the Future',
      tags: ['sight'],
      description: 'Act on something you remember happening next, a time, a deal, a name, and be right about it.',
      affordances: ['i know what happens next', 'predict', 'warn them', 'call it', 'use what i remember', 'bet on it', 'tell them what will happen'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'ripples', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'hindsight', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ship_it',
      name: 'Ship It',
      tags: ['utility'],
      description: 'Build, fix or write up the engine yourself, seven years better at it than anybody else in the room.',
      affordances: ['code', 'build it', 'fix the demo', 'write it up', 'ship it', 'work on the laptop', 'write the description'],
      costs: [{ resourceId: 'energy', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'code', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pitch_the_room',
      name: 'Pitch It',
      tags: ['social'],
      description: 'Make a person, a judge or a room full of investors want what you built, in four minutes or less.',
      affordances: ['pitch', 'sell it', 'convince', 'present', 'make the case', 'win them over', 'demo it'],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'pitch', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pull_records',
      name: 'Pull the Records',
      tags: ['sight'],
      description: 'Read the contract properly, or dig through filings, registries and old news for where his story does not add up.',
      affordances: ['read the contract', 'look him up', 'search', 'dig', 'check the records', 'research', 'read the filings', 'read clause fourteen'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'suspicion', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'digging', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_your_way_in',
      name: 'Talk Your Way In',
      tags: ['social'],
      description: 'Get past a receptionist, onto a guest list or through a door that was not expecting you.',
      affordances: ['bluff', 'talk my way in', 'get past', 'lie', 'sneak in', 'pretend to be', 'get on the list'],
      costs: [{ resourceId: 'energy', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'bluffing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_there_first',
      name: 'Get There First',
      tags: ['movement'],
      description: 'Cross the wet city faster than somebody with a car and a driver, and be in the room before he is.',
      affordances: ['run', 'get there first', 'hurry', 'race him', 'take the tram', 'beat him there'],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'legwork', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_to_his_face',
      name: 'Say It to His Face',
      tags: ['social'],
      description: 'Tell Victor what you know he did, or will do, and hold your nerve while he decides what you are.',
      affordances: ['confront him', 'tell him i know', 'accuse him', 'threaten him', 'say it to his face', 'tell victor what he did'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'suspicion', amount: 30 },
        { resourceId: 'ripples', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'poker', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'show_up',
      name: 'Show Up',
      tags: ['social'],
      description: 'Be there for somebody, on time and all the way, the way you were not last time.',
      affordances: ['be there', 'stay', 'sit with her', 'call sol', 'go home', 'listen', 'apologise', 'keep my promise'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'set_the_trap',
      name: 'Set the Trap',
      tags: ['social'],
      description: 'Feed Victor a future that will not happen and let him act on it in front of the people who matter.',
      affordances: ['set a trap', 'feed him a lie', 'bait him', 'let him walk into it', 'tell him something false', 'set him up'],
      costs: [
        { resourceId: 'energy', amount: 10 },
        { resourceId: 'suspicion', amount: 12 },
        { resourceId: 'ripples', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'poker', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:how_he_does_it'],
        lockedCopy:
          'You know what he did to you. You do not yet know how he does it, and you cannot bait a man whose next step you have only ever seen from the floor.',
      },
    },
    {
      id: 'follow_the_memo',
      name: 'Follow the Memo',
      tags: ['sight'],
      description: 'Play the fourteen seconds you have not recorded yet, and follow what your own voice is telling you.',
      affordances: ['play the memo', 'listen to it', 'follow the memo', 'find out who else', 'play it again'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'ripples', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'hindsight', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_memo'],
        lockedCopy:
          'There is nothing to follow. There is a phone with a cracked corner and four hundred in the bank, and that is not the same as a clue.',
      },
    },
  ],
  locations: [
    {
      id: 'blue_hour',
      name: 'Blue Hour Café',
      shortName: 'The Café',
      description:
        'A narrow café on Canal Street with fogged windows, mismatched chairs and a counter where the startup crowd orders oat flat whites and talks too loudly about money. Rain on the glass. The table by the window is where you signed last time, and the corner table has a clear view of it.',
      artDirection:
        'Narrow cosy city café on a rainy morning, fogged front windows with rain streaks, mismatched wooden chairs, a long counter with a coffee machine, a small window table with two cups and papers, warm amber lamps against cold blue daylight.',
      connections: [{ to: 'canal_street', travelMinutes: 2, label: 'Out onto Canal Street' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'the_contract', qty: 1, ownerId: 'victor', aka: ['contract', 'the agreement', 'the papers', 'clause fourteen'] },
      ],
    },
    {
      id: 'canal_street',
      name: 'Canal Street',
      shortName: 'Canal St',
      description:
        'The old warehouse district along the canal, where the city’s startups rent floors in former mills: a tram stop, three cafés, the Lucky Bowl noodle shop with its steamed-up window, and a lot of people in good trainers pitching each other on the pavement. Everybody here knows everybody’s business by morning.',
      artDirection:
        'Wet brick warehouse street beside a canal at dusk, converted mills with lit windows, a tram stop, café awnings, a noodle shop with fogged glass and red lanterns, people with laptops under umbrellas. Busy, modern, rain-shiny.',
      connections: [
        { to: 'blue_hour', travelMinutes: 2, label: 'Back into the Blue Hour' },
        { to: 'your_flat', travelMinutes: 6, label: 'Home, above the launderette' },
        { to: 'osei_office', travelMinutes: 1, label: 'Up the stairs beside the noodle shop' },
        { to: 'founders_hall', travelMinutes: 5, label: 'The old tram depot' },
        { to: 'lowtide', travelMinutes: 9, label: 'Down the river path to the boathouse' },
        { to: 'cold_case_annex', travelMinutes: 14, label: 'The tram to police headquarters' },
        { to: 'vos_tower', travelMinutes: 7, label: 'The glass tower at the end of the street' },
        { to: 'victor_loft', travelMinutes: 8, label: 'The old mill with the top floor lit' },
        { to: 'seventh_floor', travelMinutes: 4, label: 'The Halcott Building, seventh floor' },
        { to: 'art_college', travelMinutes: 12, label: 'Across the bridge to the art college' },
        { to: 'st_brigids', travelMinutes: 15, label: 'The tram to St. Brigid’s' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'your_flat',
      name: 'Your Flat',
      shortName: 'Home',
      description:
        'One room and a kitchenette above a launderette, warm from the dryers downstairs. A desk with a second-hand server humming under it, a sofa your sister sleeps on more nights than not, and a fridge covered in her drawings. In the first life you lost this flat in year three and never thought about it again.',
      artDirection:
        'Small cluttered one-room city flat at night, a desk with a laptop and a humming tower server underneath, a worn sofa with a blanket and a sketchbook, a fridge covered in drawings, rain on a single window, warm lamp light.',
      connections: [{ to: 'canal_street', travelMinutes: 6, label: 'Down the stairs and out' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'withdrawal_form', qty: 1, ownerId: 'sol', aka: ['form', 'the form', 'her form', 'withdrawal form'] },
        { itemId: 'napkin_sketch', qty: 1, ownerId: 'sol', aka: ['napkin', 'the sketch', 'the logo', 'her drawing'] },
      ],
    },
    {
      id: 'osei_office',
      name: 'Osei’s Office',
      shortName: 'Osei’s',
      description:
        'Two rooms above the Lucky Bowl noodle shop: filing cabinets to the ceiling, a brass desk timer, a fern that has outlived two partners, and Wendell Osei, who bills by the quarter hour and has never once filed anything late.',
      artDirection:
        'Old-fashioned cramped legal office above a shop, filing cabinets to the ceiling, a heavy wooden desk with a brass hourglass timer and neat stacks of paper, a large fern, rain on the window, steam rising from the street below.',
      connections: [{ to: 'canal_street', travelMinutes: 1, label: 'Down to the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'correction_filing', qty: 1, ownerId: 'osei', aka: ['correction', 'the correction', 'inventor correction', 'owen’s patent papers'] },
      ],
    },
    {
      id: 'founders_hall',
      name: 'Founders’ Hall',
      shortName: 'The Hall',
      description:
        'A converted tram depot that is now the city’s startup accelerator: long tables, a coffee machine nobody can work, and a stage at one end with a big screen. On Friday night it is Demo Night, and every investor in Westharbor sits in the first four rows.',
      artDirection:
        'Huge converted industrial tram depot with iron roof beams, rows of chairs facing a small stage with a large blank screen, string lights, laptops on long tables, a crowd in smart casual clothes. Bright, loud, ambitious.',
      connections: [{ to: 'canal_street', travelMinutes: 5, label: 'Back onto Canal Street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [{ itemId: 'demo_pass', qty: 1, ownerId: null, aka: ['pass', 'lanyard', 'badge', 'presenter pass'] }],
    },
    {
      id: 'lowtide',
      name: 'Lowtide Boathouse',
      shortName: 'Boathouse',
      description:
        'A converted boathouse on the river where Naomi Ito’s whole fund fits in one room: one desk, one whiteboard covered in other people’s numbers, a kettle, and a wooden rowing boat she has been repairing for two years. The floor moves when a barge goes past.',
      artDirection:
        'Converted wooden boathouse on a grey river, big doors open to the water, a single desk and a whiteboard full of numbers, a half-varnished rowing boat on trestles, a kettle, soft rain on the water outside.',
      connections: [{ to: 'canal_street', travelMinutes: 9, label: 'Back up the river path' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'naomi_folder', qty: 1, ownerId: 'naomi', aka: ['folder', 'her folder', 'term sheet', 'leather folder'] },
      ],
    },
    {
      id: 'cold_case_annex',
      name: 'The Cold Case Annex',
      shortName: 'The Annex',
      description:
        'The basement of Westharbor Police headquarters: a corridor of banker’s boxes, one window at pavement level and three desks, two of them empty. Detective Celia Ruiz’s desk has a box on it labelled MERCER that she is not supposed to still have out.',
      artDirection:
        'Dim police headquarters basement office, metal shelving full of cardboard archive boxes, one high window at street level showing feet passing in rain, a single lit desk with an open box and a notebook, fluorescent light.',
      connections: [{ to: 'canal_street', travelMinutes: 14, label: 'The tram back to Canal Street' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'mercer_box', qty: 1, ownerId: 'ruiz', aka: ['box', 'the mercer box', 'the case box', 'evidence box'] },
      ],
    },
    {
      id: 'vos_tower',
      name: 'Vos Calder Tower',
      shortName: 'The Tower',
      description:
        'Forty floors of glass at the end of Canal Street, with Vos Calder Ventures at the top: a reception desk of white stone, a view of the whole river, and a waiting room where founders sit for an hour to get ninety seconds.',
      artDirection:
        'Sleek top-floor venture capital office in a glass skyscraper, white stone reception desk, floor-to-ceiling windows over a rainy river city, minimalist leather chairs, cold expensive light.',
      connections: [{ to: 'canal_street', travelMinutes: 7, label: 'Forty floors down' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
    },
    {
      id: 'victor_loft',
      name: 'Victor’s Loft',
      shortName: 'The Loft',
      description:
        'The top floor of an old mill, all brick and glass, with a long kitchen nobody cooks in and a wall of empty frames waiting for magazine covers he has not been on yet. Victor lives and works here. The rent is two months behind, which nobody would ever guess.',
      artDirection:
        'Stylish industrial loft apartment at night, exposed brick and tall steel-framed windows over city lights, a long pristine kitchen island, a wall of empty picture frames, low designer lamps. Expensive-looking and slightly hollow.',
      connections: [{ to: 'canal_street', travelMinutes: 8, label: 'Down the mill stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
    },
    {
      id: 'seventh_floor',
      name: 'The Seventh Floor',
      shortName: 'Seventh Floor',
      description:
        'The seventh floor of the Halcott Building, empty and to let: bare concrete, dust sheets, rain on tall windows. Seven years from now Parley’s first server room will be in the far corner, and the floor there is where you lay. Today it is only a corner.',
      artDirection:
        'Empty unfinished office floor at night, bare concrete, dust sheets over a few shapes, tall rain-streaked windows with city lights beyond, one empty corner in shadow. Quiet and still, not frightening.',
      connections: [{ to: 'canal_street', travelMinutes: 4, label: 'Down the stairwell' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'art_college',
      name: 'Westharbor College of Art',
      shortName: 'Art College',
      description:
        'A big old building full of studios that smell of turpentine and toast. Sol’s final-year space is a partitioned corner on the third floor with her name on masking tape and forty drawings pinned up, none of them finished.',
      artDirection:
        'Busy university art studio with tall arched windows, partitioned workspaces, drawings pinned to boards, paint-spattered tables, an easel with an unfinished canvas, afternoon light.',
      connections: [{ to: 'canal_street', travelMinutes: 12, label: 'Back across the bridge' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
    },
    {
      id: 'st_brigids',
      name: 'St. Brigid’s Hospital',
      shortName: 'St. Brigid’s',
      description:
        'The cardiology walk-in on the ground floor of St. Brigid’s: plastic chairs, a ticket machine, a vending machine that only takes exact change, and a nurse who calls names like she means it. Sol booked you in here for Thursday at four.',
      artDirection:
        'Clean hospital outpatient waiting area, rows of plastic chairs, a ticket dispenser, a vending machine, a reception window, soft late-afternoon light through blinds. Ordinary and calm.',
      connections: [{ to: 'canal_street', travelMinutes: 15, label: 'The tram back' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
    },
  ],
  /**
   * Array order is deliberate. PUBLIC_VIOLENCE takes the first faction, and a
   * scene in a café on Canal Street is heard first by the people who drink in
   * every café on Canal Street.
   */
  factions: [
    {
      id: 'faction_scene',
      name: 'The Canal Street Scene',
      description:
        'Every founder, angel, engineer and gossip in Westharbor’s startup district. They drink at the same three cafés and know everybody’s business by morning, and what they say about you decides who takes your calls.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Nobody yet' },
        { atReputation: 30, label: 'A name' },
        { atReputation: 60, label: 'The one to watch' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_vos_calder',
      name: 'Vos Calder Ventures',
      description:
        'The biggest money in Westharbor, run by Arden Vos. It writes the cheques that make companies famous, and it quietly buys out the ones that make trouble.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Unknown' },
        { atReputation: 30, label: 'Worth a meeting' },
        { atReputation: 60, label: 'In the portfolio' },
      ],
      allies: [],
      enemies: ['faction_lowtide'],
    },
    {
      id: 'faction_lowtide',
      name: 'Lowtide Capital',
      description:
        'Naomi Ito’s one-woman seed fund in a boathouse. Small cheques, fair terms, and no patience at all for charm.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A stranger' },
        { atReputation: 20, label: 'Worth backing' },
        { atReputation: 45, label: 'Her founder' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_police',
      name: 'Westharbor Police',
      description:
        'The city police. Most of it closed the Mercer file three years ago and would like it to stay closed. One detective in the basement did not.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A civilian' },
        { atReputation: 15, label: 'A witness' },
        { atReputation: 35, label: 'On the record' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'victor',
      name: 'Victor Lane',
      calledName: 'Victor',
      role: 'The co-founder who stole your company and let you die, on the morning you first met him',
      cardBlurb:
        'He is warm, quick and generous with credit in public, and seven years from now he will close a door on you. This morning he only wants your signature, and he has no idea that you remember.',
      pronouns: 'he/him',
      publicTraits: ['Remembers everybody’s coffee order', 'Gives credit away in public', 'Never raises his voice'],
      hiddenDrives: [
        'He grew up counting coins for the electric meter and decided at nineteen that he would never again be the one who needed something',
        'He genuinely loves the product and believes the person who built it is the least important part of it',
      ],
      values: ['Winning cleanly enough that nobody can prove otherwise', 'Loyalty, from other people'],
      fears: ['Being ordinary', 'Being found out by somebody he underestimated'],
      socialStyle:
        'Leans in, uses your name, finishes your sentences correctly. Makes every room feel like it was waiting for you, and is already thinking about the next room.',
      boundaries: [
        'Will not raise his voice or lose his temper in public, ever',
        'Will not hurt anybody with his own hands. He waits for them to fall',
        'Will not sign anything he has not read twice',
      ],
      goals: [
        'Get the player’s signature and the code by Monday night',
        'Walk into Demo Night on Friday with Parley as his',
      ],
      secrets: [
        {
          id: 'victor_owen',
          fact: 'At Owen Mercer’s launch party he heard Owen on the floor of the locked office. He took Owen’s phone from the desk, walked back to the party and made a toast. He has told himself every day since that he did nothing, which is true.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Never confessed. It leaks only as a slip, a detail about that office nobody outside it could know, if the player gets him alone and talking about loyalty.',
        },
        {
          id: 'victor_broke',
          fact: 'He has eleven thousand dollars left and a loft he cannot pay for past next month. The confidence is entirely real; the money is not.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Visible to anybody who pulls his company filings, or who watches him pay for coffee with a card that is declined once.',
        },
        {
          id: 'victor_vos',
          fact: 'He already has a meeting with Arden Vos on Friday and has told Vos he owns the technology outright.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it himself, proudly, if the player signs and he relaxes. Otherwise Vos lets it drop.',
        },
      ],
      speechStyle:
        'Warm, fast, first-person plural. "Here’s the thing" before anything that matters. Says your name more than he needs to. Compliments precisely, so they land. Never a threat; always an offer.',
      topics: ['the contract', 'clause fourteen', 'Parley', 'Demo Night', 'Arden Vos', 'Owen Mercer', 'his first company'],
      voiceSamples: [
        'Here’s the thing. Ideas are cheap. Builders are cheap. What’s expensive is somebody who walks into a room and makes it real. That’s me.',
        'Call me Victor. Everybody who’s going to be rich calls me Victor.',
        'Clause fourteen? Boilerplate. We’ll cross it out together if it helps you sleep, partner.',
        'Owen? Owen was brilliant. Owen was also careless, and careless people get unlucky. I sent flowers.',
      ],
      appearance:
        'An adult man with neat dark hair pushed back, warm brown eyes and an easy practised smile, in a charcoal-grey wool coat over a white open-collared shirt, a slim silver watch on his left wrist.',
      visualHook: 'A small pale scar through his left eyebrow that he jokes about before anybody can ask.',
      silhouette: 'Leaning forward across a table, one hand already held out, coat still on.',
      artSeed: 'sye-victor-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'amused', 'calculating', 'cold', 'rattled'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'victor_loft', activity: 'at home, up before anybody, answering email in the dark' },
        { startMinute: 420, endMinute: 600, locationId: 'victor_loft', activity: 'a run, then calls, then more calls' },
        { startMinute: 600, endMinute: 720, locationId: 'blue_hour', activity: 'at the window table with a contract and a second coffee' },
        { startMinute: 720, endMinute: 1080, locationId: 'canal_street', activity: 'working the street: lunches, introductions, a hand on every shoulder' },
        { startMinute: 1080, endMinute: 1260, locationId: 'founders_hall', activity: 'making friends with whoever is about to be important' },
        { startMinute: 1260, endMinute: 1440, locationId: 'victor_loft', activity: 'at home with the lights low, on the phone to Arden Vos' },
      ],
      homeLocationId: 'victor_loft',
      knowledgeScope: ['victor', 'the_contract', 'clause_fourteen', 'parley_demo', 'owen_mercer', 'vos_calder', 'canal_street'],
      startingRelationship: { trust: 40, affection: 35, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'victor_confides',
          label: 'He tells you about Owen Mercer, his way',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['signed_with_victor'] },
        },
        {
          id: 'victor_rattled',
          label: 'He stops smiling',
          kind: 'OTHER',
          requires: { rivalry: 40, flagsSet: ['victor_warned'] },
        },
      ],
      attributes: { might: 11, agility: 12, mind: 15, presence: 17, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'naomi',
      name: 'Naomi Ito',
      calledName: 'Naomi',
      role: 'Seed investor at Lowtide Capital, and the meeting you skipped last time',
      cardBlurb:
        'She backs boring things that work and has no patience for charm. Last time you stood her up for Victor; this time she is at the counter at half past eleven, and she will want to know why you look at her like you owe her something.',
      pronouns: 'she/her',
      publicTraits: ['Asks the second question nobody else thinks of', 'Allergic to flattery', 'Repairs a rowing boat very slowly'],
      hiddenDrives: [
        'She left engineering because a manager took credit for her work, and she has never once said so out loud',
        'She wants to be right about one person this year and to be there when it matters',
      ],
      values: ['Numbers that add up', 'Being told the truth early'],
      fears: ['Being the investor who saw it coming and said nothing, twice', 'Charm, and how well it works on her'],
      socialStyle:
        'Asks a short question, waits, asks a shorter one. Takes her glasses off when she starts to take somebody seriously, and puts them back on when they disappoint her.',
      boundaries: [
        'Will not invest in anybody who flatters her',
        'Will not be anybody’s second choice, and says so the moment she suspects it',
      ],
      goals: [
        'Find one company this year worth the whole fund',
        'Find out why the player booked her and then turned up with Victor',
      ],
      secrets: [
        {
          id: 'naomi_owen',
          fact: 'Four years ago Owen Mercer pitched her alone and told her, off the record, that he was afraid of his co-founder. She passed and never told anybody. She thinks about it every time Victor’s name comes up.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells it only after the player has told her something true and checkable that they had no business knowing.',
        },
        {
          id: 'naomi_term_sheet',
          fact: 'She wrote the player a term sheet two weeks before the meeting, with fair numbers and a blank for the company name. It is in her folder.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She slides it across the desk at the boathouse if the player shows her the engine running instead of pitching it.',
        },
      ],
      speechStyle:
        'Clipped and interrogative. Numbers instead of adjectives. "Show me." Dry humour delivered without a smile, and one sentence a conversation that is unexpectedly personal.',
      topics: ['Lowtide Capital', 'the term sheet', 'Victor Lane', 'Owen Mercer', 'the rowing boat', 'why you stood her up'],
      voiceSamples: [
        'Show me. Not slides. The engine, running, on that cracked laptop.',
        'You booked me two weeks ago and walked in smelling of his coffee. Explain.',
        'Osei’s fee is a loan. Forty percent of your company is a conversation we are not having.',
        'I passed on him once. I would like to know whether I was right, preferably in writing.',
        'Stop looking at me like you already know how this ends. It’s rude, and I find it slightly interesting.',
      ],
      appearance:
        'An adult woman with a sharp black bob, dark eyes and rimless glasses, in a navy raincoat over a grey roll-neck, a battered leather folder under one arm.',
      visualHook: 'Rimless glasses she takes off, deliberately, when she decides to look at you properly.',
      silhouette: 'Very upright on a café stool, folder flat on the counter, one hand round a black coffee.',
      artSeed: 'sye-naomi-01',
      portrait: null,
      expressions: ['neutral', 'sceptical', 'dry', 'warm', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'lowtide', activity: 'at home on the narrowboat moored behind the boathouse' },
        { startMinute: 450, endMinute: 690, locationId: 'lowtide', activity: 'at her desk with other people’s numbers' },
        { startMinute: 690, endMinute: 760, locationId: 'blue_hour', activity: 'at the counter with a black coffee and her folder, checking the time' },
        { startMinute: 760, endMinute: 1080, locationId: 'lowtide', activity: 'varnishing the rowing boat between pitch decks' },
        { startMinute: 1080, endMinute: 1260, locationId: 'founders_hall', activity: 'at the back of Founders’ Hall with her arms folded' },
        { startMinute: 1260, endMinute: 1440, locationId: 'lowtide', activity: 'on the narrowboat with the lamp on, reading' },
      ],
      homeLocationId: 'lowtide',
      knowledgeScope: ['naomi', 'lowtide', 'owen_mercer', 'canal_street', 'vos_calder', 'investing'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'naomi_shows_her_numbers',
          label: 'She shows you the term sheet',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['met_naomi'] },
        },
        {
          id: 'naomi_tells_about_owen',
          label: 'She tells you what Owen Mercer said to her',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:owen_mercer'] },
        },
        {
          id: 'naomi_romance',
          label: 'She stops pretending it is only about the company',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65, flagsSet: ['naomi_interested'] },
        },
      ],
      attributes: { might: 10, agility: 11, mind: 17, presence: 13, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sol',
      name: 'Sol',
      calledName: 'Sol',
      role: 'Your younger sister, in her final year at art college, asleep on your sofa',
      cardBlurb:
        'She drew your logo on a napkin, she is quietly about to quit college to pay your rent, and in the life you remember she voted you out of your own company. Today she still thinks you are the smartest person she knows.',
      pronouns: 'she/her',
      publicTraits: ['Draws on everything, including you', 'Funny under pressure', 'Terrible at taking help'],
      hiddenDrives: [
        'She has held the family together since their father died and is very tired of being the one who is fine',
      ],
      values: ['Being told things', 'Making things by hand'],
      fears: ['Being the reason her sibling fails', 'Hospitals, since their father'],
      socialStyle:
        'Talks fast, deflects with a joke, and then says one plain true sentence while looking at something else, as if it slipped out.',
      boundaries: [
        'Will not be protected from things. Keep her out of something for her own good and she will find out and never quite forgive it',
        'Will not take money from you that you do not have',
      ],
      goals: ['Get the player to the clinic on Thursday at four', 'Pay the rent without the player noticing'],
      secrets: [
        {
          id: 'sol_form',
          fact: 'She has filled in a form to leave art college on Friday and work full time at the Lucky Bowl noodle shop to cover the rent. It is folded into the back of her sketchbook.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells the player herself only if they have shown up for her once this week without being asked. Otherwise the form is in the sketchbook on the sofa.',
        },
        {
          id: 'sol_heart',
          fact: 'She has the family heart-rhythm condition that killed their father at forty-one. It is treated and she is fine. She is certain the player has it too, which is why she keeps booking the test.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it straight out, angrily, the second time the player tries to skip the appointment.',
        },
      ],
      speechStyle:
        'Opens with "Okay, so". Rambling, warm, sarcastic, full of tangents and food. Then one short plain sentence that is the actual point, and she changes the subject before you can answer it.',
      topics: ['the napkin logo', 'art college', 'the clinic', 'Dad', 'the rent', 'noodles', 'what is wrong with you this week'],
      voiceSamples: [
        'Okay, so, you’re doing the face. The something-happened face. Did you fall in love? Blink twice.',
        'I drew it on a napkin. If that napkin makes you a millionaire, I want royalties. Noodle royalties.',
        'Thursday, four o’clock, St. Brigid’s. Cancel again and I will go to Dad’s grave and tell on you. Loudly.',
        'I’m fine. I’m always fine. That’s basically my whole job in this family.',
      ],
      appearance:
        'An adult woman with shaggy bleached hair, paint on her knuckles and a too-big denim jacket covered in hand-drawn patches, headphones round her neck.',
      visualHook: 'Paint on her knuckles in whatever colour she worked in today.',
      silhouette: 'Curled sideways on a sofa with a sketchbook on her knees and a pencil in her teeth.',
      artSeed: 'sye-sol-01',
      portrait: null,
      expressions: ['warm', 'teasing', 'worried', 'annoyed', 'laughing'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'your_flat', activity: 'on your sofa under a coat, not awake' },
        { startMinute: 540, endMinute: 960, locationId: 'art_college', activity: 'in her studio corner, drawing and not finishing' },
        { startMinute: 960, endMinute: 1260, locationId: 'canal_street', activity: 'a shift at the Lucky Bowl under Osei’s office' },
        { startMinute: 1260, endMinute: 1440, locationId: 'your_flat', activity: 'on your sofa with a sketchbook and cold noodles' },
      ],
      homeLocationId: 'your_flat',
      knowledgeScope: ['sol', 'your_flat', 'art_college', 'the_family', 'the_heart_condition', 'canal_street'],
      startingRelationship: { trust: 60, affection: 75, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sol_tells_you',
          label: 'She tells you about the form herself',
          kind: 'TRUST',
          requires: { trust: 65 },
        },
        {
          id: 'sol_believes_you',
          label: 'She believes the impossible thing you told her',
          kind: 'TRUST',
          requires: { trust: 70, flagsSet: ['sol_on_the_table'] },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 13, presence: 14, resolve: 12, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ruiz',
      name: 'Detective Celia Ruiz',
      calledName: 'Ruiz',
      role: 'Cold-case detective who never believed Victor’s first partner died by accident',
      cardBlurb:
        'She has watched Victor for three years in her own time, and this morning she watched you shake his hand. She is the only person in the city who might believe you, if you can tell her about a crime that has not happened yet.',
      pronouns: 'she/her',
      publicTraits: ['Writes everything down', 'Always carries two coffees', 'Unbothered by being disbelieved'],
      hiddenDrives: ['She is no longer sure whether she is after the truth or after being right, and it frightens her more than Victor does'],
      values: ['Writing it down', 'Owen Mercer’s mother getting an answer'],
      fears: ['Being right too late, again', 'Being the crank in the basement for the rest of her career'],
      socialStyle:
        'Hands you a coffee before she asks anything. Asks yes-or-no questions, writes the answer down, and lets the silence after it do the rest.',
      boundaries: [
        'Will not act on anything she cannot put in a report',
        'Will not let a civilian do her job for her, and will arrest one who tries',
      ],
      goals: ['Reopen the Mercer file', 'Find out what Victor wants with the player'],
      secrets: [
        {
          id: 'ruiz_the_box',
          fact: 'She still has the Mercer box out in the basement, which she was ordered to return to the archive two years ago.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets the player see it if they tell her something about Victor that only a person in that office could know.',
        },
        {
          id: 'ruiz_the_notebook',
          fact: 'She keeps a notebook of every founder Victor has had coffee with in three years. The player is the ninth name. Two of the other eight no longer work in the city.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows the page if the player asks what happened to the people before them, instead of asking about Victor.',
        },
      ],
      speechStyle:
        'Flat, procedural, unhurried. "For the record." Yes-or-no questions. Times to the minute. No adjectives she could not defend in court.',
      topics: ['Owen Mercer', 'the Mercer box', 'Victor Lane', 'the cold-case desk', 'her notebook'],
      voiceSamples: [
        'For the record: you had coffee with Victor Lane at ten forty on Monday. Did you sign anything? Yes or no.',
        'Owen Mercer kept an inhaler in every jacket he owned. They found none. I’d like somebody to explain that to me who isn’t paid to.',
        'I don’t do hunches. I do boxes. This one has been open three years.',
        'You can’t report a crime that hasn’t happened. You can tell me a story, and I’ll write it down, and we’ll see.',
      ],
      appearance:
        'An adult woman with greying hair tied back hard, a rain-darkened brown suit and flat shoes, a reporter’s notebook in her jacket pocket.',
      visualHook: 'Two paper coffee cups, always, one of them for whoever she is about to question.',
      silhouette: 'Square-shouldered in a doorway, a cup in each hand, not coming in until asked.',
      artSeed: 'sye-ruiz-01',
      portrait: null,
      expressions: ['neutral', 'watchful', 'tired', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'canal_street', activity: 'at home in a flat two streets back from the canal' },
        { startMinute: 420, endMinute: 600, locationId: 'cold_case_annex', activity: 'at the cold-case desk with two boxes open' },
        { startMinute: 600, endMinute: 760, locationId: 'blue_hour', activity: 'at the corner table with a newspaper she is not reading, watching the window' },
        { startMinute: 760, endMinute: 1140, locationId: 'cold_case_annex', activity: 'in the basement, ringing people who stopped returning her calls' },
        { startMinute: 1140, endMinute: 1440, locationId: 'canal_street', activity: 'walking home past Victor’s building, the long way, every night' },
      ],
      homeLocationId: 'cold_case_annex',
      knowledgeScope: ['owen_mercer', 'victor', 'the_mercer_box', 'westharbor_police', 'canal_street'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ruiz_opens_the_box',
          label: 'She shows you the Mercer box',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['knows:owen_mercer'] },
        },
        {
          id: 'ruiz_goes_on_record',
          label: 'She takes what you know upstairs',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 45, flagsSet: ['knows:how_he_does_it'] },
        },
      ],
      attributes: { might: 12, agility: 10, mind: 15, presence: 11, resolve: 17, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'osei',
      name: 'Wendell Osei',
      calledName: 'Osei',
      role: 'Patent attorney above the noodle shop, and the fastest on Canal Street',
      cardBlurb:
        'He files faster than anybody in Westharbor, bills by the quarter hour, and is booked by Victor for Wednesday at nine. Whoever signs his engagement letter first owns your work, and he has a reason of his own to hope it is you.',
      pronouns: 'he/him',
      publicTraits: ['Exact about time and money', 'Unfailingly courteous', 'Has never filed anything late'],
      hiddenDrives: ['He wants one chance to put right the correction he filed for Victor three years ago, before he retires and it becomes permanent'],
      values: ['Precision', 'Being on time, which is a form of respect'],
      fears: ['That his signature helped bury something', 'Retirement, and the quiet after it'],
      socialStyle:
        'Turns the brass timer over the moment you sit down. Listens without interrupting, then asks the one question that shows he understood all of it.',
      boundaries: [
        'Will not represent two inventors of the same invention',
        'Will not backdate anything, for anybody, at any fee',
      ],
      goals: ['File cleanly and on time', 'Find out whether the player is the person the demo says they are'],
      secrets: [
        {
          id: 'osei_correction',
          fact: 'He filed the correction that made Victor sole inventor on Owen Mercer’s patent, eleven days after Owen died. He wrote "Asked twice. Client insisted." in the margin and has never forgiven himself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He takes the file out of the cabinet himself if the player signs with him before Victor does and asks him why he looked relieved.',
        },
      ],
      speechStyle:
        'Formal and exact. "Strictly speaking." Sums and times stated in full. Dry jokes so quiet you notice them a sentence later. Never uses a contraction when the long form will do.',
      topics: ['the patent', 'the engagement letter', 'the fee', 'the correction', 'his fern', 'Wednesday at nine'],
      voiceSamples: [
        'Sit. The timer is running. That is a quarter of an hour, and you have spent half a minute of it admiring my fern.',
        'Strictly speaking, I cannot represent two inventors of the same invention. Whoever signs my engagement letter first is my client. The other is a stranger.',
        'Twelve hundred, a description I can understand, and your signature. In that order, please.',
        'I filed a correction for Mr. Lane once. I wrote two words in the margin. I would rather not write them again.',
      ],
      appearance:
        'An older man, tall and very thin, with close-cropped white hair, a three-piece suit in brown tweed and half-moon reading glasses on a chain.',
      visualHook: 'A brass desk hourglass he turns over at the start of every conversation.',
      silhouette: 'Very tall behind a heavy desk, fingertips together, the hourglass running between his hands.',
      artSeed: 'sye-osei-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'dry', 'troubled'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'osei_office', activity: 'in the flat behind the office, up before the alarm' },
        { startMinute: 540, endMinute: 1320, locationId: 'osei_office', activity: 'at his desk, the timer turning' },
        { startMinute: 1320, endMinute: 1440, locationId: 'canal_street', activity: 'eating noodles downstairs and reading a filing' },
      ],
      homeLocationId: 'osei_office',
      knowledgeScope: ['patents', 'the_correction', 'owen_mercer', 'victor', 'canal_street'],
      startingRelationship: { trust: 10, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'osei_takes_the_case',
          label: 'He takes you on as his client',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'osei_shows_the_correction',
          label: 'He takes the Mercer file out of the cabinet',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['osei_retained'] },
        },
      ],
      attributes: { might: 7, agility: 8, mind: 17, presence: 12, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'vos',
      name: 'Arden Vos',
      calledName: 'Vos',
      role: 'Managing partner of Vos Calder Ventures, the biggest money in the city',
      cardBlurb:
        'His money made Victor famous in the life you remember. On Friday night he will be in the front row at Demo Night deciding which of you two actually built it, and he does not much care which answer is true.',
      pronouns: 'he/him',
      publicTraits: ['Speaks in valuations', 'Never looks at his own phone', 'Gives people ninety seconds'],
      hiddenDrives: ['He has been told for twenty years that he is the man who makes companies, and he needs it to stay true more than he needs any one of them'],
      values: ['Returns', 'Founders who are hungry'],
      fears: ['Missing the big one', 'A scandal he cannot buy quiet'],
      socialStyle:
        'Gives you ninety seconds and makes you feel each one. An assistant hands him things. He asks what something is worth and waits to see whether you flinch.',
      boundaries: [
        'Will not wait for anybody',
        'Will not put anything that matters in writing',
      ],
      goals: ['Own a fifth of the next huge company by Friday night', 'Find out which of the two founders actually built it'],
      secrets: [
        {
          id: 'vos_cameras',
          fact: 'At Victor’s request his building security switched the cameras off at Owen Mercer’s launch party, and he did not ask why. He has made sure since that nobody else ever asks either.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the player already knows it was not only Victor, and says so to him in private. He will not deny it. He will put a number on it.',
        },
        {
          id: 'vos_test',
          fact: 'He tests founders by offering to cut their partner out. Anybody who takes it, he funds once and never trusts again.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He makes the offer after Demo Night to whoever impressed him. A player who refuses it is the one he calls back.',
        },
      ],
      speechStyle:
        'Few words. Valuations and deadlines. Questions that sound like offers. Calls people by what they are worth to him, and never raises his voice because nobody has ever made him.',
      topics: ['Demo Night', 'Vos Calder Ventures', 'valuations', 'Victor Lane', 'the cameras'],
      voiceSamples: [
        'Ninety seconds. Tell me what it’s worth to you. I already know what it’s worth to me.',
        'Mr. Lane says he built it. You say you built it. One of you is about to be very rich, and the other is a footnote.',
        'I don’t break partnerships. I notice when one is already broken, and I stand on the profitable side of it.',
        'Everybody in this city owes me a favour or wants one. Which are you?',
      ],
      appearance:
        'An older man, broad and silver-haired, in a navy suit with an open collar and no tie, a heavy gold signet ring on one hand.',
      visualHook: 'A heavy gold signet ring he turns with his thumb while he decides what you are worth.',
      silhouette: 'Seated, unmoving, in the dead centre of a front row.',
      artSeed: 'sye-vos-01',
      portrait: null,
      expressions: ['neutral', 'assessing', 'amused', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'vos_tower', activity: 'in the apartment at the top of the tower' },
        { startMinute: 420, endMinute: 1200, locationId: 'vos_tower', activity: 'forty floors up, giving founders ninety seconds each' },
        { startMinute: 1200, endMinute: 1440, locationId: 'vos_tower', activity: 'dinner in the tower with a deal on the table' },
      ],
      homeLocationId: 'vos_tower',
      knowledgeScope: ['vos_calder', 'victor', 'owen_mercer', 'canal_street', 'investing'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'vos_makes_an_offer',
          label: 'He offers to cut Victor out',
          kind: 'OTHER',
          requires: { respect: 40, flagsSet: ['demo_night_done'] },
        },
        {
          id: 'vos_names_a_price',
          label: 'He puts a number on the cameras',
          kind: 'OTHER',
          requires: { respect: 50, flagsSet: ['knows:it_wasnt_only_him'] },
        },
      ],
      attributes: { might: 10, agility: 8, mind: 16, presence: 16, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_same_table',
      title: 'Same Contract, Same Table',
      summary: 'Victor Lane’s hand is held out across a café table, the contract is under his pen, and last time you signed it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['victor', 'naomi', 'ruiz'],
      involvedLocationIds: ['blue_hour', 'canal_street'],
      knownRewardCopy: 'Whatever you do with the next ten minutes, the week stops running on its old rails.',
      steps: [
        {
          id: 'the_table',
          playerCopy: 'Answer Victor.',
          directorNotes:
            'He expects yes. He has had yes from the player once already, in a life only they remember. Every answer is a real route: signing on purpose is the inside job, refusing is the clean break, confronting him is the loudest and most dangerous move in the story, and reading the contract properly buys a day. Victor reacts to the specific thing, never to the premise. He crosses clause fourteen out on the spot if challenged.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'refused',
              label: 'Refuse, and leave the contract on the table',
              predicate: { flagsSet: ['used:walk_away'] },
              setsFlags: ['refused_victor'],
              closesFlags: ['signed_with_victor'],
            },
            {
              routeId: 'signed_on_purpose',
              label: 'Shake his hand and sign it, exactly like last time',
              predicate: { flagsSet: ['used:play_along'] },
              setsFlags: ['signed_with_victor', 'inside_man'],
              closesFlags: ['refused_victor'],
            },
            {
              routeId: 'confronted',
              label: 'Tell him to his face what he does',
              predicate: { flagsSet: ['used:say_it_to_his_face'] },
              setsFlags: ['refused_victor', 'victor_warned'],
              closesFlags: ['signed_with_victor', 'inside_man'],
            },
            {
              routeId: 'read_it_first',
              label: 'Read the contract properly and ask for a day',
              predicate: { flagsSet: ['used:pull_records'] },
              setsFlags: ['contract_open', 'read_clause_fourteen'],
              closesFlags: [],
            },
            {
              routeId: 'kept_him_talking',
              label: 'Keep him talking and sign nothing yet',
              predicate: { flagsSet: ['spoke:victor'] },
              setsFlags: ['contract_open'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_meeting_over'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_day',
          playerCopy: 'Make the rest of Monday go differently.',
          directorNotes:
            'The player has a whole day they have already lived once. Naomi is at the counter at half past eleven. Sol is at college and then at the noodle shop. The code is on the laptop and nowhere else. Nothing forces itself here: a player who goes home and writes code all afternoon is playing correctly.',
          enterWhen: { flagsSet: ['first_meeting_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_the_meeting',
              label: 'Keep the meeting with Naomi Ito this time',
              predicate: { flagsSet: ['spoke:naomi'] },
              setsFlags: ['met_naomi'],
              closesFlags: [],
            },
            {
              routeId: 'went_home_to_sol',
              label: 'Go and find your sister',
              predicate: { flagsSet: ['used:show_up', 'spoke:sol'] },
              setsFlags: ['home_early'],
              closesFlags: [],
            },
            {
              routeId: 'started_building',
              label: 'Go home and start building',
              predicate: { flagsSet: ['used:ship_it'] },
              setsFlags: ['started_building'],
              closesFlags: [],
            },
            {
              routeId: 'started_digging',
              label: 'Find out who Victor was before he met you',
              predicate: { flagsSet: ['used:pull_records'] },
              setsFlags: ['knows:owen_mercer'],
              closesFlags: [],
            },
            {
              routeId: 'the_day_ran_out',
              label: 'Let Monday run out',
              predicate: { flagsSet: ['first_night_passed'] },
              setsFlags: [],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_day_over'],
            abilities: ['follow_the_memo'],
            reputation: [{ factionId: 'faction_scene', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_seventy_two_hours',
      title: 'Seventy-Two Hours',
      summary: 'On Wednesday at nine Victor files the patent on your engine under his own name, through the fastest attorney on Canal Street. Whoever files first owns it.',
      kind: 'MAIN',
      involvedCharacterIds: ['osei', 'victor', 'naomi'],
      involvedLocationIds: ['osei_office', 'canal_street', 'your_flat'],
      knownRewardCopy: 'Your name on your own work, or his.',
      discoverWhen: { flagsSet: ['first_meeting_over'] },
      steps: [
        {
          id: 'get_an_attorney',
          playerCopy: 'Get Wendell Osei to take you on before Wednesday at nine.',
          directorNotes:
            'Osei represents whoever signs his engagement letter first. He wants twelve hundred and the player has four hundred: Naomi, Sol’s savings or a deal with Osei himself are all ways through, and each one costs something different. If the player is first, Osei turns Victor away, and Victor has to file through a slower firm on Thursday at five.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'osei_takes_you',
              label: 'Sign Osei’s engagement letter yourself',
              predicate: {
                flagsSet: ['spoke:osei'],
                minRelationship: [{ characterId: 'osei', dimension: 'trust', value: 30 }],
                beforeWorldMinute: 2 * 1440 + 9 * 60,
              },
              setsFlags: ['osei_retained'],
              closesFlags: [],
            },
            {
              routeId: 'naomi_pays',
              label: 'Let Naomi Ito pay the fee',
              predicate: {
                flagsSet: ['met_naomi', 'spoke:osei'],
                minRelationship: [{ characterId: 'naomi', dimension: 'trust', value: 45 }],
                beforeWorldMinute: 2 * 1440 + 9 * 60,
              },
              setsFlags: ['osei_retained', 'naomi_paid_the_fee'],
              closesFlags: [],
            },
            {
              routeId: 'beaten_to_it',
              label: 'Victor gets there first',
              predicate: { flagsSet: ['patent_his'] },
              setsFlags: ['lost_the_race'],
              closesFlags: ['osei_retained'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['attorney_settled'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'file_first',
          playerCopy: 'Write the engine down and file it before Victor does.',
          directorNotes:
            'A complete filing needs a technical description only the player can write, and it takes a night of work on the old laptop. The thunderstorm on Thursday afternoon cuts the power on Canal Street from two until five, which matters to anybody still writing then.',
          enterWhen: { flagsSet: ['attorney_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'filed_first',
              label: 'File it with Osei, under your own name',
              predicate: {
                flagsSet: ['osei_retained', 'used:ship_it'],
                beforeWorldMinute: 3 * 1440 + 17 * 60,
              },
              setsFlags: ['patent_yours'],
              closesFlags: ['patent_his'],
            },
            {
              routeId: 'too_late',
              label: 'Find his name on it',
              predicate: { flagsSet: ['patent_his'] },
              setsFlags: ['lost_the_race'],
              closesFlags: ['patent_yours'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['patent_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_scene', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_demo_night',
      title: 'Demo Night',
      summary: 'Friday at seven, Founders’ Hall, every investor in the city in the first four rows. Last time Victor stood on that stage and called your work his.',
      kind: 'MAIN',
      involvedCharacterIds: ['victor', 'vos', 'naomi'],
      involvedLocationIds: ['founders_hall'],
      knownRewardCopy: 'The whole scene, watching, deciding who built it.',
      discoverWhen: { flagsSet: ['first_day_over'] },
      steps: [
        {
          id: 'the_stage',
          playerCopy: 'Decide who stands on the stage on Friday.',
          directorNotes:
            'Four minutes per team, the third team’s demo crashes, and Vos is in the dead centre of the front row. Whoever pitches Parley on that stage owns the story of it in this city, whatever the patent says. A player who stays away entirely has chosen too.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'trap_sprung',
              label: 'Let Victor walk into the trap on stage',
              predicate: { flagsSet: ['used:set_the_trap', 'demo_night_started'], atLocation: 'founders_hall' },
              setsFlags: ['trap_sprung', 'victor_exposed'],
              closesFlags: ['victor_pitched'],
            },
            {
              routeId: 'you_pitched',
              label: 'Pitch it yourself',
              predicate: { flagsSet: ['used:pitch_the_room', 'demo_night_started'], atLocation: 'founders_hall' },
              setsFlags: ['you_pitched'],
              closesFlags: ['victor_pitched'],
            },
            {
              routeId: 'he_pitched',
              label: 'Stand beside him while he pitches it',
              predicate: { flagsSet: ['signed_with_victor', 'demo_night_started'] },
              setsFlags: ['victor_pitched'],
              closesFlags: ['you_pitched'],
            },
            {
              routeId: 'stayed_away',
              label: 'Stay away from Founders’ Hall',
              predicate: { flagsSet: ['demo_night_over'] },
              setsFlags: ['skipped_demo'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['demo_night_done'],
            abilities: [],
            reputation: [
              { factionId: 'faction_scene', amount: 15 },
              { factionId: 'faction_vos_calder', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_owen_mercer',
      title: 'Owen Mercer',
      summary: 'Victor had a co-founder before you. He died alone in a locked office at their launch party, and his phone was never found.',
      kind: 'MAIN',
      involvedCharacterIds: ['ruiz', 'naomi', 'osei', 'victor'],
      involvedLocationIds: ['cold_case_annex', 'osei_office', 'lowtide'],
      knownRewardCopy: 'The shape of what he does, and maybe a way to make it hold in a court.',
      discoverWhen: { flagsSet: ['knows:owen_mercer'] },
      steps: [
        {
          id: 'learn_what_happened',
          playerCopy: 'Find out what happened to Owen Mercer.',
          directorNotes:
            'Four people hold a piece of it and none of them has put the pieces together: Ruiz has the box, Naomi has what Owen told her, Osei has the correction, and Victor has the phone. The player cannot report the crime against themselves, because it has not happened. They can help with the one that did.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ruiz_opens_the_box',
              label: 'Get Ruiz to show you the Mercer box',
              predicate: {
                flagsSet: ['spoke:ruiz'],
                minRelationship: [{ characterId: 'ruiz', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['saw_the_box'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_box',
              label: 'Take the box out of the basement',
              predicate: { hasItems: ['mercer_box'] },
              setsFlags: ['saw_the_box', 'took_the_box'],
              closesFlags: [],
            },
            {
              routeId: 'naomi_says_it',
              label: 'Get Naomi Ito to tell you what Owen said to her',
              predicate: { minRelationship: [{ characterId: 'naomi', dimension: 'trust', value: 55 }] },
              setsFlags: ['naomi_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_correction',
              label: 'Find the correction in Osei’s files',
              predicate: { hasItems: ['correction_filing'] },
              setsFlags: ['found_the_correction'],
              closesFlags: [],
            },
            {
              routeId: 'found_it_yourself',
              label: 'Dig it out of the records yourself',
              predicate: { flagsSet: ['used:pull_records', 'visited:cold_case_annex'] },
              setsFlags: ['found_it_yourself'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:how_he_does_it'],
            abilities: ['set_the_trap'],
            reputation: [],
          },
        },
        {
          id: 'make_it_hold',
          playerCopy: 'Turn what you know into something that holds.',
          directorNotes:
            'Knowing is not proof. Ruiz needs something she can put in a report, Osei needs to decide whether to speak against a former client, and a trap needs Victor to do something in public that only the guilty would do. Any of these is enough, and each one is louder than the last.',
          enterWhen: { flagsSet: ['knows:how_he_does_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'case_reopened',
              label: 'Give Ruiz enough to reopen it',
              predicate: {
                flagsSet: ['knows:how_he_does_it'],
                minRelationship: [{ characterId: 'ruiz', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['case_reopened'],
              closesFlags: [],
            },
            {
              routeId: 'paper_trail',
              label: 'Get Osei to put the correction on the record',
              predicate: {
                hasItems: ['correction_filing'],
                minRelationship: [{ characterId: 'osei', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['paper_trail', 'case_reopened'],
              closesFlags: [],
            },
            {
              routeId: 'caught_in_the_act',
              label: 'Let him show everybody himself',
              predicate: { flagsSet: ['used:set_the_trap'] },
              setsFlags: ['victor_exposed'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['pattern_proven'],
            abilities: [],
            reputation: [{ factionId: 'faction_police', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_open_offer',
      title: 'The Offer on the Table',
      summary: 'You did not sign and you did not say no. Victor is patient, and he has a meeting with Vos Calder on Friday whether you come or not.',
      kind: 'SIDE',
      involvedCharacterIds: ['victor'],
      involvedLocationIds: ['blue_hour', 'victor_loft', 'canal_street'],
      knownRewardCopy: 'An answer, given or let lapse.',
      discoverWhen: { flagsSet: ['contract_open'] },
      steps: [
        {
          id: 'decide',
          playerCopy: 'Sign Victor’s contract, refuse it, or let it run out.',
          directorNotes:
            'Victor checks in warmly and often. He never pressures; he mentions. Every day without an answer raises what he is willing to give, and what he is willing to find out about the player.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_late',
              label: 'Sign it after all',
              predicate: { flagsSet: ['used:play_along'] },
              setsFlags: ['signed_with_victor', 'inside_man'],
              closesFlags: ['refused_victor'],
            },
            {
              routeId: 'refused_late',
              label: 'Tell him no',
              predicate: { flagsSet: ['used:walk_away'] },
              setsFlags: ['refused_victor'],
              closesFlags: ['signed_with_victor'],
            },
            {
              routeId: 'let_it_lapse',
              label: 'Let Friday arrive without an answer',
              predicate: { flagsSet: ['demo_night_started'] },
              setsFlags: ['refused_victor', 'let_it_lapse'],
              closesFlags: ['signed_with_victor'],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: ['offer_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_naomi',
      title: 'The Meeting You Missed',
      summary: 'Naomi Ito waited forty minutes for you last time and wrote you a term sheet she never sent. This time you are here.',
      kind: 'SIDE',
      involvedCharacterIds: ['naomi'],
      involvedLocationIds: ['blue_hour', 'lowtide'],
      knownRewardCopy: 'A different kind of partner, and maybe more than that.',
      discoverWhen: { flagsSet: ['met_naomi'] },
      steps: [
        {
          id: 'earn_a_second_meeting',
          playerCopy: 'Give Naomi a reason to take you seriously.',
          directorNotes:
            'She has no patience for charm and less for pitches. What works is the engine running on the cracked laptop, or the truth told early. She is curious about why the player looks at her as if they already know her, and she will say so.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'showed_her_the_engine',
              label: 'Show her the engine running',
              predicate: { flagsSet: ['used:ship_it', 'spoke:naomi'] },
              setsFlags: ['naomi_saw_it'],
              closesFlags: [],
            },
            {
              routeId: 'pitched_her',
              label: 'Pitch her properly',
              predicate: {
                flagsSet: ['used:pitch_the_room'],
                minRelationship: [{ characterId: 'naomi', dimension: 'respect', value: 35 }],
              },
              setsFlags: ['naomi_saw_it'],
              closesFlags: [],
            },
            {
              routeId: 'told_her_the_future',
              label: 'Tell her something you had no business knowing',
              predicate: {
                flagsSet: ['used:call_the_future'],
                minRelationship: [{ characterId: 'naomi', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['naomi_saw_it', 'naomi_knows_something'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['naomi_interested'],
            abilities: [],
            reputation: [{ factionId: 'faction_lowtide', amount: 10 }],
          },
        },
        {
          id: 'what_she_is_to_you',
          playerCopy: 'Work out what Naomi is to you this time.',
          directorNotes:
            'Investor, partner, or something that neither of them will name before Friday. She will not be anybody’s second choice, so a player still holding Victor’s contract gets her respect and nothing else. Romance goes no further than a kiss.',
          enterWhen: { flagsSet: ['naomi_interested'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_walked',
              label: 'Lose her to Victor’s contract',
              predicate: { flagsSet: ['signed_with_victor', 'demo_night_done'] },
              setsFlags: ['naomi_passed'],
              closesFlags: ['naomi_partner'],
            },
            {
              routeId: 'partners_and_more',
              label: 'Partners, and something else',
              predicate: {
                minRelationship: [
                  { characterId: 'naomi', dimension: 'trust', value: 60 },
                  { characterId: 'naomi', dimension: 'affection', value: 65 },
                ],
              },
              setsFlags: ['naomi_partner', 'naomi_close'],
              closesFlags: ['naomi_passed'],
            },
            {
              routeId: 'partners',
              label: 'Partners, on fair numbers',
              predicate: { minRelationship: [{ characterId: 'naomi', dimension: 'respect', value: 55 }] },
              setsFlags: ['naomi_partner'],
              closesFlags: ['naomi_passed'],
            },
            {
              routeId: 'just_money',
              label: 'Take her cheque and nothing more',
              predicate: { flagsSet: ['patent_settled'] },
              setsFlags: ['naomi_investor'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['naomi_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_lowtide', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_sol',
      title: 'Your Sister’s Sofa',
      summary: 'Sol drew your logo, sleeps on your sofa and is about to give something up for you without saying so. Last time you did not notice until it was done.',
      kind: 'SIDE',
      involvedCharacterIds: ['sol'],
      involvedLocationIds: ['your_flat', 'art_college', 'canal_street'],
      knownRewardCopy: 'Your sister, in this life, on your side.',
      discoverWhen: { flagsSet: ['first_day_over'] },
      steps: [
        {
          id: 'what_she_has_not_said',
          playerCopy: 'Find out what Sol is not telling you.',
          directorNotes:
            'The form is in the back of her sketchbook and it is dated Friday. Being told is the version where she trusts the player. Finding it is the version where they know something they were not given, and she is entitled to be angry about that. Missing it entirely is the first life repeating.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_tells_you',
              label: 'She tells you herself',
              predicate: {
                flagsSet: ['used:show_up'],
                minRelationship: [{ characterId: 'sol', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['knows:sol_leaving_college'],
              closesFlags: ['found_her_form'],
            },
            {
              routeId: 'found_the_form',
              label: 'Find the form in her sketchbook',
              predicate: { hasItems: ['withdrawal_form'] },
              setsFlags: ['knows:sol_leaving_college', 'found_her_form'],
              closesFlags: [],
            },
            {
              routeId: 'too_late',
              label: 'Find out after she has handed it in',
              predicate: { flagsSet: ['sol_left_college'] },
              setsFlags: ['knows:sol_leaving_college'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['sol_on_the_table'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_about_her',
          playerCopy: 'Decide what you do about Sol this time.',
          directorNotes:
            'She will not be protected from things. Keeping her out of the company for her own good is the decision that turned her in the first life, because Victor was the one who let her in. Bringing her in, keeping her in college, or telling her everything are all real; none of them is free.',
          enterWhen: { flagsSet: ['sol_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her_everything',
              label: 'Tell her everything, including how it ended',
              predicate: {
                flagsSet: ['used:call_the_future'],
                minRelationship: [{ characterId: 'sol', dimension: 'trust', value: 70 }],
              },
              setsFlags: ['sol_knows'],
              closesFlags: [],
            },
            {
              routeId: 'brought_her_in',
              label: 'Make her a founder, on paper, on purpose',
              predicate: { minRelationship: [{ characterId: 'sol', dimension: 'affection', value: 70 }] },
              setsFlags: ['sol_in_the_company'],
              closesFlags: ['sol_stays_in_college'],
            },
            {
              routeId: 'kept_her_in_college',
              label: 'Keep her in college and pay the rent yourself',
              predicate: { flagsSet: ['used:show_up'], flagsUnset: ['sol_left_college'] },
              setsFlags: ['sol_stays_in_college'],
              closesFlags: ['sol_in_the_company'],
            },
            {
              routeId: 'let_her_choose',
              label: 'Let her choose, and back the choice',
              predicate: { flagsSet: ['sol_left_college'] },
              setsFlags: ['sol_on_her_own'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['sol_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_thursday_at_four',
      title: 'Thursday at Four',
      summary: 'Sol booked you a heart test at St. Brigid’s for Thursday at four. You cancelled it twice. Last time you never went.',
      kind: 'SIDE',
      involvedCharacterIds: ['sol'],
      involvedLocationIds: ['st_brigids'],
      knownRewardCopy: 'An answer about the thing that killed you, while it can still be treated.',
      discoverWhen: { flagsSet: ['knows:the_heart'] },
      steps: [
        {
          id: 'get_tested',
          playerCopy: 'Go to St. Brigid’s on Thursday.',
          directorNotes:
            'Quiet and practical. A ticket machine, forty minutes in a plastic chair, a nurse, a monitor, a prescription. The condition is real and treatable. Nobody makes a speech. If Sol comes, she holds the ticket and pretends she is not worried.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_with_sol',
              label: 'Go, and take Sol',
              predicate: { flagsSet: ['visited:st_brigids', 'spoke:sol', 'used:show_up'] },
              setsFlags: ['heart_checked', 'sol_came_too'],
              closesFlags: ['heart_ignored'],
            },
            {
              routeId: 'went',
              label: 'Go',
              predicate: { flagsSet: ['visited:st_brigids'] },
              setsFlags: ['heart_checked'],
              closesFlags: ['heart_ignored'],
            },
            {
              routeId: 'skipped',
              label: 'Miss it a third time',
              predicate: { flagsSet: ['clinic_missed'] },
              setsFlags: ['heart_ignored'],
              closesFlags: ['heart_checked'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['heart_question_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_seventh_floor',
      title: 'The Seventh Floor',
      summary: 'The empty floor of the Halcott Building where, seven years from now, you lay on the floor and watched a door close.',
      kind: 'SIDE',
      involvedCharacterIds: [],
      involvedLocationIds: ['seventh_floor'],
      knownRewardCopy: 'Nothing, probably. It is only a corner today.',
      discoverWhen: { flagsSet: ['visited:seventh_floor'] },
      steps: [
        {
          id: 'stand_there',
          playerCopy: 'Stand in the corner where it happens.',
          directorNotes:
            'Bare concrete and rain. Do not make it ghostly. It is an empty floor to let, and the only strange thing in it is the player knowing what it becomes. If they stand there long enough, their phone feels heavier.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_there',
              label: 'Stand in the far corner',
              predicate: { atLocation: 'seventh_floor' },
              setsFlags: ['knows:the_memo', 'stood_where_it_happens'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['seventh_floor_seen'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_fourteen_seconds',
      title: 'Fourteen Seconds',
      summary: 'A voice memo on your phone you have not recorded yet, dated seven years from now.',
      kind: 'LEAD',
      involvedCharacterIds: ['sol', 'vos', 'ruiz'],
      involvedLocationIds: ['seventh_floor', 'your_flat', 'vos_tower'],
      knownRewardCopy: 'Your own voice, telling you something you did not know when you died.',
      discoverWhen: { flagsSet: ['knows:the_memo'] },
      steps: [
        {
          id: 'play_it',
          playerCopy: 'Play the memo.',
          directorNotes:
            'This whole thread is optional and must feel like it. A player who never sets `knows:the_memo` never hears of it. Nobody explains how the memo exists, because nobody can. It is the player’s own voice, out of breath: "It wasn’t only him. Don’t sign. Call Sol." Keep it quiet and physical, never ghostly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'played_it_there',
              label: 'Play it on the seventh floor',
              predicate: { flagsSet: ['used:follow_the_memo'], atLocation: 'seventh_floor' },
              setsFlags: ['knows:it_wasnt_only_him'],
              closesFlags: [],
            },
            {
              routeId: 'played_it_for_sol',
              label: 'Play it for Sol',
              predicate: { flagsSet: ['used:follow_the_memo', 'spoke:sol'] },
              setsFlags: ['knows:it_wasnt_only_him', 'sol_heard_it'],
              closesFlags: [],
            },
            {
              routeId: 'played_it_alone',
              label: 'Play it alone',
              predicate: { flagsSet: ['used:follow_the_memo'] },
              setsFlags: ['knows:it_wasnt_only_him'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['memo_heard'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_other_one',
          playerCopy: 'Find out who else was there.',
          directorNotes:
            'The answer is Arden Vos, whose cameras go dark whenever Victor needs them to: at Owen Mercer’s party three years ago, and in the Halcott Building seven years from now. He did not kill anybody. He made sure nobody could see. Letting it go is a complete answer too.',
          enterWhen: { flagsSet: ['memo_heard'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_vos',
              label: 'Ask Arden Vos about the cameras',
              predicate: { flagsSet: ['spoke:vos', 'knows:it_wasnt_only_him'] },
              setsFlags: ['knows:vos_was_there'],
              closesFlags: ['let_the_memo_go'],
            },
            {
              routeId: 'ruiz_knew',
              label: 'Get Ruiz to tell you whose building the party was in',
              predicate: {
                flagsSet: ['knows:it_wasnt_only_him'],
                minRelationship: [{ characterId: 'ruiz', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:vos_was_there'],
              closesFlags: ['let_the_memo_go'],
            },
            {
              routeId: 'let_it_go',
              label: 'Let the memo be fourteen seconds and nothing more',
              predicate: { flagsSet: ['demo_night_done'] },
              setsFlags: ['let_the_memo_go'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['memo_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_naomi_arrives',
      atWorldMinute: 11 * 60 + 30,
      locationId: 'blue_hour',
      publicCopy:
        'Monday, half past eleven. A woman in a navy raincoat sits down at the counter of the Blue Hour, orders a black coffee, puts a leather folder flat beside it and checks the time.',
      directorNotes:
        'Naomi Ito, here for the meeting the player booked two weeks ago. Last time she waited forty minutes and left. If Victor is still at the window table, she has noticed him and drawn a conclusion.',
      setsFlags: ['naomi_waiting'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'naomi', toLocationId: 'blue_hour' }],
    },
    {
      id: 'we_victor_texts',
      atWorldMinute: 18 * 60,
      locationId: null,
      publicCopy:
        'Monday, six in the evening. A text from Victor: "No pressure. Vos Calder want a look on Friday. I’d rather walk in with you than with a slide about you."',
      directorNotes:
        'Only for a player who neither signed nor refused. He is patient and warm, and he has just told them he is going to Vos either way.',
      setsFlags: ['victor_pushed'],
      cancelledByFlags: ['offer_decided', 'signed_with_victor', 'refused_victor'],
      requiresFlags: ['contract_open'],
      movesCharacters: [],
    },
    {
      id: 'we_first_night',
      atWorldMinute: 23 * 60,
      locationId: null,
      publicCopy:
        'Monday, eleven at night. Last time, this is the minute you pressed send on an email to Victor that said "all yours, partner".',
      directorNotes:
        'Only remark on it if the player is awake and thinking about it. Whatever they are doing now instead is the first proof the week can be different.',
      setsFlags: ['first_night_passed'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_memo',
      atWorldMinute: 23 * 60 + 50,
      locationId: null,
      publicCopy:
        'Monday, ten to midnight. Your phone lights up with a notification from an app you have never opened: one voice memo, fourteen seconds long, dated seven years from now.',
      directorNotes:
        'Only for a player who has already used what they remember on purpose today. Do not play it for them and do not make it eerie. It is a notification on a cracked screen.',
      setsFlags: ['knows:the_memo'],
      cancelledByFlags: [],
      requiresFlags: ['used:call_the_future'],
      movesCharacters: [],
    },
    {
      id: 'we_sol_reminds',
      atWorldMinute: 1440 + 8 * 60,
      locationId: 'your_flat',
      publicCopy:
        'Tuesday, eight in the morning. A sticky note on the kettle in Sol’s capitals: ST BRIGID’S. THURSDAY 4PM. YOU CANCELLED TWICE. I WILL KNOW.',
      directorNotes:
        'The thing that killed the player is booked for Thursday at four, and last time they never went. Sol is not joking and is pretending to be.',
      setsFlags: ['knows:the_heart'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_ruiz_knocks',
      atWorldMinute: 1440 + 9 * 60 + 15,
      locationId: 'your_flat',
      publicCopy:
        'Tuesday, quarter past nine. Somebody knocks on your door: a woman in a rain-darkened suit, holding two coffees, one of them held out to you.',
      directorNotes:
        'Detective Celia Ruiz saw the player with Victor yesterday. Last time the player slept through this knock and Sol sent her away, and they never knew. She asks whether they signed anything, and what they know about Owen Mercer.',
      setsFlags: ['knows:owen_mercer', 'met_ruiz'],
      cancelledByFlags: [],
      requiresFlags: ['first_meeting_over'],
      movesCharacters: [{ characterId: 'ruiz', toLocationId: 'your_flat' }],
    },
    {
      id: 'we_victor_files',
      atWorldMinute: 2 * 1440 + 9 * 60,
      locationId: 'osei_office',
      publicCopy:
        'Wednesday, nine o’clock. Above the noodle shop on Canal Street, a provisional patent on a live speech-translation engine is filed with the city patent office. The inventor named on it is Victor Lane.',
      directorNotes:
        'Victor files with whatever he has: the full code if the player sent it, or the demo and the forum write-up if they did not. It is thinner without the code, and it is still first. This does not happen if the player signed with Osei before nine.',
      setsFlags: ['patent_his'],
      cancelledByFlags: ['patent_yours', 'osei_retained'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'victor', toLocationId: 'osei_office' }],
    },
    {
      id: 'we_the_storm',
      atWorldMinute: 3 * 1440 + 14 * 60,
      locationId: 'canal_street',
      publicCopy:
        'Thursday, two in the afternoon. A thunderstorm rolls in off the river and every light on Canal Street goes out at once, for three hours.',
      directorNotes:
        'The player remembers this one, unless they have changed enough that it comes late or not at all. Anybody still writing on a laptop with no battery is in trouble; Osei works by the window.',
      setsFlags: ['storm_hit'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_victor_files_late',
      atWorldMinute: 3 * 1440 + 17 * 60,
      locationId: null,
      publicCopy:
        'Thursday, five o’clock. Across the river, a slower firm files a provisional patent on a live speech-translation engine. The inventor named on it is Victor Lane.',
      directorNotes:
        'Only if Osei turned Victor away because the player signed with him first. The player bought themselves thirty-two hours. This is where they run out, unless the filing is already in.',
      setsFlags: ['patent_his'],
      cancelledByFlags: ['patent_yours'],
      requiresFlags: ['osei_retained'],
      movesCharacters: [],
    },
    {
      id: 'we_clinic_missed',
      atWorldMinute: 3 * 1440 + 17 * 60 + 30,
      locationId: null,
      publicCopy: 'Thursday, half past five. A missed-appointment text from St. Brigid’s, and a minute later, three from Sol.',
      directorNotes:
        'The player missed the heart test a third time, as they did in the first life. Sol is not angry for long. She is frightened for longer.',
      setsFlags: ['clinic_missed'],
      cancelledByFlags: ['heart_checked'],
      requiresFlags: ['knows:the_heart'],
      movesCharacters: [{ characterId: 'sol', toLocationId: 'your_flat' }],
    },
    {
      id: 'we_sol_hands_it_in',
      atWorldMinute: 4 * 1440 + 17 * 60,
      locationId: 'art_college',
      publicCopy: 'Friday, five o’clock. The registry at the art college closes for the weekend with Sol’s withdrawal form in its tray.',
      directorNotes:
        'Only if nobody found out. She will tell the player she quit as if it were good news, at dinner, and it will be the first thing in this week that happened exactly the way it did last time.',
      setsFlags: ['sol_left_college'],
      cancelledByFlags: ['knows:sol_leaving_college', 'sol_settled'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_demo_night',
      atWorldMinute: 4 * 1440 + 19 * 60,
      locationId: 'founders_hall',
      publicCopy:
        'Friday, seven o’clock. Demo Night at Founders’ Hall. Every investor in Westharbor is in the first four rows, and Arden Vos is in the dead centre of the first.',
      directorNotes:
        'Four minutes per team. The third team’s demo crashes on stage, as the player remembers, unless the week has drifted. Victor is presenting Parley whether or not the player is with him. Naomi is at the back with her arms folded.',
      setsFlags: ['demo_night_started'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'victor', toLocationId: 'founders_hall' },
        { characterId: 'vos', toLocationId: 'founders_hall' },
        { characterId: 'naomi', toLocationId: 'founders_hall' },
      ],
    },
    {
      id: 'we_demo_night_over',
      atWorldMinute: 4 * 1440 + 22 * 60 + 30,
      locationId: 'founders_hall',
      publicCopy: 'Friday, half past ten. The screen at Founders’ Hall goes dark, the chairs start stacking, and the whole scene goes to the Blue Hour to talk about it.',
      directorNotes:
        'Whatever happened on that stage is now the version Canal Street believes. By Saturday morning it will have improved in the telling.',
      setsFlags: ['demo_night_over'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_vos_calls',
      atWorldMinute: 5 * 1440 + 10 * 60,
      locationId: null,
      publicCopy: 'Saturday, ten in the morning. An unknown number: Arden Vos’s assistant, asking whether you have ninety seconds at four o’clock.',
      directorNotes:
        'Vos wants to know which founder actually built it. He will offer to cut Victor out. It is a test, and the player who refuses it is the one he calls back.',
      setsFlags: ['vos_offer_made'],
      cancelledByFlags: [],
      requiresFlags: ['demo_night_done'],
      movesCharacters: [],
    },
    {
      id: 'we_victor_party',
      atWorldMinute: 5 * 1440 + 21 * 60,
      locationId: 'victor_loft',
      publicCopy:
        'Saturday, nine at night. Victor throws a party at his loft: the whole scene, good wine, and a wall of empty frames. At ten Arden Vos arrives and the room rearranges itself around him.',
      directorNotes:
        'A launch party, which is what Owen Mercer’s was. The office at the end of the loft has a door that locks. Nothing happens in it unless the player makes it happen, and the player will notice the door anyway.',
      setsFlags: ['party_night'],
      cancelledByFlags: [],
      requiresFlags: ['demo_night_done'],
      movesCharacters: [
        { characterId: 'victor', toLocationId: 'victor_loft' },
        { characterId: 'vos', toLocationId: 'victor_loft' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_door',
      kind: 'FINALE',
      label: 'Whether you end this week with the company, the revenge, or your life',
      seedHint: 'A pen uncapped on a café table, and a hand that stays out.',
      payoffHint: 'Somebody signs something, or nobody does, and the door he closes seven years from now stays open.',
      weight: 1,
    },
    {
      id: 'p_victor_notices',
      kind: 'RIVAL',
      label: 'What Victor Lane does when he notices',
      seedHint: 'He uses your name three times in one sentence and watches your face on the third.',
      payoffHint: 'He moves first, through lawyers and friends and the scene, or he never sees it coming.',
      weight: 0.9,
    },
    {
      id: 'p_owen_mercer',
      kind: 'MYSTERY',
      label: 'The partner before you',
      seedHint: 'A woman at the corner table who has been reading the same page of a newspaper for twenty minutes.',
      payoffHint: 'A box in a basement labelled MERCER, an inhaler holder with nothing in it, and a correction filed eleven days later.',
      weight: 0.8,
    },
    {
      id: 'p_sol',
      kind: 'RELATIONSHIP',
      label: 'The sister you stopped speaking to',
      seedHint: 'A sticky note on the kettle about Thursday at four.',
      payoffHint: 'Sol at a board table seven years from now, on your side of it, or not at one at all.',
      weight: 0.85,
    },
    {
      id: 'p_fourteen_seconds',
      kind: 'THEME',
      label: 'Fourteen seconds you have not recorded yet',
      seedHint: 'A phone that feels heavier than it should.',
      payoffHint: 'Your own voice, out of breath: it wasn’t only him.',
      weight: 0.5,
    },
  ],
  archetypes: [
    {
      id: 'arch_code',
      name: 'You Wrote the Code',
      role: 'Technical builder',
      summary: 'You built the engine with your own hands, so fixing the demo, writing it up and shipping it overnight are where you are strongest.',
      playstyle: ['Builds things', 'Works late', 'Quiet in meetings'],
      blurb: 'Forty-one thousand lines, most of them written between midnight and four, and you remember every one of them, including seven years of fixes nobody has thought of yet.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { code: 3, hindsight: 1 },
      startingItems: [],
      startingAbilities: ['ship_it'],
      startingReputation: [],
    },
    {
      id: 'arch_pitch',
      name: 'You Sold the Dream',
      role: 'Sales and persuasion',
      summary: 'You were always the one who talked, so investors, judges and a room full of strangers are where you are strongest.',
      playstyle: ['Talks well', 'Reads a room', 'Overpromises'],
      blurb: 'Last time you stood beside Victor on every stage and let him do the talking. You have since had seven years to find out you were better at it.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { pitch: 3, bluffing: 1 },
      startingItems: [],
      startingAbilities: ['pitch_the_room'],
      startingReputation: [{ factionId: 'faction_scene', amount: 10 }],
    },
    {
      id: 'arch_fine_print',
      name: 'You Read the Fine Print',
      role: 'Research and background checks',
      summary: 'You read contracts, filings and records for a living, so finding where his story does not add up is where you are strongest.',
      playstyle: ['Careful', 'Patient', 'Finds paper trails'],
      blurb: 'You are the only person who ever read all nine pages. You read them too late, in year four, and you have been reading everything twice ever since.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { digging: 3, poker: 1 },
      startingItems: [],
      startingAbilities: ['pull_records'],
      startingReputation: [{ factionId: 'faction_police', amount: 5 }],
    },
    {
      id: 'arch_poker',
      name: 'You Never Let It Show',
      role: 'Social and bluffing',
      summary: 'You are very hard to read, so playing your old self, lying to his face and holding your nerve are where you are strongest.',
      playstyle: ['Unreadable', 'Patient', 'Long game'],
      blurb: 'You smiled through a board meeting that ended your life’s work. Smiling through a coffee with the man who called it is nothing.',
      attributeBonus: { resolve: 3, presence: 1 },
      skillProficiencies: { poker: 3, bluffing: 2 },
      startingItems: [],
      startingAbilities: ['play_along'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the contract?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Alex Moreno' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What were you best at, the first time?',
      helpText:
        'What you did best in the company you built and lost. It sets what you are good at now, and it stays for the whole story. It does not decide whether you sign, what you do to him, or who you trust. All of that is still yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is true about you in both lives?',
      helpText: 'The part of you that seven years and a closed door did not change. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I always answer my phone, which is why I still think about who took it.',
    },
    {
      id: 'what_you_want',
      label: 'What do you want from these seven years?',
      helpText: 'A starting instinct, not a promise. You can do the opposite at the café table and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'make_him_pay', label: 'Make him pay for it, in public' },
        { id: 'take_it_back', label: 'Take back what you built, and keep it this time' },
        { id: 'protect_sol', label: 'Keep your sister out of all of it' },
        { id: 'stay_alive', label: 'Live long enough to see thirty-four' },
        { id: 'find_out_why', label: 'Find out why you woke up' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Victor see across the table?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Too little sleep, a hoodie with a hole in the cuff, and a look he has never seen on me before.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of these are losses and none is written as a punishment. "Same
   * Handshake" is the old rails holding, "He Saw You Coming" is what showing
   * your hand costs, and "The Door You Didn't Close" is walking away from all of
   * it, reachable from twenty turns in.
   *
   * "Clean Hands" and "Let Him Have It" take no revenge at all, on purpose: a
   * player who decides the best answer to a man who lets people die is to live
   * a long way from him has played the story correctly. Only "It Wasn't Only
   * Him" needs the optional memo.
   */
  endings: [
    {
      id: 'end_clean_hands',
      name: 'Clean Hands',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['refused_victor', 'patent_yours'],
        flagsUnset: ['victor_exposed', 'case_reopened'],
      },
      condition:
        'The player never signed, filed first, and built Parley without him, and took no revenge beyond that. Victor is just a man with a contract nobody signed. Write it as the quiet win it is: the work exists, it has the player’s name on it, and Victor is a face across a room at Founders’ Hall who nods and does not come over.',
      epilogue:
        'Victor finds another founder by spring and another idea by summer, and the player hears about it the way you hear about weather in another city. Parley grows slower than last time and stays theirs. Some mornings at the Blue Hour they still sit with their back to the window table.',
      hint: '',
    },
    {
      id: 'end_same_handshake',
      name: 'Same Handshake',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['signed_with_victor', 'patent_his'],
        flagsUnset: ['pattern_proven', 'victor_exposed'],
      },
      condition:
        'The player signed, the patent went in under Victor’s name, and nothing they knew changed anything. This is the loss and should be written as one, without cruelty: the old rails held. Victor is delighted with his partner. The ending is the moment the player realises the next seven years are about to happen again, and that they still have most of them.',
      epilogue:
        'Demo Night goes the way it went. Vos writes the cheque. Victor buys the player a drink and makes a toast to partners, and the player drinks it, and counts. Seven years is a long time. Last time they did not know what was coming.',
      hint: 'The pen is still uncapped.',
    },
    {
      id: 'end_he_saw_you_coming',
      name: 'He Saw You Coming',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['victor_warned', 'patent_his'] },
      condition:
        'The player told Victor what they knew, or let him see it, and he moved first: the patent is his, Vos is his, and the scene has heard a story about an unstable founder who makes threats in cafés. Write Victor as calm and generous about it in public, which is worse. The player has lost this week, not their life.',
      epilogue:
        'He never raises his voice. He sends a lawyer’s letter with a kind note clipped to it, and a fruit basket when the player’s name stops getting meetings. The player keeps the laptop, the code and the memory of a door. That is not nothing. It is a long way from enough.',
      hint: '',
    },
    {
      id: 'end_lowtide',
      name: 'Lowtide',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: {
        flagsSet: ['naomi_partner', 'patent_yours'],
        minFactionReputation: [{ factionId: 'faction_lowtide', value: 20 }],
      },
      condition:
        'The player built it with Naomi Ito instead of Victor: fair numbers, a boathouse office and an investor who asks for the truth early. Whether it is also a romance depends on what the run built, and it goes no further than a kiss. Make it concrete: the term sheet, the whiteboard, the boat she finally finishes.',
      epilogue:
        'Lowtide’s first big win is the one she nearly missed twice. She never says she was right about Victor; she says she was right about the player, which they discover they prefer. The rowing boat goes in the water in June and leaks for exactly one stroke.',
      hint: '',
    },
    {
      id: 'end_family_business',
      name: 'Family Business',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['sol_in_the_company', 'patent_yours', 'sol_settled'] },
      condition:
        'Sol is in the company on purpose this time, as a founder with her name on the paper, and nobody will ever be able to turn her with forged records. The point is the sister, not the company: write two people who stopped speaking in one life arguing about fonts in this one.',
      epilogue:
        'The napkin is framed in the office, and anybody who asks who drew the logo gets told, at length. Sol finishes her degree a year late at night classes, on the company, and makes the player come to the show. There is no board meeting in year six.',
      hint: '',
    },
    {
      id: 'end_the_mercer_file',
      name: 'The Mercer File',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['pattern_proven', 'case_reopened'],
        minFactionReputation: [{ factionId: 'faction_police', value: 15 }],
      },
      condition:
        'Ruiz reopens Owen Mercer’s death with what the player helped her find, and Victor is questioned under caution for the first time in his life. It does not need a conviction to be the ending; it needs the moment he understands somebody saw. The player cannot report the crime against them, because it has not happened. They got him for the one that had.',
      epilogue:
        'The case takes fourteen months. Owen Mercer’s mother sits in the second row every day in the same coat. Ruiz gets her desk upstairs back and keeps the basement one anyway. Victor’s name comes off the patent he took from Owen, and the player never decides whether that was justice or paperwork.',
      hint: 'Two coffees, one of them for you.',
    },
    {
      id: 'end_demo_night',
      name: 'Demo Night',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['trap_sprung', 'victor_exposed'] },
      condition:
        'The player set a trap and Victor walked into it in front of the whole scene at Founders’ Hall: he pitched something only the real builder could catch out, and the player caught it out. Make it public, specific and short. Nobody is arrested. Everybody saw.',
      epilogue:
        'By morning every café on Canal Street has a version of it, and in all of them Victor’s face does the same thing. Vos’s office stops returning his calls by lunch. He leaves Westharbor in the autumn. The player hears he is pitching in another city, and sends Ruiz the address.',
      hint: '',
    },
    {
      id: 'end_inside_job',
      name: 'Inside Job',
      rarity: 'RARE',
      minTurn: 38,
      requires: { flagsSet: ['signed_with_victor', 'inside_man', 'pattern_proven'] },
      condition:
        'The player signed on purpose, stayed close, smiled at every dinner, and took him apart from inside the company with his own clause. This is the morally grey ending and should feel it: the player won by becoming very good at the thing Victor is good at. Let somebody they love notice.',
      epilogue:
        'Clause fourteen works exactly as written; it just works on him. The board votes four to one. Sol asks, much later, how long the player knew, and they tell her the truth, which is seven years, and she does not speak to them for a week, which is a great deal less than last time.',
      hint: '',
    },
    {
      id: 'end_let_him_have_it',
      name: 'Let Him Have It',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['refused_victor', 'sol_settled', 'heart_checked'],
        flagsUnset: ['victor_exposed', 'case_reopened'],
      },
      condition:
        'The player stopped racing him. Maybe the patent went to Victor and maybe it stopped mattering. They got their heart checked, kept their sister close, and decided that the best answer to a man who lets people die is to be alive, a long way from him. Do not make it a defeat and do not make it a sermon.',
      epilogue:
        'Parley gets built by somebody, eventually, the way good ideas do. The player builds something else, smaller and stranger, and it is theirs. Sol’s graduation show is on a Thursday at four, and the player is in the front row with a pill organiser in their pocket and nowhere else to be.',
      hint: '',
    },
    {
      id: 'end_it_wasnt_only_him',
      name: 'It Wasn’t Only Him',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['memo_answered', 'knows:vos_was_there', 'pattern_proven'] },
      condition:
        'The player found out who else was there, in both lives: Arden Vos, whose cameras go dark whenever Victor needs them to. This ending pulls both men into the light at once, and it should be colder than the others, because the player now knows how a city like this protects the people at the top.',
      epilogue:
        'Vos settles everything, quietly, for numbers that would have bought the company twice. He never admits a thing. The player keeps the voice memo on a drive in a drawer and plays it once a year, on the date it says, to remind themselves which life this is.',
      hint: 'Fourteen seconds.',
    },
    {
      id: 'end_seven_years_later',
      name: 'Seven Years Later',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['heart_checked', 'patent_yours', 'sol_settled', 'pattern_proven'] },
      condition:
        'Everything held: the work is the player’s, Victor’s pattern is on the record, Sol is safe, and the heart that killed them is being treated. The ending jumps seven years to the night before a company goes public, and the player is alive for it. Write that night, small and specific.',
      epilogue:
        'Seven years later, on the night before the listing, the player goes up to the seventh floor of the Halcott Building, which is now just an office with plants in it. They stand in the far corner for a minute. Then their phone rings, and it is Sol, asking where they are, and they go home.',
      hint: '',
    },
    {
      id: 'end_walked_out',
      name: 'The Door You Didn’t Close',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of all of it, Victor, the company and the city, and did not look back. That is a coherent response to dying and waking up early, and it should not be punished or redeemed. Write the leaving, and what it costs the people who were not told.',
      epilogue:
        'The laptop goes in a bag and the bag goes on a train. Victor files on Wednesday anyway, with what he has. Sol finds a note on the kettle beside her own and reads it twice. Somewhere a long way from Westharbor, the player books the clinic appointment themselves.',
      hint: '',
    },
  ],
  opening:
    '"Victor Lane." The man across the table holds out his hand. "I think we’re going to build something huge."\n\n' +
    'You know that voice. The last time you heard it, you were on a cold floor, and he was closing a door.\n\n' +
    'Now rain runs down a café window. Your old laptop sits open in front of you, the one with the cracked hinge. Your phone says Monday. Seven years ago.\n\n' +
    'Same handshake. Same grey coat. Same contract on the table, a pen uncapped on top.\n\n' +
    'Seven years ago, you signed it. Seven years later, he owned everything you built and let you die.\n\n' +
    'Victor’s hand stays out. His smile doesn’t move.\n\n' +
    '"So. Partners?"',
  openingPanel: {
    assetKey: 'story_seven_years_early/opening',
    alt: 'Victor across a rainy café table in a charcoal coat, smiling, his hand held out to shake, a contract and an uncapped pen between you.',
  },
  openingSuggestions: [
    '"Before I sign anything, read me clause fourteen. Out loud."',
    'I turn the contract over and read the last page, the one I skipped last time.',
    'I shake his hand, smile, and sign it. Exactly like last time.',
  ],
  coverDirection: [
    'SUBJECT: Victor Lane, a charming startup founder, alone and unmistakable in the foreground of a key visual for a revenge thriller anime.',
    'He sits across a small café table from the viewer, seen from the waist up, filling about two thirds of the frame.',
    'An adult man with neat dark hair pushed back, warm brown eyes and a small pale scar through his left eyebrow,',
    'in a charcoal-grey wool coat over a white open-collared shirt.',
    'He holds his right hand out toward the viewer to shake, palm open, with a warm practised smile that does not reach his eyes.',
    'ON THE TABLE between him and the viewer: a stapled contract and an uncapped fountain pen, the pages blank apart from soft grey lines:',
    'no letters, no numbers, nothing that reads as writing. Beside them, an old laptop with a cracked hinge.',
    'BEHIND HIM, soft and secondary: a rain-streaked café window with city lights blurred in the wet glass, and a round wall clock with no numerals.',
    'LIGHT: cold blue rain light on one side of his face and a warm amber café lamp on the other, so he is split between the two.',
    'TITLE: the words SEVEN YEARS EARLY painted into the art in the upper third as a bold, sharp serif logo, white with a thin crimson edge,',
    'spelled exactly SEVEN YEARS EARLY, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const SEVEN_YEARS_EARLY = StoryVersion.parse(raw);
