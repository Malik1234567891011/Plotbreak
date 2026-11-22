import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Zombie Who Said Please" — you died last night, and kept your manners.
 *
 * The structural bet is that the monster is the player and the danger is
 * everybody else's arithmetic. A woman with a crossbow did not shoot because
 * the grey at the wire said please, and that one word is the whole opening:
 * the player is asked to say something else, now, with a bolt resting on a
 * chest that is not beating under it.
 *
 * What keeps it a game rather than a sad joke is that being a grey is a
 * capability. The other greys ignore you, so you are the only person in the
 * valley who can walk into the dead town for medicine, up the north road into
 * the crowd that is coming, or into the hospital where your wristband came
 * from. Everybody at the Lock has worked that out within an hour, and each of
 * them wants something from you: Cole wants a tool he can count, Doc Amari
 * wants your blood for a reason under her sleeve, Ivo Kade wants to sell you
 * at the coast, and Sunny Abara wants to give you a call sign. Jessa only
 * wants to know whether there is still somebody in there, and she has a
 * private reason for needing the answer to be yes.
 *
 * The clock is the Horde: about four thousand greys that reach the water at
 * dawn on the third day whatever the player does, and the camp is safe only as long
 * as the weir runs. It is walking towards the nine o'clock tone Sunny sends on
 * the old repeater, which nobody knows yet. Five things can be done about it
 * and one of them is joining it, written as a choice rather than a failure.
 *
 * Trial Nine is the optional mystery. It opens only for a player who looks at
 * their own wristband, the way Platform 11 opens only for somebody who goes
 * looking, and most of the ending space never needs it.
 *
 * 13+, and the rules for that are mechanical rather than a note: the hunger
 * is for warmth, never flesh; horror is posture, sound and temperature; a bite,
 * if one happens, happens off the page. Everybody in the story is an adult,
 * every grey included, and all of that is in hardCanon, where production reads it.
 *
 * The same goes for the grey's own rules. `runTurnPure` never sees resources,
 * step notes or the ability list beyond the chosen archetype's starting
 * abilities, so clarity, hunger, alarm and the dead strength are spelled out in
 * hard canon, the wristband is the quest item everybody starts holding, and
 * every archetype starts with Walk Among Them, the capability the whole camp
 * wants from the player, plus the one thing their old job taught them.
 *
 * Three variables. Clarity is the only GOOD_HIGH, because `resolveRest`
 * refills those and sitting somewhere cold and quiet really is how a grey gets
 * its mind back. Alarm is first among the descending pair because
 * PUBLIC_VIOLENCE and the generic cost path both take the first GOOD_LOW in
 * array order, and a grey seen fighting should frighten the camp, not make
 * the player hungrier. Hunger rises on its own and comes down only with heat.
 */

