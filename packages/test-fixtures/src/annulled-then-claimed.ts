import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Annulled, Then Claimed" — story #46, villainess romance fantasy.
 *
 * The structural bet is Good Morning, Husband's, turned inside out. That world
 * starts the relationship four years deep; this one starts it eleven seconds
 * old, in public, with four hundred witnesses. The crown prince has just
 * annulled the engagement, the grand duke nobody invites has just said "I'll
 * take her" from the back of the hall, and the first beat ends on his gloved
 * hand and a yes-or-no. Every route out of the ballroom is real: yes, no, terms,
 * a scene, or walking out alone.
 *
 * What stops it being a wish-fulfilment conveyor belt is that every person in
 * the room wants a specific thing this week and has a deadline on it. Kassian
 * turns thirty in nine days and loses his lands to a Crown steward if he is
 * unmarried; Edmund has signed a loan that only pays if that happens; Rosalind
 * is one bad week from being sold to her uncle's oldest creditor; the player's
 * father bought his council seat with his silence. The duke's reason for
 * choosing the player is the story's quiet centre and is never forced: forty
 * wagons of grain, three winters ago, that nobody at court knows about.
 *
 * Playable span: the nine days of the Midsummer Season, from the ball to noon
 * on Kassian's thirtieth birthday. Everything before is the villainess's
 * reputation, carried in lore and in which rumours are true. Everything after
 * is an ending.
 *
 * Rated 13+. Romance goes up to a kiss and stops. Violence is social: a slapped
 * prince is a summons and a scandal, never blood. Every adult in it is over
 * eighteen and the bible states each age.
 *
 * Three invisible variables. Composure is the one honest GOOD_HIGH thing that
 * rest restores, because a night's sleep genuinely does. Scandal is the first
 * GOOD_LOW on purpose: PUBLIC_VIOLENCE raises the first one, and a fight at a
 * palace ball should make the capital talk. Leverage is Crane's grip on
 * everybody, and it creeps up every hour nobody does anything about him.
 */

