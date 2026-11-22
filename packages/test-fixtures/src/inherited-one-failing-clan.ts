import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Inherited: One Failing Clan" — a crime family handed to somebody who has
 * never been in one, at the funeral, with a debt due at midnight.
 *
 * Bible: `docs/story-bibles/new50/34_INHERITED_ONE_FAILING_CLAN.md`. Slate #34
 * of fifty (`docs/stories-50/PLAN.md`).
 *
 * Playable span: from twenty to seven on the evening of the funeral (day 0) to
 * the seventh-day cup (day 7, 18:00), on one old harbour ward and the glass
 * tower across the bridge from it. Midnight on day 0 is the first spine: the
 * debt is called at the Lantern, and the pier goes to Kagami unless the player
 * has done something about it. The cup on the seventh evening is the second:
 * nine members drink to the new boss or hand back their heron pins. Everything
 * after the cup lives in the endings.
 *
 * The structural bet is that the family is not a resource. It is nine people,
 * three of them written in full, and each of them wants something from this
 * week that has nothing to do with the player: Ryo has an offer from the rival
 * he has not answered, Saeko is guarding money meant for the members to leave
 * with, Hachi wants his noodle shop open to the public again. A player who
 * treats them as a meter gets a family that walks on the seventh day.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest titles and
 * summaries, world events and the first twelve endings. It never reads
 * resources, step notes, promises, skills or abilities other than the chosen
 * archetype's starting ones. So the harbour code, the deadline and every lever
 * against the debt are in hard canon; the seal, the note, the passbook, the
 * transfer, the favour book, the letter and the resort contract are quest
 * items; and every archetype starts with Speak as the Boss. There are exactly
 * twelve endings so the storyteller sees all of them.
 *
 * Three invisible variables. Nerve is the one honest GOOD_HIGH, because
 * `resolveRest` refills those and the longest night of the player's life does
 * run out. Heat is first among the descending pair on purpose: public violence
 * raises the first GOOD_LOW in array order, and a fight in the market brings
 * the police before it brings the rival. Feud is how close the bay is to the
 * war the code was written to prevent. The Harbour Ward is the first faction
 * for the same reason: violence in public costs the people the family exists
 * to protect before it costs anybody else.
 */

