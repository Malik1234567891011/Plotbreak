import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Finals Week Outbreak" — the sick ones learned door handles tonight.
 *
 * Bible: `docs/story-bibles/new50/40_FINALS_WEEK_OUTBREAK.md`. Slate #40,
 * zombie survival, male lean.
 *
 * Playable span: one night and one morning in and around a university library,
 * from 2:07 a.m. on the Tuesday of finals week to the afternoon. The clock is
 * the spine — the helicopter at 6:30, the gate from 7:00 to noon, the exam at
 * 9:00, the seal at noon, Lily at about two — and every one of those can be
 * made impossible by what the player does. Everything after lives in endings.
 *
 * Two engines, both authored so the writer can motivate people rather than
 * only voice them. The infected are learning, in the order people learn a
 * building, which is what makes the opener frightening and what keeps beat ten
 * in the same story as beat one. And there are six uninfected people in the
 * building and four seats on the roof, which means somebody does arithmetic
 * before morning and everybody in the cast has a reason to want to be the one
 * who does it.
 *
 * The infected are sick classmates, not corpses. That is the 13+ decision and
 * also the better story: violence against them works, is loud, and costs the
 * group something every time, and there is no gore to write.
 *
 * The production storyteller reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest summaries,
 * world events and the first twelve endings. It does not read resources, step
 * notes or the ability list beyond the chosen archetype's starting abilities.
 * So the rules of the infected, the reset doses and the four seats all live in
 * hard canon, and the objects the story turns on are quest items.
 *
 * Three invisible variables. Stamina is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Noise comes first among the descending pair on
 * purpose: public violence raises the first GOOD_LOW in array order, and a
 * fight in a library full of the infected is heard before it frightens anybody.
 * Panic is the group coming apart.
 */

