import { StoryVersion } from '@plotbreak/contracts';

/**
 * "One Week, She Said" — the person who made school a misery for you is on
 * your doorstep in the rain, and she has a deadline.
 *
 * Slate #23 of fifty (`docs/stories-50/PLAN.md`): forced proximity, male lean.
 * Built on the shape of Good Morning, Husband, which is our best opener: one
 * small home, one person the whole story is arranged around, a secret with a
 * date on it, and an ordinary week that is worth playing even if the player
 * never pulls on any thread.
 *
 * The structural bet is that the player holds all the power on turn one and
 * the story is about what they do with it. Mika has asked for the one thing she
 * has no right to ask, from the one person entitled to say no. Every answer is
 * authored: a closed door is a route (she spends the week in the landlady's
 * spare room, directly under the player's floor), cruelty is a route with its
 * own ending, and so is saying nothing for seven polite nights. Forgiveness is
 * one destination among thirteen and nothing herds the player toward it.
 *
 * Playable span: eight days, from twenty to midnight on a wet Saturday to ten
 * o'clock the Sunday after, when a letting agent hands her a key. Four clocks
 * run under the week: the copy of her ID card due at the agency on Friday at
 * five, Kenta finding the building through a location share she has forgotten,
 * the class reunion on Saturday night, and the keys on Sunday. Each one can be
 * switched off or met early by what the player does.
 *
 * Kenta is the pressure from outside, and he is deliberately non-violent: he
 * does his damage with money, paperwork and other people's opinions, and he
 * would like nothing better than for the player to hit him in front of a
 * witness. That keeps a controlling ex inside a 13+ rating without softening
 * what he is.
 *
 * Three invisible variables. Energy is the only GOOD_HIGH, because
 * `resolveRest` refills those and a work week with a stranger in your bathroom
 * at six really does run out. Gossip comes first among the descending pair on
 * purpose: PUBLIC_VIOLENCE raises the first GOOD_LOW in array order, and a
 * shove on an open-air walkway is above all something the building, the class
 * chat and Kenta will hear about. Her Guard drains on its own with time spent
 * together, and rises when the player uses the past, or her bag, against her.
 *
 * Pilot conventions (Skill: ERROR): exported raw, null asset keys, no
 * `openingPanel` and no `prologue` until the art exists, `publishedAt: null`
 * until a drop dates it.
 */