const raw = {
  id: 'sv_inherited_one_failing_clan_1',
  storyId: 'story_inherited_one_failing_clan',
  version: 1,
  title: 'Inherited: One Failing Clan',
  openingObligations: [
    {
      what: 'Pay Tatsuo Kagami ten million yen, or answer for it, when your grandfather’s debt is called at the Lantern at midnight.',
      withCharacterId: 'kagami',
      dueInMinutes: 320,
    },
  ],
  fantasyLabel: 'Nine members. Ten million. Due tonight.',
  hook: 'At twenty-five you inherit your grandfather’s crime family: three lieutenants, a debt due at midnight, and his oldest rival at the funeral.',
  premise:
    'You are twenty-five. Until this morning you had an ordinary job and a grandfather you had met exactly twice.\n\n' +
    'Then his lawyer put a black stone seal in your hand. Your grandfather was Genzo Hayami, and for fifty years his family ran the old harbour ward of the city: the night market, the fishermen’s pier, the peace on the waterfront. His will names you the new boss.\n\n' +
    'The family is nine people now, and it is broke. Ryo, the first lieutenant, expected the seal himself. Saeko, the accountant, knows exactly how broke. Hachi, the old man’s driver, cooks for everybody and cried through the will.\n\n' +
    'At the funeral, Kagami, the rival boss from across the bay, walks up the aisle with a note stamped with that seal. Your grandfather borrowed ten million from him. It is due at midnight tonight. If it is not paid, Pier 9 is his, so the fishermen lose their landing and the family loses the last thing it owns.\n\n' +
    'You have five hours to find ten million, or a reason you do not owe it. Then you have seven days before every member drinks from the old man’s cup or walks away.\n\n' +
    'Everyone on the waterfront is watching to see what kind of boss you are. Some of them want you to fail.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Crime', 'Modern', 'Drama', 'Comedy', 'Found family'],
  mechanicsChips: [
    'A debt due at midnight',
    'A family that can walk out',
    'A rival who is grieving',
    'A code everybody keeps',
    'Seven days to earn the cup',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'ALCOHOL_REFERENCES', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can run this family the way your grandfather did, turn it into a business, hand it to the man who expected it, sell the pier, close it kindly, or break it. Nobody in it is waiting to be won over by a speech. They will watch what you do tonight, and on the seventh day they will decide.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'funeral_hall',
    startWorldMinute: 18 * 60 + 40,
    startingItems: [{ itemId: 'heron_seal', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-five. Ryo Okumura is thirty-four, Saeko Imai twenty-nine, Hachiro Ueda, called Hachi, sixty-one, Tatsuo Kagami sixty-three, his daughter Mariko Kagami twenty-six, and Detective Asako Nori forty-four. The other six members of the family are adults, the youngest nineteen. Genzo Hayami died last week at eighty-one.',
      'The player is the only grandchild of Genzo Hayami, through his daughter, who left the family at twenty and never spoke to him again. The player met him twice: once years ago at the fish market, and once last spring, when a polite old stranger turned up at their work, bought them lunch, asked strange questions and paid in cash. His will names the player as heir. This morning his lawyer handed them the Heron Seal.',
      'For fifty years the Hayami family has run the old harbour ward of the port city of Saiharu. It keeps the night market’s peace, settles fights before the police arrive, lends money when the boats come back empty, and holds the lease on Pier 9, where the fishermen’s co-op lands its catch. It once had two hundred members. It has nine, and it is broke.',
      'Eleven months ago Genzo borrowed ten million yen from Tatsuo Kagami, with the Pier 9 lease as collateral, and stamped the note with the Heron Seal. The note falls due at midnight on the day he is buried, which is tonight. It is called at the Lantern at midnight, in front of the harbour families. If it is not paid, the lease passes to Kagami, and his men put their own locks on the Pier 9 gate at one in the morning.',
      'The harbour code binds every family on the waterfront: no blood on the waterfront; a debt with a seal on it is honoured, and called at the Lantern; a family’s boss is whoever holds its seal and is given the cup on the seventh day; and no family calls the police on another. Whoever breaks the code first loses the other families.',
      'The Heron Seal is a palm-sized seal of black stone carved with a heron. Whatever it is stamped on, the Hayami family stands behind. On the seventh evening after the funeral, every member drinks from the old man’s cup to the new boss, or hands back their silver heron pin and leaves.',
      'Kagami does not want the pier for the pier. He has signed a contract with a resort developer to deliver the whole old waterfront, Pier 9 included, by the end of the month, for four hundred million yen, and two city councillors have been paid. Pier 9 is the last piece. Mariko knows. Detective Nori suspects and cannot prove it. The contract is in the safe in Kagami’s office at the top of his tower.',
      'Saeko keeps an account the old man told her to open: six point two million yen in a blue passbook labelled, in his handwriting, FOR WHEN THEY LEAVE. It is severance for the members if the family ever ends. Nobody else knows it exists.',
      'Six weeks before he died the old man had a transfer drawn up giving the Pier 9 lease to the fishermen’s co-op for one yen. The co-op chair signed it. It needs only the Heron Seal, and it sits in the green safe in the family office beside a sealed letter addressed to the player. Hachi knows the combination. If the transfer is sealed before midnight, the pier belongs to the co-op and Kagami cannot take it, but the ten million is still owed, with nothing behind it.',
      'Two nights before the funeral, Kagami offered Ryo the Pier 9 night shift and jobs for the six other members if Ryo brings him the Heron Seal. Ryo has not answered.',
      'The old man kept a black notebook of forty-one people who owe the family a favour, from a judge’s clerk to the harbourmaster. It is on the desk in the study of his house on the hill.',
      'Kagami and the old man played go at the Lantern one night a month for forty-one years. Their last game is still on the board, black to play, and black was the old man. Kagami has let nobody touch it.',
    ],
    toneGuide:
      'Crime drama played as a good anime: a failing family of misfits, gallows comedy, real loyalty and real danger, on a rainy waterfront that smells of grilled squid and diesel. ' +
      'The player is twenty-five and out of their depth, and the comedy comes from an ordinary adult applying ordinary sense (spreadsheets, customer service, a retail smile) to a family that runs on bows, paper and forty-year grudges. ' +
      'Manners are power here. Who bows first, how low, and who pours the tea are moves, and everybody in the room notices them. ' +
      'Violence is sudden, short and shown by what it costs: a split lip, a broken hand, a hospital corridor, a police report. No gore, no torture, and nobody dies on the page. Guns are almost unheard of on this waterfront and would bring the whole city down on everybody. ' +
      'Romance, if it comes, is slow and tense and goes no further than a kiss. ' +
      'The secrets (the resort deal, the passbook, the transfer, Ryo’s offer, the letter) are earned through people and paper; never state them before the player has found them. ' +
      'Nobody is a cartoon. Kagami is grieving, Ryo is loyal to a dead man, Saeko is honest to a fault, and every one of them wants something this week that has nothing to do with the player. The face at the top of a beat belongs to whoever reacted to the player most strongly.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Saeko slides the ledger across the desk and does not let go of it.\n\n"Before you open this," she says, "you should know he paid the fishermen’s winter out of his own pocket. Twice."\n\nYou open it.\n\nThe last page has one line, in red: 10,000,000.\n\nUnder it, in pencil, in a hand that shook: Sorry. Ask Saeko about the blue one.\n\nShe goes very still.\n\n"He wrote that in March," she says. "I have been pretending not to have read it since March."',
      'The Lantern is empty except for Kagami and a go board.\n\nHe does not look up. "Sit. Not there. That was his chair."\n\nYou sit in the other one.\n\nThe game on the board is three weeks old. Black to play. Black was your grandfather.\n\n"He once took forty minutes over a single move," Kagami says. "I went home. He sent the move by taxi at two in the morning, written on a napkin." He pours two cups of tea and pushes one toward you. "It was a terrible move. I lost anyway."',
      'Hachi puts a bowl in front of you before you have sat down.\n\n"Eat," he says.\n\n"It’s eleven o’clock. I owe a man ten million at midnight."\n\n"Then eat fast."\n\nAt the end of the counter Ryo is eating standing up, watching the door. He finishes, rinses his bowl and puts his jacket on.\n\n"Boss," he says. There is a pause in front of it, shorter than this afternoon’s. "Car’s out front."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 11, presence: 12, resolve: 11, arcana: 6 },
  skills: [
    { id: 'command', name: 'Command', attribute: 'presence', description: 'Saying a thing so that people who have known you for an hour do it.' },
    { id: 'bargaining', name: 'Bargaining', attribute: 'presence', description: 'Putting terms on a table and hearing what the other side actually wants.' },
    { id: 'manners', name: 'Manners', attribute: 'presence', description: 'The old forms: who bows first, how low, who pours, who sits where, and what each of them means.' },
    { id: 'numbers', name: 'Numbers', attribute: 'mind', description: 'Reading a ledger, a note or a contract properly, and finding the line somebody hoped you would skip.' },
    { id: 'bluffing', name: 'Bluffing', attribute: 'resolve', description: 'Holding a hand you do not have without anything moving in your face.' },
    { id: 'menace', name: 'Menace', attribute: 'might', description: 'Letting somebody understand what happens next without saying it out loud.' },
    { id: 'brawling', name: 'Brawling', attribute: 'might', description: 'A short, ugly fight in a doorway, an alley or a fish shed, and still standing at the end of it.' },
    { id: 'streetwise', name: 'Streetwise', attribute: 'agility', description: 'Back streets, short cuts, being ignored, and noticing who is following you.' },
    { id: 'instinct', name: 'Instinct', attribute: 'arcana', description: 'Knowing a room has gone wrong a second before anybody in it moves.' },
  ],
  /**
   * Three, all invisible.
   *
   * Nerve is the only GOOD_HIGH, so resting restores the night and nothing
   * else. Heat and Feud descend. Heat comes first in the array because the
   * engine's public-violence path raises the first GOOD_LOW, and a fight on
   * the waterfront brings patrol cars before it brings the rival. Lean On Them
   * and Throw Hands raise both.
   */
  resources: [
    {
      id: 'nerve',
      name: 'Nerve',
      max: 100,
      start: 70,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has nothing left for tonight. They agree to things to end conversations, flinch at raised voices, and whoever is standing nearest starts making their decisions for them.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on adrenaline and nothing else. Hands shake while pouring tea, answers come out too fast or not at all, and every member of the family can see it. This is the band where a bluff falls apart, and where sitting down to Hachi’s noodles is genuinely the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'Tired in the ordinary way of a long night with a deadline in it. Fine for one more hard conversation and honest about not wanting two. Nobody remarks on it unless somebody is looking for weakness, and on this waterfront somebody always is.',
        },
        {
          upTo: 100,
          behaviour:
            'Clear-headed and steady. The player can sit through a silence without filling it, read a document properly, bow at exactly the right depth and make a threat sound like a weather report. Scenes can be long and can turn on small things.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 15,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The police have no reason to look at the family at all. Detective Nori is the only officer who knows the members’ names, and she keeps them in her head rather than in a file.',
      color: '#D1495B',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody official is looking. Patrol cars pass the market without slowing, the station treats the family as history, and Detective Nori’s file on it is thin and dusty. Members carry on with their ordinary errands.',
        },
        {
          upTo: 50,
          behaviour:
            'Somebody has noticed. A patrol car parks at the end of the market for an hour with nobody getting out. Detective Nori turns up wherever the player is, a little too often, with coffee. The Lantern’s owner asks for voices to be kept down.',
        },
        {
          upTo: 80,
          behaviour:
            'Uniforms walk the market in pairs. Two members get stopped and searched on the way home. The other harbour families start leaving the room when the player walks in, because nobody wants to be in a photograph with them.',
        },
        {
          upTo: 100,
          behaviour:
            'A raid is being planned and everybody on the waterfront knows it except the people planning it. The office could be turned over any night. Kagami stops answering calls, the families close ranks against whoever brought this down on them, and Nori loses her say over what happens next.',
        },
      ],
    },
    {
      id: 'feud',
      name: 'Feud',
      max: 100,
      start: 30,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The Kagami Group treats the Hayami family as a respected neighbour. Tea is poured, debts are discussed politely, and nobody on either side can quite remember why the two families ever fought.',
      color: '#5C7AEA',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Cold courtesy across the bay. Kagami’s men nod to the family’s members in the street. Business is done at the Lantern with bows and paper, and the worst thing that happens is a long silence over a cup of tea.',
        },
        {
          upTo: 55,
          behaviour:
            'The old grudge is awake. Men in dark jackets loiter at the end of the market, the family’s cars get followed home, and every conversation between the two sides has a second meaning. One more insult and somebody will answer it.',
        },
        {
          upTo: 80,
          behaviour:
            'Open hostility that both sides still pretend is manners. A brick through a window, a member jumped in an alley, a stall turned over with nobody seeing who did it. The other families start choosing sides and saying so.',
        },
        {
          upTo: 100,
          behaviour:
            'War on the waterfront, the thing the code was written to prevent. Members do not go anywhere alone, hospital visits replace meetings, and the other families and the police both decide it has to end and neither of them much cares how.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'heron_seal',
      name: 'The Heron Seal',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'A palm-sized seal of black stone with a heron carved into its face, worn smooth by fifty years of one man’s thumb. Whatever it is stamped on, the Hayami family stands behind.',
      loreText:
        'Under the harbour code the person who holds it speaks for the family until the seventh day, when the members decide whether to drink to them. It was handed to you this morning in a lawyer’s office that smelled of instant coffee.',
      icon: 'seal',
    },
    {
      id: 'debt_note',
      name: 'Kagami’s Note',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A promissory note for ten million yen, the Pier 9 lease written in as collateral, stamped with the Heron Seal. It falls due at midnight on the day the borrower is buried.',
      loreText:
        'The seal is pressed slightly crooked, the way it is on everything the old man stamped in his last year. Kagami carries the note in his breast pocket at the funeral and locks it in the safe in his tower office afterwards.',
      icon: 'letter',
    },
    {
      id: 'blue_passbook',
      name: 'The Blue Passbook',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A bank passbook in Saeko Imai’s name holding six point two million yen. On the cover, in the old man’s handwriting: FOR WHEN THEY LEAVE.',
      loreText:
        'Severance for the members if the family ever ends. Spent on the debt, with the car and everything else that can be sold, it would just about cover ten million, and leave nine people with nothing to fall back on.',
      icon: 'book',
    },
    {
      id: 'coop_transfer',
      name: 'The Unsigned Transfer',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A transfer giving the Pier 9 lease to the fishermen’s co-op for one yen, drawn up six weeks ago and signed by the co-op chair. The space for the Heron Seal is empty.',
      loreText:
        'Sealed before midnight, the pier belongs to the fishermen and Kagami cannot take it. The ten million is still owed, with nothing behind it.',
      icon: 'papers',
    },
    {
      id: 'grandfathers_letter',
      name: 'The Letter Addressed to You',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A thick envelope in the old man’s handwriting, addressed to you by name. On the back, underlined twice: Open this after you have decided.',
      loreText: 'It came out of the registry office with him six weeks ago. Hachi recognises the envelope the moment he sees it.',
      icon: 'letter',
    },
    {
      id: 'favour_book',
      name: 'The Favour Book',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { manners: 1 },
      description:
        'A black notebook of forty-one names, from a judge’s clerk to the harbourmaster, each with what they owe the family and since when.',
      loreText:
        'Some of the favours are thirty years old. The last page is not a name at all, only four numbers and the word SHOP.',
      icon: 'book',
    },
    {
      id: 'resort_contract',
      name: 'The Resort Contract',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A contract between the Kagami Group and a resort developer: the whole old waterfront delivered clear by the end of the month, for four hundred million yen.',
      loreText:
        'Pier 9 is circled in red on the attached map. Two city councillors are named in an appendix that should never have been printed.',
      icon: 'papers',
    },
    {
      id: 'family_ledger',
      name: 'The Family Ledger',
      tags: ['document'],
      skillModifiers: { numbers: 1 },
      description: 'Fifty years of dues, loans, hospital bills and noodle orders, in four different handwritings, the last of them Saeko’s.',
      loreText: 'The last page has one line in red, ten million, and under it, in pencil: Sorry. Ask Saeko about the blue one.',
      icon: 'book',
    },
    {
      id: 'car_keys',
      name: 'The Old Man’s Car Keys',
      tags: ['personal'],
      description: 'Keys to a black sedan with twenty-six years on the clock and a rattle in the back door that nobody was ever allowed to fix.',
      loreText: 'Hachi says it would fetch about a million from the right collector. He says it the way somebody else would ask you to set fire to him.',
      icon: 'key',
    },
    {
      id: 'office_lanyard',
      name: 'Your Old Work Lanyard',
      tags: ['personal'],
      description: 'The lanyard from the accounts office you worked at until yesterday, still in your jacket pocket, still with your photo on it looking hopeful.',
      loreText: 'Your manager has texted twice asking whether you are coming in on Monday.',
      icon: 'card',
    },
    {
      id: 'door_jacket',
      name: 'Your Doorman’s Jacket',
      tags: ['personal'],
      description: 'A black bomber jacket from four years on a nightclub door, with a torn pocket from the last fight you broke up.',
      loreText: 'Ryo notices the torn pocket before he notices your face.',
      icon: 'coat',
    },
    {
      id: 'business_cards',
      name: 'A Box of Business Cards',
      tags: ['personal'],
      description: 'Two hundred business cards with your name and a phone company’s logo on them. You are not entirely sure why you brought them.',
      loreText: 'By the end of the week every stallholder in the market has one, and two of them have rung the number.',
      icon: 'card',
    },
    {
      id: 'scooter_key',
      name: 'Your Scooter Key',
      tags: ['personal'],
      description: 'The key to the delivery scooter you rode across the city for three years, on a keyring shaped like a dumpling.',
      loreText: 'The scooter is parked outside the temple, on a yellow line, next to Kagami’s cars.',
      icon: 'key',
    },
  ],
  abilities: [
    {
      id: 'speak_as_boss',
      name: 'Speak as the Boss',
      tags: ['social'],
      description: 'Give an order as head of the family, out loud, and find out whether anybody moves.',
      affordances: ['give an order', 'order them', 'speak as the boss', 'take charge', 'refuse him', 'say no', 'lay down the law', 'pull rank', 'tell them what happens'],
      costs: [{ resourceId: 'nerve', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'command', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_an_offer',
      name: 'Make an Offer',
      tags: ['social'],
      description: 'Put terms on the table: what you give, what you want, and by when.',
      affordances: ['make an offer', 'negotiate', 'make a deal', 'counter', 'bargain', 'offer terms', 'cut a deal', 'name a price'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargaining', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_paper',
      name: 'Read the Paper',
      tags: ['sight'],
      description: 'Read a note, a ledger or a contract properly, and find the line somebody hoped you would skip.',
      affordances: ['read the note', 'read it', 'check the books', 'go through the ledger', 'read the contract', 'read the fine print', 'look at the numbers', 'examine the document'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'numbers', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'straight_face',
      name: 'Keep a Straight Face',
      tags: ['social'],
      description: 'Lie, bluff or hold a hand you do not have, without anything moving in your face.',
      affordances: ['bluff', 'lie', 'pretend', 'keep a straight face', 'act like i have the money', 'hold my nerve', 'play it cool', 'play the move'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'bluffing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lean_on',
      name: 'Lean On Them',
      tags: ['social'],
      description: 'Make it clear, quietly, what happens to somebody if they do not cooperate.',
      affordances: ['threaten', 'intimidate', 'lean on him', 'scare them', 'make a threat', 'put the fear in', 'menace'],
      costs: [
        { resourceId: 'heat', amount: 6 },
        { resourceId: 'feud', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'menace', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'throw_hands',
      name: 'Throw Hands',
      tags: ['combat'],
      description: 'Settle it with your fists, in front of whoever is watching, and live with what the code says about it.',
      affordances: ['hit him', 'punch', 'fight', 'swing at', 'attack', 'throw a punch', 'tackle', 'brawl'],
      costs: [
        { resourceId: 'nerve', amount: 10 },
        { resourceId: 'heat', amount: 14 },
        { resourceId: 'feud', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawling', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pay_respects',
      name: 'Pay Respects',
      tags: ['social'],
      description: 'Bow, kneel, pour first, light incense or apologise properly, the way the old forms say it should be done.',
      affordances: ['bow', 'bow to him', 'pay respects', 'kneel', 'light incense', 'apologise', 'pour for him', 'thank him'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_out',
      name: 'Slip Out',
      tags: ['movement'],
      description: 'Leave without anybody marking the moment you went, or follow somebody without them marking you.',
      affordances: ['slip out', 'leave quietly', 'sneak out', 'follow him', 'tail him', 'lose them', 'disappear', 'walk out'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'streetwise', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stamp_the_seal',
      name: 'Stamp the Seal',
      tags: ['utility'],
      description: 'Press the Heron Seal onto a paper, and put the whole family behind whatever it says.',
      affordances: ['stamp it', 'use the seal', 'seal it', 'sign it with the seal', 'stamp the transfer', 'put the seal on it'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_in_a_favour',
      name: 'Call In a Favour',
      tags: ['social'],
      description: 'Ring somebody from the old man’s notebook and ask, politely, for what they owe the family.',
      affordances: ['call in a favour', 'call in favours', 'ring the names', 'ask what they owe', 'use the notebook', 'call the harbourmaster'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'manners', baseDc: 11 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['has_the_favour_book'],
        lockedCopy:
          'Somebody on this waterfront owes the family something. You do not know who, and nobody is going to volunteer it to a stranger with a seal.',
      },
    },
  ],
  locations: [
    {
      id: 'funeral_hall',
      name: 'The Funeral Hall',
      shortName: 'Funeral',
      description:
        'A rented hall behind a hillside temple, heavy with incense. The coffin sits under a black-framed photograph of the old man scowling at the camera. Eighty folding chairs, half of them filled by fish-market people in borrowed black. Nine silver heron pins lie on a velvet cloth beside the coffin, one for each member. The only door opens onto the temple yard.',
      artDirection:
        'Japanese funeral hall at dusk, rows of folding chairs filled with mourners in black, white chrysanthemums, incense smoke, a coffin under a black-framed portrait of a scowling old man, nine small silver pins on a velvet cloth. Hushed, tense, lit warm gold.',
      connections: [{ to: 'temple_yard', travelMinutes: 1, label: 'Out to the temple yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'temple_yard',
      name: 'The Temple Yard',
      shortName: 'Temple Yard',
      description:
        'Gravel, a stone lantern, a bin nobody uses and a line of black cars, Kagami’s parked nose-out. From the gate one road climbs the hill to the old man’s house and the other runs down to the harbour. It is where people at a funeral go to say what they cannot say inside.',
      artDirection:
        'Temple courtyard at night after rain, gravel and a stone lantern, a row of glossy black cars, mourners talking in pairs, the lit doorway of a funeral hall, city lights below the hill. Cool blue and lantern orange.',
      connections: [
        { to: 'funeral_hall', travelMinutes: 1, label: 'Back into the hall' },
        { to: 'hayami_house', travelMinutes: 9, label: 'Up the hill to the old man’s house' },
        { to: 'harbour_market', travelMinutes: 14, label: 'Down the hill to the harbour' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'hayami_house',
      name: 'The Old Man’s House',
      shortName: 'His House',
      description:
        'A wooden house at the top of the hill, nine minutes’ climb from the temple, with a garden gone to weeds and a study full of fishing-supply calendars. On the study desk, under a stone, is the black notebook he never let anybody read. Nobody has been inside since the ambulance.',
      artDirection:
        'Old wooden Japanese house at night, overgrown garden, sliding doors, a cramped study with stacked fishing calendars and a single desk lamp over a black notebook weighted with a stone. Still, dusty, private.',
      connections: [{ to: 'temple_yard', travelMinutes: 9, label: 'Down to the temple' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'favour_book', qty: 1, ownerId: null, aka: ['notebook', 'the black notebook', 'the favour book', 'his notebook'] },
      ],
    },
    {
      id: 'harbour_market',
      name: 'The Night Market',
      shortName: 'Market',
      description:
        'The old harbour ward’s night market: forty stalls under strings of bulbs, grilled squid, a bakery, a bathhouse chimney. Everybody here knew the old man and is now watching you. The noodle shop is two doors down, Pier 9 at the end of the street, the Lantern on the corner, the police station up the block, the road up to the temple behind, and the bridge to the new side beyond.',
      artDirection:
        'Busy harbour night market in the rain, strings of bare bulbs, grilling stalls with smoke, wet paving, a bakery and bathhouse chimney, fishing cranes at the end of the street, a glass tower glowing across the bay. Dense, warm, crowded.',
      connections: [
        { to: 'temple_yard', travelMinutes: 14, label: 'Up the hill to the temple' },
        { to: 'noodle_shop', travelMinutes: 2, label: 'Hachi’s noodle shop' },
        { to: 'pier_nine', travelMinutes: 6, label: 'Down to Pier 9' },
        { to: 'lantern_bar', travelMinutes: 4, label: 'The Lantern, on the corner' },
        { to: 'harbour_station', travelMinutes: 7, label: 'Up the block to the police station' },
        { to: 'kagami_tower', travelMinutes: 22, label: 'Across the bridge to the new side' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'noodle_shop',
      name: 'Hachi’s Noodle Shop',
      shortName: 'Noodle Shop',
      description:
        'A narrow noodle shop two doors from the market, its shutter permanently half down. Eight stools, a counter, and a stove that has fed the family every day for thirty years. The back stairs go up to the family office. Hachi sleeps in the back room.',
      artDirection:
        'Tiny old ramen shop at night with the shutter half lowered, eight stools at a worn counter, steam from big pots, handwritten menu boards, a staircase at the back. Warm, cramped, homely.',
      connections: [
        { to: 'harbour_market', travelMinutes: 2, label: 'Out to the market' },
        { to: 'family_office', travelMinutes: 1, label: 'Up the back stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'car_keys', qty: 1, ownerId: 'hachi', aka: ['car keys', 'the keys', 'his keys', 'the sedan keys'] },
      ],
    },
    {
      id: 'family_office',
      name: 'The Family Office',
      shortName: 'Office',
      description:
        'One room up the back stairs from the noodle shop. The old man’s desk, a fishing-supply calendar, a framed heron, the couch Ryo sleeps on, Saeko’s ledgers, and a squat green safe behind the desk that only opens with a combination.',
      artDirection:
        'Small cluttered office above a shop at night, a heavy old desk, a framed ink painting of a heron, stacked ledgers, a battered couch, a squat green safe, rain on the window and neon from the street below.',
      connections: [{ to: 'noodle_shop', travelMinutes: 1, label: 'Down the back stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'family_ledger', qty: 1, ownerId: 'saeko', aka: ['ledger', 'the books', 'the accounts', 'the family ledger'] },
        { itemId: 'blue_passbook', qty: 1, ownerId: 'saeko', aka: ['passbook', 'the blue passbook', 'the blue one', 'bank book'] },
      ],
    },
    {
      id: 'pier_nine',
      name: 'Pier 9',
      shortName: 'Pier 9',
      description:
        'The last working pier in the old harbour, at the end of the market street. The fishermen’s co-op lands its catch here before dawn and auctions it in a tin shed. The family has held the lease for fifty years. There is a chain-link gate with the co-op’s padlock on it, and the breakwater runs out to sea from the far end.',
      artDirection:
        'Old fishing pier at night, rusted cranes, moored fishing boats with lamps, a tin auction shed, a chain-link gate with a padlock, wet concrete, a breakwater with a lighthouse beyond. Industrial, salty, cold blue.',
      connections: [
        { to: 'harbour_market', travelMinutes: 6, label: 'Back up the market street' },
        { to: 'breakwater', travelMinutes: 5, label: 'Out along the breakwater' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'breakwater',
      name: 'The Breakwater',
      shortName: 'Breakwater',
      description:
        'A concrete arm out into the bay from the end of Pier 9, with a small lighthouse at the tip and the glass tower on the new side lit up across the water. Quiet, windy, and the only place on the waterfront nobody owns.',
      artDirection:
        'Long concrete breakwater at night, a small lighthouse, wind and spray, the bay black and glittering, a lit glass skyscraper across the water. Lonely, romantic, cold.',
      connections: [{ to: 'pier_nine', travelMinutes: 5, label: 'Back to the pier' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'lantern_bar',
      name: 'The Lantern',
      shortName: 'Lantern',
      description:
        'A tiny bar on the market corner, neutral ground under the harbour code for sixty years. The owner, an old woman everybody calls Mother Fuku, serves tea or sake and allows no raised voices. In the back, a go board with a game left half-played on it, black to move. Debts are called here at midnight, in front of the families.',
      artDirection:
        'Tiny traditional bar at night, a red paper lantern over the door, a short wooden counter, an elderly woman behind it, a go board with stones mid-game on a low table at the back, two empty cups. Intimate, smoky gold, very still.',
      connections: [{ to: 'harbour_market', travelMinutes: 4, label: 'Back out to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'harbour_station',
      name: 'The Harbour Police Station',
      shortName: 'Station',
      description:
        'The harbour precinct station, up the block from the market: a front desk, a vending machine that only sells canned coffee, and the organised-crime desk upstairs, which is Detective Nori and a filing cabinet.',
      artDirection:
        'Small worn police station at night, fluorescent light, a front counter, a vending machine full of canned coffee, an upstairs desk buried in files under a window. Tired, functional, grey.',
      connections: [{ to: 'harbour_market', travelMinutes: 7, label: 'Back down to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'kagami_tower',
      name: 'The Kagami Tower',
      shortName: 'The Tower',
      description:
        'A glass tower on reclaimed land across the bridge, eighteen floors. Men in dark jackets in the lobby. Kagami’s office is at the top, with a view of the whole old harbour, and his safe is behind a painting of the bay as it looked fifty years ago.',
      artDirection:
        'Sleek glass office tower at night on reclaimed land, a marble lobby with guards in dark suits, a penthouse office with floor-to-ceiling windows over an old harbour, an oil painting of the bay hiding a safe. Cold, rich, quiet.',
      connections: [{ to: 'harbour_market', travelMinutes: 22, label: 'Back across the bridge' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'debt_note', qty: 1, ownerId: 'kagami', aka: ['note', 'the note', 'the debt note', 'the promissory note'] },
        { itemId: 'resort_contract', qty: 1, ownerId: 'kagami', aka: ['contract', 'the contract', 'the resort papers', 'the developer contract'] },
      ],
    },
  ],
  /**
   * Five, and the Harbour Ward goes first on purpose: the engine's
   * public-violence path drops standing with the first faction in array order,
   * and a fight in the market costs the market people before anybody else.
   */
  factions: [
    {
      id: 'faction_ward',
      name: 'The Harbour Ward',
      description:
        'The night market’s forty stalls, the fishermen’s co-op that lands its catch on Pier 9, the bakery, the bathhouse and the old women on the benches. For fifty years they paid the Hayami family small dues and the family kept the peace: no shakedowns from outside, fights settled before the police came, a loan when the boats came back empty. They loved the old man and do not know you.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'The old man’s grandchild' },
        { atReputation: 40, label: 'Our boss' },
        { atReputation: 70, label: 'One of the ward' },
      ],
      allies: ['faction_hayami'],
      enemies: [],
    },
    {
      id: 'faction_hayami',
      name: 'The Hayami Family',
      description:
        'Nine people left of two hundred. Three lieutenants, Ryo, Saeko and Hachi, and six members: Goro and Taka, who drive; the Endo twins, who run errands for the market; Kiku, who works the Lantern’s door; and Bun, nineteen, who joined last month. Each wears a silver heron pin. On the seventh evening each of them drinks from the old man’s cup to the new boss, or hands back the pin and walks.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'The heir nobody picked' },
        { atReputation: 30, label: 'Boss on paper' },
        { atReputation: 50, label: 'Boss' },
        { atReputation: 80, label: 'The old man’s successor' },
      ],
      allies: ['faction_ward'],
      enemies: ['faction_kagami'],
    },
    {
      id: 'faction_families',
      name: 'The Lantern Table',
      description:
        'The heads of the five old harbour families, the Hayami and the Kagami among them, who meet at the Lantern and keep the harbour code. The other three families are small and old, and they side with whoever keeps the code and against whoever breaks it first.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'A name at the table' },
        { atReputation: 35, label: 'A voice at the table' },
        { atReputation: 60, label: 'The table listens' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_kagami',
      name: 'The Kagami Group',
      description:
        'Across the bridge on the new side: a glass tower on reclaimed land, a finance company, a security firm run by Kagami’s daughter, and about forty men in dark jackets. Richer than the Hayami family has ever been, unfailingly polite, and in a hurry about the waterfront that nobody can explain.',
      startingReputation: -10,
      ranks: [
        { atReputation: -40, label: 'Enemy of the tower' },
        { atReputation: 0, label: 'A problem' },
        { atReputation: 30, label: 'A rival worth respecting' },
        { atReputation: 60, label: 'Partner' },
      ],
      allies: [],
      enemies: ['faction_hayami'],
    },
    {
      id: 'faction_police',
      name: 'The Harbour Police',
      description:
        'The harbour precinct’s organised-crime desk is one tired detective and a filing cabinet. Upstairs wants the waterfront quiet and the developers happy, and does not ask which of those is paying for the other.',
      startingReputation: 0,
      ranks: [
        { atReputation: -30, label: 'A file' },
        { atReputation: 0, label: 'A name in a file' },
        { atReputation: 30, label: 'A source' },
        { atReputation: 60, label: 'A friend at the station' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'ryo',
      name: 'Ryo Okumura',
      role: 'The old man’s first lieutenant for sixteen years, who expected the seal to be his',
      cardBlurb:
        'He ran the family’s streets for sixteen years, he expected to be standing where you are, and he will call you boss when he means it and not one day before.',
      pronouns: 'he/him',
      publicTraits: ['Says less than he knows', 'Never late, never loud', 'Keeps a promise past the point of sense'],
      hiddenDrives: [
        'He wants somebody to tell him he did enough for the old man, and the only person who could is in the coffin',
        'He would trade his own place in the family for the six other members having a future, and Kagami has worked that out',
      ],
      values: ['Showing up', 'Looking after the newer members before himself', 'A debt paid in full, on time, in person'],
      fears: [
        'That the family dies on his watch and he is the last person who remembers what it was for',
        'Being the reason the other six end up working for Kagami anyway',
      ],
      socialStyle:
        'Stands one step behind and to the left of whoever he is protecting. Answers a question with the shortest true sentence available, then waits to see what you do with it.',
      boundaries: [
        'Will not lie to the boss, whoever the boss is, though he will not volunteer much either',
        'Will not raise a hand on the waterfront unless somebody else has already broken the code',
        'Will not let the player be hurt in front of him, whatever he thinks of them',
      ],
      goals: [
        'Get the family through midnight with the pier and with nobody in hospital',
        'Decide what to tell Kagami before Kagami decides for him',
      ],
      secrets: [
        {
          id: 'ryo_the_offer',
          fact: 'Two nights before the funeral Kagami offered him the Pier 9 night shift and jobs for the six other members, in return for bringing the Heron Seal to the tower. He has not said yes. He has not said no.',
          visibility: 'NPC_PRIVATE',
          revealHint:
            'He tells you himself if you ask him straight what Kagami wants from him, after you have done one thing in front of the family that the old man would have done.',
        },
        {
          id: 'ryo_passed_over',
          fact: 'Last spring the old man told him he would not be the heir, because "you would die for this family, and I need somebody who would close it." He has never told anybody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after the seventh day, or if you ask him why he thinks he was passed over and do not argue with the answer.',
        },
      ],
      speechStyle:
        'Clipped, formal, no wasted words. Says "Boss" as a sentence on its own, with a pause in front of it that gets shorter as he decides about you. Refers to the dead man only as "the old man". Never swears, never raises his voice, and gives instructions as plain facts.',
      topics: ['the old man', 'Kagami’s offer', 'the other six members', 'the harbour code', 'Pier 9', 'why he was passed over'],
      voiceSamples: [
        'Boss. ...Boss. Practising. Give me a week.',
        'The old man said you would ask that twice. He said to answer the second time. That was the first.',
        'Hands out of your pockets when you walk past his men. Slow. Let them see you are in no hurry.',
        'He offered me the night shift on the pier and work for the other six. Two nights ago. I have not answered him. That is all of it.',
      ],
      appearance:
        'An adult man, lean and very still, a black suit worn like a uniform, hair cut short at the sides, a black mourning tie knotted exactly, a pale scar through his left eyebrow.',
      visualHook: 'A thin white scar through his left eyebrow that makes him look permanently unconvinced.',
      silhouette: 'One step behind and to the left of somebody else, hands folded in front of him, perfectly still.',
      artSeed: 'iofc-ryo-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'guarded', 'surprised', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'family_office', activity: 'on the office couch with his shoes still on' },
        { startMinute: 420, endMinute: 600, locationId: 'harbour_market', activity: 'walking the market stall by stall, collecting nothing, being seen' },
        { startMinute: 600, endMinute: 900, locationId: 'pier_nine', activity: 'on Pier 9 with the co-op foreman, counting boats' },
        { startMinute: 900, endMinute: 1050, locationId: 'noodle_shop', activity: 'at the noodle shop counter, eating standing up' },
        { startMinute: 1050, endMinute: 1260, locationId: 'funeral_hall', activity: 'keeping the vigil beside the old man’s coffin' },
        { startMinute: 1260, endMinute: 1440, locationId: 'family_office', activity: 'at the office window, phone face down on the sill' },
      ],
      homeLocationId: 'family_office',
      knowledgeScope: ['hayami_family', 'harbour_code', 'pier_nine', 'kagami_group', 'kagamis_offer', 'the_old_man'],
      startingRelationship: { trust: 25, affection: 10, respect: 10, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'ryo_calls_you_boss',
          label: 'He calls you boss without the pause',
          kind: 'TRUST',
          requires: { trust: 50, respect: 40 },
        },
        {
          id: 'ryo_tells_you_about_the_offer',
          label: 'He tells you what Kagami offered him',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_family'] },
        },
        {
          id: 'ryo_backs_you_at_the_lantern',
          label: 'He stands behind you in front of the families',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 55 },
        },
      ],
      attributes: { might: 15, agility: 13, mind: 12, presence: 13, resolve: 16, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 16, damage: 12, tags: ['brawler', 'bodyguard'] },
    },
    {
      id: 'saeko',
      name: 'Saeko Imai',
      role: 'The family’s accountant, a former bank auditor, and the only person who knows what it is actually worth',
      cardBlurb:
        'She knows to the yen how broke you have just become, she is not impressed by anybody’s grandfather, and she is the only person in the family who will tell you the truth in numbers.',
      pronouns: 'she/her',
      publicTraits: ['Precise to the point of rudeness', 'Never without a pencil', 'Funny only when she is furious'],
      hiddenDrives: [
        'A bank fired her for being right, and the old man was the first employer who wanted to see the column she had been hiding',
        'She has quietly decided that the family should end well rather than survive badly, and is waiting for somebody with the authority to agree',
      ],
      values: ['A number written down is a promise', 'Paying people what they are owed before paying yourself', 'Not rounding'],
      fears: [
        'Being the person who kept a dying business alive past the point of kindness',
        'That the passbook is the only thing the old man trusted her with, and she will be the one who spends it',
      ],
      socialStyle:
        'Talks to people across a desk even when there is no desk. Asks for documents before opinions, and gives her opinions only as figures.',
      boundaries: [
        'Will not cook the books, for anybody, including the boss',
        'Will not hand over the passbook to somebody who has not asked her what it is for',
        'Will not go near a fight; she will be in the office writing down what it cost',
      ],
      goals: [
        'Make the new boss understand the books before midnight',
        'Keep the six point two million for the people it was meant for',
      ],
      secrets: [
        {
          id: 'saeko_the_passbook',
          fact: 'Two years ago the old man had her open a second account: six point two million yen in a blue passbook labelled, in his handwriting, FOR WHEN THEY LEAVE. It is severance for the members if the family ever ends. Ryo does not know it exists.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you go through the books with her and ask what the family would owe its own people if it closed tomorrow.',
        },
        {
          id: 'saeko_the_pencil_note',
          fact: 'Under the ten million on the last page of the ledger the old man wrote in pencil, "Sorry. Ask Saeko about the blue one." She has pretended not to have read it since March.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who reads the last page of the ledger carefully finds it. She will not point it out.',
        },
      ],
      speechStyle:
        'Figures first, adjectives never. Lists assets and liabilities out loud as if reading a balance sheet. Dry, quick and sarcastic about money in a way that is secretly about people. Says "Net" when she means "in the end".',
      topics: ['the ledger', 'the ten million', 'the blue passbook', 'what the family is worth', 'her old bank', 'the old man’s handwriting'],
      voiceSamples: [
        'Assets: one pier lease, one sedan with a rattle, a noodle shop that loses forty thousand a month. Liabilities: everyone at this funeral. Ten million is the one with a deadline.',
        'Do not round. Every time somebody in this family rounds a number, somebody else ends up in hospital.',
        'I audited a bank for four years. Your grandfather is the only man who ever asked to see the column I was hiding.',
        'Net? Net, he was a good man who could not add. Write that down if you need it for the speech.',
      ],
      appearance:
        'An adult woman in a narrow black mourning suit, dark hair pinned up in a hurry, square black glasses, a pencil behind one ear and a ledger held flat against her chest like a shield.',
      visualHook: 'A yellow pencil behind her ear, which she takes out to point at people as if they were columns.',
      silhouette: 'Ledger against her chest, one hip against a desk, glasses pushed up into her hair.',
      artSeed: 'iofc-saeko-01',
      portrait: null,
      expressions: ['neutral', 'unimpressed', 'sharp', 'surprised', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'harbour_market', activity: 'at home in her flat above the bakery' },
        { startMinute: 450, endMinute: 1020, locationId: 'family_office', activity: 'at the old man’s desk with the ledger and a calculator' },
        { startMinute: 1020, endMinute: 1080, locationId: 'noodle_shop', activity: 'eating Hachi’s noodles with the ledger open beside the bowl' },
        { startMinute: 1080, endMinute: 1230, locationId: 'funeral_hall', activity: 'at the vigil, at the end of the family’s row, doing sums in her head' },
        { startMinute: 1230, endMinute: 1440, locationId: 'family_office', activity: 'back at the desk, adding it all up again' },
      ],
      homeLocationId: 'harbour_market',
      knowledgeScope: ['hayami_family', 'the_ledger', 'blue_passbook', 'the_debt', 'the_old_man'],
      startingRelationship: { trust: 20, affection: 10, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'saeko_shows_the_second_book',
          label: 'She tells you about the blue passbook',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:how_broke'] },
        },
        {
          id: 'saeko_stays_late',
          label: 'She stays at the office past midnight for a reason that is not the books',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 55 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 17, presence: 12, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 12, damage: 2, tags: ['civilian'] },
    },
    {
      id: 'kagami',
      name: 'Tatsuo Kagami',
      calledName: 'Kagami',
      role: 'Boss of the Kagami Group across the bay, your grandfather’s rival for forty years, and the man holding the note',
      cardBlurb:
        'He fought your grandfather for forty years and came to his funeral in white, he holds a note that takes your pier at midnight, and he is the most polite man you will ever be afraid of.',
      pronouns: 'he/him',
      publicTraits: ['Courteous at all times', 'Patient as a tide', 'Pays every debt he owes, to the yen'],
      hiddenDrives: [
        'He is grieving the only man who ever beat him, and he has not let himself look at the old man’s chair at the go board',
        'He signed with the resort developer because he has no son and wants his daughter to inherit money instead of a war',
      ],
      values: ['Manners, because they are cheaper than blood', 'A debt is sacred, his own included', 'Never being seen to hurry'],
      fears: [
        'Dying the way the old man did, with the family half sold and nobody told',
        'His daughter finding out what the waterfront deal costs before it is done',
      ],
      socialStyle:
        'Bows exactly as low as he is bowed to, never lower. Pours tea for whoever he intends to defeat. Lets a silence go on until the other person fills it.',
      boundaries: [
        'Will not break the harbour code first, and will destroy whoever does',
        'Will not raise a hand himself; he has men for that and despises the ones who enjoy it',
        'Will not move the stones on the old man’s board, and will not let anybody else',
      ],
      goals: [
        'Have Pier 9 by one in the morning, by the code, with paper',
        'Deliver the whole waterfront to the developer before the end of the month',
      ],
      secrets: [
        {
          id: 'kagami_the_resort',
          fact: 'He has signed a contract with a resort developer to deliver the entire old waterfront, Pier 9 included, by the end of the month, for four hundred million yen. Two city councillors have been paid. Pier 9 is the last piece.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The contract is in the safe in his tower office. Mariko knows; Detective Nori suspects. He will never say it himself.',
        },
        {
          id: 'kagami_the_last_game',
          fact: 'Their last game is still on the board at the Lantern, black to play, and black was the old man. He has decided that whoever plays the old man’s move for him may ask for anything he can give, and he has told nobody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Sit across the board from him at the Lantern and play the old man’s move without asking permission, and he will tell you what it means.',
        },
      ],
      speechStyle:
        'Slow, formal, complete sentences, an old-fashioned courtesy that never once drops. Talks about the dead in the present tense. Uses the language of debts, games and manners. Calls the player "young boss" and means several things by it.',
      topics: ['the debt', 'the harbour code', 'the go board at the Lantern', 'forty years with your grandfather', 'his daughter', 'manners'],
      voiceSamples: [
        'Ten million by midnight, young boss. Or the docks are mine.',
        'Your grandfather and I played one game a month for forty-one years. He won two hundred and six of them. I paid for dinner every single time.',
        'Manners are cheaper than blood and they last longer. Bow properly and we may talk until dawn.',
        'The board is exactly as he left it. Black to play. I find I would rather nobody played at all.',
      ],
      appearance:
        'An older man, silver hair combed straight back, a white mourning suit cut perfectly, a black silk band on one sleeve, both hands folded over a plain black walking cane he does not need.',
      visualHook: 'A white suit among a hall full of black, worn as respect in the oldest sense and read as an insult by everybody else.',
      silhouette: 'Upright, cane planted in front of him with both hands on it, head tilted a few degrees in courtesy.',
      artSeed: 'iofc-kagami-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'amused', 'cold', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'lantern_bar', activity: 'finishing his tea at the Lantern, across the board from an empty chair' },
        { startMinute: 60, endMinute: 480, locationId: 'kagami_tower', activity: 'in the penthouse of the tower, awake before anybody' },
        { startMinute: 480, endMinute: 1080, locationId: 'kagami_tower', activity: 'in his office on the eighteenth floor, receiving people' },
        { startMinute: 1080, endMinute: 1170, locationId: 'funeral_hall', activity: 'paying his respects at the vigil, every evening, which nobody expected' },
        { startMinute: 1170, endMinute: 1440, locationId: 'lantern_bar', activity: 'at the go board in the Lantern, not touching the stones' },
      ],
      homeLocationId: 'kagami_tower',
      knowledgeScope: ['kagami_group', 'harbour_code', 'the_debt', 'the_resort_deal', 'the_last_game', 'the_old_man'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'kagami_sits_down_with_you',
          label: 'He invites you to sit at the old man’s board',
          kind: 'OTHER',
          requires: { respect: 35 },
        },
        {
          id: 'kagami_plays_for_it',
          label: 'He agrees to play one game for the debt',
          kind: 'OTHER',
          requires: { respect: 45, flagsSet: ['funeral_over'] },
        },
      ],
      attributes: { might: 9, agility: 8, mind: 16, presence: 17, resolve: 17, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 12, damage: 3, tags: ['civilian', 'guarded'] },
    },
    {
      id: 'mariko',
      name: 'Mariko Kagami',
      role: 'Kagami’s daughter and heir, who runs his security firm and grew up on the same waterfront you are about to lose',
      cardBlurb:
        'She stood beside her father at your grandfather’s funeral and did not bow, she could put you on the floor in under three seconds, and she has a reason of her own to want you to keep that pier.',
      pronouns: 'she/her',
      publicTraits: ['Blunt', 'Unhurried in a fight and impatient everywhere else', 'Calls her father "the chairman" to his face'],
      hiddenDrives: [
        'She wants to inherit something she is not ashamed of',
        'She has been looking for one person on the waterfront who will say no to her father, so that she is not the only one',
      ],
      values: ['A clean fight with rules', 'The waterfront as it is, fish market and all', 'Saying what she means once'],
      fears: [
        'Becoming her father with better manners',
        'Being the reason the old waterfront is paved over, because she said nothing',
      ],
      socialStyle:
        'Stands too close on purpose to see whether you step back. Teases people she respects and is icily polite to people she does not.',
      boundaries: [
        'Will not betray her father in public; whatever she does, she does where he can be told about it to his face',
        'Will not fight anybody who cannot fight back',
        'Will not be used to carry a message to him',
      ],
      goals: [
        'Stop the waterfront deal without destroying her father',
        'Find out whether the new Hayami boss is worth standing next to',
      ],
      secrets: [
        {
          id: 'mariko_knows',
          fact: 'She knows about the resort contract and the four hundred million, and has photographs of every page on her phone. She has not decided what to do with them.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the breakwater, late, if you have told her something true about what you want for the waterfront rather than for the family.',
        },
        {
          id: 'mariko_the_bike',
          fact: 'She learned to ride a bicycle on Pier 9, and the old man was the one holding the back of the seat. Her father has never known.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you walk out onto the pier with her and do not ask her for anything while you are there.',
        },
      ],
      speechStyle:
        'Short, dry, sporting. Talks about people the way a fencer talks about an opponent: stance, distance, opening. Teases first and checks second. Never says "father"; says "the chairman".',
      topics: ['the chairman', 'the waterfront', 'the security firm', 'kendo', 'Pier 9', 'what she wants'],
      voiceSamples: [
        'Relax. If the chairman wanted you hurt, he would have sent somebody polite.',
        'Your stance is terrible. Feet wider. If you are going to stand in front of him all week, stand properly.',
        'One clean point. That is all a match is. Everything else is people shouting.',
        'I learned to ride a bike on that pier. So, yes. I have opinions about who gets it.',
      ],
      appearance:
        'An adult woman, tall, black hair in a high tight tail, a fitted charcoal suit with the jacket open, flat shoes she can run in, a thin silver chain at her throat and a healed nick across the knuckles of her right hand.',
      visualHook: 'A bamboo practice sword in a black bag over one shoulder, carried everywhere, including a funeral.',
      silhouette: 'Weight forward on the balls of her feet, sword bag on her shoulder, head tilted as if measuring the distance.',
      artSeed: 'iofc-mariko-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'sharp', 'surprised', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'kagami_tower', activity: 'at her flat on the twelfth floor of the tower' },
        { startMinute: 360, endMinute: 480, locationId: 'breakwater', activity: 'running the length of the breakwater at dawn' },
        { startMinute: 480, endMinute: 1080, locationId: 'kagami_tower', activity: 'running the security firm from a floor below her father' },
        { startMinute: 1080, endMinute: 1170, locationId: 'funeral_hall', activity: 'beside her father at the vigil, not bowing' },
        { startMinute: 1170, endMinute: 1320, locationId: 'breakwater', activity: 'alone at the end of the breakwater with a can of coffee' },
        { startMinute: 1320, endMinute: 1440, locationId: 'lantern_bar', activity: 'at the end of the Lantern’s counter, watching her father not touch the board' },
      ],
      homeLocationId: 'kagami_tower',
      knowledgeScope: ['kagami_group', 'the_resort_deal', 'pier_nine', 'harbour_code', 'the_waterfront'],
      startingRelationship: { trust: 5, affection: 5, respect: 15, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'mariko_on_the_breakwater',
          label: 'She talks to you on the breakwater as herself',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'mariko_shows_you_the_photos',
          label: 'She shows you what is on her phone',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 45 },
        },
        {
          id: 'mariko_stays',
          label: 'She stays on the breakwater after the coffee is finished',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60 },
        },
      ],
      attributes: { might: 14, agility: 17, mind: 13, presence: 14, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 75, defenseDc: 18, damage: 13, tags: ['kendo', 'disciplined'] },
    },
    {
      id: 'hachi',
      name: 'Hachiro Ueda',
      calledName: 'Hachi',
      role: 'Third lieutenant, the old man’s driver for twenty-six years, and the family’s cook',
      cardBlurb:
        'He drove your grandfather for twenty-six years, he will feed you before he lets you make any decision, and he knows the one number in the family office that nobody else does.',
      pronouns: 'he/him',
      publicTraits: ['Enormous and gentle', 'Cries easily and is not embarrassed about it', 'Remembers what everybody eats'],
      hiddenDrives: [
        'He wants the noodle shop open to the public again, the way it was before the family needed it as a front',
        'He has been waiting six weeks for somebody to ask him where he drove the old man',
      ],
      values: ['Nobody decides anything on an empty stomach', 'Loyalty to the person, not the title', 'Keeping his mouth shut when he has been asked to'],
      fears: [
        'Outliving the family the way he has outlived the old man',
        'Being asked to hurt somebody again; he did it once, thirty years ago, and stopped',
      ],
      socialStyle:
        'Feeds people as a way of keeping them in the room. Tells long stories about the old man that turn out to contain exactly the piece of information you needed.',
      boundaries: [
        'Will not fight, under any circumstances; he will stand in a doorway and be very large',
        'Will not give the safe combination to anybody the old man would not have, and decides that by how they treat the other members',
        'Will not let anybody leave the shop hungry',
      ],
      goals: [
        'Get the new boss to eat something before midnight',
        'See the noodle shop with its shutter all the way up and a queue outside',
      ],
      secrets: [
        {
          id: 'hachi_the_registry',
          fact: 'Six weeks ago he drove the old man to the registry office and back. The old man came out with an envelope and put it in the office safe. Hachi knows the combination: it is the date the noodle shop first opened.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you eat with the family and then ask him where he drove the old man on his last good day.',
        },
        {
          id: 'hachi_thirty_years',
          fact: 'Thirty years ago he put a man in hospital for the family and has not raised a hand since. The old man let him stop.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask him to stand with you at the pier at midnight, he tells you why he will stand there but will not fight.',
        },
      ],
      speechStyle:
        'Warm, rambling, full of food and the old man’s habits. Starts every serious conversation by asking whether you have eaten. Repeats the thing he means when he is moved, as if checking it is still true.',
      topics: ['the old man', 'what you have eaten', 'the noodle shop', 'the old car', 'the registry office', 'the family’s old days'],
      voiceSamples: [
        'Have you eaten? No. Sit. Nobody decides about ten million on an empty stomach. He never let anybody try.',
        'Twenty-six years in the same car, because he said a new one would make the fishmongers nervous. Twenty-six years.',
        'You have his ears. Sorry. I will stop. You do, though. You have his ears.',
        'Six weeks ago I drove him somewhere and waited outside. He came out smiling. He said, Hachi, do not ask. So I did not ask.',
      ],
      appearance:
        'An older man, enormous and soft-spoken, shaved head, a black suit straining at the shoulders with a white cook’s apron tied over it, reading glasses pushed up onto his forehead.',
      visualHook: 'A cook’s apron tied over his funeral suit, because there would be people to feed afterwards.',
      silhouette: 'Filling a doorway, a ladle or a tray in one hand, head bowed slightly to fit under the frame.',
      artSeed: 'iofc-hachi-01',
      portrait: null,
      expressions: ['warm', 'grieving', 'worried', 'amused', 'neutral'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'noodle_shop', activity: 'in the back room of the noodle shop, where he has slept for twenty years' },
        { startMinute: 360, endMinute: 540, locationId: 'harbour_market', activity: 'at the dawn fish auction, arguing about mackerel' },
        { startMinute: 540, endMinute: 1020, locationId: 'noodle_shop', activity: 'at the stove, cooking for nine people and half the stallholders' },
        { startMinute: 1020, endMinute: 1260, locationId: 'funeral_hall', activity: 'at the vigil, refilling everybody’s tea' },
        { startMinute: 1260, endMinute: 1440, locationId: 'noodle_shop', activity: 'washing up with the radio on low' },
      ],
      homeLocationId: 'noodle_shop',
      knowledgeScope: ['hayami_family', 'the_old_man', 'the_safe', 'the_registry_office', 'the_noodle_shop'],
      startingRelationship: { trust: 40, affection: 50, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hachi_gives_you_the_number',
          label: 'He tells you the safe combination',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['funeral_over'] },
        },
        {
          id: 'hachi_asks_about_the_shutter',
          label: 'He asks you about opening the noodle shop to the public again',
          kind: 'ALLIANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 17, agility: 8, mind: 11, presence: 13, resolve: 14, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 90, defenseDc: 12, damage: 3, tags: ['will-not-fight'] },
    },
    {
      id: 'nori',
      name: 'Asako Nori',
      calledName: 'Nori',
      role: 'Organised-crime detective for the harbour precinct, who traded information with your grandfather for nineteen years',
      cardBlurb:
        'She lit incense at the back of your grandfather’s funeral and then waited by the gate, she has a case against Kagami that needs one more piece of paper, and she would very much like you to be that paper.',
      pronouns: 'she/her',
      publicTraits: ['Tired and funny about it', 'Drinks terrible canned coffee on principle', 'Never writes anything down in front of you'],
      hiddenDrives: [
        'She liked the old man, which she cannot say out loud to anybody at work',
        'She is being moved to a desk inland at the end of next week, and this is the last case she gets to finish',
      ],
      values: ['What can be proved, as opposed to what everybody knows', 'Keeping civilians out of it', 'A trade honestly kept, even with a criminal'],
      fears: [
        'Watching the waterfront get paved and knowing exactly who was paid',
        'Getting somebody hurt with a case she was too impatient to build properly',
      ],
      socialStyle:
        'Asks one question and then waits a very long time. Trades a fact for a fact and keeps careful count of who is ahead.',
      boundaries: [
        'Will not watch the player commit a crime and pretend she did not see it',
        'Will not reveal who her other sources are, the old man included',
        'Will not arrest anybody for being at a funeral',
      ],
      goals: [
        'Get Kagami’s resort contract, or a witness to it, before she is moved',
        'Keep the family out of the line of fire while she does it',
      ],
      secrets: [
        {
          id: 'nori_the_trade',
          fact: 'For nineteen years she and the old man traded information, never money. He kept the harbour quiet and she kept the family’s small sins off her desk. He told her about the resort deal a month before he died, and she has not been able to prove a word of it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you go to the station on your own and tell her one true thing about the family without being asked.',
        },
        {
          id: 'nori_the_transfer',
          fact: 'She has been reassigned to an inland desk from the end of next week. After that, nobody at the station will touch Kagami.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her why she is in such a hurry, she shows you the notice.',
        },
      ],
      speechStyle:
        'Dry, tired, procedural. Separates what she knows from what she can prove, out loud, every time. Gives times and dates to the minute. Calls everybody by their surname, including herself.',
      topics: ['your grandfather', 'Kagami', 'what she can prove', 'the waterfront', 'her transfer', 'canned coffee'],
      voiceSamples: [
        'Nineteen years I traded with your grandfather. Facts for facts, never money. He was the only honest liar on this waterfront.',
        'Here is what I know. Here is what I can prove. Two different lists, and the second one is short.',
        'Canned coffee, black. It is terrible. I drink it because it tastes the same in every station in the country.',
        'I cannot stop a man taking a pier with a signed note. I can stop him if somebody shows me what he is selling it for.',
      ],
      appearance:
        'An adult woman, wiry, short grey-streaked hair, a creased grey raincoat over a dark suit, a police badge on a lanyard tucked inside the coat and a can of coffee in one hand.',
      visualHook: 'A can of black coffee in her hand at all hours, finished, crushed flat and dropped in the correct bin.',
      silhouette: 'Leaning on a gatepost in a long raincoat, one hand in a pocket, the other holding a can.',
      artSeed: 'iofc-nori-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'tired', 'alert', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'harbour_station', activity: 'on the night desk at the harbour station' },
        { startMinute: 420, endMinute: 1020, locationId: 'harbour_station', activity: 'at her desk upstairs, building a case nobody upstairs wants' },
        { startMinute: 1020, endMinute: 1260, locationId: 'temple_yard', activity: 'by the temple gate, watching who comes to the vigil' },
        { startMinute: 1260, endMinute: 1440, locationId: 'harbour_market', activity: 'eating standing up at a market stall' },
      ],
      homeLocationId: 'harbour_station',
      knowledgeScope: ['harbour_police', 'kagami_group', 'the_resort_deal', 'the_old_man', 'harbour_code'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nori_off_the_record',
          label: 'She talks to you off the record',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'nori_makes_a_deal',
          label: 'She offers you a deal on Kagami',
          kind: 'ALLIANCE',
          requires: { trust: 50, flagsSet: ['knows:the_resort_deal'] },
        },
      ],
      attributes: { might: 11, agility: 12, mind: 16, presence: 12, resolve: 16, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 15, damage: 8, tags: ['police'] },
    },
  ],
  quests: [
    {
      id: 'q_ten_million',
      title: 'Ten Million by Midnight',
      summary:
        'Your grandfather borrowed ten million from his oldest rival against the lease on Pier 9. It is called at the Lantern at midnight tonight, and if it is not paid the pier is Kagami’s by one in the morning.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['kagami', 'ryo', 'saeko', 'hachi'],
      involvedLocationIds: ['funeral_hall', 'lantern_bar', 'pier_nine', 'family_office'],
      knownRewardCopy: 'The pier kept or lost, and the first thing everybody on the waterfront learns about the new boss.',
      steps: [
        {
          id: 'answer_him',
          playerCopy: 'Answer Kagami in front of the whole funeral.',
          directorNotes:
            'Eighty mourners, half of them from the fish market, and Kagami has made this a public question on purpose. Every route is a real answer. Bowing and accepting is honourable under the code and costs only pride. Refusing out loud wins the family and wakes the feud. Reading the note before answering is the office worker’s move, and Kagami is quietly impressed by it. Hitting him at a funeral breaks the code in front of everybody. Whatever happens, he does not escalate inside the hall: a funeral is a funeral.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bowed_and_accepted',
              label: 'Bow and accept the debt in front of everyone',
              predicate: { flagsSet: ['used:pay_respects'] },
              setsFlags: ['accepted_the_debt'],
              closesFlags: ['refused_kagami'],
            },
            {
              routeId: 'refused_out_loud',
              label: 'Tell him the family does not do business at a funeral',
              predicate: { flagsSet: ['used:speak_as_boss'] },
              setsFlags: ['refused_kagami', 'family_saw_a_boss'],
              closesFlags: ['accepted_the_debt'],
            },
            {
              routeId: 'read_the_note_first',
              label: 'Read every word of the note before you answer',
              predicate: { flagsSet: ['used:read_the_paper'] },
              setsFlags: ['read_the_note'],
              closesFlags: [],
            },
            {
              routeId: 'named_terms',
              label: 'Answer with terms of your own',
              predicate: { flagsSet: ['used:make_an_offer'] },
              setsFlags: ['bargained_at_the_funeral'],
              closesFlags: [],
            },
            {
              routeId: 'claimed_the_money',
              label: 'Tell him the money is already found',
              predicate: { flagsSet: ['used:straight_face'] },
              setsFlags: ['claimed_the_money'],
              closesFlags: [],
            },
            {
              routeId: 'struck_him',
              label: 'Hit him, in front of the coffin',
              predicate: { flagsSet: ['used:throw_hands'] },
              setsFlags: ['broke_the_code', 'struck_kagami'],
              closesFlags: ['accepted_the_debt'],
            },
            {
              routeId: 'walked_out',
              label: 'Walk out of your grandfather’s funeral without a word',
              predicate: { flagsSet: ['used:slip_out'] },
              setsFlags: ['walked_out_of_the_funeral'],
              closesFlags: ['family_saw_a_boss'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['funeral_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_families', amount: 5 }],
          },
        },
        {
          id: 'find_the_money',
          playerCopy: 'Find ten million before midnight, or a reason you do not owe it.',
          directorNotes:
            'Five hours, and every answer costs somebody something. The passbook is the members’ severance: spending it saves the pier and leaves nine people with nothing to fall back on, and taking it without asking Saeko is a betrayal she will not forget. Sealing the co-op transfer saves the pier for the fishermen and leaves the family owing ten million with nothing behind it. Stealing the note is theft from a boss’s own office and breaks the code. Kagami will play one game for the debt on the old man’s board if he respects the player enough. If nothing is done, midnight comes and Kagami takes the pier by the code: that is a route, not a punishment.',
          enterWhen: { flagsSet: ['funeral_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_from_the_fund',
              label: 'Pay it from the money the old man set aside for the members, with Saeko’s blessing',
              predicate: {
                hasItems: ['blue_passbook'],
                minRelationship: [{ characterId: 'saeko', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['debt_paid', 'spent_the_fund'],
              closesFlags: ['pier_lost'],
            },
            {
              routeId: 'took_the_fund',
              label: 'Take the passbook without asking her',
              predicate: { hasItems: ['blue_passbook'] },
              setsFlags: ['debt_paid', 'spent_the_fund', 'went_behind_saeko'],
              closesFlags: ['pier_lost'],
            },
            {
              routeId: 'the_ward_paid',
              label: 'Call in the old man’s favours, one name at a time',
              predicate: { flagsSet: ['used:call_in_a_favour'] },
              setsFlags: ['debt_paid', 'ward_paid_it'],
              closesFlags: ['pier_lost'],
            },
            {
              routeId: 'sealed_the_transfer',
              label: 'Seal the pier over to the fishermen before midnight',
              predicate: { hasItems: ['coop_transfer'], flagsSet: ['used:stamp_the_seal'] },
              setsFlags: ['pier_to_the_coop', 'still_owes_kagami'],
              closesFlags: ['debt_paid'],
            },
            {
              routeId: 'played_for_it',
              label: 'Play Kagami for the debt on the old man’s board',
              predicate: {
                atLocation: 'lantern_bar',
                flagsSet: ['used:straight_face'],
                minRelationship: [{ characterId: 'kagami', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['debt_cancelled', 'won_the_last_game'],
              closesFlags: ['pier_lost'],
            },
            {
              routeId: 'stole_the_note',
              label: 'Take the note out of Kagami’s safe',
              predicate: { hasItems: ['debt_note'] },
              setsFlags: ['note_stolen', 'broke_the_code'],
              closesFlags: [],
            },
            {
              routeId: 'held_the_pier',
              label: 'Stand on Pier 9 when his men come with the locks',
              predicate: { atLocation: 'pier_nine', flagsSet: ['used:throw_hands'] },
              setsFlags: ['fought_for_the_pier', 'broke_the_code'],
              closesFlags: [],
            },
            {
              routeId: 'let_midnight_come',
              label: 'Let midnight come',
              predicate: { flagsSet: ['midnight_called'], flagsUnset: ['pier_to_the_coop'] },
              setsFlags: ['pier_lost'],
              closesFlags: ['debt_paid'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['midnight_answered'],
            abilities: [],
            reputation: [
              { factionId: 'faction_hayami', amount: 10 },
              { factionId: 'faction_ward', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_heir',
      title: 'The Heir Nobody Picked',
      summary:
        'Nine people are left in your grandfather’s family. On the seventh evening each of them drinks from his cup to you, or hands back the silver heron pin and walks.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ryo', 'saeko', 'hachi'],
      involvedLocationIds: ['noodle_shop', 'family_office', 'funeral_hall'],
      knownRewardCopy: 'A family that follows you, or the honest knowledge that it will not.',
      steps: [
        {
          id: 'meet_the_family',
          playerCopy: 'Find out who is actually left, and what each of them wants from you.',
          directorNotes:
            'Three lieutenants and six members, all of them grieving and all of them sizing the player up. Hachi wants to feed them, Saeko wants them to read the books, and Ryo wants to know whether they will run. None of them will say what they actually want on the first night unless asked well.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ate_with_them',
              label: 'Eat Hachi’s noodles with the family',
              predicate: { atLocation: 'noodle_shop', flagsSet: ['spoke:hachi'] },
              setsFlags: ['ate_with_the_family'],
              closesFlags: ['kept_apart'],
            },
            {
              routeId: 'opened_the_books',
              label: 'Go through the books with Saeko',
              predicate: { flagsSet: ['spoke:saeko', 'used:read_the_paper'] },
              setsFlags: ['knows:how_broke'],
              closesFlags: [],
            },
            {
              routeId: 'asked_ryo_straight',
              label: 'Ask Ryo what he wanted',
              predicate: { flagsSet: ['spoke:ryo', 'used:speak_as_boss'] },
              setsFlags: ['ryo_heard_you'],
              closesFlags: [],
            },
            {
              routeId: 'kept_your_distance',
              label: 'Watch them without telling them anything',
              predicate: { flagsSet: ['used:slip_out'] },
              setsFlags: ['kept_apart'],
              closesFlags: ['ate_with_the_family'],
            },
            {
              routeId: 'never_sat_down',
              label: 'Let the week go by without sitting down with them',
              predicate: { flagsSet: ['seventh_day'] },
              setsFlags: ['kept_apart'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: ['knows:the_family'],
            abilities: ['call_in_a_favour'],
            reputation: [
              { factionId: 'faction_hayami', amount: 10 },
              { factionId: 'faction_ward', amount: 5 },
            ],
          },
        },
        {
          id: 'what_ryo_agreed',
          playerCopy: 'Find out what Ryo has been offered, and whether he took it.',
          directorNotes:
            'Ryo has an offer from Kagami and has answered nobody. He is not a traitor and must not be written as one: he is a loyal man working out who to be loyal to. If the player loses the pier, he takes the offer for the other six and tells the player so to their face.',
          enterWhen: { flagsSet: ['knows:the_family'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ryo_told_you',
              label: 'He tells you himself',
              predicate: {
                flagsSet: ['spoke:ryo'],
                minRelationship: [{ characterId: 'ryo', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['ryo_came_clean', 'ryo_stays'],
              closesFlags: ['ryo_went_over'],
            },
            {
              routeId: 'outbid_kagami',
              label: 'Make Ryo a better offer than Kagami’s',
              predicate: {
                flagsSet: ['used:make_an_offer'],
                minRelationship: [{ characterId: 'ryo', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['ryo_stays', 'ryo_owes_you'],
              closesFlags: ['ryo_went_over'],
            },
            {
              routeId: 'followed_ryo',
              label: 'Follow him across the bridge',
              predicate: { flagsSet: ['used:slip_out', 'visited:kagami_tower'] },
              setsFlags: ['caught_ryo_at_the_tower'],
              closesFlags: [],
            },
            {
              routeId: 'ryo_went_over',
              label: 'He takes Kagami’s offer',
              predicate: { flagsSet: ['pier_lost'] },
              setsFlags: ['ryo_went_over'],
              closesFlags: ['ryo_stays'],
            },
            {
              routeId: 'ryo_kept_quiet',
              label: 'He never says, and you never ask',
              predicate: { flagsSet: ['seventh_day'] },
              setsFlags: ['ryo_undecided'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['ryo_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_hayami', amount: 10 }],
          },
        },
        {
          id: 'the_cup',
          playerCopy: 'Pour the seventh-day cup, and find out who drinks.',
          directorNotes:
            'Nine cups in front of the old man’s photograph. Who drinks is the result of the week, not of a speech on the night. A player who wants the family closed can refuse to pour and pay everyone out, if the passbook is still whole. A player who wants Ryo to have it can pour for him and stamp the seal over to him.',
          enterWhen: { flagsSet: ['seventh_day'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'handed_ryo_the_seal',
              label: 'Pour the first cup for Ryo, and give him the seal',
              predicate: { flagsSet: ['ryo_stays', 'used:stamp_the_seal'] },
              setsFlags: ['ryo_is_boss'],
              closesFlags: ['family_sworn'],
            },
            {
              routeId: 'poured_no_cups',
              label: 'Close the family and pay everyone out of the passbook',
              predicate: {
                flagsSet: ['used:speak_as_boss'],
                flagsUnset: ['spent_the_fund'],
                hasItems: ['blue_passbook'],
              },
              setsFlags: ['family_dissolved'],
              closesFlags: ['family_sworn'],
            },
            {
              routeId: 'all_nine_drank',
              label: 'All nine drink',
              predicate: { minFactionReputation: [{ factionId: 'faction_hayami', value: 50 }] },
              setsFlags: ['family_sworn'],
              closesFlags: ['family_dissolved'],
            },
            {
              routeId: 'some_walked',
              label: 'Some of them hand back the pin',
              predicate: { flagsSet: ['seventh_day'] },
              setsFlags: ['family_split'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['cup_held'],
            abilities: [],
            reputation: [{ factionId: 'faction_families', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_forty_one_favours',
      title: 'Forty-One Favours',
      summary:
        'Somebody on this waterfront owes the family for every one of the last fifty years. The old man wrote down who, in a notebook nobody was allowed to read.',
      kind: 'SIDE',
      involvedCharacterIds: ['saeko', 'hachi'],
      involvedLocationIds: ['hayami_house', 'family_office'],
      knownRewardCopy: 'A list of people who owe the family something, and the right to ask them.',
      discoverWhen: { flagsSet: ['funeral_over'] },
      steps: [
        {
          id: 'find_the_book',
          playerCopy: 'Find out who owes this family a favour.',
          directorNotes:
            'The notebook is on the study desk in the old man’s house on the hill, under a stone. Saeko kept a typed copy of the names in the back of the ledger and will admit it only to somebody who has sat through the books with her. Calling in a favour is polite, quick and binding: the person called will pay, and will remember being asked.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_the_notebook',
              label: 'Find the black notebook in the old man’s study',
              predicate: { hasItems: ['favour_book'] },
              setsFlags: ['has_the_favour_book'],
              closesFlags: [],
            },
            {
              routeId: 'saeko_kept_a_copy',
              label: 'Get Saeko to admit she kept a copy',
              predicate: {
                flagsSet: ['knows:how_broke'],
                minRelationship: [{ characterId: 'saeko', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['has_the_favour_book', 'saeko_shared_the_list'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:the_favours'],
            abilities: [],
            reputation: [
              { factionId: 'faction_ward', amount: 5 },
              { factionId: 'faction_hayami', amount: 5 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_safe',
      title: 'The Green Safe',
      summary:
        'A squat green safe behind your grandfather’s desk in the family office. Six weeks before he died, Hachi drove him to the registry office, and he came back with something to put in it.',
      kind: 'SIDE',
      involvedCharacterIds: ['hachi', 'saeko'],
      involvedLocationIds: ['family_office', 'noodle_shop'],
      knownRewardCopy: 'Whatever the old man locked away in his last good week.',
      discoverWhen: { flagsSet: ['funeral_over'] },
      steps: [
        {
          id: 'open_the_safe',
          playerCopy: 'Get into the safe in the family office.',
          directorNotes:
            'Inside: the unsigned co-op transfer and a thick envelope addressed to the player. Hachi knows the combination, the date the noodle shop first opened, and gives it to somebody who has treated the other members decently. The last page of the favour book has the date written as four numbers and the word SHOP, for a player who reads carefully.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'hachi_gave_the_number',
              label: 'Hachi tells you the combination',
              predicate: {
                atLocation: 'family_office',
                minRelationship: [{ characterId: 'hachi', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['safe_opened', 'hachi_trusted_you'],
              closesFlags: [],
            },
            {
              routeId: 'worked_it_out',
              label: 'Work the combination out from the old man’s notebook',
              predicate: { atLocation: 'family_office', flagsSet: ['used:read_the_paper'], hasItems: ['favour_book'] },
              setsFlags: ['safe_opened'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [
              { itemId: 'coop_transfer', qty: 1 },
              { itemId: 'grandfathers_letter', qty: 1 },
            ],
            flags: ['knows:the_transfer'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_letter',
          playerCopy: 'Decide when to open the letter he left you.',
          directorNotes:
            'The envelope says to open it after the player has decided. Opening it early is allowed and the letter does not change; what changes is that the player reads it as advice instead of as an answer. Never paraphrase the letter before it is opened.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_it_after',
              label: 'Open it after the cup, as he asked',
              predicate: { hasItems: ['grandfathers_letter'], flagsSet: ['cup_held', 'used:read_the_paper'] },
              setsFlags: ['read_the_letter'],
              closesFlags: ['read_the_letter_early'],
            },
            {
              routeId: 'opened_it_early',
              label: 'Open it now',
              predicate: { hasItems: ['grandfathers_letter'], flagsSet: ['used:read_the_paper'], flagsUnset: ['cup_held'] },
              setsFlags: ['read_the_letter_early'],
              closesFlags: ['read_the_letter'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['letter_opened'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_rivals_daughter',
      title: 'The Rival’s Daughter',
      summary:
        'Kagami’s daughter stood beside him at the funeral and did not bow. She runs his security firm, and she grew up on the same waterfront you are about to lose.',
      kind: 'SIDE',
      involvedCharacterIds: ['mariko', 'kagami'],
      involvedLocationIds: ['breakwater', 'lantern_bar', 'kagami_tower'],
      knownRewardCopy: 'Whose side Mariko Kagami is on, and what it costs her to choose.',
      discoverWhen: { flagsSet: ['met:mariko'] },
      steps: [
        {
          id: 'the_breakwater',
          playerCopy: 'Find out whose side Mariko Kagami is on.',
          directorNotes:
            'She is alone at the end of the breakwater most evenings. She respects a straight answer and a fair fight and despises being flattered. A player who fights her loses quickly and earns more respect than one who flatters her.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'talked_on_the_breakwater',
              label: 'Talk to her at the end of the breakwater',
              predicate: { atLocation: 'breakwater', flagsSet: ['spoke:mariko'] },
              setsFlags: ['mariko_talked'],
              closesFlags: [],
            },
            {
              routeId: 'took_her_on',
              label: 'Take her on, knowing you will lose',
              predicate: { flagsSet: ['used:throw_hands', 'met:mariko'] },
              setsFlags: ['fought_mariko'],
              closesFlags: [],
            },
            {
              routeId: 'asked_her_terms',
              label: 'Ask what she would want for helping you',
              predicate: { flagsSet: ['spoke:mariko', 'used:make_an_offer'] },
              setsFlags: ['mariko_has_terms'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:mariko'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_she_does',
          playerCopy: 'Decide what you are asking Mariko for.',
          directorNotes:
            'She will not betray her father in public. She will show the player the photographs on her phone if she trusts them, and then she will go and tell her father to his face what she has done. A romance with her is possible and slow; it is never the price of her help.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_together',
              label: 'Stand with her, and not only as allies',
              predicate: {
                minRelationship: [
                  { characterId: 'mariko', dimension: 'trust', value: 55 },
                  { characterId: 'mariko', dimension: 'affection', value: 60 },
                ],
              },
              setsFlags: ['mariko_turned', 'mariko_close', 'knows:the_resort_deal'],
              closesFlags: ['mariko_loyal'],
            },
            {
              routeId: 'she_showed_you',
              label: 'She shows you what is on her phone',
              predicate: { minRelationship: [{ characterId: 'mariko', dimension: 'trust', value: 55 }] },
              setsFlags: ['mariko_turned', 'knows:the_resort_deal'],
              closesFlags: ['mariko_loyal'],
            },
            {
              routeId: 'she_stays_his',
              label: 'She stays her father’s daughter',
              predicate: { flagsSet: ['knows:mariko'] },
              setsFlags: ['mariko_loyal'],
              closesFlags: ['mariko_turned'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['mariko_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_kagami', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_off_the_record',
      title: 'Off the Record',
      summary:
        'A detective lit incense at the back of the funeral and has waited by the temple gate ever since. She traded secrets with your grandfather for nineteen years.',
      kind: 'SIDE',
      involvedCharacterIds: ['nori'],
      involvedLocationIds: ['temple_yard', 'harbour_station'],
      knownRewardCopy: 'A deal with the police, or the code kept and the police kept out.',
      discoverWhen: { flagsSet: ['met:nori'] },
      steps: [
        {
          id: 'hear_her_out',
          playerCopy: 'Hear the detective out, or send her away.',
          directorNotes:
            'The code says no family calls the police on another. Nori knows it better than the families do, and she is not asking anybody to inform. She is asking for one piece of paper about Kagami, and she has eight days.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'heard_her_out',
              label: 'Hear what she wants',
              predicate: { flagsSet: ['spoke:nori'] },
              setsFlags: ['knows:what_nori_wants'],
              closesFlags: [],
            },
            {
              routeId: 'sent_her_away',
              label: 'Tell her the family does not talk to the police',
              predicate: { flagsSet: ['met:nori', 'used:speak_as_boss'] },
              setsFlags: ['kept_the_code'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['nori_on_the_table'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_deal',
          playerCopy: 'Decide whether the family talks to the police.',
          directorNotes:
            'Four different answers and none of them is clean. Giving her Kagami’s contract breaks the letter of the code and might save the waterfront. Trading with her keeps a channel open the way the old man did. Keeping the code keeps the families on side and leaves Kagami free. Giving her the family’s own ledger is informing, and the families will hear of it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_her_the_contract',
              label: 'Give her Kagami’s resort contract',
              predicate: {
                hasItems: ['resort_contract'],
                minRelationship: [{ characterId: 'nori', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['kagami_exposed', 'talked_to_police'],
              closesFlags: ['kept_the_code'],
            },
            {
              routeId: 'traded_with_her',
              label: 'Trade with her the way the old man did',
              predicate: { flagsSet: ['used:make_an_offer', 'knows:the_resort_deal'] },
              setsFlags: ['nori_owes_you', 'talked_to_police'],
              closesFlags: [],
            },
            {
              routeId: 'gave_her_everyone',
              label: 'Give her the family’s own ledger',
              predicate: { hasItems: ['family_ledger'], flagsSet: ['used:read_the_paper', 'spoke:nori'] },
              setsFlags: ['informed_on_the_family', 'talked_to_police'],
              closesFlags: ['kept_the_code'],
            },
            {
              routeId: 'kept_the_code',
              label: 'Keep the code and keep her out',
              predicate: { flagsSet: ['used:speak_as_boss'] },
              setsFlags: ['kept_the_code'],
              closesFlags: ['talked_to_police'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['nori_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_police', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_what_the_pier_is_worth',
      title: 'What the Pier Is Worth',
      summary:
        'Ten million is a strange amount for a man with a glass tower to chase this hard. Somebody across the bridge is paying a great deal more for the waterfront.',
      kind: 'LEAD',
      involvedCharacterIds: ['kagami', 'mariko', 'nori'],
      involvedLocationIds: ['kagami_tower', 'pier_nine', 'lantern_bar'],
      knownRewardCopy: 'The real price of Pier 9, and what to do with knowing it.',
      discoverWhen: { flagsSet: ['knows:something_bigger'] },
      steps: [
        {
          id: 'find_the_buyer',
          playerCopy: 'Find out who wants the waterfront, and for how much.',
          directorNotes:
            'Four ways in: the contract itself in Kagami’s safe, Mariko’s photographs, Nori’s suspicions, or the surveyors’ paperwork on the pier at dawn. Each costs something different, and only the contract is proof.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stole_the_contract',
              label: 'Take the contract from Kagami’s safe',
              predicate: { hasItems: ['resort_contract'] },
              setsFlags: ['knows:the_resort_deal', 'has_proof'],
              closesFlags: [],
            },
            {
              routeId: 'mariko_told_you',
              label: 'Get it out of Mariko',
              predicate: {
                flagsSet: ['mariko_talked'],
                minRelationship: [{ characterId: 'mariko', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:the_resort_deal'],
              closesFlags: [],
            },
            {
              routeId: 'nori_told_you',
              label: 'Get it out of Detective Nori',
              predicate: {
                flagsSet: ['spoke:nori'],
                minRelationship: [{ characterId: 'nori', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:the_resort_deal'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_surveyors',
              label: 'Read the surveyors’ paperwork on the pier',
              predicate: { atLocation: 'pier_nine', flagsSet: ['used:read_the_paper'] },
              setsFlags: ['knows:the_resort_deal'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['knows:the_price'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what to do with what the pier is really worth.',
          directorNotes:
            'Telling the Lantern Table turns the other three families against Kagami overnight, because the resort would pave them too. Selling him the pier at the real price makes the family rich and the ward furious. Saying nothing is a choice, and Kagami will notice that the player knows.',
          enterWhen: { flagsSet: ['knows:the_price'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_the_families',
              label: 'Tell the Lantern Table what Kagami is selling',
              predicate: { atLocation: 'lantern_bar', flagsSet: ['used:speak_as_boss', 'knows:the_resort_deal'] },
              setsFlags: ['families_know', 'kagami_isolated'],
              closesFlags: [],
            },
            {
              routeId: 'sold_him_the_pier',
              label: 'Sell Kagami the pier at its real price',
              predicate: {
                flagsSet: ['used:make_an_offer'],
                minRelationship: [{ characterId: 'kagami', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['sold_the_pier', 'pier_lost'],
              closesFlags: ['pier_to_the_coop'],
            },
            {
              routeId: 'sat_on_it',
              label: 'Keep it to yourself',
              predicate: { flagsSet: ['knows:the_price'] },
              setsFlags: ['sat_on_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['resort_answered'],
            abilities: [],
            reputation: [
              { factionId: 'faction_ward', amount: 10 },
              { factionId: 'faction_families', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_what_it_becomes',
      title: 'What the Family Becomes',
      summary:
        'Fifty years ago your grandfather built a family out of dockhands. Whatever it becomes next is your decision, and the ward has to live with it.',
      kind: 'MAIN',
      involvedCharacterIds: ['ryo', 'saeko', 'hachi', 'kagami'],
      involvedLocationIds: ['funeral_hall', 'noodle_shop', 'harbour_market'],
      knownRewardCopy: 'An answer the whole waterfront can see.',
      discoverWhen: { flagsSet: ['midnight_answered'] },
      steps: [
        {
          id: 'decide',
          playerCopy: 'Decide what the Hayami family is now.',
          directorNotes:
            'Five shapes, none of them the correct one. A family that keeps the code. A business that pays tax and keeps the noodle shop open. A family closed kindly. A branch of the Kagami Group. A family run on fear. Let the ward react to each in specific, physical ways: dues, queues, shutters, who crosses the street.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_it_a_family',
              label: 'Keep it a family, under the code',
              predicate: { flagsSet: ['family_sworn'], flagsUnset: ['pier_lost'] },
              setsFlags: ['family_stands'],
              closesFlags: ['went_legitimate'],
            },
            {
              routeId: 'went_straight',
              label: 'Turn it into a business with its shutter up',
              predicate: {
                flagsSet: ['used:make_an_offer'],
                minFactionReputation: [{ factionId: 'faction_ward', value: 55 }],
              },
              setsFlags: ['went_legitimate'],
              closesFlags: ['family_stands'],
            },
            {
              routeId: 'closed_it',
              label: 'Close it, and mean it',
              predicate: { flagsSet: ['family_dissolved'] },
              setsFlags: ['family_closed'],
              closesFlags: ['family_stands'],
            },
            {
              routeId: 'under_kagami',
              label: 'Bow, and let it become a branch of the Kagami Group',
              predicate: { flagsSet: ['pier_lost', 'used:pay_respects'] },
              setsFlags: ['absorbed_by_kagami'],
              closesFlags: ['family_stands'],
            },
            {
              routeId: 'ruled_by_fear',
              label: 'Run it on fear',
              predicate: { flagsSet: ['broke_the_code', 'used:lean_on'] },
              setsFlags: ['ruled_by_fear'],
              closesFlags: ['went_legitimate'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['knows:what_it_is'],
            abilities: [],
            reputation: [{ factionId: 'faction_ward', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_nori_at_the_gate',
      atWorldMinute: 19 * 60 + 5,
      locationId: 'temple_yard',
      publicCopy:
        'A woman in a creased grey raincoat finishes a can of coffee by the temple gate, drops it in the correct bin, and watches who leaves the hall.',
      directorNotes:
        'Detective Nori, who lit incense at the back and slipped out before Kagami arrived. She is waiting for the new boss on purpose, and she will not come inside a funeral to do it.',
      setsFlags: ['nori_waiting'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'nori', toLocationId: 'temple_yard' }],
    },
    {
      id: 'we_the_board',
      atWorldMinute: 19 * 60 + 30,
      locationId: 'lantern_bar',
      publicCopy:
        'At the Lantern, the old woman behind the counter wipes down a go board with a game left half-played on it, and sets out two cups.',
      directorNotes:
        'Kagami goes from the vigil to the Lantern every night of this week and sits across from the old man’s empty chair. He does not touch the stones and lets nobody else touch them. This is where he can be found alone before midnight.',
      setsFlags: ['kagami_at_the_board'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'kagami', toLocationId: 'lantern_bar' }],
    },
    {
      id: 'we_the_market_asks',
      atWorldMinute: 20 * 60 + 30,
      locationId: 'noodle_shop',
      publicCopy:
        'Six stallholders from the night market crowd into the noodle shop with their aprons still on, to ask the new boss whether they still pay dues on Friday.',
      directorNotes:
        'They are not asking about money. They are asking whether the family will still be here next week, and whether Kagami’s men will be walking the market by the weekend. Whatever the player says gets repeated at every stall by nine.',
      setsFlags: ['ward_asked'],
      cancelledByFlags: [],
      requiresFlags: ['funeral_over'],
      movesCharacters: [],
    },
    {
      id: 'we_ryo_crosses_the_bridge',
      atWorldMinute: 22 * 60 + 15,
      locationId: 'kagami_tower',
      publicCopy: 'Ryo’s phone goes to voicemail. His car is gone from behind the noodle shop.',
      directorNotes:
        'He has gone to the tower to give Kagami an answer, and he has not decided what it is. If the player has talked to him honestly tonight, he goes to say no. If not, he goes to listen. A player who follows him finds him in the lobby, not upstairs.',
      setsFlags: ['ryo_went_to_the_tower'],
      cancelledByFlags: ['ryo_came_clean', 'ryo_stays'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'ryo', toLocationId: 'kagami_tower' }],
    },
    {
      id: 'we_the_calling',
      atWorldMinute: 24 * 60,
      locationId: 'lantern_bar',
      publicCopy:
        'At midnight the owner of the Lantern rings a brass bell once, and the heads of the harbour families stop talking.',
      directorNotes:
        'The debt is called by the code, in front of the families. Kagami lays the note on the counter and asks the new Hayami boss, politely, for ten million yen. If the player is not there, Ryo stands in for them and has to say that there is no money. If the pier has already been sealed to the co-op, Kagami reads the transfer, goes very quiet, and calls the debt anyway, with nothing behind it.',
      setsFlags: ['midnight_called'],
      cancelledByFlags: ['debt_paid', 'debt_cancelled', 'note_stolen'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'kagami', toLocationId: 'lantern_bar' }],
    },
    {
      id: 'we_locks_on_the_pier',
      atWorldMinute: 25 * 60,
      locationId: 'pier_nine',
      publicCopy:
        'Four men in Kagami Group jackets cut the co-op’s padlock off the Pier 9 gate and put on one of their own.',
      directorNotes:
        'Legal under the code, which is what makes it unbearable. The fishermen watch from their boats. Nobody touches anybody unless the player starts it.',
      setsFlags: ['locks_on_the_pier'],
      cancelledByFlags: ['pier_to_the_coop', 'fought_for_the_pier', 'debt_paid', 'debt_cancelled', 'note_stolen'],
      requiresFlags: ['midnight_called'],
      movesCharacters: [],
    },
    {
      id: 'we_the_surveyors',
      atWorldMinute: 24 * 60 + 7 * 60,
      locationId: 'pier_nine',
      publicCopy:
        'Two surveyors with a tripod are measuring Pier 9 at seven in the morning, and their van has a resort developer’s logo on the side.',
      directorNotes:
        'The first visible sign that the pier is worth far more to somebody than ten million. The surveyors know nothing except who pays them and will say so if asked nicely. Their paperwork is on the van’s dashboard.',
      setsFlags: ['knows:something_bigger'],
      cancelledByFlags: [],
      requiresFlags: ['funeral_over'],
      movesCharacters: [],
    },
    {
      id: 'we_the_brick',
      atWorldMinute: 2 * 1440 + 22 * 60,
      locationId: 'noodle_shop',
      publicCopy:
        'A brick comes through the noodle shop’s half-lowered shutter at ten at night. Nobody is hurt. There is a heron drawn on it in marker, upside down.',
      directorNotes:
        'Kagami’s answer to a family that kept the pier by defying him. He did not order it and is privately furious that somebody did. Hachi sweeps up the glass and will not let anybody see his hands shaking.',
      setsFlags: ['kagami_answered'],
      cancelledByFlags: ['debt_paid', 'debt_cancelled', 'pier_lost', 'kagami_isolated'],
      requiresFlags: ['funeral_over'],
      movesCharacters: [],
    },
    {
      id: 'we_noris_notice',
      atWorldMinute: 3 * 1440 + 9 * 60,
      locationId: 'harbour_station',
      publicCopy:
        'A transfer notice is pinned on the harbour station board: Detective Nori moves to a desk inland at the end of next week.',
      directorNotes:
        'After she goes, nobody at the station will look at Kagami. She will not mention it unless asked, and she will start to hurry.',
      setsFlags: ['nori_running_out'],
      cancelledByFlags: [],
      requiresFlags: ['nori_on_the_table'],
      movesCharacters: [],
    },
    {
      id: 'we_the_seventh_day',
      atWorldMinute: 7 * 1440 + 18 * 60,
      locationId: 'funeral_hall',
      publicCopy:
        'On the seventh evening, nine cups are set out in front of the old man’s photograph, beside a bottle nobody has opened in fifty years.',
      directorNotes:
        'The cup. Every member comes, including any who have already decided to leave, because leaving is done in person. Who drinks is the sum of the week. Kagami does not come. Mariko might.',
      setsFlags: ['seventh_day'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'ryo', toLocationId: 'funeral_hall' },
        { characterId: 'saeko', toLocationId: 'funeral_hall' },
        { characterId: 'hachi', toLocationId: 'funeral_hall' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_what_it_becomes',
      kind: 'FINALE',
      label: 'What the family becomes in your hands',
      seedHint: 'Nine silver heron pins on a velvet cloth beside the coffin.',
      payoffHint: 'Nine cups on the seventh evening, and who drinks.',
      weight: 1,
    },
    {
      id: 'p_why_you',
      kind: 'MYSTERY',
      label: 'Why the old man picked a grandchild he had met twice',
      seedHint: 'A lunch last spring with a polite stranger who asked strange questions and paid in cash.',
      payoffHint: 'A letter in the green safe that says why, to be opened only after you have decided.',
      weight: 0.8,
    },
    {
      id: 'p_kagami',
      kind: 'RIVAL',
      label: 'Kagami, and the game left on the board',
      seedHint: 'A white suit in a hall full of black.',
      payoffHint: 'Black to play, three weeks old, and whoever plays it for the old man may ask for anything.',
      weight: 0.9,
    },
    {
      id: 'p_ryo',
      kind: 'RELATIONSHIP',
      label: 'What Ryo says to Kagami’s offer',
      seedHint: 'The pause before he calls you boss.',
      payoffHint: 'The night shift on Pier 9 and jobs for the other six, offered two nights before the funeral.',
      weight: 0.85,
    },
    {
      id: 'p_the_price',
      kind: 'BOSS',
      label: 'What the pier is really worth',
      seedHint: 'Surveyors with a tripod on Pier 9 the morning after the funeral.',
      payoffHint: 'Four hundred million yen and two paid councillors for the whole old waterfront.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_books',
      name: 'You Kept the Books',
      role: 'Numbers, paper and patience',
      summary: 'You worked in an accounts office, so notes, ledgers and contracts tell you what the people waving them hoped you would miss.',
      playstyle: ['Reads the fine print', 'Careful', 'Calm in a crisis'],
      blurb: 'Three years of other people’s receipts taught you that every disaster is written down somewhere, usually in pencil.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { numbers: 3, bluffing: 1, manners: 1 },
      startingItems: [{ itemId: 'office_lanyard', qty: 1 }],
      startingAbilities: ['speak_as_boss', 'read_the_paper'],
      startingReputation: [],
    },
    {
      id: 'arch_door',
      name: 'You Worked the Door',
      role: 'Fists, nerve and a cold stare',
      summary: 'You ran the door at a nightclub for four years, so you know how a room turns ugly, how to stop it, and how to end it fast when you cannot.',
      playstyle: ['Physical', 'Hard to scare', 'Protective'],
      blurb: 'You have thrown out bigger men than anybody in this hall, and you never once enjoyed it.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { brawling: 3, menace: 1, instinct: 1 },
      startingItems: [{ itemId: 'door_jacket', qty: 1 }],
      startingAbilities: ['speak_as_boss', 'throw_hands'],
      startingReputation: [{ factionId: 'faction_hayami', amount: 5 }],
    },
    {
      id: 'arch_sales',
      name: 'You Sold Things',
      role: 'Talk, deals and charm',
      summary: 'You sold phone contracts on commission, so you can make anybody an offer, hear what they actually want, and close before they think twice.',
      playstyle: ['Talks fast', 'Makes deals', 'Reads people'],
      blurb: 'You once sold a family plan to a man who came in to cancel his only phone, and you still think about it.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { bargaining: 3, bluffing: 1, manners: 1 },
      startingItems: [{ itemId: 'business_cards', qty: 1 }],
      startingAbilities: ['speak_as_boss', 'make_an_offer'],
      startingReputation: [{ factionId: 'faction_families', amount: 5 }],
    },
    {
      id: 'arch_rider',
      name: 'You Delivered Food',
      role: 'Streets, speed and staying unseen',
      summary: 'You rode deliveries across the whole city for three years, so you know every back street, how to be ignored, and how to lose somebody following you.',
      playstyle: ['Knows the streets', 'Quick', 'Hard to follow'],
      blurb: 'Nobody looks twice at a delivery rider, which is how you have seen the inside of half the buildings in this city.',
      attributeBonus: { agility: 3, mind: 1 },
      skillProficiencies: { streetwise: 3, instinct: 1, manners: 1 },
      startingItems: [{ itemId: 'scooter_key', qty: 1 }],
      startingAbilities: ['speak_as_boss', 'slip_out'],
      startingReputation: [{ factionId: 'faction_ward', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the will?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Kai Morimoto' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did you do for a living until this morning?',
      helpText:
        'Your job before the will was read, which sets what you are good at. It is fixed for the whole story. It does not decide what kind of boss you become, whether you pay the debt, or whether the family survives the week. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is one thing true about you?',
      helpText: 'Something about you that a crime family is about to find out. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never been in a fight, and I have never once lost an argument.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct about the family?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite at the funeral and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'save_it', label: 'Save it. These people were his, and now they are yours' },
        { id: 'close_it', label: 'Close it down kindly before anybody gets hurt' },
        { id: 'go_straight', label: 'Turn it into a business that pays its taxes' },
        { id: 'use_it', label: 'Find out how much power this really is' },
        { id: 'get_out', label: 'Sign whatever gets you back to your old life' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the family see when you walk in?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A borrowed black suit a size too big, office shoes, and a face that has not slept.',
    },
  ],
  /**
   * Twelve, because production's storyteller reads the first twelve and no
   * more.
   *
   * Five of them are the family failing or the player failing it: the pier
   * lost by the code, the family informed on, the family run on fear, Ryo
   * taking it, and the player walking back to their old job. "Kagami's Pier"
   * is reachable by doing nothing at all until midnight, which is the honest
   * way a debt like this goes, and must not be written as a punishment.
   */
  endings: [
    {
      id: 'end_the_heron_stands',
      name: 'The Heron Stands',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['family_sworn'],
        flagsUnset: ['pier_lost', 'family_dissolved'],
      },
      condition:
        'All nine drank on the seventh evening, the pier is still the ward’s, and the family is still a family under the code. Write it as the old man’s family with the player’s habits in it: what changed, who stayed, what the market pays now and for what. It is a win that cost something, so name the cost.',
      epilogue:
        'The heron pins go back on nine lapels. The market pays its dues on Fridays and complains about them on Saturdays. Ryo stops pausing before he says boss sometime in the second month, and nobody mentions it, least of all him.',
      hint: '',
    },
    {
      id: 'end_kagamis_pier',
      name: 'Kagami’s Pier',
      rarity: 'COMMON',
      minTurn: 18,
      requires: { flagsSet: ['pier_lost'] },
      condition:
        'The debt was called and not paid, or the pier was sold, and Kagami took Pier 9 by the code, in front of the families. Perhaps the player bowed and let the family become a branch of his. Either way it is lawful under the code and nobody can call it theft. Write the padlocks, the fishermen moving their boats, and the family deciding whether it still exists without the thing it existed for.',
      epilogue:
        'The fishermen land at the municipal dock now, forty minutes further out, and the auction shed is fenced. By spring there are architects on the pier. Somewhere in a box in the family office, nine heron pins sit in a row, and nobody has decided what to do with them.',
      hint: 'Midnight comes whether anybody is ready for it or not.',
    },
    {
      id: 'end_nine_envelopes',
      name: 'Nine Envelopes',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['family_dissolved'] },
      condition:
        'The player closed the family on purpose and paid every member out of the blue passbook, by name, in envelopes. This is the end the old man quietly planned for, and it must be written as kindness, not defeat: who does what next, who cries, who refuses the envelope, and what happens to the heron pins.',
      epilogue:
        'Goro and Taka start a moving company with the family’s old van. Bun takes the cooking course Hachi has been nagging him about. Saeko closes the last ledger with a ruled double line, the way auditors do, and keeps the pencil. Hachi takes the shutter all the way up on a Tuesday, and there is a queue by noon.',
      hint: '',
    },
    {
      id: 'end_ryos_family',
      name: 'Ryo’s Family',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['ryo_is_boss'] },
      condition:
        'The player poured the first cup for Ryo and pressed the Heron Seal into his hand. The family is his now, the way everybody expected before the will. Write it as a handover between two people who earned each other’s respect in a week, and let the player walk out of the hall as somebody who could have kept it.',
      epilogue:
        'Ryo runs it the old man’s way, mostly. Twice a year a box of the market’s best fish arrives at the player’s door with no note. When the player finally visits, he calls them boss, with a pause in front of it, and both of them laugh.',
      hint: '',
    },
    {
      id: 'end_the_informant',
      name: 'The Informant',
      rarity: 'UNCOMMON',
      minTurn: 22,
      requires: { flagsSet: ['informed_on_the_family'] },
      condition:
        'The player gave the police the family’s own ledger. Under the code that is the one thing a boss can never do, and the families hear about it within a day. Write the consequences plainly: the members who will not look at the player, the arrests, the doors that close. Do not make it villainous; the player may have had reasons.',
      epilogue:
        'Two members do eight months for things the old man did twenty years ago. The Lantern stops serving anybody called Hayami. Detective Nori gets her inland desk anyway, and sends one postcard, which says only: I did not ask you for that.',
      hint: '',
    },
    {
      id: 'end_worse_than_the_old_man',
      name: 'Worse Than the Old Man',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['ruled_by_fear'] },
      condition:
        'The player broke the code and kept the family by fear: threats, bruises, a market that pays because it is frightened. It works. Write it as working, and let the cost show in small things: the stallholders who stop making eye contact, Hachi’s noodles going uneaten, Ryo’s silence getting longer.',
      epilogue:
        'Dues are paid early now. Nobody argues at the Lantern. The ward is very quiet and very polite, and on the seventh anniversary of the funeral nobody comes to the vigil except Kagami, in white, who bows to the photograph and not to the player.',
      hint: '',
    },
    {
      id: 'end_back_to_work',
      name: 'Back to Work on Monday',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked away from the family, the debt and the seal, and went back to their old life. Do not make this a tragedy and do not redeem it. It is a reasonable answer to being handed a crime family at a funeral, and the people it costs most are the ones who were left holding it.',
      epilogue:
        'The seal arrives by courier a week later, wrapped in a noodle-shop napkin, with no note. The player puts it in a drawer. On the anniversary of the funeral there is a text from a number they do not have saved: The pier is still here. Thought you should know.',
      hint: '',
    },
    {
      id: 'end_the_fishermens_pier',
      name: 'The Fishermen’s Pier',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['pier_to_the_coop', 'went_legitimate'] },
      condition:
        'The player sealed the pier over to the fishermen and turned the family into something that does not need a pier to live: a business, a delivery firm, a noodle shop with its shutter up. The ten million is still owed and is paid back the slow honest way. Write the paperwork, the first ordinary morning and the first tax bill.',
      epilogue:
        'The co-op paints PIER 9 on the gate in letters a metre high and invites the family to the first auction. The debt takes four years to clear. Kagami accepts every instalment personally, in the Lantern, and pours the tea himself.',
      hint: 'He drew it up six weeks before he died, and it needs only one stamp.',
    },
    {
      id: 'end_the_mirror_cracks',
      name: 'The Mirror Cracks',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['kagami_exposed'] },
      condition:
        'The player put the resort contract in Detective Nori’s hands. Two councillors resign, the developer withdraws, and Kagami is charged. The code was bent, not broken, and the families are still arguing about which. Write Kagami’s arrest with dignity: he goes politely, and he asks for one thing on the way out.',
      epilogue:
        'Mariko takes over what is left of the Kagami Group and sells the tower. The waterfront stays as it was, more or less, and smells the same. Kagami asks from his cell, through his lawyer, that nobody touch the board at the Lantern. Nobody does.',
      hint: 'Ask what he is selling it for.',
    },
    {
      id: 'end_two_heirs',
      name: 'Two Heirs on the Breakwater',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['mariko_turned', 'mariko_close'],
        minRelationship: [{ characterId: 'mariko', dimension: 'affection', value: 60 }],
      },
      condition:
        'The player and Mariko Kagami chose each other across a forty-year feud, slowly, with both families watching. She stood up to her father in front of him, and the player stood next to her while she did it. Write it as tension and choice rather than rescue, and let it end on the breakwater, no further than a kiss.',
      epilogue:
        'The Lantern Table spends a month deciding whether this is an alliance or a scandal and settles on both. Kagami pretends not to know for a year. The two of them are still arguing about who owns the breakwater, which is the only place on the waterfront that nobody does.',
      hint: '',
    },
    {
      id: 'end_black_to_play',
      name: 'Black to Play',
      rarity: 'UNIQUE',
      minTurn: 26,
      requires: {
        flagsSet: ['won_the_last_game'],
        minRelationship: [{ characterId: 'kagami', dimension: 'respect', value: 50 }],
      },
      condition:
        'The player sat in the other chair at the Lantern and played the old man’s move, the one Kagami had been staring at for three weeks, and won the game the old man could not finish. Kagami tears up the note himself. Write a sixty-three-year-old man finally letting himself grieve, in front of the one person who could not have known what the move meant.',
      epilogue:
        'Kagami retires within the year and hands the Group to his daughter. He keeps one habit: on the first night of every month he sits at the Lantern across from the player and they play, and he pays for dinner every single time.',
      hint: 'Kagami has let nobody touch that board.',
    },
    {
      id: 'end_what_the_letter_said',
      name: 'What the Letter Said',
      rarity: 'UNIQUE',
      minTurn: 36,
      requires: { flagsSet: ['read_the_letter', 'knows:what_it_is'] },
      condition:
        'The player decided what the family is, and only then opened the old man’s letter, as he asked. It says: "I picked you because you did not need it. Ryo would have died for it, Saeko would have balanced it until it bled, Hachi would have fed it until it was fat. You were the only one who could decide whether it should exist at all. Whatever you decided, you were right. I was watching at lunch. You tipped the waitress." Write the player reading it and let the week rearrange itself around it.',
      epilogue:
        'The letter goes in the green safe, which is otherwise empty now. The combination is changed to the date of the lunch. Nobody but the player knows it, which is, the player eventually realises, exactly how the old man did everything.',
      hint: 'Open this after you have decided.',
    },
  ],
  opening:
    'Incense. Eighty mourners in black. A photo of the grandfather you met twice.\n\nThis morning his lawyer put the family seal in your hand. That makes you the boss.\n\nA silver-haired man in a white suit bows to the coffin, then to you.\n\n"Kagami," he says. "I fought your grandfather for forty years."\n\nHe holds up a note stamped with that same seal.\n\n"Ten million by midnight, young boss. Or the docks are mine."\n\nThe hall goes silent. Behind you, a scarred man in a black tie mutters, "Boss. Answer him."\n\nKagami smiles. "Well? What does the new head of the family say?"',
  openingPanel: {
    assetKey: 'story_inherited_one_failing_clan/opening',
    alt: 'Kagami in a white suit bowing at the coffin in a hall full of mourners in black, holding up a sealed note toward you.',
  },
  openingSuggestions: [
    '"Let me read that note first. I don’t pay for paper I haven’t read."',
    'I bow to the coffin, then to Kagami, exactly as low as he bowed to me.',
    'I take the note from his hand and tear it in half in front of everyone.',
  ],
  coverDirection: [
    'SUBJECT: Saeko Imai, the family accountant, in the foreground of a key visual for a crime-drama anime about a failing harbour family.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Dark hair pinned up in a hurry, square black glasses, a narrow black mourning suit, a yellow pencil behind one ear,',
    'a ledger held flat against her chest with one arm, and in her other hand, raised toward the viewer, a palm-sized black stone seal carved with a heron.',
    'Her expression is dry and unimpressed, one eyebrow up, looking straight at the viewer.',
    'Just behind her left shoulder, smaller and in softer focus: Ryo, a lean man in a black suit with a thin white scar through one eyebrow, standing perfectly still.',
    'At the far right edge, smaller still: an older silver-haired man in a white suit leaning on a black cane, bowing slightly.',
    'BEHIND THEM: a rain-wet night harbour, a fishing pier with rusted cranes and moored boats with lamps, a strip of market stalls under bare bulbs, red paper lanterns,',
    'and a glass tower glowing across the bay.',
    'LIGHT: warm lantern orange from the market on their faces, cold blue from the tower behind, rain catching both.',
    'TITLE: the words INHERITED: ONE FAILING CLAN painted into the art in the upper third, INHERITED large in brushed white lettering, ONE FAILING CLAN smaller beneath it in red,',
    'spelled exactly, legible at thumbnail size. No other text anywhere: no signs, no writing on the ledger, no lettering on the lanterns.',
  ].join(' '),
  publishedAt: null,
};

export const INHERITED_ONE_FAILING_CLAN = StoryVersion.parse(raw);
