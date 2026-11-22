import { StoryVersion } from '@plotbreak/contracts';

/**
 * "One-Year Bride" — a contract marriage on the first night of it.
 *
 * Bible: `docs/story-bibles/new50/20_ONE_YEAR_BRIDE.md`. Story #20 of the
 * fifty-story slate, built on Good Morning, Husband's shape: one relationship
 * at the centre, a small cast who each want something specific this week, and
 * a domestic setting where ordinary scenes are the game.
 *
 * The inversion is the point. Good Morning, Husband starts four years deep and
 * asks whether you keep it. This starts six hours deep, with a typed page of
 * terms, and asks what it turns into. Reina is not a prize and not a tease: she
 * has a deadline, an ex with a clipboard, a father who negotiates like a man
 * giving presents, and a reason for choosing this family that she has made a
 * rule against asking about.
 *
 * Playable span: the first fortnight in close-up — the signing, the estate
 * lawyer's first visit that same night, her father at the counter, the first
 * Sunday dinner, the storm, the lantern festival — and then the year in jumps
 * to the anniversary, which is where certification and most endings live.
 *
 * What production reads. `runTurnPure` sees the premise, tone guide, hard
 * canon, cast, opening, style examples, places, quest items, factions, quest
 * summaries, world events and the first twelve endings. It never sees step
 * notes, promises, resources or the ability list except the chosen
 * archetype's starting abilities. So the twelve rules are written out in full
 * twice — in hard canon and on the quest item the player starts holding — and
 * every archetype starts with one ability that tells the storyteller what it
 * is for.
 *
 * Three invisible variables. Energy is the one honest GOOD_HIGH, because
 * `resolveRest` refills those and a restaurant day after a wedding genuinely
 * runs out. Exposure comes first among the descending pair on purpose: public
 * violence raises the first GOOD_LOW in array order, and a scene on the pier is
 * gossip before it is anything else. Her Guard drifts down on its own because
 * forced proximity does that, and pushing on rule five puts it back up.
 */

