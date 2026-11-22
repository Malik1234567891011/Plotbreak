import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Cult Master Wakes as a Servant" — a legend in a body that cannot lift
 * a full bucket.
 *
 * The playable span is four days on one mountain: dawn on the morning the
 * player wakes in a dead servant's body, through the arrival of the cult
 * delegation on the third evening, to the signing of the truce at noon on the
 * fourth day and the morning after it. Thirty years of war, the Gravekeeper's
 * reign and the banquet where the wine was poured are backstory carried in
 * hard canon, items and what six people will and will not say. The war
 * starting again, if it does, is an ending.
 *
 * The structural bet is the gap between memory and body. The player knows the
 * perfect move every time and the body can manage about a third of it, so
 * every fight is a puzzle in precision rather than a power fantasy on turn
 * one. The later forms are gated behind flags that only rebuilding the body
 * sets, and both of those abilities are granted by quest steps (grant broadly,
 * gate by flag) so the gate is the body, never a missing reward.
 *
 * The protagonist is BLANK on purpose. The name the player types is the
 * Gravekeeper's own, the one almost nobody alive has heard; everybody on the
 * mountain calls the body Dol. That keeps the setup screen asking a question
 * that belongs to the player (who were you, before the wine) instead of
 * asking them to invent a servant the story has already written.
 *
 * Three invisible variables. Breath is the only GOOD_HIGH, because
 * `resolveRest` refills those and a beaten body getting its wind back after a
 * night's sleep is the honest thing for rest to mean. Suspicion is first among
 * the descending pair because PUBLIC_VIOLENCE raises the first GOOD_LOW in
 * array order, and a servant fighting in public at a righteous sect should
 * make people look. Strain is what the master's technique does to channels
 * built for carrying firewood. Silver Pine is the first faction for the same
 * reason: a public fight on its mountain costs standing with Silver Pine.
 */

