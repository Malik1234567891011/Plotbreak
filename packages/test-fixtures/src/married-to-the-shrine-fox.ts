import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Married to the Shrine Fox" — a romance that arrives as a demand with a
 * deadline.
 *
 * Bible: `docs/story-bibles/new50/17_MARRIED_TO_THE_SHRINE_FOX.md`. Slate #17 of
 * the fifty-story plan, built to the Good Morning, Husband shape: one person the
 * whole story is arranged around, a small cast who each want something that has
 * nothing to do with the player, and an ending space where the plain losses are
 * as fully written as the wedding.
 *
 * Playable span: two and a half days on and below one mountain, from dusk on
 * day 0 (18:10, the player reaching the top of the steps) to the forty-ninth
 * morning after the last keeper died (day 3, 06:00). Everything after that
 * lives in the endings.
 *
 * The structural bet: the fox-wife is not a courtship. On turn one a fox the
 * player has never met is eating their dinner on the offering box and telling
 * them they owe her a wedding, and every answer is legitimate — yes, no, read
 * the small print, ring the bell, walk back down the steps. Under the demand is
 * a person: the vow was the first keeper's apology, and calling it a debt was
 * her idea, so that nobody could refuse her the way he did.
 *
 * The vow has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast, opening,
 * style examples, places, quest items, factions, quest summaries, world events
 * and the first twelve endings, and never the ability list except the chosen
 * archetype's starting abilities. So the vow's terms, the three ways to answer
 * it, what a lapse costs her and what yes costs the player are hard canon; the
 * vow board, the will's sealed condition, the purchase offer and the survey are
 * quest items; and every archetype starts with Ring the Bell, the keeper's one
 * undeniable power.
 *
 * Three gated abilities, each granted by exactly one quest step and gated by a
 * flag (grant broadly, gate by flag): the Keeper's Ward from Sora, Borrow Her
 * Fire from Kuzuha, and Rewrite the Vow once the player knows why it was
 * written.
 *
 * Three invisible variables. Stamina is the one honest GOOD_HIGH, because
 * `resolveRest` refills those and three hundred and four steps twice a day is a
 * real cost. Unrest comes first among the descending pair on purpose: public
 * violence raises the first GOOD_LOW in array order, and on holy ground the
 * mountain's small spirits take offence before anybody in town hears about it.
 * Fading is her tails greying; it rises on its own toward the forty-ninth
 * morning, and every use of her fire raises it faster.
 */

