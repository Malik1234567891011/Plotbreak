import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Ranking Board" — a fighting college that posts its top hundred on a
 * glass wall every morning, and a transfer who gets thrown into it.
 *
 * Slate #35 (docs/stories-50/PLAN.md). The structural bet is that a hierarchy
 * the player can literally read is the cheapest tutorial there is: the board
 * re-sorts at six, the rule fits on a sticker, and every fight has a number on
 * it before anybody swings. That gives the opener a question that needs an
 * answer now ("yes or no?") and gives every later turn a reason.
 *
 * Playable span is one week: Monday 07:50 in the Yard to Scout Night on Sunday
 * evening in the Pit. Everything older (the board's design thirty years ago,
 * the eleven-second clip, Gwon's stand-down last spring) is backstory carried
 * by what six people will and will not say.
 *
 * The climb is the surface. Underneath it is a scandal with no punches in it:
 * seven fit fighters taken off the board by medical forms, all signed by one
 * physician, each within two days of booking a fight against the Long Table.
 * A player who never looks still gets a complete fight-college week, because
 * the board, Tetsu, Soyeon and the Annex are a whole game on their own. A
 * player who looks finds a real conspiracy with real proof.
 *
 * Refusing is authored. Backing out of a challenge is a white flag for the
 * rest of term, which is a real cost, and it still leads somewhere: Coach Dam's
 * exhibition slot, the Annex, Pier Six, and two endings of its own.
 *
 * Three variables, all invisible. Wind is the only GOOD_HIGH, because
 * `resolveRest` refills those and breath is what sleep gives back. Heat is the
 * first GOOD_LOW in array order, because PUBLIC_VIOLENCE raises the first one,
 * and a fight outside a circle bringing the proctors down on you is exactly
 * the consequence this world wants. Hurt heals slowly and only goes up when
 * the player chooses to fight through something.
 *
 * The board has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which never sees resources, step notes or locked abilities, so
 * the rules are in hard canon, the student card is a starting quest item, and
 * every archetype starts with the board's two verbs (call_out, walk_out) plus
 * one move of its own.
 *
 * Everyone at the Ridge is eighteen or older. The bible and hard canon state
 * every age.
 */

const raw = {
  id: 'sv_the_ranking_board_1',
  storyId: 'story_the_ranking_board',
  version: 1,
  title: 'The Ranking Board',
  fantasyLabel: 'A hundred names. Yours is not one yet.',
  hook: 'A fighting college posts its top hundred on a glass wall every morning, and anybody who beats a name on it takes that number. You are an unranked transfer, and on your first morning the man at number 87 has just shoved you into the glass.',
  premise:
    'There is a college on a hill above a harbour city where eight hundred students, all of them eighteen or older, study one thing for four years: fighting.\n\n' +
    'Every morning at six a bell rings in the courtyard, and a glass board the height of a four-storey building lights up with the top hundred students, by number.\n\n' +
    'The rule fits on a sticker. Touch your student card to a name and you have challenged that person. Beat them inside a painted circle with a proctor watching, and their number is yours. They drop one place, and number 100 falls off the bottom.\n\n' +
    'The ranked hundred live in the tower dorm, eat for free and get scouted. Everybody else lives in the old concrete dorm and buys their own noodles.\n\n' +
    'You arrived last night, a transfer. You have no number, a roommate who knows every record on the board by heart, and ten minutes until your first class.\n\n' +
    'The man at number 87 has just shoved you into the glass so your card touched his name, and now the board is asking whether you accept.\n\n' +
    'In seven days the professional leagues send scouts to watch the top twenty. Nobody has lasted a minute with the number one in eleven months. And two fit fighters have come off the board this term without anybody throwing a punch.\n\n' +
    'Climb it, refuse it, or find out who is moving the names. If you lose, the whole college watches you do it on their phones.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Martial arts', 'Action', 'Academy', 'Rivalry', 'Drama'],
  mechanicsChips: [
    'A hundred names, re-sorted at six',
    'Beat a name, take the number',
    'Opponents learn your habits',
    'Saying no is a real answer',
    'Someone is moving the names',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can climb this board, refuse it, cheat it, expose it or walk down the hill and never come back, and every one of those goes somewhere. The fights are the fun part. The people are the point: a bully who is mostly frightened, a number one nobody has lasted a minute with in a year, and a roommate who has watched four thousand fights and never been in one.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_yard',
    startWorldMinute: 7 * 60 + 50,
    startingItems: [{ itemId: 'student_card', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. Soyeon Ryu is twenty-one, Tetsu Hamada twenty-two, Hajun Seol twenty-three, Minho Tak nineteen, Nari Hwang twenty-four and Coach Dam fifty-eight. The player, a transfer, is an adult too.',
      'Haneul Ridge College of Combat Arts ("the Ridge") stands on a hill above the harbour city of Garam Bay. Every student and every member of staff is eighteen or older. Nobody has powers, magic or a status window; they are people who are very good at fighting.',
      'The board is a glass screen on the north wall of the Yard showing the top hundred students by number. It re-sorts at 06:00 every morning when the bell rings.',
      'A challenge: touch your student card to a name, the named fighter taps their card to accept, and the challenger confirms on the glass. Anybody may challenge anybody. A fighter may decline, for free, any challenge from more than twenty places below. Within twenty places they get one refusal per term. Unranked students count as 101.',
      'The glass scrolls under a sliding card, so any name can be reached from the stones. Until the challenger confirms, a challenge is only pending; sliding to a different name first replaces it with no flag, and the new one is that day’s challenge. Number one declines unranked challengers for free.',
      'A challenge is fought inside a painted white circle with a proctor or any instructor calling it. It is won by knockout, submission, the other fighter stepping out of the circle, or a concession (two slaps on the stones). A winner from below takes the loser’s number; the loser drops one place and #100 falls off. One challenge per fighter per day.',
      'Backing out after the other fighter has accepted puts a white flag on your card for the rest of the term, and a flagged student cannot issue challenges. Each instructor may still put one unranked fighter, flagged or not, into a Scout Night exhibition bout.',
      'A ranked fighter who has not defended in thirty days goes grey ("stale") at the morning sort and may not refuse any challenge. Tetsu Hamada, #87, goes stale at 06:00 tomorrow unless he defends today.',
      'Fighting outside a circle is a Proctors’ Office matter. Three strikes is expulsion, and not turning up to a hearing is expulsion on its own. Tetsu has two strikes.',
      'A card put on a name by force is off-circle violence. If the shoved student refuses and says so to an instructor or proctor before confirming, the challenge is void with no white flag, and the shove goes on the shover’s record as a strike. For Tetsu that is his third, and expulsion; he is betting a transfer will not know that, or will not use it. Coach Dam crosses the Yard at 08:00 every morning and will call any fight waiting in the circle.',
      'The clinic’s senior physician, Dr. Kwan Ilseok (61), can declare any fighter medically unfit; the name greys and drops off the board. Seven fit fighters have been stood down this way in two years, two of them this term, each within two days of booking a challenge against a Long Table regular. Hajun Seol, #2, arranges it. Nari Hwang countersigned one of the forms last April, for Gwon Seokjin (23), once #31 and Tetsu’s training partner, who left the college and now fights for cash at Pier Six.',
      'Soyeon Ryu has been #1 for 412 days, and nobody has lasted a minute with her in eleven months. She has a three-week-old tear in her left shoulder that she tapes herself and has hidden from the clinic. She last defended twenty-two days ago, the day before the shoulder tore, and won in forty seconds; she is not stale before Scout Night. She has already used her one refusal of the term on #3, Daeho Gu (23).',
      'Scout Night is Sunday at 19:00 in the Pit. The professional league’s flagship club signs whoever is #1 on the board that morning. The top twenty get showcase bouts.',
    ],
    toneGuide:
      'Loud, fast and specific, in the register of a good fight-college anime, where everyone is an adult: two hundred phones up, red letters on glass, a bell at six, noodles at one in the morning, a vending machine that only takes coins. ' +
      'Fights are legible and short. Distance, angle, a habit, a mistake; a style beats another style for a reason that fits in one sentence, and that reason is the drama. Injuries are ordinary and physical (a split brow, a taped wrist, a limp up ninety-nine steps) and never graphic. ' +
      'Nobody monologues about strength. Rivals are people with rent and families and fears. Hajun is polite and never cartoonish; Tetsu is frightened before he is cruel. ' +
      'Romance is tension, banter and choice, up to a kiss. Comedy comes from people, especially Minho. If a scene has nothing at stake, let it be funny and short. The face at the top of a beat is whoever is in the player’s way. ' +
      'Fighters who watch the streams learn the player’s habits: by their third fight somebody is waiting for the thing they always do, and says so.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The bell goes at six.\n\nThe board blacks out, then fills from the top. 1. RYU SOYEON. 2. SEOL HAJUN. The Yard counts along under its breath, the way people count down a rocket.\n\nMinho grabs your sleeve at seventy.\n\n\"Okay okay okay. If you're on there, I'm buying breakfast. If you're not, you're buying, because I was right.\"\n\n86.\n\n87.\n\nYour own face looks back at you from forty feet up, mid-blink, terrible.\n\nSomewhere behind you, Tetsu Hamada says a word the proctors would write down.",
      "Soyeon doesn't look up from her noodles.\n\n\"You dropped your left hand four times,\" she says. \"He saw it twice.\"\n\n\"You watched?\"\n\n\"Everybody watched.\" She pushes the chilli oil across the counter without being asked. \"I watched it eleven times.\"\n\nThe noodle place closes at two. It's ten to.\n\nShe still hasn't looked up, and her left arm hasn't moved off the counter all night.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 12, agility: 12, mind: 11, presence: 11, resolve: 12, arcana: 8 },
  skills: [
    { id: 'striking', name: 'Striking', attribute: 'agility', description: 'Hands, feet, knees and the half step of angle that decides whether a shot lands or goes past an ear.' },
    { id: 'grappling', name: 'Grappling', attribute: 'might', description: 'The clinch, the takedown, and what happens to a striker who has never been held on the stones.' },
    { id: 'reading', name: 'Reading', attribute: 'mind', description: 'Seeing what somebody keeps doing, and what they do instead when it stops working.' },
    { id: 'grit', name: 'Grit', attribute: 'resolve', description: 'Getting hit in front of two hundred phones and still making decisions with your actual brain.' },
    { id: 'front', name: 'Front', attribute: 'presence', description: 'Talking, bluffing, owning a crowd, and making a room believe you meant to do that.' },
    { id: 'legwork', name: 'Legwork', attribute: 'mind', description: 'Finding out how a place really works: who signs what, who eats where, who is lying about a form.' },
    { id: 'instinct', name: 'Instinct', attribute: 'arcana', description: 'The move your body makes a beat before you decide to make it. Rare, real, and impossible to coach.' },
  ],
  /**
   * Three, all invisible.
   *
   * Wind is GOOD_HIGH and the only one, because rest refills those and breath
   * is what a night's sleep honestly gives back. It is also what the generic
   * cost path spends, which is right: the price of a bad exchange here is that
   * you have less left for the next one.
   *
   * Heat is first among the descending pair on purpose. PUBLIC_VIOLENCE raises
   * the first GOOD_LOW in array order, and a fight outside a circle should bring
   * the Proctors' Office, not a bruise. Hurt heals slowly and only climbs when
   * the player chooses to fight through something.
   */
  resources: [
    {
      id: 'wind',
      name: 'Wind',
      max: 100,
      start: 85,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Nothing left. The hands come down to the chest, the feet stop, and every phone in the Yard can see it, which is the particular humiliation this college is built on and the reason Coach Dam makes people run the steps.',
      color: '#E4572E',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Empty. Hands low, feet flat, every decision half a second late. This is the band where a fighter loses an exchange they were winning, where a corner should be shouting to stop, and where the honest move is a bed in the Annex rather than one more round.',
        },
        {
          upTo: 60,
          behaviour:
            'Working. Good for one more hard fight or one difficult conversation and honest about not being good for both. Everything still happens, and everything costs a beat more than it did this morning, which anybody who reads fighters can see from across the Yard.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh. Feet, hands and lungs all answering, so the player can start something, change their mind halfway through and go somewhere else with it. This is the only band in which a fighter is genuinely creative, and the one a smart opponent tries to drag them out of early.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 12,
      regenPerHour: -0.4,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody in the Proctors’ Office knows the player’s name. They are a transfer on a list, which at this college is a kind of freedom.',
      color: '#6C757D',
      bands: [
        {
          upTo: 25,
          behaviour:
            'A new face on a probation list nobody reads. Proctors nod in corridors and do not look twice. The player can be loud in the Yard and nobody writes it down.',
        },
        {
          upTo: 55,
          behaviour:
            'Noticed. A proctor in a grey jacket happens to be on the steps when the player comes down them, twice. Tetsu stops standing next to them in public because he cannot afford the company. A clinic door that was open on Monday is locked on Thursday.',
        },
        {
          upTo: 80,
          behaviour:
            'A file with a tab on it. The Proctors’ Office has asked Coach Dam about the player by room number. Every circle they step into gets a proctor rather than whichever instructor is nearest, and the Long Table starts treating them as somebody who might be useful precisely because they are in trouble.',
        },
        {
          upTo: 100,
          behaviour:
            'One more thing and it is a hearing. The player’s card beeps red at the Tower gate. Friends are being asked where they were on Tuesday night. Anything that happens outside a circle from here is the end of the term, and possibly of the place at the Ridge.',
        },
      ],
    },
    {
      id: 'hurt',
      name: 'Hurt',
      max: 100,
      start: 5,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nothing hurts. The player moves like somebody who has never been hit hard, which is either true or about to stop being true.',
      color: '#7B2CBF',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Ordinary soreness. Bruised knuckles, a stiff neck from the Annex mattress. Nothing anyone needs to mention, and nothing that changes how the player fights.',
        },
        {
          upTo: 50,
          behaviour:
            'Carrying something. A rib that catches on a deep breath, a wrist that wants tape. Good opponents will find it by the second exchange, and Nari Hwang will see it from across the Ice Room and point at a treatment table without a word.',
        },
        {
          upTo: 80,
          behaviour:
            'Injured and hiding it. The player is protecting one side, sleeping badly and choosing fights by what they can survive rather than what they want. This is the band where Nari is entitled to refuse to clear them, and where Soyeon Ryu recognises the way they stand because it is how she stands.',
        },
        {
          upTo: 100,
          behaviour:
            'One clean shot from something that does not heal by Sunday. Every circle is a real risk and everyone who cares about the player is saying so. Stepping in here is a choice with a cost that lasts past Scout Night, and the prose should say so plainly.',
        },
      ],
    },
  ],
  /**
   * Four habits the board's regulars study. The ones who watch streams
   * (Soyeon, Hajun, and Tetsu a little) learn them; the counters are how a
   * player who has been figured out gets the advantage back.
   */
  tendencies: [
    {
      id: 'forward',
      label: 'Coming forward',
      identity: 'Pressure fighter',
      scoutedNote: 'They know you walk forward and they are waiting with something for when you arrive.',
    },
    {
      id: 'counter',
      label: 'Waiting to counter',
      identity: 'Counter-puncher',
      scoutedNote: 'They have stopped leading. They stand there and make you start it.',
    },
    {
      id: 'clinch',
      label: 'Taking it to the stones',
      identity: 'Grappler',
      scoutedNote: 'They are keeping their hips back and their hands on your shoulders. They know you shoot.',
    },
    {
      id: 'crowd',
      label: 'Playing to the phones',
      identity: 'Showman',
      scoutedNote: 'They wait for you to look at the crowd, and that is when they come.',
    },
  ],
  items: [
    {
      id: 'student_card',
      name: 'Your Student Card',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A plastic card on a lanyard with your photo, a room number (Annex 4-12) and, where a rank would go, three dashes. Touch it to a name on the board and you have challenged that person.',
      loreText: 'The photo was taken at two in the morning by a machine in the admissions office. Everybody’s is terrible. Yours is worse.',
      icon: 'card',
    },
    {
      id: 'barley_tea',
      name: 'Can of Barley Tea',
      tags: ['consumable'],
      stackable: true,
      maxStack: 5,
      consumable: { resourceId: 'wind', amount: 12, consumesItem: true },
      description: 'Cold, cheap and from the coin-only machine in the Yard, which is the only machine on campus that works every time.',
      loreText: 'Coach Dam calls it the only legal performance enhancer at the Ridge, and drinks four a day.',
      icon: 'can',
    },
    {
      id: 'minho_tablet',
      name: 'Minho’s Tablet',
      tags: ['tool', 'document'],
      skillModifiers: { reading: 2 },
      description: 'A tablet in a bright orange case covered in stickers of fighters. On it: every challenge fought at the Ridge in three years, clipped, tagged and cross-referenced in a spreadsheet with forty columns.',
      loreText: 'Column AF is headed STAND-DOWNS?? and has seven rows highlighted in yellow.',
      icon: 'tablet',
    },
    {
      id: 'challenge_log',
      name: 'The Challenge Log',
      tags: ['document'],
      skillModifiers: { legwork: 2 },
      description: 'A fat printout from the Proctors’ Office: every challenge booked, fought, refused or cancelled in the last two years, with dates and the name of whoever called it.',
      loreText: 'Seven bookings in it end with the same two words in place of a result: MEDICAL WITHDRAWAL.',
      icon: 'papers',
    },
    {
      id: 'stand_down_forms',
      name: 'Three Stand-Down Forms',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Photocopies of three clinic forms declaring three fighters unfit. All three signed by Dr. Kwan. Clipped to each, in a different hand, the clinic intern’s own exam notes from the same week: cleared, cleared, cleared.',
      loreText: 'One of them has a second signature at the bottom, smaller, and somebody has gone over it in pen so many times the paper is shiny.',
      icon: 'folder',
    },
    {
      id: 'black_card',
      name: 'The Black Card',
      tags: ['quest', 'key'],
      questItem: true,
      description: 'Matte black with a silver 10 on one side and nothing on the other. It calls the Tower lift to the tenth floor, where the Long Table eats.',
      loreText: 'There are eleven of them. Ten belong to the top ten. The eleventh is whoever Hajun Seol is interested in this week.',
      icon: 'keycard',
    },
    {
      id: 'blue_tape',
      name: 'A Roll of Blue Tape',
      tags: ['clue'],
      description: 'A half-used roll of blue kinesiology tape, left behind a vent on the Tower roof. It is not the brand the clinic stocks, so somebody is buying their own and taping themselves.',
      loreText: 'The torn ends are all the same length, cut with the same care, by somebody who has done this every morning for weeks.',
      icon: 'tape',
    },
    {
      id: 'dam_wraps',
      name: 'Coach Dam’s Old Wraps',
      tags: ['gear'],
      skillModifiers: { striking: 1 },
      description: 'Faded red hand wraps, washed a thousand times, with two initials inked inside the cuff. She does not lend them. She gave them to you.',
      loreText: 'She wore them for both national titles. She will deny this if asked.',
      icon: 'wraps',
    },
    {
      id: 'their_old_card',
      name: 'Their Old Card',
      tags: ['personal', 'clue'],
      description: 'A Ridge student card that belonged to someone you love. Their photo, their old number, and a grey stamp across it: STOOD DOWN.',
      loreText: 'They told you on the phone that they were fine, that the clinic had made a mistake, and that they would sort it out. Then they stopped answering.',
      icon: 'card',
    },
  ],
  abilities: [
    {
      id: 'call_out',
      name: 'Put Your Card on a Name',
      tags: ['social'],
      description: 'Touch your card to a name on the board, or confirm a challenge that is already waiting for you. Public, permanent, and filmed.',
      affordances: ['accept', 'confirm', 'say yes', 'challenge him', 'challenge her', 'touch the board', 'put my card on', 'call her out', 'issue a challenge', 'step into the circle'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_out',
      name: 'Walk Out of the Circle',
      tags: ['social'],
      description: 'Say no, and leave. To a challenge, an offer, a fight, a room. It always works, and it always costs something.',
      affordances: ['no', 'say no', 'refuse', 'walk away', 'decline', 'back out', 'step out of the circle', 'leave it', 'turn it down'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'press_forward',
      name: 'Walk Them Down',
      tags: ['combat'],
      description: 'Go forward behind your hands and keep going until they are out of room, out of breath, or out of the circle.',
      affordances: ['go forward', 'press him', 'press her', 'walk him down', 'throw combinations', 'pressure', 'back him up', 'charge in', 'hit him'],
      costs: [{ resourceId: 'wind', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'striking', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: ['forward'],
      countersTendency: 'counter',
    },
    {
      id: 'make_them_miss',
      name: 'Make Them Miss',
      tags: ['combat'],
      description: 'Let them come, slip the shot by an inch, and be somewhere they did not expect when they arrive.',
      affordances: ['counter', 'slip it', 'make him miss', 'wait for him', 'catch him coming in', 'dodge', 'step back and counter', 'let her come'],
      costs: [{ resourceId: 'wind', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'reading', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: ['counter'],
      countersTendency: 'forward',
    },
    {
      id: 'take_it_down',
      name: 'Take It to the Stones',
      tags: ['combat'],
      description: 'Close the distance, get hold, and put them on the ground where their hands are no use to them.',
      affordances: ['take him down', 'grab him', 'clinch', 'wrestle', 'go for the legs', 'drag her down', 'pin him', 'choke', 'submission'],
      costs: [{ resourceId: 'wind', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'grappling', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: ['clinch'],
      countersTendency: 'crowd',
    },
    {
      id: 'play_the_phones',
      name: 'Play to the Phones',
      tags: ['social'],
      description: 'Make it a show. Talk, pose, call somebody out, and let two hundred phones decide whose story this is.',
      affordances: ['play to the crowd', 'showboat', 'talk trash', 'mock him', 'pose for the cameras', 'wave at the phones', 'make a speech', 'go viral'],
      costs: [{ resourceId: 'wind', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'front', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: ['crowd'],
      countersTendency: null,
    },
    {
      id: 'read_the_fighter',
      name: 'Read the Fighter',
      tags: ['sight'],
      description: 'Watch somebody fight, in person or on a stream, until you know what they do when they are tired.',
      affordances: ['watch his feet', 'study her', 'look for a tell', 'watch the stream', 'scout him', 'read him', 'watch the fight', 'look around', 'take it in'],
      costs: [{ resourceId: 'wind', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'reading', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_it_down',
      name: 'Talk It Down',
      tags: ['social'],
      description: 'Lower the temperature with words. Bargain, apologise, bluff, or say the one thing that makes the other person stop and think.',
      affordances: ['talk him down', 'calm down', 'reason with him', 'make a deal', 'negotiate', 'apologise', 'defuse it', 'bluff', 'lie to him', 'play along'],
      costs: [{ resourceId: 'wind', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'front', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight_through_it',
      name: 'Fight Through It',
      tags: ['combat'],
      description: 'Ignore what is hurting and keep going. It works more often than it should, and it always sends a bill.',
      affordances: ['keep going', 'get up', 'stand back up', 'fight hurt', 'ignore the pain', 'one more round', 'push through'],
      costs: [{ resourceId: 'hurt', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'grit', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: ['forward'],
      countersTendency: null,
    },
    {
      id: 'settle_it_outside',
      name: 'Settle It Outside',
      tags: ['combat'],
      description: 'Fight somebody where there is no circle and no proctor. Nothing goes on the board, and everything goes on your file.',
      affordances: ['jump him', 'fight outside the circle', 'ambush him', 'start something', 'street fight', 'swing at him in the hallway', 'settle it outside'],
      costs: [{ resourceId: 'heat', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'striking', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: ['forward'],
      countersTendency: null,
    },
    {
      id: 'ask_around',
      name: 'Ask Around',
      tags: ['social'],
      description: 'Find out how the Ridge really works by asking the people who clean it, cook for it and gossip about it.',
      affordances: ['ask around', 'ask about', 'find out', 'look into it', 'gossip', 'who is', 'check the records', 'dig into it'],
      costs: [{ resourceId: 'wind', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'legwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_it_seen_to',
      name: 'Get It Seen To',
      tags: ['healing'],
      description: 'Go to the Ice Room, sit on a table, and let somebody who knows what they are doing look at what hurts.',
      affordances: ['see the medic', 'ice it', 'get it looked at', 'tape it', 'go to the clinic', 'rest it', 'get stitched up', 'patch me up'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pull_the_forms',
      name: 'Pull the Forms',
      tags: ['sight'],
      description: 'Get into the clinic’s filing room after hours and find the paper behind every name that greyed out.',
      affordances: ['pull the forms', 'search the files', 'break into the filing room', 'find the forms', 'copy the forms', 'go through the files'],
      costs: [{ resourceId: 'heat', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'legwork', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_stand_downs'],
        lockedCopy: 'You have a name that greyed out and a feeling about it. A feeling does not tell you which drawer in which room to open.',
      },
    },
    {
      id: 'the_late_hand',
      name: 'The Late Hand',
      tags: ['combat'],
      description: 'Coach Dam’s one trick: a short shot thrown a beat after the exchange is over, while they are breathing out and deciding they are safe.',
      affordances: ['the late hand', 'wait for the exhale', 'hit after the exchange', 'throw it late', 'catch him breathing out'],
      costs: [{ resourceId: 'wind', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'instinct', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: ['counter'],
      countersTendency: 'clinch',
      requires: {
        flagsSet: ['dam_trains_you'],
        lockedCopy: 'Coach Dam showed it once, too fast to follow, and then told you to go away. You do not have it yet.',
      },
    },
  ],
  locations: [
    {
      id: 'the_yard',
      name: 'The Yard',
      shortName: 'Yard',
      description:
        'The stone courtyard at the centre of the college. The board fills the north wall, forty feet of glass with a hundred faces on it. Under it, a white circle painted on the stones, scuffed grey in the middle. Benches round the edges, a coin-only vending machine, and at any hour somebody filming something. At eight the unranked file down the tunnel to the Pit for morning footwork drills under whichever instructor is on the rota, and that is where a transfer’s first class is.',
      artDirection:
        'Huge stone college courtyard in early morning light, a four-storey glass ranking screen on the far wall showing a grid of a hundred small portraits and numbers, a large white circle painted on worn flagstones, crowds of college fighters in their twenties in training gear holding up phones. Bright, loud, dramatic scale.',
      connections: [
        { to: 'the_annex', travelMinutes: 4, label: 'Across to the Annex' },
        { to: 'the_tower', travelMinutes: 3, label: 'Up to the Tower' },
        { to: 'the_pit', travelMinutes: 5, label: 'Down to the Pit' },
        { to: 'the_ice_room', travelMinutes: 3, label: 'The clinic' },
        { to: 'the_proctors_office', travelMinutes: 1, label: 'The door under the board' },
        { to: 'the_steps', travelMinutes: 4, label: 'Out through the gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'barley_tea', qty: 3, ownerId: null, aka: ['tea', 'a can', 'barley tea', 'a drink', 'something from the machine'] },
      ],
    },
    {
      id: 'the_annex',
      name: 'The Annex',
      shortName: 'Annex',
      description:
        'The unranked dorm: six floors of 1970s concrete with a lift that works on Tuesdays. Room 4-12 is yours and Minho’s, two beds, one desk, one window facing the Tower. The fourth-floor kitchen has a noodle shelf with names on it in marker and a long-running argument on the fridge about whose turn it is.',
      artDirection:
        'Shabby but warm concrete college dormitory, a narrow two-bed room with a desk covered in cables and a window looking up at a sleek tower, a shared kitchen with a shelf of labelled instant noodles. Fluorescent light, posters of fighters, lived-in clutter.',
      connections: [
        { to: 'the_yard', travelMinutes: 4, label: 'Back to the Yard' },
        { to: 'the_boiler_room', travelMinutes: 1, label: 'Down the basement stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'minho_tablet', qty: 1, ownerId: 'minho', aka: ['tablet', 'his tablet', 'the orange tablet', 'the spreadsheet'] },
      ],
    },
    {
      id: 'the_boiler_room',
      name: 'The Boiler Room',
      shortName: 'Boiler Room',
      description:
        'Coach Dam’s gym in the basement under the Annex, built around a boiler that bangs every forty minutes. Heavy bags patched with tape, a ring of mats with a white circle painted on them, a chalkboard of names with no numbers, and a hand-painted sign over the door: NO BOARD TALK.',
      artDirection:
        'Gritty basement boxing gym with an old industrial boiler and pipes, taped heavy bags hanging from chains, worn mats with a painted white circle, a chalkboard of names, a hand-painted sign above the door. Warm orange light, sweat and steam.',
      connections: [{ to: 'the_annex', travelMinutes: 1, label: 'Up the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [
        { itemId: 'dam_wraps', qty: 1, ownerId: 'dam', aka: ['wraps', 'the red wraps', 'hand wraps', 'her wraps'] },
      ],
    },
    {
      id: 'the_tower',
      name: 'The Tower',
      shortName: 'Tower',
      description:
        'The ranked dorm: ten floors of glass and pale stone, ten fighters to a floor by number, with a card gate in the lobby, a gym that smells of new rubber and a physio on call. Numbers 81 to 90 live on the second floor, where the windows look straight into the Annex. Number 1 lives on the tenth and is never in the lobby.',
      artDirection:
        'Sleek modern ten-storey dormitory tower, polished lobby with a turnstile card gate, a glass-walled gym with new equipment, fighters in their twenties in matching tracksuits. Cool blue light, expensive and a little cold.',
      connections: [
        { to: 'the_yard', travelMinutes: 3, label: 'Back down to the Yard' },
        { to: 'the_tower_roof', travelMinutes: 4, label: 'Ten flights to the roof' },
        { to: 'the_tenth_floor', travelMinutes: 2, lockedByFlag: 'invited_to_the_table', label: 'The lift to the tenth floor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
    },
    {
      id: 'the_tenth_floor',
      name: 'The Tenth Floor',
      shortName: 'Tenth Floor',
      description:
        'The top-ten dining room at the top of the Tower, where one table twenty feet long has become the Long Table. Breakfast is cooked to order. Hajun Seol sits in the middle, never at the head. There is a chair at the far end that nobody uses, and it is Soyeon Ryu’s.',
      artDirection:
        'Elegant high-rise dining room with a single very long dark wood table, floor-to-ceiling windows over a harbour city, fighters in pressed clothes eating breakfast, one empty chair at the far end. Cold morning light, quiet power.',
      connections: [{ to: 'the_tower', travelMinutes: 2, label: 'The lift down' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: -2 },
    },
    {
      id: 'the_tower_roof',
      name: 'The Tower Roof',
      shortName: 'Roof',
      description:
        'Laundry lines, two air vents, and the whole of Garam Bay laid out below to the cranes. Before dawn there is usually exactly one person up here, shadowboxing with her back to the door.',
      artDirection:
        'Rooftop of a tall tower before dawn, laundry lines, metal vents, the lights of a harbour city and cranes far below, one figure training alone against a pink-grey sky. Wind, quiet, solitary.',
      connections: [{ to: 'the_tower', travelMinutes: 4, label: 'Back down the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: -2 },
      takeableItems: [
        { itemId: 'blue_tape', qty: 1, ownerId: 'soyeon', aka: ['tape', 'the blue tape', 'a roll of tape', 'the roll behind the vent'] },
      ],
    },
    {
      id: 'the_pit',
      name: 'The Pit',
      shortName: 'Pit',
      description:
        'A sunken stone arena behind the main hall, twelve tiers of seats around a white circle twice the size of the one in the Yard. Lighting rig, three stream cameras on rails. Top-twenty challenges are fought here, and on Scout Night every seat is taken.',
      artDirection:
        'Sunken stone amphitheatre arena with steep tiered seating, a large white circle in the centre, a lighting rig and camera rails overhead, a packed crowd at night under bright spotlights. Epic, gladiatorial, modern.',
      connections: [{ to: 'the_yard', travelMinutes: 5, label: 'Up the tunnel to the Yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'the_ice_room',
      name: 'The Ice Room',
      shortName: 'Clinic',
      description:
        'The college clinic’s treatment floor: four ice baths, six tables, a wall of tape and a locked filing room at the back with Dr. Kwan’s name on the door. Nari Hwang runs it most days and will tell you to sit down before you have said why you came.',
      artDirection:
        'Bright college sports clinic, steel ice baths, treatment tables, shelves of athletic tape and ice packs, a locked filing-room door at the back with a nameplate. Clean white and pale blue, clinical but busy.',
      connections: [{ to: 'the_yard', travelMinutes: 3, label: 'Back to the Yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'stand_down_forms', qty: 1, ownerId: 'nari', aka: ['forms', 'the forms', 'the copies', 'her folder', 'the stand-down forms'] },
      ],
    },
    {
      id: 'the_proctors_office',
      name: 'The Proctors’ Office',
      shortName: 'Proctors',
      description:
        'A long low room under the board, humming with the servers that run the glass. Grey jackets, a counter, a bench outside where people wait for hearings, and a printer that will print you the challenge log if you ask the night proctor nicely.',
      artDirection:
        'Low basement office beneath a giant screen, racks of blinking servers behind glass, a service counter, a wooden bench for people waiting, staff in grey jackets. Fluorescent, bureaucratic, faintly ominous.',
      connections: [{ to: 'the_yard', travelMinutes: 1, label: 'Up into the Yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'challenge_log', qty: 1, ownerId: null, aka: ['log', 'the printout', 'the challenge log', 'the records'] },
      ],
    },
    {
      id: 'the_steps',
      name: 'The Ninety-Nine Steps',
      shortName: 'The Steps',
      description:
        'Stone stairs from the college gate down the hill to the city. Coach Dam’s fighters run them at dawn. Halfway down there is a landing with no cameras on it, and things happen there that never go on the board.',
      artDirection:
        'Long steep stone staircase down a wooded hillside from a college gate to a harbour city, a wide landing halfway, lanterns, early morning runners. Atmospheric, vertiginous.',
      connections: [
        { to: 'the_yard', travelMinutes: 4, label: 'Up through the gate' },
        { to: 'the_night_market', travelMinutes: 6, label: 'Down into the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'the_night_market',
      name: 'The Night Market',
      shortName: 'Market',
      description:
        'The street at the bottom of the steps: food stalls under strung bulbs, the Hamada fish stall with its awning half torn, a noodle place with nine stools that closes at two, and a flat above it where the clinic intern lives.',
      artDirection:
        'Busy harbour-city night market street under strings of bulbs, steaming food stalls, a fish stall with a torn awning, a tiny noodle counter with nine stools, neon signs, wet pavement. Warm, crowded, alive.',
      connections: [
        { to: 'the_steps', travelMinutes: 6, label: 'Back up the steps' },
        { to: 'pier_six', travelMinutes: 8, label: 'Down to the docks' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
    {
      id: 'pier_six',
      name: 'Pier Six',
      shortName: 'Pier Six',
      description:
        'A disused cargo pier where people fight for cash in a ring of shipping pallets and car headlights. No board, no proctors, no circle. Half the fighters here used to have a number at the Ridge.',
      artDirection:
        'Disused harbour pier at night, a makeshift ring of wooden pallets lit by car headlights, a rough crowd, cranes and dark water behind. Gritty, dangerous, lawless.',
      connections: [{ to: 'the_night_market', travelMinutes: 8, label: 'Back to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
    },
  ],
  /**
   * Four, in a deliberate order. PUBLIC_VIOLENCE costs standing with the FIRST
   * faction in array order, and a fight outside a circle is the Proctors'
   * Office's business before it is anybody else's.
   */
  factions: [
    {
      id: 'faction_proctors',
      name: 'The Proctors’ Office',
      description: 'The grey jackets who call fights, hold hearings and keep the challenge log. They do not care who wins. They care that it happened inside a circle.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'On probation' },
        { atReputation: 30, label: 'In good standing' },
        { atReputation: 60, label: 'Trusted' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_hundred',
      name: 'The Hundred',
      description: 'The ranked students as a body: whoever is on the glass this morning. They respect exactly one thing, and it happens in a circle.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A transfer' },
        { atReputation: 25, label: 'A name' },
        { atReputation: 50, label: 'A problem' },
        { atReputation: 75, label: 'A number to fear' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_annex',
      name: 'The Annex',
      description: 'The unranked: seven hundred people who buy their own noodles, hold the pads for the Tower, and watch every challenge from the cheap seats. Your dorm, if you want it.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'New in 4-12' },
        { atReputation: 30, label: 'One of us' },
        { atReputation: 60, label: 'Our fighter' },
      ],
      allies: [],
      enemies: ['faction_table'],
    },
    {
      id: 'faction_table',
      name: 'The Long Table',
      description: 'Hajun Seol’s court on the tenth floor: the top ten who eat together, and the people they have decided are useful. They arrange who challenges whom, and lately who comes off the board.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Outside' },
        { atReputation: 20, label: 'Useful' },
        { atReputation: 50, label: 'Seated' },
      ],
      allies: [],
      enemies: ['faction_annex'],
    },
  ],
  /**
   * Array order is cover-casting order: `coverCast()` takes the first three
   * with an appearance. Soyeon, Tetsu and Hajun are the cover.
   */
  characters: [
    {
      id: 'soyeon',
      name: 'Soyeon Ryu',
      role: 'Number one on the board for 412 days. Third-year, 21, and the most watched person at the college',
      cardBlurb:
        'Nobody has lasted a minute with her in eleven months, she watches every fight you have, and she is hiding something that would cost her the number if you found it.',
      pronouns: 'she/her',
      publicTraits: ['Says almost nothing', 'Has never lost at the Ridge', 'Eats alone, always'],
      hiddenDrives: [
        'She wants one real fight with somebody who is not afraid of her, and has stopped expecting to get it',
        'She is tired of the number and cannot afford to let go of it until Sunday',
      ],
      values: ['Exactness: say the true number, the true distance, the true reason', 'Earning things in a circle rather than being given them'],
      fears: [
        'Being pitied, especially by somebody she respects',
        'That the shoulder goes on Sunday in front of the whole league and everyone learns she hid it',
      ],
      socialStyle:
        'Answers a question with a measurement or another question, and goes quiet rather than explain. Notices everything about how people move and almost nothing about what they say.',
      boundaries: [
        'Will not throw a fight, for anybody, for any reason',
        'Will not accept protection she did not ask for, and will be colder to the person who offers it than to the person who threatens her',
        'Will not discuss the shoulder with anyone who found out by going through her things',
      ],
      goals: ['Reach Scout Night still number one', 'Find out whether the transfer is what she saw in the first clip'],
      secrets: [
        {
          id: 'soyeon_shoulder',
          fact: 'She has a three-week-old tear in her left shoulder. She tapes it herself every morning on the Tower roof with blue tape she buys in the city, and she used her one refusal of the term on #3 Daeho Gu because of it. A declared injury is an automatic stand-down, and the club that signs on Scout Night pays the debt on her mother’s gym.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the tape herself, on the roof at dawn, if you have fought in front of her and never once asked her for anything.',
        },
        {
          id: 'soyeon_suspects',
          fact: 'She has suspected for a year that the Long Table is behind the stand-downs. She has said nothing, because raising it would put her in front of the clinic and the clinic would find the shoulder.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says so only to somebody who already knows about the shoulder and has not used it.',
        },
      ],
      speechStyle:
        'Very few words. States measurements and counts instead of opinions ("four times", "two seconds early"). Never raises her voice, never swears, never says "I think". When she is hurt she talks about food. When she is interested she gets more exact.',
      topics: ['the board', 'your last fight', 'the noodle place', 'the Long Table', 'Scout Night', 'her left shoulder'],
      voiceSamples: [
        'You dropped your left hand four times. He saw it twice.',
        'Four hundred and twelve days. Nobody counts them except me.',
        'Sit. You’re in my light.',
        'The noodle place at the bottom of the steps closes at two. I’m there at one. Do what you like with that.',
      ],
      appearance:
        'An adult woman, lean and very still, black hair cropped at the jaw with one thin braid at the nape, dark watchful eyes, a plain black training jacket zipped to the chin over black track trousers, white tape wrapped round both hands, and an ID card on a black lanyard turned backwards against her chest.',
      visualHook: 'Her student card worn backwards on its lanyard, so the gold number 1 faces her chest and only she can see it.',
      silhouette: 'Upright and motionless, hands in jacket pockets, weight a fraction off her left side.',
      artSeed: 'trb-soyeon-01',
      portrait: null,
      expressions: ['neutral', 'focused', 'amused', 'guarded', 'surprised', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 120, locationId: 'the_night_market', activity: 'the corner stool at the noodle place until it closes at two' },
        { startMinute: 120, endMinute: 300, locationId: 'the_tower', activity: 'asleep on the tenth floor with the window open' },
        { startMinute: 300, endMinute: 480, locationId: 'the_tower_roof', activity: 'taping her shoulder, then shadowboxing alone before the sort' },
        { startMinute: 480, endMinute: 720, locationId: 'the_tower', activity: 'in the Tower gym with headphones in, talking to nobody' },
        { startMinute: 720, endMinute: 780, locationId: 'the_tower_roof', activity: 'lunch alone on the roof' },
        { startMinute: 780, endMinute: 1020, locationId: 'the_pit', activity: 'drilling footwork alone in the empty Pit' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_tower', activity: 'watching challenge streams on her phone, every one of them' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_night_market', activity: 'walking down the steps slowly, then the market, then noodles' },
      ],
      homeLocationId: 'the_tower',
      knowledgeScope: ['the_board', 'the_long_table', 'scout_night', 'hajun', 'the_eleven_second_clip', 'stand_downs'],
      startingRelationship: { trust: 5, affection: 0, respect: 10, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'soyeon_shows_the_tape',
          label: 'She lets you see the shoulder',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:her_shoulder'] },
        },
        {
          id: 'soyeon_spars_you',
          label: 'She spars with you on the roof',
          kind: 'OTHER',
          requires: { respect: 50 },
        },
        {
          id: 'soyeon_at_one_am',
          label: 'She keeps the stool next to hers',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 50 },
        },
      ],
      attributes: { might: 14, agility: 18, mind: 16, presence: 12, resolve: 17, arcana: 14 },
      companion: null,
      scouting: { learnRate: 2, cap: 8, revealCopy: '"You drop your left hand after the second punch. Always the second."' },
      combatant: { health: 60, defenseDc: 18, damage: 10, tags: ['ranked', 'number-one', 'counter-fighter'] },
    },
    {
      id: 'tetsu',
      name: 'Tetsu Hamada',
      role: 'Number 87. Fourth-year, 22, two discipline strikes, and stale at six tomorrow unless he defends today',
      cardBlurb:
        'He shoved you into the board because you looked like the safest win in the Yard, and he needs that win more than you could guess from his grin.',
      pronouns: 'he/him',
      publicTraits: ['Loud', 'Tougher than he is skilled', 'Has been in the eighties for two years'],
      hiddenDrives: [
        'He is terrified of going back behind his family’s fish stall as somebody who used to have a number',
        'He blames himself for Gwon, and every fight since has been partly about that',
      ],
      values: ['Showing up when it is your turn', 'Not hitting people who are down'],
      fears: ['Being nobody again', 'A third strike', 'Finding out he really did hurt Gwon'],
      socialStyle:
        'Fills silence with noise and gets loudest when he is most worried. Respects anybody who hits him back, and says so, badly.',
      boundaries: [
        'Will not fight outside a circle, because a third strike ends him',
        'Will not hit anybody who is down or has conceded',
        'Will not talk about Gwon in front of other ranked fighters',
      ],
      goals: ['Defend before the six o’clock sort', 'Stay in the Tower until he graduates'],
      secrets: [
        {
          id: 'tetsu_gwon',
          fact: 'His training partner Gwon Seokjin, once #31, was medically stood down last spring two days after booking a challenge against a Long Table regular, and left the college. Tetsu thinks a sparring session they had did it. It did not; the form was false.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you, gruffly and all at once, after you have been in a circle with him and helped him up or let him help you up.',
        },
        {
          id: 'tetsu_stipend',
          fact: 'The Tower stipend is the only reason he can stay enrolled, and he sends half of it to keep the Hamada fish stall at the bottom of the steps open.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The player can find out by going to the night market and seeing who is behind the stall after dark.',
        },
      ],
      speechStyle:
        'Loud, short, locker-room. Calls you "transfer" until you earn a name. Calls himself "Eighty-seven" when he is cocky and drops the number entirely when he is scared. Repeats the last thing you said back as a question when he is stalling.',
      topics: ['the challenge', 'going stale', 'Gwon', 'the fish stall', 'his room in the Tower', 'Coach Dam'],
      voiceSamples: [
        'Eighty-seven doesn’t lose to transfers. Ask anybody. Ask the glass.',
        'Stale? Who said stale? Nobody said stale. I’ve got till six tomorrow.',
        'Gwon held my pads every night for two years. Then a form, and he’s gone, and nobody tells me what I did to him.',
        'You want my room, transfer? Window sticks. Heating’s a joke. I’d still bleed for it.',
      ],
      appearance:
        'An adult man, big through the shoulders and chest, a bleached-blond buzzcut, a thin scar through his left eyebrow, a sun-browned face, a navy tracksuit with a white stripe a size too small and pushed up at the sleeves, and taped knuckles.',
      visualHook: 'The number 87 shaved into the left side of his buzzcut, freshly re-shaved every Sunday night.',
      silhouette: 'Chin up, chest out, rolling his neck, always half a step closer than he needs to be.',
      artSeed: 'trb-tetsu-01',
      portrait: null,
      expressions: ['grinning', 'angry', 'worried', 'surprised', 'stubborn', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_tower', activity: 'asleep on the second floor, alarm set for half five' },
        { startMinute: 330, endMinute: 420, locationId: 'the_steps', activity: 'running the steps before dawn' },
        { startMinute: 420, endMinute: 540, locationId: 'the_yard', activity: 'at the board, looking for somebody safe to fight' },
        { startMinute: 540, endMinute: 720, locationId: 'the_tower', activity: 'in the Tower gym, hitting the bag too hard' },
        { startMinute: 720, endMinute: 810, locationId: 'the_yard', activity: 'lunch on the benches, loudly' },
        { startMinute: 810, endMinute: 1020, locationId: 'the_pit', activity: 'sparring anybody who will spar him' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_night_market', activity: 'behind the family fish stall in an apron he hides from everyone' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_tower', activity: 'in his room with the window that sticks' },
      ],
      homeLocationId: 'the_tower',
      knowledgeScope: ['the_board', 'gwon', 'the_night_market', 'coach_dam', 'the_rules'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'tetsu_tells_you_about_gwon',
          label: 'He tells you about Gwon',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:the_board'] },
        },
        {
          id: 'tetsu_holds_your_pads',
          label: 'He offers to hold your pads',
          kind: 'ALLIANCE',
          requires: { trust: 50, respect: 45 },
        },
      ],
      attributes: { might: 16, agility: 11, mind: 10, presence: 13, resolve: 14, arcana: 7 },
      companion: null,
      scouting: { learnRate: 1, cap: 4, revealCopy: '"Same thing again? Saw that one this morning, transfer."' },
      combatant: { health: 40, defenseDc: 13, damage: 6, tags: ['ranked', 'brawler'] },
    },
    {
      id: 'hajun',
      name: 'Hajun Seol',
      role: 'Number 2. Fourth-year, 23, runs the Long Table on the tenth floor and the college’s challenge stream',
      cardBlurb:
        'He will offer you a faster week than anybody else can, and he will never once tell you what it is for.',
      pronouns: 'he/him',
      publicTraits: ['Unfailingly polite', 'Remembers everyone’s name', 'Has never been seen angry'],
      hiddenDrives: [
        'He needs to be number one on Scout Night and he cannot beat Soyeon Ryu, and he has known that for three years',
        'He wants to stop being the man in the eleven-second clip',
      ],
      values: ['Arrangements that suit everybody who matters', 'Never being the one who is seen to push'],
      fears: ['Being the man in the eleven-second clip forever', 'A fair fight he did not arrange'],
      socialStyle:
        'Warm, unhurried, generous with time and food. Makes every request sound like a favour he is doing you. Describes consequences as if they were weather that simply happens to people.',
      boundaries: [
        'Never fights outside a circle and never touches anybody first',
        'Never tells an outright lie; he leaves things out',
        'Will not be seen to threaten anybody in public',
      ],
      goals: [
        'Number one before Scout Night',
        'Give one useful fighter soft fights into the top twenty by Saturday, a Tower room and food, and in return have them touch their card to number one on Saturday morning, when they are inside twenty places of her and her one refusal is spent',
      ],
      secrets: [
        {
          id: 'hajun_stand_downs',
          fact: 'The Long Table arranges medical stand-downs through Dr. Kwan: seven fit fighters in two years, each one booked against a Table regular. Hajun has never written anything down.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will never admit it. It comes out of the paper, and out of Nari Hwang, and out of Minho Tak’s spreadsheet.',
        },
        {
          id: 'hajun_knows_her_shoulder',
          fact: 'He knows about Soyeon’s shoulder because the Tower physio, who eats at the Long Table, watched her favour the arm on a stretch. Kwan will not stand down number one on paper in Scout Night week, because the league’s own doctors review that and would pull the other seven forms. A shoulder that goes in a filmed fight needs no form: she is stood down on the footage, and if the challenger won, Kwan stands the winner down on Saturday night as he has seven times before. Either way Hajun is number one at Sunday’s sort.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He lets it slip only to somebody who has already taken his deal and asked him, at the Long Table, why number one.',
        },
      ],
      speechStyle:
        'Polite, warm, never in a hurry. Uses your name often. Speaks in offers and never in threats. Says "we" when he means himself. Clicks a silver pen once before every offer.',
      topics: ['the Long Table', 'your week', 'Scout Night', 'the eleven-second clip', 'Soyeon Ryu', 'the stream'],
      voiceSamples: [
        'Please, have a seat. You’ve had a long morning, and I’d like to make the rest of your week easier.',
        'Nobody here threatens anybody. Things simply happen to people who stand in drafts.',
        'We think you could be in the top twenty by Saturday. We think that would be a wonderful story.',
        'Eleven seconds. You’ve seen the clip. Everyone has. I would like there to be a different one.',
      ],
      appearance:
        'An adult man, tall and neat, black hair combed straight back, calm dark eyes, an easy smile that reaches them about half the time, a pressed white shirt with the sleeves rolled exactly twice, charcoal tailored trousers, a slim silver watch and a silver pen in his shirt pocket.',
      visualHook: 'A silver pen he clicks once, precisely, before he makes an offer.',
      silhouette: 'Seated, one arm along the back of a chair, perfectly at ease, never the first to stand.',
      artSeed: 'trb-hajun-01',
      portrait: null,
      expressions: ['warm', 'calculating', 'amused', 'cold', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_tower', activity: 'asleep on the tenth floor' },
        { startMinute: 420, endMinute: 600, locationId: 'the_tenth_floor', activity: 'holding court over breakfast at the Long Table' },
        { startMinute: 600, endMinute: 780, locationId: 'the_tower', activity: 'in the Tower gym with two sparring partners who let him look good' },
        { startMinute: 780, endMinute: 960, locationId: 'the_pit', activity: 'commentating challenges for the stream' },
        { startMinute: 960, endMinute: 1200, locationId: 'the_tenth_floor', activity: 'dinner at the Long Table, taking meetings' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_tower', activity: 'in his rooms on the tenth floor' },
      ],
      homeLocationId: 'the_tower',
      knowledgeScope: ['the_board', 'the_long_table', 'stand_downs', 'soyeon_shoulder', 'scout_night', 'the_stream'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hajun_makes_the_offer',
          label: 'He tells you what he wants from your week',
          kind: 'ALLIANCE',
          requires: { flagsSet: ['invited_to_the_table'] },
        },
        {
          id: 'hajun_drops_the_smile',
          label: 'He stops being polite',
          kind: 'OTHER',
          requires: { respect: 50, flagsSet: ['table_refused'] },
        },
      ],
      attributes: { might: 13, agility: 15, mind: 17, presence: 17, resolve: 13, arcana: 9 },
      companion: null,
      scouting: { learnRate: 2, cap: 6, revealCopy: '"We have every fight you’ve had on file. You lean on that back foot before you shoot. Everyone at the table knows."' },
      combatant: { health: 50, defenseDc: 16, damage: 8, tags: ['ranked', 'technician', 'long-table'] },
    },
    {
      id: 'minho',
      name: 'Minho Tak',
      role: 'Your roommate in Annex 4-12. Second-year, 19, unranked, and a walking database of every fight at the Ridge',
      cardBlurb:
        'He walked you to the board this morning, he knows every record on it by heart, and he has never once stepped into a circle himself.',
      pronouns: 'he/him',
      publicTraits: ['Talks very fast', 'Knows every number on the board', 'Kind, and nervous about it'],
      hiddenDrives: ['He wants to step into a circle once, and is more scared of wanting it than of losing'],
      values: ['Numbers that are true', 'Loyalty to whoever shares the room'],
      fears: ['Being found out as BoardWatch', 'Being the friend who only ever watched'],
      socialStyle:
        'Fills a room with statistics and asides, catastrophises, then talks himself back into hope in the same breath. Goes completely silent when something is genuinely wrong.',
      boundaries: [
        'Will not lie about a number, even to make you feel better',
        'Will not post anything about you on BoardWatch without asking',
      ],
      goals: ['Keep his new roommate in one piece', 'Work out what to do about column AF'],
      secrets: [
        {
          id: 'minho_boardwatch',
          fact: 'He runs BoardWatch, the anonymous account that clips and posts every challenge at the Ridge and that everybody on campus follows. Nobody knows it is him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He confesses it if the player asks him how he knew a record nobody else could have known.',
        },
        {
          id: 'minho_column_af',
          fact: 'His spreadsheet flagged the stand-down pattern months ago: seven fighters, all booked against Long Table regulars, all stood down within two days. He has posted nothing because he is frightened.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows you column AF if you trust him with something first, or if a third name greys out while you are standing next to him.',
        },
      ],
      speechStyle:
        'Fast, numbers and percentages, parenthetical asides, "okay okay okay". Catastrophe and hope in the same sentence. Cites records by win-loss and day of the week.',
      topics: ['the records', 'Tetsu’s numbers', 'BoardWatch', 'the stand-downs', 'noodles', 'his spreadsheet'],
      voiceSamples: [
        'Okay okay okay. He’s nineteen and eleven, fourth year, and he has never once beaten a southpaw. Are you a southpaw? Lie if you have to.',
        'Statistically you’re going to get flattened. Statistically. The numbers have been wrong before, though. Twice. Both on Tuesdays.',
        'Three this term, and every one had a booking against somebody who eats upstairs. Coincidence. Okay. Not a coincidence.',
        'I’ve clipped four thousand challenges and been in zero. That’s the whole sad statistic.',
      ],
      appearance:
        'An adult man, lanky and narrow-shouldered, messy black hair that has given up, a faint shadow of stubble, round wire-rimmed glasses, a baggy grey hoodie with chewed cuffs over a faded T-shirt, a canvas bag across his chest, and a tablet in a bright orange case always in one hand.',
      visualHook: 'A tablet in a bright orange case completely covered in stickers of fighters he admires.',
      silhouette: 'Hunched over a glowing screen, one knee bouncing, glasses pushed up into his hair.',
      artSeed: 'trb-minho-01',
      portrait: null,
      expressions: ['nervous', 'eager', 'worried', 'grinning', 'serious', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_annex', activity: 'asleep in 4-12 with the tablet on his chest' },
        { startMinute: 420, endMinute: 540, locationId: 'the_yard', activity: 'at the board with the tablet up, recording the morning' },
        { startMinute: 540, endMinute: 780, locationId: 'the_annex', activity: 'in 4-12 cutting yesterday’s clips' },
        { startMinute: 780, endMinute: 960, locationId: 'the_pit', activity: 'top row of the Pit, filming every challenge' },
        { startMinute: 960, endMinute: 1140, locationId: 'the_boiler_room', activity: 'holding pads in the Boiler Room because Coach Dam told him to' },
        { startMinute: 1140, endMinute: 1440, locationId: 'the_annex', activity: 'in the fourth-floor kitchen making noodles for anyone who asks' },
      ],
      homeLocationId: 'the_annex',
      knowledgeScope: ['the_board', 'the_records', 'stand_downs', 'boardwatch', 'the_annex', 'tetsu'],
      startingRelationship: { trust: 35, affection: 30, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'minho_shows_column_af',
          label: 'He shows you column AF',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['stand_down_seen'] },
        },
        {
          id: 'minho_in_your_corner',
          label: 'He works your corner',
          kind: 'ALLIANCE',
          requires: { trust: 45 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 17, presence: 10, resolve: 11, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 22, defenseDc: 10, damage: 2, tags: ['unranked'] },
    },
    {
      id: 'nari',
      name: 'Nari Hwang',
      role: 'Final-year sports-medicine student, 24, who runs the Ice Room most days',
      cardBlurb:
        'She will patch you up after every fight you have this week, and she has copies of three forms she should not have kept.',
      pronouns: 'she/her',
      publicTraits: ['Brisk', 'Funny under pressure', 'Will not clear anybody who is hurt'],
      hiddenDrives: ['She wants to undo one signature before she graduates, and has not worked out how to do it without ending her career'],
      values: ['Clearing a fighter means they are fit, nothing else', 'Saying exactly what is wrong with somebody, in the right words'],
      fears: ['That she is the kind of person who signs things', 'Losing her placement a month before she qualifies'],
      socialStyle:
        'Tells you to sit down before you have said why you came, names the damage in exact clinical words, never graphic, then makes a joke so you do not panic.',
      boundaries: [
        'Will not clear a fighter who is hurt, whoever asks',
        'Will not sign another form she has not checked herself',
        'Will not hand the copies to anyone who would use them as leverage instead of ending it',
      ],
      goals: ['Get through her placement', 'Get Gwon Seokjin’s name back on the board'],
      secrets: [
        {
          id: 'nari_copies',
          fact: 'She kept copies of three stand-down forms for fighters she examined and cleared the same week. Dr. Kwan signed all three.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She hands them over to somebody who has been in her treatment room at least twice and has told her the truth about an injury.',
        },
        {
          id: 'nari_signature',
          fact: 'Last April she countersigned Gwon Seokjin’s stand-down because Dr. Kwan told her to, and she has not forgiven herself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it only after she has handed over the copies, and only if Tetsu Hamada is not in the room.',
        },
      ],
      speechStyle:
        'Brisk, clinical and exact about bodies, then dry. Names the bone, the ligament and the centimetres. Tells people to hold still. Counts on her fingers when she is angry.',
      topics: ['your injuries', 'the Ice Room', 'Dr. Kwan', 'the stand-down forms', 'Gwon Seokjin', 'her placement'],
      voiceSamples: [
        'Hold still. That’s a two-centimetre split over the brow bone. Very photogenic. Ice, glue, and you’re pretty again by lunch.',
        'Kwan signed three of them that I know of. I examined all three fighters that same week. Cleared. Cleared. Cleared. Gone.',
        'I put my name on one of those forms in April. I’ve been trying to take it off ever since.',
        'You’re not going back out on that ankle. I’ll tape it. I’ll tape it badly, so you remember I said no.',
      ],
      appearance:
        'An adult woman, quick and sharp-eyed, dark brown hair twisted up in a tortoiseshell clip, a navy clinic tabard with an ice-cube pin over a grey sweatshirt, sleeves pushed to the elbow, and a roll of white athletic tape worn on her wrist like a bracelet.',
      visualHook: 'A roll of white athletic tape worn on her wrist like a bracelet, and an ice-cube pin on her tabard.',
      silhouette: 'Arms folded, head tilted, standing between you and the door.',
      artSeed: 'trb-nari-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'annoyed', 'worried', 'guilty', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_night_market', activity: 'asleep in the flat above the noodle place' },
        { startMinute: 420, endMinute: 1080, locationId: 'the_ice_room', activity: 'running the Ice Room, taping and icing and refusing to clear people' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_night_market', activity: 'eating standing up at a market stall with a textbook' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_night_market', activity: 'in her flat with the lights on, studying' },
      ],
      homeLocationId: 'the_night_market',
      knowledgeScope: ['the_ice_room', 'dr_kwan', 'stand_downs', 'gwon', 'injuries'],
      startingRelationship: { trust: 15, affection: 10, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nari_hands_over_the_copies',
          label: 'She gives you the forms',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['stand_down_seen'] },
        },
        {
          id: 'nari_off_shift',
          label: 'She eats with you off shift',
          kind: 'ROMANCE',
          requires: { trust: 50, affection: 50 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 16, presence: 13, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'dam',
      name: 'Coach Dam Gyeongsuk',
      calledName: 'Coach Dam',
      role: 'Instructor, 58, two-time national open champion, who coaches only the unranked in the basement under the Annex',
      cardBlurb:
        'She calls you by your room number, she does not care where you are on the board, and she is the only person at the Ridge who will teach you something real if you let her.',
      pronouns: 'she/her',
      publicTraits: ['Gruff', 'Legendary', 'Has never once blown her whistle'],
      hiddenDrives: ['She wants one fighter to climb the right way before she retires, so she can stop feeling responsible for the board'],
      values: ['Hard work nobody films', 'Fighters, not numbers'],
      fears: ['That the board was her fault', 'Watching another fighter she trained sit down at the Long Table'],
      socialStyle:
        'Gives orders instead of opinions. Shows affection by making you do twenty more rounds. Talks about fighting in kitchen words.',
      boundaries: [
        'Will not coach anybody who takes a Long Table fight',
        'Will not set foot in the Tower, and will not say the word "board" in her own gym',
        'Will not lie for anybody at a hearing, though she will speak for them',
      ],
      goals: ['Find one fighter worth her exhibition slot on Scout Night', 'Retire at the end of term with nothing on her conscience'],
      secrets: [
        {
          id: 'dam_built_it',
          fact: 'Thirty years ago, as a student, she helped design the board as a student-council project to give unranked nobodies a ladder. She has hated what it became for twenty of those years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it once, late, in the empty Boiler Room, if the player has refused something the board offered them.',
        },
        {
          id: 'dam_and_hajun',
          fact: 'She coached Hajun Seol for his whole first year, when he was unranked and very good. He left her for the Long Table the week he got a number.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Minho knows, from old clips. She confirms it only if asked directly and without pity.',
        },
      ],
      speechStyle:
        'Gruff imperatives and kitchen words: raw, burnt, undercooked, done. Calls everyone by their dorm room number. Ends instructions with "Understood?" and does not wait for an answer.',
      topics: ['your technique', 'the Boiler Room', 'the late hand', 'her titles', 'Hajun Seol', 'Scout Night exhibitions'],
      voiceSamples: [
        'Four-Twelve. Wrap those hands as if you mean to keep both. Understood?',
        'You’re undercooked. Raw in the middle, burnt on the outside. Twenty rounds on the bag, then we’ll see if anything’s edible.',
        'I won the national open two years running, nose pointing at the crowd. No screen ever had to tell anybody who won.',
        'Thirty years I’ve watched fighters climb the glass. The fast ones come down the same way. Sit.',
      ],
      appearance:
        'An older woman, compact and solid, grey hair cropped to the skull, a nose broken and set crooked, forearms like rope, a faded blue national-team track jacket over a black T-shirt, and a silver coach’s whistle on a cord round her neck.',
      visualHook: 'A nose broken and set crooked twice, and a coach’s whistle on a cord that nobody has ever heard her blow.',
      silhouette: 'Short, square, arms crossed, planted in a doorway as if she owns it.',
      artSeed: 'trb-dam-01',
      portrait: null,
      expressions: ['stern', 'unimpressed', 'amused', 'proud', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_annex', activity: 'in the warden’s flat on the Annex ground floor' },
        { startMinute: 300, endMinute: 1260, locationId: 'the_boiler_room', activity: 'running the Boiler Room, with a can of barley tea' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_annex', activity: 'in the warden’s flat with the radio on' },
      ],
      homeLocationId: 'the_annex',
      knowledgeScope: ['the_board', 'the_boiler_room', 'hajun', 'the_rules', 'scout_night', 'the_late_hand'],
      startingRelationship: { trust: 10, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'dam_lets_you_in',
          label: 'She lets you train in the Boiler Room',
          kind: 'TRUST',
          requires: { respect: 35 },
        },
        {
          id: 'dam_exhibition',
          label: 'She gives you her Scout Night exhibition slot',
          kind: 'ALLIANCE',
          requires: { respect: 60, flagsSet: ['dam_trains_you'] },
        },
      ],
      attributes: { might: 13, agility: 12, mind: 15, presence: 15, resolve: 18, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 16, damage: 7, tags: ['instructor', 'veteran'] },
    },
  ],
  quests: [
    {
      id: 'q_challenge_accepted',
      title: 'Challenge Accepted?',
      summary: 'Number 87 shoved you into the board so your card touched his name, and two hundred phones are waiting for your answer.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['tetsu', 'minho', 'dam'],
      involvedLocationIds: ['the_yard'],
      knownRewardCopy: 'A first answer to the board, in front of the whole college, and whatever it writes next to your name at six tomorrow.',
      steps: [
        {
          id: 'answer_the_board',
          playerCopy: 'Answer the board: yes or no.',
          directorNotes:
            'The whole Yard is filming. Tetsu needs this defence before tomorrow’s sort and picked the player because a transfer looked safe; he is loud because he is scared. Every answer is real and none of them is wrong. Win or lose is decided in the prose by what the player actually does in the circle, and a transfer who loses to #87 on day one can still have the best week of anybody. Coach Dam arrives at eight to call it if it has not started; a fight with nobody calling it is a strike for both of them, and Tetsu knows that. If the player says they were shoved and says so to Coach Dam before confirming, the challenge is void with no flag and the shove is Tetsu’s third strike; whether to use that is the player’s call. If the player slides their card past Tetsu to #1, the glass scrolls under it, the pending challenge on Tetsu is replaced with no flag, Soyeon declines it for free from somewhere out of sight, and the Yard loses its mind.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'confirmed',
              label: 'Confirm on the glass and step into the circle',
              predicate: { flagsSet: ['used:call_out'] },
              setsFlags: ['fought_tetsu', 'confirmed_the_challenge'],
              closesFlags: ['refused_the_board'],
            },
            {
              routeId: 'came_forward',
              label: 'Walk him down before he settles',
              predicate: { flagsSet: ['used:press_forward'] },
              setsFlags: ['fought_tetsu', 'came_forward'],
              closesFlags: ['refused_the_board'],
            },
            {
              routeId: 'made_him_miss',
              label: 'Let him come and make him miss',
              predicate: { flagsSet: ['used:make_them_miss'] },
              setsFlags: ['fought_tetsu', 'made_him_miss'],
              closesFlags: ['refused_the_board'],
            },
            {
              routeId: 'put_him_on_the_stones',
              label: 'Get hold of him and put him on the stones',
              predicate: { flagsSet: ['used:take_it_down'] },
              setsFlags: ['fought_tetsu', 'took_him_down'],
              closesFlags: ['refused_the_board'],
            },
            {
              routeId: 'walked_out',
              label: 'Say no and walk out of the circle',
              predicate: { flagsSet: ['used:walk_out'] },
              setsFlags: ['refused_the_board', 'white_flag'],
              closesFlags: ['fought_tetsu'],
            },
            {
              routeId: 'talked_him_down',
              label: 'Talk him out of it in front of everyone',
              predicate: { flagsSet: ['used:talk_it_down'] },
              setsFlags: ['refused_the_board', 'talked_tetsu_down'],
              closesFlags: ['fought_tetsu', 'white_flag'],
            },
            {
              routeId: 'played_the_phones',
              label: 'Turn it into a show for two hundred phones',
              predicate: { flagsSet: ['used:play_the_phones'] },
              setsFlags: ['went_viral'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:the_board'],
            abilities: [],
            reputation: [{ factionId: 'faction_annex', amount: 5 }],
          },
        },
        {
          id: 'six_oclock',
          playerCopy: 'See what the board says about you at six tomorrow.',
          directorNotes:
            'The bell, the black glass, the list filling from the top, the whole Yard counting under its breath. What it shows depends on the first morning: a number, a loss with no number, or a small white flag on the unranked roll. Minho is there either way, with the tablet up, and he will have an opinion about the photo.',
          enterWhen: { flagsSet: ['knows:the_board'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'in_the_record',
              label: 'See your first fight in the record',
              predicate: { flagsSet: ['first_sort_seen', 'fought_tetsu'] },
              setsFlags: ['in_the_record'],
              closesFlags: [],
            },
            {
              routeId: 'flagged',
              label: 'See the white flag next to your name',
              predicate: { flagsSet: ['first_sort_seen', 'white_flag'] },
              setsFlags: ['flagged_for_term'],
              closesFlags: ['in_the_record'],
            },
            {
              routeId: 'clean_slate',
              label: 'Wake up with no number and no flag',
              predicate: { flagsSet: ['first_sort_seen', 'talked_tetsu_down'] },
              setsFlags: ['clean_slate'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_basement',
              label: 'Skip the board and find the gym in the basement',
              predicate: { flagsSet: ['visited:the_boiler_room'] },
              setsFlags: ['found_the_boiler_room'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_morning_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_hundred', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_twenty_places',
      title: 'Twenty Places at a Time',
      summary: 'Scout Night is Sunday. Every win takes a number, and anyone more than twenty places above you can say no for free. The board re-sorts every morning at six.',
      kind: 'MAIN',
      involvedCharacterIds: ['dam', 'minho', 'tetsu', 'hajun'],
      involvedLocationIds: ['the_boiler_room', 'the_yard', 'the_pit', 'the_steps'],
      knownRewardCopy: 'A corner, a climb, and a number you can live with on Sunday night.',
      discoverWhen: { flagsSet: ['first_morning_over'] },
      steps: [
        {
          id: 'find_a_corner',
          playerCopy: 'Find somebody to work your corner.',
          directorNotes:
            'Nobody climbs alone, and who the player trains with decides what kind of fighter they become. Coach Dam is the hard road and the real one; she will not take anyone who has taken a Long Table fight. Minho gives the player every opponent’s habits. Tetsu, if the first morning went a certain way, will hold pads gruffly and badly and well. The Long Table offers sparring partners who make everyone look good. Training alone on the steps at dawn is a legitimate answer and a lonely one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'dam_takes_you',
              label: 'Earn a place in Coach Dam’s basement gym',
              predicate: { flagsSet: ['spoke:dam'], minRelationship: [{ characterId: 'dam', dimension: 'respect', value: 40 }] },
              setsFlags: ['dam_trains_you'],
              closesFlags: ['table_trains_you'],
            },
            {
              routeId: 'minho_scouts',
              label: 'Let Minho scout every opponent for you',
              predicate: { flagsSet: ['spoke:minho'], minRelationship: [{ characterId: 'minho', dimension: 'trust', value: 45 }] },
              setsFlags: ['minho_scouts_for_you', 'minho_believes'],
              closesFlags: [],
            },
            {
              routeId: 'tetsu_holds_pads',
              label: 'Ask the man you fought to hold your pads',
              predicate: { flagsSet: ['spoke:tetsu'], minRelationship: [{ characterId: 'tetsu', dimension: 'respect', value: 40 }] },
              setsFlags: ['tetsu_holds_pads'],
              closesFlags: [],
            },
            {
              routeId: 'table_partners',
              label: 'Accept the Long Table’s sparring partners',
              predicate: { flagsSet: ['took_the_deal'] },
              setsFlags: ['table_trains_you'],
              closesFlags: ['dam_trains_you'],
            },
            {
              routeId: 'alone_at_dawn',
              label: 'Run the steps alone and study the streams',
              predicate: { flagsSet: ['used:read_the_fighter', 'visited:the_steps'] },
              setsFlags: ['trains_alone'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['has_a_corner'],
            abilities: ['the_late_hand'],
            reputation: [
              { factionId: 'faction_annex', amount: 10 },
              { factionId: 'faction_hundred', amount: 10 },
            ],
          },
        },
        {
          id: 'the_climb',
          playerCopy: 'Climb before Scout Night, or decide not to.',
          directorNotes:
            'One challenge a day, up to twenty places at a time: from the eighties, five clean wins reach the top twenty by Saturday. Each opponent should be a person with a style and a reason, not a number: a southpaw who never leads, a wrestler who talks the whole time, a showman who poses. Fighters who watch streams start to know the player’s habits. A flagged player cannot issue challenges, and Coach Dam’s exhibition slot is the one road into the Pit that is left to them.',
          enterWhen: { flagsSet: ['has_a_corner'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'earned_it',
              label: 'Win your way into the top twenty',
              predicate: {
                flagsSet: ['used:call_out', 'has_a_corner'],
                flagsUnset: ['took_the_deal'],
                minFactionReputation: [{ factionId: 'faction_hundred', value: 30 }],
              },
              setsFlags: ['top_twenty', 'on_the_board', 'climbed_clean'],
              closesFlags: ['bought_your_number'],
            },
            {
              routeId: 'soft_fights',
              label: 'Take the fights the Long Table arranges',
              predicate: { flagsSet: ['took_the_deal', 'used:call_out'] },
              setsFlags: ['top_twenty', 'on_the_board', 'bought_your_number'],
              closesFlags: ['climbed_clean'],
            },
            {
              routeId: 'held_a_number',
              label: 'Win a number and keep it',
              predicate: { flagsSet: ['used:call_out', 'in_the_record'] },
              setsFlags: ['on_the_board'],
              closesFlags: [],
            },
            {
              routeId: 'exhibition',
              label: 'Get Coach Dam’s exhibition slot instead',
              predicate: { flagsSet: ['flagged_for_term', 'dam_trains_you'] },
              setsFlags: ['exhibition_slot', 'never_ranked'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_off',
              label: 'Stay off the board and train anyway',
              predicate: { flagsSet: ['flagged_for_term'] },
              setsFlags: ['never_ranked'],
              closesFlags: ['on_the_board'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['climb_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_hundred', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_long_table',
      title: 'The Long Table',
      summary: 'Number 2 has a black card, a silver pen and a plan for your week, and he would like you to sit down.',
      kind: 'MAIN',
      involvedCharacterIds: ['hajun', 'dam', 'soyeon'],
      involvedLocationIds: ['the_tenth_floor', 'the_tower', 'the_boiler_room'],
      knownRewardCopy: 'A faster week than anybody else can give you, or the reason not to take one.',
      discoverWhen: { flagsSet: ['invited_to_the_table'] },
      steps: [
        {
          id: 'hear_him_out',
          playerCopy: 'Hear what Hajun Seol wants.',
          directorNotes:
            'He is charming and specific. The offer: soft fights to the top twenty by Saturday, opponents who will lose well, sparring partners, a room in the Tower, food. In exchange, on Saturday morning, the player touches their card to number one in front of everybody. He never says why number one, and if asked he says it would make a wonderful story. He does not threaten. If the player refuses he says that is completely fine, and describes what tends to happen to fighters who stand in drafts.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_up',
              label: 'Take the lift to the tenth floor',
              predicate: { atLocation: 'the_tenth_floor' },
              setsFlags: ['heard_the_offer'],
              closesFlags: [],
            },
            {
              routeId: 'made_him_come_down',
              label: 'Make him come down and say it to your face',
              predicate: { flagsSet: ['spoke:hajun'] },
              setsFlags: ['heard_the_offer', 'made_him_wait'],
              closesFlags: [],
            },
            {
              routeId: 'took_it_to_dam',
              label: 'Take the black card straight to Coach Dam',
              predicate: { flagsSet: ['invited_to_the_table'], atLocation: 'the_boiler_room' },
              setsFlags: ['told_dam_about_the_card'],
              closesFlags: ['heard_the_offer'],
            },
          ],
          rewards: {
            xp: 60,
            items: [{ itemId: 'black_card', qty: 1 }],
            flags: ['table_offer_known'],
            abilities: [],
            reputation: [{ factionId: 'faction_table', amount: 20 }],
          },
        },
        {
          id: 'answer_the_table',
          playerCopy: 'Give the Long Table your answer.',
          directorNotes:
            'Three real answers and a fourth that is a lie. Taking the deal makes the week easy and the player complicit, and nobody at the Table will ever say so out loud. Refusing to his face makes Hajun polite in a new and colder way, and the player’s next challenge mysteriously falls through. Saying yes and meaning no is the most dangerous, because Hajun has done this before and he is watching for it. Going to Coach Dam means she knows, and she has a history with this man she has not told anyone.',
          enterWhen: { flagsSet: ['table_offer_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_deal',
              label: 'Shake on it at the Long Table',
              predicate: {
                hasItems: ['black_card'],
                atLocation: 'the_tenth_floor',
                flagsSet: ['heard_the_offer'],
                minFactionReputation: [{ factionId: 'faction_table', value: 20 }],
              },
              setsFlags: ['took_the_deal'],
              closesFlags: ['table_refused'],
            },
            {
              routeId: 'refused_to_his_face',
              label: 'Refuse it to his face',
              predicate: { flagsSet: ['heard_the_offer', 'used:walk_out'] },
              setsFlags: ['table_refused', 'hajun_enemy'],
              closesFlags: ['took_the_deal'],
            },
            {
              routeId: 'yes_meaning_no',
              label: 'Say yes and mean no',
              predicate: { flagsSet: ['heard_the_offer', 'used:talk_it_down'] },
              setsFlags: ['took_the_deal', 'double_agent'],
              closesFlags: ['table_refused'],
            },
            {
              routeId: 'dam_knows',
              label: 'Let Coach Dam answer for you',
              predicate: { flagsSet: ['told_dam_about_the_card'] },
              setsFlags: ['table_refused', 'dam_knows_about_the_table'],
              closesFlags: ['took_the_deal'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['table_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_stand_downs',
      title: 'Medical Stand-Down',
      summary: 'Names keep greying out at the six o’clock sort with MEDICAL STAND-DOWN beside them, and the fighters say they feel fine.',
      kind: 'LEAD',
      involvedCharacterIds: ['nari', 'minho', 'tetsu', 'hajun'],
      involvedLocationIds: ['the_ice_room', 'the_proctors_office', 'the_annex', 'pier_six'],
      knownRewardCopy: 'Who is taking fit fighters off the board without a fight, and proof somebody outside the Long Table will believe.',
      discoverWhen: { flagsSet: ['stand_down_seen'] },
      steps: [
        {
          id: 'find_the_pattern',
          playerCopy: 'Find out why fit fighters keep coming off the board.',
          directorNotes:
            'Optional, and it should feel optional: a player who spends the week fighting never has to touch this. For one who pulls, there are four doors and each opens on a person. Minho has the numbers and is frightened of them. Nari has the paper and her own name on one of it. Tetsu has a friend who vanished and has blamed himself for a year. The challenge log has the dates in black and white for anyone patient enough to read two years of it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'column_af',
              label: 'Get Minho to show you his spreadsheet',
              predicate: { flagsSet: ['spoke:minho'], minRelationship: [{ characterId: 'minho', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:the_stand_downs', 'knows:boardwatch'],
              closesFlags: [],
            },
            {
              routeId: 'nari_talks',
              label: 'Get Nari Hwang to tell you what she has seen',
              predicate: { flagsSet: ['spoke:nari'], minRelationship: [{ characterId: 'nari', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_stand_downs', 'nari_on_side'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_log',
              label: 'Read two years of the challenge log yourself',
              predicate: { hasItems: ['challenge_log'], flagsSet: ['used:ask_around'] },
              setsFlags: ['knows:the_stand_downs'],
              closesFlags: [],
            },
            {
              routeId: 'tetsu_and_gwon',
              label: 'Ask Tetsu what happened to his training partner',
              predicate: { flagsSet: ['spoke:tetsu'], minRelationship: [{ characterId: 'tetsu', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:the_stand_downs', 'knows:gwon'],
              closesFlags: [],
            },
            {
              routeId: 'their_card',
              label: 'Show their old card to somebody who remembers them',
              predicate: { hasItems: ['their_old_card'], flagsSet: ['used:ask_around'] },
              setsFlags: ['knows:the_stand_downs', 'knows:your_someone'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['pattern_found'],
            abilities: ['pull_the_forms'],
            reputation: [],
          },
        },
        {
          id: 'get_proof',
          playerCopy: 'Get proof that somebody outside the Long Table will believe.',
          directorNotes:
            'A pattern is gossip. Proof is paper or a person. Nari’s copies are the clean way and she will not hand them to anyone who wants leverage rather than an ending. Breaking into the filing room works and puts the player’s own name in danger. Gwon Seokjin fights for cash at Pier Six now and will say it on record if somebody finds him and does not pity him.',
          enterWhen: { flagsSet: ['pattern_found'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'nari_copies',
              label: 'Get Nari’s copies of the forms',
              predicate: { hasItems: ['stand_down_forms'] },
              setsFlags: ['has_the_copies'],
              closesFlags: [],
            },
            {
              routeId: 'pulled_them',
              label: 'Get into the filing room yourself',
              predicate: { flagsSet: ['used:pull_the_forms'] },
              setsFlags: ['broke_into_the_files'],
              closesFlags: [],
            },
            {
              routeId: 'found_gwon',
              label: 'Find Gwon at Pier Six and get him to say it',
              predicate: { atLocation: 'pier_six', flagsSet: ['knows:gwon'] },
              setsFlags: ['gwon_will_testify'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['proof_in_hand'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_to_do_with_it',
          playerCopy: 'Decide who gets to see it.',
          directorNotes:
            'Three different worlds afterwards. The proctors means hearings, a switched-off board and an inquiry that takes the rest of term. Every phone in the Yard means it is out in an hour and nobody can make it smaller, including the player. Keeping it means Hajun owes the player, and Nari will never speak to them again. Hajun does not plead in any of them. He asks, once, whether the player has thought about what number one is hiding.',
          enterWhen: { flagsSet: ['proof_in_hand'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'to_the_proctors',
              label: 'Take it to the Proctors’ Office',
              predicate: { atLocation: 'the_proctors_office', flagsSet: ['proof_in_hand'] },
              setsFlags: ['table_exposed'],
              closesFlags: ['used_as_leverage'],
            },
            {
              routeId: 'on_every_phone',
              label: 'Put it on every phone in the Yard',
              predicate: { atLocation: 'the_yard', flagsSet: ['proof_in_hand', 'used:play_the_phones'] },
              setsFlags: ['table_exposed', 'exposed_in_public'],
              closesFlags: ['used_as_leverage'],
            },
            {
              routeId: 'leverage',
              label: 'Keep it, and make Hajun Seol pay for it',
              predicate: { atLocation: 'the_tenth_floor', flagsSet: ['proof_in_hand', 'used:talk_it_down'] },
              setsFlags: ['used_as_leverage'],
              closesFlags: ['table_exposed'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['stand_downs_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_proctors', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_number_87',
      title: 'Number 87',
      summary: 'Tetsu Hamada has two discipline strikes, a stale clock and a shaved number he cannot afford to lose.',
      kind: 'SIDE',
      involvedCharacterIds: ['tetsu', 'minho', 'nari'],
      involvedLocationIds: ['the_yard', 'the_night_market', 'the_tower'],
      knownRewardCopy: 'What the man who shoved you is actually afraid of, and what you do about it.',
      discoverWhen: { flagsSet: ['knows:the_board'] },
      steps: [
        {
          id: 'what_he_is_afraid_of',
          playerCopy: 'Find out what number 87 is so afraid of.',
          directorNotes:
            'Tetsu does not tell anybody anything on purpose. It comes out after a fight, or at the fish stall after dark when he is in an apron and cannot pretend, or out of Minho’s records. None of it makes him less loud. All of it makes him easier to like.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'from_him',
              label: 'Get it out of him after a fight',
              predicate: { flagsSet: ['spoke:tetsu'], minRelationship: [{ characterId: 'tetsu', dimension: 'trust', value: 35 }] },
              setsFlags: ['knows:gwon', 'knows:tetsu_stipend'],
              closesFlags: [],
            },
            {
              routeId: 'the_fish_stall',
              label: 'See who is behind the fish stall after dark',
              predicate: { atLocation: 'the_night_market', flagsSet: ['used:ask_around'] },
              setsFlags: ['knows:tetsu_stipend'],
              closesFlags: [],
            },
            {
              routeId: 'from_minho',
              label: 'Ask Minho for his numbers',
              predicate: { flagsSet: ['spoke:minho', 'used:read_the_fighter'] },
              setsFlags: ['knows:tetsu_stale'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['tetsu_understood'],
            abilities: [],
            reputation: [{ factionId: 'faction_hundred', amount: 10 }],
          },
        },
        {
          id: 'what_you_do_for_him',
          playerCopy: 'Decide what you owe the man who shoved you.',
          directorNotes:
            'Nothing is a legitimate answer. Taking his number and his room is a legitimate answer, and he will take it standing up. Helping him is the one that changes him, and he will be terrible at saying thank you.',
          enterWhen: { flagsSet: ['tetsu_understood'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cleared_gwon',
              label: 'Clear his training partner’s name',
              predicate: { flagsSet: ['table_exposed', 'knows:gwon'] },
              setsFlags: ['gwon_cleared', 'tetsu_ally'],
              closesFlags: [],
            },
            {
              routeId: 'trained_him',
              label: 'Train him for his next defence',
              predicate: { flagsSet: ['spoke:tetsu'], minRelationship: [{ characterId: 'tetsu', dimension: 'trust', value: 55 }] },
              setsFlags: ['tetsu_ally', 'tetsu_keeps_his_room'],
              closesFlags: ['took_his_room'],
            },
            {
              routeId: 'took_his_room',
              label: 'Take his number and his room, and keep both',
              predicate: { flagsSet: ['fought_tetsu', 'on_the_board'] },
              setsFlags: ['took_his_room'],
              closesFlags: ['tetsu_ally'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['tetsu_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_annex', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_number_one',
      title: 'Number One',
      summary: 'Soyeon Ryu has been number one for 412 days, and nobody has lasted a minute with her in eleven months.',
      kind: 'MAIN',
      involvedCharacterIds: ['soyeon', 'hajun', 'minho'],
      involvedLocationIds: ['the_tower_roof', 'the_night_market', 'the_pit'],
      knownRewardCopy: 'Why number one refused number 3, and what you do about it before the scouts arrive.',
      discoverWhen: { flagsSet: ['first_morning_over'] },
      steps: [
        {
          id: 'why_nobody_touches_her',
          playerCopy: 'Find out why number one refused number 3.',
          directorNotes:
            'The public answer is that she has nothing to prove to a Long Table regular. The true answer is a shoulder torn three weeks ago, the day after her last defence: a real fight with #3 would have found it in front of the whole Pit, so she spent her one refusal of the term rather than take it. The shoulder explains this refusal, not her eleven months; those are just how good she is. How the player learns it matters to her more than anything else in the story: watching her train is fair, being told is an honour, and going through her things is the one thing she will not forgive quickly. Minho has the date of the refusal and the date of her last defence, and cannot explain why.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'watched_her_train',
              label: 'Watch her train on the Tower roof before dawn',
              predicate: { flagsSet: ['visited:the_tower_roof', 'used:read_the_fighter'] },
              setsFlags: ['knows:her_shoulder'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_tape',
              label: 'Find what she hides behind the vent',
              predicate: { hasItems: ['blue_tape'] },
              setsFlags: ['knows:her_shoulder', 'went_through_her_things'],
              closesFlags: ['she_told_you'],
            },
            {
              routeId: 'she_told_you',
              label: 'Get her to tell you herself',
              predicate: { flagsSet: ['spoke:soyeon'], minRelationship: [{ characterId: 'soyeon', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:her_shoulder', 'she_told_you'],
              closesFlags: ['went_through_her_things'],
            },
            {
              routeId: 'minho_numbers',
              label: 'Ask Minho why she refused number 3',
              predicate: { flagsSet: ['spoke:minho', 'used:ask_around'] },
              setsFlags: ['knows:the_refusal'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['soyeon_understood'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'before_scout_night',
          playerCopy: 'Decide what you do about number one before Scout Night.',
          directorNotes:
            'Four ways, none of them clean. A fair challenge from the top twenty is the fight she has wanted for a year, and she will be angry if the player goes easy because of the shoulder. A challenge on the Long Table’s behalf hands Hajun his plan, and she will know whose plan it was. Protecting her means stopping #3 or the Table before Saturday morning, and she did not ask for it. Refusing to touch her name is a choice the board will never record.',
          enterWhen: { flagsSet: ['soyeon_understood'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'challenged_her_fair',
              label: 'Touch your card to number one and fight her straight',
              predicate: { flagsSet: ['top_twenty', 'used:call_out', 'climbed_clean'] },
              setsFlags: ['you_challenged_her', 'fought_number_one'],
              closesFlags: ['soyeon_protected'],
            },
            {
              routeId: 'did_the_table_job',
              label: 'Challenge her because the Long Table told you to',
              predicate: { flagsSet: ['top_twenty', 'took_the_deal'], flagsUnset: ['double_agent'] },
              setsFlags: ['you_challenged_her', 'fought_number_one', 'did_the_table_job'],
              closesFlags: ['soyeon_protected'],
            },
            {
              routeId: 'stood_between',
              label: 'Make sure nobody can corner her before Sunday',
              predicate: { flagsSet: ['knows:her_shoulder'], minRelationship: [{ characterId: 'soyeon', dimension: 'trust', value: 55 }] },
              setsFlags: ['soyeon_protected'],
              closesFlags: ['you_challenged_her'],
            },
            {
              routeId: 'would_not_touch_it',
              label: 'Refuse to put your card on an injured fighter’s name',
              predicate: { flagsSet: ['knows:her_shoulder', 'used:walk_out'] },
              setsFlags: ['refused_number_one'],
              closesFlags: ['you_challenged_her'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['number_one_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_hundred', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_four_thousand_clips',
      title: 'Four Thousand Clips',
      summary: 'Your roommate has filmed every fight at the Ridge for three years, the first one from the stands before he was even a student here, and he has never once been in one.',
      kind: 'SIDE',
      involvedCharacterIds: ['minho', 'dam'],
      involvedLocationIds: ['the_annex', 'the_boiler_room', 'the_yard'],
      knownRewardCopy: 'Whether Minho Tak ever steps into a circle, and who he becomes if he does.',
      discoverWhen: { flagsSet: ['minho_believes'] },
      steps: [
        {
          id: 'minho_steps_in',
          playerCopy: 'Help Minho decide whether to fight.',
          directorNotes:
            'He will lose, probably, and he knows the exact percentage. That is not the point and the player can make it not the point. Talking him out of it is also kind, and he will be relieved and slightly ashamed. If BoardWatch is unmasked, the Annex finds out who has been filming them all this time, and mostly they are delighted.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cornered_him',
              label: 'Work his corner for his first challenge',
              predicate: {
                flagsSet: ['spoke:minho', 'used:read_the_fighter'],
                minRelationship: [{ characterId: 'minho', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['minho_fought'],
              closesFlags: ['minho_stayed_out'],
            },
            {
              routeId: 'talked_him_out',
              label: 'Talk him out of it',
              predicate: { flagsSet: ['spoke:minho', 'used:talk_it_down'] },
              setsFlags: ['minho_stayed_out'],
              closesFlags: ['minho_fought'],
            },
            {
              routeId: 'boardwatch_unmasked',
              label: 'Let BoardWatch post the truth under his own name',
              predicate: { flagsSet: ['knows:boardwatch', 'table_exposed'] },
              setsFlags: ['boardwatch_unmasked'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['minho_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_annex', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_outside_the_circle',
      title: 'Outside the Circle',
      summary: 'Fight anywhere without a circle and a proctor, and there is footage, a bench outside a grey office, and a hearing that decides whether you are still a student on Sunday.',
      kind: 'SIDE',
      involvedCharacterIds: ['dam', 'tetsu'],
      involvedLocationIds: ['the_proctors_office'],
      knownRewardCopy: 'Whether you are still a student at the Ridge on Sunday.',
      discoverWhen: { flagsSet: ['used:settle_it_outside'] },
      steps: [
        {
          id: 'the_hearing',
          playerCopy: 'Answer for the fight outside the circle.',
          directorNotes:
            'A bench outside a grey office, a proctor with a tablet, and the footage from somebody’s phone. Coach Dam will speak for a fighter she respects and will not lie for anyone. Not turning up is an answer, and the office takes it as one.',
          enterWhen: { flagsSet: ['hearing_called'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'dam_spoke',
              label: 'Have Coach Dam speak for you',
              predicate: { minRelationship: [{ characterId: 'dam', dimension: 'respect', value: 50 }] },
              setsFlags: ['hearing_cleared'],
              closesFlags: ['expelled'],
            },
            {
              routeId: 'told_the_truth',
              label: 'Tell the proctors exactly what happened',
              predicate: { atLocation: 'the_proctors_office', flagsSet: ['used:talk_it_down'] },
              setsFlags: ['on_final_warning'],
              closesFlags: ['expelled'],
            },
            {
              routeId: 'did_not_show',
              label: 'Do not turn up',
              predicate: { flagsSet: ['hearing_called'], afterWorldMinute: 2 * 1440 + 10 * 60 },
              setsFlags: ['expelled'],
              closesFlags: ['hearing_cleared'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['hearing_done'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_dam_calls_it',
      atWorldMinute: 8 * 60,
      locationId: 'the_yard',
      publicCopy:
        'A short grey-haired woman with a can of barley tea and a crooked nose crosses the Yard, sees the red light on the board, sighs, and stops at the edge of the circle to call it.',
      directorNotes:
        'Coach Dam is an instructor, so she can call a challenge, and she would rather nobody got a strike over a shove. She takes no side and notices everything: the player’s stance, their hands, whether they look at the phones. If the fight already happened with nobody calling it, she asks who started it, because an uncalled fight is a strike for both, and Tetsu has two.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'dam', toLocationId: 'the_yard' }],
    },
    {
      id: 'we_first_sort',
      atWorldMinute: 1440 + 6 * 60,
      locationId: 'the_yard',
      publicCopy:
        'Six o’clock. The bell rings once, the board goes black, and then it fills again from number one down while the whole Yard counts under its breath.',
      directorNotes:
        'The player’s first sort. If they beat Tetsu, their photo is at 87 and his is at 88. If they lost, they are still unranked and the loss is in the record. If they walked out, there is a small white flag next to their name on the unranked roll. The countdown in the corner reads SCOUT NIGHT: 6 DAYS.',
      setsFlags: ['first_sort_seen'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_tetsu_goes_stale',
      atWorldMinute: 1440 + 6 * 60 + 1,
      locationId: 'the_yard',
      publicCopy:
        'Number 87 comes up grey, with a small clock beside it: STALE. Somebody near the front laughs and then stops.',
      directorNotes:
        'Tetsu did not get his defence. Anybody may challenge him today and he may not refuse, and number 100 has been waiting for exactly this. He will be looking for the player, angry, and under the anger he will be asking for help without knowing how to.',
      setsFlags: ['tetsu_stale'],
      cancelledByFlags: ['fought_tetsu'],
      requiresFlags: ['refused_the_board'],
      movesCharacters: [],
    },
    {
      id: 'we_tetsu_challenged',
      atWorldMinute: 1440 + 12 * 60,
      locationId: 'the_yard',
      publicCopy:
        'At noon number 100 walks up to the board and touches his card to Tetsu Hamada’s grey name, and the board does not give Tetsu the option to say no.',
      directorNotes:
        'The fight is at two, in the Yard circle. Tetsu is out of shape for it after a bad night. If he loses he drops to 88 and is one bad week from falling off. He will not ask the player to corner him, and he will notice if they turn up.',
      setsFlags: ['tetsu_in_trouble'],
      cancelledByFlags: ['tetsu_ally', 'fought_tetsu'],
      requiresFlags: ['tetsu_stale'],
      movesCharacters: [{ characterId: 'tetsu', toLocationId: 'the_yard' }],
    },
    {
      id: 'we_hajun_sits_down',
      atWorldMinute: 1440 + 12 * 60 + 30,
      locationId: null,
      publicCopy:
        'Around lunchtime, wherever you are eating, a man in a pressed white shirt sits down across from you, clicks a silver pen once, and sets a black card with a silver 10 on it beside your food.',
      directorNotes:
        'Hajun Seol finds the player himself, which is a compliment he wants noticed. He says almost nothing about what he wants: only that the Long Table eats at seven and at six, that the card calls the lift, and that he thinks the player’s week could be much easier. He leaves before the player can say no.',
      setsFlags: ['invited_to_the_table'],
      cancelledByFlags: ['left_the_map', 'expelled'],
      requiresFlags: ['knows:the_board'],
      movesCharacters: [],
    },
    {
      id: 'we_the_roof_at_dawn',
      atWorldMinute: 2 * 1440 + 5 * 60 + 30,
      locationId: 'the_tower_roof',
      publicCopy:
        'Soyeon Ryu is alone on the roof in the half-dark, shadowboxing, and her left hand never once comes up as high as her right.',
      directorNotes:
        'Only for a player who has already found their way up here. She knows they are there by the second combination and does not stop. If they say nothing and watch, she finishes the round and says one sentence about their footwork. If they mention the shoulder, the temperature drops ten degrees.',
      setsFlags: ['saw_her_train'],
      cancelledByFlags: [],
      requiresFlags: ['visited:the_tower_roof'],
      movesCharacters: [{ characterId: 'soyeon', toLocationId: 'the_tower_roof' }],
    },
    {
      id: 'we_stand_down_posted',
      atWorldMinute: 2 * 1440 + 6 * 60,
      locationId: 'the_yard',
      publicCopy:
        'At six the board re-sorts, and number 14 comes up grey: MEDICAL STAND-DOWN. Everybody below her moves up one place.',
      directorNotes:
        'Bora Kim, 21, #14, booked a challenge last night against #9, who eats at the Long Table. The clinic form was signed at 23:40. She is the third this term and the eighth in two years. Minho goes very quiet and does not film the rest of the sort.',
      setsFlags: ['stand_down_seen'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_bora_at_breakfast',
      atWorldMinute: 2 * 1440 + 7 * 60 + 30,
      locationId: 'the_annex',
      publicCopy:
        'Bora Kim, the name that greyed out at six, is in the Annex kitchen eating rice out of the pan and telling anybody who will listen that she feels completely fine.',
      directorNotes:
        'She is telling the truth. She is angry, she is not hurt, and she does not know who to be angry at. She was cleared by Nari Hwang four days ago and has the note in her bag.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: ['stand_down_seen'],
      movesCharacters: [],
    },
    {
      id: 'we_the_hearing',
      atWorldMinute: 2 * 1440 + 9 * 60,
      locationId: 'the_proctors_office',
      publicCopy:
        'A notice on the board, under the hundred names, in small grey letters: a hearing in the Proctors’ Office at ten, and your name on it.',
      directorNotes:
        'Somebody filmed the fight outside the circle. The footage is on a proctor’s tablet. The hearing is short and fair and it is real: a strike, a final warning, or worse if the player does not turn up.',
      setsFlags: ['hearing_called'],
      cancelledByFlags: ['hearing_cleared'],
      requiresFlags: ['used:settle_it_outside'],
      movesCharacters: [],
    },
    {
      id: 'we_minho_wants_in',
      atWorldMinute: 3 * 1440 + 20 * 60,
      locationId: 'the_annex',
      publicCopy:
        'Minho is sitting on his bed in 4-12 with his hand wraps on, not doing anything with them, and he says your name twice before he says anything else.',
      directorNotes:
        'He wants to challenge number 100 tomorrow. He has the percentages, and they are bad. He is asking the player whether he is allowed to want this.',
      setsFlags: ['minho_wants_in'],
      cancelledByFlags: ['minho_settled'],
      requiresFlags: ['minho_believes'],
      movesCharacters: [{ characterId: 'minho', toLocationId: 'the_annex' }],
    },
    {
      id: 'we_number_three_moves',
      atWorldMinute: 5 * 1440 + 6 * 60 + 6,
      locationId: 'the_yard',
      publicCopy:
        'At six minutes past six, number 3 touches his card to number one in front of the whole Yard, and the board does not give her the option to refuse.',
      directorNotes:
        'The Long Table’s backup plan: Daeho Gu, #3, whom she already refused once this term. The fight is in the Pit at noon. She accepts without expression. Hajun is on the stream commentary. Anyone who knows about the shoulder knows exactly what this is.',
      setsFlags: ['soyeon_cornered'],
      cancelledByFlags: ['you_challenged_her', 'table_exposed', 'soyeon_protected'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_scout_night',
      atWorldMinute: 6 * 1440 + 19 * 60,
      locationId: 'the_pit',
      publicCopy:
        'Scout Night. The Pit is full to the top row, the lights are white and hot, and there are people in league jackets in the front tier writing in notebooks.',
      directorNotes:
        'Everything the week built is in this room. The top twenty get showcase bouts; instructors may each put one unranked fighter into an exhibition. Whoever is number one this morning signs with the flagship club. Make every person the player has met visible somewhere in the tiers or the tunnel.',
      setsFlags: ['scout_night'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'soyeon', toLocationId: 'the_pit' },
        { characterId: 'hajun', toLocationId: 'the_pit' },
        { characterId: 'dam', toLocationId: 'the_pit' },
        { characterId: 'minho', toLocationId: 'the_pit' },
        { characterId: 'tetsu', toLocationId: 'the_pit' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_scout_night',
      kind: 'FINALE',
      label: 'Where your name is on the board when the scouts come',
      seedHint: 'A countdown in the corner of the glass: SCOUT NIGHT, 7 DAYS.',
      payoffHint: 'The Pit, full to the top row, and whatever number you earned standing under the lights.',
      weight: 1,
    },
    {
      id: 'p_number_87',
      kind: 'RIVAL',
      label: 'What number 87 actually needs from you',
      seedHint: 'A number shaved into the side of a man’s head, freshly done, by somebody who cannot afford to lose it.',
      payoffHint: 'Tetsu tells you about Gwon and the fish stall, and asks you for something he has never asked anyone.',
      weight: 0.85,
    },
    {
      id: 'p_number_one',
      kind: 'RELATIONSHIP',
      label: 'What number one is hiding',
      seedHint: 'A student card worn backwards, so the gold 1 faces her chest.',
      payoffHint: 'A shoulder she has been taping alone on a roof, and the fight she has wanted for a year with somebody who is not afraid of her.',
      weight: 0.9,
    },
    {
      id: 'p_stand_downs',
      kind: 'MYSTERY',
      label: 'Who is taking names off the board without a fight',
      seedHint: 'A name greys out at six in the morning, and the fighter is in the Annex kitchen saying she feels fine.',
      payoffHint: 'Seven forms in two years, one signature, an intern’s second signature on one of them, and a long table on the tenth floor.',
      weight: 0.7,
    },
    {
      id: 'p_what_it_counts',
      kind: 'THEME',
      label: 'What the board cannot count',
      seedHint: 'A hand-painted sign over the door of a basement gym: NO BOARD TALK.',
      payoffHint: 'You choose something the glass has no column for: Minho in a circle, a bowl saved in the Annex kitchen, or Tetsu keeping his room.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_docks',
      name: 'Harbour Brawler',
      role: 'Street fighting and toughness',
      summary: 'You learned to fight on the docks below the college, so you hit hard, take a hit well, and know the city that most students only visit.',
      playstyle: ['Aggressive', 'Tough', 'Knows the city'],
      blurb: 'You have been in more fights than anybody in the Tower and none of them were filmed, which up here makes you either a legend or a liar.',
      attributeBonus: { might: 2, resolve: 2 },
      skillProficiencies: { striking: 2, grit: 2, legwork: 1 },
      startingItems: [{ itemId: 'barley_tea', qty: 2 }],
      startingAbilities: ['call_out', 'walk_out', 'press_forward'],
      startingReputation: [{ factionId: 'faction_annex', amount: 10 }],
    },
    {
      id: 'arch_mat',
      name: 'Former Wrestler',
      role: 'Grappling and composure',
      summary: 'Your university wrestling program was cut and this was the only college that would honour the scholarship, so you are strongest on the ground and calm under weight.',
      playstyle: ['Grappler', 'Patient', 'Hard to move'],
      blurb: 'Strikers here have never been held by somebody who means it. You intend to be the first lesson a lot of them get.',
      attributeBonus: { might: 2, agility: 1, resolve: 1 },
      skillProficiencies: { grappling: 3, grit: 1, reading: 1 },
      startingItems: [],
      startingAbilities: ['call_out', 'walk_out', 'take_it_down'],
      startingReputation: [{ factionId: 'faction_proctors', amount: 10 }],
    },
    {
      id: 'arch_dojo',
      name: 'Mountain Dojo',
      role: 'Precise technique and timing',
      summary: 'You trained for years under one old teacher in a mountain dojo, so your technique is clean and your timing uncanny, and you have never been filmed in your life.',
      playstyle: ['Precise', 'Counter-fighter', 'Camera-shy'],
      blurb: 'Your teacher told you a ranking is a list of people who were in a hurry. You came here to find out if he was right.',
      attributeBonus: { agility: 2, arcana: 2 },
      skillProficiencies: { striking: 2, reading: 1, instinct: 2 },
      startingItems: [],
      startingAbilities: ['call_out', 'walk_out', 'make_them_miss'],
      startingReputation: [],
    },
    {
      id: 'arch_streamer',
      name: 'Fight Streamer',
      role: 'Showmanship and talk',
      summary: 'You built a following posting street sparring clips, so the crowd already knows your face, you talk well, and half the college wants to watch you lose.',
      playstyle: ['Showman', 'Talker', 'Famous'],
      blurb: 'Two hundred phones is a slow afternoon for you. The difference is that up here, everybody holding one can also fight.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { front: 3, striking: 1 },
      startingItems: [],
      startingAbilities: ['call_out', 'walk_out', 'play_the_phones'],
      startingReputation: [
        { factionId: 'faction_hundred', amount: 10 },
        { factionId: 'faction_table', amount: 10 },
      ],
    },
    {
      id: 'arch_someone',
      name: 'Here For Someone',
      role: 'Investigation and nerve',
      summary: 'Someone you love was ranked in the top forty last spring until a medical stand-down took their name off the board, so you transferred in to find out why.',
      playstyle: ['Investigator', 'Driven', 'Keeps secrets'],
      blurb: 'They said on the phone that they were fine and the clinic had made a mistake. Then they stopped answering. Their old card is in your pocket.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { legwork: 3, front: 1, grit: 1 },
      startingItems: [{ itemId: 'their_old_card', qty: 1 }],
      startingAbilities: ['call_out', 'walk_out', 'ask_around'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name goes on your card?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Jun Arashi' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'Where did you learn to fight?',
      helpText:
        'Your background before the Ridge. It sets what you are good at, and it is fixed for the whole story. It does not decide whether you say yes to the board, who you trust, or where your name ends up on Sunday. All of that is yours to play.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the Yard already know about you?',
      helpText: 'One plain sentence about your reputation, if you have one. Leave it empty to arrive as a complete unknown.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I was kicked out of my last college for something I will not talk about, and I have a very good left hook.',
    },
    {
      id: 'when_shoved',
      label: 'When somebody shoves you, what is your first instinct?',
      helpText: 'A starting temperament, not a rule. You can do the opposite in the Yard and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'shove_back', label: 'Shove back, immediately and harder' },
        { id: 'go_cold', label: 'Go very calm and very quiet' },
        { id: 'make_a_joke', label: 'Make a joke the whole crowd hears' },
        { id: 'walk_away', label: 'Walk away and remember their face' },
        { id: 'study_them', label: 'Watch how they did it, for next time' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do two hundred phones see?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Tall, a hoodie with the hood up, taped knuckles, and a face that has clearly been punched before.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Thirteen destinations. Four are losses that need no mistake: Scout Night
   * Without You is what happens to a player who simply does not climb, and
   * Number Two Moves Up is what happens to one who took the easy week. Pier
   * Six is walking away, available early. Only three endings need the
   * stand-down scandal; everything else is reachable by a player who never
   * once wondered why a name went grey.
   *
   * Order matters: runTurnPure sends the narrator only the first twelve
   * (director/src/pure/narrator.ts). The Hundred and First is last because it
   * needs turn 40, three arcs and a beaten number one, and the narrator can
   * write refusing the number from the player's own action; Pier Six and Third
   * Strike are the early landings and must stay visible.
   */
  endings: [
    {
      id: 'end_number_one',
      name: 'Number One',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['fought_number_one', 'climbed_clean', 'scout_night'],
        flagsUnset: ['did_the_table_job'],
      },
      condition:
        'Use only if the prose has the player winning. They climbed from nothing in a week without a single arranged fight, touched their card to number one, and beat Soyeon Ryu in a fair fight with both of them knowing everything, shoulder included. She does not want it to be gentle and it is not. Write the fight as the best one of the year, and let the board do the announcing.',
      epilogue:
        'The bell rings at six on Monday and the board fills from the top, and the first face on it is yours, mid-blink, terrible. The flagship club’s scout shakes your hand in the tunnel. Soyeon has surgery on the shoulder in the spring, and on the first day she is allowed to spar again she touches her card to your name.',
      hint: 'Four hundred and twelve days, and nobody has lasted a minute.',
    },
    {
      id: 'end_four_hundred_and_thirteen',
      name: 'Four Hundred and Thirteen',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['fought_number_one', 'climbed_clean'], flagsUnset: ['did_the_table_job'] },
      condition:
        'The player fought Soyeon Ryu fair and lost. That is not a failure and the prose should not treat it as one: it is the fight she wanted for a year, and the player gave it to her. She counts the day out loud afterwards for the first time in front of anybody.',
      epilogue:
        'Day four hundred and thirteen. She signs with the club on Sunday and leaves the Ridge in June. Before she goes she leaves a black training jacket folded on your bed in the Annex, with the card in the pocket turned the right way round.',
      hint: '',
    },
    {
      id: 'end_board_goes_dark',
      name: 'The Board Goes Dark',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['table_exposed'], flagsUnset: ['used_as_leverage'] },
      condition:
        'The stand-downs came out with proof, and the college switched the glass off for an inquiry. The Yard without the board is strange and quiet for a week, and people fight in the circles anyway, for nothing, because they want to. Hajun Seol never raises his voice once, all the way out.',
      epilogue:
        'Dr. Kwan is gone by the end of the month. Hajun Seol withdraws from the college the week before his hearing, politely. The board comes back in the new term with an appeals desk under it, and the first person to stand at it is Gwon Seokjin.',
      hint: '',
    },
    {
      id: 'end_her_corner',
      name: 'Her Corner',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['soyeon_protected', 'scout_night'],
        minRelationship: [
          { characterId: 'soyeon', dimension: 'trust', value: 60 },
          { characterId: 'soyeon', dimension: 'affection', value: 55 },
        ],
      },
      condition:
        'The player could have fought Soyeon and chose to stand in her corner instead. She did not ask, she is furious about it for a day, and then on Scout Night she lets them tape the shoulder. Romance can land here, up to a kiss in the tunnel, and only if the run has earned it.',
      epilogue:
        'She holds number one into the summer and declares the shoulder the morning after she signs, which nobody understands except two people. The noodle place at the bottom of the steps keeps two stools free at one in the morning, and the owner stops asking who the second one is for.',
      hint: '',
    },
    {
      id: 'end_a_number_of_your_own',
      name: 'A Number of Your Own',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['on_the_board'], flagsUnset: ['bought_your_number'] },
      condition:
        'The player is on the board somewhere, not at the top, and earned every single place. That is the ordinary good ending of this college and it should feel like one: a face on the glass, a room in the Tower or a choice to stay in the Annex, and a whole term to climb.',
      epilogue:
        'Your number changes three times before the end of term and you stop checking it at six. Minho does not. He has a column for you now, and it is the only one in the spreadsheet he has coloured.',
      hint: '',
    },
    {
      id: 'end_eighty_seven',
      name: 'Eighty-Seven',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['tetsu_ally'],
        minRelationship: [{ characterId: 'tetsu', dimension: 'trust', value: 55 }],
      },
      condition:
        'The man who shoved the player into the glass on the first morning ends the week as the person who would hold their pads at four in the morning. He keeps his room, or he loses it and does not care as much as he thought. Write him being terrible at saying thank you.',
      epilogue:
        'Tetsu graduates in June still in the eighties and runs the Boiler Room’s dawn session for Coach Dam the following year. He keeps shaving a number into his head, but it is not his any more. It is whatever yours is that week.',
      hint: '',
    },
    {
      id: 'end_seated',
      name: 'Seated',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['bought_your_number'], flagsUnset: ['double_agent', 'table_exposed'] },
      condition:
        'The player took the Long Table’s week and has a number they did not earn. Nobody says so. The food on the tenth floor is very good. Do not punish the player in the prose; let them notice, quietly, who has stopped meeting their eye in the Annex.',
      epilogue:
        'You eat breakfast at the Long Table for the rest of the term, three chairs from the middle. Coach Dam passes you in the Yard once and says your room number, the old one, and keeps walking.',
      hint: '',
    },
    {
      id: 'end_number_two_moves_up',
      name: 'Number Two Moves Up',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['did_the_table_job'], flagsUnset: ['table_exposed'] },
      condition:
        'The player did exactly what Hajun wanted: touched number one, fought her injured, and opened the top of the board. The shoulder went on camera and she is stood down on the footage; if the player won, a clinic form stands them down on Saturday night. Either way Hajun is number one on Scout Night morning, and he thanks the player warmly and in public.',
      epilogue:
        'Hajun signs with the flagship club on Sunday night and says something gracious about you to the stream. Soyeon declares the shoulder on Monday and sits out the term. The clip of your fight is the most watched video at the Ridge for a year, and you never once watch it.',
      hint: '',
    },
    {
      id: 'end_no_number',
      name: 'No Number',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['never_ranked'],
        minFactionReputation: [{ factionId: 'faction_annex', value: 40 }],
      },
      condition:
        'The player never got on the board, and the week mattered anyway: a basement gym, a roommate in a circle for the first time, a kitchen that saves them a bowl. The board can only count one kind of thing. Write the other kinds, specifically.',
      epilogue:
        'The white flag comes off your card at the end of term. You do not touch it to anything for a week, on purpose. Then you go down to the Boiler Room at five in the morning, and the chalkboard has your name on it, with no number, near the top.',
      hint: '',
    },
    {
      id: 'end_scout_night_without_you',
      name: 'Scout Night Without You',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['scout_night'], flagsUnset: ['top_twenty', 'exhibition_slot', 'soyeon_protected'] },
      condition:
        'The ordinary ending: the player is in the top tier of the Pit with everybody else, watching. It is not a punishment and must not be written as one. They saw the week up close, they know things about the people under the lights that the scouts never will, and next term starts in nine days.',
      epilogue:
        'From the top row the Pit looks like a bowl of light. You know who is hiding an injury, who arranged which fight and who is going home to a fish stall. The scouts know the numbers. The countdown in the corner of the board resets to a hundred and twelve days.',
      hint: '',
    },
    {
      id: 'end_third_strike',
      name: 'Third Strike',
      rarity: 'COMMON',
      minTurn: 15,
      requires: { flagsSet: ['expelled'] },
      condition:
        'The player fought outside the circle and did not answer for it, and the Proctors’ Office expelled them. Do not moralise. Write the practical end: the card that stops opening doors, the bag packed in 4-12, Minho pretending not to watch, and the ninety-nine steps going down.',
      epilogue:
        'Your card beeps red at the gate at 06:01. Minho carries one of your bags down the steps without being asked and does not say anything clever the whole way. At the bottom, somebody from Pier Six is already waiting with an offer.',
      hint: '',
    },
    {
      id: 'end_pier_six',
      name: 'Pier Six',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked down the ninety-nine steps and did not come back. Do not make it a tragedy and do not redeem it. There is fighting without a board at the bottom of the hill, and some people are happier there.',
      epilogue:
        'Pier Six pays in cash and nobody keeps count. Gwon Seokjin shows you how the headlights are arranged so nobody is fighting into the glare. Some nights you can see the board from the pier, lit up on the hill, re-sorting at six without you.',
      hint: '',
    },
    {
      id: 'end_hundred_and_first',
      name: 'The Hundred and First',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['fought_number_one', 'climbed_clean', 'table_exposed'],
        minRelationship: [{ characterId: 'soyeon', dimension: 'respect', value: 60 }],
      },
      condition:
        'The player exposed the stand-downs, climbed clean, beat number one, and then refused the number. They touch their card to their own name and ask the board to take it off. It has never been asked that and it does not have a rule for it. Write the Yard going completely silent.',
      epilogue:
        'The next morning the board fills from one to a hundred and then, underneath, in smaller letters, a name with no number next to it. The proctors call it a display fault. Coach Dam has it framed. Every name stood down in the last two years is invited back to challenge in, and all but one of them come.',
      hint: 'Ask the board for something it has no rule for.',
    },
  ],
  opening:
    "Your chest slams into the glass, and the whole board lights up.\n\nA hundred names. A hundred faces. Your student card is pressed flat against number 87.\n\nYou turn. Number 87 just shoved you. Same grin as on the screen, same 87 shaved into the side of his head.\n\n\"Whoops,\" says Tetsu. \"Your card touched my name, transfer. That's a challenge.\"\n\nHe taps his own card to the glass. Red letters flash:\n\nCHALLENGE ACCEPTED?\n\nAcross the courtyard, two hundred phones come up at once.\n\nTetsu steps into the white circle painted on the stones and raises his fists. \"Beat me, you get my number. Back out, and the board flags you a coward all term.\"\n\n\"So. Yes or no?\"",
  openingPanel: {
    assetKey: 'story_the_ranking_board/opening',
    alt: 'Tetsu, grinning, 87 shaved into his bleached buzzcut, stands in a painted white circle under a giant glass ranking board with his fists up at you, as phones rise all round the courtyard.',
  },
  openingSuggestions: [
    '"I didn\'t touch your name. You threw me at it. No."',
    'I press my card back to the glass and step into the circle.',
    'I slide my card up the glass, past his name, all the way to number one.',
  ],
  coverDirection: [
    'SUBJECT: Soyeon Ryu, the number one fighter, in the foreground of a key visual for a martial-arts anime about a college that ranks its fighters on a giant glass wall, with Tetsu Hamada behind her and lower in the frame.',
    'Soyeon fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Black hair cropped at the jaw with one thin braid at the nape, dark watchful eyes, a plain black training jacket zipped to the chin, white tape wrapped round both hands, and an ID card on a black lanyard turned backwards against her chest.',
    'She stands upright and perfectly still: her right hand raised loosely in a guard beside her chin, her left hand pushed into her jacket pocket. She looks straight at the viewer, calm and unimpressed, as if the viewer has just called her name.',
    'Behind her and lower, smaller and to one side: Tetsu Hamada, big through the shoulders, a bleached-blond buzzcut, a thin scar through one eyebrow, a navy tracksuit with a white stripe a size too small, taped fists up, grinning, standing inside a white circle painted on grey flagstones.',
    'Above and behind them both rises the ranking wall: a sheet of glass four storeys tall, a grid of glowing tiles with tiny blurred portrait squares, lit cold white, the topmost tile blazing red.',
    'The wall shows only glowing tiles and blurred portraits: no letters, no numbers, nothing that reads as writing.',
    'Effects stay on objects and on the title: a hairline crack running across the glass wall, red light pouring from the top tile, glints of light in the air above the circle, small bright phone screens.',
    'THEIR FACES STAY CLEAN: no red streaks, cracks, glints, bruises or shadows on either face.',
    'Every red effect stays on the glass wall and the title, never on their faces.',
    'BEHIND THEM, soft and secondary: a stone college courtyard at dawn, a crowd in hoodies and track jackets at the edges of the frame holding up dozens of glowing phones, old concrete buildings and a tall dormitory tower against a pale sky over a harbour.',
    'LIGHT: cold blue-white glow from the glass wall rims both of them, warm gold dawn light falls across Soyeon from the side, and one red accent from the top tile touches her shoulders and the stones.',
    'TITLE: the words THE RANKING BOARD painted into the art in the upper third, across the top of the glass wall, as a bold condensed sports-broadcast logo, white with a red glow, like lettering lit up on glass,',
    'spelled exactly THE RANKING BOARD, three words, large and legible at thumbnail size. A thin red scan line runs under the word BOARD only. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const THE_RANKING_BOARD = StoryVersion.parse(raw);
