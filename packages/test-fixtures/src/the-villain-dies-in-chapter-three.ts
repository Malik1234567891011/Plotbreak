import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Villain Dies in Chapter Three" — you know the script, and the script
 * kills you at midnight.
 *
 * The structural bet is dramatic irony the player can act on. They wake in
 * the body of a web novel's first villain, Severin Grauen, halfway through the
 * line that starts his death, and they know the rest of the day: the duel at
 * dusk, the note after dark, the door under the chapel, the hero on the chapel
 * steps at the midnight bell. Everybody around them is still inside the book.
 *
 * What makes it last past turn three is that the book was shallow and the
 * people are not. The heroine wanted the duel for a reason the author never
 * wrote. The butler the book called loyal has an order in his pocket. The
 * father who is not in chapter three is on campus today. Each of them is
 * authored so the writer can motivate them rather than only voice them, and
 * each of them can refuse.
 *
 * Playable span: the day of chapter three, 9:40 to the midnight bell, then the
 * morning of "chapter four", the first day the book never wrote. The novel's
 * second arc lives in the endings.
 *
 * Production's storyteller never sees the resources, so the two rules that
 * matter — the Duel Code and the pull of the book — live in hard canon, and the
 * chapter itself lives in a quest item the player starts holding, because the
 * storyteller reads quest items.
 *
 * The protagonist is NAMED. The world already knows who Severin is, so the
 * setup screen asks how the player read the book instead of who they are, and
 * that is what decides what they remember.
 *
 * Three variables. Composure is the only GOOD_HIGH, because `resolveRest`
 * refills those and steadying yourself in a quiet room is the honest thing for
 * that to mean. Scandal is first of the descending pair because PUBLIC_VIOLENCE
 * and the generic cost path both take the first GOOD_LOW in array order, and
 * steel drawn in public raising the academy's voice is exactly right. Script is
 * second: using the villain's power, or acting on the book, pulls the day back
 * toward the book.
 */

