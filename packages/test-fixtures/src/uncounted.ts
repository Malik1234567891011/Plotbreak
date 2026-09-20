import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Uncounted" — a progression fantasy in which the number is the problem.
 *
 * The premise arrived as the most ordinary shape on the shelf: reincarnated at
 * eighteen, level zero, pick one of three classes. One inversion makes it a
 * world. **Level zero is not a handicap, it is a loophole.**
 *
 * In Orenne a person's Count is simultaneously their power, their legal rank
 * and their personhood, and the assessing stone reads it off the Ledger rather
 * than off the person. The player has no row, so the stone shows nothing. They
 * still gain Count. They are simply never written down.
 *
 * Everything else descends from four sentences:
 *
 *   1. Count is finite. There is a fixed quantity of it in Orenne.
 *   2. Killing takes it. This is the legal, respectable, normal thing to do.
 *   3. Taming shares it, and makes you permanently weaker.
 *   4. Everyone can read everyone — except the player.
 *
 * Two authoring decisions worth defending before somebody argues them away.
 *
 * **The player's Count is an invisible resource.** A progression fantasy whose
 * number is hidden sounds wrong until you notice that the whole premise is that
 * the world cannot see it either. `weight` is `visible: false` and the prose
 * carries the climb, which is also what `docs/authoring-principles.md` asks for
 * on every other world. The alignment is free and it is the best argument in
 * the file.
 *
 * **Regard and patience are relationships, not resources.** Aurelian's warmth
 * and Tsukasa's willingness to wait are `startingRelationship` plus gates,
 * because a resource that duplicates a relationship dimension is a second
 * source of truth about a person. What is left is what relationships cannot
 * carry: how much the player is holding, how close the Assize is to closing an
 * unbalanced page, how much of herself Rill has left, and how much is still
 * alive in the Unkept.
 *
 * The bible is `docs/story-bibles/13_UNCOUNTED.md` and it is the authority for
 * everything here.
 */

