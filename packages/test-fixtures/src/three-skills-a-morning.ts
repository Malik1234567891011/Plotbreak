import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Three Skills a Morning": three cards at dawn, a gallows at noon, and a
 * dragon's rent due at sundown.
 *
 * The structural bet is that the power pick is the first real decision of the
 * game and that every option is a different way to win. [Read Lies] breaks the
 * false witness. [Dragon Tongue] lets the player climb the hill and ask the
 * victim, who is a dragon. [Perfect Cooking] looks like the joke card and is
 * the deepest one, because a clause nobody has read in a century says the rent
 * can be paid in a feast. None of them is the obvious answer, and keeping none
 * of them is authored as a route rather than an absence.
 *
 * Production runs `runTurnPure`, which never reads the abilities list, the
 * resources or the quest steps. So the rules of the draw live where the
 * storyteller actually looks: hard canon, the premise, and the Morning Draw as
 * a quest item, whose description and lore are sent verbatim. The abilities
 * below model day one for the engine and the catalog specs, and the world
 * events carry the second dawn and the Door Back.
 *
 * The cost is the heart of it. Every card kept takes one small memory of the
 * world the player came from, and nobody says so. Forgetting is a descending
 * resource with no regeneration on purpose: what the cards take does not come
 * back, and that is what makes the morning the cards offer the way home a real
 * choice rather than a reward screen.
 *
 * Three variables. Nerve is the only GOOD_HIGH, because `resolveRest` refills
 * those and sleeping really does restore a person; it also ends the day's card,
 * which the prose has to honour. Whispers is first among the descending pair
 * because PUBLIC_VIOLENCE raises the first GOOD_LOW in array order, and a fight
 * in the square is exactly what makes a small town start asking where the
 * stranger came from. The Town is first among the factions for the same reason.
 *
 * Every character is an adult and the bible states each age.
 */

