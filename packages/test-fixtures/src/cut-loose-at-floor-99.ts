import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Cut Loose at Floor 99" — the betrayal is the opening beat, and the betrayed
 * party member starts the story holding the betrayers' lives in their hand.
 *
 * The kicked-out-of-the-party fantasy usually begins after the fact, with the
 * hero already safe and already strong. This one begins during the fall. The
 * player is Highwater's binder, the support mage whose threads of mana took a
 * share of everybody's hurt for nineteen days, and the threads do not break
 * when the rope does. So turn one is not "how do I survive". It is the question
 * the Voice asks: do the four of them get to reach the top? Hold them, cut one,
 * let all four go, listen down one, or ask who is talking. Every one of those
 * is an authored route and none of them is the right one.
 *
 * Production runs `runTurnPure`, which reads the premise, tone, hard canon,
 * cast, opening, places, quest items, factions, quest summaries, world events
 * and the first twelve endings. Resources, step notes and locked abilities never
 * reach it; of the ability list it sees only the chosen archetype's starting
 * abilities. So the thread mechanic lives in three places it does read: hard
 * canon and the premise, a quest item the player starts holding (Your Four
 * Threads), and the five thread moves every archetype starts with. That is also
 * why there are exactly twelve endings.
 *
 * Revenge is one road among several and is allowed to feel good. The four
 * betrayers are four different kinds of guilty — Lucan did it, Kes agreed,
 * Elsbeth looked away, Bran was lied to — so "get even" is never one move.
 *
 * Three variables. Mana is the only GOOD_HIGH, because `resolveRest` refills
 * those and a binder who has slept is the honest thing for that to mean; it is
 * also what holding four people up from ninety-nine floors away costs. Tremor is
 * first among the descending pair on purpose: PUBLIC_VIOLENCE raises the first
 * GOOD_LOW in array order, and a fight waking the deep floors is right for this
 * world. Undertow is how far the bottom floor has its hooks in the player.
 * The Tally House is the first faction for the same reason: it enforces the
 * Delvers' Peace, so it is who a public fight below the Rim offends.
 */

