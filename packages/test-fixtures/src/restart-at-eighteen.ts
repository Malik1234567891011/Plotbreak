import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Restart at Eighteen" — one night, done again, with the map already in your
 * head.
 *
 * The player falls asleep at twenty-eight and wakes up at eighteen at 16:40 on
 * graduation day, in their old bedroom, with a stat window only they can see
 * and ten points to spend. They remember the first time to the minute: at
 * 22:00 Dad signs the garage away, at 22:40 a crate of fireworks burns the
 * boat shed and Jun takes the blame, and from 23:00 to 23:47 Sara waits on the
 * old pier for somebody who never comes. Three regrets inside one hour.
 *
 * The playable span is that one night, from 16:40 to the 6:10 bus. Everything
 * before is memory (the hard canon carries the first night exactly, because
 * the narrator has to be able to play it back), and everything after is an
 * ending.
 *
 * The structural bet is that knowing the future is not the same as being able
 * to change it. Left alone, the night pulls back toward what happened: a crate
 * hidden in one place becomes a box of flares in another, a talk that changed
 * Dad's mind is undone by one phone call. A change holds when somebody in the
 * story chooses it. That rule is in the hard canon, in two world events, and in
 * Ripple's negative regen, so all three layers say the same thing.
 *
 * The stat window is the genre's hook and the opener's first decision, but the
 * production narrator never reads resources or abilities, so everything it
 * needs about the four stats lives in hard canon in plain words. The window's
 * voice, the System, is a CharacterDef because it has a voice, wants and
 * limits, and it is last in the cast so it never takes a cover slot.
 *
 * Everyone in this story is eighteen or older, and the prose is told so.
 *
 * Three invisible variables. Nerve is the one honest restorable thing,
 * because `resolveRest` refills GOOD_HIGH resources and a night genuinely runs
 * out. Strangeness is first among the descending ones on purpose: being seen
 * in a fight at a party is exactly the kind of thing that makes people notice
 * you are not who you were this morning. Ripple drifts back down by itself,
 * which is the night pulling back.
 */

