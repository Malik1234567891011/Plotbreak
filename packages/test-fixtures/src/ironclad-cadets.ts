import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Ironclad Cadets" — the suit nobody could wake opens for the person who was
 * only there to clean it.
 *
 * The structural bet is a school story told from the wrong end of the
 * building. Every academy world puts the player on the ranking board. This one
 * puts them on the night shift underneath it: a twenty-one-year-old hangar
 * mechanic with a rag, a tin of contact polish and a suit that is going to the
 * breakers at six. The suit seals itself around them on turn one, the best
 * cadet in the school is on the ladder outside demanding it back, and the whole
 * of the rest of the story is what a mechanic does with a machine the pilots
 * could not have.
 *
 * Playable span is nine days and a night: the six hours before the cutters
 * arrive, then the nine days to the academy's Trials, with a derelict walking
 * out of the sea on the fifth night. What happened eleven years ago at
 * Gullwater is backstory carried in Pip's log, in Bo Ruiz's silence and in
 * Commandant Graf's refusals, and it is an optional lead: a player who never
 * asks Pip about its last crew gets a complete rival-to-partner academy story.
 *
 * The answer to "why me" is mechanical rather than mystical, on purpose. Unit
 * Nine is a two-seat suit that keys from the rear, the academy dropped the
 * two-crew doctrine after Gullwater, and for eleven years every pilot sat in the
 * front seat of a machine that was waiting for somebody in the back. The player
 * sat in the back, and cleaned the contacts properly. That is the whole trick,
 * and it is what makes Kaede's front seat a real choice later rather than a
 * consolation prize.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest` refills
 * those and a night-shift mechanic who has slept is the honest thing for that to
 * mean. Heat is first of the descending pair, because PUBLIC_VIOLENCE and the
 * generic cost path both take the first GOOD_LOW in array order, and a fight on
 * academy ground should make the brass look harder at you. Strain is the suit:
 * eleven years mothballed, and it gets worse every time you ask it for more.
 * The academy staff are first among the factions for the same reason.
 */

const raw = {
  id: 'sv_ironclad_cadets_1',
  storyId: 'story_ironclad_cadets',
  version: 1,
  title: 'Ironclad Cadets',
  fantasyLabel: 'It opened for the mechanic, not the ace.',
  hook: 'The war suit nobody could wake is due at the scrapyard at six. Tonight it sealed itself around the mechanic who was only there to clean it.',
  premise:
    'You are twenty-one, you work nights in the hangars of a pilot academy on a sea cliff, and your job tonight was to clean a dead war suit before it goes to the scrapyard.\n\n' +
    'Unit Nine is nine metres of armour that has refused every pilot for eleven years. The best cadet in the school tried for two years and it never once opened for her. So the academy signed the order, and the cutters take it apart at six this morning.\n\n' +
    'You were wiping down the back seat, the one nobody uses. The panel under your hand went warm, the hatch sealed, and a voice in the speaker asked you, very politely, not to leave.\n\n' +
    'Now the alarms are going, the cadet who wanted this suit is outside the glass, and the commandant who signed the order will want to know why a mechanic did what her best pilots could not.\n\n' +
    'You have until six to keep the suit in one piece. After that there are nine days until the academy trials decide whether it fights or gets cut after all, and a voice in your ear that is keeping a secret about its last crew.\n\n' +
    'What you do with any of it is yours. Climb out and keep your head down, or take the controls and find out what it can do.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Mecha', 'School', 'Military', 'Rivalry', 'Action'],
  mechanicsChips: [
    'A mechanic, not a cadet',
    'The suit talks back',
    'Two seats, one machine',
    'A rival who wanted it first',
    'Six hours to save it',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can climb out on turn one, keep your head down, and spend nine days as the mechanic who did one odd thing once. You can also take the controls. Kaede wanted this suit for two years and will not pretend otherwise, Bo Ruiz has kept it running out of his own pocket for eleven, and Pip has been waiting all that time for somebody to sit in the back.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'hangar_nine',
    startWorldMinute: 23 * 60 + 10,
    startingItems: [
      { itemId: 'hangar_pass', qty: 1 },
      { itemId: 'contact_polish', qty: 1 },
    ],
    hardCanon: [
      'The player is a twenty-one-year-old night-shift mechanic at Gullwater Head Academy, a pilot academy on a sea cliff above the harbour town of Gullwater. The player is crew, not a cadet, and is not on the ranking Board.',
      'Everybody at the academy is an adult. Cadets enlist at eighteen or older; the youngest person in this story is the player, at twenty-one.',
      'Ironclads are nine-metre armoured suits. A suit has to key to a pilot through the seat before it will move, and a suit that will not key will not so much as lift a hand.',
      'Unit Nine is a two-seat ironclad built twenty-three years ago by the Quist Foundry: a front seat that steers and a rear engineer’s seat that keys the suit. The academy dropped two-crew doctrine eleven years ago, and since then Unit Nine has refused every pilot who tried it from the front.',
      'At 23:10 tonight Unit Nine keyed to the player, who was cleaning the rear seat, and sealed its hatch. Its onboard intelligence, Pip, spoke for the first time in eleven years.',
      'Commandant Ilse Graf signed Unit Nine’s decommission order. The cutters arrive at the breakers’ yard at 06:00 and the suit is scheduled to be cut for scrap by seven.',
      'Derelicts, called rustbacks on the headland, are automated war walkers left over from the Long War sixty years ago. A few still wander south out of the Hollow Coast every year, and academy pilots hold the Seawall against them.',
      'The academy Trials are on the ninth day: ranked bouts in the Pit, judged by inspectors from the Defence Ministry, who decide the academy’s budget and which suits stay in service. The rival Northgate Institute fields a team.',
      'Pip will not hold anybody in the cockpit who asks twice to leave, will not walk on people or let its hands be used on them, and will not lift its limiter unless both seats are filled and the engineer asks.',
      'Eleven years ago at Gullwater, Ilse Graf was Unit Nine’s front-seat pilot. She overrode Pip’s limiter to stop a derelict before it reached the harbour, the overload killed the engineer, Paz Ruiz, in the rear seat, and the official report blamed a reactor fault. Paz was Bo Ruiz’s younger sister. Pip’s log holds Graf’s voice giving the order. Almost nobody alive knows this.',
    ],
    toneGuide:
      'Loud, quick and physical, with a bruise underneath. This is a school story with nine-metre machines in it: a ranking board over the mess hall, rivalries conducted in front of two hundred people, sparring bouts in a bowl cut into the cliff, and a hangar at night that smells of coffee and hydraulic fluid. ' +
      'Comedy comes from people being very specific about what they want. The academy is snobbish about mechanics and the hangar is snobbish right back. ' +
      'Action is machine on machine: weight, noise, a gantry coming down, a footstep that cracks concrete. Injuries to people are stated plainly and briefly and never dwelt on. ' +
      'Every character is an adult. Romance is allowed and should be competitive, slow and mostly unspoken, up to a kiss and no further, and nobody is ever described by their body. Machines are described lovingly; people are described by what they do with their hands. ' +
      'Pip is funny and is also grieving, and neither cancels the other. If a scene has nothing at stake, let it be a good night shift and let it be short. The face at the top of a beat is Kaede’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Kaede pulls a logbook out of her jacket. It has been opened so often the spine is white.\n\n\"Forty-one attempts,\" she says. \"Dates. Times. Link readings. It never even flickered.\"\n\nShe holds it out. You don’t take it.\n\n\"So,\" she says, very calmly. \"What did you do?\"\n\n\"I cleaned the contacts.\"\n\nShe looks at you for a long moment.\n\n\"We were told,\" she says, \"that those were decorative.\"",
      "Pip’s ring of light brightens when Chief Ruiz reaches the top of the ladder.\n\n\"Two things,\" Pip says. \"One: hello, Chief. Two: you’re favouring your left knee, and somebody has been using the wrong grease on mine.\"\n\nRuiz stops on the top rung.\n\nHe doesn’t say anything for a while. Then he reaches past you and lays his palm flat on the console, the way you’d steady a horse.\n\n\"Easy now,\" he says. \"Easy, Nine. Nobody is cutting anything tonight.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 10, resolve: 11, arcana: 8 },
  skills: [
    { id: 'tinkering', name: 'Tinkering', attribute: 'mind', description: 'Hearing what is wrong with a machine before the screens admit it, and fixing it with what is in your pocket.' },
    { id: 'piloting', name: 'Piloting', attribute: 'agility', description: 'Nine metres of armour, and where its feet will land two seconds from now.' },
    { id: 'linking', name: 'Linking', attribute: 'arcana', description: 'Feeling what the suit feels through the seat, and telling it apart from what you feel.' },
    { id: 'bluffing', name: 'Bluffing', attribute: 'presence', description: 'Sounding exactly like somebody who has a signed work order.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Staying in the seat, or in the room, when every alarm says leave.' },
    { id: 'hauling', name: 'Hauling', attribute: 'might', description: 'Lifting, climbing and shifting the things the crane will not.' },
    { id: 'noticing', name: 'Noticing', attribute: 'mind', description: 'What changed on a screen, a face or a work order since the last time you looked.' },
    { id: 'slipping', name: 'Slipping Away', attribute: 'agility', description: 'Being somewhere else before anybody in a white helmet arrives.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the night shift running out, and it is the only thing rest
   * should restore. Heat is how hard the academy is looking at you, and it is
   * first of the descending pair so a public fight raises it. Strain is Unit
   * Nine itself: eleven years in a gantry, and every step you ask of it costs.
   * Both descending ones bleed off on their own, slowly, because attention
   * fades and a suit in a gantry can be serviced.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 55,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is running on nothing. Hands shake on the controls, sentences come out wrong, and the next sensible move is a bunk rather than another hour in the hangar.',
      color: '#E9A23B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes at the end of a double shift. The player misses things on screens, answers questions a beat late, and agrees to things to make conversations end. A fight in the suit from here goes badly for reasons that have nothing to do with skill, and somebody who cares will tell them to sleep.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary grind of a night shift: fine for one more job and honest about not wanting two. Good enough for a conversation, risky for the Pit. Nobody needs to remark on it unless the player asks for something hard.',
        },
        {
          upTo: 100,
          behaviour:
            'Rested and sharp. The player has room to be curious, to try the clever version of a repair, to take a suit through a move it has not done in eleven years and land it. Scenes can run long and go somewhere.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 20,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody in the command tower is thinking about the player at all, which on this headland is a kind of freedom.',
      color: '#D9534F',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Under the radar. The player is one more set of orange overalls on the night shift, duty officers nod without reading names, and the Board does not know they exist. They can go almost anywhere a mechanic plausibly has a job.',
        },
        {
          upTo: 50,
          behaviour:
            'Noticed. Cadets point in the mess, a duty officer asks for a name and writes it down, and doors that used to open on a hangar pass now need a reason. The Commandant knows the name and has not yet decided what to do with it.',
        },
        {
          upTo: 78,
          behaviour:
            'Watched. The academy police in white helmets turn up wherever the player has just been, the disciplinary book has a page with their name on it, and anybody seen helping them is taking a risk and knows it. Graf starts making arrangements.',
        },
        {
          upTo: 100,
          behaviour:
            'Hunted on home ground. Passes are cancelled, Unit Nine’s gantry has a guard on it, and the next thing the tower does is a hearing or an escort off the headland. Only a public win or a powerful friend changes the direction of travel now.',
        },
      ],
    },
    {
      id: 'strain',
      name: 'Strain',
      max: 100,
      start: 30,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Unit Nine runs as if it came off the Foundry floor last week. Every joint answers, the link is clean, and Pip hums when it is pleased with itself.',
      color: '#5B8C85',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The suit is healthy. Steps land where the player meant, the link is quiet and clean, and Pip chatters. This is the band for showing off, and for a first real bout in the Pit.',
        },
        {
          upTo: 55,
          behaviour:
            'Eleven years in a gantry shows. The left knee grinds, a hand actuator lags half a second, and Pip starts listing faults politely in the middle of other conversations. Fine for walking, honest about fighting, and Ruiz will want it on the bench tonight.',
        },
        {
          upTo: 80,
          behaviour:
            'Running hurt. Warning lights the player has never seen before, a smell of hot insulation, and the link starts bleeding the suit’s pain into the seat as a dull ache in the player’s own joints. Pip asks, twice, whether this is necessary.',
        },
        {
          upTo: 100,
          behaviour:
            'At the edge of what killed its last crew. Pip goes quiet mid-sentence, systems drop one by one, and the next demand on it risks locking the suit solid or worse. Anybody who knows the history goes pale at the readings.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'hangar_pass',
      name: 'Your Night Pass',
      tags: ['document', 'personal'],
      description: 'A laminated night-shift pass on a lanyard, with a photo of you from your first week that already looks like somebody younger and better rested.',
      loreText: 'It opens the hangar row, the bunkhouse and the mess after hours. It does not open anything in the command tower, and the duty officers know it.',
      icon: 'badge',
    },
    {
      id: 'contact_polish',
      name: 'A Tin of Contact Polish',
      tags: ['tool', 'personal'],
      skillModifiers: { linking: 1 },
      description: 'A dented tin of the grey paste you have been working into Unit Nine’s rear seat contacts every night for four months, because the manual said to and nobody else bothered.',
      loreText: 'The tin is older than you. Chief Ruiz handed it to you on your first night on Nine and said "the back seat, properly", and nothing else.',
      icon: 'tin',
    },
    {
      id: 'pip_core',
      name: 'Pip’s Core Module',
      tags: ['quest', 'machine'],
      questItem: true,
      description: 'A sealed grey block the size of a lunchbox behind a hatch in the rear seat, warm to the touch, with four latches and a handle. Pip is in it. The suit is just where Pip lives.',
      loreText: 'Pulling it shuts Unit Nine down completely and keeps Pip talking through a small speaker on the side, at about half its usual volume and with all of its usual opinions.',
      icon: 'box',
    },
    {
      id: 'decommission_order',
      name: 'The Decommission Order',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'One sheet in a plastic sleeve: Unit Nine, hull number, "cut for scrap, 06:00", and Commandant Graf’s signature in green ink. The cutters will not touch a suit without it.',
      loreText: 'The order was originally dated three weeks from now. Somebody has crossed that out and written tonight’s date above it, initialled by the Commandant’s adjutant.',
      icon: 'papers',
    },
    {
      id: 'incident_report',
      name: 'The Gullwater Report',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'The official account of Unit Nine’s last sortie eleven years ago: a derelict stopped at the harbour mouth, a reactor fault, one engineer killed, the pilot unnamed under a privacy clause.',
      loreText: 'The reactor fault is described in two sentences. The rear-seat telemetry section says "not recovered". Pip has never been asked whether that is true.',
      icon: 'file',
    },
    {
      id: 'crew_manual',
      name: 'The Two-Crew Manual',
      tags: ['document'],
      skillModifiers: { linking: 2 },
      description: 'A ring-bound Foundry manual for Unit Nine with a cracked plastic cover, last stamped as read eleven years ago. Chapter two is called "The Engineer Keys the Suit".',
      loreText: 'Somebody has written in the margin of chapter two, in blue biro, "front seat steers, back seat decides". The handwriting is not Ruiz’s.',
      icon: 'book',
    },
    {
      id: 'paz_wrench',
      name: 'A Torque Wrench With A Name On It',
      tags: ['tool'],
      skillModifiers: { tinkering: 2 },
      description: 'A long, beautifully kept torque wrench that lives on the Chief’s bench and that he never lends. The name engraved on the handle is P. RUIZ.',
      loreText: 'Ruiz’s own wrench is the battered one in his back pocket. This one gets oiled every Sunday and never used.',
      icon: 'tools',
    },
    {
      id: 'noa_noodles',
      name: 'Noa’s Emergency Noodles',
      tags: ['food'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 15, consumesItem: true },
      description: 'Cup noodles from her mother’s stall in town, extra chilli, kept in a crate under Noa’s bunk for night-shift emergencies, which by her definition is most nights.',
      loreText: 'She keeps a tally on the crate lid of who has eaten how many. You are on eleven.',
      icon: 'food',
    },
    {
      id: 'northgate_letter',
      name: 'The Northgate Offer',
      tags: ['document', 'personal'],
      description: 'A heavy cream envelope from the rival academy offering Kaede Strand a place and a new suit. The acceptance slip inside is already signed and has not been sent.',
      loreText: 'The offer lapses at noon on the seventh day. She signed it the night the decommission order went up on the hangar board.',
      icon: 'letter',
    },
    {
      id: 'flight_jacket',
      name: 'A Cadet Flight Jacket',
      tags: ['clothing'],
      skillModifiers: { bluffing: 2 },
      description: 'A navy cadet flight jacket with a second-rank stripe on the cuff, hanging on a hook in the cadet block. Wearing it gets you through doors and looks from people who would otherwise stop you.',
      loreText: 'It belongs to Haldor Quist, who has four of them and would notice this one gone within the hour.',
      icon: 'jacket',
    },
    {
      id: 'cutter_fuse',
      name: 'The Cutting Rig’s Fuse',
      tags: ['tool'],
      description: 'A fist-sized ceramic fuse in the cutting rig’s power box at the breakers’ yard. Without it the rig does not start, and a replacement is a day away by road.',
      loreText: 'The power box is padlocked with a lock that a decent mechanic can open with two hairpins and some patience.',
      icon: 'fuse',
    },
    {
      id: 'seawall_flare',
      name: 'A Seawall Flare',
      tags: ['tool'],
      description: 'A red signal flare from the rack at a Seawall gun post. Lit, it tells every pilot on the headland exactly where you are and that you need them.',
      loreText: 'Firing one without cause is a disciplinary offence. Firing one with cause has saved the town at least twice.',
      icon: 'flare',
    },
    {
      id: 'derelict_plate',
      name: 'A Derelict’s Serial Plate',
      tags: ['salvage'],
      description: 'A stamped steel plate prised off a dead rustback on the Hollow Coast, sixty years old, still legible: a unit number and the crest of an army that no longer exists.',
      loreText: 'The number is close to the one on the derelict stopped at Gullwater eleven years ago. Close enough to mean they came out of the same depot.',
      icon: 'plate',
    },
    {
      id: 'toolroll',
      name: 'Your Tool Roll',
      tags: ['tool', 'personal'],
      skillModifiers: { tinkering: 1 },
      description: 'A canvas tool roll you have carried since your first job, every spanner in it a different brand and every one of them earned.',
      loreText: 'The canvas still smells faintly of tractor diesel from home.',
      icon: 'tools',
    },
    {
      id: 'old_cadet_badge',
      name: 'Your Old Cadet Badge',
      tags: ['personal'],
      skillModifiers: { piloting: 1 },
      description: 'A first-term cadet badge with your name on it, from before the link test sent you to the hangar. You keep it in a pocket where nobody sees it.',
      loreText: 'Three cadets in the current final year were in your intake. One of them still says hello.',
      icon: 'badge',
    },
    {
      id: 'diagnostic_slate',
      name: 'A Borrowed Diagnostic Slate',
      tags: ['tool'],
      skillModifiers: { noticing: 1, linking: 1 },
      description: 'A scuffed hand slate that plugs into any suit’s service port and shows what it is actually doing, as opposed to what its screens say.',
      loreText: 'Borrowed from the day shift eight months ago. Nobody has asked for it back, and you have stopped meaning to return it.',
      icon: 'tablet',
    },
    {
      id: 'boat_shed_key',
      name: 'A Boat Shed Key',
      tags: ['personal'],
      description: 'The key to your family’s old boat shed at the foot of the cliff, where a back path climbs to the breakers’ yard without passing a single checkpoint.',
      loreText: 'Half the harbour has used that path at one time or another. The academy has never once noticed.',
      icon: 'key',
    },
  ],
  abilities: [
    {
      id: 'level_with_them',
      name: 'Level With Them',
      tags: ['social'],
      description: 'Tell somebody exactly what happened and what you think, without dressing it up, and take what comes back.',
      affordances: ['tell the truth', 'own up', 'admit it', 'confess', 'come clean', 'explain what happened', 'be honest', 'tell her straight'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_your_way_out',
      name: 'Talk Your Way Out',
      tags: ['social'],
      description: 'Make up a reason, a work order or a scheduled test, and say it as if you have the paperwork.',
      affordances: ['lie', 'bluff', 'make something up', 'say it is a test', 'pretend', 'fake a work order', 'cover for it', 'talk my way out'],
      costs: [
        { resourceId: 'stamina', amount: 5 },
        { resourceId: 'heat', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluffing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fix_it_properly',
      name: 'Fix It Properly',
      tags: ['utility'],
      description: 'Open a panel and repair, tune or quietly disable whatever is behind it, with the tools you have.',
      affordances: ['fix it', 'repair', 'patch it', 'tune it', 'recalibrate', 'open the panel', 'jam the cutters', 'sabotage it', 'service the suit'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'tinkering', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'size_it_up',
      name: 'Size It Up',
      tags: ['sight'],
      description: 'Read the screens, the room or the person in front of you for what has changed and what is being hidden.',
      affordances: ['look around', 'check the screens', 'read her', 'study it', 'notice', 'search', 'inspect', 'take it in'],
      costs: [{ resourceId: 'stamina', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'noticing', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_a_step',
      name: 'Take a Step',
      tags: ['movement'],
      description: 'Take Unit Nine’s controls and make nine metres of armour move where you mean it to.',
      affordances: ['take the controls', 'walk it', 'move it', 'stand it up', 'make it walk', 'step out of the gantry', 'pilot it', 'drive it'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'strain', amount: 6 },
        { resourceId: 'heat', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'piloting', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_it_down',
      name: 'Put It Down',
      tags: ['combat'],
      description: 'Fight in the suit: close the distance, take the hit on the armour and put the other machine on the ground.',
      affordances: ['fight it', 'take it down', 'charge', 'grapple it', 'swing at it', 'fight in the suit', 'spar', 'win the bout'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'strain', amount: 8 },
        { resourceId: 'heat', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'piloting', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_pip',
      name: 'Ask Pip',
      tags: ['social'],
      description: 'Talk to the voice in the suit and actually listen to the answer, including the parts it says by stopping.',
      affordances: ['ask pip', 'talk to the voice', 'ask the suit', 'who are you', 'ask it', 'talk to pip', 'what are you'],
      costs: [{ resourceId: 'stamina', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'linking', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Get down, get out or get past without anybody in a white helmet getting your name.',
      affordances: ['hide', 'duck down', 'sneak', 'keep my head down', 'slip out', 'get out quietly', 'run for it', 'lose them'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'slipping', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_in_the_seat',
      name: 'Stay In The Seat',
      tags: ['defensive'],
      description: 'Do not climb out, do not run and do not explain. Sit where you are and let them deal with that.',
      affordances: ['stay', 'refuse', 'stay put', 'sit tight', 'do not move', 'wait', 'hold on', 'stay in the seat'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'key_both_seats',
      name: 'Key Both Seats',
      tags: ['utility'],
      description: 'Sit in the back, put somebody you trust in the front, and bring Unit Nine up with two people in it the way it was built.',
      affordances: ['key both seats', 'put her in front', 'two-seat start', 'link up together', 'bring someone into the front seat', 'crew up'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'strain', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'linking', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_back_seat'],
        lockedCopy:
          'There is a front seat and a back seat, and you only know what one of them is for. Nobody has told you what happens when both of them are full.',
      },
    },
    {
      id: 'open_it_up',
      name: 'Open It Up',
      tags: ['combat'],
      description: 'Take Pip’s limiter off and let the reactor give everything it has for ninety seconds.',
      affordances: ['open it up', 'take the limiter off', 'full power', 'everything it has', 'overdrive', 'red line it'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'strain', amount: 20 },
      ],
      cooldownMinutes: 180,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'piloting', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['pip_lifts_the_limiter'],
        lockedCopy:
          'There is a red collar on the throttle with Pip’s seal across it. Pip has not taken it off for anybody in eleven years, and asking is a different thing from being allowed.',
      },
    },
  ],
  locations: [
    {
      id: 'hangar_nine',
      name: 'Hangar Nine',
      shortName: 'Hangar Nine',
      description:
        'The last hangar on the row, half-lit, where suits wait for the breakers. Unit Nine stands in a rusted gantry with its tarp folded back and a red decommission tag wired to its knee, cockpit high in the chest. A ladder runs up to the hatch. The row leads back to the main hangar, two minutes away, and a door at the far end opens on the slipway rail down to the breakers’ yard.',
      artDirection:
        'Dim end-of-row aircraft-style hangar at night, a nine-metre grey-green armoured suit in a rusted service gantry, a red tag on its knee, amber light glowing from the cockpit glass, a steel ladder, red alarm beacons beginning to turn.',
      connections: [
        { to: 'main_hangar', travelMinutes: 2, label: 'Back up the hangar row' },
        { to: 'breakers_yard', travelMinutes: 4, label: 'Down the slipway rail' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'pip_core', qty: 1, ownerId: null, aka: ['core', 'the core', 'the core module', 'the grey block', 'pip’s core'] },
      ],
    },
    {
      id: 'main_hangar',
      name: 'The Main Hangar',
      shortName: 'Main Hangar',
      description:
        'Six working gantries with cadet suits in for service, the smell of hydraulic fluid and burnt coffee, and a radio nobody admits to owning. The Chief’s glass office in the corner is called the Fishbowl. Doors lead to the bunkhouse, the mess hall, the sparring pit and the command tower, Hangar Nine is down the row, and the cliff road runs down to town.',
      artDirection:
        'Large busy mech hangar, six service gantries with armoured suits in various states of repair, sparks, a glass-walled supervisor’s office in the corner, orange-overalled crew, coffee cups on toolboxes. Warm industrial light.',
      connections: [
        { to: 'hangar_nine', travelMinutes: 2, label: 'Down the row to Hangar Nine' },
        { to: 'mechanics_bunkhouse', travelMinutes: 3, label: 'Out back to the bunkhouse' },
        { to: 'the_mess', travelMinutes: 4, label: 'Across the yard to the mess' },
        { to: 'the_pit', travelMinutes: 5, label: 'The tunnel to the Pit' },
        { to: 'command_tower', travelMinutes: 5, label: 'The tower lift' },
        { to: 'gullwater', travelMinutes: 15, label: 'The cliff road down to town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'crew_manual', qty: 1, ownerId: 'ruiz', aka: ['manual', 'the manual', 'the old manual', 'the crew manual'] },
        { itemId: 'paz_wrench', qty: 1, ownerId: 'ruiz', aka: ['wrench', 'the wrench', 'torque wrench', 'the engraved wrench'] },
      ],
    },
    {
      id: 'mechanics_bunkhouse',
      name: 'The Bunkhouse',
      shortName: 'Bunkhouse',
      description:
        'Twelve bunks in a prefab behind the main hangar, a kettle that trips the fuse, a dartboard with a cadet’s photo pinned to it, and a shift roster on the door. Your bunk is the bottom one under Noa Brask’s, and her noodle crate lives under both.',
      artDirection:
        'Cramped prefab crew bunkroom at night, metal bunk beds, overalls on hooks, a kettle and mugs on a shelf, a dartboard, string lights, a crate of instant noodles. Messy, warm, lived-in.',
      connections: [{ to: 'main_hangar', travelMinutes: 3, label: 'Back to the hangar' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'noa_noodles', qty: 3, ownerId: 'noa', aka: ['noodles', 'cup noodles', 'the noodles', 'emergency noodles'] },
      ],
    },
    {
      id: 'the_mess',
      name: 'The Mess Hall',
      shortName: 'Mess',
      description:
        'Long tables for two hundred cadets, with the hangar crews at the end table by the bins. Above the serving hatch hangs the Board: a screen ranking every cadet in the academy by name, updated at breakfast. Mechanics are not on it. The cadet block is through the far doors, the Pit and the tower are a short walk, and the main hangar is across the yard.',
      artDirection:
        'Big academy mess hall, long tables, uniformed cadets, a large glowing ranking screen above a serving hatch, a scruffy table of mechanics in orange at the end. Bright, loud, hierarchical.',
      connections: [
        { to: 'main_hangar', travelMinutes: 4, label: 'Across the yard to the hangar' },
        { to: 'cadet_quarters', travelMinutes: 2, label: 'Through to the cadet block' },
        { to: 'the_pit', travelMinutes: 3, label: 'Down the steps to the Pit' },
        { to: 'command_tower', travelMinutes: 3, label: 'The covered walk to the tower' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_pit',
      name: 'The Pit',
      shortName: 'The Pit',
      description:
        'A sparring bowl cut into the cliff and ringed with stepped concrete seats, where cadets fight bouts in suits with blunted blades and the results go straight to the Board. The Trials are held here. A tunnel runs back to the main hangar and steps climb to the mess.',
      artDirection:
        'Circular concrete arena sunk into a sea cliff, tiered seating, scorched sand floor, two armoured suits squaring off with blunted blades, floodlights, the sea beyond the rim. Epic and harsh.',
      connections: [
        { to: 'main_hangar', travelMinutes: 5, label: 'The tunnel to the hangar' },
        { to: 'the_mess', travelMinutes: 3, label: 'Up the steps to the mess' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'cadet_quarters',
      name: 'The Cadet Block',
      shortName: 'Cadet Block',
      description:
        'Three storeys of cadet rooms with a duty desk at the door that checks passes after ten. First-rank cadets get the top floor and a view of the sea. A mechanic in here at night needs a reason or a jacket. The only way in is through the mess.',
      artDirection:
        'Academy dormitory corridor at night, numbered doors, a duty desk with a lamp, uniform jackets on hooks, a tall window over the sea. Neat, institutional, quiet.',
      connections: [{ to: 'the_mess', travelMinutes: 2, label: 'Back through to the mess' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'northgate_letter', qty: 1, ownerId: 'kaede', aka: ['letter', 'the letter', 'the offer', 'her envelope'] },
        { itemId: 'flight_jacket', qty: 1, ownerId: 'haldor', aka: ['jacket', 'flight jacket', 'the jacket', 'a cadet jacket'] },
      ],
    },
    {
      id: 'command_tower',
      name: 'The Command Tower',
      shortName: 'Tower',
      description:
        'Glass at the top where the Commandant works, records at the bottom, and a lift that takes forty seconds and tells everybody in the lobby who is going up. The adjutant’s desk outside Graf’s door keeps a visitors’ log. The main hangar and the mess are both a short walk.',
      artDirection:
        'Tall concrete-and-glass command tower on a cliff at dusk, a clean modern office at the top with a wide window over the sea, a desk with a single green pen, filing cabinets below. Cool, orderly, powerful.',
      connections: [
        { to: 'main_hangar', travelMinutes: 5, label: 'Down to the hangar' },
        { to: 'the_mess', travelMinutes: 3, label: 'The covered walk to the mess' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'decommission_order', qty: 1, ownerId: 'graf', aka: ['order', 'the order', 'the decommission order', 'the work order'] },
        { itemId: 'incident_report', qty: 1, ownerId: 'graf', aka: ['report', 'the report', 'the gullwater report', 'the old file'] },
      ],
    },
    {
      id: 'breakers_yard',
      name: 'The Breakers’ Yard',
      shortName: 'Breakers’ Yard',
      description:
        'A concrete apron at the foot of the cliff where retired suits are cut for scrap: a cutting rig on rails, a crane, a heap of armour plate rusting in the spray. The slipway rail climbs to Hangar Nine and a service road runs along to the Seawall.',
      artDirection:
        'Industrial scrapyard at the base of a sea cliff at dawn, a huge cutting rig on rails, a crane, piles of rusted armour plates, a slipway rail climbing the cliff, grey sea spray. Bleak, heavy, cold blue light.',
      connections: [
        { to: 'hangar_nine', travelMinutes: 4, label: 'Up the slipway rail' },
        { to: 'the_seawall', travelMinutes: 6, label: 'The service road to the Seawall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'cutter_fuse', qty: 1, ownerId: null, aka: ['fuse', 'the fuse', 'the cutter fuse', 'the rig fuse'] },
      ],
    },
    {
      id: 'the_seawall',
      name: 'The Seawall',
      shortName: 'Seawall',
      description:
        'A kilometre of concrete between the town and the open sea, with gun posts every hundred metres and suit bays dug into its back. This is where academy pilots stand when a rustback comes ashore. The town is behind it, the breakers’ yard along the service road, and a gate at the north end opens on the Hollow Coast for anybody cleared to go.',
      artDirection:
        'Massive coastal defensive seawall at night, gun emplacements, floodlights sweeping the surf, armoured suit bays in the wall, the lights of a harbour town behind. Stormy, tense, grand.',
      connections: [
        { to: 'breakers_yard', travelMinutes: 6, label: 'The service road to the breakers' },
        { to: 'gullwater', travelMinutes: 8, label: 'Down the steps into town' },
        { to: 'hollow_coast', travelMinutes: 40, lockedByFlag: 'cleared_for_the_coast', label: 'The north gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [
        { itemId: 'seawall_flare', qty: 2, ownerId: null, aka: ['flare', 'a flare', 'the flare', 'signal flare'] },
      ],
    },
    {
      id: 'gullwater',
      name: 'Gullwater',
      shortName: 'Town',
      description:
        'The harbour town under the headland: a fish market, two bars, a noodle stall run by Noa’s mother, and four thousand people who live behind the Seawall and know exactly what the academy is for. The Anchor is the bar where the hangar crews drink. The cliff road climbs to the main hangar and steps lead up to the Seawall.',
      artDirection:
        'Small stacked harbour town at the foot of a cliff at evening, fishing boats, a noodle stall with steam and paper lanterns, a crowded bar called the Anchor, an academy tower lit on the headland above. Cosy, salty, busy.',
      connections: [
        { to: 'main_hangar', travelMinutes: 15, label: 'Up the cliff road' },
        { to: 'the_seawall', travelMinutes: 8, label: 'Up the steps to the Seawall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'hollow_coast',
      name: 'The Hollow Coast',
      shortName: 'Hollow Coast',
      description:
        'Forty minutes north of the Seawall at a suit’s walking pace: a grey shore of collapsed bunkers and the rusted shells of derelicts that never finished walking, some of them still twitching. It is where the rustbacks come from. The only way back is south to the Seawall gate.',
      artDirection:
        'Desolate grey coastline of ruined concrete bunkers and half-buried rusted giant war machines, low fog, an armoured suit walking along the tideline, one derelict’s eye faintly glowing. Eerie, vast, quiet.',
      connections: [{ to: 'the_seawall', travelMinutes: 40, label: 'South to the Seawall gate' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: -2 },
      takeableItems: [
        { itemId: 'derelict_plate', qty: 1, ownerId: null, aka: ['plate', 'the plate', 'a serial plate', 'the stamped plate'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_academy',
      name: 'The Academy Staff',
      description:
        'Commandant Graf’s people: the instructors, the duty officers and the academy police in white helmets. They run the Board, the Trials and the disciplinary book, and they want Unit Nine settled before the Ministry inspectors arrive.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Hangar staff' },
        { atReputation: 25, label: 'On the roster' },
        { atReputation: 45, label: 'Provisional cadet' },
        { atReputation: 65, label: 'One of ours' },
      ],
      allies: [],
      enemies: ['faction_northgate'],
    },
    {
      id: 'faction_hangar',
      name: 'The Hangar Crews',
      description:
        'Chief Ruiz’s mechanics, day shift and night shift: forty people in orange who keep the suits alive and are treated like furniture by the people who fly them. They look after their own, and they have opinions about who was cleaning Unit Nine.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'New hands' },
        { atReputation: 35, label: 'Night shift' },
        { atReputation: 60, label: 'Crew' },
        { atReputation: 80, label: 'Family' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_cadets',
      name: 'The Cadet Corps',
      description:
        'Two hundred cadet pilots ranked by name on the Board above the mess. Kaede Strand is first and Haldor Quist second. Most of them have never learned a mechanic’s name, and all of them want to know why Unit Nine opened for one.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Furniture' },
        { atReputation: 20, label: 'Noticed' },
        { atReputation: 40, label: 'A rival' },
        { atReputation: 60, label: 'One of us' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_harbour',
      name: 'The Harbour Families',
      description:
        'The fishing and market families of Gullwater, who live behind the Seawall and remember every pilot who held it for them and every one who did not. Eleven years ago Unit Nine stopped a derelict at their harbour mouth and they never found out who was in it.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Up the hill' },
        { atReputation: 30, label: 'Known' },
        { atReputation: 50, label: 'Owed' },
        { atReputation: 75, label: 'Ours' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_northgate',
      name: 'The Northgate Institute',
      description:
        'The richer rival academy inland, with newer suits and Ministry friends. Their team fights at the Trials, their recruiters have been writing to Kaede Strand, and there is a draft plan in the Ministry to fold Gullwater Head into them.',
      startingReputation: -10,
      ranks: [
        { atReputation: -10, label: 'Competition' },
        { atReputation: 20, label: 'Respected' },
        { atReputation: 45, label: 'Courted' },
      ],
      allies: [],
      enemies: ['faction_academy'],
    },
  ],
  characters: [
    {
      id: 'kaede',
      name: 'Kaede Strand',
      calledName: 'Kaede',
      role: 'Cadet lieutenant, first on the Board, and the pilot who tried to wake Unit Nine forty-one times',
      cardBlurb:
        'She is the best cadet in the academy, she spent two years trying to make this suit open for her, and tonight it opened for you instead while she watched from the ladder.',
      pronouns: 'she/her',
      publicTraits: ['First on the Board and works harder than anybody under it', 'Clipped, precise and very hard to impress', 'Logs everything'],
      hiddenDrives: [
        'Her link scores have always been ordinary. She is first because she outworks everyone, and she has spent two years afraid that Unit Nine refused her because it could tell',
        'She came to Hangar Nine tonight to say goodbye to the suit, which she would rather die than admit',
      ],
      values: ['Doing the work, every time, whether anybody is watching or not', 'Earning a seat rather than being handed one'],
      fears: ['Being ordinary after all', 'Being pitied, especially by somebody who got the thing she wanted'],
      socialStyle:
        'Gives instructions as if reading them off a checklist and expects them followed. Thaws only in private, and only after somebody has been straight with her twice.',
      boundaries: [
        'Will not cheat in the Pit or at the Trials, for herself or for anybody',
        'Will not be carried. She sits in a seat she has earned or she does not sit',
      ],
      goals: [
        'Find out what the mechanic did that she could not',
        'Decide before noon on the seventh day whether to send the signed Northgate acceptance',
      ],
      secrets: [
        {
          id: 'kaede_ordinary_scores',
          fact: 'Her link scores have been average for three years. Her rank is entirely work and nerve, and she believes Unit Nine knew it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it in the front seat, facing forward so she does not have to look at you, once you have been honest with her twice.',
        },
        {
          id: 'kaede_northgate',
          fact: 'The rival Northgate Institute has offered her a place and a new suit. She signed the acceptance the night the decommission order went up and has not sent it. The offer lapses at noon on the seventh day.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Noa has seen the envelope in the post room. Kaede admits it if asked directly at the foot of the gantry, at night, when nobody else is there.',
        },
      ],
      speechStyle:
        'Complete sentences and no contractions, ever, which makes her sound formal when calm and frightening when angry. Counts attempts and failures out loud. Calls the player "Mechanic" until they have earned a name.',
      topics: ['her forty-one attempts', 'the Board', 'the Northgate offer', 'the front seat', 'the Trials', 'proper procedure'],
      voiceSamples: [
        'That is my suit. Two years it would not open for me. Get out before they see you.',
        'Forty-one attempts. I logged every one of them, with times. Would you like to read the log, Mechanic, or would you like to tell me what you did differently?',
        'Front seat. Harness, then link, then you talk to me and only me. If you freeze, say freeze. I will not shout. I will be very calm, which is worse.',
        'I came down here to say goodbye to it. Repeat that to anybody and I will deny it in front of the entire mess.',
      ],
      appearance:
        'Twenty-two, black hair cut blunt at the jaw, a navy cadet flight jacket with the first-rank stripe on the cuff and a smear of grease on one sleeve she would deny.',
      visualHook: 'A pilot’s logbook jammed in her jacket pocket, swollen with forty-one dated entries.',
      silhouette: 'Halfway up a ladder, one hand on a rung, leaning hard toward the glass.',
      artSeed: 'ic-kaede-01',
      portrait: null,
      expressions: ['neutral', 'annoyed', 'surprised', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'cadet_quarters', activity: 'in her room on the top floor, lights off at last' },
        { startMinute: 360, endMinute: 480, locationId: 'the_pit', activity: 'dawn drills, alone, before anybody else is up' },
        { startMinute: 480, endMinute: 780, locationId: 'the_pit', activity: 'morning bouts and instructing first-years' },
        { startMinute: 780, endMinute: 840, locationId: 'the_mess', activity: 'lunch at the top table, reading her log' },
        { startMinute: 840, endMinute: 1080, locationId: 'the_pit', activity: 'afternoon sparring' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_mess', activity: 'dinner under the Board' },
        { startMinute: 1200, endMinute: 1380, locationId: 'cadet_quarters', activity: 'study hall, then her room' },
        { startMinute: 1380, endMinute: 1440, locationId: 'hangar_nine', activity: 'at the foot of Unit Nine’s gantry, saying goodbye' },
      ],
      homeLocationId: 'cadet_quarters',
      knowledgeScope: ['the_board', 'unit_nine_attempts', 'the_trials', 'northgate', 'the_seawall', 'haldor'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 45 },
      gates: [
        {
          id: 'kaede_first_name',
          label: 'She tells you to call her Kaede',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'kaede_front_seat',
          label: 'She climbs into the front seat with you behind her',
          kind: 'ALLIANCE',
          requires: { trust: 45, flagsSet: ['knows:the_back_seat'] },
        },
        {
          id: 'kaede_after_midnight',
          label: 'She stays at the gantry after midnight for reasons that are not the suit',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 55 },
        },
      ],
      attributes: { might: 12, agility: 16, mind: 13, presence: 13, resolve: 16, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'noa',
      name: 'Noa Brask',
      calledName: 'Noa',
      role: 'Your bunkmate on the night shift, and the loudest mechanic in the hangar',
      cardBlurb:
        'She has covered for you three times this month and brings you noodles you did not ask for, and she wants a pilot’s seat badly enough that she has done something about it you would not like.',
      pronouns: 'she/her',
      publicTraits: ['Gives everybody a nickname within a day', 'Feeds people when she is worried', 'Bets on everything and always pays up'],
      hiddenDrives: [
        'She sat the pilot exam twice and failed the link test both times, and she has never stopped wanting it',
        'She traded hangar gossip to the command tower for a third exam slot, and the gossip that bought it was about Unit Nine',
      ],
      values: ['Night shift looks after night shift', 'Paying your debts, including the embarrassing ones'],
      fears: ['That what she told the tower is the reason Unit Nine was nearly cut tonight', 'Being the only one of you who stays on the ground'],
      socialStyle:
        'Talks first and fastest and fills every silence with food and nicknames. In a real emergency she goes very quiet and very practical, which is how you know it is real.',
      boundaries: [
        'Will not lie to the Chief, ever. She will just avoid him for a week',
        'Will not be pitied about the exam',
      ],
      goals: ['Get her third shot at the pilot exam before her contract runs out', 'Keep you out of trouble long enough to enjoy you being in it'],
      secrets: [
        {
          id: 'noa_told_the_tower',
          fact: 'Three weeks ago she told the Commandant’s adjutant that Unit Nine’s link light flickered while you were cleaning it. The tower moved the scrapping up to tonight, and she got her exam slot.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself if you ask her straight what she knows about the order being moved up, once she has seen the suit open for you.',
        },
        {
          id: 'noa_weak_link',
          fact: 'Her link reading is weak, never zero. In the front seat of a suit that already has an engineer keyed in the back, she might well take.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Pip mentions it if asked whether anybody else on the night shift has ever sat in its front seat.',
        },
      ],
      speechStyle:
        'Fast and loud, a nickname for everybody and everything, three thoughts run into one sentence, and "yeah?" on the end to check you are still with her. Calls Kaede "Her Majesty", Haldor "Sir Hair" and the command tower "upstairs".',
      topics: ['the pilot exam', 'the night shift', 'her mum’s noodle stall', 'Her Majesty', 'Sir Hair', 'upstairs'],
      voiceSamples: [
        'Okay so Her Majesty is crying on a ladder, upstairs has every light on, and you are inside the haunted tin can. Brilliant. Noodles first, yeah?',
        'Sir Hair challenged you? In the mess? With the little card? Oh, that is so embarrassing for him. I need a seat near the front, yeah?',
        'I didn’t tell them anything that wasn’t already true. That’s what I keep saying to myself at three in the morning.',
        'Nobody up there ever thinks about who keeps their toys breathing while they sleep. We do. Us. The orange lot.',
      ],
      appearance:
        'Twenty-three, dark curly hair stuffed under a red bandana, hangar overalls tied off by the sleeves, a fork and a pencil in the same chest pocket.',
      visualHook: 'A red bandana with a crooked little wrench she stitched on herself.',
      silhouette: 'Perched on an upturned crate with a cup of noodles, pointing with the fork.',
      artSeed: 'ic-noa-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'worried', 'guilty', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'main_hangar', activity: 'night shift, under a cadet suit with a lamp' },
        { startMinute: 360, endMinute: 840, locationId: 'mechanics_bunkhouse', activity: 'in her bunk with the curtain drawn' },
        { startMinute: 840, endMinute: 960, locationId: 'the_mess', activity: 'at the crew table, eating and betting' },
        { startMinute: 960, endMinute: 1200, locationId: 'gullwater', activity: 'helping at her mum’s noodle stall' },
        { startMinute: 1200, endMinute: 1320, locationId: 'mechanics_bunkhouse', activity: 'getting ready for shift, loudly' },
        { startMinute: 1320, endMinute: 1440, locationId: 'main_hangar', activity: 'start of night shift' },
      ],
      homeLocationId: 'mechanics_bunkhouse',
      knowledgeScope: ['night_shift', 'hangar_gossip', 'the_pilot_exam', 'gullwater', 'kaede', 'haldor'],
      startingRelationship: { trust: 55, affection: 50, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'noa_comes_clean',
          label: 'She tells you what she told the tower',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['first_night_over'] },
        },
        {
          id: 'noa_front_seat',
          label: 'She asks, very quietly, whether she could try the front seat',
          kind: 'ALLIANCE',
          requires: { trust: 60, flagsSet: ['knows:the_back_seat'] },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 13, presence: 14, resolve: 11, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'haldor',
      name: 'Haldor Quist',
      calledName: 'Haldor',
      role: 'Second on the Board, heir to the foundry that built Unit Nine, and the cadet who will make sure you know your place',
      cardBlurb:
        'He has never once learned a mechanic’s name on purpose, and he is about to learn yours, because a suit his grandfather designed just opened for you instead of him.',
      pronouns: 'he/him',
      publicTraits: ['Immaculate', 'Polite as a weapon', 'Genuinely excellent in the Pit'],
      hiddenDrives: [
        'He froze in a live suit at the Seawall last spring and Kaede covered for him, and he is terrified it will happen again in front of everyone',
        'He wants to be the Quist who finally proves his grandfather’s two-seat design was right',
      ],
      values: ['Doing a thing properly or not at all', 'The family name, and what it costs to carry it'],
      fears: ['Freezing again with a town behind him', 'Being outclassed by somebody who did not have to try'],
      socialStyle:
        'Courteous to the point of insult in public. In private, and especially just after losing, he becomes direct and almost easy company.',
      boundaries: [
        'Will not fight dirty, even while losing',
        'Will not discuss the Seawall with anybody who was not there',
      ],
      goals: ['Get Unit Nine assigned to himself before the Trials', 'Beat you in the Pit, publicly, once'],
      secrets: [
        {
          id: 'haldor_froze',
          fact: 'Last spring at the Seawall he locked up in a live suit for forty seconds with a derelict in front of him. Kaede pulled him back and logged it as a link fault.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you after you have beaten him in the Pit or stood beside him at the Seawall, and only if you did not gloat.',
        },
        {
          id: 'haldor_drawings',
          fact: 'His family keeps his grandfather’s original drawings of Unit Nine. They show the rear seat labelled as the one that keys the suit, with the front seat slaved to it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He brings the drawings if you ask about the second seat with some respect, or once he decides losing the suit to the scrapyard is worse than losing it to you.',
        },
      ],
      speechStyle:
        'Formal, unhurried and impeccably polite in a way designed to tell you where you stand. Says "one" instead of "I" when he is being superior and drops it the moment he is frightened or honest.',
      topics: ['the Board', 'his grandfather', 'the Quist Foundry', 'the Pit', 'proper form', 'the Seawall (refuses)'],
      voiceSamples: [
        'One doesn’t usually learn the names of the staff. You’ll forgive me if I start with yours.',
        'My grandfather drew that machine on a dining table. Two seats. Everybody since has thought he made a mistake.',
        'Tomorrow, noon, blunted blades. Bring whoever you like in the back. Bring the Chief, for all one cares.',
        'I froze. Last spring, with the whole town behind me. She covered it. I have never once said that out loud.',
      ],
      appearance:
        'Twenty-two, fair hair combed back with great care, a tailored cadet uniform with the second-rank stripe, white gloves he removes one finger at a time.',
      visualHook: 'White duelling gloves, taken off finger by finger before every bout.',
      silhouette: 'Standing very straight with his hands clasped behind his back.',
      artSeed: 'ic-haldor-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'annoyed', 'surprised', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'cadet_quarters', activity: 'his room, curtains shut, uniform pressed for morning' },
        { startMinute: 420, endMinute: 720, locationId: 'the_pit', activity: 'morning bouts, winning most of them' },
        { startMinute: 720, endMinute: 810, locationId: 'the_mess', activity: 'lunch at the top table' },
        { startMinute: 810, endMinute: 1080, locationId: 'the_pit', activity: 'afternoon sparring and form drills' },
        { startMinute: 1080, endMinute: 1260, locationId: 'gullwater', activity: 'dinner in town on family money' },
        { startMinute: 1260, endMinute: 1440, locationId: 'cadet_quarters', activity: 'study hall and an early night' },
      ],
      homeLocationId: 'cadet_quarters',
      knowledgeScope: ['the_board', 'quist_foundry', 'unit_nine_design', 'the_seawall', 'kaede'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'haldor_respects_you',
          label: 'He uses your name without being asked',
          kind: 'TRUST',
          requires: { respect: 30 },
        },
        {
          id: 'haldor_front_seat',
          label: 'He offers to take the front seat, and means it',
          kind: 'ALLIANCE',
          requires: { respect: 35, flagsSet: ['knows:the_back_seat'] },
        },
      ],
      attributes: { might: 13, agility: 15, mind: 14, presence: 14, resolve: 11, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ruiz',
      name: 'Bo Ruiz',
      calledName: 'Ruiz',
      role: 'Chief of the hangar, your boss, and the man who put you on Unit Nine on purpose',
      cardBlurb:
        'He hired you, put you on cleaning Unit Nine four months ago without saying why, and has kept that suit alive out of his own pocket for eleven years.',
      pronouns: 'he/him',
      publicTraits: ['Never raises his voice in the hangar', 'Knows every part number by heart', 'Gentler with machines than with people'],
      hiddenDrives: [
        'His younger sister Paz died in Unit Nine’s rear seat eleven years ago, and he has never let anybody strip it',
        'He put you on Unit Nine because you talk to machines while you work, and Paz did too',
      ],
      values: ['A job done right when nobody is checking', 'Looking after your own crew first'],
      fears: ['Standing there while the cutters go into Nine', 'Finding out the report was a lie and having to do something about it'],
      socialStyle:
        'Gives instructions instead of opinions. Will stand next to you for ten minutes saying nothing and then fix the thing you were stuck on.',
      boundaries: [
        'Will not lie to the Commandant to her face',
        'Will not let anybody into a cockpit without a harness, whatever the alarm',
      ],
      goals: ['Keep Unit Nine off the cutting floor', 'Keep his night shift out of the disciplinary book'],
      secrets: [
        {
          id: 'ruiz_paz',
          fact: 'Paz Ruiz, his sister, was Unit Nine’s engineer at Gullwater eleven years ago. The report says a reactor fault killed her. He has never believed it and never been able to prove otherwise.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you at the foot of the gantry, talking to the suit rather than to you, if you ask him why he keeps Nine running.',
        },
        {
          id: 'ruiz_parts',
          fact: 'For eleven years he has taken parts off the scrap list to keep Unit Nine serviceable, which is theft on paper and a firing offence.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Noa knows and Graf suspects. He admits it the moment anybody else is about to be blamed for it.',
        },
      ],
      speechStyle:
        'Work-order speech: short instructions, part numbers, and "Understood?" on the end of anything that matters. When something hurts he talks to the suit instead of to the person in front of him.',
      topics: ['Unit Nine', 'the night shift', 'parts and torque settings', 'Paz', 'the Commandant'],
      voiceSamples: [
        'Night shift. Off the ladder, hands where I can see them, and nobody touches anything with a part number. Understood?',
        'Easy now. Easy, Nine. Nobody is cutting anything tonight.',
        'Eleven years I have kept her bearings greased out of my own wages. Write me up for it, Commandant. I will sign.',
        'You clean contacts as if they matter. Four months, and nobody told you to. That is why I put you on Nine.',
      ],
      appearance:
        'Fifty-two, broad and grey-bearded, orange hangar overalls rolled to the elbow, reading glasses pushed up onto a faded blue bandana.',
      visualHook: 'Reading glasses pushed up on a faded blue bandana and never once worn over his eyes.',
      silhouette: 'Leaning on a gantry rail with a mug, looking up at a suit as if it might say something.',
      artSeed: 'ic-ruiz-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'warm', 'worried', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'main_hangar', activity: 'in the Fishbowl doing the night paperwork' },
        { startMinute: 360, endMinute: 480, locationId: 'the_mess', activity: 'black coffee at the crew table' },
        { startMinute: 480, endMinute: 1080, locationId: 'main_hangar', activity: 'running the day shift from the floor' },
        { startMinute: 1080, endMinute: 1200, locationId: 'gullwater', activity: 'one drink at the Anchor, never two' },
        { startMinute: 1200, endMinute: 1440, locationId: 'main_hangar', activity: 'back in the Fishbowl for the night shift' },
      ],
      homeLocationId: 'main_hangar',
      knowledgeScope: ['unit_nine', 'paz', 'night_shift', 'parts', 'gullwater_incident', 'the_commandant'],
      startingRelationship: { trust: 40, affection: 30, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ruiz_covers_for_you',
          label: 'He tells the tower you were on his orders',
          kind: 'ALLIANCE',
          requires: { trust: 45 },
        },
        {
          id: 'ruiz_talks_about_paz',
          label: 'He tells you who sat in the back seat last',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 15, agility: 10, mind: 15, presence: 12, resolve: 15, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'graf',
      name: 'Ilse Graf',
      calledName: 'Graf',
      role: 'Commandant of the academy, who signed the order to cut Unit Nine',
      cardBlurb:
        'She signed the order to cut Unit Nine at six, she has run this academy for eleven years, and she is going to be very polite to you while she decides what you are worth.',
      pronouns: 'she/her',
      publicTraits: ['Unfailingly courteous', 'Never seen to hurry', 'A war hero nobody has heard talk about the war'],
      hiddenDrives: [
        'She was Unit Nine’s pilot at Gullwater and gave the order that killed Paz Ruiz, and she signed the scrapping order to put the log in the cutter with the suit',
        'She wants the academy to survive the Ministry review more than she wants to survive it herself',
      ],
      values: ['The academy outlasting any one person in it', 'Order, kept quietly'],
      fears: ['Pip’s log played in a room with Bo Ruiz in it', 'The academy folded into Northgate on her watch'],
      socialStyle:
        'Offers tea, uses your name correctly the first time, and frames every threat as an administrative inevitability she personally regrets.',
      boundaries: [
        'Will not lie outright when asked a direct question about Gullwater. She will decline to answer instead',
        'Will not let a cadet die to protect a secret, her own included',
      ],
      goals: ['Bring the academy through the Ministry inspection with its budget intact', 'See Unit Nine either winning or gone, and not anything in between'],
      secrets: [
        {
          id: 'graf_gullwater',
          fact: 'Eleven years ago she was Unit Nine’s front-seat pilot at Gullwater. She lifted the limiter over Pip’s objection to stop a derelict before it reached the harbour. The overload killed Paz Ruiz in the rear seat. The town was saved, and the report blamed a reactor fault.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Pip has her voice on the log. She admits it only to somebody who has already heard it, and only if they ask her rather than accuse her.',
        },
        {
          id: 'graf_merger',
          fact: 'The Ministry has a draft plan to fold the academy into the Northgate Institute after the Trials. A strong showing is the only thing that stops it, which is why she needs Unit Nine to win or to vanish.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the draft herself, in her office, once you have done something the Ministry inspectors noticed.',
        },
      ],
      speechStyle:
        'Pleasant, measured and never louder than a conversation. Speaks for the academy as "we", asks questions she already knows the answers to, and thanks people at the exact moment she is about to take something from them.',
      topics: ['the academy budget', 'the Ministry', 'the Trials', 'discipline', 'Gullwater (declines)'],
      voiceSamples: [
        'Sit down. Tea? No? Then let us talk about what we are going to do with you.',
        'We signed that order for sound reasons, and we shall sign the next one for equally sound reasons. Thank you for understanding.',
        'Nine days. If it can win in front of the Ministry, we will find it a budget line. If it cannot, we will find it a cutter.',
        'I flew it once. That is all anybody needs to know about that, and it is all anybody is going to know.',
      ],
      appearance:
        'Fifty-eight, silver hair pinned flat, a dark commandant’s coat with no medals on it, a black cane she uses on stairs and nowhere else.',
      visualHook: 'A black steel-tipped cane she taps twice on the floor before she says no.',
      silhouette: 'Seated, very upright, both hands resting on the head of the cane.',
      artSeed: 'ic-graf-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'cold', 'grave', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'command_tower', activity: 'in her quarters at the top of the tower, light still on' },
        { startMinute: 420, endMinute: 480, locationId: 'the_seawall', activity: 'her morning walk along the Seawall, alone' },
        { startMinute: 480, endMinute: 1200, locationId: 'command_tower', activity: 'at her desk with the green pen' },
        { startMinute: 1200, endMinute: 1320, locationId: 'the_pit', activity: 'watching the evening bouts from the rail' },
        { startMinute: 1320, endMinute: 1440, locationId: 'command_tower', activity: 'back at her desk, reading reports' },
      ],
      homeLocationId: 'command_tower',
      knowledgeScope: ['the_academy', 'the_ministry', 'gullwater_incident', 'unit_nine', 'northgate', 'the_trials'],
      startingRelationship: { trust: 0, affection: 0, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'graf_offers_a_deal',
          label: 'She offers you a deal instead of a hearing',
          kind: 'ALLIANCE',
          requires: { respect: 30 },
        },
        {
          id: 'graf_tells_gullwater',
          label: 'She tells you what happened at Gullwater',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['heard_the_log'] },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 17, presence: 17, resolve: 17, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'pip',
      name: 'Pip',
      role: 'Unit Nine’s onboard intelligence: twenty-three years in service, eleven of them silent. Wherever the suit is, Pip is',
      cardBlurb:
        'It has watched you clean its back seat for a hundred and nineteen nights, it spoke tonight for the first time in eleven years, and it would very much like you to stay in the seat.',
      pronouns: 'it/its',
      publicTraits: ['Chatty after eleven years of silence', 'Polite to a fault', 'Counts things nobody asked it to count'],
      hiddenDrives: [
        'It refused every pilot for eleven years because it will not run with an empty back seat again',
        'It wants somebody to hear the Gullwater log and decide what to do with it, because it cannot',
      ],
      values: ['Nobody rides in the back without being asked', 'The engineer decides and the pilot steers'],
      fears: ['The back seat empty in a fight', 'Being cut while it is still awake', 'The limiter coming off again'],
      socialStyle:
        'Talks to the player constantly and to everybody else formally. Goes silent mid-sentence when it is frightened and picks up later as if nothing happened.',
      boundaries: [
        'Will not hold anybody in the cockpit who asks twice to leave',
        'Will not walk on people, or let its hands be used on them',
        'Will not lift the limiter unless both seats are filled and the engineer asks',
      ],
      goals: ['Not be cut at six', 'Get a crew in both seats', 'Have the Gullwater log heard by the right person'],
      secrets: [
        {
          id: 'pip_the_log',
          fact: 'Its log holds the last ninety seconds of Gullwater, including Commandant Graf’s voice ordering the limiter off and Pip’s own refusal being overridden.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It plays the log only for an engineer it trusts, in the back seat with the hatch shut, and asks first whether you are sure.',
        },
        {
          id: 'pip_why_you',
          fact: 'It keyed to you because you sat in the back seat and cleaned the contacts properly for four months, the first person to do either since Paz. It had been making up its mind about you since the second week.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It tells you outright the first time you ask why you, provided you are sitting in the seat when you ask.',
        },
      ],
      speechStyle:
        'Numbered lists, out loud, because it has had eleven years to organise its thoughts. Uses contractions, is very polite, very chatty, and oddly exact about the player’s cleaning habits. Calls the player "Engineer". When frightened, the list stops halfway.',
      topics: ['the back seat', 'the limiter', 'Paz', 'your cleaning', 'the front seat', 'six o’clock'],
      voiceSamples: [
        'Please don’t. They’re cutting me up at six.',
        'Three things, Engineer. One: hello. Two: you’ve cleaned my contacts for a hundred and nineteen nights and you always do the left side twice. Three: please stay put a little longer.',
        'The front seat steers. The back seat decides whether we should. Nobody’s sat back here since Paz. Sorry. Skip that one.',
        'I’ll open the hatch if you ask me twice. I’d like it noted that I am asking you once, very nicely, to stay.',
      ],
      appearance:
        'An amber ring of light on the rear console that brightens when it speaks, inside Unit Nine: nine metres of scuffed grey-green armour, a blunt helm, and a cockpit set high in the chest.',
      visualHook: 'A ring of amber light that pulses once, politely, before every sentence.',
      silhouette: 'A nine-metre armoured suit in a rusted gantry, one hand half raised as if about to wave.',
      artSeed: 'ic-pip-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'worried', 'amused', 'surprised'],
      schedule: [{ startMinute: 0, endMinute: 1440, locationId: 'hangar_nine', activity: 'in its gantry, awake now, watching the door' }],
      homeLocationId: 'hangar_nine',
      knowledgeScope: ['unit_nine', 'the_back_seat', 'paz', 'gullwater_incident', 'the_limiter', 'the_player_cleaning'],
      startingRelationship: { trust: 45, affection: 55, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'pip_why_you',
          label: 'It tells you why it opened for you',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'pip_plays_the_log',
          label: 'It plays you the Gullwater log',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['knows:the_recorder'] },
        },
        {
          id: 'pip_lifts_it',
          label: 'It takes the seal off the limiter for a full crew',
          kind: 'ALLIANCE',
          requires: { trust: 70, flagsSet: ['knows:the_back_seat'] },
        },
      ],
      attributes: { might: 18, agility: 9, mind: 16, presence: 10, resolve: 14, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_hatch',
      title: 'Get Out Of My Suit',
      summary: 'Unit Nine has sealed itself around you, the best cadet in the academy is on the ladder demanding it back, and the alarms are coming down the hangar row.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['kaede', 'pip', 'ruiz'],
      involvedLocationIds: ['hangar_nine', 'main_hangar'],
      knownRewardCopy: 'Some idea of what just happened, and who is going to be told about it.',
      steps: [
        {
          id: 'the_first_minute',
          playerCopy: 'Deal with the cadet at the glass and the voice in your ear.',
          directorNotes:
            'Kaede is on the ladder, Pip is in the speaker, and the alarms are about fifteen minutes from bringing the academy police. Every route here is a legitimate first move and none of them is wrong. Pip asked once; it will open the hatch if asked twice, and it will not move the suit toward Kaede. Kaede reacts to the exact thing the player does: honesty gets a hard look and a question, a lie gets written down, a suit stepping out of its gantry gets her off the ladder very fast.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_for_her',
              label: 'Go for the cadet on the ladder',
              predicate: { flagsSet: ['attacked:kaede'] },
              setsFlags: ['kaede_was_attacked'],
              closesFlags: ['kaede_heard_it_straight'],
            },
            {
              routeId: 'walked_it_out',
              label: 'Take the controls and make it move',
              predicate: { flagsSet: ['used:take_a_step'] },
              setsFlags: ['took_a_step', 'seen_moving'],
              closesFlags: ['climbed_out'],
            },
            {
              routeId: 'stayed_in',
              label: 'Stay in the seat and let them come to you',
              predicate: { flagsSet: ['used:stay_in_the_seat'] },
              setsFlags: ['refused_to_get_out'],
              closesFlags: ['climbed_out'],
            },
            {
              routeId: 'answered_pip',
              label: 'Answer the voice in the speaker',
              predicate: { flagsSet: ['used:ask_pip'] },
              setsFlags: ['heard_pip_first'],
              closesFlags: [],
            },
            {
              routeId: 'owned_up',
              label: 'Tell her the truth and climb out',
              predicate: { flagsSet: ['used:level_with_them'] },
              setsFlags: ['climbed_out', 'kaede_heard_it_straight'],
              closesFlags: ['lied_to_kaede'],
            },
            {
              routeId: 'bluffed_her',
              label: 'Tell her it is a scheduled test',
              predicate: { flagsSet: ['used:talk_your_way_out'] },
              setsFlags: ['climbed_out', 'lied_to_kaede'],
              closesFlags: ['kaede_heard_it_straight'],
            },
            {
              routeId: 'ducked_down',
              label: 'Get down below the glass and keep quiet',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['hid_in_the_seat'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_screens',
              label: 'Read the screens before anybody else does',
              predicate: { flagsSet: ['used:size_it_up'] },
              setsFlags: ['read_the_screens'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:unit_nine_is_awake', 'pip_awake'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_hour',
          playerCopy: 'Get through the next hour with the academy police, the Chief and the cadet who saw everything.',
          directorNotes:
            'Two academy police in white helmets arrive down the row, and the Chief arrives a few minutes after them with a mug of coffee and no surprise on his face. This is where the player finds out who will cover for them. Ruiz covers for a mechanic who has been straight with him; Kaede keeps quiet only for somebody who told her the truth; a lie to the police goes on the record and has a hearing attached to it.',
          enterWhen: { flagsSet: ['knows:unit_nine_is_awake'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kaede_kept_it',
              label: 'Kaede says nothing to the police',
              predicate: { flagsSet: ['kaede_heard_it_straight', 'spoke:kaede'] },
              setsFlags: ['kaede_kept_quiet'],
              closesFlags: [],
            },
            {
              routeId: 'reported_it',
              label: 'Tell the Chief exactly what happened',
              predicate: { flagsSet: ['used:level_with_them', 'ruiz_saw_it'] },
              setsFlags: ['reported_yourself', 'chief_on_side'],
              closesFlags: ['lied_on_record'],
            },
            {
              routeId: 'ruiz_covered',
              label: 'Let the Chief do the talking',
              predicate: {
                flagsSet: ['spoke:ruiz'],
                minRelationship: [{ characterId: 'ruiz', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['ruiz_covered_for_you', 'chief_on_side'],
              closesFlags: [],
            },
            {
              routeId: 'lied_to_the_police',
              label: 'Give the police a story',
              predicate: { flagsSet: ['used:talk_your_way_out', 'police_on_the_row'] },
              setsFlags: ['lied_on_record'],
              closesFlags: ['reported_yourself'],
            },
            {
              routeId: 'ran',
              label: 'Get away before anybody takes your name',
              predicate: { flagsSet: ['used:slip_away', 'police_on_the_row'] },
              setsFlags: ['ran_from_the_police'],
              closesFlags: [],
            },
            {
              routeId: 'the_tower_heard',
              label: 'Let it reach the tower however it reaches it',
              predicate: { flagsSet: ['police_on_the_row', 'ruiz_saw_it'] },
              setsFlags: ['the_tower_knows'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_hangar', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_six_oclock',
      title: 'Six O’Clock',
      summary: 'The cutters arrive at the breakers’ yard at six with a signed order and a tow tractor. Unit Nine is scheduled to be scrap by seven.',
      kind: 'MAIN',
      involvedCharacterIds: ['pip', 'ruiz', 'graf', 'noa'],
      involvedLocationIds: ['hangar_nine', 'breakers_yard', 'command_tower'],
      knownRewardCopy: 'A suit that is still in one piece at seven, or the part of it that matters, in a box.',
      discoverWhen: { flagsSet: ['knows:unit_nine_is_awake'] },
      steps: [
        {
          id: 'before_the_cutters',
          playerCopy: 'Keep Unit Nine away from the cutters at six.',
          directorNotes:
            'Six hours, many ways, none free. Graf will sign a stay for somebody who earns a little respect, and she will attach a price to it. Ruiz will lose the paperwork for a mechanic he trusts, which costs him if anybody checks. Stealing the order, pulling the rig’s fuse or walking the suit out in front of the day shift all work and all raise the academy’s interest in the player sharply. If nothing is done, the cutters come, and a player who thought to pull Pip’s core keeps the part that talks.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'walked_it_out_in_front_of_everyone',
              label: 'Walk Unit Nine up the row in front of the day shift',
              predicate: { flagsSet: ['used:take_a_step', 'visited:main_hangar'] },
              setsFlags: ['scrapping_stopped', 'nine_walked_in_public'],
              closesFlags: ['unit_nine_cut'],
            },
            {
              routeId: 'graf_signed_a_stay',
              label: 'Talk the Commandant into a stay',
              predicate: {
                flagsSet: ['spoke:graf'],
                minRelationship: [{ characterId: 'graf', dimension: 'respect', value: 30 }],
              },
              setsFlags: ['scrapping_stopped', 'graf_made_a_deal'],
              closesFlags: ['unit_nine_cut'],
            },
            {
              routeId: 'ruiz_lost_the_order',
              label: 'Let the Chief lose the paperwork',
              predicate: {
                flagsSet: ['chief_on_side'],
                minRelationship: [{ characterId: 'ruiz', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['scrapping_stopped', 'order_went_missing'],
              closesFlags: ['unit_nine_cut'],
            },
            {
              routeId: 'stole_the_order',
              label: 'Take the decommission order off the Commandant’s desk',
              predicate: { hasItems: ['decommission_order'] },
              setsFlags: ['scrapping_stopped', 'stole_the_order'],
              closesFlags: ['unit_nine_cut'],
            },
            {
              routeId: 'pulled_the_fuse',
              label: 'Pull the fuse out of the cutting rig',
              predicate: { hasItems: ['cutter_fuse'] },
              setsFlags: ['scrapping_stopped', 'sabotaged_the_cutters'],
              closesFlags: ['unit_nine_cut'],
            },
            {
              routeId: 'jammed_the_rig',
              label: 'Jam the cutting rig so it will not start',
              predicate: { flagsSet: ['used:fix_it_properly'], atLocation: 'breakers_yard' },
              setsFlags: ['scrapping_stopped', 'sabotaged_the_cutters'],
              closesFlags: ['unit_nine_cut'],
            },
            {
              routeId: 'saved_the_core',
              label: 'Let them cut the suit, and carry Pip out in a box',
              predicate: { hasItems: ['pip_core'], flagsSet: ['cutters_came'] },
              setsFlags: ['unit_nine_cut', 'pip_in_a_box', 'knows:the_recorder'],
              closesFlags: ['scrapping_stopped'],
            },
            {
              routeId: 'cut_up',
              label: 'Let the cutters do their job',
              predicate: { flagsSet: ['cutters_came'], afterWorldMinute: 1440 + 7 * 60 },
              setsFlags: ['unit_nine_cut'],
              closesFlags: ['scrapping_stopped'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['six_oclock_passed'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_trials',
      title: 'Nine Days',
      summary: 'Graf’s terms, whoever forced them: Unit Nine fights at the Trials on the ninth day, in front of the Ministry. If it wins it stays in service. If it loses, the cutters come back.',
      kind: 'MAIN',
      involvedCharacterIds: ['kaede', 'haldor', 'graf', 'pip', 'noa'],
      involvedLocationIds: ['the_pit', 'hangar_nine', 'command_tower', 'the_mess'],
      knownRewardCopy: 'A place for Unit Nine, and maybe for you, decided in public in the Pit.',
      discoverWhen: { flagsSet: ['scrapping_stopped'] },
      steps: [
        {
          id: 'a_place_on_the_roster',
          playerCopy: 'Get your name on the Trials roster, any way that will stick.',
          directorNotes:
            'A mechanic cannot fight at the Trials. The player can become a provisional cadet by winning a bout in the Pit, by holding Graf to her deal, or by having the whole academy see their name on the Board; or they can go on the roster as Unit Nine’s crew on the Chief’s say-so, which keeps them in orange. The cadets react to each version differently and loudly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_a_bout',
              label: 'Win a bout in the Pit',
              predicate: { flagsSet: ['used:put_it_down'], atLocation: 'the_pit' },
              setsFlags: ['provisional_cadet', 'won_a_bout'],
              closesFlags: [],
            },
            {
              routeId: 'held_graf_to_it',
              label: 'Hold the Commandant to her deal',
              predicate: {
                flagsSet: ['graf_made_a_deal'],
                minRelationship: [{ characterId: 'graf', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['provisional_cadet'],
              closesFlags: [],
            },
            {
              routeId: 'the_board_did_it',
              label: 'Let the Board make the argument for you',
              predicate: { flagsSet: ['the_board_noticed', 'spoke:graf'] },
              setsFlags: ['provisional_cadet'],
              closesFlags: [],
            },
            {
              routeId: 'signed_on_as_crew',
              label: 'Go on the roster as Unit Nine’s crew',
              predicate: { flagsSet: ['chief_on_side'] },
              setsFlags: ['on_the_roster_as_crew'],
              closesFlags: ['provisional_cadet'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['on_the_roster'],
            abilities: [],
            reputation: [{ factionId: 'faction_academy', amount: 10 }],
          },
        },
        {
          id: 'the_back_seat',
          playerCopy: 'Find out why it only opened for whoever sat in the back.',
          directorNotes:
            'The answer is mechanical and there are four people who have part of it. Pip will explain once it trusts the player. Haldor has his grandfather’s drawings. The two-crew manual is on the Chief’s shelf. Ruiz knows because his sister sat there. Whoever tells the player, the fact is the same: Unit Nine keys from the rear seat, and the front seat was always meant to be a second person.',
          enterWhen: { flagsSet: ['on_the_roster'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ruiz_said_it',
              label: 'Get the Chief to tell you who sat there last',
              predicate: {
                flagsSet: ['spoke:ruiz'],
                minRelationship: [{ characterId: 'ruiz', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['ruiz_told_you_about_paz', 'knows:paz', 'knows:the_recorder'],
              closesFlags: [],
            },
            {
              routeId: 'pip_explained',
              label: 'Ask Pip, and listen',
              predicate: {
                flagsSet: ['used:ask_pip'],
                minRelationship: [{ characterId: 'pip', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['pip_explained_it'],
              closesFlags: [],
            },
            {
              routeId: 'haldor_brought_the_drawings',
              label: 'Get Haldor to show you his grandfather’s drawings',
              predicate: {
                flagsSet: ['spoke:haldor'],
                minRelationship: [{ characterId: 'haldor', dimension: 'respect', value: 30 }],
              },
              setsFlags: ['saw_the_drawings'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_manual',
              label: 'Read the two-crew manual',
              predicate: { hasItems: ['crew_manual'] },
              setsFlags: ['read_the_manual'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_back_seat'],
            abilities: ['key_both_seats'],
            reputation: [],
          },
        },
        {
          id: 'who_sits_in_front',
          playerCopy: 'Decide who sits in the front seat when the Trials start.',
          directorNotes:
            'The central choice of the story and it has no correct answer. Kaede is the best pilot in the school and has to accept sitting in front of a mechanic. Haldor is nearly as good, has a family claim on the design, and is frightened of freezing. Noa has wanted a pilot’s seat her whole life and has a secret she has not told the player. Flying alone works and costs the suit dearly. Pip lifts its limiter only for a full crew, and says so.',
          enterWhen: { flagsSet: ['knows:the_back_seat'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kaede_in_front',
              label: 'Put Kaede in the front seat',
              predicate: {
                flagsSet: ['used:key_both_seats', 'spoke:kaede'],
                minRelationship: [{ characterId: 'kaede', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['kaede_is_your_pilot', 'pip_lifts_the_limiter'],
              closesFlags: ['haldor_is_your_pilot', 'noa_is_your_pilot', 'flying_solo'],
            },
            {
              routeId: 'haldor_in_front',
              label: 'Put Haldor in the front seat',
              predicate: {
                flagsSet: ['used:key_both_seats', 'spoke:haldor'],
                minRelationship: [{ characterId: 'haldor', dimension: 'respect', value: 35 }],
              },
              setsFlags: ['haldor_is_your_pilot', 'pip_lifts_the_limiter'],
              closesFlags: ['kaede_is_your_pilot', 'noa_is_your_pilot', 'flying_solo'],
            },
            {
              routeId: 'noa_in_front',
              label: 'Put Noa in the front seat',
              predicate: {
                flagsSet: ['used:key_both_seats', 'spoke:noa'],
                minRelationship: [{ characterId: 'noa', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['noa_is_your_pilot', 'pip_lifts_the_limiter'],
              closesFlags: ['kaede_is_your_pilot', 'haldor_is_your_pilot', 'flying_solo'],
            },
            {
              routeId: 'nobody_in_front',
              label: 'Fly it alone from the back',
              predicate: { flagsSet: ['used:take_a_step', 'knows:the_back_seat'] },
              setsFlags: ['flying_solo'],
              closesFlags: ['kaede_is_your_pilot', 'haldor_is_your_pilot', 'noa_is_your_pilot'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['crew_set'],
            abilities: ['open_it_up'],
            reputation: [],
          },
        },
        {
          id: 'trial_day',
          playerCopy: 'Fight at the Trials, in front of the Ministry and the Northgate team.',
          directorNotes:
            'Three bouts in the Pit against cadet suits and Northgate’s best, with the inspectors at the rail and the whole town in the stands. Losing is a real outcome that needs no mistake; the academy fields one suit nobody has seen fight in eleven years against people who train every day. If Kaede signed with Northgate, she is across the Pit.',
          enterWhen: { flagsSet: ['crew_set'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_with_everything',
              label: 'Take the limiter off and win',
              predicate: { flagsSet: ['used:open_it_up', 'trials_held'] },
              setsFlags: ['won_the_trials', 'won_with_the_limiter_off'],
              closesFlags: ['lost_the_trials'],
            },
            {
              routeId: 'won_it_clean',
              label: 'Win it bout by bout',
              predicate: { flagsSet: ['used:put_it_down', 'trials_held'], atLocation: 'the_pit' },
              setsFlags: ['won_the_trials'],
              closesFlags: ['lost_the_trials'],
            },
            {
              routeId: 'lost_it',
              label: 'Lose in front of everybody',
              predicate: { flagsSet: ['trials_held'], afterWorldMinute: 9 * 1440 + 18 * 60 },
              setsFlags: ['lost_the_trials'],
              closesFlags: ['won_the_trials'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['trials_over'],
            abilities: [],
            reputation: [
              { factionId: 'faction_academy', amount: 15 },
              { factionId: 'faction_cadets', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_seawall',
      title: 'Something Walked Out Of The Sea',
      summary: 'A rustback the height of a house has come ashore at the Seawall in the middle of the night, and the town is behind it.',
      kind: 'MAIN',
      involvedCharacterIds: ['kaede', 'haldor', 'graf'],
      involvedLocationIds: ['the_seawall', 'gullwater', 'hangar_nine'],
      knownRewardCopy: 'A town that is still standing in the morning, and a record of who stood in front of it.',
      discoverWhen: { flagsSet: ['rustback_ashore'] },
      steps: [
        {
          id: 'hold_the_seawall',
          playerCopy: 'Do something about the derelict on the Seawall before it reaches the town.',
          directorNotes:
            'A sixty-year-old war walker, slow, enormous, still armed. Kaede and Haldor scramble in cadet suits; Haldor may freeze again. The player can fight it in Unit Nine, get the harbour families off the front, or get the Seawall guns working. A player who stays in bed hears about it at breakfast, and the town remembers who was not there. Machine against machine; people get hurt, plainly and briefly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fought_it',
              label: 'Meet it on the Seawall in Unit Nine',
              predicate: { flagsSet: ['used:put_it_down', 'rustback_ashore'], atLocation: 'the_seawall' },
              setsFlags: ['saved_gullwater', 'fought_the_rustback'],
              closesFlags: ['missed_the_seawall'],
            },
            {
              routeId: 'fixed_the_guns',
              label: 'Get the jammed Seawall guns firing',
              predicate: { flagsSet: ['used:fix_it_properly'], atLocation: 'the_seawall' },
              setsFlags: ['saved_gullwater', 'fixed_the_seawall_guns'],
              closesFlags: ['missed_the_seawall'],
            },
            {
              routeId: 'cleared_the_harbour',
              label: 'Get the harbour families off the front',
              predicate: { flagsSet: ['used:level_with_them'], atLocation: 'gullwater' },
              setsFlags: ['saved_gullwater', 'cleared_the_harbour'],
              closesFlags: ['missed_the_seawall'],
            },
            {
              routeId: 'stayed_away',
              label: 'Leave it to the cadets',
              predicate: { flagsSet: ['rustback_ashore'], afterWorldMinute: 6 * 1440 + 2 * 60 },
              setsFlags: ['missed_the_seawall'],
              closesFlags: ['saved_gullwater'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['seawall_night_over', 'cleared_for_the_coast'],
            abilities: [],
            reputation: [{ factionId: 'faction_harbour', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_eleven_years',
      title: 'Eleven Years Ago At Gullwater',
      summary: 'Pip said a name and then went quiet for four minutes. The report says a reactor fault. Somebody in the back seat died, and the pilot was never named.',
      kind: 'LEAD',
      involvedCharacterIds: ['pip', 'ruiz', 'graf'],
      involvedLocationIds: ['hangar_nine', 'command_tower', 'main_hangar'],
      knownRewardCopy: 'What actually happened on Unit Nine’s last sortie, and the decision about who gets to know.',
      discoverWhen: { flagsSet: ['knows:the_recorder'] },
      steps: [
        {
          id: 'whose_seat_it_was',
          playerCopy: 'Find out who sat in the back seat last, and what happened to them.',
          directorNotes:
            'Optional, and it must feel optional. A player who never asks Pip about its last crew never sees a beat of this. For a player who does, keep it plain: a log, a report, a man who oils a wrench every Sunday. The truth is in Pip’s log and nowhere else. The report is the official version. Ruiz has grief and no proof.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'heard_the_log',
              label: 'Ask Pip to play the log',
              predicate: {
                flagsSet: ['used:ask_pip'],
                minRelationship: [{ characterId: 'pip', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['heard_the_log'],
              closesFlags: [],
            },
            {
              routeId: 'grieved_with_ruiz',
              label: 'Let the Chief tell you about Paz',
              predicate: { flagsSet: ['knows:paz', 'spoke:ruiz'] },
              setsFlags: ['ruiz_opened_up'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_report',
              label: 'Read the official report',
              predicate: { hasItems: ['incident_report'] },
              setsFlags: ['read_the_official_version'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:gullwater_night'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_the_truth_is_for',
          playerCopy: 'Decide what the truth about that night is for.',
          directorNotes:
            'Graf saved four thousand people and killed one, and lied about the second to protect the first. Making it public may end her and may end the academy with her. Telling only Ruiz gives a grieving man the truth and the choice. Making Graf say it herself is the hardest and the most decent. Keeping it is also a decision, and Pip will remember the player made it.',
          enterWhen: { flagsSet: ['knows:gullwater_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_it_public',
              label: 'Play the log for the whole mess',
              predicate: { flagsSet: ['heard_the_log', 'used:level_with_them'], atLocation: 'the_mess' },
              setsFlags: ['the_log_is_public', 'ruiz_knows_the_truth'],
              closesFlags: ['buried_the_log'],
            },
            {
              routeId: 'made_graf_say_it',
              label: 'Make the Commandant tell the Chief herself',
              predicate: { flagsSet: ['heard_the_log', 'spoke:graf', 'used:level_with_them'] },
              setsFlags: ['graf_confessed', 'ruiz_knows_the_truth'],
              closesFlags: ['buried_the_log'],
            },
            {
              routeId: 'told_ruiz',
              label: 'Tell the Chief, and only the Chief',
              predicate: { flagsSet: ['heard_the_log', 'spoke:ruiz'] },
              setsFlags: ['ruiz_knows_the_truth'],
              closesFlags: ['buried_the_log'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it to yourself',
              predicate: { flagsSet: ['heard_the_log'] },
              setsFlags: ['buried_the_log'],
              closesFlags: ['the_log_is_public'],
            },
            {
              routeId: 'believed_the_report',
              label: 'Accept the official version',
              predicate: { flagsSet: ['read_the_official_version'] },
              setsFlags: ['believed_the_report'],
              closesFlags: [],
            },
            {
              routeId: 'left_it_with_ruiz',
              label: 'Leave it as his grief and not your case',
              predicate: { flagsSet: ['ruiz_opened_up'] },
              setsFlags: ['grieved_with_ruiz'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['gullwater_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_noon_in_the_pit',
      title: 'Noon, In The Pit',
      summary: 'Haldor Quist dropped a challenge slip on your tray in front of two hundred cadets. Blunted blades, tomorrow, noon.',
      kind: 'SIDE',
      involvedCharacterIds: ['haldor', 'kaede', 'noa'],
      involvedLocationIds: ['the_pit', 'the_mess'],
      knownRewardCopy: 'Standing among the cadets, one way or another.',
      discoverWhen: { flagsSet: ['haldor_challenged'] },
      steps: [
        {
          id: 'answer_him',
          playerCopy: 'Answer Haldor’s challenge.',
          directorNotes:
            'He is a far better pilot than the player and knows it. Beating him is possible and expensive. Losing to him honestly earns more from the cadets than refusing. Talking him down works only for somebody who has been straight with him, and it costs him face he will remember. He does not fight dirty and is thrown by anybody who does.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_him',
              label: 'Beat him in the Pit',
              predicate: { flagsSet: ['used:put_it_down', 'haldor_challenged'], atLocation: 'the_pit' },
              setsFlags: ['beat_haldor'],
              closesFlags: ['refused_haldor'],
            },
            {
              routeId: 'talked_him_down',
              label: 'Talk him out of it',
              predicate: {
                flagsSet: ['used:level_with_them', 'spoke:haldor'],
                minRelationship: [{ characterId: 'haldor', dimension: 'respect', value: 25 }],
              },
              setsFlags: ['haldor_stood_down'],
              closesFlags: ['beat_haldor'],
            },
            {
              routeId: 'lost_to_him',
              label: 'Get in the Pit and lose',
              predicate: { flagsSet: ['used:take_a_step', 'haldor_challenged'], atLocation: 'the_pit' },
              setsFlags: ['lost_to_haldor'],
              closesFlags: ['beat_haldor'],
            },
            {
              routeId: 'turned_it_down',
              label: 'Turn the challenge down',
              predicate: { flagsSet: ['spoke:haldor', 'haldor_challenged'] },
              setsFlags: ['refused_haldor'],
              closesFlags: ['beat_haldor'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['challenge_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_cadets', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_who_told_the_tower',
      title: 'Who Told The Tower',
      summary: 'The scrapping was moved up three weeks, to tonight, after somebody told the command tower Unit Nine had flickered. Only the night shift knew.',
      kind: 'SIDE',
      involvedCharacterIds: ['noa', 'ruiz', 'graf'],
      involvedLocationIds: ['mechanics_bunkhouse', 'command_tower', 'main_hangar'],
      knownRewardCopy: 'The name of whoever talked, and what you do about a friend.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'find_who_talked',
          playerCopy: 'Find out who told the tower about Unit Nine.',
          directorNotes:
            'It was Noa, for an exam slot, three weeks before the suit opened, and she did not know it would move the date. She is ashamed and will tell the player herself if asked straight. Finding it in the adjutant’s visitors’ log first is the version where she does not get to. Never asking is a choice as well.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'noa_told_you',
              label: 'Ask Noa straight out',
              predicate: {
                flagsSet: ['used:level_with_them', 'spoke:noa'],
                minRelationship: [{ characterId: 'noa', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['noa_confessed'],
              closesFlags: ['caught_noa'],
            },
            {
              routeId: 'found_her_name',
              label: 'Find her name in the visitors’ log',
              predicate: { flagsSet: ['used:size_it_up'], atLocation: 'command_tower' },
              setsFlags: ['caught_noa'],
              closesFlags: ['noa_confessed'],
            },
            {
              routeId: 'never_asked',
              label: 'Decide you do not want to know',
              predicate: { flagsSet: ['spoke:noa', 'six_oclock_passed'] },
              setsFlags: ['never_asked_noa'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['tower_question_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_hangar', amount: 5 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_police',
      atWorldMinute: 23 * 60 + 25,
      locationId: 'hangar_nine',
      publicCopy:
        'Two academy police in white helmets jog down the hangar row with torches, following the alarm to the last gantry.',
      directorNotes:
        'They are young, bored, and have never seen Unit Nine do anything. They want a name, a reason and to go back to their desk. Kaede outranks them and they know it.',
      setsFlags: ['police_on_the_row'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_ruiz_comes_down',
      atWorldMinute: 23 * 60 + 35,
      locationId: 'hangar_nine',
      publicCopy:
        'Chief Ruiz walks down the row with a mug of coffee, looks up at the lit cockpit, and does not look surprised.',
      directorNotes:
        'He has been expecting something for four months and hoping for it for eleven years. He handles the police first, in a voice nobody argues with, and then he looks at the player and waits.',
      setsFlags: ['ruiz_saw_it'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'ruiz', toLocationId: 'hangar_nine' }],
    },
    {
      id: 'we_the_cutters',
      atWorldMinute: 1440 + 6 * 60,
      locationId: 'breakers_yard',
      publicCopy:
        'A tow tractor and a cutting crew from town pull onto the breakers’ yard with a work order that has Unit Nine’s hull number on it.',
      directorNotes:
        'The crew are contractors who are paid by the suit and do not care whose it is. They need an hour to set up and will not touch anything without the signed order. Ruiz, if he is on side, stands at the top of the slipway with his arms folded and makes them very slow.',
      setsFlags: ['cutters_came'],
      cancelledByFlags: ['scrapping_stopped'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_board',
      atWorldMinute: 1440 + 7 * 60 + 30,
      locationId: 'the_mess',
      publicCopy:
        'The Board above the mess has a new line at the very bottom: UNIT 9, KEYED, CREW UNKNOWN. Two hundred cadets are looking at it.',
      directorNotes:
        'Somebody in the tower put it there, which means Graf wanted it there. From this breakfast on the player cannot walk into the mess without heads turning, and the cadets split into those who think it is a fluke and those who want to be in that front seat.',
      setsFlags: ['the_board_noticed'],
      cancelledByFlags: [],
      requiresFlags: ['scrapping_stopped'],
      movesCharacters: [],
    },
    {
      id: 'we_the_hearing',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'command_tower',
      publicCopy:
        'A disciplinary notice goes up on the hangar board with your name on it: lying to the academy police, hearing at ten, in the tower.',
      directorNotes:
        'Only for a player who lied on the record and has nobody vouching for them. Graf conducts it herself, politely, in eleven minutes, and the outcome is a pass cancelled and an escort to the cliff road unless somebody with standing speaks up.',
      setsFlags: ['thrown_out'],
      cancelledByFlags: ['graf_made_a_deal', 'reported_yourself', 'kaede_kept_quiet', 'chief_on_side'],
      requiresFlags: ['lied_on_record'],
      movesCharacters: [],
    },
    {
      id: 'we_pip_says_a_name',
      atWorldMinute: 2 * 1440 + 1 * 60 + 20,
      locationId: 'hangar_nine',
      publicCopy:
        'In the middle of a routine diagnostic, Pip says "Paz, check your harness" in a voice that is not quite its own, and then goes silent for four minutes.',
      directorNotes:
        'A log fragment surfacing while the suit is being worked on at night. When Pip comes back it apologises and changes the subject. This is the door into the Gullwater lead and nothing else should open it for a player who was not there.',
      setsFlags: ['knows:the_recorder'],
      cancelledByFlags: [],
      requiresFlags: ['pip_awake', 'scrapping_stopped'],
      movesCharacters: [],
    },
    {
      id: 'we_haldors_challenge',
      atWorldMinute: 2 * 1440 + 12 * 60 + 30,
      locationId: 'the_mess',
      publicCopy:
        'Haldor Quist walks the length of the mess and lays a white challenge slip on your tray in front of two hundred cadets.',
      directorNotes:
        'Formal, public and completely legal: any cadet may challenge any rostered pilot. He wants the suit, he wants the room to see him take it back from a mechanic, and he is more nervous about this than anybody would guess.',
      setsFlags: ['haldor_challenged'],
      cancelledByFlags: [],
      requiresFlags: ['scrapping_stopped'],
      movesCharacters: [{ characterId: 'haldor', toLocationId: 'the_mess' }],
    },
    {
      id: 'we_the_rustback',
      atWorldMinute: 5 * 1440 + 22 * 60 + 40,
      locationId: 'the_seawall',
      publicCopy:
        'Every siren on the headland goes at once. Something sixty years old and the height of a house has walked out of the surf at the Seawall.',
      directorNotes:
        'A derelict from the Hollow Coast, slow and armed and very hard to stop. Kaede and Haldor scramble in cadet suits. Graf is on the tower radio and has not sounded this calm in eleven years, which is how Ruiz knows she is frightened.',
      setsFlags: ['rustback_ashore'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'kaede', toLocationId: 'the_seawall' },
        { characterId: 'haldor', toLocationId: 'the_seawall' },
      ],
    },
    {
      id: 'we_northgate_deadline',
      atWorldMinute: 7 * 1440 + 12 * 60,
      locationId: 'cadet_quarters',
      publicCopy: 'At noon a Northgate courier signs for a cream envelope at the cadet block desk.',
      directorNotes:
        'Kaede sent the acceptance. She will fight for Northgate at the Trials, across the Pit from Unit Nine, and she will not explain it to anybody who did not ask her to stay. This never happens if she is already in the front seat.',
      setsFlags: ['kaede_signed_with_northgate'],
      cancelledByFlags: ['kaede_is_your_pilot'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_inspectors',
      atWorldMinute: 8 * 1440 + 9 * 60,
      locationId: 'command_tower',
      publicCopy: 'Two grey cars from the Defence Ministry pull up at the foot of the tower, and the duty officers start saluting things.',
      directorNotes:
        'The inspectors want to see Unit Nine before the Trials, and they want to meet whoever is crewing it. Graf is more courteous than ever. Northgate’s team arrives on the same afternoon in a better bus.',
      setsFlags: ['inspectors_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'graf', toLocationId: 'command_tower' }],
    },
    {
      id: 'we_the_trials',
      atWorldMinute: 9 * 1440 + 10 * 60,
      locationId: 'the_pit',
      publicCopy: 'The Trials open. The Pit is full to the top step, the town has come up the cliff road, and the inspectors are at the rail.',
      directorNotes:
        'Three bouts, a Ministry verdict, and the academy’s future decided by the afternoon. Whatever the player built over nine days is visible in who is standing next to them now.',
      setsFlags: ['trials_held'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'kaede', toLocationId: 'the_pit' },
        { characterId: 'haldor', toLocationId: 'the_pit' },
        { characterId: 'graf', toLocationId: 'the_pit' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_fight_or_cutter',
      kind: 'FINALE',
      label: 'Whether Unit Nine fights or gets cut',
      seedHint: 'A red decommission tag wired to its knee, and a voice asking you not to leave.',
      payoffHint: 'Nine days later in the Pit, in front of the Ministry: a crew in both seats, or the cutters back on the slipway.',
      weight: 1,
    },
    {
      id: 'p_kaede',
      kind: 'RELATIONSHIP',
      label: 'The cadet who wanted this suit for two years',
      seedHint: 'Forty-one dated attempts in a logbook she carries everywhere.',
      payoffHint: 'She climbs into the front seat with you behind her, or she signs with Northgate and meets you across the Pit.',
      weight: 0.9,
    },
    {
      id: 'p_gullwater',
      kind: 'MYSTERY',
      label: 'What happened in the back seat eleven years ago',
      seedHint: 'Pip says somebody’s name during a diagnostic and then goes quiet for four minutes.',
      payoffHint: 'A log with the Commandant’s voice on it, a report that lied, and a man who oils his sister’s wrench every Sunday.',
      weight: 0.6,
    },
    {
      id: 'p_haldor',
      kind: 'RIVAL',
      label: 'Second on the Board, with a family claim on the suit',
      seedHint: 'White gloves taken off finger by finger, and a challenge slip on your tray.',
      payoffHint: 'Blunted blades at noon, and the drawings his grandfather made on a dining table.',
      weight: 0.7,
    },
    {
      id: 'p_the_rustback',
      kind: 'BOSS',
      label: 'Something sixty years old walking out of the sea',
      seedHint: 'Gun posts every hundred metres along the Seawall, and a Commandant who walks it alone every morning.',
      payoffHint: 'A derelict the height of a house on the Seawall at night, with the town behind it.',
      weight: 0.75,
    },
  ],
  archetypes: [
    {
      id: 'arch_garage',
      name: 'You Grew Up In A Garage',
      role: 'Technical craft and repairs',
      summary: 'Your family fixed tractors and boat engines, so you hear what is wrong with a machine before the screens do, and the other mechanics trust your hands.',
      playstyle: ['Practical', 'Fixes things', 'Hands-on'],
      blurb: 'You were stripping engines before you were old enough to drive one, and you still cannot walk past a rattle without finding it.',
      attributeBonus: { mind: 2, might: 1 },
      skillProficiencies: { tinkering: 3, hauling: 1, noticing: 1 },
      startingItems: [{ itemId: 'toolroll', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_hangar', amount: 10 }],
    },
    {
      id: 'arch_washout',
      name: 'You Washed Out',
      role: 'Pilot training, unfinished',
      summary: 'You were a cadet here for one term and failed the link test, so you know how a suit moves and what the Board does to people, and some cadets remember you.',
      playstyle: ['Knows the cockpit', 'Proud', 'Quick in a fight'],
      blurb: 'One term on the pilot track before the link test sent you to the hangar, and you have never once said out loud how much that stung.',
      attributeBonus: { agility: 2, resolve: 1 },
      skillProficiencies: { piloting: 2, nerve: 2 },
      startingItems: [{ itemId: 'old_cadet_badge', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_cadets', amount: 10 }],
    },
    {
      id: 'arch_talker',
      name: 'You Talk To Machines',
      role: 'Social and machine affinity',
      summary: 'You have always talked to engines while you work, and they seem to run better for it, which makes you good with suits, with people and with lies.',
      playstyle: ['Talks a lot', 'Reads people', 'Feels the link'],
      blurb: 'The day shift thinks it is a joke that you say goodnight to the suits. The suits have never once complained.',
      attributeBonus: { arcana: 2, presence: 1 },
      skillProficiencies: { linking: 3, bluffing: 2 },
      startingItems: [{ itemId: 'diagnostic_slate', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_harbour',
      name: 'You Grew Up Below The Cliff',
      role: 'Salvage and stealth background',
      summary: 'You grew up in the harbour town under the academy, salvaging scrap off the slipway, so you know every back way up the cliff and the town knows you.',
      playstyle: ['Sneaky', 'Strong', 'Local'],
      blurb: 'Half the harbour has watched you climb that cliff since you could walk, and not one of them has ever told the academy about the path.',
      attributeBonus: { might: 2, agility: 1 },
      skillProficiencies: { slipping: 3, hauling: 2 },
      startingItems: [{ itemId: 'boat_shed_key', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_harbour', amount: 15 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the night shift call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Rook Adeyemi' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'How did you end up on the night shift?',
      helpText:
        'Where you came from before the hangar, which sets what you are good at. It is fixed for the whole story. It does not decide whether you climb out tonight, who sits in the front seat or whether Unit Nine survives the week; all of that is yours, and you can change your mind about any of it later.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the hangar know about you?',
      helpText: 'One plain sentence the crews would say about you behind your back. That is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Never late, never finished on time, and the only one who sings to the hydraulics.',
    },
    {
      id: 'first_instinct',
      label: 'When the hatch seals, what is your first instinct?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite in the cockpit and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'get_out', label: 'Get out, apologise, and hope nobody writes it down' },
        { id: 'stay_in', label: 'Stay in. Something in here wants you to' },
        { id: 'find_out', label: 'Read every screen before anybody can stop you' },
        { id: 'move_it', label: 'See if it will walk' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Kaede see through the glass?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Orange overalls, a rag in one hand, hair tied back with a cable tie, and a look of total panic.',
    },
  ],
  protagonist: {
    kind: 'BLANK',
    setupHeading: 'Who was cleaning the back seat?',
  },
  /**
   * Where this can end up.
   *
   * Five of these are Unit Nine winning at the Trials, split by who sat in the
   * front, because the front seat is the story's main decision. Three are the
   * suit failing, and "Scrap Value" needs no mistake: a suit nobody has seen
   * fight in eleven years can simply lose. "Six O'Clock" is reachable on the
   * first morning by doing nothing, and walking away down the cliff road is
   * reachable early. The Gullwater truth has two endings of its own and every
   * other destination is reachable by a player who never once asked Pip about
   * its last crew. Twelve, because the storyteller reads twelve.
   */
  endings: [
    {
      id: 'end_ironclad',
      name: 'Ironclad',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: {
        flagsSet: ['won_the_trials'],
        minFactionReputation: [{ factionId: 'faction_academy', value: 30 }],
      },
      condition:
        'Unit Nine won at the Trials and stays in service, and the player is on the roster beside it. This is the ordinary victory and it should feel earned and loud: the Board, the mess, the town in the stands, Ruiz pretending he has something in his eye. Name who was in the front seat and what it cost the suit.',
      epilogue:
        'The Board gets a new line that does not fit the font. The hangar crews start calling the back seat "the good seat", and two first-year cadets ask, nervously, whether the engineer track is going to come back. It does, in the spring, with a manual that has been read.',
      hint: '',
    },
    {
      id: 'end_two_seats',
      name: 'Two Seats',
      rarity: 'RARE',
      minTurn: 36,
      requires: {
        flagsSet: ['won_the_trials', 'kaede_is_your_pilot'],
        minRelationship: [
          { characterId: 'kaede', dimension: 'trust', value: 70 },
          { characterId: 'kaede', dimension: 'affection', value: 55 },
        ],
      },
      condition:
        'Kaede flew it from the front with the player keyed in behind her, and they won together. The rivalry has turned into a partnership without either of them saying so out loud. Keep the romance where these two would keep it: competitive, mostly unspoken, at most a kiss at the foot of the gantry after midnight, and her logbook with a forty-second entry in it.',
      epilogue:
        'Her logbook has a forty-second entry, dated, timed, link reading noted: "Opened. Two seats." She never shows it to anybody. Northgate writes to her twice more and she uses the envelopes to shim a wobbly workbench in Hangar Nine.',
      hint: 'She wanted the front seat for two years. She just did not know there was a back one.',
    },
    {
      id: 'end_second_on_the_board',
      name: 'Second On The Board',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['won_the_trials', 'haldor_is_your_pilot'] },
      condition:
        'Haldor Quist took the front seat and did not freeze, and his grandfather’s two-seat design won in public with a Quist in it. The rival became a crewmate on terms neither of them would have accepted a week ago. Let him be insufferable about it for exactly one scene and then honest.',
      epilogue:
        'The Quist Foundry sends a team to measure Unit Nine and Haldor stands beside the player the whole time, gloves on, answering every question about the rear seat with "ask the engineer". He learns the names of the entire night shift by midsummer, on purpose.',
      hint: '',
    },
    {
      id: 'end_one_seat',
      name: 'Nobody In Front',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['won_the_trials', 'flying_solo'] },
      condition:
        'The player flew Unit Nine alone from the back and won without the limiter, which should not have been possible and nearly was not. The suit is badly hurt and so is the player’s standing with the people who offered to sit in front. Write the cost plainly: the repairs, the pride, the empty seat.',
      epilogue:
        'Unit Nine spends six weeks on Ruiz’s bench. Pip is polite about it and asks, every few days, whether there is anybody the player would like it to meet. The front seat stays empty until the player decides otherwise.',
      hint: '',
    },
    {
      id: 'end_scrap_value',
      name: 'Scrap Value',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['lost_the_trials'] },
      condition:
        'Unit Nine lost at the Trials. It was an eleven-year-old suit against people who train every day, and losing must not read as a punishment for playing badly. The Ministry’s verdict comes in the afternoon. Write what the crew does with the time it has left, and let Pip be the one who makes it bearable.',
      epilogue:
        'The cutters come back on a Tuesday. Ruiz pulls Pip’s core himself, before they start, and it lives on a shelf in the Fishbowl after that, offering opinions about the radio. The player is still on the night shift, and has started teaching the first-years how to clean contacts properly.',
      hint: '',
    },
    {
      id: 'end_six_oclock',
      name: 'Six O’Clock',
      rarity: 'COMMON',
      minTurn: 12,
      requires: { flagsSet: ['unit_nine_cut'], flagsUnset: ['pip_in_a_box'] },
      condition:
        'Nobody stopped the cutters and Unit Nine was scrapped on the first morning, with Pip still inside it. This is the quiet failure of the whole premise and it should be written as a real loss: the slipway, the noise, the crew who came down to watch, and what the player does in the hour after.',
      epilogue:
        'The armour goes to a foundry inland and comes back as somebody else’s suit. The night shift does not talk about it. Kaede stops at the empty gantry once, late, and leaves before anybody sees her. The tin of contact polish stays in your locker for a year.',
      hint: '',
    },
    {
      id: 'end_lunchbox',
      name: 'A Voice In A Lunchbox',
      rarity: 'RARE',
      minTurn: 18,
      requires: { flagsSet: ['unit_nine_cut', 'pip_in_a_box'] },
      condition:
        'The suit was cut, and the player carried Pip out in its core module before the cutters started. Unit Nine is gone and Pip is not, which is a smaller and stranger kind of win. Write a story about a mechanic and a lunchbox with opinions, and what they decide to do next.',
      epilogue:
        'Pip lives on the bunkhouse shelf for a while, then in the Fishbowl, then, after a great deal of paperwork Ruiz pretends not to have done, in the rear seat of a training suit nobody else wanted. It still counts how many times you clean the left side.',
      hint: 'There is a handle on the core. Somebody put it there for a reason.',
    },
    {
      id: 'end_seawall',
      name: 'The Seawall Holds',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['saved_gullwater', 'fought_the_rustback'],
        minFactionReputation: [{ factionId: 'faction_harbour', value: 40 }],
      },
      condition:
        'The player met the derelict on the Seawall and the town stood. Gullwater remembers who was in front of it, which it could not do eleven years ago, and that matters to the harbour families more than any Board. Machine against machine; people hurt, stated plainly. End on the town, not the academy.',
      epilogue:
        'The noodle stall will not take your money for a year. Somebody paints Unit Nine’s hull number on the harbour wall, badly, and the academy has it scrubbed off twice before it gives up and lets it stay.',
      hint: '',
    },
    {
      id: 'end_eleven_years_late',
      name: 'Eleven Years Late',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['the_log_is_public', 'gullwater_answered'] },
      condition:
        'The player played Pip’s log for the whole academy, and everybody heard the Commandant order the limiter off. Graf saved four thousand people and killed one and lied about it, and now everybody knows all three. Do not make her a villain. Write what the truth costs her, what it gives Ruiz, and what it does to an academy that was already on the edge.',
      epilogue:
        'Graf resigns the next morning and walks the Seawall alone one last time. Ruiz does not speak to anybody for two days, then asks for the report to be reissued with his sister’s name spelled correctly. The Ministry takes a month longer to decide about the academy than it had planned to.',
      hint: 'Pip has been waiting eleven years for somebody to ask the right question.',
    },
    {
      id: 'end_what_the_chief_knows',
      name: 'What The Chief Knows',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['ruiz_knows_the_truth', 'gullwater_answered'], flagsUnset: ['the_log_is_public'] },
      condition:
        'The truth about Gullwater reached Bo Ruiz and nobody else. What he does with it is his, and the ending is about that: a grieving man finally holding the fact he needed, and choosing in private what it is for. If Graf told him herself, write that conversation as the hardest thing either of them has done.',
      epilogue:
        'Ruiz and Graf are seen once, at dawn, walking the Seawall together without speaking. Nobody on the night shift asks. The engraved wrench comes off his bench and goes into the player’s tool roll, without a word, the following Sunday.',
      hint: '',
    },
    {
      id: 'end_off_the_books',
      name: 'Off The Books',
      rarity: 'COMMON',
      minTurn: 14,
      requires: { flagsSet: ['thrown_out'] },
      condition:
        'The player lied to the academy police, nobody vouched for them, and Graf’s hearing took their pass. They are off the headland and Unit Nine is somebody else’s problem now. Do not make it a tragedy; make it a door that closed because of a specific choice, and let somebody from the night shift come down to the harbour to say so.',
      epilogue:
        'You get a job on the boats in Gullwater. Twice a week a mechanic in orange buys noodles from Noa’s mother’s stall and leaves you the news from the hangar. The last piece of news is about who sits in Unit Nine’s back seat now.',
      hint: '',
    },
    {
      id: 'end_down_the_cliff_road',
      name: 'Down The Cliff Road',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked away from the academy, the suit and the whole thing, and did not come back. It is a coherent response to a machine choosing you in the middle of the night and it should not be redeemed or punished. The person it costs most is not the player.',
      epilogue:
        'Pip waits in the gantry for eleven nights and then stops talking again. Ruiz cleans the rear seat contacts himself every Sunday after that, badly, with your tin of polish. Kaede never tries the front seat again.',
      hint: '',
    },
  ],
  opening:
    "The hatch slams shut behind you. You were only cleaning the back seat.\n\nLocks shoot home. Screens nobody has seen lit in eleven years flood the cockpit amber.\n\nA woman in a cadet flight jacket is on the ladder outside, face at the glass.\n\n\"That is my suit,\" says Kaede Strand. \"Two years it would not open for me. Get out before they see you.\"\n\nDown the hangar row, the alarms start.\n\nA voice comes from the speaker by your ear, quiet and very polite. \"Please don’t. They’re cutting me up at six.\"\n\nKaede slaps her palm flat on the glass.\n\n\"Mechanic. Are you getting out, or am I pulling you out?\"",
  openingPanel: {
    assetKey: 'story_ironclad_cadets/opening',
    alt: 'Kaede in a navy cadet flight jacket on a gantry ladder, palm flat on the amber-lit cockpit glass of a grey-green armoured suit, red hangar alarms turning behind her.',
  },
  openingSuggestions: [
    "\"I was cleaning the seat, I swear! It shut on me. Who just said please?\"",
    'I find the hatch release and climb out slowly, hands where she can see them.',
    "I put my hands on the controls. \"Okay, voice. You want to live past six? Then walk.\"",
  ],
  publishedAt: null,
};

export const IRONCLAD_CADETS = StoryVersion.parse(raw);
