import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Thin Walls" — your academic rival moved in next door, and the wall is one
 * sheet of plasterboard.
 *
 * Built on Good Morning, Husband's shape: one person at the centre, a small
 * cast that each want something specific this week, three invisible banded
 * variables, and an ending space where several destinations are losses that
 * are not punishments. The content is the opposite of a marriage. Two people
 * who have defined themselves against each other for three years, and a wall
 * that hands each of them, every night, something the other did not mean to
 * share.
 *
 * The bet is that the wall is symmetrical and that using it costs something.
 * She heard the player's closing argument four times before she knocked; the
 * player has not heard hers, because she rehearses in a whisper. Listening is
 * an ability, turning what you heard into an argument is a gated one, and both
 * put her guard back up. The conferral rule turns the romance into a plot: two
 * finalists who talk through a wall about anything at all are one complaint
 * away from handing the clerkship to the third-placed student, who has noticed
 * their addresses.
 *
 * Nadia is scheduled at The Wall at 2 a.m. on purpose. The Wall is both desks,
 * one either side of the plasterboard, so the engine counts her as present for
 * the opening exchange while the fiction keeps her out of reach: the player can
 * hear her and cannot see her, and has to walk out onto the landing to knock on
 * an actual door.
 *
 * Three variables. Focus is the only GOOD_HIGH, because `resolveRest` refills
 * those and a law student who slept is the honest thing for that to mean.
 * Exposure is the first GOOD_LOW, so the generic cost path and PUBLIC_VIOLENCE
 * both land on it: a scene in public is exactly how a year group finds out who
 * lives where. Her Guard falls on its own, slowly, because living one wall
 * apart wears it down, and rises only when the player needles, lies, listens
 * or uses what they heard.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which never sees resources, step notes or any ability except
 * the chosen archetype's starting ones. So the truce terms, what counts as a
 * breach, what using the wall costs and how the year finds out are all hard
 * canon; the player starts holding the moot problem; and every archetype
 * starts with Talk Through the Wall plus one move of its own. The tone guide is
 * also the cover's mood text, so the 13+ limits on the wall sit in hard canon.
 *
 * Everyone in this story is an adult, and the first line of hard canon gives
 * every age: the player twenty-two, the youngest of the cast twenty-two.
 */

