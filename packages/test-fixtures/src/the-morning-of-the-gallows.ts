import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Morning of the Gallows" — a regression revenge story where the woman
 * who signed your death warrant is the one holding the cell door open.
 *
 * Bible: `docs/story-bibles/new50/26_THE_MORNING_OF_THE_GALLOWS.md`. Slate #26,
 * drop 3. Shape copied from Good Morning, Husband; conventions from the
 * Skill: ERROR pilot.
 *
 * Playable span: one week in the river city of Vellmark, from dawn on day 0 in
 * the Rivergate cells to the Feast of Oaths on the evening of day 6. Last time,
 * that feast is where the player knelt and handed the Prince the signet ring
 * that later sealed three forged letters. Everything after the feast — the
 * three years, the trial, a second gallows or none — lives in the endings.
 *
 * The regression has to live where the storyteller can read it. Production
 * runs `runTurnPure`, which reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest summaries,
 * world events and the first twelve endings, and the chosen archetype's
 * starting abilities. So: the rope mark and the signet are quest items the
 * player starts holding; every archetype starts with Remember It; the first
 * life, who remembers it, and "there is no third morning" are hard canon; and
 * there are exactly twelve endings.
 *
 * The Prince's guilt is the story's central secret. It is in hard canon with
 * an instruction never to narrate it, in his secrets, and in the evidence
 * (ledger, vial, wine). It is not in the premise, the opener or his card.
 *
 * Art: every image prompt carries the tone guide as its mood, so the tone
 * guide is mood only. The 13+ limits (a kiss and no further, no self-harm,
 * no mechanics of a hanging, the gallows by its timber and crowd) and the
 * pacing of the reveals live in hard canon, which the storyteller also reads.
 * The cover's `TITLE:` line owns the lettering, every effect stays on the keys,
 * the sunrise and the title, never on a face, and nobody is described by age.
 * The opening panel's alt starts with Isra, whose portrait is its reference.
 *
 * Three invisible variables. Stamina is the only GOOD_HIGH, because
 * `resolveRest` refills those. Suspicion comes first among the descending
 * pair on purpose: public violence raises the first GOOD_LOW in array order,
 * and a knight drawing steel in this city makes the Prince's house watchful
 * before it changes anything else. Old Course is how closely this life is
 * still running to the last one — high means the player's memory is a perfect
 * map of a road that ends on a scaffold.
 */