const raw = {
  id: 'sv_one_year_bride_1',
  storyId: 'story_one_year_bride',
  version: 1,
  title: 'One-Year Bride',
  fantasyLabel: 'Married for a year. Rule one: don’t fall.',
  hook: 'To save the family restaurant you married a stranger for a year. She moves in tonight with twelve rules, and rule one is: don’t fall for me.',
  premise:
    'Your grandfather’s restaurant sits at the end of an old timber pier in a small harbour town, and it has one week left. Two winters ago a storm wrecked the end of the pier, and he borrowed against the restaurant to rebuild it. The lender has called the loan. Next Friday the restaurant, and the flat above it where you live, go to auction.\n\n' +
    'So this afternoon, at the town’s registry office, you married a stranger.\n\n' +
    'Reina Kurosawa is a lawyer from the city. Her grandmother died last winter and left her a house on the headland across the bay, on one condition: Reina gets it a year after she marries, if the estate’s lawyer will sign that the marriage was real. If he won’t, the house goes to her father, who has a buyer waiting.\n\n' +
    'Her offer: tomorrow she buys your grandfather’s debt. On your first anniversary she tears it up. Break the deal before then and you owe it to her instead.\n\n' +
    'Tonight she moves into your one-bedroom flat with two suitcases, a lemon tree and twelve rules. Your grandfather has been told it is love. Auntie Bo, who has run his dining room for thirty-one years, is already counting toothbrushes. The estate’s lawyer is Reina’s ex.\n\n' +
    'You need to keep this marriage looking real for a year, or lose the restaurant. Rule one says don’t fall for her. Nobody has said what happens if she falls for you.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Contract marriage', 'Slice of life', 'Comedy', 'Drama'],
  mechanicsChips: [
    'Twelve rules, one left blank',
    'She can say no',
    'An ex with a clipboard',
    'Her father has a better offer',
    'A year, played your way',
  ],
  contentDescriptors: ['ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can sign on turn one and spend a year being excellent flatmates, write a twelfth rule she did not expect, tear the page in half, or take her father’s money. Reina is not waiting to be won. She wrote rule one for a reason, and it is not the reason she gives.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'the_flat',
    startWorldMinute: 21 * 60 + 30,
    startingItems: [
      { itemId: 'the_rules', qty: 1 },
      { itemId: 'wedding_ring', qty: 1 },
      { itemId: 'marriage_certificate', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-eight. Reina Kurosawa is twenty-seven, Felix Arden thirty, Auntie Bo (Bo-mi Choi) fifty-eight, Masaru Kurosawa fifty-three and Grandpa Teo (Teodoro Reyes) seventy-nine. Reina’s grandmother, Chiyo Kurosawa, died last winter at seventy-eight.',
      'Sorrel Bay is a small harbour town an hour by train from the city. Teo’s is a twelve-table charcoal seafood grill at the end of the town’s old timber pier, opened by the player’s grandfather, Teodoro Reyes, fifty-one years ago. The player grew up in it and will inherit it. The player lives in the one-bedroom flat above the restaurant; Grandpa Teo lives in a converted boathouse under the land end of the pier.',
      'Two winters ago a storm wrecked the end of the pier, and Teo borrowed against the restaurant to rebuild. The lender has called the loan. Unless it is repaid in full, the restaurant and the flat above it are sold at auction next Friday at ten.',
      'At four o’clock this afternoon, at the Sorrel Bay registry office, the player married Reina Kurosawa, whom they had met three times. The marriage is legally real. Grandpa Teo and Auntie Bo were the witnesses, and both have been told it is a whirlwind romance.',
      'Chiyo Kurosawa left Reina the Cliff House on Gull Point, the headland across the bay, on a condition in her will: Reina must marry within a year of Chiyo’s death, and receives the house on the first anniversary of the marriage if she has spent that year living with her spouse in one home. If the estate’s lawyer finds the marriage was a pretence, the house passes to Reina’s father, Masaru Kurosawa, who has a resort developer waiting to buy it.',
      'The deal: tomorrow at ten Reina buys Teo’s debt from the lender. On the first anniversary she tears it up. If the player breaks the deal before then, the debt stands and the player owes it to Reina. The player’s side is to stay married, live together and keep it convincing for one year.',
      'Tonight Reina hands the player twelve typed rules. 1. Don’t fall for me. 2. One year to the day, then a quiet divorce, no reasons given to anybody. 3. In public we are in love; in private we are flatmates. 4. The bedroom is mine, the sofa is yours; we swap if one of us is ill. 5. No questions about my family. 6. Nobody learns the truth: not your grandfather, not my father, nobody. 7. Holding hands in public is fine; anything more needs a witness who matters, and asking first. 8. Separate fridge shelves, labelled. 9. Neither of us sees anybody else this year. 10. Sunday dinner together, downstairs, where people can see. 11. The money is never discussed. Rule 12 is blank: the player may write it, and Reina may veto it. Any rule can be argued over, amended or broken, and each one can come back up later.',
      'The estate’s lawyer is Felix Arden, Reina’s ex-fiancé, who ended their engagement two years ago. Under the will he may visit the marital home unannounced four times in the year, and on the anniversary he signs that the marriage was genuine or that it was a pretence. He will not sign something he has seen to be false.',
      'Fifty-five summers ago Teo and Chiyo were engaged for one summer, and her father ended it. She married into the Kurosawa family the next year. Nobody alive but Teo knows this. It comes out only through Teo himself or the letters he keeps, never as narration.',
      'Nothing obliges the player to sign, keep the rules, stay married, tell the truth or fall in love. Refusing the deal, confessing, taking Masaru’s money and leaving town on the last train are all real paths with real consequences.',
      'Romance in this story goes no further than a kiss, and nobody is touched without being asked. Reina asks first and expects to be asked.',
    ],
    toneGuide:
      'Romantic comedy with a contract in it: quick, warm, specific, and a little sad underneath. The comedy comes from two precise people sharing four small rooms — the fridge shelves, the short sofa, the bathroom door that does not lock, the performance at Sunday dinner — and from a town that watches everything. The tension comes from the rules and from who might find out. ' +
      'Reina is never a prize and never a tease. She is a person with a deadline, and she can say no, get angry, change her mind, renegotiate and leave. Romance is slow, flirtatious and heartfelt, never more than a kiss, and always asked for. ' +
      'Consequences are social and they stick. Auntie Bo’s kiosk sees everybody who walks onto the pier, a raised voice on the pier is news by breakfast, Felix writes down what he sees, and Masaru calls the police the moment anybody touches him. A player who lies, shouts or walks out gets a town that remembers. ' +
      'The year can be played day by day or crossed in jumps of a week or a season whenever the player asks; Felix’s four visits, the Sunday dinners, the storm, the autumn lantern festival and the anniversary are its landmarks. If a scene has nothing at stake, let it be pleasant and short. The face at the top of a beat is Reina’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Reina labels the second shelf of the fridge with a strip of masking tape.\n\nRK.\n\nThen, after a moment, she labels the third one too, in the same neat capitals, with your initials.\n\n"It’s not a metaphor," she says. "It’s yoghurt."\n\n"I didn’t say anything."\n\n"You were about to look meaningful at it." She shuts the door. "Rule eight. Don’t."',
      'Auntie Bo does not knock. She has never once knocked on this door.\n\nShe sets a tray of rice and grilled fish on the counter, looks at the sofa, at the folded blanket on the sofa, at the pillow on the folded blanket, and then at you.\n\n"Shrimp," she says pleasantly. "Who slept here?"\n\nBehind you, the bathroom door, which does not lock, opens.',
      'Felix stands in the bathroom doorway with his folder open, and counts.\n\n"Two toothbrushes." He writes it down. "Different brands."\n\n"Is that a problem?"\n\n"No." He clicks the pen. "People who’ve been together a while usually end up buying the same one. I just notice it."\n\nAt your shoulder, Reina has gone very still.',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 12, presence: 12, resolve: 11, arcana: 6 },
  skills: [
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'The grill, the fish, and putting a plate in front of somebody at the right moment.' },
    { id: 'graft', name: 'Graft', attribute: 'might', description: 'Crates, sandbags, the loose planks on the pier, and a double shift after your own wedding.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being likeable on purpose, in a room full of people who have known you all your life.' },
    { id: 'improvise', name: 'Improvising', attribute: 'agility', description: 'A cover story that still holds when somebody asks the second question.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing while it can still change something.' },
    { id: 'fine_print', name: 'Fine Print', attribute: 'mind', description: 'Clauses, conditions, and the sentence somebody hoped you would skim.' },
    { id: 'attention', name: 'Attention', attribute: 'mind', description: 'What she is not saying while she says something else.' },
    { id: 'old_stories', name: 'Old Stories', attribute: 'arcana', description: 'What happened on this pier before you were born, and who still remembers it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is GOOD_HIGH and the only one, so resting restores the day and not
   * the marriage. Exposure is first among the descending pair because
   * PUBLIC_VIOLENCE and the generic GOOD_LOW fallback both take the first one
   * in array order, and anything loud on a pier is gossip first. Her Guard
   * comes down on its own (negative regen: living in four rooms with somebody
   * does that) and goes back up when the player pushes on rule five.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 72,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has been up since a registry office, a lunch, a full service and a sofa eight inches too short. They sit down wherever they are, and whoever is nearest decides what happens next.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. The player says yes to end conversations, misses Reina’s jokes by a beat, and gets small details of the cover story wrong in ways a sharp listener catches. Sleep is the correct move, and Auntie Bo will say so out loud.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a restaurant day. Good for one more conversation and honest about not wanting two. Fine for the sofa and the radio, bad for a Sunday dinner with the whole pier watching. Nobody needs to mention it unless asked.',
        },
        {
          upTo: 100,
          behaviour:
            'The day is still in front of the player: room to cook something that takes an hour, to walk the pier for no reason, to argue with Reina about rule four properly and enjoy it. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 15,
      regenPerHour: -0.1,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The town has stopped wondering. The pier uses one name for the two of them, Bo has stopped counting anything, and Felix spends his visits drinking tea.',
      color: '#C9707A',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The town has accepted it. The pier calls them by one name, Bo has stopped counting toothbrushes, and Felix’s folder stays shut for most of a visit. A small slip passes as a married couple’s private joke.',
        },
        {
          upTo: 50,
          behaviour:
            'People are paying attention. Bo asks one question too many over breakfast, a regular at the counter asks how they met and listens carefully to the answer, and Felix writes something down without saying what. Each new lie has to match the last one.',
        },
        {
          upTo: 80,
          behaviour:
            'The story has holes and people have found some. Somebody on the pier has said the word arranged out loud, Masaru knows exactly where to press, and the next visit is no longer a formality. One more careless public moment could be enough.',
        },
        {
          upTo: 100,
          behaviour:
            'It is coming apart in public. The pier is talking about nothing else, Felix has enough to refuse to sign, and Reina is quietly working out what she can still save. Anything said now is said in front of witnesses.',
        },
      ],
    },
    {
      id: 'guard',
      name: 'Her Guard',
      max: 100,
      start: 70,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Reina has stopped defending anything. She tells the player about her grandmother unprompted, falls asleep on the wrong end of the sofa, and quotes the rules only as jokes.',
      color: '#7A8FB8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'She has stopped defending. Reina leaves sentences unfinished because she assumes the player has them, tells stories about the house on the point without being asked, and cites rule numbers as jokes rather than walls.',
        },
        {
          upTo: 50,
          behaviour:
            'Thawing and watching herself do it. She laughs before she has decided to, then cites a rule number to cover it. She asks one real question a day about the player’s life and pretends it was small talk.',
        },
        {
          upTo: 75,
          behaviour:
            'Polite, precise and closed. Reina is good company the way a good colleague is: punctual, funny in passing, and nowhere near the subject of her family. Rule five is enforced to the letter and with a smile.',
        },
        {
          upTo: 100,
          behaviour:
            'Shut. Every exchange is a negotiation in complete sentences. The bedroom door stays closed, she eats on her own shelf’s schedule, and she refers to the player in the third person when Felix is in the room. She is still scrupulously fair, which is somehow worse.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'the_rules',
      name: 'The Twelve Rules',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'One typed page, already signed at the bottom by Reina. 1. Don’t fall for me. 2. One year, to the day. Then a quiet divorce, and no reasons given to anybody, ever. 3. In public, we are in love. In private, we are flatmates. 4. The bedroom is mine. The sofa is yours. We swap if one of us is ill. 5. No questions about my family. 6. Nobody learns the truth. Not your grandfather. Not my father. Nobody. 7. Holding hands in public is allowed. Anything more needs a witness who matters, and asking first. 8. Separate shelves in the fridge. Labelled. 9. Neither of us sees anybody else this year. Not even quietly. 10. Sunday dinner together, downstairs, where people can see us. 11. The money is never discussed. 12. (blank, for the player to write)',
      loreText:
        'Eleven more printed copies sit in a plastic sleeve in her suitcase, because she expected at least one to be torn up. One older printout, folded small into the suitcase lining, has a twelfth rule typed on it and crossed out by hand.',
      icon: 'papers',
    },
    {
      id: 'wedding_ring',
      name: 'Your Ring',
      tags: ['personal'],
      droppable: false,
      description:
        'A plain gold band from the jeweller by the station, bought at twenty to four. A size too tight. Hers is a size too big, and she has wrapped red thread from the registrar’s desk round it to keep it on.',
      loreText:
        'The jeweller asked if you wanted them engraved. Reina said no before you had opened your mouth, and then, at the door, came back and asked how long engraving takes.',
      icon: 'ring',
    },
    {
      id: 'marriage_certificate',
      name: 'The Marriage Certificate',
      tags: ['document'],
      description:
        'Registered at 16:05 today at the Sorrel Bay registry office. Two witnesses: your grandfather, who cried, and Auntie Bo, who did not.',
      loreText: 'Reina’s signature is small and exact. Yours goes over the line, and the registrar initialled it as a correction.',
      icon: 'letter',
    },
    {
      id: 'lenders_letter',
      name: 'The Lender’s Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Final notice. Unless the loan secured on the restaurant at the end of the old pier is repaid in full, the restaurant and the flat above it will be sold at auction on Friday at ten, as lot fourteen.',
      loreText: 'You only ever saw this one. The reference number in the corner says it is the fourth.',
      icon: 'letter',
    },
    {
      id: 'chiyo_will',
      name: 'Chiyo Kurosawa’s Will',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Reina’s copy, in her suitcase. Clause nine leaves the Cliff House on Gull Point to her granddaughter Reina on the first anniversary of her marriage, if she marries within a year of Chiyo’s death and spends that year living with her spouse in one home; and, if the estate’s lawyer finds the marriage a pretence, to her son Masaru.',
      loreText:
        'Every page is initialled at the bottom by the drafting lawyer: F.A. Under the last signature, in Chiyo’s own shaky hand: "Lemons on the south wall. Water them."',
      icon: 'papers',
    },
    {
      id: 'chiyo_letters',
      name: 'The Tin of Letters',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A dented biscuit tin under Teo’s bed holding fifty-four letters in one handwriting, one for every year, each beginning "Teo," and fifty-four replies in his, stamped, addressed, and never posted.',
      loreText: 'The last letter is dated two weeks before she died and is the shortest. It says she has told her granddaughter where to eat.',
      icon: 'box',
    },
    {
      id: 'masarus_envelope',
      name: 'Masaru’s Envelope',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Heavy cream paper. Inside, a typed statement for you to sign saying the marriage was entered into for money and is a pretence, and a banker’s draft for twice the debt, made out to you and dated the day he hands it over.',
      loreText: 'Every word of the statement is true. He has made sure of that, because he never puts a lie on paper.',
      icon: 'letter',
    },
    {
      id: 'felix_form',
      name: 'The Visit Form',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Felix Arden’s checklist for a marital home, one copy left with you for your records: a shared bedroom or a reason why not, two sets of keys, post in both names, both names on the door, a calendar in both handwritings, how each takes their tea, what the other was doing last Tuesday.',
      loreText: 'He has ticked nothing yet. In the margin, in pencil, very small: she hates the cold side of a bed.',
      icon: 'papers',
    },
    {
      id: 'teos_ledger',
      name: 'The Restaurant Ledger',
      tags: ['document'],
      skillModifiers: { fine_print: 1 },
      description:
        'Fifty-one years of Teo’s accounts in two handwritings, his and Auntie Bo’s. In the last year Bo’s columns get smaller and neater, and there is a run of payments in her hand with no invoice behind any of them.',
      loreText: 'Added up, those payments come to most of a year of her kiosk’s takings.',
      icon: 'book',
    },
    {
      id: 'lemon_tree',
      name: 'The Lemon Tree',
      tags: ['personal'],
      description: 'A potted lemon tree as tall as Reina’s shoulder, carried from her grandmother’s garden on the point. Three green lemons and one yellow.',
      loreText: 'Grown from the pips of a lemon somebody gave her grandmother fifty-five summers ago, on a pier.',
      icon: 'plant',
    },
    {
      id: 'charcoal_tongs',
      name: 'Teo’s Long Tongs',
      tags: ['tool'],
      skillModifiers: { cooking: 1 },
      description:
        'Steel tongs as long as your forearm, the grips wrapped in old tape. Teo handed them to you the first night you worked the grill alone, and has never asked for them back.',
      loreText: 'The tape has been rewrapped eleven times and is still the wrong colour.',
      icon: 'tools',
    },
    {
      id: 'order_pad',
      name: 'The Order Pad',
      tags: ['document'],
      skillModifiers: { attention: 1 },
      description:
        'Your order pad, with every regular’s usual written on the inside cover in your own shorthand, and a list of who on the pier is not speaking to whom.',
      loreText: 'Three of the names on the not-speaking list are married to each other.',
      icon: 'papers',
    },
    {
      id: 'return_ticket',
      name: 'An Open Return Ticket',
      tags: ['document'],
      description: 'A train ticket back to the city, open-dated, in your wallet since the day you came home. The last train leaves Sorrel Bay at 23:40.',
      loreText: 'You have taken it out and looked at it twice this month.',
      icon: 'ticket',
    },
    {
      id: 'paper_lantern',
      name: 'A Paper Lantern',
      tags: ['festival'],
      stackable: true,
      maxStack: 4,
      description:
        'Rice paper on a bamboo frame, with a candle cup. On festival night the town floats hundreds of them off the shingle, and every married couple floats one between them.',
      loreText: 'Bo sells them at the kiosk for twice what the bakery charges, and everybody buys them from Bo.',
      icon: 'lantern',
    },
  ],
  abilities: [
    {
      id: 'take_the_deal',
      name: 'Shake On It',
      tags: ['social'],
      description: 'Agree to terms and mean it: sign the page, accept the offer, make it binding.',
      affordances: ['sign it', 'sign', 'agree', 'accept', 'shake on it', 'deal', 'take the deal', 'say yes'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'amend_the_rules',
      name: 'Amend the Rules',
      tags: ['social'],
      description: 'Write a rule, strike one out, or argue one into a different shape, on paper, with her watching.',
      affordances: ['write rule twelve', 'add a rule', 'strike a rule', 'cross it out', 'renegotiate', 'amend it', 'counteroffer', 'change the rules'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'fine_print', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'refuse',
      name: 'Say No',
      tags: ['social'],
      description: 'Refuse an offer, a rule or a demand, out loud, and mean it.',
      affordances: ['refuse', 'say no', 'no deal', 'tear it up', 'turn it down', 'i will not', 'send him away', 'give it back'],
      costs: [{ resourceId: 'energy', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_the_story_straight',
      name: 'Keep the Story Straight',
      tags: ['social'],
      description: 'Tell the cover story so that it still holds up under a second question.',
      affordances: ['lie', 'make something up', 'cover for us', 'tell them how we met', 'bluff', 'act married', 'pretend', 'keep up the act'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'exposure', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'improvise', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_on_a_show',
      name: 'Put On a Show',
      tags: ['social'],
      description: 'Be visibly, convincingly married for an audience that matters: a hand held, an arm round her, a kiss on the cheek, asked for first.',
      affordances: ['hold her hand', 'put an arm around her', 'kiss her cheek', 'act in love', 'show them', 'play the newlywed', 'perform'],
      costs: [
        { resourceId: 'energy', amount: 5 },
        { resourceId: 'exposure', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'come_clean',
      name: 'Come Clean',
      tags: ['social'],
      description: 'Tell somebody the marriage is a contract.',
      affordances: ['tell the truth', 'confess', 'come clean', 'admit it', 'tell him it is fake', 'tell grandpa', 'tell auntie bo', 'break rule six'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'exposure', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_straight',
      name: 'Say It Straight',
      tags: ['social'],
      description: 'Tell Reina something true about yourself, or about her, with no audience and no act.',
      affordances: ['be honest with her', 'tell her how i feel', 'say what i mean', 'tell her something true', 'mean it', 'drop the act'],
      costs: [{ resourceId: 'energy', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_about_her',
      name: 'Ask About Her Family',
      tags: ['social'],
      description: 'Ask the question rule five bans: her father, her grandmother, why she needs this, why you.',
      affordances: ['ask about her father', 'ask about her family', 'ask why me', 'ask about the house', 'ask about felix', 'ask about her grandmother', 'break rule five'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'guard', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_fine_print',
      name: 'Read the Fine Print',
      tags: ['sight'],
      description: 'Read a document properly: the rules, the will, the lender’s letter, her father’s statement, the ledger.',
      affordances: ['read it carefully', 'read the contract', 'read the will', 'check the clause', 'find a loophole', 'read the ledger', 'read the small print'],
      costs: [{ resourceId: 'energy', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'fine_print', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_her',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out what somebody means from what their hands are doing while they say it.',
      affordances: ['watch her', 'read her', 'notice', 'look around', 'study him', 'take it in', 'read the room'],
      costs: [{ resourceId: 'energy', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'attention', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_for_her',
      name: 'Cook',
      tags: ['utility'],
      description: 'Put something good on a plate in front of somebody: the grill downstairs, the two-ring hob upstairs, whatever is in the walk-in.',
      affordances: ['cook', 'make dinner', 'make breakfast', 'grill something', 'feed her', 'feed him', 'make tea'],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_pier',
      name: 'Do the Work',
      tags: ['utility'],
      description: 'The physical work: crates, planks, sandbags, the shutters before a storm, a double shift.',
      affordances: ['carry it', 'fix it', 'sandbag the door', 'board up the window', 'haul the crates', 'work the shift', 'clean up'],
      costs: [{ resourceId: 'energy', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'graft', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay',
      name: 'Stay',
      tags: ['social'],
      description: 'Do not fix it, do not perform it, and do not leave the room. Sit down and be there.',
      affordances: ['stay', 'sit with her', 'say nothing', 'wait', 'just be there', 'keep her company'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cash_in',
      name: 'Cash In',
      tags: ['social'],
      description: 'Take money for something you know or something you sign: a statement, a secret, a story.',
      affordances: ['take the money', 'take his offer', 'cash the draft', 'sign his statement', 'sell her out', 'accept the bribe', 'sell the story'],
      costs: [
        { resourceId: 'energy', amount: 4 },
        { resourceId: 'exposure', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'follow_the_old_story',
      name: 'Follow the Old Story',
      tags: ['sight'],
      description: 'Follow what happened on this pier fifty-five summers ago, through the people and the paper that still remember it.',
      affordances: ['ask about the telescope', 'ask grandpa about chiyo', 'open the tin', 'read the letters', 'go up to the point', 'follow it up', 'ask about the lemon tree'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'old_stories', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_letters'],
        lockedCopy:
          'There is a telescope on the point and a tin under your grandfather’s bed, and right now neither of them is any of your business.',
      },
    },
  ],
  locations: [
    {
      id: 'the_flat',
      name: 'The Flat Above Teo’s',
      shortName: 'The Flat',
      description:
        'One bedroom, one sofa eight inches too short for anybody, a kitchenette with a two-ring hob, a balcony the size of a doormat over the water, and a bathroom door that has not locked since before you were born. The floor is thin enough to hear the grill below, and the window over the sink looks straight down the pier to the harbour lights.',
      artDirection:
        'Small cosy one-bedroom flat above a seaside restaurant at night, a short worn sofa with a folded blanket, a tiny kitchenette, two suitcases and a potted lemon tree by the door, warm lamplight, harbour lights and a wooden pier through the window. Intimate, cramped, warm amber and night blue.',
      connections: [{ to: 'teos', travelMinutes: 1, label: 'Down the back stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'lenders_letter', qty: 1, ownerId: null, aka: ['letter', 'the notice', 'the lender’s letter', 'final notice'] },
        { itemId: 'chiyo_will', qty: 1, ownerId: 'reina', aka: ['the will', 'her will', 'her grandmother’s will', 'her documents'] },
        { itemId: 'lemon_tree', qty: 1, ownerId: 'reina', aka: ['lemon tree', 'the plant', 'her tree'] },
      ],
    },
    {
      id: 'teos',
      name: 'Teo’s',
      shortName: 'Teo’s',
      description:
        'Twelve tables, a charcoal grill behind a counter of salt-bleached wood, and a neon sign whose apostrophe flickers. The window tables hang out over the water. The regulars have stools with their names scratched underneath, and the walls are fifty-one years of photographs of people holding fish.',
      artDirection:
        'Small warm seafood grill restaurant at the end of a wooden pier at night, a glowing charcoal grill behind a pale wooden counter, twelve tables, window seats over dark water, a neon sign, walls of old photographs. Smoky gold light, busy and loved.',
      connections: [
        { to: 'the_flat', travelMinutes: 1, label: 'Up the back stairs' },
        { to: 'the_pier', travelMinutes: 1, label: 'Out the front door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'teos_ledger', qty: 1, ownerId: 'teo', aka: ['ledger', 'the accounts', 'the books', 'account book'] },
      ],
    },
    {
      id: 'the_pier',
      name: 'The Old Pier',
      shortName: 'The Pier',
      description:
        'Two hundred metres of timber over grey-green water: fishing lines, lamp posts, gulls with opinions, and the new planks from the storm repairs paler than the old. At the land end, Auntie Bo’s kiosk sells bait, coffee and news, and nobody walks onto the pier without passing it.',
      artDirection:
        'Long old wooden pier over a grey-green harbour at dusk, lamp posts, fishing lines, gulls, a small bright kiosk at the land end, a restaurant with a neon sign at the far end. Breezy, salt-faded, lantern-lit.',
      connections: [
        { to: 'teos', travelMinutes: 3, label: 'To the restaurant at the end' },
        { to: 'the_boathouse', travelMinutes: 1, label: 'Down the ladder to the boathouse' },
        { to: 'the_beach', travelMinutes: 2, label: 'Steps down to the shingle' },
        { to: 'harbour_street', travelMinutes: 3, label: 'Off the pier into town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_boathouse',
      name: 'Teo’s Boathouse',
      shortName: 'Boathouse',
      description:
        'A converted boathouse under the land end of the pier, where Teo has lived alone since your grandmother died. Nets on the walls, a rowing boat he still takes out at first light, a radio that only gets one station, and a biscuit tin under the bed that he has never opened in front of you.',
      artDirection:
        'Cosy converted boathouse under a wooden pier, nets and floats on plank walls, a small rowing boat on a slipway, a narrow bed, an old radio, morning light through gaps in the boards. Weathered, tidy, private.',
      connections: [{ to: 'the_pier', travelMinutes: 1, label: 'Up the ladder' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'chiyo_letters', qty: 1, ownerId: 'teo', aka: ['tin', 'the tin', 'the letters', 'biscuit tin'] },
      ],
    },
    {
      id: 'the_beach',
      name: 'The Shingle Beach',
      shortName: 'The Beach',
      description:
        'A strip of grey stones under the legs of the pier, where the town launches its paper lanterns in autumn and where you go to say something nobody on the pier should hear. At low tide a causeway of wet rock runs almost all the way to the point.',
      artDirection:
        'Grey shingle beach beneath the legs of a wooden pier at twilight, still water, a rocky causeway at low tide leading toward a headland with a white house. Quiet, cool blue, a few floating paper lanterns.',
      connections: [
        { to: 'the_pier', travelMinutes: 2, label: 'Back up the steps' },
        { to: 'gull_point', travelMinutes: 30, label: 'The causeway, at low tide' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'harbour_street',
      name: 'Harbour Street',
      shortName: 'Town',
      description:
        'The town’s one real street: the fish market, a bakery with a back table, the bank where the debt lives, the registry office where you got married this afternoon, and the station steps at the top of the hill.',
      artDirection:
        'Small seaside town main street, a fish market with crates and awnings, a bakery window, a stone bank, a little registry office, a hill rising to a station, gulls overhead. Bright, ordinary, densely detailed.',
      connections: [
        { to: 'the_pier', travelMinutes: 3, label: 'Down to the pier' },
        { to: 'the_station', travelMinutes: 6, label: 'Up the hill to the station' },
        { to: 'seaview_hotel', travelMinutes: 8, label: 'Round the harbour to the hotel' },
        { to: 'gull_point', travelMinutes: 25, label: 'The coast path to the point' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'paper_lantern', qty: 2, ownerId: null, aka: ['lantern', 'paper lantern', 'a lantern'] },
      ],
    },
    {
      id: 'the_station',
      name: 'Sorrel Bay Station',
      shortName: 'Station',
      description:
        'Two platforms and a ticket machine that only takes coins. The city is an hour away. The last train leaves at 23:40, and the night guard knows everybody who has ever caught it to leave for good.',
      artDirection:
        'Tiny seaside railway station at night, two platforms, one lamp, a ticket machine, a waiting train with lit windows, the harbour far below. Lonely, quiet, cool light.',
      connections: [{ to: 'harbour_street', travelMinutes: 6, label: 'Back down the hill' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'seaview_hotel',
      name: 'The Kurosawa Seaview',
      shortName: 'The Hotel',
      description:
        'Glass and white stone on the far side of the harbour, the only hotel in town, owned by Reina’s father. In the lobby a model of a sixty-room resort stands on the exact spot where her grandmother’s house is now. Felix Arden has a room on the third floor.',
      artDirection:
        'Sleek modern seaside hotel lobby at evening, glass walls over a harbour, white stone floor, a large architectural model of a cliff-top resort on a plinth, a quiet lounge. Cool, expensive, polished.',
      connections: [{ to: 'harbour_street', travelMinutes: 8, label: 'Back round the harbour' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'gull_point',
      name: 'The Cliff House',
      shortName: 'Gull Point',
      description:
        'Chiyo Kurosawa’s house on the headland across the bay: shutters closed since winter, a walled garden of lemon trees gone wild, and a brass telescope in the upstairs window, pointed at the end of your grandfather’s pier.',
      artDirection:
        'White wooden house on a grassy headland above the sea, closed blue shutters, a wild walled garden of lemon trees, a brass telescope in an upper window aimed across the bay at a distant lit pier. Windswept, lonely, beautiful.',
      connections: [
        { to: 'harbour_street', travelMinutes: 25, label: 'The coast path back to town' },
        { to: 'the_beach', travelMinutes: 30, label: 'The causeway, if the tide allows' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [],
    },
  ],
  /**
   * Order matters. PUBLIC_VIOLENCE takes the first faction in array order, and
   * a scene on the pier costs you the pier before anything else.
   */
  factions: [
    {
      id: 'faction_pier',
      name: 'The Pier Regulars',
      description:
        'Everybody who works the old pier and the harbour under it: the fish market stalls, the ferryman, the bait kiosk, forty regulars and a group chat called PIER NEWS that Auntie Bo runs. They have known you all your life, they were not invited to the wedding, and they intend to be at Sunday dinner anyway.',
      startingReputation: 40,
      ranks: [
        { atReputation: 0, label: 'Talked about' },
        { atReputation: 40, label: 'One of ours' },
        { atReputation: 70, label: 'Asked first' },
      ],
      allies: [],
      enemies: ['faction_kurosawa'],
    },
    {
      id: 'faction_estate',
      name: 'Chiyo Kurosawa’s Estate',
      description:
        'The will, the city law firm that drafted it, and Felix Arden, who administers it. Fair, slow and entirely on paper. Its opinion of your marriage is the only one that decides who gets the house on the point.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Under review' },
        { atReputation: 40, label: 'Plausible' },
        { atReputation: 70, label: 'Certified in all but name' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_kurosawa',
      name: 'The Kurosawa Family',
      description:
        'Masaru Kurosawa, his company Kurosawa Seaview Resorts, three uncles on its board and a developer with a model of a sixty-room hotel where the Cliff House stands. They think Reina’s marriage is a stunt, and they are right.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'A stunt' },
        { atReputation: 30, label: 'A problem' },
        { atReputation: 60, label: 'Family, regrettably' },
      ],
      allies: [],
      enemies: ['faction_pier'],
    },
  ],
  characters: [
    {
      id: 'reina',
      name: 'Reina Kurosawa',
      role: 'Your wife of six hours. A lawyer from the city with a deadline, a contract and twelve rules',
      cardBlurb:
        'She married you this afternoon for a house on the far side of the bay, she wrote the rules you are about to sign, and she has made it rule five that you never ask why she picked you.',
      pronouns: 'she/her',
      publicTraits: ['Precise to the comma', 'Deadpan funny, mostly on purpose', 'Keeps every promise she puts in writing'],
      hiddenDrives: [
        'She chose this family on purpose and would rather lose the house than be caught being sentimental about it',
        'She wants one year in which nobody in her family decides anything for her, including who she likes',
      ],
      values: ['Saying the terms out loud before anybody agrees to them', 'Her grandmother’s word, kept exactly'],
      fears: [
        'Turning into her father: winning everything and keeping nobody',
        'That Felix was right to leave, and that she is easy to leave',
      ],
      socialStyle:
        'Negotiates everything, including breakfast. Uses rule numbers as a shield when she is flustered, and goes very still instead of crying.',
      boundaries: [
        'Will not be touched without being asked first, in public or in private, and asks before she touches',
        'Will not discuss her father or her family until she decides to, and leaves the room if pushed twice',
        'Will not lie to Felix in writing, whatever she performs out loud',
      ],
      goals: [
        'Keep the marriage convincing until the anniversary and get the Cliff House',
        'Stop her father selling her grandmother’s house to a resort',
      ],
      secrets: [
        {
          id: 'reina_why_you',
          fact: 'She chose the player’s family on purpose. She ate at Teo’s counter every summer with her grandmother Chiyo, and Chiyo’s last letter to her ended: "If you ever need a husband in a hurry, go and eat at Teo’s." Reina thought it was a joke until she needed one.',
          visibility: 'NPC_PRIVATE',
          revealHint:
            'She says it on the shingle beach or the balcony, late, if the player has told her one true thing about themselves without being asked and has not pushed on rule five.',
        },
        {
          id: 'reina_rule_twelve',
          fact: 'At three in the morning she typed a rule twelve, "If either of us breaks rule one, we say so," then crossed it out and left the line blank instead.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'After the player has written a rule twelve of their own, or if they find the older printout folded into her suitcase lining.',
        },
        {
          id: 'reina_every_penny',
          fact: 'Buying the debt takes every penny she has: her savings, her car and the deposit on her city flat. If she loses the house, she owns a debt on a restaurant and nothing else.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player sees the bank papers, or asks her straight, after the first Sunday, what this is costing her.',
        },
      ],
      speechStyle:
        'Short declaratives in complete sentences, with legal precision used for comedy: defined terms, "for the record", rule numbers. Never wastes a word, then now and again says one unguarded thing and immediately cites a rule to cover it.',
      topics: ['the rules', 'the Cliff House', 'her grandmother', 'her father', 'Felix', 'the lemon tree', 'rule twelve'],
      voiceSamples: [
        'Rule three. In public we are in love. You are holding my hand like it is evidence.',
        'For the record, I do not cry at registry offices. That was hay fever. In October.',
        'Define fall. No. Do not define it. Sign.',
        'My father has never once lost anything he wanted. I would like to be the first.',
        'I typed rule one at three in the morning. I am fairly confident I typed it for you.',
      ],
      appearance:
        'An adult woman, tall, long black hair pinned in a low knot with a silver clip, sharp dark eyes, a cream registry-office dress under a belted charcoal trench coat, low heels she has been standing in since noon, and a plain gold band wrapped in red thread.',
      visualHook: 'A wedding band too big for her finger, wrapped round and round with red thread to keep it on.',
      silhouette: 'Straight-backed in a belted trench coat, a pen held out at arm’s length like a verdict.',
      artSeed: 'oyb-reina-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'flustered', 'annoyed', 'warm', 'hurt'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_flat', activity: 'in the bedroom with the door shut' },
        { startMinute: 420, endMinute: 480, locationId: 'the_flat', activity: 'up first, coffee, reading the rules again at the window' },
        { startMinute: 480, endMinute: 1020, locationId: 'harbour_street', activity: 'working at the bakery’s back table, on the phone to the city' },
        { startMinute: 1020, endMinute: 1260, locationId: 'teos', activity: 'at the end of the counter with her laptop, watching the room watch her' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_flat', activity: 'home, being extremely normal about the sofa' },
      ],
      homeLocationId: 'the_flat',
      knowledgeScope: ['reina', 'the_rules', 'chiyo_will', 'the_cliff_house', 'felix', 'kurosawa_family', 'teos_counter'],
      startingRelationship: { trust: 35, affection: 20, respect: 45, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'reina_why_you',
          label: 'She tells you why she chose your family',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['first_night'] },
        },
        {
          id: 'reina_off_the_record',
          label: 'She talks about her father without being asked',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'reina_stops_citing',
          label: 'She stops quoting rule numbers at you',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 72 },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 16, presence: 14, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'teo',
      name: 'Teodoro Reyes',
      calledName: 'Grandpa Teo',
      role: 'Your grandfather. He opened the grill at the end of the pier fifty-one years ago and still runs it, loudly',
      cardBlurb:
        'He raised you over a charcoal grill, he cried at your wedding this afternoon, and he is so delighted with your new wife that you cannot tell whether he believes a word of it.',
      pronouns: 'he/him',
      publicTraits: ['Sings while he cooks and while he argues', 'Feeds people before he listens to them', 'Stubborn about fish, weather and the past'],
      hiddenDrives: [
        'He wants to see a Kurosawa happy at his counter before he dies, and he is not fussy about which one',
        'He wants the restaurant to outlive him without anybody having to give something up for it',
      ],
      values: ['Nobody leaves his counter hungry, paying or not', 'The hard thing is said after the food is on the table'],
      fears: ['Being the reason his grandchild married for money', 'Dying with the tin still under the bed'],
      socialStyle:
        'Talks with tongs in his hand. Puts a plate in front of you before you have said why you came, and says the real thing last, on his way back to the grill.',
      boundaries: [
        'Will not talk about Chiyo Kurosawa to anybody who has not earned the boathouse',
        'Will not take charity, and will throw a cheque on the coals if he decides somebody paid his debt out of pity',
        'Will not let anybody be rude to Reina in his restaurant, including you',
      ],
      goals: ['Get the two of you to the first Sunday dinner and make it a feast', 'Find out how fake the marriage is without ever asking'],
      secrets: [
        {
          id: 'teo_and_chiyo',
          fact: 'Fifty-five summers ago Teo and Chiyo Kurosawa were engaged for one summer, and her father ended it. She wrote him one letter a year for fifty-four years, until she died last winter. He wrote fifty-four replies and never posted one. They are in a tin under his bed.',
          visibility: 'NPC_PRIVATE',
          revealHint:
            'He opens the tin for a grandchild who has gone out in the boat with him at first light and asked about the telescope on the point, or who has told him the truth about the marriage first.',
        },
        {
          id: 'teo_knows',
          fact: 'He knows the marriage is a contract. The lender rang him on Thursday to confirm the name of the buyer of his debt: Kurosawa. He recognised Reina on sight. He has decided to say nothing and feed them both until it stops being a contract.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player tries to confess the arrangement to him, he cuts them off with a plate: "I know. Eat."',
        },
      ],
      speechStyle:
        'Warm, loud, sentence fragments, and harbour proverbs he invents on the spot about fish and tides. Food arrives before opinions. The important line comes last, quietly, while he is already walking away.',
      topics: ['the grill', 'the pier', 'the storm', 'your grandmother', 'the lemon tree', 'the boat at first light', 'the house on the point'],
      voiceSamples: [
        'Sit. Eat. Talk after. Nobody ever said a true thing on an empty stomach.',
        'Fifty-one years on this grill and mackerel still forgives nobody.',
        'She takes her tea with nothing in it. Same as her grandmother. Some things a man remembers.',
        'When the tide goes out you can walk to the point. Don’t. It comes back faster than you think. Most things do.',
      ],
      appearance:
        'An older man, short and broad, brown skin weathered by sea air, white hair cropped close, a white grill jacket with the sleeves rolled, a striped towel over one shoulder, and forearms covered in old burn marks.',
      visualHook: 'A striped kitchen towel over one shoulder, and a gold tooth that shows when he sings.',
      silhouette: 'Stocky at the grill with tongs raised like a conductor’s baton.',
      artSeed: 'oyb-teo-01',
      portrait: null,
      expressions: ['warm', 'grinning', 'sad', 'stern'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_boathouse', activity: 'in the boathouse with the radio on low' },
        { startMinute: 300, endMinute: 480, locationId: 'the_pier', activity: 'out in the rowing boat at first light, then gutting the catch on the pier' },
        { startMinute: 480, endMinute: 900, locationId: 'teos', activity: 'prep: stock on, fish scaled, arguing with the delivery' },
        { startMinute: 900, endMinute: 1020, locationId: 'the_boathouse', activity: 'a nap he denies taking' },
        { startMinute: 1020, endMinute: 1380, locationId: 'teos', activity: 'on the grill, singing' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_boathouse', activity: 'counting the till at his own table' },
      ],
      homeLocationId: 'the_boathouse',
      knowledgeScope: ['teo', 'teos', 'the_pier', 'the_storm', 'chiyo', 'the_cliff_house', 'the_debt'],
      startingRelationship: { trust: 70, affection: 85, respect: 50, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'teo_opens_the_tin',
          label: 'He opens the tin under his bed for you',
          kind: 'TRUST',
          requires: { trust: 75, flagsSet: ['knows:the_letters'] },
        },
        {
          id: 'teo_says_he_knows',
          label: 'He tells you he knows what the marriage is',
          kind: 'TRUST',
          requires: { trust: 72, flagsSet: ['first_night'] },
        },
      ],
      attributes: { might: 12, agility: 9, mind: 13, presence: 15, resolve: 15, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'bo',
      name: 'Bo-mi Choi',
      calledName: 'Auntie Bo',
      role: 'Front of house at Teo’s for thirty-one years, owner of the kiosk at the pier gate, and the town’s news service',
      cardBlurb:
        'She has called you Shrimp since you could walk, nobody gets onto the pier without passing her kiosk, and she has already noticed that your flat has one bedroom.',
      pronouns: 'she/her',
      publicTraits: ['Asks three questions per breath', 'Counts everything', 'Fiercely, publicly protective of Teo'],
      hiddenDrives: [
        'She hid the lender’s first three letters from Teo for a year and paid what she could from her own savings, and a stranger fixed it in a week',
        'She wants to be told the truth first, before the pier, because that is what family is for',
      ],
      values: ['Being told first', 'Teo keeping his pride'],
      fears: ['That hiding the letters made the debt worse', 'Being made a fool of in front of the whole pier'],
      socialStyle:
        'Interrogates by offering food. Fires questions in threes and watches your hands, not your face, for the answer.',
      boundaries: [
        'Will not lie to Teo’s face, though she will leave things out',
        'Will not keep a secret that is hurting Teo, once she is sure that it is',
      ],
      goals: ['Find out what that marriage really is before the pier does', 'Make sure whoever paid the bank does not end up owning Teo'],
      secrets: [
        {
          id: 'bo_hid_the_letters',
          fact: 'The lender’s first three notices came to the kiosk. She hid them from Teo for a year and paid what she could of the arrears from her own savings, which is why the debt reached the player so late.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if the player finds her payments in the ledger and asks her gently, alone, not in front of the pier.',
        },
      ],
      speechStyle:
        'Rapid questions, usually three at once, then one blunt verdict. Calls the player Shrimp. Counts out loud: toothbrushes, stools, years, lanterns sold.',
      topics: ['the kiosk', 'the pier', 'Teo', 'the ledger', 'the wedding', 'the sofa', 'who paid the bank'],
      voiceSamples: [
        'Toothbrushes. How many in your bathroom? Don’t look at her. Look at me, Shrimp.',
        'Thirty-one years in that kiosk. Nobody walks onto this pier without passing my coffee.',
        'A wife. On a Friday. Since when do you decide anything on a Friday?',
        'Lovely woman. Lovely people pay cash. So who paid the bank?',
      ],
      appearance:
        'An older woman, small and quick, a grey bob cut sharp at the jaw with reading glasses pushed up into it, a red quilted vest over a black turtleneck, and an order pad in the vest pocket.',
      visualHook: 'Reading glasses pushed up into a sharp grey bob, never once used for reading.',
      silhouette: 'Small, arms folded, planted square in a doorway.',
      artSeed: 'oyb-bo-01',
      portrait: null,
      expressions: ['suspicious', 'amused', 'warm', 'stern'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'harbour_street', activity: 'at home above the bakery, phone face down' },
        { startMinute: 360, endMinute: 1020, locationId: 'the_pier', activity: 'in the kiosk at the pier gate, seeing everybody' },
        { startMinute: 1020, endMinute: 1380, locationId: 'teos', activity: 'running the dining room, the seating plan and the gossip' },
        { startMinute: 1380, endMinute: 1440, locationId: 'harbour_street', activity: 'home, on the phone to half the pier' },
      ],
      homeLocationId: 'harbour_street',
      knowledgeScope: ['bo', 'the_pier', 'teos', 'the_ledger', 'the_debt', 'pier_news'],
      startingRelationship: { trust: 55, affection: 75, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'bo_covers_for_you',
          label: 'She covers for the two of you on the pier',
          kind: 'ALLIANCE',
          requires: { trust: 65, respect: 50 },
        },
        {
          id: 'bo_owns_up',
          label: 'She tells you about the letters she hid',
          kind: 'TRUST',
          requires: { trust: 70, hasItems: ['teos_ledger'] },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 15, presence: 14, resolve: 13, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'felix',
      name: 'Felix Arden',
      role: 'The estate’s lawyer and Reina’s ex-fiancé, who decides at the anniversary whether the marriage was real',
      cardBlurb:
        'He will knock on your door four times this year to decide whether you are really married, he was engaged to your wife two years ago, and he is scrupulously, painfully fair.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to a fault', 'Notices everything and writes some of it down', 'Apologises before every hard question and asks it anyway'],
      hiddenDrives: [
        'He left Reina because her father made him choose between her and his career, and he wants, once, to be the man who does not take the deal',
      ],
      values: ['Writing down exactly what he saw, and no more', 'Being fair to Reina even when it costs him'],
      fears: ['That he will certify the marriage and lose her for good', 'That he will refuse it and she will think it was jealousy'],
      socialStyle: 'Knocks twice, waits, apologises for the hour. Asks permission before every question and gives you every chance to answer it well.',
      boundaries: [
        'Will not sign anything he has seen to be false',
        'Will not use what he learns on a visit against Reina anywhere else',
        'Will not fight anybody, and will write down that he was hit',
      ],
      goals: ['Do the four visits honestly', 'Tell Reina the truth about why he left before the year is out'],
      secrets: [
        {
          id: 'felix_why',
          fact: 'Two years ago Masaru Kurosawa told him that if he married Reina, his firm would lose the Kurosawa account and Felix would never work in the city again. Felix chose his career and told Reina he had stopped loving her. It was a lie.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells the player off the record, outside the flat and without the folder, once the player has been honest with him at least once.',
        },
        {
          id: 'felix_drafted_it',
          fact: 'He drafted Chiyo’s will. She asked him to make the pretence test strict and to be the one who applies it, "because you are the only lawyer who will be fair to her, and I want you to watch her be happy." He still cannot tell whether that was kindness or a sentence.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player reads the will closely enough to notice his initials on every page, and asks him about them.',
        },
      ],
      speechStyle:
        'Careful conditionals and courtesies: "with respect", "if I may", "noted". Says her name often and gently. Asks permission before the question, then asks exactly the question.',
      topics: ['the will', 'the visits', 'Reina', 'her father', 'the folder', 'why he left'],
      voiceSamples: [
        'I am going to ask some questions I would rather not ask. Please do not make it easy for me to write no.',
        'Separate fridge shelves. Labelled. Noted. Most couples stop labelling by the second week.',
        'With respect, I have known her longer than you have known where she keeps the spoons.',
        'I left. I am aware. I would like, once, to be the man who stays in the room.',
      ],
      appearance:
        'An adult man, lean and tall, neat dark-blond hair, grey eyes behind thin steel glasses, a navy suit a little damp from the harbour air, and a worn leather folder held against his chest.',
      visualHook: 'A worn leather folder with a brass clasp, held to his chest like a shield.',
      silhouette: 'Tall and slightly stooped in a doorway, folder up, half bowing.',
      artSeed: 'oyb-felix-01',
      portrait: null,
      expressions: ['polite', 'careful', 'hurt', 'stung'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'seaview_hotel', activity: 'in a third-floor room, reading the will again' },
        { startMinute: 480, endMinute: 1080, locationId: 'seaview_hotel', activity: 'working in the lobby beside the resort model, not looking at it' },
        { startMinute: 1080, endMinute: 1260, locationId: 'harbour_street', activity: 'dinner alone at the noodle counter by the station steps' },
        { startMinute: 1260, endMinute: 1440, locationId: 'seaview_hotel', activity: 'in the lobby with a folder he has already read twice' },
      ],
      homeLocationId: 'seaview_hotel',
      knowledgeScope: ['felix', 'chiyo_will', 'reina', 'kurosawa_family', 'the_visits'],
      startingRelationship: { trust: 20, affection: 0, respect: 30, fear: 0, rivalry: 35 },
      gates: [
        {
          id: 'felix_off_the_record',
          label: 'He talks to you without the folder',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['felix_first_visit'] },
        },
        {
          id: 'felix_why_he_left',
          label: 'He tells you why he left her',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
      ],
      attributes: { might: 10, agility: 11, mind: 16, presence: 13, resolve: 14, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'masaru',
      name: 'Masaru Kurosawa',
      role: 'Reina’s father, chairman of Kurosawa Seaview Resorts, with a buyer waiting for her grandmother’s house',
      cardBlurb:
        'He wants your marriage declared a pretence so he can sell the house on the point, he will offer you twice what you need to say so, and he will be gracious about it either way.',
      pronouns: 'he/him',
      publicTraits: ['Never raises his voice', 'Generous in a way that is hard to refuse', 'Remembers every price he has ever been quoted'],
      hiddenDrives: [
        'His company is carrying a debt of its own, and the sale of Gull Point is the deal that saves it',
        'He spent thirty years watching his mother watch a pier through a telescope, and he wants the house gone so he can stop losing to it',
      ],
      values: ['Everything in writing is true; everything said aloud is negotiable', 'The family name outlasting everyone in it'],
      fears: ['Being his father: a man his wife did not love', 'Being the Kurosawa who lost the company'],
      socialStyle:
        'Sits, orders, compliments the food, and makes the offer over dessert as if it were a gift. Never threatens; describes, kindly, what will happen next.',
      boundaries: [
        'Will not raise his voice or his hand, and will call the police without hesitation if anybody else does',
        'Will not put a lie on paper',
        'Will not set foot inside the Cliff House',
      ],
      goals: ['Get the marriage declared a pretence and sell Gull Point before spring', 'Bring his daughter back into the family company'],
      secrets: [
        {
          id: 'masaru_made_felix_choose',
          fact: 'Two years ago he made Felix Arden choose between Reina and his career. He has never told Reina, and he believes it was a kindness.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player confronts him with it in front of Reina, he does not deny it. He explains it.',
        },
        {
          id: 'masaru_the_company',
          fact: 'Kurosawa Seaview Resorts owes more than it is worth. The resort on Gull Point is the deal that keeps the company alive, and the board has given him until spring.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'A careless uncle at a family lunch, or a player who reads the hotel’s accounts properly, finds it. The model in the lobby has a sold sticker on every room but one.',
        },
      ],
      speechStyle:
        'Soft, unhurried and hospitable. Speaks in prices and gifts, uses the player’s full name, and lets silences sit until somebody else fills them. Says please before everything he does not ask.',
      topics: ['the resort', 'the Cliff House', 'his mother', 'Reina', 'the offer', 'the company'],
      voiceSamples: [
        'Please, sit. I never negotiate standing up. It makes people believe they can leave.',
        'Everything on this bay has a price. I have simply been patient about most of it.',
        'Double. Tonight. One signature, and your grandfather never hears the word auction again.',
        'My mother loved that house more than she loved any of us. Forgive me for wanting to stop competing with a building.',
      ],
      appearance:
        'An older man, tall and silver-haired, a perfectly cut charcoal suit, a pale grey silk scarf, rimless glasses, and the same sharp dark eyes as his daughter.',
      visualHook: 'A pale grey silk scarf worn indoors and out, and his daughter’s eyes.',
      silhouette: 'Seated very still at a counter, hands folded, the only motionless thing in the room.',
      artSeed: 'oyb-masaru-01',
      portrait: null,
      expressions: ['polite', 'calculating', 'cold', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'seaview_hotel', activity: 'in the top-floor suite, up before everybody' },
        { startMinute: 420, endMinute: 1080, locationId: 'seaview_hotel', activity: 'in the lobby with the developer and the resort model' },
        { startMinute: 1080, endMinute: 1260, locationId: 'gull_point', activity: 'at the gate of his mother’s house with a surveyor, not going in' },
        { startMinute: 1260, endMinute: 1440, locationId: 'seaview_hotel', activity: 'in the suite, the pier lights in the window' },
      ],
      homeLocationId: 'seaview_hotel',
      knowledgeScope: ['masaru', 'kurosawa_family', 'the_cliff_house', 'chiyo_will', 'the_resort'],
      startingRelationship: { trust: 0, affection: 0, respect: 20, fear: 10, rivalry: 25 },
      gates: [
        {
          id: 'masaru_makes_an_offer',
          label: 'He makes you an offer',
          kind: 'OTHER',
          requires: { flagsSet: ['masaru_came'] },
        },
        {
          id: 'masaru_his_mother',
          label: 'He talks about his mother and the telescope',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['read_the_letters'] },
        },
      ],
      attributes: { might: 9, agility: 9, mind: 16, presence: 16, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_rules',
      title: 'Sign It, or the Deal’s Off',
      summary: 'Your wife of six hours has handed you twelve rules, one of them blank, and a pen. Tomorrow she buys the debt, but only if you sign tonight.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['reina', 'felix'],
      involvedLocationIds: ['the_flat'],
      knownRewardCopy: 'A signed contract, or a deal that is off, and a first night in a flat with one bedroom.',
      steps: [
        {
          id: 'the_page',
          playerCopy: 'Answer her. Sign the rules, write rule twelve, or say no.',
          directorNotes:
            'She is braced for an argument and has eleven spare copies. Every response is a real one. Signing as written gets brisk approval and a handshake she clearly rehearsed. Writing a rule twelve delights her more than she shows, and she will veto anything unreasonable in one word. Tearing the page up gets a second copy from the sleeve and a renegotiation if the player has a reason, and a deal that is off if they do not. Asking why her gets rule five quoted back, and a half-truth.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_it',
              label: 'Sign it as written',
              predicate: { flagsSet: ['used:take_the_deal'] },
              setsFlags: ['rules_signed'],
              closesFlags: ['deal_off'],
            },
            {
              routeId: 'wrote_twelve',
              label: 'Write rule twelve, then sign',
              predicate: { flagsSet: ['used:amend_the_rules'] },
              setsFlags: ['rules_signed', 'wrote_rule_twelve'],
              closesFlags: ['deal_off'],
            },
            {
              routeId: 'tore_it_up',
              label: 'Say no, and mean it',
              predicate: { flagsSet: ['used:refuse'] },
              setsFlags: ['deal_off', 'tore_up_the_rules'],
              closesFlags: ['rules_signed'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_night'],
            abilities: ['follow_the_old_story'],
            reputation: [],
          },
        },
        {
          id: 'the_knock',
          playerCopy: 'Get through the estate lawyer’s first visit.',
          directorNotes:
            'Felix chose the first night on purpose because it is the hardest night to fake. He asks politely to see the bedroom, the bathroom and the fridge, and he notices the blanket on the sofa. He is not hostile and he is not stupid, and he was going to marry the woman standing next to the player. Performing works if it is good. Lying works if it is consistent. Telling him the truth means he will write it down, and he will be kind about it, and it is very hard to undo.',
          enterWhen: { flagsSet: ['first_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sold_it',
              label: 'Show him a marriage',
              predicate: { flagsSet: ['used:put_on_a_show', 'felix_first_visit'] },
              setsFlags: ['passed_first_visit'],
              closesFlags: ['felix_knows'],
            },
            {
              routeId: 'talked_him_round',
              label: 'Keep the story straight',
              predicate: { flagsSet: ['used:keep_the_story_straight', 'felix_first_visit'] },
              setsFlags: ['passed_first_visit', 'first_lie_on_record'],
              closesFlags: ['felix_knows'],
            },
            {
              routeId: 'told_him',
              label: 'Tell him what this really is',
              predicate: { flagsSet: ['used:come_clean', 'felix_first_visit'] },
              setsFlags: ['felix_knows'],
              closesFlags: ['passed_first_visit'],
            },
            {
              routeId: 'shut_the_door',
              label: 'Refuse him entry',
              predicate: { flagsSet: ['used:refuse', 'felix_first_visit'] },
              setsFlags: ['visit_refused'],
              closesFlags: ['passed_first_visit'],
            },
          ],
          rewards: {
            xp: 60,
            items: [{ itemId: 'felix_form', qty: 1 }],
            flags: ['visit_one_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_estate', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_why_you',
      title: 'Why You?',
      summary: 'Out of every restaurant on the coast, a lawyer from the city picked yours, and she will not say why. Rule five says do not ask.',
      kind: 'MAIN',
      involvedCharacterIds: ['reina', 'teo'],
      involvedLocationIds: ['the_flat', 'teos', 'the_beach'],
      knownRewardCopy: 'The real reason a stranger married into your family, and what it has to do with your grandfather.',
      discoverWhen: { flagsSet: ['first_night'] },
      steps: [
        {
          id: 'find_out_why',
          playerCopy: 'Find out why she chose your family.',
          directorNotes:
            'Four ways to learn it and they are not equal. Being told is the version where she trusted the player. Pushing rule five gets it out of her angry and costs something. Reading the will in her suitcase is going through her things. Getting it from Teo means he finally admits he recognised her the moment she walked in.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself',
              predicate: { flagsSet: ['used:say_it_straight'], minRelationship: [{ characterId: 'reina', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:why_you', 'she_told_you_why'],
              closesFlags: ['broke_rule_five'],
            },
            {
              routeId: 'broke_rule_five',
              label: 'Break rule five and ask her outright',
              predicate: { flagsSet: ['used:ask_about_her'] },
              setsFlags: ['knows:why_you', 'broke_rule_five'],
              closesFlags: ['she_told_you_why'],
            },
            {
              routeId: 'read_the_will',
              label: 'Read her grandmother’s will',
              predicate: { hasItems: ['chiyo_will'] },
              setsFlags: ['knows:why_you', 'read_her_will'],
              closesFlags: ['she_told_you_why'],
            },
            {
              routeId: 'teo_said',
              label: 'Get it out of your grandfather',
              predicate: { flagsSet: ['spoke:teo'], minRelationship: [{ characterId: 'teo', dimension: 'trust', value: 78 }] },
              setsFlags: ['knows:why_you', 'teo_recognised_her'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['knows:the_letters'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_offer',
      title: 'Double, Tonight',
      summary: 'Her father wants one signature from you saying the marriage is a pretence, and he is offering twice what the debt is worth.',
      kind: 'MAIN',
      involvedCharacterIds: ['masaru', 'reina'],
      involvedLocationIds: ['teos', 'seaview_hotel'],
      knownRewardCopy: 'Twice the money, or her trust, and very probably not both.',
      discoverWhen: { flagsSet: ['masaru_came'] },
      steps: [
        {
          id: 'hear_him_out',
          playerCopy: 'Hear what her father wants.',
          directorNotes:
            'He is charming to Teo, generous about the mackerel and entirely honest about his offer. He leaves the envelope whether or not the player listens. Nothing he says is a lie, and the player should be able to feel how much easier this would be.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sat_with_him',
              label: 'Sit down at his end of the counter',
              predicate: { flagsSet: ['spoke:masaru'] },
              setsFlags: ['heard_the_offer'],
              closesFlags: [],
            },
            {
              routeId: 'sent_him_away',
              label: 'Refuse to hear it',
              predicate: { flagsSet: ['used:refuse', 'masaru_came'] },
              setsFlags: ['heard_the_offer', 'sent_masaru_away'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 50,
            items: [{ itemId: 'masarus_envelope', qty: 1 }],
            flags: ['offer_on_the_table'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'answer_him',
          playerCopy: 'Decide what to do with the envelope.',
          directorNotes:
            'A real temptation, not a trap. Taking it saves the restaurant twice over and costs Reina the house and the player her. Telling her is the version where the marriage becomes a partnership. Stringing him along is clever and dangerous, because he is better at this than the player is.',
          enterWhen: { flagsSet: ['offer_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her',
              label: 'Put the envelope in front of Reina',
              predicate: { flagsSet: ['used:say_it_straight', 'spoke:reina'] },
              setsFlags: ['told_reina_the_offer', 'refused_masaru'],
              closesFlags: ['sold_her_out'],
            },
            {
              routeId: 'turned_it_down',
              label: 'Give him the envelope back',
              predicate: { flagsSet: ['used:refuse'] },
              setsFlags: ['refused_masaru'],
              closesFlags: ['sold_her_out'],
            },
            {
              routeId: 'strung_him_along',
              label: 'Let him think you might',
              predicate: { flagsSet: ['used:keep_the_story_straight'], hasItems: ['masarus_envelope'] },
              setsFlags: ['playing_both_sides'],
              closesFlags: [],
            },
            {
              routeId: 'took_it',
              label: 'Sign his statement and take the money',
              predicate: { flagsSet: ['used:cash_in'], hasItems: ['masarus_envelope'] },
              setsFlags: ['sold_her_out', 'debt_paid_another_way'],
              closesFlags: ['refused_masaru', 'told_reina_the_offer'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['offer_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_rule_one',
      title: 'Rule One',
      summary: 'Don’t fall for me. She typed it first, which makes it either a warning or a confession.',
      kind: 'MAIN',
      involvedCharacterIds: ['reina'],
      involvedLocationIds: ['the_flat', 'the_beach', 'gull_point'],
      knownRewardCopy: 'What rule one is worth, said out loud by somebody.',
      discoverWhen: { flagsSet: ['first_night'] },
      steps: [
        {
          id: 'say_it',
          playerCopy: 'Decide what rule one is worth.',
          directorNotes:
            'This is the romance, and it is slow. Nobody breaks rule one in the first week, and the prose should never hurry it. Keeping it all year is a legitimate outcome and not a failure. If somebody breaks it, the other person has to decide what the contract is now.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_said_it',
              label: 'Say it first',
              predicate: {
                flagsSet: ['used:say_it_straight', 'knows:why_you'],
                minRelationship: [{ characterId: 'reina', dimension: 'affection', value: 70 }],
              },
              setsFlags: ['rule_one_broken', 'you_said_it_first'],
              closesFlags: ['kept_rule_one'],
            },
            {
              routeId: 'she_said_it',
              label: 'Let her say it first',
              predicate: {
                flagsSet: ['knows:why_you'],
                minRelationship: [
                  { characterId: 'reina', dimension: 'affection', value: 80 },
                  { characterId: 'reina', dimension: 'trust', value: 70 },
                ],
              },
              setsFlags: ['rule_one_broken', 'she_said_it_first'],
              closesFlags: ['kept_rule_one'],
            },
            {
              routeId: 'struck_it_out',
              label: 'Cross rule one out, together',
              predicate: { flagsSet: ['used:amend_the_rules'], minRelationship: [{ characterId: 'reina', dimension: 'trust', value: 75 }] },
              setsFlags: ['rule_one_broken', 'rule_one_struck'],
              closesFlags: ['kept_rule_one'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep rule one to the end',
              predicate: { flagsSet: ['anniversary'] },
              setsFlags: ['kept_rule_one'],
              closesFlags: ['rule_one_broken'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['rule_one_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_year',
      title: 'Three Hundred and Sixty-Five Days',
      summary: 'Felix Arden will visit four times. On the anniversary he signs that the marriage was real, or he does not.',
      kind: 'MAIN',
      involvedCharacterIds: ['felix', 'reina'],
      involvedLocationIds: ['the_flat', 'teos'],
      knownRewardCopy: 'A signature on the last page of a folder, and whatever the two of you are by then.',
      discoverWhen: { flagsSet: ['visit_one_done'] },
      steps: [
        {
          id: 'the_anniversary',
          playerCopy: 'Reach the anniversary as whatever the two of you are by then.',
          directorNotes:
            'Felix signs what he sees. A marriage that started as a contract and became real is real, and he will say so even if he was told the truth on the first night. A contract kept well is also what he sees, and he signs that too, unhappily. He only refuses for something he has watched being false, or for her father’s statement with the player’s name on it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'certified_in_love',
              label: 'He signs, and it is true',
              predicate: {
                flagsSet: ['anniversary', 'rule_one_broken'],
                minRelationship: [{ characterId: 'felix', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['certified', 'it_became_real'],
              closesFlags: ['not_certified'],
            },
            {
              routeId: 'certified_as_agreed',
              label: 'He signs, as agreed',
              predicate: { flagsSet: ['anniversary', 'rules_signed'], flagsUnset: ['felix_knows', 'sold_her_out'] },
              setsFlags: ['certified', 'kept_it_a_contract'],
              closesFlags: ['not_certified'],
            },
            {
              routeId: 'found_out',
              label: 'He will not sign',
              predicate: { flagsSet: ['felix_knows'] },
              setsFlags: ['not_certified'],
              closesFlags: ['certified'],
            },
            {
              routeId: 'sold_out',
              label: 'Her father’s statement reaches him first',
              predicate: { flagsSet: ['sold_her_out'] },
              setsFlags: ['not_certified'],
              closesFlags: ['certified'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['year_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_estate', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_letters',
      title: 'Fifty-Four Letters',
      summary: 'There is a telescope in a shuttered window on the point, aimed at your grandfather’s pier, and a tin under his bed he has never opened in front of you.',
      kind: 'LEAD',
      involvedCharacterIds: ['teo', 'reina', 'masaru'],
      involvedLocationIds: ['the_boathouse', 'gull_point'],
      knownRewardCopy: 'What happened between your grandfather and her grandmother fifty-five summers ago, and what is left of it.',
      discoverWhen: { flagsSet: ['knows:the_letters'] },
      steps: [
        {
          id: 'the_tin',
          playerCopy: 'Find out what is in your grandfather’s tin.',
          directorNotes:
            'Optional, and it must feel optional. A player who never asks never sees a beat of it. For one who does, keep it plain and physical: a dented tin, stamps from five decades, a handwriting that gets shakier. Being shown is a gift. Taking it is a theft he will notice, and forgive slowly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_showed_you',
              label: 'He opens it for you',
              predicate: { flagsSet: ['used:follow_the_old_story'], minRelationship: [{ characterId: 'teo', dimension: 'trust', value: 75 }] },
              setsFlags: ['read_the_letters', 'teo_opened_it'],
              closesFlags: ['took_the_tin'],
            },
            {
              routeId: 'you_took_it',
              label: 'Take it from the boathouse',
              predicate: { hasItems: ['chiyo_letters'] },
              setsFlags: ['read_the_letters', 'took_the_tin'],
              closesFlags: ['teo_opened_it'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:teo_and_chiyo'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_point',
          playerCopy: 'Take the letters to somebody who should read them.',
          directorNotes:
            'Three people the letters belong to, and each reading changes something different. Teo going up to the house he has watched for thirty years is the old story finishing. Reina reading them is her finding out what her grandmother meant. Masaru reading them is the only thing in this world that could make him stop the sale, and he will not do it in front of anybody.',
          enterWhen: { flagsSet: ['read_the_letters'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_teo',
              label: 'Take your grandfather up to the point',
              predicate: { atLocation: 'gull_point', flagsSet: ['teo_opened_it', 'used:follow_the_old_story'] },
              setsFlags: ['teo_went_up'],
              closesFlags: [],
            },
            {
              routeId: 'with_reina',
              label: 'Read them with Reina at the Cliff House',
              predicate: { atLocation: 'gull_point', flagsSet: ['spoke:reina'] },
              setsFlags: ['reina_read_them'],
              closesFlags: [],
            },
            {
              routeId: 'with_masaru',
              label: 'Give them to her father',
              predicate: {
                flagsSet: ['spoke:masaru', 'used:say_it_straight'],
                minRelationship: [{ characterId: 'masaru', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['masaru_read_them'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['old_story_told'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_auntie_bo',
      title: 'Nobody Walks This Pier',
      summary: 'Auntie Bo has run the dining room at Teo’s for thirty-one years, and she has already counted the toothbrushes.',
      kind: 'SIDE',
      involvedCharacterIds: ['bo', 'teo'],
      involvedLocationIds: ['the_pier', 'teos'],
      knownRewardCopy: 'Auntie Bo on your side of the kiosk, or at least not on the other one.',
      discoverWhen: { flagsSet: ['first_night'] },
      steps: [
        {
          id: 'the_kiosk',
          playerCopy: 'Deal with Auntie Bo.',
          directorNotes:
            'She is the most dangerous person in the story for the secret and the most loyal person in it for Teo. Fooling her works and costs something later. Telling her makes her the best ally the player has, because she will cover for anybody who told her first. Finding her payments in the ledger is finding out she has a secret too.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'let_her_in',
              label: 'Tell her the truth',
              predicate: { flagsSet: ['used:come_clean', 'spoke:bo'] },
              setsFlags: ['bo_knows', 'bo_in_on_it'],
              closesFlags: ['bo_fooled'],
            },
            {
              routeId: 'found_her_payments',
              label: 'Find what she has been paying',
              predicate: { flagsSet: ['used:read_the_fine_print'], hasItems: ['teos_ledger'] },
              setsFlags: ['knows:bo_paid'],
              closesFlags: [],
            },
            {
              routeId: 'fooled_her',
              label: 'Keep the story straight with her',
              predicate: { flagsSet: ['used:keep_the_story_straight', 'spoke:bo'] },
              setsFlags: ['bo_fooled'],
              closesFlags: ['bo_in_on_it'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['bo_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_pier', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_storm',
      title: 'The First Storm',
      summary: 'The autumn storms come in off the bay, and the end of the pier is the part they hit first.',
      kind: 'SIDE',
      involvedCharacterIds: ['reina', 'teo'],
      involvedLocationIds: ['the_pier', 'teos', 'the_flat'],
      knownRewardCopy: 'A restaurant still standing in the morning, and one night when the rules did not come up.',
      discoverWhen: { flagsSet: ['storm_came'] },
      steps: [
        {
          id: 'hold_the_pier',
          playerCopy: 'Get the restaurant through the night.',
          directorNotes:
            'The power is out, the window is flexing, and Teo is seventy-nine and going out onto the pier whatever anybody says. Reina turns out to be good with sandbags and bad with thunder. Whatever the player does, this is a night of forced proximity in the dark, and nobody quotes a rule.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'held_it',
              label: 'Sandbag and board up with her',
              predicate: { flagsSet: ['used:work_the_pier', 'storm_came'] },
              setsFlags: ['saved_the_pier'],
              closesFlags: [],
            },
            {
              routeId: 'held_her',
              label: 'Sit out the storm upstairs together',
              predicate: { atLocation: 'the_flat', flagsSet: ['storm_came', 'spoke:reina'] },
              setsFlags: ['storm_night_together'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['storm_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_pier', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_felix',
      title: 'The Man With the Folder',
      summary: 'Felix Arden ended his engagement to Reina two years ago, and now he decides whether her marriage is real.',
      kind: 'SIDE',
      involvedCharacterIds: ['felix', 'reina', 'masaru'],
      involvedLocationIds: ['seaview_hotel', 'harbour_street', 'the_flat'],
      knownRewardCopy: 'Why he really left, and who should hear it.',
      discoverWhen: { flagsSet: ['felix_first_visit'] },
      steps: [
        {
          id: 'why_he_left',
          playerCopy: 'Find out why Felix really left her.',
          directorNotes:
            'He will not say it on a visit, with the folder open. Off the record, on the station steps or at the noodle counter, to somebody who has been straight with him, he will.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'He tells you, off the record',
              predicate: { flagsSet: ['spoke:felix'], minRelationship: [{ characterId: 'felix', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:why_felix_left'],
              closesFlags: [],
            },
            {
              routeId: 'her_father_said',
              label: 'Her father lets it slip',
              predicate: { flagsSet: ['spoke:masaru', 'used:ask_about_her'] },
              setsFlags: ['knows:why_felix_left'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['felix_secret_known'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide who tells Reina, if anybody does.',
          directorNotes:
            'Making him tell her himself is the generous version and it might cost the player the marriage. Telling her for him is honest and takes his chance away. Keeping it is a choice too, and it becomes a secret the player is now keeping from her.',
          enterWhen: { flagsSet: ['felix_secret_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_tells_her',
              label: 'Make him tell her himself',
              predicate: { flagsSet: ['used:say_it_straight', 'spoke:felix'] },
              setsFlags: ['felix_confessed'],
              closesFlags: ['felix_exposed'],
            },
            {
              routeId: 'you_tell_her',
              label: 'Tell her yourself',
              predicate: { flagsSet: ['used:come_clean', 'spoke:reina'] },
              setsFlags: ['felix_exposed'],
              closesFlags: ['felix_confessed'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it to yourself',
              predicate: { flagsSet: ['visit_two'] },
              setsFlags: ['felix_secret_kept'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['felix_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_no_deal',
      title: 'No Deal',
      summary: 'You said no. She took her lemon tree and left, and the auction is still on Friday.',
      kind: 'MAIN',
      involvedCharacterIds: ['reina', 'teo', 'bo'],
      involvedLocationIds: ['harbour_street', 'the_station', 'teos'],
      knownRewardCopy: 'Another way to save the restaurant, or her back on better terms, or neither.',
      discoverWhen: { flagsSet: ['deal_off'] },
      steps: [
        {
          id: 'before_friday',
          playerCopy: 'Find another way before the auction, or let it go.',
          directorNotes:
            'Refusing is a real path and must not be punished as a mistake. She has gone to the hotel, not the city, because she needs a spouse within weeks and has nobody else. Going after her is a renegotiation on the player’s terms. The pier can raise the money if the player has earned it. Or Friday comes.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_after_her',
              label: 'Go after her and make a better deal',
              predicate: { flagsSet: ['used:say_it_straight', 'spoke:reina'] },
              setsFlags: ['rules_signed', 'renegotiated'],
              closesFlags: ['teos_sold'],
            },
            {
              routeId: 'the_pier_paid',
              label: 'Ask the pier to raise it',
              predicate: { minFactionReputation: [{ factionId: 'faction_pier', value: 60 }] },
              setsFlags: ['pier_paid', 'debt_paid_another_way'],
              closesFlags: ['teos_sold'],
            },
            {
              routeId: 'let_it_go',
              label: 'Let the auction happen',
              predicate: { flagsSet: ['auction_held'] },
              setsFlags: ['teos_sold'],
              closesFlags: ['renegotiated'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['friday_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_felix_knocks',
      atWorldMinute: 22 * 60 + 20,
      locationId: 'the_flat',
      publicCopy: 'Two knocks at the flat door at twenty past ten: Felix Arden, the estate’s lawyer, with a leather folder and an apology for the hour.',
      directorNotes:
        'The will allows unannounced visits from the wedding day, and he has chosen the first night because it is the hardest to fake. He asks to see the bedroom, the bathroom and the fridge, politely, and he notices the blanket on the sofa. He is not hostile. He was engaged to Reina, and that is in the room with all three of them.',
      setsFlags: ['felix_first_visit'],
      cancelledByFlags: ['deal_off', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'felix', toLocationId: 'the_flat' }],
    },
    {
      id: 'we_teo_on_the_water',
      atWorldMinute: 1440 + 5 * 60 + 30,
      locationId: 'the_boathouse',
      publicCopy: 'At half past five the boathouse door is open, Teo’s rowing boat is gone from its rope, and a dented biscuit tin is in plain sight under the bed.',
      directorNotes:
        'Only for a player who has already been down to the boathouse, which means they went looking for their grandfather on purpose. It is an ordinary tin in an ordinary room. Do not make it ominous; make it private.',
      setsFlags: ['knows:the_letters'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: ['visited:the_boathouse'],
      movesCharacters: [{ characterId: 'teo', toLocationId: 'the_pier' }],
    },
    {
      id: 'we_bo_breakfast',
      atWorldMinute: 1440 + 7 * 60 + 10,
      locationId: 'the_flat',
      publicCopy: 'Auntie Bo comes up the back stairs at ten past seven with a tray of rice and grilled fish, and does not knock.',
      directorNotes:
        'She has never knocked on this door. She looks at the sofa first, then at the bedroom door, then at the player, and asks three questions before the tray is down. She is fishing, and she is very good at it.',
      setsFlags: ['bo_came_up'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'bo', toLocationId: 'the_flat' }],
    },
    {
      id: 'we_the_bank',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'harbour_street',
      publicCopy: 'At ten, in the bank on Harbour Street, Reina signs four pages and the debt on Teo’s changes hands.',
      directorNotes:
        'Only if the rules were signed. The lender’s clerk is relieved. The bank manager eats at Teo’s counter on Tuesdays, so the pier will know by Tuesday that a Kurosawa paid, whatever anybody tells it.',
      setsFlags: ['debt_bought'],
      cancelledByFlags: ['deal_off', 'left_the_map'],
      requiresFlags: ['rules_signed'],
      movesCharacters: [{ characterId: 'reina', toLocationId: 'harbour_street' }],
    },
    {
      id: 'we_masaru_at_the_counter',
      atWorldMinute: 1440 + 19 * 60 + 30,
      locationId: 'teos',
      publicCopy: 'A silver-haired man in a charcoal suit takes the end stool at Teo’s counter and orders the grilled mackerel nobody orders. Reina sees him and puts her fork down.',
      directorNotes:
        'Masaru Kurosawa has come to look at the person his daughter married. He is charming to Teo, complimentary about the fish, and before he goes he leaves a cream envelope on the counter with the player’s full name on it.',
      setsFlags: ['masaru_came'],
      cancelledByFlags: ['deal_off', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'masaru', toLocationId: 'teos' }],
    },
    {
      id: 'we_first_sunday',
      atWorldMinute: 2 * 1440 + 19 * 60,
      locationId: 'teos',
      publicCopy: 'Sunday dinner at Teo’s, the first one under rule ten. Teo has invited the whole pier without telling anybody.',
      directorNotes:
        'Forty regulars at one long table, every one of them asking how the two of them met. Bo is doing the seating. This is the first full public performance of the marriage, and the cover story has to survive forty versions of the same question.',
      setsFlags: ['first_sunday'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: ['rules_signed'],
      movesCharacters: [
        { characterId: 'teo', toLocationId: 'teos' },
        { characterId: 'bo', toLocationId: 'teos' },
        { characterId: 'reina', toLocationId: 'teos' },
      ],
    },
    {
      id: 'we_the_storm',
      atWorldMinute: 4 * 1440 + 21 * 60,
      locationId: 'the_pier',
      publicCopy: 'The first autumn storm comes in off the bay after dark. Waves break over the end of the pier, the power goes, and the restaurant’s front window starts to flex.',
      directorNotes:
        'Teo goes out onto the pier with sandbags whatever anybody says. Reina is good in a crisis and frightened of thunder, and will admit only the first. Nobody quotes a rule tonight.',
      setsFlags: ['storm_came'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'teo', toLocationId: 'the_pier' }],
    },
    {
      id: 'we_the_auction',
      atWorldMinute: 7 * 1440 + 10 * 60,
      locationId: 'harbour_street',
      publicCopy: 'Ten o’clock on Friday at the auction rooms on Harbour Street: lot fourteen, the restaurant at the end of the pier and the flat above it.',
      directorNotes:
        'Only if the deal is off and nothing else paid. Teo sits in the back row in his grill jacket. Masaru’s developer bids, politely, and keeps bidding.',
      setsFlags: ['auction_held'],
      cancelledByFlags: ['debt_bought', 'debt_paid_another_way', 'rules_signed'],
      requiresFlags: ['deal_off'],
      movesCharacters: [{ characterId: 'teo', toLocationId: 'harbour_street' }],
    },
    {
      id: 'we_lantern_festival',
      atWorldMinute: 9 * 1440 + 19 * 60,
      locationId: 'the_beach',
      publicCopy: 'The autumn lantern festival: the whole town on the shingle at dusk, and the tradition that every married couple floats one lantern between them.',
      directorNotes:
        'The most public romantic moment of the year and the hardest to fake, because the whole town watches who lights it and who lets go. Teo stands apart and looks across the water at the point.',
      setsFlags: ['festival_night'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: ['rules_signed'],
      movesCharacters: [
        { characterId: 'reina', toLocationId: 'the_beach' },
        { characterId: 'teo', toLocationId: 'the_beach' },
        { characterId: 'bo', toLocationId: 'the_beach' },
      ],
    },
    {
      id: 'we_felix_second_visit',
      atWorldMinute: 90 * 1440 + 18 * 60,
      locationId: 'the_flat',
      publicCopy: 'A wet evening in January, unannounced: Felix Arden’s second visit, with the same folder and a new umbrella.',
      directorNotes:
        'Three months in. Whatever the two of them have become is visible in the flat now: whose mug is where, whether the sofa still has a blanket on it. He notices all of it and says very little.',
      setsFlags: ['visit_two'],
      cancelledByFlags: ['not_certified', 'deal_off', 'left_the_map'],
      requiresFlags: ['visit_one_done'],
      movesCharacters: [{ characterId: 'felix', toLocationId: 'the_flat' }],
    },
    {
      id: 'we_the_anniversary',
      atWorldMinute: 365 * 1440 + 16 * 60 + 5,
      locationId: 'the_flat',
      publicCopy: 'One year to the minute since the registry office. Felix Arden is on the stairs with the folder, and the last page in it is the one he signs.',
      directorNotes:
        'Whatever the year was, this is where it is read out. Write the room exactly as the year left it. If the player wants to skip here early, let them; the year can be crossed in jumps.',
      setsFlags: ['anniversary'],
      cancelledByFlags: ['not_certified', 'left_the_map'],
      requiresFlags: ['rules_signed'],
      movesCharacters: [{ characterId: 'felix', toLocationId: 'the_flat' }],
    },
  ],
  promises: [
    {
      id: 'p_rule_one',
      kind: 'FINALE',
      label: 'Whether anybody breaks rule one',
      seedHint: 'Rule 1: Don’t fall for me, typed first, in a font she chose on purpose.',
      payoffHint: 'Somebody says it out loud, and the contract has to decide what it is now.',
      weight: 1,
    },
    {
      id: 'p_why_you',
      kind: 'MYSTERY',
      label: 'Why a stranger chose your family',
      seedHint: 'She orders without the menu and already knows which stool wobbles.',
      payoffHint: 'Her grandmother’s last letter: if you ever need a husband in a hurry, go and eat at Teo’s.',
      weight: 0.9,
    },
    {
      id: 'p_the_offer',
      kind: 'BOSS',
      label: 'Her father’s price',
      seedHint: 'A silver-haired man orders the grilled mackerel nobody orders.',
      payoffHint: 'Twice the debt for one signature saying the marriage is a lie.',
      weight: 0.8,
    },
    {
      id: 'p_the_folder',
      kind: 'RIVAL',
      label: 'The man who left her and now holds the pen',
      seedHint: 'He says her name in a voice that has said it a thousand times.',
      payoffHint: 'He did not stop loving her. Her father made him choose, and he chose wrong.',
      weight: 0.7,
    },
    {
      id: 'p_the_letters',
      kind: 'THEME',
      label: 'Fifty-four letters under a bed',
      seedHint: 'A brass telescope in a shuttered window on the point, aimed at the end of the pier.',
      payoffHint: 'Teo and Chiyo were engaged one summer, fifty-five years ago, and wrote to each other until she died.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_grill',
      name: 'You Run the Grill',
      role: 'Cooking, heat and heavy lifting',
      summary: 'You cook at your grandfather’s grill every night, so you are good with food, heat and heavy lifting, and the pier trusts your hands.',
      playstyle: ['Practical', 'Cooks', 'Physical'],
      blurb: 'Fifty-one years of Teo’s recipes live in your wrists, and you have never once plated a fish without checking its eye.',
      attributeBonus: { might: 2, mind: 1, resolve: 1 },
      skillProficiencies: { cooking: 3, graft: 2 },
      startingItems: [{ itemId: 'charcoal_tongs', qty: 1 }],
      startingAbilities: ['cook_for_her'],
      startingReputation: [{ factionId: 'faction_pier', amount: 10 }],
    },
    {
      id: 'arch_floor',
      name: 'You Run the Floor',
      role: 'Front of house, social charm',
      summary: 'You run the dining room, so you are good at reading people, keeping a story straight and making a room like you on purpose.',
      playstyle: ['Charming', 'Quick talker', 'Reads people'],
      blurb: 'You can seat forty people in an hour and remember which of them are not speaking to each other.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { charm: 3, improvise: 2 },
      startingItems: [{ itemId: 'order_pad', qty: 1 }],
      startingAbilities: ['put_on_a_show'],
      startingReputation: [{ factionId: 'faction_pier', amount: 10 }],
    },
    {
      id: 'arch_books',
      name: 'You Keep the Books',
      role: 'Technical: numbers and fine print',
      summary: 'You do the restaurant’s accounts, so you are good at documents, clauses and noticing what does not add up, including in a marriage contract.',
      playstyle: ['Careful', 'Observant', 'Reads contracts'],
      blurb: 'You were the one who opened the lender’s letter, and you have read it eleven times.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { fine_print: 3, attention: 2 },
      startingItems: [{ itemId: 'teos_ledger', qty: 1 }],
      startingAbilities: ['read_the_fine_print'],
      startingReputation: [],
    },
    {
      id: 'arch_came_back',
      name: 'You Came Back',
      role: 'City career, outsider background',
      summary: 'You left for a job in the city and came home when you heard about the debt, so you are good at straight talk and saying no, and the pier is still deciding about you.',
      playstyle: ['Blunt', 'Independent', 'Outsider'],
      blurb: 'Your city flat is sublet to a stranger, your old desk has somebody else’s plant on it, and there is an open return ticket in your wallet.',
      attributeBonus: { resolve: 2, presence: 1, agility: 1 },
      skillProficiencies: { candour: 3, improvise: 1, charm: 1 },
      startingItems: [{ itemId: 'return_ticket', qty: 1 }],
      startingAbilities: ['say_it_straight'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the marriage certificate?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Reyes' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What do you do at Teo’s?',
      helpText:
        'Your job at your grandfather’s restaurant, or the life you came home from: whether you cook, run the floor or keep the books. It sets what you are good at, and it stays fixed for the whole story. It does not decide whether you sign her rules, keep them, or fall for her. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'appearance',
      label: 'What does she see when you open the door?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Still in the suit from the registry office, tie gone, smelling faintly of charcoal.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Four of the twelve are losses: the auction, the envelope, the pretence and
   * the last train. None is written as a punishment. "The Last Train" is
   * walking away and is open early. "One Year, To the Day" is the contract
   * kept well and ended kindly, and it is a good ending, not a consolation.
   * The two UNIQUE endings need the optional old story; everything else is
   * reachable by a player who never asks about the telescope.
   */
  endings: [
    {
      id: 'end_one_year_to_the_day',
      name: 'One Year, To the Day',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['certified', 'kept_it_a_contract'], flagsUnset: ['rule_one_broken'] },
      condition:
        'The contract was kept, well, all the way to the end. Felix signed, Reina got the house, the debt was torn up, and nobody broke rule one, or nobody said so. Write it as a good ending between two people who were excellent at something difficult, with a quiet divorce and a handshake that goes on slightly too long.',
      epilogue:
        'The divorce takes eleven minutes at the same registry office. Reina moves to the point with the lemon tree. She still eats at Teo’s on Sundays, at the end of the counter, and the pier still calls you by one name for about a year after it stops being true.',
      hint: '',
    },
    {
      id: 'end_rule_one',
      name: 'Rule One',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: {
        flagsSet: ['certified', 'rule_one_broken'],
        minRelationship: [{ characterId: 'reina', dimension: 'affection', value: 80 }],
      },
      condition:
        'Somebody broke rule one and said so, and at the anniversary the two of them decided to stay married on purpose. Felix signs a true thing. Write the moment the contract stops being the reason, and do not make anybody give a speech about it.',
      epilogue:
        'Rule two is never invoked. The page of rules stays in the kitchen drawer with the takeaway menus, and in the second year somebody adds a thirteenth in pencil about the duvet. The sofa goes to Auntie Bo, who claims she always wanted it.',
      hint: 'She typed rule one first.',
    },
    {
      id: 'end_rule_twelve',
      name: 'Rule Twelve',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['wrote_rule_twelve', 'rule_one_broken', 'certified'] },
      condition:
        'The player wrote a rule twelve on the first night, and by the anniversary it turned out to be the only rule either of them still kept. Name the rule the player wrote, and write the ending around it, because this ending belongs to that one line.',
      epilogue:
        'They have the eleven typed rules framed as a joke for the restaurant wall. The twelfth, in the player’s handwriting, is not on the wall. Reina keeps it in her purse, folded small, and has done since about March.',
      hint: '',
    },
    {
      id: 'end_two_lanterns',
      name: 'Two Lanterns',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['old_story_told', 'teo_went_up', 'rule_one_broken'] },
      condition:
        'The old story was finished as well as the new one. Teo went up to the house on the point with the tin, and the two of them broke rule one. Play the festival or the point at dusk, with one lantern for the two of them and one that Teo lights alone. Do not over-explain the letters.',
      epilogue:
        'Teo reads the fifty-four replies aloud in the garden of the Cliff House, one evening, to nobody in particular, and then leaves them in the drawer of the telescope table. The lemon tree goes back into the south wall. Its first lemon of the year goes on the counter at Teo’s, in a saucer, and nobody is allowed to use it.',
      hint: 'There is a telescope on the point.',
    },
    {
      id: 'end_the_telescope',
      name: 'The Telescope',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['masaru_read_them', 'old_story_told'] },
      condition:
        'Masaru Kurosawa read his mother’s letters, and he called off the sale. This is the only way he ever changes his mind, and he does it alone, in writing, with no apology. Whatever the marriage became, the house is safe for a reason that has nothing to do with it.',
      epilogue:
        'The resort model leaves the hotel lobby in a crate. Masaru never sets foot in the Cliff House, but once, in spring, he eats at Teo’s counter and orders the mackerel, and Teo charges him for it, and both of them seem to think that was the right thing.',
      hint: '',
    },
    {
      id: 'end_our_kitchen',
      name: 'Our Kitchen',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['certified', 'bo_in_on_it', 'saved_the_pier'],
        minFactionReputation: [{ factionId: 'faction_pier', value: 60 }],
      },
      condition:
        'Teo’s survived the storm, the debt and the year, Auntie Bo was in on it from the start, and the pier took the two of them as a pair. They end up running the restaurant together, partners at least. Name what they changed about it, because this ending is about what they built.',
      epilogue:
        'Reina does the contracts and the suppliers are terrified of her. The specials board gets a new dish every Sunday, written in two handwritings. Teo cooks two nights a week and complains about the other five, and Bo’s kiosk gets a second chair.',
      hint: '',
    },
    {
      id: 'end_sold_on_friday',
      name: 'Sold On Friday',
      rarity: 'COMMON',
      minTurn: 18,
      requires: { flagsSet: ['teos_sold'] },
      condition:
        'The deal was off, nothing else paid, and the restaurant went at auction. This is a real loss and must be written as one, without blame. Teo is the one who carries the last box out. Let it be sad and specific.',
      epilogue:
        'The developer keeps the neon sign and takes the apostrophe out. Teo moves into the flat over the bakery next to Bo’s and goes out in the rowing boat every morning anyway. Somewhere across the bay a house is sold too, and nobody who loved either place is asked.',
      hint: '',
    },
    {
      id: 'end_double_tonight',
      name: 'Double, Tonight',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['sold_her_out'] },
      condition:
        'The player signed Masaru’s statement and took the money. Teo’s is saved twice over and Reina loses the house. Do not make the player a villain and do not let them off: write what the money bought and what it cost, and let Reina be precise about it.',
      epilogue:
        'The restaurant gets a new roof and a new hood. Reina is gone by the morning; the only thing left is the eleventh copy of the rules on the kitchen counter, with every rule but the first crossed out. The resort opens two years later. Teo never once looks across the bay at it.',
      hint: '',
    },
    {
      id: 'end_a_pretence',
      name: 'A Pretence',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['not_certified'], flagsUnset: ['sold_her_out'] },
      condition:
        'Felix would not sign. The marriage is found to be a pretence, the house goes to Masaru, and the debt is still owed to Reina. Nobody is a villain here: the truth simply arrived in the wrong order. Write the two of them working out what they owe each other now.',
      epilogue:
        'Reina takes the debt off the restaurant anyway, three months later, in a letter with no explanation and one rule on it: do not thank me. The Cliff House is sold in the spring. Felix asks to be taken off the Kurosawa account and nobody asks him why.',
      hint: '',
    },
    {
      id: 'end_the_last_train',
      name: 'The Last Train',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of the marriage, the restaurant and the town, on the last train. Do not make it a tragedy and do not redeem it. It is a coherent answer to marrying a stranger for money, and the people it costs most are still on the pier.',
      epilogue:
        'The night guard at the station writes nothing down, because he never does. Reina sits up on the short sofa until two, then folds the blanket and puts it back exactly where it was. Teo opens the next day at the usual time and does not sing.',
      hint: '',
    },
    {
      id: 'end_second_chances',
      name: 'Second Chances',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['felix_confessed', 'year_decided'], flagsUnset: ['rule_one_broken'] },
      condition:
        'Felix told Reina why he really left, and when the year ended the person she went back to was him. The player is the reason it happened and is not the person she chose. Write it generously: a contract kept, a friend made, and a door the player held open for somebody else.',
      epilogue:
        'The divorce and the engagement are announced in the same week, which the pier considers efficient. Felix brings Reina to Teo’s on Sundays and always takes the stool that wobbles, without being asked. The player is the first name on the guest list, in Reina’s small exact handwriting.',
      hint: '',
    },
    {
      id: 'end_no_contract',
      name: 'No Contract',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['pier_paid'] },
      condition:
        'The player refused the deal and the pier paid the debt instead, a stall and a regular at a time. Reina is free to find another way to keep her house, and the player is free of any rule. Whatever happens between them now happens with nothing signed, which is a different and harder thing.',
      epilogue:
        'PIER NEWS lists every contribution by name, including the ferryman’s eleven coins. Teo pays all of them back over three years in fish. Reina still comes on Sundays. Nobody is sure what the two of you are, least of all Bo, and it is the first thing in thirty-one years she has not been able to count.',
      hint: '',
    },
  ],
  opening:
    'Your wife of six hours is standing in your doorway with two suitcases and a potted lemon tree.\n\n"Reina Kurosawa," she says, in case you’d forgotten. "Hello again."\n\nShe steps past you and takes in the flat. One bedroom. One sofa. One bathroom door that doesn’t lock. Downstairs, your grandfather is singing over the grill. You told him this was real.\n\nShe hands you a typed page. Twelve numbered lines.\n\nRule 1: Don’t fall for me.\n\nLine twelve is blank.\n\n"Twelve’s yours. Within reason." She holds out a pen. "Tomorrow I buy your grandfather’s debt. A year from today, I tear it up. Sign it, or the deal’s off."',
  openingPanel: {
    assetKey: 'story_one_year_bride/opening',
    alt: 'Reina in a cream dress and charcoal trench coat holds out a pen and a typed page in a small flat’s doorway at night, two suitcases and a potted lemon tree beside her.',
  },
  openingSuggestions: [
    '"I’ll sign. First tell me why you picked my family."',
    'I take the pen and write on line twelve: No lying to each other when we’re alone.',
    'I tear the page in half, slowly, and watch her face while I do it.',
  ],
  coverDirection: [
    'SUBJECT: Reina Kurosawa, a lawyer on her wedding night, alone and unmistakable in the foreground of a key visual for a romance anime about a contract marriage.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Long black hair pinned in a low knot with a silver clip, sharp dark eyes, a cream dress under a belted charcoal trench coat.',
    'She holds a typed sheet of paper toward the viewer in one hand and a fountain pen in the other, one eyebrow raised, a small challenging smile.',
    'On the hand holding the pen, a plain gold ring wrapped round with bright red thread, clearly visible.',
    'The paper shows only abstract grey lines: no letters, no numbers, nothing that reads as writing.',
    'BEHIND HER, soft and secondary: the doorway of a small cosy flat at night, two suitcases and a potted lemon tree, and through a window the warm lights of a wooden pier over a dark harbour.',
    'LIGHT: warm amber lamplight on her face and hands, cool blue harbour night behind her.',
    'TITLE: the words ONE-YEAR BRIDE painted into the art in the upper third as an elegant serif romance logo, cream with a thin red thread looping through the letters,',
    'spelled exactly ONE-YEAR BRIDE, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const ONE_YEAR_BRIDE = StoryVersion.parse(raw);
