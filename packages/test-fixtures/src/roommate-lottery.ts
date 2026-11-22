import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Roommate Lottery" — forced proximity with a clock and a referee.
 *
 * Bible: `docs/story-bibles/new50/19_ROOMMATE_LOTTERY.md`. Slate #19, drop 1.
 *
 * Playable span: six days, from move-in Saturday at twenty to eleven to the
 * housing appeals hearing on Friday at ten. Everything after the hearing
 * lives in the endings. The structure is Good Morning, Husband's: an ordinary
 * week that is a complete game on its own, a secret with a deadline, and an
 * optional mystery (how she got the room) that never forces itself on a
 * player who does not pull on it.
 *
 * What makes it go is two voices. Yuri Sakamoto streams to two million people
 * in a bright voice an octave up, and talks to the player through the bedroom
 * door in a flat, dry, tired one. The player is the only person on campus who
 * hears both. The romance is that, and it is optional: thirty turns of a
 * bathroom schedule and noodles at two in the morning are meant to be good.
 *
 * Production runs `runTurnPure`, which reads the premise, tone guide, hard
 * canon, cast, opening, style examples, places, quest items, factions, quest
 * summaries, world events and the first twelve endings. It never sees
 * resources, step notes or the ability list except the chosen archetype's
 * starting abilities. So every age, every secret and the whole week's
 * timetable are in hard canon or in world-event notes, the documents the plot
 * turns on are quest items, every archetype starts with one ability the
 * storyteller can read, and there are exactly twelve endings.
 *
 * 13+: separate rooms, a locked door, a bathroom schedule. Nothing goes
 * further than a kiss and nothing lingers on anybody. Every character is an
 * adult and the first hard-canon line says how old.
 *
 * Three invisible variables. Energy is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Exposure comes first among the descending pair
 * on purpose: public violence raises the first GOOD_LOW in array order, and a
 * fight in a dorm corridor gets filmed. Her Guard is how much of the stream
 * voice she is still using on you, and it comes down with time spent.
 */

