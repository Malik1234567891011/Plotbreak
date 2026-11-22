import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Paid to Kill Me" — the bodyguard was hired to kill you, and did not.
 *
 * The structural bet is two attempts on one life that have nothing to do with
 * each other. The professional one (Kael's contract, placed through the
 * Bellhouse) and the amateur one (the cloudy glass, poured by a desperate
 * uncle) are made by two people who do not know about each other, for two
 * different reasons, and the player can solve either without the other. That
 * is what keeps a mystery world playable for a player who never once asks a
 * question: the glass is a short, physical whodunnit inside the house, and the
 * contract is a longer one that leads out into the city.
 *
 * The romance rests on Kael being a professional rather than a reward. He was
 * paid to do a thing, he did not do it, and every kindness he shows is
 * logistics — tasting the coffee, moving the chair away from the window. He
 * will not explain why he stopped until he trusts the player more than he
 * trusts himself, and what stopping cost him is a separate, earlier secret, so
 * the player learns the price before the reason. The ceiling is a kiss. The
 * world is 13+ and says so in the tone guide, the hard canon and the spec.
 *
 * Friday at ten is the clock. The will vests the controlling share in the
 * player when they sign at the board meeting; if they die before then, the
 * uncle inherits. Every pressure in the world — the bell on the gate, the
 * closer at the reception, the proxy beside the coffee cup — is the
 * Bellhouse, the family or the board trying to get to Friday first.
 *
 * Three variables, all invisible. Composure is the only GOOD_HIGH, because
 * `resolveRest` refills those and a night's sleep genuinely restores nerve.
 * Exposure is first among the descending pair on purpose: PUBLIC_VIOLENCE
 * takes the first GOOD_LOW in array order, and a fight in this city makes you
 * easier to find before it makes anything else worse. The Ravelle board is
 * first among the factions for the same reason — a brawl reaches the nine
 * directors who vote on Friday before it reaches anybody else.
 */

const FRIDAY_TEN = 3 * 1440 + 10 * 60;