const raw = {
  id: 'sv_the_villain_dies_in_chapter_three_1',
  storyId: 'story_the_villain_dies_in_chapter_three',
  version: 1,
  title: 'The Villain Dies in Chapter Three',
  fantasyLabel: "You're the villain. You die at midnight.",
  hook: 'You wake up mid-insult in the body of a web novel’s spoiled villain, on the exact line that gets him killed by midnight, and the heroine already has her hand on her sword.',
  premise:
    'It was a web novel called A Sword for the Lowborn, and you read it on the train home: a carter’s son at a royal academy, a swordswoman with a temper, and a spoiled duke’s heir named Severin Grauen who exists to be hated for three chapters and then die.\n\n' +
    'Last night you fell asleep with it still open. This morning you woke in the academy courtyard, in front of two hundred students, in his body, halfway through his worst sentence.\n\n' +
    'The book was clear about the rest of today. He calls Elara Wynn commoner trash in front of the whole first year. She beats him in the Ring at dusk in nine seconds. After dark a note sends him under the chapel, to a relic his family buried there, and it takes him.\n\n' +
    'At midnight Cassian Dray, the hero, ends him on the chapel steps. Nobody mourns him, not even his butler.\n\n' +
    'You know the script, so you know exactly when you die. The people around you do not, and they are not the flat characters you remember. Elara has a reason for that duel the author never wrote. Your butler has a letter in his coat he has not burned. Your father is on campus today, and the book never said why.\n\n' +
    'Every scene you change makes the next page harder to read. You have fourteen hours to survive a chapter that was written to kill you.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  // Tags are matched against services/api/src/catalog-taxonomy.ts: High fantasy
  // files it under Fantasy, Rivalry under Action, and "academy" plus "student"
  // in the premise under School.
  tags: ['High fantasy', 'Rivalry', 'Transmigration', 'Comedy', 'Academy'],
  mechanicsChips: [
    'You know the script',
    'Every change blurs the pages',
    'A duel at dusk, a death at midnight',
    'The cast have reasons',
    'Rewrite the villain or outdo him',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You know how today ends. The people in it do not, and the book was wrong about most of them. Apologise, run, fight, play the villain better than he ever did, or go and find out who sent him under the chapel. Midnight is the only fixed thing here, and even that depends on where you are standing when the bell goes.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'founders_courtyard',
    startWorldMinute: 9 * 60 + 40,
    startingItems: [
      { itemId: 'pages_you_remember', qty: 1 },
      { itemId: 'grauen_sword', qty: 1 },
      { itemId: 'grauen_signet', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player, in Severin Grauen’s body, is twenty. Elara Wynn is nineteen, Cassian Dray twenty, Lady Viveka Sorrel twenty, Felis Corran thirty-four, Odalys Kerr fifty and Duke Ulric Grauen fifty-three. Vellmar Royal Academy admits nobody under eighteen, and its first-years are nineteen and twenty.',
      'The player has woken inside a web novel they were reading, in the body of its first villain, Severin Grauen, heir of House Grauen, on the morning of chapter three. Nobody in this world knows that, nobody knows they are in a book, and nobody will believe the player without very good evidence.',
      'Chapter three, as the book wrote it: Severin calls Elara Wynn commoner trash in the Founders’ Courtyard; the duel is posted at the noon bell; she beats him in the Ring at dusk in nine seconds; after dark a note sends him through the iron door under the chapel, where the Cold Ember wakes and takes him over; at midnight Cassian Dray ends him on the chapel steps with a practice sword that turns to light. The chapter’s last line says nobody mourned him, not even his butler.',
      'The Duel Code: an insult given before witnesses is taken back before the noon bell or answered in the Ring at dusk, officiated by the Master-at-Arms. A yield is honourable; a forfeit is not. Drawing steel anywhere outside the Ring is grounds for expulsion, whoever you are.',
      'The Cold Ember is House Grauen’s founding relic, sealed under the chapel since the academy was built over it two hundred years ago. It wakes only for a Grauen hand and takes the one who wakes it. It can also be sealed for good, by a Grauen hand and seven founders’ words, which the book never mentions.',
      'The Cold Ember is the only magic in this story. Severin’s body can fence and nothing more: nobody flies, vanishes, reads minds or walks through walls, the player included. If the player tries something impossible, it does not happen; one plain line says so, and the scene goes on from where the player stands.',
      'Duke Ulric Grauen wrote the note and ordered Felis Corran, in his own hand, to leave the undercroft door unlocked tonight and make sure his son hears what lies beneath it. The Duke means to hold the Ember once it is awake and needs a Grauen he can spare. Felis carries the order and the iron key in his coat pocket and has not decided whether to obey.',
      'House Grauen seized Elara Wynn’s family mill on the North March for eleven crowns of debt last winter. House Grauen itself is near ruin; its spring debts will finish it.',
      'The book pulls. People do what they would actually do, not what the book had them do, but the day keeps bending back toward the book’s scenes until the player changes the reason for a scene rather than its time: a dodged duel gets rescheduled, the note still arrives, Cassian still finds himself on the chapel steps near midnight without knowing why. Every scene the player breaks makes their memory of the following pages less reliable. The pull answers the player. Every time they lean on Severin’s name and menace, or act on what the book says is coming, the day leans harder toward the book’s scenes, midnight included; every scene they break for a new reason loosens it.',
      'How much of the novel the player read depends on who they are, and differs between readers. None of them knows for certain who ordered the door left open: the serial had not got that far when they fell asleep.',
    ],
    toneGuide:
      'Fast, sharp and funny, then suddenly not. The comedy is the gap between what the player knows and what everybody assumes about Severin Grauen; the weight is discovering that the people the book flattened have reasons. ' +
      'Keep beats short and physical: a hand on a hilt, a bell, a door, two hundred people pretending not to listen. Fights are quick, readable and never graphic — a cut sleeve, a bruise, a blade at the throat, a yield — and the Code means most of them happen in the Ring. Death, when it comes, is one clean line and offstage. ' +
      'Romance with Elara or Viveka can be tense, flirtatious and heartfelt and goes no further than a kiss; no fan service, and no lingering on bodies. Nobody in this world talks as though they were in a book. ' +
      'Apologising, running, fighting, playing the villain better than he ever did and walking out of the gate are all real ways to play this day; none of them is the wrong answer, and the world keeps up with each. ' +
      'The face at the top of a beat is whoever is speaking to the player, most often Elara in the first hour.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Elara’s blade stops a finger’s width from your collar.\n\n\"Yield,\" Kerr says from the edge of the sand. \"Or don’t. I’m counting.\"\n\nNine seconds. In the book it was nine seconds.\n\nYou check. It has been eleven.\n\nElara sees you check. Her eyes narrow.\n\n\"What,\" she says, very quietly, \"are you counting?\"",
      "Felis sets the tray down without a sound.\n\n\"How do you take it?\" you ask.\n\nHe goes still. Fourteen years, and you have never once asked.\n\n\"My lord.\" His gloved hand drifts to his coat pocket and stays there. \"Is something the matter?\"\n\nEverything is the matter. The thing in that pocket is the matter.\n\n\"Sit down,\" you say. \"Pour yourself one.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 12, mind: 11, presence: 13, resolve: 10, arcana: 11 },
  skills: [
    { id: 'canon', name: 'Canon', attribute: 'mind', description: 'What the book said about this person, this room and this hour, and how far it can still be trusted.' },
    { id: 'swordplay', name: 'Swordplay', attribute: 'agility', description: 'The body’s training, which turns out to be better than its owner ever let anybody see.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Keeping your voice level while your whole future is one sentence long.' },
    { id: 'insight', name: 'Insight', attribute: 'mind', description: 'Reading what somebody wants from the way they stand in a room.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being, against every expectation anybody has of that face, pleasant.' },
    { id: 'menace', name: 'Menace', attribute: 'presence', description: 'The Grauen name, the drawl and the look. Everybody expects it, which is why it works.' },
    { id: 'stealth', name: 'Stealth', attribute: 'agility', description: 'Being somewhere a duke’s heir is not expected to be.' },
    { id: 'intrigue', name: 'Intrigue', attribute: 'mind', description: 'Bargains, favours, debts, and who owes whom what.' },
    { id: 'improvise', name: 'Improvising', attribute: 'agility', description: 'Getting through a scene the book never wrote.' },
    { id: 'ember_lore', name: 'Ember Lore', attribute: 'arcana', description: 'What the old Grauen line knows, without being told, about the thing under the chapel.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is GOOD_HIGH because rest restores those, and a world with none
   * prints "you rest, and recover" and changes nothing. Scandal and Script are
   * descending: the academy talking, and the book pulling. Both only ever go
   * up through what the player spends, and come down slowly with time.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 75,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The borrowed body takes over. The drawl, the curl of the lip, the hand going to the hilt: every line comes out as the old Severin would have said it, and everybody in the room hears the man they expected.',
      color: '#B8C0CC',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Frayed to the seams. The body’s habits come up through the player: the drawl, the sneer, the hand that finds the hilt on its own. Lines come out in the old Severin’s cadence before the player has chosen them, and people react to the man they expected. A quiet room, a meal or an hour alone genuinely matters here.',
        },
        {
          upTo: 60,
          behaviour:
            'Holding, with effort. The player chooses every word but not always the tone, and anybody who knew the old Severin well — Felis, Viveka — can see the strain at the jaw. Good for one hard conversation; bad for two in a row without a breath between them.',
        },
        {
          upTo: 100,
          behaviour:
            'Steady. The player is entirely in charge of a face that was built for sneering, which unsettles everybody who knew it. Scenes can be long, careful and surprising, and a kindness lands as a kindness rather than as a trick.',
        },
      ],
    },
    {
      id: 'scandal',
      name: 'Scandal',
      max: 100,
      start: 35,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The academy has entirely moved on. The player can walk through any room on campus without a single head turning, which for a Grauen has never happened before.',
      color: '#C46B5A',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Old news. People still look twice, but nobody lowers their voice when the player walks into a room, and the governors have other business on the table.',
        },
        {
          upTo: 50,
          behaviour:
            'The courtyard is the main story at every table. Students repeat the player’s last public act with embellishments, the High Table set waits to see which way to jump, and Kerr has started writing things down.',
        },
        {
          upTo: 80,
          behaviour:
            'The whole academy is talking and the Board has noticed. Doors close a beat early, a governor asks the Duke a pointed question at lunch, and the scholarship table goes silent as one when the player passes. Every public act is now evidence.',
        },
        {
          upTo: 100,
          behaviour:
            'The Board is drafting paperwork. The player is a matter rather than a person, the Duke is spending money to contain it, and anything done in public tonight decides whether there is a tomorrow at this academy at all.',
        },
      ],
    },
    {
      id: 'script',
      name: 'Script',
      max: 100,
      start: 80,
      regenPerHour: -1,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The book has let go entirely. Nothing the player remembers will happen unless somebody chooses it, and nobody on this campus is fated to anything, least of all the player.',
      color: '#6F5FA8',
      bands: [
        {
          upTo: 30,
          behaviour:
            'Off the page. People do what they would actually do, and the player’s foreknowledge is mostly stale: scenes they remember simply fail to happen, and new ones arrive that nobody wrote. Nobody is fated to anything any more, including the player.',
        },
        {
          upTo: 65,
          behaviour:
            'The chapter bends but holds its shape. Scenes the player dodged come back by another door: the duel is rescheduled rather than dropped, the note still arrives, somebody says a line from the book in a slightly different order. Foreknowledge is useful and a little wrong.',
        },
        {
          upTo: 100,
          behaviour:
            'On rails. Whatever the player does, the day keeps arriving at the book’s scenes, and people find themselves saying their lines almost word for word. Foreknowledge is perfectly accurate, which is the problem: everything the player remembers is still going to happen, midnight included.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'pages_you_remember',
      name: 'What You Remember of Chapter Three',
      tags: ['quest', 'memory'],
      questItem: true,
      droppable: false,
      description:
        'Not an object. The chapter as you read it, in the order it happens: the insult in the courtyard at mid-morning, which the book finishes, word for word, "...commoner trash should thank the gods a Grauen let it through the gate"; the duel chalked on the board at the noon bell; the Ring at dusk, nine seconds, a low cut, the shoulder, the disarm; a note under the door after dark; the iron door under the chapel standing open; the Cold Ember waking; the chapel steps at the midnight bell, and Cassian Dray’s practice sword turning to light.',
      loreText:
        'The last line, which you remember word for word because you rolled your eyes at it: "Nobody mourned Severin Grauen, not even the man who had dressed him every morning for fourteen years." Every scene you change, the next page of it goes a little grey at the edges.',
      icon: 'book',
    },
    {
      id: 'grauen_sword',
      name: 'The Grauen Sword',
      tags: ['weapon', 'personal'],
      skillModifiers: { swordplay: 1 },
      description: 'A slim dueling sword chased in silver, perfectly balanced and never once used in earnest. The body knows the grip better than you do.',
      loreText: 'Four Grauen heirs have carried it to Vellmar. Three of them came back. The book does not say what happened to it after chapter three.',
      icon: 'sword',
    },
    {
      id: 'grauen_signet',
      name: 'The Grauen Signet',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'A heavy silver ring with the house’s grey tower cut into it. Pressed into wax it signs for money, opens the lodge’s doors, and settles or calls in a debt in your father’s name.',
      loreText: 'Giving it back is the only way a Grauen heir has ever left the house alive. Two have done it in two hundred years.',
      icon: 'ring',
    },
    {
      id: 'severin_pocketbook',
      name: 'Severin’s Pocketbook',
      tags: ['document', 'personal'],
      skillModifiers: { canon: 1 },
      description:
        'Calfskin, from the inside pocket of the coat: appointments, grudges, a list of people who owe him money, and one page torn out near the back.',
      loreText: 'The torn page’s stub still shows the top of one word in his handwriting: "Mother". The book never gave him one.',
      icon: 'book',
    },
    {
      id: 'ring_gloves',
      name: 'The Ring Gloves',
      tags: ['gear', 'personal'],
      skillModifiers: { swordplay: 1 },
      description:
        'Grey calfskin dueling gloves, broken in by somebody who practised far more than you would have guessed. Severin trained alone, it turns out, at night.',
      loreText: 'The palms are worn through in exactly the places a man wears them practising the same parry ten thousand times. The book said he was lazy.',
      icon: 'gloves',
    },
    {
      id: 'viveka_letters',
      name: 'A Hundred and Forty Letters',
      tags: ['document', 'personal'],
      skillModifiers: { insight: 2 },
      description:
        'A box in the desk drawer: a hundred and forty letters on Sorrel green paper, numbered in the corner, most of the seals unbroken.',
      loreText: 'Letter ninety-one is about a hawk. It begins: "You never answered about the hawk, so I have decided it lived."',
      icon: 'letter',
    },
    {
      id: 'duke_letter',
      name: 'The Order',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Four lines on the Duke’s grey paper in his own hand: "Leave the undercroft door unlocked tonight. See that my son hears what lies beneath it. Burn this. U.G."',
      loreText: 'It has not been burned. It has been folded and unfolded so often that the crease has worn through at one corner.',
      icon: 'letter',
    },
    {
      id: 'undercroft_key',
      name: 'The Undercroft Key',
      tags: ['quest', 'key'],
      questItem: true,
      description: 'Black iron, as long as a hand, warm from being carried against somebody’s chest all day.',
      loreText: 'There are two. The other hangs on a hook in the Master-at-Arms’s quarters under the Ring and has not moved in twenty years.',
      icon: 'key',
    },
    {
      id: 'mill_ledger',
      name: 'The Ledger Page',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A page torn from a House Grauen debt ledger: the Wynn mill, North March, seized for arrears last winter, the account marked closed in the Duke’s hand.',
      loreText: 'The arrears were eleven gold crowns. The mill was worth four hundred.',
      icon: 'papers',
    },
    {
      id: 'founders_record',
      name: 'The Sealing Record',
      tags: ['document'],
      skillModifiers: { ember_lore: 2 },
      description:
        'A brittle founders’ document from the archive cage: how the undercroft was sealed two hundred years ago, with a Grauen hand and seven words, and a note in the margin that the words work only in a Grauen’s mouth.',
      loreText: 'The Grauen who sealed it was the first duke’s own brother. The record does not say what it cost him, which is how you know it cost him something.',
      icon: 'scroll',
    },
    {
      id: 'cold_ember',
      name: 'The Cold Ember',
      tags: ['quest', 'relic'],
      questItem: true,
      description:
        'A stone the size of a fist, black as old coal, that frosts the air around it. It is not asleep, exactly. It is waiting for a hand with your name in it.',
      loreText:
        'In every story the house tells about it, it gives a Grauen everything they ask for and takes the one who woke it. The book never said what it gave Severin. You are fairly sure it was nothing.',
      icon: 'gem',
    },
  ],
  abilities: [
    {
      id: 'take_it_back',
      name: 'Take It Back',
      tags: ['social'],
      description: 'Unsay the villain’s line: apologise, retract, or turn the sentence into something Severin Grauen would never have finished it with.',
      affordances: ['apologise', 'apologize', 'take it back', 'say sorry', 'unsay it', 'retract it', 'finish it differently'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_the_villain',
      name: 'Play the Villain',
      tags: ['social'],
      description: 'Use the Grauen name, the drawl and the look everybody is expecting. It works, and every time it works the day leans closer to the book.',
      affordances: ['sneer', 'threaten', 'intimidate', 'pull rank', 'use my name', 'play the villain', 'finish the sentence', 'finish the line', 'insult'],
      costs: [
        { resourceId: 'script', amount: 10 },
        { resourceId: 'scandal', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'menace', baseDc: 10 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'break_character',
      name: 'Break Character',
      tags: ['social'],
      description: 'Do the one thing Severin Grauen would never do, in front of people who know it: bow, carry, thank, sit at the wrong table.',
      affordances: ['bow', 'help', 'carry it', 'thank him', 'thank her', 'sit with them', 'say please', 'kneel'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_ahead',
      name: 'Read Ahead',
      tags: ['sight'],
      description: 'Think back to the book: what it said happens next, here, to this person. Acting on it leans the day toward the book.',
      affordances: ['remember the book', 'think back', 'recall the chapter', 'what happens next', 'read ahead', 'what did the novel say'],
      costs: [
        { resourceId: 'composure', amount: 4 },
        { resourceId: 'script', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'canon', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_them',
      name: 'Read Them',
      tags: ['sight'],
      description: 'Look at the person in front of you instead of the character you remember, and see what they want.',
      affordances: ['watch her', 'watch him', 'read him', 'read her', 'look closer', 'study them', 'look around'],
      costs: [{ resourceId: 'composure', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'insight', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cross_blades',
      name: 'Cross Blades',
      tags: ['combat'],
      description: 'Draw and fight. In the Ring it is the Code. Anywhere else it is a scandal and very probably an expulsion.',
      affordances: ['duel', 'fight', 'draw my sword', 'cross swords', 'attack', 'parry', 'accept the duel', 'lunge'],
      costs: [
        { resourceId: 'composure', amount: 12 },
        { resourceId: 'scandal', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'swordplay', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_your_ground',
      name: 'Stand Your Ground',
      tags: ['social'],
      description: 'Refuse. Do not flinch, do not run, do not explain. Hold the stare until somebody else looks away.',
      affordances: ['refuse', 'stand firm', 'say no', 'hold my ground', 'stare back', 'stay put', 'do not back down'],
      costs: [{ resourceId: 'composure', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'strike_a_bargain',
      name: 'Strike a Bargain',
      tags: ['social'],
      description: 'Offer something: money, the signet, a favour, a secret, a better plan. Everybody here wants something the book never mentioned.',
      affordances: ['offer', 'bargain', 'make a deal', 'bribe', 'trade', 'promise', 'negotiate'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'intrigue', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Leave a scene before it finishes, or get somewhere without anybody noticing a duke’s heir went there.',
      affordances: ['leave', 'walk away', 'sneak', 'hide', 'slip away', 'walk off', 'go around them'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'stealth', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'wing_it',
      name: 'Wing It',
      tags: ['social'],
      description: 'Say something, anything, that gets you through a conversation the book never wrote.',
      affordances: ['wing it', 'improvise', 'make it up', 'bluff', 'think fast', 'play it by ear', 'change the subject'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'improvise', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'answer_the_ember',
      name: 'Answer the Ember',
      tags: ['utility'],
      description: 'Put your hand on the thing your family buried and let it wake. It will offer everything. Holding on to yourself while it does is the whole trick.',
      affordances: ['touch the ember', 'wake it', 'take it', 'answer it', 'hold the stone', 'let it in'],
      costs: [
        { resourceId: 'composure', amount: 15 },
        { resourceId: 'script', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'ember_lore', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['visited:the_undercroft'],
        lockedCopy: 'There is nothing here to answer. Whatever your family left under the chapel, you have not stood in front of it yet.',
      },
    },
    {
      id: 'close_the_door',
      name: 'Close the Door',
      tags: ['utility'],
      description: 'Say the founders’ seven words with a Grauen hand flat on the stone, and shut the undercroft for good.',
      affordances: ['seal it', 'close the door', 'say the words', 'shut it for good', 'seal the undercroft', 'lock it forever'],
      costs: [{ resourceId: 'composure', amount: 18 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'ember_lore', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_sealing'],
        lockedCopy: 'You know the door exists. You do not know how somebody made it stay shut two hundred years ago, and guessing in the dark is how the book’s version of you died.',
      },
    },
  ],
  locations: [
    {
      id: 'founders_courtyard',
      name: 'The Founders’ Courtyard',
      shortName: 'Courtyard',
      description:
        'Pale flagstones inside a cloister, a dry fountain with four bronze founders, and the bell tower at the north corner that rings noon and midnight. This is where first-years are welcomed and where, this morning, two hundred of them have stopped talking. Arches lead to the great hall, the Ring, the East Wing, the library, the governors’ lodge, the chapel, the low dormitory and the main gate.',
      artDirection:
        'Grand stone academy courtyard inside a cloister, mid-morning sun, a dry fountain with four bronze statues, a bell tower, a crowd in grey academy coats frozen mid-conversation. Bright, tense, theatrical.',
      connections: [
        { to: 'great_hall', travelMinutes: 2, label: 'Into the great hall' },
        { to: 'dueling_ring', travelMinutes: 4, label: 'Down to the Ring' },
        { to: 'east_wing', travelMinutes: 3, label: 'Up to the East Wing' },
        { to: 'founders_library', travelMinutes: 3, label: 'Across to the library' },
        { to: 'governors_lodge', travelMinutes: 5, label: 'Up the hill to the governors’ lodge' },
        { to: 'chapel_steps', travelMinutes: 4, label: 'Round to the old chapel' },
        { to: 'low_dormitory', travelMinutes: 6, label: 'Out past the stables' },
        { to: 'the_gate_road', travelMinutes: 6, label: 'Out through the main gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'great_hall',
      name: 'The Great Hall',
      shortName: 'Great Hall',
      description:
        'Long oak tables under tall windows, the High Table on its dais where the governors and the noble students sit, and the long scholarship table by the kitchen doors where the commoners eat. Where you sit says everything. The kitchens are through the swinging doors at the far end; the courtyard is back through the arch.',
      artDirection:
        'Vast academy dining hall, tall arched windows, a raised high table with silver, a long plain table near swinging kitchen doors, banners in grey and green. Warm light, sharp social geography.',
      connections: [
        { to: 'founders_courtyard', travelMinutes: 2, label: 'Back to the courtyard' },
        { to: 'the_kitchens', travelMinutes: 1, label: 'Through the kitchen doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_kitchens',
      name: 'The Kitchens',
      shortName: 'Kitchens',
      description:
        'Copper pots, a bread oven the size of a cart, and nine people shouting orders at each other in a good mood. Cassian Dray works here between lectures to pay for them. The back door opens on the yard of the low dormitory; the swinging doors lead back to the great hall.',
      artDirection:
        'Busy academy kitchen, copper pots hanging, a huge brick bread oven, steam, flour, crates of onions, a back door open on a stable yard. Warm, loud, honest.',
      connections: [
        { to: 'great_hall', travelMinutes: 1, label: 'Back into the hall' },
        { to: 'low_dormitory', travelMinutes: 2, label: 'Out the back door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'low_dormitory',
      name: 'The Low Dormitory',
      shortName: 'Low Dormitory',
      description:
        'Scholarship rooms over the old stables, reached by an outside stair. Narrow beds, shared washstands, and a corridor where eighty commoners argue about the written assessment until lights out. Elara and Cassian both live here. The yard door leads to the kitchens; a lane runs back to the courtyard.',
      artDirection:
        'Converted stable dormitory, an outside wooden stair, narrow rooms with plain beds, lamplight in small windows, a stable yard below. Poor, crowded, close.',
      connections: [
        { to: 'the_kitchens', travelMinutes: 2, label: 'Through the yard to the kitchens' },
        { to: 'founders_courtyard', travelMinutes: 6, label: 'The lane back to the courtyard' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'dueling_ring',
      name: 'The Ring',
      shortName: 'The Ring',
      description:
        'A circle of raked sand inside tiered stone stands, with a chalk board at the entrance where the day’s duels are posted. Kerr’s quarters are under the stands, and a second iron key hangs on a hook by her door. The only way in or out is the tunnel back to the courtyard.',
      artDirection:
        'Stone dueling arena with tiered stands, raked pale sand, lamps on iron posts, a chalk board at the entrance tunnel, dusk sky. Ceremonial and harsh.',
      connections: [{ to: 'founders_courtyard', travelMinutes: 4, label: 'The tunnel back to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [],
    },
    {
      id: 'east_wing',
      name: 'The East Wing',
      shortName: 'East Wing',
      description:
        'The nobles’ residence: a carpeted gallery of suites. Yours is the corner one, with Felis’s pantry off the hall, a desk with a locked drawer, and a window that looks straight down at the chapel. Lady Viveka Sorrel’s rooms are across the gallery. The stair goes down to the courtyard.',
      artDirection:
        'Elegant academy residence suite, dark wood and grey silk, a writing desk under a tall window overlooking a chapel spire, a butler’s pantry door ajar. Rich, cold, lonely.',
      connections: [{ to: 'founders_courtyard', travelMinutes: 3, label: 'Down to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'viveka_letters', qty: 1, ownerId: null, aka: ['letters', 'her letters', 'the box of letters', 'the green letters'] },
        { itemId: 'duke_letter', qty: 1, ownerId: 'felis', aka: ['the order', 'the letter in his pocket', 'the duke’s letter', 'his orders'] },
        { itemId: 'undercroft_key', qty: 1, ownerId: 'felis', aka: ['key', 'the key', 'the iron key', 'crypt key'] },
      ],
    },
    {
      id: 'founders_library',
      name: 'The Founders’ Library',
      shortName: 'Library',
      description:
        'Three floors of stacks around a reading room, and at the back a locked archive cage of founders’ documents that nobody has asked to see in years, among them the founders’ record of how the undercroft was sealed. Elara studies here in the afternoons with the same page open for an hour. The doors open back onto the courtyard.',
      artDirection:
        'Old academy library, three galleried floors of shelves, a reading room with green lamps, an iron archive cage at the back full of rolled documents. Dusty gold light.',
      connections: [{ to: 'founders_courtyard', travelMinutes: 3, label: 'Back to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [
        { itemId: 'founders_record', qty: 1, ownerId: null, aka: ['record', 'the sealing record', 'the founders’ record', 'the old document'] },
      ],
    },
    {
      id: 'governors_lodge',
      name: 'The Governors’ Lodge',
      shortName: 'Lodge',
      description:
        'A grey stone house on the hill above the courtyard where the Board of Governors sits, and where Duke Ulric Grauen is staying this week. A long table, a clock in the hall that strikes the quarters, and the Duke’s papers squared on a side desk. The path runs back down to the courtyard.',
      artDirection:
        'Austere grey stone lodge interior, a long polished boardroom table, a tall clock, a side desk with neatly stacked papers, a cold fireplace. Powerful and quiet.',
      connections: [{ to: 'founders_courtyard', travelMinutes: 5, label: 'Down the hill to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [
        { itemId: 'mill_ledger', qty: 1, ownerId: 'duke_grauen', aka: ['ledger', 'the ledger page', 'the debt page', 'the mill page'] },
      ],
    },
    {
      id: 'chapel_steps',
      name: 'The Chapel Steps',
      shortName: 'Chapel Steps',
      description:
        'Seven worn steps up to the old chapel, which nobody uses for services any more. Inside, beside the altar, a stair goes down to an iron crypt door that is meant to stay locked. This is where the book ends you at the midnight bell. A path leads back round to the courtyard.',
      artDirection:
        'Old stone chapel exterior at night, seven worn steps, a single lamp, the bell tower beyond, inside a glimpse of a narrow stair down to an iron door. Quiet, cold, fateful.',
      connections: [
        { to: 'founders_courtyard', travelMinutes: 4, label: 'Back round to the courtyard' },
        { to: 'the_undercroft', travelMinutes: 2, lockedByFlag: 'vault_open', label: 'Down through the iron door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_undercroft',
      name: 'The Undercroft',
      shortName: 'Undercroft',
      description:
        'A low vault under the chapel, older than the academy above it, with seven founders’ marks cut into the walls. In the middle, on a bare stone, the Cold Ember frosts the air. The only way out is the stair back up to the chapel.',
      artDirection:
        'Ancient low stone vault beneath a chapel, carved marks on the walls, frost on the floor, a black stone on a plain plinth giving off cold pale light. Still, ominous, sacred.',
      connections: [{ to: 'chapel_steps', travelMinutes: 2, label: 'Back up the stair' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: 0 },
      takeableItems: [
        { itemId: 'cold_ember', qty: 1, ownerId: null, aka: ['ember', 'the ember', 'the stone', 'the relic'] },
      ],
    },
    {
      id: 'the_gate_road',
      name: 'The Gate and the Road Down',
      shortName: 'The Gate',
      description:
        'The academy’s main gate, a porter’s lodge, and the long road winding down the hill to the town and the river. Beyond the second bend nobody up here can see you. The gate leads back into the courtyard.',
      artDirection:
        'Tall iron academy gate in a stone wall, a porter’s lodge, a dirt road winding down a green hill to a river town. Open sky, freedom and exile in one frame.',
      connections: [{ to: 'founders_courtyard', travelMinutes: 6, label: 'Back through the gate' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_academy',
      name: 'The Board of Governors',
      description:
        'Seven governors, the Master-at-Arms who enforces their Code, and two hundred years of rules written by people who sealed something under the chapel and did not write down why. Your father chairs the Board this year.',
      startingReputation: 15,
      ranks: [
        { atReputation: -30, label: 'On notice' },
        { atReputation: 0, label: 'Enrolled' },
        { atReputation: 35, label: 'In good standing' },
        { atReputation: 65, label: 'Trusted with keys' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_grauen',
      name: 'House Grauen',
      description:
        'Your father’s house: the North March, its failing mines and mortgages, forty retainers and a seat on the Crown Council it is about to lose. It has spent one Grauen a generation on its wars, debts and marriages for two hundred years, and does not discuss it.',
      startingReputation: 40,
      ranks: [
        { atReputation: 0, label: 'A disappointment' },
        { atReputation: 40, label: 'Heir' },
        { atReputation: 70, label: 'Indispensable' },
      ],
      allies: [],
      enemies: ['faction_commons'],
    },
    {
      id: 'faction_commons',
      name: 'The Scholarship Table',
      description:
        'Eighty students who got in on merit and a stipend, eat at the long table by the kitchen doors, and know exactly what House Grauen’s seal looks like on an eviction notice. Elara Wynn is the one they would follow.',
      startingReputation: -25,
      ranks: [
        { atReputation: -50, label: 'The enemy' },
        { atReputation: 0, label: 'Watched' },
        { atReputation: 40, label: 'Welcome at the table' },
      ],
      allies: [],
      enemies: ['faction_grauen'],
    },
    {
      id: 'faction_gilt',
      name: 'The High Table Set',
      description:
        'The noble first- and second-years who sit near the governors, expected Severin to lead them in sneering, and will turn on him the moment it is fashionable.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'Out of fashion' },
        { atReputation: 30, label: 'One of us' },
        { atReputation: 60, label: 'Leading the room' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'elara',
      name: 'Elara Wynn',
      role: 'The heroine of the book: a scholarship swordswoman from the North March, and the woman whose sword decides how your first day ends',
      cardBlurb:
        'In the book she beats you in nine seconds and never thinks about you again. In person she has a reason for that duel the author never wrote down, and she is furious that you are not saying your line.',
      pronouns: 'she/her',
      publicTraits: ['Proud to the point of danger', 'The fastest blade in the first year', 'Funny, when she forgets to be angry'],
      hiddenDrives: [
        'She needs to beat a Grauen in public on the first day, because a commoner who does that is untouchable for four years',
        'She wants the mill back and has no plan for it that does not involve a sword',
      ],
      values: ['A debt is paid in full or not at all', 'Saying it to somebody’s face'],
      fears: [
        'Being sent home in the first term with nothing to show her mother',
        'Finding out she is exactly the kind of person who enjoys hurting a noble',
      ],
      socialStyle:
        'Squares up to everything first and decides later whether it deserved it. Watches hands, not faces.',
      boundaries: [
        'Will not accept charity from House Grauen, however it is dressed up',
        'Will not fight anybody outside the Ring, because that is how commoners get expelled while nobles get fined',
      ],
      goals: ['Win the duel at dusk in front of everyone', 'Pass the written assessment she is quietly failing'],
      secrets: [
        {
          id: 'elara_the_mill',
          fact: 'House Grauen seized her family’s mill on the North March for eleven crowns of debt last winter. Her mother now rents a room above a tannery. The eviction notice carried the Grauen seal.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you on the empty stands of the Ring after dark, if you have stopped trying to make her like you and asked what your house did to her.',
        },
        {
          id: 'elara_the_assessment',
          fact: 'She is failing the written half of the assessment, which is set in old legal script she was never taught, and will lose her scholarship at midterm unless somebody helps her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you find her in the library with the same page open for an hour and do not make a joke about it.',
        },
      ],
      speechStyle:
        'Clipped North March speech. Short sentences that end like a door shutting. Says "my lord" as an insult. Asks questions she intends to win. When she laughs it surprises her and she resents it.',
      topics: ['the duel', 'the Code', 'the North March', 'the mill', 'the written assessment', 'sword forms'],
      voiceSamples: [
        'Go on, my lord. Finish it. I want every one of them to hear you.',
        'You apologised. In front of two hundred people. Do you have any idea what that just cost me?',
        'Low cut, then the shoulder. Everybody knows it. Nobody stops it.',
        'My mother sweeps a floor that belongs to your father now. Say sorry for that, since you are suddenly so good at it.',
        'Don’t look at me like that. I laughed by accident.',
      ],
      appearance:
        'An adult woman, tall and rangy, dark hair cropped at the jaw and pinned back with a plain hairpin, a grey academy coat with a scholarship pin and a mended cuff, a plain soldier’s sword with a worn leather grip.',
      visualHook: 'Her thumb always resting on the guard of a plain soldier’s sword in an old scabbard.',
      silhouette: 'Feet planted, chin up, one hand on the hilt and the other holding her coat back from it.',
      artSeed: 'tvd3-elara-01',
      portrait: null,
      expressions: ['neutral', 'angry', 'defiant', 'surprised', 'amused', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'low_dormitory', activity: 'in her narrow room above the stables, sleeping badly' },
        { startMinute: 360, endMinute: 540, locationId: 'dueling_ring', activity: 'drilling the same low cut on the empty sand' },
        { startMinute: 540, endMinute: 660, locationId: 'founders_courtyard', activity: 'at the first-year welcome, hand on her sword' },
        { startMinute: 660, endMinute: 780, locationId: 'great_hall', activity: 'at the scholarship table, not eating much' },
        { startMinute: 780, endMinute: 1080, locationId: 'founders_library', activity: 'staring at one page of old legal script' },
        { startMinute: 1080, endMinute: 1200, locationId: 'dueling_ring', activity: 'on the sand, waiting for dusk or for nobody' },
        { startMinute: 1200, endMinute: 1440, locationId: 'low_dormitory', activity: 'oiling her sword on the outside stair' },
      ],
      homeLocationId: 'low_dormitory',
      knowledgeScope: ['elara', 'north_march', 'duel_code', 'scholarship_table', 'the_ring', 'grauen_debts'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 5, rivalry: 60 },
      gates: [
        {
          id: 'elara_tells_you_why',
          label: 'She tells you why she needed the duel',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['first_scene_over'] },
        },
        {
          id: 'elara_spars',
          label: 'She offers to spar with you, properly',
          kind: 'ALLIANCE',
          requires: { respect: 50 },
        },
        {
          id: 'elara_off_the_page',
          label: 'She stops seeing the villain',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65, flagsSet: ['knows:the_mill'] },
        },
      ],
      attributes: { might: 12, agility: 16, mind: 11, presence: 13, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 16, damage: 9, tags: ['duelist', 'scholarship'] },
    },
    {
      id: 'cassian',
      name: 'Cassian Dray',
      role: 'The hero of the book: a carter’s son on a scholarship, working the kitchens to pay for it, who in the book’s version of tonight ends you on the chapel steps',
      cardBlurb:
        'He is kind, he is underestimated, and he is supposed to kill you at midnight. He also keeps looking at your face as if he has seen it before, and he has no idea where.',
      pronouns: 'he/him',
      publicTraits: ['Kind without making a show of it', 'Gives every opponent three passes', 'Has never once thought of himself as the main character'],
      hiddenDrives: [
        'He wants to be good enough that nobody can send him back to the carts',
        'He has dreamed about the chapel steps for a month and wants it to stop',
      ],
      values: ['Nobody eats alone if he can help it', 'You step in, always, even when it costs you'],
      fears: [
        'That there is something in him that wants to hurt people, and the dream is it',
        'Being a burden on the people who sponsor his scholarship',
      ],
      socialStyle:
        'Helpful to the point of invisibility. Notices who has not eaten. Goes very still and very quiet when somebody is being cruel, and then steps in.',
      boundaries: ['Will not strike first, ever', 'Will not stand by while somebody is humiliated, noble or not'],
      goals: ['Keep his kitchen job and his scholarship both', 'Find out why he keeps dreaming of a stranger on the chapel steps'],
      secrets: [
        {
          id: 'cassian_the_dream',
          fact: 'For a month he has dreamed the same thing: the chapel steps, the midnight bell, a noble with silver-grey hair at the bottom of them, and his own practice sword turning to light. He saw that face for the first time this morning in the courtyard. It was yours.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you, haltingly, if you have helped him with something ordinary — a crate, a pot, a delivery — and then asked whether he sleeps well.',
        },
        {
          id: 'cassian_the_cart',
          fact: 'He grew up three villages from the Wynn mill and was at the eviction last winter, hired to load the family’s cart. Elara does not remember him, and he has not told her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask him what he thinks of your house rather than of you.',
        },
      ],
      speechStyle:
        'Earnest and plain; thinks aloud and apologises for being in the way. Kitchen and road words — onions, axles, carts. Asks one honest question at a time and actually waits for the answer.',
      topics: ['the kitchens', 'carts and roads', 'the dream', 'sparring', 'who has eaten', 'Elara'],
      voiceSamples: [
        'Sorry — sorry, the crate’s heavier than it looks. Are you all right? You went white as flour.',
        'I’ve seen you before. That sounds daft. I just can’t think where.',
        'My da says a cart that squeaks is a cart that’s honest about it. I think about that a lot.',
        'Three passes. I always give them three. After that it isn’t sparring any more.',
        'Who’s eaten today? Not you. Sit. There’s bread.',
      ],
      appearance:
        'An adult man, broad through the shoulders from hauling, sandy hair that will not lie flat, a kitchen apron over a plain grey coat, a wooden practice sword with a cracked hilt bound in kitchen string tucked through his belt.',
      visualHook: 'A wooden practice sword with its hilt bound in kitchen string, carried everywhere.',
      silhouette: 'Shoulders hunched slightly to look smaller than he is, a crate of onions on one hip.',
      artSeed: 'tvd3-cassian-01',
      portrait: null,
      expressions: ['neutral', 'earnest', 'worried', 'surprised', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'low_dormitory', activity: 'sleeping, and dreaming of the chapel steps again' },
        { startMinute: 330, endMinute: 540, locationId: 'the_kitchens', activity: 'lighting the bread oven and hauling flour' },
        { startMinute: 540, endMinute: 660, locationId: 'founders_courtyard', activity: 'carrying crates through the first-year welcome' },
        { startMinute: 660, endMinute: 900, locationId: 'the_kitchens', activity: 'washing pots after the lunch service' },
        { startMinute: 900, endMinute: 1080, locationId: 'dueling_ring', activity: 'practising alone in a corner of the stands' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_kitchens', activity: 'working the dinner service' },
        { startMinute: 1260, endMinute: 1440, locationId: 'low_dormitory', activity: 'lying awake, trying not to fall asleep' },
      ],
      homeLocationId: 'low_dormitory',
      knowledgeScope: ['cassian', 'the_kitchens', 'north_march', 'the_dream', 'scholarship_table'],
      startingRelationship: { trust: 15, affection: 10, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'cassian_the_dream_gate',
          label: 'He tells you about the dream',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'cassian_second_lead',
          label: 'He starts treating you as a friend he will have to fight',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 45 },
        },
      ],
      attributes: { might: 15, agility: 13, mind: 10, presence: 11, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 15, damage: 8, tags: ['hero', 'holds_back'] },
    },
    {
      id: 'felis',
      name: 'Felis Corran',
      role: 'Your butler, who has dressed you every morning for fourteen years and is carrying an order from your father he has not decided whether to obey',
      cardBlurb:
        'He has served you for fourteen years, knows exactly how cruel you used to be, and has a letter in his coat that the book only explains forty chapters too late. Treat him like furniture and you will find out what it says the hard way.',
      pronouns: 'he/him',
      publicTraits: ['Impeccable', 'Unreadable', 'Funnier than anybody notices'],
      hiddenDrives: [
        'He wants, once, to be thanked by the person he has given fourteen years to',
        'He wants a reason not to obey the Duke that is better than his own conscience, because his conscience has lost to the Duke before',
      ],
      values: ['Service done properly is a form of respect, even when the master does not deserve it', 'A promise made to a dying woman outranks an order from a living man'],
      fears: ['That he will do what he is told tonight, the way he always has', 'That he made Severin what he became by never once telling him no'],
      socialStyle:
        'Anticipates. Has your coat before you are cold and your excuse before you need it. Never contradicts you in public, and always does in private, by saying nothing at all. His gloved hand drifts to his coat pocket whenever anybody says the word chapel, and he does not know he does it.',
      boundaries: ['Will not lie to you directly; he will only decline to answer', 'Will not raise a hand against a Grauen, whatever the Grauen has done'],
      goals: ['Get through today without having to choose', 'Keep the promise he made to your mother, which was to look after you'],
      secrets: [
        {
          id: 'felis_the_order',
          fact: 'He carries a letter in the Duke’s own hand: leave the undercroft door unlocked tonight and see that my son hears what lies beneath it. The iron key is in the same pocket.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself if you have thanked him for something specific and then asked him, plainly, what is in the pocket he keeps touching.',
        },
        {
          id: 'felis_the_promise',
          fact: 'The late Duchess made him promise, at the end, to look after her son. He has decided, more than once, that he failed her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask him what you were like before you turned cruel, and you are sober about it.',
        },
      ],
      speechStyle:
        'Formal, dry, unhurried. Complete sentences with the commas audible. Deadpan understatement, and times given to the minute. "My lord" carries a different temperature every time, and that is the only way he ever tells you anything.',
      topics: ['your schedule', 'your father', 'the late Duchess', 'the chapel', 'what you used to be like', 'tea'],
      voiceSamples: [
        'Your coat, my lord. It is eleven minutes past ten, and you have, if I may say so, had a morning.',
        'I would never presume to an opinion. I merely observe that you have apologised to nobody in fourteen years, and the courtyard noticed.',
        'The pocket, my lord? Correspondence. Of a sort that improves with burning.',
        'Two sugars, since you ask. Nobody has asked before.',
        'Her Grace asked me to look after you. I have been trying, for some years, to work out whether I have.',
      ],
      appearance:
        'An adult man, lean and very straight, black hair silvering at the temples and combed flat, a charcoal tailcoat with grey piping, white gloves, and a pocket watch he checks without looking at it.',
      visualHook: 'White gloves, always, and a hand that drifts to his coat pocket whenever anybody says the word chapel.',
      silhouette: 'One step behind and to the left, hands clasped at the small of his back, perfectly still.',
      artSeed: 'tvd3-felis-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'guarded', 'surprised', 'warm', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'east_wing', activity: 'pressing coats in the pantry and not sleeping' },
        { startMinute: 540, endMinute: 680, locationId: 'founders_courtyard', activity: 'one step behind you at the welcome, holding your coat' },
        { startMinute: 680, endMinute: 960, locationId: 'east_wing', activity: 'in the pantry, reading one letter over and over' },
        { startMinute: 960, endMinute: 1020, locationId: 'governors_lodge', activity: 'attending His Grace at the audience' },
        { startMinute: 1020, endMinute: 1260, locationId: 'east_wing', activity: 'laying out your evening clothes' },
        { startMinute: 1260, endMinute: 1320, locationId: 'chapel_steps', activity: 'taking the walk he says is for his health' },
        { startMinute: 1320, endMinute: 1440, locationId: 'east_wing', activity: 'sitting up in the pantry with the lamp low' },
      ],
      homeLocationId: 'east_wing',
      knowledgeScope: ['felis', 'house_grauen', 'the_duke', 'the_late_duchess', 'the_order', 'severin_before'],
      startingRelationship: { trust: 40, affection: 45, respect: 15, fear: 20, rivalry: 0 },
      gates: [
        {
          id: 'felis_confides',
          label: 'He tells you what is in his pocket',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['spoke:felis'] },
        },
        {
          id: 'felis_yours',
          label: 'He chooses you over the house',
          kind: 'ALLIANCE',
          requires: { trust: 70, affection: 60 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 15, presence: 12, resolve: 11, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'viveka',
      name: 'Lady Viveka Sorrel',
      calledName: 'Viveka',
      role: 'Your fiancée by family arrangement, a second-year and heir of House Sorrel, who has written to you more than once a week for two years',
      cardBlurb:
        'She has sent you a hundred and forty letters, and most of them are still sealed in your desk drawer. The book gave her three lines and a cold stare. She has heard about the courtyard and wants to hear it from you, in person, today.',
      pronouns: 'she/her',
      publicTraits: ['The sharpest tongue on the High Table', 'Writes everything down', 'Kind where nobody can see it'],
      hiddenDrives: [
        'She wants to be the one to end the engagement, cleanly, before anybody can say she was jilted by a monster',
        'Under that, she wants the person who wrote back to her once, two years ago, to turn out to have been real',
      ],
      values: ['A letter deserves an answer', 'Never let them see you need anything'],
      fears: ['Being married to the man in the courtyard for the rest of her life', 'That nobody will ever read what she actually writes'],
      socialStyle:
        'Charming in public, precise in private. Treats a conversation like correspondence: says what she means once, then waits for the reply.',
      boundaries: ['Will not be pitied', 'Will not marry a man who cannot look at her while he lies'],
      goals: ['End the engagement on her own terms before term ends', 'Keep House Sorrel’s vote on the Board out of your father’s pocket'],
      secrets: [
        {
          id: 'viveka_the_hawk',
          fact: 'Two years ago, once, Severin wrote back: four lines about a hawk he had lost. She has kept it in her writing case ever since, and it is the reason she kept writing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you have read some of her letters and quote one back to her, she shows you the hawk letter.',
        },
        {
          id: 'viveka_the_vote',
          fact: 'House Sorrel holds the swing vote on the Board. Your father has offered to forgive a Sorrel debt in exchange for it, and her mother is inclined to accept.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her about the Board rather than about the engagement.',
        },
      ],
      speechStyle:
        'Arch and elegant: long sentences with a sting at the end. Writer’s vocabulary — drafts, postscripts, margins, seals. Asks the question she has rehearsed and then improvises when the answer comes back wrong.',
      topics: ['the letters', 'the engagement', 'the Board vote', 'the hawk', 'the High Table', 'your father'],
      voiceSamples: [
        'A hundred and forty letters, Severin. I numbered them. You may begin your reply with whichever you like.',
        'I heard about the courtyard before I had my gloves off. Tell me the version you would put in writing.',
        'If this engagement is ending, it ends in my handwriting.',
        'You wrote back once. Four lines, about a hawk. I would very much like to know who that was.',
        'Letter ninety-one, in case you never reached it: you never answered about the hawk, so I have decided it lived.',
      ],
      appearance:
        'An adult woman, slight and very upright, pale blonde hair in an elaborate braided crown, a deep green academy coat with a silver lily at the collar, ink on the side of her writing hand that she has stopped trying to hide.',
      visualHook: 'Ink on the side of her writing hand, always, however well she is dressed.',
      silhouette: 'Very straight, gloves held in one hand, head tilted as though reading you.',
      artSeed: 'tvd3-viveka-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'cold', 'surprised', 'hurt', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'east_wing', activity: 'writing at her desk across the gallery from yours' },
        { startMinute: 480, endMinute: 600, locationId: 'founders_library', activity: 'reading in the gallery before anybody else is up' },
        { startMinute: 600, endMinute: 840, locationId: 'governors_lodge', activity: 'sitting in on the Board for her mother' },
        { startMinute: 840, endMinute: 960, locationId: 'founders_courtyard', activity: 'looking for you, with her gloves in one hand' },
        { startMinute: 960, endMinute: 1140, locationId: 'founders_library', activity: 'drafting a letter she has not decided to send' },
        { startMinute: 1140, endMinute: 1260, locationId: 'great_hall', activity: 'at the High Table, being charming to people she dislikes' },
        { startMinute: 1260, endMinute: 1440, locationId: 'east_wing', activity: 'at her desk with the lamp up' },
      ],
      homeLocationId: 'east_wing',
      knowledgeScope: ['viveka', 'house_sorrel', 'the_board', 'the_engagement', 'high_table'],
      startingRelationship: { trust: 15, affection: 25, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'viveka_shows_the_hawk',
          label: 'She shows you the letter about the hawk',
          kind: 'TRUST',
          requires: { trust: 40, hasItems: ['viveka_letters'] },
        },
        {
          id: 'viveka_in_her_own_hand',
          label: 'She writes back as herself',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 16, presence: 15, resolve: 13, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'duke_grauen',
      name: 'Duke Ulric Grauen',
      calledName: 'Duke Grauen',
      role: 'Your father, chair of the academy’s Board of Governors this year, on campus today for reasons the book never gave',
      cardBlurb:
        'He has never once raised his voice to you, because he has never needed to. He wants to see you at four, and you know from the book that the man who goes under the chapel tonight was sent there by somebody.',
      pronouns: 'he/him',
      publicTraits: ['Patient as winter', 'Never raises his voice', 'Keeps every account in his head'],
      hiddenDrives: [
        'He means to wake the Cold Ember and hold it, and the Ember takes whoever wakes it, so he needs a Grauen he can spare',
        'He chose the son he had written off, and is irritated to find the choice no longer looks obvious',
      ],
      values: ['The house outlives everybody in it', 'A debt is a hold, not a grievance'],
      fears: ['House Grauen losing its seat on the Crown Council within the year', 'Being outplayed by somebody he raised'],
      socialStyle: 'Lets silence do his work. Offers a chair as though it were a test, and watches which one you take.',
      boundaries: ['Will never confess to anything in front of a witness', 'Will never wake the Ember with his own hand'],
      goals: ['See the Ember woken tonight by a Grauen who is not him', 'Keep the Board quiet about whatever his son did in the courtyard'],
      secrets: [
        {
          id: 'duke_the_order',
          fact: 'He wrote the order Felis carries, and the note that will be slipped under his son’s door tonight.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will never say it. He will let it be understood, once, if you show him the order in a room with no witnesses and do not raise your voice.',
        },
        {
          id: 'duke_the_ruin',
          fact: 'House Grauen is near ruin: the North March mines are failing, its debts are called in spring, and the Ember is the only card he has left.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you bring him a better bargain than the Ember — the Board, the commoners, the Crown — he tells you exactly how bad it is, because a man who brings an offer has earned the numbers.',
        },
      ],
      speechStyle:
        'Few words, every one of them weighed. Ledger language: cost, spend, worth, account, balance. Never asks a question he does not already know the answer to. Calls his son by his full name.',
      topics: ['the house', 'the Board', 'the courtyard', 'your worth', 'the Crown Council'],
      voiceSamples: [
        'Sit, Severin Grauen. Not that chair. That one.',
        'Everything this house owns has a cost written beside it. You have been an expensive line for a long time.',
        'The courtyard is paid for. Do not make me pay for it twice.',
        'Tell me what you are worth, and do it before the clock in the hall finishes striking.',
      ],
      appearance:
        'An older man, very tall, iron-grey hair swept back, a close grey beard, a long charcoal coat with a silver chain of office, gloved hands folded on the head of a black cane he does not need.',
      visualHook: 'A black cane he never leans on and uses only to point.',
      silhouette: 'Seated, upright and perfectly still at the far end of a long table.',
      artSeed: 'tvd3-duke-01',
      portrait: null,
      expressions: ['neutral', 'cold', 'calculating', 'displeased', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 660, locationId: 'governors_lodge', activity: 'at the long table with the Board’s papers' },
        { startMinute: 660, endMinute: 780, locationId: 'great_hall', activity: 'at the governors’ luncheon on the High Table' },
        { startMinute: 780, endMinute: 1440, locationId: 'governors_lodge', activity: 'in the lodge with the clock and the ledgers' },
      ],
      homeLocationId: 'governors_lodge',
      knowledgeScope: ['house_grauen', 'the_board', 'the_ember', 'the_order', 'north_march', 'crown_council'],
      startingRelationship: { trust: 10, affection: 5, respect: 5, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'duke_the_numbers',
          label: 'He tells you how bad the house’s accounts are',
          kind: 'TRUST',
          requires: { respect: 55, flagsSet: ['knows:the_order'] },
        },
        {
          id: 'duke_as_an_equal',
          label: 'He deals with you as his heir rather than his expense',
          kind: 'OTHER',
          requires: { respect: 70 },
        },
      ],
      attributes: { might: 11, agility: 9, mind: 17, presence: 17, resolve: 16, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'odalys',
      name: 'Odalys Kerr',
      calledName: 'Kerr',
      role: 'Master-at-Arms of the academy, keeper of the Duel Code and the Ring, and the only member of staff who walks past the chapel’s crypt door every night on purpose',
      cardBlurb:
        'She officiates the duel the book has you lose, she has expelled two dukes’ sons in twenty years, and she would very much like you to be the third. She is also the only person here who knows the crypt door is meant to stay locked.',
      pronouns: 'she/her',
      publicTraits: ['Scrupulously fair', 'Utterly unimpressed by titles', 'Faster than she looks'],
      hiddenDrives: [
        'Thirty years ago a Grauen beat her in the Ring with a dirty trick, and she has waited a long time to see that house humbled by the rules',
        'She was told the crypt door must never open, was never told why, and has come to suspect the reason has your family name on it',
      ],
      values: ['The Code applies to everybody or it applies to nobody', 'A yield is honourable; a forfeit is not'],
      fears: ['That the rules she has kept for twenty years were only ever there to hide something', 'Being the one on duty the night the crypt door opens'],
      socialStyle: 'Treats everybody exactly the same, which nobles experience as an insult and commoners as a miracle.',
      boundaries: ['Will not bend the Code for a title, a bribe, or a good reason', 'Will not let anybody into the undercroft without the Board’s written leave'],
      goals: ['Officiate a clean duel at dusk', 'See that no Grauen goes near the chapel tonight'],
      secrets: [
        {
          id: 'kerr_the_words',
          fact: 'She was taught the founders’ seven sealing words when she took the post, as every Master-at-Arms is, and was told they only work in a Grauen’s mouth. She has never said them aloud.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you have yielded honourably or fought cleanly in her Ring, and then asked her, without a title in your voice, what is under the chapel.',
        },
        {
          id: 'kerr_the_sand',
          fact: 'The Grauen who beat her in the Ring thirty years ago was your father. He threw sand.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her why she hates your family, she tells you this instead of answering.',
        },
      ],
      speechStyle:
        'Drill-yard cadence. Counts things out — paces, seconds, strikes. Quotes the Code by article. Never says more than she has to, and the last word is always hers.',
      topics: ['the Code', 'the Ring', 'dukes’ sons', 'the crypt door', 'yielding'],
      voiceSamples: [
        'Code or courtyard. Choose. You have until I finish counting, and I count fast.',
        'Article four. An insult before witnesses is withdrawn by the noon bell or answered at dusk. There is no article five.',
        'Nine seconds. That is how long a lazy man lasts against a fast one. Prove me wrong.',
        'I have rung this bell over two dukes’ sons on their way out of the gate. It has a good sound.',
        'Yield is a word. Say it and walk off my sand with your spine still in you.',
      ],
      appearance:
        'An older woman, compact and weathered, grey hair in a short braid, a scar across the bridge of her nose, a leather arming coat over a grey shirt, a brass bell on her belt and a blunt dueling sword across her shoulders.',
      visualHook: 'A small brass bell on her belt that starts and ends every duel.',
      silhouette: 'Arms folded, weight back on one heel, the sword resting across her shoulders.',
      artSeed: 'tvd3-kerr-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'unimpressed', 'surprised', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'dueling_ring', activity: 'raking the sand and checking the board' },
        { startMinute: 600, endMinute: 720, locationId: 'founders_courtyard', activity: 'walking the first-year welcome with her bell' },
        { startMinute: 720, endMinute: 1200, locationId: 'dueling_ring', activity: 'running drills, then presiding over the evening bouts' },
        { startMinute: 1200, endMinute: 1320, locationId: 'founders_courtyard', activity: 'on night rounds with a lantern' },
        { startMinute: 1320, endMinute: 1380, locationId: 'chapel_steps', activity: 'ending her rounds with a hand flat on the crypt door' },
        { startMinute: 1380, endMinute: 1440, locationId: 'dueling_ring', activity: 'in her quarters under the stands' },
      ],
      homeLocationId: 'dueling_ring',
      knowledgeScope: ['duel_code', 'the_ring', 'the_crypt_door', 'the_sealing_words', 'the_board'],
      startingRelationship: { trust: 5, affection: 0, respect: 0, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'kerr_tells_you_the_words',
          label: 'She tells you how the door was sealed',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['spoke:odalys'] },
        },
        {
          id: 'kerr_vouches',
          label: 'She speaks for you to the Board',
          kind: 'ALLIANCE',
          requires: { respect: 55 },
        },
      ],
      attributes: { might: 14, agility: 15, mind: 12, presence: 13, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 50, defenseDc: 18, damage: 10, tags: ['master_at_arms'] },
    },
  ],
  quests: [
    {
      id: 'q_chapter_three',
      title: 'The Villain Dies in Chapter Three',
      summary: 'The book gave you one day: an insult in the courtyard, a duel at dusk, a door under the chapel, and the chapel steps at the midnight bell.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['elara', 'cassian', 'felis', 'odalys'],
      involvedLocationIds: ['founders_courtyard', 'dueling_ring', 'chapel_steps'],
      knownRewardCopy: 'One minute past midnight, with you still in it.',
      steps: [
        {
          id: 'the_sentence',
          playerCopy: 'Finish the sentence, or don’t.',
          directorNotes:
            'Two hundred witnesses, a hand on a hilt, and a line the player half-said. Elara wants the duel: an apology does not relieve her, it robs her of the shield she planned, and she is furious in a new way. Kerr arrives within minutes because a hand on a hilt in the courtyard is her business, and she will say "Code or courtyard". Do not resolve this with a fight in the courtyard: steel drawn outside the Ring is an expulsion matter, and Kerr says so. Felis is one step behind the player holding the coat. Cassian is in the crowd with a crate and is looking at the player’s face too long.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'apologised',
              label: 'Take it back, in front of everyone',
              predicate: { flagsSet: ['used:take_it_back'] },
              setsFlags: ['apologised', 'knows:off_script'],
              closesFlags: ['finished_the_sentence'],
            },
            {
              routeId: 'finished_it',
              label: 'Finish the line the way the book did',
              predicate: { flagsSet: ['used:play_the_villain'] },
              setsFlags: ['finished_the_sentence', 'duel_called'],
              closesFlags: ['apologised'],
            },
            {
              routeId: 'broke_character',
              label: 'Do something Severin Grauen never would',
              predicate: { flagsSet: ['used:break_character'] },
              setsFlags: ['broke_character', 'knows:off_script'],
              closesFlags: [],
            },
            {
              routeId: 'walked_off',
              label: 'Walk away mid-sentence',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['walked_off', 'duel_called'],
              closesFlags: [],
            },
            {
              routeId: 'drew_on_her',
              label: 'Draw steel in the courtyard',
              predicate: { flagsSet: ['attacked:elara'] },
              setsFlags: ['drew_steel_outside_the_ring', 'duel_called'],
              closesFlags: ['apologised'],
            },
            {
              // The Code's own fallback: a line nobody took back by the noon
              // bell is a duel. Without it, any first reply that is none of the
              // above leaves the whole day waiting on this step.
              routeId: 'let_it_stand',
              label: 'Let the line stand until the noon bell',
              predicate: { afterWorldMinute: 12 * 60 },
              setsFlags: ['duel_called'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['first_scene_over'], abilities: [], reputation: [] },
        },
        {
          id: 'the_ring_at_dusk',
          playerCopy: 'Get through dusk.',
          directorNotes:
            'Under the Code an insult not taken back by the noon bell is a duel at dusk, chalked on the board outside the Ring. In the book she wins in nine seconds: a low cut at the leading knee, the shoulder, the disarm. If the player took it back, the duel is not posted, but Elara may challenge on her own account because she still needs it; the book pulls. A yield is honourable. Not turning up is a forfeit, and the whole academy hears about it by supper.',
          enterWhen: { flagsSet: ['first_scene_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fought_her',
              label: 'Fight Elara Wynn in the Ring',
              predicate: { flagsSet: ['used:cross_blades'], atLocation: 'dueling_ring' },
              setsFlags: ['fought_elara'],
              closesFlags: ['forfeited_the_duel'],
            },
            {
              routeId: 'yielded',
              label: 'Yield before the first pass',
              predicate: { flagsSet: ['duel_called', 'used:take_it_back'], atLocation: 'dueling_ring' },
              setsFlags: ['yielded_to_elara'],
              closesFlags: ['fought_elara'],
            },
            {
              routeId: 'cassian_stood_in',
              label: 'Let the hero stand in for her',
              predicate: {
                flagsSet: ['duel_called', 'spoke:cassian'],
                minRelationship: [{ characterId: 'cassian', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['cassian_stood_in'],
              closesFlags: ['fought_elara'],
            },
            {
              routeId: 'no_duel',
              label: 'There is no duel, because you made sure of it',
              predicate: { flagsSet: ['knows:off_script'], flagsUnset: ['duel_called'], afterWorldMinute: 18 * 60 + 30 },
              setsFlags: ['no_duel'],
              closesFlags: [],
            },
            {
              routeId: 'forfeited',
              label: 'Do not turn up',
              predicate: {
                flagsSet: ['duel_called'],
                flagsUnset: ['fought_elara', 'yielded_to_elara', 'cassian_stood_in'],
                afterWorldMinute: 19 * 60 + 30,
              },
              setsFlags: ['forfeited_the_duel'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['dusk_over'], abilities: [], reputation: [{ factionId: 'faction_commons', amount: 10 }] },
        },
        {
          id: 'midnight',
          playerCopy: 'Be alive at one minute past midnight.',
          directorNotes:
            'The book pulls hardest here. Whatever the player has done, Cassian walks to the chapel steps at ten to twelve without knowing why, unless the undercroft has been sealed. The player can be anywhere. What matters is the reason a scene happens, not its time: a player who woke the Ember and walks up those steps gets the chapter as written; a player who sits down beside Cassian and asks him whether he has eaten gets something the book never had. Death, if it comes, is one clean line.',
          enterWhen: { flagsSet: ['dusk_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'as_written',
              label: 'Walk up the chapel steps with the Ember awake',
              predicate: { flagsSet: ['woke_the_ember', 'cassian_on_the_steps'], atLocation: 'chapel_steps' },
              setsFlags: ['as_written'],
              closesFlags: ['survived_midnight'],
            },
            {
              routeId: 'sealed_before_midnight',
              label: 'Shut the door before the bell',
              predicate: { flagsSet: ['undercroft_sealed'] },
              setsFlags: ['survived_midnight'],
              closesFlags: ['as_written'],
            },
            {
              routeId: 'talked_on_the_steps',
              label: 'Sit down on the steps beside the hero',
              predicate: {
                flagsSet: ['spoke:cassian', 'cassian_on_the_steps'],
                flagsUnset: ['woke_the_ember'],
                atLocation: 'chapel_steps',
              },
              setsFlags: ['survived_midnight', 'steps_talked'],
              closesFlags: ['as_written'],
            },
            {
              routeId: 'kept_the_ember',
              label: 'Wake the Ember and keep yourself',
              predicate: { flagsSet: ['woke_the_ember', 'midnight_struck'], flagsUnset: ['as_written'] },
              setsFlags: ['survived_midnight', 'ember_kept'],
              closesFlags: ['as_written'],
            },
            {
              routeId: 'stayed_away',
              label: 'Be anywhere else when the bell goes',
              predicate: { flagsSet: ['midnight_struck'], flagsUnset: ['woke_the_ember'] },
              setsFlags: ['survived_midnight', 'stayed_away'],
              closesFlags: ['as_written'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['chapter_three_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_academy', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_open_door',
      title: 'Who Opened the Door',
      summary: 'In the book somebody left the undercroft unlocked and slipped a note under Severin’s door. The serial never got far enough to say who.',
      kind: 'MAIN',
      involvedCharacterIds: ['felis', 'duke_grauen'],
      involvedLocationIds: ['east_wing', 'governors_lodge', 'chapel_steps'],
      knownRewardCopy: 'The name the book never printed, and what you do about the man who was told to do it.',
      discoverWhen: { flagsSet: ['first_scene_over'] },
      steps: [
        {
          id: 'find_who',
          playerCopy: 'Find out who was told to leave the door open.',
          directorNotes:
            'Three ways to learn it and they are not equivalent. Felis telling you himself is the version where he has chosen you. Taking the order from his pocket is the version where you know something he did not give you, and he will know it was taken. Getting it out of the Duke is nearly impossible: he never confesses in front of a witness, but he will let it be understood once, alone, if the player is calm.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'felis_told_you',
              label: 'Felis tells you himself',
              predicate: { flagsSet: ['spoke:felis'], minRelationship: [{ characterId: 'felis', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_order', 'felis_confessed'],
              closesFlags: ['took_the_order'],
            },
            {
              routeId: 'found_the_order',
              label: 'Take the order from his pocket',
              predicate: { hasItems: ['duke_letter'] },
              setsFlags: ['knows:the_order', 'took_the_order'],
              closesFlags: ['felis_confessed'],
            },
            {
              routeId: 'father_let_it_show',
              label: 'Read it in your father’s face',
              predicate: { flagsSet: ['spoke:duke_grauen', 'used:read_them'], atLocation: 'governors_lodge' },
              setsFlags: ['knows:the_order', 'father_let_it_show'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['door_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'what_felis_does',
          playerCopy: 'Decide what happens to the man who was told to open it.',
          directorNotes:
            'Felis has not decided. The player’s treatment of him all day is the decision. Kindness specific enough to be believed gets the order burned in front of the player. Cruelty gets obedience, and possibly the player’s own dismissal of him, which he accepts with a bow and no argument. Doing nothing is a choice: he obeys, because he always has.',
          enterWhen: { flagsSet: ['knows:the_order'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'felis_refused',
              label: 'He burns the order',
              predicate: { flagsSet: ['spoke:felis'], minRelationship: [{ characterId: 'felis', dimension: 'affection', value: 55 }] },
              setsFlags: ['felis_refused'],
              closesFlags: ['felis_dismissed', 'felis_obeyed'],
            },
            {
              routeId: 'felis_dismissed',
              label: 'Dismiss him from your service',
              predicate: { flagsSet: ['used:play_the_villain', 'knows:the_order'] },
              setsFlags: ['felis_dismissed'],
              closesFlags: ['felis_refused'],
            },
            {
              routeId: 'felis_obeyed',
              label: 'Let him do as he was told',
              predicate: { flagsSet: ['vault_open'] },
              setsFlags: ['felis_obeyed'],
              closesFlags: ['felis_refused'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['felis_decided'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_your_father',
      title: 'Your Father Is on Campus',
      summary: 'Duke Ulric Grauen chairs today’s Board, has asked to see you at four, and was not in this chapter of the book at all.',
      kind: 'MAIN',
      involvedCharacterIds: ['duke_grauen', 'felis', 'viveka'],
      involvedLocationIds: ['governors_lodge'],
      knownRewardCopy: 'What your father wants from today, and what it costs you to give it to him or not.',
      discoverWhen: { flagsSet: ['summoned'] },
      steps: [
        {
          id: 'the_audience',
          playerCopy: 'Answer your father’s summons, or don’t.',
          directorNotes:
            'He is at the far end of the long table and does not look up when the door opens. He offers a chair as a test. He has already paid somebody about the courtyard. He will not mention the chapel. He is measuring whether the son he chose to spend is still the son he thinks he is, and a player who behaves unlike Severin makes him slightly, visibly uneasy.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'played_the_heir',
              label: 'Be the son he expects',
              predicate: { flagsSet: ['used:play_the_villain'], atLocation: 'governors_lodge' },
              setsFlags: ['played_the_heir'],
              closesFlags: [],
            },
            {
              routeId: 'met_him',
              label: 'Go, and be somebody he does not recognise',
              predicate: { flagsSet: ['spoke:duke_grauen'], atLocation: 'governors_lodge' },
              setsFlags: ['met_father'],
              closesFlags: [],
            },
            {
              routeId: 'ignored_him',
              label: 'Do not go',
              predicate: { flagsSet: ['summoned'], flagsUnset: ['spoke:duke_grauen'], afterWorldMinute: 17 * 60 },
              setsFlags: ['defied_father'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['father_met'], abilities: [], reputation: [{ factionId: 'faction_grauen', amount: 5 }] },
        },
        {
          id: 'the_reckoning',
          playerCopy: 'Decide what to do about a father who chose to spend you.',
          directorNotes:
            'Four honest answers. Exposing him needs proof and standing with the Board, and it makes the player the house, with all its debts. A bargain needs the player to offer him something worth more than the Ember. Renouncing the house is giving back the signet in his presence, which two Grauens in two hundred years have done. Holding the Ember makes him need the player, which is its own kind of villainy.',
          enterWhen: { flagsSet: ['knows:the_order'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'exposed_him',
              label: 'Lay his order before the Board',
              predicate: {
                hasItems: ['duke_letter'],
                minFactionReputation: [{ factionId: 'faction_academy', value: 35 }],
              },
              setsFlags: ['duke_exposed'],
              closesFlags: ['duke_bargain'],
            },
            {
              routeId: 'bargained',
              label: 'Make him a better offer than the Ember',
              predicate: { flagsSet: ['used:strike_a_bargain'], atLocation: 'governors_lodge' },
              setsFlags: ['duke_bargain'],
              closesFlags: ['duke_exposed'],
            },
            {
              routeId: 'renounced',
              label: 'Give him back the signet',
              predicate: { flagsSet: ['used:break_character'], atLocation: 'governors_lodge' },
              setsFlags: ['renounced_house'],
              closesFlags: ['duke_bargain'],
            },
            {
              routeId: 'made_him_need_you',
              label: 'Hold the Ember yourself',
              predicate: { hasItems: ['cold_ember'] },
              setsFlags: ['house_taken'],
              closesFlags: ['renounced_house'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['father_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_heroine',
      title: 'The Heroine’s Reasons',
      summary: 'Elara Wynn needed that duel, and the book never said why.',
      kind: 'SIDE',
      involvedCharacterIds: ['elara', 'cassian'],
      involvedLocationIds: ['low_dormitory', 'dueling_ring', 'founders_library', 'governors_lodge'],
      knownRewardCopy: 'The thing your house did to her, and a chance to do something about it.',
      discoverWhen: { flagsSet: ['first_scene_over'] },
      steps: [
        {
          id: 'why_she_needed_it',
          playerCopy: 'Find out why Elara wanted that duel so badly.',
          directorNotes:
            'She will not tell a Grauen anything she does not have to. The ledger page is on the Duke’s side desk at the lodge. The scholarship table knows the story and will tell it to anybody who sits down with them and is not obviously there to sneer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself',
              predicate: { flagsSet: ['spoke:elara'], minRelationship: [{ characterId: 'elara', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_mill', 'elara_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_ledger',
              label: 'Find the ledger page on your father’s desk',
              predicate: { hasItems: ['mill_ledger'] },
              setsFlags: ['knows:the_mill'],
              closesFlags: [],
            },
            {
              routeId: 'heard_it_at_the_table',
              label: 'Hear it from the scholarship table',
              predicate: {
                flagsSet: ['visited:low_dormitory'],
                // The table starts at -25. Anything better than that means you
                // have stopped sneering, which is all they ask.
                minFactionReputation: [{ factionId: 'faction_commons', value: -15 }],
              },
              setsFlags: ['knows:the_mill'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['elara_understood'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_owe_her',
          playerCopy: 'Decide what your house owes her.',
          directorNotes:
            'She will not take charity from House Grauen, so a gift has to be something else: a debt cancelled under the signet as a matter of record, a real fight that she wins honestly, or the ledger page torn up in front of her. Keeping the debt is a choice too, and she will remember it.',
          enterWhen: { flagsSet: ['knows:the_mill'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'tore_it_up',
              label: 'Tear up the ledger page in front of her',
              predicate: { hasItems: ['mill_ledger'], flagsSet: ['used:break_character'] },
              setsFlags: ['debt_forgiven'],
              closesFlags: ['kept_the_debt'],
            },
            {
              routeId: 'signed_it_back',
              label: 'Cancel the debt under the signet',
              predicate: { hasItems: ['grauen_signet'], flagsSet: ['used:strike_a_bargain'] },
              setsFlags: ['debt_forgiven'],
              closesFlags: ['kept_the_debt'],
            },
            {
              routeId: 'gave_her_the_fight',
              label: 'Give her the honest fight she wanted',
              predicate: { flagsSet: ['fought_elara'] },
              setsFlags: ['earned_her_respect'],
              closesFlags: [],
            },
            {
              routeId: 'kept_it',
              label: 'Keep the debt',
              predicate: { flagsSet: ['used:play_the_villain'] },
              setsFlags: ['kept_the_debt'],
              closesFlags: ['debt_forgiven'],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['elara_settled'], abilities: [], reputation: [{ factionId: 'faction_commons', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_the_letters',
      title: 'A Hundred and Forty Letters',
      summary: 'There is a box of letters in your desk from the woman you are engaged to, and the seals on most of them are unbroken.',
      kind: 'SIDE',
      involvedCharacterIds: ['viveka'],
      involvedLocationIds: ['east_wing', 'founders_library'],
      knownRewardCopy: 'Who Severin was to somebody, once, and who you are going to be to her now.',
      discoverWhen: { hasItems: ['viveka_letters'] },
      steps: [
        {
          id: 'answer_her',
          playerCopy: 'Answer Viveka Sorrel, one way or another.',
          directorNotes:
            'She came to end it. She will end it unless something stops her, and she is entitled to. Reading the letters gives the player things only the reader of those letters could know: the hawk, her mother, a poem she is embarrassed by. Ending the engagement honestly and kindly is a real, good outcome here.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_and_answered',
              label: 'Read them, then talk to her',
              predicate: {
                hasItems: ['viveka_letters'],
                flagsSet: ['spoke:viveka'],
                minRelationship: [{ characterId: 'viveka', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['viveka_answered'],
              closesFlags: ['engagement_ended'],
            },
            {
              routeId: 'wrote_back',
              label: 'Write letter one hundred and forty-one',
              predicate: { hasItems: ['viveka_letters'], flagsSet: ['used:break_character'] },
              setsFlags: ['viveka_answered', 'wrote_back'],
              closesFlags: ['engagement_ended'],
            },
            {
              routeId: 'released_her',
              label: 'Let her end it, gracefully',
              predicate: { flagsSet: ['spoke:viveka', 'used:take_it_back'] },
              setsFlags: ['engagement_ended'],
              closesFlags: ['viveka_answered'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['letters_answered'], abilities: [], reputation: [{ factionId: 'faction_gilt', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_how_it_was_closed',
      title: 'How It Was Closed',
      summary: 'The founders sealed something under the chapel two hundred years ago. The book never said how, which means it never said it could be done again.',
      kind: 'SIDE',
      involvedCharacterIds: ['odalys'],
      involvedLocationIds: ['founders_library', 'dueling_ring'],
      knownRewardCopy: 'The way to shut the undercroft for good.',
      discoverWhen: { flagsSet: ['first_scene_over'] },
      steps: [
        {
          id: 'learn_the_sealing',
          playerCopy: 'Find out how the undercroft was sealed the first time.',
          directorNotes:
            'The record is in the library’s archive cage and nobody has asked for it in years; the librarian will need a reason. Kerr knows the seven words and has never said them aloud, and she will not tell a title. Either way the answer includes the part the book left out: it takes a Grauen hand to close it, as well as to open it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_record',
              label: 'Read the sealing record in the archive cage',
              predicate: { hasItems: ['founders_record'] },
              setsFlags: ['knows:the_sealing'],
              closesFlags: [],
            },
            {
              routeId: 'kerr_told_you',
              label: 'Get the words from Kerr',
              predicate: { flagsSet: ['spoke:odalys'], minRelationship: [{ characterId: 'odalys', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_sealing', 'kerr_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['sealing_learned'],
            abilities: ['close_the_door'],
            reputation: [{ factionId: 'faction_academy', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_under_the_chapel',
      title: 'Under the Chapel',
      summary: 'Something your family buried under the chapel two hundred years ago will wake for a Grauen hand and for nobody else.',
      kind: 'LEAD',
      involvedCharacterIds: ['felis', 'odalys', 'cassian'],
      involvedLocationIds: ['chapel_steps', 'the_undercroft'],
      knownRewardCopy: 'The Cold Ember, and a choice the book never let Severin make.',
      discoverWhen: { flagsSet: ['visited:chapel_steps'] },
      steps: [
        {
          id: 'the_iron_door',
          playerCopy: 'Get the iron door under the chapel open, or leave it shut.',
          directorNotes:
            'In the book it is simply open after dark, and Severin never asks why. Here there are three keys to it: the note, Felis’s pocket, and Kerr, who has the second key and will not use it without the Board’s leave unless she trusts the player more than the Board.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_note_opened_it',
              label: 'Find it standing open, as the note promised',
              predicate: { flagsSet: ['vault_open', 'visited:chapel_steps'] },
              setsFlags: ['came_by_the_note'],
              closesFlags: [],
            },
            {
              routeId: 'the_key_opened_it',
              label: 'Open it with the key from Felis’s pocket',
              predicate: { hasItems: ['undercroft_key'], atLocation: 'chapel_steps' },
              setsFlags: ['vault_open', 'came_with_the_key'],
              closesFlags: [],
            },
            {
              routeId: 'kerr_opened_it',
              label: 'Get Kerr to open it with hers',
              predicate: {
                flagsSet: ['spoke:odalys'],
                atLocation: 'chapel_steps',
                minRelationship: [{ characterId: 'odalys', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['vault_open', 'kerr_came_down'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['door_open'], abilities: [], reputation: [] },
        },
        {
          id: 'go_down',
          playerCopy: 'Go down and stand in front of it.',
          directorNotes:
            'Cold, quiet, frost on the floor and seven founders’ marks on the walls. The Ember does not speak in words; it offers, in the player’s own voice, everything the player has ever wanted. Keep it quiet and physical rather than lurid. It knows the player is not the Severin it was waiting for, and it is interested.',
          enterWhen: { flagsSet: ['door_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_down',
              label: 'Stand in front of the Cold Ember',
              predicate: { flagsSet: ['visited:the_undercroft'] },
              setsFlags: ['knows:the_ember'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['stood_before_it'], abilities: ['answer_the_ember'], reputation: [] },
        },
        {
          id: 'the_choice',
          playerCopy: 'Decide what happens to the thing your family buried.',
          directorNotes:
            'Four ways out and none of them is the book’s. Sealing it needs the founders’ words and costs the Duke his last card. Waking it is what the book did, but a player who knows what it is can try to hold on. Carrying it away asleep is possible and makes the player the most dangerous person on campus. Leaving it alone is a choice the book never offered, and the pull will try to bring the player back.',
          enterWhen: { flagsSet: ['stood_before_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sealed_it',
              label: 'Say the founders’ words and shut it for good',
              predicate: { flagsSet: ['used:close_the_door'], atLocation: 'the_undercroft' },
              setsFlags: ['undercroft_sealed'],
              closesFlags: ['woke_the_ember'],
            },
            {
              routeId: 'woke_it',
              label: 'Put your hand on it and let it wake',
              predicate: { flagsSet: ['used:answer_the_ember'] },
              setsFlags: ['woke_the_ember'],
              closesFlags: ['undercroft_sealed'],
            },
            {
              routeId: 'carried_it_off',
              label: 'Take it away while it sleeps',
              predicate: { hasItems: ['cold_ember'], flagsUnset: ['woke_the_ember'] },
              setsFlags: ['carrying_the_ember'],
              closesFlags: ['undercroft_sealed'],
            },
            {
              routeId: 'left_it_sleeping',
              label: 'Walk back up the stair and leave it',
              predicate: { flagsSet: ['midnight_struck'], flagsUnset: ['woke_the_ember', 'undercroft_sealed'] },
              setsFlags: ['left_it_sleeping'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['undercroft_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_academy', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_kerr_arrives',
      atWorldMinute: 10 * 60,
      locationId: 'founders_courtyard',
      publicCopy:
        'Odalys Kerr, the Master-at-Arms, comes through the cloister arch at a walk most people would call a run, takes in the hand on the hilt, and says to the whole courtyard: "Code or courtyard. Choose."',
      directorNotes:
        'She is here because somebody ran for her. She treats the player and Elara exactly the same, which nobody in the courtyard has ever seen done to a Grauen. If steel is already out she starts counting.',
      setsFlags: ['kerr_saw_it'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'odalys', toLocationId: 'founders_courtyard' }],
    },
    {
      id: 'we_noon_bell',
      atWorldMinute: 12 * 60,
      locationId: 'dueling_ring',
      publicCopy:
        'The noon bell. Under the Code any insult not taken back before it is now a duel, and a clerk is already chalking two names on the board outside the Ring.',
      directorNotes:
        'The book’s second scene, arriving on time. Word reaches every table in the great hall within a quarter of an hour, and the High Table set starts placing bets on how many seconds.',
      setsFlags: ['duel_posted'],
      cancelledByFlags: ['apologised'],
      requiresFlags: ['duel_called'],
      movesCharacters: [],
    },
    {
      id: 'we_the_summons',
      atWorldMinute: 13 * 60 + 10,
      locationId: null,
      publicCopy:
        'Felis appears at your elbow with a card on a silver tray: His Grace will receive you at the Governors’ Lodge at four.',
      directorNotes:
        'This is not in the book. The Duke was never in chapter three. Felis delivers it with no expression at all, and his gloved hand goes to his coat pocket afterwards and stays there.',
      setsFlags: ['summoned'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_viveka_comes',
      atWorldMinute: 14 * 60 + 20,
      locationId: 'founders_courtyard',
      publicCopy:
        'Lady Viveka Sorrel crosses the courtyard toward you with her gloves in one hand, and the people near you find reasons to be somewhere else.',
      directorNotes:
        'She has heard about the courtyard and has come to hear it from the player, and very probably to end the engagement while she is at it. She has rehearsed this. Whatever the player says first will not be what she rehearsed for.',
      setsFlags: ['viveka_came'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'viveka', toLocationId: 'founders_courtyard' }],
    },
    {
      id: 'we_the_audience',
      atWorldMinute: 16 * 60,
      locationId: 'governors_lodge',
      publicCopy:
        'At four exactly the door of the Governors’ Lodge stands open, and Duke Ulric Grauen does not look up when it does.',
      directorNotes:
        'He has the courtyard already in hand and has already paid for it. He offers a chair. Felis stands behind him and looks at nobody.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: ['summoned'],
      movesCharacters: [
        { characterId: 'duke_grauen', toLocationId: 'governors_lodge' },
        { characterId: 'felis', toLocationId: 'governors_lodge' },
      ],
    },
    {
      id: 'we_dusk',
      atWorldMinute: 18 * 60 + 30,
      locationId: 'dueling_ring',
      publicCopy:
        'Dusk. The Ring’s lamps are lit and the stands are full. Elara Wynn is on the sand with her sleeves tied back, and Kerr is holding the bell.',
      directorNotes:
        'The book’s third scene. Cassian is in the top row of the stands in his apron. If the player is not here, the bell is rung once, Kerr writes "forfeit" on the board, and the stands empty very fast.',
      setsFlags: ['dusk_bell'],
      cancelledByFlags: ['apologised', 'yielded_to_elara'],
      requiresFlags: ['duel_posted'],
      movesCharacters: [
        { characterId: 'elara', toLocationId: 'dueling_ring' },
        { characterId: 'odalys', toLocationId: 'dueling_ring' },
        { characterId: 'cassian', toLocationId: 'dueling_ring' },
      ],
    },
    {
      id: 'we_the_note',
      atWorldMinute: 21 * 60 + 30,
      locationId: 'east_wing',
      publicCopy:
        'A folded note under your door, in a hand you do not know: "What your house left under the chapel is yours by right. The door will be open tonight."',
      directorNotes:
        'The book’s fourth scene. Felis has done as he was told, or somebody has done it for him. The iron door under the chapel is unlocked from now on. If the player is somewhere else, the note is waiting when they get back.',
      setsFlags: ['vault_note', 'vault_open'],
      cancelledByFlags: ['felis_refused'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_kerr_finds_it_open',
      atWorldMinute: 22 * 60 + 30,
      locationId: 'chapel_steps',
      publicCopy:
        'Kerr’s last round ends, as it has every night for twenty years, with a hand flat on the crypt door. Tonight it moves.',
      directorNotes:
        'She goes very still, and then goes to stand at the bottom of the chapel steps with her lantern and her sword, and nobody is getting past her without a reason she accepts.',
      setsFlags: ['kerr_found_it_open'],
      cancelledByFlags: ['undercroft_sealed'],
      requiresFlags: ['vault_open'],
      movesCharacters: [{ characterId: 'odalys', toLocationId: 'chapel_steps' }],
    },
    {
      id: 'we_cassian_walks',
      atWorldMinute: 23 * 60 + 50,
      locationId: 'chapel_steps',
      publicCopy:
        'Cassian Dray is standing on the chapel steps in his kitchen apron with his wooden practice sword, and does not seem to know how he got there.',
      directorNotes:
        'The book’s last scene, pulling. He is not here to kill anybody. He woke up walking. If the player is here he is frightened and relieved in equal measure to see the face from the dream, and if the Ember is awake in the player, his practice sword starts to shine.',
      setsFlags: ['cassian_on_the_steps'],
      cancelledByFlags: ['undercroft_sealed'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'cassian', toLocationId: 'chapel_steps' }],
    },
    {
      id: 'we_midnight',
      atWorldMinute: 24 * 60,
      locationId: null,
      publicCopy: 'The chapel bell strikes twelve. In the book, this is the last line of chapter three.',
      directorNotes:
        'Whatever the player is doing, they hear it. If they are alive at the end of the twelfth stroke, every page they remember after this one is blank.',
      setsFlags: ['midnight_struck'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_chapter_four',
      atWorldMinute: 1440 + 8 * 60,
      locationId: 'great_hall',
      publicCopy:
        'Breakfast in the great hall. Two hundred people look up when you walk in, because half of them heard you were dead.',
      directorNotes:
        'The first morning the book never wrote. Nobody here follows any script now; the player knows exactly as much as anybody else about what happens next.',
      setsFlags: ['chapter_four_began'],
      cancelledByFlags: [],
      requiresFlags: ['survived_midnight'],
      movesCharacters: [
        { characterId: 'elara', toLocationId: 'great_hall' },
        { characterId: 'cassian', toLocationId: 'great_hall' },
      ],
    },
    {
      id: 'we_the_board_sits',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'governors_lodge',
      publicCopy: 'The Board of Governors sits on the matter of steel drawn in the Founders’ Courtyard.',
      directorNotes:
        'Kerr gives evidence in four sentences. Unless the Duke has been given a reason to make it go away, the vote is to send the player down, and Kerr is asked to ring the bell at the gate.',
      setsFlags: ['expelled'],
      cancelledByFlags: ['duke_bargain'],
      requiresFlags: ['drew_steel_outside_the_ring'],
      movesCharacters: [{ characterId: 'odalys', toLocationId: 'governors_lodge' }],
    },
  ],
  promises: [
    {
      id: 'p_midnight',
      kind: 'FINALE',
      label: 'Whether you are alive at one minute past midnight',
      seedHint: 'The chapter you remember ends on the chapel steps at the twelfth stroke.',
      payoffHint: 'The bell strikes and somebody is standing on those steps. Who, and why, is the player’s doing.',
      weight: 1,
    },
    {
      id: 'p_the_heroine',
      kind: 'RELATIONSHIP',
      label: 'Why the heroine needed the duel',
      seedHint: 'She looks disappointed, not relieved, when you do not finish the sentence.',
      payoffHint: 'A mill on the North March, an eviction with your house’s seal on it, and a debt she meant to settle with a sword.',
      weight: 0.9,
    },
    {
      id: 'p_the_door',
      kind: 'MYSTERY',
      label: 'Who left the door open',
      seedHint: 'Felis touches his coat pocket every time somebody says the word chapel.',
      payoffHint: 'An order in your father’s hand, and a butler who has not decided whether to obey it.',
      weight: 0.85,
    },
    {
      id: 'p_the_hero',
      kind: 'RIVAL',
      label: 'The hero who is supposed to kill you',
      seedHint: 'A kitchen hand in the crowd who looks at you as though he has seen your face before.',
      payoffHint: 'A month of dreams about the chapel steps, and at ten to midnight he walks there without knowing why.',
      weight: 0.8,
    },
    {
      id: 'p_off_the_page',
      kind: 'THEME',
      label: 'Nobody here is only their chapter',
      seedHint: 'A hundred and forty letters in your desk drawer, most of the seals unbroken.',
      payoffHint: 'Every character the book flattened turns out to have a reason, and the villain was one of them.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_reread',
      name: 'You Read It Twice',
      role: 'Foresight and careful talk',
      summary:
        'You read all four hundred and twelve chapters, then went back and read the first arc again. You know who everyone becomes. You do not know who opened the door.',
      playstyle: ['Knows the plot', 'Plans ahead', 'Overthinks'],
      blurb:
        'You know chapter forty-one: Felis Corran, dying, tells Cassian he left the undercroft open that night on an order, and dies before he can say whose. You know Elara becomes a general and Cassian the realm’s champion, and that the book’s second villain wears your family’s coat.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { canon: 3, intrigue: 1, insight: 1 },
      startingItems: [{ itemId: 'severin_pocketbook', qty: 1 }],
      startingAbilities: ['read_ahead'],
      startingReputation: [],
    },
    {
      id: 'arch_fights',
      name: 'You Skipped to the Fights',
      role: 'Sword fighting and nerve',
      summary:
        'You skimmed the politics and read every duel twice. You know how everybody in this book fights, which is a different thing from knowing what they want.',
      playstyle: ['Duels well', 'Steady nerve', 'Misses subtext'],
      blurb:
        'You know Elara opens every duel with a low cut at the leading knee and drops her left shoulder half a beat before she thrusts. You know Cassian gives three passes before he fights for real. And you know the Grauen sword forms better than Severin ever let anybody see.',
      attributeBonus: { agility: 3, might: 1 },
      skillProficiencies: { swordplay: 3, nerve: 2 },
      startingItems: [{ itemId: 'ring_gloves', qty: 1 }],
      startingAbilities: ['cross_blades'],
      startingReputation: [],
    },
    {
      id: 'arch_comments',
      name: 'You Read the Comments',
      role: 'Social insight and gossip',
      summary:
        'You spent more time under the chapters than in them: the theories, the side-character pages, the arguments about who secretly liked whom.',
      playstyle: ['Reads people', 'Knows the gossip', 'Charming'],
      blurb:
        'The top comment on chapter forty-one swore the father was behind the open door, and nine thousand readers agreed. You know the fans called Felis the best character in the book and hated how he went, and that a sharp noblewoman with a stack of letters got three lines and a devoted following.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { insight: 3, charm: 2 },
      startingItems: [],
      startingAbilities: ['read_them'],
      startingReputation: [{ factionId: 'faction_gilt', amount: 10 }],
    },
    {
      id: 'arch_dropped',
      name: 'You Quit at Chapter Four',
      role: 'Improvising and stealth',
      summary:
        'You started it on the train last night and fell asleep at the start of chapter four. You know today, roughly. After midnight you know exactly as much as everybody else.',
      playstyle: ['No spoilers', 'Quick on your feet', 'Sees people'],
      blurb:
        'You have no spoilers past tonight and no theories, which makes you the only reader here who will look at these people and see people. You trust what is in front of you, and you are fast when it moves.',
      attributeBonus: { agility: 2, presence: 2 },
      skillProficiencies: { improvise: 3, stealth: 2 },
      startingItems: [],
      startingAbilities: ['wing_it'],
      startingReputation: [{ factionId: 'faction_commons', amount: 5 }],
    },
  ],
  setupFields: [
    {
      id: 'archetype',
      label: 'How did you read the book?',
      helpText:
        'How you read the novel you woke up in sets what you remember and what you are good at. It is fixed for the whole story. It does not decide whether you finish the sentence, who you trust, or whether you are alive after midnight — all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'how_you_take_it',
      label: 'Mouth open, line half-said. What is your first instinct?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite in the courtyard and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'play_the_part', label: 'Play the villain until you understand the rules' },
        { id: 'break_it', label: 'Break the script as hard and as early as possible' },
        { id: 'save_him', label: 'Save Severin, whoever he really was' },
        { id: 'save_them', label: 'Make sure the people the book hurt come out better' },
        { id: 'get_out', label: 'Get out of this book entirely' },
      ],
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Who were you, before the train?',
      helpText: 'One plain sentence about your old life. Nobody here will ever meet that person, but you remember them.',
      kind: 'TEXT',
      required: false,
      advanced: true,
      maxLength: 300,
      placeholder: 'e.g. I did payroll for a logistics firm and I have never held a sword in my life.',
    },
  ],
  protagonist: {
    kind: 'NAMED',
    name: 'Severin Grauen',
    pronouns: 'he/him',
    description:
      'Twenty, heir of House Grauen, a first-year at Vellmar. Tall, silver-grey hair, a charcoal coat with the house’s grey tower on the clasp, and a face built for sneering. The book called him lazy and never gave him a mother; in truth he trained alone at night until his dueling gloves wore through, and a page torn out of his pocketbook has left a stub with one word on it in his hand: "Mother". Since this morning somebody else is behind that face: a reader from another world who knows how chapter three ends.',
    setupHeading: 'What kind of reader are you?',
    portrait: null,
  },
  coverDirection: [
    'SUBJECT: Elara Wynn, the scholarship swordswoman, in the foreground of a key visual for a fantasy academy anime about a reader who wakes up as the villain of a book.',
    'She fills the lower two thirds of the frame from the waist up, close and a little left of centre.',
    'Dark hair cropped at the jaw and pinned back with a plain hairpin, a grey academy coat with a small scholarship pin and a mended cuff, a plain soldier’s sword in an old leather scabbard at her hip.',
    'One hand holds her coat back from the hilt; her thumb pushes the blade an inch out of the scabbard, and that inch of bare steel flashes with a bright line of sunlight.',
    'Her expression is furious and daring, chin up, glaring straight at the viewer.',
    'OVER HER SHOULDER, a step behind and higher: a tall nobleman with swept silver-grey hair, a long charcoal coat with a silver tower clasp and grey gloves,',
    'caught mid-sentence, one hand raised in a lazy dismissive gesture that is starting to falter, his smirk turning to alarm as he looks down at the blade.',
    'BOTH FACES STAY CLEAN: no shadows, marks or effects on either face; both are fully lit and readable.',
    'A few loose book pages drift through the air between them, edges curling and catching the light; the pages are blank, with no letters or numbers, nothing that reads as writing.',
    'Every effect stays on the pages, the blade and the title, never on a face.',
    'BEHIND THEM, soft and secondary: a sunlit stone academy courtyard, a blurred crowd in grey academy coats frozen mid-whisper,',
    'and an old chapel spire with a bell tower against a pale morning sky, with a band of midnight blue creeping down from the top edge of the sky.',
    'LIGHT: warm bright morning sun across her from the front, a cool blue rim light along his coat and silver hair.',
    'TITLE: the title The Villain Dies in Chapter Three painted into the art across the upper third, above their heads and against the midnight-blue band,',
    'set in capitals on two lines, THE VILLAIN DIES over IN CHAPTER THREE, as an elegant bold engraved serif book-title logo, ivory with a thin gold edge,',
    'with a thin red ribbon bookmark trailing from the word THREE. Spelled exactly THE VILLAIN DIES IN CHAPTER THREE, large and legible at thumbnail size.',
    'No other text anywhere.',
  ].join(' '),
  endings: [
    {
      id: 'end_chapter_four',
      name: 'Chapter Four',
      rarity: 'COMMON',
      minTurn: 24,
      requires: {
        flagsSet: ['chapter_three_over', 'survived_midnight'],
        flagsUnset: ['woke_the_ember', 'renounced_house', 'expelled'],
      },
      condition:
        'The plain survival. The player got through the duel one way or another, was somewhere other than the book’s chapel steps when the bell struck, and is still a Grauen heir at Vellmar in the morning. Nothing is solved. Play it as the first page nobody wrote: breakfast, two hundred people staring, and nobody, the player included, knowing what happens next.',
      epilogue:
        'Chapter four begins at breakfast. You sit at a table you have never sat at, eat something you did not order, and for the first time since the train you have absolutely no idea what anybody is about to say. It is wonderful. It is terrifying. The bread is very good.',
      hint: '',
    },
    {
      id: 'end_as_written',
      name: 'As It Was Written',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['as_written'] },
      condition:
        'The loss. The player woke the Ember and walked up the chapel steps at midnight with Cassian already standing on them, and the book got the scene it wanted. Write it in one clean line: a practice sword that turns to light, and nothing graphic. Then the part the book left out: who was actually there afterwards.',
      epilogue:
        'The book said nobody mourned him. The book was wrong about one thing. A man in white gloves stood on the chapel steps until the sun came up, and when the hero asked him why, he said that somebody ought to, and that it had been his job for fourteen years.',
      hint: '',
    },
    {
      id: 'end_the_door_stays_shut',
      name: 'The Door Stays Shut',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['undercroft_sealed', 'survived_midnight'] },
      condition:
        'The player learned how the founders sealed the undercroft, went down, and shut it for good with a Grauen hand and seven words, so the book’s last scene never had anything to happen with. Cassian never walked to the chapel steps. The Duke has lost his last card and knows exactly who took it.',
      epilogue:
        'Kerr checks the crypt door every night for another year out of habit, and every night it does not move. Cassian sleeps through for the first time in a month. Your father sends a letter that is four words long and contains no threat, which is how you know he is frightened of you.',
      hint: '',
    },
    {
      id: 'end_a_better_villain',
      name: 'A Better Villain',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['woke_the_ember', 'survived_midnight'], flagsUnset: ['as_written'] },
      condition:
        'The player woke the Ember and did not let it take them, and kept away from the scene the book needed. They are now the most dangerous person at Vellmar, holding the thing their father wanted, and they have to decide every morning what kind of villain to be. Play the power as quiet and cold, never as spectacle.',
      epilogue:
        'In the book Severin was a villain for three chapters. You have been one for a whole term now, and it turns out the job is mostly paperwork, threats you never carry out, and the Board doing what you ask. Cassian still trains every night. You leave the Ring lamps lit for him.',
      hint: '',
    },
    {
      id: 'end_second_lead',
      name: 'Second Lead',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['steps_talked'],
        minRelationship: [{ characterId: 'cassian', dimension: 'trust', value: 60 }],
      },
      condition:
        'The player went to the chapel steps at midnight on purpose, without the Ember, and sat down beside the hero who was supposed to kill them, and talked to him. Cassian now trusts the player. The book’s hero and the book’s villain are friends, which no reader would have accepted and both of them find hilarious.',
      epilogue:
        'He still gives everyone three passes. He gives you four. You still lose most of the time. The commenters would have hated this ending. The two of you eat dinner at the scholarship table most nights, and Elara pretends she does not find it funny.',
      hint: '',
    },
    {
      id: 'end_off_the_page',
      name: 'Off the Page',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['debt_forgiven'],
        minRelationship: [
          { characterId: 'elara', dimension: 'affection', value: 65 },
          { characterId: 'elara', dimension: 'trust', value: 60 },
        ],
      },
      condition:
        'The player gave back what House Grauen took from Elara Wynn, as a matter of record rather than charity, and she has stopped seeing the villain. Romance here goes no further than a kiss, and it should feel earned and a little awkward. She is still the best sword in the year and still beats the player, honestly.',
      epilogue:
        'The mill on the North March is turning again. She beats you in the Ring every Friday, honestly, and then lets you buy her supper, which she says is the only debt your house is still allowed to run. On the night she kissed you, she counted to nine first, and laughed.',
      hint: '',
    },
    {
      id: 'end_answered',
      name: 'Letter One Hundred and Forty-One',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['viveka_answered'],
        minRelationship: [{ characterId: 'viveka', dimension: 'affection', value: 65 }],
      },
      condition:
        'The player read the letters and answered Viveka Sorrel as themselves, and she chose to keep writing. Nothing about the engagement is settled by families any more. Romance goes no further than a kiss and stays mostly on paper, which suits them both. The hawk is mentioned, once, and should land.',
      epilogue:
        'She broke off the engagement the next week, formally, in her own handwriting, and then asked you to dinner. You have written her forty letters since. She corrects your spelling in the margins of her replies, and keeps every one.',
      hint: '',
    },
    {
      id: 'end_the_board_sits',
      name: 'The Board Sits',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['duke_exposed'] },
      condition:
        'The player laid the Duke’s order before the Board of Governors with enough standing for it to be heard. The Duke is removed from the chair and from the house’s business, and the player is, suddenly and horribly, House Grauen, with every one of its debts. Play the cost as heavily as the victory.',
      epilogue:
        'Your father went home to the North March and does not write. The house’s creditors write every day. You sold the mines, paid the Wynn family four hundred crowns with interest, and now sit at the far end of the long table yourself, learning which chair to offer.',
      hint: '',
    },
    {
      id: 'end_nobodys_heir',
      name: 'Nobody’s Heir',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['renounced_house'] },
      condition:
        'The player gave the signet back to the Duke in person and stopped being a Grauen, which two people have done in two hundred years. They keep their name and nothing else. Play it as loss and relief at once, with the Duke unable to decide which of those he feels.',
      epilogue:
        'You moved into the low dormitory with a stipend you had to sit an exam for. Felis resigned the same week and now works at the porter’s lodge, where he still has your coat ready before you are cold. You are poor. You have never once been happier.',
      hint: '',
    },
    {
      id: 'end_not_my_story',
      name: 'Not My Story',
      rarity: 'UNCOMMON',
      minTurn: 10,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out through the main gate and down the road and did not come back, leaving the book and everybody in it behind. Nobody on campus is fated to anything once they leave. Play the walk down the hill honestly: freedom, and the quiet discovery that the people back there were real.',
      epilogue:
        'You found work in a river town where nobody had read anything. Months later a traveller mentioned the academy: the duke’s heir had vanished, the heroine had won her duel by forfeit, and a butler had asked after you at every inn on the road. You never found out how chapter four went.',
      hint: '',
    },
    {
      id: 'end_sent_down',
      name: 'Sent Down',
      rarity: 'COMMON',
      minTurn: 16,
      requires: { flagsSet: ['expelled'] },
      condition:
        'The player drew steel in the Founders’ Courtyard, gave the Duke no reason to make it go away, and the Board voted. The Code applies to everyone. Kerr rings the bell at the gate. Play it straight: a real consequence, delivered without cruelty, that still leaves the player alive and free.',
      epilogue:
        'Kerr rang the bell for you at the gate, and it did have a good sound. The book never wrote a Severin who survived chapter three by being expelled in chapter four, so you are on your own now, on the road down the hill, with a sword you are no longer allowed to wear.',
      hint: '',
    },
    {
      id: 'end_his_grace',
      name: 'His Grace',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['duke_bargain', 'undercroft_sealed'] },
      condition:
        'The rarest close. The player sealed the undercroft and then still made their father a better offer than the Ember, so the Duke, who has lost his last card, chooses to deal with them as an heir rather than spend them. Play it cold and quiet, as a negotiation between two people who have just started respecting each other.',
      epilogue:
        'Your father offered you the good chair at the long table. You took the other one. He laughed, once, for the first time in your memory, and you spent the winter saving House Grauen together without a relic, by the honest and unbearably dull method of reading the ledgers.',
      hint: '',
    },
  ],
  opening:
    "\"...commoner trash—\"\n\nThe words are already out. Your mouth. Not your voice. Not your body.\n\nA woman in academy grey closes her hand on a plain soldier's sword.\n\n\"Go on,\" says Elara Wynn. \"Finish it. I want every one of them to hear you.\"\n\nYou know this scene. You read it on a train, in chapter three of a novel you thought was mediocre. The spoiled noble finishes the insult. She beats him at dusk in nine seconds. He dies at midnight.\n\nYou are the spoiled noble.\n\nTwo hundred students have stopped breathing.\n\nHer thumb pushes the blade an inch out of its scabbard.\n\n\"Well, my lord? Finish the sentence.\"",
  openingPanel: {
    assetKey: 'story_the_villain_dies_in_chapter_three/opening',
    alt: 'Elara in a grey academy coat, thumb pushing a plain soldier’s sword an inch from its scabbard, glaring straight at you across a silent sunlit stone courtyard full of grey coats.',
  },
  openingSuggestions: [
    "\"I take it back. All of it. I'm sorry.\"",
    'I look past her blade into the crowd for the face that kills me at midnight.',
    'I finish the line word for word, exactly as the book wrote it.',
  ],
  publishedAt: '2026-11-23T16:02:47.017Z',
};

export const THE_VILLAIN_DIES_IN_CHAPTER_THREE = StoryVersion.parse(raw);
