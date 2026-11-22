import { StoryVersion } from '@plotbreak/contracts';

/**
 * "One Miracle a Day" — the patron-god tournament story, told from the god's
 * seat rather than the champion's.
 *
 * Bible: `docs/story-bibles/new50/33_ONE_MIRACLE_A_DAY.md`. Slate #33.
 *
 * Playable span: three days and three nights in Merrowgate, from the first
 * round of the Hearth Games (day 0, 14:30, mid-bout) to the Hearth Final at
 * dusk on day 2 and the Hearth turning after it. The bracket is the spine.
 * The nights are free: for the three nights of the Games the gods may walk
 * down in bodies, so a player who wanders off, picks a fight in a tavern or
 * goes to bed in Tanner's Row is still inside the story.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest summaries,
 * world events and the first twelve endings, and only the chosen archetype's
 * starting abilities. So the miracle count is a quest item the player starts
 * holding (the gold line), the rules of miracles, burning and followers are
 * spelled out in hard canon, and every archetype starts with Work a Miracle
 * plus the one domain ability that says what kind of god the player is.
 *
 * Growth is people, not levels: one miracle a day per follower. A second
 * believer and then five are steps of `q_one_miracle`, and five unlocks Show
 * Yourself. Grant broadly, gate by flag — every gated ability is handed out
 * by a step reward and kept unusable by its own flag until the player has
 * earned it.
 *
 * Three invisible variables. Flame is the one honest GOOD_HIGH, because
 * `resolveRest` refills those and a god does get tired. Notice comes first
 * among the descending pair on purpose: public violence raises the first
 * GOOD_LOW in array order, and a god brawling in the street gets noticed
 * before it fades. Fading is how close the player is to going out.
 */

