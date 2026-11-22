import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Nova House" — a telepath's first week in a house where somebody is planning
 * a murder.
 *
 * Slate #3. The structural bet is Good Morning, Husband's: one house, a cast
 * who already have a life together, and an ordinary week that is worth
 * playing on its own. What is different is the thing under the floor. At the
 * first dinner the player hears one thought that is not theirs, and from then
 * on every washing-up rota and every night on the roof has a suspect in it.
 *
 * The answer is fixed in hard canon so that six days of play cannot drift: it
 * was Sable Quint, whose mind the player cannot hear, and whose wall slipped
 * for one second. The player does not know that, and the writer is told to
 * keep all three housemates plausible until it is earned. A fixed answer is
 * what makes the wrong accusation a real thing that can happen, with an
 * ending of its own.
 *
 * The playable span is six days, Sunday dinner to the Founders' toast on
 * Saturday night. The Provost's eleven settlements, Corin's April and Haru's
 * restaurant are backstory carried in secrets, items and what people will and
 * will not say. Whether anybody dies at the toast is decided by play, and the
 * world is willing to let it happen to a player who did nothing.
 *
 * Three invisible variables. Focus is the only GOOD_HIGH, because
 * `resolveRest` refills those and a telepath's head is the honest thing for
 * sleep to restore. Scrutiny is the first GOOD_LOW, because PUBLIC_VIOLENCE
 * raises the first one in array order and a scene up the hill should bring
 * the college's eyes down on the house. Distrust is what reading people
 * without asking costs: the power works, and the house can tell.
 *
 * BLANK protagonist. The archetype is how the minds feel when they arrive,
 * which is characterisation, not identity.
 */