const raw = {
  id: 'sv_thin_walls_1',
  storyId: 'story_thin_walls',
  version: 1,
  title: 'Thin Walls',
  fantasyLabel: 'Your rival can hear you through the wall.',
  hook: 'Your rival moved in next door, and the wall is so thin she has heard every word of your closing argument.',
  premise:
    'You are second in your year at law school, for the third year running, behind Nadia Cho. Never by more than half a mark.\n\n' +
    'In nine days the two of you argue the Final Moot in front of three judges. The winner gets the one paid clerkship everybody in the year wants. You argue for a landlord, she argues for a tenant, and the case is about a wall so thin it made a flat unlivable.\n\n' +
    'On Sunday she moved into the flat next door to yours. Forty years ago your bedroom and hers were one room, until somebody split it with a single sheet of plasterboard. Your desk is against it. So is hers.\n\n' +
    'There is one rule about the moot that matters: the two sides may not discuss the case before it. Break it and you are both disqualified, and the clerkship goes to the student in third place, who is friendly, clever, and has noticed where you live.\n\n' +
    'She has been able to hear you for three nights. Tonight, at seven minutes past two, she knocks.\n\n' +
    'You have to decide what she is to you before the moot. Rival, ally, the person you finally beat, or something neither of you has a word for yet.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Rivalry', 'Slice of life', 'Modern', 'Comedy'],
  mechanicsChips: [
    'A rival one wall away',
    'She can hear you too',
    'Nine days to the final',
    'One prize, two of you',
    'Win, lose, or neither',
  ],
  contentDescriptors: ['ROMANCE', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'LIGHT',
  creatorNote:
    'You can spend this whole story trading lines through a wall at three in the morning, and that is a real way to play it. Nadia is not a prize and she is not waiting to be won. She is the best person in your year at the thing you both do, and for nine days she is also the person you can hear turning pages on the other side of the plasterboard.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'the_wall',
    startWorldMinute: 2 * 60 + 7,
    startingItems: [{ itemId: 'moot_problem', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-two. Nadia Cho is twenty-two, Sam Ferreira twenty-two, Elliot Ashby twenty-three, Theo Cho twenty-seven and Professor Ingrid Lund sixty-one. Everyone else in the year, the building and the faculty is an adult too.',
      'The player has finished second in the year three years running, behind Nadia Cho, by less than half a mark each time. The rank list reads: 1. N. Cho 78.6, 2. the player 78.2, 3. E. Ashby 77.9.',
      'The Final Moot is in nine days, on Friday week at ten in the morning, in the Old Court. The top two argue it before a bench of three chaired by Professor Ingrid Lund. The winner is offered the Arden Clerkship: one paid year as clerk to an appeal judge. There is one place.',
      'The moot problem is Penrose v. Ashdown Lettings, a nuisance claim about a partition wall so thin it made a rented flat unlivable. Lund wrote it. Nadia argues for the tenant; the player argues for the landlord.',
      'The conferral rule: counsel on opposite sides may not discuss the moot problem with each other before the moot. A proven breach disqualifies both of them, and the place goes to the third-ranked student, Elliot Ashby. Arguing Penrose with Nadia, through the wall or face to face, is a breach however good it feels; talking about anything else is not. A breach only ends them if somebody can prove it: a recording, a witness, or a confession.',
      'Flats 3B and 3C at 14 Larkin Street were one room until a single sheet of plasterboard split them. The player’s desk and Nadia’s desk stand back to back against it. Each can hear the other speak at normal volume, word for word. Neither can see through it, and each knows what the other is doing only from what the wall carries. There is no door, hatch or gap in it, and none ever appears: the only way from 3B into 3C is out of the player’s front door, eleven steps across the landing, and a knock on hers that she can choose not to answer. When Nadia is present at The Wall she is on her own side, in 3C, a voice through the plasterboard, unless the story has put her in 3B on the page.',
      'The wall carries voices, a pen clicking, a kettle, music, laughter at a laptop, an alarm at 5:40, phone calls home and, once, late, crying. It never carries anything intimate, and nobody in this story listens in on anything a 13+ reader should not hear. If the player listens for anything private, the wall gives them a kettle, a closed door, or Nadia’s voice, dry, saying she can hear them not breathing.',
      'Nadia moved into 3C on Sunday. Before tonight the two of them had never spoken outside a seminar room. She has heard the player rehearse; the player has not heard her, because she rehearses in a whisper.',
      'Nadia’s truce is a note under the player’s front door with three terms: nobody rehearses aloud after midnight, nobody uses anything they heard through the wall, and nobody finds out they are neighbours. Under them: coffee at seven at the Lamplight, if the player agrees.',
      'Anything either of them hears through the wall can be used. The player can only turn Nadia’s argument against her once they have actually heard it, by listening at the wall while she rehearses or because she chose to tell them. In the moot it is a real advantage, and she will know exactly which sentence it came from.',
      'Nadia’s guard is up tonight. Living one wall apart wears it down slowly on its own; needling her, lying to her, listening in on her and using what was heard put it straight back up.',
      'Every conversation through the wall, every knock on a door at 14 Larkin Street and every coffee the two of them share in public makes it likelier that the year finds out they are neighbours. Elliot Ashby already knows where the player lives.',
      'Either finalist may withdraw from the Final Moot before it is argued. The other then wins it unopposed and is offered the clerkship.',
      'Theo Cho is Nadia’s older brother. He left the same law faculty six years ago and runs the night shift at the Lamplight, the 24-hour café across the road.',
      'Professor Lund already knows the two finalists share a wall. She signed Nadia’s hardship housing letter and saw the address. She has said nothing to either of them.',
      'Romance in this story can be flirtatious, tense and heartfelt, and goes no further than a kiss. Nobody’s body is described lingeringly.',
      'There is no magic in this world. Nobody flies, walks through walls or sees through them. If the player tries something impossible, it does not happen, in an ordinary and slightly embarrassing way, and whoever is on the other side of the wall hears exactly what it sounded like.',
    ],
    toneGuide:
      'Quick, warm and competitive: a slow-burn romantic comedy between two rivals who are both very good at banter. Lines land, get answered, and get scored out loud. Law is texture, never homework — one sharp legal phrase per scene beats a paragraph of doctrine. ' +
      'Late nights are lamplit, funny and a little reckless, and the tension comes from proximity, honesty and timing. Nobody is a villain: Elliot reads the rules more closely than anybody, Lund is strict and fair, Theo is kind and carrying something. ' +
      'Let quiet scenes be quiet — two people working on opposite sides of a wall at four in the morning, saying nothing, is a scene. The face at the top of a beat is Nadia’s whenever she is in the scene, including when she is only a voice through the plaster.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Nadia knocks twice. Pause. Once.\n\n"That means ‘are you awake’," she says through the plaster. "I made it up just now. Don’t make it weird."\n\nYou knock twice. Pause. Once.\n\n"That’s my question, you can’t send it back." A pen clicks on her side. "Fine. Yes. Awake. I’ve read paragraph nine eleven times and it still says the same thing."\n\n"What does it say?"\n\n"Nice try."',
      'Theo puts the flat white down before you’ve ordered it.\n\n"She was in at seven," he says. "Two cups. Drank one." He wipes the counter where nothing was spilled. "You know what the other one was for?"\n\nYou don’t answer.\n\n"Me neither," Theo says. "Sit by the window. Her building’s across the road. Yours too, I hear."',
      'Lund doesn’t look up from the file.\n\n"Sit." You sit. The clock does four seconds. "Counsel on opposite sides do not confer. You know this."\n\n"Yes."\n\n"Good." She turns a page. "Then you will understand why I am asking, and why I am asking once. Is there anything you would like to tell me about Larkin Street?"',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 13, presence: 12, resolve: 11, arcana: 8 },
  skills: [
    { id: 'argument', name: 'Argument', attribute: 'mind', description: 'Building a case out of authorities, facts and the one sentence the other side hoped you would skim.' },
    { id: 'advocacy', name: 'Advocacy', attribute: 'presence', description: 'Saying it on your feet, to a bench, to a room, or to her, so that it lands the first time.' },
    { id: 'listening', name: 'Listening', attribute: 'mind', description: 'Hearing what is said and what is left out. Also, on Larkin Street, what comes through plasterboard.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Not rising to it. Keeping your voice level while somebody tries very hard to make it wobble.' },
    { id: 'banter', name: 'Banter', attribute: 'agility', description: 'The quick reply, the comeback, the line that wins the exchange and costs you the argument.' },
    { id: 'endurance', name: 'Endurance', attribute: 'might', description: 'The fourth all-nighter in a week, the stairs at 14 Larkin Street, the last hour in the library.' },
    { id: 'instinct', name: 'Instinct', attribute: 'arcana', description: 'Knowing which question the bench will ask before it asks it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Focus is GOOD_HIGH because rest has to restore something honest, and in
   * finals week the honest thing is how much of you is left. Exposure leads the
   * descending pair because the generic cost path and PUBLIC_VIOLENCE both take
   * the first GOOD_LOW, and a scene in public is how a year group finds out who
   * lives where. Her Guard starts high and falls by itself; only what the player
   * does puts it back up.
   */
  resources: [
    {
      id: 'focus',
      name: 'Focus',
      max: 100,
      start: 70,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is running on nothing. They reread the same paragraph, answer the question before last, and say the true thing at the wrong volume. Nadia can hear exactly how tired they are through the wall, and what she does about it tells you who she is.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Vending-machine coffee and nothing else. The player loses the thread of their own argument mid-sentence, laughs at things that are not funny, and agrees to whatever ends a conversation fastest. This is the band where a small exchange through the wall turns into a row, and where sleep is genuinely the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'Ordinary finals-week tiredness. Good for an hour in the library or a coffee at the corner table, bad for a seminar with Lund in it. The player is sharp in bursts and knows it. Nobody needs to remark on it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'Rested and quick. The player has room to be curious, to build an argument properly, to land a line and then be kind about it. Scenes can be long, the banter can run, and the case can actually get better in front of the reader.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 10,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody in the year has any idea. The two finalists are, as far as the group chat knows, two people who live somewhere and hate each other politely.',
      color: '#C8553D',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody knows anything. The finalists can share a coffee in public and it reads as two rivals being civil. Elliot is friendly and incurious, and Sam is the only person who has noticed, which is not the same as the world noticing.',
        },
        {
          upTo: 50,
          behaviour:
            'People have noticed things without adding them up. Somebody saw them leave the same building; somebody heard Nadia say "your kettle". The group chat makes one joke and moves on. Elliot asks a light question and remembers the answer.',
        },
        {
          upTo: 80,
          behaviour:
            'The year has a theory and the theory is close. Conversations stop when either of them walks into the library. Elliot is assembling something, politely, and has started writing things down. Lund has stopped waiting for somebody to tell her.',
        },
        {
          upTo: 100,
          behaviour:
            'It is out. Everybody knows they live a plasterboard apart, half of them assume the worst, and the only open question is whether anybody can prove the two of them talked about the case. A complaint is no longer a risk; it is a matter of timing.',
        },
      ],
    },
    {
      id: 'guard',
      name: 'Her Guard',
      max: 100,
      start: 60,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nadia has stopped keeping score. She says the first thing she thinks, through the wall and to the player’s face, and is not embarrassed about any of it afterwards.',
      color: '#7A9E7E',
      bands: [
        {
          upTo: 20,
          behaviour:
            'She talks to the player the way she talks to Theo: unguarded, funny, occasionally furious, and honest about all of it. She knocks on the wall to say goodnight and does not pretend it was a mistake. She will tell them what losing would cost her, without being asked.',
        },
        {
          upTo: 50,
          behaviour:
            'Truce conditions, holding. She is warm in a way she would deny if asked, keeps the score out loud as a habit rather than a weapon, and lets the occasional true sentence through before catching it. She notices when the player is quiet on their side, and asks.',
        },
        {
          upTo: 75,
          behaviour:
            'First place, in public. Precise, dry, and three moves ahead. Every kind thing comes with a correction attached, and every question has a second purpose. Through the wall she is braver than face to face; at a door she is all elbows.',
        },
        {
          upTo: 100,
          behaviour:
            'Shut. She rehearses at the library instead of at her desk, buys earplugs, and stops answering knocks. She is scrupulously polite in seminars. If the player has used something she said through the wall, she knows which sentence, and she will never mention it.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'moot_problem',
      name: 'The Moot Problem',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description: 'Fourteen pages: Penrose v. Ashdown Lettings. A tenant sues her landlord because the partition wall in her converted flat is so thin she can hear every word next door. You are for the landlord. Your copy has three colours of ink on it.',
      loreText: 'Lund wrote it. In the margin of page one, in her handwriting, someone has photocopied a note into every copy by accident: "Plasterboard, 1980s. Check."',
      icon: 'papers',
    },
    {
      id: 'truce_note',
      name: 'The Note Under the Door',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description: 'A page torn neatly from a case notebook, folded twice, pushed under the front door of 3B at midnight. Three numbered terms in very small, very straight handwriting (nobody rehearses aloud after midnight; nothing heard through the wall gets used; nobody finds out), and under them: "Coffee. 7:00. Lamplight. Truce?"',
      loreText: 'Held to the light, there is a first draft under it that she crossed out so hard the pen went through. Two words survive: "I can".',
      icon: 'letter',
    },
    {
      id: 'your_case_notes',
      name: 'Your Case Notes',
      tags: ['document', 'personal'],
      skillModifiers: { argument: 1 },
      description: 'Sixty pages of the landlord’s argument, tabbed, colour-coded, and annotated at three in the morning in a hand that gets worse towards the back.',
      loreText: 'Page forty-one says "SHE WILL SAY QUIET ENJOYMENT" in capitals, and underneath, smaller: "she will say it well".',
      icon: 'book',
    },
    {
      id: 'earplugs',
      name: 'Foam Earplugs',
      tags: ['consumable'],
      consumable: { resourceId: 'focus', amount: 10 },
      description: 'A pair of orange foam earplugs, still in the packet, from the box of forty Sam bought the week he moved in.',
      loreText: 'They take the wall down to a murmur. They do not take it away.',
      icon: 'pouch',
    },
    {
      id: 'sams_recorder',
      name: 'Sam’s Recorder',
      tags: ['quest', 'tool'],
      questItem: true,
      description: 'A battered field recorder with sixty-one hours of 14 Larkin Street on it: rain on the fire escape, the boiler, the bus, and forty minutes through the party wall of two people rehearsing their cases at each other.',
      loreText: 'The file is labelled "A Building at Night — side B (the good bit)". It is due to be played on the roof on Monday to everybody Sam knows.',
      icon: 'tools',
    },
    {
      id: 'lease_renewal',
      name: 'The Lease Renewal',
      tags: ['document'],
      description: 'The renewal for 3B, due back to the landlady by the end of the month. Your signature is on it. Sam’s line is blank. It has been under the takeaway menu for a week.',
      loreText: 'On the back, in Sam’s handwriting, a list: "tell them / tell them nicely / tell them after the moot".',
      icon: 'papers',
    },
    {
      id: 'firm_offer',
      name: 'The Cream Envelope',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Heavy cream paper addressed to N. Cho, Flat 3C, from a large commercial law firm. It sits on top of the post pile on the landing radiator. It has been opened and resealed with tape.',
      loreText: 'A training contract offer. Her parents want her to take it. The reply is due the day after the moot.',
      icon: 'letter',
    },
    {
      id: 'her_notebook',
      name: 'Her Notebook',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      skillModifiers: { listening: 1 },
      description: 'A black hardback full of the tenant’s argument in small straight handwriting, numbered points, and red-pen corrections of her own red-pen corrections.',
      loreText: 'The last page is headed "Through the wall". None of it is about the moot. The first line is the tune the player hums when they are winning an argument with themselves. She keeps it on her, not on the desk. Reading that page without being handed it breaks the truce in the worst way available; she knows by morning, and it costs more than the moot.',
      icon: 'book',
    },
    {
      id: 'lamplight_cup',
      name: 'A Lamplight Coffee',
      tags: ['food'],
      description: 'A paper cup from the café across the road with a name on it that Theo has spelled wrong on purpose.',
      loreText: 'Theo spells every regular’s name wrong in a different way every night. He has never once repeated one.',
      icon: 'mug',
    },
    {
      id: 'rank_list',
      name: 'The Rank List',
      tags: ['document'],
      description: 'Final-year rankings under glass in the faculty hall. 1. N. Cho, 78.6. 2. You, 78.2. 3. E. Ashby, 77.9. Somebody has drawn a very small crown beside the first line.',
      loreText: 'It has looked like this, give or take a decimal, for three years.',
      icon: 'papers',
    },
    {
      id: 'old_moot_file',
      name: 'The Old Moot File',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A manila folder from the moot archive, six years old: T. Cho, disqualified before the Final Moot on a complaint of conferral. Lund’s signature on the complaint. No hearing was ever held.',
      loreText: 'At the back, filed late and never read by anybody, Lund included, a one-page letter from the student who made the complaint, withdrawing it.',
      icon: 'folder',
    },
    {
      id: 'elliot_draft',
      name: 'Elliot’s Draft',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A printed draft of a formal complaint of conferral against both finalists. It is careful, fair, and complete, except for a bracket on page two that says [EVIDENCE].',
      loreText: 'The file name in the footer is "Not yet".',
      icon: 'papers',
    },
    {
      id: 'hardship_letter',
      name: 'The Housing Letter',
      tags: ['document'],
      description: 'A copy of a hardship accommodation letter for N. Cho, signed by Professor I. Lund, giving her address as 14 Larkin Street, Flat 3C.',
      loreText: 'It is dated last Monday. It sits on top of a stack, squared exactly, where anybody in the visitor’s chair could read the address upside down.',
      icon: 'letter',
    },
  ],
  abilities: [
    {
      id: 'make_terms',
      name: 'Make Terms',
      tags: ['social'],
      description: 'Agree a deal, change one, or offer your own. Conditions, numbered, said out loud.',
      affordances: ['deal', 'truce', 'agree', 'accept', 'counter-offer', 'set terms', 'shake on it', 'make a deal'],
      costs: [
        { resourceId: 'focus', amount: 4 },
        { resourceId: 'exposure', amount: 2 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'advocacy', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_through_the_wall',
      name: 'Talk Through the Wall',
      tags: ['social'],
      description: 'Say something to the plasterboard and let the person on the other side decide whether to answer.',
      affordances: ['talk through the wall', 'knock on the wall', 'knock back', 'answer her', 'say goodnight', 'talk to the wall', 'call through'],
      costs: [{ resourceId: 'exposure', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'needle',
      name: 'Needle Her',
      tags: ['social'],
      description: 'Score the point. Correct her, one-up her, find the hole in what she said and put a finger in it.',
      affordances: ['no deal', 'tease', 'needle', 'provoke', 'mock', 'one-up', 'correct her', 'point out', 'refuse', 'score a point'],
      costs: [
        { resourceId: 'focus', amount: 3 },
        { resourceId: 'guard', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'banter', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'listen_in',
      name: 'Listen In',
      tags: ['sight'],
      description: 'Go still, put your ear to the plasterboard, and take in what is on the other side. On a wall this thin, your silence carries too.',
      affordances: ['listen in', 'eavesdrop', 'ear to the wall', 'put my ear', 'hold my breath', 'take notes on her', 'overhear'],
      costs: [{ resourceId: 'guard', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'listening', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'prepare_the_case',
      name: 'Work the Case',
      tags: ['utility'],
      description: 'Research, draft, cut, and rehearse quietly. Make your side of Penrose v. Ashdown Lettings better than it was an hour ago.',
      affordances: ['study', 'prepare', 'research', 'draft', 'work on the case', 'read the cases', 'pull an all-nighter', 'revise'],
      costs: [{ resourceId: 'focus', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'argument', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'argue_it',
      name: 'Argue It',
      tags: ['social'],
      description: 'Stand up and make the argument: to the bench, in a seminar, to Lund, or to her face.',
      affordances: ['argue', 'make my case', 'stand up', 'submit', 'object', 'make the argument', 'take the floor', 'respectfully'],
      costs: [{ resourceId: 'focus', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'advocacy', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'come_clean',
      name: 'Come Clean',
      tags: ['social'],
      description: 'Tell the true thing — about the wall, about what you heard, about what you want — and take whatever comes back.',
      affordances: ['tell the truth', 'confess', 'admit it', 'come clean', 'own up', 'be honest', 'tell lund', 'say it'],
      costs: [{ resourceId: 'focus', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_a_straight_face',
      name: 'Keep a Straight Face',
      tags: ['social'],
      description: 'Lie, deny, or play it cool, and hope your voice does not do the thing it does.',
      affordances: ['lie', 'bluff', 'deny it', 'pretend', 'play it cool', 'cover for', 'never heard a word', 'act normal'],
      costs: [
        { resourceId: 'focus', amount: 4 },
        { resourceId: 'guard', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'banter', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_straight',
      name: 'Ask Straight Out',
      tags: ['social'],
      description: 'Put the question nobody in the room wants asked, and then stay quiet long enough for it to be answered.',
      affordances: ['ask her straight', 'ask straight out', 'ask why', 'ask what happened', 'press him', 'press her', 'ask the real question', 'ask about theo'],
      costs: [{ resourceId: 'focus', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_up',
      name: 'Stay Up With Her',
      tags: ['social'],
      description: 'Do not fix it and do not win it. Keep her company through the wall, or at a café table, until it is light.',
      affordances: ['stay up', 'keep her company', 'sit with her', 'say nothing', 'wait with her', 'stay', 'keep talking'],
      costs: [{ resourceId: 'focus', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'turn_her_argument',
      name: 'Turn Her Argument',
      tags: ['social'],
      description: 'Take something she said through the wall and build your answer to it before she has made it.',
      affordances: ['use what i heard', 'use her argument', 'turn it on her', 'answer her case', 'pre-empt her', 'use it against her'],
      costs: [
        { resourceId: 'focus', amount: 8 },
        { resourceId: 'guard', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'instinct', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['heard_her_argument'],
        lockedCopy: 'You have not heard her case. She rehearses in a whisper, and so far the wall has given you her kettle, her alarm and nothing you could use.',
      },
    },
    {
      id: 'withdraw',
      name: 'Step Back',
      tags: ['social'],
      description: 'Withdraw from the Final Moot, so the clerkship goes to whoever is left standing.',
      affordances: ['withdraw', 'step back', 'pull out', 'concede', 'let her have it', 'drop out of the moot'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['case_built'],
        lockedCopy: 'There is nothing to step back from yet. The moot is still a red date on her wall planner and fourteen pages on your desk.',
      },
    },
    {
      id: 'reopen_it',
      name: 'Reopen the Old Case',
      tags: ['social'],
      description: 'Put what happened to Theo Cho six years ago back in front of the person who signed the complaint.',
      affordances: ['reopen it', 'show lund the file', 'bring up theo', 'put it to lund', 'ask about the old complaint', 'reopen the case'],
      costs: [{ resourceId: 'focus', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'argument', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_old_case'],
        lockedCopy: 'There is no case to reopen. There is a man behind a café counter who left in his final year, and that is all he has said.',
      },
    },
  ],
  locations: [
    {
      id: 'the_wall',
      name: 'The Wall',
      shortName: 'The Wall',
      description:
        'Your bedroom in Flat 3B, and in particular the desk pushed against its east wall. Forty years ago this was one big room; somebody split it with a single sheet of plasterboard, and the other half is Flat 3C. Her desk is against the other side. You can hear her pen click and her kettle switch off. She can hear you turn a page. The old radiator runs under both desks and is warm on both sides. There is no door in it. Her flat is out through your front door and eleven steps across the landing.',
      artDirection:
        'Small student bedroom at night, a desk pushed against a pale painted wall, law books and tabbed papers, a desk lamp, a paper café cup, a cast-iron radiator running under the desk and through the wall. Warm lamp light, blue window light, intimate and cramped.',
      connections: [{ to: 'flat_3b', travelMinutes: 1, label: 'Out to the kitchen' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'earplugs', qty: 2, ownerId: null, aka: ['earplugs', 'the earplugs', 'foam earplugs', 'ear plugs'] },
      ],
    },
    {
      id: 'flat_3b',
      name: 'Flat 3B',
      shortName: 'Your Flat',
      description:
        'Two bedrooms and a kitchen-living room with a sofa that came with the lease. Sam’s recording gear is on every flat surface, there are three mugs in the sink with coffee rings at different heights, and the front door has a gap under it wide enough for a folded note.',
      artDirection:
        'Cluttered shared student flat at night, small kitchen-living room, a sagging sofa, microphones and cables on the table, takeaway menus, a front door with light coming under it from the landing. Warm, messy, lived in.',
      connections: [
        { to: 'the_wall', travelMinutes: 1, label: 'Back to your desk' },
        { to: 'the_landing', travelMinutes: 1, label: 'Out onto the landing' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'truce_note', qty: 1, ownerId: null, aka: ['note', 'the note', 'her note', 'folded note', 'the note under the door'] },
        { itemId: 'sams_recorder', qty: 1, ownerId: 'sam', aka: ['recorder', 'the recorder', 'sam’s recorder', 'his recorder', 'the tapes'] },
        { itemId: 'lease_renewal', qty: 1, ownerId: null, aka: ['lease', 'the lease', 'the renewal', 'the form under the menu'] },
      ],
    },
    {
      id: 'the_landing',
      name: 'The Third-Floor Landing',
      shortName: 'Landing',
      description:
        'Two front doors eleven steps apart, 3B and 3C, on bare boards that announce everybody. A light on a timer that gives you forty seconds. A stack of post on the radiator that nobody sorts, and a sash window that opens onto the fire escape.',
      artDirection:
        'Narrow old stairwell landing in a converted terrace house at night, two numbered front doors close together, a timer light bulb, post stacked on a radiator, a sash window with a black iron fire escape outside.',
      connections: [
        { to: 'flat_3b', travelMinutes: 1, label: 'Back into 3B' },
        { to: 'flat_3c', travelMinutes: 1, label: 'Knock on 3C' },
        { to: 'the_roof', travelMinutes: 3, label: 'Up the fire escape' },
        { to: 'larkin_street', travelMinutes: 2, label: 'Down four flights to the street' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'firm_offer', qty: 1, ownerId: 'nadia', aka: ['envelope', 'the cream envelope', 'her post', 'the letter for 3c'] },
      ],
    },
    {
      id: 'flat_3c',
      name: 'Flat 3C',
      shortName: 'Her Flat',
      description:
        'The mirror image of yours, with half the furniture. Boxes still taped shut along one wall. A desk against the same plasterboard as yours, a wall planner with a red countdown to the moot, and a kettle that clicks off loud enough to hear next door. Everything she owns is lined up square.',
      artDirection:
        'Sparse tidy student flat at night, unpacked cardboard boxes, a neat desk against a pale wall, a wall planner with red marks counting down, a kettle, a single plant. Cool and orderly, one warm lamp.',
      connections: [{ to: 'the_landing', travelMinutes: 1, label: 'Back out onto the landing' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'her_notebook', qty: 1, ownerId: 'nadia', aka: ['notebook', 'her notebook', 'the black notebook', 'her case notebook'] },
      ],
    },
    {
      id: 'the_roof',
      name: 'The Roof',
      shortName: 'Roof',
      description:
        'A flat tar roof with a knee-high parapet, two deckchairs nobody owns, and Sam’s microphone stand weighted with a brick. The whole city is out there, and across the canal the faculty’s library windows stay lit all night in finals.',
      artDirection:
        'Flat rooftop of an old terrace at night, two mismatched deckchairs, a microphone stand weighted with a brick, string lights, city lights beyond, a lit stone university building across a dark canal. Romantic, windy, open.',
      connections: [{ to: 'the_landing', travelMinutes: 3, label: 'Back down the fire escape' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
    },
    {
      id: 'larkin_street',
      name: 'Larkin Street',
      shortName: 'The Street',
      description:
        'A narrow street of converted terraces with bins out on the wrong day. The Lamplight glows on the corner opposite, the night bus stops outside number 10, and a gate at the end lets you down onto the canal path.',
      artDirection:
        'Narrow city street of old brick terraced houses at night, a glowing 24-hour café on the corner, a bus stop, wet pavement, an iron gate leading down to a canal. Cosy and urban.',
      connections: [
        { to: 'the_landing', travelMinutes: 2, label: 'Up to the third floor' },
        { to: 'lamplight_cafe', travelMinutes: 1, label: 'Across to the Lamplight' },
        { to: 'the_canal', travelMinutes: 2, label: 'Through the gate to the canal' },
        { to: 'faculty_hall', travelMinutes: 12, label: 'The bus to the faculty' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'lamplight_cafe',
      name: 'The Lamplight',
      shortName: 'Café',
      description:
        'A 24-hour café with nine tables, a counter Theo leans on, a pastry case that is mostly crumbs after midnight, and a corner table by the window that looks straight up at the third floor of 14 Larkin Street. The coffee is good and the radio is always on low.',
      artDirection:
        'Small warm all-night café, nine tables, a wooden counter, a nearly empty pastry case, a corner window table looking up at a brick building across the street, amber lamps, rain on the glass.',
      connections: [{ to: 'larkin_street', travelMinutes: 1, label: 'Back out onto the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'lamplight_cup', qty: 2, ownerId: null, aka: ['coffee', 'a coffee', 'the cup', 'takeaway cup', 'flat white'] },
      ],
    },
    {
      id: 'the_canal',
      name: 'The Canal Path',
      shortName: 'Canal',
      description:
        'A towpath behind Larkin Street that runs a mile along black water to the back gate of the faculty. Narrowboats are moored nose to tail. The one with the brass lamp and a stack of law reports on its roof belongs to Professor Lund, who is up before anybody.',
      artDirection:
        'Urban canal towpath at dawn, narrowboats moored in a line, one with a brass lamp and books stacked on its roof, mist on dark water, a stone university building at the far end.',
      connections: [
        { to: 'larkin_street', travelMinutes: 2, label: 'Up through the gate to Larkin Street' },
        { to: 'faculty_hall', travelMinutes: 18, label: 'The towpath to the faculty’s back gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'faculty_hall',
      name: 'The Faculty of Law',
      shortName: 'Faculty',
      description:
        'An old stone building with a draughty main hall, the final-year rank list pinned under glass by the stairs, and doors off to the library, the Old Court and the staff corridor. Everybody you know walks through here twice a day.',
      artDirection:
        'Grand old university hall in stone, a glass-fronted notice board with a list, students with bags, tall arched windows, wooden doors leading off. Formal, busy, slightly cold.',
      connections: [
        { to: 'larkin_street', travelMinutes: 12, label: 'The bus back to Larkin Street' },
        { to: 'the_canal', travelMinutes: 18, label: 'Out the back gate to the towpath' },
        { to: 'law_library', travelMinutes: 1, label: 'Into the library' },
        { to: 'the_old_court', travelMinutes: 1, label: 'Through to the Old Court' },
        { to: 'lund_office', travelMinutes: 2, label: 'Up the staff corridor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'rank_list', qty: 1, ownerId: null, aka: ['rank list', 'the rankings', 'the list', 'the rank board'] },
      ],
    },
    {
      id: 'law_library',
      name: 'The Law Library',
      shortName: 'Library',
      description:
        'Open all night in finals: four floors of law reports, carrels with names pencilled on them, and a window table where you can see everybody who comes in. Carrel 41, by the radiator, is hers. The moot archive is on the fourth floor, in boxes nobody has opened in years.',
      artDirection:
        'Old university law library at night, tall shelves of bound reports, wooden study carrels with green lamps, a window table, a few tired students, archive boxes on a high shelf.',
      connections: [{ to: 'faculty_hall', travelMinutes: 1, label: 'Back to the main hall' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'old_moot_file', qty: 1, ownerId: null, aka: ['old file', 'the old moot file', 'the archive file', 'the manila folder'] },
        { itemId: 'elliot_draft', qty: 1, ownerId: 'elliot', aka: ['draft', 'the complaint', 'his draft', 'elliot’s draft'] },
      ],
    },
    {
      id: 'the_old_court',
      name: 'The Old Court',
      shortName: 'Old Court',
      description:
        'A real courtroom, moved stone by stone into the faculty a century ago. A raised bench for three, two counsel tables facing it a few feet apart, and a public gallery that fills to the back for the Final Moot. The acoustics are excellent. You can hear the person at the other table turn a page.',
      artDirection:
        'Old wood-panelled courtroom, a raised judges’ bench for three, two counsel tables close together facing it, a public gallery, high windows with dust in the light. Formal, hushed, dramatic.',
      connections: [{ to: 'faculty_hall', travelMinutes: 1, label: 'Back to the main hall' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
    },
    {
      id: 'lund_office',
      name: 'Lund’s Office',
      shortName: 'Lund’s Office',
      description:
        'A narrow room at the end of the staff corridor. Papers in exact stacks, one chair for visitors, a window over the canal, and a clock that ticks loudly enough that she uses it as a second interrogator.',
      artDirection:
        'Narrow academic office, papers in precise stacks, a single visitor chair, a ticking wall clock, a window over a canal, an uncapped fountain pen on a blotter. Austere, quiet, exact.',
      connections: [{ to: 'faculty_hall', travelMinutes: 2, label: 'Back down the corridor' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [
        { itemId: 'hardship_letter', qty: 1, ownerId: 'lund', aka: ['housing letter', 'the hardship letter', 'the letter on her desk'] },
      ],
    },
  ],
  /**
   * Faculty first on purpose: PUBLIC_VIOLENCE takes the first faction in array
   * order, and a finalist making a scene anywhere is a faculty matter by the
   * next morning.
   */
  factions: [
    {
      id: 'faction_faculty',
      name: 'The Faculty of Law',
      description: 'Staff and students, the rank list, the bench. They have watched you and Nadia trade first and second for three years and have opinions about how this ends.',
      startingReputation: 40,
      ranks: [
        { atReputation: 0, label: 'Second place' },
        { atReputation: 50, label: 'Counsel' },
        { atReputation: 70, label: 'The bench’s choice' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_year',
      name: 'The Final Year',
      description: 'A hundred and forty students, one group chat, and an appetite for anything that is not revision. Elliot is the most popular person in it.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'Name on the list' },
        { atReputation: 35, label: 'One of the year' },
        { atReputation: 60, label: 'Who they ask' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_larkin',
      name: '14 Larkin Street',
      description: 'The landlady on the ground floor, the couple on two who argue about recycling, the night-shift nurse on four, and now Nadia. Everybody in the building hears everybody, and most of them are kind about it.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'New noise' },
        { atReputation: 35, label: 'Neighbour' },
        { atReputation: 60, label: 'Has everybody’s spare key' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'nadia',
      name: 'Nadia Cho',
      role: 'First place in your year three years running, and since Sunday the voice on the other side of your bedroom wall',
      cardBlurb:
        'She has beaten you by less than a mark three years running, she has heard every word of your closing argument through the wall, and at two in the morning she has decided to offer you a deal.',
      pronouns: 'she/her',
      publicTraits: ['Precise to the decimal', 'Dry enough to start fires', 'Never seen tired in public'],
      hiddenDrives: [
        'She took the flat knowing whose name was on the post box next door, and has told herself it was the rent',
        'She wants to beat you properly, once, with nothing helping her: not the wall, not the decimal point',
      ],
      values: ['Winning clean', 'Paying her own way', 'Keeping a promise to the letter'],
      fears: [
        'That she is only first because she sleeps less than everybody else',
        'Turning into her brother, or into the parents who never forgave him',
      ],
      socialStyle:
        'Talks like she is cross-examining, then asks something soft before you have finished answering. Much braver through a wall than through a door.',
      boundaries: [
        'Will not be let win. Throw anything for her and she will not forgive it for a long time',
        'Will not talk about her parents through the wall. That conversation needs an open door, and it has not had one yet',
        'Will not use anything she heard through the wall, and will know if you do',
      ],
      goals: [
        'Win the Final Moot without using one word she heard through the wall',
        'Keep the two of you living next door out of the year’s group chat until it is over',
      ],
      secrets: [
        {
          id: 'nadia_the_post_box',
          fact: 'She saw the player’s name on the post box when she viewed 3C, and signed the lease that afternoon. She tells herself, and anybody who asks, that it was the rent.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the roof, if the player has told her one true thing about themselves that she could not have heard through the wall.',
        },
        {
          id: 'nadia_the_page',
          fact: 'At the back of her case notebook is a page headed "Through the wall". None of it is about the moot. The first line is the tune the player hums when they are winning an argument with themselves.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She reads it out herself, through the wall, late, once her guard is all the way down. Taking the notebook gets the page and loses her.',
        },
        {
          id: 'nadia_the_offer',
          fact: 'A large firm has offered her a training contract her parents want her to take. The answer is due the day after the moot. She has decided she will take it if she loses.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Theo knows. She says it herself if the player asks what happens to her if she loses, and means the question.',
        },
      ],
      speechStyle:
        'Exact, quick and dry. Numbers her points out loud and keeps a running count of your concessions. Drops the courtroom register mid-sentence when something actually lands, then picks it straight back up as if it never slipped.',
      topics: ['the truce', 'the moot problem', 'first place', 'what she heard', 'the wall', 'her brother', 'the clerkship'],
      voiceSamples: [
        'Your second point is good. I’ve heard it four times. Now I think it’s good too, which is a problem for me.',
        'Three terms. One: nobody rehearses out loud after midnight. Two: nobody uses what they heard. Three: nobody finds out. Initial each page.',
        'Four tenths of a mark. Do you know what four tenths is? One sentence. I lie awake about which sentence.',
        'Goodnight, wall. That was for the wall. Do not answer.',
        'Concession number two. I’m counting. Keep going, you’re doing beautifully.',
      ],
      appearance:
        'An adult woman, slim and upright, straight black hair cut sharply at the jaw, dark eyes, reading glasses pushed up into her hair and forgotten, a red pen tucked behind one ear, and a plain oversized grey hoodie with the sleeves pushed up to the elbow.',
      visualHook: 'A red pen tucked behind one ear, uncapped, which has ruined three collars.',
      silhouette: 'Upright at a desk with her knees pulled up onto the chair, one palm flat against the wall.',
      artSeed: 'tw-nadia-01',
      portrait: null,
      expressions: ['neutral', 'competitive', 'amused', 'flustered', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 200, locationId: 'the_wall', activity: 'at her desk on her side of the wall, rehearsing in a whisper' },
        { startMinute: 200, endMinute: 390, locationId: 'flat_3c', activity: 'lights off on her side, not sleeping much' },
        { startMinute: 390, endMinute: 480, locationId: 'lamplight_cafe', activity: 'the corner table with two coffees' },
        { startMinute: 480, endMinute: 780, locationId: 'law_library', activity: 'carrel 41, by the radiator' },
        { startMinute: 780, endMinute: 900, locationId: 'faculty_hall', activity: 'seminars, walking past the rank list without looking at it' },
        { startMinute: 900, endMinute: 1080, locationId: 'law_library', activity: 'carrel 41 again, headphones in with nothing playing' },
        { startMinute: 1080, endMinute: 1200, locationId: 'lamplight_cafe', activity: 'eating whatever Theo puts in front of her' },
        { startMinute: 1200, endMinute: 1380, locationId: 'flat_3c', activity: 'the moot problem spread across her kitchen floor' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_wall', activity: 'back at her desk against the wall' },
      ],
      homeLocationId: 'flat_3c',
      knowledgeScope: ['nadia', 'the_moot', 'penrose_v_ashdown', 'the_wall', 'theo', 'the_rank_list', 'the_firm_offer'],
      startingRelationship: { trust: 25, affection: 30, respect: 70, fear: 0, rivalry: 75 },
      gates: [
        {
          id: 'nadia_opens_the_door',
          label: 'She opens her door to you instead of talking through the wall',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'nadia_tells_you_the_cost',
          label: 'She tells you what losing would cost her',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['first_night_over'] },
        },
        {
          id: 'nadia_stops_keeping_score',
          label: 'She stops keeping score',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 72 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 17, presence: 15, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sam',
      name: 'Sam Ferreira',
      role: 'Your flatmate in 3B, a final-year sound student who records everything and has already named the wall',
      cardBlurb:
        'He has shared a flat with you for two years, he can hear the wall as well as you can, and he will help you with anything at all except keeping quiet about it.',
      pronouns: 'he/him',
      publicTraits: ['Cheerful at every hour', 'Records everything', 'Ships people on sight'],
      hiddenDrives: [
        'He has taken a job in another city starting in five weeks and keeps not telling you, because telling you makes this the last month',
      ],
      values: ['Noise is information', 'Turning up with food', 'Never deleting anything'],
      fears: [
        'That the flat stops being anybody’s home the minute he leaves it',
        'That his final project is the best thing he will ever make, and it is forty minutes of other people',
      ],
      socialStyle:
        'Narrates your life back to you like a nature documentary, then goes quiet and useful the second something is actually wrong.',
      boundaries: [
        'Will not delete a recording without a very good argument, made to his face',
        'Will not lie to Nadia for you. He likes her too much already',
      ],
      goals: [
        'Finish his final project, A Building at Night, before the listening party on the roof',
        'Get the two of you to admit it before he moves out',
      ],
      secrets: [
        {
          id: 'sam_the_job',
          fact: 'He has accepted a job as a sound assistant at a theatre in another city, starting in five weeks. The lease renewal is on the kitchen table under a takeaway menu, his line unsigned.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you ask him what he is doing next year and do not accept the joke answer.',
        },
        {
          id: 'sam_the_tape',
          fact: 'His project includes forty minutes recorded through the party wall of both finalists rehearsing at each other. He thinks it is the most romantic thing he has ever recorded. It is also evidence of conferral, and it is due to be played on the roof to half the year.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He plays you a bit of it, proudly, if you ask what the project actually is.',
        },
      ],
      speechStyle:
        'Loose and running, full of sound words — hiss, levels, room tone. Narrates in a hushed documentary voice in the present tense. Goes short and plain the moment it matters.',
      topics: ['his final project', 'the listening party', 'the wall', 'next year', 'the lease', 'what he heard'],
      voiceSamples: [
        'And here we observe the second-place student in its natural habitat, glaring at plasterboard. Magnificent creature.',
        'Room tone in here is ninety per cent you two and ten per cent fridge. Gorgeous. Going straight in the project.',
        'Okay. Levels down. What happened, actually?',
        'I named the wall. Don’t ask. Fine: Gerald.',
      ],
      appearance:
        'An adult man, tall and loose-limbed, curly brown hair, big black studio headphones round his neck, a mustard cardigan with a burn on one sleeve over a plain white T-shirt, odd socks, and a handheld microphone in one hand.',
      visualHook: 'Big studio headphones worn round his neck at all times, cable trailing into a pocket.',
      silhouette: 'Leaning in a doorframe, cereal bowl in one hand, microphone in the other.',
      artSeed: 'tw-sam-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'delighted', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'flat_3b', activity: 'on the sofa in headphones, editing the project' },
        { startMinute: 240, endMinute: 720, locationId: 'flat_3b', activity: 'dead to the world behind his door' },
        { startMinute: 720, endMinute: 900, locationId: 'lamplight_cafe', activity: 'breakfast at noon at the counter, bothering Theo' },
        { startMinute: 900, endMinute: 1140, locationId: 'the_roof', activity: 'recording the city from the roof' },
        { startMinute: 1140, endMinute: 1440, locationId: 'flat_3b', activity: 'cooking for three, loudly' },
      ],
      homeLocationId: 'flat_3b',
      knowledgeScope: ['sam', 'flat_3b', 'the_wall', 'the_project', 'larkin_street', 'theo'],
      startingRelationship: { trust: 65, affection: 60, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sam_says_it',
          label: 'He tells you about next year',
          kind: 'TRUST',
          requires: { trust: 70 },
        },
        {
          id: 'sam_hands_over_the_tape',
          label: 'He lets you hear what is on side B',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['elliot_suspects'] },
        },
      ],
      attributes: { might: 11, agility: 12, mind: 12, presence: 13, resolve: 10, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'theo',
      name: 'Theo Cho',
      role: 'Her older brother. Runs the night shift at the café across the road, and left the same law faculty six years ago',
      cardBlurb:
        'He has made your coffee at three in the morning for two years, he has opinions about who his sister lives next to, and he will not tell you why he never sets foot inside the faculty.',
      pronouns: 'he/him',
      publicTraits: ['Unhurried', 'Remembers every order', 'Funny right up to a line, and then not'],
      hiddenDrives: [
        'He wants Nadia to lose one thing in her life and find out she survives it',
        'He wants somebody to tell him he was right to leave, and nobody ever has',
      ],
      values: ['Feeding people at bad hours', 'Never making anybody explain why they are awake'],
      fears: ['Watching his sister do what he did, at the same age, in the same building', 'That Lund was right about him'],
      socialStyle:
        'Asks nothing, puts food down, and waits. Tells the truth across a counter that he would never tell across a table.',
      boundaries: [
        'Will not talk about the faculty inside the faculty, and will not go in',
        'Will not take sides between you and his sister, out loud',
      ],
      goals: ['Get Nadia through the next nine days still sleeping', 'Find out whether you are good for her before she does'],
      secrets: [
        {
          id: 'theo_the_old_moot',
          fact: 'Six years ago he was accused of conferring with opposing counsel before his own final moot. Lund signed the complaint on another student’s word. He left rather than answer it, and has never told anybody, Nadia included, that he did not do it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'At closing time with the chairs up, if the player has told him something true about their own family first.',
        },
        {
          id: 'theo_the_flat',
          fact: 'He told Nadia that 3C was free, knowing whose flat was next to it. Judging by how much she complains about the player, he thinks they are the only person who makes her laugh.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if the player asks him straight whether he set this up, after laughing for a long time first.',
        },
      ],
      speechStyle:
        'Slow, warm and short. Says the price of things and the time of day. Answers a serious question with a food order, then gives the real answer a beat later while wiping something down.',
      topics: ['his sister', 'the night shift', 'why he left', 'the faculty', 'your usual', 'their parents'],
      voiceSamples: [
        'Flat white, extra shot, no lid. Same as every night for two years. Sit.',
        'She’s been in at seven every morning since Sunday. Orders two cups. Drinks one.',
        'Left in final year. That’s the whole story. Eat that while it’s hot.',
        'Long version costs you till the chairs are up. Grab a cloth.',
      ],
      appearance:
        'An adult man, broad-shouldered and easy, black hair tied back in a short tail, a gentler version of his sister’s face, a dark green café apron over a faded black T-shirt, flour on his forearms, and an order pad in the apron pocket.',
      visualHook: 'A café order pad in his apron pocket with every regular’s usual written inside the cover.',
      silhouette: 'Leaning on both hands behind a counter, head tilted, waiting.',
      artSeed: 'tw-theo-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'amused', 'guarded'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'lamplight_cafe', activity: 'running the night shift' },
        { startMinute: 420, endMinute: 480, locationId: 'lamplight_cafe', activity: 'handing over to the day staff, chairs coming down' },
        { startMinute: 480, endMinute: 900, locationId: 'lamplight_cafe', activity: 'off shift upstairs above the café, blinds down' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_canal', activity: 'walking the towpath to wake up' },
        { startMinute: 1080, endMinute: 1440, locationId: 'lamplight_cafe', activity: 'prepping the kitchen, then the night shift' },
      ],
      homeLocationId: 'lamplight_cafe',
      knowledgeScope: ['theo', 'nadia', 'the_lamplight', 'larkin_street', 'the_old_moot', 'their_parents'],
      startingRelationship: { trust: 45, affection: 40, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'theo_the_long_version',
          label: 'He tells you why he left',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:theo_left'] },
        },
        {
          id: 'theo_on_your_side',
          label: 'He decides he is on your side, quietly',
          kind: 'ALLIANCE',
          requires: { trust: 60, affection: 55 },
        },
      ],
      attributes: { might: 14, agility: 11, mind: 14, presence: 13, resolve: 12, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'lund',
      name: 'Professor Ingrid Lund',
      calledName: 'Lund',
      role: 'Chair of Advocacy. She wrote the moot problem, chairs the bench, and decides who gets the clerkship',
      cardBlurb:
        'She has marked every argument you have made for three years, she will chair the bench that decides between you and Nadia, and she asks one question at a time and waits for as long as you need.',
      pronouns: 'she/her',
      publicTraits: ['Exact', 'Patient to an unnerving degree', 'Has never once raised her voice'],
      hiddenDrives: [
        'She wants to hear the best moot of her career before she retires, and knows which two people could give it to her',
        'She has never been sure she was right about Theo Cho',
      ],
      values: ['The rules, applied to everybody', 'Saying the hard thing to somebody’s face'],
      fears: ['Rewarding the wrong thing because it was better rehearsed', 'Having ended a career that did not deserve ending'],
      socialStyle:
        'Asks one question, then lets the silence and the clock do the rest. Calls everybody by surname, including herself.',
      boundaries: [
        'Will not bend the conferral rule for anyone, including the two best students she has ever taught',
        'Will not discuss another student’s file',
      ],
      goals: [
        'Get a second funded clerkship out of the faculty board before the moot',
        'Find out whether either finalist will tell her the truth about Larkin Street before she has to ask',
      ],
      secrets: [
        {
          id: 'lund_knows',
          fact: 'She signed Nadia’s hardship housing letter and saw the address. She has known since Monday that the finalists share a wall, and is waiting to see which of them tells her first.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it the moment one of them comes to her office and says it unprompted.',
        },
        {
          id: 'lund_the_second_place',
          fact: 'She has asked the faculty board to fund a second clerkship this year. The board answers the day before the moot. She has told nobody, because she will not be seen to promise it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to somebody who has been honest with her about the wall, and only as a thing that may not happen.',
        },
        {
          id: 'lund_the_old_complaint',
          fact: 'Six years ago she signed a conferral complaint against Theo Cho on another student’s word. Theo left before any hearing. She does not know that the student later withdrew the statement: the letter was filed at the back of the archive file, and she has never reopened it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'In her office, if somebody puts the old moot file in front of her and asks her straight.',
        },
      ],
      speechStyle:
        'Short declaratives, surname first, no filler words at all. Asks a question and then stops completely. Uses a Latin phrase at most once a scene, only when it fits, correctly, and translates it.',
      topics: ['the conferral rule', 'the moot problem', 'the bench', 'the clerkship', 'Larkin Street', 'the old moot'],
      voiceSamples: [
        'Sit. You have four minutes. Use two of them well.',
        'Counsel on opposite sides do not confer. That rule has ended better careers than yours.',
        'A good answer to a question I did not ask. Again.',
        'Lund. Just Lund. Titles are for letters.',
        'Res ipsa loquitur. The thing speaks for itself. Eventually, so should you.',
      ],
      appearance:
        'An older woman, spare and very straight-backed, silver hair in a short severe cut, rimless glasses, a navy suit that has been the same suit for a decade over a white shirt buttoned to the collar, and an uncapped gold fountain pen in one hand.',
      visualHook: 'A gold fountain pen she never caps, tapped once on the desk when she has heard enough.',
      silhouette: 'Seated very straight behind a desk, hands folded, completely still.',
      artSeed: 'tw-lund-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'considering', 'amused'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_canal', activity: 'aboard her narrowboat, lamp out' },
        { startMinute: 330, endMinute: 450, locationId: 'the_canal', activity: 'on the boat roof with coffee, reading submissions' },
        { startMinute: 450, endMinute: 720, locationId: 'lund_office', activity: 'at her desk with the door open exactly a hand’s width' },
        { startMinute: 720, endMinute: 840, locationId: 'the_old_court', activity: 'sitting in on practice moots' },
        { startMinute: 840, endMinute: 1080, locationId: 'lund_office', activity: 'marking, with the clock ticking' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_canal', activity: 'aboard her narrowboat with the brass lamp lit' },
      ],
      homeLocationId: 'the_canal',
      knowledgeScope: ['lund', 'the_moot', 'penrose_v_ashdown', 'the_conferral_rule', 'the_old_moot', 'the_hardship_letter', 'the_board'],
      startingRelationship: { trust: 30, affection: 10, respect: 55, fear: 15, rivalry: 0 },
      gates: [
        {
          id: 'lund_hears_you_out',
          label: 'She hears you out without the clock',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'lund_mentions_the_board',
          label: 'She tells you what she has asked the board for',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['told_lund_first'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 18, presence: 16, resolve: 17, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'elliot',
      name: 'Elliot Ashby',
      role: 'Third in the year by three tenths of a mark, and the only person who wins if either finalist is disqualified',
      cardBlurb:
        'He is charming, generous, genuinely good at this, and three tenths of a mark behind you, and he remembers small things about everybody, including where they live.',
      pronouns: 'he/him',
      publicTraits: ['Everybody’s friend', 'Remembers small details about people', 'Never visibly tries'],
      hiddenDrives: [
        'His father has already told the family the clerkship is his',
        'He has never been first at anything, and has never been allowed to be third either',
      ],
      values: ['Rules belong to whoever reads them most closely', 'Being liked while he does it'],
      fears: ['Coming third in front of his father', 'Turning into somebody who files complaints for a living'],
      socialStyle:
        'Warm and attentive, asks after your family by name, and brings up the dangerous thing as small talk while watching what your hands do.',
      boundaries: [
        'Will not lie on a formal complaint. Whatever he files will be true',
        'Will not do anything to Nadia that he would not do to you',
      ],
      goals: [
        'Get proof that the two finalists have conferred, before the moot',
        'Win the clerkship clean if he can, and any way the rules allow if he cannot',
      ],
      secrets: [
        {
          id: 'elliot_the_draft',
          fact: 'He has drafted a complaint of conferral against both finalists. It is complete except for the evidence, and saved in a folder called "Not yet". A printed copy is in his carrel.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The player sees it on his desk in the library if they sit with him long enough, or he says so himself if asked straight what he wants.',
        },
        {
          id: 'elliot_the_father',
          fact: 'His father is a High Court judge who has told the whole family the clerkship is Elliot’s. Elliot has not corrected him in three years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it, quietly, if the player treats him as a rival worth respecting rather than a threat to be managed.',
        },
      ],
      speechStyle:
        'Easy and friendly, full of names and small remembered details. Asks light questions in a row, and the dangerous one is always the third.',
      topics: ['the moot', 'Larkin Street', 'the group chat', 'his father', 'third place', 'the conferral rule'],
      voiceSamples: [
        'How’s your mum’s knee? Better? Good. Good. And the commute these days? Short, I’d imagine.',
        'Larkin Street. Lovely street. Funny, Cho put Larkin Street on her library slip too.',
        'I like you both. Honestly. That makes this harder.',
        'Third is a lovely seat. You see everybody coming.',
      ],
      appearance:
        'An adult man, fair hair neatly parted, an open friendly face, a navy cable-knit jumper over a white collared shirt, an expensive steel watch he never checks, and a silver signet ring on his right hand.',
      visualHook: 'A silver signet ring he turns with his thumb just before he asks the real question.',
      silhouette: 'Relaxed in a library chair, one arm over the back of the next one, smiling.',
      artSeed: 'tw-elliot-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'calculating', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'faculty_hall', activity: 'in his room on the faculty quad, lights out' },
        { startMinute: 480, endMinute: 720, locationId: 'law_library', activity: 'the window table, watching who comes in' },
        { startMinute: 720, endMinute: 840, locationId: 'faculty_hall', activity: 'seminars, sitting near Lund' },
        { startMinute: 840, endMinute: 1260, locationId: 'law_library', activity: 'the window table again, laptop open' },
        { startMinute: 1260, endMinute: 1380, locationId: 'lamplight_cafe', activity: 'a late coffee, chatting to Theo about nothing' },
        { startMinute: 1380, endMinute: 1440, locationId: 'faculty_hall', activity: 'walking back across the quad' },
      ],
      homeLocationId: 'faculty_hall',
      knowledgeScope: ['elliot', 'the_moot', 'the_conferral_rule', 'the_rank_list', 'the_group_chat'],
      startingRelationship: { trust: 20, affection: 30, respect: 50, fear: 0, rivalry: 45 },
      gates: [
        {
          id: 'elliot_levels_with_you',
          label: 'He tells you what he has noticed',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['elliot_suspects'] },
        },
        {
          id: 'elliot_stands_down',
          label: 'He decides to beat you in the Old Court instead',
          kind: 'ALLIANCE',
          requires: { trust: 40, respect: 60 },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 15, presence: 15, resolve: 12, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_truce',
      title: 'Truce?',
      summary: 'At seven minutes past two, the woman who has beaten you for three years knocks on your bedroom wall and offers you a deal.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['nadia', 'theo'],
      involvedLocationIds: ['the_wall', 'flat_3b', 'lamplight_cafe'],
      knownRewardCopy: 'Some idea of what she wants, and what the next nine days of living one wall apart are going to be like.',
      steps: [
        {
          id: 'the_knock',
          playerCopy: 'Answer her, through the wall or otherwise.',
          directorNotes:
            'She is at her desk on her side, one hand on the plasterboard, braver than she will be at a door. Every route here is a real way to play it. Accepting, refusing, lying that you never heard her, and going round to knock on 3C are all good beats. If the player points out that she has heard their whole argument and they have heard none of hers, she is caught, and admits it, and is annoyed that it is true. She reacts to the exact thing said, through the wall, and the player never sees her face in this step unless they go to her door.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_truce',
              label: 'Take the deal',
              predicate: { flagsSet: ['used:make_terms'] },
              setsFlags: ['truce_made'],
              closesFlags: ['no_truce'],
            },
            {
              routeId: 'talked_till_four',
              label: 'Keep her talking until it is nearly light',
              predicate: { flagsSet: ['used:stay_up'] },
              setsFlags: ['truce_made', 'talked_till_four'],
              closesFlags: ['no_truce'],
            },
            {
              routeId: 'declared_war',
              label: 'Refuse, and say why',
              predicate: { flagsSet: ['used:needle'] },
              setsFlags: ['no_truce', 'open_war'],
              closesFlags: ['truce_made'],
            },
            {
              routeId: 'never_heard_a_word',
              label: 'Tell her you never heard a thing through that wall',
              predicate: { flagsSet: ['used:keep_a_straight_face'] },
              setsFlags: ['truce_made', 'lied_at_the_wall'],
              closesFlags: ['no_truce'],
            },
            {
              routeId: 'went_round',
              label: 'Go out onto the landing and knock on her actual door',
              predicate: { flagsSet: ['visited:flat_3c'] },
              setsFlags: ['went_round'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_larkin', amount: 5 }],
          },
        },
        {
          id: 'seven_oclock',
          playerCopy: 'Coffee at seven at the Lamplight, if you go.',
          directorNotes:
            'She is at the corner table at seven with two coffees, unless the player declared war, in which case she is at the library at seven pretending she was always going to be. Theo is behind the counter at the end of his shift and is enjoying this enormously without saying a word. Face to face she is all elbows: precise, fast, and visibly unsure what to do with her hands. Standing her up is a real choice and she does not mention it afterwards, which is worse.',
          enterWhen: { flagsSet: ['first_night_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'had_the_coffee',
              label: 'Meet her at the corner table',
              predicate: { atLocation: 'lamplight_cafe', flagsSet: ['spoke:nadia'] },
              setsFlags: ['had_the_coffee'],
              closesFlags: ['stood_her_up'],
            },
            {
              routeId: 'coffee_to_her_door',
              label: 'Take a coffee up to 3C instead',
              predicate: { hasItems: ['lamplight_cup'], flagsSet: ['visited:flat_3c'] },
              setsFlags: ['had_the_coffee', 'coffee_at_her_door'],
              closesFlags: ['stood_her_up'],
            },
            {
              routeId: 'stood_her_up',
              label: 'Do not go',
              predicate: { afterWorldMinute: 8 * 60, flagsUnset: ['had_the_coffee'] },
              setsFlags: ['stood_her_up'],
              closesFlags: ['had_the_coffee'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['morning_after'],
            abilities: [],
            reputation: [
              { factionId: 'faction_larkin', amount: 5 },
              { factionId: 'faction_year', amount: 5 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_final_moot',
      title: 'The Final Moot',
      summary: 'Nine days. Penrose v. Ashdown Lettings, in the Old Court, before Lund and two judges. One clerkship, and the two of you.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['nadia', 'lund', 'elliot'],
      involvedLocationIds: ['law_library', 'the_old_court', 'lund_office', 'the_wall'],
      knownRewardCopy: 'The Arden Clerkship, or the knowledge of exactly how close you came.',
      steps: [
        {
          id: 'build_your_case',
          playerCopy: 'Make your side of the case good enough to beat hers.',
          directorNotes:
            'The honest way is long hours and it should feel like work that pays: the argument gets visibly better on the page. The dishonest way is what she said through the wall, and it works, and she will know which sentence. Arguing the problem out with her face to face is the most fun either of them has had in a year and is exactly the breach the conferral rule exists for; write the sparring as electric and let the player feel the line they are on. Lund will give real help to anybody who asks her a real question.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'worked_it',
              label: 'Build it yourself, the long way',
              predicate: { flagsSet: ['used:prepare_the_case'] },
              setsFlags: ['case_ready', 'clean_hands'],
              closesFlags: ['used_her_argument'],
            },
            {
              routeId: 'used_what_you_heard',
              label: 'Build your answer to what she said through the wall',
              predicate: { flagsSet: ['used:turn_her_argument'] },
              setsFlags: ['case_ready', 'used_her_argument'],
              closesFlags: ['clean_hands'],
            },
            {
              routeId: 'sparred_with_her',
              label: 'Argue the case out with her, face to face',
              predicate: {
                flagsSet: ['used:argue_it', 'spoke:nadia'],
                minRelationship: [{ characterId: 'nadia', dimension: 'respect', value: 75 }],
              },
              setsFlags: ['case_ready', 'sparred_with_her', 'conferred'],
              closesFlags: ['clean_hands'],
            },
            {
              routeId: 'lund_pushed_you',
              label: 'Take the hard question to Lund',
              predicate: { flagsSet: ['spoke:lund', 'used:ask_straight'] },
              setsFlags: ['case_ready', 'clean_hands', 'lund_coached_you'],
              closesFlags: ['used_her_argument'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['case_built'],
            abilities: ['withdraw'],
            reputation: [{ factionId: 'faction_faculty', amount: 10 }],
          },
        },
        {
          id: 'the_moot',
          playerCopy: 'Friday week, ten o’clock, the Old Court. Win it, lose it, or do not stand up at all.',
          directorNotes:
            'The gallery is full. The counsel tables are a few feet apart, closer than their desks are, with no wall at all. Write the moot as an exchange between two people who know each other’s rhythms, because they do now. Losing is a complete outcome and must not read as a punishment: she is very good. If the player withdraws she finds out in the robing room, from Lund, and her reaction is fury first. If a breach has been proven, there is no moot between them at all, and Elliot argues it against a stand-in.',
          enterWhen: { flagsSet: ['moot_day'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'disqualified',
              label: 'The complaint is upheld',
              predicate: { flagsSet: ['breach_reported'] },
              setsFlags: ['disqualified', 'moot_over'],
              closesFlags: ['you_won_the_moot', 'she_won_the_moot'],
            },
            {
              routeId: 'you_withdrew',
              label: 'Step back, and let her argue it alone',
              predicate: { flagsSet: ['used:withdraw'] },
              setsFlags: ['you_withdrew', 'she_won_the_moot', 'moot_over'],
              closesFlags: ['you_won_the_moot'],
            },
            {
              routeId: 'split_bench',
              label: 'Argue so well the board’s answer matters',
              predicate: {
                atLocation: 'the_old_court',
                flagsSet: ['used:argue_it', 'second_place_funded'],
                flagsUnset: ['breach_reported'],
              },
              setsFlags: ['both_clerkships', 'moot_over'],
              closesFlags: [],
            },
            {
              routeId: 'you_won',
              label: 'Win it',
              predicate: {
                atLocation: 'the_old_court',
                flagsSet: ['used:argue_it'],
                flagsUnset: ['breach_reported'],
                minRelationship: [{ characterId: 'lund', dimension: 'respect', value: 65 }],
              },
              setsFlags: ['you_won_the_moot', 'moot_over'],
              closesFlags: ['she_won_the_moot'],
            },
            {
              routeId: 'she_won',
              label: 'Lose it, close',
              predicate: { atLocation: 'the_old_court', flagsUnset: ['breach_reported'] },
              setsFlags: ['she_won_the_moot', 'moot_over'],
              closesFlags: ['you_won_the_moot'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['moot_decided'],
            abilities: [],
            reputation: [
              { factionId: 'faction_faculty', amount: 10 },
              { factionId: 'faction_year', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_what_the_wall_carries',
      title: 'What the Wall Carries',
      summary: 'She has heard your whole argument. You have heard her kettle. That is not going to stay true for nine days.',
      kind: 'SIDE',
      involvedCharacterIds: ['nadia', 'sam'],
      involvedLocationIds: ['the_wall', 'flat_3c'],
      knownRewardCopy: 'Her side of the case, one way or another, and what you do with it.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'her_side',
          playerCopy: 'Find out what is on her side of the wall.',
          directorNotes:
            'Three different things, and they are not equivalent. Listening gets her case and costs something the player cannot see yet: a silence on a thin wall is audible, and she knows what it means. Being told gets her case as a gift, which is worse to misuse. Keeping your ears shut gets nothing and is the only route that keeps the truce exactly as she wrote it. Whatever the player hears that is not about the moot (a phone call home, a laugh, crying once) is not leverage, and the prose never treats it as leverage.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'listened',
              label: 'Put your ear to the wall',
              predicate: { flagsSet: ['used:listen_in'] },
              setsFlags: ['heard_her_argument'],
              closesFlags: ['kept_your_ears_shut'],
            },
            {
              routeId: 'she_told_you',
              label: 'Let her tell you herself',
              predicate: {
                flagsSet: ['spoke:nadia'],
                minRelationship: [{ characterId: 'nadia', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['heard_her_argument', 'she_shared_it'],
              closesFlags: ['kept_your_ears_shut'],
            },
            {
              routeId: 'kept_your_ears_shut',
              label: 'Keep the truce exactly as written',
              predicate: { flagsSet: ['truce_made', 'used:stay_up'] },
              setsFlags: ['kept_your_ears_shut'],
              closesFlags: ['heard_her_argument'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:her_side'],
            abilities: ['turn_her_argument'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_nobody_tells',
      title: 'Nobody Finds Out',
      summary: 'Elliot Ashby has noticed that both finalists give the same street on library forms. He only needs one of you gone.',
      kind: 'SIDE',
      involvedCharacterIds: ['elliot', 'lund', 'sam'],
      involvedLocationIds: ['law_library', 'lund_office', 'flat_3b', 'the_roof'],
      knownRewardCopy: 'Whether the conferral rule ends this before the moot does.',
      discoverWhen: { flagsSet: ['elliot_suspects'] },
      steps: [
        {
          id: 'keep_it_quiet',
          playerCopy: 'Deal with what Elliot knows before he can prove it.',
          directorNotes:
            'Elliot is not a villain and is not lying about anything. He is right that two finalists who talk through a wall are a problem, and he will only file what is true. Telling Lund yourself is the honest route, and if the two of them have actually argued the case together, honesty means confessing that too, and Lund will apply the rule. Sam’s recording is the thing that turns suspicion into proof, and Sam has to be argued out of playing it, not tricked. Facing Elliot works only on somebody who treats him as a rival rather than a threat.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'confessed_it',
              label: 'Tell Lund everything, including the sparring',
              predicate: { flagsSet: ['used:come_clean', 'spoke:lund', 'conferred'] },
              setsFlags: ['told_lund_first', 'breach_reported'],
              closesFlags: ['elliot_stood_down'],
            },
            {
              routeId: 'told_lund_yourself',
              label: 'Tell Lund about the wall before anybody else does',
              predicate: { flagsSet: ['used:come_clean', 'spoke:lund'], flagsUnset: ['conferred'] },
              setsFlags: ['told_lund_first'],
              closesFlags: ['breach_reported'],
            },
            {
              routeId: 'got_the_tape',
              label: 'Get the recording off Sam',
              predicate: { hasItems: ['sams_recorder'] },
              setsFlags: ['recording_safe'],
              closesFlags: ['elliot_has_proof'],
            },
            {
              routeId: 'faced_elliot',
              label: 'Ask Elliot straight what he wants',
              predicate: {
                flagsSet: ['spoke:elliot', 'used:ask_straight'],
                minRelationship: [{ characterId: 'elliot', dimension: 'respect', value: 60 }],
              },
              setsFlags: ['elliot_stood_down'],
              closesFlags: ['breach_reported'],
            },
            {
              routeId: 'it_got_out',
              label: 'Let it come out',
              predicate: { flagsSet: ['elliot_has_proof'] },
              setsFlags: ['breach_reported'],
              closesFlags: ['elliot_stood_down'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['secret_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_year', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_what_you_are',
      title: 'What You Are to Each Other',
      summary: 'Three years of first and second, nine nights of plasterboard, and one of you is going to have to say something.',
      kind: 'MAIN',
      involvedCharacterIds: ['nadia', 'sam', 'theo'],
      involvedLocationIds: ['the_roof', 'the_wall', 'lamplight_cafe'],
      knownRewardCopy: 'An answer, said out loud by both of you, about what this is.',
      discoverWhen: { flagsSet: ['morning_after'] },
      steps: [
        {
          id: 'say_it',
          playerCopy: 'Say what she is to you, before somebody moves out.',
          directorNotes:
            'Three ways this lands and none of them is a failure. Saying it is the romance and goes no further than a kiss, on the roof or at a door, and it is better for having been said through a wall first. Keeping score for life is a genuine love story of a different kind, and the prose should respect it. Saying nothing is what happens when the moot comes and goes and nobody knocks; it must be written as a real outcome rather than a punishment.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_it',
              label: 'Say it',
              predicate: {
                flagsSet: ['used:come_clean'],
                minRelationship: [
                  { characterId: 'nadia', dimension: 'affection', value: 72 },
                  { characterId: 'nadia', dimension: 'trust', value: 60 },
                ],
              },
              setsFlags: ['together'],
              closesFlags: ['just_rivals', 'said_nothing'],
            },
            {
              routeId: 'kept_score',
              label: 'Keep score, for life',
              predicate: {
                flagsSet: ['used:needle'],
                minRelationship: [{ characterId: 'nadia', dimension: 'respect', value: 80 }],
              },
              setsFlags: ['just_rivals', 'best_rivals'],
              closesFlags: ['together'],
            },
            {
              routeId: 'said_nothing',
              label: 'Let the moot come and go without saying it',
              predicate: { flagsSet: ['moot_over'] },
              setsFlags: ['said_nothing'],
              closesFlags: ['together'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:what_this_is'],
            abilities: [],
            reputation: [{ factionId: 'faction_larkin', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_old_case',
      title: 'The Last Time Somebody Talked',
      summary: 'Theo Cho left this faculty six years ago, in his final year, and will not go back inside it even to deliver coffee.',
      kind: 'LEAD',
      involvedCharacterIds: ['theo', 'lund', 'nadia'],
      involvedLocationIds: ['lamplight_cafe', 'law_library', 'lund_office'],
      knownRewardCopy: 'Why her brother left, and whether anybody ever answered for it.',
      discoverWhen: { flagsSet: ['knows:theo_left'] },
      steps: [
        {
          id: 'find_out_why',
          playerCopy: 'Find out why Theo left the faculty.',
          directorNotes:
            'This is optional and must feel like it: a player who never sits at Theo’s counter after hours never sees a beat of it. Theo tells it plainly and briefly, at closing, with the chairs up. The file in the library archive tells the same story with one extra page Theo has never seen. Nadia does not know the true version and the player has to decide whether it is theirs to tell.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'theo_told_you',
              label: 'Let Theo tell it at closing',
              predicate: {
                flagsSet: ['spoke:theo'],
                minRelationship: [{ characterId: 'theo', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_old_case'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_file',
              label: 'Find the old moot file in the archive',
              predicate: { hasItems: ['old_moot_file'] },
              setsFlags: ['knows:the_old_case', 'read_the_file'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['old_case_known'],
            abilities: ['reopen_it'],
            reputation: [],
          },
        },
        {
          id: 'put_it_to_lund',
          playerCopy: 'Decide whether to put it in front of Lund.',
          directorNotes:
            'Lund will hear it. She will read the withdrawn statement in silence, twice, and then say exactly what she got wrong, without excusing it. That is the whole payoff; it does not rescue Theo’s degree and should not pretend to. Doing this nine days before the moot, as one of her finalists, is a risk, and she knows the player knows it.',
          enterWhen: { flagsSet: ['old_case_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'put_it_to_her',
              label: 'Take the file to Lund’s office',
              predicate: { flagsSet: ['used:reopen_it'], atLocation: 'lund_office' },
              setsFlags: ['case_reopened'],
              closesFlags: [],
            },
            {
              routeId: 'brought_theo',
              label: 'Get Theo to come and say it himself',
              predicate: {
                flagsSet: ['used:reopen_it', 'spoke:theo'],
                minRelationship: [{ characterId: 'theo', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['case_reopened', 'theo_went_back_in'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['old_case_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_faculty', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_sams_last_month',
      title: 'Side B',
      summary: 'Sam is finishing a project about the building at night, and has been strange about next year every time it comes up.',
      kind: 'SIDE',
      involvedCharacterIds: ['sam'],
      involvedLocationIds: ['flat_3b', 'the_roof'],
      knownRewardCopy: 'What Sam is not saying, and what is on the other side of his tape.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'what_sam_is_not_saying',
          playerCopy: 'Find out what Sam is doing next year.',
          directorNotes:
            'Light, warm and a bit sad. Sam is the comic relief who is leaving, and the player finding out should land as a small real loss in the middle of everything else. The lease under the takeaway menu is the clue for anybody who looks.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_him',
              label: 'Ask him straight and do not take the joke',
              predicate: { flagsSet: ['spoke:sam', 'used:ask_straight'] },
              setsFlags: ['knows:sam_leaving'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_lease',
              label: 'Find the unsigned lease',
              predicate: { hasItems: ['lease_renewal'] },
              setsFlags: ['knows:sam_leaving', 'found_the_lease'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['sam_sorted'],
            abilities: [],
            reputation: [{ factionId: 'faction_larkin', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_coffee_at_seven',
      atWorldMinute: 7 * 60,
      locationId: 'lamplight_cafe',
      publicCopy: 'Nadia Cho is at the corner table of the Lamplight with two coffees, and one of them is going cold.',
      directorNotes:
        'She came. She will wait until twenty past and then drink the second one herself so that it does not look like she was waiting. Theo has been told nothing and has worked out everything.',
      setsFlags: ['she_waited_at_seven'],
      cancelledByFlags: ['no_truce'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'nadia', toLocationId: 'lamplight_cafe' }],
    },
    {
      id: 'we_lund_seminar',
      atWorldMinute: 14 * 60,
      locationId: 'the_old_court',
      publicCopy: 'Lund’s advocacy seminar, in the Old Court. She calls the first two names on the rank list to the counsel tables and gives them ten minutes each on anything except the moot.',
      directorNotes:
        'A sanctioned sparring match in front of the whole year, on a topic Lund picks: whether a promise made at two in the morning binds. She has picked it on purpose. Elliot watches both of them and takes notes on neither.',
      setsFlags: ['sparred_in_public'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'nadia', toLocationId: 'the_old_court' },
        { characterId: 'lund', toLocationId: 'the_old_court' },
        { characterId: 'elliot', toLocationId: 'the_old_court' },
      ],
    },
    {
      id: 'we_the_bad_night',
      atWorldMinute: 1440 + 2 * 60 + 40,
      locationId: 'the_wall',
      publicCopy: 'Through the wall: a phone call in the careful voice people use for their parents, then a long quiet that is not quite quiet.',
      directorNotes:
        'She is crying, once, briefly, and she knows the player can hear. What the player does is entirely theirs: knock, say something, put on music, pretend to be asleep. She never mentions it in daylight unless they do. It is never leverage.',
      setsFlags: ['heard_her_bad_night'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_over'],
      movesCharacters: [{ characterId: 'nadia', toLocationId: 'the_wall' }],
    },
    {
      id: 'we_theo_at_closing',
      atWorldMinute: 1440 + 6 * 60 + 30,
      locationId: 'lamplight_cafe',
      publicCopy: 'Half six at the Lamplight. The chairs are up, the radio is off, and Theo is mopping round the only customer.',
      directorNotes:
        'If the player is here, Theo mentions, while mopping, that he did nearly three years of law across the canal and then did not. He says it like a weather report and changes the subject to toast.',
      setsFlags: ['knows:theo_left'],
      cancelledByFlags: [],
      requiresFlags: ['morning_after'],
      movesCharacters: [{ characterId: 'theo', toLocationId: 'lamplight_cafe' }],
    },
    {
      id: 'we_the_cream_envelope',
      atWorldMinute: 1440 + 8 * 60 + 15,
      locationId: 'the_landing',
      publicCopy: 'A heavy cream envelope addressed to Flat 3C has landed on top of the post pile on the landing radiator.',
      directorNotes:
        'The firm’s offer. Nadia takes it inside and brings it back out an hour later, resealed with tape, and leaves it on the pile as if it were somebody else’s.',
      setsFlags: ['the_letter_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_elliot_notices',
      atWorldMinute: 1440 + 9 * 60 + 30,
      locationId: 'law_library',
      publicCopy: 'Elliot Ashby sits down across from you at the window table, smiling, with two library request slips.',
      directorNotes:
        'Both slips have Larkin Street on them. He asks three easy questions and the third one is about the commute. He is not threatening anybody. He is letting the player know he can read.',
      setsFlags: ['elliot_suspects'],
      cancelledByFlags: ['told_lund_first'],
      requiresFlags: ['first_night_over'],
      movesCharacters: [{ characterId: 'elliot', toLocationId: 'law_library' }],
    },
    {
      id: 'we_the_power_cut',
      atWorldMinute: 3 * 1440 + 23 * 60 + 10,
      locationId: 'the_wall',
      publicCopy: 'The power goes out across Larkin Street. No laptop fan, no fridge, no streetlight. Only the radiator, still warm on both sides of the wall.',
      directorNotes:
        'In the dark the wall is so quiet the player can hear her pen stop on the other side. Two hours with no screens and nothing to rehearse from. Whatever they talk about, it is not the moot.',
      setsFlags: ['the_dark_night'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_over'],
      movesCharacters: [{ characterId: 'nadia', toLocationId: 'the_wall' }],
    },
    {
      id: 'we_listening_party',
      atWorldMinute: 5 * 1440 + 20 * 60,
      locationId: 'the_roof',
      publicCopy: 'Sam’s listening party on the roof: fairy lights, two speakers, and half the final year, who have now all seen which building the two finalists come out of.',
      directorNotes:
        'Sam is thrilled and nervous and has a running order on his hand. Elliot came, and brought wine, and is lovely to everybody. Nadia was invited and is pretending she was not going to come.',
      setsFlags: ['party_happened'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'sam', toLocationId: 'the_roof' },
        { characterId: 'elliot', toLocationId: 'the_roof' },
        { characterId: 'nadia', toLocationId: 'the_roof' },
      ],
    },
    {
      id: 'we_side_b',
      atWorldMinute: 5 * 1440 + 21 * 60 + 15,
      locationId: 'the_roof',
      publicCopy: 'Sam announces side B. "This one’s through a wall," he says. "You’ll recognise the voices."',
      directorNotes:
        'Forty minutes of both finalists rehearsing at each other through the plasterboard. Elliot listens to all of it and does not stop smiling. This is the proof he did not have.',
      setsFlags: ['elliot_has_proof'],
      cancelledByFlags: ['recording_safe', 'elliot_stood_down', 'told_lund_first'],
      requiresFlags: ['elliot_suspects'],
      movesCharacters: [],
    },
    {
      id: 'we_the_complaint',
      atWorldMinute: 7 * 1440 + 9 * 60,
      locationId: 'lund_office',
      publicCopy: 'A formal complaint of conferral against both finalists is on Lund’s desk, squared exactly, with a memory stick taped to it.',
      directorNotes:
        'Elliot filed it at eight and then went for a long walk. Lund reads it twice, listens to all forty minutes, and sends for both finalists separately.',
      setsFlags: ['breach_reported'],
      cancelledByFlags: ['elliot_stood_down', 'told_lund_first', 'recording_safe'],
      requiresFlags: ['elliot_has_proof'],
      movesCharacters: [{ characterId: 'lund', toLocationId: 'lund_office' }],
    },
    {
      id: 'we_the_board',
      atWorldMinute: 8 * 1440 + 17 * 60,
      locationId: 'lund_office',
      publicCopy: 'An internal envelope from the faculty board on Lund’s desk. She opens it with the fountain pen.',
      directorNotes:
        'The board has funded a second clerkship this year, on one condition: that the moot shows two people who deserve it. Lund tells nobody tonight. The player sees her smile at a piece of paper, which nobody has seen her do before.',
      setsFlags: ['second_place_funded'],
      cancelledByFlags: ['breach_reported'],
      requiresFlags: ['told_lund_first'],
      movesCharacters: [],
    },
    {
      id: 'we_moot_day',
      atWorldMinute: 9 * 1440 + 10 * 60,
      locationId: 'the_old_court',
      publicCopy: 'Friday, ten o’clock. The Old Court is full to the back of the gallery. Two counsel tables, a few feet apart, and no wall at all.',
      directorNotes:
        'The Final Moot. Whatever has happened over nine days is visible in how the two of them sit. Lund chairs. Elliot is in the front row of the gallery, or at a counsel table, depending on what he filed.',
      setsFlags: ['moot_day'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'nadia', toLocationId: 'the_old_court' },
        { characterId: 'lund', toLocationId: 'the_old_court' },
        { characterId: 'elliot', toLocationId: 'the_old_court' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_clerkship',
      kind: 'FINALE',
      label: 'Who argues best on Friday week',
      seedHint: 'The rank list under glass: 78.6, 78.2, 77.9, and a very small crown drawn beside the first line.',
      payoffHint: 'Three judges, the Old Court full to the gallery, and one of them on their feet last.',
      weight: 1,
    },
    {
      id: 'p_through_the_wall',
      kind: 'RELATIONSHIP',
      label: 'What she says when she thinks you cannot hear',
      seedHint: 'On the second night she says goodnight to the wall, quietly, and then says it was for the wall.',
      payoffHint: 'The page at the back of her notebook titled "Through the wall", read out by her, or found by you.',
      weight: 0.9,
    },
    {
      id: 'p_third_place',
      kind: 'RIVAL',
      label: 'The friendly third-placed student who only needs one of you gone',
      seedHint: 'Elliot Ashby remembers your mother’s knee, and your street.',
      payoffHint: 'A complaint drafted complete except for a bracket that says [EVIDENCE], and a recording that would fill it.',
      weight: 0.75,
    },
    {
      id: 'p_why_theo_left',
      kind: 'MYSTERY',
      label: 'Why her brother left the faculty',
      seedHint: 'Theo will deliver coffee anywhere on Larkin Street, and will not set foot through the faculty gate.',
      payoffHint: 'A moot six years ago, a complaint Lund signed, and a withdrawn statement filed after he had gone.',
      weight: 0.5,
    },
    {
      id: 'p_the_wall',
      kind: 'THEME',
      label: 'Eleven centimetres of plasterboard',
      seedHint: 'One room split in two forty years ago; the radiator still runs under both desks, warm on both sides.',
      payoffHint: 'Whether the wall ends the story as a wall, or as something the two of them knock on on purpose.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_all_nighter',
      name: 'The All-Nighter',
      role: 'Hard study and stamina',
      summary: 'You outwork everybody, so you are strongest at building a case and lasting through the night, and you start with sixty pages of notes.',
      playstyle: ['Thorough', 'Tireless', 'Bad at sleeping'],
      blurb: 'Three years of second place by fractions, and every fraction has cost you a night. Your notes have notes.',
      attributeBonus: { mind: 2, might: 2 },
      skillProficiencies: { argument: 3, endurance: 2 },
      startingItems: [{ itemId: 'your_case_notes', qty: 1 }],
      startingAbilities: ['talk_through_the_wall', 'prepare_the_case'],
      startingReputation: [{ factionId: 'faction_faculty', amount: 5 }],
    },
    {
      id: 'arch_natural',
      name: 'The Natural',
      role: 'Talk, quick replies and advocacy',
      summary: 'You think on your feet, so you are strongest arguing out loud and trading lines, and the year likes you more than it likes her.',
      playstyle: ['Quick', 'Charming', 'Underprepared'],
      blurb: 'You have never once finished the reading and you have never once lost a room. You lose to her on paper, every time, by less than a mark.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { advocacy: 3, banter: 2 },
      startingItems: [],
      startingAbilities: ['talk_through_the_wall', 'needle'],
      startingReputation: [{ factionId: 'faction_year', amount: 10 }],
    },
    {
      id: 'arch_night_shift',
      name: 'The Night-Shift Student',
      role: 'Working student, patience and listening',
      summary: 'You pay your way working nights on a hotel front desk, so you are good at hearing what people are not saying, and the building knows you.',
      playstyle: ['Patient', 'Observant', 'Always tired'],
      blurb: 'You learned law at a reception desk between two and five in the morning, and you learned people there too.',
      attributeBonus: { resolve: 2, mind: 1, might: 1 },
      skillProficiencies: { listening: 3, composure: 2 },
      startingItems: [{ itemId: 'earplugs', qty: 2 }],
      startingAbilities: ['talk_through_the_wall', 'listen_in'],
      startingReputation: [{ factionId: 'faction_larkin', amount: 10 }],
    },
    {
      id: 'arch_second_generation',
      name: 'Second-Generation Lawyer',
      role: 'Family background and composure',
      summary: 'Your parent is a barrister everybody in the faculty has heard of, so you keep your nerve under pressure and the faculty already watches you.',
      playstyle: ['Composed', 'Well connected', 'Under pressure'],
      blurb: 'Everybody assumes you will win because of your surname, which is why finishing second to her has always felt like the only honest thing on your record.',
      attributeBonus: { resolve: 2, presence: 2 },
      skillProficiencies: { composure: 3, instinct: 2 },
      startingItems: [],
      startingAbilities: ['talk_through_the_wall', 'keep_a_straight_face'],
      startingReputation: [{ factionId: 'faction_faculty', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is second on the rank list?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Alex Moreau' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What kind of second place are you?',
      helpText:
        'You are a final-year law student who has finished second three years running. This picks your background, which sets what you are good at, and it stays fixed for the whole story. It does not decide whether you take the truce, whether you win the moot, or what you and your rival become. All of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the year say about you?',
      helpText: 'One plain sentence the other students would agree with. Most people write one, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Brilliant on their feet, terrible at mornings, and has never once been seen eating a proper meal.',
    },
    {
      id: 'what_you_want',
      label: 'What do you want most this week?',
      helpText: 'A starting lean, not a promise. You can want the exact opposite by Friday and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_clerkship', label: 'The clerkship. Nothing else matters until Friday week' },
        { id: 'beat_her_once', label: 'To beat her once, properly' },
        { id: 'know_her', label: 'To find out who she is when she is not first' },
        { id: 'sleep', label: 'Honestly, to sleep' },
      ],
    },
    {
      id: 'appearance',
      label: 'What would she see if she opened her door?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A university hoodie inside out, ink on one cheek, and a mug that says WORLD’S OKAYEST STUDENT.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of these are the player losing the moot, one is both of them losing
   * it, and none of those is written as a punishment. "Nothing Through the
   * Wall" is what happens when nobody says anything, so it is reachable by
   * playing politely and carefully for nine days, which is the honest failure
   * mode of a slow burn. "Moved Out" is walking away, available early.
   *
   * Only "Second Hearing" needs the optional thread about Theo, and every other
   * destination is reachable by a player who never once sat at his counter
   * after closing.
   */
  endings: [
    {
      id: 'end_second_again',
      name: 'Second Again',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['she_won_the_moot'], flagsUnset: ['you_withdrew', 'disqualified'] },
      condition:
        'She won the moot, fairly and narrowly, and the player argued well and lost. This is not a defeat ending. Write the corridor afterwards: two people who know exactly how close it was, and whatever they are to each other by now, which this ending does not decide.',
      epilogue:
        'The rank list does not change, because it never mattered as much as either of them said. She starts at the Court of Appeal in September. The wall at 14 Larkin Street goes on carrying a kettle and a pen click for one more term, and then a different kettle.',
      hint: '',
    },
    {
      id: 'end_first_place',
      name: 'First Place',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['you_won_the_moot', 'clean_hands'], flagsUnset: ['used_her_argument'] },
      condition:
        'The player won the moot and did it with nothing from the wall. She lost to the best argument in the room and knows it, which is the only way she could ever have stood losing to anybody. Let her be gracious late and furious first.',
      epilogue:
        'She shakes the player’s hand in the robing room and does not let go for slightly too long. That night there are three knocks on the wall, and then, through the plasterboard: "Again. Next year. Something bigger."',
      hint: 'Win it with nothing she said.',
    },
    {
      id: 'end_her_argument',
      name: 'Her Argument, Your Mouth',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['you_won_the_moot', 'used_her_argument'] },
      condition:
        'The player won, and the turning point of the moot was an answer to something she only ever said through the wall. Nobody else in the room can tell. She can, to the sentence. Do not moralise; let the silence afterwards do it.',
      epilogue:
        'The clerkship is everything it was supposed to be. She moves out of 3C at the end of the month, and the new tenant is a cellist who practises until midnight. For a long time afterwards the player cannot hear a knock on a wall without listening for the second and third.',
      hint: '',
    },
    {
      id: 'end_conferral',
      name: 'Conferral',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['disqualified'] },
      condition:
        'The complaint was upheld and both finalists are out. Elliot argues the Final Moot against a stand-in and wins it, and it is not quite the victory he wanted. This is not a punishment ending: write the roof that night, two people with nothing left to lose and nobody left to beat.',
      epilogue:
        'They sit on the roof in Sam’s deckchairs and argue Penrose v. Ashdown Lettings properly, for the first time, at full volume, with nobody to stop them. She wins on points. The player wins on the appeal, which they hold the following week, at the Lamplight, with Theo as the bench.',
      hint: '',
    },
    {
      id: 'end_two_clerks',
      name: 'Two Clerks',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['both_clerkships'],
        minFactionReputation: [{ factionId: 'faction_faculty', value: 60 }],
      },
      condition:
        'Somebody told Lund the truth early, the board funded a second place, and the moot was good enough that the bench used it. Both of them have the job. Write the moment they find out, standing a few feet apart at the counsel tables, both of them trying not to look at the other first.',
      epilogue:
        'They clerk for different judges on the same corridor and keep a running score of who gets the better cases. It is close. It is always close. The walls in the court building are a foot thick, which both of them complain about.',
      hint: 'Lund has asked the board for something she will not mention.',
    },
    {
      id: 'end_conceded',
      name: 'Conceded',
      rarity: 'RARE',
      minTurn: 28,
      requires: {
        flagsSet: ['you_withdrew'],
        minRelationship: [{ characterId: 'nadia', dimension: 'affection', value: 65 }],
      },
      condition:
        'The player stepped back so that she would win, and she found out in the robing room. She is furious, because she said not to let her win and meant it. Whether this becomes a love story or the end of one depends on whether the player can explain it as something other than a gift.',
      epilogue:
        'She argues the moot alone against a stand-in and wins, and refuses to speak through the wall for eleven days. On the twelfth she knocks once and says, "That was the stupidest thing anybody has ever done for me. Coffee. Seven."',
      hint: '',
    },
    {
      id: 'end_knock_twice',
      name: 'Knock Twice',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['together', 'moot_decided'],
        minRelationship: [
          { characterId: 'nadia', dimension: 'affection', value: 80 },
          { characterId: 'nadia', dimension: 'trust', value: 70 },
        ],
      },
      condition:
        'They said it, and it held through the moot, whoever won it. This is the romance ending and it stops at a kiss: on the roof, or in the doorway of 3C, or through the wall first and then at the door. Write it as two very competitive people being bad at this on purpose.',
      epilogue:
        'They keep both flats. The knock code gets longer: twice for are you awake, once for yes, three times for come round, four for I was wrong, which she uses less than she should. Sam visits in the spring and asks to record it.',
      hint: '',
    },
    {
      id: 'end_rivals_for_life',
      name: 'Rivals for Life',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['best_rivals', 'moot_decided'] },
      condition:
        'No romance, and nothing missing. The two of them have decided the best thing they have is the rivalry, and they intend to keep it for forty years. Write it with full warmth: the respect is the love story.',
      epilogue:
        'They end up on opposite sides of a real case four years later and both of them prepare for it as if it were the Final Moot. Afterwards they go for coffee and argue about who won. The judge went to the same faculty, and has heard about them.',
      hint: '',
    },
    {
      id: 'end_moved_out',
      name: 'Moved Out',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked away from Larkin Street, the moot and her, without explaining it to anybody. Do not make it a tragedy and do not redeem it. It is a coherent response to nine days of pressure through a wall, and the person it costs most is not the player.',
      epilogue:
        'The moot goes ahead with Elliot at the other counsel table. Nadia wins it and does not enjoy it. 3B is let to a couple who think the wall is charming. She knocks on it once, in the first week, out of habit, and nobody answers.',
      hint: '',
    },
    {
      id: 'end_second_hearing',
      name: 'Second Hearing',
      rarity: 'UNIQUE',
      minTurn: 32,
      requires: { flagsSet: ['case_reopened', 'moot_decided'] },
      condition:
        'The player put Theo’s old case back in front of Lund and she answered for it. It does not give him back six years. Write Lund saying exactly what she got wrong, and Theo deciding what to do with being right, which he has never had to do before.',
      epilogue:
        'Theo does not go back to law. He does walk through the faculty gate once, in June, to deliver coffee to the bench for the Final Moot, and Lund thanks him by name. Nadia finds out the whole story from him, not from the player, which is how it should be.',
      hint: '',
    },
    {
      id: 'end_eleven_centimetres',
      name: 'Eleven Centimetres',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: {
        flagsSet: ['together', 'clean_hands', 'moot_decided'],
        flagsUnset: ['used_her_argument', 'conferred'],
        minRelationship: [{ characterId: 'nadia', dimension: 'trust', value: 80 }],
      },
      condition:
        'They are together, and the player never once used the wall against her: not her argument, not her bad night, not the envelope on the landing. The truce held to the letter. This ending is about the fact that she noticed, and kept count.',
      epilogue:
        'Years later, in a house with walls a foot thick, she still knocks before she comes into a room. It drives guests mad. Neither of them will explain it, and both of them keep the page from the back of her old notebook in the same drawer.',
      hint: 'Keep every term she wrote.',
    },
    {
      id: 'end_nothing_said',
      name: 'Nothing Through the Wall',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['said_nothing', 'moot_decided'] },
      condition:
        'The moot came and went and nobody said it. This is the honest failure mode of a slow burn and it must not be written as a punishment: both of them were polite, present, and careful for nine days, and that turned out to be the decision. There is no scene where anybody explains what went wrong.',
      epilogue:
        'She moves out in June. The last thing either of them says through the wall is "goodnight", and the last thing either of them hears is a box being taped shut. In September there is a cellist in 3C, and the player gets very good at not listening for anything.',
      hint: '',
    },
  ],
  opening:
    "2:07 a.m. You’re reading your closing argument aloud for the fourth time when somebody knocks on the wall beside your desk.\n\nThree knocks. From the other side.\n\n\"Hi. It’s Nadia. Next door. Also first place.\" Her voice comes through the plaster like she’s sitting beside you. \"Your second point is good. I’ve heard it four times. Now I think it’s good too, which is a problem for me.\"\n\nA chair creaks.\n\n\"There’s a note under your front door. I wrote it at midnight, when I was nicer. Short version: nobody rehearses aloud after midnight, nobody uses what they hear through this wall, and nobody finds out we’re neighbours.\"\n\n\"So. Truce? Or do I knock every time you say ‘respectfully’?\"",
  openingPanel: {
    assetKey: 'story_thin_walls/opening',
    alt: 'Nadia at her desk at two in the morning, one palm flat against the wall, a red pen behind her ear, lamplight on her side, talking to someone she cannot see.',
  },
  openingSuggestions: [
    '"Deal. But I want it in writing, and you’re buying the coffee."',
    'I go out onto the landing in my socks and knock on her actual door.',
    '"No deal. You’ve heard my whole argument, and I haven’t heard a word of yours."',
  ],
  coverDirection: [
    'SUBJECT: Nadia Cho, the rival next door, alone and unmistakable in the foreground of a key visual for a romantic comedy anime about two rivals for first place at law school whose desks share one thin wall.',
    'She fills the frame from the waist up, close and slightly off centre, holding about two thirds of the picture, seated at her desk at night.',
    'Sharp jaw-length straight black hair, dark eyes, reading glasses pushed up into her hair and forgotten, a red pen tucked behind one ear, a plain oversized grey hoodie with the sleeves pushed up.',
    'One palm rests flat against the pale wall beside her desk; she leans toward it as if listening, with a small competitive half-smile, eyes turned to the viewer.',
    'Under her palm, faint warm rings of light ripple out across the plaster, like a voice passing through the wall.',
    'HER FACE STAYS CLEAN: no light rings, glowing marks or lines on her face or skin. Every effect stays on the wall and the title.',
    'On the desk, soft and secondary: law books, tabbed papers, sticky notes, a plain paper café cup, and a black suit jacket hung on the back of her chair.',
    'LIGHT: warm amber desk-lamp light on her side; cool blue night light on the far edge of the frame, suggesting the room on the other side of the wall.',
    'TITLE: the words THIN WALLS painted into the art in the upper third as a bold, clean, condensed serif logo, white with a soft warm glow,',
    'with one thin vertical line of light standing between THIN and WALLS like a seam in plaster, spelled exactly THIN WALLS, large and legible at thumbnail size.',
    'No other text anywhere: nothing written on the books, papers, cup, jacket or hoodie.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const THIN_WALLS = StoryVersion.parse(raw);
