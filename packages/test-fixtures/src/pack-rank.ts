import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Pack Rank" — a wall of names, a chalk ring, and the one student in the
 * school who has no instinct to kneel.
 *
 * The slate row is a lone human at a beastfolk academy where rank is set by
 * sparring, and the structural bet is that the human's disadvantage and edge
 * are the same fact. Beastfolk wear what they feel on their ears and tails,
 * smell fear, and yield on instinct when somebody stronger growls. A human has
 * no tells they can read and no instinct to obey. Every custom at Ashgrove was
 * written by people who flinch, so every scene is a small game the cast has
 * never had to play: a stare against somebody who feels nothing, a bluff
 * against somebody who has never read a face, a run against a sprinter, and a
 * newcomer who keeps getting back up because nothing in them says stay down.
 *
 * The first beat is the whole premise. Ruka's tray hits the table and she asks
 * a question with five honest answers: four forms and a walk to the back of the
 * line. Refusing is a route, not a failure, and so is losing — losing a first
 * bout gets you claimed by the challenger's den and put on the wall, which is
 * the secret kindness in the tray that Ruka will never admit to.
 *
 * Seven nights is the playable span, ending at the full moon when the Order is
 * fixed and the unranked go home. Two pressures run under it: the cheapest rank
 * on the wall belongs to the one person who has been kind to the player, and
 * two people have been asked by the same letter-writer to see the human gone.
 * The thirty-year-old name scratched off the old Order is a LEAD, discovered
 * only by somebody who climbs to the archive or opens the bookmaker's ledger.
 * A player who never looks plays a complete story.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest`
 * refills those and a night's sleep is the honest thing for that to mean.
 * Hackles is first among the descending pair, because PUBLIC_VIOLENCE and the
 * generic cost path take the first GOOD_LOW in array order, and a fight outside
 * the chalk putting the whole school's fur up is exactly right. Bruising heals
 * on its own, so the top band is a night in the infirmary rather than a wall.
 */

const DAY = 1440;
const MOON_BOUT = 6 * DAY + 21 * 60;
const MOON_COUNT = 6 * DAY + 23 * 60;

const raw = {
  id: 'sv_pack_rank_1',
  storyId: 'story_pack_rank',
  version: 1,
  title: 'Pack Rank',
  fantasyLabel: 'The only human. The wolf wants you first.',
  hook: 'At a college where rank is won by sparring, you are the first human in thirty years, and on your first night the wolf ranked second in the school slams her tray down on your table.',
  premise:
    'Ashgrove Academy is a four-year college in the hills for the beastfolk clans: wolves, lions, bears, foxes, hares and a dozen more, every one of them an adult with the ears, tail and nose to prove it. You arrived this morning, the first human it has admitted in thirty years.\n\n' +
    'Rank decides everything here: where you sleep, when you eat, who steps aside in a corridor. Every student is numbered on the Order, the list painted on the dining-hall wall, and a number only changes in the Circle, a chalk ring in the old courtyard.\n\n' +
    'Put your tray down on somebody’s table and you have challenged them. The one challenged picks the form: a hold, a strike, a run or a stare.\n\n' +
    'You have no rank yet, so you eat last. On the seventh night the moon is full, the Order is fixed for the year, and anyone still unranked is sent home. You have seven days to get on it.\n\n' +
    'You have no claws and no fangs. You also have no ears that flatten when you lie, and none of the instinct that makes beastfolk bare their throats when somebody stronger growls. Nobody here knows what to do with that.\n\n' +
    'On your first night, the second-ranked student in the school puts her tray down on your table.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Academy', 'Martial arts', 'Rivalry', 'Romance', 'Comedy'],
  mechanicsChips: [
    'Rank is won in the Circle',
    'You pick the form',
    'Seven nights to get on the wall',
    'They cannot read your face',
    'Refusing is a route',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can win your place in the Circle, talk your way into a den, outrun a wolf on the ridge, or refuse every challenge and see how far that gets you. Ruka is not your enemy, even if she looks like one on the first night, and the prince is much lonelier than he lets anyone see.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'long_hall',
    startWorldMinute: 19 * 60 + 10,
    startingItems: [{ itemId: 'admission_letter', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. Ruka Varn is twenty, Lio Solenne twenty-one, Pim Hollowell nineteen, Fenn Asari twenty-two, Bryn Holt twenty-three and Coach Halvard Stagg fifty-one. Every student at Ashgrove is at least eighteen, and so is the player.',
      'Ashgrove Academy is a four-year college for the beastfolk clans. Every student is an adult between eighteen and twenty-five. The player is the first human admitted in thirty years and arrived this morning.',
      'The Order is the ranked list of all two hundred and eleven students, painted in white on black boards on the end wall of the Long Hall and repainted after every bout. Rank sets meal order, rooms, classes and who steps aside. The player is not on it.',
      'Rank changes only in the Circle. Anyone may challenge anyone ranked above them by putting their tray down on that person’s table; if the challenger wins, the two swap places. A newcomer’s first bout is open to anyone: if the newcomer wins they take the challenger’s number, and the challenger and everybody below drop one place, and if they lose the challenger’s den claims them and they go on the Order at the bottom of that den. An unranked student who puts their own tray down on somebody and wins swaps in the ordinary way, which leaves the loser unranked.',
      'There is one way onto the Order without a bout, and almost nobody remembers it is in the rules: if every member of a den signs for an unranked student before the full moon, that student goes on the wall at the bottom of that den without taking anybody’s place. The Warren is the bottom of the Order and has not signed for anybody in years.',
      'The one challenged names the form. The Hold is grappling, won by a pin to a count of three or a yield. The Strike is padded, claws blunted, first to three clean touches. The Run is the eleven-kilometre ridge course, and the first to stop loses. The Stare is won when the other looks away, flattens their ears or bares their throat. No biting, ever. Coach Stagg referees and the bout ends when he says.',
      'On the seventh night the moon is full: the Order is read aloud and fixed for the year, and anyone unranked is sent home on the morning bus. That night is the Moon Bout, the only night the first rank can be challenged, by anyone in the top ten or anyone the first rank invites.',
      'Beastfolk ears and tails show what they feel, they can smell fear, and they have a yield instinct: faced with a stronger presence, the body flattens its ears and bares its throat, sometimes before the mind has decided. A lion’s roar sets it off in almost everyone. Humans have no tells beastfolk can read, smell of soap and very little else, and do not have the instinct at all.',
      'Nobody at Ashgrove has magic, the player least of all: nobody flies, vanishes, reads minds or casts anything, and no rule allows it. When the player tries something a human body cannot do, they try it, it fails in front of everybody, and the hall laughs. Stagg never rules the impossible into the rulebook.',
      'Lio Solenne of Sunward House has been first on the Order for two years and has never once been struck: every challenger has yielded to his roar before reaching him. Ruka Varn of the Hill Pack is second.',
      'Thirty years ago a human student climbed to seventh. The night before she was due to challenge the first rank she fell on the north stair, broke her leg, missed the full moon and was sent home, and the clans stopped admitting humans. Her name is scratched off the carved Order in the archive. What really happened is discoverable and owed to nobody.',
    ],
    toneGuide:
      'Loud, physical and funny, a sports-academy story with real tension underneath. Customs are concrete: trays, chalk, the painted Order, the kitchen hatch, the count of three, ears going flat, a tail knocking a cup over. The human’s edge is never magic. It is a face nobody can read, no instinct to kneel, endurance, hands and stubbornness, and the cast should be visibly thrown by it. ' +
      'Beastfolk are people, not animals, and nobody is a villain: even the student asked to hurt the player is a scholarship student in debt to the people asking. Bouts are legible and kept clean: distance, grip, breath, who is still inside the chalk, a split lip at worst. ' +
      'Every character is an adult. Romance is optional and slow, rivalry with heat in it, at most a kiss, and never fan service: ears and tails are body language, not something the prose lingers on. ' +
      'Keep the hall alive: two hundred students reacting as one, odds on a chalkboard, somebody repainting a line. If a scene has nothing at stake, make it funny and short. The face at the top of a beat is Ruka’s whenever she is in the scene. ' +
      'Refusing a challenge is a real answer: it costs face, never the story. The Stare is never a free win for a human either: it runs for minutes, the hall does everything it can to make the human laugh, blink or look away, and Ruka has outstared fourth-years twice her size. Flat ears always mean yielding; somebody squaring up pricks their ears forward.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Stagg chalks the ring and steps out of it.\n\n\"Stare,\" he says. \"First to look away. Begin.\"\n\nRuka’s ears go up and forward, hard. The whole courtyard leans back from her like grass in a wind.\n\nYou feel nothing. Just a slightly awkward amount of eye contact with a stranger.\n\nTwenty seconds. Thirty.\n\nHer left ear twitches.\n\n\"Stop that,\" she says through her teeth.\n\n\"Stop what?\"\n\n\"Being nothing.\" The ear twitches again. Two hundred people stop breathing.",
      "Somebody knocks at six fifty-nine exactly.\n\nA rabbit-eared courier is on the step, out of breath, a honey bun in one hand and a folded note in the other.\n\n\"Pim. Two-eleven. Bottom of the wall. Hi.\" He pushes the bun at you. \"That’s free. The note isn’t.\"\n\nHis ears swivel toward the drive, then back.\n\n\"Also, and I didn’t tell you this,\" he says, \"you want the south stair after dark.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 11, resolve: 13, arcana: 8 },
  skills: [
    { id: 'tells', name: 'Reading Tells', attribute: 'mind', description: 'Ears, tails, nostrils and shoulders: everything a beastfolk body says before its owner has decided to say anything.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Not looking away, not stepping back, and not leaving the chalk when two hundred people expect you to.' },
    { id: 'grappling', name: 'Grappling', attribute: 'might', description: 'Getting underneath somebody larger and staying there until the count reaches three.' },
    { id: 'endurance', name: 'Endurance', attribute: 'might', description: 'The oldest thing humans are good at: still going an hour after a faster runner has stopped.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Being somewhere a padded claw is not, for long enough that its owner gets tired.' },
    { id: 'talk', name: 'Talk', attribute: 'presence', description: 'Bargaining, joking and turning a challenge into a conversation before anybody has noticed.' },
    { id: 'bluff', name: 'Bluffing', attribute: 'presence', description: 'Lying to people who have spent their whole lives reading ears, with a face that has none.' },
    { id: 'customs', name: 'Clan Customs', attribute: 'arcana', description: 'The rules nobody explains to newcomers, the history behind them, and the old boards in the archive.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so resting restores legs and head and
   * nothing else. Hackles is first in the GOOD_LOW order on purpose: public
   * violence and the generic cost path both raise the first one, and a fight in
   * a corridor putting the whole school's fur up is the right consequence.
   * Bruising heals at a little over a point an hour, so the infirmary band is a
   * night's rest away rather than permanent.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 80,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Legs gone, breath gone, and every sentence comes out shorter than intended. A beastfolk student can hear it from across the courtyard, and one of them will choose this moment to put a tray down.',
      color: '#E0A458',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes. The player sits down at the first chance, misses the second half of what people say and agrees to things to end the conversation. Any form in the Circle except the Stare is a bad idea here, and sleeping in the gatehouse room is the strongest move available.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long day at a school that tests you every time you cross the courtyard. Good for one bout or one long conversation, honest about not being good for both. Anyone who knows how to watch, Ruka especially, can see it in the shoulders.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh. Enough in the legs for the ridge and enough in the head to watch three sets of ears at once. The player can afford to be patient, to let a bout go long, and to say the clever thing instead of the first thing.',
        },
      ],
    },
    {
      id: 'hackles',
      name: 'Hackles',
      max: 100,
      start: 30,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The school has stopped treating the human as an event. Ears stay up when they walk into the hall, somebody saves them a seat without making a point of it, and the couriers stop charging them the human rate.',
      color: '#B5543C',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Curiosity, mostly friendly. Ears swivel when the player walks in and then swivel back. Students ask questions they would never ask each other, about noses and tails and whether humans really cannot smell rain coming. The hall is a place the player can sit.',
        },
        {
          upTo: 50,
          behaviour:
            'A school with its fur up. Conversations pause when the player passes and start again a beat too late. Somebody at the next table has started counting the days to the full moon out loud. Nothing has happened yet, and everybody is waiting for something to.',
        },
        {
          upTo: 80,
          behaviour:
            'Open hostility from the dens that feel their place on the wall is threatened, Sunward House above all. Trays get knocked, doors get held shut, and the lamp on the north stair goes out more often. Ruka, whatever she thinks of the player, starts walking near them in corridors without explaining why.',
        },
        {
          upTo: 100,
          behaviour:
            'Someone is organising it. Notes go round that the couriers refuse to carry, and a group waits by the lower gate after the last bus. The Faculty notices, and Coach Stagg stops refereeing bouts the player is in and starts standing in doorways instead.',
        },
      ],
    },
    {
      id: 'bruising',
      name: 'Bruising',
      max: 100,
      start: 5,
      regenPerHour: -1.2,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nothing hurts. The player can take the Hold, the Strike or the Run tonight, and nobody with a nurse’s eye would stop them.',
      color: '#6D5A8C',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Fresh or close to it: a scraped knuckle, chalk dust in the hair. The body is not a factor in anything the player does, and nobody remarks on it unless they want to start a conversation.',
        },
        {
          upTo: 55,
          behaviour:
            'Sore in the ordinary way of somebody who keeps getting put on flagstones. Stairs are slower and sitting down earns a wince the wolves notice and approve of. Fine for the Stare and the Run; the Hold and the Strike will cost more than they used to.',
        },
        {
          upTo: 85,
          behaviour:
            'Hurting. A swollen wrist, a rib that complains on deep breaths, a limp the hall can see. Coach Stagg looks hard before letting the player into the chalk, and Pim starts bringing two buns instead of one without being asked.',
        },
        {
          upTo: 100,
          behaviour:
            'The infirmary is the only sensible place to be. Coach Stagg will not let the player into the Circle in any form, and anybody who challenges them anyway is breaking rule nine in front of witnesses. Rest, liniment and the jar of sweets.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'admission_letter',
      name: 'The Admission Letter',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'Cream paper, the Faculty seal, your name spelled right on the second attempt. It admits you to Ashgrove Academy as a first-year student "under the old terms", which nobody has explained.',
      loreText:
        'Under the seal, somebody has added one line by hand in soft pencil: "After dark, use the south stair. — H.S."',
      icon: 'letter',
    },
    {
      id: 'rank_token',
      name: 'The Rank Token',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'A disc of pale wood on a leather cord with a number burned into it. Every ranked student wears one, and the number changes when the Order does.',
      loreText:
        'The tokens are older than the boards in the archive. When a student is sent home, their token is dropped in a box in the Faculty office, and nobody has emptied the box in living memory.',
      icon: 'token',
    },
    {
      id: 'honey_bun',
      name: 'Honey Bun',
      tags: ['food'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 15, consumesItem: true },
      description: 'Sticky, still warm, sold at the kitchen hatch and out of a courier’s satchel for one coin each.',
      loreText: 'The Warren buys them from the town bakery at dawn and sells them at a markup nobody has ever successfully negotiated down.',
      icon: 'bread',
    },
    {
      id: 'hand_wraps',
      name: 'Hand Wraps',
      tags: ['gear'],
      skillModifiers: { grappling: 1 },
      description: 'Two rolls of cotton wrap, grey with use, from a wrestling room in the city. Your hands know exactly how tight.',
      loreText: 'The wolves tape their hands the same way, which Ruka notices on the first night and does not mention.',
      icon: 'tools',
    },
    {
      id: 'road_shoes',
      name: 'Road Shoes',
      tags: ['gear'],
      skillModifiers: { endurance: 1 },
      description: 'Running shoes with a thousand kilometres on them and the tread worn smooth on the outside of the left heel.',
      loreText: 'Beastfolk run barefoot or in soft boots. Half the Hill Pack will want to try these on.',
      icon: 'boots',
    },
    {
      id: 'pocket_notebook',
      name: 'The Pocket Notebook',
      tags: ['document', 'personal'],
      skillModifiers: { talk: 1 },
      description: 'A battered notebook full of arguments you once won, and a fresh page headed "Ashgrove: rules nobody tells you".',
      loreText: 'By the end of the first week the fresh page has nineteen rules on it, and four of them are crossed out.',
      icon: 'book',
    },
    {
      id: 'clan_manners',
      name: 'A Guide to Clan Manners',
      tags: ['document'],
      skillModifiers: { customs: 1, tells: 1 },
      description: 'A university handbook on clan customs, dog-eared and full of your own notes in the margins. Chapter six is the yield instinct.',
      loreText: 'It was written by a human scholar forty years ago and is wrong about wolves in three places, which Ruka will be delighted to point out.',
      icon: 'book',
    },
    {
      id: 'courier_map',
      name: 'The Courier’s Map',
      tags: ['document'],
      skillModifiers: { endurance: 1 },
      description: 'A hand-drawn map of the whole grounds in six colours of ink: every stair, roof, back gate and sheltered line along the ridge.',
      loreText: 'The north stair is marked in red with a small cross beside it. Pim says the cross was there when he got the map.',
      icon: 'map',
    },
    {
      id: 'old_ledger',
      name: 'The Old Ledger',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A cloth-bound betting ledger, thirty years old, recording every Circle bout of one academic year in tiny, sharp handwriting. It belonged to Fenn Asari’s grandmother.',
      loreText:
        'One page has its corner folded down. The night before the Moon Bout: a single bet, larger than anything else in the book, "Marsh does not fight", written against the name G. Holt.',
      icon: 'book',
    },
    {
      id: 'year_photograph',
      name: 'The Year Photograph',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A framed photograph of the top ten from thirty years ago, posed in front of the Long Hall. In the front row is a human woman with cropped hair, grinning, and beside her a stag student with both antlers whole.',
      loreText:
        'The names are written along the bottom of the mount. One has been scratched out with the same tool, and the same force, as the board on the wall.',
      icon: 'photo',
    },
    {
      id: 'chalk',
      name: 'A Stick of Chalk',
      tags: ['tool'],
      description: 'Courtyard chalk, the kind Coach Stagg redraws the ring with every evening. It leaves white on your fingers for a day.',
      loreText: 'Drawing a ring on the ground anywhere at Ashgrove, even as a joke, means something. People will stop and look.',
      icon: 'tools',
    },
  ],
  abilities: [
    {
      id: 'read_the_ears',
      name: 'Read the Ears',
      tags: ['sight'],
      description: 'Watch the ears, the tail and the shoulders, and know what somebody feels before they have decided to show it.',
      affordances: ['read her ears', 'watch his tail', 'read them', 'look at her ears', 'watch her', 'study him', 'what is she feeling', 'notice', 'look around'],
      costs: [{ resourceId: 'stamina', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'tells', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_the_stare',
      name: 'Hold the Stare',
      tags: ['social'],
      description: 'Meet somebody’s eyes and keep meeting them. Whatever they feel when a stronger animal stares at them, you do not.',
      affordances: ['stare', 'stare her down', 'stare back', 'hold her eyes', 'do not look away', 'pick the stare', 'meet his eyes', 'look her in the eye'],
      costs: [{ resourceId: 'hackles', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_it_down',
      name: 'Talk It Down',
      tags: ['social'],
      description: 'Turn a challenge into a negotiation: ask what is at stake, name your terms, make a joke and see who laughs.',
      affordances: ['talk', 'negotiate', 'bargain', 'ask what i get', 'make a deal', 'calm her down', 'make a joke', 'talk my way out', 'ask the rules'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'talk', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'poker_face',
      name: 'Poker Face',
      tags: ['social'],
      description: 'Lie to someone who has spent their whole life reading ears. Your face gives them nothing, and they do not know how to read nothing.',
      affordances: ['lie', 'bluff', 'pretend', 'act like i know', 'claim', 'keep a straight face', 'say i have done this before', 'fake it'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluff', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_inside',
      name: 'Get Inside',
      tags: ['offensive'],
      description: 'Close the distance before the claws matter, get underneath, and wrestle for the pin. The Hold, the human way.',
      affordances: ['grapple', 'wrestle', 'clinch', 'take her down', 'pick the hold', 'get inside', 'pin her', 'go for the legs'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'bruising', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'grappling', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_out_of_reach',
      name: 'Stay Out of Reach',
      tags: ['defensive'],
      description: 'Slip, circle and back off until a faster opponent has spent everything trying to touch you. The Strike, survived.',
      affordances: ['dodge', 'slip', 'stay out of reach', 'pick the strike', 'circle', 'back off', 'duck', 'keep my distance'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'outlast',
      name: 'Outlast',
      tags: ['movement'],
      description: 'Settle into a pace you can hold for hours and keep it long after a sprinter has stopped. The Run, and anything else that is a matter of not stopping.',
      affordances: ['run', 'pick the run', 'keep running', 'outlast', 'run the ridge', 'pace myself', 'run her into the ground', 'go the distance'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'endurance', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_back_up',
      name: 'Get Back Up',
      tags: ['defensive'],
      description: 'Nothing in you says stay down, so you do not. Stand up again, every time, and let them work out what that means.',
      affordances: ['get back up', 'stand back up', 'refuse to yield', 'do not stay down', 'up again', 'keep standing', 'never yield'],
      costs: [{ resourceId: 'bruising', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_away',
      name: 'Walk Away',
      tags: ['social'],
      description: 'Decline, out loud, in front of everyone, and leave. At Ashgrove that is a statement, and it is yours to make.',
      affordances: ['walk away', 'refuse', 'decline', 'go to the back of the line', 'back of the line', 'say no', 'leave it', 'back down', 'turn it down'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lay_down_a_tray',
      name: 'Lay Down a Tray',
      tags: ['social'],
      description: 'Put your tray down on somebody’s table. Everybody in the hall knows what it means, and they cannot refuse without going to the back of the line.',
      affordances: ['challenge', 'put my tray down', 'challenge her', 'challenge him', 'call him out', 'call her out', 'issue a challenge', 'tray on their table'],
      costs: [{ resourceId: 'hackles', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'teach_the_stand',
      name: 'Teach the Stand',
      tags: ['social'],
      description: 'Help somebody stay on their feet through a roar their body has always answered by kneeling, using the one thing you have that they do not.',
      affordances: ['teach her', 'show her how', 'teach her to stand', 'train her', 'help her stand', 'stand with her', 'roar at her until she stops kneeling'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_yield'],
        lockedCopy:
          'You do not yet know what it is they feel when somebody stronger growls, and you cannot teach anyone to stand against a thing you have never felt.',
      },
    },
    {
      id: 'read_the_old_order',
      name: 'Read the Old Order',
      tags: ['sight'],
      description: 'Read thirty years of carved boards, photographs and betting pages together until one scratched-out name tells you what happened to her.',
      affordances: ['read the board', 'read it out', 'read the old order', 'compare the boards', 'read the ledger', 'say her name', 'tell them what happened'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'customs', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:edda_marsh'],
        lockedCopy:
          'It is a wall of old names under old varnish. Without knowing which one to look for, and why, it is only a wall.',
      },
    },
  ],
  locations: [
    {
      id: 'long_hall',
      name: 'The Long Hall',
      shortName: 'The Hall',
      description:
        'The dining hall: eleven long tables in rank order, the first one under the painted Order and the last one by the kitchen hatch. The Order is two hundred and eleven names in white paint on black boards running the full height of the end wall, and a student with a brush repaints a line every time a bout changes one. Nobody sits above their number, and the first table eats first.',
      artDirection:
        'A vast old stone dining hall at night, eleven long wooden tables, warm lantern light, a towering end wall of black boards painted with white names and numbers, a kitchen hatch with steam, crowds of beastfolk in college sports jackets and work clothes. Loud, warm, crowded.',
      connections: [
        { to: 'the_circle', travelMinutes: 2, label: 'Out to the courtyard' },
        { to: 'north_stair', travelMinutes: 1, label: 'The north stair, the short way up' },
        { to: 'the_archive', travelMinutes: 5, label: 'The south stair, the long way up' },
        { to: 'boiler_room', travelMinutes: 1, label: 'Down the service steps' },
        { to: 'infirmary', travelMinutes: 3, label: 'The corridor to the infirmary' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'honey_bun', qty: 3, ownerId: null, aka: ['bun', 'honey bun', 'a bun', 'buns'] },
      ],
    },
    {
      id: 'the_circle',
      name: 'The Circle',
      shortName: 'The Circle',
      description:
        'The old courtyard, flagstones worn smooth, and in the middle a ring of chalk six paces across that Coach Stagg redraws every evening. Lantern posts at the four corners, a stone bench where he sits, a cracked flagstone at the dead centre, and every window in three buildings looking down into it. Most bouts here last less than ten seconds, because most students yield.',
      artDirection:
        'An old stone academy courtyard at night, a white chalk ring on worn flagstones, four iron lantern posts, a stone bench, lit windows on three sides with silhouettes of watching beastfolk. Cool blue night, warm lantern pools, dramatic.',
      connections: [
        { to: 'long_hall', travelMinutes: 2, label: 'Back into the hall' },
        { to: 'hill_den', travelMinutes: 4, label: 'Up the hill path to the Hill Pack House' },
        { to: 'sunward_house', travelMinutes: 4, label: 'The gravel drive to Sunward House' },
        { to: 'the_warren', travelMinutes: 3, label: 'Round to the old stables and the loft' },
        { to: 'guest_room', travelMinutes: 4, label: 'Down to the gatehouse room' },
        { to: 'the_ridge', travelMinutes: 6, label: 'Through the back gate to the ridge path' },
        { to: 'infirmary', travelMinutes: 2, label: 'The infirmary door' },
        { to: 'the_gate', travelMinutes: 5, label: 'Down the drive to the lower gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'chalk', qty: 2, ownerId: null, aka: ['chalk', 'a stick of chalk', 'stick of chalk'] },
      ],
    },
    {
      id: 'guest_room',
      name: 'The Gatehouse Room',
      shortName: 'Your Room',
      description:
        'No den would take a human, so the Faculty put you in the old gatekeeper’s room above the lower gate: one bed, one desk, a window onto the road down to town, and a door that does not lock properly. The walls are a metre thick. The stairs up to it are outside, in the wind.',
      artDirection:
        'A small stone room above an old iron gate, a narrow bed, a desk with a lamp, a deep window looking down a winding road to a little town at night, a door with a broken latch. Spare, cold, a little lonely.',
      connections: [
        { to: 'the_circle', travelMinutes: 4, label: 'Up to the courtyard' },
        { to: 'the_gate', travelMinutes: 1, label: 'Down the outside steps' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'hill_den',
      name: 'The Hill Pack House',
      shortName: 'Pack House',
      description:
        'A long, low stone house on the hill side of the grounds where the wolves and their friends sleep in one big bunk room. Boots by the door, a kettle that is always on, a training yard with a post worn smooth by taped hands, and a list on the wall of who runs the ridge at dawn. Outsiders are allowed in the kitchen and nowhere else.',
      artDirection:
        'A long low stone house on a grassy hillside at dawn, a cluttered warm kitchen with a steaming kettle, rows of boots, a training yard with a worn wooden post, mist on the hills behind. Rough, warm, communal.',
      connections: [
        { to: 'the_circle', travelMinutes: 4, label: 'Down the hill path to the courtyard' },
        { to: 'the_ridge', travelMinutes: 3, label: 'The back gate to the ridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'sunward_house',
      name: 'Sunward House',
      shortName: 'Sunward',
      description:
        'The lions’ house, south-facing and old money: deep carpets, a dining room with silver on the table, and portraits of every first rank Sunward has produced, and it has produced most of them. Bryn Holt keeps the door. The lions eat here rather than in the Long Hall, a privilege nobody has been brave enough to question since anyone can remember.',
      artDirection:
        'A grand old stone house with tall south-facing windows, a candlelit dining room with silver and a long polished table, gilt-framed portraits of lion-eared men and women in formal coats on the walls, a broad figure at the door. Rich gold and deep red, hushed.',
      connections: [{ to: 'the_circle', travelMinutes: 4, label: 'Back down the drive to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_warren',
      name: 'The Courier Loft',
      shortName: 'The Loft',
      description:
        'The Warren’s loft above the old stables: hammocks, pigeonholes stuffed with notes, a map of the grounds drawn on the wall in six colours of ink, and the cheapest beds in the school. The couriers carry notes, parcels and buns between every den for a coin a trip, and everything anybody sends passes through here first.',
      artDirection:
        'A cosy cluttered loft above stables, wooden beams, hammocks, walls of pigeonholes stuffed with letters, a colourful hand-drawn map painted on the plaster, lamplight, rabbit-eared couriers sorting post. Busy, warm, scrappy.',
      connections: [{ to: 'the_circle', travelMinutes: 3, label: 'Down the ladder and round to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'courier_map', qty: 1, ownerId: 'pim', aka: ['map', 'the map', 'courier map', 'pim’s map'] },
        { itemId: 'honey_bun', qty: 4, ownerId: 'pim', aka: ['bun', 'honey bun', 'buns'] },
      ],
    },
    {
      id: 'boiler_room',
      name: 'The Boiler Room',
      shortName: 'Boiler Room',
      description:
        'Under the Long Hall, warm, loud and lit orange by the boiler’s grate. A chalkboard on the wall carries the odds on every bout this week in small neat figures. Fenn Asari takes bets at a desk made of two crates and an old door, and there is a locked tin box under it that she never sits far from.',
      artDirection:
        'A cramped basement boiler room glowing orange, pipes and gauges, a big chalkboard covered in betting odds, a makeshift desk of crates and a door, a small fox-eared bookmaker counting coins. Warm, shadowy, smoky.',
      connections: [{ to: 'long_hall', travelMinutes: 1, label: 'Up the service steps to the hall' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [
        { itemId: 'old_ledger', qty: 1, ownerId: 'fenn', aka: ['ledger', 'the old book', 'betting ledger', 'her grandmother’s book', 'the tin box'] },
      ],
    },
    {
      id: 'north_stair',
      name: 'The North Stair',
      shortName: 'North Stair',
      description:
        'A narrow stone stair from the Long Hall up to the archive and the third-years’ corridor, four minutes quicker than the south stair. One lamp at the turn, which keeps going out. Thirty years ago somebody fell here the night before the full moon, and the older staff still take the south stair after dark without saying why.',
      artDirection:
        'A narrow spiral stone staircase in an old building at night, a single wall lamp at the turn, half the steps in shadow, worn treads, a cold draught. Quiet and tense rather than frightening.',
      connections: [
        { to: 'long_hall', travelMinutes: 1, label: 'Down to the hall' },
        { to: 'the_archive', travelMinutes: 1, label: 'Up to the archive' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_archive',
      name: 'The Order Archive',
      shortName: 'The Archive',
      description:
        'A long room under the roof where every year’s final Order is carved into a wooden board and hung, one board a year, back a hundred and twenty years. Varnish, dust, a long study table, and a window seat that Lio Solenne uses in the mornings. One board, thirty years old, has a name in its top ten scratched out so hard the wood underneath has gone pale.',
      artDirection:
        'A long attic archive with sloping beams, rows of old carved wooden boards of names hung floor to ceiling, dust in shafts of morning light, a window seat, one board with a pale gouged-out line. Quiet, golden, old.',
      connections: [
        { to: 'north_stair', travelMinutes: 1, label: 'Down the north stair' },
        { to: 'long_hall', travelMinutes: 5, label: 'Down the south stair, the long way' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [
        { itemId: 'year_photograph', qty: 1, ownerId: null, aka: ['photograph', 'the photo', 'old photo', 'year photo', 'the framed photo'] },
      ],
    },
    {
      id: 'the_ridge',
      name: 'The Ridge Course',
      shortName: 'The Ridge',
      description:
        'Eleven kilometres of path along the bare ridge above the academy, marked by stone cairns and run at dawn by the wolves. The Run form uses it: two runners, one course, and the first to stop loses. The wind never drops up here and the view goes all the way to the sea, where the human cities are.',
      artDirection:
        'A bare windswept ridge path at dawn, stone cairns marking the way, mist below, the academy rooftops small in a valley, a distant silver line of sea and a city. Vast, cold, beautiful.',
      connections: [
        { to: 'the_circle', travelMinutes: 6, label: 'Back down to the courtyard' },
        { to: 'hill_den', travelMinutes: 3, label: 'Down to the Hill Pack House' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'infirmary',
      name: 'The Infirmary',
      shortName: 'Infirmary',
      description:
        'Six iron beds, a nurse who has seen every kind of Circle injury there is, and a jar of sweets for anyone who yields politely. Clean, quiet, smells of liniment. Most of the bed frames have a name scratched underneath by somebody who spent a week in them.',
      artDirection:
        'A small old-fashioned infirmary with six white iron beds, tall windows, a glass jar of sweets on a desk, bottles of liniment, clean afternoon light. Calm and kind.',
      connections: [
        { to: 'the_circle', travelMinutes: 2, label: 'Out to the courtyard' },
        { to: 'long_hall', travelMinutes: 3, label: 'The corridor back to the hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_gate',
      name: 'The Lower Gate',
      shortName: 'The Gate',
      description:
        'The academy’s lower gate, iron and always open, with a bus shelter outside it on the town road. The last bus down leaves at ten. Students sent home at the full moon leave from here in the morning with their trunks, and everybody else finds a reason to be at a window.',
      artDirection:
        'A tall old iron gate standing open at the foot of a long drive, a small bus shelter with a timetable, a road winding down into a valley town at dusk, the gatehouse window above. Lonely, open, a threshold.',
      connections: [
        { to: 'guest_room', travelMinutes: 1, label: 'Up the outside steps to your room' },
        { to: 'the_circle', travelMinutes: 5, label: 'Up the drive to the courtyard' },
        { to: 'lantern_street', travelMinutes: 10, label: 'The road down to town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'lantern_street',
      name: 'Lantern Street',
      shortName: 'Town',
      description:
        'The one street of the market town below the academy: a noodle stall, a laundrette, a hardware shop, the bus stop and a tea house that serves students on condition they do not settle anything inside it. Humans pass through on the trade road, so nobody stares at you here, which after the hall is a strange relief.',
      artDirection:
        'A narrow small-town street at night strung with paper lanterns, a steaming noodle stall, a laundrette’s steamy window, a bus stop, a mix of human and animal-eared townsfolk. Cosy, glowing, ordinary.',
      connections: [{ to: 'the_gate', travelMinutes: 10, label: 'Back up the road to the academy' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_faculty',
      name: 'Ashgrove Faculty',
      description:
        'The staff who run the academy and keep the Circle’s rules: Coach Stagg, the nurse, the deans of each year. They admitted you, which half of them regret, and they stop a fight outside the chalk much faster than one inside it.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'On probation' },
        { atReputation: 25, label: 'A student here' },
        { atReputation: 50, label: 'Spoken for' },
        { atReputation: 75, label: 'One of the good ones' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_hill_pack',
      name: 'The Hill Pack',
      description:
        'The wolves’ den and the second-strongest at Ashgrove: thirty students who run the ridge at dawn and spar in pairs. Ruka Varn leads them. They respect anybody who stays on their feet, and they police the hall’s manners because somebody has to.',
      startingReputation: 0,
      ranks: [
        { atReputation: -20, label: 'Prey' },
        { atReputation: 0, label: 'Watched' },
        { atReputation: 25, label: 'Ran with us' },
        { atReputation: 50, label: 'Pack' },
      ],
      allies: ['faction_warren'],
      enemies: ['faction_sunward'],
    },
    {
      id: 'faction_sunward',
      name: 'Sunward House',
      description:
        'The lions’ den, with the bears and tigers who board with them. Old money, the first rank for most of the last century, and the house the clan council’s chair grew up in. They do not need to fight anybody. That is the whole point of them.',
      startingReputation: -10,
      ranks: [
        { atReputation: -30, label: 'Beneath notice' },
        { atReputation: 0, label: 'Noticed' },
        { atReputation: 25, label: 'Guest at the table' },
        { atReputation: 50, label: 'Friend of the house' },
      ],
      allies: ['faction_council'],
      enemies: ['faction_hill_pack'],
    },
    {
      id: 'faction_warren',
      name: 'The Warren',
      description:
        'The hares and rabbits: bottom of the Order and the fastest feet in the school. They run the courier loft, read every envelope by lamplight, and know where everybody is going before the person going there does.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Customer' },
        { atReputation: 25, label: 'Regular' },
        { atReputation: 50, label: 'One of the Warren' },
      ],
      allies: ['faction_hill_pack'],
      enemies: [],
    },
    {
      id: 'faction_council',
      name: 'The Clan Council',
      description:
        'The clans’ governing council in the city, chaired by Aurel Solenne, fifty-three, the Pride-Lord, who is Lio’s father. It pays the scholarships, voted to stop admitting humans thirty years ago, and is watching to see whether this one lasts the week. It writes letters in gold wax.',
      startingReputation: -15,
      ranks: [
        { atReputation: -40, label: 'An embarrassment' },
        { atReputation: -10, label: 'A question' },
        { atReputation: 20, label: 'A precedent' },
        { atReputation: 50, label: 'A policy' },
      ],
      allies: ['faction_sunward'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'ruka',
      name: 'Ruka Varn',
      role: 'Second on the Order, leader of the Hill Pack, and the wolf whose tray is on your table',
      cardBlurb:
        'She is second in the whole school, she has just challenged you in front of two hundred people, and she cares far more about how you stand than whether you win.',
      pronouns: 'she/her',
      publicTraits: [
        'Blunt to the point of rudeness',
        'Polices the hall’s manners because somebody has to',
        'Taps a table twice when she has decided something',
      ],
      hiddenDrives: [
        'When Lio roars, her knees go before her mind does. She has stepped in against him twice and yielded both times without being touched, and she wants to watch somebody who has never knelt',
        'She put her tray down because a newcomer who loses their first bout is claimed by the challenger’s den and ranked, and she would rather be hated by a human than watch one get sent home',
      ],
      values: ['Staying on your feet', 'Saying it to somebody’s face, in the hall, where everybody can hear'],
      fears: ['Kneeling in front of the whole school a third time', 'Being thought kind'],
      socialStyle:
        'Gets physically close, says three words, and waits. Watches feet and shoulders rather than faces. Never explains a decision after making it, and stands near somebody for a long time instead of asking them for anything.',
      boundaries: [
        'Will not fight outside the chalk, and walks away from a swing thrown in a corridor',
        'Will not let anybody else lean on the human, because that is her job',
        'Will not ask for help in words; she will stand near you until you offer',
      ],
      goals: [
        'Settle the human’s first bout before the hall decides what humans are',
        'Stay on her feet against Lio at the Moon Bout',
      ],
      secrets: [
        {
          id: 'ruka_the_roar',
          fact: 'She has stepped into the Circle against Lio twice and yielded both times before he touched her. Her body bares its throat to his roar and she cannot stop it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it on the ridge at dawn, without looking at the player, if they have stayed on their feet in front of her and never once mocked somebody for yielding.',
        },
        {
          id: 'ruka_the_lifeline',
          fact: 'She challenged the human because losing a first bout to her would put them on the Order at the bottom of the Hill Pack, which is the safest way for a human to still be here at the full moon.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Pim knows the rule and explains it to anybody who asks him why nobody else challenged the human first.',
        },
      ],
      speechStyle:
        'Short, blunt sentences that are always grammatical: she cuts the explanation, never the articles or verbs ("Pick a form, human," never "Pick form"). Calls the player "human" as if it were their name until she decides otherwise, and the day she uses their real name is an event. Never explains herself and never cites a rule number, which is Stagg’s job; repeats one word when she means it.',
      topics: ['the Circle', 'the Hill Pack', 'Lio', 'the ridge run', 'the full moon', 'why she put her tray down'],
      voiceSamples: [
        'Humans eat last. Stand up or get up.',
        'Again. You stayed on your feet. Nobody asked you to. Again.',
        'Don’t thank me. Somebody was going to put a tray down on you tonight, and I hit softer than the others.',
        'When he roars, my knees decide before I do. Yours didn’t. Show me how.',
      ],
      appearance:
        'An adult woman, tall and rangy, shaggy shoulder-length grey hair, grey wolf ears with a notch out of the left one and a thick grey wolf tail, pale gold eyes, a thin scar through her left eyebrow, a dark canvas training jacket with the sleeves torn off over a black athletic top, dark training trousers, and white tape wrapped round both hands.',
      visualHook: 'A training jacket with both sleeves torn off at the shoulder, and a notch bitten out of her left ear.',
      silhouette: 'Leaning in over a table on both fists, ears forward, shoulders up.',
      artSeed: 'pr-ruka-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'competitive', 'amused', 'warm', 'stung'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'hill_den', activity: 'in the bunk room with the rest of the pack' },
        { startMinute: 330, endMinute: 480, locationId: 'the_ridge', activity: 'running the ridge at dawn at the front of the pack' },
        { startMinute: 480, endMinute: 720, locationId: 'the_circle', activity: 'drilling holds with the second-years' },
        { startMinute: 720, endMinute: 780, locationId: 'long_hall', activity: 'lunch at the first table' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_circle', activity: 'sparring anybody who will step into the chalk' },
        { startMinute: 1080, endMinute: 1140, locationId: 'hill_den', activity: 'taping her hands with the kettle on' },
        { startMinute: 1140, endMinute: 1260, locationId: 'long_hall', activity: 'dinner at the first table, watching the door' },
        { startMinute: 1260, endMinute: 1380, locationId: 'the_circle', activity: 'night drills under the lanterns' },
        { startMinute: 1380, endMinute: 1440, locationId: 'hill_den', activity: 'back at the pack house, last one in' },
      ],
      homeLocationId: 'hill_den',
      knowledgeScope: ['the_circle', 'the_order', 'hill_pack', 'the_ridge', 'lio', 'the_yield'],
      startingRelationship: { trust: 10, affection: 5, respect: 15, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'ruka_says_why',
          label: 'She tells you why she put her tray down',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['first_night_over'] },
        },
        {
          id: 'ruka_asks',
          label: 'She asks you to show her how you stay standing',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_yield'] },
        },
        {
          id: 'ruka_close',
          label: 'She lets you close',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60 },
        },
      ],
      attributes: { might: 15, agility: 15, mind: 11, presence: 14, resolve: 14, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 9, tags: ['wolf', 'striker'] },
    },
    {
      id: 'lio',
      name: 'Lio Solenne',
      role: 'First on the Order for two years, heir to Sunward House, and the one person in the school nobody has ever touched',
      cardBlurb:
        'He is the first rank, every challenger he has ever faced knelt before reaching him, and you may be the one person here who will not, which would be the most interesting thing to happen to him in two years.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to a fault', 'Generous with things that cost him nothing', 'Visibly bored by being obeyed'],
      hiddenDrives: [
        'He has never been struck and does not know whether he is any good. He wants one real bout before he graduates, against somebody who does not kneel',
        'He is trying to work out how much of his father he has inherited, and is afraid the answer is most of it',
      ],
      values: ['Good manners as a kind of courage', 'Earning a thing rather than being handed it'],
      fears: ['That under the roar he is ordinary', 'That he is his father'],
      socialStyle:
        'Asks permission before sitting, before speaking, before touching a door handle. Turns his signet ring when he is thinking, and holds eye contact a beat too long, because nobody has ever held it back.',
      boundaries: [
        'Will not do his father’s dirty work himself, though he has not yet decided to stop it being done',
        'Will not strike anybody who has already yielded',
        'Will not pretend to have lost a bout he won, or won one he lost',
      ],
      goals: [
        'Get one real bout at the Moon Bout, against somebody who stays standing',
        'Decide what to do about his father’s letter before the full moon decides it for him',
      ],
      secrets: [
        {
          id: 'lio_the_letter',
          fact: 'His father has written asking him to see that the human is gone before the full moon. The letter is in his desk at Sunward House and he has read it nine times.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows it to the player himself at dinner at Sunward House, if they have been honest with him about something that cost them.',
        },
        {
          id: 'lio_trains_alone',
          fact: 'He trains alone in the empty Circle after midnight, badly, because he has never had a partner who did not yield in the first second.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who crosses the courtyard after midnight sees it.',
        },
      ],
      speechStyle:
        'Long, courtly sentences with a joke folded into the middle of them. Asks permission constantly, apologises for things that are not his fault, and uses the player’s name the moment he learns it, as if he has been waiting to.',
      topics: ['the Moon Bout', 'his father', 'Sunward House', 'the roar', 'what it is like to be first', 'the archive'],
      voiceSamples: [
        'Forgive me for staring. I have never met anybody who did not lower their eyes when I walked in, and I find I like it enormously.',
        'May I sit? You may say no. Almost nobody here does, which is rather the problem.',
        'Two years at the top of that wall, and not one person has ever actually laid a hand on me. It feels like being furniture.',
        'My father writes beautiful letters. This one asks me to see that you are gone before the moon is full. I have not decided what I think about that yet.',
      ],
      appearance:
        'An adult man, broad-shouldered and easy, a heavy gold mane of hair tied back at the neck with a plain black cord, round tawny lion ears and a tufted lion tail, amber eyes, a tailored charcoal college coat with the cuffs turned back once over a white shirt, and a gold lion signet ring on his right hand.',
      visualHook: 'A heavy gold mane tied back with a plain black cord, and a lion signet ring he turns while he thinks.',
      silhouette: 'Upright and unhurried, one hand in a pocket, chin slightly raised, standing in the middle of a room as if it were built around him.',
      artSeed: 'pr-lio-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'amused', 'surprised', 'conflicted', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'the_circle', activity: 'training alone by one lantern, badly' },
        { startMinute: 90, endMinute: 540, locationId: 'sunward_house', activity: 'in his rooms at Sunward House' },
        { startMinute: 540, endMinute: 720, locationId: 'the_archive', activity: 'reading in the archive window seat' },
        { startMinute: 720, endMinute: 780, locationId: 'long_hall', activity: 'lunch at the first table, briefly' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_circle', activity: 'on the bench by the chalk, holding court' },
        { startMinute: 1080, endMinute: 1320, locationId: 'sunward_house', activity: 'dinner at Sunward House, seven courses' },
        { startMinute: 1320, endMinute: 1440, locationId: 'sunward_house', activity: 'writing letters he does not send' },
      ],
      homeLocationId: 'sunward_house',
      knowledgeScope: ['sunward_house', 'the_order', 'the_clan_council', 'the_archive', 'the_roar'],
      startingRelationship: { trust: 25, affection: 20, respect: 20, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'lio_at_dinner',
          label: 'He tells you what he wants from a human',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['lio_invited'] },
        },
        {
          id: 'lio_asks_to_train',
          label: 'He asks you to train with him after midnight',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['saw_lio_train'] },
        },
        {
          id: 'lio_shows_the_letter',
          label: 'He shows you his father’s letter',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:lio_wants_a_real_bout'] },
        },
        {
          id: 'lio_close',
          label: 'He says what he wants without asking first',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 55, respect: 50 },
        },
      ],
      attributes: { might: 16, agility: 12, mind: 14, presence: 18, resolve: 11, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 75, defenseDc: 15, damage: 10, tags: ['lion', 'untested'] },
    },
    {
      id: 'pim',
      name: 'Pim Hollowell',
      role: 'Last on the Order, courier for the Warren, and the cheapest rank on the wall to take',
      cardBlurb:
        'The easiest way for you to get ranked is to beat him, and he has worked that out. He is last on the wall, he knows where everybody in the school is at every hour, and he would very much like you to need him instead.',
      pronouns: 'he/him',
      publicTraits: ['Talks faster than he runs, which is fast', 'Knows every schedule in the school', 'Cannot keep his ears still'],
      hiddenDrives: [
        'He is the first of his warren to get to college; his family sold their cart horse to pay his first term, and being sent home would mean telling them',
        'He has decided the safest thing to do about the human is to make himself too useful to beat',
      ],
      values: ['Delivering what he was paid to deliver, on time, unopened, mostly', 'Knowing things before anybody else does'],
      fears: ['Being sent home on the morning bus', 'Being the one the human beats to stay'],
      socialStyle:
        'Arrives with something in his hands, a bun or a note, so there is a reason for him to be there. Talks in a stream, stops dead when he has said too much, and then says one more thing.',
      boundaries: [
        'Will not carry a threat, whoever pays',
        'Will not lie to somebody who has paid him, though he will decline to answer',
        'Will not fight anybody, and yields the instant a bout starts',
      ],
      goals: ['Still be on the wall when the moon is full', 'Get the human to like him before the human does the arithmetic'],
      secrets: [
        {
          id: 'pim_the_arithmetic',
          fact: 'If the human challenges him and wins, they take his rank and he is left unranked and sent home. He is fairly sure the human has not worked this out yet.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He blurts it out himself the first time the player asks him how ranks actually change, and then looks horrified.',
        },
        {
          id: 'pim_the_seal',
          fact: 'He carried the gold-sealed letters up to Sunward House, one for Lio and one for Bryn Holt, and knows the seal is the Pride-Lord’s.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells anybody who has paid him for a delivery and asks who else got post this week.',
        },
      ],
      speechStyle:
        'A courier’s breathless run-on: numbers, room names and times to the minute, three facts per sentence joined with "and". Says "right, so" before any explanation, and introduces himself by his rank.',
      topics: ['the courier loft', 'who sent what to whom', 'the stairs', 'the bottom of the wall', 'honey buns', 'how ranks change'],
      voiceSamples: [
        'Pim. Two-eleven. Bottom of the wall. Hi. The bun is free, the gossip costs.',
        'Right, so, four stairs in the main building and you want the south one after dark, and before you ask how I know, I deliver to everyone and I read envelopes.',
        'If you put your tray on my table you win, obviously, look at me, and then I’m unranked and on the morning bus. So please, please don’t.',
        'Gold wax, lion seal, ten o’clock post, two of them. I didn’t open either. I want that on record. I held them up to the lamp a bit.',
      ],
      appearance:
        'An adult man, lean and quick, messy chestnut-brown hair, long brown rabbit ears with a brass courier’s tag clipped through the tip of the left one, dark brown eyes, ink on every finger, a mustard scarf wound three times round his neck, and a heavy courier’s satchel slung across his chest, stuffed with envelopes.',
      visualHook: 'A brass courier’s tag clipped through the tip of his left ear, which flashes whenever the ear turns.',
      silhouette: 'Mid-stride, satchel swinging, ears up and swivelling in two different directions.',
      artSeed: 'pr-pim-01',
      portrait: null,
      expressions: ['neutral', 'nervous', 'eager', 'surprised', 'worried', 'grinning'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_warren', activity: 'in a hammock in the courier loft' },
        { startMinute: 360, endMinute: 540, locationId: 'lantern_street', activity: 'collecting the morning post from town' },
        { startMinute: 540, endMinute: 720, locationId: 'the_warren', activity: 'sorting the post into pigeonholes' },
        { startMinute: 720, endMinute: 780, locationId: 'long_hall', activity: 'selling honey buns at the kitchen hatch' },
        { startMinute: 780, endMinute: 1140, locationId: 'the_circle', activity: 'running notes between every den' },
        { startMinute: 1140, endMinute: 1200, locationId: 'the_warren', activity: 'sorting the evening post' },
        { startMinute: 1200, endMinute: 1320, locationId: 'long_hall', activity: 'eating last, at the last table' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_warren', activity: 'reading envelopes by lamplight' },
      ],
      homeLocationId: 'the_warren',
      knowledgeScope: ['the_warren', 'the_order', 'who_sent_what', 'the_stairs', 'every_schedule'],
      startingRelationship: { trust: 30, affection: 30, respect: 10, fear: 20, rivalry: 0 },
      gates: [
        {
          id: 'pim_the_post',
          label: 'He tells you who has been writing to whom',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['pim_came_round'] },
        },
        {
          id: 'pim_the_pact',
          label: 'He offers you a place in the Warren',
          kind: 'ALLIANCE',
          requires: { trust: 50, affection: 40 },
        },
      ],
      attributes: { might: 8, agility: 17, mind: 14, presence: 12, resolve: 9, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 25, defenseDc: 12, damage: 2, tags: ['hare', 'untrained'] },
    },
    {
      id: 'stagg',
      name: 'Halvard Stagg',
      calledName: 'Stagg',
      role: 'Combat coach and referee of the Circle. Everybody calls him Coach Stagg',
      cardBlurb:
        'He chalks the ring, counts the pin and stops the bout, all of it exactly by the rules whoever you are. He is also, for reasons he will not give you, the reason you were admitted.',
      pronouns: 'he/him',
      publicTraits: ['Quotes the rules by number', 'Calls students by their rank rather than their name', 'Has never once raised his voice'],
      hiddenDrives: [
        'Thirty years ago he saw who was waiting at the bottom of the north stair and said nothing, and he has refereed every bout since as if that could balance it',
        'He pushed the Faculty to admit a human again, and needs this one to still be here at the full moon more than he can say',
      ],
      values: ['The rules, applied the same to everybody', 'Stopping a bout one second early rather than one second late'],
      fears: ['Being right about what is going to happen this week', 'Being thanked'],
      socialStyle:
        'Stands still and lets other people fill the silence. Answers questions with a rule number. The only person in the school who looks the player in the eye without it being a contest.',
      boundaries: [
        'Will not bend a rule for anybody, the player included',
        'Will not leave a bout unrefereed, or referee one he has a stake in',
        'Will not say the name scratched off the old Order until somebody says it to him first',
      ],
      goals: ['Get the human through seven nights in one piece', 'See the Moon Bout refereed properly, once'],
      secrets: [
        {
          id: 'stagg_the_stair',
          fact: 'Thirty years ago, as a student, he saw Garrow Holt waiting at the bottom of the north stair the night Edda Marsh fell. He told nobody, because the lions owned the hall and he wanted to stay on the wall.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it in the empty Circle after a bout, if the player says Edda Marsh’s name to him and asks what he saw rather than what happened.',
        },
        {
          id: 'stagg_the_pencil',
          fact: 'He wrote the pencilled line under the seal of the player’s admission letter, and he is the reason the Faculty voted to admit a human again.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who shows him the letter and asks whose initials those are gets a very long silence and then the truth.',
        },
      ],
      speechStyle:
        'Rule numbers and short declaratives. Refers to students by rank, "Two" or "Unranked", never by name. Never asks a question he does not need answered, and never adds a second sentence where one will do.',
      topics: ['the rules', 'the four forms', 'the Circle', 'the Moon Bout', 'thirty years ago', 'the infirmary'],
      voiceSamples: [
        'Rule four. The one challenged names the form. Name it.',
        'Two. Unranked. In the ring. Everybody else, behind the chalk.',
        'The Circle does not care what you are. It cares who is still inside the line when I stop counting.',
        'I chalk it, I count it, I stop it. Once I should have stopped something and did not. I have refereed every bout since.',
      ],
      appearance:
        'An older man, lean and weathered, close-cropped grey hair and a short grey beard, deer ears, one antler whole and branching and the other broken off short, steady dark eyes, a grey coaching jacket buttoned to the throat, a whistle on a cord he never blows, and a stick of chalk always between his fingers.',
      visualHook: 'One antler whole and branching, the other broken off short a hand’s width above his head.',
      silhouette: 'Standing dead still at the edge of the chalk, hands behind his back, head tilted by the weight of one antler.',
      artSeed: 'pr-stagg-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'watchful', 'grave', 'regretful'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_circle', activity: 'in his room off the courtyard, light still on' },
        { startMinute: 330, endMinute: 480, locationId: 'the_ridge', activity: 'walking the ridge course, checking the cairns' },
        { startMinute: 480, endMinute: 1080, locationId: 'the_circle', activity: 'coaching in the courtyard' },
        { startMinute: 1080, endMinute: 1140, locationId: 'infirmary', activity: 'checking on the day’s injured' },
        { startMinute: 1140, endMinute: 1440, locationId: 'the_circle', activity: 'chalking the ring and refereeing the night bouts' },
      ],
      homeLocationId: 'the_circle',
      knowledgeScope: ['the_rules', 'the_circle', 'edda_marsh', 'the_north_stair', 'the_faculty'],
      startingRelationship: { trust: 20, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'stagg_the_rules',
          label: 'He tells you the rules nobody tells newcomers',
          kind: 'TRUST',
          requires: { respect: 30 },
        },
        {
          id: 'stagg_says_her_name',
          label: 'He tells you about Edda Marsh',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:the_old_name'] },
        },
      ],
      attributes: { might: 13, agility: 12, mind: 15, presence: 14, resolve: 17, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 17, damage: 8, tags: ['veteran', 'referee'] },
    },
    {
      id: 'fenn',
      name: 'Fenn Asari',
      role: 'Bookmaker. Runs the odds on every bout in the school from the boiler room',
      cardBlurb:
        'She has you at forty to one against anybody, she will pay you good money to lose at the right moment, and she owns an old ledger that could change how you see this whole school.',
      pronouns: 'she/her',
      publicTraits: ['Charming in a way that is clearly a business expense', 'Never forgets a debt, hers or yours', 'Laughs at her own odds'],
      hiddenDrives: [
        'She owes Sunward House more than a season’s book will cover, and wants out from under them before she graduates',
        'Her grandmother’s ledger has a page in it she has never shown anybody, and keeping it shut has started to feel like being part of it',
      ],
      values: ['A fair price, stated up front', 'Paying out on time, every time'],
      fears: ['Sunward House calling in what she owes', 'Being the third generation of her family to know and say nothing'],
      socialStyle:
        'Talks while counting coins, makes every conversation a negotiation, and gives the real answer as an aside once the price has been agreed.',
      boundaries: [
        'Will not bet against herself, or fix a bout she is taking money on without saying so',
        'Will not sell the ledger, at any price',
        'Will not cross Sunward House in public',
      ],
      goals: ['Make a fortune on the human’s first week, one way or the other', 'Get clear of what she owes the lions'],
      secrets: [
        {
          id: 'fenn_the_ledger',
          fact: 'Her grandmother kept the hall’s boilers and ran the book from them thirty years ago, and she kept a ledger. One page records a single very large bet the night before Edda Marsh fell, "Marsh does not fight", in Garrow Holt’s name and paid with Sunward money.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She opens it for somebody she trusts who has turned down at least one of her offers, or for somebody who simply lifts it from the tin under her desk.',
        },
        {
          id: 'fenn_the_debt',
          fact: 'She owes Sunward House the better part of a year’s fees from a season she misread, and Bryn Holt is the one who collects.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if the player notices out loud that she never takes bets on lions.',
        },
      ],
      speechStyle:
        'A bookmaker’s patter: odds, prices and fractions, "darling" as punctuation, a number in nearly every sentence. Goes quiet and slow, with no numbers at all, on the rare occasions she means something.',
      topics: ['the odds', 'the book', 'her grandmother', 'Sunward House', 'what everything costs', 'the first bout'],
      voiceSamples: [
        'Forty to one against you, darling, and that is me being sentimental.',
        'Everything at this school has a price, and most of them are on my board in chalk.',
        'Lose to the wolf in the third minute, not the first, and I’ll pay your laundry for a term.',
        'My grandmother kept a book too. Hers has a page in it I’ve never shown anybody, and it isn’t for sale. Probably.',
      ],
      appearance:
        'An adult woman, wiry and sharp-featured, sandy-blonde hair cut in a short bob, enormous pale fennec ears with a pencil tucked behind each one, a bushy cream fox tail, green eyes, a striped shirt with rolled sleeves under a waistcoat with chalk dust down the front, and a silver coin always walking across her knuckles.',
      visualHook: 'A silver coin that walks endlessly across her knuckles, one hand to the other, while she talks.',
      silhouette: 'Perched on the edge of a crate with one leg crossed, leaning forward, ears enormous against the boiler light.',
      artSeed: 'pr-fenn-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'calculating', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'boiler_room', activity: 'on a camp bed behind the boiler' },
        { startMinute: 540, endMinute: 720, locationId: 'lantern_street', activity: 'laying off bets in town' },
        { startMinute: 720, endMinute: 780, locationId: 'long_hall', activity: 'chalking up the lunchtime odds by the hatch' },
        { startMinute: 780, endMinute: 1140, locationId: 'the_circle', activity: 'taking bets on the bench' },
        { startMinute: 1140, endMinute: 1320, locationId: 'boiler_room', activity: 'counting the evening book' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_circle', activity: 'taking bets on the night bouts' },
      ],
      homeLocationId: 'boiler_room',
      knowledgeScope: ['the_book', 'the_odds', 'sunward_house', 'the_old_ledger', 'every_bout'],
      startingRelationship: { trust: 15, affection: 15, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'fenn_opens_the_book',
          label: 'She opens her grandmother’s ledger for you',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:the_book'] },
        },
        {
          id: 'fenn_partners',
          label: 'She cuts you in on the book',
          kind: 'ALLIANCE',
          requires: { trust: 40, respect: 40 },
        },
      ],
      attributes: { might: 8, agility: 14, mind: 17, presence: 15, resolve: 10, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 28, defenseDc: 13, damage: 3, tags: ['fox', 'untrained'] },
    },
    {
      id: 'bryn',
      name: 'Bryn Holt',
      role: 'Fourth on the Order, Lio’s den second, and the one who keeps the door at Sunward House',
      cardBlurb:
        'She is the strongest person you have ever met and the gentlest-spoken, she owes Sunward House everything she has, and somebody has written asking her to make sure you are gone before the full moon.',
      pronouns: 'she/her',
      publicTraits: ['Enormously strong and careful with it', 'Apologises to furniture', 'Studies harder than anybody in the school'],
      hiddenDrives: [
        'Her father told her what he did on the north stair thirty years ago when she took the Sunward scholarship, and she has been waiting ever since to find out whether she is the same',
        'She hopes, without admitting it to herself, that somebody stops her',
      ],
      values: ['Paying what she owes', 'Not hurting anybody who cannot hurt her back'],
      fears: ['Being exactly as big as her father', 'Lio finding out what she has been asked to do'],
      socialStyle:
        'Speaks only after everybody else has, in a voice much softer than her size. Takes up as little room as possible, which is still a great deal of room.',
      boundaries: [
        'Will not hurt anybody in front of a witness',
        'Will not lie to Lio, though she has not told him everything',
        'Will not fight in the Circle against anybody ranked below fortieth; it is not a fair contest and she knows it',
      ],
      goals: ['Keep her scholarship', 'Get through the full moon without becoming her father'],
      secrets: [
        {
          id: 'bryn_the_letter',
          fact: 'The Pride-Lord, who pays her fees, has written asking her to see that the human is not on the Order by the full moon, "without involving my son".',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She warns the player in her own way, "go the other way tonight", the first time they are kind to her without wanting anything.',
        },
        {
          id: 'bryn_her_father',
          fact: 'Her father, Garrow Holt, was the one waiting at the bottom of the north stair the night Edda Marsh fell, on Aurel Solenne’s word. He told her when she took the scholarship, so she would understand what the Holts owe.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it on the north stair itself, if the player meets her there in the dark and neither runs nor fights.',
        },
      ],
      speechStyle:
        'Slow and quiet, very few words, every sentence finished properly. Says please and sorry more than anybody else in the school, and states hard things plainly because she has never learned how to soften them.',
      topics: ['Sunward House', 'her scholarship', 'her father', 'the north stair', 'Lio', 'what she owes'],
      voiceSamples: [
        'Go the other way tonight. Please.',
        'I owe the lions my fees, my boots and the roof I sleep under. I keep a list. It’s long.',
        'My father was big too. People always thought that meant he was the one deciding things.',
        'I can lift anything in this school. I’m finding out there are things I can’t carry.',
      ],
      appearance:
        'An adult woman, head and shoulders above everybody, broad and solid, dark brown hair in a thick low braid, round dark bear ears, warm brown eyes, small wire reading glasses on her nose, and a plain dark knit sweater with a scholarship crest stitched on the sleeve.',
      visualHook: 'Tiny wire reading glasses perched on an enormous frame, and a scholarship crest sewn on her sleeve.',
      silhouette: 'Filling a doorway completely, shoulders hunched to make herself smaller, hands folded in front.',
      artSeed: 'pr-bryn-01',
      portrait: null,
      expressions: ['neutral', 'worried', 'troubled', 'sorry', 'resolved'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'sunward_house', activity: 'in the small room by the front door' },
        { startMinute: 360, endMinute: 540, locationId: 'the_circle', activity: 'lifting stones in the courtyard at dawn' },
        { startMinute: 540, endMinute: 720, locationId: 'the_archive', activity: 'studying at the long table' },
        { startMinute: 720, endMinute: 780, locationId: 'long_hall', activity: 'lunch at the first table, saying nothing' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_circle', activity: 'sparring the Sunward second-years' },
        { startMinute: 1080, endMinute: 1440, locationId: 'sunward_house', activity: 'keeping the door at Sunward House' },
      ],
      homeLocationId: 'sunward_house',
      knowledgeScope: ['sunward_house', 'the_north_stair', 'garrow_holt', 'lio', 'the_scholarship'],
      startingRelationship: { trust: 15, affection: 15, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'bryn_warns_you',
          label: 'She tells you to go the other way',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:the_order'] },
        },
        {
          id: 'bryn_steps_aside',
          label: 'She steps aside on the stair',
          kind: 'TRUST',
          requires: { respect: 40, flagsSet: ['stair_lamp_out'] },
        },
        {
          id: 'bryn_her_father_gate',
          label: 'She tells you what her father did',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:edda_marsh'] },
        },
      ],
      attributes: { might: 20, agility: 9, mind: 15, presence: 11, resolve: 12, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 95, defenseDc: 15, damage: 13, tags: ['bear', 'grappler'] },
    },
  ],
  quests: [
    {
      id: 'q_the_tray',
      title: 'Stand Up or Get Up',
      summary: 'The second-ranked student in the school has put her tray down on your table in front of everyone, and the whole hall is waiting for your answer.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ruka', 'stagg', 'pim'],
      involvedLocationIds: ['long_hall', 'the_circle'],
      knownRewardCopy: 'A place in the hall, or at least an idea of what one costs.',
      steps: [
        {
          id: 'answer_the_tray',
          playerCopy: 'Answer Ruka’s challenge: name a form, talk your way round it, or walk to the back of the line.',
          directorNotes:
            'Every answer is a real one and none of them is wrong. Naming a form takes the two of them out to the Circle, where Coach Stagg chalks the ring. Talking turns it into a negotiation she is not used to and is quietly impressed by. Walking away is allowed and costs face, not the story. Ruka is not cruel about any of it: she is blunt, she is watching how the player stands, and she taps the table twice when she has decided something. If the player swings at her in the hall, she steps back out of reach and says "Not here. Chalk."',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'named_the_stare',
              label: 'Pick the Stare',
              predicate: { flagsSet: ['used:hold_the_stare'] },
              setsFlags: ['faced_ruka', 'chose_the_stare'],
              closesFlags: ['refused_the_tray'],
            },
            {
              routeId: 'named_the_hold',
              label: 'Pick the Hold and wrestle her',
              predicate: { flagsSet: ['used:get_inside'] },
              setsFlags: ['faced_ruka', 'chose_the_hold'],
              closesFlags: ['refused_the_tray'],
            },
            {
              routeId: 'named_the_run',
              label: 'Pick the Run and take her up the ridge',
              predicate: { flagsSet: ['used:outlast'] },
              setsFlags: ['faced_ruka', 'chose_the_run'],
              closesFlags: ['refused_the_tray'],
            },
            {
              routeId: 'named_the_strike',
              label: 'Pick the Strike and stay out of her reach',
              predicate: { flagsSet: ['used:stay_out_of_reach'] },
              setsFlags: ['faced_ruka', 'chose_the_strike'],
              closesFlags: ['refused_the_tray'],
            },
            {
              routeId: 'talked_terms',
              label: 'Ask what you get if you win, and bargain',
              predicate: { flagsSet: ['used:talk_it_down'] },
              setsFlags: ['talked_terms'],
              closesFlags: [],
            },
            {
              routeId: 'bluffed_her',
              label: 'Pretend you have done this a hundred times',
              predicate: { flagsSet: ['used:poker_face'] },
              setsFlags: ['bluffed_ruka', 'faced_ruka'],
              closesFlags: ['refused_the_tray'],
            },
            {
              routeId: 'walked_to_the_back',
              label: 'Pick up your bowl and go to the back of the line',
              predicate: { flagsSet: ['used:walk_away'] },
              setsFlags: ['refused_the_tray'],
              closesFlags: ['faced_ruka'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:the_order'],
            abilities: [],
            reputation: [{ factionId: 'faction_warren', amount: 5 }],
          },
        },
        {
          id: 'the_first_bout',
          playerCopy: 'Get through your first night at Ashgrove, in the chalk or out of it.',
          directorNotes:
            'If the player named a form, this is the bout itself, refereed by Stagg in the courtyard with every window full. Keep it legible: distance, grip, breath, who is still inside the chalk. The human edge is real and specific: no tells, no yield instinct, endurance. Losing is not failure: a newcomer who loses their first bout is claimed by the challenger’s den and goes on the Order at the bottom of it, and Ruka does not explain that this is why she chose them. If the player keeps getting up, Stagg stops it himself under rule nine, and the hall remembers. If the player refused, the night simply ends with them eating last, and the hall decides what humans are without them.',
          enterWhen: { flagsSet: ['knows:the_order'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_her',
              label: 'Beat her',
              predicate: {
                flagsSet: ['faced_ruka'],
                atLocation: 'the_circle',
                minRelationship: [{ characterId: 'ruka', dimension: 'respect', value: 50 }],
              },
              setsFlags: ['beat_ruka', 'ranked'],
              closesFlags: [],
            },
            {
              routeId: 'kept_getting_up',
              label: 'Lose, and keep getting back up until Stagg stops it',
              predicate: { flagsSet: ['faced_ruka', 'used:get_back_up'], atLocation: 'the_circle' },
              setsFlags: ['stagg_stopped_it', 'the_hall_saw_you_stand', 'claimed_by_the_pack', 'ranked'],
              closesFlags: [],
            },
            {
              routeId: 'lost_to_her',
              label: 'Lose to her in the chalk',
              predicate: { flagsSet: ['faced_ruka', 'engaged:ruka'], atLocation: 'the_circle' },
              setsFlags: ['claimed_by_the_pack', 'ranked'],
              closesFlags: [],
            },
            {
              routeId: 'put_it_off',
              label: 'Talk her into postponing it',
              predicate: { flagsSet: ['talked_terms', 'spoke:ruka'] },
              setsFlags: ['bout_owed'],
              closesFlags: [],
            },
            {
              routeId: 'never_stepped_in',
              label: 'Eat last and let the night end',
              predicate: { flagsSet: ['refused_the_tray'] },
              setsFlags: ['tail_down'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [
              { factionId: 'faction_faculty', amount: 5 },
              { factionId: 'faction_hill_pack', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_seven_nights',
      title: 'Seven Nights to the Full Moon',
      summary: 'Anyone not on the Order when the moon is full is sent home on the morning bus, and you are not on it yet.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_order'] },
      involvedCharacterIds: ['pim', 'stagg', 'ruka'],
      involvedLocationIds: ['long_hall', 'the_circle', 'the_warren', 'the_ridge'],
      knownRewardCopy: 'A wooden token with a number on it, and a reason to stay.',
      steps: [
        {
          id: 'get_on_the_order',
          playerCopy: 'Get your name painted on the wall before the full moon.',
          directorNotes:
            'There are several honest ways onto the wall and the cheapest one is cruel: beating Pim takes his rank and sends him home in your place, and he knows it. Do not hide that from a player who asks how ranks change. The Warren can also vouch for somebody, which almost nobody remembers is in the rules, and a Run on the ridge is the one form where a human is favoured. Keep the days ticking: somebody in the hall counts down to the moon out loud.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_the_first',
              label: 'Your first bout already put you on the wall',
              predicate: { flagsSet: ['ranked'] },
              setsFlags: ['on_the_order'],
              closesFlags: [],
            },
            {
              routeId: 'took_pims_place',
              label: 'Put your tray on Pim’s table and take his rank',
              predicate: { flagsSet: ['used:lay_down_a_tray', 'spoke:pim'], atLocation: 'long_hall' },
              setsFlags: ['on_the_order', 'sent_pim_down'],
              closesFlags: ['pim_pact'],
            },
            {
              routeId: 'challenged_up',
              label: 'Challenge somebody ranked and win in the chalk',
              predicate: { flagsSet: ['used:lay_down_a_tray'], atLocation: 'the_circle' },
              setsFlags: ['on_the_order', 'climbed_the_wall'],
              closesFlags: [],
            },
            {
              routeId: 'the_warren_vouched',
              label: 'Get the Warren to vouch for you',
              predicate: {
                flagsSet: ['spoke:pim'],
                minRelationship: [{ characterId: 'pim', dimension: 'trust', value: 50 }],
                minFactionReputation: [{ factionId: 'faction_warren', value: 25 }],
              },
              setsFlags: ['on_the_order', 'pim_pact'],
              closesFlags: [],
            },
            {
              routeId: 'ran_the_ridge',
              label: 'Challenge somebody to the Run and outlast them on the ridge',
              predicate: { flagsSet: ['used:outlast'], atLocation: 'the_ridge' },
              setsFlags: ['on_the_order', 'ran_the_ridge'],
              closesFlags: [],
            },
          ],
          deadlineWorldMinute: MOON_COUNT,
          rewards: {
            xp: 80,
            items: [{ itemId: 'rank_token', qty: 1 }],
            flags: ['ranked_by_the_moon'],
            abilities: [],
            reputation: [
              { factionId: 'faction_faculty', amount: 10 },
              { factionId: 'faction_council', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_what_ruka_wants',
      title: 'Why She Put Her Tray Down',
      summary: 'Ruka could have challenged anybody. She chose the human, on the first night, and she has not said why.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['first_night_over'] },
      involvedCharacterIds: ['ruka', 'lio', 'pim'],
      involvedLocationIds: ['hill_den', 'the_ridge', 'the_circle'],
      knownRewardCopy: 'The real reason, and something only you can give her.',
      steps: [
        {
          id: 'find_out_why',
          playerCopy: 'Find out why Ruka chose you.',
          directorNotes:
            'Two truths, and she will never volunteer either. Losing to her put the player on the wall under the Hill Pack, which was the point. And she has knelt to Lio’s roar twice without being touched, and has been watching the one person in the school who has no instinct to kneel. She says it on the ridge at dawn without looking at the player, or the player reads it on her the first time Lio walks into a room she is in, or Pim simply explains the rule. She hates being thought kind.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you on the ridge',
              predicate: {
                flagsSet: ['spoke:ruka'],
                minRelationship: [{ characterId: 'ruka', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:the_yield'],
              closesFlags: [],
            },
            {
              routeId: 'read_it_on_her',
              label: 'Watch her ears when Lio walks in',
              predicate: {
                flagsSet: ['used:read_the_ears', 'met:lio'],
                minRelationship: [{ characterId: 'ruka', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['knows:the_yield'],
              closesFlags: [],
            },
            {
              routeId: 'pim_told_you',
              label: 'Ask Pim how first bouts work',
              predicate: {
                flagsSet: ['spoke:pim'],
                minRelationship: [{ characterId: 'pim', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:the_yield'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: ['knows:what_ruka_wants'],
            abilities: ['teach_the_stand'],
            reputation: [{ factionId: 'faction_hill_pack', amount: 5 }],
          },
        },
        {
          id: 'the_lesson',
          playerCopy: 'Decide what to do with what she told you.',
          directorNotes:
            'The player can teach her: stand in front of her and roar, badly, for an hour every night until her knees stop deciding for her. It is funny, then it is not, then it works. Or they can use it: challenge her in the chalk in front of Lio, knowing what he will do, and take her rank. That is allowed, it works, and the Hill Pack never forgets it. Or they can leave her to it, which is also a choice she will notice.',
          enterWhen: null,
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'taught_her',
              label: 'Teach her to stand through the roar',
              predicate: {
                flagsSet: ['used:teach_the_stand'],
                minRelationship: [{ characterId: 'ruka', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['ruka_can_stand'],
              closesFlags: [],
            },
            {
              routeId: 'used_it_on_her',
              label: 'Challenge her with Lio watching, knowing what he will do',
              predicate: { flagsSet: ['used:lay_down_a_tray', 'knows:what_ruka_wants'], atLocation: 'the_circle' },
              setsFlags: ['used_her_secret', 'ruka_betrayed'],
              closesFlags: [],
            },
            {
              routeId: 'kept_out_of_it',
              label: 'Leave it to her',
              predicate: { flagsSet: ['knows:what_ruka_wants', 'moon_bout_night'] },
              setsFlags: ['refused_ruka'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['ruka_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_hill_pack', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_prince',
      title: 'The Prince Who Has Never Been Hit',
      summary: 'Lio Solenne has been first for two years without anybody laying a hand on him, and he has started looking at you as if you might be the first.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['first_night_over'] },
      involvedCharacterIds: ['lio', 'bryn', 'ruka'],
      involvedLocationIds: ['sunward_house', 'the_circle', 'the_archive'],
      knownRewardCopy: 'The Moon Bout, and what the first rank is actually like up close.',
      steps: [
        {
          id: 'dinner_at_sunward',
          playerCopy: 'Find out what Lio wants from the only person who will not kneel to him.',
          directorNotes:
            'He invites the player to dinner at Sunward House with a cream card in beautiful handwriting. He is courteous, funny and very lonely, and what he wants is one real bout before he graduates. He also has a letter from his father asking him to see the human gone, and he has not decided what to do about it. He is not the villain of this story and must never be written as one. Bryn keeps the door and says almost nothing.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_asked_you',
              label: 'Let him tell you over dinner',
              predicate: {
                flagsSet: ['spoke:lio'],
                minRelationship: [{ characterId: 'lio', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:lio_wants_a_real_bout'],
              closesFlags: [],
            },
            {
              routeId: 'read_him',
              label: 'Read it on him',
              predicate: { flagsSet: ['used:read_the_ears', 'spoke:lio'] },
              setsFlags: ['knows:lio_wants_a_real_bout'],
              closesFlags: [],
            },
            {
              routeId: 'bryn_warned_you',
              label: 'Hear it from Bryn at the door',
              predicate: {
                flagsSet: ['spoke:bryn'],
                minRelationship: [{ characterId: 'bryn', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['bryn_warned'],
              closesFlags: [],
            },
            {
              routeId: 'never_went_to_dinner',
              label: 'Let the full moon arrive without asking',
              predicate: { flagsSet: ['moon_bout_night'] },
              setsFlags: [],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: ['knows:the_pride_wants_you_gone'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_moon_bout',
          playerCopy: 'Be in the courtyard on the night of the full moon.',
          directorNotes:
            'The only night the first rank can be challenged. Lio roars and, as always, every challenger kneels. The question is whether anybody does not. If the player stands in front of him and does not look away, it is the first time in two years anybody has, and he is delighted even as he loses or wins. If Ruka has learned to stand, she stands, and the whole school sees it. Nobody is badly hurt. Stagg referees. The point is not who wins: it is that somebody finally touched him.',
          enterWhen: null,
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_stood_against_him',
              label: 'Step into the chalk against Lio and do not look away',
              predicate: { flagsSet: ['moon_bout_night', 'used:hold_the_stare', 'on_the_order'], atLocation: 'the_circle' },
              setsFlags: ['you_faced_lio', 'lio_was_hit'],
              closesFlags: [],
            },
            {
              routeId: 'ruka_stood_against_him',
              label: 'Watch Ruka stay on her feet through the roar',
              predicate: { flagsSet: ['moon_bout_night', 'ruka_can_stand'], atLocation: 'the_circle' },
              setsFlags: ['ruka_faced_lio', 'lio_was_hit'],
              closesFlags: [],
            },
            {
              routeId: 'nobody_stood',
              label: 'Let the night pass with the prince untouched',
              predicate: { flagsSet: ['moon_bout_night', 'moon_count_read'] },
              setsFlags: ['lio_unbeaten'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['moon_bout_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_sunward', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_north_stair',
      title: 'The North Stair',
      summary: 'The lamp on the north stair has gone out again, and somebody large is standing at the bottom of it in the dark.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['stair_lamp_out'] },
      involvedCharacterIds: ['bryn', 'pim', 'stagg'],
      involvedLocationIds: ['north_stair', 'long_hall', 'the_archive'],
      knownRewardCopy: 'A way past the stair, and maybe a way past what is waiting on it.',
      steps: [
        {
          id: 'the_dark_stair',
          playerCopy: 'Get past the north stair tonight, one way or another.',
          directorNotes:
            'Bryn has been asked to see the human gone, and she has come to the stair because that is where it was done thirty years ago. She cannot go through with it. She is waiting for somebody to give her a reason not to, and almost any honest word will do. No one falls, and nobody is seriously hurt on the stair whatever happens. A player who read the pencilled line on their letter can simply take the south stair, and that is a perfectly good answer too.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_south_stair',
              label: 'Do what the pencilled line says and take the south stair',
              predicate: { flagsSet: ['inspected:admission_letter'] },
              setsFlags: ['avoided_the_stair'],
              closesFlags: [],
            },
            {
              routeId: 'talked_bryn_down',
              label: 'Stop on the stair and talk to her',
              predicate: {
                flagsSet: ['spoke:bryn', 'visited:north_stair'],
                minRelationship: [{ characterId: 'bryn', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['bryn_stood_down'],
              closesFlags: [],
            },
            {
              routeId: 'brought_a_witness',
              label: 'Bring Pim, so there is somebody watching',
              predicate: {
                flagsSet: ['spoke:pim', 'visited:north_stair'],
                minRelationship: [{ characterId: 'pim', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['bryn_stood_down', 'pim_saw_her'],
              closesFlags: [],
            },
            {
              routeId: 'fought_on_the_stair',
              label: 'Go at her first',
              predicate: { flagsSet: ['attacked:bryn'] },
              setsFlags: ['fought_bryn'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['stair_answered', 'knows:the_north_stair'],
            abilities: [],
            reputation: [{ factionId: 'faction_warren', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_old_order',
      title: 'The Name Under the Varnish',
      summary: 'Thirty years ago a human climbed to seventh, fell on the north stair, and had her name scratched off the board.',
      kind: 'LEAD',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_old_name'] },
      involvedCharacterIds: ['stagg', 'fenn', 'bryn', 'lio'],
      involvedLocationIds: ['the_archive', 'boiler_room', 'north_stair', 'long_hall'],
      knownRewardCopy: 'Who she was, and who was waiting at the bottom of the stair.',
      steps: [
        {
          id: 'who_she_was',
          playerCopy: 'Find out whose name was scratched off the old Order.',
          directorNotes:
            'Edda Marsh, human, twenty-one, seventh on the Order. The night before she was due to challenge Aurel Solenne, Garrow Holt, his den second and Bryn’s father, was waiting on the north stair. Stagg saw and said nothing. Fenn’s grandmother took a single huge bet that night in Holt’s name. Each source holds a piece: the photograph has her face, the ledger has the bet, Stagg has what he saw. Do not deliver all of it at once.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stagg_told_you',
              label: 'Ask Stagg what he saw',
              predicate: {
                flagsSet: ['spoke:stagg'],
                minRelationship: [{ characterId: 'stagg', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:edda_marsh', 'stagg_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'the_photograph',
              label: 'Find her face in the old year photograph',
              predicate: { hasItems: ['year_photograph'] },
              setsFlags: ['knows:edda_marsh'],
              closesFlags: [],
            },
            {
              routeId: 'the_ledger',
              label: 'Find the bet in the old ledger',
              predicate: { hasItems: ['old_ledger'] },
              setsFlags: ['knows:edda_marsh'],
              closesFlags: [],
            },
            {
              routeId: 'fenn_read_it_to_you',
              label: 'Let Fenn read the page to you',
              predicate: { flagsSet: ['fenn_opened_the_book'] },
              setsFlags: ['knows:edda_marsh'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:who_was_on_the_stair'],
            abilities: ['read_the_old_order'],
            reputation: [],
          },
        },
        {
          id: 'what_to_do_with_it',
          playerCopy: 'Decide who gets to know what happened on the stair.',
          directorNotes:
            'Reading it out in the Long Hall, under the painted Order, changes the school: the Faculty has to answer for it and the Council loses face. Taking it to Lio privately changes Lio, who has to decide what kind of son to be. Keeping it quiet protects Bryn, who did not do it, and Stagg, who did nothing. All three are defensible and none is rewarded over the others.',
          enterWhen: null,
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_it_to_lio',
              label: 'Take it to Lio, privately, at Sunward House',
              predicate: { flagsSet: ['used:read_the_old_order', 'spoke:lio'], atLocation: 'sunward_house' },
              setsFlags: ['lio_knows_about_his_father'],
              closesFlags: [],
            },
            {
              routeId: 'read_it_out',
              label: 'Read her name out in the Long Hall',
              predicate: { flagsSet: ['used:read_the_old_order'], atLocation: 'long_hall' },
              setsFlags: ['the_truth_is_out'],
              closesFlags: [],
            },
            {
              routeId: 'kept_it_quiet',
              label: 'Keep it to yourself until the moon',
              predicate: { flagsSet: ['knows:edda_marsh', 'moon_count_read'] },
              setsFlags: ['kept_it_quiet'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['old_name_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_faculty', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_forty_to_one',
      title: 'Forty to One',
      summary: 'The bookmaker in the boiler room has you at forty to one, and she would like to discuss how you might lose.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['odds_posted'] },
      involvedCharacterIds: ['fenn'],
      involvedLocationIds: ['boiler_room', 'the_circle'],
      knownRewardCopy: 'Money, or at least a better price, and a look at a very old book.',
      steps: [
        {
          id: 'fenns_offer',
          playerCopy: 'Hear Fenn’s offer and give her an answer.',
          directorNotes:
            'Fenn offers money to lose a bout at the right minute. It is a real offer and taking it is allowed. She respects a player who bargains, likes one who turns her down, and does not hold a grudge either way. She never bets against herself and never takes bets on lions, which a sharp player may notice.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_her_money',
              label: 'Agree to lose for her, with a straight face',
              predicate: { flagsSet: ['spoke:fenn', 'used:poker_face'] },
              setsFlags: ['threw_for_fenn'],
              closesFlags: [],
            },
            {
              routeId: 'backed_yourself',
              label: 'Talk her into backing you to win instead',
              predicate: { flagsSet: ['spoke:fenn', 'used:talk_it_down'] },
              setsFlags: ['backed_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'turned_her_down',
              label: 'Turn her down and leave',
              predicate: { flagsSet: ['spoke:fenn', 'used:walk_away'] },
              setsFlags: ['turned_fenn_down'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:the_book'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_ledger',
          playerCopy: 'Get a look at her grandmother’s ledger.',
          directorNotes:
            'The old ledger sits in a locked tin under her desk. She will open it for somebody she trusts; somebody else can simply lift it, and she will know by morning. Either way it shows one folded page and one bet: "Marsh does not fight", G. Holt, paid in Sunward money.',
          enterWhen: null,
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_showed_you',
              label: 'Earn enough trust that she opens it',
              predicate: {
                flagsSet: ['knows:the_book'],
                minRelationship: [{ characterId: 'fenn', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['fenn_opened_the_book', 'knows:the_old_name'],
              closesFlags: [],
            },
            {
              routeId: 'lifted_it',
              label: 'Take it from the tin while she is out',
              predicate: { hasItems: ['old_ledger'] },
              setsFlags: ['stole_the_ledger', 'knows:the_old_name'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: ['ledger_found'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_lanterns',
      atWorldMinute: 21 * 60 + 30,
      locationId: 'the_circle',
      publicCopy: 'The courtyard lanterns are lit and every window on three sides fills with ears.',
      directorNotes:
        'The whole school has come out to watch the human’s first bout. Fenn chalks odds on the bench. Stagg is already in the ring with chalk on his fingers. Ruka arrives last, taping her hands.',
      setsFlags: ['the_courtyard_filled'],
      cancelledByFlags: ['first_night_over'],
      requiresFlags: ['faced_ruka'],
      movesCharacters: [
        { characterId: 'ruka', toLocationId: 'the_circle' },
        { characterId: 'fenn', toLocationId: 'the_circle' },
        { characterId: 'stagg', toLocationId: 'the_circle' },
      ],
    },
    {
      id: 'we_the_scratched_name',
      atWorldMinute: 20 * 60,
      locationId: 'the_archive',
      publicCopy: 'On the board from thirty years ago, the seventh name has been scratched out so hard the wood underneath has gone pale.',
      directorNotes:
        'Only a player who has climbed to the archive sees this. Underneath the scratches, a careful eye can make out a surname that is not a clan name. This opens the old lead; nothing else pushes it.',
      setsFlags: ['knows:the_old_name'],
      cancelledByFlags: [],
      requiresFlags: ['visited:the_archive'],
      movesCharacters: [],
    },
    {
      id: 'we_pim_at_the_door',
      atWorldMinute: DAY + 6 * 60 + 59,
      locationId: 'guest_room',
      publicCopy: 'Somebody knocks at the gatehouse door at six fifty-nine exactly, with a honey bun and a folded note.',
      directorNotes:
        'Pim, introducing himself by rank, with a free bun and gossip that costs. He is here because he has done the arithmetic about who the human might challenge, and he would like to be too useful to beat.',
      setsFlags: ['pim_came_round'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'pim', toLocationId: 'guest_room' }],
    },
    {
      id: 'we_the_odds_go_up',
      atWorldMinute: DAY + 12 * 60,
      locationId: 'long_hall',
      publicCopy: 'At lunch, a fox with chalk on her waistcoat writes the human’s odds on a board by the kitchen hatch: forty to one.',
      directorNotes: 'Fenn, advertising. She wants the human to come and find her in the boiler room.',
      setsFlags: ['odds_posted'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_order'],
      movesCharacters: [{ characterId: 'fenn', toLocationId: 'long_hall' }],
    },
    {
      id: 'we_the_cream_card',
      atWorldMinute: DAY + 18 * 60,
      locationId: 'guest_room',
      publicCopy: 'A cream card has been slid under the gatehouse door, in beautiful handwriting: dinner at Sunward House, any evening this week.',
      directorNotes: 'Lio’s invitation. It is sincere, and it is also the first move in deciding what to do about his father’s letter.',
      setsFlags: ['lio_invited'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_over'],
      movesCharacters: [],
    },
    {
      id: 'we_lio_trains_alone',
      atWorldMinute: 2 * DAY + 30,
      locationId: 'the_circle',
      publicCopy: 'After midnight, one lantern is still lit in the courtyard, and the first rank is alone in the chalk, sparring with nobody.',
      directorNotes:
        'Lio trains alone because nobody has ever not yielded to him. He is not very good. If the player is there, he is embarrassed for about a second and then asks, politely, whether they would mind.',
      setsFlags: ['saw_lio_train'],
      cancelledByFlags: [],
      requiresFlags: ['visited:the_circle'],
      movesCharacters: [{ characterId: 'lio', toLocationId: 'the_circle' }],
    },
    {
      id: 'we_the_lion_seal',
      atWorldMinute: 2 * DAY + 7 * 60 + 30,
      locationId: 'sunward_house',
      publicCopy: 'Pim runs up the Sunward drive with two more envelopes sealed in gold wax.',
      directorNotes: 'The Pride-Lord is writing again, to his son and to Bryn. Pim knows the seal and will say so to anybody who pays him.',
      setsFlags: ['the_pride_lord_wrote'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'pim', toLocationId: 'sunward_house' }],
    },
    {
      id: 'we_the_lamp_goes_out',
      atWorldMinute: 2 * DAY + 22 * 60,
      locationId: 'north_stair',
      publicCopy: 'The lamp at the turn of the north stair goes out, and somebody very large is standing at the bottom of it.',
      directorNotes:
        'Bryn, sent by a letter she hates. She will not go through with it, and nobody falls. She is waiting for somebody to give her a reason to step aside.',
      setsFlags: ['stair_lamp_out'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_order'],
      movesCharacters: [{ characterId: 'bryn', toLocationId: 'north_stair' }],
    },
    {
      id: 'we_the_moon_bout',
      atWorldMinute: MOON_BOUT,
      locationId: 'the_circle',
      publicCopy: 'The moon comes up full over the courtyard, the lanterns are lit, and Lio Solenne steps into the chalk.',
      directorNotes:
        'The Moon Bout. Anyone in the top ten, or anyone Lio invites, may challenge him tonight. He roars once, and every challenger in two years has knelt to it.',
      setsFlags: ['moon_bout_night'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'lio', toLocationId: 'the_circle' },
        { characterId: 'ruka', toLocationId: 'the_circle' },
        { characterId: 'stagg', toLocationId: 'the_circle' },
        { characterId: 'fenn', toLocationId: 'the_circle' },
        { characterId: 'bryn', toLocationId: 'the_circle' },
        { characterId: 'pim', toLocationId: 'the_circle' },
      ],
    },
    {
      id: 'we_the_moon_count',
      atWorldMinute: MOON_COUNT,
      locationId: 'long_hall',
      publicCopy: 'Coach Stagg reads the Order aloud in the Long Hall, all two hundred and eleven names, and it is fixed for the year.',
      directorNotes: 'Anyone not on the wall is on the morning bus. The whole cast is in the hall to hear it.',
      setsFlags: ['moon_count_read'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'ruka', toLocationId: 'long_hall' },
        { characterId: 'lio', toLocationId: 'long_hall' },
        { characterId: 'pim', toLocationId: 'long_hall' },
        { characterId: 'stagg', toLocationId: 'long_hall' },
        { characterId: 'fenn', toLocationId: 'long_hall' },
        { characterId: 'bryn', toLocationId: 'long_hall' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_full_moon',
      kind: 'FINALE',
      label: 'Whether your name is on the wall when the moon is full',
      seedHint: 'Somebody at the next table counts the nights to the full moon out loud, and gets to six.',
      payoffHint: 'Stagg reads the Order aloud and the player hears their own number, or does not.',
      weight: 1,
    },
    {
      id: 'p_why_the_tray',
      kind: 'RELATIONSHIP',
      label: 'Why Ruka chose you on the first night',
      seedHint: 'She hits softer than anybody watching expected, and is furious when somebody says so.',
      payoffHint: 'On the ridge at dawn, without looking at the player, she says what Lio’s roar does to her knees.',
      weight: 0.9,
    },
    {
      id: 'p_the_untouched_prince',
      kind: 'RIVAL',
      label: 'The first rank nobody has ever touched',
      seedHint: 'Lio holds the player’s eyes a beat too long in the hall, and then smiles as if he has been given a present.',
      payoffHint: 'At the Moon Bout somebody does not kneel, and he is happier about it than anybody in the courtyard.',
      weight: 0.8,
    },
    {
      id: 'p_the_scratched_name',
      kind: 'MYSTERY',
      label: 'The name scratched off the old Order',
      seedHint: 'A pencilled line under the seal of the admission letter: use the south stair after dark.',
      payoffHint: 'A human woman in a thirty-year-old photograph, and a bet in a ledger that says she would not fight.',
      weight: 0.7,
    },
    {
      id: 'p_no_reason_to_kneel',
      kind: 'THEME',
      label: 'What it means to have no reason to kneel',
      seedHint: 'Two hundred ears flatten at once when somebody growls, and the player’s face does nothing.',
      payoffHint: 'Somebody who has always knelt stays standing, because the player showed them it could be done.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_wrestler',
      name: 'You Wrestled',
      role: 'Grappling and close range',
      summary: 'You wrestled at a city club for years, so the Hold is your best form and close range is where you want every bout to happen.',
      playstyle: ['Grappling', 'Stubborn', 'Close range'],
      blurb: 'The wolves tape their hands exactly the way you do, and the first time Ruka sees it she stops talking for a second.',
      attributeBonus: { might: 2, resolve: 1 },
      skillProficiencies: { grappling: 3, nerve: 1, endurance: 1 },
      startingItems: [{ itemId: 'hand_wraps', qty: 1 }],
      startingAbilities: ['hold_the_stare', 'get_inside'],
      startingReputation: [{ factionId: 'faction_hill_pack', amount: 5 }],
    },
    {
      id: 'arch_runner',
      name: 'You Ran Distance',
      role: 'Endurance and speed',
      summary: 'You ran long distance for years, so the Run on the ridge is your best form and you can still be going long after a faster runner stops.',
      playstyle: ['Endurance', 'Patient', 'Quick feet'],
      blurb: 'Beastfolk sprint. You have never sprinted in your life, and you have never once stopped before the finish.',
      attributeBonus: { might: 1, agility: 2 },
      skillProficiencies: { endurance: 3, footwork: 2 },
      startingItems: [{ itemId: 'road_shoes', qty: 1 }],
      startingAbilities: ['hold_the_stare', 'outlast'],
      startingReputation: [{ factionId: 'faction_warren', amount: 5 }],
    },
    {
      id: 'arch_talker',
      name: 'You Argued for a Living',
      role: 'Talk and persuasion',
      summary: 'You debated and negotiated before you came here, so you are best at turning a challenge into a conversation and lying with a face nobody can read.',
      playstyle: ['Talks well', 'Bluffs', 'Avoids fights'],
      blurb: 'Everybody here reads ears. You have none, and you have spent your whole life practising a straight face anyway.',
      attributeBonus: { presence: 3 },
      skillProficiencies: { talk: 3, bluff: 2 },
      startingItems: [{ itemId: 'pocket_notebook', qty: 1 }],
      startingAbilities: ['hold_the_stare', 'poker_face'],
      startingReputation: [{ factionId: 'faction_faculty', amount: 5 }],
    },
    {
      id: 'arch_scholar',
      name: 'You Studied the Clans',
      role: 'Customs, history and social reads',
      summary: 'You studied clan history at university, so you know the customs nobody explains and can read ears and tails better than most beastfolk expect.',
      playstyle: ['Observant', 'Knows the rules', 'Reads people'],
      blurb: 'You came to Ashgrove having read every book about it, and you are about to find out which ones were wrong.',
      attributeBonus: { mind: 2, arcana: 2 },
      skillProficiencies: { customs: 3, tells: 2 },
      startingItems: [{ itemId: 'clan_manners', qty: 1 }],
      startingAbilities: ['hold_the_stare', 'read_the_ears'],
      startingReputation: [{ factionId: 'faction_faculty', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name goes on the admission letter?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Okafor' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What did you do before Ashgrove?',
      helpText:
        'What you trained in before you arrived, which sets what you are good at in the Circle and out of it. It is fixed for the whole story and cannot be changed later. It does not decide which form you pick, who you trust, or whether you climb the wall at all.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the hall notice about you first?',
      helpText: 'One plain sentence about who you are.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I laugh when I am nervous, and I have been very nervous since the bus.',
    },
    {
      id: 'how_you_take_it',
      label: 'How do you answer a challenge?',
      helpText: 'A starting temperament, not a promise. You can do the opposite on the first night and the hall will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'stand_up', label: 'Stand up, every time, whatever it costs' },
        { id: 'talk_first', label: 'Talk first and find out what is really being asked' },
        { id: 'pick_your_ground', label: 'Pick the form where a human has the edge' },
        { id: 'refuse', label: 'Refuse to play by rules you did not agree to' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the hall see when you walk in?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Twenty-two, short, a borrowed training jacket two sizes too big, and running shoes nobody here has seen before.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Two COMMON endings bookend the week: on the wall or on the bus. Every other
   * full-moon ending is a variation on how the player got onto the wall, and
   * one of them, taking Pim's place, is deliberately the cheapest and the
   * cruellest. The two UNIQUE endings need either the Moon Bout or the old
   * lead, and the lead is never required for anything else.
   */
  endings: [
    {
      id: 'end_on_the_wall',
      name: 'Your Name on the Wall',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['ranked_by_the_moon', 'moon_count_read'], flagsUnset: ['left_the_map'] },
      condition:
        'The player got onto the Order by the full moon, by whatever route, and was in the hall to hear their number read aloud. Nothing spectacular happened; a human simply stayed, which at Ashgrove is spectacular enough.',
      epilogue:
        'The student with the brush paints a new line near the bottom of the wall, in the same white as everybody else. By the end of the month nobody turns round when the human walks into the hall, and that is exactly what the player wanted.',
      hint: '',
    },
    {
      id: 'end_sent_home',
      name: 'Sent Home Unranked',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['moon_count_read'], flagsUnset: ['on_the_order'] },
      condition:
        'The full moon came and the player was not on the Order. Whether they refused every challenge on principle or simply ran out of nights, do not write it as a punishment: it is the honest result of a rule they never agreed to.',
      epilogue:
        'The morning bus leaves at seven. A few people are at windows. Ruka is at the gate, saying nothing, with her hands taped, and she taps the bus window twice as it pulls away.',
      hint: '',
    },
    {
      id: 'end_last_bus_down',
      name: 'The Last Bus Down',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['on_the_order'] },
      condition:
        'The player walked out of Ashgrove before the full moon and took the last bus down to town. It is a coherent answer to a school that ranks people by fighting, and the world should treat it as a choice rather than a defeat.',
      epilogue:
        'Lantern Street at night, a bowl of noodles, nobody staring. Somewhere up the hill the Order is repainted without the player on it, and for about a week the hall argues about whether the human was a coward or the only sensible person there.',
      hint: '',
    },
    {
      id: 'end_one_of_the_pack',
      name: 'One of the Pack',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['claimed_by_the_pack', 'ruka_decided', 'moon_count_read'],
        minRelationship: [{ characterId: 'ruka', dimension: 'affection', value: 55 }],
        minFactionReputation: [{ factionId: 'faction_hill_pack', value: 30 }],
      },
      condition:
        'The player lost their first bout to Ruka, was claimed by the Hill Pack, and over seven nights became one of them for real. This is the ending where losing was the best thing that happened all week.',
      epilogue:
        'The player runs the ridge at dawn at the back of the pack, then a little less at the back. There is a bunk in the long house with their name on it, and Ruka has started using that name, though only when nobody else is in the room.',
      hint: '',
    },
    {
      id: 'end_bottom_of_the_wall',
      name: 'Two-Eleven and Two-Twelve',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['pim_pact', 'ranked_by_the_moon', 'moon_count_read'] },
      condition:
        'The player got onto the wall through the Warren, without taking anybody’s place, and ends the week at the very bottom of the Order next to Pim. It is the kindest ending and the least glamorous, and it should feel like a win.',
      epilogue:
        'Two-eleven and two-twelve eat last together at the table by the kitchen hatch, and it turns out the last table gets the warmest buns. Pim starts introducing the player by their number, proudly, to everybody.',
      hint: '',
    },
    {
      id: 'end_the_place_you_took',
      name: 'The Place You Took',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['sent_pim_down', 'moon_count_read'] },
      condition:
        'The player got onto the wall by beating Pim and taking his rank, which sent him home on the morning bus. It was within the rules and it was the cheapest rank there was. Do not moralise, but do not let it be free.',
      epilogue:
        'Pim’s token goes into the box in the Faculty office. The Warren still delivers the player’s post, on time, unopened, and nobody in the loft speaks to them again. The bun at the kitchen hatch costs the human rate for the rest of the year.',
      hint: '',
    },
    {
      id: 'end_second_on_the_first_night',
      name: 'Second on the First Night',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['beat_ruka', 'moon_count_read'] },
      condition:
        'The player beat Ruka in their first bout and took second place on the Order on their first night, and held it until the moon. It should feel enormous, and slightly terrifying, because now everybody wants that place.',
      epilogue:
        'A human is painted second on the wall, directly under Lio Solenne, and two hundred people walk past it every day pretending not to look. Ruka challenges the player again on the first night of the next term, grinning.',
      hint: '',
    },
    {
      id: 'end_she_stood_up',
      name: 'She Stood Up',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['ruka_faced_lio', 'ruka_can_stand'] },
      condition:
        'The player taught Ruka to stay on her feet through Lio’s roar, and at the Moon Bout she did. Whether she won does not matter. The ending belongs to her, and the player watched it from behind the chalk.',
      epilogue:
        'Ruka stays standing for fourteen seconds against the roar, the longest anybody has in two years, and lands one clean touch. Afterwards she finds the player in the crowd, taps their shoulder twice, and says their real name in front of everybody.',
      hint: '',
    },
    {
      id: 'end_what_she_told_you',
      name: 'What She Told You',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['used_her_secret', 'moon_count_read'] },
      condition:
        'The player used what Ruka told them about the roar to beat her in front of Lio and take her rank. It worked, and it was legal. This is the ambitious ending, and the Hill Pack never forgets how it was done.',
      epilogue:
        'The player is high on the wall now. The Hill Pack runs the ridge at dawn without them and stops talking when they pass. Ruka never challenges them again, which is worse than if she had.',
      hint: '',
    },
    {
      id: 'end_the_prince_was_hit',
      name: 'The First Time He Was Hit',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: { flagsSet: ['you_faced_lio', 'moon_bout_decided'] },
      condition:
        'The player stepped into the chalk against Lio at the Moon Bout, did not kneel to the roar, and became the first person in two years to lay a hand on him. Who won is less important than that it happened.',
      epilogue:
        'Lio sits on the flagstones with a split lip, laughing, the first time anybody at Ashgrove has heard him laugh like that. He asks the player, very politely, whether they would do it again next week. Then he writes his father a short letter.',
      hint: '',
    },
    {
      id: 'end_her_name_back',
      name: 'Her Name Back on the Wall',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['the_truth_is_out', 'old_name_answered'] },
      condition:
        'The player found out what happened to Edda Marsh and read it out in the Long Hall. The school has to answer for thirty years of silence, and the ending is about the first human, as much as the second.',
      epilogue:
        'The Faculty repaints a name on the old board in the archive: Marsh, seventh. A letter goes to an address in the city. Two weeks later a woman of fifty-one with cropped grey hair and a walking stick gets off the bus at the lower gate and asks to see the Circle.',
      hint: '',
    },
  ],
  opening:
    "The dining hall goes silent the way a forest does, all at once.\n\nA tray slams down on your table. Soup jumps. Grey wolf ears, pricked forward. A scar through one eyebrow.\n\n\"Humans eat last,\" says Ruka. \"You're at the first table. My table.\"\n\nTwo hundred ears turn toward you. Somewhere a tail knocks over a cup.\n\n\"A tray on your table is a challenge. You pick the form: hold, strike, run or stare. Win, and you're second in this school.\" She leans in, close enough to show her teeth. \"Or you pick up your bowl and go to the back of the line. All year.\"\n\nShe taps the table twice.\n\n\"Stand up or get up, human. Which?\"",
  openingPanel: {
    assetKey: 'story_pack_rank/opening',
    alt: 'Ruka, grey wolf ears pricked forward, scarred eyebrow, sleeveless training jacket, leaning over your table on taped fists, her tray just slammed down, a crowded dining hall behind her.',
  },
  openingSuggestions: [
    "\"I pick the stare.\" I look straight into her eyes and don't blink.",
    'I pick up my bowl and carry it to the back of the line.',
    'I take the bread roll off her tray and bite into it.',
  ],
  coverDirection: [
    'SUBJECT: Ruka Varn, a wolf-eared fighter, alone and unmistakable in the foreground of a key visual for a rivalry fantasy anime set in a great stone dining hall.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture, leaning toward the viewer over a long wooden dining table on both taped fists.',
    'Shaggy shoulder-length grey hair, tall grey wolf ears pricked hard forward with a notch out of the left one, pale gold eyes, a thin scar through her left eyebrow,',
    'a dark canvas training jacket with the sleeves torn off over a black athletic top, white tape wrapped round both hands.',
    'A metal dinner tray has just been slammed down between her fists: soup leaps out of the bowl in a frozen splash and a bread roll bounces into the air.',
    'Her expression is a hard, amused challenge, eyes locked on the viewer, one corner of her mouth up.',
    'HER FACE STAYS CLEAN: no splash, chalk dust, motion lines or shadows across her face; the only mark on it is the thin eyebrow scar. Every effect stays on the tray, the soup and the title.',
    'BEHIND HER, soft and secondary: a towering black wall striped with rows of small white painted lines, blurred past reading, in a warm lantern-lit stone hall,',
    'and a crowd of ear-and-tail silhouettes at long tables, all turned toward the viewer. The viewer’s shoulder is blurred at the bottom edge of the frame.',
    'LIGHT: warm amber lantern light from above and behind rims her hair and ears in gold, with a cooler fill from the front so her eyes read at thumbnail size.',
    'TITLE: the words Pack Rank painted into the art across the upper third in rough white chalk-stroke brush lettering, a capital P and a capital R and the rest lower case,',
    'with a puff of chalk dust breaking off the final k, spelled exactly Pack Rank, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const PACK_RANK = StoryVersion.parse(raw);