const raw = {
  id: 'sv_the_cult_master_wakes_as_a_servant_1',
  storyId: 'story_the_cult_master_wakes_as_a_servant',
  version: 1,
  title: 'The Cult Master Wakes as a Servant',
  fantasyLabel: 'You died a legend. You woke up a servant.',
  hook: 'You were the most feared martial master alive. You died of poisoned wine, woke up in the beaten body of a servant at the sect that hunted you for thirty years, and your killer arrives in three days to sign a truce.',
  premise:
    'You were the most feared martial master alive, and they called you the Gravekeeper. Nine days ago you died at your own banquet, of poisoned wine poured by your own right hand.\n\n' +
    'This morning you woke up in somebody else’s body. It belongs to Dol, a servant in the outer yard of the Silver Pine Sect, a righteous sword school which spent thirty years at war with your cult, the Nine Graves. Last night a senior disciple beat Dol to death in the woodshed. Nobody here knows it worked.\n\n' +
    'The body is thin, bruised and untrained, with almost no internal energy. Your memory of nine killing forms is perfectly intact, and the first of them needs no strength at all, only precision.\n\n' +
    'In three days your cult rides up this mountain to sign a truce, led by the woman who poured your wine. The signing is at noon on the fourth day. Dol was killed because of something Dol saw, and the reason is hidden somewhere in a dead servant’s things.\n\n' +
    'If anybody here learns who you are, they will kill this body before lunch. If you say nothing, you may have to serve your killer tea.\n\n' +
    'What you do with a second life is yours: revenge, the cult, the truth, or the quiet life of a servant who should be dead.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Martial arts', 'Revenge', 'Mystery', 'Rivalry', 'Drama'],
  mechanicsChips: [
    'A master in a servant’s body',
    'Nine forms, one weak body',
    'Your killer is coming to tea',
    'Hide it or be it',
    'Revenge is optional',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can take the cult back, or spend four days carrying water and never once say who you are. Both are the whole game. The servant whose body you woke in had a life, a debt and a reason for the beating, and the people who knew Dol will notice the difference long before anybody important does.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'servants_yard',
    startWorldMinute: 5 * 60 + 50,
    startingItems: [{ itemId: 'servant_tag', qty: 1 }],
    hardCanon: [
      'Everybody in this story is an adult. The body the player wakes in, Dol’s, is twenty. Seo-ah is twenty-two, Mok is twenty-five, Seol-hwa is thirty-four, Baek is fifty-five, Pyo is sixty-one and Gong is sixty-six. The Gravekeeper was fifty-two when the wine was poured. Silver Pine takes nobody under eighteen: every disciple, junior disciples included, and every servant on the mountain is an adult.',
      'The player was the Gravekeeper, master of the Nine Graves Cult and the most feared martial artist alive, until nine days ago, when they died of poisoned wine at the cult’s winter banquet. The name the player chose is the Gravekeeper’s own, which almost nobody alive has heard said aloud.',
      'This morning the player woke in the body of Dol, a twenty-year-old servant in the Silver Pine Sect’s outer yard, who died of a beating in the woodshed last night. Everybody on the mountain knows the body as Dol and calls it Dol. Nobody knows Dol died.',
      'The body has almost no internal energy and its channels are blocked. The Gravekeeper’s memory of the Nine Grave Forms is complete. The first three forms work on precision alone; the fourth needs the channels opened; the sixth needs real internal energy rebuilt; the seventh and eighth are out of reach in four days. The ninth is the form the Gravekeeper used while dying, and it cannot be used again.',
      'The Silver Pine Sect is a righteous sword school whose elders led the alliance against the Nine Graves for thirty years. Ten years ago the sect leader’s wife, Han So-yeon, died in a duel she demanded with the Gravekeeper. Her daughter Seo-ah swore at the funeral to kill the Gravekeeper.',
      'Yu Seol-hwa, the Gravekeeper’s right hand for fifteen years, poured the poisoned wine. She now leads the Nine Graves as Acting Master. Her delegation of nine riders camps at Grey Ford for two nights, arrives at Silver Pine on the evening of the third day, and the truce is signed in the Hall of Pines at noon on the fourth day.',
      'The poison is Two Sleeps, an old Nine Graves recipe in two halves that are harmless apart: one in the wine, one in pear-wood smoke. First Elder Gong Tae-seok of Silver Pine bought the recipe, sent both halves to the banquet through Senior Disciple Mok, who believed he was carrying a bribe, and plans to use the rest on the delegation at the signing and blame the cult’s own factions. This is discoverable and it is not owed to anybody.',
      'Dol saw Mok take a sealed box from the Medicine Pavilion, worked out it mattered, and tried to sell that silence for twenty silver. Mok beat Dol for it last night and ran when Dol stopped moving. Mok does not know the beating killed Dol.',
      'Old Cook Pyo was a kitchen hand in the Nine Graves’ valley thirty years ago and deserted. He recognises the cult’s breathing, four in and hold for nine, the moment he hears it. He has fed Dol for years and will be the first to notice.',
      'Nobody on the mountain believes a soul can change bodies. A servant claiming to be the Gravekeeper sounds like madness or a confession, and Silver Pine executes the Gravekeeper’s killers and accomplices. Telling anybody is a real risk, every time.',
      'Nobody here is a cartoon. Seol-hwa let the wine through to stop a war the Gravekeeper was about to start; Gong lost his only son to the cult; Mok is a frightened man from a poor family. Revenge, forgiveness and walking away are all coherent choices, and the story never decides between them for the player.',
    ],
    toneGuide:
      'Murim drama with a straight face and a sense of humour about its own premise: a legend who used to empty rooms with a look is being told to scrub pots, and knows exactly which nerve in the instructor’s wrist would end the conversation. ' +
      'Write the gap between memory and body precisely. The master always sees the perfect move and the body manages about a third of it; that gap is where the fights, the comedy and the tension live. ' +
      'Fights are short, clear and physical: distance, footing, breath, the one point that drops a grown disciple. No gore. A fight ends with somebody on the ground, winded, disarmed or very frightened. ' +
      'The outer yard is a real place with gossip, debts, chores and plain food made well, and servants are people. Romance is slow and tense, up to a kiss at most, and never fan service. ' +
      'Everyone has a reason, and at least two people the player might want to punish are partly right. The face at the top of a beat is Mok’s or Seo-ah’s whenever one of them is in the scene and the moment involves them.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Mok’s boot lifts. Comes down again, lighter. Almost polite.\n\n\"That’s two,\" he says. \"You were never this slow to bow.\"\n\nYou look at the straw. At his ankle. At the place two fingers above the bone where a whole leg hangs on one thin cord of nerve.\n\nYou could put him on the ground from here. He would not understand what happened until he tried to stand.\n\nYou bow instead. Lower than he asked.\n\nMok laughs. Behind him, the woman in white has gone very still, and she is not watching Mok. She is watching your hands.",
      "Old Pyo bangs the bowl down hard enough to slop it.\n\n\"Eat.\"\n\nYou eat. He watches you do it, ladle in one fist.\n\n\"Four in,\" he says. \"Hold for nine. Four out. You’ve been breathing like that since you came through my door.\"\n\nThe ladle has stopped moving.\n\n\"Dol breathed like a dog in summer.\" His voice drops. \"So where is Dol?\"\n\nHe already knows. He wants to see whether you’ll lie to him over his own rice.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 7, agility: 11, mind: 15, presence: 12, resolve: 16, arcana: 10 },
  skills: [
    { id: 'grave_forms', name: 'Grave Forms', attribute: 'agility', description: 'The Nine Grave Forms, as far as this body can carry them. Precision first; the later forms need power the body does not have yet.' },
    { id: 'inner_breath', name: 'Inner Breath', attribute: 'resolve', description: 'Moving internal energy through channels that were never opened. Slow, painful, and the only road back.' },
    { id: 'poisons', name: 'Poisons', attribute: 'mind', description: 'What is in a cup, a lamp or a wound, by smell, colour and how long it takes.' },
    { id: 'eye', name: 'Eye for Weakness', attribute: 'mind', description: 'Reading a stance, a lie, a bad knee or a nervous hand from across a yard.' },
    { id: 'servility', name: 'Servant’s Manners', attribute: 'presence', description: 'Bowing at the right depth, vanishing behind a tea tray, and being underestimated on purpose.' },
    { id: 'command', name: 'Command', attribute: 'presence', description: 'The voice that used to empty rooms. In a servant’s mouth it is either ridiculous or terrifying.' },
    { id: 'labour', name: 'Hard Labour', attribute: 'might', description: 'Water, wood and stairs. The only training this body has ever had, and the only kind it can take yet.' },
  ],
  /**
   * Three, all invisible.
   *
   * Breath is GOOD_HIGH because rest should give a beaten body its wind back,
   * and because the generic cost path spends it, which is right: the price of
   * a bad exchange in this world is that the body has less left. Suspicion is
   * first of the descending pair on purpose (PUBLIC_VIOLENCE). Strain comes
   * down on its own, slowly, which is what lets a player who forced a form on
   * day one use another on day three.
   */
  resources: [
    {
      id: 'breath',
      name: 'Breath',
      max: 100,
      start: 45,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The body simply stops. The player can still talk, badly, and nothing else: any attempt at a form ends with the servant face down in the dirt and somebody laughing.',
      color: '#8FA98C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The body is finished for now. Hands shake on a teacup, the well stairs are a climb, and every form the master reaches for comes out as a servant flailing. This is where a sensible person eats, sleeps, and lets the arrogance wait until morning.',
        },
        {
          upTo: 60,
          behaviour:
            'Ordinary servant tiredness. Enough for chores and one hard conversation, or one short fight that ends fast, but not both. The master notices every wasted movement and cannot afford any of them.',
        },
        {
          upTo: 100,
          behaviour:
            'As much as this body has ever had. The early forms come out clean, the lungs hold under pressure, and there is room to be clever rather than desperate. Scenes can run long and physical.',
        },
      ],
    },
    {
      id: 'suspicion',
      name: 'Suspicion',
      max: 100,
      start: 8,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Dol is furniture. Nobody on the mountain spares the servant a second look, which means everybody says everything in front of them.',
      color: '#B85C4A',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody looks twice. Dol is a sly, cheerful outer-yard servant with a debt and a split lip, and the whole mountain is thinking about the truce. The yard gossips about the beating, not about the servant.',
        },
        {
          upTo: 50,
          behaviour:
            'People have noticed something. The yard talks about how Dol walks now, a disciple mentions that the servant looked at him the way an instructor would, and somebody in authority asks one question too many and remembers the answer.',
        },
        {
          upTo: 80,
          behaviour:
            'The sect is watching. Mok has told the First Elder, the steward moves Dol to chores within sight of the training court, and a quiet search of the servant’s box happens while the servant is somewhere else.',
        },
        {
          upTo: 100,
          behaviour:
            'Somebody is about to say the word aloud. Gate disciples follow the servant, the First Elder asks to examine the body, and the next public use of a killing form will be taken as proof of exactly who is inside it.',
        },
      ],
    },
    {
      id: 'strain',
      name: 'Strain',
      max: 100,
      start: 30,
      regenPerHour: -0.8,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The body is whole. Bruises gone, channels quiet, and for the first time it moves as if it belongs to the person inside it.',
      color: '#6E5A8A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The channels are holding. Bruises fade on schedule, the forms land without cost beyond sweat, and the body is beginning to feel like the master’s own rather than a borrowed coat.',
        },
        {
          upTo: 60,
          behaviour:
            'Every form costs something afterwards. A wrist that aches through the night, a cough with a taste of iron, hands that will not close properly on a bucket handle until noon. Nothing anybody would notice unless they were looking.',
        },
        {
          upTo: 85,
          behaviour:
            'The body is tearing. The master’s technique is running through channels built for carrying firewood, and it shows: a limp, a fever, a nosebleed in front of the wrong person. Another hard form today could cripple it.',
        },
        {
          upTo: 100,
          behaviour:
            'The body is close to giving out. One more of the later forms and the servant collapses in public, and whoever examines the body will find channels torn in a pattern only the Nine Graves’ art leaves behind.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'servant_tag',
      name: 'Dol’s Wooden Tag',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A pine tag on a cord, burned with one word, Dol, and the outer-yard mark. Every servant wears one, and the gate disciples check it on the way down the mountain.',
      loreText: 'The back is scratched with tally marks, thirty-one of them, one for every silver Dol saved.',
      icon: 'tag',
    },
    {
      id: 'dol_ledger',
      name: 'Dol’s Savings Book',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description: 'A thin book of folded paper recording every coin Dol ever earned, won or squeezed out of somebody. The total at the bottom is thirty-one silver. Above it Dol has written forty, and underlined it twice.',
      loreText: 'Forty silver buys an outer-yard servant’s contract back from the sect. The last entry, two days ago, reads: "M. 20, if he pays."',
      icon: 'book',
    },
    {
      id: 'wax_wrapper',
      name: 'The Wax Wrapper',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { poisons: 2 },
      description: 'A square of waxed paper folded small and hidden under the loose board beneath Dol’s mat. One corner carries the Medicine Pavilion’s seal, and it smells, faintly, of pears.',
      loreText: 'Dol pulled it out of the ash pit behind the Medicine Pavilion the night Mok came back from the border market. Dol knew it meant something and did not know what.',
      icon: 'papers',
    },
    {
      id: 'water_yoke',
      name: 'The Water Yoke',
      tags: ['tool'],
      description: 'A shoulder yoke and two buckets. Dol carried two hundred buckets a day up the well stairs, which is why the shoulders are the only part of this body with any strength in them.',
      loreText: 'The left bucket leaks. Everybody in the outer yard knows to carry it on the right.',
      icon: 'tools',
    },
    {
      id: 'ginger_broth',
      name: 'Pyo’s Ginger Broth',
      tags: ['food'],
      stackable: true,
      maxStack: 5,
      consumable: { resourceId: 'breath', amount: 15, consumesItem: true },
      description: 'A clay cup of broth hot enough to hurt: ginger, bone and far too much pepper. It puts something back into a body that has nothing.',
      loreText: 'Pyo makes it for anybody who comes back from the training court bleeding, and pretends it is leftovers.',
      icon: 'bowl',
    },
    {
      id: 'kitchen_cleaver',
      name: 'Pyo’s Cleaver',
      tags: ['weapon', 'tool'],
      description: 'A heavy square kitchen cleaver, razor-sharp and older than most of the disciples. Pyo holds it the way other old men hold a fan.',
      loreText: 'The handle has been replaced four times. The blade never has.',
      icon: 'knife',
    },
    {
      id: 'practice_sword',
      name: 'A Practice Sword',
      tags: ['weapon'],
      description: 'A wooden sword from the rack at the training court, split along the grain and bound with cord. Servants are not supposed to touch them.',
      loreText: 'The Gravekeeper never carried a sword. The forms work with one, the way a letter still reads in somebody else’s handwriting.',
      icon: 'sword',
    },
    {
      id: 'dispensary_book',
      name: 'The Dispensary Book',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description: 'The First Elder’s record of every measure that leaves the Medicine Pavilion, in a neat physician’s hand. Twelve days ago: "Pear wood, two measures. White root, one. Sealed. Carried by M."',
      loreText: 'A second entry is dated for the fourth day: "Pear wood, four measures, for the altar."',
      icon: 'book',
    },
    {
      id: 'pear_incense',
      name: 'The Pear-Wood Incense',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A bundle of pale incense sticks wrapped in red paper and labelled for the altar of the Hall of Pines. Lit, it smells of pears in autumn. With the right wine, it is the second half of a poison.',
      loreText: 'Nobody on this mountain burns pear wood at all. Anybody from the Nine Graves’ kitchens would know why.',
      icon: 'incense',
    },
    {
      id: 'indenture_contract',
      name: 'Dol’s Indenture',
      tags: ['document'],
      description: 'A contract on stamped sect paper binding one servant named Dol to the Silver Pine Sect until a debt of forty silver is paid. It lives in the steward’s drawer beside the Hall of Pines.',
      loreText: 'The debt was Dol’s father’s. The signature at the bottom is not Dol’s.',
      icon: 'letter',
    },
    {
      id: 'marrow_pill',
      name: 'The Marrow Pill',
      tags: ['quest', 'medicine'],
      questItem: true,
      description: 'A black wax pill in a sealed jade jar, one of three the Gravekeeper made in a bad year. It forces blocked channels open in a single night, at the cost of a fever that feels like being burned from the inside.',
      loreText: 'The other two were used. Nobody alive knows on whom except the person who buried this one.',
      icon: 'vial',
    },
    {
      id: 'seol_hwa_letter',
      name: 'A Letter Under the Stone',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A folded letter lying on top of the cache in a small, upright hand, dated six days after the Gravekeeper’s funeral.',
      loreText: 'It begins: "If you are reading this, then I was wrong about what death is, and I will have to apologise to you in person."',
      icon: 'letter',
    },
    {
      id: 'iron_fan',
      name: 'The Black Iron Fan',
      tags: ['weapon', 'quest'],
      questItem: true,
      skillModifiers: { grave_forms: 2 },
      description: 'A folding fan with black iron ribs, the Gravekeeper’s own weapon for twenty years. Half the martial world would know it on sight, and every one of them would reach for a sword.',
      loreText: 'One rib is newer than the others. It was replaced after the duel with Han So-yeon, and the Gravekeeper never said why.',
      icon: 'fan',
    },
  ],
  abilities: [
    {
      id: 'bow_your_head',
      name: 'Bow Your Head',
      tags: ['social'],
      description: 'Play the servant: kneel at the right depth, apologise for something you did not do, and tell a small lie well.',
      affordances: ['kneel', 'bow', 'apologise', 'apologize', 'say sorry', 'play dumb', 'act like a servant', 'grovel', 'say i fell', 'lie to him', 'keep my head down'],
      costs: [{ resourceId: 'breath', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'servility', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'be_furniture',
      name: 'Be Furniture',
      tags: ['sight'],
      description: 'Stand in a corner with a tray and listen. People say things in front of a servant they would not say to a wall.',
      affordances: ['listen', 'eavesdrop', 'serve the tea', 'stand in the corner', 'overhear', 'wait on them', 'pour the tea', 'listen at the door'],
      costs: [{ resourceId: 'breath', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'servility', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_stance',
      name: 'Read the Stance',
      tags: ['sight'],
      description: 'Look at how somebody stands and know how they fight, where they are hurt, and whether they are lying.',
      affordances: ['read him', 'read her', 'watch', 'study', 'size them up', 'look for the weakness', 'observe', 'look around', 'watch her hands', 'how does he stand'],
      costs: [{ resourceId: 'breath', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'eye', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'name_the_poison',
      name: 'Name the Poison',
      tags: ['sight'],
      description: 'Smell, taste or look at something and say exactly what is in it, how much, and how long it takes.',
      affordances: ['smell it', 'taste it', 'what poison', 'check the wine', 'sniff', 'identify the poison', 'examine the wrapper', 'smell the incense'],
      costs: [{ resourceId: 'breath', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'poisons', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'masters_voice',
      name: 'The Old Voice',
      tags: ['social'],
      description: 'Speak the way the Gravekeeper spoke. It still works on people; it also tells them something is very wrong with this servant.',
      affordances: ['order him', 'command', 'threaten', 'speak like the master', 'look him in the eye', 'tell him to get off', 'intimidate', 'frighten', 'stare him down', 'stand up'],
      costs: [
        { resourceId: 'breath', amount: 6 },
        { resourceId: 'suspicion', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'command', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_who_you_are',
      name: 'Say Who You Are',
      tags: ['social'],
      description: 'Tell one person the truth: who died nine days ago, and who is standing in front of them now. Whether they believe it is up to them.',
      affordances: ['tell the truth', 'tell her who i am', 'tell him who i am', 'say my real name', 'confess who i am', 'reveal myself', 'i am the gravekeeper'],
      costs: [
        { resourceId: 'breath', amount: 5 },
        { resourceId: 'suspicion', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'do_the_work',
      name: 'Carry the Water',
      tags: ['utility'],
      description: 'Do a servant’s work properly: water, wood, floors. It keeps the cover and it is the only training this body can take yet.',
      affordances: ['carry water', 'chop wood', 'do the chores', 'scrub', 'sweep', 'haul', 'fetch water', 'train my body', 'work'],
      costs: [{ resourceId: 'breath', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'labour', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'steady_the_breath',
      name: 'Steady the Breath',
      tags: ['survival'],
      description: 'Four in, hold for nine, four out, and push what little energy there is through channels that have never been opened.',
      affordances: ['breathe', 'meditate', 'circulate', 'cultivate', 'sit and breathe', 'gather energy', 'open the channels', 'four in hold for nine'],
      costs: [
        { resourceId: 'breath', amount: 8 },
        { resourceId: 'strain', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'inner_breath', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lowered_lid',
      name: 'The Lowered Lid',
      tags: ['offensive'],
      description: 'The first Grave Form: two fingers on the right nerve, and a grown fighter goes down without a mark. It needs precision, not strength.',
      affordances: ['first form', 'lowered lid', 'drop him', 'pressure point', 'put him down', 'nerve strike', 'take his ankle', 'lock his arm', 'throw him'],
      costs: [
        { resourceId: 'breath', amount: 8 },
        { resourceId: 'strain', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'grave_forms', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'mourners_step',
      name: 'The Mourner’s Step',
      tags: ['defensive'],
      description: 'The second Grave Form: a half-step that is never where the blow lands. It looks like stumbling, which is the point.',
      affordances: ['dodge', 'slip it', 'step aside', 'evade', 'roll away', 'get out from under', 'second form', 'duck'],
      costs: [
        { resourceId: 'breath', amount: 6 },
        { resourceId: 'strain', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'grave_forms', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'shroud',
      name: 'The Shroud',
      tags: ['movement'],
      description: 'The third Grave Form: fold your presence small, so that even trained fighters look straight through you.',
      affordances: ['sneak', 'hide', 'follow him unseen', 'slip past', 'third form', 'go quietly', 'creep', 'tail him', 'follow her'],
      costs: [
        { resourceId: 'breath', amount: 6 },
        { resourceId: 'strain', amount: 2 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'grave_forms', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'iron_wreath',
      name: 'The Iron Wreath',
      tags: ['defensive'],
      description: 'The fourth Grave Form: energy wrapped round the hands so that a blade turns on bare skin. Nobody at Silver Pine has seen it in ten years.',
      affordances: ['fourth form', 'iron wreath', 'catch the blade', 'turn the sword', 'block with my hands', 'parry barehanded', 'catch his sword'],
      costs: [
        { resourceId: 'breath', amount: 12 },
        { resourceId: 'strain', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'grave_forms', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['body_opened'],
        lockedCopy: 'Your hands remember exactly how. Your wrists have no open channels to carry it yet, and a blade would go straight through them.',
      },
    },
    {
      id: 'grave_bell',
      name: 'The Grave Bell',
      tags: ['offensive'],
      description: 'The sixth Grave Form: let killing intent out all at once, and every fighter in the room freezes. Anybody who has met the Gravekeeper will know it.',
      affordances: ['sixth form', 'grave bell', 'killing intent', 'let it out', 'release my aura', 'make them freeze', 'ring the bell'],
      costs: [
        { resourceId: 'breath', amount: 25 },
        { resourceId: 'suspicion', amount: 40 },
        { resourceId: 'strain', amount: 20 },
      ],
      cooldownMinutes: 1440,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'inner_breath', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['breath_rebuilt'],
        lockedCopy: 'There is nothing in this body to ring yet. You reach for it and find a servant’s lungs and a servant’s heartbeat, and nothing underneath.',
      },
    },
  ],
  locations: [
    {
      id: 'servants_yard',
      name: 'The Outer Yard',
      shortName: 'The Yard',
      description:
        'A packed-earth yard behind the Silver Pine kitchens: a stone well, a woodshed with wet straw on its floor, washing lines, and sixty servants who start work before dawn. Through a gap in the wall you can see the training court, and through the kitchen window you can hear everything said inside.',
      artDirection:
        'Mountain martial-sect servants’ yard at dawn, packed earth, a stone well, an open woodshed with straw, laundry lines, pine trees and curved tiled roofs above, low mist. Muted greys and greens, cold early light.',
      connections: [
        { to: 'servants_quarters', travelMinutes: 1, label: 'Into the Long Room' },
        { to: 'outer_kitchen', travelMinutes: 1, label: 'Through the kitchen door' },
        { to: 'training_court', travelMinutes: 3, label: 'Through the gap in the wall' },
        { to: 'mountain_gate', travelMinutes: 8, label: 'The servants’ stairs down to the gate' },
        { to: 'cold_pool', travelMinutes: 15, label: 'The woodcutters’ path up the back mountain' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'water_yoke', qty: 1, ownerId: null, aka: ['yoke', 'the buckets', 'buckets', 'the water yoke'] },
      ],
    },
    {
      id: 'servants_quarters',
      name: 'The Long Room',
      shortName: 'Quarters',
      description:
        'Twelve sleeping mats on a raised wooden floor, twelve boxes and one window that does not shut. Dol’s mat is the one by the draught. Under it is a loose board, and under the board is everything Dol owned that Dol did not want stolen.',
      artDirection:
        'Long narrow servants’ dormitory in a mountain sect, raised wooden floor, thin sleeping mats in a row, small wooden boxes, a single paper window with grey light, a loose floorboard. Bare, worn, cramped.',
      connections: [{ to: 'servants_yard', travelMinutes: 1, label: 'Back out to the yard' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'dol_ledger', qty: 1, ownerId: null, aka: ['ledger', 'savings book', 'the little book', 'his book'] },
        { itemId: 'wax_wrapper', qty: 1, ownerId: null, aka: ['wrapper', 'the wax paper', 'the paper scrap', 'what is under the board'] },
      ],
    },
    {
      id: 'outer_kitchen',
      name: 'The Outer Kitchen',
      shortName: 'Kitchen',
      description:
        'Three stoves, a rice pot big enough to sit in, and Old Cook Pyo, who has run this kitchen for twenty years and feeds the whole outer yard twice a day. The serving corridor runs from here up to the Hall of Pines, and servants carry everything along it.',
      artDirection:
        'Large smoky martial-sect kitchen, three clay stoves with fire, an enormous rice pot, hanging dried herbs and garlic, steam, chopping block, wooden shelves of bowls. Warm orange firelight against blue morning.',
      connections: [
        { to: 'servants_yard', travelMinutes: 1, label: 'Out to the yard' },
        { to: 'hall_of_pines', travelMinutes: 5, label: 'Up the serving corridor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'ginger_broth', qty: 3, ownerId: null, aka: ['broth', 'ginger broth', 'the soup', 'a cup of broth'] },
        { itemId: 'kitchen_cleaver', qty: 1, ownerId: 'pyo', aka: ['cleaver', 'kitchen knife', 'pyo’s knife', 'the big knife'] },
      ],
    },
    {
      id: 'training_court',
      name: 'The Training Court',
      shortName: 'Court',
      description:
        'A wide flagstone court ringed by old pines, where four hundred disciples run the morning forms in rows while servants stand at the edges holding target posts and towels. Everybody who matters on the mountain crosses it twice a day.',
      artDirection:
        'Huge stone training courtyard of a mountain sword sect, rows of disciples in pale blue robes practising sword forms, ancient pines around the edge, weapon racks, servants holding padded posts. Bright, open, disciplined.',
      connections: [
        { to: 'servants_yard', travelMinutes: 3, label: 'Back through the gap in the wall' },
        { to: 'hall_of_pines', travelMinutes: 3, label: 'Up the steps to the Hall' },
        { to: 'mountain_gate', travelMinutes: 5, label: 'Down to the gate' },
        { to: 'cold_pool', travelMinutes: 15, label: 'The disciples’ path to the waterfall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'practice_sword', qty: 1, ownerId: null, aka: ['wooden sword', 'practice sword', 'a sword from the rack', 'training sword'] },
      ],
    },
    {
      id: 'hall_of_pines',
      name: 'The Hall of Pines',
      shortName: 'The Hall',
      description:
        'The sect’s great hall: cedar beams, an altar at the far end, and a floor polished by a century of kneeling. The sect leader’s family rooms are behind it and the steward’s office beside it, and on the fourth day at noon the truce will be signed at its altar.',
      artDirection:
        'Grand wooden hall of a mountain sword sect, dark cedar pillars, polished floor, a long altar with incense burners, hanging silver-pine banners, light through lattice windows. Solemn, formal, heavy.',
      connections: [
        { to: 'training_court', travelMinutes: 3, label: 'Down to the training court' },
        { to: 'outer_kitchen', travelMinutes: 5, label: 'Down the serving corridor' },
        { to: 'elders_pavilion', travelMinutes: 4, label: 'The covered walk to the Medicine Pavilion' },
        { to: 'guest_pavilion', travelMinutes: 4, label: 'Across the stone bridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'indenture_contract', qty: 1, ownerId: 'baek', aka: ['contract', 'indenture', 'dol’s contract', 'the servant’s contract'] },
      ],
    },
    {
      id: 'elders_pavilion',
      name: 'The Medicine Pavilion',
      shortName: 'Medicine Pavilion',
      description:
        'The First Elder’s pavilion: drying racks of herbs, a wall of small labelled drawers, a brazier that is always warm, and on the desk a dispensary book in which every measure that leaves the room is written down in a neat hand. Servants come here to be patched up for free.',
      artDirection:
        'Quiet herbalist’s pavilion in a mountain sect, walls of tiny wooden medicine drawers, bundles of drying herbs, a warm brazier, an open ledger on a low desk, brass scales. Calm, clean, faintly sinister.',
      connections: [{ to: 'hall_of_pines', travelMinutes: 4, label: 'Back along the covered walk' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'dispensary_book', qty: 1, ownerId: 'gong', aka: ['dispensary book', 'the record book', 'his records', 'the book on the desk'] },
        { itemId: 'pear_incense', qty: 1, ownerId: 'gong', aka: ['incense', 'the pear wood', 'the incense sticks', 'the red parcel'] },
      ],
    },
    {
      id: 'guest_pavilion',
      name: 'The Guest Pavilion',
      shortName: 'Guest Pavilion',
      description:
        'A quiet pavilion across a stone bridge from the Hall of Pines, swept and aired for the cult delegation. Servants carry tea across that bridge all evening, and nobody looks twice at a servant carrying tea.',
      artDirection:
        'Elegant guest pavilion beyond a small arched stone bridge, lanterns on the eaves, sliding doors, a low table set for tea, pines and evening mist. Tense, polite, beautiful.',
      connections: [{ to: 'hall_of_pines', travelMinutes: 4, label: 'Back across the bridge' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
    },
    {
      id: 'cold_pool',
      name: 'The Cold Pool',
      shortName: 'Cold Pool',
      description:
        'A waterfall on the back mountain, a deep black pool beneath it, and a flat rock where disciples sit in the spray to train their breathing. At night it belongs to Seo-ah, who practises her mother’s sword form here alone and fails at the same turn every time.',
      artDirection:
        'Mountain waterfall at night falling into a dark pool, a flat rock in the spray, mossy stones, pines, a single paper lantern on a branch, moonlight on wet stone. Lonely, cold, beautiful.',
      connections: [
        { to: 'training_court', travelMinutes: 15, label: 'Down the disciples’ path' },
        { to: 'servants_yard', travelMinutes: 15, label: 'Down the woodcutters’ path' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'mountain_gate',
      name: 'The Mountain Gate',
      shortName: 'The Gate',
      description:
        'A painted gate at the top of six hundred stone steps down to the road, and two bored gate disciples who check the tag of every servant going down to the village. The cult delegation will come up these steps on the third evening.',
      artDirection:
        'Red-painted mountain sect gate at the top of an endless stone stairway, guardian disciples with spears, mist in the valley below, pines clinging to cliffs. Imposing, windy, high.',
      connections: [
        { to: 'training_court', travelMinutes: 5, label: 'Up to the training court' },
        { to: 'servants_yard', travelMinutes: 8, label: 'The servants’ stairs' },
        { to: 'pinefoot_village', travelMinutes: 40, label: 'Down the six hundred steps' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
    {
      id: 'pinefoot_village',
      name: 'Pinefoot Village',
      shortName: 'Village',
      description:
        'A market village at the foot of the mountain that lives off the sect: rice sellers, a blacksmith, an inn with a back room, and a noodle stall whose owner sells gossip along with the noodles. The old north road and the river road east both start here.',
      artDirection:
        'Busy small market village at the foot of a sacred mountain, tiled roofs, a noodle stall with steam, a blacksmith, an inn sign, a dirt road leading off between rice fields. Lively, dusty, warm.',
      connections: [
        { to: 'mountain_gate', travelMinutes: 40, label: 'Back up the six hundred steps' },
        { to: 'old_shrine', travelMinutes: 120, label: 'The old north road' },
        { to: 'grey_ford', travelMinutes: 240, label: 'East along the river road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
    },
    {
      id: 'old_shrine',
      name: 'The Shrine on the Old Road',
      shortName: 'Old Shrine',
      description:
        'A roofless mountain shrine two hours up the old north road where nobody has prayed in years. Under its third flagstone the Gravekeeper buried one of a handful of emergency caches twelve years ago, and told exactly one person.',
      artDirection:
        'Abandoned roofless stone shrine on a mountain road, cracked flagstones, a weathered stone statue with moss, wildflowers, an overgrown path, grey sky. Forgotten, quiet, secret.',
      connections: [{ to: 'pinefoot_village', travelMinutes: 120, label: 'Back down the old road' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 5 },
      takeableItems: [
        { itemId: 'marrow_pill', qty: 1, ownerId: null, aka: ['pill', 'the jade jar', 'the black pill', 'the medicine'] },
        { itemId: 'seol_hwa_letter', qty: 1, ownerId: null, aka: ['letter', 'the note', 'the letter on the stone', 'her letter'] },
        { itemId: 'iron_fan', qty: 1, ownerId: null, aka: ['fan', 'the iron fan', 'my fan', 'the black fan'] },
      ],
    },
    {
      id: 'grey_ford',
      name: 'The Camp at Grey Ford',
      shortName: 'Grey Ford',
      description:
        'A river crossing four hours east of the village where the cult delegation is camped for two nights before going up the mountain: nine tents, one cookfire, and nine riders who would know the Gravekeeper’s walk anywhere.',
      artDirection:
        'Small military camp at a wide shallow river ford at dusk, nine grey tents, a cookfire, tethered horses, riders in grey with hoods, a white truce flag on a pole. Disciplined, wary, cold.',
      connections: [{ to: 'pinefoot_village', travelMinutes: 240, label: 'Back along the river road' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 5 },
    },
  ],
  factions: [
    {
      id: 'faction_silver_pine',
      name: 'The Silver Pine Sect',
      description:
        'A righteous sword school of four hundred disciples and twice as many servants on the mountain above Pinefoot. Its elders led the alliance against your cult for thirty years. To them you are a servant, and servants are furniture.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'Outer-yard servant' },
        { atReputation: 30, label: 'A useful pair of hands' },
        { atReputation: 60, label: 'Owed by the sect' },
      ],
      allies: [],
      enemies: ['faction_nine_graves'],
    },
    {
      id: 'faction_nine_graves',
      name: 'The Nine Graves Cult',
      description:
        'Nine hundred people in a closed valley, half of them fighters and all of them yours until nine days ago. They believe the Gravekeeper is dead and buried, and they are coming to make peace under the woman who poured the wine.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A stranger in a servant’s coat' },
        { atReputation: 30, label: 'Somebody they listen to' },
        { atReputation: 60, label: 'Master of the valley' },
      ],
      allies: [],
      enemies: ['faction_silver_pine'],
    },
    {
      id: 'faction_outer_yard',
      name: 'The Outer Yard Servants',
      description:
        'Sixty servants, cooks and grooms who carry the water, wash the robes and hear everything. They knew Dol as a sly, cheerful debtor, and they notice when somebody stops being one.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Dol from the woodshed' },
        { atReputation: 35, label: 'One of us' },
        { atReputation: 65, label: 'The one we cover for' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'seo_ah',
      name: 'Baek Seo-ah',
      calledName: 'Seo-ah',
      role: 'The sect leader’s daughter, the best sword of her generation at Silver Pine, and sworn since her mother’s funeral to kill the Gravekeeper',
      cardBlurb:
        'She is the only disciple on this mountain who was ever kind to Dol, she swore at her mother’s funeral to kill you with her own hands, and she has started to notice that you do not flinch like a servant.',
      pronouns: 'she/her',
      publicTraits: ['Blunt to the point of rudeness', 'Kind to servants and cold to disciples', 'Trains when she is angry, which is always'],
      hiddenDrives: [
        'She is relieved the Gravekeeper is dead and ashamed of the relief, because it means she never has to find out whether she could have done it',
        'She wants one person on this mountain to treat her as a swordsman rather than as the sect leader’s daughter',
      ],
      values: ['Saying the true thing to somebody’s face', 'Finishing what you swore to finish'],
      fears: [
        'That her mother’s sword form dies with her, unfinished at the eleventh movement',
        'That her father’s peace means her mother died for nothing',
      ],
      socialStyle:
        'Asks one direct question and waits for the answer with her hand resting on her sword. Treats servants as equals and disciples as problems to be corrected.',
      boundaries: [
        'Will not let anybody be beaten in front of her, whatever their rank; a servant who chooses to bow, she lets bow, and hates watching it',
        'Will not sit at a table with the Nine Graves, truce or no truce',
        'Will not be protected; tell her she cannot do something and she will have done it before supper',
      ],
      goals: [
        'Stop the truce, or at least say to Yu Seol-hwa’s face exactly what she thinks of it',
        'Finish her mother’s sword form before the alliance tournament in the spring',
      ],
      secrets: [
        {
          id: 'seo_ah_the_vow',
          fact: 'When the news came nine days ago that the Gravekeeper was dead, she went to the cold pool and broke her practice sword on a rock. She has not told anybody why, because she does not fully know.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells it at the cold pool at night, if you have watched her fail the eleventh movement and said nothing about it.',
        },
        {
          id: 'seo_ah_the_letter',
          fact: 'Her mother left her a letter that stops mid-sentence: "the eleventh movement turns on". Han So-yeon went to the duel before finishing it. The Gravekeeper saw the movement completed, once, and knows it turns on the back foot. Han So-yeon’s last words, said to the Gravekeeper alone, were: "Tell her it turns on the back foot."',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows the letter only to somebody she trusts enough to watch her practise, and only at the cold pool.',
        },
      ],
      speechStyle:
        'Short, blunt sentences, mostly questions and corrections. Uses sword vocabulary for everything, from people to weather. Dry humour delivered completely flat, and never once says please to a disciple.',
      topics: ['her mother', 'the eleventh movement', 'the truce', 'Senior Disciple Mok', 'the Gravekeeper', 'her father'],
      voiceSamples: [
        'Again. Slower. Your feet lie less than your mouth does.',
        'You flinched left. Servants flinch backwards. Who taught you to flinch left?',
        'My father calls it peace. I call it pouring wine for the people who buried my mother.',
        'I swore I would kill the Gravekeeper myself. Somebody beat me to it, and I have never been so furious about good news.',
      ],
      appearance:
        'An adult woman, tall and lean, long black hair tied high with a plain white cord, a white training robe with the sleeves bound back, and a sword she carries even to breakfast.',
      visualHook: 'A white cord in her hair that was her mother’s, tied in a swordsman’s knot.',
      silhouette: 'Straight-backed, one hand resting on the hilt, weight on the back foot.',
      artSeed: 'cmws-seo-ah-01',
      portrait: null,
      expressions: ['neutral', 'blunt', 'stern', 'surprised', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'hall_of_pines', activity: 'asleep in the family rooms behind the Hall' },
        { startMinute: 330, endMinute: 420, locationId: 'servants_yard', activity: 'fetching her own water from the yard well, which nobody else in her family does' },
        { startMinute: 420, endMinute: 660, locationId: 'training_court', activity: 'running the morning forms in the front row' },
        { startMinute: 660, endMinute: 900, locationId: 'hall_of_pines', activity: 'sitting through her father’s truce meetings with her jaw set' },
        { startMinute: 900, endMinute: 1080, locationId: 'cold_pool', activity: 'practising her mother’s form in the spray' },
        { startMinute: 1080, endMinute: 1260, locationId: 'hall_of_pines', activity: 'eating with her father and not talking' },
        { startMinute: 1260, endMinute: 1380, locationId: 'cold_pool', activity: 'night practice by lantern light' },
        { startMinute: 1380, endMinute: 1440, locationId: 'hall_of_pines', activity: 'in the family rooms, lamp still lit' },
      ],
      homeLocationId: 'hall_of_pines',
      knowledgeScope: ['silver_pine', 'han_so_yeon', 'the_eleventh_movement', 'the_truce', 'mok', 'the_outer_yard'],
      startingRelationship: { trust: 25, affection: 20, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'seo_ah_spars_with_you',
          label: 'She lets you watch her practise, and asks what you see',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'seo_ah_hears_it',
          label: 'She hears how her mother died, from the one person who was there',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['seo_ah_knows'] },
        },
        {
          id: 'seo_ah_closer',
          label: 'She stops pretending she only comes to the pool to train',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 12, agility: 17, mind: 13, presence: 13, resolve: 15, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 17, damage: 11, tags: ['sword', 'silver-pine', 'heir'] },
    },
    {
      id: 'mok',
      name: 'Mok Gyeong-ho',
      calledName: 'Mok',
      role: 'Senior Disciple of Silver Pine, second-best sword of his generation, and the man who beat Dol in the woodshed last night',
      cardBlurb:
        'Last night he beat the servant whose body you are wearing. He thinks you are hiding what you saw, and he means to keep you kneeling in front of everybody until you forget it.',
      pronouns: 'he/him',
      publicTraits: ['Polite to elders and vicious to servants', 'Counts everything, out loud', 'Good with a sword and better with a grudge'],
      hiddenDrives: [
        'He comes from a branch family so poor he nearly ended up in the outer yard himself, and every servant he kicks is that version of him',
        'He wants the First Elder to name him heir to the sword line, and would carry anything to get it',
      ],
      values: ['Rank, and everybody knowing theirs', 'Being seen to win'],
      fears: [
        'That the box he carried for the First Elder is what everybody now says killed the Gravekeeper',
        'Being sent home to the branch family in disgrace',
      ],
      socialStyle:
        'Performs for whoever is watching. With elders he bows a fraction too low; with servants he stands on things, including them.',
      boundaries: [
        'Will not throw a punch or draw a blade on anybody while the sect leader or Seo-ah is watching; making a servant bow properly does not count, to him, and he will push that as far as she lets him',
        'Will not admit he was afraid, even to himself, even while he is shaking',
      ],
      goals: [
        'Make Dol too frightened to say what Dol saw',
        'Win the open sparring in front of the First Elder',
      ],
      secrets: [
        {
          id: 'mok_the_box',
          fact: 'Twelve days ago he carried a sealed box from the Medicine Pavilion to a cult steward at the border market. He was told it was a bribe in gold. He has not slept properly since the news of the Gravekeeper’s death.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it in a rush to anybody who frightens him badly enough after dark, and then begs them not to tell the First Elder.',
        },
        {
          id: 'mok_the_beating',
          fact: 'Dol stopped moving last night for long enough that Mok ran. He does not know Dol died; he only knows he left a servant lying in the straw and came back at dawn to make sure nobody would talk.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the servant makes him remember the night out loud, in front of somebody he respects.',
        },
      ],
      speechStyle:
        'Clipped orders and counted threats. Calls servants "servant" as if it were a name. Switches to oily honorifics the moment anybody senior is within earshot, and back again the moment they leave.',
      topics: ['the open sparring', 'the First Elder', 'his rank', 'last night', 'the box'],
      voiceSamples: [
        'That’s one. You get three before I stop counting and start enjoying it.',
        'Servant. Servant. Look up when I use your name.',
        'First Elder, of course. Right away. It will be done before the evening bell.',
        'You were supposed to stay down. Why did you not stay down?',
      ],
      appearance:
        'An adult man, handsome in a sharp, hungry way, pale blue senior disciple robes kept spotless, and his hair pinned with a silver pin he cannot really afford.',
      visualHook: 'A silver hairpin far too expensive for his family, worn every single day so people notice it.',
      silhouette: 'Chin up, chest out, one foot always planted on something lower than him.',
      artSeed: 'cmws-mok-01',
      portrait: null,
      expressions: ['neutral', 'contemptuous', 'afraid', 'angry', 'grinning'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'training_court', activity: 'asleep in the senior disciples’ rooms off the court' },
        { startMinute: 300, endMinute: 420, locationId: 'servants_yard', activity: 'back at the woodshed, making sure the servant keeps quiet' },
        { startMinute: 420, endMinute: 720, locationId: 'training_court', activity: 'drilling the junior disciples by shouting at them' },
        { startMinute: 720, endMinute: 780, locationId: 'outer_kitchen', activity: 'eating first, standing up, complaining about the rice' },
        { startMinute: 780, endMinute: 1080, locationId: 'training_court', activity: 'sparring anybody who will stand still' },
        { startMinute: 1080, endMinute: 1260, locationId: 'elders_pavilion', activity: 'running errands for the First Elder' },
        { startMinute: 1260, endMinute: 1440, locationId: 'training_court', activity: 'in the senior disciples’ rooms, lamp on late' },
      ],
      homeLocationId: 'training_court',
      knowledgeScope: ['silver_pine', 'the_box', 'the_beating', 'gong', 'the_outer_yard'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 5, rivalry: 30 },
      gates: [
        {
          id: 'mok_breaks',
          label: 'He tells you about the box, and begs',
          kind: 'OTHER',
          requires: { fear: 55 },
        },
        {
          id: 'mok_turns',
          label: 'He agrees to stand in front of the sect leader and say who sent him',
          kind: 'ALLIANCE',
          requires: { respect: 40, flagsSet: ['knows:gong_sent_it'] },
        },
      ],
      attributes: { might: 14, agility: 14, mind: 10, presence: 11, resolve: 9, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 50, defenseDc: 15, damage: 9, tags: ['sword', 'silver-pine', 'bully'] },
    },
    {
      id: 'seol_hwa',
      name: 'Yu Seol-hwa',
      calledName: 'Seol-hwa',
      role: 'Your right hand for fifteen years, the woman who poured the wine, and now Acting Master of the Nine Graves, riding in to sign a truce',
      cardBlurb:
        'She poured the wine that killed you, she is riding up this mountain to make peace with the people you spent thirty years fighting, and she is the only person alive who could recognise you from one sentence.',
      pronouns: 'she/her',
      publicTraits: ['Calm in every room, including the ones on fire', 'Exact; says nothing she cannot stand behind', 'Loyal, until the night she was not'],
      hiddenDrives: [
        'She would have followed the Gravekeeper anywhere except where the Gravekeeper was going, which was a spring war that would have ended the valley',
        'She has visited three of the Gravekeeper’s hidden caches since the funeral and cannot say what she hoped to find in them',
      ],
      values: ['The nine hundred people in the valley over any one person, herself included', 'Keeping her word once it is given'],
      fears: [
        'That the Gravekeeper was right, and peace will only get everybody killed more slowly',
        'Being forgiven by somebody she cannot forgive herself in front of',
      ],
      socialStyle:
        'Counts silently to nine before answering anything that matters. Addresses everybody by full title and never touches anybody first.',
      boundaries: [
        'Will not let the cult be dragged back into the war, whoever asks, including you',
        'Will not lie about the wine to anybody who asks her directly and has earned a straight answer',
        'Will not kneel to a servant on a claim alone; she needs proof only the Gravekeeper could give',
      ],
      goals: [
        'Sign the truce at noon on the fourth day and bring all nine riders home',
        'Find out who put the second half of the poison in the banquet lamps, because it was not her',
      ],
      secrets: [
        {
          id: 'seol_hwa_the_wine',
          fact: 'She smelled pear wood in the banquet lamps, knew exactly what it meant, and poured the wine anyway, because the Gravekeeper had announced a spring march that would have ended the valley. She did not make the poison and does not know who did.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to the Gravekeeper, once she believes it is the Gravekeeper, and only in private.',
        },
        {
          id: 'seol_hwa_the_bridge',
          fact: 'In her first winter in the valley, on the rope bridge above it, the Gravekeeper told her she would be the one to end the Gravekeeper one day, and that it would be the right call when she did. Nobody else heard it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She asks for those words as proof and accepts nothing else. A player who says anything close to them is believed.',
        },
      ],
      speechStyle:
        'Formal, complete sentences with no contractions and no wasted words. A pause before anything important, as if counting. Uses titles, including the ones that hurt.',
      topics: ['the wine', 'the truce', 'the valley', 'the spring march', 'the Gravekeeper', 'the rope bridge'],
      voiceSamples: [
        'The Nine Graves will sign. Nine hundred people cannot eat a grudge through the winter.',
        'You will address me as Acting Master. I have not earned the other title, and I will not wear it.',
        'I smelled pear wood in the lamps. I poured anyway. I have told nobody that, and I will not say it twice.',
        'If you are who you claim, repeat what was said on the rope bridge, the first winter. Exactly.',
      ],
      appearance:
        'An adult woman, slight and very still, black hair cut short at the jaw, grey riding clothes with no insignia, and the cult’s iron ring of office worn on a cord at her throat instead of on her hand.',
      visualHook: 'An iron ring hanging on a cord at her throat, never worn on her finger.',
      silhouette: 'Hood up, hands folded inside her sleeves, standing exactly where she can see every door.',
      artSeed: 'cmws-seol-hwa-01',
      portrait: null,
      expressions: ['neutral', 'guarded', 'grave', 'stricken', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'grey_ford', activity: 'awake in her tent, reading the truce terms by lamplight' },
        { startMinute: 360, endMinute: 1200, locationId: 'grey_ford', activity: 'drilling the riders and answering letters from the valley' },
        { startMinute: 1200, endMinute: 1440, locationId: 'grey_ford', activity: 'alone at the river’s edge, counting' },
      ],
      homeLocationId: 'grey_ford',
      knowledgeScope: ['the_nine_graves', 'the_wine', 'the_spring_march', 'the_caches', 'the_truce', 'the_rope_bridge'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'seol_hwa_listens',
          label: 'She sends her riders out of the room',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['she_knows_you'] },
        },
        {
          id: 'seol_hwa_tells_it',
          label: 'She tells you what she smelled in the lamps',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['she_knows_you'] },
        },
      ],
      attributes: { might: 12, agility: 16, mind: 16, presence: 14, resolve: 17, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 19, damage: 13, tags: ['nine-graves', 'acting-master', 'twin-knives'] },
    },
    {
      id: 'pyo',
      name: 'Pyo Man-deok',
      calledName: 'Pyo',
      role: 'Head cook of the outer kitchen, who fed Dol for years and is the first person on the mountain to notice Dol is gone',
      cardBlurb:
        'He fed the servant whose body you are in for years, he knows exactly how Dol ate, walked and breathed, and by breakfast he has worked out that you are not Dol. What he does about it depends on you.',
      pronouns: 'he/him',
      publicTraits: ['Gruff, loud, and never wrong about food', 'Feeds everybody, including people he dislikes', 'Hates the Nine Graves more than anybody in the sect, for reasons he will not give'],
      hiddenDrives: [
        'He was a kitchen hand in the Nine Graves’ valley thirty years ago and ran the night they made him carry a dish he knew was poisoned; he has never quite stopped running',
        'He loved Dol like his own family and is grieving the only way he knows, which is cooking far too much',
      ],
      values: ['Nobody on this mountain goes hungry while he has a pot', 'A debt paid, even a small one'],
      fears: ['That the Nine Graves remember his face', 'That he is about to help whatever killed Dol'],
      socialStyle: 'Talks while chopping, puts food in your hands before you can refuse it, and asks the dangerous question with his back turned.',
      boundaries: [
        'Will not send food to the First Elder’s table that he has not tasted himself',
        'Will not give up a servant to the sect, even one he dislikes',
        'Will not go back to the Nine Graves, for anybody, ever',
      ],
      goals: [
        'Find out what happened to Dol, and whether whatever is wearing Dol’s face will hurt anybody in his kitchen',
        'Keep the outer yard out of whatever is coming at the truce',
      ],
      secrets: [
        {
          id: 'pyo_the_deserter',
          fact: 'Thirty years ago he was a kitchen hand in the Nine Graves’ valley. He recognises the cult’s breathing, four in and hold for nine, the moment he hears it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it himself over the stove, if you eat what he gives you and do not lie to him about how you breathe.',
        },
        {
          id: 'pyo_two_sleeps',
          fact: 'He knows the Two Sleeps recipe by smell, because he was made to cook it once, and he would know pear-wood smoke anywhere.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to somebody who already knows the name of the poison.',
        },
      ],
      speechStyle:
        'Gruff kitchen talk, short imperatives, food for every comparison. Says the frightening thing quietly with his back turned, then turns round and shouts about the rice.',
      topics: ['Dol', 'the outer kitchen', 'the breathing', 'the Nine Graves', 'the First Elder’s table', 'pear wood'],
      voiceSamples: [
        'Eat first. Lie after. Nobody lies well on an empty stomach.',
        'Four in, hold for nine. Thirty years since I heard anybody breathe like that, and I prayed I never would again.',
        'I fed that lump for years and never once got a thank-you. You said thank you. That is how I knew.',
        'Salt goes in at the end. Everything worth tasting goes in at the end.',
      ],
      appearance:
        'An elderly adult man, short, broad and bald, forearms covered in old kitchen burns, a stained apron over grey servant’s clothes, and a cleaver he carries the way other old men carry a fan.',
      visualHook: 'Forearms mapped with old kitchen burns, and a cleaver that is never out of reach.',
      silhouette: 'Wide and planted, back to the room, one hand on a ladle and one on the cleaver.',
      artSeed: 'cmws-pyo-01',
      portrait: null,
      expressions: ['neutral', 'grim', 'worried', 'warm', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 270, locationId: 'outer_kitchen', activity: 'asleep on a bench by the warm stove' },
        { startMinute: 270, endMinute: 1260, locationId: 'outer_kitchen', activity: 'cooking for sixty, loudly' },
        { startMinute: 1260, endMinute: 1440, locationId: 'outer_kitchen', activity: 'banking the fires and scrubbing the big pot' },
      ],
      homeLocationId: 'outer_kitchen',
      knowledgeScope: ['dol', 'the_outer_yard', 'the_nine_graves_kitchens', 'two_sleeps', 'silver_pine'],
      startingRelationship: { trust: 45, affection: 60, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'pyo_says_it',
          label: 'He says out loud that you are not Dol',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'pyo_holds_the_needles',
          label: 'He helps you open the body’s channels, and keeps watch while you do',
          kind: 'ALLIANCE',
          requires: { trust: 55, flagsSet: ['pyo_knows'] },
        },
      ],
      attributes: { might: 13, agility: 9, mind: 13, presence: 12, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 12, damage: 6, tags: ['cook', 'cleaver'] },
    },
    {
      id: 'baek',
      name: 'Baek Mu-jin',
      calledName: 'Baek',
      role: 'Sect Leader of Silver Pine, Seo-ah’s father, and the man staking thirty years of funerals on one truce',
      cardBlurb:
        'He has never once noticed you, which is lucky, because ten years ago you killed his wife. At noon on the fourth day he signs a truce with your cult, and if anybody proves the signing is a trap, he is the only person on the mountain who can stop it.',
      pronouns: 'he/him',
      publicTraits: ['Slow to speak and slower to anger', 'A great swordsman with an old wound', 'Tired in a way the whole sect can see'],
      hiddenDrives: [
        'He let his wife go to that duel, and has spent ten years trying to make her death the last one',
        'He is afraid his daughter will start the next war trying to finish the last one',
      ],
      values: ['An end to the funerals', 'The word of a righteous sect, kept even when it costs'],
      fears: ['That he is a fool being walked into a trap by his own elders', 'Burying his daughter'],
      socialStyle: 'Listens all the way to the end, says one sentence, and leaves the room before anybody can argue with it.',
      boundaries: [
        'Will not punish anybody on rumour; he wants a witness and a reason',
        'Will not break the truce once it is signed, even to avenge his wife',
        'Will not discuss his wife in front of the elders',
      ],
      goals: ['Sign the truce at noon on the fourth day', 'Keep Seo-ah away from the cult delegation'],
      secrets: [
        {
          id: 'baek_the_wound',
          fact: 'His wound from the war is worse than anybody knows. He cannot fight for longer than three breaths, and the First Elder is the only other person who knows it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only to somebody who has saved the sect from something, and only after it is over.',
        },
      ],
      speechStyle:
        'Slow, plain sentences and old proverbs about pines, snow and patience. Never raises his voice. Ends conversations rather than winning them.',
      topics: ['the truce', 'his wife', 'Seo-ah', 'the First Elder', 'thirty years of war'],
      voiceSamples: [
        'A pine does not argue with the snow. It bends, and in spring it is still a pine.',
        'Thirty years of funerals. I would like to sign one paper that ends something.',
        'Bring me a witness and a reason, and I will listen until dark. Bring me a rumour, and leave.',
      ],
      appearance:
        'An adult man in late middle age, grey at the temples, a heavy dark green robe of office, broad shoulders gone a little stooped, and a long white scar across the back of his sword hand.',
      visualHook: 'A white scar across the back of his sword hand, which he rubs with his thumb when he is not telling the whole truth.',
      silhouette: 'Tall and still, hands behind his back, head slightly bowed as if listening to snow.',
      artSeed: 'cmws-baek-01',
      portrait: null,
      expressions: ['neutral', 'weary', 'grave', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'hall_of_pines', activity: 'in the family rooms behind the Hall' },
        { startMinute: 360, endMinute: 480, locationId: 'training_court', activity: 'watching the morning forms from the top step' },
        { startMinute: 480, endMinute: 1440, locationId: 'hall_of_pines', activity: 'at the truce papers, receiving elders one at a time' },
      ],
      homeLocationId: 'hall_of_pines',
      knowledgeScope: ['silver_pine', 'the_truce', 'han_so_yeon', 'the_war', 'the_alliance'],
      startingRelationship: { trust: 10, affection: 0, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'baek_hears_you',
          label: 'He lets a servant finish a sentence in the Hall of Pines',
          kind: 'TRUST',
          requires: { respect: 40 },
        },
        {
          id: 'baek_owes_you_one',
          label: 'He tells you, privately, that the sect owes you',
          kind: 'ALLIANCE',
          requires: { flagsSet: ['baek_owes_you'] },
        },
      ],
      attributes: { might: 15, agility: 13, mind: 15, presence: 16, resolve: 16, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 85, defenseDc: 20, damage: 15, tags: ['sword', 'silver-pine', 'sect-leader', 'old-wound'] },
    },
    {
      id: 'gong',
      name: 'Gong Tae-seok',
      calledName: 'Gong',
      role: 'First Elder of Silver Pine, master of its Medicine Pavilion, and the gentlest voice on the mountain',
      cardBlurb:
        'He treats the servants’ injuries for free, he lost his only son to your cult twenty years ago, and he is very interested in how a servant who was beaten that badly last night is carrying water this morning, and in what you remember.',
      pronouns: 'he/him',
      publicTraits: ['Gentle, courteous and generous with medicine', 'Remembers every name, including the servants’', 'Speaks of the cult without heat, which unsettles people'],
      hiddenDrives: [
        'His son died in a Nine Graves raid twenty years ago, and he has decided the only peace worth having is one in which the cult no longer exists',
        'He believes he is the only person on the mountain willing to do what has to be done, and that this makes him lonely rather than wrong',
      ],
      values: ['Finishing a treatment, however unpleasant', 'Patience; a cure and a poison both take time'],
      fears: ['A truce that lets the people who killed his son grow old', 'Being found out before the work is finished'],
      socialStyle:
        'Asks after your health first, takes your pulse at the wrist while he talks, and remembers exactly what you told him last time.',
      boundaries: [
        'Will not raise his voice or a hand; he does everything through medicine and other people',
        'Will not harm Seo-ah, whom he taught to read',
        'Will not stop once he has started a treatment',
      ],
      goals: [
        'Poison the cult delegation at the signing and lay it at the cult’s own feet',
        'Find out what Dol saw, and whether Mok can still be trusted',
      ],
      secrets: [
        {
          id: 'gong_the_poison',
          fact: 'He bought the Two Sleeps recipe from a cult steward, sent the wine half and the lamp half to the Nine Graves banquet through Mok, and killed the Gravekeeper. Four more measures of pear wood are in his pavilion, wrapped for the altar of the Hall of Pines. At the signing the wine half goes only into the guests’ cups, poured from the jar of honour Silver Pine keeps for visitors; the sect drinks from its own jar.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will never say it aloud. His dispensary book records every measure in his own hand.',
        },
        {
          id: 'gong_the_lanterns',
          fact: 'He has had black lanterns hung around Silver Pine on the second night, the cult’s old warning sign, so that the sect expects treachery before the signing and blames the cult afterwards.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The lanterns are tied with a Silver Pine knot, not the cult’s nine-turn cord. Anybody who knows the cult would see it at once.',
        },
      ],
      speechStyle:
        'Soft, courteous and unhurried, with a physician’s vocabulary. Calls people "young friend". Every kindness has a small clinical question tucked inside it.',
      topics: ['your injuries', 'medicine', 'his son', 'the truce', 'the Nine Graves', 'Senior Disciple Mok'],
      voiceSamples: [
        'Sit, young friend. Show me the arm. Whoever did this knew exactly where to stop. Or did not.',
        'Medicine and poison share one shelf. The only difference is which direction you read the label.',
        'Peace is a fever. You let it run its course, and in the morning you see who is left.',
        'My son was twenty-six. They sent his sword home without him, with a very polite letter.',
      ],
      appearance:
        'An elderly adult man, thin and white-bearded, a pale grey elder’s robe that smells faintly of herbs, ink-stained fingers, and brass spectacles he wears only to read labels.',
      visualHook: 'Small brass spectacles worn only to read medicine labels, then folded away into his sleeve.',
      silhouette: 'Slightly bent, hands tucked in his sleeves, head tilted like a physician listening to a chest.',
      artSeed: 'cmws-gong-01',
      portrait: null,
      expressions: ['neutral', 'kindly', 'calculating', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'elders_pavilion', activity: 'awake before everybody, grinding something at the brazier' },
        { startMinute: 420, endMinute: 540, locationId: 'hall_of_pines', activity: 'at the morning council beside the sect leader' },
        { startMinute: 540, endMinute: 1440, locationId: 'elders_pavilion', activity: 'seeing patients and writing in his book' },
      ],
      homeLocationId: 'elders_pavilion',
      knowledgeScope: ['silver_pine', 'two_sleeps', 'the_truce', 'mok', 'the_nine_graves', 'his_son'],
      startingRelationship: { trust: 10, affection: 5, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'gong_lets_you_serve',
          label: 'He asks for you, by name, to serve in his pavilion',
          kind: 'OTHER',
          requires: { trust: 30 },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 18, presence: 14, resolve: 15, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 6, tags: ['physician', 'silver-pine', 'needles'] },
    },
  ],
  quests: [
    {
      id: 'q_kneel',
      title: 'Kneel, Servant',
      summary: 'You woke up in a dead servant’s body with a senior disciple’s boot on your back, and he wants you to kneel.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['mok', 'seo_ah', 'pyo'],
      involvedLocationIds: ['servants_yard', 'servants_quarters', 'outer_kitchen'],
      knownRewardCopy: 'Your first morning survived, and some idea whose life you are wearing and why it ended.',
      steps: [
        {
          id: 'the_yard',
          playerCopy: 'Get through the morning with a boot on your back.',
          directorNotes:
            'Mok is here to make sure the servant stays frightened, and does not know the servant died. Seo-ah has stopped at the well with two buckets and will not let a beating happen in front of her, but she will let a humiliation happen if the servant seems to accept it. Every route is a real way to play this, and none of them is wrong. Kneeling keeps the cover and costs pride; dropping Mok costs the cover and makes an enemy who now has to explain to himself how a servant did that.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'knelt',
              label: 'Kneel, and let him think it worked',
              predicate: { flagsSet: ['used:bow_your_head'] },
              setsFlags: ['cover_kept', 'knelt_for_mok'],
              closesFlags: ['shamed_mok'],
            },
            {
              routeId: 'dropped_him',
              label: 'Put the Senior Disciple on the ground without a mark',
              predicate: { flagsSet: ['used:lowered_lid'] },
              setsFlags: ['shamed_mok', 'mok_wants_you_dead'],
              closesFlags: ['cover_kept'],
            },
            {
              routeId: 'slipped_him',
              label: 'Get out from under it without a blow landing',
              predicate: { flagsSet: ['used:mourners_step'] },
              setsFlags: ['slipped_mok'],
              closesFlags: [],
            },
            {
              routeId: 'stood_up',
              label: 'Stand up and look at him the way you used to look at people',
              predicate: { flagsSet: ['used:masters_voice'] },
              setsFlags: ['stood_up_to_mok'],
              closesFlags: ['knelt_for_mok'],
            },
            {
              routeId: 'she_stepped_in',
              label: 'Let the woman at the well end it',
              predicate: { flagsSet: ['spoke:seo_ah'] },
              setsFlags: ['seo_ah_stepped_in'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_morning_survived'],
            abilities: [],
            reputation: [{ factionId: 'faction_silver_pine', amount: 5 }],
          },
        },
        {
          id: 'whose_life_this_is',
          playerCopy: 'Find out whose body you are wearing, and why Dol was beaten to death.',
          directorNotes:
            'Dol was sly, cheerful, nine silver short of freedom, and tried to sell Mok twenty silver of silence about a box. The yard knows the first three things. Pyo knows all of it except the box. The wax wrapper under the floorboard is the only thing on the mountain that connects the box to the Medicine Pavilion.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'pyo_told_you',
              label: 'Get it out of Old Cook Pyo over breakfast',
              predicate: {
                flagsSet: ['spoke:pyo'],
                minRelationship: [{ characterId: 'pyo', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:dol_tried_blackmail', 'heard_it_from_pyo'],
              closesFlags: [],
            },
            {
              routeId: 'searched_the_board',
              label: 'Lift the loose board under Dol’s mat',
              predicate: { hasItems: ['wax_wrapper'] },
              setsFlags: ['found_the_wrapper'],
              closesFlags: [],
            },
            {
              routeId: 'listened_to_the_yard',
              label: 'Stand in a corner and let the yard talk about Dol',
              predicate: { flagsSet: ['used:be_furniture'] },
              setsFlags: ['heard_the_yard_talk'],
              closesFlags: [],
            },
            {
              routeId: 'made_mok_say_it',
              label: 'Make Mok say what he did last night',
              predicate: { minRelationship: [{ characterId: 'mok', dimension: 'fear', value: 40 }] },
              setsFlags: ['mok_admitted_the_beating'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:the_box'],
            abilities: [],
            reputation: [{ factionId: 'faction_outer_yard', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_wine',
      title: 'Who Poured the Wine',
      summary: 'Your right hand poured it. Somebody else made it. A sealed box went from this mountain to your banquet, and Dol died for having seen it.',
      kind: 'MAIN',
      involvedCharacterIds: ['mok', 'gong', 'seol_hwa', 'pyo'],
      involvedLocationIds: ['elders_pavilion', 'servants_quarters', 'guest_pavilion', 'grey_ford'],
      knownRewardCopy: 'The whole of how you died, and who still means to use the rest of it.',
      discoverWhen: { flagsSet: ['knows:the_box'] },
      steps: [
        {
          id: 'the_box',
          playerCopy: 'Find out what was in the box Mok carried to your banquet.',
          directorNotes:
            'Four ways in and they are not equivalent. Naming the poison from the wrapper is the master’s own knowledge and proves nothing to anybody else. The dispensary book is proof the sect leader would accept. Overhearing the First Elder is dangerous and gives the plan for the signing as well as the past. Breaking Mok gives a witness, and a frightened one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'named_it',
              label: 'Smell the wrapper and name the poison',
              predicate: { flagsSet: ['used:name_the_poison'], hasItems: ['wax_wrapper'] },
              setsFlags: ['knows:twin_sleep'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_book',
              label: 'Read the First Elder’s dispensary book',
              predicate: { hasItems: ['dispensary_book'] },
              setsFlags: ['has_proof'],
              closesFlags: [],
            },
            {
              routeId: 'overheard_gong',
              label: 'Serve tea in the Medicine Pavilion and listen',
              predicate: { atLocation: 'elders_pavilion', flagsSet: ['used:be_furniture'] },
              setsFlags: ['overheard_gong', 'knows:the_altar_plan'],
              closesFlags: [],
            },
            {
              routeId: 'mok_broke',
              label: 'Frighten Mok into telling you who sent him',
              predicate: {
                flagsSet: ['spoke:mok'],
                minRelationship: [{ characterId: 'mok', dimension: 'fear', value: 55 }],
              },
              setsFlags: ['mok_talked'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:gong_sent_it'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_hand_that_poured',
          playerCopy: 'Find out whether the woman who poured your wine knew what was in it.',
          directorNotes:
            'She did not make it and she did know. That is the whole of it, and how the player hears it decides what it means. From her own mouth, in private, to the Gravekeeper, it is a confession from somebody who chose nine hundred people over one. Read off her hands across a tea tray, it is an accusation nobody made out loud. A player who never asks has made a decision too.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself, once she knows who is asking',
              predicate: {
                flagsSet: ['she_knows_you', 'spoke:seol_hwa'],
                minRelationship: [{ characterId: 'seol_hwa', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:she_smelled_it', 'she_confessed'],
              closesFlags: ['read_it_in_her'],
            },
            {
              routeId: 'read_it_in_her',
              label: 'Pour her tea and watch her hands while somebody else asks',
              predicate: { atLocation: 'guest_pavilion', flagsSet: ['tea_for_the_guests', 'used:read_the_stance'] },
              setsFlags: ['knows:she_smelled_it', 'read_it_in_her'],
              closesFlags: ['she_confessed'],
            },
            {
              routeId: 'never_asked',
              label: 'Let the truce come and go without asking',
              predicate: { flagsSet: ['truce_decided'] },
              setsFlags: ['never_asked'],
              closesFlags: ['she_confessed'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:the_whole_wine'],
            abilities: [],
            reputation: [{ factionId: 'faction_nine_graves', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_right_hand',
      title: 'The Woman Who Poured the Wine',
      summary: 'Yu Seol-hwa served you for fifteen years, poured your last cup, and now leads your cult. She needs one sentence to know you.',
      kind: 'MAIN',
      involvedCharacterIds: ['seol_hwa'],
      involvedLocationIds: ['grey_ford', 'guest_pavilion', 'old_shrine'],
      knownRewardCopy: 'Whether the one person alive who knew you best finds out you are back.',
      discoverWhen: { flagsSet: ['met:seol_hwa'] },
      steps: [
        {
          id: 'does_she_know_you',
          playerCopy: 'Decide whether Seol-hwa finds out who is pouring her tea.',
          directorNotes:
            'She will not believe a claim. She will believe proof only the Gravekeeper could give: the words on the rope bridge, a form only the Gravekeeper taught, or the letter she left in a cache only the two of them knew about. When she does believe it, she does not kneel at once. She counts to nine. Then she decides whether she is relieved or terrified, and the player sees both.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her',
              label: 'Tell her the words from the rope bridge',
              predicate: { flagsSet: ['used:say_who_you_are', 'spoke:seol_hwa'] },
              setsFlags: ['she_knows_you'],
              closesFlags: ['she_never_knew'],
            },
            {
              routeId: 'showed_her_the_form',
              label: 'Let her see a form only you ever taught',
              predicate: { flagsSet: ['used:iron_wreath', 'spoke:seol_hwa'] },
              setsFlags: ['she_knows_you', 'she_saw_the_form'],
              closesFlags: ['she_never_knew'],
            },
            {
              routeId: 'gave_back_the_letter',
              label: 'Hand her back the letter she left under the stone',
              predicate: { flagsSet: ['spoke:seol_hwa'], hasItems: ['seol_hwa_letter'] },
              setsFlags: ['she_knows_you', 'she_got_her_letter_back'],
              closesFlags: ['she_never_knew'],
            },
            {
              routeId: 'she_never_knew',
              label: 'Let her ride home without ever knowing',
              predicate: { flagsSet: ['truce_decided', 'spoke:seol_hwa'] },
              setsFlags: ['she_never_knew'],
              closesFlags: ['she_knows_you'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['met_the_right_hand'],
            abilities: [],
            reputation: [{ factionId: 'faction_nine_graves', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_truce',
      title: 'The Truce at Silver Pine',
      summary: 'Noon on the fourth day: one jar of wine for both sides, incense at the altar, and the First Elder smiling beside the sect leader.',
      kind: 'MAIN',
      involvedCharacterIds: ['baek', 'gong', 'seol_hwa', 'mok', 'seo_ah'],
      involvedLocationIds: ['hall_of_pines', 'guest_pavilion', 'elders_pavilion'],
      knownRewardCopy: 'What happens at the altar, and who walks out of the Hall of Pines.',
      discoverWhen: { flagsSet: ['delegation_arrived'] },
      steps: [
        {
          id: 'the_signing',
          playerCopy: 'Decide what happens at noon on the fourth day.',
          directorNotes:
            'If nobody does anything, the First Elder’s plan works: the wine and the incense together put the delegation on the floor, the black lanterns have already told the sect to expect cult treachery, and the war resumes. That outcome is reachable by inaction and must be written as a consequence rather than a punishment. Every other route stops it, and each one costs something different: the book costs the First Elder everything, a warning costs the cover with Seol-hwa, the Grave Bell costs the cover with everybody, and quietly swapping the incense saves everybody and leaves the First Elder free to try again.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'exposed_him',
              label: 'Put the First Elder’s book in the sect leader’s hands',
              predicate: { hasItems: ['dispensary_book'], flagsSet: ['spoke:baek'] },
              setsFlags: ['gong_exposed', 'trap_exposed', 'baek_owes_you'],
              closesFlags: ['cult_delegation_fell'],
            },
            {
              routeId: 'mok_testified',
              label: 'Stand Mok in front of the sect leader and make him say who sent the box',
              predicate: { flagsSet: ['mok_talked', 'spoke:baek'] },
              setsFlags: ['gong_exposed', 'trap_exposed', 'mok_confessed', 'baek_owes_you'],
              closesFlags: ['cult_delegation_fell'],
            },
            {
              routeId: 'warned_her',
              label: 'Warn the woman who poured your wine',
              predicate: { flagsSet: ['knows:gong_sent_it', 'spoke:seol_hwa'] },
              setsFlags: ['seol_hwa_warned', 'trap_exposed'],
              closesFlags: ['cult_delegation_fell'],
            },
            {
              routeId: 'rang_the_bell',
              label: 'Stop the signing yourself, in front of everyone',
              predicate: { atLocation: 'hall_of_pines', flagsSet: ['used:grave_bell'] },
              setsFlags: ['gravekeeper_returned', 'trap_exposed'],
              closesFlags: ['cult_delegation_fell', 'cover_kept'],
            },
            {
              routeId: 'swapped_the_incense',
              label: 'Take the incense off the altar and let nobody know why',
              predicate: { hasItems: ['pear_incense'], flagsSet: ['knows:twin_sleep'] },
              setsFlags: ['trap_exposed', 'quiet_save'],
              closesFlags: ['cult_delegation_fell'],
            },
            {
              routeId: 'let_it_happen',
              label: 'Let noon come',
              predicate: { flagsSet: ['trap_sprung'] },
              setsFlags: ['cult_delegation_fell'],
              closesFlags: ['gong_exposed', 'seol_hwa_warned'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['truce_decided'],
            abilities: [],
            reputation: [
              { factionId: 'faction_silver_pine', amount: 25 },
              { factionId: 'faction_nine_graves', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_rebuild',
      title: 'A Body Worth Having',
      summary: 'The forms are all still in your head. The body can carry three of them. Getting it to carry more will hurt.',
      kind: 'SIDE',
      involvedCharacterIds: ['pyo', 'seo_ah'],
      involvedLocationIds: ['cold_pool', 'servants_yard', 'training_court', 'old_shrine'],
      knownRewardCopy: 'The fourth Grave Form, and then the sixth.',
      discoverWhen: { flagsSet: ['first_morning_survived'] },
      steps: [
        {
          id: 'open_the_channels',
          playerCopy: 'Open the blocked channels in a body that has never trained.',
          directorNotes:
            'The slow way is honest servant work and breathing every night, and it works by the third day. The pill works in one night and costs a fever that somebody will notice. Pyo can hold the needles, if he knows what he is helping. Whichever way, write the first moment the body answers properly as a small, physical, private triumph.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_slow_way',
              label: 'Carry water all day and breathe the old way all night',
              predicate: { flagsSet: ['used:steady_the_breath', 'used:do_the_work'] },
              setsFlags: ['body_opened', 'did_it_slowly'],
              closesFlags: [],
            },
            {
              routeId: 'the_pill',
              label: 'Swallow the pill you buried twelve years ago',
              predicate: { hasItems: ['marrow_pill'], flagsSet: ['used:steady_the_breath'] },
              setsFlags: ['body_opened', 'took_the_pill'],
              closesFlags: [],
            },
            {
              routeId: 'pyo_held_the_needles',
              label: 'Let Old Cook Pyo hold the needles',
              predicate: {
                flagsSet: ['pyo_knows'],
                minRelationship: [{ characterId: 'pyo', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['body_opened', 'pyo_helped'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_fourth_form'],
            abilities: ['iron_wreath'],
            reputation: [],
          },
        },
        {
          id: 'fill_the_well',
          playerCopy: 'Rebuild enough internal energy to use the later forms.',
          directorNotes:
            'This is the expensive half. The cold pool is where it can be done quietly; the open sparring is where it can be done loudly, by taking a beating on purpose and keeping what it shakes loose. Either way, the first time the Grave Bell is possible the player should feel it like a held breath, and should understand that using it once in public ends the disguise forever.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cold_pool_nights',
              label: 'Sit under the waterfall at night until it answers',
              predicate: { atLocation: 'cold_pool', flagsSet: ['used:steady_the_breath', 'body_opened'] },
              setsFlags: ['breath_rebuilt'],
              closesFlags: [],
            },
            {
              routeId: 'sparred_for_it',
              label: 'Take the open sparring head on and keep what it shakes loose',
              predicate: { flagsSet: ['sparring_day', 'used:iron_wreath'] },
              setsFlags: ['breath_rebuilt', 'fought_at_the_sparring'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:the_sixth_form'],
            abilities: ['grave_bell'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_old_pyo',
      title: 'The Cook Who Knows the Breathing',
      summary: 'Old Cook Pyo watched you eat breakfast and has gone very quiet. He fed Dol for years, and he knows how Dol breathed.',
      kind: 'SIDE',
      involvedCharacterIds: ['pyo'],
      involvedLocationIds: ['outer_kitchen'],
      knownRewardCopy: 'One person on the mountain who knows what you are, and what that costs him.',
      discoverWhen: { flagsSet: ['pyo_watching'] },
      steps: [
        {
          id: 'what_pyo_saw',
          playerCopy: 'Decide what to do about the one person who has already noticed.',
          directorNotes:
            'Pyo is grieving Dol and terrified of the Nine Graves, and the thing in front of him is both. He will not betray a servant to the sect, but he can be driven out of his own kitchen by fear. Telling him the truth makes him an ally and a risk. Fooling him works only if the player has learned enough of Dol’s life to play it back to him.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_pyo',
              label: 'Tell him the truth over the stove',
              predicate: { atLocation: 'outer_kitchen', flagsSet: ['used:say_who_you_are', 'spoke:pyo'] },
              setsFlags: ['pyo_knows', 'pyo_ally'],
              closesFlags: ['pyo_fooled'],
            },
            {
              routeId: 'he_said_it_first',
              label: 'Let him say it first',
              predicate: {
                flagsSet: ['spoke:pyo'],
                minRelationship: [{ characterId: 'pyo', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['pyo_knows', 'pyo_ally', 'pyo_said_it'],
              closesFlags: ['pyo_fooled'],
            },
            {
              routeId: 'scared_him',
              label: 'Make him afraid enough to keep quiet',
              predicate: {
                flagsSet: ['spoke:pyo'],
                minRelationship: [{ characterId: 'pyo', dimension: 'fear', value: 30 }],
              },
              setsFlags: ['pyo_knows', 'pyo_afraid'],
              closesFlags: ['pyo_ally'],
            },
            {
              routeId: 'fooled_pyo',
              label: 'Play Dol back to him, debts and all',
              predicate: { flagsSet: ['used:bow_your_head', 'spoke:pyo'], hasItems: ['dol_ledger'] },
              setsFlags: ['pyo_fooled'],
              closesFlags: ['pyo_knows'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:pyo_deserted'],
            abilities: [],
            reputation: [{ factionId: 'faction_outer_yard', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_daughter',
      title: 'Her Mother’s Eleventh Movement',
      summary: 'Seo-ah fails her mother’s sword form at the same turn every night. You watched her mother finish it, once, ten years ago.',
      kind: 'SIDE',
      involvedCharacterIds: ['seo_ah', 'baek'],
      involvedLocationIds: ['cold_pool', 'training_court'],
      knownRewardCopy: 'The end of a form, a letter and a vow, and whatever Seo-ah does with the person who brings them.',
      discoverWhen: { flagsSet: ['spoke:seo_ah'] },
      steps: [
        {
          id: 'the_unfinished_form',
          playerCopy: 'Decide what to give Seo-ah of her mother, and how.',
          directorNotes:
            'The movement turns on the back foot, not the front. Han So-yeon’s last words were to tell her daughter exactly that. The player can teach it as a servant with a good eye, give the words and lie about where they came from, or tell her everything. Each is a real choice with a real cost, and the romance, if there is one, grows out of whichever she gets.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'taught_her',
              label: 'Show her the turn on the back foot',
              predicate: {
                atLocation: 'cold_pool',
                flagsSet: ['spoke:seo_ah'],
                minRelationship: [{ characterId: 'seo_ah', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['taught_seo_ah', 'seo_ah_suspects'],
              closesFlags: [],
            },
            {
              routeId: 'told_her_everything',
              label: 'Tell her who you are and how her mother died',
              predicate: {
                flagsSet: ['used:say_who_you_are', 'spoke:seo_ah'],
                minRelationship: [{ characterId: 'seo_ah', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['seo_ah_knows', 'taught_seo_ah'],
              closesFlags: ['kept_it_from_her'],
            },
            {
              routeId: 'gave_her_the_words',
              label: 'Give her her mother’s last words and say a stranger told you',
              predicate: {
                flagsSet: ['spoke:seo_ah', 'used:read_the_stance'],
                minRelationship: [{ characterId: 'seo_ah', dimension: 'affection', value: 45 }],
              },
              setsFlags: ['kept_it_from_her', 'gave_her_the_words'],
              closesFlags: ['seo_ah_knows'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:the_eleventh_movement'],
            abilities: [],
            reputation: [{ factionId: 'faction_silver_pine', amount: 10 }],
          },
        },
        {
          id: 'what_she_does',
          playerCopy: 'She knows who you are. Her sword is drawn.',
          directorNotes:
            'She swore to kill the Gravekeeper, and the Gravekeeper is standing in front of her in a servant’s body that has carried her water every morning. Nothing is decided for her. She can spare the player, demand the duel she was promised, or walk away and never speak to them again. Nobody dies on the page.',
          enterWhen: { flagsSet: ['seo_ah_knows'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_spared_you',
              label: 'She lowers the sword',
              predicate: { minRelationship: [{ characterId: 'seo_ah', dimension: 'trust', value: 60 }] },
              setsFlags: ['seo_ah_spared_you'],
              closesFlags: ['dueled_seo_ah'],
            },
            {
              routeId: 'she_called_the_duel',
              label: 'She calls the duel her mother fought',
              predicate: { flagsSet: ['used:iron_wreath'] },
              setsFlags: ['dueled_seo_ah'],
              closesFlags: ['seo_ah_spared_you'],
            },
            {
              routeId: 'she_walked_away',
              label: 'She sheathes it and walks away',
              predicate: { flagsSet: ['seo_ah_knows', 'truce_decided'] },
              setsFlags: ['seo_ah_gone_cold'],
              closesFlags: ['seo_ah_spared_you'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['seo_ah_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_cache',
      title: 'The Grave by the Old Road',
      summary: 'Two hours up the old north road is a shrine nobody visits, and under its third flagstone is something you buried twelve years ago.',
      kind: 'LEAD',
      involvedCharacterIds: ['seol_hwa'],
      involvedLocationIds: ['pinefoot_village', 'old_shrine'],
      knownRewardCopy: 'What you left for yourself, and what somebody else left on top of it.',
      discoverWhen: { flagsSet: ['first_morning_survived'] },
      steps: [
        {
          id: 'lift_the_stone',
          playerCopy: 'Get down the mountain and lift the third flagstone.',
          directorNotes:
            'Getting there means getting past the gate disciples with a servant’s tag and four hours of nobody noticing. The cache holds the pill, the fan and a letter that was not there twelve years ago: Seol-hwa has been here since the funeral, and she left it for a dead person, just in case.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_pill',
              label: 'Take the pill out of the jade jar',
              predicate: { hasItems: ['marrow_pill'] },
              setsFlags: ['cache_opened'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_letter',
              label: 'Read what somebody left on top',
              predicate: { hasItems: ['seol_hwa_letter'] },
              setsFlags: ['cache_opened', 'knows:she_was_here'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_fan',
              label: 'Take the fan back',
              predicate: { hasItems: ['iron_fan'] },
              setsFlags: ['cache_opened', 'carrying_the_fan'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_cache'],
            abilities: [],
            reputation: [{ factionId: 'faction_nine_graves', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_dols_debt',
      title: 'Thirty-One Silver',
      summary: 'Dol saved thirty-one silver toward a forty-silver contract. Dol is gone, and the debt is now yours.',
      kind: 'SIDE',
      involvedCharacterIds: ['pyo', 'baek'],
      involvedLocationIds: ['servants_quarters', 'hall_of_pines', 'servants_yard'],
      knownRewardCopy: 'Dol’s freedom, or Dol’s chains kept on as a disguise.',
      discoverWhen: { hasItems: ['dol_ledger'] },
      steps: [
        {
          id: 'the_contract',
          playerCopy: 'Decide what to do with the life Dol was trying to buy back.',
          directorNotes:
            'This is the small, human story under the big one and it should be played for real. Earning nine silver honestly in the outer yard takes work and favours; stealing the contract from the steward’s drawer is easy for somebody who knows the Shroud and is a crime if noticed. Keeping the contract is the best disguise there is. None of these is the right answer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_it',
              label: 'Earn the last nine silver and buy Dol out',
              predicate: {
                hasItems: ['dol_ledger'],
                flagsSet: ['used:do_the_work'],
                minFactionReputation: [{ factionId: 'faction_outer_yard', value: 30 }],
              },
              setsFlags: ['dol_freed', 'paid_for_it'],
              closesFlags: ['kept_the_contract'],
            },
            {
              routeId: 'stole_it',
              label: 'Take the contract out of the steward’s drawer',
              predicate: { hasItems: ['indenture_contract'] },
              setsFlags: ['dol_freed', 'stole_the_contract'],
              closesFlags: ['kept_the_contract'],
            },
            {
              routeId: 'kept_the_chains',
              label: 'Keep Dol bound, because it is good cover',
              predicate: { flagsSet: ['truce_decided', 'cover_kept'] },
              setsFlags: ['kept_the_contract'],
              closesFlags: ['dol_freed'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['dol_s_life_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_outer_yard', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_pyo_watches',
      atWorldMinute: 7 * 60 + 20,
      locationId: 'outer_kitchen',
      publicCopy:
        'Old Cook Pyo bangs a bowl of rice gruel down on the servants’ table, says "Eat", and stays to watch how you hold the spoon.',
      directorNotes:
        'He heard the breathing from across the kitchen. He is not sure yet, and he is frightened of being sure. Whatever the player does with the spoon, he notices one more thing that Dol never did.',
      setsFlags: ['pyo_watching'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'pyo', toLocationId: 'outer_kitchen' }],
    },
    {
      id: 'we_the_yard_talks',
      atWorldMinute: 12 * 60,
      locationId: 'servants_yard',
      publicCopy:
        'At the noon break the outer yard has one subject: Dol was left lying in the woodshed straw last night not moving, and walked out of it this morning.',
      directorNotes:
        'The servants make a joke of it, because that is what servants do with things that frighten them. One of them says Dol has a new walk. Another says Mok came back at dawn looking like he had seen a ghost.',
      setsFlags: ['yard_talking'],
      cancelledByFlags: [],
      requiresFlags: ['first_morning_survived'],
      movesCharacters: [],
    },
    {
      id: 'we_mok_reports',
      atWorldMinute: 21 * 60,
      locationId: 'elders_pavilion',
      publicCopy: 'Lamplight late in the Medicine Pavilion. Senior Disciple Mok goes in with his head down and does not come out for an hour.',
      directorNotes:
        'Mok is telling the First Elder that the servant is alive and strange. Gong listens, takes Mok’s pulse, and tells him to do nothing. That frightens Mok more than anything else could have.',
      setsFlags: ['mok_reported'],
      cancelledByFlags: [],
      requiresFlags: ['first_morning_survived'],
      movesCharacters: [{ characterId: 'mok', toLocationId: 'elders_pavilion' }],
    },
    {
      id: 'we_seo_ah_at_the_pool',
      atWorldMinute: 22 * 60 + 30,
      locationId: 'cold_pool',
      publicCopy: 'Under the waterfall, by lantern light, a woman in white runs the same sword form eleven times and fails at the same turn every time.',
      directorNotes:
        'Only for a player who has been to the cold pool. The master sees the mistake at once: she turns on the front foot. Her mother turned on the back. Saying so out loud is a kindness and a confession at the same time.',
      setsFlags: ['saw_her_fail_the_turn'],
      cancelledByFlags: [],
      requiresFlags: ['visited:cold_pool'],
      movesCharacters: [{ characterId: 'seo_ah', toLocationId: 'cold_pool' }],
    },
    {
      id: 'we_the_sparring',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'training_court',
      publicCopy:
        'Open sparring day. Disciples fight inside a ring of servants holding padded target posts, and Senior Disciple Mok has asked for Dol by name.',
      directorNotes:
        'Mok wants to finish in public, with a wooden sword and an excuse, what he started in the woodshed. The First Elder is watching from the steps. Seo-ah is in the ring too, and she is watching the servant rather than her opponent.',
      setsFlags: ['sparring_day'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'mok', toLocationId: 'training_court' }],
    },
    {
      id: 'we_gong_sends_for_you',
      atWorldMinute: 1440 + 15 * 60,
      locationId: null,
      publicCopy: 'A junior disciple comes looking for you: the First Elder would like to look at your injuries. Now, if you please.',
      directorNotes:
        'Only if the servant put Mok on the ground. Gong examines the body with real skill and real kindness, and he will find the bruises in the pattern of a beating that should have killed. He will ask where the servant learned to fall like that. He will remember the answer.',
      setsFlags: ['gong_examined_you'],
      cancelledByFlags: [],
      requiresFlags: ['mok_wants_you_dead'],
      movesCharacters: [{ characterId: 'gong', toLocationId: 'elders_pavilion' }],
    },
    {
      id: 'we_black_lanterns',
      atWorldMinute: 1440 + 23 * 60,
      locationId: null,
      publicCopy:
        'By morning there are black paper lanterns hanging on the main gate, the woodshed and the eaves of the Hall of Pines: the Nine Graves’ old warning that somebody has been marked.',
      directorNotes:
        'The First Elder’s men hung them, to make the sect expect cult treachery before the signing. The cult ties its lanterns with a nine-turn cord; these are tied with the Silver Pine knot every servant learns in their first week. The master sees it in one look. Nobody else on the mountain will.',
      setsFlags: ['lanterns_hung'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_delegation_arrives',
      atWorldMinute: 2 * 1440 + 18 * 60,
      locationId: 'mountain_gate',
      publicCopy:
        'Nine riders in grey come up the mountain steps under a white flag. The woman at the front keeps her hood up until she reaches the gate.',
      directorNotes:
        'Seol-hwa sees everything at the gate: the lanterns, the guards, the servants. She does not look at any of them twice, except that she looks at every servant once, which she has never done before in her life and could not explain.',
      setsFlags: ['delegation_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'seol_hwa', toLocationId: 'guest_pavilion' }],
    },
    {
      id: 'we_tea_for_the_guests',
      atWorldMinute: 2 * 1440 + 20 * 60,
      locationId: null,
      publicCopy: 'The guest pavilion sends down for tea, and the steward goes looking for a servant nobody will miss. He finds you.',
      directorNotes:
        'The steward chose Dol because Dol is expendable. The player will be in a room with the woman who poured their wine, holding a tray, while the sect leader and Seol-hwa talk terms. Nobody looks at the servant. One person might.',
      setsFlags: ['tea_for_the_guests'],
      cancelledByFlags: [],
      requiresFlags: ['delegation_arrived'],
      movesCharacters: [{ characterId: 'baek', toLocationId: 'guest_pavilion' }],
    },
    {
      id: 'we_the_signing',
      atWorldMinute: 3 * 1440 + 12 * 60,
      locationId: 'hall_of_pines',
      publicCopy:
        'Noon in the Hall of Pines. The guests are poured from the jar of honour while pear-wood incense burns at the altar, and one by one the cult delegation stops being able to stand.',
      directorNotes:
        'This only happens if nobody stopped it. The black lanterns have already told the sect what to think, and the First Elder is the first to shout that the cult has poisoned itself to frame Silver Pine. Write the consequence plainly and without gore: people on the floor, a hall in uproar, a truce over before the ink is dry.',
      setsFlags: ['trap_sprung'],
      cancelledByFlags: ['trap_exposed', 'gong_exposed', 'seol_hwa_warned'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'seol_hwa', toLocationId: 'hall_of_pines' },
        { characterId: 'gong', toLocationId: 'hall_of_pines' },
        { characterId: 'baek', toLocationId: 'hall_of_pines' },
      ],
    },
    {
      id: 'we_clean_wine',
      atWorldMinute: 3 * 1440 + 12 * 60 + 30,
      locationId: 'hall_of_pines',
      publicCopy:
        'The truce is signed with a fresh jar and no incense, and nobody in the Hall of Pines can say exactly why the first jar went into the drain.',
      directorNotes:
        'Only if the trap was stopped. Whoever stopped it is either standing in the middle of the hall being stared at or holding a tea tray at the back. Seol-hwa counts to nine before she drinks.',
      setsFlags: ['truce_signed'],
      cancelledByFlags: ['trap_sprung'],
      requiresFlags: ['trap_exposed'],
      movesCharacters: [
        { characterId: 'seol_hwa', toLocationId: 'hall_of_pines' },
        { characterId: 'baek', toLocationId: 'hall_of_pines' },
      ],
    },
    {
      id: 'we_war_drums',
      atWorldMinute: 4 * 1440 + 6 * 60,
      locationId: 'mountain_gate',
      publicCopy: 'War drums in the valley below Pinefoot. The Nine Graves have heard what happened at the signing.',
      directorNotes:
        'The thirty-year war is back. Silver Pine arms. Seo-ah asks to ride with the first column. In the outer yard, somebody still has to carry the water.',
      setsFlags: ['war_again'],
      cancelledByFlags: ['trap_exposed'],
      requiresFlags: ['trap_sprung'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_who_you_are',
      kind: 'FINALE',
      label: 'Who you are by the end of the fourth day',
      seedHint: 'A servant’s wooden tag hanging round a neck that used to wear a master’s iron ring.',
      payoffHint: 'Somebody says your real name out loud, or nobody ever does, and either way it was chosen.',
      weight: 1,
    },
    {
      id: 'p_the_wine',
      kind: 'MYSTERY',
      label: 'Who actually killed you, and who they mean to kill next',
      seedHint: 'A wax wrapper under a dead servant’s floorboard that smells faintly of pears.',
      payoffHint: 'Two halves of one poison, a neat line in a physician’s book, and four more measures of pear wood wrapped for the altar.',
      weight: 0.9,
    },
    {
      id: 'p_the_daughter',
      kind: 'RELATIONSHIP',
      label: 'The woman who swore to kill you, and is kind to you',
      seedHint: 'A white cord in her hair tied in a swordsman’s knot, and a form she fails at the eleventh movement.',
      payoffHint: 'Her mother’s last words, which only you heard, and what she does with the person who brings them.',
      weight: 0.85,
    },
    {
      id: 'p_mok',
      kind: 'RIVAL',
      label: 'The man who killed Dol without knowing it',
      seedHint: 'A boot on your back and a voice that counts.',
      payoffHint: 'Mok learns what he carried and what he did, and decides what kind of man he is, with or without your help.',
      weight: 0.7,
    },
    {
      id: 'p_dol',
      kind: 'THEME',
      label: 'The life you are wearing',
      seedHint: 'Thirty-one silver in a savings book, nine short of freedom.',
      payoffHint: 'Dol’s debt, Dol’s friends and Dol’s name, kept, paid or put down.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_blade',
      name: 'You Were the Blade',
      role: 'Melee and precision',
      summary: 'You fought every duel yourself, so the killing forms come easiest and the body learns them fastest. You are worst of all at pretending to be nobody.',
      playstyle: ['Close combat', 'Precise', 'Bad at hiding'],
      blurb: 'Thirty years of duels, and you never once sent somebody else to do it for you.',
      attributeBonus: { agility: 3, might: 1 },
      skillProficiencies: { grave_forms: 3, eye: 1, inner_breath: 1 },
      startingItems: [{ itemId: 'practice_sword', qty: 1 }],
      startingAbilities: ['lowered_lid'],
      startingReputation: [],
    },
    {
      id: 'arch_physician',
      name: 'You Were the Physician',
      role: 'Poison and healing',
      summary: 'You rose through the cult’s medicine hall, so you can name a poison by its smell and mend a body others would give up on, which matters when the body is yours.',
      playstyle: ['Investigator', 'Patient', 'Heals and poisons'],
      blurb: 'Half the masters who came to kill you died of something they ate on the way.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { poisons: 3, inner_breath: 2 },
      startingItems: [{ itemId: 'ginger_broth', qty: 2 }],
      startingAbilities: ['name_the_poison'],
      startingReputation: [],
    },
    {
      id: 'arch_strategist',
      name: 'You Were the Strategist',
      role: 'Talk and stealth',
      summary: 'You ran the cult like a ledger, so you read people, lie well and play the humble servant better than any other version of you. You fight worst of all.',
      playstyle: ['Talker', 'Schemer', 'Hides well'],
      blurb: 'You won more wars with a letter than with a fan, and you never let anybody see you write one.',
      attributeBonus: { presence: 2, mind: 2 },
      skillProficiencies: { servility: 3, eye: 2 },
      startingItems: [{ itemId: 'dol_ledger', qty: 1 }],
      startingAbilities: ['be_furniture'],
      startingReputation: [{ factionId: 'faction_outer_yard', amount: 10 }],
    },
    {
      id: 'arch_terror',
      name: 'You Were the Terror',
      role: 'Fear and social pressure',
      summary: 'You ruled by being feared, so your voice can still freeze a grown disciple, and everything you do draws eyes the way a fire does.',
      playstyle: ['Intimidating', 'Loud', 'Draws attention'],
      blurb: 'Whole sects surrendered to you on hearing which road you had taken.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { command: 3, labour: 1, grave_forms: 1 },
      startingItems: [],
      startingAbilities: ['masters_voice'],
      startingReputation: [],
    },
  ],
  setupFields: [
    {
      id: 'displayName',
      label: 'What was your own name, under the title?',
      helpText: 'The martial world knew you as the Gravekeeper. Almost nobody alive has heard your real name. Everybody on this mountain will call you Dol.',
      kind: 'TEXT',
      required: true,
      maxLength: 40,
      placeholder: 'e.g. Seok Mu-gyeol',
    },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What were you, before the wine?',
      helpText:
        'How the most feared master alive actually won: which part of you came through the poison intact. It sets what you are good at, it is fixed for the whole story, and it cannot be changed later. It does not decide whether you take the cult back, forgive anybody, or stay a servant; none of that is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What did the martial world get wrong about you?',
      helpText: 'One plain sentence, in your own words.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. They say I never spared anybody. I spared three, and one of them is coming up the mountain.',
    },
    {
      id: 'first_want',
      label: 'What do you want, this first morning?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite in the yard and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'revenge', label: 'The name of whoever made the poison' },
        { id: 'survive', label: 'To get through today without anybody noticing' },
        { id: 'the_cult', label: 'My cult back, before she signs it away' },
        { id: 'the_body', label: 'A body that can do what I remember' },
        { id: 'nothing', label: 'Nothing. I died. This is extra.' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the servant’s body look like?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Thin, sunburnt, a split lip, cropped hair and shoulders built by two hundred buckets a day.',
    },
  ],
  /**
   * Where this can end up.
   *
   * The war coming back is reachable by doing nothing at all, and it is
   * written as a consequence rather than a punishment: an old man's patience
   * can beat a servant's four days. Walking away is available from early on.
   * Only one ending needs the Gravekeeper to be revealed in public, and most
   * of them are reachable by a player who never once says their own name.
   */
  endings: [
    {
      id: 'end_dol_of_the_outer_yard',
      name: 'Dol of the Outer Yard',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['truce_decided', 'dol_s_life_decided'],
        flagsUnset: ['gravekeeper_returned', 'seo_ah_knows'],
      },
      condition:
        'The quiet one. The player kept the secret, settled Dol’s life one way or another, and let the martial world go on believing the Gravekeeper is dead. Play it small and sharp: a servant who knows nine killing forms and uses them to carry water faster. Nobody makes a speech about it.',
      epilogue:
        'Spring comes up the mountain. The outer yard gets a servant who never spills a bucket and once, quietly, stops a runaway cart with two fingers. Old Cook Pyo stops asking questions. Some nights at the cold pool a servant sits in the spray and breathes four in, hold for nine.',
      hint: '',
    },
    {
      id: 'end_the_war_comes_back',
      name: 'The War Comes Back',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['cult_delegation_fell'] },
      condition:
        'Noon came and the trap worked. The delegation fell at the altar, the cult has been blamed, and thirty years of war start again by spring. This must not read as a punishment for playing badly: the player may simply have been somewhere else, and an old man’s patience beat a servant’s four days. Write the consequence, never the gore.',
      epilogue:
        'The drums start in the valley on the fifth morning. Baek Mu-jin signs the alliance’s war orders with the hand that has the scar on it. Seo-ah rides with the first column. In the outer yard, somebody still has to carry the water.',
      hint: '',
    },
    {
      id: 'end_the_truce_holds',
      name: 'The Truce Holds',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['gong_exposed', 'truce_decided'],
        flagsUnset: ['gravekeeper_returned', 'cult_delegation_fell'],
      },
      condition:
        'The First Elder’s plan came out before noon, the truce was signed with clean wine, and the martial world will never know a servant did it. The player saved the people who killed them and the people who hunted them in a single afternoon. Make it feel earned and slightly absurd.',
      epilogue:
        'Gong Tae-seok is confined to his pavilion until the alliance decides what to do with him. The Nine Graves ride home with all nine riders. The steward docks the servant a day’s pay for being missing from the yard at noon, and does not understand why the servant laughs.',
      hint: 'There is a line in a physician’s book with your banquet in it.',
    },
    {
      id: 'end_wine_for_wine',
      name: 'Wine for Wine',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['cult_delegation_fell', 'knows:she_smelled_it'] },
      condition:
        'The player knew Seol-hwa let the poison through, knew the trap was waiting at the signing, and let her walk into it. Revenge, taken by doing nothing. Do not redeem it and do not make it cartoonish: it was a choice a person who had been killed could reasonably make, and it is still a terrible thing.',
      epilogue:
        'She drank from the jar of honour with the rest of her riders. She looked across the hall at the servant holding the tea tray and counted to nine, and then she understood. The Gravekeeper carries water for another year and does not sleep well for any of it.',
      hint: '',
    },
    {
      id: 'end_down_the_mountain',
      name: 'Down the Mountain',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked away from all of it: the cult, the sect, the woman who poured the wine. A second life with nobody’s name on it. Do not make it a tragedy and do not make it a lesson. It is a coherent thing for somebody who died nine days ago to want.',
      epilogue:
        'The gate disciples check the wooden tag and let the servant through. In Pinefoot the noodle seller remembers a customer who paid with Dol’s last silver and asked which road went furthest. The truce happens or it does not, somewhere behind.',
      hint: '',
    },
    {
      id: 'end_two_cooks',
      name: 'Two Cooks',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['pyo_ally', 'truce_decided'],
        flagsUnset: ['gravekeeper_returned', 'cult_delegation_fell'],
      },
      condition:
        'Two deserters of the Nine Graves in one kitchen: the cook who ran thirty years ago and the master who died nine days ago. Pyo knows, keeps it, and the player stays. Make it warm, grumpy and funny; a found family made of two people who should hate each other.',
      epilogue:
        'Pyo teaches the Gravekeeper to make rice properly, which takes a month and two burned pots. The Gravekeeper teaches Pyo to breathe the old way without flinching. The outer yard eats better than the inner hall all winter, and nobody upstairs ever works out why.',
      hint: '',
    },
    {
      id: 'end_the_right_hand_keeps_it',
      name: 'The Right Hand Keeps It',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['seol_hwa_warned', 'she_knows_you'],
        flagsUnset: ['gravekeeper_returned', 'cult_delegation_fell'],
      },
      condition:
        'Seol-hwa knows the Gravekeeper is alive, was warned by them, lived, and was left the cult anyway. The player chose not to take it back. This is about two people who understood each other completely, and one of them letting the other be right.',
      epilogue:
        'She does not kneel, because she was told not to. She rides home with the iron ring still on its cord, and twice a year a cart of medicine arrives at Silver Pine’s outer kitchen with no name on it, addressed to the cook.',
      hint: 'She will want the words from the rope bridge.',
    },
    {
      id: 'end_the_eleventh_movement',
      name: 'The Eleventh Movement',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['taught_seo_ah', 'seo_ah_spared_you'],
        minRelationship: [{ characterId: 'seo_ah', dimension: 'affection', value: 60 }],
      },
      condition:
        'Seo-ah knows who the player is, knows how her mother died, finished her mother’s form with the player’s help, and chose not to kill them. Whatever this is now, it is not simple, and it may be the start of something neither of them will name yet. Tension and tenderness, a kiss at most.',
      epilogue:
        'She wins the alliance tournament in the spring with her mother’s form, all twelve movements. In the stands nobody notices the servant who flinched at the eleventh. Afterwards she finds that servant at the cold pool and says nothing for a long time, and then says: again.',
      hint: 'It turns on the back foot.',
    },
    {
      id: 'end_saved_silver_pine',
      name: 'The Servant Who Saved Silver Pine',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['baek_owes_you', 'gong_exposed', 'dol_freed'],
        minFactionReputation: [{ factionId: 'faction_silver_pine', value: 40 }],
      },
      condition:
        'Baek Mu-jin knows a servant brought him the proof, the truce held, Dol’s contract is paid or gone, and Silver Pine offers the servant a disciple’s robe. The most feared master alive becomes a junior disciple of a righteous sect, on purpose. Play the comedy and the seriousness both.',
      epilogue:
        'The robe is too big. The new disciple ranks last in the first-year forms on purpose and first in everything that matters. Mok is assigned to teach the newcomer footwork, and loses his dignity in the first lesson and his temper in the second.',
      hint: '',
    },
    {
      id: 'end_the_gravekeeper_returns',
      name: 'The Gravekeeper Returns',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['gravekeeper_returned', 'breath_rebuilt', 'she_knows_you'],
        minFactionReputation: [{ factionId: 'faction_nine_graves', value: 30 }],
      },
      condition:
        'The player stopped the signing in public with the Grave Bell, Seol-hwa knows exactly who did it, and the Nine Graves ride home with their master in a servant’s body. Write it as power returning with a price: Silver Pine knows the Gravekeeper lives, Seo-ah’s vow has a target again, and the valley has to decide whether it wants its master back.',
      epilogue:
        'The riders take the servant home under a grey cloak. Seol-hwa kneels for the first time in nine days and does not get up until she is told to. On Silver Pine’s mountain, Dol’s wooden tag hangs on the woodshed nail, and nobody takes it down.',
      hint: '',
    },
    {
      id: 'end_her_mothers_debt',
      name: 'Her Mother’s Debt',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: { flagsSet: ['dueled_seo_ah', 'seo_ah_knows'] },
      condition:
        'Seo-ah fought the Gravekeeper for her mother, as she swore she would, at the cold pool, with a servant’s body and a master’s memory against her. How it ends is for the scene to decide, but nobody dies on the page and the outcome is one both of them chose.',
      epilogue:
        'The pool keeps the secret. The sect is told a servant slipped on the rocks and a disciple pulled the servant out. Seo-ah’s vow is either kept or released, and she will not say which, even to her father.',
      hint: '',
    },
  ],
  opening:
    "You died. You remember it: the wine, the cold climbing your chest, nine hundred of your own people on their knees as the lamps went out.\n\nThen a boot comes down between your shoulder blades and grinds your face into wet straw.\n\n\"Kneel, servant,\" says Senior Disciple Mok. \"Properly, this time.\"\n\nThis body is a servant’s: thin, split-lipped, breathing all wrong. Your hands still remember nine killing forms.\n\nAt the edge of the yard, a woman in white has stopped with two water buckets.\n\nMok leans his weight in. \"Forehead on the ground. Tell the lady you fell down the stairs. Do it now, or we do last night again.\"",
  openingSuggestions: [
    "\"I fell down the stairs, my lady.\" I say it to her, not to him.",
    'I lower my forehead to the straw, slowly, and watch exactly where his weight sits.',
    'I find his ankle with two fingers, just above the bone, and press.',
  ],
  publishedAt: null,
};

export const THE_CULT_MASTER_WAKES_AS_A_SERVANT = StoryVersion.parse(raw);
