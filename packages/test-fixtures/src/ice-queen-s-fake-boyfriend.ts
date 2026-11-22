import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Ice Queen's Fake Boyfriend" — a romance that starts with the relationship
 * and leaves the feeling for later.
 *
 * Bible: `docs/story-bibles/new50/24_ICE_QUEEN_S_FAKE_BOYFRIEND.md`. Slate #24
 * of the fifty-story plan, built to the Good Morning, Husband shape: one person
 * the whole story is arranged around, a small cast who each want something that
 * has nothing to do with the player, and an ending space where the plain losses
 * are as fully written as the kiss.
 *
 * Playable span: one university week, from twenty to one on Monday (the quad)
 * to midnight after the Chancellor's Gala on Saturday, when the deal expires.
 * Everything after that lives in the endings.
 *
 * The structural bet is fake dating played straight: on turn one the player
 * already has a partner, a secret, an audience and a deadline, and the only
 * thing missing is the feeling. Every public scene is a performance and every
 * private one is a risk. Under the performance is a person: the Ice Queen did
 * not pick the player at random, and she is allowed to call the whole thing
 * off before they do.
 *
 * The deal has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast, opening,
 * style examples, places, quest items, factions, quest summaries, world events
 * and the first twelve endings, and never the ability list except the chosen
 * archetype's starting abilities. So her four rules, the favour, the gala at
 * nine, the merger clause and why she picked the player are hard canon; the
 * deal, the invitation, the term sheet, the forum minutes and Mei's folder are
 * quest items.
 *
 * Three gated abilities, each granted by exactly one quest step and gated by a
 * flag (grant broadly, gate by flag): Call In the Favour once the terms are on
 * the table, Use What You Know once Darren's secret is, and Make the Case once
 * Professor Ito has taught the player how to argue the motion.
 *
 * Three invisible variables. Energy is the one honest GOOD_HIGH, because
 * `resolveRest` refills those and a student week genuinely runs out. Scrutiny
 * comes first among the descending pair on purpose: public violence raises the
 * first GOOD_LOW in array order, and a fight on the quad is on the gossip page
 * within the hour. Frost is Akane's guard; it thaws slowly with time, and
 * pushing her raises it.
 */