const raw = {
  id: 'sv_uncounted_1',
  storyId: 'story_uncounted',
  version: 1,
  title: 'Uncounted',
  fantasyLabel: 'The world cannot count you.',
  hook: 'Everyone in Orenne has a number that is their power, their rank and their personhood. When they weigh you, the stone stays dark.',
  premise:
    'Orenne runs on the Count. A person’s number is their strength, their legal rank, and whether the law considers them a person at all, and any stranger can read it off you the way they read your face.\n\n' +
    'You died somewhere else. You woke four days ago in a barley field two hours from Sablecourt, eighteen years old, wearing clothes nobody here recognises.\n\n' +
    'At the Weighing they put your hand on the assessing stone and nothing happens. Not a low number. Nothing. A dark stone means you are dead or you are not from Orenne, and the procedure for both is the same, and it is carried out by the healer on duty.\n\n' +
    'She looks at you for about two seconds and then lies to a room of four hundred people.\n\n' +
    'What none of them can see — what the stone could never have shown — is that you do have a Count. It rises. It is simply not written down anywhere, which means nothing you kill is credited to you, nobody can price or conscript you, and when you die what you are carrying will go back into the world instead of into the Ledger.\n\n' +
    'Three people work that out within the hour. A pale man in black at the gallery rail who has been waiting a hundred and forty years for a second one. A healer who is running out of herself and would like you to stay small. And the most beloved man alive, who rides a tiger the size of a cart and is about to be extremely kind to you.\n\n' +
    'You need to survive being nobody. Get papers, or a patron, or out of the city. Declare a Form and find out what it makes you.\n\n' +
    'And before the Assize closes the page you are the error on, decide which of those three you are going to let use you. All three of them are right about something. Only one of them gets what they want.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  sourceLocale: 'en',
  coverImage: null,
  keyArt: null,
  tags: ['Fantasy', 'Isekai', 'Progression', 'Adventure', 'Mystery', 'Creatures'],
  mechanicsChips: [
    'Kill it or keep it',
    'Grow off the books',
    'Tame mounts that outlive you',
    'A healer on a clock',
    'Pick a side, or neither',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PERMANENT_DEATH', 'SUGGESTIVE_THEMES'],
  intensity: 'MODERATE',
  creatorNote:
    'The world is authored down to what a Count of four buys at a market. Your route through it is not authored at all. Climb it, break it, sell yourself to the best man in it, walk into the wild on something that was trying to kill you last month and never come back. Nothing here needs you to be chosen, and nothing here waits for you.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'weighing_house',
    startWorldMinute: 10 * 60 + 20,
    startingItems: [{ itemId: 'field_clothes', qty: 1 }],
    hardCanon: [
      'A person’s Count is readable by anyone, at a glance, the way a face is. The player’s is not, and never becomes readable.',
      'The total Count in Orenne is fixed. It has been since the Assize built the Ledger a hundred and forty years ago.',
      'Killing a living thing transfers its Count to the killer. This is legal, ordinary, and how every town on the continent keeps a defender.',
      'Sparing and bonding a creature pools the two Counts. The person is permanently weaker afterwards and does not get it back.',
      'Healing is paid out of the healer’s own Count and does not return to them.',
      'Aurelian has never taken Count from a person and never will. He has killed eleven, all in the field, and let every one of their Counts go into the Ledger untouched.',
      'Tsukasa will not take from a person who has not agreed. He has held to this for a hundred and forty years.',
      'The player is the second unreadable person in history, not the first, and not prophesied.',
    ],
    toneGuide:
      'Warm high-fantasy adventure with a cold ledger underneath it. Orenne is a good place — the roads are safe, the bread is excellent, ' +
      'people are proud of what they built — and the player must like it, because a dystopia nobody is sorry to lose is a story with no ' +
      'second act. Chalk downs, river barges, long green valleys, timber-and-plaster towns. The dark things are in the treeline and in the ' +
      'filing, never in the palette. Violence is quick, physical and costly, and the cost is always named: not "something settles", but ' +
      'the wolf, the ridge, the flock, the spring. Nobody speechifies about the system. They live in it and mention the rent.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 11, presence: 11, resolve: 12, arcana: 8 },
  skills: [
    { id: 'edge', name: 'Edge', attribute: 'might', description: 'A blade, a staff-end, a fist, and the sense to know which one this is.' },
    { id: 'focus', name: 'Focus', attribute: 'mind', description: 'Moving Count through a body that is not used to holding any.' },
    { id: 'endure', name: 'Endure', attribute: 'resolve', description: 'Staying on your feet when something much better counted is not finished with you.' },
    { id: 'notice', name: 'Notice', attribute: 'mind', description: 'A trail, a tell, a lie, and the half-second before a living thing commits.' },
    { id: 'talk', name: 'Talk', attribute: 'presence', description: 'What an Unrated does at every gate, every inn and every hiring, all day, forever.' },
    { id: 'handle', name: 'Handle', attribute: 'presence', description: 'Calming a thing that has decided about you, and staying on it once it lets you up.' },
    { id: 'mend', name: 'Mend', attribute: 'arcana', description: 'Field medicine, so that somebody does not have to spend themselves closing it.' },
  ],
  /**
   * Four, all invisible.
   *
   * `weight` is the player's own Count and it is hidden on purpose — see the
   * header. `unkept_yield` is the world clock: the wild genuinely thins over a
   * long run, the world remarks on it before the player notices, and it is what
   * makes both Aurelian's plan and Tsukasa's deadline real rather than asserted.
   *
   * `rill_reserve` is the only meter the player is trying to *protect*, and it
   * is not a duplicate of her relationship: trust and affection say what she
   * will tell you, and this says how much of her is left. It falls whether or
   * not the player is paying attention.
   *
   * Order matters. The generic cost path spends the first GOOD_HIGH resource it
   * finds, and an unpriced cost belongs on the player's own Count rather than on
   * a healer standing next to them.
   */
  resources: [
    {
      id: 'weight',
      name: 'Weight',
      max: 100,
      start: 0,
      regenPerHour: 0,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is carrying nothing at all, which is where they started and is not a failure state. Doors are shut to them, prices are named twice, and anything in the Unkept larger than a fen-hound will kill them. The world does not pity them for it; Orenne has several hundred thousand people in exactly this position and calls them the Unrated.',
      color: '#C8B27A',
    },
    {
      id: 'ledger_standing',
      name: 'The Unbalanced Page',
      max: 100,
      start: 8,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The Assize has stopped treating the player as a clerical curiosity and started treating them as an error with a location. A closure order is not an arrest; it is a procedure, carried out politely, by people who have done it before and who will explain each step as they take it.',
      color: '#8C8C94',
    },
    {
      id: 'rill_reserve',
      name: 'What Rill Has Left',
      max: 100,
      start: 61,
      regenPerHour: 0,
      polarity: 'GOOD_HIGH',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Amaryllis Quist reaches Unrated. She is not dead and the story must never play it as a death — she is a woman of twenty-four who is legally no longer a person, in a city where that has a specific and unglamorous meaning, and she will make a joke about it inside the first minute.',
      color: '#D98A9A',
    },
    {
      id: 'unkept_yield',
      name: 'What Is Left In The Unkept',
      max: 100,
      start: 44,
      regenPerHour: 0,
      polarity: 'GOOD_HIGH',
      displayPriority: 4,
      visible: false,
      zeroStateConsequence:
        'The Southern March has nothing big left in it. Encounters thin to fen-hounds and weather. Every faction in the story has been waiting to find out what Orenne does on the day the wild runs out, and the answer is in a nine-page survey in the third registry that three people have read.',
      color: '#7FA06B',
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'field_clothes',
      name: 'The Clothes You Arrived In',
      tags: ['kit', 'personal'],
      droppable: false,
      description: 'Whatever you were wearing when you died somewhere else. The weave is wrong, the stitching is too even, and nobody in Sablecourt can place the cloth.',
      loreText: 'Four people have offered to buy them. Two of them were not interested in the cloth.',
      icon: 'clothes',
    },
    {
      id: 'form_blade',
      name: 'A Single-Edged Sword',
      tags: ['kit', 'weapon'],
      droppable: false,
      equipSlot: 'hands',
      skillModifiers: { edge: 2 },
      description: 'Plain, well-balanced, and issued at the Weighing to anyone who declares Blade. The crossguard is unmarked. Veterans cut a notch in theirs for every bond, so a long career looks like a comb.',
      loreText: 'The notches are not regulation and the Assize has given up saying so.',
      icon: 'sword',
    },
    {
      id: 'form_staff',
      name: 'A Staff of Pale Wood',
      tags: ['kit', 'weapon'],
      droppable: false,
      equipSlot: 'hands',
      skillModifiers: { focus: 2 },
      description: 'Shoulder height, unshod, worn smooth at the grip by somebody else first. Carried like a walking-stick by the practical and like a sceptre by the insufferable.',
      loreText: 'Every staff in the rack has a previous owner and the Assize does not say what happened to them.',
      icon: 'staff',
    },
    {
      id: 'form_wraps',
      name: 'Forearm Wraps',
      tags: ['kit'],
      droppable: false,
      equipSlot: 'hands',
      skillModifiers: { endure: 2 },
      description: 'Undyed linen, four yards, wound from knuckle to elbow. The cheapest kit at the Weighing and the one the clerk hands over without looking up.',
      loreText: 'Hand was the Form of people who could not afford a sword, which is historically accurate and still said out loud.',
      icon: 'wraps',
    },
    {
      id: 'forged_ninth',
      name: 'Papers Saying You Are A Ninth',
      tags: ['document'],
      questItem: true,
      skillModifiers: { talk: 2 },
      description: 'Eleven silver and a favour, from a woman on Quill Row named Bett who did not ask a single question and did not need to.',
      loreText: 'They are good. They are good enough that the only way to be caught with them is to be stood next to an assessing stone.',
      icon: 'papers',
    },
    {
      id: 'wardens_seal',
      name: 'A Warden’s Seal',
      tags: ['document'],
      questItem: true,
      droppable: false,
      skillModifiers: { talk: 3 },
      description: 'Aurelian’s mark in green wax on a strip of good card, which makes an Unrated person legally a person for as long as he says so. He wrote it out at the table while talking about something else.',
      loreText: 'He did not ask for anything. He has never asked for anything. That is most of the problem.',
      icon: 'seal',
    },
    {
      id: 'third_registry_survey',
      name: 'On The Exhaustion Of Wild Reserve',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      skillModifiers: { notice: 2 },
      description: 'Nine pages, passive voice, no signature, filed in the Assize’s third registry. It observes that the Unkept will not support harvest beyond roughly sixty years, that the Ledger requires death to transfer, and that Orenne contains a great many people of Ninth and Unrated rank.',
      loreText: 'It does not recommend anything. It is a survey. That is the worst thing about it.',
      icon: 'survey',
    },
    {
      id: 'quist_pin',
      name: 'A Healer’s Pin',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'Fine silver, an Assize licence number on the back, worn thin on one edge where a thumb has gone over it ten thousand times.',
      loreText: 'She fidgets with it constantly and has never once taken it off in front of anybody.',
      icon: 'pin',
    },
    {
      id: 'notch_file',
      name: 'A Crossguard File',
      tags: ['tool'],
      skillModifiers: { handle: 1 },
      description: 'Three inches of steel with a wooden grip, for cutting a notch into a crossguard. Sold on every road in Orenne by people who are sentimental about it.',
      icon: 'file',
    },
    {
      id: 'road_bread',
      name: 'March Bread',
      tags: ['supply'],
      stackable: true,
      maxStack: 6,
      description: 'Dense, seeded, keeps eleven days, and is the single thing about Orenne that nobody has ever complained about.',
      icon: 'bread',
    },
  ],
  abilities: [
    {
      id: 'take_it',
      name: 'Take It',
      tags: ['offensive'],
      description: 'Finish a beaten thing and keep what was in it.',
      affordances: [
        'kill it',
        'finish it',
        'take it',
        'take the count',
        'put it down',
        'end it',
        'cut its throat',
        'do what everyone does',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'endure', baseDc: 8 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'leave_it',
      name: 'Leave It',
      tags: ['utility'],
      description: 'Walk away from something you have already beaten, and let it keep what it has.',
      affordances: [
        'leave it',
        'let it go',
        'walk away',
        'spare it',
        'let it live',
        'i am not going to kill it',
        'lower the sword',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bond',
      name: 'Bond',
      tags: ['utility', 'signature'],
      description: 'Pool what you are carrying with a creature that has decided not to kill you. You are weaker from this moment on, permanently, and there are two of you.',
      affordances: [
        'tame it',
        'bond it',
        'bond with it',
        'keep it',
        'hold out my hand',
        'offer it my hand',
        'make it mine',
        'take it with me',
      ],
      costs: [{ resourceId: 'weight', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'handle', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'residue',
      name: 'Residue',
      tags: ['sight', 'signature'],
      description: 'Hear the last thought of something you have killed. It is usually not language, and it is usually worse for not being language.',
      affordances: [
        'listen to it',
        'hear it',
        'what did it say',
        'listen for the residue',
        'hold still and listen',
        'what was it thinking',
      ],
      costs: [{ resourceId: 'weight', amount: 1 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'focus', baseDc: 11 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hearing',
      name: 'Hearing',
      tags: ['sight', 'signature'],
      description: 'Catch surface thought from a person standing near you. Fragmentary, involuntary, loudest from somebody lying, and no use at all in a market.',
      affordances: [
        'read them',
        'listen to their thoughts',
        'hear what they are thinking',
        'use hearing',
        'what are they actually thinking',
      ],
      costs: [{ resourceId: 'weight', amount: 2 }],
      cooldownMinutes: 30,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'focus', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'grant',
      name: 'Grant',
      tags: ['utility', 'signature'],
      description: 'Give Count out of your own body into another person. Permanently. It does not come back and the Ledger has no procedure for it having happened.',
      affordances: [
        'grant it to them',
        'give it to them',
        'give them some of mine',
        'grant',
        'put it into them',
        'take mine',
      ],
      costs: [{ resourceId: 'weight', amount: 10 }],
      cooldownMinutes: 1440,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'endure', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'sealed',
      name: 'Sealed',
      tags: ['defensive', 'signature'],
      description: 'Nothing takes from you, reads you, or bonds you without your say. The stone still works. Nothing else does.',
      affordances: [
        'close myself off',
        'seal',
        'let them try',
        'stand still and let it come',
        'refuse it',
      ],
      costs: [{ resourceId: 'weight', amount: 3 }],
      cooldownMinutes: 60,
      targetRule: 'NONE',
      check: { attribute: 'resolve', skillId: 'endure', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_beat',
      name: 'Read The Beat',
      tags: ['sight'],
      description: 'Feel the half-second before a living thing commits to a thing.',
      affordances: [
        'watch it',
        'wait for it to move',
        'read it',
        'let it come to me',
        'watch its shoulders',
        'time it',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'field_mend',
      name: 'Do It Yourself',
      tags: ['defensive'],
      description: 'Close it with cloth and pressure and time, rather than letting a healer spend themselves on it.',
      affordances: [
        'bandage it',
        'patch myself up',
        'deal with it myself',
        'do not let her heal me',
        'wrap it',
        'i will manage',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'mend', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'weighing_house',
      name: 'The Weighing House',
      shortName: 'The Weighing',
      description:
        'A domed hall of pale stone with a black assessing stone at its centre, worn concave by a century of hands. Four hundred people on the benches, most of them somebody’s family. Assize grey at the rail, a clerk with a ledger, and very good light coming down through the high windows onto the exact spot where you are going to be stood.',
      artDirection:
        'A grand pale-stone domed civic hall, tiered wooden benches packed with a festive crowd, a low black stone plinth at the centre, officials in grey wool, dusty sunbeams from high windows. Warm, public, slightly cruel.',
      connections: [{ to: 'sablecourt', travelMinutes: 4, label: 'Out into the city' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
    },
    {
      id: 'sablecourt',
      name: 'Sablecourt',
      shortName: 'The City',
      description:
        'Forty thousand people on a grey-and-gold river, built around the largest Weighing House on the continent. Assize grey on every third shoulder, the best bread in Orenne, a famous bridge, and a permanent quiet crowd outside the hall because a Weighing is free entertainment.',
      artDirection:
        'A handsome river city of pale stone and slate roofs under high summer light, barges on the water, a great arched bridge, market awnings, people in grey wool. Prosperous and busy.',
      connections: [
        { to: 'weighing_house', travelMinutes: 4, label: 'Back to the hall' },
        { to: 'underbridge', travelMinutes: 8, label: 'Down under the bridge' },
        { to: 'quill_row', travelMinutes: 6, label: 'Along Quill Row' },
        { to: 'gilt_yard', travelMinutes: 10, label: 'Up to the Gilt Yard' },
        { to: 'southern_road', travelMinutes: 45, label: 'Out on the southern road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [{ itemId: 'road_bread', qty: 2, ownerId: null, aka: ['bread', 'march bread', 'a loaf'] }],
    },
    {
      id: 'underbridge',
      name: 'The Underbridge',
      shortName: 'Underbridge',
      description:
        'Where the Unrated live, under and alongside the great bridge. Not a slum exactly — a parallel economy of people the Ledger has no row for. Mostly the old, the injured, and those born wrong for the system. Washing lines between the piers, a cookfire that never goes out, and a woman who will trade you a bed for a day of hauling and not ask your number because she cannot read it anyway.',
      artDirection:
        'The vaulted underside of a great stone bridge converted into dwellings, washing lines strung between piers, cook fires, tarpaulins, river light coming up off the water onto the stonework. Poor, organised, and not miserable.',
      connections: [{ to: 'sablecourt', travelMinutes: 8, label: 'Up into the city' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'quill_row',
      name: 'Quill Row',
      shortName: 'Quill Row',
      description:
        'Notaries, scriveners, seal-cutters, and — four doors down, above a chandler’s — a very good woman named Bett who can make an Unrated into a Ninth for eleven silver and a favour. The street smells of ink and hot wax and everyone on it is extremely polite.',
      artDirection:
        'A narrow street of scribes and notaries, hanging shop signs shaped like quills and seals, small bow windows, ink and wax, a clerk visible at a desk through every pane. Respectable and quietly crooked.',
      connections: [{ to: 'sablecourt', travelMinutes: 6, label: 'Back to the main streets' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [{ itemId: 'forged_ninth', qty: 1, ownerId: null, aka: ['papers', 'the papers', 'a ninth', 'forged papers'] }],
    },
    {
      id: 'gilt_yard',
      name: 'The Gilt Yard',
      shortName: 'Gilt Yard',
      description:
        'Where the Warden of the Southern March keeps his horses when he is in the city, and where Grace sleeps, in a pen with a rail she could step over and has never once stepped over. Children are allowed in. Aurelian allows it. There is usually a queue.',
      artDirection:
        'A sunlit stable yard of golden stone, horses in loose boxes, straw, tack on hooks, and one enormous white-and-black tiger lying asleep in a low-railed pen with children leaning on the rail. Warm, safe, extraordinary.',
      connections: [{ to: 'sablecourt', travelMinutes: 10, label: 'Back down into the city' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        {
          itemId: 'wardens_seal',
          qty: 1,
          ownerId: 'aurelian',
          aka: ['the seal', 'a seal', 'wardens seal', 'the warden\u2019s seal', 'papers from him'],
        },
      ],
    },
    {
      id: 'southern_road',
      name: 'The Southern Road',
      shortName: 'The Road',
      description:
        'Aurelian’s wardenship, and the best-kept road on the continent: milestones, cut verges, a waystone every league with the current warden’s mark on it. Chalk downs on one side and the treeline of the Unkept on the other, close enough that you can see into it and far enough that nothing in it can reach the road in one run.',
      artDirection:
        'A long well-kept road across high chalk downland in summer, gorse and long grass, a stone waystone in the foreground, a dark treeline a half mile to one side. Enormous sky. Peaceful and slightly watchful.',
      connections: [
        { to: 'sablecourt', travelMinutes: 45, label: 'Back to the city' },
        { to: 'chalk_downs', travelMinutes: 20, label: 'Off the road, into the downs' },
        { to: 'halloway', travelMinutes: 60, label: 'On to Halloway' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
    {
      id: 'chalk_downs',
      name: 'The Chalk Downs',
      shortName: 'The Downs',
      description:
        'The shallow edge of the Unkept, where the Assize gave up pricing and the grass gets long. Ridge-wolves, fen-hounds, and the occasional chalk-lion that came further north than it should have. Everything here still has its Count in it, which is the only reason anybody comes.',
      artDirection:
        'Rolling open chalk upland with long silver grass and gorse, bare white scars of chalk, a few wind-bent thorn trees, a dark forest edge in the distance. Bright, wide, and empty of people.',
      connections: [
        { to: 'southern_road', travelMinutes: 20, label: 'Back to the road' },
        { to: 'flooded_fen', travelMinutes: 90, label: 'Down into the fen' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
    },
    {
      id: 'flooded_fen',
      name: 'The Flooded Fen',
      shortName: 'The Fen',
      description:
        'Deep Unkept. Standing water to the knee for four miles, drowned alder, and a silence that is not the absence of animals but the absence of small ones. The Sable Drake is in here. It has never been counted and it is older than the Ledger, and the Assize surveyed the edge of this place twice and then stopped sending people.',
      artDirection:
        'A vast flooded alder fen at dusk, black standing water, drowned trees, mist at knee height, no birds. Beautiful and wrong. Something very large has moved recently.',
      connections: [{ to: 'chalk_downs', travelMinutes: 90, label: 'Back up onto the downs' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 5 },
    },
    {
      id: 'halloway',
      name: 'Halloway',
      shortName: 'Halloway',
      description:
        'A village of two hundred on the southern road with no warden since Perrin Alder’s uncle died in the spring. They have a wall, a bell, and nobody with a Count above four. Every person in it knows exactly what that arithmetic means and they are all extremely polite about it.',
      artDirection:
        'A small walled village of timber and plaster with a slate-roofed bell tower, fields outside the wall, the treeline close. Late afternoon. Tidy, fortified, and visibly under-defended.',
      connections: [{ to: 'southern_road', travelMinutes: 60, label: 'Back up the road' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 5 },
    },
  ],
  factions: [
    {
      id: 'faction_assize',
      name: 'The Assize',
      description: 'Grey wool, silver pins, extremely polite, and the reason the roads are safe. They keep the Ledger balanced and they are not wrong that the alternative was worse.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'An open closure order' },
        { atReputation: -30, label: 'A named file' },
        { atReputation: 0, label: 'An unbalanced page' },
        { atReputation: 30, label: 'Cooperative' },
        { atReputation: 60, label: 'Of use to the Ledger' },
      ],
    },
    {
      id: 'faction_underbridge',
      name: 'The Underbridge',
      description: 'Everyone the Ledger has no row for. They cannot read you either, which is the first time in your life that has been an advantage.',
      startingReputation: 10,
      ranks: [
        { atReputation: -100, label: 'Somebody who went up and stayed up' },
        { atReputation: -30, label: 'A tourist' },
        { atReputation: 0, label: 'New under the bridge' },
        { atReputation: 30, label: 'One of the unrated' },
        { atReputation: 60, label: 'Somebody they would hide' },
      ],
    },
    {
      id: 'faction_march',
      name: 'The Southern March',
      description: 'Aurelian’s wardenship: eleven villages, one road, and the people who have not been eaten because of him. Their loyalty is not naive and it is not purchased.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'The reason Halloway burned' },
        { atReputation: -30, label: 'Not the warden’s business' },
        { atReputation: 0, label: 'Passing through' },
        { atReputation: 30, label: 'One of his' },
        { atReputation: 60, label: 'The road remembers you' },
      ],
    },
  ],
  characters: [
    {
      id: 'rill',
      name: 'Amaryllis Quist',
      role: 'Assize-licensed healer, on certification duty because nobody wants to be in a room with her',
      cardBlurb:
        'She was supposed to certify you as dead and she lied to four hundred people instead. Healing is paid out of the healer’s own Count, and she has been a healer since she was fifteen.',
      pronouns: 'she/her',
      publicTraits: ['Flirts first and thinks after', 'Genuinely clumsy', 'Extremely funny about small things'],
      hiddenDrives: ['She wants to be allowed to stop without it meaning she failed, and cannot see a version of that where nobody dies in the gap'],
      values: ['Nobody gets certified while they are still standing there breathing', 'Never letting a debt attach to a kindness'],
      fears: ['Being the reason somebody died because she had nothing left that day. It has happened once. She has told nobody.'],
      socialStyle: 'Leads with a joke or an endearment, deflects any question about herself, and answers everything else properly.',
      boundaries: ['Will not be thanked in a way that becomes a debt', 'Will not accept a Grant, and says so furiously the first three times'],
      goals: ['Get through the day without certifying anybody', 'Keep the arithmetic to herself'],
      secrets: [
        {
          id: 'rill_nineteen_months',
          fact: 'She was a Fifth at her own Weighing. She is a Ninth now. At her current rate she is nineteen months from Unrated, and she has done the arithmetic more than once.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Not confessed. The player works it out — the translucency in strong light, the clumsiness, the way she will not stand near a stone — and she confirms it flatly when told, and is relieved.',
        },
        {
          id: 'rill_the_one_she_lost',
          fact: 'Two winters ago she reached a man with a crushed leg and had nothing left in her to spend. She sat with him for six hours. She signed the certification herself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only at high trust, only when the player has refused her healing at least once to protect her, and never in the same scene as a joke.',
        },
      ],
      speechStyle:
        'Fast, teasing, full of endearments she does not mean and one or two she does. Short flat sentences when she is lying. Asks questions to stop being asked them. Never uses the word Count about herself.',
      topics: ['the certification she did not sign', 'what a Ninth can afford', 'the Underbridge', 'Aurelian', 'her licence', 'anything except herself'],
      voiceSamples: [
        'Don’t look at me like that, I’ve had a day. Sit. — No, *sit*, you’re leaking on the nice floor.',
        'It’s fine. It’s a thumb’s worth. I’ve got thumbs to spare.',
        'You’re going to ask. Everyone asks. Ask something else and I’ll like you more.',
        'I said stone fault. Four hundred people heard me say stone fault. So it was a stone fault, and you and I are going to go and have a drink about it.',
      ],
      appearance:
        'Twenty-four, tall for Orenne, warm brown skin, dark red hair pinned up badly and coming down all day, a wide easy mouth, heavy-chested and dressed for it — her healer’s coat left open over a bright, low, slightly too fine blouse that is nobody’s uniform. She has been written up for it four times and framed one of the notices.',
      visualHook: 'A fine silver healer’s pin she fidgets with constantly, and edges that go faintly translucent in strong light — fingertips, the rim of the ear, the hollow of the throat.',
      silhouette: 'Curved, coat open and swinging, one hand always up at the pin at her collar.',
      artSeed: 'uncounted-rill-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'warm', 'exhausted'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'underbridge', activity: 'asleep in a rented corner she pays too much for' },
        { startMinute: 330, endMinute: 600, locationId: 'underbridge', activity: 'unlicensed rounds — the ones she is not paid for and does anyway' },
        { startMinute: 600, endMinute: 900, locationId: 'weighing_house', activity: 'certification duty, hating it' },
        { startMinute: 900, endMinute: 1200, locationId: 'sablecourt', activity: 'the licensed round: paid work, hurrying between it' },
        { startMinute: 1200, endMinute: 1380, locationId: 'sablecourt', activity: 'drinking somewhere loud with people who do not ask' },
        { startMinute: 1380, endMinute: 1440, locationId: 'underbridge', activity: 'walking home along the water, alone, slowly' },
      ],
      homeLocationId: 'underbridge',
      knowledgeScope: ['the_count', 'healing', 'the_assize', 'underbridge', 'sablecourt', 'aurelian'],
      startingRelationship: { trust: 25, affection: 15, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'rill_why_she_lied',
          label: 'She tells you why she lied for a stranger',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:she_lied_for_you'] },
        },
        {
          id: 'rill_the_arithmetic',
          label: 'She confirms the arithmetic out loud',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:rill_is_spending_herself'] },
        },
        {
          id: 'rill_romance',
          label: 'She stops performing at you',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 50 },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 14, presence: 15, resolve: 13, arcana: 16 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'tsukasa',
      name: 'Tsukasa',
      role: 'The Hollow. The only other person in the history of the Ledger to read dark on the stone',
      cardBlurb:
        'He takes Count from anything, by touch, at will — and keeps none of it. He has been quietly un-counting Orenne for a hundred and forty years, and he has been waiting for a second one of you.',
      pronouns: 'he/him',
      publicTraits: ['Says very little', 'Does not perform', 'Has not aged'],
      hiddenDrives: ['He needs somebody alive who could tell him he has been wrong for a century, because there is nobody left who knew him before'],
      values: ['Never taking from a person who has not agreed', 'Saying the death toll out loud rather than softening it'],
      fears: ['That he is wrong, and has been since the day he helped build it'],
      socialStyle: 'Long pauses he does not rush to fill. Flat delivery of enormous statements. Asks one question and waits.',
      boundaries: ['Will not take from a person without consent — not once in a hundred and forty years', 'Will not explain himself twice'],
      goals: ['Break the Ledger and let a hundred and forty years run back out into the world', 'Find out what the player decides before deciding for them'],
      secrets: [
        {
          id: 'tsukasa_built_it',
          fact: 'He was one of the nine original Assessors. The dam is his. He was proud of it, and the hundred and forty years since have been one very long correction.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it plainly, unprompted, the first time the player accuses him of not understanding what he is asking for.',
        },
        {
          id: 'tsukasa_the_first',
          fact: 'He was the first unreadable. Not reincarnated — he took his own row out of the Ledger, by hand, in 1691, and has been outside it since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once the player has worked out that a dark stone means no row rather than no Count.',
        },
      ],
      speechStyle:
        'Very few words, no contractions, no jokes, no cruelty. Sentences that stop where the information stops. He will use silence rather than repeat himself.',
      topics: ['what the stone actually reads', 'where Count goes', 'the nine', 'the dam', 'what two winters would cost'],
      voiceSamples: [
        'You are not the first. You are the second.',
        'It went somewhere. Everything goes somewhere. Say where.',
        'I have watched eleven people decide he was worth following. Four of them were cleverer than you.',
        'If I open it, the roads go dark in a season and a great many people die in the two winters after. I am telling you that so that you cannot say later that you were not told.',
      ],
      appearance:
        'Tall, athletic, the build of somebody who has never been allowed to stop. A chiselled, still face that does very little. Pale in a way that reads as lit wrong rather than ill. Black from throat to boot under a heavy black cloak he does not take off indoors. Black hair pushed back, slightly long, with one white streak at the left temple that is not age.',
      visualHook: 'Piercing violet eyes — the only colour on him, and exactly the colour Count goes when it is moving.',
      silhouette: 'A tall black column with a cloak that does not move much, hands never visible.',
      artSeed: 'uncounted-tsukasa-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'cold', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'chalk_downs', activity: 'putting the day’s takings back into the ground, alone' },
        { startMinute: 240, endMinute: 600, locationId: 'flooded_fen', activity: 'somewhere in the deep Unkept, unobserved' },
        { startMinute: 600, endMinute: 780, locationId: 'weighing_house', activity: 'at the gallery rail, watching a Weighing he has watched ten thousand times' },
        { startMinute: 780, endMinute: 1080, locationId: 'sablecourt', activity: 'walking the city, taking small amounts from things nobody will miss' },
        { startMinute: 1080, endMinute: 1260, locationId: 'underbridge', activity: 'among the Unrated, who are the only people who do not look at him twice' },
        { startMinute: 1260, endMinute: 1440, locationId: 'southern_road', activity: 'on the road at night, going the other way to everybody else' },
      ],
      homeLocationId: 'chalk_downs',
      knowledgeScope: ['the_count', 'the_ledger', 'the_assize', 'the_nine', 'the_unkept', 'aurelian'],
      startingRelationship: { trust: 5, affection: 0, respect: 20, fear: 15, rivalry: 0 },
      gates: [
        {
          id: 'tsukasa_explains_the_stone',
          label: 'He tells you what the stone actually reads',
          kind: 'TRUST',
          requires: { trust: 20 },
        },
        {
          id: 'tsukasa_the_nine',
          label: 'He tells you who built the Ledger',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['knows:no_row_not_no_count'] },
        },
        {
          id: 'tsukasa_the_ask',
          label: 'He asks you for the thing he has waited a century for',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 50 },
        },
      ],
      attributes: { might: 14, agility: 15, mind: 17, presence: 12, resolve: 18, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'aurelian',
      name: 'Aurelian',
      role: 'First Rank. Warden of the Southern March. The most loved person in Orenne',
      cardBlurb:
        'Count of one hundred and six, a sword called Mercy, and a tiger called Grace that he rides. He will be the first person in this world to be kind to you and he will mean it.',
      pronouns: 'he/him',
      publicTraits: ['Warm to everybody', 'Asks real questions and waits', 'Dresses like a working man on a long journey'],
      hiddenDrives: ['He has read the survey and believes it, and he intends to be holding the continent’s power on the day it runs out rather than have it be held by the Assize'],
      values: ['Never taking Count from a person', 'Never letting a road go unwarded if he can help it'],
      fears: ['That he is the instrument the survey has in mind, and that he will agree to it'],
      socialStyle: 'Direct, unhurried, completely without side. Uses a name once, properly. Makes other people feel funny.',
      boundaries: ['Will not take from a person, ever, under any circumstance', 'Will not let somebody thank him in public'],
      goals: ['Find a second vault before Grace is past holding any more', 'Keep the southern road warded through the winter'],
      secrets: [
        {
          id: 'aurelian_grace_is_a_vault',
          fact: 'A bond pools Count, which makes a bond a place to put it. Everything he has taken in twelve years of wardenship has gone into Grace. She is nine feet at the shoulder because of what is in her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Never confessed. A player works it out from her size against his Count and says it to his face, and he does not deny it — he explains it, calmly, and the explanation is good.',
        },
        {
          id: 'aurelian_grace_is_full',
          fact: 'Grace has been at her ceiling for eleven months. He has been killing less since, the road is worse for it, and two villages have already paid for his restraint.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it himself, to a player he trusts, as the reason he is about to ask them for something.',
        },
      ],
      speechStyle:
        'Warm, plain, unhurried. Concrete nouns — a road, a village, a name, a date. Never rhetorical. When he disagrees he tells you a true story instead of an argument, and the story is always relevant.',
      topics: ['the southern road', 'Halloway', 'the eleven he has killed', 'Grace', 'what he thinks the Assize will do', 'your papers'],
      voiceSamples: [
        'Dark stone. Well. That’s new, and I’ve been doing this a while.',
        'Don’t do that. You’ll pull it open again and then she has to spend herself closing it, and she won’t tell you what that costs her.',
        'Take it. I know. I know — but the Halloway road has no warden since Perrin died, and I cannot put a feeling on that road.',
        'You don’t owe me for the seal. I want to be very clear about that now, because if I ever do ask you for something I want you to be able to say no to it.',
      ],
      appearance:
        'Thirty-four. Golden-brown sun-streaked hair, always slightly untidy in the way of a man who has been working. A genuinely beautiful face — strong jaw, straight nose, laugh lines. Not armoured: a good travel coat, riding clothes, a field surgeon’s kit at the saddle.',
      visualHook: 'The smile. Open, reaching the eyes, and not a mask — he is pleased to see you, and he is pleased to see most people.',
      silhouette: 'Broad-shouldered in a long coat, usually with one hand resting in an enormous tiger’s ruff.',
      artSeed: 'uncounted-aurelian-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'warm', 'resolved'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'gilt_yard', activity: 'asleep in the tack room rather than an inn, which people find charming and which is also cheaper' },
        { startMinute: 300, endMinute: 480, locationId: 'gilt_yard', activity: 'with Grace, alone, before anybody is up' },
        { startMinute: 480, endMinute: 720, locationId: 'sablecourt', activity: 'Assize business he finds tedious and does properly' },
        { startMinute: 720, endMinute: 1020, locationId: 'southern_road', activity: 'riding the march, stopping at every waystone' },
        { startMinute: 1020, endMinute: 1200, locationId: 'halloway', activity: 'in Halloway, which has no warden, drinking with people who know it' },
        { startMinute: 1200, endMinute: 1440, locationId: 'gilt_yard', activity: 'back late, seeing to the horses himself' },
      ],
      homeLocationId: 'gilt_yard',
      knowledgeScope: ['the_count', 'the_assize', 'the_march', 'halloway', 'the_unkept', 'grace'],
      startingRelationship: { trust: 30, affection: 20, respect: 15, fear: 5, rivalry: 0 },
      gates: [
        {
          id: 'aurelian_the_seal',
          label: 'He makes you a person on paper',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'aurelian_the_survey',
          label: 'He tells you what he has read and what he thinks it means',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_wild_is_thinning'] },
        },
        {
          id: 'aurelian_the_offer',
          label: 'He asks you to be the second vault',
          kind: 'ALLIANCE',
          requires: { trust: 70, respect: 45, flagsSet: ['knows:grace_is_full'] },
        },
      ],
      attributes: { might: 18, agility: 14, mind: 14, presence: 18, resolve: 17, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'grace',
      name: 'Grace',
      role: 'A tiger three times the size of any tiger that has ever lived, and the best-loved animal in Orenne',
      cardBlurb:
        'She is the proof that the strongest man alive chose mercy, and she is the reason his arithmetic does not add up. Work out why a tiger is nine feet at the shoulder and you will know what he has been doing for twelve years \u2014 and what he is going to ask you for.',
      pronouns: 'she/her',
      publicTraits: ['Enormously calm', 'Tolerates children', 'Watches Tsukasa and nothing else'],
      hiddenDrives: ['She is carrying twelve years of other things’ Count and it is not comfortable'],
      values: ['Aurelian'],
      fears: ['Being approached by the pale man, which is the only thing that has ever made her stand up'],
      socialStyle: 'Does not vocalise. Leans. Puts her head where a hand should go and waits.',
      boundaries: ['Will not let anybody but Aurelian past her shoulder', 'Will not be alone with Tsukasa in a yard'],
      goals: ['Stay near him'],
      secrets: [
        {
          id: 'grace_the_ceiling',
          fact: 'She is at the ceiling of what a bonded creature can hold. She has been for eleven months, and it is why she sleeps eighteen hours a day now when she used to sleep nine.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Observable rather than told — the stable hands mention the sleeping, fondly, as a sign she is getting old. She is ten.',
        },
      ],
      speechStyle: 'None. She is an animal, and the world must never have her think in sentences or understand speech.',
      topics: [],
      voiceSamples: [],
      appearance:
        'White and black, nine feet at the shoulder, with a heavy winter ruff she keeps all year. Her head alone is the size of a man’s chest. Eyes a pale cold blue, usually half closed.',
      visualHook: 'The sheer scale of her against an ordinary doorway, and how little she uses it.',
      silhouette: 'A low white mountain, usually lying down, usually with a person leaning on her.',
      artSeed: 'uncounted-grace-01',
      portrait: null,
      expressions: ['neutral', 'alert', 'exhausted'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'gilt_yard', activity: 'asleep in the low-railed pen' },
        { startMinute: 480, endMinute: 720, locationId: 'gilt_yard', activity: 'awake, being leaned on by children' },
        { startMinute: 720, endMinute: 1020, locationId: 'southern_road', activity: 'carrying him along the march at a walk' },
        { startMinute: 1020, endMinute: 1440, locationId: 'gilt_yard', activity: 'asleep again, which is new' },
      ],
      homeLocationId: 'gilt_yard',
      knowledgeScope: [],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [],
      attributes: { might: 20, agility: 16, mind: 6, presence: 16, resolve: 18, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'marrin',
      name: 'Voss Marrin',
      role: 'Assessor of Sablecourt. Thirty-one years at the stone',
      cardBlurb:
        'She read you, and read you again, and then called for a healer because that is the procedure and she follows procedure. She did not believe the stone fault for one second and she wrote it down anyway.',
      pronouns: 'she/her',
      publicTraits: ['Tired', 'Decent', 'Keeps the form filled in correctly'],
      hiddenDrives: ['She has certified two living people in thirty-one years and would rather not make it three'],
      values: ['The form is filled in correctly', 'Nobody is hurried at the stone'],
      fears: ['Being asked, formally, what she saw'],
      socialStyle: 'Professional warmth, no small talk, tells you the procedure before she does it to you.',
      boundaries: ['Will not lie in a written return', 'Will not pretend a stone fault is common'],
      goals: ['Get to her pension with two certifications rather than three'],
      secrets: [
        {
          id: 'marrin_wrote_it_down',
          fact: 'Her written return for that morning says "apparatus fault, recorded, subject released". It is the only untrue return she has filed and she filed it knowing it was untrue.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells the player herself, once, quietly, when the Assize starts asking — as a warning rather than a confession.',
        },
      ],
      speechStyle: 'Clipped, procedural, kind at the edges. Says what is about to happen before it happens.',
      topics: ['the stone', 'procedure', 'certifications', 'Cardew Hale'],
      voiceSamples: [
        'Hand flat. Fingers apart. It does not hurt and it takes about four seconds.',
        'I am going to do that once more, and then I am required to call for a healer. I am telling you so it is not a surprise.',
        'I have been at this stone since before your mother. It does not fault.',
      ],
      appearance: 'Fifties, grey wool, silver pin, reading glasses on a cord, ink on the side of her right hand.',
      visualHook: 'Reading glasses pushed up into grey hair and never once used to read.',
      silhouette: 'Square, still, both hands resting on the rim of a stone plinth.',
      artSeed: 'uncounted-marrin-01',
      portrait: null,
      expressions: ['neutral', 'concerned', 'resolved'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'sablecourt', activity: 'at home, asleep' },
        { startMinute: 420, endMinute: 1020, locationId: 'weighing_house', activity: 'at the stone, all day, one after another' },
        { startMinute: 1020, endMinute: 1200, locationId: 'weighing_house', activity: 'writing up returns nobody will read' },
        { startMinute: 1200, endMinute: 1440, locationId: 'sablecourt', activity: 'the same tavern, the same table, alone' },
      ],
      homeLocationId: 'weighing_house',
      knowledgeScope: ['the_count', 'the_assize', 'sablecourt'],
      startingRelationship: { trust: 15, affection: 5, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'marrin_warns_you',
          label: 'She warns you that the page is being looked at',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
      ],
      attributes: { might: 9, agility: 9, mind: 15, presence: 12, resolve: 14, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'hale',
      name: 'Cardew Hale',
      role: 'Assize officer, Reconciliations. The man they send when a page does not balance',
      cardBlurb:
        'Patient, polite, genuinely good at his job, and completely certain that the Ledger is the reason his daughter can walk to school. He is not your enemy. He is a procedure with a name.',
      pronouns: 'he/him',
      publicTraits: ['Unfailingly polite', 'Never raises his voice', 'Explains every step as he takes it'],
      hiddenDrives: ['He wants the page to balance, and he does not much mind which way'],
      values: ['The Ledger is a public good', 'Nobody is surprised by a procedure'],
      fears: ['That the thing making the page not balance is not a clerical error'],
      socialStyle: 'Asks a question, writes the answer down, and lets the silence do the work.',
      boundaries: ['Will not act without a written finding', 'Will not threaten — he states'],
      goals: ['Close the unbalanced page at Sablecourt', 'Be home for the winter'],
      secrets: [
        {
          id: 'hale_read_the_survey',
          fact: 'He is the third person who has read the third-registry survey. He filed it. He has not slept properly since and he has told nobody, including his wife.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it to the player rather than to the Assize, because the player is the only person he can say it to who is not in the Ledger.',
        },
      ],
      speechStyle: 'Complete sentences, no contractions, soft volume. Uses "I am afraid" as an actual apology and means it.',
      topics: ['reconciliation', 'the unbalanced page', 'procedure', 'what the Assize is for'],
      voiceSamples: [
        'I am afraid I am going to have to ask you to put your hand on it again. I will explain why first, if you would like.',
        'You are not in trouble. There is no such thing as being in trouble with Reconciliations. There is only a page that does not balance.',
        'My daughter walks to school on a road that has a warden on it. That road is eighty years old and it did not exist before us.',
      ],
      appearance: 'Forties, grey wool worn well, a good coat, a satchel of forms, a wedding ring he turns when he is thinking.',
      visualHook: 'A small black notebook he writes in during conversations without breaking eye contact.',
      silhouette: 'Neat, upright, satchel strap across the chest.',
      artSeed: 'uncounted-hale-01',
      portrait: null,
      expressions: ['neutral', 'concerned', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'sablecourt', activity: 'asleep at a boarding house he dislikes' },
        { startMinute: 390, endMinute: 780, locationId: 'weighing_house', activity: 'reading returns, one finger down the column' },
        { startMinute: 780, endMinute: 1140, locationId: 'sablecourt', activity: 'asking people polite questions and writing the answers down' },
        { startMinute: 1140, endMinute: 1320, locationId: 'quill_row', activity: 'with the notaries, checking seals against a list' },
        { startMinute: 1320, endMinute: 1440, locationId: 'sablecourt', activity: 'writing to his wife' },
      ],
      homeLocationId: 'weighing_house',
      knowledgeScope: ['the_count', 'the_ledger', 'the_assize', 'the_survey', 'sablecourt'],
      startingRelationship: { trust: 5, affection: 0, respect: 10, fear: 10, rivalry: 20 },
      gates: [
        {
          id: 'hale_states_the_finding',
          label: 'He tells you what he has written down about you',
          kind: 'OTHER',
          requires: { trust: 25 },
        },
        {
          id: 'hale_the_survey',
          label: 'He tells you what he filed and cannot stop thinking about',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:the_wild_is_thinning'] },
        },
      ],
      attributes: { might: 11, agility: 10, mind: 16, presence: 14, resolve: 15, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'beck',
      name: 'Beck Ardry',
      role: 'Weighed Ninth the same morning you did not weigh at all. Blade',
      cardBlurb:
        'Big, cheerful, and slow in both senses. He bonded the first thing he ever beat — an ugly bad-tempered fen-hound called Sorrow — and is permanently weaker for it, and will tell you why that was the right call.',
      pronouns: 'he/him',
      publicTraits: ['Cheerful', 'Slow to anger', 'Devoted to an ugly dog'],
      hiddenDrives: ['He laughed off a Ninth in front of his whole family and has not stopped thinking about their faces'],
      values: ['You do not leave a thing you have beaten', 'A road warden is a good life'],
      fears: ['That Ninth is his ceiling and everyone already knows'],
      socialStyle: 'Says the obvious thing warmly and lets you do what you like with it.',
      boundaries: ['Will not be teased about Sorrow', 'Will not kill a thing that has stopped fighting'],
      goals: ['Get taken on as a road warden somewhere on the march'],
      secrets: [
        {
          id: 'beck_the_ceiling',
          fact: 'He has bonded twice since, and told nobody, because a Ninth who keeps giving it away is going to be a Ninth forever and he knows it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it as a joke against himself once the player has bonded something of their own.',
        },
      ],
      speechStyle: 'Warm, plain, a beat behind. Repeats your last few words while he thinks. Talks to the dog mid-sentence.',
      topics: ['Sorrow', 'road wardens', 'his family', 'what a bond costs'],
      voiceSamples: [
        'Ninth. Yeah. My mum did a face. — Anyway. You want to meet my dog?',
        'He’s not a good dog. He’s a bad dog and he bit a man in Quill Row. But he was going to die in that ditch and now he isn’t.',
        'Everyone keeps telling me I gave it away. I know what I did. I was there.',
      ],
      appearance: 'Eighteen, very big, sandy hair badly self-cut, a Blade’s sword he is still slightly embarrassed to be carrying.',
      visualHook: 'A crossguard with three fresh notches in it, which is three more than most Ninths ever cut.',
      silhouette: 'Broad, stooped slightly to keep a hand near a dog’s head.',
      artSeed: 'uncounted-beck-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'concerned'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'underbridge', activity: 'asleep with the dog on his feet' },
        { startMinute: 420, endMinute: 720, locationId: 'sablecourt', activity: 'asking at every hiring board on the river' },
        { startMinute: 720, endMinute: 1140, locationId: 'chalk_downs', activity: 'out on the downs, practising badly, enjoying it' },
        { startMinute: 1140, endMinute: 1440, locationId: 'underbridge', activity: 'feeding the dog first' },
      ],
      homeLocationId: 'underbridge',
      knowledgeScope: ['the_count', 'bonding', 'the_unkept', 'underbridge'],
      startingRelationship: { trust: 30, affection: 20, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'beck_the_three_notches',
          label: 'He admits how many he has actually bonded',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
      ],
      attributes: { might: 14, agility: 10, mind: 9, presence: 12, resolve: 13, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ithra',
      name: 'Ithra Sen',
      role: 'Weighed Seventh, declared Staff, Assize-track and unbearable about it',
      cardBlurb:
        'Sharp, funny, ambitious, and the best of your year at nearly everything. Her Hearing came in at the Weighing and she has been quietly appalled by everybody since. She will end up across the table from you, and she will never be wrong for the wrong reasons.',
      pronouns: 'she/her',
      publicTraits: ['Very quick', 'Openly ambitious', 'Flinches in crowds'],
      hiddenDrives: ['She believes the Ledger is the best thing anybody ever built and is terrified that believing it is a failure of nerve'],
      values: ['The Ledger is why the roads are safe', 'Say the ambitious thing out loud rather than pretending'],
      fears: ['Hearing something from somebody she loves that she cannot unhear'],
      socialStyle: 'Argues properly, concedes points, and will not let you win one you have not earned.',
      boundaries: ['Will not use Hearing on a friend without saying so first', 'Will not pretend she does not want the post'],
      goals: ['A Reconciliations posting before she is twenty-one'],
      secrets: [
        {
          id: 'ithra_heard_her_father',
          fact: 'The first thing she ever heard with Hearing was her father, in the hall at her own Weighing, being relieved that a Seventh meant she would move out.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only ever to somebody who has told her something equally bad about their own family, and never first.',
        },
      ],
      speechStyle: 'Fast, precise, funny, a little cruel when she is right. Uses "which is" to start half her sentences. Apologises properly and only once.',
      topics: ['the Assize', 'Hearing', 'why the Ledger is defensible', 'the survey', 'the player’s dark stone'],
      voiceSamples: [
        'Which is exactly the problem, isn’t it — you want the roads safe and you want nobody to have paid for it.',
        'I am going to listen to you now. I am telling you because the alternative is doing it without telling you, and I would like to be the other sort.',
        'Nobody has ever read dark. Nobody. I checked the returns back to the founding and I did it on my own time.',
      ],
      appearance: 'Eighteen, small, very upright, black hair cut sharp at the jaw, a staff she has already had shod in iron at her own expense.',
      visualHook: 'Pressing two fingers hard against her own temple in a crowd, briefly, and carrying on talking.',
      silhouette: 'Small and straight, staff held vertical like a surveyor’s rod.',
      artSeed: 'uncounted-ithra-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'cold', 'concerned'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'sablecourt', activity: 'asleep in a good boarding house her family pays for' },
        { startMinute: 360, endMinute: 720, locationId: 'weighing_house', activity: 'in the returns room, unpaid, making herself useful to Hale' },
        { startMinute: 720, endMinute: 1080, locationId: 'sablecourt', activity: 'running errands for Reconciliations and pretending it is beneath her' },
        { startMinute: 1080, endMinute: 1320, locationId: 'quill_row', activity: 'checking seals, which is the dullest job in the Assize and she asked for it' },
        { startMinute: 1320, endMinute: 1440, locationId: 'sablecourt', activity: 'somewhere quiet, away from people, with her hands over her ears' },
      ],
      homeLocationId: 'weighing_house',
      knowledgeScope: ['the_count', 'the_ledger', 'the_assize', 'hearing', 'sablecourt'],
      startingRelationship: { trust: 20, affection: 10, respect: 20, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'ithra_the_returns',
          label: 'She shows you what she found in the old returns',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'ithra_chooses',
          label: 'She decides whether to put your name in a report',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 50 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 17, presence: 14, resolve: 13, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'perrin',
      name: 'Perrin Alder',
      role: 'Weighed Ninth, declared Hand, and told nobody why',
      cardBlurb:
        'Quiet, watchful, from the Underbridge, and the only one of your year who will tell you what Unrated actually means, because his mother is. He chose the Form that can give Count away. By his arithmetic it takes nine years.',
      pronouns: 'he/him',
      publicTraits: ['Says little', 'Watches everything', 'Never complains about the Underbridge'],
      hiddenDrives: ['He is going to Grant to his mother, and he is frightened that nine years is optimistic'],
      values: ['You do not talk about what you are doing for your family', 'Hand is not a poor man’s Form'],
      fears: ['That she will not last nine years'],
      socialStyle: 'Listens all the way to the end, then says one accurate thing.',
      boundaries: ['Will not discuss his mother with anyone', 'Will not take charity and will accept a job'],
      goals: ['Reach a Count he can spare ten of'],
      secrets: [
        {
          id: 'perrin_nine_years',
          fact: 'He has worked out exactly how many years of refinement it will take to Grant his mother into a Ninth, and he checks the arithmetic every few weeks hoping it has changed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to a player who has themselves Granted to somebody, or who has sat with his mother without being asked to.',
        },
      ],
      speechStyle: 'Short. Accurate. No filler at all, which reads as rudeness for about a week and then as the opposite.',
      topics: ['Hand', 'the Underbridge', 'granting', 'what Unrated actually means'],
      voiceSamples: [
        'It cannot be taken. That is the whole of it. Everything else people say about Hand is people who picked something else.',
        'She is not sick. She is Unrated. Those are not the same and the second one is worse here.',
        'Nine years. I have checked it a lot.',
      ],
      appearance: 'Eighteen, lean, dark-haired, forearms wrapped in undyed linen, very still.',
      visualHook: 'Stillness — he uses about a third as much movement as anybody else in the room.',
      silhouette: 'Narrow and upright, hands loose, no weapon anywhere on him.',
      artSeed: 'uncounted-perrin-01',
      portrait: null,
      expressions: ['neutral', 'concerned', 'resolved'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'underbridge', activity: 'asleep beside his mother’s bed' },
        { startMinute: 360, endMinute: 480, locationId: 'underbridge', activity: 'the forms, alone, on the shingle, every morning without exception' },
        { startMinute: 480, endMinute: 1080, locationId: 'sablecourt', activity: 'hauling on the wharves for day wages' },
        { startMinute: 1080, endMinute: 1260, locationId: 'chalk_downs', activity: 'out on the downs, refining, which is the only part of the day he likes' },
        { startMinute: 1260, endMinute: 1440, locationId: 'underbridge', activity: 'home, cooking for two' },
      ],
      homeLocationId: 'underbridge',
      knowledgeScope: ['the_count', 'granting', 'underbridge', 'unrated'],
      startingRelationship: { trust: 20, affection: 10, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'perrin_the_arithmetic',
          label: 'He tells you what the nine years are for',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
      ],
      attributes: { might: 13, agility: 12, mind: 12, presence: 10, resolve: 16, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_dark_stone',
      title: 'A Stone Fault',
      summary: 'Four hundred people watched the stone stay dark and a healer you have never met told them it was broken. Work out what she saved you from, and what it actually means.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['rill', 'marrin', 'tsukasa', 'aurelian'],
      involvedLocationIds: ['weighing_house', 'sablecourt'],
      knownRewardCopy: 'An answer about the stone, and a much better question.',
      steps: [
        {
          id: 'leave_the_hall',
          playerCopy: 'Get out of the Weighing House, and decide who you are leaving with.',
          directorNotes:
            'Three people want a word and the player can only walk out with one of them. Rill is already an accomplice and is pretending to be casual about it. Tsukasa is at the rail and will not come down. Aurelian is on his way over with his hand already out. None of these is the correct choice; all three open. Do not let the scene end without the player declaring a Form.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_the_healer',
              label: 'Leave with the woman who lied for you',
              predicate: { flagsSet: ['spoke:rill'] },
              setsFlags: ['knows:she_lied_for_you'],
              closesFlags: [],
            },
            {
              routeId: 'with_the_warden',
              label: 'Take the hand the whole hall is watching',
              predicate: { flagsSet: ['spoke:aurelian'] },
              setsFlags: ['knows:the_warden_noticed_you'],
              closesFlags: [],
            },
            {
              routeId: 'to_the_gallery',
              label: 'Go up to the man in black',
              predicate: { flagsSet: ['spoke:tsukasa'] },
              setsFlags: ['knows:there_was_a_first'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['weighed', 'unrated'],
            abilities: [],
            reputation: [{ factionId: 'faction_underbridge', amount: 5 }],
          },
        },
        {
          id: 'what_the_stone_reads',
          playerCopy: 'Find out what a dark stone actually means.',
          directorNotes:
            'The answer is that the stone reads the Ledger, not the person — no row, nothing to show. The player can reach it from Tsukasa directly, from Ithra’s trawl through the old returns, or by noticing on their own that they are plainly getting stronger while remaining Unrated. Do not let any character deliver it as a lecture; it should land as an offhand correction.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_tells_you',
              label: 'Tsukasa tells you',
              predicate: { flagsSet: ['knows:there_was_a_first'] },
              setsFlags: ['knows:no_row_not_no_count'],
              closesFlags: [],
            },
            {
              routeId: 'the_returns',
              label: 'Ithra finds it in the returns',
              predicate: { flagsSet: ['spoke:ithra'] },
              setsFlags: ['knows:no_row_not_no_count'],
              closesFlags: [],
            },
            {
              routeId: 'you_felt_it',
              label: 'Work it out from your own body',
              predicate: { flagsSet: ['took:first_count'] },
              setsFlags: ['knows:no_row_not_no_count'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:off_the_books'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_not_a_person',
      title: 'Not A Legal Person',
      summary: 'Unrated means no work, no road pass, and no inn that will take you. There are three ways round that and one of them is a man with a green wax seal.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['aurelian', 'perrin', 'hale'],
      involvedLocationIds: ['sablecourt', 'quill_row', 'underbridge', 'gilt_yard'],
      knownRewardCopy: 'A way to stand at a gate without being moved along.',
      steps: [
        {
          id: 'get_standing',
          playerCopy: 'Find a way to be a person on paper, or find a way to live without being one.',
          directorNotes:
            'Three real answers, no correct one. Bett on Quill Row forges a Ninth for eleven silver and a favour she will collect. Aurelian writes a warden’s seal at the table while talking about something else and asks for nothing. The Underbridge simply does not check, and living there costs nothing but the rest of your life. Hale is already looking at seals on Quill Row, and the forged route has teeth later.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'forged',
              label: 'Buy papers from Bett',
              predicate: { hasItems: ['forged_ninth'] },
              setsFlags: ['has:standing', 'owes:bett'],
              closesFlags: [],
            },
            {
              routeId: 'sealed',
              label: 'Take the warden’s seal',
              predicate: { hasItems: ['wardens_seal'] },
              setsFlags: ['has:standing', 'owes:nobody_yet'],
              closesFlags: [],
            },
            {
              routeId: 'underbridge',
              label: 'Go where nobody checks',
              predicate: { flagsSet: ['spoke:perrin'] },
              setsFlags: ['has:standing', 'of:the_underbridge'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: [],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_first_blood',
      title: 'Kill It Or Keep It',
      summary: 'Something in the long grass on the chalk downs has decided about you. What happens next is the only question this world really asks.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['beck', 'rill', 'aurelian'],
      involvedLocationIds: ['chalk_downs', 'southern_road'],
      knownRewardCopy: 'The first Count you ever carried, or the first thing that ever chose to walk beside you.',
      steps: [
        {
          id: 'the_ridge_wolf',
          playerCopy: 'Beat the ridge-wolf, and then decide.',
          directorNotes:
            'The decision is the content. Take it and the player is stronger and the ridge has no wolf — and the world should mention the flock, and the spring, later and without comment. Bond it and the player is permanently weaker and there is a wolf beside them. Leave it and it remembers them, which the world also keeps. Every companion present reacts, differently, every time: Rill wants them to walk away, Beck wants the bond, Aurelian tells a true story about Halloway and is right.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_it',
              label: 'Take the Count',
              predicate: { flagsSet: ['used:take_it'] },
              setsFlags: ['took:first_count'],
              closesFlags: [],
            },
            {
              routeId: 'bonded_it',
              label: 'Keep it',
              predicate: { flagsSet: ['used:bond'] },
              setsFlags: ['bonded:first', 'took:first_count'],
              closesFlags: [],
            },
            {
              routeId: 'left_it',
              label: 'Leave it where it is',
              predicate: { flagsSet: ['used:leave_it'] },
              setsFlags: ['left:the_first_one'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [{ itemId: 'notch_file', qty: 1 }],
            flags: [],
            abilities: [],
            reputation: [{ factionId: 'faction_march', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_what_she_spends',
      title: 'What She Spends',
      summary: 'She heals you the first time without being asked and makes a joke about thumbs. Work out what it costs her, and then work out what you are going to do about it.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['rill', 'perrin'],
      involvedLocationIds: ['underbridge', 'sablecourt'],
      knownRewardCopy: 'The truth about a woman who will not tell you it.',
      steps: [
        {
          id: 'notice_it',
          playerCopy: 'Work out why she is clumsy, and why the light goes through her.',
          directorNotes:
            'Never told. Observed: the translucency at the edges in strong sun, the walking into door frames, the way she will not stand near an assessing stone, the fact that she is twenty-four and a Ninth and was a Fifth at her Weighing. A Staff player with Hearing gets it fastest and it is the cruellest way to get it.',
          succeedWhen: { flagsSet: ['knows:rill_is_spending_herself'] },
          succeedWhenAny: [],
          rewards: {
            xp: 60,
            items: [{ itemId: 'quist_pin', qty: 1 }],
            flags: [],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'do_something_or_do_not',
          playerCopy: 'Decide what you are going to do about it.',
          directorNotes:
            'Four honest answers and no correct one: refuse her healing and patch yourself up forever; Grant to her, which she refuses furiously three times; talk her into stopping, which has a body count she will name; or let her carry on, love her, and be there at the end of it. Never let a character call one of these the right one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'refused_her',
              label: 'Stop letting her spend herself on you',
              predicate: { flagsSet: ['used:field_mend'] },
              setsFlags: ['protecting:rill'],
              closesFlags: [],
            },
            {
              routeId: 'granted_to_her',
              label: 'Put some of yours into her',
              predicate: { flagsSet: ['used:grant'] },
              setsFlags: ['granted:rill', 'protecting:rill'],
              closesFlags: [],
            },
            {
              routeId: 'let_her',
              label: 'Let her be who she is',
              predicate: { flagsSet: ['knows:rill_is_spending_herself'] },
              setsFlags: ['let:her_carry_on'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: [],
            abilities: [],
            reputation: [{ factionId: 'faction_underbridge', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_vault',
      title: 'Mercy And Grace',
      summary: 'His sword is called Mercy and his tiger is called Grace, and he named them both himself, and he meant it. Find out what they are for.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['aurelian', 'grace', 'hale', 'tsukasa'],
      involvedLocationIds: ['gilt_yard', 'southern_road', 'halloway'],
      knownRewardCopy: 'What the best man in Orenne has been doing for twelve years.',
      steps: [
        {
          id: 'the_arithmetic_of_a_tiger',
          playerCopy: 'Work out why Grace is nine feet at the shoulder.',
          directorNotes:
            'A bond pools Count. A bond is therefore a place to put it. Aurelian is a Blade who has warded the southern road for twelve years and his personal Count is a hundred and six, which is nowhere near enough to explain her. Three roads in and none of them is a confession: the stable hand who is fond of her and has drawn the wrong conclusion, the pale man who has known for years, or the player doing the sum in front of him.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_sleeping',
              label: 'Notice how much she sleeps now',
              predicate: { flagsSet: ['knows:grace_is_full'] },
              setsFlags: ['knows:grace_is_a_vault'],
              closesFlags: [],
            },
            {
              routeId: 'he_tells_you',
              label: 'Tsukasa tells you what she is',
              predicate: { flagsSet: ['knows:there_was_a_first'] },
              setsFlags: ['knows:grace_is_a_vault'],
              closesFlags: [],
            },
            {
              routeId: 'do_the_sum',
              label: 'Do the arithmetic yourself',
              predicate: { flagsSet: ['knows:off_the_books'] },
              setsFlags: ['knows:grace_is_a_vault'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_wild_is_thinning'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'he_asks',
          playerCopy: 'He is going to ask you for something. Decide before he does.',
          directorNotes:
            'He tells the player that Grace has been full for eleven months, that the road is worse for it, and that two villages have already paid. Then he asks. He does not pressure, does not bargain, and explicitly tells them they can say no — which is exactly why it is difficult. A player who says yes has not been fooled; they have made a defensible call about who should hold it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_yes',
              label: 'Agree to be the second vault',
              predicate: { flagsSet: ['knows:grace_is_full'] },
              setsFlags: ['is:the_second_vault'],
              closesFlags: ['refused:the_vault'],
            },
            {
              routeId: 'said_no',
              label: 'Refuse him to his face',
              predicate: { flagsSet: ['knows:grace_is_full'] },
              setsFlags: ['refused:the_vault'],
              closesFlags: ['is:the_second_vault'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: [],
            abilities: [],
            reputation: [{ factionId: 'faction_march', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_the_dam',
      title: 'The Ninth Assessor',
      summary: 'The pale man wants to let a hundred and forty years out of the Ledger. He will tell you the death toll himself, once, without softening it, and then never raise it again.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['tsukasa', 'hale', 'ithra', 'aurelian'],
      involvedLocationIds: ['chalk_downs', 'weighing_house', 'flooded_fen'],
      knownRewardCopy: 'What the Ledger actually is, and who built it.',
      steps: [
        {
          id: 'the_nine',
          playerCopy: 'Find out who built the dam.',
          directorNotes:
            'He says it plainly the first time the player accuses him of not understanding what he is asking for: he was one of the nine. He is not confessing and he does not want absolution. It reframes every previous scene and should be delivered in about eleven words.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_says_it',
              label: 'Accuse him of not knowing what he is asking for',
              predicate: { flagsSet: ['knows:there_was_a_first'] },
              setsFlags: ['knows:he_built_it'],
              closesFlags: [],
            },
            {
              routeId: 'the_founding_returns',
              label: 'Find him in the founding returns',
              predicate: { flagsSet: ['knows:no_row_not_no_count'] },
              setsFlags: ['knows:he_built_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [{ itemId: 'third_registry_survey', qty: 1 }],
            flags: ['knows:the_wild_is_thinning'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'decide_about_the_dam',
          playerCopy: 'Decide what happens to a hundred and forty years of dammed Count.',
          directorNotes:
            'Three real answers. Help him, and own the two winters. Stop him, and own the sixty-year clock in the survey. Or make him wait, which is its own answer and has a deadline attached that the world will keep mentioning. Nobody in this story is allowed to tell the player which is right.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_him',
              label: 'Help him open it',
              predicate: { flagsSet: ['knows:he_built_it'] },
              setsFlags: ['chose:the_dam_breaks'],
              closesFlags: ['chose:the_page_balances'],
            },
            {
              routeId: 'against_him',
              label: 'Stop him',
              predicate: { flagsSet: ['knows:he_built_it'] },
              setsFlags: ['chose:the_page_balances'],
              closesFlags: ['chose:the_dam_breaks'],
            },
            {
              routeId: 'not_yet',
              label: 'Make him wait',
              predicate: { flagsSet: ['knows:the_wild_is_thinning'] },
              setsFlags: ['chose:not_yet'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: [],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_halloway',
      title: 'The Halloway Road',
      summary: 'Two hundred people, a wall, a bell, and nobody with a Count above four. They are extremely polite about the arithmetic.',
      kind: 'SIDE',
      startsActive: false,
      involvedCharacterIds: ['aurelian', 'beck', 'perrin'],
      involvedLocationIds: ['halloway', 'southern_road'],
      knownRewardCopy: 'A village that keeps its bell, or does not.',
      steps: [
        {
          id: 'the_warden_gap',
          playerCopy: 'Halloway has had no warden since the spring. Do something about it, or do not.',
          directorNotes:
            'The honest version of the take-or-share argument, at village scale. Warding it yourself means killing on the road for months. Putting Beck forward means a Ninth who keeps bonding things holds a wall. Doing nothing is a real option and the world does not punish it with a massacre — it simply notes, quietly, the following spring, that they rang the bell twice in March.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'warded_it',
              label: 'Ward it yourself',
              predicate: { flagsSet: ['took:first_count'] },
              setsFlags: ['warded:halloway'],
              closesFlags: [],
            },
            {
              routeId: 'gave_it_to_beck',
              label: 'Put Beck forward for it',
              predicate: { flagsSet: ['spoke:beck'] },
              setsFlags: ['warded:halloway', 'beck:has_a_post'],
              closesFlags: [],
            },
            {
              routeId: 'walked_on',
              label: 'Walk on',
              predicate: { flagsSet: ['knows:the_warden_noticed_you'] },
              setsFlags: ['left:halloway'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: [],
            abilities: [],
            reputation: [{ factionId: 'faction_march', amount: 25 }],
          },
        },
      ],
    },
    {
      id: 'q_the_drake',
      title: 'The Thing In The Fen',
      summary: 'There is one. It is older than the Ledger, it has never been counted, and the Assize surveyed the edge of that place twice and then stopped sending people.',
      kind: 'LEAD',
      startsActive: false,
      involvedCharacterIds: ['tsukasa', 'beck'],
      involvedLocationIds: ['flooded_fen', 'chalk_downs'],
      knownRewardCopy: 'The only uncounted thing in Orenne besides you.',
      steps: [
        {
          id: 'go_and_look',
          playerCopy: 'Go into the flooded fen and find out what has been keeping it quiet.',
          directorNotes:
            'The Sable Drake is a Count of thirty-one and the only creature a player can bond to become genuinely First Rank, and it will cost almost everything they are carrying. Killing it is also available and is the single largest act of taking in the story. It is not a boss gate and nothing in the main line requires it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bonded_the_drake',
              label: 'Bond it',
              predicate: { flagsSet: ['used:bond'] },
              setsFlags: ['bonded:the_drake'],
              closesFlags: [],
            },
            {
              routeId: 'killed_the_drake',
              label: 'Take it',
              predicate: { flagsSet: ['used:take_it'] },
              setsFlags: ['took:the_drake'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: [],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_hall_goes_quiet',
      atWorldMinute: 10 * 60 + 24,
      locationId: 'weighing_house',
      publicCopy:
        'Voss Marrin lifts your hand off the stone, looks at it, and puts it back down. The stone stays dark. Somewhere up near the back a man says "is it broken" loudly enough that everybody hears him decide it is not.',
      directorNotes:
        'Not a gasp. The specific embarrassed quiet of four hundred people watching somebody find out something terrible in public. Marrin is decent and hates this and will say the procedure out loud before she follows it.',
      setsFlags: ['weighed'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'rill', toLocationId: 'weighing_house' },
        { characterId: 'tsukasa', toLocationId: 'weighing_house' },
      ],
    },
    {
      id: 'we_the_warden_arrives',
      atWorldMinute: 10 * 60 + 41,
      locationId: 'weighing_house',
      publicCopy:
        'The hall changes. Not politely — people stand up. The Warden of the Southern March is in the doorway with his hair full of road dust, delighted about something, and he is coming straight down the aisle towards you.',
      directorNotes:
        'The Assize flags anomalies to the First Rank and he was three streets away. He is genuinely pleased. He is genuinely helpful. Everything he does in this scene is a real kindness and also an investment, and the player must not be able to cleanly separate the two — now or in thirty turns.',
      setsFlags: ['knows:the_warden_noticed_you'],
      cancelledByFlags: [],
      requiresFlags: ['weighed'],
      movesCharacters: [{ characterId: 'aurelian', toLocationId: 'weighing_house' }],
    },
    {
      id: 'we_hale_opens_a_file',
      atWorldMinute: 3 * 1440 + 9 * 60,
      locationId: 'sablecourt',
      publicCopy:
        'A man in good grey wool has been at the returns room for two days. This morning he asked the clerk for every apparatus-fault filing in the district going back eleven years, and there are four, and three of them are from before Voss Marrin was born.',
      directorNotes:
        'Cardew Hale, Reconciliations. He is not hunting the player, he is balancing a page, and he will be unfailingly polite the entire time he closes on them. Raise ledger_standing here and keep raising it whether or not the player engages.',
      setsFlags: ['hale:has_the_file'],
      cancelledByFlags: [],
      requiresFlags: ['weighed'],
      movesCharacters: [{ characterId: 'hale', toLocationId: 'weighing_house' }],
    },
    {
      id: 'we_she_does_it_again',
      atWorldMinute: 5 * 1440 + 22 * 60,
      locationId: 'underbridge',
      publicCopy:
        'A haulier under the bridge has had a barge cleat through his forearm. Rill is there in about four minutes with her coat unbuttoned and her hair down, and she closes it, and she makes a joke about thumbs, and she sits down on a bollard afterwards for slightly longer than the joke can carry.',
      directorNotes:
        'The first time the player sees the cost from outside rather than as a recipient. Nobody explains anything. She is a little more translucent at the ear and the fingertips in the low river light than she was at the Weighing, and the player is allowed to notice or not.',
      setsFlags: ['knows:rill_is_spending_herself'],
      cancelledByFlags: [],
      requiresFlags: ['spoke:rill'],
      movesCharacters: [{ characterId: 'rill', toLocationId: 'underbridge' }],
    },
    {
      id: 'we_the_downs_are_quiet',
      atWorldMinute: 9 * 1440 + 14 * 60,
      locationId: 'chalk_downs',
      publicCopy:
        'An old woman cutting gorse on the ridge says she has not heard a wolf up here since the spring, and that when she was a girl you could not walk this path at dusk. She says it the way people say the summers were better, and then she goes back to the gorse.',
      directorNotes:
        'The world clock, mentioned by somebody with no stake in it. This is the first time the player is told the Unkept is emptying, and it must not come from Tsukasa or Aurelian, because both of them have an argument that depends on it.',
      setsFlags: ['knows:the_wild_is_thinning'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_grace_sleeps',
      atWorldMinute: 12 * 1440 + 8 * 60,
      locationId: 'gilt_yard',
      publicCopy:
        'A stable hand mentions, fondly, that Grace is sleeping eighteen hours a day now and that she used to be up at first light bothering the horses. He says she is getting old. She is ten. Tigers live twenty-six years.',
      directorNotes:
        'The observable half of the vault. Said by somebody who loves her and has drawn the wrong conclusion. A player who does the arithmetic — her size against his Count — gets there from here without anybody telling them.',
      setsFlags: ['knows:grace_is_full'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_warden_noticed_you'],
      movesCharacters: [],
    },
    {
      id: 'we_the_hollow_stops_waiting',
      atWorldMinute: 16 * 1440 + 2 * 60,
      locationId: 'chalk_downs',
      publicCopy:
        'Three waystones on the southern road are cold. Not damaged — cold, and the Count that was set into them when the road was cut is simply not in them any more. The Assize has sent somebody to look and the somebody has not come back with an explanation.',
      directorNotes:
        'He has stopped waiting. This happens whether or not the player has met him and whether or not they approve, and it accelerates if the player has told him anything useful. The march notices before the Assize does.',
      setsFlags: ['hollow:has_started'],
      cancelledByFlags: ['chose:the_page_balances'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'tsukasa', toLocationId: 'chalk_downs' }],
    },
  ],
  promises: [
    {
      id: 'p_the_stone',
      kind: 'MYSTERY',
      label: 'Why the stone stayed dark',
      seedHint: 'Marrin reads it twice and says the procedure out loud before she follows it.',
      payoffHint: 'The stone reads the Ledger, not the person. There is no row, so there is nothing to show — and everything the player takes is therefore off the books.',
      weight: 1,
    },
    {
      id: 'p_the_tiger',
      kind: 'FINALE',
      label: 'What Grace is carrying',
      seedHint: 'She is nine feet at the shoulder and he is a Count of a hundred and six, and those two numbers do not go together.',
      payoffHint: 'A bond pools Count, so a bond is a place to put it. His sword is called Mercy and his tiger is called Grace and both of them are accounting.',
      weight: 0.95,
    },
    {
      id: 'p_the_healer',
      kind: 'RELATIONSHIP',
      label: 'What it costs her every time',
      seedHint: 'She lies for a stranger in front of four hundred people and then makes a joke about thumbs.',
      payoffHint: 'She was a Fifth at her Weighing and she is a Ninth now, and she is nineteen months from Unrated, and she has done the arithmetic more than once.',
      weight: 0.9,
    },
    {
      id: 'p_the_ninth',
      kind: 'RIVAL',
      label: 'Who the pale man used to be',
      seedHint: 'He has not aged, he reads dark, and he speaks about the founding of the Assize in the first person without noticing.',
      payoffHint: 'He was one of the nine who built the Ledger. The dam is his, he was proud of it, and the hundred and forty years since have been one very long correction.',
      weight: 0.85,
    },
    {
      id: 'p_the_survey',
      kind: 'THEME',
      label: 'What Orenne does when the wild runs out',
      seedHint: 'An old woman on the ridge says you could not walk this path at dusk when she was a girl.',
      payoffHint: 'Nine pages in the third registry, passive voice, no signature, observing that the realm contains a great many people of Ninth and Unrated rank. It does not recommend anything. It is a survey.',
      weight: 0.8,
    },
  ],
  /**
   * The three First Forms.
   *
   * Not classes and not jobs. Each is a different answer to the question *what
   * do you do with power that came out of something else* — Blade gives it
   * outward, Staff listens to what it used to belong to, Hand keeps it. None is
   * the right answer and the whole world is playable with any of them.
   *
   * Every Form's second gift arrives inside the first act rather than at the end
   * of a grind, because a player who picked Blade wanted a monster and should
   * get one soon.
   */
  archetypes: [
    {
      id: 'arch_blade',
      name: 'Blade',
      role: 'A sword, and one day a bond',
      summary:
        'Dangerous from the first hour, and the thing you are actually for arrives early: beat a wild creature, spare it, and pool what you carry with it. Every bond leaves you weaker, and not alone.',
      playstyle: ['Capable at once', 'Collects', 'Weakest of its band'],
      blurb: 'Veterans cut a notch in the crossguard for every bond, so a long career looks like a comb of little cuts.',
      attributeBonus: { might: 3, presence: 1 },
      skillProficiencies: { edge: 3, handle: 2, notice: 1, focus: 0 },
      startingItems: [{ itemId: 'form_blade', qty: 1 }],
      startingAbilities: ['bond'],
      startingReputation: [{ factionId: 'faction_march', amount: 5 }],
    },
    {
      id: 'arch_staff',
      name: 'Staff',
      role: 'Force, and what the dead say',
      summary:
        'Direct, tiring and effective. On your first kill you hear it go, which is usually not language and worse for it. Later that widens to the living, and is no use at all in a market.',
      playstyle: ['Knows first', 'Carries what it killed', 'Wearing'],
      blurb: 'It does not work on the man in black, which is the earliest hard evidence that something about him is wrong.',
      attributeBonus: { mind: 3, arcana: 2 },
      skillProficiencies: { focus: 3, notice: 2, talk: 1, edge: 0 },
      startingItems: [{ itemId: 'form_staff', qty: 1 }],
      startingAbilities: ['residue', 'hearing'],
      startingReputation: [{ factionId: 'faction_assize', amount: 5 }],
    },
    {
      id: 'arch_hand',
      name: 'Hand',
      role: 'Nothing can be taken from you',
      summary:
        'No weapon, and strikes that carry more than the body should manage. Nothing drains, reads or bonds you without your say. The slowest of the three, and the only one that can give what it holds.',
      playstyle: ['Patient', 'Underestimated', 'Gives it away'],
      blurb: 'Historically the Form of people who could not afford a sword, which is accurate and still said out loud.',
      attributeBonus: { resolve: 3, might: 2 },
      skillProficiencies: { endure: 3, edge: 2, mend: 1, talk: 0 },
      startingItems: [{ itemId: 'form_wraps', qty: 1 }],
      startingAbilities: ['sealed', 'grant'],
      startingReputation: [{ factionId: 'faction_underbridge', amount: 15 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What are you telling people your name is?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sarrow' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'How are you going to hold it?',
      helpText:
        'Your First Form, declared at the Weighing like everybody else’s, and fixed for the rest of your life. It sets what you are good at and what your second gift will be. It does not set what you believe about the Ledger, whose side you take, or what you do with the first thing you beat — all of that is yours, on every road, for the whole story.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'whatYouRemember',
      label: 'What do you remember of before?',
      helpText:
        'As much or as little as you like. Nobody here believes you either way, two people find the claim boring, and one finds it extremely interesting for reasons of his own. Nothing in the world checks.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. A hospital corridor, and the fact that I was thirty-four, not eighteen.',
    },
  ],
  endings: [
    {
      id: 'end_balanced_page',
      name: 'A Balanced Page',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['chose:the_page_balances'], flagsUnset: ['chose:the_dam_breaks'] },
      condition:
        'The player came down on the side of the thing that keeps the roads safe. The Assize closes the error, writes them a row, and gives them a number, and the number is small. Play it as a real peace rather than a defeat: the Ledger holds, Hale goes home for the winter, and the sixty-year clock in the survey is still running and now it is partly theirs.',
      epilogue:
        'They give you a Ninth, which is fair, and a copy of the return with your name spelled correctly. The stone reads you on the second attempt and the hall does not make any sound at all, because it is an ordinary Tuesday and you are an ordinary entry. You are, for the first time since the barley field, a person that somebody can look up.',
      hint: '',
    },
    {
      id: 'end_second_vault',
      name: 'The Second Vault',
      rarity: 'COMMON',
      minTurn: 35,
      requires: { flagsSet: ['is:the_second_vault'] },
      condition:
        'The player agreed, knowingly or not quite, to be the place Aurelian puts what he takes. Written from inside the forty good years that follow, and it is comfortable, and he remains the best man they ever met. The last line is a question about the forty-first. Do not make him sinister in the epilogue; the horror is entirely structural.',
      epilogue:
        'The southern road is warded for eleven years without a gap, which has never happened. Halloway rings its bell at midsummer for the fair and for nothing else. He writes to you every spring, properly, in his own hand, and asks after you before he asks for anything, and he always asks for something, and you always say yes, and you have both stopped noticing that.',
      hint: '',
    },
    {
      id: 'end_dam_breaks',
      name: 'The Dam Breaks',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['chose:the_dam_breaks'] },
      condition:
        'A hundred and forty years goes back out into the world. Do not stage it as a victory or a catastrophe — stage it as a spring. Too much green, too fast, everywhere, and nobody on the walls. The dying happens in the two winters after and the epilogue must not skip them.',
      epilogue:
        'It comes back into the ground first, and then into everything growing in it, and the second year the barley goes over a man’s head and nobody has the hands to cut it. Two winters. The roads go one at a time. And in the fourth spring a child on the chalk downs beats a ridge-wolf with a stick and something happens to her that has not happened to anybody in Orenne for a hundred and forty years, and nobody writes it down.',
      hint: 'He will tell you the cost himself, once, and never raise it again.',
    },
    {
      id: 'end_long_notch',
      name: 'The Long Notch',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['bonded:first'], flagsUnset: ['took:the_drake'] },
      condition:
        'The player gave it away, over and over, and arrives at the end personally feebler than a Ninth farmhand and surrounded by things that were trying to kill them once. Nothing in Orenne has a procedure for this. Play the last scene from the point of view of what is standing around them rather than of what they can do.',
      epilogue:
        'A crossguard with more notches than steel between them. You could lose a fight to almost anybody in Sablecourt and it has not come up, because it never gets that far, because there is always something between you and them that decided years ago not to eat you and has not revisited it since.',
      hint: '',
    },
    {
      id: 'end_the_school',
      name: 'The School',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['granted:rill'] },
      condition:
        'A Hand who gave it away to people rather than kept it. They end near-Unrated at the end of the world, and the people they granted to came. Not a last stand and not a rescue — the point is that nobody had to be asked twice.',
      epilogue:
        'Eleven of them in the Gilt Yard, and every single one could take you now, and one of them is a healer with her coat buttoned for once and her hair up properly and the light not going through her anywhere. Nobody says anything about it. It is very early and somebody has brought bread.',
      hint: '',
    },
    {
      id: 'end_what_grace_was_carrying',
      name: 'What Grace Was Carrying',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['knows:grace_is_a_vault', 'refused:the_vault'] },
      condition:
        'The player worked out the vault and said it to his face, and refused him. It does not end in a fight and he does not deny it. He explains, calmly, and the explanation is good, and he is still the best man in Orenne, and he is still going to need somewhere to put it. Leave it unresolved on purpose.',
      epilogue:
        'He listens to the whole thing without interrupting once, which is the worst part. Then he says: "Yes." And then he asks what you would have done about the Halloway road, and he is not being clever — he genuinely wants to know, and he waits, and the tiger breathes beside him, and you do not have an answer that fits in a sentence.',
      hint: 'Do the arithmetic. Her size against his Count.',
    },
    {
      id: 'end_nineteen_months',
      name: 'Nineteen Months',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['knows:rill_is_spending_herself'], flagsUnset: ['protecting:rill'] },
      condition:
        'Amaryllis Quist reaches Unrated. Never play this as a death. She is twenty-four and legally no longer a person, in a city where that means the Underbridge, and she will make a joke about it inside the first minute. Whether the player tried, failed, or was somewhere else entirely, this ending is about what she decided it was worth — and she is entirely clear that it was.',
      epilogue:
        'The stone goes dark under her hand and she laughs, actually laughs, because after eleven years of certifying other people she has finally done something funny. She is under the bridge by the autumn. She still goes out on the unlicensed rounds. She cannot close anything any more so she sets bones and holds hands and tells people it is a thumb’s worth, and she is not lying now, because there is nothing left to spend and she is still there at four in the morning.',
      hint: '',
    },
    {
      id: 'end_the_field',
      name: 'The Field Two Hours From Sablecourt',
      rarity: 'UNIQUE',
      minTurn: 12,
      requires: { flagsSet: ['took:first_count'], flagsUnset: ['has:standing'] },
      condition:
        'The player dies Unrated, unrecorded, holding whatever they had taken. The only ending in which the dam is measurably weaker afterwards. Four lines, from nobody’s point of view, no eulogy, and absolutely no suggestion that it meant anything to anyone.',
      epilogue:
        'What you were carrying goes out the old way, into the ground, the way everything used to. The Ledger does not record a loss because the Ledger never recorded a gain. Somewhere in the third registry a page balances that has not balanced in eleven months, and Cardew Hale closes the file and goes home for the winter.',
      hint: '',
    },
  ],
  opening:
    'The stone is black, worn concave by a hundred years of hands, and it is your turn.\n\n' +
    'Voss Marrin takes your wrist and puts your palm flat. Fingers apart. It does not hurt. About four seconds.\n\n' +
    'Nothing happens.\n\n' +
    'She frowns at the stone rather than at you, and puts your hand back down.\n\n' +
    'Nothing happens.\n\n' +
    'Behind you, four hundred people go quiet in the particular embarrassed way of a crowd watching somebody find out something terrible in public.\n\n' +
    '"I am required to call for the healer on duty," Marrin says, to you, before she does it.\n\n' +
    'The woman who comes down the steps is twenty-four, red hair out of its pins, coat open over something much too bright for an Assize hall. She kneels, takes your wrist, and holds it two seconds longer than she needs to.\n\n' +
    'Then she stands and tells the room the stone is faulty.',
  openingSuggestions: [
    'I keep my hand where it is and say, quietly, only to her: "It is not faulty, is it." I want to see what her face does before she decides what to say.',
    'I let her pull me up and go with it — loudly, cheerfully, to the whole hall. "Right. Faulty stone. Who do I see about a second go?" If she is going to lie for me I am not going to make her do it alone.',
    'I say nothing to her at all. I look past her, up at the gallery rail, at the man in black who has not moved once since I put my hand down and is still looking straight at me.',
  ],
  publishedAt: null,
};

export const UNCOUNTED = StoryVersion.parse(raw);
