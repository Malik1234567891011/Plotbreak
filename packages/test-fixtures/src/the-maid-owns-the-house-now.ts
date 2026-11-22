import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Maid Owns the House Now" — a role reversal with a deadline.
 *
 * The family went broke last month. The family's maid of eleven years bought
 * the house at the bankruptcy auction yesterday, and on turn one
 * she is holding out an apron to the heir. The structural bet is Good Morning,
 * Husband's: one person the whole world is arranged around, who is a person
 * rather than a reward, and an ordinary day that is worth playing on its own.
 * What this world adds is money with a date on it.
 *
 * Clara is not a prize and the apron is not a punishment. She is the employer,
 * she can dock a wage or show the player the door, and she has a secret of her
 * own: she bought the house with eleven years of savings, the butler's pension
 * and a fourteen-day loan that the neighbour across the valley has quietly
 * bought. The wedding booked for day fourteen is what pays it. Every chore the
 * player does or refuses to do is, underneath the comedy, about that.
 *
 * The second secret is literally upstairs. The player's father did not go
 * abroad. He is in the attic box room with a tin of biscuits and a painting
 * that belongs to his creditors, and the opener's floorboard is him. Clara's
 * first instruction, "start at the top", walks the player straight into it,
 * which is what makes the first turn change something whatever they choose.
 *
 * Refusing is authored, not punished. A player who walks out of the hall on
 * turn one still has the town, Lady Pemberton and the creditors' man, all of
 * whom have a use for a broke heir, and an ending of their own.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest`
 * refills those and a body unused to work is the honest thing for rest to
 * restore. Scandal is the first GOOD_LOW in array order because the generic
 * cost path and PUBLIC_VIOLENCE both take the first one, and a fistfight in a
 * fallen family's hall is exactly what the town talks about. Exposure is the
 * second: how close the secrets in this house are to coming out.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which never sees resources, step notes or any ability except
 * the chosen archetype's starting ones. So Clara's terms, docked wages, what
 * work does to a body that has never done it, how the town hears things, how
 * lies get checked and the fourteen-day clock are all hard canon; the player
 * starts holding Clara's written terms, a quest item; and every archetype
 * starts with Know the House plus one move of its own. The tone guide is also
 * the cover's mood text, so the 13+ limits sit in hard canon instead.
 *
 * Everyone in this story is an adult, and the first line of hard canon gives
 * every age: the player twenty-nine, the youngest of the cast twenty-two.
 * Appearances say "adult" or "older" and describe costume, never an age.
 */

const raw = {
  id: 'sv_the_maid_owns_the_house_now_1',
  storyId: 'story_the_maid_owns_the_house_now',
  version: 1,
  title: 'The Maid Owns the House Now',
  fantasyLabel: 'She was your maid. Now you work for her.',
  hook: 'Your family went broke. Your maid of eleven years bought the mansion at auction, and now you work for her.',
  premise:
    'Your family has lived in Wrenhurst House for a hundred and ten years: forty rooms on a cliff above a harbour town, a ballroom, a rose garden and three hundred stairs. Last month the money ran out. The bailiffs came, your father vanished the same night, and everything with a price on it was sold at auction, including the house.\n\n' +
    'The buyer was Clara Voss, who was the family’s maid for eleven years. Nobody in town can work out how a maid paid for a mansion, and she is not saying.\n\n' +
    'You have nowhere else to go, so she has offered you what she would offer anyone: a bed in the servants’ wing, three meals, a wage if you earn it, and work. Floors, silver, stairs, and a ballroom nobody has opened in six years.\n\n' +
    'Because the house has one paying booking. In fourteen days a hundred and twenty guests arrive for a wedding, and if it goes wrong, Clara loses the house she just bought. The neighbour on the next hill wanted it badly and still does. A polite man from the creditors keeps ringing at the gate, asking after your father.\n\n' +
    'Work for her, charm her, fight her, lie to her, or try to take the house back. She knows how you take your tea and how you take bad news. Now she is about to find out what you are like when nobody is paying.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Comedy', 'Slice of life', 'Modern', 'Drama'],
  mechanicsChips: [
    'Role reversal',
    'She is the boss, and can say no',
    'A wedding in fourteen days',
    'A secret at the top of the house',
    'Work, charm, lie or walk out',
  ],
  contentDescriptors: ['ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can spend ten turns scrubbing stairs and arguing with Clara about the right way to fold a napkin, and that is a real way to play this. You can also refuse the apron, lie to everybody, side with the woman across the valley, or go straight upstairs to find out what is creaking. Clara is not a prize. She bought the house, she is your boss, and she has already pencilled in your first docked wage, just in case.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'the_front_hall',
    startWorldMinute: 6 * 60 + 30,
    startingItems: [
      { itemId: 'signet_ring', qty: 1 },
      { itemId: 'claras_terms', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is in their twenties: twenty-nine, a year younger than Clara, and the family’s only heir. Clara Voss is thirty, Imogen Marsh, whom everyone calls Midge, is twenty-two, Silas Dunmore forty-four, Augustin fifty-six, Lady Honoria Pemberton fifty-eight and Hugo Ashworth sixty-three. Midge is twenty-two and the youngest; nobody in the story is younger than that. Clara was nineteen and the player eighteen when she joined the household, so she has only ever known them as an adult. She was never their nanny or carer, and no memory or flashback shows the player under eighteen in her care.',
      'The family is broke. Last month the money ran out, the receivers sold everything of value, and the player now owns the clothes they arrived in and one signet ring. The family surname is whatever the player’s surname is; the house has been called Wrenhurst House for a hundred and ten years.',
      'Clara Voss worked in Wrenhurst House as a maid for eleven years and bought it at the bankruptcy auction yesterday. She owns it. Her terms reached the player in writing last night, and she holds to them exactly: a bed in the old valet’s room off the kitchen passage, three meals at the staff table, a wage paid in cash every Friday, Sunday afternoons off, and either side may end it at any time. The player is free to refuse.',
      'Clara docks wages in writing, in her ledger, one entry at a time: for giving her orders, for breakages and for walking off a job. Pulling rank on her costs a day’s wage. Work done properly she writes down too, just as precisely, and never mentions.',
      'The player has never done a day of household work. Stairs, buckets, coal and silver genuinely tire them; a night’s sleep and a meal put it back, and over the fortnight they visibly get stronger and better at it. Worn out, they can still talk, badly, but cannot carry anything up anything.',
      'Serving properly, a tray carried up a stair without a sound, a table laid for twenty, a guest announced, is a craft the player does not have at the start. Hugo will teach it if he is asked properly, Midge knows the shortcuts, and failing at it until it works also works. Until then the player is clumsy with a tray.',
      'Kestrel Bay is watching the fallen heir. Anything done in public, or loudly enough for the staff to repeat, reaches the pub and the Gazette’s society page within a day: pulling rank, a shouting match, a slammed door. If the player loses their temper, Hugo steps between them and whoever it is, Clara docks a wage or shows them the door, and nobody is seriously hurt. Talk makes tradesmen want cash, the bank cool on Clara and the bride’s family nervous; quiet good work lets it die down.',
      'A lie in this house holds until somebody checks, and Hugo always checks. Each lie needs a second one to hold it up, and the more of them there are, the closer the house’s secrets come to coming out: Midge notices the biscuits, Clara counts the cocoa, Silas asks his question slightly differently. Telling the truth costs something on the spot and stops it getting worse.',
      'The clock runs whatever the player does, and the house keeps working whether or not they are in the room. Today is day one of fourteen. Silas Dunmore rings at the front gate at eleven every morning, the bride’s mother inspects the ballroom on day seven, the wedding is on day fourteen, and the loan falls due at nine on the morning of day fifteen.',
      'The player’s father, Augustin, did not go abroad. The night the bailiffs came he took a room in a boarding house in town, where he posted the postcard. Nine days ago he crept back, and he has been hiding in the attic box room ever since, getting in and out through the old coal chute in the cellar. Hugo Ashworth knows and carries a tray up every night. Clara does not know. His shame is played for comedy and warmth, and he is never a danger to himself.',
      'Clara paid for the house with eleven years of savings, Hugo Ashworth’s whole pension, and a fourteen-day bridging loan. Yesterday, an hour after the hammer fell, Lady Pemberton bought that loan through a nominee. It falls due the morning after the wedding.',
      'The house has one paid booking: a wedding for a hundred and twenty guests in fourteen days. If it goes well, an ordinary bank will refinance the house. If it goes badly, Lady Pemberton takes the house and builds a hotel on the cliff.',
      'Augustin hid one valuable thing from the receivers: a seascape by the painter Tomas Ellery, wrapped in a curtain behind the attic water tank. It legally belongs to his creditors, and Silas Dunmore is looking for it.',
      'Clara is not a prize and cannot be won. She is the employer: she can dock a wage, give an order, sack the player, change her mind and say no. Romance, if it happens, is slow and between equals, and goes no further than a kiss. No fan service: the apron is a joke about work, never about bodies, and nobody’s body is described lingeringly.',
      'Nothing supernatural happens here. It is an ordinary modern seaside town with old money on the hills, telephones, cars, and a local newspaper with a society page.',
      '“Young master” is the house’s old title for the heir. Clara uses it for the player whatever their pronouns, precisely and on purpose, until she stops. It is a title for the adult heir, never a comment on age.',
    ],
    toneGuide:
      'Comedy first, warmth underneath, and the stakes are real money. The jokes come from an heir who has never worked meeting three hundred stairs, and from a maid who has waited eleven years to say a few things and says them precisely. Nobody is humiliated for long, and the work is shown as skilled rather than as a punishment. ' +
      'A slow-burn romance between equals: banter, tension, a held look on a landing, a cup of tea brought properly. Clara will not be courted by anybody who treats her as the help. ' +
      'The player can do anything and the house reacts like a real household. Refuse the apron and the story follows them out of the gate, because the town, Lady Pemberton and the creditors’ man all have a use for a broke heir. Wander off, and the house keeps working without them while the clock runs toward the wedding. ' +
      'Keep scenes concrete: buckets, silver polish, the bell-board, the third landing, the cream envelope under the blotter. Every member of the cast sounds like nobody else. The face at the top of a beat is Clara’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Clara runs one finger along the banister and holds it up.\n\nGrey.\n\n\"Two hundred and eleven,\" she says. \"You were doing well until two hundred and eleven.\"\n\n\"How do you even know which one—\"\n\n\"I counted.\" She hands the cloth back. \"I have been counting these stairs for eleven years. Again, please. From two hundred and eleven.\"",
      "The tray is on the third landing, exactly where it was last night.\n\nSoup. Bread. Two biscuits from the blue tin. And a second cup of cocoa, still warm.\n\nNobody on the staff drinks cocoa.\n\nFrom somewhere above you, very quietly, a man clears his throat.",
      "Lady Pemberton pours the tea herself, which is how you know she wants something.\n\n\"Such a pity about the carpets, darling.\" She sets the cup in front of you. \"I always admired them.\"\n\nA cream envelope slides across the table.\n\n\"Your old room. Your old allowance. And all I want in return is one page.\" She smiles. \"You know which page.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 11, presence: 13, resolve: 10, arcana: 5 },
  skills: [
    { id: 'graft', name: 'Elbow Grease', attribute: 'might', description: 'Scrubbing, carrying, lifting the heavy end, and three hundred stone stairs on your knees.' },
    { id: 'service', name: 'Service', attribute: 'agility', description: 'Carrying a tray up a stair without a sound, laying a table for twenty, announcing a guest without tripping on the rug.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'The family smile, which used to open every door in town and still opens some.' },
    { id: 'bluff', name: 'Bluff', attribute: 'agility', description: 'Saying the thing that is not true with the face that is.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Admitting the true thing to somebody who will not like it, while it can still help.' },
    { id: 'house_lore', name: 'The House', attribute: 'mind', description: 'Knowing the building: the jib doors, the loose board, the stair that creaks, the cupboard nobody opens.' },
    { id: 'accounts', name: 'Accounts', attribute: 'mind', description: 'Reading a ledger, a contract or a polite letter for the figure somebody hoped you would skim.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is GOOD_HIGH because rest restores those, and an heir who has
   * never carried a coal scuttle up four flights genuinely runs out of it.
   * Scandal comes first among the descending pair on purpose: a shove in the
   * front hall should be in the Gazette by Thursday. Exposure is how close the
   * secrets in this house are to coming out, and lying is what feeds it.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 70,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player’s legs have given up before their pride has. They can still talk, badly; they cannot carry anything up anything, and Clara sends them to bed with a look that is not unkind.',
      color: '#C9A66B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes. Every stair is a negotiation, hands shake on the silver, and the player agrees to things just to be allowed to sit down. This is the band where a sharp word from Clara lands like a slap and where going to bed is the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary ache of a working day for somebody who has never had one. Good for one more job and honest about not wanting two. The player notices, for the first time, how long the staff have been on their feet.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh, or close to it. The player can take the stairs two at a time, carry the heavy end and still have breath to argue. Scenes can be long and physical, and a job can be done well rather than merely done.',
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
        'The town has lost interest. The heir of Wrenhurst scrubbing steps is old news, and when the player walks down the high street people say good morning and mean it.',
      color: '#B5564E',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The town has moved on to somebody else’s trouble. Tradesmen give the house credit, the bank takes Clara’s calls, and the bride’s family hear only that the house is lovely. Nobody photographs the player at all.',
        },
        {
          upTo: 50,
          behaviour:
            'The ordinary hum of a fallen family on a hill. People look twice in the street, the pub has a running joke, and the Gazette would print a photograph if it had a good one. Harmless unless something feeds it.',
        },
        {
          upTo: 80,
          behaviour:
            'The town is actively talking. Tradesmen want cash up front, the bride’s mother rings to ask whether everything is quite all right up there, and Lady Pemberton is mentioned in the same breath as the house more often than Clara is.',
        },
        {
          upTo: 100,
          behaviour:
            'A full public uproar. A photographer at the gates, the bank cooling, the bride’s family discussing other venues out loud, and Clara receiving sympathetic letters, which she hates more than anything. Every public step the player takes makes it worse.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 15,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Every secret in the house is either told or safe. Nobody is listening at doors, and the attic is just an attic.',
      color: '#6B7FA3',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Nobody is looking. Hugo’s tray goes up and comes down, the coal chute stays oiled, and the player’s lies, if there are any, have not been checked yet. Secrets keep here without effort.',
        },
        {
          upTo: 55,
          behaviour:
            'Somebody has noticed something. Midge mentions the biscuits going missing, Clara counts the cocoa, Silas asks his question slightly differently from last time. Each lie now needs a second lie to hold it up.',
        },
        {
          upTo: 100,
          behaviour:
            'It is about to come out. Clara has found one thing that does not add up and is looking for the second, Silas is standing in the cellar with a torch, and any careless step on the third landing will be heard. The next lie will be checked by somebody who already knows the answer.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'signet_ring',
      name: 'The Signet Ring',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'Gold and heavy, the family crest cut into a flat green stone. The last thing of value you own, because you were wearing it when the receivers came.',
      loreText: 'Pawned in town it would pay the whole staff for a month. Clara will not take it. Lady Pemberton would very much like it.',
      icon: 'ring',
    },
    {
      id: 'claras_terms',
      name: 'Clara’s Terms',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'One sheet of the house’s old notepaper, the crest struck through with a single ruled line, in Clara’s small upright hand. It reached you last night: the house is sold, it is hers, and if you have nowhere else to go, the front hall at half past six. Below that, her terms, numbered.',
      loreText:
        'One: a bed, the old valet’s room off the kitchen passage. Two: three meals, at the staff table, at staff hours. Three: a wage, paid in cash on Fridays, docked in writing for orders given, breakages and jobs walked off. Four: Sunday afternoons are your own. Five: either party may end this arrangement at any time. The door opens both ways.',
      icon: 'letter',
    },
    {
      id: 'black_apron',
      name: 'The Black Apron',
      tags: ['clothing'],
      questItem: true,
      skillModifiers: { graft: 1 },
      description: 'Plain black cotton, long, starched, with one deep pocket for a cloth. Folded in thirds, the way Clara folds everything.',
      loreText: 'It is new, and it is your size. She bought it the day before the auction, which means she knew she was going to win.',
      icon: 'coat',
    },
    {
      id: 'household_ledger',
      name: 'Clara’s Ledger',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { accounts: 1 },
      description: 'A green cloth-bound account book in Clara’s small upright hand: wages, coal, linen, the wedding deposit, and on the first page the purchase of the house, broken into three sums.',
      loreText: 'Eleven years of savings. A second sum in Hugo’s handwriting, initialled. A third, much larger, marked "bridging, fourteen days" and underlined twice.',
      icon: 'ledger',
    },
    {
      id: 'pemberton_letter',
      name: 'The Cream Envelope',
      tags: ['document'],
      questItem: true,
      description: 'Heavy cream paper with the Pemberton crest embossed on the flap, delivered by hand last night, opened carefully with a knife and pushed under the blotter.',
      loreText: 'Two lines. The loan has been assigned to a new holder, and the new holder looks forward to the fifteenth. It is signed with one initial: H.',
      icon: 'letter',
    },
    {
      id: 'wedding_booking',
      name: 'The Wedding Booking',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A signed contract for the hire of the house: ballroom, terrace, eleven bedrooms, a hundred and twenty guests, fourteen days from today. Clara took the booking over from the receivers’ agent as a condition of her bid. Half the fee is paid. The other half is paid on the night, if the bride’s mother is satisfied.',
      loreText: 'The bride’s mother has stapled on a handwritten page of requirements. Item nine is "no visible staff in the ballroom after midnight".',
      icon: 'papers',
    },
    {
      id: 'ellery_seascape',
      name: 'The Ellery Seascape',
      tags: ['quest', 'valuable'],
      questItem: true,
      description: 'A small oil painting of a grey sea under a breaking sky, wrapped in an old velvet curtain and wedged behind the attic water tank. The receivers’ inventory lists it as missing.',
      loreText: 'Painted by Tomas Ellery the year the house was built and hung in the morning room for a century. It is worth about what Clara owes, and it legally belongs to your father’s creditors.',
      icon: 'photograph',
    },
    {
      id: 'hugos_keys',
      name: 'Hugo’s Keys',
      tags: ['tool'],
      skillModifiers: { house_lore: 2 },
      description: 'A heavy iron ring of keys, each labelled in Hugo’s copperplate: cellar, linen, silver, attic, and one small brass key with no label at all.',
      loreText: 'The unlabelled key opens the attic box room. Hugo had it cut on the second night and has told nobody why.',
      icon: 'keys',
    },
    {
      id: 'night_tray',
      name: 'The Night Tray',
      tags: ['food'],
      questItem: true,
      consumable: { resourceId: 'stamina', amount: 10, consumesItem: true },
      description: 'A covered tray left on the third landing of the servants’ stair after ten each night: soup, bread, two biscuits from the blue tin, and a second cup of cocoa.',
      loreText: 'By morning it is always empty and always back on the landing, with the spoon laid exactly where Hugo would lay it.',
      icon: 'food',
    },
    {
      id: 'fathers_postcard',
      name: 'Your Father’s Postcard',
      tags: ['document', 'personal'],
      questItem: true,
      description: 'A postcard of a sunny foreign harbour, addressed to the house in your father’s handwriting: "Weather glorious. Do not look for me. A." The bailiffs left it on the hall table because it was worth nothing.',
      loreText: 'The postmark is Kestrel Bay. He never left town: he posted it from the box on the quay, a few doors from the boarding house where he spent his first three weeks in hiding.',
      icon: 'card',
    },
    {
      id: 'silver_canteen',
      name: 'The House Silver',
      tags: ['valuable'],
      description: 'A canteen of family silver for twenty-four, which Clara bought back at the auction as a separate lot. Every piece has to be polished for the wedding.',
      loreText: 'Hugo says it takes one person four days. It would also pawn in town for enough to live on for a year, and everybody in the house has noticed.',
      icon: 'case',
    },
    {
      id: 'calling_cards',
      name: 'Your Calling Cards',
      tags: ['personal'],
      skillModifiers: { charm: 1 },
      description: 'A silver case of engraved cards with your name and an address that now belongs to somebody else.',
      loreText: 'Handed to the right shopkeeper they still open doors. Handed to Lady Pemberton they make her smile, which is worse.',
      icon: 'card',
    },
    {
      id: 'law_notes',
      name: 'Your Law Notes',
      tags: ['document'],
      skillModifiers: { accounts: 1 },
      description: 'Two years of lecture notes on contract and insolvency, which you never expected to need, in the satchel you carried home.',
      loreText: 'The chapter on the assignment of debts has a coffee ring on it and is suddenly the most interesting thing you own.',
      icon: 'book',
    },
    {
      id: 'rowing_gloves',
      name: 'Your Rowing Gloves',
      tags: ['clothing'],
      skillModifiers: { graft: 1 },
      description: 'Fingerless leather gloves worn shiny across the palm. Good for oars, ropes and three hundred stone stairs.',
      loreText: 'The club crest on the strap is the same crest as the one on the bank in town, which used to mean something.',
      icon: 'kit',
    },
    {
      id: 'bar_corkscrew',
      name: 'The Waiter’s Friend',
      tags: ['tool'],
      skillModifiers: { service: 1 },
      description: 'A battered waiter’s corkscrew from the bar where you poured drinks for two years under a different surname.',
      loreText: 'Clara always knew where you were those two years. A birthday card arrived there every year, unsigned, in small upright handwriting.',
      icon: 'tools',
    },
  ],
  abilities: [
    {
      id: 'put_your_back_in',
      name: 'Put Your Back In',
      tags: ['utility'],
      description: 'Do the physical job in front of you properly: the stairs, the silver, the floors, the heavy end of anything.',
      affordances: ['scrub', 'clean', 'scrub the stairs', 'polish', 'carry', 'sweep', 'do the chores', 'get to work', 'start at the top', 'take the apron'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'graft', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'old_charm',
      name: 'Old Charm',
      tags: ['social'],
      description: 'Use the smile the whole town used to photograph to get a yes, a favour or a second chance.',
      affordances: ['charm', 'flirt', 'smile', 'talk them round', 'sweet-talk', 'compliment', 'negotiate', 'bargain'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pull_rank',
      name: 'Pull Rank',
      tags: ['social'],
      description: 'Talk to someone as if you still owned the house, and see whether they remember that you do not.',
      affordances: ['give an order', 'pull rank', 'remind her whose house it is', 'ring for breakfast', 'demand', 'act like the master', 'use the family name', 'refuse'],
      costs: [{ resourceId: 'scandal', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 16 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'know_the_house',
      name: 'Know the House',
      tags: ['sight'],
      description: 'You grew up here. Find the jib door, the loose board, the stair that creaks, and whatever somebody has hidden behind them.',
      affordances: ['search', 'look around', 'explore', 'use the jib door', 'follow the tray', 'check the attic', 'look behind', 'go up to the top'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'house_lore', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'own_up',
      name: 'Own Up',
      tags: ['social'],
      description: 'Tell someone the true thing, about yourself or about somebody else, and take whatever comes back.',
      affordances: ['tell the truth', 'confess', 'admit it', 'come clean', 'be honest', 'apologise', 'tell her about him', 'say it plainly'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cover_for_it',
      name: 'Cover For It',
      tags: ['social'],
      description: 'Lie, distract or invent an excuse so that somebody does not find out what you know.',
      affordances: ['lie', 'cover for him', 'hide him', 'make an excuse', 'bluff', 'pretend', 'keep it quiet', 'say nothing happened', 'sneak'],
      costs: [{ resourceId: 'exposure', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'bluff', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_company',
      name: 'Keep Company',
      tags: ['social'],
      description: 'Stop working, sit down beside someone, and be there without fixing anything.',
      affordances: ['stay', 'sit with her', 'keep her company', 'stay with him', 'just be there', 'wait with her', 'make her tea'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lose_your_temper',
      name: 'Lose Your Temper',
      tags: ['social'],
      description: 'Shout, shove, slam a door or throw something, in a house where every room can hear it.',
      affordances: ['shout', 'shove', 'throw it', 'slam the door', 'smash', 'storm off', 'lose it', 'kick the bucket over'],
      costs: [{ resourceId: 'scandal', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: null, baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_books',
      name: 'Read the Books',
      tags: ['sight'],
      description: 'Go through a ledger, a contract or a letter for the figure somebody hoped you would skim.',
      affordances: ['read the ledger', 'check the accounts', 'read the contract', 'do the sums', 'read the letter', 'look at the numbers'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'accounts', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'serve_properly',
      name: 'Serve Properly',
      tags: ['utility'],
      description: 'Lay a table, carry a tray up a stair without a sound, announce a guest: the job done the way Hugo does it.',
      affordances: ['serve', 'wait at table', 'lay the table', 'pour', 'announce the guest', 'serve the tea', 'do it properly', 'carry the tray'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'service', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:hugos_way'],
        lockedCopy:
          'You have spent your whole life on the other side of a silver tray. Carrying one up a stair without a sound is a craft, and nobody has shown you how yet.',
      },
    },
  ],
  locations: [
    {
      id: 'the_front_hall',
      name: 'The Front Hall',
      shortName: 'Hall',
      description:
        'A marble hall two storeys high, with a grand staircase curving up to the bedroom floor. The bailiffs took the paintings, the rugs and the long-case clock, so every footstep echoes and pale squares on the walls show where things used to hang. A bell-pull by the door still rings down in the kitchen. A bare side table holds one postcard.',
      artDirection:
        'Grand but stripped marble entrance hall of an old seaside mansion at dawn, curving staircase, pale rectangles on the walls where paintings hung, tall windows with grey sea light, one bare side table. Elegant, echoing, emptied.',
      connections: [
        { to: 'the_back_stair', travelMinutes: 1, label: 'Through the green baize door to the servants’ stair' },
        { to: 'the_long_gallery', travelMinutes: 1, label: 'Up the grand staircase' },
        { to: 'the_ballroom', travelMinutes: 1, label: 'Through the double doors to the ballroom' },
        { to: 'the_kitchen', travelMinutes: 2, label: 'Down the back passage to the kitchen' },
        { to: 'the_front_gates', travelMinutes: 3, label: 'Out the front door and down the drive' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'black_apron', qty: 1, ownerId: 'clara', aka: ['apron', 'the apron', 'the black apron', 'pinny'] },
        { itemId: 'fathers_postcard', qty: 1, ownerId: null, aka: ['postcard', 'the postcard', 'the card from abroad'] },
      ],
    },
    {
      id: 'the_back_stair',
      name: 'The Servants’ Stair',
      shortName: 'Back Stair',
      description:
        'A narrow stone-and-oak stair behind the baize door, climbing from the kitchen to the attic in four steep flights with a landing at every floor. Clara has counted the steps of every staircase in the house and this one is the worst: worn hollow in the middle, dark in the corners, and loud on the third landing. Some nights there is a covered tray up there.',
      artDirection:
        'Steep narrow servants’ staircase in an old house, worn stone steps, plain oak banister, a small window on a landing, a covered silver tray left on a step. Dim, vertical, a little secret.',
      connections: [
        { to: 'the_attic', travelMinutes: 4, label: 'All the way to the top' },
        { to: 'the_long_gallery', travelMinutes: 2, label: 'Out at the bedroom floor' },
        { to: 'the_kitchen', travelMinutes: 2, label: 'Down to the kitchen' },
        { to: 'the_front_hall', travelMinutes: 1, label: 'Back through the baize door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [
        { itemId: 'night_tray', qty: 1, ownerId: 'hugo', aka: ['tray', 'the tray', 'the covered tray', 'the supper tray'] },
      ],
    },
    {
      id: 'the_attic',
      name: 'The Attic Rooms',
      shortName: 'Attic',
      description:
        'The old servants’ bedrooms under the slates: six narrow rooms off a sloping corridor, iron bedsteads, a water tank that knocks at night, and a box room at the end with its door wedged shut from inside. Warm, dusty and full of things nobody wanted to carry down. Somebody is living in the box room: a camp bed, a tin of good biscuits, a stack of old newspapers, a silk dressing gown on a hook.',
      artDirection:
        'Dusty attic corridor under a sloping slate roof, narrow doors, an old copper water tank, a box room with a camp bed, newspapers and a burgundy dressing gown on a hook, one skylight. Warm, cluttered, comic and a little sad.',
      connections: [{ to: 'the_back_stair', travelMinutes: 4, label: 'Back down the servants’ stair' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [
        { itemId: 'ellery_seascape', qty: 1, ownerId: 'augustin', aka: ['painting', 'the painting', 'the seascape', 'the canvas', 'the thing behind the tank'] },
      ],
    },
    {
      id: 'the_kitchen',
      name: 'The Kitchen',
      shortName: 'Kitchen',
      description:
        'Below stairs and the warmest room in the house: a black iron range, a scrubbed table long enough for twelve, copper pans the bailiffs left because they were too heavy, and a board of brass bells labelled with rooms that have nobody in them. Hugo’s pantry is off one side and Clara’s office off the other.',
      artDirection:
        'Large old below-stairs kitchen, black iron range, long scrubbed pine table, copper pans on hooks, a wall board of brass service bells with room labels. Warm lamplight, steam, busy and homely.',
      connections: [
        { to: 'the_back_stair', travelMinutes: 1, label: 'Up the servants’ stair' },
        { to: 'the_front_hall', travelMinutes: 2, label: 'Up the back passage to the hall' },
        { to: 'claras_office', travelMinutes: 1, label: 'Clara’s office, off the kitchen' },
        { to: 'the_cellar', travelMinutes: 1, label: 'Down the cellar steps' },
        { to: 'the_gardens', travelMinutes: 2, label: 'Out through the kitchen-garden door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'hugos_keys', qty: 1, ownerId: 'hugo', aka: ['keys', 'the keys', 'the key ring', 'hugo’s keys'] },
        { itemId: 'silver_canteen', qty: 1, ownerId: 'clara', aka: ['silver', 'the silver', 'the canteen', 'the cutlery', 'the family silver'] },
      ],
    },
    {
      id: 'claras_office',
      name: 'Clara’s Office',
      shortName: 'Office',
      description:
        'The old housekeeper’s room, which Clara kept for herself instead of taking any of the forty upstairs. A desk, a green-shaded lamp, a telephone, a narrow bed behind a curtain, and the wedding seating plan pinned to the wall with a hundred and twenty names on it. A cream envelope with a crest is tucked under the blotter.',
      artDirection:
        'Small tidy housekeeper’s office below stairs, a desk with a green-shaded lamp and an open ledger, a seating plan pinned to the wall, a curtain half drawn across an alcove. Neat, private, lamplit.',
      connections: [{ to: 'the_kitchen', travelMinutes: 1, label: 'Back into the kitchen' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [
        { itemId: 'household_ledger', qty: 1, ownerId: 'clara', aka: ['ledger', 'the ledger', 'the account book', 'her accounts'] },
        { itemId: 'pemberton_letter', qty: 1, ownerId: 'clara', aka: ['envelope', 'the envelope', 'the cream envelope', 'the letter'] },
        { itemId: 'wedding_booking', qty: 1, ownerId: 'clara', aka: ['booking', 'the booking', 'the contract', 'the wedding contract', 'the seating plan'] },
      ],
    },
    {
      id: 'the_cellar',
      name: 'The Cellar',
      shortName: 'Cellar',
      description:
        'Empty wine racks to the ceiling, because the receivers sold every bottle, and a cold that never leaves. At the far end an iron hatch opens onto the old coal chute, which slants up to the garden. Its bolt has been oiled recently, and nobody on the staff did it.',
      artDirection:
        'Vaulted brick wine cellar with empty racks, a single bulb, an iron hatch to a slanting coal chute with a sliver of daylight. Cold, bare, faintly ridiculous as an escape route.',
      connections: [
        { to: 'the_kitchen', travelMinutes: 1, label: 'Up the cellar steps' },
        { to: 'the_gardens', travelMinutes: 3, label: 'Up the coal chute on your hands and knees' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_ballroom',
      name: 'The Ballroom',
      shortName: 'Ballroom',
      description:
        'Sixty feet of sprung floor under a glass chandelier that has not been lit in six years, with tall windows onto the terrace and the sea. Dust sheets over everything. In fourteen days a hundred and twenty wedding guests will eat and dance in here, and at present a pigeon lives in the musicians’ gallery.',
      artDirection:
        'Long ballroom with dust sheets over furniture, an unlit crystal chandelier, tall arched windows onto a terrace and grey sea, a small musicians’ gallery. Faded grandeur waiting to be woken.',
      connections: [
        { to: 'the_front_hall', travelMinutes: 1, label: 'Back to the hall' },
        { to: 'the_gardens', travelMinutes: 1, label: 'Out through the terrace doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_long_gallery',
      name: 'The Long Gallery',
      shortName: 'Gallery',
      description:
        'The bedroom floor: a corridor of family portraits, the ones the receivers judged worthless, and eleven bedrooms being made up for wedding guests. Your old room is fourth on the left. It is now called the Blue Room, and it is for the bride’s aunt.',
      artDirection:
        'Long upstairs corridor lined with old family portraits, a runner of bare floorboards, doors open onto bedrooms with fresh linen stacked on chairs. Quiet, sunlit, slightly reproachful.',
      connections: [
        { to: 'the_front_hall', travelMinutes: 1, label: 'Down the grand staircase' },
        { to: 'the_back_stair', travelMinutes: 2, label: 'Through the jib door to the servants’ stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_gardens',
      name: 'The Rose Garden',
      shortName: 'Gardens',
      description:
        'Terraces of overgrown roses stepping down to a sea wall, a boathouse with a rotten jetty, a kitchen garden gone to seed, and a lawn where the wedding marquee will go if anybody can mow it. From the top terrace you can see Pemberton Hall across the valley, and it can see you.',
      artDirection:
        'Overgrown terraced rose garden above the sea, stone steps, a weathered boathouse, a shaggy lawn, a white mansion on the far hill across a green valley. Bright, windswept, romantic and neglected.',
      connections: [
        { to: 'the_ballroom', travelMinutes: 1, label: 'Up through the terrace doors' },
        { to: 'the_kitchen', travelMinutes: 2, label: 'In through the kitchen-garden door' },
        { to: 'the_front_gates', travelMinutes: 4, label: 'Round the side of the house to the drive' },
        { to: 'the_cellar', travelMinutes: 3, label: 'Down the old coal chute' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_front_gates',
      name: 'The Front Gates',
      shortName: 'Gates',
      description:
        'Iron gates at the bottom of a lime-tree drive, with the family crest still worked into the top and a bell on a chain. Beyond them the cliff road drops to the town. This is where tradesmen wait, where a photographer would stand if one came, and where a polite man in a grey raincoat keeps ringing.',
      artDirection:
        'Tall wrought-iron gates with a crest at the end of a lime-tree avenue, a bell on a chain, a cliff road falling away to a harbour town below. Grey morning, sea mist, a lone figure with a hat.',
      connections: [
        { to: 'the_front_hall', travelMinutes: 3, label: 'Up the drive to the front door' },
        { to: 'the_gardens', travelMinutes: 4, label: 'Round the side to the gardens' },
        { to: 'harbour_town', travelMinutes: 12, label: 'Down the cliff road into town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'harbour_town',
      name: 'Kestrel Bay',
      shortName: 'Town',
      description:
        'The harbour town under the cliff: a high street, a fish market, a bank with your family’s name still on a brass plaque by the door, a pub called the Anchor, the Gazette office, an antiques shop on the quay that asks no questions, and three hundred people who watched your family’s cars go past for a century and are enjoying this enormously.',
      artDirection:
        'Small bright harbour town, fishing boats, a steep high street of painted shopfronts, a pub sign with an anchor, a stone bank with a brass plaque, gulls. Busy, salty, gossipy.',
      connections: [
        { to: 'the_front_gates', travelMinutes: 15, label: 'Back up the cliff road' },
        { to: 'pemberton_hall', travelMinutes: 10, label: 'Up the other hill to Pemberton Hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'pemberton_hall',
      name: 'Pemberton Hall',
      shortName: 'Pemberton Hall',
      description:
        'A white stucco house on the opposite hill, newer and larger than Wrenhurst and less loved, with a glasshouse full of orchids and a study window that looks straight across the valley at your old bedroom. Everything here is polished, and everything has a price on the underside.',
      artDirection:
        'Immaculate white stucco country house, a Victorian glasshouse full of orchids, a study with a large desk and a window framing a distant older mansion across a valley. Cool, expensive, controlled.',
      connections: [{ to: 'harbour_town', travelMinutes: 10, label: 'Back down into town' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_kestrel_bay',
      name: 'The Town',
      description: 'Kestrel Bay under the cliff: the bank, the pub, the Gazette’s society page and three hundred neighbours. They watched your family drive past for a century, and they are deciding, this fortnight, whether you are a joke or one of them.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'The Fallen Heir' },
        { atReputation: 35, label: 'That Hard Worker' },
        { atReputation: 60, label: 'One of Ours' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_below_stairs',
      name: 'Below Stairs',
      description: 'The staff of Wrenhurst House: Hugo, Midge, Clara when she forgets she owns the place, two daily women from town and a gardener who comes on Tuesdays. They eat together at the kitchen table and they have not yet decided where you sit.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The Young Master' },
        { atReputation: 30, label: 'New Hand' },
        { atReputation: 60, label: 'One of Us' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_pemberton',
      name: 'Pemberton & Thorne',
      description: 'Lady Pemberton’s private bank and everybody in town who owes it money, which is most of the high street. Patient, polite, and always on paper.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Old Money, No Money' },
        { atReputation: 25, label: 'Useful' },
        { atReputation: 50, label: 'Her Friend in the House' },
      ],
      allies: [],
      enemies: ['faction_creditors'],
    },
    {
      id: 'faction_creditors',
      name: 'The Creditors',
      description: 'The committee of people your father owes beyond the house: two banks, a boatyard, a wine merchant and a tailor. Silas Dunmore speaks for them, and they would rather be paid than vindicated.',
      startingReputation: -20,
      ranks: [
        { atReputation: -20, label: 'The Debtor’s Heir' },
        { atReputation: 10, label: 'Cooperating' },
        { atReputation: 40, label: 'In Good Faith' },
      ],
      allies: [],
      enemies: ['faction_pemberton'],
    },
  ],
  characters: [
    {
      id: 'clara',
      name: 'Clara Voss',
      role: 'The new owner of Wrenhurst House, and for eleven years before that, its maid',
      cardBlurb:
        'She kept this house running for eleven years and bought it at auction yesterday, and now she has offered you a job. She will not explain the money, she will not be called the help, and she has already found you a bucket.',
      pronouns: 'she/her',
      publicTraits: ['Precise about everything, including insults', 'Never raises her voice and never needs to', 'Works harder than anybody she employs'],
      hiddenDrives: [
        'She wants, once, to be looked at in this house as the person who runs it rather than the person who cleans it',
        'She is afraid the purchase was pride dressed up as rescue, and that she has bet two other people’s savings on it',
      ],
      values: [
        'Work done properly, whoever sees it',
        'Paying what you owe on the day you said you would',
        'Not being thanked for things she chose to do',
      ],
      fears: [
        'Losing the house to Lady Pemberton in fourteen days and having to tell Hugo where his pension went',
        'That the player will only ever see her as staff, and that she will let them',
      ],
      socialStyle:
        'Gives instructions in numbered order, checks the work herself, and says the generous thing only once the job is finished, so you can never be sure whether it was earned or merely allowed.',
      boundaries: [
        'Will not be ordered about in her own house. Pull rank on her and she docks a day’s wage, in writing, without raising her voice',
        'Will not be courted by anybody who still sees her as the help, or as the woman who used to pick up after them. Only as an equal, and only slowly',
        'Will not take charity, sympathy, or the signet ring',
      ],
      goals: [
        'Get a ballroom, a kitchen and a hundred and twenty place settings ready in fourteen days',
        'Find out whether the player is worth the bed she has given them',
      ],
      secrets: [
        {
          id: 'clara_the_note',
          fact: 'She bought the house with eleven years of savings, Hugo Ashworth’s pension and a fourteen-day bridging loan. Yesterday, an hour after the hammer fell, Lady Pemberton bought that loan through a nominee. It falls due the morning after the wedding, and if the house cannot pay it, Lady Pemberton takes it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself, in the office, late, if you have done a full day’s work without being asked twice and then ask her a straight question about the money.',
        },
        {
          id: 'clara_the_hotel',
          fact: 'She outbid Lady Pemberton by a single bid, and the last bid was everything she had. She raised her paddle because Lady Pemberton meant to pull down the east wing and the rose garden and build a hotel on the cliff, and Clara had scrubbed every floor in that wing on her knees.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Midge saw the auction and will tell you, or Clara will, on the top terrace, if you ask her why this house and not a cheaper one.',
        },
        {
          id: 'clara_the_promise',
          fact: 'In her last year, the player’s mother asked Clara to keep an eye on the house. Clara has never told anybody, and it is not why she bought the house, though she has stopped being sure.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only on the third landing at night, and only once the player has stopped calling her anything but her name.',
        },
      ],
      speechStyle:
        'Clipped and exact. Counts things out loud: stairs, spoons, days left, wages docked. Says "young master" in a tone that changes meaning with the day. Bone-dry jokes delivered as instructions. Never raises her voice; lowers it instead.',
      topics: ['the house', 'the wedding', 'the money', 'your wages', 'Hugo', 'Lady Pemberton', 'the old days'],
      voiceSamples: [
        'Day one of fourteen, young master. I have a list for every one of them, and you are on all fourteen.',
        'One: apron. Two: bucket. Three: the attic landing. Four is complaining, and four comes after three.',
        'I ironed forty of this family’s shirts a week for eleven years. Do not explain to me what you can and cannot do.',
        'That is a day’s wage, docked. I have written it down. You may read the entry if you like; the ledger is very clear.',
        'I bought it because the alternative was a hotel. I scrubbed every one of these floors on my knees, and nobody pours concrete on them while I am alive.',
      ],
      appearance:
        'An adult woman, tall and straight-backed, dark hair pinned in a low knot that never moves, level grey eyes, a plain high-necked black dress with long sleeves rolled to the elbow, no jewellery at all, and the old silver hand bell from the hall worn on a black ribbon at her wrist.',
      visualHook: 'The old silver hand bell from the hall table, worn on a black ribbon at her wrist, which she now rings for other people.',
      silhouette: 'Straight-backed at the foot of a staircase, one arm out holding something folded, the other still at her side.',
      artSeed: 'tmohn-clara-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'wry', 'warm', 'flustered', 'worried', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'claras_office', activity: 'behind the curtain in the office, up before anybody' },
        { startMinute: 330, endMinute: 480, locationId: 'the_front_hall', activity: 'at the foot of the stairs with the day’s list and an apron' },
        { startMinute: 480, endMinute: 720, locationId: 'the_ballroom', activity: 'measuring the ballroom and arguing with the chandelier' },
        { startMinute: 720, endMinute: 780, locationId: 'the_kitchen', activity: 'eating lunch standing up' },
        { startMinute: 780, endMinute: 1020, locationId: 'claras_office', activity: 'on the telephone to the bank, the florist and the bride’s mother' },
        { startMinute: 1020, endMinute: 1200, locationId: 'the_kitchen', activity: 'staff supper, at the end of the table rather than the head' },
        { startMinute: 1200, endMinute: 1440, locationId: 'claras_office', activity: 'the ledger by lamplight' },
      ],
      homeLocationId: 'claras_office',
      knowledgeScope: ['larkspur_house', 'the_auction', 'the_note', 'the_wedding', 'hugo', 'midge', 'the_staff', 'kestrel_bay'],
      startingRelationship: { trust: 40, affection: 50, respect: 20, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'clara_tells_you_the_money',
          label: 'She tells you what the house cost her',
          kind: 'TRUST',
          requires: { trust: 62, flagsSet: ['first_morning_done'] },
        },
        {
          id: 'clara_drops_the_title',
          label: 'She stops calling you young master',
          kind: 'TRUST',
          requires: { trust: 58, respect: 50 },
        },
        {
          id: 'clara_off_the_clock',
          label: 'She lets the work stop for one evening',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 72, respect: 50 },
        },
        {
          id: 'clara_names_a_partner',
          label: 'She asks you to run the house with her',
          kind: 'ALLIANCE',
          requires: { trust: 70, respect: 65, flagsSet: ['knows:hugos_way'] },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 15, presence: 14, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'midge',
      name: 'Imogen Marsh',
      calledName: 'Midge',
      role: 'The under-maid Clara hired the afternoon of the auction, who has read about you in the society pages for years',
      cardBlurb:
        'She started the day before you, she has followed your family in the society pages for years, and she is now in charge of showing you where the buckets live. She will gossip about you to the whole town and cover for you exactly once.',
      pronouns: 'she/her',
      publicTraits: ['Talks fast and notices faster', 'Starstruck and unimpressed at the same time', 'Knows everybody in town and their business'],
      hiddenDrives: [
        'She wants to run a house like this herself one day, and Clara is the first person she has ever seen do it from the bottom up',
        'She sells the odd story to the Gazette’s society page for pocket money, and has not decided whether you are one',
      ],
      values: ['A good story, told well', 'Loyalty to whoever was kind to her first, which in this house is Hugo'],
      fears: ['Being sacked in her first month', 'Being the reason something bad happens to Clara'],
      socialStyle: 'Talks at speed, in asides, while doing three jobs. Treats you as a celebrity and a new hire in alternating sentences.',
      boundaries: [
        'Will not lie to Hugo, about anything, ever',
        'Will not do your share of the work more than once, and will tell you the day and the hour of that once',
      ],
      goals: ['Keep this job', 'Find out what really happened at the auction, and where your father went'],
      secrets: [
        {
          id: 'midge_the_gazette',
          fact: 'She has sold two small items to the Kestrel Bay Gazette’s society page. The third, if she sends it, is a photograph of the heir scrubbing the front steps.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She confesses the moment you are kind to her about something small and specific, because guilt makes her talk.',
        },
        {
          id: 'midge_the_auction',
          fact: 'She was at the auction. She saw Clara raise her paddle for the last bid with her hand shaking, and saw Lady Pemberton lean over afterwards and say something that made Clara go white.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask her what Clara looked like when the hammer came down.',
        },
      ],
      speechStyle:
        'Fast and bright, full of asides and names of people you have never heard of. Quotes headlines in capitals. Swerves from "you were in the regatta pages" to "buckets, under the sink, the blue one leaks" without taking a breath.',
      topics: ['the society pages', 'the auction', 'the town', 'Hugo', 'the buckets', 'the wedding guests'],
      voiceSamples: [
        'Oh my days, it is actually you. The regatta photo. The hat. Everyone in town talked about that hat for a month.',
        'Right: buckets under the sink, the blue one leaks, and if Mr Ashworth asks, you have been up since six.',
        'HEIR SCRUBS STEPS. That is the headline. Somebody is going to write it. Probably not me. Probably.',
        'She went white. After the hammer. The Pemberton woman leaned over and whispered something and she went white as a tablecloth.',
      ],
      appearance:
        'An adult woman, wiry and quick, freckled, red-brown hair escaping a plain grey cotton cap, a grey working dress with the sleeves pinned to the elbow under a long canvas apron, a man’s steel wristwatch she checks constantly, and a pencil stub behind one ear.',
      visualHook: 'A pencil stub behind one ear and a dog-eared society magazine rolled up in her apron pocket.',
      silhouette: 'Leaning round a doorframe mid-sentence, a bucket in each hand.',
      artSeed: 'tmohn-midge-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'surprised', 'guilty', 'flustered', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'harbour_town', activity: 'at home over the bakery with her mother' },
        { startMinute: 360, endMinute: 600, locationId: 'the_kitchen', activity: 'fires, breakfast trays and gossip' },
        { startMinute: 600, endMinute: 840, locationId: 'the_long_gallery', activity: 'making up the guest bedrooms' },
        { startMinute: 840, endMinute: 1020, locationId: 'the_ballroom', activity: 'taking down the dust sheets and sneezing' },
        { startMinute: 1020, endMinute: 1140, locationId: 'the_kitchen', activity: 'staff supper, talking' },
        { startMinute: 1140, endMinute: 1440, locationId: 'harbour_town', activity: 'home down the cliff road' },
      ],
      homeLocationId: 'harbour_town',
      knowledgeScope: ['kestrel_bay', 'the_society_pages', 'the_auction', 'the_staff'],
      startingRelationship: { trust: 25, affection: 35, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'midge_tells_you_the_auction',
          label: 'She tells you what she saw at the auction',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'midge_covers_for_you',
          label: 'She covers for you, once',
          kind: 'ALLIANCE',
          requires: { trust: 45, affection: 45 },
        },
      ],
      attributes: { might: 9, agility: 14, mind: 12, presence: 13, resolve: 10, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'pemberton',
      name: 'Lady Honoria Pemberton',
      calledName: 'Lady Pemberton',
      role: 'Owner of Pemberton Hall on the next hill and of the private bank that called in your house, who lost the auction by one bid',
      cardBlurb:
        'She lost your house to a maid by a single bid and has not stopped smiling since, which should worry you. She would like a friend inside the house, and she can offer you everything you used to have.',
      pronouns: 'she/her',
      publicTraits: ['Gracious in a way that leaves marks', 'Never in a hurry', 'Remembers every slight and every favour, filed separately'],
      hiddenDrives: [
        'As a young woman she was told at a ball in Wrenhurst House that she was not the sort who would ever live in it, and she has been looking at it across the valley ever since',
        'She has decided Clara Voss is an insult to the natural order, and is a little ashamed of how much she admires her',
      ],
      values: ['Patience, which she considers the only real form of wealth', 'Paper: deeds, notes, signatures. Feelings change and paper does not'],
      fears: ['Being laughed at in her own town', 'Dying in a house that is not the one she wanted'],
      socialStyle:
        'Receives people rather than meeting them. Offers tea, a compliment and a threat in the same breath and lets you sort out which was which.',
      boundaries: [
        'Will not break the law anywhere it could be seen. She has solicitors for the rest',
        'Will not raise her voice, hurry, or be seen to want anything',
        'Will not forgive being lied to by somebody she had decided to like',
      ],
      goals: [
        'Collect on Clara’s loan the morning after the wedding and take the house',
        'Recruit the heir inside the house: one page of a ledger, a disaster at the wedding, or simply a signature',
      ],
      secrets: [
        {
          id: 'pemberton_the_note',
          fact: 'Yesterday, an hour after the hammer fell, she bought Clara’s bridging loan from the lender, through a nominee. If the house cannot pay it on the fifteenth morning, she owns Wrenhurst House by breakfast.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself, as an offer rather than a confession, the first time you come to her house alone.',
        },
        {
          id: 'pemberton_the_venture',
          fact: 'She did not make your father’s harbour development fail. She did make sure, when it failed, that the house was the first thing her bank called in.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you bring her something on paper she wants and offer to trade it for the truth.',
        },
        {
          id: 'pemberton_the_plans',
          fact: 'The plans for the hotel are already drawn and sit in her study: the east wing and the rose garden demolished, sixty rooms on the cliff.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the desk in her study, under a glass paperweight, for anybody she leaves alone in that room for five minutes.',
        },
      ],
      speechStyle:
        'Silken and unhurried. Calls everybody "darling" in a voice that turns it into a ranking. Compliments that are also inventories. Never asks a direct question when an observation will do the same work.',
      topics: ['the auction', 'the loan', 'your father', 'the hotel', 'the old balls at Wrenhurst', 'Clara'],
      voiceSamples: [
        'Such a pity about the carpets, darling. I always admired them, from the other side of the room.',
        'Patience is the only real wealth. Everything else is merely money, and money changes hands so easily.',
        'Bring me one page from that woman’s ledger and you may have your old bedroom back. With a key to it.',
        'At my first ball in that house, somebody’s mother told me, very kindly, to enjoy it while I was there.',
      ],
      appearance:
        'An older woman, elegant and very upright, silver-blonde hair set in soft waves, pearl earrings, a camel coat over a cream silk blouse, fine leather gloves she removes one finger at a time, and a silver-topped walking cane.',
      visualHook: 'A silver-topped walking cane she does not need, used to point at things she intends to own.',
      silhouette: 'Seated very upright in a wing chair, cane across her knees, the window light behind her.',
      artSeed: 'tmohn-pemberton-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'sardonic', 'cold', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'pemberton_hall', activity: 'in the glasshouse with the orchids and the post' },
        { startMinute: 600, endMinute: 780, locationId: 'harbour_town', activity: 'at the bank, being seen' },
        { startMinute: 780, endMinute: 1440, locationId: 'pemberton_hall', activity: 'receiving callers, then dinner alone at a table for twenty' },
      ],
      homeLocationId: 'pemberton_hall',
      knowledgeScope: ['the_note', 'the_venture', 'the_hotel', 'kestrel_bay', 'the_auction', 'the_family'],
      startingRelationship: { trust: 10, affection: 20, respect: 25, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'pemberton_makes_her_offer',
          label: 'She makes you an offer',
          kind: 'OTHER',
          requires: { flagsSet: ['pemberton_offer_made'] },
        },
        {
          id: 'pemberton_tells_the_truth',
          label: 'She tells you what her bank did',
          kind: 'TRUST',
          requires: { trust: 40, respect: 45 },
        },
      ],
      attributes: { might: 7, agility: 9, mind: 17, presence: 17, resolve: 15, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'hugo',
      name: 'Hugo Ashworth',
      role: 'Butler of Wrenhurst House for forty-one years, who stayed on when the money went',
      cardBlurb:
        'He taught you to tie a tie and taught Clara everything else, and he is the one person in the house loyal to both of you. He will teach you to serve if you ask him properly, and he is keeping a secret about the top floor.',
      pronouns: 'he/him',
      publicTraits: ['Unshakeably formal', 'Notices a smudge on silver at forty paces', 'Kind in ways that are never mentioned again'],
      hiddenDrives: [
        'After forty-one years serving one family he has decided the house matters more than the name over the door',
        'He wants to retire knowing somebody can do his job, and has begun to suspect it might be the player',
      ],
      values: ['Doing a thing properly when nobody is watching', 'Discretion, which is not the same as lying, though lately he has been doing both'],
      fears: ['That his loyalty to the player’s father will cost Clara the house', 'Being kept on out of pity'],
      socialStyle:
        'Addresses the player with full formality whatever the house now owes them, corrects by demonstrating rather than telling, and changes the subject by offering tea.',
      boundaries: [
        'Will not speak ill of any member of the family, past or present, including the one in the attic',
        'Will not lie to Clara if she asks him a direct question. He has arranged his evenings so that she does not',
        'Will not allow anybody to run on the stair',
      ],
      goals: [
        'Get the house through the wedding without a single chipped plate',
        'Keep the player’s father fed and out of sight until somebody can talk him down',
      ],
      secrets: [
        {
          id: 'hugo_the_tray',
          fact: 'The player’s father has been living in the attic box room for nine days. Hugo found him on the second night, said nothing to Clara, and has carried a covered tray up the servants’ stair every evening since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Follow him up the stair after ten at night, or ask him straight out who the second cup of cocoa is for.',
        },
        {
          id: 'hugo_the_pension',
          fact: 'He gave Clara his whole pension to make up the auction price, and she accepted it only because the alternative was the hotel. If the house goes, so does his retirement.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will never say it. Clara might, and the ledger does, in his own handwriting, on the page dated the day of the auction.',
        },
      ],
      speechStyle:
        'Formal to the point of comedy. Uses "one" for general truths. Understatement as a weapon: a disaster is "not ideal", a triumph is "adequate". Reaches for the player’s grandfather when he disapproves of something.',
      topics: ['the silver', 'proper service', 'your grandfather', 'the tray', 'the wedding', 'Clara'],
      voiceSamples: [
        'One does not run on the stair. One arrives.',
        'In forty-one years I have learned that silver forgives nothing and people forgive almost everything. Polish accordingly.',
        'I have no knowledge of any tray. I also have no knowledge of who keeps eating the shortbread, and I would ask you to leave it that way.',
        'Your grandfather once served a duke soup with his own hands during a power cut. Adequate, he called it. It was not adequate. It was magnificent.',
      ],
      appearance:
        'An older man, tall and very upright, silver hair combed flat, a black tailcoat mended so well nobody can find where, white cotton gloves folded in the top pocket, and a face that has been perfectly composed since about nineteen eighty.',
      visualHook: 'White cotton gloves carried folded in the top pocket of his tailcoat, put on only for the silver.',
      silhouette: 'Very upright, hands clasped behind his back, standing exactly one step inside any doorway.',
      artSeed: 'tmohn-hugo-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'dry', 'warm', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_kitchen', activity: 'in the butler’s room off the kitchen, already dressed' },
        { startMinute: 360, endMinute: 540, locationId: 'the_kitchen', activity: 'boots, silver and the day’s orders' },
        { startMinute: 540, endMinute: 780, locationId: 'the_long_gallery', activity: 'taking the dust sheets off the portraits one at a time' },
        { startMinute: 780, endMinute: 960, locationId: 'the_kitchen', activity: 'lunch for the staff, then the silver again' },
        { startMinute: 960, endMinute: 1140, locationId: 'the_front_hall', activity: 'answering the door to tradesmen and creditors alike' },
        { startMinute: 1140, endMinute: 1320, locationId: 'the_kitchen', activity: 'supper, and the crossword' },
        { startMinute: 1320, endMinute: 1380, locationId: 'the_back_stair', activity: 'carrying a covered tray up the servants’ stair' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_kitchen', activity: 'locking up, twice' },
      ],
      homeLocationId: 'the_kitchen',
      knowledgeScope: ['larkspur_house', 'the_family', 'the_attic', 'proper_service', 'the_staff', 'the_pension'],
      startingRelationship: { trust: 50, affection: 55, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hugo_teaches_you',
          label: 'He teaches you to serve properly',
          kind: 'TRUST',
          requires: { respect: 40 },
        },
        {
          id: 'hugo_admits_the_tray',
          label: 'He tells you who the tray is for',
          kind: 'TRUST',
          requires: { trust: 62 },
        },
        {
          id: 'hugo_hands_over_the_keys',
          label: 'He hands you his keys',
          kind: 'ALLIANCE',
          requires: { trust: 72, respect: 72, flagsSet: ['knows:hugos_way'] },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 15, presence: 15, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'augustin',
      name: 'Augustin',
      role: 'Your father, former master of Wrenhurst House, who vanished the night the bailiffs came',
      cardBlurb:
        'He vanished the night the bailiffs came and left one postcard: weather glorious, do not look for me. He has never once been where he told you he would be, and he has never once failed to talk you into something.',
      pronouns: 'he/him',
      publicTraits: ['Grandly, cheerfully self-deceiving', 'Charming to everybody, including bailiffs', 'Has never once been on time for a consequence'],
      hiddenDrives: [
        'He knows how badly he failed and has decided that if he says it out loud he will never get up again',
        'He wants his heir to think well of him more than he wants the house back, and has not noticed yet',
      ],
      values: ['Style under pressure', 'The family name, which he thinks of as a thing rather than a set of people'],
      fears: ['Standing in front of his creditors and saying what he did with the money', 'Being seen by Clara, of all people, hiding in a cupboard'],
      socialStyle: 'Treats every conversation as a council of war held in exile. Asks for small luxuries in the middle of large confessions.',
      boundaries: [
        'Will not go to the creditors on his own. Somebody has to walk him down',
        'Will not let Clara see him like this, and will hide in the water-tank cupboard to avoid it',
        'Will not give up the painting unless asked by someone he cannot argue with',
      ],
      goals: [
        'Stay hidden until the creditors give up and the summons lapses',
        'Get the house back by some plan involving the painting that he has not fully worked out',
      ],
      secrets: [
        {
          id: 'augustin_the_painting',
          fact: 'Wrapped in a curtain behind the attic water tank is a seascape by Tomas Ellery, the one valuable thing he hid from the receivers. It legally belongs to his creditors, and it is worth about what Clara owes Lady Pemberton.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows it to you himself if you bring him something he asked for and then sit down instead of leaving.',
        },
        {
          id: 'augustin_the_venture',
          fact: 'The family did not go broke from bad luck. He signed the house as security for a harbour development financed by Pemberton & Thorne, against everybody’s advice including Hugo’s, and when it failed he spent a year borrowing to hide it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you tell him something true about one of your own failures first. He cannot confess to anybody who seems to be above it.',
        },
      ],
      speechStyle:
        'Theatrical, warm, self-pitying and quick. Calls the player "my heir" as a term of endearment. Calls disasters "temporary embarrassments" and talks about himself like an exiled king. Asks for biscuits in the middle of confessions.',
      topics: ['the painting', 'the creditors', 'the attic', 'your mother', 'what went wrong', 'Clara'],
      voiceSamples: [
        'Keep your voice down, my heir. I am, technically, abroad.',
        'A temporary embarrassment. Fortunes turn. Mine merely turned rather further than anybody had planned.',
        'Biscuits. The good ones, in the blue tin. And a newspaper, so I can see what they are printing about me.',
        'Your mother would have known what to do. Your mother always knew, and I always did the other thing, and here we are, in a cupboard.',
      ],
      appearance:
        'An older man, handsome gone slightly to seed, swept-back grey hair, nine days of silver stubble, a burgundy silk dressing gown with the family crest on the pocket over yesterday’s shirt, and still wearing very good shoes.',
      visualHook: 'A burgundy silk dressing gown with the family crest on the pocket, worn like a robe of office.',
      silhouette: 'Standing very straight in a burgundy dressing gown, one finger raised for silence.',
      artSeed: 'tmohn-augustin-01',
      portrait: null,
      expressions: ['neutral', 'sheepish', 'grinning', 'anxious', 'grieving', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 120, locationId: 'the_cellar', activity: 'out through the coal chute for night air' },
        { startMinute: 120, endMinute: 1440, locationId: 'the_attic', activity: 'in the box room under the eaves, reading old newspapers' },
      ],
      homeLocationId: 'the_attic',
      knowledgeScope: ['the_family', 'the_venture', 'the_painting', 'the_creditors', 'larkspur_house'],
      startingRelationship: { trust: 55, affection: 65, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'augustin_shows_the_painting',
          label: 'He shows you what is behind the water tank',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:the_attic'] },
        },
        {
          id: 'augustin_comes_down',
          label: 'He agrees to come down and face it',
          kind: 'TRUST',
          requires: { trust: 68, respect: 45 },
        },
      ],
      attributes: { might: 10, agility: 9, mind: 13, presence: 16, resolve: 7, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'silas',
      name: 'Silas Dunmore',
      role: 'Agent for your father’s creditors, who keeps ringing at the gate',
      cardBlurb:
        'He speaks for the people your father owes, he is never rude, and he does not believe for one second that your father is abroad. Help him and he can make this easier for you. Lie to him and he will find out.',
      pronouns: 'he/him',
      publicTraits: ['Polite to the point of menace', 'Unhurried', 'Writes everything down'],
      hiddenDrives: [
        'He grew up in a house that was repossessed and became the man who does it so that it would at least be done kindly',
        'He would rather settle than seize, and he is running out of reasons to',
      ],
      values: ['A debt honestly declared', 'Doing the unpleasant thing politely'],
      fears: ['Being the face of the worst day of somebody’s life again', 'Being made a fool of by a man in a dressing gown'],
      socialStyle: 'Rings, waits, raises his hat, and asks the same question a slightly different way on every visit until the answer changes.',
      boundaries: [
        'Will not force a door, threaten anybody, or set foot inside without being invited',
        'Will not accept a bribe, and will write down that one was offered',
      ],
      goals: ['Find the player’s father before the creditors’ hearing', 'Recover the one asset he is certain was hidden from the receivers'],
      secrets: [
        {
          id: 'silas_the_painting',
          fact: 'The receivers’ inventory lists a seascape by Tomas Ellery that was never found. He is sure it is still on the estate, and recovering it would settle most of the father’s personal debts and lift the summons.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you ask what would make all of this stop, rather than how to get rid of him.',
        },
        {
          id: 'silas_the_offer',
          fact: 'The committee has authorised him to drop the summons entirely if the father appears voluntarily and declares everything. Nobody has asked him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask him plainly what happens if your father simply turns up.',
        },
      ],
      speechStyle:
        'Courteous, procedural and quietly relentless. Opens with "Just so we are clear". Quotes sums to the last digit. Never says a threat aloud; describes procedure until the procedure is the threat.',
      topics: ['your father', 'the debts', 'the painting', 'the hearing', 'the coal chute'],
      voiceSamples: [
        'Morning. Silas Dunmore, for the creditors. Nobody is in trouble yet.',
        'Just so we are clear: four hundred and twelve thousand, give or take a carriage clock. The clock does not interest me.',
        'People hide in the strangest places. Cellars, mostly. Lofts, now and then. Once, a church organ.',
        'If he walks in on his own, it is a hearing. If I have to find him, it is a different word.',
      ],
      appearance:
        'An adult man, medium height and very neat, rimless spectacles, a grey raincoat buttoned over a dark suit, a grey felt hat he raises to everybody including the dog, and a black fountain pen in one hand.',
      visualHook: 'A black fountain pen he uncaps very slowly whenever an answer is about to matter.',
      silhouette: 'A grey figure at the iron gates, hat in hand, perfectly still in the drizzle.',
      artSeed: 'tmohn-silas-01',
      portrait: null,
      expressions: ['neutral', 'patient', 'polite', 'sorry', 'stern'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'harbour_town', activity: 'in his room above the Anchor, going through the inventory' },
        { startMinute: 600, endMinute: 720, locationId: 'the_front_gates', activity: 'ringing the bell at the gates, politely' },
        { startMinute: 720, endMinute: 1080, locationId: 'harbour_town', activity: 'at the records office and the quay' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_front_gates', activity: 'watching the house from the lane' },
        { startMinute: 1200, endMinute: 1440, locationId: 'harbour_town', activity: 'writing up his notes at the Anchor' },
      ],
      homeLocationId: 'harbour_town',
      knowledgeScope: ['the_creditors', 'the_painting', 'the_hearing', 'the_family'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'silas_off_the_record',
          label: 'He tells you what would make it stop',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['silas_called'] },
        },
      ],
      attributes: { might: 11, agility: 10, mind: 15, presence: 12, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_three_hundred_stairs',
      title: 'Three Hundred Stairs',
      summary: 'The woman who kept your family’s house for eleven years owns it now, and she is holding out an apron. Start at the top, where something is creaking.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['clara', 'hugo', 'augustin'],
      involvedLocationIds: ['the_front_hall', 'the_back_stair', 'the_attic'],
      knownRewardCopy: 'A place in this house, on whatever terms you can get, and an answer to what is moving about up there.',
      steps: [
        {
          id: 'the_apron',
          playerCopy: 'Answer her: the apron, or the door.',
          directorNotes:
            'Every answer here is a real way to play the story and none of them is wrong. Clara has rehearsed this for a week and will not show it. If the player takes the apron she gives the list in numbered order. If they bargain she bargains back, precisely, and wins at least one point. If they pull rank she docks a wage they have not earned yet, in writing. If they walk out she lets them, says "the door opens both ways", and does not watch them go, which is a lie.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_apron',
              label: 'Take the apron',
              predicate: { hasItems: ['black_apron'] },
              setsFlags: ['wears_the_apron'],
              closesFlags: ['refused_the_apron'],
            },
            {
              routeId: 'got_to_work',
              label: 'Say nothing and start on the stairs',
              predicate: { flagsSet: ['used:put_your_back_in'] },
              setsFlags: ['wears_the_apron', 'started_at_the_top'],
              closesFlags: ['refused_the_apron'],
            },
            {
              routeId: 'bargained',
              label: 'Negotiate the terms first',
              predicate: { flagsSet: ['used:old_charm'] },
              setsFlags: ['wears_the_apron', 'bargained_terms'],
              closesFlags: ['refused_the_apron'],
            },
            {
              routeId: 'pulled_rank',
              label: 'Remind her whose house it was',
              predicate: { flagsSet: ['used:pull_rank'] },
              setsFlags: ['refused_the_apron', 'pulled_rank_on_her'],
              closesFlags: ['wears_the_apron'],
            },
            {
              routeId: 'walked_out',
              label: 'Walk out of the front door',
              predicate: { flagsSet: ['visited:the_front_gates'] },
              setsFlags: ['refused_the_apron', 'walked_out_first_day'],
              closesFlags: ['wears_the_apron'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_morning_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_kestrel_bay', amount: 10 }],
          },
        },
        {
          id: 'the_top_of_the_house',
          playerCopy: 'Find out who is living at the top of the house.',
          directorNotes:
            'The father is in the attic box room and he is not hiding well: biscuit crumbs on the third landing, a wedged door, a man clearing his throat. Play the discovery as comedy first. He is delighted to see his heir, appalled by the apron, and wants biscuits. Hugo knows; let him look very carefully at nothing when asked. Clara does not know, and the player now has a secret from their employer whether they wanted one or not.',
          enterWhen: { flagsSet: ['first_morning_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_him',
              label: 'Climb to the top and open the box room',
              predicate: { atLocation: 'the_attic', flagsSet: ['met:augustin'] },
              setsFlags: ['found_father'],
              closesFlags: [],
            },
            {
              routeId: 'followed_the_tray',
              label: 'Follow the night tray up the stair',
              predicate: { flagsSet: ['used:know_the_house', 'saw_the_tray'] },
              setsFlags: ['found_father', 'followed_the_tray'],
              closesFlags: [],
            },
            {
              routeId: 'hugo_confided',
              label: 'Get Hugo to tell you who the cocoa is for',
              predicate: { flagsSet: ['spoke:hugo'], minRelationship: [{ characterId: 'hugo', dimension: 'trust', value: 62 }] },
              setsFlags: ['found_father', 'hugo_confided'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:the_attic'],
            abilities: [],
            reputation: [{ factionId: 'faction_below_stairs', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_wedding',
      title: 'A Wedding in Fourteen Days',
      summary: 'A hundred and twenty paying guests, a ballroom under dust sheets, a pigeon in the musicians’ gallery and a bride’s mother with a list. If the wedding goes well a bank will lend against the house. If not, the house goes.',
      kind: 'MAIN',
      involvedCharacterIds: ['clara', 'hugo', 'midge'],
      involvedLocationIds: ['the_ballroom', 'the_kitchen', 'the_gardens', 'the_long_gallery'],
      knownRewardCopy: 'A wedding the town talks about for the right reasons, and a house that can pay for itself.',
      discoverWhen: { flagsSet: ['first_morning_done'] },
      steps: [
        {
          id: 'learn_the_trade',
          playerCopy: 'Learn to do the work properly before the guests arrive.',
          directorNotes:
            'Service is a craft and the player has only ever been on the receiving end of it. Hugo teaches by demonstration and silence; Midge teaches by talking without stopping; doing it wrong forty times also works. Let the work be genuinely skilled and let the player get visibly better at it. This is where the heir stops being a joke to the staff, or does not.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'hugo_trained_you',
              label: 'Ask Hugo to teach you',
              predicate: {
                flagsSet: ['spoke:hugo', 'used:put_your_back_in'],
                minRelationship: [{ characterId: 'hugo', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['hugo_trained_you'],
              closesFlags: [],
            },
            {
              routeId: 'midge_showed_you',
              label: 'Let Midge show you, at speed',
              predicate: { flagsSet: ['spoke:midge'], minRelationship: [{ characterId: 'midge', dimension: 'affection', value: 42 }] },
              setsFlags: ['midge_showed_you'],
              closesFlags: [],
            },
            {
              routeId: 'taught_yourself',
              label: 'Get it wrong until you get it right',
              predicate: { flagsSet: ['used:put_your_back_in', 'used:know_the_house'] },
              setsFlags: ['self_taught'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:hugos_way'],
            abilities: ['serve_properly'],
            reputation: [{ factionId: 'faction_below_stairs', amount: 15 }],
          },
        },
        {
          id: 'ready_the_house',
          playerCopy: 'Get the ballroom, the bedrooms and the garden fit for a hundred and twenty guests.',
          directorNotes:
            'The fortnight of work: the chandelier, the silver for twenty-four, eleven bedrooms, a lawn nobody can mow, the pigeon. The bride’s mother inspects once, on day seven. Shortcuts exist and they show later. A player who talked the town into helping gets fishermen carrying chairs and a florist who works at cost, and every one of them will be at the gate on the day to see how it went.',
          enterWhen: { flagsSet: ['knows:hugos_way'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'did_it_properly',
              label: 'Set the ballroom the way Hugo would',
              predicate: { flagsSet: ['used:serve_properly'], atLocation: 'the_ballroom' },
              setsFlags: ['house_ready'],
              closesFlags: [],
            },
            {
              routeId: 'called_in_favours',
              label: 'Talk the town into helping',
              predicate: {
                flagsSet: ['used:old_charm'],
                minFactionReputation: [{ factionId: 'faction_kestrel_bay', value: 35 }],
              },
              setsFlags: ['house_ready', 'town_pitched_in'],
              closesFlags: [],
            },
            {
              routeId: 'worked_every_hour',
              label: 'Work every hour there is beside Clara',
              predicate: {
                flagsSet: ['used:put_your_back_in'],
                minRelationship: [{ characterId: 'clara', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['house_ready', 'worked_beside_her'],
              closesFlags: [],
            },
            {
              routeId: 'cut_corners',
              label: 'Hide the parts that are not finished',
              predicate: { flagsSet: ['used:cover_for_it'] },
              setsFlags: ['house_half_ready'],
              closesFlags: ['house_ready'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['wedding_prepared'],
            abilities: [],
            reputation: [
              { factionId: 'faction_below_stairs', amount: 10 },
              { factionId: 'faction_kestrel_bay', amount: 10 },
            ],
          },
        },
        {
          id: 'the_wedding_day',
          playerCopy: 'Get a hundred and twenty strangers through a wedding without the house falling down.',
          directorNotes:
            'One long day in the ballroom: the quartet, the cake in four pieces, the bride’s aunt in the player’s old bedroom, Lady Pemberton invited as a guest of the groom’s family and smiling throughout. Something goes wrong whatever the player has done, because something always does; what matters is whether the house can absorb it. Item nine on the bride’s mother’s list is no visible staff in the ballroom after midnight.',
          enterWhen: { flagsSet: ['wedding_prepared'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'it_went_beautifully',
              label: 'The wedding goes beautifully',
              predicate: {
                flagsSet: ['house_ready', 'wedding_day'],
                minRelationship: [{ characterId: 'clara', dimension: 'trust', value: 58 }],
              },
              setsFlags: ['wedding_succeeded'],
              closesFlags: ['wedding_failed'],
            },
            {
              routeId: 'it_held_together',
              label: 'It nearly falls apart, and holds',
              predicate: {
                flagsSet: ['house_half_ready', 'wedding_day'],
                minRelationship: [{ characterId: 'hugo', dimension: 'respect', value: 50 }],
              },
              setsFlags: ['wedding_succeeded', 'wedding_was_close'],
              closesFlags: ['wedding_failed'],
            },
            {
              routeId: 'it_went_wrong',
              label: 'It goes wrong in front of everybody',
              predicate: { flagsSet: ['wedding_day'] },
              setsFlags: ['wedding_failed'],
              closesFlags: ['wedding_succeeded'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['wedding_over'],
            abilities: [],
            reputation: [
              { factionId: 'faction_below_stairs', amount: 10 },
              { factionId: 'faction_kestrel_bay', amount: 15 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_man_in_the_attic',
      title: 'The Man in the Attic',
      summary: 'Your father is not abroad. He is in the box room under the slates with a tin of biscuits and a painting he should not have, and every day he stays there is a day somebody could find him.',
      kind: 'MAIN',
      involvedCharacterIds: ['augustin', 'hugo', 'silas', 'clara'],
      involvedLocationIds: ['the_attic', 'the_cellar', 'the_front_gates'],
      knownRewardCopy: 'Your father out of the cupboard, one way or another, and whatever the family name is worth afterwards.',
      discoverWhen: { flagsSet: ['knows:the_attic'] },
      steps: [
        {
          id: 'what_to_do_with_him',
          playerCopy: 'Decide what to do about your father.',
          directorNotes:
            'Four honest options and they are not equal. Hiding him makes the player Hugo’s accomplice and Clara’s liar. Telling Clara gets a long silence and then a very practical plan. Handing him to Silas is legal, cold and quick. Talking him down so that he walks to the creditors himself is the hardest and the only one he will thank anybody for, years later. Augustin argues with all of them, charmingly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_him_down',
              label: 'Talk him into coming down on his own',
              predicate: {
                atLocation: 'the_attic',
                flagsSet: ['used:own_up'],
                minRelationship: [
                  { characterId: 'augustin', dimension: 'trust', value: 62 },
                  { characterId: 'augustin', dimension: 'respect', value: 45 },
                ],
              },
              setsFlags: ['father_came_down'],
              closesFlags: ['hiding_father', 'father_handed_over'],
            },
            {
              routeId: 'handed_him_over',
              label: 'Tell Silas Dunmore where he is',
              predicate: { flagsSet: ['spoke:silas', 'used:own_up'] },
              setsFlags: ['father_handed_over'],
              closesFlags: ['hiding_father', 'father_came_down'],
            },
            {
              routeId: 'told_clara',
              label: 'Tell Clara what is in her attic',
              predicate: { flagsSet: ['spoke:clara', 'used:own_up'] },
              setsFlags: ['clara_knows_about_him'],
              closesFlags: ['hiding_father'],
            },
            {
              routeId: 'hid_him',
              label: 'Keep him hidden and lie for him',
              predicate: { flagsSet: ['used:cover_for_it'] },
              setsFlags: ['hiding_father'],
              closesFlags: ['clara_knows_about_him', 'father_handed_over', 'father_came_down'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['father_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_creditors', amount: 10 }],
          },
        },
        {
          id: 'the_painting',
          playerCopy: 'Decide what happens to the painting behind the water tank.',
          directorNotes:
            'The seascape is worth about what Clara owes, and it belongs to the creditors. Handing it over clears the father and costs the family its last good thing. Selling it through the antiques shop on the quay could pay off Lady Pemberton, and it is theft, and Silas will know within a week. Giving it to Clara means Clara decides, and she will give it to Silas herself. Leaving it there is also an answer.',
          enterWhen: { flagsSet: ['father_decided'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'surrendered_it',
              label: 'Give it to Silas Dunmore',
              predicate: { hasItems: ['ellery_seascape'], flagsSet: ['spoke:silas'] },
              setsFlags: ['painting_surrendered'],
              closesFlags: ['painting_sold_quietly'],
            },
            {
              routeId: 'gave_it_to_clara',
              label: 'Put it in Clara’s hands and let her decide',
              predicate: {
                hasItems: ['ellery_seascape'],
                flagsSet: ['spoke:clara'],
                minRelationship: [{ characterId: 'clara', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['painting_surrendered', 'clara_handled_it'],
              closesFlags: ['painting_sold_quietly'],
            },
            {
              routeId: 'sold_it_quietly',
              label: 'Sell it on the quay and say nothing',
              predicate: { hasItems: ['ellery_seascape'], flagsSet: ['used:cover_for_it'], atLocation: 'harbour_town' },
              setsFlags: ['painting_sold_quietly'],
              closesFlags: ['painting_surrendered'],
            },
            {
              routeId: 'left_it_there',
              label: 'Leave it behind the tank',
              predicate: { flagsSet: ['wedding_day'] },
              setsFlags: ['painting_left'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['painting_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_creditors', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_what_she_paid',
      title: 'What She Paid',
      summary: 'A maid’s wages do not buy a forty-room house on a cliff. Clara will not say how she did it, the ledger in her office will, and Lady Pemberton is smiling about something.',
      kind: 'LEAD',
      involvedCharacterIds: ['clara', 'hugo', 'pemberton', 'midge'],
      involvedLocationIds: ['claras_office', 'pemberton_hall'],
      knownRewardCopy: 'The real price of the house, and who is waiting to collect it.',
      discoverWhen: { flagsSet: ['first_morning_done'] },
      steps: [
        {
          id: 'find_out',
          playerCopy: 'Find out how Clara paid for the house.',
          directorNotes:
            'Four ways in and they land differently. Being told by Clara is the version where she trusts the player. Reading her ledger is the version where the player knows something they were not given, and Clara will find out. Lady Pemberton tells it as a joke at Clara’s expense. Midge only knows what Clara’s face did at the auction, which is its own kind of answer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Ask Clara straight, after a day’s work',
              predicate: { flagsSet: ['used:own_up'], minRelationship: [{ characterId: 'clara', dimension: 'trust', value: 62 }] },
              setsFlags: ['knows:the_note', 'clara_told_you'],
              closesFlags: ['read_her_ledger'],
            },
            {
              routeId: 'read_her_ledger',
              label: 'Take the ledger from her office',
              predicate: { hasItems: ['household_ledger'] },
              setsFlags: ['knows:the_note', 'read_her_ledger'],
              closesFlags: ['clara_told_you'],
            },
            {
              routeId: 'read_her_post',
              label: 'Read the cream envelope under the blotter',
              predicate: { hasItems: ['pemberton_letter'], flagsSet: ['used:read_the_books'] },
              setsFlags: ['knows:the_note', 'read_her_post'],
              closesFlags: ['clara_told_you'],
            },
            {
              routeId: 'pemberton_told_you',
              label: 'Let Lady Pemberton tell you over tea',
              predicate: { flagsSet: ['spoke:pemberton'], atLocation: 'pemberton_hall' },
              setsFlags: ['knows:the_note', 'pemberton_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['knows:what_she_paid'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_about_it',
          playerCopy: 'Decide what you do with what you know.',
          directorNotes:
            'Clara did not want the player to know, and whatever they do now is a statement about whose side they are on. Standing beside her is not a speech; it is staying in the office while she does the sums for the fourth time. Pretending not to know is kind and also a lie, and she will catch it. Confronting her about Hugo’s pension is fair and will hurt.',
          enterWhen: { flagsSet: ['knows:the_note'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_with_her',
              label: 'Stay and do the sums with her',
              predicate: { flagsSet: ['used:keep_company'], minRelationship: [{ characterId: 'clara', dimension: 'affection', value: 58 }] },
              setsFlags: ['standing_with_clara'],
              closesFlags: ['took_pemberton_deal'],
            },
            {
              routeId: 'pretended_not_to_know',
              label: 'Pretend you never found out',
              predicate: { flagsSet: ['used:cover_for_it'] },
              setsFlags: ['kept_her_secret'],
              closesFlags: [],
            },
            {
              routeId: 'confronted_her',
              label: 'Tell her she had no right to Hugo’s pension',
              predicate: { flagsSet: ['used:pull_rank'] },
              setsFlags: ['confronted_her_about_it'],
              closesFlags: ['standing_with_clara'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['note_on_the_table'],
            abilities: [],
            reputation: [{ factionId: 'faction_below_stairs', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_lady_pembertons_offer',
      title: 'Lady Pemberton’s Offer',
      summary: 'The woman who lost the auction by one bid would like a friend inside the house. She is offering your old bedroom, your old allowance and your old name, in exchange for one page of a ledger.',
      kind: 'SIDE',
      involvedCharacterIds: ['pemberton', 'clara'],
      involvedLocationIds: ['pemberton_hall', 'the_front_hall'],
      knownRewardCopy: 'Everything you used to have, at a price, or the satisfaction of refusing it.',
      discoverWhen: { flagsSet: ['pemberton_offer_made'] },
      steps: [
        {
          id: 'answer_her',
          playerCopy: 'Give Lady Pemberton an answer.',
          directorNotes:
            'She is not a cartoon. She offers something the player genuinely lost and genuinely wants, and she offers it kindly. Taking it is a real route with a real ending, and she keeps her side of the bargain to the letter. Refusing her costs nothing today and something later: she is patient, and she remembers. Playing her along works once.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'refused_her',
              label: 'Tell her no, to her face',
              predicate: { flagsSet: ['used:own_up', 'spoke:pemberton'] },
              setsFlags: ['refused_pemberton'],
              closesFlags: ['took_pemberton_deal'],
            },
            {
              routeId: 'played_her',
              label: 'Let her think you are hers',
              predicate: { flagsSet: ['used:cover_for_it', 'spoke:pemberton'] },
              setsFlags: ['double_game'],
              closesFlags: [],
            },
            {
              routeId: 'took_her_deal',
              label: 'Shake her hand',
              predicate: {
                flagsSet: ['used:pull_rank'],
                atLocation: 'pemberton_hall',
                minRelationship: [{ characterId: 'pemberton', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['took_pemberton_deal'],
              closesFlags: ['refused_pemberton', 'standing_with_clara'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['pemberton_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_pemberton', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_after_hours',
      title: 'After Hours',
      summary: 'Late at night the house stops being a workplace, and Clara stops being your employer for about as long as it takes to drink a cup of tea on the back stair.',
      kind: 'SIDE',
      involvedCharacterIds: ['clara'],
      involvedLocationIds: ['the_back_stair', 'the_gardens'],
      knownRewardCopy: 'Whatever the two of you are, said out loud or not.',
      discoverWhen: {
        flagsSet: ['first_morning_done'],
        minRelationship: [{ characterId: 'clara', dimension: 'affection', value: 62 }],
      },
      steps: [
        {
          id: 'the_third_landing',
          playerCopy: 'Find out what the two of you are when the work stops.',
          directorNotes:
            'Slow, adult, between equals, and entirely optional. Clara will not be courted by anybody treating her as the help or as the woman who used to tidy up after them; the player has to have worked beside her first, and the scene is about that. Banter, held looks, one honest sentence, at most a kiss on the stair. If the player pushes, she says no and means it, and the next morning she is their employer again.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_it',
              label: 'Say what she is to you',
              predicate: {
                flagsSet: ['used:own_up'],
                minRelationship: [
                  { characterId: 'clara', dimension: 'affection', value: 75 },
                  { characterId: 'clara', dimension: 'trust', value: 65 },
                ],
              },
              setsFlags: ['said_it_to_her'],
              closesFlags: ['kept_it_professional'],
            },
            {
              routeId: 'just_stayed',
              label: 'Sit on the stair beside her and say nothing',
              predicate: { flagsSet: ['used:keep_company'], minRelationship: [{ characterId: 'clara', dimension: 'affection', value: 68 }] },
              setsFlags: ['quiet_understanding'],
              closesFlags: [],
            },
            {
              routeId: 'kept_it_professional',
              label: 'Bring her tea, properly, and go back to work',
              predicate: { flagsSet: ['used:serve_properly'] },
              setsFlags: ['kept_it_professional'],
              closesFlags: ['said_it_to_her'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['after_hours_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_whose_house',
      title: 'Whose House It Is',
      summary: 'The morning after the wedding somebody arrives with the loan, a pen and a smile. By breakfast Wrenhurst House belongs to Clara, to Lady Pemberton, or to whoever you helped.',
      kind: 'MAIN',
      involvedCharacterIds: ['clara', 'pemberton', 'hugo'],
      involvedLocationIds: ['claras_office', 'the_front_hall'],
      knownRewardCopy: 'An answer, signed, to the question the apron asked on the first morning.',
      discoverWhen: { flagsSet: ['wedding_day'] },
      steps: [
        {
          id: 'the_morning_after',
          playerCopy: 'The loan falls due. Find out whose house this is.',
          directorNotes:
            'Five ways this lands, and losing the house is one of them that needs no mistake: fourteen days may simply not be enough. Whatever happens, write the paperwork: the solicitor, the pen, the bell-board in the kitchen, Hugo standing one step inside the door. Do not let anybody make a speech about what the house means. Let somebody make tea.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sold_her_out',
              label: 'Lady Pemberton collects, with your help',
              predicate: { flagsSet: ['took_pemberton_deal'] },
              setsFlags: ['house_lost', 'you_sold_her_out'],
              closesFlags: ['house_saved'],
            },
            {
              routeId: 'paid_in_full',
              label: 'The wedding money and the bank pay it, together',
              predicate: { flagsSet: ['wedding_succeeded', 'standing_with_clara'] },
              setsFlags: ['house_saved', 'partners'],
              closesFlags: ['house_lost'],
            },
            {
              routeId: 'paid_on_the_takings',
              label: 'The wedding money and the bank pay it',
              predicate: { flagsSet: ['wedding_succeeded'] },
              setsFlags: ['house_saved'],
              closesFlags: ['house_lost'],
            },
            {
              routeId: 'saved_by_the_painting',
              label: 'The painting money pays it',
              predicate: { flagsSet: ['painting_sold_quietly'] },
              setsFlags: ['house_saved', 'saved_dirty'],
              closesFlags: ['house_lost'],
            },
            {
              routeId: 'foreclosed',
              label: 'Nobody can pay it',
              predicate: { flagsSet: ['note_due'] },
              setsFlags: ['house_lost'],
              closesFlags: ['house_saved'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['house_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_silas_rings',
      atWorldMinute: 11 * 60,
      locationId: 'the_front_gates',
      publicCopy:
        'A man in a neat grey raincoat rings the bell at the front gates, raises his hat, introduces himself as Silas Dunmore for the creditors, and asks very politely whether anybody has seen your father.',
      directorNotes:
        'He does not believe the postcard. He will not come in unless invited, and he will come back every day at the same time until something changes. If the player is in the house, Hugo answers the gate and lies beautifully.',
      setsFlags: ['silas_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'silas', toLocationId: 'the_front_gates' }],
    },
    {
      id: 'we_staff_supper',
      atWorldMinute: 19 * 60 + 30,
      locationId: 'the_kitchen',
      publicCopy:
        'The staff eat supper at the long kitchen table: Hugo at the head, Clara at the far end instead of the head, Midge talking, and one chair nobody has said is yours.',
      directorNotes:
        'The first test of where the player sits, literally. Clara will not tell them. Hugo will pull out the chair beside Midge if the player has done any work at all today, and say nothing about it.',
      setsFlags: ['first_staff_supper'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'clara', toLocationId: 'the_kitchen' },
        { characterId: 'hugo', toLocationId: 'the_kitchen' },
        { characterId: 'midge', toLocationId: 'the_kitchen' },
      ],
    },
    {
      id: 'we_the_night_tray',
      atWorldMinute: 22 * 60 + 30,
      locationId: 'the_back_stair',
      publicCopy: 'Hugo carries a covered tray up the servants’ stair at half past ten and comes down a few minutes later without it.',
      directorNotes:
        'Soup, bread, two biscuits from the blue tin and a second cup of cocoa. Hugo will say the tray is for the pigeon. He knows that is not a good answer and gives it anyway.',
      setsFlags: ['saw_the_tray'],
      cancelledByFlags: ['knows:the_attic'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'hugo', toLocationId: 'the_back_stair' }],
    },
    {
      id: 'we_pemberton_calls',
      atWorldMinute: 1440 + 15 * 60,
      locationId: 'the_front_hall',
      publicCopy:
        'A long silver car comes up the drive unannounced, and Lady Honoria Pemberton asks, very graciously, for a tour of the house she nearly bought.',
      directorNotes:
        'Clara gives the tour herself, perfectly, and the two women are exquisitely polite for forty minutes. At some point Lady Pemberton contrives a moment alone with the player and makes her offer: the old room, the old allowance, one page of a ledger. She leaves her card.',
      setsFlags: ['pemberton_offer_made'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'pemberton', toLocationId: 'the_front_hall' }],
    },
    {
      id: 'we_the_gazette',
      atWorldMinute: 2 * 1440 + 8 * 60,
      locationId: 'harbour_town',
      publicCopy:
        'The Kestrel Bay Gazette runs a photograph on its society page: the heir of Wrenhurst House on the front steps, in an apron, with a bucket. Headline: HOW THE MIGHTY SCRUB.',
      directorNotes:
        'Midge took it. She is sick about it. The town finds it hilarious for a day, then a few people find it admirable, and that bothers Lady Pemberton more than anything else that has happened this week.',
      setsFlags: ['in_the_paper'],
      cancelledByFlags: [],
      requiresFlags: ['wears_the_apron'],
      movesCharacters: [],
    },
    {
      id: 'we_silas_finds_the_chute',
      atWorldMinute: 5 * 1440 + 21 * 60,
      locationId: 'the_cellar',
      publicCopy:
        'Silas Dunmore is found standing in the cellar at nine at night, holding a torch, looking up the old coal chute with polite interest.',
      directorNotes:
        'He came in through the garden, which is the first rule he has broken in twenty years, and he is embarrassed about it. He has found biscuit crumbs on the hatch. One more clue and he goes up the back stair.',
      setsFlags: ['silas_found_the_chute'],
      cancelledByFlags: ['father_handed_over', 'father_came_down', 'clara_knows_about_him'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'silas', toLocationId: 'the_cellar' }],
    },
    {
      id: 'we_the_inspection',
      atWorldMinute: 6 * 1440 + 14 * 60,
      locationId: 'the_ballroom',
      publicCopy: 'The bride’s mother arrives to inspect the ballroom with a notebook, a tape measure and a list of twenty-two requirements.',
      directorNotes:
        'She is not a villain, she is a mother with a budget. She notices everything, including the pigeon. Whatever is unfinished, she writes down, and she will check it again on the day.',
      setsFlags: ['inspection_done'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'clara', toLocationId: 'the_ballroom' }],
    },
    {
      id: 'we_wedding_day',
      atWorldMinute: 13 * 1440 + 11 * 60,
      locationId: 'the_ballroom',
      publicCopy:
        'The wedding guests start coming up the drive: a hundred and twenty of them, a string quartet, a florist’s van, and a cake in four pieces.',
      directorNotes:
        'The whole fortnight arrives at once. Everybody on the staff is in the ballroom, Lady Pemberton is among the guests, and the father is directly above everybody’s heads. Whatever the player prepared, or did not, is now visible.',
      setsFlags: ['wedding_day'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'clara', toLocationId: 'the_ballroom' },
        { characterId: 'hugo', toLocationId: 'the_ballroom' },
        { characterId: 'midge', toLocationId: 'the_ballroom' },
      ],
    },
    {
      id: 'we_the_loan_falls_due',
      atWorldMinute: 14 * 1440 + 9 * 60,
      locationId: 'claras_office',
      publicCopy: 'At nine in the morning Lady Pemberton’s solicitor arrives at the kitchen door with the loan papers, a pen and a very polite smile.',
      directorNotes:
        'Lady Pemberton has come herself and is waiting in the car. If the house can pay, Clara pays it across the desk without a word. If it cannot, she signs, and then she makes everybody tea, because somebody has to.',
      setsFlags: ['note_due'],
      cancelledByFlags: ['house_decided'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'pemberton', toLocationId: 'claras_office' },
        { characterId: 'clara', toLocationId: 'claras_office' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_whose_house',
      kind: 'FINALE',
      label: 'Whose house this is by the end',
      seedHint: 'An apron held out at the foot of your own staircase.',
      payoffHint: 'Somebody signs something the morning after the wedding, and who holds the pen says what the fortnight was.',
      weight: 1,
    },
    {
      id: 'p_what_she_paid',
      kind: 'MYSTERY',
      label: 'How a maid paid for a forty-room house',
      seedHint: 'Clara does the accounts at midnight and closes the ledger whenever anybody comes in.',
      payoffHint: 'Eleven years of savings, an old man’s pension, and a loan that Lady Pemberton bought an hour after the hammer fell.',
      weight: 0.9,
    },
    {
      id: 'p_the_attic',
      kind: 'MYSTERY',
      label: 'What is creaking at the top of the house',
      seedHint: 'A covered tray on the third landing every night, empty every morning, and nobody on the staff drinks cocoa.',
      payoffHint: 'Your father, officially abroad, living in the box room with the good biscuits and a painting that belongs to his creditors.',
      weight: 0.85,
    },
    {
      id: 'p_clara',
      kind: 'RELATIONSHIP',
      label: 'What Clara is to you now',
      seedHint: 'She still says "young master", and every time it means something slightly different.',
      payoffHint: 'She stops calling you that, and what she calls you instead is the answer.',
      weight: 0.9,
    },
    {
      id: 'p_pemberton',
      kind: 'RIVAL',
      label: 'The neighbour who lost the auction by one bid',
      seedHint: 'A cream envelope with a crest on it, opened carefully and pushed under the blotter.',
      payoffHint: 'Lady Pemberton holds the loan, has the hotel plans drawn, and would like the heir to help her collect.',
      weight: 0.75,
    },
  ],
  archetypes: [
    {
      id: 'arch_socialite',
      name: 'The Life of the Party',
      role: 'Social charm background',
      summary: 'You spent your twenties at regattas and dinners, so you can talk your way into or out of almost any room, and people still recognise your face.',
      playstyle: ['Charming', 'Well known', 'Hopeless at chores'],
      blurb: 'Your photograph has been in the Gazette’s society page forty-one times. In every single one of them somebody else is carrying something.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { charm: 3, bluff: 1 },
      startingItems: [{ itemId: 'calling_cards', qty: 1 }],
      startingAbilities: ['know_the_house', 'old_charm'],
      startingReputation: [{ factionId: 'faction_kestrel_bay', amount: 10 }],
    },
    {
      id: 'arch_student',
      name: 'The One Who Studied',
      role: 'Bookish background',
      summary: 'You were away reading law and accounts when it all fell apart, so a contract, a ledger or a polite letter tells you things it tells nobody else in the house.',
      playstyle: ['Observant', 'Reads the small print', 'Slow to act'],
      blurb: 'You came home with a satchel of lecture notes on insolvency, which until last month was the most boring subject in the world.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { accounts: 3, house_lore: 1, candour: 1 },
      startingItems: [{ itemId: 'law_notes', qty: 1 }],
      startingAbilities: ['know_the_house', 'read_the_books'],
      startingReputation: [{ factionId: 'faction_creditors', amount: 10 }],
    },
    {
      id: 'arch_rower',
      name: 'The Rower',
      role: 'Physical training background',
      summary: 'Five years in a racing boat left you strong, early-rising and very hard to tire, so the stairs and the heavy work are where you shine.',
      playstyle: ['Physical', 'Tireless', 'Blunt'],
      blurb: 'You have been up at five every morning for five years. Nobody in the house expected that to be useful, least of all you.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { graft: 3, service: 1 },
      startingItems: [{ itemId: 'rowing_gloves', qty: 1 }],
      startingAbilities: ['know_the_house', 'put_your_back_in'],
      startingReputation: [{ factionId: 'faction_below_stairs', amount: 10 }],
    },
    {
      id: 'arch_black_sheep',
      name: 'The Black Sheep',
      role: 'Worked-for-a-living background',
      summary: 'You walked out on the family two years ago and poured drinks for a living. You know how to work, carry a tray and lie to a manager, and Clara always knew where you were: an unsigned card came every birthday.',
      playstyle: ['Streetwise', 'Quick liar', 'Knows real work'],
      blurb: 'Your father told everybody you were travelling. You were three streets from the harbour, behind a bar, and only one person in the house ever bothered to find you.',
      attributeBonus: { agility: 2, presence: 1 },
      skillProficiencies: { bluff: 2, service: 2, graft: 1 },
      startingItems: [{ itemId: 'bar_corkscrew', qty: 1 }],
      startingAbilities: ['know_the_house', 'cover_for_it'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the house call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Julian Avery' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'Who were you, the week before the money ran out?',
      helpText:
        'What you were doing with your life when the family went broke, which sets what you are good at. It is fixed for the whole story and cannot be changed later. It does not decide whether you take the apron, whose side you are on, or what happens to the house: all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the town already say about you?',
      helpText: 'One line of reputation, true or not. Most people write a single plain sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I once crashed a speedboat into the harbour master’s office and paid for the window with a cheque that bounced.',
    },
    {
      id: 'first_instinct',
      label: 'What is your first instinct when she holds out the apron?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite on the first turn and the house will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'take_it', label: 'Take it. Work is work' },
        { id: 'argue', label: 'Argue the terms first' },
        { id: 'refuse', label: 'Refuse. It is still your house in every way that matters' },
        { id: 'charm', label: 'Charm your way out of it' },
        { id: 'investigate', label: 'Ignore it and find out what is creaking upstairs' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Clara see at the foot of the stairs?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Last season’s good coat, no luggage, and the haircut of somebody who used to have a barber.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Losing the house is reachable without a mistake: "Sold" needs nothing but
   * the clock, because fourteen days is genuinely not long. Walking out is
   * available early and is not written as a failure. Siding with Lady
   * Pemberton is a real ending she honours to the letter. Only one of the ten
   * is the romance, and it needs the house saved and the player to have
   * worked beside Clara long enough for it to mean something.
   */
  endings: [
    {
      id: 'end_the_house_stands',
      name: 'The House Stands',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['house_saved'],
        flagsUnset: ['you_sold_her_out'],
      },
      condition:
        'The house survived the wedding and the loan, and the player is still in it, working. Nothing grand has been settled between them and Clara: she is the owner, they are staff, with wages, Sundays and a key of their own. Play it as an ordinary morning in a house that was nearly lost: the stairs, the post, a booking for next month.',
      epilogue:
        'The house takes three more weddings that summer and a funeral lunch in the autumn. The chandelier gets lit on a Tuesday for no reason at all. Clara still docks a day’s wage now and then, in writing, and now and then pays it back, also in writing.',
      hint: '',
    },
    {
      id: 'end_two_names',
      name: 'Two Names on the Door',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: {
        flagsSet: ['house_saved', 'partners'],
        minRelationship: [
          { characterId: 'clara', dimension: 'trust', value: 70 },
          { characterId: 'clara', dimension: 'respect', value: 65 },
        ],
      },
      condition:
        'The wedding worked and the loan was paid because the player stood beside Clara when it mattered, and she asks them to run the house with her as a partner rather than staff. A business first, and a romance only if it is also that. Write the paperwork and the argument about whose name goes first on the brass plate.',
      epilogue:
        'Wrenhurst House takes bookings under two names. The partners argue about everything in the office below stairs and agree about everything in front of clients. Hugo refuses, politely and permanently, to be told which of them is in charge.',
      hint: 'She has been doing the sums alone. She would rather not.',
    },
    {
      id: 'end_the_lady_of_the_house',
      name: 'The Lady of the House',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['said_it_to_her', 'house_saved'],
        flagsUnset: ['you_sold_her_out'],
        minRelationship: [
          { characterId: 'clara', dimension: 'affection', value: 80 },
          { characterId: 'clara', dimension: 'trust', value: 72 },
        ],
      },
      condition:
        'The player and Clara have said what they are to each other, as equals, after working side by side long enough for it to mean something. The house is saved and it is still hers. Keep it tender and specific and never a reward handed over: a kiss on the third landing at most, and the next morning she still hands out the day’s list.',
      epilogue:
        'She never stops handing out the list. It has both their names on it now, in alternating order, and the town discusses this for a full year before finding something else to talk about.',
      hint: '',
    },
    {
      id: 'end_sold',
      name: 'Sold',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['house_lost'],
        flagsUnset: ['you_sold_her_out'],
      },
      condition:
        'The loan fell due and the house could not pay it. Nobody here was a villain and the player did not have to make a mistake for this to happen: fourteen days was not enough. Write the leaving honestly, the boxes, the bell-board, the polite solicitor, and let it be sad without being the end of anybody.',
      epilogue:
        'Lady Pemberton’s hotel opens two summers later with sixty rooms and a terrace where the roses were. Clara runs the housekeeping at a guesthouse in town and is very good at it. Hugo retires to a flat over the bakery. Every so often they all have supper and do not talk about the house, and then do.',
      hint: '',
    },
    {
      id: 'end_pembertons_favourite',
      name: 'Pemberton’s Favourite',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['took_pemberton_deal'] },
      condition:
        'The player took Lady Pemberton’s offer and kept their side of it. She keeps hers, every word of it: the old allowance, a key to the old bedroom in a house that is now hers, and a seat at her table. Do not punish this in the prose. It is a coherent choice for somebody raised to expect comfort, and the only cost is the people.',
      epilogue:
        'The allowance arrives on the first of every month. The old bedroom is redecorated in Lady Pemberton’s taste. Clara is civil in the street, which is worse than anything she could have said, and Hugo, asked to serve at the hotel opening, declines in writing.',
      hint: '',
    },
    {
      id: 'end_the_master_comes_down',
      name: 'The Master Comes Down',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['father_came_down', 'painting_surrendered'],
        minFactionReputation: [{ factionId: 'faction_creditors', value: 15 }],
      },
      condition:
        'The player talked their father down from the attic, walked him in front of his creditors, and handed over the painting he hid. It costs the family its last valuable thing and buys back the first thing it lost, which is being able to look at each other. Write a parent and a grown child on a cliff road, not a lesson.',
      epilogue:
        'The creditors’ hearing takes forty minutes. Augustin wears his good shoes and apologises to Silas Dunmore by name. He takes a room in town and a job selling boats, which he turns out to be good at, and on Sundays he comes up the hill and uses the front door, because Clara says he may.',
      hint: 'He will not come down on his own. Somebody has to walk him.',
    },
    {
      id: 'end_bought_back_crooked',
      name: 'Bought Back Crooked',
      rarity: 'RARE',
      minTurn: 38,
      requires: { flagsSet: ['house_saved', 'saved_dirty'] },
      condition:
        'The house was saved with the painting money, which belonged to the creditors. It worked, and everybody who matters knows what it cost: Silas Dunmore knows, and Clara knows and has not decided what to do about it. Write a victory that sits slightly wrong in everybody’s mouth.',
      epilogue:
        'The loan is paid on the fifteenth morning, in full, through a dealer two counties away. Silas writes one line in his notebook and closes it. Clara pays the creditors back out of the house’s takings, a little every month, without telling anybody, and it takes her nine years.',
      hint: '',
    },
    {
      id: 'end_the_door_still_opens',
      name: 'The Door Still Opens',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['house_decided'] },
      condition:
        'The player walked out of the house and the story and did not come back. Do not make it a tragedy and do not redeem it. It is a reasonable answer to being handed an apron by your own maid, and the house goes on without them, which is the part that stings.',
      epilogue:
        'The wedding happens without them, or does not. The apron stays folded on the hall table for a week and then goes to Midge, who is the right size. Clara says nothing about it to anybody until Hugo asks, and then she says, "The door opens both ways. I told them so."',
      hint: '',
    },
    {
      id: 'end_hugos_keys',
      name: 'Hugo’s Keys',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['hugo_trained_you', 'house_saved'],
        minRelationship: [{ characterId: 'hugo', dimension: 'respect', value: 75 }],
        minFactionReputation: [{ factionId: 'faction_below_stairs', value: 60 }],
      },
      condition:
        'The heir of the house became the best servant in it. Hugo, retiring at last, hands the player his ring of keys in front of the whole staff, which is the highest honour this house has, and the player has to understand that for the scene to land. Play it formally and let one person cry, and it is not Hugo.',
      epilogue:
        'Hugo takes his pension back, because the house can pay it now, and spends it on a small boat he never sails. The keys are heavier than they look. The player learns every one of them in a week, and the small unlabelled brass one goes in a drawer and stays there.',
      hint: 'He has been watching how you carry a tray.',
    },
    {
      id: 'end_a_room_in_town',
      name: 'A Room in Town',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['refused_the_apron', 'house_decided'],
        flagsUnset: ['took_pemberton_deal'],
      },
      condition:
        'The player never took the apron. They found a room and a job in town and stayed in the story from outside the gates, a friend to the house rather than a servant in it. Whatever happened to Wrenhurst happened with them as a visitor. Write the dignity of that, and the distance.',
      epilogue:
        'They come up the hill on Thursday evenings and are let in by the front door. Clara offers tea, never an apron. Neither of them mentions the morning in the hall, and once, years later, they both laugh about it at the same moment.',
      hint: '',
    },
  ],
  opening:
    "Clara Voss is holding out an apron.\n\nFor eleven years she was your family’s maid. Yesterday, when the bank auctioned off everything your father owned, she bought the house.\n\n\"Good morning, young master.\" A black dress now, not the grey uniform. Same level eyes. \"Three hundred stairs in this house, and nobody has scrubbed one since spring. You’ll start at the top.\"\n\nThe hall behind her is bare. The bailiffs took the paintings, the rugs, even the clocks.\n\nFar above you, a floorboard creaks. Nobody is supposed to be up there.\n\nShe doesn’t look up. She’s looking at you.\n\n\"Bed, meals and a wage, if you earn one. Or the door. Which is it?\"",
  openingPanel: {
    assetKey: 'story_the_maid_owns_the_house_now/opening',
    alt: 'Clara in a plain black dress, sleeves rolled, at the foot of a bare marble staircase, holding a folded black apron out to you, grey dawn light through tall windows.',
  },
  openingSuggestions: [
    "\"I’ll take the wage. But I’m not calling you ma’am.\"",
    'I take the apron, tie it on wrong, and start up the stairs.',
    'I walk past her and pull the bell for breakfast, like I always did.',
  ],
  coverDirection: [
    'SUBJECT: Clara Voss, the new owner of an old seaside mansion, alone and unmistakable in the foreground of a key visual for a romantic comedy anime about a house that changed hands overnight.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture, standing at the foot of a grand staircase.',
    'Dark hair pinned in a neat low knot, level grey eyes, a plain high-necked black dress with long sleeves rolled to the elbow, no jewellery, and an old silver hand bell on a black ribbon at her wrist.',
    'She is dressed as the head of the household, not in a maid costume: no frills, no lace, no headpiece, no apron on her.',
    'One arm is held straight out toward the viewer, offering a neatly folded plain black work apron; the other hand rests on the carved end of the stone banister.',
    'Her expression is composed and dry, one eyebrow slightly raised, the corner of her mouth almost a smile, looking straight at the viewer.',
    'The silver bell at her wrist catches the light in one bright glint, and the same warm gold gleam runs along the banister and the title.',
    'HER FACE STAYS CLEAN: no glints, sparkles, shadows or marks across her face or skin. Every shine stays on the bell, the banister and the title.',
    'BEHIND HER, soft and secondary: a stripped marble entrance hall, a curving grand staircase, pale empty rectangles on the walls where paintings used to hang, and tall windows full of grey sea light.',
    'Small on the first landing of the staircase, in soft focus, a silver-haired butler in a black tailcoat pretends very hard not to be watching.',
    'LIGHT: cool grey-blue dawn light from the tall windows behind her and warm gold light from one lamp on the stair, so she is rimmed in gold against the grey.',
    'TITLE: the title The Maid Owns the House Now painted into the art in the upper third, above her head, as an elegant high-contrast serif logo set in capitals on two lines,',
    'THE MAID OWNS on the first line and THE HOUSE NOW larger on the second, ivory-white letters with a thin black outline, an antique-gold edge and a soft warm glow, and one small gold house key hanging from a ribbon under the last line,',
    'spelled exactly THE MAID OWNS THE HOUSE NOW, large and legible at thumbnail size. No other text anywhere: nothing written on the apron, the walls or the bell.',
  ].join(' '),
  publishedAt: null,
};

export const THE_MAID_OWNS_THE_HOUSE_NOW = StoryVersion.parse(raw);