const raw = {
  id: 'sv_finals_week_outbreak_1',
  storyId: 'story_finals_week_outbreak',
  version: 1,
  title: 'Finals Week Outbreak',
  fantasyLabel: 'They learned door handles tonight.',
  hook: 'All night the sick ones walked into doors. Now one is trying your handle, the way a person with a key would. Campus library, 2 a.m., finals week.',
  premise:
    'Finals week. The campus has been sealed since Monday evening, and at two in the morning you are still on the third floor of the main library, because leaving got more dangerous than staying.\n\n' +
    'It started on Sunday night at the health centre: three students with fevers who had not slept in three days, and who stopped answering to their names an hour later. Since then it has spread the old way. A bite, a fever, about six hours.\n\n' +
    'The group chat calls them Regulars, because they keep their routines. The night librarian still locks up at ten past two. A rower still runs the river path. They walk toward lit screens and toward voices they know.\n\n' +
    'They are not dead. They are your classmates. And they are learning. On Sunday they walked into doors. Tonight one of them is trying the handle of the room you are in.\n\n' +
    'There are six of you left in this building. A helicopter is coming for one of them at half past six, and it does not have room for everyone. At noon the county seals the campus for three weeks.\n\n' +
    'One of the six has not slept in sixty hours, and keeps her left sleeve pulled down.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Horror', 'Survival', 'Zombie', 'Campus', 'Modern'],
  mechanicsChips: [
    'They are learning',
    'Not enough seats',
    'A secret under a sleeve',
    'Every door has a sound',
    'Hurting them costs you',
  ],
  contentDescriptors: ['HORROR', 'FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can hide, run, lie, fight, or walk out on everybody, and the night keeps up. The Regulars are your classmates, which means every door you hold is a choice about somebody. There is a helicopter at half past six and it does not have room for everyone in this building. Somebody does the arithmetic before morning. It might as well be you.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'reading_room',
    startWorldMinute: 2 * 60 + 7,
    startingItems: [{ itemId: 'your_laptop', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-one, an undergraduate in their third year. Nora Lindqvist is twenty-four, Kwame Mensah thirty-four, Lily Tran nineteen, Declan Shaw twenty-three and Professor Konrad Haas, called Haas, sixty-one. Odile Fenn, the night librarian, is sixty-three, and Priya Nair is twenty-two. The university is post-secondary: every student on this campus is an adult, and nobody is ever described as childlike.',
      'It is 2:07 a.m. on the Tuesday of finals week. The county sealed the campus on Monday evening. Phones show signal but calls do not connect; the campus wifi and the students’ group chat still work. The emergency alert reads: Shelter in place. Do not approach affected persons. Await evacuation instructions. Six uninfected people are in the main library: the player, Nora, Lily and Declan on the third floor, Kwame in the security office, and Haas behind the steel door of Special Collections on the fourth.',
      'The students call the infected Regulars, because they keep their routines. Regulars are sick living people, not dead ones. They do not sleep and rarely speak. They walk toward lit screens and toward voices they know, and they repeat their old routines: Odile Fenn still locks the library at ten past two, a rower still runs the river path, a nurse at the health centre still does her rounds.',
      'A bite passes it on. A bitten person runs a fever within the hour, stops being able to sleep, goes quiet, and turns in about six hours. A Regular can be shoved, outrun, shut out or locked in. Hurting one is hurting a sick classmate, and the prose never treats it as anything else. There is no gore on the page, ever.',
      'What a Regular does to a person. Left in the dark and quiet, it ignores people and keeps its routine, and somebody walking among them with no light, no voice and exactly their pace is not noticed. A lit screen or a voice it knows draws it straight to the source, and once it is close it reaches for whoever is there. It bites when it gets hold of somebody, or when somebody grabs it, blocks it or hurts it. The hand on the reading-room handle at 2:07 is Odile Fenn on her lock-up round, in her cardigan, keys on a lanyard round her neck: if the room is dark and silent at 2:10 she locks it from outside and moves on; if the laptop is still lit when that door opens, she walks straight toward it.',
      'Regulars are relearning, in the order people learn a building: on Sunday they walked into doors; tonight they turn handles and climb stairs; Haas expects most of them to manage keys and keycards by tomorrow night, and words after that. Odile Fenn is already ahead of them: she uses her own keys tonight, says the library is closing, and before morning she says Kwame’s name. A few others have started repeating a habit phrase.',
      'It came out of ND-12, a wakefulness compound from Haas’s pharmacology lab, trialled during finals week on forty paid student volunteers who called it the study pill. Three volunteers turned at about seventy hours without sleep on Sunday night and bit others. Lily Tran is Volunteer 31: she has been awake sixty hours when the story opens, wears a paper trial band under her left sleeve, and turns at about two in the afternoon unless a reset dose puts her to sleep first. After sixty hours on ND-12 nobody can fall asleep on their own, however tired they are; rest, warmth and kindness do not do it, and nothing in the library does.',
      'Haas designed a reset dose: a sedative that forces sleep and stops the turn if it is given before the turn completes. Twelve doses sit in a refrigerator in his lab in the science building across the quad, reachable over the quad or through the steam tunnel from the library basement. The refrigerator is padlocked; the key is on Haas’s own ring. On a Regular who has fully turned it does nothing anybody has measured. Nobody outside his lab knows the doses exist.',
      'At 1:40 a.m. the county radioed Kwame Mensah: a helicopter lands on the library roof at 6:30 a.m. for Professor Haas and three others, four seats in all, and waits four minutes. Kwame has told nobody, and has decided he is not one of the four. The main gate checkpoint opens at 7:00 a.m. and stays open until the noon seal; anyone with a fever or a bite is held in a quarantine tent on campus. At noon the county seals the campus for twenty-one days.',
      'At 9:00 a.m. every Regular who was booked for an exam walks to the exam hall at a normal pace, in silence, and sits at a desk until noon. The quad is empty for those three hours, and the exam hall doors lock from outside.',
    ],
    toneGuide:
      'Survival horror with the lights off and the jokes still on. Tense, fast and specific: a door handle, a cracked phone screen, a stairwell door that sighs, keys on the other side of frosted glass. ' +
      'The fear comes from what the Regulars are learning and from what the survivors are willing to do to each other, never from wounds — nothing is described in blood or injury. The Regulars are sick classmates in hoodies and lanyards; violence against one works, is loud, and costs the group something every time it happens. ' +
      'The survivors are funny because they are frightened, and a joke between two scares is how this story breathes. Romance between frightened adults is allowed to happen honestly and slowly, a kiss at most. ' +
      'Nobody is a villain. Haas is ashamed, Declan is guilty, Kwame is decided, Nora is counting, Lily is lying about how many cans she has had. The face at the top of a beat belongs to whoever reacted to the player most strongly.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Kwame’s torch finds the second-floor landing and stops on a pair of trainers.\n\nThen the rest of her. Highlighter behind one ear. Lanyard. She is standing very straight, facing the lift, the way you stand when you have somewhere to be.\n\n\"That’s Priya,\" Declan says. His voice doesn’t sound like his. \"Contract law.\"\n\nThe lift isn’t coming. She waits for it anyway.\n\nThen, without turning round, she reaches out and presses the button.",
      "Lily spreads the sketchbook across the table: every floor of the library, in ink, the stairwells shaded grey.\n\n\"Basement,\" she says, tapping. \"North wall. Hatch painted the same grey as the pipes. Tunnel runs under the quad.\"\n\n\"How do you know that?\"\n\n\"First-year project. I got a B.\" She tugs her sleeve down, quick. \"The B was unfair.\"\n\nNora is watching her hands. They are shaking.\n\nNobody says anything about it.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 11, resolve: 11, arcana: 8 },
  skills: [
    { id: 'brace', name: 'Bracing', attribute: 'might', description: 'Putting your weight in the right place so a door, a shelf or a person stays where you need it.' },
    { id: 'scrap', name: 'Scrapping', attribute: 'might', description: 'Getting physical with somebody and coming out of it standing.' },
    { id: 'quiet', name: 'Keeping Quiet', attribute: 'agility', description: 'Moving through a dark building without a sound, a light or a reason for anybody to turn.' },
    { id: 'legs', name: 'Legs', attribute: 'agility', description: 'Open ground, at speed, with something behind you.' },
    { id: 'attention', name: 'Noticing', attribute: 'mind', description: 'The pattern in what they do, and the thing a frightened person is hiding with their hands.' },
    { id: 'first_aid', name: 'First Aid', attribute: 'mind', description: 'Fevers, cuts, pulses, and the right dose at the right time.' },
    { id: 'steady', name: 'Steadiness', attribute: 'presence', description: 'Keeping a scared room from becoming a stampede.' },
    { id: 'bluff', name: 'Bluffing', attribute: 'presence', description: 'Saying everything is fine to somebody who needs it to be.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the hard number out loud, in front of the people it is about.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Staying where you are while something comes up the stairs.' },
    { id: 'gut', name: 'Gut', attribute: 'arcana', description: 'Knowing a room is wrong, or a moment is right, before you can say why.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so resting restores the night and nothing
   * else. Noise and Panic descend: Noise is how much of the building has heard
   * the group, Panic is how close the group is to coming apart. Every loud
   * ability costs Noise; hurting a Regular and saying the hard thing cost Panic.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 70,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has been awake since a library chair at noon yesterday and finals before that. They sit down wherever they are, their eyes close for a second too long, and whoever is nearest has to decide whether to wake them.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Hands shake, words come out in the wrong order, and the player misjudges distances in the dark. This is the band where a run across open ground ends on the grass, and where sitting with your back to a locked door for twenty minutes is genuinely the right call.',
        },
        {
          upTo: 60,
          behaviour:
            'Ordinary finals-week tired. Fine for one more staircase and honest about not wanting two. Jokes still land, a beat late. Nobody remarks on it unless somebody asks the player to carry something heavy.',
        },
        {
          upTo: 100,
          behaviour:
            'Adrenaline doing the work sleep should. The player is quick, sharp and able to take the long way round, hold a door for a full minute, or think through someone else’s plan while they are still explaining it.',
        },
      ],
    },
    {
      id: 'noise',
      name: 'Noise',
      max: 100,
      start: 15,
      regenPerHour: -6,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The building has forgotten the group is in it. Regulars drift on their own routines, the stairwell is still, and the only sound on the third floor is somebody’s laptop fan.',
      color: '#C0504D',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Unheard. The Regulars are doing their rounds and their routines and none of them is facing the group. Scenes can be slow, whispered and close, and the danger is something the player chooses to walk toward rather than something that arrives.',
        },
        {
          upTo: 50,
          behaviour:
            'Something has registered. The nearest Regulars have stopped what they were doing and turned their heads toward the third floor. A shape stands at the bottom of the stairwell, listening, and the next loud thing will bring it up.',
        },
        {
          upTo: 80,
          behaviour:
            'A crowd is gathering. Hands on the lobby glass, footsteps on the stairs, a handle being tried somewhere below. Every move now has to be made quietly or fast, and doors the group thought were safe start to be tested one by one.',
        },
        {
          upTo: 100,
          behaviour:
            'They are at every door. The building is full of patient hands on handles, and staying put is no longer an option. Whatever the group does next it does at a run, and somebody may not make it to the stairs.',
        },
      ],
    },
    {
      id: 'panic',
      name: 'Panic',
      max: 100,
      start: 25,
      regenPerHour: -1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The group is a team. People finish each other’s plans, take turns at the door without being asked, and laugh at Lily’s jokes because they are actually funny.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Frightened but together. People listen to each other, plans get made out loud, and the cast volunteers things: Lily offers the tunnel, Kwame offers the keys, Nora offers to go first. Disagreements are about method rather than about who is worth saving.',
        },
        {
          upTo: 50,
          behaviour:
            'Fraying at the edges. Declan has started citing rules, Nora is counting under her breath, and Lily jokes half a second too fast. Everyone still cooperates, and everyone is quietly checking who is standing nearest the door.',
        },
        {
          upTo: 80,
          behaviour:
            'Coming apart. People talk over each other, somebody proposes a vote about somebody else, and Lily stops eating. The group will still follow a clear instruction, but only from someone they trust, and only once.',
        },
        {
          upTo: 100,
          behaviour:
            'Every person for themselves. Somebody bolts, somebody locks a door with others on the wrong side of it, and Kwame has to choose between his building and the people in it. Nothing gets decided together at this level; it gets done to people.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'your_laptop',
      name: 'Your Laptop',
      tags: ['personal', 'light'],
      description: 'Thirty-one per cent battery, a revision document called FINAL final v3, and the brightest thing on the third floor. They come to screens.',
      loreText: 'Shut, it is a slab of aluminium. Open and thrown down a corridor, it is the best lure in the building for about four minutes.',
      icon: 'laptop',
    },
    {
      id: 'trial_binder',
      name: 'The Grey Binder',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'ND-12, Participant Records. Forty tabs, one per paid volunteer, with hours awake logged in Haas’s neat hand. Three tabs are red. Tab thirty-one says Lily Tran.',
      loreText: 'The consent form promised two hundred dollars and "mild alertness". The last page is a dosing note dated Saturday, and the sentence at the bottom of it has been crossed out and rewritten three times.',
      icon: 'book',
    },
    {
      id: 'reset_doses',
      name: 'The Reset Doses',
      tags: ['quest', 'medical'],
      questItem: true,
      description: 'Twelve pre-filled sedative pens in a foam tray, in the refrigerator in Haas’s lab. Given before a turn completes, one forces sleep and stops it. On a Regular who has fully turned, nobody knows.',
      loreText: 'A sticky note on the tray in Haas’s handwriting: Reset. Before hour six. Not after. And underneath, smaller: Try after?',
      icon: 'syringe',
    },
    {
      id: 'master_keys',
      name: 'The Master Keys',
      tags: ['quest', 'tool'],
      questItem: true,
      description: 'The spare master ring from the key cabinet in the security office: every door in the library, the staff lift, and the grey hatch in the basement.',
      loreText: 'Odile Fenn has the other full set, on a lanyard round her neck, and she is still using it.',
      icon: 'keys',
    },
    {
      id: 'spare_radio',
      name: 'The Spare Radio',
      tags: ['quest', 'tool'],
      questItem: true,
      description: 'A security handset from the charging rack, tuned to the county channel. Whoever holds it hears the Cordon say "oh-six-thirty, roof, four places" every half hour.',
      loreText: 'Kwame’s own handset is clipped to his shoulder. This one has a strip of tape on the back that says FENN.',
      icon: 'radio',
    },
    {
      id: 'lily_sketchbook',
      name: 'Lily’s Sketchbook',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { attention: 2 },
      description: 'Every floor of the library in ink, stairwells shaded grey, and a fold-out page of the steam tunnels under the quad, drawn in September for a first-year project.',
      loreText: 'The tunnel page has a grade in the corner, a B, and Lily has written "unfair" next to it in pencil.',
      icon: 'book',
    },
    {
      id: 'paper_wristband',
      name: 'The Paper Wristband',
      tags: ['quest', 'medical'],
      questItem: true,
      description: 'A white paper band of the kind hospitals use, printed VOL 31 · ND-12 · DO NOT REMOVE. It is on Lily’s left wrist, under her sleeve.',
      loreText: 'She has written a phone number on the inside of it in biro, in case she is found somewhere and cannot say whose it is.',
      icon: 'band',
    },
    {
      id: 'discharge_form',
      name: 'The Discharge Form',
      tags: ['document'],
      description: 'A health-centre clipboard from Sunday night. Patient: a trial volunteer. Assessment: exhaustion. Discharged home, 22:40. Signed N. Lindqvist, student volunteer.',
      loreText: 'He turned in his hall an hour later. It is the reason Nora counts things.',
      icon: 'papers',
    },
    {
      id: 'fire_extinguisher',
      name: 'The Fire Extinguisher',
      tags: ['tool', 'weapon'],
      description: 'Red, heavy, on a bracket at every stairwell landing. A blast of it fills a corridor with white fog that hides a person from anything that hunts by light.',
      loreText: 'Swung, it is a weapon. Every person in the group will see you do it.',
      icon: 'tools',
    },
    {
      id: 'book_cart',
      name: 'The Returns Cart',
      tags: ['tool'],
      description: 'A steel library trolley loaded with two hundred returned textbooks. Wedged under a handle, it holds a door shut against anything that does not think to lift it.',
      loreText: 'Tonight is the night they start thinking to lift it.',
      icon: 'cart',
    },
    {
      id: 'energy_drink',
      name: 'An Energy Drink',
      tags: ['consumable'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 12, consumesItem: true },
      description: 'Warm, sugary, and one of several stacked on Declan’s study-room desk.',
      loreText: 'Lily has had six. She says two.',
      icon: 'can',
    },
    {
      id: 'exam_timetable',
      name: 'The Exam Timetable',
      tags: ['document'],
      skillModifiers: { attention: 1 },
      description: 'Taped to the front desk: every finals sitting this week, by time and room. Tuesday, 9:00, exam hall, four papers at once, two hundred desks.',
      loreText: 'Read with what Nora knows about routines, it is a list of where every Regular on campus will walk at nine.',
      icon: 'papers',
    },
    {
      id: 'first_aid_kit',
      name: 'The First-Aid Kit',
      tags: ['medical'],
      skillModifiers: { first_aid: 2 },
      description: 'A green box from the security office wall: dressings, gloves, a thermometer, foil blankets. Nothing in it stops a turn.',
      loreText: 'Kwame restocked it on Friday. He has already used the thermometer on himself twice tonight.',
      icon: 'kit',
    },
    {
      id: 'nora_notes',
      name: 'Nora’s Surgery Notes',
      tags: ['document', 'personal'],
      description: 'Four hundred flashcards for a nine o’clock surgery paper, colour-coded, rubber-banded, and annotated in tiny capitals.',
      loreText: 'The top card is blank except for a single line: Sunday — exhaustion?? Underlined so hard it tore.',
      icon: 'papers',
    },
    {
      id: 'staff_lanyard',
      name: 'Your Staff Lanyard',
      tags: ['personal', 'tool'],
      description: 'A library swipe card for the staff lift, the returns room and the basement stacks, on a lanyard you have worn three nights a week since September.',
      loreText: 'Odile Fenn signed the form that got you the card. She knows your face.',
      icon: 'card',
    },
    {
      id: 'multitool',
      name: 'Your Multitool',
      tags: ['personal', 'tool'],
      skillModifiers: { brace: 1 },
      description: 'Pliers, a driver, a blade too short to matter, and a hinge-pin punch you have never needed until tonight.',
      loreText: 'Take the pins out of a door and it is a shield. Put them back and it is a door again.',
      icon: 'tools',
    },
    {
      id: 'training_watch',
      name: 'Your Training Watch',
      tags: ['personal'],
      skillModifiers: { legs: 1 },
      description: 'Heart rate, splits, and an alarm set for five every morning so you are on the river before anybody else is awake.',
      loreText: 'The alarm went off at five on Monday regardless, and it will again in three hours. Somewhere on the river path, half your crew is still running.',
      icon: 'watch',
    },
    {
      id: 'your_phone',
      name: 'Your Phone',
      tags: ['personal', 'light'],
      description: 'Full battery, because you charge it obsessively, and a group chat scrolling faster than you can read it.',
      loreText: 'Brightness up and thrown down a corridor, it is a lure. Brightness up in your hand, it is a mistake.',
      icon: 'phone',
    },
    {
      id: 'penlight',
      name: 'Your Penlight',
      tags: ['personal', 'medical', 'light'],
      skillModifiers: { first_aid: 1 },
      description: 'A ward penlight for checking pupils. A narrow beam that a Regular notices from across a room.',
      loreText: 'Shone in Lily’s eyes, it tells you everything Nora already knows.',
      icon: 'torch',
    },
  ],
  abilities: [
    {
      id: 'hold_it',
      name: 'Hold the Door',
      tags: ['defensive'],
      description: 'Put your weight, a cart or a chair against a door and keep it shut while something patient tries it from the other side.',
      affordances: ['hold the door', 'brace it', 'barricade', 'wedge it shut', 'block the door', 'lean on it', 'jam the handle', 'lock them in'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'noise', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'brace', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_dark',
      name: 'Go Dark',
      tags: ['stealth'],
      description: 'Every screen off, every light out, nobody breathing loudly. They come to light and to voices, so give them neither.',
      affordances: ['screen off', 'lights off', 'shut the laptop', 'hide', 'get down', 'stay still', 'go quiet', 'hold my breath'],
      costs: [{ resourceId: 'stamina', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'quiet', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lure_them',
      name: 'Draw Them Off',
      tags: ['utility'],
      description: 'A lit screen thrown down a corridor, a fire alarm, a familiar voice from the wrong direction. It moves them. It also tells the whole floor something is happening.',
      affordances: ['lure them', 'draw them away', 'throw my phone', 'set off the alarm', 'make a distraction', 'call them over', 'lead her away'],
      costs: [
        { resourceId: 'noise', amount: 12 },
        { resourceId: 'stamina', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'gut', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_them',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Watch a Regular long enough to see the routine underneath, or watch a person long enough to see what they are hiding.',
      affordances: ['watch them', 'look closer', 'study the pattern', 'notice', 'look at her sleeve', 'check the cameras', 'look through the glass', 'who is it'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'attention', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'patch_up',
      name: 'Patch Up',
      tags: ['utility'],
      description: 'Dress a cut, check a pupil, take a temperature, and tell somebody the truth about what you found.',
      affordances: ['bandage it', 'check the bite', 'take her pulse', 'clean the cut', 'first aid', 'patch him up', 'check her temperature'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'first_aid', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_down',
      name: 'Talk Them Down',
      tags: ['social'],
      description: 'Keep a frightened person from doing the thing fear wants, with your voice low and your hands where they can see them.',
      affordances: ['calm her down', 'reassure him', 'talk to them', 'persuade', 'reason with him', 'keep everyone together', 'ask her to trust me'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'steady', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_straight',
      name: 'Say It Out Loud',
      tags: ['social'],
      description: 'Put the hard fact in front of the people it is about: the bite, the band, the number of seats. It helps eventually. It never helps first.',
      affordances: ['tell the truth', 'tell them', 'say it', 'confess', 'ask him straight', 'tell everyone', 'put it to a vote'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'panic', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cover_it',
      name: 'Cover It Up',
      tags: ['social'],
      description: 'Say she is fine, say you heard nothing, say the radio was static. It buys time and it costs whatever the truth was worth.',
      affordances: ['lie', 'cover for her', 'bluff', 'say she is fine', 'make something up', 'pretend', 'keep it to myself'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluff', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_run',
      name: 'Make a Run',
      tags: ['movement'],
      description: 'Open ground, flat out, before the nearest of them has finished turning round.',
      affordances: ['run for it', 'sprint', 'make a break for it', 'cross the quad', 'race to the stairs', 'outrun them'],
      costs: [
        { resourceId: 'stamina', amount: 14 },
        { resourceId: 'noise', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'legs', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'force_it',
      name: 'Fight Through',
      tags: ['offensive'],
      description: 'Put a sick classmate on the floor and get past. It works, it is loud, and everyone who watches you do it remembers.',
      affordances: ['shove', 'tackle', 'swing the extinguisher', 'push past', 'fight', 'knock them down', 'force my way through'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'noise', amount: 15 },
        { resourceId: 'panic', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'scrap', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_with_them',
      name: 'Walk Like Them',
      tags: ['stealth'],
      description: 'Screen dark, eyes front, their pace exactly: walk among the Regulars as if you were going where they are going.',
      affordances: ['walk with them', 'blend in', 'match their pace', 'walk like them', 'join the line', 'act like one of them'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'gut', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_routine'],
        lockedCopy:
          'You have not watched them long enough to know their pace. Walk out among them now and every one of them will notice you are not going where they are going.',
      },
    },
    {
      id: 'give_the_reset',
      name: 'Give the Reset',
      tags: ['utility'],
      description: 'One pen, the upper arm, a count of ten. Before hour six it puts a turning person to sleep and keeps them themselves.',
      affordances: ['give her the reset', 'use the pen', 'dose her', 'get her to sleep', 'give the dose', 'reset him'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'first_aid', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['has_the_reset'],
        lockedCopy:
          'There is nothing in your hands that could put anybody to sleep. Whatever would, it is in a refrigerator on the far side of the quad.',
      },
    },
  ],
  locations: [
    {
      id: 'reading_room',
      name: 'The Reading Room',
      shortName: 'Reading Room',
      description:
        'The third-floor silent study room: forty metres of long oak tables, green lamps all switched off, tall arched windows over the quad. One door, to the stairwell landing, with a frosted glass panel at head height. Somebody’s laptop is the only light.',
      artDirection:
        'Grand university reading room at night, long oak tables, green banker’s lamps switched off, tall arched windows showing a dark quad lit by distant red and white floodlights, one glowing laptop, a heavy wooden door with a frosted glass panel. Blue, black and one warm glow.',
      connections: [
        { to: 'the_stacks', travelMinutes: 1, label: 'Into the stacks' },
        { to: 'stairwell', travelMinutes: 1, label: 'Through the door to the landing' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'nora_notes', qty: 1, ownerId: 'nora', aka: ['notes', 'her notes', 'surgery notes', 'the flashcards'] },
      ],
    },
    {
      id: 'the_stacks',
      name: 'The Stacks',
      shortName: 'Stacks',
      description:
        'Rows of steel shelving running into the dark, carrels along the windows, and a returns cart abandoned halfway down Architecture. Lily Tran is sitting on the floor between Architecture and Art with a sketchbook, wide awake.',
      artDirection:
        'Dark library stacks, tall steel shelving in long rows, emergency exit sign glowing green, a steel returns trolley loaded with books, a figure sitting cross-legged on the floor with a sketchbook in a narrow strip of moonlight. Claustrophobic, quiet.',
      connections: [
        { to: 'reading_room', travelMinutes: 1, label: 'Back to the reading room' },
        { to: 'study_rooms', travelMinutes: 1, label: 'Along to the study rooms' },
        { to: 'stairwell', travelMinutes: 1, label: 'The side door to the landing' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'lily_sketchbook', qty: 1, ownerId: 'lily', aka: ['sketchbook', 'her sketchbook', 'the floor plans', 'the drawings'] },
        { itemId: 'book_cart', qty: 1, ownerId: null, aka: ['cart', 'book cart', 'the trolley', 'returns cart'] },
      ],
    },
    {
      id: 'study_rooms',
      name: 'The Study Rooms',
      shortName: 'Study Rooms',
      description:
        'Six glass-walled group rooms along the east side of the third floor. Five are dark and empty. In 3C a whiteboard has been dragged across the glass, the door is taped, and Declan Shaw is sitting behind it with a stack of energy drinks and the emergency alert open on his phone.',
      artDirection:
        'Row of glass-walled study rooms at night, one with a whiteboard pushed against the glass and tape across the door, a desk stacked with cans, a phone screen glowing behind the board. Corporate, cold, barricaded.',
      connections: [{ to: 'the_stacks', travelMinutes: 1, label: 'Back through the stacks' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [
        { itemId: 'energy_drink', qty: 4, ownerId: 'declan', aka: ['can', 'energy drink', 'a drink', 'the cans'] },
      ],
    },
    {
      id: 'stairwell',
      name: 'The Main Stairwell',
      shortName: 'Stairwell',
      description:
        'Concrete stairs from the basement to the fourth floor, glass fire doors on every landing that sigh when they close, an extinguisher on every bracket. On the second-floor landing a woman with a highlighter behind her ear is standing in front of the lift, waiting for it.',
      artDirection:
        'Institutional concrete stairwell at night lit by green emergency strips, glass fire doors, a red fire extinguisher on a bracket, the shadow of a figure standing very still on the landing below, facing a lift door. Echoing and tense.',
      connections: [
        { to: 'reading_room', travelMinutes: 1, label: 'Third floor, reading room' },
        { to: 'the_stacks', travelMinutes: 1, label: 'Third floor, stacks' },
        { to: 'special_collections', travelMinutes: 2, label: 'Up to the fourth floor' },
        { to: 'lobby', travelMinutes: 3, label: 'Down to the lobby' },
        { to: 'basement_stacks', travelMinutes: 4, label: 'All the way down' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'fire_extinguisher', qty: 1, ownerId: null, aka: ['extinguisher', 'fire extinguisher', 'the red cylinder'] },
      ],
    },
    {
      id: 'lobby',
      name: 'The Lobby',
      shortName: 'Lobby',
      description:
        'The ground floor: a curved front desk, security gates, and a two-storey wall of glass onto the quad with hands pressed flat against the outside of it. The revolving door is chained. The exam timetable is taped to the front desk.',
      artDirection:
        'Modern library lobby at night, a curved front desk, security gates, a huge glass frontage with many silhouetted hands pressed against the outside, a chained revolving door, floodlight glare from the quad. Exposed, wide, frightening.',
      connections: [
        { to: 'stairwell', travelMinutes: 3, label: 'Back up the stairs' },
        { to: 'security_office', travelMinutes: 1, label: 'Behind the front desk' },
        { to: 'the_quad', travelMinutes: 2, label: 'Out through the staff door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'exam_timetable', qty: 1, ownerId: null, aka: ['timetable', 'exam timetable', 'the printout', 'the exam list'] },
      ],
    },
    {
      id: 'security_office',
      name: 'The Security Office',
      shortName: 'Security',
      description:
        'A windowless room behind the front desk: sixteen camera feeds on four monitors, a key cabinet, a rack of charging radios, a first-aid box on the wall and a mug that says WORLD’S OKAYEST GUARD. Kwame Mensah’s chair faces the door, not the screens.',
      artDirection:
        'Cramped security office, a wall of CCTV monitors showing grey corridors and figures standing still, a metal key cabinet, a rack of radios charging, a green first-aid box, a single desk lamp. Tight, blue-lit, watchful.',
      connections: [{ to: 'lobby', travelMinutes: 1, label: 'Out to the front desk' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'master_keys', qty: 1, ownerId: 'kwame', aka: ['keys', 'master keys', 'the key ring', 'spare keys'] },
        { itemId: 'spare_radio', qty: 1, ownerId: 'kwame', aka: ['radio', 'the handset', 'walkie-talkie', 'spare radio'] },
        { itemId: 'first_aid_kit', qty: 1, ownerId: null, aka: ['first aid kit', 'med kit', 'the green box', 'bandages'] },
      ],
    },
    {
      id: 'special_collections',
      name: 'Special Collections',
      shortName: 'Special Collections',
      description:
        'The fourth floor’s climate-controlled rare-book room behind a steel door with a keypad the Regulars have not learned yet. Grey cases, one reading desk under one lamp, and Professor Haas behind it with a grey binder held to his chest. A maintenance stair at the back goes up to the roof.',
      artDirection:
        'Climate-controlled rare-book room at night, glass-fronted cases, one pool of lamplight on a reading desk, a heavy steel door, an older man in a tweed jacket clutching a grey ring binder, a narrow metal stair in shadow at the back. Hushed and guilty.',
      connections: [
        { to: 'stairwell', travelMinutes: 2, label: 'Back down the stairs' },
        { to: 'library_roof', travelMinutes: 2, label: 'The maintenance stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'trial_binder', qty: 1, ownerId: 'haas', aka: ['binder', 'the grey binder', 'trial records', 'his binder'] },
      ],
    },
    {
      id: 'library_roof',
      name: 'The Library Roof',
      shortName: 'Roof',
      description:
        'Flat, gravelled, ringed with air-handling units. The whole campus is laid out below: the quad full of standing figures, the floodlights at the main gate, the science building’s dark windows, and the painted circle where a helicopter will land at half past six.',
      artDirection:
        'Flat library rooftop before dawn, gravel and humming air units, a painted landing circle, the whole university campus below with figures standing still on the lawns, floodlights and red emergency lights at a distant gate, a pale sky starting at the horizon. Vast and exposed.',
      connections: [{ to: 'special_collections', travelMinutes: 2, label: 'Back down the maintenance stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
    },
    {
      id: 'basement_stacks',
      name: 'The Basement Stacks',
      shortName: 'Basement',
      description:
        'Rolling compact shelving that closes like a mouth if anybody turns the wheels, bound journals back to 1890, pipes along the ceiling, and on the north wall a grey hatch painted the same grey as the pipes. It is warm down here, and nobody comes down here.',
      artDirection:
        'Library basement with rows of rolling compact shelving, crank wheels, exposed pipes along the ceiling, a grey steel hatch set low in a concrete wall, a single flickering tube light. Close, warm, secretive.',
      connections: [
        { to: 'stairwell', travelMinutes: 4, label: 'Back up the stairs' },
        { to: 'steam_tunnel', travelMinutes: 2, lockedByFlag: 'knows:the_tunnel', label: 'Through the grey hatch' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
    },
    {
      id: 'steam_tunnel',
      name: 'The Steam Tunnel',
      shortName: 'Tunnel',
      description:
        'A hot concrete passage under the quad, low enough to stoop in, lagged pipes on both walls and one line of caged bulbs, every third one dead. It forks halfway: left to the science building, right to the health centre. Water drips. Something down here is humming a tune.',
      artDirection:
        'Narrow utility steam tunnel under a campus, insulated pipes on both walls, caged bulbs in a long line with some dead, condensation, a fork ahead into two dark passages. Oppressive, orange-lit, claustrophobic.',
      connections: [
        { to: 'basement_stacks', travelMinutes: 2, label: 'Back to the library basement' },
        { to: 'science_building', travelMinutes: 6, label: 'Left fork, the science building' },
        { to: 'health_centre', travelMinutes: 5, label: 'Right fork, the health centre' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 4 },
    },
    {
      id: 'science_building',
      name: 'Haas’s Lab',
      shortName: 'The Lab',
      description:
        'Second floor of the science building: two benches, fume hoods, a whiteboard of dosing curves nobody wiped, and a laboratory refrigerator with a padlock and a sticky note on it. The padlock key is on Haas’s own ring. Three of the forty volunteers sat here on Saturday morning. The faculty car park is under the windows.',
      artDirection:
        'University pharmacology lab at night, lab benches, fume hoods, a whiteboard covered in graphs, a tall white laboratory refrigerator with a padlock and a sticky note, rain on dark windows over a car park. Sterile, abandoned, guilty.',
      connections: [
        { to: 'steam_tunnel', travelMinutes: 6, label: 'Down to the tunnel' },
        { to: 'the_quad', travelMinutes: 4, label: 'Out onto the quad' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 3 },
      takeableItems: [
        { itemId: 'reset_doses', qty: 1, ownerId: 'haas', aka: ['doses', 'the reset', 'the pens', 'the fridge tray'] },
      ],
    },
    {
      id: 'health_centre',
      name: 'The Health Centre',
      shortName: 'Health Centre',
      description:
        'Where it began. Six cubicles behind curtains, a waiting room of overturned chairs, and a nurse in blue scrubs still doing her rounds, drawing back each curtain in turn and writing nothing on her clipboard. Sunday night’s paperwork is still on the desk.',
      artDirection:
        'Small campus health clinic at night, curtained cubicles, overturned waiting-room chairs, a figure in scrubs drawing back a curtain with a clipboard, harsh fluorescent light flickering. Clinical, eerie, quiet.',
      connections: [
        { to: 'steam_tunnel', travelMinutes: 5, label: 'Down to the tunnel' },
        { to: 'the_quad', travelMinutes: 5, label: 'Out onto the quad' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [
        { itemId: 'discharge_form', qty: 1, ownerId: null, aka: ['form', 'the discharge form', 'the clipboard'] },
      ],
    },
    {
      id: 'the_quad',
      name: 'The Quad',
      shortName: 'Quad',
      description:
        'Open lawns crossed by paths, benches, a stone fountain switched off. Several hundred Regulars stand on the grass at night, some holding phones whose screens light their faces from below. They do not look at the screens. They look at the library.',
      artDirection:
        'University quad at night, wide lawns and crossing paths, a dry stone fountain, hundreds of still figures standing on the grass, many lit from below by phone screens, the library glowing behind, floodlights at a distant gate. Eerie, silent, enormous.',
      connections: [
        { to: 'lobby', travelMinutes: 2, label: 'The library staff door' },
        { to: 'science_building', travelMinutes: 4, label: 'The science building' },
        { to: 'health_centre', travelMinutes: 5, label: 'The health centre' },
        { to: 'exam_hall', travelMinutes: 3, label: 'The exam hall' },
        { to: 'main_gate', travelMinutes: 6, label: 'The long walk to the main gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
    {
      id: 'exam_hall',
      name: 'The Exam Hall',
      shortName: 'Exam Hall',
      description:
        'Two hundred single desks in perfect rows, a candidate number on each, an invigilator’s clock on the stage, and double doors that lock from the outside. Laid out on Friday for the nine o’clock sitting, and still waiting for it.',
      artDirection:
        'Huge university exam hall, two hundred single desks in perfect rows, a large clock on a stage, tall windows with grey dawn light, heavy double doors. Orderly, empty, waiting.',
      connections: [{ to: 'the_quad', travelMinutes: 3, label: 'Back out to the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
    },
    {
      id: 'main_gate',
      name: 'The Main Gate',
      shortName: 'Gate',
      description:
        'The campus entrance turned into a checkpoint: floodlights, two lines of tape, a white screening tent with a thermal camera at its mouth, and a loudhailer reading the rules every ten minutes. Beyond it, the town, ordinary and lit.',
      artDirection:
        'University gate turned emergency checkpoint at dawn, floodlights, barrier tape, a white screening tent, figures in protective suits, a loudhailer on a pole, an ordinary town street beyond. Bright, bureaucratic, unreachable.',
      connections: [{ to: 'the_quad', travelMinutes: 6, label: 'Back across campus' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 5 },
    },
  ],
  factions: [
    {
      id: 'faction_group_chat',
      name: 'The Group Chat',
      description:
        'About two hundred students hiding across campus in dorm rooms, labs and one dining hall, on a chat that started as a revision group. It now posts which stairwells are clear, who is bitten and who has water, and it remembers who helped and who held a door shut.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Lurking' },
        { atReputation: 35, label: 'Trusted on the chat' },
        { atReputation: 65, label: 'The one they ask' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_cordon',
      name: 'The Cordon',
      description:
        'County emergency response: floodlights at the main gate, a screening tent, a helicopter, and an incident commander on the radio who speaks only in times. They want the uninfected out by noon, Professor Haas out at half past six, and nothing that walks on campus to leave it.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A number on a list' },
        { atReputation: 40, label: 'Useful' },
        { atReputation: 70, label: 'Asked for by name' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_administration',
      name: 'The Administration',
      description:
        'What is left of the university’s leadership, emailing from a hotel across the river. They know about the ND-12 trial, they would very much like nobody else to, and their statement calls the outbreak a fast-moving viral illness.',
      startingReputation: 0,
      ranks: [
        { atReputation: -20, label: 'A liability' },
        { atReputation: 0, label: 'Enrolled' },
        { atReputation: 40, label: 'Discreet' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'nora',
      name: 'Nora Lindqvist',
      role: 'Fourth-year medical student, sharing your table since midnight, and the only person here who has watched somebody turn',
      cardBlurb:
        'She will tell you how long you have, in minutes, whether you asked or not. She has shared your table since midnight, and she was on shift at the health centre the night it started.',
      pronouns: 'she/her',
      publicTraits: ['Counts everything: pulses, minutes, exits', 'Repeats a sentence when frightened', 'Steady hands, unsteady jokes'],
      hiddenDrives: [
        'On Sunday night she discharged the first trial volunteer with a form that said exhaustion, and she needs to save one person tonight to be able to live with it',
        'She still half intends to sit her nine o’clock surgery paper, because if she does then the world is still the world',
      ],
      values: ['Triage, said out loud: the most good for the most people', 'Nobody is left alone while they are scared'],
      fears: [
        'Being the one who decides who is not worth saving',
        'Her own hands shaking at the moment they cannot',
      ],
      socialStyle:
        'Takes your pulse while she talks to you. Gives orders as questions, and answers them herself if you are slow.',
      boundaries: [
        'Will not hurt a Regular unless there is no other way, and will tell you afterwards exactly what you did to them',
        'Will not lie to a patient, and anybody frightened is her patient',
      ],
      goals: ['Get everybody on this floor to morning', 'Find out what put three healthy volunteers into the health centre'],
      secrets: [
        {
          id: 'nora_the_discharge',
          fact: 'At 22:40 on Sunday, volunteering at the health centre, she discharged the first ND-12 volunteer with a form that said exhaustion. He turned in his hall an hour later. The form is still on the health-centre desk with her signature on it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you ask her why she was at the health centre on Sunday, and you do not tell her it was not her fault.',
        },
        {
          id: 'nora_has_seen_lily',
          fact: 'She has seen Lily’s pupils and the tremor in her hands since one o’clock and knows they are what the volunteers looked like. She has said nothing because she has nothing to treat it with.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her straight what is wrong with Lily, she tells you, quietly, out of Lily’s hearing.',
        },
      ],
      speechStyle:
        'Clipped and clinical, numbers first. Repeats a sentence twice when frightened. Uses the medical word, then translates it for you without being asked.',
      topics: ['the health centre on Sunday', 'how the turn works', 'Lily’s hands', 'her surgery paper', 'triage', 'the reset'],
      voiceSamples: [
        'They don’t do that. They don’t do that. Handles are fine motor control. That should take weeks to relearn, not two days.',
        'Pulse is one-forty. Mine, not yours. Give me ten seconds and it will be ninety.',
        'Bite, fever inside an hour, insomnia, then the quiet. Six hours, give or take. I have watched it once, start to finish, and once was plenty.',
        'Triage means somebody says out loud who we can save. Hate me for it after sunrise.',
        'If I sit that surgery paper at nine, everything is normal. Which is not logic. I know it is not logic.',
      ],
      appearance:
        'An adult woman, tall, ash-blonde hair in a messy knot held with a pen, grey eyes, a navy hoodie over pale blue hospital scrubs, a stethoscope slung round her neck.',
      visualHook: 'A stethoscope worn over a hoodie, and a pen stabbed through her hair.',
      silhouette: 'Crouched low, one hand on somebody’s wrist, eyes on a door.',
      artSeed: 'fwo-nora-01',
      portrait: null,
      expressions: ['neutral', 'alarmed', 'focused', 'worried', 'grim', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'reading_room', activity: 'at the long table with her flashcards and a pulse she keeps checking' },
        { startMinute: 420, endMinute: 540, locationId: 'security_office', activity: 'going through the first-aid kit for the third time' },
        { startMinute: 540, endMinute: 720, locationId: 'lobby', activity: 'at the lobby glass, watching the quad empty toward the exam hall where her own paper is starting without her' },
        { startMinute: 720, endMinute: 1440, locationId: 'health_centre', activity: 'doing what she can at the health centre' },
      ],
      homeLocationId: 'reading_room',
      knowledgeScope: ['nora', 'health_centre', 'the_turn', 'nd12_volunteers', 'lily_symptoms', 'triage'],
      startingRelationship: { trust: 40, affection: 30, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nora_names_it',
          label: 'She tells you what Lily’s hands mean',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['lily_symptoms'] },
        },
        {
          id: 'nora_tells_you_about_sunday',
          label: 'She tells you about the discharge form',
          kind: 'TRUST',
          requires: { trust: 58 },
        },
        {
          id: 'nora_close',
          label: 'She stops counting when you are near',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 16, presence: 12, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 4, tags: ['civilian'] },
    },
    {
      id: 'kwame',
      name: 'Kwame Mensah',
      role: 'Night security officer, six years on this building, master keys on his belt and the county on his radio',
      cardBlurb:
        'He has not told you what the county said on his radio at 1:40. He also has the keys to every door in this library.',
      pronouns: 'he/him',
      publicTraits: ['Calm in a way that is a decision', 'Talks in radio procedure off the radio', 'Knows every door by its sound'],
      hiddenDrives: [
        'He has decided to stay with his building when the helicopter comes, and is spending the night making sure three students take the seats',
        'Odile Fenn trained him on his first night. He has not been able to lock her out, and he will not say why he keeps leaving the staff door on the latch',
      ],
      values: ['Everybody signs in and everybody signs out', 'Doing the round properly when nobody is checking'],
      fears: ['Being the guard who opened the wrong door', 'Hearing Odile Fenn say his name'],
      socialStyle:
        'Answers questions with exact places and times. Takes the dangerous end of anything without discussing it, and makes a dry joke afterwards with no change of expression.',
      boundaries: [
        'Will not hand the master keys to anybody he has not seen hold a door',
        'Will not leave somebody outside a door he could open, which is the whole problem',
      ],
      goals: ['Get the professor and three students onto the roof at 06:30', 'Do one last full round of his building before it is sealed'],
      secrets: [
        {
          id: 'kwame_four_seats',
          fact: 'At 1:40 the county radioed him: helicopter on the roof at 06:30 for Professor Haas plus three, four minutes on the ground. He has told nobody, and he has already decided he is not one of the three.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you have held a door with him or covered his back once, and then you ask him what the radio said.',
        },
        {
          id: 'kwame_and_fenn',
          fact: 'Odile Fenn, the night librarian, was the first person in this building to learn his name. He has been leaving the staff door on the latch so she can finish her round.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after she says his name in the stairwell, and only if you ask him who she was rather than what she is.',
        },
      ],
      speechStyle:
        'Low, even, procedural. Radio words off the radio: copy, negative, say again. Times on a twenty-four-hour clock. Dry humour, delivered flat.',
      topics: ['the building', 'the radio', 'Odile Fenn', 'the doors', 'the roof', 'his round'],
      voiceSamples: [
        'Copy. Third floor, reading room, two occupants, door secure. Stay off the windows. Over.',
        'Oh-six-thirty, roof, four places. Professor plus three. Say again? Negative. I am not one of the three.',
        'Thirty-one years she locked this building at ten past two. She still does. Can’t bring myself to change the locks on her.',
        'Every door in here has a sound. Stack door sticks, fire door sighs. That jingle you are hearing is her keys.',
        'Negative on heroics. Brace low, hip against the frame, let the hinge carry the weight.',
      ],
      appearance:
        'An adult man, broad and unhurried, close-cropped hair and a neat beard, dark skin, a navy security jacket with reflective trim, a heavy ring of keys on his belt and a radio clipped to his shoulder.',
      visualHook: 'A radio clipped high on his shoulder and a ring of keys the size of a fist on his belt.',
      silhouette: 'Square in a doorway, one hand on the frame, head tilted toward the radio.',
      artSeed: 'fwo-kwame-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'grave', 'warm', 'alert'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'security_office', activity: 'at the camera wall with the radio on the desk' },
        { startMinute: 360, endMinute: 400, locationId: 'library_roof', activity: 'checking the roof is clear for the landing' },
        { startMinute: 400, endMinute: 1440, locationId: 'lobby', activity: 'at the front desk, watching the glass' },
      ],
      homeLocationId: 'security_office',
      knowledgeScope: ['the_library', 'the_doors', 'odile_fenn', 'the_cordon', 'the_helicopter', 'steam_tunnel'],
      startingRelationship: { trust: 35, affection: 20, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'kwame_tells_you_the_number',
          label: 'He tells you how many seats there are',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'kwame_hands_you_keys',
          label: 'He gives you the spare master ring',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 50 },
        },
      ],
      attributes: { might: 15, agility: 11, mind: 12, presence: 13, resolve: 16, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 50, defenseDc: 15, damage: 8, tags: ['security'] },
    },
    {
      id: 'lily',
      name: 'Lily Tran',
      role: 'First-year architecture student who has drawn every floor of this building, and has not slept in sixty hours',
      cardBlurb:
        'She keeps pulling her left sleeve down over something you are not meant to see. She has also drawn this library down to the steam tunnels, and jokes faster than you can answer.',
      pronouns: 'she/her',
      publicTraits: ['Deadpan and very fast', 'Draws floor plans compulsively', 'Lies about how many cans she has had'],
      hiddenDrives: [
        'She took the study pill for two hundred dollars of rent and believes she is going to turn; she wants to be useful enough first that somebody remembers her as more than a symptom',
        'She would rather walk out onto the quad on her own than be put out by a vote',
      ],
      values: ['Knowing what holds a thing up', 'Being asked, not discussed'],
      fears: ['Falling asleep, because she thinks sleep is what ends her', 'Waking up as one of them with her sketchbook still in her hand'],
      socialStyle:
        'Jokes before anybody else can be sad. Explains everything in structural terms. Goes very quiet when somebody is kind to her.',
      boundaries: [
        'Will not be talked about in the third person while she is in the room',
        'Will not be sedated without saying yes first',
      ],
      goals: ['Get the tunnel route to somebody who can use it', 'Stay awake, which she thinks is the same as staying herself'],
      secrets: [
        {
          id: 'lily_volunteer_31',
          fact: 'She is Volunteer 31 in the ND-12 trial, sixty hours awake, with a paper band under her left sleeve. At about seventy-two hours, near two in the afternoon, she will turn unless a reset dose puts her to sleep first; she cannot fall asleep on her own any more. She believes sleep is the danger; the reset’s sleep is the cure.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the band herself if you ask her to trust you and do not look at Declan while you ask.',
        },
        {
          id: 'lily_the_hatch',
          fact: 'Her first-year project was the campus steam tunnels. The grey hatch in the library basement opens with the master key, and the tunnel forks under the quad to the science building and the health centre.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She volunteers it the moment anybody says the quad is impossible.',
        },
      ],
      speechStyle:
        'Fast, dry, structural metaphors: load-bearing, egress, cantilever. Undercuts herself before anybody else can. Measures everything in floors and metres.',
      topics: ['the building', 'the tunnel', 'her sketchbook', 'rent', 'sleep', 'the study pill'],
      voiceSamples: [
        'Good news: this building is over-engineered. Bad news: so are the stairwells, so nobody is collapsing them for us.',
        'Egress, egress, egress. Three exits on this floor and one of them is a window, which architecturally I am calling a last resort.',
        'I’m fine. I’ve had two cans. Okay, five. Six. Everyone vibrates during finals.',
        'Don’t vote on me. If you’re putting me outside, say it to my face, and I’ll walk out myself.',
        'Basement, north wall, hatch painted pipe-grey. Tunnel runs under the quad to the science building. I drew it in September for a grade.',
      ],
      appearance:
        'An adult woman, lean and wiry, black hair in a blunt jaw-length cut, sharp dark eyes ringed with sleeplessness, a charcoal studio jacket with the left cuff pulled down over her wrist, ink-stained fingers, a sketchbook under one arm.',
      visualHook: 'A left cuff always pulled down over the wrist, and ink on every fingertip.',
      silhouette: 'Sitting on the floor with her knees up and a sketchbook against them, pen moving.',
      artSeed: 'fwo-lily-01',
      portrait: null,
      expressions: ['wry', 'amused', 'exhausted', 'frightened', 'defiant', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_stacks', activity: 'on the floor between Architecture and Art, sketching, awake' },
        { startMinute: 480, endMinute: 840, locationId: 'reading_room', activity: 'drawing the quad from the window, sleeve pulled down' },
        { startMinute: 840, endMinute: 1440, locationId: 'the_stacks', activity: 'back between the shelves, very still' },
      ],
      homeLocationId: 'the_stacks',
      knowledgeScope: ['the_library', 'steam_tunnel', 'nd12_volunteers', 'the_study_pill', 'architecture'],
      startingRelationship: { trust: 30, affection: 35, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'lily_shows_the_band',
          label: 'She shows you what is under her sleeve',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'lily_says_yes',
          label: 'She agrees to take the reset',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['has_the_reset'] },
        },
      ],
      attributes: { might: 8, agility: 14, mind: 15, presence: 12, resolve: 11, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 28, defenseDc: 13, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'declan',
      name: 'Declan Shaw',
      role: 'Second-year law student barricaded in a study room with a whiteboard over the glass and a rule for everything',
      cardBlurb:
        'He held a stairwell door shut on somebody at eight o’clock, and he will make you argue for every person you want to let into his room.',
      pronouns: 'he/him',
      publicTraits: ['Recites rules under pressure', 'Physically brave, morally rigid', 'Wants a vote on everything'],
      hiddenDrives: [
        'At eight he held the stairwell door shut on his study partner Priya Nair while she was bitten on the other side, and every hard line he draws tonight is there to prove he was right to',
        'He wants somebody to tell him he is not a coward, and will not accept it from anybody who has not had to choose',
      ],
      values: ['Procedure protects people from their own fear', 'Rules apply to friends first'],
      fears: ['That Priya knew it was him holding the door', 'Being the last one out because he waited for agreement'],
      socialStyle:
        'Argues like moot court: the rule, the exception, the burden of proof. Gets louder as he gets more frightened, and uses full names when angry.',
      boundaries: [
        'Will not share a room with anybody showing symptoms, and will say so to her face',
        'Will not lie about what he did at eight if asked directly; he will refuse to answer instead',
      ],
      goals: ['Get on whatever leaves first', 'Keep anybody infected out of the group'],
      secrets: [
        {
          id: 'declan_priya',
          fact: 'At 20:05 he held the third-floor stairwell door shut while Priya Nair, his study partner, was bitten on the landing outside it. She is a Regular on the second-floor landing now, waiting for a lift.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after he has seen her on the landing, and only if you ask him who she was instead of telling him what he did.',
        },
        {
          id: 'declan_the_car',
          fact: 'His father’s car is in the faculty car park under the science building’s windows, keys in his pocket. It holds five. He has not mentioned it because the gate would stop it and he cannot face being told so.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He offers it if the group decides on all or nobody and he is outvoted.',
        },
      ],
      speechStyle:
        'Formal, legal, recitative. Opens with "for the record". Lists conditions. Cites the alert. Full names when angry.',
      topics: ['the emergency alert', 'the rules', 'Priya', 'who gets to stay', 'votes', 'his father’s car'],
      voiceSamples: [
        'Shelter in place. Do not approach affected persons. Await evacuation instructions. That is the entire alert. Forty readings.',
        'For the record, nobody comes through that door who cannot show me both forearms.',
        'Burden of proof sits with whoever has the fever. Call it cruelty if you want. It is how some of us survive instead of none.',
        'Priya Nair, twenty-two, contract law, highlighter behind her ear. That is who stands on the second floor. Do not ask how I know.',
        'Motion to leave now. Seconded. Anybody opposed may remain behind and draft a dissent.',
      ],
      appearance:
        'An adult man, tall and rangy, auburn hair pushed back, a creased white oxford shirt with the sleeves rolled, a law-faculty lanyard, a dry-wipe marker tucked behind one ear.',
      visualHook: 'A dry-wipe marker behind his ear and the emergency alert always lit on his phone.',
      silhouette: 'Arms folded in a doorway he is blocking, chin up.',
      artSeed: 'fwo-declan-01',
      portrait: null,
      expressions: ['stern', 'sharp', 'shaken', 'guilty', 'neutral'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'study_rooms', activity: 'behind the whiteboard in study room 3C, reading the alert again' },
        { startMinute: 420, endMinute: 480, locationId: 'lobby', activity: 'at the glass, counting how many stand between the library and the gate' },
        { startMinute: 480, endMinute: 1440, locationId: 'study_rooms', activity: 'back in 3C with the door taped' },
      ],
      homeLocationId: 'study_rooms',
      knowledgeScope: ['the_alert', 'priya', 'the_rules', 'the_car'],
      startingRelationship: { trust: 15, affection: 10, respect: 20, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'declan_says_priya',
          label: 'He tells you about eight o’clock',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['saw_priya'] },
        },
        {
          id: 'declan_backs_down',
          label: 'He lets you overrule him without a vote',
          kind: 'OTHER',
          requires: { respect: 50 },
        },
      ],
      attributes: { might: 13, agility: 11, mind: 14, presence: 13, resolve: 13, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 7, tags: ['civilian'] },
    },
    {
      id: 'haas',
      name: 'Professor Konrad Haas',
      calledName: 'Haas',
      role: 'Professor of pharmacology, locked in Special Collections with a grey binder he will not put down, and the man the helicopter is coming for',
      cardBlurb:
        'The helicopter is coming for him by name. He will answer any question you ask except whose fault this is.',
      pronouns: 'he/him',
      publicTraits: ['Courteous, precise and exhausted', 'Lectures when frightened', 'Will not let go of a grey binder'],
      hiddenDrives: [
        'ND-12 was his compound and his trial; he wants to undo it more than he wants to be forgiven, and he is not sure he has the courage for either',
        'He believes a stronger reset could bring back the ones already turned, and has never been allowed to test it',
      ],
      values: ['Data before feelings, until tonight', 'A teacher answers questions'],
      fears: ['The binder reaching the administration before it reaches anybody honest', 'Walking across the quad past forty faces he recruited'],
      socialStyle:
        'Treats everybody like a promising student in his office hours. Answers a question with a better question. Polishes his glasses and goes silent when cornered.',
      boundaries: [
        'Will not leave the binder behind, whatever it costs him',
        'Will not cross the quad on his own',
      ],
      goals: ['Reach the helicopter with the binder', 'Get the reset doses to somebody who will use them'],
      secrets: [
        {
          id: 'haas_nd12',
          fact: 'He designed ND-12 and ran the trial: forty paid student volunteers, finals week, two hundred dollars each. Three turned at about seventy hours awake on Sunday night. The administration has known since Monday morning.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if you have the binder open in front of him, or if you ask him why the helicopter is coming for a pharmacologist.',
        },
        {
          id: 'haas_the_reset',
          fact: 'Twelve reset doses sit in the padlocked refrigerator in his lab. Given before the turn completes, one forces sleep and stops it. He has not gone for them because he is afraid of the quad.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you the moment he learns somebody in the building is a volunteer, and hates himself for how long it took.',
        },
        {
          id: 'haas_the_stronger_dose',
          fact: 'He believes a double reset given to a fully turned Regular might bring them back to sleep and then to themselves. He has never tested it and does not know what it would cost the person.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after the reset has worked once in front of him.',
        },
      ],
      speechStyle:
        'Measured, academic, old-fashioned courtesy. Socratic questions. The passive voice for anything that was his fault.',
      topics: ['ND-12', 'the reset', 'procedural memory', 'the volunteers', 'the binder', 'the helicopter'],
      voiceSamples: [
        'Consider the question properly. Why would a creature with no memory reach for a handle? It would not. Therefore memory is returning. Quite.',
        'Mistakes were made in the dosing schedule. I am aware of how that sentence sounds.',
        'Procedural memory comes back first: thresholds, staircases, keys. Declarative memory last. Names. I should very much prefer we were gone before names.',
        'Twelve doses sit in a refrigerator four hundred metres from here. I designed them. I have not had the courage to fetch them. Draw your own conclusions about professors.',
        'Office hours are, as ever, by appointment. Come in. Lock that behind you, would you?',
      ],
      appearance:
        'An older man, thin and upright, silver hair combed straight back, round steel glasses, a tweed jacket over a grey cardigan, a grey ring binder held to his chest with both arms.',
      visualHook: 'A grey ring binder clutched to his chest like a shield.',
      silhouette: 'Upright behind a desk in a single pool of lamplight, binder held close.',
      artSeed: 'fwo-haas-01',
      portrait: null,
      expressions: ['neutral', 'weary', 'guilty', 'considering', 'afraid'],
      schedule: [
        { startMinute: 0, endMinute: 380, locationId: 'special_collections', activity: 'at the reading desk under the lamp, binder on his chest' },
        { startMinute: 380, endMinute: 400, locationId: 'library_roof', activity: 'waiting by the painted circle, collar up' },
        { startMinute: 400, endMinute: 1440, locationId: 'special_collections', activity: 'back behind the steel door, glasses off' },
      ],
      homeLocationId: 'special_collections',
      knowledgeScope: ['nd12', 'the_reset', 'procedural_memory', 'the_volunteers', 'the_administration', 'the_helicopter'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'haas_opens_the_binder',
          label: 'He opens the binder for you',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['knows:the_trial'] },
        },
        {
          id: 'haas_goes_back',
          label: 'He agrees to cross the quad for the doses',
          kind: 'ALLIANCE',
          requires: { respect: 55, flagsSet: ['knows:what_haas_did'] },
        },
      ],
      attributes: { might: 7, agility: 8, mind: 18, presence: 12, resolve: 10, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 3, tags: ['civilian'] },
    },
  ],
  quests: [
    {
      id: 'q_the_handle',
      title: 'The Handle',
      summary: 'Something on the other side of the reading-room door is trying the handle the way a person with a key would, and it has keys.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['nora', 'lily', 'declan', 'kwame'],
      involvedLocationIds: ['reading_room', 'the_stacks', 'study_rooms', 'stairwell'],
      knownRewardCopy: 'The next minute, and some idea of who else is alive in this building.',
      steps: [
        {
          id: 'the_next_minute',
          playerCopy: 'Get through the next minute.',
          directorNotes:
            'On the other side of the door is Odile Fenn, the night librarian, turned since Monday, doing her ten-past-two lock-up round with her own keys. She is not hunting. If the room is lit or loud she comes in toward the light; if it is dark and quiet she locks it from outside and moves on, and now the group is locked in. She says the library is closing. Every route is a real way to survive this, and only one of them hurts her.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'held_it',
              label: 'Hold the door shut',
              predicate: { flagsSet: ['used:hold_it'] },
              setsFlags: ['door_held'],
              closesFlags: ['door_open'],
            },
            {
              routeId: 'went_dark',
              label: 'Kill every light and keep still',
              predicate: { flagsSet: ['used:go_dark'] },
              setsFlags: ['stayed_dark', 'locked_in'],
              closesFlags: ['door_open'],
            },
            {
              routeId: 'looked_her_in_the_face',
              label: 'Open it and see who it is',
              predicate: { flagsSet: ['used:read_them'] },
              setsFlags: ['met_fenn', 'door_open'],
              closesFlags: ['stayed_dark'],
            },
            {
              routeId: 'drew_her_off',
              label: 'Send a lit screen down the corridor and let her follow it',
              predicate: { flagsSet: ['used:lure_them'] },
              setsFlags: ['fenn_led_away'],
              closesFlags: ['locked_in'],
            },
            {
              routeId: 'put_her_down',
              label: 'Fight your way past her',
              predicate: { flagsSet: ['used:force_it'] },
              setsFlags: ['hurt_fenn', 'door_open'],
              closesFlags: ['stayed_dark'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_minute_over'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'find_the_others',
          playerCopy: 'Find out who else is still alive in this building.',
          directorNotes:
            'Lily is in the stacks, Declan is barricaded in study room 3C, Kwame is in the security office on the ground floor, and Haas is behind the steel door of Special Collections on the fourth. Each one changes the shape of the night. Nobody has to be found, and a player who stays in the reading room with Nora until dawn is playing a real version of this story.',
          enterWhen: { flagsSet: ['first_minute_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_lily',
              label: 'Find Lily in the stacks',
              predicate: { flagsSet: ['spoke:lily'] },
              setsFlags: ['with_lily'],
              closesFlags: [],
            },
            {
              routeId: 'found_declan',
              label: 'Talk Declan out from behind his whiteboard',
              predicate: { flagsSet: ['spoke:declan'] },
              setsFlags: ['with_declan'],
              closesFlags: [],
            },
            {
              routeId: 'reached_kwame',
              label: 'Reach Kwame in the security office',
              predicate: { flagsSet: ['spoke:kwame'] },
              setsFlags: ['with_kwame', 'knows:the_tunnel'],
              closesFlags: [],
            },
            {
              routeId: 'found_haas',
              label: 'Get Professor Haas to open the steel door',
              predicate: { flagsSet: ['visited:special_collections'] },
              setsFlags: ['found_haas'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['night_begun'],
            abilities: [],
            reputation: [{ factionId: 'faction_group_chat', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_four_seats',
      title: 'Four Seats',
      summary: 'A helicopter lands on the library roof at half past six for Professor Haas and three others. There are six people in the building, and only Kwame knows the number.',
      kind: 'MAIN',
      involvedCharacterIds: ['kwame', 'haas', 'declan', 'nora', 'lily'],
      involvedLocationIds: ['security_office', 'library_roof', 'special_collections'],
      knownRewardCopy: 'A way off campus for some of you, and a decision about who.',
      discoverWhen: { flagsSet: ['night_begun'] },
      steps: [
        {
          id: 'what_the_radio_said',
          playerCopy: 'Find out what Kwame is not telling you.',
          directorNotes:
            'Three ways to learn it, not equivalent. Being told by Kwame means he trusts you with the arithmetic. Overhearing it means you know something he chose not to give you, and he will notice. Hearing it from Haas means the man the helicopter is for has already started deciding who goes with him.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kwame_told_you',
              label: 'Kwame tells you himself',
              predicate: {
                flagsSet: ['spoke:kwame'],
                minRelationship: [{ characterId: 'kwame', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_helicopter', 'kwame_told_you'],
              closesFlags: ['overheard_it'],
            },
            {
              routeId: 'overheard_it',
              label: 'Hear it on the radio in the security office',
              predicate: { flagsSet: ['visited:security_office', 'used:read_them'] },
              setsFlags: ['knows:the_helicopter', 'overheard_it'],
              closesFlags: ['kwame_told_you'],
            },
            {
              routeId: 'haas_said_it',
              label: 'Haas lets it slip',
              predicate: {
                flagsSet: ['spoke:haas'],
                minRelationship: [{ characterId: 'haas', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['knows:the_helicopter', 'haas_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['seats_on_the_table'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'who_goes',
          playerCopy: 'Decide who is on the roof at half past six.',
          directorNotes:
            'Kwame means to stay. Haas is going whatever happens, because the crew calls him by name. Declan wants a seat and will argue for it in moot-court form. Lily will not pass the crew’s fever check and knows it. Nora will offer hers and mean it. Every outcome is survivable and none of them is the good one on its own. The crew waits four minutes by the watch and does not negotiate.',
          enterWhen: { flagsSet: ['seats_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_flew',
              label: 'Take a seat',
              predicate: { atLocation: 'library_roof', flagsSet: ['helicopter_landed'] },
              setsFlags: ['flew_out'],
              closesFlags: ['gave_up_seat', 'all_or_nobody'],
            },
            {
              routeId: 'gave_it_away',
              label: 'Give your seat to somebody else',
              predicate: {
                flagsSet: ['helicopter_landed', 'used:talk_down'],
              },
              setsFlags: ['gave_up_seat'],
              closesFlags: ['flew_out'],
            },
            {
              routeId: 'all_or_nobody',
              label: 'Tell everybody the number, and walk out together instead',
              predicate: { flagsSet: ['used:say_it_straight', 'knows:the_helicopter'], flagsUnset: ['helicopter_landed'] },
              setsFlags: ['all_or_nobody'],
              closesFlags: ['flew_out'],
            },
            {
              routeId: 'haas_stays',
              label: 'Haas gives up his own seat',
              predicate: {
                flagsSet: ['knows:what_haas_did'],
                minRelationship: [{ characterId: 'haas', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['haas_stayed_behind'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['seats_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_cordon', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_volunteer_31',
      title: 'Volunteer 31',
      summary: 'Lily has not slept in sixty hours and keeps her left sleeve pulled down over a paper band. At about two in the afternoon she stops being Lily.',
      kind: 'MAIN',
      involvedCharacterIds: ['lily', 'nora', 'haas', 'declan'],
      involvedLocationIds: ['the_stacks', 'basement_stacks', 'steam_tunnel', 'science_building'],
      knownRewardCopy: 'Lily, asleep and still herself, if you get there in time and she says yes.',
      discoverWhen: { flagsSet: ['with_lily'] },
      steps: [
        {
          id: 'what_is_wrong_with_lily',
          playerCopy: 'Find out what Lily is hiding under her sleeve.',
          directorNotes:
            'Four ways to learn it and they are not equivalent. If she shows you, she trusts you. If you spot it, she knows you were watching. If Nora tells you, Lily was discussed in the third person, which she hates. If Declan works it out first, he calls for a vote about putting her outside, and the night gets ugly fast.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_showed_you',
              label: 'Lily shows you the band herself',
              predicate: {
                flagsSet: ['used:talk_down', 'spoke:lily'],
                minRelationship: [{ characterId: 'lily', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:volunteer_31', 'lily_told_you'],
              closesFlags: ['declan_knows'],
            },
            {
              routeId: 'saw_the_band',
              label: 'Catch sight of the band when her sleeve rides up',
              predicate: { flagsSet: ['used:read_them', 'with_lily'] },
              setsFlags: ['knows:volunteer_31', 'knows:the_trial', 'saw_the_band'],
              closesFlags: ['lily_told_you'],
            },
            {
              routeId: 'nora_called_it',
              label: 'Nora tells you what the tremor means',
              predicate: {
                flagsSet: ['spoke:nora', 'lily_symptoms'],
                minRelationship: [{ characterId: 'nora', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:volunteer_31', 'nora_called_it'],
              closesFlags: [],
            },
            {
              routeId: 'declan_called_it',
              label: 'Declan works it out and calls a vote',
              predicate: { flagsSet: ['spoke:declan', 'lily_symptoms'] },
              setsFlags: ['knows:volunteer_31', 'declan_knows'],
              closesFlags: ['lily_told_you'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['lily_on_the_clock'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'fetch_the_reset',
          playerCopy: 'Get the reset doses out of Haas’s lab across the quad.',
          directorNotes:
            'Twelve doses in a padlocked refrigerator, four hundred metres away. The tunnel is hot, dark and hums; the quad is open ground full of standing Regulars facing the library; Haas will go himself only once he has admitted what they are for. Whoever goes, the group left behind has to hold the building without them.',
          enterWhen: { flagsSet: ['lily_on_the_clock'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'through_the_tunnel',
              label: 'Go under the quad through the steam tunnel',
              predicate: { atLocation: 'science_building', flagsSet: ['visited:steam_tunnel'] },
              setsFlags: ['went_under'],
              closesFlags: [],
            },
            {
              routeId: 'across_the_quad',
              label: 'Cross the quad in the open',
              predicate: { atLocation: 'science_building', flagsSet: ['visited:the_quad'] },
              setsFlags: ['went_across'],
              closesFlags: [],
            },
            {
              routeId: 'haas_fetched_them',
              label: 'Make Haas fetch them himself',
              predicate: {
                flagsSet: ['knows:what_haas_did'],
                minRelationship: [{ characterId: 'haas', dimension: 'respect', value: 50 }],
              },
              setsFlags: ['haas_fetched_them'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [{ itemId: 'reset_doses', qty: 1 }],
            flags: ['has_the_reset'],
            abilities: ['give_the_reset'],
            reputation: [{ factionId: 'faction_group_chat', amount: 10 }],
          },
        },
        {
          id: 'put_her_to_sleep',
          playerCopy: 'Get the reset into Lily before hour seventy-two, if she says yes.',
          directorNotes:
            'She is terrified of sleep and believes it is what ends her. She will not be dosed without saying yes, and a player who does it anyway gets a living Lily who does not speak to them. She can refuse, and refusing is hers to do. If she says yes, the scene is small: a count of ten, her sketchbook on her chest, somebody holding her hand.',
          enterWhen: { flagsSet: ['has_the_reset'] },
          succeedWhen: null,
          failWhen: { afterWorldMinute: 14 * 60 },
          succeedWhenAny: [
            {
              routeId: 'you_did_it',
              label: 'She says yes, and you give it to her',
              predicate: {
                flagsSet: ['used:give_the_reset'],
                minRelationship: [{ characterId: 'lily', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['lily_slept', 'you_dosed_her'],
              closesFlags: ['lily_refused'],
            },
            {
              routeId: 'nora_did_it',
              label: 'Nora gives it, with you holding her hand',
              predicate: { flagsSet: ['used:give_the_reset', 'spoke:nora'] },
              setsFlags: ['lily_slept', 'nora_dosed_her'],
              closesFlags: ['lily_refused'],
            },
            {
              routeId: 'she_said_no',
              label: 'She says no, and you let it be her choice',
              predicate: { flagsSet: ['used:say_it_straight', 'spoke:lily'] },
              setsFlags: ['lily_refused'],
              closesFlags: ['lily_slept'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['lily_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_study_pill',
      title: 'The Study Pill',
      summary: 'Forty students were paid two hundred dollars each to stay awake through finals for a professor’s trial. Three of them were the first ones on the quad.',
      kind: 'LEAD',
      involvedCharacterIds: ['haas', 'nora', 'lily'],
      involvedLocationIds: ['special_collections', 'science_building', 'health_centre', 'main_gate'],
      knownRewardCopy: 'What Haas did, and the power to decide who else finds out.',
      discoverWhen: { flagsSet: ['knows:the_trial'] },
      steps: [
        {
          id: 'what_haas_did',
          playerCopy: 'Find out what is in the grey binder.',
          directorNotes:
            'This lead is optional and must feel like it. A player who never asks about the binder or the band never sees a beat of it, and getting people out of the library is the whole game. For a player who is here, Haas is ashamed rather than villainous: he answers precisely, uses the passive voice, and does not ask to be forgiven.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_binder',
              label: 'Take the binder and read it',
              predicate: { hasItems: ['trial_binder'] },
              setsFlags: ['has_the_records'],
              closesFlags: [],
            },
            {
              routeId: 'he_confessed',
              label: 'Ask Haas straight, and wait',
              predicate: { flagsSet: ['spoke:haas', 'used:say_it_straight'] },
              setsFlags: ['haas_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'nora_matched_it',
              label: 'Let Nora match the band to her Sunday patient',
              predicate: { flagsSet: ['spoke:nora', 'knows:volunteer_31'] },
              setsFlags: ['nora_matched_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:what_haas_did'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_happens_to_the_binder',
          playerCopy: 'Decide who sees the binder.',
          directorNotes:
            'The Cordon would use it to make more doses and would also use it to decide who to blame. The group chat would make it impossible to bury and would also make Haas the most hated man in the county by lunchtime. Burning it protects him and buries the forty volunteers with him. None of these is the right answer.',
          enterWhen: { flagsSet: ['knows:what_haas_did'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'to_the_cordon',
              label: 'Hand it to the Cordon at the gate',
              predicate: { hasItems: ['trial_binder'], flagsSet: ['visited:main_gate'] },
              setsFlags: ['records_to_cordon'],
              closesFlags: ['records_burned'],
            },
            {
              routeId: 'to_the_chat',
              label: 'Photograph every page and post it to the group chat',
              predicate: { hasItems: ['trial_binder'], flagsSet: ['used:say_it_straight'] },
              setsFlags: ['records_public'],
              closesFlags: ['records_burned'],
            },
            {
              routeId: 'burned_it',
              label: 'Burn it for him',
              predicate: {
                flagsSet: ['knows:what_haas_did'],
                minRelationship: [{ characterId: 'haas', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['records_burned'],
              closesFlags: ['records_public', 'records_to_cordon'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['trial_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_administration', amount: -20 }],
          },
        },
      ],
    },
    {
      id: 'q_the_routine',
      title: 'Doors, Then Stairs',
      summary: 'They walked into doors on Sunday. Tonight they turn handles. At nine o’clock every one of them booked for an exam will walk to the exam hall and sit down.',
      kind: 'SIDE',
      involvedCharacterIds: ['kwame', 'haas', 'nora'],
      involvedLocationIds: ['security_office', 'library_roof', 'the_quad', 'exam_hall', 'main_gate'],
      knownRewardCopy: 'Their pattern, and a way to walk through them.',
      discoverWhen: { flagsSet: ['first_minute_over'] },
      steps: [
        {
          id: 'learn_the_pattern',
          playerCopy: 'Work out what the Regulars are going to do next.',
          directorNotes:
            'The pattern is visible to anybody who watches long enough: on the cameras, from the roof, or in the exam timetable taped to the front desk. Haas can explain it as procedural memory if asked. Do not make it eerie for the sake of it. It is a routine, and the horror is that it is so ordinary.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'on_the_cameras',
              label: 'Watch them on the security cameras',
              predicate: { atLocation: 'security_office', flagsSet: ['used:read_them'] },
              setsFlags: ['saw_them_learn'],
              closesFlags: [],
            },
            {
              routeId: 'from_the_roof',
              label: 'Watch the quad from the roof',
              predicate: { atLocation: 'library_roof', flagsSet: ['used:read_them'] },
              setsFlags: ['saw_them_learn'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_timetable',
              label: 'Read the exam timetable with their routine in mind',
              predicate: { hasItems: ['exam_timetable'] },
              setsFlags: ['knows:the_exam'],
              closesFlags: [],
            },
            {
              routeId: 'haas_explained',
              label: 'Let Haas explain what they are relearning',
              predicate: { flagsSet: ['spoke:haas', 'knows:they_learn'] },
              setsFlags: ['haas_explained'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['knows:the_routine'],
            abilities: ['walk_with_them'],
            reputation: [],
          },
        },
        {
          id: 'use_it',
          playerCopy: 'Use their routine to get somebody across campus.',
          directorNotes:
            'At nine the quad empties and the exam hall fills. Walking among them in the line is the bravest thing anybody can do in this story and it works if they keep their screen dark and their pace exact. Locking the exam hall from outside contains several hundred sick people for three hours, which could be mercy or a cage depending on what happens next.',
          enterWhen: { flagsSet: ['knows:the_routine'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'walked_among_them',
              label: 'Walk in the line with them',
              predicate: { flagsSet: ['used:walk_with_them', 'exam_started'] },
              setsFlags: ['crossed_with_them'],
              closesFlags: [],
            },
            {
              routeId: 'crossed_the_empty_quad',
              label: 'Cross the empty quad to the gate while they sit',
              predicate: { atLocation: 'main_gate', flagsSet: ['exam_started'] },
              setsFlags: ['crossed_at_nine'],
              closesFlags: [],
            },
            {
              routeId: 'locked_the_hall',
              label: 'Lock the exam hall from outside',
              predicate: { atLocation: 'exam_hall', flagsSet: ['exam_started', 'used:hold_it'] },
              setsFlags: ['exam_hall_locked'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['routine_used'],
            abilities: [],
            reputation: [{ factionId: 'faction_group_chat', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_fenn_locks_up',
      atWorldMinute: 2 * 60 + 10,
      locationId: 'reading_room',
      publicCopy:
        'A key turns in the reading-room lock from outside, twice, the way it has at ten past two every night for thirty-one years. Soft footsteps move off toward the stacks, and a careful voice tells nobody that the library is closing.',
      directorNotes:
        'Odile Fenn finishing her round. Only if the room went dark and nobody opened the door: the group is now locked in, and needs Kwame’s keys, Lily’s way round through the stacks, or a window. She is not hunting anybody. She is closing up.',
      setsFlags: ['locked_in'],
      cancelledByFlags: ['door_open', 'fenn_led_away', 'door_held'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_radio',
      atWorldMinute: 2 * 60 + 40,
      locationId: 'security_office',
      publicCopy:
        'The radio on the security desk clicks: the county, confirming a roof landing at oh-six-thirty for Professor Haas plus three, four minutes on the ground, no exceptions.',
      directorNotes:
        'Lands in a scene only for a player in the security office or holding the spare handset. Kwame heard the first version at 1:40 and told nobody. If the player hears it, he does not deny it; he asks them to keep it off the group chat, and tells them he is not one of the four.',
      setsFlags: ['knows:the_helicopter'],
      cancelledByFlags: [],
      requiresFlags: ['visited:security_office'],
      movesCharacters: [],
    },
    {
      id: 'we_the_sketchbook',
      atWorldMinute: 3 * 60,
      locationId: null,
      publicCopy:
        'Lily opens her sketchbook on the nearest flat surface and turns it round so you can see: every floor of the library, and a fold-out page of tunnels under the quad.',
      directorNotes:
        'She does this the moment anybody says the quad is impossible, or simply because she cannot sit still. It is the first useful thing anybody has offered tonight and she knows it.',
      setsFlags: ['knows:the_tunnel'],
      cancelledByFlags: [],
      requiresFlags: ['with_lily'],
      movesCharacters: [],
    },
    {
      id: 'we_priya_at_the_lift',
      atWorldMinute: 3 * 60 + 20,
      locationId: 'stairwell',
      publicCopy:
        'Down on the second-floor landing a woman with a highlighter behind her ear stands facing the lift, waiting for it. When it does not come, she presses the button.',
      directorNotes:
        'Priya Nair, Declan’s study partner, turned at about two. She is not a threat unless she is lit up or called by name. She is the first Regular anybody sees use a button, and Declan, if he is there, stops talking for the first time tonight.',
      setsFlags: ['saw_priya'],
      cancelledByFlags: [],
      requiresFlags: ['with_declan'],
      movesCharacters: [],
    },
    {
      id: 'we_lily_shakes',
      atWorldMinute: 3 * 60 + 45,
      locationId: null,
      publicCopy:
        'Lily drops a can. Her hands will not stop shaking long enough to pick it up, and she laughs about it a beat too long.',
      directorNotes:
        'Sixty-one hours awake. Nora sees it and goes quiet. Declan sees it and stands up. This is where the secret starts costing her, whether or not anybody says anything.',
      setsFlags: ['lily_symptoms'],
      cancelledByFlags: [],
      requiresFlags: ['with_lily'],
      movesCharacters: [],
    },
    {
      id: 'we_the_binder',
      atWorldMinute: 4 * 60,
      locationId: 'special_collections',
      publicCopy:
        'Under Haas’s elbow on the reading desk, a grey binder: ND-12, Participant Records. Forty tabs. Three of them are red.',
      directorNotes:
        'Only for a player who has been into Special Collections. Haas puts his hand flat over the cover the moment he sees them see it. He will not lie about what it is if asked directly; he will only ask, very politely, that they not read it yet.',
      setsFlags: ['knows:the_trial'],
      cancelledByFlags: [],
      requiresFlags: ['visited:special_collections'],
      movesCharacters: [],
    },
    {
      id: 'we_fenn_says_his_name',
      atWorldMinute: 4 * 60 + 20,
      locationId: 'stairwell',
      publicCopy:
        'From the stairwell, in the night librarian’s careful voice, somebody says "Kwame", once, the way you call a colleague you cannot see.',
      directorNotes:
        'The first word any Regular has said that is not a routine. Kwame stops moving. Haas, if he hears of it, goes pale and says "names" to himself. Play it quiet. It is the most frightening thing in the story.',
      setsFlags: ['knows:they_learn'],
      cancelledByFlags: [],
      requiresFlags: ['with_kwame'],
      movesCharacters: [],
    },
    {
      id: 'we_they_climb',
      atWorldMinute: 4 * 60 + 50,
      locationId: 'stairwell',
      publicCopy:
        'The second-floor Regulars find the stairwell. One at a time, holding the rail properly, they start to climb.',
      directorNotes:
        'Escalation for everybody. They are not rushing; they are going up because up is where the light was. Any door the group has not secured will be tried within twenty minutes, and the reading room is the first landing.',
      setsFlags: ['they_climb'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_power_cut',
      atWorldMinute: 5 * 60 + 30,
      locationId: null,
      publicCopy:
        'Every light on campus goes out at once. The emergency strips come on, green and low, and across the quad every phone in every unmoving hand is suddenly the brightest thing for a mile.',
      directorNotes:
        'Darkness helps the group and hurts them at once: they can move unseen, and any screen they switch on is now a flare. Kwame’s cameras run on battery for forty minutes.',
      setsFlags: ['power_out'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_helicopter',
      atWorldMinute: 6 * 60 + 30,
      locationId: 'library_roof',
      publicCopy:
        'Rotor wash flattens the roof gravel. A helicopter in county colours settles on the painted circle, door open, a crew member holding up four fingers.',
      directorNotes:
        'It waits four minutes by the crew’s watch and leaves with four people or fewer. The crew takes Haas first, by name, and will not take anybody with a fever. Every Regular within earshot turns toward the roof.',
      setsFlags: ['helicopter_landed'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'haas', toLocationId: 'library_roof' }],
    },
    {
      id: 'we_gate_opens',
      atWorldMinute: 7 * 60,
      locationId: 'main_gate',
      publicCopy:
        'The floodlights at the main gate dim into daylight and the checkpoint opens: a screening tent, a thermal camera, two lines of tape, and a loudhailer reading out the rules.',
      directorNotes:
        'Open from seven until the noon seal. Anybody with a fever or a bite is held in the quarantine tent on campus, politely and without exception. Between the library and the gate is the whole quad.',
      setsFlags: ['gate_open'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_exam',
      atWorldMinute: 9 * 60,
      locationId: 'exam_hall',
      publicCopy:
        'At nine exactly, every Regular on campus who was booked for an exam turns toward the exam hall and walks there at an ordinary pace, in silence, and sits down at a desk.',
      directorNotes:
        'The quad empties for three hours. The hall fills. Its doors lock from outside. Nora’s surgery paper is in this sitting, and so is Priya’s contract law. This is the single best window in the story to cross campus, and the eeriest scene in it.',
      setsFlags: ['exam_started'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_seal',
      atWorldMinute: 12 * 60,
      locationId: 'main_gate',
      publicCopy: 'At noon the county closes the main gate, and the loudhailer says twenty-one days.',
      directorNotes:
        'Everybody still on campus is now in for three weeks: supplies by drone, the group chat, and the Regulars waking from their exam at noon with nowhere to be. Not death. A long siege with the lights off.',
      setsFlags: ['campus_sealed'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_lily_turns',
      atWorldMinute: 14 * 60,
      locationId: null,
      publicCopy: 'Lily stops making jokes.',
      directorNotes:
        'Seventy-two hours. If nobody gave her the reset, or she said no, she goes quiet in the middle of a sentence and does not come back to it. Then she picks up her sketchbook and starts drawing the same stairwell, over and over. Write it with total restraint.',
      setsFlags: ['lily_turned'],
      cancelledByFlags: ['lily_slept'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_way_out',
      kind: 'FINALE',
      label: 'Who is still in this library at noon',
      seedHint: 'A door handle that turns the way a person with a key would turn it.',
      payoffHint: 'A roof, a gate or an exam hall, and somebody finally says out loud who is going.',
      weight: 1,
    },
    {
      id: 'p_volunteer_31',
      kind: 'RELATIONSHIP',
      label: 'Lily’s left sleeve',
      seedHint: 'She tugs her sleeve down every time she reaches for anything.',
      payoffHint: 'A paper band that says VOL 31, and twelve doses in a refrigerator across the quad.',
      weight: 0.9,
    },
    {
      id: 'p_the_study_pill',
      kind: 'MYSTERY',
      label: 'Why three healthy volunteers walked into the health centre on Sunday',
      seedHint: 'A grey binder Professor Haas will not put down.',
      payoffHint: 'ND-12, forty volunteers, seventy hours, and a professor deciding whether he is the villain.',
      weight: 0.6,
    },
    {
      id: 'p_they_are_learning',
      kind: 'BOSS',
      label: 'They are getting better at being people',
      seedHint: 'On Sunday they walked into doors.',
      payoffHint: 'At nine they walk to their exams, and one of them says a name.',
      weight: 0.85,
    },
    {
      id: 'p_not_enough_seats',
      kind: 'THEME',
      label: 'There is not room for everybody',
      seedHint: 'Kwame’s radio, and the message he has not passed on.',
      payoffHint: 'Four seats, six people, and the person who does the arithmetic out loud.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_night_desk',
      name: 'You Work the Night Desk',
      role: 'Library assistant, three nights a week',
      summary: 'You shelve here for rent, so you know the staff lift, the basement and the woman who locks up at ten past two, and she knows you.',
      playstyle: ['Knows the building', 'Observant', 'Quiet'],
      blurb: 'Three nights a week since September you have pushed the returns cart round this building after midnight, and you can tell the stack door from the fire door with your eyes shut.',
      attributeBonus: { mind: 2, agility: 2 },
      skillProficiencies: { attention: 3, quiet: 2 },
      startingItems: [{ itemId: 'staff_lanyard', qty: 1 }],
      startingAbilities: ['read_them'],
      startingReputation: [],
    },
    {
      id: 'arch_engineering',
      name: 'You Study Engineering',
      role: 'Mechanical engineering, third year',
      summary: 'You think in hinges, loads and fasteners, which tonight means you know exactly how long a door will hold and how to make it hold longer.',
      playstyle: ['Practical', 'Physical', 'Fixes things'],
      blurb: 'You have spent three years being told that every structure fails somewhere and that the job is knowing where, and tonight that is the most useful sentence you know.',
      attributeBonus: { might: 2, mind: 2 },
      skillProficiencies: { brace: 3, attention: 1, nerve: 1 },
      startingItems: [{ itemId: 'multitool', qty: 1 }],
      startingAbilities: ['hold_it'],
      startingReputation: [],
    },
    {
      id: 'arch_rower',
      name: 'You Row for the University',
      role: 'Varsity rower, early mornings',
      summary: 'You are on the river at five most days, so you are fit, used to the cold, and you know what campus looks like before anybody else is awake.',
      playstyle: ['Fast', 'Tough', 'Runs toward it'],
      blurb: 'Your crew’s group chat went quiet on Monday at dawn, and you know which of them still run the river path every morning, because you can see it from the roof.',
      attributeBonus: { might: 2, agility: 2 },
      skillProficiencies: { legs: 3, scrap: 1, nerve: 1 },
      startingItems: [{ itemId: 'training_watch', qty: 1 }],
      startingAbilities: ['make_a_run'],
      startingReputation: [{ factionId: 'faction_group_chat', amount: 5 }],
    },
    {
      id: 'arch_debate',
      name: 'You Argue for Points',
      role: 'Debate society, philosophy major',
      summary: 'You have spent three years making rooms change their minds in seven minutes, which is about how long a frightened group gives anybody.',
      playstyle: ['Talks well', 'Reads people', 'Bluffs'],
      blurb: 'You have won arguments you knew you were wrong about, and tonight you are going to have to decide which side of one you are on before anybody else in the room does.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { steady: 3, bluff: 2 },
      startingItems: [{ itemId: 'your_phone', qty: 1 }],
      startingAbilities: ['talk_down'],
      startingReputation: [{ factionId: 'faction_group_chat', amount: 5 }],
    },
    {
      id: 'arch_nursing',
      name: 'You Study Nursing',
      role: 'Nursing, third year, ward placements',
      summary: 'You have done night shifts on a ward, so fevers, frightened people and bad hours are ordinary, and you can keep Nora honest.',
      playstyle: ['Calm', 'Caring', 'Clinical'],
      blurb: 'You have held a stranger’s hand at four in the morning while a monitor did something it should not, and you did not let go, and you did not let them see your face change.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { first_aid: 3, candour: 1, steady: 1 },
      startingItems: [{ itemId: 'penlight', qty: 1 }],
      startingAbilities: ['patch_up'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does Nora call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Adeyemi' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What are you at this university?',
      helpText:
        'Your course or your job here, which sets what you are good at when the handle turns. It is fixed for the whole story. It does not decide whether you hold the door, take a seat on the roof, or walk out on everybody. All of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is true about you, even at 2 a.m.?',
      helpText: 'One plain sentence the night can use. Most people write one, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once finished revising on time, and I am very calm in a fire drill, which people find annoying.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct when the handle turns?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite on turn one and the night will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'hide', label: 'Go dark and wait for it to pass' },
        { id: 'hold', label: 'Put my weight against the door' },
        { id: 'look', label: 'Find out who it is' },
        { id: 'lead', label: 'Take charge of whoever is in the room' },
        { id: 'leave', label: 'Work out how to get out alone' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Nora see across the table?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Three days of not shaving, a hoodie from a society I quit, and highlighter on my cheek.',
    },
  ],
  /**
   * Where this can end up. Eleven, because the storyteller reads twelve.
   *
   * Three of them are losses and are written as losses rather than
   * punishments: Lily turning, being sealed in, and walking out on everybody.
   * "Twenty-One Days" is reachable by doing nothing at all until noon, which is
   * the honest failure mode of a survival story. "On Your Own" is available
   * from about a third of the way in.
   *
   * Only three need the optional trial lead, and every other destination is
   * reachable by a player who never once asks what is in the binder.
   */
  endings: [
    {
      id: 'end_everyone_walks_out',
      name: 'Everyone Walks Out',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['all_or_nobody', 'lily_slept', 'routine_used'],
        flagsUnset: ['flew_out'],
      },
      condition:
        'The group refused the helicopter rather than choose, got the reset into Lily with her consent, and used the nine o’clock exam to cross the empty quad together, carrying her. This is the hardest ending in the story and it should feel earned rather than lucky. Write the walk: the silence, the full exam hall to one side, the gate getting closer, and somebody counting heads.',
      epilogue:
        'Six of them come through the screening tent at 9:40, one of them asleep on a foam stretcher with a sketchbook on her chest. The thermal camera reads her as normal. Lily wakes up eleven hours later in a hospital two towns away, asks what she missed, and is furious to learn it was the walk.',
      hint: 'Nobody takes the seats.',
    },
    {
      id: 'end_four_seats',
      name: 'Lift-Off',
      rarity: 'COMMON',
      minTurn: 22,
      requires: { flagsSet: ['flew_out'] },
      condition:
        'The player was on the roof at half past six and took a seat. Somebody was not on the helicopter, and the player knows exactly who. Do not punish the choice and do not excuse it. Write the lift-off: the roof getting smaller, the quad full of upturned faces, and the one window in the library with somebody still at it.',
      epilogue:
        'The debrief takes four hours and a form with forty questions. Question thirty-one asks whether anybody was left behind. The player writes a name in it and then sits looking at the pen for long enough that the officer comes back to check.',
      hint: '',
    },
    {
      id: 'end_the_fifth_person',
      name: 'The Fifth Person',
      rarity: 'UNCOMMON',
      minTurn: 22,
      requires: { flagsSet: ['gave_up_seat'] },
      condition:
        'The player gave their seat away and watched the helicopter lift off without them. Whoever took it is safe. The player is still on a roof with the morning coming up and a building full of Regulars underneath. Write it without heroics: it was a trade, made in four minutes, by somebody who was frightened.',
      epilogue:
        'The person who took the seat posts to the group chat from the hospital at noon: one line, the player’s name and a full stop. It gets more replies than anything posted that week. The player reads it on the library roof, on a phone with nine per cent battery, and turns the screen off.',
      hint: '',
    },
    {
      id: 'end_twenty_one_days',
      name: 'Twenty-One Days',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['campus_sealed'], flagsUnset: ['flew_out'] },
      condition:
        'Noon came and the player was still on campus. The gate is shut for three weeks. This is the ending a player reaches by hiding well and deciding nothing, and it must not read as a punishment: it is a siege, with supplies by drone, the group chat, and whoever stayed with them. Write the first afternoon of it, small and practical.',
      epilogue:
        'They live on the fourth floor for twenty-one days. Kwame does his round every night at ten past two. On the ninth day the drone brings a crate of reset doses with Haas’s handwriting on the label, and on the twelfth, for the first time, a Regular on the second floor sits down on the landing and falls asleep.',
      hint: '',
    },
    {
      id: 'end_volunteer_31',
      name: 'Two in the Afternoon',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['lily_turned'] },
      condition:
        'Nobody reached the doses in time, or Lily said no and was let say it. At about two in the afternoon she stopped in the middle of a sentence. This is a real loss and must be written with complete restraint: no gore, no horror beats, only the sketchbook and the stairwell she keeps drawing.',
      epilogue:
        'She is in the reading room every afternoon at two, at the window, drawing the same stairwell in the same ink. When the campus reopens the sketchbook is in the evidence of the inquiry into ND-12, as exhibit thirty-one. The last page of it, before the stairwells start, is a drawing of the player asleep at a table.',
      hint: 'There is a clock on her, and she is lying about it.',
    },
    {
      id: 'end_lights_out',
      name: 'Lights Out in the Exam Hall',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['exam_hall_locked', 'records_to_cordon', 'has_the_reset'] },
      condition:
        'The player locked several hundred Regulars into the exam hall at nine, carried the doses and the binder to the gate, and handed both to people who could make more. This is the only ending in which the sick ones start coming back, and it should be quiet rather than triumphant: a hall full of people falling asleep at their desks.',
      epilogue:
        'The Cordon makes two thousand doses in four days from Haas’s notes. They go into the exam hall at dawn on Saturday through the windows. By noon the hall is full of sleeping people with their heads on their desks, and by Sunday the first of them, a rower, wakes up and asks what time his exam is.',
      hint: 'They will all be in one room at nine.',
    },
    {
      id: 'end_the_study_pill',
      name: 'Every Page Posted',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['records_public'] },
      condition:
        'The player photographed the binder and posted every page to the group chat. The university cannot call it a fast-moving viral illness any more. Write the cost as well as the justice: Haas’s face on every phone on campus by lunchtime, and forty volunteers named whether they wanted to be or not.',
      epilogue:
        'The statement is withdrawn at four in the afternoon. By Friday there is an inquiry, and by the spring there is a law with a name nobody likes. Haas gives evidence for three days and answers every question, in the passive voice, until a lawyer for the inquiry asks him who decided, and he says, for the first time in his life, "I did."',
      hint: '',
    },
    {
      id: 'end_nobodys_fault',
      name: 'Nobody’s Fault',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['records_burned'] },
      condition:
        'The player burned the binder for Haas. The trial stays a fast-moving viral illness on paper forever. This is not a villain’s ending; the player protected a man who was genuinely sorry. But forty volunteers will never know what happened to them, and the prose should let that sit without comment.',
      epilogue:
        'Haas retires in March for health reasons. Every year, in finals week, an anonymous donation arrives at the health centre to fund a night nurse. The note with it is in a neat hand, unsigned, and says only: before hour six.',
      hint: '',
    },
    {
      id: 'end_same_table',
      name: 'Same Table, Next Term',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['seats_decided'],
        minRelationship: [
          { characterId: 'nora', dimension: 'trust', value: 60 },
          { characterId: 'nora', dimension: 'affection', value: 70 },
        ],
      },
      condition:
        'Whatever happened on the roof, the player and Nora came through the night together and something happened between them that was not only fear. One kiss, at the gate or on the roof at dawn, and an honest conversation about whether it counts if it happened in the worst week of their lives. Keep it tender and brief.',
      epilogue:
        'She sits her surgery paper in May, in a different hall, and passes. The reading room reopens in September. There is a long table on the third floor where two people sit opposite each other most nights, and neither of them ever turns the laptop brightness all the way up.',
      hint: '',
    },
    {
      id: 'end_office_hours',
      name: 'Office Hours',
      rarity: 'UNIQUE',
      minTurn: 32,
      requires: { flagsSet: ['haas_stayed_behind', 'campus_sealed'] },
      condition:
        'Haas gave up his own seat on the helicopter and stayed on campus through the seal to dose the newly bitten at the health centre. This is his ending as much as the player’s: write a sixty-one-year-old man crossing the quad on his own for the first time, binder left behind, doses in his pockets.',
      epilogue:
        'For twenty-one days the health centre has a sign on the door in a neat hand: Office hours, by appointment. Forty-four people are dosed before hour six. The forty-fifth is Haas himself, on day nineteen, and he is asleep, and himself, when the gate opens.',
      hint: 'The man the helicopter is for does not have to get on it.',
    },
    {
      id: 'end_on_your_own',
      name: 'On Your Own',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out on all of them and took their chances alone. Do not make this a tragedy and do not redeem it. It is a coherent response to a building full of strangers and a door that will not hold, and the people it costs most are the ones still in the library.',
      epilogue:
        'Nobody on the group chat knows which way the player went. Kwame logs it in the incident book at 03:12 with the time and a direction, the way he logs everything. Nora keeps their chair. On the third floor of the library, the laptop they left behind runs until its battery dies at 04:40, and the handle turns twice.',
      hint: '',
    },
  ],
  opening:
    "2:07 a.m., finals week. The library’s third floor is dark except for your laptop.\n\nAll night, the sick ones outside have walked into doors.\n\nAcross the reading room, the door handle turns. Slowly. All the way down.\n\nNora, the med student sharing your table, grabs your wrist.\n\n\"They don’t do that,\" she whispers. \"They don’t do that.\"\n\nThe handle rises, then goes down again, patient, the way you try a door you have a key for.\n\nKeys jingle on the other side.\n\nYour screen is the only light on the floor.\n\nNora’s nails dig in. \"Kill the screen, or hold that door. Which?\"",
  openingPanel: {
    assetKey: 'story_finals_week_outbreak/opening',
    alt: 'Nora crouched at a dark library table gripping your wrist, staring at a reading-room door whose handle is turned all the way down, one laptop the only light.',
  },
  openingSuggestions: [
    '"I’ve got the door. You get the screen."',
    'I snap the laptop shut and pull Nora down under the table.',
    'I cross the room and open the door before the key turns.',
  ],
  coverDirection: [
    'SUBJECT: Nora Lindqvist, a medical trainee trapped in a university library at night, alone and unmistakable in the foreground of a key visual for a survival horror anime.',
    'She fills the frame from the waist up, close and slightly off centre, holding about two thirds of the picture.',
    'An adult woman, tall, ash-blonde hair in a messy knot held with a pen, grey eyes, a navy hoodie over pale blue hospital scrubs, a stethoscope slung round her neck.',
    'Her back is pressed against a tall wooden door, one palm flat against it, the other hand raised with one finger to her lips, eyes wide and alert, looking straight at the viewer.',
    'In the frosted glass panel of the door beside her head, the soft dark silhouette of a hand resting on the handle from the other side. No faces behind the glass, no wounds, no blood.',
    'BEHIND HER, soft and secondary: a vast dark reading room with long oak tables and green lamps switched off, tall arched windows, and outside them a campus lawn lit by distant red and white floodlights.',
    'LIGHT: cold blue moonlight from the windows across her face, a single warm laptop glow from a table, a thin red rim of emergency light along her silhouette.',
    'MOOD: tense, quiet, cinematic. Fear from stillness, not gore.',
    'TITLE: the words FINALS WEEK OUTBREAK painted into the art in the upper third as a bold condensed horror logo, white with a red glow,',
    'spelled exactly FINALS WEEK OUTBREAK, large and legible at thumbnail size. No other text anywhere: no letters, no numbers, no signs, nothing written on the walls.',
  ].join(' '),
  publishedAt: null,
};

export const FINALS_WEEK_OUTBREAK = StoryVersion.parse(raw);
