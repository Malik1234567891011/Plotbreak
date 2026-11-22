import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Three Heroines and a Porter" — a summoning isekai where the classless one
 * is the only person in the room who is not paying for it.
 *
 * Bible: `docs/story-bibles/new50/13_THREE_HEROINES_AND_A_PORTER.md`. Slate #13
 * of the fifty, built on the Good Morning, Husband shape: one designed first
 * beat with a question in it, a small cast that each want a specific thing this
 * week, an optional mystery that never leaks into a run that did not ask, and a
 * failure mode reachable by being pleasant and doing nothing.
 *
 * Playable span: one week in and around one palace and the city under it, from
 * the reading at the evening vigil on day 0 to the column marching east at dawn
 * on the seventh morning. Everything after the march lives in the endings.
 *
 * The harem argument is the hook and the cost is the spine. Rin, Maya and Saki
 * each want something different from the player and say so, and none of them
 * is a prize: each has a want, a limit and a way to refuse. Underneath, every
 * art a called class performs takes a memory of home, and the classless player
 * is the only one of the four who will remember everything. That makes the
 * porter the most important person in the story without handing them a sword.
 *
 * Production runs `runTurnPure`, which reads the premise, tone guide, hard
 * canon, cast, opening, style examples, places, quest items, factions, quest
 * summaries, world events and the first twelve endings. It never sees the
 * resources or the ability list except the chosen archetype's starting
 * abilities. So the cost and the porter both live in hard canon, the club's
 * kit is quest items the player starts holding, and exactly twelve endings are
 * authored so the storyteller reads all of them.
 *
 * The porter is a mystery the player earns. `q_struck_line` is a LEAD gated on
 * `knows:the_blank_line`, which only deliberate play sets: putting a hand back
 * on the crystal, poking round the Choir's cloister, or working the Porters'
 * Hall long enough to hear the old verse. The porter's four arts are granted
 * broadly and gated by flag.
 *
 * Three invisible variables. Stamina is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Suspicion comes first among the descending pair
 * on purpose: public violence raises the first GOOD_LOW in array order, and a
 * fight in a palace makes the escort watch the classless one before it does
 * anything else. Fading is how much of home the three have lost; it climbs a
 * little every hour they train, and more when the player leans on their
 * classes instead of their own two hands.
 */