const raw = {
  id: 'sv_one_miracle_a_day_1',
  storyId: 'story_one_miracle_a_day',
  version: 1,
  title: 'One Miracle a Day',
  fantasyLabel: 'You’re a god. Only she still prays to you.',
  hook: 'You’re a minor god with one follower, and she is about to lose the city tournament. You get one miracle a day.',
  premise:
    'You are a god. A very small one. Merrowgate, the harbour city you belong to, has seven hundred shrines, and yours is a dented tin lamp in a wall in Tanner’s Row. Exactly one person still prays to you: Tamsin Reed, a dock porter who has lit that lamp every night for eleven years and never once asked you for anything.\n\n' +
    'Gods here live on prayer. Every dawn you get one miracle for each person who truly prays to you, so you get one a day. A god nobody prays to goes out like a lamp, and nobody is sure what is left afterwards.\n\n' +
    'This week the city holds the Hearth Games: three days of bouts in the great arena, every champion fighting under a god’s mark. The winner’s god takes the Hearth, and with it every prayer in the city, for a year. Lady Fortune has won it five years running through her champion, the Iron Duke. One more win and she keeps it forever, and the Games end.\n\n' +
    'Tamsin entered under your mark and never prayed about it, so you never heard. Today she was drawn against the Duke in the first round, and he has just knocked the sword out of her hands. You have one miracle left today. You have three days to keep her standing, and to keep yourself lit.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Fantasy', 'Gods', 'Tournament', 'Romance', 'Comedy', 'Drama'],
  mechanicsChips: [
    'One miracle a day',
    'More believers, more miracles',
    'Spend your own light for one more',
    'Break the rules if nobody sees',
    'Walk the city at night',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You are the smallest god in the city and the only person who believes in you is standing on the sand with empty hands. You can spend your one miracle on her, save it, break the rules with it, or spend three nights in the city finding more people to pray to you. The biggest god in Merrowgate has noticed you. That is not the same as liking you.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_bowl',
    startWorldMinute: 14 * 60 + 30,
    startingItems: [{ itemId: 'gold_line', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is a small god who has existed for about two hundred years and, when walking among mortals, wears the shape of an adult in their middle twenties. Tamsin Reed is twenty-four, Duke Halvard Stenn forty-one, Brother Ash sixty-three and Mother Sabine Orlo fifty-two. Lady Fortune has existed for about six hundred years and wears the shape of a woman of about thirty. Wick has existed for about four hundred years and wears the shape of a woman of about seventy. Hettie, the night baker who keeps Wick’s candle, is seventy-six.',
      'Romance in this story, with Tamsin, Lady Fortune or anyone else, is flirtatious, tense and heartfelt and goes no further than a kiss. Nobody is touched without being asked.',
      'Merrowgate is a harbour city of seven hundred shrines, where the gods are real and live on prayer. A god nobody prays to goes out, like a lamp, and nobody in the Gallery likes to talk about what, if anything, is left afterwards.',
      'The gods watch the city from the Gallery, a tier of stone benches above the top of the Bowl, the city’s great arena. Mortals see only sky there. Gods sit by how many people pray to them: the biggest at the gold rail, the smallest at the back. The player sits in the back row, by a cracked pillar, in the draught.',
      'A god can work one miracle each day for every person who truly prays to it, and they come back at dawn. The player has exactly one follower, Tamsin Reed, so the player gets one miracle a day. A small line of gold light that only the player can see shows how many are left, written as [Miracles left today: 1]. Lady Fortune has more than she can count.',
      'A miracle is one clear, physical thing that lasts a breath: a sword back in a hand, a gust of wind, a wound closed, a lock giving way, a voice carried across the city, a light in the dark. It always works. No miracle can kill, bring back the dead, or change what a person believes or wants. Inside its own domain, the one thing it is god of, a god can also do small favours for free without spending a miracle; anything that would turn a bout, save a life or be seen as a wonder costs one.',
      'A god with no miracles left can still work one more by burning itself. It works, and it costs the god part of what it is. A small god that burns itself three times in the same few days goes out.',
      'A person becomes a follower by praying to a god by name, at its shrine, and meaning it. Every new follower gives the god one more miracle from the next dawn. The player’s shrine is a dented tin lamp in a wall niche in Tanner’s Row, in the poor Lower Wards. If the lamp is dark and nobody prays to the player, the player starts to go out.',
      'By day a god is an unseen presence: in the Gallery, at its own shrine, or beside one of its followers, and it can move between those in a moment. Only its own followers and the sighted can hear it, only the sighted can see it, and gods can always see and hear one another. By day a god has no hands in the mortal world: it cannot pick up, carry, push or strike any mortal or anything mortal, and a punch or a grab goes straight through like a draught. The only ways it can move anything down there by day are a miracle or a small favour inside its own domain, and until it walks down it has no body, no coat and no pockets. For the three nights of the Games, from dusk to dawn, the gods may walk down into the city in bodies of their own, but only when they choose to. A god’s body can be hurt, and a bad wound sends the god back to the Gallery until the next dusk.',
      'The Hearth Games run for three days at midsummer in the Bowl. Sixteen champions fight, each under one god’s mark, a small glowing sign on the back of the hand. Bouts are with real steel and end on a yield, a fall that does not get up by the count of three, or the Arbiter’s bell. A champion who is down or has lost her weapon gets the same count: her opponent counts aloud, and if by three she has not yielded, stood up or got a weapon back in hand, the Arbiter rings the bell and she has lost the bout. Nobody strikes after the bell. Killing is not forbidden and is a disgrace. First-round losers drop into the Low Ring, where one of eight fights back into the Games. The final is at dusk on the third day.',
      'The winning champion’s god takes the Hearth, the fire in the Temple of All Gods: for a year every prayer said at any hearth in Merrowgate goes up to that god. Lady Fortune has held it five years running through her champion, Duke Halvard Stenn, called the Iron Duke. Under the oldest rule of the Games, a god who holds the Hearth six years running keeps it for good, and the Games end forever.',
      'The Gallery Pact: in the Bowl, a god may work miracles only on its own champion and on what that champion is holding. A miracle on anyone else is a foul, and if the Arbiter sees it he strikes that god’s champion out of the Games. Gods cannot hurt each other directly. A big god can take a small god in as an aspect, but only if the small god agrees, and the small god stops being itself.',
      'Brother Ash, a monk of the Unsworn, an order that prays to no god, is the Arbiter of the Games. He is sighted: he can see the gods in the Gallery and the gold light a miracle gives off. Nobody knows why, and he does not say.',
      'Lady Fortune’s miracles give off no gold. They look like luck: a strap that snaps, a foot that slips on dry sand. Her luck is moved, not made. Everything she gives the Duke is taken from someone else in the city, mostly from the Lower Wards, which have had five very unlucky years. Almost nobody knows this.',
      'Tamsin Reed is the last of the Reeds, a dockside family who have kept the player’s lamp lit for generations. Her grandmother taught her the prayer. Tamsin has prayed every night for eleven years and has never once asked for anything, or felt any answer, until the moment the story opens.',
      'The player’s name was taken off the Register of Shrines decades ago, because one follower does not count as a shrine. Tamsin could enter the Games only because Brother Ash signed her entry himself, vouching that the player’s shrine is lit, which breaks the rules he enforces. Mother Sabine Orlo, High Priestess of the Golden House, Fortune’s temple, has noticed.',
      'The Iron Duke is going blind from the edges in, and Fortune’s luck has hidden it for two years. The Golden House holds the deed to his family home, Stenn House, and will call it in if he loses. He has told nobody, and nobody but Fortune has noticed.',
    ],
    toneGuide:
      'A tournament story told from the cheap seats of heaven: funny, quick and specific, with a real person bleeding on the sand under it. The player is a god with almost no power and every bit of it matters, so the comedy comes from a small god being petty, proud, broke and outclassed among gods, and the weight comes from one woman who has prayed for eleven years and has finally asked. ' +
      'Miracles are physical and exact: what moved, where, for how long, and who saw the gold. The gold line appears in the prose only when the count changes or the player looks at it, as one short bracketed line. A miracle always works and always costs something the next scene can feel: the day’s only one is gone, a rule is broken, or the god is a little fainter. ' +
      'By day the player is a voice at Tamsin’s elbow and a presence in the Gallery; by night the player can walk the city in a body, and the city is loud, lantern-lit and full of people who might pray to them. Fights on the sand are hard and short, never gory: bruises, sand, a split lip, a yield. ' +
      'Fortune’s moved luck, the Duke’s eyes and the Arbiter’s past are things the player finds out through play; never state them before they are earned. Nobody is a villain. Fortune is frightened of going out, the Duke wants one honest bout, the priestess wants her books to balance. The face at the top of a beat belongs to whoever reacted to the player most strongly, and on the sand that is nearly always Tamsin.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Tamsin catches the sword out of the air without looking at it.\n\nThe crowd makes a sound like a wave hitting the harbour wall.\n\n[Miracles left today: 0]\n\nThe Duke lowers his axe one inch. He looks at her hand, then at the sky, then back at her.\n\n\"Reed,\" he says. \"Where did that come from?\"\n\nTamsin spits sand. \"Family.\"\n\nDown at the gold rail, Lady Fortune stops turning her coin.",
      "Wick pats your knee with a hand that is mostly candlelight.\n\n\"Don’t look now, love, but she’s looking at you again. Her Ladyship. No, don’t look.\"\n\nYou look.\n\nFortune raises her cup to you from the rail, forty benches down, and mouths one word.\n\nDarling.\n\n\"Oh, that’s bad,\" Wick says happily. \"That’s very bad. Have a bun.\"",
      "Brother Ash does not look up from his ledger.\n\n\"You’re sitting on my desk,\" he says.\n\nYou are. Nobody has ever been able to tell before.\n\n\"Rule four. No god touches another god’s champion.\" He blots the page. \"The Duke’s opponent slipped today, at the second exchange, on dry sand. So tell me whose rule you think that was.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 8, agility: 10, mind: 12, presence: 11, resolve: 12, arcana: 14 },
  skills: [
    { id: 'miracles', name: 'Miracles', attribute: 'arcana', description: 'Putting a miracle exactly where you meant it, at exactly the size you meant.' },
    { id: 'domain', name: 'Your Domain', attribute: 'arcana', description: 'The small free favours inside the one thing you are god of.' },
    { id: 'listening', name: 'Listening', attribute: 'mind', description: 'Hearing prayers, and what people want underneath what they ask for.' },
    { id: 'bargaining', name: 'Bargaining', attribute: 'mind', description: 'Trading with gods and priests and coming out level.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying a true thing to somebody much bigger than you.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being worth praying to, face to face.' },
    { id: 'quiet_hands', name: 'Quiet Hands', attribute: 'agility', description: 'Working a miracle so small and quick that nobody sees the gold.' },
    { id: 'brawling', name: 'Brawling', attribute: 'might', description: 'What a borrowed body can do when a night in the city goes wrong.' },
  ],
  /**
   * Three, all invisible.
   *
   * Flame is the only GOOD_HIGH, so resting at the lamp restores the god and
   * nothing else. Notice and Fading descend. Notice is first on purpose:
   * public violence raises the first GOOD_LOW in array order, and a god seen
   * brawling is noticed before it fades. Break the Pact, Show the Luck and
   * Show Yourself raise Notice; Burn for It and Let the Lamp Go raise Fading.
   */
  resources: [
    {
      id: 'flame',
      name: 'Flame',
      max: 100,
      start: 80,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'You are down to a flicker. Tamsin hears you as a draught rather than a voice, a body you have walked down in goes thin at the edges, and nothing you try takes hold until you have rested at your lamp.',
      color: '#F2C14E',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Guttering. Your voice reaches Tamsin late and quiet, small favours in your domain come out smaller than you meant, and a body walked down in feels like a coat a size too big. This is the band where sitting by your lamp while somebody prays is the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a god who has had a long day in a short city. Fine for one more small favour or one more conversation, honest about not wanting a fight. Nobody needs to remark on it unless the player pushes.',
        },
        {
          upTo: 100,
          behaviour:
            'Bright. Your voice is clear at her elbow, your favours land exactly, and a body walked down in feels solid enough to lean on a bar. Scenes can be long and you can afford to be curious.',
        },
      ],
    },
    {
      id: 'notice',
      name: 'Notice',
      max: 100,
      start: 10,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody in the Gallery is watching the back row at all. You could do almost anything once and get away with it.',
      color: '#C9A227',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Beneath attention. The big gods talk over you, the Arbiter glances up at the back row only out of habit, and the Golden House has you down as a clerical nuisance rather than a rival.',
        },
        {
          upTo: 50,
          behaviour:
            'Somebody is counting. Fortune leans down the row a little more often, Brother Ash watches your hands as well as the sand, and gods two benches over stop talking when you sit down.',
        },
        {
          upTo: 80,
          behaviour:
            'Watched. Every miracle you work is looked for in gold. Mother Sabine has a clerk asking questions in Tanner’s Row, the middle tier takes bets on what you will do next, and the Arbiter is one clear sight of gold away from ringing the bell on Tamsin.',
        },
        {
          upTo: 100,
          behaviour:
            'The whole Gallery has decided you are a problem. Gods move seats to avoid you or to be near you. Any foul, seen or only suspected, will be called, and Fortune stops flirting and starts negotiating.',
        },
      ],
    },
    {
      id: 'fade',
      name: 'Fading',
      max: 100,
      start: 30,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'You are as solid as a god can be: your outline holds in the Gallery, your voice carries, and the lamp in Tanner’s Row burns steady even in wind.',
      color: '#8A8FA3',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Holding. You are thin the way every one-follower god is thin, and no thinner. Your seat by the pillar is yours, and the draught does not go through you.',
        },
        {
          upTo: 60,
          behaviour:
            'The edges are going. Your hands are a little see-through in strong sun, other gods look past you before they look at you, and Tamsin has to listen harder to hear you over the crowd.',
        },
        {
          upTo: 85,
          behaviour:
            'Going. Sound reaches you late. The gold line flickers. Wick holds your hand without being asked and Fortune is kind to you, which is the worst sign there is. One more burn could finish it.',
        },
        {
          upTo: 100,
          behaviour:
            'Nearly out. You can hear one prayer and nothing else. Every scene should feel like the last light in a room, and the only things that pull you back are someone saying your name at your lamp, or a choice you make on purpose.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'gold_line',
      name: 'Your Gold Line',
      tags: ['quest', 'divine'],
      questItem: true,
      droppable: false,
      description:
        'A small line of gold light that hangs in the air in front of you whenever you think about it, and that nobody else can see. It reads [Miracles left today: 1] and, under it, [Followers: 1, Tamsin Reed]. It refills at dawn, one miracle for every person who truly prays to you.',
      loreText:
        'The count goes down by one each time you work a miracle and comes back at dawn. When somebody new prays to you by name at your lamp, meaning it, a new name appears under Tamsin’s and you have one more miracle from the next morning. You can burn yourself for one more when it reads zero. It shows nothing at all when you are going out.',
      icon: 'spark',
    },
    {
      id: 'reed_lamp',
      name: 'The Reed Lamp',
      tags: ['quest', 'shrine'],
      questItem: true,
      droppable: false,
      description:
        'Your shrine: a dented tin lamp in a wall niche at the bend of Tanner’s Row, with a century of soot above it. Tamsin lights it every night at dusk. While it is lit you can feel it from anywhere in the city, like a hand on your back.',
      loreText:
        'Four generations of Reeds have filled it. Tamsin’s grandmother scratched a small mark into the base, the same mark Tamsin chalked on her door in the Champions’ Cells. A shrine with no lamp is not a shrine, in the eyes of the Register clerks.',
      icon: 'lamp',
    },
    {
      id: 'fortune_coin',
      name: 'Fortune’s Coin',
      tags: ['quest', 'divine'],
      questItem: true,
      description:
        'A heavy gold coin with a woman’s profile on both faces. Lady Fortune offers it to you as a contract: flip it, say yes, and she takes you in as one of her aspects. You will never go out. You will also stop being you.',
      loreText:
        'It lands face up every time, which Fortune says is rather the point. Seventeen small gods have flipped it before you. Wick has been told she may flip it at the final.',
      icon: 'coin',
    },
    {
      id: 'stenn_deed',
      name: 'The Stenn Deed',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The deed to Stenn House, the Duke’s family home, pledged to the Golden House against old debts at nine per cent. It sits in the strongroom behind Mother Sabine’s counting room. If the Duke loses, she calls it in.',
      loreText:
        'The Duke has never read the terms. The last page carries his grandfather’s seal, his father’s, and his own, each in a slightly worse hand.',
      icon: 'scroll',
    },
    {
      id: 'entry_paper',
      name: 'Tamsin’s Entry Paper',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Tamsin Reed’s entry to the Hearth Games, filed with the Register at the Temple of All Gods. Under "Patron" she wrote your name. Under "Shrine vouched for by" there is a signature in small, careful letters: Brother Ash.',
      loreText:
        'An Arbiter vouching for an unregistered shrine breaks the rules he is sworn to enforce. Mother Sabine Orlo has asked to see this paper twice.',
      icon: 'letter',
    },
    {
      id: 'wick_candle',
      name: 'Wick’s Last Inch',
      tags: ['quest', 'shrine'],
      questItem: true,
      description:
        'A candle-end no longer than a thumb, burning on the shelf above the ovens at the night bakery. It is Wick’s whole shrine. While it burns, Wick does.',
      loreText:
        'Hettie the baker lights a new stub from the old one every night out of a habit her mother had. She is not sure any more who it is for.',
      icon: 'candle',
    },
    {
      id: 'tamsin_sword',
      name: 'Tamsin’s Borrowed Sword',
      tags: ['weapon'],
      description: 'A plain dock-watch sword with a notched edge and a grip rewrapped in tarred cord. Borrowed from the harbour watch for the Games.',
      loreText: 'The watch sergeant lent it on the condition that she bring it back without the Duke’s name on it.',
      icon: 'sword',
    },
    {
      id: 'knee_strap',
      name: 'The Knee Strap',
      tags: ['gear'],
      description: 'A wide leather strap and a roll of linen that Tamsin winds round her right knee before every bout, and hides under her trouser leg afterwards.',
      loreText: 'Wound tight enough, it holds the knee for about four minutes of hard footwork. She has timed it.',
      icon: 'bandage',
    },
    {
      id: 'festival_ribbon',
      name: 'A Festival Ribbon',
      tags: ['token'],
      description: 'A strip of ribbon in one god’s colours, sold on every corner during the Games. Gold for Fortune, sea-green for the harbour god, red for the war god. Nobody sells yours.',
      loreText: 'Mortals tie them on their wrists for their champion. A wrist with an unknown colour on it starts conversations.',
      icon: 'ribbon',
    },
    {
      id: 'betting_slip',
      name: 'A Betting Slip',
      tags: ['document'],
      description: 'A bookmaker’s slip from the Twelve Bells: one silver on Tamsin Reed to take the Hearth, at two hundred to one.',
      loreText: 'The bookmaker drew a small candle next to the odds on the board, as a joke about the god of candle-ends. Nobody in the tavern knows your name well enough to joke about it.',
      icon: 'ticket',
    },
    {
      id: 'lamp_oil',
      name: 'A Flask of Lamp Oil',
      tags: ['supply'],
      description: 'Cheap fish-smelling lamp oil, the kind Tamsin buys a flask at a time for your lamp.',
      loreText: 'She has never once let the lamp run dry. She has come close twice, both in the bad winter.',
      icon: 'flask',
    },
    {
      id: 'bailiffs_notice',
      name: 'The Bailiff’s Notice',
      tags: ['document'],
      description: 'A notice nailed to the mast of the Kittiwake, the Reed family boat: seized for debt, to be sold at auction the week after the Games.',
      loreText: 'The debt is owed to the Golden House, which bought it from the chandler who held it. Most debts in the Lower Wards end up there.',
      icon: 'papers',
    },
    {
      id: 'sugar_bun',
      name: 'A Burnt-Sugar Bun',
      tags: ['food'],
      consumable: { resourceId: 'flame', amount: 5, consumesItem: true },
      description: 'A sticky bun from the night bakery, still hot, with the sugar burnt black on top the way Hettie likes it.',
      loreText: 'Gods do not need to eat. Gods who have walked down for a night tend to find that they want to.',
      icon: 'bread',
    },
    {
      id: 'bout_ledger',
      name: 'The Bout Ledger',
      tags: ['document', 'evidence'],
      skillModifiers: { listening: 1 },
      description: 'Brother Ash’s handwritten record of every bout of the Games for twenty years. In the margins, in pencil, he has noted every slip, snapped strap and lucky fall in the Duke’s bouts.',
      loreText: 'Beside the pencil notes there is a single word, written five times, once for each year: "proof?"',
      icon: 'book',
    },
    {
      id: 'register_plate',
      name: 'Your Old Plate',
      tags: ['document'],
      description: 'A bronze plate from the Register of Shrines with your name on it, green with age, found in a crate of struck-off plates in the Temple of All Gods.',
      loreText: 'Under your name, the number of followers was scratched out and rewritten so many times that the bronze is worn thin. The last figure is a one.',
      icon: 'plaque',
    },
    {
      id: 'odd_key',
      name: 'A Key Nobody Missed',
      tags: ['personal'],
      description: 'A small iron key you found and kept, because in two hundred years nobody ever came looking for it.',
      loreText: 'You can feel the lock it belongs to somewhere in the city, the way you feel every lost thing.',
      icon: 'key',
    },
    {
      id: 'clean_bandage',
      name: 'A Clean Bandage',
      tags: ['personal'],
      description: 'A roll of clean linen, the kind left at your kind of shrine by people who got better.',
      loreText: 'Small mercies are mostly linen and hot water. The miracle is somebody bringing them.',
      icon: 'bandage',
    },
    {
      id: 'tin_bell',
      name: 'A Tin Weather-Bell',
      tags: ['personal'],
      description: 'A fisherman’s tin bell that rings on its own an hour before the weather turns.',
      loreText: 'It was nailed over a harbour door for sixty years, back when people still asked you to keep a storm off.',
      icon: 'bell',
    },
    {
      id: 'door_chalk',
      name: 'A Stub of Door-Chalk',
      tags: ['personal'],
      description: 'A stub of the white chalk people in the Lower Wards still use to draw a small sign over a door they want kept safe.',
      loreText: 'The sign is yours. Most of the people who draw it have no idea it belongs to anyone.',
      icon: 'chalk',
    },
  ],
  abilities: [
    {
      id: 'work_a_miracle',
      name: 'Work a Miracle',
      tags: ['miracle'],
      description:
        'Spend one of today’s miracles: one clear physical thing that lasts a breath, on Tamsin or on what she is holding. A sword back in a hand, a cut closed, a gust at her back. It always works, and it shows gold to anyone sighted.',
      affordances: ['miracle', 'use the miracle', 'spend the miracle', 'work a miracle', 'help her', 'answer the prayer', 'intervene', 'do something', 'put her sword back'],
      costs: [{ resourceId: 'flame', amount: 30 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'burn_bright',
      name: 'Burn for It',
      tags: ['miracle'],
      description: 'Work one more miracle when the gold line reads zero, paid for out of yourself. It works. You are fainter afterwards, and three of these in a few days would put you out.',
      affordances: ['burn my own light', 'burn for her', 'one more miracle', 'spend my own light', 'give it everything', 'whatever it costs'],
      costs: [
        { resourceId: 'flame', amount: 15 },
        { resourceId: 'fade', amount: 25 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bend_the_pact',
      name: 'Break the Pact',
      tags: ['miracle'],
      description: 'Spend a miracle on someone who is not your champion, inside the Bowl: the Duke’s footing, his axe, the crowd. A foul under the Gallery Pact. Whether the Arbiter sees the gold is the roll.',
      affordances: ['cheat', 'break the rules', 'trip the duke', 'the duke’s axe', 'rules or no rules', 'on the duke instead', 'foul'],
      costs: [
        { resourceId: 'flame', amount: 30 },
        { resourceId: 'notice', amount: 30 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'quiet_hands', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'speak_to_her',
      name: 'Speak to Her',
      tags: ['social'],
      description: 'Talk to Tamsin wherever she is. She hears you as a voice at her elbow, and nobody else does unless they are sighted.',
      affordances: ['tell her', 'talk to her', 'whisper to her', 'tell tamsin', 'say to her', 'speak to her', 'tell her to yield', 'reassure her'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'speak_plainly',
      name: 'Speak Plainly',
      tags: ['social'],
      description: 'Say the true thing to a god, a priest or a champion, without dressing it up, and take whatever comes back.',
      affordances: ['tell the truth', 'be honest', 'say it straight', 'refuse', 'say no', 'tell her no', 'admit it', 'confess'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'listen',
      name: 'Listen to Prayers',
      tags: ['sight'],
      description: 'Go still and hear what the people around you are praying for right now, to anyone, and what they want underneath it.',
      affordances: ['listen', 'listen to prayers', 'hear them', 'what are they praying for', 'eavesdrop', 'read him', 'read her', 'look closer'],
      costs: [{ resourceId: 'flame', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'mind', skillId: 'listening', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'strike_a_bargain',
      name: 'Strike a Bargain',
      tags: ['social'],
      description: 'Make a deal with a god, a priest or a bookmaker, and be bound by it. Gods keep their bargains. That is most of what makes them gods.',
      affordances: ['make a deal', 'bargain', 'strike a deal', 'name a price', 'trade', 'offer her a deal', 'negotiate', 'flip the coin'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'bargaining', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_back',
      name: 'Hold Back',
      tags: [],
      description: 'Keep the miracle. Watch, trust her, and let the bout or the night go the way it goes without you.',
      affordances: ['wait and see', 'do nothing', 'save it', 'hold back', 'trust her', 'just watch', 'let her do it', 'keep the miracle'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_down',
      name: 'Walk Down',
      tags: ['movement'],
      description: 'Between dusk and dawn, during the Games, step out of the Gallery into a body of your own and walk the city like anyone else.',
      affordances: ['walk down', 'take a body', 'go down into the city', 'manifest', 'go to her in person', 'walk among them'],
      costs: [{ resourceId: 'flame', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['first_dusk'],
        lockedCopy: 'The sun is still up. By day a god is a voice and a draught, and the city walks straight through you.',
      },
    },
    {
      id: 'scuffle',
      name: 'Use Your Fists',
      tags: ['offensive'],
      description: 'In a body you have walked down in, fight like a mortal: badly, honestly, and with a mortal’s bruises afterwards.',
      affordances: ['punch', 'hit him', 'fight', 'tackle', 'shove', 'attack', 'brawl', 'throw a punch'],
      costs: [{ resourceId: 'flame', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawling', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['first_dusk'],
        lockedCopy: 'You have no fists. Until dusk you are a presence in the Gallery, and a presence cannot hit anybody.',
      },
    },
    {
      id: 'make_a_believer',
      name: 'Answer a Stranger',
      tags: ['miracle'],
      description: 'Do something small and kind for someone who has never prayed to you, close enough to your lamp or your name that they might start.',
      affordances: ['answer a stranger', 'help someone', 'win a follower', 'make a believer', 'convert', 'tell them my name', 'do them a kindness'],
      costs: [{ resourceId: 'flame', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:how_believers_come'],
        lockedCopy: 'You have had one family praying to you for a hundred years. You have honestly never thought about how you would get another.',
      },
    },
    {
      id: 'show_the_luck',
      name: 'Show the Luck',
      tags: ['sight'],
      description: 'Make Fortune’s hidden luck flash gold for one breath, on the sand, where anyone sighted can see exactly what it is.',
      affordances: ['show the luck', 'expose her', 'make it show', 'catch her cheating', 'light up the luck', 'show the arbiter'],
      costs: [
        { resourceId: 'flame', amount: 25 },
        { resourceId: 'notice', amount: 20 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'miracles', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:luck_is_moved'],
        lockedCopy: 'The Duke’s opponents slip and their straps snap, and it looks like luck. You have no idea yet that it is anything else.',
      },
    },
    {
      id: 'show_yourself',
      name: 'Show Yourself',
      tags: ['social'],
      description: 'Appear in daylight, in your full light, in front of a crowd. Only a god with a handful of followers has enough of itself to do it.',
      affordances: ['show myself', 'appear to the crowd', 'reveal myself', 'stand up in the light', 'let them see me'],
      costs: [
        { resourceId: 'flame', amount: 40 },
        { resourceId: 'notice', amount: 25 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['five_a_day'],
        lockedCopy: 'One follower’s worth of light would not show up against a candle, let alone the noon sun over the Bowl.',
      },
    },
    {
      id: 'let_the_lamp_go',
      name: 'Let the Lamp Go',
      tags: ['miracle'],
      description: 'Go out on purpose, the way Brother Ash once went out by accident, and wake up a person with a heartbeat and no miracles.',
      affordances: ['let the lamp go', 'go out for good', 'become mortal', 'give up being a god', 'stop being a god', 'stay with her as a person'],
      costs: [{ resourceId: 'fade', amount: 60 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:what_ash_was'],
        lockedCopy: 'As far as any god in the Gallery knows, going out is the end. Nobody has ever come back to say otherwise.',
      },
    },
    {
      id: 'bring_it_back',
      name: 'Bring It Back',
      tags: ['utility'],
      description: 'Feel where a lost thing is anywhere in the city, and nudge small ones home: a coin, a key, a ring under a floorboard. A sword back in a hand mid-bout is a miracle.',
      affordances: ['find it', 'bring it back', 'where is it', 'find the lost', 'return it', 'track it down'],
      costs: [{ resourceId: 'flame', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'domain', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ease_the_hurt',
      name: 'Ease the Hurt',
      tags: ['healing'],
      description: 'Quiet a pain, close a small cut, let a tired body sleep. Mending a knee that is truly broken is a miracle.',
      affordances: ['heal', 'ease the pain', 'help her knee', 'close the cut', 'soothe', 'let her sleep', 'mend it'],
      costs: [{ resourceId: 'flame', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'domain', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'turn_the_sky',
      name: 'Turn the Sky',
      tags: ['utility'],
      description: 'Raise a gust, a squall or a sea fog over one street, or calm one. Sand in a champion’s eyes at the right moment is a miracle.',
      affordances: ['wind', 'rain', 'fog', 'gust', 'storm', 'calm the weather', 'turn the sky', 'blow'],
      costs: [{ resourceId: 'flame', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'domain', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_the_way',
      name: 'Open the Way',
      tags: ['utility'],
      description: 'A lock gives, a door sticks shut, a way out of a room turns up where you would not have looked. A strongroom door is a miracle.',
      affordances: ['open the lock', 'open the door', 'unlock it', 'jam the door', 'find a way out', 'get in', 'pick the lock'],
      costs: [{ resourceId: 'flame', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'domain', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'the_bowl',
      name: 'The Bowl',
      shortName: 'The Bowl',
      description:
        'Merrowgate’s great arena: a floor of raked sand, thirty thousand seats packed to the rails, and a bronze bell on a post at the edge of the sand. Above the top tier, where mortals see only sky, is the Gallery: stone benches for the gods, ranked by how many people pray to them. The big gods sit at the gold rail. Your seat is in the back row, by the cracked pillar, in the draught.',
      artDirection:
        'A vast sunlit stone arena packed with a festival crowd, raked sand floor, banners in many colours, a bronze bell on a post. Above the highest tier, faint in the sky, a ghostly tier of stone benches where glowing gods sit. Warm gold light, dust in the air.',
      connections: [
        { to: 'champions_cells', travelMinutes: 2, label: 'Down the tunnel to the cells' },
        { to: 'festival_streets', travelMinutes: 5, label: 'Out through the great gate' },
        { to: 'the_lamp', travelMinutes: 0, label: 'Home to your lamp, the way gods travel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'tamsin_sword', qty: 1, ownerId: 'tamsin', aka: ['sword', 'her sword', 'the blade', 'the borrowed sword'] },
        { itemId: 'fortune_coin', qty: 1, ownerId: 'fortune', aka: ['coin', 'her coin', 'the gold coin'] },
      ],
    },
    {
      id: 'champions_cells',
      name: 'The Champions’ Cells',
      shortName: 'The Cells',
      description:
        'Stone rooms under the stands where the sixteen champions wait, strap their hands, and bleed quietly between bouts. Each door has a god’s mark chalked on it. Tamsin’s door has a mark nobody else down here recognises, drawn by her own hand.',
      artDirection:
        'Low stone corridor under an arena, a row of heavy wooden doors each chalked with a different symbol, oil lamps, a bench with bandages and water buckets, light from a tunnel mouth at the far end.',
      connections: [
        { to: 'the_bowl', travelMinutes: 2, label: 'Up the tunnel to the sand' },
        { to: 'arbiter_chapel', travelMinutes: 3, label: 'Along to the Unsworn Chapel' },
        { to: 'festival_streets', travelMinutes: 6, label: 'Out by the champions’ door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'knee_strap', qty: 1, ownerId: 'tamsin', aka: ['strap', 'knee strap', 'the brace', 'her strap'] },
      ],
    },
    {
      id: 'arbiter_chapel',
      name: 'The Unsworn Chapel',
      shortName: 'The Chapel',
      description:
        'A bare chapel built into the arena wall, with no altar and no god. A cot, a desk with the bout ledger open on it, a broom, and one window that looks straight up at a sky the monks swear is empty.',
      artDirection:
        'Austere whitewashed stone chapel with no altar, a narrow cot, a wooden desk with a thick open ledger and a lamp, a broom against the wall, a single high window showing blue sky.',
      connections: [
        { to: 'champions_cells', travelMinutes: 3, label: 'Back to the cells' },
        { to: 'hearth_temple', travelMinutes: 8, label: 'The monks’ passage to the Temple of All Gods' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'bout_ledger', qty: 1, ownerId: 'ash', aka: ['ledger', 'the bout ledger', 'his ledger', 'the record'] },
      ],
    },
    {
      id: 'festival_streets',
      name: 'The Festival Streets',
      shortName: 'The Streets',
      description:
        'Three days of lanterns strung across every street between the Bowl and the harbour. Stalls sell ribbons in each god’s colours, bookmakers chalk odds on boards, drummers drum. Nobody sells your colours, because nobody knows what they are.',
      artDirection:
        'Crowded festival street at dusk in a fantasy harbour city, paper lanterns strung overhead, ribbon stalls in many colours, a chalkboard of betting odds, drummers, steep roofs and a glimpse of masts at the bottom of the hill.',
      connections: [
        { to: 'the_bowl', travelMinutes: 5, label: 'Back to the Bowl' },
        { to: 'champions_cells', travelMinutes: 6, label: 'Round to the champions’ door' },
        { to: 'twelve_bells', travelMinutes: 3, label: 'The tavern by the gate' },
        { to: 'tanners_row', travelMinutes: 12, label: 'Down into the Lower Wards' },
        { to: 'the_harbour', travelMinutes: 10, label: 'Down to the harbour' },
        { to: 'golden_house', travelMinutes: 7, label: 'Up the hill to the Golden House' },
        { to: 'hearth_temple', travelMinutes: 6, label: 'Up to the Temple of All Gods' },
        { to: 'stenn_house', travelMinutes: 9, label: 'Across to the old quarter' },
        { to: 'night_bakery', travelMinutes: 8, label: 'The back way to the night bakery' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'festival_ribbon', qty: 3, ownerId: null, aka: ['ribbon', 'a ribbon', 'the ribbons'] },
      ],
    },
    {
      id: 'twelve_bells',
      name: 'The Twelve Bells',
      shortName: 'The Bells',
      description:
        'A loud tavern by the Bowl’s gate where champions drink after bouts and bookmakers chalk the odds over the bar. Tamsin Reed is chalked at two hundred to one. At night, during the Games, a tall woman in gold buys rounds for the whole room and takes every bet.',
      artDirection:
        'Busy low-beamed tavern at night, a long bar with a chalkboard of odds above it, champions with bandaged hands, tankards, lantern light, a woman in gold silk laughing at a corner table.',
      connections: [{ to: 'festival_streets', travelMinutes: 3, label: 'Back out to the streets' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'betting_slip', qty: 1, ownerId: null, aka: ['slip', 'betting slip', 'the bet'] },
      ],
    },
    {
      id: 'tanners_row',
      name: 'Tanner’s Row',
      shortName: 'Tanner’s Row',
      description:
        'A steep lane of tanneries and rope-walks in the Lower Wards, smelling of lime and tar. Tamsin rents a room above a rope-maker’s. Five years of bad luck show everywhere: a collapsed porch, a shuttered bakery, a well with a sign on it, and nobody quite saying why.',
      artDirection:
        'Steep narrow cobbled lane in a poor harbour quarter, tannery vats, coils of rope, a collapsed wooden porch, a shuttered shopfront, laundry lines, a small lamp glowing in a niche in a wall at the bend.',
      connections: [
        { to: 'the_lamp', travelMinutes: 1, label: 'The niche at the bend' },
        { to: 'festival_streets', travelMinutes: 12, label: 'Up into the festival' },
        { to: 'the_harbour', travelMinutes: 8, label: 'Down the steps to the quay' },
        { to: 'night_bakery', travelMinutes: 5, label: 'Round the corner to the night bakery' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'lamp_oil', qty: 1, ownerId: null, aka: ['oil', 'lamp oil', 'the flask'] },
      ],
    },
    {
      id: 'the_lamp',
      name: 'The Lamp in the Wall',
      shortName: 'Your Lamp',
      description:
        'Your shrine: a niche the size of a bread oven in the wall at the bend of Tanner’s Row, a dented tin lamp inside it, and a century of soot above. Tamsin lights it every night at dusk and says the prayer her grandmother taught her. A god can come here from anywhere in a moment.',
      artDirection:
        'A small arched niche in an old brick wall on a poor street at dusk, a dented tin lamp with a small steady flame, a century of soot above it, a chalk sign scratched beside it, puddles reflecting the light.',
      connections: [
        { to: 'tanners_row', travelMinutes: 1, label: 'Out into the lane' },
        { to: 'the_bowl', travelMinutes: 0, label: 'Up to the Gallery, the way gods travel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 3 },
      takeableItems: [
        { itemId: 'reed_lamp', qty: 1, ownerId: null, aka: ['lamp', 'the lamp', 'my lamp', 'the tin lamp'] },
      ],
    },
    {
      id: 'the_harbour',
      name: 'Merrowgate Harbour',
      shortName: 'The Harbour',
      description:
        'Stone quays, cranes, bonded warehouses and a forest of masts. Tamsin works the dawn tide here. The Reed family boat, the Kittiwake, sits chained at the bailiff’s mooring with a notice nailed to her mast. At the coal berth a barge has rolled over in flat calm water, and nobody can say why.',
      artDirection:
        'Busy stone harbour at dawn, cranes and masts, dockworkers hauling crates, a small weathered fishing boat chained at a mooring with a paper notice on the mast, a capsized barge in calm water beyond.',
      connections: [
        { to: 'tanners_row', travelMinutes: 8, label: 'Up the steps to Tanner’s Row' },
        { to: 'festival_streets', travelMinutes: 10, label: 'Up the hill to the festival' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [
        { itemId: 'bailiffs_notice', qty: 1, ownerId: null, aka: ['notice', 'the notice', 'the bailiff’s notice'] },
      ],
    },
    {
      id: 'night_bakery',
      name: 'The Night Bakery',
      shortName: 'The Bakery',
      description:
        'A narrow bakery in the Lower Wards that works from midnight to dawn. Hettie, its baker, is old and slow and keeps a candle-end burning on the shelf above the ovens for a god she half remembers. That candle is Wick’s whole shrine.',
      artDirection:
        'Cramped bakery at night lit by the orange glow of brick ovens, trays of buns, flour in the air, a tiny candle stub burning on a high shelf, an old baker in an apron pulling a tray.',
      connections: [
        { to: 'tanners_row', travelMinutes: 5, label: 'Round the corner to Tanner’s Row' },
        { to: 'festival_streets', travelMinutes: 8, label: 'The back way up to the festival' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'wick_candle', qty: 1, ownerId: 'wick', aka: ['candle', 'the candle-end', 'the stub', 'her candle'] },
        { itemId: 'sugar_bun', qty: 4, ownerId: null, aka: ['bun', 'a bun', 'the buns'] },
      ],
    },
    {
      id: 'golden_house',
      name: 'The Golden House',
      shortName: 'Golden House',
      description:
        'Lady Fortune’s temple on the hill: gold leaf on everything, a hall of offering bowls heaped with coins, priests in cream and gold. Behind the hall are Mother Sabine Orlo’s counting room and a locked strongroom full of deeds, debts and evidence.',
      artDirection:
        'Opulent hilltop temple interior covered in gold leaf, bowls overflowing with coins, cream-and-gold robed priests, a heavy iron strongroom door at the back of a counting room full of ledgers.',
      connections: [{ to: 'festival_streets', travelMinutes: 7, label: 'Down the hill to the festival' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'stenn_deed', qty: 1, ownerId: 'sabine', aka: ['deed', 'the deed', 'the stenn deed', 'his deed'] },
      ],
    },
    {
      id: 'hearth_temple',
      name: 'The Temple of All Gods',
      shortName: 'The Hearth',
      description:
        'A round temple at the top of the city with a fire in a stone basin at its centre: the Hearth, which has never gone out. Every prayer said at any hearth in Merrowgate rises through it to whichever god holds it. Around the walls runs the Register of Shrines, seven hundred bronze plates. Yours came down decades ago.',
      artDirection:
        'Round stone temple with a great fire burning in a wide stone basin at its centre, walls lined floor to ceiling with small bronze name plates, clerks at desks, a dark door behind the fire.',
      connections: [
        { to: 'festival_streets', travelMinutes: 6, label: 'Down into the festival' },
        { to: 'arbiter_chapel', travelMinutes: 8, label: 'The monks’ passage to the Bowl' },
        { to: 'the_cinder_yard', travelMinutes: 2, lockedByFlag: 'found_the_cinder_yard', label: 'The door behind the Hearth' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'entry_paper', qty: 1, ownerId: null, aka: ['entry paper', 'her entry', 'the signature', 'the entry'] },
        { itemId: 'register_plate', qty: 1, ownerId: null, aka: ['plate', 'my plate', 'the bronze plate', 'my old plate'] },
      ],
    },
    {
      id: 'stenn_house',
      name: 'Stenn House',
      shortName: 'Stenn House',
      description:
        'The Duke’s townhouse in the old quarter: grand, half-shuttered, the furniture under sheets in every room but two. In the courtyard a practice post has been hacked nearly through, and white lines are painted on the flagstones in a ring, the way you would mark a path for somebody who cannot see well.',
      artDirection:
        'Old grand townhouse courtyard at dawn, shuttered windows, a battered wooden practice post, white painted lines in a ring on grey flagstones, a long axe leaning against a wall.',
      connections: [{ to: 'festival_streets', travelMinutes: 9, label: 'Back across to the festival' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_cinder_yard',
      name: 'The Cinder Yard',
      shortName: 'Cinder Yard',
      description:
        'A walled yard behind the Temple of All Gods where the clerks dump the shrines of gods who went out: cracked lamps, melted candles, soot-black statues, all heaped in drifts of old ash. In the middle of it a small bench has been swept clean.',
      artDirection:
        'Walled yard heaped with grey ash and broken shrine objects, cracked lamps and melted candles and blackened little statues, one clean swept stone bench in the centre, soft evening light.',
      connections: [{ to: 'hearth_temple', travelMinutes: 2, label: 'Back through to the Hearth' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_gallery',
      name: 'The Gallery',
      description: 'The gods of Merrowgate in their seats above the Bowl, ranked by how many people pray to them. The rail looks down on the back row in every sense, and the back row is getting emptier every year.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'Back row' },
        { atReputation: 35, label: 'Middle tier' },
        { atReputation: 70, label: 'At the rail' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_unsworn',
      name: 'The Unsworn',
      description: 'An order of monks who pray to no god, so that someone in the city can judge the gods’ Games fairly. They ring the bell, call the fouls and sweep the Hearth.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'A god like any other' },
        { atReputation: 40, label: 'Fairly judged' },
        { atReputation: 70, label: 'Trusted on the sand' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_golden_house',
      name: 'The Golden House',
      description: 'Lady Fortune’s temple, her priests and her money: half the debts in the Lower Wards and the deed to the Iron Duke’s home. It needs a sixth Hearth to stay solvent and is not leaving it to luck.',
      startingReputation: -10,
      ranks: [
        { atReputation: -40, label: 'A problem to be filed' },
        { atReputation: 0, label: 'Beneath notice' },
        { atReputation: 40, label: 'Worth a meeting' },
      ],
      allies: [],
      enemies: ['faction_lower_wards'],
    },
    {
      id: 'faction_lower_wards',
      name: 'The Lower Wards',
      description: 'Tanner’s Row, the docks and the streets around them: poor, proud, and unlucky for five years running. Every person here prays to somebody, and most of them would switch for a god who actually turned up.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Somebody’s god' },
        { atReputation: 40, label: 'The Row’s own' },
        { atReputation: 70, label: 'Our god' },
      ],
      allies: [],
      enemies: ['faction_golden_house'],
    },
  ],
  characters: [
    {
      id: 'tamsin',
      name: 'Tamsin Reed',
      role: 'Your one follower. A dock porter fighting in the Hearth Games under your mark, with a borrowed sword',
      cardBlurb:
        'She is the only person in Merrowgate who still prays to you, she entered the Games under your mark without asking, and after eleven years of never asking you for anything, she has finally asked.',
      pronouns: 'she/her',
      publicTraits: [
        'Says the blunt thing first and the kind thing second',
        'Strong from eleven years of hauling crates on the quay',
        'Will not be carried, by anyone, for any distance',
      ],
      hiddenDrives: [
        'She half entered the Games to find out whether you exist at all, and she is more frightened of that answer than of the Duke',
        'She wants something that is hers when this is over: the family boat back, and a reason to stay in a city that has been unlucky to her street for five years',
      ],
      values: ['Keeping a promise made at a deathbed', 'Paying her own way, including to a god'],
      fears: [
        'That she has been lighting a lamp for nobody, the way her grandmother did',
        'Being the Reed the light goes out on',
      ],
      socialStyle:
        'Talks to you the way she would talk to a neighbour leaning on a wall: dry, direct, a bit rude. Looks up at the sky when she wants you, and thinks nobody notices.',
      boundaries: [
        'Will not be told to throw a bout, by a god or anyone else. She will yield if she chooses to, and only then',
        'Will not trade her prayer for luck. If you try to buy her faith with a miracle, she will notice, and it will cost you',
      ],
      goals: [
        'Win the Hearth Games and the champion’s purse',
        'Buy back the Kittiwake, the Reed family boat, from the harbour bailiffs',
        'Get you the Hearth, so you never go out',
      ],
      secrets: [
        {
          id: 'tamsin_knee',
          fact: 'Her right knee has locked under weight since a crate fell on it last winter. She straps it before every bout and has told nobody. In a long bout it will give out.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if you ask about the strap in the Champions’ Cells, or if you listen to what she prays for when she thinks you are not there.',
        },
        {
          id: 'tamsin_never_answered',
          fact: 'She has prayed every night for eleven years and never once felt an answer. The opener is the first time she has asked. If nothing had happened, she had privately decided to stop.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it on the first night at the lamp, if you are there in a body and you ask her why she prays at all.',
        },
      ],
      speechStyle:
        'Short, dry, dockside. Swears mildly, mostly "hells". Counts on her fingers. Talks to a god like a neighbour who owes her money, and goes very quiet when she means something.',
      topics: ['the lamp', 'her grandmother', 'the Kittiwake', 'her knee', 'the Duke', 'the purse', 'the Lower Wards'],
      voiceSamples: [
        'Eleven years I’ve lit that lamp. Every night, rain or not, and not so much as a draught back. So you’ll forgive me if I stare.',
        'Don’t spend it on my knee. Spend it on the bout. Knees mend, more or less. A purse like that comes round once.',
        'If you’re going to talk in my head, do it before I’ve got a mouthful of sand.',
        'Gran said you were shy. I said you were dead. Turns out we were both half right.',
        'Hells. You’ve got a face. Nobody told me you had a face.',
      ],
      appearance:
        'An adult woman, tall and broad-shouldered, dark brown skin, short tight black curls under a sweat-dark headscarf, a split lip healing, a sleeveless padded jerkin over dockworker’s trousers, a leather strap wound round her right knee, and a small glowing gold mark on the back of her left hand.',
      visualHook: 'A thumb-sized mark of gold light on the back of her left hand: your mark, the only one like it in the arena.',
      silhouette: 'Feet planted wide on sand, empty hands half raised, face tipped up toward the sky.',
      artSeed: 'omad-tamsin-01',
      portrait: null,
      expressions: ['neutral', 'determined', 'wry', 'worried', 'warm', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'tanners_row', activity: 'in her room above the rope-maker’s, sleeping badly' },
        { startMinute: 330, endMinute: 480, locationId: 'the_harbour', activity: 'working the dawn tide on the quay, because the purse is not won yet' },
        { startMinute: 480, endMinute: 660, locationId: 'champions_cells', activity: 'strapping her knee behind a shut door' },
        { startMinute: 660, endMinute: 1020, locationId: 'the_bowl', activity: 'on the sand or waiting in the tunnel mouth for her name' },
        { startMinute: 1020, endMinute: 1140, locationId: 'twelve_bells', activity: 'nursing one drink at the end of the bar under her own odds' },
        { startMinute: 1140, endMinute: 1260, locationId: 'the_lamp', activity: 'filling and lighting your lamp, and saying the prayer' },
        { startMinute: 1260, endMinute: 1440, locationId: 'tanners_row', activity: 'icing her knee in the dark with the window open' },
      ],
      homeLocationId: 'tanners_row',
      knowledgeScope: ['tanners_row', 'the_lamp', 'the_reed_family', 'the_harbour', 'the_hearth_games', 'the_lower_wards', 'the_kestrel'],
      startingRelationship: { trust: 40, affection: 30, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tamsin_tells_the_knee',
          label: 'She tells you what is wrong with her knee',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'tamsin_sees_your_face',
          label: 'She meets you at the lamp, in a body, and believes it',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 50, flagsSet: ['first_dusk'] },
        },
        {
          id: 'tamsin_lets_you_close',
          label: 'She lets a god get close enough to kiss',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 75, flagsSet: ['she_saw_your_face'] },
        },
      ],
      attributes: { might: 15, agility: 13, mind: 11, presence: 12, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 8, tags: ['champion', 'dockside'] },
    },
    {
      id: 'fortune',
      name: 'Lady Fortune',
      calledName: 'Fortune',
      role: 'The biggest god in Merrowgate, holder of the Hearth five years running, who sits at the gold rail and has noticed you',
      cardBlurb:
        'She has more miracles than she can count and one more win before the Hearth is hers forever, and for reasons she will not give she keeps leaning down the row to talk to you, the god with one follower.',
      pronouns: 'she/her',
      publicTraits: [
        'Generous in public, with other people’s luck',
        'Never seen without something gold in her hand',
        'Remembers every god she has outlived',
      ],
      hiddenDrives: [
        'She wants the sixth year so that she never again has to wonder whether the city still loves her',
        'She sees herself in the back row, and wants you either beside her or gone, because you are what she used to be',
      ],
      values: ['A good wager, honestly settled', 'Style. A god should be worth looking at'],
      fears: [
        'Going out. She has watched it happen to better gods and has never forgotten the quiet afterwards',
        'Being prayed to by people who would leave her the moment the luck stopped, which is everyone',
      ],
      socialStyle:
        'Flirts the way she gambles: lightly, constantly, with her real stake hidden. Turns every conversation into odds and then pays out more than she has to, to show that she can.',
      boundaries: [
        'Will not break the Gallery Pact openly. Her cheat looks like weather, and she will never be caught doing anything that looks like anything else',
        'Will not take a god in without its consent. She has never needed to force one',
      ],
      goals: [
        'Win the sixth Hearth through the Iron Duke',
        'Take Wick, the god of candle-ends, in as an aspect on the last night',
        'Take you in too, or watch you go out',
      ],
      secrets: [
        {
          id: 'fortune_moved_luck',
          fact: 'Her luck is not made. It is moved. Every bit she gives the Duke is taken from someone in the city, mostly from the Lower Wards, which have had five very unlucky years. She knows exactly what it has cost.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it, almost proudly, if you show her the rolled barge at the harbour or name a street in the Lower Wards that has gone bad since her first win.',
        },
        {
          id: 'fortune_back_row',
          fact: 'Six hundred years ago she sat in your seat, back row by the cracked pillar, with one follower, a dice-player. She grew by taking in seventeen small gods as aspects. Wick would make eighteen.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you at her midnight feast in the Gallery if you are the only god at her table who is not asking her for anything.',
        },
      ],
      speechStyle:
        'Warm, amused, unhurried. Calls you "darling" and means several things by it. Prices everything in odds. Never raises her voice, because luck never has to.',
      topics: ['the Hearth', 'the sixth year', 'odds', 'her coin', 'the back row', 'the Iron Duke', 'Wick'],
      voiceSamples: [
        'Darling. Back row, cracked pillar, one candle’s worth of prayer. I used to sit exactly there, you know. The draught never improves.',
        'Ten to one she yields. Twenty to one you burn for her. I adore a long shot. I simply never back them.',
        'Take the coin. Flip it whenever you like. It lands my way every time, which is rather the point of me.',
        'Six years and the Hearth is mine for good, and nobody need sweat in that awful sand again. Tell me honestly that isn’t kinder.',
        'Oh, sweetheart, I don’t cheat. Luck simply prefers my company.',
      ],
      appearance:
        'An adult woman, tall and languid, warm golden-brown skin, long hair the colour of new coins worn loose over one shoulder, honey-gold eyes, a draped high-collared gown of gold silk with long open sleeves, rings on every finger, and a gold coin turning over across her knuckles.',
      visualHook: 'A gold coin that walks across her knuckles on its own and never once falls.',
      silhouette: 'Lounging sideways across a gilded seat at a stone rail, one arm draped over the back, chin on her hand.',
      artSeed: 'omad-fortune-01',
      portrait: null,
      expressions: ['amused', 'teasing', 'curious', 'cold', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 660, locationId: 'golden_house', activity: 'drowsing in the Golden House on a heap of other people’s wishes' },
        { startMinute: 660, endMinute: 1080, locationId: 'the_bowl', activity: 'at the gold rail of the Gallery, betting on everything' },
        { startMinute: 1080, endMinute: 1260, locationId: 'golden_house', activity: 'receiving her priests and her offerings' },
        { startMinute: 1260, endMinute: 1440, locationId: 'twelve_bells', activity: 'walking down in a body to buy rounds and take bets' },
      ],
      homeLocationId: 'golden_house',
      knowledgeScope: ['the_gallery', 'the_hearth', 'the_sixth_year', 'the_golden_house', 'the_iron_duke', 'luck', 'wick', 'the_back_row'],
      startingRelationship: { trust: 10, affection: 25, respect: 5, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'fortune_names_the_sixth_year',
          label: 'She tells you what a sixth win would mean',
          kind: 'TRUST',
          requires: { trust: 25 },
        },
        {
          id: 'fortune_seats_you_at_the_feast',
          label: 'She keeps a seat for you at her midnight feast',
          kind: 'OTHER',
          requires: { affection: 45, flagsSet: ['fortune_asked'] },
        },
        {
          id: 'fortune_drops_the_act',
          label: 'She stops flirting and talks to you as an equal',
          kind: 'ROMANCE',
          requires: { trust: 50, affection: 65 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 16, presence: 20, resolve: 14, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 17, damage: 4, tags: ['god'] },
    },
    {
      id: 'duke',
      name: 'Duke Halvard Stenn',
      calledName: 'Stenn',
      role: 'The Iron Duke. Five-time champion of the Hearth Games under Lady Fortune’s mark, and Tamsin’s first-round opponent',
      cardBlurb:
        'He has won the Games five times for a goddess he does not believe in, he has never once gone past the count of three, and your only follower drew him in the first round, which is the worst luck you have ever seen.',
      pronouns: 'he/him',
      publicTraits: [
        'Courteous to every opponent, before and after',
        'Fights like a wall that has decided to walk',
        'Never looks at anything out of the corner of his eye',
      ],
      hiddenDrives: [
        'He wants one honest bout before his sight goes, to know whether any of the five wins were his',
        'He wants the deed to his family house back from the Golden House more than he wants the Hearth',
      ],
      values: ['The count of three, which he has never broken', 'Saying an opponent’s name properly'],
      fears: ['Going blind in front of thirty thousand people', 'Finding out he never actually won anything'],
      socialStyle:
        'Formal, clipped, a soldier’s manners. Uses surnames. Stands square to whoever he is speaking to, because turning his head would show how little he can see at the edges.',
      boundaries: [
        'Will not kill in the ring, and will stop a bout himself if he thinks he might',
        'Will not pray to Fortune, though he fights under her mark. He says so to her priests',
      ],
      goals: [
        'Win the sixth Hearth, because the Golden House holds the paper on Stenn House and will call it in if he loses',
        'Hide his eyes until the Games are over',
      ],
      secrets: [
        {
          id: 'duke_eyes',
          fact: 'A grey fog has been closing in from the edges of his sight for two years. He can see what is straight in front of him and very little else. Fortune’s luck has covered for it in every bout.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you at dawn in his own courtyard if you have shown him something true first, or you hear it if you listen to the one prayer he says each night, to nobody in particular.',
        },
        {
          id: 'duke_deed',
          fact: 'The Golden House holds the deed to Stenn House against his family’s debts, at interest, and Mother Sabine Orlo will call it in the day he loses.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it flatly, like a fact about the weather, to anyone who asks why he fights for a god he does not believe in.',
        },
      ],
      speechStyle:
        'Short declaratives. Surnames, titles, numbers. No jokes, except one very dry one a day, delivered without changing his face.',
      topics: ['the count of three', 'Stenn House', 'the five wins', 'Reed', 'Fortune', 'his eyes', 'the axe'],
      voiceSamples: [
        'Reed. Yield. There is no disgrace in it, and I would rather not hurt you.',
        'I have won this five times. I remember perhaps two of those bouts honestly.',
        'Three. That is the count. I have never once gone past it, and I will not start today.',
        'Whoever whispers to her from the stands is wasting breath on a soldier who cannot hear it.',
        'Give me one fair bout before my sight goes entirely. That is all I would ask of any god, if I asked them anything.',
      ],
      appearance:
        'An adult man, very tall and heavily built, close-cropped iron-grey hair and a short grey beard, pale grey eyes that stay fixed straight ahead, a dented steel breastplate over a dark red quilted coat, a long-hafted double-bitted axe, and a gold mark on the back of his right hand.',
      visualHook: 'A great double-bitted axe held perfectly still at the top of its swing.',
      silhouette: 'Square to the viewer, axe raised high in both hands, not moving.',
      artSeed: 'omad-duke-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grim', 'weary', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'stenn_house', activity: 'sleeping with every lamp in the room lit' },
        { startMinute: 360, endMinute: 480, locationId: 'stenn_house', activity: 'training alone in the courtyard at first light, slowly, by feel' },
        { startMinute: 480, endMinute: 660, locationId: 'golden_house', activity: 'taking the temple’s blessing, which he does not believe in' },
        { startMinute: 660, endMinute: 1020, locationId: 'the_bowl', activity: 'on the sand, or standing very still in the champions’ tunnel' },
        { startMinute: 1020, endMinute: 1200, locationId: 'champions_cells', activity: 'having his hands unstrapped, alone, with the door shut' },
        { startMinute: 1200, endMinute: 1440, locationId: 'stenn_house', activity: 'at home in one of the two rooms without dust sheets' },
      ],
      homeLocationId: 'stenn_house',
      knowledgeScope: ['the_hearth_games', 'stenn_house', 'the_golden_house', 'the_iron_duke', 'merrowgate'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'duke_tells_you_his_eyes',
          label: 'He tells you about his eyes',
          kind: 'TRUST',
          requires: { trust: 40, respect: 50 },
        },
        {
          id: 'duke_asks_for_a_fair_bout',
          label: 'He asks Fortune to keep her luck out of the final',
          kind: 'ALLIANCE',
          requires: { respect: 60, flagsSet: ['deed_freed'] },
        },
      ],
      attributes: { might: 18, agility: 11, mind: 12, presence: 15, resolve: 17, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 17, damage: 12, tags: ['champion', 'veteran'] },
    },
    {
      id: 'ash',
      name: 'Brother Ash',
      calledName: 'Ash',
      role: 'Arbiter of the Hearth Games. A monk who prays to no god, and the only mortal in the arena who can see the Gallery',
      cardBlurb:
        'He judges every bout and calls every foul he sees, and he is the only mortal in Merrowgate who can look straight up at the back row and see you sitting there.',
      pronouns: 'he/him',
      publicTraits: [
        'Never in a hurry, even when the crowd is',
        'Sweeps the Hearth himself every morning',
        'Has never called a foul he could not see',
      ],
      hiddenDrives: [
        'He wants one god from the back row to get a fair fight before the sixth year ends the Games forever',
        'He wants to know whether going out is an ending, and he is the only evidence he has',
      ],
      values: ['A rule applied the same to the gold rail and the back row', 'Saying exactly what he saw, and no more'],
      fears: ['That the Games end on his watch, with his hand on the bell', 'Remembering more than he already does'],
      socialStyle:
        'Answers a question with a rule, and a rule with a question. Looks at gods the way a gardener looks at weather: interested, unimpressed, polite.',
      boundaries: [
        'Will not call a foul he did not see, and will not ignore one he did, whoever asks',
        'Will not pray to any god, including you, whatever you do for him',
      ],
      goals: ['Judge the Games honestly to the last bell', 'Keep his signature on Tamsin’s entry from costing her the Games'],
      secrets: [
        {
          id: 'ash_was_a_god',
          fact: 'Forty years ago he was a small god of this city, the god of kept promises, with one follower, a ferryman. The ferryman drowned. Ash went out, and woke up a grown man in the ash of his own burned shrine behind the Temple of All Gods, with no name. That is why he can see the Gallery.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He takes you to the Cinder Yard behind the Temple of All Gods if you ask him what happens to a god who goes out, and you have not spent a miracle to make him answer.',
        },
        {
          id: 'ash_signed',
          fact: 'Your name is not on the Register of Shrines. Tamsin could enter only because Ash signed her entry paper himself, vouching that your shrine is lit. It breaks the rules he enforces, and Mother Sabine Orlo is looking for exactly that signature.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He owns it at the hearing if he trusts you, or tells you alone in the chapel if you ask him straight who vouched for you.',
        },
      ],
      speechStyle:
        'Patient and dry. Numbers his rules, then asks you what the rule is for. Short words. Talks to gods exactly as he talks to dockers.',
      topics: ['the rules', 'fouls', 'the Hearth', 'the Register', 'going out', 'the Unsworn', 'the back row'],
      voiceSamples: [
        'Rule four: no god touches another god’s champion. There is no rule five. Ask yourself why the rule-makers stopped there.',
        'Yes, I can see you. Back row, by the pillar. Sit up straight; the others will talk.',
        'I don’t pray. I sweep. The Hearth needs sweeping more than it needs praying, most mornings.',
        'Gold, under the boot, at the second exchange. Faint as breath. I saw it. I cannot prove it. Those are different sentences.',
        'Every god up there thinks going out is the last page. I have reasons to doubt it.',
      ],
      appearance:
        'An older man, lean and slightly stooped, shaved head, a short white beard, deep-set dark eyes, a plain undyed monk’s robe with the sleeves tied back, a bronze hand-bell on a cord at his belt, and a broom over one shoulder.',
      visualHook: 'A bronze hand-bell at his belt, the bell that starts and ends every bout.',
      silhouette: 'Standing at the edge of the sand with one hand raised, looking up at an empty sky as if it were full.',
      artSeed: 'omad-ash-01',
      portrait: null,
      expressions: ['neutral', 'patient', 'wry', 'sorrowful'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'arbiter_chapel', activity: 'on the cot in the Unsworn Chapel, sleeping like a stone' },
        { startMinute: 360, endMinute: 660, locationId: 'hearth_temple', activity: 'sweeping the Hearth and reading the Register' },
        { startMinute: 660, endMinute: 1020, locationId: 'the_bowl', activity: 'on the sand with the bell, watching the sky as much as the bout' },
        { startMinute: 1020, endMinute: 1260, locationId: 'arbiter_chapel', activity: 'writing up every bout by hand in the ledger' },
        { startMinute: 1260, endMinute: 1440, locationId: 'hearth_temple', activity: 'sitting by the Hearth, not praying' },
      ],
      homeLocationId: 'arbiter_chapel',
      knowledgeScope: ['the_hearth_games', 'the_gallery_pact', 'the_register', 'the_hearth', 'the_unsworn', 'the_cinder_yard'],
      startingRelationship: { trust: 15, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ash_owns_the_signature',
          label: 'He tells you he signed for your shrine',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'ash_shows_the_yard',
          label: 'He takes you behind the Hearth',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:ash_sees_gods'] },
        },
      ],
      attributes: { might: 9, agility: 10, mind: 16, presence: 13, resolve: 18, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 3, tags: ['monk'] },
    },
    {
      id: 'wick',
      name: 'Wick',
      role: 'God of candle-ends, the last inch of every candle in the city. Your neighbour in the back row, down to one follower like you',
      cardBlurb:
        'She has sat beside you in the back row for longer than you can remember, she is down to one follower and fading, and she has agreed to let Lady Fortune take her in on the last night unless somebody gives her a reason not to.',
      pronouns: 'she/her',
      publicTraits: [
        'Talks without stopping, and notices everything she talks over',
        'Smells of warm wax and burnt sugar',
        'Calls everyone love, gods included',
      ],
      hiddenDrives: [
        'She does not want to go out, and she does not want to become a corner of somebody else either, and she cannot see a third door',
        'She is fond of you, and has been reporting your miracles to Fortune, and the two have stopped fitting together',
      ],
      values: ['Somebody being up late with you', 'Gossip, told kindly'],
      fears: ['The dark after the last inch', 'Being remembered as Fortune’s Candle rather than as herself'],
      socialStyle:
        'Chatters, fusses, offers food she cannot eat, pats your hand. Goes completely silent when she is ashamed, which is the only time she is ever silent.',
      boundaries: [
        'Will not lie to you twice. She has done it once, and it nearly finished her',
        'Will not take another god’s follower, even to save herself, and will think less of you if you take hers',
      ],
      goals: ['Get through the Games without going out', 'Decide by the last night whether to say yes to Fortune'],
      secrets: [
        {
          id: 'wick_spy',
          fact: 'Fortune’s offer came with a price: tell her what you spend your miracle on each day. Wick has told her twice.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She confesses if you tell her something you have not told anyone else, and then wait.',
        },
        {
          id: 'wick_one_left',
          fact: 'Her baker Benno died in the winter. Her last follower is Hettie at the night bakery, who is old and tired and prays to Wick mostly out of habit.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it slip at the night bakery, watching Hettie pull the trays at three in the morning.',
        },
      ],
      speechStyle:
        'Run-on, warm, gossiping. Calls everyone "love". Changes subject in the middle of a sentence. Food and wax and the small hours in every other line.',
      topics: ['the back row', 'Fortune', 'her baker', 'the old days', 'candles', 'gossip from the Gallery'],
      voiceSamples: [
        'Budge up, budge up, you’re on my cushion. Oh, keep it, I’ve hardly the shape left to sit on it anyway.',
        'Two of mine left, love. Well. One. Benno went in the winter and I haven’t had the heart to stop counting him.',
        'Candle-ends, that’s me. The last inch. The bit where the baker’s still up and the lamplighter’s nearly home and somebody says thank goodness, nearly done.',
        'Her Ladyship asked after you. Very sweetly. Asked what you spent your miracle on, and I said I hadn’t noticed, which was a fib, and I’m ever so bad at those.',
        'Don’t look at me like that. A god has to go somewhere when the wax runs out, and her pocket’s warmer than a gutter.',
      ],
      appearance:
        'An older woman, small and round, a soft lined face, bright black eyes, white hair in a bun stuck through with three burnt-down candle stubs, a long wax-spattered apron over a faded blue dress, and fingertips that glow faintly like embers.',
      visualHook: 'Three burnt-down candle stubs stuck through her white bun, one of them still lit.',
      silhouette: 'Small and round, perched on the edge of a stone bench, leaning in to whisper.',
      artSeed: 'omad-wick-01',
      portrait: null,
      expressions: ['warm', 'nervous', 'delighted', 'afraid'],
      schedule: [
        { startMinute: 0, endMinute: 660, locationId: 'night_bakery', activity: 'by the ovens at the night bakery, keeping Hettie company' },
        { startMinute: 660, endMinute: 1080, locationId: 'the_bowl', activity: 'in the back row of the Gallery next to your seat, gossiping' },
        { startMinute: 1080, endMinute: 1440, locationId: 'night_bakery', activity: 'at the night bakery, watching the first batch go in' },
      ],
      homeLocationId: 'night_bakery',
      knowledgeScope: ['the_gallery', 'the_back_row', 'fortune', 'the_night_bakery', 'candles', 'gallery_gossip'],
      startingRelationship: { trust: 45, affection: 50, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'wick_confesses',
          label: 'She tells you what Fortune asked her to do',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'wick_asks_you',
          label: 'She asks you what she should do on the last night',
          kind: 'ALLIANCE',
          requires: { trust: 60, affection: 60, flagsSet: ['fortune_feast'] },
        },
      ],
      attributes: { might: 6, agility: 8, mind: 14, presence: 13, resolve: 9, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 10, damage: 1, tags: ['god'] },
    },
    {
      id: 'sabine',
      name: 'Mother Sabine Orlo',
      calledName: 'Sabine',
      role: 'High Priestess of the Golden House, Lady Fortune’s temple. Keeps its books, holds its debts, and has challenged your right to be in the Games',
      cardBlurb:
        'She runs Fortune’s temple like a counting house, holds the paper on half the Lower Wards, and has filed a challenge to strike you and your only follower out of the Games before the third day.',
      pronouns: 'she/her',
      publicTraits: ['Impeccably courteous', 'Has a figure for everything', 'Has never once been seen to pray'],
      hiddenDrives: [
        'She does not trust luck to win a sixth year, so she is arranging certainty with paper, money and hired hands',
        'She has never seen a god and has quietly stopped believing in them, which makes her the only person in the temple who is not afraid',
      ],
      values: ['A ledger that balances', 'Results over sentiment'],
      fears: [
        'The temple’s debts coming due in a year without the Hearth',
        'Finding out that she was wrong, and something was watching her all along',
      ],
      socialStyle:
        'Pours tea, smiles, names a figure. Treats every conversation as a negotiation and every person as a line in a book.',
      boundaries: [
        'Will not have anyone killed. Her line is drawn in ink: injured, robbed, ruined, never killed',
        'Will not lie in a sworn hearing. She misleads with the truth instead',
      ],
      goals: ['Get Tamsin struck out at the Register hearing', 'Keep the Duke fighting by keeping the deed to Stenn House'],
      secrets: [
        {
          id: 'sabine_doubts',
          fact: 'She does not believe the gods exist. She has run Fortune’s temple for thirty years as a business, and none of what she does is on Fortune’s orders.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it, coolly, to anyone who walks down in a body and tries to impress her as a god, right up until something happens that she cannot explain.',
        },
        {
          id: 'sabine_lamp',
          fact: 'She has paid two dockhands to lever your lamp out of its niche on the first night, so that at the hearing your shrine is dark.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The dockhands talk at the Twelve Bells, or you catch them in Tanner’s Row if you are there in the small hours.',
        },
      ],
      speechStyle:
        'Measured, polite, commercial. Percentages and terms. Clicks her abacus while others talk and answers with the total, and never thanks anybody without a figure attached.',
      topics: ['the hearing', 'the Register', 'the deed', 'money', 'the Golden House', 'the Lower Wards'],
      voiceSamples: [
        'Let us be practical. A shrine with no lamp is not a shrine, and a champion with no shrine is a trespasser on consecrated sand.',
        'The temple holds the paper on Stenn House at nine per cent. His Grace is welcome to read the terms. He has never asked to.',
        'Thirty years in Her Ladyship’s service, twenty-six balancing her books. Whether she exists is above my pay.',
        'Name a price. Everybody in this city has one, and gods are no exception; they simply invoice in prayers.',
      ],
      appearance:
        'An adult woman, upright and slender, light olive skin, silver-streaked dark hair in a severe braided crown, sharp hazel eyes behind small gold spectacles, a high-necked gold-and-cream priestess’s robe, a small gold abacus at her belt, and ink on her fingers.',
      visualHook: 'A small gold abacus at her belt that she clicks while other people talk.',
      silhouette: 'Upright behind a desk, hands folded on a ledger, head slightly tilted.',
      artSeed: 'omad-sabine-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'cold', 'calculating', 'rattled'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'golden_house', activity: 'in her rooms above the counting room' },
        { startMinute: 420, endMinute: 660, locationId: 'golden_house', activity: 'in the counting room with the ledgers' },
        { startMinute: 660, endMinute: 1080, locationId: 'hearth_temple', activity: 'at the Register clerks’ desk with a stack of filings' },
        { startMinute: 1080, endMinute: 1260, locationId: 'golden_house', activity: 'dining with debtors, which they do not enjoy' },
        { startMinute: 1260, endMinute: 1440, locationId: 'golden_house', activity: 'balancing the day’s offerings by lamplight' },
      ],
      homeLocationId: 'golden_house',
      knowledgeScope: ['the_golden_house', 'the_register', 'stenn_house', 'the_lower_wards', 'debts'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'sabine_names_a_price',
          label: 'She names a price',
          kind: 'OTHER',
          requires: { respect: 35 },
        },
        {
          id: 'sabine_shaken',
          label: 'She admits she may have been wrong about the gods',
          kind: 'OTHER',
          requires: { fear: 30, flagsSet: ['first_dusk'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 14, resolve: 15, arcana: 3 },
      companion: null,
      scouting: null,
      combatant: { health: 25, defenseDc: 11, damage: 2, tags: ['priest'] },
    },
  ],
  quests: [
    {
      id: 'q_count_of_three',
      title: 'The Count of Three',
      summary: 'The Iron Duke has knocked the sword out of your only follower’s hands and started the count. Answer her before he reaches three, then find out what the answer cost.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['tamsin', 'duke', 'ash', 'fortune', 'wick'],
      involvedLocationIds: ['the_bowl', 'champions_cells', 'the_lamp'],
      knownRewardCopy: 'The first night of the Games, and the right to walk down into the city in a body of your own.',
      steps: [
        {
          id: 'the_count',
          playerCopy: 'Answer Tamsin before the Duke reaches three.',
          directorNotes:
            'Every route here is a real answer and none of them is wrong. A miracle on her or her sword is legal and shows gold to Brother Ash, who nods. A miracle on the Duke or his axe is a foul: whether Ash sees the gold is the roll, and if he does, Tamsin is struck out on the spot. Telling her to yield keeps the miracle and drops her into the Low Ring tomorrow. Saying nothing is also an answer, and she hears it as one. Whatever happens, the Duke stops at three; he always has.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'put_it_back',
              label: 'Spend your miracle on her',
              predicate: { flagsSet: ['used:work_a_miracle'] },
              setsFlags: ['she_felt_you', 'won_first_bout'],
              closesFlags: ['into_the_low_ring'],
            },
            {
              routeId: 'brought_it_back',
              label: 'Bring her sword back to her hand',
              predicate: { flagsSet: ['used:bring_it_back'] },
              setsFlags: ['she_felt_you', 'won_first_bout'],
              closesFlags: ['into_the_low_ring'],
            },
            {
              routeId: 'eased_it',
              label: 'Close her cut and steady her legs',
              predicate: { flagsSet: ['used:ease_the_hurt'] },
              setsFlags: ['she_felt_you', 'won_first_bout'],
              closesFlags: ['into_the_low_ring'],
            },
            {
              routeId: 'turned_the_sky',
              label: 'Put the wind at her back',
              predicate: { flagsSet: ['used:turn_the_sky'] },
              setsFlags: ['she_felt_you', 'won_first_bout'],
              closesFlags: ['into_the_low_ring'],
            },
            {
              routeId: 'opened_the_way',
              label: 'Show her the one way past his guard',
              predicate: { flagsSet: ['used:open_the_way'] },
              setsFlags: ['she_felt_you', 'won_first_bout'],
              closesFlags: ['into_the_low_ring'],
            },
            {
              routeId: 'burned_for_her',
              label: 'Burn part of yourself for her',
              predicate: { flagsSet: ['used:burn_bright'] },
              setsFlags: ['she_felt_you', 'won_first_bout', 'burned_once'],
              closesFlags: ['into_the_low_ring'],
            },
            {
              routeId: 'told_her_to_yield',
              label: 'Tell her to yield and keep the miracle',
              predicate: { flagsSet: ['used:speak_to_her'] },
              setsFlags: ['into_the_low_ring', 'kept_the_miracle'],
              closesFlags: ['won_first_bout'],
            },
            {
              routeId: 'fouled_the_duke',
              label: 'Break the Pact on the Duke’s axe',
              predicate: { flagsSet: ['used:bend_the_pact'] },
              setsFlags: ['won_first_bout', 'foul_on_day_one'],
              closesFlags: ['into_the_low_ring'],
            },
            {
              routeId: 'held_back',
              label: 'Say nothing and let her fight it out',
              predicate: { flagsSet: ['used:hold_back'] },
              setsFlags: ['into_the_low_ring', 'she_lost_alone'],
              closesFlags: ['won_first_bout'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_bout_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_gallery', amount: 3 }],
          },
        },
        {
          id: 'after_the_bout',
          playerCopy: 'Find out what your answer cost: from her, from the gold rail, from the Arbiter, or from your neighbour in the back row.',
          directorNotes:
            'Everyone has an opinion and each one opens a different thread. Tamsin, in the cells, wants to know why now and not in eleven years. Fortune leans down the row and calls the player darling for the first time. Brother Ash, packing up the bell, looks straight up at the back row and tells the player to sit up straight, which no mortal has ever done. Wick wants every detail and pays for it with gossip. Going home to the lamp is also fine; it is quiet there, and the lamp is warmer than it was this morning.',
          enterWhen: { flagsSet: ['first_bout_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_tamsin',
              label: 'Go down to the cells and talk to Tamsin',
              predicate: { flagsSet: ['spoke:tamsin'] },
              setsFlags: ['tamsin_talking'],
              closesFlags: [],
            },
            {
              routeId: 'with_fortune',
              label: 'Let Lady Fortune buy you a drink at the rail',
              predicate: { flagsSet: ['spoke:fortune'] },
              setsFlags: ['fortune_has_your_ear'],
              closesFlags: [],
            },
            {
              routeId: 'with_ash',
              label: 'Ask the Arbiter how he can see you',
              predicate: { flagsSet: ['spoke:ash'] },
              setsFlags: ['knows:ash_sees_gods'],
              closesFlags: [],
            },
            {
              routeId: 'with_wick',
              label: 'Gossip with Wick in the back row',
              predicate: { flagsSet: ['spoke:wick'] },
              setsFlags: ['wick_confided'],
              closesFlags: [],
            },
            {
              routeId: 'at_the_lamp',
              label: 'Go home to your lamp and sit with it',
              predicate: { flagsSet: ['visited:the_lamp'] },
              setsFlags: ['sat_by_the_lamp'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['day_one_done', 'knows:how_believers_come'],
            abilities: ['walk_down', 'scuffle', 'make_a_believer', 'show_the_luck'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_one_miracle',
      title: 'More Believers',
      summary: 'One follower is one miracle a day. Somebody else in Merrowgate has to start praying to you, by name, at your lamp, and mean it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['tamsin', 'wick'],
      involvedLocationIds: ['tanners_row', 'the_lamp', 'night_bakery', 'twelve_bells', 'the_harbour', 'festival_streets'],
      knownRewardCopy: 'Two miracles a day, then five, and enough of yourself to be seen in daylight.',
      steps: [
        {
          id: 'a_second_prayer',
          playerCopy: 'Get one more person in Merrowgate to pray to you, by name, at your lamp.',
          directorNotes:
            'A believer comes from somebody seeing a miracle and then deciding, on their own, to say your name at your lamp. The player cannot make anyone believe; they can only be worth it. Hettie at the night bakery is the easiest, and she is Wick’s last follower, which Wick will find out about. A stranger in Tanner’s Row is slower and cleaner. The Twelve Bells is loud and public. Tamsin can tell the dock watch, but only if she believes it herself.',
          enterWhen: { flagsSet: ['day_one_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_wicks_baker',
              label: 'Win over the night baker who keeps Wick’s candle',
              predicate: { flagsSet: ['used:make_a_believer'], atLocation: 'night_bakery' },
              setsFlags: ['took_wicks_baker'],
              closesFlags: ['wick_stays_lit'],
            },
            {
              routeId: 'answered_a_stranger',
              label: 'Answer a stranger in Tanner’s Row',
              predicate: { flagsSet: ['used:make_a_believer'], atLocation: 'tanners_row' },
              setsFlags: ['answered_a_stranger'],
              closesFlags: [],
            },
            {
              routeId: 'the_bells_saw_it',
              label: 'Work a wonder in the Twelve Bells',
              predicate: { flagsSet: ['used:make_a_believer'], atLocation: 'twelve_bells' },
              setsFlags: ['the_bells_saw_it'],
              closesFlags: [],
            },
            {
              routeId: 'tamsin_told_the_dock',
              label: 'Let Tamsin tell the dock watch about you',
              predicate: {
                flagsSet: ['tamsin_talking', 'visited:the_harbour'],
                minRelationship: [{ characterId: 'tamsin', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['tamsin_preached'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['two_a_day'],
            abilities: [],
            reputation: [{ factionId: 'faction_lower_wards', amount: 10 }],
          },
        },
        {
          id: 'a_congregation',
          playerCopy: 'Reach five people who pray to you.',
          directorNotes:
            'Five is a small shrine. It is also the number where other gods start to notice the back row moving, and where the player has enough of themselves to stand up in daylight. The gold line gains a name each time; write the names, they are the reward. Each route is a different neighbourhood deciding the player is theirs.',
          enterWhen: { flagsSet: ['two_a_day'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_row_prays',
              label: 'Become Tanner’s Row’s own god',
              predicate: {
                flagsSet: ['used:make_a_believer'],
                atLocation: 'tanners_row',
                minFactionReputation: [{ factionId: 'faction_lower_wards', value: 40 }],
              },
              setsFlags: ['the_row_prays'],
              closesFlags: [],
            },
            {
              routeId: 'the_festival_prays',
              label: 'Answer prayers in the middle of the festival',
              predicate: { flagsSet: ['used:make_a_believer', 'the_bells_saw_it'], atLocation: 'festival_streets' },
              setsFlags: ['the_festival_prays'],
              closesFlags: [],
            },
            {
              routeId: 'the_dock_prays',
              label: 'Do one thing on the quay that the dock watch saw coming',
              predicate: { flagsSet: ['tamsin_preached', 'used:work_a_miracle'], atLocation: 'the_harbour' },
              setsFlags: ['the_dock_prays'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['five_a_day'],
            abilities: ['show_yourself'],
            reputation: [{ factionId: 'faction_gallery', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_hearth_games',
      title: 'The Hearth Games',
      summary: 'Three days, sixteen champions, one fire. Keep Tamsin in the Games through the second day and the Register hearing on the second night, all the way to the Hearth Final at dusk on the third day.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['tamsin', 'duke', 'ash', 'fortune', 'sabine'],
      involvedLocationIds: ['the_bowl', 'champions_cells', 'hearth_temple'],
      knownRewardCopy: 'The Hearth: every prayer in Merrowgate, for a year.',
      steps: [
        {
          id: 'the_second_day',
          playerCopy: 'Get Tamsin through the second day: the Low Ring if she lost, her second bout if she won.',
          directorNotes:
            'If she yielded or lost, the Low Ring at eleven is eight first-round losers on the sand at once and one walks out. If she won, her second bout at three is against a docker she has worked beside for six years, who will not go easy and does not want to hurt her. The knee is the hidden clock: unless it has been mended or properly strapped, it folds twenty minutes into the bout.',
          enterWhen: { flagsSet: ['first_bout_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'came_up_from_below',
              label: 'Get her out of the Low Ring with a miracle',
              predicate: { flagsSet: ['into_the_low_ring', 'low_ring_bout', 'used:work_a_miracle'], atLocation: 'the_bowl' },
              setsFlags: ['came_up_from_below', 'through_the_second_day'],
              closesFlags: [],
            },
            {
              routeId: 'she_did_it_herself',
              label: 'Let her fight her own way out of the Low Ring',
              predicate: { flagsSet: ['into_the_low_ring', 'low_ring_bout', 'used:hold_back'], atLocation: 'the_bowl' },
              setsFlags: ['came_up_from_below', 'through_the_second_day', 'she_did_it_herself'],
              closesFlags: [],
            },
            {
              routeId: 'knee_held',
              label: 'Win the second bout on a mended knee',
              predicate: { flagsSet: ['second_day_bout', 'knee_mended'] },
              setsFlags: ['knee_held', 'through_the_second_day'],
              closesFlags: [],
            },
            {
              routeId: 'strap_held',
              label: 'Win the second bout on a strapped knee',
              predicate: { flagsSet: ['second_day_bout', 'knee_strapped'] },
              setsFlags: ['knee_held', 'through_the_second_day'],
              closesFlags: [],
            },
            {
              routeId: 'won_with_a_miracle',
              label: 'Spend the day’s miracle on the second bout',
              predicate: { flagsSet: ['second_day_bout', 'used:work_a_miracle'], flagsUnset: ['knee_gave_out'], atLocation: 'the_bowl' },
              setsFlags: ['through_the_second_day'],
              closesFlags: [],
            },
            {
              routeId: 'knee_gave_out',
              label: 'Her knee gives out on the sand',
              predicate: { flagsSet: ['knee_gave_out'] },
              setsFlags: ['tamsin_out_of_the_games'],
              closesFlags: ['through_the_second_day'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['second_day_over'], abilities: [], reputation: [] },
        },
        {
          id: 'the_hearing',
          playerCopy: 'Keep your name in the Games at the Register hearing tonight.',
          directorNotes:
            'Mother Sabine argues, correctly, that the player has no plate on the Register and so no shrine, and that a champion with no shrine is a trespasser. She will not lie under oath. Defences that work: the lamp itself, lit, carried into the Temple; Brother Ash owning his signature, which costs him; Fortune waiving the challenge as a favour, which costs the player; or five living followers, which is a shrine by any rule. Turning up with nothing loses.',
          enterWhen: { flagsSet: ['hearing_called'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_lamp_spoke',
              label: 'Carry your lamp, lit, into the Temple',
              predicate: { hasItems: ['reed_lamp'], atLocation: 'hearth_temple' },
              setsFlags: ['name_on_the_register', 'lamp_at_the_hearing'],
              closesFlags: ['struck_off'],
            },
            {
              routeId: 'ash_owned_it',
              label: 'Get Brother Ash to own his signature',
              predicate: {
                flagsSet: ['used:speak_plainly'],
                atLocation: 'hearth_temple',
                minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['name_on_the_register', 'ash_owned_it'],
              closesFlags: ['struck_off'],
            },
            {
              routeId: 'fortune_waived_it',
              label: 'Ask Lady Fortune to call off her priestess',
              predicate: { flagsSet: ['used:strike_a_bargain', 'fortune_asked'], atLocation: 'hearth_temple' },
              setsFlags: ['name_on_the_register', 'owes_fortune'],
              closesFlags: ['struck_off'],
            },
            {
              routeId: 'five_lamps',
              label: 'Bring five living followers to the hearing',
              predicate: { flagsSet: ['five_a_day'], atLocation: 'hearth_temple' },
              setsFlags: ['name_on_the_register', 'a_shrine_again'],
              closesFlags: ['struck_off'],
            },
            {
              routeId: 'struck_off',
              label: 'The hearing goes ahead without a defence',
              predicate: { flagsSet: ['hearing_called'], flagsUnset: ['name_on_the_register'], afterWorldMinute: 1440 + 21 * 60 + 30 },
              setsFlags: ['struck_off'],
              closesFlags: ['name_on_the_register'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['hearing_over'], abilities: [], reputation: [] },
        },
        {
          id: 'the_final',
          playerCopy: 'The Hearth Final, at dusk: Tamsin against the Iron Duke.',
          directorNotes:
            'The fight of the story. Fortune’s luck is on the Duke unless it has been exposed or he has asked her to keep it off. The player has as many miracles as they have followers. The cleanest win is one where no miracle is spent and the Duke fights fair. If Tamsin knows about his eyes she may refuse to beat a man who cannot see her, and that is her call, not the player’s. Write the count of three every time somebody goes down.',
          enterWhen: { flagsSet: ['final_bell'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_clean',
              label: 'Win it fair, with no miracle spent',
              predicate: {
                flagsSet: ['duke_fights_fair', 'used:hold_back', 'name_on_the_register', 'through_the_second_day'],
                atLocation: 'the_bowl',
              },
              setsFlags: ['hearth_won', 'won_clean'],
              closesFlags: ['hearth_lost'],
            },
            {
              routeId: 'would_not_finish_him',
              label: 'She will not beat a man who cannot see',
              predicate: {
                flagsSet: ['tamsin_knows_his_eyes', 'name_on_the_register', 'through_the_second_day'],
                atLocation: 'the_bowl',
                minRelationship: [{ characterId: 'tamsin', dimension: 'trust', value: 70 }],
              },
              setsFlags: ['would_not_finish_him', 'hearth_lost'],
              closesFlags: ['hearth_won'],
            },
            {
              routeId: 'won_the_hearth',
              label: 'Win the Hearth with a miracle',
              predicate: {
                flagsSet: ['name_on_the_register', 'through_the_second_day', 'used:work_a_miracle'],
                atLocation: 'the_bowl',
              },
              setsFlags: ['hearth_won'],
              closesFlags: ['hearth_lost'],
            },
            {
              routeId: 'lost_the_final',
              label: 'The Duke wins a sixth time',
              predicate: { flagsSet: ['final_bell'], afterWorldMinute: 2880 + 20 * 60 + 30 },
              setsFlags: ['hearth_lost'],
              closesFlags: ['hearth_won'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['games_over'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_last_of_the_reeds',
      title: 'The Last of the Reeds',
      summary: 'Tamsin has prayed to you for eleven years and never once asked for anything. Now she has, and she is hiding something under the strap on her right knee.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['first_bout_over'] },
      involvedCharacterIds: ['tamsin'],
      involvedLocationIds: ['champions_cells', 'tanners_row', 'the_lamp'],
      knownRewardCopy: 'What she believes, now that you have answered.',
      steps: [
        {
          id: 'the_knee',
          playerCopy: 'Find out what Tamsin is hiding under that strap.',
          directorNotes:
            'She will not volunteer it. She tells a god she trusts, or a god who listens to what she prays about when she thinks it is not listening. Taking the strap off her bench is a way to find out and a way to make her furious.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Ask her, and wait',
              predicate: {
                flagsSet: ['spoke:tamsin'],
                minRelationship: [{ characterId: 'tamsin', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_knee'],
              closesFlags: [],
            },
            {
              routeId: 'you_listened',
              label: 'Listen to what she prays for in the cells',
              predicate: { flagsSet: ['used:listen'], atLocation: 'champions_cells' },
              setsFlags: ['knows:the_knee'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_strap',
              label: 'Take the strap off her bench',
              predicate: { hasItems: ['knee_strap'] },
              setsFlags: ['knows:the_knee', 'took_her_strap'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 30,
            items: [],
            flags: ['knee_known'],
            abilities: [],
            reputation: [{ factionId: 'faction_lower_wards', amount: 5 }],
          },
        },
        {
          id: 'mend_it',
          playerCopy: 'Do something about the knee before her second bout, or decide not to.',
          directorNotes:
            'A real mend is a miracle. A proper strapping is a conversation: the player talks her through it in the cells, and it holds for one bout. Leaving it is a choice too, and it is hers to resent.',
          enterWhen: { flagsSet: ['knee_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'mended',
              label: 'Mend it properly',
              predicate: { flagsSet: ['used:ease_the_hurt'], atLocation: 'tanners_row' },
              setsFlags: ['knee_mended'],
              closesFlags: [],
            },
            {
              routeId: 'burned_to_mend',
              label: 'Burn part of yourself to mend it',
              predicate: { flagsSet: ['used:burn_bright'], atLocation: 'tanners_row' },
              setsFlags: ['knee_mended', 'burned_for_the_knee'],
              closesFlags: [],
            },
            {
              routeId: 'strapped',
              label: 'Talk her through strapping it properly',
              predicate: { flagsSet: ['used:speak_to_her'], atLocation: 'champions_cells', afterWorldMinute: 1440 },
              setsFlags: ['knee_strapped'],
              closesFlags: [],
            },
            {
              routeId: 'left_it',
              label: 'Leave it, and trust her',
              predicate: { flagsSet: ['used:hold_back'], atLocation: 'champions_cells', afterWorldMinute: 1440 },
              setsFlags: ['knee_left_alone'],
              closesFlags: ['knee_mended'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knee_dealt_with'], abilities: [], reputation: [] },
        },
        {
          id: 'what_she_believes',
          playerCopy: 'Meet her at the lamp after dusk, and find out what she believes now that you have answered.',
          directorNotes:
            'The relationship payoff. If the player walks down and is at the lamp when she comes to light it, she sees a face for the first time in eleven years and has to decide whether to believe it. If they never answered her at all, and the lamp is gone, she may simply stop. That is the worst thing in this story and it should land quietly.',
          enterWhen: { flagsSet: ['first_dusk'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'saw_your_face',
              label: 'Be there in a body when she comes to light the lamp',
              predicate: {
                flagsSet: ['used:walk_down'],
                atLocation: 'the_lamp',
                minRelationship: [{ characterId: 'tamsin', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['she_saw_your_face', 'tamsin_believes'],
              closesFlags: [],
            },
            {
              routeId: 'heard_you',
              label: 'Answer her prayer out loud, and keep answering',
              predicate: {
                flagsSet: ['she_felt_you', 'used:speak_to_her'],
                atLocation: 'the_lamp',
                minRelationship: [{ characterId: 'tamsin', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['tamsin_believes'],
              closesFlags: [],
            },
            {
              routeId: 'last_prayer_unsaid',
              label: 'She stops praying',
              predicate: { flagsSet: ['she_lost_alone', 'lamp_stolen'], flagsUnset: ['tamsin_believes', 'lamp_recovered'] },
              setsFlags: ['last_prayer_unsaid'],
              closesFlags: ['tamsin_believes'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['reeds_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_iron_duke',
      title: 'The Iron Duke',
      summary: 'Five wins for a goddess he does not believe in, and he never once turns his head. Find out what the Iron Duke is fighting for, and what he cannot see.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['first_bout_over'] },
      involvedCharacterIds: ['duke', 'sabine', 'fortune', 'tamsin'],
      involvedLocationIds: ['stenn_house', 'golden_house'],
      knownRewardCopy: 'A fair final, if he gets to ask for one.',
      steps: [
        {
          id: 'what_he_cannot_see',
          playerCopy: 'Find out why the Iron Duke never turns his head.',
          directorNotes:
            'He hides it well and has for two years. At dawn in his courtyard he trains by the white lines on the flagstones, slowly, and anybody standing there can see what they are for.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Earn it, and ask',
              predicate: {
                flagsSet: ['spoke:duke'],
                minRelationship: [{ characterId: 'duke', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:the_dukes_eyes'],
              closesFlags: [],
            },
            {
              routeId: 'heard_his_prayer',
              label: 'Listen to the one prayer he says, to nobody',
              predicate: { flagsSet: ['used:listen'], atLocation: 'stenn_house' },
              setsFlags: ['knows:the_dukes_eyes'],
              closesFlags: [],
            },
            {
              routeId: 'saw_the_lines',
              label: 'Walk down into his courtyard at dawn',
              predicate: { flagsSet: ['used:walk_down'], atLocation: 'stenn_house' },
              setsFlags: ['knows:the_dukes_eyes', 'saw_the_white_lines'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['duke_known'], abilities: [], reputation: [] },
        },
        {
          id: 'the_deed',
          playerCopy: 'Decide what to do about the deed to Stenn House, and about his eyes.',
          directorNotes:
            'Free the deed and he can afford to ask Fortune to keep her luck out of the final. Steal it, buy it, or talk Fortune into a kindness. Telling Tamsin about his eyes is a different move entirely: it changes what she is willing to do to him on the sand.',
          enterWhen: { flagsSet: ['duke_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stole_the_deed',
              label: 'Take the deed out of the strongroom',
              predicate: { hasItems: ['stenn_deed'] },
              setsFlags: ['deed_freed', 'duke_fights_fair', 'stole_the_deed'],
              closesFlags: [],
            },
            {
              routeId: 'bought_it',
              label: 'Strike a bargain with Mother Sabine',
              predicate: {
                flagsSet: ['used:strike_a_bargain'],
                atLocation: 'golden_house',
                minRelationship: [{ characterId: 'sabine', dimension: 'respect', value: 35 }],
              },
              setsFlags: ['deed_freed', 'duke_fights_fair', 'owes_sabine'],
              closesFlags: [],
            },
            {
              routeId: 'fortune_did_a_kindness',
              label: 'Talk Lady Fortune into tearing it up',
              predicate: {
                flagsSet: ['used:speak_plainly', 'fortune_has_your_ear'],
                minRelationship: [{ characterId: 'fortune', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['deed_freed', 'duke_fights_fair', 'fortune_did_a_kindness'],
              closesFlags: [],
            },
            {
              routeId: 'told_tamsin',
              label: 'Tell Tamsin what is wrong with his eyes',
              predicate: { flagsSet: ['knows:the_dukes_eyes', 'spoke:tamsin'], atLocation: 'the_lamp', afterWorldMinute: 1440 + 19 * 60 },
              setsFlags: ['tamsin_knows_his_eyes'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['deed_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_back_row',
      title: 'The Back Row',
      summary: 'Lady Fortune has a gold coin for you: flip it, say yes, and never go out. Wick, your neighbour in the back row, has already said yes, for the last night of the Games.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['fortune_asked'] },
      involvedCharacterIds: ['fortune', 'wick'],
      involvedLocationIds: ['the_lamp', 'the_bowl', 'night_bakery', 'twelve_bells'],
      knownRewardCopy: 'Whether the back row ends the Games with one god fewer.',
      steps: [
        {
          id: 'fortunes_coin',
          playerCopy: 'Answer Lady Fortune’s offer.',
          directorNotes:
            'Fortune means it kindly, by her lights: the player would never go out, never sit in the draught again, and never be themselves again either. She takes no as gracefully as she takes everything. A counter-offer only works if the player knows something she would rather the Arbiter did not.',
          enterWhen: { flagsSet: ['fortune_asked'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'counter_offer',
              label: 'Make her a counter-offer she has to take',
              predicate: {
                flagsSet: ['used:strike_a_bargain', 'knows:luck_is_moved'],
                minRelationship: [{ characterId: 'fortune', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['fortune_bargained'],
              closesFlags: ['taken_in_by_fortune'],
            },
            {
              routeId: 'said_yes',
              label: 'Flip her coin and say yes',
              predicate: { flagsSet: ['used:strike_a_bargain'], hasItems: ['fortune_coin'] },
              setsFlags: ['taken_in_by_fortune'],
              closesFlags: ['refused_fortune'],
            },
            {
              routeId: 'said_no',
              label: 'Tell her no, to her face',
              predicate: { flagsSet: ['spoke:fortune', 'used:speak_plainly'] },
              setsFlags: ['refused_fortune'],
              closesFlags: ['taken_in_by_fortune'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['fortune_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'wicks_last_night',
          playerCopy: 'Decide what happens to Wick before Fortune takes her in.',
          directorNotes:
            'Wick is not asking to be saved and would be embarrassed by it. What she needs is a third door. Telling Hettie who her candle is for is one. Sharing a shrine with the player, once the player has enough followers to spare, is another. Doing nothing means Fortune has eighteen.',
          enterWhen: { flagsSet: ['fortune_feast'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_hettie',
              label: 'Tell the night baker who her candle is for',
              predicate: { flagsSet: ['wick_confided', 'used:speak_plainly'], flagsUnset: ['took_wicks_baker'], atLocation: 'night_bakery' },
              setsFlags: ['wick_stays_lit'],
              closesFlags: ['wick_taken_in'],
            },
            {
              routeId: 'shared_a_shrine',
              label: 'Offer her a place in your niche',
              predicate: { flagsSet: ['wick_confided', 'five_a_day', 'used:strike_a_bargain'], atLocation: 'the_lamp' },
              setsFlags: ['wick_stays_lit', 'shared_a_shrine'],
              closesFlags: ['wick_taken_in'],
            },
            {
              routeId: 'wick_taken_in',
              label: 'Fortune takes her in',
              predicate: { flagsSet: ['fortune_feast'], flagsUnset: ['wick_stays_lit'], afterWorldMinute: 2880 + 19 * 60 },
              setsFlags: ['wick_taken_in'],
              closesFlags: ['wick_stays_lit'],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['wick_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_lamp',
      title: 'The Lamp in the Wall',
      summary: 'Mother Sabine has challenged your right to a shrine. A shrine with no lamp is not a shrine, and somebody has been asking which wall in Tanner’s Row yours is in.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['registry_challenge'] },
      involvedCharacterIds: ['sabine', 'tamsin'],
      involvedLocationIds: ['the_lamp', 'tanners_row', 'golden_house'],
      knownRewardCopy: 'A lit lamp to carry into the hearing.',
      steps: [
        {
          id: 'guard_the_lamp',
          playerCopy: 'Keep your lamp in its wall through the first night.',
          directorNotes:
            'Two dockhands with a crowbar come at a quarter past two. They are paid, bored and not brave. A god in a body standing under the lamp is enough to send them off; a god who hits one of them gets talked about in the Gallery by breakfast.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_guard',
              label: 'Walk down and stand under it all night',
              predicate: { flagsSet: ['used:walk_down', 'first_dusk'], atLocation: 'the_lamp' },
              setsFlags: ['lamp_guarded'],
              closesFlags: [],
            },
            {
              routeId: 'ran_them_off',
              label: 'Run the dockhands off with your fists',
              predicate: { flagsSet: ['used:scuffle'], atLocation: 'the_lamp' },
              setsFlags: ['lamp_guarded', 'brawled_at_the_lamp'],
              closesFlags: [],
            },
            {
              routeId: 'carried_it',
              label: 'Take the lamp out of the wall and keep it lit yourself',
              predicate: { hasItems: ['reed_lamp'] },
              setsFlags: ['lamp_guarded', 'lamp_in_your_keeping'],
              closesFlags: [],
            },
            {
              routeId: 'stolen',
              label: 'The lamp is gone by morning',
              predicate: { flagsSet: ['lamp_stolen'] },
              setsFlags: ['lamp_lost'],
              closesFlags: ['lamp_guarded'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['first_night_over'], abilities: [], reputation: [] },
        },
        {
          id: 'get_it_back',
          playerCopy: 'Find your lamp before the hearing.',
          directorNotes:
            'The dockhands sold it to a Golden House clerk for a silver each. It sits on a shelf in the strongroom with a tag on it. Tamsin, meanwhile, has nailed a jam jar with a candle in it into the empty niche, which is not nothing.',
          enterWhen: { flagsSet: ['lamp_stolen'] },
          hiddenUntilEntered: true,
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_it_back',
              label: 'Take it back from the strongroom',
              predicate: { hasItems: ['reed_lamp'], atLocation: 'golden_house' },
              setsFlags: ['lamp_recovered'],
              closesFlags: [],
            },
            {
              routeId: 'found_it',
              label: 'Feel where it went, the way you feel every lost thing',
              predicate: { flagsSet: ['used:bring_it_back', 'lamp_stolen'] },
              setsFlags: ['lamp_recovered'],
              closesFlags: [],
            },
            {
              routeId: 'a_new_lamp',
              label: 'Let Tamsin light a new one in the old niche',
              predicate: {
                flagsSet: ['spoke:tamsin', 'lamp_stolen'],
                atLocation: 'the_lamp',
                minRelationship: [{ characterId: 'tamsin', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['lamp_recovered', 'a_new_lamp'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['lamp_back'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_luck',
      title: 'Where the Luck Comes From',
      summary: 'Lady Fortune’s luck is not made. It is moved, out of the Lower Wards and onto the Duke. Make it show gold where the Arbiter can see it.',
      kind: 'LEAD',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:luck_is_moved'] },
      involvedCharacterIds: ['fortune', 'ash', 'duke'],
      involvedLocationIds: ['the_bowl', 'hearth_temple', 'tanners_row'],
      knownRewardCopy: 'No sixth year, if the Arbiter sees it.',
      steps: [
        {
          id: 'prove_it',
          playerCopy: 'Make Lady Fortune’s luck show gold where the Arbiter can see it.',
          directorNotes:
            'Ash has suspected for five years and written "proof?" in his ledger every one of them. Showing the luck in a bout is the clean way and costs the player a great deal of attention. Reading his ledger out at the Hearth is the slow way. Showing yourself in Tanner’s Row and telling the street what it has been paying for does not stop the Games, and changes who the Row prays to. Keeping quiet for a price is also a choice.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'showed_the_arbiter',
              label: 'Make it flash gold on the sand',
              predicate: { flagsSet: ['used:show_the_luck'], atLocation: 'the_bowl' },
              setsFlags: ['fortune_exposed'],
              closesFlags: ['kept_fortunes_secret'],
            },
            {
              routeId: 'read_the_ledger',
              label: 'Read the Arbiter’s ledger out at the Hearth',
              predicate: { hasItems: ['bout_ledger'], flagsSet: ['used:speak_plainly'], atLocation: 'hearth_temple' },
              setsFlags: ['fortune_exposed', 'ledger_read_out'],
              closesFlags: ['kept_fortunes_secret'],
            },
            {
              routeId: 'told_the_row',
              label: 'Show yourself in Tanner’s Row and tell them',
              predicate: { flagsSet: ['used:show_yourself'], atLocation: 'tanners_row' },
              setsFlags: ['the_row_knows'],
              closesFlags: [],
            },
            {
              routeId: 'kept_quiet',
              label: 'Sell her your silence',
              predicate: { flagsSet: ['fortune_bargained'] },
              setsFlags: ['kept_fortunes_secret'],
              closesFlags: ['fortune_exposed'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['luck_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_lower_wards', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_what_ash_was',
      title: 'What Happens to a God Who Goes Out',
      summary: 'Brother Ash prays to no god and can see every one of them. Find out why, and what it means for a god with one follower.',
      kind: 'LEAD',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:ash_sees_gods'] },
      involvedCharacterIds: ['ash'],
      involvedLocationIds: ['hearth_temple', 'the_cinder_yard', 'arbiter_chapel'],
      knownRewardCopy: 'An answer nobody in the Gallery has, and a choice nobody in the Gallery has been offered.',
      steps: [
        {
          id: 'the_cinder_yard',
          playerCopy: 'Find out why the Arbiter can see you.',
          directorNotes:
            'He will show the player the Cinder Yard if he trusts them and if they ask straight rather than spend a miracle on him. In the yard, on the swept bench, he tells it plainly: a god of kept promises, a ferryman, a drowning, the ash, waking up cold. He does not know if it would happen again. He is the only one it has ever happened to that anybody knows of.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_showed_you',
              label: 'Ask him straight, and let him show you',
              predicate: {
                flagsSet: ['spoke:ash'],
                minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:what_ash_was', 'found_the_cinder_yard'],
              closesFlags: [],
            },
            {
              routeId: 'heard_him_not_pray',
              label: 'Listen to him sitting by the Hearth at night',
              predicate: { flagsSet: ['used:listen'], atLocation: 'hearth_temple', afterWorldMinute: 21 * 60 },
              setsFlags: ['knows:what_ash_was', 'found_the_cinder_yard'],
              closesFlags: [],
            },
            {
              routeId: 'the_signature',
              label: 'Put his signature in front of him and ask what it cost',
              predicate: { hasItems: ['entry_paper'], flagsSet: ['used:speak_plainly'] },
              setsFlags: ['knows:what_ash_was', 'found_the_cinder_yard', 'knows:ash_signed'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['ash_known'], abilities: ['let_the_lamp_go'], reputation: [] },
        },
        {
          id: 'the_last_choice',
          playerCopy: 'Decide whether you stay a god.',
          directorNotes:
            'Never push it. The player can go out on purpose and wake up a person, with a heartbeat, no miracles and Tamsin’s address. Or they can stay what they are. Both are endings worth having; neither is the right one.',
          enterWhen: { flagsSet: ['ash_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'chose_mortality',
              label: 'Let the lamp go',
              predicate: { flagsSet: ['used:let_the_lamp_go'] },
              setsFlags: ['chose_mortality'],
              closesFlags: ['stayed_a_god'],
            },
            {
              routeId: 'stayed_a_god',
              label: 'Stay what you are',
              predicate: { flagsSet: ['games_over'], flagsUnset: ['chose_mortality'] },
              setsFlags: ['stayed_a_god'],
              closesFlags: ['chose_mortality'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['made_the_choice'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_registry_challenge',
      atWorldMinute: 18 * 60,
      locationId: 'hearth_temple',
      publicCopy: 'A Golden House clerk pins a notice by the Register of Shrines: Tamsin Reed’s entry is challenged, because the god she fights for has no plate on the wall.',
      directorNotes:
        'Mother Sabine’s doing, and entirely lawful. The hearing is set for eight tomorrow night. Word reaches the Twelve Bells within the hour and Tamsin’s odds go out to three hundred to one.',
      setsFlags: ['registry_challenge'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_first_dusk',
      atWorldMinute: 20 * 60 + 30,
      locationId: null,
      publicCopy: 'The sun drops behind the harbour, every festival lantern in Merrowgate comes on at once, and up and down the Gallery the gods stand, stretch, and start walking down into the city.',
      directorNotes:
        'From now until dawn, the player can walk down in a body. Make it physical: weight, cobbles, smell of frying fish, a body that is cold in a draught. Nobody in the street knows who they are.',
      setsFlags: ['first_dusk'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_fortune_calls',
      atWorldMinute: 21 * 60 + 30,
      locationId: 'the_lamp',
      publicCopy: 'A tall woman in gold silk is sitting on the step under your lamp, turning a coin over her knuckles, waiting for you.',
      directorNotes:
        'Fortune, in a body, in Tanner’s Row, which she has not visited in five years. She makes the offer here, at the player’s own shrine, on purpose. She leaves the coin on the step either way.',
      setsFlags: ['fortune_asked'],
      cancelledByFlags: [],
      requiresFlags: ['first_dusk'],
      movesCharacters: [{ characterId: 'fortune', toLocationId: 'the_lamp' }],
    },
    {
      id: 'we_lamp_stolen',
      atWorldMinute: 1440 + 2 * 60 + 15,
      locationId: 'the_lamp',
      publicCopy: 'Two dockhands with a crowbar lever the tin lamp out of its niche and walk off up the hill with it under a sack.',
      directorNotes:
        'Wherever the player is, they feel it go, like a hand taken off their back. The niche is dark. Paid by the Golden House; they will say so for a drink.',
      setsFlags: ['lamp_stolen'],
      cancelledByFlags: ['lamp_guarded'],
      requiresFlags: ['registry_challenge'],
      movesCharacters: [],
    },
    {
      id: 'we_knee_locks',
      atWorldMinute: 1440 + 5 * 60 + 20,
      locationId: 'tanners_row',
      publicCopy: 'On the stairs down from her room, Tamsin’s right knee locks, and she sits on the step for a full minute before it will bend again.',
      directorNotes:
        'She swears at it quietly and tells nobody. If the player is listening to her at all, they hear the prayer she says on the step, which is the first thing she has ever asked for twice.',
      setsFlags: ['knee_is_bad'],
      cancelledByFlags: ['knee_mended'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_barge_rolls',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'the_harbour',
      publicCopy: 'At the coal berth, a loaded barge rolls over in flat calm water, and all along the quay the dockers stop work and look at each other.',
      directorNotes:
        'A god standing on the quay feels it go: luck drawn out of the harbour like a tide, uphill toward the Bowl, where the Duke fights at three. Write the sensation plainly, so the player knows exactly what they felt.',
      setsFlags: ['knows:luck_is_moved'],
      cancelledByFlags: [],
      requiresFlags: ['visited:the_harbour'],
      movesCharacters: [],
    },
    {
      id: 'we_low_ring',
      atWorldMinute: 1440 + 11 * 60,
      locationId: 'the_bowl',
      publicCopy: 'The Low Ring is called: eight first-round losers on the sand at once, and only the last one standing goes back into the Games.',
      directorNotes: 'Loud, crowded, short. Tamsin is the only one of the eight fighting under a mark nobody in the stands recognises.',
      setsFlags: ['low_ring_bout'],
      cancelledByFlags: [],
      requiresFlags: ['into_the_low_ring'],
      movesCharacters: [{ characterId: 'tamsin', toLocationId: 'the_bowl' }],
    },
    {
      id: 'we_wick_tells',
      atWorldMinute: 1440 + 13 * 60,
      locationId: 'the_bowl',
      publicCopy: 'In the back row of the Gallery, Wick stops talking in the middle of a sentence and takes your hand.',
      directorNotes:
        'She tells the player where Fortune’s luck comes from, the Lower Wards, because she has watched it happen for five years and has never said it out loud. Then she tells them she has been reporting their miracles to Fortune.',
      setsFlags: ['knows:luck_is_moved'],
      cancelledByFlags: [],
      requiresFlags: ['wick_confided'],
      movesCharacters: [],
    },
    {
      id: 'we_second_day_bout',
      atWorldMinute: 1440 + 15 * 60,
      locationId: 'the_bowl',
      publicCopy: 'Tamsin’s name is called for her second bout, against a docker she has worked beside on the coal berth for six years.',
      directorNotes: 'He nods to her on the way out of the tunnel. Neither of them wants this. Both of them need the purse.',
      setsFlags: ['second_day_bout'],
      cancelledByFlags: ['tamsin_out_of_the_games'],
      requiresFlags: ['first_bout_over'],
      movesCharacters: [{ characterId: 'tamsin', toLocationId: 'the_bowl' }],
    },
    {
      id: 'we_knee_gives',
      atWorldMinute: 1440 + 15 * 60 + 20,
      locationId: 'the_bowl',
      publicCopy: 'Halfway through the bout, Tamsin’s right knee folds under her and she goes down on the sand, and does not get up by three.',
      directorNotes:
        'Brother Ash rings the bell himself. She is carried off on a door. She looks up at the back row once on the way out, and does not say anything.',
      setsFlags: ['knee_gave_out'],
      cancelledByFlags: ['knee_mended', 'knee_strapped'],
      requiresFlags: ['knee_is_bad', 'second_day_bout'],
      movesCharacters: [{ characterId: 'tamsin', toLocationId: 'champions_cells' }],
    },
    {
      id: 'we_the_hearing',
      atWorldMinute: 1440 + 20 * 60,
      locationId: 'hearth_temple',
      publicCopy: 'The Register hearing opens at the Temple of All Gods: Mother Sabine at one table, the clerks at another, Brother Ash by the Hearth, and Tamsin alone in front of them.',
      directorNotes:
        'Sabine is calm, correct and does not lie. The clerks will rule by half past nine. Fortune is not here and makes a point of not being here.',
      setsFlags: ['hearing_called'],
      cancelledByFlags: [],
      requiresFlags: ['registry_challenge'],
      movesCharacters: [
        { characterId: 'sabine', toLocationId: 'hearth_temple' },
        { characterId: 'ash', toLocationId: 'hearth_temple' },
        { characterId: 'tamsin', toLocationId: 'hearth_temple' },
      ],
    },
    {
      id: 'we_fortunes_feast',
      atWorldMinute: 2880 + 30,
      locationId: 'the_bowl',
      publicCopy: 'Lady Fortune throws a midnight feast in the empty Gallery for every god in the city, and announces, glass raised, that Wick will be joining her on the last night.',
      directorNotes:
        'Every god comes. Wick sits at the rail for the first time in four hundred years and looks miserable. Fortune keeps a seat empty beside her own and does not say who it is for.',
      setsFlags: ['fortune_feast'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'fortune', toLocationId: 'the_bowl' },
        { characterId: 'wick', toLocationId: 'the_bowl' },
      ],
    },
    {
      id: 'we_final_bell',
      atWorldMinute: 2880 + 19 * 60,
      locationId: 'the_bowl',
      publicCopy: 'The bell rings for the Hearth Final, and thirty thousand people stand up at once.',
      directorNotes:
        'If Tamsin is still in the Games, it is her and the Duke. If she is not, it is the Duke and a stranger, and the player watches from the back row with the rest of the gods.',
      setsFlags: ['final_bell'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'tamsin', toLocationId: 'the_bowl' },
        { characterId: 'duke', toLocationId: 'the_bowl' },
        { characterId: 'ash', toLocationId: 'the_bowl' },
        { characterId: 'fortune', toLocationId: 'the_bowl' },
      ],
    },
    {
      id: 'we_hearth_turns',
      atWorldMinute: 2880 + 21 * 60 + 30,
      locationId: 'hearth_temple',
      publicCopy: 'The Hearth flares gold, and every lamp, candle and cooking fire in Merrowgate flares with it, for a sixth year.',
      directorNotes:
        'The oldest rule of the Games takes effect. Fortune keeps the Hearth for good and there will be no more Games. In the back row, every small god feels the prayers they had left get thinner.',
      setsFlags: ['sixth_year'],
      cancelledByFlags: ['hearth_won', 'fortune_exposed'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_hearth',
      kind: 'FINALE',
      label: 'Whether a back-row god can take the Hearth',
      seedHint: 'A small gold line in the air that reads [Miracles left today: 1], while the Duke counts.',
      payoffHint: 'The Hearth Final at dusk on the third day, and the fire choosing a god by the follower who fought for it.',
      weight: 1,
    },
    {
      id: 'p_what_she_believes',
      kind: 'RELATIONSHIP',
      label: 'What Tamsin believes once you answer',
      seedHint: 'Eleven years of lighting the lamp and never once asking, and then: "Are you going to help me or not?"',
      payoffHint: 'The first night at the lamp, when she sees a face for the first time and has to decide whether to believe it.',
      weight: 0.9,
    },
    {
      id: 'p_why_ash_sees',
      kind: 'MYSTERY',
      label: 'Why the Arbiter can see the gods',
      seedHint: 'A monk who prays to nobody looks straight up at the back row and tells you to sit up straight.',
      payoffHint: 'The Cinder Yard behind the Hearth: he was a small god once, and went out, and woke up.',
      weight: 0.8,
    },
    {
      id: 'p_the_sixth_year',
      kind: 'RIVAL',
      label: 'Lady Fortune and the sixth year',
      seedHint: '"Darling," from the gold rail, and a coin that never falls off her knuckles.',
      payoffHint: 'Her offer at your lamp, the seat she used to sit in by your pillar, and the rule that ends the Games forever.',
      weight: 0.9,
    },
    {
      id: 'p_where_luck_comes_from',
      kind: 'THEME',
      label: 'Where the luck comes from',
      seedHint: 'A collapsed porch and a shuttered bakery in Tanner’s Row, and five unlucky years nobody can explain.',
      payoffHint: 'Luck is moved, not made, and the Lower Wards have paid for every one of the Duke’s wins.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_lost',
      name: 'God of Lost Things',
      role: 'Support: finding what is lost',
      summary: 'You can feel where any lost thing in the city is and nudge small ones home for free, so you are good at finding people, proof and swords that have left someone’s hand.',
      playstyle: ['Finds things', 'Patient', 'Quiet help'],
      blurb: 'Keys under floorboards, rings down drains, a dog that never came home. Somebody has to keep track of them, and for two hundred years it has been you.',
      attributeBonus: { mind: 2, arcana: 1 },
      skillProficiencies: { domain: 3, listening: 2 },
      startingItems: [{ itemId: 'odd_key', qty: 1 }],
      startingAbilities: ['work_a_miracle', 'bring_it_back'],
      startingReputation: [],
    },
    {
      id: 'arch_mercy',
      name: 'God of Small Mercies',
      role: 'Healing and comfort',
      summary: 'You can ease pain, close small cuts and let tired people sleep for free, so you are good at keeping Tamsin on her feet and at being someone a stranger wants to pray to.',
      playstyle: ['Heals', 'Kind', 'Wins people over'],
      blurb: 'A hot drink handed over without being asked for. A bandage that was already in the drawer. You were never prayed to much, but you were always thanked.',
      attributeBonus: { presence: 2, resolve: 1 },
      skillProficiencies: { domain: 3, charm: 2 },
      startingItems: [{ itemId: 'clean_bandage', qty: 1 }],
      startingAbilities: ['work_a_miracle', 'ease_the_hurt'],
      startingReputation: [{ factionId: 'faction_lower_wards', amount: 5 }],
    },
    {
      id: 'arch_weather',
      name: 'God of Bad Weather',
      role: 'Wind, rain and fog',
      summary: 'You can raise a gust, a squall or a sea fog over one street for free, so you are loud, hard to ignore, and much better at a fight in the street than at keeping a secret.',
      playstyle: ['Loud', 'Big effects', 'Hard to hide'],
      blurb: 'Fishermen used to nail tin bells over their doors for you, back when people asked a god to keep the storm off rather than simply hoping.',
      attributeBonus: { arcana: 2, might: 1 },
      skillProficiencies: { domain: 3, miracles: 1, brawling: 1 },
      startingItems: [{ itemId: 'tin_bell', qty: 1 }],
      startingAbilities: ['work_a_miracle', 'turn_the_sky'],
      startingReputation: [],
    },
    {
      id: 'arch_doors',
      name: 'God of Locked Doors',
      role: 'Stealth: locks and ways out',
      summary: 'You can make a lock give or a door stick shut for free, so you are good at getting into strongrooms, out of trouble, and past anyone who would rather you were not there.',
      playstyle: ['Sneaky', 'Gets in', 'Gets out'],
      blurb: 'People in the Lower Wards still chalk your sign over doors they want kept safe. Most of them have no idea whose sign it is.',
      attributeBonus: { agility: 2, mind: 1 },
      skillProficiencies: { domain: 3, quiet_hands: 2 },
      startingItems: [{ itemId: 'door_chalk', qty: 1 }],
      startingAbilities: ['work_a_miracle', 'open_the_way'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name does she pray to?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Orrin' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What are you the god of?',
      helpText:
        'Every god in Merrowgate is god of one thing, and can do small favours inside it for free. Yours sets what you are good at and how your miracles tend to look, and you keep it for the whole story. It does not decide what you spend your miracle on, or who you answer. That part is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'appearance',
      label: 'What do you look like when you walk down?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Tall and thin, a patched grey coat, soot on my fingers, eyes the colour of lamplight.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Seven of thirteen are losses or near it: the sixth year, taken in, gone
   * out, struck off, carried off, the bout she would not finish, and walking
   * away, which is open from turn fourteen. Winning the Hearth is RARE, winning
   * it clean is UNIQUE, and so is choosing to stop being a god.
   *
   * Order matters: the storyteller reads only the first twelve. Won Clean is
   * last because it is a flavour of A City That Prays to You, which comes
   * first; every other ending, A Seat at the Rail included, stays in view.
   */
  endings: [
    {
      id: 'end_a_city_that_prays',
      name: 'A City That Prays to You',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['hearth_won'], flagsUnset: ['taken_in_by_fortune', 'chose_mortality'] },
      condition:
        'Tamsin won the Hearth Final under the player’s mark. Write the Hearth turning to the back row: every prayer in Merrowgate arriving at once, too many to hear, and in the middle of them one voice the player would know anywhere.',
      epilogue:
        'For a year the whole city prays to a god most of it had never heard of. The player keeps the seat by the cracked pillar anyway. Tamsin buys back the Kittiwake, paints the player’s sign on the bow, and still lights the tin lamp every night, because that was never about the Hearth.',
      hint: '',
    },
    {
      id: 'end_the_sixth_year',
      name: 'The Sixth Year',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['sixth_year'], flagsUnset: ['fortune_exposed'] },
      condition:
        'The Duke won, or Tamsin was not there to stop him, and the Hearth went to Fortune for the sixth year running. Under the oldest rule she keeps it forever. Write the last Games ending, and the back row going quiet.',
      epilogue:
        'There are no more Hearth Games. Fortune is gracious about it for a century. The back row empties one seat at a time, and the player sits by the cracked pillar with as many followers as they managed to keep, which is either a small shrine or a tin lamp.',
      hint: '',
    },
    {
      id: 'end_two_lamps',
      name: 'Two Lamps in Tanner’s Row',
      rarity: 'RARE',
      minTurn: 25,
      requires: { flagsSet: ['hearth_lost', 'wick_stays_lit', 'tamsin_believes'] },
      condition:
        'No Hearth, but Wick is still herself and still lit, and Tamsin believes in the player now rather than out of habit. Write a small win that is entirely real: two small lights in a poor street that were nearly one.',
      epilogue:
        'A candle-end burns in the niche beside the tin lamp now. Hettie and Tamsin take turns lighting them and argue about whose god is louder. Wick has stopped counting Benno, and has started counting again.',
      hint: '',
    },
    {
      id: 'end_fortunes_newest_face',
      name: 'Fortune’s Newest Face',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['taken_in_by_fortune'] },
      condition:
        'The player flipped Fortune’s coin and said yes. They will never go out. Write it warm and gold and completely final, and let the player notice, too late, that they cannot remember their own name.',
      epilogue:
        'Fortune has an eighteenth aspect, a small new face of luck that looks a little like you used to. People pray to it all the time. In Tanner’s Row, a tin lamp burns for nobody, and Tamsin keeps lighting it for a year before she stops.',
      hint: '',
    },
    {
      id: 'end_mortal',
      name: 'Mortal',
      rarity: 'UNIQUE',
      minTurn: 25,
      requires: { flagsSet: ['chose_mortality'] },
      condition:
        'The player let the lamp go on purpose, the way Brother Ash once went out by accident, and woke up a person in the ash with a heartbeat and no miracles at all. Write it as a choice made by someone who knew what it cost.',
      epilogue:
        'They get a job on the quay, badly. Ash teaches them to sweep. Tamsin teaches them to strap a knee. On the first night the tin lamp is lit by somebody who used to live in it, and nobody in the Gallery can see them any more.',
      hint: '',
    },
    {
      id: 'end_gone_out',
      name: 'Gone Out',
      rarity: 'COMMON',
      minTurn: 15,
      requires: { flagsSet: ['last_prayer_unsaid'] },
      condition:
        'Tamsin stopped praying. The lamp is gone, and the player let her lose alone the one time she asked. Write the quiet, and do not make it dramatic. A god nobody prays to goes out like a lamp.',
      epilogue:
        'For a while the player can still hear the city, like a room next door. Then less. Somewhere behind the Temple of All Gods, a clerk drops one more cracked tin lamp onto the heap in the Cinder Yard.',
      hint: '',
    },
    {
      id: 'end_struck_from_the_register',
      name: 'No Plate, No Shrine',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['struck_off'] },
      condition:
        'Mother Sabine won the hearing. Tamsin is struck out of the Games, Brother Ash is censured for his signature, and the player is officially not a god of this city. Write it lawful, polite and devastating.',
      epilogue:
        'Tamsin goes back to the quay. Ash is given a smaller broom. The player is still a god, whatever the Register says, and Tamsin still lights the lamp, but she does not look up at the Bowl any more when she walks past it.',
      hint: '',
    },
    {
      id: 'end_carried_off_the_sand',
      name: 'Carried Off the Sand',
      rarity: 'COMMON',
      minTurn: 18,
      requires: { flagsSet: ['tamsin_out_of_the_games'] },
      condition:
        'Her knee folded on the second day and she did not get up by three. Out of the Games, still the player’s. Write the loss honestly, and let what she says to the back row afterwards decide how bad it is.',
      epilogue:
        'She walks with a stick for the summer. The Kittiwake is sold at auction to a man who renames her. Every night, slowly, on a bad knee, Tamsin climbs the stairs to the bend in Tanner’s Row and lights the lamp anyway.',
      hint: '',
    },
    {
      id: 'end_back_row_stands_up',
      name: 'The Back Row Stands Up',
      rarity: 'RARE',
      minTurn: 25,
      requires: { flagsSet: ['fortune_exposed', 'games_over'] },
      condition:
        'The Arbiter saw Fortune’s luck show gold on the sand, and the whole Gallery saw him see it. There is no sixth year. Write the moment the gold rail goes silent and the back row starts talking.',
      epilogue:
        'The Games go on. Fortune keeps her seat and loses the Lower Wards in a month, prayer by prayer. The barges stop rolling over in still water. Somebody in Tanner’s Row reopens the bakery, and puts a candle-end in the window.',
      hint: '',
    },
    {
      id: 'end_she_would_not_finish_him',
      name: 'She Would Not Finish Him',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['would_not_finish_him'] },
      condition:
        'Tamsin had the Duke down in the final and knew he could not see her. She stepped back and let the count go past three without hitting him again. It was her call. Write the player respecting it, whatever it cost them.',
      epilogue:
        'The crowd boos her for an hour and the Twelve Bells names a drink after her by morning. The Duke sends her the deed to a small boat. The Hearth goes where it goes. Tamsin says, at the lamp that night, that she hopes the player is not too angry, and means it.',
      hint: '',
    },
    {
      id: 'end_somewhere_else',
      name: 'Somewhere Else',
      rarity: 'UNCOMMON',
      minTurn: 14,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of Merrowgate while the Games were still going, away from the Bowl, the lamp and the one person praying to them. Write the road, and the prayer getting fainter the further they go.',
      epilogue:
        'Gods are not meant to leave their cities, and it turns out they can. Somewhere up the coast there is a village with no god at all. Back in Tanner’s Row, a tin lamp is lit every night for someone who is not there.',
      hint: '',
    },
    {
      id: 'end_a_seat_at_the_rail',
      name: 'A Seat at the Rail',
      rarity: 'RARE',
      minTurn: 25,
      requires: { flagsSet: ['fortune_bargained', 'games_over'] },
      condition:
        'The player knew where Fortune’s luck came from and sold her their silence for terms: a seat at the gold rail and whatever else they asked. Write it as a win that the player will have to sit with for a very long time.',
      epilogue:
        'The player sits at the gold rail now, between Fortune and the god of the harbour, and the draught never reaches them. Below in Tanner’s Row the porches keep falling in. Wick stops visiting. Tamsin still lights the lamp.',
      hint: '',
    },
    {
      id: 'end_won_clean',
      name: 'Won Clean',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['hearth_won', 'won_clean'] },
      condition:
        'She beat a Duke who was fighting fair, with Fortune’s luck kept off the sand and not one miracle spent on her. Write it as hers, completely, and let the Duke be the first to say so.',
      epilogue:
        'The Iron Duke retires the same night and asks Tamsin to his courtyard to show her where the white lines go. Brother Ash writes one word in the margin of the ledger, under five years of question marks: "clean". The player never tells anyone how much they wanted to help.',
      hint: '',
    },
  ],
  opening:
    "The Iron Duke knocks the sword from Tamsin Reed’s hands, and the whole arena roars.\n\nShe doesn’t chase it. She looks up, past the packed stands, to the gallery of gods no mortal can see.\n\nAt you. Back row, by the cracked pillar.\n\n\"I know you’re up there,\" she says, barely moving her lips. You hear her as if she stood at your elbow.\n\nShe is the only person in this city who still prays to you.\n\nA small gold line burns in the air before you:\n\n[Miracles left today: 1]\n\nThe Duke raises his axe and begins the count to yield. \"One.\"\n\nTamsin doesn’t look away from you. \"Well? Are you going to help me or not?\"",
  openingPanel: {
    assetKey: 'story_one_miracle_a_day/opening',
    alt: 'Tamsin Reed, in a headscarf and padded jerkin, stands empty-handed on arena sand and looks up past the roaring stands toward you while the Iron Duke raises his axe behind her.',
  },
  openingSuggestions: [
    '"Yield. You’ll get another bout tomorrow, and I’m not going anywhere."',
    'I spend my one miracle and put her sword back in her hand.',
    'I spend it on the Duke’s axe instead, rules or no rules.',
  ],
  coverDirection: [
    'SUBJECT: Tamsin Reed, a dock porter turned arena champion, alone and unmistakable in the foreground of a key visual for a fantasy anime about a very small god.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Tall and broad-shouldered, dark brown skin, short tight black curls under a sweat-dark headscarf, a sleeveless padded jerkin over dockworker’s trousers, a leather strap wound round one knee.',
    'Her hands are empty and half raised. Her face is tipped up toward the viewer, because the viewer is the god she prays to: defiant, scared and asking, all at once.',
    'A thumb-sized mark of warm gold light glows on the back of her left hand.',
    'A small floating line of gold light hangs in the air between her and the viewer, a few gold sparks drifting off its ends.',
    'The line of light is abstract: a glowing bar with no letters, no numbers, nothing that reads as writing.',
    'HER FACE STAYS CLEAN: no glow, sparks, marks or light streaks on her face or skin.',
    'Every gold light effect stays on the mark on her hand, the floating line of light and the title, never on her face.',
    'BEHIND HER, soft and secondary: arena sand, her sword stuck point-down in it, and the Iron Duke as a huge dark armoured silhouette with a double-bitted axe raised and perfectly still.',
    'HIGH ABOVE, faint in a blue summer sky, a ghostly tier of stone benches where small robed figures of gods sit, and at its gold rail a tall figure in draped gold silk lounging with a gold coin on her knuckles.',
    'LIGHT: hot afternoon sun on the sand, a warm gold rim light from above on her headscarf and shoulders, cool blue sky behind.',
    'TITLE: the words One Miracle a Day painted into the art across the upper third, over the sky, as a bold hand-lettered storybook logo, warm white with a thin gold glow,',
    'spelled exactly One Miracle a Day, large and legible at thumbnail size. A few gold sparks rise off the lettering only. No other text anywhere.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const ONE_MIRACLE_A_DAY = StoryVersion.parse(raw);