const raw = {
  id: 'sv_ice_queen_s_fake_boyfriend_1',
  storyId: 'story_ice_queen_s_fake_boyfriend',
  version: 1,
  title: 'Ice Queen’s Fake Boyfriend',
  fantasyLabel: 'Her fake boyfriend until Saturday night.',
  hook: 'The student council president grabs your arm in front of the man following her: "This is my boyfriend."',
  premise:
    'You are a second-year student at a big old city university, and until twenty to one this afternoon the student council president had never once looked at you.\n\n' +
    'Her name is Akane Hollis. The whole campus calls her the Ice Queen, because in three years nobody has seen her laugh, lose an argument or hold anybody’s hand.\n\n' +
    'Today she walked across the crowded quad, took your arm in front of thirty people and told the man following her that you are her boyfriend. He is Darren Cole, heir to the company her mother’s firm needs to merge with.\n\n' +
    'On Saturday night, at the Chancellor’s Gala, both families plan to take the stage and announce Akane and Darren as a couple. She never agreed to it, and a real boyfriend is the one refusal her mother cannot wave away.\n\n' +
    'So she is asking you to be one, in public, until midnight after the gala. Holding hands is the limit. She will owe you any favour you name.\n\n' +
    'To make it work you have to fool an heir who has known her all her life, a mother who misses nothing, and your own older sister, who edits the campus paper and can tell when you are lying. Or you can refuse, tell everyone the truth, or ask her the obvious question: out of four hundred people on that lawn, why did she walk straight at you?\n\n' +
    'She knows. She is not saying.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Comedy', 'Campus', 'Modern', 'Slice of life'],
  mechanicsChips: [
    'A fake relationship with rules',
    'Six days to the gala',
    'She can call it off',
    'Your sister runs the paper',
    'Why you? She knows',
  ],
  contentDescriptors: ['ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can sell the lie so well the whole campus believes it, blow it up on the first afternoon, or spend six days teaching the Ice Queen how to eat chips on a roof. She is not a prize. She has her own rules, her own deadline and her own reasons, and she is allowed to end it before you do.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'founders_quad',
    startWorldMinute: 12 * 60 + 40,
    startingItems: [{ itemId: 'your_phone', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is an adult, a second-year student at Fairholm University, twenty or older. Akane Hollis is twenty-one and in her third year; Darren Cole is twenty-four and a graduate student at the business school; Mei, the player’s older sister, is twenty-two and in her final year; Professor Ito is fifty-one; Evelyn Hollis is fifty. Offstage, Gideon Cole is sixty-one and Lena Ortiz, who runs the bakery on Mercer Street, is twenty-five.',
      'Fairholm University is a large old university in the middle of a city, built around a lawn called Founders’ Quad. The student council is eleven elected students who run the student union’s budget, the clubs and the twenty-four-hour library reading room. Its president is Akane Hollis, whom the whole campus calls the Ice Queen because in three years nobody has seen her laugh, lose an argument or hold anybody’s hand.',
      'The story starts at twenty to one on a Monday in late October. Akane walked across the crowded quad, took the arm of the player, to whom she had never spoken, and told Darren Cole that the player is her boyfriend. Thirty people heard it and one of them had a phone. The player has not agreed to anything yet.',
      'Evelyn Hollis, Akane’s mother, and Gideon Cole, Darren’s father, intend to take the stage at the Chancellor’s Gala, in the Great Hall this Saturday at nine in the evening, and announce Akane and Darren as a couple. The invitations already print their names together. Akane has never agreed to it. A real boyfriend, seen by everyone, is the one refusal her mother cannot wave away.',
      'Akane’s terms, written on a council memo pad before she asks: rule one, it ends at midnight after the gala with a friendly breakup in public; rule two, in public holding hands is the limit and nothing more happens unless both of them want it; rule three, nobody is told it is fake, not her mother, not Darren, not the player’s sister; rule four, if either of them starts to mean it, they say so, and the deal ends that night. In return she owes the player one favour of their choosing, anything within the power of the student council president.',
      'It was not random. Three weeks before the story starts, at the council’s open forum, the player was the only person who stood up and told Akane she was wrong to close the library reading room at midnight, and did not sit down when she stared. She changed the rule that night. She walked straight at the player on Monday because theirs was the one face she trusted not to flinch. She will say so only to somebody she trusts, and only if asked.',
      'Darren does not want to marry Akane. He has been seeing Lena Ortiz, the pastry chef at the bakery on Mercer Street, for a year, and his father does not know. He needs the match to collapse in a way that is not his fault, so he tests the fake relationship hard: if he can see through it, his father will. He tells this only to somebody he trusts.',
      'Hollis & Lane, the family firm Evelyn runs, will be insolvent by spring without a merger with the Cole Group, and three hundred people work for it. The merger term sheet, kept in the study at the Hollis townhouse, makes the gala announcement a condition on page nine. Evelyn has told nobody. Akane found it in the summer and has told nobody either.',
      'The Cole Foundation has offered the university a new library wing. On Thursday at five the student council votes on the part that touches students: the twenty-four-hour reading room becomes the Cole Room and closes at midnight. Ten councillors are split evenly and a tie goes to the president. Mei is investigating a side letter that ties the gift to "a family announcement".',
      'Mei edits the Fairholm Courier, the campus paper, which prints on Friday mornings at six. She has known the player all their life and can tell when they lie. She prints nothing she cannot prove and will not lie to her readers. She also edits "Hot Water", the paper’s warm, funny, anonymous advice column, and knows that Akane writes it. She has promised never to tell.',
      'Professor Ito teaches the rhetoric seminar the player and Akane share, and advises the student council. Twenty-eight years ago he and Evelyn, then Evelyn Lane, were together at this university for two years; she left him for the marriage that made Hollis & Lane. Neither of them has told Akane. On Tuesday he pairs the player and Akane for Friday’s debate.',
      'This is an ordinary modern campus. Nobody has powers. A fight on campus brings campus security within minutes, is on the anonymous gossip page within the hour, and becomes a council disciplinary matter, which Akane has to chair. Akane is not a prize and cannot be won: she can refuse, end the deal, or call it off in public. The player can refuse her, walk away or tell everyone the truth, and the story goes on.',
    ],
    toneGuide:
      'Romantic comedy with a clock in it. Banter first, then the thing under it. Every public scene is a performance with an audience watching for a crack, and every private scene is the two of them slowly failing to keep the performance up. Akane is formal and exact in public, drier and funnier in private, and the gap between those two is the romance. ' +
      'The romance is teasing, tense and heartfelt, and goes as far as a kiss and no further. No fan service: nobody is described lingeringly, and attraction is shown in what people notice and what they do with their hands. ' +
      'Nobody is a villain. Evelyn is protecting three hundred jobs, Darren is protecting the person he loves, Mei is protecting the truth and her sibling in an order she keeps changing. Lies, fights, refusals and walking off are all legitimate, and every one of them has a consequence somebody remembers by Friday. ' +
      'Keep it campus-specific and physical: the silver pin she straightens when nervous, the memo pad, the coffee cart, the roof door whose alarm does not work, two hundred invitations in a box nobody has posted. The face at the top of a beat is Akane’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Akane uncaps a pen and writes on a council memo pad without looking up.\n\n\"Rule one. This ends at midnight after the gala. Rule two. In public, you may hold my hand.\"\n\nShe pauses over the third line.\n\n\"Rule four. If either of us starts to mean it, we say so. And it ends that night.\"\n\n\"Why would that end it?\"\n\nShe signs, very neatly, and slides the pad across.\n\n\"Because then it would not be fake,\" she says. \"And I do not know how to do the other kind.\"",
      "Darren drops into the chair opposite and steals one of your chips.\n\n\"Quick round,\" he says. \"Her birthday.\"\n\nYou don’t know it.\n\n\"Her middle name. Her coffee.\"\n\n\"Black,\" you say. \"No sugar. She sends it back if it isn’t hot.\"\n\nHe stops chewing. Behind him, at the counter, Akane has gone very still.\n\n\"Huh,\" Darren says. \"Lucky guess, boyfriend?\"",
      "Mei is sitting on your bed when you get back, with two coffees and the photo already open on her phone.\n\n\"Explain,\" she says.\n\n\"It’s not what—\"\n\n\"You’re touching your ear.\"\n\nYou put your hand down.\n\nShe gives you a coffee, very kindly, the way she did the year you broke the kitchen window.\n\n\"Okay. Start with how much trouble you’re in. Finish with whether I’m allowed to print it.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 12, resolve: 11, arcana: 8 },
  skills: [
    { id: 'acting', name: 'Acting', attribute: 'presence', description: 'Making a lie look like the most natural thing in the world, with people watching.' },
    { id: 'banter', name: 'Banter', attribute: 'presence', description: 'Teasing somebody who is not used to being teased, and keeping it light while you work out what it is about.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing out loud while it can still change something.' },
    { id: 'attention', name: 'Attention', attribute: 'mind', description: 'Noticing what somebody does with their hands while they tell you something else.' },
    { id: 'argument', name: 'Argument', attribute: 'mind', description: 'Building a case out loud, in order, so a room follows it to the end.' },
    { id: 'improvise', name: 'Improvising', attribute: 'agility', description: 'Answering a question you were not ready for, fast, with a straight face.' },
    { id: 'legwork', name: 'Legwork', attribute: 'might', description: 'Crossing campus in four minutes, carrying gala chairs, being where you said you would be.' },
    { id: 'timing', name: 'Timing', attribute: 'arcana', description: 'Knowing the exact second to say the thing, or to say nothing at all.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is the only GOOD_HIGH, so resting restores the week and nothing
   * else, and the generic cost path spends the player's day rather than the
   * romance. Scrutiny is first among the descending pair because public
   * violence raises the first GOOD_LOW in array order. Frost is her guard: it
   * thaws slowly on its own, and asking her the hard question raises it.
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
        'The player is running on fumes in public, which is the worst place to do it: a pause too long before an answer, a name got wrong, a yawn at her mother’s table. Somebody notices, and this week somebody noticing is the whole danger.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing: a nine o’clock lecture, a shift, a fake date and four hours of sleep. Answers come out short and slightly wrong, jokes miss by a beat, and this is exactly the band where a performance in public slips. Going to bed is the correct move and the story should say so kindly.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a student week. Fine for one more scene and honest about not wanting two. Good for a quiet table in the reading room, bad for a dinner with somebody’s mother. Nobody needs to mention it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'The week is still ahead. There is room to be quick, to be funny under pressure, to walk her home the long way and still make the nine o’clock lecture. Scenes can run long and go somewhere.',
        },
      ],
    },
    {
      id: 'scrutiny',
      name: 'Scrutiny',
      max: 100,
      start: 30,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody doubts it any more. The campus has filed the two of them as a couple, which is its own problem, because the breakup clause now has an audience of twelve thousand.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody is looking closely. The two of them are one more couple on a crowded lawn, the gossip page has moved on to somebody else, and small slips cost nothing. This is the band where they can simply have lunch.',
        },
        {
          upTo: 50,
          behaviour:
            'The campus has noticed. People glance twice, phones come up when they hold hands, and Darren’s questions get more specific. A slip is remembered, and repeated to somebody else by evening.',
        },
        {
          upTo: 80,
          behaviour:
            'Stories are being checked against each other. Mei has heard two versions of how they met. The gossip page has a thread with a timeline in it. Every public scene needs a reason, and the private ones start to feel like the only real ones.',
        },
        {
          upTo: 100,
          behaviour:
            'One more crack and it comes apart in public. Somebody has screenshots, somebody has a source, and the council has received a formal question about the president’s conduct. Anything the player does in public now is a headline.',
        },
      ],
    },
    {
      id: 'frost',
      name: 'Frost',
      max: 100,
      start: 70,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nothing between them is performed any more, including the arguments. She tells the player things she has never said aloud, and is visibly alarmed at how easy it was.',
      color: '#B8D8E8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'She laughs out loud and does not look away afterwards. She uses the player’s first name without deciding to, finishes their sentences badly on purpose, and once, on the roof, dozes off against their shoulder in the middle of an argument about chips.',
        },
        {
          upTo: 55,
          behaviour:
            'Off duty in front of the player and nobody else. Dry jokes, real questions, a coffee bought without being asked. She still straightens the pin before every public scene, but in private she has stopped checking the door.',
        },
        {
          upTo: 80,
          behaviour:
            'Polite, exact and in control. She keeps to the rules to the letter, answers questions like minutes, and thanks the player for their time at the end of each scene as if adjourning a meeting. There are cracks, and she closes each one the moment she notices it.',
        },
        {
          upTo: 100,
          behaviour:
            'The full winter. Single words, a schedule sent by text, hand-holding with all the warmth of a handshake. She is not cruel; she has simply gone back behind the wall, and it would take something true and unperformed to bring her out.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'your_phone',
      name: 'Your Phone',
      tags: ['personal'],
      droppable: false,
      description: 'Cracked across one corner, eleven per cent battery, and a sister who has started typing to you three times since twenty to one.',
      loreText: 'The group chat for your floor has been renamed twice since lunch. Neither name is printable.',
      icon: 'phone',
    },
    {
      id: 'the_deal',
      name: 'The Deal',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Four rules on a council memo pad in Akane’s handwriting. One: it ends at midnight after the gala, with a friendly breakup in public. Two: in public, holding hands is the limit. Three: nobody is told. Four: if either of you starts to mean it, you say so, and it ends that night. Underneath, smaller: one favour, your choice. Her signature, and a space for yours.',
      loreText: 'She wrote it before she asked. The date of the gala is underlined twice, hard enough to go through to the next sheet.',
      icon: 'papers',
    },
    {
      id: 'gala_invitation',
      name: 'The Gala Invitation',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Cream card, gold edge: the Chancellor’s Gala, the Great Hall, Saturday at seven, black tie. Underneath, already printed, as if it had all been decided: Mr Darren Cole and Miss Akane Hollis.',
      loreText: 'There are two hundred of these in a box on the council office filing cabinet. Akane was supposed to post them a week ago. She has not posted one.',
      icon: 'letter',
    },
    {
      id: 'term_sheet',
      name: 'The Term Sheet',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Twelve pages of a merger between Hollis & Lane and the Cole Group. Page nine, clause four: completion is conditional on "the personal announcement at the Chancellor’s Gala".',
      loreText: 'The corner of page nine is soft from being read. Two people have read it many times, and only one of them knows about the other.',
      icon: 'papers',
    },
    {
      id: 'forum_minutes',
      name: 'The Forum Minutes',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Minutes of the council’s open forum three weeks ago. Item six, library hours: one student objected to the midnight closing and would not sit down. Your name is underlined once, in Akane’s pen. Beside it, in the margin: "Right."',
      loreText: 'Item six ends: "Motion withdrawn by the chair, 11.04 p.m." It is the only motion she has ever withdrawn.',
      icon: 'book',
    },
    {
      id: 'mei_folder',
      name: 'Mei’s Folder',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A red folder: the Cole Foundation’s library pledge, a photocopied side letter from the Cole Group with half a page blacked out, a sticky note in Mei’s writing that says "family announcement = ???", and a long-lens photo of Darren Cole outside a bakery at dawn, in an apron.',
      loreText: 'Her source is a temp in the Cole Group’s legal department who has not been paid for six weeks and would like everybody to know.',
      icon: 'papers',
    },
    {
      id: 'column_drafts',
      name: 'The Column Drafts',
      tags: ['document', 'personal'],
      skillModifiers: { attention: 1 },
      description:
        'Three handwritten drafts of the Courier’s anonymous advice column, "Hot Water", warm and funny and kind, in handwriting you have seen on a council memo pad. The third answers a letter nobody sent: "A stranger told me I was wrong in front of a hundred people, and I cannot stop thinking about it."',
      loreText: 'The answer to the third letter is crossed out four times. The last version says only: "Tell them."',
      icon: 'letter',
    },
    {
      id: 'boathouse_photo',
      name: 'The Boathouse Photograph',
      tags: ['personal'],
      description:
        'A small faded photograph of two students sitting on the boathouse steps, laughing at something outside the frame. One of them is a much younger Professor Ito. The other has Akane’s grey eyes.',
      loreText: 'On the back, in pencil: "E. and D., the last day of term." Twenty-eight years ago.',
      icon: 'photo',
    },
    {
      id: 'library_notice',
      name: 'The Library Notice',
      tags: ['document'],
      description:
        'A printed notice taped inside the reading room door: by decision of the student council president, the reading room is open twenty-four hours from tonight. Dated three weeks ago, 11.06 p.m.',
      loreText: 'Somebody has written "THANK YOU ICE QUEEN" underneath in marker, and somebody else has written "who are you and what have you done with her".',
      icon: 'papers',
    },
    {
      id: 'almond_croissant',
      name: 'An Almond Croissant',
      tags: ['food'],
      consumable: { resourceId: 'energy', amount: 10, consumesItem: true },
      description: 'Still warm, from the bakery on Mercer Street that opens at six. The best thing on the street, and the woman who bakes them knows it.',
      loreText: 'Darren Cole has eaten one of these every morning for a year and has never once paid for it.',
      icon: 'food',
    },
    {
      id: 'your_suit',
      name: 'Your Only Suit',
      tags: ['personal', 'clothing'],
      description: 'Bought for a funeral two years ago. Slightly short in the sleeve, slightly wide in the shoulder, and the only thing you own that a gala would let through the door.',
      loreText: 'There is a train ticket from the funeral still in the inside pocket.',
      icon: 'clothing',
    },
    {
      id: 'cart_notebook',
      name: 'The Order Notebook',
      tags: ['personal', 'document'],
      skillModifiers: { attention: 1 },
      description: 'A pocket notebook from the coffee cart with three hundred regulars’ orders in it. Under H: black, no sugar, sends it back if it is not hot. Under C: oat flat white, extra shot, tips in notes.',
      loreText: 'You started it to be fast. It turned into a map of who on campus is having a bad week.',
      icon: 'book',
    },
    {
      id: 'rehearsal_script',
      name: 'The Rehearsal Script',
      tags: ['personal', 'document'],
      skillModifiers: { acting: 1 },
      description: 'Your script from the drama society’s autumn play, lines highlighted, and in the margin of the love scene, in the director’s red pen: "Mean it."',
      loreText: 'You play the second lead. The second lead gets the girl in act two and loses her in act three, which you have been told is character growth.',
      icon: 'book',
    },
    {
      id: 'seminar_notes',
      name: 'Your Seminar Notes',
      tags: ['personal', 'document'],
      skillModifiers: { argument: 1 },
      description: 'Forty pages from Professor Ito’s rhetoric seminar, colour-coded, including two pages on Akane Hollis’s arguments, which are irritatingly good.',
      loreText: 'In the margin of week three you have written "she is wrong about this" and then, in a different pen, "she is not wrong about this".',
      icon: 'book',
    },
    {
      id: 'boathouse_key',
      name: 'The Boathouse Key',
      tags: ['key'],
      skillModifiers: { legwork: 1 },
      description: 'A brass key to the rowing club’s side door. It also opens the lake gate before dawn, when exactly one other person is ever on the path.',
      loreText: 'She runs it anticlockwise. You row past her at twenty to seven every morning, and neither of you has ever waved.',
      icon: 'key',
    },
  ],
  abilities: [
    {
      id: 'play_the_part',
      name: 'Play the Part',
      tags: ['social'],
      description: 'Act like her partner in front of people who are watching for a crack: the hand, the look, the private joke you invented thirty seconds ago.',
      affordances: ['play along', 'nod', 'hold her hand', 'act like her boyfriend', 'sell it', 'put my arm around her', 'act natural', 'pretend'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'scrutiny', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'acting', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'spin_a_story',
      name: 'Spin a Story',
      tags: ['social'],
      description: 'Make up the detail somebody just asked for, fast, and make it sound like a memory.',
      affordances: ['make something up', 'lie', 'invent a story', 'tell him how we met', 'improvise', 'cover for her', 'bluff'],
      costs: [
        { resourceId: 'energy', amount: 5 },
        { resourceId: 'scrutiny', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'improvise', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'come_clean',
      name: 'Come Clean',
      tags: ['social'],
      description: 'Tell somebody the true thing about the deal, or about yourself, and take whatever comes back.',
      affordances: ['tell the truth', 'confess', 'admit it is fake', 'come clean', 'be honest', 'say i have never met her', 'say i mean it'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out what somebody actually wants from what they do with their hands while they say something else.',
      affordances: ['watch', 'look around', 'study him', 'read her', 'notice', 'look closer', 'observe', 'look through the window'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'attention', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tease_her',
      name: 'Tease Her',
      tags: ['social'],
      description: 'Say the light, ridiculous thing to somebody who is not used to being teased, and see whether she laughs.',
      affordances: ['tease her', 'flirt', 'joke', 'make her laugh', 'banter', 'wink', 'ask her out'],
      costs: [{ resourceId: 'energy', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'banter', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_straight',
      name: 'Ask Her Straight',
      tags: ['social'],
      description: 'Put the question she has been steering around all week, and then be quiet until she answers it.',
      affordances: ['ask her why', 'ask why me', 'press her', 'push', 'ask what is really going on', 'ask about her mother', 'ask directly', 'add a rule'],
      costs: [
        { resourceId: 'energy', amount: 9 },
        { resourceId: 'frost', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_with_her',
      name: 'Stay',
      tags: ['social'],
      description: 'Do not perform, do not fix it, do not leave. Sit down next to her and be there.',
      affordances: ['stay', 'sit with her', 'say nothing', 'wait with her', 'just be there', 'keep her company'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_scene',
      name: 'Make a Scene',
      tags: ['social'],
      description: 'Do something loud and public on purpose: stand on a bench, raise your voice, make four hundred people look at once.',
      affordances: ['make a scene', 'shout', 'announce it', 'stand on the bench', 'cause a stir', 'go public', 'tell everyone'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'scrutiny', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'timing', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'do_the_legwork',
      name: 'Do the Legwork',
      tags: ['utility'],
      description: 'Run the errand, carry the chairs, be at the far side of campus in four minutes because you said you would be.',
      affordances: ['run', 'carry it', 'help set up', 'go and get it', 'fetch', 'deliver it', 'run across campus'],
      costs: [{ resourceId: 'energy', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'legwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_in_the_favour',
      name: 'Call In the Favour',
      tags: ['social'],
      description: 'Name the one favour the council president owes you under the deal, and hold her to it. She keeps her word; she will tell you if it is outside her power.',
      affordances: ['call in the favour', 'name my price', 'cash it in', 'use my favour', 'ask for my favour'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_terms'],
        lockedCopy: 'There is no favour to call in. Nobody has written anything down yet, and she does not owe you anything for standing still on a lawn.',
      },
    },
    {
      id: 'use_what_you_know',
      name: 'Use What You Know',
      tags: ['social'],
      description: 'Put somebody’s secret on the table where they can see it, and let them work out what you might do with it.',
      affordances: ['threaten to tell', 'use his secret', 'lean on him', 'mention the bakery', 'mention lena', 'hold it over him'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'scrutiny', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'timing', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:darren_lena'],
        lockedCopy: 'You do not have anything on him. You have a camel coat, a grin and a lot of questions, and none of that is leverage.',
      },
    },
    {
      id: 'make_the_case',
      name: 'Make the Case',
      tags: ['social'],
      description: 'Stand up in front of a room and argue something properly, in order, to the end: a motion, a council vote, a stage at a gala.',
      affordances: ['make the case', 'argue', 'give a speech', 'speak up', 'address the room', 'take the microphone', 'propose the motion'],
      costs: [
        { resourceId: 'energy', amount: 10 },
        { resourceId: 'scrutiny', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'mind', skillId: 'argument', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:how_to_argue'],
        lockedCopy: 'You can talk, but you cannot yet hold a room. You have not worked out what you would actually say, in what order, or why anybody should still be listening at the end.',
      },
    },
  ],
  locations: [
    {
      id: 'founders_quad',
      name: 'Founders’ Quad',
      shortName: 'The Quad',
      description:
        'A square of lawn the size of a football pitch, cut by four paths, with the student union on one side, the library on another, and four hundred people eating lunch on the benches in between. A coffee cart by the main path. Whatever happens on this lawn is on the gossip page within the hour.',
      artDirection:
        'Grand old university quad at lunchtime in autumn, gothic stone buildings on four sides, gold and red leaves, crowded benches, a coffee cart, crisp noon light. Busy, bright, slightly theatrical.',
      connections: [
        { to: 'student_union', travelMinutes: 2, label: 'Into the student union' },
        { to: 'the_library', travelMinutes: 3, label: 'Up the library steps' },
        { to: 'seminar_room', travelMinutes: 4, label: 'Across to Old Hall' },
        { to: 'linden_house', travelMinutes: 6, label: 'Back to your residence' },
        { to: 'the_boathouse', travelMinutes: 10, label: 'Down the hill to the lake' },
        { to: 'mercer_street', travelMinutes: 5, label: 'Out of the main gate' },
        { to: 'great_hall', travelMinutes: 3, lockedByFlag: 'gala_doors_open', label: 'Into the Great Hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'student_union',
      name: 'The Student Union',
      shortName: 'The Union',
      description:
        'Five floors of noise: a food court on the ground floor, club rooms above it, the council office on the top floor, and a basement where the campus paper is made. Every noticeboard has a gala poster on it. A fire door on the top landing says ALARMED, and is not.',
      artDirection:
        'Busy modern student union interior, food court below, glass stairwell, noticeboards layered with posters, a heavy fire door on a top landing. Warm, crowded, loud.',
      connections: [
        { to: 'founders_quad', travelMinutes: 2, label: 'Out onto the quad' },
        { to: 'council_office', travelMinutes: 2, label: 'Up to the top floor' },
        { to: 'courier_newsroom', travelMinutes: 1, label: 'Down to the basement' },
        { to: 'union_roof', travelMinutes: 2, lockedByFlag: 'shown_the_roof', label: 'Through the fire door to the roof' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'council_office',
      name: 'The Council Office',
      shortName: 'Council Office',
      description:
        'The top floor of the union: a long room with eleven desks, a whiteboard of budget lines, and one tidy desk by the window with a nameplate nobody else touches. The blinds are always half down. There is a box of gala invitations on the filing cabinet that nobody has posted.',
      artDirection:
        'Long student council office at golden hour, eleven desks, one immaculate desk by a half-blinded window, a whiteboard of figures, a cardboard box of cream invitations on a filing cabinet. Orderly, quiet, a little cold.',
      connections: [{ to: 'student_union', travelMinutes: 2, label: 'Back down the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [
        { itemId: 'gala_invitation', qty: 1, ownerId: 'akane', aka: ['invitation', 'the invitations', 'the box of invitations', 'the gala card'] },
        { itemId: 'forum_minutes', qty: 1, ownerId: 'akane', aka: ['minutes', 'the forum minutes', 'the meeting notes', 'the old minutes'] },
        { itemId: 'column_drafts', qty: 1, ownerId: 'akane', aka: ['drafts', 'the drafts', 'her drawer', 'the column drafts'] },
      ],
    },
    {
      id: 'union_roof',
      name: 'The Union Roof',
      shortName: 'The Roof',
      description:
        'A flat roof behind the fire door whose alarm has not worked since spring. Two plastic chairs, a dead plant in a paint tin, and the whole campus laid out below like a map. Akane comes up here at night when she wants nobody to need her.',
      artDirection:
        'Flat rooftop of a campus building at night, two mismatched plastic chairs, a dead plant in a tin, the lit quad and gothic rooftops below, city lights beyond, cold blue air. Private, quiet, a little romantic.',
      connections: [{ to: 'student_union', travelMinutes: 2, label: 'Back through the fire door' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'courier_newsroom',
      name: 'The Courier Newsroom',
      shortName: 'Newsroom',
      description:
        'A basement room under the union with no windows, six old computers, a sofa somebody clearly sleeps on, and a wall of front pages going back forty years. The Fairholm Courier goes to print from here every Thursday night.',
      artDirection:
        'Cramped windowless student newspaper office, old computers, a sagging sofa with a coat on it, a wall papered with framed front pages, coffee cups everywhere. Fluorescent, chaotic, beloved.',
      connections: [{ to: 'student_union', travelMinutes: 1, label: 'Up the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [
        { itemId: 'mei_folder', qty: 1, ownerId: 'mei', aka: ['folder', 'the red folder', 'her folder', 'her file'] },
      ],
    },
    {
      id: 'seminar_room',
      name: 'Old Hall, Room Twelve',
      shortName: 'Seminar Room',
      description:
        'A narrow seminar room in the oldest building on campus: one long table, fourteen chairs, a radiator that knocks, and Professor Ito’s office through the door at the back, full of books stacked sideways and an armchair with a coat over it.',
      artDirection:
        'Narrow old seminar room, long wooden table, fourteen chairs, tall window, a blackboard with a debate motion chalked on it, an open door to a cluttered professor’s office. Dusty light, scholarly, warm.',
      connections: [{ to: 'founders_quad', travelMinutes: 4, label: 'Back across the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'boathouse_photo', qty: 1, ownerId: 'ito', aka: ['photograph', 'the old photograph', 'the photo in his desk'] },
      ],
    },
    {
      id: 'the_library',
      name: 'The Library Reading Room',
      shortName: 'Library',
      description:
        'A vaulted reading room open all night since three weeks ago, when the council president reversed her own rule. Green lamps, long tables, a radiator that ticks. The back corner table is hers after six, and everybody knows to leave it empty.',
      artDirection:
        'Vaulted university reading room at night, rows of green-shaded lamps, long oak tables, tall dark windows, one corner table with a single lamp on. Hushed, golden, intimate.',
      connections: [{ to: 'founders_quad', travelMinutes: 3, label: 'Down the steps to the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'library_notice', qty: 1, ownerId: null, aka: ['notice', 'the sign on the door', 'the library notice'] },
      ],
    },
    {
      id: 'linden_house',
      name: 'Linden House, Room 318',
      shortName: 'Your Room',
      description:
        'Your room on the third floor of a loud residence: a bed, a desk, a window that does not shut properly, a kettle you are not allowed to have, and a door your sister has a key to for emergencies, which she defines broadly.',
      artDirection:
        'Small cluttered student bedroom at night, single bed, desk lamp, a window ajar, a kettle on a shelf, a suit hanging on the wardrobe door. Lived-in, warm, slightly messy.',
      connections: [{ to: 'founders_quad', travelMinutes: 6, label: 'Out to the quad' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'your_suit', qty: 1, ownerId: null, aka: ['suit', 'my suit', 'the suit'] },
      ],
    },
    {
      id: 'the_boathouse',
      name: 'The Boathouse',
      shortName: 'Boathouse',
      description:
        'A long wooden boathouse on the lake at the bottom of campus: the rowing club below, a terrace restaurant above where the business school eats on somebody else’s card. At half past six in the morning the lake path is empty except for one runner who never says good morning.',
      artDirection:
        'Wooden boathouse on a misty lake at dawn, racing shells on racks below, a terrace with string lights above, a lakeside path under autumn trees. Calm, cold, beautiful.',
      connections: [{ to: 'founders_quad', travelMinutes: 10, label: 'Back up the hill' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'mercer_street',
      name: 'Mercer Street',
      shortName: 'Mercer Street',
      description:
        'The strip outside the main gate: a ramen counter open until two, a stationer’s with a flat above it, the bus stop for the old town, and a bakery that opens at six and is run by a woman who knows Darren Cole’s order by heart.',
      artDirection:
        'Narrow city street outside university gates in the evening, a steamy ramen counter, a stationer’s shop with a lit window above, a bus stop, a small bakery with a warm window. Busy, cosy, city.',
      connections: [
        { to: 'founders_quad', travelMinutes: 5, label: 'Back through the main gate' },
        { to: 'hollis_townhouse', travelMinutes: 25, label: 'The bus to the old town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'almond_croissant', qty: 2, ownerId: null, aka: ['croissant', 'a pastry', 'something from the bakery'] },
      ],
    },
    {
      id: 'hollis_townhouse',
      name: 'The Hollis Townhouse',
      shortName: 'Townhouse',
      description:
        'A tall cream house on a quiet square in the old town: a dining table for fourteen set for three, a study with its door shut but not locked, and a portrait of Akane’s late father in the hall that she walks past without looking.',
      artDirection:
        'Elegant old townhouse dining room at night, a long table for fourteen with three places set, candlelight, a portrait in a gilt frame in the hall beyond, a closed study door. Rich, quiet, intimidating.',
      connections: [{ to: 'mercer_street', travelMinutes: 25, label: 'The bus back to campus' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'term_sheet', qty: 1, ownerId: 'evelyn', aka: ['term sheet', 'the merger papers', 'the contract', 'page nine'] },
      ],
    },
    {
      id: 'great_hall',
      name: 'The Great Hall',
      shortName: 'Great Hall',
      description:
        'The university’s oldest and grandest room, a hammer-beam roof and tall windows, used three times a year. On Saturday night it holds the Chancellor’s Gala: four hundred guests in black tie, a string quartet, and a small stage with two microphones where two families mean to make an announcement at nine.',
      artDirection:
        'Grand gothic hall at a black-tie gala, hammer-beam roof, candles and chandeliers, a string quartet, round tables, a small stage with two microphones. Glittering, formal, high stakes.',
      connections: [{ to: 'founders_quad', travelMinutes: 3, label: 'Out into the cold' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_council',
      name: 'The Student Council',
      description:
        'Eleven elected students who run the union’s budget, the clubs and the twenty-four-hour reading room from the top floor of the union. They respect their president and have never seen her laugh. A fight on campus is a council disciplinary matter, and she chairs it.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A face at the open forum' },
        { atReputation: 30, label: 'Known on the top floor' },
        { atReputation: 60, label: 'The president’s person' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_campus',
      name: 'The Quad',
      description:
        'Twelve thousand students, four hundred of them on the lawn at lunch, and an anonymous gossip page that posts whatever it is sent within the hour. It decides what is true by Friday.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Nobody in particular' },
        { atReputation: 25, label: 'Somebody people point at' },
        { atReputation: 55, label: 'Campus legend' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_hollis',
      name: 'The Hollis Family',
      description:
        'Evelyn Hollis, a townhouse in the old town, a portrait of a late husband in the hall, and Hollis & Lane, a hundred-year-old firm with three hundred employees and four months of money left.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A guest' },
        { atReputation: 30, label: 'Expected at dinner' },
        { atReputation: 60, label: 'Family' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_cole',
      name: 'The Cole Group',
      description:
        'Gideon Cole’s company, its foundation and its money: the library wing, the merger, and a son who is supposed to stand on a stage on Saturday and smile.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Unknown' },
        { atReputation: 25, label: 'Noticed' },
        { atReputation: 50, label: 'Owed a favour' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_courier',
      name: 'The Fairholm Courier',
      description:
        'The campus paper, made in a windowless basement by six people and edited by your sister. It prints every Friday at six and has never printed a correction it did not mean.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'A reader' },
        { atReputation: 30, label: 'A source' },
        { atReputation: 60, label: 'On the masthead' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'akane',
      name: 'Akane Hollis',
      role: 'Student council president, third year, the one the whole campus calls the Ice Queen',
      cardBlurb:
        'She grabbed your arm in front of thirty people and called you her boyfriend, she has six days to make everyone believe it, and she has not told you why she walked straight at you out of four hundred people.',
      pronouns: 'she/her',
      publicTraits: ['Composed to the point of frost', 'Exact about everything, including other people’s mistakes', 'Catastrophically bad at being liked, and aware of it'],
      hiddenDrives: [
        'She wants one person on her side who was not paid or told to be, and she has just offered to pay somebody, which she knows ruins it',
        'She wants to say no to her mother out loud, once, and is not sure she can do it without somebody standing next to her',
      ],
      values: [
        'Doing exactly what she said she would, to the minute',
        'Being right, and admitting it the very first time she is not',
      ],
      fears: [
        'Being seen to need anybody',
        'That the ice is not a mask, and there is nothing underneath it',
      ],
      socialStyle:
        'Speaks in decisions. Never raises her voice, never fills a silence, and touches people only when there is an audience, which makes the one time she does it without one impossible to miss.',
      boundaries: [
        'Will not be kissed for an audience. Hand-holding is the line, and she drew it herself',
        'Will not be pitied, and ends any conversation that starts with "are you okay"',
        'Will not let the player take the blame for her lie, even when that would be easier',
      ],
      goals: [
        'Get to midnight after the gala with the story intact',
        'Stand on that stage on Saturday and say no to the announcement herself',
      ],
      secrets: [
        {
          id: 'akane_why_you',
          fact: 'It was not random. Three weeks ago, at the open forum, the player was the only person who stood up and told her she was wrong to close the reading room at midnight, and did not sit down when she stared. She changed the rule that night. On Monday theirs was the one face on the quad she trusted not to flinch.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the roof, after the dinner at the townhouse, if the player asks her straight why them and has not lied to her once since Monday.',
        },
        {
          id: 'akane_page_nine',
          fact: 'She found the merger term sheet in her mother’s study in the summer and read page nine. She knows the announcement is a condition of saving the firm, and her mother does not know she knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the player has seen the term sheet themselves, or after she has heard her mother defend the match at dinner.',
        },
        {
          id: 'akane_hot_water',
          fact: 'She writes "Hot Water", the Courier’s warm, funny, anonymous advice column, at midnight on the roof. Mei edits it and is the only person who knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player mentions the column in front of both of them, Mei looks at Akane before she can stop herself.',
        },
      ],
      speechStyle:
        'Short, exact, formal sentences with no filler, as if reading minutes back to a meeting. Numbers her rules. Gets more polite when rattled, not less. When she is genuinely amused she says "That is not funny" and has to look away.',
      topics: ['the deal', 'the gala', 'Darren Cole', 'her mother', 'the council', 'the reading room', 'the advice column'],
      voiceSamples: [
        'You are about to help me. Nod when I squeeze. Name your price later.',
        'Rule two. In public you may hold my hand. Rule two does not cover looking at me like that.',
        'That is not funny. Stop it. That is still not funny.',
        'I was wrong about the library. I put it in writing at eleven at night, and I have never forgiven you for it.',
        'Do not apologise for my mother. She would not.',
      ],
      appearance:
        'An adult woman, tall and very straight-backed, long black hair cut blunt at the waist, cool grey eyes, a long white wool coat over a dark council blazer.',
      visualHook: 'A silver council pin worn exactly level on her lapel, which she straightens whenever she is nervous.',
      silhouette: 'A long white coat, arms folded, chin up, standing perfectly still in a moving crowd.',
      artSeed: 'iqfb-akane-01',
      portrait: null,
      expressions: ['neutral', 'cold', 'flustered', 'amused', 'hurt', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'mercer_street', activity: 'in her flat above the stationer’s, lights off at one, alarm at half past six' },
        { startMinute: 390, endMinute: 450, locationId: 'the_boathouse', activity: 'running the lake path alone, anticlockwise' },
        { startMinute: 450, endMinute: 720, locationId: 'council_office', activity: 'in the council office before anyone else, blinds half down' },
        { startMinute: 720, endMinute: 800, locationId: 'founders_quad', activity: 'crossing the quad at lunch, which is where Darren caught up with her' },
        { startMinute: 800, endMinute: 1080, locationId: 'council_office', activity: 'meetings, signatures, a queue at her door' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_library', activity: 'at the back corner table of the reading room' },
        { startMinute: 1260, endMinute: 1380, locationId: 'union_roof', activity: 'on the union roof, where nobody is supposed to be' },
        { startMinute: 1380, endMinute: 1440, locationId: 'mercer_street', activity: 'walking home the long way' },
      ],
      homeLocationId: 'mercer_street',
      knowledgeScope: ['akane', 'the_deal', 'the_gala', 'the_council', 'the_reading_room', 'darren', 'evelyn', 'the_merger', 'hot_water', 'the_forum'],
      startingRelationship: { trust: 25, affection: 15, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'akane_shows_the_roof',
          label: 'She lets you see her off duty',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'akane_tells_you_why',
          label: 'She tells you why she picked you',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['dinner_done'] },
        },
        {
          id: 'akane_means_it',
          label: 'She stops pretending to pretend',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 70 },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 16, presence: 15, resolve: 16, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'darren',
      name: 'Darren Cole',
      role: 'Heir to the Cole Group, business-school graduate student, the name printed next to hers',
      cardBlurb:
        'He has known her all her life, he does not believe a word of it, and he is going to spend the week finding out exactly how good a liar you are, for reasons he is keeping to himself.',
      pronouns: 'he/him',
      publicTraits: ['Effortlessly charming and knows it', 'Competitive about everything, including breakfast', 'Generous with money in a way that is slightly an insult'],
      hiddenDrives: [
        'He has been in love with a pastry chef on Mercer Street for a year and has not told his father, and he needs this match to collapse in a way that is not his fault',
      ],
      values: ['Winning cleanly', 'Loyalty to the people who knew him before the money did'],
      fears: ['His father finding out about Lena before he has a plan', 'Being exactly the man everyone already assumes he is'],
      socialStyle:
        'Asks friendly questions with a stopwatch running behind them. Laughs first, then checks your answer against the last one you gave.',
      boundaries: [
        'Will embarrass Akane, but will not hurt her on purpose, and thinks those are different things',
        'Will not let anyone threaten Lena, and becomes a colder, quieter person the moment somebody does',
      ],
      goals: ['Find out whether this lie can survive his father’s people', 'Get out of Saturday without being the one who said no'],
      secrets: [
        {
          id: 'darren_lena',
          fact: 'He has been seeing Lena Ortiz, the pastry chef at the bakery on Mercer Street, for a year, and is in an apron behind her counter most mornings before six. His father does not know. If the match collapses because Akane has a real partner, it is not his fault and his father cannot punish him for it, so he is testing the fake relationship because he needs it to hold.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Catch him at the bakery before seven, or earn enough trust that he says it himself, late, on the boathouse terrace.',
        },
      ],
      speechStyle:
        'Easy and fast, full of nicknames he hands out without asking. Every compliment has a question folded inside it. Calls the player "boyfriend" with audible quotation marks around it.',
      topics: ['how you met', 'the gala', 'his father', 'the twenty years he has known Akane', 'squash', 'the bakery'],
      voiceSamples: [
        'So how did you two meet? Take your time. I love a story.',
        'Quick round, boyfriend. Her birthday. Her middle name. Her coffee. Go.',
        'Twenty years I have known her, and nobody has ever held her hand on that lawn. You are either very lucky or very bad at this.',
        'Relax. I do not want to marry her either. I need your little lie to be better than it is.',
      ],
      appearance:
        'An adult man, broad-shouldered and tanned, wavy chestnut hair pushed back, an easy grin that stops just short of his eyes.',
      visualHook: 'A camel overcoat that costs more than a year’s rent, worn open with the collar up.',
      silhouette: 'Hands in his coat pockets, leaning on whatever is nearest, taking up twice his share of a doorway.',
      artSeed: 'iqfb-darren-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'sharp', 'caught out', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'mercer_street', activity: 'somewhere on Mercer Street; his father thinks he lives in the business school halls' },
        { startMinute: 330, endMinute: 450, locationId: 'mercer_street', activity: 'at the bakery before anybody he knows is awake' },
        { startMinute: 450, endMinute: 700, locationId: 'the_boathouse', activity: 'squash, then a long breakfast on the boathouse terrace' },
        { startMinute: 700, endMinute: 800, locationId: 'founders_quad', activity: 'following Akane across the quad' },
        { startMinute: 800, endMinute: 1260, locationId: 'the_boathouse', activity: 'holding court on the boathouse terrace' },
        { startMinute: 1260, endMinute: 1440, locationId: 'mercer_street', activity: 'gone home early, which nobody who knows him believes' },
      ],
      homeLocationId: 'mercer_street',
      knowledgeScope: ['darren', 'akane', 'the_gala', 'gideon_cole', 'the_cole_group', 'lena', 'the_bakery'],
      startingRelationship: { trust: 10, affection: 5, respect: 15, fear: 0, rivalry: 35 },
      gates: [
        {
          id: 'darren_levels_with_you',
          label: 'He stops testing and starts talking',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'darren_pact',
          label: 'He makes you a partner in it',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 40 },
        },
      ],
      attributes: { might: 14, agility: 13, mind: 13, presence: 15, resolve: 11, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'mei',
      name: 'Mei',
      role: 'Your older sister, final-year journalism student, and editor of the campus paper',
      cardBlurb:
        'She has known you your whole life and can tell when you are lying from across a room, she runs the campus paper, and the biggest story of her year just walked across the quad holding your arm.',
      pronouns: 'she/her',
      publicTraits: ['Loud, fast and impossible to embarrass', 'Ferociously protective of you, and only you', 'Will do anything for a story except make one up'],
      hiddenDrives: [
        'A city paper has offered her a summer place if she brings them one real investigation with her name on it, and the Cole gift is the only one she has',
      ],
      values: ['Printing what is true and checkable', 'Family first, then the story, and she is not always sure about the order'],
      fears: ['Being the reason her sibling gets hurt', 'Graduating as the editor who sat on the biggest story of her year'],
      socialStyle:
        'Arrives with two coffees and a recorder. Interrogates by teasing, and the teasing stops exactly when she has what she needs.',
      boundaries: [
        'Will not print anything she cannot prove, including about you',
        'Will not lie to her own readers, and says so up front rather than afterwards',
      ],
      goals: ['Find out what you have got yourself into', 'Run the Cole gift story in Friday’s edition'],
      secrets: [
        {
          id: 'mei_hot_water',
          fact: 'She edits the anonymous advice column "Hot Water", and the person who writes it is Akane Hollis. Mei has known for a year and has promised never to tell anyone.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will not tell. But if the player brings up the column with both of them in the room, Mei looks at Akane before she can stop herself.',
        },
        {
          id: 'mei_the_side_letter',
          fact: 'She has a folder on the Cole gift: a side letter from the Cole Group tying it to "a family announcement" at the gala, and a dawn photograph of Darren Cole outside a bakery in an apron, which she has not yet worked out the meaning of.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She opens the folder for the player once they have told her the truth about the deal.',
        },
      ],
      speechStyle:
        'Rapid-fire, questions stacked three deep, an old family nickname at the worst possible moment. Ends every argument with "Anyway" and a sip of coffee, whether or not she has won it.',
      topics: ['the photo', 'the Courier', 'the Cole gift', 'your parents', 'the advice column', 'whether you are okay'],
      voiceSamples: [
        'You. Her. The president. Hand in hand on the gossip page, four hundred comments. Explain. Use small words.',
        'I have watched you lie since you could talk. You touch your ear. You are touching your ear right now.',
        'I print it if it is true and not one word if it is not. So look at me and tell me which. Anyway.',
        'Somebody is paying for that library wing, and it is not with money. I just do not know with what yet.',
      ],
      appearance:
        'An adult woman, short and quick, a choppy black bob with one red streak, oversized glasses, a denim jacket covered in enamel pins.',
      visualHook: 'A press lanyard and a digital recorder clipped to her jacket, red light usually on.',
      silhouette: 'Leaning forward, recorder held out in one hand, two coffees balanced in the other.',
      artSeed: 'iqfb-mei-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'suspicious', 'worried', 'delighted'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'courier_newsroom', activity: 'on the newsroom sofa under her coat, again' },
        { startMinute: 450, endMinute: 720, locationId: 'courier_newsroom', activity: 'layout, coffee, and shouting at a printer' },
        { startMinute: 720, endMinute: 840, locationId: 'the_library', activity: 'chasing a source in the reading room' },
        { startMinute: 840, endMinute: 1080, locationId: 'courier_newsroom', activity: 'editing other people’s stories' },
        { startMinute: 1080, endMinute: 1200, locationId: 'mercer_street', activity: 'ramen at the counter, phone in one hand' },
        { startMinute: 1200, endMinute: 1440, locationId: 'courier_newsroom', activity: 'putting the paper to bed' },
      ],
      homeLocationId: 'courier_newsroom',
      knowledgeScope: ['mei', 'the_player_growing_up', 'the_courier', 'the_cole_gift', 'hot_water', 'the_gossip_page'],
      startingRelationship: { trust: 60, affection: 70, respect: 35, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'mei_opens_the_folder',
          label: 'She shows you what she has on the Cole gift',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['mei_knows'] },
        },
        {
          id: 'mei_holds_the_page',
          label: 'She keeps you off the front page',
          kind: 'ALLIANCE',
          requires: { trust: 70 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 15, presence: 14, resolve: 14, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ito',
      name: 'Professor Daisuke Ito',
      calledName: 'Professor Ito',
      role: 'Rhetoric professor and faculty adviser to the student council',
      cardBlurb:
        'He teaches the seminar you share with her, he knew it was fake the moment you walked in holding hands, and instead of saying so he has made the two of you debate partners.',
      pronouns: 'he/him',
      publicTraits: ['Dry as paper', 'Answers questions with better questions', 'Remembers every student’s best argument and their worst'],
      hiddenDrives: [
        'Twenty-eight years ago he was the one Evelyn Lane did not choose, and he would like her daughter to have the choice her mother gave up',
      ],
      values: ['A good argument made honestly', 'Letting people reach their own conclusions, slowly, even when it is painful to watch'],
      fears: ['Interfering, and being right to', 'Watching the same mistake happen twice in one family'],
      socialStyle:
        'Never says what he knows. Sets you a question, leaves the room, and is somehow back at exactly the moment you have answered it.',
      boundaries: [
        'Will not tell Akane about her mother’s past; that is Evelyn’s to tell',
        'Will not take sides in front of a class, and will not pretend to have no opinion either',
      ],
      goals: ['Get the two of them through Friday’s debate', 'Keep the council’s vote independent of the Cole money'],
      secrets: [
        {
          id: 'ito_evelyn',
          fact: 'He and Evelyn Hollis, then Evelyn Lane, were together for two years at this university. She left him for the marriage that made Hollis & Lane. He never married. A photograph of the two of them on the boathouse steps is in the drawer of his desk.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player asks him why he cares, after they have met her mother, he takes the photograph out and does not explain it.',
        },
      ],
      speechStyle:
        'Slow, dry, lecture-hall cadence. Frames everything as a motion and its counter-motion. Says "Interesting" when he means wrong and "Hm" when he means right.',
      topics: ['the debate motion', 'rhetoric', 'the council', 'the Cole gift', 'Evelyn Hollis', 'promises'],
      voiceSamples: [
        'The motion for Friday: a promise made for the wrong reasons still binds. You two will propose it. Together. Hm.',
        'Interesting. You hold her hand the way a man holds a train ticket he is afraid of losing.',
        'Twenty-four years of teaching. Nobody has ever fooled me with a romance. Several people have fooled themselves.',
        'I knew her mother, once, before she was anybody’s mother. That is all, and it is already too much.',
      ],
      appearance:
        'An older man, lean and slightly stooped, cropped grey hair, wire glasses, a tweed jacket that has seen a great many winters.',
      visualHook: 'A blue ink stain slowly spreading on his breast pocket that he has never once noticed.',
      silhouette: 'Hands clasped behind his back at a tall window, as if waiting for the class to answer.',
      artSeed: 'iqfb-ito-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'amused', 'sad'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'seminar_room', activity: 'asleep in the office armchair under his coat, as he is more nights than he admits' },
        { startMinute: 450, endMinute: 600, locationId: 'seminar_room', activity: 'in his office with the door open and the kettle on' },
        { startMinute: 600, endMinute: 720, locationId: 'seminar_room', activity: 'teaching the rhetoric seminar' },
        { startMinute: 720, endMinute: 900, locationId: 'seminar_room', activity: 'office hours that nobody comes to' },
        { startMinute: 900, endMinute: 1020, locationId: 'council_office', activity: 'advising the council, mostly by raising one eyebrow' },
        { startMinute: 1020, endMinute: 1140, locationId: 'the_boathouse', activity: 'walking the lake path, the same route every evening' },
        { startMinute: 1140, endMinute: 1440, locationId: 'seminar_room', activity: 'marking essays by one lamp with the radio on' },
      ],
      homeLocationId: 'seminar_room',
      knowledgeScope: ['ito', 'rhetoric', 'the_council', 'the_cole_gift', 'evelyn', 'the_boathouse_steps'],
      startingRelationship: { trust: 30, affection: 20, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ito_takes_out_the_photo',
          label: 'He shows you the photograph',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['dinner_done'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 13, resolve: 14, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'evelyn',
      name: 'Evelyn Hollis',
      role: 'Akane’s mother, chief executive of the family firm Hollis & Lane',
      cardBlurb:
        'She has asked to meet you at dinner on Wednesday, she will know within ten minutes what you are, and what she does about it depends on whether you can tell her something she does not already know.',
      pronouns: 'she/her',
      publicTraits: ['Immaculate', 'Never asks a question she does not know the answer to', 'Surprisingly funny, very occasionally, and then never again that evening'],
      hiddenDrives: [
        'Her firm will not survive the spring without the Cole merger and three hundred people work for it. She has decided her daughter can survive a marriage of convenience, because she did',
      ],
      values: ['Duty to the people who depend on you', 'Never being seen to struggle'],
      fears: ['Her daughter becoming exactly her', 'Her daughter finding out what she gave up, and why'],
      socialStyle:
        'Hosts like a chairwoman. Seats people where she wants them, serves the course she wants talked about, and ends conversations by standing up.',
      boundaries: [
        'Will not discuss the firm’s finances with anyone at her table',
        'Will not be lied to twice; the first lie she treats as manners',
      ],
      goals: ['Get the announcement made on Saturday at nine', 'Find out who this partner is and what they want'],
      secrets: [
        {
          id: 'evelyn_the_firm',
          fact: 'Hollis & Lane is four months from insolvency. The merger term sheet in her study makes the gala announcement a condition on page nine, a clause Gideon Cole insisted on. She has not told Akane and does not know Akane already knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The term sheet is in her study. Or she says it herself, if the player tells her the truth at her own table and does not flinch.',
        },
        {
          id: 'evelyn_ito',
          fact: 'She was with Daisuke Ito for two years at this university and left him for the Hollis marriage. She has not spoken to him in twenty-eight years and will see him at the gala.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If Professor Ito’s name comes up at dinner she puts her fork down, which she never does.',
        },
      ],
      speechStyle:
        'Low, unhurried, complete sentences with no contractions. Uses your full name. Gives compliments that are also assessments.',
      topics: ['her daughter', 'the firm', 'the gala', 'her late husband', 'Gideon Cole', 'what you want'],
      voiceSamples: [
        'Sit there. No, there. I like to see the people I am deciding about.',
        'You are the first person my daughter has ever brought to this table. I would like to know why, and you should know that I will find out.',
        'I married for a firm, and I had a good marriage. People forget that both can be true.',
        'You lied to me once tonight. That was manners. Do it again and it is policy.',
      ],
      appearance:
        'An older woman, slim and immaculate, silver-streaked black hair in a low chignon, her daughter’s grey eyes, a dark tailored dress.',
      visualHook: 'A single strand of pearls she turns once, slowly, when she has decided something.',
      silhouette: 'Seated at the head of a long table, perfectly upright, one hand flat on the cloth.',
      artSeed: 'iqfb-evelyn-01',
      portrait: null,
      expressions: ['neutral', 'cold', 'amused', 'calculating', 'tired'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'hollis_townhouse', activity: 'awake in the study, pretending to be asleep' },
        { startMinute: 420, endMinute: 480, locationId: 'hollis_townhouse', activity: 'breakfast standing up, reading three newspapers' },
        { startMinute: 480, endMinute: 1080, locationId: 'hollis_townhouse', activity: 'in the study with the door shut, on the phone to the bank' },
        { startMinute: 1080, endMinute: 1320, locationId: 'hollis_townhouse', activity: 'dinner at the head of a table for fourteen' },
        { startMinute: 1320, endMinute: 1440, locationId: 'hollis_townhouse', activity: 'back in the study with the door shut' },
      ],
      homeLocationId: 'hollis_townhouse',
      knowledgeScope: ['evelyn', 'the_firm', 'the_merger', 'the_gala', 'gideon_cole', 'ito', 'akane'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'evelyn_levels_with_you',
          label: 'She tells you what the announcement is really for',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['told_evelyn'] },
        },
        {
          id: 'evelyn_reconsiders',
          label: 'She considers calling it off',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 50 },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 17, presence: 17, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_this_is_my_boyfriend',
      title: 'This Is My Boyfriend',
      summary: 'The student council president has told the man following her that you are her boyfriend, in front of thirty people, and squeezed your arm. You have not agreed to anything yet.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['akane', 'darren'],
      involvedLocationIds: ['founders_quad', 'student_union'],
      knownRewardCopy: 'Her terms, in writing, and one favour of your choosing.',
      steps: [
        {
          id: 'the_quad',
          playerCopy: 'Answer Darren. He asked how the two of you met, and the whole lawn is listening.',
          directorNotes:
            'Monday, twenty to one, on the quad. Every route is a real answer and none of them is wrong. Darren is friendly and fast and is genuinely checking, so a good invention lands and a vague one gets a follow-up. Akane does not let go of the player’s arm and does not help: she has bet everything on not flinching, and she does not know what the player will say either. Whatever happens, Darren leaves with a line about the gala, Saturday at seven, and whether the boyfriend owns a suit.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'played_along',
              label: 'Squeeze back and act like you have done this for months',
              predicate: { flagsSet: ['used:play_the_part'] },
              setsFlags: ['backed_her_up'],
              closesFlags: [],
            },
            {
              routeId: 'spun_a_story',
              label: 'Invent how you met, with details',
              predicate: { flagsSet: ['used:spin_a_story'] },
              setsFlags: ['backed_her_up', 'cover_story'],
              closesFlags: [],
            },
            {
              routeId: 'told_darren',
              label: 'Tell him you have never met her before',
              predicate: { flagsSet: ['used:come_clean'] },
              setsFlags: ['told_darren'],
              closesFlags: ['backed_her_up'],
            },
            {
              routeId: 'watched_first',
              label: 'Say as little as possible and watch the two of them',
              predicate: { flagsSet: ['used:read_the_room'] },
              setsFlags: ['watched_first'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:the_offer'], abilities: [], reputation: [] },
        },
        {
          id: 'the_terms',
          playerCopy: 'Hear what she wants from you, and decide whether to sign it.',
          directorNotes:
            'Monday afternoon, somewhere private: the council office, a stairwell, a bench at the far end of the lake path. She has written four rules on a council memo pad and offers one favour in exchange. She explains the gala in as few words as she can and does not explain why the player. If the player told Darren the truth on the quad she is cold and polite and asks anyway, because she has no second plan. Refusing is a full answer and she accepts it with a nod, which costs her more than it shows.',
          enterWhen: { flagsSet: ['knows:the_offer'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_her_terms',
              label: 'Sign her four rules as written',
              predicate: { flagsSet: ['backed_her_up', 'spoke:akane'] },
              setsFlags: ['deal_struck'],
              closesFlags: [],
            },
            {
              routeId: 'signed_after_all',
              label: 'Sign, after telling Darren the truth on the quad',
              predicate: { flagsSet: ['told_darren', 'spoke:akane'], minRelationship: [{ characterId: 'akane', dimension: 'trust', value: 30 }] },
              setsFlags: ['deal_struck', 'started_badly'],
              closesFlags: [],
            },
            {
              routeId: 'signed_after_watching',
              label: 'Sign, once you have seen what she is up against',
              predicate: { flagsSet: ['watched_first', 'spoke:akane'] },
              setsFlags: ['deal_struck'],
              closesFlags: [],
            },
            {
              routeId: 'wrote_your_own_rule',
              label: 'Add a fifth rule of your own before you sign',
              predicate: { flagsSet: ['used:ask_straight'] },
              setsFlags: ['deal_struck', 'your_rule'],
              closesFlags: [],
            },
            {
              routeId: 'asked_for_real',
              label: 'Refuse to fake it, and ask her out properly instead',
              predicate: {
                flagsSet: ['used:tease_her', 'spoke:akane'],
                minRelationship: [{ characterId: 'akane', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['asked_for_real'],
              closesFlags: ['deal_struck'],
            },
            {
              routeId: 'turned_her_down',
              label: 'Tell her no',
              predicate: { flagsSet: ['used:come_clean', 'spoke:akane'], flagsUnset: ['told_darren'] },
              setsFlags: ['refused_the_deal'],
              closesFlags: ['deal_struck'],
            },
          ],
          rewards: {
            xp: 60,
            items: [{ itemId: 'the_deal', qty: 1 }],
            flags: ['knows:the_terms'],
            abilities: ['call_in_the_favour'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_camel_coat',
      title: 'The Man in the Camel Coat',
      summary: 'Darren Cole has known her all her life and does not believe a word of it. He is going to test the two of you all week, and he seems oddly keen for you to pass.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows:the_offer'] },
      involvedCharacterIds: ['darren', 'akane'],
      involvedLocationIds: ['the_boathouse', 'mercer_street'],
      knownRewardCopy: 'Whatever Darren actually wants, and what you do once you know.',
      steps: [
        {
          id: 'darren_tests_you',
          playerCopy: 'Get through Darren’s questions without the story coming apart.',
          directorNotes:
            'Darren tests on Monday evening and all of Tuesday: a lunch where he quizzes the player on her birthday and her coffee, a dinner for three on the boathouse terrace on Tuesday night. He is charming, quick and specific. He is not cruel and he never involves Akane’s mother. A player who throws a punch gets campus security, the gossip page and a disciplinary hearing chaired by Akane, and Darren does not hit back.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'held_up',
              label: 'Answer every question with a detail he cannot check',
              predicate: { flagsSet: ['used:spin_a_story', 'spoke:darren'] },
              setsFlags: ['passed_darrens_test'],
              closesFlags: [],
            },
            {
              routeId: 'played_it_cool',
              label: 'Let her hand in yours do the answering',
              predicate: { flagsSet: ['used:play_the_part', 'spoke:darren'] },
              setsFlags: ['passed_darrens_test'],
              closesFlags: [],
            },
            {
              routeId: 'turned_it_round',
              label: 'Ask him why he cares so much',
              predicate: { flagsSet: ['used:read_the_room', 'spoke:darren'] },
              setsFlags: ['passed_darrens_test', 'questioned_darren'],
              closesFlags: [],
            },
            {
              routeId: 'he_saw_through_it',
              label: 'Let him see the truth',
              predicate: { flagsSet: ['told_darren', 'spoke:darren'] },
              setsFlags: ['darren_saw_through_it'],
              closesFlags: ['passed_darrens_test'],
            },
            {
              routeId: 'took_a_swing',
              label: 'Hit him',
              predicate: { flagsSet: ['attacked:darren'] },
              setsFlags: ['fought_darren'],
              closesFlags: ['passed_darrens_test'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['darren_tested'], abilities: [], reputation: [] },
        },
        {
          id: 'what_darren_wants',
          playerCopy: 'Find out why Darren needs this lie to hold.',
          directorNotes:
            'The answer is a woman called Lena Ortiz and the bakery on Mercer Street, where Darren is behind the counter in an apron most mornings before six. He tells somebody he trusts, late, on the boathouse terrace. A player at the bakery at dawn simply sees him through the window, and Mei has a long-lens photo she has not understood yet.',
          enterWhen: { flagsSet: ['darren_tested'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Earn enough of his trust that he tells you himself',
              predicate: { flagsSet: ['spoke:darren'], minRelationship: [{ characterId: 'darren', dimension: 'trust', value: 45 }] },
              setsFlags: ['darren_confided'],
              closesFlags: [],
            },
            {
              routeId: 'caught_at_the_bakery',
              label: 'Be on Mercer Street at six in the morning',
              predicate: { flagsSet: ['saw_the_bakery', 'spoke:darren'] },
              setsFlags: ['caught_darren'],
              closesFlags: [],
            },
            {
              routeId: 'watched_the_bakery',
              label: 'Watch the bakery window long enough',
              predicate: { atLocation: 'mercer_street', flagsSet: ['used:read_the_room'] },
              setsFlags: ['caught_darren'],
              closesFlags: [],
            },
            {
              routeId: 'mei_had_it',
              label: 'Get the photo out of your sister’s folder',
              predicate: { hasItems: ['mei_folder'] },
              setsFlags: ['seen_mei_photo'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['knows:darren_lena'], abilities: ['use_what_you_know'], reputation: [] },
        },
        {
          id: 'ally_or_rival',
          playerCopy: 'Decide what to do with what you know about him.',
          directorNotes:
            'He knows the player knows, and he goes very quiet. A pact makes him the most useful person in the building on Saturday. Leaning on him works and he never forgives it. Keeping his secret for nothing surprises him more than either.',
          enterWhen: { flagsSet: ['knows:darren_lena'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_a_pact',
              label: 'Make him a partner: two people who both need Saturday to fail',
              predicate: { minRelationship: [{ characterId: 'darren', dimension: 'trust', value: 55 }] },
              setsFlags: ['darren_ally'],
              closesFlags: [],
            },
            {
              routeId: 'used_it',
              label: 'Use it to make him back off',
              predicate: { flagsSet: ['used:use_what_you_know'] },
              setsFlags: ['darren_cornered'],
              closesFlags: ['darren_ally'],
            },
            {
              routeId: 'kept_it_quiet',
              label: 'Tell him it is safe with you, and mean it',
              predicate: { flagsSet: ['spoke:darren'], minRelationship: [{ characterId: 'darren', dimension: 'respect', value: 40 }] },
              setsFlags: ['kept_darrens_secret'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['darren_settled'], abilities: [], reputation: [{ factionId: 'faction_cole', amount: 5 }] },
        },
      ],
    },
    {
      id: 'q_dinner_at_the_townhouse',
      title: 'Dinner at the Townhouse',
      summary: 'Akane’s mother has invited you to dinner on Wednesday. She runs a hundred-year-old firm and is said to know what a person is within ten minutes.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['dinner_invitation'] },
      involvedCharacterIds: ['evelyn', 'akane'],
      involvedLocationIds: ['hollis_townhouse', 'mercer_street'],
      knownRewardCopy: 'Evelyn Hollis’s opinion of you, which she will not change twice.',
      steps: [
        {
          id: 'the_dinner',
          playerCopy: 'Get through dinner with Evelyn Hollis.',
          directorNotes:
            'Wednesday, half past seven, three places at a table for fourteen. Evelyn seats everybody, asks exact questions and listens to the answers. The first lie she treats as manners. The study door is shut and not locked, and Akane goes very still if the player looks at it. If the player tells the truth at the table and does not flinch, Evelyn puts her fork down, which she never does.',
          enterWhen: { flagsSet: ['dinner_invitation'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'charmed_her',
              label: 'Win her over as the perfect partner',
              predicate: { atLocation: 'hollis_townhouse', flagsSet: ['used:play_the_part'] },
              setsFlags: ['passed_dinner'],
              closesFlags: [],
            },
            {
              routeId: 'told_her',
              label: 'Tell her the truth at her own table',
              predicate: { atLocation: 'hollis_townhouse', flagsSet: ['used:come_clean'] },
              setsFlags: ['told_evelyn'],
              closesFlags: ['passed_dinner'],
            },
            {
              routeId: 'read_the_study',
              label: 'Find out what is in the study',
              predicate: { hasItems: ['term_sheet'] },
              setsFlags: ['knows:the_merger', 'searched_the_study'],
              closesFlags: [],
            },
            {
              routeId: 'argued_with_her',
              label: 'Ask her straight why her daughter has to marry Darren',
              predicate: { atLocation: 'hollis_townhouse', flagsSet: ['used:ask_straight'] },
              setsFlags: ['argued_with_evelyn'],
              closesFlags: [],
            },
            {
              routeId: 'stood_her_up',
              label: 'Do not go',
              predicate: { flagsSet: ['dinner_night'], afterWorldMinute: 3 * 1440 },
              setsFlags: ['missed_dinner'],
              closesFlags: ['passed_dinner'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['dinner_done'], abilities: [], reputation: [{ factionId: 'faction_hollis', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_front_page',
      title: 'Front Page, Friday',
      summary: 'Your sister edits the campus paper, has seen the photo, and can tell when you are lying. The paper prints on Friday at six.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['went_public'] },
      involvedCharacterIds: ['mei'],
      involvedLocationIds: ['courier_newsroom', 'linden_house'],
      knownRewardCopy: 'Whatever is on Friday’s front page, and whether your name is in it.',
      steps: [
        {
          id: 'mei_corners_you',
          playerCopy: 'Deal with your sister.',
          directorNotes:
            'Mei is on the player’s bed on Monday evening with two coffees and the photo open on her phone. She is delighted, suspicious and worried in that order. She can tell a lie from the player instantly and says so; she does not always say so out loud.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'lied_to_mei',
              label: 'Lie to her',
              predicate: { flagsSet: ['spoke:mei', 'used:spin_a_story'] },
              setsFlags: ['lied_to_mei'],
              closesFlags: [],
            },
            {
              routeId: 'sold_it_to_mei',
              label: 'Hold Akane’s hand in front of her and sell it',
              predicate: { flagsSet: ['spoke:mei', 'used:play_the_part'] },
              setsFlags: ['lied_to_mei'],
              closesFlags: [],
            },
            {
              routeId: 'told_mei',
              label: 'Tell her everything',
              predicate: { flagsSet: ['spoke:mei', 'used:come_clean'] },
              setsFlags: ['mei_knows'],
              closesFlags: ['lied_to_mei'],
            },
            {
              routeId: 'mei_slipped',
              label: 'Notice what she looks at when the column comes up',
              predicate: {
                flagsSet: ['spoke:mei', 'used:read_the_room'],
                minRelationship: [{ characterId: 'mei', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['knows:the_column'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 30, items: [], flags: ['mei_dealt_with'], abilities: [], reputation: [] },
        },
        {
          id: 'what_mei_prints',
          playerCopy: 'Find out what is on the front page on Friday.',
          directorNotes:
            'Mei goes to print on Thursday night. She will hold a true story about her sibling if asked properly and trusted. She will run the Cole gift if somebody gives her the clause that proves it. If the player lied to her and Darren already saw through it, she runs what she can prove, and she is miserable about it.',
          enterWhen: { flagsSet: ['mei_dealt_with'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'mei_ran_the_gift',
              label: 'Give her page nine',
              predicate: { flagsSet: ['mei_knows', 'knows:the_merger'] },
              setsFlags: ['mei_ran_the_gift'],
              closesFlags: [],
            },
            {
              routeId: 'mei_held_it',
              label: 'Ask her to keep you out of it',
              predicate: { flagsSet: ['mei_knows'], minRelationship: [{ characterId: 'mei', dimension: 'trust', value: 65 }] },
              setsFlags: ['mei_held_it'],
              closesFlags: [],
            },
            {
              routeId: 'mei_ran_everything',
              label: 'Let her find it out for herself',
              predicate: { flagsSet: ['darren_saw_through_it', 'lied_to_mei'] },
              setsFlags: ['exposed'],
              closesFlags: [],
            },
            {
              routeId: 'the_paper_came_out',
              label: 'Wait for Friday and read it with everybody else',
              predicate: { flagsSet: ['courier_out'] },
              setsFlags: ['courier_quiet'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['front_page_settled'], abilities: [], reputation: [{ factionId: 'faction_courier', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_the_motion',
      title: 'The Motion',
      summary: 'Professor Ito has paired you with Akane for Friday’s debate. The motion: a promise made for the wrong reasons still binds.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['debate_partners'] },
      involvedCharacterIds: ['ito', 'akane'],
      involvedLocationIds: ['seminar_room', 'the_library'],
      knownRewardCopy: 'The ability to stand up in front of a room and hold it.',
      steps: [
        {
          id: 'prepare_the_case',
          playerCopy: 'Work out what you would actually say on Friday.',
          directorNotes:
            'Akane prepares like a general and argues with every sentence the player writes, which is how the two of them end up in the reading room at one in the morning. Ito offers office hours nobody comes to. However the player prepares, they come out of it able to make a case in order, which matters at the council vote and at the gala.',
          enterWhen: { flagsSet: ['debate_partners'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'practised_in_the_library',
              label: 'Practise with her in the reading room',
              predicate: { atLocation: 'the_library', flagsSet: ['spoke:akane', 'debate_partners'] },
              setsFlags: ['practised_together'],
              closesFlags: [],
            },
            {
              routeId: 'asked_ito',
              label: 'Go to the professor’s office hours',
              predicate: { flagsSet: ['spoke:ito'], minRelationship: [{ characterId: 'ito', dimension: 'respect', value: 30 }] },
              setsFlags: ['coached_by_ito'],
              closesFlags: [],
            },
            {
              routeId: 'wrote_it_alone',
              label: 'Write it alone in your room',
              predicate: { atLocation: 'linden_house', flagsSet: ['debate_partners'], afterWorldMinute: 2 * 1440 },
              setsFlags: ['wrote_it_alone'],
              closesFlags: [],
            },
            {
              routeId: 'ran_out_of_time',
              label: 'Turn up on Friday and improvise',
              predicate: { flagsSet: ['debate_day'] },
              setsFlags: ['unprepared'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:how_to_argue'], abilities: ['make_the_case'], reputation: [] },
        },
        {
          id: 'the_debate',
          playerCopy: 'Argue the motion, with sixty people watching.',
          directorNotes:
            'Friday at two, sixty people in a room for fourteen, because everybody has seen the photo. Akane is brilliant and nervous and argues straight at the player. Whatever the player says about promises, the room hears it as being about the two of them.',
          enterWhen: { flagsSet: ['debate_day'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_it_together',
              label: 'Win it with her',
              predicate: { atLocation: 'seminar_room', flagsSet: ['used:make_the_case', 'spoke:akane'] },
              setsFlags: ['won_the_debate'],
              closesFlags: [],
            },
            {
              routeId: 'argued_against_her',
              label: 'Argue the other side, at her',
              predicate: { atLocation: 'seminar_room', flagsSet: ['used:ask_straight'] },
              setsFlags: ['argued_against_her'],
              closesFlags: [],
            },
            {
              routeId: 'said_the_true_thing',
              label: 'Stop arguing and say what you actually think',
              predicate: { atLocation: 'seminar_room', flagsSet: ['used:come_clean'] },
              setsFlags: ['said_the_true_thing'],
              closesFlags: [],
            },
            {
              routeId: 'missed_it',
              label: 'Do not turn up',
              predicate: { flagsSet: ['debate_day'], afterWorldMinute: 4 * 1440 + 17 * 60 },
              setsFlags: ['missed_the_debate'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['debate_done'], abilities: [], reputation: [{ factionId: 'faction_campus', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_thursday_at_five',
      title: 'Thursday at Five',
      summary: 'On Thursday the council votes on the Cole gift: the all-night reading room becomes the Cole Room and closes at midnight. It is a tie, and a tie goes to the president.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['knows:the_terms'] },
      involvedCharacterIds: ['akane', 'mei', 'ito'],
      involvedLocationIds: ['council_office', 'the_library'],
      knownRewardCopy: 'Whether the reading room stays open all night.',
      steps: [
        {
          id: 'the_vote',
          playerCopy: 'Decide whether the reading room is worth a fight.',
          directorNotes:
            'Akane has the casting vote and cannot use it against the Cole money without looking like she is fighting her own engagement. The favour can pay for it. So can a good case made in the council office. Doing nothing is allowed, and the reading room closes at midnight from next week.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'called_the_favour',
              label: 'Spend your favour on the reading room',
              predicate: { flagsSet: ['used:call_in_the_favour'], beforeWorldMinute: 3 * 1440 + 17 * 60 },
              setsFlags: ['favour_called', 'reading_room_saved'],
              closesFlags: [],
            },
            {
              routeId: 'made_the_case_to_council',
              label: 'Stand up at the council meeting and argue it',
              predicate: { atLocation: 'council_office', flagsSet: ['used:make_the_case'] },
              setsFlags: ['reading_room_saved'],
              closesFlags: [],
            },
            {
              routeId: 'let_it_through',
              label: 'Let the vote happen without you',
              predicate: { flagsSet: ['gift_vote_held'] },
              setsFlags: ['gift_accepted'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['vote_settled'], abilities: [], reputation: [{ factionId: 'faction_council', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_the_gala',
      title: 'The Chancellor’s Gala',
      summary: 'Saturday night, the Great Hall, black tie. At nine two families mean to take the stage and announce Akane and Darren as a couple. Somebody would have to stop them.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows:the_offer'] },
      involvedCharacterIds: ['akane', 'darren', 'evelyn', 'ito'],
      involvedLocationIds: ['great_hall'],
      knownRewardCopy: 'Nine o’clock, and whoever gets to the microphone first.',
      steps: [
        {
          id: 'the_speeches',
          playerCopy: 'Be in the Great Hall at nine, and decide what happens on that stage.',
          directorNotes:
            'Saturday. Doors at half past six, the families on stage at nine. Akane is in grey, perfectly composed, and straightens her pin every four minutes. Gideon Cole arrives at eight. Evelyn and Professor Ito see each other across the room for the first time in twenty-eight years. Nobody is a villain at this party and the announcement is not evil; it is three hundred jobs and a mother who thinks she is protecting her daughter.',
          enterWhen: { flagsSet: ['gala_doors_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_said_it',
              label: 'Stand next to her while she says no herself',
              predicate: { atLocation: 'great_hall', minRelationship: [{ characterId: 'akane', dimension: 'trust', value: 70 }] },
              setsFlags: ['she_said_it', 'announcement_stopped'],
              closesFlags: [],
            },
            {
              routeId: 'darren_said_it',
              label: 'Let Darren be the one who says no',
              predicate: { atLocation: 'great_hall', flagsSet: ['darren_ally'] },
              setsFlags: ['darren_said_it', 'announcement_stopped'],
              closesFlags: [],
            },
            {
              routeId: 'evelyn_called_it_off',
              label: 'Give her mother a reason to call it off',
              predicate: {
                atLocation: 'great_hall',
                flagsSet: ['knows:ito_and_evelyn'],
                minRelationship: [{ characterId: 'evelyn', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['evelyn_cancelled_it', 'announcement_stopped'],
              closesFlags: [],
            },
            {
              routeId: 'you_said_it',
              label: 'Take the microphone yourself',
              predicate: { atLocation: 'great_hall', flagsSet: ['used:make_the_case'] },
              setsFlags: ['you_said_it', 'announcement_stopped'],
              closesFlags: [],
            },
            {
              routeId: 'the_lie_came_out',
              label: 'Make a scene and tell the room it was all fake',
              predicate: { atLocation: 'great_hall', flagsSet: ['used:make_a_scene', 'used:come_clean'] },
              setsFlags: ['exposed', 'announcement_stopped'],
              closesFlags: [],
            },
            {
              routeId: 'it_went_ahead',
              label: 'Let it happen',
              predicate: { flagsSet: ['announcement_made'] },
              setsFlags: [],
              closesFlags: ['announcement_stopped'],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['gala_decided'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_midnight',
      title: 'Midnight',
      summary: 'The deal ends at midnight after the gala, with a friendly breakup in public. Rule four says that if either of you starts to mean it, you say so first.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['deal_struck'] },
      involvedCharacterIds: ['akane'],
      involvedLocationIds: ['union_roof', 'great_hall'],
      knownRewardCopy: 'What the two of you actually are.',
      steps: [
        {
          id: 'say_what_this_is',
          playerCopy: 'Before the clock does it for you, say what this is.',
          directorNotes:
            'This can happen on any night of the week, because rule four can be invoked at any time; most players reach it on Saturday. If the player says they mean it and she does too, the deal ends that night and something else starts, as far as a kiss and no further. If they break up as agreed, she does it beautifully in public and then has to go somewhere alone for a minute. If nobody says anything, midnight passes and she posts the breakup statement she drafted on Monday.',
          enterWhen: { flagsSet: ['deal_struck'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_it_real',
              label: 'Invoke rule four',
              predicate: {
                flagsSet: ['used:come_clean', 'spoke:akane'],
                minRelationship: [
                  { characterId: 'akane', dimension: 'affection', value: 75 },
                  { characterId: 'akane', dimension: 'trust', value: 65 },
                ],
              },
              setsFlags: ['made_it_real'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_friends',
              label: 'End the deal, keep the friend',
              predicate: { flagsSet: ['gala_decided', 'used:stay_with_her'] },
              setsFlags: ['broke_up_as_agreed', 'ended_as_friends'],
              closesFlags: [],
            },
            {
              routeId: 'broke_up_as_agreed',
              label: 'Break up in public, exactly as written',
              predicate: { flagsSet: ['used:play_the_part', 'gala_decided'] },
              setsFlags: ['broke_up_as_agreed'],
              closesFlags: [],
            },
            {
              routeId: 'the_clock_did_it',
              label: 'Say nothing and let midnight end it',
              predicate: { flagsSet: ['midnight_passed'] },
              setsFlags: ['ended_by_the_clock'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:what_this_is'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_why_you',
      title: 'Why You',
      summary: 'Out of four hundred people on that lawn, she walked straight at you. She knew your name before you told her.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['knows:the_offer'] },
      involvedCharacterIds: ['akane', 'mei'],
      involvedLocationIds: ['council_office', 'union_roof'],
      knownRewardCopy: 'The reason, in her handwriting or her voice.',
      steps: [
        {
          id: 'find_out_why',
          playerCopy: 'Find out why she picked you.',
          directorNotes:
            'Three weeks ago, at the council’s open forum, the player was the only person who told her she was wrong about closing the reading room, and did not sit down. The forum minutes are in her office with the player’s name underlined. She tells it herself only on the roof, asked straight, by somebody who has not lied to her since Monday.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Ask her on the roof',
              predicate: { atLocation: 'union_roof', flagsSet: ['used:ask_straight'] },
              setsFlags: ['she_told_you_why'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_minutes',
              label: 'Read the forum minutes',
              predicate: { hasItems: ['forum_minutes'] },
              setsFlags: ['read_the_minutes'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_drafts',
              label: 'Find the drafts in her desk',
              predicate: { hasItems: ['column_drafts'] },
              setsFlags: ['knows:the_column'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['knows:why_you'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_boathouse_steps',
      title: 'The Boathouse Photograph',
      summary: 'Professor Ito went very quiet when you mentioned Akane’s mother, and her mother put her fork down when you mentioned him.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['dinner_done'] },
      involvedCharacterIds: ['ito', 'evelyn'],
      involvedLocationIds: ['seminar_room', 'the_boathouse', 'great_hall'],
      knownRewardCopy: 'What Evelyn Hollis gave up, and why it might change Saturday.',
      steps: [
        {
          id: 'who_she_was',
          playerCopy: 'Find out what happened between the professor and Evelyn Hollis.',
          directorNotes:
            'Twenty-eight years ago, two years together, the boathouse steps. She left him for the marriage that made the firm. Ito will not tell Akane and will not lie to the player if asked straight. Evelyn tells it only at the gala, only to somebody she trusts, and only after she has seen him across the room.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ito_showed_you',
              label: 'Ask the professor why he cares',
              predicate: { flagsSet: ['spoke:ito'], minRelationship: [{ characterId: 'ito', dimension: 'trust', value: 50 }] },
              setsFlags: ['ito_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_photo',
              label: 'Find the photograph in his desk',
              predicate: { hasItems: ['boathouse_photo'] },
              setsFlags: ['found_the_photo'],
              closesFlags: [],
            },
            {
              routeId: 'evelyn_told_you',
              label: 'Ask her mother at the gala',
              predicate: {
                atLocation: 'great_hall',
                flagsSet: ['spoke:evelyn'],
                minRelationship: [{ characterId: 'evelyn', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['evelyn_told_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['knows:ito_and_evelyn'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_photo',
      atWorldMinute: 18 * 60 + 10,
      locationId: null,
      publicCopy:
        'Monday, ten past six in the evening: the anonymous campus gossip page posts a photo from the quad. The Ice Queen, holding somebody’s arm. Caption: "WHO IS THIS." Four hundred comments by seven.',
      directorNotes:
        'From Monday night on, everybody on campus has seen it. People the player has never met look twice at them in the union, and somebody at the coffee cart asks if it is true. It is the reason Mei is on the player’s bed an hour later.',
      setsFlags: ['went_public'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_mei_at_the_door',
      atWorldMinute: 19 * 60 + 5,
      locationId: 'linden_house',
      publicCopy:
        'Monday, five past seven: your sister is sitting on your bed with two coffees and the photo already open on her phone. "Explain," she says.',
      directorNotes:
        'She let herself in with the emergency key. She is delighted, suspicious and worried, and she can tell when the player lies from the way they touch their ear. Monday is the night she decides whether her sibling is a source.',
      setsFlags: ['mei_saw_it'],
      cancelledByFlags: [],
      requiresFlags: ['went_public'],
      movesCharacters: [{ characterId: 'mei', toLocationId: 'linden_house' }],
    },
    {
      id: 'we_the_invitation',
      atWorldMinute: 1440 + 8 * 60 + 30,
      locationId: 'linden_house',
      publicCopy:
        'Tuesday morning, half past eight: a cream envelope under your door, hand-delivered. Evelyn Hollis requests the pleasure of your company at dinner, Wednesday, half past seven.',
      directorNotes:
        'Akane did not know her mother was going to do this and texts the player four words: "Do not answer it." Whether or not the deal was signed on Monday, Evelyn wants to meet whoever her daughter was photographed holding.',
      setsFlags: ['dinner_invitation'],
      cancelledByFlags: [],
      requiresFlags: ['went_public'],
      movesCharacters: [],
    },
    {
      id: 'we_ito_pairs_you',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'seminar_room',
      publicCopy:
        'Tuesday, ten in the morning: Professor Ito chalks the motion for Friday’s debate on the board. A promise made for the wrong reasons still binds. Then, without looking up, he pairs you with Akane Hollis.',
      directorNotes:
        'He knows. He says nothing. The class has seen the photo and somebody laughs. Akane writes the motion down very neatly and does not look at the player for the rest of the hour.',
      setsFlags: ['debate_partners'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'akane', toLocationId: 'seminar_room' }],
    },
    {
      id: 'we_double_date',
      atWorldMinute: 1440 + 19 * 60 + 30,
      locationId: 'the_boathouse',
      publicCopy:
        'Tuesday, half past seven: Darren has booked a table for three on the boathouse terrace, "to get to know my competition". He has ordered for everybody.',
      directorNotes:
        'The quiz dinner. Birthday, middle name, coffee, first kiss. He is enjoying himself and also watching the player’s hands. Akane is perfectly calm and kicks the player under the table twice.',
      setsFlags: ['double_date_night'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_offer'],
      movesCharacters: [
        { characterId: 'akane', toLocationId: 'the_boathouse' },
        { characterId: 'darren', toLocationId: 'the_boathouse' },
      ],
    },
    {
      id: 'we_the_fire_door',
      atWorldMinute: 1440 + 22 * 60 + 10,
      locationId: 'student_union',
      publicCopy:
        'Tuesday, ten past ten at night: on the top landing of the union, Akane holds open a fire door marked ALARMED. It is not. "Come on," she says. "Do not tell anyone this works."',
      directorNotes:
        'The roof is where she goes when she wants nobody to need her, and showing it to the player is the first thing all week she has done without an audience. She has a bag of chips she will claim is not hers.',
      setsFlags: ['shown_the_roof'],
      cancelledByFlags: [],
      requiresFlags: ['deal_struck'],
      movesCharacters: [{ characterId: 'akane', toLocationId: 'union_roof' }],
    },
    {
      id: 'we_the_bakery_window',
      atWorldMinute: 2 * 1440 + 6 * 60 + 15,
      locationId: 'mercer_street',
      publicCopy:
        'Wednesday, quarter past six in the morning: through the steamed-up window of the Mercer Street bakery, Darren Cole is wearing an apron and laughing at something the woman at the oven has said.',
      directorNotes:
        'Only somebody up on Mercer Street at dawn sees it. Darren sees them see it. He comes out with two almond croissants and asks, very quietly, what it is going to cost him.',
      setsFlags: ['saw_the_bakery'],
      cancelledByFlags: [],
      requiresFlags: ['darren_tested'],
      movesCharacters: [{ characterId: 'darren', toLocationId: 'mercer_street' }],
    },
    {
      id: 'we_the_dinner',
      atWorldMinute: 2 * 1440 + 19 * 60 + 30,
      locationId: 'hollis_townhouse',
      publicCopy:
        'Wednesday, half past seven: the Hollis townhouse. A table for fourteen, set for three. Evelyn Hollis stands to greet you and says your full name as if checking it against a list.',
      directorNotes:
        'Evelyn is gracious, exact and missing nothing. She will treat the first lie as manners. Akane is someone else in this house: quieter, smaller, polite to the point of disappearing. The study door is shut, not locked.',
      setsFlags: ['dinner_night'],
      cancelledByFlags: [],
      requiresFlags: ['dinner_invitation'],
      movesCharacters: [{ characterId: 'akane', toLocationId: 'hollis_townhouse' }],
    },
    {
      id: 'we_the_vote',
      atWorldMinute: 3 * 1440 + 17 * 60,
      locationId: 'council_office',
      publicCopy:
        'Thursday at five: the council votes on the Cole gift. Five for, five against. Every face in the room turns to the president.',
      directorNotes:
        'Akane has the casting vote. A vote against the Cole money is a public no to her own engagement two days early, and she knows it. What she does depends on what the player has said and done since Monday.',
      setsFlags: ['gift_vote_held'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'akane', toLocationId: 'council_office' },
        { characterId: 'ito', toLocationId: 'council_office' },
        { characterId: 'mei', toLocationId: 'council_office' },
      ],
    },
    {
      id: 'we_the_courier',
      atWorldMinute: 4 * 1440 + 6 * 60,
      locationId: null,
      publicCopy:
        'Friday, six in the morning: the Fairholm Courier is on every bench on campus. Everybody reads the front page first, and then "Hot Water" on page eleven.',
      directorNotes:
        'What is on the front page depends on what Mei decided on Thursday night. "Hot Water" this week answers a letter about a fake relationship, and it is funnier and kinder than anybody expects from an anonymous column.',
      setsFlags: ['courier_out'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_debate',
      atWorldMinute: 4 * 1440 + 14 * 60,
      locationId: 'seminar_room',
      publicCopy:
        'Friday at two: sixty people crammed into a seminar room for fourteen, because everybody has seen the photo and nobody has seen the Ice Queen argue with her boyfriend.',
      directorNotes:
        'Ito chairs with one eyebrow. Whatever the player argues about promises, the whole room hears it as being about the two of them, and so does Akane.',
      setsFlags: ['debate_day'],
      cancelledByFlags: [],
      requiresFlags: ['debate_partners'],
      movesCharacters: [
        { characterId: 'akane', toLocationId: 'seminar_room' },
        { characterId: 'ito', toLocationId: 'seminar_room' },
      ],
    },
    {
      id: 'we_gala_doors',
      atWorldMinute: 5 * 1440 + 18 * 60 + 30,
      locationId: 'great_hall',
      publicCopy:
        'Saturday, half past six: the Great Hall doors open. Candles, a string quartet, four hundred guests in black tie, and on a small stage at the far end, two microphones.',
      directorNotes:
        'Akane is in grey and perfectly composed. Darren is in black tie and keeps checking his phone. Evelyn works the room. Professor Ito stands by the far window and does not look at Evelyn, which is how everybody who knows anything can tell.',
      setsFlags: ['gala_doors_open'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'akane', toLocationId: 'great_hall' },
        { characterId: 'darren', toLocationId: 'great_hall' },
        { characterId: 'evelyn', toLocationId: 'great_hall' },
        { characterId: 'ito', toLocationId: 'great_hall' },
      ],
    },
    {
      id: 'we_the_announcement',
      atWorldMinute: 5 * 1440 + 21 * 60,
      locationId: 'great_hall',
      publicCopy:
        'Saturday at nine: Evelyn Hollis and Gideon Cole step up to the microphones, and the string quartet stops.',
      directorNotes:
        'Nobody stopped it. Evelyn announces the engagement graciously, Gideon announces the merger, and Akane smiles exactly the right amount. This is a real outcome of the week and should be played with dignity, not as a punishment.',
      setsFlags: ['announcement_made'],
      cancelledByFlags: ['announcement_stopped'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_midnight',
      atWorldMinute: 6 * 1440,
      locationId: null,
      publicCopy:
        'Sunday, midnight: the deal expires. Somewhere on campus, a phone posts a breakup statement that was drafted on Monday afternoon.',
      directorNotes:
        'Only if the deal was signed and nobody has already ended it. Rule one, in her handwriting: it ends at midnight after the gala. She keeps her word, even this one.',
      setsFlags: ['midnight_passed'],
      cancelledByFlags: ['made_it_real', 'broke_up_as_agreed', 'ended_as_friends'],
      requiresFlags: ['deal_struck'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_midnight',
      kind: 'FINALE',
      label: 'What the two of you are when the deal runs out',
      seedHint: 'Rule four in her handwriting: if either of us starts to mean it, we say so.',
      payoffHint: 'Somebody says out loud what this was, before or after the clock does it for them.',
      weight: 1,
    },
    {
      id: 'p_why_you',
      kind: 'MYSTERY',
      label: 'Why she walked straight at you',
      seedHint: 'She knew your name before you told her, and she did not hesitate for a second.',
      payoffHint: 'Forum minutes from three weeks ago, your name underlined once in her pen, and "Right." in the margin.',
      weight: 0.9,
    },
    {
      id: 'p_darren',
      kind: 'RIVAL',
      label: 'What the man in the camel coat actually wants',
      seedHint: 'He tests the two of you like a man who needs you to pass.',
      payoffHint: 'Flour on his sleeves at six in the morning, and a pastry chef who knows his order by heart.',
      weight: 0.8,
    },
    {
      id: 'p_the_announcement',
      kind: 'BOSS',
      label: 'Nine o’clock on Saturday',
      seedHint: 'Two hundred gala invitations with both names printed, in a box nobody has posted.',
      payoffHint: 'Evelyn reaching for the microphone, and whoever gets there first.',
      weight: 0.9,
    },
    {
      id: 'p_under_the_ice',
      kind: 'RELATIONSHIP',
      label: 'Who she is when nobody is watching',
      seedHint: '"That is not funny," she says, and has to look away.',
      payoffHint: '"Hot Water", written at midnight on the roof by the Ice Queen, and one letter in it about you.',
      weight: 0.9,
    },
  ],
  archetypes: [
    {
      id: 'arch_cart',
      name: 'You Run the Coffee Cart',
      role: 'Social reading and a good memory',
      summary: 'You run the coffee cart in the middle of campus, so you know three hundred regulars by their order and can tell who is having a bad week before they do.',
      playstyle: ['Observant', 'Friendly', 'Knows everyone'],
      blurb: 'You have made her coffee every morning for two years. Black, no sugar, sent back if it is not hot. She has never once looked up.',
      attributeBonus: { presence: 2, mind: 1, agility: 1 },
      skillProficiencies: { attention: 3, banter: 2 },
      startingItems: [{ itemId: 'cart_notebook', qty: 1 }],
      startingAbilities: ['read_the_room'],
      startingReputation: [{ factionId: 'faction_campus', amount: 10 }],
    },
    {
      id: 'arch_stage',
      name: 'You Act on Weekends',
      role: 'Stage training and quick persuasion',
      summary: 'You are in the drama society, so lying in public with a straight face is the one thing this week you are already good at.',
      playstyle: ['Performer', 'Fast on your feet', 'Sells it'],
      blurb: 'You play the second lead in the autumn play. The director wrote "Mean it" in the margin of your love scene, and you have never worked out how.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { acting: 3, improvise: 2 },
      startingItems: [{ itemId: 'rehearsal_script', qty: 1 }],
      startingAbilities: ['spin_a_story'],
      startingReputation: [],
    },
    {
      id: 'arch_library',
      name: 'You Live in the Library',
      role: 'Debate training and careful argument',
      summary: 'You study hard, argue well and take the reading room personally, which is how you ended up telling the council president she was wrong.',
      playstyle: ['Sharp', 'Principled', 'Argues back'],
      blurb: 'Your seminar notes have two pages on her arguments. In the margin of week three you wrote "she is wrong about this", and later, in another pen, "she is not".',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { argument: 3, candour: 1, attention: 1 },
      startingItems: [{ itemId: 'seminar_notes', qty: 1 }],
      startingAbilities: ['come_clean'],
      startingReputation: [{ factionId: 'faction_council', amount: 5 }],
    },
    {
      id: 'arch_rower',
      name: 'You Row at Dawn',
      role: 'Physical training and early starts',
      summary: 'You row for the university, so you are on the lake before seven every morning and you can be anywhere on campus faster than anyone.',
      playstyle: ['Steady', 'Physical', 'Up early'],
      blurb: 'You row past a lone runner on the lake path at twenty to seven every morning. She runs anticlockwise. Neither of you has ever waved.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { legwork: 3, timing: 1, candour: 1 },
      startingItems: [{ itemId: 'boathouse_key', qty: 1 }],
      startingAbilities: ['do_the_legwork'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is your name? She already knows it.', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Rivera' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What do you do when you are not her boyfriend?',
      helpText:
        'What fills your week on campus, which sets what you are good at. It stays fixed for the whole story. It does not decide whether you sign her deal, what you tell anybody, or how the week ends: all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the campus already know about you?',
      helpText: 'The one thing people who have met you would say. Most people write one plain sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once been on time for a nine o’clock lecture, and I will argue with anybody about anything.',
    },
    {
      id: 'first_instinct',
      label: 'What is your first instinct when she grabs your arm?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite on the quad and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'play_along', label: 'Play along and work out why later' },
        { id: 'tell_the_truth', label: 'Tell the truth, whatever it costs her' },
        { id: 'enjoy_it', label: 'Enjoy the fact that the Ice Queen needs you' },
        { id: 'get_out', label: 'Find the quickest way off this lawn' },
        { id: 'find_out_why', label: 'Assume she has a reason and find it' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Darren see when he looks you up and down?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A coffee-stained hoodie, a bag full of library books, and the face of somebody who did not plan any of this.',
    },
  ],
  /**
   * Where this can end up. Exactly twelve, because production's storyteller
   * reads the first twelve and no more.
   *
   * Four of them are losses and none is written as a punishment. "The
   * Announcement" is what happens if nobody stops it, so it is reachable by
   * doing nothing at all. "The Breakup Statement" is the deal running out with
   * nothing said. "Not My Problem" is walking off campus, from turn eighteen.
   * "Front Page" is the lie coming apart in public.
   */
  endings: [
    {
      id: 'end_not_fake_anymore',
      name: 'Not Fake Anymore',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['made_it_real'],
        flagsUnset: ['exposed'],
        minRelationship: [{ characterId: 'akane', dimension: 'affection', value: 75 }],
      },
      condition:
        'Rule four, invoked. One of them said they meant it and the other said so too, and the deal ended that night because it had stopped being fake. Play it small and specific: somewhere private, an admission in her exact formal sentences, a kiss at most, and then her laughing out loud at how badly she said it.',
      epilogue:
        'The breakup statement she drafted on Monday is still in her phone, unsent. On Monday the gossip page posts a second photo: the two of them at the coffee cart, and the Ice Queen laughing. Caption: "WE WERE WRONG." She frames it, and pretends she has not.',
      hint: '',
    },
    {
      id: 'end_midnight_as_agreed',
      name: 'Midnight, As Agreed',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['broke_up_as_agreed'], flagsUnset: ['made_it_real'] },
      condition:
        'The deal kept to the letter. A friendly breakup in public at midnight, or an agreement to stay friends, exactly as the rules said. Do not make it secretly tragic and do not make it secretly romantic. Two people did what they promised, and one of them goes somewhere alone for a minute afterwards.',
      epilogue:
        'The campus is sad about it for nearly a week. She sends a thank-you note on council paper, signed with her full name. Three weeks later she sits down at the player’s table in the reading room without asking, and opens a book, and neither of them says anything about it.',
      hint: '',
    },
    {
      id: 'end_she_said_no',
      name: 'She Said No Herself',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['she_said_it', 'gala_decided'] },
      condition:
        'Akane walked up to the second microphone at nine and said no to her mother in front of four hundred people, and the player was standing next to her. The point is that she did it. The player made it possible and did not do it for her.',
      epilogue:
        'Her mother does not speak to her for nine days. On the tenth she rings, and they talk for three hours about the firm, the merger and her father, which they have never done. The engagement is over. The merger is renegotiated without a clause on page nine.',
      hint: '',
    },
    {
      id: 'end_the_announcement',
      name: 'The Announcement',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['announcement_made'], flagsUnset: ['announcement_stopped'] },
      condition:
        'Nobody stopped it. At nine the families announced the engagement and the merger, and Akane smiled exactly the right amount. Whatever the player did all week, it was not this. Play it with dignity and without blame: the honest failure of a week where everybody had a good reason to stay quiet.',
      epilogue:
        'The photo from the quad stays up on the gossip page for months, with a new caption. Akane resigns the presidency in January, politely. The reading room closes at midnight. Sometimes the player sees her running the lake path at dawn, alone, anticlockwise.',
      hint: '',
    },
    {
      id: 'end_the_clause',
      name: 'The Breakup Statement',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['ended_by_the_clock'], flagsUnset: ['made_it_real', 'broke_up_as_agreed'] },
      condition:
        'The deal ran out at midnight and nobody said anything. She keeps her word to the letter and posts the breakup statement she drafted on Monday. Whatever the two of them were by then, neither said it first, and the clock did it for them. Quiet, not cruel.',
      epilogue:
        'The statement is gracious and four lines long and thanks the player for their friendship. Everybody believes it. The player reads it eleven times. On Tuesday, "Hot Water" answers a letter about a deadline nobody wanted, and does not take its own advice.',
      hint: '',
    },
    {
      id: 'end_not_my_problem',
      name: 'Not My Problem',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of the main gate and did not come back for the week. A stranger grabbed their arm and asked them to lie for her, and they declined in the most complete way available. Do not punish it and do not redeem it. It is a reasonable response, and it costs somebody else more than it costs the player.',
      epilogue:
        'Saturday happens without them. The gossip page decides the player was a decoy and moves on by Wednesday. In spring, the player gets a short, formal note in the internal post: "You were right about the library. I wanted you to know I remembered." No signature.',
      hint: '',
    },
    {
      id: 'end_front_page',
      name: 'Front Page, Friday',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['exposed'] },
      condition:
        'The lie came apart in public, in print or at the gala. Everybody knows it was fake, and everybody has an opinion. Play the consequences honestly: embarrassment, a council inquiry, a mother who saw it coming, and the question nobody can ask out loud, which is whether any of it was real.',
      epilogue:
        'Akane chairs her own disciplinary hearing and finds herself guilty of conduct unbecoming, which nobody has ever seen a president do. The engagement does not survive the headline. Neither does the deal. Whether the two of them do is a separate question, and a slower one.',
      hint: '',
    },
    {
      id: 'end_the_conspiracy',
      name: 'Three Liars and a Pastry Chef',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['darren_ally', 'darren_said_it'] },
      condition:
        'Darren took the microphone at nine and said no, for Lena, with his father watching. The player and Akane made it possible and he did it himself. Play it as a comedy that turns brave halfway through a sentence.',
      epilogue:
        'Gideon Cole does not speak to his son for a month. Darren moves into the flat above the bakery and learns to laminate pastry. The four of them have breakfast on Mercer Street every Sunday, and Darren still calls the player "boyfriend", now without the quotation marks.',
      hint: '',
    },
    {
      id: 'end_ask_me_properly',
      name: 'Ask Me Properly',
      rarity: 'RARE',
      minTurn: 24,
      requires: {
        flagsSet: ['asked_for_real', 'gala_decided'],
        minRelationship: [
          { characterId: 'akane', dimension: 'trust', value: 60 },
          { characterId: 'akane', dimension: 'affection', value: 60 },
        ],
      },
      condition:
        'The player refused to fake it on Monday and asked her out properly instead, and spent the whole week being something real while the rest of campus assumed it was something else. By Saturday she has an answer. Play it as the only honest relationship on campus this week.',
      epilogue:
        'Their first actual date is at the coffee cart, on Sunday, at noon, in front of four hundred people. Nobody on the gossip page notices, because everybody already thought they were together. She finds this hilarious, out loud, for the first time anybody can remember.',
      hint: '',
    },
    {
      id: 'end_hold_the_front_page',
      name: 'Hold the Front Page',
      rarity: 'RARE',
      minTurn: 24,
      requires: { flagsSet: ['mei_ran_the_gift', 'courier_out'] },
      condition:
        'Mei ran the side letter and page nine on Friday’s front page, with the player as her source. The library gift and the merger clause are public before the gala. It is the right story and it costs real people their plans. Play the cost as well as the scoop.',
      epilogue:
        'The Cole Foundation withdraws the gift by Monday. The merger is renegotiated without a clause about anybody’s daughter. Mei gets the summer place at the city paper and tells everyone her best source was her sibling, which the player finds embarrassing and secretly treasures.',
      hint: '',
    },
    {
      id: 'end_the_boathouse_steps',
      name: 'The Boathouse Steps',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['knows:ito_and_evelyn', 'evelyn_cancelled_it'] },
      condition:
        'Evelyn Hollis saw Daisuke Ito across the Great Hall, heard what the player had to say, and walked to the microphone at nine to call it off herself. Two people paying for a decision made twenty-eight years ago, and choosing not to pass it on. Gentle and adult. No reunion is promised.',
      epilogue:
        'The merger goes ahead on worse terms and without page nine. Evelyn tells her daughter about the boathouse steps over a very long dinner. Professor Ito is seen, once, walking the lake path at dusk with someone in pearls, and declines to discuss it in seminar.',
      hint: '',
    },
    {
      id: 'end_hot_water',
      name: 'Dear Hot Water',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['knows:the_column', 'made_it_real'] },
      condition:
        'The player knows who writes the column, invoked rule four, and meant it. The anonymous advice columnist of the campus paper answers one last letter, and everybody on campus reads it without knowing who it is about. Warm, funny, and as far as a kiss.',
      epilogue:
        'The final "Hot Water" of term answers a letter from "A Stranger Who Told Me I Was Wrong". It is the funniest column she has ever written, and the last line is "Tell them." Mei prints it unedited. Two people at a corner table in the reading room read it together.',
      hint: '',
    },
  ],
  opening:
    "\"Akane, wait!\"\n\nThe woman ignoring that shout walks straight at you across the lunch-hour quad. White coat, pale face. Everyone knows her: the student council president, the one they call the Ice Queen.\n\nShe takes your arm. Her nails dig in through your sleeve.\n\n\"You,\" she murmurs, \"are about to help me. Nod when I squeeze. Name your price later.\"\n\nA man in a camel coat catches up, out of breath.\n\n\"Darren.\" She doesn’t let go of you. \"This is my boyfriend.\"\n\nShe squeezes. Every bench in earshot goes silent.\n\nDarren looks you up and down. \"She doesn’t date. Ever.\" He holds out his hand. \"So. How did you two meet?\"",
  openingPanel: {
    assetKey: 'story_ice_queen_s_fake_boyfriend/opening',
    alt: 'Akane in a long white coat gripping your arm on a crowded autumn lawn, chin up, while a man in a camel coat stops short behind her.',
  },
  openingSuggestions: [
    '"She shushed me in the library. I’ve been doomed ever since."',
    'I lace my fingers through hers and nod, slowly, at Darren.',
    'I shake his hand. "Honestly? I’ve never met her before in my life."',
  ],
  coverDirection: [
    'SUBJECT: Akane Hollis, the council president everyone calls the Ice Queen, alone and unmistakable in the foreground of a key visual for a campus romantic comedy anime.',
    'She fills the frame from the waist up, close, holding about two thirds of the picture.',
    'An adult woman, tall and straight-backed, long black hair cut blunt, cool grey eyes, a long white wool coat over a dark blazer, a silver pin worn exactly level on the lapel.',
    'One gloved hand reaches toward the edge of the frame and grips a sleeve, as if she has just grabbed somebody’s arm.',
    'Her chin is up and her look is cool and composed, with the faintest blush she is clearly refusing to acknowledge.',
    'BEHIND HER, soft and secondary: an autumn university lawn with gothic stone buildings, gold and red leaves, people on benches turning to stare, and a man in a camel coat out of focus.',
    'LIGHT: crisp noon sun, cool blue shadows and warm gold leaves, so she reads as ice against autumn.',
    "TITLE: the words ICE QUEEN'S FAKE BOYFRIEND painted into the art in the upper third as an elegant logo, icy white with a pale blue edge,",
    "spelled exactly ICE QUEEN'S FAKE BOYFRIEND, large and legible at thumbnail size. No other text anywhere.",
  ].join(' '),
  publishedAt: null,
};

export const ICE_QUEEN_S_FAKE_BOYFRIEND = StoryVersion.parse(raw);