const raw = {
  id: 'sv_annulled_then_claimed_1',
  storyId: 'story_annulled_then_claimed',
  version: 1,
  title: 'Annulled, Then Claimed',
  fantasyLabel: 'Dumped at the ball. Claimed by the duke.',
  hook: 'The crown prince annuls your engagement in front of four hundred guests. Before anyone can laugh, the grand duke nobody invites calls out from the back of the hall: “I’ll take her.”',
  premise:
    'For four years you were engaged to the crown prince. Tonight, at the midsummer ball, in front of four hundred guests, he annulled it. His reasons, read aloud: cruelty, jealousy, and what you did to Lady Rosalind, the count’s sweet niece now standing on his arm.\n\n' +
    'Some of it is true. You do have a sharp tongue, and you have used it. Some of it is a lie, and you know exactly which parts.\n\n' +
    'The whole hall was waiting for you to scream. Then the grand duke of the North, a man the court calls the Butcher and never invites anywhere, said from the back: “I’ll take her.” He has spoken to you twice in your life. He has a reason, and it has a deadline.\n\n' +
    'You have until midnight to answer him in front of everyone. After that comes your father, who wants a word with you in the carriage; a city that will read about you over breakfast; and a royal hearing in three days that decides whose name you leave with.\n\n' +
    'Take his hand, or refuse him in front of everyone. Clear your name, or keep it and use it. Every person in that ballroom wants something from you before the week is out.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Fantasy', 'Villainess', 'Drama', 'Comedy'],
  mechanicsChips: [
    'Yes, no, or name your terms',
    'Nine days on the clock',
    'Your reputation is a weapon',
    'Every suitor can be refused',
    'Some of the rumours are true',
  ],
  contentDescriptors: ['ROMANCE', 'MORAL_AMBIGUITY', 'ALCOHOL_REFERENCES'],
  intensity: 'LIGHT',
  creatorNote:
    'You can say yes, say no, name your terms, or set the whole ballroom on fire with one sentence, and every one of those is a real way to play this. The duke will not ask twice. You can.',
  openingObligations: [
    {
      what: 'Answer the grand duke, in front of the whole court, before the midnight bells end the ball.',
      withCharacterId: 'kassian',
      dueInMinutes: 80,
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'glass_ballroom',
    startWorldMinute: 22 * 60 + 40,
    startingItems: [{ itemId: 'engagement_ring', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-four. Grand Duke Kassian Vahl is twenty-nine, Crown Prince Edmund twenty-five, Lady Rosalind Crane twenty-one, Marquis Osric Mereval fifty-four, Bette Hollin twenty-seven, Captain Signe Brask thirty-four and Count Benedikt Crane forty-seven.',
      'The player is twenty-four, the sole heir of Marquis Osric Mereval, and was engaged to Crown Prince Edmund for four years, until he annulled the engagement tonight at the midsummer ball in front of the whole court.',
      'Grand Duke Kassian Vahl turns thirty at noon nine days from tonight. Under the Writ of Marches, a march lord still unmarried at thirty has his lands placed under a Crown steward until he weds. The steward already chosen is Count Benedikt Crane’s cousin.',
      'Lady Rosalind Crane cut the lace of her own gown at the spring garden party and let the court blame the player. What happened on the stair at the winter gala is genuinely disputed. The player’s sharp tongue is real and so are some of the cruel things the court repeats.',
      'Three winters ago, in the Long Freeze, the player paid from their own estate income for forty wagons of grain to reach the northern garrisons when the Crown would not send any, and signed the order "a friend of the March". Nobody at court knows. Kassian has known for two years.',
      'Crown Prince Edmund has signed a private loan from the Crane Counting House secured against the North’s silver mines. It only pays out if a Crown steward takes the Northern March. Edmund is not a monster: he is broke, frightened of his father, and believes Rosalind.',
      'Marquis Osric Mereval knew about the annulment three days before the ball, from a letter Edmund wrote him, and agreed to stay silent to keep his council seat. He did not warn the player.',
      'A marriage is binding only when both people sign the register in person, at the Chancery of Seals in the capital or before the march chaplain at Vahlhold. Nobody can be married by announcement, by force, or by somebody else’s signature.',
      'Kassian will not pressure anyone into marriage. If the player refuses him he will bow, leave, and never ask again. The player is free to go to him later.',
      'There is no magic in this world. Power is law, money, rank, nerve and what people are willing to say in front of witnesses. Nobody flies, vanishes, reads minds or walks through walls, the player included: if the player tries something impossible, it does not happen; one plain line says so, and the scene goes on from where the player stands, in front of whoever saw them try.',
      'The court calls Kassian the Butcher because, the spring after the Long Freeze, he stood up in open council and read out, name by name and figure by figure, every lord who had grown rich selling grain while the North went hungry. Three of them lost their titles by summer. Nobody at court has invited him anywhere since, he has never corrected the name, and nobody in the North uses it.',
      'The player and Kassian have spoken exactly twice before tonight, both times briefly. At the old Queen Dowager’s funeral two summers ago, the player told him that gloves worn indoors were either an insult or a coward’s habit; he said "Neither," and did not explain. At a council supper last winter, the player was the only person at the table who asked him how the North was eating, and he answered for twenty minutes.',
      'Reputation is how this world keeps score. Anything the player says or does in front of witnesses is repeated across the capital by the next morning, larger, and the Halcourt Lantern prints the best of it; a word said in private stays private unless somebody repeats it. Keeping a calm face through a bad evening costs something, and a night’s sleep gives it back. Count Crane’s hold on the court, through his loans and the debts he has bought, grows every day that nobody moves against him.',
    ],
    toneGuide:
      'Villainess romance fantasy with teeth, played for tension and comedy in equal measure. A ballroom is a battlefield and the weapons are sentences: a cut delivered at exactly the right volume, a curtsey held a beat too long, a fan closed with a snap. The court is an audience that reacts to everything, and its reactions are where most of the comedy lives. ' +
      'The romance is slow and well-mannered on the surface: banter, a hand held a moment too long, a cloak put round somebody’s shoulders, a dance that is really an argument. It goes as far as a kiss and stops there: the kiss ends the scene, the next beat starts somewhere else, later, and nothing is implied to have happened off the page. A wedding ends at the register. The camera stays on faces and hands. Nobody is ever pressured into anything, and every man who wants the player can be refused and stays refused. ' +
      'Violence is rare and social. A slapped prince is a summons and a scandal, palace guards arrive within a minute, and nobody bleeds on the page. ' +
      'Keep scenes concrete: the wax on a seal, the figures in a ledger, the exact words said in front of witnesses. Short beats, sharp dialogue, one clear question at the end. The face at the top of a beat is Kassian’s whenever he is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Kassian does not let go of your hand when the music starts again.\n\n\"They’re staring,\" you say.\n\n\"They were staring before.\" He turns you, badly. He is a terrible dancer. \"Now they’re staring at us. It’s an improvement.\"\n\nAcross the floor, Edmund has stopped mid-sentence.\n\n\"You’ve stepped on my foot twice, Your Grace.\"\n\n\"Three times. You were too polite to count the first.\"",
      "Your father waits until the carriage door shuts.\n\n\"The duke,\" he says. It is not a question.\n\nThe wheels start. He takes his gloves off one finger at a time, the way he does before reading a bad ledger.\n\n\"Before you say anything, understand that I have already had one conversation about you this week that I did not enjoy.\"\n\nThis week.\n\nHe knew.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 8, agility: 10, mind: 12, presence: 13, resolve: 12, arcana: 8 },
  skills: [
    { id: 'poise', name: 'Poise', attribute: 'presence', description: 'Holding a room’s eye while four hundred people wait for you to break.' },
    { id: 'tongue', name: 'Sharp Tongue', attribute: 'presence', description: 'The one sentence that ends a conversation, and sometimes a reputation.' },
    { id: 'protocol', name: 'Court Law', attribute: 'mind', description: 'Precedence, contracts, and which clause of which old writ actually binds.' },
    { id: 'insight', name: 'Insight', attribute: 'mind', description: 'Who is watching whom across a ballroom, and what they want from you.' },
    { id: 'ledgers', name: 'Ledgers', attribute: 'mind', description: 'Reading money: debts, dowries, loans, and who is quietly drowning.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Saying no to powerful men, out loud, and not taking it back.' },
    { id: 'discretion', name: 'Discretion', attribute: 'agility', description: 'Servants’ stairs, side doors, and leaving a palace without being announced.' },
    { id: 'riding', name: 'Riding', attribute: 'might', description: 'A horse, a long road and the cold, which the North respects more than manners.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is the GOOD_HIGH one because `resolveRest` refills those, and a
   * night's sleep after a public humiliation genuinely does put the player back
   * together. It is also what the generic cost path spends, which is right: the
   * price of a bad exchange at court is that you have less left for the next.
   *
   * Scandal is the first GOOD_LOW in array order on purpose, because
   * PUBLIC_VIOLENCE raises the first one. Leverage creeps upward with time:
   * Crane gets stronger every hour that nobody does anything about him.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 70,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has nothing left to hold the face with. Whatever comes out next is the true thing, unpolished, in front of whoever happens to be there, and the court will repeat it word for word by morning.',
      color: '#C9A66B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Cracking. The player’s voice catches on ordinary words, their hands want something to hold, and the next cruel remark will land. This is where a scene turns into tears or a thrown glass, and where leaving the room is a strong move rather than a weak one.',
        },
        {
          upTo: 60,
          behaviour:
            'Holding, by effort. The smile stays on and costs something every minute. Fine for one more conversation with somebody who wants something; bad for a second one straight after. Nobody notices unless they are watching closely, and Kassian is.',
        },
        {
          upTo: 100,
          behaviour:
            'Steady. The player can take an insult, let it sit, and answer it a full second later in a way the whole room remembers. Long, dangerous conversations are open, and so is being kind on purpose.',
        },
      ],
    },
    {
      id: 'scandal',
      name: 'Scandal',
      max: 100,
      start: 72,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The capital has moved on to somebody else’s disgrace. The player can walk the length of the Lantern Quarter without a single head turning, which is restful and faintly insulting.',
      color: '#9E2A4B',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Old news. People who were at the ball tell it as a funny story, nobody else brings it up, and invitations arrive addressed to the player rather than to the gossip. Doors that shut tonight can open again.',
        },
        {
          upTo: 50,
          behaviour:
            'Talked about. Conversations pause when the player walks in and resume a beat too brightly. Hostesses seat them carefully. A clever remark the player makes is repeated across town by supper, and credited correctly.',
        },
        {
          upTo: 80,
          behaviour:
            'The talk of the Season. The broadsheet has a drawing. Strangers stare in the street, shopkeepers are either very rude or very generous, and anything the player does in public will be told back to them tomorrow, larger.',
        },
        {
          upTo: 100,
          behaviour:
            'A byword. Mothers use the player’s name as a warning. Guards are called before anybody asks what happened. Every door at court is shut, and the only people still glad to see the player want something from them.',
        },
      ],
    },
    {
      id: 'leverage',
      name: 'Leverage',
      max: 100,
      start: 50,
      regenPerHour: 0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Count Crane holds nothing over anybody. His letters go unanswered, his cousin the would-be steward is a joke at supper, and the Crown is suddenly very interested in his books.',
      color: '#4F6D7A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Crane is on his back foot. His loan is known or nearly known, ministers stop taking his suppers, and his notes on the Mereval house are worth less than the paper. He becomes polite in a new, nervous way, and Rosalind starts making plans of her own.',
        },
        {
          upTo: 55,
          behaviour:
            'Balanced. Crane holds paper on the Mereval house and a loan he has not yet called, and he is careful because other people are too. Threats arrive wrapped as favours. He can still be bargained with, and knows it.',
        },
        {
          upTo: 80,
          behaviour:
            'Crane owns the room. Ministers wait for his nod, the steward appointment is treated as settled, and the player’s father answers his letters the same day. Offers arrive that are hard to refuse and harder to read.',
        },
        {
          upTo: 100,
          behaviour:
            'Crane owns the North on paper. His cousin is packing for Vahlhold, the Mereval notes have been called, and the court is already flattering his niece as the next queen. What is left is to make the paper worthless, or to leave.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'engagement_ring',
      name: 'The Prince’s Ring',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A royal sapphire set in white gold, still on your finger. By law you return it within three days. By custom you return it in front of witnesses.',
      loreText: 'It was his grandmother’s. Edmund chose it himself, four years ago, and was very proud of having done so.',
      icon: 'ring',
    },
    {
      id: 'dance_card',
      name: 'Your Dance Card',
      tags: ['document', 'personal'],
      questItem: true,
      skillModifiers: { insight: 1 },
      description:
        'A little ivory card on a silk cord, every waltz filled in. Edmund’s name is on the first four. The last waltz says "K.V." in a hand you do not know.',
      loreText: 'The ink on the last line is long dry. It was signed hours before the annulment, while the card was waiting for you in the retiring room.',
      icon: 'ticket',
    },
    {
      id: 'silver_scissors',
      name: 'Silver Embroidery Scissors',
      tags: ['evidence'],
      questItem: true,
      description:
        'A small pair of silver scissors shaped like a heron, monogrammed R.C. A thread of pale blue lace is still caught in the hinge.',
      loreText: 'Pale blue was the colour of Rosalind’s gown at the spring garden party: the gown the whole court says you cut.',
      icon: 'tools',
    },
    {
      id: 'grain_receipt',
      name: 'The Grain Receipt',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A merchant’s receipt for forty wagons of grain delivered to the northern garrisons three winters ago, paid in full and signed "a friend of the March". The handwriting is yours.',
      loreText: 'You paid for it from your own estate income in the Long Freeze, when the Crown let the northern garrisons wait. Nobody at court knows.',
      icon: 'papers',
    },
    {
      id: 'edmund_letter',
      name: 'Edmund’s Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A letter on royal paper to your father, dated three days before the ball, telling him the engagement will be annulled and asking for his discretion.',
      loreText: 'Your father’s reply is pinned behind it in draft. It asks for one thing in return: his seat on the council.',
      icon: 'letter',
    },
    {
      id: 'marriage_contract',
      name: 'The Duke’s Contract',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A marriage contract in a soldier’s plain handwriting. One year. Separate rooms. Your own income and your own household. At the end of the year either of you may leave, with the North’s thanks.',
      loreText: 'There is a blank space at the bottom headed "Her terms", and he has left it longer than his own.',
      icon: 'papers',
    },
    {
      id: 'broadsheet',
      name: 'The Morning Broadsheet',
      tags: ['document'],
      description:
        'The Halcourt Lantern’s morning sheet, ink still wet: THE VILLAINESS AND THE BUTCHER, with a drawing that flatters neither of you.',
      loreText: 'The artist has given the duke horns. He has given you a very good hat.',
      icon: 'papers',
    },
    {
      id: 'crane_ledger',
      name: 'Crane’s Private Ledger',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      skillModifiers: { ledgers: 2 },
      description:
        'A slim green ledger from the vault room of the Counting House. One page is a loan to the crown prince, secured on the silver mines of the Northern March, payable only if a Crown steward takes the March.',
      loreText: 'Some of the figures are in a second, neater hand. Rosalind’s.',
      icon: 'book',
    },
    {
      id: 'duchess_seal',
      name: 'The Vahl Seal',
      tags: ['personal'],
      description:
        'An iron signet set with a silver wolf: the seal of the Duchess of the Northern March. Wax pressed with it opens doors from the capital to the border.',
      loreText: 'It was made the week the duke came south, before anyone knew whether there would be a duchess to wear it.',
      icon: 'ring',
    },
  ],
  abilities: [
    {
      id: 'hold_your_ground',
      name: 'Keep Your Head Up',
      tags: ['social'],
      description: 'Refuse to give the room the scene it is waiting for. Stand still, stay calm, and let them watch you not break.',
      affordances: ['keep my head up', 'stay calm', 'stand tall', 'smile through it', 'do not react', 'ignore them', 'hold my ground'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'presence', skillId: 'poise', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cut_them_dead',
      name: 'Cut Them Dead',
      tags: ['social'],
      description: 'One sentence, at exactly the right volume, that makes the whole room laugh at somebody else.',
      affordances: ['insult', 'mock', 'cut him dead', 'put her in her place', 'sharp reply', 'make them laugh at him', 'set him down'],
      costs: [{ resourceId: 'scandal', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'tongue', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Watch who is watching whom, who looks surprised, and who does not.',
      affordances: ['look around', 'watch', 'study the room', 'notice', 'observe', 'watch the crowd', 'who is not surprised'],
      costs: [{ resourceId: 'composure', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'insight', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'name_your_terms',
      name: 'Name Your Terms',
      tags: ['social'],
      description: 'Agree to nothing until you have said exactly what you want in return.',
      affordances: ['negotiate', 'set terms', 'on one condition', 'bargain', 'counteroffer', 'my terms', 'make a deal'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'protocol', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_plainly',
      name: 'Say It Plainly',
      tags: ['social'],
      description: 'Ask the real question, or tell the true thing, with no fan in front of your face.',
      affordances: ['tell the truth', 'be honest', 'ask him why', 'ask directly', 'confess', 'admit it', 'why me'],
      costs: [{ resourceId: 'composure', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_no',
      name: 'Say No',
      tags: ['social'],
      description: 'Say no, out loud, to somebody who is used to hearing yes. A refusal in this world is always allowed.',
      affordances: ['refuse', 'say no', 'decline', 'turn him down', 'reject him', 'no thank you'],
      costs: [{ resourceId: 'composure', amount: 5 }],
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
      description: 'Stop being polite on purpose: raise your voice, throw the wine, give the court the scandal it came for.',
      affordances: ['make a scene', 'shout', 'throw my wine', 'storm out', 'lose my temper', 'scream at him', 'slap him'],
      costs: [{ resourceId: 'scandal', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'tongue', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['utility'],
      description: 'Leave by the servants’ stair or a side door before anyone thinks to stop you.',
      affordances: ['slip away', 'sneak out', 'leave quietly', 'servants stair', 'side door', 'disappear', 'escape'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'discretion', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'dance',
      name: 'Take the Floor',
      tags: ['social'],
      description: 'Dance, in front of everyone, with the one person the court did not expect.',
      affordances: ['dance', 'waltz', 'take his hand', 'ask him to dance', 'take the floor', 'let him lead'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'poise', baseDc: 10 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ride_hard',
      name: 'Ride Hard',
      tags: ['movement'],
      description: 'Take a horse and outride whoever is following, in any weather.',
      affordances: ['ride', 'gallop', 'take a horse', 'ride north', 'race', 'outride them'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'riding', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_deal',
      name: 'Take Crane’s Deal',
      tags: ['social'],
      description: 'Accept the count’s money or his terms, and owe him for it.',
      affordances: ['accept his offer', 'take the money', 'take the deal', 'sign with crane', 'borrow from him', 'agree to his terms'],
      costs: [{ resourceId: 'leverage', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['crane_made_an_offer'],
        lockedCopy: 'Nobody has offered you anything yet. Count Crane is still deciding what you are worth.',
      },
    },
    {
      id: 'trace_the_money',
      name: 'Follow the Money',
      tags: ['sight'],
      description: 'Read a ledger the way it was written, and find the page somebody hoped you would skip.',
      affordances: ['follow the money', 'read the ledger', 'check the accounts', 'trace the loan', 'go through the books', 'find the figures'],
      costs: [{ resourceId: 'composure', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'ledgers', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_silver_loan'],
        lockedCopy: 'You have no thread to pull yet. Somebody at this ball is in debt, and you do not know who, to whom, or for what.',
      },
    },
    {
      id: 'use_the_seal',
      name: 'Speak as Duchess',
      tags: ['social'],
      description: 'Press the Vahl seal into wax and speak with the whole Northern March behind you.',
      affordances: ['use the seal', 'speak as duchess', 'as the duchess of the north', 'seal it', 'in my husband’s name'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'poise', baseDc: 11 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['married_the_duke'],
        lockedCopy: 'You have no seal to speak with. Whatever you say tonight, you say as your father’s heir and the prince’s cast-off.',
      },
    },
  ],
  locations: [
    {
      id: 'glass_ballroom',
      name: 'The Glass Ballroom',
      shortName: 'Ballroom',
      description:
        'The great ballroom of the Summer Palace, walled with tall windows and mirrors so that every scandal is seen from four angles at once. Four hundred guests, an orchestra in the gallery, card tables along one wall, and a long open floor down the middle that everybody is now standing at the edges of.',
      artDirection:
        'Vast fantasy palace ballroom at night, tall arched windows and mirrors, crystal chandeliers, an orchestra gallery, a crowd of nobles in silk gowns and coats parted around an empty floor. Gold, white and midnight blue, glittering and tense.',
      connections: [
        { to: 'moon_terrace', travelMinutes: 1, label: 'Out through the glass doors to the terrace' },
        { to: 'retiring_room', travelMinutes: 2, label: 'The ladies’ retiring room' },
        { to: 'audience_hall', travelMinutes: 4, label: 'Through the portrait gallery to the Audience Hall' },
        { to: 'carriage_court', travelMinutes: 5, label: 'Down the grand stair to the carriages' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'moon_terrace',
      name: 'The Moon Terrace',
      shortName: 'Terrace',
      description:
        'A long stone terrace outside the ballroom, lit by lanterns and the moon, with the whole room visible through the glass behind it. This is where people come to say what they could not say inside, and where somebody is always listening from the next pillar.',
      artDirection:
        'Moonlit stone palace terrace with balustrades and hanging lanterns, ballroom glowing through tall glass doors behind, gardens dark below. Silver and gold, romantic and watchful.',
      connections: [
        { to: 'glass_ballroom', travelMinutes: 1, label: 'Back inside' },
        { to: 'palace_gardens', travelMinutes: 3, label: 'Down the steps into the gardens' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
    },
    {
      id: 'retiring_room',
      name: 'The Ladies’ Retiring Room',
      shortName: 'Retiring Room',
      description:
        'A small mirrored sitting room off the ballroom with velvet couches, a low fire, and a table of pins, salts and powder. Maids wait here with wraps and dance cards. Every tear shed at a palace ball is shed in this room, and every maid in it repeats what she saw by morning.',
      artDirection:
        'Small ornate palace powder room, gilt mirrors, velvet couches, a low fire, a table of pins and perfume bottles, wraps over a chair. Rose and cream, intimate, gossipy.',
      connections: [{ to: 'glass_ballroom', travelMinutes: 2, label: 'Back to the ballroom' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'dance_card', qty: 1, ownerId: null, aka: ['dance card', 'my card', 'the card', 'my dance card'] },
      ],
    },
    {
      id: 'palace_gardens',
      name: 'The Palace Gardens',
      shortName: 'Gardens',
      description:
        'Hedged walks, a long fountain and a rose maze below the terrace, with the prince’s apartments looking down on all of it. By day the court walks here to be seen. By night it is dark enough to have a real conversation, or to be followed into one.',
      artDirection:
        'Formal palace gardens at night, clipped hedges, a long reflecting fountain, a rose maze, palace windows lit above. Deep green and silver, hushed.',
      connections: [
        { to: 'moon_terrace', travelMinutes: 3, label: 'Up the steps to the terrace' },
        { to: 'carriage_court', travelMinutes: 6, label: 'The side path to the carriage court' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
    },
    {
      id: 'carriage_court',
      name: 'The Carriage Court',
      shortName: 'Carriages',
      description:
        'A cobbled courtyard at the foot of the grand stair, crowded with coaches, footmen and horses steaming in the cold. The Mereval carriage waits with its crest on the door. At the far end, apart from the rest, stands a plain black carriage with northern horses and a guard captain who has not moved in an hour.',
      artDirection:
        'Cobbled palace courtyard at night full of ornate coaches and lanterns, footmen, steaming horses, one plain black carriage apart from the rest with a soldier beside it. Torchlight and shadow.',
      connections: [
        { to: 'glass_ballroom', travelMinutes: 5, label: 'Up the grand stair to the ballroom' },
        { to: 'palace_gardens', travelMinutes: 6, label: 'The side path into the gardens' },
        { to: 'mereval_townhouse', travelMinutes: 20, label: 'Home in the Mereval carriage' },
        { to: 'vahl_residence', travelMinutes: 25, label: 'The black carriage to the duke’s house' },
        { to: 'lantern_quarter', travelMinutes: 15, label: 'On foot into the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'audience_hall',
      name: 'The Audience Hall',
      shortName: 'Audience Hall',
      description:
        'The King’s hall of judgment: a long cold room with a raised throne, a council bench, and a public gallery whose seats are sold for any hearing worth watching. The annulment is ratified here in three days, in front of everyone, and anyone with an objection gets one chance to make it.',
      artDirection:
        'Long austere royal throne room, raised dais with a throne, a council bench, a packed public gallery, banners and cold daylight through high windows. Grey stone and royal blue, formal and heavy.',
      connections: [{ to: 'glass_ballroom', travelMinutes: 4, label: 'Back through the portrait gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'mereval_townhouse',
      name: 'The Mereval Townhouse',
      shortName: 'Your House',
      description:
        'A tall narrow house on the best square in the capital, all dark wood and old portraits, kept exactly as it was when your mother was alive. Your rooms are on the second floor. Your father’s study is on the first, and its door is shut.',
      artDirection:
        'Elegant dark-panelled noble townhouse interior, portraits up a staircase, a shut study door with lamplight under it, a sitting room with trunks half packed. Burgundy and walnut, quiet and severe.',
      connections: [
        { to: 'carriage_court', travelMinutes: 20, label: 'Back to the palace' },
        { to: 'lantern_quarter', travelMinutes: 10, label: 'Out into the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'grain_receipt', qty: 1, ownerId: null, aka: ['receipt', 'the receipt', 'my writing box', 'grain receipt'] },
        { itemId: 'edmund_letter', qty: 1, ownerId: 'osric', aka: ['letter', 'his letter', 'the letter in the desk', 'father’s letters'] },
      ],
    },
    {
      id: 'lantern_quarter',
      name: 'The Lantern Quarter',
      shortName: 'The City',
      description:
        'The capital’s busiest streets: printers, dressmakers, coffee houses and the offices of the Halcourt Lantern, the broadsheet that prints the court’s secrets before breakfast. Everybody here has an opinion about the ball, and some of them will say it to your face.',
      artDirection:
        'Bustling fantasy capital street by day, hanging lanterns, printers’ shop windows, coffee houses, a broadsheet seller on a crate, carriages and crowds. Warm stone and ink, busy and noisy.',
      connections: [
        { to: 'mereval_townhouse', travelMinutes: 10, label: 'Back to the Mereval house' },
        { to: 'vahl_residence', travelMinutes: 12, label: 'Across town to the duke’s house' },
        { to: 'the_chancery', travelMinutes: 6, label: 'Up the hill to the Chancery of Seals' },
        { to: 'crane_counting_house', travelMinutes: 8, label: 'The Counting House on Coin Street' },
        { to: 'carriage_court', travelMinutes: 15, label: 'Up to the palace' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'broadsheet', qty: 1, ownerId: null, aka: ['broadsheet', 'the paper', 'the lantern', 'the morning sheet'] },
      ],
    },
    {
      id: 'vahl_residence',
      name: 'The Duke’s House',
      shortName: 'Duke’s House',
      description:
        'The grand duke’s house in the capital, rented by the season and barely furnished: bare floors, a fire in every room, northern soldiers in the kitchen and a sword yard where the garden should be. It looks like a garrison pretending to be a home, and it is warmer than any house on the best square.',
      artDirection:
        'Sparse large noble townhouse with bare wooden floors, roaring fireplaces, maps on a table, northern soldiers in grey, a frosty sword-practice yard outside. Grey, black and firelight, austere but warm.',
      connections: [
        { to: 'carriage_court', travelMinutes: 25, label: 'Back to the palace' },
        { to: 'lantern_quarter', travelMinutes: 12, label: 'Out into the city' },
        { to: 'vahlhold', travelMinutes: 4320, lockedByFlag: 'going_north', label: 'The North road, three days by carriage' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'marriage_contract', qty: 1, ownerId: 'kassian', aka: ['contract', 'the contract', 'his terms', 'the marriage contract'] },
      ],
    },
    {
      id: 'the_chancery',
      name: 'The Chancery of Seals',
      shortName: 'Chancery',
      description:
        'A domed hall of clerks, ledgers and wax, where every marriage, land grant and title in the kingdom is sealed into the register. A marriage is binding here only when both people sign in person. The clerks have seen everything and are impressed by nothing.',
      artDirection:
        'Domed hall of records with tall shelves of ledgers, clerks at slanted desks, red sealing wax and brass seals, a great open register on a lectern. Parchment and candlelight, hushed and official.',
      connections: [{ to: 'lantern_quarter', travelMinutes: 6, label: 'Back down the hill' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
    },
    {
      id: 'crane_counting_house',
      name: 'The Crane Counting House',
      shortName: 'Counting House',
      description:
        'A handsome bank on Coin Street with a marble front, a hall of quiet clerks and a vault below. Count Crane works behind a glass partition where he can see every customer come in. His niece’s rooms are upstairs, and his private ledgers are kept in the vault room.',
      artDirection:
        'Opulent fantasy bank interior, marble floor, clerks at long desks, a glass-partitioned office, an iron vault door, brass scales. Cream and dark green, cold money.',
      connections: [{ to: 'lantern_quarter', travelMinutes: 8, label: 'Back out to the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'crane_ledger', qty: 1, ownerId: 'crane', aka: ['ledger', 'his ledger', 'the private ledger', 'the books'] },
        { itemId: 'silver_scissors', qty: 1, ownerId: 'rosalind', aka: ['scissors', 'her scissors', 'embroidery scissors', 'her sewing box'] },
      ],
    },
    {
      id: 'vahlhold',
      name: 'Vahlhold',
      shortName: 'Vahlhold',
      description:
        'The grand duke’s castle in the North: black stone, deep snow, fires burning day and night, and a garrison that has heard a great deal about the southern lady its duke went to the capital for. The march chaplain can seal a marriage here as lawfully as the Chancery can.',
      artDirection:
        'Massive black stone castle in deep snow under a pale sky, banners snapping, soldiers on the walls, warm light in a great hall. White, black and gold firelight, grand and cold.',
      connections: [{ to: 'vahl_residence', travelMinutes: 4320, label: 'The long road back to the capital' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: 3 },
    },
  ],
  factions: [
    {
      id: 'faction_court',
      name: 'The Royal Court',
      description:
        'Four hundred nobles who saw the annulment and will be telling it for a year. They follow power, fear wit, and forgive almost anything that is entertaining enough. Tonight they have decided the player is finished.',
      startingReputation: -20,
      ranks: [
        { atReputation: -60, label: 'Shunned' },
        { atReputation: -20, label: 'Talked about' },
        { atReputation: 15, label: 'Received again' },
        { atReputation: 45, label: 'Sought after' },
        { atReputation: 75, label: 'Feared and imitated' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_mereval',
      name: 'House Mereval',
      description:
        'The player’s family house: a century-old marquisate, a council seat, a townhouse on the best square, a southern estate, and servants who have known the player all their life. It survives first and loves second.',
      startingReputation: 35,
      ranks: [
        { atReputation: 0, label: 'Kept at arm’s length' },
        { atReputation: 35, label: 'The heir' },
        { atReputation: 65, label: 'The one the house follows' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_north',
      name: 'The Northern March',
      description:
        'The grand duke’s lands, vassals and garrisons along the border: hard winters, silver mines, and soldiers who remember exactly which southerners helped in the Long Freeze. They distrust court ladies on principle.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'The southern lady' },
        { atReputation: 0, label: 'A stranger' },
        { atReputation: 25, label: 'Under the duke’s cloak' },
        { atReputation: 55, label: 'Our duchess' },
      ],
      allies: [],
      enemies: ['faction_crane'],
    },
    {
      id: 'faction_crane',
      name: 'The Crane Counting House',
      description:
        'Count Crane’s bank, which holds the debts of half the court and has lent the crown prince more than anybody knows. It wants the North’s silver and a Crane beside the throne, and it is patient.',
      startingReputation: -10,
      ranks: [
        { atReputation: -50, label: 'Bad debt' },
        { atReputation: -10, label: 'An account' },
        { atReputation: 30, label: 'A preferred client' },
      ],
      allies: [],
      enemies: ['faction_north'],
    },
    {
      id: 'faction_servants',
      name: 'The Servants’ Stair',
      description:
        'Footmen, maids, coachmen and clerks across the palace and the great houses. They see everything, they talk to each other, and they know the truth of most scandals a day before the court does.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Above stairs' },
        { atReputation: 30, label: 'Spoken to' },
        { atReputation: 60, label: 'Told everything' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'kassian',
      name: 'Grand Duke Kassian Vahl',
      calledName: 'Kassian',
      role: 'Grand duke of the Northern March, who has just offered to marry you in front of the whole court',
      cardBlurb:
        'He has spoken to you twice in your life, the court calls him the Butcher, and he has just held out his hand to you in front of four hundred people. He has nine days and a reason he has not told you.',
      pronouns: 'he/him',
      publicTraits: ['Says exactly what he means and nothing else', 'A terrible dancer and knows it', 'Feared at court for reasons that are mostly wrong'],
      hiddenDrives: [
        'He has known for two years who sent forty wagons of grain north in the Long Freeze, and he came to a ball for the first time in six years so he would be standing at the back when Edmund did it',
        'He wants to be chosen rather than accepted out of desperation, so he makes his offer easy to refuse and watches which it is',
      ],
      values: ['A promise made in front of witnesses', 'Feeding the people who hold the walls before feeding himself'],
      fears: [
        'That the player says yes only because there is nowhere else left to stand',
        'A Crown steward in his hall, and the North going hungry again',
      ],
      socialStyle:
        'Waits at the edge of a room until he has decided something, then crosses it in a straight line. Asks direct questions and lets the silence after them do the work.',
      boundaries: [
        'Will not pressure anyone into marriage. A no is final from his side, and he will not ask twice',
        'Will not lie to the player. He will refuse to answer, and say that he is refusing',
        'Will not take off his gloves in front of the court',
        'Will not tell the player about the grain at the ball or in front of anyone. Asked why them, he gives the true half (nine days, the Writ, and that they are the only person at court he respects) and says plainly that the rest waits until he trusts them',
      ],
      goals: [
        'Be married before noon on his thirtieth birthday, nine days from tonight, so no Crown steward takes his lands',
        'Marry the one person at court he actually respects, on terms that person can live with',
      ],
      secrets: [
        {
          id: 'kassian_the_grain',
          fact: 'Three winters ago, in the Long Freeze, someone paid for forty wagons of grain to reach his garrisons when the Crown would not send any. His captain traced it to the player two years ago. It is the whole reason he said "I’ll take her."',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells the player himself once he trusts them, usually somewhere cold and late, and only after they have asked him plainly why them.',
        },
        {
          id: 'kassian_the_dance_card',
          fact: 'He heard at noon from the palace servants that Edmund would annul the engagement tonight. He signed the last waltz on the player’s dance card hours before it happened.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The player finds "K.V." on their own dance card and asks him about it.',
        },
        {
          id: 'kassian_the_hands',
          fact: 'His hands are scarred by frostbite from riding the walls in the Long Freeze. He wears gloves so southern nobles will not flinch.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He takes them off for the player alone, once, if they have not flinched at anything else about the North.',
        },
      ],
      speechStyle:
        'Short, plain sentences with no flattery in them. Dry humour delivered flat, so it takes a second to land. Counts time in winters. Calls the player "my lady" until told otherwise, then uses their name as if it cost him something.',
      topics: ['the North', 'the nine days', 'why he chose you', 'why the court calls him the Butcher', 'the Long Freeze', 'his gloves', 'the contract'],
      voiceSamples: [
        'I said I’ll take her. I didn’t say I’d keep you. That part is your decision.',
        'I dance badly, I lie badly, and I don’t ask twice. You’ll come to like two of those.',
        'Nine days. I could have married anyone with a dowry and a pulse. I walked past forty of them to reach you.',
        'Say no and I bow, leave, and never mention it again. Say yes and I spend a year proving you right.',
        'Frostbite. The winter the Crown’s grain didn’t come. Most people flinch. You didn’t. Noted.',
      ],
      appearance:
        'Twenty-nine, very tall, black hair cut short like a soldier’s, grey eyes, a pale scar through the left eyebrow, northern black wool and silver where everybody else wears silk.',
      visualHook: 'A pale scar through his left eyebrow, and black leather gloves he never takes off indoors.',
      silhouette: 'Tall and still at the back of a crowded room, hands clasped behind him, a dark cloak over one shoulder.',
      artSeed: 'atc-kassian-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'warm', 'surprised', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'vahl_residence', activity: 'up before the house, reading letters from the North by one lamp' },
        { startMinute: 420, endMinute: 720, locationId: 'vahl_residence', activity: 'answering those letters standing up, because sitting makes him slower' },
        { startMinute: 720, endMinute: 960, locationId: 'the_chancery', activity: 'at the Chancery of Seals, arguing with clerks about an old writ' },
        { startMinute: 960, endMinute: 1260, locationId: 'vahl_residence', activity: 'sword drill in the yard with Signe, in any weather' },
        { startMinute: 1260, endMinute: 1440, locationId: 'glass_ballroom', activity: 'at the back of the Season’s ball, not dancing, watching one person' },
      ],
      homeLocationId: 'vahl_residence',
      knowledgeScope: ['kassian', 'the_north', 'the_writ_of_marches', 'the_long_freeze', 'the_grain', 'vahlhold', 'the_steward'],
      startingRelationship: { trust: 35, affection: 30, respect: 55, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'kassian_tells_you_why',
          label: 'He tells you about the grain',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:the_deadline'] },
        },
        {
          id: 'kassian_uses_your_name',
          label: 'He stops calling you "my lady"',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 55 },
        },
        {
          id: 'kassian_all_in',
          label: 'He says it is not about the nine days any more',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 75, flagsSet: ['contract_signed'] },
        },
      ],
      attributes: { might: 16, agility: 11, mind: 13, presence: 14, resolve: 17, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'edmund',
      name: 'Crown Prince Edmund',
      calledName: 'Edmund',
      role: 'The crown prince who just annulled your engagement in front of four hundred guests',
      cardBlurb:
        'He ended your engagement in public and believes every word he said. He is about to find out what he gave away, and you get to decide how much it hurts.',
      pronouns: 'he/him',
      publicTraits: ['Handsome, polished and always slightly on stage', 'Kind to anyone who agrees with him', 'Terrified of his father, and hides it with speeches'],
      hiddenDrives: [
        'He needs the North to get a Crown steward, because he has signed for a loan that only pays out if it does',
        'He half hoped the player would stop him tonight, and is furious they never got the chance',
      ],
      values: ['Looking like a good king in front of people', 'Loyalty to whoever is currently loyal to him'],
      fears: ['His father’s contempt, which is quiet and total', 'Being exposed as a fool by the person he just humiliated'],
      socialStyle:
        'Speaks to a room, never to a person, until he is alone and frightened; then he talks too fast and says the true thing by accident.',
      boundaries: [
        'Will never apologise in public',
        'Will not raise a hand to anyone, and calls the guards the moment somebody raises one to him',
      ],
      goals: ['Get the annulment ratified at the King’s hearing in three days', 'Keep the Crane loan quiet until the steward is named'],
      secrets: [
        {
          id: 'edmund_the_loan',
          fact: 'He has signed a private loan from the Crane Counting House secured against the North’s silver mines. It only pays out if a Crown steward takes the North, which happens if the grand duke is unmarried at thirty.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He lets it slip, angrily, if the player gets him alone and he believes they are no longer a threat.',
        },
        {
          id: 'edmund_the_letter',
          fact: 'He wrote to the player’s father three days before the ball to say the annulment was coming, and asked him to keep it quiet.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it as if the player already knew, the first time the two of them speak privately.',
        },
      ],
      speechStyle:
        'Rhetorical and polished, full of the realm, the Crown and "we". Builds long sentences for an audience. In private the sentences shorten, the "we" becomes "I", and he mentions his father within a minute.',
      topics: ['the annulment', 'Lady Rosalind', 'his father', 'the hearing', 'the Crown’s debts', 'your four years together'],
      voiceSamples: [
        'We did not take this decision lightly. The realm deserves a queen whose kindness is beyond question.',
        'My father will hear of this before the soup course, and he will look at me the way he looks at a failed harvest.',
        'Spare me the performance, please. I watched you take people apart over supper for four years.',
        'You think I wanted an audience? Four hundred guests was the only way I could make myself finish the sentence.',
      ],
      appearance:
        'Twenty-five, golden hair worn a little long, blue eyes, handsome in the way of portraits, white and gold court dress under a blue royal sash.',
      visualHook: 'The blue royal sash across his chest, worn even at breakfast.',
      silhouette: 'Centre of the room, one hand raised mid-speech, chin up.',
      artSeed: 'atc-edmund-01',
      portrait: null,
      expressions: ['neutral', 'proud', 'annoyed', 'worried', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'palace_gardens', activity: 'in his apartments over the gardens, sleeping late' },
        { startMinute: 540, endMinute: 780, locationId: 'audience_hall', activity: 'at his father’s council, saying as little as possible' },
        { startMinute: 780, endMinute: 1020, locationId: 'palace_gardens', activity: 'walking the garden paths with Rosalind, being seen' },
        { startMinute: 1020, endMinute: 1260, locationId: 'audience_hall', activity: 'hearing petitions and signing what his secretary hands him' },
        { startMinute: 1260, endMinute: 1440, locationId: 'glass_ballroom', activity: 'opening the ball, as he does every night of the Season' },
      ],
      homeLocationId: 'palace_gardens',
      knowledgeScope: ['edmund', 'the_annulment', 'the_crown', 'the_loan', 'rosalind', 'the_hearing'],
      startingRelationship: { trust: 20, affection: 15, respect: 25, fear: 10, rivalry: 40 },
      gates: [
        {
          id: 'edmund_alone',
          label: 'He talks to you without an audience',
          kind: 'TRUST',
          requires: { trust: 40, respect: 35 },
        },
        {
          id: 'edmund_regrets',
          label: 'He asks whether it is too late',
          kind: 'ROMANCE',
          requires: { affection: 45, flagsSet: ['name_cleared'] },
        },
      ],
      attributes: { might: 11, agility: 12, mind: 11, presence: 15, resolve: 9, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'rosalind',
      name: 'Lady Rosalind Crane',
      calledName: 'Rosalind',
      role: 'The count’s niece on Edmund’s arm, whom the whole court believes you tormented',
      cardBlurb:
        'The court thinks you made her life a misery. She knows exactly which parts you did and which parts she arranged, and she is more frightened of tonight than you are.',
      pronouns: 'she/her',
      publicTraits: ['Sweet, soft-spoken and endlessly apologetic in public', 'Watches money the way other people watch weather', 'Never alone at a ball if she can help it'],
      hiddenDrives: [
        'If Edmund drops her, her uncle will marry her to his oldest creditor by autumn, and she has decided she would rather be a villain than be sold',
        'She envied the player for four years and has never once admitted it, even to herself',
      ],
      values: ['Being practical about what a woman without money can afford', 'Paying her debts eventually, in whatever currency she has'],
      fears: ['Old Lord Pellam, and a life shut away in his house in the marshes', 'Being found out in front of the whole court'],
      socialStyle:
        'In public she lowers her eyes, apologises for things that are not her fault, and lets other people defend her. Alone, she drops the voice entirely and talks numbers.',
      boundaries: [
        'Will not confess anything in front of witnesses, ever',
        'Will not betray her uncle unless she has somewhere safe to go first',
      ],
      goals: [
        'Get through the King’s hearing with Edmund still holding her hand',
        'Find a way out from under her uncle that does not involve marrying anybody',
      ],
      secrets: [
        {
          id: 'rosalind_the_gown',
          fact: 'At the spring garden party she cut the lace of her own gown with her embroidery scissors and let the court blame the player.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it alone, flatly, if the player has not tried to humiliate her and offers her something she needs.',
        },
        {
          id: 'rosalind_the_figures',
          fact: 'Her uncle made her copy the figures of Edmund’s loan into his private ledger. She knows exactly what the North’s silver is worth to him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She trades it once she trusts the player to keep her out of the marshes.',
        },
      ],
      speechStyle:
        'In public: breathy, apologetic, ending sentences in little questions like "isn’t it?" and "wouldn’t you?". In private: flat, quick and practical, all figures and terms, with no apology anywhere in it.',
      topics: ['the garden party', 'the winter stair', 'her uncle', 'Edmund', 'Lord Pellam', 'the loan'],
      voiceSamples: [
        'I never wished you any harm, truly. It’s all just so dreadful, isn’t it?',
        'Drop it. Nobody is listening now. Let’s talk like two women who can add.',
        'Eleven stitches of lace, my own scissors, and two minutes behind a hedge. That gown cost my uncle forty crowns, and it bought me a prince.',
        'You were handed everything and you were cruel with it. I had to build my everything out of a ribbon and a lie.',
      ],
      appearance:
        'Twenty-one, a tall, composed woman with pale blonde hair pinned up in an elaborate court style, grey-green eyes, a white silk gown with seed pearls and a beaded white reticule she never puts down.',
      visualHook: 'A beaded white reticule she keeps hold of all night, as if it were a shield.',
      silhouette: 'Upright and very still half a step behind Edmund, eyes lowered, the reticule held in both hands.',
      artSeed: 'atc-rosalind-01',
      portrait: null,
      expressions: ['neutral', 'sorry', 'calculating', 'frightened', 'sharp'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'crane_counting_house', activity: 'in her rooms above her uncle’s counting house' },
        { startMinute: 600, endMinute: 840, locationId: 'palace_gardens', activity: 'walking with ladies who want to be near the next queen' },
        { startMinute: 840, endMinute: 1080, locationId: 'lantern_quarter', activity: 'at a dressmaker’s, being fitted for a gown she cannot pay for' },
        { startMinute: 1080, endMinute: 1260, locationId: 'crane_counting_house', activity: 'dressing while her uncle explains the evening to her' },
        { startMinute: 1260, endMinute: 1440, locationId: 'glass_ballroom', activity: 'on Edmund’s arm, in white' },
      ],
      homeLocationId: 'crane_counting_house',
      knowledgeScope: ['rosalind', 'the_garden_party', 'the_winter_stair', 'the_loan', 'crane', 'edmund'],
      startingRelationship: { trust: 10, affection: 20, respect: 35, fear: 25, rivalry: 50 },
      gates: [
        {
          id: 'rosalind_drops_the_act',
          label: 'She stops performing in front of you',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'rosalind_turns',
          label: 'She works with you against her uncle',
          kind: 'ALLIANCE',
          requires: { trust: 55, flagsSet: ['knows:the_silver_loan'] },
        },
      ],
      attributes: { might: 7, agility: 11, mind: 15, presence: 14, resolve: 12, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'osric',
      name: 'Marquis Osric Mereval',
      calledName: 'Osric',
      role: 'Your father, head of House Mereval and a member of the King’s council',
      cardBlurb:
        'Your father. He has kept the house standing through two reigns, he wants a word with you in the carriage, and he is already deciding what to do with you.',
      pronouns: 'he/him',
      publicTraits: ['Never raises his voice', 'Reads people like accounts', 'Has not said your mother’s name in nine years'],
      hiddenDrives: [
        'He knew about the annulment three days before the ball and agreed to it to keep his council seat, and he cannot find a way to say so',
        'The player looks more like their mother every year, and he handles that by looking at them less',
      ],
      values: ['The house, which outlasts every one of the people in it', 'Paying debts on time, including the ones nobody knows about'],
      fears: [
        'Being the Mereval who lost the seat the family has held for a century',
        'That the player is exactly as brave as their mother was, and that it will end the same way',
      ],
      socialStyle:
        'Conducts every hard conversation in a closed carriage or a closed study. States his conditions, waits, and takes silence as agreement.',
      boundaries: [
        'Will not discuss family matters where a servant can hear',
        'Will not beg the Crown for anything, including the player’s good name',
      ],
      goals: ['Keep his council seat through the hearing', 'Get the player out of the capital quietly until the talk dies down'],
      secrets: [
        {
          id: 'osric_knew',
          fact: 'Edmund wrote to him three days before the ball. He agreed to stay silent in exchange for keeping his seat on the council, and he did not warn the player.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if asked straight, in private, by a player who has already guessed. The letter is in his study desk.',
        },
        {
          id: 'osric_the_grain',
          fact: 'He found the forty wagons of grain in the estate accounts two years ago, covered the shortfall from his own money, and never said a word about it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once he is on the player’s side, and only in the form of a complaint about the southern accounts.',
        },
      ],
      speechStyle:
        'Clipped and exact, like a ledger read aloud. Speaks in conditions and costs: if this, then that. Calls the family "the house". Never says what he feels; says what it will cost.',
      topics: ['the house', 'the council seat', 'your mother', 'the southern estate', 'Edmund’s letter', 'the family debts'],
      voiceSamples: [
        'We will discuss this in the carriage. Not here. Never here.',
        'Before you say anything, understand that I have already had one conversation about you this week that I did not enjoy.',
        'The house survives. That is the only question I have ever been asked, and the only one I have ever answered.',
        'Your mother would have struck him. I signed a paper instead. Decide for yourself which of us you take after.',
      ],
      appearance:
        'Fifty-four, iron-grey hair swept back, a narrow lined face, the same dark eyes as the player, black evening dress cut thirty years out of fashion on purpose.',
      visualHook: 'A plain gold signet ring he turns on his finger while he decides something.',
      silhouette: 'Upright beside the card tables, both hands folded on a cane he does not need.',
      artSeed: 'atc-osric-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'weary', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'mereval_townhouse', activity: 'in his rooms, awake over accounts long after the house has gone quiet' },
        { startMinute: 480, endMinute: 720, locationId: 'mereval_townhouse', activity: 'in his study with the door shut' },
        { startMinute: 720, endMinute: 1020, locationId: 'audience_hall', activity: 'at council, keeping his seat' },
        { startMinute: 1020, endMinute: 1260, locationId: 'mereval_townhouse', activity: 'dining alone at the far end of a long table' },
        { startMinute: 1260, endMinute: 1440, locationId: 'glass_ballroom', activity: 'at the ball, near the card tables, watching the room' },
      ],
      homeLocationId: 'mereval_townhouse',
      knowledgeScope: ['osric', 'house_mereval', 'the_council', 'edmund_letter', 'the_southern_estate', 'the_grain'],
      startingRelationship: { trust: 40, affection: 35, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'osric_explains',
          label: 'He tells you what he agreed to, and why',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['father_confronted'] },
        },
        {
          id: 'osric_stands_with_you',
          label: 'He takes your side in front of the council',
          kind: 'ALLIANCE',
          requires: { trust: 60, affection: 50 },
        },
      ],
      attributes: { might: 9, agility: 8, mind: 16, presence: 14, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'bette',
      name: 'Bette Hollin',
      role: 'Your lady’s maid for six years, and the best-informed person below stairs',
      cardBlurb:
        'She has dressed you for every ball for six years, she hears every rumour below stairs before it reaches the ballroom, and for a year she has been keeping a secret about the winter gala that is getting heavy.',
      pronouns: 'she/her',
      publicTraits: ['Talks while she works and works while she talks', 'Knows every footman in the palace by name', 'Fiercely, loudly on your side'],
      hiddenDrives: [
        'For a year a clerk from the Crane Counting House has paid her to report the player’s movements, and she told herself it was only harmless things',
      ],
      values: ['Looking after her own', 'A good reference, which for a maid is the difference between a life and the street'],
      fears: ['Being turned out without a reference', 'That one of her harmless reports is why Rosalind was on the winter stair at the same minute as the player'],
      socialStyle:
        'Fusses with pins and hems while saying the important thing, so it sounds like an aside. Goes very quiet only when she is about to confess.',
      boundaries: [
        'Will not leave the player alone tonight, whatever she is told',
        'Will not lie if asked directly about the Counting House, though she will not volunteer it',
      ],
      goals: ['Get the player home in one piece', 'Find a way to tell the player about the reports before somebody else does'],
      secrets: [
        {
          id: 'bette_the_reports',
          fact: 'For a year she has been paid by Count Crane’s clerk to report the player’s movements. She told the clerk what time the player would leave the winter gala, and Rosalind was on the stair at that minute.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She confesses on her own if the player trusts her with something real, or at once if asked straight about the Counting House.',
        },
      ],
      speechStyle:
        'Quick, warm, below-stairs idiom, full of pins, hems, footmen and wagers. Says "my lady" constantly and means it. Drops into short broken sentences when she is frightened.',
      topics: ['the servants’ gossip', 'the footmen’s wagers', 'the winter gala', 'your gowns', 'the Counting House'],
      voiceSamples: [
        'Hold still, there’s a pin in your sleeve and half the palace in the corridor.',
        'Below stairs they had the whole thing by eleven o’clock. The footmen were taking wagers. I won four silver off the under-butler.',
        'Begging your pardon, my lady, but if you’re running off with a duke, you’ll want your warm stockings.',
        'I’ve done something. Sit down first. And promise you’ll keep me on after.',
      ],
      appearance:
        'Twenty-seven, freckled, red-brown hair under a starched cap, a grey maid’s dress with a pincushion strapped to her wrist.',
      visualHook: 'A red velvet pincushion strapped to her left wrist like a bracer.',
      silhouette: 'Brisk and quick, half turned toward a door, arms full of a velvet wrap.',
      artSeed: 'atc-bette-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'worried', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'mereval_townhouse', activity: 'in the attic room above yours' },
        { startMinute: 420, endMinute: 1200, locationId: 'mereval_townhouse', activity: 'pressing, mending and listening on the servants’ stair' },
        { startMinute: 1200, endMinute: 1440, locationId: 'retiring_room', activity: 'in the ladies’ retiring room with pins, a fan and your wrap' },
      ],
      homeLocationId: 'mereval_townhouse',
      knowledgeScope: ['bette', 'the_servants_stair', 'the_winter_gala', 'house_mereval', 'the_counting_house_clerk'],
      startingRelationship: { trust: 65, affection: 60, respect: 50, fear: 5, rivalry: 0 },
      gates: [
        {
          id: 'bette_confesses',
          label: 'She tells you about the Counting House',
          kind: 'TRUST',
          requires: { trust: 75 },
        },
        {
          id: 'bette_opens_the_stair',
          label: 'She puts the servants’ network at your service',
          kind: 'ALLIANCE',
          requires: { trust: 60, affection: 60 },
        },
      ],
      attributes: { might: 10, agility: 13, mind: 13, presence: 12, resolve: 11, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'signe',
      name: 'Captain Signe Brask',
      calledName: 'Signe',
      role: 'Captain of the grand duke’s guard, and the person who traced the grain',
      cardBlurb:
        'The duke’s captain thinks marrying you is a mistake and says so to your face. She also knows exactly why he chose you, and she has decided you will not hear it from her.',
      pronouns: 'she/her',
      publicTraits: ['Blunt to the point of rudeness', 'Has never once been impressed by a palace', 'Would walk into a fire for Kassian and complain all the way'],
      hiddenDrives: [
        'Her garrison at Greywatch ate that grain in the Long Freeze. She owes the player her life and resents owing a southern lady anything',
      ],
      values: ['Horses fed before people, people fed before lords', 'Saying a thing once, plainly'],
      fears: ['Kassian marrying somebody who will leave him alone in the North the first hard winter', 'Another Long Freeze'],
      socialStyle:
        'Stands by doors. Speaks in logistics: miles, horses, hours, how many soldiers. Softens only around animals and, eventually, the player.',
      boundaries: [
        'Will not leave Kassian unguarded in the capital',
        'Will not tell the player about the grain herself unless she believes Kassian never will',
      ],
      goals: [
        'Get Kassian married before noon on the ninth day, or get him out of the capital before the steward is named',
        'Find out whether the player is worth what the North owes them',
      ],
      secrets: [
        {
          id: 'signe_the_trace',
          fact: 'She traced the forty wagons back through three grain merchants and a Mereval estate steward to the player, two years ago, and told Kassian.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it slip, irritated, if the player treats the duke’s soldiers as people rather than furniture.',
        },
      ],
      speechStyle:
        'Terse northern soldier. Numbers first: miles, horses, hours. Mild northern oaths. Never uses a title she has not decided you deserve.',
      topics: ['the Long Freeze', 'the garrisons', 'the duke’s horses', 'the North road', 'why the court calls Kassian the Butcher'],
      voiceSamples: [
        'Two horses saddled. Forty miles to the first post-house. He said to tell you nothing else.',
        'Frost take it. He’s going to make me like you.',
        'Southerners send letters. Somebody, three winters back, sent wagons. I found out who. Ask him, not me.',
        'I don’t guard doors I can’t see through. Open it or step away from it.',
      ],
      appearance:
        'Thirty-four, broad-shouldered, pale blonde hair in a tight soldier’s braid, a weathered face, a grey northern uniform with a wolf-fur collar, and a sword she wears even to balls.',
      visualHook: 'A thick blonde braid pinned up like a crown, and a grey wolf-fur collar.',
      silhouette: 'Square in a doorway, thumbs hooked in her sword belt.',
      artSeed: 'atc-signe-01',
      portrait: null,
      expressions: ['neutral', 'blunt', 'wry', 'watchful'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'vahl_residence', activity: 'on the late watch, walking the yard' },
        { startMinute: 360, endMinute: 1260, locationId: 'vahl_residence', activity: 'running the duke’s household like a garrison' },
        { startMinute: 1260, endMinute: 1440, locationId: 'carriage_court', activity: 'with the duke’s black carriage, horses already in harness' },
      ],
      homeLocationId: 'vahl_residence',
      knowledgeScope: ['signe', 'the_north', 'the_long_freeze', 'the_grain', 'greywatch', 'kassian'],
      startingRelationship: { trust: 15, affection: 5, respect: 30, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'signe_lets_you_in',
          label: 'She lets you past the door without asking why',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['accepted_his_hand'] },
        },
        {
          id: 'signe_uses_your_name',
          label: 'She stops calling you "the southerner"',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 50 },
        },
      ],
      attributes: { might: 16, agility: 13, mind: 11, presence: 11, resolve: 15, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'crane',
      name: 'Count Benedikt Crane',
      calledName: 'Crane',
      role: 'Rosalind’s uncle, banker to half the court, and the only guest who did not look surprised',
      cardBlurb:
        'Every noble house in the capital owes him money, and he knows to the last crown what each of them is worth. He watched the annulment from the terrace without surprise, and he will name his price for you politely.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to everyone, including people he is ruining', 'Never seen to raise his voice or hurry', 'A count by purchase, and sensitive about it'],
      hiddenDrives: [
        'He wants the North’s silver, and the steward the Crown will set over the March is his own cousin',
        'He wants to be received at court as a lord rather than tolerated as a lender, and a niece on the throne would do it',
      ],
      values: ['Collateral', 'Never threatening anyone in front of a witness'],
      fears: ['A run on his counting house', 'Being laughed at by people who owe him money'],
      socialStyle:
        'Pleasant, unhurried, and always seated when others are standing. Describes threats as the ordinary working of a contract.',
      boundaries: [
        'Will not lend without collateral, to anyone, including his niece',
        'Will not put anything in writing that a court could read',
      ],
      goals: [
        'See a Crown steward named over the Northern March at noon on the ninth day',
        'Keep the player from marrying the duke, by money if possible',
      ],
      secrets: [
        {
          id: 'crane_the_loan',
          fact: 'He lent Edmund a fortune secured against the North’s silver mines, payable only if a Crown steward takes the March. The steward named will be his cousin.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'His private ledger, kept in the vault room of the Counting House, has every figure.',
        },
        {
          id: 'crane_the_notes',
          fact: 'He bought up the Mereval house’s debts last month at a discount, to have something to hold over the player’s father.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells the player himself when he makes his offer, as a courtesy.',
        },
      ],
      speechStyle:
        'Soft, courteous and unhurried. Talks about people as accounts: interest, collateral, due dates, a reasonable discount. Calls everyone "my dear". Never uses a threatening word.',
      topics: ['your father’s debts', 'the North’s silver', 'his niece', 'the steward', 'his counting house'],
      voiceSamples: [
        'Everyone is collateral for something, my dear. The art is knowing what you are securing.',
        'Your father’s notes came to me last month at a very reasonable discount. I thought you should hear it from a friend.',
        'I never threaten. I simply describe what happens on the due date.',
        'Refuse the grand duke and the debt is forgiven. Accept him, and I shall be patient for exactly as long as the law requires.',
      ],
      appearance:
        'Forty-seven, silver hair cut close, a smooth pleasant face, half-moon spectacles, a dove-grey coat of very expensive plainness.',
      visualHook: 'Half-moon spectacles on a fine gold chain, which he polishes before saying anything unpleasant.',
      silhouette: 'Seated, legs crossed, a glass held but never drunk from.',
      artSeed: 'atc-crane-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'calculating', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'crane_counting_house', activity: 'upstairs over the vault' },
        { startMinute: 480, endMinute: 1140, locationId: 'crane_counting_house', activity: 'behind his desk, pricing other people’s futures' },
        { startMinute: 1140, endMinute: 1260, locationId: 'lantern_quarter', activity: 'taking supper with a minister who owes him money' },
        { startMinute: 1260, endMinute: 1440, locationId: 'moon_terrace', activity: 'on the terrace, where the whole ballroom shows through the glass' },
      ],
      homeLocationId: 'crane_counting_house',
      knowledgeScope: ['crane', 'the_loan', 'the_steward', 'house_mereval_debts', 'rosalind'],
      startingRelationship: { trust: 10, affection: 0, respect: 40, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'crane_names_his_price',
          label: 'He tells you what he actually wants',
          kind: 'OTHER',
          requires: { respect: 45 },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 14, resolve: 14, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_ill_take_her',
      title: 'I’ll Take Her',
      summary: 'The crown prince has just annulled your engagement in front of the court, and the grand duke is holding out his hand. Everyone is waiting for your answer.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['kassian', 'edmund', 'rosalind', 'osric'],
      involvedLocationIds: ['glass_ballroom', 'moon_terrace', 'carriage_court'],
      knownRewardCopy: 'A way out of the ballroom, and the first thing the court will say about you tomorrow.',
      steps: [
        {
          id: 'answer_him',
          playerCopy: 'Answer the grand duke before the ball ends.',
          directorNotes:
            'Every route is a real way out of this room and none of them is wrong. If the player says yes, Kassian leads them out without gloating. If they refuse, he bows, says one dry sentence, and leaves: he does not ask twice. If they make a scene, the court gets the show it came for and the guards are called. If they name terms, he listens, which nobody at court has ever done. Edmund reacts to whatever happens as a public insult; Rosalind watches the player, not the duke.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_his_hand',
              label: 'Take his hand in front of everyone',
              predicate: { flagsSet: ['used:dance'] },
              setsFlags: ['accepted_his_hand'],
              closesFlags: ['refused_him'],
            },
            {
              routeId: 'named_terms',
              label: 'Say yes, on conditions',
              predicate: { flagsSet: ['used:name_your_terms'] },
              setsFlags: ['accepted_his_hand', 'on_your_terms'],
              closesFlags: ['refused_him'],
            },
            {
              routeId: 'refused_him',
              label: 'Say no, out loud',
              predicate: { flagsSet: ['used:say_no'] },
              setsFlags: ['refused_him'],
              closesFlags: ['accepted_his_hand'],
            },
            {
              routeId: 'made_a_scene',
              label: 'Give the court the scene it came for',
              predicate: { flagsSet: ['used:make_a_scene'] },
              setsFlags: ['made_a_scene_at_the_ball'],
              closesFlags: [],
            },
            {
              routeId: 'walked_out_alone',
              label: 'Leave alone, by the side door',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['left_alone'],
              closesFlags: ['accepted_his_hand'],
            },
            {
              routeId: 'kept_your_head_up',
              label: 'Give them nothing at all',
              predicate: { flagsSet: ['used:hold_your_ground'] },
              setsFlags: ['held_your_head_up'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['the_ball_is_over'], abilities: [], reputation: [] },
        },
        {
          id: 'the_morning_after',
          playerCopy: 'Get through the morning after.',
          directorNotes:
            'The broadsheet, the father, the servants, the duke’s house. Whatever the player did at the ball is now a story the city is telling, larger. Let the player choose who they face first, and let each of them have already heard a slightly different version.',
          enterWhen: { flagsSet: ['the_ball_is_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'faced_your_father',
              label: 'Face your father in his study',
              predicate: { flagsSet: ['spoke:osric'] },
              setsFlags: ['father_confronted'],
              closesFlags: [],
            },
            {
              routeId: 'called_on_the_duke',
              label: 'Call on the duke at his house',
              predicate: { atLocation: 'vahl_residence' },
              setsFlags: ['called_on_the_duke'],
              closesFlags: [],
            },
            {
              routeId: 'faced_the_city',
              label: 'Walk through the city with your head up',
              predicate: { flagsSet: ['the_city_knows', 'used:hold_your_ground'] },
              setsFlags: ['faced_the_city'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_ground',
              label: 'Disappear until it blows over',
              predicate: { flagsSet: ['the_city_knows', 'used:slip_away'] },
              setsFlags: ['went_to_ground'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['first_night_over'], abilities: [], reputation: [{ factionId: 'faction_servants', amount: 5 }] },
        },
      ],
    },
    {
      id: 'q_nine_days',
      title: 'Nine Days',
      summary: 'The grand duke did not choose you on a whim. Something happens to him in nine days, and he needs to be married before it does.',
      kind: 'MAIN',
      involvedCharacterIds: ['kassian', 'signe', 'crane'],
      involvedLocationIds: ['vahl_residence', 'the_chancery', 'vahlhold'],
      knownRewardCopy: 'The truth about his deadline, and a contract you either sign or do not.',
      discoverWhen: { flagsSet: ['the_ball_is_over'] },
      steps: [
        {
          id: 'learn_why',
          playerCopy: 'Find out what happens to him in nine days.',
          directorNotes:
            'The Writ of Marches: a march lord unmarried at thirty gets a Crown steward over his lands. Kassian will tell the player if asked plainly; Signe will tell them if she has decided they are worth it; the Chancery clerks will read them the clause for a fee. None of these routes tells the player about the grain. That is a separate question and a separate quest.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_him',
              label: 'Ask him straight',
              predicate: { flagsSet: ['spoke:kassian', 'used:say_it_plainly'] },
              setsFlags: ['knows:the_writ'],
              closesFlags: [],
            },
            {
              routeId: 'signe_told_you',
              label: 'Get it out of his captain',
              predicate: { minRelationship: [{ characterId: 'signe', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:the_writ', 'signe_talked'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_writ',
              label: 'Read the law yourself at the Chancery',
              predicate: { flagsSet: ['visited:the_chancery'] },
              setsFlags: ['knows:the_writ', 'read_the_writ_yourself'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['knows:the_deadline'], abilities: [], reputation: [] },
        },
        {
          id: 'the_contract',
          playerCopy: 'Decide what kind of marriage this is, if it is one at all.',
          directorNotes:
            'His contract is on the desk at his house: one year, separate rooms, her own income, either may leave after. A blank space for her terms. This is a negotiation between two clever people, not a test with a right answer. A player who refused him at the ball can still come to him: he will not ask twice, but he will listen. A refusal here is final and he takes it well, which is worse.',
          enterWhen: { flagsSet: ['knows:the_deadline'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_on_your_terms',
              label: 'Sign, with your own terms written in',
              predicate: { flagsSet: ['used:name_your_terms', 'accepted_his_hand'] },
              setsFlags: ['contract_signed', 'going_north'],
              closesFlags: ['refused_for_good'],
            },
            {
              routeId: 'took_the_contract_as_written',
              label: 'Take his contract exactly as he wrote it',
              predicate: { flagsSet: ['accepted_his_hand'], hasItems: ['marriage_contract'] },
              setsFlags: ['contract_signed', 'going_north'],
              closesFlags: ['refused_for_good'],
            },
            {
              routeId: 'more_than_a_contract',
              label: 'Tell him it is more than a contract',
              predicate: {
                flagsSet: ['accepted_his_hand'],
                minRelationship: [{ characterId: 'kassian', dimension: 'affection', value: 60 }],
              },
              setsFlags: ['contract_signed', 'more_than_a_contract', 'going_north'],
              closesFlags: ['refused_for_good'],
            },
            {
              routeId: 'came_back_to_him',
              label: 'Go to his house and ask him yourself',
              predicate: { flagsSet: ['refused_him', 'used:say_it_plainly'], atLocation: 'vahl_residence' },
              setsFlags: ['accepted_his_hand', 'contract_signed', 'going_north'],
              closesFlags: ['refused_for_good'],
            },
            {
              routeId: 'refused_for_good',
              label: 'Refuse him, knowing what it costs him',
              predicate: { flagsSet: ['used:say_no', 'knows:the_deadline'] },
              setsFlags: ['refused_for_good'],
              closesFlags: ['contract_signed'],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['contract_decided'], abilities: [], reputation: [] },
        },
        {
          id: 'the_signing',
          playerCopy: 'Sign the register, in person, before noon on the ninth day.',
          directorNotes:
            'Both of them must sign in person. Crane will try to delay it, the clerks will be slow on purpose if he has paid them, and the player can still walk out at the door. If they sign, write it small and specific: the wax, the clerk, his glove coming off to hold the pen.',
          enterWhen: { flagsSet: ['contract_signed'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_at_the_chancery',
              label: 'Sign at the Chancery of Seals',
              predicate: { atLocation: 'the_chancery', flagsSet: ['contract_signed'], beforeWorldMinute: 9 * 1440 + 12 * 60 },
              setsFlags: ['married_the_duke'],
              closesFlags: [],
            },
            {
              routeId: 'wed_in_the_north',
              label: 'Ride north and marry at Vahlhold',
              predicate: { atLocation: 'vahlhold', flagsSet: ['contract_signed'], beforeWorldMinute: 9 * 1440 + 12 * 60 },
              setsFlags: ['married_the_duke', 'married_in_the_north'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [{ itemId: 'duchess_seal', qty: 1 }],
            flags: ['wears_the_seal'],
            abilities: ['use_the_seal'],
            reputation: [
              { factionId: 'faction_north', amount: 15 },
              { factionId: 'faction_court', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_villainess',
      title: 'The Villainess',
      summary: 'The whole court knows what you did to Lady Rosalind. Some of it is even true. The rest she arranged.',
      kind: 'MAIN',
      involvedCharacterIds: ['rosalind', 'bette', 'edmund'],
      involvedLocationIds: ['retiring_room', 'audience_hall', 'crane_counting_house', 'lantern_quarter'],
      knownRewardCopy: 'The truth about the garden party, and the choice of what to do with it.',
      discoverWhen: { flagsSet: ['the_ball_is_over'] },
      steps: [
        {
          id: 'what_really_happened',
          playerCopy: 'Prove what really happened at the garden party.',
          directorNotes:
            'Rosalind cut her own gown. Getting her to say so alone is the version where she might become an ally; cornering her in public makes her an enemy for life; finding the scissors is proof without a confession. Bette has her own piece of this: her report put Rosalind on the winter stair. Do not let anybody confess in front of witnesses.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rosalind_confessed',
              label: 'Get Rosalind to admit it, alone',
              predicate: {
                flagsSet: ['spoke:rosalind'],
                minRelationship: [{ characterId: 'rosalind', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:the_cut_gown', 'rosalind_confessed'],
              closesFlags: ['rosalind_cornered'],
            },
            {
              routeId: 'found_the_scissors',
              label: 'Find the scissors that cut the lace',
              predicate: { hasItems: ['silver_scissors'] },
              setsFlags: ['knows:the_cut_gown', 'has_the_scissors'],
              closesFlags: [],
            },
            {
              routeId: 'cornered_her',
              label: 'Corner her with it in public',
              predicate: { flagsSet: ['spoke:rosalind', 'used:cut_them_dead'] },
              setsFlags: ['knows:the_cut_gown', 'rosalind_cornered'],
              closesFlags: ['rosalind_confessed'],
            },
            {
              routeId: 'bette_confessed',
              label: 'Hear what your maid has been carrying',
              predicate: { minRelationship: [{ characterId: 'bette', dimension: 'trust', value: 75 }] },
              setsFlags: ['knows:the_cut_gown', 'knows:bette_reported'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:what_really_happened'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what to do with the truth.',
          directorNotes:
            'Clearing the player’s name ruins Rosalind, and the player should see that before they do it. Keeping her secret buys a frightened, clever ally. Owning the name is a legitimate route: the player decides the villainess is a better reputation to have than the victim. None of these is the good one.',
          enterWhen: { flagsSet: ['knows:what_really_happened'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cleared_at_the_hearing',
              label: 'Say it at the King’s hearing',
              predicate: { flagsSet: ['knows:what_really_happened', 'the_hearing_happened'], atLocation: 'audience_hall' },
              setsFlags: ['name_cleared'],
              closesFlags: ['kept_her_secret'],
            },
            {
              routeId: 'printed_it',
              label: 'Give it to the broadsheet',
              predicate: { flagsSet: ['knows:what_really_happened'], atLocation: 'lantern_quarter' },
              setsFlags: ['name_cleared', 'rosalind_ruined'],
              closesFlags: ['kept_her_secret'],
            },
            {
              routeId: 'kept_her_secret',
              label: 'Keep her secret, for a price',
              predicate: { flagsSet: ['knows:what_really_happened', 'used:name_your_terms'] },
              setsFlags: ['kept_her_secret', 'rosalind_owes_you'],
              closesFlags: ['name_cleared'],
            },
            {
              routeId: 'wore_the_name',
              label: 'Let them call you the villainess, and wear it',
              predicate: { flagsSet: ['knows:what_really_happened', 'used:make_a_scene'] },
              setsFlags: ['owned_the_name'],
              closesFlags: ['name_cleared'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['villainess_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_court', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_your_fathers_house',
      title: 'Your Father’s House',
      summary: 'Your father has been very calm about all this. Calm enough that you wonder how long he has known.',
      kind: 'SIDE',
      involvedCharacterIds: ['osric', 'bette'],
      involvedLocationIds: ['mereval_townhouse', 'carriage_court'],
      knownRewardCopy: 'What your father knew, and what kind of house you go home to.',
      discoverWhen: { flagsSet: ['the_ball_is_over'] },
      steps: [
        {
          id: 'what_he_knew',
          playerCopy: 'Find out what your father knew, and when.',
          directorNotes:
            'He knew three days before. The letter is in his desk. He will admit it to a direct question in private, and he will not apologise, because he cannot see what else he could have done. Do not make him a villain: he is a frightened man protecting a house the only way he knows.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_admitted_it',
              label: 'Ask him straight, in private',
              predicate: { flagsSet: ['spoke:osric', 'used:say_it_plainly'] },
              setsFlags: ['knows:father_knew', 'father_confronted'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_letter',
              label: 'Find Edmund’s letter in his desk',
              predicate: { hasItems: ['edmund_letter'] },
              setsFlags: ['knows:father_knew', 'found_edmund_letter'],
              closesFlags: [],
            },
            {
              routeId: 'bette_told_you',
              label: 'Hear it from below stairs',
              predicate: { flagsSet: ['spoke:bette'], minRelationship: [{ characterId: 'bette', dimension: 'trust', value: 70 }] },
              setsFlags: ['knows:father_knew'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['father_question_open'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_do_about_him',
          playerCopy: 'Decide what your father is to you now.',
          directorNotes:
            'Forgiving him, bargaining with him and walking out are all real. If the player stays and he comes round, he becomes formidable on their side at the hearing. If they leave his house, the southern estate stops being a threat and the player has nowhere to sleep that is theirs.',
          enterWhen: { flagsSet: ['knows:father_knew'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'forgave_him',
              label: 'Forgive him',
              predicate: {
                flagsSet: ['knows:father_knew'],
                minRelationship: [{ characterId: 'osric', dimension: 'affection', value: 45 }],
              },
              setsFlags: ['father_on_your_side'],
              closesFlags: ['left_your_fathers_house'],
            },
            {
              routeId: 'struck_a_bargain',
              label: 'Make him pay for it, in support',
              predicate: { flagsSet: ['knows:father_knew', 'used:name_your_terms'] },
              setsFlags: ['father_on_your_side', 'father_bargained'],
              closesFlags: ['left_your_fathers_house'],
            },
            {
              routeId: 'walked_out',
              label: 'Leave his house',
              predicate: { flagsSet: ['knows:father_knew', 'used:say_no'] },
              setsFlags: ['left_your_fathers_house'],
              closesFlags: ['father_on_your_side'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['father_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_mereval', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_silver_on_paper',
      title: 'Silver on Paper',
      summary: 'Count Crane did not look surprised at the ball. A man like that has already priced you, and sooner or later he will name the figure.',
      kind: 'LEAD',
      involvedCharacterIds: ['crane', 'edmund', 'rosalind', 'kassian'],
      involvedLocationIds: ['crane_counting_house', 'audience_hall', 'lantern_quarter'],
      knownRewardCopy: 'Who profits if the North gets a steward, and proof of it.',
      discoverWhen: { flagsSet: ['crane_made_an_offer'] },
      steps: [
        {
          id: 'find_the_loan',
          playerCopy: 'Find out what Crane is really buying.',
          directorNotes:
            'The loan: Edmund borrowed against the North’s silver, payable only if a steward takes the March. Several people know a piece of it. Rosalind copied the figures, Edmund signed it, the player’s father has seen the Crane notes, and Crane himself may overplay his hand to a player watching closely.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rosalind_told_you',
              label: 'Rosalind tells you what she copied',
              predicate: { flagsSet: ['rosalind_confessed'] },
              setsFlags: ['knows:the_silver_loan'],
              closesFlags: [],
            },
            {
              routeId: 'edmund_let_it_slip',
              label: 'Edmund lets it slip',
              predicate: { flagsSet: ['spoke:edmund'], minRelationship: [{ characterId: 'edmund', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:the_silver_loan'],
              closesFlags: [],
            },
            {
              routeId: 'read_your_fathers_papers',
              label: 'Read the letter in your father’s desk',
              predicate: { hasItems: ['edmund_letter'] },
              setsFlags: ['knows:the_silver_loan'],
              closesFlags: [],
            },
            {
              routeId: 'crane_overplayed',
              label: 'Watch Crane until he says too much',
              predicate: { flagsSet: ['spoke:crane', 'used:read_the_room'] },
              setsFlags: ['knows:the_silver_loan'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:the_silver_loan'], abilities: ['trace_the_money'], reputation: [] },
        },
        {
          id: 'prove_it',
          playerCopy: 'Get proof a court would have to read.',
          directorNotes:
            'The ledger is in the vault room of the Counting House. Taking it is theft from the most powerful lender in the kingdom. Tracing it through the public books is slower and legal. Rosalind can bring it, if she owes the player enough.',
          enterWhen: { flagsSet: ['knows:the_silver_loan'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'traced_it',
              label: 'Trace it through the Counting House books',
              predicate: { flagsSet: ['used:trace_the_money'], atLocation: 'crane_counting_house' },
              setsFlags: ['has_proof'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_ledger',
              label: 'Take his private ledger',
              predicate: { hasItems: ['crane_ledger'] },
              setsFlags: ['has_proof', 'stole_the_ledger'],
              closesFlags: [],
            },
            {
              routeId: 'rosalind_brought_it',
              label: 'Rosalind brings it to you',
              predicate: { flagsSet: ['rosalind_owes_you'] },
              setsFlags: ['has_proof', 'rosalind_turned'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 130, items: [], flags: ['loan_proven'], abilities: [], reputation: [] },
        },
        {
          id: 'use_it',
          playerCopy: 'Decide what the proof is for.',
          directorNotes:
            'Exposing it stops the steward and humbles Edmund in front of his father. Selling it back to Crane makes the player rich and Crane their enemy for life. Giving it to Kassian lets the North fight its own battle. Each one changes who owes the player what.',
          enterWhen: { flagsSet: ['loan_proven'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'exposed_at_the_hearing',
              label: 'Lay it before the King',
              predicate: { flagsSet: ['loan_proven'], atLocation: 'audience_hall' },
              setsFlags: ['the_loan_exposed'],
              closesFlags: ['bargained_with_crane'],
            },
            {
              routeId: 'gave_it_to_the_broadsheet',
              label: 'Give it to the broadsheet',
              predicate: { flagsSet: ['loan_proven'], atLocation: 'lantern_quarter' },
              setsFlags: ['the_loan_exposed', 'printed_the_loan'],
              closesFlags: ['bargained_with_crane'],
            },
            {
              routeId: 'gave_it_to_kassian',
              label: 'Put it in the duke’s hands',
              predicate: {
                flagsSet: ['loan_proven', 'spoke:kassian'],
                minRelationship: [{ characterId: 'kassian', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['the_loan_exposed', 'kassian_used_it'],
              closesFlags: ['bargained_with_crane'],
            },
            {
              routeId: 'sold_it_back',
              label: 'Sell it back to Crane',
              predicate: { flagsSet: ['loan_proven', 'used:take_the_deal'] },
              setsFlags: ['bargained_with_crane'],
              closesFlags: ['the_loan_exposed'],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['silver_settled'],
            abilities: [],
            reputation: [
              { factionId: 'faction_north', amount: 15 },
              { factionId: 'faction_court', amount: 10 },
              { factionId: 'faction_crane', amount: -30 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_forty_wagons',
      title: 'Forty Wagons',
      summary: 'He has spoken to you twice in your life, and he walked past every unmarried lady in the kingdom to reach you. He has a reason he has not said.',
      kind: 'LEAD',
      involvedCharacterIds: ['kassian', 'signe'],
      involvedLocationIds: ['vahl_residence', 'vahlhold', 'mereval_townhouse'],
      knownRewardCopy: 'The real reason he said "I’ll take her."',
      discoverWhen: { flagsSet: ['knows:the_deadline'] },
      steps: [
        {
          id: 'why_you',
          playerCopy: 'Find out why he chose you.',
          directorNotes:
            'The grain. This must never be forced on a player who does not ask: it is a gift the story gives to somebody who is curious about him. When it comes out, keep it small and practical. He does not make a speech about it. He says what the winter was like and who did not die.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'He tells you himself',
              predicate: {
                flagsSet: ['spoke:kassian'],
                minRelationship: [{ characterId: 'kassian', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:the_grain'],
              closesFlags: [],
            },
            {
              routeId: 'signe_let_it_slip',
              label: 'His captain lets it slip',
              predicate: { minRelationship: [{ characterId: 'signe', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:the_grain', 'signe_told_the_grain'],
              closesFlags: [],
            },
            {
              routeId: 'you_said_it_first',
              label: 'Show him the receipt before he can say it',
              predicate: { hasItems: ['grain_receipt'], flagsSet: ['spoke:kassian'] },
              setsFlags: ['knows:the_grain', 'you_said_it_first'],
              closesFlags: [],
            },
            {
              routeId: 'the_north_letter',
              label: 'Read the letter the garrison captains sent you',
              predicate: { flagsSet: ['north_letter_arrived'] },
              setsFlags: ['knows:the_grain'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['the_grain_said_aloud'],
            abilities: [],
            reputation: [{ factionId: 'faction_north', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_too_late',
      title: 'Too Late, Your Highness',
      summary: 'If your name is ever cleared, Edmund will work out what he threw away, and come back to ask whether it is too late.',
      kind: 'SIDE',
      involvedCharacterIds: ['edmund'],
      involvedLocationIds: ['glass_ballroom', 'palace_gardens'],
      knownRewardCopy: 'The last word with the man who annulled you.',
      discoverWhen: { flagsSet: ['edmund_asked_back'] },
      steps: [
        {
          id: 'answer_edmund',
          playerCopy: 'Answer the prince.',
          directorNotes:
            'He is genuinely sorry and genuinely too late, unless the player decides otherwise. Taking him back is allowed and must be written honestly as a choice about power and the crown. Refusing him should be calm. Laughing at him is the villainess’s privilege, and the court will remember it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_him_back',
              label: 'Take him back',
              predicate: {
                flagsSet: ['spoke:edmund'],
                minRelationship: [{ characterId: 'edmund', dimension: 'affection', value: 50 }],
              },
              setsFlags: ['took_edmund_back'],
              closesFlags: ['refused_edmund'],
            },
            {
              routeId: 'refused_edmund',
              label: 'Tell him no',
              predicate: { flagsSet: ['used:say_no', 'edmund_asked_back'] },
              setsFlags: ['refused_edmund'],
              closesFlags: ['took_edmund_back'],
            },
            {
              routeId: 'laughed_at_him',
              label: 'Laugh, in front of everyone',
              predicate: { flagsSet: ['used:cut_them_dead', 'edmund_asked_back'] },
              setsFlags: ['refused_edmund', 'laughed_at_edmund'],
              closesFlags: ['took_edmund_back'],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['edmund_answered'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_midnight',
      atWorldMinute: 1440,
      locationId: 'glass_ballroom',
      publicCopy:
        'Midnight. The orchestra stops mid-waltz, footmen start calling carriages, and your father’s voice carries across the floor: your name, once.',
      directorNotes:
        'The ball is over whatever the player has done. Osric wants them in the Mereval carriage now. Kassian’s black carriage is waiting at the far end of the court, and Signe is standing beside it with the door already open.',
      setsFlags: ['midnight_struck'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'osric', toLocationId: 'carriage_court' }],
    },
    {
      id: 'we_the_broadsheet',
      atWorldMinute: 1440 + 7 * 60,
      locationId: 'lantern_quarter',
      publicCopy:
        'The Halcourt Lantern’s morning sheet is on every breakfast table in the capital: THE VILLAINESS AND THE BUTCHER, with a drawing that flatters neither of you.',
      directorNotes:
        'The city now knows a version of last night that is about thirty percent accurate and entirely confident. Whatever the player did at the ball is in it, larger. People in the street have opinions and some of them are kind.',
      setsFlags: ['the_city_knows'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_father_sends_you_south',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'mereval_townhouse',
      publicCopy: 'Trunks are being carried down the townhouse stairs. They are your trunks.',
      directorNotes:
        'Osric has arranged for the player to leave for the southern estate at dawn tomorrow, until the talk dies down. He presents it as already decided. It can be stopped: by accepting the duke, by bringing him round, or by walking out of his house.',
      setsFlags: ['father_made_his_move'],
      cancelledByFlags: ['accepted_his_hand', 'father_on_your_side', 'left_your_fathers_house'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'osric', toLocationId: 'mereval_townhouse' }],
    },
    {
      id: 'we_rosalind_calls',
      atWorldMinute: 1440 + 15 * 60,
      locationId: 'mereval_townhouse',
      publicCopy:
        'Lady Rosalind Crane is in your front parlour, alone, without her uncle, holding a box of sugared violets like a shield.',
      directorNotes:
        'She came to find out what the player is going to say at the hearing. She will perform sweetness for the first minute and drop it the moment the door is shut, if the player lets her. This is the best chance to make her an ally and the easiest chance to make her an enemy.',
      setsFlags: ['rosalind_called'],
      cancelledByFlags: ['rosalind_cornered', 'name_cleared'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'rosalind', toLocationId: 'mereval_townhouse' }],
    },
    {
      id: 'we_crane_sends_terms',
      atWorldMinute: 2 * 1440 + 11 * 60,
      locationId: null,
      publicCopy:
        'A letter on cream paper arrives from the Crane Counting House: your father’s debts, bought last month, itemised, and a courteous offer to forgive every one of them.',
      directorNotes:
        'The condition, stated in the second paragraph as if it were a detail: refuse the grand duke. Crane signs it "your friend". The offer is real and he would honour it, which is what makes it dangerous.',
      setsFlags: ['crane_made_an_offer'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_hearing',
      atWorldMinute: 3 * 1440 + 10 * 60,
      locationId: 'audience_hall',
      publicCopy:
        'The King’s hearing on the annulment opens in the Audience Hall, and every seat in the gallery has been sold twice.',
      directorNotes:
        'The King is old, tired and fond of nobody. He will ratify the annulment unless somebody gives him a reason not to, and he will hear any objection exactly once. Edmund will speak well. Crane will not speak at all. This is where proof, if the player has any, can be laid down in front of everyone.',
      setsFlags: ['the_hearing_happened'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'edmund', toLocationId: 'audience_hall' },
        { characterId: 'kassian', toLocationId: 'audience_hall' },
        { characterId: 'osric', toLocationId: 'audience_hall' },
        { characterId: 'crane', toLocationId: 'audience_hall' },
        { characterId: 'rosalind', toLocationId: 'audience_hall' },
      ],
    },
    {
      id: 'we_edmund_reconsiders',
      atWorldMinute: 4 * 1440 + 22 * 60,
      locationId: 'glass_ballroom',
      publicCopy:
        'Prince Edmund asks the orchestra for the first waltz of your old engagement, and walks across the ballroom toward you.',
      directorNotes:
        'Only once the player’s name is cleared. He has realised what he threw away and, worse, that the court has realised it too. He is sincere. He is also still the man who chose four hundred witnesses.',
      setsFlags: ['edmund_asked_back'],
      cancelledByFlags: ['took_edmund_back', 'refused_edmund'],
      requiresFlags: ['name_cleared'],
      movesCharacters: [{ characterId: 'edmund', toLocationId: 'glass_ballroom' }],
    },
    {
      id: 'we_the_north_writes',
      atWorldMinute: 5 * 1440 + 9 * 60,
      locationId: 'vahl_residence',
      publicCopy:
        'A rider from the North arrives at the duke’s house with a letter signed by eleven garrison captains and addressed to you.',
      directorNotes:
        'Only after the player has accepted his hand. The captains have heard who their duke chose, and one of them remembers a receipt. The letter thanks the player for something they have never told anyone they did.',
      setsFlags: ['north_letter_arrived'],
      cancelledByFlags: [],
      requiresFlags: ['accepted_his_hand'],
      movesCharacters: [],
    },
    {
      id: 'we_the_steward_named',
      atWorldMinute: 9 * 1440 + 12 * 60,
      locationId: 'audience_hall',
      publicCopy:
        'Noon on the grand duke’s thirtieth birthday. A royal herald reads out the name of the Crown steward for the Northern March.',
      directorNotes:
        'If the duke is unmarried and the loan is still secret, the steward is Crane’s cousin and the North is lost on paper. This is the ordinary way the nine days end when nobody stops them.',
      setsFlags: ['steward_named'],
      cancelledByFlags: ['married_the_duke', 'the_loan_exposed', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_your_answer',
      kind: 'FINALE',
      label: 'Whether you leave this Season married, free or feared',
      seedHint: 'A gloved hand held out in front of four hundred guests, waiting.',
      payoffHint: 'The player says what they are to the duke, to the court and to their father, and all three have to live with it.',
      weight: 1,
    },
    {
      id: 'p_why_you',
      kind: 'RELATIONSHIP',
      label: 'Why a man who has spoken to you twice said "I’ll take her"',
      seedHint: 'His initials on the last waltz of your dance card, written hours before the annulment.',
      payoffHint: 'Forty wagons of grain in the Long Freeze, three winters ago, and a captain who traced them.',
      weight: 0.9,
    },
    {
      id: 'p_the_villainess',
      kind: 'THEME',
      label: 'Which parts of the villainess are true',
      seedHint: 'Rosalind flinches when anybody mentions the spring garden party, then apologises for flinching.',
      payoffHint: 'Silver embroidery scissors, eleven stitches of lace and two minutes behind a hedge.',
      weight: 0.8,
    },
    {
      id: 'p_silver_on_paper',
      kind: 'MYSTERY',
      label: 'Who profits if the North gets a Crown steward',
      seedHint: 'Count Crane watches the annulment through the terrace glass and does not look surprised.',
      payoffHint: 'A loan signed by the crown prince, secured on the North’s silver, that only pays if the grand duke is unmarried at thirty.',
      weight: 0.7,
    },
    {
      id: 'p_your_father',
      kind: 'RELATIONSHIP',
      label: 'What your father knew, and when',
      seedHint: 'In the carriage he says "this week", and stops.',
      payoffHint: 'A letter from Edmund in his study desk, dated three days before the ball.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_tongue',
      name: 'The Sharpest Tongue',
      role: 'Talk as a weapon',
      summary: 'You win rooms with words: public cuts, holding a room’s eye, and a court that dreads your opinion. Your dance card is still on your wrist, and someone has written K.V. against the last waltz.',
      playstyle: ['Cutting', 'Public', 'Proud'],
      blurb: 'Four years at the prince’s side, and you have never once lost an argument at supper. You have lost a great many friends.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { tongue: 3, poise: 2 },
      startingItems: [{ itemId: 'dance_card', qty: 1 }],
      startingAbilities: ['say_no', 'cut_them_dead', 'hold_your_ground'],
      startingReputation: [{ factionId: 'faction_court', amount: 10 }],
    },
    {
      id: 'arch_ledgers',
      name: 'The Estate Keeper',
      role: 'Technical: money and contracts',
      summary: 'You quietly ran your mother’s southern estates for three years, so you read accounts, loans and contracts better than most ministers. The receipt from that very bad winter is still in your writing box.',
      playstyle: ['Careful', 'Numbers', 'Patient'],
      blurb: 'The court thought you spent your summers sulking in the south. You spent them balancing books, and once, in a very bad winter, unbalancing them on purpose.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { ledgers: 3, protocol: 2 },
      startingItems: [{ itemId: 'grain_receipt', qty: 1 }],
      startingAbilities: ['say_no', 'name_your_terms'],
      startingReputation: [{ factionId: 'faction_mereval', amount: 10 }],
    },
    {
      id: 'arch_saddle',
      name: 'The Rider',
      role: 'Riding, speed and nerve',
      summary: 'You spent every summer at the family stud farm and ride better than most cavalry, which the North respects and the court never noticed.',
      playstyle: ['Bold', 'Physical', 'Restless'],
      blurb: 'You once outrode the prince’s own guard for a bet, which is a large part of why the court calls you wild.',
      attributeBonus: { might: 2, agility: 2 },
      skillProficiencies: { riding: 3, nerve: 2 },
      startingItems: [],
      startingAbilities: ['say_no', 'ride_hard', 'say_it_plainly'],
      startingReputation: [{ factionId: 'faction_north', amount: 10 }],
    },
    {
      id: 'arch_watcher',
      name: 'The Quiet Observer',
      role: 'Stealth and reading people',
      summary: 'Four years beside the prince taught you to watch who is watching whom. You notice lies and glances, and servants tell you things.',
      playstyle: ['Watchful', 'Discreet', 'Slow to act'],
      blurb: 'Everyone at court performs. You learned early that the servants are the only audience who sees the rehearsal.',
      attributeBonus: { mind: 2, agility: 2 },
      skillProficiencies: { insight: 3, discretion: 2 },
      startingItems: [],
      startingAbilities: ['say_no', 'read_the_room', 'slip_away'],
      startingReputation: [{ factionId: 'faction_servants', amount: 15 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the court call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Celestine Mereval' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did four years beside the prince make you good at?',
      helpText:
        'What four years engaged to the crown prince taught you, which sets what you are good at. It is fixed and stays for the whole story. It does not decide whether you take the duke’s hand, clear your name, or burn the court down with one sentence. All of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the court get wrong about you?',
      helpText: 'The rumour that follows you into every room. Most people write one plain sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. They say I made a countess cry at her own wedding. She was crying before I arrived.',
    },
    {
      id: 'how_you_take_it',
      label: 'How do you take being humiliated in public?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite in the ballroom and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'never_cry', label: 'You never cry where they can see' },
        { id: 'cut_back', label: 'You cut back, harder, at once' },
        { id: 'laugh', label: 'You laugh, which frightens them more' },
        { id: 'plan', label: 'You smile, and start planning' },
        { id: 'leave', label: 'You leave before they finish' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do four hundred guests see?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Black hair pinned too tight, a gown the colour of a bruise, and a smile nobody trusts.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of these are losses reachable without a mistake: Sent South (let
   * your father decide), The Steward Rides North (let nine days pass), and
   * Gone Before Breakfast (walk out early). None of them is written as a
   * punishment. Two of the marriage endings need the optional grain thread or
   * a real romance, and every other destination is reachable by a player who
   * never once wondered why he chose them.
   */
  endings: [
    {
      id: 'end_claimed',
      name: 'Claimed',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['married_the_duke'],
        flagsUnset: ['more_than_a_contract', 'steward_named'],
      },
      condition:
        'The player married the grand duke on a contract and the contract held. The North kept its lands, the player got a name the court has to bow to, and neither of them has said the word love. Play it as two clever people being careful with each other: separate rooms, shared breakfasts, an argument about the cold that is really about something else. Do not rush it into a confession.',
      epilogue:
        'Vahlhold is colder than anybody warned and warmer than anybody said. The court sends letters addressed to the Duchess Vahl and gets back replies so polite they sting. Once a week the duke loses at cards to his wife and pretends he did it on purpose. He did not.',
      hint: '',
    },
    {
      id: 'end_not_a_contract',
      name: 'Not a Contract Anymore',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['married_the_duke', 'more_than_a_contract'],
        minRelationship: [
          { characterId: 'kassian', dimension: 'affection', value: 80 },
          { characterId: 'kassian', dimension: 'trust', value: 70 },
        ],
      },
      condition:
        'They married for nine days of law and found out somewhere along the way that it was not the reason any more. The scene is one of them saying so first, plainly, and the other answering in kind. Up to a kiss and no further; let the kiss end the scene.',
      epilogue:
        'The contract is in a drawer at Vahlhold with a year written on it, and neither of them has looked at it since the spring. He takes his gloves off at dinner now. The garrison captains notice, and Signe Brask threatens to transfer to the coast if she has to watch any more of it.',
      hint: 'He wrote a year on the contract. He did not write what happens after.',
    },
    {
      id: 'end_forty_wagons',
      name: 'Forty Wagons',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['married_the_duke', 'the_grain_said_aloud'],
        minRelationship: [{ characterId: 'kassian', dimension: 'affection', value: 85 }],
        minFactionReputation: [{ factionId: 'faction_north', value: 40 }],
      },
      condition:
        'The truth about the grain is out between them, the North knows who its duchess is, and the marriage is real. The scene is the arrival at Vahlhold: the garrisons lining the road for a southern lady they have been looking for since the Long Freeze. Let Kassian say almost nothing and let the soldiers say the rest.',
      epilogue:
        'Forty wagons, the captains say, every year on the same day, and every year the duchess tells them there must be some mistake. Greywatch names its new granary for the Duchess Vahl anyway. The duke pretends not to know who paid for the roof.',
      hint: 'Somebody in the North found you two winters ago, and has not said so.',
    },
    {
      id: 'end_villainess_of_the_north',
      name: 'The Villainess of the North',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['owned_the_name', 'married_the_duke'],
        minFactionReputation: [{ factionId: 'faction_north', value: 15 }],
      },
      condition:
        'The player never cleared their name. They wore it, married the most feared man in the kingdom, and became the most feared person at his side. Write it with relish: a court that cannot decide whether to hate or copy them, and a duke who thinks it is the best joke he has heard in years.',
      epilogue:
        'Ladies at court start carrying fans with steel ribs. Somebody writes a song about the ball and it is banned within a week, which makes it the most popular song in the capital. At Vahlhold the duke keeps the broadsheet drawing of the two of them framed in his study, and will not explain why.',
      hint: '',
    },
    {
      id: 'end_my_own_name',
      name: 'My Own Name',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['refused_for_good', 'name_cleared'] },
      condition:
        'The player said no to the duke, cleared their name in front of the court, and walked away from both men owing neither of them anything. This is a victory and should read as one. The duke bows and keeps his word about never asking twice. The player is free, and has to decide what free is for.',
      epilogue:
        'The broadsheet prints a retraction in very small type. Invitations come back, and the player answers three of them. A letter arrives from the North every few months with no proposal in it, only news of the weather, and it is always answered.',
      hint: '',
    },
    {
      id: 'end_silver_on_paper',
      name: 'Silver on Paper',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['the_loan_exposed'],
        flagsUnset: ['steward_named'],
        minFactionReputation: [{ factionId: 'faction_court', value: 10 }],
      },
      condition:
        'The player found the loan and made it public. Crane’s cousin never rides north, the crown prince answers to his father, and the court learns who actually owns it. The romance may or may not have happened; this ending is about the player being the most dangerous person at court and everyone knowing it.',
      epilogue:
        'The Crane Counting House closes its doors for three days and opens them under new management. Edmund is sent to inspect lighthouses on the coast for a year. Half the court owes the player a favour now, and the other half owes them money, which is better.',
      hint: 'Count Crane did not look surprised. Ask yourself why.',
    },
    {
      id: 'end_too_late',
      name: 'Too Late, Your Highness',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['refused_edmund'] },
      condition:
        'Edmund asked for the engagement back and the player said no. Do not make him a villain in defeat: he is genuinely sorry and genuinely too late. The satisfaction is in how calmly the player says it.',
      epilogue:
        'He marries a foreign princess two years later in a ceremony with no surprises. At the wedding feast somebody seats the player within sight of the high table by mistake. Edmund spends the whole meal not looking, and fails.',
      hint: '',
    },
    {
      id: 'end_reinstated',
      name: 'Reinstated',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['took_edmund_back'] },
      condition:
        'The player took the crown prince back, knowing exactly what he did. Write it honestly: it is a choice about power, the crown and a man who is better than his worst night, and it costs the player the duke and some of the court’s respect. Nobody in the scene pretends it is simple.',
      epilogue:
        'The second engagement is announced in a single line and nobody at court dares laugh. Edmund asks the player’s opinion before every council now, which his father finds hilarious. In the North, a duke reads the announcement once, folds it, and writes a letter of congratulation that is entirely sincere.',
      hint: '',
    },
    {
      id: 'end_sent_south',
      name: 'Sent South',
      rarity: 'COMMON',
      minTurn: 22,
      requires: {
        flagsSet: ['father_made_his_move'],
        flagsUnset: ['accepted_his_hand', 'left_your_fathers_house', 'father_on_your_side'],
      },
      condition:
        'The player’s father won. The trunks went down the stairs and the player went south to the family estate until the talk dies down. This is a loss reachable without a single mistake, simply by letting other people decide, and must not read as a punishment. Write the carriage, the long road, and what the player is already planning.',
      epilogue:
        'The southern estate has orchards, a stud farm and nobody to perform for. The court forgets the player in a month. The player does not forget the court, and the estate ledgers have never been better kept.',
      hint: '',
    },
    {
      id: 'end_the_steward',
      name: 'The Steward Rides North',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['steward_named'] },
      condition:
        'Noon on the ninth day came, the duke was unmarried and the loan was still a secret. A Crane man rides north with the Crown’s seal. This is the ordinary way the nine days end if nobody stops them, and it must be written as a real outcome: what the North loses, what Crane gains, and where the player is standing when the herald reads the name.',
      epilogue:
        'The silver goes south in Crane wagons. The duke stays in his own castle as a guest of his own steward and is unfailingly polite about it. Every winter after, somebody in the North asks whether anyone in the capital could have stopped it.',
      hint: 'Nine days is not very long.',
    },
    {
      id: 'end_two_villainesses',
      name: 'Two Villainesses',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['rosalind_owes_you', 'the_loan_exposed'] },
      condition:
        'The player kept Rosalind’s secret, and Rosalind helped bring down her uncle. The two people the court set against each other turned out to be the two cleverest people in the room. Write the alliance with wit and wariness: they are not friends yet, and both of them prefer it that way.',
      epilogue:
        'Rosalind never marries Lord Pellam, or Edmund, or anybody. She takes over a small counting house of her own with a loan nobody at court can trace, and every Season she and the player are seen together once, in public, being frighteningly polite to each other.',
      hint: '',
    },
    {
      id: 'end_gone_before_breakfast',
      name: 'Gone Before Breakfast',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['married_the_duke'] },
      condition:
        'The player walked out of the ball, the capital and the whole story, and explained it to nobody. Do not make it a tragedy and do not redeem it. Every person who wanted something from the player tonight is left holding it.',
      epilogue:
        'The broadsheet runs the story for a week and then has nothing to add. Edmund is ratified, Rosalind is engaged, and the duke waits nine days and is not surprised. Somewhere south, or east, or across the water, somebody with a very sharp tongue is starting over under a name none of them would know.',
      hint: '',
    },
  ],
  opening:
    '"We hereby annul our engagement," Prince Edmund tells you, pitched for the whole ballroom. "The realm deserves a kinder queen."\n\n' +
    'The woman on his arm lowers her eyes, perfect in white. Four hundred guests wait for you to scream. It’s what the villainess does.\n\n' +
    'From the back of the hall, a bored voice: "I’ll take her."\n\n' +
    'Every head turns. The crowd parts for a tall man in black with a scar through one eyebrow: Grand Duke Kassian Vahl. The court calls him the Butcher.\n\n' +
    'He stops in front of you and holds out a gloved hand.\n\n' +
    '"Marry me instead. Walk out of here on my arm with your head up, or stay and let them watch. Yes or no?"',
  openingPanel: {
    assetKey: 'story_annulled_then_claimed/opening',
    alt: 'Kassian, the Grand Duke, tall in black with a scar through one eyebrow, holds out a gloved hand to you across a glittering ballroom while the whole court turns to stare.',
  },
  openingSuggestions: [
    '"We’ve spoken twice in our lives, Your Grace. Why would I marry you?"',
    'I take his hand and walk out with him, without a glance back at Edmund.',
    'I pull off the prince’s ring, drop it into Edmund’s wine, and only then answer the duke.',
  ],
  coverDirection: [
    'SUBJECT: Grand Duke Kassian Vahl, alone and unmistakable in the foreground of a key visual for a romance fantasy anime about a broken royal engagement.',
    'He fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Very tall, short black hair cut like a soldier’s, grey eyes and one thin pale scar through the left eyebrow,',
    'in a high-collared coat of northern black wool with silver buttons and silver embroidery at the cuffs, a dark cloak over one shoulder, black leather gloves.',
    'One gloved hand is held out toward the viewer, palm up, an offer and a question at once; the other hand rests behind his back.',
    'His expression is calm, direct and very slightly amused, looking straight at the viewer.',
    'A few white rose petals drift through the air around his outstretched glove, and the crystal chandeliers behind him throw small points of sparkle.',
    'HIS FACE STAYS CLEAN: the thin eyebrow scar is the only mark on it; no petals, sparkles, glare or shadows across his face or skin.',
    'Every sparkle and petal stays on the glove, the chandeliers, the air and the title, never on his face.',
    'BEHIND HIM, soft and secondary: the mirrored Glass Ballroom of a summer palace, crystal chandeliers, tall mirrors full of candlelight,',
    'and a crowd in silk and jewels turned to stare at him, all in soft focus.',
    'LIGHT: warm gold candlelight from the chandeliers rims his hair and shoulders, and cool silver moonlight from the tall windows falls across the outstretched glove.',
    'TITLE: the words ANNULLED, THEN CLAIMED painted into the art in the upper third, above his head, as an elegant serif romance-fantasy logo, ivory with a thin gold edge,',
    'set on two centred lines, ANNULLED, on the first and THEN CLAIMED on the second, spelled exactly ANNULLED, THEN CLAIMED with the comma after ANNULLED,',
    'large and legible at thumbnail size. A single fine gold crack runs through the word ANNULLED only. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const ANNULLED_THEN_CLAIMED = StoryVersion.parse(raw);
