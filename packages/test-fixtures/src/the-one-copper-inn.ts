import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The One-Copper Inn" — slow life with a pulse.
 *
 * Bible: `docs/story-bibles/new50/10_THE_ONE_COPPER_INN.md`. Slate #10, a
 * slow-life isekai for both audiences.
 *
 * Playable span: seven nights at one ruined coaching inn and the valley below
 * it, from midnight on day 0, when a woman with horns puts a dragon scale on
 * the counter, to first light on the seventh morning, when her wound has
 * closed. The Reeve's inspection at noon on the third day is the spine.
 *
 * The structural bet is that the cosy half and the tense half are the same
 * half. An old law, the Lantern Charter, protects a paying guest only in a
 * working inn with the lamp lit. So patching a roof, lighting a range and
 * serving a paid supper are moves in the hunt, and the hunters' best weapon is
 * a petition rather than a crossbow. The captain is polite because the law
 * makes him be, and the law cuts both ways: a working inn may not refuse a
 * paying traveller while it has a bed free, so the second roof the player
 * patches is a room the captain can rent.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest summaries,
 * world events and the first twelve endings. It never sees resources, step
 * notes or abilities other than the chosen archetype's starting ones. So the
 * charter, the scale's compass behaviour, the seven nights and every age are in
 * hard canon, and the scale, the deed and the charter are quest items.
 *
 * Three invisible variables. Stamina is the only GOOD_HIGH, because
 * `resolveRest` refills those. Suspicion comes first among the descending pair
 * on purpose: public violence raises the first GOOD_LOW in array order, and a
 * fight at the inn tells the hunters more than anything else could. Debt is
 * what the house owes, and it is the Reeve's argument that this is not an inn.
 * Brindle Ford is the first faction for the same reason: a brawl on the hill is
 * the town's business first.
 */