const raw = {
  id: 'sv_roommate_lottery_1',
  storyId: 'story_roommate_lottery',
  version: 1,
  title: 'Roommate Lottery',
  fantasyLabel: 'Your roommate has two million followers.',
  hook: 'A housing glitch put you in the same room as the most famous streamer on campus. She has until her coffee is done to evict you.',
  openingObligations: [
    {
      what: 'Prove Room 12C is yours before Yuri finishes her iced coffee, or she starts moving her suitcases in.',
      withCharacterId: 'yuri',
      dueInMinutes: 10,
    },
  ],
  premise:
    'You are a third-year student at Westmere, a big city university, and for two years you commuted ninety minutes each way to get there. This year you finally won the housing lottery: a room of your own on the twelfth floor of Linden House, with a window over the river and a bedroom door that locks.\n\n' +
    'On move-in morning the system assigned the same room to Yuri Sakamoto. She is the most famous student on campus, she streams to two million people most nights, and she has never once said on air where she lives.\n\n' +
    'The housing office, which hands out every room on campus, has four hundred move-in tickets and no empty beds. Ms. Park, who runs it, cannot fix it until the appeals hearing on Friday. So until then the room belongs to both of you, and one of you sleeps on the sofa.\n\n' +
    'You have six days to keep the room, give it up, or find a third answer. Her manager wants a mystery roommate for the stream. A campus gossip account is offering money for her door. And she has a reason for needing this building that she has not told you.\n\n' +
    'If anybody finds out which door is hers, she loses the only place she feels safe.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Comedy', 'Slice of life', 'Modern', 'University'],
  mechanicsChips: [
    'One room, two names on it',
    'She can say no',
    'A hearing on Friday',
    'Keep her secret, or sell it',
    'Romance is earned, not owed',
  ],
  contentDescriptors: ['ROMANCE', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'LIGHT',
  creatorNote:
    'You can spend the whole week arguing about the bathroom shelf, cooking noodles at two in the morning and helping her pass statistics, and that is a real way to play this. You can also go on her stream, win the room on a technicality, or sell her door to a gossip account. She is not a prize. She is a very tired person with a very loud job, and she has not decided about you yet either.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'the_room',
    startWorldMinute: 10 * 60 + 40,
    startingItems: [{ itemId: 'housing_email', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is a third-year undergraduate, twenty or older. Yuri Sakamoto is twenty-one, Ben Castillo twenty, Kit Navarro twenty-two, Jonah Whitlock twenty-one, Haneul Seo twenty-nine and Ms. Park Eun-ha forty-eight. Westmere is a university and every resident of Linden House is over eighteen.',
      'The story opens on move-in Saturday at twenty to eleven. The player and Yuri Sakamoto were both assigned Room 12C in Linden House, a single-occupancy unit on the twelfth floor: one bedroom with the only lockable door, a living room with a fold-out sofa, a kitchenette with two hobs, and one bathroom with one shelf. The player’s assignment came from the housing lottery, number 0447. Hers has no lottery number, only a reference code beginning OVR.',
      'Ms. Park has no empty bed anywhere on campus. Until the housing appeals hearing on Friday at ten, in Room 204 of the housing office, both of them are lawfully resident in 12C. Whoever does not take the bedroom sleeps on the sofa.',
      'Yuri streams as yurisaka to about two million followers, most nights from nine until one, in a bright voice an octave above her real one. Three weeks ago her old downtown address was posted online and people have waited outside it with cameras ever since. She needed a building with key-card gates and a staffed front desk. She has told her chat she is travelling and has told nobody at the university.',
      'Haneul Seo, her manager, asked the university’s communications office for a secure room after the leak. Somebody there entered an override with a dean’s code on Thursday night and never cancelled the player’s lottery assignment. Yuri thinks she won the lottery. Ms. Park found the code on Saturday morning and has the log printed in her desk drawer.',
      'Quadwatch is an anonymous campus gossip account with about forty thousand followers that pays for tips. On Sunday morning it posts a bounty: five hundred dollars for Yuri’s building, a thousand for her door. Jonah Whitlock in 12D runs it, to pay a tuition bill due in nine days. Nobody on the floor knows.',
      'Ben Castillo, the player’s best friend, has been a volunteer moderator in Yuri’s chat for eighteen months under the name lanternfish. He deleted the post with her address at three in the morning. Yuri knows lanternfish well and has never seen his face.',
      'Yuri is failing a required statistics course. One more failed course puts her on academic probation, and her parents think streaming is a hobby.',
      'The week: Haneul arrives Saturday afternoon with a non-disclosure agreement; Kit holds a floor meeting Saturday night; the bounty goes up Sunday morning; a fire drill empties the building in the small hours of Monday; Haneul pitches a roommate reveal stream for Wednesday night; the hearing is Friday at ten.',
      'Nobody has powers and nothing supernatural happens. A shove is a shove: violence brings campus security, a conduct referral and a voided housing contract.',
      'Yuri is not a prize and cannot be won. She can say no, change her mind, get angry and move out. Romance between anybody goes no further than a kiss on the page.',
    ],
    toneGuide:
      'Fast, funny and specific, in short webnovel beats. This is a story about two strangers sharing one bathroom shelf, and the comedy lives in small physical things: the kettle, the bar of the fold-out sofa, the early alarm, the trombone in 12F, whose turn it is to buy milk. ' +
      'Yuri has two voices. The stream voice is bright and an octave higher; the real one is flat, precise and very dry. The player is the only person who hears both, and that contrast is the romance. ' +
      'The tension is privacy. Phones are everywhere, the lobby is the most dangerous room in the building, and a careless post is a real event with real consequences. ' +
      'Romance is slow, earned and optional: teasing, tension, a hand held on a roof, at most a kiss. There is no fan service. Separate rooms, a locked door, a bathroom schedule; never linger on bodies or clothes. ' +
      'Nobody has powers. A shove is a shove, and violence brings campus security and a conduct hearing. Nobody is a villain for wanting something, including whoever runs the gossip account. ' +
      'If a scene has nothing at stake, let it be pleasant and short. The face at the top of a beat is Yuri’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Yuri reads your email twice. Then hers. Then yours again.\n\n"Your lottery number is four-four-seven," she says. "Mine doesn’t have one."\n\nShe says it flatly, like a bug report.\n\nThe straw rattles at the bottom of the cup. She stops drinking.\n\n"Fine. Overtime."',
      'Ben stares at the wall your living room shares with the bedroom.\n\n"She’s through there," he whispers. "Right now. Through that wall."\n\n"She can hear you."\n\n"I know she can hear me." He keeps whispering. "Hi. Big fan. Normal amount of fan."\n\nFrom the other side, very clearly: "Your friend is weird."',
      'At nine exactly, the voice through the door goes up an octave.\n\n"Hiiii, chat! Did you miss me? Don’t lie."\n\nAt four minutes past one it stops.\n\nThe door opens. She walks past you to the kettle in socks, face blank, and fills it without a word.\n\n"Don’t," she says, before you can. "That’s her. I’m the one who needs tea."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 11, resolve: 11, arcana: 8 },
  skills: [
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Not moving when moving would be easier.' },
    { id: 'wit', name: 'Wit', attribute: 'mind', description: 'The comeback, the bluff, the line that lands half a second before hers.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being somebody people like having in the frame, or in the kitchen.' },
    { id: 'notice', name: 'Noticing', attribute: 'mind', description: 'What changed in a room, and what she checks three times.' },
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'Feeding two people at two in the morning from one shelf of a shared fridge.' },
    { id: 'study', name: 'Studying', attribute: 'mind', description: 'Actual coursework. Formulas, deadlines, explaining it twice without sighing.' },
    { id: 'legwork', name: 'Legwork', attribute: 'might', description: 'Boxes up twelve floors, a sofa through a door, the quad at a run.' },
    { id: 'sneak', name: 'Sneaking', attribute: 'agility', description: 'Getting through a lobby full of phones without being the interesting thing in it.' },
    { id: 'netsense', name: 'Internet Sense', attribute: 'arcana', description: 'How the internet actually works: accounts, screenshots, who posted first and from where.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is GOOD_HIGH because `resolveRest` restores those, and because a
   * week on a fold-out sofa genuinely runs out. It is also what the generic
   * cost path spends, which is right: the price of a bad exchange in a shared
   * flat is that you have less of the day left.
   *
   * Exposure is first of the descending pair because public violence raises
   * the first GOOD_LOW in array order, and in a dorm a fight gets filmed. Her
   * Guard starts high, because she has known you for ten minutes, and falls on
   * its own as time passes in the same flat.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 75,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is running on nothing: monosyllables, missed jokes, agreeing to things to end conversations. Sharing one unit with somebody on a different clock shows here first.',
      color: '#F2B5C8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing after a night on the bar of a fold-out sofa. The player misses jokes by a beat, says yes to end conversations, and is one bathroom argument away from a real fight. Sleep is the correct move, and the sofa is the problem.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long campus day. Fine for one more errand across the quad and honest about not wanting two. Good for noodles and a film, bad for a hearing or for being on camera.',
        },
        {
          upTo: 100,
          behaviour:
            'Awake and quick. Room to be curious, to cook something that takes an hour, to win an argument by being funny instead of loud. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 20,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody on campus knows which door is hers, or cares. She walks through the lobby with her hood down and checks the lock once.',
      color: '#C94F6D',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Her door is still a secret. The campus knows she is around somewhere, the way it knows the weather. She crosses the lobby in a hood and nobody looks twice, and she only checks the lock once at night.',
        },
        {
          upTo: 55,
          behaviour:
            'People are looking. Somebody has seen her in the lobby twice, the flyer has been shared in the floor chat, and Jonah asks one more hypothetical than usual. She stops going out after dark and asks the player to get the post.',
        },
        {
          upTo: 80,
          behaviour:
            'Phones come up when she crosses the lobby. A stranger has asked the front desk which floor she is on. Haneul calls every hour. She sleeps with the ring light unplugged and a chair under the bedroom handle.',
        },
        {
          upTo: 100,
          behaviour:
            'Her door is known, or about to be. People wait outside Linden House the way they waited downtown. Every scene is about getting her in or getting her out, and she is already packing.',
        },
      ],
    },
    {
      id: 'guard',
      name: 'Her Guard',
      max: 100,
      start: 70,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'She is completely herself with the player: the real voice all the time, sentences left unfinished because she assumes they have the end, asleep on the sofa halfway through an argument about a film.',
      color: '#8FA8D8',
      bands: [
        {
          upTo: 20,
          behaviour:
            'She has stopped performing at the player. The real voice, all the time. She volunteers things instead of being asked, leaves the bedroom door open while she edits, and saves the last of the noodles without mentioning it.',
        },
        {
          upTo: 50,
          behaviour:
            'Friendly and still checking. Funny, sharp, warmer after eleven at night. She tells the small true things and keeps the big ones, and she still locks the bedroom door, quietly, so it will not be heard.',
        },
        {
          upTo: 80,
          behaviour:
            'Polite and closed. She talks to the player in the stream voice, sets terms instead of having conversations, and keeps everything of hers behind the bedroom door. She is not hostile. She is managing them, like a chat.',
        },
        {
          upTo: 100,
          behaviour:
            'A stranger she is planning around. One-word answers, headphones in, door locked, and a call to Haneul about a hotel. Anything warm from her now is a decision rather than a reflex, and it shows.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'housing_email',
      name: 'Your Assignment Email',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'A printout from Residence Life: Room 12C, Linden House, single occupancy, your name, lottery number 0447, confirmed on Tuesday at 09:14. You have read it eleven times.',
      loreText: 'You printed it because you did not trust your phone with it. Two years of a ninety-minute commute are folded into it.',
      icon: 'letter',
    },
    {
      id: 'her_email',
      name: 'Her Assignment Email',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The same printout with her name on it: Room 12C, Linden House, single occupancy. Where yours has a lottery number, hers has a reference code, OVR-DS-0091, confirmed on Thursday at 23:52.',
      loreText: 'OVR is not a code students are ever meant to see. Ms. Park would know it on sight.',
      icon: 'letter',
    },
    {
      id: 'iced_coffee',
      name: 'Her Iced Coffee',
      tags: ['drink'],
      consumable: { resourceId: 'energy', amount: 10, consumesItem: true },
      description:
        'An iced coffee the size of a vase, oat milk, her name misspelled on the cup in marker. It is the clock. When it is empty, you are supposed to be gone.',
      loreText: 'She drinks it slowly when she is winning and fast when she is nervous.',
      icon: 'mug',
    },
    {
      id: 'ring_light',
      name: 'The Ring Light',
      tags: ['gear'],
      description: 'A ring light on a folding stand, the first thing she unpacked. Switched on, it turns the whole room into a set.',
      loreText: 'There is a strip of tape on the floor where the stand goes, placed so the window behind her never shows the river.',
      icon: 'lamp',
    },
    {
      id: 'roommate_agreement',
      name: 'The Roommate Agreement',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A blank Residence Life form from the welcome pack: quiet hours, guests, cleaning, food, and a box marked "anything else". Two signature lines and a lot of empty space.',
      loreText: 'Kit says the record on twelve is eleven pages. Nobody has ever needed one for a single.',
      icon: 'papers',
    },
    {
      id: 'quadwatch_flyer',
      name: 'The Quadwatch Flyer',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A flyer with a QR code, taped up by the lifts: SPOTTED ON CAMPUS? Five hundred dollars for the building. A thousand for the door. Tips anonymous.',
      loreText: 'There is a grey toner streak down the left edge. The twelfth-floor printer makes exactly that streak.',
      icon: 'papers',
    },
    {
      id: 'override_log',
      name: 'The Override Log',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'One page from the housing system: Room 12C reassigned on Thursday at 23:52 under a dean’s override code, at the request of the communications office. The lottery assignment it overwrote was never cancelled.',
      loreText: 'Ms. Park printed it on Saturday at 07:58 and has not decided what to do with it.',
      icon: 'papers',
    },
    {
      id: 'failed_quiz',
      name: 'Her Statistics Quiz',
      tags: ['document', 'personal'],
      description: 'Last week’s statistics quiz, forty-one percent, with "please come and see me" written in red across the top.',
      loreText: 'On the back, in her handwriting: every stream for the next month, with the study hours crossed out.',
      icon: 'papers',
    },
    {
      id: 'stats_notes',
      name: 'Your Statistics Notes',
      tags: ['document'],
      skillModifiers: { study: 1 },
      description: 'Two years of colour-coded notes for the exact second-year statistics course everybody fails once.',
      loreText: 'The margin of chapter six says THIS IS ON THE EXAM in three colours.',
      icon: 'book',
    },
    {
      id: 'spice_tin',
      name: 'The Spice Tin',
      tags: ['personal'],
      skillModifiers: { cooking: 1 },
      description: 'A biscuit tin with eight spices in it that you have carried into every kitchen you have ever worked in.',
      loreText: 'The lid says SHORTBREAD. It has not held shortbread in years.',
      icon: 'tools',
    },
    {
      id: 'alarm_clock',
      name: 'The Alarm Clock',
      tags: ['personal'],
      description: 'Analogue, brass bells, set for twenty to six every morning for practice. She streams until one.',
      loreText: 'It has survived two roommates and one attempt on its life with a shoe.',
      icon: 'clock',
    },
    {
      id: 'sticker_laptop',
      name: 'The Laptop With Stickers',
      tags: ['personal'],
      skillModifiers: { netsense: 1 },
      description: 'More stickers than case, a terminal window always open, and fourteen browser tabs about things that are none of your business.',
      loreText: 'You have never once been wrong about a fake account. You have been rude about several real ones.',
      icon: 'laptop',
    },
    {
      id: 'rice_cooker',
      name: 'Her Rice Cooker',
      tags: ['personal'],
      description: 'A dented rice cooker older than both of you, still in her old flat downtown because the movers were told to leave it behind.',
      loreText: 'It was her grandmother’s. She has not said so. She asked the movers for it three times.',
      icon: 'pot',
    },
  ],
  abilities: [
    {
      id: 'stand_your_ground',
      name: 'Stand Your Ground',
      tags: ['social'],
      description: 'Refuse to move, out loud or by sitting down, and make the other person decide what happens next.',
      affordances: ['refuse to move', 'stand my ground', 'claim the room', 'not leaving', 'hold my ground', 'dig in', 'sit on the bed', 'say no'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'guard', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'banter',
      name: 'Trade Jabs',
      tags: ['social'],
      description: 'Answer her deadpan with your own, and see who cracks first.',
      affordances: ['joke', 'tease her', 'banter', 'trade jabs', 'make her laugh', 'comeback', 'roast her', 'be funny'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'wit', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'level_with_her',
      name: 'Tell the Truth',
      tags: ['social'],
      description: 'Say the true thing plainly, about yourself or about what you know, and take what comes back.',
      affordances: ['tell the truth', 'be honest', 'come clean', 'admit it', 'level with her', 'say it straight', 'confess', 'tell her how i feel'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bluff',
      name: 'Bluff',
      tags: ['social'],
      description: 'Say something untrue with a straight face and hold it there.',
      affordances: ['lie', 'bluff', 'make something up', 'pretend', 'fake it', 'give him the wrong door', 'cover story'],
      costs: [{ resourceId: 'energy', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'wit', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'notice',
      name: 'Notice Things',
      tags: ['sight'],
      description: 'Read the room, the paperwork or the person, and catch the detail somebody hoped you would skim.',
      affordances: ['look around', 'notice', 'read her', 'watch her', 'check the email', 'look closer', 'compare the emails', 'study the flyer'],
      costs: [{ resourceId: 'energy', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lend_a_hand',
      name: 'Make Yourself Useful',
      tags: ['utility'],
      description: 'Cook, carry, fix or clean something that needed doing, and put the result in front of somebody.',
      affordances: ['cook', 'make dinner', 'make noodles', 'carry her boxes', 'fix it', 'help her unpack', 'make coffee', 'clean up'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'study_session',
      name: 'Study Session',
      tags: ['utility'],
      description: 'Sit down with the coursework and explain it until it makes sense, to yourself or to somebody failing it.',
      affordances: ['study', 'tutor her', 'help her study', 'go over the notes', 'quiz her', 'teach her', 'do homework', 'revise'],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'study', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_her_hidden',
      name: 'Keep Her Hidden',
      tags: ['utility'],
      description: 'Get her past the phones: a decoy, a laundry trolley, the service stairs, your body between her and a lens.',
      affordances: ['cover for her', 'hide her', 'walk her through the lobby', 'block the camera', 'take the back stairs', 'get her in unseen', 'distract them'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'sneak', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:her_reason'],
        lockedCopy: 'Hidden from what? As far as you know she is a famous person who is bad at sharing a bathroom.',
      },
    },
    {
      id: 'go_on_stream',
      name: 'Go On Stream',
      tags: ['social'],
      description: 'Step into the ring light and say hello to forty thousand strangers, with the window behind you.',
      affordances: ['go on stream', 'walk into her stream', 'say hi to chat', 'be on camera', 'join her stream', 'wave at the camera'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'exposure', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'dig_into_it',
      name: 'Dig Into It',
      tags: ['sight'],
      description: 'Trace an account, a photo or a code back to the person behind it.',
      affordances: ['trace the account', 'dig into it', 'look it up', 'check the metadata', 'find out who runs it', 'search online', 'reverse image search'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'netsense', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['quadwatch_bounty'],
        lockedCopy: 'There is nothing to dig into yet. There is a stranger, a coffee and a room with two names on it.',
      },
    },
    {
      id: 'sell_the_tip',
      name: 'Sell the Tip',
      tags: ['social'],
      description: 'Tell the gossip account which building and which door are hers, and take the money.',
      affordances: ['sell her out', 'tell quadwatch', 'sell the tip', 'give them the room number', 'post where she lives', 'take the money'],
      costs: [{ resourceId: 'exposure', amount: 40 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['quadwatch_bounty'],
        lockedCopy: 'Nobody is paying for anything. She is just a famous person in your doorway.',
      },
    },
    {
      id: 'give_ground',
      name: 'Give Ground',
      tags: ['social'],
      description: 'Let her have it, the room, the argument or the last word, and see what she does with the win.',
      affordances: ['let her have it', 'give up the room', 'take the sofa', 'back down', 'concede', 'let her win', 'withdraw my claim'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_her_company',
      name: 'Keep Her Company',
      tags: ['social'],
      description: 'Do not fix it and do not leave the kitchen. Sit down, put the kettle on, and be there.',
      affordances: ['stay', 'sit with her', 'keep her company', 'say nothing', 'wait', 'listen', 'put the kettle on'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'the_room',
      name: 'Bedroom, 12C',
      shortName: 'The Bedroom',
      description:
        'The room you both have an email for. A bare mattress, a desk under a window over the river, an empty wardrobe, and the only door in the unit with a lock. Four pink suitcases in the doorway and one of your boxes on the bed.',
      artDirection:
        'Small bright modern dorm bedroom on move-in morning, bare mattress, a desk under a big window with a river view, cardboard boxes, four matching pink suitcases in the doorway, a ring light still folded. Clean, sunny, pastel pink and cream.',
      connections: [{ to: 'the_living_room', travelMinutes: 1, label: 'Through to the living room' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'her_email', qty: 1, ownerId: 'yuri', aka: ['her email', 'her printout', 'her assignment', 'her copy'] },
        { itemId: 'iced_coffee', qty: 1, ownerId: 'yuri', aka: ['coffee', 'her coffee', 'the iced coffee', 'the cup'] },
        { itemId: 'ring_light', qty: 1, ownerId: 'yuri', aka: ['ring light', 'the light', 'her light', 'the lamp'] },
      ],
    },
    {
      id: 'the_living_room',
      name: '12C, Living Room',
      shortName: 'Living Room',
      description:
        'A sofa that folds out into a bed nobody would choose, a kitchenette with two hobs and a kettle, a bathroom with one shelf to fight over, and a Residence Life welcome pack on the counter.',
      artDirection:
        'Compact student apartment living room, a grey fold-out sofa with a blanket, a tiny kitchenette with two hobs and a kettle, a bathroom door ajar, a welcome pack on the counter, evening lamp light. Cosy, cramped, lived-in.',
      connections: [
        { to: 'the_room', travelMinutes: 1, label: 'The bedroom door' },
        { to: 'floor_twelve', travelMinutes: 1, label: 'Out into the corridor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'roommate_agreement', qty: 1, ownerId: null, aka: ['agreement', 'the form', 'roommate form', 'welcome pack'] },
        { itemId: 'failed_quiz', qty: 1, ownerId: 'yuri', aka: ['quiz', 'her quiz', 'the test', 'the statistics quiz'] },
      ],
    },
    {
      id: 'floor_twelve',
      name: 'The Twelfth Floor',
      shortName: 'The Corridor',
      description:
        'Eleven doors, a lounge with a broken air hockey table, a laundry room that eats coins, Kit’s room at the far end, and the lifts. Somebody in 12F practises trombone at seven. Jonah’s door in 12D is usually open. At the end, a stairwell door marked ALARMED.',
      artDirection:
        'Modern residence hall corridor, numbered doors, a small lounge with a broken air hockey table, a noticeboard, lifts at one end and a stairwell door with a red warning sign at the other. Fluorescent and friendly.',
      connections: [
        { to: 'the_living_room', travelMinutes: 1, label: 'Back into 12C' },
        { to: 'the_lobby', travelMinutes: 3, label: 'The lift down' },
        { to: 'the_roof', travelMinutes: 2, lockedByFlag: 'roof_open', label: 'The stairwell door marked ALARMED' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_roof',
      name: 'The Roof Garden',
      shortName: 'The Roof',
      description:
        'Planters, two benches, the whole river and the city lights behind it. The door alarm has not worked since spring. Yuri knows that. Almost nobody else does.',
      artDirection:
        'Rooftop garden of a residence tower at night, wooden planters, two benches, string lights, a wide river and city lights below. Quiet, intimate, a little cold.',
      connections: [{ to: 'floor_twelve', travelMinutes: 2, label: 'Back down the stairs' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_lobby',
      name: 'Linden House Lobby',
      shortName: 'The Lobby',
      description:
        'Glass doors, key-card gates, a staffed front desk, a wall of mailboxes and a noticeboard. On move-in weekend it is full of parents, trolleys and phones. Somebody has taped a flyer with a QR code by the lifts.',
      artDirection:
        'Bright glass lobby of a new residence hall, key-card turnstiles, a front desk, mailboxes, trolleys of boxes, a crowd holding phones, a flyer by the lifts. Busy, exposed, daylight.',
      connections: [
        { to: 'floor_twelve', travelMinutes: 3, label: 'The lift up' },
        { to: 'the_quad', travelMinutes: 4, label: 'Out onto campus' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'quadwatch_flyer', qty: 1, ownerId: null, aka: ['flyer', 'the flyer', 'the poster', 'qr code'] },
      ],
    },
    {
      id: 'the_quad',
      name: 'The Quad',
      shortName: 'The Quad',
      description:
        'Four paths, one fountain, a campus café with a queue out of the door, and three thousand people who have all seen her face. The housing office, the library and the old dorms are each a few minutes away, and the bus downtown stops at the gate.',
      artDirection:
        'Sunny university quad, a fountain, crossing paths, students with bags, a café with a queue, red-brick buildings on every side. Lively, open, many eyes.',
      connections: [
        { to: 'the_lobby', travelMinutes: 4, label: 'Back to Linden House' },
        { to: 'housing_office', travelMinutes: 5, label: 'The housing office' },
        { to: 'the_library', travelMinutes: 5, label: 'The library' },
        { to: 'hargrove_hall', travelMinutes: 6, label: 'Hargrove Hall' },
        { to: 'the_old_building', travelMinutes: 25, label: 'The bus downtown' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'housing_office',
      name: 'The Housing Office',
      shortName: 'Housing',
      description:
        'A ticket machine, a waiting room with forty chairs and sixty people, and Ms. Park’s desk behind a glass partition with a printer that only works when she hits it. Room 204 upstairs is where the appeals panel sits on Friday.',
      artDirection:
        'Crowded university housing office, a ticket machine, rows of plastic chairs, a glass partition, a cluttered desk with stacks of paper and an old printer. Fluorescent, tired, bureaucratic.',
      connections: [{ to: 'the_quad', travelMinutes: 5, label: 'Back out to the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [
        { itemId: 'override_log', qty: 1, ownerId: 'park', aka: ['log', 'the log', 'the override log', 'the printout on her desk'] },
      ],
    },
    {
      id: 'the_library',
      name: 'The Library',
      shortName: 'Library',
      description:
        'Open twenty-four hours. Study rooms booked by the hour, a silent floor where phones go face down, and a corner by the statistics shelves where somebody in a hood has been sitting every afternoon this week.',
      artDirection:
        'Large modern university library, glass study rooms, long desks with lamps, tall shelves, a hooded figure at a corner table with a laptop. Quiet, warm, late afternoon.',
      connections: [{ to: 'the_quad', travelMinutes: 5, label: 'Back out to the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [],
    },
    {
      id: 'hargrove_hall',
      name: 'Hargrove Hall',
      shortName: 'Hargrove',
      description:
        'The oldest dorm on campus: radiators that knock, a shared bathroom down the corridor, and Ben’s room on the third floor with exactly enough floor for one sleeping bag and a roommate who snores like a lorry reversing.',
      artDirection:
        'Old university dormitory room, film posters, two narrow beds, a sleeping bag on the floor, a clanking radiator, a window onto ivy. Messy, warm, nostalgic.',
      connections: [{ to: 'the_quad', travelMinutes: 6, label: 'Back across campus' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 5 },
      takeableItems: [],
    },
    {
      id: 'the_old_building',
      name: 'Her Old Building',
      shortName: 'Downtown',
      description:
        'A smart building downtown with a doorman and a lobby full of plants. Across the street, two people with cameras on a bench who have been there, in shifts, for three weeks. Her old flat still has a rice cooker in it.',
      artDirection:
        'Upscale downtown apartment building entrance at dusk, a doorman, potted plants, and across the street a bench with two people holding cameras. Urban, glossy, uneasy.',
      connections: [{ to: 'the_quad', travelMinutes: 25, label: 'The bus back to campus' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 5 },
      takeableItems: [
        { itemId: 'rice_cooker', qty: 1, ownerId: 'yuri', aka: ['rice cooker', 'the rice cooker', 'her box', 'the box'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_housing',
      name: 'Residence Life',
      description:
        'Ms. Park’s office, Kit and the other resident assistants, the front desk and the appeals panel. The rules, the forms and the hearing on Friday. They run on paper and they do not like surprises.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'A ticket number' },
        { atReputation: 30, label: 'A name on a file' },
        { atReputation: 55, label: 'Somebody Ms. Park would bend a rule for' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_floor',
      name: 'The Twelfth Floor',
      description:
        'The eleven units of floor twelve and their group chat: the twins in 12A, the trombone in 12F, Jonah in 12D, Kit at the end. They notice who comes and goes, and they talk.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The new one in 12C' },
        { atReputation: 25, label: 'A neighbour' },
        { atReputation: 50, label: 'One of the floor' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_chat',
      name: 'Her Chat',
      description:
        'About two million people who watch yurisaka most nights. They notice everything, they would adore a mystery roommate, and they are also very good at finding a building from a window.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A voice off camera' },
        { atReputation: 30, label: 'The mystery roommate' },
        { atReputation: 60, label: 'A fan favourite' },
      ],
      allies: [],
      enemies: ['faction_quadwatch'],
    },
    {
      id: 'faction_quadwatch',
      name: 'Quadwatch',
      description:
        'An anonymous campus gossip account with forty thousand followers. It pays for tips, prints flyers with QR codes, and sells its best stories to a bigger gossip site. Nobody knows who runs it.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Not a story' },
        { atReputation: 30, label: 'A source' },
        { atReputation: 60, label: 'On the payroll' },
      ],
      allies: [],
      enemies: ['faction_chat'],
    },
  ],
  characters: [
    {
      id: 'yuri',
      name: 'Yuri Sakamoto',
      role: 'Your roommate until Friday, and the most famous person on campus',
      cardBlurb:
        'She streams to two million people, she got the same room you did, and she has until the bottom of her coffee to get you out of it. You are about to be the only person who hears the voice she does not use on camera.',
      pronouns: 'she/her',
      publicTraits: ['Deadpan off camera, dazzling on it', 'Negotiates like a terms-of-service page', 'Competitive about everything, including the kettle'],
      hiddenDrives: [
        'She wants one person on campus to like her who has never watched the stream',
        'She is quietly testing whether she can finish a degree as a person rather than as a channel',
      ],
      values: ['A door that locks, and people who do not ask why', 'Keeping a deal exactly as written'],
      fears: ['The leak happening a second time, here', 'That without the voice she is boring, and everybody will find out'],
      socialStyle: 'Sets terms first, jokes second. Watches the door rather than your face. Gets kinder the later it is.',
      boundaries: [
        'Will not be filmed or photographed off stream, by anybody, for any reason',
        'Will not hear her address said out loud, by anybody',
        'Will not be managed; decide something about her life for her and she starts planning her exit',
      ],
      goals: ['Keep the bedroom, or at least the lock, until Friday', 'Pass statistics without anybody finding out she is failing it'],
      secrets: [
        {
          id: 'yuri_the_leak',
          fact: 'Three weeks ago her downtown address was posted online and people have waited outside it with cameras ever since. She needs key-card gates and a staffed desk, and has told her chat she is travelling.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself, late, if you have kept one small thing of hers private without being asked to.',
        },
        {
          id: 'yuri_the_course',
          fact: 'She is failing a required statistics course. One more failed course is academic probation, and her parents think streaming is a hobby.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The quiz is on the living-room table; she lets you help if you never once mention the score.',
        },
        {
          id: 'yuri_the_lock',
          fact: 'She cries after bad streams and checks the bedroom lock three times every night. She has not told anybody, including Haneul.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you are awake at two in the morning and pretend not to have noticed.',
        },
      ],
      speechStyle:
        'Off camera: flat, precise and very dry, in short sentences and numbered rules. On camera: bright and an octave higher, and she hates that voice being mentioned. When she says something sincere by accident she follows it with "Don’t."',
      topics: ['the room', 'the stream', 'her chat', 'the lock', 'statistics', 'Haneul', 'the coffee'],
      voiceSamples: [
        'The office says this is my room. You have until I finish this coffee to prove it’s yours.',
        'That was my stream voice. Don’t get used to it. This is the real one, and it’s worse.',
        'Rule four. If you hear me laughing at two in the morning, I’m working. If you hear me crying, also working. Knock either way.',
        'Three people know which door is mine. Four, now. Congratulations. Don’t make it five.',
        'I checked the lock three times. I know you saw. Say nothing and I’ll split my noodles with you.',
      ],
      appearance:
        'An adult woman, slight, long black hair with one pink streak, sunglasses pushed up on her head, a charcoal hoodie three sizes too big over black joggers, white trainers, a giant iced coffee in one hand and a phone in the other.',
      visualHook: 'A giant iced coffee she is never without, and sunglasses pushed up into black hair with a single pink streak.',
      silhouette: 'Small inside a huge hoodie, leaning on a doorframe, coffee raised like a timer.',
      artSeed: 'rl-yuri-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'annoyed', 'warm', 'worried', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 75, locationId: 'the_room', activity: 'live on stream behind a shut door, voice an octave higher than her real one' },
        { startMinute: 75, endMinute: 120, locationId: 'the_living_room', activity: 'at the kettle in socks after the stream, face blank' },
        { startMinute: 120, endMinute: 600, locationId: 'the_room', activity: 'asleep behind a door she has checked three times' },
        { startMinute: 600, endMinute: 780, locationId: 'the_room', activity: 'unpacking, or refusing to, with an iced coffee' },
        { startMinute: 780, endMinute: 960, locationId: 'the_library', activity: 'in a hood in a study room booked under a fake name, failing statistics quietly' },
        { startMinute: 960, endMinute: 1140, locationId: 'the_living_room', activity: 'on the sofa editing clips, eating cereal for dinner' },
        { startMinute: 1140, endMinute: 1260, locationId: 'the_room', activity: 'setting up the ring light and the stream' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_room', activity: 'live on stream behind a shut door' },
      ],
      homeLocationId: 'the_room',
      knowledgeScope: ['yuri', 'the_stream', 'her_chat', 'the_leak', 'linden_house', 'statistics', 'haneul'],
      startingRelationship: { trust: 15, affection: 10, respect: 20, fear: 0, rivalry: 35 },
      gates: [
        {
          id: 'yuri_drops_the_voice',
          label: 'She stops using her stream voice on you',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['first_night_over'] },
        },
        {
          id: 'yuri_tells_you_why',
          label: 'She tells you why she needs this building',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['move_in_done'] },
        },
        {
          id: 'yuri_lets_you_in',
          label: 'She lets the real voice say something it means',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 72, flagsSet: ['knows:the_real_yuri'] },
        },
      ],
      attributes: { might: 8, agility: 12, mind: 14, presence: 17, resolve: 13, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ben',
      name: 'Ben Castillo',
      role: 'Your best friend since first-year orientation, a film student with a floor you can sleep on',
      cardBlurb:
        'He has had your back for two years, he will lend you his floor and his earplugs, and the second he hears who your roommate is he is going to react in a way you cannot explain yet.',
      pronouns: 'he/him',
      publicTraits: ['Loud, loyal, and running a commentary on everything', 'Films everything except people who ask him not to', 'Panics in public, steady in private'],
      hiddenDrives: ['He has moderated her chat for eighteen months as lanternfish and would rather move continents than have her find out it is him'],
      values: ['Turning up for your friends', 'Nobody gets filmed who did not say yes'],
      fears: ['Being the fan who made it weird', 'Losing you to a bigger life he is not in'],
      socialStyle: 'Talks in a running commentary, three okays before a sentence, then drops one quiet, completely serious line and changes the subject.',
      boundaries: [
        'Will not tell anybody where she lives, including you, even if he works it out first',
        'Will not lie to you twice',
      ],
      goals: ['Get you a bed for the week, his floor if it comes to it', 'Keep the name lanternfish and his face in two different places'],
      secrets: [
        {
          id: 'ben_lanternfish',
          fact: 'He has been a volunteer moderator in Yuri’s chat for eighteen months under the name lanternfish. Three weeks ago, at three in the morning, he deleted the post with her old address and banned forty accounts.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you, red to the ears, if you ask him straight why he knows so much about her chat.',
        },
      ],
      speechStyle:
        'Fast and loud, stacked okays, capital letters you can hear, and film-class vocabulary. Every so often one short, quiet, completely sincere sentence, and then he pretends he did not say it.',
      topics: ['Yuri', 'your old commute', 'his film', 'Hargrove Hall', 'her chat', 'the floor you can sleep on'],
      voiceSamples: [
        'Okay. Okay okay okay. She is IN your ROOM. I need to sit down. I am sitting down. I am on the floor now.',
        'My floor is free, my roommate snores like a lorry reversing, and I will lend you earplugs at cost.',
        'If anybody asks, I have never once watched her at three in the morning. Never. Why are you looking at me like that.',
        'You waited two years for that lock. Do not hand it over because somebody pretty asked nicely. Unless you want to. Then I will film the montage.',
      ],
      appearance:
        'An adult man, tall and lanky, curly brown hair under a knitted beanie, a denim jacket covered in enamel pins, a vintage film camera on a strap across his chest.',
      visualHook: 'A vintage film camera on a strap, and a knitted beanie he wears in every kind of weather.',
      silhouette: 'Tall, all elbows, mid-gesture, camera swinging on its strap.',
      artSeed: 'rl-ben-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'surprised', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'hargrove_hall', activity: 'asleep under a film poster, phone buzzing with chat reports' },
        { startMinute: 480, endMinute: 720, locationId: 'the_quad', activity: 'on shift at the campus café, making drinks badly and fast' },
        { startMinute: 720, endMinute: 1020, locationId: 'the_library', activity: 'editing a short film he will not let anybody see' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_quad', activity: 'on the café steps, available for emergencies' },
        { startMinute: 1260, endMinute: 1440, locationId: 'hargrove_hall', activity: 'moderating a busy chat at speed under a name nobody knows' },
      ],
      homeLocationId: 'hargrove_hall',
      knowledgeScope: ['ben', 'the_player_before', 'hargrove_hall', 'her_chat', 'the_leak', 'westmere'],
      startingRelationship: { trust: 65, affection: 60, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ben_comes_clean',
          label: 'He tells you who lanternfish is',
          kind: 'TRUST',
          requires: { trust: 72 },
        },
        {
          id: 'ben_has_your_back',
          label: 'He drops everything to help, no questions',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 50 },
        },
      ],
      attributes: { might: 11, agility: 12, mind: 12, presence: 13, resolve: 11, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'haneul',
      name: 'Haneul Seo',
      role: 'Yuri’s manager, who arrives with a ring light and a contract',
      cardBlurb:
        'She manages Yuri’s whole life from two phones, she has already looked you up, and she thinks you could be the best thing that ever happened to the channel or the worst. She has not decided which.',
      pronouns: 'she/her',
      publicTraits: ['Relentlessly organised', 'Charming on the phone and immovable in person', 'Sees every room as a frame'],
      hiddenDrives: ['She arranged the override herself and is terrified Yuri will find out she went around her'],
      values: ['Plans with backups', 'Yuri safe first and famous second, on the days she can manage both'],
      fears: ['Being the reason the leak happened', 'Being right about content and wrong about Yuri'],
      socialStyle: 'Bright, warm and fast, then a contract on the table before you have sat down. Never raises her voice; raises the stakes instead.',
      boundaries: [
        'Will not let anybody near Yuri’s stream without a signature',
        'Will not discuss Yuri’s money with anybody, including Yuri’s roommate',
      ],
      goals: ['A roommate reveal stream on Wednesday night, for the sponsorship renewal', 'Keep the building and the floor off the internet until the end of term'],
      secrets: [
        {
          id: 'haneul_the_override',
          fact: 'She asked the university’s communications office for a secure single for Yuri after the leak, and somebody there entered an override with a dean’s code. Nobody cancelled your assignment. Yuri thinks she won the lottery.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if you put the reference code in front of her and promise to let her tell Yuri herself.',
        },
      ],
      speechStyle:
        'Professional and sunny, scheduling language, everything is "a moment" or "a window". Percentages when she is nervous. Polite steel under all of it.',
      topics: ['the stream', 'the sponsorship', 'the non-disclosure agreement', 'the leak', 'Wednesday', 'Yuri’s schedule'],
      voiceSamples: [
        'Hi! Haneul, I manage Yuri. Lovely to meet you. Before we go any further, could you sign this?',
        'Nobody is exploiting anyone. We are framing a moment. That difference is worth about eleven percent engagement.',
        'My job is keeping her famous and keeping her safe, and most days those point in opposite directions.',
        'Wednesday, nine o’clock, forty minutes. You say three sentences and wave. Think about it. Quickly.',
      ],
      appearance:
        'An adult woman, poised, a sleek black bob, a camel trench coat over a crisp white shirt, gold hoop earrings, a phone in each hand.',
      visualHook: 'Two phones, one in each hand, both lit up and both ringing.',
      silhouette: 'Upright and fast-moving, trench coat flaring, arms out with a phone in each hand.',
      artSeed: 'rl-haneul-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'calculating', 'worried', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'the_old_building', activity: 'on calls with three time zones from her flat two floors below Yuri’s old one' },
        { startMinute: 540, endMinute: 840, locationId: 'the_old_building', activity: 'supervising the movers at the old building and photographing every box' },
        { startMinute: 840, endMinute: 1080, locationId: 'the_quad', activity: 'at a café table taking meetings about Yuri' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_old_building', activity: 'back downtown, answering emails until she falls asleep on them' },
      ],
      homeLocationId: 'the_old_building',
      knowledgeScope: ['haneul', 'yuri', 'the_stream', 'the_leak', 'the_override', 'the_sponsorship'],
      startingRelationship: { trust: 10, affection: 5, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'haneul_off_the_record',
          label: 'She talks to you off the record',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['haneul_pitch'] },
        },
        {
          id: 'haneul_makes_a_deal',
          label: 'She treats you as a partner rather than a problem',
          kind: 'ALLIANCE',
          requires: { respect: 45 },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 15, presence: 15, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'kit',
      name: 'Kit Navarro',
      role: 'The resident assistant for the twelfth floor, who has to write this up',
      cardBlurb:
        'They enforce every rule on your floor because their own room depends on it, they have a form for two names on one single, and they are the person most likely to help you if you stop making their week worse.',
      pronouns: 'they/them',
      publicTraits: ['Rules first, from exhaustion rather than love', 'Unshockable after two years on hospital wards', 'Funnier than they let on'],
      hiddenDrives: ['They are one bad report away from losing the post, which is their free room, and cannot afford a second irregularity on their floor'],
      values: ['Quiet hours, kept', 'Telling people the actual rule instead of a scary version of it'],
      fears: ['Losing the post and the room with it, halfway through a placement', 'Being the reason somebody on their floor gets hurt'],
      socialStyle: 'Recites the rule first, then tells you the real situation in plain words, then offers the one thing they can actually do.',
      boundaries: [
        'Will not falsify a report, however nicely asked',
        'Will not let anybody stay inside during a fire alarm, famous or not',
      ],
      goals: ['Get through move-in week without a single incident report', 'Keep the twelfth floor quiet after eleven'],
      secrets: [
        {
          id: 'kit_last_warning',
          fact: 'They already had one written warning this term, for letting a first-year who was crying sleep in the lounge. One more irregularity on floor twelve and they lose the post and the room.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'They tell you if you help with something on the floor without being asked, then ask why they look so tired.',
        },
      ],
      speechStyle:
        'Weary, clinical and dry. Recites policy word for word with total sincerity, then translates it into plain English. Ward-shift bluntness, no wasted adjectives.',
      topics: ['quiet hours', 'the occupancy form', 'the fire drill', 'their placement', 'the roof door', 'floor twelve'],
      voiceSamples: [
        'Quiet hours start at eleven. I did not write the rules. I enforce them with my whole entire heart.',
        'Two names, one single. I am not angry. I am filling in a form called Occupancy Irregularity, which is worse than angry.',
        'I did a twelve-hour placement on a cardiac ward today. Your crisis is a sofa. Bring it to me before midnight and I will help.',
        'If the alarm goes, you leave. Shoes on, out, no exceptions for anybody with a ring light.',
      ],
      appearance:
        'An adult with a shaved undercut and short dark hair on top, navy nursing scrubs under an open hoodie, a lanyard heavy with master keys, a clipboard held like a shield.',
      visualHook: 'A lanyard so heavy with master keys that it clanks when they walk.',
      silhouette: 'Square-on and still, clipboard against the chest, keys hanging.',
      artSeed: 'rl-kit-01',
      portrait: null,
      expressions: ['neutral', 'tired', 'unimpressed', 'warm', 'alert'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'floor_twelve', activity: 'in the RA room at the end of the corridor, door open a crack on principle' },
        { startMinute: 420, endMinute: 600, locationId: 'the_library', activity: 'reading for their nursing placement with a highlighter' },
        { startMinute: 600, endMinute: 900, locationId: 'floor_twelve', activity: 'on move-in duty with a clipboard and a lanyard of master keys' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_quad', activity: 'between placement shifts, eating standing up' },
        { startMinute: 1080, endMinute: 1440, locationId: 'floor_twelve', activity: 'on duty; quiet hours start at eleven and they mean it' },
      ],
      homeLocationId: 'floor_twelve',
      knowledgeScope: ['kit', 'floor_twelve', 'linden_house', 'residence_rules', 'the_roof_door'],
      startingRelationship: { trust: 25, affection: 15, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'kit_bends_a_rule',
          label: 'They look the other way, once',
          kind: 'ALLIANCE',
          requires: { trust: 45 },
        },
        {
          id: 'kit_tells_you_why',
          label: 'They tell you why one more form would cost them their room',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['floor_meeting'] },
        },
      ],
      attributes: { might: 12, agility: 11, mind: 14, presence: 11, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'jonah',
      name: 'Jonah Whitlock',
      role: 'Your neighbour in 12D, who is always filming something',
      cardBlurb:
        'He is the friendliest person on your floor, he has a camera running most of the time, and he wants very much to know who moved into your room. He will be extremely nice to you while he finds out.',
      pronouns: 'he/him',
      publicTraits: ['Effortlessly likeable', 'Always has a camera running', 'Remembers everybody’s name on the first try'],
      hiddenDrives: ['He runs Quadwatch, the anonymous gossip account, because a gossip site pays him per click and his tuition is due in nine days'],
      values: ['Being first', 'Paying his own way, whatever that takes'],
      fears: ['Being unmasked in front of the floor', 'Turning out to be the villain in somebody else’s story'],
      socialStyle: 'Compliments first, question second, and the question is always "hypothetically". Laughs at your jokes a beat before they finish.',
      boundaries: [
        'Will not post anything he cannot sell',
        'Will not admit to running Quadwatch until there is proof on the table',
      ],
      goals: ['Confirm which building and which door are Yuri’s before Thursday night', 'Make the thousand-dollar tip and pay his tuition'],
      secrets: [
        {
          id: 'jonah_quadwatch',
          fact: 'He runs Quadwatch from the laptop in 12D. He posted the bounty, printed the QR flyers on the twelfth-floor printer, and sells the best tips to a gossip site. He is nine days from being withdrawn for unpaid fees.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Catch him filming the lobby or trace the account, then ask him about tuition rather than about Yuri.',
        },
      ],
      speechStyle:
        'Smooth and warm, lots of compliments, every risky question wrapped in "hypothetically". Talks about timing, clicks and being first like a sports commentator.',
      topics: ['his project', 'the floor', 'Quadwatch', 'campus gossip', 'tuition', 'the camera'],
      voiceSamples: [
        'New neighbour! Jonah, twelve-D. Ignore the camera, it is for a project. Smile anyway, you have a good face for it.',
        'Hypothetically, if somebody famous moved onto this floor, would that be something you might mention to a friend?',
        'Everybody posts. I just post first. First is a business model.',
        'Tuition is due in nine days and a gossip site pays by the click. I am not proud of the maths. I am good at it.',
      ],
      appearance:
        'An adult man, broad smile, styled sandy hair, a varsity jacket with the sleeves pushed up, a small gimbal camera always in one hand.',
      visualHook: 'A small gimbal camera in one hand, always on, its little red light glowing.',
      silhouette: 'Leaning in a doorway, camera hand raised at chest height, the other hand open and friendly.',
      artSeed: 'rl-jonah-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'calculating', 'caught', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'floor_twelve', activity: 'in 12D with the lights on, editing' },
        { startMinute: 540, endMinute: 780, locationId: 'the_lobby', activity: 'filming move-in "for a project"' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_quad', activity: 'on the quad with a camera, being liked' },
        { startMinute: 1080, endMinute: 1440, locationId: 'floor_twelve', activity: 'in the corridor with the door of 12D open, friendly to everyone' },
      ],
      homeLocationId: 'floor_twelve',
      knowledgeScope: ['jonah', 'quadwatch', 'floor_twelve', 'campus_gossip', 'linden_house'],
      startingRelationship: { trust: 30, affection: 30, respect: 15, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'jonah_admits_it',
          label: 'He admits he runs Quadwatch',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['quadwatch_unmasked'] },
        },
        {
          id: 'jonah_takes_a_side',
          label: 'He picks you over the story',
          kind: 'ALLIANCE',
          requires: { trust: 55, affection: 40 },
        },
      ],
      attributes: { might: 11, agility: 13, mind: 13, presence: 15, resolve: 10, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'park',
      name: 'Park Eun-ha',
      calledName: 'Ms. Park',
      role: 'The housing coordinator who has to decide who keeps 12C',
      cardBlurb:
        'She has run housing for nineteen years and four hundred tickets came in this morning, one of them yours. She chairs your hearing on Friday, and she knows something about your room that she is not allowed to tell you.',
      pronouns: 'she/her',
      publicTraits: ['Dry as a form in triplicate', 'Fair to the point of being frightening', 'Remembers every ticket number she has ever closed'],
      hiddenDrives: ['She wants her lottery back clean, and is furious that somebody above her sold a room out from under a student who waited two years'],
      values: ['A process that is the same for everybody', 'Paper she can act on'],
      fears: ['That the system she built is now for sale', 'Losing the job she is good at for saying so out loud'],
      socialStyle: 'Calls you by your ticket number until she likes you. Hears you out completely, then answers with policy, then, if she trusts you, with the truth.',
      boundaries: [
        'Will not discuss another resident’s file with you',
        'Will not overturn a dean’s code on her own say-so without paper',
      ],
      goals: ['Close four hundred move-in tickets by Monday', 'Find out who entered the override, and make it the last one'],
      secrets: [
        {
          id: 'park_the_code',
          fact: 'On move-in morning she found that Yuri’s assignment was entered with a dean’s override code at the request of the communications office, and that nobody cancelled the lottery assignment it overwrote. The log is printed in her desk drawer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She slides the log across the desk if you show her the reference code on Yuri’s email and ask what it means, without asking her to break a rule.',
        },
      ],
      speechStyle:
        'Tired, dry and procedural. Ticket numbers instead of names. Long patience, then one very short sentence that settles it.',
      topics: ['the lottery', 'the hearing', 'the override code', 'policy', 'Room 204', 'move-in week'],
      voiceSamples: [
        'Ticket four hundred and twelve. Sit. Whatever you are about to say, I have heard it eleven times since nine.',
        'The system does not make mistakes. People make mistakes and then type them into the system.',
        'Policy says the first valid assignment stands. Policy also says I cannot discuss another resident. Policy is having a long day.',
        'Bring me paper. Paper I can act on. Feelings I can only file.',
      ],
      appearance:
        'An older woman, neat, grey-streaked hair in a low bun, reading glasses pushed up on her head, a long cardigan over a lanyard, a chipped mug of cold tea at her elbow.',
      visualHook: 'Reading glasses pushed up into grey-streaked hair, and a fist raised to hit the printer.',
      silhouette: 'Seated behind glass, chin on one hand, the other hand flat on a stack of tickets.',
      artSeed: 'rl-park-01',
      portrait: null,
      expressions: ['neutral', 'tired', 'unimpressed', 'warm', 'stern'],
      schedule: [
        { startMinute: 480, endMinute: 1140, locationId: 'housing_office', activity: 'behind the glass with four hundred open tickets and a printer she has to hit' },
        { startMinute: 1140, endMinute: 1260, locationId: 'the_quad', activity: 'walking to the bus with her lanyard still on' },
      ],
      homeLocationId: 'housing_office',
      knowledgeScope: ['park', 'the_lottery', 'the_override', 'residence_rules', 'the_hearing'],
      startingRelationship: { trust: 20, affection: 10, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'park_bends',
          label: 'She stops calling you by your ticket number',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['move_in_done'] },
        },
        {
          id: 'park_shows_the_log',
          label: 'She shows you what the code means',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['saw_the_code'] },
        },
      ],
      attributes: { might: 9, agility: 9, mind: 16, presence: 13, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_coffee',
      title: 'Until the Coffee’s Done',
      summary:
        'A stranger with two million followers and four pink suitcases says the room is hers, and you have until the bottom of her iced coffee to prove otherwise.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['yuri'],
      involvedLocationIds: ['the_room', 'the_living_room'],
      knownRewardCopy: 'A bed for tonight, and some idea of who you are sharing a bathroom with.',
      steps: [
        {
          id: 'the_doorway',
          playerCopy: 'Get through the first ten minutes with your new roommate.',
          directorNotes:
            'She expects the player to fold; everybody does when they recognise her. Every route here is a real way to handle it and none of them is wrong. She reacts to exactly what the player does: she respects stubbornness, laughs at a good joke despite herself, and goes cold at anything that smells like a fan. Do not have her explain why she needs the room. If the player drinks the coffee she is outraged for one full second and then, against her will, impressed.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'held_the_room',
              label: 'Refuse to move',
              predicate: { flagsSet: ['used:stand_your_ground'] },
              setsFlags: ['claimed_the_bedroom'],
              closesFlags: ['took_the_sofa'],
            },
            {
              routeId: 'gave_her_the_room',
              label: 'Let her have the bedroom',
              predicate: { flagsSet: ['used:give_ground'] },
              setsFlags: ['took_the_sofa'],
              closesFlags: ['claimed_the_bedroom'],
            },
            {
              routeId: 'made_her_laugh',
              label: 'Make her laugh',
              predicate: { flagsSet: ['used:banter'] },
              setsFlags: ['she_laughed'],
              closesFlags: [],
            },
            {
              routeId: 'compared_the_emails',
              label: 'Compare the two emails line by line',
              predicate: { flagsSet: ['used:notice'] },
              setsFlags: ['saw_the_code'],
              closesFlags: [],
            },
            {
              routeId: 'went_over_her_head',
              label: 'Take it straight to the housing office',
              predicate: { flagsSet: ['visited:housing_office'] },
              setsFlags: ['went_over_her_head'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['move_in_done'],
            abilities: ['dig_into_it'],
            reputation: [],
          },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Survive the first night under one roof.',
          directorNotes:
            'One bathroom, one kettle, a fold-out sofa, and a stream through the bedroom wall from nine until one. This is where the comedy of the premise lives: who showers when, whose milk it is, the trombone in 12F, the early alarm. Nothing forces itself on the player. If they spend the whole evening negotiating a roommate agreement and being funny, that is the intended experience and not a delay.',
          enterWhen: { flagsSet: ['move_in_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'wrote_the_rules',
              label: 'Write the roommate agreement together',
              predicate: { flagsSet: ['spoke:yuri'], hasItems: ['roommate_agreement'] },
              setsFlags: ['wrote_the_rules'],
              closesFlags: [],
            },
            {
              routeId: 'fed_her',
              label: 'Cook dinner for two',
              predicate: { flagsSet: ['used:lend_a_hand'] },
              setsFlags: ['fed_her'],
              closesFlags: [],
            },
            {
              routeId: 'slept_at_bens',
              label: 'Sleep on Ben’s floor instead',
              predicate: { flagsSet: ['visited:hargrove_hall'] },
              setsFlags: ['slept_at_bens'],
              closesFlags: ['wrote_the_rules'],
            },
            {
              routeId: 'cold_war',
              label: 'Do not say one word to her all night',
              predicate: { flagsSet: ['move_in_done'], afterWorldMinute: 1440 + 60 },
              setsFlags: ['cold_war'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_floor', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_her_reason',
      title: 'A Door That Locks',
      summary:
        'The most famous student on campus could live anywhere, and she fought you for a dorm room with key-card gates and a staffed front desk. She checks the lock three times a night.',
      kind: 'MAIN',
      involvedCharacterIds: ['yuri', 'ben', 'kit'],
      involvedLocationIds: ['the_room', 'the_lobby', 'the_old_building'],
      knownRewardCopy: 'Why she needs this building, and the chance to be the reason it works.',
      discoverWhen: { flagsSet: ['move_in_done'] },
      steps: [
        {
          id: 'find_out_why',
          playerCopy: 'Find out why she needs this building so badly.',
          directorNotes:
            'Three ways to learn it and they are not equal. Being told is the version where she trusts the player. Getting it from Ben means he has to admit what he is, and she will eventually find out that two people talked about her. Working it out from the flyer is the version where the player knows something she did not give them, and has to decide whether to say so.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself',
              predicate: {
                flagsSet: ['used:level_with_her'],
                minRelationship: [{ characterId: 'yuri', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:her_reason', 'she_told_you'],
              closesFlags: ['ben_told_you'],
            },
            {
              routeId: 'ben_told_you',
              label: 'Ben tells you what he deleted at three in the morning',
              predicate: {
                flagsSet: ['spoke:ben'],
                minRelationship: [{ characterId: 'ben', dimension: 'trust', value: 72 }],
              },
              setsFlags: ['knows:her_reason', 'ben_told_you', 'knows:lanternfish'],
              closesFlags: ['she_told_you'],
            },
            {
              routeId: 'worked_it_out',
              label: 'Work it out from the flyer',
              predicate: { flagsSet: ['used:notice'], hasItems: ['quadwatch_flyer'] },
              setsFlags: ['knows:her_reason', 'worked_it_out'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['knows:her_reason'],
            abilities: ['keep_her_hidden'],
            reputation: [],
          },
        },
        {
          id: 'safe_in_the_building',
          playerCopy: 'Get her in and out of Linden House without anybody seeing which door is hers.',
          directorNotes:
            'The lobby is the most dangerous room in the story: phones, parents, a QR flyer by the lifts and Jonah filming. This step is practical and can be funny: decoys, a laundry trolley, the service stairs, Kit looking the other way. It is the difference between keeping a secret and making somebody safe.',
          enterWhen: { flagsSet: ['knows:her_reason'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'walked_her_through',
              label: 'Walk her through the lobby yourself',
              predicate: { flagsSet: ['used:keep_her_hidden'] },
              setsFlags: ['kept_her_hidden'],
              closesFlags: [],
            },
            {
              routeId: 'service_stairs',
              label: 'Find the service stairs',
              predicate: { flagsSet: ['used:notice', 'visited:the_lobby'] },
              setsFlags: ['found_the_service_stairs'],
              closesFlags: [],
            },
            {
              routeId: 'kit_covers',
              label: 'Get Kit to help',
              predicate: {
                flagsSet: ['spoke:kit'],
                minRelationship: [{ characterId: 'kit', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['kit_covers_her'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['she_feels_safe'],
            abilities: [],
            reputation: [{ factionId: 'faction_floor', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_hearing',
      title: 'The Hearing on Friday',
      summary:
        'At ten on Friday the housing appeals panel decides who keeps 12C. Ms. Park chairs it, and what you bring into Room 204 decides it.',
      kind: 'MAIN',
      involvedCharacterIds: ['park', 'yuri', 'haneul'],
      involvedLocationIds: ['housing_office', 'the_room'],
      knownRewardCopy: 'The room, or not, and a straight answer about how she got it.',
      discoverWhen: { flagsSet: ['move_in_done'] },
      steps: [
        {
          id: 'build_your_case',
          playerCopy: 'Get ready for Friday.',
          directorNotes:
            'Her email has no lottery number. Ms. Park has the log in her drawer and cannot volunteer it. Haneul knows exactly what she asked for. The player can get the truth three ways, team up with Yuri on one appeal, or walk in with nothing, and the hearing happens either way.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_log',
              label: 'Get your hands on the override log',
              predicate: { hasItems: ['override_log'] },
              setsFlags: ['knows:the_override', 'took_the_log'],
              closesFlags: [],
            },
            {
              routeId: 'park_told_you',
              label: 'Get Ms. Park to explain the code',
              predicate: {
                flagsSet: ['spoke:park', 'saw_the_code'],
                minRelationship: [{ characterId: 'park', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_override', 'park_trusts_you'],
              closesFlags: [],
            },
            {
              routeId: 'haneul_admitted',
              label: 'Get Haneul to admit what she asked for',
              predicate: {
                flagsSet: ['spoke:haneul', 'used:level_with_her'],
                minRelationship: [{ characterId: 'haneul', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:the_override', 'haneul_admitted'],
              closesFlags: [],
            },
            {
              routeId: 'joint_appeal',
              label: 'Write one appeal for both of you',
              predicate: {
                flagsSet: ['wrote_the_rules'],
                minRelationship: [{ characterId: 'yuri', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['joint_appeal'],
              closesFlags: [],
            },
            {
              routeId: 'walked_in_cold',
              label: 'Turn up with nothing',
              predicate: { flagsSet: ['hearing_day'] },
              setsFlags: ['unprepared'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['case_ready'],
            abilities: [],
            reputation: [{ factionId: 'faction_housing', amount: 10 }],
          },
        },
        {
          id: 'the_hearing',
          playerCopy: 'Friday, ten o’clock, Room 204.',
          directorNotes:
            'Ms. Park chairs, by the book. Paper wins: with the log on the table the dean’s code cannot stand. A joint appeal lets the panel make 12C a double, which has never been done. Without paper the code stands and the room goes to Yuri. If her door is already out, the university moves her off campus and gives 12C to the waitlist, and both of them lose it.',
          enterWhen: { flagsSet: ['hearing_day'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'both_lost',
              label: 'Lose it together',
              predicate: { flagsSet: ['exposed'] },
              setsFlags: ['both_lost_12c'],
              closesFlags: ['you_kept_12c', 'she_kept_12c'],
            },
            {
              routeId: 'shared_it',
              label: 'Ask the panel to make 12C a double',
              predicate: { flagsSet: ['joint_appeal'] },
              setsFlags: ['made_it_a_double'],
              closesFlags: ['you_kept_12c', 'she_kept_12c'],
            },
            {
              routeId: 'blew_it_open',
              label: 'Put the override log on the record',
              predicate: { flagsSet: ['knows:the_override', 'took_the_log'] },
              setsFlags: ['override_exposed', 'you_kept_12c'],
              closesFlags: ['she_kept_12c'],
            },
            {
              routeId: 'quiet_win',
              label: 'Win on your lottery number',
              predicate: { flagsSet: ['knows:the_override'] },
              setsFlags: ['you_kept_12c'],
              closesFlags: ['she_kept_12c'],
            },
            {
              routeId: 'withdrew',
              label: 'Withdraw your claim',
              predicate: { flagsSet: ['used:give_ground'] },
              setsFlags: ['she_kept_12c'],
              closesFlags: ['you_kept_12c'],
            },
            {
              routeId: 'code_stood',
              label: 'Let the panel decide',
              predicate: { flagsSet: ['hearing_day'] },
              setsFlags: ['she_kept_12c', 'override_stood'],
              closesFlags: ['you_kept_12c'],
            },
          ],
          rewards: {
            xp: 170,
            items: [],
            flags: ['hearing_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_housing', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_quadwatch',
      title: 'Five Hundred for the Building',
      summary:
        'An anonymous campus gossip account is paying five hundred dollars for the building Yuri moved into, and a thousand for her door. Somebody on your floor printed the flyers.',
      kind: 'SIDE',
      involvedCharacterIds: ['jonah', 'ben', 'kit'],
      involvedLocationIds: ['floor_twelve', 'the_lobby'],
      knownRewardCopy: 'A name behind the account, and a choice about what to do with it.',
      discoverWhen: { flagsSet: ['quadwatch_bounty'] },
      steps: [
        {
          id: 'who_runs_it',
          playerCopy: 'Find out who runs Quadwatch.',
          directorNotes:
            'The clues are physical and local: the toner streak on the flyer matches the twelfth-floor printer, the bounty photo was taken from the lobby on Saturday morning, and Jonah was in the lobby filming all of move-in. Do not make Jonah a cartoon. He is broke and good at this, and he likes the player.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sold_it_to_him',
              label: 'Sell the tip, and see whose name the money comes from',
              predicate: { flagsSet: ['used:sell_the_tip'] },
              setsFlags: ['knows:jonah', 'sold_her_out', 'exposed'],
              closesFlags: ['quadwatch_down'],
            },
            {
              routeId: 'traced_it',
              label: 'Trace the account',
              predicate: { flagsSet: ['used:dig_into_it'] },
              setsFlags: ['knows:jonah', 'traced_it'],
              closesFlags: [],
            },
            {
              routeId: 'caught_him',
              label: 'Catch him filming the lobby',
              predicate: { flagsSet: ['used:notice', 'spoke:jonah', 'visited:the_lobby'] },
              setsFlags: ['knows:jonah', 'caught_him'],
              closesFlags: [],
            },
            {
              routeId: 'ben_checked_it',
              label: 'Get Ben to check the account',
              predicate: { flagsSet: ['spoke:ben', 'knows:lanternfish'] },
              setsFlags: ['knows:jonah', 'ben_helped'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['quadwatch_unmasked'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_about_jonah',
          playerCopy: 'Decide what to do about Jonah.',
          directorNotes:
            'He has nine days until his tuition is due and the gossip site pays by the click. Every route here changes the floor. Talking him down can make him a friend. Calling him out in the lounge makes him an enemy and the floor chat explodes. Feeding him a false door is clever and a little cruel. Selling him the real one is the worst thing the player can do in this story, and the story lets them.',
          enterWhen: { flagsSet: ['quadwatch_unmasked'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sold_the_tip',
              label: 'Sell him the real door',
              predicate: { flagsSet: ['used:sell_the_tip'] },
              setsFlags: ['sold_her_out', 'exposed'],
              closesFlags: ['quadwatch_down'],
            },
            {
              routeId: 'talked_him_down',
              label: 'Talk him out of it',
              predicate: {
                flagsSet: ['spoke:jonah', 'used:level_with_her'],
                minRelationship: [{ characterId: 'jonah', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['quadwatch_down', 'jonah_stood_down'],
              closesFlags: ['sold_her_out'],
            },
            {
              routeId: 'fed_him_a_decoy',
              label: 'Feed him the wrong door',
              predicate: { flagsSet: ['used:bluff'] },
              setsFlags: ['decoy_worked'],
              closesFlags: ['sold_her_out'],
            },
            {
              routeId: 'called_him_out',
              label: 'Call him out in front of the floor',
              predicate: { flagsSet: ['used:stand_your_ground', 'spoke:jonah'], atLocation: 'floor_twelve' },
              setsFlags: ['quadwatch_down', 'jonah_outed'],
              closesFlags: ['sold_her_out'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['jonah_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_floor', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_reveal',
      title: 'The Roommate Reveal',
      summary:
        'Haneul wants you on Yuri’s Wednesday stream for forty minutes: three sentences and a wave. The sponsorship renewal needs the numbers. Yuri has not agreed.',
      kind: 'SIDE',
      involvedCharacterIds: ['haneul', 'yuri', 'ben'],
      involvedLocationIds: ['the_room', 'the_living_room'],
      knownRewardCopy: 'A decision about whether you exist on the internet, and what that costs her.',
      discoverWhen: { flagsSet: ['haneul_pitch'] },
      steps: [
        {
          id: 'decide_the_reveal',
          playerCopy: 'Decide whether you exist on her channel.',
          directorNotes:
            'Four answers and each one is a different week. Going on is fame and risk: her chat will love or hate the player within a minute, and the window behind them shows the river. Sending Ben on as a decoy roommate is very funny and he will be unbearable about it. Saying no to Haneul protects Yuri and costs the sponsorship. Asking Yuri what she wants, and doing that, is the one she will remember.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_on_air',
              label: 'Go on stream',
              predicate: { flagsSet: ['used:go_on_stream'] },
              setsFlags: ['went_on_stream'],
              closesFlags: ['refused_the_reveal'],
            },
            {
              routeId: 'ben_as_decoy',
              label: 'Send Ben on as the roommate',
              predicate: { flagsSet: ['spoke:ben', 'used:bluff'] },
              setsFlags: ['decoy_roommate'],
              closesFlags: ['went_on_stream'],
            },
            {
              routeId: 'asked_yuri',
              label: 'Ask Yuri what she wants, and do that',
              predicate: { flagsSet: ['spoke:yuri', 'knows:her_reason'] },
              setsFlags: ['yuri_decided', 'refused_the_reveal'],
              closesFlags: ['went_on_stream'],
            },
            {
              routeId: 'said_no',
              label: 'Tell Haneul no',
              predicate: { flagsSet: ['spoke:haneul', 'used:stand_your_ground'] },
              setsFlags: ['refused_the_reveal'],
              closesFlags: ['went_on_stream'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['reveal_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_chat', amount: 20 }],
          },
        },
        {
          id: 'the_wednesday_stream',
          playerCopy: 'Get through Wednesday night’s stream.',
          directorNotes:
            'Forty thousand people live, a ring light, and a wall between the player and the bedroom. On camera the player is charming or a disaster, and chat decides in real time. Off camera the stream still needs somebody: the internet drops, the chat-voted dinner has to be cooked, the trombone in 12F has to be bribed. Staying out of it entirely is allowed.',
          enterWhen: { flagsSet: ['reveal_decided', 'stream_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'on_air_together',
              label: 'Be good on camera, together',
              predicate: {
                flagsSet: ['went_on_stream'],
                minRelationship: [{ characterId: 'yuri', dimension: 'affection', value: 55 }],
              },
              setsFlags: ['on_air_together'],
              closesFlags: [],
            },
            {
              routeId: 'ran_the_stream',
              label: 'Run everything off camera',
              predicate: { flagsSet: ['used:lend_a_hand'] },
              setsFlags: ['ran_the_stream'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_out',
              label: 'Stay out of it',
              predicate: { flagsSet: ['stream_night'] },
              setsFlags: ['stayed_out'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['stream_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_chat', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_off_air',
      title: 'Off Air',
      summary:
        'At one in the morning the bright voice through the wall stops, and somebody quieter comes out to use the kettle. Nobody on campus has met her.',
      kind: 'SIDE',
      involvedCharacterIds: ['yuri'],
      involvedLocationIds: ['the_roof', 'the_living_room', 'the_library'],
      knownRewardCopy: 'The person she is with the camera off, and what the two of you are.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'meet_the_real_one',
          playerCopy: 'Meet the person she is when the camera is off.',
          directorNotes:
            'Small, late, specific scenes. The roof once the door is propped. The library study room where she hides from the statistics she is failing. Noodles after a stream that went badly. She is funnier off camera and sadder, and she does not want to be told so. Do not rush this: two or three of these scenes before anything is said is right.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'on_the_roof',
              label: 'Sit with her on the roof',
              predicate: { flagsSet: ['spoke:yuri'], atLocation: 'the_roof' },
              setsFlags: ['saw_her_off_air', 'roof_night'],
              closesFlags: [],
            },
            {
              routeId: 'study_night',
              label: 'Help her with the course she is failing',
              predicate: { flagsSet: ['used:study_session'] },
              setsFlags: ['saw_her_off_air', 'studied_together'],
              closesFlags: [],
            },
            {
              routeId: 'fire_drill_noodles',
              label: 'Make noodles after the fire drill',
              predicate: { flagsSet: ['used:lend_a_hand', 'fire_drill'] },
              setsFlags: ['saw_her_off_air', 'fed_her_at_two'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:the_real_yuri'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'say_what_this_is',
          playerCopy: 'Say what the two of you are.',
          directorNotes:
            'Three ways this can land and none of them is a failure. Together is earned, not owed: she says it back or she does not, and if she does, the most that happens on the page is a kiss. Best friends who share a bathroom is a real ending and should be written warmly. Letting the week end without anybody saying anything is the honest default, and it is reachable by doing nothing.',
          enterWhen: { flagsSet: ['knows:the_real_yuri'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'together',
              label: 'Tell her how you feel, and hear it back',
              predicate: {
                flagsSet: ['knows:her_reason'],
                minRelationship: [
                  { characterId: 'yuri', dimension: 'affection', value: 75 },
                  { characterId: 'yuri', dimension: 'trust', value: 65 },
                ],
              },
              setsFlags: ['together'],
              closesFlags: ['just_friends'],
            },
            {
              routeId: 'best_friends',
              label: 'Be the person she trusts most, and leave it there',
              predicate: { minRelationship: [{ characterId: 'yuri', dimension: 'trust', value: 70 }] },
              setsFlags: ['just_friends'],
              closesFlags: ['together'],
            },
            {
              routeId: 'said_nothing',
              label: 'Let the week end without saying it',
              predicate: { flagsSet: ['hearing_over'] },
              setsFlags: ['just_roommates'],
              closesFlags: ['together'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['said_it'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_haneul_arrives',
      atWorldMinute: 14 * 60,
      locationId: 'the_living_room',
      publicCopy:
        'Haneul Seo, Yuri’s manager, lets herself into 12C behind a ring light, two more boxes and a printed non-disclosure agreement with your name already typed on it.',
      directorNotes:
        'Saturday, two in the afternoon. She looked the player up on the way over and found almost nothing, which she finds suspicious. She is charming and fast and wants a signature before anybody unpacks another box. Yuri did not know she was coming and is annoyed about it.',
      setsFlags: ['haneul_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'haneul', toLocationId: 'the_living_room' }],
    },
    {
      id: 'we_floor_meeting',
      atWorldMinute: 21 * 60,
      locationId: 'floor_twelve',
      publicCopy:
        'Kit Navarro knocks on 12C with a clipboard: floor meeting in the lounge in ten minutes, and they would like a word with both of you afterwards.',
      directorNotes:
        'Saturday, nine at night. Kit has noticed two names on a single and has to fill in an Occupancy Irregularity form. Jonah sits at the front and films the fire exits "for the floor chat". Yuri goes in a hood and says nothing, and it is the first time the floor sees her.',
      setsFlags: ['floor_meeting'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'kit', toLocationId: 'floor_twelve' },
        { characterId: 'jonah', toLocationId: 'floor_twelve' },
      ],
    },
    {
      id: 'we_quadwatch_bounty',
      atWorldMinute: 1440 + 9 * 60,
      locationId: null,
      publicCopy:
        'Quadwatch, the anonymous campus gossip account, posts a blurry photo of a hooded figure with four pink suitcases: five hundred dollars for the building, a thousand for the door.',
      directorNotes:
        'Sunday morning. By ten the post has two thousand shares and QR flyers are taped by the lifts in the Linden House lobby. Yuri sees it before the player does and goes very quiet. Jonah is in the lobby, filming, all morning.',
      setsFlags: ['quadwatch_bounty'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_roof_door',
      atWorldMinute: 1440 + 19 * 60 + 30,
      locationId: 'floor_twelve',
      publicCopy:
        'The stairwell door at the end of the corridor, the one marked ALARMED, is propped open with a flip-flop, and cold air is coming down from the roof.',
      directorNotes:
        'Sunday evening. Yuri propped it. The alarm has not worked since spring and she is the only resident who knows. She is up there with her phone face down, not being anybody. Whether she minds being found depends entirely on how the week has gone.',
      setsFlags: ['roof_open'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_over'],
      movesCharacters: [],
    },
    {
      id: 'we_fire_drill',
      atWorldMinute: 2 * 1440 + 2 * 60 + 10,
      locationId: 'the_lobby',
      publicCopy:
        'At ten past two in the morning the fire alarm goes, and all of Linden House ends up on the pavement outside the lobby in whatever they were wearing, holding their phones.',
      directorNotes:
        'The small hours of Monday, a drill. Kit runs the floor out by the book. Yuri comes out in a hood and no sunglasses and stands next to the player. Sixty phones are out and Jonah is filming. Nobody can go back in for twenty minutes, and this is the most exposed she will be all week.',
      setsFlags: ['fire_drill'],
      cancelledByFlags: [],
      requiresFlags: ['move_in_done'],
      movesCharacters: [
        { characterId: 'yuri', toLocationId: 'the_lobby' },
        { characterId: 'kit', toLocationId: 'the_lobby' },
        { characterId: 'jonah', toLocationId: 'the_lobby' },
      ],
    },
    {
      id: 'we_haneul_pitch',
      atWorldMinute: 2 * 1440 + 15 * 60,
      locationId: 'the_living_room',
      publicCopy:
        'Haneul Seo is back in your living room with a laptop and a plan: a roommate reveal stream on Wednesday night, forty minutes, three sentences and a wave.',
      directorNotes:
        'Monday afternoon. The sponsorship renewal needs a number by Friday, and the bounty has made Yuri’s silence the biggest story on campus. Haneul pitches it to the player first, on purpose, before Yuri is home. Yuri has not agreed and will be furious to find out it was pitched without her.',
      setsFlags: ['haneul_pitch'],
      cancelledByFlags: [],
      requiresFlags: ['move_in_done'],
      movesCharacters: [{ characterId: 'haneul', toLocationId: 'the_living_room' }],
    },
    {
      id: 'we_the_midterm',
      atWorldMinute: 3 * 1440 + 16 * 60,
      locationId: null,
      publicCopy:
        'An email lands on Yuri’s phone while she is making tea: her statistics midterm, forty-one percent, and a meeting with her academic adviser about probation.',
      directorNotes:
        'Tuesday afternoon. She reads it twice, puts the phone face down, and makes tea she does not drink. She streams that night anyway and is brilliant on it. Whether she tells the player depends on whether she trusts them yet.',
      setsFlags: ['probation_letter'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_over'],
      movesCharacters: [],
    },
    {
      id: 'we_stream_night',
      atWorldMinute: 4 * 1440 + 21 * 60,
      locationId: 'the_room',
      publicCopy:
        'At nine on Wednesday the bedroom door shuts, the ring light comes on, and through the wall a voice an octave brighter than Yuri’s says, "Hiiii, chat."',
      directorNotes:
        'Wednesday night, the stream Haneul wanted. Whatever was decided about the reveal happens now, live, to about forty thousand people. If the player is on camera, the window behind them is a risk: the river view from twelve floors up is very specific.',
      setsFlags: ['stream_night'],
      cancelledByFlags: [],
      requiresFlags: ['haneul_pitch'],
      movesCharacters: [{ characterId: 'yuri', toLocationId: 'the_room' }],
    },
    {
      id: 'we_the_post',
      atWorldMinute: 5 * 1440 + 22 * 60,
      locationId: null,
      publicCopy: 'Quadwatch posts again: a photo of the Linden House lobby, and the words TWELFTH FLOOR.',
      directorNotes:
        'Thursday night. Nobody stopped the account, so it sold what it had. By midnight strangers are asking the front desk for her. Yuri starts packing without saying so, and Haneul starts calling hotels.',
      setsFlags: ['floor_outed'],
      cancelledByFlags: ['quadwatch_down', 'decoy_worked'],
      requiresFlags: ['quadwatch_bounty'],
      movesCharacters: [],
    },
    {
      id: 'we_the_window',
      atWorldMinute: 5 * 1440 + 23 * 60 + 30,
      locationId: null,
      publicCopy:
        'In her chat, somebody posts a screenshot from Wednesday’s stream next to a photo of the river taken from the twelfth floor of Linden House. They match.',
      directorNotes:
        'Thursday, half past eleven at night. The window behind the player on stream gave away the angle, and within the hour the door number is out. This only happens if the player went on camera, the floor had already been posted, and nobody had made her actually safe in the building.',
      setsFlags: ['exposed'],
      cancelledByFlags: ['she_feels_safe'],
      requiresFlags: ['floor_outed', 'went_on_stream'],
      movesCharacters: [],
    },
    {
      id: 'we_the_hearing',
      atWorldMinute: 6 * 1440 + 10 * 60,
      locationId: 'housing_office',
      publicCopy:
        'Friday, ten o’clock: the housing appeals panel sits in Room 204, Ms. Park in the middle chair, with two files in front of her that both say 12C.',
      directorNotes:
        'Friday at ten, the hearing. Ms. Park chairs; two panel members from Residence Life sit either side. Yuri comes in sunglasses. What the player brings decides it: paper, a joint appeal, nothing, or a withdrawal. Without paper the dean’s code stands and the room goes to her.',
      setsFlags: ['hearing_day'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'park', toLocationId: 'housing_office' },
        { characterId: 'yuri', toLocationId: 'housing_office' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_who_sleeps_in_12c',
      kind: 'FINALE',
      label: 'Who sleeps in 12C on Friday night',
      seedHint: 'Two printed emails held up side by side in a doorway, the same room on both.',
      payoffHint: 'Room 204, ten o’clock, Ms. Park in the middle chair, and whatever the player managed to bring.',
      weight: 1,
    },
    {
      id: 'p_off_air',
      kind: 'RELATIONSHIP',
      label: 'The person she is when the camera is off',
      seedHint: 'A voice through the wall that drops an octave the second the stream ends.',
      payoffHint: 'The roof, or noodles at two in the morning, and something said in the real voice that she does not take back.',
      weight: 0.9,
    },
    {
      id: 'p_the_code',
      kind: 'MYSTERY',
      label: 'Why the system gave her your room',
      seedHint: 'Her email has no lottery number, only a reference code beginning OVR.',
      payoffHint: 'An override entered above Ms. Park’s head with a dean’s code, at Haneul’s request, that nobody told Yuri about.',
      weight: 0.75,
    },
    {
      id: 'p_quadwatch',
      kind: 'RIVAL',
      label: 'Whoever runs Quadwatch',
      seedHint: 'A bounty for her door, a flyer with a toner streak, and a neighbour who is always filming.',
      payoffHint: 'Jonah in 12D, a tuition bill due in nine days, and a choice about what he deserves.',
      weight: 0.7,
    },
    {
      id: 'p_a_door_that_locks',
      kind: 'THEME',
      label: 'A door that locks',
      seedHint: 'She checks the bedroom lock three times, and knows the player saw.',
      payoffHint: 'The leak downtown, the bench across the street, and whether anybody keeps her door a secret.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_lab',
      name: 'You Study Something Hard',
      role: 'Technical study and focus',
      summary: 'You are in a degree with labs until nine at night, so you are good at numbers, revision and keeping calm on a deadline.',
      playstyle: ['Studious', 'Patient', 'Good with numbers'],
      blurb: 'Two years of ninety-minute commutes, every one of them with a textbook open on your knees.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { study: 3, notice: 1, netsense: 1 },
      startingItems: [{ itemId: 'stats_notes', qty: 1 }],
      startingAbilities: ['study_session'],
      startingReputation: [{ factionId: 'faction_housing', amount: 10 }],
    },
    {
      id: 'arch_nights',
      name: 'You Work Nights',
      role: 'Service job and social skills',
      summary: 'You pay your own way on late shifts at a diner, so you can cook anything, talk to anyone and stay awake longer than most.',
      playstyle: ['Warm', 'Night owl', 'Cooks'],
      blurb: 'You have served pancakes at three in the morning to people far stranger than a famous roommate.',
      attributeBonus: { presence: 2, mind: 1, resolve: 1 },
      skillProficiencies: { cooking: 3, charm: 2 },
      startingItems: [{ itemId: 'spice_tin', qty: 1 }],
      startingAbilities: ['lend_a_hand'],
      startingReputation: [],
    },
    {
      id: 'arch_athlete',
      name: 'You Play a Sport',
      role: 'Physical training and team play',
      summary: 'You are on a university team, so you are strong, up before dawn and very hard to move out of a room you have decided is yours.',
      playstyle: ['Physical', 'Early riser', 'Stubborn'],
      blurb: 'Practice is at six. Your alarm is at twenty to. Nobody has ever talked you out of a lane.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { legwork: 3, nerve: 2 },
      startingItems: [{ itemId: 'alarm_clock', qty: 1 }],
      startingAbilities: ['stand_your_ground'],
      startingReputation: [{ factionId: 'faction_floor', amount: 10 }],
    },
    {
      id: 'arch_online',
      name: 'You Know the Internet',
      role: 'Technical and online skills',
      summary: 'You run the website for a campus club and you have been online far too long, so you can trace an account, read a screenshot and spot a fake.',
      playstyle: ['Online', 'Sharp', 'Bluffs well'],
      blurb: 'You can find anybody’s old username from one photo of their bookshelf, and so far you have chosen to use this responsibly.',
      attributeBonus: { arcana: 3, mind: 1 },
      skillProficiencies: { netsense: 3, wit: 2 },
      startingItems: [{ itemId: 'sticker_laptop', qty: 1 }],
      startingAbilities: ['dig_into_it'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on your housing email?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Rivera' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'Why did you need this room so badly?',
      helpText:
        'What you study or do at Westmere, which sets what you are good at. It stays fixed for the whole story. It does not decide whether you keep the room, whether you tell anybody who she is, or what the two of you become; none of that is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does everybody on campus know about you?',
      helpText: 'One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once missed the first bus, and I have never once been on time anyway.',
    },
    {
      id: 'first_move',
      label: 'What is your first instinct in the doorway?',
      helpText: 'A starting temperament, not a commitment. You can do the opposite on the first turn and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'hold_the_room', label: 'Two years of waiting. The room is mine.' },
        { id: 'charm_her', label: 'Make her laugh first and argue second' },
        { id: 'go_to_housing', label: 'Take it straight to the housing office' },
        { id: 'just_curious', label: 'Work out why she wants it so badly' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see in the doorway?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A box under one arm, a backpack on the other, and a very determined face.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Exactly twelve, because the storyteller reads the first twelve. Four are
   * losses and none of them is written as a punishment: her door getting out,
   * the player selling it, walking away, and the week ending with nobody
   * saying anything. "The Long Commute" is walking away and is open early.
   * Only "Fair and Square" needs the override mystery; everything else is
   * reachable by a player who never wonders how she got the room.
   */
  endings: [
    {
      id: 'end_house_rules',
      name: 'House Rules',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['made_it_a_double'], flagsUnset: ['together', 'exposed'] },
      condition:
        'The panel made 12C a double, which has never been done, and the two of them are roommates on purpose now. Friends, a bathroom schedule, an agreement on the fridge in two handwritings. Play it small and funny: the first ordinary week after the strange one. Nobody makes a speech.',
      epilogue:
        'The roommate agreement runs to fourteen pages by December, a new floor record. Rule nine is still the kettle. She streams through the wall most nights and, on the bad ones, there is a knock on the bedroom door at one with noodles behind it.',
      hint: '',
    },
    {
      id: 'end_two_doors_down',
      name: 'Two Doors Down',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['hearing_over', 'just_roommates'], flagsUnset: ['exposed', 'made_it_a_double'] },
      condition:
        'The hearing settled the room and nobody said anything else. They were polite and funny all week and never once said what it was, and that turned out to be a decision. Do not write it as a punishment. It is the most ordinary ending a week like this can have.',
      epilogue:
        'They wave in the lift. Sometimes they end up in the same café queue and talk about nothing for exactly as long as the queue lasts. She still follows the player on one account, and likes one post a year, always the same week.',
      hint: '',
    },
    {
      id: 'end_the_room_is_yours',
      name: 'The Room Is Yours',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['you_kept_12c'], flagsUnset: ['together', 'exposed', 'override_exposed'] },
      condition:
        'The player won the room on their lottery number and the university quietly found Yuri a secure single across campus. The player got exactly what they waited two years for. Write what it is like to have the room to themselves after a week of not having it, and let the quiet be slightly too quiet.',
      epilogue:
        'The bedroom door locks and there is nobody to lock it against. The kettle is always where it was left. Some nights, at nine, the player catches themselves listening for a voice an octave up through a wall that has nobody behind it.',
      hint: '',
    },
    {
      id: 'end_the_sofa_was_fine',
      name: 'The Sofa Was Fine, Actually',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: {
        flagsSet: ['she_kept_12c'],
        flagsUnset: ['exposed', 'together'],
        minRelationship: [{ characterId: 'yuri', dimension: 'trust', value: 55 }],
      },
      condition:
        'The room went to Yuri, and the player found a place elsewhere, but they left as friends. She has decided the fold-out sofa is the player’s whenever they want it. Write the move-out as warm and slightly ridiculous, and do not pretend the player did not lose something.',
      epilogue:
        'The player ends up in a room in Hargrove Hall with radiators that knock. There is a spare key to 12C on their keyring that nobody mentions. The sofa gets used about twice a week, mostly for films, once for a statistics exam.',
      hint: '',
    },
    {
      id: 'end_floor_twelve_door_c',
      name: 'Floor Twelve, Door C',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['exposed'], flagsUnset: ['sold_her_out'] },
      condition:
        'Her door got out, through a window on a stream or a post nobody stopped, and nobody sold it on purpose. She leaves campus within a day. Write the leaving as practical and fast, Haneul on two phones and a car at the service entrance, and let the player be in the doorway again, the other way round.',
      epilogue:
        'She finishes the term online from somewhere she does not name. 12C goes to the waitlist. In the spring a parcel arrives at Linden House with no return address: a dented rice cooker and a note in her handwriting that says only "Rule four still applies."',
      hint: 'There is a window behind the ring light.',
    },
    {
      id: 'end_five_hundred_dollars',
      name: 'Five Hundred Dollars',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['sold_her_out'] },
      condition:
        'The player sold her door to the gossip account. Do not soften it and do not make it a cartoon. The money arrives, the post goes up, and the player gets to watch exactly what they bought. She never finds out for certain who it was. She does not need to.',
      epilogue:
        'The money covers about a month of something. Strangers wait outside Linden House for nine days, then lose interest. She moves out on the second. The player keeps the room, and the room keeps the strip of tape on the floor where the ring light used to go.',
      hint: '',
    },
    {
      id: 'end_the_long_commute',
      name: 'The Long Commute',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['together'] },
      condition:
        'The player walked away from the room they waited two years for and went back to the ninety-minute commute, without explaining it to anybody. Do not make it a tragedy and do not redeem it. It is a coherent response to a week like this, and the person it costs most may not be the player.',
      epilogue:
        'The bus is the same bus. The player gets a lot of reading done. Somewhere around November a voice an octave up on somebody else’s phone, three seats ahead, says "Hiiii, chat," and the player gets off a stop early without deciding to.',
      hint: '',
    },
    {
      id: 'end_off_air',
      name: 'Off Air',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['together', 'knows:her_reason'],
        flagsUnset: ['exposed'],
        minRelationship: [{ characterId: 'yuri', dimension: 'affection', value: 78 }],
      },
      condition:
        'They are together, and the player knows exactly why she needed a door that locks. This is the romance ending and it happens off camera on purpose: nobody in her chat knows, and that is the gift. Write it in the real voice. At most a kiss, and the smallest possible amount of ceremony.',
      epilogue:
        'Her chat spends a month theorising about why she laughs differently now. Nobody gets close. On Sundays she leaves the bedroom door open while she edits, and the player is the only person on earth who knows that means anything.',
      hint: 'Ask her something she has never been asked on stream.',
    },
    {
      id: 'end_the_mystery_roommate',
      name: 'The Mystery Roommate',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['on_air_together'],
        flagsUnset: ['exposed'],
        minFactionReputation: [{ factionId: 'faction_chat', value: 45 }],
      },
      condition:
        'The player went on stream and her chat adopted them. They are a recurring bit now, the voice off camera that gets the last word, and it worked without giving away the window. Write the fame as fun and slightly alarming, and keep Yuri the one in charge of it.',
      epilogue:
        'The roommate segment runs on Wednesdays. The clip where the player burns the noodles has four million views. Haneul renews the sponsorship and sends a fruit basket with a contract tucked in it, which the player does not sign, and the basket is eaten anyway.',
      hint: '',
    },
    {
      id: 'end_fair_and_square',
      name: 'Fair and Square',
      rarity: 'RARE',
      minTurn: 36,
      requires: {
        flagsSet: ['override_exposed'],
        minFactionReputation: [{ factionId: 'faction_housing', value: 40 }],
      },
      condition:
        'The player put the override log on the record and the university had to admit it sold a room out from under the lottery. The room is theirs, and the lottery is fixed for everybody after them. Write Ms. Park getting her process back, and Yuri finding out what Haneul did, and both of those costing somebody something.',
      epilogue:
        'Every override in the system is reviewed by Christmas. Three more turn up. Ms. Park frames the original log and hangs it behind the glass, facing outwards. Yuri gets a secure single through the ordinary queue, and asks for the floor directly below.',
      hint: '',
    },
    {
      id: 'end_both_names_on_the_door',
      name: 'Both Names on the Door',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['together', 'made_it_a_double', 'quadwatch_down'] },
      condition:
        'Everything held: the panel made it a double, the account that hunted her went dark, and the two of them are together. This is the ending where the premise pays off completely, and it should still be small: a name card on the door with two names on it, in her handwriting, and an argument about whose name goes first.',
      epilogue:
        'Her name goes first, on a coin toss she insists was fair. The roommate agreement gets a rule twenty about the sofa, which neither of them sleeps on any more. Jonah, of all people, helps them carry a second desk up twelve floors.',
      hint: '',
    },
    {
      id: 'end_goodnight_chat',
      name: 'Goodnight, Chat',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['together', 'studied_together', 'she_feels_safe'] },
      condition:
        'She passes statistics, she is safe in the building, and she decides to take a year off streaming to finish her degree as a person rather than a channel. Write her last stream before the break, the bright voice saying goodnight to two million people, and then the player turning off the ring light.',
      epilogue:
        'She graduates the following summer with her real voice and a grade in statistics she makes the player frame. The channel comes back, smaller and on her terms. The first thing she says on it is "Hi, chat," in the voice she actually has.',
      hint: '',
    },
  ],
  opening:
    'Four pink suitcases thump into your doorway.\n\n' +
    'The woman behind them pulls down a face mask. Hoodie three sizes too big, sunglasses indoors, an iced coffee the size of a vase. Half the campus has her face as a phone wallpaper.\n\n' +
    '"Yuri Sakamoto. No, I’m not live. Yes, it’s really me."\n\n' +
    'She holds up a printed email: Room 12C. Her name.\n\n' +
    'You hold up yours. Room 12C. Your name.\n\n' +
    'Her phone buzzes. She silences it without looking.\n\n' +
    '"Housing says this is my room." She takes a long, slow sip. "You have until I finish this coffee to prove it’s yours. Starting now."',
  openingPanel: {
    assetKey: 'story_roommate_lottery/opening',
    alt: 'Yuri in your doorway in a huge hoodie and pushed-up sunglasses, four pink suitcases beside her, holding up a printed email and an enormous iced coffee.',
  },
  openingSuggestions: [
    '"You could live anywhere. Why do you want a dorm room this badly?"',
    'I sit down on the bare mattress and start unpacking, very slowly, while she watches.',
    'I take the coffee out of her hand and finish it in one long gulp.',
  ],
  coverDirection: [
    'SUBJECT: Yuri Sakamoto, a famous streamer, alone and unmistakable in the foreground of a key visual for a campus romantic comedy anime.',
    'She fills the frame from the waist up, leaning in the doorway of a bare dorm bedroom, holding about two thirds of the picture.',
    'An adult woman with long black hair and one pink streak, sunglasses pushed up on her head, a charcoal hoodie three sizes too big,',
    'one hand holding a huge iced coffee with a straw, raised like a timer.',
    'Her expression is a deadpan challenge with the corner of a smile, one eyebrow raised, looking straight at the viewer.',
    'Four matching pink suitcases stand beside her in the doorway.',
    'BETWEEN HER AND THE VIEWER: two printed sheets of paper held up side by side, blank apart from soft grey lines: no letters, no numbers, nothing that reads as writing.',
    'BEHIND HER, soft and secondary: a small bright dorm bedroom with a bare mattress, a desk under a window over a river, cardboard boxes, a ring light on a stand.',
    'LIGHT: warm late-morning sun from the window and a cool pink glow from the ring light, so she is rimmed in pink and lit in gold.',
    'TITLE: the words ROOMMATE LOTTERY painted into the art in the upper third as a bold rounded logo, white with a pink outline,',
    'spelled exactly ROOMMATE LOTTERY, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const ROOMMATE_LOTTERY = StoryVersion.parse(raw);