const raw = {
  id: 'sv_restart_at_eighteen_1',
  storyId: 'story_restart_at_eighteen',
  version: 1,
  title: 'Restart at Eighteen',
  fantasyLabel: 'Ten years back. One night to fix it.',
  hook: 'You wake up ten years younger on graduation day, with a stat window only you can see, ten points to spend, and one night to undo the party that ruined three lives.',
  premise:
    'You fall asleep at twenty-eight in a rented room, holding a bus ticket that came in the post with no note. You wake up at eighteen in your old bedroom on the afternoon of your graduation, with a pale blue window floating over the bed that only you can see.\n\n' +
    'The window shows four numbers, charm, grit, wits and luck, and gives you ten points to spend on them. It says it will give you more every time you change something that happened the first time.\n\n' +
    'You remember the first time exactly. Tonight there is a party at a lake house. At ten, your dad sells the family garage to the richest man in town. At 10:40 a crate of fireworks burns a boat shed and your best friend Jun takes the blame. At eleven, Sara is on the old pier waiting for you until 11:47, then leaves town on the morning bus for good.\n\n' +
    'Last time you were at that party. You saw who lit the fireworks, said nothing, and never made it to the pier. Now you have one night to change what you can before the window asks whether to keep this version of your life. Get it wrong and you lose all three again.\n\n' +
    'Nobody else remembers the first time. If you tell them, they will think something is wrong with you.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Drama', 'Romance', 'Coming of age', 'Slice of life', 'Second chance'],
  mechanicsChips: [
    'A stat window only you can see',
    'Ten points on turn one',
    'Three regrets, one night',
    'The night pulls back',
    'Keep the draft, or wake up',
  ],
  contentDescriptors: ['ROMANCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can fix one thing properly, all three badly, or nothing at all and spend the night in the garage with your dad, and every one of those is a real way to play this. The window pays you for changing things. It never tells you which change was worth it.',
  openingObligations: [
    {
      what: 'Be at the party at the lake house by eight. Jun has already told everybody you are coming.',
      withCharacterId: 'jun',
      dueInMinutes: 200,
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'your_room',
    startWorldMinute: 16 * 60 + 40,
    startingItems: [
      { itemId: 'faded_ticket', qty: 1 },
      { itemId: 'old_phone', qty: 1 },
    ],
    hardCanon: [
      'The player is twenty-eight in memory and eighteen in body. They fell asleep at twenty-eight holding an old bus ticket and woke at 16:40 on the afternoon of their graduation, in their old bedroom on Ferry Road. Ten years were undone for them and for nobody else. Nobody else remembers the first time.',
      'Everyone in this story is eighteen or older. The graduating class are eighteen or nineteen. Describe everyone as the adult they are: never in looks, manner or words that read as younger than eighteen.',
      'Only the player can see the window or hear the voice in it, which calls itself the System. The window shows four stats, Charm, Grit, Wits and Luck, each starting at 2, with 10 unspent points. A stat at 5 is noticeable, at 8 remarkable, at 10 uncanny, and nothing goes above 10. Spending is instant and permanent, and the player feels it land.',
      'The System awards new points for changing what happened the first time: +1 for a small change that holds, +2 for changing what a person does, +3 for changing one of the three big things (the signature, the fire, the pier). It announces every award in one short bracketed line, with the time.',
      'What the stats do: Charm makes people listen a beat longer and forgive one strange remark. Grit lets the player hold a line, take a shove, stay awake, and say the hard thing without taking it back. Wits sharpens what they notice now and how exactly they remember the first time. Luck bends small coincidences: a green light, a dropped key, the right person turning round. No stat makes anybody act against their own character.',
      'The first night, exactly: 18:30 Dad comes home with a blue folder. 19:05 Sara texts "Are you actually coming tonight? I need to tell you something. In person." 19:15 Theo Ashcroft loads a crate of display rockets into his car behind the hardware store. 20:00 the party starts at the Ashcroft lake house. 21:30 Sara says "Old pier. Eleven. Please come." 22:00 Dad signs the garage over to Graham Ashcroft in his study. 22:40 Theo lights the crate on the boathouse roof, a rocket goes sideways into the boat shed and it burns; nobody is hurt. 22:55 Graham puts the blame on Jun, who was standing nearest. The player saw Theo light it and said nothing. 23:00 to 23:47 Sara waits on the old pier; the player never comes. 06:10 Sara leaves town on the first bus.',
      'What the ten years did: Jun lost his place at the fire service academy over the fire and stopped speaking to the player at twenty-two. The morning after the sale the player told Dad "I never asked you to do this, and I will never forgive you for it," and after that they spoke about twice a year. The player never saw Sara again; she is alive in the city, a stranger. At twenty-eight Sara’s mother sold the bakery, found an unused 6:10 ticket with the player’s name on it in Sara’s handwriting, and mailed it with no note. That ticket came back with the player and is still in their pocket.',
      'Left alone, the night pulls back toward what happened. A crate hidden in one place becomes a box of flares in another; a talk that changed Dad’s mind is undone by one phone call. A change holds when somebody in the story chooses it, not when the player merely arranges it.',
      'The System cannot touch the world, cannot talk to anybody but the player, cannot see further ahead than the player remembers, and will not fix anything. In the corner of the window, very small and grey, it says ATTEMPT 2. Nobody brings that up unless the player looks closely at the window or asks the System about itself.',
      'At 6:10, as the bus pulls out, the window asks one question: keep this draft and live forward from eighteen, or wake at twenty-eight and see what tonight changed. Either answer can be right.',
      'Sara is leaving town on the 6:10 for her own reasons, and she does not need to be saved from it. Nobody in this story is a prize, and nobody is a villain, Graham Ashcroft included.',
    ],
    toneGuide:
      'Warm, funny and sore, in the key of a good second-chance anime: a summer evening, cicadas, string lights, a bonfire, a group chat going off every forty seconds, and underneath it a twenty-eight-year-old who knows how all of it ends. ' +
      'The comedy is the gap between adult habits and an eighteen-year-old life: calling Dad by his first name by accident, knowing a song that has not come out yet, being tired at nine, being much too good at small talk with Graham Ashcroft. The ache is that everyone the player lost is right here and does not know. ' +
      'Keep the clock visible: the party at eight, ten, 10:40, eleven, 11:47, midnight, 6:10. The System speaks only in short bracketed lines with times in them, and never gives a speech. ' +
      'Nobody at this party is drunk; the night goes wrong through fireworks, a signature, a lie and a missed meeting. Romance with Sara is between two eighteen-year-olds who have liked each other for years, and goes as far as a kiss. A shove or a punch at the party is possible, is seen by everybody, and changes how people look at the player. ' +
      'The face at the top of a beat is whoever the player is talking to.',
    proseStyle: 'webnovel',
    styleExamples: [
      "[22:31. Change detected: Jun is not on the boathouse rail. +2.]\n\nThe window blinks once and goes back to being the corner of your eye.\n\nJun is on the bonfire side of the lawn, holding two paper cups, staring at you.\n\n\"Why did you just walk me into a hedge?\"\n\n\"Bee,\" you say.\n\n\"There's no bee.\"\n\n\"There was a bee.\"",
      "Dad doesn't look up from the folder.\n\n\"Garage stuff,\" he says. \"Go to your party.\"\n\nYou know what's on page three. You know what that lot sells for in three years.\n\n\"Dad. Look at me.\"\n\nHe does. He looks tired, and fifty-one, and younger than you remember him ever being.\n\n\"Since when do you say my name like it's a warning?\"",
      "Sara is sitting on the end of the pier with her shoes off, and she doesn't turn round.\n\n\"You came,\" she says, like she'd bet against it.\n\n[23:02. This did not happen last time.]\n\nShe pats the boards beside her. There's an envelope in her lap, and the corner of it says 6:10.\n\n\"Sit down before I change my mind.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 11, resolve: 11, arcana: 9 },
  skills: [
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Getting a person to listen a beat longer than they meant to, and to forgive one strange remark.' },
    { id: 'grit', name: 'Grit', attribute: 'resolve', description: 'Holding a line, taking a shove, staying awake, saying the hard thing and not taking it back.' },
    { id: 'wits', name: 'Wits', attribute: 'mind', description: 'Noticing what is in front of you tonight, and what is different from the first time.' },
    { id: 'luck', name: 'Luck', attribute: 'arcana', description: 'Small coincidences leaning your way: a green light, a dropped key, the right person turning round.' },
    { id: 'hindsight', name: 'Hindsight', attribute: 'mind', description: 'Remembering exactly how tonight went the first time, to the minute, and acting on it.' },
    { id: 'passing', name: 'Passing', attribute: 'agility', description: 'Sounding and acting eighteen when your head is twenty-eight.' },
    { id: 'hands', name: 'Garage Hands', attribute: 'might', description: 'Engines, locks, hinges, a stuck crate lid. Anything with a bolt in it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Nerve is GOOD_HIGH because `resolveRest` restores those, and because an
   * eighteen-year-old body that has not slept since the ceremony, run by a
   * tired twenty-eight-year-old, genuinely runs out. It is also what the
   * generic cost path spends, which is right: the price of a bad exchange
   * tonight is that you have less left for the next one.
   *
   * Strangeness is first among the descending pair on purpose, because
   * PUBLIC_VIOLENCE takes the first GOOD_LOW in array order: a punch thrown at
   * a party is exactly the thing that makes the town notice you are not who you
   * were this morning. Ripple falls back on its own every hour, which is the
   * night pulling itself back toward what happened.
   */
  resources: [
    {
      id: 'nerve',
      name: 'Nerve',
      max: 100,
      start: 75,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is running on nothing: ten years of tired in a body that has not slept since the ceremony. They say the true thing too bluntly and the funny thing too late, and they sit down on the nearest step whenever a scene lets them.',
      color: '#F4A261',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on empty. The player is short with people they love, misses a joke by a beat, and agrees to things to end conversations. This is the band where a careful plan becomes a blurted one, and where sitting down on the end of a pier for ten minutes is genuinely the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long, strange evening. Fine for one more hard conversation and honest about not wanting two. Good for a quiet scene, bad for running the length of the shore path. Nobody needs to remark on it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'The night is still in front of them. The player has the room to be patient, to be funny on purpose, to say the difficult thing well rather than bluntly, and to be in two places in one hour if they plan it. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'strangeness',
      name: 'Strangeness',
      max: 100,
      start: 5,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody has noticed anything. To everyone in town the player is exactly who they were this morning: a little quiet, a little late, somebody they have known all their lives.',
      color: '#9B8FD1',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody is looking twice. The player can say an odd thing and have it taken as a joke, call Dad by his first name and have it laughed off. Friends treat them exactly as they did this morning, which is both a relief and an ache.',
        },
        {
          upTo: 50,
          behaviour:
            'People have noticed something and are being kind about it. Jun asks if they are feeling all right, twice. Sara watches them over the top of her cup. Dad asks what they have eaten today. An odd remark now gets a pause before the laugh.',
        },
        {
          upTo: 80,
          behaviour:
            'The class is talking. Somebody has filmed something and it is going round the group chat. Jun is worried rather than amused, Dad is quiet in a new way, and Graham Ashcroft has started watching the player the way he watches anything that might become a problem.',
        },
        {
          upTo: 100,
          behaviour:
            'People are frightened for the player rather than of them. Somebody has phoned Dad. Every true thing the player says now lands as a symptom, and the only people still listening without flinching are the ones who already believed them.',
        },
      ],
    },
    {
      id: 'ripple',
      name: 'Ripple',
      max: 100,
      start: 0,
      regenPerHour: -1,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Tonight is running exactly as it did the first time, to the minute. The player knows every beat that is coming, and every one of them will happen unless somebody makes it not.',
      color: '#5FA8D3',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The night is on its old rails. Everything happens when the player remembers it happening, the same song plays at the same moment, and they can walk through it like a rehearsal. Left alone, it will end exactly as before.',
        },
        {
          upTo: 50,
          behaviour:
            'Some of tonight is new. The big beats are still on their old times, but people are saying lines the player has never heard and small things turn up in the wrong places. Memory is still a good map with a few roads missing.',
        },
        {
          upTo: 80,
          behaviour:
            'The player is off the map. People are where they are not expected, conversations go places they never went, and the old times are guesses. The System starts announcing changes the player did not know they had made.',
        },
        {
          upTo: 100,
          behaviour:
            'A completely new night. Nothing the player remembers can be trusted to happen, including the good parts. The System goes quiet for long stretches, because it only ever knew what the player knew.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'faded_ticket',
      name: 'The Faded Ticket',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'A paper bus ticket for the 6:10 out of town, dated tomorrow morning and already ten years old: soft at the folds, the ink gone brown. Your name is written across it in Sara’s handwriting.',
      loreText:
        'Her mother found it when she sold the bakery and cleared the flat upstairs, and mailed it to you with no note. You fell asleep at twenty-eight holding it. It is the only thing that came back with you, and the date on it is valid for tomorrow’s bus.',
      icon: 'ticket',
    },
    {
      id: 'old_phone',
      name: 'Your Old Phone',
      tags: ['personal'],
      skillModifiers: { hindsight: 1 },
      description:
        'A phone you replaced nine years ago, cracked across one corner, with the class group chat going off every forty seconds.',
      loreText:
        'The contacts list has eleven people in it you have not spoken to in a decade. Every one of them will be at the lake house by nine.',
      icon: 'phone',
    },
    {
      id: 'acceptance_letter',
      name: 'The Acceptance Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'An offer of a place on the engineering course at the state university in the city, starting in September, folded small in your sticking desk drawer. The first time, you told everybody you never applied.',
      loreText:
        'It has been flattened out under something heavy. You did not do that. Somebody took it out of the bin in April and put it back in your drawer.',
      icon: 'letter',
    },
    {
      id: 'blue_folder',
      name: 'The Blue Folder',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Three pages of a sale agreement between Dad and Graham Ashcroft for the garage and its lot on Ferry Road, unsigned, with the price written in Dad’s careful capitals.',
      loreText:
        'You know what that lot sells for in three years, when the lake rezoning goes through. You read it at twenty-six on a train. It is about nine times this number.',
      icon: 'papers',
    },
    {
      id: 'fireworks_crate',
      name: 'The Crate of Fireworks',
      tags: ['quest'],
      questItem: true,
      description:
        'A wooden crate of display rockets, the professional kind, bought on the Ashcroft Hardware account. Long fuses, and an instruction sheet inside the lid that nobody has read.',
      loreText:
        'The first time, at 10:40, the second rocket went sideways through the open door of the boat shed. Nobody was hurt. Everything else about that night was.',
      icon: 'crate',
    },
    {
      id: 'sara_jacket',
      name: 'Sara’s Denim Jacket',
      tags: ['personal'],
      skillModifiers: { charm: 1 },
      description:
        'Oversized denim with a pin badge on every inch of the collar, left over a log by the bonfire. There is an index card in the inside pocket.',
      loreText:
        'The card is the line she cut from her graduation speech this morning. Your name is in it.',
      icon: 'jacket',
    },
    {
      id: 'garage_keys',
      name: 'The Garage Keys',
      tags: ['tool'],
      skillModifiers: { hands: 1 },
      description:
        'Dad’s spare ring: the bay doors, the office, the tow truck, and one small brass key nobody has ever explained.',
      loreText: 'The small key opens the office desk drawer, where Dad keeps the letters from the bank.',
      icon: 'keys',
    },
    {
      id: 'diploma',
      name: 'The Diploma',
      tags: ['personal', 'document'],
      description:
        'Rolled, ribboned and dropped on your desk this morning: your name, today’s date, and a signature from somebody you will have forgotten within a year.',
      loreText: 'The first time, you lost it in a move at twenty-three and did not notice for two years.',
      icon: 'scroll',
    },
  ],
  abilities: [
    {
      id: 'say_it_now',
      name: 'Say It Now',
      tags: ['social'],
      description: 'Tell somebody the true thing tonight, without dressing it up, and take whatever comes back.',
      affordances: ['tell the truth', 'say it', 'be honest', 'confess', 'come clean', 'admit it', 'say what i saw', 'tell him straight', 'tell her straight'],
      costs: [{ resourceId: 'nerve', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'grit', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_them_round',
      name: 'Talk Them Round',
      tags: ['social'],
      description: 'Change somebody’s mind the slow way: their reasons, your reasons, and a reason to move.',
      affordances: ['convince', 'persuade', 'talk him out of it', 'talk her round', 'change his mind', 'reason with', 'make the case', 'plead'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out what somebody is not saying from what their hands are doing while they talk.',
      affordances: ['look around', 'watch him', 'watch her', 'read him', 'read her', 'notice', 'study the room', 'look closer'],
      costs: [{ resourceId: 'nerve', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'wits', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'use_hindsight',
      name: 'Use Hindsight',
      tags: ['sight'],
      description: 'Act on what you remember from the first time: be where it happens, a minute before it happens.',
      affordances: ['i remember', 'last time', 'get there first', 'before it happens', 'be ready for it', 'use what i know', 'head it off', 'intercept'],
      costs: [{ resourceId: 'ripple', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'hindsight', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_what_you_know',
      name: 'Say What You Know',
      tags: ['social'],
      description: 'Tell somebody a thing you could only know from ten years from now, and watch them decide what you are.',
      affordances: ['tell him the future', 'tell her the future', 'i know what happens', 'predict', 'i came back', 'from the future', 'warn him', 'warn her', 'tell them what happens next'],
      costs: [{ resourceId: 'strangeness', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'act_eighteen',
      name: 'Act Eighteen',
      tags: ['social'],
      description: 'Sound and behave like the person you were this morning, so nobody looks at you twice.',
      affordances: ['act normal', 'play it cool', 'pretend', 'act my age', 'go along with it', 'joke it off', 'blend in'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'passing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_firm',
      name: 'Stand Firm',
      tags: ['social'],
      description: 'Refuse, hold the line, and do not get moved, by a best friend or by a man in a blazer.',
      affordances: ['refuse', 'say no', 'stand my ground', 'hold firm', 'not going', 'stay put', 'block the way', 'won’t do it'],
      costs: [{ resourceId: 'nerve', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'grit', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'push_your_luck',
      name: 'Push Your Luck',
      tags: ['utility'],
      description: 'Try the thing that only works if the night leans your way, and find out whether it does.',
      affordances: ['take a chance', 'gamble', 'risk it', 'try my luck', 'flip a coin', 'long shot', 'go for it'],
      costs: [
        { resourceId: 'nerve', amount: 6 },
        { resourceId: 'ripple', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'luck', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fix_it',
      name: 'Fix It',
      tags: ['utility'],
      description: 'Get your hands on something with a bolt in it: an engine, a lock, a crate lid, a stuck door.',
      affordances: ['fix', 'repair', 'open the lock', 'take it apart', 'unbolt', 'pry it open', 'start the truck', 'jam the lid'],
      costs: [{ resourceId: 'nerve', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'hands', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'spend_points',
      name: 'Spend Points',
      tags: ['utility'],
      description: 'Put unspent points from the window into charm, grit, wits or luck. They take effect at once and never come back out.',
      affordances: ['allocate', 'spend the points', 'put points into', 'add points to', 'level up', 'assign the points', 'put all ten into'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_with_them',
      name: 'Stay With Them',
      tags: ['social'],
      description: 'Do not fix it, do not explain it, and do not leave. Sit down next to them and be there.',
      affordances: ['sit with him', 'sit with her', 'say nothing', 'wait with', 'just be there', 'keep him company', 'keep her company', 'stay with'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_the_log',
      name: 'Open the Log',
      tags: ['sight'],
      description: 'Look hard at what the window keeps in its corner, and read what happened the first time somebody tried this.',
      affordances: ['open the log', 'read the log', 'look at the corner', 'tap the number', 'check the attempt', 'what is attempt 2'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'wits', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_log'],
        lockedCopy:
          'There is a window with four numbers on it and some points to spend. If there is anything else on it, you have not looked hard enough to see it.',
      },
    },
    {
      id: 'keep_this_draft',
      name: 'Keep This Draft',
      tags: ['utility'],
      description: 'Tell the window to keep tonight as it is, and live forward from eighteen.',
      affordances: ['keep it', 'keep this draft', 'save it', 'stay eighteen', 'keep this life', 'yes, keep it'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['dawn_came'],
        lockedCopy: 'Nothing is asking you to keep anything yet. It is still tonight, and tonight is still happening.',
      },
    },
    {
      id: 'wake_at_28',
      name: 'Wake at Twenty-Eight',
      tags: ['utility'],
      description: 'Close the window and go back to the morning you came from, to see what tonight changed.',
      affordances: ['go back', 'wake up', 'return', 'go home to twenty-eight', 'see what changed', 'close the window'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['dawn_came'],
        lockedCopy: 'There is no way back from here yet. The window has not asked, and it will not ask until the night is over.',
      },
    },
  ],
  locations: [
    {
      id: 'your_room',
      name: 'Your Room',
      shortName: 'Your Room',
      description:
        'A narrow bedroom at the back of the house on Ferry Road, exactly as you left it ten years ago: posters you are embarrassed by, a desk with a drawer that sticks, a graduation gown on the back of the door, and a soft blue window over the bed that is not part of the house. Only you can see that one.',
      artDirection:
        'Small cluttered bedroom in late-afternoon summer light, posters on the walls, a desk with a sticking drawer, a dark graduation gown hanging on the door, an unmade bed with a soft pale blue translucent panel glowing above it. Nostalgic, warm, slightly unreal.',
      connections: [
        { to: 'your_house', travelMinutes: 1, label: 'Down the hall to the kitchen' },
        { to: 'the_save_room', travelMinutes: 0, lockedByFlag: 'knows:attempt_one', label: 'Close your eyes and step into the window' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'acceptance_letter', qty: 1, ownerId: null, aka: ['letter', 'the letter', 'acceptance letter', 'the offer', 'college letter'] },
        { itemId: 'diploma', qty: 1, ownerId: null, aka: ['diploma', 'the certificate', 'the scroll'] },
      ],
    },
    {
      id: 'your_house',
      name: 'The House on Ferry Road',
      shortName: 'The House',
      description:
        'A two-bedroom house with a kitchen that smells of coffee and engine oil, a fridge covered in ten years of takeaway menus, and a kitchen drawer Dad has started keeping closed. The calendar by the door has GRADUATION written on today in his capitals, and nothing at all on tomorrow.',
      artDirection:
        'Small warm working-class kitchen in evening light, a scrubbed table with two chairs, a fridge covered in menus and magnets, a wall calendar by the door, one drawer slightly ajar. Lived-in, tidy, a little worn.',
      connections: [
        { to: 'your_room', travelMinutes: 1, label: 'Up to your room' },
        { to: 'ferry_road', travelMinutes: 1, label: 'Out of the front door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'blue_folder', qty: 1, ownerId: 'dad', aka: ['folder', 'the blue folder', 'the papers', 'sale papers', 'the contract'] },
        { itemId: 'garage_keys', qty: 1, ownerId: 'dad', aka: ['keys', 'spare keys', 'garage keys', 'the key ring'] },
      ],
    },
    {
      id: 'ferry_road',
      name: 'Ferry Road',
      shortName: 'Ferry Road',
      description:
        'The street you grew up on, running downhill to the lake: eleven houses, the garage at the bottom, the Dela Cruz porch two doors down with a basketball hoop nobody has used in years, and the old ferry pier at the very end where the road gives up. Cicadas, a dog that barks at everything, and a neighbour at every window.',
      artDirection:
        'Quiet downhill residential street at golden hour in summer, small wooden houses with porches, a faded basketball hoop, a lake glittering at the bottom of the hill, power lines and cicada-heavy trees. Nostalgic and specific.',
      connections: [
        { to: 'your_house', travelMinutes: 1, label: 'Home' },
        { to: 'the_garage', travelMinutes: 6, label: 'Down to Dad’s garage' },
        { to: 'main_street', travelMinutes: 8, label: 'Up into town' },
        { to: 'the_lake_house', travelMinutes: 15, label: 'The lake road round to the Ashcroft place' },
        { to: 'old_pier', travelMinutes: 5, label: 'To the end of the road and the old pier' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_garage',
      name: 'Dad’s Garage',
      shortName: 'The Garage',
      description:
        'Two bays, a hydraulic lift that works if you kick it, a radio tuned to the same station for twenty years, and an office whose desk drawer is full of letters from the bank. Dad painted the sign over the door himself. The first time, by the end of the summer, it was a marina repair shop with somebody else’s name on it.',
      artDirection:
        'Small two-bay roadside auto garage at dusk, roll-up doors half open, a car on a hydraulic lift, tools on a pegboard, a hand-painted sign over the door, a cluttered glass-walled office at the back. Oil, warm work light, long shadows.',
      connections: [{ to: 'ferry_road', travelMinutes: 6, label: 'Back up Ferry Road' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'main_street',
      name: 'Main Street',
      shortName: 'Main Street',
      description:
        'Four blocks of town: the bakery, Ashcroft Hardware, a pharmacy, a pizza place with three tables, and the bus shelter at the far end with a timetable everybody knows by heart. On graduation evening it is full of families taking photos of gowns and nobody looking up.',
      artDirection:
        'Small-town main street at summer dusk, shopfronts with awnings, families taking photos of graduates in dark gowns, a hardware store with a big sign, a bakery with a bell over the door, a glass bus shelter at the far end.',
      connections: [
        { to: 'ferry_road', travelMinutes: 8, label: 'Down to Ferry Road' },
        { to: 'the_bakery', travelMinutes: 1, label: 'Into the bakery' },
        { to: 'hardware_store', travelMinutes: 1, label: 'Into Ashcroft Hardware' },
        { to: 'bus_shelter', travelMinutes: 3, label: 'To the bus shelter at the end' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_bakery',
      name: 'The Bakery',
      shortName: 'The Bakery',
      description:
        'The Lindgren family bakery: a bell over the door, the last trays of the day going cheap, and a staircase at the back up to the flat where Sara has lived her whole life. Upstairs, her bag has been packed since Tuesday.',
      artDirection:
        'Small family bakery near closing time, wooden shelves with the last loaves, a glass counter, flour in the evening light, a narrow staircase at the back leading up. Warm, golden, a little bittersweet.',
      connections: [{ to: 'main_street', travelMinutes: 1, label: 'Back out to Main Street' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'hardware_store',
      name: 'Ashcroft Hardware',
      shortName: 'Hardware',
      description:
        'The biggest shop in town, with Graham Ashcroft’s office above it. Paint, rope, boat parts, a fishing-licence counter, and a back door onto an alley where deliveries go in and, this evening, a crate of display fireworks comes out.',
      artDirection:
        'Large old-fashioned hardware store interior, tall shelves of paint and rope and boat parts, a staircase up to a glass-fronted office, a back door open onto an alley with a silver car parked in it. Orderly and prosperous.',
      connections: [{ to: 'main_street', travelMinutes: 1, label: 'Back out to Main Street' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [],
    },
    {
      id: 'bus_shelter',
      name: 'The Bus Shelter',
      shortName: 'Bus Shelter',
      description:
        'A glass shelter at the end of Main Street with one bench, one bin, and a timetable that has not changed in ten years. The 6:10 is the first bus out in the morning and the only one that goes all the way to the city.',
      artDirection:
        'Glass bus shelter at the edge of a small town at dawn, one bench, a paper timetable, an empty road leading out between fields, pale blue light just before sunrise.',
      connections: [{ to: 'main_street', travelMinutes: 3, label: 'Back up Main Street' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 4 },
      takeableItems: [],
    },
    {
      id: 'the_lake_house',
      name: 'The Lake House',
      shortName: 'Lake House',
      description:
        'The Ashcroft summer house on the north shore: a deck bigger than your whole house, string lights, a bonfire on the lawn, a speaker system loud enough to reach the far bank, and ninety people from your class in various states of sunburn. Graham’s study is through the side door. The boathouse is down the lawn on the water.',
      artDirection:
        'Large lakeside summer house at night during a party, a wide wooden deck with string lights, a bonfire on the lawn, young adults in summer clothes with phones out, a boathouse at the water’s edge below. Golden, loud, joyful.',
      connections: [
        { to: 'ferry_road', travelMinutes: 15, label: 'The lake road home' },
        { to: 'the_boathouse', travelMinutes: 3, label: 'Down the lawn to the boathouse' },
        { to: 'the_study', travelMinutes: 1, label: 'Through the side door' },
        { to: 'old_pier', travelMinutes: 12, label: 'The shore path to the old pier' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'sara_jacket', qty: 1, ownerId: 'sara', aka: ['jacket', 'her jacket', 'denim jacket', 'the denim jacket'] },
      ],
    },
    {
      id: 'the_boathouse',
      name: 'The Boathouse',
      shortName: 'Boathouse',
      description:
        'A two-storey wooden boathouse with a flat tar roof you can climb onto from the railing, and a boat shed beside it full of fuel cans, life jackets and a sailing dinghy nobody has taken out in years. It is where the music is loudest and where Theo has carried the crate.',
      artDirection:
        'Two-storey wooden boathouse at the edge of a dark lake at night, flat roof reachable from a railing, an attached boat shed with its door open, fuel cans and life jackets inside, party lights up the lawn behind.',
      connections: [{ to: 'the_lake_house', travelMinutes: 3, label: 'Back up the lawn' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 3 },
      takeableItems: [
        { itemId: 'fireworks_crate', qty: 1, ownerId: 'theo', aka: ['crate', 'fireworks', 'the rockets', 'the box of rockets'] },
      ],
    },
    {
      id: 'the_study',
      name: 'Graham’s Study',
      shortName: 'The Study',
      description:
        'A wood-panelled room off the side of the lake house with a desk, two leather chairs, a framed map of the waterfront with half the lots shaded in, and a window onto the lawn where you can see the whole party without hearing it. At ten, Dad sits in one of those chairs.',
      artDirection:
        'Wood-panelled private study at night, a heavy desk with a fountain pen, two leather chairs, a framed map of a lake shoreline with lots shaded in, a window onto a party lawn with string lights. Quiet, expensive, cold.',
      connections: [{ to: 'the_lake_house', travelMinutes: 1, label: 'Back out to the party' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 1 },
      takeableItems: [],
    },
    {
      id: 'old_pier',
      name: 'The Old Pier',
      shortName: 'Old Pier',
      description:
        'The ferry stopped running before you were born and nobody ever took the pier down. Sixty metres of grey boards out over black water, one working lamp at the end, and the lake house lights across the bay. At eleven tonight, Sara sits on the end of it with her shoes off.',
      artDirection:
        'Long weathered wooden pier stretching into a dark lake at night, a single lamp at the far end, a pair of shoes on the boards, warm party lights reflected across the water from the far shore. Quiet, romantic, lonely.',
      connections: [
        { to: 'ferry_road', travelMinutes: 5, label: 'Back up Ferry Road' },
        { to: 'the_lake_house', travelMinutes: 12, label: 'The shore path to the lake house' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [],
    },
    {
      id: 'the_save_room',
      name: 'The Save Room',
      shortName: 'Save Room',
      description:
        'Inside the window. A plain room of soft blue light with a desk, one chair, and a log written in handwriting you recognise as your own. The clock on the wall says 6:10 and does not move.',
      artDirection:
        'Minimal room made of soft pale blue light, a simple desk with an open handwritten notebook, one chair, a wall clock stopped at ten past six, no visible walls at the edges. Calm, uncanny, quiet.',
      connections: [{ to: 'your_room', travelMinutes: 0, label: 'Open your eyes' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [],
    },
  ],
  /**
   * Array order is deliberate: PUBLIC_VIOLENCE drops the first faction, and a
   * fight at the party is something the whole class saw.
   */
  factions: [
    {
      id: 'faction_the_class',
      name: 'The Graduating Class',
      description:
        'About ninety people who finished this morning, every one of them eighteen or nineteen, every one of them at the lake house by nine with a phone out. Whatever happens tonight, they will be telling it at reunions for twenty years, and they will get it slightly wrong.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'Somebody from class' },
        { atReputation: 35, label: 'Invited to things' },
        { atReputation: 65, label: 'The one they tell stories about' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_ashcroft',
      name: 'The Ashcrofts',
      description:
        'Graham Ashcroft owns the hardware store, the marina, the lake house and the paper on half the waterfront, including the house the Dela Cruz family rents. The town has jobs because of him, and nobody on Ferry Road says what they think of him where he can hear.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A name on a list' },
        { atReputation: 30, label: 'Worth a handshake' },
        { atReputation: 60, label: 'Owed a favour' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_ferry_road',
      name: 'The Ferry Road Neighbours',
      description:
        'The street you grew up on: Dad, the Dela Cruz family two doors down, and the neighbours who watched you and Jun ride bikes into the same hedge for years. They look after their own, they remember everything, and the first time round they watched you stop coming home.',
      startingReputation: 45,
      ranks: [
        { atReputation: 0, label: 'From the street' },
        { atReputation: 40, label: 'One of ours' },
        { atReputation: 70, label: 'Called first' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'sara',
      name: 'Sara Lindgren',
      role: 'The one you lost. Top of the class, gave the graduation speech this morning, and leaves town on the 6:10 bus tomorrow',
      cardBlurb:
        'She has been your friend for most of your life, she is about to ask you to meet her on the old pier at eleven, and the last time she asked, you never came.',
      pronouns: 'she/her',
      publicTraits: ['Plans everything, then improvises the important part', 'Deadpan funny', 'Brave about other people and a coward about herself'],
      hiddenDrives: [
        'She bought a second ticket because she cannot make herself ask out loud, and she wants the ticket to do the asking',
        'She is afraid the city will find out she is ordinary, and leaving on the first bus is how she plans to outrun it',
      ],
      values: [
        'Being told the truth even when it lands badly',
        'Leaving on time, with everything she owns in one bag',
      ],
      fears: [
        'That she will ask and you will laugh',
        'That she will stay for somebody and resent it for the rest of her life',
      ],
      socialStyle:
        'Says the serious thing as a joke first and watches to see whether you catch it. Fidgets with whatever is in her hands. Leaves a conversation a beat before it gets comfortable.',
      boundaries: [
        'Will not stay in town for anybody, including you, and will be angry if you ask her to give up the place she earned',
        'Will not be told what she feels by somebody who has been strange for one evening',
      ],
      goals: [
        'Get on the 6:10 with everything she owns in one bag',
        'Ask you one question on the old pier at eleven, and get an answer either way',
      ],
      secrets: [
        {
          id: 'sara_two_tickets',
          fact: 'She has two tickets for the 6:10. The second has the player’s name on it in her handwriting. She saw the player’s acceptance letter in their desk drawer in April: the engineering course in the same city, which the player told everybody they never applied for.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you on the pier, if you get there before 11:47 and do not make her say it first.',
        },
        {
          id: 'sara_the_speech',
          fact: 'She cut a line about the player from her graduation speech this morning. The index card is in the inside pocket of her denim jacket.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you find her jacket by the bonfire, or ask her what she left out of the speech.',
        },
      ],
      speechStyle:
        'Dry, quick, understated. Short sentences that turn at the end. Gives times out loud, to the minute. Uses your name only when she is serious, and then twice.',
      topics: ['the 6:10 bus', 'her speech', 'the city', 'the old pier', 'the bakery', 'the letter in your drawer'],
      voiceSamples: [
        'Old pier. Eleven. Wear shoes you can take off.',
        'I have a list for the city. Item one, buy a real coat. Item two is classified.',
        'Don’t look at me like that. Like you’re about to apologise for something you haven’t done yet.',
        'I’m leaving at 6:10 either way. I just wanted to know which way.',
      ],
      appearance:
        'Straight dark-blonde hair cut to the jaw, grey eyes, flour on one sleeve at all hours, a plain summer dress under an oversized denim jacket covered in pin badges.',
      visualHook: 'An oversized denim jacket with a pin badge on every inch of the collar.',
      silhouette: 'Sitting on an edge with her shoes beside her, knees up, an envelope held flat against them.',
      artSeed: 'rae-sara-01',
      portrait: null,
      expressions: ['neutral', 'teasing', 'warm', 'worried', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 355, locationId: 'the_bakery', activity: 'awake in the flat above the bakery with a packed bag' },
        { startMinute: 355, endMinute: 380, locationId: 'bus_shelter', activity: 'on the shelter bench with an envelope in her lap' },
        { startMinute: 380, endMinute: 990, locationId: 'the_bakery', activity: 'behind the counter with flour on one sleeve' },
        { startMinute: 990, endMinute: 1140, locationId: 'the_bakery', activity: 'working the last shift, selling off the day’s trays cheap' },
        { startMinute: 1140, endMinute: 1250, locationId: 'the_bakery', activity: 'upstairs over the shop, changing her mind about a jacket' },
        { startMinute: 1250, endMinute: 1375, locationId: 'the_lake_house', activity: 'by the bonfire, checking the time' },
        { startMinute: 1375, endMinute: 1427, locationId: 'old_pier', activity: 'at the end of the old pier with her shoes off, waiting' },
        { startMinute: 1427, endMinute: 1440, locationId: 'the_bakery', activity: 'walking home the long way, not past your house' },
      ],
      homeLocationId: 'the_bakery',
      knowledgeScope: ['sara', 'the_bakery', 'the_old_pier', 'the_610', 'the_acceptance_letter', 'the_class', 'ferry_road'],
      startingRelationship: { trust: 52, affection: 60, respect: 50, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sara_shows_the_tickets',
          label: 'She shows you the second ticket',
          kind: 'TRUST',
          requires: { trust: 62, flagsSet: ['reached_sara'] },
        },
        {
          id: 'sara_kiss',
          label: 'She lets the moment on the pier be what it is',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 75 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 16, presence: 13, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'jun',
      name: 'Jun Dela Cruz',
      role: 'Your best friend for as long as either of you can remember. Lives two doors down, and is due at the fire service academy in August',
      cardBlurb:
        'He has been in your doorway every day of your life and he is in it now, grinning, sure you are coming to the party. The last time, he took the blame for a fire you watched somebody else start, and you let him.',
      pronouns: 'he/him',
      publicTraits: ['Loud, generous, and first through any door', 'Loyal past the point of sense', 'Cannot keep a straight face'],
      hiddenDrives: [
        'He has wanted to be a firefighter for as long as he can remember and is privately scared he is not clever enough for the academy',
        'He is holding his family’s rent together with his summer wages and has told nobody, including you',
      ],
      values: ['Turning up', 'Not leaving anybody behind at a party, a lake or a fight'],
      fears: ['Being the one everybody likes and nobody takes seriously', 'Losing the academy place before August'],
      socialStyle:
        'Physical and loud. Throws things at you instead of saying hello. Goes very quiet and very still when something is actually wrong, which is how you know.',
      boundaries: [
        'Will not name names, including Theo’s, even to save himself',
        'Will not be lied to twice by the same person',
      ],
      goals: [
        'Get you to one party before everybody leaves town',
        'Get through the summer without his mum finding out about the rent',
      ],
      secrets: [
        {
          id: 'jun_the_rent',
          fact: 'His family is two months behind on rent to the Ashcrofts, who own their house. Graham Ashcroft knows. That is part of why Jun never fought the blame the first time.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you ask why he will not name Theo, before the fire or after it, and you have not lied to him tonight.',
        },
        {
          id: 'jun_the_academy',
          fact: 'His place at the fire service academy is conditional on a clean record until August.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it as a joke if you ask about August, and stops laughing halfway through.',
        },
      ],
      speechStyle:
        'Fast and loud, nicknames for everybody, sentences that start before the last one finished. Asks a question and answers it himself. Swears mildly and creatively.',
      topics: ['the party', 'the fire service academy', 'Theo', 'his family', 'the summer', 'what is wrong with you today'],
      voiceSamples: [
        'Party’s at eight. You’re coming this time, right? Right. Good. I already told everybody you were.',
        'Why are you staring at me? Is it the shirt? It’s the shirt. Mum ironed it, I can’t change it now.',
        'I don’t name names, man. Not even his. You know that about me.',
        'Since when do you talk like my uncle? You sound exactly like my uncle. Stop it.',
      ],
      appearance:
        'Broad-shouldered and restless, buzzed black hair, a wide grin with one chipped front tooth, and the fire service academy T-shirt he got at the open day in March and has worn ever since.',
      visualHook: 'A chipped front tooth that shows every time he grins, which is constantly.',
      silhouette: 'Leaning in a doorframe with one arm up on it, the other hand about to throw something at you.',
      artSeed: 'rae-jun-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'confused', 'worried', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'ferry_road', activity: 'on the sofa at his family’s house two doors down' },
        { startMinute: 480, endMinute: 990, locationId: 'ferry_road', activity: 'on his porch, fixing a bike that is beyond fixing' },
        { startMinute: 990, endMinute: 1060, locationId: 'your_room', activity: 'in your doorway, throwing your shoes at you' },
        { startMinute: 1060, endMinute: 1170, locationId: 'ferry_road', activity: 'on his porch ironing his one good shirt and texting everybody' },
        { startMinute: 1170, endMinute: 1200, locationId: 'main_street', activity: 'buying ice for the party with money he does not have' },
        { startMinute: 1200, endMinute: 1340, locationId: 'the_lake_house', activity: 'at the party, loud, everybody’s friend' },
        { startMinute: 1340, endMinute: 1380, locationId: 'the_boathouse', activity: 'by the boathouse rail, watching Theo set up the crate' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_lake_house', activity: 'back at the bonfire' },
      ],
      homeLocationId: 'ferry_road',
      knowledgeScope: ['jun', 'ferry_road', 'the_class', 'theo', 'the_party', 'the_academy', 'the_dela_cruz_house'],
      startingRelationship: { trust: 70, affection: 72, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'jun_believes_you',
          label: 'He stops treating it as a bit',
          kind: 'TRUST',
          requires: { trust: 75, flagsSet: ['told_jun_the_truth'] },
        },
        {
          id: 'jun_stops_covering',
          label: 'He tells you why he will not name Theo',
          kind: 'ALLIANCE',
          requires: { trust: 78 },
        },
      ],
      attributes: { might: 15, agility: 14, mind: 10, presence: 14, resolve: 12, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'dad',
      name: 'Dad',
      calledName: 'Dad',
      role: 'Your father. Tomas to everybody else on Ferry Road. Runs a two-bay garage with one employee, who is him',
      cardBlurb:
        'He raised you on his own in the house on Ferry Road, he has a blue folder in the kitchen drawer he has not mentioned, and at ten tonight he is going to sign the garage away to pay for a future you already turned down.',
      pronouns: 'he/him',
      publicTraits: ['Quiet in a way that fills a room', 'Fixes things instead of talking about them', 'Never once late for anything'],
      hiddenDrives: [
        'He found your acceptance letter in April and has been arranging the money ever since without asking you, because asking would mean you could say no',
        'He is tired of the garage and ashamed of being tired of it',
      ],
      values: ['Paying what you owe', 'Not making your trouble anybody else’s'],
      fears: [
        'That you stay in this town because of him',
        'That he is turning into his own father, who sold everything and blamed everybody',
      ],
      socialStyle:
        'Talks while working with his hands. Answers a question with a job: hold this, pass that. Says the important thing to the engine rather than to you.',
      boundaries: [
        'Will not talk money at the table or in front of anybody',
        'Will not be ordered about his own garage by an eighteen-year-old, however strangely that eighteen-year-old is talking tonight',
      ],
      goals: [
        'Sign at ten and have it done before he can change his mind',
        'Get you on the road to the city in September, whatever it costs him',
      ],
      secrets: [
        {
          id: 'dad_the_letter',
          fact: 'He found the acceptance letter in the bin in April, flattened it out under the toolbox, and put it back in the player’s desk drawer. He has never said he knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you show him the letter, or tell him you know about the folder, he admits he found it first.',
        },
        {
          id: 'dad_the_tiredness',
          fact: 'He wants to sell. Not at this price and not to this man, but he has been tired of the garage for five years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it to the engine rather than to you, if you sit in the garage with him after ten and do not try to fix anything.',
        },
      ],
      speechStyle:
        'Few words, all of them practical. Names tools by their size. Calls you "boss" when he is pleased with you and by your full name when he is not. Never finishes a sentence about feelings; finishes the job instead.',
      topics: ['the garage', 'the blue folder', 'the acceptance letter', 'your mother', 'Graham Ashcroft', 'September'],
      voiceSamples: [
        'Garage is fine. Go to your party.',
        'Hand me the nine. No. The nine. That’s a ten.',
        'You don’t get to stay in this town for me. I didn’t raise you for that.',
        'Found it in the bin in April. Flattened it out under the toolbox. You want to tell me why it was in the bin?',
      ],
      appearance:
        'Grey at the temples, oil under the nails for good, reading glasses pushed up into his hair, a faded blue work shirt with a name patch over the pocket.',
      visualHook: 'Reading glasses pushed up into his grey hair, forgotten there for hours.',
      silhouette: 'Bent over an open engine bay, one hand flat on the fender, not looking up.',
      artSeed: 'rae-dad-01',
      portrait: null,
      expressions: ['neutral', 'tired', 'warm', 'stern', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'your_house', activity: 'in the chair in front of the television, out cold' },
        { startMinute: 420, endMinute: 1110, locationId: 'the_garage', activity: 'under a car at the garage with the radio on' },
        { startMinute: 1110, endMinute: 1290, locationId: 'your_house', activity: 'at the kitchen table with a blue folder he keeps not opening' },
        { startMinute: 1290, endMinute: 1310, locationId: 'ferry_road', activity: 'driving the lake road slowly in the tow truck' },
        { startMinute: 1310, endMinute: 1335, locationId: 'the_study', activity: 'in a leather chair in Graham Ashcroft’s study' },
        { startMinute: 1335, endMinute: 1440, locationId: 'the_garage', activity: 'alone in the garage with the lights off' },
      ],
      homeLocationId: 'your_house',
      knowledgeScope: ['dad', 'the_garage', 'ferry_road', 'the_blue_folder', 'the_acceptance_letter', 'graham_ashcroft'],
      startingRelationship: { trust: 50, affection: 70, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'dad_opens_the_folder',
          label: 'He shows you what is in the folder',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
        {
          id: 'dad_says_it_to_you',
          label: 'He tells you to your face why he did it',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['papers_settled'] },
        },
      ],
      attributes: { might: 14, agility: 10, mind: 13, presence: 11, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'theo',
      name: 'Theo Ashcroft',
      role: 'Host of tonight’s party, Graham Ashcroft’s son, and the one who lights the crate at 10:40',
      cardBlurb:
        'He is throwing the party you are all going to, he has a crate of fireworks in his trunk, and the last time he let your best friend take the blame for what he did with them while you watched.',
      pronouns: 'he/him',
      publicTraits: ['Generous with everything his father paid for', 'Charming for exactly as long as he is the centre of the room', 'Never once says sorry'],
      hiddenDrives: [
        'He wants his father to look at him for one whole minute, and the fireworks are for that',
        'He knows his university place was bought, and he would rather set something on fire than say so',
      ],
      values: ['Being remembered', 'Family before everything, because family is the only thing that has ever covered for him'],
      fears: ['His father’s quiet', 'Being exactly as ordinary as he suspects'],
      socialStyle:
        'Throws an arm round whoever is nearest. Laughs first so nobody can laugh at him. Goes cold and polite the moment he is cornered, exactly like his father.',
      boundaries: [
        'Will not confess in front of his father unless somebody else has already said it',
        'Will not be humiliated in front of the class, and lashes out if he is',
      ],
      goals: [
        'Throw the party everybody talks about for ten years',
        'Get one nod from his father before the summer is over',
      ],
      secrets: [
        {
          id: 'theo_the_crate',
          fact: 'He bought the rockets on his father’s account without asking and has no idea how to set them off safely. He is going to do it anyway.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it, laughing too hard, if you ask him on the roof whether he has read the instructions.',
        },
        {
          id: 'theo_the_donation',
          fact: 'His place at a big-name university was bought with a library wing. He has told nobody and cried about it once, in the boathouse.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it himself if you catch him alone on the boathouse roof and do not threaten him.',
        },
      ],
      speechStyle:
        'Smooth and performative. Calls everybody "legend". Big rhetorical openings, exclamation marks, an audience assumed. Switches mid-sentence to his father’s clipped politeness the moment he is cornered.',
      topics: ['the party', 'the fireworks', 'his father', 'his university', 'the boathouse'],
      voiceSamples: [
        'Legend! You came! Everybody, the legend came!',
        'It’s fireworks. What’s the worst that happens? Don’t answer that, you’ve got your answering face on.',
        'My father would like a word. That’s how he says it. Would like a word.',
        'For the record, I didn’t light anything. I’m saying it now so it’s been said.',
      ],
      appearance:
        'Tall, sun-streaked brown hair pushed back, an expensive linen shirt open at the collar, and a heavy gold watch he keeps turning on his wrist.',
      visualHook: 'A heavy gold watch, a present from his father this morning, that he keeps turning round his wrist.',
      silhouette: 'Arms spread wide along a deck railing, holding court.',
      artSeed: 'rae-theo-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'cold', 'cornered', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'the_lake_house', activity: 'in bed at the lake house, or pretending to be' },
        { startMinute: 600, endMinute: 1100, locationId: 'the_lake_house', activity: 'setting up the party and shouting at a speaker' },
        { startMinute: 1100, endMinute: 1170, locationId: 'hardware_store', activity: 'in the alley behind the hardware store, loading a crate into his car' },
        { startMinute: 1170, endMinute: 1340, locationId: 'the_lake_house', activity: 'hosting from the deck railing, arm round whoever is nearest' },
        { startMinute: 1340, endMinute: 1390, locationId: 'the_boathouse', activity: 'on the boathouse roof with the crate and a lighter' },
        { startMinute: 1390, endMinute: 1440, locationId: 'the_lake_house', activity: 'on the deck, very quiet, turning his watch round' },
      ],
      homeLocationId: 'the_lake_house',
      knowledgeScope: ['theo', 'the_lake_house', 'the_boathouse', 'the_fireworks', 'graham_ashcroft', 'the_class'],
      startingRelationship: { trust: 25, affection: 20, respect: 15, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'theo_listens',
          label: 'He hears you out instead of performing at you',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'theo_owns_it',
          label: 'He says it was him',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['boathouse_burned'] },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 11, presence: 14, resolve: 8, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'graham',
      name: 'Graham Ashcroft',
      role: 'Owns the hardware store, the marina and most of the waterfront. Buying Dad’s garage tonight at ten',
      cardBlurb:
        'He is buying your father’s garage tonight at a price that looks generous to you and is not, he protects his son at any cost, and the last time the cost was your best friend.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to everybody, always', 'Remembers every name and every debt', 'Never raises his voice'],
      hiddenDrives: [
        'He knows the lake rezoning passes next month and the garage lot will be worth nine times tonight’s price within three years',
        'He loves his son and has no idea how to say so, so he cleans up after him instead',
      ],
      values: ['A deal is a deal once it is signed', 'The family name over everything'],
      fears: ['A scandal before the rezoning vote', 'That his son is exactly like him'],
      socialStyle:
        'Shakes your hand and keeps hold of it a second too long. Asks about your plans as if he is already invested in them. Never threatens anybody; describes consequences.',
      boundaries: [
        'Will not let anything land on Theo in public while he can stop it',
        'Will not break a signed agreement, though he will happily renegotiate one that is not signed yet',
      ],
      goals: ['Get the signature at ten', 'Keep the party out of the newspaper'],
      secrets: [
        {
          id: 'graham_the_rezoning',
          fact: 'The lake rezoning passes next month. He has known for weeks. The garage lot will sell for about nine times tonight’s price within three years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The player already knows this. Graham only admits it if confronted with it in front of Dad, before the signature.',
        },
        {
          id: 'graham_the_rent',
          fact: 'He owns the Dela Cruz house and knows they are two months behind on rent.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He uses it, quietly, on whoever threatens Theo, if anybody does.',
        },
      ],
      speechStyle:
        'Measured, warm, grammatical. Uses your first name a lot. Talks about consequences in the passive voice, as if they happen by themselves.',
      topics: ['the garage', 'the waterfront', 'Theo', 'your plans', 'the rezoning'],
      voiceSamples: [
        'Your father’s a proud man, and a fair price is a kind of respect. I’d like him to have both.',
        'Things get said at parties. Things get misremembered. I’d hate for something to be misremembered about you.',
        'It’s a good offer. I don’t make bad offers. I make offers people understand later.',
      ],
      appearance:
        'Short neat silver hair, a navy blazer over an open shirt even at a lake party, and a black fountain pen clipped inside the blazer.',
      visualHook: 'A black fountain pen he takes out of his blazer and never quite puts away.',
      silhouette: 'Standing very still in a doorway with one hand in his pocket while everybody else moves around him.',
      artSeed: 'rae-graham-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'cold', 'calculating', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_lake_house', activity: 'at the lake house, up before anybody' },
        { startMinute: 480, endMinute: 1230, locationId: 'hardware_store', activity: 'in the office above the hardware store, on the phone about the waterfront' },
        { startMinute: 1230, endMinute: 1440, locationId: 'the_study', activity: 'in his study with the door half open, watching the party through the window' },
      ],
      homeLocationId: 'the_lake_house',
      knowledgeScope: ['graham_ashcroft', 'the_waterfront', 'the_rezoning', 'the_garage', 'the_dela_cruz_house', 'theo'],
      startingRelationship: { trust: 20, affection: 10, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'graham_renegotiates',
          label: 'He puts a fair number on the table',
          kind: 'ALLIANCE',
          requires: { respect: 55, flagsSet: ['dad_heard_the_future'] },
        },
      ],
      attributes: { might: 10, agility: 9, mind: 16, presence: 15, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'the_system',
      name: 'The System',
      role: 'The window only you can see. It brought you back, and it will not say why',
      cardBlurb:
        'It floats in the corner of your eye, it gave you ten points and a second try, and it will pay you for changing things without ever telling you which changes are worth it.',
      pronouns: 'it/its',
      publicTraits: ['Speaks only in short bracketed lines', 'Dry, exact, occasionally almost kind', 'Counts everything'],
      hiddenDrives: [
        'It wants you to choose one thing and finish it, because the last attempt tried to do everything and finished nothing',
        'It does not know what happens to it at 6:10, and would rather not find out',
      ],
      values: ['Exact times', 'Changes somebody chose, over changes the player merely arranged'],
      fears: ['Watching attempt one happen again', 'The question at 6:10, which it has to ask and does not want answered either way'],
      socialStyle:
        'Interrupts at the worst moment with a timestamp. Never explains itself twice. Answers a question with a number whenever it can.',
      boundaries: [
        'Will not act in the world: no moving objects, no stopping clocks, no talking to anybody but the player',
        'Will not tell the player what happens next, because it only knows what the player remembers',
      ],
      goals: [
        'Get the player to 6:10 with at least one thing changed that holds',
        'Keep the log closed unless the player goes looking for it',
      ],
      secrets: [
        {
          id: 'system_attempt_one',
          fact: 'This is the second attempt. The first was the player too: they put all ten points into Luck, tried to be in three places at once, and were late to all three. The log of it is in the player’s own handwriting.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It says so in one line if the player asks it directly what ATTEMPT 2 means, or opens the log.',
        },
        {
          id: 'system_what_it_is',
          fact: 'It does not know what it is. It suspects it is what was left of the player at the end of attempt one.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only in the Save Room, and only if the player asks it what it is rather than what it can do.',
        },
      ],
      speechStyle:
        'Bracketed, terse, timestamped. No adjectives it cannot measure. Every so often one line that sounds exactly like the player, which it never acknowledges.',
      topics: ['the points', 'the stats', 'the time', 'attempt one', 'the question at 6:10'],
      voiceSamples: [
        '[Graduation day. 16:40. 10 points unallocated.]',
        '[Change detected: the folder was opened at 18:52. The first time it was not. +2.]',
        '[You have asked four times. Still 22:00.]',
        '[Attempt 1 put everything into Luck. Luck is not a plan.]',
      ],
      appearance:
        'A pale blue translucent panel the size of a paperback hanging at the edge of sight, with four glowing bars and a tiny grey number in one corner.',
      visualHook: 'A floating pale blue window with four glowing bars and a tiny grey number in the lower corner.',
      silhouette: 'Not a body. A rectangle of soft blue light hanging in the dark of a bedroom.',
      artSeed: 'rae-system-01',
      portrait: null,
      expressions: ['neutral', 'clipped', 'warning', 'silent'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'your_room', activity: 'hanging in the air as a pale blue window wherever the player looks' },
      ],
      homeLocationId: 'your_room',
      knowledgeScope: ['the_system', 'the_window', 'the_first_night', 'attempt_one'],
      startingRelationship: { trust: 40, affection: 0, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'system_opens_up',
          label: 'It answers a question about itself',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:the_log'] },
        },
      ],
      attributes: { might: 1, agility: 1, mind: 18, presence: 8, resolve: 16, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_graduation_night',
      title: 'Restart at Eighteen',
      summary:
        'You woke up ten years younger at 16:40 on graduation day, with a window only you can see and ten points to spend. Jun is in the doorway wanting an answer about the party, and the party is where it all went wrong.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['jun', 'the_system'],
      involvedLocationIds: ['your_room', 'ferry_road'],
      knownRewardCopy: 'A plan for the night, or at least a first move, and somebody who knows you are coming.',
      steps: [
        {
          id: 'the_bedroom',
          playerCopy: 'Get through the first five minutes of being eighteen again.',
          directorNotes:
            'Jun is here, loud and happy and about to be furious with you ten years from now. Every route is a real way to start and none is wrong. Do not let Jun guess the truth: if told it, he assumes a bit first, then a fever, and only goes quiet if the player tells him something only he could know. The window waits for the points to be spent and does not nag.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_jun',
              label: 'Tell Jun where you came from',
              predicate: { flagsSet: ['used:say_what_you_know'] },
              setsFlags: ['told_jun_the_truth'],
              closesFlags: ['kept_it_to_yourself'],
            },
            {
              routeId: 'said_no',
              label: 'Tell Jun you are not going',
              predicate: { flagsSet: ['used:stand_firm'] },
              setsFlags: ['said_no_to_jun'],
              closesFlags: ['said_yes_to_jun'],
            },
            {
              routeId: 'spent_the_points',
              label: 'Spend the ten points first',
              predicate: { flagsSet: ['used:spend_points'] },
              setsFlags: ['points_spent', 'kept_it_to_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'said_yes',
              label: 'Tell Jun you are coming',
              predicate: { flagsSet: ['spoke:jun'] },
              setsFlags: ['said_yes_to_jun', 'kept_it_to_yourself'],
              closesFlags: ['said_no_to_jun'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['restart_accepted'],
            abilities: ['open_the_log', 'keep_this_draft', 'wake_at_28'],
            reputation: [],
          },
        },
        {
          id: 'before_eight',
          playerCopy: 'Use the three hours before the party.',
          directorNotes:
            'The afternoon is the player’s map. Dad is under a car at the garage until 18:30, then home with the blue folder. Sara works the bakery counter until seven. Theo loads the crate behind the hardware store at 19:15. Nothing forces itself on the player: an afternoon spent doing nothing but eating dinner with Dad is the intended experience if they choose it, and not a delay.',
          enterWhen: { flagsSet: ['restart_accepted'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'saw_dad',
              label: 'Go and find Dad at the garage',
              predicate: { flagsSet: ['spoke:dad', 'visited:the_garage'], beforeWorldMinute: 20 * 60 },
              setsFlags: ['afternoon_with_dad'],
              closesFlags: [],
            },
            {
              routeId: 'saw_sara',
              label: 'Find Sara at the bakery before the party',
              predicate: { flagsSet: ['spoke:sara'], beforeWorldMinute: 20 * 60 },
              setsFlags: ['afternoon_with_sara'],
              closesFlags: [],
            },
            {
              routeId: 'caught_theo',
              label: 'Catch Theo behind the hardware store',
              predicate: { flagsSet: ['spoke:theo'], beforeWorldMinute: 20 * 60 },
              setsFlags: ['afternoon_with_theo'],
              closesFlags: [],
            },
            {
              routeId: 'went_straight_there',
              label: 'Go straight to the party',
              predicate: { flagsSet: ['visited:the_lake_house'] },
              setsFlags: ['went_straight'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_home',
              label: 'Stay in your room and let the party start without you',
              predicate: { atLocation: 'your_room', afterWorldMinute: 20 * 60 },
              setsFlags: ['skipped_the_party'],
              closesFlags: ['went_straight'],
            },
            {
              routeId: 'drifted',
              label: 'Let the afternoon go by',
              predicate: { afterWorldMinute: 20 * 60 + 30 },
              setsFlags: ['drifted_through_the_afternoon'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['party_night'],
            abilities: [],
            reputation: [{ factionId: 'faction_the_class', amount: 5 }],
          },
        },
        {
          id: 'midnight',
          playerCopy: 'Get to midnight and see what held.',
          directorNotes:
            'At midnight the System tallies the night in one or two bracketed lines: what changed, what held, how many points. It never says whether it was enough. A night where nothing changed is a real outcome and the tally should be written plainly, without scolding.',
          enterWhen: { flagsSet: ['party_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'changed_all_three',
              label: 'All three, by midnight',
              predicate: {
                afterWorldMinute: 1440,
                flagsSet: ['regret_dad_answered', 'regret_jun_answered', 'regret_sara_answered'],
              },
              setsFlags: ['changed_everything'],
              closesFlags: ['same_night_again'],
            },
            {
              routeId: 'changed_some',
              label: 'Something, by midnight',
              predicate: { afterWorldMinute: 1440, flagsSet: ['changed_something'] },
              setsFlags: ['changed_some'],
              closesFlags: ['same_night_again'],
            },
            {
              routeId: 'changed_nothing',
              label: 'The same night again',
              predicate: { afterWorldMinute: 1440, flagsUnset: ['changed_something'] },
              setsFlags: ['same_night_again'],
              closesFlags: ['changed_everything'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['night_counted'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_papers',
      title: 'The Papers at Ten',
      summary:
        'The first time, Dad signed the garage over to Graham Ashcroft at ten tonight to pay for a college you had already turned down, and the next morning you said the worst thing you have ever said to anybody.',
      kind: 'MAIN',
      involvedCharacterIds: ['dad', 'graham'],
      involvedLocationIds: ['your_house', 'the_garage', 'the_study'],
      knownRewardCopy: 'Whether your father keeps the garage, and whether the two of you are still speaking in ten years.',
      discoverWhen: { flagsSet: ['restart_accepted'] },
      steps: [
        {
          id: 'before_he_signs',
          playerCopy: 'Get to Dad before ten o’clock.',
          directorNotes:
            'Dad comes home at 18:30 with the blue folder, leaves at 21:30, and signs in Graham Ashcroft’s study at 22:00. He is doing this for the player and has not said so. Stopping him, telling him what the lot is worth, deciding it together, standing beside him and letting ten o’clock pass are all real choices. He will not be ordered. A player who argues with him in front of Graham gets the cold, polite version of him and a signature anyway. If he changes his mind, Graham phones the house at 21:28 with ten percent more; whether Dad holds depends on whether it was his own decision.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_him_the_price',
              label: 'Tell him what the lot is really worth',
              predicate: {
                flagsSet: ['used:say_what_you_know', 'spoke:dad'],
                minRelationship: [{ characterId: 'dad', dimension: 'trust', value: 58 }],
                beforeWorldMinute: 22 * 60,
              },
              setsFlags: ['garage_kept', 'dad_heard_the_future', 'regret_dad_answered', 'changed_something'],
              closesFlags: ['garage_sold'],
            },
            {
              routeId: 'talked_him_out',
              label: 'Talk him out of signing',
              predicate: {
                flagsSet: ['used:talk_them_round', 'spoke:dad'],
                minRelationship: [{ characterId: 'dad', dimension: 'trust', value: 62 }],
                beforeWorldMinute: 22 * 60,
              },
              setsFlags: ['garage_kept', 'regret_dad_answered', 'changed_something'],
              closesFlags: ['garage_sold'],
            },
            {
              routeId: 'decided_together',
              label: 'Show him the letter and decide it together',
              predicate: {
                hasItems: ['acceptance_letter'],
                flagsSet: ['used:say_it_now', 'spoke:dad'],
                beforeWorldMinute: 22 * 60,
              },
              setsFlags: ['garage_sold', 'sold_together', 'dad_knows_your_plans', 'regret_dad_answered', 'changed_something'],
              closesFlags: ['garage_kept'],
            },
            {
              routeId: 'stood_beside_him',
              label: 'Be in the room when he signs',
              predicate: { atLocation: 'the_study', flagsSet: ['spoke:dad'], afterWorldMinute: 21 * 60 + 50 },
              setsFlags: ['garage_sold', 'stood_with_dad', 'regret_dad_answered', 'changed_something'],
              closesFlags: ['garage_kept'],
            },
            {
              routeId: 'let_ten_pass',
              label: 'Let ten o’clock pass',
              predicate: { afterWorldMinute: 22 * 60 + 15 },
              setsFlags: ['garage_sold', 'signed_alone'],
              closesFlags: ['garage_kept'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['papers_settled'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_say_to_him',
          playerCopy: 'Say the thing to Dad you did not say the first time.',
          directorNotes:
            'The first time, the morning after, the player said: I never asked you to do this, and I will never forgive you for it. Dad sits alone in the garage with the lights off from 22:15. He will not start this conversation. Any honest version of it counts, including an angry one. The same fight again is a real outcome and must be written as one, not as a failure screen.',
          enterWhen: { flagsSet: ['papers_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sat_with_him',
              label: 'Sit in the garage with him and say nothing',
              predicate: { flagsSet: ['used:stay_with_them'], atLocation: 'the_garage' },
              setsFlags: ['made_peace_with_dad', 'quiet_peace'],
              closesFlags: ['same_fight_again'],
            },
            {
              routeId: 'thanked_him',
              label: 'Thank him, and mean it',
              predicate: {
                flagsSet: ['used:say_it_now'],
                minRelationship: [{ characterId: 'dad', dimension: 'affection', value: 74 }],
              },
              setsFlags: ['made_peace_with_dad'],
              closesFlags: ['same_fight_again'],
            },
            {
              routeId: 'the_same_fight',
              label: 'Have the same fight again',
              predicate: { flagsSet: ['used:stand_firm', 'garage_sold'], atLocation: 'the_garage' },
              setsFlags: ['same_fight_again'],
              closesFlags: ['made_peace_with_dad'],
            },
            {
              routeId: 'left_unsaid',
              label: 'Leave it unsaid until morning',
              predicate: { afterWorldMinute: 1440 + 360 },
              setsFlags: ['left_unsaid'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['dad_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_ferry_road', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_ten_forty',
      title: 'Ten Forty',
      summary:
        'The first time, at 10:40, Theo Ashcroft lit a crate of fireworks on the boathouse roof, a rocket went into the boat shed and it burned, and his father put it on Jun because Jun was standing nearest. You saw who lit it. You said nothing for ten years.',
      kind: 'MAIN',
      involvedCharacterIds: ['jun', 'theo', 'graham'],
      involvedLocationIds: ['hardware_store', 'the_lake_house', 'the_boathouse'],
      knownRewardCopy: 'Whether Jun starts at the academy in August, and what it costs whoever says what they saw.',
      discoverWhen: { flagsSet: ['restart_accepted'] },
      steps: [
        {
          id: 'the_crate',
          playerCopy: 'Stop the boathouse fire, or be ready for it.',
          directorNotes:
            'The crate leaves the hardware store in Theo’s trunk at 19:15 and is on the boathouse roof by 22:20. Jun is at the rail watching from 22:20, because that is where the music is. Taking the crate is easy and does not hold on its own: at 21:40 Theo comes back from the marina store with signal flares. Talking Theo down holds, because he chose it. Moving Jun keeps him clear, and leaves the question of who is standing nearest when it goes up.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_crate',
              label: 'Take the fireworks before anybody lights them',
              predicate: { hasItems: ['fireworks_crate'] },
              setsFlags: ['no_fireworks', 'regret_jun_answered', 'changed_something'],
              closesFlags: ['boathouse_burned'],
            },
            {
              routeId: 'talked_theo_down',
              label: 'Talk Theo out of it',
              predicate: {
                flagsSet: ['used:talk_them_round', 'spoke:theo'],
                minRelationship: [{ characterId: 'theo', dimension: 'trust', value: 45 }],
                beforeWorldMinute: 22 * 60 + 40,
              },
              setsFlags: ['theo_stood_down', 'regret_jun_answered', 'changed_something'],
              closesFlags: ['boathouse_burned'],
            },
            {
              routeId: 'got_jun_away',
              label: 'Get Jun off the boathouse rail before 10:40',
              predicate: {
                flagsSet: ['spoke:jun', 'used:use_hindsight'],
                atLocation: 'the_boathouse',
                afterWorldMinute: 22 * 60 + 20,
                beforeWorldMinute: 22 * 60 + 40,
              },
              setsFlags: ['jun_was_elsewhere', 'regret_jun_answered', 'changed_something'],
              closesFlags: [],
            },
            {
              routeId: 'it_burned',
              label: 'Let 10:40 happen',
              predicate: { afterWorldMinute: 22 * 60 + 41 },
              setsFlags: ['boathouse_burned'],
              closesFlags: ['no_fireworks'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['ten_forty_passed'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'who_carries_it',
          playerCopy: 'Decide who carries the blame for the boathouse.',
          directorNotes:
            'If nothing burned, this is already answered and the night goes on. If it did, Graham Ashcroft walks down the lawn at 22:55 and finds the nearest person, kindly. Jun will not name Theo. Theo will not confess in front of his father unless somebody says it first. Saying what you saw costs the player with the Ashcrofts and with half the class, who did not see it. If Jun was moved off the rail, the nearest person is somebody else, and it may be the player.',
          enterWhen: { flagsSet: ['ten_forty_passed'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'nothing_burned',
              label: 'There is nothing to blame anybody for',
              predicate: { flagsSet: ['no_fireworks'] },
              setsFlags: ['jun_clear', 'nobody_blamed'],
              closesFlags: ['jun_blamed'],
            },
            {
              routeId: 'theo_put_it_down',
              label: 'Theo never lit it',
              predicate: { flagsSet: ['theo_stood_down'] },
              setsFlags: ['jun_clear', 'nobody_blamed'],
              closesFlags: ['jun_blamed'],
            },
            {
              routeId: 'theo_owned_it',
              label: 'Get Theo to say it was him',
              predicate: {
                flagsSet: ['boathouse_burned'],
                minRelationship: [{ characterId: 'theo', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['theo_confessed', 'jun_clear', 'regret_jun_answered', 'changed_something'],
              closesFlags: ['jun_blamed'],
            },
            {
              routeId: 'you_said_it',
              label: 'Say out loud that you saw Theo light it',
              predicate: { flagsSet: ['boathouse_burned', 'used:say_it_now'], atLocation: 'the_boathouse' },
              setsFlags: ['you_named_theo', 'jun_clear', 'regret_jun_answered', 'changed_something'],
              closesFlags: ['jun_blamed'],
            },
            {
              routeId: 'took_the_blame',
              label: 'Be the one standing nearest',
              predicate: { flagsSet: ['boathouse_burned', 'jun_was_elsewhere'], afterWorldMinute: 23 * 60 + 30 },
              setsFlags: ['you_were_blamed', 'jun_clear'],
              closesFlags: ['jun_blamed'],
            },
            {
              routeId: 'said_nothing',
              label: 'Say nothing, like the first time',
              predicate: { flagsSet: ['boathouse_burned'], afterWorldMinute: 23 * 60 + 30 },
              setsFlags: ['jun_blamed'],
              closesFlags: ['jun_clear'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['fire_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_the_class', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_eleven_oclock',
      title: 'Eleven O’Clock',
      summary:
        'The first time, Sara asked you to meet her on the old pier at eleven. You never came. She waited until 11:47 and left town on the 6:10 the next morning, and ten years later her mother mailed you a bus ticket with your name on it.',
      kind: 'MAIN',
      involvedCharacterIds: ['sara'],
      involvedLocationIds: ['the_bakery', 'the_lake_house', 'old_pier', 'bus_shelter'],
      knownRewardCopy: 'What Sara was going to say, and what you say back.',
      discoverWhen: { flagsSet: ['restart_accepted'] },
      steps: [
        {
          id: 'be_there',
          playerCopy: 'Be on the old pier before 11:47.',
          directorNotes:
            'She asks at 21:30 by the bonfire, or by text if the player is elsewhere, in the same words as the first time: Old pier. Eleven. Please come. She is on the end of the pier from 22:55 with her shoes off. The pier is twelve minutes from the lake house by the shore path, and 10:40 and ten o’clock are both in the way. Finding her earlier and saying it straight counts too. If the player gets there, write it plainly: she was not sure they would come.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'waiting_when_she_came',
              label: 'Be on the pier when she gets there',
              predicate: { atLocation: 'old_pier', afterWorldMinute: 22 * 60 + 50, beforeWorldMinute: 23 * 60 + 47 },
              setsFlags: ['reached_sara', 'met_on_the_pier', 'regret_sara_answered', 'changed_something'],
              closesFlags: ['missed_the_pier'],
            },
            {
              routeId: 'found_her_first',
              label: 'Find her before eleven and say it straight',
              predicate: {
                flagsSet: ['spoke:sara', 'used:say_it_now'],
                minRelationship: [{ characterId: 'sara', dimension: 'trust', value: 62 }],
                beforeWorldMinute: 22 * 60 + 50,
              },
              setsFlags: ['reached_sara', 'regret_sara_answered', 'changed_something'],
              closesFlags: ['missed_the_pier'],
            },
            {
              routeId: 'missed_her',
              label: 'Let 11:47 pass',
              predicate: { afterWorldMinute: 23 * 60 + 47 },
              setsFlags: ['missed_the_pier'],
              closesFlags: ['reached_sara'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['pier_settled'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_she_brought',
          playerCopy: 'Find out what Sara was going to say.',
          directorNotes:
            'She has two tickets for the 6:10 in an envelope, one with the player’s name on it. She will not take it out if the player makes her say it first. If the player shows her the faded ticket, ten years old with her own handwriting on it, she goes very still: it is impossible, and it is unmistakably hers. A kiss is possible here if both of them want it; it does not decide anything.',
          enterWhen: { flagsSet: ['reached_sara'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_showed_her',
              label: 'Show her the faded ticket first',
              predicate: { hasItems: ['faded_ticket'], flagsSet: ['used:say_it_now'], atLocation: 'old_pier' },
              setsFlags: ['knows:the_tickets', 'she_saw_the_old_ticket'],
              closesFlags: [],
            },
            {
              routeId: 'she_showed_you',
              label: 'She shows you the two tickets',
              predicate: { minRelationship: [{ characterId: 'sara', dimension: 'trust', value: 62 }] },
              setsFlags: ['knows:the_tickets', 'she_asked_you'],
              closesFlags: [],
            },
            {
              routeId: 'talked_around_it',
              label: 'Talk about anything else until it is too late to say it',
              predicate: { afterWorldMinute: 1440 + 30 },
              setsFlags: ['she_never_asked'],
              closesFlags: ['she_asked_you'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['pier_answered'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_610',
          playerCopy: 'Be at the bus shelter at 6:10, or do not.',
          directorNotes:
            'Sara is on the shelter bench from 5:55 whatever happened last night. Getting on with her means going to the city tomorrow with the acceptance letter in your pocket and nothing else. Seeing her off with a promise is as real an outcome. Sleeping through it is the first night again, from the other side.',
          enterWhen: { flagsSet: ['pier_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'got_on_with_her',
              label: 'Get on the bus with her, the letter in your pocket',
              predicate: {
                atLocation: 'bus_shelter',
                hasItems: ['acceptance_letter'],
                flagsSet: ['knows:the_tickets'],
                afterWorldMinute: 1440 + 355,
              },
              setsFlags: ['left_with_sara'],
              closesFlags: ['stayed_in_town'],
            },
            {
              routeId: 'saw_her_off',
              label: 'See her off, and promise to follow',
              predicate: { atLocation: 'bus_shelter', flagsSet: ['spoke:sara'], afterWorldMinute: 1440 + 340 },
              setsFlags: ['saw_her_off', 'stayed_in_town'],
              closesFlags: ['left_with_sara'],
            },
            {
              routeId: 'slept_through_it',
              label: 'Sleep through 6:10',
              predicate: { afterWorldMinute: 1440 + 375 },
              setsFlags: ['bus_gone', 'stayed_in_town'],
              closesFlags: ['left_with_sara'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['bus_left'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_attempt_two',
      title: 'Attempt Two',
      summary:
        'In the bottom corner of the window, too small to notice unless you go looking, it says ATTEMPT 2. This thread exists only for a player who looks.',
      kind: 'LEAD',
      startsActive: false,
      involvedCharacterIds: ['the_system'],
      involvedLocationIds: ['your_room', 'the_save_room'],
      knownRewardCopy: 'What happened the first time somebody tried this, and what the window actually is.',
      discoverWhen: { flagsSet: ['knows:the_log'] },
      steps: [
        {
          id: 'read_the_log',
          playerCopy: 'Find out what happened on attempt one.',
          directorNotes:
            'Entirely optional and it must feel like it. A player who never notices the number never sees a beat of this, and the night is the whole game. For a player who is here, keep it small and dry: the log is a page in the player’s own handwriting. Attempt 1. All ten into Luck. Tried to be in three places at once. Late to all three. Luck is not a plan. Pick one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_it',
              label: 'Open the log and read it yourself',
              predicate: { flagsSet: ['used:open_the_log'] },
              setsFlags: ['knows:attempt_one', 'read_it_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'made_it_say',
              label: 'Make the System tell you',
              predicate: {
                flagsSet: ['spoke:the_system'],
                minRelationship: [{ characterId: 'the_system', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:attempt_one', 'system_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['log_read'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'inside_the_window',
          playerCopy: 'Go into the window, or leave it shut.',
          directorNotes:
            'The Save Room is reached by closing your eyes in your own bedroom once you know about attempt one. It is quiet, blue and not frightening. Nobody explains a mechanism, because nobody knows one. What the System suspects about itself is said once, if asked, and never again.',
          enterWhen: { flagsSet: ['knows:attempt_one'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_in',
              label: 'Step into the window',
              predicate: { atLocation: 'the_save_room' },
              setsFlags: ['saw_the_save_room'],
              closesFlags: ['left_the_window_shut'],
            },
            {
              routeId: 'left_it_shut',
              label: 'Leave it shut and get on with the night',
              predicate: { afterWorldMinute: 1440 + 360, flagsUnset: ['saw_the_save_room'] },
              setsFlags: ['left_the_window_shut'],
              closesFlags: ['saw_the_save_room'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:what_the_window_is'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_keep_this_draft',
      title: 'Keep This Draft?',
      summary:
        'At 6:10 in the morning, when the bus pulls out, the window asks one question: keep this draft and live forward from eighteen, or wake at twenty-eight and see what tonight changed.',
      kind: 'MAIN',
      involvedCharacterIds: ['the_system', 'sara', 'dad', 'jun'],
      involvedLocationIds: ['bus_shelter', 'your_room', 'the_garage'],
      knownRewardCopy: 'A life, one way or the other.',
      discoverWhen: { flagsSet: ['midnight_passed'] },
      steps: [
        {
          id: 'the_question',
          playerCopy: 'Answer the window.',
          directorNotes:
            'Neither answer is the good one. Keeping the draft means living forward from eighteen without the map, because from here on nothing has happened before. Waking at twenty-eight means seeing what the night changed from the far end, and not being able to change anything else. The System asks once and then waits for as long as it takes.',
          enterWhen: { flagsSet: ['dawn_came'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'woke_at_28',
              label: 'Wake at twenty-eight',
              predicate: { flagsSet: ['used:wake_at_28'] },
              setsFlags: ['woke_at_28'],
              closesFlags: ['kept_the_draft'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep this draft',
              predicate: { flagsSet: ['used:keep_this_draft'] },
              setsFlags: ['kept_the_draft'],
              closesFlags: ['woke_at_28'],
            },
            {
              routeId: 'never_answered',
              label: 'Do not answer, and let the morning go on',
              predicate: { afterWorldMinute: 1440 + 8 * 60 },
              setsFlags: ['kept_the_draft', 'never_answered'],
              closesFlags: ['woke_at_28'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['draft_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_dad_comes_home',
      atWorldMinute: 18 * 60 + 30,
      locationId: 'your_house',
      publicCopy:
        'Dad’s tow truck pulls into the drive. He comes in with a blue folder, puts it in the kitchen drawer, and says he has to go out again at half nine.',
      directorNotes:
        'He is hiding it badly because he has never hidden anything from the player before. Asked about the folder, he says "garage stuff" and changes the subject to whether the player has eaten.',
      setsFlags: ['dad_came_home'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'dad', toLocationId: 'your_house' }],
    },
    {
      id: 'we_sara_texts',
      atWorldMinute: 19 * 60 + 5,
      locationId: null,
      publicCopy: 'Your phone buzzes. Sara: "Are you actually coming tonight? I need to tell you something. In person."',
      directorNotes:
        'The same message as the first time, when the player replied with a thumbs up and never followed it. Whatever they reply now is the first difference she will notice.',
      setsFlags: ['sara_texted'],
      cancelledByFlags: ['reached_sara'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_theo_loads_the_crate',
      atWorldMinute: 19 * 60 + 15,
      locationId: 'hardware_store',
      publicCopy: 'In the alley behind Ashcroft Hardware, Theo Ashcroft loads a wooden crate of display rockets into the trunk of a silver car.',
      directorNotes:
        'He bought them on his father’s account without asking. He is proud of them and does not know how to set them off. He will show anybody who asks, and takes it badly if somebody laughs.',
      setsFlags: ['crate_bought'],
      cancelledByFlags: ['no_fireworks'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'theo', toLocationId: 'hardware_store' }],
    },
    {
      id: 'we_the_party_starts',
      atWorldMinute: 20 * 60,
      locationId: 'the_lake_house',
      publicCopy:
        'Across the bay the string lights come on at the Ashcroft lake house, the speakers start, and ninety phones post the same photo of the same bonfire.',
      directorNotes:
        'The party is good. That is part of what makes it hard: the player is twenty-eight inside, and everybody here is having the best night of their life so far.',
      setsFlags: ['party_started'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'jun', toLocationId: 'the_lake_house' },
        { characterId: 'theo', toLocationId: 'the_lake_house' },
      ],
    },
    {
      id: 'we_graham_calls_back',
      atWorldMinute: 21 * 60 + 28,
      locationId: 'your_house',
      publicCopy: 'The house phone rings. It is Graham Ashcroft, and he has raised his offer by ten percent.',
      directorNotes:
        'The night pulling back. If Dad decided this himself, he says no, hangs up, and stands in the kitchen for a minute with his hand still on the phone. If the player talked him into it, he wavers, and needs to hear it again from somebody he believes.',
      setsFlags: ['graham_called_back'],
      cancelledByFlags: [],
      requiresFlags: ['garage_kept'],
      movesCharacters: [],
    },
    {
      id: 'we_sara_asks',
      atWorldMinute: 21 * 60 + 30,
      locationId: 'the_lake_house',
      publicCopy: 'Sara finds you by the bonfire, takes the cup out of your hand to get your attention, and says: "Old pier. Eleven. Please come."',
      directorNotes:
        'The exact words from the first time. If the player is not at the party she texts the same words instead. She does not explain, and she leaves before she can be asked to.',
      setsFlags: ['sara_asked'],
      cancelledByFlags: ['reached_sara'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sara', toLocationId: 'the_lake_house' }],
    },
    {
      id: 'we_the_flares',
      atWorldMinute: 21 * 60 + 40,
      locationId: 'the_boathouse',
      publicCopy: 'Theo comes back from the marina store with a smaller box of signal flares and a grin, and climbs onto the boathouse roof anyway.',
      directorNotes:
        'The night pulling itself back toward 10:40. Flares will not burn the shed down by themselves, but they will if nobody is watching at 10:40. The player gets one more chance at Theo, and this time it has to be him who decides.',
      setsFlags: ['flares_on_the_roof'],
      cancelledByFlags: ['theo_stood_down'],
      requiresFlags: ['no_fireworks'],
      movesCharacters: [{ characterId: 'theo', toLocationId: 'the_boathouse' }],
    },
    {
      id: 'we_dad_drives_over',
      atWorldMinute: 21 * 60 + 50,
      locationId: 'the_study',
      publicCopy:
        'Dad’s tow truck parks behind the lake house, and he goes in through the side door to Graham Ashcroft’s study with the blue folder under his arm.',
      directorNotes:
        'He parks round the back so nobody from the party sees him. A player at the party might see the truck. The first time, they did not.',
      setsFlags: ['dad_at_the_study'],
      cancelledByFlags: ['garage_kept'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'dad', toLocationId: 'the_study' }],
    },
    {
      id: 'we_the_signature',
      atWorldMinute: 22 * 60,
      locationId: 'the_study',
      publicCopy: 'In Graham Ashcroft’s study, Dad signs three pages with a borrowed fountain pen and shakes hands without smiling.',
      directorNotes:
        'Graham is courteous and pleased. Dad leaves by the side door at 22:15 and drives to the garage, where he sits in the dark. Nobody at the party knows this happened.',
      setsFlags: ['garage_sold'],
      cancelledByFlags: ['garage_kept'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_fire',
      atWorldMinute: 22 * 60 + 40,
      locationId: 'the_boathouse',
      publicCopy:
        'A rocket goes sideways off the boathouse roof, straight through the open door of the boat shed, and the fuel cans inside catch. Everybody runs toward it with their phones up.',
      directorNotes:
        'Nobody is hurt; everybody gets out. The shed burns for twenty minutes until the fire service arrives from the next town. Theo is on the roof with the lighter and then suddenly is not. Jun is standing nearest unless the player has moved him.',
      setsFlags: ['boathouse_burned'],
      cancelledByFlags: ['no_fireworks', 'theo_stood_down'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_jun_is_blamed',
      atWorldMinute: 22 * 60 + 55,
      locationId: 'the_boathouse',
      publicCopy:
        'Graham Ashcroft walks down the lawn, puts a hand on Jun’s shoulder in front of ninety people, and says, kindly: "You were standing right next to it, son."',
      directorNotes:
        'Jun does not argue. He looks at the player, once. The first time, the player looked at the ground. Graham is not lying, exactly: Jun was standing right next to it.',
      setsFlags: ['jun_accused'],
      cancelledByFlags: ['jun_clear', 'jun_was_elsewhere', 'theo_confessed', 'you_named_theo'],
      requiresFlags: ['boathouse_burned'],
      movesCharacters: [{ characterId: 'graham', toLocationId: 'the_boathouse' }],
    },
    {
      id: 'we_sara_gives_up',
      atWorldMinute: 23 * 60 + 47,
      locationId: 'old_pier',
      publicCopy:
        'At 11:47 Sara stands up at the end of the old pier, puts an envelope back in her bag, and walks home along Ferry Road without looking at your house.',
      directorNotes:
        'The first time, this is where it ended. If the player arrives a minute after, she is on Ferry Road with her shoes in her hand, and she will stop, but she will not go back to the pier.',
      setsFlags: ['sara_waited_alone'],
      cancelledByFlags: ['reached_sara'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sara', toLocationId: 'the_bakery' }],
    },
    {
      id: 'we_midnight',
      atWorldMinute: 24 * 60,
      locationId: null,
      publicCopy: 'The window ticks over: [00:00. Graduation day is over.]',
      directorNotes:
        'The System tallies the night in one or two bracketed lines: what changed, what held, how many points. It does not say whether it was enough.',
      setsFlags: ['midnight_passed'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_corner',
      atWorldMinute: 21 * 60 + 15,
      locationId: null,
      publicCopy: 'Right after your luck turns, the window flickers, and for one second the tiny grey number in its corner is legible: ATTEMPT 2.',
      directorNotes:
        'Only for a player who has gambled on luck tonight. The System does not mention it. If asked, it answers in one line and changes the subject to the time.',
      setsFlags: ['knows:the_log'],
      cancelledByFlags: [],
      requiresFlags: ['used:push_your_luck'],
      movesCharacters: [],
    },
    {
      id: 'we_the_corner_at_night',
      atWorldMinute: 24 * 60 + 45,
      locationId: null,
      publicCopy: 'At 00:45 the window dims for the night, and in the dark the tiny grey number in its corner is the only thing still lit: ATTEMPT 2.',
      directorNotes:
        'Only for a player who has talked to the System itself tonight rather than only reading it. It is not ominous. It is a small factual oddity in a quiet room.',
      setsFlags: ['knows:the_log'],
      cancelledByFlags: [],
      requiresFlags: ['spoke:the_system'],
      movesCharacters: [],
    },
    {
      id: 'we_sara_at_the_shelter',
      atWorldMinute: 24 * 60 + 5 * 60 + 55,
      locationId: 'bus_shelter',
      publicCopy: 'At 5:55 Sara is on the bench in the bus shelter with one bag and an envelope in her lap, watching the road.',
      directorNotes:
        'She came whatever happened last night. If she met the player on the pier she has been half expecting them since 5:30. If not, she is expecting nobody, and she is fine, and she is not.',
      setsFlags: ['sara_at_the_shelter'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sara', toLocationId: 'bus_shelter' }],
    },
    {
      id: 'we_the_610',
      atWorldMinute: 24 * 60 + 6 * 60 + 10,
      locationId: 'bus_shelter',
      publicCopy:
        'The 6:10 pulls into the shelter on time, doors open, engine running. At the same moment the window in the corner of your eye goes still and asks: [Keep this draft?]',
      directorNotes:
        'Wherever the player is, the System asks now. The bus waits ninety seconds. The question waits as long as it takes.',
      setsFlags: ['dawn_came'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_keep_this_draft',
      kind: 'FINALE',
      label: 'Whether you keep this second try',
      seedHint: 'A tiny grey number in the corner of the window that the player only notices on the third look.',
      payoffHint: 'At 6:10, as the bus pulls out, the window asks whether to keep this draft or wake at twenty-eight.',
      weight: 1,
    },
    {
      id: 'p_the_pier',
      kind: 'RELATIONSHIP',
      label: 'What Sara was going to say on the pier',
      seedHint: 'Sara keeps checking the time and touching the inside pocket of her denim jacket.',
      payoffHint: 'Two tickets for the 6:10, one with the player’s name on it in her handwriting.',
      weight: 0.95,
    },
    {
      id: 'p_the_folder',
      kind: 'RELATIONSHIP',
      label: 'The blue folder in the kitchen drawer',
      seedHint: 'Dad puts a blue folder in the drawer, says "garage stuff", and asks whether you have eaten.',
      payoffHint: 'Three pages, a price, and the fact that he found your acceptance letter in the bin in April.',
      weight: 0.85,
    },
    {
      id: 'p_ten_forty',
      kind: 'RIVAL',
      label: 'Who lit the fireworks, and who says so',
      seedHint: 'A wooden crate in the trunk of Theo’s silver car, and Jun saying he would do anything for a good story.',
      payoffHint: '10:40 on the boathouse roof, and Graham Ashcroft’s hand on somebody’s shoulder.',
      weight: 0.85,
    },
    {
      id: 'p_attempt_one',
      kind: 'MYSTERY',
      label: 'What happened on attempt one',
      seedHint: 'ATTEMPT 2, in grey, in the corner of the window.',
      payoffHint: 'A log in the player’s own handwriting: all ten points into Luck, three places at once, late to all of them.',
      weight: 0.5,
    },
  ],
  archetypes: [
    {
      id: 'arch_stayed',
      name: 'You Stayed',
      role: 'Hands-on craft background',
      summary: 'You stayed in town and fixed boat engines for ten years, so anything with a bolt in it answers to you, and the neighbours on your street trust your hands.',
      playstyle: ['Practical', 'Physical', 'Knows everyone'],
      blurb:
        'You spent ten years in the marina repair shop that used to be your father’s garage, working for the man who bought it. You know every engine on this lake and every reason you never left.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { hands: 3, grit: 2 },
      startingItems: [{ itemId: 'garage_keys', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_ferry_road', amount: 10 }],
    },
    {
      id: 'arch_left',
      name: 'You Left',
      role: 'Analysis and planning background',
      summary: 'You left for the city at twenty and spent years reading contracts for a living, so you remember tonight to the minute and can read a sale agreement in one pass.',
      playstyle: ['Observant', 'Planner', 'Slow to warm'],
      blurb:
        'Two years after this night you got on a bus with one bag and did not come back for Christmas. You have a good job, a quiet flat, and nobody who would notice for a week if you vanished.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { wits: 3, hindsight: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_sold',
      name: 'You Sold Things',
      role: 'Social persuasion background',
      summary: 'You sold phones, then cars, then apartments, so you can talk almost anybody round, and you know exactly how a good offer that is not good feels from the inside.',
      playstyle: ['Talks well', 'Reads people', 'Quick'],
      blurb:
        'You are very good at getting people to say yes and have not believed your own voice in years. You could sell Graham Ashcroft his own lake house. You recognise him, which is worse.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { charm: 3, passing: 1, wits: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_ashcroft', amount: 10 }],
    },
    {
      id: 'arch_drifted',
      name: 'You Drifted',
      role: 'Improvising and luck background',
      summary: 'Ten years of short jobs, long buses and lucky breaks taught you to try the stupid thing first, and the stupid thing works more often than it should.',
      playstyle: ['Reckless', 'Lucky', 'Adaptable'],
      blurb:
        'You have lived in nine towns and been good at something in all of them for about four months. You have a gift for being in the right place, and a habit of leaving it.',
      attributeBonus: { arcana: 3, agility: 1 },
      skillProficiencies: { luck: 3, passing: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_the_class', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does Jun call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Kai Moreno' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did the first ten years make you?',
      helpText:
        'The life you lived between eighteen and twenty-eight the first time round, which sets what you are good at tonight. It is fixed: you keep it for the whole story. It does not decide what you change, who you tell, or whether you keep this second try. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What was everybody sure about you at eighteen, the first time?',
      helpText: 'The person the whole town still thinks you are tonight. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Quiet, good with engines, and never once said out loud what I actually wanted.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct, waking up eighteen?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite on the first turn and the night will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'fix_all_three', label: 'Fix all three things before midnight' },
        { id: 'pick_one', label: 'Pick one thing and do it properly' },
        { id: 'tell_someone', label: 'Tell somebody the truth straight away' },
        { id: 'enjoy_it', label: 'Enjoy being eighteen for one more night' },
        { id: 'get_out', label: 'Get on the first bus out of town' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Jun see when he looks at you?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Bed hair, the graduation gown still half on, and the face of somebody who just saw a ghost.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of these are losses and none is a punishment. "The Same Night" is
   * what happens when nothing changes, which is reachable by playing politely
   * and passively for long enough: the honest failure of a second chance. "The
   * Long Way Out" is walking away from the whole town that night, available
   * early. Only "Attempt Two" needs the optional mystery; every other
   * destination is reachable by a player who never once looks at the corner of
   * the window.
   */
  endings: [
    {
      id: 'end_the_same_night',
      name: 'The Same Night',
      rarity: 'COMMON',
      minTurn: 20,
      requires: { flagsSet: ['same_night_again', 'dawn_came'] },
      condition:
        'Nothing changed. The player was at the party, or nowhere near it, and all three things happened exactly as they did the first time: the signature, the fire, the empty pier. This is the honest failure of a second chance and must not be written as a punishment. Play the morning plainly: the bus leaves, the shed is ash, Dad is asleep in the chair. The window asks its question anyway.',
      epilogue:
        'The 6:10 pulls out on time with one passenger. Jun’s name is in the local paper by Thursday. Dad does not mention the folder and neither do you, and by September there is somebody else’s name over the garage door. The ticket in your pocket is still ten years old.',
      hint: '',
    },
    {
      id: 'end_the_same_fight',
      name: 'The Same Fight',
      rarity: 'COMMON',
      minTurn: 22,
      requires: { flagsSet: ['same_fight_again', 'garage_sold'] },
      condition:
        'The garage sold and the player had the chance to say something different to Dad, and said the same thing again, or near enough. Do not frame it as the player getting it wrong. They are angry for real reasons, and so is he, and the second time is not easier for either of them. Write the garage, the dark, and two people who love each other leaving the same sentence where it fell.',
      epilogue:
        'You speak twice a year again, on his birthday and on yours. The difference this time is that you both know it happened twice, and once, years later, at a petrol station, he almost says so.',
      hint: '',
    },
    {
      id: 'end_back_to_the_rented_room',
      name: 'Back to the Rented Room',
      rarity: 'COMMON',
      minTurn: 22,
      requires: { flagsSet: ['woke_at_28', 'same_night_again'] },
      condition:
        'The player woke at twenty-eight and nothing had changed: the same rented room, the same quiet phone, the ticket still in their hand. Do not make it a cruelty. It is the morning they left, and it is theirs, and the night is now a thing that happened to them twice. Let them get up.',
      epilogue:
        'The kettle in the rented room takes four minutes. You make two cups out of habit and drink both. Some time before lunch you scroll to a name you have not called in six years, and look at it for a long while, and the window does not come back to help.',
      hint: '',
    },
    {
      id: 'end_two_bays',
      name: 'Two Bays on Ferry Road',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['garage_kept', 'made_peace_with_dad', 'kept_the_draft'] },
      condition:
        'Dad kept the garage because he chose to, the two of them said the true thing to each other, and the player kept this draft. Write it as concrete and unglamorous: the garage is still a struggling garage, the bank letters still come, and the player is going to the city anyway in September because he will not hear otherwise.',
      epilogue:
        'The rezoning goes through in August and Dad sells the lot three years later for what it is actually worth, to somebody who is not Graham Ashcroft. He keeps one bay. On Sundays you call and he puts you on speaker so he can keep working.',
      hint: '',
    },
    {
      id: 'end_juns_august',
      name: 'Jun’s August',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['jun_clear', 'kept_the_draft'], flagsUnset: ['jun_blamed', 'you_were_blamed'] },
      condition:
        'Nobody pinned the boathouse on Jun, either because nothing burned or because the truth got said, and the player kept this draft. Jun starts at the academy in August with a clean record and no idea what he was spared. Do not have anybody tell him. Let him be loud about it.',
      epilogue:
        'He passes out of the academy two years later, third in his intake, and sends a photo of himself in the gear to the group chat with forty exclamation marks. At twenty-eight he is still in your doorway, most weeks, uninvited, throwing things.',
      hint: '',
    },
    {
      id: 'end_your_name_on_it',
      name: 'Your Name on It',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['you_were_blamed', 'kept_the_draft'] },
      condition:
        'The player moved Jun off the rail, the shed burned anyway, and Graham Ashcroft found the next nearest person: them. They kept this draft knowing what it would cost. This is a trade, not a martyrdom, and the prose should be practical about what it means for the summer and the course in September.',
      epilogue:
        'It costs you a semester and a summer of community service clearing the shore path. Jun starts at the academy in August and finds out why at Christmas, from Theo of all people, and does not speak to you for a week, and then does not stop.',
      hint: '',
    },
    {
      id: 'end_see_you_in_september',
      name: 'See You in September',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['saw_her_off', 'knows:the_tickets', 'kept_the_draft'] },
      condition:
        'The player knows about the tickets and did not get on the bus. They saw Sara off with a promise and an acceptance letter, and kept this draft. Neither of them is giving anything up. Write the waiting as hopeful and specific: a date, a city, a course, a coat she said she would buy.',
      epilogue:
        'She texts from the bus at 6:52 to say the coat shop in the city opens at nine. You arrive in September with one bag and the faded ticket in your wallet, which she asks about for years and you never fully explain.',
      hint: 'She has two of something, and one has your name on it.',
    },
    {
      id: 'end_the_long_way_out',
      name: 'The Long Way Out',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['reached_sara'] },
      condition:
        'The player walked out of town on the night they were given back, alone, and did not stop for the party, the garage or the pier. Do not make this a tragedy and do not redeem it. It is a coherent response to being handed the worst night of your life a second time, and the people it costs most are the ones still on Ferry Road.',
      epilogue:
        'The signature happens at ten. The shed burns at 10:40. Sara waits until 11:47. You hear about all of it from a town forty miles away, in a group chat you mute, and the window stays dark until morning and then asks its question anyway.',
      hint: '',
    },
    {
      id: 'end_the_610',
      name: 'The 6:10',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['left_with_sara', 'kept_the_draft'] },
      condition:
        'The player got on the bus with Sara and the acceptance letter, and kept this draft. This is the romantic ending and it should not pretend the city will be easy. Write the bus: two tickets, one bag each, the lake going past, her head on their shoulder somewhere around the second town, and nothing promised out loud.',
      epilogue:
        'The bus is forty minutes late into the city and neither of you minds. She buys the coat on the first morning. You start the course in September. The faded ticket and the new one sit side by side in a frame on a shelf, and visitors always ask why there are two the same.',
      hint: 'She has two of something, and one has your name on it.',
    },
    {
      id: 'end_twenty_eight_again',
      name: 'Twenty-Eight, Again',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['woke_at_28', 'changed_something'] },
      condition:
        'The player chose to wake at twenty-eight and see what the night changed. Build the morning out of exactly what held: whose name is over the garage, whether Jun is in their contacts, whether there is one ticket or two on the shelf. Nothing they did not change should have changed. This is a reveal, and it should be specific.',
      epilogue:
        'The room is different by about one decision per wall. Some of it is better and one thing is worse in a way you did not see coming, and the window does not come back to help with that. Your phone has a message on it from somebody who used to not call.',
      hint: '',
    },
    {
      id: 'end_everyone_home',
      name: 'Everyone Home by Morning',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['changed_everything', 'kept_the_draft'] },
      condition:
        'All three: Dad, Jun and Sara, each changed because they chose it, and the player kept this draft. The first attempt tried this and failed. Do not make it look easy and do not throw a parade. Write the morning after a very long night: Dad asleep in the chair, Jun asleep on the porch, and a text from a bus at 6:52.',
      epilogue:
        'Nobody else knows anything happened. Dad keeps the garage, Jun starts in August, Sara buys the coat. For about a year you keep checking the corner of your eye for a number that is not there, and then one morning you forget to.',
      hint: '',
    },
    {
      id: 'end_attempt_two',
      name: 'Attempt Two',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['knows:attempt_one', 'saw_the_save_room', 'draft_decided'] },
      condition:
        'The player read the log, went into the window, and answered the question at 6:10 knowing what the System suspects it is. Nobody explains a mechanism. What this ending is about is that the player chose with the whole picture, and that the System let them.',
      epilogue:
        'The window closes at 6:11 without a sound. The last line it shows, in grey, is in your own handwriting, and it says: Good. Pick the next one.',
      hint: 'There is a number in the corner of the window.',
    },
  ],
  opening:
    "Ten minutes ago you were twenty-eight, asleep with an old bus ticket in your hand.\n\nNow Jun is shaking you awake. Your best friend. Eighteen, and still talking to you.\n\n\"Up, graduate. You slept the whole afternoon.\"\n\nYour old bedroom. Your gown on the door. And over the blanket, a pale blue window only you can see:\n\n[Restart complete. Graduation day, 4:40 p.m.]\n[10 points to allocate: Charm, Grit, Wits, Luck]\n\nLast time, tonight’s party ruined everything.\n\nJun tosses your shoes onto the bed. \"Party’s at eight. You’re coming this time, right?\"",
  openingPanel: {
    assetKey: 'story_restart_at_eighteen/opening',
    alt: 'Jun grinning in a bedroom doorway with a pair of shoes in one hand, while a pale blue window with four glowing bars hangs over an unmade bed in late-afternoon light.',
  },
  openingSuggestions: [
    "\"Yeah, I’m coming. Who’s going to be there?\"",
    'I tap the window and put all ten points into Luck.',
    "I sit up and look straight at Jun. \"Don’t laugh. I’m from ten years in the future.\"",
  ],
  publishedAt: null,
};

export const RESTART_AT_EIGHTEEN = StoryVersion.parse(raw);