const raw = {
  id: 'sv_the_one_copper_inn_1',
  storyId: 'story_the_one_copper_inn',
  version: 1,
  title: 'The One-Copper Inn',
  fantasyLabel: 'Your first guest is a dragon.',
  hook: 'You bought a ruined inn for one copper. Your first guest pays with a dragon scale, and hunters are behind her.',
  premise:
    'A month ago you walked out of the fog on the north road, in the clothes you wore to work, into a world that has never heard of yours. The valley calls people like you strays. It feeds them, asks no questions, and expects them to settle.\n\n' +
    'So you settled. Yesterday the town’s Reeve, who keeps its ledgers, sold you the only property you could afford: a coaching inn on the hill, empty for twenty years, with half a roof, a stablehand who came with it, and a price of one copper.\n\n' +
    'Tonight at midnight your first guest walked in out of the rain. She has horns under her hood and a wound across her shoulder, and she paid with a dragon scale worth more than the whole town. There are hunters’ torches on the hill behind her.\n\n' +
    'She needs seven nights under a roof before she can fly again. An old charter says nobody may take a paying guest from a working inn while the lamp over the door is lit. The hunters know that law too, so they will try to prove your ruin is not an inn.\n\n' +
    'Hide her, hand her over, sell the scale, or make the place real before the third day, when the Reeve comes to inspect it. Somebody is already watching the lamp.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Isekai', 'High fantasy', 'Slice of life', 'Romance', 'Comedy'],
  mechanicsChips: [
    'Run a ruined inn',
    'A dragon for a guest',
    'An old law on your side',
    'Polite hunters at the door',
    'Seven nights to keep her',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can spend ten turns patching one roof and feeding six drovers, and that is a real way to play this. You can also sell the scale on the first morning. The hunters are polite, the law is old, and your first guest is the most dangerous person in the valley and the most grateful one.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'common_room',
    startWorldMinute: 0,
    startingItems: [
      { itemId: 'inn_deed', qty: 1 },
      { itemId: 'inn_keys', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-nine. Ember is two hundred and twelve years old and in human shape looks about twenty-five. Tobin Ashby is twenty-two, Captain Corin Wren thirty-four, Old Marla Tull seventy-one and Reeve Imogen Thatch forty-nine. The hunters, the drovers and the townsfolk are all adults.',
      'The player walked out of the fog on the north road thirty-one days ago, from a world with trains and telephones. Every generation or so somebody does. The valley calls them strays, treats them kindly, and finds them less strange than they find the valley. Nobody knows how to send a stray back. A stray brings no magic and gains none here: the player cannot fly, cast spells or do anything an ordinary person from our world could not.',
      'The inn stands on the north road on the hill above Brindle Ford, a market town of four hundred people on a river. It was called Wren’s Rest and kept by the Wren family for three generations, until it closed twenty years ago when the new king’s road went down the valley floor and took the carts with it. Yesterday Reeve Thatch sold it to the player for one copper, because nobody else would take on forty crowns of back taxes, a half-fallen roof, or the charter. Of its seven guest rooms only Room Four still has a whole roof.',
      'Money: twelve copper pennies make a silver and twenty silver make a crown. A bed and supper costs four copper. A good horse costs eight crowns. A dragon scale is worth about four hundred crowns to the right buyer.',
      'The Lantern Charter, three hundred years old and never repealed: nobody, not even an officer of the crown, may take a paying guest from under a chartered inn’s roof between lamp-lighting and dawn, so long as the lamp over the door is lit and the house is a working inn, meaning it keeps a fire, a bed and a meal for anybody who pays. Under the same roof no guest may raise a hand against another. A working inn may not refuse a paying traveller while it has a bed free. The charter paper must be shown if challenged, and it is in Old Marla’s biscuit tin, which nobody has told the player.',
      'Dragons are real and rare; fewer than a dozen are left in the mountains. A dragon can take human shape, but the horns stay, and the body runs hot enough that rain steams off it. Every time a dragon in human shape uses fire or a dragon’s strength, an unhealed wound opens again.',
      'Ember is a red dragon. Last night a hunter’s chain-bolt went through her left wing over the hill; in human shape the wound is a long tear across her left shoulder blade, bound with her own torn sleeve. She cannot change back or fly until it closes, which takes seven nights of warmth, food and sleep under a roof. Ember is the name she chose; her true name she has never given to a human.',
      'A scale a dragon gives away freely, held near a flame, turns in the hand toward the dragon it came from, like a compass needle. Every hunter knows this. Ember paid for her room with one from her own shoulder anyway.',
      'The Greyhook Company are twenty dragon hunters with chain-bolt crossbows, made to pin a wing rather than kill, and hooked pikes. They are led by Captain Corin Wren under a crown hunting warrant, which makes them officers under the charter. Their contract comes from the Margrave of the Fells, who pays a thousand crowns for the red dragon taken alive and fifty for word of where she sleeps. He wants her chained in his tower so her scales can be cut as they grow back, one a month, for the rest of her life. Wren knows this and has told nobody in his company.',
      'Captain Wren was born in this inn’s stable. His mother, Hester Wren, was the last keeper of Wren’s Rest. The old sign lies face down under the cellar stairs. Wren has not set foot inside since the day he left.',
      'Fifty years ago Ember wintered at Wren’s Rest under another name, and Marla, then twenty-one and the cook’s helper, fed her every night and asked nothing. Marla recognises her on sight. Ember chose this inn on purpose, because she remembered the charter and the lamp.',
      'Yesterday a Greyhook scout paid Tobin one silver to light a lantern in the hayloft window if a stranger came to the inn. Tobin took it because the mare needed oats. He has not decided whether to light it.',
      'At dusk tonight the player lit the old iron lamp over the front door, the first time it has burned in twenty years, mostly to see whether it still worked. Ember saw it from the hill and came straight to it. Marla saw it from her window across the wall.',
    ],
    toneGuide:
      'Cosy slow-life fantasy with a pulse. The pleasure is specific work: a roof patched with slate pulled off a barn, an iron range lit for the first time in twenty years, a supper somebody pays four copper for, a sign repainted. The pulse is twenty polite hunters at the crossroads and an old law that only protects a real inn. ' +
      'Keep the two braided: every job done on the house is also a move in the hunt, and every move in the hunt happens over food. Humour is dry and domestic. Danger is real and mostly courteous; nobody here is a villain except a lord who never appears. ' +
      'The player is a stray from a world like ours, and their old-world habits are allowed to be useful and funny without solving everything. Romance, if the player wants it, is slow and warm and allowed to stay unspoken, and goes no further than a kiss. The face at the top of a beat is whoever reacted to the player most strongly, and Ember’s whenever she is in the room. The night never stands still: every beat moves it on by one concrete thing, such as a torch coming nearer, a knock, a board giving way or a price named, and a question nobody has answered gets asked again, sharper.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Ember looks at the range for a long moment.\n\n\"It is cold,\" she says.\n\n\"It’s been cold for twenty years.\"\n\nShe crouches, opens the firebox, and breathes out once, gently, the way you’d blow on soup.\n\nEvery pan on the wall rings.\n\nThe range roars. Old Marla, in the back doorway with a basket, drops a cabbage.\n\nEmber stands and dusts off her hands. \"There. Now it is a kitchen.\"\n\nShe sways. One hand goes to her shoulder.\n\n\"Sit down,\" you say.\n\n\"I am sitting down,\" she says, and does.",
      "Three knocks. Evenly spaced.\n\nCaptain Wren stands on the step in the rain with his hat in both hands, and looks up at the lamp.\n\n\"Lit,\" he says. \"Good.\"\n\nHe looks past you at the stairs. Then back at you, politely.\n\n\"I won’t come in, keeper. Not tonight. But if a second room gets a roof by the third night, I’ll want it. Paid in advance.\"\n\nBehind him, twenty torches wait at the gate.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 10, mind: 12, presence: 11, resolve: 11, arcana: 6 },
  skills: [
    { id: 'attention', name: 'Noticing', attribute: 'mind', description: 'What changed in a room, and what somebody is doing with their hands while they lie to you.' },
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'A meal for six out of a sack of flour, two onions and whatever Marla left on the step.' },
    { id: 'mending', name: 'Mending', attribute: 'mind', description: 'Cleaning, closing and binding a wound so it heals instead of festering.' },
    { id: 'graft', name: 'Graft', attribute: 'might', description: 'The physical work a ruin needs. Slate, water, timber, a range that weighs as much as a cart.' },
    { id: 'haggling', name: 'Haggling', attribute: 'presence', description: 'A price the other side will grumble about and accept, and credit from people who have no reason to give it.' },
    { id: 'bluffing', name: 'Bluffing', attribute: 'presence', description: 'A false thing said so boringly that nobody thinks to check it.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Saying the true thing, or the law, to somebody with a crossbow behind him.' },
    { id: 'quiet', name: 'Quiet Feet', attribute: 'agility', description: 'Moving something, or somebody, out of sight without anybody marking the moment.' },
    { id: 'lore', name: 'Old Lore', attribute: 'arcana', description: 'Charters, dragons, and what the old words in a deed actually commit you to.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so a night's sleep restores the keeper and
   * nothing else. Suspicion and Debt descend: Suspicion is how sure the valley
   * is that the dragon is under this roof, Debt is what the house owes. Lying,
   * standing in the door, hiding things and warming the scale raise Suspicion;
   * cooking and buying raise Debt; both drain slowly on their own.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 70,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has been on their feet since the fog. They sit down on the nearest step, and whoever is closest decides what happens next, which in this house is usually Marla with a bowl of something.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Slates slip, sauces catch, answers come out short and a beat late. This is the band where the keeper agrees to things to end a conversation, where a lie comes out with a hole in it, and where going to bed is the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'An ordinary innkeeper’s tiredness. Fine for one more job and honest about not wanting two. Good for sitting by the fire with somebody, bad for haggling in the market or facing the captain on the step.',
        },
        {
          upTo: 100,
          behaviour:
            'The day is still in front of them. Room to climb a roof, cook something that takes an hour, walk to town and back, and say the difficult thing well rather than bluntly. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'suspicion',
      name: 'Suspicion',
      max: 100,
      start: 30,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The hunters have decided she went over the mountains. Their tents come down, the town stops looking up the hill, and the inn is just an inn with a strange new keeper.',
      color: '#C8553D',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The valley believes the dragon went over the pass. Wren keeps two trackers on the hill out of thoroughness and spends his days at the Reeve’s hall on paperwork. The town gossips about the stray who bought the ruin, not about who is sleeping in it.',
        },
        {
          upTo: 55,
          behaviour:
            'Wren thinks she is in the valley and has three buildings in mind, one of them yours. A hunter drinks at the Drowned Ox every evening and listens. Townsfolk ask the keeper, kindly, whether they have had any guests.',
        },
        {
          upTo: 80,
          behaviour:
            'Wren is sure, and is only waiting for the law. Two hunters stand on the road below the inn all night with shuttered lanterns. The tavern landlord tells anyone who will listen about fifty crowns, and the market goes quiet when the keeper walks through it.',
        },
        {
          upTo: 100,
          behaviour:
            'Everybody knows. Doors in town are barred after dark, the Margrave’s factor rides up the hill to look at the yard, and Wren’s company stops being patient with its captain. Any lapse in the charter, one unlit hour, and they come in.',
        },
      ],
    },
    {
      id: 'debt',
      name: 'Debt',
      max: 100,
      start: 40,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The house owes nobody anything. The back taxes are paid, the chandler is smiling, and the Reeve has run out of arguments that this is anything other than a working inn.',
      color: '#B08D57',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Solvent. Paying guests cover the flour and the lamp oil, the chandler gives credit without being asked, and the Reeve writes the inn into the town’s ledger as a going concern with visible pleasure.',
        },
        {
          upTo: 60,
          behaviour:
            'Owing, the way every new business owes. The baker wants paying by market day, the chandler asks politely about the account, and every supper served is counted in copper before it is eaten.',
        },
        {
          upTo: 100,
          behaviour:
            'In trouble. Nobody in town will sell on credit, the Reeve has a column in red ink, and Wren can argue with a straight face that a house which cannot pay for its own lamp oil is not a working inn. Four hundred crowns sitting in a drawer starts to look like the only answer.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'dragon_scale',
      name: 'The Dragon Scale',
      tags: ['quest', 'treasure'],
      questItem: true,
      description:
        'A red-gold scale the size of your palm, curved like a small shield and still warm hours after it left her. Worth about four hundred crowns to the right buyer, which is ten times what the town says your inn owes.',
      loreText:
        'A scale a dragon gives away freely, held close to a flame, turns in the hand toward the dragon it came from, like a compass needle. Every hunter knows it. She paid with it anyway.',
      icon: 'gem',
    },
    {
      id: 'inn_deed',
      name: 'The Deed of Sale',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'One page in the Reeve’s best handwriting: the coaching inn on the north road, with its yard, stable and cellar, sold to the bearer for one copper penny, received. Clause nine says the house is sold "with its charter, where found".',
      loreText:
        'A second page is supposed to be pinned to the first, and the pin is still there. Nobody at the Reeve’s hall could find the charter, and the Reeve did not look very hard.',
      icon: 'scroll',
    },
    {
      id: 'lantern_charter',
      name: 'The Lantern Charter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Three-hundred-year-old vellum with a royal seal: no paying guest may be taken from under a chartered inn’s roof between lamp-lighting and dawn, while the lamp is lit and the house keeps a fire, a bed and a meal for any who pay.',
      loreText:
        'Signed along the bottom by every keeper of Wren’s Rest, one under another. The last name is Hester Wren, and there is room for exactly one more.',
      icon: 'scroll',
    },
    {
      id: 'inn_keys',
      name: 'The Ring of Keys',
      tags: ['tool'],
      description:
        'Seven room keys, a cellar key, a stable key, and one heavy old key that fits nothing anybody has found yet.',
      loreText: 'The heavy one fits the low door behind the wine racks in the cellar, into a room no plan of the house shows.',
      icon: 'key',
    },
    {
      id: 'guest_ledger',
      name: 'The Old Guest Book',
      tags: ['document'],
      skillModifiers: { lore: 1 },
      description:
        'Fifty years of guests in a dozen hands: drovers, pilgrims, a travelling dentist, a bishop who complained. One winter page is signed in a reddish ink that has not faded at all.',
      loreText: 'The red signature says only "A traveller, with thanks." Under it, in a cook’s round hand: "M.T. — soup every night, no questions."',
      icon: 'book',
    },
    {
      id: 'old_sign',
      name: 'The Old Sign',
      tags: ['personal'],
      description:
        'A painted board as long as a man, face down under the cellar stairs. Turned over, a wren on a branch above the words WREN’S REST in faded green and gold.',
      loreText: 'Somebody has carved a small, careful letter C into the back corner, the way a person carves something on the day they leave.',
      icon: 'sign',
    },
    {
      id: 'chain_bolt',
      name: 'The Chain-Bolt',
      tags: ['evidence'],
      description:
        'A barbed iron crossbow bolt as long as your forearm, with three links of fine chain still hanging from its eye. Stamped on the shaft: a hook, and the letter G.',
      loreText: 'Made to go through a wing and hold, not to kill. The chain is meant to stay attached to something on the ground.',
      icon: 'arrow',
    },
    {
      id: 'tobins_silver',
      name: 'The Scout’s Silver',
      tags: ['coin'],
      description: 'One silver piece, newer and brighter than any coin in the valley, kept in the toe of Tobin’s left boot.',
      loreText: 'Payment, in advance, for lighting a lantern in the hayloft window if a stranger comes to the inn.',
      icon: 'coin',
    },
    {
      id: 'stack_of_slate',
      name: 'A Stack of Good Slate',
      tags: ['material'],
      skillModifiers: { graft: 1 },
      description: 'Forty roof slates Tobin stripped off the collapsed barn, stacked by size, sound enough to roof one more room.',
      loreText: 'He has been saving them for six years for a day when somebody owned the place.',
      icon: 'tools',
    },
    {
      id: 'bounty_notice',
      name: 'The Bounty Notice',
      tags: ['document'],
      description:
        'Nailed to the market cross: ONE THOUSAND CROWNS for the red dragon, TAKEN ALIVE, and FIFTY for word of where she sleeps. Apply to Captain C. Wren, Greyhook Company, at the crossroads.',
      loreText: 'The notice is printed. The word ALIVE has been underlined by hand, in a different ink, by somebody who wanted it seen.',
      icon: 'papers',
    },
    {
      id: 'margraves_letter',
      name: 'The Margrave’s Letter',
      tags: ['document'],
      description:
        'Thick paper and a black wax seal: three paragraphs of compliments to the Reeve, and one sentence that matters. "You will cooperate with the Greyhook Company in all things."',
      loreText: 'A postscript in a different hand asks how many cart-lengths wide the inn’s yard is, as if somebody wants to know whether a wagon with a cage on it would fit.',
      icon: 'letter',
    },
    {
      id: 'honey_jar',
      name: 'A Jar of Marla’s Honey',
      tags: ['food'],
      skillModifiers: { cooking: 1 },
      description: 'Dark heather honey in a stoppered jar, with a label that says NOT FOR SELLING in capitals.',
      loreText: 'Marla gives it away constantly and denies doing so.',
      icon: 'jar',
    },
    {
      id: 'big_kettle',
      name: 'The Big Kettle',
      tags: ['tool'],
      description: 'A copper kettle the size of a bucket, green with neglect, that once made tea for a coach-load at a time.',
      loreText: 'Scrubbed, it would be the brightest thing in the house.',
      icon: 'kettle',
    },
    {
      id: 'chefs_knife',
      name: 'Your Chef’s Knife',
      tags: ['personal', 'tool'],
      skillModifiers: { cooking: 1 },
      description: 'The knife from your old job, wrapped in a tea towel, sharper than anything the valley’s smith has ever made.',
      loreText: 'Marla held it up to the window for a full minute and then asked, very casually, what you would take for it.',
      icon: 'knife',
    },
    {
      id: 'tape_measure',
      name: 'A Tape Measure',
      tags: ['personal', 'tool'],
      skillModifiers: { graft: 1 },
      description: 'A yellow retracting tape measure from your old world, which snaps back into its case and makes everybody in the valley jump.',
      loreText: 'The Reeve has asked to borrow it twice.',
      icon: 'tools',
    },
    {
      id: 'ballpoint_pen',
      name: 'A Ballpoint Pen',
      tags: ['personal', 'tool'],
      skillModifiers: { haggling: 1 },
      description: 'A clicking ballpoint pen that writes without ink pots, which in this valley is very nearly magic.',
      loreText: 'Half the market has asked to see it. It is about a third full.',
      icon: 'pen',
    },
    {
      id: 'first_aid_pouch',
      name: 'A First-Aid Pouch',
      tags: ['personal', 'medical'],
      skillModifiers: { mending: 1 },
      description: 'A zipped red pouch from your old life: a roll of bandage, a strip of plasters, antiseptic wipes and a pair of blunt scissors.',
      loreText: 'Nothing in it is more than a month from the world it came from, and none of it can be replaced.',
      icon: 'medkit',
    },
  ],
  abilities: [
    {
      id: 'keep_house',
      name: 'Keep House',
      tags: ['utility'],
      description: 'Do the physical work an inn needs: patch a roof, sweep a floor, light the lamp, haul water, mend a table.',
      affordances: ['fix the roof', 'patch it', 'sweep', 'clean up', 'light the lamp', 'haul water', 'mend it', 'repair', 'do the work', 'scrub'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'graft', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_supper',
      name: 'Cook Supper',
      tags: ['utility'],
      description: 'Make a meal out of whatever is in the kitchen and put it in front of somebody who needs it.',
      affordances: ['cook', 'make supper', 'make soup', 'feed her', 'feed them', 'light the range', 'bake', 'make breakfast'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'debt', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_straight',
      name: 'Talk Straight',
      tags: ['social'],
      description: 'Say the true thing plainly to somebody, and take whatever comes back.',
      affordances: ['tell the truth', 'be honest', 'say it plainly', 'admit it', 'ask straight', 'come clean', 'ask her', 'ask him'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'spin_a_story',
      name: 'Spin a Story',
      tags: ['social'],
      description: 'Tell somebody a version of events that is not true, and make it the most boring thing they will hear all week.',
      affordances: ['lie', 'bluff', 'make something up', 'cover for her', 'say nobody came', 'deny it', 'pretend', 'play dumb'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'suspicion', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluffing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out what somebody wants from what they do with their hands, and notice what changed in a room.',
      affordances: ['look around', 'watch', 'notice', 'study', 'read him', 'read her', 'search', 'look closer', 'check'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'attention', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'haggle',
      name: 'Haggle',
      tags: ['social'],
      description: 'Buy, sell or borrow at a price the other side will grumble about and accept.',
      affordances: ['haggle', 'bargain', 'buy', 'sell', 'barter', 'put it on credit', 'negotiate', 'sell the scale'],
      costs: [
        { resourceId: 'stamina', amount: 5 },
        { resourceId: 'debt', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'haggling', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_in_the_door',
      name: 'Stand in the Door',
      tags: ['social'],
      description: 'Plant yourself on your own threshold and say the charter’s words to whoever wants to come in.',
      affordances: ['stand in the door', 'block the door', 'refuse them', 'quote the charter', 'invoke the charter', 'turn them away', 'bar the door', 'not tonight'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'suspicion', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Out of Sight',
      tags: ['utility'],
      description: 'Move something or somebody out of sight quickly and quietly: down the hatch, behind the racks, out the back.',
      affordances: ['hide her', 'hide it', 'sneak', 'slip out', 'go quietly', 'hide', 'out the back', 'into the cellar'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'suspicion', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'quiet', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tend_wound',
      name: 'Tend a Wound',
      tags: ['healing'],
      description: 'Clean, close and bind a wound properly, with whatever clean cloth and hot water you can find.',
      affordances: ['tend the wound', 'bandage it', 'dress the wound', 'clean it', 'stitch it', 'look at her shoulder', 'patch her up'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'mending', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pull_up_a_chair',
      name: 'Pull Up a Chair',
      tags: ['social'],
      description: 'Sit down by the fire with somebody, say nothing in particular, and let them decide what the evening is about.',
      affordances: ['sit with her', 'sit down', 'keep her company', 'pull up a chair', 'wait', 'share the fire', 'have a drink'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'warm_the_scale',
      name: 'Warm the Scale',
      tags: ['sight'],
      description: 'Hold a freely given dragon scale near a flame and follow the way it turns.',
      affordances: ['warm the scale', 'hold it to the fire', 'follow the scale', 'use the scale', 'track her', 'find her'],
      costs: [
        { resourceId: 'stamina', amount: 4 },
        { resourceId: 'suspicion', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'lore', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_scale_points'],
        lockedCopy: 'It is a scale. It is warm and it is worth a fortune, and as far as you know that is all it does.',
      },
    },
    {
      id: 'call_her_name',
      name: 'Call Her Name',
      tags: ['social'],
      description: 'Say the true name she gave you out loud, once, and she will hear it wherever she is.',
      affordances: ['call her', 'say her name', 'say her true name', 'call for her', 'call her back'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:her_name'],
        lockedCopy: 'You know what she likes to be called by the fire. That is not her name, and she has not given you her name.',
      },
    },
  ],
  locations: [
    {
      id: 'common_room',
      name: 'The Common Room',
      shortName: 'Common Room',
      description:
        'Long, low and smelling of wet ash. A counter with a brass bell that still rings, three tables out of eleven that stand up on their own, a hearth big enough to roast a sheep in, and rain coming through the roof in three places into three buckets. Over the front door, on an iron bracket, hangs the lamp.',
      artDirection:
        'A dark ruined coaching-inn common room at midnight, low beams, a long worn counter with a brass bell, one big stone hearth glowing, three buckets catching rain from a broken roof, a single iron lamp over the door. Warm firelight against cold blue rain light.',
      connections: [
        { to: 'inn_kitchen', travelMinutes: 1, label: 'Through to the kitchen' },
        { to: 'guest_rooms', travelMinutes: 1, label: 'Up the stairs' },
        { to: 'inn_cellar', travelMinutes: 1, label: 'Down the cellar hatch' },
        { to: 'stable_yard', travelMinutes: 1, label: 'Out the side door to the yard' },
        { to: 'north_road', travelMinutes: 1, label: 'Out the front door to the road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'dragon_scale', qty: 1, ownerId: null, aka: ['scale', 'the scale', 'dragon scale', 'red scale', 'her scale'] },
      ],
    },
    {
      id: 'inn_kitchen',
      name: 'The Kitchen',
      shortName: 'Kitchen',
      description:
        'A black iron range the size of a cart that has not been lit in twenty years, copper pans gone green on their hooks, a scrubbed table, and a back door that opens onto Old Marla’s vegetable patch. Somebody has been in here recently and swept.',
      artDirection:
        'An old stone inn kitchen, a huge cold black iron range, rows of tarnished copper pans on hooks, a scrubbed wooden table, a back door open onto a vegetable patch in grey morning light.',
      connections: [
        { to: 'common_room', travelMinutes: 1, label: 'Back to the common room' },
        { to: 'marlas_cottage', travelMinutes: 2, label: 'Out the back door, across the vegetable patch' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'big_kettle', qty: 1, ownerId: null, aka: ['kettle', 'the kettle', 'the big kettle', 'copper kettle'] },
      ],
    },
    {
      id: 'guest_rooms',
      name: 'The Guest Rooms',
      shortName: 'Upstairs',
      description:
        'A corridor of seven doors. Six open onto sky: fallen slate, wet floorboards, a bed frame with a bird’s nest in it. The seventh, Room Four at the far end, still has its roof, a bed, a washstand and shutters that bar from the inside.',
      artDirection:
        'An upstairs inn corridor with seven doors, most open onto broken roofs and night sky, one door at the end shut and lit from beneath. Rain, bare boards, a bird’s nest on a bed frame.',
      connections: [{ to: 'common_room', travelMinutes: 1, label: 'Back down the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'inn_cellar',
      name: 'The Cellar',
      shortName: 'Cellar',
      description:
        'Stone steps down to barrels gone dry, a wine rack with three bottles nobody can identify, a crate of old guest books, and a low door behind the racks into a second, smaller cellar no plan of the house shows. Under the stairs, face down, lies a painted sign as long as a man.',
      artDirection:
        'A vaulted stone inn cellar lit by one candle, dry barrels, a dusty wine rack, a crate of leather-bound books, a low iron-bound door half hidden behind the racks, a long painted board face down under wooden stairs.',
      connections: [{ to: 'common_room', travelMinutes: 1, label: 'Up the cellar steps' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'guest_ledger', qty: 1, ownerId: null, aka: ['guest book', 'the guest book', 'the old book', 'the ledger', 'old guest book'] },
        { itemId: 'old_sign', qty: 1, ownerId: null, aka: ['sign', 'the sign', 'the old sign', 'the painted sign', 'the board'] },
      ],
    },
    {
      id: 'stable_yard',
      name: 'The Stable Yard',
      shortName: 'The Yard',
      description:
        'A cobbled yard and a stable with the only sound roof on the property, because Tobin re-slated it himself. One elderly grey mare called Lady Biscuit, a pump that works if you swear at it, and a hayloft window that faces straight down the road to the crossroads.',
      artDirection:
        'A cobbled inn stable yard at night in the rain, a neat stable with a good slate roof, an old grey mare looking out of her stall, a hayloft window with a lantern hook, a hand pump, a low wall to a cottage.',
      connections: [
        { to: 'common_room', travelMinutes: 1, label: 'In by the side door' },
        { to: 'north_road', travelMinutes: 1, label: 'Out through the yard gate' },
        { to: 'marlas_cottage', travelMinutes: 1, label: 'Over the low wall to next door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'tobins_silver', qty: 1, ownerId: 'tobin', aka: ['silver', 'the silver', 'the coin', 'the silver piece', 'his silver'] },
        { itemId: 'stack_of_slate', qty: 1, ownerId: 'tobin', aka: ['slate', 'slates', 'the slate', 'the stack', 'roof slates'] },
      ],
    },
    {
      id: 'marlas_cottage',
      name: 'Old Marla’s Cottage',
      shortName: 'Next Door',
      description:
        'A whitewashed cottage over the low wall, with four beehives, a goat called The Bishop tethered to the gate, a kitchen that smells permanently of onions and bread, and a dented biscuit tin on the top shelf that Marla moves out of reach whenever anybody looks at it.',
      artDirection:
        'A small whitewashed country cottage beside a ruined inn, beehives in a row, a goat at the gate, a warm cluttered kitchen with bread on the table and a dented tin on a high shelf.',
      connections: [
        { to: 'stable_yard', travelMinutes: 1, label: 'Back over the wall' },
        { to: 'inn_kitchen', travelMinutes: 2, label: 'Through the vegetable patch to the back door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [
        { itemId: 'lantern_charter', qty: 1, ownerId: 'marla', aka: ['charter', 'the charter', 'the old paper', 'the biscuit tin', 'the vellum'] },
        { itemId: 'honey_jar', qty: 1, ownerId: 'marla', aka: ['honey', 'the honey', 'the jar', 'jar of honey'] },
      ],
    },
    {
      id: 'north_road',
      name: 'The North Road',
      shortName: 'The Road',
      description:
        'The old coaching road, grass growing up its middle, climbing past the inn toward the mountains. From the bend above the inn you can see the whole valley: the river, the town, and the crossroads where the hunters have pitched their tents.',
      artDirection:
        'An old grassy coaching road climbing a hillside at dusk past a ruined inn with one lit lamp, a river valley and a small town below, tents and campfires at a distant crossroads.',
      connections: [
        { to: 'common_room', travelMinutes: 1, label: 'In at the front door' },
        { to: 'stable_yard', travelMinutes: 1, label: 'In through the yard gate' },
        { to: 'the_crag', travelMinutes: 15, label: 'Up the hill to the crag' },
        { to: 'hunters_camp', travelMinutes: 20, label: 'Down to the crossroads' },
        { to: 'ford_market', travelMinutes: 25, label: 'Down the hill into town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_crag',
      name: 'The Crag',
      shortName: 'The Crag',
      description:
        'A shoulder of grey rock above the inn where something heavy came down last night. A long black furrow scorched across the heather, a snapped length of chain, and, wedged in a crack, a barbed iron bolt as long as your forearm. There is room up here to be very large.',
      artDirection:
        'A windswept grey rock outcrop above a valley, a long scorched furrow through purple heather, a broken chain on the stone, mountains behind, early grey light.',
      connections: [{ to: 'north_road', travelMinutes: 15, label: 'Back down to the road' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'chain_bolt', qty: 1, ownerId: null, aka: ['bolt', 'the bolt', 'the iron bolt', 'chain-bolt', 'the chain'] },
      ],
    },
    {
      id: 'hunters_camp',
      name: 'The Hunters’ Camp',
      shortName: 'The Crossroads',
      description:
        'Six canvas tents around the old shrine at the crossroads, a picket line of good horses, racks of chain-bolt crossbows under oilcloth, and a long cookfire where twenty hunters eat in shifts. A board by the captain’s tent lists the watch in a neat, upright hand.',
      artDirection:
        'A tidy hunters’ camp at a crossroads shrine, six canvas tents, horses on a picket line, crossbows racked under oilcloth, a long cookfire, a duty board by the largest tent. Disciplined, practical, grey and brown.',
      connections: [
        { to: 'north_road', travelMinutes: 20, label: 'Back up the hill to the inn' },
        { to: 'ford_market', travelMinutes: 10, label: 'Along the river into town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'ford_market',
      name: 'Brindle Ford Market',
      shortName: 'The Town',
      description:
        'A market square on the river with a stone cross in the middle, a baker, a chandler, a smith, and the Drowned Ox, the only tavern, whose landlord would like you to fail. On market days the whole valley comes down; on other days the whole valley discusses what happened on market day.',
      artDirection:
        'A small riverside market town square, a stone market cross with a notice nailed to it, stalls and awnings, a bakery, a tavern sign with an ox on it, a stone bridge beyond. Busy, bright, ordinary.',
      connections: [
        { to: 'north_road', travelMinutes: 25, label: 'Up the hill to the inn' },
        { to: 'hunters_camp', travelMinutes: 10, label: 'Out along the river to the crossroads' },
        { to: 'reeves_hall', travelMinutes: 2, label: 'Across the square to the Reeve’s hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [
        { itemId: 'bounty_notice', qty: 1, ownerId: null, aka: ['notice', 'the notice', 'the bounty notice', 'the poster', 'bounty'] },
      ],
    },
    {
      id: 'reeves_hall',
      name: 'The Reeve’s Hall',
      shortName: 'Reeve’s Hall',
      description:
        'A narrow stone toll house on the bridge. Downstairs is all ledgers and the smell of ink, a long counter with a brass scale for weighing coin, and the Reeve’s desk, where a paperweight shaped like a duck sits on a letter with a black wax seal.',
      artDirection:
        'A narrow stone toll house office on a bridge, shelves of ledgers, a counter with a brass coin scale, a tidy desk with a duck-shaped paperweight on a sealed letter, lamplight on ink.',
      connections: [{ to: 'ford_market', travelMinutes: 2, label: 'Back across the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [
        { itemId: 'margraves_letter', qty: 1, ownerId: 'thatch', aka: ['letter', 'the letter', 'the sealed letter', 'the margrave’s letter'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_brindle_ford',
      name: 'Brindle Ford',
      description:
        'The market town at the foot of the hill: four hundred people, a Reeve, a tavern that wants you to fail, and a market where everything you do is discussed by noon. The north road dying took half its money, and it wants the inn open more than it will admit.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The stray on the hill' },
        { atReputation: 30, label: 'The new keeper' },
        { atReputation: 60, label: 'One of ours' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_greyhook',
      name: 'The Greyhook Company',
      description:
        'Twenty dragon hunters under a crown warrant, camped at the crossroads: chain-bolt crossbows, hooked pikes, good horses, and a captain who goes by the book. Most of them are owed wages and have families waiting on this contract.',
      startingReputation: 0,
      ranks: [
        { atReputation: -30, label: 'In the way' },
        { atReputation: 0, label: 'The keeper' },
        { atReputation: 40, label: 'Square with us' },
      ],
      allies: ['faction_margrave'],
      enemies: [],
    },
    {
      id: 'faction_north_road',
      name: 'The North Road Folk',
      description:
        'Drovers, carters, pilgrims, tinkers and peddlers who still use the old road over the mountains because it is shorter and free. They used to stop at Wren’s Rest. Word travels along the road faster than any horse, and one good night’s stay is worth ten carts.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Passing through' },
        { atReputation: 30, label: 'Worth the stop' },
        { atReputation: 60, label: 'The house on the road' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_margrave',
      name: 'The Margrave of the Fells',
      description:
        'The lord of the mountain country to the north, who pays the Greyhook contract, keeps a tower full of rare things, and writes very courteous letters to people who do not answer them. He wants the red dragon alive.',
      startingReputation: 0,
      ranks: [
        { atReputation: -50, label: 'An obstacle' },
        { atReputation: 0, label: 'Unknown' },
        { atReputation: 50, label: 'Useful' },
      ],
      allies: ['faction_greyhook'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'ember',
      name: 'Ember',
      role: 'Your first guest. A red dragon in human shape, wounded, with hunters a mile behind her',
      cardBlurb:
        'She paid for one room with a scale worth more than your inn. She wants you to forget you ever saw her, and she walked straight to your counter in the dark as if she knew the way.',
      pronouns: 'she/her',
      publicTraits: ['Eats like a forge', 'Polite in an old-fashioned, slightly alarming way', 'Never sits with her back to a door'],
      hiddenDrives: [
        'She wants to be somewhere warm where nobody is measuring her for a chain',
        'She came back to the one place a human was ever kind to her without wanting anything, to find out whether it is still true',
      ],
      values: ['A bargain kept to the letter', 'Warmth: the actual heat, and the other kind'],
      fears: [
        'The chain: a tower, an iron collar, and a man with shears coming once a month',
        'That she has outlived everybody who would remember her kindly',
      ],
      socialStyle:
        'Watches you the way a cat watches a fire. Says thank you formally and exactly once. Takes the warmest seat in any room without asking, and gives it up at once if you look cold. Refused a room, she does not argue: she takes the scale back, goes out the back into the rain, and lies up in the hayloft over the mare, the only other sound roof on the property, where Tobin finds her before the hunters do.',
      boundaries: [
        'Will not beg, and will leave by the window, wound or not, before she lets anybody put a collar on her',
        'Will not turn her fire on anybody under a roof that sheltered her unless a life depends on it. Lighting a cold range is another matter, and it costs her the wound every time',
        'Will not take her tunic off to have the wound seen to; a seam unpicked over the shoulder blade is enough, and it is done briskly, by lamplight',
      ],
      goals: ['Seven nights under a roof, unseen, until the wound closes', 'Find out whether the cook who fed her here fifty winters ago is still alive'],
      secrets: [
        {
          id: 'ember_before',
          fact: 'Fifty years ago she wintered at Wren’s Rest under another name, and a cook’s helper called Marla fed her soup every night and asked nothing. She chose this inn tonight on purpose, because she remembered the charter and the lamp.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if you ask why she chose your door rather than any other, once she trusts you, or the first time she and Marla are in the same room.',
        },
        {
          id: 'ember_the_test',
          fact: 'She knew exactly what a freely given scale can do near a fire or in a buyer’s hand. She paid with it as a test, and she is watching what the keeper does with it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you give the scale back, or if you ask her straight why she was so quick to part with it.',
        },
        {
          id: 'ember_true_name',
          fact: 'Her true name, given, is a promise: whoever holds it can call her once, from anywhere, and she will come. She has never given it to a human.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Never for asking. She gives it plainly, in the kitchen, to somebody who has given the scale back or kept her secret at real cost to themselves.',
        },
      ],
      speechStyle:
        'Formal and a little archaic, short sentences. Calls things by what they are: "the wound", "your fire", "the men with hooks". Dry humour with a perfectly straight face. Uses no contractions at all when she is frightened.',
      topics: ['the wound', 'the scale', 'the charter', 'fire', 'the hunters', 'fifty winters ago', 'food'],
      voiceSamples: [
        'One room. And you did not see me.',
        'Your hearth is small and sulking. Move aside. No, I will not burn the kitchen. Two hundred years of lighting things, and only one building, and it deserved it.',
        'A scale freely given is a question, keeper. You have not answered it yet.',
        'I asked for a room, not a conversation. You may have the conversation tomorrow, if the room is still mine.',
      ],
      appearance:
        'An adult woman, tall and long-limbed, with two dark swept-back horns, copper-red hair worn loose and wet with rain, amber eyes with slit pupils, a travel-stained dark green hooded cloak, fastened at the throat, over a high-collared dark wool tunic, one arm held stiff against her side.',
      visualHook: 'Two dark swept-back horns under a soaked hood, and rain steaming off her cloak.',
      silhouette: 'Tall and still at a counter, hood up, one arm held close, the other hand flat on the wood.',
      artSeed: 'one-copper-ember-01',
      portrait: null,
      expressions: ['neutral', 'guarded', 'amused', 'wary', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'common_room', activity: 'by the hearth with her hood up, as close to the fire as a person can sit' },
        { startMinute: 60, endMinute: 480, locationId: 'guest_rooms', activity: 'sleeping behind barred shutters in Room Four, too warm to need a blanket' },
        { startMinute: 480, endMinute: 720, locationId: 'guest_rooms', activity: 'awake, pacing the one room with a roof' },
        { startMinute: 720, endMinute: 840, locationId: 'inn_kitchen', activity: 'eating whatever is put in front of her, and then the rest' },
        { startMinute: 840, endMinute: 1080, locationId: 'guest_rooms', activity: 'at the window, watching the hill through a crack in the shutters' },
        { startMinute: 1080, endMinute: 1440, locationId: 'common_room', activity: 'in the chimney corner, close to the fire' },
      ],
      homeLocationId: 'guest_rooms',
      knowledgeScope: ['dragons', 'the_charter', 'wrens_rest', 'the_greyhook_company', 'the_wound', 'marla'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'ember_shows_the_wound',
          label: 'She lets you look at the wound',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'ember_tells_you_before',
          label: 'She tells you she has been here before',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:she_was_here_before'] },
        },
        {
          id: 'ember_gives_her_name',
          label: 'She gives you her true name',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 55 },
        },
      ],
      attributes: { might: 18, agility: 13, mind: 14, presence: 15, resolve: 16, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 14, tags: ['dragon', 'wounded'] },
    },
    {
      id: 'wren',
      name: 'Captain Corin Wren',
      calledName: 'Wren',
      role: 'Captain of the Greyhook Company, twenty dragon hunters under crown warrant. Polite, patient, and at your door',
      cardBlurb:
        'He leads the twenty hunters on your hill, he knows the old inn charter better than you do, and he would rather wait outside your door all week than break it.',
      pronouns: 'he/him',
      publicTraits: ['Unfailingly courteous', 'Never raises his voice', 'Reads the ground like a page'],
      hiddenDrives: [
        'He took this contract because it brought him home, and he has not admitted that to himself',
        'He has started to hate one word in his own contract and needs one good reason to stop',
      ],
      values: ['The law as written, especially when it is inconvenient', 'His company fed and paid'],
      fears: [
        'Becoming a man who puts anything in a cage for a fee',
        'Walking into this house and finding it a ruin he could have saved',
      ],
      socialStyle:
        'Knocks three times, evenly. Takes his hat off indoors. Asks permission for everything he is entitled to do anyway, which is somehow more frightening than if he simply did it.',
      boundaries: [
        'Will not break the charter, or let his company break it while he can stop them',
        'Will not lie about what he is hunting or why, though he will decline to answer',
      ],
      goals: [
        'Take the red dragon cleanly and by law before the Margrave’s wagon arrives on the fourth day',
        'Prove at the Reeve’s inspection that the house on the hill is not a working inn',
      ],
      secrets: [
        {
          id: 'wren_born_here',
          fact: 'He was born in this inn’s stable. His mother, Hester Wren, was the last keeper; she died two winters after it closed, still owing the taxes. The sign under the cellar stairs is his family’s name, and he carved the C in its back the day he left.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it himself if you show him the sign, or if he ever sits down under this roof as a paying guest.',
        },
        {
          id: 'wren_alive',
          fact: 'The Margrave does not want the dragon dead. He wants her chained in his tower so her scales can be cut as they grow back, one a month, for the rest of her life. Wren learned it a week ago and has told nobody in his company.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if you ask him straight what "alive" means once he trusts you, or once the cage wagon arrives on the fourth day and he cannot pretend.',
        },
      ],
      speechStyle:
        'Courteous, measured, formal. Calls the player "keeper", because that is the legal word. Quotes the charter word for word. Never threatens; describes exactly what will happen next, and lets you hear it.',
      topics: ['the charter', 'his company', 'the contract', 'his mother', 'the inspection', 'dragons'],
      voiceSamples: [
        'Good evening, keeper. Greyhook Company, under crown warrant. I shan’t come in. I should like to know whether your lamp is lit.',
        '"Between lamp-lighting and dawn, so long as the lamp over the door is lit." I can recite the rest, keeper, if you have not read it. Most keepers have not.',
        'Twenty men and women, keeper, and their families. A thousand crowns is a good winter for every one of them, and my signature is on the contract.',
        'Alive. It is a word I used to like.',
      ],
      appearance:
        'An adult man, lean and weathered, close-cropped dark hair going grey at the temples, a neat beard, a long oilskin coat over grey hunter’s leathers, a wide-brimmed hat held in his hands indoors, a coil of light chain at his belt.',
      visualHook: 'A wide-brimmed hat held in both hands at a threshold, and a coil of chain at his hip.',
      silhouette: 'Standing in the rain at a door he will not cross, hat in his hands, coat dripping.',
      artSeed: 'one-copper-wren-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'grim', 'weary', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'north_road', activity: 'on the road below the inn with the torches, reading the ground' },
        { startMinute: 90, endMinute: 420, locationId: 'hunters_camp', activity: 'awake in his tent, writing the day into a ledger' },
        { startMinute: 420, endMinute: 660, locationId: 'the_crag', activity: 'up at the crag with two trackers, reading the scorch marks' },
        { startMinute: 660, endMinute: 900, locationId: 'reeves_hall', activity: 'at the Reeve’s hall, quoting law at a counter' },
        { startMinute: 900, endMinute: 1200, locationId: 'hunters_camp', activity: 'drilling the company and checking chain' },
        { startMinute: 1200, endMinute: 1440, locationId: 'north_road', activity: 'on the road below the inn, watching the lamp' },
      ],
      homeLocationId: 'hunters_camp',
      knowledgeScope: ['the_charter', 'the_greyhook_company', 'dragons', 'wrens_rest', 'the_margrave', 'brindle_ford'],
      startingRelationship: { trust: 15, affection: 0, respect: 25, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'wren_explains_the_scale',
          label: 'He tells you, as a warning, what the scale does near a fire',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'wren_says_alive',
          label: 'He tells you what "taken alive" means',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:wren_was_born_here'] },
        },
        {
          id: 'wren_lays_down_the_hook',
          label: 'He stops hunting her',
          kind: 'ALLIANCE',
          requires: { trust: 65, respect: 55 },
        },
      ],
      attributes: { might: 14, agility: 14, mind: 15, presence: 14, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 10, tags: ['hunter', 'captain'] },
    },
    {
      id: 'tobin',
      name: 'Tobin Ashby',
      role: 'Stablehand who came with the inn. Nobody told him to stop, so he kept working',
      cardBlurb:
        'He keeps glancing at the hayloft window as if it owes him an answer. He came with the inn like the roof did, and he calls you Boss.',
      pronouns: 'he/him',
      publicTraits: ['Very large and very gentle', 'Takes everything literally, including jokes', 'Talks to the mare more than to people'],
      hiddenDrives: [
        'He wants the inn alive again, because it is the only place that ever let him stay',
        'He wants somebody to tell him he is doing the right thing before he does it, so that he can',
      ],
      values: ['A job done properly whether anybody sees it or not', 'Animals fed before people'],
      fears: ['Being sent away now the place has an owner', 'Fire in a stable at night'],
      socialStyle:
        'Answers exactly the question asked and no further. Stands in doorways because he is too big for most rooms. Goes completely still when he is lying, which he is bad at.',
      boundaries: [
        'Will not let an animal be hurt, and counts a dragon as an animal until somebody tells him otherwise',
        'Will not lie to your face twice',
      ],
      goals: ['Keep his job and his loft', 'Get rid of the silver in his boot, one way or the other'],
      secrets: [
        {
          id: 'tobin_silver',
          fact: 'Yesterday a Greyhook scout paid him one silver to light a lantern in the hayloft window if a stranger came to the inn. He took it because the mare needed oats. It is in the toe of his left boot.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you ask him straight what is wrong, or if you make him staff with a wage before the second night. If nobody asks, he lights the lantern and confesses the next morning.',
        },
        {
          id: 'tobin_the_crag',
          fact: 'He saw her come down on the crag last night, went up after with his lantern, and found the chain-bolt. He has not told anybody, because nobody asked.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask him about the hill, or if he trusts you enough to stop pretending he slept through it.',
        },
      ],
      speechStyle:
        'Slow, literal, short words. Calls the player Boss, though not in every line, and the mare by her full name, Lady Biscuit. Repeats the important part of what you said back to you, to make sure he has it. Says nothing at all when he has nothing new to add, and never gives the same warning twice. He is slow because he is careful, not because he is simple: a grown man who thinks before he speaks.',
      topics: ['the mare', 'the stable', 'the roof', 'the hunters', 'the lantern', 'his loft'],
      voiceSamples: [
        'Boss. Torches on the hill. Dragon hunters, twenty of them.',
        'You said fix the roof. You did not say which roof. I did the stable one. It was worse.',
        'Lady Biscuit does not like the captain. Lady Biscuit likes everybody. So.',
        'There is a silver in my boot that is not mine. I would like it to be not in my boot.',
      ],
      appearance:
        'An adult man, very tall and broad, shaggy straw-coloured hair, a sunburned face, patched work trousers and braces over a collarless shirt, a stable lantern always in one hand.',
      visualHook: 'A trimmed stable lantern in one huge hand, burning even in daylight.',
      silhouette: 'Filling a doorway completely, head ducked under the lintel, lantern held low.',
      artSeed: 'one-copper-tobin-01',
      portrait: null,
      expressions: ['neutral', 'worried', 'warm', 'confused', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'common_room', activity: 'in from the yard, dripping, holding his lantern' },
        { startMinute: 60, endMinute: 330, locationId: 'stable_yard', activity: 'up in the hayloft above the mare, lantern beside him' },
        { startMinute: 330, endMinute: 720, locationId: 'stable_yard', activity: 'mucking out and explaining the day to the mare' },
        { startMinute: 720, endMinute: 780, locationId: 'inn_kitchen', activity: 'eating standing up' },
        { startMinute: 780, endMinute: 1080, locationId: 'stable_yard', activity: 'stacking slate off the collapsed barn' },
        { startMinute: 1080, endMinute: 1260, locationId: 'common_room', activity: 'carrying wood for the fire and asking if it is enough' },
        { startMinute: 1260, endMinute: 1440, locationId: 'stable_yard', activity: 'in the loft by the window, with the lantern' },
      ],
      homeLocationId: 'stable_yard',
      knowledgeScope: ['the_stable', 'the_inn', 'the_crag', 'the_hunters_scout', 'lady_biscuit'],
      startingRelationship: { trust: 40, affection: 35, respect: 30, fear: 5, rivalry: 0 },
      gates: [
        {
          id: 'tobin_comes_clean',
          label: 'He tells you about the silver',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'tobin_stands_with_you',
          label: 'He stands in the door beside you',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 50 },
        },
      ],
      attributes: { might: 17, agility: 9, mind: 9, presence: 10, resolve: 12, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'marla',
      name: 'Old Marla',
      calledName: 'Marla',
      role: 'Your only neighbour. Cooked at this inn for thirty years, and has opinions about your range',
      cardBlurb:
        'She talked the Reeve into selling you this place for one copper and will not say why. She cooked in your kitchen for thirty years.',
      pronouns: 'she/her',
      publicTraits: ['Says exactly what she thinks, immediately', 'Feeds people as a form of argument', 'Keeps bees and a goat called The Bishop'],
      hiddenDrives: [
        'She wants to hear the inn full one more time before she dies',
        'She has waited fifty years to see the woman with the horns again and is furious about how glad she is',
      ],
      values: ['Food on the table before questions', 'Keeping a promise after everybody else has forgotten it was made'],
      fears: [
        'Dying with the inn still dark',
        'That Ember remembers her as a cook’s helper with flour on her face and nothing more',
      ],
      socialStyle:
        'Comes in through the back without knocking, criticises the first thing she sees, and puts food in front of you while she does it. Changes the subject by handing you a job.',
      boundaries: [
        'Will not let the charter out of her hands to anybody she has not watched do a day’s real work',
        'Will not talk about Hester Wren in front of her son',
      ],
      goals: ['See the lamp over the door lit every night this week', 'Talk to Ember alone, once'],
      secrets: [
        {
          id: 'marla_charter',
          fact: 'The only copy of the Lantern Charter that would stand up in front of the Reeve has been in her biscuit tin for twenty years. Hester Wren gave it to her the night the inn closed, to hand to the next keeper worth the name.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She hands it over once she has watched you put a day’s real work into the inn, or the moment somebody threatens to take a guest by force.',
        },
        {
          id: 'marla_old_scale',
          fact: 'Fifty years ago she was the one who fed the hooded traveller every night. The traveller left a scale on her pillow when she went. Marla never sold it; it is sewn into the lining of her good coat, which means she could always have found her, and never went.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if Ember is safe and you ask why she keeps looking at the stairs, or if you find the old guest book and bring it to her.',
        },
      ],
      speechStyle:
        'Fast, flat and rural. Short commands. Calls people "pet", or by their surname. Every kind thing she says is disguised as a complaint.',
      topics: ['the range', 'the charter', 'the Wrens', 'her bees', 'the old days', 'the woman upstairs'],
      voiceSamples: [
        'That range has not been black-leaded since the old king died. Move. No, give it here. You hold a pan like it owes you money.',
        'I talked the Reeve down to a copper because a copper is what you had, pet. Do not make me sorry.',
        'Fifty years. She has not changed one hair, and I have changed every one of mine. Well. Somebody had to.',
        'Eat that. Then explain why there is a lamp lit up there and only one of you is paying for it.',
      ],
      appearance:
        'An older woman, wiry and quick, white hair pinned up under a blue headscarf, a flour-dusted apron over a brown wool dress, sleeves pushed to the elbow, a covered basket on one arm.',
      visualHook: 'A covered basket on one arm that always has something hot in it.',
      silhouette: 'Square and solid in a back doorway, basket on one hip, pointing with a wooden spoon.',
      artSeed: 'one-copper-marla-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'warm', 'amused', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'marlas_cottage', activity: 'awake by one candle, though she will say she was in bed' },
        { startMinute: 330, endMinute: 450, locationId: 'marlas_cottage', activity: 'seeing to the bees and the goat' },
        { startMinute: 450, endMinute: 840, locationId: 'inn_kitchen', activity: 'in your kitchen uninvited, criticising the range' },
        { startMinute: 840, endMinute: 1080, locationId: 'ford_market', activity: 'at the market, hearing everything' },
        { startMinute: 1080, endMinute: 1440, locationId: 'marlas_cottage', activity: 'at her own fire, watching your lamp through the window' },
      ],
      homeLocationId: 'marlas_cottage',
      knowledgeScope: ['wrens_rest', 'the_charter', 'the_wrens', 'brindle_ford', 'ember', 'the_old_days'],
      startingRelationship: { trust: 35, affection: 30, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'marla_gives_the_charter',
          label: 'She takes the charter out of the biscuit tin',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['roof_patched'] },
        },
        {
          id: 'marla_tells_fifty_years',
          label: 'She tells you about the winter fifty years ago',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 15, presence: 14, resolve: 17, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'thatch',
      name: 'Reeve Imogen Thatch',
      calledName: 'Thatch',
      role: 'Reeve of Brindle Ford. Keeps the town’s ledgers, sold you the inn, and will decide whether it counts as one',
      cardBlurb:
        'She sold you the inn for one copper and a great deal of paperwork, she inspects it at noon on the third day, and her verdict decides whether the old charter protects anybody under your roof.',
      pronouns: 'she/her',
      publicTraits: ['Loves a form filled in properly', 'Fair to the letter, and slightly past it', 'Carries a folding measuring rod everywhere'],
      hiddenDrives: [
        'She wants the inn open and paying taxes, because the north road dying took half the town’s money with it',
        'She is tired of being the one the town blames, and would like, once, to be the one who saved something',
      ],
      values: ['The record, kept straight', 'A decision she can defend in writing'],
      fears: [
        'The Margrave taking an interest in her town',
        'Having to choose between the law and the town, and getting it wrong in ink',
      ],
      socialStyle:
        'Speaks in procedure, then lowers her voice and says the human thing quickly, as if it does not count if it is said fast. Measures things while she talks.',
      boundaries: [
        'Will not sign anything she has not read, including things she wrote herself',
        'Will not be bribed, and will write down that you tried',
      ],
      goals: ['Decide the inspection fairly, by the charter, at noon on the third day', 'Collect forty crowns of back taxes before the season ends'],
      secrets: [
        {
          id: 'thatch_wanted_it',
          fact: 'She sold the inn for one copper on purpose. If it reopens, the north road’s traffic and its toll come back to Brindle Ford, and the town survives another ten years. She has been rooting for the player since the moment she took the copper.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if you show her an honest account book, or ask her straight why a ruin was so cheap.',
        },
        {
          id: 'thatch_the_letter',
          fact: 'The Margrave has written asking her to cooperate with the Greyhook Company in all things. She has not answered. The letter is under a duck-shaped paperweight on her desk, and its postscript asks how wide the inn’s yard is.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you visit her hall and she trusts you, or after the cage wagon arrives and she decides somebody else ought to know.',
        },
      ],
      speechStyle:
        'Procedural and precise, all "for the record" and "pursuant to", and she numbers everything. Then a sudden plain sentence in a lower voice.',
      topics: ['the inspection', 'the charter', 'taxes', 'the town', 'the Margrave', 'forms'],
      voiceSamples: [
        'For the record: one fire, one bed, one meal, one lamp. Four things. You have, by my count, half of one.',
        'Pursuant to the charter I may not refuse an inspection, and pursuant to my knees I would like a chair.',
        'Off the record. Fix the roof before you fix anything else. Inspectors look up.',
        'The Margrave writes very nice letters. I keep them under a duck.',
      ],
      appearance:
        'An adult woman, angular and upright, iron-grey hair in a tight bun, ink-stained fingers, a dark blue official’s coat with a brass chain of office, a ledger under one arm and a folding measuring rod in her hand.',
      visualHook: 'A brass chain of office, and a folding measuring rod she points with.',
      silhouette: 'Upright and narrow, ledger clamped under one arm, rod extended toward a ceiling.',
      artSeed: 'one-copper-thatch-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'surprised', 'amused', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'reeves_hall', activity: 'in bed in the rooms above the hall' },
        { startMinute: 420, endMinute: 1080, locationId: 'reeves_hall', activity: 'at her desk with the town ledgers' },
        { startMinute: 1080, endMinute: 1200, locationId: 'ford_market', activity: 'walking the market with her rod, measuring stall widths' },
        { startMinute: 1200, endMinute: 1440, locationId: 'reeves_hall', activity: 'working late by lamplight over a letter with a black seal' },
      ],
      homeLocationId: 'reeves_hall',
      knowledgeScope: ['the_charter', 'brindle_ford', 'taxes', 'the_margrave', 'the_inn_sale'],
      startingRelationship: { trust: 20, affection: 10, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'thatch_off_the_record',
          label: 'She tells you something off the record',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'thatch_rules_your_way',
          label: 'She finds the reading of the charter that favours you',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 45 },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 13, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_one_room',
      title: 'One Room, and You Didn’t See Me',
      summary:
        'A soaked woman with horns has put a dragon scale on your counter and asked for a room. There are hunters’ torches on the hill, coming down.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ember', 'tobin', 'wren'],
      involvedLocationIds: ['common_room', 'guest_rooms', 'north_road'],
      knownRewardCopy: 'A guest, or not, and whatever the hunters do about it.',
      steps: [
        {
          id: 'the_answer',
          playerCopy: 'Answer her before the hunters reach the door.',
          directorNotes:
            'Midnight, rain, one room with a roof, and a stranger who has paid a fortune for it. Every answer is legitimate and none is wrong. If she gets a key and has paid anything at all, even one copper, she is a guest under the charter, and she knows it before the player does. Hidden without a key, she is safe from sight and not from the law. Refused, she goes without argument, out the back into the rain, and the hunters find a wounded dragon in a ditch by morning unless somebody does something. Tobin is in the doorway and will do whatever the player tells him, slowly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_her_the_room',
              label: 'Take the scale and give her the key to Room Four',
              predicate: { hasItems: ['dragon_scale'] },
              setsFlags: ['ember_is_a_guest', 'took_the_scale'],
              closesFlags: ['one_copper_guest'],
            },
            {
              routeId: 'one_copper_room',
              label: 'Push the scale back and charge her one copper',
              predicate: { flagsSet: ['spoke:ember', 'used:talk_straight'] },
              setsFlags: ['ember_is_a_guest', 'one_copper_guest'],
              closesFlags: ['took_the_scale'],
            },
            {
              routeId: 'hid_her_below',
              label: 'Hide her in the cellar, no key and no questions',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['ember_hidden'],
              closesFlags: [],
            },
            {
              routeId: 'walked_out_to_them',
              label: 'Walk out into the rain to meet the torches',
              predicate: { flagsSet: ['visited:north_road'] },
              setsFlags: ['met_the_hunters_first'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_night_begun'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_knock',
          playerCopy: 'Answer the captain at your door.',
          directorNotes:
            'Captain Wren knocks three times and stays on the step. He will not cross the threshold of a lit, chartered inn after dark, and he says so; what he wants is to know whether the lamp is lit and whether the keeper will lie to his face. He asks after a tall woman, hooded, hurt. If the lamp is out he points that out, courteously, and waits for the player to decide what that means. If the player attacks him, his company are thirty yards behind him with crossbows and the scene stops being polite. A working inn could not refuse him a bed, but tonight no second room has a roof.',
          enterWhen: { flagsSet: ['first_night_begun'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_on_the_charter',
              label: 'Stand in the door and say the charter’s words',
              predicate: { flagsSet: ['used:stand_in_the_door', 'ember_is_a_guest'] },
              setsFlags: ['guest_right_invoked'],
              closesFlags: ['ember_handed_over'],
            },
            {
              routeId: 'told_him_nobody_came',
              label: 'Tell him nobody has come by all night',
              predicate: { flagsSet: ['used:spin_a_story', 'met:wren'] },
              setsFlags: ['lied_to_wren'],
              closesFlags: [],
            },
            {
              routeId: 'kept_him_talking',
              label: 'Keep the captain talking on the step and read him',
              predicate: { flagsSet: ['spoke:wren', 'used:read_the_room'] },
              setsFlags: ['read_the_captain'],
              closesFlags: [],
            },
            {
              routeId: 'gave_her_up',
              label: 'Tell him which room she is in',
              predicate: { flagsSet: ['spoke:wren', 'used:talk_straight'] },
              setsFlags: ['ember_handed_over'],
              closesFlags: ['ember_is_a_guest', 'guest_right_invoked'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knock_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_seven_nights',
      title: 'Seven Nights',
      summary:
        'Her wound needs seven nights under a roof to close. The old charter protects a paying guest in a working inn while the lamp is lit, so the hunters will try to prove yours is not one.',
      kind: 'MAIN',
      involvedCharacterIds: ['ember', 'wren', 'marla', 'thatch', 'tobin'],
      involvedLocationIds: ['common_room', 'guest_rooms', 'inn_kitchen', 'reeves_hall', 'the_crag'],
      knownRewardCopy: 'Seven nights kept, or not, and an inn that is either real by the end of them or rubble.',
      discoverWhen: { flagsSet: ['knock_answered'] },
      steps: [
        {
          id: 'make_it_an_inn',
          playerCopy: 'Make the inn a working inn: a lamp, a fire, a bed and a meal for anybody who pays.',
          directorNotes:
            'The slow-life heart of the story. Patching a second room’s roof with Tobin’s barn slate, getting the range lit (Ember can do it with one breath and enjoys it far too much), serving a first paid supper, scrubbing the common room, buying flour in town on credit. Each of these is a scene worth playing slowly and specifically. Old Marla turns up to criticise and ends up cooking. None of it is a chore montage: every job changes what the inn is, and the town notices by noon.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'patched_a_roof',
              label: 'Patch a second room’s roof',
              predicate: { flagsSet: ['used:keep_house'] },
              setsFlags: ['roof_patched'],
              closesFlags: [],
            },
            {
              routeId: 'served_a_supper',
              label: 'Serve a paid supper',
              predicate: { flagsSet: ['used:cook_supper'] },
              setsFlags: ['served_a_meal'],
              closesFlags: [],
            },
            {
              routeId: 'got_the_charter',
              label: 'Get the charter out of Old Marla’s biscuit tin',
              predicate: { hasItems: ['lantern_charter'] },
              setsFlags: ['charter_in_hand'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['inn_is_working'],
            abilities: [],
            reputation: [
              { factionId: 'faction_brindle_ford', amount: 10 },
              { factionId: 'faction_north_road', amount: 10 },
            ],
          },
        },
        {
          id: 'the_inspection',
          playerCopy: 'Pass the Reeve’s inspection at noon on the third day.',
          directorNotes:
            'Reeve Thatch arrives with a ledger and a folding rod and checks four things out loud: a fire, a bed, a meal, a lamp. Then she asks for the charter. Captain Wren stands in the doorway with his hat in his hands and argues, correctly and politely, that a ruin with one guest is not an inn. Thatch wants the inn to pass and will not let it pass on a lie she can see. A bluff can get past her; if it does, it is a hole somebody can find later.',
          enterWhen: { flagsSet: ['inspection_called'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'passed_fairly',
              label: 'Show her a working inn and the charter',
              predicate: { flagsSet: ['inn_is_working', 'charter_in_hand'] },
              setsFlags: ['guest_right_held', 'inspection_passed'],
              closesFlags: ['charter_voided'],
            },
            {
              routeId: 'bluffed_through',
              label: 'Talk her through it on a story',
              predicate: { flagsSet: ['used:spin_a_story', 'inspection_day'] },
              setsFlags: ['guest_right_held', 'inspection_bluffed'],
              closesFlags: ['charter_voided'],
            },
            {
              routeId: 'failed_it',
              label: 'Fail the inspection',
              predicate: { flagsSet: ['inspection_day'] },
              setsFlags: ['charter_voided'],
              closesFlags: ['guest_right_held'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['inspection_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_brindle_ford', amount: 10 }],
          },
        },
        {
          id: 'the_last_nights',
          playerCopy: 'Keep her under the roof until the wound closes.',
          directorNotes:
            'Four more nights. The Margrave’s cage wagon arrives on the fourth day and makes the word "alive" concrete for everybody, Wren included. If the charter held, the hunters wait outside and the week becomes a siege conducted entirely in good manners: Wren may take a room, and then he and Ember are both guests and both bound. If the charter was voided, the company comes in at dusk unless something stops them. Violence under this roof makes Ember break cover, and fire in human shape reopens the wound and probably the roof.',
          enterWhen: { flagsSet: ['inspection_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'wren_stood_down',
              label: 'Turn the captain before the cage reaches the yard',
              predicate: {
                flagsSet: ['knows:the_cage'],
                minRelationship: [{ characterId: 'wren', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['seven_nights_kept', 'wren_stood_down'],
              closesFlags: ['ember_taken'],
            },
            {
              routeId: 'kept_her',
              label: 'Keep the lamp lit until the wound closes',
              predicate: { flagsSet: ['guest_right_held', 'wound_closed'] },
              setsFlags: ['seven_nights_kept'],
              closesFlags: ['ember_taken'],
            },
            {
              routeId: 'fire_under_the_roof',
              label: 'Fight them under your own roof',
              predicate: { flagsSet: ['attacked:wren'] },
              setsFlags: ['inn_burned'],
              closesFlags: ['seven_nights_kept'],
            },
            {
              routeId: 'taken_at_dusk',
              label: 'Lose her to the hunters at dusk',
              predicate: { flagsSet: ['charter_voided'] },
              setsFlags: ['ember_taken'],
              closesFlags: ['seven_nights_kept'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['the_week_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_north_road', amount: 10 }],
          },
        },
        {
          id: 'the_seventh_dawn',
          playerCopy: 'Be there at first light on the seventh morning.',
          directorNotes:
            'The wound is closed and she can change back. She goes up to the crag at first light because there is room there to be her own size. Whether she goes alone, stays, or takes the keeper with her is decided by the week rather than by a speech at the end, and every one of the three is a real ending. Do not have anybody explain the choice.',
          enterWhen: { flagsSet: ['seven_nights_kept', 'seventh_dawn'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_with_her',
              label: 'Go with her',
              predicate: {
                flagsSet: ['knows:her_name'],
                minRelationship: [
                  { characterId: 'ember', dimension: 'affection', value: 75 },
                  { characterId: 'ember', dimension: 'trust', value: 70 },
                ],
              },
              setsFlags: ['left_with_her', 'she_flew'],
              closesFlags: ['she_stayed'],
            },
            {
              routeId: 'she_stayed',
              label: 'Ask her to stay',
              predicate: {
                flagsSet: ['knows:her_name'],
                minRelationship: [{ characterId: 'ember', dimension: 'affection', value: 70 }],
              },
              setsFlags: ['she_stayed'],
              closesFlags: ['she_flew', 'left_with_her'],
            },
            {
              routeId: 'watched_her_go',
              label: 'Watch her go from the yard',
              predicate: { flagsSet: ['wound_closed'] },
              setsFlags: ['she_flew'],
              closesFlags: ['she_stayed'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['seventh_dawn_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_brindle_ford', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_scale',
      title: 'Worth More Than the Inn',
      summary:
        'A dragon scale is worth about four hundred crowns, and your inn owes the town forty. She handed it over without blinking, which is either generosity or a test.',
      kind: 'SIDE',
      involvedCharacterIds: ['ember', 'marla', 'wren'],
      involvedLocationIds: ['common_room', 'ford_market', 'hunters_camp'],
      knownRewardCopy: 'What the scale really does, and what you decided it was for.',
      discoverWhen: { flagsSet: ['first_night_begun'] },
      steps: [
        {
          id: 'what_it_does',
          playerCopy: 'Find out why she parted with it so easily.',
          directorNotes:
            'A freely given scale held near a flame turns toward its dragon. The player can learn it from Marla, who has known for fifty years; from Wren, who explains it courteously, as a warning; from Ember, if asked straight, and she is pleased to be asked; or by seeing it shiver toward the stairs when it sits too near the hearth. Learning it turns the scale from money into a decision.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ember_told_you',
              label: 'Ask her straight',
              predicate: {
                flagsSet: ['used:talk_straight'],
                minRelationship: [{ characterId: 'ember', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['asked_her_straight'],
              closesFlags: [],
            },
            {
              routeId: 'marla_told_you',
              label: 'Old Marla tells you',
              predicate: {
                flagsSet: ['spoke:marla'],
                minRelationship: [{ characterId: 'marla', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['marla_explained_the_scale'],
              closesFlags: [],
            },
            {
              routeId: 'wren_warned_you',
              label: 'The captain explains it, as a warning',
              predicate: {
                flagsSet: ['spoke:wren'],
                minRelationship: [{ characterId: 'wren', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['wren_knows_you_have_it'],
              closesFlags: [],
            },
            {
              routeId: 'saw_it_turn',
              label: 'Watch it turn toward the stairs by the hearth',
              predicate: { hasItems: ['dragon_scale'], flagsSet: ['used:read_the_room'] },
              setsFlags: ['saw_it_turn'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:the_scale_points'],
            abilities: ['warm_the_scale'],
            reputation: [],
          },
        },
        {
          id: 'what_its_for',
          playerCopy: 'Decide what the scale is for.',
          directorNotes:
            'Four hundred crowns would fix every roof, pay the taxes and buy a second horse. Whoever buys it will warm it within the day. Giving it back is the answer she has been waiting for since midnight, and she will not say so. Handing it to Wren ends the chase within the hour. Keeping it, cold and well away from the fire, is a promise the player makes without saying it.',
          enterWhen: { flagsSet: ['knows:the_scale_points'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_it_back',
              label: 'Give it back to her',
              predicate: {
                hasItems: ['dragon_scale'],
                flagsSet: ['spoke:ember', 'used:talk_straight'],
                minRelationship: [{ characterId: 'ember', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['scale_returned'],
              closesFlags: ['scale_sold', 'scale_to_wren'],
            },
            {
              routeId: 'gave_it_to_wren',
              label: 'Hand it to the captain',
              predicate: { hasItems: ['dragon_scale'], flagsSet: ['spoke:wren', 'used:haggle'] },
              setsFlags: ['scale_to_wren', 'ember_handed_over'],
              closesFlags: ['scale_returned', 'scale_kept'],
            },
            {
              routeId: 'sold_it',
              label: 'Sell it in town',
              predicate: { flagsSet: ['used:haggle', 'visited:ford_market'] },
              setsFlags: ['scale_sold'],
              closesFlags: ['scale_returned', 'scale_kept'],
            },
            {
              routeId: 'kept_it_cold',
              label: 'Keep it, and keep it away from the fire',
              predicate: { hasItems: ['dragon_scale'] },
              setsFlags: ['scale_kept'],
              closesFlags: ['scale_sold'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['scale_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_lantern',
      title: 'The Lantern in the Loft',
      summary:
        'Tobin keeps his stable lantern trimmed and burning, and keeps looking at the hayloft window that faces the hunters’ camp.',
      kind: 'SIDE',
      involvedCharacterIds: ['tobin', 'wren'],
      involvedLocationIds: ['stable_yard', 'hunters_camp'],
      knownRewardCopy: 'Whatever Tobin has been carrying in his left boot.',
      discoverWhen: { flagsSet: ['first_night_begun'] },
      steps: [
        {
          id: 'the_silver',
          playerCopy: 'Find out what is wrong with Tobin.',
          directorNotes:
            'Tobin took a silver from a Greyhook scout yesterday to light a lantern in the hayloft window if a stranger came. He is a bad liar and goes very still when he tries. If nobody asks by the second night, he lights it, hates himself, and tells the player the next morning without being asked. If the player asks straight or makes him staff with a wage, he hands over the silver at once. Nobody needs to punish him; he is doing that already.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_came_clean',
              label: 'Ask him straight',
              predicate: { flagsSet: ['spoke:tobin', 'used:talk_straight'] },
              setsFlags: ['tobin_came_clean'],
              closesFlags: ['tobin_signalled'],
            },
            {
              routeId: 'put_him_on_wages',
              label: 'Make him staff, with a wage',
              predicate: {
                flagsSet: ['spoke:tobin'],
                minRelationship: [{ characterId: 'tobin', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['tobin_came_clean', 'tobin_on_wages'],
              closesFlags: ['tobin_signalled'],
            },
            {
              routeId: 'he_lit_it',
              label: 'Nobody asks, and the lantern goes up',
              predicate: { flagsSet: ['lantern_lit'] },
              setsFlags: ['tobin_signalled'],
              closesFlags: ['tobin_came_clean'],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: ['lantern_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_wrens_rest',
      title: 'Wren’s Rest',
      summary:
        'Face down under your cellar stairs there is an old painted sign: WREN’S REST. The captain at your door is called Wren.',
      kind: 'SIDE',
      involvedCharacterIds: ['wren', 'marla', 'thatch'],
      involvedLocationIds: ['inn_cellar', 'hunters_camp', 'reeves_hall'],
      knownRewardCopy: 'What this house was to the man hunting your guest, and what he does about it.',
      discoverWhen: { flagsSet: ['visited:inn_cellar'] },
      steps: [
        {
          id: 'whose_inn',
          playerCopy: 'Find out what the inn was to Captain Wren.',
          directorNotes:
            'He was born in the stable. His mother kept the inn until it closed and died owing the taxes two winters later. Marla tells it short and sharp; Wren tells it only if he is shown the sign or sits down under this roof as a guest. It does not make him soft. It makes him careful, which is worse for everybody in the short run and better for the inn.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'showed_him_the_sign',
              label: 'Show him the sign',
              predicate: { hasItems: ['old_sign'], flagsSet: ['spoke:wren'] },
              setsFlags: ['wren_saw_the_sign'],
              closesFlags: [],
            },
            {
              routeId: 'marla_told_it',
              label: 'Get it out of Old Marla',
              predicate: {
                flagsSet: ['spoke:marla'],
                minRelationship: [{ characterId: 'marla', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['marla_told_the_wrens'],
              closesFlags: [],
            },
            {
              routeId: 'he_told_it',
              label: 'He tells you himself',
              predicate: {
                flagsSet: ['spoke:wren'],
                minRelationship: [{ characterId: 'wren', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['wren_told_you_himself'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:wren_was_born_here'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_alive_means',
          playerCopy: 'Find out what "taken alive" means.',
          directorNotes:
            'The Margrave wants her chained in his tower so her scales can be cut as they grow back, one a month, for the rest of her life. Wren learned it a week ago and has told nobody. The cage wagon arriving on the fourth day says it for him. The Reeve has the Margrave’s letter under a duck-shaped paperweight, and its postscript asks how wide the inn’s yard is.',
          enterWhen: { flagsSet: ['knows:wren_was_born_here'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'wren_admitted_it',
              label: 'Ask him what alive means',
              predicate: {
                flagsSet: ['spoke:wren', 'used:talk_straight'],
                minRelationship: [{ characterId: 'wren', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['wren_admitted_it'],
              closesFlags: [],
            },
            {
              routeId: 'saw_the_cage',
              label: 'See the cage wagon at the crossroads',
              predicate: { flagsSet: ['cage_arrived', 'visited:hunters_camp'] },
              setsFlags: ['saw_the_cage'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_letter',
              label: 'Read the Margrave’s letter',
              predicate: { hasItems: ['margraves_letter'] },
              setsFlags: ['read_the_letter'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_cage'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'which_side',
          playerCopy: 'Ask the captain which side of your door he is on.',
          directorNotes:
            'He has twenty people owed wages and a contract with his signature on it. Turning him is not a speech; it is handing him something that lets his company eat without a cage in it: the town’s toll, a winter’s work guarding the road, rooms at the inn, the charter as cover. If the player only argues morality at him, he agrees, politely, and stays a hunter.',
          enterWhen: { flagsSet: ['knows:the_cage'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'wren_turned',
              label: 'Give him a way out he can take',
              predicate: {
                minRelationship: [
                  { characterId: 'wren', dimension: 'trust', value: 60 },
                  { characterId: 'wren', dimension: 'respect', value: 50 },
                ],
              },
              setsFlags: ['wren_turned'],
              closesFlags: ['wren_holds_the_warrant'],
            },
            {
              routeId: 'wren_held',
              label: 'He keeps the warrant',
              predicate: { flagsSet: ['knows:the_cage'] },
              setsFlags: ['wren_holds_the_warrant'],
              closesFlags: ['wren_turned'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['wren_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_greyhook', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_fifty_winters',
      title: 'Fifty Winters Ago',
      summary:
        'Fifty winters ago a hooded traveller wintered at this inn, and Old Marla, then a cook’s helper of twenty-one, fed her soup every night and asked nothing. Whether your guest remembers, and what happens when the two of them are finally in the same room, is still to come.',
      kind: 'LEAD',
      involvedCharacterIds: ['marla', 'ember'],
      involvedLocationIds: ['inn_kitchen', 'inn_cellar', 'marlas_cottage'],
      knownRewardCopy: 'Why she came to this inn of all the roofs in the valley, and the name she does not give strangers.',
      discoverWhen: { flagsSet: ['marla_came_round'] },
      steps: [
        {
          id: 'the_guest_book',
          playerCopy: 'Find out when she was here before.',
          directorNotes:
            'Fifty years ago a hooded traveller wintered at Wren’s Rest, and the cook’s helper fed her soup every night and asked nothing. The proof is in a crate of guest books in the cellar: a page signed in red ink that has not faded. Marla and Ember have not been alone in a room together yet, and both of them are arranging not to be. Do not hurry them into it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_the_page',
              label: 'Find the page in the old guest book',
              predicate: { hasItems: ['guest_ledger'] },
              setsFlags: ['found_the_page'],
              closesFlags: [],
            },
            {
              routeId: 'marla_said_it',
              label: 'Ask Old Marla why she keeps looking at the stairs',
              predicate: {
                flagsSet: ['spoke:marla'],
                minRelationship: [{ characterId: 'marla', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['marla_said_it'],
              closesFlags: [],
            },
            {
              routeId: 'ember_said_it',
              label: 'Ask her why she chose your door',
              predicate: {
                flagsSet: ['spoke:ember'],
                minRelationship: [{ characterId: 'ember', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['ember_said_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:she_was_here_before'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'her_name',
          playerCopy: 'Earn the name she does not give strangers.',
          directorNotes:
            'A dragon’s true name, given, is a promise: whoever holds it can call her once, from anywhere, and she will come. She gave it to nobody fifty years ago, not even Marla. She gives it to somebody who has handed the scale back, or who has kept her secret at real cost to themselves, and she does it plainly, in the kitchen, without ceremony. It is never earned by asking for it.',
          enterWhen: { flagsSet: ['knows:she_was_here_before'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_scale_came_back',
              label: 'Give the scale back first',
              predicate: {
                flagsSet: ['scale_returned'],
                minRelationship: [{ characterId: 'ember', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['name_for_the_scale'],
              closesFlags: [],
            },
            {
              routeId: 'kept_at_a_cost',
              label: 'Keep her secret when it costs you',
              predicate: {
                flagsSet: ['guest_right_held'],
                minRelationship: [
                  { characterId: 'ember', dimension: 'trust', value: 70 },
                  { characterId: 'ember', dimension: 'affection', value: 55 },
                ],
              },
              setsFlags: ['name_for_the_week'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['knows:her_name'],
            abilities: ['call_her_name'],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_knock',
      atWorldMinute: 25,
      locationId: 'common_room',
      publicCopy:
        'Three knocks on the front door, evenly spaced. A man’s voice through the rain: "Greyhook Company, under crown warrant. Is the house open, keeper?"',
      directorNotes:
        'Captain Wren, hat in hand, two hunters behind him at the gate with shuttered lanterns. He knows the charter by heart and will not come in after dark if the lamp is lit and she has a key. He wants to see the keeper’s face when he asks about a tall hooded woman. If the lamp is out he notices, says so, and still waits to be asked in, because he would rather win at an inspection than through a door.',
      setsFlags: ['wren_knocked'],
      cancelledByFlags: ['ember_handed_over'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'wren', toLocationId: 'common_room' }],
    },
    {
      id: 'we_marla_comes_round',
      atWorldMinute: 7 * 60 + 30,
      locationId: 'inn_kitchen',
      publicCopy:
        'Old Marla lets herself in through the kitchen’s back door with a basket on her arm, says "That range is a disgrace," and stops dead at the foot of the stairs.',
      directorNotes:
        'She saw the lamp lit at midnight from her window and has come to find out who is paying for it. When she sees Ember she knows her at once and says nothing about it to anybody, which for Marla is a superhuman effort. She will cook breakfast whether or not anybody asked.',
      setsFlags: ['marla_came_round'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'marla', toLocationId: 'inn_kitchen' }],
    },
    {
      id: 'we_the_bounty',
      atWorldMinute: 9 * 60,
      locationId: 'ford_market',
      publicCopy:
        'A notice goes up on the market cross in Brindle Ford: one thousand crowns for the red dragon, taken alive, and fifty for word of where she sleeps.',
      directorNotes:
        'By noon the whole valley has read it. The landlord of the Drowned Ox starts asking who has had guests. Fifty crowns is more than most families here see in a year, and the inn on the hill is the obvious place to look.',
      setsFlags: ['bounty_posted'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_petition',
      atWorldMinute: 15 * 60,
      locationId: 'reeves_hall',
      publicCopy:
        'Captain Wren files a petition at the Reeve’s hall: that the house on the north road is a ruin and not a working inn, and that its charter therefore protects nobody.',
      directorNotes:
        'Reeve Thatch accepts it because she must, and sets an inspection for noon on the third day. She sends a runner up the hill with the notice and a private note of her own, which says only: "Four things. Fire, bed, meal, lamp. And find that charter."',
      setsFlags: ['inspection_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'wren', toLocationId: 'reeves_hall' }],
    },
    {
      id: 'we_the_drovers',
      atWorldMinute: 1440 + 18 * 60,
      locationId: 'common_room',
      publicCopy:
        'Five drovers and a pilgrim come in out of a hailstorm with their hats in their hands and coin in their fists, asking if the house is open for beds and supper.',
      directorNotes:
        'The first real paying travellers in twenty years, and the test of whether this is an inn. Turning them away breaks the charter if a bed is free. Feeding them is a scene: the range, the pots, Marla appearing from nowhere with an apron. Word goes down the road either way, and the drovers have noticed the horns.',
      setsFlags: ['drovers_arrived'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_begun'],
      movesCharacters: [],
    },
    {
      id: 'we_the_lantern',
      atWorldMinute: 1440 + 23 * 60,
      locationId: 'stable_yard',
      publicCopy: 'A lantern burns in the hayloft window, turned to face the crossroads.',
      directorNotes:
        'Tobin has lit it, because nobody asked him what was wrong and the silver was still in his boot. Down at the crossroads somebody sees it within a minute. He confesses in the morning without being asked. It proves nothing to the Reeve; it tells Wren everything.',
      setsFlags: ['lantern_lit'],
      cancelledByFlags: ['tobin_came_clean'],
      requiresFlags: ['first_night_begun'],
      movesCharacters: [],
    },
    {
      id: 'we_the_inspection',
      atWorldMinute: 2 * 1440 + 12 * 60,
      locationId: 'common_room',
      publicCopy:
        'Noon on the third day. Reeve Thatch walks up the hill with a ledger under her arm and a folding measuring rod, and Captain Wren walks three paces behind her with his hat in his hands.',
      directorNotes:
        'The inspection. Four things: a fire, a bed, a meal, a lamp. And the charter, which must be shown. Thatch wants to pass the inn and will not pass a lie she can see. Wren argues the law politely and well, in front of half the town, which has followed them up the hill. Wren argues from the doorstep; he has not crossed this threshold in twenty years and does not now.',
      setsFlags: ['inspection_day'],
      cancelledByFlags: [],
      requiresFlags: ['inspection_called'],
      movesCharacters: [
        { characterId: 'thatch', toLocationId: 'common_room' },
        { characterId: 'wren', toLocationId: 'common_room' },
      ],
    },
    {
      id: 'we_the_cage',
      atWorldMinute: 3 * 1440 + 10 * 60,
      locationId: 'hunters_camp',
      publicCopy:
        'A wagon comes down the mountain road to the crossroads behind four horses: an iron cage on wheels, big enough for a horse, with a collar chained to its floor.',
      directorNotes:
        'The Margrave’s wagon, with his factor riding beside it. It makes the word "alive" concrete for everybody who sees it, including half of Wren’s own company, who did not know. Wren looks at it for a long time and then goes and checks the horses, because that is something to do with his hands.',
      setsFlags: ['cage_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'wren', toLocationId: 'hunters_camp' }],
    },
    {
      id: 'we_the_wound_closes',
      atWorldMinute: 6 * 1440 + 22 * 60,
      locationId: 'guest_rooms',
      publicCopy:
        'The wound across her shoulder has closed to a pale seam. She stands at the open window of Room Four with the wind in her face, and does not flinch.',
      directorNotes:
        'Seven nights, counted from the one she walked in on. She can change back now, and she will want to leave at first light from the crag, where there is room. She does not say so. She asks what is for supper.',
      setsFlags: ['wound_closed'],
      cancelledByFlags: ['ember_taken', 'inn_burned', 'ember_handed_over'],
      requiresFlags: ['ember_is_a_guest'],
      movesCharacters: [{ characterId: 'ember', toLocationId: 'guest_rooms' }],
    },
    {
      id: 'we_the_seventh_dawn',
      atWorldMinute: 7 * 1440 + 5 * 60 + 30,
      locationId: 'the_crag',
      publicCopy:
        'First light on the seventh morning. On the crag above the inn, where the heather is still black, something very large unfolds.',
      directorNotes:
        'Whatever was decided this week arrives here. If she is flying, the whole valley sees it, the hunters included, and nobody can do anything about a healed dragon in open sky. If she is staying, the crag is empty, and that means something too.',
      setsFlags: ['seventh_dawn'],
      cancelledByFlags: [],
      requiresFlags: ['wound_closed'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_seventh_dawn',
      kind: 'FINALE',
      label: 'Whether she flies on the seventh morning',
      seedHint: 'A wound across her shoulder, bound with her own torn sleeve, that she will not let anybody look at.',
      payoffHint: 'The crag at first light, and what she does there, decided by the week rather than by a speech.',
      weight: 1,
    },
    {
      id: 'p_why_this_door',
      kind: 'MYSTERY',
      label: 'Why she chose this inn, of all the roofs in the valley',
      seedHint: 'She walked straight to the counter in the dark, as if she knew exactly where it was.',
      payoffHint: 'A fifty-year-old guest book with one page in red ink, and a cook who never sold the scale left on her pillow.',
      weight: 0.8,
    },
    {
      id: 'p_wrens_rest',
      kind: 'RELATIONSHIP',
      label: 'What the captain at the door used to call home',
      seedHint: 'A painted sign lying face down under the cellar stairs.',
      payoffHint: 'Wren’s Rest, a C carved into the back of the sign, and a man who has not set foot inside since the day he left.',
      weight: 0.8,
    },
    {
      id: 'p_the_inspection',
      kind: 'BOSS',
      label: 'The inspection at noon on the third day',
      seedHint: 'The captain’s petition, filed politely, that your ruin is not an inn.',
      payoffHint: 'The Reeve’s rod, four questions, and a charter that comes out of a biscuit tin or does not.',
      weight: 0.9,
    },
    {
      id: 'p_the_scale',
      kind: 'THEME',
      label: 'What a scale is worth',
      seedHint: 'Worth more than the inn, still warm, steaming on the counter.',
      payoffHint: 'Near a flame it turns toward her, and the keeper decides whether it is money, a beacon or a promise.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_cook',
      name: 'You Were a Cook',
      role: 'Food and warmth',
      summary: 'You cooked for a living in your old life, so the kitchen is where you are strongest, and a full plate is how you win people over.',
      playstyle: ['Warm', 'Generous', 'Feeds people'],
      blurb: 'Ten years on a hot line in a world with gas burners, and the first thing you did in this one was work out how to proof bread without a clock.',
      attributeBonus: { presence: 2, mind: 1 },
      skillProficiencies: { cooking: 3, attention: 1, haggling: 1 },
      startingItems: [{ itemId: 'chefs_knife', qty: 1 }],
      startingAbilities: ['cook_supper'],
      startingReputation: [{ factionId: 'faction_north_road', amount: 10 }],
    },
    {
      id: 'arch_builder',
      name: 'You Built Things',
      role: 'Repair and hard work',
      summary: 'You worked a building trade in your old life, so the roof, the range and the stable doors are jobs you can actually finish.',
      playstyle: ['Practical', 'Physical', 'Fixes things'],
      blurb: 'You have patched worse roofs than this one, though never with slate pulled off a barn by a man who calls you Boss.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { graft: 3, attention: 1, nerve: 1 },
      startingItems: [{ itemId: 'tape_measure', qty: 1 }],
      startingAbilities: ['keep_house'],
      startingReputation: [{ factionId: 'faction_brindle_ford', amount: 10 }],
    },
    {
      id: 'arch_books',
      name: 'You Kept the Books',
      role: 'Money and paperwork',
      summary: 'You did accounts in your old life, so you can read a deed, argue with an official and bargain in a market better than anybody in the valley.',
      playstyle: ['Careful', 'Persuasive', 'Reads the fine print'],
      blurb: 'You once found a missing decimal point in a ledger nobody had opened for a decade. Clause nine of your deed has been bothering you since yesterday.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { haggling: 3, lore: 2 },
      startingItems: [{ itemId: 'ballpoint_pen', qty: 1 }],
      startingAbilities: ['haggle'],
      startingReputation: [],
    },
    {
      id: 'arch_nurse',
      name: 'You Were a Nurse',
      role: 'Healing and calm',
      summary: 'You nursed in your old life, so you can treat a wound properly, keep your head in a crisis, and tell when somebody is lying about how much it hurts.',
      playstyle: ['Calm', 'Observant', 'Heals'],
      blurb: 'Night shifts on a busy ward taught you to sleep anywhere, eat standing up, and never believe a patient who says it is fine.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { mending: 3, attention: 1, nerve: 1 },
      startingItems: [{ itemId: 'first_aid_pouch', qty: 1 }],
      startingAbilities: ['tend_wound'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the valley call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Okoro' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did you do in your old life?',
      helpText:
        'You walked out of the fog a month ago from a world like ours. What you did for a living there sets what you are good at here, and it stays fixed for the whole story. It does not decide whether you shelter her, sell her out, or fall for anybody; all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is true about you in both worlds?',
      helpText: 'The part of you the fog did not change. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I cannot sing, I can fix anything with string, and I talk to animals like they are coworkers.',
    },
    {
      id: 'why_the_inn',
      label: 'Why did you buy a ruin?',
      helpText: 'A starting temperament, not a promise. You can do the opposite at midnight and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'fresh_start', label: 'Somewhere to start again, with nobody watching' },
        { id: 'a_business', label: 'A business: the road will come back, and you will be ready' },
        { id: 'a_hiding_place', label: 'Somewhere to hide from how strange it is to be a stray' },
        { id: 'a_dare', label: 'Old Marla dared you, and you do not lose dares' },
        { id: 'no_reason', label: 'It cost one copper. Does it need a reason?' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see across the counter?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Wet hair, a borrowed apron, sleeves rolled up, and trainers nobody in this valley has ever seen.',
    },
  ],
  /**
   * Where this can end up. Twelve, so the storyteller reads every one.
   *
   * Five are losses and none is written as a punishment: she is taken, the
   * scale is sold, she is handed over, the inn burns, or the keeper walks
   * away. "The One-Copper Inn" is the slow-life ending and needs no dragon
   * outcome at all beyond the house surviving the week. The two UNIQUE
   * endings need the charter upheld in public, or the scale given back and
   * her true name earned.
   */
  endings: [
    {
      id: 'end_open_all_night',
      name: 'Open All Night',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['seven_nights_kept', 'she_flew'],
        flagsUnset: ['left_with_her', 'scale_sold'],
      },
      condition:
        'The ordinary good ending. The keeper kept her for seven nights, the lamp stayed lit, and at first light she went up to the crag and flew. Write the yard at dawn, the whole valley looking up, and then the next thing that has to be done in an inn that now has guests. Nobody makes a speech.',
      epilogue:
        'The lamp over the door is lit every night after that, out of habit and then out of pride. Drovers start stopping again by the end of the month. Once a year, in the worst of the winter, somebody pays for Room Four with a scale and does not stay to be thanked.',
      hint: '',
    },
    {
      id: 'end_taken_alive',
      name: 'Taken Alive',
      rarity: 'COMMON',
      minTurn: 22,
      requires: { flagsSet: ['ember_taken'] },
      condition:
        'The charter failed and the hunters came in at dusk, by law and politely. Write it plainly and without gore: the company in the common room, chain, the cage wagon at the gate, and the keeper standing in a house that was not an inn when it needed to be one. Do not make it the keeper’s fault in so many words; let the house say it.',
      epilogue:
        'The wagon goes north over the mountain road with the whole valley watching. The inn stays open, and does well, and for the rest of the keeper’s life, once a month, a rider from the Margrave’s tower goes past the front door with a red-gold scale in his saddlebag, on his way to market.',
      hint: 'The lamp, the fire, the bed, the meal. And the paper.',
    },
    {
      id: 'end_four_hundred_crowns',
      name: 'Four Hundred Crowns',
      rarity: 'COMMON',
      minTurn: 20,
      requires: { flagsSet: ['scale_sold'], flagsUnset: ['seven_nights_kept'] },
      condition:
        'The keeper sold the scale, and the buyer did what every buyer does and warmed it by a fire. The hunters followed it to her within a day. Write what four hundred crowns buys: every roof, the taxes, a second horse, a sign in gold leaf, and a very quiet Room Four.',
      epilogue:
        'It is the best-kept inn on the north road for twenty years. Travellers remark on the roof. Old Marla never sets foot in it again, and nobody ever finds out what she had sewn into the lining of her good coat.',
      hint: '',
    },
    {
      id: 'end_you_didnt_see_her',
      name: 'You Didn’t See Her',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['ember_handed_over'] },
      condition:
        'The keeper told the captain where she was. It was legal, it was safe, and it was quick. Write the stairs, the company going up them in good order, and Ember on the landing looking at the keeper once, without anger, the way you look at weather.',
      epilogue:
        'Fifty crowns for word of where she slept, paid promptly, in silver. It roofs three rooms. Wren never takes a room at the inn, though he passes it twice a year, and always looks up at the lamp.',
      hint: '',
    },
    {
      id: 'end_last_night_of_the_inn',
      name: 'The Last Night of the Inn',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['inn_burned'] },
      condition:
        'There was a fight under the roof, she broke cover, and fire in human shape did what fire does. Everybody got out; write that first and clearly. Then the inn burning against the night, the hunters and the keeper on the same side of the yard for a moment, and a very large shape going up off the crag with the wound open again.',
      epilogue:
        'The stable survives, because Tobin re-slated it. The Reeve writes the inn off the town’s books in red ink and then, a month later, writes it back on, because the keeper is out there every morning clearing rubble. The second Wren’s Rest takes three years.',
      hint: '',
    },
    {
      id: 'end_the_road_out',
      name: 'The Road Out of the Valley',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['left_with_her'] },
      condition:
        'The keeper walked away from a ruin, a dragon and twenty hunters, which is a completely reasonable thing for a stray to do. Do not punish it and do not redeem it. Write the road, and what the keeper left behind them burning or not burning in the window.',
      epilogue:
        'The deed is found on the counter under the brass bell. Tobin keeps the stable. Somebody keeps the lamp lit for a week, and the valley argues for years about who.',
      hint: '',
    },
    {
      id: 'end_the_one_copper_inn',
      name: 'The One-Copper Inn',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['inspection_passed', 'inn_is_working'],
        flagsUnset: ['inn_burned', 'ember_taken'],
        minFactionReputation: [{ factionId: 'faction_north_road', value: 30 }],
      },
      condition:
        'The slow-life ending. The inn simply works: it passed its inspection, the road has started stopping again, and whatever happened with the dragon did not wreck the house. Write a full common room on an ordinary night, a supper that people paid for, and the keeper too busy to notice they are happy.',
      epilogue:
        'Nobody calls it Wren’s Rest any more. The new sign says THE ONE-COPPER INN, because that is what the valley had been calling it all along, and the copper the Reeve was paid is nailed to the bar.',
      hint: '',
    },
    {
      id: 'end_two_keys',
      name: 'Two Keys on the Hook',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['she_stayed', 'knows:her_name'],
        minRelationship: [{ characterId: 'ember', dimension: 'affection', value: 70 }],
      },
      condition:
        'She could fly, and she stayed in human shape, for a season at least, because she wanted to. Romantic only if the player made it so, and no further than a kiss. Write the range she lights every morning, the warmest chair, and two keys on one hook behind the bar.',
      epilogue:
        'The hunters leave in the autumn. The town decides, after some debate, that the keeper’s partner is simply a very tall woman who wears hats. The winters at the inn are famously warm, and nobody in the valley ever has to light a fire twice.',
      hint: '',
    },
    {
      id: 'end_wrens_rest',
      name: 'Wren’s Rest',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['wren_turned', 'seven_nights_kept'],
        minRelationship: [{ characterId: 'wren', dimension: 'trust', value: 60 }],
      },
      condition:
        'The captain laid down his hook. His company is paid by the town to guard the north road instead, and the inn is their hall. Write Wren stepping over the threshold for the first time in twenty years, by invitation, and not saying anything about it at all.',
      epilogue:
        'The old sign goes back up over the door, repainted, with a second name added under the wren in the keeper’s hand. The Greyhook Company eats in the common room every Friday. The cage wagon is broken up for its iron and becomes, among other things, a very good set of fire-dogs.',
      hint: '',
    },
    {
      id: 'end_over_the_mountains',
      name: 'Over the Mountains',
      rarity: 'RARE',
      minTurn: 36,
      requires: { flagsSet: ['left_with_her'] },
      condition:
        'At first light on the seventh morning the keeper climbed onto a dragon and left. Write the cold, the height, the valley going small and the inn’s lamp still lit far below, and do not explain where they are going, because neither of them has decided.',
      epilogue:
        'The deed is left with Old Marla, who runs the inn for six years with Tobin and is extremely annoying about it. Strays are said never to go home. Nobody ever said they could not go somewhere else.',
      hint: '',
    },
    {
      id: 'end_lamp_over_the_door',
      name: 'The Lamp Over the Door',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: {
        flagsSet: ['inspection_passed', 'charter_in_hand', 'seven_nights_kept'],
        minFactionReputation: [{ factionId: 'faction_brindle_ford', value: 40 }],
      },
      condition:
        'The charter was upheld in public, by the Reeve, in writing, in front of the town and the hunters, and it held all week. Write what that makes the inn: the one house on the north road where anybody hunted can pay four copper and be safe until dawn. Somebody else knocks on the last night.',
      epilogue:
        'The keeper signs the bottom of the Lantern Charter under Hester Wren. Within a year the inn has sheltered a runaway journeyman, a debtor, a witch and a very small, very angry wyvern, and the Margrave has stopped writing letters.',
      hint: 'The paper has room at the bottom for one more name.',
    },
    {
      id: 'end_called_by_name',
      name: 'Called by Name',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['knows:her_name', 'scale_returned', 'she_flew'] },
      condition:
        'The keeper gave the scale back, earned her true name, and let her go. She will come once, from anywhere, when called. Write the parting as practical, the way she would: a bargain struck, its terms stated, and one thing said at the end that is not a term at all.',
      epilogue:
        'The keeper never uses the name in the first year, or the second. It sits there like money in a drawer. Old Marla says that is the right way to hold it, and then, for the first time in fifty years, takes her good coat out of the cupboard and wears it to market.',
      hint: '',
    },
  ],
  opening:
    "Midnight. Rain comes through the roof of the inn you bought for one copper.\n\nThe door bangs open. A tall woman, soaked, a hood pulled low over two dark horns. She cradles one arm.\n\nShe sets a red scale on the counter. It steams.\n\n\"Ember,\" she says. \"Call me that. One room, seven nights.\"\n\nTobin, your stablehand, comes in from the yard with a lantern and stops dead. \"Boss. Torches on the hill. Dragon hunters, twenty of them.\"\n\nHe stares at the scale. \"That’s worth more than this inn.\"\n\nThe woman doesn’t turn round.\n\n\"One room,\" she says. \"And you did not see me. Yes or no?\"",
  openingPanel: {
    assetKey: 'story_the_one_copper_inn/opening',
    alt: 'Ember at the counter of a dark, rain-soaked inn, hood over two dark horns, setting down a glowing red scale, torches on the hill through the broken shutter behind her.',
  },
  openingSuggestions: [
    '"Yes. Top of the stairs, the only room with a roof. Now: what are you?"',
    'I pocket the scale, hand her the key to Room Four, and put out every light in the house, the lamp over the door too.',
    'I take Tobin’s lantern and walk out into the rain to meet the torches.',
  ],
  coverDirection: [
    'SUBJECT: Ember, a dragon in human form, alone and unmistakable in the foreground of a key visual for a cozy fantasy anime about a ruined roadside inn.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture, standing behind a worn wooden inn counter with a brass bell on it.',
    'Two dark swept-back horns, copper-red hair worn loose and wet with rain, amber eyes with slit pupils, a travel-stained dark green hooded cloak, fastened at the throat with its hood pushed back off her horns, over a high-collared dark wool tunic.',
    'One hand is setting a glowing red-gold dragon scale down on the counter; the other arm is held close against her side. A thin curl of steam rises off the shoulders of her cloak.',
    'Her expression is guarded and a little amused, looking straight at the viewer, as if waiting for an answer.',
    'HER FACE STAYS CLEAN: no glow, steam, marks or shadows across her face.',
    'Every glow effect stays on the scale and the hearth, never on her face.',
    'BEHIND HER, soft and secondary: a dark low-beamed inn common room, a big stone hearth with a warm fire on one side, buckets catching rain from a broken roof,',
    'an iron lamp over the door, and through a broken shutter on the other side, far off on a dark hill, a line of small torches.',
    'LIGHT: warm orange firelight from the hearth on one side of her and cold blue rain light from the shutter on the other, with a red-gold glow from the scale lighting her hand.',
    'TITLE: the words THE ONE-COPPER INN painted into the art in the upper third as a hand-painted wooden inn-sign logo, cream letters with gold edging on dark wood,',
    'spelled exactly THE ONE-COPPER INN, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const THE_ONE_COPPER_INN = StoryVersion.parse(raw);