const raw = {
  id: 'sv_the_zombie_who_said_please_1',
  storyId: 'story_the_zombie_who_said_please',
  version: 1,
  title: 'The Zombie Who Said Please',
  fantasyLabel: 'You died. You kept your manners.',
  hook: 'You wake up dead, grey and still thinking, and the only lights for miles belong to a survivors’ camp whose best shot has a crossbow bolt resting on your chest.',
  premise:
    'The grey took the cities two years ago. The people it takes stop talking, stop feeling the cold and start walking, and nobody it has taken has ever come back.\n\n' +
    'You died some time last night, in a ditch by a canal. This morning you woke up anyway. Your skin is grey, your heart is not beating, and you are still thinking, which is supposed to be impossible.\n\n' +
    'You walked to the only lights for miles: a survivors’ camp on a canal lock, behind water and wire. At the fence you said the one word you could find. Please.\n\n' +
    'The woman on watch has a crossbow on your chest and has not fired, because no grey has ever said please before. The man who runs the camp wants you shot, sold or useful, in that order. The camp doctor wants your blood, and she is hiding something under her sleeve.\n\n' +
    'The other greys ignore you. You can walk through a crowd of them unharmed, and you can hear them: a murmur made of the last thing each of them ever said. Four thousand of them are coming down the valley now, and they will reach the water in two days.\n\n' +
    'You need to make the living trust you before then. You also need to keep yourself in check, because you are hungry, and what you are hungry for is warmth, and the warmest things for miles are people.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Horror', 'Survival', 'Comedy', 'Drama'],
  mechanicsChips: [
    'The dead ignore you',
    'Hungry for warmth',
    'Four thousand, two days out',
    'The camp can vote you out',
    'Your blood might be a cure',
  ],
  contentDescriptors: ['HORROR', 'FANTASY_VIOLENCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can talk your way through the wire, walk into a dead town for medicine nobody else can reach, sell yourself to a river trader, or walk off and join the crowd coming down the valley. The camp can vote you out. The doctor will ask your permission for everything. Any one of those can be the whole game, and the only rule is that you are the one who decides what to do about the hunger.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_wire',
    startWorldMinute: 6 * 60 + 10,
    startingItems: [{ itemId: 'wristband', qty: 1 }],
    hardCanon: [
      'The grey is an infection that took the cities two years ago. The people it takes, called greys, stop speaking, run cold, and walk towards warmth and sound. A bite or a deep scratch passes it on. Most people go grey within a day; a few run colder for weeks first.',
      'The player died last night and woke this morning as a grey who can still think, speak and choose. Nobody, including the player, knows why. Their heart does not beat and their skin is cold to the touch.',
      'Other greys ignore the player and treat them as one of their own. The player can walk among them unharmed, and can hear them as a murmur made of the last things they said.',
      'Being a grey gives the player a cold body and the Horde’s indifference, nothing supernatural: the player cannot fly, vanish, read minds or walk through walls, and neither can anybody else. If the player tries something impossible, it does not happen; one plain line says so, and the scene goes on from where the player stands.',
      'The player is hungry for warmth: fires, hot water, and living people, who are the warmest things around. The pull is real and grows when they are cold. It is never an appetite for flesh, and the player always decides what to do with it. They can feel from across a room who is feverish and who is running cold.',
      'Kestrel Lock is a canal-lock island holding thirty-eight survivors behind water and wire. Greys will not cross running water while the weir runs. The camp rule is that nothing grey crosses the footbridge.',
      'Being a grey runs on three things the prose shows and no meter does. Clarity is how much of the player is driving: every hard thing costs a little of it, an hour somewhere cold and quiet brings it back, and when it runs out the player goes grey for a while, losing words and drifting towards the nearest warmth. Hunger rises on its own as the player gets colder, and only heat brings it down: a fire, or one of the hot water bottles filled from the kettle in the lock-keeper’s cottage. Alarm is the camp’s fear of the player, which eases on its own as people get used to them and jumps whenever they fight or show their teeth.',
      'A grey body is slow, strong and very hard to stop. The player can put their whole cold weight into a winch, a gate or a weir paddle that two living people cannot shift, and barely feels a blow. It costs them warmth, and warmth is what they are short of.',
      'The Horde, about four thousand greys, is walking down the valley towards the Lock and will reach the water at dawn on the third day, about two days from now, unless something changes its course. It is walking towards something. A grey who learns what can walk at its front and become the thing it follows instead.',
      'The player wears a hospital wristband printed ST IDE’S / TRIAL 9 / 31 with the name scratched off. What it means is discoverable, and is never pushed on a player who does not go looking.',
      'Everybody in this story is an adult: the thirty-eight at the Lock, Ivo’s crew, every grey in Wexley, St Ide’s and the valley, and every voice in the murmur. Nobody in it is under eighteen. Jessa Marlow is twenty-four, Doc Amari forty-one, Cole Garrity forty-six, Sunny Abara twenty and Ivo Kade thirty-five, and the player had years of working life behind them before they died. Nobody here is a villain; Cole, Doc Amari and Ivo Kade each want something from the player for a reason they could defend.',
      'Greys are hard to stop. A crossbow bolt slows the player without ending them, and they barely feel it. The Lock would rather net, chain and study something new than kill it: whoever goes for somebody at the wire takes a bolt in the shoulder and is dragged in for the doctor anyway.',
      'Nobody in this story is ever shown wounded, bitten, bleeding or eaten. A bite always happens off the page and is told only by what it costs afterwards. Any other hurt, the player’s included, gets one plain line about the moment and never a description of the wound.',
      'Romance in this story goes no further than one kiss, on the page or off it. Nobody goes to bed with anybody, and no scene cuts away to imply it.',
    ],
    toneGuide:
      'Dark comedy with a warm, stubborn heart. The joke is that the only polite person left in the valley is dead, and the joke never gets in the way of the fear or the grief. ' +
      'Horror lives in posture, sound and temperature, never in wounds: greys are described by how they stand, what they hum and how cold they are. No gore, ever. A bite, if one happens, happens off the page and is told by what it costs afterwards. ' +
      'The player’s hunger is for warmth. It is in the room whenever people are, and it is written as a pull towards a fire on a winter night, never as appetite. ' +
      'Nobody at the Lock is a villain. Cole is right about the arithmetic, Doc is right about the cure, Ivo is honest about his prices, and all three want something from the player. ' +
      'Small physical detail carries everything: cold hands on a mug nobody offered, tally marks on a crossbow, a hot water bottle held against a chest like contraband. Romance, if it happens, is slow and careful and goes no further than a kiss. The face at the top of a beat is Jessa’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Doc Amari puts the tray on the pump-house floor, well out of your reach, and sits down on an upturned bucket.\n\n\"May I?\" she says.\n\nShe means your arm. She has asked three times now, and every time she waits for the answer as if it matters.\n\nYou hold it out.\n\nThe needle goes in. Nothing comes out. Then something dark and slow creeps into the vial, and she watches it the way other people watch weather.\n\n\"Cold,\" she murmurs. \"Of course it’s cold.\"\n\nHer own sleeve has ridden up. She tugs it down before you can look.",
      "The high street is full of them.\n\nThey stand in the shop doorways and at the bus stop, facing nothing, swaying like people waiting for a bus that stopped coming two years ago.\n\nYou walk straight down the middle of the road. Not one head turns.\n\nThe radio on your shoulder crackles. Sunny, whispering for no reason, because he is a mile away. \"Polite One, Polite One. Are they looking at you? Over.\"\n\n\"No.\"\n\n\"That is the best thing I have ever heard. Chemist on your left, blue sign. Please don’t die. Over.\"\n\n\"Already did.\"\n\nThe radio makes a noise like a man trying not to laugh in church.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 13, agility: 9, mind: 11, presence: 10, resolve: 12, arcana: 12 },
  skills: [
    { id: 'persuasion', name: 'Manners', attribute: 'presence', description: 'Being so reliably polite that people stop reaching for the crossbow. Persuasion, by the only means you have left.' },
    { id: 'deception', name: 'Passing for Alive', attribute: 'presence', description: 'Blinking on purpose, breathing where people can see it, and lying warmly.' },
    { id: 'menace', name: 'Menace', attribute: 'might', description: 'Letting people see exactly what you are, on purpose, when that helps.' },
    { id: 'fighting', name: 'Fighting', attribute: 'might', description: 'What a body that no longer flinches does in a scrap: slow, strong and very hard to stop.' },
    { id: 'stealth', name: 'Shamble', attribute: 'agility', description: 'Moving like a grey: unhurried, head tilted, nothing worth a second look.' },
    { id: 'insight', name: 'Grey Sense', attribute: 'arcana', description: 'The murmur, the warmth in a room, and knowing what a grey will do before it does it.' },
    { id: 'mechanics', name: 'Know-how', attribute: 'mind', description: 'Gates, winches, pumps, generators and weir paddles, and what is actually wrong with them.' },
    { id: 'stillness', name: 'Stillness', attribute: 'resolve', description: 'Not moving when every part of you wants to lean towards the warm thing.' },
    { id: 'scrounging', name: 'Scrounging', attribute: 'mind', description: 'Finding what is still useful in a dead town, and guessing where somebody would have kept it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Clarity is how much of the player is driving. It is the GOOD_HIGH one
   * because rest should restore it and nothing else, and because the generic
   * cost path spends it, which is right: every hard thing a grey does costs it
   * a little of its mind.
   *
   * Alarm is the camp's fear of the player, first among the descending pair on
   * purpose. It falls on its own as people get used to them, and it jumps when
   * they fight or show their teeth.
   *
   * Hunger rises on its own, because a grey is always getting colder, and only
   * heat brings it down: the hot water bottles in the cottage kitchen.
   */
  resources: [
    {
      id: 'clarity',
      name: 'Clarity',
      max: 100,
      start: 72,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player goes grey for a while. Words stop arriving, the murmur gets loud, and their body starts walking towards the nearest warmth on its own. The people around them can see it happen, and what they do about it says a great deal about them.',
      color: '#9FB8AD',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Barely driving. Sentences come out in fragments, some of them borrowed from the murmur, and the player loses seconds at a time staring at warm things. This is the band where the camp reaches for the crossbow, and where sitting somewhere cold and quiet for an hour is the strongest move available.',
        },
        {
          upTo: 55,
          behaviour:
            'Foggy at the edges. The player can hold a conversation and lose the end of it, forgets a word and finds a different one, and has to concentrate to blink on purpose. Fine for one hard task and honest about not being good for two.',
        },
        {
          upTo: 100,
          behaviour:
            'Sharp, present and unnervingly polite. The player can banter, bargain and plan, catch the detail in a room that nobody else noticed, and pass for living in poor light. Scenes can be long and funny and can go somewhere.',
        },
      ],
    },
    {
      id: 'alarm',
      name: 'Alarm',
      max: 100,
      start: 55,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody at the Lock flinches when the player walks past any more. Somebody has knitted them a hat. Without anybody voting on it, they have become part of the furniture.',
      color: '#C96F53',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The camp is used to the player. People pass them a mug without thinking, make jokes about the cold, and forget to bolt the pump house. Asking for things works, and being trusted with a job is normal.',
        },
        {
          upTo: 55,
          behaviour:
            'Wary and watching. People are civil and keep a table between themselves and the player, conversations stop when they walk in, and somebody always knows where the crossbow is. Most of the story lives here, and it is survivable.',
        },
        {
          upTo: 80,
          behaviour:
            'Frightened. Doors are bolted, people move in pairs, and Cole has the votes to do whatever he decides. Every sudden movement the player makes is answered by three people reaching for something heavy.',
        },
        {
          upTo: 100,
          behaviour:
            'Panic. Somebody is going to try something tonight, whether or not Cole agrees, and the player can hear them planning it through the pump-house wall. Only somebody brave and well liked can talk the island down.',
        },
      ],
    },
    {
      id: 'hunger',
      name: 'Hunger',
      max: 100,
      start: 30,
      regenPerHour: 1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The player is as warm as a grey can be, which is lukewarm, and the pull towards people is quiet enough to ignore. It does not last.',
      color: '#7C8B9A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Recently warmed. A hot water bottle or a fire has taken the edge off, the pull towards people is background noise, and the player can sit in a crowded room without counting exits. This is the band to have hard conversations in.',
        },
        {
          upTo: 60,
          behaviour:
            'Cold and aware of it. The player notices every warm hand, every steaming mug, the heat coming off whoever is standing nearest. Nothing is dangerous yet, and sitting close to somebody is a decision rather than a reflex.',
        },
        {
          upTo: 85,
          behaviour:
            'The pull is loud. Warm people look like fires on a winter night, the player’s hands drift towards them without being told, and holding still takes visible effort. Everybody in the room can tell, and the frightened ones step back.',
        },
        {
          upTo: 100,
          behaviour:
            'Starving for heat. The player’s body is leaning towards the nearest living person and the mind is barely keeping up. Something will happen in the next few minutes unless somebody gets them to a fire or they get themselves away from people.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'wristband',
      name: 'The Hospital Wristband',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A white plastic hospital band on your left wrist, printed ST IDE’S / TRIAL 9 / 31. The name has been scratched off with something sharp. It will not come off without cutting.',
      loreText: 'Trial Nine was a vaccine study at St Ide’s Hospital in the first month of the grey: forty volunteers on the fourth floor. Nobody at the Lock has heard of it, except the doctor, who has.',
      icon: 'band',
    },
    {
      id: 'hot_water_bottle',
      name: 'A Hot Water Bottle',
      tags: ['comfort'],
      stackable: true,
      maxStack: 3,
      consumable: { resourceId: 'hunger', amount: -25, consumesItem: true },
      description: 'A rubber hot water bottle in a knitted cover, filled from the kettle in the cottage. Held against your chest it is the best thing you have felt since you died.',
      loreText: 'The cover was knitted by somebody at the Lock who would rather it was not known that they made one for you.',
      icon: 'bottle',
    },
    {
      id: 'chemist_box',
      name: 'The Chemist’s Box',
      tags: ['quest', 'medical'],
      questItem: true,
      description: 'A plastic crate of antibiotics, dressings and fever tablets from the locked cabinet at the back of the chemist’s on Wexley High Street. Enough to carry the Lock through a winter.',
      loreText: 'Cole has wanted this box for two years and has lost three people trying to fetch it. A grey can walk in past the pharmacist and pick it up.',
      icon: 'crate',
    },
    {
      id: 'doc_casebook',
      name: 'Doc Amari’s Casebook',
      tags: ['document'],
      skillModifiers: { insight: 1 },
      description: 'A thick ring binder of notes in small, careful handwriting: every patient at the Lock, every grey she has ever studied through the wire, and, since this morning, eleven pages about you.',
      loreText: 'The pages before yours are a temperature log with no patient name on it, taken every morning for eleven days. Every number is lower than the one before.',
      icon: 'book',
    },
    {
      id: 'gate_log',
      name: 'The Gate Log',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'The watch log from the first night at the Lock, in Cole Garrity’s square capitals. It records who came over the footbridge, and when the gate was shut.',
      loreText: 'GATE SHUT 23:40. SIXTY-ONE OUTSIDE. The names are listed underneath. Halfway down is T. MARLOW, and beside it, in the same pen: not bitten.',
      icon: 'book',
    },
    {
      id: 'broadcast_log',
      name: 'Sunny’s Broadcast Log',
      tags: ['document'],
      description: 'A spiral notebook of every nightly call Sunny has sent on the old valley repeater: date, time, frequency, and in the margin what the greys at the wire did afterwards.',
      loreText: 'Night after night the margin says the same thing in shorter and shorter words. They turned south. Turned south. South again.',
      icon: 'papers',
    },
    {
      id: 'handset',
      name: 'Sunny’s Spare Handset',
      tags: ['tool'],
      skillModifiers: { insight: 1 },
      description: 'A yellow walkie-talkie with a cracked screen, tuned to the camp channel and, two clicks round the dial, to the old valley repeater.',
      loreText: 'At nine o’clock the repeater channel plays the tone the Horde has been following for two weeks. Hold it up and every grey in earshot turns towards your hand.',
      icon: 'radio',
    },
    {
      id: 'trial_ledger',
      name: 'The Trial Nine Ledger',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A hardbacked ledger from the nurses’ station on Ward Nine: forty volunteers, their doses, and the dates they were bitten. Number 31 has a name and an address, and a note in red ink: lucid after turning?',
      loreText: 'Number 12 has the same red note. The ward was abandoned before anybody followed either of them up.',
      icon: 'book',
    },
    {
      id: 'courier_map',
      name: 'A Courier’s Map of Wexley',
      tags: ['personal', 'document'],
      skillModifiers: { scrounging: 1 },
      description: 'A delivery map of the town folded soft, with every back alley, loading door and key-safe code marked in your own handwriting.',
      loreText: 'You marked which customers tipped. Most of them are still standing in their doorways.',
      icon: 'map',
    },
    {
      id: 'multitool',
      name: 'A Multitool',
      tags: ['tool'],
      skillModifiers: { mechanics: 1 },
      description: 'A heavy multitool on your belt with a bit for every bolt on a pumping station.',
      loreText: 'Your initials are scratched into the handle, which is more than you can say for the wristband.',
      icon: 'tools',
    },
    {
      id: 'penlight',
      name: 'A Nurse’s Penlight',
      tags: ['tool', 'medical'],
      skillModifiers: { insight: 1 },
      description: 'A penlight clipped to your pocket. You shone it in a thousand eyes over a dozen years of night shifts. You have not yet dared shine it in your own.',
      loreText: 'It still works. Your pupils, it turns out, still shrink from it. Nobody at the Lock has seen a grey do that.',
      icon: 'light',
    },
    {
      id: 'visitor_lanyard',
      name: 'A Visitor’s Lanyard',
      tags: ['personal'],
      skillModifiers: { deception: 1 },
      description: 'A lanyard with a laminated card that says VISITOR. It has got you into more places than it should have, and it might still.',
      loreText: 'People see a lanyard before they see a face. That was true when you were alive, and it is more useful now.',
      icon: 'card',
    },
    {
      id: 'door_torch',
      name: 'A Doorman’s Torch',
      tags: ['tool'],
      skillModifiers: { menace: 1 },
      description: 'A long steel torch, heavy enough to end an argument without ever being swung. The batteries still work, which is its own small miracle.',
      loreText: 'Nine years on a door taught you that the person holding the light decides who is in the dark.',
      icon: 'torch',
    },
  ],
  abilities: [
    {
      id: 'say_please',
      name: 'Ask Nicely',
      tags: ['social'],
      description: 'Be so plainly, stubbornly polite that people forget for a moment what they are talking to.',
      affordances: ['please', 'ask nicely', 'say please', 'thank them', 'apologise', 'introduce myself', 'be polite', 'keep talking'],
      costs: [{ resourceId: 'clarity', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'persuasion', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'show_yourself',
      name: 'Let Them Look',
      tags: ['social'],
      description: 'Stand still in good light and let somebody study your eyes, your hands and the band on your wrist until they have decided.',
      affordances: ['step back', 'show my hands', 'let her look', 'raise my hands', 'show my eyes', 'stand in the light', 'hold out my wrist'],
      costs: [{ resourceId: 'clarity', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'stillness', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'level_with_them',
      name: 'Tell It Straight',
      tags: ['social'],
      description: 'Say the true thing, however it lands, and stand there while it does.',
      affordances: ['tell the truth', 'be honest', 'tell her straight', 'tell him straight', 'admit it', 'confess', 'come clean'],
      costs: [{ resourceId: 'clarity', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'draw_a_line',
      name: 'Say No',
      tags: ['social'],
      description: 'Refuse, plainly, and make it clear the refusal is a decision rather than a malfunction.',
      affordances: ['refuse', 'say no', 'no thanks', 'not today', 'i won’t', 'keep away from me', 'turn it down'],
      costs: [{ resourceId: 'clarity', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_terms',
      name: 'Name Your Price',
      tags: ['social'],
      description: 'Turn being wanted into a negotiation: set conditions for what you will give, and say what you want back.',
      affordances: ['make a deal', 'bargain', 'negotiate', 'name my terms', 'set conditions', 'counter-offer', 'trade'],
      costs: [{ resourceId: 'clarity', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'persuasion', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pass_for_living',
      name: 'Pass for Living',
      tags: ['social'],
      description: 'Blink on purpose, breathe where they can see it, and tell a lie warm enough that somebody wants to believe it.',
      affordances: ['lie', 'pretend', 'bluff', 'act alive', 'pretend to breathe', 'say it is makeup', 'cover it up'],
      costs: [{ resourceId: 'clarity', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'deception', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'show_your_teeth',
      name: 'Show Your Teeth',
      tags: ['social'],
      description: 'Stop pretending to be harmless, and let somebody see exactly what is standing in front of them.',
      affordances: ['threaten', 'snarl', 'show my teeth', 'scare them', 'growl', 'loom over', 'stop pretending'],
      costs: [{ resourceId: 'alarm', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'menace', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_still',
      name: 'Hold Still',
      tags: ['survival'],
      description: 'Keep your hands where they are while every part of you leans towards the warm people in the room.',
      affordances: ['hold still', 'stay still', 'control myself', 'keep my hands to myself', 'fight the pull', 'breathe through it', 'stand my ground quietly'],
      costs: [{ resourceId: 'clarity', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'stillness', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hear_the_hum',
      name: 'Listen to the Murmur',
      tags: ['sight'],
      description: 'Close your eyes and let the greys’ murmur in, until the fragments start to make sense.',
      affordances: ['listen', 'listen to the murmur', 'listen to them', 'hear them', 'close my eyes and listen', 'what are they saying', 'listen for a voice'],
      costs: [{ resourceId: 'clarity', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'insight', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_warmth',
      name: 'Read the Warmth',
      tags: ['sight'],
      description: 'Feel how warm somebody is from across a room: who is feverish, who is frightened, who is running colder than they should.',
      affordances: ['feel the warmth', 'sense her', 'how warm is she', 'read her', 'smell the fever', 'tell who is sick', 'notice the cold'],
      costs: [{ resourceId: 'hunger', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'insight', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_among_them',
      name: 'Walk Among Them',
      tags: ['movement'],
      description: 'Walk into a crowd of greys as one of them, slow and unhurried, and come out the other side.',
      affordances: ['walk among them', 'walk through them', 'go among the greys', 'blend in', 'shamble', 'walk out there', 'go into the crowd'],
      costs: [{ resourceId: 'hunger', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'stealth', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'scrounge',
      name: 'Scrounge',
      tags: ['utility'],
      description: 'Go through a dead building properly and find what is still worth carrying.',
      affordances: ['search', 'scavenge', 'loot', 'look for supplies', 'find medicine', 'go through the shelves', 'raid the chemist'],
      costs: [{ resourceId: 'clarity', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'scrounging', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'dead_lift',
      name: 'Dead Lift',
      tags: ['utility'],
      description: 'Put your whole cold weight into the job: a gate, a winch, a weir paddle, a car across a road.',
      affordances: ['lift', 'carry', 'push', 'force it', 'wind the winch', 'open the paddles', 'drag it', 'fix the gate', 'flood the lock'],
      costs: [{ resourceId: 'hunger', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'mechanics', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'give_blood',
      name: 'Roll Up Your Sleeve',
      tags: ['healing'],
      description: 'Hold out your arm and let Doc Amari take what she needs, knowing she will not stop asking what it means.',
      affordances: ['give blood', 'roll up my sleeve', 'offer my arm', 'let her take a sample', 'let her test me', 'hold out my arm'],
      costs: [{ resourceId: 'clarity', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lead_them',
      name: 'Lead the Horde',
      tags: ['movement'],
      description: 'Walk to the front of four thousand greys and make yourself the thing they follow instead of the tone.',
      affordances: ['lead them', 'call them', 'draw them away', 'make them follow me', 'turn the horde', 'walk them north', 'take them away'],
      costs: [
        { resourceId: 'clarity', amount: 15 },
        { resourceId: 'alarm', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'insight', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['horde_understood'],
        lockedCopy:
          'They are a sound in your head and a smudge up the valley. You do not know yet what they are walking towards, so you cannot be the thing they walk towards instead.',
      },
    },
    {
      id: 'answer_the_hum',
      name: 'Answer the Murmur',
      tags: ['survival'],
      description: 'Walk into the crowd and let it take you in, holding on to your own mind inside it. It is warm in there. Everyone in it says so.',
      affordances: ['answer them', 'go to them', 'join them', 'go home to them', 'walk into the horde'],
      costs: [{ resourceId: 'clarity', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['heard_the_horde'],
        lockedCopy: 'There is nothing out there to answer yet. Only wind over the canal, and your own cold hands.',
      },
    },
  ],
  locations: [
    {
      id: 'the_wire',
      name: 'The Wire',
      shortName: 'The Wire',
      description:
        'The landward fence of Kestrel Lock: chain-link and pallets strung with tin cans, a scaffold watchtower, and a single mesh gate onto a footbridge that winches up at night. Whoever comes to the gate stands close enough to touch through it. Two years of greys have leaned on this wire. The ground in front of it is trodden flat and grey with ash from the burn barrels.',
      artDirection:
        'Chain-link fence beside a canal at dawn, tin cans strung along the wire, a scaffold watchtower, a raised wooden footbridge behind, mist on black water, two burn barrels. Cold blue light with one warm lamp.',
      connections: [
        { to: 'lock_yard', travelMinutes: 2, label: 'Through the gate and over the footbridge' },
        { to: 'the_towpath', travelMinutes: 3, label: 'Along the outside of the fence' },
        { to: 'wexley_high_street', travelMinutes: 25, label: 'Down the lane into the dead town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'lock_yard',
      name: 'Kestrel Lock',
      shortName: 'The Lock',
      description:
        'A long island between the canal and the river, with the lock chamber down the middle, two narrowboats tied up, a cook fire under a tarpaulin and washing on a line. Thirty-eight people live here, and every one of them knows exactly where you are standing.',
      artDirection:
        'A narrow canal-lock island at morning, a stone lock chamber, two painted narrowboats, a tarpaulin over a cook fire, washing lines, a brick pump house and a cottage. Crowded, patched, lived in.',
      connections: [
        { to: 'the_wire', travelMinutes: 2, label: 'Back over the footbridge to the gate' },
        { to: 'the_pump_house', travelMinutes: 1, label: 'The brick pump house' },
        { to: 'the_cottage', travelMinutes: 1, label: 'The lock-keeper’s cottage' },
        { to: 'the_infirmary', travelMinutes: 2, label: 'The old boathouse' },
        { to: 'the_radio_shed', travelMinutes: 2, label: 'The shed on stilts with the aerial' },
        { to: 'the_weir', travelMinutes: 3, label: 'Down to the weir' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_pump_house',
      name: 'The Pump House',
      shortName: 'Pump House',
      description:
        'A cold brick room with a dead beam engine taking up most of it, one high barred window, and a door that bolts from the outside. It is where the camp keeps things it is not sure about. Somebody has put a blanket on the floor for you, folded, which is either a kindness or a test.',
      artDirection:
        'Interior of a small Victorian brick pump house, a huge rusted beam engine, one barred window high up letting in grey light, a folded blanket on stone flags, a heavy door. Cold, echoing, oddly peaceful.',
      connections: [{ to: 'lock_yard', travelMinutes: 1, label: 'Out into the yard, if the door is open' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_cottage',
      name: 'The Lock-Keeper’s Cottage',
      shortName: 'The Cottage',
      description:
        'Cole’s office at the front, with a desk, a radio and a shelf of ledgers; the camp kitchen at the back, with the only proper stove on the island and a kettle that is always on. It is the warmest room for half a mile, which you notice the moment you step inside.',
      artDirection:
        'A small whitewashed lock-keeper’s cottage, a cluttered front office with ledgers and a radio, a back kitchen with a cast-iron stove glowing, a steaming kettle, mugs on hooks. Golden, warm, tempting.',
      connections: [{ to: 'lock_yard', travelMinutes: 1, label: 'Back out into the yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'hot_water_bottle', qty: 2, ownerId: null, aka: ['hot water bottle', 'the bottle', 'something warm', 'a hot water bottle'] },
        { itemId: 'gate_log', qty: 1, ownerId: 'cole', aka: ['gate log', 'the watch log', 'the old log book', 'the logbook'] },
      ],
    },
    {
      id: 'the_infirmary',
      name: 'Doc’s Boathouse',
      shortName: 'Infirmary',
      description:
        'A boathouse turned into a clinic: two camp beds, a fridge that runs off the generator, a borrowed college microscope, and a whiteboard covered in Doc’s handwriting about you. It smells of disinfectant and wet wood.',
      artDirection:
        'A converted wooden boathouse clinic, two camp beds, a humming fridge, a microscope on a workbench, a whiteboard dense with notes and arrows, river light through slatted walls. Clean, improvised, earnest.',
      connections: [{ to: 'lock_yard', travelMinutes: 2, label: 'Back up the slipway to the yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'doc_casebook', qty: 1, ownerId: 'doc', aka: ['casebook', 'her notebook', 'doc’s notes', 'the binder'] },
      ],
    },
    {
      id: 'the_radio_shed',
      name: 'The Radio Shed',
      shortName: 'Radio Shed',
      description:
        'A shed on stilts at the end of the island with a tall aerial lashed to it, a bench of radios in various states of repair, and a generator that thumps like a heart. A board on the wall lists everybody’s call sign. There is already a space with yours.',
      artDirection:
        'A ramshackle wooden shed on stilts over reeds, a tall radio aerial, a workbench crowded with radios and wires, a call-sign board in marker pen, a generator outside. Cluttered, cosy, buzzing.',
      connections: [{ to: 'lock_yard', travelMinutes: 2, label: 'Down the ladder to the yard' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'broadcast_log', qty: 1, ownerId: 'sunny', aka: ['broadcast log', 'his log', 'the radio log', 'the call book'] },
        { itemId: 'handset', qty: 1, ownerId: 'sunny', aka: ['handset', 'the spare radio', 'the walkie-talkie', 'a radio'] },
      ],
    },
    {
      id: 'the_weir',
      name: 'The Weir',
      shortName: 'Weir',
      description:
        'Where the river drops over a concrete sill beside the island, loud and white. Four iron paddles control how much water runs round the Lock; open all four and the island becomes a moat no grey will cross. Cole checks them himself every night.',
      artDirection:
        'A river weir in a white rush beside a canal island, four iron sluice paddles with wheel winches, a narrow walkway with a railing, spray and evening light. Loud, powerful, precarious.',
      connections: [
        { to: 'lock_yard', travelMinutes: 3, label: 'Back up to the yard' },
        { to: 'ferry_landing', travelMinutes: 6, label: 'Down the weir steps to the landing' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'ferry_landing',
      name: 'The Ferry Landing',
      shortName: 'Landing',
      description:
        'A stone landing below the weir where the Ferrymen tie up their barge: a long black hull with a wheelhouse, diesel drums on the deck, a striped awning and a brazier. Everything aboard is for sale, and Ivo says even the price of passage is negotiable.',
      artDirection:
        'A stone river landing below a weir, a long black working barge with a wheelhouse and a striped awning, diesel drums, a glowing brazier, ropes and fenders. Busy, smoky, mercantile.',
      connections: [
        { to: 'the_weir', travelMinutes: 6, label: 'Up the weir steps to the Lock' },
        { to: 'the_towpath', travelMinutes: 10, label: 'Along the bank to the towpath' },
        { to: 'wexley_high_street', travelMinutes: 15, label: 'Downriver on the barge to the town quay' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_towpath',
      name: 'The Towpath',
      shortName: 'Towpath',
      description:
        'The canal path outside the wire, running north between hedges and black water. Greys stand along it in ones and twos, facing the Lock and swaying. They do not look at you. They look past you, at the warm lights.',
      artDirection:
        'A canal towpath at grey morning, hawthorn hedges, black water, a few distant grey-skinned figures standing still facing a lit fence. Quiet, cold and eerie, nothing graphic.',
      connections: [
        { to: 'the_wire', travelMinutes: 3, label: 'Back along the fence to the gate' },
        { to: 'ferry_landing', travelMinutes: 10, label: 'Down the bank to the landing' },
        { to: 'the_north_road', travelMinutes: 30, label: 'North, up the valley' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_north_road',
      name: 'The North Road',
      shortName: 'North Road',
      description:
        'The valley road out of the hills, lined with abandoned cars nose to tail under a motorway bridge. This is the way the Horde is coming. On a still day you can feel it through the tarmac before you can hear it.',
      artDirection:
        'A valley road jammed with abandoned cars, a concrete motorway bridge overhead, hills under low cloud, a grey haze far up the road. Empty, tense, enormous.',
      connections: [
        { to: 'the_towpath', travelMinutes: 30, label: 'Back down to the canal' },
        { to: 'the_cutting', travelMinutes: 90, label: 'Nine miles up the valley' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_cutting',
      name: 'The Railway Cutting',
      shortName: 'The Cutting',
      description:
        'A deep railway cutting nine miles north, walls of wet rock either side, filled from end to end with greys standing shoulder to shoulder and humming. When the tone comes at nine o’clock, every head in it turns south at once.',
      artDirection:
        'A deep railway cutting between wet rock walls, rusted tracks, thousands of distant grey-clad figures standing shoulder to shoulder, all heads tilted the same way, dusk. Vast, eerie, quiet.',
      connections: [{ to: 'the_north_road', travelMinutes: 90, label: 'Back down the valley' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: -2 },
      takeableItems: [],
    },
    {
      id: 'wexley_high_street',
      name: 'Wexley High Street',
      shortName: 'High Street',
      description:
        'A dead market town a mile down the lane: shop fronts with the glass gone, a bus shelter, bunting still up from a summer fair two years ago. Greys stand in the doorways where they used to work, facing the street, as if waiting to open.',
      artDirection:
        'A small market-town high street, empty shopfronts, faded bunting, a bus shelter, grey-skinned figures standing in shop doorways facing the road, overcast light. Melancholy, still.',
      connections: [
        { to: 'the_wire', travelMinutes: 25, label: 'Back up the lane to the Lock' },
        { to: 'the_chemist', travelMinutes: 2, label: 'The chemist with the blue sign' },
        { to: 'st_ides', travelMinutes: 12, label: 'Up the hill to the hospital' },
        { to: 'ferry_landing', travelMinutes: 15, label: 'Down to the quay and the river' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_chemist',
      name: 'Holt’s Chemist',
      shortName: 'Chemist',
      description:
        'A narrow chemist’s shop under a blue sign, shelves half emptied two years ago and then left alone. The pharmacist is still behind the counter in her white coat, facing the till. The locked cabinet at the back holds the medicine Cole wants.',
      artDirection:
        'A narrow old chemist’s shop under a blue sign, dusty shelves, a grey-skinned figure in a white coat standing behind the counter facing away, a locked glass cabinet at the back. Hushed, dim.',
      connections: [{ to: 'wexley_high_street', travelMinutes: 2, label: 'Back out to the high street' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 0 },
      takeableItems: [
        { itemId: 'chemist_box', qty: 1, ownerId: null, aka: ['antibiotics', 'the medicine', 'the box of pills', 'the pharmacy crate'] },
      ],
    },
    {
      id: 'st_ides',
      name: 'St Ide’s Hospital',
      shortName: 'Hospital',
      description:
        'A seven-storey hospital on the hill above the town, every window dark, ambulances still parked at angles in the bay. Banners in the foyer still advertise a vaccine study. The greys inside stand in the corridors in pale blue gowns.',
      artDirection:
        'A large dark hospital on a hill above a small town, ambulances parked askew, a faded banner in a glass foyer, long corridors with still figures in pale gowns far down them. Cold, institutional.',
      connections: [
        { to: 'wexley_high_street', travelMinutes: 12, label: 'Down the hill to the high street' },
        { to: 'ward_nine', travelMinutes: 6, label: 'Up four flights of dark stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: -1 },
      takeableItems: [],
    },
    {
      id: 'ward_nine',
      name: 'Ward Nine',
      shortName: 'Ward Nine',
      description:
        'The trial ward on the fourth floor: forty beds in two rows, curtains drawn back, a nurses’ station with files spilling out of the drawers. Every bed rail has a card clipped to it. One rail is empty, and the number on its card is yours.',
      artDirection:
        'A long hospital ward, forty empty beds in two rows, curtains pulled back, papers on the floor, a nurses’ station, grey daylight through tall windows, one bed rail with a card on it. Still, sad, clean.',
      connections: [{ to: 'st_ides', travelMinutes: 6, label: 'Back down the stairs' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: -2 },
      takeableItems: [
        { itemId: 'trial_ledger', qty: 1, ownerId: null, aka: ['ledger', 'the trial ledger', 'the files', 'the trial file'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_lock',
      name: 'Kestrel Lock',
      description:
        'Thirty-eight people on a canal-lock island who have kept every grey out for two years with water, wire and one rule: nothing grey crosses the footbridge. You are testing the rule just by standing there.',
      startingReputation: -10,
      ranks: [
        { atReputation: -10, label: 'The grey at the wire' },
        { atReputation: 5, label: 'The Lock’s grey' },
        { atReputation: 20, label: 'One of the Lock' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_ferrymen',
      name: 'The Ferrymen',
      description:
        'A dozen river scavengers on one long barge who trade diesel, salt and medicine up and down the valley, and buy anything rare enough to sell at the coast. You are the rarest thing they have ever been offered.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Merchandise' },
        { atReputation: 10, label: 'A business partner' },
        { atReputation: 25, label: 'Crew' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_greys',
      name: 'The Greys',
      description:
        'Everybody the grey has taken. They do not hunt you; they lean towards you the way they lean towards warmth and sound, and the longer you spend among them the more they treat you as the one who knows the way.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Stranger' },
        { atReputation: 20, label: 'One of them' },
        { atReputation: 40, label: 'The one they follow' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'jessa',
      name: 'Jessa Marlow',
      role: 'Night watch on the wire, the best shot at Kestrel Lock, and the only person who has not pulled the trigger',
      cardBlurb:
        'She has had a bolt resting on your chest since dawn and has not fired it, because you said please. Nobody at the Lock knows why that matters so much to her, and you will have to earn the right to ask.',
      pronouns: 'she/her',
      publicTraits: ['Watches your mouth, not your eyes, while you talk', 'Says less than anyone and means all of it', 'Funny about once a day, without warning'],
      hiddenDrives: [
        'Her older brother Tam was left outside the gate on the first night, and she has checked the face of every grey that has come to this wire since, in case it was him',
        'She has always wondered whether he would have said something, if somebody had waited one second longer, and you are the first answer she has ever had',
      ],
      values: ['Waiting one second longer than is safe', 'Doing the job she volunteered for, every night, properly'],
      fears: [
        'Being right to have waited, and finding out too late to matter',
        'Becoming the person who shoots first, which is what Cole thinks the job needs',
      ],
      socialStyle:
        'Tests people with short instructions and watches what they do with them. Takes the high ground and never turns her back on you; the day she does is a large event.',
      boundaries: [
        'Will not lower the crossbow because she is asked to; she lowers it when she has decided to',
        'Will not talk about her brother with anybody who brings him up before she does',
      ],
      goals: [
        'Find out whether there is still a person in there before Cole decides it for everyone',
        'Hold the wire every night until the Horde has passed',
      ],
      secrets: [
        {
          id: 'jessa_the_faces',
          fact: 'She volunteered for night watch two years ago so that if Tam ever came to the wire she would be the one who saw him. There are seven hundred and twelve tally marks on her crossbow, one for every night she has looked.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the watch platform after midnight, if you have sat the watch with her more than once without asking her anything.',
        },
        {
          id: 'jessa_the_jacket',
          fact: 'She keeps Tam’s green work jacket folded under the bunk on her narrowboat, with his radio badge still pinned to it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you come back from the Horde knowing something of his that nobody alive could have told you.',
        },
      ],
      speechStyle:
        'Short. Imperatives and questions and almost nothing else. Repeats your last word back instead of answering. When she is rattled she goes quiet and makes you say it again. Never says sorry; says "Noted." and moves on.',
      topics: ['the wire', 'the night watch', 'her crossbow', 'her brother', 'Cole Garrity', 'what you remember'],
      voiceSamples: [
        'Say something else.',
        'Again. Slower. I am watching your lips.',
        'You blinked. They do not blink. Do it again.',
        'Hungry. You said hungry. Hungry for what?',
        'Everybody says please at the end. You are the first one who said it at the start.',
      ],
      appearance:
        'An adult woman, lean and wiry, cropped black hair under a grey knitted watch cap, dark watchful eyes, a scuffed olive canvas coat two sizes too big, fingerless wool gloves, and a wooden crossbow with rows of tally marks scratched along the stock.',
      visualHook: 'Hundreds of tally marks scratched along the stock of her crossbow, one for every night on the wire.',
      silhouette: 'Crouched on the watch platform, crossbow resting on one knee, perfectly still.',
      artSeed: 'tzwsp-jessa-01',
      portrait: null,
      expressions: ['neutral', 'wary', 'surprised', 'amused', 'hurt'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_wire', activity: 'on the night watch at the wire, crossbow across her knees' },
        { startMinute: 420, endMinute: 720, locationId: 'lock_yard', activity: 'on her narrowboat with the hatch shut, sleeping off the watch' },
        { startMinute: 720, endMinute: 900, locationId: 'the_weir', activity: 'on the weir wall, cleaning bolts and re-fletching the bent ones' },
        { startMinute: 900, endMinute: 1260, locationId: 'lock_yard', activity: 'mending the fence line and not watching the pump house' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_wire', activity: 'climbing up for the night watch' },
      ],
      homeLocationId: 'lock_yard',
      knowledgeScope: ['jessa', 'the_wire', 'kestrel_lock', 'tam_marlow', 'the_first_night', 'the_horde'],
      startingRelationship: { trust: 10, affection: 0, respect: 15, fear: 25, rivalry: 0 },
      gates: [
        {
          id: 'jessa_lowers_it',
          label: 'She lowers the crossbow',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'jessa_says_his_name',
          label: 'She tells you about Tam',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['first_day_over'] },
        },
        {
          id: 'jessa_sits_close',
          label: 'She sits close enough to feel how cold you are, on purpose',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 55 },
        },
      ],
      attributes: { might: 11, agility: 15, mind: 12, presence: 11, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 14, damage: 9, tags: ['crossbow', 'watch'] },
    },
    {
      id: 'doc',
      name: 'Ife Amari',
      calledName: 'Doc',
      role: 'The camp’s doctor, who was a vet before the grey, and who has wanted a subject like you for two years',
      cardBlurb:
        'She will ask your permission for everything, every time, and wait for the answer as if it matters. She also wants your blood more than she has wanted anything in two years, and she has a reason she is not telling you.',
      pronouns: 'she/her',
      publicTraits: ['Asks permission before she touches anything, including a door', 'Laughs at the wrong moments, from nerves', 'Writes everything down'],
      hiddenDrives: [
        'A grey in the reeds caught her forearm eleven days ago, and your blood is the first thing that has made her think she might get to keep her mind',
        'She wants the cure to be for the camp first and herself second, and is no longer sure that is the order she would choose',
      ],
      values: ['Consent, asked out loud and answered out loud', 'A result somebody else can repeat'],
      fears: [
        'Turning in front of the people she has been patching up for two years',
        'Becoming the sort of scientist who stops asking',
      ],
      socialStyle:
        'Pulls up a seat at a respectful distance, asks one question, and waits through the silence for as long as it takes. Narrates what her hands are about to do before they do it.',
      boundaries: [
        'Will not take anything from you without a yes, even when she could',
        'Will not lie to the camp about a medical fact, though she will leave one out',
      ],
      goals: ['Get a sample of your blood and a week to work on it', 'Keep her sleeve down until she has an answer'],
      secrets: [
        {
          id: 'doc_the_scratch',
          fact: 'Eleven days ago a grey in the reeds caught her forearm through her sleeve. She dressed it herself and told nobody. She takes her own temperature every morning, and it is falling.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you herself once she trusts you, or you feel the cold in her from across a room, or you read her casebook.',
        },
        {
          id: 'doc_trial_nine',
          fact: 'She recognises the wristband. Trial Nine was a vaccine study at St Ide’s in the first month of the outbreak, and the last thing she heard on the radio before the hospital went quiet was that some volunteers had turned and kept talking.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her about the wristband once she has a sample to work with.',
        },
      ],
      speechStyle:
        'Warm and precise. Asks "May I?" before acting, every time. Thinks out loud in clinical terms and then translates them. Apologises to objects she bumps into. Laughs when she is frightened.',
      topics: ['your blood', 'the cure', 'Trial Nine', 'the infirmary', 'her old veterinary practice', 'her sleeve'],
      voiceSamples: [
        'May I? Your arm, I mean. You can say no. I would like you to know that you can say no.',
        'Core temperature of a cellar. Pupils reactive. Clinically speaking you are a contradiction, and I mean that warmly.',
        'I treated sheepdogs for fourteen years. The principles are mostly transferable. Mostly.',
        'Sorry, sorry, that was the tray. I am apologising to a tray.',
      ],
      appearance:
        'An adult woman, dark brown skin, close-cropped hair flecked with grey, round glasses mended at the bridge with tape, a stethoscope round her neck, and a long oatmeal cardigan with the sleeves always pulled down over her wrists.',
      visualHook: 'Cardigan sleeves pulled down over both wrists, always, whatever the weather.',
      silhouette: 'Sitting on an upturned bucket at a polite distance, notebook on her knee, leaning in.',
      artSeed: 'tzwsp-doc-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'curious', 'worried', 'embarrassed'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'the_infirmary', activity: 'up before everyone, taking her own temperature with the door shut' },
        { startMinute: 390, endMinute: 1080, locationId: 'the_infirmary', activity: 'at the microscope, with the door open' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_cottage', activity: 'eating standing up at the stove' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_infirmary', activity: 'writing up the day in her casebook, sleeves down' },
      ],
      homeLocationId: 'the_infirmary',
      knowledgeScope: ['doc', 'the_grey', 'trial_nine', 'kestrel_lock', 'the_infirmary', 'the_cure'],
      startingRelationship: { trust: 20, affection: 10, respect: 30, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'doc_shows_you',
          label: 'She shows you what is under her sleeve',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['sample_question_settled'] },
        },
        {
          id: 'doc_colleague',
          label: 'She treats you as a colleague rather than a sample',
          kind: 'ALLIANCE',
          requires: { respect: 55 },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 16, presence: 12, resolve: 13, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 22, defenseDc: 10, damage: 2, tags: ['civilian'] },
    },
    {
      id: 'cole',
      name: 'Cole Garrity',
      role: 'The man who runs Kestrel Lock by arithmetic, and the man on the watchtower who told Jessa to shoot',
      cardBlurb:
        'He has kept thirty-eight people alive for two years by never once making an exception, and you are an exception. He will give you one chance to be useful, and he has already worked out what you would fetch if he sold you.',
      pronouns: 'he/him',
      publicTraits: ['Counts people instead of naming them', 'Never raises his voice and never needs to', 'Does every dangerous job himself first'],
      hiddenDrives: [
        'On the first night he shut the footbridge gate on sixty-one people, Tam Marlow among them, and told the camp they were all bitten; most of them were not, and he has decided to carry that alone',
        'He would hand the Lock to somebody else tomorrow if he believed they would make the same decision he did',
      ],
      values: ['Thirty-eight people breathing in the morning', 'Rules that do not bend for anybody, because the first bend is the one that kills you'],
      fears: ['Jessa finding out what happened at the gate', 'Being right about you being dangerous, after he has let you in'],
      socialStyle:
        'Talks while walking the island, so you have to keep up. Makes decisions out loud in front of everybody so that nobody can say they were not told. Never says please.',
      boundaries: [
        'Will not let anything grey cross the footbridge without chains on it, unless the camp votes otherwise',
        'Will not discuss the first night with anyone, on any terms, in front of anyone else',
      ],
      goals: ['Get all thirty-eight through the Horde', 'Find out whether you are a weapon, a cure, or a mouth he cannot afford'],
      secrets: [
        {
          id: 'cole_the_gate',
          fact: 'On the first night he closed the footbridge gate at 23:40 with sixty-one people still outside. Tam Marlow was one of them and had not been bitten. Cole told Jessa her brother was already turning. The gate log in his desk has the time and every name.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it himself only to somebody he respects who asks him straight, alone; otherwise it is in the gate log, or in the murmur.',
        },
        {
          id: 'cole_the_price',
          fact: 'He has already asked Ivo Kade, by radio, what a talking grey is worth at the coast. The answer was enough diesel to run the camp’s pumps for a year.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ivo lets it slip if you make him a better offer than Cole did.',
        },
      ],
      speechStyle:
        'Flat, slow and numerical. Counts people instead of naming them and calls everybody by their surname. States decisions as facts that are already true. Never says please, and notices that he does not.',
      topics: ['the camp', 'the Horde', 'the footbridge rule', 'the vote', 'the first night', 'Ivo Kade'],
      voiceSamples: [
        'Thirty-eight. That is the only number I care about, and you are not in it yet.',
        'I do not do please. I do whatever keeps the pumps running.',
        'Chemist on the high street. Blue sign. Antibiotics, all of them. Back by dark and you get a blanket.',
        'Marlow waited. Waiting is a feeling with a crossbow. It is no use to me.',
      ],
      appearance:
        'An adult man, broad and weathered, a shaved head under a navy lock-keeper’s cap, grey stubble, a dark green waxed jacket over a wool jumper, heavy boots, and a ring of brass lock keys on his belt.',
      visualHook: 'A heavy ring of brass lock keys on his belt that he turns over in one hand while he thinks.',
      silhouette: 'At the top of the watchtower ladder, one hand on the rail, looking down.',
      artSeed: 'tzwsp-cole-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grim', 'tired', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 430, locationId: 'the_wire', activity: 'up the watchtower, because he never misses the dawn changeover' },
        { startMinute: 430, endMinute: 720, locationId: 'the_cottage', activity: 'the supply count, out loud, at the kitchen table' },
        { startMinute: 720, endMinute: 1020, locationId: 'lock_yard', activity: 'walking the island with a clipboard' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_cottage', activity: 'the evening meal, at the head of the table' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_weir', activity: 'checking the paddles and the water level himself' },
      ],
      homeLocationId: 'the_cottage',
      knowledgeScope: ['cole', 'kestrel_lock', 'the_first_night', 'the_gate_log', 'the_ferrymen', 'the_horde'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 20, rivalry: 10 },
      gates: [
        {
          id: 'cole_gives_you_a_job',
          label: 'He gives you a job instead of an order',
          kind: 'ALLIANCE',
          requires: { respect: 35 },
        },
        {
          id: 'cole_tells_you_the_time',
          label: 'He tells you what happened at 23:40 on the first night',
          kind: 'TRUST',
          requires: { trust: 45, respect: 50, flagsSet: ['tam_known'] },
        },
      ],
      attributes: { might: 15, agility: 10, mind: 13, presence: 15, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 42, defenseDc: 14, damage: 7, tags: ['leader', 'boathook'] },
    },
    {
      id: 'sunny',
      name: 'Sunny Abara',
      role: 'Runs the generator and the radios, and decided inside a minute that you are the best thing to happen at the Lock in two years',
      cardBlurb:
        'He will give you a call sign, follow you around, ask you nine questions a minute and tell everyone you are fine. Every night at nine he shuts himself in the radio shed, and he goes very quiet if you ask him why.',
      pronouns: 'he/him',
      publicTraits: ['Talks in radio procedure even face to face', 'Can fix anything with a plug on it', 'Cannot keep a secret for an hour'],
      hiddenDrives: [
        'Every night at nine he sends a call for survivors on the old valley repeater, against Cole’s orders, because he cannot stand the thought of somebody out there listening and nobody answering',
        'He wants one new person to come up the river who is not already here, and he wants it badly enough to break a rule every night',
      ],
      values: ['Answering every call', 'Fixing the thing instead of complaining about it'],
      fears: ['Finding out that the nightly call has hurt somebody', 'Being treated as the camp’s spare pair of hands forever'],
      socialStyle:
        'Arrives already talking, sits on whatever is nearest, and narrates his own thoughts in radio procedure. Gives everybody a call sign whether they want one or not.',
      boundaries: [
        'Will not switch the broadcast off on somebody else’s say-so until he understands why',
        'Will not lie to Jessa, which is why he avoids her when he is hiding something',
      ],
      goals: ['Get you a radio and a call sign', 'Hear one new voice answer the nightly call before winter'],
      secrets: [
        {
          id: 'sunny_the_broadcast',
          fact: 'Every night at nine he sends two minutes on the old valley repeater: a tone, then his voice, asking anyone listening to come to Kestrel Lock. The Horde turned south the first night he did it and has been walking towards the tone ever since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you once he trusts you, especially after he notices you flinch at nine o’clock; it is also in his broadcast log.',
        },
      ],
      speechStyle:
        'Fast and bright, radio procedure for everything: "copy", "over", "say again". Hands out call signs. Asks three questions before you can answer one. Goes very quiet and formal when he is scared.',
      topics: ['the radios', 'the generator', 'the nine o’clock call', 'call signs', 'Jessa', 'what being a grey is like'],
      voiceSamples: [
        'Copy, copy, copy. You talk. Say again, slower, I am writing it down.',
        'Call sign. Everybody gets one. You are Polite One. Do not fight me on this, it is already on the board.',
        'Do they dream? Do you? Is it cold? Sorry. Over. Your turn.',
        'Nine o’clock, every night. It is only a tone and my voice. It cannot hurt anybody. Can it?',
      ],
      appearance:
        'An adult man, tall and long-limbed, deep brown skin, a high fade, a wide quick grin, battered over-ear headphones round his neck, and a hi-vis vest covered in marker-pen call signs over a grey hoodie.',
      visualHook: 'Battered over-ear headphones round his neck, trailing a coil of cable that is plugged into nothing.',
      silhouette: 'Folded onto an upturned crate, knees up, a soldering iron in one hand and a radio in the other.',
      artSeed: 'tzwsp-sunny-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'curious', 'nervous', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_radio_shed', activity: 'dozing in a chair with the headphones on' },
        { startMinute: 480, endMinute: 1020, locationId: 'lock_yard', activity: 'fixing whatever has a plug on it' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_cottage', activity: 'cooking badly and with great confidence' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_radio_shed', activity: 'the nine o’clock call, on the dot' },
      ],
      homeLocationId: 'the_radio_shed',
      knowledgeScope: ['sunny', 'the_radios', 'the_broadcast', 'kestrel_lock', 'jessa', 'call_signs'],
      startingRelationship: { trust: 30, affection: 25, respect: 30, fear: 5, rivalry: 0 },
      gates: [
        {
          id: 'sunny_owns_up',
          label: 'He tells you about the nine o’clock call',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['heard_the_horde'] },
        },
        {
          id: 'sunny_gives_you_a_radio',
          label: 'He gives you a radio and puts your call sign on the board',
          kind: 'ALLIANCE',
          requires: { affection: 40 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 15, presence: 12, resolve: 10, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 22, defenseDc: 11, damage: 2, tags: ['civilian'] },
    },
    {
      id: 'ivo',
      name: 'Ivo Kade',
      role: 'Captain of the Ferrymen, a river trader who buys anything rare, and who has come up the weir to buy you',
      cardBlurb:
        'He is charming, honest about prices, and the only person in the valley offering to take you somewhere else. Before you step onto his barge, ask him who is buying at the coast.',
      pronouns: 'he/him',
      publicTraits: ['Prices everything out loud, including compliments', 'Keeps every bargain to the letter', 'Laughs easily and means about half of it'],
      hiddenDrives: [
        'A laboratory at the coast pays in fuel and safe passage for anything that might lead to a cure, and one talking grey would buy his crew a winter out of the valley for good',
        'He has lost two crew to the grey and has decided never to lose a third, whatever that costs somebody else',
      ],
      values: ['A deal kept is the only law left on the river', 'Never lying about the price, even when it would be easier'],
      fears: ['Being the last barge on a dead river', 'Owing somebody something he cannot pay'],
      socialStyle:
        'Leans on the nearest rail with his hat tipped back, makes an offer inside the first minute, and enjoys the haggling more than the winning.',
      boundaries: [
        'Will not take you by force; stolen cargo is cursed cargo, and he believes that',
        'Will not break a deal once he has shaken on it, even with a grey',
      ],
      goals: ['Buy you, from Cole or from yourself, before the Horde closes the river', 'Get his crew to the coast before winter'],
      secrets: [
        {
          id: 'ivo_the_coast',
          fact: 'The coast laboratory he sells to wants greys brought in whole and still moving. He has told himself it is to make a cure. He has never been inside to check.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if you ask him straight what happens to you at the coast and you are already on good terms.',
        },
      ],
      speechStyle:
        'Easy, sing-song merchant talk. Calls everybody "friend". Prices everything in litres, crates and favours. Finishes a hard truth with a laugh, so you cannot tell how hard it was.',
      topics: ['the river', 'the coast', 'prices', 'the Ferrymen', 'his barge', 'Cole Garrity'],
      voiceSamples: [
        'Friend! Forty litres of diesel and a crate of salt for a grey that says please. A generous number, and everybody here knows it.',
        'Everything has a price, friend. The trick is saying it out loud so nobody gets surprised later.',
        'You want to negotiate for yourself? Ha! Now that I have never been offered. Go on, go on.',
        'I shake on it, it is done. Even with you. Especially with you. Cold hand, though.',
      ],
      appearance:
        'An adult man, lean and sun-browned, a short dark beard, a wide-brimmed oilskin hat, a long patched coat full of pockets, and a brass whistle on a cord round his neck.',
      visualHook: 'A brass bosun’s whistle on a cord that he blows once to open a negotiation and twice to close it.',
      silhouette: 'Leaning on the barge rail, hat tipped back, one boot up on a crate.',
      artSeed: 'tzwsp-ivo-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'calculating', 'warm', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'ferry_landing', activity: 'in the wheelhouse with the stove lit' },
        { startMinute: 480, endMinute: 1320, locationId: 'ferry_landing', activity: 'on deck, mending nets and haggling with whoever comes down the steps' },
        { startMinute: 1320, endMinute: 1440, locationId: 'ferry_landing', activity: 'by the brazier, counting the day’s takings' },
      ],
      homeLocationId: 'ferry_landing',
      knowledgeScope: ['ivo', 'the_river', 'the_coast', 'the_ferrymen', 'prices'],
      startingRelationship: { trust: 10, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ivo_straight',
          label: 'He tells you what the coast really wants with you',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 14, presence: 15, resolve: 12, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 13, damage: 6, tags: ['ferryman', 'knife'] },
    },
    {
      id: 'the_horde',
      name: 'The Horde',
      role: 'About four thousand greys walking down the valley as one crowd, and the only voice in the world that sounds like home to you',
      cardBlurb:
        'You can hear it from nine miles away: a murmur made of the last thing every one of them said. It is walking towards the Lock, it wants you to come home, and it will reach the water in about two days.',
      pronouns: 'it/its',
      publicTraits: ['Moves at walking pace and never stops', 'Hums a low murmur only you can make out as words', 'Leans towards warmth and sound'],
      hiddenDrives: [
        'It follows the nine o’clock tone on the old repeater, and has done since the first night Sunny sent it',
        'It wants every grey that is apart from it back inside it, and you are the most apart a grey has ever been',
      ],
      values: ['Warmth', 'Togetherness without edges'],
      fears: ['Silence', 'Cold running water, which it will not cross while the weir runs'],
      socialStyle:
        'Does not talk to you so much as include you. Its words arrive as fragments in your head, in other people’s voices, and the closer it gets the more of them are aimed at you.',
      boundaries: [
        'Will not harm you; you are one of it',
        'Will not cross running water while the weir runs, unless the crowd behind is heavy enough to push the front in',
      ],
      goals: ['Reach the warm place the tone comes from', 'Take you back in'],
      secrets: [
        {
          id: 'horde_tam',
          fact: 'Tam Marlow is in it. His last sentence is still in the murmur: "Cole, open it, it is me, open the gate."',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to a player who knows his name and listens to the murmur on purpose.',
        },
        {
          id: 'horde_the_other_one',
          fact: 'Somewhere in the middle of it is one other mind like yours, another Trial Nine volunteer, number 12, who has spent a year trying to steer the crowd away from people. It is very tired, and it has noticed you.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to a player who walks into the middle of the crowd and stays longer than is safe.',
        },
      ],
      speechStyle:
        'Fragments in many voices, all of them adult, in lower case and overlapping, broken off mid-sentence: kettles, lifts, shifts, names. The word please comes up more than any other. It never uses your name, only "you", as if it has always known you.',
      topics: ['the murmur', 'the tone', 'warmth', 'the ones inside it', 'coming home'],
      voiceSamples: [
        '...is the kettle on, i will only be a minute...',
        '...please. please. somebody open the...',
        '...warm in there. warm in there. warm in there...',
        '...you. there you are. come in out of the cold...',
      ],
      appearance:
        'A slow grey crowd of about four thousand adults filling a valley road from hedge to hedge, coats and work clothes faded to one colour, every head tilted the same way.',
      visualHook: 'Four thousand heads all tilted the same way, towards the same sound.',
      silhouette: 'A grey tide filling a road from hedge to hedge under low cloud.',
      artSeed: 'tzwsp-horde-01',
      portrait: null,
      expressions: ['neutral'],
      schedule: [],
      homeLocationId: 'the_cutting',
      knowledgeScope: ['the_horde', 'the_murmur', 'tam_marlow', 'trial_nine'],
      startingRelationship: { trust: 50, affection: 60, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'horde_lets_you_lead',
          label: 'It lets you walk at the front',
          kind: 'OTHER',
          requires: { flagsSet: ['horde_understood'] },
        },
      ],
      attributes: { might: 20, agility: 4, mind: 3, presence: 18, resolve: 20, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_at_the_wire',
      title: 'Say Something Else',
      summary: 'A woman behind the wire has a crossbow bolt resting on your chest and is waiting for your next word.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['jessa', 'cole', 'doc', 'sunny'],
      involvedLocationIds: ['the_wire', 'the_pump_house', 'lock_yard', 'wexley_high_street'],
      knownRewardCopy: 'A way past the wire, or a reason to walk away from it.',
      steps: [
        {
          id: 'the_wire',
          playerCopy: 'Answer the woman with the crossbow before she stops waiting.',
          directorNotes:
            'Jessa has not fired and does not want to, and Cole is shouting from the tower for her to do it. Every route here is a real way to handle the scene and none of them is wrong. Talking works because nothing grey has ever talked back. Stepping into the light works because her whole job is looking at faces. Warning them about the Horde works because it is true. Going for her through the wire gets a bolt through the shoulder, which a grey barely feels, and the camp nets the player and drags them in for the doctor anyway. Walking away is allowed; the camp watches them go and argues about it all day.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_for_her',
              label: 'Go for her through the wire',
              predicate: { flagsSet: ['attacked:jessa'] },
              setsFlags: ['let_in', 'went_for_jessa'],
              closesFlags: ['jessa_vouched'],
            },
            {
              routeId: 'warned_them',
              label: 'Tell them what is coming down the valley',
              predicate: { flagsSet: ['used:hear_the_hum'] },
              setsFlags: ['let_in', 'warned_the_camp'],
              closesFlags: [],
            },
            {
              routeId: 'talked_her_down',
              label: 'Keep talking until she lowers it',
              predicate: { flagsSet: ['used:say_please'] },
              setsFlags: ['let_in', 'jessa_vouched'],
              closesFlags: [],
            },
            {
              routeId: 'showed_her',
              label: 'Step back into the light and let her look at you',
              predicate: { flagsSet: ['used:show_yourself'] },
              setsFlags: ['let_in', 'showed_your_eyes'],
              closesFlags: [],
            },
            {
              routeId: 'walked_off',
              label: 'Turn round and walk into the dead town',
              predicate: { flagsSet: ['visited:wexley_high_street'] },
              setsFlags: ['stayed_outside'],
              closesFlags: ['let_in'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['wire_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'the_first_day',
          playerCopy: 'Get through your first day at the Lock, inside the wire or outside it.',
          directorNotes:
            'Cole has set a test, Doc wants a sample, Sunny wants to give the player a call sign, and thirty-eight people want to know whether the grey in the pump house is going to hurt them. This step is where the world proves it is worth staying in, and it should be funny as often as it is frightening. Nothing forces itself on the player: sitting in the pump house being polite to everybody who comes to the door is a legitimate way to spend it.',
          enterWhen: { flagsSet: ['wire_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_back_medicine',
              label: 'Walk into the dead town and bring back the chemist’s box',
              predicate: { hasItems: ['chemist_box'] },
              setsFlags: ['proved_useful', 'cole_has_a_use_for_you'],
              closesFlags: [],
            },
            {
              routeId: 'lived_outside',
              label: 'Make a place for yourself out among the greys',
              predicate: { flagsSet: ['stayed_outside', 'used:walk_among_them'] },
              setsFlags: ['outside_for_good'],
              closesFlags: [],
            },
            {
              routeId: 'kept_your_hands_to_yourself',
              label: 'Hold the pull down in a room full of warm people',
              predicate: {
                flagsSet: ['used:hold_still'],
                minRelationship: [{ characterId: 'jessa', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['proved_restraint'],
              closesFlags: [],
            },
            {
              routeId: 'sat_for_doc',
              label: 'Sit still for Doc Amari’s needle',
              predicate: { flagsSet: ['used:give_blood'] },
              setsFlags: ['sat_for_doc'],
              closesFlags: [],
            },
            {
              routeId: 'made_yourself_useful',
              label: 'Do the heavy work nobody else can',
              predicate: { flagsSet: ['used:dead_lift'] },
              setsFlags: ['proved_useful'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_day_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_lock', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_horde',
      title: 'Four Thousand, Coming Down the Valley',
      summary: 'A crowd of about four thousand greys is walking towards the Lock, and you are the only one who can hear what it is saying.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['heard_the_horde'] },
      involvedCharacterIds: ['the_horde', 'sunny', 'cole', 'jessa', 'ivo'],
      involvedLocationIds: ['the_north_road', 'the_towpath', 'the_weir', 'the_radio_shed', 'the_cutting'],
      knownRewardCopy: 'Whether the Lock is still standing when the crowd has passed, and what you were to it.',
      steps: [
        {
          id: 'why_its_coming',
          playerCopy: 'Find out what the Horde is walking towards.',
          directorNotes:
            'The answer is the nine o’clock tone on the old repeater. The player can get there by earning Sunny’s trust, by listening to the murmur on purpose after they have felt it lurch at nine, by walking up the north road into the front of the crowd, or by reading Sunny’s log. Sunny meant no harm and must be written that way. If nobody finds out, the crowd reaches the water anyway and the answer becomes obvious.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sunny_owned_up',
              label: 'Get Sunny Abara to tell you about the nine o’clock call',
              predicate: { minRelationship: [{ characterId: 'sunny', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows_about_the_broadcast', 'sunny_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'walked_out_to_meet_it',
              label: 'Walk up the north road into the front of it',
              predicate: { flagsSet: ['used:walk_among_them', 'visited:the_north_road'] },
              setsFlags: ['knows_about_the_broadcast', 'walked_in_the_horde'],
              closesFlags: [],
            },
            {
              routeId: 'heard_it_in_the_murmur',
              label: 'Listen to the murmur until it says what it wants',
              predicate: { flagsSet: ['used:hear_the_hum', 'felt_the_broadcast'] },
              setsFlags: ['knows_about_the_broadcast'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_log',
              label: 'Read Sunny’s broadcast log',
              predicate: { hasItems: ['broadcast_log'] },
              setsFlags: ['knows_about_the_broadcast', 'read_sunnys_log'],
              closesFlags: [],
            },
            {
              routeId: 'found_out_the_hard_way',
              label: 'Find out when it reaches the water',
              predicate: { flagsSet: ['horde_at_the_water'] },
              setsFlags: ['learned_too_late'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['horde_understood'],
            abilities: ['lead_them'],
            reputation: [{ factionId: 'faction_greys', amount: 10 }],
          },
        },
        {
          id: 'what_to_do_about_it',
          playerCopy: 'Decide what happens when four thousand of your own kind reach the water.',
          directorNotes:
            'Six real answers and none of them is clean. Leading the crowd away costs the player the camp’s comfort, because everybody has now seen what follows them. Flooding the island needs the camp to trust the player at the paddles. Moving the camp onto Ivo’s barge needs a deal with him and leaves the Lock to the greys. Shutting the broadcast off breaks Sunny’s heart a little, and may be enough. Walking into the crowd is a choice and must be written as one, never as a failure. If nobody does anything, the weight of the crowd pushes the front across the lock gates on the night after it reaches the water, and that is a real outcome too.',
          enterWhen: { flagsSet: ['horde_understood'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_home_with_them',
              label: 'Answer the murmur and walk in with them',
              predicate: { flagsSet: ['used:answer_the_hum'] },
              setsFlags: ['went_with_the_horde'],
              closesFlags: ['lock_held', 'horde_turned_aside', 'lock_abandoned'],
            },
            {
              routeId: 'led_them_away',
              label: 'Walk at the front and take them north',
              predicate: { flagsSet: ['used:lead_them'] },
              setsFlags: ['horde_turned_aside', 'you_led_them'],
              closesFlags: ['lock_abandoned', 'lock_held'],
            },
            {
              routeId: 'moved_the_camp',
              label: 'Put the whole camp on Ivo Kade’s barge',
              predicate: { flagsSet: ['ferrymen_deal', 'visited:ferry_landing'] },
              setsFlags: ['lock_abandoned', 'camp_on_the_river'],
              closesFlags: ['lock_held'],
            },
            {
              routeId: 'held_the_lock',
              label: 'Open the weir paddles and turn the island into a moat',
              predicate: {
                flagsSet: ['used:dead_lift', 'visited:the_weir'],
                minFactionReputation: [{ factionId: 'faction_lock', value: 10 }],
              },
              setsFlags: ['lock_held', 'flooded_the_island'],
              closesFlags: ['lock_abandoned'],
            },
            {
              routeId: 'silenced_the_radio',
              label: 'Get the nine o’clock call switched off and hope it is enough',
              predicate: { flagsSet: ['knows_about_the_broadcast', 'visited:the_radio_shed', 'used:level_with_them'] },
              setsFlags: ['lock_held', 'broadcast_stopped'],
              closesFlags: ['lock_abandoned'],
            },
            {
              routeId: 'the_lock_fell',
              label: 'Do nothing in time, and get as many out as you can',
              predicate: { flagsSet: ['the_lock_under_pressure'] },
              setsFlags: ['lock_fell'],
              closesFlags: ['lock_held'],
            },
          ],
          rewards: {
            xp: 170,
            items: [],
            flags: ['horde_passed'],
            abilities: [],
            reputation: [{ factionId: 'faction_lock', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_may_i',
      title: 'May I?',
      summary: 'The camp doctor wants a sample of your blood, asks permission every time, and keeps her sleeves pulled down in a warm week.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['wire_answered'] },
      involvedCharacterIds: ['doc', 'cole'],
      involvedLocationIds: ['the_infirmary', 'the_pump_house', 'st_ides'],
      knownRewardCopy: 'What your blood is for, decided by the two people with a stake in it.',
      steps: [
        {
          id: 'the_needle',
          playerCopy: 'Decide what Doc Amari is allowed to take from you.',
          directorNotes:
            'She asks, every time, and means it. A refusal is respected and costs her something visible. A bargain is respected too, and she is better at bargaining than she looks. Do not let her take anything without a yes, whatever state the player is in.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'refused_her',
              label: 'Tell her no, and mean it',
              predicate: { flagsSet: ['used:draw_a_line', 'spoke:doc'] },
              setsFlags: ['refused_the_needle'],
              closesFlags: ['doc_has_a_sample'],
            },
            {
              routeId: 'bargained_for_it',
              label: 'Trade the sample for something you want',
              predicate: { flagsSet: ['used:make_terms', 'spoke:doc'] },
              setsFlags: ['doc_has_a_sample', 'blood_for_terms'],
              closesFlags: [],
            },
            {
              routeId: 'gave_it_freely',
              label: 'Roll up your sleeve',
              predicate: { flagsSet: ['used:give_blood'] },
              setsFlags: ['doc_has_a_sample', 'gave_consent'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['sample_question_settled'], abilities: [], reputation: [] },
        },
        {
          id: 'her_sleeve',
          playerCopy: 'Find out why Doc Amari wears long sleeves in a warm week.',
          directorNotes:
            'She was scratched eleven days ago and is running colder every morning. Being told is the version where she trusts the player. Feeling it across a room is the version only a grey could manage, and she will be frightened and fascinated in equal parts. Reading her casebook is the version where the player knows something she did not give them, and she is entitled to be hurt by that.',
          enterWhen: { flagsSet: ['sample_question_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_showed_you',
              label: 'Wait until she shows you herself',
              predicate: { minRelationship: [{ characterId: 'doc', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows_doc_is_scratched', 'doc_told_you'],
              closesFlags: ['read_the_casebook'],
            },
            {
              routeId: 'felt_it',
              label: 'Feel the cold in her from across the room',
              predicate: { flagsSet: ['used:read_the_warmth', 'doc_running_cold'] },
              setsFlags: ['knows_doc_is_scratched', 'you_noticed'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_casebook',
              label: 'Read her casebook',
              predicate: { hasItems: ['doc_casebook'] },
              setsFlags: ['knows_doc_is_scratched', 'read_the_casebook'],
              closesFlags: ['doc_told_you'],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['doc_secret_out'], abilities: [], reputation: [] },
        },
        {
          id: 'what_the_blood_is_for',
          playerCopy: 'Decide, with her, what your blood is for.',
          directorNotes:
            'A negotiation between two people who both have a stake in a body, and one of them is running out of time. She may try the sample on herself, which nobody can promise will work and which she will ask the player’s blessing for. She may go to the hospital where Trial Nine ran, if the player has found it. Or the player may tell Cole, which is honest and ends her privacy. None of these is the right answer on its own.',
          enterWhen: { flagsSet: ['doc_secret_out'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_tried_it_on_herself',
              label: 'Let her try it on herself',
              predicate: {
                flagsSet: ['doc_has_a_sample', 'knows_doc_is_scratched'],
                minRelationship: [{ characterId: 'doc', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['doc_tried_it'],
              closesFlags: ['doc_told_cole'],
            },
            {
              routeId: 'took_her_to_the_source',
              label: 'Take her to the ward where Trial Nine ran',
              predicate: { flagsSet: ['found_the_ward', 'knows_doc_is_scratched'] },
              setsFlags: ['went_to_the_source'],
              closesFlags: [],
            },
            {
              routeId: 'told_cole',
              label: 'Tell Cole Garrity what is under her sleeve',
              predicate: { flagsSet: ['used:level_with_them', 'spoke:cole'] },
              setsFlags: ['doc_told_cole'],
              closesFlags: ['doc_tried_it'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['cure_question_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_lock', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_trial_nine',
      title: 'Trial Nine',
      summary: 'A hospital wristband you cannot get off: ST IDE’S, TRIAL 9, number 31, and a name somebody scratched out.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['inspected:wristband'] },
      involvedCharacterIds: ['doc', 'ivo', 'the_horde'],
      involvedLocationIds: ['st_ides', 'ward_nine', 'wexley_high_street'],
      knownRewardCopy: 'Who you were, and why you are still thinking, if you want to know.',
      steps: [
        {
          id: 'find_the_ward',
          playerCopy: 'Find the ward where Trial Nine ran, in the hospital above the dead town.',
          directorNotes:
            'This whole thread is optional and must feel it. A player who never looks at their own wristband never sees a beat of it. For a player who is here, keep it quiet and physical: stairwells, gowns, beds in rows, a card on a rail. Nobody explains a mechanism, because nobody left alive knows one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'doc_came_with_you',
              label: 'Bring Doc Amari with you',
              predicate: {
                flagsSet: ['visited:ward_nine'],
                minRelationship: [{ characterId: 'doc', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['found_the_ward', 'doc_saw_the_ward'],
              closesFlags: [],
            },
            {
              routeId: 'ivo_took_you',
              label: 'Get Ivo Kade to run you down to the town quay',
              predicate: { flagsSet: ['ferrymen_deal', 'visited:ward_nine'] },
              setsFlags: ['found_the_ward', 'ivo_knows_where'],
              closesFlags: [],
            },
            {
              routeId: 'walked_through_wexley',
              label: 'Walk there alone through the dead town',
              predicate: { flagsSet: ['visited:ward_nine'] },
              setsFlags: ['found_the_ward'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['stood_in_ward_nine'], abilities: [], reputation: [] },
        },
        {
          id: 'who_you_were',
          playerCopy: 'Read what Trial Nine wrote down about you, or decide not to.',
          directorNotes:
            'The ledger gives the player a name, an address and a dose, and a note in red ink that says lucid after turning, with a question mark. Number 12 has the same note. Leaving the file unread is a complete and respectable answer, and the story never punishes it.',
          enterWhen: { flagsSet: ['stood_in_ward_nine'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'doc_read_it_to_you',
              label: 'Ask Doc Amari what the codes mean',
              predicate: {
                hasItems: ['trial_ledger'],
                minRelationship: [{ characterId: 'doc', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows_who_you_were', 'doc_knows_trial_nine'],
              closesFlags: ['chose_not_to_know'],
            },
            {
              routeId: 'read_the_ledger',
              label: 'Read the trial ledger yourself',
              predicate: { hasItems: ['trial_ledger'] },
              setsFlags: ['knows_who_you_were', 'read_your_own_file'],
              closesFlags: ['chose_not_to_know'],
            },
            {
              routeId: 'left_it_unread',
              label: 'Leave the file in the drawer',
              predicate: { flagsSet: ['used:draw_a_line', 'visited:ward_nine'] },
              setsFlags: ['chose_not_to_know'],
              closesFlags: ['knows_who_you_were'],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['trial_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_brother',
      title: 'The Brother at the Wire',
      summary: 'Jessa did not shoot you, and nobody at the Lock will tell you why that matters so much to her.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['first_day_over'] },
      involvedCharacterIds: ['jessa', 'cole', 'sunny', 'the_horde'],
      involvedLocationIds: ['the_wire', 'the_cottage', 'the_towpath'],
      knownRewardCopy: 'What happened at the gate on the first night, and what Jessa does when she knows.',
      steps: [
        {
          id: 'why_she_didnt_shoot',
          playerCopy: 'Find out why Jessa Marlow did not shoot.',
          directorNotes:
            'She will tell it herself, on the watch, late, once she trusts the player, and it comes out as a list of facts with no adjectives. Sunny will tell it in ninety seconds if asked, badly and kindly, and will feel terrible afterwards. Either way the player learns there was a brother called Tam who was left outside the gate on the first night.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Sit the watch with her until she says it',
              predicate: { minRelationship: [{ characterId: 'jessa', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows_about_tam', 'jessa_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'sunny_told_you',
              label: 'Ask Sunny Abara, who cannot keep anything in',
              predicate: {
                flagsSet: ['spoke:sunny'],
                minRelationship: [{ characterId: 'sunny', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows_about_tam', 'sunny_told_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['tam_known'], abilities: [], reputation: [] },
        },
        {
          id: 'the_gate_that_night',
          playerCopy: 'Find out who shut the gate the night her brother was left outside.',
          directorNotes:
            'Cole shut it, at 23:40, on sixty-one people, and Tam had not been bitten. Three ways to learn it and they are not equivalent: hearing Tam’s last sentence in the murmur is something only the player could ever do; getting Cole to say it is the version where he is a person; finding the log in his desk is the version where the player went through a man’s drawers.',
          enterWhen: { flagsSet: ['tam_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'heard_tam',
              label: 'Find his voice in the murmur',
              predicate: { flagsSet: ['heard_tam', 'used:hear_the_hum'] },
              setsFlags: ['tam_is_in_the_horde'],
              closesFlags: [],
            },
            {
              routeId: 'cole_admitted_it',
              label: 'Make Cole Garrity say it himself',
              predicate: {
                flagsSet: ['used:level_with_them', 'spoke:cole'],
                minRelationship: [{ characterId: 'cole', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['cole_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_log',
              label: 'Find the gate log in his desk',
              predicate: { hasItems: ['gate_log'] },
              setsFlags: ['read_the_gate_log'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 130, items: [], flags: ['the_gate_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'what_jessa_does',
          playerCopy: 'Be there when Jessa finds out, or decide she never will.',
          directorNotes:
            'Jessa does not cry in front of people and does not shoot Cole. What she does is quieter and harder: she asks one question, gets one answer, and decides something about the next two years. Bringing Tam to the wire is only possible for a player who can lead the crowd; it is the saddest and kindest thing in the story, and must stay gentle and unshowy.',
          enterWhen: { flagsSet: ['the_gate_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_tam_to_the_wire',
              label: 'Bring her brother to the wire so she can say goodbye',
              predicate: { flagsSet: ['tam_is_in_the_horde', 'used:lead_them'] },
              setsFlags: ['jessa_knows_the_truth', 'tam_brought_home'],
              closesFlags: ['kept_coles_secret'],
            },
            {
              routeId: 'told_jessa_yourself',
              label: 'Tell her yourself, before anybody else does',
              predicate: {
                flagsSet: ['used:level_with_them', 'spoke:jessa'],
                minRelationship: [{ characterId: 'jessa', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['jessa_knows_the_truth', 'you_told_her'],
              closesFlags: ['kept_coles_secret'],
            },
            {
              routeId: 'kept_it_from_her',
              label: 'Keep it from her',
              predicate: { flagsSet: ['used:draw_a_line', 'the_gate_answered'] },
              setsFlags: ['kept_coles_secret'],
              closesFlags: ['jessa_knows_the_truth'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['brother_question_closed'],
            abilities: [],
            reputation: [{ factionId: 'faction_lock', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_cargo',
      title: 'Cargo',
      summary: 'A river trader has come up the weir with an offer of diesel and salt, and the thing he wants to buy is you.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['ivo_made_an_offer'] },
      involvedCharacterIds: ['ivo', 'cole'],
      involvedLocationIds: ['ferry_landing', 'the_wire'],
      knownRewardCopy: 'A price on your head, set by you or by somebody else.',
      steps: [
        {
          id: 'ivos_offer',
          playerCopy: 'Answer Ivo Kade’s offer, which is for you.',
          directorNotes:
            'Ivo is honest about the price and vague about the buyer. A player who negotiates for themselves delights him, and he keeps whatever he shakes on. If the camp votes before the player has given it a reason to keep them, Cole sells, and Ivo pays, and neither of them enjoys it. Attacking Ivo makes an enemy of the only boat on the river.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_for_ivo',
              label: 'Go for Ivo Kade',
              predicate: { flagsSet: ['attacked:ivo'] },
              setsFlags: ['ferrymen_enemy'],
              closesFlags: ['ferrymen_deal'],
            },
            {
              routeId: 'made_your_own_deal',
              label: 'Negotiate for yourself',
              predicate: { flagsSet: ['used:make_terms', 'spoke:ivo'] },
              setsFlags: ['ferrymen_deal'],
              closesFlags: ['sold_to_ivo'],
            },
            {
              routeId: 'turned_him_down',
              label: 'Tell him you are not for sale',
              predicate: { flagsSet: ['used:draw_a_line', 'spoke:ivo'] },
              setsFlags: ['refused_ivo'],
              closesFlags: ['ferrymen_deal'],
            },
            {
              routeId: 'sold_by_the_vote',
              label: 'Let the camp vote, and be sold',
              predicate: {
                flagsSet: ['the_vote_called'],
                flagsUnset: ['proved_useful', 'jessa_vouched', 'proved_restraint'],
              },
              setsFlags: ['sold_to_ivo'],
              closesFlags: ['ferrymen_deal'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['ivo_answered'],
            abilities: [],
            reputation: [
              { factionId: 'faction_ferrymen', amount: 10 },
              { factionId: 'faction_lock', amount: 5 },
            ],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_doc_comes_to_find_you',
      atWorldMinute: 7 * 60 + 20,
      locationId: null,
      publicCopy:
        'Doc Amari comes to find you with a medical bag, sets it down just out of your reach, and asks whether she may come closer.',
      directorNotes:
        'Wherever the player is, inside the wire or outside it, she finds them, because she has been waiting two years for this. She wants a sample and she will not take one without a yes. Her sleeves are down. She laughs once at the wrong moment, from nerves.',
      setsFlags: ['doc_came_to_you'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_coles_test',
      atWorldMinute: 9 * 60 + 30,
      locationId: null,
      publicCopy:
        'Cole Garrity hands a list through the bars, or shouts it across the water: antibiotics, from the chemist on Wexley High Street, where the greys stand in the doorways.',
      directorNotes:
        'He has lost three people trying to fetch that box. He is offering the player a blanket and a place in the count if they bring it back by dark, and he is watching to see whether they come back at all.',
      setsFlags: ['cole_set_the_test'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_murmur_starts',
      atWorldMinute: 13 * 60,
      locationId: null,
      publicCopy:
        'Something far up the valley starts to hum. Nobody else looks up. To you it sounds like four thousand people all finishing different sentences.',
      directorNotes:
        'The player hears the Horde properly for the first time: fragments, ordinary last words, a great many of them please. It is not a threat yet. It is the most familiar thing they have heard since they woke, and that should be the frightening part.',
      setsFlags: ['heard_the_horde'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_ivo_at_the_wire',
      atWorldMinute: 16 * 60,
      locationId: 'the_wire',
      publicCopy:
        'A boat horn below the weir. Ivo Kade comes up to the wire in a wide hat, blows his whistle once, and makes Cole an offer for you in front of everybody.',
      directorNotes:
        'Forty litres of diesel and a crate of salt. He is charming and entirely serious, and he will happily negotiate with the player directly if they speak up, which nobody has ever done before and which delights him.',
      setsFlags: ['ivo_made_an_offer'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'ivo', toLocationId: 'the_wire' }],
    },
    {
      id: 'we_nine_oclock',
      atWorldMinute: 21 * 60,
      locationId: 'the_radio_shed',
      publicCopy:
        'Nine o’clock. In the radio shed Sunny sends his nightly call, and up the valley the murmur in your head lurches towards it like a crowd hearing its name.',
      directorNotes:
        'Only the player feels the connection, as a pull in the chest at exactly nine. Sunny does not know. Nobody does. A player who has been listening can now put the two things together.',
      setsFlags: ['felt_the_broadcast'],
      cancelledByFlags: ['broadcast_stopped'],
      requiresFlags: ['heard_the_horde'],
      movesCharacters: [],
    },
    {
      id: 'we_a_voice_you_know',
      atWorldMinute: 1440 + 3 * 60 + 10,
      locationId: null,
      publicCopy: 'In the small hours, one voice in the murmur says a name you know, and then a name you have only just learned.',
      directorNotes:
        'Only for a player who has been told about Tam. The voice is a man’s, mid-twenties, and it says: Cole, open it, it is me, open the gate. Do not make it ghostly. It is a sentence somebody said once, on a footbridge, two years ago.',
      setsFlags: ['heard_tam'],
      cancelledByFlags: [],
      requiresFlags: ['knows_about_tam', 'heard_the_horde'],
      movesCharacters: [],
    },
    {
      id: 'we_front_in_sight',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'the_north_road',
      publicCopy: 'Smoke-coloured movement on the north road under the motorway bridge: the front of the Horde, two miles off and walking.',
      directorNotes:
        'From the watchtower it is a smudge. From the road it is a wall of people walking at the pace of a funeral. The camp sees it for the first time and the mood on the island changes by the hour.',
      setsFlags: ['horde_in_sight'],
      cancelledByFlags: ['horde_turned_aside', 'went_with_the_horde'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'the_horde', toLocationId: 'the_north_road' }],
    },
    {
      id: 'we_doc_drops_the_tray',
      atWorldMinute: 1440 + 14 * 60,
      locationId: 'the_infirmary',
      publicCopy: 'A crash from the boathouse. Doc Amari has dropped a tray of instruments, and she is staring at her own hands.',
      directorNotes:
        'Her temperature is falling and her hands have started to shake. To a grey she now feels faintly cool, like a room where the fire went out an hour ago. She will make a joke about clumsiness and pull her sleeves down.',
      setsFlags: ['doc_running_cold'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_vote',
      atWorldMinute: 1440 + 19 * 60 + 30,
      locationId: 'lock_yard',
      publicCopy: 'Cole calls the whole camp to the cook fire and puts it to a vote: keep the grey, sell it to the Ferrymen, or put it out past the wire.',
      directorNotes:
        'Thirty-eight people with a crowd two miles off. How the vote goes depends on what the player has done with a day and a half: who they helped, who they frightened, who will stand up and say so. Jessa will speak if she has decided to. Sunny will speak whatever happens, too fast.',
      setsFlags: ['the_vote_called'],
      cancelledByFlags: [],
      requiresFlags: ['let_in'],
      movesCharacters: [
        { characterId: 'cole', toLocationId: 'lock_yard' },
        { characterId: 'jessa', toLocationId: 'lock_yard' },
        { characterId: 'sunny', toLocationId: 'lock_yard' },
        { characterId: 'doc', toLocationId: 'lock_yard' },
      ],
    },
    {
      id: 'we_a_voice_you_know_again',
      atWorldMinute: 2 * 1440 + 3 * 60 + 10,
      locationId: null,
      publicCopy: 'Closer now, and clearer: the same man’s voice in the murmur, saying the same sentence about a gate.',
      directorNotes:
        'A second chance at the same discovery for a player who learned about Tam late. It is louder because the crowd is nearer, and it is unmistakably aimed at the Lock.',
      setsFlags: ['heard_tam'],
      cancelledByFlags: [],
      requiresFlags: ['knows_about_tam', 'heard_the_horde'],
      movesCharacters: [],
    },
    {
      id: 'we_at_the_water',
      atWorldMinute: 2 * 1440 + 5 * 60,
      locationId: 'the_towpath',
      publicCopy: 'Dawn, and the towpath is full. Four thousand greys stand along the far bank, facing the Lock, humming, and the water is the only thing between you.',
      directorNotes:
        'They do not attack. They wait, swaying, leaning towards the warmth on the island. The weir is running and it is holding them. Everybody at the Lock can see what happens if it stops.',
      setsFlags: ['horde_at_the_water'],
      cancelledByFlags: ['horde_turned_aside', 'went_with_the_horde'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'the_horde', toLocationId: 'the_towpath' }],
    },
    {
      id: 'we_the_lock_gates',
      atWorldMinute: 2 * 1440 + 22 * 60,
      locationId: 'the_wire',
      publicCopy: 'Night. The crowd behind the front is so heavy that the front is being pushed into the canal, and the old lock gates start to groan.',
      directorNotes:
        'This is the loss that needs no mistake. If nobody has turned the crowd, flooded the island or moved the camp, the front crosses that night. Write it as a scramble to get people onto the boats, never as gore, and let the player decide who they carry.',
      setsFlags: ['the_lock_under_pressure'],
      cancelledByFlags: ['horde_turned_aside', 'lock_held', 'lock_abandoned', 'went_with_the_horde'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'the_horde', toLocationId: 'the_wire' }],
    },
  ],
  promises: [
    {
      id: 'p_whether_they_keep_you',
      kind: 'FINALE',
      label: 'Whether the Lock keeps you, and as what',
      seedHint: 'A folded blanket on the pump-house floor that somebody left without being asked.',
      payoffHint: 'The camp decides out loud what you are to them, and this time you get a say.',
      weight: 1,
    },
    {
      id: 'p_the_horde',
      kind: 'BOSS',
      label: 'Four thousand, coming down the valley',
      seedHint: 'A murmur at the edge of hearing that lurches every night at nine o’clock.',
      payoffHint: 'The crowd reaches the water, and whether the Lock stands depends on what you did with two days.',
      weight: 0.9,
    },
    {
      id: 'p_the_brother',
      kind: 'RELATIONSHIP',
      label: 'Why Jessa did not shoot',
      seedHint: 'Seven hundred tally marks on a crossbow stock, one for every night she checked a grey’s face at the wire.',
      payoffHint: 'Her brother’s last sentence, still in the murmur, and the man who shut the gate on him.',
      weight: 0.8,
    },
    {
      id: 'p_the_sleeve',
      kind: 'RELATIONSHIP',
      label: 'What Doc Amari is keeping under her sleeve',
      seedHint: 'Cardigan sleeves pulled down over her wrists in a warm week, and a tray she drops for no reason.',
      payoffHint: 'Eleven days of falling temperatures in her own handwriting, and your blood as the only answer she has.',
      weight: 0.75,
    },
    {
      id: 'p_trial_nine',
      kind: 'MYSTERY',
      label: 'Why you are still thinking',
      seedHint: 'A hospital wristband that will not come off: TRIAL 9, number 31.',
      payoffHint: 'Forty beds on the fourth floor of a dead hospital, and one other number with the same red note as yours.',
      weight: 0.5,
    },
  ],
  archetypes: [
    {
      id: 'arch_nurse',
      name: 'You Were a Nurse',
      role: 'Healing and steady nerves',
      summary: 'You know bodies, including your new one, so you stay steadier near warm people and you are better at telling who is sick. You still have your penlight.',
      playstyle: ['Calm', 'Clinical', 'Reads people'],
      blurb: 'Twelve years of night shifts taught you to keep your voice level while somebody panics, and it turns out that still works from this side.',
      attributeBonus: { resolve: 2, mind: 1 },
      skillProficiencies: { stillness: 2, insight: 2, persuasion: 1 },
      startingItems: [{ itemId: 'penlight', qty: 1 }],
      startingAbilities: ['walk_among_them', 'read_the_warmth'],
      startingReputation: [],
    },
    {
      id: 'arch_courier',
      name: 'You Drove Deliveries',
      role: 'Scout and scavenger',
      summary: 'You know every back street in the dead town and where things were kept, so supply runs are where you shine. Your delivery map of Wexley, every back door and key-safe code in your handwriting, is still in your pocket.',
      playstyle: ['Knows the town', 'Quick hands', 'Scavenger'],
      blurb: 'You delivered to every door on Wexley High Street for six years. Most of the same faces are still standing in them.',
      attributeBonus: { agility: 2, mind: 1 },
      skillProficiencies: { scrounging: 3, stealth: 2 },
      startingItems: [{ itemId: 'courier_map', qty: 1 }],
      startingAbilities: ['walk_among_them', 'scrounge'],
      startingReputation: [],
    },
    {
      id: 'arch_engineer',
      name: 'You Fixed Machines',
      role: 'Technical and heavy work',
      summary: 'Locks, pumps, winches and generators make sense to you, and dead strength makes you the best pair of hands the camp has ever had. Your heavy multitool is still on your belt.',
      playstyle: ['Practical', 'Strong', 'Fixes things'],
      blurb: 'You maintained pumping stations up and down this valley. You have opinions about this weir, and they are not kind.',
      attributeBonus: { might: 2, mind: 1 },
      skillProficiencies: { mechanics: 3, fighting: 1 },
      startingItems: [{ itemId: 'multitool', qty: 1 }],
      startingAbilities: ['walk_among_them', 'dead_lift'],
      startingReputation: [{ factionId: 'faction_lock', amount: 5 }],
    },
    {
      id: 'arch_talker',
      name: 'You Talked for a Living',
      role: 'Persuasion and bluffing',
      summary: 'You sold things, or taught, or argued for a living, so you are best at talking people out of pointing things at you. A laminated VISITOR lanyard still hangs round your neck.',
      playstyle: ['Persuasive', 'Quick talker', 'Bluffs'],
      blurb: 'You once sold a conservatory to a man who lived in a flat. A crossbow is only a harder room.',
      attributeBonus: { presence: 3 },
      skillProficiencies: { persuasion: 3, deception: 2 },
      startingItems: [{ itemId: 'visitor_lanyard', qty: 1 }],
      startingAbilities: ['walk_among_them', 'make_terms'],
      startingReputation: [],
    },
    {
      id: 'arch_doorman',
      name: 'You Kept the Door',
      role: 'Defence and intimidation',
      summary: 'You worked doors and night security, so you know how to stand, how to frighten, and how to win a scrap you did not start. You still carry the long steel torch from the door.',
      playstyle: ['Tough', 'Intimidating', 'Close quarters'],
      blurb: 'Nine years on the door of a club on the ring road. You have been asked to leave by bigger men than whoever runs that camp, and you never once went quietly.',
      attributeBonus: { might: 2, resolve: 1 },
      skillProficiencies: { menace: 3, fighting: 2 },
      startingItems: [{ itemId: 'door_torch', qty: 1 }],
      startingAbilities: ['walk_among_them', 'show_your_teeth'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What were you called, when you were alive?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Robin Okafor' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What did you do before you died?',
      helpText:
        'The job you had before the grey, which sets what your hands and head still remember how to do. It is fixed for the whole story and cannot be changed later. It does not decide whether you stay polite, whether the camp keeps you, or what you do about the hunger; all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do you still remember about yourself?',
      helpText: 'The part of you the grey did not take. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I always held doors for people, and I still know every word of one terrible song.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct at the wire?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite on turn one and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'be_polite', label: 'Keep saying please until it works' },
        { id: 'let_them_look', label: 'Let them look, and let them decide' },
        { id: 'warn_them', label: 'Tell them what you can hear coming' },
        { id: 'walk_away', label: 'Turn round and find somewhere they are not' },
        { id: 'test_it', label: 'Find out what this body can do' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do you look like now?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A grey face, a good coat, and a work badge from a job that does not exist any more.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Four of these are the Lock not keeping the player, and none of them is a
   * punishment. "The Lock Falls" is what happens when nobody turns the crowd,
   * so it is reachable by doing nothing for two days, which is the honest
   * failure of a camp behind water. "Home, in the Murmur" is joining the
   * crowd, and is written as a homecoming. "The Grey Who Left" is walking
   * away, and is available early.
   *
   * Only "Participant Thirty-One" needs the optional Trial Nine thread.
   */
  endings: [
    {
      id: 'end_one_of_the_lock',
      name: 'One of the Lock',
      rarity: 'COMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['horde_passed', 'first_day_over'],
        flagsUnset: ['went_with_the_horde', 'sold_to_ivo', 'lock_fell'],
        minFactionReputation: [{ factionId: 'faction_lock', value: 20 }],
      },
      condition:
        'The crowd has passed and the camp has kept the player, not as a weapon or a specimen but as somebody with a job, a chair near the stove and a call sign on the board. Play it small and ordinary: a morning, a mug nobody needed to offer, a chore. Do not have anybody make a speech about what the player is.',
      epilogue:
        'They take the chains off the footbridge rule in the spring, after a vote that takes four minutes. Somebody knits a hat. The pump house becomes a store again, though the blanket stays folded in the corner, and nobody moves it.',
      hint: '',
    },
    {
      id: 'end_the_shepherd',
      name: 'The Shepherd',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['you_led_them', 'horde_passed'] },
      condition:
        'The player walked at the front of four thousand greys and took them away from the living. This ending is about the cost: they cannot come back to the warm lights without bringing the crowd, so they keep walking, and the camp lives because they do. Write it as a vocation, never as an exile.',
      epilogue:
        'Every few weeks the radio in the shed picks up a single click on the repeater channel, at dawn, from somewhere up the valley. Sunny clicks back. Nobody at the Lock has ever asked him to stop, and the crowd has never come south again.',
      hint: 'Something has to be louder than the tone.',
    },
    {
      id: 'end_say_something_else',
      name: 'Say Something Else',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['jessa_told_you', 'horde_passed'],
        flagsUnset: ['went_with_the_horde'],
        minRelationship: [
          { characterId: 'jessa', dimension: 'trust', value: 70 },
          { characterId: 'jessa', dimension: 'affection', value: 55 },
        ],
      },
      condition:
        'Jessa trusts the player with her back turned, and it has become something warmer than trust. Keep it careful and slow, at the speed of somebody who has spent two years expecting the worst: a shared watch, her shoulder against a cold arm on purpose, at most one kiss. The point is that she waited, and it was worth it.',
      epilogue:
        'She still takes the night watch. There are two stools on the platform now. She has stopped scratching tally marks into the crossbow, and the last one is a different shape from the rest, which she will explain to nobody.',
      hint: '',
    },
    {
      id: 'end_the_last_thing_he_said',
      name: 'The Last Thing He Said',
      rarity: 'UNIQUE',
      minTurn: 36,
      requires: { flagsSet: ['tam_brought_home', 'brother_question_closed'] },
      condition:
        'The player found Tam Marlow in the murmur and walked him to the wire so his sister could see him. He does not know her. She knows him. Write it with complete restraint: one grey at a fence at dawn, one woman with a crossbow she does not raise, and the sentence he has been saying for two years finally reaching the person it was for.',
      epilogue:
        'She asks the player to take him back to the crowd, and they do. Cole gives up the watch rota the following week and nobody asks why. Jessa wears a green work jacket with a radio badge on it now, and it is far too big for her.',
      hint: 'Somebody in the murmur is still talking to the gate.',
    },
    {
      id: 'end_two_of_us',
      name: 'Two of Us',
      rarity: 'RARE',
      minTurn: 36,
      requires: {
        flagsSet: ['doc_tried_it', 'cure_question_answered'],
        minRelationship: [{ characterId: 'doc', dimension: 'trust', value: 60 }],
      },
      condition:
        'Doc Amari used the player’s blood on herself, and it did not cure her. It did something stranger: when the grey took her, it left her mind behind, the way it left the player’s. There are now two greys at the Lock who say please. Write it as two scientists with one notebook, frightened and delighted in turns.',
      epilogue:
        'Her casebook has two sets of handwriting in it now, and one of them is getting steadier. She still asks permission before she touches anything. The camp has stopped finding that funny and started finding it the most reassuring thing on the island.',
      hint: '',
    },
    {
      id: 'end_participant_thirty_one',
      name: 'Participant Thirty-One',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: { flagsSet: ['trial_answered', 'knows_who_you_were'] },
      condition:
        'The player read their own file on Ward Nine and knows who they were: a name, an address, a dose, and a red note that asks whether they would stay lucid. This ending is about deciding what to do with a name after you have died, and whether to go looking for number 12. Nobody explains the science, because nobody alive can.',
      epilogue:
        'The address is a terraced house four miles away with a blue door. The player goes once, stands on the step, and does not knock. Then they walk back to whoever was waiting for them, which turns out to be the answer to a question the trial never thought to ask.',
      hint: 'The band has a number on it for a reason.',
    },
    {
      id: 'end_downstream',
      name: 'Downstream',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['camp_on_the_river', 'horde_passed'] },
      condition:
        'The player made the deal that put thirty-eight people on Ivo Kade’s barge, and the Lock was left to the crowd. Write the logistics: diesel, bunks, who sleeps on deck, the grey who rides on the roof because the cabins are too warm. Leaving home is not a defeat when everybody is on the boat.',
      epilogue:
        'The barge reaches the coast in October. Ivo keeps every term of the deal, including the clause the player added at the last minute, and he complains about it in every port. Nobody at the coast laboratory ever gets near the roof.',
      hint: '',
    },
    {
      id: 'end_cargo',
      name: 'Cargo',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['sold_to_ivo'], flagsUnset: ['ferrymen_enemy'] },
      condition:
        'The camp voted, and the player was sold to the Ferrymen for diesel and salt. Do not write it as a tragedy or a betrayal: thirty-eight frightened people chose the arithmetic. What matters is who came down to the landing to say goodbye, and what the player says to Ivo once the Lock is out of sight.',
      epilogue:
        'Ivo keeps the player on deck rather than in the hold, which he describes as a business decision. By the second lock downriver they are haggling over the price together, and by the coast he has started to wonder whether he is the one being sold.',
      hint: '',
    },
    {
      id: 'end_home_in_the_murmur',
      name: 'Home, in the Murmur',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['went_with_the_horde'] },
      condition:
        'The player answered the murmur and walked into the crowd still themselves: one mind of their own inside four thousand. This is a homecoming as well as a loss, and both must be true on the page: it is warm in there, everybody says so, and the player goes in by choice, not in surrender, and does not stop being who they are. No gore, no horror beats; a crowd closing around somebody like a coat.',
      epilogue:
        'For a week afterwards Jessa thinks she can see a face in the crowd that tilts its head a little differently from the rest. Then the crowd moves north, and the murmur has one more word in it than it used to, which is please, said at the start.',
      hint: '',
    },
    {
      id: 'end_the_lock_falls',
      name: 'The Lock Falls',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['lock_fell'] },
      condition:
        'Nobody turned the crowd in time, and the front crossed the night after it reached the water. This is the honest failure of a camp behind water and must not be written as a punishment. It is a scramble in the dark: boats, ropes, names shouted, and a grey who can walk through the crowd carrying people out of it.',
      epilogue:
        'Twenty-nine of the thirty-eight reach the river. They count the rest out loud on the bank, by name, which is the first time anybody has heard Cole Garrity use first names. The player is the one who goes back in for the last of them.',
      hint: '',
    },
    {
      id: 'end_the_grey_who_left',
      name: 'The Grey Who Left',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['went_with_the_horde'] },
      condition:
        'The player walked away from the Lock, the crowd and everybody who wanted something from them, and did not explain. It is a coherent response to waking up dead and being argued over, and it should be written without judgement. What it costs is felt by the people at the wire, not by the prose.',
      epilogue:
        'Jessa adds one more tally mark to the crossbow that night, and then, after some thought, scratches it out. Sunny leaves the space on the call-sign board empty all winter. Nobody says please at the wire again for a long time.',
      hint: '',
    },
    {
      id: 'end_the_pump_house',
      name: 'The Pump House',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['horde_passed'],
        flagsUnset: ['jessa_vouched', 'proved_useful', 'proved_restraint', 'lock_fell', 'went_with_the_horde', 'sold_to_ivo', 'stayed_outside'],
      },
      condition:
        'The crowd passed and the camp kept the player, and never once trusted them. They are useful, fed with hot water and kept behind a bolted door. This is the cautious ending and it should be quiet rather than cruel: everybody is polite, nobody is cruel, and the bolt is always shot at night.',
      epilogue:
        'Doc Amari visits every morning with a question and a hot water bottle. Sunny talks through the door for an hour at a time. The bolt stays, and so does the player, which after a while is its own sort of answer.',
      hint: '',
    },
  ],
  opening:
    "\"Don’t. Move.\"\n\nThe woman behind the wire has a crossbow, and the bolt is resting on your chest. Under it, nothing beats.\n\n\"Jessa!\" yells the man on the watchtower. \"That’s a grey. Put a bolt in it!\"\n\nJessa doesn’t. She’s staring at your eyes, which are apparently the wrong kind of clear.\n\nYour hands on the wire are grey. You don’t remember the walk here. You remember one word, the one you said when you reached the fence.\n\nPlease.\n\n\"Two years of them at this wire,\" Jessa says, \"and you’re the first one who ever said please.\"\n\nThe bolt presses in.\n\n\"Say something else. Now.\"",
  openingPanel: {
    assetKey: 'story_the_zombie_who_said_please/opening',
    alt: 'Jessa in a knitted cap and oversized canvas coat, behind a chain-link fence in cold blue dawn, aiming a crossbow at you through the mesh while your grey hands grip the wire.',
  },
  openingSuggestions: [
    "\"Thank you for not shooting me. I would be very grateful if you kept not doing it.\"",
    'I take my hands off the wire, one at a time, and step back into the light so she can see my eyes.',
    "I turn my back on the crossbow and point up the valley. \"Something’s coming. I can hear it. Thousands of them.\"",
  ],
  coverDirection: [
    'SUBJECT: Jessa Marlow, the night watch at a survivors’ camp, alone and unmistakable in the foreground of a key visual for a dark-comedy horror anime about a polite zombie.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture, standing behind a chain-link fence.',
    'Cropped black hair under a grey knitted watch cap, dark watchful eyes, a scuffed olive canvas coat two sizes too big, fingerless wool gloves.',
    'She holds a wooden crossbow levelled straight at the viewer through the mesh, rows of tally marks scratched along its stock.',
    'Her expression is wary and startled at once, eyebrows raised, lips parted, as if a stranger at the fence had just said something impossibly polite; she looks straight at the viewer.',
    'IN THE LOWER FOREGROUND, close to the viewer: two hands resting politely on the wire, the viewer’s own, clean and whole and simply a cold ashen grey, a plain white plastic hospital band with no lettering on one wrist.',
    'HER FACE STAYS CLEAN: no frost, mist, grey tint, shadows or marks on her face or skin.',
    'Every cold effect, frost and mist, stays on the fence, the grey hands, the water and the title, never on her face.',
    'BEHIND HER, soft and secondary: a canal lock at dawn, chain-link strung with tin cans, a scaffold watchtower with one warm lamp, a narrowboat on black water under low mist,',
    'and far up the valley road, small and out of focus, a crowd of still grey silhouettes all leaning the same way. Nothing in the picture is wounded or bloody.',
    'LIGHT: cold blue dawn light across her face and the crossbow, warm orange lamplight from the watchtower behind her, so she is rimmed in warm gold and lit in cold blue.',
    'TITLE: the title The Zombie Who Said Please painted into the art in the upper third, in the dawn sky above her head, as a chunky hand-painted horror-comedy logo in two lines,',
    'THE ZOMBIE on the first line and WHO SAID PLEASE on the second, off-white letters with a cold frost-blue edge like paint on a wooden camp sign, the word PLEASE a little larger than the rest.',
    'Spelled exactly THE ZOMBIE WHO SAID PLEASE, five words, large and legible at thumbnail size. A thin rim of frost runs along the letters only. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const THE_ZOMBIE_WHO_SAID_PLEASE = StoryVersion.parse(raw);