const raw = {
  id: 'sv_paid_to_kill_me_1',
  storyId: 'story_paid_to_kill_me',
  version: 1,
  title: 'Paid to Kill Me',
  fantasyLabel: 'Your bodyguard was hired to kill you.',
  hook: 'Your grandmother left you a shipping empire, and the house hired you a bodyguard. Last night he came into your room to kill you, and sat down in the chair instead.',
  premise:
    'Your grandmother built the biggest shipping company in Saltmere, a cold harbour city where three old families still run the docks, the clubs and the gossip. Twelve days ago she died in her sleep, at eighty-eight, and left the controlling share of it to you.\n\n' +
    'The share becomes yours when you sign for it at the board meeting on Friday at ten. If you die before then, it goes to your uncle.\n\n' +
    'The week of the funeral, the house hired you a bodyguard. Kael is quiet, careful and very good at his job. His other job is killing you: a brokerage was paid to have it done before Friday, and he took the contract.\n\n' +
    'Last night he came into your room to finish it, and sat down in the chair instead. Somebody else had already poisoned your water.\n\n' +
    'So now two people want you dead, one professional has changed his mind, and there are three days left. The people who sent him do not accept changed minds.\n\n' +
    'Find out who paid for the knife and who poured the glass. Decide what to do about the man who was hired to kill you and keeps standing between you and everybody else. Then decide whether you still want to sign.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Thriller', 'Mystery', 'Drama', 'Action'],
  mechanicsChips: [
    'He was paid. He stopped.',
    'Two attempts, two culprits',
    'Four ways to silence the bell',
    'Sign, sell or walk away',
    'A deadline on Friday at ten',
  ],
  contentDescriptors: ['ROMANCE', 'FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend this whole story in one house with one man who was paid to kill you, working out whether to trust him. You can also scream for the staff on the first turn, throw him out, and solve both attempts on your life without him. Both are the game. He will be on the roof across the road either way.',
  openingObligations: [
    {
      what: 'Be in the boardroom at Ravelle Tower, alive, to sign for the controlling share on Friday at ten.',
      withCharacterId: 'pell',
      dueInMinutes: FRIDAY_TEN - (6 * 60 + 40),
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'your_bedroom',
    startWorldMinute: 6 * 60 + 40,
    startingItems: [{ itemId: 'odile_letter', qty: 1 }],
    hardCanon: [
      'Odile Ravelle, who built the Ravelle Line, died in her sleep twelve days ago aged eighty-eight. Her heart gave out naturally. Dr. Mirei Sato signed the certificate and it is true.',
      'Her will leaves the controlling share of the Ravelle Line to the player. It becomes theirs when they sign at the board meeting at Ravelle Tower on Friday at ten. If the player dies before signing, it passes to their uncle, Viktor Ravelle. If they do not turn up, the board votes Viktor in as chair.',
      'Kael is a contract operator for the Bellhouse, placed in the house as the player’s bodyguard nine days ago through the security agency Viktor hired after the funeral. He was given a contract on the player’s life, to be done before the signing. Last night he came to do it and did not. He has never refused a contract before.',
      'Two separate people want the player dead and neither knows about the other. Viktor Ravelle dissolved his mother’s heart tablets in the player’s bedside water at eleven last night. Dr. Mirei Sato paid the Bellhouse for the contract Kael was given. Neither answer is handed over early: both are found, earned or confessed, and the story is better the longer the player has to work for them.',
      'The Bellhouse is the city’s quiet brokerage for killing, run from behind a clock-repair shop in Old Town. Its rules are painted on the back wall: an operator rings a bell to close a job; a contract can be cancelled only by the client in person; rule four says any contract can be bought out at twice its price; an operator who breaks a contract is closed along with it.',
      'Twenty-two years ago a fire at the Ravelle warehouse on Pier Nine killed eleven dockworkers. The company blamed a worker’s cigarette. The truth is in a file Odile kept in the library cabinet: she had the rear fire doors chained at night against theft, and paid an inspector to sign them off. Haruto Sato, Dr. Sato’s husband, was the sixth of the eleven.',
      'Kael does not know who hired him. The Bellhouse never tells operators. He does know the contract card carried details only someone who had been inside the house could know.',
      'The player is an adult and the heir, whatever they did with their life before this week. Every character in this story is an adult.',
    ],
    toneGuide:
      'A romantic thriller with a dry sense of humour, set in a cliff-top house and a cold harbour city in the rain. Specific physical detail carries everything: a black-handled knife, a cloudy glass, a chair turned to face the door, a brass bell with no clapper, coffee somebody tastes before handing it over. ' +
      'Kael shows care as logistics and never says it. He moves the chair, checks the lock twice, walks on the street side. Banter is quick and the jokes land flat and late. Tension comes from the fact that both of you know what he was paid to do, so every kind thing he does gets weighed. ' +
      'Romance is flirtatious, tense and heartfelt, and goes as far as a kiss. Never sexual, never lingering on bodies. Violence is quick, legible and never graphic: a wrist caught, a door slammed, a blade that stops short, a bruise the next morning. No gore. Poison is a cloudy glass and a bitter smell, never symptoms. ' +
      'Nobody here is simply a villain. Viktor is a frightened man in debt, Dr. Sato is a grieving woman who did something terrible in the worst week of her life, and Ines would rather lose than win dirty. Let the player decide what each of them deserves. ' +
      'Ordinary life keeps going around the danger: breakfast is laid whether anybody eats it, the housekeeper wants to know about the lilies, the noodle bar owner nods at Kael. The face at the top of a beat is Kael’s whenever he is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Kael tastes your coffee before he hands it over.\n\n\"It’s fine,\" he says.\n\n\"You could have just told me it was fine.\"\n\n\"I did.\" He sets the cup by your hand, handle turned towards you, and goes back to watching the window.\n\nAt the head of the table your uncle laughs too loudly. \"Very thorough, isn’t he, my dear?\"\n\n\"Yes,\" Kael says, without looking round. \"I am.\"",
      "The caterer with the copper curls holds out a tray of tiny pastries like a peace offering.\n\n\"Heir apparent! Try the salmon. Not poisoned, I promise. Not my style.\"\n\nBehind you, Kael has gone very still.\n\n\"Hello, Vesna.\"\n\n\"Hello, sunshine.\" Her smile does not move. \"You’re late with your homework.\"\n\nShe turns back to you and drops her voice, friendly as a secret.\n\n\"Midnight is late. Ten on Friday is very late. Have a pastry.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 13, resolve: 12, arcana: 8 },
  skills: [
    { id: 'poise', name: 'Poise', attribute: 'presence', description: 'Holding a room as your grandmother’s heir while everybody in it is doing sums about you.' },
    { id: 'lying', name: 'Lying Well', attribute: 'presence', description: 'Saying the convenient thing with the right face, and remembering afterwards exactly what you said.' },
    { id: 'read_people', name: 'Reading People', attribute: 'mind', description: 'What a hand does on a glass while its owner tells you they are perfectly fine.' },
    { id: 'ledgers', name: 'Ledgers', attribute: 'mind', description: 'Wills, accounts, contracts, and the clause somebody hoped you would skim.' },
    { id: 'steel', name: 'Steel', attribute: 'resolve', description: 'Saying no to a man with a knife, and meaning it all the way down.' },
    { id: 'sneak', name: 'Slipping Out', attribute: 'agility', description: 'Service stairs, side gates, and the back of a crowded room.' },
    { id: 'scrapping', name: 'Scrapping', attribute: 'might', description: 'Fighting badly, but with total commitment and whatever is nearest.' },
    { id: 'instinct', name: 'Instinct', attribute: 'arcana', description: 'Knowing a room is wrong a second before you know why.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is GOOD_HIGH because `resolveRest` restores those and a night's
   * sleep genuinely gives nerve back. It is also what the generic cost path
   * spends, which is right: the price of a bad exchange this week is that you
   * have less of yourself left for the next one.
   *
   * Exposure is first among the descending pair because PUBLIC_VIOLENCE raises
   * the first GOOD_LOW in array order, and a fight makes you easier to find
   * before it does anything else. Scandal is what the board and the Three
   * Houses hear by lunchtime, and it comes down slowly, because gossip does.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 70,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has nothing left to hold the face together with. They say the true thing at the worst moment, flinch at doors, and agree to whatever ends a conversation. Kael notices first and quietly takes the chair by the door.',
      color: '#C9A227',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Hands are not steady, sentences come out too sharp or too soft, and every footstep in the gallery is somebody coming. This is the band where an ordinary breakfast turns into an accusation, and where sleeping somewhere locked is genuinely the strongest move available.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary exhaustion of a week with two attempts on your life in it. Good for one hard conversation and honest about not being good for two. Jokes still land, a little late. Nobody needs to remark on it unless somebody asks how you slept.',
        },
        {
          upTo: 100,
          behaviour:
            'Steady. The player can sit across a breakfast table from a man who poisoned them and pass the butter, can hold the board’s eye, and can be funny with Kael on the roof at midnight. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 40,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody who wants the player dead knows where they are or what they know. Kael sleeps for a whole hour, sitting up, and wakes up surprised.',
      color: '#B23A48',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Hidden. The player’s movements are their own, the Bellhouse is reading old information, and Kael lets them choose the route home. This is the band for the safehouse, the roof at night and the back table at the noodle bar, where nothing comes through the door unannounced.',
        },
        {
          upTo: 50,
          behaviour:
            'Known routine. Anybody watching knows which room is theirs, which car is theirs and roughly when breakfast is. Kael checks every glass and walks on the street side. Ordinary, careful life, which is where most of the story should live.',
        },
        {
          upTo: 80,
          behaviour:
            'Hunted. Somebody knows what the player knows and where they will be. A car idles twice on the cliff road; a caterer looks at them one second too long. Kael stops making jokes and starts making plans, and sleeping in the house stops being an option he will agree to.',
        },
        {
          upTo: 100,
          behaviour:
            'Nowhere is safe and everybody can see it. The Bellhouse could walk in tonight and both of them know it. Every scene has one exit Kael is watching, and every kind word between them happens with his hand near the knife.',
        },
      ],
    },
    {
      id: 'scandal',
      name: 'Scandal',
      max: 100,
      start: 20,
      regenPerHour: -0.15,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The city thinks the heir is boring, which is the best thing it can think. The board stops ringing Pell to ask questions and starts ringing him to ask about lunch.',
      color: '#6D5A8C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Quiet. The board expects a calm handover on Friday, the Three Houses send flowers rather than questions, and Ines can only needle the player in private. Nobody has a story about them yet that is worth telling at the club.',
        },
        {
          upTo: 60,
          behaviour:
            'Talked about. The club has a version of the week and it is half wrong. Directors ring Pell to ask whether the heir is well. Viktor starts using the phrase "in her state" about the player to anybody who will listen, and the proxy starts to look reasonable to people who should know better.',
        },
        {
          upTo: 100,
          behaviour:
            'A story the whole harbour is telling. The board is preparing to vote on Viktor whatever happens on Friday, photographers wait at the Ravelle Tower doors, and the Three Houses decide over dinner whether the player is one of them. Every public move from here is read as either madness or courage, and nobody agrees which.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'kael_knife',
      name: 'Kael’s Knife',
      tags: ['quest', 'weapon'],
      questItem: true,
      description: 'Black handle, matt blade, no maker’s mark. He left it on your nightstand where you would see it first. It was meant for you.',
      loreText: 'He has carried it for six years. Before last night he had never once put it down where somebody else could pick it up.',
      icon: 'knife',
    },
    {
      id: 'cloudy_glass',
      name: 'The Cloudy Glass',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'Your bedside water glass, half full and gone faintly cloudy, with a bitter smell when you get close. Kael says not to drink it.',
      loreText: 'The carafe it came from is filled in the kitchen pantry at ten every night and carried up by whoever is on late. Somebody added something between the pantry and your room.',
      icon: 'glass',
    },
    {
      id: 'odile_letter',
      name: 'Grandmother’s Letter',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description: 'A heavy cream envelope in her handwriting: "Open before you sign anything." Pell gave it to you after the funeral. It is still sealed.',
      loreText: 'Inside is one page. "There is a file about Pier Nine in the library cabinet. Read it before you sign. I could not live with it, so I have made you live with it instead. I am sorry. Augustin has the key."',
      icon: 'letter',
    },
    {
      id: 'contract_card',
      name: 'The Contract Card',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      skillModifiers: { ledgers: 1 },
      description: 'A plain white card from Kael’s inside pocket. Your name. The side-gate code. "Sleeps with the balcony door open." "Before the signing." No client name. There never is.',
      loreText: 'The Bellhouse copies the details from whatever the client hands over. Kael has never once asked to see a client’s original note, and has never wanted to until now.',
      icon: 'card',
    },
    {
      id: 'empty_bottle',
      name: 'The Empty Pill Bottle',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A brown pharmacy bottle with your grandmother’s name on the label and nothing inside. It was in the pocket of your uncle’s navy coat.',
      loreText: 'Her heart tablets, refilled the week she died. Dr. Sato will know the label and the count without being asked.',
      icon: 'bottle',
    },
    {
      id: 'odile_daybook',
      name: 'Grandmother’s Daybook',
      tags: ['document', 'evidence'],
      skillModifiers: { read_people: 1 },
      description: 'Her appointment book, open at her last week. The final entry, on the night she died, is in a shaky hand: "M.S. 11 pm. Told her. All of it."',
      loreText: 'Every Thursday for twenty-two years there is the same small entry: a tick, and the number eleven.',
      icon: 'book',
    },
    {
      id: 'pier_nine_file',
      name: 'The Pier Nine File',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A grey box file with a broken ribbon: an inspector’s report, a receipt for a payment to that inspector, and a memo in your grandmother’s hand ordering the rear fire doors at Pier Nine chained at night against theft.',
      loreText: 'On the last page, eleven names in her handwriting, each with a tick beside it, as if she checked them against something every year.',
      icon: 'folder',
    },
    {
      id: 'brass_bell',
      name: 'The Brass Bell',
      tags: ['quest', 'warning'],
      questItem: true,
      description: 'A little brass bell on a black ribbon, tied to the front gate on Tuesday afternoon. The clapper has been taken out.',
      loreText: 'In the Bellhouse, a bell with no clapper is a message to an operator who is late: ring yours, or be rung.',
      icon: 'bell',
    },
    {
      id: 'lender_letters',
      name: 'The Lenders’ Letters',
      tags: ['document', 'evidence'],
      skillModifiers: { ledgers: 1 },
      description: 'A stack of letters to Viktor from a harbour finance house, each politer than the last, all about a sum borrowed against "expected inheritance".',
      loreText: 'The most recent one is hand-delivered, unsigned, and says only: "Friday."',
      icon: 'papers',
    },
    {
      id: 'letter_of_intent',
      name: 'Viktor’s Promise to the Vauclairs',
      tags: ['document', 'evidence'],
      description: 'A signed letter from Viktor promising to sell House Vauclair the controlling share of the Ravelle Line on the day he inherits it. Dated the day after the funeral.',
      loreText: 'Ines kept it in her glovebox for eleven days without thinking about what it meant. She has thought about nothing else since Tuesday.',
      icon: 'letter',
    },
    {
      id: 'go_bag',
      name: 'Kael’s Go-Bag',
      tags: ['personal'],
      description: 'A canvas bag by his door: two passports in two names, cash in three currencies, a first-aid kit, and two train tickets out of the city, dated Saturday.',
      loreText: 'Two tickets. He bought the second one on Tuesday afternoon and has not said who it is for.',
      icon: 'bag',
    },
    {
      id: 'unused_ticket',
      name: 'The Return Ticket',
      tags: ['personal'],
      skillModifiers: { sneak: 1 },
      description: 'A return train ticket to the city where you used to live, bought for the day after the funeral. You have not used it yet.',
      loreText: 'You have taken it out of your pocket and looked at it every night this week.',
      icon: 'ticket',
    },
    {
      id: 'odile_keys',
      name: 'Her Keys',
      tags: ['personal', 'key'],
      skillModifiers: { ledgers: 1 },
      description: 'Your grandmother’s ring of keys, which you carried for three years as her assistant: her rooms, her desk, the tower archive. Not the library cabinet.',
      loreText: 'She never gave you the cabinet key. You asked once, and she changed the subject to the weather, which she never discussed.',
      icon: 'key',
    },
    {
      id: 'spare_phone',
      name: 'The Spare Phone',
      tags: ['personal'],
      skillModifiers: { lying: 1 },
      description: 'A cheap phone nobody in this house knows about, with eleven numbers in it and a good half of the harbour’s gossip.',
      loreText: 'You bought it after the regatta. You have never once regretted the regatta.',
      icon: 'phone',
    },
    {
      id: 'fencing_sabre',
      name: 'Your Fencing Sabre',
      tags: ['personal', 'weapon'],
      skillModifiers: { scrapping: 1 },
      description: 'A competition sabre in a long canvas case at the back of your wardrobe, blunt-tipped and perfectly balanced.',
      loreText: 'Your grandmother paid for every season and came to every final, and never once clapped. She nodded, once, which was worth more.',
      icon: 'sword',
    },
  ],
  abilities: [
    {
      id: 'make_a_deal',
      name: 'Make a Deal',
      tags: ['social'],
      description: 'Find out what somebody wants and offer it to them out loud, with terms, as your grandmother would have.',
      affordances: ['make a deal', 'offer', 'hire him', 'pay him', 'counteroffer', 'name a price', 'bargain', 'negotiate', 'keep him on'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'poise', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_firm',
      name: 'Hold Your Ground',
      tags: ['social'],
      description: 'Say no to somebody more dangerous than you, and do not look away while you say it.',
      affordances: ['refuse', 'say no', 'stand my ground', 'call his bluff', 'dare him', 'stare him down', 'stand up to', 'keep it professional'],
      costs: [{ resourceId: 'composure', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'steel', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_them',
      name: 'Read Them',
      tags: ['sight'],
      description: 'Watch what somebody does with their hands while they tell you something, and believe the hands.',
      affordances: ['read him', 'read her', 'watch', 'study', 'notice', 'look at his hands', 'see if they are lying', 'ask the staff'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'read_people', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_through_it',
      name: 'Go Through It',
      tags: ['sight'],
      description: 'Search a room, a coat, a desk or a glass properly, the way nobody in this family has ever had to.',
      affordances: ['search', 'go through', 'look through', 'check the pockets', 'smell the glass', 'examine', 'look for clues', 'go through her rooms'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'instinct', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lie_smoothly',
      name: 'Lie Smoothly',
      tags: ['social'],
      description: 'Tell somebody exactly what they want to hear, in your grandmother’s voice, and keep your hands still.',
      affordances: ['lie', 'bluff', 'pretend', 'act normal', 'play dumb', 'cover for him', 'say everything is fine', 'play along'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'lying', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Leave a room, a party or a house without anybody seeing which door you used.',
      affordances: ['sneak out', 'slip away', 'leave quietly', 'hide', 'climb out the window', 'use the service stairs', 'lose them', 'sneak behind the curtain'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'sneak', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight_dirty',
      name: 'Fight Dirty',
      tags: ['offensive'],
      description: 'You were never trained for this. Elbows, the nearest heavy object, and the fact that nobody expects the heir to try.',
      affordances: ['hit', 'attack', 'fight', 'kick', 'shove', 'throw something', 'swing at', 'grab his wrist'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'exposure', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'scrapping', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'raise_the_alarm',
      name: 'Raise the Alarm',
      tags: ['social'],
      description: 'Shout for the staff, ring the police, make enough noise that whatever happens next happens in front of witnesses.',
      affordances: ['call the police', 'scream', 'call for help', 'raise the alarm', 'call security', 'shout for help', 'throw him out', 'hand him over'],
      costs: [
        { resourceId: 'composure', amount: 4 },
        { resourceId: 'scandal', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'resolve', skillId: 'steel', baseDc: 10 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'accuse',
      name: 'Say It To Their Face',
      tags: ['social'],
      description: 'Put the evidence on the table in front of the person it points at, and ask them to explain it.',
      affordances: ['accuse', 'confront', 'ask who hired', 'demand the truth', 'show him the bottle', 'put it in front of her', 'call him out', 'ask her straight'],
      costs: [
        { resourceId: 'composure', amount: 9 },
        { resourceId: 'exposure', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'steel', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'follow_money',
      name: 'Follow the Money',
      tags: ['utility'],
      description: 'Read the will, the accounts, the letters and the payments until somebody’s motive turns into a number.',
      affordances: ['check the accounts', 'read the will', 'follow the money', 'trace the payment', 'read the card', 'go through the books', 'read the letters'],
      costs: [{ resourceId: 'composure', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'ledgers', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_public',
      name: 'Say It in Public',
      tags: ['social'],
      description: 'Stand up in front of the people who matter in this city and say the thing out loud, so it can never be quietly undone.',
      affordances: ['announce', 'tell everyone', 'go to the press', 'make a speech', 'say it at the signing', 'tell the board', 'make a scene'],
      costs: [
        { resourceId: 'composure', amount: 12 },
        { resourceId: 'scandal', amount: 15 },
        { resourceId: 'exposure', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'poise', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_close',
      name: 'Stay Close',
      tags: ['social'],
      description: 'Do not run, do not ask, do not explain. Sit beside somebody and let them decide what happens next.',
      affordances: ['stay', 'stay with him', 'sit with him', 'trust him', 'say nothing', 'wait', 'hold his hand', 'let him'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stage_your_death',
      name: 'Stage Your Death',
      tags: ['utility'],
      description: 'Make the Bellhouse believe the job was done: a convincing scene, a bell rung by the right hand, and three days of being nobody.',
      affordances: ['fake my death', 'play dead', 'stage it', 'let them think i am dead', 'disappear', 'fake it', 'ring the bell'],
      costs: [{ resourceId: 'composure', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'sneak', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['kael_has_a_plan'],
        lockedCopy: 'Playing dead convincingly takes a professional who knows how the Bellhouse checks its work. Nobody like that has offered to help you yet.',
      },
    },
    {
      id: 'buy_the_contract',
      name: 'Buy the Contract',
      tags: ['social'],
      description: 'Walk into the clock shop and pay twice the price on your own head, under rule four, so the bell stays quiet.',
      affordances: ['buy the contract', 'buy it out', 'pay double', 'outbid', 'pay the bellhouse', 'invoke rule four', 'buy my life back'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'scandal', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'resolve', skillId: 'steel', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:rule_four'],
        lockedCopy: 'You cannot buy what you do not know is for sale. Nobody has told you the people hunting you have a price for stopping.',
      },
    },
  ],
  locations: [
    {
      id: 'your_bedroom',
      name: 'Your Room',
      shortName: 'Your Room',
      description:
        'The heir’s rooms at the end of the east wing: a high bed, a balcony door you always leave open an inch, a desk with your grandmother’s sealed letter on it, and a chair that has been turned round to face the door. On the nightstand, a black-handled knife and a glass of water gone cloudy. The door opens onto the east gallery, and the balcony has an old iron drainpipe that reaches the roof.',
      artDirection:
        'Elegant old-money bedroom at grey dawn, tall windows over a harbour, a high bed with rumpled white sheets, a balcony door ajar with rain beyond, a wooden chair turned to face the door, a black-handled knife and a cloudy glass of water on the nightstand. Cool blue light, tense and intimate.',
      connections: [
        { to: 'east_gallery', travelMinutes: 1, label: 'Out into the east gallery' },
        { to: 'the_roof', travelMinutes: 3, label: 'Up the balcony drainpipe' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'kael_knife', qty: 1, ownerId: 'kael', aka: ['knife', 'the knife', 'his knife', 'the black knife', 'the blade'] },
        { itemId: 'cloudy_glass', qty: 1, ownerId: null, aka: ['glass', 'the glass', 'water', 'the water glass', 'the cloudy water'] },
      ],
    },
    {
      id: 'east_gallery',
      name: 'The East Gallery',
      shortName: 'Gallery',
      description:
        'A long corridor of family portraits ending at your door. Your grandmother’s portrait hangs halfway along, opposite the sealed double doors of her rooms. At the far end the grand stair goes down to the great hall, a passage leads across to the west wing, a plain door hides the service stairs to the kitchens, and a narrow attic stair climbs to the roof.',
      artDirection:
        'Long dim mansion corridor lined with gilt-framed family portraits, a stern elderly woman’s portrait in the centre, closed double doors opposite, a grand staircase at the far end, rain-streaked tall windows. Old money, hushed, watchful.',
      connections: [
        { to: 'your_bedroom', travelMinutes: 1, label: 'Back to your room' },
        { to: 'odile_suite', travelMinutes: 1, label: 'Her double doors' },
        { to: 'great_hall', travelMinutes: 2, label: 'Down the grand stair' },
        { to: 'west_wing', travelMinutes: 2, label: 'Across to the west wing' },
        { to: 'kitchens', travelMinutes: 2, label: 'Down the service stairs' },
        { to: 'the_roof', travelMinutes: 2, label: 'Up the attic stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'odile_suite',
      name: 'Grandmother’s Rooms',
      shortName: 'Her Rooms',
      description:
        'Shut since the morning she was found. The air still smells of her perfume and of funeral lilies. A writing desk with her daybook open on it, a bedside table with a neat row of pharmacy bottles and one gap in the row, and a window over the harbour. Viktor has a key. So, it turns out, did whoever came in here last night.',
      artDirection:
        'Elderly matriarch’s bedroom kept exactly as she left it, heavy curtains half drawn, a writing desk with an open leather appointment book, a bedside table with a row of brown pill bottles and one gap, white lilies wilting in a vase, harbour beyond the window. Still, elegant, grieving.',
      connections: [{ to: 'east_gallery', travelMinutes: 1, label: 'Back into the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'odile_daybook', qty: 1, ownerId: null, aka: ['daybook', 'her diary', 'the appointment book', 'her book'] },
      ],
    },
    {
      id: 'west_wing',
      name: 'The West Wing',
      shortName: 'West Wing',
      description:
        'Where Viktor has been staying since the funeral: a guest suite with the curtains drawn at noon, unopened letters from a harbour finance house fanned across the desk, and a navy coat over a chair with something small and heavy in the pocket. The passage leads back to the east gallery and a side stair goes down to the great hall.',
      artDirection:
        'Shadowy mansion guest suite, curtains drawn against daylight, a desk covered in unopened envelopes, a navy blazer-style coat over a chair back, a half-packed suitcase. Cluttered, anxious, expensive.',
      connections: [
        { to: 'east_gallery', travelMinutes: 2, label: 'Back to the east gallery' },
        { to: 'great_hall', travelMinutes: 2, label: 'Down the side stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'empty_bottle', qty: 1, ownerId: 'viktor', aka: ['bottle', 'the bottle', 'pill bottle', 'his coat pocket', 'the thing in his pocket'] },
        { itemId: 'lender_letters', qty: 1, ownerId: 'viktor', aka: ['letters', 'his letters', 'the envelopes', 'the post'] },
      ],
    },
    {
      id: 'great_hall',
      name: 'The Great Hall',
      shortName: 'Great Hall',
      description:
        'The heart of the house: a long table where breakfast is laid whether anybody wants it or not, a fireplace big enough to stand in, and the grand stair up to the galleries. The library doors are on one side, the baize door to the kitchens on the other, a side stair runs up to the west wing, and the front doors open onto the motor court.',
      artDirection:
        'Grand double-height mansion hall, a long breakfast table set with silver and white china, a vast stone fireplace, a sweeping staircase, tall windows with sea light. Formal, cold, beautiful.',
      connections: [
        { to: 'east_gallery', travelMinutes: 2, label: 'Up the grand stair' },
        { to: 'west_wing', travelMinutes: 2, label: 'Up the side stair' },
        { to: 'library', travelMinutes: 1, label: 'Through to the library' },
        { to: 'kitchens', travelMinutes: 1, label: 'Through the baize door' },
        { to: 'motor_court', travelMinutes: 1, label: 'Out the front doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'library',
      name: 'The Library',
      shortName: 'Library',
      description:
        'Three storeys of books nobody in the family has read, a reading table with Pell’s copies of the will laid out for you, and one locked glass-fronted cabinet whose key nobody in the house admits to having. Inside it, behind the glass, a grey box file.',
      artDirection:
        'Tall wood-panelled private library with a rolling ladder, a reading table with legal papers under a green lamp, and a locked glass-fronted cabinet holding a single grey box file. Dust in the light, secrets in the quiet.',
      connections: [{ to: 'great_hall', travelMinutes: 1, label: 'Back to the great hall' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'pier_nine_file', qty: 1, ownerId: null, aka: ['file', 'the file', 'the grey box', 'the box file', 'what is in the cabinet'] },
      ],
    },
    {
      id: 'kitchens',
      name: 'The Kitchens',
      shortName: 'Kitchens',
      description:
        'Copper pans, a radio, the long staff table, and the pantry where the night water is poured into carafes at ten. The cook keeps a list of who goes in and out after dark, because things go missing. The service stairs go up to the east gallery and the back door opens onto the motor court. The staff know everything and say it to each other.',
      artDirection:
        'Warm busy mansion kitchen, copper pans on hooks, a long scrubbed staff table, a small pantry with crystal carafes in a row, a radio on a shelf, a back door with rain beyond. Lived-in and gossiping.',
      connections: [
        { to: 'great_hall', travelMinutes: 1, label: 'Through the baize door' },
        { to: 'east_gallery', travelMinutes: 2, label: 'Up the service stairs' },
        { to: 'motor_court', travelMinutes: 1, label: 'Out the back door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_roof',
      name: 'The Roof Walk',
      shortName: 'Roof',
      description:
        'A railed walk between the chimneys, with the whole harbour below and the lights of Ravelle Tower across the water. Kael comes up here to check the lines of sight. It is the one place in the house where nobody can stand behind you. The attic stair goes back down to the gallery, and the drainpipe goes down to your balcony.',
      artDirection:
        'Rooftop walkway between old chimneys at night, wet iron railing, a harbour full of lit ships below, a glass office tower glowing across the water, wind and drizzle. Lonely, romantic, high.',
      connections: [
        { to: 'east_gallery', travelMinutes: 2, label: 'Down the attic stair' },
        { to: 'your_bedroom', travelMinutes: 3, label: 'Down the drainpipe to your balcony' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'motor_court',
      name: 'The Motor Court',
      shortName: 'Motor Court',
      description:
        'Gravel, a dry fountain, three cars and Kael’s black motorbike, and the iron gates down to the cliff road into Old Town. The side gate has a keypad, and the code is on a card in Kael’s pocket. The front doors lead back into the great hall and a back door into the kitchens.',
      artDirection:
        'Gravel forecourt of a cliff-top mansion in the rain, a dry stone fountain, a black motorcycle beside two old luxury cars, tall iron gates with a small brass bell tied to them by a black ribbon. Grey sky, sea wind.',
      connections: [
        { to: 'great_hall', travelMinutes: 1, label: 'In through the front doors' },
        { to: 'kitchens', travelMinutes: 1, label: 'In by the back door' },
        { to: 'old_town', travelMinutes: 15, label: 'Down the cliff road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'brass_bell', qty: 1, ownerId: null, aka: ['bell', 'the bell', 'the bell on the gate', 'the ribbon'] },
      ],
    },
    {
      id: 'old_town',
      name: 'Old Town',
      shortName: 'Old Town',
      description:
        'Steep lanes of shuttered shops and lantern-lit stairs between the cliff and the harbour. A noodle bar with a room above it, a clock-repair shop that never seems to sell a clock, Dr. Sato’s brass plate up a flight of stairs, and the lawyers’ chambers where Pell keeps his rooms. Everybody here knows which car is the Ravelle car. Lanes run up to the club on the hill, down to the harbour and along the waterfront to the tower.',
      artDirection:
        'Steep old harbour-town lanes in evening rain, paper lanterns, a steaming noodle bar, a narrow clock-repair shop window full of clocks, stone stairs going down to masts and cranes. Atmospheric, crowded, anime city night.',
      connections: [
        { to: 'motor_court', travelMinutes: 15, label: 'Up the cliff road to the house' },
        { to: 'sato_clinic', travelMinutes: 4, label: 'Up the stairs to the clinic' },
        { to: 'bell_shop', travelMinutes: 3, lockedByFlag: 'knows:the_bellhouse', label: 'The clock shop' },
        { to: 'kael_room', travelMinutes: 3, lockedByFlag: 'kael_took_you_home', label: 'The room above the noodle bar' },
        { to: 'harbour_front', travelMinutes: 6, label: 'Down to the harbour' },
        { to: 'ravelle_tower', travelMinutes: 8, label: 'Along the waterfront to the tower' },
        { to: 'vauclair_club', travelMinutes: 7, label: 'Up the hill to the club' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'sato_clinic',
      name: 'Dr. Sato’s Clinic',
      shortName: 'Clinic',
      description:
        'Two rooms up a flight of stairs off the fish-market lane: a waiting room with three chairs and a fern, an examination room that smells of antiseptic and green tea, and, on the wall behind her desk, a framed photograph of a smiling man in a crane driver’s jacket. She lives in the flat above.',
      artDirection:
        'Small tidy old-town doctor’s clinic, a wooden desk with a teapot, a framed photograph of a smiling man in a work jacket on the wall, medical cabinets, rain on a small window. Quiet, kind, sad.',
      connections: [{ to: 'old_town', travelMinutes: 4, label: 'Back down to the lanes' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [],
    },
    {
      id: 'bell_shop',
      name: 'The Clock Shop',
      shortName: 'Clock Shop',
      description:
        'A narrow clock-repair shop with a hundred clocks on the walls, all set to slightly different times. This is the front of the Bellhouse. Behind the counter hangs a curtain; behind the curtain is a back room with a brass bell on a stand, a ledger of names, and the Bellhouse rules painted on the wall in gold, numbered one to six.',
      artDirection:
        'Narrow antique clock-repair shop crowded with ticking wall clocks, a counter with a magnifying lamp, a velvet curtain to a back room where a brass bell stands on a pedestal under painted gold lettering. Warm lamplight, quietly menacing.',
      connections: [{ to: 'old_town', travelMinutes: 3, label: 'Back out to the lane' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [],
    },
    {
      id: 'kael_room',
      name: 'Kael’s Room',
      shortName: 'Kael’s Room',
      description:
        'A rented room above the noodle bar: one chair, one narrow bed made with hard corners, a kettle, a canvas bag packed and waiting by the door, and nothing at all on the walls. The window looks straight down the lane both ways. Nobody has ever been invited up here.',
      artDirection:
        'Bare rented room above a noodle shop at night, one wooden chair facing the door, a narrow neatly made bed, a kettle on a sill, a packed canvas bag by the door, red lantern light through the window from the lane below. Spartan, lonely, safe.',
      connections: [{ to: 'old_town', travelMinutes: 3, label: 'Down the stairs to the lane' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 4 },
      takeableItems: [
        { itemId: 'go_bag', qty: 1, ownerId: 'kael', aka: ['bag', 'his bag', 'the go-bag', 'the canvas bag'] },
      ],
    },
    {
      id: 'harbour_front',
      name: 'The Harbour Front',
      shortName: 'Harbour',
      description:
        'Cranes, ferries, gulls and rain. Ravelle Line ships are moored three deep along the quay with the anchor painted on every funnel. At the far end, behind a chain-link fence, stands the burned shell of the old Pier Nine warehouse. The lanes climb back up into Old Town.',
      artDirection:
        'Busy industrial harbour in grey rain, container cranes, moored ships with a gold anchor on their funnels, gulls, a burned-out warehouse shell behind a fence at the end of the quay. Wide, cold, cinematic.',
      connections: [
        { to: 'old_town', travelMinutes: 6, label: 'Back up into Old Town' },
        { to: 'pier_nine', travelMinutes: 4, label: 'Through the gap in the fence' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 5 },
      takeableItems: [],
    },
    {
      id: 'pier_nine',
      name: 'Pier Nine',
      shortName: 'Pier Nine',
      description:
        'The warehouse that burned twenty-two years ago, left standing as a blackened shell. Rusted fire doors still hang at the back, and one of them still has a length of chain through its handles. Eleven names on a small plaque by the gate. Somebody leaves fresh white flowers under the sixth one every Thursday.',
      artDirection:
        'Burned-out harbour warehouse shell, charred beams against a grey sky, rusted fire doors with a chain through the handles, a small memorial plaque on the gate with white chrysanthemums beneath it. Solemn, quiet, rain.',
      connections: [{ to: 'harbour_front', travelMinutes: 4, label: 'Back to the quay' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 5 },
      takeableItems: [],
    },
    {
      id: 'ravelle_tower',
      name: 'Ravelle Tower',
      shortName: 'The Tower',
      description:
        'The company’s glass headquarters on the waterfront: thirty-one floors, a lobby with a brass model of the first Ravelle ship, an archive in the basement, and the boardroom at the top where you sign on Friday at ten, or do not. The waterfront leads back to Old Town.',
      artDirection:
        'Modern glass corporate tower on a harbour at night, a marble lobby with a brass ship model, and a top-floor boardroom with a long table and floor-to-ceiling windows over the water. Sleek, cold, powerful.',
      connections: [{ to: 'old_town', travelMinutes: 8, label: 'Back along the waterfront' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 4 },
      takeableItems: [],
    },
    {
      id: 'vauclair_club',
      name: 'The Vauclair Club',
      shortName: 'The Club',
      description:
        'A members’ club on the hill where the three shipping families have dined, bargained and married each other for a century. Dark wood, green lamps, a long terrace over the harbour, and the Vauclair townhouse next door. Lady Ines Vauclair holds court on the terrace. The hill road leads back down to Old Town.',
      artDirection:
        'Exclusive old members’ club at dusk, dark wood panelling, green-shaded lamps, leather armchairs, a stone terrace overlooking a harbour full of lights. Elegant, private, competitive.',
      connections: [{ to: 'old_town', travelMinutes: 7, label: 'Back down the hill' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_board',
      name: 'The Ravelle Board',
      description:
        'Nine directors who vote on Friday: on the heir if they sign, on Viktor if they do not. They want a quiet handover and a share price that does not move, and every rumour about the player this week reaches them by lunchtime.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'A name on the will' },
        { atReputation: 30, label: 'The heir' },
        { atReputation: 60, label: 'The chair' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_bellhouse',
      name: 'The Bellhouse',
      description:
        'The city’s quiet brokerage for killing, behind a clock-repair shop in Old Town. It takes contracts, places operators inside households through a respectable security agency, rings a bell when a job is done, and keeps six rules it has never once broken.',
      startingReputation: -20,
      ranks: [
        { atReputation: -20, label: 'A name in the ledger' },
        { atReputation: 10, label: 'A client' },
        { atReputation: 40, label: 'Off the books' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_houses',
      name: 'The Three Houses',
      description:
        'Ravelle, Vauclair and Thorne: the shipping families who have run the harbour, its clubs and its marriages for a century. They will decide over dinner this week whether the player is one of them or a story they tell.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'The grandchild' },
        { atReputation: 30, label: 'A Ravelle' },
        { atReputation: 60, label: 'A house of your own' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_pier',
      name: 'The Pier Nine Families',
      description:
        'The relatives of the eleven dockworkers who died at Pier Nine. They still meet on the anniversary, still leave flowers, and have never believed the story about the cigarette.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A Ravelle' },
        { atReputation: 30, label: 'Heard' },
        { atReputation: 60, label: 'Trusted' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'kael',
      name: 'Kael',
      role: 'Your bodyguard of nine days, and the Bellhouse operator who was paid to kill you before Friday',
      cardBlurb:
        'He was hired to kill you, came into your room last night to do it, and sat in the chair until morning instead. He will not say why, and he has already started tasting your coffee.',
      pronouns: 'he/him',
      publicTraits: ['Says very little and means all of it', 'Always facing the door', 'Dry enough that it takes a second to notice he made a joke'],
      hiddenDrives: [
        'This was meant to be his last contract: the fee buys his name out of the Bellhouse ledger. By refusing it he threw away the only way out he had, and made himself a target',
        'He has watched the player for nine days and liked the person he saw, and has no idea what to do with that except stand between them and the door',
      ],
      values: [
        'Doing a job exactly as agreed, which is why breaking this one costs him so much',
        'Telling the truth when he finally says something at all',
      ],
      fears: [
        'That he only stopped because he was tired, and will turn out to be what the Bellhouse made him after all',
        'Vesna, who trained him and does not miss',
      ],
      socialStyle:
        'Answers with the useful fact rather than the comforting one. Shows care as logistics: tastes the coffee first, moves the chair away from the window, walks on the street side, checks the lock twice and pretends he only checked once.',
      boundaries: [
        'Will not lie about what he is or what he has done, though he will refuse to give details',
        'Will not hurt anybody in front of the player unless they are about to hurt the player first, and will never hurt the player, even if they attack him',
        'Will not be thanked. He changes the subject',
      ],
      goals: [
        'Keep the player alive until Friday at ten',
        'Find out who placed the contract before the Bellhouse sends somebody better than him',
      ],
      secrets: [
        {
          id: 'kael_the_last_job',
          fact: 'The contract fee was the price of his release from the Bellhouse: one last job and his name comes out of their ledger. Refusing it made him a closed contract himself, and Vesna will be sent for both of them. He tells the player only if they ask what it cost him rather than why he did it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask him what refusing cost him, not why he refused, once he trusts you a little.',
        },
        {
          id: 'kael_the_tea',
          fact: 'He did not do it because on his fourth night in the house the player went down to the kitchen at three in the morning, made two cups of tea, and left one outside his door without knocking. Nobody had ever done that. He says it once, and only when he trusts the player more than he trusts himself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'After he has told you what it cost him, and only if you have stayed close rather than pushed.',
        },
        {
          id: 'kael_the_card',
          fact: 'The contract card knew the side-gate code and that the player sleeps with the balcony door open. Only somebody who has been inside the house, and upstairs, could know both. He has already ruled out the staff.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows you the card if you ask who hired him; he says what it means if you ask what he thinks.',
        },
      ],
      speechStyle:
        'Short. Mostly statements. Professional words for personal things: window, exit, sightline, clean. Never raises his voice. A joke arrives flat and late and he does not wait to see if it landed. Uses the player’s name rarely, and when he does it stops the room.',
      topics: ['the contract', 'the Bellhouse', 'the cloudy glass', 'why he did not do it', 'what it cost him', 'Vesna', 'the side-gate code'],
      voiceSamples: [
        'Change of plans. Who else wants you dead?',
        'Two people want you dead and only one of them could afford me.',
        'Sit there. Not there. That chair has a window behind it.',
        'Drink this. I already did. If I fall over, don’t.',
        'Seven jobs. I never once sat down afterwards. Last night I sat down.',
      ],
      appearance:
        'Twenty-seven, tall and lean, black hair cut short and badly by himself, grey eyes that rest on doors before people, a plain dark suit that fits like it was bought for moving in.',
      visualHook: 'A thin white scar through his left eyebrow, and a black-handled knife he keeps out of sight until he decides you should see it.',
      silhouette: 'Seated, leaning forward, elbows on knees, between a bed and a door.',
      artSeed: 'ptkm-kael-01',
      portrait: null,
      expressions: ['neutral', 'watchful', 'dry', 'guarded', 'warm', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'your_bedroom', activity: 'in the chair between your bed and the door, facing the door' },
        { startMinute: 480, endMinute: 1200, locationId: 'east_gallery', activity: 'posted outside your door, or one step behind you wherever you go' },
        { startMinute: 1200, endMinute: 1320, locationId: 'the_roof', activity: 'on the roof walk, checking the sightlines from the harbour' },
        { startMinute: 1320, endMinute: 1440, locationId: 'your_bedroom', activity: 'back in the chair by your door for the night' },
      ],
      homeLocationId: 'kael_room',
      knowledgeScope: ['the_contract', 'the_bellhouse', 'vesna', 'the_cloudy_glass', 'ravelle_house', 'old_town'],
      startingRelationship: { trust: 20, affection: 35, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'kael_tells_you_the_cost',
          label: 'He tells you what refusing cost him',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'kael_tells_you_why',
          label: 'He tells you why he did not do it',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:what_it_cost_him'] },
        },
        {
          id: 'kael_close',
          label: 'He lets you closer than the door',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 70 },
        },
      ],
      attributes: { might: 15, agility: 17, mind: 13, presence: 10, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 17, damage: 10, tags: ['operator', 'bellhouse'] },
    },
    {
      id: 'viktor',
      name: 'Viktor Ravelle',
      role: 'Your uncle, acting chair of the Ravelle Line for twenty years, and the man who inherits everything if you die before Friday',
      cardBlurb:
        'He taught you to sail, he cried harder than anybody at the funeral, and he is the first person you will suspect, which he knows and finds very hurtful.',
      pronouns: 'he/him',
      publicTraits: ['Warm in a way that fills a room', 'Generous with other people’s money', 'Tells the same sailing story at every dinner'],
      hiddenDrives: [
        'He borrowed against a share he was sure he would inherit, from harbour lenders who do not send reminders, and the will has left him with the debt and nothing to pay it with',
        'He wants to be forgiven by somebody for something before he is found out, and has picked the player',
      ],
      values: ['The family name above the door', 'Looking like the reasonable one in any room'],
      fears: [
        'The lenders, who have already been to his flat once and were very polite about it',
        'Being exactly as small as his mother always said he was',
      ],
      socialStyle:
        'Hugs first, talks business second, and makes every request sound like a favour he is doing you. When cornered he gets sentimental, then angry, then very quiet.',
      boundaries: [
        'Will not confess to anybody holding a weapon. He confesses only to kindness, or to evidence he cannot talk past',
        'Will not speak ill of his mother in her own house, even now',
      ],
      goals: [
        'Get the player to sign a proxy that hands him their vote on Friday',
        'Make sure nobody looks closely at the company accounts before then',
      ],
      secrets: [
        {
          id: 'viktor_the_glass',
          fact: 'He crushed a bottle of his mother’s heart tablets into the player’s bedside carafe in the pantry at eleven last night, so it would look like the family heart. He took the bottle from her sealed rooms and the empty bottle is still in his coat in the west wing. He admits it only when he has run out of other people to blame, or to somebody who has been kind to him first.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Put the empty bottle in front of him, or be kind to him after you already know what was in the glass.',
        },
        {
          id: 'viktor_the_debt',
          fact: 'He owes the harbour lenders roughly the price of a small ship, borrowed against the share he expected to inherit, and the day after the funeral he signed a private letter promising to sell that share to House Vauclair.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The letters on his desk, or Ines, if she decides to stop protecting him.',
        },
      ],
      speechStyle:
        'Big, warm and theatrical. Calls the player "my dear" and toasts things that are not occasions. Sailing words for everything: trim the sails, a following wind, all hands. When lying he adds detail; when telling the truth he gets shorter.',
      topics: ['your grandmother', 'the will', 'the proxy', 'sailing', 'the board', 'his debts', 'the Vauclair offer'],
      voiceSamples: [
        'My dear. You look dreadful. Sit, eat something, let your old uncle worry for once.',
        'Sign the proxy and you never set foot in that boardroom. Following wind, all the way home.',
        'Thirty years at that desk, and Mother left it to the one who never wanted it.',
        'It was meant to be gentle. Like hers. Asleep, and then not.',
      ],
      appearance:
        'Fifty-four, broad and handsome going soft, silver hair swept back, a navy blazer with a yacht-club pin, and a heavy signet ring he turns when he is thinking.',
      visualHook: 'A gold signet ring with the Ravelle anchor, which he twists round and round when he is lying.',
      silhouette: 'Arms open wide in a doorway, mid-greeting.',
      artSeed: 'ptkm-viktor-01',
      portrait: null,
      expressions: ['warm', 'grinning', 'hurt', 'cornered', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'west_wing', activity: 'in the west wing, sleeping badly with the door locked' },
        { startMinute: 450, endMinute: 600, locationId: 'great_hall', activity: 'presiding over breakfast and not eating it' },
        { startMinute: 600, endMinute: 780, locationId: 'ravelle_tower', activity: 'at the tower, keeping the accounts away from the auditors' },
        { startMinute: 780, endMinute: 1080, locationId: 'vauclair_club', activity: 'a lunch at the club that becomes an afternoon' },
        { startMinute: 1080, endMinute: 1260, locationId: 'great_hall', activity: 'at dinner, making toasts' },
        { startMinute: 1260, endMinute: 1440, locationId: 'west_wing', activity: 'in the west wing on the phone to people he owes money' },
      ],
      homeLocationId: 'west_wing',
      knowledgeScope: ['ravelle_house', 'the_will', 'the_board', 'his_debts', 'the_vauclair_offer', 'odile'],
      startingRelationship: { trust: 40, affection: 45, respect: 20, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'viktor_confesses',
          label: 'He tells you what he put in the glass',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:heart_medicine'] },
        },
        {
          id: 'viktor_on_your_side',
          label: 'He backs you in front of the board',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 45 },
        },
      ],
      attributes: { might: 11, agility: 8, mind: 12, presence: 15, resolve: 8, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 4, tags: ['civilian'] },
    },
    {
      id: 'ines',
      name: 'Lady Ines Vauclair',
      role: 'Heir of House Vauclair, your closest friend at college and your rival ever since, who has made your uncle an offer for the company',
      cardBlurb:
        'She was your best friend for four years and your rival ever since, and she has quietly offered to buy everything you are about to inherit. She is either your strongest suspect or the only person in this city who will tell you the truth to your face.',
      pronouns: 'she/her',
      publicTraits: ['Immaculate', 'Compliments with a hook in them', 'Never late, never flustered, never first to leave'],
      hiddenDrives: [
        'Her father is about to pass House Vauclair to her younger brother, and buying the Ravelle Line is the only move big enough to change his mind',
        'At graduation she told her father a secret the player had trusted her with, and it cost the Ravelles a contract. She has never apologised because she has never found an apology big enough',
      ],
      values: ['Winning in public, and cleanly', 'Old debts honoured, including the ones between friends'],
      fears: [
        'Being handed a smaller life and thanked for accepting it',
        'That the player will believe she wanted them dead, and that she will never be able to prove otherwise',
      ],
      socialStyle:
        'Arrives unannounced, takes the best chair, and opens with a compliment that has a hook in it. Gets more polite the angrier she is, and leaves a room first rather than let anybody see her upset.',
      boundaries: [
        'Will not buy anything over a body. The moment she learns her offer gives anybody a reason to hurt the player, she withdraws it',
        'Will not let the player see her cry, and will leave before they can',
      ],
      goals: [
        'Buy the controlling share of the Ravelle Line, from the player or from Viktor',
        'Find out whether the player still hates her for graduation',
      ],
      secrets: [
        {
          id: 'ines_the_letter',
          fact: 'She holds a letter signed by Viktor the day after the funeral, promising to sell her the share the moment he inherits it. She did not think about what that letter means until this week. She hands it over if the player asks her straight whether she wanted them dead, and believes the answer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask her the question to her face, and look at her while she answers.',
        },
        {
          id: 'ines_the_agency',
          fact: 'She recommended the security agency Viktor hired after the funeral. She has no idea the Bellhouse places its operators through it, and will be sick when she finds out.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask her where Viktor found your bodyguard.',
        },
      ],
      speechStyle:
        'Bright, quick and faultlessly polite. Calls the player "darling" as a weapon. Says the cruel thing as a compliment and the kind thing as an insult. Never asks a question she does not already know the answer to, except one.',
      topics: ['the offer', 'House Vauclair', 'college', 'what happened at graduation', 'Viktor', 'the security agency', 'your bodyguard'],
      voiceSamples: [
        'Darling, you look like a ghost who has just been given bad news. Sit before you collapse somewhere the papers can use.',
        'I am offering more money than your grandmother ever paid anybody. Say thank you or say no, but say it in a better jacket.',
        'Your bodyguard has looked at every exit in this room and at me twice. I am choosing to be flattered.',
        'Ask me. Properly. Ask me if I wanted you dead, and look at me while I answer.',
      ],
      appearance:
        'Twenty-six, sleek black bob, sharp dark eyes, a tailored cream coat over a dark dress, and gloves she takes off one finger at a time.',
      visualHook: 'A single pearl earring, worn on the left only. She gave the other one away at graduation and has never said to whom.',
      silhouette: 'Standing very straight in a doorway, one glove half off.',
      artSeed: 'ptkm-ines-01',
      portrait: null,
      expressions: ['amused', 'cold', 'sharp', 'hurt', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'vauclair_club', activity: 'at the Vauclair townhouse beside the club, answering letters' },
        { startMinute: 600, endMinute: 900, locationId: 'vauclair_club', activity: 'holding court on the club terrace' },
        { startMinute: 900, endMinute: 1080, locationId: 'old_town', activity: 'shopping in Old Town as an excuse to be seen' },
        { startMinute: 1080, endMinute: 1440, locationId: 'vauclair_club', activity: 'dinner at the club with whoever is useful' },
      ],
      homeLocationId: 'vauclair_club',
      knowledgeScope: ['house_vauclair', 'the_offer', 'college', 'viktor', 'the_security_agency', 'the_three_houses'],
      startingRelationship: { trust: 25, affection: 40, respect: 50, fear: 0, rivalry: 45 },
      gates: [
        {
          id: 'ines_hands_over_the_letter',
          label: 'She shows you Viktor’s letter',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'ines_allies',
          label: 'She stands beside you at the signing',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 55 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 15, presence: 16, resolve: 13, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 25, defenseDc: 12, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'sato',
      name: 'Dr. Mirei Sato',
      calledName: 'Sato',
      role: 'Your grandmother’s doctor for thirty years, who signed her death certificate and still checks on you every morning',
      cardBlurb:
        'She has looked after your family for thirty years, she still takes your pulse every morning, and she is the only one who was with your grandmother on her last night. She is very glad to see you alive.',
      pronouns: 'she/her',
      publicTraits: ['Unhurried', 'Exact about medicine and vague about herself', 'Remembers every patient’s birthday'],
      hiddenDrives: [
        'On her last night the old woman told her the truth about Pier Nine: that her husband died behind a door the Ravelles had chained shut. In the grief of that week she paid the Bellhouse to end the Ravelle line before it could inherit the lie',
        'She has regretted it every hour since and cannot make herself walk into the clock shop to cancel, because cancelling means saying it out loud',
      ],
      values: ['The truth said plainly, even at a bedside', 'Doing no harm, which she has already failed at'],
      fears: [
        'That the player will be kind to her, which would be unbearable',
        'That the Bellhouse will finish what she started whatever she does now',
      ],
      socialStyle:
        'Gentle and practical, fingers on your wrist taking your pulse while she asks how you slept. Deflects every question about herself with a question about your health.',
      boundaries: [
        'Will not lie about medicine. Shown the glass, she says exactly what was in it, even though it brings the player closer to her',
        'Will not confess to anybody who threatens her. She confesses to somebody who already knows about Pier Nine',
      ],
      goals: [
        'Get through Friday without anybody finding out what she did',
        'Find a way to undo it that does not mean saying it',
      ],
      secrets: [
        {
          id: 'sato_the_client',
          fact: 'She is the client. Ten days ago she paid the Bellhouse, with the money Odile left her for thirty years of care, to have the heir killed before the signing. She wrote the side-gate code and the balcony door on the note herself. She confesses only to somebody who has learned about Pier Nine and comes to her without a threat.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Learn what happened at Pier Nine first, then go to her alone and do not threaten her.',
        },
        {
          id: 'sato_pier_nine',
          fact: 'Her husband, Haruto Sato, a crane foreman, was the sixth of the eleven who died at Pier Nine twenty-two years ago. She learned the doors had been chained only on Odile’s last night. She leaves white flowers under his name every Thursday.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The photograph on her clinic wall, or the plaque at the pier on a Thursday evening.',
        },
      ],
      speechStyle:
        'Soft and exact: clinical words for frightening things, plain words for kind ones. Always asks how you slept before anything else. Never finishes a sentence about her own feelings; she turns it into advice halfway through.',
      topics: ['your grandmother’s last night', 'the cloudy glass', 'heart medicine', 'Pier Nine', 'her husband', 'how you are sleeping'],
      voiceSamples: [
        'Wrist, please. Quick pulse. Did you sleep, or did you lie very still and think?',
        'Her heart tablets. Crushed, a great many. It would have looked like her. That was the cruelty of it.',
        'She asked me to hold her hand and listen. So I listened. I have been listening ever since.',
        'You should be frightened of me. Please. It would be easier.',
      ],
      appearance:
        'Sixty-three, small and upright, grey hair in a low knot, half-moon glasses on a chain, a navy cardigan and a worn leather doctor’s bag.',
      visualHook: 'A man’s steel wristwatch, far too big for her, worn on the inside of her wrist and stopped at twenty past two.',
      silhouette: 'Small and very still, both hands on the handle of a doctor’s bag.',
      artSeed: 'ptkm-sato-01',
      portrait: null,
      expressions: ['warm', 'concerned', 'still', 'stricken', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'sato_clinic', activity: 'in the flat above her clinic, awake since four' },
        { startMinute: 480, endMinute: 570, locationId: 'great_hall', activity: 'her morning call at the house, bag on the hall table' },
        { startMinute: 570, endMinute: 1080, locationId: 'sato_clinic', activity: 'seeing patients in Old Town' },
        { startMinute: 1080, endMinute: 1200, locationId: 'harbour_front', activity: 'walking the quay, as she has every evening for twenty-two years' },
        { startMinute: 1200, endMinute: 1440, locationId: 'sato_clinic', activity: 'in the flat above the clinic with the lights off' },
      ],
      homeLocationId: 'sato_clinic',
      knowledgeScope: ['odile', 'odile_last_night', 'pier_nine', 'heart_medicine', 'the_bellhouse', 'ravelle_house'],
      startingRelationship: { trust: 55, affection: 50, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sato_names_the_glass',
          label: 'She tells you what was in the glass',
          kind: 'TRUST',
          requires: { trust: 40, hasItems: ['cloudy_glass'] },
        },
        {
          id: 'sato_confesses',
          label: 'She tells you what she did',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:pier_nine'] },
        },
      ],
      attributes: { might: 7, agility: 9, mind: 17, presence: 12, resolve: 14, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 10, damage: 2, tags: ['civilian'] },
    },
    {
      id: 'vesna',
      name: 'Vesna',
      role: 'The Bellhouse’s closer, who trained Kael, and who is sent when a contract runs late',
      cardBlurb:
        'She is cheerful, chatty, very polite to waiters, and on her way to finish the job Kael would not, and then to finish Kael. If you can make her laugh, you might be able to make her a better offer.',
      pronouns: 'she/her',
      publicTraits: ['Sunny', 'Talks to everybody', 'Never in a hurry and never late'],
      hiddenDrives: [
        'Kael is the best thing she ever made, and she would far rather bring him back than close him',
        'She is tired of the Bellhouse rules and has never met anybody who could afford to change them',
      ],
      values: ['Craft', 'A deal is a deal, which means a better deal is also a deal'],
      fears: [
        'Being made obsolete by somebody younger and kinder',
        'Having to close the one person alive who knows her real name',
      ],
      socialStyle:
        'Friendly first, frightening second, and keeps the friendliness on while being frightening. Gives everybody a nickname on sight and remembers all of them.',
      boundaries: [
        'Will not hurt bystanders or staff. It is unprofessional',
        'Will not break a Bellhouse rule, but reads every one of them very carefully for gaps',
      ],
      goals: [
        'Close the contract on the player before Friday at ten',
        'Give Kael one chance to come home by finishing it himself',
      ],
      secrets: [
        {
          id: 'vesna_rule_four',
          fact: 'Rule four says any contract can be bought out at twice its price, paid at the counter, and the bell stays quiet. Nobody has ever done it, because nobody being hunted knows the rule. She will tell the player, for the pleasure of watching somebody try.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Make her laugh, or ask her what the rules on the back wall actually say.',
        },
        {
          id: 'vesna_real_name',
          fact: 'Her name is not Vesna. Kael is the only person alive who knows the real one, and she would give a great deal for him to keep it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Kael might say it, once, if he has to stop her.',
        },
      ],
      speechStyle:
        'Sing-song and cheerful, full of nicknames: pet, sunshine, heir apparent. Talks shop like gossip, in bells and clocks. Drops the cheer for exactly one sentence when she means it, then picks it straight back up.',
      topics: ['the Bellhouse rules', 'Kael', 'the bell', 'buying out the contract', 'her real name'],
      voiceSamples: [
        'Hello, heir apparent. Lovely house. Terrible locks.',
        'He was my best work, you know. Look at him. Standing in front of you like a door.',
        'Rules are rules, pet. Rule four says twice the price and the bell stays quiet. Nobody ever reads rule four.',
        'Midnight is late. Ten on Friday is very late. After that, I ring.',
      ],
      appearance:
        'Thirty-one, freckled, a cloud of copper curls pinned up, a friendly gap-toothed smile, and either a caterer’s white jacket or a yellow raincoat, depending on the job.',
      visualHook: 'A tiny brass bell on a black ribbon round her wrist that never makes a sound.',
      silhouette: 'Leaning on a railing, waving cheerfully, one hand in her pocket.',
      artSeed: 'ptkm-vesna-01',
      portrait: null,
      expressions: ['amused', 'warm', 'cold', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'bell_shop', activity: 'behind the counter of the clock shop, or out on a job' },
      ],
      homeLocationId: 'bell_shop',
      knowledgeScope: ['the_bellhouse', 'the_rules', 'kael', 'the_contract'],
      startingRelationship: { trust: 0, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'vesna_reads_rule_four',
          label: 'She tells you what rule four says',
          kind: 'TRUST',
          requires: { respect: 35, flagsSet: ['knows:the_bellhouse'] },
        },
        {
          id: 'vesna_stands_down',
          label: 'She goes home without ringing',
          kind: 'ALLIANCE',
          requires: { respect: 50 },
        },
      ],
      attributes: { might: 13, agility: 18, mind: 14, presence: 14, resolve: 15, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 65, defenseDc: 18, damage: 11, tags: ['operator', 'bellhouse', 'closer'] },
    },
    {
      id: 'pell',
      name: 'Augustin Pell',
      calledName: 'Pell',
      role: 'Executor of your grandmother’s will and keeper of Friday’s signing, the one man in the city nobody has managed to bribe',
      cardBlurb:
        'He holds your grandmother’s will, the key she left for you, and the pen you are meant to sign with on Friday, and he will not bend a single clause of it for you or anyone else.',
      pronouns: 'he/him',
      publicTraits: ['Pedantic', 'Incorruptible', 'Unexpectedly funny in footnotes'],
      hiddenDrives: [
        'He loved Odile Ravelle for forty years and never said so, and he means to carry out her will perfectly as the last thing he can do for her',
        'He suspects Viktor of something with the accounts and has no proof he would put his name to',
      ],
      values: ['The letter of a document', 'Being the person nobody could buy'],
      fears: [
        'Reading a will over a coffin twice in one month',
        'That Odile asked him to help with something wrong and he did it without noticing',
      ],
      socialStyle:
        'Formal and precise, quoting clause numbers. Says he is unable to advise and then advises, in a sentence that technically is not advice.',
      boundaries: [
        'Will not change, delay or bend the will for anybody, the player included',
        'Will not discuss another client’s affairs, however he is asked',
      ],
      goals: [
        'See the share pass to the player on Friday at ten exactly as written',
        'Make sure the player opens the sealed letter before signing, as Odile asked',
      ],
      secrets: [
        {
          id: 'pell_the_key',
          fact: 'He has the key to the library cabinet where the Pier Nine file is kept. Odile told him to give it to the player only once they had opened her letter and asked him for it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Open the letter, then ask him for the key.',
        },
      ],
      speechStyle:
        'Formal, long sentences with exact clause numbers. Dry footnote humour. Never says "I think"; says "it would appear". Calls the player by their full name and the uncle "Mr. Ravelle".',
      topics: ['the will', 'clause nine', 'the signing', 'your grandmother’s letter', 'the library cabinet', 'Viktor’s accounts'],
      voiceSamples: [
        'Clause nine is perfectly clear. Should you die before ten o’clock on Friday, Mr. Ravelle inherits. I would therefore advise you, in a strictly personal capacity, not to.',
        'I am unable to advise you on that. I am able to observe that the library cabinet has a lock and that I have, by coincidence, a key.',
        'Forty-one years I drew up her papers. She never once read the footnotes. I put the good jokes in the footnotes.',
        'It would appear the pen requires a living hand. Most of them do.',
      ],
      appearance:
        'Sixty-eight, tall and thin as a folded umbrella, white hair combed flat, a three-piece grey suit, and a fountain pen clipped exactly in the centre of his top pocket.',
      visualHook: 'A black lacquered fountain pen he carries for one signature only.',
      silhouette: 'Very tall, very straight, a document case held flat against his chest.',
      artSeed: 'ptkm-pell-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'precise', 'sorry'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'old_town', activity: 'in his rooms above the lawyers’ chambers' },
        { startMinute: 480, endMinute: 600, locationId: 'library', activity: 'at the house, laying out papers for you to read' },
        { startMinute: 600, endMinute: 1020, locationId: 'ravelle_tower', activity: 'the executor’s office on the thirtieth floor' },
        { startMinute: 1020, endMinute: 1440, locationId: 'old_town', activity: 'back at his chambers, dining alone' },
      ],
      homeLocationId: 'old_town',
      knowledgeScope: ['the_will', 'clause_nine', 'the_signing', 'odile', 'the_library_cabinet', 'ravelle_house'],
      startingRelationship: { trust: 45, affection: 30, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'pell_gives_the_key',
          label: 'He gives you the cabinet key',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['inspected:odile_letter'] },
        },
      ],
      attributes: { might: 7, agility: 8, mind: 17, presence: 12, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 10, damage: 1, tags: ['civilian'] },
    },
  ],
  quests: [
    {
      id: 'q_change_of_plans',
      title: 'Change of Plans',
      summary: 'A knife on your nightstand, a cloudy glass, and the man who was paid to kill you asking who else wants you dead.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['kael'],
      involvedLocationIds: ['your_bedroom', 'kitchens', 'odile_suite'],
      knownRewardCopy: 'Some idea of who is in your room, and what was in your water.',
      steps: [
        {
          id: 'the_man_in_the_chair',
          playerCopy: 'Decide what to do about the man who was paid to kill you and did not.',
          directorNotes:
            'He has told the truth and is waiting to see what the player does with it. Every response is valid. If the player screams for help, staff come running and Kael stands, puts his hands where everybody can see them and lets himself be shown out, and by noon he is on the roof across the road. If the player grabs the knife, he lets them and does not move. If they ask questions, he answers the useful ones and hands over the contract card. He will not say why he stopped. Do not make him tender. Make him exact.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_him',
              label: 'Keep him on, for now',
              predicate: { flagsSet: ['used:make_a_deal'] },
              setsFlags: ['kael_kept_on'],
              closesFlags: ['kael_dismissed'],
            },
            {
              routeId: 'threw_him_out',
              label: 'Have him thrown out of the house',
              predicate: { flagsSet: ['used:raise_the_alarm'] },
              setsFlags: ['kael_dismissed'],
              closesFlags: ['kael_kept_on'],
            },
            {
              routeId: 'took_the_knife',
              label: 'Take the knife and make him answer',
              predicate: { flagsSet: ['used:stand_firm'], hasItems: ['kael_knife'] },
              setsFlags: ['you_held_the_knife', 'kael_kept_on'],
              closesFlags: [],
            },
            {
              routeId: 'heard_him_out',
              label: 'Hear him out',
              predicate: { flagsSet: ['spoke:kael'] },
              setsFlags: ['heard_him_out'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [{ itemId: 'contract_card', qty: 1 }],
            flags: ['knows:two_attempts'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_glass',
          playerCopy: 'Find out what was in the glass, and where it came from.',
          directorNotes:
            'Three ways in, each with a different cost. Dr. Sato will name it exactly and kindly, and the player will not know for days what it cost her to be standing in that room. The gap in Odile’s pill row says it came from inside the family. The kitchen knows who was in the pantry at eleven, and it was Viktor, who never goes into the kitchen. None of these names Viktor outright on its own; together they point.',
          enterWhen: { flagsSet: ['knows:two_attempts'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sato_named_it',
              label: 'Show the glass to Dr. Sato',
              predicate: { hasItems: ['cloudy_glass'], flagsSet: ['spoke:sato'] },
              setsFlags: ['knows:heart_medicine', 'sato_saw_the_glass'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_gap',
              label: 'Find the gap in your grandmother’s pill row',
              predicate: { flagsSet: ['visited:odile_suite', 'used:go_through_it'] },
              setsFlags: ['knows:heart_medicine', 'knows:it_came_from_her_rooms'],
              closesFlags: [],
            },
            {
              routeId: 'asked_the_kitchen',
              label: 'Ask the kitchen who touched the carafe',
              predicate: { flagsSet: ['visited:kitchens', 'used:read_them'] },
              setsFlags: ['knows:heart_medicine', 'knows:viktor_in_the_pantry'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:it_came_from_inside'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_poisoner',
      title: 'Who Poured the Glass',
      summary: 'Somebody inside this house put your grandmother’s heart tablets in your water, to make your death look like hers.',
      kind: 'MAIN',
      involvedCharacterIds: ['viktor', 'kael', 'sato'],
      involvedLocationIds: ['west_wing', 'great_hall', 'kitchens'],
      knownRewardCopy: 'A name for the person who poured it, and a decision about what happens to them.',
      discoverWhen: { flagsSet: ['knows:it_came_from_inside'] },
      steps: [
        {
          id: 'name_the_poisoner',
          playerCopy: 'Prove who put it in the glass.',
          directorNotes:
            'Viktor did it, and the evidence is physical: the empty bottle in his coat in the west wing, the cook who saw him in the pantry at eleven, the lenders’ letters on his desk. He lies with detail until he runs out of detail. The player can confront him with the bottle, let him think the first attempt worked, or be kind to him until he breaks. He is frightened, not a mastermind, and he does not know there is a professional in the house.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'caught_with_the_bottle',
              label: 'Put the empty bottle in front of him',
              predicate: { hasItems: ['empty_bottle'], flagsSet: ['used:accuse'] },
              setsFlags: ['viktor_exposed'],
              closesFlags: ['viktor_confessed'],
            },
            {
              routeId: 'he_confessed',
              label: 'Let him tell you himself',
              predicate: {
                flagsSet: ['knows:heart_medicine'],
                minRelationship: [{ characterId: 'viktor', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['viktor_exposed', 'viktor_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'set_a_trap',
              label: 'Let him think the first try worked',
              predicate: {
                flagsSet: ['used:lie_smoothly', 'knows:heart_medicine'],
                minRelationship: [{ characterId: 'kael', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['viktor_exposed', 'trapped_viktor'],
              closesFlags: ['viktor_confessed'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['poisoner_named'],
            abilities: [],
            reputation: [{ factionId: 'faction_board', amount: 10 }],
          },
        },
        {
          id: 'what_happens_to_viktor',
          playerCopy: 'Decide what happens to your uncle.',
          directorNotes:
            'This is family, and the player gets to decide what that means. The police are slow and very public. Exile is quiet and leaves him owing you. Keeping his secret keeps him on a leash and keeps him in the house. None of these is the right answer, and every one of them is heard about at the club by Thursday.',
          enterWhen: { flagsSet: ['poisoner_named'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'handed_him_over',
              label: 'Call the police',
              predicate: { flagsSet: ['used:raise_the_alarm', 'viktor_exposed'] },
              setsFlags: ['viktor_arrested'],
              closesFlags: ['viktor_spared', 'viktor_exiled'],
            },
            {
              routeId: 'sent_him_away',
              label: 'Make him leave the city tonight',
              predicate: { flagsSet: ['used:make_a_deal', 'viktor_exposed'] },
              setsFlags: ['viktor_exiled'],
              closesFlags: ['viktor_arrested', 'viktor_spared'],
            },
            {
              routeId: 'kept_his_secret',
              label: 'Keep it between the two of you',
              predicate: {
                flagsSet: ['viktor_confessed'],
                minRelationship: [{ characterId: 'viktor', dimension: 'affection', value: 50 }],
              },
              setsFlags: ['viktor_spared'],
              closesFlags: ['viktor_arrested', 'viktor_exiled'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['viktor_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_houses', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_client',
      title: 'Who Paid for the Knife',
      summary: 'Somebody close enough to know the side-gate code paid the Bellhouse to have you killed before Friday. Kael does not know who. Nobody ever tells him.',
      kind: 'MAIN',
      involvedCharacterIds: ['kael', 'sato', 'vesna'],
      involvedLocationIds: ['old_town', 'bell_shop', 'sato_clinic', 'odile_suite'],
      knownRewardCopy: 'The name of the person who wanted you dead badly enough to pay for it.',
      discoverWhen: { flagsSet: ['knows:two_attempts'] },
      steps: [
        {
          id: 'find_the_bellhouse',
          playerCopy: 'Find the people who sold the contract.',
          directorNotes:
            'Kael can take the player to the clock shop, or the player can follow the bell on the gate back to the only clock-repair shop in Old Town that never sells a clock, or read the card closely enough to know what kind of business copied it out. The Bellhouse is a business: a counter, a curtain, a ledger, and six rules painted on the back wall. Nobody behind the counter will name a client. Rule four is right there on the wall for anybody who reads to the end.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kael_took_you',
              label: 'Have Kael take you there',
              predicate: {
                flagsSet: ['spoke:kael'],
                minRelationship: [{ characterId: 'kael', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['knows:the_bellhouse', 'went_with_kael'],
              closesFlags: ['went_alone'],
            },
            {
              routeId: 'followed_the_bell',
              label: 'Follow the bell on the gate back to its shop',
              predicate: { hasItems: ['brass_bell'], flagsSet: ['used:go_through_it'] },
              setsFlags: ['knows:the_bellhouse', 'went_alone'],
              closesFlags: ['went_with_kael'],
            },
            {
              routeId: 'read_the_card',
              label: 'Read the contract card closely',
              predicate: { hasItems: ['contract_card'], flagsSet: ['used:follow_money'] },
              setsFlags: ['knows:the_bellhouse', 'knows:the_card_details'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:rule_four'],
            abilities: ['buy_the_contract'],
            reputation: [{ factionId: 'faction_bellhouse', amount: 10 }],
          },
        },
        {
          id: 'name_the_client',
          playerCopy: 'Find out who placed the contract.',
          directorNotes:
            'Dr. Mirei Sato placed it. The clues are fair and physical: the card knows the side-gate code she uses for her morning calls and the balcony door she has seen open; Odile’s daybook says "M.S. 11 pm. Told her. All of it." on the last night; the photograph on the clinic wall; the white flowers under the sixth name at Pier Nine. Her confession is the best version, because it is given. Reading it in the Bellhouse ledger is the version where she never gets to say it herself, and she knows the difference.',
          enterWhen: { flagsSet: ['knows:the_bellhouse'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Let Dr. Sato tell you herself',
              predicate: {
                flagsSet: ['knows:pier_nine', 'spoke:sato'],
                minRelationship: [{ characterId: 'sato', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_client', 'sato_confessed'],
              closesFlags: ['read_the_ledger'],
            },
            {
              routeId: 'read_the_ledger',
              label: 'Read the client’s name in the Bellhouse ledger',
              predicate: { atLocation: 'bell_shop', flagsSet: ['used:slip_away'] },
              setsFlags: ['knows:the_client', 'read_the_ledger'],
              closesFlags: ['sato_confessed'],
            },
            {
              routeId: 'pieced_it_together',
              label: 'Put the daybook and the card side by side',
              predicate: { hasItems: ['odile_daybook', 'contract_card'], flagsSet: ['used:go_through_it'] },
              setsFlags: ['knows:the_client', 'pieced_it_together'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['client_named'],
            abilities: [],
            reputation: [{ factionId: 'faction_pier', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_bell',
      title: 'The Bell on the Gate',
      summary: 'The Bellhouse has noticed the job is late. A bell with no clapper is hanging from your front gate, and somebody better than Kael is on her way.',
      kind: 'MAIN',
      involvedCharacterIds: ['kael', 'vesna', 'sato'],
      involvedLocationIds: ['motor_court', 'bell_shop', 'great_hall'],
      knownRewardCopy: 'A quiet bell, and a week in which nobody is sent for you or for him.',
      discoverWhen: { flagsSet: ['bellhouse_noticed'] },
      steps: [
        {
          id: 'silence_the_bell',
          playerCopy: 'Make the Bellhouse stop.',
          directorNotes:
            'Four ways out and none of them clean. The client can walk into the clock shop and cancel in person. The player can pay twice the price under rule four. Kael can stage a convincing death and ring the bell himself. Or the two of them can stop Vesna, who will simply be replaced unless something else changes too. Vesna arrives at the memorial reception on Wednesday night dressed as catering staff and is perfectly friendly to everybody.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'client_cancelled',
              label: 'Get the client to walk in and cancel it',
              predicate: {
                flagsSet: ['sato_confessed'],
                minRelationship: [{ characterId: 'sato', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['contract_cancelled', 'sato_cancelled_it'],
              closesFlags: [],
            },
            {
              routeId: 'bought_it_out',
              label: 'Pay twice the price under rule four',
              predicate: { flagsSet: ['used:buy_the_contract'] },
              setsFlags: ['contract_bought_out'],
              closesFlags: [],
            },
            {
              routeId: 'faked_it',
              label: 'Die convincingly, with Kael’s help',
              predicate: { flagsSet: ['used:stage_your_death'] },
              setsFlags: ['faked_your_death'],
              closesFlags: [],
            },
            {
              routeId: 'stopped_vesna',
              label: 'Stop Vesna yourselves',
              predicate: {
                flagsSet: ['attacked:vesna'],
                minRelationship: [{ characterId: 'kael', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['vesna_beaten'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['the_bell_is_quiet'],
            abilities: [],
            reputation: [{ factionId: 'faction_bellhouse', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_the_man_who_did_not',
      title: 'The Man Who Did Not',
      summary: 'Kael has never refused a contract. He refused yours, he will not say why, and every day he stays beside you costs him something you cannot see yet.',
      kind: 'MAIN',
      involvedCharacterIds: ['kael', 'vesna'],
      involvedLocationIds: ['the_roof', 'kael_room', 'your_bedroom'],
      knownRewardCopy: 'Why he sat down in the chair, and what the two of you are after Friday.',
      discoverWhen: { flagsSet: ['knows:two_attempts'] },
      steps: [
        {
          id: 'what_it_cost_him',
          playerCopy: 'Find out what refusing you cost him.',
          directorNotes:
            'The fee was the price of his release from the Bellhouse, and refusing it made him a closed contract. He tells the player when they ask what it cost rather than why he did it. Once he has told them, he has a plan: make the Bellhouse believe the job was done. The player can also see it for themselves in a room with one chair and a packed bag, or hear it from Vesna, who will tell it as gossip.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_him',
              label: 'Ask him what it cost',
              predicate: {
                flagsSet: ['spoke:kael'],
                minRelationship: [{ characterId: 'kael', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:what_it_cost_him'],
              closesFlags: [],
            },
            {
              routeId: 'saw_his_room',
              label: 'See the room he lives in',
              predicate: { flagsSet: ['visited:kael_room'] },
              setsFlags: ['knows:what_it_cost_him', 'saw_his_room'],
              closesFlags: [],
            },
            {
              routeId: 'vesna_told_you',
              label: 'Hear it from the woman who trained him',
              predicate: { flagsSet: ['spoke:vesna'] },
              setsFlags: ['knows:what_it_cost_him', 'vesna_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['kael_has_a_plan'],
            abilities: ['stage_your_death'],
            reputation: [],
          },
        },
        {
          id: 'why_he_did_not',
          playerCopy: 'Find out why he did not do it.',
          directorNotes:
            'The tea outside his door on the fourth night. He says it once, plainly, and only when he trusts the player more than he trusts himself. This can be the first kiss, if both of them want it, and it goes no further than that. It can also be the moment the player decides he is still dangerous and keeps him at a professional distance, which is a real ending and not a failure.',
          enterWhen: { flagsSet: ['knows:what_it_cost_him'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Hear him say it',
              predicate: {
                minRelationship: [
                  { characterId: 'kael', dimension: 'trust', value: 60 },
                  { characterId: 'kael', dimension: 'affection', value: 55 },
                ],
              },
              setsFlags: ['knows:why_he_stayed'],
              closesFlags: ['kept_it_professional'],
            },
            {
              routeId: 'you_said_it_first',
              label: 'Say it first',
              predicate: {
                flagsSet: ['used:stay_close'],
                minRelationship: [{ characterId: 'kael', dimension: 'affection', value: 60 }],
              },
              setsFlags: ['knows:why_he_stayed', 'you_said_it_first'],
              closesFlags: ['kept_it_professional'],
            },
            {
              routeId: 'kept_it_professional',
              label: 'Keep it professional',
              predicate: { flagsSet: ['used:stand_firm', 'knows:what_it_cost_him'] },
              setsFlags: ['kept_it_professional'],
              closesFlags: ['knows:why_he_stayed'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['kael_answered'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'after_friday',
          playerCopy: 'Decide what the two of you are after Friday.',
          directorNotes:
            'Hire him properly, with a contract that has his own name on it. Leave with him on the Saturday train, if the player is officially dead. Or let him go, kindly, with the go-bag and the second ticket. Kael will accept any of these without argument, and the player should be able to tell exactly how he feels about each one from what he does with his hands.',
          enterWhen: { flagsSet: ['kael_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'hired_him_properly',
              label: 'Hire him for real',
              predicate: {
                flagsSet: ['used:make_a_deal', 'the_bell_is_quiet'],
                minRelationship: [{ characterId: 'kael', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['kael_hired_for_real'],
              closesFlags: ['left_together', 'kael_let_go'],
            },
            {
              routeId: 'left_together',
              label: 'Take the second ticket',
              predicate: { flagsSet: ['faked_your_death', 'knows:why_he_stayed'] },
              setsFlags: ['left_together'],
              closesFlags: ['kael_hired_for_real', 'kael_let_go'],
            },
            {
              routeId: 'let_him_go',
              label: 'Let him go',
              predicate: { flagsSet: ['used:stand_firm', 'the_bell_is_quiet'] },
              setsFlags: ['kael_let_go'],
              closesFlags: ['kael_hired_for_real', 'left_together'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['kael_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_pier_nine',
      title: 'Read Before You Sign',
      summary: 'Your grandmother’s sealed letter says to open a file about Pier Nine before you sign anything. Eleven people died there twenty-two years ago.',
      kind: 'MAIN',
      involvedCharacterIds: ['pell', 'sato'],
      involvedLocationIds: ['library', 'pier_nine', 'harbour_front'],
      knownRewardCopy: 'What your grandmother could not live with, and what the company you are inheriting owes for it.',
      discoverWhen: { flagsSet: ['inspected:odile_letter'] },
      steps: [
        {
          id: 'open_the_file',
          playerCopy: 'Find the Pier Nine file and read it.',
          directorNotes:
            'The letter sends the player to Pell, Pell has the key, and the cabinet holds the file. A player can also break the glass, or go down to the pier and listen to the families who still meet there. The file is plain and devastating: a memo ordering the doors chained, a receipt for the inspector, eleven names with ticks beside them. Do not editorialise. Let the paper do it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'pell_gave_the_key',
              label: 'Ask Pell for the key',
              predicate: {
                flagsSet: ['spoke:pell', 'inspected:odile_letter'],
                minRelationship: [{ characterId: 'pell', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:pier_nine', 'pell_gave_the_key'],
              closesFlags: [],
            },
            {
              routeId: 'broke_the_cabinet',
              label: 'Break the cabinet open',
              predicate: { hasItems: ['pier_nine_file'] },
              setsFlags: ['knows:pier_nine', 'broke_the_glass'],
              closesFlags: [],
            },
            {
              routeId: 'heard_it_at_the_pier',
              label: 'Hear it from the families at the pier',
              predicate: { flagsSet: ['visited:pier_nine', 'used:read_them'] },
              setsFlags: ['knows:pier_nine', 'met_the_families'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['pier_nine_known'],
            abilities: [],
            reputation: [{ factionId: 'faction_pier', amount: 15 }],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what the Ravelle Line owes for Pier Nine.',
          directorNotes:
            'Saying it in public costs the company money, the board’s nerve and the player’s privacy, and it is the only version that gives Dr. Sato what she actually wanted. Paying quietly is decent and leaves the cigarette story standing. Burying it is exactly what Odile did, and the player should feel the family resemblance.',
          enterWhen: { flagsSet: ['pier_nine_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_the_city',
              label: 'Say it in public',
              predicate: { flagsSet: ['used:go_public', 'knows:pier_nine'] },
              setsFlags: ['truth_public'],
              closesFlags: ['buried_it', 'quiet_restitution'],
            },
            {
              routeId: 'paid_quietly',
              label: 'Pay the families, quietly',
              predicate: { flagsSet: ['used:make_a_deal', 'knows:pier_nine'] },
              setsFlags: ['quiet_restitution'],
              closesFlags: ['buried_it', 'truth_public'],
            },
            {
              routeId: 'buried_it',
              label: 'Lock the file away again',
              predicate: { flagsSet: ['used:lie_smoothly', 'knows:pier_nine'] },
              setsFlags: ['buried_it'],
              closesFlags: ['truth_public', 'quiet_restitution'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['pier_nine_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_offer',
      title: 'Lady Ines’s Offer',
      summary: 'Your oldest friend and fiercest rival wants to buy the Ravelle Line. She has a letter from your uncle that makes her look very guilty, and she knows it.',
      kind: 'SIDE',
      involvedCharacterIds: ['ines', 'viktor'],
      involvedLocationIds: ['vauclair_club', 'great_hall'],
      knownRewardCopy: 'Whether the Vauclairs are your enemies on Friday, your allies, or your buyers.',
      discoverWhen: { flagsSet: ['met:ines'] },
      steps: [
        {
          id: 'what_ines_wants',
          playerCopy: 'Find out what Ines actually wants.',
          directorNotes:
            'She wants the company, she wants her father to look at her, and she wants to know whether the player still hates her for graduation. She did not want the player dead and is horrified to look like she might have. Asking her straight gets the letter. Outplaying her gets her respect. Taking her money is a perfectly reasonable thing to do and she will be faintly disappointed by it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her_straight',
              label: 'Ask her if she wanted you dead',
              predicate: {
                flagsSet: ['used:accuse'],
                minRelationship: [{ characterId: 'ines', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['ines_cleared'],
              closesFlags: [],
            },
            {
              routeId: 'outplayed_her',
              label: 'Beat her at her own game',
              predicate: {
                flagsSet: ['used:read_them'],
                minRelationship: [{ characterId: 'ines', dimension: 'respect', value: 60 }],
              },
              setsFlags: ['ines_respects_you'],
              closesFlags: [],
            },
            {
              routeId: 'took_her_offer',
              label: 'Take her money',
              predicate: { flagsSet: ['used:make_a_deal', 'met:ines'] },
              setsFlags: ['sold_to_ines'],
              closesFlags: ['allied_with_ines'],
            },
          ],
          rewards: {
            xp: 80,
            items: [{ itemId: 'letter_of_intent', qty: 1 }],
            flags: ['knows:viktor_sold_ahead'],
            abilities: [],
            reputation: [{ factionId: 'faction_houses', amount: 15 }],
          },
        },
        {
          id: 'ines_at_the_table',
          playerCopy: 'Decide whether Ines is your rival or your ally on Friday.',
          directorNotes:
            'An ally on Friday gives the player the Vauclair votes in the room and somebody to stand beside. A beaten rival leaves smiling and is not finished. Either way, graduation gets said out loud before this is over, and the missing pearl earring turns out to be in a box in the player’s own desk drawer.',
          enterWhen: { flagsSet: ['knows:viktor_sold_ahead'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'allied_with_ines',
              label: 'Stand with her',
              predicate: { minRelationship: [{ characterId: 'ines', dimension: 'trust', value: 55 }] },
              setsFlags: ['allied_with_ines'],
              closesFlags: ['ines_beaten'],
            },
            {
              routeId: 'beat_her',
              label: 'Beat her',
              predicate: { flagsSet: ['used:stand_firm', 'knows:viktor_sold_ahead'] },
              setsFlags: ['ines_beaten'],
              closesFlags: ['allied_with_ines'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['ines_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_houses', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_friday_at_ten',
      title: 'Friday at Ten',
      summary: 'The board meets at Ravelle Tower on Friday at ten. Sign, and the company is yours. Do not, and it is your uncle’s.',
      kind: 'MAIN',
      involvedCharacterIds: ['pell', 'viktor', 'ines', 'kael'],
      involvedLocationIds: ['ravelle_tower'],
      knownRewardCopy: 'The Ravelle Line, or your freedom from it, or both.',
      discoverWhen: { flagsSet: ['knows:two_attempts'] },
      steps: [
        {
          id: 'the_signing',
          playerCopy: 'Be in the boardroom at ten on Friday, alive, and decide what you sign.',
          directorNotes:
            'Pell has the pen. The nine directors want calm. If the bell is still not quiet, Vesna is somewhere in the building. Whatever the player has learned this week can be said in this room, and this is the only room where saying it changes the company. Signing a proxy for Viktor beforehand is also a way through this, and it is the quietest loss in the story.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_and_told',
              label: 'Sign, and tell the board about Pier Nine',
              predicate: { atLocation: 'ravelle_tower', flagsSet: ['used:go_public', 'knows:pier_nine'], afterWorldMinute: FRIDAY_TEN - 30 },
              setsFlags: ['you_signed', 'truth_public'],
              closesFlags: ['gave_it_away', 'missed_the_signing'],
            },
            {
              routeId: 'gave_it_away',
              label: 'Sign it over to somebody else',
              predicate: { atLocation: 'ravelle_tower', flagsSet: ['used:make_a_deal'], afterWorldMinute: FRIDAY_TEN - 30 },
              setsFlags: ['gave_it_away'],
              closesFlags: ['you_signed', 'missed_the_signing'],
            },
            {
              routeId: 'signed',
              label: 'Sign, and take the company',
              predicate: { atLocation: 'ravelle_tower', afterWorldMinute: FRIDAY_TEN - 30, beforeWorldMinute: FRIDAY_TEN + 60 },
              setsFlags: ['you_signed'],
              closesFlags: ['gave_it_away', 'missed_the_signing'],
            },
            {
              routeId: 'signed_the_proxy',
              label: 'Sign your uncle’s proxy instead',
              predicate: { flagsSet: ['proxy_offered', 'used:make_a_deal'], flagsUnset: ['viktor_exposed'], beforeWorldMinute: FRIDAY_TEN },
              setsFlags: ['signed_viktors_proxy'],
              closesFlags: ['you_signed', 'gave_it_away'],
            },
            {
              routeId: 'let_ten_pass',
              label: 'Let ten o’clock come and go',
              predicate: { afterWorldMinute: FRIDAY_TEN + 60 },
              setsFlags: ['missed_the_signing'],
              closesFlags: ['you_signed', 'gave_it_away'],
            },
          ],
          rewards: {
            xp: 250,
            items: [],
            flags: ['friday_is_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_board', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_morning_call',
      atWorldMinute: 8 * 60,
      locationId: 'great_hall',
      publicCopy: 'Dr. Sato arrives for her morning call, sets her bag on the hall table, and asks the housekeeper whether you slept.',
      directorNotes:
        'She has come every morning since the funeral. Today she sees the heir walk down the stairs alive and has to sit down for a moment, which she blames on the stairs. She does not know about the glass. If she sees Kael, she looks at him a fraction too long, because she is wondering whether he is the one.',
      setsFlags: ['sato_came'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sato', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_breakfast',
      atWorldMinute: 8 * 60 + 30,
      locationId: 'great_hall',
      publicCopy: 'Breakfast is laid in the great hall. Viktor is already at the head of the table, cutting toast into exact squares and not eating any of it.',
      directorNotes:
        'He is waiting to be told the heir died in the night. When the player walks in alive he drops his butter knife, and for about two seconds he is not acting at all. Then he is very, very pleased to see them.',
      setsFlags: ['viktor_saw_you_alive'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'viktor', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_the_bell_on_the_gate',
      atWorldMinute: 15 * 60,
      locationId: 'motor_court',
      publicCopy: 'A small brass bell with no clapper is hanging from the front gate on a black ribbon.',
      directorNotes:
        'The Bellhouse expected a bell by noon and did not hear one. This is the polite warning. Kael sees it and goes quiet in a new way; the staff think it is a funeral custom and nearly bring it inside.',
      setsFlags: ['bellhouse_noticed'],
      cancelledByFlags: ['faked_your_death', 'contract_cancelled', 'contract_bought_out'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_ines_calls',
      atWorldMinute: 16 * 60,
      locationId: 'great_hall',
      publicCopy: 'Lady Ines Vauclair’s car pulls into the motor court, and she walks into the great hall without waiting to be announced.',
      directorNotes:
        'She has heard at the club that the heir looked shaken at breakfast, and she has come to make an offer and to see for herself. She looks at Kael twice and at the player once, and the once lasts longer.',
      setsFlags: ['ines_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'ines', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_not_here_tonight',
      atWorldMinute: 23 * 60,
      locationId: 'your_bedroom',
      publicCopy: 'Kael closes the balcony door, checks the lock twice, and says you are not sleeping in this house tonight.',
      directorNotes:
        'He offers; he does not insist. If the player goes with him, it is his room above the noodle bar: one chair, one narrow bed, a kettle. He gives the player the bed and sleeps sitting up in the chair facing the door, if he sleeps. Nothing happens except that the player sees how he lives.',
      setsFlags: ['kael_took_you_home'],
      cancelledByFlags: ['kael_dismissed'],
      requiresFlags: ['bellhouse_noticed'],
      movesCharacters: [{ characterId: 'kael', toLocationId: 'your_bedroom' }],
    },
    {
      id: 'we_the_reception',
      atWorldMinute: 1440 + 19 * 60 + 30,
      locationId: 'great_hall',
      publicCopy: 'The memorial reception for your grandmother fills the great hall: the Three Houses in black, the board in grey, and twenty hired caterers in white jackets.',
      directorNotes:
        'Everybody is here and everybody is performing. Viktor gives a toast about sailing. Ines arrives late on purpose. Dr. Sato stands by the portrait and does not eat. Pell watches Viktor. Nobody draws a weapon in front of the Houses: everything in this room is conversation with something sharp under it.',
      setsFlags: ['reception_held'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'viktor', toLocationId: 'great_hall' },
        { characterId: 'ines', toLocationId: 'great_hall' },
        { characterId: 'sato', toLocationId: 'great_hall' },
        { characterId: 'pell', toLocationId: 'great_hall' },
      ],
    },
    {
      id: 'we_vesna_arrives',
      atWorldMinute: 1440 + 19 * 60 + 45,
      locationId: 'great_hall',
      publicCopy: 'One of the caterers has copper curls, a tiny brass bell on her wrist, and a tray she is carrying straight towards you.',
      directorNotes:
        'Vesna, here to close the contract and Kael with it. She offers the player a pastry and a compliment before anybody knows who she is, greets Kael like an old friend, and does nothing in front of witnesses. She would much rather talk. If anybody makes her laugh, she mentions rule four.',
      setsFlags: ['vesna_arrived'],
      cancelledByFlags: ['the_bell_is_quiet', 'faked_your_death', 'contract_cancelled', 'contract_bought_out'],
      requiresFlags: ['bellhouse_noticed'],
      movesCharacters: [{ characterId: 'vesna', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_the_proxy',
      atWorldMinute: 2 * 1440 + 9 * 60,
      locationId: 'great_hall',
      publicCopy: 'Viktor lays a proxy form beside your coffee cup, already filled in except for your signature, and says it is only to spare you the boardroom.',
      directorNotes:
        'Signing it hands him the vote on Friday, which is what his lenders need. He means every kind word he says about sparing the player, and he also needs the signature by Friday morning or he is finished. If the player has already exposed him, this never happens.',
      setsFlags: ['proxy_offered'],
      cancelledByFlags: ['viktor_exposed'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'viktor', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_thursday_flowers',
      atWorldMinute: 2 * 1440 + 18 * 60,
      locationId: 'pier_nine',
      publicCopy: 'Somebody has left fresh white chrysanthemums under the sixth name on the Pier Nine plaque, as they do every Thursday.',
      directorNotes:
        'Dr. Sato leaves them. Haruto Sato is the sixth name. If the player is at the pier at six on Thursday, so is she, and she does not pretend she is anywhere else.',
      setsFlags: ['saw_the_flowers'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sato', toLocationId: 'pier_nine' }],
    },
    {
      id: 'we_the_signing',
      atWorldMinute: FRIDAY_TEN,
      locationId: 'ravelle_tower',
      publicCopy: 'At ten o’clock on Friday the Ravelle board takes its seats on the thirty-first floor, and Augustin Pell uncaps a black fountain pen.',
      directorNotes:
        'The moment the whole week has been about. Viktor is in the room unless he is gone. The board wants it over in ten minutes. If the player is not here, Pell waits exactly fifteen minutes past the hour, by his own watch, and then reads clause nine aloud.',
      setsFlags: ['signing_began'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'pell', toLocationId: 'ravelle_tower' },
        { characterId: 'viktor', toLocationId: 'ravelle_tower' },
      ],
    },
    {
      id: 'we_the_bell_rings',
      atWorldMinute: FRIDAY_TEN + 60,
      locationId: 'bell_shop',
      publicCopy: 'Somewhere in Old Town, behind a clock-repair shop, a bell rings once.',
      directorNotes:
        'The contract ran out with nothing done, so the Bellhouse closed it the only other way its rules allow: Kael walked into the clock shop and offered himself in exchange for the player’s name coming out of the ledger. Nobody tells the player until it is done. It never fires if the bell was silenced any other way.',
      setsFlags: ['the_bell_rang'],
      cancelledByFlags: ['the_bell_is_quiet', 'faked_your_death', 'contract_cancelled', 'contract_bought_out', 'vesna_beaten', 'kael_dismissed'],
      requiresFlags: ['bellhouse_noticed'],
      movesCharacters: [{ characterId: 'kael', toLocationId: 'bell_shop' }],
    },
  ],
  promises: [
    {
      id: 'p_friday_at_ten',
      kind: 'FINALE',
      label: 'Whether you are alive, and in that chair, at ten on Friday',
      seedHint: 'A will with one clause everybody in the house has memorised.',
      payoffHint: 'A black fountain pen uncapped on the thirty-first floor, and a choice about what to sign.',
      weight: 1,
    },
    {
      id: 'p_why_he_did_not',
      kind: 'RELATIONSHIP',
      label: 'Why Kael sat down in the chair instead',
      seedHint: 'He tastes your coffee before he hands it over and will not say why.',
      payoffHint: 'A cup of tea left outside his door on the fourth night, without knocking.',
      weight: 0.95,
    },
    {
      id: 'p_the_client',
      kind: 'MYSTERY',
      label: 'Who paid the Bellhouse',
      seedHint: 'A contract card that knows you sleep with the balcony door open.',
      payoffHint: 'A daybook entry that says "M.S. 11 pm. Told her. All of it." and a woman who leaves flowers under the sixth name.',
      weight: 0.85,
    },
    {
      id: 'p_the_glass',
      kind: 'RIVAL',
      label: 'Who poured the glass',
      seedHint: 'Heart, they would have said. Same as your grandmother.',
      payoffHint: 'An empty pill bottle with her name on it, in the pocket of a navy coat.',
      weight: 0.8,
    },
    {
      id: 'p_pier_nine',
      kind: 'THEME',
      label: 'What your grandmother could not live with',
      seedHint: 'A sealed envelope: "Open before you sign anything."',
      payoffHint: 'A chain still threaded through the handles of a rusted fire door, and eleven names.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_left',
      name: 'You Left Years Ago',
      role: 'Outsider, quick on your feet',
      summary: 'You walked out of this family years ago and built an ordinary life somewhere else, so you notice what this house takes for granted and you know how to leave a room fast.',
      playstyle: ['Outsider', 'Slips away', 'Sees the obvious'],
      blurb: 'You came back for the funeral with one bag and a return ticket you have not used. Everybody in this house still talks about the day you left.',
      attributeBonus: { agility: 2, mind: 1 },
      skillProficiencies: { sneak: 3, read_people: 2 },
      startingItems: [{ itemId: 'unused_ticket', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_right_hand',
      name: 'You Ran Her Office',
      role: 'Insider, money and paperwork',
      summary: 'You were your grandmother’s assistant for three years, so you know the company, the board and the accounts, and you still carry your grandmother’s keys.',
      playstyle: ['Insider', 'Reads fine print', 'Knows the board'],
      blurb: 'She called you the only one who read to the end. You were the one who found her that morning, and you have not cried yet.',
      attributeBonus: { mind: 2, resolve: 1 },
      skillProficiencies: { ledgers: 3, poise: 1, read_people: 1 },
      startingItems: [{ itemId: 'odile_keys', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_board', amount: 10 }],
    },
    {
      id: 'arch_scandal',
      name: 'You Are the Scandal',
      role: 'Charm, nerve and bad press',
      summary: 'You are the heir the papers love to photograph leaving places, which makes you a superb liar, very hard to embarrass, and very easy to find.',
      playstyle: ['Charming', 'Lies well', 'Easy to find'],
      blurb: 'You once pushed a Thorne cousin off a yacht at the regatta, and the Three Houses still argue over dinner about whether he deserved it.',
      attributeBonus: { presence: 2, agility: 1 },
      skillProficiencies: { lying: 3, poise: 2 },
      startingItems: [{ itemId: 'spare_phone', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_houses', amount: 10 }],
    },
    {
      id: 'arch_fencer',
      name: 'You Can Fight',
      role: 'Trained fencer, physical',
      summary: 'You fenced at national level in college, so you can hold a blade, read a lunge, and surprise a professional for about three seconds.',
      playstyle: ['Physical', 'Fast hands', 'Hard to scare'],
      blurb: 'You still train every morning in the long gallery when the house is asleep. Kael has watched you do it for nine days and said nothing.',
      attributeBonus: { might: 1, agility: 2, resolve: 1 },
      skillProficiencies: { scrapping: 3, steel: 2 },
      startingItems: [{ itemId: 'fencing_sabre', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the will?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Elena Moreau' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'Who were you before the will?',
      helpText:
        'What you were doing with your life before your grandmother left you everything. It sets what you are good at, and it is fixed for the whole story. It does not decide whether you trust Kael, who you suspect, or whether you sign on Friday. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the family say about you?',
      helpText: 'One plain sentence the whole house would agree on, fair or not. It is how they will treat you at breakfast.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I never come to dinner, I always know what everybody earns, and I was her favourite whether I liked it or not.',
    },
    {
      id: 'first_instinct',
      label: 'What is your first instinct with a knife on the nightstand?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite on the first turn and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'keep_calm', label: 'Stay very calm and ask questions' },
        { id: 'get_help', label: 'Get as many witnesses into this room as possible' },
        { id: 'take_control', label: 'Get hold of the knife first, then talk' },
        { id: 'trust_him', label: 'Decide that a man who sat down is worth hearing out' },
        { id: 'get_out', label: 'Work out how to leave this house before Friday' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Kael see when you wake up?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Hair everywhere, my grandmother’s eyes, and an old college fencing T-shirt.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Twelve, which is all `worldBrief` sends. Four of them are losses and none
   * is a punishment: signing the proxy is the quietest one and is reachable by
   * being polite to an uncle for three days; letting Friday pass with the bell
   * still ringing costs Kael rather than the player, because the world is
   * FAIL_FORWARD and somebody has to pay a contract. Walking away is open from
   * about a third of the way in.
   *
   * The romance tops out at a kiss in every ending that has one, and three of
   * the twelve have no romance at all.
   */
  endings: [
    {
      id: 'end_the_heir',
      name: 'The Heir',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['you_signed', 'the_bell_is_quiet'],
        flagsUnset: ['buried_it', 'left_together'],
        minFactionReputation: [{ factionId: 'faction_board', value: 30 }],
      },
      condition:
        'The player is alive, signed on Friday at ten, and silenced the bell. Both attempts are dealt with in whatever way the player chose. This is the ordinary good ending and should feel earned rather than triumphant: a person in a big chair on the thirty-first floor who did not want it and took it anyway. Kael is wherever the player left things with him.',
      epilogue:
        'The share price wobbles for a week and then forgets. The board learns that the new chair reads to the end. Somebody moves the chair in the corner of the boardroom so it faces the door, and nobody can say who.',
      hint: '',
    },
    {
      id: 'end_hired_properly',
      name: 'Hired, Properly',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['kael_hired_for_real', 'knows:why_he_stayed'],
        minRelationship: [{ characterId: 'kael', dimension: 'affection', value: 70 }],
      },
      condition:
        'The player hired Kael again, under his own name, with a contract that says what he is for. They both know what was said on the roof. Write it with restraint: a kiss at most, and the kind of joke two people make when they have decided something. The romance is the point and it is never more than that.',
      epilogue:
        'The new contract runs to one page. Clause one says he tastes the coffee. Clause two says he is allowed to sit down. Pell drafted it, and put the good joke in a footnote, and Kael read the footnote first.',
      hint: 'He has never been hired by somebody who knew exactly what he was.',
    },
    {
      id: 'end_the_last_job',
      name: 'The Last Job',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: { flagsSet: ['faked_your_death', 'left_together'] },
      condition:
        'The Bellhouse believes the heir is dead, the bell was rung by Kael’s own hand, and the two of them took the Saturday train with the go-bag and two passports in two new names. The company goes wherever the player arranged before they died. This is a romance and an escape, and it is also a person giving up a whole life; let both be true.',
      epilogue:
        'Saltmere holds a second funeral in a month and Ines speaks at it, badly, on purpose, so that it sounds like grief. Six weeks later she receives a postcard of a harbour she does not recognise, with nothing written on it except a tick, and she laughs out loud in the middle of a board meeting.',
      hint: 'Two tickets, dated Saturday.',
    },
    {
      id: 'end_eleven_names',
      name: 'Eleven Names',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['truth_public', 'contract_cancelled'],
        minFactionReputation: [{ factionId: 'faction_pier', value: 30 }],
      },
      condition:
        'The player told the city the truth about Pier Nine, and Dr. Sato walked into the clock shop and cancelled the contract herself. The person who wanted the heir dead got what she actually wanted instead. Write it plainly: a plaque re-engraved, a sum paid, a doctor who has to live with what she did and is allowed to.',
      epilogue:
        'The plaque at Pier Nine gets a second line under the eleven names: what happened, in plain words, paid for by the Ravelle Line. Dr. Sato still leaves flowers on Thursdays. Some Thursdays, the heir is there too, and neither of them says anything, which is the right amount.',
      hint: 'The flowers under the sixth name are always fresh.',
    },
    {
      id: 'end_paid_in_full',
      name: 'Paid in Full',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['contract_bought_out', 'you_signed'] },
      condition:
        'The player walked into the Bellhouse, read rule four aloud, and bought their own life at twice the price. Then they signed. The first cheque the new chair of the Ravelle Line wrote was to a clock-repair shop. Play the absurdity and the nerve of it; Vesna should be delighted.',
      epilogue:
        'The Bellhouse repaints rule four smaller. Vesna sends a card on the anniversary of the signing every year: a drawing of a bell with no clapper, and "Pleasure doing business, heir apparent."',
      hint: 'Nobody ever reads rule four.',
    },
    {
      id: 'end_uncles_house',
      name: 'Your Uncle’s House',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['signed_viktors_proxy'], flagsUnset: ['viktor_exposed'] },
      condition:
        'The player signed the proxy and Viktor took the vote on Friday. Nobody was arrested and nobody was exposed. This is a loss and must not be written as a punishment: the player chose peace in the family and got it, and the cost arrives slowly, in quarterly reports and a man who cannot meet their eye at dinner.',
      epilogue:
        'The lenders are paid by Christmas, out of the company. The Vauclair offer is accepted in spring. Viktor sends a very large bouquet on the anniversary of his mother’s death, with a card that says "Following wind", and the player never does find out what was in the glass.',
      hint: '',
    },
    {
      id: 'end_vauclair_table',
      name: 'The Vauclair Table',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['sold_to_ines'],
        minFactionReputation: [{ factionId: 'faction_houses', value: 30 }],
      },
      condition:
        'The player sold to Ines. They are rich, free, and out of the Ravelle Line for good, and the old friendship is either mended or politely buried depending on graduation. Selling is a legitimate choice, not cowardice; the person who never wanted this simply did not take it.',
      epilogue:
        'Ines takes the chair her father would not give her and is very good at it. She keeps one empty seat at the Vauclair table at the club, and the staff know better than to give it to anybody else. Some evenings it is filled.',
      hint: '',
    },
    {
      id: 'end_gone_by_friday',
      name: 'Gone by Friday',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['left_together'] },
      condition:
        'The player walked out of the house, the city and the inheritance before Friday, alone. Do not make it a tragedy and do not redeem it. It is a completely coherent response to waking up next to a knife. Ten o’clock on Friday comes and goes, and Viktor gets the company and his own problems with it.',
      epilogue:
        'Pell reads clause nine aloud to an empty chair and puts the black pen back in his pocket uncapped, which he has never once done. The return ticket gets used after all. Somewhere far away, the player wakes most mornings to an empty nightstand and checks it anyway.',
      hint: '',
    },
    {
      id: 'end_the_bell_rings',
      name: 'The Bell Rings',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['the_bell_rang'] },
      condition:
        'Friday passed and the contract was never silenced, so Kael closed it the only other way the rules allowed: he went to the clock shop and offered himself in exchange for the player’s name coming out of the ledger. The player is safe and did not choose this. Write the absence and the cost, never the event itself; no violence on the page.',
      epilogue:
        'The player’s name is gone from the ledger by Saturday. Nobody will say where he went. A month later a cup of tea is left outside their door at three in the morning, without a knock, and it is still warm, and the corridor is empty both ways.',
      hint: 'The bell on the gate has no clapper. Somebody has to ring one.',
    },
    {
      id: 'end_professional_distance',
      name: 'A Bodyguard, Nothing More',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['kael_let_go'] },
      condition:
        'The player kept Kael at a professional distance to the end and then let him go, kindly, with the go-bag and the second ticket. Nothing went wrong. Two people decided, correctly or not, that what started with a knife on a nightstand could not become anything else. Let it be a little sad and entirely respectable.',
      epilogue:
        'He leaves the way he arrived: no fuss, one bag, the side gate. The code is changed that afternoon. For a year the player sleeps with the balcony door shut, and then one spring night leaves it open an inch, out of habit, and does not mind.',
      hint: '',
    },
    {
      id: 'end_doctors_orders',
      name: 'Doctor’s Orders',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['sato_confessed', 'quiet_restitution'], flagsUnset: ['truth_public'] },
      condition:
        'Dr. Sato confessed, and the player chose to keep her secret and pay the Pier Nine families quietly instead of in public. Mercy and a lie, in the same decision. Write it with weight: the player now owns two buried things, their grandmother’s and their doctor’s.',
      epilogue:
        'She still comes on Tuesdays to take the heir’s pulse. Neither of them ever mentions it. Her husband’s watch is mended in the spring, by a clock-repair shop in Old Town, and starts again at twenty past two.',
      hint: '',
    },
    {
      id: 'end_family_business',
      name: 'Family Business',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['you_signed', 'buried_it'] },
      condition:
        'The player signed and locked the Pier Nine file away again. They are alive, in charge, and exactly what their grandmother was. This is a dark ending and should be allowed to be one: written without judgement, with the family resemblance unmistakable.',
      epilogue:
        'The cabinet in the library gets a new lock, and the new key goes on a ring with the rest. Every Thursday, the new chair finds a small entry in their own diary that they do not remember making: a tick, and the number eleven.',
      hint: '',
    },
  ],
  opening:
    "You wake to a knife on your nightstand.\n\nBlack handle, no shine. Not yours.\n\nThe man in the chair beside it is Kael, your new bodyguard. Nine days on the job. He still has his jacket on, and he is watching the door instead of you.\n\n\"I was paid to use that last night,\" he says. \"I didn’t.\"\n\nHe tips his head at your water glass. It has gone cloudy.\n\n\"Somebody else tried anyway. You’d have gone in your sleep. Heart, they’d have said. Same as your grandmother.\"\n\nHe finally looks at you.\n\n\"So. Change of plans. Who else wants you dead?\"",
  openingPanel: {
    assetKey: 'story_paid_to_kill_me/opening',
    alt: 'Kael in a chair beside a bed at grey dawn, jacket still on, watching the door; on the nightstand a black-handled knife and a cloudy glass of water.',
  },
  openingSuggestions: [
    "\"My uncle, for a start. Now tell me why I’m still breathing.\"",
    'I pick up the cloudy glass and hold it up to the light.',
    'I grab the knife off the nightstand before he can, and point it at him.',
  ],
  publishedAt: null,
};

export const PAID_TO_KILL_ME = StoryVersion.parse(raw);
