import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Struck From the Register" — a sword house expels its failed heir, and the
 * sister who will take his place is holding the knife.
 *
 * Slate #31. The structural bet is Good Morning, Husband's: the premise is not
 * backstory, it is turn one. The whole house is kneeling, the book is open to
 * the player's page, and every answer to Siwon's question is a real story —
 * leave quietly, claim the contest, refuse both, walk out, or take the book
 * and run. Each of those is an authored route, so nothing the player does in
 * the first beat is a failure to trigger something.
 *
 * The power fantasy is a gap rather than a level: the player's hands answer an
 * attack faster and truer than anybody in the house, and the house has never
 * once tested that, because every test it sets is a form done alone. Why the
 * gap exists is the mystery — a pact between two houses, a hundred and forty
 * years old, and an old servant who was struck for the same reason — and it is
 * discoverable rather than owed. A player who bows out on turn one and spends
 * the rest of the story building a life with no house still has a whole game.
 *
 * Production runs `runTurnPure`, which reads the premise, tone, hard canon, the
 * chosen archetype, the cast, location descriptions, quest titles and summaries,
 * world-event copy and ending conditions — not connections and not step notes.
 * So every location description says where it leads, and every quest summary
 * names its stakes in plain words. It never sees resources or the ability list
 * either, except the chosen archetype's starting abilities, so the system lives
 * where it can read it: the answering hand and the sundown clock in hard canon
 * (with a line on how the days keep score), on the sword and token the player
 * starts holding, and in Answer the Blade, which every archetype starts with.
 *
 * Three invisible variables. Stamina is the only GOOD_HIGH, because
 * `resolveRest` refills those and a night's sleep is the honest thing for that
 * to mean. Scandal is the first GOOD_LOW and the Magistrate's Watch is the first
 * faction, on purpose: PUBLIC_VIOLENCE takes the first of each, and a fight in
 * the street raising the city's talk and costing standing with the people who
 * enforce sword tokens is exactly right. Rift is the distance between the player
 * and Siwon, and it narrows with time.
 */