const raw = {
  id: 'sv_the_morning_of_the_gallows_1',
  storyId: 'story_the_morning_of_the_gallows',
  version: 1,
  title: 'The Morning of the Gallows',
  fantasyLabel: 'They hanged you once. Not this time.',
  hook: 'Hanged for treason, you wake three years earlier, and the woman who signed your warrant is at your cell with a key.',
  premise:
    'Three years from now, you were hanged in the city square for poisoning the old king. You did not do it. A vial of poison was found in your quarters, three letters under your own seal were read to the court, and your old sergeant swore he saw you with the vial. The Crown’s Advocate who prosecuted the case and signed your death warrant was Lady Isra Vane, who was going to marry you.\n\n' +
    'This morning you woke in a cell under the Rivergate, three years earlier, on the one night you ever spent locked up: the night after you refused an order to turn your company’s crossbows on a bread riot. There is a rope mark on your neck that does not fade.\n\n' +
    'Isra remembers too. She is at the cell door with a stolen key, and a boat is waiting on the river until the seven o’clock bell.\n\n' +
    'At nine, if you are still here, Prince Corvin will walk down those stairs, praise you for refusing, and make you captain of his guard. Last time that was the best day of your life. Six days later, at the Feast of Oaths, you knelt and put your signet ring, which seals your every order, in his hand.\n\n' +
    'Somebody in this city is already building your gallows, and you have one week before the first of it is in place. You know how the last life ended. With every change you make, that knowledge gets less true. There is no third morning.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Dark fantasy', 'Mystery', 'Revenge', 'Regression', 'Romance'],
  mechanicsChips: [
    'You remember the next three years',
    'Your betrothed signed your warrant',
    'Every change blurs the future you know',
    'Six days to the Feast of Oaths',
    'There is no third morning',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'You already know how this ends: on a scaffold, with the woman you loved reading out the reasons. You can run tonight, take the same oath again with your eyes open, or go looking for whoever built the gallows. Everything you change makes the future you remember less true, and nobody else in the city will believe a word of it.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'watergate_cells',
    startWorldMinute: 5 * 60 + 40,
    startingItems: [
      { itemId: 'rope_mark', qty: 1 },
      { itemId: 'your_signet', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-six this morning and was twenty-nine on the gallows. Lady Isra Vane is twenty-six, Prince Corvin thirty, Sabine Orrel thirty-two, Sergeant Hob Garrow fifty-four, Hangman Tull sixty-six and King Osric seventy-one. Sabine’s brother was twenty-four when he was hanged. The Crown hangs adults only: nobody under eighteen is ever condemned, hanged or shown on the gallows.',
      'Vellmark is a walled river city and the capital of a small kingdom. King Osric rules from the Crownhold on the hill. Its law hangs thieves, rioters and traitors on Tollmarket Green, and the price of bread has doubled since the spring.',
      'In the life the player remembers, three years from this morning, King Osric died of nightbell after a long shaking illness. The player, by then captain of Prince Corvin’s guard, was tried for the murder in the Hall of Pleas: a vial of nightbell was found in their sea chest, three letters to the Duke of Esk sealed with their signet were read out, and Sergeant Hob Garrow swore he saw them with the vial. They were hanged at dawn on Tollmarket Green.',
      'Lady Isra Vane, the Crown’s Advocate and the player’s betrothed, prosecuted that case, signed the death warrant and read it aloud at the foot of the gallows. She believed the evidence. The night before the hanging Hob confessed to her that he had been paid to plant the vial, and the hanging went ahead anyway.',
      'This morning the player woke three years earlier, in the cells under the Rivergate. Yesterday they refused the Lord Marshal’s order to turn the Rivergate Company’s crossbows on a bread riot in the river market, and spent the night locked up for it. A thin red rope mark circles their neck where the knot sat, and it does not fade.',
      'Exactly three people remember the first life: the player, Isra, and Hangman Tull, who tied the knot. Nobody else does, and nobody can be made to. The player’s memories of the next three years hold only while events go the way they went; with every change the player makes, the future they remember becomes less reliable.',
      'Last time, at nine this morning, Prince Corvin came down to the cells alone, praised the player for refusing, had the charge dropped and offered them the captaincy of his guard. Six days later, at the Feast of Oaths in the Great Hall of the Crownhold, the player knelt and gave him their signet ring, as a prince’s captain does, and the betrothal to Isra was announced.',
      'Nine o’clock on the first morning is never skipped or summarised. If the player is still in the Rivergate cells or its yard when the bell strikes nine, Prince Corvin comes down the stairs alone, on the page, and makes his offer, whatever else is going on.',
      'The truth nobody has proven: Prince Corvin is poisoning his father. He brews nightbell in a locked stillroom behind his glasshouse at Ashcourt and puts a few drops in the cask of Ashcourt wine he sends the King every seventh day. He chose the player to hang for it on the night of the bread riot. Never state this in narration; it is found in evidence, or he says it to someone already on his side.',
      'Nightbell is a blue-flowered plant sold as dye. A drop a week brings on a shaking sickness that looks like old age; a spoonful stops the heart. The King’s hands began to shake this spring, and his physicians call it age.',
      'Hob owes eighty-eight crowns at the Drowned Lantern dice house, and only Hob and the house know it: nobody announces it or brings the slate to the Rivergate. Last time, on the second night, Sabine Orrel bought his marker at the Lantern’s back table in plain coin, without naming anyone, and from then on he did what the Prince’s people asked. Only her ledger shows whose money it was. Sabine never says the Prince’s name over the marker, never carries his seal on Hob’s business, and never goes to the Rivergate for it.',
      'There is no third morning. The turning knot works once for any neck.',
      'The turning knot and the rope lines it leaves are the only uncanny things in Vellmark. There is no other magic: nobody flies, passes through walls, reads minds or comes back from the dead, the player included. If the player tries something impossible, it does not happen; one plain line says so, and the scene goes on from where they stand.',
      'Romance in this story is slow, adult and wary, and goes up to a kiss and no further. Isra signed the warrant and both of them know it, so warmth is earned in small admissions. Nobody’s body is described lingeringly.',
      'Violence in Vellmark is sudden and short, and its consequences land in the same scene. Nobody is wounded at length on the page. The gallows on Tollmarket Green is described by its timber and its crowd, never by a body.',
      'Nobody in this story harms themselves. If the player tries to die on purpose, or to hurt themselves to get another morning, it never happens on the page and is never described. Someone stops them or the scene cuts away, and whoever is there says it plainly: there is no third morning. Isra’s guilt never becomes self-punishment on the page. Tull wants to retire, not to die: putting the rope down means giving up the hangman’s office. Never give the mechanics of a hanging (drop lengths, weights, knot placement, or what a rope does to a body), in narration or in dialogue.',
      'Nobody volunteers a secret. On the first morning Isra answers questions about last time in the order of the warrant, item one, item two, item three, argues for the boat once and then stops. She does not name the Hangman, explain the knot or take off the glove until the player has told her their side of last time and she has stopped being afraid of them. Hob admits the debt only to someone who eats with him and does not offer money. Sabine shows the dye margin only to someone who says nightbell first. Tull explains the knot only to someone who comes to his house and asks plainly. Nobody tells the player who is behind the gallows; the trail does.',
    ],
    toneGuide:
      'Regression revenge with its heart showing: tense, quick and specific. The player knows the next three years, and the reader should feel that knowledge as an advantage and as a trap. A line said exactly as it was said last time is chilling; a line that comes out differently is more frightening still. ' +
      'Court intrigue is concrete: ledgers, wax seals, wine casks, dice-house slates, the price of a loaf. Grey river dawns, candlelight on paper, a city that is polite until it is not. Between the player and Isra everything is slow, wary and earned in small admissions. ' +
      'The Prince’s guilt is the central secret: never state it in narration. The face at the top of a beat belongs to whoever reacted to the player most strongly, and to Isra whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Isra unfolds a sheet of paper she has clearly folded and unfolded all night.\n\n\"Item one,\" she says. \"A vial of nightbell, in your sea chest. Item two. Three letters under your seal. Item three.\"\n\nShe stops.\n\n\"Item three,\" you say.\n\n\"Your sergeant.\" She does not look at the desk where he is snoring. \"I wrote it all down at four this morning, before I could start forgetting. I read it to a crowd once. I can read it to you.\"",
      "The prince takes the stairs two at a time and stops at the bars, out of breath and grinning.\n\n\"You’re the one who wouldn’t shoot the bakers.\"\n\nThere is soil on his cuffs from his own glasshouse, and a key in his hand he did not need to bring himself.\n\n\"My father wants you flogged. I’d rather you guarded me.\" He turns the key. \"Say yes before I come to my senses.\"\n\nIt is exactly what he said last time. Word for word.",
      "The Hangman measures a length of rope against his forearm, elbow to fingertip, five times, without looking.\n\n\"Everyone thinks it’s the drop,\" he says. \"It’s the knot. Always the knot.\"\n\nHe looks at your neck. Not your face. Your neck.\n\n\"Sit down, captain. I tied that one. I’d know it in the dark.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 12, agility: 11, mind: 11, presence: 11, resolve: 12, arcana: 6 },
  skills: [
    { id: 'foresight', name: 'Foresight', attribute: 'mind', description: 'Putting what you remember next to what is in front of you, and seeing where they differ.' },
    { id: 'swordwork', name: 'Swordwork', attribute: 'might', description: 'Steel in a cramped space, against people who trained as long as you did.' },
    { id: 'courtcraft', name: 'Courtcraft', attribute: 'presence', description: 'Saying the right thing to a prince, in the right order, with the right face.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Keeping still in front of the man who will hang you.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true, impossible thing out loud and standing there while it lands.' },
    { id: 'legwork', name: 'Legwork', attribute: 'mind', description: 'Knowing which ledger, which cellar, which clerk, and having the patience to look.' },
    { id: 'shadowing', name: 'Shadowing', attribute: 'agility', description: 'Being somewhere without being seen to be there.' },
    { id: 'command', name: 'Command', attribute: 'presence', description: 'Giving an order that sixty soldiers will follow without asking why.' },
    { id: 'rope_sense', name: 'Rope Sense', attribute: 'arcana', description: 'Seeing the faint mark a turned death leaves, once somebody has shown you how.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so resting restores the body and nothing
   * else. Suspicion is first among the descending pair: it is how far the
   * Prince's house has moved from fondness to management, and public violence
   * lands on it. Old Course is how closely this life still runs to the last
   * one; following the old script raises it, and it drains on its own as the
   * world comes loose.
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
        'The player has been awake since a cell at dawn, and since a scaffold before that. They sit down wherever they are, and whoever is nearest decides what happens next.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Answers come out short and late, the sword arm is slow, and the first life and the second blur at the edges. This is the band where the player agrees to things to end a conversation, and where a bed behind a locked door is the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary weariness of a day spent being careful. Fine for one more conversation or one more stair, not for a fight and a chase in the same hour. Nobody needs to remark on it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'Rested and sharp. The player can afford to be patient, to lie well, to follow someone across half the city, or to draw steel if it comes to that. Scenes can run long and go somewhere.',
        },
      ],
    },
    {
      id: 'suspicion',
      name: 'Suspicion',
      max: 100,
      start: 10,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody in the Prince’s house has given the player a second thought. They are a brave knight with a famous refusal, which is exactly what Corvin wants them to be.',
      color: '#B5543C',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The player is what everybody expects: a decent knight who would not fire on bakers. The Prince’s people are friendly and careless around them, doors open, and Sabine talks in front of them as if they were furniture.',
        },
        {
          upTo: 50,
          behaviour:
            'Someone at Ashcourt has started watching. The player is asked one question too many about where they were last night, Corvin is warmer than he needs to be, and a clerk is suddenly busy whenever the ledger comes up.',
        },
        {
          upTo: 80,
          behaviour:
            'The Prince’s house is managing the player. They are invited everywhere and told nothing, someone follows them home, and the stillroom door gets a second lock. Corvin starts looking for another neck, or for a quicker way to use this one.',
        },
        {
          upTo: 100,
          behaviour:
            'Corvin has decided the player knows. He will not act in public, but there will be a purse in their room that is not theirs, a witness who saw something, an accident on a river stair. The gallows does not have to wait three years.',
        },
      ],
    },
    {
      id: 'old_course',
      name: 'Old Course',
      max: 100,
      start: 70,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nothing the player remembers is reliable any more. The future is genuinely new, for better and worse, and the first life is only a story they tell themselves at night.',
      color: '#6C7A89',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The days have come loose from the last life. People say things the player has never heard them say, the remembered schedule is wrong more often than right, and the advantage of knowing is mostly gone. So is the certainty of the scaffold.',
        },
        {
          upTo: 60,
          behaviour:
            'Half and half. The big events still land where they landed, but the small ones wander: a conversation happens on a different stair, somebody arrives an hour late. The player’s memory is a good map with a few wrong roads on it.',
        },
        {
          upTo: 100,
          behaviour:
            'Everything is happening exactly as before, word for word. The player can finish people’s sentences, and they are walking the same road at the same pace toward the same green. Every remembered moment is accurate, including the last one.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'rope_mark',
      name: 'The Rope Mark',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'A thin raw line around your throat, exactly where the knot sat. It was not there when they locked you in last night. A high collar hides it. Anybody who has watched a hanging would know what it is.',
      loreText: 'It does not fade, scab or heal. The Hangman can tell whose knot made it from the mark alone.',
      icon: 'rope',
    },
    {
      id: 'your_signet',
      name: 'Your Signet Ring',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A heavy silver ring cut with your arms. It seals your orders, your letters and your word. Last time, at the Feast of Oaths, you knelt and put it in the Prince’s hand, as a prince’s captain does.',
      loreText: 'Three years from now, three letters to the Duke of Esk were sealed with it. You never wrote them, and you never saw the ring again after the feast.',
      icon: 'ring',
    },
    {
      id: 'the_warrant',
      name: 'The Warrant, From Memory',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Four pages in Isra’s hand, written before dawn: your death warrant word for word, with every item of evidence listed. Item one, a vial of nightbell in your sea chest. Item two, three letters under your seal. Item three, the sworn word of your sergeant.',
      loreText: 'At the bottom she has written the date of the hanging and underlined it twice. Under that, smaller and in a worse hand: Hob said the secretary paid him.',
      icon: 'letter',
    },
    {
      id: 'travel_purse',
      name: 'Isra’s Purse',
      tags: ['quest', 'money'],
      questItem: true,
      description:
        'A heavy leather purse with ninety crowns in gold: enough for a boat, a horse and a year somewhere else. Isra brought it for your escape.',
      loreText: 'Ninety crowns is two more than your sergeant owes the Drowned Lantern.',
      icon: 'coins',
    },
    {
      id: 'hobs_marker',
      name: 'Hob’s Marker',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A chalk slate from the back wall of the Drowned Lantern dice house: HOB GARROW, 88 CROWNS. Whoever holds the slate owns the debt, and in this city that means owning the man.',
      loreText: 'Last time a woman in a grey coat bought it on the second night. From then on, Hob did what he was asked.',
      icon: 'papers',
    },
    {
      id: 'ashcourt_ledger',
      name: 'Sabine’s Ledger',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The Prince’s household book, bound in grey cloth: wages, seed, wine, petitions paid. Every month, two ounces of nightbell, entered as blue dye for the vats. Ashcourt has no dye vats.',
      loreText: 'Six debts bought this year, each marked "loyalty, at His Highness’s word". There is room on the page for a seventh.',
      icon: 'book',
    },
    {
      id: 'nightbell_vial',
      name: 'A Vial of Nightbell',
      tags: ['quest', 'poison'],
      questItem: true,
      description:
        'A stoppered glass vial of blue liquid from the Prince’s stillroom, smelling faintly of honey. A drop a week brings on a shaking sickness that looks like old age. A spoonful stops a heart.',
      loreText: 'The same vial, or its twin, was found in your sea chest three years from now.',
      icon: 'vial',
    },
    {
      id: 'wine_flask',
      name: 'A Flask of the King’s Wine',
      tags: ['quest', 'evidence'],
      questItem: true,
      description:
        'Drawn from the seventh-day cask of Ashcourt wine in the King’s cellar, the bung still sealed in the Prince’s green wax. Under the wine it smells faintly of honey.',
      loreText: 'A physician who knew to look would find nightbell in it. None of the King’s physicians knows to look.',
      icon: 'bottle',
    },
    {
      id: 'turning_knot',
      name: 'The Turning Knot',
      tags: ['quest', 'rope'],
      questItem: true,
      description:
        'A short length of pale hemp tied in a knot with too many turns, hung on a nail above the Hangman’s bench. He says nobody else in the city can tie it, and that he wishes he could not.',
      loreText: 'Tied right, on a wrongly hanged neck, it sends the condemned back to their last free morning. It works once for any neck.',
      icon: 'rope',
    },
    {
      id: 'captains_sword',
      name: 'Your Sword',
      tags: ['weapon'],
      skillModifiers: { swordwork: 1 },
      description: 'A plain soldier’s longsword with a grip worn to the shape of your hand. Your sergeant is supposed to keep it behind his desk while you are in a cell, oiled, and he has never been good at keeping things from his captain.',
      loreText: 'Last time you wore it at your own trial, peace-tied, because nobody thought to take it away.',
      icon: 'sword',
    },
    {
      id: 'isras_letters',
      name: 'Isra’s Letters',
      tags: ['personal', 'document'],
      skillModifiers: { courtcraft: 1 },
      description: 'A year of letters from your betrothed, tied with black ribbon. All of them from this life, and none of them about warrants.',
      loreText: 'The last one ends: "See you at the Feast. Wear the blue." Last time, you did.',
      icon: 'letter',
    },
    {
      id: 'favour_list',
      name: 'A List of Favours',
      tags: ['document'],
      skillModifiers: { legwork: 1 },
      description: 'Names along the river market in your own cramped hand, each with what you once did for them: a nephew let off, a stall kept, a fire put out.',
      loreText: 'Half of them were in the crowd yesterday. All of them saw who would not fire.',
      icon: 'papers',
    },
    {
      id: 'company_badge',
      name: 'The Company Badge',
      tags: ['personal'],
      skillModifiers: { command: 1 },
      description: 'A pewter badge of the Rivergate Company: a gate over water. Every soldier in the yard stands straighter when they see it.',
      loreText: 'Last time you gave it to your lieutenant when you joined the Prince’s guard. He was the first to testify to your good character.',
      icon: 'badge',
    },
  ],
  abilities: [
    {
      id: 'remember_it',
      name: 'Remember It',
      tags: ['sight'],
      description: 'Reach for what happened last time — who said what, where, and what came of it — and set it beside what is in front of you.',
      affordances: ['remember', 'what happened last time', 'think back', 'recall', 'last time', 'what happens next', 'remember the future'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'foresight', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_your_part',
      name: 'Play Your Old Part',
      tags: ['social'],
      description: 'Say and do exactly what you did last time, so the day goes where you know it goes.',
      affordances: ['play along', 'do what i did last time', 'say yes', 'accept', 'kneel', 'take the commission', 'go along with it'],
      costs: [{ resourceId: 'old_course', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lie_to_him',
      name: 'Lie Like a Courtier',
      tags: ['social'],
      description: 'Tell a smiling, plausible lie to someone who outranks you, and keep your face still while they believe it.',
      affordances: ['lie', 'bluff', 'pretend', 'deceive', 'tell him what he wants to hear', 'make something up', 'cover for it'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'suspicion', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'courtcraft', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_what_happened',
      name: 'Say What Happened',
      tags: ['social'],
      description: 'Tell someone the truth: that you were hanged three years from now, and woke up in a cell this morning.',
      affordances: ['tell the truth', 'tell them i was hanged', 'confess', 'explain', 'tell her everything', 'say it', 'come clean'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'suspicion', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_the_hard_question',
      name: 'Ask the Hard Question',
      tags: ['social'],
      description: 'Ask the one question nobody in the room wants asked, then stay quiet long enough to hear the answer.',
      affordances: ['ask her why', 'ask why she signed', 'press', 'demand an answer', 'ask him straight', 'ask directly', 'interrogate'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'draw_steel',
      name: 'Draw Steel',
      tags: ['combat'],
      description: 'Fight: a blade if you have one, fists if you do not, in a city where a knight drawing on anyone is news by noon.',
      affordances: ['attack', 'fight', 'draw my sword', 'strike', 'stab', 'punch', 'kill him', 'cut him down'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'suspicion', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'swordwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_ground',
      name: 'Stand Your Ground',
      tags: ['defensive'],
      description: 'Refuse. An order, an offer, a blow or a bribe: plant your feet and do not move.',
      affordances: ['refuse', 'say no', 'hold my ground', 'block', 'defend', 'stand firm', 'turn him down'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_unseen',
      name: 'Go Unseen',
      tags: ['movement'],
      description: 'Get from one place to another without being seen to: a hood, a back stair, a boat, a crowd.',
      affordances: ['sneak', 'slip away', 'hide', 'leave quietly', 'follow him', 'shadow her', 'escape'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'suspicion', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'shadowing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'turn_it_over',
      name: 'Turn It Over',
      tags: ['sight'],
      description: 'Search a room, a ledger, a cellar or a cart properly, for the thing the first life never let you see.',
      affordances: ['search', 'look through', 'go through the papers', 'investigate', 'check the cask', 'search the room', 'read the ledger'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'suspicion', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'legwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'rally_company',
      name: 'Call Out the Company',
      tags: ['social'],
      description: 'Call on the sixty soldiers of the Rivergate Company, who saw you refuse an order for them yesterday and would follow you anywhere.',
      affordances: ['call the company', 'rally the soldiers', 'call out the guard', 'gather my soldiers', 'order the company', 'muster'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'suspicion', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'MULTI',
      check: { attribute: 'presence', skillId: 'command', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_with_her',
      name: 'Stay Beside Them',
      tags: ['social'],
      description: 'Do not plan, do not explain and do not leave. Sit down beside someone and be there.',
      affordances: ['stay', 'sit with her', 'sit with him', 'hold her', 'say nothing', 'just be there', 'kiss her'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'speak_in_his_name',
      name: 'Speak in His Name',
      tags: ['social'],
      description: 'Give an order as the Prince’s captain, and watch doors open that he would never open for you.',
      affordances: ['in the prince’s name', 'by the prince’s order', 'use his name', 'pull rank', 'order them as his captain', 'show the commission'],
      costs: [{ resourceId: 'old_course', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'courtcraft', baseDc: 11 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['sworn_to_corvin'],
        lockedCopy: 'Nobody in this city takes an order from you in the Prince’s name. You have not knelt to him, and in this life you may never.',
      },
    },
    {
      id: 'see_the_line',
      name: 'See the Rope Line',
      tags: ['sight'],
      description: 'Look at someone the way the Hangman does, at the neck and the wrists, for the faint mark a turned death leaves.',
      affordances: ['look at her wrist', 'look for the mark', 'see the line', 'check his neck', 'look the way the hangman does', 'read the mark'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'rope_sense', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_knot'],
        lockedCopy: 'A red line round your own throat is all you know how to see. Someone who has tied a great many knots would have to show you what else to look for.',
      },
    },
  ],
  locations: [
    {
      id: 'watergate_cells',
      name: 'The Rivergate Cells',
      shortName: 'The Cells',
      description:
        'Six stone cells under the river gate: wet straw, a slit window at the height of the water, and a turnkey’s desk with a pot of porridge on the brazier. A drain grate in the end cell opens onto the river steps. The stairs go up to the garrison yard.',
      artDirection:
        'Dim stone undercroft cells at dawn, grey light through a slit window, straw, iron bars, an open cell door, a desk with a brazier and a porridge pot, a ring of iron keys. Cold blue and ember orange.',
      connections: [
        { to: 'gatehouse_yard', travelMinutes: 2, label: 'Up the stairs to the yard' },
        { to: 'river_market', travelMinutes: 4, label: 'Through the drain grate to the river steps' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'captains_sword', qty: 1, ownerId: 'hob', aka: ['my sword', 'sword', 'the blade'] },
        { itemId: 'travel_purse', qty: 1, ownerId: 'isra', aka: ['purse', 'her purse', 'the money', 'the gold'] },
      ],
    },
    {
      id: 'gatehouse_yard',
      name: 'The Rivergate Yard',
      shortName: 'The Yard',
      description:
        'The garrison yard above the cells: a drill square, the company barracks, a gate down to the river market and a road up into the city. Sixty soldiers who were told yesterday to fire on a crowd, and were not made to.',
      artDirection:
        'Fortified river gatehouse courtyard in morning light, a drill square, soldiers in grey-blue surcoats, racked crossbows, a heavy gate open onto a crowded quay below. Stone, iron, damp banners.',
      connections: [
        { to: 'watergate_cells', travelMinutes: 2, label: 'Down to the cells' },
        { to: 'river_market', travelMinutes: 3, label: 'Out through the river gate' },
        { to: 'tollmarket_green', travelMinutes: 10, label: 'Up the hill into the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'company_badge', qty: 1, ownerId: null, aka: ['badge', 'company badge', 'the pewter badge'] },
      ],
    },
    {
      id: 'river_market',
      name: 'The River Market',
      shortName: 'The Market',
      description:
        'A long cobbled quay of bread stalls, fish tubs and boats tied three deep. Yesterday there was a riot here over the price of a loaf. Today the stalls are open, the bakers are watching the gate, and a boatman at the river steps is waiting for someone.',
      artDirection:
        'Busy riverside market quay at morning, bread stalls with empty shelves, fish tubs, moored boats, a river gate looming above, wary crowds. Wet cobbles, grey river, warm bread light.',
      connections: [
        { to: 'gatehouse_yard', travelMinutes: 3, label: 'Back through the river gate' },
        { to: 'drowned_lantern', travelMinutes: 3, label: 'Down the alley to the dice house' },
        { to: 'tollmarket_green', travelMinutes: 12, label: 'Up the long steps to the square' },
        { to: 'south_road', travelMinutes: 25, label: 'A boat downriver, out of the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'drowned_lantern',
      name: 'The Drowned Lantern',
      shortName: 'Dice House',
      description:
        'A low dice house under the quay, lit by lanterns sunk in water barrels. Chalk slates of debts line the back wall, and the biggest belongs to a sergeant. The house sells a slate when it gives up on the man.',
      artDirection:
        'Low smoky gambling den under a stone quay, lanterns glowing inside water barrels, dice tables, a back wall of chalk slates, hunched players. Green-gold light, deep shadows.',
      connections: [{ to: 'river_market', travelMinutes: 3, label: 'Back up to the quay' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'hobs_marker', qty: 1, ownerId: null, aka: ['marker', 'the slate', 'hob’s debt', 'the debt'] },
      ],
    },
    {
      id: 'south_road',
      name: 'The South Road',
      shortName: 'South Road',
      description:
        'Beyond the last mooring the river widens and the road follows it south toward the border hills. Nobody here knows your face. But the city’s bells carry a long way down the water, the boatman rows back up every evening with news, and what you left behind is still happening without you: a sergeant blamed for an open cell, a king whose hands shake, a woman with a stolen key.',
      artDirection:
        'Open river valley road at sunrise, a small boat drawn up on a shingle bank, a dirt road running south into green hills, the walled city small and far behind. Wide sky, gold and pale blue.',
      connections: [{ to: 'river_market', travelMinutes: 25, label: 'Back upriver to the city' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 3 },
    },
    {
      id: 'tollmarket_green',
      name: 'Tollmarket Green',
      shortName: 'The Green',
      description:
        'The city’s central square: market crosses, the toll house, and a patch of trampled grass with a gallows on it. The gallows is empty this morning. The last time you stood here, it was not.',
      artDirection:
        'Large old city square with a bare timber gallows with no rope or noose on a trampled green, market crosses, a stone toll house, crowds keeping their distance from the scaffold. Overcast, heavy timber, pigeons.',
      connections: [
        { to: 'gatehouse_yard', travelMinutes: 10, label: 'Down the hill to the Rivergate' },
        { to: 'river_market', travelMinutes: 12, label: 'Down the long steps to the river' },
        { to: 'hangmans_house', travelMinutes: 1, label: 'The narrow house at the edge of the green' },
        { to: 'hall_of_pleas', travelMinutes: 5, label: 'Across to the Hall of Pleas' },
        { to: 'vane_house', travelMinutes: 8, label: 'The quiet street to the Vane house' },
        { to: 'the_crownhold', travelMinutes: 12, label: 'Up to the palace' },
        { to: 'ashcourt', travelMinutes: 15, label: 'Up to the Prince’s house' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'hangmans_house',
      name: 'The Hangman’s House',
      shortName: 'Hangman’s',
      description:
        'A narrow house on the edge of the green with its shutters always open. Coils of rope hang on pegs along the wall. There is a bench for measuring, a kettle, and one chair for visitors that nobody takes.',
      artDirection:
        'Narrow timber house interior, neat coils of pale rope on wall pegs, a long workbench, a kettle on a small stove, one empty wooden chair, the bare gallows frame visible through an open shutter, no rope.',
      connections: [{ to: 'tollmarket_green', travelMinutes: 1, label: 'Back out onto the green' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'turning_knot', qty: 1, ownerId: 'tull', aka: ['knot', 'the knot', 'the hemp', 'the turning knot'] },
      ],
    },
    {
      id: 'hall_of_pleas',
      name: 'The Hall of Pleas',
      shortName: 'The Court',
      description:
        'The Crown’s court: a cold stone hall with a public gallery, a dock, and the long table where the Crown’s Advocate stands. You were tried here. Isra’s chambers are up the back stair, with a warrant box on the wall.',
      artDirection:
        'Cold vaulted stone courtroom, a raised bench, a wooden dock, a packed public gallery, tall narrow windows, an advocate’s long table piled with papers. Austere grey and black with one red banner.',
      connections: [{ to: 'tollmarket_green', travelMinutes: 5, label: 'Back out to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
    },
    {
      id: 'vane_house',
      name: 'The Vane House',
      shortName: 'Vane House',
      description:
        'A tall, quiet townhouse full of law books, with a walled garden and a fig tree. Isra’s room is at the top, her desk under the window, and this morning it is covered in pages written in a hurry before dawn.',
      artDirection:
        'Elegant narrow townhouse study at the top of a house, shelves of law books, a desk under a window covered in hurried handwritten pages, a fig tree in a walled garden below. Candlelight going grey with dawn.',
      connections: [{ to: 'tollmarket_green', travelMinutes: 8, label: 'Back down to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'the_warrant', qty: 1, ownerId: 'isra', aka: ['the list', 'her list', 'the pages', 'the warrant'] },
      ],
    },
    {
      id: 'the_crownhold',
      name: 'The Crownhold',
      shortName: 'The Palace',
      description:
        'The old King’s palace on the hill: a great hall hung with the banners of every reign, a high table on a dais, the King’s private cellar under it, and a sickroom where an old man’s hands will not stop shaking.',
      artDirection:
        'Grand medieval palace great hall, long banners of many reigns, a high table on a dais, torchlight, a stair down to a vaulted wine cellar with casks sealed in green wax. Gold, crimson and stone.',
      connections: [
        { to: 'tollmarket_green', travelMinutes: 12, label: 'Down into the city' },
        { to: 'ashcourt', travelMinutes: 6, label: 'Across the palace gardens to Ashcourt' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [
        { itemId: 'wine_flask', qty: 1, ownerId: null, aka: ['wine', 'the wine', 'a flask', 'the cask'] },
      ],
    },
    {
      id: 'ashcourt',
      name: 'Ashcourt',
      shortName: 'Ashcourt',
      description:
        'The Prince’s house beside the palace gardens: a long room full of petitioners, a counting room where his secretary keeps the books, and a glasshouse he tends himself, warm and green all year. A door at the back of the glasshouse is always kept shut.',
      artDirection:
        'Handsome royal townhouse with a great Victorian-style glasshouse, lush green plants and blue flowers under glass, a long petition room, a tidy counting room with ledgers. Warm green light, brass and glass.',
      connections: [
        { to: 'tollmarket_green', travelMinutes: 15, label: 'Down into the city' },
        { to: 'the_crownhold', travelMinutes: 6, label: 'Across the gardens to the palace' },
        { to: 'ashcourt_stillroom', travelMinutes: 2, lockedByFlag: 'found_the_stillroom', label: 'The shut door behind the glasshouse' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [
        { itemId: 'ashcourt_ledger', qty: 1, ownerId: 'sabine', aka: ['ledger', 'the ledger', 'the books', 'the grey book'] },
      ],
    },
    {
      id: 'ashcourt_stillroom',
      name: 'The Stillroom',
      shortName: 'Stillroom',
      description:
        'A windowless brick room behind the glasshouse: drying racks of small blue flowers, a copper still, stoppered vials in rows, and a cushioned stool where the Prince sits to work. It smells of honey, and of something under the honey.',
      artDirection:
        'Small windowless brick stillroom lit by one lamp, racks of drying blue flowers, a copper still, neat rows of stoppered blue glass vials, a cushioned stool. Warm amber light, deep blue accents, quiet menace.',
      connections: [{ to: 'ashcourt', travelMinutes: 2, label: 'Back through the glasshouse' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 4 },
      takeableItems: [
        { itemId: 'nightbell_vial', qty: 1, ownerId: 'corvin', aka: ['vial', 'the poison', 'nightbell', 'the blue vial'] },
      ],
    },
  ],
  /**
   * The Crown's law is first on purpose: public violence costs standing with
   * the first faction in array order, and in this city a knight drawing steel
   * is the Crown's business before it is anybody else's.
   */
  factions: [
    {
      id: 'faction_crown',
      name: 'The Crown’s Law',
      description:
        'King Osric’s courts, the Watch and the Hall of Pleas. It hangs bread thieves on Tollmarket Green, and three years from now it hanged you, entirely by the book. Isra Vane is its sharpest advocate.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'A knight in disgrace' },
        { atReputation: 30, label: 'Heard in court' },
        { atReputation: 60, label: 'Believed' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_ashcourt',
      name: 'The Prince’s House',
      description:
        'Prince Corvin’s household and the reformers who follow him: granaries, lower tolls, no more hangings for bread. Generous, clever, beloved, and very good at deciding who is useful.',
      startingReputation: 25,
      ranks: [
        { atReputation: 0, label: 'Admired from a distance' },
        { atReputation: 35, label: 'One of his' },
        { atReputation: 70, label: 'In the glasshouse' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_watergate',
      name: 'The Rivergate Company',
      description:
        'Sixty soldiers who hold the river gate and police the market below it. Your company. Yesterday you refused an order on their behalf, and every one of them knows it.',
      startingReputation: 40,
      ranks: [
        { atReputation: 0, label: 'Their old captain' },
        { atReputation: 40, label: 'Their captain' },
        { atReputation: 75, label: 'Followed anywhere' },
      ],
      allies: ['faction_river'],
      enemies: [],
    },
    {
      id: 'faction_river',
      name: 'The River Market',
      description:
        'Bakers, fishwives, boatmen and dockhands. Yesterday they were the crowd. They know who would not fire on them, and they know every boat out of the city and every back stair in it.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'A soldier' },
        { atReputation: 35, label: 'The one who would not fire' },
        { atReputation: 70, label: 'Hidden by anyone' },
      ],
      allies: ['faction_watergate'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'isra',
      name: 'Lady Isra Vane',
      calledName: 'Isra',
      role: 'The Crown’s Advocate and your betrothed. She signed your death warrant, and this morning she broke you out',
      cardBlurb:
        'She prosecuted you, signed your warrant and read it aloud at the gallows. This morning she is at your cell with a stolen key, and she remembers every word she said.',
      pronouns: 'she/her',
      publicTraits: ['Exact about everything', 'Unshakeable in court', 'Wears one long black glove and will not say why'],
      hiddenDrives: [
        'She needs to be punished by the one person entitled to do it, and is afraid you will be kind instead',
        'She would rather you were in a boat and hated her than in the city and dead',
      ],
      values: [
        'Evidence that would stand up in front of anyone',
        'Saying the charge to the face of the accused, never behind them',
      ],
      fears: [
        'That you will kill the Prince and hand the court a true reason to hang you',
        'That, shown the same evidence, she would sign it again',
      ],
      socialStyle:
        'States the hard thing first and the feeling last, if at all. Stands very straight, keeps her gloved hand behind her back, and only sits down when she has lost an argument.',
      boundaries: [
        'Will not lie under oath or in court, even to save you. She will find another way, or none',
        'Will not ask to be forgiven. If it is offered, she will make you say it twice',
      ],
      goals: [
        'Get you out of the city before nine o’clock, the way it did not happen last time',
        'Find something that would have stood up in court three years from now, and put it before a court now',
      ],
      secrets: [
        {
          id: 'isra_why_she_signed',
          fact: 'She signed the warrant because the evidence was complete and she believed it, and because if the Crown’s Advocate stepped aside for love the case would have gone to a man who would have hanged you faster. She read it aloud at the gallows herself so the last voice you heard would be one that loved you. She has never decided whether that was mercy or vanity.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you ask her straight, once she trusts you to hear it without walking out.',
        },
        {
          id: 'isra_the_knot',
          fact: 'The night before the hanging Hob confessed to her that the Prince’s secretary had paid him to plant the vial. She took it to Corvin, who thanked her and did nothing, and the hanging went ahead. At midnight she went to the Hangman and begged him to tie the turning knot, a story she had read in an old case file. She did not believe it would work.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She names the Hangman if you have told her your side of last time and she has seen you at the foot of the gallows.',
        },
        {
          id: 'isra_the_wrist',
          fact: 'Under the black glove a thin red line circles her right wrist: the hand that signed the warrant goes back with the neck. It appeared at four this morning and it does not fade either.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Someone who has learned to see a rope line will see it through the glove. Otherwise she takes the glove off only for a person she has stopped being afraid of.',
        },
      ],
      speechStyle:
        'Clipped, exact and legal. Numbers her points, states the charge before the feeling, and never uses a word she could not defend in court. When she breaks, it is one unguarded sentence, and then she goes straight back to the list.',
      topics: ['the warrant', 'the evidence', 'last time', 'the boat', 'the Hangman', 'your betrothal', 'her glove'],
      voiceSamples: [
        'Item one: a vial of nightbell in your sea chest. Item two: three letters under your seal. Item three: your sergeant. Ask me which one I believed first.',
        'There is a boat at the river steps until the seven o’clock bell. After that the gate opens, and so do the eyes on it.',
        'For the record, I believed it. All of it. I want you to have that from me and not from somebody kinder.',
        'Hate me in a boat. Please. I can live with that one.',
        'Do not thank me. Shout at me. Then let me work.',
      ],
      appearance:
        'An adult woman, slim and very straight-backed, black hair cut sharp at the jaw, grey eyes, a hooded charcoal cloak over an advocate’s long black coat with a high white collar, ink on the side of her left hand, and one long black glove on her right hand only, buttoned to the elbow.',
      visualHook: 'One long black glove on her right hand only, buttoned to the elbow, which she never takes off.',
      silhouette: 'Very straight and narrow in a hooded cloak, one gloved hand held behind her back.',
      artSeed: 'gallows-isra-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'guarded', 'grieving', 'softened', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'vane_house', activity: 'at her desk, writing down everything she remembers before it fades' },
        { startMinute: 300, endMinute: 480, locationId: 'watergate_cells', activity: 'at the Rivergate, where she came for you at first light' },
        { startMinute: 480, endMinute: 1080, locationId: 'hall_of_pleas', activity: 'in her chambers at the Hall of Pleas, prosecuting other people’s cases' },
        { startMinute: 1080, endMinute: 1260, locationId: 'vane_house', activity: 'at her father’s dinner table, saying very little' },
        { startMinute: 1260, endMinute: 1440, locationId: 'tollmarket_green', activity: 'walking the square past the empty gallows, which she cannot stop doing' },
      ],
      homeLocationId: 'vane_house',
      knowledgeScope: ['first_life', 'the_warrant', 'the_evidence', 'the_hangman', 'hall_of_pleas', 'the_betrothal', 'vellmark_law'],
      startingRelationship: { trust: 50, affection: 75, respect: 55, fear: 15, rivalry: 0 },
      gates: [
        {
          id: 'isra_names_the_hangman',
          label: 'She tells you who tied the knot',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['compared_notes'] },
        },
        {
          id: 'isra_takes_off_the_glove',
          label: 'She shows you her wrist',
          kind: 'TRUST',
          requires: { trust: 62, flagsSet: ['heard_her_out'] },
        },
        {
          id: 'isra_this_time',
          label: 'She lets herself be kissed, this time',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 80, flagsSet: ['forgave_her'] },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 16, presence: 14, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 24, defenseDc: 11, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'corvin',
      name: 'Prince Corvin',
      calledName: 'Corvin',
      role: 'The King’s only son and heir. Reformer, gardener, and the man who comes down to your cell at nine',
      cardBlurb:
        'He is the most loved man in the city, he admires you for refusing to fire on the bakers, and at nine o’clock he will offer you the captaincy that, last time, ended on a scaffold.',
      pronouns: 'he/him',
      publicTraits: ['Warm, funny, and remembers everyone’s name', 'Grows things in a glasshouse with his own hands', 'Wants the bread hangings ended'],
      hiddenDrives: [
        'He has decided his father has to die for the city to live, and he decided it calmly, in the spring, with a pruning knife in his hand',
        'He chose you to hang for it on the night of the riot, because a court will believe a knight who refused one order would refuse a king, and he genuinely likes you, which he counts as a price he is paying',
      ],
      values: ['A city where nobody hangs for bread', 'Doing the ugly thing with his own hands rather than ordering it'],
      fears: ['Becoming his father: old, frightened and hanging people', 'Being loved by people who would stop if they knew'],
      socialStyle:
        'Arrives alone and on foot where a prince would send guards. Touches shoulders, uses first names at once, asks after people’s families, and is always the most relaxed person in the room.',
      boundaries: [
        'Will not do violence in public or raise his voice, ever. A man who shouts is a man people remember',
        'Will not move against Isra Vane while her family is useful to the Crown, and they are always useful',
        'Will not confess, not even to someone who already knows',
      ],
      goals: ['Make you captain of his guard by noon, as planned', 'Keep the seventh-day cask going up to his father until the spring after next'],
      secrets: [
        {
          id: 'corvin_the_cask',
          fact: 'He brews nightbell in the stillroom behind his glasshouse and puts a few drops in the cask of Ashcourt wine he sends his father every seventh day. The shaking sickness is him. The last dose is planned for three years from now.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Never from his mouth to an enemy. It is found: the stillroom, the ledger, the wine. He says it aloud only to someone who has joined him and speaks in his name.',
        },
        {
          id: 'corvin_the_choice',
          fact: 'He picked the player for the scaffold the night of the bread riot, the moment he heard the name of the knight who refused. Sabine buying Hob’s marker is the first payment on it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Sabine’s ledger shows the payment, and Hob will name who made it once he is free of the debt.',
        },
      ],
      speechStyle:
        'Easy, quick and warm. Jokes at his own expense, uses first names at once, and reaches for garden words (grafting, pruning, rootstock, frost) whenever he talks about the kingdom. Never raises his voice; he gets quieter when he is crossed.',
      topics: ['the bread riot', 'his glasshouse', 'the captaincy', 'his father', 'the Feast of Oaths', 'the granaries'],
      voiceSamples: [
        'My father wants you flogged. I’d rather you guarded me. Say yes before I come to my senses.',
        'You can’t graft onto dead rootstock. Somebody has to cut. I only wish it weren’t always a gardener.',
        'Call me Corvin. Everyone who matters does, and everyone who doesn’t is too frightened to.',
        'Frost comes when it comes. The trick is being the one holding the blanket.',
        'Sit. Eat something. You look like someone who’s seen how a story ends.',
      ],
      appearance:
        'An adult man, tall and easy in his body, sandy hair cut short, hazel eyes, a broad warm smile, a plain green coat over an open-necked linen shirt, soil on the cuffs and under his fingernails, and no crown or chain anywhere on him.',
      visualHook: 'Soil under his fingernails and on his cuffs, always, even at a feast.',
      silhouette: 'Long-legged and relaxed, hands in his coat pockets, head tipped as if listening.',
      artSeed: 'gallows-corvin-01',
      portrait: null,
      expressions: ['warm', 'amused', 'interested', 'cold', 'calculating'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'ashcourt', activity: 'in the glasshouse before dawn, tending the night-blooming beds' },
        { startMinute: 360, endMinute: 600, locationId: 'ashcourt', activity: 'breakfast and petitions in the long room' },
        { startMinute: 600, endMinute: 840, locationId: 'the_crownhold', activity: 'at his father’s bedside, then at the council table' },
        { startMinute: 840, endMinute: 1080, locationId: 'river_market', activity: 'walking the river market without guards, being seen' },
        { startMinute: 1080, endMinute: 1440, locationId: 'ashcourt', activity: 'dinner with his reformers, then the glasshouse again' },
      ],
      homeLocationId: 'ashcourt',
      knowledgeScope: ['vellmark_court', 'the_bread_riot', 'the_granaries', 'ashcourt', 'nightbell', 'the_feast_of_oaths'],
      startingRelationship: { trust: 35, affection: 40, respect: 60, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'corvin_the_glasshouse',
          label: 'He takes you into the glasshouse',
          kind: 'ALLIANCE',
          requires: { trust: 50, flagsSet: ['sworn_to_corvin'] },
        },
        {
          id: 'corvin_says_it',
          label: 'He tells you what goes in the cask',
          kind: 'OTHER',
          requires: { trust: 75, flagsSet: ['joined_corvin'] },
        },
      ],
      attributes: { might: 11, agility: 13, mind: 16, presence: 17, resolve: 14, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 6, tags: ['fencer', 'royal'] },
    },
    {
      id: 'hob',
      name: 'Sergeant Hob Garrow',
      calledName: 'Hob',
      role: 'Your old sergeant, now turnkey of the Rivergate cells. Asleep at his desk when the story starts',
      cardBlurb:
        'He carried you off a battlefield once and has been proud of you ever since. Three years from now he will swear he saw you with the poison, and right now he owes eighty-eight crowns he cannot pay.',
      pronouns: 'he/him',
      publicTraits: ['Loyal and loud about it', 'Cooks for the prisoners on his own coin', 'Drinks more than he admits'],
      hiddenDrives: [
        'He is ashamed of the debt and would sooner lose the post than ask you for money',
        'He wants one more chance to be useful to somebody he respects',
      ],
      values: ['Feeding people', 'Leaving nobody behind on a field'],
      fears: ['Losing the post and ending up in his own cells', 'That the fight in him is gone and only the drink is left'],
      socialStyle:
        'Talks with his mouth full and his boots on the desk. Calls everybody by their rank. Delivers bad news by offering you something to eat first.',
      boundaries: [
        'Will not take money from you. You would have to go around him to clear the debt',
        'Will not lay a hand on a prisoner, whoever gives the order',
      ],
      goals: ['Clear his marker at the Drowned Lantern before the house sells it', 'Keep the post until his pension'],
      secrets: [
        {
          id: 'hob_the_marker',
          fact: 'He owes eighty-eight crowns at the Drowned Lantern. He has not told anyone, and he does not know that tomorrow night the house will sell the slate to a woman in a grey coat.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if you sit and eat with him and do not offer him money.',
        },
        {
          id: 'hob_saw_the_hood',
          fact: 'He was awake when the hooded woman lifted his keys at dawn. He kept his eyes shut, because he guessed it was the Advocate and thought his captain deserved a way out.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If he is blamed for the open cell and you come back for him, he tells you with a wink.',
        },
      ],
      speechStyle:
        'Barrack-room plain, cheerful and loud. Calls the player Captain every single time. Talks about food, feet and weather, and hides bad news inside a joke.',
      topics: ['the porridge', 'the border war', 'his missing fingers', 'the dice house', 'the company', 'his knee'],
      voiceSamples: [
        'Captain! You’re up. There’s porridge, and it’s hot, and that’s the best news this building’s had all week.',
        'Two fingers, Captain. Left them on the border. Still count to eight on the rest.',
        'Rain tonight. My knee says so, and my knee’s never lost a bet. Pity about the rest of me.',
        'Eat first. Bad news keeps. Porridge doesn’t.',
      ],
      appearance:
        'An older man, broad and barrel-chested, a short grey beard, a brown soldier’s coat gone shiny at the elbows, two fingers missing from the left hand, and a ring of iron keys and a wooden ladle on his belt.',
      visualHook: 'Two fingers missing from his left hand, and a ladle stuck through his belt beside the keys.',
      silhouette: 'Wide and rounded, boots up on a desk, chin on his chest.',
      artSeed: 'gallows-hob-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'guilty', 'tired', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'watergate_cells', activity: 'at the turnkey’s desk, dozing with his boots up' },
        { startMinute: 420, endMinute: 720, locationId: 'watergate_cells', activity: 'cooking porridge for the prisoners on his own coin' },
        { startMinute: 720, endMinute: 1080, locationId: 'gatehouse_yard', activity: 'in the yard, telling the new soldiers about the border' },
        { startMinute: 1080, endMinute: 1440, locationId: 'drowned_lantern', activity: 'at the dice tables, losing slowly' },
      ],
      homeLocationId: 'watergate_cells',
      knowledgeScope: ['the_watergate', 'the_company', 'the_border_war', 'the_dice_house', 'the_player_as_a_soldier'],
      startingRelationship: { trust: 70, affection: 75, respect: 70, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hob_owns_up',
          label: 'He tells you about the marker',
          kind: 'TRUST',
          requires: { trust: 75, flagsSet: ['spoke:hob'] },
        },
        {
          id: 'hob_stands_up',
          label: 'He will stand up in court for you',
          kind: 'ALLIANCE',
          requires: { trust: 80, flagsSet: ['hob_debt_paid'] },
        },
      ],
      attributes: { might: 14, agility: 9, mind: 10, presence: 12, resolve: 11, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 38, defenseDc: 12, damage: 7, tags: ['veteran'] },
    },
    {
      id: 'sabine',
      name: 'Sabine Orrel',
      role: 'Prince Corvin’s private secretary. Keeps his ledgers, his diary and his debts',
      cardBlurb:
        'She grew up in the river market you refused to fire on, she prices everything out loud, and somewhere in her grey ledger is a line she has been trying not to read since spring.',
      pronouns: 'she/her',
      publicTraits: ['Prices everything out loud', 'Dry, fast and impossible to flatter', 'Never forgets a face from the river market'],
      hiddenDrives: [
        'She would do anything for the prince who promised no more hangings for bread, and has never let herself ask what anything covers',
        'Her older brother was hanged at twenty-four on the green for a sack of flour twelve years ago, and she has watched the gallows from Ashcourt’s windows every day since',
      ],
      values: ['Paying what is owed, on the day it is owed', 'A city where the river market eats'],
      fears: ['Finding out what she has been buying', 'Going back to the river with nothing'],
      socialStyle: 'Speaks while writing. Prices everything out loud. Looks up only once she has decided you are worth the time.',
      boundaries: [
        'Will not open the ledger for anyone without the Prince’s word, or proof that he lied to her',
        'Will not set foot on Tollmarket Green',
      ],
      goals: ['Buy the Rivergate turnkey’s marker before the dice house sells it elsewhere', 'Get the granary bill through the council before winter'],
      secrets: [
        {
          id: 'sabine_the_markers',
          fact: 'Corvin tells her to buy debts as loyalty insurance, and she has done it six times this year. She does not know what any of those men will be asked to do.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if you can show her one other thing the Prince lied to her about.',
        },
        {
          id: 'sabine_the_dye',
          fact: 'She signs for two ounces of nightbell every month, entered as blue dye for the vats. Ashcourt has no dye vats. She noticed in the spring, wrote it in the margin, and did nothing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the margin if you name nightbell to her before she does.',
        },
      ],
      speechStyle:
        'Dry, quick and in figures. Turns everything into a price or a date. Short sentences with the sum at the end, and a river-market vowel she cannot quite iron out when she is angry.',
      topics: ['the ledger', 'the granary bill', 'her brother', 'the river market', 'the Prince’s debts', 'the dye order'],
      voiceSamples: [
        'Eighty-eight crowns. A sergeant’s whole year, written on one slate. Somebody should have stopped him at forty.',
        'Granaries cost money. Gallows cost rope. Guess which one the council funds.',
        'My brother cost the Crown a sack of flour. The Crown charged him the full price.',
        'Sign here. And here. Don’t read it, nobody does. That’s rather the point of me.',
      ],
      appearance:
        'An adult woman, wiry and quick, brown hair pinned flat under a grey cap, sharp dark eyes, a grey wool coat buttoned to the throat with ink-stained cuffs, and a fat ledger bound in grey cloth clamped under one arm.',
      visualHook: 'A fat ledger bound in grey cloth, clamped under one arm at all times.',
      silhouette: 'Narrow and upright, head down over an open book, pen moving.',
      artSeed: 'gallows-sabine-01',
      portrait: null,
      expressions: ['neutral', 'unimpressed', 'calculating', 'shaken', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'ashcourt', activity: 'in her room above the counting room, lamp still lit' },
        { startMinute: 360, endMinute: 780, locationId: 'ashcourt', activity: 'at the counting-room desk, paying the household' },
        { startMinute: 780, endMinute: 1020, locationId: 'the_crownhold', activity: 'at the council clerks’ table, chasing the granary bill' },
        { startMinute: 1020, endMinute: 1260, locationId: 'ashcourt', activity: 'back at the ledger, entering the day' },
        { startMinute: 1260, endMinute: 1440, locationId: 'drowned_lantern', activity: 'doing the Prince’s buying in places he never goes' },
      ],
      homeLocationId: 'ashcourt',
      knowledgeScope: ['ashcourt', 'the_ledger', 'the_river_market', 'the_granary_bill', 'the_prince_household'],
      startingRelationship: { trust: 10, affection: 10, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sabine_opens_the_ledger',
          label: 'She shows you the margin',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:nightbell'] },
        },
        {
          id: 'sabine_testifies',
          label: 'She will say it in court',
          kind: 'ALLIANCE',
          requires: { trust: 65, flagsSet: ['sabine_talked'] },
        },
      ],
      attributes: { might: 8, agility: 12, mind: 16, presence: 12, resolve: 13, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 10, damage: 2, tags: ['civilian'] },
    },
    {
      id: 'tull',
      name: 'Hangman Tull',
      calledName: 'Tull',
      role: 'Hangman of Vellmark for forty-one years, and one of three people who remember the morning you died',
      cardBlurb:
        'He hanged you, three years from now, and he remembers doing it. He would like you to understand what your second morning cost somebody before you waste it.',
      pronouns: 'he/him',
      publicTraits: ['Gentle with the condemned', 'Measures everything twice', 'Nobody sits near him in a tavern'],
      hiddenDrives: [
        'He has tied the turning knot three times in forty-one years and wants to know, once, that one of them was worth it',
        'He would like to give up the trade and retire, and nobody has ever asked him to',
      ],
      values: ['An honest morning for the condemned', 'Telling the condemned the truth about what will happen'],
      fears: ['That his hands will start to shake before he can give up the trade', 'Tying a fourth one'],
      socialStyle: 'Looks at your neck before your face. Speaks low and kindly, as he does on the scaffold, and never hurries anybody.',
      boundaries: [
        'Will not tie the turning knot for any neck twice. There is no third morning',
        'Will not hang anyone he has been told is innocent, and will say so to the Crown’s face',
      ],
      goals: ['See the second morning used for something', 'Give up the hangman’s office before his hands go'],
      secrets: [
        {
          id: 'tull_the_knot',
          fact: 'The turning knot is a hangman’s story nobody believes. Tied right on a wrongly hanged neck, it sends the condemned back to their last free morning, and the hand that signed the warrant goes back with them, so that somebody has to remember. The one who ties it goes too.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He explains it to a player who comes to his house, shows him the mark and asks him plainly.',
        },
        {
          id: 'tull_the_price',
          fact: 'Each turning has taken something of his own and not given it back. The first took his mother’s voice, the second his wife’s face. He does not yet know what this one took, and he is checking every morning.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to someone who sits with him and does not ask for anything.',
        },
      ],
      speechStyle:
        'Low, slow and kind: the voice he uses on the scaffold. Talks in the plain words of his trade, rope, timber and weather, and never in the mechanics of a drop. Gallows humour so dry it takes a moment to land.',
      topics: ['the knot', 'the rope mark', 'the first life', 'his trade', 'the Advocate', 'the price'],
      voiceSamples: [
        'Everyone thinks it’s the drop. It’s the knot. Always the knot.',
        'Sit down, captain. I tied that one. I’d know it in the dark.',
        'You didn’t look at the crowd. You looked at me. I’ve not forgotten that.',
        'Once per neck. I didn’t make the rule. I only learned it the expensive way.',
      ],
      appearance:
        'An older man, tall and stooped, long white hair tied back, a lined and patient face, a long brown leather coat, enormous careful rope-scarred hands, and a neat coil of pale hemp worn across one shoulder like a sash.',
      visualHook: 'Huge, gentle, rope-scarred hands, and a coil of pale hemp worn over one shoulder like a sash.',
      silhouette: 'Tall and bent like a gallows post, one hand always resting on the coil.',
      artSeed: 'gallows-tull-01',
      portrait: null,
      expressions: ['neutral', 'kind', 'grave', 'wry', 'sorrowful'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'hangmans_house', activity: 'at his bench, stretching rope by lamplight' },
        { startMinute: 420, endMinute: 720, locationId: 'tollmarket_green', activity: 'checking the gallows’ trap and beam, as every morning' },
        { startMinute: 720, endMinute: 1080, locationId: 'hangmans_house', activity: 'at home, mending, taking no visitors he does not like' },
        { startMinute: 1080, endMinute: 1320, locationId: 'river_market', activity: 'buying supper at the river stalls, where nobody charges him' },
        { startMinute: 1320, endMinute: 1440, locationId: 'hangmans_house', activity: 'at the open shutter, watching the empty scaffold' },
      ],
      homeLocationId: 'hangmans_house',
      knowledgeScope: ['first_life', 'the_turning_knot', 'the_hanging', 'tollmarket_green', 'the_hangmans_trade'],
      startingRelationship: { trust: 40, affection: 30, respect: 50, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tull_explains',
          label: 'He tells you what the knot does',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['met:tull'] },
        },
        {
          id: 'tull_stands_witness',
          label: 'He will stand up at the feast and say what he knows',
          kind: 'ALLIANCE',
          requires: { trust: 65, flagsSet: ['knows:the_knot'] },
        },
      ],
      attributes: { might: 15, agility: 9, mind: 13, presence: 11, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 46, defenseDc: 13, damage: 8, tags: ['executioner'] },
    },
  ],
  quests: [
    {
      id: 'q_walk_or_stay',
      title: 'Walk, or Stay',
      summary:
        'Isra is holding a cell door open before dawn with a stolen key. At nine o’clock, if you are still here, the Prince comes down the stairs to offer you everything again.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['isra', 'hob', 'corvin'],
      involvedLocationIds: ['watergate_cells', 'gatehouse_yard', 'river_market'],
      knownRewardCopy: 'A morning that goes differently from the last one, or exactly the same.',
      steps: [
        {
          id: 'the_cell_door',
          playerCopy: 'Decide what to do with an open cell door and a woman who remembers your death.',
          directorNotes:
            'She has a boat at the river steps until the seven o’clock bell and ninety crowns in a purse. Every response is legitimate: walk out with her, stay, interrogate her, wake Hob, take the key and lock her in. She argues for the boat in one sentence and then stops, because she does not believe she has the right to argue more. She answers any question about last time in the order of the warrant. Do not have her explain the knot yet.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'walked_with_her',
              label: 'Walk out with her before nine',
              predicate: { flagsSet: ['visited:river_market'], beforeWorldMinute: 540 },
              setsFlags: ['walked_out', 'with_isra'],
              closesFlags: ['stayed_like_last_time'],
            },
            {
              routeId: 'stayed_like_last_time',
              label: 'Sit back down and wait, like last time',
              predicate: { flagsSet: ['used:play_your_part'] },
              setsFlags: ['stayed_like_last_time'],
              closesFlags: ['walked_out'],
            },
            {
              routeId: 'made_her_talk',
              label: 'Make her tell you what she remembers',
              predicate: { flagsSet: ['used:ask_the_hard_question'], atLocation: 'watergate_cells' },
              setsFlags: ['stayed_to_talk', 'compared_notes'],
              closesFlags: [],
            },
            {
              routeId: 'told_her_your_side',
              label: 'Tell her your side of last time',
              predicate: { flagsSet: ['used:say_what_happened'], atLocation: 'watergate_cells' },
              setsFlags: ['compared_notes'],
              closesFlags: [],
            },
            {
              routeId: 'woke_the_sergeant',
              label: 'Wake your old sergeant',
              predicate: { flagsSet: ['spoke:hob'], atLocation: 'watergate_cells' },
              setsFlags: ['woke_hob'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:she_remembers'], abilities: [], reputation: [] },
        },
        {
          id: 'nine_oclock',
          playerCopy: 'Answer the Prince, or be somewhere he cannot ask.',
          directorNotes:
            'He comes down at nine exactly as he did, word for word, unless the player has changed something he can see. He is charming, alone and genuinely delighted. If the player has gone he finds an empty cell and a turnkey in trouble, and he becomes more interested, not less. He will not be provoked into anything in front of witnesses.',
          enterWhen: { flagsSet: ['knows:she_remembers'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_commission',
              label: 'Say yes, exactly as you did',
              predicate: { flagsSet: ['met:corvin', 'used:play_your_part'] },
              setsFlags: ['sworn_to_corvin', 'took_the_commission'],
              closesFlags: ['refused_the_commission'],
            },
            {
              routeId: 'took_it_lying',
              label: 'Say yes, and mean none of it',
              predicate: { flagsSet: ['met:corvin', 'used:lie_to_him'] },
              setsFlags: ['sworn_to_corvin', 'took_it_knowing'],
              closesFlags: ['refused_the_commission'],
            },
            {
              routeId: 'turned_him_down',
              label: 'Turn him down to his face',
              predicate: { flagsSet: ['met:corvin', 'used:stand_ground'] },
              setsFlags: ['refused_the_commission'],
              closesFlags: ['sworn_to_corvin'],
            },
            {
              routeId: 'missed_him',
              label: 'Be gone when he comes',
              predicate: { flagsSet: ['walked_out'], afterWorldMinute: 600 },
              setsFlags: ['refused_the_commission', 'deserter'],
              closesFlags: ['sworn_to_corvin'],
            },
            {
              routeId: 'drew_on_him',
              label: 'Go for his throat',
              predicate: { flagsSet: ['attacked:corvin'] },
              setsFlags: ['struck_the_prince'],
              closesFlags: ['sworn_to_corvin'],
            },
            {
              routeId: 'took_the_boat',
              label: 'Be on a boat downriver when he comes',
              predicate: { flagsSet: ['visited:south_road'] },
              setsFlags: ['left_the_map', 'refused_the_commission', 'deserter'],
              closesFlags: ['sworn_to_corvin'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['first_morning_over'],
            abilities: ['speak_in_his_name'],
            reputation: [{ factionId: 'faction_watergate', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_item_three',
      title: 'Item Three: Your Sergeant',
      summary:
        'Last time, your old sergeant swore in court that he saw you with the poison. Right now he owes eighty-eight crowns at a dice house, and tomorrow night somebody buys the debt.',
      kind: 'MAIN',
      involvedCharacterIds: ['hob', 'sabine'],
      involvedLocationIds: ['watergate_cells', 'drowned_lantern', 'river_market'],
      knownRewardCopy: 'A witness who was never bought, or the knowledge of exactly who bought him.',
      discoverWhen: { flagsSet: ['knows:she_remembers'] },
      steps: [
        {
          id: 'keep_him_unbought',
          playerCopy: 'Keep Hob from being bought.',
          directorNotes:
            'Hob is a good man with a bad slate, and he will not take money from the player. Paying the house directly works; telling him the truth works differently. If nobody acts, Sabine buys the marker on the second night at the Drowned Lantern, politely, and Hob never mentions it. That is not a failure state, it is the old course, and it means the player now knows the exact moment it happened.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_the_marker',
              label: 'Buy the slate yourself',
              predicate: { hasItems: ['hobs_marker'] },
              setsFlags: ['hob_debt_paid'],
              closesFlags: ['hob_bought'],
            },
            {
              routeId: 'told_him_everything',
              label: 'Tell him what he said in court, last time',
              predicate: { flagsSet: ['spoke:hob', 'used:say_what_happened'] },
              setsFlags: ['hob_warned'],
              closesFlags: [],
            },
            {
              routeId: 'he_was_bought',
              label: 'Let the grey coat buy him, and watch who sends her',
              predicate: { flagsSet: ['marker_sold'] },
              setsFlags: ['hob_bought'],
              closesFlags: ['hob_debt_paid'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['hob_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_watergate', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_who_built_it',
      title: 'Who Built the Gallows',
      summary:
        'A vial of nightbell, three letters under your seal, a bought witness. Somebody in this city is already building your gallows, and the first pieces go in this week.',
      kind: 'MAIN',
      involvedCharacterIds: ['sabine', 'corvin', 'isra'],
      involvedLocationIds: ['ashcourt', 'ashcourt_stillroom', 'the_crownhold'],
      knownRewardCopy: 'Something a court would have to hear, and the name behind it.',
      discoverWhen: { flagsSet: ['knows:she_remembers'] },
      steps: [
        {
          id: 'find_the_thread',
          playerCopy: 'Find out where the nightbell comes from.',
          directorNotes:
            'Three threads, all physical: Sabine’s ledger and its dye entries, the green-waxed cask in the King’s cellar, or Sabine herself. Each leads to the shut door behind the glasshouse. Nobody says the Prince’s name for the player; the trail does.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_ledger',
              label: 'Read Sabine’s ledger',
              predicate: { hasItems: ['ashcourt_ledger'] },
              setsFlags: ['found_the_stillroom', 'proof:ledger'],
              closesFlags: [],
            },
            {
              routeId: 'followed_the_cask',
              label: 'Follow the King’s wine back to where it is made',
              predicate: { flagsSet: ['used:turn_it_over', 'visited:the_crownhold'] },
              setsFlags: ['found_the_stillroom', 'followed_the_wine'],
              closesFlags: [],
            },
            {
              routeId: 'sabine_talked',
              label: 'Get Sabine Orrel to talk',
              predicate: { minRelationship: [{ characterId: 'sabine', dimension: 'trust', value: 50 }] },
              setsFlags: ['found_the_stillroom', 'sabine_talked'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['knows:nightbell'], abilities: [], reputation: [] },
        },
        {
          id: 'hold_the_proof',
          playerCopy: 'Get something into your hands that a court would have to hear.',
          directorNotes:
            'Isra knows exactly what a court needs, because she built the last case. A vial with the Prince’s stillroom on it, a sealed flask from the cask, or a secretary willing to swear: any one is enough to be heard, and each makes the Prince’s house far more watchful the moment it goes missing.',
          enterWhen: { flagsSet: ['knows:nightbell'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_vial',
              label: 'Take a vial from the stillroom',
              predicate: { hasItems: ['nightbell_vial'] },
              setsFlags: ['proof_in_hand', 'proof:vial'],
              closesFlags: [],
            },
            {
              routeId: 'drew_the_wine',
              label: 'Draw a flask from the cask, seal unbroken',
              predicate: { hasItems: ['wine_flask'], flagsSet: ['knows:nightbell'] },
              setsFlags: ['proof_in_hand', 'proof:wine'],
              closesFlags: [],
            },
            {
              routeId: 'sabine_will_swear',
              label: 'Get Sabine to swear to it',
              predicate: {
                flagsSet: ['sabine_talked'],
                minRelationship: [{ characterId: 'sabine', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['proof_in_hand', 'sabine_turned'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['knows:corvin'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_feast_of_oaths',
      title: 'The Feast of Oaths',
      summary:
        'In six days the court gathers in the Crownhold. Last time you knelt there, put your signet in the Prince’s hand and heard your betrothal announced, and the King drank the Prince’s wine.',
      kind: 'MAIN',
      involvedCharacterIds: ['corvin', 'isra', 'sabine'],
      involvedLocationIds: ['the_crownhold'],
      knownRewardCopy: 'The night the first life either repeats or breaks.',
      discoverWhen: { flagsSet: ['first_morning_over'] },
      steps: [
        {
          id: 'the_feast',
          playerCopy: 'Decide what happens in the Great Hall.',
          directorNotes:
            'The whole court, the King at the high table with his cup shaking, the green wax on the wine, a cushion set out for the new captain to kneel on. Whatever the player does here happens in front of everybody. An accusation without proof is a disgrace; an accusation with proof is a trial; steel is the gallows again unless the player has made very sure of the room.',
          enterWhen: { flagsSet: ['feast_of_oaths'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'accused_him',
              label: 'Accuse him in front of the court, with proof',
              predicate: { flagsSet: ['proof_in_hand', 'used:say_what_happened'], atLocation: 'the_crownhold' },
              setsFlags: ['corvin_accused', 'cup_stopped'],
              closesFlags: ['gave_the_seal'],
            },
            {
              routeId: 'stopped_the_cup',
              label: 'Keep the wine from the King’s mouth',
              predicate: { flagsSet: ['knows:nightbell'], atLocation: 'the_crownhold' },
              setsFlags: ['cup_stopped'],
              closesFlags: [],
            },
            {
              routeId: 'knelt_again',
              label: 'Kneel and give him the ring, like last time',
              predicate: { flagsSet: ['sworn_to_corvin', 'used:play_your_part'], atLocation: 'the_crownhold' },
              setsFlags: ['gave_the_seal'],
              closesFlags: ['kept_the_seal'],
            },
            {
              routeId: 'joined_him',
              label: 'Tell him you know, and that you are with him',
              predicate: { flagsSet: ['knows:corvin', 'sworn_to_corvin', 'used:speak_in_his_name'] },
              setsFlags: ['joined_corvin', 'gave_the_seal'],
              closesFlags: ['corvin_accused'],
            },
            {
              routeId: 'cut_him_down',
              label: 'Kill him at his own feast',
              predicate: { flagsSet: ['attacked:corvin'], atLocation: 'the_crownhold' },
              setsFlags: ['corvin_dead', 'struck_the_prince'],
              closesFlags: ['corvin_accused'],
            },
            {
              routeId: 'kept_away',
              label: 'Stay away and keep your ring',
              predicate: { flagsSet: ['refused_the_commission'] },
              setsFlags: ['kept_the_seal'],
              closesFlags: ['gave_the_seal'],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['feast_over'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_woman_who_signed',
      title: 'The Woman Who Signed It',
      summary:
        'Isra prosecuted you, signed your warrant and read it aloud at the gallows. Then she broke you out before dawn. She has not asked to be forgiven.',
      kind: 'SIDE',
      involvedCharacterIds: ['isra', 'tull'],
      involvedLocationIds: ['vane_house', 'hall_of_pleas', 'tollmarket_green'],
      knownRewardCopy: 'Why she did it, and what she is to you now.',
      discoverWhen: { flagsSet: ['knows:she_remembers'] },
      steps: [
        {
          id: 'hear_her_out',
          playerCopy: 'Find out why she signed it.',
          directorNotes:
            'She will not volunteer it and she will not lie about it. The honest answer is that she believed the evidence, and she knows that is worse than any excuse. Let the player be furious; she will stand there and take it, and that is not the same as being forgiven.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Ask her straight',
              predicate: {
                flagsSet: ['used:ask_the_hard_question', 'spoke:isra'],
                minRelationship: [{ characterId: 'isra', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:why_she_signed'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_list',
              label: 'Read the pages she wrote before dawn',
              predicate: { hasItems: ['the_warrant'] },
              setsFlags: ['knows:why_she_signed', 'read_her_list'],
              closesFlags: [],
            },
            {
              routeId: 'saw_her_wrist',
              label: 'See the line around her wrist',
              predicate: { flagsSet: ['used:see_the_line', 'met:isra'] },
              setsFlags: ['knows:why_she_signed', 'saw_the_wrist'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['heard_her_out'], abilities: [], reputation: [] },
        },
        {
          id: 'what_she_is_now',
          playerCopy: 'Decide what she is to you now.',
          directorNotes:
            'Forgiveness, partnership and refusal are all honest endings for this and none of them is the correct one. She will not plead. If forgiven she will make the player say it twice. If refused she will still finish the work, from a distance, because the work was never about being forgiven.',
          enterWhen: { flagsSet: ['heard_her_out'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'forgave_her',
              label: 'Forgive her, out loud, twice',
              predicate: {
                flagsSet: ['heard_her_out', 'used:stay_with_her'],
                minRelationship: [{ characterId: 'isra', dimension: 'affection', value: 72 }],
              },
              setsFlags: ['forgave_her'],
              closesFlags: ['refused_her'],
            },
            {
              routeId: 'partners_only',
              label: 'Work with her, and leave the rest unsaid',
              predicate: {
                flagsSet: ['heard_her_out', 'compared_notes'],
                minRelationship: [{ characterId: 'isra', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['working_together'],
              closesFlags: [],
            },
            {
              routeId: 'refused_her',
              label: 'Tell her some things do not get a second morning',
              predicate: { flagsSet: ['heard_her_out', 'used:stand_ground'] },
              setsFlags: ['refused_her'],
              closesFlags: ['forgave_her'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['isra_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_no_third_morning',
      title: 'There Is No Third Morning',
      summary: 'The Hangman looks at your neck before your face. He says he tied that knot, and that it only works once.',
      kind: 'LEAD',
      involvedCharacterIds: ['tull', 'isra'],
      involvedLocationIds: ['hangmans_house', 'tollmarket_green'],
      knownRewardCopy: 'Why you came back, and what it cost somebody else.',
      discoverWhen: { flagsSet: ['met:tull'] },
      steps: [
        {
          id: 'ask_the_hangman',
          playerCopy: 'Ask the Hangman what he did to you.',
          directorNotes:
            'Quiet and physical: rope on pegs, a kettle, an old man’s hands. He explains the knot plainly and does not dress it up as magic, because to him it is a trade secret. He will be clear that it works once for any neck. Nobody else in the city would believe a word of it, and he knows that too.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Ask him plainly',
              predicate: { flagsSet: ['spoke:tull', 'used:ask_the_hard_question'] },
              setsFlags: ['tull_explained'],
              closesFlags: [],
            },
            {
              routeId: 'you_told_him',
              label: 'Tell him you remember the gallows',
              predicate: { flagsSet: ['spoke:tull', 'used:say_what_happened'] },
              setsFlags: ['tull_explained'],
              closesFlags: [],
            },
            {
              routeId: 'isra_named_him',
              label: 'Hear it from Isra, at the foot of the gallows',
              predicate: { flagsSet: ['compared_notes', 'saw_her_at_the_gallows'] },
              setsFlags: ['isra_named_him'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['knows:the_knot'], abilities: ['see_the_line'], reputation: [] },
        },
        {
          id: 'the_last_knot',
          playerCopy: 'Decide what the Hangman is owed.',
          directorNotes:
            'He has given three people a second morning and lost something each time. What he wants is to know one of them was worth it, and to give up the trade. The player can give him either, both or neither. He will not ask.',
          enterWhen: { flagsSet: ['knows:the_knot'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'put_the_rope_down',
              label: 'Sit with him until he gives up his office',
              predicate: { flagsSet: ['knows:the_knot', 'used:stay_with_her'], atLocation: 'hangmans_house' },
              setsFlags: ['tull_released'],
              closesFlags: ['tull_waits'],
            },
            {
              routeId: 'one_more_rope',
              label: 'Ask him to keep one rope for the right neck',
              predicate: { flagsSet: ['knows:the_knot', 'proof_in_hand'] },
              setsFlags: ['tull_waits'],
              closesFlags: ['tull_released'],
            },
            {
              routeId: 'left_him_to_it',
              label: 'Leave him at his window',
              predicate: { flagsSet: ['knows:the_knot', 'feast_over'] },
              setsFlags: ['tull_alone'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['knot_answered'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_hob_wakes',
      atWorldMinute: 6 * 60 + 50,
      locationId: 'watergate_cells',
      publicCopy: 'Down in the Rivergate cells, the turnkey wakes to an open door, an empty cell and no keys on his belt.',
      directorNotes:
        'Hob will be blamed, and he will not say who took the keys. He saw the hood and guessed. By noon he has lost a week’s pay and is pretending it is funny.',
      setsFlags: ['hob_blamed'],
      cancelledByFlags: [],
      requiresFlags: ['walked_out'],
      movesCharacters: [],
    },
    {
      id: 'we_the_prince_comes_down',
      atWorldMinute: 9 * 60,
      locationId: 'watergate_cells',
      publicCopy: 'Footsteps on the cell stairs: Prince Corvin, alone, soil on his cuffs, carrying a key he did not need to bring himself.',
      directorNotes:
        'Exactly as last time, word for word, unless the player has changed something he can see. If the cell is empty he asks Hob one light question, looks at the drain grate for a long moment, and goes back up smiling. He is more interested in the player now, not less.',
      setsFlags: ['prince_came_down'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'corvin', toLocationId: 'watergate_cells' }],
    },
    {
      id: 'we_the_crier',
      atWorldMinute: 12 * 60,
      locationId: 'tollmarket_green',
      publicCopy: 'A crier on the toll-house steps reads out the player’s name as a deserter of the Rivergate Company: ten crowns for word of them.',
      directorNotes:
        'Only for a player who walked out. The river market will not sell them, the Watch will look, and the Prince quietly asks the Watch to look less hard, which is the most frightening kindness in the city.',
      setsFlags: ['posted_as_deserter'],
      cancelledByFlags: ['sworn_to_corvin'],
      requiresFlags: ['walked_out'],
      movesCharacters: [],
    },
    {
      id: 'we_isra_at_the_gallows',
      atWorldMinute: 23 * 60 + 30,
      locationId: 'tollmarket_green',
      publicCopy: 'At half past eleven at night Isra Vane stands alone at the foot of the empty gallows, and the Hangman comes out of his house to stand beside her.',
      directorNotes:
        'They do not speak much. They are the two other people who remember. If the player is there, this is where Isra names him and the Hangman looks at the player’s neck before their face.',
      setsFlags: ['saw_her_at_the_gallows'],
      cancelledByFlags: [],
      requiresFlags: ['knows:she_remembers'],
      movesCharacters: [
        { characterId: 'isra', toLocationId: 'tollmarket_green' },
        { characterId: 'tull', toLocationId: 'tollmarket_green' },
      ],
    },
    {
      id: 'we_the_marker_sold',
      atWorldMinute: 1440 + 22 * 60,
      locationId: 'drowned_lantern',
      publicCopy: 'At the back table of the Drowned Lantern, a woman in a grey coat pays eighty-eight crowns for a sergeant’s slate and slips it into a ledger.',
      directorNotes:
        'Sabine, on Corvin’s word, exactly as last time. She is polite to the house and does not look at the slate twice. Hob is at a table eleven feet away and does not see it happen.',
      setsFlags: ['marker_sold'],
      cancelledByFlags: ['hob_debt_paid'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sabine', toLocationId: 'drowned_lantern' }],
    },
    {
      id: 'we_the_assize',
      atWorldMinute: 2 * 1440 + 9 * 60,
      locationId: 'hall_of_pleas',
      publicCopy: 'The morning assize sits in the Hall of Pleas, and the first case called is the knight who struck the Prince.',
      directorNotes:
        'Only for a player who attacked Corvin without anybody believing why. Isra is the Crown’s Advocate and is handed the case. The verdict is never in doubt. There is no third morning.',
      setsFlags: ['condemned'],
      cancelledByFlags: ['corvin_accused'],
      requiresFlags: ['struck_the_prince'],
      movesCharacters: [{ characterId: 'isra', toLocationId: 'hall_of_pleas' }],
    },
    {
      id: 'we_the_shaking',
      atWorldMinute: 2 * 1440 + 10 * 60 + 30,
      locationId: 'the_crownhold',
      publicCopy: 'At the morning audience the King’s cup rattles against his teeth, and the royal physician says "age" loudly enough for the whole hall.',
      directorNotes:
        'The player remembers this exact moment from last time, down to the word. Corvin, at his father’s elbow, steadies the cup with his own hand.',
      setsFlags: ['saw_the_shaking'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'corvin', toLocationId: 'the_crownhold' }],
    },
    {
      id: 'we_the_dye_crate',
      atWorldMinute: 3 * 1440 + 15 * 60,
      locationId: 'ashcourt',
      publicCopy: 'A carter unloads at Ashcourt’s kitchen door. One small crate is marked DYE, BLUE in Sabine Orrel’s hand, and it goes not to the kitchen but through the glasshouse.',
      directorNotes:
        'Only for a player who has been to Ashcourt and so knows the house well enough to see the crate go the wrong way. It is the first time the shut door behind the glasshouse opens while anybody is watching.',
      setsFlags: ['found_the_stillroom'],
      cancelledByFlags: [],
      requiresFlags: ['visited:ashcourt'],
      movesCharacters: [],
    },
    {
      id: 'we_the_cask',
      atWorldMinute: 6 * 1440 + 8 * 60,
      locationId: 'the_crownhold',
      publicCopy: 'A cart from Ashcourt delivers the seventh-day cask to the King’s cellar for tonight’s feast, its bung sealed in the Prince’s green wax.',
      directorNotes:
        'The same cask, the same wax, the same cellarer signing for it. Last time nobody looked twice. It sits in the cellar under the great hall until the feast.',
      setsFlags: ['cask_delivered'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_feast_of_oaths',
      atWorldMinute: 6 * 1440 + 19 * 60,
      locationId: 'the_crownhold',
      publicCopy: 'The Great Hall of the Crownhold fills for the Feast of Oaths: the King at the high table, the Prince’s wine on every cup, and a cushion set out for the new captain to kneel on.',
      directorNotes:
        'The spine of the week. Everybody who matters is in one room, and the player has been here before. Whatever has changed shows here, in who is sitting where and what is in the cups.',
      setsFlags: ['feast_of_oaths'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'corvin', toLocationId: 'the_crownhold' },
        { characterId: 'isra', toLocationId: 'the_crownhold' },
        { characterId: 'sabine', toLocationId: 'the_crownhold' },
      ],
    },
    {
      id: 'we_the_last_assize',
      atWorldMinute: 7 * 1440 + 9 * 60,
      locationId: 'hall_of_pleas',
      publicCopy: 'The assize sits the morning after the feast, and the dock is already waiting for the knight who drew on the Prince.',
      directorNotes:
        'Only for a player who struck Corvin and could not make the court believe why. This is the same hall, the same advocate, and the same verdict as last time, three years early.',
      setsFlags: ['condemned'],
      cancelledByFlags: ['corvin_accused'],
      requiresFlags: ['struck_the_prince'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_gallows',
      kind: 'FINALE',
      label: 'Whether you hang again',
      seedHint: 'A rope mark on a neck that has never been hanged, in this life.',
      payoffHint: 'Somebody hangs on Tollmarket Green, or nobody does, and the player knows whose neck it is and why.',
      weight: 1,
    },
    {
      id: 'p_her_signature',
      kind: 'RELATIONSHIP',
      label: 'Why she signed it',
      seedHint: 'Isra will not take off one black glove, even in a wet cell at dawn.',
      payoffHint: 'She believed the evidence over the person, and a red line round her signing wrist has been paying for it since four this morning.',
      weight: 0.9,
    },
    {
      id: 'p_who_built_it',
      kind: 'MYSTERY',
      label: 'Who built the gallows',
      seedHint: 'A cask of wine sealed in green wax goes up to the King every seventh day.',
      payoffHint: 'A stillroom behind a glasshouse, and a prince with soil on his cuffs.',
      weight: 0.85,
    },
    {
      id: 'p_the_sergeant',
      kind: 'RIVAL',
      label: 'What your sergeant will say',
      seedHint: 'Eighty-eight crowns chalked on a dice-house slate.',
      payoffHint: 'A witness bought on the second night and spent three years later, or never bought at all.',
      weight: 0.7,
    },
    {
      id: 'p_no_third_morning',
      kind: 'THEME',
      label: 'There is no third morning',
      seedHint: 'The Hangman looks at your neck before your face.',
      payoffHint: 'A knot that works once for any neck, tied by an old man who loses something every time.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_blade',
      name: 'The Best Sword',
      role: 'Sword and melee fighting',
      summary: 'You were the finest blade in the company, so steel is always an answer, and the duels you remember are duels you already know how to win.',
      playstyle: ['Aggressive', 'Close range', 'Hard to hurt'],
      blurb: 'Three years of fights you have already fought, and you remember how every one of them ended.',
      attributeBonus: { might: 3, agility: 1 },
      skillProficiencies: { swordwork: 3, composure: 1 },
      startingItems: [{ itemId: 'captains_sword', qty: 1 }],
      startingAbilities: ['remember_it', 'draw_steel'],
      startingReputation: [{ factionId: 'faction_watergate', amount: 10 }],
    },
    {
      id: 'arch_court',
      name: 'The Courtier',
      role: 'Social, court manners and lies',
      summary: 'You were raised at court and betrothed into it, so princes, clerks and councils are ground you know, and you can lie to a royal face without blinking.',
      playstyle: ['Persuasive', 'Careful', 'Two-faced'],
      blurb: 'You learned to bow before you learned to ride, and last time it got you a prince’s trust and a rope.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { courtcraft: 3, composure: 2 },
      startingItems: [{ itemId: 'isras_letters', qty: 1 }],
      startingAbilities: ['remember_it', 'lie_to_him'],
      startingReputation: [{ factionId: 'faction_crown', amount: 10 }],
    },
    {
      id: 'arch_watch',
      name: 'The Watch Captain',
      role: 'Streets, searching and stealth',
      summary: 'You policed the riverside for years, so you know every boatman, dice house and back door in the city, and you can find what somebody has hidden.',
      playstyle: ['Observant', 'Quiet', 'Streetwise'],
      blurb: 'Half the river market owes you a favour, and the other half owes you two.',
      attributeBonus: { mind: 2, agility: 2 },
      skillProficiencies: { legwork: 3, shadowing: 2 },
      startingItems: [{ itemId: 'favour_list', qty: 1 }],
      startingAbilities: ['remember_it', 'turn_it_over'],
      startingReputation: [{ factionId: 'faction_river', amount: 15 }],
    },
    {
      id: 'arch_soldier',
      name: 'The Soldiers’ Captain',
      role: 'Command and support',
      summary: 'Your company would follow you anywhere and proved it yesterday, so sixty soldiers, a gate and a yard are yours to call on.',
      playstyle: ['Leader', 'Steady', 'Loyal friends'],
      blurb: 'Sixty names, and you know every one of them, and which ones snore.',
      attributeBonus: { presence: 2, resolve: 2 },
      skillProficiencies: { command: 3, candour: 1 },
      startingItems: [{ itemId: 'company_badge', qty: 1 }],
      startingAbilities: ['remember_it', 'rally_company'],
      startingReputation: [{ factionId: 'faction_watergate', amount: 20 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name did they read out on the warrant?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Aldo Wenlock' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What kind of knight-captain were you?',
      helpText:
        'You commanded the Rivergate Company, sixty soldiers who hold the river gate. This sets what you were best at, and it stays for the whole story. It does not decide whether you run, forgive, take revenge or kneel to the Prince again: all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the city know about you?',
      helpText: 'Something true in both lives. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I grew up above a bakery on the quay, and I have never once lost a duel I started.',
    },
    {
      id: 'how_you_take_it',
      label: 'What did the rope leave you wanting?',
      helpText: 'A starting temperament, not a commitment. You can do the opposite on the first page and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'revenge', label: 'Whoever built the gallows, on it' },
        { id: 'run', label: 'To be far away from this city by tonight' },
        { id: 'prove_it', label: 'To be proven innocent, in the same court' },
        { id: 'save_the_king', label: 'To stop the old king dying at all' },
        { id: 'her', label: 'To hear her explain it' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see when the door opens?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Straw in my hair, a captain’s coat slept in, and a collar turned up over my throat.',
    },
  ],
  /**
   * Twelve, because the storyteller reads the first twelve and no more.
   *
   * Five are losses of one kind or another: the same gallows, the same oath,
   * somebody else's rope, joining him, and her signature never forgiven.
   * Walking out is available from turn sixteen, and the Hangman's ending is
   * the only one that needs the optional thread.
   */
  endings: [
    {
      id: 'end_the_same_gallows',
      name: 'The Same Gallows',
      rarity: 'COMMON',
      minTurn: 14,
      requires: { flagsSet: ['condemned'], flagsUnset: ['corvin_dead'] },
      condition:
        'The player struck at the Prince without proof, and the Crown’s law did exactly what it did last time, faster. Write the second hanging as an echo of the first: the same green, the same Hangman, the same crowd. Isra is either at the foot of it again or has refused to be. There is no third morning, and the prose must not pretend otherwise.',
      epilogue:
        'The second warrant is shorter than the first. Hangman Tull ties an ordinary knot, because that is all there is left, and afterwards he does not open his shutters for a month. Three years later the King dies of the shaking sickness, exactly on time.',
      hint: 'He will not be provoked in public. You might be.',
    },
    {
      id: 'end_the_south_road',
      name: 'The South Road',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player left the city by the river and did not come back for the feast. Whether Isra came too is the whole scene. Do not punish the choice and do not redeem it: it is a sane response to knowing the ending, and the person it costs most is the old man drinking the Prince’s wine.',
      epilogue:
        'News travels south slowly. A year later a carter mentions that the old king is shaking badly. Three years later another one says he has died, and that the new king has built granaries, and that they hanged somebody for it, a captain of the guard, a stranger nobody in the south has heard of.',
      hint: '',
    },
    {
      id: 'end_his_captain_again',
      name: 'His Captain, Again',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['gave_the_seal'], flagsUnset: ['joined_corvin', 'proof_in_hand'] },
      condition:
        'The player knelt at the feast and put the signet in the Prince’s hand, as before, with nothing in their own hands to show for the week. The old course holds. Write it as a scene of perfect, terrible familiarity: every word lands exactly where it landed, and the player knows where the road goes.',
      epilogue:
        'The ring sits in a velvet box at Ashcourt. Three years is a long time and the player spends it watching, which is more than they did last time. Whether that is enough is a question for a morning they already remember.',
      hint: '',
    },
    {
      id: 'end_someone_elses_rope',
      name: 'Someone Else’s Rope',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['refused_the_commission', 'feast_over'],
        flagsUnset: ['proof_in_hand', 'cup_stopped', 'left_the_map'],
      },
      condition:
        'The player refused the Prince, kept their head down and their ring on their finger, and survived the week without proving anything. The gallows still gets built. Somebody else takes the captaincy, and somebody else will hang for it in three years. Do not soften this: the player kept their own neck and knows exactly whose they traded it for.',
      epilogue:
        'The new captain of the Prince’s guard is a cheerful knight from the north who wears his signet on a chain. The player buys him a drink once and cannot finish it. In three years the King dies, on time, and the green has a crowd on it again.',
      hint: 'He has already chosen a neck. Refusing him only makes him choose another.',
    },
    {
      id: 'end_the_kings_cup',
      name: 'The King’s Cup',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['cup_stopped'], flagsUnset: ['corvin_accused'] },
      condition:
        'The player kept the poisoned wine from the King at the feast and could not, or did not, say who put it there. The King lives and the shaking eases. The Prince smiles across the hall, and now he knows somebody knows. Write a victory that is also a declaration of war.',
      epilogue:
        'The King’s hands are steady by midsummer. Ashcourt sends no more casks. The Prince is warmer than ever to the player in public, and their sea chest is searched twice in a month by people who are very sorry about the mistake.',
      hint: 'The cask goes up on the seventh day.',
    },
    {
      id: 'end_the_other_trial',
      name: 'The Other Trial',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['corvin_accused', 'proof_in_hand'],
        minRelationship: [{ characterId: 'isra', dimension: 'trust', value: 60 }],
      },
      condition:
        'The player brought proof to the feast and Isra took it to the Hall of Pleas. This is the same court and the same advocate, with the Prince in the dock. Write it as the mirror of the first trial: the evidence read in order, item one, item two, and the player watching from the gallery this time.',
      epilogue:
        'Isra reads the charge to his face, as she always does. He thanks her for her thoroughness. The verdict is a long time coming and never in doubt. The Hangman, asked to do it, declines, and nobody in the city is quite brave enough to ask him why.',
      hint: '',
    },
    {
      id: 'end_kingsbane',
      name: 'The Prince at His Own Feast',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['corvin_dead'] },
      condition:
        'The player killed Prince Corvin in the Great Hall. Whether the city calls it murder or justice depends entirely on whether they had proof in hand and who saw it; write that difference. Keep the act itself short and the aftermath long.',
      epilogue:
        'The old king outlives his son by eleven years, steady-handed, and never forgives anyone involved, including himself. The granaries are never built. In the river market they argue about the player for a generation, and both sides are right.',
      hint: '',
    },
    {
      id: 'end_the_princes_hand',
      name: 'The Prince’s Hand',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['joined_corvin'] },
      condition:
        'The player found out what the Prince is doing and joined him: the granaries, the end of the bread hangings, and the cask. Do not make it cartoonish. He is persuasive because some of what he says is true. The cost is somebody else’s neck in three years, and the player now knows how that feels from the other side.',
      epilogue:
        'King Corvin is crowned in the spring after next. Nobody hangs for bread in his reign. A captain of the guard does hang, for the old king’s death, and it is not the player, and the player stands in the front row and keeps their face very still.',
      hint: '',
    },
    {
      id: 'end_read_twice',
      name: 'The Banns, Read Twice',
      rarity: 'RARE',
      minTurn: 36,
      requires: {
        flagsSet: ['forgave_her', 'feast_over'],
        flagsUnset: ['condemned', 'left_the_map'],
        minRelationship: [{ characterId: 'isra', dimension: 'affection', value: 80 }],
      },
      condition:
        'The player forgave Isra out loud, twice, and stayed. Their betrothal is announced at the feast as it was last time, and this time both of them know exactly what it is worth. Write it small and adult: a glove taken off, a kiss, a list of things still to do.',
      epilogue:
        'She keeps the four pages she wrote that first morning in a locked drawer and reads them once a year, on the date at the bottom, which comes and goes without anybody hanging. The red line on her wrist never fades. Neither does the one on the player’s neck. They stop hiding both in the second year.',
      hint: '',
    },
    {
      id: 'end_her_signature',
      name: 'Her Signature',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['refused_her'] },
      condition:
        'The player heard why Isra signed the warrant and could not forgive it. She does not argue. She finishes the work at a distance and then resigns her office. Let it be sad and fair: nobody is wrong here, and nobody gets a third morning.',
      epilogue:
        'She leaves the Hall of Pleas in the autumn and the city in the winter. The player receives one letter from the south, unsigned, in a hand they know: a list of items, all of them things she should have asked before she signed.',
      hint: '',
    },
    {
      id: 'end_no_third_morning',
      name: 'No Third Morning',
      rarity: 'UNIQUE',
      minTurn: 36,
      requires: { flagsSet: ['knot_answered', 'tull_released'] },
      condition:
        'The player learned what the knot is and what it cost, and sat with the Hangman until he gave up his office. This ending is about him: forty-one years, three turnings, and the first morning he has not had to check what he lost. The player’s own story can be in any state.',
      epilogue:
        'Ambrose Tull burns the turning knot in his stove on a Tuesday and retires to a cottage on the river where nobody knows his trade. He takes up fishing badly. On the first morning of the next spring he wakes, checks, and finds that nothing is missing.',
      hint: 'He looks at your neck before your face.',
    },
    {
      id: 'end_the_morning_kept',
      name: 'The Morning, Kept',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['corvin_accused', 'forgave_her', 'hob_debt_paid'] },
      condition:
        'Everything the second morning was for: the Prince accused with proof, the King alive, Hob never bought, and Isra forgiven. Do not make it triumphant. Make it a morning: ordinary light on the green, an empty gallows, and the player choosing to walk across it.',
      epilogue:
        'Three years on, on the date written at the bottom of four old pages, the player and Isra walk across Tollmarket Green at dawn. The gallows is still there. Nobody is on it. Hob is frying something at the river stalls and shouting Captain at them across the square.',
      hint: '',
    },
  ],
  opening:
    "A key turns in the lock, and you wake with a rope around your throat.\n\nThere is no rope. There is a cell, wet straw, a grey slit of dawn, and a raw red line around your neck where the knot sat.\n\n\"Up,\" Isra says from the doorway, her hood pulled low. \"Quietly.\"\n\nYour betrothed. The last time you saw her, three years from this morning, she stood beneath the gallows and read your death warrant aloud.\n\nBehind her, your old sergeant snores at the turnkey’s desk, his key ring gone from his belt.\n\nIsra holds the door open. Her hand is shaking.\n\n\"Are you walking out with me now,\" she says, \"or staying to die like last time?\"",
  openingSuggestions: [
    "\"Last time? You remember it too?\"",
    'I take her hand and walk out past my sleeping sergeant.',
    'I take the key from her hand and lock her in the cell instead.',
  ],
  openingPanel: {
    assetKey: 'story_the_morning_of_the_gallows/opening',
    alt: 'Isra, hood low and one long black glove on her right hand, holds a cell door open in grey dawn light, a ring of iron keys in her fist, while a grey-bearded turnkey snores at a desk behind her.',
  },
  coverDirection: [
    'SUBJECT: Isra Vane, the Crown’s Advocate, alone and unmistakable in the foreground of a key visual for a dark fantasy romance anime about a second chance.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Black hair cut sharp at the jaw, grey eyes, a dark hooded cloak pushed back over an advocate’s long black coat with a high white collar.',
    'One long black glove on her right hand only, buttoned to the elbow; in that hand she holds up a ring of old iron keys toward the viewer, as if offering them.',
    'Her expression is fierce and frightened at once, lips pressed, eyes locked on the viewer as if daring them to stay.',
    'HER FACE STAYS CLEAN: no marks, glow, glints or shadows on her face or skin.',
    'Every light effect stays on the iron keys, the distant sunrise and the title, never on her face.',
    'BEHIND HER, soft and secondary: an open iron cell door, wet straw, a slit window with cold dawn light,',
    'and far beyond through the window, distant and in silhouette against a red-gold sunrise, an empty timber gallows in a city square, a bare timber frame, no rope and no noose anywhere in the image.',
    'LIGHT: cold grey-blue dawn light from the window on one side, warm ember light from a brazier on the other, so she is rimmed in gold against the blue.',
    'TITLE: the title The Morning of the Gallows painted into the art in the upper third, above her head, as an elegant engraved serif logo set in capitals on two lines,',
    'THE MORNING OF THE on the first line and GALLOWS larger on the second, pale gold on dark, with a thin red-gold sunrise glow along the edges of the letters,',
    'spelled exactly THE MORNING OF THE GALLOWS, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const THE_MORNING_OF_THE_GALLOWS = StoryVersion.parse(raw);