const raw = {
  id: 'sv_three_heroines_and_a_porter_1',
  storyId: 'story_three_heroines_and_a_porter',
  version: 1,
  title: 'Three Heroines and a Porter',
  openingObligations: [
    {
      what: 'Sir Bastian’s written order: the classless one is put out of the palace by the side gate tonight, with a purse.',
      withCharacterId: 'bastian',
      dueInMinutes: 140,
    },
  ],
  fantasyLabel: 'They got SSS classes. You got nothing.',
  hook: 'Your whole hiking club got summoned to another world. The three women got the highest classes in the kingdom. You got nothing, and they are already arguing over you.',
  premise:
    'Your university hiking club was roped together on the last ridge of a mountain, in fog, when a white light took the ridge away. Four of you went up. Four of you woke on the stone floor of a vaulted hall under a palace chapel in another world, still tied to the same rope.\n\n' +
    'The priests who called you are the Choir, and their circle had three seats. Their reading crystal gave the three women the highest classes in the kingdom’s books. Rin, the captain, is a Sword Saint. Maya, the physicist, is an Archmage. Saki, who was training as a nurse, is a Saint. Under your hand the crystal stayed dark.\n\n' +
    'So the kingdom has three heroes for its war against a grey tide in the east, and one classless extra. Sir Bastian, the knight who commands their escort, has written orders to put you out of the side gate tonight with a purse. The column marches east on the seventh morning.\n\n' +
    'Rin wants you gone and will not say why. Maya wants you close, because you are the only one who can cook. Saki wants you to decide for yourself. You have one week to choose where you stand, and to find out what the three of them are losing every time they use their classes.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Isekai', 'High fantasy', 'Comedy', 'Romance', 'Ensemble'],
  mechanicsChips: [
    'Three heroines, three different wants',
    'No class, and it holds',
    'Every spell costs a memory',
    'A march on the seventh morning',
    'The mystery is optional',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend the whole week cooking, carrying loads and refereeing three arguments, and that is a real way to play this. Rin, Maya and Saki are not prizes. Each of them wants something specific this week, any of them can tell you no, and the crystal that read you as nothing may have been wrong about that.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'hall_of_calling',
    startWorldMinute: 19 * 60 + 40,
    startingItems: [
      { itemId: 'club_pack', qty: 1 },
      { itemId: 'cut_rope', qty: 1 },
      { itemId: 'your_phone', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is in their twenties, twenty-two unless they give another adult age, and is never under eighteen whatever they type. Rin Morikawa is twenty-two, Maya Tanabe twenty-three, Saki Hirose twenty-one, Sir Bastian Vell thirty-five, High Cantor Odessa Marrin fifty-seven, Grete Holm forty-eight and Hesper sixty-three. Rin, Maya, Saki and the player are adult members of the same university hiking club and are written as adults throughout.',
      'The four of them were roped together on the last ridge of a mountain, in fog, when a white light took the ridge away. This evening they woke in the Hall of Calling, under the High Chapel of Varnhold, capital of the kingdom of Varn. Rin is the club captain and tied the knots. The player always carried the big pack with the stove in it.',
      'The Choir is Varn’s priesthood. Its rite, the Calling, pulls heroes from another world when the kingdom is losing a war it cannot win alone. The circle cut into the Hall’s floor has three seats. The Choir called three. The player came through on the rope, tied to the other three, and landed outside the circle.',
      'The reading crystal on the Hall’s altar names a called hero’s class. It read Rin as Sword Saint, Maya as Archmage and Saki as Saint, all at SSS, the highest grade in the Choir’s books, and nobody has ever been read at SSS three times in one night. Under the player’s hand the crystal stayed dark. The player has none of the Choir’s classes and cannot gain one, however they ask; what the crystal did read under their hand is the struck line below, revealed only through play.',
      'If the player puts a hand back on the reading crystal and holds it there, it does not light: it frosts over, white, in the exact shape of their hand, and the High Cantor has a novice scrub it clean before anybody else can look closely. In the Hall no priest will say what it means; they go silent or leave the room.',
      'The war: in the east a grey tide is eating Varn. Whatever it covers loses its colour and its sound, and grey, silent figures walk back out of it, the faded, which move like the people or animals they used to be and fall to grey dust when struck hard. The last Calling, forty-one years ago, pushed the grey back to the river Wend. It has crossed the river again.',
      'Sir Bastian Vell commands the forty knights escorting the heroes. His written order from the High Cantor: the classless one is put out of the side gate tonight with forty silver crowns and a travel writ for the north road. The heroes march east with his company at dawn on the seventh morning, with sixty porters carrying the baggage.',
      'Every art a called class performs is paid for with a memory of the world the hero came from. Small arts take small memories, big arts take big ones, and nothing visible happens: the hero simply cannot find the thing afterwards. The Choir knows and calls it settling. Rin, Maya and Saki have not been told. Natives of Varn are read at eighteen and get small trade classes, Cooper or Drover or Weaver, that cost nothing.',
      'The player has no called class, so the player loses nothing and remembers everything about home and about the other three. Telling, cooking or showing a lost thing back to one of them in enough detail gives it back to her. It does not stop the cost. It slows it.',
      'Nobody of the Choir can speak a lie in the Hall of Calling, under the crystal. They can stay silent, or leave the room.',
      'Revealed only through play, never early: the crystal did read the player, as a breath of white frost gone before anybody but the High Cantor saw it. Odessa Marrin held the pen that night, wrote the word down by habit, saw what she had written, and within the hour scraped the player’s line out of the reading book with a knife. Under the scraping is the word PORTER. Three hundred years ago a Calling brought a fourth on a tether, as this one did. A porter carries what is given to them: a weight beyond their strength, a wound off somebody, the cost of an art, a whole class off a hero. That porter carried that Calling’s heroes home before the war was won, the kingdom nearly fell, and the Choir struck the class from its books.',
      'Revealed only through play, never early: the Sending is real. The Calling can be run backwards from the Hall to send the called home. It needs somebody to aim it with a memory of home strong enough to hold, which is exactly what the classes burn. The last Calling never went home because by the time the grey was pushed back none of them remembered where home was.',
      'Hesper, the archer in the Choir’s walled garden, is the last living hero of the last Calling and remembers nothing from before it. She calls Sir Bastian Captain, and he brings her pears every dawn. Revealed only through play, never early: her name in the reading book is Helen Marsh, and Bastian is her son, born six years after her Calling; she stopped knowing him the year he became a squire.',
      'Rin, Maya and Saki are people with their own wants this week, not prizes. Each of them can refuse the player, be annoyed with them, or decide something without them.',
      'Romance between these adults goes no further than a kiss and is never fan service: no bath or changing-room scenes, no accidental-touch jokes, no lingering on bodies, and no bed-sharing or who-sleeps-where innuendo; the couch argument is about the couch. Fights have no gore and leave no lingering wounds.',
      'Trouble has a set answer in this palace. A classless stranger who strikes a knight, steals, threatens a heroine or is caught where they are forbidden is disarmed and marched to the side gate under guard, not killed; only the three heroines refusing together, out loud, can stop it, and Bastian counts every incident aloud afterwards. Being put out is never the end: the Low Market is outside, and the wall is lower than it looks. A lost fight this week, with a knight or with a faded on the east road, ends bruised, grey-touched for a day, carried back, or put out of the gate, and never kills the player.',
    ],
    // The tone guide is also the mood line of every image prompt (cover,
    // portraits, panel), so it carries mood only. The 13+ limits and the
    // trouble rule live in hard canon above, which the storyteller reads in
    // the same world brief.
    toneGuide:
      'Isekai ensemble comedy with a real cost underneath. The four of them are a club: in-jokes, a nickname (Rin calls the player Pack), arguments about who carries what, whose turn it is to cook and who gets the one couch. Comedy comes first, and when a memory goes, name it plainly: a dog’s name, the colour of a door, a birthday. ' +
      'Each heroine wants something specific this week and says so. None of them is a prize, and any of them can refuse. Fights are quick and physical: a knight in the yard, a faded on the wall, a scuffle in a kitchen. Romance is flirtatious, tense and heartfelt, never further than a kiss, and never fan service. ' +
      'The porter and the scraped line are reveals the player earns by pulling on them. Never state them early, and a player who never asks gets a complete week of three heroines, a kitchen and a knight. The face at the top of a beat belongs to whoever reacted to the player most strongly. ' +
      'Trouble ends at the side gate. The player is never killed this week, and being put out of the palace is never the end of the story.',
    proseStyle: 'webnovel',
    styleExamples: [
      'The post falls in two halves, clean as paper.\n\nThe knights cheer. Rin doesn’t move.\n\n"Pack." She doesn’t turn round. "What was my dog called?"\n\n"Biscuit."\n\n"Biscuit." She says it twice more under her breath, like she’s tying it off. "Right. Obviously. I knew that."\n\nIt takes her two tries to sheathe the sword.',
      'Maya slides a Choir ledger across the kitchen table. Fifty-one numbered lines in small square handwriting.\n\n"Control group," she says. "Read me number nine."\n\n"Mum’s front door is blue."\n\nYou’ve stood on that step in the rain. "Green."\n\nShe crosses it out and writes it again, hard enough to dent the page.\n\n"Hypothesis," she says, not looking up. "You are going to be extremely annoying this week. Keep going."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 12, agility: 10, mind: 11, presence: 11, resolve: 12, arcana: 5 },
  skills: [
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'Feeding four people properly out of a strange larder and one camp stove.' },
    { id: 'hauling', name: 'Hauling', attribute: 'might', description: 'Carrying loads, lifting what is stuck, and keeping going under a weight.' },
    { id: 'noticing', name: 'Noticing', attribute: 'mind', description: 'Seeing what changed in a face, a room or a crystal.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing to somebody who outranks you, out loud.' },
    { id: 'smooth_talk', name: 'Smooth Talk', attribute: 'presence', description: 'Bargaining, bluffing and talking a guard round to your side.' },
    { id: 'quiet_feet', name: 'Quiet Feet', attribute: 'agility', description: 'Being somewhere in a palace without anybody marking it.' },
    { id: 'remembering', name: 'Remembering', attribute: 'mind', description: 'Holding home in detail: names, colours, the words to the song.' },
    { id: 'bearing', name: 'Bearing', attribute: 'resolve', description: 'Taking on what is not yours to carry, and not putting it down.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so resting restores the day and nothing
   * else. Suspicion is first among the descending pair so a fight in the
   * palace raises the escort's watch before anything else. Fading climbs a
   * little every hour the heroes train and more whenever the player leans on
   * their classes; nothing the player does subtracts it, which is the point:
   * the cost can be slowed by somebody who remembers, never refunded.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 80,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has been awake since a mountain in another world. They sit down on whatever is nearest, a step, a sack of turnips, the altar, and whoever is closest decides what happens next.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Loads feel twice their weight, jokes come out flat, and the player agrees to things to end a conversation. Rin notices first and orders them to sit down, which is how she says she is worried. Going to bed in the Heroes’ Wing is the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long day of carrying and arguing. Fine for one more errand and honest about not wanting two. Good for the kitchen, bad for a fight. Nobody needs to remark on it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'The day is still in front of them. The player can haul a full load, cook something that takes an hour, walk to the Low Market and back, and still have the patience to say the hard thing well rather than bluntly.',
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
        'Nobody in the palace watches the classless one at all. The knights nod at the player in the yard, the cooks hand over a ladle, and the Choir has quietly decided the porter is harmless.',
      color: '#B5651D',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The player is part of the furniture: the one with the big pack who cooks. Doors open, knights talk in front of them, and a novice will answer a question about the archive without thinking about why it was asked.',
        },
        {
          upTo: 55,
          behaviour:
            'The ordinary watchfulness a palace keeps on a stranger with no class and no rank. A knight drifts after the player now and then. Bastian asks where they were last night, as if he does not already know.',
        },
        {
          upTo: 80,
          behaviour:
            'The escort is watching on purpose. A knight stands at the end of every corridor the player uses, the cloister door is barred at dusk, and the High Cantor has started being very kind to them in public, which is worse.',
        },
        {
          upTo: 100,
          behaviour:
            'Bastian has decided the player is a danger to the march. He moves to put them out of the palace under guard, today, and nobody in the Choir argues. Only the three heroines refusing, out loud and together, stops it.',
        },
      ],
    },
    {
      id: 'fading',
      name: 'Fading',
      max: 100,
      start: 8,
      regenPerHour: 0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'All three of them are entirely themselves. They argue about home as if they are going back next week, and they quote things the player said three years ago, word for word.',
      color: '#8E9AAF',
      bands: [
        {
          upTo: 20,
          behaviour:
            'They are themselves. Home is a running joke between them: the club hut, the terrible summit photo, whose mum sends the best snacks. A gap, when one comes, is a single word they laugh off and come back to an hour later.',
        },
        {
          upTo: 45,
          behaviour:
            'Small things have started going. Rin cannot place a name, Maya checks her list before answering, Saki asks the player questions about home that she should know the answers to. They make jokes about it and the jokes are getting shorter.',
        },
        {
          upTo: 70,
          behaviour:
            'Big things are going now. Rin stops mentioning her family. Maya crosses out entries she no longer recognises and will not cry where anybody can see. Saki hears the hum under the other two’s skin from across a room. The player is the only one who still knows what they are missing.',
        },
        {
          upTo: 100,
          behaviour:
            'They are settling. Home is a story they have been told rather than a place they remember, and none of them asks to go back. They are kind to the player the way you are kind to an old friend of a friend. Rin still calls them Pack and does not know why.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'club_pack',
      name: 'The Club Pack',
      tags: ['quest', 'personal', 'gear'],
      questItem: true,
      droppable: false,
      description: 'The club’s sixty-litre hiking pack: a camp stove and two gas canisters (one half full), a dented pot, the first-aid kit, a tent, a head torch and nine packets of instant noodles. You have carried it on every trip the club ever made.',
      loreText: 'The stove is the only one in this world. Maya has already worked out that the gas will last about forty meals, and has started counting.',
      icon: 'backpack',
    },
    {
      id: 'cut_rope',
      name: 'The Cut Rope',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'Eleven metres of orange climbing rope, your end still knotted to your harness in Rin’s figure-eight. The other end is cut clean, as if by a blade, where the light took the ridge.',
      loreText: 'Four people were on that rope. The circle had three seats. The priests keep looking at the knot.',
      icon: 'rope',
    },
    {
      id: 'your_phone',
      name: 'Your Phone',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'Nine percent battery, no signal, and fourteen hundred photos: the summit, the club hut, Rin’s dog, the front door of Maya’s mother’s house. Every photo you show uses some of what is left.',
      loreText: 'Maya says she could charge it with a spark from her fingers. She has not yet worked out what that would cost her, and you have.',
      icon: 'phone',
    },
    {
      id: 'side_gate_purse',
      name: 'The Side-Gate Purse',
      tags: ['quest', 'money', 'document'],
      questItem: true,
      description: 'A leather purse of forty silver crowns and a travel writ for the north road, sealed in white wax by the High Cantor. Taking it means agreeing to leave by the side gate tonight.',
      loreText: 'The writ was drawn up before the reading. The ink was dry before your hand touched the crystal.',
      icon: 'coin-purse',
    },
    {
      id: 'reading_book',
      name: 'The Reading Book',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'The Choir’s book of readings: every Calling in three hundred years, every name and every class, in the hand of whoever held the pen. On the last page your line has been scraped out with a knife. Tilted to the light, the scraping still shows a word.',
      loreText: 'Forty-one years back, in a different hand: three names, an Archer among them, written as Helen Marsh, twenty-two. Three hundred years back, a page has been cut out and the stub is stained with old wax.',
      icon: 'book',
    },
    {
      id: 'mayas_list',
      name: 'Maya’s List',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description: 'A Choir ledger with numbered facts about home in Maya’s small square handwriting. Some entries are crossed out. Number nine says her mother’s front door is blue, and it is green.',
      loreText: 'Entry fifty-two is your name, and under it: tea, no sugar. Do not forget this one. It has been gone over in ink more than once.',
      icon: 'notebook',
    },
    {
      id: 'hespers_tape',
      name: 'The Archer’s Tape',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'A cassette tape in a cracked plastic case, kept in an old archer’s coat pocket for forty-one years. The label is in faded marker: H.M., songs for the drive.',
      loreText: 'Nobody in this world can play it. She holds it when she hums, and stops humming when she puts it away.',
      icon: 'tape',
    },
    {
      id: 'porters_strap',
      name: 'A Porter’s Strap',
      tags: ['gear'],
      skillModifiers: { hauling: 2 },
      description: 'A leather carrying strap that goes across the forehead, with the Porters’ Hall mark burned into it. Grete Holm hands one out after a full day of honest loads.',
      loreText: 'Two hundred of them hang on the Hall’s hooks at night. Every one belongs to somebody the crystal read as nothing.',
      icon: 'strap',
    },
    {
      id: 'curry_tin',
      name: 'Half a Tin of Curry Powder',
      tags: ['food', 'personal'],
      skillModifiers: { cooking: 2 },
      description: 'The club’s emergency curry powder, half a tin, from a supermarket you will never see again. Enough for four or five proper dinners if you are careful.',
      loreText: 'Maya has asked about it eleven times since the reading. She can smell it through the lid.',
      icon: 'tin',
    },
    {
      id: 'trip_log',
      name: 'The Club Trip Log',
      tags: ['document', 'personal'],
      skillModifiers: { remembering: 2 },
      description: 'A waterproof notebook with every hike the club ever made: dates, routes, weather, who carried what and who forgot their gloves, in four different handwritings.',
      loreText: 'Rin’s entries are one line long. Maya’s have footnotes. Saki’s are lists of what everybody ate.',
      icon: 'book',
    },
    {
      id: 'club_kitty',
      name: 'The Club Kitty',
      tags: ['money', 'personal'],
      skillModifiers: { smooth_talk: 1 },
      description: 'A zip bag of coins from home and a receipt book. Worthless as money here. A collector in the Low Market would pay real silver for a coin nobody in Varn has ever seen.',
      loreText: 'The receipt book still has the hut booking for tonight, on a mountain in another world.',
      icon: 'coin-purse',
    },
    {
      id: 'red_pods',
      name: 'A Twist of Red Pods',
      tags: ['food'],
      skillModifiers: { cooking: 1 },
      description: 'A paper twist of dried red pods from a Low Market spice stall. The nearest thing to chilli in this kingdom, and close enough to make Maya go very quiet.',
      loreText: 'The stallholder calls them fire-peppers and sells them to sailors.',
      icon: 'spice',
    },
  ],
  abilities: [
    {
      id: 'say_it_plainly',
      name: 'Say It Plainly',
      tags: ['social'],
      description: 'Tell somebody the true thing without dressing it up, and take whatever comes back.',
      affordances: ['tell her the truth', 'say it', 'be honest', 'tell them', 'tell them about the cost', 'speak up', 'answer her', 'i am coming'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_round',
      name: 'Talk Round It',
      tags: ['social'],
      description: 'Bargain, bluff or talk somebody into letting you do the thing they were told not to let you do.',
      affordances: ['lie', 'bluff', 'bargain', 'haggle', 'talk my way in', 'talk him round', 'persuade', 'make an excuse'],
      costs: [{ resourceId: 'suspicion', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'smooth_talk', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'look_closer',
      name: 'Look Closer',
      tags: ['sight'],
      description: 'Study a face, a room or an object until you see what changed, what is missing or what does not belong.',
      affordances: ['look closer', 'study it', 'inspect', 'examine', 'watch her', 'read the room', 'touch the crystal', 'look at the book'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'noticing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_from_home',
      name: 'Cook From Home',
      tags: ['utility'],
      description: 'Make a dish from home out of what this world has, and put it in front of somebody who has started forgetting what home tastes like.',
      affordances: ['cook', 'make dinner', 'make curry', 'boil noodles', 'feed them', 'light the stove', 'make breakfast', 'cook for her'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'carry_it',
      name: 'Carry It',
      tags: ['utility'],
      description: 'Haul a load, lift what is stuck, or stand under a weight longer than anybody expects you to.',
      affordances: ['carry', 'haul', 'lift', 'pick it up', 'carry the load', 'take the sacks', 'shoulder it', 'help with the baggage'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'hauling', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Get somewhere in the palace you are not meant to be, or out of somewhere you are, without anybody marking when.',
      affordances: ['sneak', 'slip away', 'sneak in', 'climb the wall', 'hide', 'get past the guard', 'go round the back'],
      costs: [{ resourceId: 'suspicion', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'quiet_feet', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight_dirty',
      name: 'Fight Dirty',
      tags: ['combat'],
      description: 'Punch, shove, swing a pan or a pack strap. No class, no training, and nobody expects it from you.',
      affordances: ['punch', 'hit', 'shove', 'swing the pan', 'fight', 'tackle', 'hit the faded', 'attack'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'hauling', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lean_on_them',
      name: 'Lean On Them',
      tags: ['social'],
      description: 'Ask Rin, Maya or Saki to use her class to solve the thing in front of you. It always works, and it always costs her.',
      affordances: ['ask her to use magic', 'ask rin to cut it', 'ask maya to burn it', 'ask saki to heal', 'get them to do it', 'ask for a spell'],
      costs: [{ resourceId: 'fading', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tell_it_back',
      name: 'Tell It Back',
      tags: ['social'],
      description: 'Give one of them back a piece of home she has lost, a name, a colour, a song, in enough detail that it sticks.',
      affordances: ['tell her about home', 'remind her', 'show her the photo', 'tell her the dog’s name', 'sing it', 'finish the tune', 'give it back'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'remembering', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['cost_known'],
        lockedCopy: 'Give back what? Nobody has said anything is missing. As far as you know, everybody here still remembers home as well as you do.',
      },
    },
    {
      id: 'take_the_weight',
      name: 'Take the Weight',
      tags: ['porter'],
      description: 'Lift a wound, a weight or an exhaustion off one person and carry it yourself, for as long as you can stand under it.',
      affordances: ['take it from her', 'take the wound', 'carry it for her', 'take the weight', 'take her pain', 'carry her'],
      costs: [{ resourceId: 'stamina', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'bearing', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:porter'],
        lockedCopy: 'You can carry a sack of turnips and a sixty-litre pack. Carrying somebody else’s wound is not a thing a person can do, as far as you know.',
      },
    },
    {
      id: 'carry_the_cost',
      name: 'Carry the Cost',
      tags: ['porter'],
      description: 'Take the price of one of her arts on yourself: the memory goes from you instead of from her.',
      affordances: ['take the cost', 'pay it for her', 'let it take mine', 'carry the cost', 'forget it instead of her'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'bearing', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['porter_can_carry'],
        lockedCopy: 'Her spell takes something of hers. You have never carried anything that was not made of rope, canvas or stone.',
      },
    },
    {
      id: 'lift_the_class',
      name: 'Lift the Class',
      tags: ['porter'],
      description: 'Lift a whole called class off a hero and set it down where it cannot be picked up again. She is ordinary, and the kingdom has lost a hero.',
      affordances: ['lift the class', 'take her class', 'make her ordinary', 'take it off her', 'unmake the class'],
      costs: [
        { resourceId: 'stamina', amount: 25 },
        { resourceId: 'suspicion', amount: 20 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'bearing', baseDc: 17 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['porter_can_carry'],
        lockedCopy: 'The crystal gave her that class in front of a hundred priests. Nothing in this world takes it back, as far as anybody has told you.',
      },
    },
    {
      id: 'carry_them_home',
      name: 'Carry Them Home',
      tags: ['porter'],
      description: 'Aim the Calling backwards through the Hall with your own memory of home, and carry whoever will come with you through it.',
      affordances: ['send them home', 'take them home', 'run the calling backwards', 'carry them home', 'open the way home', 'the sending'],
      costs: [
        { resourceId: 'stamina', amount: 30 },
        { resourceId: 'suspicion', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'MULTI',
      check: { attribute: 'resolve', skillId: 'bearing', baseDc: 18 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_sending', 'porter_can_carry'],
        maxResources: [{ resourceId: 'fading', value: 75 }],
        lockedCopy: 'Everyone in the palace says the same thing: the Calling goes one way. Nobody called has ever gone back.',
      },
    },
  ],
  locations: [
    {
      id: 'hall_of_calling',
      name: 'The Hall of Calling',
      shortName: 'The Hall',
      description:
        'A vaulted stone hall under the High Chapel, cold even in summer. A circle is cut into the floor with three carved seats, and a scuffed fourth mark outside it where you landed. The reading crystal sits on a black altar at the far end. The Choir holds a vigil here every evening and reads the heroes again.',
      artDirection:
        'Vast vaulted stone hall lit by candles and a glowing crystal on a black altar, a large circle carved into the floor with three stone seats, white-robed priests in rows, gold light and deep blue shadow. Solemn, huge, a little cold.',
      connections: [
        { to: 'heroes_wing', travelMinutes: 4, label: 'Up the stairs to the guest apartments' },
        { to: 'cloister', travelMinutes: 2, label: 'Through the vestry door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'side_gate_purse', qty: 1, ownerId: 'bastian', aka: ['purse', 'the purse', 'the writ', 'forty crowns', 'the money'] },
      ],
    },
    {
      id: 'heroes_wing',
      name: 'The Heroes’ Wing',
      shortName: 'The Wing',
      description:
        'Guest apartments for three: three bedrooms with three beds, a common room with one couch, a balcony over the palace roofs, and a bell-pull that summons a servant who is clearly afraid of Rin. Nobody planned a fourth room.',
      artDirection:
        'Grand fantasy guest apartment common room at night, three doors to bedrooms, one velvet couch, a hiking pack dumped on a carpet, a balcony with palace rooftops beyond. Warm lamplight, slightly too fancy for its guests.',
      connections: [
        { to: 'hall_of_calling', travelMinutes: 4, label: 'Down to the Hall' },
        { to: 'long_kitchen', travelMinutes: 3, label: 'The back stairs to the kitchens' },
        { to: 'drill_yard', travelMinutes: 4, label: 'Out to the yard' },
        { to: 'glass_tower', travelMinutes: 5, label: 'Across the bridge to the tower' },
        { to: 'mercy_ward', travelMinutes: 5, label: 'Down to the lower court' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'mayas_list', qty: 1, ownerId: 'maya', aka: ['the list', 'maya’s list', 'the ledger', 'her notebook'] },
      ],
    },
    {
      id: 'long_kitchen',
      name: 'The Long Kitchen',
      shortName: 'Kitchen',
      description:
        'The palace kitchens: a vaulted room a hundred feet long, six hearths, a larder the size of a chapel and cooks who do not want a stranger near their fire. There is no chilli in this kingdom. A door at the far end takes deliveries from the side gate.',
      artDirection:
        'Enormous medieval palace kitchen, six fireplaces, copper pots, hanging herbs and hams, flour on long tables, a small modern camp stove looking absurd on a corner of the bench. Busy, hot, golden.',
      connections: [
        { to: 'heroes_wing', travelMinutes: 3, label: 'Back up the stairs' },
        { to: 'side_gate', travelMinutes: 2, label: 'Out through the delivery door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'drill_yard',
      name: 'The Drill Yard',
      shortName: 'The Yard',
      description:
        'A sanded yard ringed by the guardhouse and the stables, where Sir Bastian’s forty knights drill at dawn. Oak practice posts stand in a row. The palace’s east gate opens off the far end onto the road out of the city.',
      artDirection:
        'Sanded castle training yard at dawn, a row of thick oak practice posts, knights in plain plate drilling, a guardhouse with a lantern, a heavy gate at the far end. Dust, early light, hard work.',
      connections: [
        { to: 'heroes_wing', travelMinutes: 4, label: 'Back inside' },
        { to: 'east_road', travelMinutes: 30, label: 'Out through the east gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
    },
    {
      id: 'glass_tower',
      name: 'The Glass Tower',
      shortName: 'The Tower',
      description:
        'The Choir’s mage tower: nine floors of lenses, burn-marked tables and books that hum when you open them. By the second day Maya has taken over the fourth floor and labelled everything, and one window has blown out and been boarded over.',
      artDirection:
        'Tall fantasy mage tower interior, spiral stairs, brass lenses and floating sparks, long tables scorched black, handwritten paper labels stuck on everything, one boarded window. Blue light, clutter, mischief.',
      connections: [
        { to: 'heroes_wing', travelMinutes: 5, label: 'Back across the bridge' },
        { to: 'cloister', travelMinutes: 3, label: 'Down the tower stair to the cloister' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
    },
    {
      id: 'mercy_ward',
      name: 'The Mercy Ward',
      shortName: 'The Ward',
      description:
        'A long ward in the palace’s lower court: forty beds of soldiers brought back from the east. Some have sword cuts. Some have patches of skin gone grey and quiet, and those beds are screened off. Saki trains here.',
      artDirection:
        'Long stone infirmary hall with rows of simple beds, linen screens, basins and lamps, a healer’s soft white glow at one bedside. Quiet, clean, tired, kind.',
      connections: [{ to: 'heroes_wing', travelMinutes: 5, label: 'Back up to the Wing' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'cloister',
      name: 'The Cloister',
      shortName: 'Cloister',
      description:
        'The Choir’s quarters: a square walk of pillars round an herb garden, cells for the priests, the vestry door into the Hall of Calling, a locked iron door to the archive, and a green door in the wall to a garden nobody is meant to visit.',
      artDirection:
        'Quiet stone cloister walk around a small herb garden, pillars and arches, priests in white walking with books, an iron-banded door and a small green wooden door in an old wall. Evening, hush, incense.',
      connections: [
        { to: 'hall_of_calling', travelMinutes: 2, label: 'Through the vestry into the Hall' },
        { to: 'glass_tower', travelMinutes: 3, label: 'Up the tower stair' },
        { to: 'still_garden', travelMinutes: 2, label: 'Through the green door' },
        { to: 'sealed_archive', travelMinutes: 2, lockedByFlag: 'archive_open', label: 'Through the iron door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
    },
    {
      id: 'still_garden',
      name: 'The Still Garden',
      shortName: 'The Garden',
      description:
        'A walled garden behind the cloister, very quiet. One pear tree, a bench under it, a row of straw archery butts and an old woman who puts every arrow in the same hole. A small cottage in the corner where she sleeps.',
      artDirection:
        'Small walled garden with one old pear tree and a wooden bench, straw archery targets with arrows clustered in the centre, a tiny stone cottage, ivy, soft morning light. Peaceful, a little sad.',
      connections: [{ to: 'cloister', travelMinutes: 2, label: 'Back through the green door' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: -1 },
      takeableItems: [
        { itemId: 'hespers_tape', qty: 1, ownerId: 'hesper', aka: ['the tape', 'the cassette', 'her tape', 'the archer’s tape'] },
      ],
    },
    {
      id: 'sealed_archive',
      name: 'The Sealed Archive',
      shortName: 'Archive',
      description:
        'A long low room of shelves and chained books under the cloister. The reading book of every Calling is here, the newest open on a lectern. Somebody has scraped one line on its last page with a knife.',
      artDirection:
        'Low vaulted archive of chained books on dark shelves, one huge book open on a lectern under a single lamp, dust in the light. Close, secret, old.',
      connections: [{ to: 'cloister', travelMinutes: 2, label: 'Back up to the cloister' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: -2 },
      takeableItems: [
        { itemId: 'reading_book', qty: 1, ownerId: 'odessa', aka: ['the reading book', 'the book', 'the register', 'the big book'] },
      ],
    },
    {
      id: 'side_gate',
      name: 'The Side Gate',
      shortName: 'Side Gate',
      description:
        'The servants’ and deliveries’ gate in the palace’s west wall: a lantern, a bar, a bench for the guard, and carts of turnips and firewood coming in all day. This is where the classless are put out.',
      artDirection:
        'Small arched service gate in a thick palace wall at night, one hanging lantern, a wooden bar, a cart of firewood, the lit city street beyond. Modest, practical, a little lonely.',
      connections: [
        { to: 'long_kitchen', travelMinutes: 2, label: 'In to the kitchens' },
        { to: 'low_market', travelMinutes: 6, label: 'Down into the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
    },
    {
      id: 'low_market',
      name: 'The Low Market',
      shortName: 'Market',
      description:
        'The city below the palace walls: awnings, carts, a fish smell, spice stalls selling red pods that are nearly chilli, and a whole street where nobody moves a load without a porter’s strap. News of the three heroes is on every corner. News of the fourth is not.',
      artDirection:
        'Crowded fantasy market street below a palace on a hill, striped awnings, carts, spice stalls with red pods, porters carrying loads with forehead straps. Bright, noisy, dense.',
      connections: [
        { to: 'side_gate', travelMinutes: 6, label: 'Up to the side gate' },
        { to: 'porters_hall', travelMinutes: 4, label: 'To the bottom of the street' },
        { to: 'east_road', travelMinutes: 25, label: 'Out of the city by the east road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [
        { itemId: 'red_pods', qty: 2, ownerId: null, aka: ['red pods', 'the pods', 'the spice', 'chilli', 'fire-peppers'] },
      ],
    },
    {
      id: 'porters_hall',
      name: 'The Porters’ Hall',
      shortName: 'Porters’ Hall',
      description:
        'A long timber hall at the bottom of the market street: benches, a soup cauldron, tally sticks on hooks and two hundred people the crystal read as nothing. At sundown they bang their bowls and sing the carrying song.',
      artDirection:
        'Long timber guild hall with trestle tables, a big soup cauldron, leather straps and notched tally sticks hanging on hooks, tired cheerful workers singing. Warm, loud, communal.',
      connections: [{ to: 'low_market', travelMinutes: 4, label: 'Back up the street' }],
      discoveredByDefault: true,
      mapPosition: { x: -3, y: 2 },
    },
    {
      id: 'east_road',
      name: 'The East Road',
      shortName: 'East Road',
      description:
        'The road out of the east gate toward the river Wend, a day’s march away. Fields first, then empty farms, then a horizon gone the colour of ash. The column goes this way on the seventh morning. Faded things have been seen on it at night.',
      artDirection:
        'Long dirt road leading away from a walled city through fields into a grey, colourless horizon, empty farmhouses, a single crow. Wide, quiet, ominous.',
      connections: [
        { to: 'drill_yard', travelMinutes: 30, label: 'Back in through the east gate' },
        { to: 'low_market', travelMinutes: 25, label: 'Back into the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
    },
  ],
  /**
   * Order matters: PUBLIC_VIOLENCE takes the first faction in array order, and
   * a fight anywhere in this palace is the escort's business before it is
   * anybody else's.
   */
  factions: [
    {
      id: 'faction_escort',
      name: 'Sir Bastian’s Company',
      description: 'Forty knights escorting the three heroes east on the seventh morning. Most of them came back from the river last spring and not all of their friends did. They have orders about the classless one and opinions about the heroes.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'The classless one' },
        { atReputation: 25, label: 'Useful' },
        { atReputation: 55, label: 'One of the column' },
      ],
      allies: ['faction_choir'],
      enemies: [],
    },
    {
      id: 'faction_choir',
      name: 'The Choir',
      description: 'Varn’s priesthood. It performs the Calling, reads the heroes at the crystal every evening, trains them in the tower and on the ward, and keeps the reading book locked under the cloister. It cannot lie in the Hall, and chooses carefully where it stands.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'An accident of the rite' },
        { atReputation: 30, label: 'Tolerated' },
        { atReputation: 60, label: 'Trusted with the vigil' },
      ],
      allies: ['faction_escort'],
      enemies: [],
    },
    {
      id: 'faction_porters',
      name: 'The Porters’ Hall',
      description: 'The guild of everybody the crystal read as nothing: two hundred carriers, a silver a day, soup at sundown and an old carrying song. The column east needs sixty of them for its baggage, and their forewoman is short of backs.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A stranger with a big pack' },
        { atReputation: 30, label: 'On the tally' },
        { atReputation: 60, label: 'Hall family' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'rin',
      name: 'Rin Morikawa',
      role: 'Your club captain, read tonight as a Sword Saint. She wants you off the road east',
      cardBlurb:
        'She tied the knots on the ridge, she calls you Pack, and she just told a whole hall that you slow her down. She wants you gone before the march and will not tell you why.',
      pronouns: 'she/her',
      publicTraits: ['Gives orders like she is calling a rope team', 'Jokes when she is frightened', 'Never says please'],
      hiddenDrives: [
        'She would rather you hated her, safe in the capital, than watched her walk into the grey',
        'She tied every knot on that ridge, so she has decided everything since is hers to answer for',
      ],
      values: ['Everybody off the mountain, every time', 'Doing the hard thing first so nobody else has to'],
      fears: ['Forgetting you while you stand there watching it happen', 'Being the captain who lost a member'],
      socialStyle:
        'Decides for the group out loud and fast, then checks in private whether anybody hated it. Turns her back to say anything that matters.',
      boundaries: [
        'Will not beg anybody for anything, including you',
        'Will not let anybody carry her sword, or her guilt',
      ],
      goals: ['Get you out of the column before the seventh morning', 'Learn the sword fast enough that the other two never have to fight'],
      secrets: [
        {
          id: 'rin_biscuit',
          fact: 'After her first sword art in the drill yard on the first morning, she could not remember the name of the dog she grew up with. It was Biscuit. She has told nobody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She asks you, as a joke, what her dog was called. If you answer without making it a joke, and later ask her straight what else has gone, she tells you.',
        },
        {
          id: 'rin_the_maps',
          fact: 'She has seen Sir Bastian’s maps of the east. Half the knights who crossed the river last spring did not come back, and the ones who did came back grey in patches. That is why she wants you on the north road.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'In the yard at night, if you have carried something heavy for her without being asked.',
        },
      ],
      speechStyle:
        'Clipped captain’s calls: short imperatives, no please, a nickname instead of a name. Makes a joke at exactly the moment she is most scared, then changes the subject.',
      topics: ['the ridge', 'the knots', 'the sword', 'the road east', 'her dog', 'the club'],
      voiceSamples: [
        'Pack. Bags down, boots off, sleep. That is an order.',
        'I tied those knots. Mine. So whatever happens next is mine as well.',
        'Sword’s easy. Point, swing, post falls over. Ask me something hard.',
        'Go north, Pack. Somebody has to tell my mum I’m fine.',
        'What was my dog called? Joke. It’s a joke. Answer anyway.',
      ],
      appearance:
        'An adult woman, tall and athletic, short black hair cut ragged at the jaw, sharp dark eyes, a red hiking shell jacket over a borrowed steel breastplate, a climbing harness still buckled at her waist, and a long straight sword she has owned for one day.',
      visualHook: 'A cut length of orange climbing rope still knotted to her harness, swinging at her hip.',
      silhouette: 'Square-shouldered, sword held low in one hand, weight forward, turned half away.',
      artSeed: 'thaap-rin-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grinning', 'worried', 'flustered'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'heroes_wing', activity: 'sleeping in the room nearest the door, boots by the bed' },
        { startMinute: 360, endMinute: 720, locationId: 'drill_yard', activity: 'training with Bastian’s knights, sword arts at the oak posts' },
        { startMinute: 720, endMinute: 780, locationId: 'long_kitchen', activity: 'eating standing up, back to the wall' },
        { startMinute: 780, endMinute: 1080, locationId: 'drill_yard', activity: 'drilling alone after the knights have gone' },
        { startMinute: 1080, endMinute: 1140, locationId: 'heroes_wing', activity: 'on the couch she claimed, re-tying the same knot' },
        { startMinute: 1140, endMinute: 1260, locationId: 'hall_of_calling', activity: 'at the evening vigil, being read again' },
        { startMinute: 1260, endMinute: 1440, locationId: 'heroes_wing', activity: 'in the common room, awake, pretending otherwise' },
      ],
      homeLocationId: 'heroes_wing',
      knowledgeScope: ['the_club', 'the_ridge', 'the_knots', 'rin', 'drill_yard', 'bastians_maps', 'home'],
      startingRelationship: { trust: 55, affection: 62, respect: 50, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'rin_admits_the_dog',
          label: 'She tells you what the sword took',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['post_cut'] },
        },
        {
          id: 'rin_says_why',
          label: 'She says plainly why she wants you gone',
          kind: 'ROMANCE',
          requires: { trust: 62, affection: 72 },
        },
      ],
      attributes: { might: 15, agility: 15, mind: 11, presence: 13, resolve: 14, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 19, damage: 14, tags: ['sword-saint', 'hero'] },
    },
    {
      id: 'maya',
      name: 'Maya Tanabe',
      role: 'Physics postgraduate, read tonight as an Archmage. She wants you close',
      cardBlurb:
        'She has been an Archmage for ten minutes and is already running it like lab work. She wants you close for the stove, the food and her experiments, and because you are the one person here she trusts.',
      pronouns: 'she/her',
      publicTraits: ['Talks in numbered lists', 'Always hungry', 'Deadpan until something explodes'],
      hiddenDrives: [
        'The thing she is best at is remembering, and she has worked out that it is exactly what the class eats',
        'She wants somebody to notice she is frightened without her having to say so',
      ],
      values: ['Data first, then feelings, properly', 'A hot meal at the end of a bad day'],
      fears: ['Waking up clever and empty, with nothing in her head worth knowing', 'Crossing out an entry about you'],
      socialStyle:
        'Turns every feeling into a hypothesis and tests it on you. Feeds people, or demands to be fed, depending on the hour.',
      boundaries: [
        'Will not stop using magic because somebody asks nicely; she needs a better argument than nice',
        'Will not let anybody read her list over her shoulder',
      ],
      goals: ['Measure exactly what the class costs before the march', 'Keep you within shouting distance of her tower, and the stove within reach of her'],
      secrets: [
        {
          id: 'maya_the_list',
          fact: 'She has started a numbered list of facts about home in a Choir ledger. Entry fifty-two is the player’s name and, under it, "tea, no sugar. Do not forget this one."',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the list if you cook her something from home and ask what she keeps writing.',
        },
        {
          id: 'maya_the_door',
          fact: 'She thinks her mother’s front door is blue. It is green. She has already lost it and does not know.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you read her list aloud, number nine is wrong, and you will know it is.',
        },
      ],
      speechStyle:
        'Fast, nerdy and deadpan. Numbers her points, calls feelings hypotheses, and asks about food in the middle of anything.',
      topics: ['the tower', 'her list', 'the stove', 'how magic works', 'food from home', 'the control group'],
      voiceSamples: [
        'First, you cook. Second, I test whether fireballs scale with lunch. Third, we panic later, on schedule.',
        'Control group. Classless baseline. Extremely important. Also, you are holding the noodles.',
        'Hypothesis: something in this class is eating my memory. Evidence: I cannot find my front door.',
        'Hand me that spoon. No, the other spoon. Science requires soup.',
      ],
      appearance:
        'An adult woman, medium height, long dark hair in a messy bun stabbed through with a pencil, round glasses, a grey hoodie under a midnight-blue mage’s robe rolled to the elbows, and small blue sparks crawling over her fingertips.',
      visualHook: 'Round glasses that catch the blue sparks on her fingers, and a pencil stuck through her bun.',
      silhouette: 'Hunched over a ledger, one sparking hand raised mid-sentence.',
      artSeed: 'thaap-maya-01',
      portrait: null,
      expressions: ['neutral', 'curious', 'delighted', 'worried', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'heroes_wing', activity: 'asleep under a heap of the Choir’s books' },
        { startMinute: 420, endMinute: 720, locationId: 'glass_tower', activity: 'training on the fourth floor, breaking things on purpose' },
        { startMinute: 720, endMinute: 800, locationId: 'long_kitchen', activity: 'in the kitchen asking every cook where the chilli is' },
        { startMinute: 800, endMinute: 1140, locationId: 'glass_tower', activity: 'running experiments that need a control group' },
        { startMinute: 1140, endMinute: 1260, locationId: 'hall_of_calling', activity: 'at the evening vigil, taking notes on her own reading' },
        { startMinute: 1260, endMinute: 1440, locationId: 'heroes_wing', activity: 'writing her numbered list by lamplight' },
      ],
      homeLocationId: 'heroes_wing',
      knowledgeScope: ['the_club', 'maya', 'glass_tower', 'magic_theory', 'home', 'the_list'],
      startingRelationship: { trust: 65, affection: 60, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'maya_shows_the_list',
          label: 'She shows you her list',
          kind: 'TRUST',
          requires: { trust: 68 },
        },
        {
          id: 'maya_entry_one',
          label: 'She says what she wants, without a hypothesis in front of it',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 72 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 18, presence: 12, resolve: 12, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 14, damage: 15, tags: ['archmage', 'hero'] },
    },
    {
      id: 'saki',
      name: 'Saki Hirose',
      role: 'Was training as a nurse, read tonight as a Saint. She wants you to decide for yourself',
      cardBlurb:
        'She is the quiet one, and she stepped between a knight and you to ask one question. She will not decide anything for you, and she would very much like somebody to stop deciding things for her.',
      pronouns: 'she/her',
      publicTraits: ['Says very little', 'Answers a question with a question', 'Steady hands'],
      hiddenDrives: [
        'She does not want to go home, and has told nobody',
        'Her parents chose her course, her job and her shoes; she joined the club to have one thing that was hers',
      ],
      values: ['Everyone chooses for themselves, including about her', 'Looking after whoever is in the bed in front of her'],
      fears: ['Being handed a life again, by a kingdom this time', 'Finding out she is glad to forget home'],
      socialStyle:
        'Listens until you have said more than you meant to. Steps in physically when somebody is being cornered, and then says one sentence.',
      boundaries: [
        'Will not choose for you, even if you beg her to',
        'Says no as a complete sentence, and means it',
      ],
      goals: ['Make sure you choose for yourself before the seventh morning', 'Find out what the hum under Rin’s skin is'],
      secrets: [
        {
          id: 'saki_the_hum',
          fact: 'The Saint class lets her hear a hum under the skin of every called hero, like a fridge in another room. It gets louder each time one of them uses an art. Rin’s is the loudest. The player has none at all.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you on the Mercy Ward if you ask what she hears, instead of what she sees.',
        },
        {
          id: 'saki_not_going_home',
          fact: 'She does not want to go home, and has told nobody. Forgetting it frightens her less than it should, and that frightens her more.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you have asked what she wants and then not argued with the answer.',
        },
      ],
      speechStyle:
        'Few words, mostly questions. Says "No." as a complete sentence. Never raises her voice; moves closer instead.',
      topics: ['the ward', 'the hum', 'what you want', 'her parents', 'nursing', 'going home'],
      voiceSamples: [
        'No.',
        'Why ask me? Whose life is it?',
        'Hold still. This part feels warm.',
        'Rin hums louder each day. Can you hear it? Good. You shouldn’t.',
        'Decide. Out loud. Before somebody else does it for you.',
      ],
      appearance:
        'An adult woman of medium height, composed, with a nurse’s steady posture, chin-length brown hair held back with a plain clip, calm grey eyes, a white Choir healer’s mantle over a green fleece and hiking trousers, and a first-aid pouch on her belt she will not take off.',
      visualHook: 'A worn green fleece under a white healer’s mantle, and a first-aid pouch she keeps one hand on.',
      silhouette: 'Very still, stepping in between, one hand held out flat.',
      artSeed: 'thaap-saki-01',
      portrait: null,
      expressions: ['neutral', 'quiet', 'warm', 'worried', 'determined'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'heroes_wing', activity: 'asleep, or lying awake very still' },
        { startMinute: 390, endMinute: 720, locationId: 'mercy_ward', activity: 'training on the ward, hands on a soldier’s wound' },
        { startMinute: 720, endMinute: 780, locationId: 'still_garden', activity: 'eating lunch on the bench under the pear tree' },
        { startMinute: 780, endMinute: 1140, locationId: 'mercy_ward', activity: 'on the ward, behind the screens with the grey-patched beds' },
        { startMinute: 1140, endMinute: 1260, locationId: 'hall_of_calling', activity: 'at the evening vigil, listening to the hum' },
        { startMinute: 1260, endMinute: 1440, locationId: 'heroes_wing', activity: 'on the window seat with the balcony door open' },
      ],
      homeLocationId: 'heroes_wing',
      knowledgeScope: ['the_club', 'saki', 'mercy_ward', 'the_hum', 'home', 'hesper'],
      startingRelationship: { trust: 52, affection: 50, respect: 55, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'saki_says_what_she_hears',
          label: 'She tells you about the hum',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'saki_chooses',
          label: 'She says what she wants, out loud',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 70 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 14, presence: 11, resolve: 17, arcana: 16 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 13, damage: 2, tags: ['saint', 'hero'] },
    },
    {
      id: 'bastian',
      name: 'Sir Bastian Vell',
      calledName: 'Bastian',
      role: 'Knight-commander of the heroes’ escort, with written orders to put you out',
      cardBlurb:
        'He has buried thirty-one of his men east of the river and he thinks hope is the cruel part. His orders say you leave tonight, and he does not much care whether you think that is fair.',
      pronouns: 'he/him',
      publicTraits: ['Formal to the point of rudeness', 'Counts everything', 'Never late'],
      hiddenDrives: [
        'He wants the heroes to forget home fast, because a hero who remembers grieves on the march',
        'Every dawn he brings pears to a woman who calls him Captain and does not know he is her son',
      ],
      values: ['Written orders, followed', 'Bringing back the ones he took'],
      fears: ['A hero breaking on the road because somebody gave her hope', 'His mother dying without once saying his name'],
      socialStyle:
        'Addresses people by function rather than name. Gives an order once, then rests his hand on his sword and waits.',
      boundaries: [
        'Will not disobey a written order without a written reason',
        'Will not talk about the garden, to anyone',
      ],
      goals: ['Three settled heroes on the road on the seventh morning', 'The classless one out of the palace, tonight, quietly'],
      secrets: [
        {
          id: 'bastian_mother',
          fact: 'Hesper, the archer of the last Calling, is his mother. She had him six years after her Calling and stopped knowing him the year he became a squire. She calls him Captain.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you see him in the garden at dawn with the pears and tell nobody about it for a day.',
        },
        {
          id: 'bastian_the_count',
          fact: 'He keeps thirty-one names on a strip of vellum inside his breastplate: the men he lost over the river last spring.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He recites them if you ask how many he has buried, and do not look away.',
        },
      ],
      speechStyle:
        'Formal, military, terse. Counts things aloud. Calls people by function: the classless one, the Sword Saint. Cites orders.',
      topics: ['his orders', 'the column', 'the river Wend', 'the dead', 'the pears', 'the heroes'],
      voiceSamples: [
        'My orders are written. Yours are not. That settles it.',
        'Thirty-one. I carried eleven of them back myself. Spare me fair.',
        'Forget quickly, and you grieve for a month. Remember, and you grieve on the march.',
        'The pears are for the garden. That is all anyone requires to know about the pears.',
      ],
      appearance:
        'An adult man, broad and weathered, close-cropped grey-brown hair, a short beard, a scar through one eyebrow, plain steel plate scuffed from use under a dark blue surcoat, and a sword whose hilt he rests his hand on while he waits for an answer.',
      visualHook: 'A paper of pears tucked inside his gauntlet at dawn, which he will not explain.',
      silhouette: 'Very upright, one hand on the hilt, the other behind his back.',
      artSeed: 'thaap-bastian-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grim', 'weary'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'drill_yard', activity: 'asleep in the guardhouse, in his boots' },
        { startMinute: 330, endMinute: 420, locationId: 'still_garden', activity: 'on the bench under the pear tree with a paper of pears' },
        { startMinute: 420, endMinute: 720, locationId: 'drill_yard', activity: 'drilling the knights and the Sword Saint' },
        { startMinute: 720, endMinute: 1140, locationId: 'drill_yard', activity: 'maps and supply lists in the guardhouse' },
        { startMinute: 1140, endMinute: 1260, locationId: 'hall_of_calling', activity: 'standing guard at the evening vigil' },
        { startMinute: 1260, endMinute: 1320, locationId: 'side_gate', activity: 'checking the side gate himself' },
        { startMinute: 1320, endMinute: 1440, locationId: 'drill_yard', activity: 'walking the walls before he sleeps' },
      ],
      homeLocationId: 'drill_yard',
      knowledgeScope: ['bastian', 'the_column', 'the_east', 'the_orders', 'hesper', 'the_river_wend'],
      startingRelationship: { trust: 5, affection: 0, respect: 10, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'bastian_about_the_garden',
          label: 'He talks about the woman in the garden',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['knows_her_name'] },
        },
        {
          id: 'bastian_turns',
          label: 'He tears up an order for you',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 55, flagsSet: ['helen_remembered'] },
        },
      ],
      attributes: { might: 16, agility: 12, mind: 12, presence: 13, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 17, damage: 11, tags: ['knight'] },
    },
    {
      id: 'odessa',
      name: 'Odessa Marrin',
      calledName: 'Odessa',
      role: 'High Cantor of the Choir, who performed the Calling',
      cardBlurb:
        'She performed the Calling, she grieves for every hero she has ever spent, and she spends them anyway. She cannot lie to you under the crystal, so she chooses very carefully where she stands when you ask.',
      pronouns: 'she/her',
      publicTraits: ['Gentle', 'Patient beyond reason', 'Sings even the bad news'],
      hiddenDrives: [
        'She scraped the player’s line out of the reading book, because a porter can take the heroes off the board',
        'She believes the kingdom survives at exactly the price the books say it costs, and that somebody has to pay it on purpose',
      ],
      values: ['The kingdom outlives everybody in this room', 'Mercy, where it is affordable'],
      fears: ['A fourth on a tether, again', 'Being asked the right question in the wrong room'],
      socialStyle:
        'Speaks as if in liturgy. Answers the question beside the one you asked. Leaves the Hall before she can be cornered in it.',
      boundaries: [
        'Will not lie under the crystal; she goes silent instead',
        'Will not call off the march, for anybody',
      ],
      goals: ['Three settled heroes on the road east', 'Keep the porter from finding out what a porter is'],
      secrets: [
        {
          id: 'odessa_scraped_it',
          fact: 'She scraped the player’s line out of the reading book with a knife. Under it is the word PORTER. She knows what a porter can do, and that the Sending is real.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask her what the crystal read while you are both standing in the Hall of Calling, after you have seen the scraped page.',
        },
        {
          id: 'odessa_settling',
          fact: 'The Choir has always known that called classes burn memories of home. Its word for it is settling. She chose not to tell the heroes.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if asked plainly in the Hall, under the crystal, where she cannot lie.',
        },
      ],
      speechStyle:
        'Gentle, measured, liturgical. Calls people "my dear". Answers sideways, and sings a line when she would rather not speak one.',
      topics: ['the Calling', 'the crystal', 'settling', 'the reading book', 'the war', 'the last Calling'],
      voiceSamples: [
        'Blessed are the called, for they carry the kingdom. Blessed, and sorry, and needed.',
        'Ask me in the cloister, my dear. In the Hall I am obliged to answer, and I would rather not.',
        'Settling is a mercy. A hero with nothing behind her never asks to leave.',
        'I have buried four Callings in these books. I sing for every name.',
      ],
      appearance:
        'An older woman, tall and thin, silver hair braided in a crown, a long white Choir robe embroidered with gold staves of music, ink on her fingers, and a small knife on a chain at her belt for cutting seals.',
      visualHook: 'A small seal-knife on a chain at her belt, its edge freshly cleaned.',
      silhouette: 'Tall in white, hands folded, head tilted as if listening to a hymn.',
      artSeed: 'thaap-odessa-01',
      portrait: null,
      expressions: ['neutral', 'gentle', 'sorrowful', 'evasive'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'cloister', activity: 'asleep in a plain cell like every other priest' },
        { startMinute: 360, endMinute: 600, locationId: 'cloister', activity: 'the morning office, the Choir singing' },
        { startMinute: 600, endMinute: 900, locationId: 'sealed_archive', activity: 'in the archive with the reading book open' },
        { startMinute: 900, endMinute: 1140, locationId: 'glass_tower', activity: 'watching the Archmage’s lessons from the doorway' },
        { startMinute: 1140, endMinute: 1320, locationId: 'hall_of_calling', activity: 'leading the vigil and the evening reading' },
        { startMinute: 1320, endMinute: 1440, locationId: 'cloister', activity: 'walking the cloister alone, singing under her breath' },
      ],
      homeLocationId: 'cloister',
      knowledgeScope: ['the_choir', 'the_calling', 'settling', 'the_reading_book', 'porter', 'the_sending', 'hesper'],
      startingRelationship: { trust: 20, affection: 10, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'odessa_under_the_crystal',
          label: 'She answers you in the Hall',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['knows:the_blank_line'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 16, presence: 17, resolve: 17, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 28, defenseDc: 11, damage: 2, tags: ['choir'] },
    },
    {
      id: 'grete',
      name: 'Grete Holm',
      role: 'Forewoman of the Porters’ Hall, the guild of everybody the crystal read as nothing',
      cardBlurb:
        'She runs two hundred porters, every one of them read as nothing, and she pays a silver a day for a strong back. She will hire you on sight, and she has always wondered about one verse of the carrying song.',
      pronouns: 'she/her',
      publicTraits: ['Loud', 'Cheerful about hard work', 'Can weigh a load by looking at it'],
      hiddenDrives: [
        'She has always wondered about the verse in the carrying song about a carrier tied to three heroes, and nobody has ever told her what it means',
        'She wants the crystal’s nothings treated as people by the palace, for once',
      ],
      values: ['Honest tallies', 'Nobody carries alone'],
      fears: ['The column taking her porters east and bringing back fewer', 'The Hall going hungry in a bad winter'],
      socialStyle: 'Shouts across a market as a form of affection. Sizes you up by your shoulders first and your answers second.',
      boundaries: [
        'Will not cheat a porter out of a tally',
        'Will not sell a porter to the palace for less than a silver a day',
      ],
      goals: ['Sixty strong backs for the column’s baggage by the seventh morning', 'Find out who the new one with the enormous pack is'],
      secrets: [
        {
          id: 'grete_the_verse',
          fact: 'She knows every verse of the carrying song, including the one the palace would rather nobody sang: a carrier who came through the light tied to three heroes, and carried them home.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She sings it for you if you have worked a full day on the tally and ask what the song is about.',
        },
      ],
      speechStyle: 'Loud, cheerful, practical. Trade talk: stones, loads, tallies, backs. Calls everybody "love" or by what they are carrying.',
      topics: ['the Porters’ Hall', 'the carrying song', 'loads and tallies', 'the column’s baggage', 'the palace'],
      voiceSamples: [
        'Ninety pound on your back if it’s an ounce. Who taught you to lift, love?',
        'Silver a day, soup at sundown, nobody carries alone. Strap’s on the hook.',
        'Read as nothing, were you? Welcome. So were two hundred of us.',
        'Turnips to the kitchen, firewood to the cloister, and don’t let the cooks short you.',
      ],
      appearance:
        'An adult woman, broad and strong, red cheeks, grey-blonde hair tied up in a scarf, a leather carrying strap pushed up across her forehead like a headband, sleeves rolled over thick forearms, and a notched tally stick behind one ear.',
      visualHook: 'A leather carrying strap worn pushed up across her forehead, and a notched tally stick behind her ear.',
      silhouette: 'Wide-legged and solid, a load on her back she seems to have forgotten about.',
      artSeed: 'thaap-grete-01',
      portrait: null,
      expressions: ['neutral', 'laughing', 'amused', 'sceptical'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'porters_hall', activity: 'asleep in the loft over the hall' },
        { startMinute: 300, endMinute: 660, locationId: 'low_market', activity: 'on the market loads, tally stick in hand' },
        { startMinute: 660, endMinute: 780, locationId: 'side_gate', activity: 'bringing the palace kitchen deliveries in' },
        { startMinute: 780, endMinute: 1080, locationId: 'low_market', activity: 'shouting the afternoon loads up the street' },
        { startMinute: 1080, endMinute: 1440, locationId: 'porters_hall', activity: 'soup, tallies and the carrying song' },
      ],
      homeLocationId: 'porters_hall',
      knowledgeScope: ['grete', 'porters_hall', 'low_market', 'the_carrying_song', 'the_column_baggage'],
      startingRelationship: { trust: 10, affection: 15, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'grete_sings_the_verse',
          label: 'She sings you the old verse',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['porter_of_the_hall'] },
        },
      ],
      attributes: { might: 15, agility: 10, mind: 11, presence: 14, resolve: 14, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 12, damage: 6, tags: ['porter'] },
    },
    {
      id: 'hesper',
      name: 'Hesper',
      role: 'The archer of the last Calling, forty-one years on, living in the Choir’s walled garden',
      cardBlurb:
        'She came through the same circle you did, forty-one years ago, and remembers nothing from before it. She never misses, and she hums eight bars of a song you might know, and stops.',
      pronouns: 'she/her',
      publicTraits: ['Polite to everyone', 'Never misses', 'Hums and stops'],
      hiddenDrives: [
        'She wants to finish the tune',
        'She keeps a cassette tape in her coat that nobody in this world can explain, and she does not know why she will not let go of it',
      ],
      values: ['Courtesy to strangers', 'A clean shot'],
      fears: ['The tune going away entirely', 'The Captain no longer coming at dawn'],
      socialStyle: 'Present tense, fragments, perfectly polite. Calls everybody Captain or friend. Offers you a pear she may not have.',
      boundaries: [
        'Will not leave the garden',
        'Will not give the tape away, though she will let you hold it',
      ],
      goals: ['Finish the tune', 'Put the next arrow in the same hole as the last one'],
      secrets: [
        {
          id: 'hesper_name',
          fact: 'Her name in the reading book is Helen Marsh, twenty-two on the night she was called. Sir Bastian is her son. She knows none of it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The tape’s label says H.M. The reading book says the rest. Bastian can say it, if he is ever asked the right way.',
        },
      ],
      speechStyle: 'Gentle and fragmentary, present tense. Polite to everyone. Calls people Captain or friend. Hums when a sentence runs out.',
      topics: ['the tune', 'the pears', 'the Captain', 'archery', 'the tape', 'the garden'],
      voiceSamples: [
        'Morning, friend. Pears are early. The Captain brings them. Lovely man.',
        'It goes da, da-da, da... and then it doesn’t. Do you know where it goes?',
        'Arrow goes where you look. That part stays. The rest went somewhere.',
        'This? A little box with a ribbon inside. Mine, I think. Gently.',
      ],
      appearance:
        'An older woman, slight and straight-backed, white hair cut short, a faded green coat with deep pockets over a plain grey dress, a longbow taller than she is, and a pear in one hand.',
      visualHook: 'A plastic cassette tape in a cracked case, poking out of her coat pocket.',
      silhouette: 'Small and upright beside a pear tree, bow drawn, perfectly still.',
      artSeed: 'thaap-hesper-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'lost', 'confused'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'still_garden', activity: 'asleep in the cottage in the corner' },
        { startMinute: 330, endMinute: 420, locationId: 'still_garden', activity: 'eating pears on the bench with the Captain' },
        { startMinute: 420, endMinute: 1140, locationId: 'still_garden', activity: 'at the butts, every arrow in the same hole' },
        { startMinute: 1140, endMinute: 1440, locationId: 'still_garden', activity: 'on the bench under the pear tree, humming' },
      ],
      homeLocationId: 'still_garden',
      knowledgeScope: ['hesper', 'still_garden', 'the_last_calling_after', 'archery', 'the_tune'],
      startingRelationship: { trust: 0, affection: 10, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hesper_lets_you_sit',
          label: 'She lets you sit on the bench and hold the tape',
          kind: 'TRUST',
          requires: { trust: 20 },
        },
      ],
      attributes: { might: 9, agility: 14, mind: 9, presence: 11, resolve: 13, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 16, damage: 12, tags: ['archer', 'hero'] },
    },
  ],
  quests: [
    {
      id: 'q_side_gate',
      title: 'Coming, or Not',
      summary: 'Saki asked you, in front of a knight with his hand on his sword, whether you are coming with them or not. Sir Bastian has written orders to put you out of the side gate tonight with a purse.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['saki', 'rin', 'maya', 'bastian'],
      involvedLocationIds: ['hall_of_calling', 'side_gate'],
      knownRewardCopy: 'A bed inside the palace walls tonight, or a purse and the north road.',
      steps: [
        {
          id: 'answer_saki',
          playerCopy: 'Answer Saki before Sir Bastian answers for you.',
          directorNotes:
            'The opening scene, still in the Hall. Every answer is a real one. Rin will argue whichever way the player goes, because she wants them off the road east and cannot say so. Maya argues for food, the stove and her control group. Saki will not take the player’s side or decide for them; she only wants them to choose. Bastian waits with his hand on his hilt and does not draw. If the player touches the crystal again, it frosts over in the shape of their hand, and the High Cantor has it scrubbed before anybody else looks.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_youre_coming',
              label: 'Say you are coming with them',
              predicate: { flagsSet: ['used:say_it_plainly'] },
              setsFlags: ['staying_with_club'],
              closesFlags: ['took_the_purse'],
            },
            {
              routeId: 'stood_with_saki',
              label: 'Go and stand with Saki',
              predicate: { flagsSet: ['spoke:saki'] },
              setsFlags: ['staying_with_club', 'stood_with_saki'],
              closesFlags: ['took_the_purse'],
            },
            {
              routeId: 'cooked_on_the_altar_steps',
              label: 'Light the stove and start cooking, right there',
              predicate: { flagsSet: ['used:cook_from_home'] },
              setsFlags: ['staying_with_club', 'fed_them_first_night'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_purse',
              label: 'Take the purse',
              predicate: { hasItems: ['side_gate_purse'] },
              setsFlags: ['took_the_purse'],
              closesFlags: ['staying_with_club'],
            },
            {
              routeId: 'read_me_again',
              label: 'Put your hand back on the crystal',
              predicate: { flagsSet: ['used:look_closer'], atLocation: 'hall_of_calling' },
              setsFlags: ['knows:the_blank_line', 'crystal_frosted'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['answered_saki'], abilities: [], reputation: [] },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Still be inside the palace walls, or somewhere you chose, when the first night is over.',
          directorNotes:
            'Bastian’s order stands until somebody with standing overrules it. The three heroines refusing to march without the player works; so does the Porters’ Hall hiring them for the palace deliveries, the High Cantor deciding she would rather keep the classless one where she can see them, or the player getting put out and coming back over the wall. Being put out is never the end of the story: the Low Market and the Porters’ Hall are on the other side of that gate.',
          enterWhen: { flagsSet: ['answered_saki'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_three_refused',
              label: 'Let the three of them refuse to march without you',
              predicate: {
                flagsSet: ['staying_with_club'],
                minRelationship: [{ characterId: 'maya', dimension: 'affection', value: 55 }],
              },
              setsFlags: ['kept_by_the_club'],
              closesFlags: [],
            },
            {
              routeId: 'hired_by_the_porters',
              label: 'Get hired by the Porters’ Hall',
              predicate: { flagsSet: ['spoke:grete'] },
              setsFlags: ['porter_of_the_hall', 'kept_as_porter'],
              closesFlags: [],
            },
            {
              routeId: 'the_cantors_guest',
              label: 'Let the High Cantor overrule him',
              predicate: {
                flagsSet: ['spoke:odessa'],
                minRelationship: [{ characterId: 'odessa', dimension: 'trust', value: 25 }],
              },
              setsFlags: ['cantors_guest'],
              closesFlags: [],
            },
            {
              routeId: 'came_back_over_the_wall',
              label: 'Get put out, and come back in anyway',
              predicate: { flagsSet: ['put_out', 'used:slip_away'] },
              setsFlags: ['sneaking_in'],
              closesFlags: [],
            },
            {
              routeId: 'kept_walking',
              label: 'Go, and keep going',
              predicate: { flagsSet: ['took_the_purse', 'visited:low_market'] },
              setsFlags: ['outside_the_walls'],
              closesFlags: ['kept_by_the_club'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['first_night_over'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_what_it_costs',
      title: 'What the Classes Cost',
      summary: 'Rin cut an oak post in half on the first morning and then could not remember her dog’s name. Maya has started a numbered list. Saki can hear something humming. Somebody should find out what the classes are taking.',
      kind: 'MAIN',
      involvedCharacterIds: ['rin', 'maya', 'saki', 'odessa'],
      involvedLocationIds: ['drill_yard', 'glass_tower', 'mercy_ward', 'hall_of_calling'],
      knownRewardCopy: 'The truth about the classes, and a way to slow what they take.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'find_the_price',
          playerCopy: 'Find out what Rin, Maya and Saki are losing.',
          directorNotes:
            'Four ways to learn it, and they are not equivalent. Rin admitting it is trust earned. Reading Maya’s list without asking is a betrayal she is entitled to be angry about. Saki hearing it is the gentlest. Asking the High Cantor under the crystal gets the whole truth in liturgy, and she will never quite forgive the player for the room they asked it in.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rin_admits_it',
              label: 'Get Rin to say what the sword took',
              predicate: {
                flagsSet: ['spoke:rin', 'post_cut'],
                minRelationship: [{ characterId: 'rin', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:the_cost', 'rin_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_list',
              label: 'Read Maya’s list',
              predicate: { hasItems: ['mayas_list'] },
              setsFlags: ['knows:the_cost', 'read_the_list'],
              closesFlags: [],
            },
            {
              routeId: 'saki_hears_it',
              label: 'Ask Saki what she hears',
              predicate: {
                flagsSet: ['spoke:saki'],
                minRelationship: [{ characterId: 'saki', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_cost', 'saki_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'asked_under_the_crystal',
              label: 'Ask the High Cantor, in the Hall, where she cannot lie',
              predicate: { flagsSet: ['spoke:odessa'], atLocation: 'hall_of_calling' },
              setsFlags: ['knows:the_cost', 'cantor_confessed_the_cost'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['cost_known'], abilities: ['tell_it_back'], reputation: [] },
        },
        {
          id: 'what_you_do_about_it',
          playerCopy: 'Decide what to do about it, with them, before the seventh morning.',
          directorNotes:
            'Telling all three is the honest route and it changes the march: they will argue about whether to keep using their classes, and Bastian will be furious with whoever told them. Becoming their memory is the generous route: stories, dinners, photos, the dog’s name over breakfast. Keeping it quiet is reachable by doing nothing for long enough, and must be written as a real choice rather than a mistake.',
          enterWhen: { flagsSet: ['cost_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_all_three',
              label: 'Tell all three of them what the classes cost',
              predicate: { flagsSet: ['used:say_it_plainly'] },
              setsFlags: ['heroes_told'],
              closesFlags: ['kept_quiet'],
            },
            {
              routeId: 'became_their_memory',
              label: 'Keep handing home back to them, one meal and one story at a time',
              predicate: { flagsSet: ['used:tell_it_back', 'used:cook_from_home'] },
              setsFlags: ['keeper_of_home'],
              closesFlags: [],
            },
            {
              routeId: 'kept_it_to_yourself',
              label: 'Say nothing, and let the week run',
              predicate: { flagsSet: ['cost_known'], afterWorldMinute: 5 * 1440 },
              setsFlags: ['kept_quiet'],
              closesFlags: ['heroes_told'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['cost_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_seventh_morning',
      title: 'The Seventh Morning',
      summary: 'On the seventh morning the drums go at dawn and the column marches east with Rin, Maya and Saki at its head. Whatever you have become by then decides where you are standing when it goes.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['rin', 'maya', 'saki', 'bastian'],
      involvedLocationIds: ['drill_yard', 'east_road'],
      knownRewardCopy: 'Where you stand when the column leaves, and who is standing with you.',
      steps: [
        {
          id: 'where_you_stand',
          playerCopy: 'Be somewhere on purpose when the drums start.',
          directorNotes:
            'The end of the week. Nobody waits long. A porter on the list marches with the baggage; a player the three refused to leave behind marches beside them; a club that has told each other everything can vote; and anybody else watches the column go from the gate. None of these is the good ending on its own.',
          enterWhen: { flagsSet: ['seventh_morning'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'marched_as_porter',
              label: 'March with the baggage, strap on your forehead',
              predicate: { flagsSet: ['seventh_morning', 'carrier_listed'] },
              setsFlags: ['marched_with_them'],
              closesFlags: ['stayed_behind'],
            },
            {
              routeId: 'marched_on_their_word',
              label: 'March beside them because they would not go without you',
              predicate: { flagsSet: ['seventh_morning', 'kept_by_the_club'] },
              setsFlags: ['marched_with_them'],
              closesFlags: ['stayed_behind'],
            },
            {
              routeId: 'club_vote',
              label: 'Call a club meeting in the drill yard and vote',
              predicate: {
                flagsSet: ['seventh_morning', 'heroes_told'],
                minRelationship: [
                  { characterId: 'rin', dimension: 'trust', value: 60 },
                  { characterId: 'maya', dimension: 'trust', value: 60 },
                  { characterId: 'saki', dimension: 'trust', value: 60 },
                ],
              },
              setsFlags: ['club_vote'],
              closesFlags: [],
            },
            {
              routeId: 'watched_them_go',
              label: 'Watch the column go from the gate',
              predicate: { flagsSet: ['seventh_morning'] },
              setsFlags: ['stayed_behind'],
              closesFlags: ['marched_with_them'],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['morning_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_struck_line',
      title: 'The Struck Line',
      summary: 'Something about the dark crystal did not add up, and the Choir has been very careful with you since you noticed. Your line in their reading book has been scraped out with a knife.',
      kind: 'LEAD',
      startsActive: false,
      involvedCharacterIds: ['odessa', 'grete', 'hesper'],
      involvedLocationIds: ['hall_of_calling', 'sealed_archive', 'porters_hall'],
      knownRewardCopy: 'What the crystal actually read under your hand, and what you can do with it.',
      discoverWhen: { flagsSet: ['knows:the_blank_line'] },
      steps: [
        {
          id: 'find_the_word',
          playerCopy: 'Find out what the crystal read under your hand.',
          directorNotes:
            'This quest is optional and must feel like it. A player who never sets `knows:the_blank_line` never sees a beat of it, and the week with three heroines, a kitchen and a knight is the complete game. For a player who is here, keep it physical and quiet: a knife-scraped page, an old work song, a High Cantor who cannot lie in one particular room. The word is PORTER, and nobody alive knows exactly what one can do.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_book',
              label: 'Tilt the reading book to the lamp in the archive',
              predicate: { flagsSet: ['knows:the_blank_line'], atLocation: 'sealed_archive' },
              setsFlags: ['knows:porter', 'read_the_book', 'knows:the_sending'],
              closesFlags: [],
            },
            {
              routeId: 'the_carrying_verse',
              label: 'Get Grete Holm to sing you the old verse',
              predicate: { flagsSet: ['knows:the_blank_line', 'porter_of_the_hall', 'spoke:grete'] },
              setsFlags: ['knows:porter', 'heard_the_verse'],
              closesFlags: [],
            },
            {
              routeId: 'the_cantor_under_the_crystal',
              label: 'Ask the High Cantor what the crystal read, in the Hall',
              predicate: {
                flagsSet: ['knows:the_blank_line', 'spoke:odessa'],
                atLocation: 'hall_of_calling',
                minRelationship: [{ characterId: 'odessa', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['knows:porter', 'cantor_admitted', 'knows:the_sending'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['porter_named'], abilities: ['take_the_weight'], reputation: [] },
        },
        {
          id: 'first_load',
          playerCopy: 'Carry something that is not yours to carry.',
          directorNotes:
            'The first time the player lifts a wound or an exhaustion off somebody, it should feel like picking up a sack that turns out to be heavier than it looks, and then like nothing at all. Saki will hear the player hum for the first time. The High Cantor will hear about it within the hour.',
          enterWhen: { flagsSet: ['porter_named'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'carried_a_wound',
              label: 'Take a soldier’s wound on the Mercy Ward',
              predicate: { flagsSet: ['used:take_the_weight', 'visited:mercy_ward'] },
              setsFlags: ['carried_a_wound'],
              closesFlags: [],
            },
            {
              routeId: 'carried_for_rin',
              label: 'Take the ache out of Rin’s sword arm',
              predicate: { flagsSet: ['used:take_the_weight', 'spoke:rin'] },
              setsFlags: ['carried_for_rin'],
              closesFlags: [],
            },
            {
              routeId: 'carried_on_the_wall',
              label: 'Carry somebody off the wall the night the faded come',
              predicate: { flagsSet: ['used:take_the_weight', 'the_wall_night'] },
              setsFlags: ['carried_on_the_wall'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['porter_can_carry'],
            abilities: ['carry_the_cost', 'lift_the_class', 'carry_them_home'],
            reputation: [],
          },
        },
        {
          id: 'the_last_load',
          playerCopy: 'Decide what the porter carries on the seventh morning.',
          directorNotes:
            'Three loads, and each one closes the others. Carrying the cost keeps the heroes heroes and spends the player’s own memory of home. Lifting the classes makes the three of them ordinary and leaves Varn without heroes. Carrying them home needs the Hall, the Sending, and a memory of home strong enough to aim it, which only somebody who kept one has. The kingdom loses something real in every version.',
          enterWhen: { flagsSet: ['porter_can_carry'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'carried_the_cost',
              label: 'Carry the cost yourself, and forget instead of them',
              predicate: { flagsSet: ['used:carry_the_cost'] },
              setsFlags: ['porters_share'],
              closesFlags: ['classes_lifted', 'sent_home'],
            },
            {
              routeId: 'lifted_the_classes',
              label: 'Lift the classes off them',
              predicate: { flagsSet: ['used:lift_the_class'] },
              setsFlags: ['classes_lifted'],
              closesFlags: ['porters_share', 'sent_home'],
            },
            {
              routeId: 'carried_them_home',
              label: 'Carry them home through the Hall',
              predicate: { flagsSet: ['used:carry_them_home', 'keeper_of_home'], atLocation: 'hall_of_calling' },
              setsFlags: ['sent_home'],
              closesFlags: ['porters_share', 'classes_lifted'],
            },
          ],
          rewards: { xp: 220, items: [], flags: ['last_load_chosen'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_iron_door',
      title: 'The Iron Door',
      summary: 'The Choir keeps its archive behind a locked iron door in the cloister. Every reading of every Calling is in there, including yours.',
      kind: 'SIDE',
      involvedCharacterIds: ['odessa', 'maya', 'grete'],
      involvedLocationIds: ['cloister', 'sealed_archive'],
      knownRewardCopy: 'A way through the iron door.',
      discoverWhen: { flagsSet: ['knows:the_blank_line'] },
      steps: [
        {
          id: 'through_the_door',
          playerCopy: 'Get through the iron door into the Sealed Archive.',
          directorNotes:
            'Four ways in, each with its own price. Carrying firewood in with the porters is honest and slow. Slipping in raises the escort’s watch. Asking Maya to burn the lock works instantly and takes a memory from her, which the player should hear go. The High Cantor will open it herself for somebody she trusts, and will stand in the doorway the whole time.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'carried_the_firewood',
              label: 'Carry the archive’s firewood in with the porters',
              predicate: { flagsSet: ['porter_of_the_hall', 'visited:cloister'] },
              setsFlags: ['archive_open'],
              closesFlags: [],
            },
            {
              routeId: 'slipped_in',
              label: 'Slip in behind a novice',
              predicate: { flagsSet: ['used:slip_away', 'visited:cloister'] },
              setsFlags: ['archive_open', 'archive_by_stealth'],
              closesFlags: [],
            },
            {
              routeId: 'maya_burned_the_lock',
              label: 'Ask Maya to burn the lock',
              predicate: { flagsSet: ['used:lean_on_them', 'spoke:maya', 'visited:cloister'] },
              setsFlags: ['archive_open', 'maya_paid_for_the_lock'],
              closesFlags: [],
            },
            {
              routeId: 'the_cantors_key',
              label: 'Get the High Cantor to open it for you',
              predicate: {
                flagsSet: ['spoke:odessa'],
                minRelationship: [{ characterId: 'odessa', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['archive_open', 'cantor_let_you_in'],
              closesFlags: ['archive_by_stealth'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['archive_open'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_archer',
      title: 'The Woman in the Garden',
      summary: 'An archer from the last Calling, forty-one years ago, lives in the Choir’s walled garden. She never misses, hums eight bars of a song and stops, and calls Sir Bastian Captain when he brings her pears at dawn.',
      kind: 'SIDE',
      involvedCharacterIds: ['hesper', 'bastian'],
      involvedLocationIds: ['still_garden', 'sealed_archive'],
      knownRewardCopy: 'Her name, and what she was before the Choir gave her another one.',
      discoverWhen: { flagsSet: ['visited:still_garden'] },
      steps: [
        {
          id: 'her_name',
          playerCopy: 'Find out who she was before the Choir named her Hesper.',
          directorNotes:
            'She is the player’s future if nobody carries anything: sixty-three, polite, deadly with a bow and empty of home. Keep her gentle and specific. Bastian is stiff and furious with anybody who brings her up, for about a day.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'name_in_the_book',
              label: 'Find her name in the reading book',
              predicate: { flagsSet: ['read_the_book'] },
              setsFlags: ['knows:helen'],
              closesFlags: [],
            },
            {
              routeId: 'the_tape_label',
              label: 'Read the label on her tape',
              predicate: { hasItems: ['hespers_tape'] },
              setsFlags: ['knows:helen', 'held_the_tape'],
              closesFlags: [],
            },
            {
              routeId: 'bastian_tells_you',
              label: 'Get Sir Bastian to tell you',
              predicate: {
                flagsSet: ['spoke:bastian'],
                minRelationship: [{ characterId: 'bastian', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:helen', 'bastian_confided'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['knows_her_name'], abilities: [], reputation: [] },
        },
        {
          id: 'give_her_something_back',
          playerCopy: 'Give her something of home back, with her son there to hear it if you can.',
          directorNotes:
            'The tune is eight bars of a song most people from home would know. If the player can hum the rest, she hears it, and for a moment she is twenty-two and on a drive. If Bastian is there, she says his name. Do not make it permanent: she will lose it again by afternoon, and that is not the point.',
          enterWhen: { flagsSet: ['knows_her_name'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'finished_the_tune',
              label: 'Finish the tune for her',
              predicate: { flagsSet: ['used:tell_it_back'], atLocation: 'still_garden' },
              setsFlags: ['helen_remembered'],
              closesFlags: [],
            },
            {
              routeId: 'said_her_name_with_him_there',
              label: 'Say her name to her, with the Captain on the bench',
              predicate: { flagsSet: ['used:say_it_plainly', 'spoke:bastian', 'spoke:hesper'], atLocation: 'still_garden' },
              setsFlags: ['helen_remembered', 'bastian_saw_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['helen_answered', 'knows:the_sending'],
            abilities: [],
            reputation: [{ factionId: 'faction_escort', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_porters_hall',
      title: 'Strap and Tally',
      summary: 'Grete Holm runs the Porters’ Hall: everybody the crystal read as nothing, a silver a day and soup at sundown. The column going east needs sixty carriers for its baggage, and she is short of backs.',
      kind: 'SIDE',
      involvedCharacterIds: ['grete', 'bastian'],
      involvedLocationIds: ['porters_hall', 'low_market', 'side_gate'],
      knownRewardCopy: 'A porter’s strap, a silver a day, and maybe a place on the march.',
      discoverWhen: { flagsSet: ['spoke:grete'] },
      steps: [
        {
          id: 'a_days_loads',
          playerCopy: 'Carry a full day of loads for the Porters’ Hall.',
          directorNotes:
            'Honest physical work, written with pleasure: sacks, stairs, a cart with a bad wheel, two hundred people who were all read as nothing and treat the player as one of their own by sundown. This is the one place in Varn where classless is normal.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'honest_day',
              label: 'Do the loads',
              predicate: { flagsSet: ['used:carry_it', 'spoke:grete'] },
              setsFlags: ['porter_of_the_hall'],
              closesFlags: [],
            },
            {
              routeId: 'talked_onto_the_tally',
              label: 'Talk your way onto the tally',
              predicate: { flagsSet: ['used:talk_round', 'spoke:grete'] },
              setsFlags: ['porter_of_the_hall', 'owes_grete'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [{ itemId: 'porters_strap', qty: 1 }],
            flags: ['strap_earned'],
            abilities: [],
            reputation: [{ factionId: 'faction_porters', amount: 25 }],
          },
        },
        {
          id: 'the_column_baggage',
          playerCopy: 'Get yourself on the porters’ list for the column east.',
          directorNotes:
            'Grete picks the sixty herself, and Bastian signs the list. A porter with the column marches at the back with the baggage, a day’s walk from the heroes at the front, which is close enough to matter and far enough that Rin can pretend it does not.',
          enterWhen: { flagsSet: ['strap_earned'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'on_the_list',
              label: 'Earn a place on Grete’s sixty',
              predicate: { minFactionReputation: [{ factionId: 'faction_porters', value: 35 }] },
              setsFlags: ['carrier_listed'],
              closesFlags: [],
            },
            {
              routeId: 'bastian_signs_it',
              label: 'Get Sir Bastian to sign you on',
              predicate: {
                flagsSet: ['spoke:bastian'],
                minRelationship: [{ characterId: 'bastian', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['carrier_listed', 'bastian_signed'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['porter_with_the_column'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_rin',
      title: 'The Captain’s Knots',
      summary: 'Rin tied every knot on the ridge, so she has decided everything that happened since is hers to fix. She wants you off the road east and will not say why.',
      kind: 'SIDE',
      involvedCharacterIds: ['rin'],
      involvedLocationIds: ['drill_yard', 'heroes_wing'],
      knownRewardCopy: 'Why she wants you gone, said out loud.',
      discoverWhen: { flagsSet: ['post_cut'] },
      steps: [
        {
          id: 'rin_lets_go',
          playerCopy: 'Get Rin to stop arguing with you.',
          directorNotes:
            'She can be outlasted, out-carried or told that the knots were good. None of that makes her say why she wants the player off the road east; it only makes her stop arguing about it, which is the first time she has stopped since the ridge.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her_the_knots_held',
              label: 'Tell her the knots held',
              predicate: {
                flagsSet: ['used:say_it_plainly', 'spoke:rin'],
                minRelationship: [{ characterId: 'rin', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['rin_unknotted'],
              closesFlags: [],
            },
            {
              routeId: 'outcarried_her',
              label: 'Carry loads in the yard until she stops arguing',
              predicate: { flagsSet: ['used:carry_it', 'visited:drill_yard', 'spoke:rin'] },
              setsFlags: ['rin_respects_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['rin_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'rin_says_why',
          playerCopy: 'Get Rin to say why she wants you gone.',
          directorNotes:
            'She will not say it while anybody else is in the room, and she will not say it to somebody who has argued with her about it that day. If romance is where this goes, it stays at a kiss and she is terrible at it.',
          enterWhen: { flagsSet: ['rin_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rin_says_it',
              label: 'She says it to your face',
              predicate: {
                flagsSet: ['spoke:rin'],
                minRelationship: [
                  { characterId: 'rin', dimension: 'trust', value: 62 },
                  { characterId: 'rin', dimension: 'affection', value: 72 },
                ],
              },
              setsFlags: ['rin_said_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_maya',
      title: 'Entry Fifty-Two',
      summary: 'Maya needs you close: for the stove, for the food and as her control group, the one person here whose memory is not being spent. Entry fifty-two on her list is about you.',
      kind: 'SIDE',
      involvedCharacterIds: ['maya'],
      involvedLocationIds: ['glass_tower', 'long_kitchen', 'heroes_wing'],
      knownRewardCopy: 'What entry fifty-two says, and what she wants instead of a hypothesis.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'the_control_group',
          playerCopy: 'Be Maya’s control group.',
          directorNotes:
            'She frames everything as an experiment because it is the only way she can ask for anything. Feeding her is the shortest road to her. Asking her to charge the phone with a spark works, and costs her a memory she will not notice is gone, which the player will.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fed_the_scientist',
              label: 'Cook her something from home',
              predicate: { flagsSet: ['used:cook_from_home', 'spoke:maya'] },
              setsFlags: ['maya_fed'],
              closesFlags: [],
            },
            {
              routeId: 'charged_the_phone',
              label: 'Let her charge your phone with a spark',
              predicate: { flagsSet: ['used:lean_on_them', 'spoke:maya'] },
              setsFlags: ['phone_charged', 'maya_paid_for_the_phone'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['maya_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'entry_fifty_two',
          playerCopy: 'Find out what entry fifty-two says, and what she wants instead of a hypothesis.',
          directorNotes:
            'She will put a hypothesis in front of it every time she gets close, and the player can wait her out. If romance is where this goes, it is fast, nerdy and deadpan, and stays at a kiss.',
          enterWhen: { flagsSet: ['maya_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'maya_says_it',
              label: 'She says it without a hypothesis in front of it',
              predicate: {
                flagsSet: ['spoke:maya'],
                minRelationship: [
                  { characterId: 'maya', dimension: 'trust', value: 65 },
                  { characterId: 'maya', dimension: 'affection', value: 72 },
                ],
              },
              setsFlags: ['maya_said_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_saki',
      title: 'Nobody Decides for Saki',
      summary: 'Saki’s parents chose her course, her job and her shoes. She told you to decide for yourself because nobody ever let her. She has not said whether she wants to go home.',
      kind: 'SIDE',
      involvedCharacterIds: ['saki'],
      involvedLocationIds: ['mercy_ward', 'still_garden', 'heroes_wing'],
      knownRewardCopy: 'What Saki wants, in her own words.',
      discoverWhen: { flagsSet: ['answered_saki'] },
      steps: [
        {
          id: 'saki_chooses',
          playerCopy: 'Ask Saki what she wants, without deciding it for her.',
          directorNotes:
            'The only way to lose her is to decide for her. Talking her round, however kindly, gets agreement and then a very quiet Saki who stops asking the player anything. Asking and then not arguing with the answer is the whole trick, and it is harder than it sounds.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_and_listened',
              label: 'Ask her, and do not argue with the answer',
              predicate: { flagsSet: ['spoke:saki', 'used:say_it_plainly'] },
              setsFlags: ['saki_decided'],
              closesFlags: [],
            },
            {
              routeId: 'decided_for_her',
              label: 'Talk her round to what you think is best',
              predicate: { flagsSet: ['used:talk_round', 'spoke:saki'] },
              setsFlags: ['decided_for_saki'],
              closesFlags: ['saki_said_it'],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['saki_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'saki_decides',
          playerCopy: 'Let Saki decide what she wants, out loud.',
          directorNotes:
            'She decides in her own time, and only for somebody who never decided for her. Whether she wants home at all is hers to say. If romance is where this goes, it is quiet and certain, and stays at a kiss.',
          enterWhen: { flagsSet: ['saki_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'saki_says_it',
              label: 'She says what she wants, out loud',
              predicate: {
                flagsSet: ['spoke:saki'],
                flagsUnset: ['decided_for_saki'],
                minRelationship: [
                  { characterId: 'saki', dimension: 'trust', value: 65 },
                  { characterId: 'saki', dimension: 'affection', value: 70 },
                ],
              },
              setsFlags: ['saki_said_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_side_gate',
      atWorldMinute: 22 * 60,
      locationId: 'side_gate',
      publicCopy: 'Two of Sir Bastian’s knights wait at the side gate with a lantern, a purse and a travel writ, and they are waiting for you.',
      directorNotes:
        'Bastian’s written order. If nobody with standing has overruled it, the knights walk the player out, politely, and bar the gate behind them. Being put out is not the end: the Low Market and the Porters’ Hall are on the other side, and the wall is not as high as it looks.',
      setsFlags: ['put_out'],
      cancelledByFlags: ['kept_by_the_club', 'cantors_guest', 'porter_of_the_hall', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'bastian', toLocationId: 'side_gate' }],
    },
    {
      id: 'we_the_oak_post',
      atWorldMinute: 1440 + 7 * 60 + 30,
      locationId: 'drill_yard',
      publicCopy: 'In the drill yard Rin cuts an oak practice post in half with a sword she has held for one day. The knights cheer. She stands very still afterwards.',
      directorNotes:
        'She has just lost her childhood dog’s name, Biscuit, and tells nobody. If the player is there she asks them a question that sounds like a joke, "Pack. What was my dog called?", and watches the answer very carefully.',
      setsFlags: ['post_cut'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'rin', toLocationId: 'drill_yard' }],
    },
    {
      id: 'we_the_pears',
      atWorldMinute: 2 * 1440 + 6 * 60,
      locationId: 'still_garden',
      publicCopy: 'At dawn Sir Bastian sits on the bench under the pear tree with a paper of pears, and the old archer thanks him and calls him Captain.',
      directorNotes:
        'He comes every morning. She has not known him since he was a squire. A player who sees this gets a day of Bastian being stiff and furious with them, and then something else, depending on whether they told anybody.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'bastian', toLocationId: 'still_garden' }],
    },
    {
      id: 'we_maya_starts_the_list',
      atWorldMinute: 1440 + 21 * 60 + 30,
      locationId: 'heroes_wing',
      publicCopy: 'Maya sits up in the common room with a Choir ledger and numbers a page, one to fifty, in small square handwriting.',
      directorNotes:
        'She has noticed one gap, the colour of her mother’s front door, and is doing what she always does: collecting data. She will ask the player to check entries. Entry fifty-two is the player’s name and "tea, no sugar. Do not forget this one."',
      setsFlags: ['list_started'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'maya', toLocationId: 'heroes_wing' }],
    },
    {
      id: 'we_the_ward',
      atWorldMinute: 2 * 1440 + 15 * 60,
      locationId: 'mercy_ward',
      publicCopy: 'On the Mercy Ward, Saki closes a soldier’s sword cut with her bare hands, then sits down on the floor and cannot remember what her nursing school was called.',
      directorNotes:
        'She is calmer about it than she should be, and she knows that, and it frightens her more than the gap does. She will ask the player, quietly, and if they know the answer she will say "thank you" and nothing else for an hour.',
      setsFlags: ['saki_lost_something'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'saki', toLocationId: 'mercy_ward' }],
    },
    {
      id: 'we_the_carrying_song',
      atWorldMinute: 3 * 1440 + 20 * 60 + 30,
      locationId: 'porters_hall',
      publicCopy: 'At sundown the porters bang their bowls on the long tables and sing the carrying song, and one verse is about a carrier who came through the light tied to three heroes.',
      directorNotes:
        'Grete watches the player during that verse. Nobody in the hall knows what it means. It is one of the ways a player can notice that the crystal skipped them on purpose, and it only reaches somebody who has been working the tally.',
      setsFlags: ['knows:the_blank_line'],
      cancelledByFlags: [],
      requiresFlags: ['porter_of_the_hall'],
      movesCharacters: [{ characterId: 'grete', toLocationId: 'porters_hall' }],
    },
    {
      id: 'we_the_scraped_page',
      atWorldMinute: 3 * 1440 + 23 * 60,
      locationId: 'cloister',
      publicCopy: 'Through the vestry door from the cloister, the High Cantor is alone at the crystal with the reading book open, running her thumb along a line that has been scraped out with a knife.',
      directorNotes:
        'Only for a player who has gone poking round the Choir’s quarters. Odessa closes the book when she sees them and says nothing that is a lie. This opens the mystery; do not explain it.',
      setsFlags: ['knows:the_blank_line'],
      cancelledByFlags: [],
      requiresFlags: ['visited:cloister'],
      movesCharacters: [{ characterId: 'odessa', toLocationId: 'hall_of_calling' }],
    },
    {
      id: 'we_archive_aired',
      atWorldMinute: 4 * 1440 + 10 * 60,
      locationId: 'cloister',
      publicCopy: 'Novices carry the archive’s books out into the cloister walk to air them, and the iron door stands open behind them for an hour.',
      directorNotes:
        'A chance, not a gift: the novices are busy and the High Cantor is in the tower. Only matters to a player who already has a reason to want the reading book.',
      setsFlags: ['archive_open'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_blank_line'],
      movesCharacters: [],
    },
    {
      id: 'we_the_wall',
      atWorldMinute: 4 * 1440 + 23 * 60 + 40,
      locationId: 'drill_yard',
      publicCopy: 'Bells on the east wall. Something grey and silent has come up the road from the river and over the wall, and the heroes are called out of bed.',
      directorNotes:
        'One faded: a grey, colourless figure that walks like the farmer it used to be. Rin, Maya and Saki fight it and win, and each of them pays for it with a memory the player will hear go. A player can help with a pan, a rope or their back. No gore: struck hard, a faded falls to grey dust.',
      setsFlags: ['the_wall_night'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'rin', toLocationId: 'drill_yard' },
        { characterId: 'maya', toLocationId: 'drill_yard' },
        { characterId: 'saki', toLocationId: 'drill_yard' },
        { characterId: 'bastian', toLocationId: 'drill_yard' },
      ],
    },
    {
      id: 'we_crossed_out',
      atWorldMinute: 5 * 1440 + 22 * 60,
      locationId: 'heroes_wing',
      publicCopy: 'Maya is crossing out entries on her list, slowly, one at a time, because she no longer recognises them.',
      directorNotes:
        'She has lost about a third of it. She will not cry where anybody can see. Entry fifty-two is still there, gone over in ink three times. If the player sits down beside her, she hands them the pen.',
      setsFlags: ['list_fading'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'maya', toLocationId: 'heroes_wing' }],
    },
    {
      id: 'we_seventh_morning',
      atWorldMinute: 7 * 1440 + 5 * 60 + 30,
      locationId: 'drill_yard',
      publicCopy: 'Drums at the east gate. The column forms up in the drill yard with Rin, Maya and Saki at its head, sixty porters at its back, and Sir Bastian riding down the line, counting.',
      directorNotes:
        'The end of the week. Whatever the player has become decides where they stand. Nobody waits long, and nobody makes a speech.',
      setsFlags: ['seventh_morning'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'rin', toLocationId: 'drill_yard' },
        { characterId: 'maya', toLocationId: 'drill_yard' },
        { characterId: 'saki', toLocationId: 'drill_yard' },
        { characterId: 'bastian', toLocationId: 'drill_yard' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_seventh_morning',
      kind: 'FINALE',
      label: 'Whether the four of you are still yourselves on the seventh morning',
      seedHint: 'Drums practised in the yard at dusk on the first night, for a march nobody has asked you about.',
      payoffHint: 'The column forms at dawn, and you are standing somewhere on purpose.',
      weight: 1,
    },
    {
      id: 'p_the_club',
      kind: 'RELATIONSHIP',
      label: 'What you are to Rin, Maya and Saki, and whether the club survives as a club',
      seedHint: 'Rin calls you Pack and will not look at you; Maya saves you a seat; Saki asks you a question instead of telling you.',
      payoffHint: 'One of them says plainly what she wants, or all four of you vote.',
      weight: 0.9,
    },
    {
      id: 'p_the_blank_crystal',
      kind: 'MYSTERY',
      label: 'What the crystal actually read under your hand',
      seedHint: 'The crystal frosts over where your hand was, and a priest scrubs it before anybody else looks.',
      payoffHint: 'A word under a knife-scraped line in the reading book: PORTER.',
      weight: 0.6,
    },
    {
      id: 'p_what_it_costs',
      kind: 'THEME',
      label: 'What the classes cost, named one memory at a time',
      seedHint: 'Rin asks, as a joke, what her dog was called.',
      payoffHint: 'Every art paid for with a piece of home, and a Choir with a gentle word for it: settling.',
      weight: 0.85,
    },
    {
      id: 'p_bastian',
      kind: 'RIVAL',
      label: 'Sir Bastian, his written orders, and the woman in the garden',
      seedHint: 'A paper of pears in a knight’s gauntlet at dawn.',
      payoffHint: 'The archer of the last Calling says her own name, and her son hears it.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_cook',
      name: 'The Club Cook',
      role: 'Cooking and morale',
      summary: 'You cooked for the club on every trip, so you can turn a strange larder into food from home, which matters more here than anybody knows yet.',
      playstyle: ['Warm', 'Feeds people', 'Kitchen first'],
      blurb: 'Three summits, one camp stove, and nobody in the club has ever eaten a cold dinner on your watch.',
      attributeBonus: { presence: 2, mind: 1 },
      skillProficiencies: { cooking: 3, remembering: 1, candour: 1 },
      startingItems: [{ itemId: 'curry_tin', qty: 1 }],
      startingAbilities: ['cook_from_home'],
      startingReputation: [],
    },
    {
      id: 'arch_navigator',
      name: 'The Navigator',
      role: 'Maps, details and noticing',
      summary: 'You read the maps and kept the trip log, so you notice what changed in a room or a face, and you remember things in detail.',
      playstyle: ['Observant', 'Careful', 'Remembers'],
      blurb: 'You logged every hike in a waterproof notebook, including who forgot their gloves, and you are the reason the club never got lost until today.',
      attributeBonus: { mind: 3 },
      skillProficiencies: { noticing: 3, remembering: 2 },
      startingItems: [{ itemId: 'trip_log', qty: 1 }],
      startingAbilities: ['look_closer'],
      startingReputation: [],
    },
    {
      id: 'arch_mule',
      name: 'The Pack Mule',
      role: 'Strength and carrying',
      summary: 'You carried the big pack on every trip, so you can haul, lift and keep going under weight, and the Porters’ Hall will want you on sight.',
      playstyle: ['Strong', 'Steady', 'Hard to tire'],
      blurb: 'Sixty litres, stove, tent and somebody else’s water, up every hill the club ever climbed, and you never once asked to swap.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { hauling: 3, bearing: 1 },
      startingItems: [],
      startingAbilities: ['carry_it'],
      startingReputation: [{ factionId: 'faction_porters', amount: 10 }],
    },
    {
      id: 'arch_treasurer',
      name: 'The Treasurer',
      role: 'Talk, money and bargaining',
      summary: 'You held the club’s money and booked every hut, so you can bargain, bluff and talk a guard round, and you know what a coin from home is worth to a collector.',
      playstyle: ['Talker', 'Quick', 'Bends rules'],
      blurb: 'Years of hut bookings, permit forms and refunds argued out of rangers, and you have never once paid full price.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { smooth_talk: 3, quiet_feet: 1 },
      startingItems: [{ itemId: 'club_kitty', qty: 1 }],
      startingAbilities: ['talk_round'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the club call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Kai Mendes' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What were you in the club?',
      helpText:
        'Every hiking club has a cook, a navigator, a pack mule and somebody who holds the money. This sets what you are good at, and it is fixed for the whole story. It does not give you a class: the crystal read nothing, and that holds. Whether you stay, who you side with and what you carry are all yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do the other three know about you?',
      helpText: 'Three years of the same club. Most people write one plain sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I joined the club for the food, I am afraid of heights, and I have never once turned back before a summit.',
    },
    {
      id: 'what_you_want',
      label: 'What do you want, the night you arrive?',
      helpText: 'A starting lean, not a commitment. You can do the exact opposite in the Hall and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'go_home', label: 'Get all four of you home' },
        { id: 'keep_the_club', label: 'Keep the club together, wherever that is' },
        { id: 'out_of_the_way', label: 'Get out of their way so they can be heroes' },
        { id: 'why_dark', label: 'Find out why the crystal stayed dark' },
        { id: 'stay_here', label: 'Make this world worth staying in' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the hall see when the crystal stays dark?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Mud to the knees, a sixty-litre pack, and a harness still clipped to a cut rope.',
    },
  ],
  /**
   * Twelve endings, because the storyteller reads the first twelve and no more.
   *
   * Three are losses written without punishment: the three of them settling
   * because nobody said anything (reachable by a pleasant, quiet week), the
   * player walking out early, and the player watching the column go. Three
   * need the optional porter mystery; the other nine are reachable by a player
   * who never once wonders why the crystal stayed dark.
   */
  endings: [
    {
      id: 'end_four_packs_one_road',
      name: 'Four Packs, One Road',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['marched_with_them', 'cost_answered'],
        flagsUnset: ['kept_quiet', 'classes_lifted', 'sent_home', 'porters_share'],
      },
      condition:
        'The player marched east with the column, the three of them know what their classes cost, and they are still themselves because somebody kept handing home back to them. Write the road: four packs, one stove, a nickname, and an argument about whose turn it is that nobody wins. The war is not over. The club is intact.',
      epilogue:
        'They cross the river Wend in the second week. Every night, at whatever fire the column makes, somebody asks the porter a question about home and gets the answer in full. Rin still loses things. She has stopped being afraid of it, because she knows exactly where they are kept.',
      hint: '',
    },
    {
      id: 'end_three_heroes_and_a_stranger',
      name: 'Three Heroes and a Stranger',
      rarity: 'COMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['morning_answered'],
        flagsUnset: ['keeper_of_home', 'heroes_told', 'classes_lifted', 'sent_home', 'porters_share'],
      },
      condition:
        'Nobody did anything about the cost, and the three of them settled. This is reachable by a pleasant, quiet week and must not be written as a punishment: the player was there, kind and useful, and never once said the thing. On the seventh morning one of them looks at the player a second too long, trying to place them.',
      epilogue:
        'The heroes push the grey back past the river by midsummer, and the ballads get their names right. Rin keeps a cut length of orange rope on her sword belt and cannot say why. Maya’s list ends at entry fifty-two, inked over three times, and she no longer knows whose name it is.',
      hint: '',
    },
    {
      id: 'end_club_meeting',
      name: 'Club Meeting',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['club_vote'] },
      condition:
        'Nobody was chosen and nobody was left behind. The four of them told each other everything and voted, the way the club decided every route, and the result binds the kingdom whether it likes it or not. Write the vote as a club meeting: a show of hands, one abstention, a joke from Rin, and minutes taken by Maya.',
      epilogue:
        'The minutes survive in a Choir ledger: motion carried, three to nothing, one abstention (Saki, on principle). Whatever they voted for, they do it as four. The kingdom’s histories call them the Three Heroes. The club’s own record lists four members, and a stove.',
      hint: '',
    },
    {
      id: 'end_the_side_gate',
      name: 'The Side Gate',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['morning_answered'] },
      condition:
        'The player walked out of the capital before the week was out, with the purse or without it. Do not redeem it and do not punish it. It is a sane response to being read as nothing in front of a hundred priests, and the people it costs most are the three who stayed.',
      epilogue:
        'The north road is long and mostly empty, and forty silver crowns go further than anybody at the palace expected. Months later a carter at a ford mentions that the three heroes still halt the column at dusk every day so somebody can cook, and that none of them is any good at it.',
      hint: '',
    },
    {
      id: 'end_somebody_keeps_the_stove',
      name: 'Somebody Keeps the Stove',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['stayed_behind'], flagsUnset: ['classes_lifted', 'sent_home', 'porters_share'] },
      condition:
        'The column marched and the player stayed in the capital, by choice or because nobody made room. It is a real loss and it is not a tragedy: the three of them left with whatever the player gave them this week, and the player is the only person in Varn who remembers all three of them whole.',
      epilogue:
        'The player takes work at the Porters’ Hall and a room above the spice stalls. Letters come back from the east in three handwritings, fewer each month and stranger, asking about small things: a dog’s name, the colour of a door. Every one of them gets a long answer.',
      hint: '',
    },
    {
      id: 'end_the_porters_share',
      name: 'The Porter’s Share',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['porters_share'] },
      condition:
        'The player learned to carry the cost of an art and took it on: every spell the three of them cast now takes a memory from the porter instead. Write what the player loses first, and name it. This is the most generous ending and it should feel like it costs exactly what it costs.',
      epilogue:
        'By the river the player has lost the name of their first school and the street they grew up on. By the second winter, most of home. The three of them keep a list for the porter now, numbered, in three handwritings, and read it aloud at night. Entry one is the porter’s own name.',
      hint: 'A porter carries what is given to them.',
    },
    {
      id: 'end_ordinary_again',
      name: 'Ordinary Again',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['classes_lifted'] },
      condition:
        'The player lifted the classes off them, and Varn has lost three heroes in one night. The kingdom is furious and the Choir is frightened, and Rin, Maya and Saki are exactly as strong as they were on the mountain. Write the fury and the relief in the same room, and let each of the three decide what she does with an ordinary life here.',
      epilogue:
        'Sir Bastian marches east without heroes and with sixty porters, and comes back with more men than he took. The High Cantor never forgives the player and never quite stops being grateful. Rin takes up the sword anyway, the slow way, and is merely very good.',
      hint: '',
    },
    {
      id: 'end_helen',
      name: 'Helen',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['helen_remembered', 'helen_answered'] },
      condition:
        'Hesper heard her own name, Helen Marsh, and Sir Bastian heard her say it. Whatever else happens this week, write this scene small: a garden, a bench, a paper of pears, and a woman of sixty-three saying her son’s name for the first time since he was a squire. Bastian’s orders change after this, and he says so.',
      epilogue:
        'She finishes the tune most mornings now and forgets it most afternoons. Bastian brings the pears either way. He tears up one written order that week, the one about the side gate, and puts the pieces in the guardhouse brazier himself.',
      hint: '',
    },
    {
      id: 'end_rins_answer',
      name: 'Rin’s Answer',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['rin_said_it'] },
      condition:
        'Rin said plainly why she wanted the player gone, and what she wants instead. Romance, if the player chose it, goes no further than a kiss and is written with the clumsy honesty of two people who have shared a rope for three years. If the player did not choose it, she is relieved, and still the captain.',
      epilogue:
        'She stops calling the player Pack in front of the knights, and starts again the next day because it sounded wrong. Whatever they are now, she ties the player’s rope herself every morning, checks it twice, and does not let anybody make a joke about that.',
      hint: '',
    },
    {
      id: 'end_entry_number_one',
      name: 'Entry Number One',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['maya_said_it'] },
      condition:
        'Maya said what she wants, with no hypothesis in front of it, and entry fifty-two moves to entry one. Romance, if it happens, is fast, nerdy, deadpan and no further than a kiss. If the player wants friendship instead, she takes the data and still saves them a seat.',
      epilogue:
        'The list is rewritten in a new ledger with the player at the top. She keeps experimenting on the march, keeps losing small things, and keeps the stove within reach. The tower’s fourth floor is relabelled, in her handwriting, Lab and Kitchen.',
      hint: '',
    },
    {
      id: 'end_saki_decides',
      name: 'Saki Decides',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['saki_said_it'] },
      condition:
        'Saki decided something for herself, out loud: whether she wants home at all, and what she wants from the player. Do not let the player decide it for her; the ending is that she chose. Romance, if it is there, stays at a kiss, quiet and certain.',
      epilogue:
        'If she stays in Varn she runs the Mercy Ward by the second year; if she goes home she changes her course in the first week back. Either way she writes her parents a letter, and lets the player read it first, which is the most she has ever asked of anybody.',
      hint: '',
    },
    {
      id: 'end_the_carriers_road',
      name: 'The Carrier’s Road',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: { flagsSet: ['sent_home', 'knows:porter'] },
      condition:
        'The player aimed the Sending with their own memory of home and carried the heroes back through the Hall of Calling before the war was finished. Varn nearly falls without them, and that is a real cost. Who went home and who stayed is decided by everything before this. Write the ridge, the fog and the rope, and one small proof it happened.',
      epilogue:
        'Four people stand on the last ridge of a mountain in fog, still roped together. A phone has two percent and, suddenly, a signal. Somewhere far off, porters sing a new verse about a carrier who took three heroes home, and the Choir cannot stop them.',
      hint: 'The Calling can be run the other way.',
    },
  ],
  opening:
    'The crystal on the altar blazed gold three times. Sword Saint. Archmage. Saint. All three SSS. One for each woman you came here with.\n\n' +
    'Then your hand. Nothing. Not a flicker.\n\n' +
    '"Classless," says Sir Bastian, the knight who commands their escort. "You leave by the side gate tonight, with a purse."\n\n' +
    'Rin, your club captain, wearing a sword she didn’t own this morning, won’t look at you. "Good. We move faster without the pack."\n\n' +
    '"Then who cooks?" snaps Maya, the physicist, sparks crawling off her fingers.\n\n' +
    'Bastian’s hand settles on his hilt.\n\n' +
    'Saki, the quiet one, steps between them and looks only at you.\n\n' +
    '"Don’t let them vote on you. You decide. Are you coming with us, or not?"',
  openingPanel: {
    assetKey: 'story_three_heroines_and_a_porter/opening',
    alt: 'Saki in a white healer’s mantle over a green fleece, stepping between you and a knight with his hand on his sword, the crystal dark behind her, Rin and Maya arguing in gold light.',
  },
  openingSuggestions: [
    '"I’m coming. Somebody has to carry the tents."',
    'I set the camp stove on the altar steps, light it, and start the noodles.',
    'I put my hand back on the crystal and hold it there. "Read me again."',
  ],
  coverDirection: [
    'SUBJECT: three heroines mid-argument in a fantasy summoning hall, lit gold from below by a glowing crystal, with one figure in the foreground seen from behind under a huge hiking backpack.',
    'The three of them fill the frame from the waist up, side by side and close, faces large and readable at thumbnail size; the backpack fills the bottom edge of the picture.',
    'LEFT: Rin, tall and athletic, short ragged black hair, a red hiking shell jacket over a steel breastplate, a long straight sword held low, a cut length of orange climbing rope knotted at her hip, glaring sideways.',
    'CENTRE: Maya, round glasses, long dark hair in a messy bun with a pencil through it, a grey hoodie under a midnight-blue mage’s robe rolled to the elbows, one hand raised with small blue sparks crawling over the fingertips, mid-argument.',
    'RIGHT: Saki, calm and steady, of medium height, chin-length brown hair with a plain clip, a white healer’s mantle over a green fleece, one hand held out flat as if stepping between two people, looking straight at the viewer.',
    'FOREGROUND: the porter, seen from behind and from the shoulders up, face never shown, a battered hiking pack with a camp stove and a rolled tent strapped to it.',
    'All four are dressed for a mountain in practical, layered gear. No fan service. The comedy is in the expressions, an argument in progress.',
    'THEIR FACES STAY CLEAN: no sparks, glowing marks or stray shadows on any face. The gold glow stays on the crystal and the title, and the blue sparks stay on Maya’s fingertips.',
    'BEHIND THEM: a vast vaulted stone hall, a circle carved into the floor with three stone seats, the crystal blazing gold on a black altar, white-robed priests in soft focus.',
    'LIGHT: warm gold from the crystal across the three faces, cool blue shadow in the vaults.',
    'TITLE: the words THREE HEROINES AND A PORTER painted into the art in the upper third as a bold fantasy-adventure logo, white with a warm gold glow and a thin dark outline,',
    'spelled exactly THREE HEROINES AND A PORTER, large and legible at thumbnail size, with the word PORTER on its own line and a short length of orange climbing rope underlining it. No other text anywhere.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const THREE_HEROINES_AND_A_PORTER = StoryVersion.parse(raw);