const raw = {
  id: 'sv_three_skills_a_morning_1',
  storyId: 'story_three_skills_a_morning',
  version: 1,
  title: 'Three Skills a Morning',
  openingObligations: [
    {
      what: 'Nell Farrow hangs at the noon bell unless somebody brings Sir Garrot a lawful reason not to.',
      withCharacterId: 'garrot',
      dueInMinutes: 360,
    },
    {
      what: 'The town owes the dragon on the hill its rent by sundown, and the rent chest was stolen three nights ago.',
      withCharacterId: 'haldis',
      dueInMinutes: 870,
    },
  ],
  fantasyLabel: 'Three skills. Keep one. She hangs at noon.',
  hook: 'Every dawn you draw three skills and keep one until you sleep. Today a woman hangs at noon unless somebody speaks for her.',
  premise:
    'Nine days ago you fell asleep on a night bus in your own world and woke up in a hayloft outside a river town called Kettlecross, with nothing in your pockets that works here.\n\n' +
    'What came with you is the draw. Every morning at first light, three cards appear in the air in front of you, and only you can see them. Each one is a skill: [Read Lies], [Mend Bone], [Speak to Horses]. Touch one and it is yours, completely, until you next sleep. The other two are gone.\n\n' +
    'This morning the whole town is in the square for a hanging. Three nights ago somebody stole the rent the town owes the dragon who owns the hill, and the court has decided it was Nell Farrow, a ferry hand with a quick tongue and an old reputation. She hangs at noon unless somebody speaks for her and brings the knight a reason.\n\n' +
    'The rent is due on the hill at sundown. The last time it was late, sixty-one years ago, the dragon sat on the bell tower until the town paid. It still leans.\n\n' +
    'Your three cards today are [Dragon Tongue], [Perfect Cooking] and [Read Lies]. You can keep one. You can keep none. You can walk out of town before noon, and nobody here would blame a stranger for it.\n\n' +
    'Every card you keep costs you something you will not notice losing. Nobody has told you that yet.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Fantasy', 'Isekai', 'Mystery', 'Adventure', 'Romance', 'Comedy'],
  mechanicsChips: [
    'Three new skills every dawn',
    'Keep one until you sleep',
    'A hanging at noon',
    'Rent due to a dragon',
    'Every card costs something',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'Keep [Read Lies] and you can break a witness by mid-morning. Keep [Dragon Tongue] and you can climb the hill and ask the victim. Keep [Perfect Cooking] and you might pay a dragon’s rent with lunch.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'ford_square',
    startWorldMinute: 6 * 60,
    startingItems: [{ itemId: 'morning_draw', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. Nell Farrow is twenty-four, Pim Atwater thirty-one, Corra Quell thirty-nine, Reeve Anselm Cotter forty-four, Ysolde Marr forty-seven and Sir Garrot Dunmere fifty-two. Haldis is a dragon about four hundred years old.',
      'The player is an adult who fell asleep on a night bus in our world nine days ago and woke in a hayloft outside Kettlecross, a ford town on a brown river under a hill that belongs to a dragon. Nobody here knows how it happened, and nothing here can send them back except the cards.',
      'Every dawn, wherever the player is, three cards appear at arm’s length that only the player can see. Each names one skill in square brackets. Touching one keeps it until the player next sleeps, even for a short nap, and the other two fade. If none is touched, all three fade when the sun clears the rooftops.',
      'A kept skill is complete and exact. It does precisely what its name says, at the highest level, and nothing else. [Perfect Cooking] is perfect cooking and not charm, speed or chemistry. No card can raise the dead, change the past, or make anybody love anybody.',
      'Today’s three cards are [Dragon Tongue], to speak and understand the language of dragons; [Perfect Cooking], to cook anything perfectly with what is to hand; and [Read Lies], to hear a spoken lie ring false the moment it is said. [Read Lies] does not catch silence, half-truths, or a liar who believes what he is saying.',
      'Every card kept costs one small memory of the world the player came from: a tune, a street name, a taste, a joke. Never a person, never all at once, never chosen. The player only notices when they reach for it. Nobody has told them.',
      'People who carry the cards turn up along the river about once a generation, and the river folk call them morning-hands. On later mornings the draw is three new cards, usually one useful, one strange and one dangerous or grand, never the same card twice in one draw. Once, to a morning-hand who has kept enough cards to know what they cost, the draw offers [The Door Back], which takes them home at the next sundown. The other two cards that morning are always things somebody here badly needs.',
      'Kettlecross leases its hill and ford from Haldis, a dragon about four hundred years old, under the Hill Charter, signed two hundred and twelve years ago. The rent is a chest of silver to the weight of a grown calf, carried to the Rent Stone halfway up the hill by sundown on Rent Day. Today is Rent Day.',
      'The Hill Charter has three clauses nobody living has read closely: the rent may be paid in silver or in a feast worthy of the hill cooked by one pair of hands; the Landlady may come down to collect what is owed; and whoever robs the Landlady answers to the Landlady and to no other court.',
      'Three nights ago the rent chest vanished from the moot hall strongroom. Reeve Anselm Cotter took it. He has short-weighted the rent for six years to pay a debt to the Lowmere Salt Bank, and the silver is now in salt barrels in his cellar, due to go aboard the bank’s barge, the Honest Weight, at six this evening. The barge sails at sundown. He paid the night watchman Pim Atwater twelve crowns to swear he saw Nell, and he put the coin in her boot himself while searching her.',
      'Nell Farrow did not steal the rent. That night she was burgling the reeve’s house to take back her late mother’s ferry license, heard barrels rolled into his cellar and saw the iron corner of the rent chest. She will not say so, because it confesses another crime and nobody believes a thief who accuses the reeve.',
      'Sir Garrot Dunmere hangs at the noon bell. He stops for exactly five things: a witness proven false; the stolen thing returned and the thief named; the pardon of the wronged party; proof that his court has no right to try the case; or the old proof, a speaker who stands against him in arms until the bell finishes. He hears everything else courteously and refuses it.',
      'Anybody may speak for the condemned when the knight has asked three times. A speaker caught lying to the court is put in the stocks and then put out of the town.',
      'The old proof is claimed aloud and fought at the foot of the gallows while the noon bell rings. The speaker wins by still standing, armed, when the bell finishes, and loses by a yield or a disarm. It is never to the death. Sir Garrot is the finest sword on the river and has never lost it. Anybody who simply attacks the court is disarmed by the circuit men and put in the lockup beside the condemned, which is not the end of anything.',
      'Haldis speaks only the dragon tongue. Without [Dragon Tongue] the player hears a forge breathing and nothing else. She last came down sixty-one years ago, when the rent was a third short, and sat on the bell tower until the town paid. It still leans.',
      'Ysolde Marr, who keeps the Crooked Kettle, fell into this world twenty-three years ago and has not drawn a card in nineteen. She has never told anybody in Kettlecross.',
    ],
    toneGuide:
      'Bright, quick and a little funny, with a real life on the line at noon. This is an isekai with a courtroom clock in it: the cards are a game and the player should feel clever choosing, and when a kept skill is used the prose shows exactly what it does, concretely, in the hands and the ears. ' +
      'The town is a real place with mud, bread, river smell and a bell tower that leans. People want specific things and talk like themselves: Nell jokes when she is frightened, Garrot speaks in threes, Ysolde answers questions with chores, Cotter never says a false sentence, Pim cannot stop saying them, Haldis counts in winters, Quell counts in crowns. ' +
      'Nobody is stupid and the reeve is not a cartoon. Garrot is not a villain; he is the law, and the law is the problem. ' +
      'If the noon bell rings with nothing to stop it, the sentence is carried out offstage and is never shown: write the back of the crowd, the bell, the square going quiet, a knight taking off his gloves, and let the afternoon be wrong. Violence is legible and brief and never graphic. ' +
      'Romance is flirtatious, tense and heartfelt, up to a kiss, and never fan service. Every character is an adult. The face at the top of a beat is Nell’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Pim swallows. "I saw her. Midnight. The side door."\n\nThe words ring wrong. Not loud. Like a cup with a crack in it, tapped with a spoon.\n\nGarrot doesn’t hear it. Nobody does. Only you.\n\n"What was she carrying?" you ask.\n\n"A sack." True, somehow. He has seen a sack, somewhere, sometime.\n\n"And her face. You saw her face."\n\nPim looks at the reeve. The reeve looks at the sky.\n\n"...Yes," says Pim, and it rings like a dropped bell.',
      'The hill opens one eye.\n\nIt’s the size of a cartwheel and the colour of a forge at full heat, and it is looking straight at you.\n\nThe noise that comes out of her is a furnace breathing. Under it, because of the card, there are words.\n\n"Tenant." A long pause, like a door deciding. "You speak properly. Nobody has spoken properly to me in sixty-one winters."\n\nGravel slides off her shoulder in a small avalanche.\n\n"So. Where is my rent?"',
      'The knife is wrong, the fire is wrong and the onions are older than you are.\n\nIt doesn’t matter. The card knows.\n\nYour hands move before you do. Salt, fat, heat, wait. Wait. Now.\n\nYsolde stops stirring her own pot. Then she stops pretending not to watch.\n\n"Lodger," she says slowly. "Where did you learn to do that?"\n\n"This morning."\n\nShe doesn’t laugh. She sits down on the flour sack, like her knees decided for her.',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 12, resolve: 12, arcana: 9 },
  skills: [
    { id: 'pleading', name: 'Pleading', attribute: 'presence', description: 'Arguing a case out loud in front of people who would rather go home.' },
    { id: 'questioning', name: 'Questioning', attribute: 'resolve', description: 'Asking the same thing a fourth time, politely, until the story comes apart.' },
    { id: 'notice', name: 'Noticing', attribute: 'mind', description: 'What is wrong with a place or a thing: a lock smashed after it was opened, a boot with a hole in it.' },
    { id: 'bluff', name: 'Bluffing', attribute: 'presence', description: 'Saying a thing you cannot prove as if you could, to somebody who is checking.' },
    { id: 'sneak', name: 'Sneaking', attribute: 'agility', description: 'Being somewhere you were not let in, and leaving before anybody notices.' },
    { id: 'brawl', name: 'Brawling', attribute: 'might', description: 'Fighting without a sword, badly and effectively.' },
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'Feeding people with what is in the larder, without a card to do it for you.' },
    { id: 'haggle', name: 'Haggling', attribute: 'presence', description: 'Getting a price, a promise or a delay out of somebody who holds the better hand.' },
    { id: 'old_ways', name: 'Old Ways', attribute: 'arcana', description: 'Charters, customs, dragons, and everything this world takes for granted that you do not.' },
  ],
  /**
   * Three, all invisible.
   *
   * Nerve is the only GOOD_HIGH: it is what the generic cost path spends and
   * what `resolveRest` refills, and a night's sleep genuinely restores it. It
   * also ends the day's card, which is the trade the whole world is built on.
   *
   * Whispers comes first among the descending pair because PUBLIC_VIOLENCE
   * raises the first GOOD_LOW in array order. Forgetting has no regeneration at
   * all: what the cards take does not come back.
   */
  resources: [
    {
      id: 'nerve',
      name: 'Nerve',
      max: 100,
      start: 78,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is running on nothing. Words come out a beat late and the wrong size, and a stranger with no standing in this town cannot afford that in front of a knight. Sleeping fixes it, and sleeping also ends today’s card.',
      color: '#E0A458',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Nearly spent. The player misses the second meaning in a sentence, agrees to things to end conversations, and hears their own voice shake when they argue a case. This is where a good plan gets carried out badly, and where a nap looks very tempting and costs the card.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary wear of a day with a clock on it. Good for one hard conversation or one climb, honest about not having both left. The player notices they have stopped eating, and somebody who cares about them notices too.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh. Enough left to argue with a knight, climb a hill and cook a feast on the same day and be present for each. The player can hear what is under a sentence and say the difficult thing in the shape that lands.',
        },
      ],
    },
    {
      id: 'whispers',
      name: 'Whispers',
      max: 100,
      start: 15,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The stranger is part of the furniture. People nod at the player in the bakery queue and nobody wonders where they came from.',
      color: '#8C7AA9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The stranger above the inn is a curiosity at most. People answer questions, sell bread and give directions without wondering why somebody needs directions to a town this small.',
        },
        {
          upTo: 50,
          behaviour:
            'People have started talking. Somebody saw the business with the dray horse, somebody else saw the stranger speak up at the assize, and the river folk say a morning-hand in town means a funeral or a fortune. Doors still open, slower.',
        },
        {
          upTo: 80,
          behaviour:
            'The town is watching. Mothers cross the square to avoid the player, the circuit men follow at a distance, and the reeve finds this very useful. Any accusation aimed at the stranger now sticks on the first throw.',
        },
        {
          upTo: 100,
          behaviour:
            'Kettlecross has decided the stranger is the reason for all of it: the theft, the hanging, the dragon. There is a crowd, it has a ringleader, and it is looking for a second rope. Leaving is a reasonable plan.',
        },
      ],
    },
    {
      id: 'forgetting',
      name: 'Forgetting',
      max: 100,
      start: 9,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Home is whole. Every song, street and taste the player brought through is still where they left it.',
      color: '#6E9BB8',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Small gaps the player has not found yet: the middle of a jingle, the name of the corner shop, which bus went past the house. Nothing is written about it until they reach for one and find the space.',
        },
        {
          upTo: 50,
          behaviour:
            'The player has noticed. They cannot remember the taste of a drink they had every day, or their own phone number, or the end of a joke they told for years. It comes up at odd moments, in the middle of something else, and it is quietly frightening.',
        },
        {
          upTo: 80,
          behaviour:
            'Home has gone thin. The streets are a map with half the names rubbed out, and the player catches themselves thinking in this town’s words. People from home are still whole; the life around them is fading.',
        },
        {
          upTo: 100,
          behaviour:
            'Home is a word the player knows the meaning of and cannot picture. They belong here now whether they chose it or not, which is exactly where Ysolde is, and she will recognise it in their face before they do.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'morning_draw',
      name: 'The Morning Draw',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'Three cards at first light, at arm’s length, that only you can see. Each names one skill in square brackets. Touch one and it is yours, completely and exactly, until you next sleep; the other two fade. Touch none and all three fade when the sun clears the rooftops. Today: [Dragon Tongue], [Perfect Cooking], [Read Lies].',
      loreText:
        'You have kept eight before today: [Speak to Horses] on the third morning, when you stopped a bolting dray horse in the square with one word and a ferry hand saw you do it. Every card kept takes one small memory of home, a tune, a street, a taste, and never says which. River folk call people like you morning-hands, and Haldis says "the morning-handed". Once, the cards offer [The Door Back].',
      icon: 'cards',
    },
    {
      id: 'hill_charter',
      name: 'The Hill Charter',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { old_ways: 2, pleading: 1 },
      description:
        'The town’s lease from the dragon, two hundred and twelve years old, under soot-black glass on the moot hall wall. Three clauses, in an old hand: rent in silver or in a feast worthy of the hill cooked by one pair of hands; the Landlady may come down to collect what is owed; whoever robs the Landlady answers to the Landlady and to no other court.',
      loreText:
        'The third clause means a theft of the rent is the dragon’s to judge and not the circuit’s. Nobody has noticed in a century. The feast clause has been used three times, the last one a hundred and forty years ago.',
      icon: 'scroll',
    },
    {
      id: 'boot_coin',
      name: 'The Coin From Her Boot',
      tags: ['quest', 'evidence'],
      questItem: true,
      description:
        'One silver crown, stamped with the little claw mark the town puts on rent silver. The reeve found it in Nell’s left boot when he searched her at the ferry landing. It is on the evidence table in the moot hall.',
      loreText:
        'Nell’s left boot has a hole in the sole you could put two fingers through. A coin could not have stayed in it on the walk from the strongroom to the river.',
      icon: 'coin',
    },
    {
      id: 'rent_ledger',
      name: 'The Rent Ledger',
      tags: ['document', 'evidence'],
      questItem: true,
      skillModifiers: { questioning: 1, notice: 1 },
      description:
        'The reeve’s ledger of rent weighed and carried up the hill, year by year, in a careful hand.',
      loreText:
        'For the last six years each entry carries the same small note in the margin: "weights corrected". Before that, the note never appears in forty years of entries.',
      icon: 'book',
    },
    {
      id: 'rent_silver',
      name: 'The Rent Silver',
      tags: ['quest', 'treasure'],
      questItem: true,
      description:
        'Silver crowns stamped with the claw mark, packed under a hand’s depth of salt in twelve barrels marked for the salt barge. A double handful is enough to prove what is in the rest.',
      loreText:
        'Six years of it is painted lead. The barrels are in the reeve’s cellar until the barge loads at six in the evening, and aboard the Honest Weight after that. By the charter it belongs to the dragon.',
      icon: 'coin',
    },
    {
      id: 'empty_chest',
      name: 'The Empty Rent Chest',
      tags: ['evidence'],
      description:
        'The iron-bound rent chest, empty, half sunk in the reeds below the ferry landing where somebody wanted it found.',
      loreText:
        'The lock is smashed, but the bolt inside is drawn back clean. Somebody opened it with the key first and broke it afterwards for show. The reeve holds the only key.',
      icon: 'chest',
    },
    {
      id: 'pims_purse',
      name: 'Pim’s Twelve Crowns',
      tags: ['evidence'],
      description: 'A new leather purse with twelve silver crowns in it, under the straw of the watchman’s bunk. More than a watchman earns in a season.',
      loreText: 'The purse is the reeve’s kind: good leather, stitched in town. Pim has spent none of it yet, because spending it would make it real.',
      icon: 'purse',
    },
    {
      id: 'ferry_license',
      name: 'The Ferry License',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The license for the Kettlecross ferry, made out to Maud Farrow, held in the reeve’s strongbox against a debt she died owing.',
      loreText:
        'While he holds it, the reeve takes two-thirds of every crossing. Nell was in his house three nights ago to take it back, which is the one thing she will not tell the court.',
      icon: 'letter',
    },
    {
      id: 'nells_picks',
      name: 'Nell’s Picks',
      tags: ['tools'],
      skillModifiers: { sneak: 2 },
      description: 'Five bent wires in an oilcloth roll, tucked under the bow seat of the chained ferry.',
      loreText: 'She says she gave up picking locks two years ago. The wires are bright from use.',
      icon: 'tools',
    },
    {
      id: 'feast_book',
      name: 'The Hill Feast Book',
      tags: ['document'],
      questItem: true,
      skillModifiers: { cooking: 2, old_ways: 1 },
      description:
        'A grease-stained book on the top shelf of the Kettle kitchen: the three feasts the town cooked for the hill instead of rent, written down by the cooks who made them.',
      loreText:
        'The last feast, a hundred and forty years ago, has a note at the bottom in a different hand: "She ate it all and asked for the cook’s name. Nobody had thought to write it down."',
      icon: 'book',
    },
    {
      id: 'haldis_scale',
      name: 'A Scale From the Hill',
      tags: ['personal', 'token'],
      description: 'A single dull red scale the size of a dinner plate, still warm, given to whoever settled the rent.',
      loreText: 'In two hundred years the town has been given three of these. The other two hang in the moot hall and nobody remembers why.',
      icon: 'gem',
    },
    {
      id: 'lighter',
      name: 'A Lighter From Home',
      tags: ['from home'],
      description: 'A cheap plastic lighter that came through in your apron pocket. Fire at the flick of a thumb is a small wonder here.',
      loreText: 'About a third of the fluid left. You have not told anybody what it is.',
      icon: 'flame',
    },
    {
      id: 'biro',
      name: 'A Biro',
      tags: ['from home'],
      description: 'A ballpoint pen that writes without an inkpot. The reeve would very much like to know where you got it.',
      loreText: 'Half chewed. You used to do that in meetings, back when there were meetings.',
      icon: 'pen',
    },
    {
      id: 'bike_lamp',
      name: 'A Bicycle Lamp',
      tags: ['from home'],
      description: 'A small red lamp that blinks without oil or flame, clipped to your coat. The battery is going.',
      loreText: 'People here would call it witchcraft, so you keep it switched off and in your pocket.',
      icon: 'lamp',
    },
    {
      id: 'deck_of_cards',
      name: 'A Deck of Cards',
      tags: ['from home'],
      skillModifiers: { bluff: 1 },
      description: 'Fifty-two playing cards in a soft box. The locals think it is a fortune deck and will not touch it.',
      loreText: 'It feels like a joke the morning draw is making at your expense.',
      icon: 'cards',
    },
  ],
  /**
   * Every archetype starts with the draw itself (keep one of today's three
   * cards, or none) plus one thing its old life is good at, because the
   * chosen archetype's starting abilities are the only ones the storyteller
   * reads, as "Can:" lines.
   *
   * The six locked abilities, the three card powers, the charter and the two
   * Door choices, are tagged `relic`. A freeform build's ability budget is the
   * presets' mean, and without the tag a player who wrote "I can talk to
   * dragons" would start the morning already holding [Dragon Tongue].
   */
  abilities: [
    {
      id: 'speak_for_her',
      name: 'Speak For Her',
      tags: ['social'],
      description: 'Stand up in front of the court and take on her defence, with everything that costs.',
      affordances: ['i speak for her', 'speak for her', 'defend her', 'raise my hand', 'step forward', 'take her side', 'i will speak'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'pleading', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_your_head_down',
      name: 'Keep Your Head Down',
      tags: ['social'],
      description: 'Say nothing, look at your boots, and let the morning go on without you in it.',
      affordances: ['say nothing', 'stay quiet', 'keep my head down', 'look away', 'do nothing', 'stay out of it', 'walk away'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'press_a_witness',
      name: 'Press a Witness',
      tags: ['social'],
      description: 'Ask the same question a fourth time, politely, until the story comes apart in somebody’s hands.',
      affordances: ['question him', 'press him', 'cross-examine', 'ask the witness', 'interrogate', 'ask pim', 'ask again'],
      costs: [{ resourceId: 'nerve', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'questioning', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'look_closer',
      name: 'Look Closer',
      tags: ['sight'],
      description: 'Study a place or a thing for what is wrong with it.',
      affordances: ['look closer', 'examine', 'inspect', 'search', 'study the lock', 'check the boot', 'look around'],
      costs: [{ resourceId: 'nerve', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_your_way',
      name: 'Talk Your Way',
      tags: ['social'],
      description: 'Bluff, charm or lie your way past somebody who is in your way.',
      affordances: ['lie', 'bluff', 'charm', 'talk my way', 'pretend', 'sweet-talk', 'con him'],
      costs: [
        { resourceId: 'nerve', amount: 6 },
        { resourceId: 'whispers', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluff', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_in',
      name: 'Slip In',
      tags: ['stealth'],
      description: 'Get into somewhere you were not let in: a cellar, a cell, a cabin.',
      affordances: ['sneak in', 'break in', 'pick the lock', 'slip in', 'climb in', 'get in unseen', 'break her out'],
      costs: [
        { resourceId: 'nerve', amount: 8 },
        { resourceId: 'whispers', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'sneak', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'strike_a_bargain',
      name: 'Strike a Bargain',
      tags: ['social'],
      description: 'Get a price, a promise or a delay out of somebody who holds the better hand.',
      affordances: ['make a deal', 'bargain', 'negotiate', 'haggle', 'sign', 'strike a deal', 'offer terms'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'haggle', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_something',
      name: 'Cook Something',
      tags: ['utility'],
      description: 'Feed somebody with what is in the larder, as well as you can without a card.',
      affordances: ['cook', 'make food', 'make breakfast', 'feed her', 'make a meal', 'help in the kitchen'],
      costs: [{ resourceId: 'nerve', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight',
      name: 'Fight',
      tags: ['combat'],
      description: 'Hit somebody with what you have, and take what comes back.',
      affordances: ['hit', 'punch', 'fight', 'attack', 'tackle', 'shove', 'swing at'],
      costs: [{ resourceId: 'nerve', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawl', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_with_her',
      name: 'Stay With Her',
      tags: ['social'],
      description: 'Sit with somebody who is frightened, and do not try to fix anything.',
      affordances: ['stay with her', 'sit with her', 'keep her company', 'hold her hand', 'wait with her'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'let_them_fade',
      name: 'Let Them Fade',
      tags: ['utility'],
      description: 'Touch none of the cards and let all three go when the sun clears the roofs.',
      affordances: ['let them fade', 'take none', 'ignore the cards', 'refuse the cards', 'keep nothing', 'let them go'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_read_lies',
      name: 'Keep Read Lies',
      tags: ['utility'],
      description: 'Touch [Read Lies] and keep it until you sleep. The other two cards fade.',
      affordances: ['touch read lies', 'keep read lies', 'take read lies', 'choose read lies', 'pick read lies'],
      costs: [{ resourceId: 'forgetting', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsUnset: ['drew_today'],
        lockedCopy: 'One card a morning, and this morning’s is already chosen.',
      },
    },
    {
      id: 'keep_dragon_tongue',
      name: 'Keep Dragon Tongue',
      tags: ['utility'],
      description: 'Touch [Dragon Tongue] and keep it until you sleep. The other two cards fade.',
      affordances: ['touch dragon tongue', 'keep dragon tongue', 'take dragon tongue', 'choose dragon tongue', 'pick dragon tongue'],
      costs: [{ resourceId: 'forgetting', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsUnset: ['drew_today'],
        lockedCopy: 'One card a morning, and this morning’s is already chosen.',
      },
    },
    {
      id: 'keep_perfect_cooking',
      name: 'Keep Perfect Cooking',
      tags: ['utility'],
      description: 'Touch [Perfect Cooking] and keep it until you sleep. The other two cards fade.',
      affordances: ['touch perfect cooking', 'keep perfect cooking', 'take perfect cooking', 'choose perfect cooking', 'pick perfect cooking'],
      costs: [{ resourceId: 'forgetting', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsUnset: ['drew_today'],
        lockedCopy: 'One card a morning, and this morning’s is already chosen.',
      },
    },
    {
      id: 'read_lies',
      name: 'Read Lies',
      tags: ['sight', 'relic'],
      description: 'Hear a spoken lie ring false the moment it is said. Silence and half-truths stay silent.',
      affordances: ['listen for the lie', 'is he lying', 'hear the lie', 'read him', 'check if she is lying', 'use read lies'],
      costs: [{ resourceId: 'nerve', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['kept:read_lies'],
        flagsUnset: ['first_draw_spent'],
        lockedCopy: 'You did not keep that card this morning, or you have slept since. It is gone.',
      },
    },
    {
      id: 'dragon_tongue',
      name: 'Dragon Tongue',
      tags: ['social', 'relic'],
      description: 'Speak and understand the language of dragons, perfectly, until you sleep.',
      affordances: ['speak dragon', 'talk to the dragon', 'call to the hill', 'answer her in her own tongue', 'use dragon tongue', 'speak to haldis'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['kept:dragon_tongue'],
        flagsUnset: ['first_draw_spent'],
        lockedCopy: 'You did not keep that card this morning, or you have slept since. It is gone.',
      },
    },
    {
      id: 'perfect_cooking',
      name: 'Perfect Cooking',
      tags: ['utility', 'relic'],
      description: 'Cook anything perfectly with whatever is to hand. Perfect, not fast, and not magic.',
      affordances: ['cook perfectly', 'cook a feast', 'use perfect cooking', 'cook the feast', 'make the perfect meal', 'cook her last meal'],
      costs: [{ resourceId: 'nerve', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['kept:perfect_cooking'],
        flagsUnset: ['first_draw_spent'],
        lockedCopy: 'You did not keep that card this morning, or you have slept since. It is gone.',
      },
    },
    {
      id: 'invoke_the_charter',
      name: 'Invoke the Charter',
      tags: ['social', 'relic'],
      description: 'Read the Hill Charter’s third clause aloud to a court that has never heard it.',
      affordances: ['invoke the charter', 'read the clause', 'cite the charter', 'the landlady judges', 'no right to try her', 'show the charter'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'pleading', baseDc: 11 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_charter_clause'],
        lockedCopy: 'You have not read the charter closely enough to quote it at a knight.',
      },
    },
    {
      id: 'take_the_door',
      name: 'Take the Door',
      tags: ['utility', 'relic'],
      description: 'Keep [The Door Back]. It takes you home at the next sundown, and until then you are still here.',
      affordances: ['take the door', 'go home', 'keep the door back', 'touch the door back', 'choose home'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['door_offered'],
        lockedCopy: 'The cards have never offered you a way home.',
      },
    },
    {
      id: 'keep_what_they_need',
      name: 'Keep What They Need',
      tags: ['utility', 'relic'],
      description: 'Keep one of the other two cards, the one somebody here needs, and let the way home fade.',
      affordances: ['keep the other card', 'choose to stay', 'keep what they need', 'let the door go', 'pick the card for them'],
      costs: [{ resourceId: 'forgetting', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['door_offered'],
        lockedCopy: 'The cards have never offered you a way home, so there is nothing to give up for anybody.',
      },
    },
  ],
  locations: [
    {
      id: 'ford_square',
      name: 'Ford Square',
      shortName: 'The Square',
      description:
        'The cobbled heart of Kettlecross: a gallows used twice a decade, a trestle table where the circuit holds its dawn assize, the town well, and a bell tower that has leaned since the dragon sat on it sixty-one years ago. The noon bell is rung from there. From the square you can see the hill, and on a still morning you can hear it breathe.',
      artDirection:
        'Cobbled market square of a small riverside fantasy town at dawn, an empty wooden gallows frame with no rope or noose, a trestle table, a well, a stone bell tower leaning visibly to one side, a crowd in rough wool and oilskin, a great red-brown hill above the roofs. Cold gold light.',
      connections: [
        { to: 'the_crooked_kettle', travelMinutes: 2, label: 'The inn on the corner' },
        { to: 'moot_hall', travelMinutes: 1, label: 'Up the moot hall steps' },
        { to: 'the_lockup', travelMinutes: 1, label: 'Round to the cell under the tower' },
        { to: 'the_watch_house', travelMinutes: 2, label: 'Along to the north gate' },
        { to: 'reeves_house', travelMinutes: 3, label: 'The tall house on the river side' },
        { to: 'the_ferry_landing', travelMinutes: 5, label: 'Down to the river' },
        { to: 'the_hill_road', travelMinutes: 8, label: 'Out to the hill road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_crooked_kettle',
      name: 'The Crooked Kettle',
      shortName: 'The Kettle',
      description:
        'The only inn in Kettlecross, with a common room of six tables and a hearth, a loft where the stranger has slept on credit for eight nights, and a slate behind the bar with the stranger’s debt chalked on it in Ysolde’s square hand. It smells of bread from five in the morning onwards.',
      artDirection:
        'Warm low-beamed fantasy inn common room, six scrubbed tables, a big stone hearth, a chalk slate behind the bar, a ladder to a hayloft, morning light through small windows. Homely and smoky.',
      connections: [
        { to: 'ford_square', travelMinutes: 2, label: 'Out to the square' },
        { to: 'kettle_kitchen', travelMinutes: 1, label: 'Through to the kitchen' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'kettle_kitchen',
      name: 'The Kettle Kitchen',
      shortName: 'Kitchen',
      description:
        'Ysolde’s kitchen: a range that runs hot on the left, a larder with a whole ham, river eels, onions older than the stranger, flour, eggs and a crock of good butter, and a grease-stained book on the top shelf that nobody has opened in years. Big enough for one cook to make a feast if the cook is very good.',
      artDirection:
        'Busy medieval-fantasy inn kitchen, iron range, hanging pans, a larder door open on hams and onions, flour on a scrubbed table, a high shelf with one old book. Hot, golden, crowded.',
      connections: [{ to: 'the_crooked_kettle', travelMinutes: 1, label: 'Back to the common room' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [
        { itemId: 'feast_book', qty: 1, ownerId: 'ysolde', aka: ['book', 'the old book', 'the feast book', 'the recipe book', 'the book on the shelf'] },
      ],
    },
    {
      id: 'moot_hall',
      name: 'The Moot Hall',
      shortName: 'Moot Hall',
      description:
        'The town’s hall of business: a long room with the evidence table laid out for the assize, the strongroom door with its smashed lock, the reeve’s desk and ledgers, and on the far wall, under glass gone black with a century of soot, the Hill Charter. Two old dragon scales hang beside it and nobody remembers why. Sir Garrot sleeps here on circuit, in a chair, in his armour.',
      artDirection:
        'Stone-walled town hall interior, a long table with laid-out evidence, an iron strongroom door with a broken lock, a framed parchment under sooty glass, two huge red scales mounted on the wall, a suit of black armour on a chair. Dusty shafts of light.',
      connections: [{ to: 'ford_square', travelMinutes: 1, label: 'Down the steps to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [
        { itemId: 'hill_charter', qty: 1, ownerId: null, aka: ['charter', 'the lease', 'the hill charter', 'the parchment', 'the thing under the glass'] },
        { itemId: 'boot_coin', qty: 1, ownerId: 'garrot', aka: ['coin', 'the coin', 'the evidence', 'the silver crown'] },
        { itemId: 'rent_ledger', qty: 1, ownerId: 'cotter', aka: ['ledger', 'the ledgers', 'the rent book', 'the accounts'] },
      ],
    },
    {
      id: 'the_lockup',
      name: 'The Lockup',
      shortName: 'Lockup',
      description:
        'A stone cell under the bell tower with one barred window at cobble height, a bench, a bucket, and two circuit men on the door who are bored and not cruel. A speaker may sit with the condemned. Through the bars you can see boots crossing the square and, if you lie on the floor, the hill.',
      artDirection:
        'Cramped stone cell beneath a tower, a single barred window at street level letting in dusty light, a wooden bench, a heavy door with two armoured guards outside. Close and dim.',
      connections: [{ to: 'ford_square', travelMinutes: 1, label: 'Back up into the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_watch_house',
      name: 'The North Gate Watch House',
      shortName: 'Watch House',
      description:
        'A one-room stone hut beside the north gate with a brazier, a bunk, a rack for a cudgel and a lantern, and a stool by the door where the night watchman is supposed to stay awake. The straw in the bunk has been moved recently, by somebody hiding something badly.',
      artDirection:
        'Small stone guardhouse beside a timber town gate, a brazier, a narrow straw bunk, a lantern on a hook, a stool by the door. Plain and shabby.',
      connections: [{ to: 'ford_square', travelMinutes: 2, label: 'Back along to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [
        { itemId: 'pims_purse', qty: 1, ownerId: 'pim', aka: ['purse', 'the money', 'his purse', 'the crowns', 'the bribe'] },
      ],
    },
    {
      id: 'reeves_house',
      name: 'The Reeve’s House',
      shortName: 'Reeve’s House',
      description:
        'The tallest house in Kettlecross, three storeys of good stone facing the river, with a polished brass knocker and an office on the ground floor where the reeve keeps a strongbox. There is a cellar door in the kitchen passage with a new lock on it, and the passage floor has fresh scrapes, as if something heavy was rolled.',
      artDirection:
        'Prosperous three-storey stone townhouse interior, a tidy office with a strongbox and ledgers, a kitchen passage with a newly locked cellar door, scrape marks on flagstones. Neat and slightly too clean.',
      connections: [
        { to: 'ford_square', travelMinutes: 3, label: 'Back to the square' },
        { to: 'reeves_cellar', travelMinutes: 1, lockedByFlag: 'knows:the_cellar', label: 'The cellar door with the new lock' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [
        { itemId: 'ferry_license', qty: 1, ownerId: 'cotter', aka: ['license', 'the ferry license', 'the paper', 'the strongbox'] },
      ],
    },
    {
      id: 'reeves_cellar',
      name: 'The Reeve’s Cellar',
      shortName: 'Cellar',
      description:
        'A long, cold cellar under the reeve’s house with twelve salt barrels stencilled for the Lowmere Salt Bank, each one far too heavy for salt. At the river end there is a low water door that opens onto the ferry landing at night. The air smells of brine and lamp oil.',
      artDirection:
        'Dark stone cellar lit by one lantern, a row of twelve wooden salt barrels with stencilled marks, one pried open with silver glinting under white salt, a low arched water door at the far end. Damp and secret.',
      connections: [
        { to: 'reeves_house', travelMinutes: 1, label: 'Up the stairs' },
        { to: 'the_ferry_landing', travelMinutes: 4, label: 'Out through the water door' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'rent_silver', qty: 1, ownerId: 'haldis', aka: ['silver', 'the coins', 'the rent', 'the barrels', 'a handful of silver'] },
      ],
    },
    {
      id: 'the_ferry_landing',
      name: 'The Ferry Landing',
      shortName: 'The Landing',
      description:
        'A timber jetty on the brown river where Nell’s ferry sits chained by order of the circuit, the salt barge Honest Weight is moored with its plank down, and the reeds below hide things people want found. Twelve salt barrels go aboard here at six in the evening. A low arched door in the reeve’s river wall opens onto it.',
      artDirection:
        'Wooden river jetty in a fantasy town, a flat ferry chained to a post, a long salt barge moored with a gangplank, reeds along the bank, a low arched door in a stone wall at the water’s edge. Misty river light.',
      connections: [
        { to: 'ford_square', travelMinutes: 5, label: 'Up into town' },
        { to: 'the_barge', travelMinutes: 1, label: 'Up the gangplank' },
        { to: 'reeves_cellar', travelMinutes: 4, lockedByFlag: 'knows:the_cellar', label: 'The water door in the reeve’s wall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'empty_chest', qty: 1, ownerId: null, aka: ['chest', 'the rent chest', 'the box in the reeds', 'the iron chest'] },
        { itemId: 'nells_picks', qty: 1, ownerId: 'nell', aka: ['picks', 'lockpicks', 'the wires', 'her tools'] },
      ],
    },
    {
      id: 'the_barge',
      name: 'The Honest Weight',
      shortName: 'The Barge',
      description:
        'The Lowmere Salt Bank’s barge: sixty feet of tarred deck, a hold half full of real salt, two bargemen who do not ask questions, and a stern cabin with a desk, a lamp and a factor in it. It sails downriver at sundown, loaded or not.',
      artDirection:
        'Long flat river barge with tarred planks, coils of rope, salt sacks and barrels on deck, a small stern cabin with a lit lamp and a writing desk visible through the door. Workmanlike and orderly.',
      connections: [{ to: 'the_ferry_landing', travelMinutes: 1, label: 'Down the gangplank' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_hill_road',
      name: 'The Hill Road',
      shortName: 'Hill Road',
      description:
        'A switchback track of red gravel up the dragon’s hill, steep enough to stop for breath every bend. Halfway up is the Rent Stone, a flat table of rock worn smooth where the chest is left every Rent Day, with nothing on it this year. Above it the heather is scorched in long stripes.',
      artDirection:
        'Steep switchback gravel road up a huge red-brown hill above a small river town, scorched heather in long stripes, a flat worn altar stone at a bend with nothing on it, the town and river far below. Wide sky.',
      connections: [
        { to: 'ford_square', travelMinutes: 8, label: 'Back down into town' },
        { to: 'the_hollow', travelMinutes: 35, label: 'On up to the top' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'the_hollow',
      name: 'The Hollow',
      shortName: 'The Hollow',
      description:
        'The scorched bowl at the top of the hill, wide enough to hold the whole of Ford Square twice over, floored with glassy black rock and two centuries of bones from the river’s cattle. Haldis sleeps in the middle of it, and from more than fifty paces she looks like part of the hill. The air is warm, all year.',
      artDirection:
        'Vast scorched hollow at a hilltop, black glassy rock, scattered old bones, heat shimmer, and an enormous dull-red dragon curled asleep in the centre like a hill, one horn broken short, one eye half open. Epic and quiet.',
      connections: [{ to: 'the_hill_road', travelMinutes: 30, label: 'Back down the road' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -3 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_kettlecross',
      name: 'The Townsfolk of Kettlecross',
      description:
        'Nine hundred people who pay a dragon rent, distrust strangers, love a hanging they do not have to watch, and remember the bell tower. They take their lead from the reeve because the reeve has always been right.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The Stranger' },
        { atReputation: 25, label: 'A Known Face' },
        { atReputation: 45, label: 'One of Ours' },
        { atReputation: 70, label: 'Asked First' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_circuit',
      name: 'The Lord’s Circuit',
      description:
        'The lord’s justice on the river: Sir Garrot, two men-at-arms, a book of law and a list of towns. It does not care who you are. It cares whether you lied to it.',
      startingReputation: 0,
      ranks: [
        { atReputation: -30, label: 'Under Suspicion' },
        { atReputation: 0, label: 'On the Record' },
        { atReputation: 15, label: 'A Speaker Heard' },
        { atReputation: 40, label: 'Friend of the Court' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_river',
      name: 'The River Folk',
      description:
        'Ferry hands, bargemen, eel fishers and the women who mend their nets. Nell is one of theirs, and they think a morning-hand in town means a funeral or a fortune.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'A Landsman' },
        { atReputation: 25, label: 'Ferry-Known' },
        { atReputation: 50, label: 'River Kin' },
      ],
      allies: [],
      enemies: ['faction_salt_bank'],
    },
    {
      id: 'faction_salt_bank',
      name: 'The Lowmere Salt Bank',
      description:
        'A downriver bank that lends against salt, ferries and futures, and keeps its word to the letter. Its factor is aboard the barge, and it once owned a morning-hand’s contract.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Not a Client' },
        { atReputation: 20, label: 'Of Interest' },
        { atReputation: 50, label: 'Under Contract' },
      ],
      allies: [],
      enemies: ['faction_river'],
    },
  ],
  characters: [
    {
      id: 'nell',
      name: 'Nell Farrow',
      calledName: 'Nell',
      role: 'Ferry hand, former pickpocket, and the woman they are hanging at noon',
      cardBlurb:
        'She picked your purse on your first day and put a copper back out of pity. She swears she did not steal the dragon’s rent, she hangs at noon for it, and of everybody in the square she is looking at you.',
      pronouns: 'she/her',
      publicTraits: ['Jokes when she is frightened', 'Never asks for help directly', 'Knows every boat and back door in town'],
      hiddenDrives: [
        'She watched the stranger stop a bolting dray horse with one word on their third morning, and has decided strange is the only thing left in the square that might help her',
        'She wants to be believed once, about anything, by somebody who has no reason to',
      ],
      values: ['Paying back what she owes, including pity', 'The river looking after its own'],
      fears: [
        'Dying as the town’s idea of her',
        'Owing a stranger something she cannot pay back',
      ],
      socialStyle:
        'Teases first, tests second, and only tells you anything real once you have stopped trying to get it out of her. Looks you in the eye when she lies, which is how you can tell.',
      boundaries: [
        'Will not beg anybody, including the knight, including you',
        'Will not tell the court where she really was that night, because it puts her in the reeve’s house with her picks',
      ],
      goals: ['Be alive at one o’clock', 'Get her mother’s ferry license back from the reeve'],
      secrets: [
        {
          id: 'nell_the_night',
          fact: 'On the night of the theft she was burgling the reeve’s house for her mother’s ferry license. She heard barrels rolled into his cellar and saw the iron corner of the rent chest go down the stairs.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you sit with her in the lockup and tell her something true about yourself first, or if you cook her a meal nobody in this town could have made.',
        },
        {
          id: 'nell_the_boot',
          fact: 'Her left boot has had a hole in the sole since spring. She knows the coin was put there after she was searched, and she knows who searched her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She points at her own boot and laughs if anybody asks her how the coin got there, and waits to see if they understand.',
        },
      ],
      speechStyle:
        'Quick, dry and short, with river slang. Calls you "stranger" until she stops, and the day she stops matters. Jokes in the worst moment on purpose and never says please.',
      topics: ['the ferry', 'her mother', 'the reeve', 'the river', 'the night of the theft', 'the stranger’s horse trick', 'the noon bell'],
      voiceSamples: [
        'Morning, stranger. You picked a grim day to come sightseeing.',
        'Purses, apples, a priest’s hat once. Never anything with a dragon on the other end of it.',
        'First day you got here I lifted your purse. Found a little paper ticket with a picture of a bus on it and nothing else. Put a copper back out of pity. Look at us now.',
        'My lip’s fine. The rope’s the problem.',
      ],
      appearance:
        'Twenty-four, a wiry woman of middling height, sun-browned skin, dark brown hair hacked short with a knife, grey-green eyes, a faded mustard-yellow oilskin ferry coat two sizes too big with the sleeves rolled back four times, a blue river kerchief knotted at the throat, brown canvas breeches, and patched boots with a hole in the left sole.',
      visualHook: 'A mustard-yellow oilskin ferry coat two sizes too big, and a crooked grin she refuses to give up.',
      silhouette: 'Chin up, shoulders back, hands shoved deep in the pockets of a coat made for somebody larger.',
      artSeed: 'tsam-nell-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'defiant', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_lockup', activity: 'awake on the cell bench, counting boots through the bars' },
        { startMinute: 330, endMinute: 450, locationId: 'ford_square', activity: 'in irons beside the gallows while the assize finishes' },
        { startMinute: 450, endMinute: 720, locationId: 'the_lockup', activity: 'back in the cell under the bell tower, waiting for noon' },
        { startMinute: 720, endMinute: 1440, locationId: 'the_ferry_landing', activity: 'at her chained ferry, if she is free to be anywhere' },
      ],
      homeLocationId: 'the_lockup',
      knowledgeScope: ['nell', 'the_river', 'the_ferry', 'the_reeve', 'the_theft_night', 'kettlecross'],
      startingRelationship: { trust: 20, affection: 15, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nell_tells_the_truth',
          label: 'She tells you where she really was that night',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'nell_stops_saying_stranger',
          label: 'She calls you by your name',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60, flagsSet: ['noon_passed_with_her_alive'] },
        },
      ],
      attributes: { might: 10, agility: 15, mind: 13, presence: 13, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 6, tags: ['quick', 'knife', 'river'] },
    },
    {
      id: 'garrot',
      name: 'Sir Garrot Dunmere',
      calledName: 'Garrot',
      role: 'The lord’s circuit justiciar, who holds the dawn assize and hangs at noon',
      cardBlurb:
        'He has asked "does anyone speak for her" fourteen times in eleven years and nobody has ever answered. If you do, he will hear you out with perfect courtesy, and hang her anyway unless you bring him one of five lawful reasons.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to everybody including the condemned', 'Never early, never late', 'Unmovable by tears', 'The best sword on the river, and never draws it in anger'],
      hiddenDrives: [
        'He wants, once, for somebody to answer the question he asks three times',
        'He is afraid the law he serves is only a rope that holds until it does not',
      ],
      values: ['The law kept exactly, because it is the only thing between the river towns and blood feud', 'Every condemned person getting one last morning'],
      fears: ['A second Wat Kell', 'Becoming a man who asks the question without hoping for an answer'],
      socialStyle:
        'Formal and patient. Lets a speaker finish every sentence, repeats the important part back exactly, and then decides. Physically very still until he is not.',
      boundaries: [
        'Will not stop a hanging for pleading, bribes, tears or rank; only for one of the five lawful reasons',
        'Will not ring the noon bell early or late, for anybody',
      ],
      goals: ['Finish the Kettlecross assize lawfully by noon', 'Ride on to the next river town by tomorrow'],
      secrets: [
        {
          id: 'garrot_wat_kell',
          fact: 'Eleven years ago at Hobb’s Mill he hanged a drover named Wat Kell for a killing. A month later the real killer confessed. He carries Wat’s tin whistle and has asked three times at every assize since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it, briefly and without excusing himself, to a speaker who has stood in front of him and argued well, whether or not they won.',
        },
      ],
      speechStyle:
        'Formal, no contractions, thinks in threes. Legal phrasing worn smooth with use. Addresses a speaker as "Speaker" and the condemned by their full name.',
      topics: ['the law', 'the five reasons', 'the circuit', 'the noon bell', 'Wat Kell', 'Hobb’s Mill'],
      voiceSamples: [
        'Three times I ask. I have asked fourteen times in eleven years, and been answered never.',
        'Bring me a witness proven false, the wronged party’s pardon, or a court with no right to sit. Bring me anything else and I will hear it courteously and hang her regardless.',
        'You have until the bell, Speaker. I do not ring it early and I do not ring it late.',
        'Every condemned person is owed one last morning. That is why we hang at noon. It is the only mercy the circuit has.',
      ],
      appearance:
        'Fifty-two, a broad, heavy-shouldered man, close-cropped iron-grey hair and a short square grey beard, deep-set steel-grey eyes, black-enamelled half-plate scuffed silver at every edge over a dark red quilted gambeson, black leather gloves, a long sword sheathed at his hip, and a thick book of law chained to his belt.',
      visualHook: 'A thick book of law chained to his belt like a second sword.',
      silhouette: 'Square and motionless, one gloved hand raised, the other resting on the book.',
      artSeed: 'tsam-garrot-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grave', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'moot_hall', activity: 'upright in a chair in the moot hall, armour on, eyes closed' },
        { startMinute: 330, endMinute: 480, locationId: 'ford_square', activity: 'holding the dawn assize at the trestle table' },
        { startMinute: 480, endMinute: 690, locationId: 'moot_hall', activity: 'reading the case again and receiving any speaker' },
        { startMinute: 690, endMinute: 750, locationId: 'ford_square', activity: 'at the gallows for the noon bell' },
        { startMinute: 750, endMinute: 1080, locationId: 'moot_hall', activity: 'writing up the assize in the record' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_crooked_kettle', activity: 'alone at the corner table with bread and salt' },
        { startMinute: 1260, endMinute: 1440, locationId: 'moot_hall', activity: 'cleaning his armour by one candle' },
      ],
      homeLocationId: 'moot_hall',
      knowledgeScope: ['the_law', 'the_circuit', 'the_case', 'wat_kell', 'river_towns'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'garrot_hears_you',
          label: 'He treats you as a speaker rather than a stranger',
          kind: 'TRUST',
          requires: { respect: 30, flagsSet: ['speaker'] },
        },
        {
          id: 'garrot_tells_of_wat',
          label: 'He tells you about Hobb’s Mill',
          kind: 'TRUST',
          requires: { trust: 45, respect: 50 },
        },
      ],
      attributes: { might: 17, agility: 12, mind: 14, presence: 15, resolve: 17, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 90, defenseDc: 18, damage: 14, tags: ['knight', 'plate', 'circuit'] },
    },
    {
      id: 'haldis',
      name: 'Haldis',
      role: 'The dragon who owns the hill, the ford and the town’s lease, and the party who was robbed',
      cardBlurb:
        'She is about four hundred years old, her rent was stolen three nights ago, and she is coming down at sundown whatever happens. If you kept the right card this morning, you are the first person in sixty-one winters she can actually talk to.',
      pronouns: 'she/her',
      publicTraits: ['Pedantic about weights and clauses', 'Bored to her bones', 'Curious about anything new'],
      hiddenDrives: [
        'She does not need the silver. The yearly rent is the only conversation she has had with people in two centuries, and she wants it kept',
        'She has met four morning-hands and liked all of them, and she wants to know if the fifth will ask the same question',
      ],
      values: ['A bargain kept to the letter', 'Being spoken to properly'],
      fears: ['Becoming a story the town tells instead of a party to a bargain', 'Sleeping through the century everybody she knows dies in'],
      socialStyle:
        'Enormous patience until a clause is broken. Answers a question with a longer question. Treats every human as a tenant, which from her is nearly affectionate.',
      boundaries: [
        'Will not forgive a broken bargain because somebody is sorry; only because it is put right',
        'Will not harm a tenant who speaks to her properly, whatever they have done',
      ],
      goals: ['Collect her rent by sundown, in silver or in something better', 'Find out who has been short-weighting it for six years'],
      secrets: [
        {
          id: 'haldis_noticed',
          fact: 'She noticed the short weight six years ago and said nothing, waiting to see whether the town would catch its own thief. It did not, and this year she is coming down regardless.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it straight out to anybody who speaks to her in her own tongue and asks where the rent went, rather than begging her for time.',
        },
        {
          id: 'haldis_the_door',
          fact: 'She knows the morning cards. The player is the fifth morning-hand she has met, Ysolde was the fourth, and she knows that once, the cards offer the way home.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you ask her what happened to the other four.',
        },
      ],
      speechStyle:
        'Slow and vast, every sentence weighed. Counts time in winters and silver by the calf-weight. Calls people "tenant". Without [Dragon Tongue] she sounds like a forge breathing and nothing else.',
      topics: ['the rent', 'the charter', 'the bell tower', 'the other morning-hands', 'weights and measures', 'the town as it used to be'],
      voiceSamples: [
        'Tenant. You speak properly. Nobody has spoken properly to me in sixty-one winters.',
        'Six years the chest has come up light. A sixth part lead, painted. Did they think I weigh with my eyes?',
        'I do not want the silver. I want the bargain. A bargain is a conversation that lasts two hundred years.',
        'You are the fifth of your kind I have met. The other four all asked me one question, and so will you.',
      ],
      appearance:
        'About four hundred years old and the size of a tithe barn: a dragon scaled the dull red of a cooling forge, darker and cracked like old slate along the spine, one horn broken short, ember-orange eyes like banked coals, a long heavy neck, and folded leathery wings furred with moss and gravel where she has lain still for decades. Asleep, she looks like part of the hill.',
      visualHook: 'One horn broken short, and a slow curl of smoke from her nostrils when she is thinking.',
      silhouette: 'A hill with a spine, curled tail to snout, one huge eye half open.',
      artSeed: 'tsam-haldis-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'curious', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'the_hollow', activity: 'curled in the Hollow, one eye a little open' },
      ],
      homeLocationId: 'the_hollow',
      knowledgeScope: ['the_charter', 'the_rent', 'morning_hands', 'the_door_back', 'kettlecross_history', 'ysolde'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'haldis_listens',
          label: 'She listens instead of collecting',
          kind: 'TRUST',
          requires: { respect: 25, flagsSet: ['kept:dragon_tongue'] },
        },
        {
          id: 'haldis_tells_of_the_others',
          label: 'She tells you about the other four',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
      ],
      attributes: { might: 30, agility: 9, mind: 18, presence: 22, resolve: 20, arcana: 24 },
      companion: null,
      scouting: null,
      combatant: { health: 900, defenseDc: 30, damage: 80, tags: ['dragon', 'ancient', 'fire'] },
    },
    {
      id: 'ysolde',
      name: 'Ysolde Marr',
      calledName: 'Ysolde',
      role: 'Keeper of the Crooked Kettle, who gave the stranger a bed on credit',
      cardBlurb:
        'She gave you a bed on credit eight nights ago without asking a single question, which in this town is a very loud thing to do. She knows exactly what your eyes are doing at dawn, and she is not going to say so first.',
      pronouns: 'she/her',
      publicTraits: ['Answers questions with chores', 'Feeds people before she lets them talk', 'Never goes to a hanging'],
      hiddenDrives: [
        'She wants the lodger to choose better than she did, or exactly as she did, and cannot decide which',
        'She wants somebody to know her real name, and she cannot remember it',
      ],
      values: ['Feeding people properly', 'Minding your own business until it becomes somebody else’s life'],
      fears: ['Watching another morning-hand forget themselves one morning at a time', 'Being found out by the town after twenty-three years'],
      socialStyle:
        'Gruff, practical, kind with her hands rather than her mouth. Puts a bowl in front of you, then a knife, then a job, and the conversation happens around the job.',
      boundaries: [
        'Will not tell the town what the lodger is, whatever it costs her',
        'Will not go up the hill road, and will not say why',
      ],
      goals: ['Keep the lodger fed and alive through Rent Day', 'Keep her own secret one more year'],
      secrets: [
        {
          id: 'ysolde_morning_hand',
          fact: 'She fell into this world twenty-three years ago. She kept a card every morning for four years and was offered [The Door Back] the morning the ferryman Tobias was crushed under the ferry winch. She kept [Mend Bone], saved him and married him. She never kept another card after that, and the cards stopped coming after thirty untouched mornings. Tobias died of a fever six years ago.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you in her kitchen, late, if you tell her you have lost a memory you cannot get back.',
        },
        {
          id: 'ysolde_the_name',
          fact: 'She has forgotten her own first name. Ysolde was Tobias’s mother’s name, and she took it the year she stayed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after she has told you she is a morning-hand, and only if you ask her what she was called before.',
        },
      ],
      speechStyle:
        'Dry, gruff, short imperatives with the kitchen in them. Calls the player "lodger". Talks about the slate when she means she is worried.',
      topics: ['the slate', 'the kitchen', 'Tobias', 'the feast book', 'what the lodger does at dawn', 'the hill road'],
      voiceSamples: [
        'Sit. Eat that. You can save a neck on a full stomach as easily as an empty one.',
        'You owe me eight nights, lodger. This bowl goes on the slate and you are not to argue.',
        'Every dawn your eyes go up and left, to nothing, and stay there a while. Mine used to do that.',
        'I had a name once that wasn’t Ysolde. I’ve been trying to remember the first letter of it for eleven years.',
      ],
      appearance:
        'Forty-seven, a solid, broad-armed woman, olive skin dusted with flour, black hair with one grey streak pinned up in a knot with a steel cooking skewer, dark brown eyes, a faded green work dress with the sleeves rolled to the elbow, a long stained canvas apron, and a burn scar across the back of her left hand.',
      visualHook: 'A steel cooking skewer pinned through her hair, which she pulls out to test the meat and puts back.',
      silhouette: 'Fists on hips in a kitchen doorway, apron on, steam behind her.',
      artSeed: 'tsam-ysolde-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'warm', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_crooked_kettle', activity: 'asleep in the back room off the common room' },
        { startMinute: 300, endMinute: 720, locationId: 'kettle_kitchen', activity: 'baking bread, then the noon stew, with the door shut' },
        { startMinute: 720, endMinute: 900, locationId: 'the_crooked_kettle', activity: 'behind the bar, serving the people who watched' },
        { startMinute: 900, endMinute: 1140, locationId: 'kettle_kitchen', activity: 'cooking supper for twenty' },
        { startMinute: 1140, endMinute: 1440, locationId: 'the_crooked_kettle', activity: 'wiping tables and watching the door' },
      ],
      homeLocationId: 'the_crooked_kettle',
      knowledgeScope: ['morning_hands', 'the_cards', 'the_door_back', 'kettlecross', 'the_feast_book', 'tobias'],
      startingRelationship: { trust: 45, affection: 40, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ysolde_admits_it',
          label: 'She tells you she was a morning-hand too',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:the_cost'] },
        },
        {
          id: 'ysolde_family',
          label: 'She takes you off the slate',
          kind: 'ALLIANCE',
          requires: { trust: 65, affection: 55 },
        },
      ],
      attributes: { might: 12, agility: 10, mind: 14, presence: 13, resolve: 16, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 12, damage: 6, tags: ['ladle', 'stubborn'] },
    },
    {
      id: 'cotter',
      name: 'Anselm Cotter',
      calledName: 'Cotter',
      role: 'The town reeve, who keeps the keys and the ledgers, and who found the coin in her boot',
      cardBlurb:
        'He found the coin in her boot, he will tell you so very reasonably, and every word of it is technically true. If her case falls apart before noon, the next stranger he points at is you.',
      pronouns: 'he/him',
      publicTraits: ['Reasonable in public', 'Generous to the poor where people can see', 'Never once caught in a lie'],
      hiddenDrives: [
        'He wants the barrels on the barge by sundown and the whole thing to become a sad story about a thief',
        'He does not really believe the dragon will come; he has never once seen her move',
      ],
      values: ['Order, because order keeps the reeve in the tall house', 'Never saying a false sentence, so nothing can be proved'],
      fears: ['The ledger read by somebody who can read', 'The factor deciding he is not worth waiting for'],
      socialStyle:
        'Smooth, warm, civic. Agrees with you first and then explains why it does not apply. Answers the question next to the one you asked.',
      boundaries: [
        'Will never state an outright falsehood aloud; he phrases around it',
        'Will not go up the hill road under any circumstances',
      ],
      goals: ['See Nell hanged at noon', 'Get twelve barrels aboard the Honest Weight by sundown'],
      secrets: [
        {
          id: 'cotter_six_years',
          fact: 'For six years he has swapped a sixth of the rent silver for painted lead to pay a debt to the Lowmere Salt Bank. Three nights ago he opened the strongroom with his own key, broke the lock afterwards, moved the silver into salt barrels in his cellar, paid Pim twelve crowns, and put the coin in Nell’s boot himself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He never confesses. It comes out of the ledger, the barrels, Pim, Nell, or the dragon, and when it does he tries to make a deal before he tries anything else.',
        },
      ],
      speechStyle:
        'Smooth and civic, says "we" for the town and "in fairness" before anything unfair. Speaks only in sentences he can defend word by word, so he talks around things rather than through them.',
      topics: ['the ledgers', 'the town', 'the theft', 'Nell’s reputation', 'the salt trade', 'the stranger'],
      voiceSamples: [
        'In fairness to the court, I only report what was found. The coin was in her boot. I took it out myself.',
        'We are a small town with a large landlord, friend. Somebody has to keep the accounts.',
        'I have never once told this town a thing that was not so. Ask anybody.',
        'If you have questions about the ledgers, my door is open. Most afternoons. Not this one.',
      ],
      appearance:
        'Forty-four, a neat, soft-built man of middle height, thinning sandy hair combed flat, clean-shaven, mild pale blue eyes, a well-cut dark brown coat with brass buttons over a cream waistcoat, a polished silver chain of office across his chest, soft hands, and a kind face he has practised.',
      visualHook: 'A reeve’s chain of office he polishes with his thumb whenever somebody asks a question.',
      silhouette: 'Slightly forward-leaning, hands folded, head tilted in sympathy.',
      artSeed: 'tsam-cotter-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'calculating', 'cornered'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'reeves_house', activity: 'at his office desk with the lamp low' },
        { startMinute: 330, endMinute: 480, locationId: 'ford_square', activity: 'presenting the case at the dawn assize' },
        { startMinute: 480, endMinute: 690, locationId: 'moot_hall', activity: 'at his ledgers, helping the court' },
        { startMinute: 690, endMinute: 780, locationId: 'ford_square', activity: 'at the front of the crowd for the noon bell' },
        { startMinute: 780, endMinute: 1080, locationId: 'reeves_house', activity: 'in his office with the door shut' },
        { startMinute: 1080, endMinute: 1230, locationId: 'the_ferry_landing', activity: 'overseeing the salt barrels going aboard' },
        { startMinute: 1230, endMinute: 1440, locationId: 'reeves_house', activity: 'at the window, watching the hill' },
      ],
      homeLocationId: 'reeves_house',
      knowledgeScope: ['the_theft', 'the_ledgers', 'the_salt_bank', 'kettlecross', 'the_case'],
      startingRelationship: { trust: 10, affection: 5, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'cotter_drops_the_mask',
          label: 'He stops being reasonable and starts bargaining',
          kind: 'OTHER',
          requires: { fear: 40, flagsSet: ['knows:the_barrels'] },
        },
      ],
      attributes: { might: 9, agility: 10, mind: 16, presence: 15, resolve: 12, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'pim',
      name: 'Pim Atwater',
      calledName: 'Pim',
      role: 'The night watchman whose testimony is hanging Nell',
      cardBlurb:
        'He swore he saw her leave the strongroom at midnight, and he is the weakest board in the whole case. He is terrified of the knight, and if you push in the right place he will come apart in your hands.',
      pronouns: 'he/him',
      publicTraits: ['Over-explains everything', 'Cannot meet a knight’s eye', 'Means well, mostly'],
      hiddenDrives: [
        'He wants somebody to tell him he will not hang for this, and then he will tell them anything',
        'He has not spent a single crown of the twelve, because spending it would make it real',
      ],
      values: ['Keeping his post', 'Being liked by whoever is talking to him'],
      fears: ['Sir Garrot, who hangs false witnesses on a capital charge', 'The reeve finding out he talked'],
      socialStyle:
        'Says too much too fast and then checks your face to see if it worked. Agrees with the last strong person who spoke to him.',
      boundaries: [
        'Will not repeat the lie to the knight’s face a third time',
        'Will not say the reeve’s name first; somebody else has to',
      ],
      goals: ['Get through noon without anybody asking about the money', 'Keep his watchman’s post'],
      secrets: [
        {
          id: 'pim_asleep',
          fact: 'He was asleep at his post that night. The reeve woke him at dawn, told him what he had seen, and paid him twelve crowns to remember it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He folds if somebody tells him a false witness who confesses before the bell is shown mercy, and asks him where he was sleeping.',
        },
      ],
      speechStyle:
        'Nervous and rambling, repeats himself, ends sentences with "right?" and asks for reassurance he does not get. Lies constantly and badly.',
      topics: ['the night watch', 'what he saw', 'the money', 'the knight', 'the north gate'],
      voiceSamples: [
        'I saw her. I did. Midnight, the side door, a sack, the ferry coat. I said it to the knight and I’ll say it again, right?',
        'Twelve crowns is a lot for a watchman. I found it. In the road. Is that a crime, finding?',
        'Does he hang you, the knight, for being wrong? Just wrong. My cousin wants to know.',
      ],
      appearance:
        'Thirty-one, a lanky, stooping man, unshaven, shaggy straw-coloured hair, brown eyes red-rimmed from a night of not sleeping, a faded blue watchman’s tabard over a grey wool shirt with a tin badge pinned on crooked, a knitted cap twisted in his hands, and a cudgel hanging from his belt on a cord.',
      visualHook: 'A watchman’s badge pinned on crooked, which he keeps trying to straighten.',
      silhouette: 'Hunched, hands twisting a cap, weight on the back foot.',
      artSeed: 'tsam-pim-01',
      portrait: null,
      expressions: ['nervous', 'guilty', 'relieved'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_watch_house', activity: 'on the night watch, very much awake this time' },
        { startMinute: 330, endMinute: 480, locationId: 'ford_square', activity: 'standing near the assize table as the witness' },
        { startMinute: 480, endMinute: 1080, locationId: 'the_watch_house', activity: 'lying on his bunk, staring at the ceiling' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_crooked_kettle', activity: 'nursing one drink he cannot afford' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_watch_house', activity: 'back on the night watch' },
      ],
      homeLocationId: 'the_watch_house',
      knowledgeScope: ['the_night_watch', 'the_testimony', 'the_bribe', 'kettlecross'],
      startingRelationship: { trust: 5, affection: 5, respect: 0, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'pim_folds',
          label: 'He admits he never saw her',
          kind: 'TRUST',
          requires: { fear: 35, flagsSet: ['speaker'] },
        },
      ],
      attributes: { might: 11, agility: 10, mind: 9, presence: 8, resolve: 7, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 12, damage: 5, tags: ['watchman', 'cudgel'] },
    },
    {
      id: 'quell',
      name: 'Corra Quell',
      calledName: 'Quell',
      role: 'Factor of the Lowmere Salt Bank, aboard the barge, collecting the reeve’s debt',
      cardBlurb:
        'She has come upriver for twelve barrels and a signature, and she has decided not to ask what is under the salt. If she learns what you are, she will offer you seven years of fair wages for every card you draw.',
      pronouns: 'she/her',
      publicTraits: ['Precise to the crown', 'Polite in every circumstance', 'Never threatens; offers terms'],
      hiddenDrives: [
        'Her post depends on this debt, and the bank is failing faster than anybody upriver knows',
        'She once held a morning-hand’s contract, and she still balances his column some nights',
      ],
      values: ['A debt paid in full and on time', 'Terms written down and kept'],
      fears: ['Going home empty', 'Liking somebody she holds paper on'],
      socialStyle:
        'Cool and courteous. Puts a number on everything, writes it in the ledger while you watch, and lets the silence after an offer do the arguing.',
      boundaries: [
        'Will not knowingly take stolen goods once somebody has said so to her face in front of a witness',
        'Will not lie about the terms of a contract, ever',
      ],
      goals: ['Collect the reeve’s debt by sundown', 'Find something worth more than the debt to take home'],
      secrets: [
        {
          id: 'quell_the_barrels',
          fact: 'She has guessed the barrels are too heavy for salt and has chosen not to look, because looking would make her party to it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if somebody opens a barrel in front of her and asks whether she knew.',
        },
        {
          id: 'quell_the_last_morning_hand',
          fact: 'The bank held a morning-hand’s seven-year contract under her as factor. He was very good. In the seventh year the cards offered him the way home and he took it without saying goodbye.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you ask why the bank wants a morning-hand at all, after she has made her offer.',
        },
      ],
      speechStyle:
        'Precise and polite, with a figure in nearly every sentence. Offers terms instead of threats. Uses "let us be clear" when she is about to be.',
      topics: ['the debt', 'the barrels', 'contracts', 'the bank', 'the last morning-hand', 'the river trade'],
      voiceSamples: [
        'Let us be clear. Twelve barrels and a signature, and I am gone on the evening current.',
        'Seven years, a cabin with a window, fair wages, and every morning’s card at the bank’s disposal. I can have it drawn up by supper.',
        'Everybody upriver owes somebody downriver. I simply keep the list.',
        'We held a morning-hand’s contract once. He was very good. He left in the seventh year without saying goodbye, and I still balance his column some nights.',
      ],
      appearance:
        'Thirty-nine, a tall, spare woman, dark brown skin, black hair in a severe low knot, sharp dark eyes, ink on two fingers of her right hand, a high-collared dove-grey travelling coat buttoned to the throat, black gloves tucked into her belt, and a slim black ledger under one arm with a silver pencil clipped to its spine.',
      visualHook: 'A slim black ledger under one arm, never set down, with a silver pencil clipped to the spine.',
      silhouette: 'Very upright, ledger held against the chest, head slightly tilted as if reading you.',
      artSeed: 'tsam-quell-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'interested', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_barge', activity: 'in the stern cabin with the accounts' },
        { startMinute: 420, endMinute: 600, locationId: 'the_ferry_landing', activity: 'on the jetty, counting what will go aboard' },
        { startMinute: 600, endMinute: 720, locationId: 'the_crooked_kettle', activity: 'a late breakfast at the window table, watching the square' },
        { startMinute: 720, endMinute: 1080, locationId: 'the_barge', activity: 'writing letters downriver in the stern cabin' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_ferry_landing', activity: 'watching the barrels loaded, ledger open' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_barge', activity: 'aboard, wherever the barge is' },
      ],
      homeLocationId: 'the_barge',
      knowledgeScope: ['the_salt_bank', 'the_debt', 'contracts', 'morning_hands', 'the_river_trade'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'quell_names_her_price',
          label: 'She makes you an offer in writing',
          kind: 'ALLIANCE',
          requires: { respect: 30, flagsSet: ['quell_wants_you'] },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 17, presence: 15, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 13, damage: 4, tags: ['civilian', 'factor'] },
    },
  ],
  quests: [
    {
      id: 'q_the_first_draw',
      title: 'Three Cards',
      summary:
        'Three cards hang in the air in front of you: Dragon Tongue, Perfect Cooking and Read Lies. Keep one until you sleep, or let all three go.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['nell', 'garrot'],
      involvedLocationIds: ['ford_square'],
      knownRewardCopy: 'One skill, complete and exact, for the rest of the day.',
      steps: [
        {
          id: 'the_draw',
          playerCopy: 'Keep one card before the sun clears the rooftops, or let all three fade.',
          directorNotes:
            'The cards are visible only to the player and they fade when the sun clears the roofs, a few minutes from now. Keeping one is a touch. Nobody else sees anything except the stranger reaching for nothing. Whichever card is kept, show it working the first time it is used, concretely and exactly, and never let it do more than its name. Keeping none is a real choice and the day is still winnable without a card.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_read_lies',
              label: 'Keep Read Lies',
              predicate: { flagsSet: ['used:keep_read_lies'] },
              setsFlags: ['kept:read_lies', 'drew_today'],
              closesFlags: ['kept:dragon_tongue', 'kept:perfect_cooking'],
            },
            {
              routeId: 'kept_dragon_tongue',
              label: 'Keep Dragon Tongue',
              predicate: { flagsSet: ['used:keep_dragon_tongue'] },
              setsFlags: ['kept:dragon_tongue', 'drew_today'],
              closesFlags: ['kept:read_lies', 'kept:perfect_cooking'],
            },
            {
              routeId: 'kept_perfect_cooking',
              label: 'Keep Perfect Cooking',
              predicate: { flagsSet: ['used:keep_perfect_cooking'] },
              setsFlags: ['kept:perfect_cooking', 'drew_today'],
              closesFlags: ['kept:read_lies', 'kept:dragon_tongue'],
            },
            {
              routeId: 'let_them_fade',
              label: 'Keep nothing and let all three fade',
              predicate: { flagsSet: ['used:let_them_fade'] },
              setsFlags: ['drew_nothing'],
              closesFlags: ['kept:read_lies', 'kept:dragon_tongue', 'kept:perfect_cooking'],
            },
          ],
          rewards: {
            xp: 20,
            items: [],
            flags: ['first_draw_done'],
            abilities: ['read_lies', 'dragon_tongue', 'perfect_cooking'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_noon_bell',
      title: 'Does Anyone Speak For Her?',
      summary:
        'Nell Farrow hangs at noon for stealing the dragon’s rent. The knight has asked three times whether anybody speaks for her, and the whole square is looking at you.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['nell', 'garrot', 'cotter', 'pim'],
      involvedLocationIds: ['ford_square', 'the_lockup', 'moot_hall'],
      knownRewardCopy: 'Nell alive at one o’clock, if you can find the knight a lawful reason.',
      steps: [
        {
          id: 'answer_the_knight',
          playerCopy: 'Answer Sir Garrot.',
          directorNotes:
            'He has asked three times and is waiting, with perfect courtesy, for an answer. Speaking makes the player her speaker, with until the noon bell and the stocks if they are caught lying to the court. Silence is an answer too, and Garrot accepts it without contempt. Either way the assize closes and Nell goes back to the lockup until noon.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'spoke_for_her',
              label: 'Speak for her',
              predicate: { flagsSet: ['used:speak_for_her'] },
              setsFlags: ['speaker'],
              closesFlags: ['stayed_silent'],
            },
            {
              routeId: 'stayed_silent',
              label: 'Say nothing and let the morning go on',
              predicate: { flagsSet: ['used:keep_your_head_down'] },
              setsFlags: ['stayed_silent'],
              closesFlags: ['speaker'],
            },
          ],
          rewards: {
            xp: 30,
            items: [],
            flags: ['assize_answered'],
            abilities: ['invoke_the_charter'],
            reputation: [],
          },
        },
        {
          id: 'before_the_bell',
          playerCopy: 'Bring Sir Garrot a lawful reason before the noon bell.',
          directorNotes:
            'Garrot accepts exactly five reasons: a witness proven false; the stolen thing returned and the thief named; the wronged party’s pardon; proof his court has no right to try the case; or the old proof, a speaker who stands against him in arms until the bell finishes. Pleading, bribes and tears he hears courteously and refuses. A player who stayed silent can still bring him a reason; the law does not care who finds the truth. The hill is ninety minutes there and back, so the dragon route before noon is possible and tight.',
          enterWhen: { flagsSet: ['assize_answered'] },
          deadlineWorldMinute: 12 * 60,
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'broke_the_witness',
              label: 'Break the watchman’s story in front of the knight',
              predicate: { flagsSet: ['spoke:pim', 'used:press_a_witness'] },
              setsFlags: ['witness_broken', 'nell_reprieved'],
              closesFlags: [],
            },
            {
              routeId: 'heard_it_ring',
              label: 'Hear the lie with the card, then make it plain to the court',
              predicate: { flagsSet: ['used:read_lies', 'used:press_a_witness'] },
              setsFlags: ['witness_broken', 'heard_it_ring', 'nell_reprieved'],
              closesFlags: [],
            },
            {
              routeId: 'invoked_the_charter',
              label: 'Show the court it has no right to try her',
              predicate: { flagsSet: ['used:invoke_the_charter'] },
              setsFlags: ['charter_invoked', 'trial_on_the_hill', 'nell_reprieved'],
              closesFlags: [],
            },
            {
              routeId: 'the_landlady_spoke',
              label: 'Climb the hill and bring the wronged party’s pardon',
              predicate: { flagsSet: ['used:dragon_tongue', 'visited:the_hollow'] },
              setsFlags: ['haldis_spoke_for_her', 'haldis_knows_you', 'nell_reprieved'],
              closesFlags: [],
            },
            {
              routeId: 'brought_back_the_silver',
              label: 'Put the stolen silver on the evidence table',
              predicate: { hasItems: ['rent_silver'] },
              setsFlags: ['silver_found', 'nell_reprieved'],
              closesFlags: [],
            },
            {
              routeId: 'stood_against_the_knight',
              label: 'Claim the old proof and stand against him until the bell',
              predicate: { flagsSet: ['speaker', 'engaged:garrot'] },
              setsFlags: ['stood_against_garrot', 'nell_reprieved'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['noon_passed_with_her_alive'],
            abilities: [],
            reputation: [
              { factionId: 'faction_circuit', amount: 20 },
              { factionId: 'faction_river', amount: 15 },
              { factionId: 'faction_kettlecross', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_by_the_back_door',
      title: 'By the Back Door',
      summary:
        'Two bored circuit men, one old lock, and a cell window at cobble height. There is a way to get Nell out before noon that has nothing to do with the law.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['visited:the_lockup'] },
      involvedCharacterIds: ['nell', 'garrot'],
      involvedLocationIds: ['the_lockup', 'the_ferry_landing'],
      knownRewardCopy: 'Nell out of the cell, and both of you on the wrong side of the circuit.',
      steps: [
        {
          id: 'get_her_out',
          playerCopy: 'Get Nell out of the lockup.',
          directorNotes:
            'This works and it is expensive. The circuit men are not cruel and will not be hurt badly unless the player insists. Whatever happens, Garrot finds out within the hour, and a freed Nell is an outlaw on a river where everybody knows her face. She will go with the player or alone, and she will say which.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'broke_her_out',
              label: 'Pick the lock and walk her out',
              predicate: { flagsSet: ['used:slip_in', 'visited:the_lockup'] },
              setsFlags: ['nell_freed_by_force', 'outlawed'],
              closesFlags: ['nell_reprieved'],
            },
            {
              routeId: 'talked_the_guards_round',
              label: 'Talk the circuit men into a long look the other way',
              predicate: { flagsSet: ['used:talk_your_way', 'visited:the_lockup'] },
              setsFlags: ['nell_freed_by_force', 'outlawed'],
              closesFlags: ['nell_reprieved'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['on_the_run'],
            abilities: [],
            reputation: [
              { factionId: 'faction_river', amount: 15 },
              { factionId: 'faction_circuit', amount: -30 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_rent_day',
      title: 'Rent Day',
      summary:
        'The town owes the dragon on the hill a chest of silver by sundown. The chest was stolen three nights ago and nobody has a second one.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['haldis', 'cotter', 'ysolde', 'quell'],
      involvedLocationIds: ['the_hill_road', 'the_hollow', 'kettle_kitchen', 'ford_square'],
      knownRewardCopy: 'A town that still has a bell tower in the morning.',
      steps: [
        {
          id: 'pay_the_hill',
          playerCopy: 'Settle the rent by sundown, one way or another.',
          directorNotes:
            'Silver on the Rent Stone pays it. So does a feast worthy of the hill cooked by one pair of hands, under a clause nobody has used in a hundred and forty years. So does talking her round in her own tongue. If nothing is done, the hill stands up at sundown and comes down to collect, and that is survivable and terrifying and the town will remember who was standing in the square.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_in_silver',
              label: 'Carry the silver to the Rent Stone',
              predicate: { hasItems: ['rent_silver'], atLocation: 'the_hill_road' },
              setsFlags: ['rent_paid'],
              closesFlags: [],
            },
            {
              routeId: 'paid_in_a_feast',
              label: 'Cook a feast worthy of the hill and carry it up',
              predicate: { flagsSet: ['used:perfect_cooking', 'visited:the_hollow'] },
              setsFlags: ['rent_paid', 'rent_paid_in_feast'],
              closesFlags: [],
            },
            {
              routeId: 'talked_her_round',
              label: 'Talk the Landlady into waiting',
              predicate: {
                flagsSet: ['used:dragon_tongue'],
                minRelationship: [{ characterId: 'haldis', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['rent_deferred', 'haldis_bargain'],
              closesFlags: [],
            },
            {
              routeId: 'the_bank_paid',
              label: 'Let the bank pay it, in exchange for your signature',
              predicate: { flagsSet: ['used:strike_a_bargain', 'spoke:quell', 'quell_wants_you'] },
              setsFlags: ['rent_paid', 'signed_with_the_bank'],
              closesFlags: [],
            },
            {
              routeId: 'faced_her_in_the_square',
              label: 'Stand in the square when the hill comes down',
              predicate: { flagsSet: ['haldis_came_down'] },
              setsFlags: ['the_town_faced_her'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [{ itemId: 'haldis_scale', qty: 1 }],
            flags: ['rent_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_kettlecross', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_six_years_light',
      title: 'Six Years Light',
      summary:
        'Somebody in Kettlecross has been short-weighting the dragon’s rent for years. The theft three nights ago was the last of it, not the first.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['assize_answered'] },
      involvedCharacterIds: ['cotter', 'pim', 'nell', 'quell', 'haldis'],
      involvedLocationIds: ['moot_hall', 'reeves_house', 'reeves_cellar', 'the_ferry_landing', 'the_barge'],
      knownRewardCopy: 'The name of the real thief, and what you decide to do with it.',
      steps: [
        {
          id: 'find_the_silver',
          playerCopy: 'Find where the rent actually went.',
          directorNotes:
            'Every clue points at the reeve and none of them is a confession: a coin in a boot with a hole in it, a chest opened with a key and smashed for show, twelve crowns in a watchman’s straw, a ledger that says "weights corrected" for six years, scrapes in a kitchen passage. Cotter never tells an outright lie, so [Read Lies] hears nothing from him; it hears Pim at once.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_the_barrels',
              label: 'Open a salt barrel and find silver',
              predicate: { hasItems: ['rent_silver'] },
              setsFlags: ['silver_found', 'knows:the_cellar'],
              closesFlags: [],
            },
            {
              routeId: 'nell_told_you',
              label: 'Get the truth about that night out of Nell',
              predicate: {
                flagsSet: ['spoke:nell'],
                minRelationship: [{ characterId: 'nell', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_cellar', 'knows:nells_night'],
              closesFlags: [],
            },
            {
              routeId: 'the_hill_told_you',
              label: 'Ask the one who was robbed',
              predicate: { flagsSet: ['used:dragon_tongue', 'visited:the_hollow'] },
              setsFlags: ['knows:the_cellar', 'haldis_knows_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_ledger',
              label: 'Read six years of the reeve’s ledger',
              predicate: { hasItems: ['rent_ledger'], flagsSet: ['used:look_closer'] },
              setsFlags: ['knows:the_cellar', 'knows:six_years'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:the_barrels'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_reeve',
          playerCopy: 'Decide what happens to Anselm Cotter.',
          directorNotes:
            'He will try a deal before anything else: the license, money, the reeve’s goodwill, a quiet life for the stranger. Exposing him to the court is the lawful route. Handing him to the dragon under the charter is the poetic one, and she is not cruel, but she is very literal. Selling his debt to the factor turns the bank on him. Taking his deal makes the player his partner, and the town will find out eventually.',
          enterWhen: { flagsSet: ['knows:the_barrels'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'exposed_him',
              label: 'Put the silver and the reeve in front of the knight',
              predicate: { flagsSet: ['spoke:garrot', 'silver_found'] },
              setsFlags: ['cotter_exposed'],
              closesFlags: ['cotter_bargain'],
            },
            {
              routeId: 'gave_him_to_the_hill',
              label: 'Hand him to the Landlady under the charter',
              predicate: { flagsSet: ['haldis_knows_you', 'used:invoke_the_charter'] },
              setsFlags: ['cotter_exposed', 'cotter_answered_to_the_hill'],
              closesFlags: ['cotter_bargain'],
            },
            {
              routeId: 'sold_him_to_the_bank',
              label: 'Tell the factor what is in her barrels',
              predicate: { flagsSet: ['spoke:quell', 'knows:the_barrels'] },
              setsFlags: ['cotter_exposed', 'quell_turned_on_him'],
              closesFlags: ['cotter_bargain'],
            },
            {
              routeId: 'made_a_deal',
              label: 'Take the reeve’s deal',
              predicate: { flagsSet: ['spoke:cotter', 'used:strike_a_bargain'] },
              setsFlags: ['cotter_bargain'],
              closesFlags: ['cotter_exposed'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['the_reeve_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_kettlecross', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_ferry_license',
      title: 'Two-Thirds of Every Crossing',
      summary:
        'The reeve holds the license for Nell’s mother’s ferry against a debt, and takes two-thirds of every crossing while he has it.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['knows:nells_night'] },
      involvedCharacterIds: ['nell', 'cotter'],
      involvedLocationIds: ['reeves_house', 'the_ferry_landing'],
      knownRewardCopy: 'Nell’s ferry back in Nell’s name.',
      steps: [
        {
          id: 'get_it_back',
          playerCopy: 'Get Nell’s ferry license back from the reeve.',
          directorNotes:
            'It is in the strongbox in his office. Nell can open the strongbox in under a minute and has sworn she gave that up. If the reeve has already fallen, the license is evidence and Garrot will return it to her himself, properly, which matters to her more than she will say.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_it_back',
              label: 'Take it out of the strongbox',
              predicate: { hasItems: ['ferry_license'] },
              setsFlags: ['license_back'],
              closesFlags: [],
            },
            {
              routeId: 'it_came_back_lawfully',
              label: 'Let the court return it once the reeve has fallen',
              predicate: { flagsSet: ['cotter_exposed'] },
              setsFlags: ['license_back', 'license_returned_by_the_court'],
              closesFlags: [],
            },
            {
              routeId: 'paid_the_debt',
              label: 'Buy the debt off the reeve',
              predicate: { flagsSet: ['spoke:cotter', 'used:strike_a_bargain'] },
              setsFlags: ['license_back', 'paid_cotter'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['nell_has_her_ferry'],
            abilities: [],
            reputation: [{ factionId: 'faction_river', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_what_the_cards_take',
      title: 'What the Cards Take',
      summary:
        'You reached for a song you have known all your life and it was not there. Something is paying for your mornings.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['knows:the_cost'] },
      involvedCharacterIds: ['ysolde', 'haldis', 'quell'],
      involvedLocationIds: ['kettle_kitchen', 'the_hollow'],
      knownRewardCopy: 'What the cards cost, and the one morning they offer something else.',
      steps: [
        {
          id: 'ask_someone_who_knows',
          playerCopy: 'Find somebody who knows what the cards take.',
          directorNotes:
            'Two people in this world know: the innkeeper, who has never told anybody she was a morning-hand, and the dragon, who has met five. Neither will volunteer it. The cost is small, specific and never a person: the end of a joke, a street name, the taste of a drink. Write it as quietly frightening, never as horror.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ysolde_told_you',
              label: 'Ysolde tells you, in her kitchen, late',
              predicate: {
                flagsSet: ['spoke:ysolde'],
                minRelationship: [{ characterId: 'ysolde', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:ysolde_morning_hand'],
              closesFlags: [],
            },
            {
              routeId: 'haldis_told_you',
              label: 'The dragon tells you about the other four',
              predicate: { flagsSet: ['used:dragon_tongue', 'haldis_knows_you'] },
              setsFlags: ['knows:the_other_four'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:what_it_costs'],
            abilities: ['take_the_door', 'keep_what_they_need'],
            reputation: [],
          },
        },
        {
          id: 'the_door_back',
          playerCopy: 'One morning the cards offer the way home. Choose.',
          directorNotes:
            'Three cards: [The Door Back], and two that somebody here badly needs, chosen from what has actually happened in this run. The Door takes the player home at the next sundown, so there is a day for goodbyes. Neither choice is the good ending. What matters is what the player would be leaving, and the run has already answered that.',
          enterWhen: { flagsSet: ['door_offered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_door',
              label: 'Keep the Door Back',
              predicate: { flagsSet: ['used:take_the_door'] },
              setsFlags: ['went_home'],
              closesFlags: ['stayed_for_good'],
            },
            {
              routeId: 'kept_what_they_needed',
              label: 'Keep the card somebody here needs',
              predicate: { flagsSet: ['used:keep_what_they_need'] },
              setsFlags: ['stayed_for_good'],
              closesFlags: ['went_home'],
            },
            {
              routeId: 'let_all_three_go',
              label: 'Touch none of them, ever again',
              predicate: { flagsSet: ['used:let_them_fade', 'door_offered'] },
              setsFlags: ['stayed_for_good', 'stopped_drawing'],
              closesFlags: ['went_home'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['the_door_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_quell_ashore',
      atWorldMinute: 7 * 60,
      locationId: 'the_ferry_landing',
      publicCopy:
        'A tall woman in a grey travelling coat steps off the salt barge with a black ledger under her arm and counts the empty barrel racks on the jetty twice.',
      directorNotes:
        'Corra Quell is ashore and working. She does not go to hangings. She is here for the reeve’s barrels at sundown and has decided not to ask what is in them.',
      setsFlags: ['quell_ashore'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'quell', toLocationId: 'the_ferry_landing' }],
    },
    {
      id: 'we_the_charter_under_soot',
      atWorldMinute: 8 * 60,
      locationId: 'moot_hall',
      publicCopy:
        'Under a century of soot on the moot hall glass, the third clause of the Hill Charter is still legible if you rub a thumb across it: whoever robs the Landlady answers to the Landlady and to no other court.',
      directorNotes:
        'Only for a player who has been inside the moot hall. Nobody in the room has read the charter in their lives, including the knight, who will be extremely interested and extremely careful.',
      setsFlags: ['knows:the_charter_clause'],
      cancelledByFlags: [],
      requiresFlags: ['visited:moot_hall'],
      movesCharacters: [],
    },
    {
      id: 'we_the_hill_turns_over',
      atWorldMinute: 10 * 60,
      locationId: null,
      publicCopy:
        'Up on the hill, something very large turns over in its sleep, and every dog in Kettlecross starts barking at once.',
      directorNotes:
        'Haldis is awake and counting the hours to sundown. Everybody in town hears it and pretends they did not. The reeve goes slightly pale and then decides it was thunder.',
      setsFlags: ['the_hill_is_awake'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_noon_bell',
      atWorldMinute: 12 * 60,
      locationId: 'ford_square',
      publicCopy: 'The noon bell rings from the leaning tower, and Sir Garrot walks Nell Farrow out of the lockup.',
      directorNotes:
        'This fires only if nothing has stopped it. It happens, and it is never shown: write it from the back of the crowd, briefly. The bell, the square going quiet, a knight taking off his gloves. Then let the afternoon be quiet and wrong. The story continues, and Nell’s absence is now the shape of it. A player who was not there hears the bell from wherever they are.',
      setsFlags: ['nell_hanged'],
      cancelledByFlags: ['nell_reprieved', 'nell_freed_by_force'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'garrot', toLocationId: 'ford_square' }],
    },
    {
      id: 'we_cotter_turns',
      atWorldMinute: 13 * 60 + 30,
      locationId: 'ford_square',
      publicCopy:
        'Reeve Cotter stands on the moot hall steps and asks, loudly and reasonably, where the stranger from the Crooked Kettle was three nights ago.',
      directorNotes:
        'Nell’s case has collapsed and the rent is still missing, so the reeve reaches for the next person nobody will defend: the stranger who arrived six days before the theft. Every word he says is true. The town is ready to believe it, more so the louder the whispers about the stranger already are.',
      setsFlags: ['you_are_accused'],
      cancelledByFlags: ['cotter_exposed', 'cotter_bargain'],
      requiresFlags: ['nell_reprieved'],
      movesCharacters: [{ characterId: 'cotter', toLocationId: 'ford_square' }],
    },
    {
      id: 'we_the_missing_song',
      atWorldMinute: 15 * 60,
      locationId: null,
      publicCopy:
        'You go to hum something you have known all your life, and there is nothing there. Not the words, not the tune. Just the shape of where it was.',
      directorNotes:
        'The first cost the player notices, and only for a player who kept a card today. Keep it small and specific and let them sit in it. Nobody explains it yet. Ysolde, if she is in the room, stops what she is doing.',
      setsFlags: ['knows:the_cost'],
      cancelledByFlags: [],
      requiresFlags: ['drew_today'],
      movesCharacters: [],
    },
    {
      id: 'we_quell_sends_a_note',
      atWorldMinute: 16 * 60,
      locationId: 'the_crooked_kettle',
      publicCopy:
        'A bargeman brings a folded note to the Crooked Kettle in a hand like engraving: Corra Quell would like ten minutes of the stranger’s time, and will pay for them.',
      directorNotes:
        'She heard a stranger spoke for the thief and did something nobody could explain, and she has met a morning-hand before. She wants to make an offer, in writing, with terms.',
      setsFlags: ['quell_wants_you'],
      cancelledByFlags: [],
      requiresFlags: ['speaker'],
      movesCharacters: [],
    },
    {
      id: 'we_the_barrels_go_aboard',
      atWorldMinute: 18 * 60,
      locationId: 'the_ferry_landing',
      publicCopy:
        'Twelve salt barrels come out of the reeve’s water door and up the plank onto the Honest Weight, each one two men’s work. Salt is not that heavy.',
      directorNotes:
        'The silver is moving. Quell watches with her ledger open and does not ask. Anybody standing on the landing who has been paying attention can see what is wrong with it.',
      setsFlags: ['the_barrels_are_aboard'],
      cancelledByFlags: ['silver_found'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'cotter', toLocationId: 'the_ferry_landing' }],
    },
    {
      id: 'we_the_hill_stands_up',
      atWorldMinute: 20 * 60 + 30,
      locationId: 'ford_square',
      publicCopy: 'The sun goes down behind the hill, and the hill stands up.',
      directorNotes:
        'The rent is unpaid and Haldis comes down to collect, exactly as the charter says she may. She lands in Ford Square, very carefully, and puts one claw on the bell tower. She is not here to burn anybody. She is here to be paid, and she will wait, and the waiting is the frightening part. Without the card nobody can understand a word she says.',
      setsFlags: ['haldis_came_down'],
      cancelledByFlags: ['rent_paid', 'rent_deferred'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'haldis', toLocationId: 'ford_square' }],
    },
    {
      id: 'we_the_barge_sails',
      atWorldMinute: 21 * 60,
      locationId: 'the_ferry_landing',
      publicCopy: 'The Honest Weight casts off with its lamps lit and swings out into the evening current, heading downriver.',
      directorNotes:
        'The silver goes downriver with the bank unless somebody found it first or the dragon is in town, in which case no barge on this river is moving tonight.',
      setsFlags: ['the_silver_went_downriver'],
      cancelledByFlags: ['silver_found', 'haldis_came_down'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_second_dawn',
      atWorldMinute: 1440 + 6 * 60,
      locationId: null,
      publicCopy: 'Dawn, and three new cards: [Borrow a Face] [Mend Bone] [Hear the River].',
      directorNotes:
        'Yesterday’s card is gone, whatever it was. If the story has moved somewhere these three do not fit, swap one for something that does and keep the shape: one useful, one strange, one dangerous or grand. Every card kept still costs one small memory of home.',
      setsFlags: ['first_draw_spent', 'second_draw'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_garrot_rides_on',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'moot_hall',
      publicCopy: 'Sir Garrot’s horse is saddled outside the moot hall. The circuit has four more river towns before the month is out.',
      directorNotes:
        'He leaves today whatever happened. If the player stood in front of him and argued well, he stops to say one thing to them on the way out, and it is about Hobb’s Mill.',
      setsFlags: ['the_circuit_moved_on'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_door_back',
      atWorldMinute: 2 * 1440 + 6 * 60,
      locationId: null,
      publicCopy: 'Dawn, and three cards. One of them has never come before: [The Door Back].',
      directorNotes:
        'Only for a player who has noticed the cost. The other two cards are things somebody here badly needs, chosen from this run: a card that would save Nell’s ferry, heal somebody, or hold the town against something. The Door takes the player home at the next sundown if kept.',
      setsFlags: ['door_offered'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_cost'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_door_back',
      kind: 'FINALE',
      label: 'Whether you ever go home',
      seedHint: 'A song you have known all your life, gone when you reach for it.',
      payoffHint: 'One morning the cards offer [The Door Back], and the other two are things somebody here badly needs.',
      weight: 1,
    },
    {
      id: 'p_nells_night',
      kind: 'RELATIONSHIP',
      label: 'What Nell was really doing that night',
      seedHint: 'She lies about where she slept and tells the truth about the rent in the same breath.',
      payoffHint: 'She was in the reeve’s house with her picks, and she heard the barrels go down his cellar stairs.',
      weight: 0.9,
    },
    {
      id: 'p_where_the_rent_went',
      kind: 'MYSTERY',
      label: 'Where the rent went',
      seedHint: 'A coin in a boot with a hole in the sole.',
      payoffHint: 'Twelve salt barrels too heavy for salt, a ledger six years light, and a barge leaving at sundown.',
      weight: 0.85,
    },
    {
      id: 'p_the_hill',
      kind: 'BOSS',
      label: 'What the dragon does at sundown',
      seedHint: 'A bell tower that has leaned for sixty-one years.',
      payoffHint: 'The hill stands up, and somebody has to speak to it properly.',
      weight: 0.75,
    },
    {
      id: 'p_three_times',
      kind: 'THEME',
      label: 'Why the knight always asks three times',
      seedHint: 'He asks a crowd that never answers, every time, as if he means it.',
      payoffHint: 'A tin whistle that belonged to a drover he hanged for nothing, eleven years ago at Hobb’s Mill.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_line_cook',
      name: 'You Were a Line Cook',
      role: 'Kitchen craft and stamina',
      summary:
        'Back home you worked the hot line in a busy restaurant, so a kitchen is the one room in this world that makes sense to you, and a lighter came through in your apron.',
      playstyle: ['Practical', 'Tough', 'Feeds people'],
      blurb: 'Ten years of double shifts. You can cook through anything, take a burn without flinching, and read a room by who is not eating.',
      attributeBonus: { might: 2, resolve: 2 },
      skillProficiencies: { cooking: 3, brawl: 1, haggle: 1 },
      startingItems: [{ itemId: 'lighter', qty: 1 }],
      startingAbilities: ['keep_read_lies', 'keep_dragon_tongue', 'keep_perfect_cooking', 'let_them_fade', 'cook_something'],
      startingReputation: [{ factionId: 'faction_kettlecross', amount: 5 }],
    },
    {
      id: 'arch_paralegal',
      name: 'You Read Contracts',
      role: 'Law and close reading',
      summary:
        'Back home you were a paralegal, paid to find the clause somebody hoped nobody would read. A courtroom with a hanging in it is new. Old paperwork is not. A biro came through with you.',
      playstyle: ['Careful', 'Thorough', 'Argues well'],
      blurb: 'Six years of other people’s small print. You notice what is missing from a document before you notice what is in it.',
      attributeBonus: { mind: 2, resolve: 1, presence: 1 },
      skillProficiencies: { questioning: 2, notice: 2, pleading: 1, old_ways: 1 },
      startingItems: [{ itemId: 'biro', qty: 1 }],
      startingAbilities: ['keep_read_lies', 'keep_dragon_tongue', 'keep_perfect_cooking', 'let_them_fade', 'press_a_witness'],
      startingReputation: [{ factionId: 'faction_circuit', amount: 5 }],
    },
    {
      id: 'arch_courier',
      name: 'You Rode Deliveries',
      role: 'Speed, streets and stealth',
      summary:
        'Back home you rode a bike courier route through a city that never stopped, so you know shortcuts, back doors, and how to be gone before anybody asks. A bicycle lamp came with you.',
      playstyle: ['Fast', 'Sneaky', 'Restless'],
      blurb: 'Five years of rain, red lights and stairwells. You have never once taken the front door when there was a back one.',
      attributeBonus: { agility: 3, might: 1 },
      skillProficiencies: { sneak: 3, notice: 1, brawl: 1 },
      startingItems: [{ itemId: 'bike_lamp', qty: 1 }],
      startingAbilities: ['keep_read_lies', 'keep_dragon_tongue', 'keep_perfect_cooking', 'let_them_fade', 'slip_in'],
      startingReputation: [{ factionId: 'faction_river', amount: 5 }],
    },
    {
      id: 'arch_card_player',
      name: 'You Played Card Games',
      role: 'Odds, bluffing and reading people',
      summary:
        'Back home you played competitive card games, which means you know how to judge a pick, read a bluff and keep a straight face. A deck of cards came through in your pocket.',
      playstyle: ['Calculating', 'Bluffs', 'Reads people'],
      blurb: 'Every weekend for years at a table of strangers. You can tell when somebody is holding something, and you are very hard to read.',
      attributeBonus: { presence: 2, mind: 2 },
      skillProficiencies: { bluff: 3, haggle: 1, questioning: 1 },
      startingItems: [{ itemId: 'deck_of_cards', qty: 1 }],
      startingAbilities: ['keep_read_lies', 'keep_dragon_tongue', 'keep_perfect_cooking', 'let_them_fade', 'talk_your_way'],
      startingReputation: [{ factionId: 'faction_salt_bank', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What do people here call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Okafor' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'Who were you, back home?',
      helpText:
        'The life you had before you woke up in a hayloft outside Kettlecross, which sets what you are good at here and what came through in your pockets. It is fixed for the whole story. It does not decide which card you keep, whether you speak for her, or whether you ever go home. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is true about you in both worlds?',
      helpText: 'The part of you that falling through did not change. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I cannot leave a problem alone, and I am terrible at saying no to people who need something.',
    },
    {
      id: 'first_instinct',
      label: 'When the knight asks, what is your first instinct?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite on turn one and the town will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'speak_up', label: 'Raise my hand before I have a plan' },
        { id: 'watch_first', label: 'Say nothing until I understand who is lying' },
        { id: 'keep_out', label: 'It is not my town and not my business' },
        { id: 'get_her_out', label: 'Forget the law and get her out' },
        { id: 'follow_the_money', label: 'Find out who actually has the silver' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the crowd see when it turns to look at you?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Clothes from nowhere, nine days of hay in my hair, and a face that is clearly about to do something stupid.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of these are losses and none is written as a punishment: Nell can
   * hang because the law outran one stranger, which is reachable by doing
   * nothing at all; the player can break her out and live as an outlaw; and the
   * player can simply leave. The two Door endings need the cost to have been
   * noticed, and every other destination is reachable by a player who never
   * once wonders what the cards take.
   */
  endings: [
    {
      id: 'end_spoken_for',
      name: 'Spoken For',
      rarity: 'COMMON',
      minTurn: 24,
      requires: {
        flagsSet: ['noon_passed_with_her_alive', 'rent_settled'],
        flagsUnset: ['went_home', 'nell_hanged'],
      },
      condition:
        'Nell lived through noon, the rent is settled one way or another, and the stranger is still in Kettlecross. Play it small: the square on an ordinary morning, a ferry running, three new cards at dawn that are just three cards. Do not have anybody give a speech about belonging.',
      epilogue:
        'The town still calls you the stranger, but now it is said the way they say the river. Nell runs the crossing and charges you full fare on principle. Most mornings you keep a card. Some mornings you let them go, and the day is fine anyway.',
      hint: '',
    },
    {
      id: 'end_the_hill_stood_up',
      name: 'The Day the Hill Stood Up',
      rarity: 'COMMON',
      minTurn: 20,
      requires: { flagsSet: ['haldis_came_down', 'the_town_faced_her'] },
      condition:
        'Nobody paid in time and the dragon came down to collect, and the town lived through it because somebody stood in the square and did not run. Write the night itself: a dragon on a bell tower, nine hundred people indoors, one stranger outside. Nobody dies. Everybody remembers.',
      epilogue:
        'The bell tower leans further now. People not born yet will be told about the stranger who stood in the square and talked to the hill, and the story will get every detail wrong except that one.',
      hint: 'A bell tower that has leaned for sixty-one years.',
    },
    {
      id: 'end_the_long_road',
      name: 'The Long Road',
      rarity: 'COMMON',
      minTurn: 12,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['speaker'] },
      condition:
        'The player walked out of Kettlecross without speaking for anybody. That is a coherent thing for a stranger to do and it is not written as cowardice. The road is long, the cards still come every dawn, and the noon bell is a thing you hear from a long way off.',
      epilogue:
        'Three towns downriver, somebody asks where you came from, and you tell them a town with a leaning bell tower. You do not tell them about the woman in irons who looked at you. Some mornings one of the three cards would have saved her, and you know it.',
      hint: '',
    },
    {
      id: 'end_the_noon_bell',
      name: 'The Noon Bell',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['nell_hanged', 'rent_settled'] },
      condition:
        'Nell hanged at noon, and the rest of Rent Day happened anyway. This is the law outrunning one stranger and it must not be written as a punishment for playing badly. Whatever the player did afterwards, the reeve, the rent, the dragon, it was done without her. Never describe the hanging itself.',
      epilogue:
        'The ferry is sold to a man from upriver who does not know the back channels. The river folk tie a strip of oilskin to the ferry post every Rent Day and nobody takes it down. Garrot writes the name in the circuit record, and under it, for the first time in eleven years, the name of a speaker.',
      hint: '',
    },
    {
      id: 'end_downriver',
      name: 'Downriver',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['nell_freed_by_force', 'on_the_run'] },
      condition:
        'The player broke Nell out of the lockup and the circuit is after both of them. This is not a tragedy and not a triumph. It is two people on a river where everybody knows one face, with the truth still sitting in a cellar behind them.',
      epilogue:
        'You learn the back channels. Nell learns which of your morning cards are worth keeping on the run. The circuit gives up on you around the fourth town, and Kettlecross goes on believing it was her, which she minds more than she says.',
      hint: '',
    },
    {
      id: 'end_seven_years_signed',
      name: 'Seven Years Signed',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['signed_with_the_bank'] },
      condition:
        'The player signed seven years to the Lowmere Salt Bank to pay a dragon’s rent. The terms are fair and Quell keeps them to the letter. Write it as a real life with a cabin and a window, not as slavery, and let the player feel exactly what they sold.',
      epilogue:
        'Every morning a clerk asks which card you kept, and writes it down. The bank stops failing within a year. Quell balances your column herself and never once lets anybody else do it. In the seventh year, she asks you, very carefully, whether you are going to say goodbye.',
      hint: '',
    },
    {
      id: 'end_the_landladys_court',
      name: 'The Landlady’s Court',
      rarity: 'RARE',
      minTurn: 22,
      requires: { flagsSet: ['charter_invoked', 'cotter_answered_to_the_hill'] },
      condition:
        'The player found the third clause, moved the trial up the hill, and the dragon judged her own thief. Haldis is literal, not cruel. Write the court in the Hollow: a knight taking notes, a reeve in his good coat, a dragon reading a ledger with one eye.',
      epilogue:
        'Cotter carries the rent up the hill himself every Rent Day for the rest of his life, on foot, and stays to talk for an hour. Haldis says it is the best bargain she has made in two centuries. Garrot adds the third clause to his book in his own hand.',
      hint: 'Under the soot on the moot hall wall.',
    },
    {
      id: 'end_a_feast_for_the_hill',
      name: 'A Feast for the Hill',
      rarity: 'RARE',
      minTurn: 20,
      requires: { flagsSet: ['rent_paid_in_feast', 'noon_passed_with_her_alive'] },
      condition:
        'The rent was paid in a feast worthy of the hill, cooked by one pair of hands, and Nell lived to eat the leftovers. Name the dishes. This is the joke card turning out to be the deepest one, and it should taste like it.',
      epilogue:
        'Haldis asks for the cook’s name and this time somebody writes it down, on the last page of the Hill Feast Book, under a note a hundred and forty years old. Ysolde frames the page. The town quietly stops collecting silver.',
      hint: 'The joke card.',
    },
    {
      id: 'end_two_on_the_ferry',
      name: 'Two on the Ferry',
      rarity: 'RARE',
      minTurn: 26,
      requires: {
        flagsSet: ['license_back', 'noon_passed_with_her_alive'],
        flagsUnset: ['went_home'],
        minRelationship: [{ characterId: 'nell', dimension: 'affection', value: 70 }],
      },
      condition:
        'Nell has her mother’s ferry back in her own name and the stranger is on it with her. Keep it light and specific: a crossing at dawn, three cards in the air that only one of them can see, and an argument about the fare. Romance stays at a kiss.',
      epilogue:
        'She calls you by your name now, except when she is annoyed, when it is "stranger" again. Some mornings she asks what the cards are. You tell her, and she picks, and you keep whichever one she picked.',
      hint: '',
    },
    {
      id: 'end_the_reeves_seat',
      name: 'The Reeve’s Seat',
      rarity: 'RARE',
      minTurn: 28,
      requires: {
        flagsSet: ['cotter_exposed', 'rent_settled'],
        minFactionReputation: [{ factionId: 'faction_kettlecross', value: 45 }],
      },
      condition:
        'The reeve has fallen, the rent is paid, and the town has decided the stranger is the only person in Kettlecross who has read the charter. They want the player to keep the keys. Let the player say yes or no; either is an ending.',
      epilogue:
        'The chain of office is heavier than it looks. You carry the rent up the hill yourself every year, weighed twice, and the ledger never once says "weights corrected". The town still calls you the stranger. The dragon calls you tenant, which from her is nearly a title.',
      hint: '',
    },
    {
      id: 'end_the_door_back',
      name: 'The Door Back',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['went_home', 'the_door_answered'] },
      condition:
        'The cards offered the way home and the player kept it. They have one day for goodbyes, and at sundown they are gone. What this ending is about is what they left, and how good the days before were decides the scene.',
      epilogue:
        'You wake on a night bus with your phone in your hand and nine days missing from it. There are small gaps: a song, a street, a taste you cannot place. In Kettlecross, Ysolde chalks your slate clean, and Nell runs the crossing and looks up at dawn sometimes, at nothing.',
      hint: 'Once, the cards offer something else.',
    },
    {
      id: 'end_a_card_for_someone_else',
      name: 'A Card for Someone Else',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['stayed_for_good', 'the_door_answered'] },
      condition:
        'The cards offered the way home and the player kept the card somebody here needed instead. Do not have them explain it. Show the card working for the person it was for, and let the Door fade without a word about it.',
      epilogue:
        'The Door does not come again. You did not expect it to. Ysolde puts a bowl in front of you that night, takes you off the slate, and tells you, finally, what the first letter of her name was. It is the same as yours.',
      hint: 'Once, the cards offer something else.',
    },
  ],
  protagonist: {
    kind: 'BLANK',
    name: '',
    pronouns: '',
    description: '',
    setupHeading: 'Who woke up in the hayloft?',
    portrait: null,
  },
  opening:
    'Dawn, your ninth in this world, and three cards hang in the air that only you can see. Keep one until you sleep.\n\n' +
    '[Dragon Tongue] [Perfect Cooking] [Read Lies]\n\n' +
    'Below them, at the foot of a gallows, a woman in irons finds you in the crowd.\n\n' +
    '"Morning, stranger," says Nell, through a split lip.\n\n' +
    'The knight beside her, Sir Garrot, lifts a gloved hand. "Nell Farrow hangs at noon for the theft of the dragon’s rent. Does anyone speak for her?"\n\n' +
    'Silence. He asks again. Nobody moves.\n\n' +
    'The whole square follows her eyes to you.\n\n' +
    '"You," Garrot says. "Third and last time. Do you speak for her?"',
  openingPanel: {
    assetKey: 'story_three_skills_a_morning/opening',
    alt: 'Nell in an oversized mustard oilskin coat, wrists in irons, grins at you across a dawn-lit square as Sir Garrot in black half-plate raises a gloved hand and three glowing cards hang in the air.',
  },
  openingSuggestions: [
    'I touch Perfect Cooking. "Before anyone hangs, can I cook her breakfast?"',
    'I touch Read Lies and raise my hand.',
    'I touch Dragon Tongue, climb the gallows steps and say, "She’s innocent. The dragon will prove it by noon."',
  ],
  coverDirection: [
    'SUBJECT: Nell Farrow, a river ferry hand, alone and unmistakable in the foreground of a key visual for a fantasy anime about a stranger who is handed three new skills every dawn.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Ragged short dark brown hair, grey-green eyes, sun-browned skin, a faded mustard-yellow oilskin ferry coat two sizes too big, buttoned to the collar, sleeves rolled back, a blue kerchief at the throat.',
    'One hand is shoved in her coat pocket, the other raised in a lazy two-fingered salute. Chin up, a crooked, daring grin, looking straight at the viewer.',
    'Between her and the viewer, three tall cards made of light hang in a loose fan, edged in warm gold, sparks drifting off their corners.',
    'Each card shows one simple glowing emblem and nothing else: a dragon’s head, a steaming cooking pot, a cracked bell. No letters, no numbers, no writing on the cards.',
    'HER FACE STAYS CLEAN: no cuts, marks, sparkles, glow or shadows on her face or skin. Every glow and spark stays on the cards and on the title.',
    'BEHIND HER, soft and secondary: a small river town square at dawn, steep timber-framed houses, and a stone bell tower that leans visibly to one side.',
    'Above the rooftops, a green hill where a huge dull-red dragon lies curled like part of the hill, one horn broken short, one ember-orange eye open and watching.',
    'No rope, no gallows and no chains anywhere in the picture.',
    'LIGHT: warm gold dawn light from behind the town rimming her hair and coat, cool blue shadow across the square, and the cards’ gold glow on the front of her coat and her raised hand.',
    'TITLE: the words THREE SKILLS A MORNING painted into the art in the upper third, across the dawn sky, as a hand-lettered storybook fantasy logo in warm gold with a dark ink outline, stacked on two lines, THREE SKILLS above A MORNING,',
    'spelled exactly "Three Skills a Morning" and lettered in capitals, large and legible at thumbnail size, with a soft gold glow on the letters only. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const THREE_SKILLS_A_MORNING = StoryVersion.parse(raw);