const raw = {
  id: 'sv_married_to_the_shrine_fox_1',
  storyId: 'story_married_to_the_shrine_fox',
  version: 1,
  title: 'Married to the Shrine Fox',
  fantasyLabel: 'Your family owes a fox a wedding.',
  hook: 'You inherit a mountain shrine and a nine-tailed fox who says your family owes her a wedding.',
  premise:
    'Your great-aunt Chiyo kept a fox shrine at the top of three hundred steps above a mountain town called Sugino. When she died she left it to you: a hall with a leaking roof, a storehouse, a house with her reading glasses still on the table, and eleven thousand yen in the accounts.\n\n' +
    'You came up to look at it before you sold it. Somebody was already sitting on the offering box.\n\n' +
    'Her name is Kuzuha. She has nine tails, three of them going grey, and a vow nailed behind the altar that says your family owes her a wedding. The first keeper wrote it three hundred years ago. It only binds the last of the line, and that is you.\n\n' +
    'You have until the forty-ninth morning after your great-aunt’s death, three dawns from now, to marry her, refuse her to her face, or talk her into new terms. Do nothing and the vow lapses, and she starts losing her tails until she is an ordinary fox.\n\n' +
    'Meanwhile a developer who grew up in the town wants the whole mountain for a ropeway, a polite man under an umbrella will offer to make the vow go away for free, and the shrine maiden who kept the place running is deciding what kind of keeper you are.\n\n' +
    'The fox is waiting for an answer. She ate your dinner while she waited.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Comedy', 'Supernatural', 'Yokai', 'Modern'],
  mechanicsChips: [
    'A vow with a three-day clock',
    'She can be refused',
    'A mountain for sale',
    'A free offer with a catch',
    'Nine tails, three going grey',
  ],
  contentDescriptors: ['ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can marry her on the first night, refuse her on the second, sell the mountain out from under both of you, or sit on the steps for three days feeding her plum rice balls and never answer at all. All of those are endings. Eleven keepers have told her no. Nobody has ever said yes.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'shrine_courtyard',
    startWorldMinute: 18 * 60 + 10,
    startingItems: [
      { itemId: 'shrine_keys', qty: 1 },
      { itemId: 'lawyers_letter', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is an adult heir of twenty-six or older. Kuzuha is more than a thousand years old and always takes the shape of a grown woman of about twenty-five; Sora Yanagi is twenty-three; Oboro is about six hundred years old and looks like a man in his thirties; Isao Tadokoro is fifty-six and Ume Kanzaki is eighty-one. The last keeper, the player’s great-aunt Chiyo, died at ninety-four.',
      'The player has inherited the fox shrine at the top of three hundred and four stone steps above Sugino, a mountain town of about four hundred people, from their great-aunt Chiyo, the last keeper, who died forty-six days before the story starts. The player is the last of her line. They came up at dusk to look at the place before deciding what to do with it.',
      'Kuzuha is the nine-tailed fox of the mountain and holds its spirit-seat. Only people she allows see her as a woman; to everyone else she is a large red fox that steals offerings. Sora saw the woman once, five years ago. Ume suspects. Tadokoro has only ever seen a fox.',
      'The vow is a cedar board nailed behind the altar of the main hall, written three hundred years ago by the first keeper, Seiji: "Fox of this mountain: keep it, and do not pass the lowest gate, and my line will keep you. When my line comes down to one, that one owes you the wedding I did not give, by the forty-ninth morning after the last keeper." Eleven keepers have signed under it since. Kuzuha proposed to every one of them and every one said no; none of them was the last of the line.',
      'Answering the vow means one of three things, done at the altar of the main hall: a wedding; the vow refused out loud, to her face; or the vow rewritten in new terms that she signs freely. Saying yes or no anywhere else is a promise, not the answer. Unanswered by the forty-ninth morning, three dawns after the story starts, the vow lapses as if refused.',
      'A refused or lapsed vow does not kill her. Her nine tails grey one at a time until she is an ordinary red fox who remembers nothing, and the spirit-seat of the mountain stands empty. Three tails are grey at the tips when the story starts. Every time she spends her fire for somebody, the grey comes faster.',
      'The cost of yes: a keeper married to her cannot be away from the mountain for more than one night at a time while the marriage lasts. She tells anyone who asks, and believes it is why the others said no.',
      'Kuzuha cannot pass the lowest gate on the steps while the vow stands. When somebody of the keeper’s blood rings the shrine bell, every spirit on the mountain hears it and Kuzuha has to come. She hates being rung for.',
      'Oboro, a yokai of the valley mist, can dissolve the vow for anybody of the line who asks him, with no wedding and nobody saying no to her face. He cannot lie, and he cannot cross a threshold uninvited. A dissolved vow ends exactly like a refused one, and the spirit-seat passes to him; he says so only if asked exactly what happens to her.',
      'The old dry stone wall behind the main hall holds the north slope up because Kuzuha holds it with her fire every dawn. Tadokoro Development wants the whole mountain for a ropeway, with its top station on that wall, and a hot-spring hotel. The residents’ association votes on backing the sale at the inn at seven the evening after the story starts, and his backers want the heir’s signature by five the evening after that.',
      'The last keeper’s will leaves the shrine to the player, and to Sora Yanagi if the player refuses it or sells within a year. The condition is in a sealed envelope addressed to Sora, to be opened on the forty-ninth day. Sora knows what it says and has told nobody.',
      'Nothing an ordinary person does with their hands can hurt Kuzuha or Oboro. Violence on the mountain offends the small spirits first: the crows go up, the lanterns go out, the stone foxes turn their heads. Only the keeper’s ward can hold a spirit in place, and only the keeper can take it down.',
    ],
    toneGuide:
      'Romantic comedy with a clock in it. Banter first, then the thing under it. Kuzuha is grand and petty in the same breath, the town is warm and nosy, and the mountain is quietly alive: lanterns that light themselves, crows that keep the hours, stones that are warm at dawn. ' +
      'The romance is teasing, tense and heartfelt, and goes as far as a kiss and no further. A wedding here is a rite at the altar with sake, vows and the bell, and nothing after it is written. No fan service: her ears and tails are a face, never a body, and nobody is described lingeringly. ' +
      'Every answer the player gives is allowed and has a consequence somebody remembers. Refusing her is legitimate, walking down the steps is legitimate, and marrying her for the wrong reason is legitimate and should feel like it. Nobody is a villain: Tadokoro is right about the jobs, Oboro is right that a vow is only a sentence, and Kuzuha is right that she is owed. ' +
      'Keep it physical and specific: the sandwich, the broom, the box of sweets, the plum rice balls, the bell rope swinging with no wind. The face at the top of a beat is Kuzuha’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "You pull the rope. The bell is louder than it has any right to be.\n\nEvery lantern down the steps flares at once.\n\nKuzuha comes over the hall roof at a run and lands on the offering box with her ears flat.\n\n\"Do you know what that feels like?\" she says. \"Like being shouted for. In the bath.\"\n\nShe sits. Her tails settle around her one at a time, the grey ones last.\n\n\"Well? You rang. Say the thing.\"",
      "Sora does not look up from the broom.\n\n\"The offering is at seven,\" she says. \"The lanterns are at quarter to. You are standing where the bell rope swings.\"\n\nYou step aside. The rope swings through the place your head was.\n\n\"Thank you.\" She sweeps the spot you were standing on. \"She will tell you it is a debt.\"\n\n\"Isn’t it?\"\n\nSora finally looks at you.\n\n\"Ask her who wrote that word.\"",
      "The mist has come up to the lowest gate and stopped there, like a dog told to stay.\n\nThe man under the grey umbrella bows.\n\n\"You would rather not say no to her face,\" Oboro says. \"Yes. You would rather not have to say it at all.\"\n\nHe holds out one pale hand, palm up.\n\n\"Ask me, and by morning there will be nothing on that altar but wood.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 12, presence: 12, resolve: 11, arcana: 9 },
  skills: [
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying yes or no out loud, to the face of somebody who will not like it.' },
    { id: 'banter', name: 'Banter', attribute: 'presence', description: 'Keeping a conversation light while you work out what it is actually about.' },
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'Feeding a fox, a shrine maiden or a town meeting with what is in the cupboard.' },
    { id: 'handiwork', name: 'Handiwork', attribute: 'might', description: 'Roofs, steps, stone walls: the physical work an old shrine needs.' },
    { id: 'fine_print', name: 'Fine Print', attribute: 'mind', description: 'Reading what a vow, a will or a contract actually binds, and who.' },
    { id: 'sight', name: 'Sight', attribute: 'arcana', description: 'Seeing the mountain the way the keepers did: who is watching, and what is holding what up.' },
    { id: 'rites', name: 'Rites', attribute: 'arcana', description: 'Doing the keeper’s words and gestures properly, in the right order.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Three hundred and four steps in the dark, twice a day, without falling down any of them.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so resting restores the day and nothing
   * else, and the generic cost path spends the climb rather than the romance.
   * Unrest is first among the descending pair because public violence raises
   * the first GOOD_LOW in array order. Fading starts at three tails in nine and
   * rises on its own; Borrow Her Fire raises it faster.
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
        'The player sits down on whatever step they are on and does not get up for a while. Whoever is nearest decides what happens next, and Kuzuha has opinions about heirs who cannot manage a flight of stairs.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Legs gone and head foggy. Answers come out short, jokes miss, and the player agrees to things to end a conversation. This is the band where a proposal gets a yes nobody meant, and where the futon in the keeper’s house is the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a day on a mountain. Fine for one more trip down the steps and honest about not wanting two. Good for sitting on the offering box; bad for a residents’ meeting. Nobody needs to remark on it.',
        },
        {
          upTo: 100,
          behaviour:
            'The day is still in front of them. The player has the room to be curious, to cook something that takes an hour, to climb down to the town and back, and to give a difficult answer well instead of bluntly.',
        },
      ],
    },
    {
      id: 'unrest',
      name: 'Unrest',
      max: 100,
      start: 15,
      regenPerHour: -1,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The mountain is at ease with the heir. Lantern moths settle on their sleeve, the crows call the hour on time, and the stone foxes face the right way every morning.',
      color: '#B5543C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The small spirits are curious and settled. Lanterns light when the player passes, a crow follows them down the steps, and the offering box is warm to sit on. Nothing on the mountain is working against them.',
        },
        {
          upTo: 60,
          behaviour:
            'Something has been rung for or bound too often. Crows call the hours late, a lantern on the steps goes out as the player passes, and one stone fox is facing the wrong way in the morning. Kuzuha notices before anyone else does and is short with them about it.',
        },
        {
          upTo: 100,
          behaviour:
            'The mountain is offended. Lanterns stay dark on the steps, the bell rope will not hang still, crows gather on the hall roof and stare, and doors in the keeper’s house stick. Kuzuha has to spend her attention keeping the small spirits calm, and she makes sure the player knows what that costs.',
        },
      ],
    },
    {
      id: 'fading',
      name: 'Fading',
      max: 100,
      start: 33,
      regenPerHour: 0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'All nine tails are full red to the tips. Kuzuha is at her grandest and pettiest, the wall is warm at dawn without effort, and she can be in two places on the mountain at once if she likes.',
      color: '#C9A227',
      bands: [
        {
          upTo: 33,
          behaviour:
            'Three tails grey at the tips, which she hides under the others. She is quick, grand and rude, can be anywhere on the mountain in a breath, and treats the whole business of the vow as a joke she is winning.',
        },
        {
          upTo: 55,
          behaviour:
            'A fourth and fifth tail going. She naps in the afternoon under the cedar and pretends she was thinking. Her fire comes slower, she sits closer to warm things, and she stops making jokes about how long she has waited.',
        },
        {
          upTo: 80,
          behaviour:
            'More grey than red. She forgets small things — the name of the town, which step is hers — and covers it with grandeur. She stays near the cedar and the wall. Asked straight, she will admit she is frightened, once, and then change the subject to plum.',
        },
        {
          upTo: 100,
          behaviour:
            'Nearly gone. She is mostly a fox now, and the woman comes back only for a few minutes at dusk. She still sits on the offering box at the hour the last keeper used to come up the steps, and she still knows the player’s face, for now.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'shrine_keys',
      name: 'The Keeper’s Keys',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'Seven keys on a red cord, posted to you by the lawyer: the hall, the house, the storehouse, the offering box, the top and bottom gates, and one small brass key that matches nothing you have tried yet.',
      loreText:
        'The cord is the last keeper’s. The brass key opens the lacquer box in the storehouse, which holds the first keeper’s diary. Kuzuha knows which key is which and will tell you about every one except the brass one.',
      icon: 'key',
    },
    {
      id: 'lawyers_letter',
      name: 'The Lawyer’s Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Two pages from a solicitor in the city. The shrine, its land and its buildings are yours, subject to a condition set out in a sealed letter held by Ms Sora Yanagi, to be opened on the forty-ninth day. The shrine’s accounts hold eleven thousand yen.',
      loreText:
        'There is a postscript in a different pen: "Your great-aunt asked me to add that the fox likes plum." The solicitor clearly assumed this was a figure of speech.',
      icon: 'letter',
    },
    {
      id: 'the_vow_board',
      name: 'The Vow Board',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A cedar board behind the altar, brushed in three-hundred-year-old ink: "Fox of this mountain: keep it, and do not pass the lowest gate, and my line will keep you. When my line comes down to one, that one owes you the wedding I did not give, by the forty-ninth morning after the last keeper. Seiji, first keeper."',
      loreText:
        'Eleven names underneath in eleven hands, the last keeper’s at the bottom in blue ballpoint. Every one of them signed to keep her. Every one of them turned her down. Taken off the wall and handed to her, the board is hers to keep or burn, and the vow goes with it.',
      icon: 'scroll',
    },
    {
      id: 'purchase_offer',
      name: 'Tadokoro’s Offer',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A purchase offer from Tadokoro Development: sixty million yen for the shrine, its buildings and the whole north slope, the hall to be rebuilt at the foot of the mountain. Signature required by five o’clock on the second evening.',
      loreText:
        'Clause fourteen moves "any resident animals" at the buyer’s expense. The top station of the ropeway is drawn on the old wall behind the hall.',
      icon: 'papers',
    },
    {
      id: 'survey_report',
      name: 'The Survey Report',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The geologist’s report on the north slope, stamped confidential. The old wall is holding the slope up by "a load-bearing factor this survey cannot identify". Recommendation: no construction on the north slope.',
      loreText:
        'The water page is signed by a consultant called Oboro, with no surname and no address. Tadokoro keeps the report in a locked filing box at the inn and has underlined the word "recommendation" twice, angrily.',
      icon: 'papers',
    },
    {
      id: 'first_keepers_diary',
      name: 'The First Keeper’s Diary',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { fine_print: 1 },
      description:
        'Seiji’s diary, three hundred years old, in a lacquer box only the brass key opens. The last forty pages are about a fox. The back cover has been resewn by a different hand.',
      loreText:
        'He loved her. He married a woman from the valley because his father arranged it, and he wrote the vow the night before the wedding. The last entry is the morning of that wedding, and it stops in the middle of a sentence.',
      icon: 'book',
    },
    {
      id: 'unsent_letter',
      name: 'The Letter He Didn’t Send',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description:
        'A folded letter sewn inside the diary’s back cover, addressed to Kuzuha by name and never sent. It says the thing the vow does not.',
      loreText:
        'Kuzuha has never seen it. It ends: "I did not choose you because I was afraid to. Make whoever comes last choose you because they are not." The town’s old work song keeps the same line.',
      icon: 'letter',
    },
    {
      id: 'sora_envelope',
      name: 'Sora’s Envelope',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Sealed, in the last keeper’s handwriting: "For Sora, on the forty-ninth day." It sits on the shelf in the keeper’s house where Sora can see it from the door.',
      loreText:
        'Inside is the will’s condition: if the heir refuses the shrine or sells it within a year, the shrine passes to Sora Yanagi. Under it, a line for Sora alone: "Do not let them hand it to you. Make them ask."',
      icon: 'letter',
    },
    {
      id: 'bridal_robes',
      name: 'The Bridal Robes',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A white wedding kimono and a crimson over-robe, folded in paper in the storehouse. Aired every spring for three hundred years and never worn. They are cut for somebody very tall. Beside them is a second set, newer, in your size.',
      loreText:
        'The last keeper had the second set made last spring and told the tailor it was for "whoever comes up next". Her note on the box: "Air in April. Do not let her see you do it." Taking the robes to the altar is how anyone on this mountain would know a wedding is meant.',
      icon: 'cloth',
    },
    {
      id: 'ward_papers',
      name: 'Ward Papers',
      tags: ['tool'],
      stackable: true,
      maxStack: 6,
      description:
        'Strips of white paper with the keeper’s characters brushed on them. Pinned to a doorframe or a sleeve with the right words, they hold a spirit where it stands until the keeper takes them down.',
      loreText: 'The last keeper used two in sixty years. Both were for a typhoon.',
      icon: 'papers',
    },
    {
      id: 'rite_book',
      name: 'The Rite Book',
      tags: ['document'],
      skillModifiers: { rites: 2 },
      description:
        'The last keeper’s book of rites, the words for the bell, the lanterns, the ward and the wedding, with Sora’s notes in the margins in much smaller writing.',
      loreText: 'The wedding pages have never been opened flat. The spine cracks when you try.',
      icon: 'book',
    },
    {
      id: 'stone_fox_head',
      name: 'The Stone Fox’s Head',
      tags: ['heavy'],
      description:
        'The head of the stone fox from the courtyard, broken off in a typhoon forty years ago. It sits among the cedar roots, and somebody keeps putting a plum in front of it.',
      loreText: 'Put back where it belongs, the courtyard fox looks the right way again. The mountain notices.',
      icon: 'stone',
    },
    {
      id: 'plum_rice_balls',
      name: 'Plum Rice Balls',
      tags: ['food'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 15, consumesItem: true },
      description: 'Ume’s plum rice balls, wrapped in paper with a nickname written on each one in marker.',
      loreText: 'Sixty years of Thursdays, the last keeper took two of these up the steps and came down with none.',
      icon: 'food',
    },
    {
      id: 'tool_bag',
      name: 'Your Tool Bag',
      tags: ['tool', 'personal'],
      skillModifiers: { handiwork: 1 },
      description: 'A canvas bag with a hammer, a level, a tin of screws and a roll of roofing tape. Heavier on the steps than it was on the train.',
      loreText: 'The level is the one thing in it you would go back down for.',
      icon: 'tools',
    },
    {
      id: 'fox_charm',
      name: 'The Last Keeper’s Fox Charm',
      tags: ['personal'],
      skillModifiers: { sight: 1 },
      description: 'A small carved wooden fox on a red cord, which your great-aunt gave you the summer you stayed up here. The ears are worn smooth.',
      loreText: 'Kuzuha carved it. She will recognise it at once and pretend she does not.',
      icon: 'charm',
    },
    {
      id: 'ropeway_poster',
      name: 'A Ropeway Poster',
      tags: ['document'],
      description: 'SUGINO SKY LINE: TWELVE MINUTES TO THE CLOUDS. A cartoon fox in a hard hat points at a gondola.',
      loreText: 'Somebody in town has drawn a moustache on the fox on every poster on the street.',
      icon: 'papers',
    },
  ],
  abilities: [
    {
      id: 'ring_the_bell',
      name: 'Ring the Bell',
      tags: ['utility'],
      description:
        'Ring the shrine bell as somebody of the keeper’s blood. Every spirit on the mountain hears it, and Kuzuha has to come, wherever she was.',
      affordances: ['ring the bell', 'pull the rope', 'ring it', 'call her', 'summon her', 'ring the shrine bell'],
      costs: [{ resourceId: 'unrest', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'speak_plainly',
      name: 'Say It Plainly',
      tags: ['social'],
      description: 'Give somebody the true answer, yes or no or not yet, to their face, and take what comes back.',
      affordances: ['say yes', 'say no', 'tell her the truth', 'refuse', 'answer her', 'be honest', 'ask her straight', 'tell him no'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_around_it',
      name: 'Talk Around It',
      tags: ['social'],
      description: 'Joke, stall, flatter or change the subject, and buy time without answering anything.',
      affordances: ['stall', 'change the subject', 'joke', 'flatter her', 'avoid the question', 'buy time', 'deflect', 'play it cool'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'banter', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_an_offering',
      name: 'Make an Offering',
      tags: ['utility'],
      description: 'Cook or bring something good and set it down for somebody: a fox, a spirit, a shrine maiden, a town meeting.',
      affordances: ['cook', 'make an offering', 'feed her', 'bring food', 'make dinner', 'leave an offering', 'give her plum'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'mend_it',
      name: 'Mend It',
      tags: ['utility'],
      description: 'Fix the physical thing: the leak over the altar, a broken step, the stone fox, the old wall.',
      affordances: ['fix it', 'mend it', 'repair', 'fix the roof', 'patch the leak', 'rebuild the wall', 'put the head back'],
      costs: [{ resourceId: 'stamina', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'handiwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_terms',
      name: 'Read the Terms',
      tags: ['sight'],
      description: 'Read a vow, a will, a contract or a survey line by line for what it actually binds, and who it binds.',
      affordances: ['read the vow', 'read it', 'read the contract', 'check the terms', 'read the small print', 'study the board', 'read the survey'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'fine_print', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'look_closer',
      name: 'Look Closer',
      tags: ['sight'],
      description: 'Look at the mountain the way the keepers did: who is watching, what is holding what up, how many tails are grey.',
      affordances: ['look around', 'look closer', 'watch her', 'count the tails', 'look at the wall', 'notice', 'search the room'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'sight', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'sit_with_her',
      name: 'Sit With Her',
      tags: ['social'],
      description: 'Do not answer and do not leave. Sit down on the step beside somebody and stay there.',
      affordances: ['sit with her', 'sit down', 'stay', 'wait', 'keep her company', 'say nothing', 'stay the night'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keepers_ward',
      name: 'The Keeper’s Ward',
      tags: ['utility'],
      description: 'Pin a ward paper and say the keeper’s words. A spirit stays where it stands until the keeper takes the paper down.',
      affordances: ['use the ward', 'seal her', 'bind him', 'pin the ward', 'say the keeper’s words', 'ward the door'],
      costs: [
        { resourceId: 'unrest', amount: 15 },
        { resourceId: 'stamina', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'rites', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_ward'],
        lockedCopy: 'You have the paper strips, but not the words. Sora knows them, and she teaches them only to a keeper she thinks is staying.',
      },
    },
    {
      id: 'borrow_foxfire',
      name: 'Borrow Her Fire',
      tags: ['utility'],
      description: 'Ask Kuzuha for her fire and put it where you point: a light, a warmth, a shove. Every use greys her tails a little faster.',
      affordances: ['borrow her fire', 'use foxfire', 'light it', 'call the fire', 'ask for her fire', 'warm it up'],
      costs: [{ resourceId: 'fading', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['foxfire_offered'],
        lockedCopy: 'Her fire is hers. She lends it to the one she is courting, and she has not decided that is you yet.',
      },
    },
    {
      id: 'rewrite_the_vow',
      name: 'Rewrite the Vow',
      tags: ['social'],
      description: 'Write new terms under the old vow in your own hand. They bind only if she signs beside them, freely.',
      affordances: ['rewrite the vow', 'write new terms', 'change the vow', 'amend it', 'propose new terms', 'write under it'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'fine_print', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:why_she_waits'],
        lockedCopy: 'You could write anything under it and it would only be ink. Until you know why the first keeper wrote it, you do not know what you would be changing.',
      },
    },
  ],
  locations: [
    {
      id: 'shrine_courtyard',
      name: 'The Shrine Courtyard',
      shortName: 'Courtyard',
      description:
        'Raked gravel at the top of three hundred and four steps, ringed by cedar. An offering box with its slot worn smooth, a bronze bell on a thick red-and-white rope, two stone foxes guarding the path (one has no head), and a stone lantern beside the box that has not lit since the last keeper died. The main hall, the keeper’s house and the storehouse all open onto it.',
      artDirection:
        'Mountain shrine courtyard at dusk, raked gravel, a wooden offering box under a bronze bell with a thick red and white rope, two moss-covered stone fox statues, one missing its head, a dark stone lantern, a red gate and tall cedars behind, blue dusk and warm lantern glow. Quiet, mossy, faintly magical.',
      connections: [
        { to: 'main_hall', travelMinutes: 1, label: 'Into the main hall' },
        { to: 'keepers_house', travelMinutes: 1, label: 'The keeper’s house' },
        { to: 'storehouse', travelMinutes: 2, label: 'Round to the storehouse' },
        { to: 'cedar_grove', travelMinutes: 2, label: 'Under the great cedar' },
        { to: 'north_slope', travelMinutes: 3, label: 'Behind the hall, to the old wall' },
        { to: 'the_steps', travelMinutes: 2, label: 'Down the steps' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'main_hall',
      name: 'The Main Hall',
      shortName: 'Main Hall',
      description:
        'A dark wooden hall whose roof leaks onto the altar when it rains. A bronze mirror, two vases of dry evergreen, an offering tray, and nailed to the wall behind the altar a cedar board in old brush writing, with eleven names under it in eleven different hands. This is where the vow is answered.',
      artDirection:
        'Interior of an old wooden shrine hall, dim, a round bronze mirror on a low altar, white paper streamers, a cedar board of old brush calligraphy nailed behind the altar with a column of signatures beneath, a bucket catching a drip from the roof, a slice of dusk light through the doors.',
      connections: [{ to: 'shrine_courtyard', travelMinutes: 1, label: 'Back out to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'the_vow_board', qty: 1, ownerId: 'kuzuha', aka: ['vow', 'the vow', 'board', 'the board', 'the cedar board', 'the vow board'] },
      ],
    },
    {
      id: 'keepers_house',
      name: 'The Keeper’s House',
      shortName: 'Keeper’s House',
      description:
        'Two rooms and a kitchen beside the hall. The last keeper’s reading glasses are still folded on a newspaper forty-six days old. A rite book with Sora’s notes in the margins, a drawer of ward papers, a radio tuned to the regional station, a futon in the cupboard, and on the shelf a sealed envelope with Sora’s name on it.',
      artDirection:
        'Small old wooden house interior with tatami, a low table with folded reading glasses on an old newspaper, a transistor radio, a shelf with a sealed envelope, paper sliding doors, warm lamp light. Lived-in, a little dusty, tender.',
      connections: [{ to: 'shrine_courtyard', travelMinutes: 1, label: 'Out to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'ward_papers', qty: 3, ownerId: null, aka: ['ward papers', 'wards', 'the paper strips', 'the ward strips'] },
        { itemId: 'rite_book', qty: 1, ownerId: null, aka: ['rite book', 'the rite book', 'the book of rites', 'her notes'] },
        { itemId: 'sora_envelope', qty: 1, ownerId: 'sora', aka: ['envelope', 'the envelope', 'the sealed envelope', 'sora’s envelope'] },
      ],
    },
    {
      id: 'storehouse',
      name: 'The Storehouse',
      shortName: 'Storehouse',
      description:
        'A white-walled storehouse with a door you have to lift as you unlock it. Three centuries in labelled boxes: festival lanterns, a drum with a split skin, account books, the bridal robes that are aired every spring and have never been worn, and a lacquer box that only the brass key on your ring will open.',
      artDirection:
        'Interior of an old white-walled storehouse, dust in a shaft of light, stacked wooden boxes with paper labels, paper festival lanterns, a taiko drum, a black lacquer box on a shelf, white and crimson robes folded in paper. Hushed, full of history.',
      connections: [{ to: 'shrine_courtyard', travelMinutes: 2, label: 'Back to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [
        { itemId: 'bridal_robes', qty: 1, ownerId: null, aka: ['robes', 'the robes', 'the bridal robes', 'the wedding robes', 'the white robes'] },
        { itemId: 'first_keepers_diary', qty: 1, ownerId: null, aka: ['diary', 'the diary', 'the old diary', 'the lacquer box', 'the first keeper’s diary'] },
      ],
    },
    {
      id: 'cedar_grove',
      name: 'The Great Cedar',
      shortName: 'Great Cedar',
      description:
        'A cedar older than the shrine, roped with thick straw and white paper zigzags, its roots split into a hollow big enough for a fox to sleep in. Somebody has set the stone fox’s missing head upright among the roots and put a plum in front of it. Beyond the trunk, on clear nights, mist stands where there should be a drop.',
      artDirection:
        'An enormous ancient cedar at night roped with a thick straw rope and white paper zigzags, a hollow between its roots lined with dry needles, a small stone fox head among the roots with a plum before it, pale mist beyond the trunk. Sacred, still, moonlit.',
      connections: [
        { to: 'shrine_courtyard', travelMinutes: 2, label: 'Back to the courtyard' },
        { to: 'mist_bridge', travelMinutes: 6, lockedByFlag: 'mist_on_the_steps', label: 'Into the mist beyond the cedar' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [
        { itemId: 'stone_fox_head', qty: 1, ownerId: null, aka: ['head', 'the stone head', 'the fox head', 'the stone fox’s head'] },
      ],
    },
    {
      id: 'north_slope',
      name: 'The Old Wall',
      shortName: 'Old Wall',
      description:
        'Behind the hall the mountain drops steeply, held back by a dry stone wall laid by hand three hundred years ago, a fox carved on every seventh stone. Fresh orange survey pegs run along the top of it. The stones are warm at dawn, which stones should not be.',
      artDirection:
        'A long hand-laid dry stone retaining wall on a steep forested mountain slope at dawn, small fox carvings on some stones, bright orange survey pegs along the top, mist in the valley far below. Old, precarious, beautiful.',
      connections: [{ to: 'shrine_courtyard', travelMinutes: 3, label: 'Round the hall to the courtyard' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [],
    },
    {
      id: 'the_steps',
      name: 'The Three Hundred Steps',
      shortName: 'The Steps',
      description:
        'Three hundred and four mossy stone steps down through cedar, a red gate at the top, the middle and the bottom, and a stone lantern every twenty steps. The lowest gate stands just above the road. Kuzuha will walk you down as far as it and not one step further.',
      artDirection:
        'Long mossy stone staircase climbing a steep cedar forest at dusk, three vermilion gates along it, stone lanterns glowing every few steps, the lowest gate above a narrow mountain road. Vertiginous, beautiful, a little tiring just to look at.',
      connections: [
        { to: 'shrine_courtyard', travelMinutes: 12, label: 'Up the three hundred steps' },
        { to: 'sugino_street', travelMinutes: 8, label: 'Down through the lowest gate to the town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'sugino_street',
      name: 'Sugino Main Street',
      shortName: 'Main Street',
      description:
        'The town’s one street: a post office, the town office, a shuttered bakery with Sora’s flat above it, a bathhouse with a painted mountain on the wall, and ropeway posters on every pole, half of them torn down and half of them put back.',
      artDirection:
        'A small old mountain town main street at golden hour, wooden shopfronts with half the shutters down, a bathhouse with a painted mountain mural, power lines, posters on poles, the shrine mountain rising behind. Sleepy, warm, slightly forgotten.',
      connections: [
        { to: 'the_steps', travelMinutes: 8, label: 'Back up to the steps' },
        { to: 'ume_shop', travelMinutes: 2, label: 'The general store' },
        { to: 'the_inn', travelMinutes: 3, label: 'The old inn' },
        { to: 'bus_stop', travelMinutes: 4, label: 'Down to the bus stop' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'ropeway_poster', qty: 1, ownerId: null, aka: ['poster', 'the poster', 'a poster', 'the ropeway poster'] },
      ],
    },
    {
      id: 'ume_shop',
      name: 'Kanzaki General Store',
      shortName: 'General Store',
      description:
        'Rice balls at four, batteries, rubber boots, a chest freezer that hums, and a bench outside where the town decides things before the meeting does. The plum rice balls go first, and Ume keeps two back for the shrine every Thursday out of sixty years of habit.',
      artDirection:
        'Cramped old rural general store at evening, shelves of snacks and batteries, a glass case of rice balls, a chest freezer, a wooden bench outside under a faded awning, a hand-painted sign. Cluttered, friendly, buzzing fluorescent light.',
      connections: [{ to: 'sugino_street', travelMinutes: 2, label: 'Back onto the street' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'plum_rice_balls', qty: 4, ownerId: 'ume', aka: ['rice balls', 'plum rice balls', 'onigiri', 'the rice balls'] },
      ],
    },
    {
      id: 'the_inn',
      name: 'The Kawase Inn',
      shortName: 'The Inn',
      description:
        'An old wooden inn with eleven rooms and two guests. Tadokoro has turned the big room into a site office: ropeway drawings on the walls, a model of the mountain on the low table with the shrine moved halfway down it, and a locked filing box under the drawings.',
      artDirection:
        'Traditional wooden inn banquet room turned into a site office, architectural drawings pinned over painted screens, a white model of a mountain with a tiny gondola line on a low table, a grey filing box, tea cups, folding chairs stacked by the wall.',
      connections: [{ to: 'sugino_street', travelMinutes: 3, label: 'Back onto the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'purchase_offer', qty: 1, ownerId: 'tadokoro', aka: ['offer', 'the offer', 'the contract', 'purchase offer', 'his offer'] },
        { itemId: 'survey_report', qty: 1, ownerId: 'tadokoro', aka: ['survey', 'the survey', 'the report', 'the survey report', 'the filing box'] },
      ],
    },
    {
      id: 'bus_stop',
      name: 'The Bus Stop',
      shortName: 'Bus Stop',
      description:
        'A tin shelter at the end of the street with a timetable nobody needs to read: the last bus down the valley leaves at 19:52. Beyond it the road winds off between the rice terraces toward the rest of your life.',
      artDirection:
        'A lonely rural bus shelter of corrugated tin at the edge of a mountain town at dusk, a faded timetable, a single streetlight, terraced rice fields and a road winding down a valley. Melancholy, open, final.',
      connections: [{ to: 'sugino_street', travelMinutes: 4, label: 'Back up the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'mist_bridge',
      name: 'The Mist Bridge',
      shortName: 'Mist Bridge',
      description:
        'A rope-and-plank bridge over a gorge that fills with mist even at noon, reached from behind the great cedar once the mist has come up the mountain. Halfway across, the far end stops being visible. Oboro keeps a low table and two cups in the middle of it, one of them always clean.',
      artDirection:
        'A long rope and plank bridge vanishing into thick white mist over a deep gorge, a low lacquered table and two tea cups set in the middle of the planks, a grey paper umbrella leaning on the rope rail. Dreamlike, cold, very quiet.',
      connections: [
        { to: 'cedar_grove', travelMinutes: 6, label: 'Back to the great cedar' },
        { to: 'the_steps', travelMinutes: 10, label: 'Down through the mist to the lowest gate' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_mountain',
      name: 'The Mountain’s Folk',
      description:
        'Lantern moths, the crows that keep the hours, the two stone foxes and the great cedar: the small spirits of the mountain, who answer to whoever holds its spirit-seat. Violence on holy ground offends them before it reaches the gossip in town.',
      startingReputation: 10,
      ranks: [
        { atReputation: -30, label: 'Trespasser' },
        { atReputation: 0, label: 'The heir, on paper' },
        { atReputation: 35, label: 'The keeper' },
        { atReputation: 65, label: 'Their keeper' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_town',
      name: 'Sugino Town',
      description:
        'Four hundred people, one street, a closed school and a residents’ association split down the middle over the ropeway. They have fed the shrine’s keepers for three hundred years and have opinions about the new one.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'The heir from the city' },
        { atReputation: 30, label: 'Ume’s heir' },
        { atReputation: 60, label: 'One of ours' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_tadokoro',
      name: 'Tadokoro Development',
      description:
        'One man, two backers in the city and one big project left: a ropeway up the mountain and a hot-spring hotel, with two hundred jobs promised in writing. The backers want the heir’s signature by five on the second evening.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A name on a map' },
        { atReputation: 25, label: 'A seller' },
        { atReputation: 50, label: 'A partner' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'kuzuha',
      name: 'Kuzuha',
      role: 'The nine-tailed fox of the mountain, who says your family owes her a wedding',
      cardBlurb:
        'She has been on this mountain longer than the town, she ate your dinner before saying hello, and she says the vow on the altar means you owe her a wedding by the forty-ninth morning. Every answer you give her is allowed. She will remember which one it was.',
      pronouns: 'she/her',
      publicTraits: ['Grand and petty in the same sentence', 'Counts in centuries and in sandwiches', 'Never asks for anything as a favour'],
      hiddenDrives: [
        'She wants to be chosen by somebody who could have walked away, and has dressed three hundred years of being turned down as a debt so that nobody can refuse her the way he did',
        'She is more frightened of a dutiful yes than of a no, and would never say so',
      ],
      values: [
        'A promise kept to the letter',
        'Being told no to her face rather than avoided',
        'Plum, and whoever remembers that she likes it',
      ],
      fears: [
        'Ending as an ordinary red fox under the cedar, remembering nothing',
        'Being married out of duty by somebody counting the nights until they can leave',
        'Being pitied',
      ],
      socialStyle:
        'Gives orders as statements and jokes as orders. Always sits higher than whoever she is talking to: the offering box, the altar step, a branch. Her ears and tails answer before her face does.',
      boundaries: [
        'Will not pass the lowest gate on the steps while the vow stands, and will not admit how much it hurts to try',
        'Will not lie about the vow. She leaves things out of it',
        'Will not be pitied. Pity her and she leaves the scene, over a roof if necessary',
        'Will not touch anybody without asking, and expects the same',
      ],
      goals: [
        'An answer at the altar before the forty-ninth morning',
        'Hold the old wall every dawn until somebody answers',
        'Find out what kind of heir this one is before she lets herself hope',
      ],
      secrets: [
        {
          id: 'kuzuha_seiji',
          fact: 'The first keeper, Seiji, loved her and married a woman from the valley anyway, because he was afraid to choose a fox. He wrote the vow as an apology the night before his wedding. Calling it a debt was her idea, so that nobody could ever refuse her the way he did.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells it herself, sideways and as a joke, if the player has asked what she wants rather than what she is owed. Otherwise the diary in the storehouse tells it.',
        },
        {
          id: 'kuzuha_the_wall',
          fact: 'She has held the old wall behind the hall with her fire every dawn since the last keeper died, and that is why a fourth tail is going grey early.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody at the old wall before dawn sees her there with both hands flat on the stones. She will claim she was cold.',
        },
      ],
      speechStyle:
        'Courtly and very old, then convenience-store slang she picked up from sixty years of the last keeper’s radio, in the same breath. Calls the player "heir" until they earn their name. Counts in centuries. Never says please; says "you may".',
      topics: ['the vow', 'the first keeper', 'the eleven keepers', 'plum', 'the lowest gate', 'her tails', 'the old wall', 'the last keeper', 'the radio'],
      voiceSamples: [
        'Eleven keepers have said no to me. Most were polite. One threw salt. I liked him best.',
        'Plum. Your great-aunt brought plum for sixty years. You brought tuna mayonnaise. We will work on it.',
        'You may sit. Not there. That step is mine. That one too.',
        'Three centuries is a long time to wait for one word, heir. Pick one.',
        'Do not look at the tails. I said do not look at them.',
      ],
      appearance:
        'An adult woman, tall and long-limbed, copper-red hair to her waist, gold eyes, red fox ears with dark tips, a white kimono under a crimson outer robe with the sleeves tied back by red cord.',
      visualHook: 'Nine red fox tails fanned behind her like slow flames, three of them grey at the tips.',
      silhouette: 'Perched cross-legged on something higher than you, tails fanned, one hand held out palm up as if waiting for an answer.',
      artSeed: 'mtsf-kuzuha-01',
      portrait: null,
      expressions: ['neutral', 'teasing', 'amused', 'proud', 'flustered', 'hurt', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'cedar_grove', activity: 'curled in the hollow under the great cedar as a fox' },
        { startMinute: 300, endMinute: 420, locationId: 'north_slope', activity: 'at the old wall before sunrise, both hands flat on the stones' },
        { startMinute: 420, endMinute: 720, locationId: 'shrine_courtyard', activity: 'on the offering box, judging the morning' },
        { startMinute: 720, endMinute: 960, locationId: 'main_hall', activity: 'on the altar step with the last keeper’s radio' },
        { startMinute: 960, endMinute: 1080, locationId: 'cedar_grove', activity: 'napping in the roots of the great cedar and calling it thinking' },
        { startMinute: 1080, endMinute: 1320, locationId: 'shrine_courtyard', activity: 'on the offering box at dusk, waiting' },
        { startMinute: 1320, endMinute: 1440, locationId: 'cedar_grove', activity: 'in the hollow under the great cedar' },
      ],
      homeLocationId: 'cedar_grove',
      knowledgeScope: ['the_vow', 'the_first_keeper', 'the_eleven_keepers', 'the_mountain', 'the_old_wall', 'chiyo', 'sugino', 'oboro'],
      startingRelationship: { trust: 15, affection: 30, respect: 10, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'kuzuha_names_you',
          label: 'She stops calling you heir',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'kuzuha_tells_of_seiji',
          label: 'She tells you about the first keeper',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_vow'] },
        },
        {
          id: 'kuzuha_courted',
          label: 'She lets herself be courted',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 12, agility: 16, mind: 15, presence: 17, resolve: 14, arcana: 22 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sora',
      name: 'Sora Yanagi',
      role: 'Shrine maiden. Has kept the shrine running alone since the last keeper died',
      cardBlurb:
        'She has swept your steps every morning for five years, she knows where every key goes, and she has not offered to show you. She is deciding what kind of keeper you are, and she holds an envelope she will not open before the forty-ninth day.',
      pronouns: 'she/her',
      publicTraits: ['Precise about everything', 'Never raises her voice', 'Holds a broom like a spear'],
      hiddenDrives: [
        'She wants to be asked to stay as something other than help, and would rather lose the shrine than be handed it out of pity',
        'She has been lonely on this mountain for forty-six days and will not say so to anyone, the fox included',
      ],
      values: ['Doing a rite properly or not at all', 'Saying what she will do and then doing it'],
      fears: ['The shrine closing and her having to become somebody else', 'Being offered the shrine and saying yes for the wrong reason'],
      socialStyle:
        'Answers questions exactly and adds nothing. Ends instructions with "please". When she is angry her sentences get shorter, never louder.',
      boundaries: [
        'Will not help sell the mountain, and will say so to Tadokoro’s face',
        'Will not speak for the fox, in either direction',
        'Will not open her envelope before the forty-ninth day, or let anybody else open it',
      ],
      goals: ['See the forty-ninth-day rite done properly', 'Find out whether the heir is staying before she teaches them the ward'],
      secrets: [
        {
          id: 'sora_the_will',
          fact: 'The sealed envelope holds the will’s condition: if the heir refuses the shrine or sells within a year, it passes to Sora. She knows, because the last keeper told her, and has not said, because she will not win it that way.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it herself only if the player has asked her, plainly, what she wants for her own life. Otherwise the envelope says it on the forty-ninth day.',
        },
        {
          id: 'sora_saw_her',
          fact: 'Five years ago, in her first spring, she saw Kuzuha as a woman by the bell rope, crying. Neither of them has ever mentioned it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions it, carefully, if the player is about to refuse the vow without knowing why it was written.',
        },
      ],
      speechStyle:
        'Formal, exact and short. Numbers where other people use adjectives. Never a contraction. "Please" at the end of an instruction, never at the start of a request.',
      topics: ['the rites', 'the ward', 'the steps', 'the last keeper', 'her envelope', 'the forty-ninth-day rite', 'the town office'],
      voiceSamples: [
        'Three hundred and four steps. I counted them my first spring. Shoes off at the hall, please.',
        'The offering is at seven. The lanterns are at quarter to. You are standing where the bell rope swings.',
        'She will tell you it is a debt. Ask her who wrote that word.',
        'The envelope stays shut until the forty-ninth day. Ask again and the answer will be the same length.',
      ],
      appearance:
        'An adult woman, slight and straight-backed, black hair in a low tie with a white paper ribbon, dark serious eyes, a white kimono top and red hakama, a straw broom held upright beside her.',
      visualHook: 'A straw broom she holds upright like a spear, even indoors.',
      silhouette: 'Very straight, broom upright at her side, standing one step above you.',
      artSeed: 'mtsf-sora-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'worried', 'flustered', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'sugino_street', activity: 'asleep in her flat above the shuttered bakery' },
        { startMinute: 330, endMinute: 480, locationId: 'the_steps', activity: 'sweeping the steps from the top down' },
        { startMinute: 480, endMinute: 1020, locationId: 'sugino_street', activity: 'at the counter of the town office' },
        { startMinute: 1020, endMinute: 1140, locationId: 'ume_shop', activity: 'buying the evening offering and refusing a rice ball' },
        { startMinute: 1140, endMinute: 1260, locationId: 'shrine_courtyard', activity: 'the evening offering, the lantern round, the bell rope checked' },
        { startMinute: 1260, endMinute: 1440, locationId: 'sugino_street', activity: 'at home above the bakery with the rite book open' },
      ],
      homeLocationId: 'sugino_street',
      knowledgeScope: ['the_rites', 'the_ward', 'chiyo', 'the_will', 'sugino', 'the_shrine'],
      startingRelationship: { trust: 20, affection: 10, respect: 15, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'sora_teaches_the_ward',
          label: 'She teaches you the ward',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:the_vow'] },
        },
        {
          id: 'sora_says_what_she_wants',
          label: 'She tells you what she wants for herself',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 10, agility: 13, mind: 15, presence: 11, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'oboro',
      name: 'Oboro',
      role: 'Yokai of the valley mist, who offers to make the vow go away for free',
      cardBlurb:
        'He is unfailingly polite, he only appears where there is mist, and he will dissolve the vow tonight so that you never have to say no to her face. He will answer anything you ask him exactly. He will not mention what you did not ask.',
      pronouns: 'he/him',
      publicTraits: ['Exquisitely polite', 'Never in a hurry', 'Always under an umbrella, rain or not'],
      hiddenDrives: [
        'He wants the mountain he lost when the first keeper chose a fox over the mist, and has waited three hundred years for the line to run out',
        'He wants, more quietly, to be invited in somewhere, and has no idea what he would be if he were',
      ],
      values: ['Courtesy, as a form of power', 'Exact words'],
      fears: ['Being asked in, and having to decide what he is when welcome', 'That Kuzuha was right about him'],
      socialStyle:
        'Repeats your words back with one changed. Stands just outside doorways and waits to be asked. Speaks of fog, rain and rivers as if they were acquaintances.',
      boundaries: [
        'Cannot cross a threshold uninvited, and will not pretend he can',
        'Will not lie outright. He omits',
        'Will not harm the heir with his own hands',
      ],
      goals: [
        'Get somebody of the line to ask him to dissolve the vow before the forty-ninth morning',
        'Keep the ropeway’s top station on the old wall',
      ],
      secrets: [
        {
          id: 'oboro_payroll',
          fact: 'He is on Tadokoro Development’s payroll as a "land and water consultant". His advice is why the ropeway’s top station sits on the old wall.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody at the inn in the morning sees him there with a cup of tea he never touches, and the survey report has his name on the water page.',
        },
        {
          id: 'oboro_the_price',
          fact: 'A dissolved vow ends exactly the way a refused one does: her tails grey out and the spirit-seat of the mountain passes to him. He answers that truthfully if somebody asks him exactly what happens to her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask him exactly what happens to her. Not roughly. Exactly.',
        },
      ],
      speechStyle:
        'Soft, unhurried and exquisitely polite, with long vowels. Repeats your last phrase back with one word changed. Never uses a contraction and never raises his voice.',
      topics: ['the vow', 'the mist', 'his offer', 'the ropeway', 'the first keeper', 'Kuzuha', 'thresholds'],
      voiceSamples: [
        'A vow is only a sentence somebody wrote while frightened. Sentences can be unwritten.',
        'You would rather not say no to her face. Yes. You would rather not have to say it at all.',
        'The fog is coming up from the river tonight. She is in a forgiving mood.',
        'I may not come in. You would have to ask me. People so rarely do.',
      ],
      appearance:
        'An adult man, very tall and narrow, long grey hair tied at the nape, pale grey eyes slightly out of focus, a charcoal haori over a white shirt, mist pooling around his shoes.',
      visualHook: 'A grey oiled-paper umbrella, always open, even under a clear sky.',
      silhouette: 'Tall and thin under an open umbrella, standing just outside a doorway.',
      artSeed: 'mtsf-oboro-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'amused', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'mist_bridge', activity: 'in the middle of the mist bridge, umbrella up' },
        { startMinute: 360, endMinute: 600, locationId: 'the_inn', activity: 'at the inn as the land and water consultant, with tea he does not touch' },
        { startMinute: 600, endMinute: 1440, locationId: 'mist_bridge', activity: 'on the mist bridge with two cups set out' },
      ],
      homeLocationId: 'mist_bridge',
      knowledgeScope: ['the_vow', 'the_first_keeper', 'the_mountain', 'the_ropeway', 'the_survey', 'kuzuha'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'oboro_answers_exactly',
          label: 'He answers exactly what you ask',
          kind: 'TRUST',
          requires: { trust: 20 },
        },
        {
          id: 'oboro_comes_in',
          label: 'He accepts an invitation in',
          kind: 'OTHER',
          requires: { trust: 45, flagsSet: ['invited_oboro'] },
        },
      ],
      attributes: { might: 12, agility: 14, mind: 17, presence: 16, resolve: 15, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'tadokoro',
      name: 'Isao Tadokoro',
      calledName: 'Tadokoro',
      role: 'Property developer from the town, buying the mountain for a ropeway and a hot-spring hotel',
      cardBlurb:
        'He grew up in the town below, he has come back with a ropeway, a hotel and two hundred jobs, and he needs your signature before his backers lose patience on the second evening. He is friendly, he is honest about the money, and he is not telling you what the survey said.',
      pronouns: 'he/him',
      publicTraits: ['Friendly in a hurry', 'Talks in numbers', 'Brings sweets to every meeting'],
      hiddenDrives: [
        'He wants to be the man who came back and saved the town, and is afraid he is only the man who came back',
        'His mother cleaned the shrine for twenty years and he has decided that is not relevant',
      ],
      values: ['Jobs you can count', 'Shaking hands on a thing and then doing it'],
      fears: ['Watching the town die anyway, with his name on the sign', 'The survey being right'],
      socialStyle:
        'Arrives with a box of sweets, shakes every hand in the room and gets to a number inside two minutes. Talks about the survey only with the door shut.',
      boundaries: [
        'Never threatens anybody, and is offended to be accused of it',
        'Will not show the survey in public',
        'Will not build without a signature, however late it gets',
      ],
      goals: [
        'A signature before his backers’ deadline at five on the second evening',
        'The residents’ association behind the ropeway at the meeting tomorrow night',
      ],
      secrets: [
        {
          id: 'tadokoro_survey',
          fact: 'The geologist’s survey says do not build on the north slope: the old wall is holding it up by a load-bearing factor the survey cannot identify. He has decided the engineers can fix it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it with the door shut at the inn, if the player has seen the wall and asks him plainly. Otherwise the report is in the locked box under the drawings.',
        },
        {
          id: 'tadokoro_mother',
          fact: 'His mother cleaned the shrine for the last keeper for twenty years. Ume knows. He will not say it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ume says it at the residents’ meeting, or on the bench outside her shop if the player is kind to him in front of her.',
        },
      ],
      speechStyle:
        'Plain, quick and friendly, with a salesman’s rhythm. The town dialect comes back the longer he is in town. Says "honestly" when he means it and when he does not.',
      topics: ['the ropeway', 'the hotel', 'the offer', 'the survey', 'jobs', 'his mother', 'the meeting'],
      voiceSamples: [
        'Sixty million yen, a hotel with two hundred jobs, and the shrine rebuilt down the hill with a better roof. Honestly, it is a good offer.',
        'The school closed the spring after I left. Now it is four hundred people, one bus and a bathhouse.',
        'I brought sweets. I always bring sweets. My mother said you never go up a hill empty-handed.',
        'Shut the door. Good. What do you want to know about the survey?',
      ],
      appearance:
        'An older man, broad and solid, close-cut grey hair, reading glasses pushed up on his head, an expensive grey suit, mud on his good shoes, a box of sweets under one arm.',
      visualHook: 'A gift-wrapped box of sweets under one arm, at every meeting.',
      silhouette: 'Square-shouldered, leaning in with a hand already out to shake.',
      artSeed: 'mtsf-tadokoro-01',
      portrait: null,
      expressions: ['neutral', 'friendly', 'grinning', 'troubled'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_inn', activity: 'asleep at the inn with the drawings on the other futon' },
        { startMinute: 420, endMinute: 600, locationId: 'the_inn', activity: 'at the site office over the drawings, on the phone to the city' },
        { startMinute: 600, endMinute: 780, locationId: 'sugino_street', activity: 'walking the street, shaking hands, handing out sweets' },
        { startMinute: 780, endMinute: 1140, locationId: 'the_inn', activity: 'with the surveyor and the mountain model' },
        { startMinute: 1140, endMinute: 1320, locationId: 'ume_shop', activity: 'on the bench outside the general store, trying to win over Ume' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_inn', activity: 'back at the inn, reading the survey again' },
      ],
      homeLocationId: 'the_inn',
      knowledgeScope: ['the_ropeway', 'the_survey', 'sugino', 'the_offer', 'his_mother'],
      startingRelationship: { trust: 20, affection: 15, respect: 20, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'tadokoro_shuts_the_door',
          label: 'He tells you what the survey says',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['offer_on_the_table'] },
        },
      ],
      attributes: { might: 12, agility: 9, mind: 15, presence: 15, resolve: 13, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ume',
      name: 'Ume Kanzaki',
      role: 'Runs the general store, and has fed every keeper of the shrine for sixty years',
      cardBlurb:
        'She fed your great-aunt every Thursday for sixty years, she will feed you whether you want it or not, and she has a vote at the residents’ meeting that she will tell you about at length. She also knows a song the whole town sings without listening to the words.',
      pronouns: 'she/her',
      publicTraits: ['Loud', 'Bossy as a form of love', 'Gives everyone a nickname inside five minutes'],
      hiddenDrives: [
        'She is afraid of being the last of the old people in the town, and the ropeway is the first thing in twenty years that has made her feel it',
      ],
      values: ['Feeding people', 'Saying it at the meeting rather than behind the shop'],
      fears: ['Being the last of the old ones in the town', 'The shrine going dark the way the school did'],
      socialStyle:
        'Feeds you first and asks questions while your mouth is full. Drops to a whisper for anything that matters, which is how you know it matters.',
      boundaries: ['Will not vote for the sale, and will say why at the meeting', 'Will not tell you Sora’s business'],
      goals: [
        'Get the residents’ association to vote against backing the sale',
        'Get the heir fed and back up the steps with plum rice balls before dark',
      ],
      secrets: [
        {
          id: 'ume_the_song',
          fact: 'The town’s old work song is the first keeper’s story word for word, including the part his diary leaves out: on his wedding day he walked the fox to the lowest gate and told her to wait for whoever came last.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She sings it, in a whisper, to anybody who sits on her bench long enough and asks about the first keeper.',
        },
      ],
      speechStyle:
        'Loud rural cheerfulness, bossy, a nickname for everybody. Whispers the important part, so the whisper is the tell.',
      topics: ['the town', 'the meeting', 'the work song', 'the last keeper', 'plum rice balls', 'Tadokoro’s mother'],
      voiceSamples: [
        'Eat. You climbed those steps on a convenience-store sandwich? Shameful. Sit.',
        'Your great-aunt sat on that bench every Thursday for sixty years and never once paid for a rice ball.',
        'Big Suit thinks I will vote for his cable car. Big Suit can carry my shopping.',
        'Come here. Closer. I am going to sing you something and you are not going to laugh.',
      ],
      appearance:
        'An older woman, small and wiry, short white hair under a headscarf printed with plums, a shop apron with three pens in the pocket, quick black eyes.',
      visualHook: 'A headscarf printed all over with red plums.',
      silhouette: 'Small, hands on hips, filling a shop doorway anyway.',
      artSeed: 'mtsf-ume-01',
      portrait: null,
      expressions: ['neutral', 'cheerful', 'stern', 'sad'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'ume_shop', activity: 'in the back room of the shop, before her alarm' },
        { startMinute: 300, endMinute: 1200, locationId: 'ume_shop', activity: 'behind the counter, rice balls going at four' },
        { startMinute: 1200, endMinute: 1320, locationId: 'sugino_street', activity: 'at the bathhouse, where the town decides things before the meeting does' },
        { startMinute: 1320, endMinute: 1440, locationId: 'ume_shop', activity: 'counting the till with the radio on' },
      ],
      homeLocationId: 'ume_shop',
      knowledgeScope: ['sugino', 'chiyo', 'the_work_song', 'the_meeting', 'tadokoros_mother'],
      startingRelationship: { trust: 35, affection: 40, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ume_sings',
          label: 'She sings you the old work song',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 14, presence: 15, resolve: 17, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_kneel_or_dont',
      title: 'Kneel, or Don’t',
      summary:
        'A fox you have never met is sitting on your offering box eating your dinner, and she says your family owes her a wedding. She wants an answer tonight, and she has waited three hundred years to hear one.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['kuzuha', 'sora'],
      involvedLocationIds: ['shrine_courtyard', 'main_hall', 'keepers_house'],
      knownRewardCopy: 'What the vow on the altar actually says, and what kind of heir she has decided you are.',
      steps: [
        {
          id: 'the_offering_box',
          playerCopy: 'Answer the fox on the offering box.',
          directorNotes:
            'Every answer here is real and none of them is wrong. A yes on the box is a promise, not the wedding: she will want it done properly at the altar, and nobody in three hundred years has said yes, so she has no plan for it and covers that with grandeur. A no gets a joke about the eleven before it, and then she wants to know why. Reading the board first, feeding her, stalling or ringing the bell at her are all legitimate, and each tells her something about the heir. Do not explain the whole vow on turn one; let her and the board do it in pieces.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'answered_her_straight',
              label: 'Give her a straight answer, yes or no',
              predicate: { flagsSet: ['used:speak_plainly'] },
              setsFlags: ['answered_on_the_box'],
              closesFlags: ['stalled_her'],
            },
            {
              routeId: 'read_the_vow_first',
              label: 'Walk past her and read the vow yourself',
              predicate: { flagsSet: ['used:read_the_terms'] },
              setsFlags: ['read_the_vow_first'],
              closesFlags: [],
            },
            {
              routeId: 'fed_her_properly',
              label: 'Make her a proper offering instead',
              predicate: { flagsSet: ['used:make_an_offering'] },
              setsFlags: ['fed_the_fox'],
              closesFlags: [],
            },
            {
              routeId: 'stalled',
              label: 'Talk your way around the question',
              predicate: { flagsSet: ['used:talk_around_it'] },
              setsFlags: ['stalled_her'],
              closesFlags: ['answered_on_the_box'],
            },
            {
              routeId: 'rang_the_bell',
              label: 'Ring the bell and see what she does',
              predicate: { flagsSet: ['used:ring_the_bell'] },
              setsFlags: ['rang_for_her'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:the_vow'], abilities: [], reputation: [] },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Get through the first night on the mountain.',
          directorNotes:
            'The last bus goes at 19:52 whether or not the heir is on it. Sora arrives with the evening offering and a list. The keeper’s house has a futon and the last keeper’s radio; Ume has a spare room over the shop. If the heir knows about the vow by late evening, mist comes up to the lowest gate and somebody is standing in it. Kuzuha will not ask the heir to stay. She will sit on the box until they decide.',
          enterWhen: { flagsSet: ['knows:the_vow'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'slept_in_the_house',
              label: 'Sleep in the keeper’s house',
              predicate: { atLocation: 'keepers_house' },
              setsFlags: ['slept_at_the_shrine'],
              closesFlags: ['slept_in_town'],
            },
            {
              routeId: 'sat_up_with_her',
              label: 'Sit up with her on the steps',
              predicate: {
                flagsSet: ['used:sit_with_her'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 25 }],
              },
              setsFlags: ['sat_up_with_her', 'slept_at_the_shrine'],
              closesFlags: ['slept_in_town'],
            },
            {
              routeId: 'went_down_to_town',
              label: 'Go down to the town for the night',
              predicate: { flagsSet: ['visited:sugino_street'] },
              setsFlags: ['slept_in_town'],
              closesFlags: ['slept_at_the_shrine'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_mountain', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_for_sale',
      title: 'For Sale: One Mountain',
      summary:
        'A developer who grew up in the town wants the whole mountain for a ropeway and a hot-spring hotel. The town votes on backing him tomorrow night, his backers want your signature by five the evening after, and his survey says something about the old wall he is not repeating.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['tadokoro', 'ume', 'oboro'],
      involvedLocationIds: ['the_inn', 'sugino_street', 'north_slope', 'ume_shop'],
      knownRewardCopy: 'Sixty million yen, or a mountain, and what the old wall is really holding up.',
      steps: [
        {
          id: 'hear_the_offer',
          playerCopy: 'Hear what Tadokoro is offering.',
          directorNotes:
            'He is friendly, quick and honest about the money: sixty million yen, a hotel, two hundred jobs, the hall rebuilt at the foot of the mountain. He sees a large red fox on the offering box and offers it a sweet. He does not mention the survey unless asked about the wall, and then only with a door shut.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'met_him',
              label: 'Let him make his pitch',
              predicate: { flagsSet: ['spoke:tadokoro'] },
              setsFlags: ['heard_the_offer'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_offer',
              label: 'Read his offer line by line',
              predicate: { hasItems: ['purchase_offer'], flagsSet: ['used:read_the_terms'] },
              setsFlags: ['heard_the_offer', 'read_the_offer_closely'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['offer_on_the_table'],
            abilities: [],
            reputation: [{ factionId: 'faction_town', amount: 5 }],
          },
        },
        {
          id: 'what_the_wall_holds',
          playerCopy: 'Find out what the old wall is holding up.',
          directorNotes:
            'The answer is her. She holds it with her fire every dawn, and it is costing her tails. Each route finds that out in a different way and from a different person. Taking the survey from the inn is theft and Tadokoro will know who did it; mending the wall with your own hands buys her some mornings and she will be furious about being helped.',
          enterWhen: { flagsSet: ['offer_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'saw_her_hold_it',
              label: 'Be at the old wall before dawn',
              predicate: { atLocation: 'north_slope', flagsSet: ['used:look_closer'] },
              setsFlags: ['knows:what_the_wall_holds', 'saw_her_hold_it'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_survey',
              label: 'Take the survey report from the inn',
              predicate: { hasItems: ['survey_report'] },
              setsFlags: ['knows:what_the_wall_holds', 'took_the_survey'],
              closesFlags: [],
            },
            {
              routeId: 'shored_the_wall',
              label: 'Shore the wall up with your own hands',
              predicate: { atLocation: 'north_slope', flagsSet: ['used:mend_it'] },
              setsFlags: ['knows:what_the_wall_holds', 'wall_shored'],
              closesFlags: [],
            },
            {
              routeId: 'asked_ume',
              label: 'Ask Ume what the old people say about the wall',
              predicate: { minRelationship: [{ characterId: 'ume', dimension: 'trust', value: 42 }] },
              setsFlags: ['knows:what_the_wall_holds', 'heard_it_from_ume'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['wall_understood'], abilities: [], reputation: [] },
        },
        {
          id: 'the_signature',
          playerCopy: 'Decide what happens to the mountain.',
          directorNotes:
            'Nobody here is a villain. Tadokoro is right that the town is dying and right about the jobs; he is wrong about the slope. Selling is a real choice and must not be written as a punishment. Turning the meeting needs the town behind the heir and a reason they can repeat; talking him into the hotel in town needs him to trust the heir with the survey.',
          enterWhen: { flagsSet: ['offer_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed',
              label: 'Sign Tadokoro’s offer',
              predicate: { flagsSet: ['heard_the_offer'], hasItems: ['purchase_offer'], beforeWorldMinute: 2 * 1440 + 17 * 60 },
              setsFlags: ['sold_the_mountain'],
              closesFlags: ['refused_the_sale', 'hotel_in_town', 'town_behind_you'],
            },
            {
              routeId: 'moved_the_hotel',
              label: 'Talk him into building the hotel in the town instead',
              predicate: {
                flagsSet: ['knows:what_the_wall_holds'],
                minRelationship: [{ characterId: 'tadokoro', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['refused_the_sale', 'hotel_in_town'],
              closesFlags: ['sold_the_mountain'],
            },
            {
              routeId: 'turned_the_meeting',
              label: 'Turn the residents’ meeting against the sale',
              predicate: {
                flagsSet: ['meeting_held', 'knows:what_the_wall_holds'],
                minRelationship: [{ characterId: 'ume', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['refused_the_sale', 'town_behind_you'],
              closesFlags: ['sold_the_mountain'],
            },
            {
              routeId: 'refused',
              label: 'Tell him no',
              predicate: { flagsSet: ['used:speak_plainly', 'heard_the_offer'] },
              setsFlags: ['refused_the_sale'],
              closesFlags: ['sold_the_mountain'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['mountain_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_town', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_forty_ninth_morning',
      title: 'The Forty-Ninth Morning',
      summary:
        'The vow binds only the last of the line, and the last of the line has three dawns to marry her at the altar, refuse her there to her face, or write new terms she will sign. Do nothing and it lapses, and she starts to become an ordinary fox.',
      kind: 'MAIN',
      involvedCharacterIds: ['kuzuha', 'sora', 'oboro'],
      involvedLocationIds: ['main_hall', 'cedar_grove', 'shrine_courtyard', 'storehouse'],
      knownRewardCopy: 'An answer at the altar, and a fox who either keeps her tails or does not.',
      discoverWhen: { flagsSet: ['knows:the_vow'] },
      steps: [
        {
          id: 'what_it_binds',
          playerCopy: 'Find out what the vow binds, and what it costs her if nobody answers it.',
          directorNotes:
            'Four people and things can tell it, and they tell different halves. Kuzuha tells the cost of yes and leaves out the grey tails. Sora tells the lapse and leaves out the will. The board says only what Seiji wrote. Counting the tails says the rest. Whoever tells it, the heir should come away knowing the clock is real and that no is allowed.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Ask her straight what it binds',
              predicate: {
                flagsSet: ['used:speak_plainly'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['knows:what_the_vow_binds', 'she_told_you_herself'],
              closesFlags: [],
            },
            {
              routeId: 'sora_explained',
              label: 'Get Sora to explain the rite',
              predicate: { minRelationship: [{ characterId: 'sora', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:what_the_vow_binds', 'sora_explained'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_board',
              label: 'Read the board and the eleven names closely',
              predicate: { atLocation: 'main_hall', flagsSet: ['used:read_the_terms'] },
              setsFlags: ['knows:what_the_vow_binds', 'read_the_board'],
              closesFlags: [],
            },
            {
              routeId: 'counted_the_tails',
              label: 'Count the grey tails',
              predicate: { flagsSet: ['used:look_closer', 'spoke:kuzuha'] },
              setsFlags: ['knows:what_the_vow_binds', 'counted_the_tails'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['vow_understood'], abilities: [], reputation: [] },
        },
        {
          id: 'the_altar',
          playerCopy: 'Answer the vow at the altar, before the forty-ninth morning.',
          directorNotes:
            'The spine of the story. A wedding, a refusal to her face, new terms she signs, the board taken down and handed to her, or the keeper’s ward: every one is a complete answer and none is the good ending on its own. A wedding for duty is allowed and should be quietly sad; she will know. A refusal is allowed and she will thank the heir for saying it to her face, which is more than eleven others did. The wedding is sake, vows and the bell, and the scene ends at a kiss at most.',
          enterWhen: { flagsSet: ['vow_understood'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'married_meaning_it',
              label: 'Marry her because you want to',
              predicate: {
                atLocation: 'main_hall',
                hasItems: ['bridal_robes'],
                flagsSet: ['knows:why_she_waits'],
                minRelationship: [
                  { characterId: 'kuzuha', dimension: 'trust', value: 65 },
                  { characterId: 'kuzuha', dimension: 'affection', value: 75 },
                ],
                beforeWorldMinute: 3 * 1440 + 6 * 60,
              },
              setsFlags: ['married', 'married_meaning_it', 'vow_answered'],
              closesFlags: ['vow_refused', 'vow_rewritten', 'released_her', 'married_for_duty'],
            },
            {
              routeId: 'married_for_the_board',
              label: 'Marry her because the board says so',
              predicate: { atLocation: 'main_hall', hasItems: ['bridal_robes'], beforeWorldMinute: 3 * 1440 + 6 * 60 },
              setsFlags: ['married', 'married_for_duty', 'vow_answered'],
              closesFlags: ['vow_refused', 'vow_rewritten', 'released_her', 'married_meaning_it'],
            },
            {
              routeId: 'released_her',
              label: 'Take the board down and give it to her',
              predicate: {
                hasItems: ['the_vow_board'],
                flagsSet: ['knows:why_she_waits', 'used:speak_plainly'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['released_her', 'vow_answered'],
              closesFlags: ['married', 'vow_refused', 'vow_rewritten'],
            },
            {
              routeId: 'rewrote_it',
              label: 'Write new terms under the vow and ask her to sign',
              predicate: {
                flagsSet: ['used:rewrite_the_vow'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 55 }],
                beforeWorldMinute: 3 * 1440 + 6 * 60,
              },
              setsFlags: ['vow_rewritten', 'vow_answered'],
              closesFlags: ['married', 'vow_refused', 'released_her'],
            },
            {
              routeId: 'refused_to_her_face',
              label: 'Refuse her at the altar, to her face',
              predicate: {
                atLocation: 'main_hall',
                flagsSet: ['used:speak_plainly', 'spoke:kuzuha'],
                beforeWorldMinute: 3 * 1440 + 6 * 60,
              },
              setsFlags: ['vow_refused', 'vow_answered'],
              closesFlags: ['married', 'vow_rewritten', 'released_her'],
            },
            {
              routeId: 'sealed_her',
              label: 'Bind her under the cedar with the keeper’s ward',
              predicate: { flagsSet: ['used:keepers_ward', 'spoke:kuzuha'] },
              setsFlags: ['sealed_her'],
              closesFlags: ['married', 'vow_rewritten', 'released_her'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['altar_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_mountain', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_keepers_words',
      title: 'The Keeper’s Words',
      summary:
        'Sora Yanagi has run the shrine alone for forty-six days. She can teach you the rites, the ward among them, if she decides you are staying. She also holds a sealed envelope she will not open before the forty-ninth day.',
      kind: 'SIDE',
      involvedCharacterIds: ['sora', 'kuzuha'],
      involvedLocationIds: ['keepers_house', 'shrine_courtyard', 'the_steps'],
      knownRewardCopy: 'The keeper’s rites, the words for the ward, and what Sora actually wants.',
      discoverWhen: { flagsSet: ['sora_came_up'] },
      steps: [
        {
          id: 'learn_the_rites',
          playerCopy: 'Learn the keeper’s rites from Sora.',
          directorNotes:
            'She teaches by doing: the dawn sweep, the evening offering, the lanterns, the bell. The ward comes last and she teaches it with a warning: it holds any spirit, the fox included, and only the keeper can take it down. She teaches it because the keeper must know it, not because she wants it used.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'swept_with_her',
              label: 'Sweep the steps with her at dawn',
              predicate: {
                atLocation: 'the_steps',
                minRelationship: [{ characterId: 'sora', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['swept_the_steps'],
              closesFlags: [],
            },
            {
              routeId: 'asked_properly',
              label: 'Ask her properly to teach you',
              predicate: {
                flagsSet: ['used:speak_plainly', 'spoke:sora'],
                minRelationship: [{ characterId: 'sora', dimension: 'respect', value: 30 }],
              },
              setsFlags: ['asked_sora_properly'],
              closesFlags: [],
            },
            {
              routeId: 'mended_the_fox',
              label: 'Put the stone fox’s head back where it belongs',
              predicate: { hasItems: ['stone_fox_head'], atLocation: 'shrine_courtyard', flagsSet: ['used:mend_it'] },
              setsFlags: ['stone_fox_mended'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:the_ward'],
            abilities: ['keepers_ward'],
            reputation: [{ factionId: 'faction_mountain', amount: 10 }],
          },
        },
        {
          id: 'the_envelope',
          playerCopy: 'Find out what is in Sora’s envelope.',
          directorNotes:
            'Three ways, and they are not equivalent. Sora opening it on the forty-ninth day is the version where she keeps her dignity. Sora telling the heir early is trust. Opening it behind her back is the version where she finds out, and she is entitled to be very quietly furious.',
          enterWhen: { flagsSet: ['knows:the_ward'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself',
              predicate: { minRelationship: [{ characterId: 'sora', dimension: 'trust', value: 65 }] },
              setsFlags: ['knows:the_will', 'sora_told_you'],
              closesFlags: ['opened_her_envelope'],
            },
            {
              routeId: 'she_opened_it',
              label: 'Wait for the forty-ninth day',
              predicate: { afterWorldMinute: 3 * 1440, minRelationship: [{ characterId: 'sora', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:the_will', 'sora_opened_it'],
              closesFlags: ['opened_her_envelope'],
            },
            {
              routeId: 'opened_it_yourself',
              label: 'Open it behind her back',
              predicate: { hasItems: ['sora_envelope'], flagsSet: ['used:read_the_terms'] },
              setsFlags: ['knows:the_will', 'opened_her_envelope'],
              closesFlags: ['sora_told_you', 'sora_opened_it'],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['will_known'], abilities: [], reputation: [] },
        },
        {
          id: 'what_sora_is',
          playerCopy: 'Decide what Sora is to this shrine.',
          directorNotes:
            'She will not ask. Asking her to stay as a keeper is different from offering her a job, and she hears the difference. Handing her the shrine and walking away is allowed, and she will take it, and it will not be what she wanted.',
          enterWhen: { flagsSet: ['will_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her_to_stay',
              label: 'Ask her to stay as a keeper, not as help',
              predicate: {
                flagsSet: ['used:speak_plainly'],
                minRelationship: [
                  { characterId: 'sora', dimension: 'trust', value: 60 },
                  { characterId: 'sora', dimension: 'respect', value: 45 },
                ],
              },
              setsFlags: ['two_keepers', 'sora_stays'],
              closesFlags: ['gave_sora_the_shrine'],
            },
            {
              routeId: 'gave_it_to_her',
              label: 'Give her the shrine',
              predicate: {
                flagsSet: ['used:speak_plainly', 'knows:the_will'],
                minRelationship: [{ characterId: 'sora', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['gave_sora_the_shrine'],
              closesFlags: ['two_keepers'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['sora_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_town', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_foxfire',
      title: 'Foxfire',
      summary:
        'Kuzuha will lend her fire to whoever she is courting: a light, a warmth, a shove. Every use greys her tails a little faster, and she will not be the one to tell you so.',
      kind: 'SIDE',
      involvedCharacterIds: ['kuzuha', 'sora'],
      involvedLocationIds: ['shrine_courtyard', 'cedar_grove', 'north_slope'],
      knownRewardCopy: 'Her fire at your fingertips, and the price of it.',
      discoverWhen: { flagsSet: ['knows:the_vow'] },
      steps: [
        {
          id: 'the_offer_of_fire',
          playerCopy: 'Let her show you what her fire can do.',
          directorNotes:
            'This is courtship, her way: she shows off. Lanterns lit with a flick, the bath water hot, a crow knocked off the roof. She offers it to the heir as a lover’s gift and does not mention the cost. The fire is warm, not burning, unless she wants it to be.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_to_see',
              label: 'Ask her to show you',
              predicate: {
                flagsSet: ['spoke:kuzuha'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'affection', value: 40 }],
              },
              setsFlags: ['saw_her_fire'],
              closesFlags: [],
            },
            {
              routeId: 'fed_her_well',
              label: 'Feed her well enough that she shows off',
              predicate: {
                flagsSet: ['used:make_an_offering'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'affection', value: 35 }],
              },
              setsFlags: ['saw_her_fire', 'offering_accepted'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['foxfire_offered'], abilities: ['borrow_foxfire'], reputation: [] },
        },
        {
          id: 'what_fire_costs',
          playerCopy: 'Work out what her fire costs her.',
          directorNotes:
            'Every use greys her a little. She will deny it to the heir’s face. Somebody who watches her tails after she lends the fire can see it; Sora knows from the last keeper’s notes; and an heir who refuses the fire out loud earns a long silence and then the truth.',
          enterWhen: { flagsSet: ['foxfire_offered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'watched_the_tails',
              label: 'Watch her tails after she lends it',
              predicate: { flagsSet: ['used:borrow_foxfire', 'used:look_closer'] },
              setsFlags: ['knows:the_cost_of_fire'],
              closesFlags: [],
            },
            {
              routeId: 'refused_her_fire',
              label: 'Tell her you will not use it',
              predicate: {
                flagsSet: ['used:speak_plainly', 'foxfire_offered'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:the_cost_of_fire', 'refused_her_fire'],
              closesFlags: [],
            },
            {
              routeId: 'sora_warned_you',
              label: 'Let Sora tell you what the notes say',
              predicate: {
                flagsSet: ['foxfire_offered'],
                minRelationship: [{ characterId: 'sora', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_cost_of_fire', 'sora_warned_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['fire_understood'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_man_under_the_umbrella',
      title: 'The Man Under the Umbrella',
      summary:
        'A very polite man under a grey umbrella has offered to make the vow go away tonight, for free, without anybody having to say no to her face. He answers every question exactly, and only the question asked.',
      kind: 'SIDE',
      involvedCharacterIds: ['oboro', 'kuzuha', 'tadokoro'],
      involvedLocationIds: ['the_steps', 'mist_bridge', 'the_inn'],
      knownRewardCopy: 'The price of a free offer, and an answer to the mist.',
      discoverWhen: { flagsSet: ['mist_on_the_steps'] },
      steps: [
        {
          id: 'hear_him_out',
          playerCopy: 'Hear Oboro’s offer, and find out what he leaves out of it.',
          directorNotes:
            'He cannot lie, so play him straight: every sentence he says is true. What he leaves out is that a dissolved vow ends exactly like a refused one and the mountain becomes his. He says so the moment he is asked exactly. He is also on Tadokoro’s payroll, which he will confirm if asked and never volunteer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_exactly',
              label: 'Ask him exactly what happens to her',
              predicate: { flagsSet: ['spoke:oboro', 'used:speak_plainly'] },
              setsFlags: ['knows:oboros_price'],
              closesFlags: [],
            },
            {
              routeId: 'invited_him_in',
              label: 'Invite him across a threshold',
              predicate: {
                flagsSet: ['spoke:oboro'],
                minRelationship: [{ characterId: 'oboro', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['invited_oboro', 'knows:oboros_price'],
              closesFlags: [],
            },
            {
              routeId: 'found_his_name',
              label: 'Find his name on the survey',
              predicate: { hasItems: ['survey_report'], flagsSet: ['used:read_the_terms'] },
              setsFlags: ['knows:oboro_works_for_tadokoro', 'knows:oboros_price'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['oboro_understood'], abilities: [], reputation: [] },
        },
        {
          id: 'answer_him',
          playerCopy: 'Answer the man under the umbrella.',
          directorNotes:
            'Taking the deal is a real ending and must be playable to the end: the heir never has to say no to her face, and that is exactly what it costs. Turning him away is not a fight. If he is ever invited in and offered tea, he does not know what to do with his umbrella.',
          enterWhen: { flagsSet: ['oboro_understood'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_deal',
              label: 'Ask him to dissolve the vow',
              predicate: {
                flagsSet: ['knows:oboros_price'],
                minRelationship: [{ characterId: 'oboro', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['took_oboros_deal', 'vow_dissolved'],
              closesFlags: ['oboro_turned_away', 'oboro_welcomed'],
            },
            {
              routeId: 'turned_him_away',
              label: 'Tell him no',
              predicate: { flagsSet: ['used:speak_plainly', 'knows:oboros_price'] },
              setsFlags: ['oboro_turned_away'],
              closesFlags: ['took_oboros_deal'],
            },
            {
              routeId: 'rang_him_off',
              label: 'Ring the bell at the mist',
              predicate: { flagsSet: ['used:ring_the_bell', 'mist_on_the_steps'] },
              setsFlags: ['oboro_turned_away', 'rang_the_mist_off'],
              closesFlags: ['took_oboros_deal'],
            },
            {
              routeId: 'asked_him_in_for_tea',
              label: 'Ask him in for tea instead',
              predicate: {
                flagsSet: ['invited_oboro'],
                minRelationship: [{ characterId: 'oboro', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['oboro_welcomed', 'oboro_turned_away'],
              closesFlags: ['took_oboros_deal'],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['oboro_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_first_keeper',
      title: 'The First Keeper',
      summary:
        'Three hundred years ago the first keeper wrote the vow and married somebody else. His diary is in a lacquer box in the storehouse, and the last page of it is not the end of the story the town sings.',
      kind: 'LEAD',
      involvedCharacterIds: ['kuzuha', 'ume', 'sora'],
      involvedLocationIds: ['storehouse', 'cedar_grove', 'ume_shop'],
      knownRewardCopy: 'Why she has waited three hundred years, and what he never sent her.',
      discoverWhen: { flagsSet: ['visited:storehouse'] },
      steps: [
        {
          id: 'read_the_diary',
          playerCopy: 'Find out why the first keeper wrote the vow.',
          directorNotes:
            'He loved her and married a woman from the valley because he was afraid to choose a fox. The vow was an apology. Calling it a debt was her idea. Whoever tells this, tell it plainly and once; it changes how every later scene with her reads, and she knows it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it',
              label: 'Read the diary in the lacquer box',
              predicate: { hasItems: ['first_keepers_diary'], flagsSet: ['used:read_the_terms'] },
              setsFlags: ['read_seijis_diary'],
              closesFlags: [],
            },
            {
              routeId: 'heard_the_song',
              label: 'Get Ume to sing you the old work song',
              predicate: {
                flagsSet: ['spoke:ume'],
                minRelationship: [{ characterId: 'ume', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['heard_the_work_song'],
              closesFlags: [],
            },
            {
              routeId: 'asked_her',
              label: 'Ask her what she actually wants',
              predicate: {
                flagsSet: ['used:speak_plainly'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['she_told_you_about_seiji'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['knows:why_she_waits'], abilities: ['rewrite_the_vow'], reputation: [] },
        },
        {
          id: 'the_letter',
          playerCopy: 'Find what the first keeper wrote and never sent.',
          directorNotes:
            'It is sewn inside the diary’s back cover. Finding it takes looking hard at the box or taking the cover apart carefully. It is addressed to her by name and she has never seen it.',
          enterWhen: { flagsSet: ['knows:why_she_waits'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'looked_hard',
              label: 'Look hard at the diary and its box',
              predicate: { atLocation: 'storehouse', flagsSet: ['used:look_closer'] },
              setsFlags: ['found_the_letter'],
              closesFlags: [],
            },
            {
              routeId: 'unpicked_the_cover',
              label: 'Unpick the resewn cover',
              predicate: { hasItems: ['first_keepers_diary'], flagsSet: ['used:mend_it'] },
              setsFlags: ['found_the_letter'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [{ itemId: 'unsent_letter', qty: 1 }], flags: ['letter_found'], abilities: [], reputation: [] },
        },
        {
          id: 'give_it_to_her',
          playerCopy: 'Decide whether she should read it.',
          directorNotes:
            'Giving it to her is the most generous thing anyone has done for her in three hundred years, and the most dangerous: it tells her she was loved and not chosen, both at once. Keeping it is allowed. She will find out one day either way.',
          enterWhen: { flagsSet: ['letter_found'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_it_to_her',
              label: 'Give her the letter',
              predicate: {
                hasItems: ['unsent_letter'],
                flagsSet: ['spoke:kuzuha'],
                minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['gave_her_the_letter'],
              closesFlags: ['kept_the_letter'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it to yourself',
              predicate: { hasItems: ['unsent_letter'], flagsSet: ['used:talk_around_it'] },
              setsFlags: ['kept_the_letter'],
              closesFlags: ['gave_her_the_letter'],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['letter_decided'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_lanterns_light',
      atWorldMinute: 18 * 60 + 45,
      locationId: 'shrine_courtyard',
      publicCopy:
        'Down the steps, the stone lanterns light themselves one after another, top to bottom, except the one beside the offering box.',
      directorNotes:
        'They have done this every dusk for three hundred years. The one by the box has stayed dark since the last keeper died, and it lights again only if the vow is answered with a wedding or with new terms she signs. Kuzuha pretends not to look at it.',
      setsFlags: ['lanterns_lit'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_sora_comes_up',
      atWorldMinute: 19 * 60 + 5,
      locationId: 'shrine_courtyard',
      publicCopy:
        'Sora Yanagi comes up the last steps with a paper lantern and the evening offering, sees you, sees who is sitting on the offering box, and drops neither.',
      directorNotes:
        'She has expected the heir for six weeks and has a list: keys, rites, the roof, the forty-ninth-day rite. She is polite, exact and gives nothing away. Whether she sees the woman on the box tonight or only a large red fox is Kuzuha’s choice, and Kuzuha has not made it. Sora does not explain the plot; she does her job and watches.',
      setsFlags: ['sora_came_up'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'sora', toLocationId: 'shrine_courtyard' }],
    },
    {
      id: 'we_last_bus',
      atWorldMinute: 19 * 60 + 52,
      locationId: 'bus_stop',
      publicCopy: 'Far below, the last bus of the day pulls out of the town and its lights wind away down the valley.',
      directorNotes:
        'Anybody still on the mountain is staying the night. The keeper’s house has a futon and the last keeper’s radio; Ume has a spare room over the shop and will not take money for it. Walking the valley road in the dark takes three hours.',
      setsFlags: ['last_bus_gone'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_mist_on_the_steps',
      atWorldMinute: 23 * 60 + 30,
      locationId: 'the_steps',
      publicCopy:
        'Mist climbs the steps on a clear night and stops at the lowest gate, and somebody under a grey umbrella is standing in it, waiting to be noticed.',
      directorNotes:
        'Oboro. He will not come past the gate uninvited and will not raise his voice. He has an offer and all night to make it. If Kuzuha is with the heir, her tails go stiff and she says something rude about the weather. From now on the mist bridge can be reached from behind the great cedar.',
      setsFlags: ['mist_on_the_steps'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_vow'],
      movesCharacters: [{ characterId: 'oboro', toLocationId: 'the_steps' }],
    },
    {
      id: 'we_fourth_tail',
      atWorldMinute: 1440 + 3 * 60 + 40,
      locationId: 'cedar_grove',
      publicCopy: 'Before dawn, under the great cedar, a fourth of Kuzuha’s tails goes grey at the tip.',
      directorNotes:
        'Earlier than it should, because she has been spending her fire on the old wall. She hides it under the others and is short-tempered all morning. A player who looks closely can count it, and she will hate being counted.',
      setsFlags: ['fourth_tail_grey'],
      cancelledByFlags: ['vow_answered'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_tadokoro_climbs',
      atWorldMinute: 1440 + 9 * 60 + 30,
      locationId: 'shrine_courtyard',
      publicCopy:
        'Isao Tadokoro comes up the last steps out of breath, with a box of sweets, a folder and a surveyor carrying a tripod.',
      directorNotes:
        'He is friendly, quick and honest about the money: sixty million yen, a hotel, two hundred jobs, the hall rebuilt at the foot of the mountain. He sees a large red fox on the offering box and offers it a sweet. He does not mention the survey.',
      setsFlags: ['offer_made'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'tadokoro', toLocationId: 'shrine_courtyard' }],
    },
    {
      id: 'we_the_surveyor',
      atWorldMinute: 1440 + 10 * 60 + 15,
      locationId: 'north_slope',
      publicCopy:
        'Behind the hall, the surveyor photographs the old wall from six angles and writes nothing down while anybody is watching.',
      directorNotes:
        'He has seen the numbers already. The pegs he drives along the top of the wall are orange and new. He puts a hand on the stones, finds them warm, and takes his hand away quickly.',
      setsFlags: ['survey_taken'],
      cancelledByFlags: [],
      requiresFlags: ['offer_made'],
      movesCharacters: [],
    },
    {
      id: 'we_residents_meeting',
      atWorldMinute: 1440 + 19 * 60,
      locationId: 'the_inn',
      publicCopy:
        'The residents’ association meets in the big room of the Kawase Inn to vote on backing the ropeway, with tea, sweets and forty folding chairs.',
      directorNotes:
        'Ume speaks against it at length; Tadokoro speaks for it with drawings. The vote is close and the heir being there changes it. Anybody can speak. If the survey has come out, it is the only thing anybody talks about.',
      setsFlags: ['meeting_held'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'ume', toLocationId: 'the_inn' },
        { characterId: 'tadokoro', toLocationId: 'the_inn' },
      ],
    },
    {
      id: 'we_wall_slumps',
      atWorldMinute: 2 * 1440 + 2 * 60,
      locationId: 'north_slope',
      publicCopy:
        'In the middle of the night the old wall behind the hall slumps a hand’s width with a sound like a long breath, and every crow on the mountain leaves at once.',
      directorNotes:
        'Nobody is hurt. Kuzuha was too tired to hold it at the usual hour. The survey pegs have moved, anybody who looks at the slope can see it now, and the sale is worth less and more dangerous. She is ashamed and will be rude about it.',
      setsFlags: ['wall_moved'],
      cancelledByFlags: ['vow_answered', 'wall_shored'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_backers_deadline',
      atWorldMinute: 2 * 1440 + 17 * 60,
      locationId: 'the_inn',
      publicCopy: 'Five o’clock on the second evening. Tadokoro’s phone rings at the inn and he takes it outside.',
      directorNotes:
        'His backers’ deadline. Without a signature the ropeway on this mountain is finished; he can still propose the hotel in the town if anybody has given him the idea. He is not angry with the heir. He is an hour from being the man who came back for nothing.',
      setsFlags: ['backers_deadline_passed'],
      cancelledByFlags: ['mountain_decided'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_robes_aired',
      atWorldMinute: 2 * 1440 + 18 * 60,
      locationId: 'main_hall',
      publicCopy: 'Sora hangs the bridal robes over the rail of the main hall to air, without being asked and without a word about it.',
      directorNotes:
        'It is the last keeper’s April chore, done in the wrong month on purpose. Whatever the heir has decided, it is now in the open. Kuzuha sees the robes and goes very quiet.',
      setsFlags: ['robes_aired'],
      cancelledByFlags: ['vow_answered'],
      requiresFlags: ['knows:what_the_vow_binds'],
      movesCharacters: [{ characterId: 'sora', toLocationId: 'main_hall' }],
    },
    {
      id: 'we_forty_ninth_morning',
      atWorldMinute: 3 * 1440 + 6 * 60,
      locationId: 'main_hall',
      publicCopy: 'The forty-ninth morning. The sun clears the ridge, and the vow on the altar has not been answered.',
      directorNotes:
        'The vow lapses as if refused. Kuzuha makes no scene. She goes to the great cedar and lies down in the hollow as a fox, and by evening she is not quite sure of the heir’s name. Sora opens her envelope. Nobody blames the heir out loud, and the prose must not either.',
      setsFlags: ['vow_lapsed'],
      cancelledByFlags: ['vow_answered', 'vow_dissolved', 'sealed_her'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'kuzuha', toLocationId: 'cedar_grove' }],
    },
  ],
  promises: [
    {
      id: 'p_the_wedding',
      kind: 'FINALE',
      label: 'Whether there is a wedding by the forty-ninth morning',
      seedHint: 'A vow in three-hundred-year-old ink, and a fox eating your dinner on the offering box.',
      payoffHint: 'Somebody kneels at the altar, or says no there to her face, and the dark lantern by the box lights or does not.',
      weight: 1,
    },
    {
      id: 'p_why_she_waits',
      kind: 'RELATIONSHIP',
      label: 'Why a fox has waited three hundred years',
      seedHint: 'She knows exactly how many keepers said no to her, and makes a joke of it every time.',
      payoffHint: 'The first keeper loved her and married somebody else, and the vow was his apology. Calling it a debt was her idea.',
      weight: 0.9,
    },
    {
      id: 'p_the_umbrella',
      kind: 'RIVAL',
      label: 'The polite man under the umbrella',
      seedHint: 'Mist on the lowest steps on a clear night, and somebody standing in it.',
      payoffHint: 'He wants the mountain, and he will dissolve the vow for anybody who asks him, because a dissolved vow hands it to him.',
      weight: 0.75,
    },
    {
      id: 'p_the_wall',
      kind: 'MYSTERY',
      label: 'What the old wall is holding up',
      seedHint: 'The surveyor writes nothing down while anybody is watching, and the stones are warm at dawn.',
      payoffHint: 'The survey’s "load-bearing factor this survey cannot identify" is her, every dawn, and it is costing her tails.',
      weight: 0.7,
    },
    {
      id: 'p_what_sora_gets',
      kind: 'THEME',
      label: 'What Sora gets if you leave',
      seedHint: 'She knows where every key goes and does not offer to show you.',
      payoffHint: 'The envelope: the shrine is hers if you refuse it or sell, and she will not win it that way.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_hands',
      name: 'You Build Things',
      role: 'Practical repair and hard work',
      summary:
        'You fix roofs and walls for a living, so the leaking hall, the headless stone fox and the old wall behind the hall are all jobs you can actually do.',
      playstyle: ['Practical', 'Physical', 'Fixes things'],
      blurb:
        'You looked at the roof before you looked at the fox, and you are still a little annoyed with yourself about which one you found more interesting.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { handiwork: 3, footwork: 1, sight: 1 },
      startingItems: [{ itemId: 'tool_bag', qty: 1 }],
      startingAbilities: ['ring_the_bell', 'mend_it'],
      startingReputation: [{ factionId: 'faction_mountain', amount: 5 }],
    },
    {
      id: 'arch_papers',
      name: 'You Read Contracts',
      role: 'Fine print and hard questions',
      summary:
        'You read contracts for a living, so a three-hundred-year-old vow, a will with a sealed condition and a purchase offer are all documents you know how to take apart.',
      playstyle: ['Careful', 'Sceptical', 'Reads everything'],
      blurb:
        'Tadokoro emailed his offer before you had even seen the place, and you printed it on the train and annotated it in red. Clause fourteen worries you.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { fine_print: 3, candour: 2 },
      startingItems: [{ itemId: 'purchase_offer', qty: 1 }],
      startingAbilities: ['ring_the_bell', 'read_the_terms'],
      startingReputation: [{ factionId: 'faction_tadokoro', amount: 10 }],
    },
    {
      id: 'arch_kitchen',
      name: 'You Cook for a Living',
      role: 'Food, warmth and patience',
      summary:
        'You cook for a living, and a fox who has eaten offerings for three hundred years has opinions about food that you can actually answer.',
      playstyle: ['Warm', 'Generous', 'Feeds people'],
      blurb:
        'You stopped at the general store on the way up because you could not help yourself, and the old woman behind the counter loaded you down with rice balls and a nickname.',
      attributeBonus: { presence: 2, mind: 2 },
      skillProficiencies: { cooking: 3, banter: 2 },
      startingItems: [{ itemId: 'plum_rice_balls', qty: 3 }],
      startingAbilities: ['ring_the_bell', 'make_an_offering'],
      startingReputation: [{ factionId: 'faction_town', amount: 10 }],
    },
    {
      id: 'arch_local',
      name: 'You Stayed Here Once',
      role: 'Old ties and second sight',
      summary:
        'You spent one summer up here with your great-aunt long ago, so you see the mountain’s small spirits more easily than most, and half the town remembers your face.',
      playstyle: ['Intuitive', 'Rooted', 'Sees spirits'],
      blurb:
        'You remember a red fox that sat on the offering box every evening that summer and watched you eat. You had assumed, until tonight, that you made it up.',
      attributeBonus: { arcana: 3, presence: 1 },
      skillProficiencies: { sight: 3, rites: 1, banter: 1 },
      startingItems: [{ itemId: 'fox_charm', qty: 1 }],
      startingAbilities: ['ring_the_bell', 'look_closer'],
      startingReputation: [{ factionId: 'faction_town', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the lawyer’s letter?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Ren Asano' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What did you do before you inherited a shrine?',
      helpText:
        'The work you did in the city before the lawyer’s letter came, which sets what you are good at. It is fixed for the whole story. It does not decide whether you marry her, refuse her, sell the mountain or stay; all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the town already know about you?',
      helpText: 'Small towns talk. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have not been back since the summer I was here, and I never wrote to her once.',
    },
    {
      id: 'why_you_came_up',
      label: 'Why did you climb up here tonight?',
      helpText: 'A starting intention, not a promise. You can change your mind on the offering box and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'to_sell_it', label: 'To look at it once before I sell it' },
        { id: 'to_keep_it', label: 'To see whether I could keep it' },
        { id: 'for_her', label: 'To find out who my great-aunt was' },
        { id: 'to_hide', label: 'Because I needed somewhere nobody knows me' },
        { id: 'on_a_dare', label: 'Because my family dared me to' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the fox see at the top of the steps?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Out of breath, a city coat, a convenience-store bag, and the face of somebody who expected a quiet look round.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Fourteen, and the first twelve are the ones production's storyteller
   * reads, so walking away, the sale and every plain loss sit inside them.
   * Seven are losses or bittersweet and none is written as a punishment. "The
   * Last Lantern" is what happens when nobody answers, which means it is
   * reachable by playing pleasantly for three days and never saying yes or no —
   * the honest failure of this story, the way "Separate Rooms" is Good
   * Morning, Husband's. "The Last Bus" is walking down the steps, available
   * early.
   */
  endings: [
    {
      id: 'end_as_promised',
      name: 'As Promised',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['married', 'married_for_duty'] },
      condition:
        'The heir married her at the altar because the board said so: sake, vows, the bell, the dark lantern lit. It is a real wedding and a quiet loss, and both of them know it. Do not punish the player for it and do not pretend it is the other thing. She is gracious, and she counts the nights.',
      epilogue:
        'The keeper comes back up the steps every evening, as the vow requires, and she is on the offering box every time. They are polite to each other for a long while. In the second spring she starts leaving one plum on the step for them, and neither of them mentions it.',
      hint: '',
    },
    {
      id: 'end_three_hundred_years_late',
      name: 'Three Hundred Years Late',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['married', 'married_meaning_it', 'knows:why_she_waits'],
        minRelationship: [{ characterId: 'kuzuha', dimension: 'affection', value: 80 }],
      },
      condition:
        'The heir knew why she waited, knew what yes would cost them, and married her because they wanted to. This is the first time in three hundred years anybody has chosen her. Write the wedding small and specific, the robes too long, the sake spilled, the bell rung twice by accident, and end it at a kiss.',
      epilogue:
        'All nine tails come back red by midsummer. The lantern beside the offering box lights every dusk and nobody has to ask it to. The town calls the keeper by the fox’s name for them, which is not "heir" any more, and Ume prints it on the paper round the plum rice balls.',
      hint: 'He never chose her. Somebody could.',
    },
    {
      id: 'end_engaged_with_conditions',
      name: 'Engaged, With Conditions',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['vow_rewritten'] },
      condition:
        'The heir wrote new terms under the vow and she signed them freely: a courtship instead of a debt, with a date to revisit it and a way for either of them to walk away. It is not a wedding and it is not a no. Write two people negotiating a romance like a contract and enjoying it.',
      epilogue:
        'The new terms are pinned under the old board in ballpoint: one dinner a week, one night away a month allowed, the question to be asked again next spring by whichever of them is braver. She crosses out "braver" and writes "less proud". The lantern lights about half the time, which they both find funny.',
      hint: '',
    },
    {
      id: 'end_the_keeper',
      name: 'The Keeper',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['vow_refused'], flagsUnset: ['sold_the_mountain'] },
      condition:
        'The heir refused her to her face at the altar and kept the shrine anyway. She thanks them for saying it, which is more than eleven others managed. Over the following weeks she becomes an ordinary red fox. Write it gently and without blame; the heir did an honest thing and it still cost something.',
      epilogue:
        'The keeper sweeps the steps, rings the bell at dusk and keeps two plum rice balls on the box on Thursdays. A large red fox still comes up out of the cedars at dusk and sits on the offering box to watch them eat. It does not remember why. It comes anyway.',
      hint: '',
    },
    {
      id: 'end_the_ropeway',
      name: 'The Ropeway',
      rarity: 'COMMON',
      minTurn: 20,
      requires: { flagsSet: ['sold_the_mountain'], flagsUnset: ['wall_moved'] },
      condition:
        'The heir signed Tadokoro’s offer before the wall moved. The town gets its jobs and the mountain gets a ropeway, and whatever happened to the vow happened somewhere else. This is a real, defensible choice and should be written as one, including what it costs the fox.',
      epilogue:
        'The gondolas run every twelve minutes from spring. The hall is rebuilt at the foot of the mountain with a much better roof. Tourists photograph a large red fox that sits on the top station every evening and will not be moved, and the staff start leaving it plum.',
      hint: '',
    },
    {
      id: 'end_mist_on_the_steps',
      name: 'Mist on the Steps',
      rarity: 'UNCOMMON',
      minTurn: 22,
      requires: { flagsSet: ['took_oboros_deal'] },
      condition:
        'The heir asked Oboro to dissolve the vow so that nobody would have to say no to her face. He did exactly that. The vow is gone, her tails grey out as if refused, and the mountain’s spirit-seat passes to the mist. Nobody lied to the heir, and that is the cruelty of it.',
      epilogue:
        'The mountain is foggy now on clear days. The lanterns on the steps light late and unevenly. Oboro is a perfectly good landlord. On some evenings a grey-muzzled red fox sits at the lowest gate looking up the steps, and the mist parts round it politely and does not ask it in.',
      hint: '',
    },
    {
      id: 'end_the_last_lantern',
      name: 'The Last Lantern',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['vow_lapsed'] },
      condition:
        'Nobody answered by the forty-ninth morning and the vow lapsed. This must not be written as a punishment for playing badly: the heir may have been kind, funny and present for three days and simply never said yes or no, and that turned out to be an answer. There is no scene where anybody explains what went wrong.',
      epilogue:
        'The lantern beside the offering box stays dark. Sora opens her envelope and puts it back without reading it twice. The fox under the cedar gets smaller and redder and simpler over the summer, and by the first frost it eats from the heir’s hand like any wild thing that has been fed long enough.',
      hint: 'Three dawns. Nobody is counting but her.',
    },
    {
      id: 'end_sealed_under_the_cedar',
      name: 'Sealed Under the Cedar',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['sealed_her'] },
      condition:
        'The heir used the keeper’s ward and bound her under the great cedar. It is the keeper’s right and it works. Write the mountain going very quiet, Sora not speaking to the heir, and the fact that only the keeper can take the paper down, which means it is still a choice every single morning.',
      epilogue:
        'The ward paper on the cedar yellows over the summer and is replaced in the autumn by the keeper’s own hand. The crows stop calling the hours. Every dusk the bell rope sways with no wind for exactly as long as it takes to say a name, and then stops.',
      hint: '',
    },
    {
      id: 'end_the_last_bus',
      name: 'The Last Bus',
      rarity: 'UNCOMMON',
      minTurn: 14,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['married'] },
      condition:
        'The heir walked down the steps and left. That is a completely coherent response to a fox demanding a wedding on the first night, and the person it costs most is not the heir. Do not redeem it and do not make it a tragedy. She walks them down as far as the lowest gate and not one step further.',
      epilogue:
        'The will does what the last keeper wrote: the shrine goes to Sora Yanagi within the year. Sora sweeps the steps every morning and leaves the eleven names and the empty line under them exactly as they are. A large red fox sits at the lowest gate at 19:52 every evening for a while, and then stops.',
      hint: '',
    },
    {
      id: 'end_she_went_to_see_the_sea',
      name: 'She Went to See the Sea',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['released_her', 'knows:why_she_waits'] },
      condition:
        'The heir knew why the vow was written, took the board down off the wall and handed it to her: no wedding, no refusal, no debt. With the vow gone she keeps her tails and can pass the lowest gate for the first time in three hundred years. Write her standing at the gate and not believing it.',
      epilogue:
        'She goes. Postcards arrive at the shrine with no stamp, all of them of the sea, all of them signed with a drawing of a fox. In the second autumn she comes back up the steps with sand in her sleeves and sits on the offering box, and says she was only passing. She stays for dinner. She stays.',
      hint: '',
    },
    {
      id: 'end_two_keepers',
      name: 'Two Keepers',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['two_keepers', 'refused_the_sale'], flagsUnset: ['married', 'sold_the_mountain'] },
      condition:
        'No wedding and no sale: the heir asked Sora to stay as a keeper, not as help, and kept the mountain with her. Whatever the heir did about the vow, the shrine has two people who chose it. This is Sora’s ending as much as the heir’s, and the prose should let her be pleased about it in her own very small way.',
      epilogue:
        'There are two names at the bottom of the board now, in two hands, one of them much neater. The steps are swept twice as fast and argued about twice as much. Sora finally opens the rite book flat at the wedding pages, reads them, and shuts it again with a look at the heir that means nothing at all.',
      hint: '',
    },
    {
      id: 'end_before_the_rains',
      name: 'Before the Rains',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['sold_the_mountain', 'wall_moved'] },
      condition:
        'The heir sold the mountain after the old wall had already started to go, and everybody at the signing knew it. The ropeway is redesigned, delayed and finally cancelled, and the north slope is fenced. Write it as a sale that was legal, sensible and a little too late, and do not make anybody the villain of it.',
      epilogue:
        'The rainy season brings the north slope down in one long night, onto nothing and nobody. Tadokoro’s company folds by autumn. The hall stands alone above a new cliff with its roof still leaking, and the lantern by the offering box lights once, the night of the slide, and never again.',
      hint: '',
    },
    {
      id: 'end_every_lantern_lit',
      name: 'Every Lantern Lit',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: {
        flagsSet: ['married_meaning_it', 'hotel_in_town'],
        minFactionReputation: [{ factionId: 'faction_town', value: 35 }],
      },
      condition:
        'Everything at once: the heir married her meaning it, talked Tadokoro into building his hotel in the town instead of on the slope, and the town is behind both decisions. Nobody lost the thing they came for. Write it as a festival, specific and loud, with the fox pretending not to enjoy it.',
      epilogue:
        'The hotel opens in the old school building with forty rooms and Ume’s rice balls at breakfast. The shrine festival comes back after twenty years, and every lantern on the steps lights at once, including the one by the offering box. Tadokoro carries the drum. Oboro attends, under his umbrella, by invitation.',
      hint: '',
    },
    {
      id: 'end_the_letter_he_didnt_send',
      name: 'The Letter He Didn’t Send',
      rarity: 'UNIQUE',
      minTurn: 32,
      requires: {
        flagsSet: ['gave_her_the_letter'],
        minRelationship: [{ characterId: 'kuzuha', dimension: 'trust', value: 80 }],
      },
      condition:
        'The heir found the first keeper’s unsent letter and gave it to her, and she trusts them more than she has trusted anyone in three hundred years. Whatever happens with the vow, she now knows she was loved and not chosen, and she has decided to be chosen properly or not at all. Write her reading it alone, then coming to find the heir.',
      epilogue:
        'She keeps the letter in her sleeve, and on the first dusk after she has read it she climbs down the steps as far as the lowest gate, which the vow still forbids her to pass, and puts one hand flat against it. Then she climbs back up and sits on the offering box beside the heir instead of above them.',
      hint: '',
    },
  ],
  opening:
    "The shrine you inherited is three hundred steps up a mountain. At the top, you set your dinner on the offering box to catch your breath.\n\nWhen you look up, a woman is eating it.\n\n\"You’re late,\" she says, through a mouthful of your sandwich. \"I’m Kuzuha.\"\n\nFox ears. Gold eyes. Nine tails sway behind her like slow red flames.\n\n\"I’ve waited on this mountain three hundred years.\" She points the sandwich at the dark hall. \"There’s a vow on that altar. Your family owes me a wedding, and you’re the last of the line.\"\n\nThe bell rope sways. There’s no wind.\n\nShe stands, tails rising. \"Kneel and say yes. Or don’t, and tell me why.\"",
  openingSuggestions: [
    '"That was my dinner. Start with the wedding part. Slowly."',
    'I walk past her into the dark hall to read the vow myself.',
    'I kneel and say yes, right now, before she changes her mind.',
  ],
  coverDirection: [
    'SUBJECT: Kuzuha, the nine-tailed fox of the shrine, alone and unmistakable in the foreground of a key visual for a romantic comedy fantasy anime.',
    'She fills the frame from the knees up, centred and close, holding about two thirds of the picture.',
    'An adult woman, tall and long-limbed, copper-red hair to her waist, gold eyes, red fox ears with dark tips, a white kimono under a crimson outer robe with the sleeves tied back by red cord.',
    'She sits cross-legged on top of a wooden shrine offering box with half a sandwich in one hand, and holds the other hand out toward the viewer palm up, as if waiting for an answer.',
    'Nine red fox tails fan out behind her like slow flames; three of them are ash-grey at the tips.',
    'Her expression is imperious and amused, one eyebrow raised, looking straight at the viewer.',
    'BEHIND HER, soft and secondary: the top of long mossy stone steps, a vermilion shrine gate, a bronze bell on a red and white rope, glowing stone lanterns, tall cedars, deep blue dusk.',
    'LIGHT: warm gold lantern light on her face and tails, cool blue dusk behind, so she is rimmed in gold against the blue.',
    'TITLE: the words MARRIED TO THE SHRINE FOX painted into the art in the upper third as a bold brush-lettered logo, white with a soft gold glow,',
    'spelled exactly MARRIED TO THE SHRINE FOX, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const MARRIED_TO_THE_SHRINE_FOX = StoryVersion.parse(raw);