const raw = {
  id: 'sv_one_week_she_said_1',
  storyId: 'story_one_week_she_said',
  version: 1,
  title: 'One Week, She Said',
  fantasyLabel: 'Your school bully. Your sofa. One week.',
  hook: 'The woman who made your final year of school a misery is standing at your door in the rain, eight years later, with a duffel bag, a cat and nowhere else to go. One week, she says.',
  premise:
    'Eight years ago, in your final year of school, Mika Arai decided you were the joke. She named you Footnote, because you were quiet and at the bottom of every page and anyone could skip you. She read your notebook aloud to the class and made sure they laughed. You ate lunch on the back stairs for the rest of that year, and you have not said her name since.\n\n' +
    'Tonight it is raining, it is twenty to midnight, and she is standing at the door of your one-bedroom apartment in the city. Soaked through. A duffel bag at her feet, an old cat in a carrier, and the last bus already gone.\n\n' +
    'Three days ago she walked out on her fiancé. Everything was in his name: the apartment, the account, the locked drawer with her ID card in it. She has a studio of her own from next Sunday, as long as she gets that card back before the agency closes on Friday. Until then she has nowhere that takes a cat.\n\n' +
    'So she is asking you, of all people, for one week on your sofa.\n\n' +
    'What happens next is yours. Close the door in her face. Let her in and make her earn every night. Let her in and never mention school. Make her say what she did, out loud, before Saturday’s class reunion, where everyone who laughed will be watching.\n\n' +
    'One week, she said. It sounded like a promise. It is also a deadline.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Slice of life', 'Modern', 'Comedy', 'Drama'],
  mechanicsChips: [
    'Seven nights, one sofa',
    'Forgive, forget or get even',
    'She can say no too',
    'A reunion on Saturday',
    'Her ex wants her back',
  ],
  contentDescriptors: ['ROMANCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend this whole week being polite to her, and that is a real way to play it. You can also make her pay, make her say it, or make her breakfast. Mika is not waiting to be forgiven and she is not going to ask. She knocked on your door because it was the last one left, and what happens on your side of it is yours.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'apartment_2c',
    startWorldMinute: 23 * 60 + 40,
    startingItems: [{ itemId: 'spare_key', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-six. Mika Arai is twenty-six, Jun Kuroda twenty-seven, Aya twenty-nine, Kenta Yasuda thirty, Daisuke Ueno twenty-six and Mrs. Tamura seventy-one. What happened between the player and Mika happened in the final year of school, eight years ago, when the player, Mika and Daisuke were all eighteen.',
      'That year Mika named the player Footnote, read their notebook aloud to the class, and made sure everybody laughed. She tore one page out of the notebook and kept it. The player ate lunch on the back stairs for the rest of the year, and a photograph of them there went round the whole school. The two of them have not spoken since graduation.',
      'The story opens at twenty to midnight on a wet Saturday. Mika is at the door of the player’s one-bedroom apartment, 2C, on the second floor of Hinode Court, an old two-storey walk-up with an open-air walkway. She has a duffel bag and her cat, an old grey tom called Udon, in a carrier. The last bus has just left.',
      'Three days ago Mika ended her engagement to Kenta Yasuda and left his apartment, 1406 in Harbourline Tower on the waterfront. The apartment, the joint account and the lease were all in his name. Her ID card, bank book, insurance papers and her grandmother’s ring are in a blue folder in a locked drawer in his study.',
      'Mika has a ground-floor studio of her own across the city from next Sunday at ten, in a building that allows cats. The letting agent needs a copy of her ID card by five o’clock on Friday or the lease goes to the next name on the list. She paid the deposit in cash from her own half of the wedding fund, which Kenta is telling their friends she stole.',
      'Kenta has never hit anyone and will not. He never raises his voice. He does his damage with money, paperwork and other people’s opinions, and he would like nothing better than for the player to lose their temper with him in front of witnesses.',
      'Mika works the early shift on the front desk of a business hotel by the station. She has promised not to bring up the past unless the player does, and she keeps that promise. She will not ask for anything twice.',
      'Aya is the player’s older sister and runs a two-chair salon across the river. Mika has been her client for a year. Mika will not say who gave her the player’s address.',
      'The eight-year class reunion is next Saturday at seven, upstairs at The Red Lantern, a yakitori bar two streets past the station. Daisuke Ueno is organising it, is showing a slideshow of old photographs at nine, and has put both the player and Mika on the list.',
      'Hinode Court has a no-pets clause. Mrs. Tamura, the landlady, lives in 1A on the ground floor and sweeps the walkway at half past five every morning.',
      'Mika is not a prize and cannot be won, and she is not owed forgiveness. She can be hurt, refuse, leave early, or go back to Kenta. Romance, if it happens, is slow and adult and goes no further on the page than a kiss.',
      'Nothing supernatural happens in this story. It is one week in an ordinary city.',
    ],
    toneGuide:
      'Comedy of close quarters with a real injury underneath it. One bathroom, one umbrella, one sofa, a cat who has chosen the player, and a woman trying very hard to take up no space at all. ' +
      'Let the jokes land, and let the past arrive in small physical things: a nickname, a notebook, a staircase, a photograph. Nobody makes speeches. Mika never asks to be forgiven and never explains herself unprompted, so whether the past gets said is the player’s call. ' +
      'Cruelty is allowed and has consequences: if the player makes her pay, she pays, quietly, and the apartment gets colder and smaller. A lie has to be kept up in front of people who talk to each other. If the player shoves or hits anybody it happens quickly, with no injury detail, and the cost is social and legal: Mrs. Tamura calls the police, the class chat hears, Mika goes very still, and Kenta smiles. ' +
      'If the player wanders off, the week carries on without them and they come home to what happened. Romance is slow and adult, built out of small kindnesses and good arguments, and goes no further than a kiss. The face at the top of a beat is Mika’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Mika has cleaned your bathroom.\n\nNot tidied. Cleaned. The grout is a colour you did not know it came in.\n\n\"It’s rent,\" she says from the kitchen, before you can open your mouth. \"It isn’t enough rent. I’m aware.\"\n\nThe cat is asleep on your pillow.\n\n\"He’s not rent,\" she adds. \"He’s a separate problem.\"",
      "Kenta Yasuda takes his time on the stairs.\n\n\"You must be the friend from school.\" He offers his hand. It is a very warm hand. \"I’m not here to cause trouble. I only want to know she’s eating.\"\n\nBehind you, the door of 2C is open an inch.\n\nOn the other side of it, Mika has stopped breathing.\n\n\"Thursday,\" Kenta says, smiling at you rather than the door. \"Eight o’clock. She knows where her things are.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 11, presence: 10, resolve: 11, arcana: 8 },
  skills: [
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing while it can still change something.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Keeping your voice level when eight years come up through the floor.' },
    { id: 'attention', name: 'Attention', attribute: 'mind', description: 'What changed in a room, and what she is not saying while she says something else.' },
    { id: 'paperwork', name: 'Paperwork', attribute: 'mind', description: 'Leases, bank counters, ward-office queues, and the clause somebody hoped you would skim.' },
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'Feeding two people properly out of a fridge stocked for one.' },
    { id: 'legwork', name: 'Legwork', attribute: 'might', description: 'Stairs, boxes, and fourteen floors when the lift wants a card you do not have.' },
    { id: 'nerve', name: 'Nerve', attribute: 'agility', description: 'Lying to a concierge, bluffing a landlady, walking into a room that used to laugh at you.' },
    { id: 'warmth', name: 'Warmth', attribute: 'presence', description: 'Being easy to share a small apartment with on a bad day.' },
    { id: 'recall', name: 'Memory', attribute: 'arcana', description: 'Remembering exactly how it went, word for word, and noticing where her version is different.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is the honest restorable one: a week of broken sleep on one side of
   * a thin wall and a job on the other. It is also what the generic cost path
   * spends, which is right, because the price of a bad evening here is that
   * there is less of you left for the next one.
   *
   * Gossip and Her Guard are descending. Gossip is first in the array because
   * public violence takes the first GOOD_LOW, and in this world the first
   * consequence of a scene on the walkway is that people hear about it. Her
   * Guard has a negative regen so living together lowers it on its own, and it
   * is raised by the abilities that use the past, or her bag, against her.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 50,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Everything the player says comes out shorter and harder than they meant it. Mika notices and makes herself smaller, which makes it worse, which both of them can see happening.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing after a week of broken sleep. The player snaps, misses jokes, agrees to things to end conversations, and is one comment away from saying something they cannot take back. Sleep is the correct move, and the sofa is taken.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a work week with somebody else in the bathroom at six. Fine for one more conversation and honest about not wanting two. Good for takeaway on the floor, bad for a reunion.',
        },
        {
          upTo: 100,
          behaviour:
            'Rested enough to be patient, curious and funny on purpose. The player can sit through the hard conversation without reaching for the easy line, and has time to cook something that takes an hour.',
        },
      ],
    },
    {
      id: 'gossip',
      name: 'Gossip',
      max: 100,
      start: 10,
      regenPerHour: 0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody outside 2C has any idea. The building thinks the player is quiet, the class chat is arguing about seating, and Kenta is guessing.',
      color: '#C9A0DC',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody outside the apartment knows. Mrs. Tamura suspects an animal, the class chat is about the seating plan, and Kenta is guessing. The two of them can walk to the convenience store together as strangers who happen to share a doorway.',
        },
        {
          upTo: 50,
          behaviour:
            'Somebody has seen something. Jun has questions, a neighbour said good morning to Mika by name, and the class chat has a thread nobody admits to starting. Every outing together is noticed and repeated with one detail wrong.',
        },
        {
          upTo: 80,
          behaviour:
            'It is out. Kenta knows the building, the class chat has a theory with the player’s name in it, and the office kitchenette goes quiet when they walk in. Every public scene has an audience that is half there to report back.',
        },
        {
          upTo: 100,
          behaviour:
            'Everybody has a version and none of them is true. Daisuke has mentioned it into a microphone. Kenta has told it his way to people who matter to him. Whatever the player does in public is now a statement, read by thirty-four classmates and one landlady.',
        },
      ],
    },
    {
      id: 'guard',
      name: 'Her Guard',
      max: 100,
      start: 75,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'She has stopped bracing altogether: shoes kicked off any old way, an opinion about the thermostat, laughing without checking the player’s face first.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 25,
          behaviour:
            'She has stopped bracing. Her toothbrush lives in the player’s cup, she argues about the thermostat, and she laughs with her mouth open without checking anybody’s face afterwards. She volunteers things about herself, including the bad ones.',
        },
        {
          upTo: 55,
          behaviour:
            'Careful but present. She sits on the same side of the low table, accepts a second cup of tea, tells a story about the hotel. When school comes up she does not leave the room; she goes very still and answers exactly what was asked.',
        },
        {
          upTo: 80,
          behaviour:
            'Small and useful. Up first, out quietly, dishes done before anyone noticed there were dishes. She thanks the player for everything in a voice with no edges and apologises for taking up space in a room they are both standing in.',
        },
        {
          upTo: 100,
          behaviour:
            'Packed and by the door. The duffel is zipped at all times, her shoes face outward in the entryway, and she answers every question as if it might be the last one before she is told to go. One wrong word and she is out on the walkway with the cat.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'spare_key',
      name: 'The Spare Key',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'The second key to 2C, on your own key ring since the day you signed the lease. Nobody has ever had it. Aya has asked for it twice.',
      loreText: 'Giving it to somebody would make them the first person who could let themselves into your life without knocking.',
      icon: 'key',
    },
    {
      id: 'reunion_postcard',
      name: 'The Reunion Postcard',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A glossy postcard held to your fridge with a magnet: the eight-year class reunion, next Saturday at seven, upstairs at The Red Lantern, answers to Daisuke by Wednesday. Across the bottom, in marker: "Hope to see you, Footnote!"',
      loreText: 'You have not thrown it away. You have not answered it. It has been on the fridge for five weeks and you read it every morning while the kettle boils.',
      icon: 'letter',
    },
    {
      id: 'torn_page',
      name: 'The Torn Page',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'A notebook page folded into eighths until it went soft as cloth. Pencil: rain on a window, drawn from the inside, every drop.',
      loreText: 'Your drawing. The day she read your notebook to the class she tore this page out and kept it, and she has carried it through four apartments without ever deciding why.',
      icon: 'papers',
    },
    {
      id: 'blue_folder',
      name: 'The Blue Folder',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A blue plastic document folder: her ID card, her bank book, her insurance papers, and a small velvet box with her grandmother’s ring in it.',
      loreText: 'Second drawer of the desk in Kenta’s study, which he keeps locked. The letting agent needs a copy of the card by five o’clock on Friday or the studio goes to the next name on the list.',
      icon: 'papers',
    },
    {
      id: 'lease_papers',
      name: 'The Studio Lease',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'An application for a ground-floor studio across the city, cats allowed, approved pending one document. Keys next Sunday at ten. Deposit paid in cash.',
      loreText: 'Kenta calls that cash "the money she took". The receipt in the envelope says it was exactly half of a joint wedding fund, to the coin.',
      icon: 'papers',
    },
    {
      id: 'slideshow_drive',
      name: 'The Slideshow Drive',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A red USB stick on Daisuke’s key ring with the reunion slideshow on it: two hundred and ten photographs from your final year, set to music.',
      loreText: 'Slide thirty-one is the photograph of you eating lunch alone on the back stairs. Daisuke thinks it is the funniest one.',
      icon: 'tools',
    },
    {
      id: 'mika_duffel',
      name: 'Her Duffel Bag',
      tags: ['personal'],
      description: 'Everything she got out with: three days of clothes, two hotel uniform blouses, a phone charger, a framed photograph turned face down, and an envelope of cash with a running total on the back.',
      loreText: 'The running total is what she owes you for the week, worked out before she has spent a single night.',
      icon: 'bag',
    },
    {
      id: 'mika_phone',
      name: 'Her Cracked Phone',
      tags: ['personal', 'document'],
      skillModifiers: { attention: 1 },
      description: 'A scratched silver phone with a crack across one corner, face down on your low table, lighting up every few minutes. Forty-one messages from one name since Wednesday.',
      loreText: 'Under the settings there is a location share, set up two years ago on her birthday "for safety", that she has not thought about since. It still has one person on it.',
      icon: 'phone',
    },
    {
      id: 'old_notebook',
      name: 'Your Old Notebook',
      tags: ['personal'],
      skillModifiers: { recall: 2 },
      description: 'A notebook from your final year of school, in a box on top of your wardrobe. Half maths, half drawings. Near the back, a stub where a page was torn out.',
      loreText: 'You never threw it away. You have not opened it in eight years.',
      icon: 'book',
    },
    {
      id: 'appointment_book',
      name: 'Aya’s Appointment Book',
      tags: ['document'],
      description: 'A paper diary on the salon counter in Aya’s handwriting. One name comes round every six weeks for a year: M. Arai, cut and colour, Tuesdays.',
      loreText: 'Last Tuesday’s page has a note in the margin, underlined twice: "asked about you again".',
      icon: 'book',
    },
    {
      id: 'arrears_letters',
      name: 'Kenta’s Unopened Post',
      tags: ['document'],
      description: 'A stack of envelopes on the console table in 1406, squared off neatly, the top three stamped FINAL NOTICE in red.',
      loreText: 'He is two months behind on the apartment, in the tower where he sells apartments for a living.',
      icon: 'letter',
    },
    {
      id: 'cat_food_bag',
      name: 'The Bag of Cat Food',
      tags: ['personal'],
      description: 'A half-empty bag of dry cat food hidden in the landlady’s shoe cupboard, in a building with a no-pets clause.',
      loreText: 'Four strays behind the bins have been eating out of it for years. Nobody in Hinode Court is supposed to know.',
      icon: 'bag',
    },
    {
      id: 'umbrella',
      name: 'The One Umbrella',
      tags: ['home'],
      description: 'Clear plastic, one bent rib, the only umbrella in 2C.',
      loreText: 'There is exactly one, it rains on four days this week, and one of you is going to have to share.',
      icon: 'umbrella',
    },
    {
      id: 'canned_coffee',
      name: 'Canned Coffee',
      tags: ['consumable'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'energy', amount: 15, consumesItem: true },
      description: 'Hot canned coffee from the vending machine on the walkway or the convenience store in the arcade. Sweet, brown, and enough.',
      loreText: 'The vending machine by the stairs only sells it hot from October. Nobody has ever seen it change.',
      icon: 'mug',
    },
  ],
  abilities: [
    {
      id: 'say_it_plain',
      name: 'Say It Plain',
      tags: ['social'],
      description: 'Tell somebody the true thing without dressing it up, and take whatever comes back.',
      affordances: ['tell her the truth', 'say it', 'be honest', 'tell her how i feel', 'come clean', 'admit it', 'say what i think'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'name_what_she_did',
      name: 'Name What She Did',
      tags: ['social'],
      description: 'Put the past on the table in exact words: the nickname, the notebook, the back stairs. Then wait.',
      affordances: ['bring up the past', 'bring up school', 'make her say it', 'ask her why she did it', 'confront her', 'talk about footnote', 'remind her what she did'],
      costs: [{ resourceId: 'energy', amount: 9 }, { resourceId: 'guard', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'recall', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_the_peace',
      name: 'Keep the Peace',
      tags: ['social'],
      description: 'Let it go for tonight. Be polite, change the subject, keep the evening pleasant for both of you.',
      affordances: ['change the subject', 'let it go', 'be polite', 'keep it light', 'say nothing about it', 'smooth it over', 'pretend it is fine'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'set_the_rules',
      name: 'Set the Rules',
      tags: ['social'],
      description: 'Lay down the terms of the week: where she sleeps, who showers when, what the cat may touch, and the day she goes.',
      affordances: ['set some rules', 'lay down the rules', 'set terms', 'tell her the rules', 'make a deal', 'set conditions', 'let her in on conditions'],
      costs: [{ resourceId: 'energy', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'shut_the_door',
      name: 'Shut the Door',
      tags: ['social'],
      description: 'Say no and close it, and mean it for as long as you can.',
      affordances: ['shut the door', 'close the door', 'say no', 'send her away', 'turn her away', 'refuse her', 'tell her to go'],
      costs: [{ resourceId: 'energy', amount: 3 }, { resourceId: 'guard', amount: 25 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_her',
      name: 'Read Her',
      tags: ['sight'],
      description: 'Work out what she means from what she is doing with her hands while she says it.',
      affordances: ['watch her', 'read her', 'look closer', 'notice', 'study her', 'look around', 'look at her hands'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'attention', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'look_through_her_things',
      name: 'Go Through Her Things',
      tags: ['sight'],
      description: 'Open the duffel, check the phone, read the papers she keeps face down. She will be able to tell.',
      affordances: ['go through her bag', 'search her things', 'look in her bag', 'check her phone', 'snoop', 'read her messages'],
      costs: [{ resourceId: 'energy', amount: 4 }, { resourceId: 'guard', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_for_two',
      name: 'Feed the Household',
      tags: ['utility'],
      description: 'Make something real out of a fridge stocked for one, and put it in front of somebody.',
      affordances: ['cook', 'make dinner', 'make breakfast', 'feed her', 'make tea', 'order food', 'cook for two'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'do_the_paperwork',
      name: 'Do the Paperwork',
      tags: ['utility'],
      description: 'Fill the form, read the clause, find the setting, ring the right office in the right order.',
      affordances: ['do the paperwork', 'read the lease', 'check her phone settings', 'fill in the forms', 'call the bank', 'go to the ward office', 'replace her documents'],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'paperwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'haul_it',
      name: 'Haul It',
      tags: ['utility'],
      description: 'Carry the boxes, the duffel, the cat and if necessary the person, up whatever stairs there are.',
      affordances: ['carry it', 'carry the boxes', 'help her move', 'lift it', 'carry her bag', 'take the stairs', 'move her things'],
      costs: [{ resourceId: 'energy', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'legwork', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bluff_it',
      name: 'Bluff Your Way',
      tags: ['social'],
      description: 'Say the confident untrue thing to whoever is in the way, and hold their eye while you do.',
      affordances: ['lie', 'bluff', 'make something up', 'cover for her', 'talk our way in', 'say she is my cousin', 'pretend'],
      costs: [{ resourceId: 'energy', amount: 7 }, { resourceId: 'gossip', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_it_over_her',
      name: 'Hold It Over Her',
      tags: ['social'],
      description: 'Remind her whose apartment this is and what she owes, and make sure she feels it.',
      affordances: ['make her beg', 'threaten to throw her out', 'hold it over her', 'make her pay', 'humiliate her', 'get even', 'call her what she called me'],
      costs: [{ resourceId: 'energy', amount: 5 }, { resourceId: 'guard', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_it_public',
      name: 'Make It Public',
      tags: ['social'],
      description: 'Tell the class chat, the building or the room exactly what happened, in your own words, and let it travel.',
      affordances: ['post it', 'tell the class', 'tell everyone', 'make it public', 'expose her', 'expose him', 'put it in the group chat'],
      costs: [{ resourceId: 'energy', amount: 8 }, { resourceId: 'gossip', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_with_it',
      name: 'Stay In It',
      tags: ['social'],
      description: 'Do not fix it, do not explain it, do not leave the room. Sit down and be there while she talks.',
      affordances: ['stay', 'sit with her', 'say nothing', 'wait', 'just be there', 'listen', 'let her talk'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'face_kenta',
      name: 'Stand Between Them',
      tags: ['social'],
      description: 'Put yourself politely and immovably between Mika and the man who wants her back, and do not lose your temper.',
      affordances: ['stand between them', 'face kenta', 'tell kenta to leave', 'confront kenta', 'stand up to him', 'get her folder back', 'tell him no'],
      costs: [{ resourceId: 'energy', amount: 12 }, { resourceId: 'gossip', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:about_kenta'],
        lockedCopy: 'You do not know what you would be standing between. She has not told you who she left, and you have not asked.',
      },
    },
  ],
  locations: [
    {
      id: 'apartment_2c',
      name: 'Apartment 2C',
      shortName: 'Your Place',
      description:
        'Your one-bedroom on the second floor: an entryway barely wide enough for two pairs of shoes, a kitchen strip with a two-ring hob, a main room with a low table and a sofa that folds out into a bad bed, a bedroom door that does not lock, one bathroom, and a balcony just wide enough for the washing machine. Everything here was arranged for one person, and it shows.',
      artDirection:
        'Small modern one-bedroom apartment at night, a narrow entryway with shoes, a kitchen strip, a low table and a fold-out sofa, rain on the balcony glass, warm lamp light. Tidy, single, slightly bare.',
      connections: [{ to: 'the_walkway', travelMinutes: 1, label: 'Out of the front door' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'reunion_postcard', qty: 1, ownerId: null, aka: ['postcard', 'the reunion card', 'the invitation', 'the card on the fridge'] },
        { itemId: 'old_notebook', qty: 1, ownerId: null, aka: ['notebook', 'my old notebook', 'the old notebook', 'the box on the wardrobe'] },
        { itemId: 'umbrella', qty: 1, ownerId: null, aka: ['umbrella', 'the umbrella', 'the clear umbrella'] },
        { itemId: 'mika_duffel', qty: 1, ownerId: 'mika', aka: ['duffel', 'her bag', 'the duffel bag', 'her duffel'] },
        { itemId: 'mika_phone', qty: 1, ownerId: 'mika', aka: ['her phone', 'the cracked phone', 'mika’s phone'] },
        { itemId: 'lease_papers', qty: 1, ownerId: 'mika', aka: ['lease', 'the lease', 'her papers', 'the studio papers'] },
        { itemId: 'torn_page', qty: 1, ownerId: 'mika', aka: ['the folded page', 'the page', 'the torn page', 'the drawing'] },
      ],
    },
    {
      id: 'the_walkway',
      name: 'The Outside Walkway',
      shortName: 'Walkway',
      description:
        'The open-air corridor along the second floor of Hinode Court, with a concrete stair at each end and a railing that drips when it rains. Eight doors, eight letterboxes down at the bottom, a vending machine by the stairs that sells hot drinks, and a clear view of the bus stop across the road.',
      artDirection:
        'Old two-storey Japanese walk-up apartment building at night in the rain, an open-air second-floor walkway, numbered doors, a dripping railing, a glowing vending machine by the stairs, a bus stop under a streetlight across the road.',
      connections: [
        { to: 'apartment_2c', travelMinutes: 1, label: 'Your door' },
        { to: 'tamura_flat', travelMinutes: 1, label: 'Down the stairs to 1A' },
        { to: 'the_arcade', travelMinutes: 4, label: 'Across the road and into the arcade' },
        { to: 'the_riverbank', travelMinutes: 6, label: 'Down the side street to the river' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'tamura_flat',
      name: 'Mrs. Tamura’s Rooms, 1A',
      shortName: '1A',
      description:
        'The landlady’s ground-floor rooms: a hallway of polished shoes, a kitchen that smells of broth, a spare room kept made up for a son who never visits, a framed copy of the house rules by the door, and a shoe cupboard she does not like people opening.',
      artDirection:
        'Neat old-fashioned ground-floor apartment interior, polished shoes in a row, a framed list of house rules, a small kitchen with a pot on the stove, a made-up spare room through a sliding door. Warm, orderly, a little lonely.',
      connections: [{ to: 'the_walkway', travelMinutes: 1, label: 'Back up the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'cat_food_bag', qty: 1, ownerId: 'tamura', aka: ['cat food', 'the cat food', 'the bag in the shoe cupboard'] },
      ],
    },
    {
      id: 'the_arcade',
      name: 'Kitamachi Arcade',
      shortName: 'The Arcade',
      description:
        'A covered shopping street running from your road to the station: a convenience store that never closes, a laundromat with one good dryer, a ramen counter with Jun’s apartment above it, a business hotel with its front desk just inside the automatic doors, and the bus stop at the near end where the last bus leaves at twenty to midnight.',
      artDirection:
        'Covered Japanese shopping arcade at night, a bright convenience store, a laundromat, a ramen counter with a red curtain, the glass doors of a small business hotel, wet tiles reflecting shop lights. Busy, ordinary, densely detailed.',
      connections: [
        { to: 'the_walkway', travelMinutes: 4, label: 'Back across the road home' },
        { to: 'the_riverbank', travelMinutes: 5, label: 'Out of the far end to the river' },
        { to: 'the_office', travelMinutes: 25, label: 'The train to work' },
        { to: 'aya_salon', travelMinutes: 18, label: 'The bus across the river to Aya’s' },
        { to: 'kenta_tower', travelMinutes: 22, label: 'The train to the waterfront towers' },
        { to: 'the_izakaya', travelMinutes: 10, label: 'Two streets past the station' },
        { to: 'the_new_studio', travelMinutes: 30, label: 'The train out to the new studio' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'canned_coffee', qty: 3, ownerId: null, aka: ['coffee', 'canned coffee', 'a can of coffee', 'hot coffee'] },
      ],
    },
    {
      id: 'the_riverbank',
      name: 'The River Embankment',
      shortName: 'The River',
      description:
        'A long concrete embankment with a running path, a row of bare cherry trees, a set of steps down to the water, and a bench under the railway bridge where nobody can hear you over the trains. Mika runs here in the dark before her shift.',
      artDirection:
        'City river embankment at dawn, a running path, bare trees, concrete steps to the water, a bench under a railway bridge, a train passing overhead. Cold blue light, quiet, wide.',
      connections: [
        { to: 'the_walkway', travelMinutes: 6, label: 'Back up the side street home' },
        { to: 'the_arcade', travelMinutes: 5, label: 'Along to the arcade' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_office',
      name: 'Tsubame Logistics, Fourth Floor',
      shortName: 'The Office',
      description:
        'The open-plan floor of a freight company that moves other people’s furniture across the country: forty desks, a whiteboard of delivery routes, a manager in a glass box, a kitchenette fridge that is a crime scene, and your desk by the window with Jun’s mess spilling onto it.',
      artDirection:
        'Open-plan office floor in a mid-sized freight company, rows of desks, a whiteboard of routes and dates, a glass-walled manager’s office, a window desk with two monitors and a colleague’s clutter creeping onto it. Fluorescent, busy, ordinary.',
      connections: [{ to: 'the_arcade', travelMinutes: 25, label: 'The train home' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'aya_salon',
      name: 'Aya’s Salon',
      shortName: 'The Salon',
      description:
        'Two chairs, one basin, a radio tuned to a station nobody else likes, a wall of photographs of haircuts Aya is proud of, and a back room with a kettle and a sofa where she does her accounts and her worrying. Her own apartment is up the outside stairs. The waterfront towers are a ten-minute walk along the river.',
      artDirection:
        'Small stylish two-chair hair salon, mirrors and warm bulbs, a wall of photographs, a radio on a shelf, a paper appointment diary on the counter, a back room with a sofa. Personal, cluttered, lively.',
      connections: [
        { to: 'the_arcade', travelMinutes: 18, label: 'The bus back across the river' },
        { to: 'kenta_tower', travelMinutes: 12, label: 'Walk along the water to the towers' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [
        { itemId: 'appointment_book', qty: 1, ownerId: 'aya', aka: ['appointment book', 'the diary', 'her bookings', 'the book on the counter'] },
      ],
    },
    {
      id: 'kenta_tower',
      name: 'Harbourline Tower',
      shortName: 'The Tower',
      description:
        'A new glass apartment tower on the waterfront, with a show-suite on the ground floor where Kenta sells the units upstairs, a lobby with a concierge desk and a night concierge who likes him, and lifts that need a key card past the third floor.',
      artDirection:
        'Sleek glass residential tower lobby on a waterfront at night, a marble concierge desk, a bright show-suite behind glass, lifts with card readers, harbour lights outside. Expensive, polished, cold.',
      connections: [
        { to: 'the_arcade', travelMinutes: 22, label: 'The train back' },
        { to: 'aya_salon', travelMinutes: 12, label: 'Walk along the water to Aya’s' },
        { to: 'unit_1406', travelMinutes: 2, lockedByFlag: 'way_into_1406', label: 'Up to the fourteenth floor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 4 },
      takeableItems: [],
    },
    {
      id: 'unit_1406',
      name: 'Apartment 1406',
      shortName: '1406',
      description:
        'Kenta’s fourteenth-floor apartment: white walls, a harbour view, nothing out of place, and every trace of Mika boxed and taped in the spare room with her name on the boxes in his neat handwriting. Her blue folder is in the second drawer of the desk in his study, which he keeps locked. The post on the console table is squared off and unopened.',
      artDirection:
        'Minimal high-rise apartment at night, white walls, floor-to-ceiling windows over a harbour, taped cardboard boxes stacked in a spare room, a locked desk in a study. Immaculate and airless.',
      connections: [{ to: 'kenta_tower', travelMinutes: 2, label: 'Back down to the lobby' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: 4 },
      takeableItems: [
        { itemId: 'blue_folder', qty: 1, ownerId: 'mika', aka: ['folder', 'the blue folder', 'her documents', 'her id card'] },
        { itemId: 'arrears_letters', qty: 1, ownerId: 'kenta', aka: ['post', 'the letters', 'the envelopes', 'his post'] },
      ],
    },
    {
      id: 'the_izakaya',
      name: 'The Red Lantern',
      shortName: 'The Lantern',
      description:
        'A yakitori bar two streets past the station with a long upstairs room Daisuke has booked for the eight-year class reunion: thirty cushions, a projector pointed at a sliding door, and a counter downstairs where Daisuke holds court every night this week.',
      artDirection:
        'Busy yakitori bar at night, a red paper lantern over the door, smoke from a grill, a long upstairs room with low tables and cushions, a projector beam on a sliding paper door. Warm, loud, crowded.',
      connections: [{ to: 'the_arcade', travelMinutes: 10, label: 'Back toward the station' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'slideshow_drive', qty: 1, ownerId: 'daisuke', aka: ['usb stick', 'the drive', 'the slideshow', 'the usb'] },
      ],
    },
    {
      id: 'the_new_studio',
      name: 'The New Studio',
      shortName: 'Her Studio',
      description:
        'A ground-floor studio across the city in a building with a cats-welcome sign on the door: one room, a kitchenette, a sliding door onto a strip of garden, and a letting agent who will hand over a key on a paper tag next Sunday at ten if the paperwork is complete by five on Friday.',
      artDirection:
        'Empty ground-floor studio apartment on a bright morning, bare floor, a kitchenette, a sliding glass door onto a small strip of garden, a key on a paper tag held out in a doorway. Fresh, hopeful, unfurnished.',
      connections: [{ to: 'the_arcade', travelMinutes: 30, label: 'The long train back' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
  ],
  /**
   * Order matters: PUBLIC_VIOLENCE drops the first faction in the array, and
   * a scene on an open-air walkway reaches the landlady before anybody else.
   */
  factions: [
    {
      id: 'faction_hinode',
      name: 'Hinode Court',
      description:
        'Eight units, one landlady, and house rules typed the year the building went up. The tenants know each other by their rubbish and their footsteps, and anything that happens on the walkway is known in 1A within the hour.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'The quiet one in 2C' },
        { atReputation: 35, label: 'A good neighbour' },
        { atReputation: 60, label: 'Family, practically' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_class',
      name: 'The Class Chat',
      description:
        'Thirty-four classmates from your final year of school in one group chat that slept for eight years and woke up last month for the reunion. Most of them laughed along back then. A few have spent eight years wishing they had not. All of them read everything.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Footnote' },
        { atReputation: 30, label: 'The one who turned out fine' },
        { atReputation: 55, label: 'The one everyone wants to talk to' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_tsubame',
      name: 'Tsubame Logistics',
      description:
        'Your employer: a freight firm of forty desks where you are known as the person who quietly fixes things. A manager who notices lateness, a quarterly review on Friday morning, and Jun.',
      startingReputation: 40,
      ranks: [
        { atReputation: 0, label: 'Still new, somehow' },
        { atReputation: 40, label: 'Reliable' },
        { atReputation: 65, label: 'In line for team lead' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'mika',
      name: 'Mika Arai',
      role: 'The classmate who made your final year of school a misery, now soaked on your doorstep asking for seven nights',
      cardBlurb:
        'Eight years ago she made you the joke of the whole class. Tonight she has a duffel bag, an old cat, no home and one request, and she has promised never to mention the past unless you do.',
      pronouns: 'she/her',
      publicTraits: [
        'Dry and quick, and quicker when cornered',
        'Pays for everything she can and keeps a written list of what she cannot',
        'Cleans when she is anxious, which this week is always',
      ],
      hiddenDrives: [
        'She knocked on your door because you are the one person she is certain owes her nothing, and part of her wants to be told no by somebody who has the right',
        'She wants to be someone who can stand in a room with what she did without excusing it and without drowning in it',
      ],
      values: ['Paying debts to the last coin, in money and otherwise', 'Never asking for anything twice'],
      fears: [
        'That she is exactly who she was at eighteen and has only got better at hiding it',
        'Going back across the river to Kenta because it is easier than this',
        'Being forgiven too fast, because then it will not count',
      ],
      socialStyle:
        'Makes herself small and useful: up first, dishes done, bathroom wiped, shoes lined up in your entryway. When she is cornered the old edge comes back for half a sentence, and she hears it, and stops.',
      boundaries: [
        'Will not ask for anything twice. Once you have said no to something it is gone from her vocabulary',
        'Will not discuss Kenta in front of anybody but you',
        'Will not cry in front of you. She leaves the room first, every time, until the time she does not',
        'Will not let you be kind about the past before she has said it properly',
      ],
      goals: [
        'Get the blue folder out of Kenta’s apartment before the letting agency closes on Friday',
        'Be out of your life by next Sunday at ten with nothing owed in either direction',
        'Say the thing she owes you, if you will let her, before the reunion says it for her',
      ],
      secrets: [
        {
          id: 'mika_the_page',
          fact: 'She still has the page she tore out of your notebook the day she read it to the class: a pencil drawing of rain on a window. It is folded into eighths in the inner pocket of her duffel, and she has carried it through four apartments.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She gives it back herself, without a speech, if you have heard her apology to the end. Or you find it, if you go through her bag.',
        },
        {
          id: 'mika_who_sent_her',
          fact: 'Aya, your older sister, has cut her hair every six weeks for a year. Tonight, from the bus stop, Mika messaged Aya that she had nowhere to go, and Aya sent her your address. Mika promised Aya she would not tell you.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will not give Aya up under any pressure. She stops denying it only if you have already worked it out and say so to her face.',
        },
        {
          id: 'mika_that_year',
          fact: 'The year she picked on you, her father’s shop had gone under and her family was living in two rooms above a relative’s garage. She chose the quietest person in the class because controlling something felt like air. She has never said this out loud, because it sounds like an excuse, and she has decided that it is one.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after she has apologised without it. If she starts to use it to explain herself, she stops halfway and takes it back.',
        },
      ],
      speechStyle:
        'Short sentences with the corners filed off. Polite to the point of formality with you, because anything casual feels like a liberty. Dry jokes at her own expense. When the old cutting register slips out it lasts half a sentence and she corrects herself out loud.',
      topics: ['the blue folder', 'Kenta', 'the new studio', 'the cat', 'what happened at school', 'the reunion', 'the hotel'],
      voiceSamples: [
        'I know I don’t get to ask. I’m asking anyway, which should tell you how my week is going.',
        'I scrubbed the bathroom. Don’t thank me. It’s rent, and it isn’t enough rent.',
        'I picked Footnote because it was clever and I knew it would stick. I was proud of it. That’s the part I can’t get past.',
        'Kenta never shouted once. He’d smile, move the money, and ask why I was being difficult.',
        'Say it. Whatever it is. I thought worse about myself on the bus here.',
      ],
      appearance:
        'An adult woman of medium height, a sharp chin, dark straight hair cut bluntly at the jaw and still wet, a man’s oversized navy parka over a white hotel-uniform blouse, a scratched silver phone with a cracked screen, and a battered grey cat carrier she holds like the last thing she owns.',
      visualHook: 'A man’s navy parka three sizes too big with the sleeves rolled four times, the only coat she grabbed on the way out.',
      silhouette: 'Shoulders up, cat carrier held in both arms against her chest, standing just outside the doorframe as if the step were a line.',
      artSeed: 'owss-mika-01',
      portrait: null,
      expressions: ['neutral', 'guarded', 'wry', 'sorry', 'stung', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'apartment_2c', activity: 'on the fold-out sofa, awake more than she lets on' },
        { startMinute: 330, endMinute: 400, locationId: 'the_riverbank', activity: 'running the embankment in the dark because she cannot lie still' },
        { startMinute: 400, endMinute: 420, locationId: 'apartment_2c', activity: 'showered, dressed and out of the bathroom before you are up' },
        { startMinute: 420, endMinute: 900, locationId: 'the_arcade', activity: 'on the front desk of the business hotel by the station, smiling for a living' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_arcade', activity: 'at the laundromat, everything she owns going round in one machine' },
        { startMinute: 1080, endMinute: 1440, locationId: 'apartment_2c', activity: 'cooking for two in a kitchen built for one, then pretending to read' },
      ],
      homeLocationId: 'apartment_2c',
      knowledgeScope: ['mika', 'kenta', 'the_blue_folder', 'the_new_studio', 'school', 'the_reunion', 'aya_salon', 'the_cat'],
      startingRelationship: { trust: 15, affection: 10, respect: 25, fear: 20, rivalry: 5 },
      gates: [
        {
          id: 'mika_says_it_properly',
          label: 'She apologises properly, with no excuse attached',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['week_begun'] },
        },
        {
          id: 'mika_on_kenta',
          label: 'She tells you what living with Kenta was actually like',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'mika_gives_back_the_page',
          label: 'She gives you back the page she tore out',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['she_apologised'] },
        },
        {
          id: 'mika_stops_bracing',
          label: 'She lets you close the distance',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 65, flagsSet: ['she_apologised'] },
        },
      ],
      attributes: { might: 10, agility: 13, mind: 14, presence: 14, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'jun',
      name: 'Jun Kuroda',
      role: 'Your coworker at the next desk, and the only person you ever told about school',
      cardBlurb:
        'He sits at the next desk, eats your snacks, lives above the ramen counter at the end of your street, and is the one person you ever told about Mika Arai. He is going to find out she is on your sofa, and he will have opinions about it, at volume.',
      pronouns: 'he/him',
      publicTraits: ['Loud, generous and always slightly late', 'Remembers every birthday on the floor', 'Cannot stop his face doing what he thinks'],
      hiddenDrives: ['His own school was worse than your year, for three years, and he got through it by becoming loud. Mika is a stand-in for somebody he will never get to shout at'],
      values: ['Loyalty you can see from across a room', 'Nobody eats lunch alone while he is around'],
      fears: ['Watching you get hurt by the same person twice and having said nothing', 'Being asked to forgive somebody on somebody else’s behalf'],
      socialStyle: 'Turns up with food. Argues at volume and apologises in snacks. Physically incapable of whispering.',
      boundaries: [
        'Will not lie to your manager for you, and will lie to anybody else',
        'Will not sit in a room with Mika and pretend it is fine, at least the first time',
      ],
      goals: ['Get you to the reunion so the class sees who you are now', 'Make sure Mika is gone on Sunday, or know exactly why not'],
      secrets: [
        {
          id: 'jun_his_school',
          fact: 'Three years at his own school were worse than your one, and he survived them by becoming the loudest person in every room. He has never told anyone at work, including you.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask him why he cares this much, on a night when he has had one beer and not three.',
        },
      ],
      speechStyle:
        'Fast, loud and run-on, full of food and rhetorical questions he answers himself. Calls you "captain" for no reason anyone remembers. Says "okay" twice when he is about to say something serious.',
      topics: ['Mika', 'the reunion', 'the quarterly review', 'his ramen counter', 'what you were like when he met you'],
      voiceSamples: [
        'She’s on your sofa. Your actual sofa. The sofa I fell asleep on during the cup final. Do you hear yourself, captain?',
        'Okay. Okay! I’m calm. Look at me, being calm, holding a rice ball in each hand.',
        'You told me about her one time, at the year-end party, and then you cried in a taxi and paid for it. I remember the fare.',
        'Do I forgive her? Who asked me? Nobody asked me. Ask me anyway.',
      ],
      appearance:
        'An adult man, tall and broad, a rumpled work shirt with the sleeves shoved up, a lanyard he never takes off, round glasses pushed up into thick hair, and a convenience-store bag hooked on two fingers.',
      visualHook: 'A convenience-store plastic bag permanently hooked on two fingers, always with something in it for somebody else.',
      silhouette: 'Big and leaning, one hand gesturing, the other holding a bag, always mid-sentence.',
      artSeed: 'owss-jun-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'exasperated', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_arcade', activity: 'in his apartment above the ramen counter, alarm snoozed twice' },
        { startMinute: 480, endMinute: 1110, locationId: 'the_office', activity: 'at the next desk, on the phone to three warehouses at once' },
        { startMinute: 1110, endMinute: 1260, locationId: 'the_arcade', activity: 'at the ramen counter, saving you a seat whether or not you come' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_arcade', activity: 'home above the ramen counter with a game on, loud' },
      ],
      homeLocationId: 'the_arcade',
      knowledgeScope: ['jun', 'the_office', 'mika_by_reputation', 'the_reunion', 'the_arcade'],
      startingRelationship: { trust: 65, affection: 60, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'jun_his_own_school',
          label: 'He tells you about his own school',
          kind: 'TRUST',
          requires: { trust: 75 },
        },
        {
          id: 'jun_backs_your_call',
          label: 'He backs whatever you decide about her, out loud',
          kind: 'ALLIANCE',
          requires: { trust: 70, respect: 50 },
        },
      ],
      attributes: { might: 14, agility: 10, mind: 12, presence: 15, resolve: 12, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'aya',
      name: 'Aya',
      role: 'Your older sister. Owns a two-chair salon across the river, and knows more about tonight than she has said',
      cardBlurb:
        'Your older sister, who has opinions about your apartment, your haircut and your life, who turns up with groceries you did not order, and who has been oddly hard to reach since about eleven o’clock tonight.',
      pronouns: 'she/her',
      publicTraits: ['Bossy in a way that is mostly love', 'Talks with scissors in her hand', 'Has never once been on time to a family dinner'],
      hiddenDrives: [
        'She watched what that year did to you from the outside and could not fix it, and she has decided this is the fix, which is not her decision to make and she knows it',
      ],
      values: ['People change if somebody gives them a room to do it in', 'Family says the hard thing to your face'],
      fears: [
        'That she has done to you the one thing she swore she never would: decided something for you',
        'That Mika has been lying to her for a year and she has walked a wolf to your door',
      ],
      socialStyle:
        'Arrives with shopping you did not ask for, reorganises your fridge while asking about your love life, and leaves before you can argue with her.',
      boundaries: [
        'Will not lie to you if you ask her a direct question, and will avoid the question for as long as you let her',
        'Will not take sides in front of Mika',
      ],
      goals: [
        'Find out whether you let Mika in without admitting she had anything to do with it',
        'Get you to stop calling yourself what Mika called you',
      ],
      secrets: [
        {
          id: 'aya_sent_her',
          fact: 'Aya recognised Mika’s name the first day Mika sat in her chair, a year ago, and said nothing. Every six weeks since she has heard about "a person I did something terrible to". Tonight Mika messaged her from the bus stop, and Aya, at a wedding three hours away, sent her your address.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you ask her straight out who gave Mika your address. Her appointment book on the salon counter says it for her.',
        },
        {
          id: 'aya_the_concierge',
          fact: 'She cuts the hair of the night concierge at Harbourline Tower, who would let anybody up to the fourteenth floor if Aya rang ahead and asked nicely.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She offers once she knows what is in the locked drawer and that you have forgiven her, or at least stopped shouting.',
        },
      ],
      speechStyle:
        'Big-sister imperative. Gives orders phrased as observations. Uses your full name when she means it. Answers a question she does not want to answer with a question about your eating.',
      topics: ['your eating', 'your apartment', 'Mika', 'the salon', 'your love life', 'who gave Mika your address'],
      voiceSamples: [
        'You’re going to eat something green before Thursday. That wasn’t a question.',
        'Did I give her your address? Ask me properly and I’ll answer properly.',
        'Every six weeks, in my chair, with foil in her hair, she talks about a person she did something terrible to. Never a name.',
        'I’m your sister. I get to be wrong about you out loud. That’s the whole job description.',
      ],
      appearance:
        'An adult woman, small and quick, a sleek two-tone bob she restyles every month, a black salon apron with combs in the pocket, white trainers, and four silver cuffs climbing one ear.',
      visualHook: 'A pair of thinning scissors always somewhere on her: an apron pocket, behind an ear, pointing at whoever she is lecturing.',
      silhouette: 'Small, one hand on her hip, scissors pointed at you.',
      artSeed: 'owss-aya-01',
      portrait: null,
      expressions: ['neutral', 'teasing', 'stern', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'aya_salon', activity: 'in her apartment up the outside stairs from the salon' },
        { startMinute: 540, endMinute: 1200, locationId: 'aya_salon', activity: 'two chairs, a full book and a radio nobody else likes' },
        { startMinute: 1200, endMinute: 1440, locationId: 'aya_salon', activity: 'sweeping up and texting you things you did not ask for' },
      ],
      homeLocationId: 'aya_salon',
      knowledgeScope: ['aya', 'mika', 'the_salon', 'kenta_by_reputation', 'harbourline_tower', 'the_player_growing_up'],
      startingRelationship: { trust: 70, affection: 75, respect: 40, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'aya_comes_clean',
          label: 'She admits she sent Mika to your door',
          kind: 'TRUST',
          requires: { trust: 70, flagsSet: ['week_begun'] },
        },
        {
          id: 'aya_rings_the_concierge',
          label: 'She rings the night concierge at the tower for you',
          kind: 'ALLIANCE',
          requires: { trust: 72, flagsSet: ['knows:aya_sent_her'] },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 13, presence: 15, resolve: 14, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'kenta',
      name: 'Kenta Yasuda',
      role: 'Mika’s ex-fiancé. Sales manager at a waterfront tower, everybody’s favourite dinner guest, and the name on everything she owned',
      cardBlurb:
        'He has never once raised his voice, and he has never needed to. He has Mika’s documents in a locked drawer, a calm story for everybody who asks, and very soon a reason to be interested in you.',
      pronouns: 'he/him',
      publicTraits: ['Warm, attentive, and remembers your name after one meeting', 'Generous with money in front of witnesses', 'Never, ever loses his temper'],
      hiddenDrives: [
        'He does not want Mika back so much as he wants to have been the one who ended it, and to be seen to have been patient',
        'He is two months behind on the payments for 1406 and needs her half of the wedding fund to cover them before his firm finds out',
      ],
      values: ['Appearances, which he would call manners', 'Winning without anybody being able to say he fought'],
      fears: ['Being seen to lose his temper, especially by anyone who matters to his firm', 'Mika telling the truth about the money to people who might believe her'],
      socialStyle:
        'Gentle voice, steady eye contact, a hand on your shoulder by the second sentence. Agrees with everything you say and then does exactly what he was always going to do.',
      boundaries: [
        'Will never raise a hand or his voice. He wins by being the calm one, and violence would end that',
        'Will not say anything cruel where it can be recorded',
      ],
      goals: ['Get Mika back across the river by next Sunday, or get her half of the wedding fund back', 'Make sure the story everyone believes is his'],
      secrets: [
        {
          id: 'kenta_the_location',
          fact: 'Mika’s phone has shared its location with Kenta for two years. He set it up on her birthday "for safety" and she has forgotten it exists. By Sunday morning he knows which building she is in.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who goes through her phone’s settings finds it. Kenta himself lets it slip if he is made to explain how he found her.',
        },
        {
          id: 'kenta_the_payments',
          fact: 'He is two months behind on 1406. The wedding fund he says she stole was half hers, and he needs it to clear the arrears before his firm hears about them.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The unopened post on his console table says it. He admits it only if somebody calls his bluff in front of a witness he cares about.',
        },
      ],
      speechStyle:
        'Soft, warm and unhurried. Uses your first name often. Frames every demand as concern for somebody else. Never swears, never interrupts, never finishes an argument he is losing.',
      topics: ['Mika', 'the wedding fund', 'her documents', 'the tower', 'what is best for her'],
      voiceSamples: [
        'I’m not angry. I want that understood. I’m worried about her, and I think you are too.',
        'You seem decent. Decent people don’t get involved in other people’s engagements.',
        'Her documents are perfectly safe. She only has to come and collect them. In person.',
        'Go on, hit me, if it helps. Then we can both explain it to the police.',
      ],
      appearance:
        'An adult man, tall and neat, a navy suit that fits too well for a weekday evening, a good watch, a pale grey scarf folded the same way every time, and an easy, practised smile that reaches about halfway to his eyes.',
      visualHook: 'A pale grey cashmere scarf folded exactly the same way every time, and the polite smile above it.',
      silhouette: 'Upright and relaxed, hands in his coat pockets, standing one step too close.',
      artSeed: 'owss-kenta-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'cold', 'calculating'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'unit_1406', activity: 'in 1406, where every room is tidy and nothing of hers is out' },
        { startMinute: 450, endMinute: 1140, locationId: 'kenta_tower', activity: 'in the show-suite on the ground floor, selling the apartments upstairs' },
        { startMinute: 1140, endMinute: 1440, locationId: 'unit_1406', activity: 'at home with every light on, answering messages from mutual friends' },
      ],
      homeLocationId: 'unit_1406',
      knowledgeScope: ['kenta', 'mika', 'harbourline_tower', 'the_wedding_fund', 'the_blue_folder'],
      startingRelationship: { trust: 0, affection: 0, respect: 20, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'kenta_makes_an_offer',
          label: 'He offers you a quiet arrangement',
          kind: 'ALLIANCE',
          requires: { respect: 35, flagsSet: ['kenta_came_round'] },
        },
        {
          id: 'kenta_drops_the_smile',
          label: 'He stops being reasonable',
          kind: 'OTHER',
          requires: { flagsSet: ['kenta_exposed'] },
        },
      ],
      attributes: { might: 12, agility: 11, mind: 15, presence: 17, resolve: 14, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'tamura',
      name: 'Fumiko Tamura',
      calledName: 'Mrs. Tamura',
      role: 'Your landlady. Lives in 1A, sweeps the walkway at half past five, and enforces the no-pets clause with her whole heart',
      cardBlurb:
        'She owns your building, reads every name on every letterbox, and has a no-pets clause in your lease. She has also fed every stray cat on this street for thirty years, which you may be able to use.',
      pronouns: 'she/her',
      publicTraits: ['Up before the sun, every day', 'Knows every tenant she has ever had by their rubbish', 'Pretends to be stricter than she is'],
      hiddenDrives: [
        'She lost her husband two winters ago and the building is the only thing left that needs her. A new problem in it is, privately, a gift',
      ],
      values: ['Rules are what make a building liveable', 'Nobody sleeps on a staircase in her building'],
      fears: ['Being made a fool of in her own building', 'Being moved into her son’s house across the city "for her own good"'],
      socialStyle: 'Asks three questions she knows the answers to, and then the one she does not. Talks to the cat before she talks to you.',
      boundaries: ['Will not tolerate being lied to twice', 'Will not put anybody out in the rain, whatever the lease says'],
      goals: ['Find out who is in 2C and whether there is an animal involved', 'Keep the building exactly as it is for one more year'],
      secrets: [
        {
          id: 'tamura_the_strays',
          fact: 'The no-pets clause was written by her late husband, who was allergic. She has fed four strays behind the bins for thirty years and keeps a bag of cat food in her shoe cupboard.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She softens the moment the cat is put in front of her, and admits it if you catch her feeding the strays at dawn.',
        },
      ],
      speechStyle:
        'Formal, old-fashioned and precise. Calls you by your unit number. Ends hard sentences with a small polite phrase, as if that makes them softer, and it does not.',
      topics: ['the house rules', 'the cat', 'the building', 'her late husband', 'who is in 2C'],
      voiceSamples: [
        'Two-C. Good morning. There is a wet footprint on my stairs that is smaller than yours.',
        'The lease says no animals. The lease does not say I must hear one. Do you follow me?',
        'My husband wrote that rule. He was allergic to cats and to fun, God rest him.',
        'Nobody sleeps on my staircase. Bring her down. I have a spare room and a kettle.',
      ],
      appearance:
        'An older woman, tiny and straight-backed, silver hair set in neat waves, a quilted housecoat over a pressed blouse, house sandals, and a bamboo broom she carries like a staff of office.',
      visualHook: 'A bamboo broom held upright at her side like a sentry’s spear.',
      silhouette: 'Tiny and very upright, broom planted beside her, looking up at you as if you were the short one.',
      artSeed: 'owss-tamura-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'amused', 'soft'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'tamura_flat', activity: 'in 1A with the radio low' },
        { startMinute: 330, endMinute: 420, locationId: 'the_walkway', activity: 'sweeping the stairs and the walkway, and noticing everything' },
        { startMinute: 420, endMinute: 1020, locationId: 'tamura_flat', activity: 'in 1A with the door ajar, listening to the building' },
        { startMinute: 1020, endMinute: 1080, locationId: 'the_walkway', activity: 'watering the pots along the walkway' },
        { startMinute: 1080, endMinute: 1440, locationId: 'tamura_flat', activity: 'in 1A with dinner and the evening news' },
      ],
      homeLocationId: 'tamura_flat',
      knowledgeScope: ['tamura', 'hinode_court', 'the_house_rules', 'the_strays', 'every_tenant'],
      startingRelationship: { trust: 45, affection: 35, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tamura_on_your_side',
          label: 'She decides the cat is her problem too',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['tamura_knows'] },
        },
        {
          id: 'tamura_takes_her_in',
          label: 'She takes Mika in downstairs',
          kind: 'OTHER',
          requires: { flagsSet: ['turned_her_away'] },
        },
      ],
      attributes: { might: 6, agility: 8, mind: 15, presence: 14, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'daisuke',
      name: 'Daisuke Ueno',
      role: 'Your old classmate. Organising the eight-year reunion, and still calling you what Mika named you',
      cardBlurb:
        'He laughed loudest when Mika read your notebook to the class, and he has just finished the slideshow for the eight-year reunion. He still calls you Footnote, and he genuinely thinks you like it.',
      pronouns: 'he/him',
      publicTraits: ['Relentlessly upbeat', 'Organises everything and finishes nothing', 'Sells used cars, and is good at it'],
      hiddenDrives: [
        'He needs the reunion to be the best night anyone has had since school, because nothing since school has been his best night',
      ],
      values: ['Everybody together, everybody laughing', 'Nobody taking anything too seriously'],
      fears: ['Being remembered as Mika’s sidekick', 'Somebody asking who actually took the photograph on the back stairs'],
      socialStyle: 'Back-slaps, nicknames and group selfies. Turns every serious remark into a toast.',
      boundaries: ['Will not cancel the reunion for anybody', 'Will not admit to anything in front of the class'],
      goals: ['Get every single classmate to the reunion, including you and Mika', 'Run the slideshow at nine o’clock sharp'],
      secrets: [
        {
          id: 'daisuke_the_photo',
          fact: 'Daisuke took the photograph of you eating lunch alone on the back stairs, and posted it with the caption. Mika made it famous, but he made it. It is slide thirty-one of the reunion slideshow, as a joke.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only alone, and only if you show him the slide and ask him who took it. Mika knows, and tells you if you ask her directly.',
        },
      ],
      speechStyle:
        'Salesman-bright, exclamation without the marks, a nickname for everybody. Answers every question with an invitation, and every silence with a toast.',
      topics: ['the reunion', 'the slideshow', 'who is coming', 'the old days', 'used cars'],
      voiceSamples: [
        'Footnote! No way. Look at you, you’re a whole paragraph now.',
        'Come on, it’s been eight years, that’s water under the bridge. First round’s on me.',
        'Slideshow’s at nine. You’re in it. Everybody’s in it. That’s what makes it a slideshow.',
        'Me? I was only the guy with the camera. Somebody had to be.',
      ],
      appearance:
        'An adult man, stocky and sunburnt, a loud checked sports jacket over a polo shirt, an expensive haircut, teeth whitened a shade too far, and a phone held up at arm’s length for a group photo.',
      visualHook: 'A phone held out at arm’s length, always mid-selfie, always with somebody pulled into the frame.',
      silhouette: 'One arm out with a phone up, the other round somebody’s neck.',
      artSeed: 'owss-daisuke-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'caught out', 'nervous'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'the_izakaya', activity: 'sleeping off last night in his apartment round the corner from the bar' },
        { startMinute: 600, endMinute: 1080, locationId: 'the_izakaya', activity: 'at a corner table downstairs, ringing classmates who have not answered the chat' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_izakaya', activity: 'at the counter, buying rounds and showing people the slideshow on his phone' },
      ],
      homeLocationId: 'the_izakaya',
      knowledgeScope: ['daisuke', 'the_reunion', 'the_slideshow', 'school', 'mika_back_then'],
      startingRelationship: { trust: 10, affection: 20, respect: 5, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'daisuke_admits_the_photo',
          label: 'He admits who took the photograph',
          kind: 'TRUST',
          requires: { respect: 35, flagsSet: ['saw_the_slideshow'] },
        },
      ],
      attributes: { might: 12, agility: 11, mind: 10, presence: 15, resolve: 9, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_one_week',
      title: 'One Week, She Said',
      summary:
        'Mika Arai is at your door at twenty to midnight with a duffel bag, an old cat, and keys to her own place next Sunday at ten. Tonight you decide whether she spends the week on your sofa and on what terms, and then whether you want to know what sent her to your door, of all the doors in the city.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['mika', 'tamura'],
      involvedLocationIds: ['apartment_2c', 'the_walkway'],
      knownRewardCopy: 'A week with the person who made school a misery for you, or a shut door and whatever that costs.',
      steps: [
        {
          id: 'at_the_door',
          playerCopy: 'Answer her. Yes or no, and on what terms.',
          directorNotes:
            'She has asked once and will not ask again. Every answer is a real way to play this and none is wrong. A no is honoured: she says "okay", picks up the carrier and goes and sits on the top step of the stairs, where Mrs. Tamura finds her at half past five. A yes on terms gets the terms taken seriously. A demand that she say what she did, here, gets it said, badly and completely, on the step. Whatever the player does, she reacts to the exact thing rather than to the premise.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'let_in_on_terms',
              label: 'Let her in, on your terms',
              predicate: { flagsSet: ['used:set_the_rules'] },
              setsFlags: ['she_stays', 'rules_set'],
              closesFlags: ['turned_her_away'],
            },
            {
              routeId: 'let_in_quietly',
              label: 'Let her in and say nothing about before',
              predicate: { flagsSet: ['used:keep_the_peace'] },
              setsFlags: ['she_stays', 'nothing_said'],
              closesFlags: ['turned_her_away'],
            },
            {
              routeId: 'made_her_say_it',
              label: 'Make her say what she did before she crosses the step',
              predicate: { flagsSet: ['used:name_what_she_did'] },
              setsFlags: ['she_stays', 'said_it_at_the_door'],
              closesFlags: ['nothing_said', 'turned_her_away'],
            },
            {
              routeId: 'carried_her_bag_in',
              label: 'Pick up her bag and carry it inside',
              predicate: { flagsSet: ['used:haul_it'] },
              setsFlags: ['she_stays', 'took_the_bag'],
              closesFlags: ['turned_her_away'],
            },
            {
              routeId: 'shut_the_door',
              label: 'Say no and close the door',
              predicate: { flagsSet: ['used:shut_the_door'] },
              setsFlags: ['turned_her_away'],
              closesFlags: ['she_stays'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['week_begun'], abilities: [], reputation: [] },
        },
        {
          id: 'why_your_door',
          playerCopy: 'Find out what happened to her, and why she knocked on your door of every door in the city.',
          directorNotes:
            'She will tell the facts plainly if asked once she trusts the player a little: three days ago, the engagement, the folder, the studio, the Friday deadline. She will not say who gave her the address. Her phone, if the player goes through it, says more than she would: forty-one polite messages, and a location share she has forgotten. Deciding not to ask is a route too, and a perfectly decent one.',
          enterWhen: { flagsSet: ['week_begun'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself',
              predicate: { flagsSet: ['spoke:mika'], minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 30 }] },
              setsFlags: ['knows:about_kenta', 'she_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_phone',
              label: 'Read it off her phone',
              predicate: { hasItems: ['mika_phone'] },
              setsFlags: ['knows:about_kenta', 'knows:the_location_share', 'read_her_phone'],
              closesFlags: ['she_told_you'],
            },
            {
              routeId: 'heard_it_from_aya',
              label: 'Hear it from your sister',
              predicate: { flagsSet: ['knows:aya_sent_her', 'spoke:aya'] },
              setsFlags: ['knows:about_kenta', 'heard_it_from_aya'],
              closesFlags: [],
            },
            {
              routeId: 'he_turned_up',
              label: 'Meet him before she tells you',
              predicate: { flagsSet: ['kenta_came_round'] },
              setsFlags: ['knows:about_kenta', 'met_him_first'],
              closesFlags: ['she_told_you'],
            },
            {
              routeId: 'didnt_ask',
              label: 'Decide you do not want to know',
              predicate: { flagsSet: ['used:keep_the_peace'], afterWorldMinute: 1440 + 12 * 60 },
              setsFlags: ['didnt_ask'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['knows:the_situation'], abilities: ['face_kenta'], reputation: [] },
        },
      ],
    },
    {
      id: 'q_blue_folder',
      title: 'Everything in His Name',
      summary:
        'Her ID card, her bank book and her grandmother’s ring are in a blue folder in a locked drawer on the fourteenth floor of a waterfront tower, in the apartment of the man she left. The letting agent needs a copy of the card by five o’clock on Friday, or the studio goes to the next name on the list.',
      kind: 'MAIN',
      involvedCharacterIds: ['mika', 'kenta', 'aya'],
      involvedLocationIds: ['kenta_tower', 'unit_1406', 'the_new_studio'],
      knownRewardCopy: 'Her documents back in her own hands, and a lease that goes through.',
      discoverWhen: { flagsSet: ['knows:the_situation'] },
      steps: [
        {
          id: 'a_way_up',
          playerCopy: 'Find a way past the concierge desk and up to the fourteenth floor, or a way around needing to go at all.',
          directorNotes:
            'Four doors and none of them is free. Going on Kenta’s invitation means going on his terms, at his hour, in his apartment. Bluffing the desk works and the concierge will mention it to Kenta by morning. Aya can ring ahead because she cuts the night concierge’s hair, which means telling Aya everything. Replacing the documents through the ward office and the bank is slow, dull and legal, and leaves the ring in his drawer for good.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'invited_up',
              label: 'Go when he says, on his terms',
              predicate: { flagsSet: ['kenta_invited_her'] },
              setsFlags: ['way_into_1406', 'on_his_terms'],
              closesFlags: [],
            },
            {
              routeId: 'bluffed_the_desk',
              label: 'Talk your way past the concierge',
              predicate: { flagsSet: ['used:bluff_it'], atLocation: 'kenta_tower' },
              setsFlags: ['way_into_1406', 'bluffed_the_desk'],
              closesFlags: [],
            },
            {
              routeId: 'aya_got_you_up',
              label: 'Let Aya ring the night concierge',
              predicate: { flagsSet: ['aya_called_ahead'] },
              setsFlags: ['way_into_1406'],
              closesFlags: [],
            },
            {
              routeId: 'went_around_him',
              label: 'Replace the documents properly and leave the ring',
              predicate: { flagsSet: ['used:do_the_paperwork', 'knows:the_situation'], beforeWorldMinute: 6 * 1440 + 17 * 60 },
              setsFlags: ['folder_replaced', 'ring_left_behind'],
              closesFlags: ['way_into_1406'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['folder_in_reach'], abilities: [], reputation: [] },
        },
        {
          id: 'get_the_folder',
          playerCopy: 'Get the blue folder, or what is in it, into her hands before five on Friday.',
          directorNotes:
            'Kenta will be polite in 1406 whatever happens. He will offer tea. He will mention, gently, that the money is the real issue. If the player loses their temper he has won; if Mika does it herself, quietly, it changes something in her that the rest of the week can feel. Taking the folder while he is downstairs selling apartments is theft of her own property and he will treat it as theft.',
          enterWhen: { flagsSet: ['folder_in_reach'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_up_with_her',
              label: 'Go up with her and stand between them',
              predicate: { flagsSet: ['used:face_kenta'], atLocation: 'unit_1406' },
              setsFlags: ['folder_back', 'stood_with_her'],
              closesFlags: [],
            },
            {
              routeId: 'she_did_it_herself',
              label: 'Back her while she asks for it herself',
              predicate: {
                flagsSet: ['used:say_it_plain'],
                atLocation: 'unit_1406',
                minRelationship: [{ characterId: 'mika', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['folder_back', 'she_did_it_herself'],
              closesFlags: ['stood_with_her'],
            },
            {
              routeId: 'took_it_quietly',
              label: 'Take it out of the drawer while he is downstairs',
              predicate: { hasItems: ['blue_folder'] },
              setsFlags: ['folder_back', 'took_it_quietly'],
              closesFlags: [],
            },
            {
              routeId: 'made_do_with_copies',
              label: 'Get the agency the copies from the ward office instead',
              predicate: { flagsSet: ['folder_replaced'] },
              setsFlags: ['copies_only'],
              closesFlags: ['folder_back'],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['documents_sorted'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_reasonable_man',
      title: 'The Reasonable Man',
      summary:
        'Kenta Yasuda never raises his voice. He has told their friends that Mika stole from him, he has her documents in a drawer, and sooner or later he will work out which door she is behind and come and stand at it, very politely, holding flowers.',
      kind: 'MAIN',
      involvedCharacterIds: ['kenta', 'mika', 'tamura'],
      involvedLocationIds: ['the_walkway', 'kenta_tower', 'unit_1406'],
      knownRewardCopy: 'An end to it with him, one way or another, that Mika can live with.',
      discoverWhen: { flagsSet: ['knows:about_kenta'] },
      steps: [
        {
          id: 'how_he_finds_her',
          playerCopy: 'Work out how Kenta will find her, before he does.',
          directorNotes:
            'The location share is the whole answer, and it is boring, and that is the point: no detective work, a setting on a phone. Switching it off with her, sitting side by side on the sofa going through every setting, is one of the more intimate scenes this story has. Going to the tower first to face him is bold and gives him exactly the meeting he wanted.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'switched_it_off_together',
              label: 'Go through her phone settings with her',
              predicate: {
                flagsSet: ['used:do_the_paperwork', 'knows:about_kenta'],
                minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['location_sharing_off', 'knows:the_location_share'],
              closesFlags: [],
            },
            {
              routeId: 'switched_it_off',
              label: 'Switch off the location share',
              predicate: { flagsSet: ['used:do_the_paperwork', 'knows:the_location_share'] },
              setsFlags: ['location_sharing_off'],
              closesFlags: [],
            },
            {
              routeId: 'he_found_her',
              label: 'He finds the building first',
              predicate: { flagsSet: ['kenta_came_round'] },
              setsFlags: ['he_found_her'],
              closesFlags: ['location_sharing_off'],
            },
            {
              routeId: 'went_to_him_first',
              label: 'Go to the tower and face him first',
              predicate: { flagsSet: ['used:face_kenta'], atLocation: 'kenta_tower' },
              setsFlags: ['went_to_him_first'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['kenta_in_play'], abilities: [], reputation: [] },
        },
        {
          id: 'how_it_ends_with_him',
          playerCopy: 'End it with Kenta in a way Mika can live with, or watch her go back.',
          directorNotes:
            'Four ways out and one of them is a loss. Standing between them works if the player keeps their temper. Mika ending it herself is the strongest version and needs the player to have backed rather than rescued her. Exposing his story needs proof, and the unopened post in 1406 is proof. And if the player has spent the week making her pay, Kenta’s calm voice on the phone starts to sound like the kinder of two options, and she goes back.',
          enterWhen: { flagsSet: ['kenta_in_play'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'shown_the_stairs',
              label: 'Stand between them until he leaves',
              predicate: { flagsSet: ['used:face_kenta'] },
              setsFlags: ['kenta_done', 'stood_between'],
              closesFlags: ['she_went_back'],
            },
            {
              routeId: 'she_ended_it',
              label: 'She ends it herself',
              predicate: { flagsSet: ['she_did_it_herself'] },
              setsFlags: ['kenta_done', 'she_ended_it'],
              closesFlags: ['she_went_back'],
            },
            {
              routeId: 'his_story_exposed',
              label: 'Show their friends where the money went',
              predicate: { flagsSet: ['used:make_it_public'], hasItems: ['arrears_letters'] },
              setsFlags: ['kenta_done', 'kenta_exposed'],
              closesFlags: ['she_went_back'],
            },
            {
              routeId: 'she_went_back',
              label: 'She goes back to him',
              predicate: { flagsSet: ['used:hold_it_over_her', 'kenta_invited_her'] },
              setsFlags: ['she_went_back'],
              closesFlags: ['kenta_done'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['kenta_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_footnote',
      title: 'Footnote',
      summary:
        'She named you Footnote, read your notebook to the whole class and made sure they laughed. She has promised not to bring it up. Whether it gets said, by whom, and in front of whom is yours to decide, and the eight-year class reunion is on Saturday night.',
      kind: 'MAIN',
      involvedCharacterIds: ['mika', 'daisuke', 'jun'],
      involvedLocationIds: ['apartment_2c', 'the_izakaya', 'the_riverbank'],
      knownRewardCopy: 'The thing she owes you, said or unsaid, and a room full of the people who laughed.',
      discoverWhen: { flagsSet: ['week_begun'] },
      steps: [
        {
          id: 'what_is_owed',
          playerCopy: 'Decide what you need from her about eight years ago, if anything.',
          directorNotes:
            'Her apology, when it comes, is specific and has no excuse in it: the nickname, the notebook, the stairs, and that she was proud of the nickname. She does not ask to be forgiven and does not wait for it. Making her pay is a route and she takes it without arguing. Never bringing it up is also a route, reached simply by letting the week run to Friday night, and it must read as a decision rather than a punishment.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'heard_her_out',
              label: 'Make her say it, and hear it to the end',
              predicate: {
                flagsSet: ['used:name_what_she_did'],
                minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['she_apologised', 'heard_her_out'],
              closesFlags: ['made_her_pay'],
            },
            {
              routeId: 'she_said_it_unasked',
              label: 'Sit with her until she says it herself',
              predicate: {
                flagsSet: ['used:stay_with_it'],
                minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['she_apologised', 'she_said_it_unasked'],
              closesFlags: ['made_her_pay'],
            },
            {
              routeId: 'made_her_pay',
              label: 'Make her pay for it instead',
              predicate: { flagsSet: ['used:hold_it_over_her'] },
              setsFlags: ['made_her_pay'],
              closesFlags: ['she_apologised'],
            },
            {
              routeId: 'never_brought_it_up',
              label: 'Let the week run out without anybody saying it',
              predicate: { flagsSet: ['week_begun'], afterWorldMinute: 6 * 1440 + 20 * 60 },
              setsFlags: ['left_unsaid'],
              closesFlags: ['she_apologised'],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['past_on_the_table'], abilities: [], reputation: [] },
        },
        {
          id: 'the_reunion',
          playerCopy: 'Saturday at seven, upstairs at The Red Lantern. Go or do not; alone, with Jun, or with her.',
          directorNotes:
            'Thirty classmates, most of whom remember the nickname and not the person. Daisuke runs the room and the slideshow is at nine, and slide thirty-one is the stairwell photograph. Walking in with Mika after a real apology changes the room. Saying it to the room is the player’s own story told in their own words. Exposing her is revenge and it works. Staying home is allowed and the chat will report it all anyway.',
          enterWhen: { flagsSet: ['reunion_tonight'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'walked_in_with_her',
              label: 'Walk in with her',
              predicate: { flagsSet: ['she_apologised'], atLocation: 'the_izakaya' },
              setsFlags: ['went_together', 'footnote_retired'],
              closesFlags: ['exposed_her'],
            },
            {
              routeId: 'said_it_to_the_room',
              label: 'Tell the room what it was like, in your own words',
              predicate: { flagsSet: ['used:say_it_plain'], atLocation: 'the_izakaya' },
              setsFlags: ['said_it_to_the_room', 'footnote_retired'],
              closesFlags: [],
            },
            {
              routeId: 'pulled_the_slide',
              label: 'Take slide thirty-one out before nine',
              predicate: { hasItems: ['slideshow_drive'] },
              setsFlags: ['slide_pulled', 'footnote_retired'],
              closesFlags: [],
            },
            {
              routeId: 'exposed_her',
              label: 'Tell the room exactly what she did',
              predicate: { flagsSet: ['used:make_it_public'], atLocation: 'the_izakaya' },
              setsFlags: ['exposed_her'],
              closesFlags: ['went_together'],
            },
            {
              routeId: 'stayed_home',
              label: 'Do not go',
              predicate: { flagsSet: ['reunion_tonight'], afterWorldMinute: 7 * 1440 + 23 * 60 },
              setsFlags: ['skipped_the_reunion'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['reunion_over'], abilities: [], reputation: [{ factionId: 'faction_class', amount: 20 }] },
        },
      ],
    },
    {
      id: 'q_sunday_at_ten',
      title: 'Next Sunday, Ten O’Clock',
      summary:
        'A letting agent will be at a studio door across the city next Sunday at ten, with a key on a paper tag. By then the week is over, and somebody has to say what it was: a debt paid, a door kept shut, a friendship, or something neither of you planned.',
      kind: 'MAIN',
      involvedCharacterIds: ['mika', 'jun', 'aya'],
      involvedLocationIds: ['apartment_2c', 'the_new_studio'],
      knownRewardCopy: 'The end of the week, and whatever the two of you are to each other after it.',
      discoverWhen: { flagsSet: ['week_begun'] },
      steps: [
        {
          id: 'last_morning',
          playerCopy: 'Sunday morning. Say what the week was.',
          directorNotes:
            'Every route here is a real ending and none is the good one. A clean break on time is decent. Carrying her boxes to the train is kindness without commitment. Asking her to stay is romance and needs the apology to have happened first. If the agency closed on Friday without her card, there are no keys, and she is on the sofa on Sunday with nowhere to go, about to ask for something twice.',
          enterWhen: { flagsSet: ['last_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her_to_stay',
              label: 'Ask her not to go yet',
              predicate: {
                flagsSet: ['used:say_it_plain', 'she_apologised'],
                minRelationship: [{ characterId: 'mika', dimension: 'affection', value: 60 }],
              },
              setsFlags: ['asked_her_to_stay'],
              closesFlags: ['clean_break'],
            },
            {
              routeId: 'kept_in_touch',
              label: 'Give her the spare key at the studio door',
              predicate: {
                flagsSet: ['documents_sorted', 'she_apologised'],
                minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['she_moved_out', 'still_in_touch'],
              closesFlags: ['clean_break'],
            },
            {
              routeId: 'carried_her_boxes',
              label: 'Carry her things to the train',
              predicate: { flagsSet: ['used:haul_it', 'documents_sorted'] },
              setsFlags: ['she_moved_out', 'helped_her_move'],
              closesFlags: [],
            },
            {
              routeId: 'clean_break',
              label: 'Let her go at ten, as agreed',
              predicate: { flagsSet: ['documents_sorted'], afterWorldMinute: 8 * 1440 + 10 * 60 },
              setsFlags: ['she_moved_out', 'clean_break'],
              closesFlags: ['still_in_touch'],
            },
            {
              routeId: 'no_keys',
              label: 'There are no keys',
              predicate: { flagsSet: ['lease_lapsed'] },
              setsFlags: ['she_has_nowhere'],
              closesFlags: ['she_moved_out'],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['the_week_is_over'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_no_animals',
      title: 'Two-C, No Animals',
      summary:
        'Hinode Court has a no-pets clause written by the landlady’s late husband, and there is an old grey cat in 2C. Mrs. Tamura sweeps the walkway at half past five every morning and hears everything.',
      kind: 'SIDE',
      involvedCharacterIds: ['tamura', 'mika'],
      involvedLocationIds: ['the_walkway', 'tamura_flat'],
      knownRewardCopy: 'A landlady on your side, or a landlady you have lied to.',
      discoverWhen: { flagsSet: ['tamura_heard_the_cat'] },
      steps: [
        {
          id: 'the_cat_question',
          playerCopy: 'Deal with the landlady and the cat.',
          directorNotes:
            'Mrs. Tamura is much softer than her rules and much sharper than her age suggests to people who underestimate her. The truth works. A lie works once. Catching her with the cat food ends the argument in a single look. If the player shut the door on Mika, this is where she ends up: in the spare room in 1A, with a kettle, directly under the player’s floor.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her_straight',
              label: 'Tell her the truth about the cat and the guest',
              predicate: { flagsSet: ['used:say_it_plain', 'spoke:tamura'] },
              setsFlags: ['tamura_knows', 'cat_allowed'],
              closesFlags: [],
            },
            {
              routeId: 'bluffed_the_landlady',
              label: 'Lie to her about it',
              predicate: { flagsSet: ['used:bluff_it', 'spoke:tamura'] },
              setsFlags: ['tamura_fooled'],
              closesFlags: ['cat_allowed'],
            },
            {
              routeId: 'found_her_secret',
              label: 'Find out about her strays',
              predicate: { hasItems: ['cat_food_bag'] },
              setsFlags: ['tamura_knows', 'cat_allowed', 'knows:the_strays'],
              closesFlags: [],
            },
            {
              routeId: 'she_took_them_in',
              label: 'She takes Mika and the cat in downstairs',
              predicate: { flagsSet: ['turned_her_away'] },
              setsFlags: ['tamura_knows', 'mika_downstairs'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['building_settled'], abilities: [], reputation: [{ factionId: 'faction_hinode', amount: 15 }] },
        },
        {
          id: 'downstairs_or_up',
          playerCopy: 'She is in the landlady’s spare room, directly under your floor. Leave her there, or go down.',
          directorNotes:
            'Only for a player who shut the door. The week happens through the floorboards: her alarm at five, the cat on the windowsill of 1A, two people passing on the stairs every morning without a word. Going down and asking her up is allowed at any point and should cost the player something to say.',
          enterWhen: { flagsSet: ['mika_downstairs'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_her_up',
              label: 'Go down and ask her up, on your terms',
              predicate: { flagsSet: ['used:set_the_rules'] },
              setsFlags: ['she_stays', 'let_her_in_later'],
              closesFlags: ['kept_her_downstairs'],
            },
            {
              routeId: 'left_her_downstairs',
              label: 'Leave her where she is',
              predicate: { flagsSet: ['mika_downstairs'], afterWorldMinute: 4 * 1440 },
              setsFlags: ['kept_her_downstairs'],
              closesFlags: ['let_her_in_later'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['downstairs_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_jun',
      title: 'Jun Has Opinions',
      summary:
        'Jun Kuroda sits at the next desk, lives above the ramen counter at the end of your street, and is the only person you ever told about Mika Arai. He is going to find out she is on your sofa, and he is going to say so at volume.',
      kind: 'SIDE',
      involvedCharacterIds: ['jun', 'mika'],
      involvedLocationIds: ['the_office', 'the_arcade', 'apartment_2c'],
      knownRewardCopy: 'Your best friend on your side, or at least in the room.',
      discoverWhen: { flagsSet: ['week_begun'] },
      steps: [
        {
          id: 'jun_finds_out',
          playerCopy: 'Tell Jun before he finds out, or do not.',
          directorNotes:
            'Jun is furious on the player’s behalf and it is a kind of love. Being told is hard for him; walking in on her is worse; being lied to and finding out is the one thing he takes personally. He will not go to the manager. He will go to the ramen counter and be loud about it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_jun',
              label: 'Tell him yourself',
              predicate: { flagsSet: ['spoke:jun', 'used:say_it_plain'] },
              setsFlags: ['jun_knows', 'told_jun_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'jun_walked_in',
              label: 'He turns up and she opens the door',
              predicate: { flagsSet: ['jun_saw_her'] },
              setsFlags: ['jun_knows', 'jun_found_out'],
              closesFlags: ['told_jun_yourself'],
            },
            {
              routeId: 'lied_to_jun',
              label: 'Lie to him about it',
              predicate: { flagsSet: ['spoke:jun', 'used:bluff_it'] },
              setsFlags: ['lied_to_jun'],
              closesFlags: ['told_jun_yourself'],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['jun_in_it'], abilities: [], reputation: [{ factionId: 'faction_tsubame', amount: 10 }] },
        },
        {
          id: 'one_evening',
          playerCopy: 'Get Jun and Mika through one evening in the same room.',
          directorNotes:
            'He will not be polite to her the first time and she will not ask him to be. If she has already apologised to the player, she apologises to him too, for something she did not do to him, and that is what gets through. Dinner for three is the comic version and still goes somewhere true.',
          enterWhen: { flagsSet: ['jun_knows'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'dinner_for_three',
              label: 'Cook for the three of you',
              predicate: { flagsSet: ['used:cook_for_two'], minRelationship: [{ characterId: 'jun', dimension: 'trust', value: 65 }] },
              setsFlags: ['jun_made_peace'],
              closesFlags: [],
            },
            {
              routeId: 'jun_said_his_piece',
              label: 'Let Jun say his piece to her',
              predicate: { flagsSet: ['spoke:jun', 'she_apologised'] },
              setsFlags: ['jun_said_his_piece'],
              closesFlags: [],
            },
            {
              routeId: 'kept_them_apart',
              label: 'Keep them apart for the rest of the week',
              predicate: { flagsSet: ['used:keep_the_peace', 'jun_knows'] },
              setsFlags: ['kept_them_apart'],
              closesFlags: ['jun_made_peace'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['jun_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_who_sent_her',
      title: 'Who Gave Her Your Address',
      summary:
        'She has never been to your building, and she knew the floor, the door and the time the last bus goes. She will not say who told her. Somebody close to you did.',
      kind: 'LEAD',
      involvedCharacterIds: ['aya', 'mika'],
      involvedLocationIds: ['aya_salon', 'apartment_2c'],
      knownRewardCopy: 'A name, and a conversation with somebody who loves you about whether they had the right.',
      discoverWhen: { flagsSet: ['week_begun'] },
      steps: [
        {
          id: 'who_told_her',
          playerCopy: 'Find out who gave her your address.',
          directorNotes:
            'Aya will not lie to a direct question and will dodge everything short of one. The appointment book on the salon counter says it in her own handwriting. Mika protects Aya absolutely and stops denying it only to somebody who already knows.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'aya_confessed',
              label: 'Ask Aya straight out',
              predicate: { flagsSet: ['spoke:aya', 'used:say_it_plain'] },
              setsFlags: ['knows:aya_sent_her', 'aya_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'saw_the_book',
              label: 'Read it in her appointment book',
              predicate: { hasItems: ['appointment_book'] },
              setsFlags: ['knows:aya_sent_her', 'saw_the_book'],
              closesFlags: ['aya_confessed'],
            },
            {
              routeId: 'mika_stopped_denying',
              label: 'Get Mika to stop denying it',
              predicate: { flagsSet: ['spoke:mika'], minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:aya_sent_her'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['aya_question_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_say_to_aya',
          playerCopy: 'Decide what you say to your sister about it.',
          directorNotes:
            'Aya was wrong to decide for the player and right about at least one thing, and she knows both. Forgiving her is easy and should not be free. Telling her off is fair. If the player is past being angry and knows about the folder, she mentions, too casually, that she cuts the night concierge’s hair at the tower.',
          enterWhen: { flagsSet: ['knows:aya_sent_her'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'aya_called_ahead',
              label: 'Let her make it up to you with a phone call',
              predicate: { flagsSet: ['spoke:aya', 'knows:about_kenta'] },
              setsFlags: ['aya_called_ahead', 'aya_forgiven'],
              closesFlags: [],
            },
            {
              routeId: 'forgave_aya',
              label: 'Sit with her and let it go',
              predicate: { flagsSet: ['spoke:aya', 'used:stay_with_it'] },
              setsFlags: ['aya_forgiven'],
              closesFlags: [],
            },
            {
              routeId: 'told_aya_off',
              label: 'Tell her where the line is',
              predicate: { flagsSet: ['spoke:aya', 'used:set_the_rules'] },
              setsFlags: ['aya_told_off'],
              closesFlags: ['aya_forgiven'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['aya_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_page',
      title: 'The Torn Page',
      summary:
        'There is a stub near the back of your old notebook where a page used to be. Eight years ago she read the notebook to the class and tore one page out, and you never found out what happened to it.',
      kind: 'SIDE',
      involvedCharacterIds: ['mika'],
      involvedLocationIds: ['apartment_2c'],
      knownRewardCopy: 'Something of yours that has been gone for eight years.',
      discoverWhen: { flagsSet: ['past_on_the_table'] },
      steps: [
        {
          id: 'the_page',
          playerCopy: 'Get back what she took from the notebook.',
          directorNotes:
            'The page is a pencil drawing of rain on a classroom window, from the inside. She gives it back without a word of explanation if she has apologised and the player has heard it. Finding it in her bag gets the same page and none of the same moment, and she will know.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_gave_it_back',
              label: 'She gives it back',
              predicate: { flagsSet: ['she_apologised'], minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_torn_page', 'she_gave_it_back'],
              closesFlags: [],
            },
            {
              routeId: 'found_it_in_her_bag',
              label: 'Find it in her duffel',
              predicate: { hasItems: ['torn_page'] },
              setsFlags: ['knows:the_torn_page', 'found_it_yourself'],
              closesFlags: ['she_gave_it_back'],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['page_found'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_tamura_finds_her',
      atWorldMinute: 1440 + 5 * 60 + 30,
      locationId: 'the_walkway',
      publicCopy:
        'At half past five Mrs. Tamura comes up the stairs with her broom and finds a woman asleep sitting up on the top step, a cat carrier in her lap, both of them damp.',
      directorNotes:
        'Only for a player who shut the door. Mrs. Tamura takes one look and takes them both downstairs to the spare room in 1A, rules or no rules. By breakfast the landlady knows exactly whose door the woman was at, and she will mention it to the player on the stairs.',
      setsFlags: ['mika_downstairs', 'tamura_heard_the_cat'],
      cancelledByFlags: ['she_stays'],
      requiresFlags: ['turned_her_away'],
      movesCharacters: [
        { characterId: 'mika', toLocationId: 'tamura_flat' },
        { characterId: 'tamura', toLocationId: 'the_walkway' },
      ],
    },
    {
      id: 'we_tamura_hears_the_cat',
      atWorldMinute: 1440 + 7 * 60 + 10,
      locationId: 'the_walkway',
      publicCopy: 'A cat yowls behind the door of 2C, and down on the walkway Mrs. Tamura’s broom stops mid-sweep.',
      directorNotes:
        'She knows. She is not going to say so yet. She will knock at a civilised hour with a question about the recycling, and look past the player into the apartment while they answer.',
      setsFlags: ['tamura_heard_the_cat'],
      cancelledByFlags: ['tamura_knows'],
      requiresFlags: ['she_stays'],
      movesCharacters: [{ characterId: 'tamura', toLocationId: 'the_walkway' }],
    },
    {
      id: 'we_aya_drops_by',
      atWorldMinute: 1440 + 13 * 60,
      locationId: 'apartment_2c',
      publicCopy:
        'Aya comes up the stairs with two bags of groceries you did not order, knocks once, and says "just passing" before the door is fully open.',
      directorNotes:
        'She is checking on what she did and pretending she is not. If Mika answers, Aya acts surprised, badly. She will not admit anything unless asked directly, and she unpacks the groceries either way.',
      setsFlags: ['aya_came_round'],
      cancelledByFlags: [],
      requiresFlags: ['week_begun'],
      movesCharacters: [{ characterId: 'aya', toLocationId: 'apartment_2c' }],
    },
    {
      id: 'we_monday_morning',
      atWorldMinute: 2 * 1440 + 8 * 60 + 55,
      locationId: 'the_office',
      publicCopy: 'Jun drops a rice ball on your keyboard, looks at you properly, and says you look like you slept in a bus shelter.',
      directorNotes:
        'The work week starts whatever is happening at home. Jun will keep asking until he gets an answer, and he can tell a lie from a tired face.',
      setsFlags: ['jun_noticed'],
      cancelledByFlags: [],
      requiresFlags: ['week_begun'],
      movesCharacters: [],
    },
    {
      id: 'we_jun_turns_up',
      atWorldMinute: 3 * 1440 + 19 * 60 + 40,
      locationId: 'apartment_2c',
      publicCopy: 'Jun knocks at 2C with a bag of leftover food from an office party, and it is Mika who opens the door.',
      directorNotes:
        'He recognises her from one drunken description eight months ago, which is enough. He does not shout, which is how the player can tell how angry he is. Whatever the player does next, he stays for dinner.',
      setsFlags: ['jun_saw_her'],
      cancelledByFlags: ['jun_knows'],
      requiresFlags: ['she_stays'],
      movesCharacters: [{ characterId: 'jun', toLocationId: 'apartment_2c' }],
    },
    {
      id: 'we_headcount',
      atWorldMinute: 4 * 1440 + 12 * 60,
      locationId: null,
      publicCopy:
        'Daisuke posts the final headcount for Saturday to the class chat. Two names are in bold: yours, marked maybe, and Mika Arai’s, marked coming.',
      directorNotes:
        'Mika did not answer the invitation. Daisuke put her down himself. She sees it on her cracked phone and goes very still, and then asks, carefully, whether the player is going.',
      setsFlags: ['headcount_posted'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_kenta_at_the_stairs',
      atWorldMinute: 4 * 1440 + 21 * 60 + 15,
      locationId: 'the_walkway',
      publicCopy:
        'A man in a good coat and a pale grey scarf is standing at the bottom of the stairs with flowers, asking Mrs. Tamura very politely whether Mika Arai is staying in this building.',
      directorNotes:
        'Kenta found the building through the location share on her phone. He is calm, warm and sorry for the trouble. He wants to see her and will settle for being seen by the player. He says Thursday at eight, in person, for her things. He would love the player to lose their temper.',
      setsFlags: ['kenta_came_round', 'knows:about_kenta', 'kenta_invited_her'],
      cancelledByFlags: ['location_sharing_off', 'kenta_done'],
      requiresFlags: ['week_begun'],
      movesCharacters: [{ characterId: 'kenta', toLocationId: 'the_walkway' }],
    },
    {
      id: 'we_kenta_message',
      atWorldMinute: 4 * 1440 + 21 * 60 + 30,
      locationId: null,
      publicCopy: 'Mika’s phone lights up on the low table with one message from Kenta: "Thursday, eight o’clock. Come and collect your things. In person."',
      directorNotes:
        'The invitation arrives whether or not he found the building. In person is the whole point. Mika will want to go alone and will not ask the player to come, because she has already asked for one thing this week.',
      setsFlags: ['kenta_invited_her'],
      cancelledByFlags: ['kenta_done'],
      requiresFlags: ['week_begun'],
      movesCharacters: [],
    },
    {
      id: 'we_slideshow_preview',
      atWorldMinute: 5 * 1440 + 22 * 60,
      locationId: null,
      publicCopy:
        'Daisuke posts a preview of the reunion slideshow to the class chat: twelve photographs from your final year, and the caption "plenty more where these came from".',
      directorNotes:
        'The photograph from the back stairs is not in the preview. Everybody who was there knows it exists. Three people react to the post with a laughing face and one deletes their reaction a minute later.',
      setsFlags: ['saw_the_slideshow'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_review',
      atWorldMinute: 6 * 1440 + 10 * 60,
      locationId: 'the_office',
      publicCopy: 'Your quarterly review: twenty minutes in the manager’s glass box, at the end of a week in which you have slept about nine hours.',
      directorNotes:
        'An ordinary pressure that does not care what is happening at home. How it goes depends on how much of the player is left. Jun has been covering for them and the manager has noticed that too.',
      setsFlags: ['review_happened'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_lease_deadline',
      atWorldMinute: 6 * 1440 + 17 * 60,
      locationId: 'the_new_studio',
      publicCopy: 'At five o’clock the letting agency pulls down its shutter on a studio application still missing one document.',
      directorNotes:
        'If the copy of her ID card is not in by now, the studio goes to the next name on the list on Monday. Mika finds out by email at five past five. She does not tell the player for two hours, and then she tells them in one sentence.',
      setsFlags: ['lease_lapsed'],
      cancelledByFlags: ['documents_sorted'],
      requiresFlags: ['week_begun'],
      movesCharacters: [],
    },
    {
      id: 'we_the_reunion',
      atWorldMinute: 7 * 1440 + 19 * 60,
      locationId: 'the_izakaya',
      publicCopy:
        'Upstairs at The Red Lantern, thirty cushions fill up with the people you were at school with, and Daisuke tests the projector on a photograph of the whole class.',
      directorNotes:
        'The slideshow is at nine and slide thirty-one is the photograph from the back stairs. Mika goes only if the player goes with her or tells her to. Jun goes regardless, because he wants to see the room’s face when the player walks in.',
      setsFlags: ['reunion_tonight'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'daisuke', toLocationId: 'the_izakaya' }],
    },
    {
      id: 'we_last_night',
      atWorldMinute: 7 * 1440 + 23 * 60 + 30,
      locationId: 'apartment_2c',
      publicCopy: 'The last night. Her duffel is packed by the door, and the cat is asleep on your side of the sofa.',
      directorNotes:
        'Whatever this week was, it is nearly over and both of them know it. She will not bring anything up. If something is going to be said tonight, the player says it.',
      setsFlags: ['last_night'],
      cancelledByFlags: ['she_went_back'],
      requiresFlags: ['week_begun'],
      movesCharacters: [],
    },
    {
      id: 'we_keys',
      atWorldMinute: 8 * 1440 + 10 * 60,
      locationId: 'the_new_studio',
      publicCopy: 'At ten o’clock a letting agent in a raincoat is waiting at the studio door with a key on a paper tag.',
      directorNotes:
        'The end of the week she asked for. Whether the player is standing next to her, carrying a box, or not here at all is the last thing the story says about them.',
      setsFlags: ['keys_day'],
      cancelledByFlags: ['lease_lapsed', 'she_went_back'],
      requiresFlags: ['documents_sorted'],
      movesCharacters: [{ characterId: 'mika', toLocationId: 'the_new_studio' }],
    },
  ],
  promises: [
    {
      id: 'p_after_sunday',
      kind: 'FINALE',
      label: 'Whether she is still in your life after next Sunday at ten',
      seedHint: 'A key on a paper tag, and a spare key on your own ring that nobody has ever had.',
      payoffHint: 'Sunday at ten, a studio door across the city, and what the two of you say on that doorstep this time.',
      weight: 1,
    },
    {
      id: 'p_what_is_owed',
      kind: 'RELATIONSHIP',
      label: 'What she owes you, and whether you want it paid',
      seedHint: 'She promises on the step not to say a word about before, which is its own kind of answer.',
      payoffHint: 'The apology in full, with no excuse attached; or a week in which it was never once said.',
      weight: 0.9,
    },
    {
      id: 'p_the_reasonable_man',
      kind: 'RIVAL',
      label: 'The reasonable man across the river',
      seedHint: 'Forty-one messages on a cracked phone from one name, every one of them polite.',
      payoffHint: 'Kenta at the bottom of your stairs with flowers, and a blue folder in a locked drawer on the fourteenth floor.',
      weight: 0.8,
    },
    {
      id: 'p_why_your_door',
      kind: 'MYSTERY',
      label: 'Why your door, of every door in the city',
      seedHint: 'She knew the building, the floor and the time of the last bus, and she has never been here.',
      payoffHint: 'Your sister’s appointment book: M. Arai, cut and colour, every six weeks for a year.',
      weight: 0.6,
    },
    {
      id: 'p_the_page',
      kind: 'THEME',
      label: 'The page she tore out',
      seedHint: 'Your old notebook in a box on the wardrobe, with a stub near the back where a page used to be.',
      payoffHint: 'Rain on a window, in pencil, folded into eighths and carried through four apartments.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_steady',
      name: 'You Got Steady',
      role: 'Composure and discipline',
      summary: 'Six years of early mornings, the gym and a routine nobody can shake, so you keep your voice level when the past comes up and you can carry anything.',
      playstyle: ['Calm', 'Physical', 'Hard to rattle'],
      blurb: 'You built yourself on purpose after school: up at six, the same breakfast, the same train, a body and a routine nobody would think to make fun of. It mostly works.',
      attributeBonus: { might: 2, resolve: 2 },
      skillProficiencies: { composure: 3, legwork: 2 },
      startingItems: [{ itemId: 'canned_coffee', qty: 2 }],
      startingAbilities: ['haul_it'],
      startingReputation: [{ factionId: 'faction_tsubame', amount: 5 }],
    },
    {
      id: 'arch_paperwork',
      name: 'You Run the Paperwork',
      role: 'Technical admin and fine print',
      summary: 'You are the person at the office who knows which form and which clause, so leases, bank counters and anybody hiding something in writing go better for you.',
      playstyle: ['Careful', 'Observant', 'Paper trail'],
      blurb: 'Eight years of making yourself useful in a way nobody could laugh at. Nobody laughs at the person who knows where the contract is.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { paperwork: 3, attention: 2 },
      startingItems: [],
      startingAbilities: ['do_the_paperwork'],
      startingReputation: [{ factionId: 'faction_tsubame', amount: 15 }],
    },
    {
      id: 'arch_talker',
      name: 'You Learned to Talk',
      role: 'Social charm and persuasion',
      summary: 'The quiet one became the funny one at work, so you can bluff, charm and talk your way past a concierge, a landlady or a room that used to laugh at you.',
      playstyle: ['Charming', 'Quick', 'Bluffs well'],
      blurb: 'Somewhere between graduation and now you decided that if anybody was going to make the room laugh, it would be you. People at work think you were always like this.',
      attributeBonus: { presence: 2, agility: 2 },
      skillProficiencies: { nerve: 3, warmth: 2 },
      startingItems: [],
      startingAbilities: ['bluff_it'],
      startingReputation: [
        { factionId: 'faction_class', amount: 5 },
        { factionId: 'faction_tsubame', amount: 5 },
      ],
    },
    {
      id: 'arch_drawing',
      name: 'You Still Draw',
      role: 'Craft, memory and attention',
      summary: 'You never stopped filling notebooks, so you notice what people do with their hands, remember exactly how things went, and start with the notebook you kept from school.',
      playstyle: ['Observant', 'Remembers', 'Gentle'],
      blurb: 'You draw on the train, in meetings, on the backs of receipts. You have not drawn in front of another person since the day she read your notebook to the class.',
      attributeBonus: { arcana: 3, mind: 1 },
      skillProficiencies: { recall: 3, attention: 1, cooking: 1 },
      startingItems: [{ itemId: 'old_notebook', qty: 1 }],
      startingAbilities: ['read_her'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is your name?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Ren Mizuno' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What did the last eight years make of you?',
      helpText:
        'You are twenty-six and you work at a freight company in the city. This sets what you got good at since school, and it is fixed for the whole story, so it cannot be changed later. It does not decide whether you let her in, forgive her or make her pay. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is true about you now that was not true at school?',
      helpText: 'One plain sentence is the right amount. The people from school have not seen it yet.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I can hold anybody’s eye now. It took six years and I am still quietly proud of it.',
    },
    {
      id: 'first_instinct',
      label: 'What is your first instinct when you see her face?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite on the doorstep and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'shut_it', label: 'Close the door before she finishes the sentence' },
        { id: 'make_her_say_it', label: 'Make her say what she did, right here, out loud' },
        { id: 'be_bigger', label: 'Be the bigger person, and let her see you being it' },
        { id: 'curious', label: 'Find out what on earth brought her to this door' },
        { id: 'enjoy_it', label: 'Enjoy, quietly, that she is the one standing in the rain' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see when the door opens?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Taller than at school, work shirt still on, a towel round my neck and a face that has not decided anything yet.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Thirteen destinations and forgiveness is not the default. Five are losses
   * or near-losses, and none of them is written as a punishment: a door kept
   * shut, a week of revenge, seven polite nights with nothing said, a lapsed
   * lease, and Mika going back across the river. "You Left Her the Keys" is
   * the walk-out and is last, because the storyteller only reads twelve and
   * the engine detects that one on its own.
   */
  endings: [
    {
      id: 'end_one_week_exactly',
      name: 'One Week, Exactly',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['she_moved_out', 'clean_break'], flagsUnset: ['asked_her_to_stay'] },
      condition:
        'She left when she said she would, with her folder, her cat and the envelope of cash she had been counting since the first night, and the player let her. Whatever was or was not said this week, nothing is owed in either direction now. Write the handover plainly: the key on the paper tag, the carrier, a last look at the sofa. Do not have anybody sum it up.',
      epilogue:
        'The sofa folds back into a sofa. Cat hair keeps turning up on your work trousers for three weeks. Once, passing the business hotel by the station, you see a blunt haircut behind the front desk, and neither of you waves, and both of you nod.',
      hint: '',
    },
    {
      id: 'end_seven_polite_nights',
      name: 'Seven Polite Nights',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['left_unsaid', 'she_moved_out'], flagsUnset: ['she_apologised'] },
      condition:
        'Nobody said it. The player was decent, the week was civil, and the one thing that brought her to this door in particular was never once put into words. This is a real outcome and not a failure: it was a decision, made every evening by changing the subject. Write a quiet week that ends on time with the thing still in the room.',
      epilogue:
        'She leaves the apartment cleaner than she found it and an envelope on the low table with the exact rent for seven nights on a sofa, worked out to the coin. There is no note. For a year you mean to message her, and the reunion chat goes quiet again, and the name stays where it always was.',
      hint: '',
    },
    {
      id: 'end_back_across_the_river',
      name: 'Back Across the River',
      rarity: 'COMMON',
      minTurn: 18,
      requires: { flagsSet: ['she_went_back'] },
      condition:
        'She went back to Kenta. Not because he won an argument, but because this week made going back the least painful door in front of her, and the player had a hand in that. Do not write Kenta as a monster or Mika as a fool. Write the reasonable voice on the phone, the duffel being zipped, and the cat carrier picked up very carefully.',
      epilogue:
        'The engagement is back on by the end of the month. The class chat sends congratulations. Her profile picture changes to the two of them on a balcony with a harbour behind it, and the cat is not in it, and you never find out what that means.',
      hint: '',
    },
    {
      id: 'end_paid_in_full',
      name: 'Paid in Full',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['made_her_pay', 'the_week_is_over'] },
      condition:
        'The player made her pay for it, night after night, in the currency she once used on them: small and precise. She took it without arguing, which is its own kind of answer. Do not moralise and do not reward it. Write what the player got, which is exactly what they asked for, and what the apartment sounded like by Friday.',
      epilogue:
        'She leaves on Sunday with everything she brought and nothing she did not. The running total on the back of her cash envelope has been crossed out and replaced with one word you do not read until she has gone: even. For a long time you are not sure whether that was a peace offering or the last thing she will ever say to you.',
      hint: '',
    },
    {
      id: 'end_thirty_four_classmates',
      name: 'Thirty-Four Classmates',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['exposed_her', 'reunion_over'] },
      condition:
        'The player told the room. In front of everybody who laughed eight years ago they said exactly what Mika did, and the room went quiet the way it used to go loud. This is revenge and it worked. Write the silence, the phones coming out, Daisuke trying to turn it into a toast, and Mika standing up to leave without contradicting a word of it.',
      epilogue:
        'The class chat argues about it for a week, and then one by one three classmates message you privately to say they are sorry they laughed. Mika leaves the group that night. Nobody calls you Footnote again, and you are never quite sure whether that is because of what you said or how you said it.',
      hint: '',
    },
    {
      id: 'end_nobody_calls_you_that',
      name: 'Nobody Calls You That Now',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['footnote_retired', 'reunion_over'],
        minFactionReputation: [{ factionId: 'faction_class', value: 30 }],
      },
      condition:
        'The reunion went the player’s way without anybody being destroyed for it. They walked in, said what was true, pulled the slide or brought her, and the nickname died in front of the people who invented it. Play the room changing its mind slowly and then all at once, and let it be a good night.',
      epilogue:
        'Somebody starts a new group chat without Daisuke in it, and you are in it under your own name. In the spring you go to class drinks for the first time in eight years, stay to the end, and walk home along the river without hurrying.',
      hint: '',
    },
    {
      id: 'end_the_door_stayed_shut',
      name: 'The Door Stayed Shut',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['turned_her_away', 'kept_her_downstairs'], flagsUnset: ['let_her_in_later'] },
      condition:
        'The player said no on the first night and kept saying it. Mika spent the week in Mrs. Tamura’s spare room directly underneath them, and they passed on the stairs every morning. This is not cruelty. It is a closed door, and it was the player’s to close. Write the week through the floor: her alarm at five, the cat on the landlady’s windowsill, two people who never once knock.',
      epilogue:
        'The studio has a garden, but Udon prefers the stairs, so in the end the cat stays with Mrs. Tamura and Mika visits him on Sundays. You hear her voice through the floor once a week and you do not go down, and it gets easier, and it does not get easy.',
      hint: '',
    },
    {
      id: 'end_one_more_week',
      name: 'One More Week',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['she_has_nowhere', 'the_week_is_over'] },
      condition:
        'The agency closed on Friday without her ID card, the studio went to the next name on the list, and it is Sunday morning and she is still on the sofa with nowhere to go. Whatever happens now is decided with the whole week behind it. Write her asking a second time, which she swore she would never do, and let the player answer.',
      epilogue:
        'The cat is asleep on your side of the sofa again. The letting agency sends an automatic email apologising for any inconvenience. Somewhere across the city a stranger is getting her key on a paper tag, and in your kitchen two people are standing very still, waiting to see who says the next sentence.',
      hint: 'The agency closes at five on Friday.',
    },
    {
      id: 'end_the_spare_key',
      name: 'The Spare Key',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['she_moved_out', 'still_in_touch', 'she_apologised'],
        minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 60 }],
      },
      condition:
        'She moved out on time, she said what she owed, and the player decided they wanted her in their life on purpose: as a friend, with a history, at a table. Write the spare key changing hands on the studio doorstep without a speech, as the practical thing it is. Nobody has to call this forgiveness out loud.',
      epilogue:
        'Thursday dinners, alternating apartments. She brings the cat, which you complain about and buy treats for. Jun takes four months to say a full sentence to her and then never stops. Your spare key is on her ring next to her own, and she has used it exactly once, to feed your plants when you had flu.',
      hint: '',
    },
    {
      id: 'end_stay_another_week',
      name: 'Stay Another Week',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['asked_her_to_stay', 'she_apologised'],
        minRelationship: [
          { characterId: 'mika', dimension: 'trust', value: 65 },
          { characterId: 'mika', dimension: 'affection', value: 70 },
        ],
      },
      condition:
        'On the last morning the player asked her not to go yet, and meant it, after a week in which everything that needed saying was said. This is a romance and it is slow: two adults surprised by it and suspicious of it. Write the asking, the long pause, and a kiss if they both want one, and no further. She keeps the studio. She just does not go yet.',
      epilogue:
        'She keeps the studio because it is hers and she fought for it, stays one more week, and then most weekends. The class chat finds out at Jun’s birthday and loses its mind. You draw her eventually, asleep against the arm of the sofa with the cat on her feet, and when she sees it she goes very quiet and asks if she can keep it.',
      hint: '',
    },
    {
      id: 'end_everything_in_his_name',
      name: 'Everything in His Name',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['kenta_exposed', 'documents_sorted'] },
      condition:
        'The player got the folder back and then took Kenta’s story apart where his friends could see it: the arrears, the joint account, whose half of the wedding fund it really was. He never raised his voice, even then. Write the calm man losing his calm audience one face at a time, and Mika watching without needing to say anything.',
      epilogue:
        'His firm moves him to a smaller tower in a duller district. The friends who believed him send Mika careful messages that she answers politely and never follows up. Her grandmother’s ring goes onto her right hand, where her grandmother wore it, and stays there.',
      hint: '',
    },
    {
      id: 'end_rain_on_the_window',
      name: 'Rain on the Window',
      rarity: 'UNIQUE',
      minTurn: 36,
      requires: {
        flagsSet: ['knows:the_torn_page', 'she_apologised', 'documents_sorted'],
        minRelationship: [{ characterId: 'mika', dimension: 'trust', value: 65 }],
      },
      condition:
        'She gave the page back. The drawing she tore out of the player’s notebook eight years ago, folded soft and carried through four apartments, is back in their hands, and the apology that came before it was complete. Write the page being unfolded on the low table and what the player does with a pencil afterwards. This ending is about the player, not about her.',
      epilogue:
        'The notebook comes down off the wardrobe and the page goes back in, taped along the stub. The next page is the first drawing you have let anybody see in eight years: rain on the window of 2C, from the inside, every drop, and the back of somebody’s head at the kitchen counter.',
      hint: 'There is a stub in your old notebook where a page used to be.',
    },
    {
      id: 'end_you_left_her_the_keys',
      name: 'You Left Her the Keys',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of their own apartment and did not come back for the week, leaving Mika in it. That is a completely coherent thing to do when the past turns up on your sofa. Do not punish it and do not redeem it. Write the empty week from her side: the cat, the quiet, the spare key on the counter.',
      epilogue:
        'When you come back the apartment is spotless, the sofa is a sofa, and there is an envelope on the low table with seven nights’ rent and a note in small square handwriting that says she understands, and that she always would have.',
      hint: '',
    },
  ],
  opening:
    "\"I know I don’t get to ask.\"\n\nMika Arai is at your door at twenty to midnight, soaked through, rain running off her hood. Duffel bag at her feet. Cat carrier hugged to her chest.\n\nEight years ago she made school a misery for you. Your stomach still knows her before you do.\n\n\"One week,\" she says. \"I get keys to my own place next Sunday. Nowhere else will take the cat.\"\n\nBehind her, the last bus pulls away from the stop.\n\nThe cat yowls.\n\n\"I’ll sleep on the floor. I’ll be gone before you’re up. I won’t say a word about before.\" Her voice is steady. Her hands aren’t.\n\n\"So. Yes or no?\"",
  openingSuggestions: [
    "\"Why my door, Mika? I want the real answer first.\"",
    'I take the cat carrier out of her arms and step back to let her in.',
    "I hold up my phone. \"Say what you did to me. On camera. Then you can come in.\"",
  ],
  coverDirection: [
    'SUBJECT: Mika Arai alone in the foreground of a key visual for a modern romance drama anime about two people forced to share a small apartment for one week.',
    'She fills the frame from the waist up, centred and close, standing just outside an apartment door at night in the rain.',
    'Dark straight hair cut bluntly at the jaw and wet, a man’s oversized navy parka with the hood down and the sleeves rolled, rain beaded on her shoulders.',
    'She holds a battered grey cat carrier against her chest with both arms; a grey cat’s face is visible through the grille.',
    'Her expression is proud and braced at once: chin up, eyes steady on the viewer, mouth set, as if she has just asked for something she does not think she deserves.',
    'BEHIND HER, soft and secondary: an open-air apartment walkway with a dripping railing, a vending machine glowing by the stairs, city lights blurred by rain, and a bus pulling away under a streetlight.',
    'LIGHT: warm yellow light spilling from the open doorway across her face and the carrier, cold blue rain light behind her.',
    'TITLE: the words ONE WEEK, SHE SAID painted into the art in the upper third in clean white brush lettering with a soft glow, spelled exactly ONE WEEK, SHE SAID, large and legible at thumbnail size.',
    'No other text anywhere: no letters or numbers on the door, the bus, the vending machine or the carrier.',
  ].join(' '),
  publishedAt: null,
};

export const ONE_WEEK_SHE_SAID = StoryVersion.parse(raw);