const raw = {
  id: 'sv_nova_house_1',
  storyId: 'story_nova_house',
  version: 1,
  title: 'Nova House',
  fantasyLabel: 'You read minds. One of them plans murder.',
  hook: 'At your first dinner, one of your new housemates thinks about killing you. You read minds, and all three of them know it.',
  premise:
    'Halloran College takes adults whose minds do things they should not. You arrived this afternoon, because yours listens.\n\n' +
    'You are a telepath, and the college has put you in Nova House: four student rooms at the bottom of the grounds, an old observatory dome on the roof, a house mother who makes soup, and the students the bigger houses could not hold.\n\n' +
    'A man who sets things on fire when he panics. A woman who sees still pictures of the future. A woman whose mind you cannot hear at all.\n\n' +
    'They all know what you are. The first house rule is that nobody reads anybody at the table.\n\n' +
    'At your first dinner, one thought came through anyway. Somebody at that table is planning a murder, and thought, very clearly, that if the new one heard, there would have to be two.\n\n' +
    'Nobody’s lips moved. You do not know whose thought it was.\n\n' +
    'Founders’ Night is in six days. The Provost comes to the house for a toast, and by tradition the newest resident pours. Your welcome packet has a form in it asking you to report on your housemates every week.\n\n' +
    'So you need to find out who is planning it, and why, before that glass is poured. Once you know, whose side you take is up to you.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Mystery', 'Slice of life', 'Supernatural', 'Academy', 'Drama'],
  mechanicsChips: [
    'You hear what they think',
    'One housemate plans a murder',
    'Six days to Founders’ Night',
    'Reading people costs trust',
    'Saturday’s toast: you pour',
  ],
  contentDescriptors: ['PSYCHOLOGICAL_THEMES', 'ROMANCE', 'MORAL_AMBIGUITY', 'FANTASY_VIOLENCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend six days on dinners, classes and the roof at night without solving anything, and the house is still worth living in. You can also break every house rule by Tuesday. Reading people works. It also costs you the people.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'the_dining_room',
    startWorldMinute: 19 * 60 + 10,
    startingItems: [
      { itemId: 'attunement_card', qty: 1 },
      { itemId: 'room_key', qty: 1 },
      { itemId: 'wellbeing_form', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is a first-year of at least nineteen. Haru Ezaki is twenty-one, Lena Morrow twenty, Sable Quint twenty-three, Corin Abbott twenty-two, Ruth Calder fifty-eight and Provost Nathaniel Sorrell sixty-one.',
      'Halloran College is a residential college for adults with psychic abilities, on a hill above the river town of Lowbridge. Every student is eighteen or older.',
      'Nova House is the college’s smallest residence: four student rooms, a house mother, and an old observatory dome on the roof. The player arrived today, a first-year telepath of at least nineteen, and has Room Four.',
      'The player’s telepathy reaches minds within about a room. What it catches is the surface, what somebody is thinking right now, in fragments; how those fragments feel (words, moods, pictures) is described under who the player is. With effort the player can let a whole room in at once. Going under the surface into memory, and sending a thought the other way, are deeper uses that come with practice during the week, or from the first night for a player whose telepathy already works that way.',
      'Telepathy is the player’s only ability. Every Halloran student has exactly one, tested and printed on their Attunement Card. The player cannot fly, move things without touching them, start fires or see the future: when the player tries, nothing happens, and the beat says so plainly.',
      'Reading has a price. Most people feel a read like somebody reading over their shoulder, and they remember who did it. A long day of reading, or a whole room at once, leaves the player’s head too loud to tell their own thoughts from other people’s, and only sleep, food or sitting within Sable’s reach quiets it. The player can wall their own mind shut, against noise and against the Provost’s voice, and hears nothing while the wall is up.',
      'What a telepath hears is not evidence. The wardens and the Registry act on documents and on witnesses who speak for themselves, never on what somebody heard inside a head. Every telepath at Halloran signs three rules on their Attunement Card: never read staff, never read anybody who has said no, and report anything heard that puts a life at risk to the Provost, in person.',
      'Room Four belonged until April to a telepath called Corin Abbott. Officially he transferred.',
      'The housemates know the player reads minds. The first house rule, chalked by the coat hooks, is that nobody reads anybody at the table.',
      'The thought the player heard at the first dinner was Sable Quint’s. Her mind is normally silent: she holds a wall nobody can read through, and within arm’s reach of her every ability stops working. At dinner, thinking about the Provost, the wall slipped for one second. "Them too" meant the player as well as the Provost.',
      'Sable plans to kill Provost Nathaniel Sorrell on Founders’ Night, six days from the start, by putting a stolen vial of Stillwater into his glass at the Nova House toast. By the oldest house tradition, the newest resident pours that toast. The vial is hidden in the eyepiece case of the telescope in the dome.',
      'The story begins on Day 1, a Sunday, at ten past seven in the evening, at the player’s first dinner in the house. Founders’ Night is Day 7, the following Saturday, at nine in the evening, in the parlour. The first wellbeing report is due in the Provost’s tower on Thursday at eleven. The last bus leaves Lowbridge at 22:40 on Saturday.',
      'Sable’s slip was loud enough that any telepath, whatever their kind, heard it as exact words.',
      'Stillwater is the college’s suppressant. A small dose dulls an ability for a day. A course of it, with the Provost’s voice, removes an ability for good along with the memories tied to it, which the college calls settling. A whole vial in a drink would stop a heart. Ruth keeps two emergency vials in a locked tin in the kitchen, and one is missing.',
      'Provost Sorrell has settled eleven students in twenty years and filed every one as a voluntary withdrawal. Corin Abbott was the eleventh, in April, after he read the list in Sorrell’s mind. Sable was ordered to sit with Corin during it. Corin now works in the college glasshouse and does not remember Nova House.',
      'Corin Abbott is never inside Nova House. When he is near it he is standing at the front gate at the bottom of the garden path, and anybody who wants to talk to him goes out to him. He does not know the player, or the player’s name, until the player tells him.',
      'Sorrell can steer: within earshot, his voice makes agreement feel like your own idea. A strong wall resists it.',
      'Sorrell placed the player in Nova House on purpose. The Wellbeing Form in the welcome packet asks for a page a week on the housemates, handed to him in person.',
      'Haru Ezaki has two fires on his record. A third means settling. He has a one-way bus ticket out of Lowbridge for Founders’ Night and has told nobody.',
      'Lena Morrow sees the future as still frames, always right about what and never about who. She has drawn Founders’ Night: the Provost on the parlour floor, a spilled glass, a hand with a silver ring on its thumb, and the player in the doorway. She has never broken a frame.',
    ],
    toneGuide:
      'Slice of life with a thriller underneath. Most scenes are ordinary: a dinner, a class, the washing-up rota, the roof at night, a café in town. Every one of them has a suspect in it. ' +
      'Telepathy is written as overheard fragments, short and plain, in quotation marks or as bare lines, always with a clear cue that nobody spoke aloud ("nobody’s lips moved", "it arrives in your head"). Never use asterisks. Every mind has a texture and it never changes: Haru is heat and kitchen noise, Lena runs half a second ahead of the room, Sable is silence, Ruth is a radio turned low, the Provost is warm and agreeable like thick carpet, and Corin is a house with the furniture taken out. ' +
      'The player does not know whose thought it was. Keep all three housemates plausible, and never confirm it until the player has earned it by asking, finding something or being trusted. Reading somebody who did not ask is a real act: they can usually feel it, and they remember. ' +
      'Funny more often than not: house rules, Haru’s jokes, Lena’s tense slips, Ruth’s soup. Violence is rare, quick and has weight, and nothing is graphic: a death happens offstage or in a cut. Romance is warm and goes no further than a kiss. ' +
      'Reading never solves the mystery on its own. Haru’s surface is loud and sounds guilty out of context: Saturday, a bag, getting out before anybody can stop him, smoke. Lena’s runs ahead to a Founders’ Night frame she will not describe. Sable’s is silence, which reads as innocence. Nobody confesses at the first dinner. ' +
      'A secret comes out when it is earned: the player asked before reading, ate what Haru cooked, sat with somebody without fixing them, or brought evidence to one person alone. Reading without asking gets fragments, never a whole secret, and the person usually feels it and stays cooler for days. Reading the Provost is how Corin ended up in the glasshouse: he can tell, and he remembers. ' +
      'A thought whose owner the player does not know is narration, never a line with a speaker, and it never sets that character’s face. Trouble up the hill (a scene on the green, a break-in at the tower, a fight) brings wardens to the house and a kind letter from the Provost about rest. ' +
      'The face at the top of a beat is the housemate the player is with.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Haru is at the stove with his back to you and the gas off.\n\nThe pan is hissing anyway.\n\n\"Don’t,\" he says, without turning round. \"I can feel you listening. It’s like somebody reading over my shoulder.\"\n\nYou pull back. His thoughts carry on without you, loud and quick. Eggs. Friday. His dad’s hands. Smoke.\n\n\"Thanks,\" he says, a beat later, and slides you a plate. The eggs are perfect. The pan has no handle left.",
      "The roof is cold, and the dome smells of brass polish.\n\nSable doesn’t look round. \"Arm’s length,\" she says. \"Step inside it and you hear nothing. Not me. Not anyone.\"\n\nYou step inside it.\n\nThe whole house goes quiet in your head for the first time since you arrived. Like a hand laid flat on a ringing bell.\n\n\"There,\" she says. \"Now you know what they keep me for.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 11, presence: 11, resolve: 11, arcana: 12 },
  skills: [
    { id: 'listening', name: 'Listening', attribute: 'arcana', description: 'Hearing what is on top of a mind, without the owner hearing you do it.' },
    { id: 'diving', name: 'Diving', attribute: 'arcana', description: 'Going under the surface of a mind to the memories, and getting back out again.' },
    { id: 'sending', name: 'Sending', attribute: 'arcana', description: 'Putting a thought into somebody else’s head, quietly enough that they think it is theirs.' },
    { id: 'walls', name: 'Walls', attribute: 'resolve', description: 'Keeping other minds out of yours, including the warm voice that wants you to agree.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Saying the dangerous thing out loud, in the room, to the person it is about.' },
    { id: 'noticing', name: 'Noticing', attribute: 'mind', description: 'What people do with their hands while their thoughts say something else.' },
    { id: 'rapport', name: 'Rapport', attribute: 'presence', description: 'Being somebody a housemate wants to talk to at two in the morning.' },
    { id: 'bluffing', name: 'Bluffing', attribute: 'presence', description: 'Saying a thing you do not mean with a face that agrees with it.' },
    { id: 'sneaking', name: 'Sneaking', attribute: 'agility', description: 'Being where you should not be, at night, without a floorboard telling on you.' },
    { id: 'grit', name: 'Grit', attribute: 'might', description: 'The physical part: a locked door, a ladder in the dark, a wrist that has to be held.' },
  ],
  /**
   * Three, all invisible.
   *
   * Focus is GOOD_HIGH and the only one, because rest refills every GOOD_HIGH
   * resource and a night's sleep should restore a telepath's head, never a
   * relationship. It is also what the generic cost path spends.
   *
   * Scrutiny is first among the descending pair on purpose: PUBLIC_VIOLENCE
   * raises the first GOOD_LOW in array order. Distrust is the house's, and it
   * is the price on every ability that reads somebody who did not ask.
   */
  resources: [
    {
      id: 'focus',
      name: 'Focus',
      max: 100,
      start: 75,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Every mind in range pours in at once and none of it can be shut out. The player hears the whole house thinking, cannot tell which thoughts are their own, and says things out loud they only meant to think.',
      color: '#9DB4E8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on empty. Other people’s thoughts arrive whether the player wants them or not, half-heard and out of order, and their own get lost in the noise. Simple questions take a second too long. This is the band where a telepath should sleep, eat, or sit near Sable, and where going under somebody’s surface goes badly.',
        },
        {
          upTo: 60,
          behaviour:
            'An ordinary tired head. One mind at a time is fine and a whole room is a headache. Good for a conversation, a class or one careful read, and honest about not wanting two. Nobody needs to remark on it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'Clear and steady. The player can choose what reaches them, hold a wall in a crowded room, and go under a surface and come back with something. Scenes can be long and can go deep.',
        },
      ],
    },
    {
      id: 'scrutiny',
      name: 'Scrutiny',
      max: 100,
      start: 15,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The college has forgotten the player exists. Wardens nod and walk on, the tower sends nothing, and the house can be as strange as it likes behind its own front door.',
      color: '#C9A15B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Nobody up the hill is looking. The wardens are polite, college doors are open during the day, and the Provost’s interest in the new telepath is the warm, general kind he has for every first-year.',
        },
        {
          upTo: 55,
          behaviour:
            'A name on somebody’s desk. A warden happens to be on the green when the player crosses it. The Provost asks after them by name and remembers what they said last time. Wandering at night gets noticed, and mentioned, kindly.',
        },
        {
          upTo: 80,
          behaviour:
            'Watched. Wardens pass Nova House on their rounds twice an hour, the tower asks for reports early, and the Provost starts steering conversations toward the house and who in it seems unwell. Doors that were open are locked.',
        },
        {
          upTo: 100,
          behaviour:
            'The college has decided the player is a problem to be managed. A warden is on the green at all hours, the Provost talks about a period of rest, and the word "quiet" starts appearing in letters. Anything done in public now has a witness.',
        },
      ],
    },
    {
      id: 'distrust',
      name: 'Distrust',
      max: 100,
      start: 30,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The house has stopped guarding itself against the player. People think out loud near them, leave doors open, and sometimes open their minds on purpose because it is easier than explaining.',
      color: '#8E7CC3',
      bands: [
        {
          upTo: 20,
          behaviour:
            'At home. Housemates leave their doors open and say what they think before the player has to read it. They tell each other things in front of the new one. This is the band where people volunteer secrets instead of guarding them.',
        },
        {
          upTo: 45,
          behaviour:
            'Polite and careful. The house is friendly, the jokes land, and everybody is still holding something back when the new telepath is in the room. A direct question gets an answer; a personal one gets a joke.',
        },
        {
          upTo: 75,
          behaviour:
            'Guarded. Conversations stop when the player walks in. Haru stays across the room, Lena checks her sketchbook is shut, and Sable stands a little nearer than she needs to, on purpose. People think in shopping lists and song lyrics to keep the player out.',
        },
        {
          upTo: 100,
          behaviour:
            'The house has closed against them. Doors are locked, meals happen in shifts, and somebody has asked Ruth about moving rooms. Nobody will say anything that matters within earshot of the new one, and they are right not to.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'attunement_card',
      name: 'Your Attunement Card',
      tags: ['quest', 'document'],
      droppable: false,
      questItem: true,
      description:
        'A stiff cream card issued at the gate this afternoon, with your photograph and the college seal. Classification: Telepath, first year. Range: about one room. On the back, the three rules every telepath at Halloran signs: never read staff; never read anybody who has said no; report anything you hear that puts a life at risk, to the Provost, in person.',
      loreText:
        'What the card leaves out, Ruth will tell you over soup. A read is felt, like somebody reading over your shoulder, and people remember who did it. What you hear is the top of a mind, in fragments, and it is not evidence. Going under into memory, or sending a thought the other way, comes with practice and goes badly when you are tired. Within arm’s reach of a null, nothing on this card works.',
      icon: 'papers',
    },
    {
      id: 'room_key',
      name: 'The Key to Room Four',
      tags: ['personal'],
      droppable: false,
      questItem: true,
      description: 'A heavy brass key on a paper tag. Somebody scratched C.A. into the brass under the number, small, where you would only see it if you looked.',
      loreText: 'Corin Abbott’s initials. The tag was replaced in April. The key was not.',
      icon: 'key',
    },
    {
      id: 'wellbeing_form',
      name: 'The Wellbeing Form',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'From your welcome packet, on cream paper. One page a week on how each housemate is sleeping, eating and coping, handed to the Provost in person. The first is due on Thursday.',
      loreText: 'Signed by Provost Sorrell in fountain pen, with a note: "You will see things the rest of us cannot. I would be grateful for a little of it." Corin Abbott was given the same form last year.',
      icon: 'papers',
    },
    {
      id: 'headphones',
      name: 'Noise-Cancelling Headphones',
      tags: ['personal'],
      skillModifiers: { walls: 1 },
      description: 'Big, scuffed, and useless against thoughts, which is not the point. Wearing them tells your own head that it is allowed to stop listening.',
      loreText: 'You bought them the week it started. Nothing else has ever helped.',
      icon: 'headphones',
    },
    {
      id: 'stillwater_tin',
      name: 'The Medicine Tin',
      tags: ['quest'],
      questItem: true,
      description: 'A locked steel tin on the top shelf of Ruth’s kitchen, for an ability emergency. It should hold two vials of Stillwater. It holds one.',
      loreText: 'Every house mother has one. Ruth has opened hers twice in eleven years, and both times she rang the infirmary first.',
      icon: 'box',
    },
    {
      id: 'stillwater_vial',
      name: 'The Missing Vial',
      tags: ['quest'],
      questItem: true,
      description: 'A thumb-sized glass vial of clear Stillwater with a college pharmacy seal. A drop dulls an ability for a day. The whole vial, in a drink, would stop a heart.',
      loreText: 'Hidden in the eyepiece case of the telescope in the dome, wrapped in a handkerchief with a C stitched in one corner.',
      icon: 'vial',
    },
    {
      id: 'ruth_file',
      name: 'Ruth’s File',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A buff folder in the bottom drawer of Ruth’s desk: a copy of Corin Abbott’s transfer form with her own signature on it, and seven months of her handwriting underneath.',
      loreText: 'The last page is a list of dates, a description of a locked basement corridor under the infirmary, and one telephone number for the Registry, circled twice and never rung.',
      icon: 'folder',
    },
    {
      id: 'corin_page',
      name: 'Corin’s Last Page',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A page torn from a notebook and slid behind the back panel of the wardrobe in Room Four: "He settles the ones he is afraid of. Eleven. Haru is next. If I go quiet, tell S. it was never her fault."',
      loreText: 'Dated the night before Corin Abbott transferred. The handwriting gets worse towards the bottom.',
      icon: 'letter',
    },
    {
      id: 'haru_ticket',
      name: 'Haru’s Bus Ticket',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'One way, Lowbridge to the coast, Saturday, 22:40, paid in cash. Folded small inside a sock in the bag under his bed.',
      loreText: 'He bought it the day after his second fire. The coast is where his father lives, and his father has not answered the phone in three years.',
      icon: 'ticket',
    },
    {
      id: 'lena_frames',
      name: 'Lena’s Frames',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { noticing: 1 },
      description: 'A sketchbook of charcoal frames, every one dated. Near the back: the parlour, the Provost on the floor, a spilled glass, a hand with a silver ring on its thumb, and you in the doorway.',
      loreText: 'The page before it is your face at the dinner table, spoon halfway up, dated three weeks before you arrived. The page after it is blank, which has never happened before.',
      icon: 'book',
    },
    {
      id: 'founders_decanter',
      name: 'The Founders’ Decanter',
      tags: ['quest'],
      questItem: true,
      description: 'Cut glass with a silver stopper, filled once a year with hot spiced plum cordial for the Founders’ toast. By the oldest rule in the house, the newest resident pours.',
      loreText: 'Five glasses on a tray beside it, and one with a gold rim for the Provost. It has been the same glass for forty years.',
      icon: 'bottle',
    },
    {
      id: 'withdrawal_files',
      name: 'The Withdrawal Files',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Eleven folders in a locked drawer in the Provost’s tower, each stamped VOLUNTARY WITHDRAWAL. Inside each, a Stillwater dosage sheet and his signature.',
      loreText: 'The newest is Corin Abbott’s, from April. The oldest is twenty years old. There is a twelfth folder with a name on the tab and nothing inside yet: Haru Ezaki.',
      icon: 'folder',
    },
  ],
  abilities: [
    {
      id: 'listen_in',
      name: 'Listen In',
      tags: ['mind'],
      description: 'Hear what is on top of one person’s mind right now. They may feel you do it.',
      affordances: ['listen in', 'listen harder', 'one mind at a time', 'read her mind', 'read his mind', 'read their mind', 'read her', 'read him', 'hear what she is thinking', 'hear what he is thinking'],
      costs: [{ resourceId: 'focus', amount: 6 }, { resourceId: 'distrust', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'listening', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hear_the_room',
      name: 'Open Up',
      tags: ['mind'],
      description: 'Drop every wall and let the whole room in at once. Loud, messy, and almost nothing gets past you.',
      affordances: ['open up', 'listen to everyone', 'read the whole table', 'read everyone', 'let them all in', 'drop my walls', 'listen to the whole room'],
      costs: [{ resourceId: 'focus', amount: 12 }, { resourceId: 'scrutiny', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'listening', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_under',
      name: 'Go Under',
      tags: ['mind'],
      description: 'Go below what somebody is thinking now, into what they remember. Slow, deep, and very hard to hide.',
      affordances: ['go under', 'go deeper', 'read her memories', 'read his memories', 'dig into her mind', 'dig into his mind', 'search his memory', 'search her memory'],
      costs: [{ resourceId: 'focus', amount: 16 }, { resourceId: 'distrust', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'diving', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'send_a_thought',
      name: 'Send',
      tags: ['mind'],
      description: 'Put one thought into somebody else’s head. Quiet enough, and they think it was theirs.',
      affordances: ['send a thought', 'send it', 'put a thought in', 'speak into her head', 'speak into his head', 'think at her', 'think at him', 'plant the idea'],
      costs: [{ resourceId: 'focus', amount: 12 }, { resourceId: 'scrutiny', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'sending', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'wall_up',
      name: 'Wall Up',
      tags: ['defensive'],
      description: 'Shut your mind like a door. No noise in, nothing out, and a warm voice slides off it.',
      affordances: ['wall up', 'put my walls up', 'shut it out', 'block them out', 'close my mind', 'resist him', 'put my headphones on', 'refuse'],
      costs: [{ resourceId: 'focus', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'walls', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'watch_them',
      name: 'Watch Them',
      tags: ['sight'],
      description: 'No powers, just eyes: who looks away first, whose hands are busy, who already knew.',
      affordances: ['watch them', 'watch her', 'watch him', 'watch his hands', 'study her face', 'look around the table', 'see who looks away', 'notice'],
      costs: [{ resourceId: 'focus', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'noticing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_it_through',
      name: 'Talk It Through',
      tags: ['social'],
      description: 'An honest conversation, out loud, with your walls up and your questions plain.',
      affordances: ['talk to her', 'talk to him', 'ask her', 'ask him', 'sit down and talk', 'be honest', 'tell the truth', 'chat'],
      costs: [{ resourceId: 'focus', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'rapport', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_a_straight_face',
      name: 'Straight Face',
      tags: ['social'],
      description: 'Lie, or say nothing true, with a face and a mind that agree with you.',
      affordances: ['lie', 'i lie', 'bluff', 'pretend', 'play it cool', 'act normal', 'say it is fine', 'cover for him', 'cover for her'],
      costs: [{ resourceId: 'focus', amount: 5 }, { resourceId: 'distrust', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluffing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_it_out',
      name: 'Call It Out',
      tags: ['social'],
      description: 'Say what you heard, out loud, to the room or to the person it is about.',
      affordances: ['accuse', 'call it out', 'say what i heard', 'tell them what i heard', 'confront her', 'confront him', 'which one of you', 'i heard that'],
      costs: [{ resourceId: 'focus', amount: 6 }, { resourceId: 'distrust', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_in',
      name: 'Slip In',
      tags: ['stealth'],
      description: 'Go where you are not allowed, quietly: a locked study, a roof after midnight, a tower office.',
      affordances: ['sneak', 'sneak in', 'slip in', 'break in', 'pick the lock', 'creep up', 'get into the tower', 'sneak onto the roof'],
      costs: [{ resourceId: 'focus', amount: 6 }, { resourceId: 'scrutiny', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'sneaking', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'search_the_place',
      name: 'Search',
      tags: ['utility'],
      description: 'Go through a room for something physical: a drawer, a wardrobe panel, an instrument case.',
      affordances: ['search', 'search the room', 'go through his things', 'go through her things', 'look in the drawers', 'check the wardrobe', 'look behind the panel', 'search the dome'],
      costs: [{ resourceId: 'focus', amount: 4 }, { resourceId: 'distrust', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'noticing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_on',
      name: 'Hold On',
      tags: ['utility'],
      description: 'Physically stop something: catch a wrist, block a door, knock a glass out of a hand.',
      affordances: ['grab her wrist', 'grab his arm', 'hold him back', 'hold her back', 'block the door', 'knock the glass away', 'stop her', 'stop him'],
      costs: [{ resourceId: 'focus', amount: 8 }, { resourceId: 'scrutiny', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'grit', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_with_them',
      name: 'Stay',
      tags: ['social'],
      description: 'Do not read, do not fix, do not leave. Sit with somebody and let them choose what to say.',
      affordances: ['stay', 'sit with him', 'sit with her', 'stay with them', 'keep him company', 'keep her company', 'say nothing', 'just be there'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'reach_the_locked_room',
      name: 'The Locked Room',
      tags: ['mind'],
      description: 'Find the one room in Corin’s mind the settling missed, and open it without breaking him.',
      affordances: ['open the locked room', 'open the door in his mind', 'unlock his memory', 'reach the locked room', 'help him remember', 'open the door'],
      costs: [{ resourceId: 'focus', amount: 25 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'diving', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['found_the_locked_room'],
        lockedCopy: 'There is no door to open yet. Somewhere in this college is a mind with one room nobody managed to empty, and you have not met it.',
      },
    },
  ],
  locations: [
    {
      id: 'the_dining_room',
      name: 'The Dining Room',
      shortName: 'Dining Room',
      description:
        'A long scrubbed table with five mismatched chairs, a hatch through to the kitchen, and a window onto the orchard. The lamp over the table is the warmest light in the house. Four bowls, one pot, and a chair at the head that Ruth only sits in when something is wrong.',
      artDirection:
        'Narrow old house dining room at night, a long wooden table under one warm hanging lamp, five mismatched chairs, steaming soup bowls, a serving hatch, dark orchard trees in the window. Cosy, slightly tense, amber and deep blue.',
      connections: [
        { to: 'the_kitchen', travelMinutes: 0, label: 'Through to the kitchen' },
        { to: 'the_hall', travelMinutes: 1, label: 'Out to the front hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_kitchen',
      name: 'Ruth’s Kitchen',
      shortName: 'Kitchen',
      description:
        'Ruth’s territory: a range that is never off, a washing-up rota in four handwritings, a radio turned low, and a locked steel tin on the top shelf that nobody is supposed to mention. The back door goes out to the orchard.',
      artDirection:
        'Warm cluttered house kitchen, an old enamel range with a pot on it, a handwritten rota pinned to a cupboard, a small radio, a locked steel tin on a high shelf, a back door with a glass pane. Lived-in, steamy, homely.',
      connections: [
        { to: 'the_dining_room', travelMinutes: 0, label: 'Back to the table' },
        { to: 'ruth_study', travelMinutes: 1, label: 'Ruth’s study, off the kitchen' },
        { to: 'the_orchard', travelMinutes: 1, label: 'Out the back door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'stillwater_tin', qty: 1, ownerId: 'ruth', aka: ['tin', 'the medicine tin', 'the locked tin', 'the steel tin'] },
      ],
    },
    {
      id: 'ruth_study',
      name: 'Ruth’s Study',
      shortName: 'Study',
      description:
        'A small room off the kitchen with an armchair Ruth sleeps in more often than her bed, a desk of college paperwork, a framed police commendation turned to face the wall, and a bottom drawer that sticks.',
      artDirection:
        'Tiny cramped study lit by a green desk lamp, an old armchair with a blanket, a desk buried in forms, a framed certificate turned to the wall, a stiff bottom drawer. Private, tired, a little guilty.',
      connections: [{ to: 'the_kitchen', travelMinutes: 1, label: 'Back into the kitchen' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [
        { itemId: 'ruth_file', qty: 1, ownerId: 'ruth', aka: ['file', 'her file', 'the buff folder', 'ruth’s notes'] },
      ],
    },
    {
      id: 'the_hall',
      name: 'The Front Hall',
      shortName: 'Hall',
      description:
        'Coat hooks, muddy boots, the stairs, and a chalkboard of house rules in four handwritings: 1. Nobody reads anybody at the table. 2. If Haru says behind, move. 3. Nobody on the roof after midnight except Sable. 4. Ruth’s soup is not a discussion. There is room underneath for a fifth.',
      artDirection:
        'Narrow Victorian front hall, coat hooks crowded with jackets, boots on a mat, a steep staircase, a chalkboard of handwritten rules by the door, a parlour door ajar. Warm, crowded, welcoming.',
      connections: [
        { to: 'the_dining_room', travelMinutes: 1, label: 'Back to the dining room' },
        { to: 'the_parlour', travelMinutes: 1, label: 'Into the parlour' },
        { to: 'the_landing', travelMinutes: 1, label: 'Up the stairs' },
        { to: 'halloran_green', travelMinutes: 3, label: 'Out the front door and up the path' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_parlour',
      name: 'The Parlour',
      shortName: 'Parlour',
      description:
        'The good room, used once a year. Portraits of a hundred years of residents, a fireplace nobody lights because of Haru, and on the sideboard the Founders’ decanter beside a tray of glasses, one of them gold-rimmed.',
      artDirection:
        'Old-fashioned parlour with dark panelling, rows of small framed portraits, an unlit fireplace, a cut-glass decanter and a tray of glasses on a sideboard, one glass with a gold rim. Formal, still, faintly ominous.',
      connections: [{ to: 'the_hall', travelMinutes: 1, label: 'Back to the hall' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'founders_decanter', qty: 1, ownerId: 'ruth', aka: ['decanter', 'the cordial', 'the cut-glass jug', 'the toast'] },
      ],
    },
    {
      id: 'the_landing',
      name: 'The Landing',
      shortName: 'Landing',
      description:
        'Four doors and a creaking floor. Room One is Haru’s, with a fire blanket on a hook outside. Room Two is Lena’s, with a drawing pinned to it. Room Three is Sable’s, always locked. Room Four is yours. At the end, a ladder goes up through a hatch to the dome.',
      artDirection:
        'Upstairs landing of an old narrow house at night, four numbered doors, a fire blanket on a hook, a drawing pinned to one door, a wooden ladder rising to a ceiling hatch, one dim wall lamp. Quiet, creaky, close.',
      connections: [
        { to: 'the_hall', travelMinutes: 1, label: 'Down the stairs' },
        { to: 'room_four', travelMinutes: 0, label: 'Room Four' },
        { to: 'haru_room', travelMinutes: 0, label: 'Room One, Haru’s' },
        { to: 'lena_room', travelMinutes: 0, label: 'Room Two, Lena’s' },
        { to: 'sable_room', travelMinutes: 0, label: 'Room Three, Sable’s' },
        { to: 'the_dome', travelMinutes: 2, label: 'Up the ladder to the roof' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'room_four',
      name: 'Room Four',
      shortName: 'Your Room',
      description:
        'Your room, and Corin Abbott’s until April. A narrow bed, a desk under the window, a wardrobe with a loose back panel, and pale squares on the wall where somebody else’s pictures used to hang.',
      artDirection:
        'Small student bedroom in an old house, a narrow bed with a folded blanket, a desk by a dark window, an old wardrobe, pale unfaded rectangles on the wallpaper where frames once hung. Bare, new, slightly haunted.',
      connections: [{ to: 'the_landing', travelMinutes: 0, label: 'Out to the landing' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'corin_page', qty: 1, ownerId: null, aka: ['page', 'the hidden page', 'the note', 'the page behind the wardrobe'] },
      ],
    },
    {
      id: 'haru_room',
      name: 'Haru’s Room',
      shortName: 'Room One',
      description:
        'Tiled floor to ceiling like a kitchen, a metal bed, scorch marks on the ceiling in the shape of bad nights, a window that is always open, and a packed bag under the bed that he has not unpacked since his second fire.',
      artDirection:
        'Student bedroom tiled like a professional kitchen, a metal-framed bed, faint scorch marks on the ceiling, an open window with the curtain blowing, a duffel bag under the bed, chef knives on a magnetic strip. Warm-toned, restless.',
      connections: [{ to: 'the_landing', travelMinutes: 0, label: 'Out to the landing' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'haru_ticket', qty: 1, ownerId: 'haru', aka: ['ticket', 'bus ticket', 'his ticket', 'the one-way ticket'] },
      ],
    },
    {
      id: 'lena_room',
      name: 'Lena’s Room',
      shortName: 'Room Two',
      description:
        'Every wall papered with charcoal frames of things that have not happened yet, dated in the corner. Some are crossed through when they come true. None has ever been crossed out for being wrong.',
      artDirection:
        'Student bedroom with every wall covered in charcoal sketches pinned edge to edge, some crossed through, a desk of pencils and fixative, a sketchbook on the pillow, fairy lights. Busy, intimate, unsettling up close.',
      connections: [{ to: 'the_landing', travelMinutes: 0, label: 'Out to the landing' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'lena_frames', qty: 1, ownerId: 'lena', aka: ['sketchbook', 'her sketchbook', 'her drawings', 'the frames'] },
      ],
    },
    {
      id: 'sable_room',
      name: 'Sable’s Room',
      shortName: 'Room Three',
      description:
        'Bare and tidy: a made bed, one chair, a grey coat on the back of the door, and nothing on the walls at all. Inside it, a telepath cannot hear anything, even through the floor. The door is locked whether she is in or not.',
      artDirection:
        'Spare minimalist student bedroom, a tightly made bed, one wooden chair, a grey wool coat on the door, bare walls, a single window with the blind half down. Cold, very quiet, deliberate.',
      connections: [{ to: 'the_landing', travelMinutes: 0, label: 'Out to the landing' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_dome',
      name: 'The Dome',
      shortName: 'Dome',
      description:
        'The old observatory on the roof that gave the house its name: a brass telescope on an iron mount, a slit in the dome that still opens, two folding chairs, and the whole college laid out below. Sable is up here most nights. The telescope’s eyepiece case is heavier than it should be.',
      artDirection:
        'Small rooftop observatory dome at night, a brass telescope on an iron mount, the dome slit open to a starry sky, two folding chairs, the lit windows of a hilltop college below. Cold, beautiful, secret.',
      connections: [{ to: 'the_landing', travelMinutes: 2, label: 'Down the ladder' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'stillwater_vial', qty: 1, ownerId: 'sable', aka: ['vial', 'the little bottle', 'the missing vial', 'the eyepiece case'] },
      ],
    },
    {
      id: 'the_orchard',
      name: 'The Orchard',
      shortName: 'Orchard',
      description:
        'Old apple trees behind the house, long grass, and a brick wall at the bottom that is scorched black in a man-sized patch where Haru burns off the day. There is a gap in the wall through to the lane down to town that the college pretends not to know about.',
      artDirection:
        'Overgrown orchard behind an old house at dusk, gnarled apple trees, long grass, a brick wall with a large scorched patch, a gap in the wall to a lane beyond. Wild, private, smoky.',
      connections: [
        { to: 'the_kitchen', travelMinutes: 1, label: 'In through the back door' },
        { to: 'halloran_green', travelMinutes: 4, label: 'Round the side of the house to the green' },
        { to: 'lowbridge', travelMinutes: 12, label: 'Through the gap in the wall and down the lane' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'halloran_green',
      name: 'Halloran Green',
      shortName: 'The Green',
      description:
        'The college’s main lawn, ringed by the big houses with their lit windows and their noise. Paths go up to the teaching block, the Provost’s tower, the glasshouse and the infirmary, and down to the main gate. Wardens in dark coats walk it after dark.',
      artDirection:
        'Wide college lawn at twilight ringed by large Victorian houses with lit windows, gravel paths, a clock tower beyond, a glasshouse glowing at one edge, figures in dark coats on the paths. Grand, watchful.',
      connections: [
        { to: 'the_hall', travelMinutes: 3, label: 'Down the path to Nova House' },
        { to: 'the_orchard', travelMinutes: 4, label: 'Round the back of Nova House' },
        { to: 'attunement_rooms', travelMinutes: 3, label: 'Up to the teaching block' },
        { to: 'provost_tower', travelMinutes: 4, label: 'Up to the Provost’s tower' },
        { to: 'the_glasshouse', travelMinutes: 5, label: 'Across to the glasshouse' },
        { to: 'the_quiet_wing', travelMinutes: 5, lockedByFlag: 'found_the_quiet_wing', label: 'Down the infirmary’s basement stairs' },
        { to: 'lowbridge', travelMinutes: 15, label: 'Out of the main gate and down the hill' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'attunement_rooms',
      name: 'The Attunement Rooms',
      shortName: 'Classes',
      description:
        'Where abilities are trained: padded rooms with observation windows, fireproof benches for the pyrokinetics, a silent room for the readers, and instructors with clipboards. Every session is logged and the logs go up to the tower.',
      artDirection:
        'Institutional training rooms, padded pale walls, large observation windows, a fireproof steel bench, an instructor with a clipboard behind glass, harsh even light. Clinical, monitored.',
      connections: [{ to: 'halloran_green', travelMinutes: 3, label: 'Back down to the green' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'provost_tower',
      name: 'The Provost’s Tower',
      shortName: 'The Tower',
      description:
        'The Provost’s office at the top of the old library tower, with his rooms above it: a fire always lit, deep chairs, a pot of tea going cold, a window over the whole green, and a desk drawer that is locked when he is out.',
      artDirection:
        'Round tower office at the top of an old library, a lit fireplace, deep leather armchairs, a teapot and cups on a side table, a wide window overlooking a college lawn, a big desk with a locked drawer. Warm, gracious, wrong.',
      connections: [{ to: 'halloran_green', travelMinutes: 4, label: 'Down the tower stairs to the green' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [
        { itemId: 'withdrawal_files', qty: 1, ownerId: 'sorrell', aka: ['files', 'the withdrawal files', 'the folders', 'eleven folders'] },
      ],
    },
    {
      id: 'the_glasshouse',
      name: 'The Glasshouse',
      shortName: 'Glasshouse',
      description:
        'A long Victorian glasshouse at the edge of the green, warm and wet and green, where the college grows tomatoes and lemons and things for the infirmary. Corin Abbott works here and sleeps in the gardeners’ room at the back.',
      artDirection:
        'Long Victorian glasshouse interior, steamy glass, rows of tomato plants and lemon trees in pots, a potting bench with seed trays, a narrow door to a back room. Lush, humid, peaceful.',
      connections: [{ to: 'halloran_green', travelMinutes: 5, label: 'Back across the green' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'the_quiet_wing',
      name: 'The Quiet Wing',
      shortName: 'Quiet Wing',
      description:
        'A basement corridor under the infirmary, behind a door with no sign: four clean rooms with soft chairs, a dispensary cabinet of Stillwater, and a chair by each bed for somebody to sit in. This is where settling happens.',
      artDirection:
        'Clean pale basement corridor under a hospital, soft armchairs in small white rooms, a locked glass medicine cabinet, one empty chair beside a neatly made bed. Calm, hushed, deeply wrong.',
      connections: [{ to: 'halloran_green', travelMinutes: 5, label: 'Back up the stairs' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: -2 },
      takeableItems: [],
    },
    {
      id: 'lowbridge',
      name: 'Lowbridge',
      shortName: 'Town',
      description:
        'The river town at the bottom of the hill: a stone bridge, a café that stays open late for students, a bus stop with one timetable on it, and lanterns strung along the river for Founders’ Night.',
      artDirection:
        'Small river town at night, a stone bridge over dark water, a lit café window, a lonely bus stop under a streetlight, paper lanterns strung along the riverbank. Gentle, open, a way out.',
      connections: [
        { to: 'halloran_green', travelMinutes: 15, label: 'Up the hill to the main gate' },
        { to: 'the_orchard', travelMinutes: 12, label: 'Up the lane and through the gap in the wall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 1 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_college',
      name: 'The Provost’s Office',
      description:
        'The administration of Halloran College: the Provost, his secretary, the Board of Wardens who countersign what he decides, and the wardens who walk the grounds at night. Kind, efficient, and very interested in the students it worries about.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Enrolled' },
        { atReputation: 25, label: 'In good standing' },
        { atReputation: 35, label: 'One of the Provost’s own' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_house',
      name: 'Nova House',
      description:
        'The four students and the house mother at the bottom of the grounds. A shared kitchen, a chalkboard of rules in four handwritings, and a habit of closing ranks against the college whenever it comes down the hill.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The new one' },
        { atReputation: 30, label: 'A housemate' },
        { atReputation: 55, label: 'Family' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_registry',
      name: 'The Registry',
      description:
        'The national body that licenses every adult with an ability and inspects the colleges that train them. Slow, suspicious of everybody, and the only authority Provost Sorrell answers to. Ruth Calder still has a telephone number for one of its inspectors.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A name on a list' },
        { atReputation: 15, label: 'A credible witness' },
        { atReputation: 30, label: 'Their source inside' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  /**
   * Cast order is cover-casting order: the three housemates first, because
   * they are the three suspects and the cover is the dinner table.
   */
  characters: [
    {
      id: 'haru',
      name: 'Haru Ezaki',
      role: 'Pyrokinetic, third-year, with two fires on his record and the loudest mind in the house',
      cardBlurb:
        'He jokes about fire before you can, asks you not to read him because it is loud in there, and has a bag packed under his bed that nobody in the house knows about.',
      pronouns: 'he/him',
      publicTraits: ['Makes the joke before anybody else can', 'Cooks like a professional and apologises to the pan', 'Never stands still in a room with a candle in it'],
      hiddenDrives: [
        'He wants to be somewhere nobody has read his record, and the coast is as far as the bus goes',
        'He wants his father to answer one phone call',
      ],
      values: ['Owning what you broke, out loud', 'Feeding people whether or not they asked'],
      fears: ['A third fire, with somebody in it', 'Being settled into somebody pleasant who never cooks again'],
      socialStyle:
        'Talks fast and fills silences with jokes, then goes quiet all at once. Says serious things to the pan rather than to your face.',
      boundaries: [
        'Will not be read without being asked first. He can feel it, and he will leave the room',
        'Will not turn his fire on a person, even to save himself, and will say so',
      ],
      goals: ['Get through his third-year review without a third fire', 'Be on the 22:40 bus on Saturday before anybody can stop him'],
      secrets: [
        {
          id: 'haru_the_bus',
          fact: 'He has a one-way bus ticket from Lowbridge to the coast for Saturday at 22:40, bought in cash after his second fire, and a bag packed under his bed. He has told nobody, including Sable.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows the ticket himself, late, in the orchard, if the player has asked before reading him at least once.',
        },
        {
          id: 'haru_the_restaurant',
          fact: 'His first fire, at eighteen, was during a Friday service in his father’s restaurant. Nobody was hurt. The restaurant closed, and his father has not spoken to him since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it in the kitchen while cooking, never looking up, if the player has eaten something he made and said so.',
        },
      ],
      speechStyle:
        'Fast and joking, in kitchen slang: "behind", "service", "eighty-six that", "plate it". Turns every fear into a heat joke before anybody else can make one. Goes very quiet and very plain when something is serious.',
      topics: ['his record', 'the restaurant', 'Sable', 'the orchard wall', 'his third-year review', 'cooking', 'the coast'],
      voiceSamples: [
        'Rule two of this house: if I say behind, you move. Kitchen habit. I’m not joking about behind.',
        'Relax. If I wanted you on fire you’d already be toast. Bad joke. I make those when I’m scared.',
        'My dad had a restaurant. Had. One Friday service when I was eighteen, and I’ve been apologising to kitchens since.',
        'Don’t read me right now. It’s loud in here, and most of it is smoke.',
      ],
      appearance:
        'Tall and restless, bleached hair with the dark roots grown out, a burn-scarred left hand, sleeves always shoved to the elbow, and a tea towel tucked in his back pocket like a chef on shift.',
      visualHook: 'A brass lighter he flicks open and shut constantly, though he has never once needed it to make a flame.',
      silhouette: 'Long-limbed and leaning, one shoulder against a doorframe, hands always moving.',
      artSeed: 'nova-haru-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'nervous', 'angry', 'sheepish'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'haru_room', activity: 'asleep with the window wide open whatever the weather' },
        { startMinute: 420, endMinute: 480, locationId: 'the_kitchen', activity: 'making breakfast for everybody and burning one piece of toast on purpose' },
        { startMinute: 480, endMinute: 720, locationId: 'attunement_rooms', activity: 'control drills at the fireproof bench' },
        { startMinute: 720, endMinute: 780, locationId: 'halloran_green', activity: 'eating lunch on the grass, alone, away from everybody' },
        { startMinute: 780, endMinute: 1020, locationId: 'attunement_rooms', activity: 'afternoon sessions with an instructor behind glass' },
        { startMinute: 1020, endMinute: 1140, locationId: 'the_orchard', activity: 'burning off the day against the scorched wall' },
        { startMinute: 1140, endMinute: 1230, locationId: 'the_dining_room', activity: 'at dinner, across the table from the new one' },
        { startMinute: 1230, endMinute: 1380, locationId: 'haru_room', activity: 'music too loud, door shut' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_orchard', activity: 'one last burn against the wall before bed' },
      ],
      homeLocationId: 'haru_room',
      knowledgeScope: ['nova_house', 'haru', 'sable', 'attunement_rooms', 'the_orchard', 'his_record', 'lowbridge'],
      startingRelationship: { trust: 25, affection: 25, respect: 20, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'haru_shows_you_the_ticket',
          label: 'He shows you the bus ticket',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'haru_lets_you_close',
          label: 'He stops checking his hands around you',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60 },
        },
      ],
      attributes: { might: 13, agility: 12, mind: 10, presence: 13, resolve: 9, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'lena',
      name: 'Lena Morrow',
      role: 'Precog, second-year, who draws the future in still frames and already drew you',
      cardBlurb:
        'She serves you soup, asks if something is wrong with it, and already knew the answer, because she drew your face at that table three weeks before you arrived.',
      pronouns: 'she/her',
      publicTraits: ['Friendly to everybody within a minute', 'Talks in the wrong tense and corrects herself', 'Never without charcoal on her fingers'],
      hiddenDrives: [
        'She wants to break one frame, once, to prove that the future can be moved',
        'She wants somebody she did not see coming',
      ],
      values: ['Never saying a frame out loud', 'Turning up for the thing she foresaw, even when she cannot change it'],
      fears: ['That every frame is fixed and she is only ever a witness', 'Being the reason something happens, because she drew it'],
      socialStyle:
        'Warm and quick, finishes your sentences half a second early and then apologises. Changes the subject the moment a conversation gets near her sketchbook.',
      boundaries: [
        'Will not describe a frame out loud, however she is asked. She will show one, rarely, to somebody she trusts',
        'Will not tell anybody a frame about their own death',
      ],
      goals: ['Find out whose hand is in the Founders’ Night frame', 'Break the Founders’ Night frame, whatever it takes'],
      secrets: [
        {
          id: 'lena_the_frame',
          fact: 'She has drawn Founders’ Night: the Provost on the parlour floor, a spilled glass, a hand with a silver ring on its thumb, and the player in the doorway. She does not know whose hand it is, and she is afraid to look at Sable’s.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows the sketchbook to a player who asks to see it without reading her first, once she trusts them.',
        },
        {
          id: 'lena_your_face',
          fact: 'She drew the player’s face at the dinner table, spoon halfway up, three weeks before they arrived. Her question at dinner was a test of whether the frame was right.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if the player asks why she was not surprised, or catches her checking the sketchbook at dinner.',
        },
        {
          id: 'lena_haru_on_the_bus',
          fact: 'She has a frame of Haru alone on a night bus, head against the window. She has never shown him, because saying it would make it heavier.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to a player who has already found Haru’s ticket and asks her what she knows.',
        },
      ],
      speechStyle:
        'Warm, chatty and slightly ahead of herself: slips into the future or the past tense, then corrects it. Calls her visions frames. Asks questions she already knows the answer to, to see what you do with them.',
      topics: ['her frames', 'Founders’ Night', 'the sketchbook', 'Haru', 'the café in town', 'what she saw of you'],
      voiceSamples: [
        'You took the chair by the window. Sorry. You’re about to. Sit, it’s fine, it’s a good chair.',
        'I never say a frame out loud. Once it’s said it gets heavier, and heavy ones don’t move.',
        'I drew your face three weeks ago, spoon halfway up. So no, I wasn’t surprised. I was relieved.',
        'Something wrong with the soup?',
      ],
      appearance:
        'Quick and wiry, dark curls held back with a knitted band, charcoal smudges on her fingers, a long cardigan with pockets full of pencil stubs.',
      visualHook: 'A battered sketchbook held shut with a hair tie, which she never puts down.',
      silhouette: 'Perched sideways on a chair arm, sketchbook on her knee.',
      artSeed: 'nova-lena-01',
      portrait: null,
      expressions: ['warm', 'bright', 'teasing', 'worried', 'haunted'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'lena_room', activity: 'asleep with the sketchbook under her pillow' },
        { startMinute: 360, endMinute: 480, locationId: 'lena_room', activity: 'drawing whatever she woke up with' },
        { startMinute: 480, endMinute: 720, locationId: 'attunement_rooms', activity: 'the precognition seminar, drawing under the desk' },
        { startMinute: 720, endMinute: 960, locationId: 'lowbridge', activity: 'at the café in town with two coffees, one for whoever is about to sit down' },
        { startMinute: 960, endMinute: 1140, locationId: 'lena_room', activity: 'pinning up new frames and crossing off old ones' },
        { startMinute: 1140, endMinute: 1230, locationId: 'the_dining_room', activity: 'serving the soup and watching the new one' },
        { startMinute: 1230, endMinute: 1440, locationId: 'the_parlour', activity: 'reading by the cold fireplace, listening to the hall' },
      ],
      homeLocationId: 'lena_room',
      knowledgeScope: ['nova_house', 'lena', 'her_frames', 'founders_night', 'haru', 'lowbridge'],
      startingRelationship: { trust: 40, affection: 40, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'lena_shows_the_frame',
          label: 'She shows you the Founders’ Night frame',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'lena_stops_drawing_you',
          label: 'She stops trying to see what you will do next',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 14, presence: 13, resolve: 11, arcana: 16 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sable',
      name: 'Sable Quint',
      role: 'Fourth-year whose mind is silent, and within arm’s reach of whom every ability stops',
      cardBlurb:
        'You cannot hear a single thought of hers. Step inside her reach and you cannot hear anyone, which is the first quiet you have had since it started. She is also the one person in the house you have to take at her word.',
      pronouns: 'she/her',
      publicTraits: ['Very still', 'Answers a question with a question', 'Kind in practical ways nobody thanks her for'],
      hiddenDrives: [
        'She wants the Provost to stop, permanently, and has decided that she is the one who can get close enough',
        'She wants to be forgiven by somebody who no longer remembers her',
      ],
      values: ['Doing the thing instead of talking about it', 'Paying for what she did, in person'],
      fears: [
        'Being furniture: the thing the college puts in a room so the room goes calm',
        'That she has already been the thing that emptied the person she loved',
      ],
      socialStyle:
        'Speaks only when it is useful. Stands exactly at arm’s length unless she means something by it. Watches hands, not faces.',
      boundaries: [
        'Will not hurt anybody in this house. The thought at dinner was fear talking, and she is ashamed of it',
        'Will not run. If she does it, she will walk up the hill to the wardens herself afterwards',
      ],
      goals: ['Put the vial in the Provost’s glass on Founders’ Night', 'Find out before Saturday whether the new telepath is his eyes'],
      secrets: [
        {
          id: 'sable_the_plan',
          fact: 'The thought at dinner was hers: for one second her wall slipped. She plans to put a stolen vial of Stillwater into the Provost’s glass at the Founders’ toast, and has hidden the vial in the eyepiece case of the telescope in the dome.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells a player who has found the vial or the frame and brings it to her alone, on the roof, rather than to anybody else.',
        },
        {
          id: 'sable_corins_settling',
          fact: 'In April she was ordered to sit with Corin Abbott during his settling, to keep him calm. Her null held his ability still while the Stillwater worked. She has worn his ring on her thumb ever since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once she trusts the player, and usually only after they have met Corin at the glasshouse.',
        },
        {
          id: 'sable_next',
          fact: 'The Provost has scheduled her for “study” in the Quiet Wing after Founders’ Night. He wants to use her null to settle people without the drug.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it flatly if the player asks what happens to her if she does nothing.',
        },
      ],
      speechStyle:
        'Short and exact. Never says "I think". Measures everything in arm’s lengths. Answers questions with questions, and tells you when you took too long to answer hers.',
      topics: ['arm’s length', 'the dome', 'Corin', 'the Provost', 'Haru', 'what she is for'],
      voiceSamples: [
        'Arm’s length. Inside it, nobody hears anybody. Outside it is your business.',
        'You heard something at dinner. Give me the exact words it used.',
        'People like me make good furniture. Put us in a room and the room goes calm. Ask Corin how calm.',
        'Do you write reports for him? Answer quickly. Hesitating counts as yes.',
      ],
      appearance:
        'Pale and very still, black hair cut blunt at the jaw, a long grey wool coat worn indoors, plain dark clothes with nothing on them to catch.',
      visualHook: 'A man’s silver ring worn on her left thumb, which she turns when she is deciding something.',
      silhouette: 'Upright and motionless in a long coat, hands in her pockets, exactly one arm’s length from everyone.',
      artSeed: 'nova-sable-01',
      portrait: null,
      expressions: ['neutral', 'still', 'wary', 'dry', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'the_dome', activity: 'on the roof with the telescope, slit open' },
        { startMinute: 60, endMinute: 420, locationId: 'sable_room', activity: 'behind a locked door' },
        { startMinute: 420, endMinute: 540, locationId: 'halloran_green', activity: 'running laps of the green before anybody else is up' },
        { startMinute: 540, endMinute: 900, locationId: 'attunement_rooms', activity: 'sitting in on difficult sessions so they stay calm, which is what the college uses her for' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_glasshouse', activity: 'standing outside the glass, watching the gardener, never going in' },
        { startMinute: 1080, endMinute: 1140, locationId: 'sable_room', activity: 'alone, door locked' },
        { startMinute: 1140, endMinute: 1230, locationId: 'the_dining_room', activity: 'at the far end of the table, turning her glass' },
        { startMinute: 1230, endMinute: 1440, locationId: 'the_dome', activity: 'on the roof, where nobody can hear anybody' },
      ],
      homeLocationId: 'sable_room',
      knowledgeScope: ['nova_house', 'sable', 'corin', 'the_provost', 'the_quiet_wing', 'stillwater', 'the_dome'],
      startingRelationship: { trust: 5, affection: 10, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sable_lowers_the_wall',
          label: 'She lets her wall down for you, once',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['knows_it_is_sable'] },
        },
        {
          id: 'sable_lets_you_in_reach',
          label: 'She stops keeping you at arm’s length',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 60 },
        },
      ],
      attributes: { might: 11, agility: 13, mind: 15, presence: 10, resolve: 17, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ruth',
      name: 'Ruth Calder',
      role: 'House Mother of Nova House. Former police empath, current keeper of the keys and the soup',
      cardBlurb:
        'She runs the house, makes the soup and knocks twice on your door at curfew. She can feel what you feel across a table, after twenty years doing it for the police, and since April the guilt she feels most is her own.',
      pronouns: 'she/her',
      publicTraits: ['Numbers her rules', 'Feeds people as a way of ending arguments', 'Knows what you felt before you did'],
      hiddenDrives: ['She wants to undo a signature, and knows she cannot', 'She wants the house to solve this before the college does'],
      values: ['Everybody at the table by seven', 'Telling the truth to people who can do something with it'],
      fears: ['That she is complicit, and that kindness was only ever her excuse', 'Losing another of her four'],
      socialStyle:
        'Firm and warm at once. Says hard things while handing you a bowl. Asks what you are feeling and then tells you, correctly.',
      boundaries: [
        'Will not let anybody be read at her table, and will put a hand flat on it until it stops',
        'Will not go to the college about one of her own. She will go to anybody else first',
      ],
      goals: ['Get all four of them through Founders’ Night alive and still in the house', 'Find out who took the second vial without having to ask'],
      secrets: [
        {
          id: 'ruth_the_signature',
          fact: 'In April she signed Corin Abbott’s transfer because the Provost told her it was kind. She felt Corin’s fear through two floors that night, and has kept a file on the Provost ever since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells the player in her study, late, if they ask her about Room Four’s last tenant without having read her.',
        },
        {
          id: 'ruth_the_missing_vial',
          fact: 'She knows one of her two emergency vials of Stillwater is missing, suspects Sable, and has not reported it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player mentions the tin, she goes very still and asks who else they have told.',
        },
      ],
      speechStyle:
        'House-rule firmness. Numbers her rules and adds new ones mid-conversation. Plain words and police patience, and every hard conversation ends with an order about food.',
      topics: ['the house rules', 'Room Four', 'Corin', 'her police years', 'the medicine tin', 'Founders’ Night'],
      voiceSamples: [
        'Walls up at the table, walls down in your own room, and nobody reads Haru when he’s angry. That rule is for your safety.',
        'Twenty years I sat across interview tables feeling what people felt. I know what guilt tastes like in a kitchen.',
        'I signed a paper in April because a man I trusted called it kindness. Eat your soup.',
        'House rule five, as of now: you knock, you wait, you eat what you are given.',
      ],
      appearance:
        'Broad and grey-haired, reading glasses pushed up into her hair, an apron over a cardigan, and sensible shoes that make no noise on the landing.',
      visualHook: 'An enormous ring of old keys on her belt, on which she can find the right one in the dark.',
      silhouette: 'Square in a doorway, one hand on the frame, the other holding a ladle.',
      artSeed: 'nova-ruth-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'kind', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'ruth_study', activity: 'asleep in the armchair more often than in her bed' },
        { startMinute: 360, endMinute: 600, locationId: 'the_kitchen', activity: 'breakfast, the post and the radio' },
        { startMinute: 600, endMinute: 840, locationId: 'ruth_study', activity: 'college paperwork, door ajar' },
        { startMinute: 840, endMinute: 1020, locationId: 'lowbridge', activity: 'shopping in town, and a cup of tea with nobody' },
        { startMinute: 1020, endMinute: 1140, locationId: 'the_kitchen', activity: 'cooking dinner with the radio low' },
        { startMinute: 1140, endMinute: 1260, locationId: 'the_kitchen', activity: 'eating alone at the counter, listening to the table through the hatch' },
        { startMinute: 1260, endMinute: 1380, locationId: 'the_hall', activity: 'locking up and walking the landing at curfew' },
        { startMinute: 1380, endMinute: 1440, locationId: 'ruth_study', activity: 'writing in a file she keeps in the bottom drawer' },
      ],
      homeLocationId: 'ruth_study',
      knowledgeScope: ['nova_house', 'ruth', 'corin', 'stillwater', 'the_registry', 'house_rules'],
      startingRelationship: { trust: 45, affection: 35, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ruth_opens_the_file',
          label: 'She shows you her file on the Provost',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['learned_about_corin'] },
        },
        {
          id: 'ruth_rings_the_registry',
          label: 'She makes the telephone call she has been putting off',
          kind: 'ALLIANCE',
          requires: { trust: 65, respect: 50 },
        },
      ],
      attributes: { might: 10, agility: 9, mind: 14, presence: 13, resolve: 16, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sorrell',
      name: 'Nathaniel Sorrell',
      calledName: 'Sorrell',
      role: 'Provost of Halloran College. A gentle man with a voice that makes you agree',
      cardBlurb:
        'He signed the form in your welcome packet in fountain pen and asked for a page a week on how your housemates are sleeping. Everybody tells you he is the kindest man at the college, and the house goes quiet whenever his name comes up.',
      pronouns: 'he/him',
      publicTraits: ['Remembers every student’s name', 'Never raises his voice', 'Always has tea and never finishes it'],
      hiddenDrives: [
        'He wants to be the man who stopped the fire before it started, every time, for ever',
        'He wants a telepath of his own, and thinks he has finally been sent one',
      ],
      values: ['Safety before comfort', 'Paperwork that is true in every word and misleading as a whole'],
      fears: ['Another telephone call like the one about his sister', 'Being found out by somebody he cannot steer'],
      socialStyle:
        'Gentle, attentive and generous with his time. Offers a choice, then makes one option feel obvious. Asks questions you find yourself answering yes to.',
      boundaries: [
        'Will not raise his voice, and does not need to',
        'Will not write down anything false. He writes down true things in an order that lies',
      ],
      goals: [
        'Settle Haru Ezaki before the fire he is sure is coming',
        'Make the new telepath his eyes in Nova House',
        'Study Sable Quint after Founders’ Night',
      ],
      secrets: [
        {
          id: 'sorrell_the_eleven',
          fact: 'He has settled eleven students in twenty years and filed every one as a voluntary withdrawal. The files are in a locked drawer in his tower, with a twelfth already started for Haru.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Never from him. From his files, from Corin’s locked room, or from Ruth’s file.',
        },
        {
          id: 'sorrell_why_you',
          fact: 'He put the player in Nova House deliberately, in Corin’s old room, to watch Haru and to find out whether Sable is shielding the house.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He nearly says it himself, as a compliment, if the player brings him a good report.',
        },
      ],
      speechStyle:
        'Gentle, unhurried and generous, with the steer built into the grammar: he offers, then assumes. Ends on soft questions that are easier to answer yes than no. Talks about his sister once, plainly, and never again.',
      topics: ['your wellbeing', 'Founders’ Night', 'his sister', 'the college', 'Haru', 'settling'],
      voiceSamples: [
        'I ask very little. A page a week on how everybody is sleeping. You’d want somebody asking that about you.',
        'My sister was nineteen when a student who could not hold his fire took her. Forty years, and I still hear the telephone.',
        'Nobody here is punished. Some people are helped to put something down. Wouldn’t you want that, if it were too much?',
        'Sit wherever feels right. That one? Yes. I thought you might.',
      ],
      appearance:
        'Slight and silver-haired, rimless glasses, a soft grey cardigan under a good jacket, and an air of having all the time in the world for you.',
      visualHook: 'A cup of tea always in his hand, always cold, never once finished.',
      silhouette: 'Slight and unhurried, head tilted to listen, one hand open as if offering a seat.',
      artSeed: 'nova-sorrell-01',
      portrait: null,
      expressions: ['warm', 'gracious', 'calculating', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'provost_tower', activity: 'in his rooms above the office' },
        { startMinute: 420, endMinute: 1140, locationId: 'provost_tower', activity: 'office hours, door open, tea going cold' },
        { startMinute: 1140, endMinute: 1260, locationId: 'halloran_green', activity: 'walking the green, greeting students by name' },
        { startMinute: 1260, endMinute: 1440, locationId: 'provost_tower', activity: 'reading reports by the fire' },
      ],
      homeLocationId: 'provost_tower',
      knowledgeScope: ['halloran_college', 'the_provost', 'settling', 'stillwater', 'the_quiet_wing', 'haru', 'sable', 'corin'],
      startingRelationship: { trust: 40, affection: 30, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sorrell_tells_you_about_her',
          label: 'He tells you about his sister',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'sorrell_offers_you_a_place',
          label: 'He offers you a place at his side',
          kind: 'ALLIANCE',
          requires: { trust: 60, flagsSet: ['informed_on_the_house'] },
        },
      ],
      attributes: { might: 8, agility: 8, mind: 16, presence: 18, resolve: 15, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'corin',
      name: 'Corin Abbott',
      role: 'Gardener at the college glasshouse, who keeps stopping at the Nova House gate',
      cardBlurb:
        'He grows tomatoes in the glasshouse, asks you whether you have met before, and keeps stopping at your gate without knowing why.',
      pronouns: 'he/him',
      publicTraits: ['Gentle with everything that grows', 'Loses the thread mid-sentence', 'Hums a song he cannot place'],
      hiddenDrives: ['He wants to know what he lost without being told it by somebody who pities him'],
      values: ['Patience', 'Asking before touching'],
      fears: ['Remembering something that turns him into somebody else again', 'Being looked at the way people at that gate look at him'],
      socialStyle:
        'Pleasant and slightly absent. Talks to plants and to people in the same tone. Asks everybody whether he knows them.',
      boundaries: [
        'Will not let anybody into his head without asking first, and will say so if he feels it',
        'Will not come past the Nova House gate at the bottom of the garden path: not the path, not the front door, not the hall, the stairs or any room. He stands at the gate and talks across it, and does not know why. He will not',
      ],
      goals: ['Get the tomatoes through the first frost', 'Find out why he keeps stopping at that gate'],
      secrets: [
        {
          id: 'corin_the_locked_room',
          fact: 'The settling missed one room in his mind: the list he read in the Provost’s head in April, ten names and his own added at the bottom. A telepath who goes carefully can open it, and with it some of what he lost.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'A telepath who reads him finds it at once: a house with the furniture taken out, and one locked door.',
        },
      ],
      speechStyle:
        'Soft and pleasant. Loses the thread and picks it up somewhere else. Says "I think" about things he ought to know. Describes people as if they were plants.',
      topics: ['the glasshouse', 'tomatoes', 'the gap where spring was', 'the gate', 'the song he hums'],
      voiceSamples: [
        'These are tomatoes. They want more than they need. I like that about them, I think.',
        'Do I know you? Sorry. I ask everybody. There’s a gap where last spring was, and people keep walking out of it.',
        'There’s a door in me I can’t open. It doesn’t hurt. I just keep putting my hand on it.',
      ],
      appearance:
        'Lanky and soft-spoken, overgrown brown hair, soil on his knees, a cardigan with both elbows worn through.',
      visualHook: 'A stub of pencil behind his ear that he uses for plant labels and, sometimes, for words he does not remember choosing.',
      silhouette: 'Stooped over a bench of seedlings, long arms, head on one side.',
      artSeed: 'nova-corin-01',
      portrait: null,
      expressions: ['gentle', 'confused', 'lost', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_glasshouse', activity: 'asleep in the gardeners’ room at the back' },
        { startMinute: 360, endMinute: 1080, locationId: 'the_glasshouse', activity: 'repotting, watering and humming' },
        { startMinute: 1080, endMinute: 1200, locationId: 'lowbridge', activity: 'supper at the café, at the same table every night' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_glasshouse', activity: 'reading the same book again among the lemon trees' },
      ],
      homeLocationId: 'the_glasshouse',
      knowledgeScope: ['the_glasshouse', 'corin', 'lowbridge'],
      startingRelationship: { trust: 15, affection: 20, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'corin_lets_you_try',
          label: 'He lets you try the locked door',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['found_the_locked_room'] },
        },
      ],
      attributes: { might: 10, agility: 10, mind: 11, presence: 11, resolve: 9, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_first_dinner',
      title: 'Something Wrong With the Soup',
      summary: 'Somebody at your first dinner thought about killing you, and the woman who served the soup has just asked what is wrong with it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['lena', 'haru', 'sable', 'ruth'],
      involvedLocationIds: ['the_dining_room', 'the_kitchen', 'the_landing', 'room_four', 'the_dome'],
      knownRewardCopy: 'A first night in the house, and some idea of who at that table you can turn your back on.',
      steps: [
        {
          id: 'the_table',
          playerCopy: 'Get through the rest of dinner, one way or another.',
          directorNotes:
            'Three housemates, all plausible, and Ruth listening through the hatch. Whatever the player does, nobody confesses here. Lena already knows the player heard something, because she drew this moment. Haru is nervous because a telepath is at the table and his head is loud. Sable is perfectly calm and perfectly silent. Breaking the house rule works, and everybody can tell it happened.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'played_it_cool',
              label: 'Say the soup is fine and keep eating',
              predicate: { flagsSet: ['used:keep_a_straight_face'] },
              setsFlags: ['played_it_cool'],
              closesFlags: ['told_the_table'],
            },
            {
              routeId: 'listened_to_one',
              label: 'Break the house rule and listen to one of them',
              predicate: { flagsSet: ['used:listen_in'] },
              setsFlags: ['broke_the_house_rule'],
              closesFlags: [],
            },
            {
              routeId: 'listened_to_all',
              label: 'Drop your walls and let the whole table in',
              predicate: { flagsSet: ['used:hear_the_room'] },
              setsFlags: ['broke_the_house_rule', 'heard_the_whole_table'],
              closesFlags: [],
            },
            {
              routeId: 'told_the_table',
              label: 'Say out loud what you heard',
              predicate: { flagsSet: ['used:call_it_out'] },
              setsFlags: ['told_the_table'],
              closesFlags: ['played_it_cool'],
            },
            {
              routeId: 'watched_them',
              label: 'Watch who looks away first',
              predicate: { flagsSet: ['used:watch_them'] },
              setsFlags: ['watched_the_table'],
              closesFlags: [],
            },
            {
              routeId: 'made_conversation',
              label: 'Make honest conversation with three strangers',
              predicate: { flagsSet: ['used:talk_it_through'] },
              setsFlags: ['made_conversation'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['first_dinner_over'], abilities: [], reputation: [] },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Get through your first night in a house where somebody might want you dead.',
          directorNotes:
            'Curfew at half ten. Ruth knocks twice on every door. The dome light comes on after midnight. Every route here is a real way to spend a frightening first night, including locking the door and sleeping. By morning the player has learned, by instinct and a bad night, how to go under the surface of a mind as well as listen to it.',
          enterWhen: { flagsSet: ['first_dinner_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_to_ruth',
              label: 'Go and find Ruth in the kitchen',
              predicate: { flagsSet: ['spoke:ruth'] },
              setsFlags: ['ruth_warned_you'],
              closesFlags: [],
            },
            {
              routeId: 'searched_your_room',
              label: 'Search Room Four for whatever Corin left',
              predicate: { hasItems: ['corin_page'] },
              setsFlags: ['found_corins_page'],
              closesFlags: [],
            },
            {
              routeId: 'went_up_to_the_roof',
              label: 'Follow the light up to the dome',
              predicate: { atLocation: 'the_dome' },
              setsFlags: ['met_sable_on_the_roof'],
              closesFlags: [],
            },
            {
              routeId: 'sat_up_with_haru',
              label: 'Knock on Haru’s door',
              predicate: { flagsSet: ['spoke:haru'], atLocation: 'haru_room' },
              setsFlags: ['sat_up_with_haru'],
              closesFlags: [],
            },
            {
              routeId: 'sat_up_with_lena',
              label: 'Knock on Lena’s door',
              predicate: { flagsSet: ['spoke:lena'], atLocation: 'lena_room' },
              setsFlags: ['sat_up_with_lena'],
              closesFlags: [],
            },
            {
              routeId: 'walled_up_and_slept',
              label: 'Put your walls up and sleep',
              predicate: { flagsSet: ['used:wall_up'] },
              setsFlags: ['slept_behind_a_wall'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_night_over'],
            abilities: ['go_under'],
            reputation: [{ factionId: 'faction_house', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_whose_thought',
      title: 'Whose Thought Was It',
      summary: 'Three housemates, one thought, and a mind you cannot hear at all. Somebody in Nova House is planning a murder.',
      kind: 'MAIN',
      involvedCharacterIds: ['haru', 'lena', 'sable', 'ruth', 'corin'],
      involvedLocationIds: ['the_dome', 'lena_room', 'haru_room', 'room_four', 'ruth_study', 'provost_tower'],
      knownRewardCopy: 'A name, and a reason, and the choice of what to do with both.',
      discoverWhen: { flagsSet: ['first_dinner_over'] },
      steps: [
        {
          id: 'narrow_it_down',
          playerCopy: 'Work out which of your housemates thought it.',
          directorNotes:
            'It was Sable, and the player does not know that. Keep Haru loud and hot and suspicious, Lena knowing too much, and Sable unreadable, which reads as innocent. Several honest ways to the answer exist, and naming the wrong person out loud is a real route with real damage: the accused housemate is hurt, the house splits, and the plan goes on untouched.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_the_vial',
              label: 'Find the vial in the dome',
              predicate: { hasItems: ['stillwater_vial'] },
              setsFlags: ['knows_it_is_sable', 'took_the_vial'],
              closesFlags: [],
            },
            {
              routeId: 'saw_the_ring',
              label: 'See the ringed thumb in Lena’s frame',
              predicate: { hasItems: ['lena_frames'] },
              setsFlags: ['knows_it_is_sable', 'saw_the_frame'],
              closesFlags: [],
            },
            {
              routeId: 'heard_her_slip',
              label: 'Go under Sable’s wall when she lets it slip',
              predicate: {
                flagsSet: ['used:go_under'],
                minRelationship: [{ characterId: 'sable', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows_it_is_sable', 'heard_sable'],
              closesFlags: [],
            },
            {
              routeId: 'she_told_you',
              label: 'Ask Sable straight, and get an answer',
              predicate: {
                flagsSet: ['spoke:sable'],
                minRelationship: [{ characterId: 'sable', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows_it_is_sable', 'sable_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'blamed_haru',
              label: 'Accuse Haru',
              predicate: { flagsSet: ['used:call_it_out', 'spoke:haru'] },
              setsFlags: ['accused_haru', 'accused_the_wrong_one'],
              closesFlags: [],
            },
            {
              routeId: 'blamed_lena',
              label: 'Accuse Lena',
              predicate: { flagsSet: ['used:call_it_out', 'spoke:lena'] },
              setsFlags: ['accused_lena', 'accused_the_wrong_one'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['suspect_named'],
            abilities: [],
            reputation: [{ factionId: 'faction_house', amount: 5 }],
          },
        },
        {
          id: 'the_reason',
          playerCopy: 'Find out why anybody in this house would want the Provost dead.',
          directorNotes:
            'The answer is Corin Abbott, and the ten before him. It can come from paper (Corin’s page, Ruth’s file, the Provost’s drawer) or from people (Ruth, Sable). The people version costs less and means more. Do not let the Provost become a cartoon on the way: everything he did, he believes was a kindness.',
          enterWhen: { flagsSet: ['knows_it_is_sable'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_page',
              label: 'Read the page Corin hid behind the wardrobe',
              predicate: { hasItems: ['corin_page'] },
              setsFlags: ['learned_about_corin'],
              closesFlags: [],
            },
            {
              routeId: 'read_ruths_file',
              label: 'Read the file in Ruth’s bottom drawer',
              predicate: { hasItems: ['ruth_file'] },
              setsFlags: ['learned_about_corin', 'found_the_quiet_wing'],
              closesFlags: [],
            },
            {
              routeId: 'ruth_told_you',
              label: 'Get Ruth to tell you about April',
              predicate: {
                flagsSet: ['spoke:ruth'],
                minRelationship: [{ characterId: 'ruth', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['learned_about_corin', 'ruth_confessed', 'found_the_quiet_wing'],
              closesFlags: [],
            },
            {
              routeId: 'sable_told_you_why',
              label: 'Earn the reason from Sable herself',
              predicate: { minRelationship: [{ characterId: 'sable', dimension: 'trust', value: 60 }] },
              setsFlags: ['learned_about_corin', 'sable_trusts_you'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_files',
              label: 'Take the eleven folders from the Provost’s drawer',
              predicate: { hasItems: ['withdrawal_files'] },
              setsFlags: ['learned_about_corin', 'has_the_eleven'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows_why'],
            abilities: [],
            reputation: [
              { factionId: 'faction_house', amount: 10 },
              { factionId: 'faction_registry', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_form',
      title: 'The Wellbeing Form',
      summary: 'A page a week on how your housemates are sleeping, handed to the Provost in person. He was very kind about it.',
      kind: 'MAIN',
      involvedCharacterIds: ['sorrell', 'ruth', 'sable'],
      involvedLocationIds: ['provost_tower', 'the_dining_room'],
      knownRewardCopy: 'The Provost’s good opinion, or the house’s. Possibly not both.',
      discoverWhen: { flagsSet: ['summoned_by_provost'] },
      steps: [
        {
          id: 'the_first_report',
          playerCopy: 'Decide what you tell the Provost about Nova House.',
          directorNotes:
            'He is warm, he is generous, and his voice makes yes feel like the player’s own idea. A wall resists it. Every route is survivable. Telling him the truth gets Haru’s folder filled faster and gets Sable taken if she is named. Lying to a man who steers costs nerve. Showing the house the form costs the Provost’s trust and buys the house’s.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_him_everything',
              label: 'Hand him an honest report in the tower',
              predicate: { atLocation: 'provost_tower', hasItems: ['wellbeing_form'], flagsSet: ['spoke:sorrell'] },
              setsFlags: ['informed_on_the_house'],
              closesFlags: ['refused_the_provost', 'fed_him_lies'],
            },
            {
              routeId: 'fed_him_lies',
              label: 'Tell him everybody is sleeping beautifully',
              predicate: { flagsSet: ['spoke:sorrell', 'used:keep_a_straight_face'] },
              setsFlags: ['fed_him_lies'],
              closesFlags: ['informed_on_the_house'],
            },
            {
              routeId: 'refused_him',
              label: 'Put your walls up and say no',
              predicate: { flagsSet: ['spoke:sorrell', 'used:wall_up'] },
              setsFlags: ['refused_the_provost'],
              closesFlags: ['informed_on_the_house'],
            },
            {
              routeId: 'showed_the_house',
              label: 'Put the form on the dinner table',
              predicate: { atLocation: 'the_dining_room', hasItems: ['wellbeing_form'], flagsSet: ['used:call_it_out'] },
              setsFlags: ['showed_the_house_the_form'],
              closesFlags: ['informed_on_the_house'],
            },
            {
              routeId: 'read_him_back',
              label: 'Listen in on the Provost while he asks',
              predicate: { flagsSet: ['spoke:sorrell', 'used:listen_in'] },
              setsFlags: ['read_the_provost'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['form_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_college', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_two_fires',
      title: 'Two Fires',
      summary: 'Haru Ezaki has two fires on his record and a bag packed under his bed. A third fire, and the college settles him.',
      kind: 'SIDE',
      involvedCharacterIds: ['haru', 'lena', 'sorrell'],
      involvedLocationIds: ['haru_room', 'the_orchard', 'attunement_rooms', 'lowbridge'],
      knownRewardCopy: 'Whether the loudest mind in the house is still in it on Sunday.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'the_bag',
          playerCopy: 'Find out what Haru is planning.',
          directorNotes:
            'He is running on Saturday, after the toast, on the 22:40. He does not know about Sable’s plan. Asking before reading him is what earns this; reading him without asking gets the bag and loses him.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_the_ticket',
              label: 'Find the ticket in his bag',
              predicate: { hasItems: ['haru_ticket'] },
              setsFlags: ['knows_haru_is_running'],
              closesFlags: [],
            },
            {
              routeId: 'he_showed_you',
              label: 'Let him show you himself',
              predicate: {
                flagsSet: ['spoke:haru'],
                minRelationship: [{ characterId: 'haru', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows_haru_is_running', 'haru_trusts_you'],
              closesFlags: [],
            },
            {
              routeId: 'steadied_him',
              label: 'Stay with him on a bad afternoon',
              predicate: {
                flagsSet: ['used:stay_with_them'],
                minRelationship: [{ characterId: 'haru', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['haru_steadied'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['haru_known'], abilities: [], reputation: [] },
        },
        {
          id: 'stay_or_go',
          playerCopy: 'Decide, with Haru or without him, whether he is on the last bus.',
          directorNotes:
            'Staying, going and being reported are all real and none is the good ending on its own. If he goes, he goes for good reasons. If he stays, the twelfth folder is still in the tower. The player choosing for him without asking is possible, and he will know.',
          enterWhen: { flagsSet: ['haru_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'talked_him_into_staying',
              label: 'Give him a reason to stay',
              predicate: {
                flagsSet: ['haru_trusts_you'],
                minRelationship: [{ characterId: 'haru', dimension: 'affection', value: 55 }],
              },
              setsFlags: ['haru_stayed'],
              closesFlags: ['haru_left'],
            },
            {
              routeId: 'helped_him_go',
              label: 'Help him get away clean',
              predicate: { flagsSet: ['knows_haru_is_running', 'used:talk_it_through'] },
              setsFlags: ['haru_left', 'helped_haru_run'],
              closesFlags: ['haru_stayed'],
            },
            {
              routeId: 'went_with_him',
              label: 'Get on the bus with him',
              predicate: { atLocation: 'lowbridge', flagsSet: ['knows_haru_is_running', 'founders_night_came'] },
              setsFlags: ['haru_left', 'left_with_haru'],
              closesFlags: ['haru_stayed'],
            },
            {
              routeId: 'reported_him',
              label: 'Tell the Provost he is running',
              predicate: { flagsSet: ['informed_on_the_house', 'knows_haru_is_running'] },
              setsFlags: ['haru_settled'],
              closesFlags: ['haru_left', 'haru_stayed'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['haru_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_house', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_locked_room',
      title: 'The Locked Room',
      summary: 'Corin Abbott grows tomatoes, hums a song he cannot place, and has one door in his mind that the college failed to empty.',
      kind: 'LEAD',
      involvedCharacterIds: ['corin', 'sable'],
      involvedLocationIds: ['the_glasshouse', 'halloran_green'],
      knownRewardCopy: 'The only witness to the eleven who is still a person, if he wants to be one.',
      discoverWhen: { flagsSet: ['learned_about_corin'] },
      steps: [
        {
          id: 'find_corin',
          playerCopy: 'Find Corin at the glasshouse, and find the door.',
          directorNotes:
            'Reading him is like walking through a house with the furniture taken out: clean, pleasant, empty rooms, and one door that will not open. He is kind to the player at once and has no idea why he likes them. Do not play him as tragic. He is content, mostly, and that is part of what makes it hard.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'met_him',
              label: 'Talk to him among the tomatoes',
              predicate: { atLocation: 'the_glasshouse', flagsSet: ['spoke:corin'] },
              setsFlags: ['found_the_locked_room'],
              closesFlags: [],
            },
            {
              routeId: 'read_him',
              label: 'Read him from the doorway without asking',
              predicate: { atLocation: 'the_glasshouse', flagsSet: ['used:listen_in'] },
              setsFlags: ['found_the_locked_room', 'read_corin_unasked'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['found_the_locked_room'],
            abilities: ['reach_the_locked_room'],
            reputation: [],
          },
        },
        {
          id: 'open_the_door',
          playerCopy: 'Decide whether to open what the settling missed.',
          directorNotes:
            'Opening it with his consent gives him back the list and a little of himself, and makes him a witness the Registry will listen to. Forcing it works and is the same thing the Provost did. Leaving it shut is a real choice and a kind one. Whatever happens, going that deep teaches the player that a mind can be pushed as well as read.',
          enterWhen: { flagsSet: ['found_the_locked_room'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_it_with_him',
              label: 'Ask him, and open it together',
              predicate: {
                flagsSet: ['used:reach_the_locked_room'],
                minRelationship: [{ characterId: 'corin', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['corin_remembers', 'corin_consented'],
              closesFlags: ['forced_corin'],
            },
            {
              routeId: 'forced_it',
              label: 'Open it without asking',
              predicate: { flagsSet: ['used:reach_the_locked_room'] },
              setsFlags: ['corin_remembers', 'forced_corin'],
              closesFlags: ['corin_consented'],
            },
            {
              routeId: 'left_it_shut',
              label: 'Sit with him and leave the door alone',
              predicate: { atLocation: 'the_glasshouse', flagsSet: ['used:stay_with_them'] },
              setsFlags: ['left_corin_alone'],
              closesFlags: ['corin_remembers'],
            },
            {
              routeId: 'brought_sable',
              label: 'Bring Sable through the glasshouse door',
              predicate: { flagsSet: ['sable_trusts_you', 'spoke:corin'] },
              setsFlags: ['sable_saw_corin'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 130,
            items: [],
            flags: ['corin_answered'],
            abilities: ['send_a_thought'],
            reputation: [{ factionId: 'faction_registry', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_founders_night',
      title: 'Founders’ Night',
      summary: 'Saturday at nine, the Provost raises a glass in the Nova House parlour, and the newest resident pours.',
      kind: 'MAIN',
      involvedCharacterIds: ['sorrell', 'sable', 'haru', 'lena', 'ruth'],
      involvedLocationIds: ['the_parlour', 'the_hall', 'the_dome'],
      knownRewardCopy: 'Whatever is in that glass, and everything that follows from it.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'the_toast',
          playerCopy: 'Be in the parlour when the glass is poured, or make sure it never is.',
          directorNotes:
            'The world will let the plan work. A player who did nothing all week is handed the decanter at nine, and Sable has already been to the parlour. Stopping it can be quiet (the vial is gone, Sable stands down) or loud (the files, Corin’s memory, a hand knocking the glass away). Giving Sable up stops it too, and costs the house. No death is shown on the page.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sable_stood_down',
              label: 'Sable puts the vial down because you asked',
              predicate: {
                flagsSet: ['sable_trusts_you'],
                minRelationship: [{ characterId: 'sable', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['no_poison', 'sable_stood_down', 'frame_broken'],
              closesFlags: ['sorrell_poisoned'],
            },
            {
              routeId: 'kept_the_vial',
              label: 'Keep the vial in your own pocket all night',
              predicate: { hasItems: ['stillwater_vial'], flagsSet: ['founders_night_came'] },
              setsFlags: ['no_poison', 'frame_broken'],
              closesFlags: ['sorrell_poisoned'],
            },
            {
              routeId: 'exposed_him_with_corin',
              label: 'Bring Corin’s memory to the toast',
              predicate: { flagsSet: ['corin_remembers', 'spoke:sorrell'] },
              setsFlags: ['sorrell_exposed', 'no_poison', 'frame_broken'],
              closesFlags: ['sorrell_poisoned'],
            },
            {
              routeId: 'exposed_him_with_files',
              label: 'Lay the eleven folders on the parlour table',
              predicate: { atLocation: 'the_parlour', hasItems: ['withdrawal_files'] },
              setsFlags: ['sorrell_exposed', 'no_poison', 'frame_broken'],
              closesFlags: ['sorrell_poisoned'],
            },
            {
              routeId: 'knocked_it_away',
              label: 'Knock the glass out of his hand',
              predicate: { atLocation: 'the_parlour', flagsSet: ['used:hold_on', 'founders_night_came'] },
              setsFlags: ['no_poison', 'frame_broken', 'made_a_scene'],
              closesFlags: ['sorrell_poisoned'],
            },
            {
              routeId: 'handed_her_over',
              label: 'Tell the Provost who is planning it',
              predicate: { flagsSet: ['informed_on_the_house', 'knows_it_is_sable'] },
              setsFlags: ['sable_taken', 'no_poison'],
              closesFlags: ['sorrell_poisoned'],
            },
            {
              routeId: 'the_glass_went_round',
              label: 'Pour the toast',
              predicate: { atLocation: 'the_parlour', flagsSet: ['founders_night_came'] },
              setsFlags: ['sorrell_poisoned'],
              closesFlags: ['no_poison'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['founders_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_house', amount: 15 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_curfew',
      atWorldMinute: 22 * 60 + 30,
      locationId: 'the_landing',
      publicCopy: 'Ruth Calder walks the landing knocking twice on every door: lights out, walls up.',
      directorNotes:
        'She stops longest at Room Four. If the player opens the door she asks how they are finding it, in a voice that means she already knows, and tells them where the kitchen is if they cannot sleep.',
      setsFlags: ['first_curfew'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'ruth', toLocationId: 'the_landing' }],
    },
    {
      id: 'we_the_dome_light',
      atWorldMinute: 1440 + 60,
      locationId: 'the_dome',
      publicCopy: 'A torch moves inside the observatory dome on the roof, and stops when it reaches the telescope.',
      directorNotes:
        'Sable, checking the eyepiece case. It can be seen from the orchard or from the foot of the ladder. If the player goes up, she is there, calm, and asks what they heard at dinner in exact words.',
      setsFlags: ['dome_light_seen'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sable', toLocationId: 'the_dome' }],
    },
    {
      id: 'we_provost_summons',
      atWorldMinute: 1440 + 8 * 60,
      locationId: 'room_four',
      publicCopy: 'A cream envelope under the door of Room Four: the Provost would like ten minutes at eleven, in the tower, about how you are settling in.',
      directorNotes:
        'He means the phrase kindly and it is the worst phrase in the college. Anybody in the house who sees the envelope knows what it looks like. In the tower he is charming, asks about the form, and offers tea.',
      setsFlags: ['summoned_by_provost'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_ruth_counts',
      atWorldMinute: 2 * 1440 + 7 * 60,
      locationId: 'the_kitchen',
      publicCopy: 'Ruth Calder unlocks the medicine tin, counts one vial where there should be two, and locks it again without a word.',
      directorNotes:
        'She does not report it. For the rest of the week she watches Sable over every meal and makes her favourite soup twice, which is the nearest she can come to asking.',
      setsFlags: ['ruth_knows_its_missing'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_third_fire',
      atWorldMinute: 2 * 1440 + 14 * 60 + 20,
      locationId: 'attunement_rooms',
      publicCopy: 'The fire alarm in the Attunement Rooms goes off, and a training bench is burning from the inside.',
      directorNotes:
        'Haru’s third fire. Nobody is hurt; an instructor’s clipboard is not so lucky. It happens because his week has been bad and nobody steadied him. It goes straight to the tower.',
      setsFlags: ['haru_third_fire'],
      cancelledByFlags: ['haru_steadied', 'haru_left', 'haru_settled'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'haru', toLocationId: 'attunement_rooms' }],
    },
    {
      id: 'we_the_order',
      atWorldMinute: 3 * 1440 + 9 * 60,
      locationId: 'the_hall',
      publicCopy: 'A warden pins a typed notice to the inside of the Nova House front door: Haru Ezaki is to report to the infirmary on Sunday morning.',
      directorNotes:
        'Everybody in the house knows what the infirmary means on a Sunday. Haru reads it twice, laughs, and goes out to the orchard. Lena takes it down and pins it to her wall with the frames.',
      setsFlags: ['haru_order_signed'],
      cancelledByFlags: ['sorrell_exposed', 'haru_left'],
      requiresFlags: ['haru_third_fire'],
      movesCharacters: [],
    },
    {
      id: 'we_corin_at_the_gate',
      atWorldMinute: 3 * 1440 + 17 * 60 + 30,
      locationId: 'halloran_green',
      publicCopy: 'Corin Abbott stops at the Nova House gate on his way down to town, looks up at the dome, and cannot say why he stopped.',
      directorNotes:
        'Sable sees him from the roof and does not move. If the player is with him, he asks whether they live there, and whether the roof leaks, because he has a feeling it does.',
      setsFlags: ['corin_stopped_at_the_gate'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'corin', toLocationId: 'halloran_green' }],
    },
    {
      id: 'we_report_due',
      atWorldMinute: 4 * 1440 + 11 * 60,
      locationId: 'provost_tower',
      publicCopy: 'The Provost’s secretary rings the house: your first wellbeing report was due at eleven, and he is so looking forward to it.',
      directorNotes:
        'A gentle reminder that is also a measurement. If the form is still unanswered by evening, he comes down the hill himself, just to say hello, and the house goes very quiet.',
      setsFlags: ['report_overdue'],
      cancelledByFlags: ['form_answered'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_lena_draws_your_hands',
      atWorldMinute: 5 * 1440 + 3 * 60,
      locationId: 'lena_room',
      publicCopy: 'Lena Morrow wakes the landing at three in the morning, drawing the same frame again, and this time the hands on the decanter are yours.',
      directorNotes:
        'She is frightened and she will not say why out loud. The frame is the one she has drawn for weeks, with one change. Anybody who sees it now knows who is pouring, and still not whose ring is on the other hand.',
      setsFlags: ['lena_drew_your_hands'],
      cancelledByFlags: ['no_poison'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'lena', toLocationId: 'lena_room' }],
    },
    {
      id: 'we_founders_night',
      atWorldMinute: 6 * 1440 + 21 * 60,
      locationId: 'the_parlour',
      publicCopy: 'The Provost arrives at the Nova House parlour for the Founders’ toast, and Ruth hands the newest resident the decanter.',
      directorNotes:
        'Lanterns on the river, every house on the green lit up, the parlour fire laid but unlit. Sable is by the sideboard. If nothing has changed, the vial is already in the gold-rimmed glass on the tray, and the player is the one holding the decanter. Whatever happens next, nobody in the room will forget it.',
      setsFlags: ['founders_night_came'],
      cancelledByFlags: ['sorrell_exposed'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'sorrell', toLocationId: 'the_parlour' },
        { characterId: 'sable', toLocationId: 'the_parlour' },
        { characterId: 'lena', toLocationId: 'the_parlour' },
        { characterId: 'haru', toLocationId: 'the_parlour' },
        { characterId: 'ruth', toLocationId: 'the_parlour' },
      ],
    },
    {
      id: 'we_the_last_bus',
      atWorldMinute: 6 * 1440 + 22 * 60 + 40,
      locationId: 'lowbridge',
      publicCopy: 'The last bus out of Lowbridge pulls away from the stop by the bridge at twenty to eleven.',
      directorNotes:
        'Haru is on it with his bag, unless somebody gave him a reason not to be. He sits by the window. Lena drew that a long time ago.',
      setsFlags: ['haru_left'],
      cancelledByFlags: ['haru_stayed', 'haru_settled'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'haru', toLocationId: 'lowbridge' }],
    },
  ],
  promises: [
    {
      id: 'p_the_toast',
      kind: 'FINALE',
      label: 'Whether anybody drinks from that glass on Founders’ Night',
      seedHint: 'A decanter in the parlour, a gold-rimmed glass, and a house tradition about who pours.',
      payoffHint: 'Saturday at nine the Provost raises his glass, and whatever the player did this week is in it or is not.',
      weight: 1,
    },
    {
      id: 'p_whose_thought',
      kind: 'MYSTERY',
      label: 'Whose thought cut through at dinner',
      seedHint: 'A mind the player cannot hear at all, turning a glass at the end of the table.',
      payoffHint: 'Sable Quint’s wall slipped for one second, thinking about the Provost and the new telepath’s hands.',
      weight: 0.95,
    },
    {
      id: 'p_the_kind_man',
      kind: 'BOSS',
      label: 'What the kind man in the tower does with the students he worries about',
      seedHint: 'A form asking for a page a week on how everybody is sleeping, signed in fountain pen.',
      payoffHint: 'Eleven folders marked voluntary withdrawal, a twelfth with Haru’s name on it, and a gardener who does not remember the house.',
      weight: 0.85,
    },
    {
      id: 'p_the_house',
      kind: 'RELATIONSHIP',
      label: 'Whether four strangers become a household',
      seedHint: 'A chalkboard of house rules in four handwritings, with room underneath for a fifth.',
      payoffHint: 'Somebody adds a rule to the board in the new one’s handwriting, and nobody rubs it out.',
      weight: 0.8,
    },
    {
      id: 'p_what_a_mind_owes',
      kind: 'THEME',
      label: 'What it costs to read people who did not ask',
      seedHint: 'Haru asking the player not to read him, because it is loud in there and most of it is smoke.',
      payoffHint: 'Somebody opens their mind to the player on purpose, and it is worth more than everything taken without asking.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_words',
      name: 'You Hear Words',
      role: 'Clear thoughts, close range',
      summary: 'Minds reach you as sentences, as if somebody muttered right beside you. You are best at catching exactly what one person is thinking, and worst in a crowded room.',
      playstyle: ['Precise', 'Close range', 'Hates crowds'],
      blurb: 'It started on a bus: forty strangers, forty sentences, all at once. You got off four stops early and bought the biggest headphones in the shop.',
      attributeBonus: { arcana: 2, mind: 1 },
      skillProficiencies: { listening: 3, walls: 1, noticing: 1 },
      startingItems: [{ itemId: 'headphones', qty: 1 }],
      startingAbilities: ['listen_in', 'wall_up'],
      startingReputation: [],
    },
    {
      id: 'arch_weather',
      name: 'You Feel Weather',
      role: 'Moods and feelings, social',
      summary: 'You feel what a room feels: fear as cold, anger as heat, a lie as a drop in pressure. You are good with people and hard to fool, but you rarely get the exact words.',
      playstyle: ['Empathic', 'Reads the room', 'Hard to lie to'],
      blurb: 'Your gran always said you could tell when a storm was coming. At nineteen you started telling when people were.',
      attributeBonus: { presence: 2, arcana: 1 },
      skillProficiencies: { rapport: 3, noticing: 2, listening: 1 },
      startingItems: [],
      startingAbilities: ['listen_in', 'hear_the_room'],
      startingReputation: [{ factionId: 'faction_house', amount: 5 }],
    },
    {
      id: 'arch_pictures',
      name: 'You See Pictures',
      role: 'Memories and images, deep style',
      summary: 'Minds reach you as flashes of things people have seen. You can go under the surface into memory from the first night, which is how secrets get found and how people get hurt.',
      playstyle: ['Investigator', 'Goes deep', 'Risky'],
      blurb: 'The first one was your landlord’s memory of a dog he had forty years ago. You still know its name. He never told you.',
      attributeBonus: { arcana: 2, mind: 1 },
      skillProficiencies: { diving: 3, noticing: 1 },
      startingItems: [],
      startingAbilities: ['listen_in', 'go_under'],
      startingReputation: [],
    },
    {
      id: 'arch_both_ways',
      name: 'It Runs Both Ways',
      role: 'Two-way talk, sending and hearing',
      summary: 'Your telepathy runs both ways: you can put a thought into somebody else’s head. It is loud, it is rare, and the college keeps a close eye on anybody who can do it.',
      playstyle: ['Bold', 'Two-way', 'Draws attention'],
      blurb: 'You found out in a queue, when the woman in front of you turned round and asked why you had told her to hurry up.',
      attributeBonus: { arcana: 2, presence: 1 },
      skillProficiencies: { sending: 3, nerve: 1 },
      startingItems: [],
      startingAbilities: ['listen_in', 'send_a_thought'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What do your housemates call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Okafor' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'When other minds reach you, what do they feel like?',
      helpText:
        'How your telepathy works: what it catches best, and what you can do with it from the first night. Some telepaths can go under the surface into memory, and a few can send a thought as well as hear one. It is fixed for the whole story and cannot be changed later. It does not decide whose side you take, whether you keep the house rules, or what happens on Founders’ Night. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Where were you when it started?',
      helpText: 'Your telepathy surfaced late, after you turned nineteen. One plain sentence about the moment it began is plenty.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. On a night shift at a petrol station, when I heard a customer decide not to pay.',
    },
    {
      id: 'what_you_do_with_it',
      label: 'What do you usually do with what you hear?',
      helpText: 'A habit, not a promise. You can do the opposite at the first dinner and the house will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'keep_it', label: 'Keep it to myself and act normal' },
        { id: 'use_it', label: 'Use it, quietly, when it helps' },
        { id: 'say_it', label: 'Say it out loud and let people deal with it' },
        { id: 'shut_it_out', label: 'Wear headphones and try not to hear anything' },
        { id: 'ask_first', label: 'Ask before I read anybody, every time' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do they see across the dinner table?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A denim jacket two sizes too big, bitten nails, and headphones round my neck that I never take off.',
    },
  ],
  /**
   * Where this can end up.
   *
   * The Toast is reachable by doing nothing: a player who drifts through the
   * week is handed the decanter on Saturday, and the world lets the plan work.
   * Good Reports is the Provost's ending, and it is written as his kindness
   * rather than as villainy. The New One Left is walking away, and it is
   * offered early. Only The Locked Room needs the Corin lead.
   */
  endings: [
    {
      id: 'end_the_house_holds',
      name: 'The House Holds',
      rarity: 'COMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['founders_night_over', 'no_poison'],
        flagsUnset: ['sorrell_exposed', 'sable_taken'],
      },
      condition:
        'Nobody drank anything but cordial. The Provost walked back up the hill alive and none the wiser, and the house kept what it knows to itself. Nothing is fixed: the folders are still in the tower and Haru’s name is still on one. Play it as a house that has decided to look after itself, not as a victory.',
      epilogue:
        'A fifth rule goes up on the chalkboard by the coat hooks, in a fifth handwriting. Nobody explains it to visitors. The dome light is on most nights, and somebody is usually up there with Sable, at a little less than arm’s length.',
      hint: '',
    },
    {
      id: 'end_good_reports',
      name: 'Good Reports',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['informed_on_the_house', 'sable_taken'] },
      condition:
        'The player did what the form asked, and it worked exactly as the Provost said it would: nobody was hurt on Founders’ Night, because Sable was in the Quiet Wing before Saturday. Do not write it as villainy. Write the house afterwards, the empty chair, and how kind the Provost is about all of it.',
      epilogue:
        'Sable comes back in the spring. She is pleasant, and calm, and she sits wherever she is put. Ruth moves out at Easter. The Provost’s letters to the player are always warm, always handwritten, and always ask for a little more.',
      hint: '',
    },
    {
      id: 'end_the_toast',
      name: 'The Toast',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['sorrell_poisoned'] },
      condition:
        'The vial went into the glass and the Provost drank to the founders. It is the plan working, and nobody in the house is the same afterwards, whoever poured. Keep the death offstage or in a cut, with no detail. The story is what the house does in the hour after, and who they decide to tell.',
      epilogue:
        'The college calls it his heart, which is true. Sable walks up the hill to the wardens the next morning, as she always meant to, and the eleven folders are found in a drawer by the woman who clears his office. Nobody at Nova House pours a toast again.',
      hint: 'The newest resident pours.',
    },
    {
      id: 'end_the_wrong_name',
      name: 'The Wrong Name',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['accused_the_wrong_one', 'founders_night_over'] },
      condition:
        'The player named somebody, out loud, and it was the wrong somebody. Founders’ Night happened anyway, with the house divided and the real plan untouched by anything the player said. Write the cost of a telepath getting it wrong in front of people who knew they could read minds.',
      epilogue:
        'The person they accused forgives them, eventually, in the limited way people forgive a thing they will never forget. The chalkboard gets a new rule about evidence. It is in Ruth’s handwriting, and it is underlined twice.',
      hint: '',
    },
    {
      id: 'end_the_last_bus',
      name: 'The Last Bus',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['haru_left'] },
      condition:
        'Haru got on the 22:40 to the coast with his bag and his lighter, alone or with the player beside him. It can be an escape or an abandonment, depending on the week. The house is down one, and the college files his folder as a voluntary withdrawal, which for once is true.',
      epilogue:
        'He sends one postcard to the house, of a harbour, with nothing on the back but a drawing of a frying pan. His father’s restaurant reopens under a different name the following year. Nobody at Nova House can prove the two things are connected.',
      hint: '',
    },
    {
      id: 'end_the_new_one_left',
      name: 'The New One Left',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['founders_night_over'] },
      condition:
        'The player walked out of the college before Saturday, with whatever they had heard still in their head. It is a sane response to hearing a murder planned at your first dinner. Do not punish it. The story is what happens to the house without the one person who could hear it.',
      epilogue:
        'Room Four is empty again by Monday, which is starting to look like a pattern to Ruth. Lena turns to the next page of her sketchbook and, for the first time in her life, finds it blank.',
      hint: '',
    },
    {
      id: 'end_eleven_names',
      name: 'Eleven Names',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['sorrell_exposed', 'has_the_eleven'] },
      condition:
        'The withdrawal files left the tower and reached people the Provost cannot steer, and nobody had to die for it. Write the slow, bureaucratic, satisfying shape of an institution being made to look at itself: inspectors, statements, a closed wing, a man resigning politely.',
      epilogue:
        'The Registry closes the Quiet Wing in the spring. Eleven letters go out, each beginning with an apology somebody else wrote. Sorrell resigns with a statement that is true in every word. Ruth frames the twelfth folder, empty, and hangs it in the hall.',
      hint: 'There is a drawer in the tower that is locked when he is out.',
    },
    {
      id: 'end_four_rooms',
      name: 'Four Rooms',
      rarity: 'RARE',
      minTurn: 36,
      requires: {
        flagsSet: ['no_poison', 'haru_stayed', 'frame_broken'],
        flagsUnset: ['sable_taken'],
        minFactionReputation: [{ factionId: 'faction_house', value: 40 }],
      },
      condition:
        'Nobody drank it, Haru did not get on the bus, and Lena’s frame was wrong for the first time in her life. Four strangers became a household on purpose. Write it concretely, as a dinner with everybody at the table and nobody reading anybody, never as a speech about family.',
      epilogue:
        'The chalkboard runs out of space and Ruth buys a second one. Haru cooks on Sundays. Lena keeps one page of her sketchbook blank, on purpose, and shows it to visitors as her favourite. The initials on the key to Room Four change, carefully, by somebody who asked first.',
      hint: '',
    },
    {
      id: 'end_arms_length',
      name: 'Arm’s Length',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['sable_stood_down'],
        minRelationship: [{ characterId: 'sable', dimension: 'affection', value: 70 }],
      },
      condition:
        'Sable put the vial down because of the player, and the player is now the one person she lets inside her reach. For a telepath that is the only silence in the world. Keep it warm and quiet and no further than a kiss. Being with her means taking her at her word, and both of them know it.',
      epilogue:
        'Most evenings they are up in the dome, where the house is quiet in the player’s head and nobody can hear anybody. In the spring she takes Corin’s ring off her thumb and gives it back to him at the glasshouse. He does not remember it. He wears it anyway.',
      hint: '',
    },
    {
      id: 'end_behind',
      name: 'Behind',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['haru_stayed'],
        minRelationship: [{ characterId: 'haru', dimension: 'affection', value: 70 }],
      },
      condition:
        'Haru stayed, and the player is the person he does not check his hands around. Write it in the kitchen: warm, funny, and no further than a kiss. He asks before the player reads him, every time, and the player asks first, every time, and that is the whole of it.',
      epilogue:
        'He passes his third-year review with nothing on fire. The bus ticket ends up pinned to the chalkboard as a joke that is not entirely a joke. He teaches the player to make an omelette, badly, and will not let them say "behind" until they have earned it.',
      hint: '',
    },
    {
      id: 'end_a_blank_page',
      name: 'A Blank Page',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['frame_broken'],
        minRelationship: [{ characterId: 'lena', dimension: 'affection', value: 70 }],
      },
      condition:
        'Lena’s Founders’ Night frame was wrong, and the player is the reason. For somebody who has never once surprised the future, the player is the first thing she did not see coming. Keep it bright and a little giddy, and no further than a kiss.',
      epilogue:
        'She draws less. When she does draw the player she leaves the face unfinished on purpose, so the future has to fill it in. The café in town keeps two coffees aside for her every afternoon, and both of them get finished.',
      hint: '',
    },
    {
      id: 'end_the_locked_room',
      name: 'The Locked Room',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['sorrell_exposed', 'corin_remembers', 'corin_consented'] },
      condition:
        'Corin agreed to open the one room the settling missed, and the list in it brought the Provost down. This is the version where the evidence is a person, and he gets something of himself back. Write him remembering one thing that matters, never all of it.',
      epilogue:
        'Corin remembers the house, the roof, and a song, and not much of April. He does not get his ability back. He comes to dinner on Sundays and sits in the chair by the window, which Lena says she drew years ago and never understood.',
      hint: 'Somebody at the glasshouse keeps stopping at your gate.',
    },
  ],
  opening:
    "The woman ladling soup slides a bowl across to you. \"I’m Lena. House rule: nobody reads anybody at dinner. Deal?\"\n\nYou nod. You try.\n\nThe table’s thoughts leak in anyway, like a radio in the next room. Too much salt. Don’t stare at the new one. Heat ticking off the man across the table.\n\nThen one thought cuts clean through the rest.\n\n\"If the new one hears this, I’ll have to kill them too.\"\n\nYour spoon stops halfway. Nobody’s lips moved.\n\nThe man is tearing bread. The pale woman at the end turns her glass, perfectly silent inside. Lena tilts her head.\n\n\"Something wrong with the soup?\"",
  openingPanel: {
    assetKey: 'story_nova_house/opening',
    alt: 'Lena, dark curls under a knitted band, ladling soup at a long lamplit dinner table and smiling at you, while a man tears bread and a pale woman in a grey coat turns her glass.',
  },
  openingSuggestions: [
    "\"It’s great. Just a long day,\" I lie, and pick my spoon back up.",
    'I break the house rule and listen harder, one mind at a time.',
    "\"I heard that. Someone at this table just threatened me. Which one of you?\"",
  ],
  /**
   * The PixAI cover. Everybody is identified by costume, pose and place in the
   * frame, never by age (see the Ace note in infra/scripts/generate-art.ts), and
   * every light effect stays off faces.
   */
  coverDirection: [
    'SUBJECT: three housemates around one end of a long dinner table at night, large and close in the foreground of a key visual for a psychic mystery anime.',
    'They are staggered in depth, never standing in a line.',
    'Nearest, on the left and cropped at the waist by the frame: a woman with dark curls held back by a knitted band, a long oatmeal cardigan, charcoal smudges on her fingers and a sketchbook under one arm, leaning over the table with a soup ladle and smiling at the viewer.',
    'Just behind her right shoulder: a tall man with bleached hair and dark roots, a black T-shirt, sleeves shoved to the elbow, a tea towel over one shoulder and a burn-scarred left hand, tearing a piece of bread; a ribbon of flame curls up off the open brass lighter on the table beside him, far bigger than any lighter makes.',
    'At the far end of the table, smaller but in sharp focus: a pale woman with blunt black jaw-length hair in a long grey wool coat buttoned to the collar, a silver ring on her left thumb, turning a glass with two fingers, perfectly still, looking straight out at the viewer.',
    'Faint drifting lines of pale blue thought-light hang in the air between them, and one sharp bright line cuts across the table toward the viewer. Every light effect stays in the air, on the glass, the lighter and the title, never on faces or skin.',
    'FACES STAY CLEAN: no glow, sparks, lines or shadows across any face.',
    'BEHIND THEM, soft and secondary: a window onto night, and through it a narrow old house with a brass observatory dome lit from inside.',
    'LIGHT: warm amber lamplight on the table and faces, deep blue night behind, the thought-lines a cool pale blue.',
    'TITLE: the title Nova House painted into the art in the upper third, above the heads, as a clean elegant serif logo set in capitals, warm white with a faint four-point star glint on the O,',
    'spelled exactly NOVA HOUSE, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const NOVA_HOUSE = StoryVersion.parse(raw);
