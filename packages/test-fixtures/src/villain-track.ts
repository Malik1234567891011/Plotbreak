import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Villain Track" — the academy trains its own villains, and you got the
 * letter from that side.
 *
 * The structural bet is Good Morning, Husband's: one person, in the first
 * lines, asking you something you have to answer. Here the question is a trap
 * wearing a smile. The player is handed a black mask and an assignment (the
 * badge off the best hero student in the building, by midnight) and before
 * they have moved, she turns round and asks whether they have met. Every
 * player knows what to do next and no two of them do the same thing.
 *
 * The playable span is one week: the welcome masquerade on night one, five
 * days of the first week of term, and Festival Night on day six. Two clocks
 * and both are authored as world events rather than promised in prose: the
 * badge is due at midnight, and page nine of the festival script goes off at
 * 19:42 on Festival Night unless somebody has read it.
 *
 * Both sides of the academy are lying to their own students, and that is the
 * whole engine. The Track says nobody gets hurt. The hero programme says every
 * villain is real. Each has set its newest student against the other's
 * without telling either, which is why Celeste asks "Have we met?" — she was
 * warned. The conspiracy under it (Bridge Night was staged, the man who wrote
 * it added a fire to this year's script) is there for a player who pulls on
 * it and never forced on one who only wants to be a very good villain.
 *
 * Three variables. Composure is the only GOOD_HIGH, because `resolveRest`
 * refills those and steady hands after a night's sleep is the honest thing for
 * that to mean. Heat is first among the descending pair because the generic
 * cost path and PUBLIC_VIOLENCE both take the first GOOD_LOW in array order,
 * and a fight in public moving somebody closer to your face is exactly right.
 * Aurel Academy is the first faction for the same reason: a student brawling
 * on campus costs standing with the school before anybody else.
 */

const raw = {
  id: 'sv_villain_track_1',
  storyId: 'story_villain_track',
  version: 1,
  title: 'Villain Track',
  fantasyLabel: 'Hero academy. You’re on the villain track.',
  hook: 'Your acceptance letter had a second page. The academy that trains the city’s heroes also trains their villains, and your first job is the top hero student’s badge, by midnight.',
  premise:
    'Aurel Academy trains the city’s heroes. Students arrive at eighteen, train for four years and leave with a licence, and the whole city follows their ranking like football. Most of them think that is all the academy does.\n\n' +
    'You got in. Your acceptance letter had a second page, in black ink. As far as you can tell, nobody else’s did. It said you had been selected for Applied Opposition, a course on the timetable with no room number, and that you should tell no one.\n\n' +
    'Applied Opposition is the villain track. The academy secretly trains the villains its heroes need: masked, scripted, always beaten, never caught. Every robbery a student hero stops on the news was planned in a room under the old chapel.\n\n' +
    'Tonight is the welcome masquerade. Your first assignment is to take the gold badge off the best hero student in the building before midnight, without being seen and without hurting anybody.\n\n' +
    'She is very good, and somebody may have warned her you were coming.\n\n' +
    'Take the badge or refuse it. Play the villain they want, become the hero they would hate you to be, or find out who writes the scripts, because somebody has already changed this year’s.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Superpowers', 'Academy', 'Heist', 'Rivalry', 'Mystery'],
  mechanicsChips: [
    'Steal it, swap it, or refuse',
    'She was warned you were coming',
    'Both sides are lying',
    'A policeman who counts',
    'Earn a villain name',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can lift the badge on your first turn, refuse the whole thing and spend the week as an ordinary first-year, or walk outside and tell the policeman everything. All of it is the game. Celeste was sent to catch you, and on the first night she is better at her job than you are at yours.',
  openingObligations: [
    {
      what: 'Bring Dean Marrow the gold badge off Celeste Moreau’s lapel, in Room Zero, by midnight.',
      withCharacterId: 'marrow',
      dueInMinutes: 140,
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'glass_atrium',
    startWorldMinute: 21 * 60 + 40,
    startingItems: [
      { itemId: 'black_mask', qty: 1 },
      { itemId: 'white_mask', qty: 1 },
      { itemId: 'acceptance_letter', qty: 1 },
    ],
    hardCanon: [
      'Aurel Academy is a four-year, post-secondary academy for the gifted in the harbour city of Corvane. Every student is an adult, admitted at eighteen or older. The player is a first-year.',
      'The academy secretly runs a villain track, listed on the timetable as Applied Opposition with no room number and taught in Room Zero under the old chapel. Its masked students stage the crimes that hero students stop on camera, the villain always loses, and the one rule it says out loud is that nobody gets hurt.',
      'At the welcome masquerade, Dean Marrow handed the player a black lacquer mask and their first assignment: the First Badge off Celeste Moreau’s lapel, delivered to Room Zero by midnight.',
      'The First Badge, numbered 001, is the field licence the academy issues a year early to the top final-year on the hero programme. For the first week of term it opens every lock on campus, including one sealed drawer in the Registry.',
      'Professor Anselm Dray warned Celeste tonight that a first-year would try for her badge, and told her catching them is her final exam. Rafe Corrigan, another first-year, was given the same assignment as the player.',
      'Bridge Night, twenty-two years ago, when Dray defeated the villain called the Pale Duke on the Old Bridge, was staged. Dray wrote it. Dean Marrow is the Pale Duke. The signed script is in the sealed Registry drawer. This is discoverable and never owed to anybody.',
      'Page nine of this year’s festival script, a real charge under the east pier at 19:42 on Festival Night, was added by Dray. Marrow did not write it and does not know.',
      'Everybody with a gift has exactly one, with limits. Nobody reads minds, nobody flies, and nobody comes back from the dead.',
      'The cast’s gifts: Celeste Moreau steps through light, out of one lit place and into any other lit place she can see, and in the dark she is only a very good athlete. Dean Marrow hears a lie told within ten paces as a wrong note. Juno Pike can fold anything she can palm into a pocket of air and bring it back later. Anselm Dray cannot be hurt for as long as he holds his breath. Rafe Corrigan throws any sound he has heard to anywhere he can see. Bram Tolle has no gift.',
    ],
    toneGuide:
      'Sharp, quick and a little funny: a heist comedy with a conscience underneath it. Masks, lies and double meanings are the texture, and everybody in every scene is performing for somebody. ' +
      'Fights are legible and mostly staged, and when one turns real the prose should feel the difference in the first line. Nobody bleeds on the page. The warehouse fire and the pier are told by what happened to people afterwards. ' +
      'Nobody on either side is a cartoon. Marrow believes in “nobody gets hurt” because he wrote it. Dray has a real argument, and the player is allowed to find it persuasive. ' +
      'Romance is rivalry first: flirtation, tension, the occasional honest moment, one kiss at most. Celeste can catch the player, outplay them and refuse them. A clumsy lift gets caught: she says the score out loud and lets go, because she wants to see the second attempt. The face at the top of a beat is Celeste’s whenever she is in the scene, and Marrow’s mask when he is. ' +
      'Refusing the badge is a real route and is never treated as failing to start the story. Never describe how the charge under the east pier is built, set or disarmed beyond somebody pulling it.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Her hand closes on your wrist before your fingers reach the pin.\n\n\"That is one to me,\" Celeste says pleasantly. She hasn't looked down.\n\nThe band is still playing. Nobody near the bar has noticed a thing.\n\n\"I was admiring it.\"\n\n\"You were unpinning it.\" She lets go, one finger at a time. \"Try again before midnight. I want to see what you do when you mean it.\"",
      "Room Zero smells of lacquer and cold coffee. Masks hang on hooks along one wall, every one of them black, every one of them worn by somebody before you.\n\nMarrow does not turn round.\n\n\"Eleven fifty-eight,\" he says. \"A dramatic entrance. I would have preferred an early one.\"\n\nHe holds out a gloved hand, palm up, and waits.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 12, mind: 12, presence: 12, resolve: 11, arcana: 11 },
  skills: [
    { id: 'sleight', name: 'Sleight of Hand', attribute: 'agility', description: 'Lifting, palming and planting, close enough to smell somebody’s perfume.' },
    { id: 'guile', name: 'Guile', attribute: 'presence', description: 'Lying with your whole face, and wearing a role until it fits.' },
    { id: 'casing', name: 'Casing', attribute: 'mind', description: 'Exits, cameras, habits, and which waiter is not really a waiter.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being liked on purpose, by somebody with every reason to be careful of you.' },
    { id: 'poise', name: 'Poise', attribute: 'resolve', description: 'Holding still under a hero’s stare or a policeman’s questions.' },
    { id: 'brawl', name: 'Brawling', attribute: 'might', description: 'Fighting: the staged kind that has to look real, and the real kind that has to end fast.' },
    { id: 'gift', name: 'Gift Control', attribute: 'arcana', description: 'Using your power precisely, quietly, and only as much as the moment needs.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is GOOD_HIGH because `resolveRest` restores those, and a night's
   * sleep giving you steady hands back is the honest meaning of rest in a
   * world about stealing things off people. It is also what the generic cost
   * path spends: a bad exchange costs you nerve before it costs you anything
   * else.
   *
   * Heat and Marrow's Doubt are descending. Heat comes first in array order on
   * purpose, because PUBLIC_VIOLENCE raises the first GOOD_LOW it finds and a
   * fight in the Quad should put somebody closer to your face, not make the
   * Track trust you less.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 78,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The hands shake and the face gives it away. The player can still act, but every lie is visible to anybody looking, every lift is felt, and Celeste stops pretending she has not noticed.',
      color: '#C9B37E',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Fingers fumble pins, lies come out a beat late, and the player agrees to things to end conversations. This is the band where a clean lift becomes a grab, where a policeman’s second question lands, and where going back to the dorm to sleep is the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary strain of a double life. Good for one more risk and honest about not wanting two. The player can hold a cover story or a conversation with Celeste, but not both at once, and notices fewer exits than they would fresh.',
        },
        {
          upTo: 100,
          behaviour:
            'Steady. The player can hold a lie, a drink and an exit route in their head at once, read a room while flirting in it, and say the difficult thing in the shape that lands. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 12,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody is looking for the face behind the black mask. The player is one first-year among four hundred, forgettable in the best way, and can go anywhere on campus without being watched.',
      color: '#C0503A',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Invisible. Nobody connects the player to anything. Celeste, if she suspects, is guessing. Officer Tolle has a list of four hundred first-years and the player is somewhere in the middle of it. Risky moves are cheap here.',
        },
        {
          upTo: 50,
          behaviour:
            'Somebody has a shape but not a face. Tolle has written down a description that fits the player and two others. Celeste watches the player across rooms. Security footage gets pulled. The player can still walk away from anything, but not twice in a day.',
        },
        {
          upTo: 80,
          behaviour:
            'A name is on a list. Tolle knocks on the player’s door with coffee and a specific question. Celeste stops being playful. Dray says the player’s first name in passing, which is worse. Juno tells the player to stay out of Room Zero for a day.',
        },
        {
          upTo: 100,
          behaviour:
            'Seconds from being unmasked. Somebody has footage, a witness, or a mask with the player’s fingerprints on the lacquer. Every scene is a cornered one. The Track starts deciding whether the player is worth protecting, and Tolle starts deciding what to do with what he knows.',
        },
      ],
    },
    {
      id: 'doubt',
      name: 'Marrow’s Doubt',
      max: 100,
      start: 30,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The Track trusts the player completely. Marrow hands them scripts unread, Juno stops checking their exits, and a door in Room Zero that stays locked for everybody else is left open for them.',
      color: '#4A4E69',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Trusted. Marrow speaks to the player as a colleague, lets them see whole scripts rather than their own lines, and asks their opinion of the other recruits. Juno brings them in early on jobs.',
        },
        {
          upTo: 55,
          behaviour:
            'A recruit on approval. The player gets their own lines and nothing more. Marrow is courteous and listens for wrong notes. Juno answers questions with countdowns. This is where most of the week should live.',
        },
        {
          upTo: 100,
          behaviour:
            'A liability. Marrow asks questions he already knows the answers to and waits. Juno is told to watch the player instead of training them. Rafe gets the better part. The Track starts planning Festival Night around the player rather than with them, and somebody suggests they hand the black mask back.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'black_mask',
      name: 'The Lacquer Mask',
      tags: ['quest', 'disguise'],
      questItem: true,
      description: 'Black lacquer, light as a shell, with a hairline crack over the left eye that somebody has filled with gold. Stamped small inside the brow: 0.',
      loreText: 'Every mask on the Track is made in Room Zero and every one has been worn before. Yours belonged to a student who walked off the Track two years ago. Nobody will say who.',
      icon: 'mask',
    },
    {
      id: 'white_mask',
      name: 'The Intake Mask',
      tags: ['disguise'],
      description: 'Plain white card on a ribbon, handed to every first-year at the masquerade door. There are four hundred of them in the atrium tonight, all identical.',
      loreText: 'Identical is the point. Four hundred white masks is the best crowd a thief could ask for, and the Track has been choosing this design for years.',
      icon: 'mask',
    },
    {
      id: 'acceptance_letter',
      name: 'Your Letter',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description: 'Two pages. The first is your acceptance to Aurel Academy on cream card. The second is black paper with black ink you can only read at an angle: Applied Opposition. You have been selected. Tell no one.',
      loreText: 'Nobody else in your year got a second page. You checked, carefully, without asking anybody.',
      icon: 'letter',
    },
    {
      id: 'gold_badge',
      name: 'The First Badge',
      tags: ['quest', 'access'],
      questItem: true,
      description: 'Gold, numbered 001, pinned on the lapel of the top final-year on the hero programme. Her field licence, issued a year early, and for the first week of term the master key to every lock on campus.',
      loreText: 'Including one drawer in the Registry that has not been opened in twenty-two years. It was sealed by two men who signed the same page.',
      icon: 'badge',
    },
    {
      id: 'spare_badge',
      name: 'The Spare Badge',
      tags: ['forgery'],
      description: 'A gold badge numbered 001 that is right in every way you can see and wrong in every way a lock can feel. It weighs two grams too little.',
      loreText: 'Juno has forged one every year for three years and never used one. She keeps saying this year is different.',
      icon: 'badge',
    },
    {
      id: 'staff_keycard',
      name: 'A Caterer’s Keycard',
      tags: ['access'],
      skillModifiers: { casing: 1 },
      description: 'Clipped to a jacket on a hook in the service corridor. It opens the kitchens, the staff lift and the old tunnel to the chapel that nobody uses.',
      loreText: 'The name on it is somebody who left the catering firm in spring. Nobody has cancelled it.',
      icon: 'card',
    },
    {
      id: 'festival_script',
      name: 'The Festival Script',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description: 'Twelve typed pages for Festival Night: every villain’s entrance timed to the second, every hero’s rescue marked in red. Page nine is in a different ink.',
      loreText: 'Page nine adds a line nobody in Room Zero wrote: a charge under the east pier, 19:42. The handwriting slopes like somebody who signs a lot of photographs.',
      icon: 'papers',
    },
    {
      id: 'bridge_file',
      name: 'The Bridge Night File',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description: 'A sealed folder from the Registry: the original script for the night a famous hero beat a famous villain on the Old Bridge. Every punch is written down. Two signatures on the last page.',
      loreText: 'One signature is Anselm Dray’s. The other belongs to the Pale Duke, in the same hand that writes the Track’s scripts today.',
      icon: 'folder',
    },
    {
      id: 'tolle_folder',
      name: 'Tolle’s Folder',
      tags: ['document', 'evidence'],
      skillModifiers: { casing: 1 },
      description: 'Eleven incidents in four years, each a villain stopped by an academy student in front of a camera, written up in pencil. Ten are clean. One is a warehouse fire, with a photograph of a night watchman clipped to it.',
      loreText: 'Under the photograph, in pencil: Ned. Four months in hospital. Walks with a stick. First hero on scene: Dray, nine times out of eleven.',
      icon: 'folder',
    },
    {
      id: 'ferry_ticket',
      name: 'The Ferry Ticket',
      tags: ['evidence'],
      description: 'A ferry ticket framed on the Bridge Night memorial, from the boat that pulled Anselm Dray out of the harbour. It is stamped 23:15.',
      loreText: 'The plaque beside it says the Pale Duke fell from the bridge at 23:40. The rescue boat was on the water twenty-five minutes before there was anybody to rescue.',
      icon: 'ticket',
    },
  ],
  abilities: [
    {
      id: 'lift_it',
      name: 'Lift It',
      tags: ['utility'],
      description: 'Take something off a person or out of a room without them feeling it go.',
      affordances: ['steal it', 'lift it', 'pick her pocket', 'take the badge', 'swipe it', 'palm it', 'unpin it', 'swap the badge'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'sleight', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'wear_the_lie',
      name: 'Wear the Lie',
      tags: ['social'],
      description: 'Be exactly who they expect: a nervous first-year, a waiter, somebody who was never near the bar.',
      affordances: ['lie', 'bluff', 'play innocent', 'pretend', 'cover story', 'act normal', 'deny it', 'make up a name'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'guile', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'case_the_room',
      name: 'Case the Room',
      tags: ['sight'],
      description: 'Read the exits, the cameras, the habits, and who is watching whom, before you move.',
      affordances: ['look around', 'case the room', 'scan the crowd', 'study the room', 'find the exits', 'spot the cameras', 'watch her hands', 'notice'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'casing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'turn_on_the_charm',
      name: 'Turn On the Charm',
      tags: ['social'],
      description: 'Make somebody enjoy talking to you, even somebody who is trying to work out who you are.',
      affordances: ['flirt', 'charm her', 'compliment', 'make her laugh', 'ask her to dance', 'toast her', 'smile at her'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_steady',
      name: 'Hold Steady',
      tags: ['defensive'],
      description: 'Give nothing away under pressure, and look like somebody with nothing to give.',
      affordances: ['stay calm', 'keep my cool', 'say nothing', 'hold my nerve', 'stonewall', 'keep a straight face', 'wait him out'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'poise', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'throw_down',
      name: 'Throw Down',
      tags: ['offensive'],
      description: 'Fight. Staged if you can keep it that way, real if somebody else already decided it was.',
      affordances: ['fight', 'punch', 'tackle', 'swing at', 'brawl', 'take him down', 'fight back', 'shove'],
      costs: [
        { resourceId: 'composure', amount: 10 },
        { resourceId: 'heat', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawl', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_off_script',
      name: 'Go Off Script',
      tags: ['social'],
      description: 'Break the Track’s first rule on purpose: tell somebody the truth, or do the thing nobody planned.',
      affordances: ['tell the truth', 'confess', 'come clean', 'refuse', 'tell her everything', 'say no to marrow', 'go off script', 'break the rules'],
      costs: [{ resourceId: 'doubt', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lie_low',
      name: 'Lie Low',
      tags: ['utility'],
      description: 'Be an ordinary first-year for an hour: a lecture, the canteen, a nap, nobody looking.',
      affordances: ['lie low', 'go to class', 'keep my head down', 'go back to my room', 'get some sleep', 'blend in', 'do nothing'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_their_eyes',
      name: 'Slip Their Eyes',
      tags: ['utility'],
      description: 'Your gift. For a few seconds attention slides off you, and people looking straight at you see the space behind you instead.',
      affordances: ['go unnoticed', 'slip past', 'vanish into the crowd', 'use my gift', 'fade out', 'slip their eyes'],
      costs: [
        { resourceId: 'composure', amount: 12 },
        { resourceId: 'heat', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'gift', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'borrow_a_face',
      name: 'Borrow a Face',
      tags: ['utility'],
      description: 'Your gift. After you touch somebody’s hand you can wear their face for ten minutes. Not their voice, and not their walk.',
      affordances: ['borrow a face', 'wear her face', 'disguise myself', 'copy his face', 'use my gift', 'become him'],
      costs: [
        { resourceId: 'composure', amount: 14 },
        { resourceId: 'heat', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'gift', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'drop_the_weight',
      name: 'Drop the Weight',
      tags: ['offensive'],
      description: 'Your gift. For one breath you weigh as much as a car, and whatever you hit or stand on finds out.',
      affordances: ['get heavy', 'hit like a truck', 'use my gift', 'brace myself', 'drop the weight', 'break the door'],
      costs: [
        { resourceId: 'composure', amount: 12 },
        { resourceId: 'heat', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'gift', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'kill_the_signal',
      name: 'Kill the Signal',
      tags: ['utility'],
      description: 'Your gift. Anything electric you touch stops: locks, cameras, phones, every light on one circuit.',
      affordances: ['kill the lights', 'cut the cameras', 'use my gift', 'short it out', 'kill the power', 'open the lock'],
      costs: [
        { resourceId: 'composure', amount: 10 },
        { resourceId: 'heat', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'gift', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_the_villain',
      name: 'Play the Villain',
      tags: ['stagecraft'],
      description: 'Put on the black mask and your name, and give a crowd a villain worth cheering against, without anybody getting hurt.',
      affordances: ['play the villain', 'put on the mask', 'perform', 'monologue', 'make an entrance', 'stage the fight', 'wear the black mask'],
      costs: [
        { resourceId: 'composure', amount: 10 },
        { resourceId: 'heat', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'guile', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['has_a_villain_name'],
        lockedCopy: 'You do not have a name yet. A black mask with nobody behind it is a first-year in fancy dress, and Room Zero has not finished deciding who you are.',
      },
    },
    {
      id: 'broadcast_it',
      name: 'Put It on Every Screen',
      tags: ['social'],
      description: 'Show the whole city the paper that proves its heroes and its villains are written by the same people.',
      affordances: ['broadcast it', 'show the cameras', 'expose them', 'go public', 'leak it', 'read it out', 'put it on screen'],
      costs: [
        { resourceId: 'doubt', amount: 30 },
        { resourceId: 'heat', amount: 20 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['holds_proof'],
        lockedCopy: 'You have a feeling and a story nobody would print. Nobody puts a feeling on the news. You need the paper itself, in your hands.',
      },
    },
  ],
  locations: [
    {
      id: 'glass_atrium',
      name: 'The Glass Atrium',
      shortName: 'Atrium',
      description:
        'The academy’s great hall, three storeys of glass roof over a marble floor. Tonight it is the welcome masquerade: four hundred first-years in identical white masks, a string quartet, a long bar under the balcony, and waiters who are not all waiters. On ordinary nights it is where final-years drink late and first-years pretend not to watch them.',
      artDirection:
        'Grand glass-roofed academy hall at night dressed for a masquerade ball, crowds in identical white half-masks, a long gold-lit bar beneath a balcony, string quartet, chandeliers reflected in the glass roof. Elegant, crowded, glittering, faintly sinister.',
      connections: [
        { to: 'atrium_balcony', travelMinutes: 1, label: 'Up the curved stair to the balcony' },
        { to: 'service_corridor', travelMinutes: 1, label: 'Through the service door by the bar' },
        { to: 'the_quad', travelMinutes: 2, label: 'Out through the main doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'gold_badge', qty: 1, ownerId: 'celeste', aka: ['badge', 'her badge', 'the gold badge', 'the pin', 'first badge'] },
      ],
    },
    {
      id: 'atrium_balcony',
      name: 'The Atrium Balcony',
      shortName: 'Balcony',
      description:
        'A stone balcony running the length of the atrium on the harbour side, half inside and half open to the night. Donors stand at the rail in evening dress. At the far end, past the last lamp, there is one dark corner where you can see the whole party and the whole harbour, and nobody below can see you.',
      artDirection:
        'Stone balcony above a glittering masquerade hall on one side and a night harbour on the other, string lights, donors in evening dress at the rail, one shadowed corner beyond the last lamp. Romantic, exposed, high up.',
      connections: [{ to: 'glass_atrium', travelMinutes: 1, label: 'Back down the stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
    },
    {
      id: 'service_corridor',
      name: 'The Service Corridor',
      shortName: 'Service Corridor',
      description:
        'Behind the bar: kitchens steaming, a cloakroom of hired coats, a staff lift, and at the far end a low brick tunnel to the old chapel that the caterers are told not to use. The service door has a gap at the hinge you can watch the whole atrium through.',
      artDirection:
        'Narrow back-of-house corridor behind a grand party, steel kitchen doors, racks of coats, a staff lift, a low brick tunnel mouth at the end lit by one bulb, light spilling through a door gap. Busy, hidden, slightly grimy.',
      connections: [
        { to: 'glass_atrium', travelMinutes: 1, label: 'Back out to the party' },
        { to: 'old_chapel', travelMinutes: 4, label: 'The brick tunnel to the chapel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'staff_keycard', qty: 1, ownerId: null, aka: ['keycard', 'the card', 'staff card', 'the caterer’s card'] },
      ],
    },
    {
      id: 'the_quad',
      name: 'The Quad',
      shortName: 'Quad',
      description:
        'The academy’s central lawn under iron lamps, every building facing it. In the middle stands a bronze statue of Professor Anselm Dray on the Old Bridge, one fist raised, the plaque polished by twenty-two years of hands. Tonight a police cordon runs across the path to the atrium doors.',
      artDirection:
        'Academy quadrangle at night, wet lawn, iron lamps, gothic and glass buildings around it, a heroic bronze statue of a caped man with a raised fist on a stone plinth, a police tape cordon by the main doors. Grand and watchful.',
      connections: [
        { to: 'glass_atrium', travelMinutes: 2, label: 'Into the atrium' },
        { to: 'gilt_house', travelMinutes: 3, label: 'Gilt House, the final-years’ residence' },
        { to: 'block_c', travelMinutes: 4, label: 'Block C, the first-year dorm' },
        { to: 'proving_yard', travelMinutes: 3, label: 'The Proving Yard' },
        { to: 'old_chapel', travelMinutes: 5, label: 'The path to the old chapel' },
        { to: 'registry', travelMinutes: 3, lockedByFlag: 'registry_open', label: 'Down to the Registry' },
        { to: 'harbour_front', travelMinutes: 15, label: 'Out of the gate and down to the harbour' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'gilt_house',
      name: 'Gilt House',
      shortName: 'Gilt House',
      description:
        'The final-year hero residence: gold paint on the doors, the hero ranking on a screen in the lobby, a night porter who knows everybody. Celeste’s room is on the top floor, corner, with the light on until exactly one in the morning.',
      artDirection:
        'Elegant academy residence hall at night, gold-trimmed doors, a lobby screen showing a ranked list of names, a dozing night porter, a lit top-floor corner window. Privileged, polished, quiet.',
      connections: [{ to: 'the_quad', travelMinutes: 3, label: 'Back to the Quad' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'block_c',
      name: 'Block C',
      shortName: 'Block C',
      description:
        'The first-year dorm: four floors of narrow rooms, a kitchen that smells of instant noodles, a noticeboard nobody reads. Your room is fourteen. Rafe is two doors down. The resident advisor’s room at the top of the stairs belongs to Juno Pike, who is never in it when you knock.',
      artDirection:
        'Cramped student dormitory corridor at night, numbered doors, a cluttered noticeboard, a shared kitchen with a flickering light, a stairwell up to a closed door at the top. Lived-in, ordinary, a little shabby.',
      connections: [{ to: 'the_quad', travelMinutes: 4, label: 'Out to the Quad' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'proving_yard',
      name: 'The Proving Yard',
      shortName: 'Proving Yard',
      description:
        'A sand training ground ringed by stands, with a scoreboard that shows the hero programme ranking in real time. Final-years spar here at dawn and anybody can watch. The sand remembers every fall.',
      artDirection:
        'Open-air sand training arena at dawn, tiered stands, a huge scoreboard of ranked names, two figures sparring, scuffed sand. Bright, athletic, competitive.',
      connections: [{ to: 'the_quad', travelMinutes: 3, label: 'Back to the Quad' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
    },
    {
      id: 'old_chapel',
      name: 'The Old Chapel',
      shortName: 'Chapel',
      description:
        'Disused for thirty years, locked to students, cold as a cellar. Dust on the pews, a dead organ, a bell with no rope. Behind the organ a narrow stair goes down. The chapel loft has a desk in it and a door that is always locked.',
      artDirection:
        'Abandoned stone chapel at night, dusty pews, moonlight through tall windows, a silent pipe organ with a narrow stairway behind it leading down into darkness, a bell tower with no rope. Gothic, hushed, secret.',
      connections: [
        { to: 'the_quad', travelMinutes: 5, label: 'Out to the Quad' },
        { to: 'service_corridor', travelMinutes: 4, label: 'The brick tunnel back to the atrium' },
        { to: 'room_zero', travelMinutes: 1, label: 'Down the stair behind the organ' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
    },
    {
      id: 'room_zero',
      name: 'Room Zero',
      shortName: 'Room Zero',
      description:
        'The Track’s classroom, under the chapel. Black masks on hooks along one wall, every one worn before. A scale model of the harbour on a long table with pins in it. A blackboard of entrances and exits timed to the second. It smells of lacquer and cold coffee, and there is always one lamp on.',
      artDirection:
        'Secret underground classroom beneath a chapel, a wall of black lacquer masks on hooks, a detailed scale model of a harbour on a long table, a chalkboard covered in timings, one warm lamp, stone vaulting. Theatrical, clandestine, intimate.',
      connections: [{ to: 'old_chapel', travelMinutes: 1, label: 'Up the stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 1 },
      takeableItems: [
        { itemId: 'spare_badge', qty: 1, ownerId: 'juno', aka: ['spare badge', 'the forgery', 'the fake badge', 'the copy'] },
        { itemId: 'festival_script', qty: 1, ownerId: 'marrow', aka: ['script', 'the script', 'the pages', 'festival script'] },
      ],
    },
    {
      id: 'registry',
      name: 'The Registry',
      shortName: 'Registry',
      description:
        'The academy archive under the admin tower: forty years of files on every graduate, in grey steel drawers that open only to a licence badge. At the back, one drawer is older than the rest, has two keyholes instead of one, and has not been opened in twenty-two years.',
      artDirection:
        'Underground archive vault, endless rows of grey steel filing drawers, cold strip lights, a single older brass-handled drawer at the far end with two keyholes. Bureaucratic, silent, forbidden.',
      connections: [{ to: 'the_quad', travelMinutes: 3, label: 'Back up to the Quad' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'bridge_file', qty: 1, ownerId: null, aka: ['file', 'the bridge file', 'the folder', 'the sealed file', 'bridge night file'] },
      ],
    },
    {
      id: 'harbour_front',
      name: 'The Harbour Front',
      shortName: 'Harbour',
      description:
        'Corvane’s waterfront: fish stalls by day, and this week a festival stage going up on the main pier, strings of paper lanterns, broadcast vans. The east pier is fenced off for “lighting works”. On Festival Night forty thousand people will stand here.',
      artDirection:
        'City harbour waterfront at dusk, a festival stage under construction on a wooden pier, strings of paper lanterns, fishing boats, broadcast vans, a fenced-off side pier. Lively, open, about to be crowded.',
      connections: [
        { to: 'the_quad', travelMinutes: 15, label: 'Back up the hill to the academy' },
        { to: 'waterline_precinct', travelMinutes: 5, label: 'Waterline Precinct' },
        { to: 'old_bridge', travelMinutes: 8, label: 'Along the water to the Old Bridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
    {
      id: 'waterline_precinct',
      name: 'Waterline Precinct',
      shortName: 'Precinct',
      description:
        'The harbour district police station: a front desk, a vending machine that steals coins, framed newspaper front pages of academy heroes thanking the police. In the back office there is a cot, a kettle, and Officer Tolle’s desk with the folder on it.',
      artDirection:
        'Small harbour police station at night, tired front desk, framed newspaper front pages of heroes on the wall, a back office with a cot, a kettle and a desk with a thick folder under a lamp. Worn, honest, under-funded.',
      connections: [{ to: 'harbour_front', travelMinutes: 5, label: 'Back to the harbour' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'tolle_folder', qty: 1, ownerId: 'tolle', aka: ['tolle’s folder', 'his folder', 'the incident folder', 'the case file'] },
      ],
    },
    {
      id: 'old_bridge',
      name: 'The Old Bridge',
      shortName: 'Old Bridge',
      description:
        'A stone bridge over the harbour mouth, closed to traffic. A memorial plaque marks where Anselm Dray beat the Pale Duke twenty-two years ago and the Duke fell into the water and was never found. Beside the plaque, in a frame, the ticket from the ferry that pulled Dray out.',
      artDirection:
        'Old stone bridge over a dark harbour mouth at night, a bronze memorial plaque on the parapet with a small framed ticket beside it, fog on the water, city lights behind. Lonely, historic, eerie.',
      connections: [{ to: 'harbour_front', travelMinutes: 8, label: 'Back along the water' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'ferry_ticket', qty: 1, ownerId: null, aka: ['ticket', 'the ferry ticket', 'the framed ticket', 'the stub'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_aurel',
      name: 'Aurel Academy',
      description: 'The institution itself: faculty, deans, donors and four hundred new students who think they enrolled to become heroes and nothing else. It protects its reputation first and anybody in it second.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Enrolled' },
        { atReputation: 30, label: 'In good standing' },
        { atReputation: 60, label: 'A name they drop' },
      ],
      allies: ['faction_hero_course'],
      enemies: [],
    },
    {
      id: 'faction_track',
      name: 'The Track',
      description: 'Applied Opposition: Dean Marrow, a dozen masked students and a room under the old chapel. They write the villains the city’s heroes stop on camera, and the one rule they say out loud is that nobody gets hurt.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'White Mask' },
        { atReputation: 25, label: 'Named' },
        { atReputation: 50, label: 'Trusted with scripts' },
        { atReputation: 75, label: 'Heir to the room' },
      ],
      allies: [],
      enemies: ['faction_waterline'],
    },
    {
      id: 'faction_hero_course',
      name: 'The Hero Programme',
      description: 'Professor Dray’s final-years, the ranking, the licences and the cameras. Almost all of them believe every villain they have ever stopped was real.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'A first-year' },
        { atReputation: 25, label: 'Noticed' },
        { atReputation: 50, label: 'Recommended' },
        { atReputation: 75, label: 'One of theirs' },
      ],
      allies: ['faction_aurel'],
      enemies: [],
    },
    {
      id: 'faction_waterline',
      name: 'Waterline Precinct',
      description: 'The harbour district police, tired of being thanked on television by students. Officer Tolle is the only one of them who is counting.',
      startingReputation: 0,
      ranks: [
        { atReputation: -20, label: 'Suspect' },
        { atReputation: 0, label: 'Nobody in particular' },
        { atReputation: 30, label: 'A source' },
        { atReputation: 60, label: 'Trusted' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'celeste',
      name: 'Celeste Moreau',
      role: 'Top-ranked final-year on the hero programme, holder of the First Badge, and the person you were sent to rob',
      cardBlurb:
        'She asked if you’d met before you said a word. She is wearing the badge you were sent to take, and somebody told her you were coming.',
      pronouns: 'she/her',
      publicTraits: ['Friendly in a way that is also surveillance', 'Competitive about everything, including small talk', 'Keeps promises to the minute'],
      hiddenDrives: [
        'She wants the top of the ranking because she earned it, and has started to suspect the academy decides who earns things',
        'Professor Dray told her a thief would come for the badge tonight, and she badly wants to pass whatever test that is',
      ],
      values: ['A fair fight, which she is beginning to notice she has never had', 'Saying the score out loud, even when it is against her'],
      fears: [
        'That every rescue she is proud of was arranged for her',
        'Being the person Dray built rather than the person she is',
      ],
      socialStyle:
        'Opens with a compliment and a question in the same breath. Touches your sleeve while she talks, to find out what is in the pocket.',
      boundaries: [
        'Will not give the badge up without a contest, even to somebody she likes',
        'Will not hurt a bystander for a test, whoever ordered it',
      ],
      goals: ['Catch the thief before midnight and keep the badge', 'Find out why her mentor knew there would be one'],
      secrets: [
        {
          id: 'celeste_the_test',
          fact: 'An hour before the masquerade, Professor Dray told her a first-year from “a city security exercise” would try for her badge tonight, and that catching them is her real final exam.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you are honest with her about anything at all before midnight, or if you find her alone on the balcony after the toast.',
        },
        {
          id: 'celeste_the_footage',
          fact: 'She has rewatched her three best rescues. In all three the villain fell exactly where the camera was. She has not told anybody, including herself, what she thinks it means.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once she knows you are on the Track and has decided not to turn you in.',
        },
      ],
      speechStyle:
        'Bright, quick and slightly formal, like somebody who has given a lot of speeches. Keeps score out loud. Asks questions she already knows the answers to, and watches your hands while you answer them.',
      topics: ['the badge', 'her test', 'Professor Dray', 'the hero ranking', 'Festival Night', 'her rescues'],
      voiceSamples: [
        'Hi. I’m Celeste. Have we met? You have the face of somebody I am supposed to remember.',
        'That is one to you. I do not usually give those out on the first night.',
        'Somebody told me a thief would try for this before midnight. I said good. Nobody has ever let me lose anything, and I would like to know what it feels like.',
        'Three rescues, three villains who fell exactly where the cameras were. Tell me that is luck. Please. I would like it to be luck.',
      ],
      appearance:
        'Twenty-two, tall and athletic, sleek black hair in a low knot, a white silk half-mask pushed up into her hair, a fitted white gala suit with a gold badge on the lapel.',
      visualHook: 'A gold badge numbered 001 on a white lapel, and a white silk half-mask pushed up into her hair like sunglasses.',
      silhouette: 'Upright, one elbow on the bar, weight forward, turning a glass by its stem.',
      artSeed: 'vt-celeste-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'competitive', 'surprised', 'warm', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 400, locationId: 'gilt_house', activity: 'in her top-floor room, lights out at exactly one' },
        { startMinute: 400, endMinute: 480, locationId: 'proving_yard', activity: 'running laps of the yard before anybody else is up' },
        { startMinute: 480, endMinute: 780, locationId: 'the_quad', activity: 'marshalling first-years with a clipboard and the badge on her lapel' },
        { startMinute: 780, endMinute: 1020, locationId: 'proving_yard', activity: 'sparring with whoever is brave enough to ask' },
        { startMinute: 1020, endMinute: 1140, locationId: 'gilt_house', activity: 'studying with her door open' },
        { startMinute: 1140, endMinute: 1335, locationId: 'glass_atrium', activity: 'at the atrium bar, being congratulated by people who want something' },
        { startMinute: 1335, endMinute: 1440, locationId: 'atrium_balcony', activity: 'in the dark corner of the balcony, the badge in her hand' },
      ],
      homeLocationId: 'gilt_house',
      knowledgeScope: ['celeste', 'gilt_house', 'the_hero_course', 'first_badge', 'festival_night', 'the_ranking', 'anselm_dray'],
      startingRelationship: { trust: 15, affection: 20, respect: 10, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'celeste_off_the_record',
          label: 'She tells you who warned her',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'celeste_lets_you_in',
          label: 'She knows what you are, and stays',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60, flagsSet: ['she_unmasked_you'] },
        },
        {
          id: 'celeste_side_by_side',
          label: 'She fights beside you instead of against you',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 50 },
        },
      ],
      attributes: { might: 13, agility: 16, mind: 14, presence: 15, resolve: 15, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 17, damage: 9, tags: ['hero', 'final-year', 'steps-through-light'] },
    },
    {
      id: 'marrow',
      name: 'Dean Marrow',
      calledName: 'Marrow',
      role: 'Masked Dean of Applied Opposition, the course with no room number, and the man who put the black mask in your hand',
      cardBlurb:
        'Nobody has ever seen his face. He picked you for the villain track, gave you until midnight, and did not say what happens if you are late.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to a degree that frightens people', 'Never raises his voice', 'Hears a lie as a wrong note, and says so'],
      hiddenDrives: [
        'He wants out. Twenty-two years of writing villains for the man who beat him, and he would like to end it without the city ever learning it happened',
        'He wants the badge because one drawer in the Registry holds the only proof of Bridge Night, and the man who keeps it has used it as a leash on him ever since',
      ],
      values: ['Nobody gets hurt. It is the only rule of the Track he wrote himself', 'A performance done properly, for an audience that never knows'],
      fears: [
        'That the Track has turned into something he would once have fought',
        'Being unmasked by somebody he trained',
      ],
      socialStyle:
        'Speaks in stage directions. Stands behind people rather than in front of them. Gives orders as though they were favours, and favours as though they were orders.',
      boundaries: [
        'Will not take off the mask, for anybody, short of the end',
        'Will not let a recruit be hurt for a scene; he will cancel a whole night first',
      ],
      goals: ['Have the badge in Room Zero before the first week ends and the drawer seals again', 'Find out which of his recruits can be trusted with the truth'],
      secrets: [
        {
          id: 'marrow_the_duke',
          fact: 'He was the Pale Duke, the city’s last great villain, who “fell” from the Old Bridge twenty-two years ago. Anselm Dray wrote the fight. Marrow agreed to it, and has worn a mask ever since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it himself, only to a recruit who has brought him the badge and asked him a straight question about Bridge Night.',
        },
        {
          id: 'marrow_not_page_nine',
          fact: 'He did not write page nine of the festival script and does not know it has been changed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Show him the script, open at page nine, and watch him go completely still.',
        },
      ],
      speechStyle:
        'Low, formal and theatrical, every sentence finished. Talks about crimes as productions: entrances, cues, the house, the curtain. Never swears, never hurries, and never answers the question that was actually asked.',
      topics: ['the Track', 'your assignment', 'the rules of Room Zero', 'villain names', 'Festival Night', 'Bridge Night'],
      voiceSamples: [
        'Your letter came from my side of the academy. First assignment: her badge. By midnight.',
        'Entrances are cheap. Anybody can arrive. I train people to leave a room so that nobody remembers the door.',
        'The only rule I wrote myself: nobody gets hurt. Every other rule here came with the building.',
        'You missed your cue. The house did not notice. I did.',
      ],
      appearance:
        'Fifty-eight, very tall and thin in an immaculate black evening coat and grey gloves, a full-face mask of polished white bone with a carved, patient smile.',
      visualHook: 'A full-face mask of polished white bone, carved into a patient smile, that nobody has ever seen him take off.',
      silhouette: 'Very tall, very still, gloved hands folded on the head of a black cane.',
      artSeed: 'vt-marrow-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'still', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'room_zero', activity: 'in Room Zero with one lamp on, writing scripts longhand' },
        { startMinute: 420, endMinute: 720, locationId: 'old_chapel', activity: 'in the chapel loft he calls an office, door locked' },
        { startMinute: 720, endMinute: 1080, locationId: 'room_zero', activity: 'teaching, if anybody has come down' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_quad', activity: 'walking the Quad at dusk, unnoticed in a way that is a skill' },
        { startMinute: 1260, endMinute: 1380, locationId: 'service_corridor', activity: 'behind the service door, watching the room through the gap at the hinge' },
        { startMinute: 1380, endMinute: 1440, locationId: 'room_zero', activity: 'waiting in Room Zero for midnight' },
      ],
      homeLocationId: 'room_zero',
      knowledgeScope: ['the_track', 'room_zero', 'bridge_night', 'anselm_dray', 'festival_night', 'the_registry', 'juno'],
      startingRelationship: { trust: 30, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'marrow_bridge_night',
          label: 'He tells you about Bridge Night',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['badge_delivered'] },
        },
        {
          id: 'marrow_the_keys',
          label: 'He gives you the keys to Room Zero',
          kind: 'ALLIANCE',
          requires: { trust: 70, respect: 60 },
        },
      ],
      attributes: { might: 11, agility: 13, mind: 17, presence: 17, resolve: 16, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 17, damage: 8, tags: ['villain', 'retired'] },
    },
    {
      id: 'juno',
      name: 'Juno Pike',
      role: 'Final-year on the villain track, your handler, and in daylight the resident advisor of your dorm',
      cardBlurb:
        'She is the senior assigned to keep you alive on the Track, she is serving drinks at the masquerade in a waiter’s jacket, and she has a reason of her own for wanting that badge taken tonight.',
      pronouns: 'she/her',
      publicTraits: ['Dry as paper', 'Times everything', 'Fixes masks, locks and people, in that order'],
      hiddenDrives: [
        'Two years ago a staged warehouse job caught fire for real and she carried the night watchman out. She has been trying to prove ever since that somebody changed the script',
        'She suggested this year’s first assignment. She needs the badge in the Registry, and has waited three years for a recruit she would trust with it',
      ],
      values: ['Exit routes before entrances', 'Owning what you did, even when nobody saw'],
      fears: ['A second fire with her name on the call sheet', 'Being right about Dray and never able to prove it'],
      socialStyle:
        'Appears beside you with a tray. Gives advice as countdowns. Calls you White Mask until she decides you have earned a name.',
      boundaries: [
        'Will not lie to you about how dangerous a job is, though she will not tell you everything',
        'Will not go near fire, or let you near it, without saying so first',
      ],
      goals: ['Get the badge into the Registry before the first week ends', 'Prove who added the fire to the warehouse script'],
      secrets: [
        {
          id: 'juno_the_warehouse',
          fact: 'Two years ago she was on a staged warehouse robbery that caught fire for real. She carried the night watchman, Ned Tolle, down a burning staircase. The fire was not in Marrow’s script, and she believes Professor Dray added it to make the footage look real.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you once you have a villain name, if you ask her why she flinches when somebody strikes a match.',
        },
        {
          id: 'juno_the_spares',
          fact: 'She has forged a spare First Badge every year for three years and never used one. This year’s is in Room Zero.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She offers it if you tell her honestly how you plan to take the real one.',
        },
      ],
      speechStyle:
        'Clipped and dry, numbers instead of adjectives. Counts down out loud. Says “noted” instead of thank you and “no” as a complete sentence.',
      topics: ['the job tonight', 'Room Zero', 'the warehouse', 'the spare badge', 'exit routes', 'Marrow'],
      voiceSamples: [
        'Eleven minutes to the toast. When the professor raises his glass, every head in this room goes up. Hands go down. Noted?',
        'No. Do not pick a door because it is close. Pick it because you know what is behind it.',
        'Two years ago I carried a man down a burning staircase on a job that was not supposed to have a fire in it. So I read every page now. Twice.',
        'You get a name when you have earned one. Until then you are White Mask, and White Mask fetches coffee.',
      ],
      appearance:
        'Twenty-three, short and wiry, cropped copper hair, a black waiter’s jacket with the sleeves pushed up, a brass stopwatch on a cord, old burn marks across the knuckles of her left hand.',
      visualHook: 'A brass stopwatch on a cord around her neck, which she checks instead of a phone.',
      silhouette: 'Small and quick, a tray balanced on one hand, always half-turned toward an exit.',
      artSeed: 'vt-juno-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'wary', 'amused', 'haunted'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'block_c', activity: 'in the resident advisor’s room at the top of Block C, door shut' },
        { startMinute: 480, endMinute: 720, locationId: 'proving_yard', activity: 'teaching first-years to fall properly, as the yard’s assistant' },
        { startMinute: 720, endMinute: 1020, locationId: 'room_zero', activity: 'in Room Zero, mending masks and locks' },
        { startMinute: 1020, endMinute: 1200, locationId: 'harbour_front', activity: 'on the pier with the stopwatch, timing things nobody asked her to' },
        { startMinute: 1200, endMinute: 1380, locationId: 'glass_atrium', activity: 'working the atrium in a waiter’s jacket, watching the room' },
        { startMinute: 1380, endMinute: 1440, locationId: 'block_c', activity: 'back at Block C, checking which doors are locked' },
      ],
      homeLocationId: 'block_c',
      knowledgeScope: ['the_track', 'room_zero', 'the_warehouse', 'the_registry', 'first_badge', 'marrow', 'exit_routes'],
      startingRelationship: { trust: 35, affection: 20, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'juno_the_warehouse_gate',
          label: 'She tells you about the warehouse',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['has_a_villain_name'] },
        },
        {
          id: 'juno_crew',
          label: 'She treats you as crew, not a recruit',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 40 },
        },
      ],
      attributes: { might: 11, agility: 16, mind: 15, presence: 12, resolve: 15, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 15, damage: 6, tags: ['villain-track', 'senior'] },
    },
    {
      id: 'tolle',
      name: 'Bram Tolle',
      calledName: 'Tolle',
      role: 'Ungifted officer at Waterline Precinct, working the masquerade’s security cordon because he asked to',
      cardBlurb:
        'The one policeman in Corvane who has noticed that the academy’s villains always lose on camera. Tonight he is outside your party with a coffee he never drinks, and he remembers every face you show him.',
      pronouns: 'he/him',
      publicTraits: ['Patient to the point of rudeness', 'Writes everything down in pencil', 'Polite to students, which they find unnerving'],
      hiddenDrives: [
        'The watchman in the warehouse fire was his brother. He has been counting academy incidents ever since, and he is at eleven',
        'He does not want to arrest a student. He wants the adult who writes the scripts',
      ],
      values: ['Evidence before opinions', 'Nobody is too famous to answer a question'],
      fears: ['Being right and too small to matter', 'Arresting a scared first-year and letting the man behind them walk'],
      socialStyle: 'Asks one question, then waits far longer than is comfortable. Offers coffee as an opening move.',
      boundaries: [
        'Will not plant or bend evidence, even against somebody he is sure of',
        'Will not take a bribe, and is insulted by the size of the offers',
      ],
      goals: ['Find out who is staging the academy’s villains', 'Get somebody on the inside to talk before Festival Night'],
      secrets: [
        {
          id: 'tolle_ned',
          fact: 'The night watchman in the warehouse fire was his older brother, Ned, who walks with a stick now. Tolle has never told his superiors the case is personal.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you ask about the photograph in his folder instead of about yourself.',
        },
        {
          id: 'tolle_the_ninth',
          fact: 'He already suspects Professor Dray, who was first on scene at nine of the eleven incidents, and cannot say so out loud without proof.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to somebody who has first given him something he could check.',
        },
      ],
      speechStyle:
        'Plain, slow and courteous, a harbour accent. Calls people sir or miss until he has their name. Reads numbers off his notebook rather than from memory, and never threatens anybody: he lists what happens next.',
      topics: ['the eleven incidents', 'the warehouse fire', 'his brother', 'the First Badge', 'Professor Dray', 'Festival Night'],
      voiceSamples: [
        'Evening. Coffee? It is terrible. I am not here about the coffee.',
        'Eleven times in four years a villain has been stopped by an academy student in front of a camera. I have the dates in pencil. Pencil is for things that are not finished.',
        'Here is what happens next, and I want to be clear it is not a threat. I write your answer down. Tomorrow I come back and see if it is still true.',
      ],
      appearance:
        'Forty-one, heavy-set and weathered, close-cropped grey hair, a borrowed dinner jacket a size too small over a police lanyard.',
      visualHook: 'A paper cup of precinct coffee he carries everywhere and never drinks.',
      silhouette: 'Broad and planted, one hand holding a paper cup, the other in the pocket of a jacket that does not fit.',
      artSeed: 'vt-tolle-01',
      portrait: null,
      expressions: ['neutral', 'patient', 'wary', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'waterline_precinct', activity: 'asleep on the cot in the precinct back office' },
        { startMinute: 420, endMinute: 840, locationId: 'waterline_precinct', activity: 'at his desk with the folder open' },
        { startMinute: 840, endMinute: 1140, locationId: 'harbour_front', activity: 'walking the pier where the festival stage is going up' },
        { startMinute: 1140, endMinute: 1440, locationId: 'the_quad', activity: 'on the academy cordon, coffee in hand, watching who comes and goes' },
      ],
      homeLocationId: 'waterline_precinct',
      knowledgeScope: ['the_eleven_incidents', 'the_warehouse', 'waterline_precinct', 'harbour_front', 'anselm_dray', 'ned_tolle'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tolle_the_folder',
          label: 'He shows you the folder',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['spoke:tolle'] },
        },
        {
          id: 'tolle_a_deal',
          label: 'He offers you a deal',
          kind: 'ALLIANCE',
          requires: { trust: 45, respect: 40 },
        },
      ],
      attributes: { might: 14, agility: 10, mind: 15, presence: 12, resolve: 17, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 14, damage: 8, tags: ['police', 'ungifted'] },
    },
    {
      id: 'dray',
      name: 'Professor Anselm Dray',
      calledName: 'Dray',
      role: 'Head of the Hero Programme, the city’s most famous living hero, and the bronze statue in the middle of the Quad',
      cardBlurb:
        'He beat the city’s last great villain on the Old Bridge twenty-two years ago, he trained the woman you were sent to rob, and he seems to know far more about your assignment than a man on a balcony should.',
      pronouns: 'he/him',
      publicTraits: ['Warm, famous, and good at both', 'Remembers every donor’s family by name', 'Tells the Bridge Night story better every year'],
      hiddenDrives: [
        'He wrote Bridge Night, and every year since he has needed the city to keep believing it',
        'He added page nine to the festival script. A real fire on the east pier, contained and filmed and stopped by Celeste, buys the hero programme ten more years of money and puts her at the top of the ranking on her first day',
      ],
      values: ['The city needs to believe somebody is coming to save it', 'Results the cameras can see'],
      fears: ['A city that stops believing in heroes, and what it does next', 'Marrow, unmasked, telling it himself'],
      socialStyle:
        'Generous, tactile, always being photographed. Uses your first name the moment he learns it and makes it feel like a present.',
      boundaries: [
        'Will never admit Bridge Night was staged, even alone, even to Marrow',
        'Will not raise a hand to a student in public; he has people and a reputation for that',
      ],
      goals: ['Put Celeste at the top of the ranking on Festival Night', 'Catch the Track’s recruit with the badge, and own them afterwards'],
      secrets: [
        {
          id: 'dray_page_nine',
          fact: 'He wrote page nine of the festival script: a charge under the east pier at 19:42, which he believes he can contain. He added the warehouse fire two years ago for the same reason.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The handwriting on page nine matches every photograph he has ever signed. Anybody holding both can see it.',
        },
        {
          id: 'dray_the_test',
          fact: 'He warned Celeste about the thief so that whoever the Track sent would be caught by his best student, and would owe him their freedom afterwards.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He offers you exactly that bargain himself, if he learns you took the badge.',
        },
      ],
      speechStyle:
        'A warm baritone with a lecturer’s pauses, anecdotes that end in morals. Says “we” for the academy and talks about “the city” as if it were a person he loves. Never says villain; he says “the opposition”.',
      topics: ['Bridge Night', 'the hero programme', 'Celeste', 'the city', 'Festival Night', 'your future'],
      voiceSamples: [
        'Corvane wants a morning paper with a hero on the front. Twenty-two years, and that paper has never once been late.',
        'Call me Anselm. Everybody does, eventually, and you strike me as somebody who gets there early.',
        'I have always found the opposition to be the most honest people in any building. They at least know they are performing.',
        'Fires can be contained. Doubts cannot. Remember that when you are frightened of the wrong thing.',
      ],
      appearance:
        'Sixty-three, broad-shouldered and silver-haired, a famous jaw and a warm smile, a white scar through one eyebrow he points to when he tells the Bridge Night story.',
      visualHook: 'A long pale-gold greatcoat, cut exactly like the bronze statue of him in the middle of the Quad.',
      silhouette: 'Broad, chin up, one hand raised mid-toast and the other on somebody’s shoulder.',
      artSeed: 'vt-dray-01',
      portrait: null,
      expressions: ['warm', 'amused', 'stern', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_quad', activity: 'in the faculty house on the Quad, a light on late' },
        { startMinute: 420, endMinute: 720, locationId: 'proving_yard', activity: 'running the final-year session himself' },
        { startMinute: 720, endMinute: 1080, locationId: 'the_quad', activity: 'on the statue steps, posing for photographs he pretends not to enjoy' },
        { startMinute: 1080, endMinute: 1440, locationId: 'atrium_balcony', activity: 'on the balcony with the donors, shaking every hand twice' },
      ],
      homeLocationId: 'the_quad',
      knowledgeScope: ['bridge_night', 'the_hero_course', 'celeste', 'festival_night', 'the_track', 'page_nine', 'the_registry'],
      startingRelationship: { trust: 20, affection: 15, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'dray_the_offer',
          label: 'He offers you a place on the other side',
          kind: 'OTHER',
          requires: { respect: 25, flagsSet: ['badge_taken'] },
        },
        {
          id: 'dray_confides',
          label: 'He tells you what he thinks the city is for',
          kind: 'TRUST',
          requires: { trust: 60, respect: 55 },
        },
      ],
      attributes: { might: 16, agility: 12, mind: 15, presence: 18, resolve: 16, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 18, damage: 12, tags: ['hero', 'legend', 'unhurt-while-breath-held'] },
    },
    {
      id: 'rafe',
      name: 'Rafe Corrigan',
      role: 'Another first-year with a black mask in his pocket, and the same assignment as you',
      cardBlurb:
        'He got the same letter you did and the same deadline, he is very bad at hiding that he is watching the same badge, and only one of you is staying on the Track.',
      pronouns: 'he/him',
      publicTraits: ['Talks when nervous, which is always', 'Generous with things he cannot afford', 'Very funny at the worst moments'],
      hiddenDrives: [
        'His family’s fishing boat is two payments from being taken. The Track’s stipend is the only reason he is still enrolled',
        'Somebody from the hero programme has offered him a hero’s place in exchange for the Track’s names. He has not said yes. He has not said no',
      ],
      values: ['Family first, including the parts that do not deserve it', 'Never leaving somebody behind on a job'],
      fears: ['Going home on the ferry with nothing', 'Being the reason somebody else gets caught'],
      socialStyle: 'Fills every silence with a joke, then says something true by accident and changes the subject.',
      boundaries: [
        'Will not hurt Celeste, or anybody, for a stipend',
        'Will not sell you out to your face; if he does it at all, it will be somewhere you cannot see, and he will hate it',
      ],
      goals: ['Be the one who brings Marrow the badge', 'Keep the boat without it costing him the person standing next to him'],
      secrets: [
        {
          id: 'rafe_same_job',
          fact: 'Marrow gave him the same assignment as the player. Whoever brings the badge stays on the Track; the other goes back to being an ordinary first-year with no stipend.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He blurts it out the first time you are kind to him under pressure.',
        },
        {
          id: 'rafe_the_offer',
          fact: 'Somebody from the hero programme has offered him a place on the hero side in exchange for the names of everybody on the Track. He has until Festival Night to answer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He confesses it if you trust him with something real first, or if you see him leave the faculty house on the Quad.',
        },
      ],
      speechStyle:
        'Fast, rambling and self-interrupting, full of harbour slang. Ends anything he is unsure of with “right?”. Goes very quiet and plain when he finally means something.',
      topics: ['the assignment', 'his family’s boat', 'the stipend', 'his gift', 'the offer from the hero programme', 'the harbour'],
      voiceSamples: [
        'Right, so, hypothetically, if two people had the same terrible idea at the same party, they could just split it, right? Halves?',
        'My dad’s boat has a name and a debt, and the debt is louder.',
        'I can throw a sound anywhere I can see. A dropped tray by the door. A scream on the stairs. Most useless gift in the building, until suddenly it isn’t.',
        'They offered me the other side. Hero programme, real licence. All I have to do is say your name. I haven’t. I wanted you to hear that from me.',
      ],
      appearance:
        'Twenty, lanky and sunburnt, shaggy salt-bleached hair, a day of stubble, rope-scarred fisherman’s hands, a rented tuxedo with the sleeves two inches short, a white intake mask tied badly.',
      visualHook: 'A white intake mask tied badly and always slipping down his nose, and rope-scarred fisherman’s hands sticking out of a rented tuxedo’s short sleeves.',
      silhouette: 'Long and loose-limbed, hands always moving, leaning in as if sharing a secret.',
      artSeed: 'vt-rafe-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'nervous', 'sheepish', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'block_c', activity: 'in his room in Block C, two doors from yours' },
        { startMinute: 450, endMinute: 720, locationId: 'the_quad', activity: 'late for everything, running across the Quad' },
        { startMinute: 720, endMinute: 1020, locationId: 'room_zero', activity: 'in Room Zero, pretending he understands the lockwork' },
        { startMinute: 1020, endMinute: 1260, locationId: 'harbour_front', activity: 'working a shift on the fish stalls for cash' },
        { startMinute: 1260, endMinute: 1440, locationId: 'glass_atrium', activity: 'in the atrium near the bar, watching the same badge you are' },
      ],
      homeLocationId: 'block_c',
      knowledgeScope: ['the_track', 'block_c', 'harbour_front', 'the_assignment', 'the_hero_course_offer'],
      startingRelationship: { trust: 20, affection: 25, respect: 10, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'rafe_halves',
          label: 'He offers to split the job',
          kind: 'ALLIANCE',
          requires: { trust: 40 },
        },
        {
          id: 'rafe_the_offer_gate',
          label: 'He tells you about the offer',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['on_the_track'] },
        },
      ],
      attributes: { might: 12, agility: 14, mind: 11, presence: 13, resolve: 10, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 13, damage: 5, tags: ['villain-track', 'recruit'] },
    },
  ],
  quests: [
    {
      id: 'q_the_badge',
      title: 'Her Badge, By Midnight',
      summary: 'A masked dean wants the gold badge off the best hero student in the building, delivered to a room under the old chapel before the bell. She was warned you were coming.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['celeste', 'marrow', 'juno', 'rafe'],
      involvedLocationIds: ['glass_atrium', 'atrium_balcony', 'room_zero'],
      knownRewardCopy: 'A place on the Track, or a very different first week.',
      steps: [
        {
          id: 'take_it',
          playerCopy: 'Take the gold badge off Celeste Moreau before midnight, unseen, without hurting anybody. Or refuse.',
          directorNotes:
            'Celeste knows somebody is coming for it, because Dray told her an hour ago, and she is watching hands. A clumsy lift gets caught and she says “that is one to me” and lets go, because she wants to see the second attempt. Rafe is trying for the same badge. Juno is in the room as a waiter and will help a player who asks her properly. Refusing is a real route and must never be treated as failing to start the story.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'swapped_it',
              label: 'Swap it for Juno’s forgery, so nobody knows it is gone',
              predicate: { flagsSet: ['used:lift_it'], hasItems: ['spare_badge'] },
              setsFlags: ['badge_taken', 'swapped_it', 'registry_open'],
              closesFlags: ['clean_lift'],
            },
            {
              routeId: 'she_handed_it_over',
              label: 'Tell her the truth and let her decide',
              predicate: {
                flagsSet: ['used:go_off_script'],
                minRelationship: [{ characterId: 'celeste', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['badge_taken', 'she_unmasked_you', 'celeste_in_on_it', 'registry_open'],
              closesFlags: ['refused_the_job'],
            },
            {
              routeId: 'lifted_it',
              label: 'Lift it off her lapel without her feeling it',
              predicate: { flagsSet: ['used:lift_it'] },
              setsFlags: ['badge_taken', 'clean_lift', 'registry_open'],
              closesFlags: ['refused_the_job'],
            },
            {
              routeId: 'she_caught_you',
              label: 'Get caught in the act by the person you were robbing',
              predicate: {
                flagsSet: ['spoke:celeste'],
                minRelationship: [{ characterId: 'celeste', dimension: 'rivalry', value: 35 }],
              },
              setsFlags: ['she_caught_you', 'she_unmasked_you'],
              closesFlags: ['clean_lift'],
            },
            {
              routeId: 'rafe_took_it',
              label: 'Help Rafe take it, or let him',
              predicate: {
                flagsSet: ['spoke:rafe'],
                minRelationship: [{ characterId: 'rafe', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['rafe_took_it'],
              closesFlags: ['badge_taken'],
            },
            {
              routeId: 'refused_the_job',
              label: 'Refuse the assignment',
              predicate: { flagsSet: ['used:go_off_script'] },
              setsFlags: ['refused_the_job'],
              closesFlags: ['badge_taken'],
            },
            {
              routeId: 'ran_out_of_time',
              label: 'Still be at the bar when the bell rings',
              predicate: { flagsSet: ['missed_midnight'] },
              setsFlags: ['out_of_time'],
              closesFlags: ['badge_taken'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['badge_settled'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'midnight',
          playerCopy: 'Decide what reaches Room Zero when the bell rings: the badge, an excuse, or nobody.',
          directorNotes:
            'Marrow is waiting with his hand out. He hears lies as wrong notes, so an excuse has to be true to work. Handing the badge to Juno instead is a choice he will notice and not punish. Giving it back to Celeste is the route where she owes the player something, and she pays debts to the minute.',
          enterWhen: { flagsSet: ['badge_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'delivered_it',
              label: 'Put it in Marrow’s hand in Room Zero',
              predicate: { hasItems: ['gold_badge'], atLocation: 'room_zero' },
              setsFlags: ['badge_delivered', 'on_the_track'],
              closesFlags: ['badge_returned'],
            },
            {
              routeId: 'gave_it_to_juno',
              label: 'Give it to Juno instead',
              predicate: {
                hasItems: ['gold_badge'],
                minRelationship: [{ characterId: 'juno', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['juno_has_the_badge', 'on_the_track'],
              closesFlags: ['badge_delivered'],
            },
            {
              routeId: 'gave_it_back',
              label: 'Give it back to Celeste',
              predicate: { hasItems: ['gold_badge'], flagsSet: ['used:go_off_script', 'spoke:celeste'] },
              setsFlags: ['badge_returned', 'celeste_owes_you'],
              closesFlags: ['badge_delivered'],
            },
            {
              routeId: 'rafe_delivered',
              label: 'Let Rafe be the one who brings it',
              predicate: { flagsSet: ['rafe_took_it'] },
              setsFlags: ['rafe_delivered', 'on_the_track', 'on_probation'],
              closesFlags: ['badge_delivered'],
            },
            {
              routeId: 'walked_out',
              label: 'Walk out into the Quad and keep walking',
              predicate: { flagsSet: ['refused_the_job', 'visited:the_quad'] },
              setsFlags: ['walked_off_the_track'],
              closesFlags: ['on_the_track'],
            },
            {
              routeId: 'empty_handed',
              label: 'Turn up with nothing and say so',
              predicate: { flagsSet: ['missed_midnight'] },
              setsFlags: ['on_probation', 'on_the_track'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_track', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_applied_opposition',
      title: 'Applied Opposition',
      summary: 'A dozen masked students in a room under the old chapel, learning to lose on camera. Nobody gets a name until the room decides they have earned one.',
      kind: 'MAIN',
      involvedCharacterIds: ['marrow', 'juno', 'rafe'],
      involvedLocationIds: ['room_zero', 'old_chapel', 'harbour_front'],
      knownRewardCopy: 'A villain name, a part in Festival Night, and the whole script if you can get it.',
      discoverWhen: { flagsSet: ['on_the_track'] },
      steps: [
        {
          id: 'earn_a_name',
          playerCopy: 'Get through your first days in Room Zero and earn a villain name.',
          directorNotes:
            'Lessons in falling, timing, masks and lockwork, taught as theatre. The Track is warm, funny and close, and that should be a real pull: these are people who are good at something secret together. Name Night is the one ceremony. The player can be named by Marrow, by Juno, by the room, or can name themselves.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'named_by_marrow',
              label: 'Impress Marrow enough that he names you himself',
              predicate: { minRelationship: [{ characterId: 'marrow', dimension: 'respect', value: 35 }] },
              setsFlags: ['named_by_marrow'],
              closesFlags: [],
            },
            {
              routeId: 'named_by_juno',
              label: 'Let Juno name you',
              predicate: {
                flagsSet: ['visited:room_zero'],
                minRelationship: [{ characterId: 'juno', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['named_by_juno'],
              closesFlags: [],
            },
            {
              routeId: 'named_yourself',
              label: 'Name yourself, and make the room accept it',
              predicate: { flagsSet: ['used:wear_the_lie', 'name_night_happened'] },
              setsFlags: ['named_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'named_by_the_room',
              label: 'Stand under the lamp on Name Night and take what the room gives you',
              predicate: { flagsSet: ['name_night_happened'], atLocation: 'room_zero' },
              setsFlags: ['named_by_the_room'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['has_a_villain_name'],
            abilities: ['play_the_villain'],
            reputation: [{ factionId: 'faction_track', amount: 15 }],
          },
        },
        {
          id: 'page_nine',
          playerCopy: 'Read the festival script, and find the page that does not belong.',
          directorNotes:
            'Recruits get their own pages and are not supposed to read ahead. The master copy is on Marrow’s desk. Page nine is in a different ink and adds a charge under the east pier at 19:42. A player who never reads past their own lines is making an ordinary choice, and the world should let them.',
          enterWhen: { flagsSet: ['has_a_villain_name'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'showed_marrow',
              label: 'Take the master copy to Marrow, open at page nine',
              predicate: { hasItems: ['festival_script'], flagsSet: ['spoke:marrow'] },
              setsFlags: ['knows_the_charge', 'holds_proof', 'marrow_knows_page_nine'],
              closesFlags: ['never_read_it'],
            },
            {
              routeId: 'stole_the_master',
              label: 'Take the master copy off his desk',
              predicate: { hasItems: ['festival_script'] },
              setsFlags: ['knows_the_charge', 'holds_proof', 'holds_the_script'],
              closesFlags: ['never_read_it'],
            },
            {
              routeId: 'read_it_with_juno',
              label: 'Read every page with Juno, twice',
              predicate: {
                flagsSet: ['script_handed_out'],
                minRelationship: [{ characterId: 'juno', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows_the_charge', 'juno_trusts_you'],
              closesFlags: ['never_read_it'],
            },
            {
              routeId: 'took_it_on_trust',
              label: 'Learn your own lines and trust the rest',
              predicate: { flagsSet: ['script_handed_out'] },
              setsFlags: ['never_read_it'],
              closesFlags: ['knows_the_charge'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['script_settled'],
            abilities: ['broadcast_it'],
            reputation: [{ factionId: 'faction_track', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_have_we_met',
      title: 'Have We Met?',
      summary: 'The woman you were sent to rob was told you were coming, and she has her own test to pass. One of you is going to find out who set you against each other.',
      kind: 'SIDE',
      involvedCharacterIds: ['celeste', 'dray'],
      involvedLocationIds: ['glass_atrium', 'atrium_balcony', 'gilt_house', 'block_c'],
      knownRewardCopy: 'The truth about her test, and whatever the two of you decide to be under the masks.',
      discoverWhen: { flagsSet: ['spoke:celeste'] },
      steps: [
        {
          id: 'her_test',
          playerCopy: 'Find out why the best hero student in the building already knew somebody was coming.',
          directorNotes:
            'Three ways in and they are not equivalent. She can tell the player herself, which means she has decided to trust them. The player can overhear Dray on the balcony. Or Dray can tell the player himself, inside his bargain, which means he now owns a piece of them.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself',
              predicate: { minRelationship: [{ characterId: 'celeste', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows_her_test', 'celeste_confided'],
              closesFlags: [],
            },
            {
              routeId: 'overheard_dray',
              label: 'Overhear Dray on the balcony',
              predicate: { flagsSet: ['visited:atrium_balcony', 'used:case_the_room'] },
              setsFlags: ['knows_her_test', 'knows_dray_set_it_up'],
              closesFlags: [],
            },
            {
              routeId: 'dray_told_you',
              label: 'Hear it from Dray, as part of his offer',
              predicate: { flagsSet: ['dray_approached'] },
              setsFlags: ['knows_her_test', 'knows_dray_set_it_up', 'dray_owns_a_piece'],
              closesFlags: ['celeste_confided'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['her_test_known'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'under_the_masks',
          playerCopy: 'Decide what you and Celeste are, under the masks.',
          directorNotes:
            'She is not a prize and cannot be won by persistence. Every route here is something two adults decide together. If it becomes romance it stays at flirtation, honesty and one kiss at most. If it stays rivalry, it is the best rivalry either of them has had. If the player keeps lying, she may never know, and that is its own kind of ending.',
          enterWhen: { flagsSet: ['her_test_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'unmasked_together',
              label: 'Take the masks off with her',
              predicate: {
                minRelationship: [
                  { characterId: 'celeste', dimension: 'trust', value: 55 },
                  { characterId: 'celeste', dimension: 'affection', value: 60 },
                ],
              },
              setsFlags: ['celeste_and_you', 'she_unmasked_you'],
              closesFlags: ['she_never_knew'],
            },
            {
              routeId: 'rivals_by_choice',
              label: 'Stay rivals, honestly and on purpose',
              predicate: {
                minRelationship: [
                  { characterId: 'celeste', dimension: 'rivalry', value: 45 },
                  { characterId: 'celeste', dimension: 'respect', value: 45 },
                ],
              },
              setsFlags: ['honest_rivals', 'she_unmasked_you'],
              closesFlags: ['celeste_and_you'],
            },
            {
              routeId: 'kept_the_mask_on',
              label: 'Keep lying to her',
              predicate: { flagsSet: ['used:wear_the_lie'] },
              setsFlags: ['she_never_knew'],
              closesFlags: ['celeste_and_you', 'she_unmasked_you'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['celeste_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_hero_course', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_eleven_incidents',
      title: 'Eleven Incidents',
      summary: 'A policeman with a folder of eleven villains who always lost on camera, and one warehouse fire that was not supposed to happen.',
      kind: 'SIDE',
      involvedCharacterIds: ['tolle', 'juno', 'dray'],
      involvedLocationIds: ['the_quad', 'waterline_precinct', 'block_c'],
      knownRewardCopy: 'What Officer Tolle knows, and what he gets from you in return.',
      discoverWhen: { flagsSet: ['met:tolle'] },
      steps: [
        {
          id: 'his_folder',
          playerCopy: 'Find out what Officer Tolle thinks he knows about the academy.',
          directorNotes:
            'He is not looking for students. He is looking for whoever writes the scripts, and he is patient enough to wait for the player to work that out. Lying to him works once. He writes it down and comes back to see whether it is still the same lie.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_showed_you',
              label: 'Earn enough of his trust that he opens the folder',
              predicate: { minRelationship: [{ characterId: 'tolle', dimension: 'trust', value: 30 }] },
              setsFlags: ['knows_the_warehouse', 'tolle_contact'],
              closesFlags: [],
            },
            {
              routeId: 'read_it_yourself',
              label: 'Take the folder off his desk',
              predicate: { hasItems: ['tolle_folder'] },
              setsFlags: ['knows_the_warehouse', 'read_his_folder'],
              closesFlags: ['tolle_contact'],
            },
            {
              routeId: 'lied_to_his_face',
              label: 'Lie to him, and mean it',
              predicate: { flagsSet: ['used:wear_the_lie', 'spoke:tolle'] },
              setsFlags: ['tolle_suspects_you'],
              closesFlags: ['tolle_contact'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['tolle_in_play'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_he_gets',
          playerCopy: 'Decide what Officer Tolle gets from you: a source, a suspect, or nothing.',
          directorNotes:
            'Giving him Dray with proof ends the charge before Festival Night and puts the player in the middle of the biggest scandal the city has had. Becoming his source keeps the Track alive and the player inside it. Stonewalling is legitimate. Being booked is a loss, and it is also a room where the player has something to trade.',
          enterWhen: { flagsSet: ['tolle_in_play'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_him_dray',
              label: 'Put proof about Dray in his hands',
              predicate: {
                flagsSet: ['holds_proof'],
                minRelationship: [{ characterId: 'tolle', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['dray_named', 'charge_found'],
              closesFlags: ['arrested'],
            },
            {
              routeId: 'became_his_source',
              label: 'Become his source inside the academy',
              predicate: { minRelationship: [{ characterId: 'tolle', dimension: 'trust', value: 45 }] },
              setsFlags: ['informant'],
              closesFlags: ['arrested'],
            },
            {
              routeId: 'he_booked_you',
              label: 'Get booked',
              predicate: { flagsSet: ['tolle_suspects_you', 'badge_reported'] },
              setsFlags: ['arrested'],
              closesFlags: ['informant'],
            },
            {
              routeId: 'stonewalled',
              label: 'Give him nothing, politely, every time',
              predicate: { flagsSet: ['used:hold_steady'] },
              setsFlags: ['stonewalled_tolle'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['tolle_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_waterline', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_pale_duke',
      title: 'The Pale Duke',
      summary: 'A ferry ticket stamped twenty-five minutes before the man it rescued fell, and a sealed drawer that opens to one badge for one week.',
      kind: 'LEAD',
      involvedCharacterIds: ['marrow', 'dray', 'juno'],
      involvedLocationIds: ['old_bridge', 'registry', 'room_zero'],
      knownRewardCopy: 'What actually happened on Bridge Night, and what you do with the only proof.',
      discoverWhen: { flagsSet: ['knows_bridge_seam'] },
      steps: [
        {
          id: 'open_the_drawer',
          playerCopy: 'Open the sealed drawer in the Registry while the First Badge still works.',
          directorNotes:
            'Optional, and it must feel optional. A player who never notices the ferry ticket or hears Marrow hum never sees a beat of this. For one who does, keep it physical: steel drawers, a brass keyhole, a folder that smells of the nineties. The file proves Bridge Night was staged and who signed it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_it_with_the_badge',
              label: 'Open it yourself with the badge',
              predicate: { atLocation: 'registry', hasItems: ['gold_badge'] },
              setsFlags: ['knows_bridge_night', 'holds_proof'],
              closesFlags: [],
            },
            {
              routeId: 'juno_opened_it',
              label: 'Go down with Juno and the badge she is holding',
              predicate: { flagsSet: ['juno_has_the_badge', 'visited:registry'] },
              setsFlags: ['knows_bridge_night', 'juno_holds_the_file'],
              closesFlags: [],
            },
            {
              routeId: 'marrow_told_you',
              label: 'Ask Marrow, and get the true answer',
              predicate: {
                flagsSet: ['badge_delivered'],
                minRelationship: [{ characterId: 'marrow', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows_bridge_night', 'marrow_confessed'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['bridge_night_known'],
            abilities: ['broadcast_it'],
            reputation: [],
          },
        },
        {
          id: 'the_leash',
          playerCopy: 'Decide what happens to the only proof of Bridge Night.',
          directorNotes:
            'Whoever holds this file holds both men. Giving it to Marrow sets him free and probably ends the Track. Keeping it makes the player the most dangerous person on campus. Leaving it in the drawer is a real choice, and the drawer seals again when the week ends.',
          enterWhen: { flagsSet: ['bridge_night_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_it_to_marrow',
              label: 'Give Marrow his script back',
              predicate: { hasItems: ['bridge_file'], flagsSet: ['spoke:marrow'] },
              setsFlags: ['marrow_free'],
              closesFlags: ['holds_the_leash'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it',
              predicate: { hasItems: ['bridge_file'] },
              setsFlags: ['holds_the_leash', 'holds_proof'],
              closesFlags: ['marrow_free'],
            },
            {
              routeId: 'left_it_buried',
              label: 'Leave it where it is and let the drawer seal',
              predicate: { flagsSet: ['bridge_night_known'], afterWorldMinute: 5 * 1440 },
              setsFlags: ['left_it_buried'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['bridge_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_festival_night',
      title: 'Festival Night',
      summary: 'Forty thousand people on the harbour, cameras on every pier, the Track attacking on cue and the heroes saving the day on cue. The east pier is fenced off and dark.',
      kind: 'MAIN',
      involvedCharacterIds: ['celeste', 'marrow', 'juno', 'rafe', 'dray', 'tolle'],
      involvedLocationIds: ['harbour_front', 'old_bridge'],
      knownRewardCopy: 'Which side of the mask you are standing on when the lanterns go up.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'the_night',
          playerCopy: 'Be somewhere on Festival Night, when the Track attacks the harbour and the heroes stop it.',
          directorNotes:
            'Everything the week built arrives here, in public, at once. A player who read page nine can stop the charge quietly or loudly. One who holds proof can put it on every screen. One who never read past their own lines plays their part beautifully and does not know what happens at 19:42. Not being there at all is also a choice.',
          enterWhen: { flagsSet: ['first_night_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'exposed_it_live',
              label: 'Put the proof on the festival cameras',
              predicate: { flagsSet: ['used:broadcast_it', 'festival_happened'], atLocation: 'harbour_front' },
              setsFlags: ['went_public', 'charge_stopped'],
              closesFlags: ['track_intact'],
            },
            {
              routeId: 'went_real',
              label: 'Tear up the script and make the night your own',
              predicate: { flagsSet: ['holds_the_leash', 'used:go_off_script', 'festival_happened'] },
              setsFlags: ['went_real', 'charge_stopped'],
              closesFlags: ['track_intact'],
            },
            {
              routeId: 'fought_beside_her',
              label: 'Fight beside Celeste instead of against her',
              predicate: { flagsSet: ['celeste_and_you', 'festival_happened'], atLocation: 'harbour_front' },
              setsFlags: ['turned_hero', 'charge_stopped'],
              closesFlags: ['track_intact'],
            },
            {
              routeId: 'stopped_the_charge',
              label: 'Pull the charge under the east pier before 19:42, and still make your entrance',
              predicate: { flagsSet: ['knows_the_charge', 'festival_happened'], atLocation: 'harbour_front' },
              setsFlags: ['charge_stopped', 'track_intact'],
              closesFlags: [],
            },
            {
              routeId: 'police_got_there_first',
              label: 'Let Tolle’s people sweep the east pier',
              predicate: { flagsSet: ['charge_found', 'festival_happened'] },
              setsFlags: ['charge_stopped', 'track_intact'],
              closesFlags: [],
            },
            {
              routeId: 'played_your_part',
              label: 'Play your villain exactly as written',
              predicate: { flagsSet: ['used:play_the_villain', 'festival_happened'], atLocation: 'harbour_front' },
              setsFlags: ['played_the_script', 'track_intact'],
              closesFlags: [],
            },
            {
              routeId: 'nobody_stopped_it',
              label: 'Be somewhere else at 19:42',
              predicate: { flagsSet: ['pier_burned'] },
              setsFlags: ['festival_went_wrong'],
              closesFlags: ['charge_stopped'],
            },
          ],
          rewards: {
            xp: 250,
            items: [],
            flags: ['festival_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_aurel', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_toast',
      atWorldMinute: 21 * 60 + 50,
      locationId: 'glass_atrium',
      publicCopy:
        'At ten to ten, up on the balcony, Professor Anselm Dray raises a glass, the quartet stops, and four hundred white masks tilt up to look at the man who won Bridge Night.',
      directorNotes:
        'Ninety seconds when every head in the room is up and every hand is down, and Juno has timed it. A player who moves now has the best cover of the night. A player who watches Celeste instead sees that she is the only person in the room not looking up: she is watching the crowd for whoever moves.',
      setsFlags: ['the_toast'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_celeste_steps_out',
      atWorldMinute: 22 * 60 + 15,
      locationId: 'atrium_balcony',
      publicCopy:
        'At quarter past ten, Celeste Moreau slips away from the bar and up the curved stair to the balcony, alone, turning the gold badge over in her fingers.',
      directorNotes:
        'She is giving the thief a better chance on purpose, to see who takes it. Dray is at the other end of the balcony with the donors and will notice exactly who follows her up.',
      setsFlags: ['celeste_on_the_balcony'],
      cancelledByFlags: ['badge_taken'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'celeste', toLocationId: 'atrium_balcony' }],
    },
    {
      id: 'we_rafe_tries',
      atWorldMinute: 22 * 60 + 40,
      locationId: 'atrium_balcony',
      publicCopy:
        'At twenty to eleven, a tray crashes somewhere near the bar, every head turns toward the noise, and a white mask that does not fit takes the balcony stair two at a time.',
      directorNotes:
        'Rafe throws a sound for a distraction and goes for the badge. He is not good enough, and Celeste feels him coming unless the player helps him or gets in his way. If she catches him she now knows the thief is a first-year in a white mask, which makes the player’s night harder.',
      setsFlags: ['rafe_tried'],
      cancelledByFlags: ['badge_taken', 'rafe_took_it'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'rafe', toLocationId: 'atrium_balcony' }],
    },
    {
      id: 'we_midnight',
      atWorldMinute: 1440,
      locationId: 'room_zero',
      publicCopy: 'Midnight. The chapel bell, which has had no rope for thirty years, rings once across the whole campus.',
      directorNotes:
        'Marrow is in Room Zero with his hand out. A recruit who arrives empty-handed is not punished in any way the prose should dramatise: Marrow is disappointed, which is worse, and puts them on probation. A recruit who does not come at all is noted, in ink.',
      setsFlags: ['missed_midnight'],
      cancelledByFlags: ['badge_delivered', 'juno_has_the_badge', 'badge_returned', 'rafe_delivered', 'walked_off_the_track'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'marrow', toLocationId: 'room_zero' }],
    },
    {
      id: 'we_marrow_hums',
      atWorldMinute: 1440 + 60,
      locationId: 'room_zero',
      publicCopy: 'Alone in Room Zero, Marrow hums four bars of the old Bridge Night news theme, and stops the moment he hears himself.',
      directorNotes:
        'Only for a player who brought him the badge and stayed. He changes the subject at once, courteously. It is the first crack in the mask and he knows the player heard it.',
      setsFlags: ['knows_bridge_seam'],
      cancelledByFlags: [],
      requiresFlags: ['badge_delivered'],
      movesCharacters: [],
    },
    {
      id: 'we_badge_missing',
      atWorldMinute: 1440 + 7 * 60 + 30,
      locationId: 'the_quad',
      publicCopy: 'By breakfast a notice is taped to every door on campus: the First Badge is missing, and a police officer will be speaking to first-years today.',
      directorNotes:
        'The academy is embarrassed and Dray is quietly delighted, because the thief exists. Celeste tells anybody who asks that she misplaced it. A player who swapped it for Juno’s forgery never sees this notice, because nobody knows anything is gone.',
      setsFlags: ['badge_reported'],
      cancelledByFlags: ['badge_returned', 'swapped_it'],
      requiresFlags: ['badge_taken'],
      movesCharacters: [{ characterId: 'tolle', toLocationId: 'the_quad' }],
    },
    {
      id: 'we_bridge_plaque',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'old_bridge',
      publicCopy: 'On the Bridge Night memorial, the ferry ticket in its frame is stamped 23:15. The plaque beside it says the Pale Duke fell at 23:40.',
      directorNotes:
        'The first seam, and it only exists for a player who went to the bridge. Do not make it ominous. It is a small factual wrongness under a bronze plaque that thousands of people have read without noticing.',
      setsFlags: ['knows_bridge_seam'],
      cancelledByFlags: [],
      requiresFlags: ['visited:old_bridge'],
      movesCharacters: [],
    },
    {
      id: 'we_tolle_knocks',
      atWorldMinute: 1440 + 14 * 60,
      locationId: 'block_c',
      publicCopy: 'Officer Bram Tolle works his way along every corridor in Block C, knocking on each door with a paper cup of coffee and a list.',
      directorNotes:
        'He is not accusing anybody. He asks every first-year where they were at half past ten last night and writes the answer down in pencil. If the player’s answer is a lie, he comes back tomorrow to see whether it is still the same lie.',
      setsFlags: ['tolle_knocked'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_over'],
      movesCharacters: [{ characterId: 'tolle', toLocationId: 'block_c' }],
    },
    {
      id: 'we_dray_finds_you',
      atWorldMinute: 2 * 1440 + 16 * 60,
      locationId: 'proving_yard',
      publicCopy: 'Professor Dray is waiting at the edge of the Proving Yard, and he says your first name before you have reached him.',
      directorNotes:
        'He knows, or has guessed, that the player took the badge. He does not threaten. He offers a place on the hero programme, a clean record and Celeste’s respect, in exchange for the names of everybody in Room Zero. He is charming and it is a genuinely good offer.',
      setsFlags: ['dray_approached'],
      cancelledByFlags: ['arrested'],
      requiresFlags: ['badge_taken'],
      movesCharacters: [{ characterId: 'dray', toLocationId: 'proving_yard' }],
    },
    {
      id: 'we_name_night',
      atWorldMinute: 2 * 1440 + 23 * 60,
      locationId: 'room_zero',
      publicCopy: 'Name Night in Room Zero: every recruit stands under the lamp in a black mask while the room decides what the city will call them.',
      directorNotes:
        'The Track’s one ceremony, and it is warm. Masks are passed round, old names are remembered, and Juno tells the story of her own name badly on purpose. Whoever the player has been this week decides what they are called, and the player may name themselves.',
      setsFlags: ['name_night_happened'],
      cancelledByFlags: ['walked_off_the_track'],
      requiresFlags: ['on_the_track'],
      movesCharacters: [
        { characterId: 'juno', toLocationId: 'room_zero' },
        { characterId: 'rafe', toLocationId: 'room_zero' },
      ],
    },
    {
      id: 'we_celeste_on_the_stairs',
      atWorldMinute: 3 * 1440 + 21 * 60 + 30,
      locationId: 'block_c',
      publicCopy: 'Celeste Moreau is sitting on the stairs of Block C with two coffees, outside your door, and she has clearly been there a while.',
      directorNotes:
        'Off duty, no badge on her lapel. She has come to ask one question and has decided to ask it only once. What it is depends on what she already knows: who the thief was, why the player has been avoiding her, or whether they have ever watched footage of her rescues.',
      setsFlags: ['celeste_came_round'],
      cancelledByFlags: ['arrested'],
      requiresFlags: ['spoke:celeste'],
      movesCharacters: [{ characterId: 'celeste', toLocationId: 'block_c' }],
    },
    {
      id: 'we_script_night',
      atWorldMinute: 4 * 1440 + 22 * 60,
      locationId: 'room_zero',
      publicCopy: 'Marrow hands out the festival script in Room Zero: twelve typed pages per recruit, every entrance timed to the second.',
      directorNotes:
        'Each recruit gets only their own pages, except a player Marrow trusts, who sees everything. The master copy is on his desk, and page nine is in it. Nobody reads ahead in front of him; it is considered bad manners.',
      setsFlags: ['script_handed_out'],
      cancelledByFlags: ['walked_off_the_track'],
      requiresFlags: ['has_a_villain_name'],
      movesCharacters: [{ characterId: 'marrow', toLocationId: 'room_zero' }],
    },
    {
      id: 'we_festival_night',
      atWorldMinute: 6 * 1440 + 19 * 60,
      locationId: 'harbour_front',
      publicCopy: 'Festival Night. Lanterns on the water, forty thousand people on the harbour front, cameras on every pier, and the first villain due on stage at 19:30.',
      directorNotes:
        'The Track attacks on cue, the heroes stop it on cue, and the crowd loves it. Celeste is the headline rescue. The east pier is fenced off and dark. Whatever the player has learned this week arrives here, in public, all at once.',
      setsFlags: ['festival_happened'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'celeste', toLocationId: 'harbour_front' },
        { characterId: 'dray', toLocationId: 'harbour_front' },
        { characterId: 'juno', toLocationId: 'harbour_front' },
        { characterId: 'rafe', toLocationId: 'harbour_front' },
        { characterId: 'tolle', toLocationId: 'harbour_front' },
      ],
    },
    {
      id: 'we_page_nine',
      atWorldMinute: 6 * 1440 + 19 * 60 + 42,
      locationId: 'harbour_front',
      publicCopy: 'At 19:42 the east pier goes dark, and then very bright.',
      directorNotes:
        'The charge under the east pier goes off. Celeste steps through the light of it to clear the crowd, which is exactly what it was written for. Nobody dies. A dozen people are treated for smoke, the pier burns to the waterline, and a city that watched it live has a new name at the top of its ranking by morning. Tell it by what happens to people afterwards, never by injuries.',
      setsFlags: ['pier_burned'],
      cancelledByFlags: ['charge_stopped', 'charge_found'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_which_side',
      kind: 'FINALE',
      label: 'Which side of the mask you end up on',
      seedHint: 'Two masks in your hands on the first night: a white one everybody got, and a black one nobody else did.',
      payoffHint: 'Festival Night, on a pier full of cameras, and somebody watching to see which mask you are wearing.',
      weight: 1,
    },
    {
      id: 'p_celeste',
      kind: 'RELATIONSHIP',
      label: 'The woman you were sent to rob, who was sent to catch you',
      seedHint: 'She asked “Have we met?” before you had said a word, and watched your hands while you answered.',
      payoffHint: 'She tells you who warned her, and what she was told to do with you once she caught you.',
      weight: 0.9,
    },
    {
      id: 'p_bridge_night',
      kind: 'MYSTERY',
      label: 'Bridge Night was staged',
      seedHint: 'A ferry ticket on the memorial stamped twenty-five minutes before the man it rescued went into the water.',
      payoffHint: 'A script in a sealed drawer with two signatures on the last page, and one of them is the Pale Duke’s.',
      weight: 0.6,
    },
    {
      id: 'p_the_author',
      kind: 'BOSS',
      label: 'The hero who writes the villains',
      seedHint: 'He raises a toast from the balcony and every head in the room goes up, which is exactly when a pocket is easiest to pick.',
      payoffHint: 'Page nine of the festival script is in the same handwriting as every photograph he has ever signed.',
      weight: 0.8,
    },
    {
      id: 'p_the_policeman',
      kind: 'RIVAL',
      label: 'The one policeman who has been counting',
      seedHint: 'A man in a borrowed dinner jacket outside the masquerade, holding a coffee he does not drink.',
      payoffHint: 'Eleven incidents, one warehouse fire, and his brother’s name under the photograph.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_unnoticed',
      name: 'You Go Unnoticed',
      role: 'Stealth and misdirection',
      summary: 'Your gift lets attention slide off you for a few seconds at a time, so you are best at getting close, taking things and leaving unremembered.',
      playstyle: ['Sneaky', 'Patient', 'Hard to pin down'],
      blurb: 'Lecturers have marked you absent from classes you sat in the front row of. It stopped being funny the year it started being useful.',
      attributeBonus: { agility: 2, arcana: 1, mind: 1 },
      skillProficiencies: { sleight: 3, casing: 2, gift: 1 },
      startingItems: [],
      startingAbilities: ['slip_their_eyes'],
      startingReputation: [{ factionId: 'faction_track', amount: 5 }],
    },
    {
      id: 'arch_faces',
      name: 'You Borrow Faces',
      role: 'Disguise and deception',
      summary: 'Touch somebody’s hand and you can wear their face for ten minutes, so you are best at walking in as someone else and talking your way out.',
      playstyle: ['Deceptive', 'Social', 'Improviser'],
      blurb: 'You once shook hands with a waiter and walked out of a restaurant wearing his face. The bill is still, technically, his.',
      attributeBonus: { presence: 2, arcana: 1, agility: 1 },
      skillProficiencies: { guile: 3, charm: 2, gift: 1 },
      startingItems: [],
      startingAbilities: ['borrow_a_face'],
      startingReputation: [],
    },
    {
      id: 'arch_heavy',
      name: 'You Hit Hard',
      role: 'Strength and staged fights',
      summary: 'For one breath you can weigh as much as a car, so you are best in a fight, staged or real, and worst at anything quiet.',
      playstyle: ['Physical', 'Direct', 'Loud'],
      blurb: 'The entrance test asked you to move a sandbag. You moved the floor it was sitting on, and that evening a second letter arrived.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { brawl: 3, poise: 1, gift: 1 },
      startingItems: [],
      startingAbilities: ['drop_the_weight'],
      startingReputation: [{ factionId: 'faction_hero_course', amount: 5 }],
    },
    {
      id: 'arch_signal',
      name: 'You Kill Machines',
      role: 'Tech sabotage',
      summary: 'Anything electric you touch stops working, so locks, cameras and lights are yours, and the dark is where you are strongest.',
      playstyle: ['Technical', 'Careful', 'Quiet'],
      blurb: 'You have not owned a working phone in years, and you have opened every electric lock in your old building, mostly by accident. A caterer’s keycard found its way into your pocket on the way in tonight.',
      attributeBonus: { mind: 2, arcana: 2 },
      skillProficiencies: { gift: 3, casing: 2, poise: 1 },
      startingItems: [{ itemId: 'staff_keycard', qty: 1 }],
      startingAbilities: ['kill_the_signal'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on your acceptance letter?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Noor Haddad' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What is your gift?',
      helpText:
        'The one power the academy admitted you for, which sets what you are good at. It is fixed for the whole story. It does not decide whether you take the badge, which side you end up on, or who you trust — all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Why do you think the villain track picked you?',
      helpText: 'Your own theory. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once been caught doing anything, and I have done quite a lot.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct with the black mask?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite at the bar and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'take_the_job', label: 'Take the job, and enjoy it more than you expected' },
        { id: 'play_both', label: 'Say yes to everybody and decide later' },
        { id: 'refuse', label: 'Refuse, and see what that costs' },
        { id: 'tell_someone', label: 'Tell somebody, and see who' },
        { id: 'find_out_why', label: 'Assume there is a reason you were picked, and find it' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see behind the white mask?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A borrowed suit, a nervous grin, and hands that are much steadier than the rest of me.',
    },
  ],
  /**
   * Where this can end up.
   *
   * "Page Nine" is the ordinary loss: a player who never read past their own
   * lines plays their part, believes "nobody gets hurt", and the charge goes
   * off anyway. It needs no mistake and no relationship, on purpose. "Quietly
   * Withdrawn" is reachable by doing nothing in particular. "The Last Ferry"
   * is walking away, and it is open early.
   *
   * Only "Live on Every Screen" and "The Next Mask" need the Bridge Night lead
   * or its proof, so most of this list is reachable by a player who never once
   * wondered about a ferry ticket.
   */
  endings: [
    {
      id: 'end_a_good_villain',
      name: 'A Good Villain',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['charge_stopped', 'track_intact', 'has_a_villain_name'],
        flagsUnset: ['went_public', 'arrested', 'turned_hero'],
      },
      condition:
        'The player stayed on the Track, earned a name, made sure the charge never went off, then played their villain on Festival Night exactly as scripted and lost beautifully. The city never knows. Write it as a professional’s satisfaction rather than a moral victory: the show went on and nobody got hurt, which was the whole job.',
      epilogue:
        'The papers love Celeste’s rescue and print a blurred photograph of a black mask going into the harbour. Marrow says “adequate”, which from him is applause. The mask goes back on its hook in Room Zero with a name chalked above it, and there are three more years of term.',
      hint: '',
    },
    {
      id: 'end_page_nine',
      name: 'Page Nine',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['pier_burned'] },
      condition:
        'Nobody stopped the charge. This is the ordinary way the week ends for a player who never read past their own lines, and it must not be written as a punishment: the script said nobody gets hurt, the player believed it, and somebody else had changed it. Celeste clears the crowd, the city crowns her, and the few people who know what happened are very quiet.',
      epilogue:
        'The east pier is rebuilt by spring with a plaque on it. Celeste is top of the ranking by morning and does not seem to enjoy it. Juno stops coming to Room Zero. Officer Tolle adds a twelfth page to his folder, in pencil, and underlines the date twice.',
      hint: 'Somebody reads every page. Twice.',
    },
    {
      id: 'end_booked',
      name: 'Booked',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['arrested'] },
      condition:
        'Officer Tolle has the player in an interview room with the folder open and a paper cup of coffee in front of each of them. It is a loss and not the end of the player’s story: Tolle wants the adult behind the scripts, and the player has something to trade. Write the room, the coffee and the choice.',
      epilogue:
        'The academy denies the Track exists, in a statement that uses the word “unfortunate” three times. Tolle visits once a week and brings coffee. Whether the player gives him a name, and whose, decides how long the visits go on.',
      hint: '',
    },
    {
      id: 'end_hero_after_all',
      name: 'Hero After All',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['turned_hero'], flagsUnset: ['arrested'] },
      condition:
        'The player fought beside Celeste on Festival Night instead of against her, and the hero programme takes them in. Whatever they did with the Track’s secret, they did it from the other side of the stage. It is a transfer rather than a redemption, and some people in Room Zero will call it a betrayal.',
      epilogue:
        'The player’s name goes up on the ranking board in the Proving Yard, very low. Celeste spars with them at dawn and keeps score out loud. Under the old chapel a black mask hangs on a hook with no name above it, and Juno has not decided whether to take it down.',
      hint: '',
    },
    {
      id: 'end_she_knew',
      name: 'She Knew All Along',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['she_unmasked_you', 'celeste_settled'],
        flagsUnset: ['arrested'],
        minRelationship: [{ characterId: 'celeste', dimension: 'affection', value: 65 }],
      },
      condition:
        'Celeste worked out who the thief was and decided not to turn them in. The two of them now share a secret that would end both their careers, and they have chosen to keep it together. The romance stops at a kiss on a balcony, with the rivalry still underneath: she still wants to win, only now she wants to win against the player and nobody else.',
      epilogue:
        'She never wears the First Badge again; she keeps it in a drawer and says she lost it. Once a month a black mask turns up at one of her rescues and makes it genuinely difficult, and afterwards, on a roof, she tells it the score.',
      hint: 'She asked whether you had met. Answer her properly, eventually.',
    },
    {
      id: 'end_quietly_withdrawn',
      name: 'Quietly Withdrawn',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['first_night_over'],
        flagsUnset: ['has_a_villain_name', 'turned_hero', 'arrested'],
        afterWorldMinute: 4 * 1440,
      },
      condition:
        'The Track let the player go. They refused, or missed midnight, or simply never became anybody in Room Zero. Nobody is cruel about it, and that is the point. This is reachable by doing nothing in particular, and it must read as an honest outcome rather than a failure screen.',
      epilogue:
        'A cream envelope arrives under the door: the academy regrets that the player’s place on Applied Opposition has been withdrawn, and wishes them well in their remaining studies. The black mask is gone from the desk drawer the next morning. Nobody saw who took it.',
      hint: '',
    },
    {
      id: 'end_the_last_ferry',
      name: 'The Last Ferry',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked away from the academy, the Track and the badge, and caught the last ferry out of Corvane. It is neither cowardice nor wisdom. It is a reasonable response to being handed a villain’s mask by a man with no face, and the people it costs most are the ones left on campus.',
      epilogue:
        'The black mask goes over the ferry rail somewhere past the harbour lights. Marrow writes one line in a ledger nobody else reads. Rafe gets the badge job by default and does it badly. Celeste spends a week looking for a face in a crowd of white masks and does not find it.',
      hint: '',
    },
    {
      id: 'end_live_on_every_screen',
      name: 'Live on Every Screen',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['went_public'] },
      condition:
        'The player put the proof on the festival cameras: page nine, or the Bridge Night script with two signatures, or both. The city watches its favourite story come apart on live broadcast. It costs everybody, the player included, and should be written as an earthquake rather than a triumph.',
      epilogue:
        'Dray resigns in a statement nobody believes. The academy closes Applied Opposition, which officially never existed. Marrow is seen once without the mask, at the Old Bridge, and nobody recognises him except Officer Tolle, who lets him finish looking at the water.',
      hint: 'Proof is paper. Paper can be put in front of a camera.',
    },
    {
      id: 'end_off_the_track',
      name: 'Off the Track',
      rarity: 'RARE',
      minTurn: 36,
      requires: { flagsSet: ['went_real'] },
      condition:
        'The player kept the Bridge Night file as a leash over both men, tore up the festival script and made Festival Night their own: an unscripted villain nobody saw coming, who hurt nobody and frightened everybody. It is a choice to be the real thing the city was being sold a fake of, and it should be written with that much nerve.',
      epilogue:
        'The city’s ranking grows a new column for a villain with no file. The academy pays what it is told to pay. Celeste, now top of the ranking, studies footage of the player every night, and for the first time in her life is not sure she will win.',
      hint: '',
    },
    {
      id: 'end_the_warehouse_script',
      name: 'The Warehouse Script',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['dray_named'],
        minRelationship: [{ characterId: 'juno', dimension: 'trust', value: 55 }],
      },
      condition:
        'Juno’s two years of waiting ended with the player putting the proof in Officer Tolle’s hands. Dray is arrested for the warehouse fire and for page nine, and the Track survives, smaller, under Marrow, on new terms. Write it as justice that arrives late and does not fix everything.',
      epilogue:
        'Ned Tolle comes to the hearing on his stick and sits in the front row. Juno sits next to him and they do not talk. Afterwards Juno takes her name down from the wall of Room Zero and chalks the player’s under the space where it was.',
      hint: '',
    },
    {
      id: 'end_the_next_mask',
      name: 'The Next Mask',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['holds_the_leash', 'track_intact', 'festival_over'],
        minRelationship: [{ characterId: 'marrow', dimension: 'trust', value: 60 }],
      },
      condition:
        'The player holds the Bridge Night file, the Track came through Festival Night, and Marrow trusts them enough to hand over Room Zero. He takes the mask off for exactly one person. Write the handover as theatre, because to him it is, and let the player decide what kind of dean they will be.',
      epilogue:
        'Marrow retires to a flat by the harbour and learns to sleep without a lamp on. The new dean of Applied Opposition wears a black mask with a gold-filled crack over the left eye, writes every script by hand, and reads every page. Twice.',
      hint: '',
    },
    {
      id: 'end_two_masks_one_badge',
      name: 'Two Masks, One Badge',
      rarity: 'UNIQUE',
      minTurn: 42,
      requires: { flagsSet: ['celeste_and_you', 'marrow_free', 'charge_stopped'] },
      condition:
        'The player and Celeste ended the staging from inside: Marrow has his script and his freedom back, page nine never went off, and the two of them have agreed to keep fighting each other for real, in public, with nothing written down. It is the best ending and it should still feel risky.',
      epilogue:
        'Corvane gets an honest villain and an honest hero, and both of them lose sometimes. The ranking board does not know what to do with either. Every few weeks they meet on the Old Bridge with the masks off and argue about whose turn it is to win.',
      hint: '',
    },
  ],
  opening:
    "Every first-year at the welcome masquerade gets a white mask at the door.\n\nYou’re the only one who gets a second.\n\nA gloved hand presses it into your palm. Black lacquer, still warm. The man holding it wears a face of carved white bone.\n\n\"Dean Marrow,\" he says, as if you’d asked. \"Your letter came from my side of the academy. The side that loses. First assignment: her badge. By midnight.\"\n\nHe’s gone into the crowd before you can ask whose.\n\nSomeone leans on the bar beside you, gold badge on her lapel, and you know whose. The top hero student in the academy.\n\n\"Hi,\" she says. \"I’m Celeste. Have we met?\"",
  openingPanel: {
    assetKey: 'story_villain_track/opening',
    alt: 'A gloved hand pressing a black lacquer mask into an open palm at a glittering masquerade, rows of white masks blurred behind.',
  },
  openingSuggestions: [
    '"Not yet. I’d remember that badge."',
    'I pocket the black mask and study how her badge is pinned.',
    'I lean in to admire the badge and lift it off her lapel.',
  ],
  publishedAt: null,
};

export const VILLAIN_TRACK = StoryVersion.parse(raw);