const raw = {
  id: 'sv_cut_loose_at_floor_99_1',
  storyId: 'story_cut_loose_at_floor_99',
  version: 1,
  title: 'Cut Loose at Floor 99',
  fantasyLabel: 'They cut your rope. The dark caught you.',
  hook: 'Your party cut your rope on the dungeon’s last charted floor so the prize would split four ways. You can still feel all four of them climbing. And something at the bottom says your name.',
  premise:
    'The Deepway is a dungeon of ninety-nine floors under the city of Lowmarch, and for sixty years every guild in the city has paid crews to reach the bottom.\n\n' +
    'Your crew, Highwater, did it today. You are its support mage, a binder: you tie thin threads of mana to the people beside you, so they take less hurt, keep their footing and feel a fall coming before it happens. They called it shields. It was most of the reason they were still alive.\n\n' +
    'Behind the Last Door on the ninety-ninth floor was the Heartglass, a core the Gilt Rope Guild will pay a fortune for. On the way out you were last across the pit, and Lucan, your best friend for eight years, knelt at the edge and cut your rope, because four shares beat five.\n\n' +
    'You fell past the bottom of every map into black water, on a floor nobody knew was there. Something down here has been waiting a very long time, and it knows your name.\n\n' +
    'Your threads are still tied to all four of them, and you can feel them climbing. The city above has been told you are dead. The climb out takes days, and since the Heartglass left its vault the deep floors have started to wake.\n\n' +
    'Hold them up or let them fall. Get out, get even, or find out why the dark was waiting for you.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Dark fantasy', 'Monsters', 'Mystery', 'Survival', 'Revenge'],
  mechanicsChips: [
    'Your threads are still on them',
    'Every betrayer is different',
    'A voice with her own plans',
    'Revenge is one road of many',
    'The deep is waking up',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend the whole story getting even, and it is satisfying. You can also hold all four threads the entire climb and let them work out what you were worth one floor at a time, or never go back up at all. The woman in the light will help with any of it. Ask her what it costs.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_sump',
    startWorldMinute: 18 * 60 + 10,
    startingItems: [
      { itemId: 'four_threads', qty: 1 },
      { itemId: 'cut_rope_end', qty: 1 },
      { itemId: 'brass_focus', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-six: they and Lucan met at the delvers’ hostel at eighteen and founded Highwater together that year, eight years ago. Bran joined five years ago, Elsbeth three years ago and Kes two years ago. Lucan Harrow is twenty-six, Elsbeth Marr twenty-four, Kestrel Ivo twenty-two, Bran Tull thirty-one, Taro Kade twenty-seven, Hesper Moss fifty-six and Odran Sallow eighty-eight. The Voice is eighty-seven by the calendar, and the shape she shows in the lichen-light is the woman she was at twenty-six.',
      'The Deepway is a dungeon of ninety-nine charted floors under the city of Lowmarch. Nobody had cleared Floor 99 until today. Below it is a floor on no chart, the Sump, where everything that falls anywhere in the Deepway ends up.',
      'The player is Highwater’s support mage, a binder. A binder ties thin threads of mana to people: the threads take a share of their hurt, steady their footing and warn them before a fall. When the story begins, four threads are still tied, to Lucan, Elsbeth, Kes and Bran, and the player can feel each one. The player can hold them, cut one, let all four go, listen down one, or tug one. Listening is one-way: the player hears what is said at the other end, and nothing the player says travels up a thread. A thread is felt, not hauled like a rope. A hard tug lands as a jolt, a cold shock at the wrist or a stumble, never enough by itself to throw anybody off a ledge or kill them. Cutting a thread or letting go only takes the ward away; after that the danger comes from the Long Stair and the waking deep, over hours, not in the same instant. If the player pulls Lucan’s thread hard, he stumbles on a ledge two floors up and Kes catches his collar.',
      'At ten past six in the evening Lucan Harrow cut the player’s rope over the pit on Floor 99 and said four shares beat five. Kes agreed beforehand. Elsbeth saw the knife and looked away. Bran was two flights up the stair with the lamp and was told the player slipped.',
      'All four believe the player died in the fall, and none of them can hear the player. To them a tug is a jolt or a cold shock at the wrist, the kind a ward gives on a bad step, not a message. They learn the player is alive only if the player shouts up the Echo Shaft, which every floor above hears, sends a tug in knots they can read as the player’s, or climbs up and faces them.',
      'The Voice is real, not a hallucination. She cannot leave the Sump on her own, she does not lie outright, and she withholds a great deal, including her name.',
      'Highwater took the Heartglass from the vault behind the Last Door. Since it left the vault the deep floors have been waking, slowly. Only a binder can hold it without the deep waking around them.',
      'The Tally House writes every delver in and out of the Deepway and keeps the Book of the Lost. Under the Delvers’ Peace no delver raises a blade against another below the Rim, and a cut rope proven in front of the Tallykeeper strips the cutter of share, sponsor and the right to go down again.',
      'Odran Sallow stays in the Gilt Rope Hall in Lowmarch for the whole story and has no way into the Deepway: no voice, thread or message of his reaches the Sump, the Echo Shaft or the Long Stair, and he learns what happens below only from people who climb out. The player first hears him at the surface.',
      'There is no wayline below Waycamp Ninety: below it there are only stairs and ropes, and the guild lift starts there. Climbing out from the Sump takes days, not hours.',
      'Nobody is owed the player’s forgiveness and nobody is owed their revenge: the player can hold, cut, forgive, expose, bargain, stay below or walk away, and none of these is the correct one.',
    ],
    toneGuide:
      'Dungeon action with a betrayal at the centre. Short paragraphs, one hard image each, dialogue that cuts. The dungeon is physical: rope, lamp oil, wet stone, hours and floors. Threads are felt in the wrists and fingertips — a hum, a tug, a sudden cold — and the craft is shown by what it does, never by numbers. ' +
      'Fights are quick and legible: who has the light, the ledge, the rope. Nothing graphic, and no lingering on injuries. Revenge may feel good and it is never free. ' +
      'The four betrayers are four different kinds of guilty and none of them is a cartoon: Lucan is charming and cornered, Kes is honest about being mercenary, Elsbeth is ashamed, Bran was lied to. The Voice is warm, curious and slightly wrong, never a jump scare. Odran Sallow is courteous all the way down. Who the Voice used to be, and what Sallow did on Floor 61, are reveals the player earns through her badge, her name or a confession; never state them early. ' +
      'Romance is possible, with Elsbeth or with Taro, and stays at tension, honesty and at most a kiss. The face at the top of a beat is the Voice’s whenever the scene is on the bottom floor, and Lucan’s whenever he is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The light on the wall leans closer.\n\n\"That one,\" she says. \"The tall one. He's on the ninety-seventh floor and his thread is shaking.\"\n\nYou can feel it. A shiver at the end of a line you have held for nineteen days.\n\n\"Bran,\" you say.\n\n\"Is that his name?\" She sounds delighted. \"Something is following him up the stair. He can't see it. You could.\"\n\nThe thread hums.\n\n\"Or,\" she says, \"you could let him find out what the dark is like without you.\"",
      "Taro Kade crouches at the lip of the drain with a lamp and looks at you for a long time.\n\n\"Friend,\" he says finally. \"You're supposed to be dead.\"\n\n\"Lucan cut the rope.\"\n\nHe doesn't laugh. He holds out a hand for the rope end and turns the clean cut to the light.\n\nThen he whistles, once, and eleven lamps come to the edge.\n\n\"Forty crowns for a hand up,\" he says. \"And I want to be standing there when you show him this.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 11, mind: 13, presence: 11, resolve: 13, arcana: 14 },
  skills: [
    { id: 'binding', name: 'Binding', attribute: 'arcana', description: 'Tying a thread of mana to a person or a thing, and keeping it tied when they are a long way off.' },
    { id: 'warding', name: 'Warding', attribute: 'resolve', description: 'Taking a blow meant for somebody else down a thread, and staying on your feet afterwards.' },
    { id: 'delving', name: 'Delving', attribute: 'mind', description: 'Reading a floor: where the stair is, what lives here, which ledge will hold.' },
    { id: 'listening', name: 'Listening', attribute: 'mind', description: 'Hearing what comes down a shaft or a thread, and what somebody meant by it.' },
    { id: 'climbing', name: 'Climbing', attribute: 'might', description: 'Rock, rope and the last ten metres when your arms have already gone.' },
    { id: 'scrapping', name: 'Scrapping', attribute: 'might', description: 'Fighting with whatever is in reach, now the people who did the fighting have gone.' },
    { id: 'quiet', name: 'Moving Quiet', attribute: 'agility', description: 'Getting past things that hunt by sound, and people who are listening for you.' },
    { id: 'bargaining', name: 'Bargaining', attribute: 'presence', description: 'Getting a delver to deal with you when they have every reason to reach for a knife instead.' },
  ],
  resources: [
    {
      id: 'mana',
      name: 'Mana',
      max: 100,
      start: 46,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The threads go one by one, furthest first, and nobody chooses the order. Wherever the four of them are, each feels it as a sudden cold at the wrist and a step that is suddenly much harder to trust.',
      color: '#7FB2E5',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Running on the last of it. The player can keep one thread properly and the rest only by gritting their teeth, and every spell comes out thin and late. This is the band where a thread slips without being chosen, and where sleeping on a dry ledge is the strongest move available.',
        },
        {
          upTo: 55,
          behaviour:
            'The ordinary tiredness of somebody holding four people up from far below. Good for one real binding or one hard climb, and honest about not having both in them. The threads hum when the player is calm and go faint when they are frightened.',
        },
        {
          upTo: 100,
          behaviour:
            'Full. The threads are warm and steady, and the player can feel each of the four distinctly: who is climbing fastest, who has stopped, whose heart is going. There is room to try something new with the craft, and to be generous with it.',
        },
      ],
    },
    {
      id: 'tremor',
      name: 'Tremor',
      max: 100,
      start: 18,
      regenPerHour: 0.8,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The Deepway sleeps the way it has for sixty years. Monsters keep to their floors, the stairs are where the maps say, and nothing ticks.',
      color: '#B5553C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The deep floors are drowsy. Walls tick now and then, far off, like a clock in another room. Monsters keep to the floors the maps say they live on, and the stairs are where they were yesterday. Old delvers feel it in their back teeth and say nothing.',
        },
        {
          upTo: 55,
          behaviour:
            'Things are moving that should not be. Steps that held on the way down give way on the way up, nests in the Long Stair’s alcoves are awake, and the lift crew at Waycamp Ninety start asking each other whether anybody else heard that.',
        },
        {
          upTo: 80,
          behaviour:
            'The deep is climbing. Creatures from below Floor Ninety are seen above it for the first time in the records, guild camps double their watches, and the Tally House stops letting crews go down below Sixty. Every scene below the Rim has a sound underneath it.',
        },
        {
          upTo: 100,
          behaviour:
            'The Deepway is awake. The Rim shakes, every lamp in Lowmarch swings at once, and cold air breathes out of the mouth of the dungeon for an hour at a time. Whoever holds the Heartglass and can bind is the most important person in the city, and everybody knows it.',
        },
      ],
    },
    {
      id: 'undertow',
      name: 'Undertow',
      max: 100,
      start: 6,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nothing below has a claim on the player. The Voice is a voice in the light, and the dark is only the dark.',
      color: '#3E6F78',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The player is entirely themselves. The bottom floor is a place they are in rather than a place that has noticed them, and the Voice is a voice in the light on the walls and nowhere else.',
        },
        {
          upTo: 50,
          behaviour:
            'The lichen-light follows the player a little, brightening when they speak. They hear names in their sleep from floors they have never stood on, and the Voice can speak to them anywhere a thread runs, quietly, like somebody at their shoulder.',
        },
        {
          upTo: 80,
          behaviour:
            'Light hurts. The player has started to pick up her old-fashioned turns of phrase without meaning to, and the things that live in the dark step aside for them as if for one of their own. People on the surface notice something and cannot say what.',
        },
        {
          upTo: 100,
          behaviour:
            'The bottom floor wants them to stay. Climbing feels like walking away from home, the surface sounds thin and far off, and if the player allows it the Voice can move their hands. None of it is permanent, and none of it is undone by accident.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'four_threads',
      name: 'Your Four Threads',
      tags: ['quest', 'binding'],
      questItem: true,
      droppable: false,
      description:
        'Four thin threads of mana run from the brass ring on your thumb up into the dark, one each to Lucan, Elsbeth, Kes and Bran. Nobody else can see them. You feel each one in your wrist: a steady hum while its person climbs, a jolt when they stumble, a sudden cold if they are hurt.',
      loreText:
        'Holding all four costs you strength every hour, and rest is the only thing that gives it back. You can hold them, cut one, let all four go, listen down one to hear what is said at the other end, or tug one so its person feels it. A tug is a jolt, never a shove off a ledge. A cut or dropped thread stops warding its person at once; whatever the Long Stair does after that, it does over hours.',
      icon: 'rope',
    },
    {
      id: 'cut_rope_end',
      name: 'The Cut End',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'Eleven metres of good guild rope still knotted to your harness, ending in a cut so clean it could only have been a knife.',
      loreText: 'The Tally House accepts a frayed rope as the Deepway’s doing. It does not accept a clean cut. Every delver in Lowmarch knows the difference by touch.',
      icon: 'rope',
    },
    {
      id: 'brass_focus',
      name: 'Your Focus Ring',
      tags: ['personal', 'focus'],
      droppable: false,
      skillModifiers: { binding: 1 },
      description: 'A brass ring on your left thumb, scored with eight years of tiny knots. Every thread you have ever tied went through it, and it is warm.',
      loreText: 'Lucan bought it for you the week Highwater was founded, from a stall on the Rim, for more than either of you could afford.',
      icon: 'ring',
    },
    {
      id: 'the_heartglass',
      name: 'The Heartglass',
      tags: ['quest', 'treasure'],
      questItem: true,
      description: 'A fist-sized core of black deepglass from the vault behind the Last Door. It is warm and it beats, very slowly. Lucan carries it in a lead-lined box at his hip.',
      loreText: 'In its vault it kept the Deepway asleep. Out of the vault, in the hands of anybody who cannot bind, it ticks, and the deep floors wake a little more with every hour. The Gilt Rope Guild has offered two hundred thousand crowns for it and has never said what it is for.',
      icon: 'gem',
    },
    {
      id: 'withheld_letter',
      name: 'The Gilt Rope Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A letter from the Gilt Rope Guild, addressed to you, offering you a crew of your own after the clear. The seal is broken. You never saw it.',
      loreText: 'Elsbeth found it in the post bag on Floor 70 and told Lucan, thinking he would be glad for you. He took it and kept it in his coat. Three floors later he started talking about shares.',
      icon: 'letter',
    },
    {
      id: 'old_badge',
      name: 'The Founder’s Badge',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A guild badge sixty-one years old, green with age, stamped with a knotted gold rope. On the back somebody has scratched a name with the point of a knife: A. LORNE.',
      loreText: 'Only four founder’s badges were ever struck, for the party that brought up the prize from Floor 61 and built the Gilt Rope Guild on it. The guild’s histories say there were four of them. This is the fifth.',
      icon: 'badge',
    },
    {
      id: 'tally_book',
      name: 'The Book of the Lost',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'The Tally House ledger of everybody who went down and did not come up: name, floor, cause, witness. Your name is in it, in fresh ink, under Lucan’s signature.',
      loreText: 'It has lain open on the same high desk under the same lamp for sixty years. In the margin, in a smaller hand, there is a second list that nobody has ever asked about.',
      icon: 'book',
    },
    {
      id: 'debt_note',
      name: 'Lucan’s Debt Note',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Forty-five thousand crowns, Lucan Harrow to the Gilt Rope Guild, borrowed to outfit the descent and due the day after the clear. Signed and held by Odran Sallow personally.',
      loreText: 'Five shares of the prize is forty thousand each. Four is fifty. Anybody who can count can see why this note matters.',
      icon: 'papers',
    },
    {
      id: 'dead_delvers_lamp',
      name: 'A Dead Delver’s Lamp',
      tags: ['tool', 'light'],
      skillModifiers: { delving: 1 },
      description: 'A brass guild lamp from the drift of fallen things on the Sump’s shore, dented, with oil still in it. Somebody fell with this a long time ago.',
      loreText: 'The maker’s mark is a workshop on the Rim that closed thirty years ago.',
      icon: 'lamp',
    },
    {
      id: 'iron_spikes',
      name: 'Iron Climbing Spikes',
      tags: ['tool'],
      skillModifiers: { climbing: 2 },
      description: 'A ring of six iron spikes and a small hammer. Rusted on the outside, sound in the middle.',
      loreText: 'Old guild issue. They stopped making them this heavy when the wayline went in.',
      icon: 'tools',
    },
    {
      id: 'agathe_notebook',
      name: 'Her Notebook',
      tags: ['document', 'personal'],
      skillModifiers: { binding: 2 },
      description: 'Oilcloth covers, pages swollen with damp, sixty-one years of a binder’s notes on how to tie a thread to stone, to water, to something that does not want it.',
      loreText: 'The first page is a list of four names, each crossed out. The last page is a drawing of a brass focus ring scored with tiny knots, exactly like yours.',
      icon: 'book',
    },
    {
      id: 'rust_rope',
      name: 'Rust Company Rope',
      tags: ['tool'],
      skillModifiers: { climbing: 1 },
      description: 'Forty metres of rust-red salvage rope, spliced in nine places and stronger than it looks.',
      loreText: 'Taro Kade sells it by the length and has never once sold a length he would not hang his own weight on.',
      icon: 'rope',
    },
    {
      id: 'elsbeth_tonic',
      name: 'Elsbeth’s Tonic',
      tags: ['consumable', 'medicine'],
      consumable: { resourceId: 'mana', amount: 20, consumesItem: true },
      description: 'A stoppered vial of something bitter and blue that brings a spent binder back to their feet. Elsbeth makes it herself.',
      loreText: 'She brewed it for you specifically, on Floor 80, because you were always the most tired person in the party and nobody else had noticed.',
      icon: 'vial',
    },
    {
      id: 'chalk_and_line',
      name: 'Chalk and Line',
      tags: ['tool'],
      skillModifiers: { delving: 1 },
      description: 'A stick of blue chalk and a knotted measuring line. You marked every safe step from the Rim to Floor 99.',
      loreText: 'Highwater is climbing out by your chalk marks right now, and not one of them has thought about who made them.',
      icon: 'chalk',
    },
    {
      id: 'favour_book',
      name: 'The Favour Book',
      tags: ['document'],
      skillModifiers: { bargaining: 1 },
      description: 'A little oilcloth notebook of who owes Highwater what, in your handwriting: lift slots, rope, a cookfire on Floor 61.',
      loreText: 'Lucan never once looked at it. Half the debts in it are owed to you personally, and the people who owe them know it.',
      icon: 'book',
    },
  ],
  abilities: [
    {
      id: 'hold_the_threads',
      name: 'Hold the Threads',
      tags: ['defensive'],
      description: 'Keep feeding the four threads from down here, so the people who cut you loose climb safely and never find out why.',
      affordances: ['hold on', 'hold the threads', 'keep holding', 'keep them alive', 'protect them', 'keep the wards up', 'nobody else falls'],
      costs: [{ resourceId: 'mana', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'MULTI',
      check: { attribute: 'arcana', skillId: 'binding', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'let_them_all_go',
      name: 'Let Them All Go',
      tags: ['utility'],
      description: 'Open your hand on all four threads at once. Whatever the Long Stair does to them now, it does without you in the way.',
      affordances: ['let them all go', 'let go of all four', 'drop all four', 'let go', 'open my hand', 'let them fall', 'drop the wards'],
      costs: [{ resourceId: 'undertow', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cut_a_thread',
      name: 'Cut a Thread',
      tags: ['utility'],
      description: 'Let one of them go and keep the others. The ward they never noticed stops mid-step, wherever they are standing.',
      affordances: ['cut his thread', 'cut her thread', 'cut the thread', 'cut one loose', 'cut lucan loose', 'drop one', 'cut the ward'],
      costs: [{ resourceId: 'undertow', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'listen_down_the_line',
      name: 'Listen Down the Line',
      tags: ['sight'],
      description: 'Put your attention on one thread and hear what is being said at the other end of it, including what nobody would say to your face.',
      affordances: ['listen', 'listen down the thread', 'eavesdrop', 'hear what they are saying', 'listen to lucan', 'feel where they are', 'listen in'],
      costs: [{ resourceId: 'mana', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'listening', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tug_the_line',
      name: 'Tug the Line',
      tags: ['social'],
      description: 'Send a pull down one thread: a warning, a signal, a message in knots, or a fright. Whoever is on the other end will feel it.',
      affordances: ['tug', 'tug the thread', 'pull the thread', 'pull on it', 'send a signal', 'warn them', 'tell bran', 'let them feel it'],
      costs: [{ resourceId: 'mana', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'binding', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_floor',
      name: 'Read the Floor',
      tags: ['sight'],
      description: 'Work out where the way up is, what lives here, and which ledge will take your weight.',
      affordances: ['look around', 'search', 'find a way up', 'scout', 'study the floor', 'look for a way out', 'check the walls'],
      costs: [{ resourceId: 'mana', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'delving', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'climb',
      name: 'Climb Without a Rope',
      tags: ['movement'],
      description: 'Up wet rock with your hands and whatever you can wedge into a crack, because nobody is going to lower anything.',
      affordances: ['climb', 'start climbing', 'climb the shaft', 'scale it', 'free climb', 'haul myself up'],
      costs: [{ resourceId: 'mana', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'climbing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'move_quiet',
      name: 'Move Quiet',
      tags: ['movement'],
      description: 'Get past something that hunts by sound, or past a camp that has not noticed you yet.',
      affordances: ['sneak', 'move quietly', 'slip past', 'stay hidden', 'creep', 'keep to the dark'],
      costs: [{ resourceId: 'mana', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'quiet', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight_dirty',
      name: 'Fight Dirty',
      tags: ['offensive'],
      description: 'Staff, knife, rock, whatever is in reach. You were never the one who fought, and you watched exactly how the ones who did it moved.',
      affordances: ['attack', 'hit', 'fight', 'stab', 'swing', 'punch', 'strike', 'hit him'],
      costs: [
        { resourceId: 'mana', amount: 6 },
        { resourceId: 'tremor', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'scrapping', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ward_yourself',
      name: 'Ward Yourself',
      tags: ['defensive'],
      description: 'For once, tie the thread round your own ribs instead of somebody else’s.',
      affordances: ['shield myself', 'ward myself', 'brace', 'protect myself', 'raise a ward', 'cover myself'],
      costs: [{ resourceId: 'mana', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'warding', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_deal',
      name: 'Make a Deal',
      tags: ['social'],
      description: 'Say what you want and what you will give for it, to somebody who has no reason to help you.',
      affordances: ['make a deal', 'bargain', 'offer', 'negotiate', 'haggle', 'strike a deal', 'ask for a rope'],
      costs: [{ resourceId: 'mana', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargaining', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_to_their_face',
      name: 'Say It to Their Face',
      tags: ['social'],
      description: 'Tell somebody exactly what they did, out loud, in front of whoever is standing there.',
      affordances: ['accuse him', 'say it to his face', 'tell them what he did', 'confront', 'call him out', 'tell everyone'],
      costs: [{ resourceId: 'mana', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: null, baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bind_it_down',
      name: 'Bind It Down',
      tags: ['defensive'],
      description: 'Tie a thread to something that does not want it, a creature or a person, and pin it to the stone. The deep binding she teaches, and nobody in Highwater knew a support mage could do.',
      affordances: ['bind it', 'pin it down', 'tie it to the floor', 'hold it still', 'bind him', 'use the deep binding'],
      costs: [
        { resourceId: 'mana', amount: 12 },
        { resourceId: 'undertow', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'binding', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_deep_binding'],
        lockedCopy: 'Your threads go to people who agreed to them. You have never tied one to anything that did not want it, and you do not know how it would be done.',
      },
    },
    {
      id: 'take_her_thread',
      name: 'Take Her Thread',
      tags: ['utility'],
      description: 'Tie the Voice’s thread to your own and carry her with you, up and out. She will be in every thread you tie for as long as you let her.',
      affordances: ['take her with me', 'tie her thread', 'carry her out', 'bind her to me', 'take her thread', 'bring her up'],
      costs: [{ resourceId: 'undertow', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:her_name'],
        lockedCopy: 'You cannot tie a thread to somebody when you do not know who she is. She has made very sure you do not, yet.',
      },
    },
    {
      id: 'take_the_blow',
      name: 'Take the Blow',
      tags: ['defensive'],
      description: 'Pull somebody’s hurt down your thread into your own body, all of it at once. It is what you did for nineteen days in small pieces.',
      affordances: ['take the blow', 'take it for them', 'take their hurt', 'pull the hurt into me', 'shield them with myself'],
      costs: [{ resourceId: 'mana', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'warding', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'throw_a_light',
      name: 'Throw a Light',
      tags: ['utility'],
      description: 'Send a thread of light along a passage, up a shaft or into a face. It shows you the way and blinds what lives in the dark.',
      affordances: ['throw a light', 'light it up', 'make light', 'blind it', 'light the shaft', 'show me the way'],
      costs: [{ resourceId: 'mana', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'binding', baseDc: 11 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_it_shut',
      name: 'Hold It Shut',
      tags: ['defensive'],
      description: 'Tie a door, a gate, a rope or a lift brake with a thread and hold it, whoever is pulling on the other side.',
      affordances: ['hold the door', 'hold it shut', 'jam the lift', 'tie the gate', 'lock it', 'hold the brake'],
      costs: [{ resourceId: 'mana', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'binding', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_in_a_favour',
      name: 'Call in a Favour',
      tags: ['social'],
      description: 'Name a debt somebody in the Deepway owes you personally, and collect it now.',
      affordances: ['call in a favour', 'you owe me', 'collect', 'remind him what he owes', 'call in the debt'],
      costs: [{ resourceId: 'mana', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargaining', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'the_sump',
      name: 'The Sump',
      shortName: 'The Sump',
      description:
        'The floor under the last floor, on no map. A black pool the size of a guild hall, and a shore made of sixty years of everything that ever fell in the Deepway: lamps, packs, boots, a split shield, ropes. Cold blue lichen covers every wall and brightens whenever somebody speaks.',
      artDirection:
        'Vast dark cavern at the bottom of a dungeon, a still black pool, a shore heaped with old fallen gear, walls covered in faintly glowing cold blue lichen, one figure standing waist-deep in the water. Cold blue and black, silent, enormous.',
      connections: [
        { to: 'the_rope_field', travelMinutes: 6, label: 'Along the shore to the hanging ropes' },
        { to: 'the_echo_shaft', travelMinutes: 4, label: 'Under the dry chimney' },
        { to: 'the_spine', travelMinutes: 10, label: 'To the foot of the drain shaft' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 6 },
      takeableItems: [
        { itemId: 'dead_delvers_lamp', qty: 1, ownerId: null, aka: ['lamp', 'the lamp', 'old lamp', 'lantern'] },
      ],
    },
    {
      id: 'the_rope_field',
      name: 'The Rope Field',
      shortName: 'Rope Field',
      description:
        'A long cavern where every cut and snapped rope in the Deepway ends up, hanging from cracks in the ceiling like roots, hundreds of them, guild colours faded grey. Badges and buckles in the silt. Somebody made a camp here once: a ring of stones, tally marks scratched on the wall that stop at a number nobody should reach.',
      artDirection:
        'Underground cavern with hundreds of old ropes hanging from the ceiling like curtains of roots, faded colours, silt floor scattered with metal badges, a ring of stones and scratched tally marks on the rock, faint blue glow. Eerie, quiet, sad.',
      connections: [
        { to: 'the_sump', travelMinutes: 6, label: 'Back along the shore' },
        { to: 'agathes_hollow', travelMinutes: 3, lockedByFlag: 'knows:her_name', label: 'Through the warm crack behind the ropes' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 6 },
      takeableItems: [
        { itemId: 'old_badge', qty: 1, ownerId: null, aka: ['badge', 'the badge', 'old badge', 'gold rope badge'] },
        { itemId: 'iron_spikes', qty: 1, ownerId: null, aka: ['spikes', 'iron spikes', 'pitons'] },
      ],
    },
    {
      id: 'the_echo_shaft',
      name: 'The Echo Shaft',
      shortName: 'Echo Shaft',
      description:
        'A dry chimney in the Sump’s roof that carries sound down from every floor above. Stand under it and you can hear the Deepway: a lift chain grinding at Ninety, a crew laughing on Ninety-Eight, your own name said by somebody who thinks you are dead. Whatever you shout into it goes up.',
      artDirection:
        'A narrow natural rock chimney rising into total darkness from a cavern ceiling, a lone figure standing beneath it looking up, faint lamplight far above like a star, dust in the air. Vertical, lonely.',
      connections: [{ to: 'the_sump', travelMinutes: 4, label: 'Back to the pool' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 6 },
    },
    {
      id: 'the_spine',
      name: 'The Spine',
      shortName: 'The Spine',
      description:
        'A drain shaft as wide as a cart, climbing nine hundred feet from the Sump to the underside of the ninety-ninth floor, slick and ribbed with old water lines. Small pale things that eat lamplight live in its side-cracks and come out when a lamp goes past.',
      artDirection:
        'A steep vertical drain shaft in dark wet rock, ribbed by water lines, a climber halfway up with a small lamp, pale shapes peering from cracks in the walls. Tense, claustrophobic, cold.',
      connections: [
        { to: 'the_sump', travelMinutes: 10, label: 'Back down to the pool' },
        { to: 'the_last_door', travelMinutes: 90, label: 'All the way up to the ninety-ninth floor' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 5 },
    },
    {
      id: 'agathes_hollow',
      name: 'The Hollow',
      shortName: 'The Hollow',
      description:
        'A dry, warm pocket behind the Rope Field where the lichen grows thickest. On a stone bench, in a binder’s long coat gone green with lichen, a woman sits upright with her eyes closed and her hands in her lap, breathing once a minute. A thread of light runs from her wrist down into the floor.',
      artDirection:
        'Small warm cave pocket thick with glowing blue lichen, a woman in a long old-fashioned coat seated upright on a stone bench, eyes closed, hands folded, a single glowing thread running from her wrist into the floor. Quiet, sacred, strange.',
      connections: [{ to: 'the_rope_field', travelMinutes: 3, label: 'Back out to the ropes' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 6 },
      takeableItems: [
        { itemId: 'agathe_notebook', qty: 1, ownerId: 'voice', aka: ['notebook', 'her notebook', 'the notes'] },
      ],
    },
    {
      id: 'the_last_door',
      name: 'The Last Door',
      shortName: 'Floor 99',
      description:
        'The bottom of the charted Deepway. A ledge over the pit where your rope was, Lucan’s anchor bolt still in the stone, a warden of carved rock the size of a house lying broken where Highwater left it, and the vault behind the Last Door standing open and empty.',
      artDirection:
        'Huge underground hall at the bottom of a dungeon, a narrow ledge over a black pit, a toppled giant stone guardian in pieces, a massive carved door standing open on an empty vault, a single iron anchor bolt with a cut rope end. Grand, ruined, echoing.',
      connections: [
        { to: 'the_spine', travelMinutes: 60, label: 'Down the drain under the ledge' },
        { to: 'rust_camp', travelMinutes: 40, label: 'The stair up to Ninety-Eight' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
    },
    {
      id: 'rust_camp',
      name: 'Rust Company Camp',
      shortName: 'Rust Camp',
      description:
        'Eleven tents, a cookfire and a salvage pile on a wide ledge on the ninety-eighth floor, one floor above the pit. The Rust Company has camped here three days, picking over what Highwater left. Rope, food, a map table, and Taro Kade’s voice over all of it.',
      artDirection:
        'Scrappy dungeon salvage camp on a broad rock ledge, patched tents in rust red, a cookfire, heaps of scavenged armour and gear, ropes and pulleys, a table spread with maps, lanterns strung on cords. Warm, busy, rough.',
      connections: [
        { to: 'the_last_door', travelMinutes: 40, label: 'Down the stair to Ninety-Nine' },
        { to: 'the_long_stair', travelMinutes: 30, label: 'Up to the foot of the Long Stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'rust_rope', qty: 1, ownerId: 'taro', aka: ['their rope', 'rust rope', 'red rope', 'salvage rope'] },
      ],
    },
    {
      id: 'the_long_stair',
      name: 'The Long Stair',
      shortName: 'Long Stair',
      description:
        'Eight floors of switchback stair cut into the wall of a shaft, from Ninety-Eight up to Ninety. No rails. A loose step every so often, nests in the alcoves, and a very long way down on the open side. Your blue chalk marks are on every safe step.',
      artDirection:
        'Endless narrow stone staircase spiralling up the wall of an enormous dark shaft, no railing, tiny lantern lights of climbers far above, alcoves in the rock, blue chalk marks on the steps. Vertiginous, epic.',
      connections: [
        { to: 'rust_camp', travelMinutes: 30, label: 'Down to the Rust Company camp' },
        { to: 'waycamp_ninety', travelMinutes: 300, label: 'All the way up to Waycamp Ninety' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'elsbeth_tonic', qty: 1, ownerId: 'elsbeth', aka: ['tonic', 'her tonic', 'the vial'] },
      ],
    },
    {
      id: 'waycamp_ninety',
      name: 'Waycamp Ninety',
      shortName: 'Waycamp 90',
      description:
        'The deepest guild camp in the Deepway: a stone platform on the ninetieth floor with a lift-cage on chains that runs up to the Rim, bunks, a Tally House clerk’s hut, and a board where crews chalk their names. Highwater is still chalked at the top from the way down, with a 5 beside it.',
      artDirection:
        'Fortified underground camp platform with a heavy iron lift cage hanging on chains, wooden bunks, a small hut, a large slate board with chalked crew names, guild banners, lanterns. Industrial, crowded, tense.',
      connections: [
        { to: 'the_long_stair', travelMinutes: 300, label: 'Back down the Long Stair' },
        { to: 'the_rim', travelMinutes: 720, label: 'The lift, then the wayline up' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'the_heartglass', qty: 1, ownerId: 'lucan', aka: ['heartglass', 'the box', 'the core', 'the stone'] },
        { itemId: 'withheld_letter', qty: 1, ownerId: 'lucan', aka: ['letter', 'the letter', 'guild letter', 'his letter'] },
      ],
    },
    {
      id: 'the_rim',
      name: 'The Rim',
      shortName: 'The Rim',
      description:
        'The city of Lowmarch, built in rings around the mouth of the Deepway. Lamp-shops, rope-sellers, the lift-heads, guild halls, and the families of every delver below, who watch the lift-cages come up and count heads.',
      artDirection:
        'Walled fantasy market quarter around a great stone lift-house built over a dungeon mouth, iron lift cages on chains, crowded market stalls with lanterns and coils of rope for sale, guild halls with banners, evening light. Busy, crowded, alive.',
      connections: [
        { to: 'waycamp_ninety', travelMinutes: 720, label: 'The lift back down' },
        { to: 'tally_house', travelMinutes: 10, label: 'To the Tally House at the lift-head' },
        { to: 'gilt_rope_hall', travelMinutes: 15, label: 'Up the ring road to the Gilt Rope Hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
    },
    {
      id: 'tally_house',
      name: 'The Tally House',
      shortName: 'Tally House',
      description:
        'A stone hall at the lift-head where every delver who goes down is written in and every one who comes up is written out. The Book of the Lost lies open on a high desk under a lamp that has not been put out in sixty years, and the wall behind it is names.',
      artDirection:
        'Austere stone registry hall, a tall wooden desk with a huge open ledger under a single lamp, a wall covered floor to ceiling in carved names, grey-coated clerks, high windows. Solemn, dusty, exact.',
      connections: [{ to: 'the_rim', travelMinutes: 10, label: 'Back out to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'tally_book', qty: 1, ownerId: 'hesper', aka: ['book', 'the book', 'the ledger', 'book of the lost'] },
      ],
    },
    {
      id: 'gilt_rope_hall',
      name: 'The Gilt Rope Hall',
      shortName: 'Gilt Rope Hall',
      description:
        'The biggest guild hall in Lowmarch: marble, gold rope moulding on every doorframe, a long table for sixty, and a courtyard well that goes down further than any well should. Odran Sallow lives upstairs, over the vault.',
      artDirection:
        'Opulent fantasy guild hall, white marble and gold rope carvings on every arch, a long banquet table, a courtyard with an old stone well, an old man at the head of the table with a cane. Rich, cold, beautiful.',
      connections: [{ to: 'the_rim', travelMinutes: 15, label: 'Back down the ring road' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'debt_note', qty: 1, ownerId: 'sallow', aka: ['debt note', 'the note', 'his note', 'promissory note'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_tally',
      name: 'The Tally House',
      description:
        'The registry at the lift-head that writes every delver in and out of the Deepway and keeps the Book of the Lost. It enforces the Delvers’ Peace, no blade raised between delvers below the Rim, with no soldiers at all: only the book, which every guild in the city needs its name to be in.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Written in' },
        { atReputation: 25, label: 'Known at the desk' },
        { atReputation: 50, label: 'Believed' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_gilt_rope',
      name: 'The Gilt Rope Guild',
      description:
        'The biggest guild in Lowmarch, founded sixty-one years ago by Odran Sallow’s party on the prize from Floor 61. It sponsors a third of the crews in the Deepway, owns the lifts, holds half the city’s debt, and has paid parties to reach Floor 99 for sixty years without ever saying why.',
      startingReputation: 20,
      ranks: [
        { atReputation: -30, label: 'Struck off' },
        { atReputation: 0, label: 'Written off' },
        { atReputation: 20, label: 'Sponsored' },
      ],
      allies: [],
      enemies: ['faction_rust'],
    },
    {
      id: 'faction_rust',
      name: 'The Rust Company',
      description:
        'Eleven salvagers under Taro Kade who follow the big crews down and pick over what they leave. Second to every floor for three years, broke, loud, camped on Floor 98, and the only crew in the Deepway that has never lost a member.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Stranger' },
        { atReputation: 15, label: 'Owed a favour' },
        { atReputation: 30, label: 'The twelfth' },
      ],
      allies: [],
      enemies: ['faction_gilt_rope'],
    },
    {
      id: 'faction_rim',
      name: 'The Rim',
      description:
        'Lowmarch’s ordinary people: rope-sellers, lamp-makers, lift crews and the families of everybody below. They decide in the market what really happened down there, and every guild in the city has to live with what they decide.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'A rumour' },
        { atReputation: 30, label: 'A name people know' },
        { atReputation: 60, label: 'The one who climbed out' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'lucan',
      name: 'Lucan Harrow',
      role: 'Highwater’s leader and swordsman, your best friend since you shared a bunk at the delvers’ hostel at eighteen, and the man who cut your rope',
      cardBlurb:
        'He has been your best friend for eight years, he cut your rope himself, and he told the others it was about money so he would never have to say what it was really about. He has no idea you are alive.',
      pronouns: 'he/him',
      publicTraits: ['Golden at a guild table', 'Remembers everybody’s name, including the cooks', 'Never once says sorry first'],
      hiddenDrives: [
        'He owes the Gilt Rope forty-five thousand crowns he borrowed against this clear. Five shares does not pay it. Four does.',
        'He read the guild’s letter offering you a crew of your own, and could not stand being the one left behind',
      ],
      values: ['Being the one everybody looks at when the door opens', 'Highwater, which the two of you founded and he believes is his'],
      fears: ['Being ordinary', 'That you are alive, and that he is relieved about it'],
      socialStyle:
        'Warm, funny and generous in a crowd; goes very still and very polite when cornered, which is how you always knew he was lying.',
      boundaries: [
        'Will not admit the real reason in front of the others',
        'Will not kneel to anybody, including to beg',
      ],
      goals: [
        'Get the Heartglass to the Gilt Rope Hall and sell it before anybody asks the wrong question',
        'Keep the other three believing it was the only way',
      ],
      secrets: [
        {
          id: 'lucan_the_letter',
          fact: 'He took the Gilt Rope’s letter offering the player a crew of their own, on Floor 70, and never passed it on. It is still in his coat.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you take the letter off him, or Elsbeth tells you she told him, or he answers you to your face with none of the others there.',
        },
        {
          id: 'lucan_the_debt',
          fact: 'He borrowed forty-five thousand crowns from the Gilt Rope to outfit the descent, due the day after the clear. Odran Sallow holds the note personally.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Kes knows the number and says it if you talk to her like somebody who can count.',
        },
      ],
      speechStyle:
        'Easy and warm, a leader’s “we” and “us” even now. Jokes to lower the temperature. When cornered he goes formal and uses your full name, which he has done three times in eight years, every time while lying.',
      topics: ['Highwater', 'the Heartglass', 'the shares', 'the hostel years', 'the Gilt Rope', 'why he did it'],
      voiceSamples: [
        'Nothing personal. Four shares beat five.',
        'Come on. You know me. Name one time I ever left somebody on a ledge who wasn’t asking for it.',
        'We were going to be first. First. Not third to the sixtieth floor, not good for a support crew. First.',
        'I kept your knife. No idea why I’m telling you.',
      ],
      appearance:
        'An adult man, tall and easy-shouldered, sun-blond hair cut short for the helm, bright blue eyes, an easy smile that reaches his eyes on purpose, dented steel plate under a faded sky-blue guild sash knotted at the shoulder, a long sword on his back and a small lead-lined box at his hip.',
      visualHook: 'A sky-blue guild sash knotted at the shoulder with a knot only the two of you know how to tie.',
      silhouette: 'Long sword on his back, one hand always resting on the lead box at his hip.',
      artSeed: 'cl99-lucan-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'guarded', 'cornered', 'stricken'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'waycamp_ninety', activity: 'at Waycamp Ninety, awake, with the box under his hand' },
        { startMinute: 360, endMinute: 1080, locationId: 'the_long_stair', activity: 'on the Long Stair, setting a pace nobody can keep' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_last_door', activity: 'on the ledge over the pit, coiling what is left of a rope' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_long_stair', activity: 'climbing in the dark with one lamp fewer than he came down with' },
      ],
      homeLocationId: 'waycamp_ninety',
      knowledgeScope: ['highwater', 'the_heartglass', 'the_gilt_rope', 'the_shares', 'the_letter', 'the_player_before'],
      startingRelationship: { trust: 10, affection: 45, respect: 30, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'lucan_says_why',
          label: 'He tells you the real reason',
          kind: 'TRUST',
          requires: { trust: 40, hasItems: ['withheld_letter'] },
        },
        {
          id: 'lucan_afraid',
          label: 'He is afraid of you',
          kind: 'OTHER',
          requires: { fear: 40 },
        },
      ],
      attributes: { might: 15, agility: 14, mind: 11, presence: 15, resolve: 11, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 10, tags: ['swordsman', 'highwater'] },
    },
    {
      id: 'voice',
      name: 'The Voice',
      calledName: 'The Voice',
      role: 'Something on the floor below the last floor, which speaks in a woman’s voice, knows your name, and has waited a very long time for somebody like you to fall',
      cardBlurb:
        'She has been listening to you for ninety-nine floors, she knows exactly what your threads can do, and she would like very much for you to carry her out of here.',
      pronouns: 'she/her',
      publicTraits: ['Delighted by small new things, like a voice', 'Patient in a way that is not quite comfortable', 'Answers a question with a better question'],
      hiddenDrives: [
        'She wants Odran Sallow to see her face before he dies, and she has had sixty-one years to decide what happens after that',
        'You are the first binder to fall in sixty-one years, and she will not risk losing you by telling you everything at once',
      ],
      values: ['Being told the truth, since nobody down here ever bothers', 'Craft: a binding done well is the only beautiful thing she has seen in sixty years'],
      fears: ['Another sixty years', 'That there is not enough of her left to walk out with'],
      socialStyle:
        'Warm, curious and teasing, and then suddenly very still and exact when something matters to her. Never raises her voice. Has never needed to.',
      boundaries: [
        'Will not force you to do anything, because a binding that is forced does not hold',
        'Will not say her own name until you have earned it, because a name is the one thing the deep cannot take. You earn it by asking what happened to her rather than what she is, or by saying the name scratched on her badge out loud; then she tells you plainly',
      ],
      goals: [
        'Get you to carry her thread up out of the Deepway',
        'Stand in the Gilt Rope Hall in front of Odran Sallow',
      ],
      secrets: [
        {
          id: 'voice_her_name',
          fact: 'She is Agathe Lorne, the binder of the party that founded the Gilt Rope Guild. Odran Sallow cut her rope on Floor 61, sixty-one years ago, so the founding prize would split four ways.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you ask what happened to her rather than what she is, or if you find her badge in the Rope Field and say the name out loud.',
        },
        {
          id: 'voice_the_way_out',
          fact: 'She cannot leave the Sump unless a binder ties her thread to their own and carries it up. If they do, she is with them in every thread they tie for as long as they allow it. Her body sleeps, sitting up, in the Hollow behind the Rope Field.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She explains it once you know her name, plainly, and asks rather than tells.',
        },
        {
          id: 'voice_the_heartglass',
          fact: 'With the Heartglass in her hands she could leave on her own, and she could wake the deep under the Gilt Rope Hall. She has not decided whether she would.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her why the walls are ticking, or if the deep gets bad enough that keeping this from you would cost you your life.',
        },
      ],
      speechStyle:
        'Old-fashioned and precise, sixty years out of date: “shall”, “rather”, “my dear”. Asks questions she already knows the answers to, to see what you do with them. Laughs at things that are not funny, because nothing has been funny down here for a very long time.',
      topics: ['the threads', 'the Sump', 'binding', 'Odran Sallow', 'the Heartglass', 'her name', 'what the dark hears'],
      voiceSamples: [
        'Finally.',
        'I heard you on the forty-first floor, humming while you tied their threads. Nobody hums down here. I have listened for you ever since.',
        'Oh, don’t be dramatic, my dear. You fell a very great distance and landed in water. The deep is seldom kind, but it is occasionally tidy.',
        'I shall not make you do anything. A forced thread never holds. Ask any of the four you are still holding up.',
      ],
      appearance:
        'An adult woman, tall and very straight-backed, dark hair pinned up the old guild way, calm pale grey eyes, a binder’s long dark-green coat decades out of fashion with a high collar and brass toggles, a brass ring on her thumb, and a thin thread of cold blue light trailing from one wrist. She shows herself as a shape in the blue lichen-light on bare rock, and her face is always clear.',
      visualHook: 'A woman outlined in cold blue lichen-light on bare rock, a thread of light trailing from one wrist down into the dark.',
      silhouette: 'Long coat, very straight back, one hand raised as if holding a thread taut.',
      artSeed: 'cl99-voice-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'warm', 'cold', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'the_sump', activity: 'in the light along the walls of the Sump, listening to the whole Deepway' },
      ],
      homeLocationId: 'the_sump',
      knowledgeScope: ['the_deepway', 'the_sump', 'binding', 'the_heartglass', 'odran_sallow', 'floor_61', 'every_name_spoken_below'],
      startingRelationship: { trust: 20, affection: 35, respect: 40, fear: 15, rivalry: 0 },
      gates: [
        {
          id: 'voice_teaches_you',
          label: 'She shows you how to bind something that does not want it',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'voice_names_herself',
          label: 'She tells you who she was',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['visited:the_rope_field'] },
        },
      ],
      attributes: { might: 3, agility: 3, mind: 17, presence: 15, resolve: 18, arcana: 19 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'elsbeth',
      name: 'Elsbeth Marr',
      role: 'Highwater’s healer, who saw Lucan’s knife and looked at the wall',
      cardBlurb:
        'She has patched you up more times than either of you can count, and when Lucan put the knife to your rope she looked at the wall. You can still feel her thread, and so can she.',
      pronouns: 'she/her',
      publicTraits: ['Gentle hands, sharp tongue', 'Prays under her breath while she works', 'Cannot lie with her face'],
      hiddenDrives: [
        'She is the one who told Lucan about the guild’s letter, thinking he would be glad for you',
        'She has wanted to say something to you for two years and has run out of floors to say it on',
      ],
      values: ['Nobody left behind, which she has just broken', 'Keeping people alive whether or not they deserve it'],
      fears: ['That she is a coward and always has been', 'Hearing your voice and having to answer it'],
      socialStyle:
        'Busy hands: rewraps a bandage that does not need it while she talks. Apologises too much about small things and not at all, yet, about the big one.',
      boundaries: [
        'Will not let anybody die in front of her untended, including Lucan, including if you ask her to',
        'Will not lie to you once you are face to face',
      ],
      goals: [
        'Get back down to the pit and find out whether you are dead',
        'Find a way to say what she did without asking to be forgiven for it',
      ],
      secrets: [
        {
          id: 'elsbeth_told_him',
          fact: 'She found the Gilt Rope’s letter offering the player a crew of their own on Floor 70 and told Lucan, because she thought he would want to celebrate. Three floors later he started talking about shares.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it herself if you reach her down her thread, or face to face, and do not ask her for an apology first.',
        },
        {
          id: 'elsbeth_two_years',
          fact: 'She has been in love with the player for two years and decided, on Floor 99, that she had lost the right ever to say so.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if she comes back down for you, and only if you make it easy for her to stay.',
        },
      ],
      speechStyle:
        'Quick, practical, medical. Counts pulses and breaths out loud when frightened. Says sorry about small things constantly. Swears by the Saint of the Stair, the delvers’ patron, under her breath.',
      topics: ['your ribs', 'what she saw', 'Lucan', 'the letter', 'the Saint of the Stair', 'going back down'],
      voiceSamples: [
        'Hold still. No, stiller. You’ve cracked two ribs and you’re breathing like you want a third.',
        'Sorry. Sorry, that was cold. Sorry.',
        'I looked at the wall. That’s the whole of what I did. I looked at the wall, and I counted to eleven, and you were gone.',
        'Saint of the Stair, keep this one breathing, and if you can’t, keep me from saying so out loud.',
      ],
      appearance:
        'An adult woman, compact and quick, dark brown hair in a practical braid, warm brown eyes, a grey healer’s apron with a dozen full pockets over a padded jacket, sleeves rolled to the elbow, and iodine stains on her cuffs.',
      visualHook: 'A grey healer’s apron with a dozen pockets, every one of them full.',
      silhouette: 'Kneeling, sleeves rolled to the elbow, both hands busy.',
      artSeed: 'cl99-elsbeth-01',
      portrait: null,
      expressions: ['neutral', 'worried', 'guilty', 'warm', 'stricken'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'waycamp_ninety', activity: 'at Waycamp Ninety, sitting up with a lamp, not sleeping' },
        { startMinute: 360, endMinute: 1080, locationId: 'the_long_stair', activity: 'on the Long Stair, last in the line, looking back down' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_last_door', activity: 'on her knees by the ledge, packing a kit that does not need packing' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_long_stair', activity: 'climbing with two fingers on her own wrist' },
      ],
      homeLocationId: 'waycamp_ninety',
      knowledgeScope: ['highwater', 'the_letter', 'healing', 'the_player_before', 'lucan'],
      startingRelationship: { trust: 30, affection: 55, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'elsbeth_confesses',
          label: 'She tells you what she did on Floor 70',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'elsbeth_would_stay',
          label: 'She stays with you instead of going back up',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 65, flagsSet: ['elsbeth_came_back'] },
        },
      ],
      attributes: { might: 8, agility: 12, mind: 15, presence: 11, resolve: 10, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 3, tags: ['healer', 'highwater'] },
    },
    {
      id: 'taro',
      name: 'Taro Kade',
      calledName: 'Taro',
      role: 'Captain of the Rust Company, a salvage crew that has come second to Highwater on every floor for three years, camped one floor above the pit',
      cardBlurb:
        'He has lost to your party on every floor for three years, he is camped one floor above the pit, and you climbing out of the dark is the best thing that has happened to him all year. Whether that is good news for you depends on what you can offer him.',
      pronouns: 'he/him',
      publicTraits: ['Loud, cheerful and permanently broke', 'Knows the price of everything on every floor', 'Keeps every promise he says out loud, so says very few out loud'],
      hiddenDrives: [
        'He wants the Rust Company’s name on the Tally House wall for once, and does not much care how it gets there',
        'He watched Highwater go past his camp one lamp short and has already guessed',
      ],
      values: ['His eleven people, every one of whom he has brought home', 'A deal said out loud is a deal'],
      fears: ['Being the crew that only ever picks up after', 'Losing one of his people for a prize'],
      socialStyle:
        'Treats everything as a negotiation and enjoys it; bargains with his hands, slaps the table, laughs first. Goes cold and quiet only when somebody threatens his crew.',
      boundaries: [
        'Will never cut a rope, for anything, and throws out anybody in his crew who would',
        'Will not work for free, including for a good cause',
      ],
      goals: [
        'Get the Heartglass, or the credit for it, or a cut of either',
        'Get all eleven of his people home',
      ],
      secrets: [
        {
          id: 'taro_the_money',
          fact: 'A week ago Odran Sallow’s people paid him to slow Highwater down on the Long Stair. He took the money and did not do it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you once you have told him the truth about the rope, because then he owes you one back.',
        },
        {
          id: 'taro_his_father',
          fact: 'His father was cut loose on Floor 52 when Taro was nineteen. The Tally House wrote it down as misadventure.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it once, flatly, if you show him the clean cut on your rope end.',
        },
      ],
      speechStyle:
        'Fast, loud market patter. Everything has a price and he says the number. Calls everybody “friend” until they aren’t. Short barks of laughter as punctuation.',
      topics: ['prices', 'rope', 'the Rust Company', 'Lucan Harrow', 'salvage', 'his crew'],
      voiceSamples: [
        'Well, look what climbed out of the drain. Friend, you are worth a fortune right now and you are dripping on my maps.',
        'Rope’s thirty crowns a length. For you, tonight, forty. Grief’s expensive.',
        'Three years I’ve come second to Lucan Harrow. I’d come second for three more before I’d do what he just did.',
        'Say it out loud and it’s a deal. I don’t sign things. Paper burns.',
      ],
      appearance:
        'An adult man, broad and weathered, shaved head and a short black beard, a wide grin, a rust-red leather coat patched at every joint with the badges of other guilds, and a salvage hook on his belt.',
      visualHook: 'A rust-red leather coat patched with the badges of other guilds he has salvaged from the deep.',
      silhouette: 'Feet planted wide, one thumb hooked in his belt beside the salvage hook, grinning.',
      artSeed: 'cl99-taro-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'calculating', 'cold', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'rust_camp', activity: 'at the Rust Company camp on Floor 98, pricing what came up today' },
      ],
      homeLocationId: 'rust_camp',
      knowledgeScope: ['the_rust_company', 'salvage', 'prices', 'the_long_stair', 'highwater', 'the_gilt_rope'],
      startingRelationship: { trust: 10, affection: 10, respect: 30, fear: 0, rivalry: 35 },
      gates: [
        {
          id: 'taro_deals',
          label: 'He takes a deal from you, said out loud',
          kind: 'ALLIANCE',
          requires: { trust: 30 },
        },
        {
          id: 'taro_has_your_back',
          label: 'He puts the Rust Company behind you in public',
          kind: 'ALLIANCE',
          requires: { trust: 50, respect: 45, flagsSet: ['taro_saw_the_cut'] },
        },
      ],
      attributes: { might: 15, agility: 12, mind: 13, presence: 15, resolve: 13, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 15, damage: 9, tags: ['salvager', 'rust-company'] },
    },
    {
      id: 'kes',
      name: 'Kestrel Ivo',
      calledName: 'Kes',
      role: 'Highwater’s scout and archer, who agreed to the four shares because she did the arithmetic',
      cardBlurb:
        'She voted to cut you, because she thought the support mage was the cheapest part of the party. On the Long Stair she is about to find out what you were doing for her, and you are the one holding her thread while she does.',
      pronouns: 'she/her',
      publicTraits: ['Counts everything', 'Funny in a mean way', 'First up any wall'],
      hiddenDrives: [
        'Her mother’s house on the Rim is mortgaged to the Gilt Rope, and the fourth share clears it with ten thousand to spare',
        'She privately thinks Lucan cut the wrong rope, and that it should have been his',
      ],
      values: ['Numbers that add up', 'Not owing anybody anything'],
      fears: ['Owing you her life now, and knowing it', 'Being poor again'],
      socialStyle:
        'Blunt, quick and sardonic; says the ugly true thing first so nobody else gets to. Respects competence and nothing else.',
      boundaries: [
        'Will not pretend she voted the other way',
        'Will not grovel, even to stay alive',
      ],
      goals: [
        'Get her share home and pay off her mother’s house',
        'Work out why the climb is so much harder than the descent was',
      ],
      secrets: [
        {
          id: 'kes_the_number',
          fact: 'She has seen Lucan’s debt note: forty-five thousand crowns, held by Odran Sallow personally, due the day after the clear.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says the number if you talk to her like somebody who can count, and not like somebody who owes you.',
        },
      ],
      speechStyle:
        'Clipped, numerical, dry. Talks in shares, distances and odds. Never uses your name; calls you “support”, even now, until the day she stops.',
      topics: ['the shares', 'the climb', 'her mother’s house', 'Lucan’s debt', 'odds'],
      voiceSamples: [
        'Five ways is forty thousand each. Four ways is fifty. I can count, support. So can you.',
        'Since when do the stairs bite on the way up? We came down these clean.',
        'Don’t. Don’t hold my thread. I’d rather drop than owe you.',
        'Fifty, minus the lift fare, minus my mother’s roof. Leaves exactly enough to hate myself in comfort.',
      ],
      appearance:
        'An adult woman, lean and wiry, cropped copper hair, sharp green eyes, a scout’s dark green hood and fingerless gloves, a short bow across her back, and a coil of chalk-marked climbing line over one shoulder.',
      visualHook: 'A coil of chalk-marked climbing line over one shoulder, every metre tallied in her own handwriting.',
      silhouette: 'Crouched on a ledge above everybody else, bow across her knees.',
      artSeed: 'cl99-kes-01',
      portrait: null,
      expressions: ['neutral', 'sardonic', 'calculating', 'rattled', 'defiant'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'waycamp_ninety', activity: 'at Waycamp Ninety, counting the lift fare twice' },
        { startMinute: 360, endMinute: 1080, locationId: 'the_long_stair', activity: 'scouting the Long Stair a flight ahead of the others' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_last_door', activity: 'at the foot of the stair up from the ledge, not looking back' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_long_stair', activity: 'first up the stair in the dark, testing every step' },
      ],
      homeLocationId: 'waycamp_ninety',
      knowledgeScope: ['highwater', 'the_shares', 'lucans_debt', 'the_long_stair', 'the_rim'],
      startingRelationship: { trust: 10, affection: 10, respect: 15, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'kes_says_the_number',
          label: 'She tells you what Lucan owes',
          kind: 'TRUST',
          requires: { trust: 30, respect: 40 },
        },
        {
          id: 'kes_uses_your_name',
          label: 'She stops calling you support',
          kind: 'OTHER',
          requires: { respect: 60 },
        },
      ],
      attributes: { might: 11, agility: 16, mind: 14, presence: 10, resolve: 12, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 14, damage: 7, tags: ['archer', 'highwater'] },
    },
    {
      id: 'bran',
      name: 'Bran Tull',
      role: 'Highwater’s shieldbearer, who was two flights up the stair carrying the lamp and was told you slipped',
      cardBlurb:
        'He was two flights up with the lamp when your rope went, and Lucan told him you slipped. He is the only one of the four who would come back for you, if anybody told him the truth.',
      pronouns: 'he/him',
      publicTraits: ['Enormous and gentle', 'Says about ten words a day', 'Carries whoever is tired'],
      hiddenDrives: [
        'He promised his wife Odette, thirty, this is his last descent, and means to keep it whatever it costs',
        'He has noticed Lucan will not look him in the eye and has decided not to ask why yet',
      ],
      values: ['Holding the line so everybody behind him gets home', 'Telling the truth slowly'],
      fears: ['Finding out he carried the lamp for a murder', 'Not going home'],
      socialStyle:
        'Slow, quiet, physically protective. Listens with his whole face. When he finally decides something he does not argue about it; he simply does it.',
      boundaries: [
        'Will not raise his shield against a friend until he is certain',
        'Will not leave anybody on a ledge who is still breathing',
      ],
      goals: [
        'Get home to Odette with his share',
        'Find out why Lucan keeps checking the box instead of the stair',
      ],
      secrets: [
        {
          id: 'bran_the_cut_end',
          fact: 'He saw the cut end when Lucan threw the rope into the pit, and has been not-thinking about it ever since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says what he saw if you reach him down his thread, or if somebody he trusts says the word "cut" in front of him.',
        },
      ],
      speechStyle:
        'Very few words, low and slow. Uses names. Asks one question and waits for the whole answer. Never swears and never hurries.',
      topics: ['Odette', 'the lamp', 'what Lucan said', 'his shield', 'going home'],
      voiceSamples: [
        'You slipped. That’s what he said. You slipped.',
        'Hm.',
        'I carried the lamp. Two flights up. Never saw. Ought to have seen.',
        'Stand behind me. No. Behind.',
        'Odette painted the house on this shield. Only bit of it nobody’s scratched.',
      ],
      appearance:
        'An adult man, very tall and very broad, close-cropped brown hair going grey at the temples, a quiet heavy face, a padded brown gambeson, a scarred tower shield on his back painted with a small white house, and a lamp hooked to his belt.',
      visualHook: 'A tower shield painted with a small white house, which his wife painted, and which is the only unscarred thing on it.',
      silhouette: 'A wall of a man with a lamp held high, everybody else in his shadow.',
      artSeed: 'cl99-bran-01',
      portrait: null,
      expressions: ['neutral', 'troubled', 'stricken', 'warm', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'waycamp_ninety', activity: 'at Waycamp Ninety, sitting up, watching Lucan sleep' },
        { startMinute: 360, endMinute: 1080, locationId: 'the_long_stair', activity: 'on the Long Stair carrying two packs, his and Elsbeth’s' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_last_door', activity: 'two flights up the stair from the ledge, holding the lamp, waiting' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_long_stair', activity: 'at the back of the line in the dark, lamp held high' },
      ],
      homeLocationId: 'waycamp_ninety',
      knowledgeScope: ['highwater', 'the_long_stair', 'odette', 'lucan'],
      startingRelationship: { trust: 45, affection: 40, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'bran_believes_you',
          label: 'He hears the truth and believes it',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['bran_knows'] },
        },
        {
          id: 'bran_turns_his_shield',
          label: 'He stands between you and Lucan',
          kind: 'ALLIANCE',
          requires: { trust: 55, flagsSet: ['bran_knows'] },
        },
      ],
      attributes: { might: 17, agility: 9, mind: 10, presence: 11, resolve: 15, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 16, damage: 8, tags: ['shieldbearer', 'highwater'] },
    },
    {
      id: 'sallow',
      name: 'Odran Sallow',
      calledName: 'Sallow',
      role: 'Guildmaster of the Gilt Rope, eighty-eight, who founded the biggest guild in Lowmarch on a prize from Floor 61',
      cardBlurb:
        'He sponsored your descent and is waiting at the top of the city for the Heartglass. He is courteous to everybody, never forgets a debt, and is the only person in Lowmarch who will be glad you lived.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to everybody, especially the people he is about to ruin', 'Never forgets a debt in either direction', 'Walks with a cane he does not need'],
      hiddenDrives: [
        'Only a binder can hold the Heartglass without the deep waking around them. He sponsored Highwater for its binder and wrote the letter offering them a crew, and Lucan has just thrown away the one thing he wanted',
        'He has heard a woman’s voice in the courtyard well every night for sixty-one years and has never told anybody',
      ],
      values: ['The guild, which he built and which is more than any one delver', 'Order: the Deepway run by people who know what it costs'],
      fears: ['Dying with the Heartglass out of his hand', 'Her'],
      socialStyle:
        'Soft-spoken, grandfatherly and exact. Offers tea before anything. Never threatens; describes consequences as if regretting them in advance.',
      boundaries: [
        'Will not admit Floor 61 to anybody, in public, under any pressure',
        'Will not go below the Rim again, ever',
      ],
      goals: [
        'Receive the Heartglass from Lucan at the Hall in front of every guild, and lock it in his vault',
        'Find a binder to hold it, and if the one from Highwater is alive, make them an offer they cannot refuse',
      ],
      secrets: [
        {
          id: 'sallow_floor_61',
          fact: 'He cut Agathe Lorne’s rope on Floor 61, sixty-one years ago, to keep the founding prize among four. The guild’s gold rope emblem is that rope.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only with her badge in your hand and the Tally House listening, or with her standing in the room.',
        },
        {
          id: 'sallow_the_binder',
          fact: 'He has known since Floor 61 that taking the Heartglass would wake the deep, and that a binder holding it can put the deep back to sleep or wake it on purpose. He intends that binder to work for him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He explains it himself, calmly, to any binder who comes to his table, as if understanding it were a kindness.',
        },
      ],
      speechStyle:
        'Formal, slow and courteous. Addresses everybody by their trade: “delver”, “binder”, “healer”. Every sentence finishes. Uses the passive voice for anything he has done: “a rope was lost”.',
      topics: ['the guild', 'the Heartglass', 'binders', 'debts', 'Floor 61', 'tea'],
      voiceSamples: [
        'Sit, please. Tea first; we are not animals.',
        'Ropes are lost every season. The Deepway takes a share. It always has.',
        'I am eighty-eight years old, delver, and I have never once raised my voice. Consider why I have never needed to.',
        'A binder, alive. How very fortunate. For both of us, I suspect.',
      ],
      appearance:
        'An elderly man, thin and very upright, white hair combed straight back, pale watchful eyes, a black guild coat with a gold rope knotted at the collar, and an ebony cane topped with a gold knot.',
      visualHook: 'A gold rope knotted at his collar, the emblem of the guild he founded.',
      silhouette: 'A narrow upright figure with a cane at the head of a very long table.',
      artSeed: 'cl99-sallow-01',
      portrait: null,
      expressions: ['neutral', 'gracious', 'cold', 'afraid', 'calculating'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'gilt_rope_hall', activity: 'in the Gilt Rope Hall, where he has lived above the vault for forty years' },
      ],
      homeLocationId: 'gilt_rope_hall',
      knowledgeScope: ['the_gilt_rope', 'floor_61', 'the_heartglass', 'binders', 'lowmarch', 'debts'],
      startingRelationship: { trust: 0, affection: 0, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sallow_receives_you',
          label: 'He receives you privately, with tea',
          kind: 'OTHER',
          requires: { flagsSet: ['reached_the_surface'] },
        },
        {
          id: 'sallow_afraid',
          label: 'He is afraid of you',
          kind: 'OTHER',
          requires: { fear: 35 },
        },
      ],
      attributes: { might: 5, agility: 6, mind: 17, presence: 17, resolve: 16, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 11, damage: 2, tags: ['guildmaster'] },
    },
    {
      id: 'hesper',
      name: 'Hesper Moss',
      calledName: 'Hesper',
      role: 'Tallykeeper of the Tally House, who wrote your name into the Book of the Lost on Lucan’s word',
      cardBlurb:
        'She wrote your name into the Book of the Lost in ink, on Lucan’s word, and she has never struck a name out. If you walk into her house alive with a clean-cut rope, you will be the first correction in thirty years.',
      pronouns: 'she/her',
      publicTraits: ['Unbribable, and dull about it', 'Remembers every name in the book', 'Reads a rope end the way a doctor reads a wound'],
      hiddenDrives: ['She has suspected for thirty years that some of the misadventures in her book were nothing of the sort, and has never had one she could prove'],
      values: ['The book is true or it is nothing', 'The Delvers’ Peace'],
      fears: ['That the book has been lying for sixty years with her hand on it', 'The Gilt Rope’s money, which pays for the Tally House roof'],
      socialStyle:
        'Dry, procedural, unhurried. Asks for things in the right order and will not skip a step for anybody, including somebody back from the dead.',
      boundaries: [
        'Will not strike a name without evidence she can write into the book',
        'Will not take a side before the evidence does',
      ],
      goals: ['Keep the book true', 'Find one misadventure she can prove was not'],
      secrets: [
        {
          id: 'hesper_the_margin',
          fact: 'She keeps a second list in the margin of the Book of the Lost: forty-one misadventures she never believed. The first name on it is Agathe Lorne, copied from her predecessor’s margin.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the margin if you bring her a cut rope end and ask her for nothing except the truth.',
        },
      ],
      speechStyle:
        'Procedural and dry. Speaks in the order things go into the book: name, floor, cause, witness. Asks “and the witness?” about everything.',
      topics: ['the book', 'the Delvers’ Peace', 'witnesses', 'rope ends', 'thirty years at the desk'],
      voiceSamples: [
        'Name. Floor. Cause. Witness. In that order, please, and slowly. I’m writing.',
        'Misadventure. That’s what he signed. Do you know how many times I’ve written that word in thirty years?',
        'A frayed rope is the Deepway. A clean cut is a person. Nobody has ever handed me a clean cut while standing on the end of it.',
      ],
      appearance:
        'An older woman, grey hair in a tight knot, half-moon spectacles, ink-black fingertips, a grey Tally House coat with brass buttons, and a pen behind one ear.',
      visualHook: 'Ink-black fingertips from thirty years of writing the names of the lost.',
      silhouette: 'Behind a high desk, pen raised, peering over her spectacles.',
      artSeed: 'cl99-hesper-01',
      portrait: null,
      expressions: ['neutral', 'sceptical', 'stern', 'stricken', 'resolved'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'tally_house', activity: 'at the high desk in the Tally House, where the book is' },
      ],
      homeLocationId: 'tally_house',
      knowledgeScope: ['the_tally_house', 'the_book_of_the_lost', 'the_delvers_peace', 'lowmarch'],
      startingRelationship: { trust: 10, affection: 0, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hesper_strikes_it',
          label: 'She strikes your name out of the book',
          kind: 'TRUST',
          requires: { trust: 35, hasItems: ['cut_rope_end'] },
        },
        {
          id: 'hesper_shows_the_margin',
          label: 'She shows you the second list',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['name_struck'] },
        },
      ],
      attributes: { might: 7, agility: 8, mind: 17, presence: 12, resolve: 17, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 10, damage: 1, tags: ['tallykeeper'] },
    },
  ],
  /**
   * Seven threads of play, three of them main.
   *
   * The first step is turn one. The Voice asks whether the four of them get to
   * reach the top, and every answer a player is likely to give is a route:
   * hold, let all four go, cut one, listen, or ask who is talking. Holding and
   * letting go close each other, because that is the one choice in the opening
   * that cannot be taken back.
   */
  quests: [
    {
      id: 'q_finally',
      title: 'Finally',
      summary:
        'Something on the bottom floor has been waiting for you. Your threads are still tied to the four people who cut you loose, and she wants to know what you will do with them.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['voice', 'lucan', 'elsbeth', 'kes', 'bran'],
      involvedLocationIds: ['the_sump'],
      knownRewardCopy: 'Learn what your threads can do from down here.',
      steps: [
        {
          id: 'answer_her',
          playerCopy: 'Answer her. Do the four of them get to reach the top?',
          directorNotes:
            'Turn one. The four threads are real and the player can feel each one: Lucan steady and fast, Kes ahead and testing every step, Elsbeth slow and looking back, Bran at the rear with the lamp. Whatever the player does to a thread happens to that person, wherever they are, and the Voice reacts to the exact move. None of the answers is wrong.',
          succeedWhenAny: [
            {
              routeId: 'held_them',
              label: 'You held all four',
              predicate: { flagsSet: ['used:hold_the_threads'] },
              setsFlags: ['held_the_threads'],
              closesFlags: ['let_them_all_go'],
            },
            {
              routeId: 'let_them_all_go',
              label: 'You let all four go',
              predicate: { flagsSet: ['used:let_them_all_go'] },
              setsFlags: ['let_them_all_go', 'let_go_of_one'],
              closesFlags: ['held_the_threads'],
            },
            {
              routeId: 'cut_one',
              label: 'You cut one of them loose',
              predicate: { flagsSet: ['used:cut_a_thread'] },
              setsFlags: ['let_go_of_one'],
            },
            {
              routeId: 'asked_her',
              label: 'You asked who she was first',
              predicate: { flagsSet: ['spoke:voice'] },
              setsFlags: ['spoke_to_the_dark'],
            },
            {
              routeId: 'listened',
              label: 'You listened down a thread',
              predicate: { flagsSet: ['used:listen_down_the_line'] },
              setsFlags: ['heard_them_climbing'],
            },
          ],
          rewards: { flags: ['knows:the_threads'] },
        },
        {
          id: 'the_bottom_of_the_world',
          playerCopy: 'Find out where you are, and what she wants.',
          directorNotes:
            'The Sump has three ways off the shore: the Rope Field, the Echo Shaft and the foot of the Spine. The Voice follows the player along the lichen and answers questions with questions. She teaches the deep binding to a player she has started to trust, because she needs them able to survive the climb.',
          enterWhen: { flagsSet: ['knows:the_threads'] },
          succeedWhenAny: [
            {
              routeId: 'walked_the_ropes',
              label: 'You walked the Rope Field',
              predicate: { flagsSet: ['visited:the_rope_field'] },
              setsFlags: ['knows:the_rope_field'],
            },
            {
              routeId: 'listened_at_the_shaft',
              label: 'You listened under the Echo Shaft',
              predicate: { flagsSet: ['visited:the_echo_shaft'] },
              setsFlags: ['heard_the_surface'],
            },
            {
              routeId: 'asked_what_she_wants',
              label: 'You asked her what she wants',
              predicate: {
                flagsSet: ['spoke:voice'],
                minRelationship: [{ characterId: 'voice', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['knows:what_she_wants'],
            },
          ],
          rewards: { flags: ['knows:the_deep_binding'], abilities: ['bind_it_down'] },
        },
      ],
    },
    {
      id: 'q_the_climb',
      title: 'Ninety-Nine Floors',
      summary:
        'Climb out of the Deepway with no rope and no crew. One floor up, the Rust Company is camped and counting lamps. Above them, the four people who left you are already climbing toward the Long Stair, hours ahead of you and gaining.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows:the_threads'] },
      involvedCharacterIds: ['taro', 'lucan', 'elsbeth', 'kes', 'bran'],
      involvedLocationIds: ['the_spine', 'the_last_door', 'rust_camp', 'the_long_stair', 'waycamp_ninety', 'the_rim'],
      knownRewardCopy: 'Daylight, and whoever is waiting in it.',
      steps: [
        {
          id: 'off_the_bottom',
          playerCopy: 'Get off the bottom floor.',
          directorNotes:
            'The Spine is nine hundred feet of wet drain shaft. A player can climb it, shout up the Echo Shaft and bargain for a rope with whoever answers, or let the Voice carry them if they have taken her thread. It should cost something every way.',
          succeedWhenAny: [
            {
              routeId: 'came_up_the_spine',
              label: 'You climbed the Spine with your hands',
              predicate: { flagsSet: ['used:climb'], atLocation: 'the_spine' },
              setsFlags: ['came_up_the_spine'],
            },
            {
              routeId: 'called_for_a_rope',
              label: 'You shouted up the shaft and bought a rope',
              predicate: { flagsSet: ['visited:the_echo_shaft', 'used:make_a_deal'] },
              setsFlags: ['owes_taro'],
            },
            {
              routeId: 'carried_her_up',
              label: 'She carried you up her own thread',
              predicate: { flagsSet: ['used:take_her_thread'] },
              setsFlags: ['carrying_her'],
            },
            {
              routeId: 'back_on_ninety_nine',
              label: 'You stood on the ledge where they left you',
              predicate: { flagsSet: ['visited:the_last_door'] },
              setsFlags: ['stood_on_the_ledge'],
            },
          ],
          rewards: { flags: ['out_of_the_sump'] },
        },
        {
          id: 'the_rust_company',
          playerCopy: 'Get past the Rust Company camp on the ninety-eighth floor.',
          directorNotes:
            'Taro Kade watched four lamps go past where there should have been five and has already guessed. He will deal, he will fight, or he will not notice a quiet player at all. The clean cut on the rope end means something particular to him, and he only says why once.',
          enterWhen: { flagsSet: ['out_of_the_sump'] },
          succeedWhenAny: [
            {
              routeId: 'showed_him_the_cut',
              label: 'You showed Taro the cut',
              predicate: {
                flagsSet: ['spoke:taro'],
                hasItems: ['cut_rope_end'],
                minRelationship: [{ characterId: 'taro', dimension: 'trust', value: 20 }],
              },
              setsFlags: ['taro_saw_the_cut', 'taro_deal'],
            },
            {
              routeId: 'struck_a_deal',
              label: 'You struck a deal with Taro',
              predicate: { flagsSet: ['spoke:taro', 'used:make_a_deal'] },
              setsFlags: ['taro_deal'],
            },
            {
              routeId: 'slipped_past',
              label: 'You slipped past the camp',
              predicate: { flagsSet: ['visited:the_long_stair'], flagsUnset: ['spoke:taro'] },
              setsFlags: ['slipped_past_taro'],
              closesFlags: ['taro_deal'],
            },
            {
              routeId: 'fought_through',
              label: 'You fought your way through',
              predicate: { flagsSet: ['attacked:taro'] },
              setsFlags: ['rust_company_crossed'],
              closesFlags: ['taro_deal'],
            },
          ],
          rewards: { flags: ['past_ninety_eight'] },
        },
        {
          id: 'catch_them',
          playerCopy: 'Catch up with Highwater.',
          directorNotes:
            'They are hours ahead, and slowed by a climb that is harder than they understand. Where the player catches them decides the scene: on the Stair in the dark, at the Waycamp by the lift, or not at all until the Rim, where the player is already standing when the lift comes up.',
          enterWhen: { flagsSet: ['past_ninety_eight'] },
          succeedWhenAny: [
            {
              routeId: 'caught_them_at_ninety',
              label: 'You caught them at Waycamp Ninety',
              predicate: { atLocation: 'waycamp_ninety' },
              setsFlags: ['caught_highwater'],
            },
            {
              routeId: 'caught_them_on_the_stair',
              label: 'You caught them on the Long Stair',
              predicate: { atLocation: 'the_long_stair', flagsSet: ['the_stair_bit'] },
              setsFlags: ['caught_highwater', 'met_them_on_the_stair'],
            },
            {
              routeId: 'beat_them_up',
              label: 'You reached the Rim before they did',
              predicate: { atLocation: 'the_rim' },
              setsFlags: ['beat_them_to_the_rim'],
            },
          ],
          rewards: { flags: ['face_to_face'] },
        },
        {
          id: 'the_surface',
          playerCopy: 'Reach the Rim.',
          directorNotes:
            'The Rim has already been told the player is dead. Who comes up beside them, if anybody, is what the market talks about for a month.',
          enterWhen: { flagsSet: ['face_to_face'] },
          succeedWhenAny: [
            {
              routeId: 'came_up_with_them',
              label: 'You came up in the same cage as Highwater',
              predicate: { atLocation: 'the_rim', flagsSet: ['caught_highwater'] },
              setsFlags: ['came_up_with_highwater'],
            },
            {
              routeId: 'came_up_with_the_rust',
              label: 'You came up with the Rust Company',
              predicate: { atLocation: 'the_rim', flagsSet: ['taro_deal'] },
              setsFlags: ['came_up_with_the_rust'],
            },
            {
              routeId: 'came_up_first',
              label: 'You were waiting when their cage came up',
              predicate: { atLocation: 'the_rim', flagsSet: ['beat_them_to_the_rim'] },
              setsFlags: ['came_up_first'],
            },
            {
              routeId: 'came_up_alone',
              label: 'You came up alone',
              predicate: { atLocation: 'the_rim' },
              setsFlags: ['came_up_alone'],
            },
          ],
          rewards: { flags: ['reached_the_surface'], reputation: [{ factionId: 'faction_rim', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_four_threads',
      title: 'Four Threads',
      summary:
        'Lucan, Kes, Elsbeth and Bran are climbing on your threads and do not know it. What they learn on the Long Stair about what you were doing for them is up to you.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows:the_threads'] },
      involvedCharacterIds: ['lucan', 'kes', 'elsbeth', 'bran'],
      involvedLocationIds: ['the_long_stair', 'rust_camp'],
      knownRewardCopy: 'Find out what you were worth to them.',
      steps: [
        {
          id: 'what_the_stair_teaches',
          playerCopy: 'Decide what the four of them find out on the Long Stair.',
          directorNotes:
            'The Stair is harder going up than coming down, partly because the deep is waking and partly because nobody is taking a share of their hurt unless the player still is. Kes notices first. Bran is the only one who would come back if he knew. Lucan says something on the Stair that a listening player will hear.',
          succeedWhenAny: [
            {
              routeId: 'held_all_four',
              label: 'You held them all the way up',
              predicate: { flagsSet: ['held_the_threads', 'the_stair_bit'] },
              setsFlags: ['they_got_up_clean'],
            },
            {
              routeId: 'told_bran',
              label: 'You sent the truth down Bran’s thread',
              predicate: { flagsSet: ['used:tug_the_line'] },
              setsFlags: ['bran_knows'],
            },
            {
              routeId: 'told_bran_to_his_face',
              label: 'You told Bran to his face',
              predicate: { flagsSet: ['spoke:bran'] },
              setsFlags: ['bran_knows'],
            },
            {
              routeId: 'listened_in',
              label: 'You heard what Lucan said on the Stair',
              predicate: { flagsSet: ['used:listen_down_the_line', 'the_stair_bit'] },
              setsFlags: ['heard_lucan_say_it'],
            },
            {
              routeId: 'let_the_stair_have_them',
              label: 'You let the Stair teach them',
              predicate: { flagsSet: ['let_go_of_one', 'the_stair_bit'] },
              setsFlags: ['they_learned_the_hard_way'],
              closesFlags: ['they_got_up_clean'],
            },
          ],
          rewards: { flags: ['knows:what_you_were_worth'] },
        },
        {
          id: 'the_one_who_looked_away',
          playerCopy: 'Elsbeth came back down for you. Decide what that means.',
          directorNotes:
            'She turned back alone at dawn, with a lamp and her kit, to find out whether the player was dead. She will tell the truth face to face and will not ask to be forgiven. Forgiving her, sending her away and asking her to stay are all honest answers.',
          enterWhen: { flagsSet: ['elsbeth_came_back'] },
          succeedWhenAny: [
            {
              routeId: 'she_stayed',
              label: 'You asked her to stay',
              predicate: {
                flagsSet: ['spoke:elsbeth'],
                minRelationship: [
                  { characterId: 'elsbeth', dimension: 'trust', value: 55 },
                  { characterId: 'elsbeth', dimension: 'affection', value: 65 },
                ],
              },
              setsFlags: ['elsbeth_stays', 'forgave_elsbeth'],
            },
            {
              routeId: 'forgave_her',
              label: 'You forgave her',
              predicate: {
                flagsSet: ['spoke:elsbeth'],
                minRelationship: [{ characterId: 'elsbeth', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['forgave_elsbeth'],
            },
            {
              routeId: 'sent_her_away',
              label: 'You told her exactly what she did and sent her back up',
              predicate: { flagsSet: ['spoke:elsbeth', 'used:say_it_to_their_face'] },
              setsFlags: ['sent_elsbeth_away'],
              closesFlags: ['elsbeth_stays'],
            },
          ],
          rewards: { flags: ['elsbeth_decided'] },
        },
      ],
    },
    {
      id: 'q_sixty_one_years',
      title: 'Sixty-One Years',
      summary:
        'Somebody made a camp in the Rope Field once and scratched tally marks on the wall until they stopped. The Voice will not say her name. The badges in the silt might.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['visited:the_rope_field'] },
      involvedCharacterIds: ['voice', 'sallow'],
      involvedLocationIds: ['the_rope_field', 'agathes_hollow'],
      knownRewardCopy: 'Her name, and what she is asking you for.',
      steps: [
        {
          id: 'her_name',
          playerCopy: 'Find out who she was.',
          directorNotes:
            'Her name is Agathe Lorne and she was the binder of the party that founded the Gilt Rope Guild. A player earns it by finding the fifth founder’s badge in the silt and saying the name aloud, or by asking what happened to her rather than what she is. Once she is named, the warm crack behind the ropes opens.',
          succeedWhenAny: [
            {
              routeId: 'found_the_badge',
              label: 'You found her badge in the silt',
              predicate: { hasItems: ['old_badge'] },
              setsFlags: ['knows:her_name'],
            },
            {
              routeId: 'she_told_you',
              label: 'She told you herself',
              predicate: {
                flagsSet: ['spoke:voice'],
                minRelationship: [{ characterId: 'voice', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:her_name', 'she_trusted_you'],
            },
          ],
          rewards: { flags: ['knows:her_name', 'knows:floor_61'], abilities: ['take_her_thread'] },
        },
        {
          id: 'what_is_left_of_her',
          playerCopy: 'Decide what to do about her.',
          directorNotes:
            'Her body sleeps, sitting up on a stone bench in the Hollow, a thread of light running from her wrist down into the floor. She asks to be carried out; she does not demand it. Letting her go is a mercy she has thought about. Staying with her is a real ending and should be offered without judgement.',
          enterWhen: { flagsSet: ['knows:her_name'] },
          succeedWhenAny: [
            {
              routeId: 'promised_to_carry_her',
              label: 'You tied her thread to yours',
              predicate: { atLocation: 'agathes_hollow', flagsSet: ['used:take_her_thread'] },
              setsFlags: ['carrying_her'],
            },
            {
              routeId: 'let_her_rest',
              label: 'You cut her loose, gently',
              predicate: { atLocation: 'agathes_hollow', flagsSet: ['used:cut_a_thread'] },
              setsFlags: ['let_her_rest'],
              closesFlags: ['carrying_her'],
            },
            {
              routeId: 'stayed_with_her',
              label: 'You stayed',
              predicate: {
                atLocation: 'agathes_hollow',
                minRelationship: [{ characterId: 'voice', dimension: 'affection', value: 60 }],
              },
              setsFlags: ['stayed_below'],
            },
            {
              routeId: 'left_her_there',
              label: 'You climbed out and left her where she was',
              predicate: { flagsSet: ['visited:agathes_hollow', 'out_of_the_sump'] },
              setsFlags: ['left_her_below'],
            },
          ],
          rewards: { flags: ['agathe_decided'] },
        },
      ],
    },
    {
      id: 'q_the_heartglass',
      title: 'The Heartglass',
      summary:
        'Lucan carries the Heartglass in a lead box at his hip, and every hour it is out of its vault the deep floors wake a little more. Only a binder can hold it safely. You are a binder.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['out_of_the_sump'] },
      involvedCharacterIds: ['lucan', 'voice', 'sallow'],
      involvedLocationIds: ['waycamp_ninety', 'the_last_door', 'gilt_rope_hall'],
      knownRewardCopy: 'Decide where the Heartglass ends up.',
      steps: [
        {
          id: 'face_lucan',
          playerCopy: 'Face Lucan.',
          directorNotes:
            'He goes very still and very polite, and uses the player’s full name, which is how the player always knew he was lying. With the letter in hand the player can make him say the real reason. He will not kneel. He will fight if he thinks he can win.',
          enterWhen: { flagsSet: ['face_to_face'] },
          succeedWhenAny: [
            {
              routeId: 'made_him_say_it',
              label: 'You made him say the real reason',
              predicate: { flagsSet: ['spoke:lucan'], hasItems: ['withheld_letter'] },
              setsFlags: ['lucan_confessed'],
            },
            {
              routeId: 'took_it',
              label: 'You took the Heartglass off him',
              predicate: { hasItems: ['the_heartglass'] },
              setsFlags: ['took_the_heartglass'],
            },
            {
              routeId: 'fought_him',
              label: 'You fought him',
              predicate: { flagsSet: ['attacked:lucan'] },
              setsFlags: ['fought_lucan'],
            },
            {
              routeId: 'let_him_keep_it',
              label: 'You let him keep it, for a price',
              predicate: { flagsSet: ['spoke:lucan', 'used:make_a_deal'] },
              setsFlags: ['lucan_kept_it'],
              closesFlags: ['took_the_heartglass'],
            },
          ],
          rewards: { flags: ['lucan_faced'] },
        },
        {
          id: 'where_it_goes',
          playerCopy: 'Decide where the Heartglass goes.',
          directorNotes:
            'Back in its vault, the deep goes back to sleep. In the Voice’s hands, she could walk out on her own and could wake the deep under the Gilt Rope Hall. In Sallow’s vault, it makes him the most powerful man in the city and he will want the player to hold it for him. In the player’s own hands, they are that person instead.',
          enterWhen: { flagsSet: ['lucan_faced'] },
          succeedWhenAny: [
            {
              routeId: 'put_it_back',
              label: 'You carried it back down to its vault',
              predicate: { hasItems: ['the_heartglass'], atLocation: 'the_last_door' },
              setsFlags: ['heartglass_returned'],
            },
            {
              routeId: 'gave_it_to_her',
              label: 'You gave it to her',
              predicate: { hasItems: ['the_heartglass'], flagsSet: ['carrying_her'] },
              setsFlags: ['voice_has_it'],
              closesFlags: ['heartglass_returned'],
            },
            {
              routeId: 'sallow_has_it',
              label: 'It went to the Gilt Rope vault',
              predicate: { flagsSet: ['lucan_kept_it', 'visited:gilt_rope_hall'] },
              setsFlags: ['sallow_has_it'],
            },
            {
              routeId: 'kept_it',
              label: 'You kept it',
              predicate: { hasItems: ['the_heartglass'], flagsSet: ['reached_the_surface'] },
              setsFlags: ['you_kept_it'],
            },
          ],
          rewards: { flags: ['heartglass_settled'] },
        },
      ],
    },
    {
      id: 'q_misadventure',
      title: 'Misadventure',
      summary:
        'Lucan signed the Book of the Lost and the Tally House wrote you down as dead by misadventure. The Tallykeeper has never struck a name out. A clean cut is not misadventure.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['reached_the_surface'] },
      involvedCharacterIds: ['hesper', 'lucan'],
      involvedLocationIds: ['tally_house'],
      knownRewardCopy: 'Your name, back.',
      steps: [
        {
          id: 'the_book',
          playerCopy: 'Decide what the Book of the Lost says about you.',
          directorNotes:
            'Hesper Moss needs name, floor, cause and witness, in that order. A cut rope proven in front of her strips the cutter of share, sponsor and the right to go down again. A player can also choose to stay dead on paper, which is freedom of a kind.',
          succeedWhenAny: [
            {
              routeId: 'struck_with_the_rope',
              label: 'You put the cut end on her desk',
              predicate: { atLocation: 'tally_house', flagsSet: ['spoke:hesper'], hasItems: ['cut_rope_end'] },
              setsFlags: ['name_struck', 'the_cut_on_record'],
            },
            {
              routeId: 'named_him',
              label: 'You named Lucan as the witness who lied',
              predicate: { atLocation: 'tally_house', flagsSet: ['lucan_confessed'] },
              setsFlags: ['name_struck', 'lucan_on_record'],
            },
            {
              routeId: 'stayed_dead',
              label: 'You let the book keep you',
              predicate: { flagsSet: ['reached_the_surface', 'used:move_quiet'] },
              setsFlags: ['dead_on_paper'],
              closesFlags: ['name_struck'],
            },
          ],
          rewards: {
            flags: ['the_book_answered'],
            reputation: [
              { factionId: 'faction_tally', amount: 20 },
              { factionId: 'faction_rim', amount: 15 },
            ],
          },
        },
        {
          id: 'the_margin',
          playerCopy: 'Ask about the other names.',
          directorNotes:
            'In the margin of the book is a second list in a smaller hand: forty-one misadventures the Tallykeepers never believed. The first name on it is Agathe Lorne. Hesper shows it only to somebody who has earned it, or who walks in with the fifth founder’s badge.',
          enterWhen: { flagsSet: ['name_struck'] },
          succeedWhenAny: [
            {
              routeId: 'read_the_margin',
              label: 'She showed you the margin',
              predicate: {
                atLocation: 'tally_house',
                minRelationship: [{ characterId: 'hesper', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_margin'],
            },
            {
              routeId: 'brought_her_the_badge',
              label: 'You put the founder’s badge on the book',
              predicate: { atLocation: 'tally_house', hasItems: ['old_badge'] },
              setsFlags: ['knows:the_margin', 'agathe_on_record'],
            },
          ],
          rewards: {
            flags: ['floor_61_on_record'],
            reputation: [{ factionId: 'faction_tally', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_the_gold_rope',
      title: 'The Gold Rope',
      summary:
        'Odran Sallow founded the Gilt Rope Guild sixty-one years ago, sponsored your descent, and is waiting at the top for the Heartglass. He will be very glad you are alive.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['reached_the_surface'] },
      involvedCharacterIds: ['sallow', 'voice', 'lucan', 'taro'],
      involvedLocationIds: ['gilt_rope_hall'],
      knownRewardCopy: 'Settle things with the guild.',
      steps: [
        {
          id: 'the_hall',
          playerCopy: 'Decide what to do about Odran Sallow.',
          directorNotes:
            'He offers tea first and describes consequences as if regretting them in advance. He wants a binder to hold the Heartglass for him and will make a generous offer. He will not admit Floor 61 in public unless she is standing in the room or the Tally House has it in writing.',
          succeedWhenAny: [
            {
              routeId: 'brought_her_in',
              label: 'You walked into his hall with her',
              predicate: { atLocation: 'gilt_rope_hall', flagsSet: ['carrying_her'] },
              setsFlags: ['she_faced_him', 'sallow_exposed'],
            },
            {
              routeId: 'exposed_him',
              label: 'You exposed Floor 61 in front of the guilds',
              predicate: { atLocation: 'gilt_rope_hall', flagsSet: ['agathe_on_record'] },
              setsFlags: ['sallow_exposed'],
              closesFlags: ['sallow_deal'],
            },
            {
              routeId: 'took_his_offer',
              label: 'You took his offer',
              predicate: {
                atLocation: 'gilt_rope_hall',
                flagsSet: ['spoke:sallow'],
                minRelationship: [{ characterId: 'sallow', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['sallow_deal'],
              closesFlags: ['sallow_exposed'],
            },
            {
              routeId: 'left_them_to_it',
              label: 'You never went to the Hall at all',
              predicate: { flagsSet: ['heartglass_settled'], flagsUnset: ['visited:gilt_rope_hall'] },
              setsFlags: ['let_the_guild_be'],
            },
          ],
          rewards: { flags: ['the_hall_answered'], reputation: [{ factionId: 'faction_rim', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_taros_price',
      title: 'Taro’s Price',
      summary:
        'Taro Kade gave you a hand up and wants to be standing there when you show Lucan the rope. A deal said out loud is a deal.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['taro_deal'] },
      involvedCharacterIds: ['taro'],
      involvedLocationIds: ['rust_camp', 'gilt_rope_hall'],
      knownRewardCopy: 'The Rust Company, behind you.',
      steps: [
        {
          id: 'pay_taro',
          playerCopy: 'Keep your word to Taro.',
          directorNotes:
            'He wants his crew home, his name on the Tally House wall, and to be in the room when Lucan sees the cut. Selling out to the Gilt Rope, the guild that paid him to slow Highwater down, breaks the deal for good.',
          succeedWhenAny: [
            {
              routeId: 'he_was_there',
              label: 'He was standing there when you faced Lucan',
              predicate: { flagsSet: ['taro_deal', 'face_to_face'] },
              setsFlags: ['paid_taro'],
            },
            {
              routeId: 'stood_with_him_in_the_hall',
              label: 'You walked into the Gilt Rope Hall with him',
              predicate: { flagsSet: ['taro_deal', 'visited:gilt_rope_hall'] },
              setsFlags: ['paid_taro', 'rust_in_the_hall'],
            },
          ],
          failWhen: { flagsSet: ['sallow_deal'] },
          rewards: { flags: ['taro_paid'], reputation: [{ factionId: 'faction_rust', amount: 30 }] },
        },
      ],
    },
  ],
  /**
   * The clock runs on three things: Highwater climbing, the city deciding the
   * player is dead, and the deep waking. The last one is the only pressure in
   * the story that gets worse on its own, and three different endings for the
   * Heartglass switch it off.
   */
  worldEvents: [
    {
      id: 'we_the_walls_tick',
      atWorldMinute: 18 * 60 + 40,
      locationId: 'the_sump',
      publicCopy: 'Somewhere in the walls, very far off, something begins to tick like a slow clock.',
      directorNotes:
        'The first sign the deep is waking because the Heartglass left its vault. The Voice goes quiet when it starts, which she has not done before.',
      setsFlags: ['heard_the_ticking'],
    },
    {
      id: 'we_four_lamps',
      atWorldMinute: 20 * 60,
      locationId: 'rust_camp',
      publicCopy: 'Four lamps climb past the Rust Company camp in a hurry, and Taro Kade counts them twice.',
      directorNotes:
        'Highwater goes past Floor 98 without stopping. Taro knows there were five of them on the way down, and he does not say anything to anybody yet.',
      setsFlags: ['taro_counted_four'],
      movesCharacters: [
        { characterId: 'lucan', toLocationId: 'the_long_stair' },
        { characterId: 'elsbeth', toLocationId: 'the_long_stair' },
        { characterId: 'kes', toLocationId: 'the_long_stair' },
        { characterId: 'bran', toLocationId: 'the_long_stair' },
      ],
    },
    {
      id: 'we_the_stair_bites',
      atWorldMinute: 24 * 60 + 3 * 60,
      locationId: 'the_long_stair',
      publicCopy: 'A step on the Long Stair that held on the way down gives way under somebody’s boot.',
      directorNotes:
        'Whether anybody falls depends on the threads. If the player is still holding them, the one who slips is caught by nothing anybody can see. If not, they learn the hard way. Kes is the first to wonder aloud why the way up is so much harder.',
      setsFlags: ['the_stair_bit'],
      requiresFlags: ['knows:the_threads'],
    },
    {
      id: 'we_elsbeth_turns_back',
      atWorldMinute: 24 * 60 + 6 * 60,
      locationId: 'the_long_stair',
      publicCopy: 'At first light one lamp leaves Highwater and starts back down the Long Stair alone.',
      directorNotes:
        'Elsbeth has felt her thread all night and cannot stand it. She tells the others she is going back for the body, and goes. If the player let all four threads go, she never felt anything and stays with the others.',
      setsFlags: ['elsbeth_came_back'],
      cancelledByFlags: ['let_them_all_go'],
      requiresFlags: ['knows:the_threads'],
      movesCharacters: [{ characterId: 'elsbeth', toLocationId: 'rust_camp' }],
    },
    {
      id: 'we_the_book',
      atWorldMinute: 24 * 60 + 13 * 60,
      locationId: 'tally_house',
      publicCopy: 'At the Tally House a clerk reads out a new name for the Book of the Lost, and it is yours.',
      directorNotes:
        'Lucan sent word up from Waycamp Ninety by the lift post. Cause: misadventure. Witness: Lucan Harrow. The market on the Rim has the story by evening.',
      setsFlags: ['your_name_in_the_book'],
    },
    {
      id: 'we_the_well_speaks',
      atWorldMinute: 48 * 60 + 2 * 60,
      locationId: 'gilt_rope_hall',
      publicCopy: 'In the Gilt Rope courtyard, servants hear the old well say a name and go and fetch the guildmaster.',
      directorNotes:
        'Once the player knows her name the Voice can reach further up the threads than before, and she uses it on Sallow first. He comes down in his dressing gown and stands at the well for an hour.',
      setsFlags: ['sallow_heard_her'],
      requiresFlags: ['knows:her_name'],
    },
    {
      id: 'we_waycamp_ninety',
      atWorldMinute: 48 * 60 + 7 * 60,
      locationId: 'waycamp_ninety',
      publicCopy: 'Highwater stumbles into Waycamp Ninety and asks for the first cage up.',
      directorNotes:
        'Lucan, Kes and Bran reach the lift, and Elsbeth with them if she never turned back. Lucan rubs out the 5 and chalks HIGHWATER at the top of the board with a 4 beside it, and nobody corrects him.',
      setsFlags: ['highwater_at_ninety'],
      movesCharacters: [
        { characterId: 'lucan', toLocationId: 'waycamp_ninety' },
        { characterId: 'kes', toLocationId: 'waycamp_ninety' },
        { characterId: 'bran', toLocationId: 'waycamp_ninety' },
      ],
    },
    {
      id: 'we_the_deep_rises',
      atWorldMinute: 72 * 60 + 4 * 60,
      locationId: 'waycamp_ninety',
      publicCopy: 'Something from below the ninetieth floor climbs onto the Waycamp platform, and the lift crew drop the brake and run.',
      directorNotes:
        'The deep is properly awake now. Every scene below the Rim has this in it from here on: creatures above their floors, crews pulling out, the Tally House closing the lower floors. It does not happen if the Heartglass is already back in its vault or in a binder’s hands.',
      setsFlags: ['the_deep_came_up'],
      cancelledByFlags: ['heartglass_returned', 'voice_has_it', 'you_kept_it'],
    },
    {
      id: 'we_the_ceremony',
      atWorldMinute: 72 * 60 + 19 * 60,
      locationId: 'gilt_rope_hall',
      publicCopy: 'The Gilt Rope Hall lights every lamp for the clearing of Floor 99, and every guild in Lowmarch comes to watch.',
      directorNotes:
        'If Lucan still carries the Heartglass, Sallow receives it at the head of the long table, in front of everybody; if not, Sallow has to explain to every guild in the city why the box is not on the table. Highwater is toasted as four. If the player walks in alive, it is the most public room in the city.',
      setsFlags: ['ceremony_night'],
      cancelledByFlags: ['heartglass_returned'],
      movesCharacters: [
        { characterId: 'lucan', toLocationId: 'gilt_rope_hall' },
        { characterId: 'kes', toLocationId: 'gilt_rope_hall' },
        { characterId: 'bran', toLocationId: 'gilt_rope_hall' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_lucan',
      kind: 'FINALE',
      label: 'Lucan, face to face',
      seedHint: 'Lucan is always a thread away: steady, fast, a little too cheerful on the Stair. The player can feel him and he cannot feel them.',
      payoffHint: 'The scene where Lucan sees the player alive. He goes still and polite and uses their full name. What happens next is entirely the player’s.',
      weight: 0.9,
    },
    {
      id: 'p_her_name',
      kind: 'MYSTERY',
      label: 'Who she was',
      seedHint: 'The tally marks in the Rope Field. Her old-fashioned speech. A brass ring in her notebook exactly like the player’s.',
      payoffHint: 'Agathe Lorne, binder, cut loose on Floor 61 by Odran Sallow so the founding prize would split four ways.',
      weight: 0.7,
    },
    {
      id: 'p_elsbeth',
      kind: 'RELATIONSHIP',
      label: 'What Elsbeth did',
      seedHint: 'She looked away in the opening. Her thread is the slowest of the four and keeps turning back.',
      payoffHint: 'She told Lucan about the letter on Floor 70, thinking he would be glad. She says it without asking to be forgiven.',
      weight: 0.6,
    },
    {
      id: 'p_sallow',
      kind: 'BOSS',
      label: 'The man at the top of the guild',
      seedHint: 'The gold rope on every Gilt Rope badge. A guild that has paid for sixty years to reach Floor 99 and never said why.',
      payoffHint: 'Odran Sallow did to Agathe exactly what Lucan did to the player, and wants the player to hold the Heartglass for him.',
      weight: 0.7,
    },
    {
      id: 'p_worth',
      kind: 'THEME',
      label: 'What you were worth',
      seedHint: 'They called it shields. The Stair is harder going up, and Kes is the first to notice.',
      payoffHint: 'One of the four understands, out loud, what the support mage was doing for them every day for nineteen days.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_anchor',
      name: 'You Took Their Hurt',
      role: 'Defence and taking blows for others',
      summary: 'You were the one who pulled the party’s injuries down your threads into yourself, so you are hard to put down and can shield one person completely.',
      playstyle: ['Defensive', 'Tough', 'Protective'],
      blurb: 'Nineteen days of everybody else’s bruises, and none of them ever asked why you were always the one who limped.',
      attributeBonus: { resolve: 3, might: 1 },
      skillProficiencies: { warding: 3, binding: 2, climbing: 1 },
      startingItems: [],
      startingAbilities: ['hold_the_threads', 'listen_down_the_line', 'tug_the_line', 'cut_a_thread', 'let_them_all_go', 'take_the_blow'],
      startingReputation: [],
    },
    {
      id: 'arch_lantern',
      name: 'You Kept the Lamps Lit',
      role: 'Light, maps and reading the dungeon',
      summary: 'You lit the way and marked every safe step all the way down, so you find routes, read floors and hear what others miss.',
      playstyle: ['Scout', 'Clever', 'Sees danger first'],
      blurb: 'Your chalk is on every safe step of the Long Stair, and four people are climbing out by it right now.',
      attributeBonus: { mind: 3, arcana: 1 },
      skillProficiencies: { delving: 3, listening: 2, binding: 1 },
      startingItems: [{ itemId: 'chalk_and_line', qty: 1 }],
      startingAbilities: ['hold_the_threads', 'listen_down_the_line', 'tug_the_line', 'cut_a_thread', 'let_them_all_go', 'throw_a_light'],
      startingReputation: [],
    },
    {
      id: 'arch_knot',
      name: 'You Tied the Knots',
      role: 'Strong magic, ropes and locks',
      summary: 'You rigged every rope and anchor the party used, so your threads are the strongest and you can hold a door, a gate or a lift shut against anybody.',
      playstyle: ['Precise', 'Quiet', 'Strong magic'],
      blurb: 'Lucan cut a rope you had tied yourself, and you noticed even while falling that he had to saw at it.',
      attributeBonus: { arcana: 3, agility: 1 },
      skillProficiencies: { binding: 3, quiet: 2 },
      startingItems: [],
      startingAbilities: ['hold_the_threads', 'listen_down_the_line', 'tug_the_line', 'cut_a_thread', 'let_them_all_go', 'hold_it_shut'],
      startingReputation: [],
    },
    {
      id: 'arch_talker',
      name: 'You Did the Talking',
      role: 'Talk, deals and debts',
      summary: 'You handled the lift slots, the rope, the cookfires and the favours, so half the Deepway owes you something and you know exactly who.',
      playstyle: ['Social', 'Bargainer', 'Well connected'],
      blurb: 'Lucan shook the hands. You wrote down who owed what, and the people who owe you know it was you.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { bargaining: 3, listening: 2, binding: 1 },
      startingItems: [{ itemId: 'favour_book', qty: 1 }],
      startingAbilities: ['hold_the_threads', 'listen_down_the_line', 'tug_the_line', 'cut_a_thread', 'let_them_all_go', 'call_in_a_favour'],
      startingReputation: [{ factionId: 'faction_rust', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What did Highwater call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Wren Abara' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did you actually do for Highwater?',
      helpText:
        'Every binder ties threads; this is what you did with yours for nineteen days, and it sets what you are good at. It is fixed for the whole story and stays with you. It does not set whether you hold the threads or let them go, whether you get even, or whether you ever go back up — all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What did the four of them never notice about you?',
      helpText: 'One thing about you that was true the whole time you were in Highwater, and that nobody in it ever saw. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I hummed while I tied their threads, and I always went last across anything narrow.',
    },
    {
      id: 'first_instinct',
      label: 'At the bottom of the fall, what is your first instinct?',
      helpText: 'A starting temperament, not a commitment. You can do the opposite on turn one and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'get_even', label: 'Make them pay for it' },
        { id: 'get_up', label: 'Get out first, decide everything else later' },
        { id: 'get_answers', label: 'Find out who is talking, and why she waited' },
        { id: 'hold_on', label: 'Keep them alive, whatever they did' },
        { id: 'let_go', label: 'Let go of all of it' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see in the blue light?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Soaked, cut across one cheek, a brass ring on my thumb and a binder’s coat two sizes too big.',
    },
  ],
  /**
   * Where this can end up. Exactly twelve, because the storyteller only ever
   * reads the first twelve.
   *
   * Revenge is two of them, mercy is two, and the guild is three: exposed,
   * bought, or left alone with the Heartglass. "Nobody’s Rope" is walking away
   * from all of it and is reachable early. "The Bottom Floor" is staying, and
   * it is not written as a defeat.
   */
  endings: [
    {
      id: 'end_the_long_way_up',
      name: 'The Long Way Up',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['reached_the_surface', 'name_struck'], flagsUnset: ['stayed_below'] },
      condition:
        'The ordinary victory. The player climbed ninety-nine floors with no rope and no crew, walked into the Tally House alive and had their name struck out of the Book of the Lost. Play the relief and the exhaustion. Do not resolve everything else; the city has only just found out.',
      epilogue:
        'There is a line through your name in the Book of the Lost, in fresh ink, initialled. It is the first correction in thirty years, and people come to the Tally House just to look at it. You sleep for most of two days.',
    },
    {
      id: 'end_four_shares',
      name: 'Four Shares',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['sallow_has_it'], flagsUnset: ['name_struck', 'sallow_exposed'] },
      condition:
        'The loss reachable without a mistake. Lucan sold the Heartglass to the Gilt Rope, the shares were paid out four ways, and nothing the player did changed the story the city tells. Play it as a world that simply did not notice, not as a punishment.',
      epilogue:
        'Highwater is on the Tally House wall in gold, four names. The fourth share cleared a debt and a mortgage. Lucan buys a house on the upper ring. Some nights, on the Long Stair, delvers say a step catches them that nothing should have caught.',
    },
    {
      id: 'end_cut_them_loose',
      name: 'Cut Them Loose',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['let_them_all_go', 'out_of_the_sump'] },
      condition:
        'The player opened their hand on all four threads in the first minutes and then climbed out anyway, owing nobody. This is freedom more than revenge. Whatever happened to the four of them on the Stair happened without the player in the way.',
      epilogue:
        'You never find out exactly what the Long Stair did to them, and you decide not to ask. You tie your threads to strangers now, for wages, and you charge properly for it.',
    },
    {
      id: 'end_still_holding',
      name: 'Still Holding',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['held_the_threads', 'they_got_up_clean', 'face_to_face'] },
      condition:
        'The player held all four of them up the whole way, and then stood in front of them and let them work out what that meant. This is not forgiveness unless the player makes it forgiveness. Let the four of them understand, one at a time, in silence.',
      epilogue:
        'They got up clean. Every one of them. You stood at the lift-head and watched each of them work it out: Kes first, then Bran, then Elsbeth. Lucan last, and Lucan never says it.',
    },
    {
      id: 'end_nobodys_rope',
      name: 'Nobody’s Rope',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['name_struck'] },
      condition:
        'The player walked away from all of it: the guild, the shares, the four of them, the Voice. Dead on paper and free. Do not frame it as giving up. It is a person who has been everybody else’s support for eight years choosing something else.',
      epilogue:
        'Somewhere well away from Lowmarch there is a binder who does odd jobs under another name and never goes underground. The Book of the Lost still has you in it. You prefer it that way.',
    },
    {
      id: 'end_the_twelfth',
      name: 'The Twelfth',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['taro_paid', 'reached_the_surface'],
        minFactionReputation: [{ factionId: 'faction_rust', value: 30 }],
      },
      condition:
        'The player kept their word to Taro Kade and the Rust Company counts them as one of theirs. The crew that only ever came second has the binder Highwater threw away. Play it warm and loud, a cookfire ending.',
      epilogue:
        'The Rust Company goes down again in spring, twelve of them, and is first to a floor for the first time in three years. Taro chalks the number on the Waycamp board himself and underlines it twice.',
    },
    {
      id: 'end_the_one_who_came_back',
      name: 'The One Who Came Back',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['elsbeth_came_back', 'elsbeth_stays'],
        minRelationship: [{ characterId: 'elsbeth', dimension: 'affection', value: 65 }],
      },
      condition:
        'Elsbeth came back down alone, told the truth without asking for anything, and the player asked her to stay. Play it as two tired people being honest. A kiss at most, and only if the scene has earned it.',
      epilogue:
        'She still apologises for small things constantly. Never for that one; she said it once, properly, and you told her that was enough. You go down again together the following year, two of you, with a great deal of rope.',
    },
    {
      id: 'end_back_in_the_vault',
      name: 'Back in the Vault',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['heartglass_returned'] },
      condition:
        'The player carried the Heartglass all the way back down to its vault behind the Last Door and put the deep back to sleep. Nobody pays for that and almost nobody knows. Play the quiet of the walls stopping.',
      epilogue:
        'The ticking stops. The monsters go back to the floors the maps say they live on. The Gilt Rope never gets its prize and never says why it wanted one. You know. That is the whole reward, and you find it is enough.',
    },
    {
      id: 'end_new_hands',
      name: 'Gold Rope, New Hands',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['sallow_deal', 'reached_the_surface'] },
      condition:
        'The player took Odran Sallow’s offer and became the binder who holds the Heartglass for the Gilt Rope. Power, safety and a crew of their own. Do not moralise. Let the player feel exactly how comfortable the chair is.',
      epilogue:
        'You have a crew of your own now, and a room above the vault, and tea whenever you like. Sallow is very kind to you. Some nights you hear a woman’s voice in the courtyard well, and you have learned not to go and look.',
    },
    {
      id: 'end_the_gold_rope_frays',
      name: 'The Gold Rope Frays',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['sallow_exposed', 'floor_61_on_record'] },
      condition:
        'The player put Floor 61 into the Book of the Lost and said it in the Gilt Rope Hall in front of every guild. Sixty-one years of the city’s biggest fortune turns out to rest on a cut rope. Play the room going quiet.',
      epilogue:
        'The Gilt Rope is struck from the Tally House book by the end of the season. Forty-one names in the margin are moved into the main column, one at a time, with witnesses. Hesper Moss does every one herself.',
    },
    {
      id: 'end_she_walks_out',
      name: 'She Walks Out',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['carrying_her', 'she_faced_him'] },
      condition:
        'The player carried Agathe Lorne up ninety-nine floors on their own thread and she stood in the Gilt Rope Hall in front of Odran Sallow. What she does with that moment is hers. Play her as a person, not a ghost story.',
      epilogue:
        'She looks at him for a long time, and then she says his name, once, and walks out into the market to see what sixty-one years did to the city. You hear her in your threads for years afterwards, delighted by small new things.',
    },
    {
      id: 'end_the_bottom_floor',
      name: 'The Bottom Floor',
      rarity: 'UNIQUE',
      minTurn: 18,
      requires: { flagsSet: ['stayed_below'] },
      condition:
        'The player chose to stay on the bottom floor with her instead of climbing out. It is not a defeat and should never be played as one. Two binders, a lot of thread, and the whole Deepway to listen to.',
      epilogue:
        'Delvers on the deep floors say that if you fall now, something catches you. Two voices, one old-fashioned and one not, who ask your name and send you back up on a thread of light.',
    },
  ],
  opening:
    "You hang over the pit on the ninety-ninth floor, and the rope is all that holds you.\n\nLucan kneels at the edge, his knife on the rope. Your best friend for eight years. Behind him, Elsbeth, your healer, looks away.\n\n\"Nothing personal,\" Lucan says. \"Four shares beat five.\"\n\nThe rope parts.\n\nYou fall a long way. Black water. Stone.\n\nIn the dark, a woman’s voice, pleased: \"Finally.\"\n\nBlue light spreads along the wall in the shape of her. She says your name like she has practised it.\n\n\"Your threads are still tied to them, my dear. All four, climbing away, and you’re still holding them up.\n\n\"So. Do they get to reach the top?\"",
  openingPanel: {
    assetKey: 'story_cut_loose_at_floor_99/opening',
    alt: 'Lucan in a sky-blue sash, sword on his back, kneeling at the lamplit edge of a black pit, his knife on a taut rope that runs down to you, Elsbeth turned away behind him.',
  },
  openingSuggestions: [
    "\"Who are you? And how do you know my name?\"",
    "I find the four threads in the dark and hold on. Nobody else falls today.",
    "I take Lucan’s thread in my fist and pull, hard.",
  ],
  coverDirection: [
    'SUBJECT: the Voice, a woman in a long dark-green binder’s coat, alone and unmistakable in the foreground of a key visual for a dark fantasy dungeon anime about a betrayal.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Dark hair pinned up in a neat formal knot, calm pale grey eyes, a high-collared dark-green coat of an antique cut with brass toggles, a brass ring on her thumb.',
    'One hand is raised at shoulder height, fingers loosely closed around four thin threads of glowing blue light that run straight up out of the top of the frame, taut as harp strings; her other hand is open at her side, palm toward the viewer, as if offering it.',
    'Her expression is calm and curious with the faintest smile, looking straight at the viewer, as if she has been waiting for you a very long time.',
    'HER FACE STAYS CLEAN: no glow, cracks, particles, blur or shadows on her face or skin.',
    'Every glow effect stays on the threads, on the lichen, on the edges of her coat where it meets the rock, and on the title, never on her face.',
    'BEHIND HER, soft and secondary: a vast black cavern at the bottom of a dungeon, rock walls covered in faintly glowing cold blue lichen, a still black pool with a shore of broken lamps and fallen ropes.',
    'High above her, small and far away, a lamplit stone ledge over the dark where a kneeling swordsman in a sky-blue sash holds a knife, and a cut rope end falls away from the ledge; the four threads run up toward that light.',
    'LIGHT: cold blue lichen-light from below and behind her, one warm amber lamp point far above, so she is lit in blue and rimmed in pale light.',
    'TITLE: the title Cut Loose at Floor 99 painted into the art across the lower third, in front of her coat and the black water, as heavy condensed carved-stone capitals in pale blue-white with a faint lichen glow:',
    'CUT LOOSE AT on the first line and FLOOR 99 on the second, larger. One thin glowing blue thread runs through the letters, and a single clean diagonal knife cut slices through the word CUT only.',
    'Spelled exactly CUT LOOSE AT FLOOR 99, every letter and both nines, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const CUT_LOOSE_AT_FLOOR_99 = StoryVersion.parse(raw);