const raw = {
  id: 'sv_struck_from_the_register_1',
  storyId: 'story_struck_from_the_register',
  version: 1,
  title: 'Struck From the Register',
  fantasyLabel: 'Failed heir. Your sister holds the blade.',
  /**
   * The two clocks the opening already put the player on: Siwon is waiting
   * for an answer with the blade up, and a struck name's sword token is worth
   * nothing after the sundown bell, nine hours and forty minutes away.
   */
  openingObligations: [
    {
      what: 'Answer Siwon before she cuts: say you will leave quietly, or claim the right of contest and fight her in the yard.',
      withCharacterId: 'siwon',
      dueInMinutes: 10,
    },
    {
      what: 'If your name is cut, your sword token stops being valid at the sundown bell. Find a house, enter the open trial, or decide what you are without one before then.',
      withCharacterId: null,
      dueInMinutes: 580,
    },
  ],
  hook: 'The sword house is expelling its failed heir this morning, and the sister who will take your place is holding the blade that cuts your name out of the family register.',
  premise:
    'Your family has run a sword house for thirty-one generations, and every member of it is written in one book: the register, kept open on a stand in the ancestral hall.\n\n' +
    'You are the eldest grandchild, and the heir. You failed the house’s sword test three springs running, in front of everybody, and this morning the house is cutting your name out of the register.\n\n' +
    'The person holding the blade is your younger sister, Siwon. Whoever cuts a name takes that person’s place. She is the best sword of your generation, and she has not slept.\n\n' +
    'House law gives you one right: challenge whoever holds the blade, in the yard, before the cut. Win, and your name stays. Lose, or stay silent, and it goes.\n\n' +
    'A struck name costs more than a family. At the sundown bell the city’s sword licence goes with it, and without a house you may not carry a blade inside the walls.\n\n' +
    'Across the hall, the heir of the rival house is watching as the official witness. She has come every morning for a month, and she seems to know something about you that you do not.\n\n' +
    'What you do now is yours. Leave quietly, fight your sister, find another house, or find out why the people who love you are so sure this has to happen today.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Martial arts', 'Rivalry', 'Family', 'Drama', 'Underdog'],
  mechanicsChips: [
    'Your sister holds the blade',
    'Refusing is a route',
    'A clock that ends at sundown',
    'Your hands know more than you',
    'Two houses and a city want you',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can bow your head on turn one and spend the rest of the story building a life with no house at all, and that is the whole game. You can also claim the contest and find out what your hands do when somebody finally swings at you. Nobody in this house is a villain. Most of them are keeping the same secret for different reasons.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'register_hall',
    startWorldMinute: 9 * 60,
    startingItems: [
      { itemId: 'your_sword', qty: 1 },
      { itemId: 'sword_token', qty: 1 },
    ],
    hardCanon: [
      'The player is twenty-four, the eldest grandchild of House Seol in the river city of Haseong, and was the heir until this morning. Siwon is the player’s younger sister and calls them brother; the bond between them is family and nothing else.',
      'Everyone in this story is an adult. Siwon is twenty-two, Geum Yeon twenty-four, Seol Doha twenty-seven, Oh Minseo thirty-one, Han sixty-eight and Grandmaster Seol Jae seventy-four. Every sword house in Haseong takes disciples at eighteen or older, so the forty kneeling in House Seol’s hall and the disciples across the bridge are grown men and women.',
      'The player’s and Siwon’s parents died together when a barge went down on the river eleven years ago. Since then the Grandmaster has been the only head of family either of them has had.',
      'Every member of House Seol is written in the register, a folding book of mulberry paper on a stand in the register hall. The player failed the house’s lantern test (one first cut through a hanging lantern’s cord, so it drops upright and stays lit) three springs running, the last a month ago. Three failures and the name is struck.',
      'Whoever cuts a name from the register takes that person’s place. Before the cut, the struck person has the right of contest: a bout in the training yard against whoever holds the blade, to first clean touch or a yield. Win, and the name stays for a year and a day. Sword-house bouts are never fought to kill.',
      'When a house strikes a name it notifies the Roll Office. At the next sundown bell (18:40 today) the struck person’s brass sword token lapses, and the watch takes any blade carried inside the walls without one. A struck person loses the family name. Two ways back to a token: be written into another house’s register, or win the open trial (three bouts against licensed blades on the first morning of the Spring Bout) and become a free blade.',
      'The player has an answering hand. Alone, performing forms, their blade freezes. When somebody attacks them, it moves after the other blade commits and arrives first, faster and truer than anybody in House Seol. Nobody in the house has tested this, because every house test is a form done alone. When the player answers an attack, it works.',
      'A hundred and forty years ago a grandmaster of House Seol struck his own elder brother, who had the answering hand. The brother crossed the Long Bridge and founded House Geum, whose art is the second cut, the answering stroke. The two houses signed the Pact of the Bridge: no Seol may keep the answering hand in the house; any Seol who shows it is struck; House Geum sends a witness to every striking; House Seol pays a yearly bridge rent; and if the witness sees a Seol still in the register use the answering hand, House Geum may call a feud bout at the next Spring Bout for House Seol’s seat on the Sword Council.',
      'Han, the old servant who keeps the whetstones, still calls the player “young master”, a servant’s title for the house’s grown heir. He was born Seol Han. He is the Grandmaster’s younger brother, struck forty-seven years ago under the pact, and he chose to stay as a servant rather than cross the river. Almost nobody alive knows.',
      'At the start the player knows none of the hidden history: not the Pact of the Bridge, not why the house strikes an answering hand, not what the Grandmaster told Siwon, and not who Han was. Each is found in play, from a person, a page or a fight. None is owed, and a run can end without any of them.',
      'Three days ago the Grandmaster told Siwon the real reason for the striking and made her promise not to tell the player. She agreed to hold the blade because otherwise their cousin Doha would have.',
      'House Geum has not had a true answering hand in three generations and teaches the second cut from books. Its heir, Geum Yeon, has come to the Seol morning rite every day this month as witness.',
      'The Spring Bout is fought on the island bout ground on the third day, at three in the afternoon. The draw is posted at noon on the second day.',
      'How the days keep score, never shown as numbers: a fight in the street, real blood or a public scene becomes city talk, which brings the watch closer, raises prices and closes doors, and fades slowly when the player keeps quiet. Claiming the contest or refusing Siwon pushes her back into house formality; only time and plain words bring her close again. A tired player answers a half-beat late, and sleep, food or an hour at Han’s whetstone puts that right.',
    ],
    toneGuide:
      'Webtoon sword drama: fast, physical, clear. A fight is a decision made with the body and reads as one: distance, weight, who moved first, the sound steel makes when it is turned rather than met. ' +
      'Family pain lives under formality. People say the polite thing and mean the other thing, and the beat shows both. Humour is load-bearing: Doha’s spite, Yeon’s price-talk, Minseo’s clauses, Han’s grunts. ' +
      'Violence is quick and never graphic. House bouts end at first touch or a yield; a cut sleeve, a bruise, a sword in the sand. Real blood is a scandal and is written as one. Romance belongs to Yeon alone and runs on banter, tension and choice, never further than a kiss. ' +
      'When somebody attacks the player, the player’s hands answer before they decide: narrate that as a reflex the player can use or hold back, never as weakness. Forms performed alone are the thing that fails. ' +
      'Nobody here is a villain. The Grandmaster has a reason, Siwon has a promise, Doha has a grievance, and every one of them can be argued with. The face at the top of a beat is Siwon’s whenever she is in the scene. ' +
      'When the player strikes first, the cut comes out stiff and a half-beat late, the house forms failing as they always have; if the other blade then comes back at them, their hands answer and it works. Make that difference visible inside the beat, so the player learns to wait.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The man in the ring is bigger than you, and he knows it.\n\nHe swings first. They always swing first.\n\nYou don’t move until he does. Then you’re already inside his reach, your elbow under his arm, his own weight carrying him past you into the rope.\n\nThe crowd under the bridge makes a sound like a kettle.\n\n\"Again!\" somebody shouts. Coins change hands.\n\nYour heart is going hard. Your hands are perfectly still.",
      "Han doesn’t look up from the stone.\n\n\"Your edge is rolled,\" he says. \"Give it here.\"\n\nYou hand it over. He tests it with his thumbnail, makes a small unimpressed noise, and starts to work.\n\nScrape. Scrape. The lamp hisses.\n\n\"They’ll take this off you at sundown,\" he says, to the sword. \"Might as well go with a good edge.\"\n\nScrape.\n\n\"Sit still, young master. I’m not finished.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 13, mind: 12, presence: 11, resolve: 12, arcana: 9 },
  skills: [
    { id: 'counter', name: 'Answering', attribute: 'agility', description: 'Being where the other blade is going, after it has committed and before it arrives.' },
    { id: 'forms', name: 'House Forms', attribute: 'might', description: 'The first-cut forms, performed alone, exactly as the house wrote them. The thing you fail at.' },
    { id: 'swordlore', name: 'Swordlore', attribute: 'mind', description: 'Every house’s style, stance and tell, from the library and from watching.' },
    { id: 'bearing', name: 'Bearing', attribute: 'presence', description: 'Courtesy, ceremony and composure in a room where everybody is watching you.' },
    { id: 'plain_speech', name: 'Plain Speech', attribute: 'resolve', description: 'Saying the true thing to family, in public, while it still costs something.' },
    { id: 'streetwise', name: 'Streetwise', attribute: 'agility', description: 'The city under the houses: the rings, the ferry, the back lanes, and who to pay.' },
    { id: 'breath', name: 'Steadying Breath', attribute: 'arcana', description: 'The house’s breathing art for steadying a body after a blow. The one thing it taught you that took.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is GOOD_HIGH and the only one, so resting restores the body rather
   * than the sibling bond. Scandal comes first among the descending pair because
   * PUBLIC_VIOLENCE and the generic GOOD_LOW fallback both take the first in
   * array order, and a brawl on Sword Street should be what the city talks
   * about. Rift is how far apart the player and Siwon are; claiming the contest
   * and refusing her both widen it, and only time brings it back down.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 80,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The arms are lead and the answering hand is a half-beat late, which against a first cut is the whole bout. Words come out blunt. The player can still choose; they just cannot choose well for very long.',
      color: '#D9A441',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. The player’s guard drops between exchanges, they agree to things to end conversations, and a fight they should win becomes one they survive. Sleeping, eating or sitting still at the whetstone is the strongest move on the board.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of the worst day of a life. Good for one hard conversation or one bout, honest about not being good for both. Hands are still quick; patience is not.',
        },
        {
          upTo: 100,
          behaviour:
            'Whole. Enough left to answer three blades and still say the careful sentence afterwards. The player notices the shift of a heel before the strike, and the shift of a voice before the lie.',
        },
      ],
    },
    {
      id: 'scandal',
      name: 'Scandal',
      max: 100,
      start: 30,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The city has moved on. The struck heir of House Seol is a person who buys noodles, not a story, and nobody on Sword Street turns to look.',
      color: '#B5443B',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Quiet. People who know the name nod and move on. The watch has no particular interest, merchants serve the player like anybody else, and the houses are busy with the Spring Bout.',
        },
        {
          upTo: 50,
          behaviour:
            'The talk of Sword Street. Teahouse tables go quiet when the player passes and start again behind them. Doha hears every version and repeats the worst one. Nothing is closed yet; everything is a little more expensive.',
        },
        {
          upTo: 80,
          behaviour:
            'A public matter. The watch follows the player at a distance and checks the token twice. House Seol’s disciples are told not to speak to them. House Geum’s elders start asking Yeon what she saw. Doors that were open start needing a reason.',
        },
        {
          upTo: 100,
          behaviour:
            'The Sword Council is discussing it by name. The watch will take the player’s blade on any excuse, the bridge rings raise the price on their head, and the Grandmaster has to answer for it in public, which he will not forgive easily.',
        },
      ],
    },
    {
      id: 'rift',
      name: 'Rift',
      max: 100,
      start: 40,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Siwon talks to the player the way she did in the woodshed years ago: rude, fast, and unguarded. She tells them things before she has decided to.',
      color: '#6D8BA6',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Close. Siwon finishes the player’s sentences and argues with them as an equal. She will break a promise to the Grandmaster for them if the reason is good enough, and she says so.',
        },
        {
          upTo: 55,
          behaviour:
            'Careful affection. She is warm in private and formal in public, counts what the player eats, and changes the subject whenever it comes near why. Most of the story should live here.',
        },
        {
          upTo: 80,
          behaviour:
            'Strangers in the same yard. She answers questions with house protocol, sends messages through Han, and practises in the woodshed at hours she knows the player will not come.',
        },
        {
          upTo: 100,
          behaviour:
            'She has decided the player hates her, and she is acting accordingly: she is the heir, they are a struck name, and she will not let herself be seen to care. It would take something said in front of the whole house to reach her now.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'your_sword',
      name: 'Your Sword',
      tags: ['weapon', 'personal'],
      questItem: true,
      droppable: true,
      description: 'The sword the house gave you nine years ago: plain steel, a plain guard, very good balance, and your name cut into the tang under the grip. Alone in the yard it has never once cut the way the forms say. When somebody swings at you, it is already there.',
      loreText: 'Han has sharpened it every week for nine years without being asked. It is the only thing in the house with your name on it that nobody can cut out.',
      icon: 'sword',
    },
    {
      id: 'sword_token',
      name: 'Your Sword Token',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: true,
      description: 'A brass disc stamped with the city seal and the Seol house mark. It lets you carry a blade inside the walls. If your name is struck, it lapses at the sundown bell.',
      loreText: 'The Roll Office keeps a matching entry on the roll. When the entry goes, the brass is just brass, and the watch knows the difference by sight.',
      icon: 'coin',
    },
    {
      id: 'house_register',
      name: 'The Register',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A long folding book of mulberry paper between lacquered boards, thirty-one generations of names in brush ink. It lies open to your page, and your name is the last one written in it.',
      loreText: 'Its front pages are a fair copy, made forty-six years ago when the book was rebound. The originals went down to the archive under the hall, and nobody has ever asked why the book needed rebinding.',
      icon: 'book',
    },
    {
      id: 'cutting_blade',
      name: 'The Cutting Blade',
      tags: ['quest', 'weapon'],
      questItem: true,
      description: 'The oldest blade in House Seol: short, single-edged, and used for one thing only. Siwon is holding it over your page.',
      loreText: 'It has cut five names in thirty-one generations, and nobody in the hall under fifty has seen it used. Han sharpened it last night and did not sleep afterwards.',
      icon: 'dagger',
    },
    {
      id: 'archive_key',
      name: 'The Archive Key',
      tags: ['key'],
      description: 'A heavy iron key on a nail by the whetstone room door. It opens the trapdoor behind the register stand.',
      loreText: 'Han has kept it for forty years. He says it is because he oils the lock. He has never once been asked to.',
      icon: 'key',
    },
    {
      id: 'whetstone',
      name: 'Han’s Whetstone',
      tags: ['tool'],
      skillModifiers: { counter: 1 },
      description: 'A grey water-stone worn into a shallow saddle by fifty years of one man’s strokes.',
      loreText: 'The underside has a single character scratched into it, very small: the Seol house mark.',
      icon: 'stone',
    },
    {
      id: 'third_lantern',
      name: 'The Third Lantern',
      tags: ['personal'],
      description: 'The scorched paper lantern from your third failed test, cord still knotted. You kept it, and you have never been able to say why.',
      loreText: 'There is a clean cut across the bottom of the cord, a second one, from the moment it swung back toward you. Nobody in the house noticed it. One person from across the river did.',
      icon: 'lantern',
    },
    {
      id: 'form_notebook',
      name: 'Your Notebook of Forms',
      tags: ['document', 'personal'],
      skillModifiers: { swordlore: 1 },
      description: 'Every house style in the city, diagrammed in your hand: stances, openings, tells, and which of them you have seen used for real.',
      loreText: 'The page on House Geum is three times as long as any other, and half of it is questions.',
      icon: 'book',
    },
    {
      id: 'house_ledger',
      name: 'The House Ledger',
      tags: ['document'],
      skillModifiers: { swordlore: 1 },
      description: 'House Seol’s accounts: rice, charcoal, disciples’ fees, barge contracts. One line repeats every spring for as far back as the book goes: bridge rent, paid to House Geum.',
      loreText: 'The amount has never changed in a hundred and forty years. Nobody living can say what the rent is for.',
      icon: 'papers',
    },
    {
      id: 'struck_page',
      name: 'The Cut Page',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'One of the register’s original pages, taken out when the book was rebound, with a neat rectangular hole where a name was cut. Beside the hole, in the margin, somebody has written a date forty-seven years ago and nothing else.',
      loreText: 'The hole sits right after the Grandmaster’s name, exactly where a younger brother would be written.',
      icon: 'papers',
    },
    {
      id: 'pact_scroll',
      name: 'The Pact of the Bridge',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A copy of a hundred-and-forty-year-old agreement between House Seol and House Geum, signed on the Long Bridge, in a cedar case.',
      loreText: 'No Seol may keep the answering hand in the house. Any Seol who shows it is struck. Geum witnesses every striking. Seol pays a yearly rent. A Seol seen to answer while still in the register gives Geum the right to a feud bout for Seol’s council seat.',
      icon: 'scroll',
    },
    {
      id: 'trial_form',
      name: 'Form Eleven',
      tags: ['document'],
      description: 'The Roll Office’s form for the open trial: three bouts, three licensed blades, no house colours, on the first morning of the Spring Bout. A free blade writes their own family name on the last line.',
      loreText: 'The last line is longer than it needs to be. Minseo had it printed that way.',
      icon: 'papers',
    },
    {
      id: 'geum_letter',
      name: 'Yeon’s Letter',
      tags: ['document'],
      description: 'A letter sealed in House Geum’s gold wax and addressed to a name with no house in front of it. It is an offer.',
      loreText: 'One signature and one bout in their yard, and your name goes into their register before sundown. It does not say what the bout is for.',
      icon: 'letter',
    },
    {
      id: 'ring_mask',
      name: 'The Ring Mask',
      tags: ['personal', 'disguise'],
      description: 'A plain black lacquer half-mask of the kind sold by the stair under the Long Bridge for a copper.',
      loreText: 'Under the bridge, nobody asks a mask its name. They ask what odds it fights at.',
      icon: 'mask',
    },
    {
      id: 'ferry_pass',
      name: 'The Ferry Pass',
      tags: ['document'],
      description: 'A paid seat on the dawn ferry south and a heavy purse, left with the Ferry Inn’s landlady in your name three days ago, by a hand you would know anywhere.',
      loreText: 'The landlady was told to give it to you only if you came in with nothing. She has decided that counts.',
      icon: 'ticket',
    },
  ],
  abilities: [
    {
      id: 'answer_the_blade',
      name: 'Answer the Blade',
      tags: ['defensive'],
      description: 'Wait for the other sword to commit, then be where it is going. Your hands have always done this faster than you can decide to.',
      affordances: ['counter', 'parry', 'block', 'let her swing', 'wait for it', 'answer', 'deflect', 'dodge', 'disarm', 'turn it aside'],
      costs: [{ resourceId: 'stamina', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'counter', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'house_forms',
      name: 'The First Cut',
      tags: ['offensive'],
      description: 'The house’s way: go first and end it in one stroke. Your body has never once done this properly on its own.',
      affordances: ['attack', 'strike', 'cut', 'lunge', 'swing at', 'go first', 'draw and cut', 'charge', 'hit him'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'scandal', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'forms', baseDc: 16 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'claim_the_contest',
      name: 'Claim the Contest',
      tags: ['social'],
      description: 'Invoke the one right a name has before it is cut: a bout in the yard against whoever holds the blade.',
      affordances: ['i claim the contest', 'claim the contest', 'the yard', 'right of contest', 'fight me for it', 'i contest', 'demand a bout'],
      costs: [{ resourceId: 'rift', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsUnset: ['name_struck'],
        lockedCopy: 'The right of contest belongs to a name that is still in the book. Yours is not, and nobody in the hall will pretend otherwise.',
      },
    },
    {
      id: 'bow_out',
      name: 'Bow Out',
      tags: ['social'],
      description: 'Lower your head, lower your sword, and let it be done. Sometimes the strongest thing in a room.',
      affordances: ['leave quietly', 'i will go', 'bow', 'kneel', 'accept it', 'yield', 'give up', 'surrender', 'hand it over', 'let it go'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_your_ground',
      name: 'Hold Your Ground',
      tags: ['social'],
      description: 'Refuse. Do not leave, do not fight, do not move. Make them do it with you standing there.',
      affordances: ['refuse', 'stay put', 'stand my ground', 'i won’t go', 'don’t move', 'stare him down', 'say no', 'i will not'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'rift', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'plain_speech', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_stance',
      name: 'Read the Stance',
      tags: ['sight'],
      description: 'Watch where somebody’s weight is and what their hands want, and know what they will do next.',
      affordances: ['watch', 'look around', 'study', 'read her', 'notice', 'look closer', 'examine', 'observe', 'look at the register'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'swordlore', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'speak_plainly',
      name: 'Speak Plainly',
      tags: ['social'],
      description: 'Say the true thing or ask the real question, in front of whoever is listening, and wait for the answer.',
      affordances: ['tell the truth', 'ask why', 'ask her why', 'confess', 'be honest', 'ask directly', 'say it', 'tell me why'],
      costs: [{ resourceId: 'stamina', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'plain_speech', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_room',
      name: 'Work the Room',
      tags: ['social'],
      description: 'Lie, flatter, bargain or charm. The house raised you for ceremonies, and ceremonies are mostly this.',
      affordances: ['lie', 'bluff', 'charm', 'bargain', 'flatter', 'persuade', 'make a deal', 'talk my way', 'flirt', 'negotiate'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'scandal', amount: 2 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bearing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Go where you are not allowed: over a wall, through a loose board, past a clerk’s back, with something that is not yours.',
      affordances: ['sneak', 'steal', 'take it', 'slip out', 'hide', 'pick the lock', 'climb the wall', 'run', 'grab', 'force the trapdoor'],
      costs: [
        { resourceId: 'stamina', amount: 7 },
        { resourceId: 'scandal', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'streetwise', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'house_breath',
      name: 'The Steadying Breath',
      tags: ['utility'],
      description: 'The house’s breathing art for steadying a body after a blow. You learned it before any form, and it is the one house thing that works for you.',
      affordances: ['breathe', 'steady myself', 'catch my breath', 'calm down', 'meditate', 'rest a moment', 'centre myself'],
      costs: [],
      cooldownMinutes: 30,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'breath', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'the_returning_cut',
      name: 'The Returning Cut',
      tags: ['offensive'],
      description: 'The whole of the second cut: take the other sword’s line and send it back down itself. What the pact forbids a Seol to keep.',
      affordances: ['the returning cut', 'send it back', 'return the cut', 'the second cut', 'finish it', 'everything han showed me', 'all of it'],
      costs: [
        { resourceId: 'stamina', amount: 16 },
        { resourceId: 'scandal', amount: 8 },
      ],
      cooldownMinutes: 240,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'counter', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['second_cut_learned'],
        lockedCopy: 'Your hands know half of it. The other half has to be shown to you by somebody who has done it, and nobody has.',
      },
    },
  ],
  locations: [
    {
      id: 'register_hall',
      name: 'The Register Hall',
      shortName: 'Register Hall',
      description:
        'The ancestral hall of House Seol: dark beams, paper screens, forty kneeling cushions, and thirty-one generations of names in one folding book on a lacquer stand. The heir keeps a short rite here every morning. The main doors open onto the training yard; a covered walk leads to the Grandmaster’s pond pavilion; an iron trapdoor behind the stand, always locked, goes down to the sealed archive.',
      artDirection:
        'Korean-inspired ancestral hall, dark wooden beams, white paper screens with morning light, rows of kneeling figures in white, a long folding book open on a black lacquer stand, a raised dais. Solemn, cold, very still.',
      connections: [
        { to: 'seol_courtyard', travelMinutes: 1, label: 'Out to the training yard' },
        { to: 'pond_pavilion', travelMinutes: 2, label: 'The covered walk to the pavilion' },
        { to: 'sealed_archive', travelMinutes: 1, lockedByFlag: 'archive_open', label: 'Down through the trapdoor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'house_register', qty: 1, ownerId: 'jae', aka: ['register', 'the register', 'the book', 'the family book'] },
        { itemId: 'cutting_blade', qty: 1, ownerId: 'siwon', aka: ['the blade', 'her blade', 'the old blade', 'the knife', 'cutting blade'] },
      ],
    },
    {
      id: 'seol_courtyard',
      name: 'The Training Yard',
      shortName: 'The Yard',
      description:
        'Raked sand, forty disciples in house white, two lantern posts with their cords cut short, and a veranda where the Grandmaster watches the dawn forms. Contests are fought here. The front gate opens onto Sword Street, and a struck name is not supposed to come back through it. The armoury door leads to Han’s whetstone room, the register hall is up the steps, the pavilion is round the pond, and a path behind the kitchens goes to the old woodshed.',
      artDirection:
        'Wide sand training yard of a traditional sword house, raked lines, two tall lantern posts, disciples in white practice clothes, a wooden veranda, tiled roofs and a heavy front gate. Bright, disciplined, exposed.',
      connections: [
        { to: 'register_hall', travelMinutes: 1, label: 'Up the steps to the hall' },
        { to: 'whetstone_room', travelMinutes: 1, label: 'Through the armoury door' },
        { to: 'old_woodshed', travelMinutes: 2, label: 'The path behind the kitchens' },
        { to: 'pond_pavilion', travelMinutes: 2, label: 'Round the pond' },
        { to: 'sword_street', travelMinutes: 3, label: 'Out through the front gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'whetstone_room',
      name: 'The Whetstone Room',
      shortName: 'Whetstones',
      description:
        'A low room off the armoury that smells of oil and wet stone. Every blade House Seol owns comes through here, and Han sleeps on a pallet beside the stones with a lamp he never quite puts out. An iron key hangs on a nail by the door. The only way in or out is back through the training yard.',
      artDirection:
        'Cramped workshop room, rows of whetstones in water troughs, swords on racks, an oil lamp, a thin sleeping mat, an iron key on a nail. Warm lamplight, deep shadow, quiet craft.',
      connections: [{ to: 'seol_courtyard', travelMinutes: 1, label: 'Back to the yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'archive_key', qty: 1, ownerId: 'han', aka: ['key', 'iron key', 'the archive key', 'the key on the nail'] },
        { itemId: 'whetstone', qty: 1, ownerId: 'han', aka: ['whetstone', 'the stone', 'his stone'] },
      ],
    },
    {
      id: 'old_woodshed',
      name: 'The Old Woodshed',
      shortName: 'Woodshed',
      description:
        'A leaning shed at the back of the compound, split wood stacked to the roof and two posts scarred at chest height. Siwon and you sparred here at night for fifteen years and nobody was supposed to know. A loose board in the back wall lets onto the lane behind Sword Street, which is how a struck name gets back in. The front path goes back to the training yard.',
      artDirection:
        'Old wooden woodshed at night, stacked firewood, two scarred practice posts, a hanging paper lantern, moonlight through gaps in the planks, one loose board in the back wall. Hidden, quiet, dusty.',
      connections: [
        { to: 'seol_courtyard', travelMinutes: 2, label: 'Back to the yard' },
        { to: 'sword_street', travelMinutes: 4, label: 'Through the loose board' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'third_lantern', qty: 1, ownerId: null, aka: ['lantern', 'the scorched lantern', 'the third lantern'] },
      ],
    },
    {
      id: 'pond_pavilion',
      name: 'The Pond Pavilion',
      shortName: 'Pavilion',
      description:
        'The Grandmaster’s tea pavilion over the carp pond: four pillars, a low table, a kettle always on, and the house ledger in a lacquer box. Nobody comes here without being sent for. A covered walk leads back to the register hall, and a path round the pond goes down to the training yard.',
      artDirection:
        'Elegant open wooden pavilion over a still carp pond, low tea table, steam from a kettle, an old man’s sword on a stand, willow branches, evening light on water. Calm and lonely.',
      connections: [
        { to: 'register_hall', travelMinutes: 2, label: 'The covered walk to the hall' },
        { to: 'seol_courtyard', travelMinutes: 2, label: 'Round the pond to the yard' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'house_ledger', qty: 1, ownerId: 'jae', aka: ['ledger', 'the accounts', 'account book', 'house ledger'] },
      ],
    },
    {
      id: 'sealed_archive',
      name: 'The Sealed Archive',
      shortName: 'Archive',
      description:
        'A stone room under the register hall, reached by a ladder through the iron trapdoor. The register’s original pages, taken out when the book was rebound, lie on shelves in oiled cloth, and some of them have neat rectangular holes cut in them. A copy of an old agreement between two houses waits in a cedar case. The ladder goes back up to the hall.',
      artDirection:
        'Underground stone archive lit by one lamp, shelves of old folding books wrapped in cloth, a cedar document case, a page held to the light showing a rectangular hole cut out of it. Dusty, hushed, forbidden.',
      connections: [{ to: 'register_hall', travelMinutes: 1, label: 'Back up the ladder' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'struck_page', qty: 1, ownerId: null, aka: ['page', 'the cut page', 'old page', 'the page with the hole'] },
        { itemId: 'pact_scroll', qty: 1, ownerId: null, aka: ['pact', 'scroll', 'the pact', 'the old scroll', 'cedar case'] },
      ],
    },
    {
      id: 'sword_street',
      name: 'Sword Street',
      shortName: 'Sword Street',
      description:
        'The avenue of the seven sword houses: gates in seven colours, smithies, sharpening stalls, a teahouse where heirs pretend not to watch each other, and a gambling end where they do. The Seol gate is at the top of the street, and round the back lane is the woodshed’s loose board. From here: the Roll Office, the Ferry Inn on the water, the steps down under the Long Bridge, the bridge itself across to House Geum, and the causeway to the island bout ground.',
      artDirection:
        'Busy traditional city avenue lined with sword-house gates in different colours, smithy smoke, hanging banners, a teahouse balcony, a long stone bridge in the distance over a river. Lively, proud, watchful.',
      connections: [
        { to: 'seol_courtyard', travelMinutes: 3, label: 'In through the Seol gate' },
        { to: 'old_woodshed', travelMinutes: 4, label: 'Round the back lane to the loose board' },
        { to: 'roll_office', travelMinutes: 3, label: 'The Roll Office' },
        { to: 'ferry_inn', travelMinutes: 6, label: 'Down to the Ferry Inn' },
        { to: 'the_rings', travelMinutes: 5, label: 'The steps under the bridge' },
        { to: 'geum_house', travelMinutes: 10, label: 'Across the Long Bridge' },
        { to: 'bout_ground', travelMinutes: 12, label: 'The causeway to the island' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'roll_office',
      name: 'The Roll Office',
      shortName: 'Roll Office',
      description:
        'A narrow city office with a long counter, a wall of pigeonholes, and the roll of every person allowed to carry a blade inside the walls. A bronze bell hangs over the door, and when the clerk rings it at sundown, struck tokens stop being worth their brass. Sword Street is right outside.',
      artDirection:
        'Narrow government office, long wooden counter, a wall of paper pigeonholes, a huge open ledger, a bronze bell over the door, a clerk with ink-stained fingers. Orderly, dry, faintly comic.',
      connections: [{ to: 'sword_street', travelMinutes: 3, label: 'Back out to Sword Street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'trial_form', qty: 1, ownerId: 'minseo', aka: ['form', 'form eleven', 'the trial form'] },
      ],
    },
    {
      id: 'geum_house',
      name: 'House Geum',
      shortName: 'House Geum',
      description:
        'House Geum, across the Long Bridge: gold lacquer gates, a yard laid with river stones, and disciples practising the second cut from open books on stands. Their register is smaller than House Seol’s and newer. The bridge runs back to Sword Street, and a ferry stair leads down to the island bout ground.',
      artDirection:
        'Rival sword house compound with gold-lacquered gates, a river-stone yard, disciples in dark gold practising with open manuals on stands, a younger and brighter building than its rival. Rich, studious, slightly anxious.',
      connections: [
        { to: 'sword_street', travelMinutes: 10, label: 'Back across the Long Bridge' },
        { to: 'bout_ground', travelMinutes: 6, label: 'The ferry stair to the island' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 4 },
      takeableItems: [
        { itemId: 'geum_letter', qty: 1, ownerId: 'yeon', aka: ['letter', 'the offer', 'her letter', 'sealed letter'] },
      ],
    },
    {
      id: 'the_rings',
      name: 'Under the Long Bridge',
      shortName: 'The Rings',
      description:
        'Under the Long Bridge after dark: rope rings strung between the pilings, lanterns on hooks, odds chalked on slates, and a crowd that does not ask names. Masks are sold by the stair for a copper. Nothing here is licensed and the watch only comes down when paid to. Steps go up to Sword Street, and a river path runs along the water to the Ferry Inn.',
      artDirection:
        'Underneath a huge stone bridge at night, rope fighting rings between wet pilings, paper lanterns, chalk odds on slates, masked fighters, a rough crowd, river reflections. Loud, illicit, exciting.',
      connections: [
        { to: 'sword_street', travelMinutes: 5, label: 'Up the steps to the street' },
        { to: 'ferry_inn', travelMinutes: 4, label: 'The river path' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [
        { itemId: 'ring_mask', qty: 1, ownerId: null, aka: ['mask', 'a mask', 'ring mask'] },
      ],
    },
    {
      id: 'ferry_inn',
      name: 'The Ferry Inn',
      shortName: 'Ferry Inn',
      description:
        'Cheap rooms on stilts over the water, a common room with a fire, and a landlady who has seen a struck name walk in with nothing before. The southern ferry leaves from its jetty at dawn. The front door is on Sword Street; the back stairs go down to the river path and along under the bridge.',
      artDirection:
        'Rickety riverside inn on wooden stilts, a smoky common room with a hearth, a jetty with a ferry boat at dawn mist, cheap paper lanterns. Shabby, warm, a place to start over.',
      connections: [
        { to: 'sword_street', travelMinutes: 6, label: 'Up to Sword Street' },
        { to: 'the_rings', travelMinutes: 4, label: 'The river path under the bridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'ferry_pass', qty: 1, ownerId: null, aka: ['ferry pass', 'the pass', 'the purse', 'ferry ticket'] },
      ],
    },
    {
      id: 'bout_ground',
      name: 'The Bout Ground',
      shortName: 'Bout Ground',
      description:
        'The island in the river where the Spring Bout is fought: one ring of raked sand, stands for four thousand, seven house banners, and a judges’ table for the Sword Council. The open trial for free blades is fought here on the first morning of the Spring Bout. A causeway runs back to Sword Street, and a ferry stair climbs to House Geum.',
      artDirection:
        'Island arena in a river, a circle of raked sand, tiered wooden stands, seven colourful house banners, a judges’ table under an awning, crowds. Grand, public, decisive.',
      connections: [
        { to: 'sword_street', travelMinutes: 12, label: 'The causeway back to the city' },
        { to: 'geum_house', travelMinutes: 6, label: 'The ferry stair to House Geum' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 5 },
      takeableItems: [],
    },
  ],
  /**
   * The Watch is first on purpose: PUBLIC_VIOLENCE drops the first faction in
   * array order, and the people who check sword tokens are the ones a street
   * fight should cost you with.
   */
  factions: [
    {
      id: 'faction_watch',
      name: 'The Magistrate’s Watch',
      description: 'The city’s law on Sword Street. They check sword tokens, take unlicensed blades, and keep the Roll Office honest. They do not care which house you are from, which is either the worst or the best thing about them.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Another blade' },
        { atReputation: 25, label: 'Known to the watch' },
        { atReputation: 50, label: 'Vouched for' },
      ],
      allies: [],
      enemies: ['faction_rings'],
    },
    {
      id: 'faction_seol',
      name: 'House Seol',
      description: 'Your house: the Grandmaster, Siwon, cousin Doha, forty disciples, the servants, and thirty-one generations of the first cut. This morning they are kneeling in rows to watch your name go.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'The failure' },
        { atReputation: 30, label: 'Spoken to' },
        { atReputation: 60, label: 'Stood up for' },
      ],
      allies: [],
      enemies: ['faction_geum'],
    },
    {
      id: 'faction_geum',
      name: 'House Geum',
      description: 'The house across the Long Bridge, founded by a struck Seol a hundred and forty years ago. They fight with the second cut, the answering stroke, taught from books for three generations. They witness every Seol striking and are paid every spring for it.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A Seol' },
        { atReputation: 35, label: 'A guest across the bridge' },
        { atReputation: 65, label: 'Written in' },
      ],
      allies: [],
      enemies: ['faction_seol'],
    },
    {
      id: 'faction_rings',
      name: 'The Bridge Rings',
      description: 'The unlicensed fight rings under the Long Bridge: ring-bosses, bettors, masked fighters and a crowd that never asks names. They pay in coin and they collect debts the same way.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'A stranger' },
        { atReputation: 30, label: 'A face they bet on' },
        { atReputation: 60, label: 'A name on the post' },
      ],
      allies: [],
      enemies: ['faction_watch'],
    },
    {
      id: 'faction_council',
      name: 'The Sword Council',
      description: 'The seven sword houses sitting as one council: they run the Spring Bout, rule on feuds, and decide which houses may train licensed blades. A house that loses its seat loses its disciples.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'Nobody' },
        { atReputation: 40, label: 'Heard' },
        { atReputation: 70, label: 'Remembered' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'siwon',
      name: 'Seol Siwon',
      calledName: 'Siwon',
      role: 'Your younger sister, the best first-cut sword of your generation, and the heir the moment she cuts',
      cardBlurb:
        'She is holding the blade over your name, she has never once landed a hit on you in fifteen years of secret practice, and she would rather you hated her than found out why she agreed to do this.',
      pronouns: 'she/her',
      publicTraits: ['Precise to the point of cruelty', 'Never relaxes her back in public', 'Counts things when she is upset'],
      hiddenDrives: [
        'She wants the heirship and she earned it, and she cannot forgive the house for giving it to her like this',
        'Part of her wants the player to claim the contest anyway, so that everybody finally sees what she has seen in the woodshed',
      ],
      values: ['Keeping a promise even when it is the wrong one', 'Doing the hard thing herself rather than letting someone worse do it'],
      fears: [
        'The contest: in daylight, in front of the Geum witness, the player would win, and the feud would come on her first day as heir',
        'That the player will leave believing she wanted this',
      ],
      socialStyle:
        'Formal and clipped in front of the house, rude and fast in private. Gives orders when she means to give comfort. Never looks at the person she is protecting while she protects them.',
      boundaries: [
        'Will not break her promise to the Grandmaster unless the player has told her something true first, in private',
        'Will not hold back in a bout once it has started. If she fights, she fights for real',
      ],
      goals: ['Get through the cut without a contest', 'Get her brother out of the city before the house finds a use for them'],
      secrets: [
        {
          id: 'siwon_was_told',
          fact: 'Three days ago the Grandmaster told her about the Pact of the Bridge and the answering hand, and made her promise not to tell the player. She agreed to hold the blade because otherwise Doha would have.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'In the old woodshed, at night, if the player comes to her alone and asks her plainly why it had to be her rather than why it had to happen.',
        },
        {
          id: 'siwon_never_touched_him',
          fact: 'In fifteen years of night practice she has never once landed a clean touch on the player. She stopped trying to win in the eleventh year and started trying to make them go first. They never have.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it out loud the first time the player answers her blade in front of anybody else.',
        },
      ],
      speechStyle:
        'Short sentences, imperatives, numbers. Calls the player "brother" and nobody else does. Gives commands when she means kindness. When she is about to cry she gets more precise, not less.',
      topics: ['the contest', 'the woodshed', 'the heirship', 'Grandfather', 'Doha', 'the Spring Bout', 'why it had to be her'],
      voiceSamples: [
        'Say you’ll leave quietly, brother. Then I won’t have to fight you.',
        'Fifteen years in that woodshed and I never once touched you. Do you understand what that looks like in daylight?',
        'Eat. You skipped supper yesterday. I counted the bowls.',
        'Hate me in the yard if you need to, brother. Just keep it out of Grandfather’s hearing.',
      ],
      appearance:
        'An adult woman, slim and quick, in house white with the sleeves tied back, long black hair tied high with a cord of sword-grip binding, sharp dark eyes, and a straight back she never lets curve.',
      visualHook: 'Her hair cord is a strip of sword-grip binding from the first practice sword she ever broke.',
      silhouette: 'Upright as a post, short blade raised level over an open book, elbows locked.',
      artSeed: 'sftr-siwon-01',
      portrait: null,
      expressions: ['neutral', 'determined', 'stern', 'hurt', 'angry', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'seol_courtyard', activity: 'in the family wing off the yard, lying awake' },
        { startMinute: 360, endMinute: 480, locationId: 'old_woodshed', activity: 'alone in the old woodshed before dawn, cutting at the scarred posts' },
        { startMinute: 480, endMinute: 600, locationId: 'register_hall', activity: 'keeping the heir’s morning rite at the register' },
        { startMinute: 600, endMinute: 780, locationId: 'seol_courtyard', activity: 'drilling the disciples in the first-cut forms, harder than she needs to' },
        { startMinute: 780, endMinute: 900, locationId: 'pond_pavilion', activity: 'with the Grandmaster, being taught what an heir signs' },
        { startMinute: 900, endMinute: 1080, locationId: 'seol_courtyard', activity: 'the afternoon lantern drills, cutting cords until her arms shake' },
        { startMinute: 1080, endMinute: 1260, locationId: 'sword_street', activity: 'walking Sword Street in house white so the city sees the new heir' },
        { startMinute: 1260, endMinute: 1440, locationId: 'old_woodshed', activity: 'back in the woodshed with a lamp, waiting for a sparring partner who used to come' },
      ],
      homeLocationId: 'seol_courtyard',
      knowledgeScope: ['house_seol', 'the_register', 'the_woodshed', 'the_pact', 'the_lantern_test', 'the_spring_bout'],
      startingRelationship: { trust: 50, affection: 75, respect: 55, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'siwon_tells_you',
          label: 'She tells you why it had to be her',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['morning_over'] },
        },
        {
          id: 'siwon_spars_again',
          label: 'She meets you in the woodshed again',
          kind: 'OTHER',
          requires: { trust: 55, affection: 70 },
        },
        {
          id: 'siwon_stands_with_you',
          label: 'She takes your side in front of the house',
          kind: 'ALLIANCE',
          requires: { trust: 70, flagsSet: ['knows_there_is_a_pact'] },
        },
      ],
      attributes: { might: 14, agility: 15, mind: 12, presence: 13, resolve: 15, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 9, tags: ['seol', 'first-cut', 'heir'] },
    },
    {
      id: 'yeon',
      name: 'Geum Yeon',
      calledName: 'Yeon',
      role: 'Heir of House Geum, across the river, and the official witness at your striking',
      cardBlurb:
        'She has watched you fail three lantern tests and come to every morning rite since, and she is the only person in the hall who looks at you like you are worth something. She has a price, and she will tell you it.',
      pronouns: 'she/her',
      publicTraits: ['Dry and amused in the worst rooms', 'Talks in prices and offers', 'Better at the second cut than anybody living, and knows it is an imitation'],
      hiddenDrives: [
        'She wants to see the real answering hand once, up close, before she spends her life teaching a copy of it',
        'She is tired of being paid to watch other people lose',
      ],
      values: ['A fair bargain, stated out loud', 'Never lying in a witness report'],
      fears: ['That she is the best imitation in three generations and nothing more', 'Being the reason House Seol falls'],
      socialStyle:
        'Polite on the surface and amused underneath. Makes offers instead of requests, names the price before anyone asks, and laughs once, quietly, when somebody surprises her.',
      boundaries: [
        'Will not lie in her witness report. If she sees a Seol answer a blade while still in the register, she must say so',
        'Will not take anybody across the bridge who has not chosen to come',
      ],
      goals: ['Bring the struck heir across the bridge before sundown', 'Win the heirs’ bout at the Spring Bout without anybody finding out what Geum’s art has become'],
      secrets: [
        {
          id: 'yeon_saw_the_twitch',
          fact: 'On the third lantern test she saw the player’s blade twitch toward the lantern as it swung back, the answering tell, and knew what they were. She has said nothing to her elders.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Over tea, if the player lets her name her price and pays it rather than haggling.',
        },
        {
          id: 'yeon_and_the_rings',
          fact: 'She goes under the Long Bridge at night in a plain coat looking for fighters who never swing first. House Geum has not had a true answering hand in three generations.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player meets her under the bridge after dark, she does not pretend she came for any other reason.',
        },
      ],
      speechStyle:
        'Dry, composed, faintly amused. Every proposition comes with its cost attached. Calls the player by their given name the moment it has no house in front of it, and lets them notice.',
      topics: ['House Geum', 'the second cut', 'her offer', 'the witness', 'the bridge rent', 'the Spring Bout', 'the rings'],
      voiceSamples: [
        'I’m the witness. I’m required to watch. I’m not required to look bored, so I don’t.',
        'Across the bridge, a name costs one signature and one bout. Ours are cheaper than yours.',
        'You wait for the other sword. Every single time. Who taught you that, and why did they hide it?',
        'Buy me tea and I’ll tell you what my house has been paid every spring for a hundred and forty years.',
      ],
      appearance:
        'An adult woman, a fitted coat in House Geum’s dark gold over a fighter’s build, short black hair cut blunt at the jaw, an easy stance that is never off balance, and a witness’s brass seal at her belt.',
      visualHook: 'A witness’s brass seal on a gold cord at her belt, which she turns over and over with one thumb while she watches.',
      silhouette: 'Weight on the back foot, arms loosely folded, head tilted as if pricing what she sees.',
      artSeed: 'sftr-yeon-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'curious', 'amused', 'surprised', 'teasing'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'geum_house', activity: 'at House Geum, up early with a book of forms' },
        { startMinute: 480, endMinute: 600, locationId: 'register_hall', activity: 'standing at the Seol morning rite as House Geum’s witness, as she has every morning this month' },
        { startMinute: 600, endMinute: 840, locationId: 'geum_house', activity: 'teaching the Geum disciples the second cut out of an open book' },
        { startMinute: 840, endMinute: 1020, locationId: 'sword_street', activity: 'at the heirs’ teahouse on Sword Street, pretending not to watch the Seol gate' },
        { startMinute: 1020, endMinute: 1200, locationId: 'bout_ground', activity: 'alone on the bout ground, pacing out the ring' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_rings', activity: 'under the bridge in a plain coat, watching fights an heir should not be at' },
      ],
      homeLocationId: 'geum_house',
      knowledgeScope: ['house_geum', 'the_pact', 'the_second_cut', 'the_bridge_rent', 'the_rings', 'the_spring_bout'],
      startingRelationship: { trust: 10, affection: 15, respect: 35, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'yeon_makes_the_offer',
          label: 'She makes House Geum’s offer in so many words',
          kind: 'ALLIANCE',
          requires: { respect: 40, flagsSet: ['name_struck'] },
        },
        {
          id: 'yeon_off_duty',
          label: 'She stops being the witness around you',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 55 },
        },
      ],
      attributes: { might: 12, agility: 16, mind: 15, presence: 14, resolve: 13, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 16, damage: 9, tags: ['geum', 'second-cut', 'heir'] },
    },
    {
      id: 'jae',
      name: 'Grandmaster Seol Jae',
      calledName: 'Grandmaster Jae',
      role: 'Head of House Seol and your grandfather, who ordered the striking',
      cardBlurb:
        'He ordered your name cut and has not looked at you in a month. Whatever he feels about it, he has decided you will never see it, and he will not tell you why unless you make him.',
      pronouns: 'he/him',
      publicTraits: ['Speaks like a judgement being read', 'Never raises his voice', 'Has not been seen to sit in the yard in twenty years'],
      hiddenDrives: [
        'He wants the house intact and his grandchild alive and far away, and he has decided he cannot have both close to each other',
        'He has wanted, for forty-seven years, to say one sentence to his brother, and has never found the room to say it in',
      ],
      values: ['The house outlasting every person in it', 'Paying for what he does, privately and in full'],
      fears: ['Dying with the thing about Han unsaid', 'A feud bout the first cut cannot win'],
      socialStyle:
        'Formal, sparing, precise. Speaks of the house in the third person and of the player as "the eldest". Pours tea for people he respects and lets it go cold in front of people he is afraid of.',
      boundaries: [
        'Will not break the pact himself. He will let somebody else break it, and he will not stop them',
        'Will not apologise in public. In private, once, if he is asked the right question',
      ],
      goals: ['See the cut done before the Spring Bout', 'Get the eldest out of the city before House Geum finds a reason to want them'],
      secrets: [
        {
          id: 'jae_held_the_blade',
          fact: 'Forty-seven years ago, under his father’s order and the pact, he held the cutting blade over his younger brother’s name. His hands shook worse than Siwon’s. The brother is Han.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'In the pond pavilion, over tea he actually pours, if the player asks him who the last name he cut belonged to.',
        },
        {
          id: 'jae_paid_the_ferry',
          fact: 'Three days ago he left a paid seat on the southern ferry and a heavy purse with the Ferry Inn’s landlady, in the player’s name.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The landlady gives it to the player if they come in with nothing. He will not admit to it unless shown it.',
        },
      ],
      speechStyle:
        'Sentence-shaped and formal, every line finished. Calls the player "the eldest", never by name. Uses the house the way other people use "I". Pauses before verbs.',
      topics: ['the house', 'the register', 'the pact', 'the lantern test', 'the eldest’s father', 'his brother'],
      voiceSamples: [
        'A house is a sentence. Somebody has to decide where it stops.',
        'The eldest may kneel or stand. Either is permitted. Choose one.',
        'Thirty-one generations in that book, and I have cut one name out of it. Do not ask me whose.',
        'Sit. The tea is bitter because I let it steep. Some things should be.',
      ],
      appearance:
        'An older man, gaunt and very upright in grey house robes, white hair bound in an old-fashioned topknot, a face that has been arranged into nothing for so long it has stayed that way.',
      visualHook: 'A sword he never draws resting across his knees, its grip wrapped in faded white cord.',
      silhouette: 'Seated on a dais, both hands flat on the scabbard across his knees, perfectly still.',
      artSeed: 'sftr-jae-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grave', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'pond_pavilion', activity: 'awake in the pavilion with the lamp lit' },
        { startMinute: 300, endMinute: 480, locationId: 'seol_courtyard', activity: 'on the veranda, watching the dawn forms without comment' },
        { startMinute: 480, endMinute: 600, locationId: 'register_hall', activity: 'on the dais for the morning rite' },
        { startMinute: 600, endMinute: 1080, locationId: 'pond_pavilion', activity: 'tea, letters and the house accounts' },
        { startMinute: 1080, endMinute: 1200, locationId: 'register_hall', activity: 'alone with the register, turning pages back' },
        { startMinute: 1200, endMinute: 1440, locationId: 'pond_pavilion', activity: 'tea gone cold, waiting for nobody in particular' },
      ],
      homeLocationId: 'pond_pavilion',
      knowledgeScope: ['house_seol', 'the_register', 'the_pact', 'han', 'the_bridge_rent', 'the_ferry_pass'],
      startingRelationship: { trust: 20, affection: 40, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'jae_sends_for_you',
          label: 'He sends for you to the pavilion',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['morning_over'] },
        },
        {
          id: 'jae_says_his_brother',
          label: 'He says the thing about his brother out loud',
          kind: 'TRUST',
          requires: { trust: 50, respect: 45, flagsSet: ['han_s_name_known'] },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 16, presence: 17, resolve: 17, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 18, damage: 12, tags: ['seol', 'first-cut', 'grandmaster'] },
    },
    {
      id: 'han',
      name: 'Han',
      calledName: 'Han',
      role: 'The old servant who keeps the house’s whetstones, and still calls you young master',
      cardBlurb:
        'He has sharpened your sword every week for nine years and thrown things at you when nobody was looking for longer than that. He knows exactly what you are, and he is waiting for you to ask him how.',
      pronouns: 'he/him',
      publicTraits: ['Says about six words an hour', 'Talks to blades instead of people', 'Sweeps one patch of the yard twice'],
      hiddenDrives: [
        'He wants the player to have the choice he did not: to cross the bridge, or stay, or go, and to choose it rather than have it chosen',
        'He would like, once before he dies, to hear his own name said in the register hall',
      ],
      values: ['A good edge on every blade, whoever carries it', 'Not making a fuss'],
      fears: ['That the young master will choose what he chose and sweep this yard for forty-seven years', 'His brother dying before either of them says anything'],
      socialStyle:
        'Grunts, hums, works with his hands while you talk, and answers the question a minute later as if nobody had asked it. Throws small objects at the young master without warning and never comments on the catch.',
      boundaries: [
        'Will not say his own family name aloud inside the house',
        'Will not raise a blade against anybody named Seol, in the register or out of it',
      ],
      goals: ['Get the young master’s edge right before sundown', 'See the young master learn the whole of the second cut from somebody who means it'],
      secrets: [
        {
          id: 'han_is_seol_han',
          fact: 'He was born Seol Han, the Grandmaster’s younger brother, and was struck at twenty-one for the answering hand. He stayed as a servant rather than cross the river, because crossing meant one day fighting his own house.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'In the whetstone room, if the player shows him the cut page or asks him plainly whose name was cut forty-seven years ago.',
        },
        {
          id: 'han_has_been_training_you',
          fact: 'For years he has been training the player’s answering hand by throwing spoons, broom handles and once a lit lantern at them when nobody was watching. He knows they have never missed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it the first time the player catches something he throws and asks him why.',
        },
      ],
      speechStyle:
        'Few words, half of them grunts. Calls the player "young master" and will not stop whatever the register says. Addresses the sword he is sharpening rather than the person holding it.',
      topics: ['the whetstones', 'your edge', 'the yard', 'the old days', 'the archive key', 'catching things'],
      voiceSamples: [
        'Young master. Your edge is rolled. Give it here.',
        'Hm. Catch.',
        'Forty-seven years on this sand. It remembers who stood where, even when the book forgets.',
        'Don’t thank me. Sit still while I work.',
      ],
      appearance:
        'An older man, small and wiry in a patched servant’s jacket, grey stubble, forearms like knotted rope, and a narrow squint that misses nothing that moves.',
      visualHook: 'A whetstone always tucked in one sleeve, and a thin white scar across the back of his right hand.',
      silhouette: 'Hunched over a trough with a blade flat under his palms, or leaning on a rake at the edge of the yard.',
      artSeed: 'sftr-han-01',
      portrait: null,
      expressions: ['neutral', 'quiet', 'unimpressed', 'warm', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'whetstone_room', activity: 'on his pallet beside the stones' },
        { startMinute: 300, endMinute: 480, locationId: 'seol_courtyard', activity: 'raking the yard before the forms, one patch of it twice' },
        { startMinute: 480, endMinute: 600, locationId: 'register_hall', activity: 'at the back of the hall by the door, a whetstone in his sleeve' },
        { startMinute: 600, endMinute: 1080, locationId: 'whetstone_room', activity: 'sharpening the house’s blades one at a time' },
        { startMinute: 1080, endMinute: 1200, locationId: 'ferry_inn', activity: 'one cup at the corner table of the Ferry Inn' },
        { startMinute: 1200, endMinute: 1440, locationId: 'whetstone_room', activity: 'oiling the stones by lamplight' },
      ],
      homeLocationId: 'whetstone_room',
      knowledgeScope: ['house_seol', 'the_register', 'the_pact', 'the_second_cut', 'the_archive', 'jae'],
      startingRelationship: { trust: 45, affection: 60, respect: 50, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'han_throws_the_lantern',
          label: 'He stops pretending he has not been training you',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'han_gives_the_key',
          label: 'He takes the key off the nail for you',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows_there_is_a_pact'] },
        },
      ],
      attributes: { might: 11, agility: 16, mind: 13, presence: 9, resolve: 16, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 17, damage: 6, tags: ['servant', 'second-cut'] },
    },
    {
      id: 'doha',
      name: 'Seol Doha',
      calledName: 'Doha',
      role: 'Your cousin, the best at the forms in the house, who wanted to be heir and never will be',
      cardBlurb:
        'He has been waiting years to watch your name go and he is enjoying every second, but he knows something about how you fight that nobody else in the house does, and it has cost him money.',
      pronouns: 'he/him',
      publicTraits: ['Perfect at every form, loudly', 'Keeps score on everybody', 'Laughs at his own jokes first'],
      hiddenDrives: [
        'He wants to be seen as the one who did the work, by someone who matters, just once',
        'He spied on the woodshed for years and knows his cousin is the better sword, and he cannot stand that nobody else knows it',
      ],
      values: ['Work counted and written down', 'A bet honoured'],
      fears: ['That hard work is not the same as being good, and everyone can tell', 'The ring-bosses under the bridge, who he owes'],
      socialStyle:
        'Narrates other people’s failures like a bout caller, in odds and money. Turns every conversation into a ranking. Goes quiet and honest for exactly one sentence when he is cornered, then laughs it off.',
      boundaries: [
        'Will not let anybody see him lose at the forms',
        'Will not tell the Grandmaster about the woodshed, because then he would have to say how he knows',
      ],
      goals: ['Become Siwon’s second at the Spring Bout', 'Cover what he owes under the bridge before the Spring Bout'],
      secrets: [
        {
          id: 'doha_watched_the_woodshed',
          fact: 'For years he watched Siwon and the player spar at night from the woodpile, and saw her never once land a touch. He knows the house is cutting its best sword.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player beats him in front of anybody, or asks him straight what he saw in the woodshed, he says it out of pure spite.',
        },
        {
          id: 'doha_owes_the_rings',
          fact: 'He owes the bridge ring-bosses more than he can pay and has bet what he does not have on the Spring Bout.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anyone under the Long Bridge after dark can find out who Doha owes. The ring-bosses are not discreet.',
        },
      ],
      speechStyle:
        'Bout-caller patter: odds, silver, rankings, scores. Calls the player "cousin" with a sneer on it. Laughs before his own punchline. One flat honest sentence when cornered, then a joke to cover it.',
      topics: ['the forms', 'the lantern tests', 'the odds', 'the Spring Bout', 'Siwon', 'what he saw'],
      voiceSamples: [
        'Three lanterns, cousin. Three. I had silver on the second one and you still disappointed me.',
        'Go on, contest her. I’d pay to watch. I’d pay double.',
        'Everyone in this house trained. I trained more. Nobody wrote that down anywhere.',
        'Odds are odds, cousin. Somebody always loses money on the favourite.',
      ],
      appearance:
        'An adult man, tall and broad in immaculate house white, a handsome face set in a permanent half-smile, hair oiled flat, and a gambler’s silver ring he turns when he is nervous.',
      visualHook: 'A silver gambler’s ring on his thumb that he spins with his forefinger while he talks.',
      silhouette: 'Arms crossed, chin up, standing slightly in front of whoever he is with.',
      artSeed: 'sftr-doha-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'contemptuous', 'cornered'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'seol_courtyard', activity: 'in the family wing, then first into the yard so that it is noticed' },
        { startMinute: 480, endMinute: 600, locationId: 'register_hall', activity: 'kneeling in the front row of the rite' },
        { startMinute: 600, endMinute: 900, locationId: 'seol_courtyard', activity: 'running the forms, perfect, every one' },
        { startMinute: 900, endMinute: 1080, locationId: 'sword_street', activity: 'at the gambling end of Sword Street, losing quietly' },
        { startMinute: 1080, endMinute: 1260, locationId: 'seol_courtyard', activity: 'the evening forms, alone and loud about it' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_rings', activity: 'under the bridge with money on a slate he cannot cover' },
      ],
      homeLocationId: 'seol_courtyard',
      knowledgeScope: ['house_seol', 'the_woodshed', 'the_rings', 'the_spring_bout', 'the_lantern_test'],
      startingRelationship: { trust: 5, affection: 5, respect: 20, fear: 0, rivalry: 60 },
      gates: [
        {
          id: 'doha_drops_the_act',
          label: 'He says what he saw in the woodshed',
          kind: 'TRUST',
          requires: { respect: 40 },
        },
      ],
      attributes: { might: 15, agility: 13, mind: 11, presence: 12, resolve: 11, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 14, damage: 9, tags: ['seol', 'first-cut'] },
    },
    {
      id: 'minseo',
      name: 'Oh Minseo',
      calledName: 'Minseo',
      role: 'Clerk of the Roll Office, who keeps the city’s roll of blades and rings the sundown bell',
      cardBlurb:
        'At the sundown bell she decides whether your sword is legal, she has no interest in your family whatsoever, and she is the only person in the city who can tell you how to get a name back without a house.',
      pronouns: 'she/her',
      publicTraits: ['Exact to the minute', 'Deadpan about everything', 'Ink on every finger'],
      hiddenDrives: [
        'She wants one struck name to take the open trial properly and win it, so the roll stops looking like something the houses own',
      ],
      values: ['The roll being right, whoever it inconveniences', 'Rules that apply to the houses too'],
      fears: ['The Sword Council taking the roll off the magistrate', 'Seeing herself at nineteen on the other side of the counter and saying nothing'],
      socialStyle:
        'Answers every question with the exact rule, then, if she likes you, with the clause underneath it that the rule forgets to mention. Never raises her voice; rings the bell instead.',
      boundaries: [
        'Will not alter the roll for anybody, for any price',
        'Will not ring the sundown bell early or late',
      ],
      goals: ['File the striking correctly', 'Get one free blade through the open trial this spring'],
      secrets: [
        {
          id: 'minseo_was_struck',
          fact: 'She was struck from a small sword house at nineteen, won the open trial, and chose her mother’s family name for the roll. A licensed sword sits under her counter.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player fills in Form Eleven and hesitates over the last line, she tells them how she filled in hers.',
        },
      ],
      speechStyle:
        'Clauses, form numbers and exact times, delivered flat. Precise about the difference between words people treat as the same. Very occasionally a dry joke, unannounced.',
      topics: ['the roll', 'your token', 'the sundown bell', 'the open trial', 'Form Eleven', 'free blades'],
      voiceSamples: [
        'Your token lapses at sundown. Not at dusk. Sundown is a bell, and I ring it.',
        'Form eleven. The open trial. Three bouts, three licensed blades, no house colours. Sign here, or don’t.',
        'The roll doesn’t care who your grandfather is. That’s the only thing I like about it.',
        'I can’t help you. I can tell you which clause I’d read twice, if I were you.',
      ],
      appearance:
        'An adult woman, a neat grey clerk’s coat with ink-stained cuffs, hair pinned up with two brushes, round spectacles, and the forearms of somebody who used to train every day.',
      visualHook: 'Two writing brushes pinned through her hair like hairpins, one of them always wet.',
      silhouette: 'Behind a long counter, one hand flat on an open ledger, the other on the bell rope.',
      artSeed: 'sftr-minseo-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'unimpressed', 'amused'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'ferry_inn', activity: 'in her room above the Ferry Inn' },
        { startMinute: 480, endMinute: 1140, locationId: 'roll_office', activity: 'behind the counter at the Roll Office with the roll open' },
        { startMinute: 1140, endMinute: 1260, locationId: 'sword_street', activity: 'eating noodles standing up at the stall by the Roll Office' },
        { startMinute: 1260, endMinute: 1440, locationId: 'ferry_inn', activity: 'by the common-room fire with a ledger of her own' },
      ],
      homeLocationId: 'ferry_inn',
      knowledgeScope: ['the_roll', 'the_open_trial', 'free_blades', 'the_watch', 'the_sword_council'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'minseo_reads_the_clause',
          label: 'She tells you which clause to read twice',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
      ],
      attributes: { might: 11, agility: 13, mind: 16, presence: 11, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 7, tags: ['free-blade', 'clerk'] },
    },
  ],
  quests: [
    {
      id: 'q_struck',
      title: 'Struck From the Register',
      summary: 'Your sister has the house’s oldest blade raised over your name and has asked you to leave quietly. The whole house is kneeling, waiting to see what you say.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['siwon', 'jae', 'yeon', 'doha', 'han'],
      involvedLocationIds: ['register_hall', 'seol_courtyard'],
      knownRewardCopy: 'An answer to your sister, and whatever comes after it.',
      steps: [
        {
          id: 'answer_her',
          playerCopy: 'Answer your sister before the blade comes down.',
          directorNotes:
            'Every answer here is a real route and none of them is wrong. Siwon will not cut while the player is speaking to her. If the player refuses both leaving and fighting, the Grandmaster steps down from the dais and makes the cut himself, which is worse for everybody. If the player grabs the register, forty disciples stand up at once and nobody knows what the law says. Yeon watches the player’s hands, not the blade.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_quietly',
              label: 'Tell her you will go quietly',
              predicate: { flagsSet: ['used:bow_out'] },
              setsFlags: ['name_struck', 'left_quietly'],
              closesFlags: ['contested'],
            },
            {
              routeId: 'claimed_the_contest',
              label: 'Claim the right of contest',
              predicate: { flagsSet: ['used:claim_the_contest'] },
              setsFlags: ['contested'],
              closesFlags: ['left_quietly'],
            },
            {
              routeId: 'stood_there',
              label: 'Refuse to leave and refuse to fight',
              predicate: { flagsSet: ['used:hold_your_ground'] },
              setsFlags: ['name_struck', 'stood_your_ground', 'grandfather_cut_it'],
              closesFlags: ['contested', 'left_quietly'],
            },
            {
              routeId: 'walked_out',
              label: 'Walk out before she cuts',
              predicate: { flagsSet: ['visited:sword_street'] },
              setsFlags: ['name_struck', 'walked_out'],
              closesFlags: ['contested'],
            },
            {
              routeId: 'took_the_book',
              label: 'Take the register off its stand',
              predicate: { hasItems: ['house_register'] },
              setsFlags: ['took_the_register'],
              closesFlags: ['left_quietly'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['morning_over'], abilities: [], reputation: [] },
        },
        {
          id: 'why_today',
          playerCopy: 'Find out why the people who love you are so sure this had to happen.',
          directorNotes:
            'Four people know some of the answer and each one tells it differently. Siwon tells it as a promise she is breaking. The Grandmaster tells it as a house’s arithmetic. Han tells it in about nine words. Yeon tells it as a price. The ledger tells it as a line of accounts nobody reads. Whichever comes first is the version the player carries, and the others can contradict it later.',
          enterWhen: { flagsSet: ['morning_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'siwon_told_you',
              label: 'Get it from Siwon, alone',
              predicate: { flagsSet: ['used:speak_plainly'], minRelationship: [{ characterId: 'siwon', dimension: 'trust', value: 60 }] },
              setsFlags: ['siwon_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'han_told_you',
              label: 'Get it from Han',
              predicate: { flagsSet: ['spoke:han'], minRelationship: [{ characterId: 'han', dimension: 'trust', value: 55 }] },
              setsFlags: ['han_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'grandfather_told_you',
              label: 'Make your grandfather say it in the pavilion',
              predicate: {
                flagsSet: ['spoke:jae'],
                atLocation: 'pond_pavilion',
                minRelationship: [{ characterId: 'jae', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['heard_it_from_him'],
              closesFlags: [],
            },
            {
              routeId: 'yeon_told_you',
              label: 'Pay Yeon’s price for it',
              predicate: { flagsSet: ['spoke:yeon'], minRelationship: [{ characterId: 'yeon', dimension: 'trust', value: 40 }] },
              setsFlags: ['heard_it_from_geum'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_ledger',
              label: 'Find the bridge rent in the house accounts',
              predicate: { flagsSet: ['used:read_the_stance'], hasItems: ['house_ledger'] },
              setsFlags: ['found_the_bridge_rent'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['knows_there_is_a_pact'], abilities: [], reputation: [{ factionId: 'faction_seol', amount: 5 }] },
        },
      ],
    },
    {
      id: 'q_the_contest',
      title: 'The Right of Contest',
      summary: 'If you claim the right of contest, you fight your sister in the training yard, to first touch or a yield, in front of the whole house and the witness from House Geum. Win, and your name stays.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['contested'] },
      involvedCharacterIds: ['siwon', 'yeon', 'jae', 'doha'],
      involvedLocationIds: ['seol_courtyard'],
      knownRewardCopy: 'Your name, if you win. Something worse than losing it, possibly, if everyone sees how.',
      steps: [
        {
          id: 'the_yard',
          playerCopy: 'Fight Siwon in the yard.',
          directorNotes:
            'Siwon is the best first-cut sword of her generation and she comes in for real once it starts. The player cannot win with the house forms, which are what the player fails at. If the player waits for her, their hands know what to do, and everyone in the yard sees a Seol answer a blade, including the witness, who is bound to report it. Siwon knows this. She fights anyway.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'answered_her',
              label: 'Wait for her and answer the blade',
              predicate: { flagsSet: ['used:answer_the_blade'] },
              setsFlags: ['won_contest', 'name_kept', 'hand_seen'],
              closesFlags: ['name_struck'],
            },
            {
              routeId: 'yielded',
              label: 'Yield to her',
              predicate: { flagsSet: ['used:bow_out'] },
              setsFlags: ['yielded', 'name_struck'],
              closesFlags: ['name_kept'],
            },
            {
              routeId: 'fought_her_way',
              label: 'Go first, the house way',
              predicate: { flagsSet: ['used:house_forms'] },
              setsFlags: ['lost_contest', 'name_struck'],
              closesFlags: ['name_kept'],
            },
            {
              routeId: 'would_not_raise_it',
              label: 'Stand in the yard and refuse to raise your sword',
              predicate: { flagsSet: ['used:hold_your_ground'] },
              setsFlags: ['contest_refused', 'name_struck'],
              closesFlags: ['name_kept'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['contest_over'],
            abilities: [],
            reputation: [
              { factionId: 'faction_seol', amount: 10 },
              { factionId: 'faction_council', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_book',
      title: 'The Book in Your Hands',
      summary: 'If you take the register off its stand, nobody can cut a name out of a book they do not have, and the whole house will come after it.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['took_the_register'] },
      involvedCharacterIds: ['jae', 'siwon', 'doha', 'yeon'],
      involvedLocationIds: ['register_hall', 'pond_pavilion', 'ferry_inn', 'geum_house'],
      knownRewardCopy: 'Leverage, briefly. What you spend it on is the rest of your life.',
      steps: [
        {
          id: 'what_to_do_with_it',
          playerCopy: 'Decide what to do with your family’s register.',
          directorNotes:
            'The house cannot strike a name without the book, so for as long as the player has it they are still a Seol, and the whole house is hunting them for it. Doha leads the search and enjoys it. Taking it across the bridge is the worst thing a Seol has done in a hundred and forty years and House Geum will say so even while accepting it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'put_it_back',
              label: 'Put it back on the stand and let her cut',
              predicate: { flagsSet: ['used:bow_out'], atLocation: 'register_hall' },
              setsFlags: ['register_returned', 'name_struck'],
              closesFlags: ['register_hidden'],
            },
            {
              routeId: 'ransomed_your_name',
              label: 'Trade the book for your name in the pavilion',
              predicate: { flagsSet: ['used:work_the_room'], atLocation: 'pond_pavilion' },
              setsFlags: ['register_bargained', 'name_kept'],
              closesFlags: ['name_struck'],
            },
            {
              routeId: 'hid_it',
              label: 'Hide it at the Ferry Inn',
              predicate: { hasItems: ['house_register'], atLocation: 'ferry_inn' },
              setsFlags: ['register_hidden'],
              closesFlags: [],
            },
            {
              routeId: 'carried_it_across',
              label: 'Carry it across the bridge to House Geum',
              predicate: { hasItems: ['house_register'], atLocation: 'geum_house' },
              setsFlags: ['register_given_to_geum', 'feud_called'],
              closesFlags: ['register_returned'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['book_settled'], abilities: [], reputation: [{ factionId: 'faction_seol', amount: -5 }] },
        },
      ],
    },
    {
      id: 'q_sundown',
      title: 'Before Sundown',
      summary: 'If your name is cut, your sword token stops being legal at the sundown bell, and the watch takes any blade with no house behind it.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['name_struck'] },
      involvedCharacterIds: ['minseo', 'yeon', 'han'],
      involvedLocationIds: ['roll_office', 'geum_house', 'whetstone_room', 'ferry_inn'],
      knownRewardCopy: 'Somewhere to stand, or the decision to stand nowhere.',
      steps: [
        {
          id: 'somewhere_to_stand',
          playerCopy: 'Find somewhere to stand before the sundown bell.',
          directorNotes:
            'Five answers, none of them a fail. House Geum will write the player in today for one signature and one bout in their yard. The Roll Office will take Form Eleven for the open trial and issue a three-day trial token. Han will make room in the whetstone room for a servant without a name, the way he once did for himself. The player can hand their sword in. Or they can do nothing, and at 18:40 they are somebody carrying an unlicensed blade.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'across_the_bridge',
              label: 'Accept House Geum’s offer',
              predicate: { atLocation: 'geum_house', minRelationship: [{ characterId: 'yeon', dimension: 'trust', value: 40 }] },
              setsFlags: ['written_into_geum'],
              closesFlags: ['trial_token', 'stayed_as_servant'],
            },
            {
              routeId: 'the_open_trial',
              label: 'Enter the open trial at the Roll Office',
              predicate: { flagsSet: ['spoke:minseo'], atLocation: 'roll_office' },
              setsFlags: ['trial_token'],
              closesFlags: ['written_into_geum'],
            },
            {
              routeId: 'stayed_inside',
              label: 'Stay on with Han, as a servant',
              predicate: { flagsSet: ['spoke:han', 'used:bow_out'], atLocation: 'whetstone_room' },
              setsFlags: ['stayed_as_servant'],
              closesFlags: ['written_into_geum', 'trial_token'],
            },
            {
              routeId: 'handed_it_in',
              label: 'Hand your sword in at the Roll Office',
              predicate: { flagsSet: ['used:bow_out'], atLocation: 'roll_office' },
              setsFlags: ['gave_up_the_sword'],
              closesFlags: ['trial_token'],
            },
            {
              routeId: 'kept_it_anyway',
              label: 'Keep the sword and let the bell ring',
              predicate: { flagsSet: ['token_lapsed'] },
              setsFlags: ['carrying_unlicensed'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['sundown_answered'], abilities: [], reputation: [{ factionId: 'faction_watch', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_second_cut',
      title: 'The Second Cut',
      summary: 'Your hands answer a blade better than anybody in the house, and nobody has ever shown you the whole of what that is. Somebody in this city could.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows_there_is_a_pact'] },
      involvedCharacterIds: ['han', 'yeon', 'siwon'],
      involvedLocationIds: ['old_woodshed', 'geum_house', 'the_rings'],
      knownRewardCopy: 'The returning cut: the whole art the pact forbids a Seol to keep.',
      steps: [
        {
          id: 'learn_it',
          playerCopy: 'Learn the whole of the answering hand from somebody who has it.',
          directorNotes:
            'Four teachers, four different arts. Han throws a lit lantern at the player in the woodshed and says nothing at all. Yeon teaches it from her books and is shaken by how quickly the player outgrows them. The rings teach it the hard way, for money, in a mask. Siwon finally attacks the player for real, in the woodshed, and keeps attacking until the player answers properly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'han_threw_the_lantern',
              label: 'Let Han teach you in the woodshed',
              predicate: {
                flagsSet: ['used:answer_the_blade'],
                atLocation: 'old_woodshed',
                minRelationship: [{ characterId: 'han', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['second_cut_learned', 'taught_by_han'],
              closesFlags: [],
            },
            {
              routeId: 'yeon_showed_you',
              label: 'Learn it from Yeon’s books across the bridge',
              predicate: {
                flagsSet: ['used:answer_the_blade'],
                atLocation: 'geum_house',
                minRelationship: [{ characterId: 'yeon', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['second_cut_learned', 'taught_by_geum'],
              closesFlags: [],
            },
            {
              routeId: 'learned_it_in_the_rings',
              label: 'Learn it in the rings under the bridge',
              predicate: { flagsSet: ['used:answer_the_blade'], atLocation: 'the_rings' },
              setsFlags: ['second_cut_learned', 'taught_by_the_rings'],
              closesFlags: [],
            },
            {
              routeId: 'siwon_came_at_you',
              label: 'Let Siwon attack you for real in the woodshed',
              predicate: {
                flagsSet: ['used:answer_the_blade'],
                atLocation: 'old_woodshed',
                minRelationship: [{ characterId: 'siwon', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['second_cut_learned', 'taught_by_siwon'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['second_cut_learned'],
            abilities: ['the_returning_cut'],
            reputation: [
              { factionId: 'faction_geum', amount: 15 },
              { factionId: 'faction_rings', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_whetstone',
      title: 'The Whetstone Man',
      summary: 'Han has kept the house’s blades for forty-seven years, still calls you young master, and sweeps one patch of the yard twice. Nobody remembers what he was before.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['knows_there_is_a_pact'] },
      involvedCharacterIds: ['han', 'jae'],
      involvedLocationIds: ['whetstone_room', 'sealed_archive', 'pond_pavilion', 'register_hall'],
      knownRewardCopy: 'A name that was cut forty-seven years ago, and the question of whether it goes back.',
      steps: [
        {
          id: 'his_name',
          playerCopy: 'Find out who Han was before he was a servant.',
          directorNotes:
            'He will not say it inside the house unless asked plainly, and even then he says it to the blade he is sharpening. The cut page in the archive says it without words. The Grandmaster can say it, once, in the pavilion, and it costs him more than anything else in the story.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Ask Han plainly',
              predicate: { flagsSet: ['used:speak_plainly', 'spoke:han'], minRelationship: [{ characterId: 'han', dimension: 'trust', value: 60 }] },
              setsFlags: ['han_s_name_known', 'han_said_it'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_hole',
              label: 'Find the cut page in the archive',
              predicate: { hasItems: ['struck_page'] },
              setsFlags: ['han_s_name_known', 'found_the_struck_pages'],
              closesFlags: [],
            },
            {
              routeId: 'grandfather_said_it',
              label: 'Get the Grandmaster to say it',
              predicate: { atLocation: 'pond_pavilion', minRelationship: [{ characterId: 'jae', dimension: 'trust', value: 45 }] },
              setsFlags: ['han_s_name_known', 'jae_said_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['han_s_name_known'], abilities: [], reputation: [] },
        },
        {
          id: 'write_it_back',
          playerCopy: 'Decide what happens to a name cut out forty-seven years ago.',
          directorNotes:
            'Writing a struck name back into the register is not forbidden by house law, because nobody ever imagined it. It is forbidden by the pact, unless the pact is over. Han may not want it: he chose this life and he is entitled to keep it. The Grandmaster writing it himself is the most important thing he does in the story.',
          enterWhen: { flagsSet: ['han_s_name_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'wrote_it_back',
              label: 'Write his name back into the register yourself',
              predicate: { hasItems: ['house_register'], flagsSet: ['han_s_name_known'] },
              setsFlags: ['han_restored'],
              closesFlags: ['han_left_it'],
            },
            {
              routeId: 'grandfather_wrote_it',
              label: 'Ask the Grandmaster to write it',
              predicate: { atLocation: 'pond_pavilion', minRelationship: [{ characterId: 'jae', dimension: 'trust', value: 55 }] },
              setsFlags: ['han_restored', 'jae_wrote_it'],
              closesFlags: ['han_left_it'],
            },
            {
              routeId: 'han_said_leave_it',
              label: 'Let Han keep the life he chose',
              predicate: { minRelationship: [{ characterId: 'han', dimension: 'affection', value: 70 }] },
              setsFlags: ['han_left_it'],
              closesFlags: ['han_restored'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['whetstone_settled'], abilities: [], reputation: [{ factionId: 'faction_seol', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_the_pact',
      title: 'The Pact of the Bridge',
      summary: 'Your house pays House Geum every spring for something nobody will name, and it is the real reason the house wants your name gone. The words are written down somewhere under the register hall.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows_there_is_a_pact'] },
      involvedCharacterIds: ['jae', 'yeon', 'han', 'siwon'],
      involvedLocationIds: ['sealed_archive', 'register_hall', 'pond_pavilion', 'geum_house', 'bout_ground'],
      knownRewardCopy: 'The real reason, in ink, and the power to do something with it.',
      steps: [
        {
          id: 'get_the_words',
          playerCopy: 'Get into the sealed archive, or get the words some other way.',
          directorNotes:
            'The trapdoor key hangs in Han’s room. Taking it without asking is theft from the one person who has always been on the player’s side, and he will know. Forcing the trapdoor is loud. Yeon and the Grandmaster can both recite the pact from memory, and each leaves out a different clause.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_it',
              label: 'Open the trapdoor with the archive key',
              predicate: { hasItems: ['archive_key'] },
              setsFlags: ['archive_open'],
              closesFlags: [],
            },
            {
              routeId: 'forced_it',
              label: 'Force the trapdoor',
              predicate: { flagsSet: ['used:slip_away'], atLocation: 'register_hall' },
              setsFlags: ['archive_open', 'archive_forced'],
              closesFlags: [],
            },
            {
              routeId: 'yeon_recited_it',
              label: 'Have Yeon recite it',
              predicate: { flagsSet: ['spoke:yeon'], minRelationship: [{ characterId: 'yeon', dimension: 'trust', value: 55 }] },
              setsFlags: ['pact_known', 'heard_pact_from_geum'],
              closesFlags: [],
            },
            {
              routeId: 'grandfather_recited_it',
              label: 'Have the Grandmaster recite it',
              predicate: { atLocation: 'pond_pavilion', minRelationship: [{ characterId: 'jae', dimension: 'respect', value: 40 }] },
              setsFlags: ['pact_known', 'heard_pact_from_him'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['pact_sought'], abilities: [], reputation: [] },
        },
        {
          id: 'read_it',
          playerCopy: 'Read the pact for yourself.',
          directorNotes:
            'The copy in the cedar case has five clauses. Whoever recited it to the player left one out: the Grandmaster omits the bridge rent, Yeon omits the feud clause. Reading the original is the only way to have all five.',
          enterWhen: { flagsSet: ['pact_sought'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_scroll',
              label: 'Read the original',
              predicate: { hasItems: ['pact_scroll'] },
              setsFlags: ['pact_known', 'read_the_original'],
              closesFlags: [],
            },
            {
              routeId: 'took_their_word',
              label: 'Take somebody’s word for it',
              predicate: { flagsSet: ['pact_known'] },
              setsFlags: ['took_their_word'],
              closesFlags: ['read_the_original'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['pact_in_hand'], abilities: [], reputation: [] },
        },
        {
          id: 'what_to_do_with_it',
          playerCopy: 'Decide what happens to a hundred and forty years of secret.',
          directorNotes:
            'Saying it to the whole city at the Spring Bout ends the pact and shames both houses at once. Rewriting it needs both heirs and the Grandmaster at one table. Holding it over the Grandmaster gets the player what they want and makes them, for a while, the thing they hated. Leaving it sealed is a real choice and the house goes on exactly as it was.',
          enterWhen: { flagsSet: ['pact_in_hand'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_it_to_the_city',
              label: 'Say it out loud at the Spring Bout',
              predicate: { flagsSet: ['used:speak_plainly'], atLocation: 'bout_ground' },
              setsFlags: ['pact_exposed', 'pact_settled'],
              closesFlags: ['pact_kept'],
            },
            {
              routeId: 'rewrote_it',
              label: 'Rewrite it with Yeon and the Grandmaster',
              predicate: {
                flagsSet: ['spoke:yeon'],
                minRelationship: [
                  { characterId: 'yeon', dimension: 'trust', value: 65 },
                  { characterId: 'jae', dimension: 'respect', value: 45 },
                ],
              },
              setsFlags: ['pact_rewritten', 'pact_settled'],
              closesFlags: ['pact_kept'],
            },
            {
              routeId: 'held_it_over_him',
              label: 'Use it against the Grandmaster',
              predicate: { flagsSet: ['used:work_the_room'], atLocation: 'pond_pavilion' },
              setsFlags: ['pact_as_leverage', 'pact_settled'],
              closesFlags: ['pact_kept'],
            },
            {
              routeId: 'left_it_sealed',
              label: 'Put it back in the case and say nothing',
              predicate: { flagsSet: ['used:bow_out', 'pact_in_hand'] },
              setsFlags: ['pact_kept'],
              closesFlags: ['pact_settled'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['pact_decided'],
            abilities: [],
            reputation: [
              { factionId: 'faction_council', amount: 20 },
              { factionId: 'faction_geum', amount: 15 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_spring_bout',
      title: 'The Spring Bout',
      summary: 'On the third afternoon the seven houses fight on the island bout ground in front of four thousand people. The heirs’ bout is House Seol’s heir against Yeon, and whose colours you wear on the sand, if any, is up to you.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['bout_drawn'] },
      involvedCharacterIds: ['siwon', 'yeon', 'doha', 'jae', 'minseo'],
      involvedLocationIds: ['bout_ground'],
      knownRewardCopy: 'The whole city watching you, for once, for the right reason or the wrong one.',
      steps: [
        {
          id: 'the_ring',
          playerCopy: 'Decide whose colours you wear on the sand, or whether you watch.',
          directorNotes:
            'If a feud has been called, the heirs’ bout is the feud bout, and House Seol’s seat rides on House Seol’s heir against Yeon, the first cut against the second. A Seol still in the register can fight for the house. A Geum can fight for Geum. A free blade fights the open trial in the morning and is on the sand by afternoon. Anybody can stand in Siwon’s corner. Watching from the stands is allowed and it is not nothing.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fought_for_geum',
              label: 'Fight in House Geum’s gold',
              predicate: { flagsSet: ['written_into_geum', 'used:answer_the_blade'], atLocation: 'bout_ground' },
              setsFlags: ['bout_fought', 'fought_for_geum'],
              closesFlags: ['fought_for_seol'],
            },
            {
              routeId: 'fought_as_free_blade',
              label: 'Fight the open trial with no colours at all',
              predicate: { flagsSet: ['trial_token', 'used:answer_the_blade'], atLocation: 'bout_ground' },
              setsFlags: ['bout_fought', 'free_blade'],
              closesFlags: ['fought_for_geum'],
            },
            {
              routeId: 'fought_for_seol',
              label: 'Fight for House Seol, still in its register',
              predicate: { flagsSet: ['name_kept', 'used:answer_the_blade'], atLocation: 'bout_ground' },
              setsFlags: ['bout_fought', 'fought_for_seol', 'pact_settled'],
              closesFlags: ['fought_for_geum'],
            },
            {
              routeId: 'stood_in_her_corner',
              label: 'Stand in Siwon’s corner',
              predicate: { flagsSet: ['spoke:siwon'], atLocation: 'bout_ground' },
              setsFlags: ['seconded_siwon'],
              closesFlags: [],
            },
            {
              routeId: 'watched_it',
              label: 'Watch from the stands',
              predicate: { flagsSet: ['spring_bout_began'] },
              setsFlags: ['bout_watched'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['bout_over'],
            abilities: [],
            reputation: [
              { factionId: 'faction_council', amount: 15 },
              { factionId: 'faction_watch', amount: 10 },
              { factionId: 'faction_geum', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_doha',
      title: 'What Doha Saw',
      summary: 'Your cousin has hated you precisely for years, and the way he talks about the woodshed says he has seen something there. He also owes the bridge rings money.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['morning_over'] },
      involvedCharacterIds: ['doha'],
      involvedLocationIds: ['seol_courtyard', 'sword_street', 'the_rings'],
      knownRewardCopy: 'The one person in the house who already knew, and what it cost him.',
      steps: [
        {
          id: 'doha_s_secret',
          playerCopy: 'Find out why your cousin hates you this precisely.',
          directorNotes:
            'Doha is not a villain. He is the hardest worker in the house, he has known for years that it was not enough, and he spied on the woodshed long enough to know exactly why. Beating him, asking him straight, catching him under the bridge, or paying what he owes all get the truth out of him, and each leaves a different cousin behind.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_said_it',
              label: 'Ask him straight what he saw',
              predicate: { flagsSet: ['used:speak_plainly', 'spoke:doha'], minRelationship: [{ characterId: 'doha', dimension: 'respect', value: 35 }] },
              setsFlags: ['doha_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'caught_at_the_rings',
              label: 'Catch him under the bridge',
              predicate: { flagsSet: ['spoke:doha'], atLocation: 'the_rings' },
              setsFlags: ['doha_exposed'],
              closesFlags: ['doha_owes_you'],
            },
            {
              routeId: 'paid_his_debt',
              label: 'Settle what he owes the rings',
              predicate: { flagsSet: ['used:work_the_room', 'doha_in_trouble'] },
              setsFlags: ['doha_owes_you'],
              closesFlags: ['doha_exposed'],
            },
            {
              routeId: 'beat_him',
              label: 'Let him swing first, and answer',
              predicate: { flagsSet: ['used:answer_the_blade', 'spoke:doha'] },
              setsFlags: ['doha_beaten'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['doha_settled'],
            abilities: [],
            reputation: [
              { factionId: 'faction_rings', amount: 10 },
              { factionId: 'faction_seol', amount: 5 },
            ],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_notice',
      atWorldMinute: 12 * 60,
      locationId: 'sword_street',
      publicCopy: 'A House Seol runner in white goes down Sword Street at a trot with a folded notice for the Roll Office, and three teahouse tables stop talking to watch.',
      directorNotes:
        'The striking is now a city matter. Minseo enters it on the roll within the hour. Anybody on Sword Street this afternoon knows the struck heir’s face.',
      setsFlags: ['notice_filed'],
      cancelledByFlags: ['name_kept'],
      requiresFlags: ['name_struck'],
      movesCharacters: [],
    },
    {
      id: 'we_yeon_at_the_inn',
      atWorldMinute: 14 * 60 + 30,
      locationId: 'ferry_inn',
      publicCopy: 'Geum Yeon is sitting in the Ferry Inn’s common room with two cups of tea and a letter sealed in gold wax, and she has clearly been told where the struck go first.',
      directorNotes:
        'She is here to make House Geum’s offer in person, before sundown, with the price written on the outside. She is also here because she wants to see the player’s face when they read it.',
      setsFlags: ['geum_offer_made'],
      cancelledByFlags: ['written_into_geum'],
      requiresFlags: ['name_struck'],
      movesCharacters: [{ characterId: 'yeon', toLocationId: 'ferry_inn' }],
    },
    {
      id: 'we_sundown_bell',
      atWorldMinute: 18 * 60 + 40,
      locationId: 'roll_office',
      publicCopy: 'The bronze bell over the Roll Office rings sundown, eleven strokes, and every token issued to a struck name stops being worth its brass.',
      directorNotes:
        'From now on the watch can take the player’s sword on sight if they carry it inside the walls. Minseo rang the bell herself and did not hurry or delay it by a single stroke.',
      setsFlags: ['token_lapsed'],
      cancelledByFlags: ['name_kept', 'written_into_geum', 'trial_token', 'gave_up_the_sword'],
      requiresFlags: ['name_struck'],
      movesCharacters: [],
    },
    {
      id: 'we_rings_open',
      atWorldMinute: 21 * 60,
      locationId: 'the_rings',
      publicCopy: 'The lanterns go up under the Long Bridge, the first ring-boss chalks the night’s odds on a slate, and somebody has written a price for a masked fighter who never swings first.',
      directorNotes:
        'The rings are open every night. The chalked price is for whoever matches that description, and a player who has fought here before will recognise it as theirs.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_han_s_lantern',
      atWorldMinute: 1440 + 5 * 60 + 20,
      locationId: 'old_woodshed',
      publicCopy: 'Before dawn a paper lantern is burning in the old woodshed, hung from the cord you used to practise with, and Han is sitting on the chopping block beside it, waiting.',
      directorNotes:
        'He means to throw it. He has waited forty-seven years to teach somebody the whole of what he was struck for, and he has decided the morning after a striking is the right time.',
      setsFlags: ['han_waiting'],
      cancelledByFlags: ['second_cut_learned'],
      requiresFlags: ['morning_over'],
      movesCharacters: [{ characterId: 'han', toLocationId: 'old_woodshed' }],
    },
    {
      id: 'we_the_feud_letter',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'seol_courtyard',
      publicCopy: 'A House Geum runner delivers a letter sealed in gold wax to the Seol gate: a feud bout is called for House Seol’s seat on the Sword Council, to be fought at the Spring Bout.',
      directorNotes:
        'The witness saw a Seol in the register answer a blade, and the pact gave Geum this right. Yeon’s elders sent it; Yeon did not argue. The Grandmaster reads it in the yard and folds it very small.',
      setsFlags: ['feud_called'],
      cancelledByFlags: ['pact_settled'],
      requiresFlags: ['hand_seen'],
      movesCharacters: [{ characterId: 'jae', toLocationId: 'seol_courtyard' }],
    },
    {
      id: 'we_the_draw',
      atWorldMinute: 1440 + 12 * 60,
      locationId: 'bout_ground',
      publicCopy: 'The Spring Bout draw goes up on the bout ground gate: the heirs’ bout, tomorrow afternoon, House Seol’s heir against House Geum’s.',
      directorNotes:
        'House Seol’s heir against Yeon, the first cut against the second, in front of four thousand people: Siwon if she made the cut, the player if their name stayed. Doha has already been to the gambling end of Sword Street with the news.',
      setsFlags: ['bout_drawn'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_grandfather_sends',
      atWorldMinute: 1440 + 19 * 60 + 30,
      locationId: null,
      publicCopy: 'Han finds you wherever you are, with one sentence from the Grandmaster: tea, tonight, in the pavilion, alone.',
      directorNotes:
        'The Grandmaster has decided to explain himself once. He will pour the tea himself. He will not say Han’s name unless the player says it first.',
      setsFlags: ['summoned_to_tea'],
      cancelledByFlags: ['heard_it_from_him'],
      requiresFlags: ['morning_over'],
      movesCharacters: [],
    },
    {
      id: 'we_doha_s_debt',
      atWorldMinute: 1440 + 22 * 60,
      locationId: 'the_rings',
      publicCopy: 'A ring-boss under the bridge is asking loudly for Seol Doha by name, and Doha is standing very still with his silver ring in his fist.',
      directorNotes:
        'He owes more than he can pay and has bet the rest on the Spring Bout. If nobody helps him, he will do something stupid before the bout, probably to Siwon’s chances.',
      setsFlags: ['doha_in_trouble'],
      cancelledByFlags: ['doha_settled'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'doha', toLocationId: 'the_rings' }],
    },
    {
      id: 'we_spring_bout',
      atWorldMinute: 2 * 1440 + 15 * 60,
      locationId: 'bout_ground',
      publicCopy: 'The Spring Bout opens on the island: seven house banners, four thousand people, the Sword Council under its awning, and one ring of raked sand.',
      directorNotes:
        'Every named person in the story is here. Whatever the player has done in three days is visible from the stands, and somebody will say so out loud.',
      setsFlags: ['spring_bout_began'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'siwon', toLocationId: 'bout_ground' },
        { characterId: 'yeon', toLocationId: 'bout_ground' },
        { characterId: 'doha', toLocationId: 'bout_ground' },
        { characterId: 'jae', toLocationId: 'bout_ground' },
        { characterId: 'minseo', toLocationId: 'bout_ground' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_name',
      kind: 'FINALE',
      label: 'Whether your name is in a book by the end',
      seedHint: 'The register open to your page, and your name the last one written in it.',
      payoffHint: 'A name written somewhere: Seol’s register, Geum’s, the city roll in your own hand, or nowhere, on purpose.',
      weight: 1,
    },
    {
      id: 'p_why_siwon',
      kind: 'RELATIONSHIP',
      label: 'Why your sister agreed to hold the blade',
      seedHint: 'Her hands are steady and her eyes are not.',
      payoffHint: 'Three days ago the Grandmaster told her the real reason and made her promise, and the alternative was Doha holding it.',
      weight: 0.9,
    },
    {
      id: 'p_the_hand',
      kind: 'MYSTERY',
      label: 'What your hands do when nobody is testing them',
      seedHint: 'Fifteen years of night practice in the woodshed, and she never once landed a touch.',
      payoffHint: 'The second cut: the answering art House Seol has been striking out of itself for a hundred and forty years.',
      weight: 0.85,
    },
    {
      id: 'p_who_han_was',
      kind: 'MYSTERY',
      label: 'Who Han was before he swept the yard',
      seedHint: 'He still calls you young master, and he sweeps one patch of the sand twice.',
      payoffHint: 'A hole in one of the register’s original pages, forty-seven years old, the exact shape of his name.',
      weight: 0.7,
    },
    {
      id: 'p_the_witness',
      kind: 'RIVAL',
      label: 'The witness from across the bridge',
      seedHint: 'She has come to the morning rite every day for a month and watches your hands, not the blade.',
      payoffHint: 'A hundred and forty years of bridge rent, and the one thing House Geum wants that money cannot buy.',
      weight: 0.75,
    },
  ],
  archetypes: [
    {
      id: 'arch_training',
      name: 'You Never Stopped Training',
      role: 'Sword training and stamina',
      summary: 'You trained the house forms every dawn after you failed them, so you are strong, hard to tire, and you know exactly how every form should look.',
      playstyle: ['Physical', 'Stubborn', 'Knows the forms'],
      blurb: 'Three failures, and you were in the yard at five the next morning anyway. The disciples stopped laughing at about the second year.',
      attributeBonus: { might: 2, resolve: 2 },
      skillProficiencies: { forms: 2, counter: 1, plain_speech: 2 },
      startingItems: [{ itemId: 'third_lantern', qty: 1 }],
      startingAbilities: ['answer_the_blade', 'house_forms'],
      startingReputation: [{ factionId: 'faction_seol', amount: 10 }],
    },
    {
      id: 'arch_library',
      name: 'You Read Every Manual',
      role: 'Sword lore and reading people',
      summary: 'You gave up on the forms and read the house library instead, so you can name any style in the city and see what somebody is about to do.',
      playstyle: ['Observant', 'Careful', 'Knows every style'],
      blurb: 'Eleven hundred manuals, three of them in your handwriting now, because the originals were falling apart and nobody else would copy them.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { swordlore: 3, bearing: 1, breath: 1 },
      startingItems: [{ itemId: 'form_notebook', qty: 1 }],
      startingAbilities: ['answer_the_blade', 'read_the_stance'],
      startingReputation: [],
    },
    {
      id: 'arch_household',
      name: 'You Ran the Household',
      role: 'Social talk and house business',
      summary: 'You kept the house accounts and dealt with every merchant and servant, so people talk to you, owe you favours, and you know where the money goes.',
      playstyle: ['Talker', 'Connected', 'Knows the money'],
      blurb: 'Somebody had to pay the rice merchant while the heirs were busy failing lanterns. It was you, and the rice merchant liked you better anyway.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { bearing: 3, streetwise: 1, plain_speech: 1 },
      startingItems: [{ itemId: 'house_ledger', qty: 1 }],
      startingAbilities: ['answer_the_blade', 'work_the_room'],
      startingReputation: [{ factionId: 'faction_seol', amount: 15 }],
    },
    {
      id: 'arch_rings',
      name: 'You Fought Under the Bridge',
      role: 'Street fights and stealth',
      summary: 'You have been sneaking out to the illegal fight rings in a mask for two years, so you already know you can fight, and you know the city at night.',
      playstyle: ['Aggressive', 'Secretive', 'Street smart'],
      blurb: 'Nobody under the bridge knows your name. They know the mask, and that it never swings first, and that it has not lost yet.',
      attributeBonus: { agility: 3, resolve: 1 },
      skillProficiencies: { counter: 3, streetwise: 2 },
      startingItems: [{ itemId: 'ring_mask', qty: 1 }],
      startingAbilities: ['answer_the_blade', 'slip_away'],
      startingReputation: [{ factionId: 'faction_rings', amount: 20 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is the name in the register?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Seol Haram' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him', helpText: 'Siwon calls you brother.' },
    {
      id: 'archetype',
      label: 'What did you do with the years after you failed?',
      helpText:
        'Three springs passed between your first failed sword test and this morning. What you did with them sets what you are good at, and it is fixed for the whole story: it cannot be changed later. It does not decide whether you leave quietly, fight your sister, or ever come back. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does nobody in the house know about you?',
      helpText: 'One true thing the house never noticed. Most people write one plain sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      advanced: true,
      maxLength: 300,
      placeholder: 'e.g. I can catch anything thrown at me without looking, and I have never once said so.',
    },
    {
      id: 'first_instinct',
      label: 'What is your first instinct in the hall?',
      helpText: 'A starting temperament, not a promise. You can do the opposite on turn one and the house will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'go_quietly', label: 'Spare her. Go quietly and work out the rest outside' },
        { id: 'fight_for_it', label: 'Claim the contest. Make them see it' },
        { id: 'make_him_say_it', label: 'Make your grandfather say it to your face' },
        { id: 'take_the_book', label: 'Take the book and make them come and get it' },
        { id: 'watch_first', label: 'Watch everybody and say nothing until you understand' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the hall see when you stand there?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Taller than my grandfather, house white that no longer fits, and a sword I have not drawn in front of anyone in a year.',
    },
  ],
  /**
   * Twelve destinations, all four rarities, and half of them are some kind of
   * loss that is not written as a punishment.
   *
   * "The Feud Bout" is the one worth knowing about: it is reachable by winning
   * the contest, which is the move a power-fantasy player makes first, and it
   * costs the house its seat unless somebody deals with the pact before the
   * Spring Bout. Winning is not free. "The Long Road" is walking away, and the
   * Grandmaster has already paid for it.
   */
  endings: [
    {
      id: 'end_a_name_of_your_own',
      name: 'A Name of Your Own',
      rarity: 'COMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['name_struck', 'sundown_answered'],
        flagsUnset: ['written_into_geum', 'stayed_as_servant', 'left_the_map', 'free_blade'],
      },
      condition:
        'The quiet one. The player was struck, got through the sundown bell, and did not take any house’s offer. Nothing was won and nothing is over; they have a room at the Ferry Inn, a city that knows their face, and a life to start with no family name in front of it. Play it small and practical, and have somebody from the house turn up anyway.',
      epilogue:
        'The landlady stops charging for the second blanket in the second week. Siwon comes on the seventh day, in plain clothes, with a bowl of something she says she did not make. She does not mention the register. Neither do you. You both count the bowls.',
      hint: '',
    },
    {
      id: 'end_the_feud_bout',
      name: 'The Feud Bout',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['feud_called', 'bout_over'],
        flagsUnset: ['pact_settled'],
      },
      condition:
        'The pact stood and House Geum used it. The heirs’ bout was a feud bout, the first cut met the second in front of four thousand people, and House Seol lost its seat on the Sword Council. This must not read as a punishment for winning the contest: it is what the pact was built to do, and the player’s only mistake was being exactly what they are.',
      epilogue:
        'The disciples leave over a month, politely, in ones and twos. The Grandmaster sells the pond pavilion to pay the last bridge rent and then stops paying it. The yard is quieter. Somebody still rakes it every morning, and one patch of it twice.',
      hint: 'A letter in gold wax would change everything.',
    },
    {
      id: 'end_no_token',
      name: 'No Token',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['carrying_unlicensed'] },
      condition:
        'The player kept the sword past the bell with nothing behind it. The watch knows their face and the rings know their mask. This is a life in the gaps of the city, fighting for coin where nobody asks names, and it should be written as exciting and precarious rather than as a fall.',
      epilogue:
        'Under the bridge they call you by the mask. The price on the slate goes up every week. Twice the watch comes down the steps, and twice somebody in a gold coat is standing between you and them before you have to decide anything.',
      hint: '',
    },
    {
      id: 'end_across_the_bridge',
      name: 'Across the Bridge',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['written_into_geum', 'bout_over'],
        minFactionReputation: [{ factionId: 'faction_geum', value: 35 }],
      },
      condition:
        'The player signed House Geum’s register and fought in its gold. They are now the thing House Seol struck its own brother to keep away: a Seol-born answering hand on the far bank. Write the strangeness of it, the new yard, the books they have to unlearn, and Siwon across the river being polite to them in public.',
      epilogue:
        'House Geum’s disciples stop reading from the books by midsummer. Yeon complains about it to anybody who will listen and is visibly delighted. Twice a year the two houses meet at the Spring Bout, and twice a year the two heirs bow to each other a little longer than protocol asks.',
      hint: '',
    },
    {
      id: 'end_free_blade',
      name: 'Free Blade',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['free_blade'],
        minFactionReputation: [{ factionId: 'faction_watch', value: 25 }],
      },
      condition:
        'The player won the open trial with no colours at all and wrote a family name of their own choosing on the last line of Form Eleven. Name the name they chose if they said it. This is the self-made ending, and it should feel earned and slightly lonely and very good.',
      epilogue:
        'The token is new brass and says only the city seal. Minseo files it without comment and then, at the noodle stall that evening, buys the second bowl. By autumn three struck names from three different houses have come to ask you how you did it.',
      hint: 'Form Eleven has a longer last line than it needs.',
    },
    {
      id: 'end_the_whetstone_room',
      name: 'The Whetstone Room',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['stayed_as_servant'] },
      condition:
        'The player chose Han’s life: no name, inside the walls, keeping the blades of the house that cut them. It can be read as surrender or as love and it is both. Do not resolve that. Write the work, the stones, the lamp, and the two of them not talking about it.',
      epilogue:
        'Han teaches you the stones first and the yard second. You learn to sweep the one patch twice before he tells you why. Siwon brings her sword to be sharpened every week and stays longer each time, and never once asks for anybody else to do it.',
      hint: '',
    },
    {
      id: 'end_the_long_road',
      name: 'The Long Road',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player left Haseong, most likely on the dawn ferry the Grandmaster paid for, and did not come back for the Spring Bout. Do not make this a tragedy and do not redeem it. It is a coherent answer to a family that cut you out, and the people it costs most stay behind.',
      epilogue:
        'The ferry is slow and the river is wide. Somewhere south there are cities with no sword houses at all, and a person who answers a blade better than anybody alive can make a living in any of them. A letter follows you, months later, in Siwon’s hand, with nothing in it but a count of the days.',
      hint: '',
    },
    {
      id: 'end_the_name_stays',
      name: 'The Name Stays',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['name_kept', 'pact_settled'],
        minRelationship: [{ characterId: 'siwon', dimension: 'trust', value: 60 }],
      },
      condition:
        'The player kept their name in the register and the pact that made it impossible is over, by bout, by bargain or by saying it out loud. They are still a Seol, with the hand the house spent a hundred and forty years cutting out of itself. Siwon is heir or is not, by her choice. Write a house that has to change and knows it.',
      epilogue:
        'The register gets a new page at the back, ruled differently, for a style the house has never had a name for. Siwon keeps the morning rite. Some mornings she makes you go first, just to watch you hate it.',
      hint: 'Winning the contest is only half of it.',
    },
    {
      id: 'end_said_out_loud',
      name: 'Said Out Loud',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['pact_exposed', 'bout_over'] },
      condition:
        'The player told four thousand people at the Spring Bout what two houses have hidden for a hundred and forty years. Both houses are shamed at once and neither can use the pact again. This is the loudest ending and it should cost something: the Grandmaster’s face, Yeon’s elders, a city that now knows every struck name had a reason.',
      epilogue:
        'The Sword Council sits for nine days on it. The bridge rent stops. Five struck names are read aloud in the register hall, one of them belonging to an old man who stands at the back by the door and does not move until it is over.',
      hint: '',
    },
    {
      id: 'end_her_second',
      name: 'Her Second',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['seconded_siwon', 'siwon_told_you'],
        minRelationship: [{ characterId: 'siwon', dimension: 'trust', value: 70 }],
      },
      condition:
        'Siwon broke her promise and told the player the truth, and the player stood in her corner at the Spring Bout anyway, with or without a name. This is the sibling ending. Write it as two people on the same side of a ring for the first time in public, and do not make anybody say they forgive anybody.',
      epilogue:
        'Whatever happened on the sand, she walked off it and handed you her sword to hold before she handed it to anybody else. The house noticed. The woodshed has a lamp in it most nights again, and the sound of two practice swords.',
      hint: 'She will tell you, alone, if you ask her the right question.',
    },
    {
      id: 'end_across_the_ring',
      name: 'Across the Ring',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['bout_over'],
        minRelationship: [
          { characterId: 'yeon', dimension: 'affection', value: 70 },
          { characterId: 'yeon', dimension: 'trust', value: 60 },
        ],
      },
      condition:
        'Yeon stopped being the witness. Whatever the player is now, Seol, Geum, free blade or nobody, the two of them have chosen each other on terms both of them said out loud. Romantic, tense, funny, and never further than a kiss on the page. Two rival heirs, or one heir and one struck name, and a city that will have opinions.',
      epilogue:
        'The teahouse on Sword Street keeps a table for two that both houses pretend not to see. She still names her price for everything. You have started paying it without haggling, which she says is the most frightening thing anybody has ever done to her.',
      hint: '',
    },
    {
      id: 'end_two_names',
      name: 'Two Names',
      rarity: 'UNIQUE',
      minTurn: 36,
      requires: { flagsSet: ['han_restored', 'pact_settled'] },
      condition:
        'The pact is over and Han’s name is back in the register, forty-seven years after it was cut. This is the hidden ending and it belongs to the two old brothers as much as to the player. Write the brush, the ink, the hall, and the Grandmaster’s hands, and let Han decide what he does with it.',
      epilogue:
        'He keeps sweeping the yard. He says somebody has to. But the morning rite has two old men at it now, one on the dais and one by the door, and on the first morning of spring the one by the door is asked to come and stand at the front, and does.',
      hint: 'There are five holes in the old pages. One of them is the size of a short name.',
    },
  ],
  opening:
    "Forty people kneel in the hall. Two are standing: you, and your sister.\n\nOn the stand lies the family register, open to your page. Your name is the last one in it.\n\nShe raises the house’s oldest blade over the paper.\n\n\"Say you’ll leave quietly, brother,\" Siwon says. \"Then I won’t have to fight you.\"\n\nHer hands are steady. Her eyes are not.\n\nOn the dais, your grandfather’s face shows nothing. By the door, a woman in another house’s gold watches you, not the blade.\n\nHouse law gives you one right: challenge whoever holds the blade, in the yard. Win, and your name stays.\n\nUnder her breath, Siwon is counting.\n\n\"Quietly, or the yard,\" she says. \"Answer me.\"",
  openingPanel: {
    assetKey: 'story_struck_from_the_register/opening',
    alt: 'Seol Siwon in house white, hair tied high, holds a short blade level over an open folding book on a lacquer stand, hands steady, eyes on you, rows of kneeling figures behind her.',
  },
  openingSuggestions: [
    "\"I’ll go. But I want to hear why from you, Siwon. Not from him.\"",
    'I unbuckle my sword and lay it across my own name on the register.',
    "\"I claim the contest. The yard, sister. Now.\"",
  ],
  coverDirection: [
    'SUBJECT: Seol Siwon, the sister who holds the blade, alone and unmistakable in the foreground of a key visual for a martial-arts drama anime about a sword house cutting its heir out of the family book.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Slim and straight-backed, long black hair tied high with a cord of sword-grip binding, sharp dark eyes, plain white martial-arts training clothes with the sleeves tied back at the shoulders.',
    'Both hands hold a short single-edged blade level in front of her, elbows locked, its edge over an open folding book of pale paper on a black lacquer stand at the bottom of the frame.',
    'The pages show only faint grey ruled lines: no letters, no numbers, nothing that reads as writing.',
    'One thin line of red ink runs across the open page under the blade, and the blade’s edge catches a hard line of white light.',
    'Her expression is steady and set, jaw tight, eyes straight at the viewer, holding something back.',
    'HER FACE STAYS CLEAN: no tears, cuts, ink, red marks or shadows on her face or skin.',
    'Every red ink and light effect stays on the blade, the page and the title, never on her face.',
    'BEHIND HER, soft and secondary: a long dark wooden ancestral hall, paper screens with morning light coming through, rows of figures in white kneeling with their heads bowed,',
    'a still figure in grey robes seated on a raised dais, and a figure in a dark gold coat by the door, all in soft focus.',
    'LIGHT: pale cool morning light through the paper screens, a warm gold glow from the hall behind her, and a cold white glint along the blade.',
    'TITLE: the words Struck From the Register painted into the art in the upper third as a bold white brush-lettered logo with a thin black ink edge,',
    'spelled exactly Struck From the Register, in title case with a lowercase the, large and legible at thumbnail size. A single thin red brush stroke strikes through the word Register only, without hiding any letter. No other text anywhere.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const STRUCK_FROM_THE_REGISTER = StoryVersion.parse(raw);
